# Équivalent Python de tools/build-console.js (Node absent sur cette machine)
import re, json, subprocess
SOURCES = ['Fabio RH Recruit Team-1.0.js', 'fabio-rh.css']
git = lambda *a: subprocess.run(['git', *a, '--', *SOURCES], capture_output=True, text=True).stdout.strip()
js, css = (open(f).read() for f in SOURCES)
body = re.sub(r'// ==UserScript==[\s\S]*?// ==/UserScript==\s*', '', js, count=1)
call = "GM_getResourceText('FABIO_CSS')"
assert call in body
version = git('log', '-1', '--format=%h - %s') + (' (+ modifications non commitées)' if git('status', '--porcelain') else '')
out = ('// Fichier généré par tools/build-console.js - ne pas modifier à la main.\n'
       '// Coller tout le contenu dans la console du jeu (F12) pour tester sans Tampermonkey.\n'
       f'// Version : {version}\n'
       f"console.log('[Fabio RH] console-test :', {json.dumps(version, ensure_ascii=False)});\n"
       + body.replace(call, json.dumps(css, ensure_ascii=False), 1))
open('console-test.js', 'w').write(out)
print('console-test.js généré :', version)
