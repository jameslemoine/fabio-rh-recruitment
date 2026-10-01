# Fabio RH Recruit Team

Userscript Tampermonkey / Greasy Fork pour Milky Way Idle : scanne le chat, vérifie les profils des joueurs sans guilde et affiche une modale « Fabio RH ».

Dépôt : https://github.com/jameslemoine/fabio-rh-recruitment (compte GitHub `jameslemoine`, pas `lemoinejames`).

Le dépôt est **privé** depuis le 1er octobre 2026 : jsDelivr ne peut plus servir de nouveau `fabio-rh.css` (seul le CSS de la 1.19, déjà en cache, répondait encore), et Greasy Fork ne peut plus lire le script sur GitHub. Avant la prochaine publication, intégrer le CSS dans le script (plus de `@resource`) et publier sur Greasy Fork à la main ; la procédure « Push sur main » ci-dessous est à adapter en conséquence.

## Fichiers

- `Fabio RH Recruit Team-1.0.js` : le userscript. Il charge le CSS via `@resource FABIO_CSS` + `GM_getResourceText`.
- `fabio-rh.css` : tout le style de la modale (DA rouge et noir, couleurs du logo).
- `FabioLucci.png` : logo ; il est aussi intégré en base64 dans le script (`FABIO_ICON`).
- `tools/test.js` : tests Node des fonctions pures du script (extraites par leur nom).
- `tools/build-console.js` : génère `console-test.js` (script sans en-tête, CSS intégré) à coller dans la console du jeu.
- `General.png`, `Member.png`, `Officer.png` : ne jamais les commiter.

## Branches

- `dev` : branche de travail. Contient en plus `console-test.js`, `tools/`, `supabase/`, `.mcp.json`, `.gitignore` et ce `CLAUDE.md`.
- `main` : version publiée sur Greasy Fork. Contient uniquement le script, `fabio-rh.css`, `FabioLucci.png` et `README.md`.

## Après chaque modification (sur `dev`)

1. `node --check "Fabio RH Recruit Team-1.0.js"` puis `node tools/test.js` (tests des fonctions pures)
2. Commit du script et du CSS.
3. `node tools/build-console.js` puis `node --check console-test.js` : l'en-tête de `console-test.js` (et un `console.log` au lancement) reprend le hash et le titre de ce commit, pour savoir quelle version on teste.
4. Commit de `console-test.js` seul, puis push sur `origin dev`.

Sans Node sur la machine : `python3 tools/build-console.py` produit le même fichier, et `gjs` (SpiderMonkey) peut vérifier la syntaxe avec `new Function(source)`.

Ne jamais modifier `console-test.js` à la main.

## « Push sur main »

1. `git switch main && git pull`
2. `git merge --no-ff --no-commit dev`
3. Retirer les fichiers réservés à `dev` : `git rm -r --cached console-test.js tools supabase .mcp.json .gitignore CLAUDE.md` puis les supprimer du dossier. En cas de conflit modify/delete sur ces fichiers, `git rm` les résout.
4. Vérifier avec `git ls-files` qu'il ne reste que les fichiers de `main`, puis commit du merge et push.
5. Épingler le CSS sur ce commit de merge : dans la ligne `@resource FABIO_CSS`, remplacer le hash par `git rev-parse HEAD` :
   `https://cdn.jsdelivr.net/gh/jameslemoine/fabio-rh-recruitment@<hash complet>/fabio-rh.css`
6. Incrémenter `@version` (1.11 → 1.12…).
7. Vérifier que l'URL jsDelivr répond 200 (`curl -s -o /dev/null -w "%{http_code}"`), commit « Fabio RH x.y : CSS épinglé… » et push sur `main`.
8. Revenir sur `dev`, `git cherry-pick` ce dernier commit, régénérer `console-test.js`, commit et push.

Pourquoi : Greasy Fork préfère des ressources externes figées, et Tampermonkey ne recharge un `@resource` que si `@version` change.

## Supabase

Projet `cyvtgzkepticodlcrtjb` (https://cyvtgzkepticodlcrtjb.supabase.co) : stockera les profils récupérés par le userscript.

- Accès par le serveur MCP `supabase` (`.mcp.json`, authentifié via `/mcp`). Les outils en lecture seule sont autorisés sans demande dans `.claude/settings.local.json` ; `execute_sql` et `apply_migration` restent soumis à confirmation.
- Secrets dans `.secrets/supabase.env` (ignoré) : ne jamais les recopier dans le script, un commit ou un message. Le script public n'utilise que l'URL et la clé publishable, avec la RLS activée sur chaque table.
- Tout changement de schéma passe par `apply_migration`, puis le même SQL est enregistré dans `supabase/migrations/<version>_<nom>.sql` (version lue avec `list_migrations`) et commité sur `dev`.
- Après chaque migration : `get_advisors` (security puis performance) et corriger ce qu'il signale.
- Pas de CLI Supabase ni de `psql` sur la machine : tout passe par le MCP.
- Deux scans : « 1. Scanner le chat » lit une fois chaque onglet de chat coché ; « 🏆 Leaderboard » surveille la page en continu (MutationObserver, une lecture toutes les 400 ms au plus) sans rien cliquer et lit chaque classement que le joueur ouvre lui-même (joueurs d'un skill ou guildes de l'onglet Guilds, relu quand sa signature change). « Arrêter le leaderboard » envoie tout en un seul scan ; si la page se ferme pendant ce scan, il part dans la file d'envoi.
- Tables : `joueurs` (état courant), `scans` + `scan_entrees` (journal complet de chaque scan), `guildes_classements`, `verifications` (avec le profil brut `profile_shared`), `recruteurs` (comptes autorisés). Le script envoie un scan par `rpc/enregistrer_scan` et chaque vérification par un insert dans `verifications` ; un trigger met `joueurs` à jour.
- Côté script (section 0b) : connexion du recruteur par le bouton ☁ de la modale, session et file d'envois en attente dans `GM_getValue`/`GM_setValue`, requêtes par `GM_xmlhttpRequest` (`@connect` du projet), `fetch` dans `console-test.js`. Au chargement et à la connexion, `dbCharger` relit `joueurs` (statut, guilde, stats) et la vue `guildes_classements_derniers` (dernier relevé de chaque guilde par classement) ; `dbFiche` charge le profil brut de la dernière vérification à l'ouverture d'une fiche.
- Rôles (colonne `recruteurs.role`) : `rh` scanne, vérifie et écrit (`private.est_rh()`) ; `lecteur` consulte seulement (`private.est_recruteur()`). Le script masque canaux, scan et vérification hors compte rh, et n'envoie rien.
- Ajouter un recruteur : créer son compte (Authentication > Add user, « Auto Confirm User »), puis dans l'éditeur SQL `select private.definir_role('<email>', 'rh')` (ou `'lecteur'`, ou `null` pour retirer l'accès). Sans ligne dans `recruteurs`, le compte n'a accès à rien ; supprimer le compte supprime aussi sa ligne.

## Règles du jeu sur l'automatisation (à respecter dans toute modification)

Règles données par un membre de l'équipe MWI (Discord, 1er octobre 2026) :

- Lire ce qui est déjà disponible (page affichée, messages reçus du WebSocket) : toujours autorisé.
- Agir sur l'interface sans rien envoyer au serveur (préremplir un champ, ouvrir ou fermer une fenêtre) : autorisé.
- Ne jamais déclencher à la place du joueur l'action qui envoie au serveur (valider avec Entrée, cliquer sur Envoyer…). C'est le joueur qui appuie.
- Cliquer dans les menus et les onglets : autorisé, sauf ceux qui demandent des données au serveur. Avant d'automatiser un clic, vérifier dans le WebSocket qu'il n'envoie rien.
- Les onglets du leaderboard et des guildes envoient une requête : le script ne doit pas les parcourir. Il lit seulement le classement que le joueur a ouvert lui-même.

## Conventions

- Code et commentaires en français, dans le style existant.
- Messages de commit en français, terminés par la ligne `Co-Authored-By` demandée par la session.
- Ne pas pousser sans que l'utilisateur l'ait demandé (sauf les commits de travail sur `dev`, déjà autorisés).
