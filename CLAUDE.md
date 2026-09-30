# Fabio RH Recruit Team

Userscript Tampermonkey / Greasy Fork pour Milky Way Idle : scanne le chat, vérifie les profils des joueurs sans guilde et affiche une modale « Fabio RH ».

Dépôt : https://github.com/jameslemoine/fabio-rh-recruitment (compte GitHub `jameslemoine`, pas `lemoinejames`).

## Fichiers

- `Fabio RH Recruit Team-1.0.js` : le userscript. Il charge le CSS via `@resource FABIO_CSS` + `GM_getResourceText`.
- `fabio-rh.css` : tout le style de la modale (DA rouge et noir, couleurs du logo).
- `FabioLucci.png` : logo ; il est aussi intégré en base64 dans le script (`FABIO_ICON`).
- `tools/build-console.js` : génère `console-test.js` (script sans en-tête, CSS intégré) à coller dans la console du jeu.
- `General.png`, `Member.png`, `Officer.png` : ne jamais les commiter.

## Branches

- `dev` : branche de travail. Contient en plus `console-test.js`, `tools/` et ce `CLAUDE.md`.
- `main` : version publiée sur Greasy Fork. Contient uniquement le script, `fabio-rh.css`, `FabioLucci.png` et `README.md`.

## Après chaque modification (sur `dev`)

1. `node --check "Fabio RH Recruit Team-1.0.js"`
2. Commit du script et du CSS.
3. `node tools/build-console.js` puis `node --check console-test.js` : l'en-tête de `console-test.js` (et un `console.log` au lancement) reprend le hash et le titre de ce commit, pour savoir quelle version on teste.
4. Commit de `console-test.js` seul, puis push sur `origin dev`.

Ne jamais modifier `console-test.js` à la main.

## « Push sur main »

1. `git switch main && git pull`
2. `git merge --no-ff --no-commit dev`
3. Retirer les fichiers réservés à `dev` : `git rm -r --cached console-test.js tools CLAUDE.md` puis les supprimer du dossier. En cas de conflit modify/delete sur ces fichiers, `git rm` les résout.
4. Vérifier avec `git ls-files` qu'il ne reste que les fichiers de `main`, puis commit du merge et push.
5. Épingler le CSS sur ce commit de merge : dans la ligne `@resource FABIO_CSS`, remplacer le hash par `git rev-parse HEAD` :
   `https://cdn.jsdelivr.net/gh/jameslemoine/fabio-rh-recruitment@<hash complet>/fabio-rh.css`
6. Incrémenter `@version` (1.11 → 1.12…).
7. Vérifier que l'URL jsDelivr répond 200 (`curl -s -o /dev/null -w "%{http_code}"`), commit « Fabio RH x.y : CSS épinglé… » et push sur `main`.
8. Revenir sur `dev`, `git cherry-pick` ce dernier commit, régénérer `console-test.js`, commit et push.

Pourquoi : Greasy Fork préfère des ressources externes figées, et Tampermonkey ne recharge un `@resource` que si `@version` change.

## Conventions

- Code et commentaires en français, dans le style existant.
- Messages de commit en français, terminés par la ligne `Co-Authored-By` demandée par la session.
- Ne pas pousser sans que l'utilisateur l'ait demandé (sauf les commits de travail sur `dev`, déjà autorisés).
