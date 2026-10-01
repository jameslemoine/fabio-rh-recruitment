// Recopie fabio-rh.css dans le script (ligne « const CSS = … ») : node tools/integrer-css.js
// Le dépôt GitHub est privé, jsDelivr ne peut plus servir le CSS : il voyage dans le script.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const script = path.join(root, 'Fabio RH Recruit Team-1.0.js');
const css = fs.readFileSync(path.join(root, 'fabio-rh.css'), 'utf8');
const js = fs.readFileSync(script, 'utf8');
const ligne = '    const CSS = ' + JSON.stringify(css) + '; // fabio-rh.css, inséré par tools/integrer-css.js';
if (!/^    const CSS = .*$/m.test(js)) throw new Error('ligne « const CSS = » introuvable dans le script');
fs.writeFileSync(script, js.replace(/^    const CSS = .*$/m, () => ligne));
console.log('CSS intégré dans Fabio RH Recruit Team-1.0.js');
