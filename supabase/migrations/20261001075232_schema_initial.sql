-- Fabio RH : scans du chat et du leaderboard, vérifications de profils.
-- Accès réservé aux recruteurs (comptes Supabase Auth listés dans public.recruteurs).

create schema if not exists private;

-- Recruteurs autorisés : un compte Auth n'a accès à rien tant qu'il n'est pas dans cette table
create table public.recruteurs (
    user_id uuid primary key references auth.users (id) on delete cascade,
    pseudo text not null,
    actif boolean not null default true,
    cree_le timestamptz not null default now()
);

create or replace function private.est_recruteur()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (select 1 from public.recruteurs r where r.user_id = auth.uid() and r.actif);
$$;
revoke all on function private.est_recruteur() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.est_recruteur() to authenticated;

-- État courant de chaque joueur repéré (mis à jour par les scans et par chaque vérification)
create table public.joueurs (
    nom text primary key,
    ironcow boolean not null default false,
    couleur text not null default '',
    premiere_vue timestamptz not null default now(),
    derniere_vue timestamptz not null default now(),
    vu_par uuid references auth.users (id) on delete set null default auth.uid(),
    statut text not null default 'pending' check (statut in ('pending', 'free', 'guild', 'fail')),
    a_guilde boolean,
    guilde text,
    rang text,
    total_level integer,
    combat_level integer,
    age text,
    derniere_verif timestamptz
);
create index joueurs_statut_idx on public.joueurs (statut);
create index joueurs_vu_par_idx on public.joueurs (vu_par);

-- Un passage du bouton « Scanner »
create table public.scans (
    id bigint generated always as identity primary key,
    recruteur uuid not null default auth.uid() references auth.users (id) on delete cascade,
    debut timestamptz not null,
    fin timestamptz not null default now(),
    onglets text[] not null default '{}',
    sources text[] not null default '{}',
    mode text not null default 'all',
    nb_messages integer not null default 0,
    nb_nouveaux integer not null default 0,
    nb_classements integer not null default 0,
    nb_guildes integer not null default 0
);
create index scans_recruteur_idx on public.scans (recruteur);
create index scans_debut_idx on public.scans (debut desc);

-- Journal du scan : chaque message ou ligne de classement lu, ajouté, déjà connu ou ignoré
create table public.scan_entrees (
    id bigint generated always as identity primary key,
    scan_id bigint not null references public.scans (id) on delete cascade,
    pseudo text not null,
    resultat text not null,
    source text,
    onglet text,
    brut text
);
create index scan_entrees_scan_idx on public.scan_entrees (scan_id);
create index scan_entrees_pseudo_idx on public.scan_entrees (pseudo);

-- Classements de guildes lus pendant un scan (onglet Guilds du leaderboard)
create table public.guildes_classements (
    id bigint generated always as identity primary key,
    scan_id bigint not null references public.scans (id) on delete cascade,
    guilde text not null,
    classement text not null,
    rang integer,
    valeurs jsonb not null default '{}'
);
create index guildes_classements_scan_idx on public.guildes_classements (scan_id);
create index guildes_classements_guilde_idx on public.guildes_classements (guilde);

-- Chaque vérification de profil, avec le profil brut reçu du WebSocket (profile_shared)
create table public.verifications (
    id bigint generated always as identity primary key,
    joueur text not null references public.joueurs (nom) on delete cascade,
    recruteur uuid not null default auth.uid() references auth.users (id) on delete cascade,
    verifie_le timestamptz not null default now(),
    succes boolean not null,
    a_guilde boolean,
    guilde text,
    rang text,
    total_level integer,
    combat_level integer,
    age text,
    ironcow boolean,
    en_ligne boolean,
    profil_brut jsonb,
    sections jsonb
);
create index verifications_joueur_idx on public.verifications (joueur, verifie_le desc);
create index verifications_recruteur_idx on public.verifications (recruteur);

-- Une vérification met à jour l'état courant du joueur (et le crée s'il n'existe pas)
create or replace function private.verification_vers_joueur()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
    insert into public.joueurs as j (nom, ironcow, statut, a_guilde, guilde, rang, total_level, combat_level, age, derniere_verif)
    values (new.joueur, coalesce(new.ironcow, false),
            case when not new.succes then 'fail' when new.a_guilde then 'guild' else 'free' end,
            new.a_guilde, new.guilde, new.rang, new.total_level, new.combat_level, new.age, new.verifie_le)
    on conflict (nom) do update set
        statut = excluded.statut,
        ironcow = case when new.succes then coalesce(new.ironcow, j.ironcow) else j.ironcow end,
        a_guilde = case when new.succes then excluded.a_guilde else j.a_guilde end,
        guilde = case when new.succes then excluded.guilde else j.guilde end,
        rang = case when new.succes then excluded.rang else j.rang end,
        total_level = case when new.succes then excluded.total_level else j.total_level end,
        combat_level = case when new.succes then excluded.combat_level else j.combat_level end,
        age = case when new.succes then excluded.age else j.age end,
        derniere_verif = excluded.derniere_verif;
    return new;
end;
$$;
grant execute on function private.verification_vers_joueur() to authenticated;

create trigger verifications_maj_joueur
after insert on public.verifications
for each row execute function private.verification_vers_joueur();

-- Enregistre un scan complet en une seule requête :
-- { debut, onglets[], sources[], mode, nb_messages, nb_nouveaux, nb_classements,
--   joueurs: [{ nom, ironcow, couleur }], entrees: [{ pseudo, resultat, source, onglet, brut }],
--   guildes: [{ guilde, classement, rang, valeurs }] }
create or replace function public.enregistrer_scan(scan jsonb)
returns bigint
language plpgsql
security invoker
set search_path = ''
as $$
declare
    scan_id bigint;
begin
    if not private.est_recruteur() then
        raise exception 'Compte non autorisé' using errcode = '42501';
    end if;

    insert into public.scans (debut, onglets, sources, mode, nb_messages, nb_nouveaux, nb_classements, nb_guildes)
    values (
        coalesce((scan->>'debut')::timestamptz, now()),
        coalesce(array(select jsonb_array_elements_text(scan->'onglets')), '{}'),
        coalesce(array(select jsonb_array_elements_text(scan->'sources')), '{}'),
        coalesce(scan->>'mode', 'all'),
        coalesce((scan->>'nb_messages')::int, 0),
        coalesce((scan->>'nb_nouveaux')::int, 0),
        coalesce((scan->>'nb_classements')::int, 0),
        (select count(distinct g->>'guilde') from jsonb_array_elements(coalesce(scan->'guildes', '[]')) g)
    )
    returning id into scan_id;

    insert into public.joueurs as j (nom, ironcow, couleur)
    select distinct on (x.nom) x.nom, coalesce(x.ironcow, false), coalesce(x.couleur, '')
    from jsonb_to_recordset(coalesce(scan->'joueurs', '[]')) as x (nom text, ironcow boolean, couleur text)
    where x.nom is not null
    on conflict (nom) do update set
        derniere_vue = now(),
        ironcow = j.ironcow or excluded.ironcow,
        couleur = case when j.couleur = '' then excluded.couleur else j.couleur end;

    insert into public.scan_entrees (scan_id, pseudo, resultat, source, onglet, brut)
    select scan_id, coalesce(x.pseudo, '-'), coalesce(x.resultat, ''), x.source, x.onglet, x.brut
    from jsonb_to_recordset(coalesce(scan->'entrees', '[]')) as x (pseudo text, resultat text, source text, onglet text, brut text);

    insert into public.guildes_classements (scan_id, guilde, classement, rang, valeurs)
    select scan_id, x.guilde, x.classement, x.rang, coalesce(x.valeurs, '{}')
    from jsonb_to_recordset(coalesce(scan->'guildes', '[]')) as x (guilde text, classement text, rang int, valeurs jsonb)
    where x.guilde is not null;

    return scan_id;
end;
$$;
revoke all on function public.enregistrer_scan(jsonb) from public, anon;
grant execute on function public.enregistrer_scan(jsonb) to authenticated;

-- RLS : lecture et ajout pour les recruteurs actifs ; pas de suppression depuis le script
alter table public.recruteurs enable row level security;
alter table public.joueurs enable row level security;
alter table public.scans enable row level security;
alter table public.scan_entrees enable row level security;
alter table public.guildes_classements enable row level security;
alter table public.verifications enable row level security;

create policy "recruteur : sa propre fiche" on public.recruteurs
    for select to authenticated using (user_id = (select auth.uid()));

create policy "recruteurs : lecture" on public.joueurs
    for select to authenticated using ((select private.est_recruteur()));
create policy "recruteurs : ajout" on public.joueurs
    for insert to authenticated with check ((select private.est_recruteur()));
create policy "recruteurs : mise à jour" on public.joueurs
    for update to authenticated using ((select private.est_recruteur())) with check ((select private.est_recruteur()));

create policy "recruteurs : lecture" on public.scans
    for select to authenticated using ((select private.est_recruteur()));
create policy "recruteurs : ajout" on public.scans
    for insert to authenticated with check ((select private.est_recruteur()) and recruteur = (select auth.uid()));

create policy "recruteurs : lecture" on public.scan_entrees
    for select to authenticated using ((select private.est_recruteur()));
create policy "recruteurs : ajout" on public.scan_entrees
    for insert to authenticated with check ((select private.est_recruteur()));

create policy "recruteurs : lecture" on public.guildes_classements
    for select to authenticated using ((select private.est_recruteur()));
create policy "recruteurs : ajout" on public.guildes_classements
    for insert to authenticated with check ((select private.est_recruteur()));

create policy "recruteurs : lecture" on public.verifications
    for select to authenticated using ((select private.est_recruteur()));
create policy "recruteurs : ajout" on public.verifications
    for insert to authenticated with check ((select private.est_recruteur()) and recruteur = (select auth.uid()));

-- Le rôle anon ne voit rien
revoke all on all tables in schema public from anon;
