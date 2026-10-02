-- Page « Statistiques » de la modale : tout est calculé ici en une requête (rpc/stats_recrutement).
-- security invoker : la RLS des tables s'applique, seuls les recruteurs actifs obtiennent des chiffres.
-- Les jours sont ceux de l'heure de Paris.
create or replace function public.stats_recrutement(jours integer default 30)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
    with
    j as (select * from public.joueurs),
    -- Joueurs ajoutés par un scan : source (chat, système, leaderboard) et canal du chat (sans le compteur de messages non lus)
    ajouts as (
        select distinct on (e.pseudo, src, canal) e.pseudo,
               case when e.resultat like 'AJOUTÉ (leaderboard%' then 'Leaderboard'
                    when e.resultat like 'AJOUTÉ (système%' then 'Messages système'
                    else 'Chat' end src,
               case when e.resultat like 'AJOUTÉ (leaderboard%' then regexp_replace(e.resultat, '^AJOUTÉ \(leaderboard (.*)\)$', '\1') end classement,
               nullif(regexp_replace(coalesce(e.onglet, ''), '\d+$', ''), '') canal
        from public.scan_entrees e
        where e.resultat like 'AJOUTÉ%'
    ),
    jours_serie as (
        select generate_series((now() at time zone 'Europe/Paris')::date - (greatest(jours, 1) - 1),
                               (now() at time zone 'Europe/Paris')::date, interval '1 day')::date d
    ),
    verifs as (
        select (verifie_le at time zone 'Europe/Paris')::date d, count(*) n, count(*) filter (where succes) ok
        from public.verifications group by 1
    ),
    nouveaux as (
        select (premiere_vue at time zone 'Europe/Paris')::date d, count(*) n,
               count(*) filter (where statut = 'free') free, count(*) filter (where statut = 'guild') guild,
               count(*) filter (where statut = 'pending') pending, count(*) filter (where statut = 'fail') fail
        from j group by 1
    ),
    scans_jour as (
        select (debut at time zone 'Europe/Paris')::date d, count(*) n from public.scans group by 1
    )
    select jsonb_build_object(
        'totaux', (select jsonb_build_object(
            'joueurs', count(*),
            'free', count(*) filter (where statut = 'free'),
            'guild', count(*) filter (where statut = 'guild'),
            'pending', count(*) filter (where statut = 'pending'),
            'fail', count(*) filter (where statut = 'fail'),
            'ironcow', count(*) filter (where ironcow),
            'free_ironcow', count(*) filter (where statut = 'free' and ironcow),
            'free_en_ligne', count(*) filter (where statut = 'free' and en_ligne),
            'free_inactifs', count(*) filter (where statut = 'free' and activite = ''),
            'scans', (select count(*) from public.scans),
            'verifications', (select count(*) from public.verifications)) from j),
        'par_jour', (select jsonb_agg(jsonb_build_object(
                'jour', s.d, 'nouveaux', coalesce(n.n, 0), 'free', coalesce(n.free, 0), 'guild', coalesce(n.guild, 0),
                'pending', coalesce(n.pending, 0), 'fail', coalesce(n.fail, 0),
                'verifications', coalesce(v.n, 0), 'verif_ok', coalesce(v.ok, 0), 'scans', coalesce(sj.n, 0)) order by s.d)
            from jours_serie s left join nouveaux n using (d) left join verifs v using (d) left join scans_jour sj using (d)),
        'sources', (select jsonb_agg(x order by x.n desc) from (
            select a.src nom, count(distinct a.pseudo) n, count(distinct a.pseudo) filter (where j.statut = 'free') free
            from ajouts a left join j on j.nom = a.pseudo group by 1) x),
        'canaux', (select jsonb_agg(x order by x.n desc) from (
            select a.canal nom, count(distinct a.pseudo) n, count(distinct a.pseudo) filter (where j.statut = 'free') free
            from ajouts a left join j on j.nom = a.pseudo where a.src <> 'Leaderboard' and a.canal is not null group by 1) x),
        'classements', (select jsonb_agg(x order by x.free desc, x.n desc) from (
            select a.classement nom, count(distinct a.pseudo) n, count(distinct a.pseudo) filter (where j.statut = 'free') free
            from ajouts a left join j on j.nom = a.pseudo where a.classement is not null group by 1) x),
        'niveaux_free', (select jsonb_agg(x order by x.t) from (
            select least(total_level / 500, 5) t, count(*) n from j
            where statut = 'free' and total_level is not null group by 1) x),
        'activites_free', (select jsonb_agg(x order by x.n desc) from (
            select coalesce(activite, '?') nom, count(*) n from j where statut = 'free' group by 1) x),
        'skills_free', (select jsonb_agg(x order by x.n desc) from (
            select s.key nom, count(*) n from j, jsonb_each_text(coalesce(j.niveaux, '{}')) s
            where j.statut = 'free' and s.value ~ '^\d+$' and s.value::int >= 120 group by 1) x),
        'guildes', (select jsonb_agg(x order by x.n desc) from (
            select guilde nom, count(*) n from j where statut = 'guild' and guilde is not null
            group by 1 order by 2 desc limit 10) x)
    );
$$;
revoke all on function public.stats_recrutement(integer) from public, anon;
grant execute on function public.stats_recrutement(integer) to authenticated;
