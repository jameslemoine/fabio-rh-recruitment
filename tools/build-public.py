# Génère la version publique (consultation seule, publiée sur Greasy Fork) depuis la version privée :
#   python3 tools/build-public.py
# Retire les blocs « // #privé:début » … « // #privé:fin » (ou <!-- … --> dans le HTML)
# et les lignes terminées par « #privé », puis vérifie qu'aucun nom retiré n'est encore utilisé.
import re, sys

SOURCE = 'Fabio RH Recruit Team-prive.js'
SORTIE = 'Fabio RH Recruit Team-public.js'

DEBUT = re.compile(r'(//|<!--)\s*#privé:début\s*(-->)?')
FIN = re.compile(r'(//|<!--)\s*#privé:fin\s*(-->)?')

garde, retire, dedans = [], [], None
for n, ligne in enumerate(open(SOURCE, encoding='utf-8').read().split('\n'), 1):
    s = ligne.strip()
    if DEBUT.fullmatch(s):
        if dedans: sys.exit(f'ligne {n} : #privé:début dans un bloc ouvert ligne {dedans}')
        dedans = n
    elif FIN.fullmatch(s):
        if not dedans: sys.exit(f'ligne {n} : #privé:fin sans début')
        dedans = None
    elif dedans or s.endswith('#privé'):
        retire.append(ligne)
    else:
        garde.append(ligne)
if dedans: sys.exit(f'bloc #privé ouvert ligne {dedans} jamais fermé')

js = '\n'.join(garde)
js = re.sub(r'\n{3,}', '\n\n', js)

# En-tête de la version publique : même @name / @namespace que la version déjà publiée,
# pour que Tampermonkey la mette à jour au lieu d'installer un second script
entete = {
    'name': 'Fabio RH Recruit Team',
    'description': 'RH Tool for guild-free player (consultation)',
}
for cle, valeur in entete.items():
    js, n = re.subn(rf'^(// @{cle}\s+).*$', lambda m: m.group(1) + valeur, js, count=1, flags=re.M)
    if not n: sys.exit(f'@{cle} introuvable')
# unsafeWindow ne sert qu'à l'écoute du WebSocket (retirée) ; l'en-tête ne peut pas porter de marqueur #privé
js, n = re.subn(r'^// @grant\s+unsafeWindow\n', '', js, count=1, flags=re.M)
if not n: sys.exit('@grant unsafeWindow introuvable')
js, n = re.subn(r'// ==/UserScript==\n\n(//.*\n)+',
                '// ==/UserScript==\n\n// Fichier généré par tools/build-public.py depuis la version privée : ne pas modifier à la main.\n'
                '// Version de consultation : liste des joueurs et fiches lues dans la base (compte lecteur ou rh).\n', js, count=1)
if not n: sys.exit('commentaire d\'en-tête de la version privée introuvable')

# Noms déclarés dans les parties retirées qui seraient encore utilisés (hors commentaires et chaînes simples)
code = re.sub(r'//[^\n]*', '', js)
code = re.sub(r"'(?:\\.|[^'\\\n])*'", "''", code)
# Déclarations de premier niveau seulement (indentation 4) : les variables locales des fonctions retirées
# portent souvent le même nom que des variables locales gardées
haut = '\n'.join(retire)
noms = set(re.findall(r'^    (?:async )?(?:function|const|let)\s+([A-Za-z_$][\w$]*)', haut, flags=re.M))
noms |= set(re.findall(r'^    window\.(\w+)\s*=', haut, flags=re.M))
# « const a = …, b = … » sur une ligne
noms |= set(re.findall(r'^    (?:const|let)\s+[^;\n]*?,\s*([A-Za-z_$][\w$]*)\s*=', haut, flags=re.M))
# (un nom suivi de « : » est une clé d'objet, pas un usage)
restants = sorted(n for n in noms if re.search(rf'(?<![\w$.]){re.escape(n)}\b(?!\s*:)', code))
if restants:
    sys.exit('Noms retirés mais encore utilisés dans la version publique : ' + ', '.join(restants))

open(SORTIE, 'w', encoding='utf-8').write(js)
print(f'{SORTIE} généré : {len(garde)} lignes gardées, {len(retire)} retirées.')
