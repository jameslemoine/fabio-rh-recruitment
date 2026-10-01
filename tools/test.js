// Tests des fonctions pures du userscript (sans navigateur) : node tools/test.js
// Les fonctions sont extraites du script par leur nom puis évaluées ensemble.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const src = fs.readFileSync(path.join(__dirname, '..', 'Fabio RH Recruit Team-prive.js'), 'utf8').replace(/\r/g, '');
const lignes = src.split('\n');

// Déclaration de premier niveau (indentation 4) : une ligne, ou jusqu'à la fermeture "    }" / "    };"
function extraire(nom) {
    const debut = lignes.findIndex(l => new RegExp(`^    (?:const ${nom} =|(?:async )?function ${nom}\\()`).test(l));
    if (debut < 0) throw new Error(`Introuvable dans le script : ${nom}`);
    if (/;$/.test(lignes[debut]) && !/[{[(]$/.test(lignes[debut])) return lignes[debut];
    const fin = lignes.findIndex((l, i) => i > debut && /^    [}\]][;)]*$/.test(l));
    return lignes.slice(debut, fin + 1).join('\n');
}

const noms = ['esc', 'num', 'parseProfile', 'hridName', 'pretty', 'nb', 'TRIGGER_FR', 'trig', 'triggersText',
    'isValue', 'isLabel', 'cleanLine', 'rowsToHtml', 'linesToHtml'];
const f = new Function(noms.map(extraire).join('\n') + `\nreturn { ${noms.join(', ')} };`)();

let ok = 0, ko = 0;
function test(nom, fn) {
    try { fn(); ok++; } catch (e) { ko++; console.error(`ÉCHEC ${nom} :`, e.message); }
}

test('num : entiers avec séparateurs', () => {
    assert.strictEqual(f.num('10 054 281'), 10054281);
    assert.strictEqual(f.num('1.234.567'), 1234567);
    assert.strictEqual(f.num('1,234'), 1234);
    assert.strictEqual(f.num('513'), 513);
});
test('num : suffixes et décimales', () => {
    assert.strictEqual(f.num('1,2M'), 1200000);
    assert.strictEqual(f.num('3K'), 3000);
    assert.strictEqual(f.num('12.5'), 12.5);
    assert.ok(isNaN(f.num('abc')));
});

test('parseProfile : joueur en guilde', () => {
    const r = f.parseProfile('Bob\nMember of Fabio Lucci\nTotal Level\n1 234\nCombat Level\n98\nAge 1y 20d');
    assert.deepStrictEqual([r.hasGuild, r.rang, r.guilde], [true, 'Member', 'Fabio Lucci']);
    assert.deepStrictEqual(r.stats, { total: '1234', combat: '98', age: '1y 20d' });
});
test('parseProfile : sans guilde, Ironcow, ligne "Shrine of"', () => {
    const r = f.parseProfile('Bob\nShrine of Wisdom\nTotal Level 850\nCombat Level 40\nAge 12d\nIroncow');
    assert.deepStrictEqual([r.hasGuild, r.ironcow, r.stats.age], [false, true, '12d']);
});
test('parseProfile : guilde nommée Ironcow', () => {
    const r = f.parseProfile('Bob\nOfficer of Ironcow Gang\nTotal Level 850');
    assert.deepStrictEqual([r.hasGuild, r.ironcow, r.guilde], [true, false, 'Ironcow Gang']);
});

test('triggersText', () => {
    assert.strictEqual(f.triggersText([
        { dependencyHrid: '/x/self', conditionHrid: '/x/missing_hp', comparatorHrid: '/x/greater_than_equal', value: 150 },
        { dependencyHrid: '/x/targeted_enemy', conditionHrid: '/x/stun', comparatorHrid: '/x/is_inactive' }
    ]), 'Soi : PV manquants ≥ 150 et Cible : Stun inactif');
    assert.strictEqual(f.triggersText(undefined), '');
});

test('linesToHtml : libellés, jauge et échappement', () => {
    const html = f.linesToHtml(['Total Level', '1234', '(12 / 12)', '<b>'], '');
    assert.ok(html.includes('<dt>Total Level</dt><dd>1234</dd>'));
    assert.ok(html.includes('mwi-r-row done') && html.includes('width: 100%'));
    assert.ok(html.includes('&lt;b&gt;') && !html.includes('<b>'));
});

console.log(`${ok} test(s) réussi(s), ${ko} échec(s).`);
process.exit(ko ? 1 : 0);
