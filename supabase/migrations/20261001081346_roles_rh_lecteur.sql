-- Deux rôles : « rh » scanne, vérifie et écrit ; « lecteur » consulte seulement.
-- Les recruteurs déjà inscrits restent rh. Un compte sans ligne dans recruteurs n'a toujours accès à rien.

alter table public.recruteurs
    add column role text not null default 'lecteur' check (role in ('rh', 'lecteur'));
update public.recruteurs set role = 'rh';

create or replace function private.est_rh()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (select 1 from public.recruteurs r where r.user_id = auth.uid() and r.actif and r.role = 'rh');
$$;
revoke all on function private.est_rh() from public, anon;
grant execute on function private.est_rh() to authenticated;

-- Écriture réservée aux rh (la lecture reste ouverte à tous les recruteurs actifs)
alter policy "recruteurs : ajout" on public.joueurs with check ((select private.est_rh()));
alter policy "recruteurs : mise à jour" on public.joueurs
    using ((select private.est_rh())) with check ((select private.est_rh()));
alter policy "recruteurs : ajout" on public.scans
    with check ((select private.est_rh()) and recruteur = (select auth.uid()));
alter policy "recruteurs : ajout" on public.scan_entrees with check ((select private.est_rh()));
alter policy "recruteurs : ajout" on public.guildes_classements with check ((select private.est_rh()));
alter policy "recruteurs : ajout" on public.verifications
    with check ((select private.est_rh()) and recruteur = (select auth.uid()));

create or replace function public.enregistrer_scan(scan jsonb)
returns bigint
language plpgsql
security invoker
set search_path = ''
as $$
declare
    scan_id bigint;
begin
    if not private.est_rh() then
        raise exception 'Réservé aux comptes rh' using errcode = '42501';
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

-- Attribution d'un rôle par e-mail, depuis l'éditeur SQL du tableau de bord :
--   select private.definir_role('quelquun@exemple.com', 'rh');       -- ou 'lecteur'
--   select private.definir_role('quelquun@exemple.com', null);       -- retire l'accès
create or replace function private.definir_role(email_compte text, nouveau_role text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
    uid uuid;
begin
    select id into uid from auth.users where lower(email) = lower(email_compte);
    if uid is null then
        raise exception 'Aucun compte avec l''e-mail %', email_compte;
    end if;
    if nouveau_role is null then
        delete from public.recruteurs where user_id = uid;
        return email_compte || ' : accès retiré';
    end if;
    insert into public.recruteurs (user_id, pseudo, role)
    values (uid, split_part(email_compte, '@', 1), nouveau_role)
    on conflict (user_id) do update set role = excluded.role, actif = true;
    return email_compte || ' : ' || nouveau_role;
end;
$$;
revoke all on function private.definir_role(text, text) from public, anon, authenticated;
