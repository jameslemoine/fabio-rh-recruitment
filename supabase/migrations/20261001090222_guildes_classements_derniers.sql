-- Chaque scan ne lit plus qu'un classement (celui que le joueur a ouvert) : pour la comparaison des guildes,
-- on garde le dernier relevé de chaque guilde dans chaque classement, tous scans confondus.
create index guildes_classements_guilde_classement_idx on public.guildes_classements (guilde, classement, id desc);

create view public.guildes_classements_derniers
with (security_invoker = true) as
select distinct on (guilde, classement) guilde, classement, rang, valeurs, scan_id
from public.guildes_classements
order by guilde, classement, id desc;

grant select on public.guildes_classements_derniers to authenticated;
revoke all on public.guildes_classements_derniers from anon;
