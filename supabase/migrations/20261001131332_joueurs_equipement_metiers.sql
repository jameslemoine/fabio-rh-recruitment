-- Équipement utile aux métiers (outils, haut, bas, charme), lu dans le profil brut :
-- { "brewing_tool": "celestial_pot+8", "body": "brewers_top", "legs": "brewers_bottoms", "charm": "master_brewing_charm", ... }
alter table public.joueurs add column equipement jsonb;

create or replace function private.equipement_profil(profil jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
    select jsonb_object_agg(x.loc, x.item || case when x.niv > 0 then '+' || x.niv else '' end)
    from jsonb_each(case when jsonb_typeof(profil->'wearableItemMap') = 'object' and not coalesce((profil->>'hideWearableItems')::boolean, false)
                         then profil->'wearableItemMap' else '{}' end) e(k, w),
         lateral (select regexp_replace(w->>'itemLocationHrid', '^.*/', '') loc,
                         regexp_replace(w->>'itemHrid', '^.*/', '') item,
                         case when w->>'enhancementLevel' ~ '^\d+$' then (w->>'enhancementLevel')::int else 0 end niv) x
    where x.loc ~ '_tool$' or x.loc in ('body', 'legs', 'charm');
$$;
revoke all on function private.equipement_profil(jsonb) from public, anon;
grant execute on function private.equipement_profil(jsonb) to authenticated;

create or replace function private.verification_vers_joueur()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
    insert into public.joueurs as j (nom, ironcow, statut, a_guilde, guilde, rang, total_level, combat_level, age, niveaux, equipement, derniere_verif)
    values (new.joueur, coalesce(new.ironcow, false),
            case when not new.succes then 'fail' when new.a_guilde then 'guild' else 'free' end,
            new.a_guilde, new.guilde, new.rang, new.total_level, new.combat_level, new.age,
            case when new.succes then private.niveaux_profil(new.profil_brut) end,
            case when new.succes then private.equipement_profil(new.profil_brut) end, new.verifie_le)
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
        equipement = coalesce(excluded.equipement, j.equipement),
        derniere_verif = excluded.derniere_verif;
    return new;
end;
$$;

-- Joueurs déjà vérifiés : équipement de leur dernière vérification réussie avec profil brut
update public.joueurs j set equipement = v.equipement
from (
    select distinct on (joueur) joueur, private.equipement_profil(profil_brut) equipement
    from public.verifications
    where succes and profil_brut is not null
    order by joueur, verifie_le desc
) v
where v.joueur = j.nom and v.equipement is not null;
