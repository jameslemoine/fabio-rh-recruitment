-- Niveau de chaque skill du joueur (lu dans le profil brut), pour trier la liste par métier ou style de combat
alter table public.joueurs add column niveaux jsonb;

-- { "milking": 106, "brewing": 135, ... } d'après characterSkills (sans total_level) ; null sans profil brut
create or replace function private.niveaux_profil(profil jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
    select jsonb_object_agg(regexp_replace(s->>'skillHrid', '^.*/', ''), (s->>'level')::int)
    from jsonb_array_elements(case when jsonb_typeof(profil->'characterSkills') = 'array' then profil->'characterSkills' else '[]' end) s
    where s->>'skillHrid' is not null and s->>'skillHrid' not like '%/total_level' and s->>'level' ~ '^\d+$';
$$;
revoke all on function private.niveaux_profil(jsonb) from public, anon;
grant execute on function private.niveaux_profil(jsonb) to authenticated;

create or replace function private.verification_vers_joueur()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
    insert into public.joueurs as j (nom, ironcow, statut, a_guilde, guilde, rang, total_level, combat_level, age, niveaux, derniere_verif)
    values (new.joueur, coalesce(new.ironcow, false),
            case when not new.succes then 'fail' when new.a_guilde then 'guild' else 'free' end,
            new.a_guilde, new.guilde, new.rang, new.total_level, new.combat_level, new.age,
            case when new.succes then private.niveaux_profil(new.profil_brut) end, new.verifie_le)
    on conflict (nom) do update set
        statut = excluded.statut,
        ironcow = case when new.succes then coalesce(new.ironcow, j.ironcow) else j.ironcow end,
        a_guilde = case when new.succes then excluded.a_guilde else j.a_guilde end,
        guilde = case when new.succes then excluded.guilde else j.guilde end,
        rang = case when new.succes then excluded.rang else j.rang end,
        total_level = case when new.succes then excluded.total_level else j.total_level end,
        combat_level = case when new.succes then excluded.combat_level else j.combat_level end,
        age = case when new.succes then excluded.age else j.age end,
        niveaux = coalesce(excluded.niveaux, j.niveaux),
        derniere_verif = excluded.derniere_verif;
    return new;
end;
$$;

-- Joueurs déjà vérifiés : niveaux de leur dernière vérification réussie avec profil brut
update public.joueurs j set niveaux = v.niveaux
from (
    select distinct on (joueur) joueur, private.niveaux_profil(profil_brut) niveaux
    from public.verifications
    where succes and profil_brut is not null
    order by joueur, verifie_le desc
) v
where v.joueur = j.nom and v.niveaux is not null;
