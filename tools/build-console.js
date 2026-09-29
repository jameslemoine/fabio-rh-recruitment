// Génère console-test.js : le script avec le CSS intégré, à coller dans la console du jeu.
// Usage : node tools/build-console.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'Fabio RH Recruit Team-1.0.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'fabio-rh.css'), 'utf8');

const body = js.replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\s*/, '');
const call = "GM_getResourceText('FABIO_CSS')";
if (!body.includes(call)) throw new Error(`${call} introuvable dans le script`);

const out = '// Fichier généré par tools/build-console.js - ne pas modifier à la main.\n'
    + '// Coller tout le contenu dans la console du jeu (F12) pour tester sans Tampermonkey.\n'
    + body.replace(call, JSON.stringify(css));

fs.writeFileSync(path.join(root, 'console-test.js'), out);
console.log('console-test.js généré.');
