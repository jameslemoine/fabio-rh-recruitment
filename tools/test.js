// Tests des fonctions pures du userscript (sans navigateur) : node tools/test.js
// Les fonctions sont extraites du script par leur nom puis évaluées ensemble.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const src = fs.readFileSync(path.join(__dirname, '..', 'Fabio RH Recruit Team-1.0.js'), 'utf8').replace(/\r/g, '');
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
    'isValue', 'isLabel', 'cleanLine', 'rowsToHtml', 'linesToHtml', 'niveauxProfil', 'meilleurSkill', 'TENUES', 'equipementProfil', 'equipementMetier', 'meilleurMetier'];
// SKILLS tient sur deux lignes : repris tel quel
const skills = src.match(/^    const SKILLS = \[[\s\S]*?\];$/m)[0];
const f = new Function(skills + '\n' + noms.map(extraire).join('\n') + `\nreturn { ${noms.join(', ')} };`)();

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

test('niveauxProfil : skills sans total_level', () => {
    assert.deepStrictEqual(f.niveauxProfil({ characterSkills: [
        { skillHrid: '/skills/milking', level: 106 }, { skillHrid: '/skills/total_level', level: 1861 },
        { skillHrid: '/skills/brewing', level: 135 }] }), { milking: 106, brewing: 135 });
    assert.strictEqual(f.niveauxProfil(null), null);
    assert.strictEqual(f.niveauxProfil({ characterSkills: [] }), null);
});
test('meilleurSkill : plus haut niveau, égalité dans l\'ordre du jeu', () => {
    assert.deepStrictEqual(f.meilleurSkill({ milking: 106, brewing: 135, magic: 120 }), { skill: 'brewing', niveau: 135 });
    assert.deepStrictEqual(f.meilleurSkill({ melee: 90, foraging: 90 }), { skill: 'foraging', niveau: 90 });
    assert.strictEqual(f.meilleurSkill(null), null);
});

const EQ = { body: 'tailors_top+10', legs: 'tailors_bottoms+10', charm: 'master_tailoring_charm',
    tailoring_tool: 'celestial_needle+10', cooking_tool: 'celestial_spatula+7', brewing_tool: 'holy_pot+5' };
test('equipementProfil : outils, tenue et charme, rien si masqué', () => {
    const brut = { wearableItemMap: {
        a: { itemLocationHrid: '/item_locations/brewing_tool', itemHrid: '/items/celestial_pot', enhancementLevel: 8 },
        b: { itemLocationHrid: '/item_locations/body', itemHrid: '/items/brewers_top', enhancementLevel: 0 },
        c: { itemLocationHrid: '/item_locations/head', itemHrid: '/items/red_culinary_hat', enhancementLevel: 0 } } };
    assert.deepStrictEqual(f.equipementProfil(brut), { brewing_tool: 'celestial_pot+8', body: 'brewers_top' });
    assert.strictEqual(f.equipementProfil({ ...brut, hideWearableItems: true }), null);
});
test('equipementMetier : celestial, tenue, charme et score', () => {
    assert.deepStrictEqual(f.equipementMetier(EQ, 'tailoring'), { celeste: true, plus: 10, haut: true, bas: true, charme: 'master', score: 5 });
    assert.deepStrictEqual(f.equipementMetier(EQ, 'cooking'), { celeste: true, plus: 7, haut: false, bas: false, charme: '', score: 2 });
    assert.strictEqual(f.equipementMetier(EQ, 'brewing').score, 0);
    assert.strictEqual(f.equipementMetier(EQ, 'melee').score, 0);
});
test('meilleurMetier : le mieux équipé, puis le niveau', () => {
    assert.strictEqual(f.meilleurMetier({ tailoring: 100, cooking: 130 }, EQ).skill, 'tailoring');
    const deux = { cooking_tool: 'celestial_spatula+5', brewing_tool: 'celestial_pot+5' };
    assert.strictEqual(f.meilleurMetier({ cooking: 100, brewing: 120 }, deux).skill, 'brewing');
    assert.strictEqual(f.meilleurMetier({ cooking: 100 }, null), null);
});

console.log(`${ok} test(s) réussi(s), ${ko} échec(s).`);
process.exit(ko ? 1 : 0);
