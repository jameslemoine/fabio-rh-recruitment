-- Statut en ligne (null si masqué ou inconnu) et activité ('' = ne fait rien) lors de la dernière vérification réussie
alter table public.joueurs add column en_ligne boolean, add column activite text;

create or replace function private.verification_vers_joueur()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
    insert into public.joueurs as j (nom, ironcow, statut, a_guilde, guilde, rang, total_level, combat_level, age, niveaux, equipement,
                                     en_ligne, activite, derniere_verif)
    values (new.joueur, coalesce(new.ironcow, false),
            case when not new.succes then 'fail' when new.a_guilde then 'guild' else 'free' end,
            new.a_guilde, new.guilde, new.rang, new.total_level, new.combat_level, new.age,
            case when new.succes then private.niveaux_profil(new.profil_brut) end,
            case when new.succes then private.equipement_profil(new.profil_brut) end,
            case when new.succes then new.en_ligne end,
            case when new.succes and new.profil_brut is not null
                 then regexp_replace(coalesce(new.profil_brut->'sharableCharacter'->>'actionType', ''), '^.*/', '') end,
            new.verifie_le)
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
        en_ligne = case when new.succes then excluded.en_ligne else j.en_ligne end,
        activite = coalesce(excluded.activite, j.activite),
        derniere_verif = excluded.derniere_verif;
    return new;
end;
$$;

-- Joueurs déjà vérifiés : valeurs de leur dernière vérification réussie
update public.joueurs j set en_ligne = v.en_ligne, activite = v.activite
from (
    select distinct on (joueur) joueur, en_ligne,
           case when profil_brut is not null then regexp_replace(coalesce(profil_brut->'sharableCharacter'->>'actionType', ''), '^.*/', '') end activite
    from public.verifications
    where succes
    order by joueur, verifie_le desc
) v
where v.joueur = j.nom;
