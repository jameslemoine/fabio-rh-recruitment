// Génère console-test.js : le script sans son en-tête (CSS déjà intégré), à coller dans la console du jeu.
// Usage : node tools/build-console.js (après avoir commité le script et le CSS : l'en-tête reprend ce commit)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const SOURCES = ['Fabio RH Recruit Team-1.0.js', 'fabio-rh.css'];
const js = fs.readFileSync(path.join(root, SOURCES[0]), 'utf8');
const css = fs.readFileSync(path.join(root, SOURCES[1]), 'utf8');

const body = js.replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\s*/, '');
if (!body.includes('    const CSS = "')) throw new Error('CSS pas intégré : lancer tools/integrer-css.js');

// Dernier commit qui touche le script ou le CSS, pour savoir quelle version on teste
const git = (args) => execSync(`git ${args} -- ${SOURCES.map(f => JSON.stringify(f)).join(' ')}`, { cwd: root, encoding: 'utf8' }).trim();
const version = git('log -1 --format="%h - %s"') + (git('status --porcelain') ? ' (+ modifications non commitées)' : '');

const out = '// Fichier généré par tools/build-console.js - ne pas modifier à la main.\n'
    + '// Coller tout le contenu dans la console du jeu (F12) pour tester sans Tampermonkey.\n'
    + `// Version : ${version}\n`
    + `console.log('[Fabio RH] console-test :', ${JSON.stringify(version)});\n`
    + body;

fs.writeFileSync(path.join(root, 'console-test.js'), out);
console.log('console-test.js généré :', version);
