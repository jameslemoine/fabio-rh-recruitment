# Recopie fabio-rh.css dans le script (ligne « const CSS = … ») : python3 tools/integrer-css.py
# Le dépôt GitHub est privé, jsDelivr ne peut plus servir le CSS : il voyage dans le script.
# On modifie toujours fabio-rh.css, puis on relance cet outil avant de vérifier et commiter.
import re, json, sys
SCRIPT, CSS = 'Fabio RH Recruit Team-1.0.js', 'fabio-rh.css'
js = open(SCRIPT, encoding='utf-8').read()
ligne = '    const CSS = ' + json.dumps(open(CSS, encoding='utf-8').read(), ensure_ascii=False) + '; // fabio-rh.css, inséré par tools/integrer-css.py'
js, n = re.subn(r'^    const CSS = .*$', lambda m: ligne, js, count=1, flags=re.M)
if not n: sys.exit('ligne « const CSS = » introuvable dans le script')
open(SCRIPT, 'w', encoding='utf-8').write(js)
print('CSS intégré dans', SCRIPT)
