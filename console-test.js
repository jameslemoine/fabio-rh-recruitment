// Fichier généré par tools/build-console.js - ne pas modifier à la main.
// Coller tout le contenu dans la console du jeu (F12) pour tester sans Tampermonkey.
// Version : 68cf50b - Leaderboard : lecture passive des classements ouverts dans le jeu, avec suivi dans la modale (+ modifications non commitées)
console.log('[Fabio RH] console-test :', "68cf50b - Leaderboard : lecture passive des classements ouverts dans le jeu, avec suivi dans la modale (+ modifications non commitées)");
(function() {
    'use strict';

    const CHAT_MESSAGE_CLASS = 'ChatMessage_chatMessage';
    const FABIO_ICON = 'data:image/png;base64,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';
    const ATTENTE_PROFIL_MS = 1500; // délai MAX : on passe au suivant dès que le profil est lu
    const POLL_MS = 40;

    // Respect de l'anti-spam du jeu : délai minimum entre deux /profile, allongé automatiquement
    // si le jeu signale un spam, puis pause avant de retenter le même joueur.
    const INTERVALLE_MIN_MS = 1500;
    const INTERVALLE_MAX_MS = 8000;
    const PAUSE_ANTISPAM_MS = 15000;
    const MAX_REPRISES_ANTISPAM = 3;
    const ANTISPAM_RE = /spam|too (?:fast|quickly|many|frequent)|slow down|rate.?limit|trop (?:vite|rapide)/i;
    let intervalleMs = INTERVALLE_MIN_MS;
    let lastCommandAt = 0;
    let spamDetectedAt = 0;
    const STORAGE_KEY = 'mwi-radar-ui';
    const TAB_SWITCH_WAIT_MS = 200; // Ajusté à 350ms pour laisser le temps au DOM de charger l'historique

    const recrues = new Map();
    const MA_GUILDE = 'Fabio Lucci';
    const guildes = new Map(); // nom -> { nom, stats: { classement: { rang, valeurs: { colonne: texte } } } }
    let isProcessing = false;
    let isScanning = false;
    let currentFilter = 'free';
    let currentMode = 'all'; // 'all' | 'standard' | 'ironcow'

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const log = (...a) => console.log('[Radar]', ...a);
    const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // ---------------------------------------------------------------
    // 0. Données brutes des profils
    // ---------------------------------------------------------------
    // À chaque /profile, le serveur envoie au jeu un message "profile_shared" avec toutes les données du joueur
    // (skills, équipement, capacités, consommables et déclencheurs de combat, maison, sanctuaires...).
    // On l'écoute au passage, sans rien envoyer : plus fiable et plus complet que la lecture de l'écran.
    const profilsBruts = new Map(); // pseudo -> profil
    const page = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
    const toPage = (fn) => typeof exportFunction === 'function' ? exportFunction(fn, page) : fn;
    try {
        page.__fabioOnMessage = toPage((json) => {
            try {
                const msg = JSON.parse(json);
                if (msg.type === 'profile_shared') {
                    const nom = msg.profile && msg.profile.sharableCharacter && msg.profile.sharableCharacter.name;
                    if (nom) profilsBruts.set(nom, msg.profile);
                } else if (msg.type === 'leaderboard_updated') {
                    onLeaderboard(msg);
                }
            } catch (e) { log('Message du jeu illisible :', e); }
        });
        // Un seul crochet par page, même si le script est relancé (console) : il appelle le dernier __fabioOnMessage
        if (!page.__fabioHook2) {
            const desc = Object.getOwnPropertyDescriptor(page.MessageEvent.prototype, 'data');
            const get = toPage(function() {
                const d = desc.get.call(this);
                if (typeof d === 'string' && (d.includes('"profile_shared"') || d.includes('"leaderboard_updated"'))) {
                    try { page.__fabioOnMessage(d); } catch (e) { }
                }
                return d;
            });
            Object.defineProperty(page.MessageEvent.prototype, 'data', { configurable: true, enumerable: desc.enumerable, get });
            page.__fabioHook2 = true;
        }
    } catch (e) {
        log('Écoute des messages du jeu impossible :', e);
    }

    // ---------------------------------------------------------------
    // 1. Scanner le chat (Cible précisément les onglets du jeu via data-mention-channel)
    // ---------------------------------------------------------------
    function getChatTabs() {
        // On ne garde que les tablists du chat, pour ne pas cliquer sur les onglets Market/Inventaire/Profil
        const chatTablists = Array.from(document.querySelectorAll('[role="tablist"]')).filter(tl =>
            !tl.closest('#mwi-tracker-modal') && (
                tl.querySelector('button[role="tab"][data-mention-channel*="/chat_channel_types/"]') ||
                tl.closest('[class*="Chat_"]')
            ));
        const tabs = chatTablists.flatMap(tl => Array.from(tl.querySelectorAll('button[role="tab"]')));
        return tabs.filter(btn => {
            const id = btn.id || '';
            const title = (btn.getAttribute('title') || '').toLowerCase();
            const channelAttr = btn.getAttribute('data-mention-channel') || '';

            if (id === 'mwi-notification-log-tab' || title.includes('log of item trades')) {
                return false;
            }

            return channelAttr.includes('/chat_channel_types/') || btn.querySelector('span');
        });
    }

    const tabLabel = (tab) => {
        const span = tab.querySelector('span');
        return (span ? span.textContent.trim() : '') || tab.getAttribute('title') || 'Canal';
    };
    const tabKey = (tab) => tab.getAttribute('data-mention-channel') || tabLabel(tab);
    const isIronTab = (tab) => /ironcow/i.test(tabKey(tab) + ' ' + tabLabel(tab));

    // On mémorise les canaux exclus (et non les inclus) pour qu'un nouveau canal soit scanné par défaut
    function getSelectedTabs() {
        const excluded = loadUI().excludedChannels || [];
        return getChatTabs().filter(t => !excluded.includes(tabKey(t)));
    }

    function renderChannels() {
        const box = document.getElementById('mwi-channels');
        if (!box) return;
        const tabs = getChatTabs();
        if (tabs.length === 0) {
            box.innerHTML = '<span class="mwi-r-chan-empty">Aucun canal détecté (chat pas encore chargé ?)</span>';
            return;
        }
        const excluded = loadUI().excludedChannels || [];
        box.innerHTML = tabs.map(t => {
            const key = tabKey(t);
            return `<label class="mwi-r-chan${isIronTab(t) ? ' iron' : ''}">
                <input type="checkbox" data-key="${esc(key)}" ${excluded.includes(key) ? '' : 'checked'}>
                ${isIronTab(t) ? '🐄 ' : ''}${esc(tabLabel(t))}
            </label>`;
        }).join('');
        box.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.addEventListener('change', () => {
            const keys = Array.from(box.querySelectorAll('input[type="checkbox"]'))
                .filter(c => !c.checked).map(c => c.dataset.key);
            saveUI({ excludedChannels: keys });
        }));
    }

    // Pseudo et mode de jeu lus dans le composant CharacterName du jeu :
    // <div class="CharacterName_name" data-name="mireTN2"> + <div class="CharacterName_gameMode">[IC]</div>
    function readCharacterName(nameEl) {
        const box = nameEl.closest('[class*="CharacterName_characterName"]') || nameEl.parentElement;
        const modeEl = box && box.querySelector('[class*="CharacterName_gameMode"]');
        const colored = nameEl.closest('[style*="color"]') || nameEl.querySelector('[style*="color"]');
        return {
            username: nameEl.getAttribute('data-name'),
            ironcow: !!modeEl && /\bIC\b/i.test(modeEl.textContent),
            color: colored ? colored.style.color : ''
        };
    }

    // Ajoute ou met à jour un joueur ; renvoie true s'il est nouveau
    function upsertRecruit(username, color, ironcow, scanLog, source, brut) {
        if (recrues.has(username)) {
            const known = recrues.get(username);
            if (color && !known.color) known.color = color;
            if (ironcow) known.ironcow = true;
            scanLog.push({ pseudo: username, resultat: `déjà connu (${source})`, brut });
            return false;
        }
        const recruit = newRecruit(username, color);
        recruit.ironcow = !!ironcow;
        recrues.set(username, recruit);
        scanLog.push({ pseudo: username, resultat: `AJOUTÉ (${source})`, brut });
        return true;
    }

    function scanVisibleMessages(scanLog) {
        // Utilise un sélecteur large et robuste basé sur la classe partielle
        const messages = document.querySelectorAll(`[class*="${CHAT_MESSAGE_CLASS}"]`);
        let countNew = 0;

        messages.forEach(node => {
            // 1) Chemin rapide et fiable : l'expéditeur est le premier CharacterName du message
            const nameEl = node.querySelector('[class*="CharacterName_name"][data-name]');
            if (nameEl) {
                const c = readCharacterName(nameEl);
                if (/^[a-zA-Z0-9_-]{2,30}$/.test(c.username || '')) {
                    if (upsertRecruit(c.username, c.color, c.ironcow, scanLog, c.ironcow ? 'IC' : 'DOM', '')) countNew++;
                    return;
                }
            }

            // 2) Repli sur le texte (messages système sans composant CharacterName)
            // Texte du message sur une seule ligne : le pseudo, le ":" et le contenu peuvent être
            // dans des blocs séparés, que innerText coupe en plusieurs lignes.
            let text = (node.innerText || '').split('\n').map(l => l.trim()).filter(Boolean).join(' ');
            if (!text) return;

            const tsPrefix = /^\[[^\]]*\d{1,2}:\d{2}(?::\d{2})?\]\s*/;
            text = text.replace(tsPrefix, '');
            if (!text) return;

            // Messages système (buffs, paliers de niveau)
            const sysMatch = text.match(/^([\w-]{2,30})\s*(\[IC\])?\s*has (?:added .*community buff|reached level)/i);
            if (sysMatch) {
                if (upsertRecruit(sysMatch[1], node.style.color || '#4ea1e8', !!sysMatch[2], scanLog, 'système', text.slice(0, 40))) countNew++;
                return;
            }

            const match = text.match(/^([^:]{1,60}?)\s*:/);
            if (!match) {
                scanLog.push({ pseudo: '-', resultat: 'ignoré (pas d\'en-tête)', brut: text.slice(0, 40) });
                return;
            }

            let namePart = match[1];

            ['[Global]', '[Français]', '[Recruit]', '[Guild]', '[Party]', '[Whisper]', '[Local]', '[Help]', '[Trade]'].forEach(c => {
                if (namePart.startsWith(c)) namePart = namePart.replace(c, '').trim();
            });

            namePart = namePart.replace(/^(to|from)\s+/i, '');
            // [IC] est le mode de jeu, pas un tag de guilde
            const ironcow = /\[IC\]/i.test(namePart);
            namePart = namePart.replace(/\[IC\]/gi, '');
            const hasGuildTag = /\[.*?\]/.test(namePart);

            let rawUsername = namePart.replace(/\[.*?\]/g, '').trim();

            if (rawUsername.split(/\s+/).length > 2) {
                scanLog.push({ pseudo: rawUsername, resultat: 'ignoré (phrase système suspectée)', brut: match[1].slice(0, 40) });
                return;
            }

            let username = rawUsername.replace(/[^a-zA-Z0-9_-]/g, '');

            if (!/^[a-zA-Z0-9_-]{2,30}$/.test(username)) {
                scanLog.push({ pseudo: rawUsername, resultat: 'ignoré (pseudo invalide après nettoyage)', brut: match[1].slice(0, 40) });
                return;
            }
            if (hasGuildTag) {
                scanLog.push({ pseudo: username, resultat: 'ignoré (tag de guilde dans le chat)', brut: namePart });
                return;
            }

            if (upsertRecruit(username, '', ironcow, scanLog, 'texte', match[1].slice(0, 40))) countNew++;
        });

        return { countNew, total: messages.length };
    }

    window.mwiScanChat = async function() {
        if (isProcessing || isScanning) {
            setStatus('Patiente, une opération est déjà en cours.', 'warn');
            return;
        }

        renderChannels();
        const allTabs = getChatTabs();
        const tabs = getSelectedTabs();
        const scanBtn = document.getElementById('mwi-btn-scan');
        const processBtn = document.getElementById('mwi-btn-process');

        if (allTabs.length === 0) {
            setStatus('Aucun onglet de chat trouvé.', 'warn');
            return;
        }

        isScanning = true;
        if (scanBtn) { scanBtn.disabled = true; scanBtn.textContent = 'Scan en cours...'; }
        if (processBtn) processBtn.disabled = true;

        const activeTab = allTabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
        let countNew = 0;
        let totalMessages = 0;
        const scanLog = [];

        try {
            for (const tab of tabs) {
                const label = tabLabel(tab);
                setStatus(`Scan de "${label}"...`, '');

                tab.click();
                await sleep(TAB_SWITCH_WAIT_MS);

                const before = scanLog.length;
                const result = scanVisibleMessages(scanLog);
                for (let i = before; i < scanLog.length; i++) scanLog[i].onglet = label;

                countNew += result.countNew;
                totalMessages += result.total;
            }
            if (activeTab) activeTab.click();
            await sleep(50);
        } finally {
            isScanning = false;
            if (scanBtn) { scanBtn.disabled = false; scanBtn.textContent = '1. Scanner'; }
            if (processBtn) processBtn.disabled = false;
        }

        log(`${countNew} nouveaux joueurs mis en file d'attente (${recrues.size} au total).`);
        console.table(scanLog.filter(e => e.resultat.startsWith('ignoré')));
        setStatus(`Scan terminé (${tabs.length} onglets de chat) : ${countNew} nouveau(x) joueur(s).`, 'ok');
        updateModalUI();
    };

    // ---------------------------------------------------------------
    // 1b. Leaderboard : lecture passive des classements que le joueur ouvre lui-même dans le jeu
    // ---------------------------------------------------------------
    // À chaque classement ouvert, le jeu reçoit un message "leaderboard_updated" avec toutes les lignes
    // (nom, rang, valeurs). On les lit au passage : le script ne clique rien et n'envoie aucune demande.
    const LB_JOUEURS = ['total_level', 'milking', 'foraging', 'woodcutting', 'cheesesmithing', 'crafting', 'tailoring', 'cooking',
        'brewing', 'alchemy', 'enhancing', 'stamina', 'intelligence', 'attack', 'defense', 'melee', 'ranged', 'magic',
        'task_points', 'labyrinth_points', 'labyrinth_depth', 'collection_points', 'bestiary_points', 'fame_points'];
    const LB_GUILDES = { guild: 'Level', guild_buildings: 'Buildings', guild_shrines: 'Shrines', guild_points: 'Guild Points',
        guild_weekly_points: 'Weekly Points', guild_weekly_trial: 'Weekly Trials' };
    const lbRecus = { joueurs: new Set(), guildes: new Set() }; // classements déjà lus : "type|catégorie" et catégorie de guilde
    let lbDernier = ''; // dernier message reçu, pour ne pas le traiter deux fois
    function onLeaderboard(msg) {
        const lb = msg.leaderboard || {};
        const type = msg.leaderboardType || lb.type || '', cat = msg.leaderboardCategory || lb.category || '';
        const cle = [type, cat, msg.guildTypeFilter, msg.gameModeFilter, msg.trialFilter, msg.leaderboardRevision, (lb.rows || []).length].join('|');
        if (cle === lbDernier) return; // le jeu relit plusieurs fois le même message
        lbDernier = cle;
        // Lignes du classement, plus toute ligne isolée (notre propre rang quand il est hors du haut du classement)
        const rows = (Array.isArray(lb.rows) ? lb.rows : []).concat(
            Object.values(lb).filter(v => v && typeof v === 'object' && !Array.isArray(v) && v.name && 'rank' in v));
        if (type === 'guild') {
            // Seul le classement sans filtre donne le vrai rang de chaque guilde
            if ((msg.guildTypeFilter || 'all') !== 'all' || (msg.gameModeFilter || 'all') !== 'all') {
                setStatus('Classement de guildes filtré : remets les filtres du jeu sur « All » pour qu\'il soit lu.', 'warn');
                return;
            }
            const label = pretty(cat.replace(/^guild_/, ''));
            const cols = (lb.columnNames || []).map(c => pretty(String(c).split('.').pop().replace(/([a-z])([A-Z])/g, '$1 $2')));
            rows.forEach(r => {
                if (!r.name) return;
                const g = guildes.get(r.name) || { nom: r.name, stats: {} };
                const valeurs = {};
                cols.forEach((c, i) => { const v = r['value' + (i + 1)]; if (v !== undefined) valeurs[c || 'Valeur'] = nb(v); });
                g.stats[label] = { rang: r.rank, valeurs };
                guildes.set(r.name, g);
            });
            lbRecus.guildes.add(cat);
            setStatus(`Classement de guildes « ${LB_GUILDES[cat] || label} » lu : ${rows.length} guildes.`, 'ok');
            if (document.getElementById('mwi-tracker-modal')?.dataset.view === 'guilds') renderGuildView();
        } else {
            const iron = /iron/i.test(`${type} ${msg.gameModeFilter || ''}`);
            let nouveaux = 0;
            rows.forEach(r => {
                const nom = r.name || r.characterName;
                if (!/^[a-zA-Z0-9_-]{2,30}$/.test(nom || '')) return;
                if (upsertRecruit(nom, '', iron || /iron/i.test(r.gameMode || ''), [], `leaderboard ${cat}`, '')) nouveaux++;
            });
            lbRecus.joueurs.add(`${type}|${cat}`);
            setStatus(`Classement ${pretty(type)} « ${pretty(cat)} » lu : ${nouveaux} nouveau(x) joueur(s).`, 'ok');
            updateModalUI();
        }
        renderLeaderboard();
    }

    // Suivi dans la modale : les classements déjà lus sont cochés, les autres restent à ouvrir dans le jeu
    function renderLeaderboard() {
        const box = document.getElementById('mwi-lb');
        if (!box) return;
        const puce = (p) => `<span class="mwi-r-lbc${p[0] ? ' lu' : ''}">${p[0] ? '✓ ' : ''}${esc(p[1])}</span>`;
        const modes = currentMode === 'standard' ? ['standard'] : currentMode === 'ironcow' ? ['ironcow'] : ['standard', 'ironcow'];
        const groupes = modes.map(m => ({ nom: pretty(m), puces: LB_JOUEURS.map(c => [lbRecus.joueurs.has(`${m}|${c}`), pretty(c)]) }));
        groupes.push({ nom: 'Guilds', puces: Object.keys(LB_GUILDES).map(c => [lbRecus.guildes.has(c), LB_GUILDES[c]]) });
        const lus = groupes.reduce((n, g) => n + g.puces.filter(p => p[0]).length, 0);
        const total = groupes.reduce((n, g) => n + g.puces.length, 0);
        const details = box.querySelector('details');
        box.innerHTML = `<details${!details || details.open ? ' open' : ''}>
            <summary>Leaderboard : ${lus} / ${total} classements lus — ouvre-les dans le jeu, ils sont lus au passage</summary>
            ${groupes.map(g => `<div class="mwi-r-lbg"><b>${esc(g.nom)}</b>${g.puces.map(puce).join('')}</div>`).join('')}
        </details>`;
    }

    // Nombre lu dans une valeur affichée : "10 054 281", "1,2M", "513"
    const num = (v) => {
        const m = String(v).replace(/\s/g, '').match(/^(-?\d[\d.,]*)([KMBT])?/i);
        if (!m) return NaN;
        const mult = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[(m[2] || '').toUpperCase()];
        return mult ? parseFloat(m[1].replace(',', '.')) * mult : parseFloat(m[1].replace(/[.,]/g, ''));
    };

    function newRecruit(nom, color = '') {
        return {
            nom,
            color,
            hasGuild: false,
            guilde: '',
            rang: '',
            verifie: false,
            echec: false,
            ironcow: false,
            stats: { total: "?", combat: "?", age: "?" }
        };
    }

    // ---------------------------------------------------------------
    // 2. Envoyer la commande de profil
    // ---------------------------------------------------------------
    window.mwiSendProfileCommand = function(username) {
        // Sélecteurs testés un par un, par ordre de priorité (une liste unique renverrait le premier élément du DOM)
        const selectors = [
            '[class*="Chat_"] input[type="text"]',
            '[class*="Chat_"] textarea',
            'input[placeholder*="message" i]',
            'input[class*="chat" i]',
            'textarea[class*="chat" i]'
        ];
        let chatInput = null;
        for (const sel of selectors) {
            chatInput = Array.from(document.querySelectorAll(sel)).find(el => !el.closest('#mwi-tracker-modal'));
            if (chatInput) break;
        }
        if (!chatInput) return false;

        const command = `/profile ${username}`;

        const proto = chatInput instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
        if (nativeInputValueSetter) {
            nativeInputValueSetter.call(chatInput, command);
        } else {
            chatInput.value = command;
        }

        chatInput.dispatchEvent(new Event('input', { bubbles: true }));
        chatInput.dispatchEvent(new Event('change', { bubbles: true }));

        setTimeout(() => {
            chatInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
            chatInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
        }, 30);

        return true;
    };

    // ---------------------------------------------------------------
    // 3. Interface & Styles
    // ---------------------------------------------------------------
    const CSS = "#mwi-tracker-modal, #mwi-radar-launcher {\r\n    --r-bg: #0c0a0b;\r\n    --r-panel: #171113;\r\n    --r-panel-2: #24161a;\r\n    --r-border: #4a1f25;\r\n    --r-accent: #e0343c;\r\n    --r-accent-strong: #b3151d;\r\n    --r-gold: #e8b64c;\r\n    --r-text: #f4ece6;\r\n    --r-muted: #a08a8c;\r\n    --r-ok: #4ecb8d;\r\n    --r-warn: #f0a950;\r\n    --r-err: #ff5a5f;\r\n    font-family: \"Roboto\", \"Segoe UI\", sans-serif;\r\n    box-sizing: border-box;\r\n}\r\n#mwi-tracker-modal *, #mwi-radar-launcher * { box-sizing: border-box; }\r\n\r\n#mwi-tracker-modal {\r\n    position: fixed; top: 60px; right: 12px; z-index: 99999;\r\n    width: 340px; max-width: calc(100vw - 16px);\r\n    display: flex; flex-direction: column;\r\n    background: var(--r-bg); color: var(--r-text);\r\n    border: 1px solid var(--r-border); border-radius: 10px;\r\n    box-shadow: 0 8px 24px rgba(0,0,0,.55);\r\n    overflow: hidden; font-size: 13px;\r\n}\r\n#mwi-tracker-modal[data-mode=\"max\"] {\r\n    top: 5vh !important; left: 5vw !important; right: auto !important;\r\n    width: 90vw !important; height: 88vh !important;\r\n}\r\n#mwi-tracker-modal[data-mode=\"min\"] { height: auto !important; }\r\n#mwi-tracker-modal[data-sized=\"1\"] .mwi-r-list { max-height: none; }\r\n#mwi-tracker-modal[data-mode=\"min\"] .mwi-r-body { display: none; }\r\n#mwi-tracker-modal[data-mode=\"min\"] { width: 260px; }\r\n\r\n.mwi-r-head {\r\n    display: flex; align-items: center; gap: 8px;\r\n    padding: 8px 10px; cursor: move; user-select: none;\r\n    background: linear-gradient(180deg, var(--r-panel-2), var(--r-panel));\r\n    border-bottom: 2px solid var(--r-accent);\r\n}\r\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-head { cursor: default; }\r\n.mwi-r-title { flex: 1; font-size: 14px; font-weight: 700; color: var(--r-accent); letter-spacing: .3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\r\n.mwi-r-logo { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; display: block; }\r\n#mwi-radar-launcher { padding: 0; overflow: hidden; }\r\n#mwi-radar-launcher .mwi-r-logo { width: 100%; height: 100%; }\r\n.mwi-r-player { cursor: pointer; }\r\n.mwi-r-player:hover { text-decoration: underline; }\r\n.mwi-r-right { display: flex; align-items: center; gap: 6px; }\r\n.mwi-r-profile {\r\n    visibility: hidden; font-weight: 700;\r\n    padding: 3px 12px; font-size: 12px; letter-spacing: .3px; cursor: pointer;\r\n    color: #fff; background: var(--r-accent);\r\n    border: 1px solid var(--r-accent); border-radius: 4px;\r\n    box-shadow: 0 0 8px rgba(224, 52, 60, .45);\r\n    transition: background .15s, box-shadow .15s, transform .1s;\r\n}\r\n.mwi-r-profile:hover { text-decoration: none; background: var(--r-accent-strong); box-shadow: 0 0 12px rgba(224, 52, 60, .75); transform: translateY(-1px); }\r\n.mwi-r-badge {\r\n    min-width: 22px; padding: 1px 7px; text-align: center;\r\n    font-size: 12px; font-weight: 700; color: var(--r-bg);\r\n    background: var(--r-ok); border-radius: 10px;\r\n}\r\n.mwi-r-ctrl { display: flex; gap: 4px; }\r\n.mwi-r-icon {\r\n    width: 24px; height: 24px; padding: 0; line-height: 1;\r\n    display: flex; align-items: center; justify-content: center;\r\n    color: var(--r-text); background: transparent;\r\n    border: 1px solid var(--r-border); border-radius: 5px;\r\n    cursor: pointer; font-size: 14px; transition: background .15s, border-color .15s;\r\n}\r\n.mwi-r-icon:hover { background: var(--r-panel-2); border-color: var(--r-accent); }\r\n.mwi-r-icon.close:hover { background: var(--r-err); border-color: var(--r-err); }\r\n\r\n.mwi-r-body { display: flex; flex-direction: column; gap: 10px; padding: 10px; flex: 1; min-height: 0; }\r\n\r\n.mwi-r-toolbar { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }\r\n\r\n.mwi-r-chans-head { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--r-muted); }\r\n.mwi-r-chans { display: flex; flex-wrap: wrap; gap: 4px; }\r\n.mwi-r-chan {\r\n    display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px;\r\n    font-size: 11px; cursor: pointer; user-select: none;\r\n    background: var(--r-panel); border: 1px solid var(--r-border); border-radius: 10px;\r\n}\r\n.mwi-r-chan:has(input:checked) { border-color: var(--r-accent); color: var(--r-text); }\r\n.mwi-r-chan:not(:has(input:checked)) { color: var(--r-muted); opacity: .7; }\r\n.mwi-r-chan.iron:has(input:checked) { border-color: var(--r-warn); }\r\n.mwi-r-chan input { margin: 0; accent-color: var(--r-accent); }\r\n.mwi-r-chan-empty { font-size: 11px; font-style: italic; color: var(--r-muted); }\r\n/* Suivi des classements du leaderboard lus au passage */\r\n.mwi-r-lb { font-size: 11px; color: var(--r-muted); }\r\n.mwi-r-lb summary { cursor: pointer; user-select: none; }\r\n.mwi-r-lbg { display: flex; flex-wrap: wrap; align-items: center; gap: 3px; margin-top: 4px; }\r\n.mwi-r-lbg b { flex: 0 0 64px; color: var(--r-text); }\r\n.mwi-r-lbc { padding: 1px 6px; background: var(--r-panel); border: 1px solid var(--r-border); border-radius: 8px; opacity: .7; }\r\n.mwi-r-lbc.lu { color: var(--r-ok); border-color: var(--r-ok); opacity: 1; }\r\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-lb { display: none; }\r\n.mwi-r-iron { font-size: 11px; font-weight: 700; color: var(--r-warn); margin-left: 4px; }\r\n.mwi-r-select {\r\n    flex: 0 1 150px; padding: 5px 8px; color: var(--r-text);\r\n    background: var(--r-panel); border: 1px solid var(--r-border);\r\n    border-radius: 5px; font-size: 12px; outline: none;\r\n}\r\n.mwi-r-select:focus { border-color: var(--r-accent); }\r\n\r\n.mwi-r-btn {\r\n    padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer;\r\n    color: var(--r-text); background: var(--r-panel-2);\r\n    border: 1px solid var(--r-border); border-radius: 5px;\r\n    transition: background .15s, border-color .15s, opacity .15s;\r\n}\r\n.mwi-r-btn:hover:not(:disabled) { border-color: var(--r-accent); background: #331a1f; }\r\n.mwi-r-btn.primary { color: #fff; background: var(--r-accent); border-color: var(--r-accent); }\r\n.mwi-r-btn.primary:hover:not(:disabled) { background: var(--r-accent-strong); }\r\n.mwi-r-btn:disabled { opacity: .55; cursor: not-allowed; }\r\n\r\n.mwi-r-list {\r\n    overflow-x: hidden; padding-right: 2px;\r\n    flex: 1; min-height: 120px; max-height: 320px; overflow-y: auto;\r\n    list-style: none; margin: 0; padding: 0;\r\n    display: grid; grid-template-columns: 1fr; gap: 6px; align-content: start;\r\n}\r\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-list {\r\n    max-height: none;\r\n    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));\r\n}\r\n.mwi-r-list::-webkit-scrollbar { width: 8px; }\r\n.mwi-r-list::-webkit-scrollbar-thumb { background: var(--r-border); border-radius: 4px; }\r\n\r\n.mwi-r-card {\r\n    padding: 8px 10px; background: var(--r-panel);\r\n    border: 1px solid var(--r-border); border-left: 3px solid var(--r-ok);\r\n    border-radius: 6px;\r\n}\r\n.mwi-r-card.guild { border-left-color: var(--r-gold); }\r\n.mwi-r-card.fail { border-left-color: var(--r-err); }\r\n.mwi-r-card.pending { border-left-color: var(--r-muted); }\r\n.mwi-r-name { font-weight: 700; font-size: 14px; color: var(--r-text); display: flex; justify-content: space-between; align-items: center; gap: 8px; min-width: 0; }\r\n.mwi-r-who { display: flex; align-items: center; min-width: 0; overflow: hidden; }\r\n.mwi-r-who .mwi-r-player { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r\n.mwi-r-iron { flex-shrink: 0; }\r\n.mwi-r-right { flex-shrink: 0; }\r\n.mwi-r-card { min-width: 0; transition: border-color .15s, background .15s; }\r\n.mwi-r-card:hover { background: var(--r-panel-2); border-color: var(--r-accent); }\r\n.mwi-r-tag { font-size: 11px; font-weight: 700; color: var(--r-muted); white-space: nowrap; }\r\n.mwi-r-card:not(.guild):not(.fail):not(.pending) .mwi-r-tag { color: var(--r-ok); }\r\n.mwi-r-card.fail .mwi-r-tag { color: var(--r-err); }\r\n.mwi-r-card.guild .mwi-r-tag { color: var(--r-gold); }\r\n.mwi-r-stats { display: flex; flex-wrap: wrap; gap: 4px 12px; margin-top: 5px; font-size: 12px; color: var(--r-muted); }\r\n.mwi-r-stats b { color: var(--r-text); font-weight: 600; }\r\n.mwi-r-sizes { display: flex; gap: 2px; padding: 2px; background: var(--r-panel); border: 1px solid var(--r-border); border-radius: 6px; }\r\n.mwi-r-sizes .mwi-r-icon { border-color: transparent; color: var(--r-muted); }\r\n.mwi-r-sizes .mwi-r-icon.active { color: var(--r-accent); background: var(--r-panel-2); border-color: var(--r-accent); }\r\n.mwi-r-details { display: none; grid-template-columns: auto 1fr; gap: 3px 12px; margin: 6px 0 0; font-size: 12px; }\r\n.mwi-r-details dt { color: var(--r-muted); }\r\n.mwi-r-details dd { margin: 0; color: var(--r-text); font-weight: 600; }\r\n\r\n/* Taille des cases : grandes = toutes les infos en liste, moyennes = bouton visible, petites = bouton au survol */\r\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-card { padding: 10px 12px; }\r\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-name { font-size: 15px; }\r\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-stats,\r\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-tag { display: none; }\r\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-details { display: grid; }\r\n#mwi-tracker-modal[data-size=\"large\"][data-mode=\"max\"] .mwi-r-list { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }\r\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-profile,\r\n#mwi-tracker-modal[data-size=\"medium\"] .mwi-r-profile { visibility: visible; }\r\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-card { padding: 4px 8px; }\r\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-name { font-size: 13px; align-items: center; }\r\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-stats { display: none; }\r\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-list { gap: 3px; }\r\n#mwi-tracker-modal[data-size=\"small\"][data-mode=\"max\"] .mwi-r-list { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); }\r\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-card:hover .mwi-r-profile { visibility: visible; }\r\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-card { border-left-width: 1px; }\r\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-tag { font-size: 0; }\r\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-tag::before {\r\n    content: ''; display: block; width: 8px; height: 8px; border-radius: 50%; background: currentColor;\r\n}\r\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-card.pending .mwi-r-tag { color: var(--r-muted); }\r\n#mwi-tracker-modal[data-size=\"medium\"][data-mode=\"max\"] .mwi-r-list { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }\r\n.mwi-r-card[data-player] { cursor: pointer; }\r\n\r\n/* Fiche joueur */\r\n.mwi-r-pview { display: none; flex: 1; min-height: 0; flex-direction: column; gap: 8px; }\r\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-pview { display: flex; }\r\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-list,\r\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-toolbar,\r\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-chans-head,\r\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-chans { display: none; }\r\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-list,\r\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-toolbar,\r\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-chans-head,\r\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-chans { display: none; }\r\n.mwi-r-phead { display: flex; align-items: center; gap: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--r-border); }\r\n.mwi-r-pname { flex: 1; min-width: 0; font-size: 17px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r\n.mwi-r-pview .mwi-r-profile { visibility: visible; }\r\n.mwi-r-ptabs { display: flex; flex-wrap: wrap; gap: 4px; }\r\n.mwi-r-ptab {\r\n    padding: 4px 10px; font-size: 12px; font-weight: 700; cursor: pointer;\r\n    color: var(--r-muted); background: var(--r-panel);\r\n    border: 1px solid var(--r-border); border-radius: 14px;\r\n    transition: color .15s, border-color .15s, background .15s;\r\n}\r\n.mwi-r-ptab:hover { color: var(--r-text); border-color: var(--r-accent); }\r\n.mwi-r-ptab.active { color: #fff; background: var(--r-accent); border-color: var(--r-accent); }\r\n.mwi-r-pbody {\r\n    flex: 1; min-height: 140px; max-height: 360px; overflow-y: auto; padding: 10px 12px;\r\n    background: var(--r-panel); border: 1px solid var(--r-border); border-radius: 6px;\r\n}\r\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-pbody,\r\n#mwi-tracker-modal[data-sized=\"1\"] .mwi-r-pbody { max-height: none; }\r\n.mwi-r-pbody::-webkit-scrollbar { width: 8px; }\r\n.mwi-r-pbody::-webkit-scrollbar-thumb { background: var(--r-border); border-radius: 4px; }\r\n.mwi-r-pgrid { display: grid; grid-template-columns: auto 1fr; gap: 6px 16px; margin: 0; font-size: 13px; }\r\n.mwi-r-pgrid dt { color: var(--r-muted); }\r\n.mwi-r-pgrid dd { margin: 0; font-weight: 700; }\r\n.mwi-r-pstat.free { color: var(--r-ok); }\r\n.mwi-r-pstat.guild { color: var(--r-gold); }\r\n.mwi-r-pstat.fail { color: var(--r-err); }\r\n.mwi-r-pstat.pending { color: var(--r-muted); }\r\n.mwi-r-plines { list-style: none; margin: 0; padding: 0; columns: 220px; column-gap: 20px; font-size: 12px; }\r\n.mwi-r-plines li { padding: 3px 0; border-bottom: 1px solid rgba(255,255,255,.04); break-inside: avoid; }\r\n.mwi-r-ptab:focus { outline: none; }\r\n.mwi-r-rows { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 0 20px; margin: 0; font-size: 13px; }\r\n.mwi-r-row {\r\n    display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 4px 12px;\r\n    padding: 6px 2px; border-bottom: 1px solid rgba(255,255,255,.06);\r\n}\r\n.mwi-r-row dt { color: var(--r-muted); }\r\n.mwi-r-row dd { margin: 0; font-weight: 700; color: var(--r-text); text-align: right; font-variant-numeric: tabular-nums; }\r\n.mwi-r-row.done dd { color: var(--r-ok); }\r\n.mwi-r-bar { flex-basis: 100%; height: 4px; background: var(--r-bg); border-radius: 2px; overflow: hidden; }\r\n.mwi-r-bar > div { height: 100%; background: var(--r-accent); border-radius: 2px; }\r\n.mwi-r-row.done .mwi-r-bar > div { background: var(--r-ok); }\r\n.mwi-r-solos { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-bottom: 8px; font-size: 12px; }\r\n.mwi-r-solo-label { color: var(--r-muted); }\r\n.mwi-r-solo { padding: 2px 10px; font-weight: 700; color: var(--r-text); background: var(--r-bg); border: 1px solid var(--r-border); border-radius: 12px; }\r\n.mwi-r-solo-label ~ .mwi-r-solo { font-weight: 400; color: var(--r-muted); border-style: dashed; }\r\n/* Cases du profil : icône au centre, textes et badges dans les coins */\r\n.mwi-r-tiles {\r\n    --tile: 58px;\r\n    display: grid; grid-template-columns: repeat(auto-fill, var(--tile)); grid-auto-rows: var(--tile);\r\n    gap: 6px; margin-top: 10px; justify-content: start; overflow-x: auto; padding-bottom: 2px;\r\n}\r\n.mwi-r-tiles:first-child { margin-top: 0; }\r\n.mwi-r-tiles.placed { grid-template-columns: repeat(var(--cols), var(--tile)); }\r\n.mwi-r-tile {\r\n    position: relative; width: var(--tile); height: var(--tile);\r\n    display: flex; align-items: center; justify-content: center;\r\n    background: linear-gradient(160deg, var(--r-panel-2), var(--r-bg));\r\n    border: 1px solid var(--r-border); border-radius: 6px;\r\n    transition: border-color .15s, box-shadow .15s;\r\n}\r\n.mwi-r-tile:hover { border-color: var(--r-accent); box-shadow: 0 0 8px rgba(224, 52, 60, .35); }\r\n.mwi-r-tico { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }\r\n.mwi-r-tico svg, .mwi-r-tico img { width: 40px; height: 40px; object-fit: contain; }\r\n.mwi-r-tt {\r\n    position: absolute; max-width: calc(100% - 4px); overflow: hidden; white-space: nowrap;\r\n    font-size: 11px; font-weight: 700; line-height: 1; color: var(--r-text);\r\n    text-shadow: 0 0 3px #000, 0 0 3px #000;\r\n}\r\n.mwi-r-tt.tl { top: 3px; left: 3px; }\r\n.mwi-r-tt.tc { top: 3px; left: 50%; transform: translateX(-50%); }\r\n.mwi-r-tt.tr { top: 3px; right: 3px; }\r\n.mwi-r-tt.bl { bottom: 3px; left: 3px; }\r\n.mwi-r-tt.bc { bottom: 3px; left: 50%; transform: translateX(-50%); }\r\n.mwi-r-tt.br { bottom: 3px; right: 3px; }\r\n.mwi-r-tt.plus { color: var(--r-warn); }\r\n.mwi-r-tt.num { color: var(--r-ok); }\r\n.mwi-r-tb { position: absolute; width: 16px; height: 16px; }\r\n.mwi-r-tb svg, .mwi-r-tb img { width: 16px; height: 16px; }\r\n.mwi-r-tb.tl { top: 2px; left: 2px; }\r\n.mwi-r-tb.tr { top: 2px; right: 2px; }\r\n.mwi-r-tb.bl { bottom: 2px; left: 2px; }\r\n.mwi-r-tb.br { bottom: 2px; right: 2px; }\r\n.mwi-r-tb.tc { top: 2px; left: calc(50% - 8px); }\r\n.mwi-r-tb.bc { bottom: 2px; left: calc(50% - 8px); }\r\n.mwi-r-tile.vide { background: none; border-style: dashed; opacity: .75; }\r\n.mwi-r-tname { padding: 2px; font-size: 9px; line-height: 1.15; text-align: center; color: var(--r-muted); overflow: hidden; }\r\n.mwi-r-sub { margin: 14px 0 6px; font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--r-muted); }\r\n.mwi-r-sub:first-child { margin-top: 0; }\r\n.mwi-r-psec .mwi-r-sub + .mwi-r-tiles, .mwi-r-sub + .mwi-r-tiles { margin-top: 0; }\r\n.mwi-r-pempty { margin: 10px 0 0; font-style: italic; color: var(--r-muted); font-size: 12px; }\r\n\r\n/* Petite fenêtre : un onglet à la fois. Modale large : toutes les sections répertoriées en colonnes, sans onglets */\r\n.mwi-r-pview { container-type: inline-size; container-name: mwi-pview; }\r\n.mwi-r-psec:not(.active) { display: none; }\r\n.mwi-r-psec-title { display: none; }\r\n@container mwi-pview (min-width: 880px) {\r\n    .mwi-r-ptabs { display: none; }\r\n    .mwi-r-pbody { padding: 0 4px 0 0; background: none; border: 0; border-radius: 0; }\r\n    .mwi-r-psecs { columns: 420px; column-gap: 12px; }\r\n    .mwi-r-psec, .mwi-r-psec:not(.active) {\r\n        display: block; break-inside: avoid; margin: 0 0 12px; padding: 12px 14px 14px;\r\n        background: linear-gradient(180deg, var(--r-panel-2), var(--r-panel) 46px);\r\n        border: 1px solid var(--r-border); border-top: 2px solid var(--r-accent); border-radius: 8px;\r\n        box-shadow: 0 2px 10px rgba(0,0,0,.35);\r\n    }\r\n    .mwi-r-psec-title {\r\n        display: flex; align-items: center; gap: 8px; margin: 0 0 12px;\r\n        font-size: 12px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; color: var(--r-gold);\r\n    }\r\n    .mwi-r-psec-title::after { content: ''; flex: 1; height: 1px; background: var(--r-border); }\r\n    .mwi-r-psec .mwi-r-rows { grid-template-columns: 1fr; }\r\n    .mwi-r-psec .mwi-r-tiles { justify-content: center; }\r\n}\r\n/* Très grande modale : trois colonnes indépendantes (Skills | Résumé, Overview | Equipment), le reste réparti en dessous */\r\n.mwi-r-pcol { display: contents; }\r\n@container mwi-pview (min-width: 1200px) {\r\n    .mwi-r-psecs {\r\n        columns: auto; display: grid; gap: 12px; align-items: start;\r\n        grid-template-columns: minmax(0, .8fr) minmax(0, 1fr) minmax(400px, 1.1fr);\r\n    }\r\n    .mwi-r-pcol { display: flex; flex-direction: column; gap: 12px; min-width: 0; }\r\n    .mwi-r-psec, .mwi-r-psec:not(.active) { margin: 0; min-width: 0; }\r\n    /* Cases plus grandes, réparties sur toute la largeur de la section */\r\n    .mwi-r-psec .mwi-r-tiles {\r\n        --tile: clamp(58px, 4cqw, 72px); gap: 12px 8px; margin-top: 12px;\r\n        grid-template-columns: repeat(auto-fill, minmax(calc(var(--tile) + 14px), 1fr));\r\n        justify-content: stretch; justify-items: center;\r\n    }\r\n    .mwi-r-psec .mwi-r-tiles.placed { grid-template-columns: repeat(var(--cols), minmax(var(--tile), 1fr)); }\r\n    .mwi-r-psec .mwi-r-tico, .mwi-r-psec .mwi-r-tico svg, .mwi-r-psec .mwi-r-tico img { width: calc(var(--tile) - 18px); height: calc(var(--tile) - 18px); }\r\n    .mwi-r-psec .mwi-r-tt { font-size: 12px; }\r\n}\r\n\r\n/* Comparaison des guildes */\r\n.mwi-r-gview { display: none; flex: 1; min-height: 0; flex-direction: column; gap: 8px; }\r\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-gview { display: flex; }\r\n.mwi-r-gcount { margin-left: 8px; font-size: 12px; font-weight: 400; color: var(--r-muted); }\r\n.mwi-r-gbody { flex: 1; min-height: 140px; max-height: 360px; overflow: auto; padding-right: 4px; }\r\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-gbody,\r\n#mwi-tracker-modal[data-sized=\"1\"] .mwi-r-gbody { max-height: none; }\r\n.mwi-r-gbody::-webkit-scrollbar { width: 8px; height: 8px; }\r\n.mwi-r-gbody::-webkit-scrollbar-thumb { background: var(--r-border); border-radius: 4px; }\r\n.mwi-r-gcards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; margin-bottom: 12px; }\r\n.mwi-r-gcard {\r\n    padding: 10px 12px; cursor: pointer;\r\n    background: linear-gradient(180deg, var(--r-panel-2), var(--r-panel) 46px);\r\n    border: 1px solid var(--r-border); border-top: 2px solid var(--r-border); border-radius: 8px;\r\n    transition: border-color .15s;\r\n}\r\n.mwi-r-gcard:hover, .mwi-r-gcard.active { border-color: var(--r-accent); }\r\n.mwi-r-gcard h4 { margin: 0 0 4px; font-size: 12px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; color: var(--r-gold); }\r\n.mwi-r-grank { font-size: 24px; font-weight: 700; line-height: 1.2; color: var(--r-text); }\r\n.mwi-r-gcard .mwi-r-rows { grid-template-columns: 1fr; font-size: 12px; }\r\n.mwi-r-rows + .mwi-r-gverdict { margin-top: 10px; }\r\n.mwi-r-gverdict { margin: 0 0 6px; padding: 5px 10px; font-size: 12px; font-weight: 700; color: var(--r-muted); background: var(--r-bg); border-left: 3px solid var(--r-muted); border-radius: 4px; }\r\n.mwi-r-gverdict.mieux { color: var(--r-err); border-left-color: var(--r-err); }\r\n.mwi-r-gverdict.moins { color: var(--r-ok); border-left-color: var(--r-ok); }\r\n.mwi-r-gverdict.egal { color: var(--r-warn); border-left-color: var(--r-warn); }\r\n.mwi-r-gtable { width: 100%; border-collapse: collapse; font-size: 12px; }\r\n.mwi-r-gtable th {\r\n    position: sticky; top: 0; z-index: 1; padding: 6px 8px; text-align: left; white-space: nowrap;\r\n    color: var(--r-muted); background: var(--r-panel-2); border-bottom: 2px solid var(--r-border);\r\n}\r\n.mwi-r-gtable th[data-action] { cursor: pointer; }\r\n.mwi-r-gtable th[data-action]:hover { color: var(--r-text); }\r\n.mwi-r-gtable th.active { color: var(--r-accent); border-bottom-color: var(--r-accent); }\r\n.mwi-r-gtable td { padding: 5px 8px; white-space: nowrap; border-bottom: 1px solid rgba(255,255,255,.05); }\r\n.mwi-r-gtable .n { text-align: right; font-variant-numeric: tabular-nums; }\r\n.mwi-r-gtable small { margin-left: 4px; color: var(--r-muted); }\r\n.mwi-r-gtable tbody tr:hover { background: var(--r-panel); }\r\n.mwi-r-gtable tr.moi td { font-weight: 700; color: var(--r-gold); background: var(--r-panel-2); border-bottom: 1px solid var(--r-accent); }\r\n\r\n.mwi-r-empty { padding: 18px 8px; text-align: center; font-style: italic; color: var(--r-muted); background: var(--r-panel); border: 1px dashed var(--r-border); border-radius: 6px; }\r\n\r\n.mwi-r-progress { height: 4px; background: var(--r-panel); border-radius: 2px; overflow: hidden; display: none; }\r\n.mwi-r-progress > div { height: 100%; width: 0; background: var(--r-accent); transition: width .2s; }\r\n\r\n.mwi-r-actions { display: flex; gap: 8px; }\r\n.mwi-r-actions .mwi-r-btn { flex: 1; }\r\n\r\n.mwi-r-foot { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 11px; color: var(--r-muted); }\r\n#mwi-status.ok { color: var(--r-ok); }\r\n#mwi-status.warn { color: var(--r-warn); }\r\n#mwi-status.err { color: var(--r-err); }\r\n\r\n#mwi-radar-launcher {\r\n    position: fixed; bottom: 16px; right: 16px; z-index: 99998; display: none;\r\n    width: 44px; height: 44px; align-items: center; justify-content: center;\r\n    font-size: 20px; cursor: pointer; color: var(--r-accent);\r\n    background: var(--r-panel); border: 1px solid var(--r-border);\r\n    border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,.5);\r\n}\r\n#mwi-radar-launcher:hover { border-color: var(--r-accent); background: var(--r-panel-2); }\r\n";

    function loadUI() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
    }
    function saveUI(patch) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...loadUI(), ...patch })); } catch (e) { }
    }
    function setStatus(text, kind) {
        const el = document.getElementById('mwi-status');
        if (!el) return;
        el.textContent = text;
        el.className = kind || '';
    }
    function setMode(mode) {
        const modal = document.getElementById('mwi-tracker-modal');
        if (!modal) return;
        modal.dataset.mode = mode;
        saveUI({ mode });
        if (currentProfile) renderProfileView(); // la répartition en colonnes dépend de la largeur
        const maxBtn = document.getElementById('mwi-btn-max');
        const minBtn = document.getElementById('mwi-btn-min');
        if (maxBtn) { maxBtn.textContent = mode === 'max' ? '❐' : '□'; maxBtn.title = mode === 'max' ? 'Restaurer' : 'Agrandir'; }
        if (minBtn) { minBtn.textContent = mode === 'min' ? '▢' : '–'; minBtn.title = mode === 'min' ? 'Développer' : 'Réduire'; }
    }
    function setVisible(visible) {
        const modal = document.getElementById('mwi-tracker-modal');
        const launcher = document.getElementById('mwi-radar-launcher');
        if (modal) modal.style.display = visible ? 'flex' : 'none';
        if (launcher) launcher.style.display = visible ? 'none' : 'flex';
        saveUI({ visible });
    }

    function enableDrag(modal, handle) {
        let startX, startY, startLeft, startTop, dragging = false;
        handle.addEventListener('mousedown', (e) => {
            if (e.target.closest('button') || modal.dataset.mode === 'max') return;
            const rect = modal.getBoundingClientRect();
            dragging = true;
            startX = e.clientX; startY = e.clientY;
            startLeft = rect.left; startTop = rect.top;
            modal.style.left = rect.left + 'px';
            modal.style.top = rect.top + 'px';
            modal.style.right = 'auto';
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            const w = modal.offsetWidth, h = modal.offsetHeight;
            const left = Math.min(Math.max(0, startLeft + e.clientX - startX), window.innerWidth - w);
            const top = Math.min(Math.max(0, startTop + e.clientY - startY), window.innerHeight - 40);
            modal.style.left = left + 'px';
            modal.style.top = top + 'px';
        });
        document.addEventListener('mouseup', () => {
            if (!dragging) return;
            dragging = false;
            saveUI({ left: modal.style.left, top: modal.style.top });
        });
    }

    // Redimensionnement en attrapant n'importe quel bord ou coin de la modale
    function enableResize(modal) {
        const EDGE = 6, MIN_W = 280, MIN_H = 220;
        let st = null;
        const edgeOf = (e) => {
            const r = modal.getBoundingClientRect();
            let d = '';
            if (e.clientY >= r.bottom - EDGE) d += 's'; else if (e.clientY <= r.top + EDGE) d += 'n';
            if (e.clientX >= r.right - EDGE) d += 'e'; else if (e.clientX <= r.left + EDGE) d += 'w';
            return d;
        };
        modal.addEventListener('mousemove', (e) => {
            if (st) return;
            const d = modal.dataset.mode === 'normal' ? edgeOf(e) : '';
            modal.style.cursor = d ? d + '-resize' : '';
        });
        modal.addEventListener('mouseleave', () => { if (!st) modal.style.cursor = ''; });
        modal.addEventListener('mousedown', (e) => {
            if (modal.dataset.mode !== 'normal') return;
            const d = edgeOf(e);
            if (!d) return;
            const r = modal.getBoundingClientRect();
            st = { d, x: e.clientX, y: e.clientY, r };
            modal.style.left = r.left + 'px'; modal.style.top = r.top + 'px'; modal.style.right = 'auto';
            e.preventDefault();
            e.stopPropagation(); // pas de déplacement en même temps
        }, true);
        document.addEventListener('mousemove', (e) => {
            if (!st) return;
            const { d, x, y, r } = st;
            let w = r.width, h = r.height;
            if (d.includes('e')) w = r.width + e.clientX - x;
            if (d.includes('w')) w = r.width - (e.clientX - x);
            if (d.includes('s')) h = r.height + e.clientY - y;
            if (d.includes('n')) h = r.height - (e.clientY - y);
            w = Math.min(Math.max(MIN_W, w), window.innerWidth);
            h = Math.min(Math.max(MIN_H, h), window.innerHeight);
            modal.style.width = w + 'px';
            modal.style.height = h + 'px';
            if (d.includes('w')) modal.style.left = (r.right - w) + 'px';
            if (d.includes('n')) modal.style.top = (r.bottom - h) + 'px';
            modal.dataset.sized = '1';
        });
        document.addEventListener('mouseup', () => {
            if (!st) return;
            st = null;
            modal.style.cursor = '';
            saveUI({ left: modal.style.left, top: modal.style.top, width: modal.style.width, height: modal.style.height });
            if (currentProfile) renderProfileView();
        });
    }

    function createTrackerModal() {
        document.getElementById('mwi-tracker-modal')?.remove();
        document.getElementById('mwi-radar-launcher')?.remove();
        document.getElementById('mwi-radar-style')?.remove();

        const style = document.createElement('style');
        style.id = 'mwi-radar-style';
        style.textContent = CSS;
        document.head.appendChild(style);

        const modal = document.createElement('div');
        modal.id = 'mwi-tracker-modal';
        modal.dataset.mode = 'normal';
        modal.innerHTML = `
            <div class="mwi-r-head" id="mwi-r-head">
                <img class="mwi-r-logo" src="${FABIO_ICON}" alt=""><span class="mwi-r-title">Fabio RH</span>
                <span class="mwi-r-badge" id="mwi-badge" title="Joueurs sans guilde">0</span>
                <div class="mwi-r-ctrl">
                    <button class="mwi-r-icon" id="mwi-btn-min" title="Réduire">–</button>
                    <button class="mwi-r-icon" id="mwi-btn-max" title="Agrandir">□</button>
                    <button class="mwi-r-icon close" id="mwi-btn-close" title="Fermer">✕</button>
                </div>
            </div>
            <div class="mwi-r-body">
                <div class="mwi-r-toolbar">
                    <select class="mwi-r-select" id="mwi-filter" title="Filtrer la liste">
                        <option value="free">Sans guilde</option>
                        <option value="guild">En guilde</option>
                        <option value="fail">Échecs</option>
                        <option value="pending">En attente</option>
                        <option value="all">Tous</option>
                    </select>
                    <select class="mwi-r-select" id="mwi-mode-filter" title="Mode de jeu">
                        <option value="all">Tous modes</option>
                        <option value="standard">Standard</option>
                        <option value="ironcow">🐄 Ironcow (IC)</option>
                    </select>
                    <div class="mwi-r-sizes" id="mwi-size" title="Taille des cases">
                        <button class="mwi-r-icon" data-size="large" title="Grandes cases : toutes les infos"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1" y="1" width="14" height="6" rx="1"/><rect x="1" y="9" width="14" height="6" rx="1"/></svg></button>
                        <button class="mwi-r-icon" data-size="medium" title="Cases moyennes"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1" y="1" width="14" height="4" rx="1"/><rect x="1" y="6" width="14" height="4" rx="1"/><rect x="1" y="11" width="14" height="4" rx="1"/></svg></button>
                        <button class="mwi-r-icon" data-size="small" title="Petites cases : profil au survol"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1" y="1" width="14" height="2" rx="1"/><rect x="1" y="4" width="14" height="2" rx="1"/><rect x="1" y="7" width="14" height="2" rx="1"/><rect x="1" y="10" width="14" height="2" rx="1"/><rect x="1" y="13" width="14" height="2" rx="1"/></svg></button>
                    </div>
                    <button class="mwi-r-btn" id="mwi-btn-guilds" title="Comparer notre guilde aux autres (classements de guildes ouverts dans le jeu)">Guildes</button>
                    <button class="mwi-r-btn" id="mwi-btn-copy" title="Copier les pseudos affichés">Copier</button>
                    <button class="mwi-r-btn" id="mwi-btn-clear" title="Vider la liste">Vider</button>
                </div>
                <div class="mwi-r-chans-head">
                    <span>Canaux à scanner</span>
                    <button class="mwi-r-icon" id="mwi-btn-chans" title="Rafraîchir la liste des canaux">↻</button>
                </div>
                <div class="mwi-r-chans" id="mwi-channels"></div>
                <div class="mwi-r-lb" id="mwi-lb"></div>
                <ul class="mwi-r-list" id="mwi-tracker-list"></ul>
                <div class="mwi-r-pview" id="mwi-profile-view"></div>
                <div class="mwi-r-gview" id="mwi-guild-view"></div>
                <div class="mwi-r-progress" id="mwi-progress"><div id="mwi-progress-bar"></div></div>
                <div class="mwi-r-actions">
                    <button class="mwi-r-btn" id="mwi-btn-scan" title="Scanne les canaux de chat cochés">1. Scanner</button>
                    <button class="mwi-r-btn primary" id="mwi-btn-process">2. Vérifier Profils</button>
                </div>
                <div class="mwi-r-foot">
                    <span id="mwi-status">En attente d'action...</span>
                    <span id="mwi-counts"></span>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const launcher = document.createElement('button');
        launcher.id = 'mwi-radar-launcher';
        launcher.title = 'Ouvrir Fabio RH';
        launcher.innerHTML = `<img class="mwi-r-logo" src="${FABIO_ICON}" alt="Fabio RH">`;
        document.body.appendChild(launcher);

        const saved = loadUI();
        if (saved.left && saved.top) {
            modal.style.left = saved.left; modal.style.top = saved.top; modal.style.right = 'auto';
        }
        if (saved.width && saved.height) {
            modal.style.width = saved.width; modal.style.height = saved.height;
            modal.dataset.sized = '1';
        }
        modal.dataset.view = 'list';
        setMode(saved.mode === 'max' || saved.mode === 'min' ? saved.mode : 'normal');
        setVisible(saved.visible !== false);

        document.getElementById('mwi-btn-scan').addEventListener('click', window.mwiScanChat);
        document.getElementById('mwi-btn-process').addEventListener('click', processUnverifiedProfiles);
        document.getElementById('mwi-btn-close').addEventListener('click', () => setVisible(false));
        launcher.addEventListener('click', () => setVisible(true));
        // Bouton Profile : ouvre le profil dans le jeu ; clic sur la case : ouvre la fiche dans la modale
        document.getElementById('mwi-tracker-list').addEventListener('click', e => {
            const btn = e.target.closest('.mwi-r-profile');
            if (btn) { openGameProfile(btn.dataset.player); return; }
            const card = e.target.closest('.mwi-r-card[data-player]');
            if (card) openProfileView(card.dataset.player);
        });
        document.getElementById('mwi-profile-view').addEventListener('click', e => {
            const t = e.target.closest('[data-action]');
            if (!t) return;
            if (t.dataset.action === 'back') closeProfileView();
            else if (t.dataset.action === 'game') openGameProfile(t.dataset.player);
            else if (t.dataset.action === 'section') { currentSection = +t.dataset.index; renderProfileView(); }
        });
        document.getElementById('mwi-btn-guilds').addEventListener('click', () => {
            currentProfile = null;
            modal.dataset.view = 'guilds';
            renderGuildView();
        });
        document.getElementById('mwi-guild-view').addEventListener('click', e => {
            const t = e.target.closest('[data-action]');
            if (!t) return;
            if (t.dataset.action === 'back') { modal.dataset.view = 'list'; updateModalUI(); }
            else if (t.dataset.action === 'gsort') { guildSort = t.dataset.cat; renderGuildView(); }
        });
        document.getElementById('mwi-btn-max').addEventListener('click', () => { setMode(modal.dataset.mode === 'max' ? 'normal' : 'max'); });
        document.getElementById('mwi-btn-min').addEventListener('click', () => { setMode(modal.dataset.mode === 'min' ? 'normal' : 'min'); });
        document.getElementById('mwi-r-head').addEventListener('dblclick', (e) => {
            if (e.target.closest('button')) return;
            setMode(modal.dataset.mode === 'max' ? 'normal' : 'max');
        });
        document.getElementById('mwi-filter').addEventListener('change', (e) => {
            currentFilter = e.target.value;
            updateModalUI();
        });
        const modeSelect = document.getElementById('mwi-mode-filter');
        currentMode = ['standard', 'ironcow'].includes(saved.modeFilter) ? saved.modeFilter : 'all';
        modeSelect.value = currentMode;
        renderLeaderboard();
        modeSelect.addEventListener('change', (e) => {
            currentMode = e.target.value;
            saveUI({ modeFilter: currentMode });
            updateModalUI();
            renderLeaderboard();
        });
        const sizeBtns = document.querySelectorAll('#mwi-size button');
        const setSize = (size) => {
            modal.dataset.size = size;
            sizeBtns.forEach(b => b.classList.toggle('active', b.dataset.size === size));
        };
        setSize(['large', 'small'].includes(saved.cardSize) ? saved.cardSize : 'medium');
        sizeBtns.forEach(b => b.addEventListener('click', () => {
            setSize(b.dataset.size);
            saveUI({ cardSize: b.dataset.size });
        }));
        document.getElementById('mwi-btn-chans').addEventListener('click', renderChannels);
        launcher.addEventListener('click', renderChannels);
        renderChannels();
        setTimeout(renderChannels, 5000); // le chat du jeu se charge après le script
        document.getElementById('mwi-btn-copy').addEventListener('click', copyVisibleNames);
        document.getElementById('mwi-btn-clear').addEventListener('click', () => {
            if (isProcessing || isScanning) return;
            recrues.clear();
            setStatus('Liste vidée.', '');
            updateModalUI();
        });

        enableDrag(modal, document.getElementById('mwi-r-head'));
        enableResize(modal);
        updateModalUI();
    }

    let currentProfile = null;
    let currentSection = 0;

    function openGameProfile(username) {
        if (!window.mwiSendProfileCommand(username)) setStatus('Champ de chat introuvable.', 'err');
    }
    function openProfileView(username) {
        currentProfile = username;
        currentSection = 0;
        document.getElementById('mwi-tracker-modal').dataset.view = 'profile';
        renderProfileView();
    }
    function closeProfileView() {
        currentProfile = null;
        document.getElementById('mwi-tracker-modal').dataset.view = 'list';
        updateModalUI();
    }

    // Texte brut d'un onglet : regroupe chaque libellé avec la valeur qui le suit
    const isValue = (l) => /^[\d\s.,  /()%+-]+$|^\d|^(?:\d+y\s*)?\d+d$|^Floor/i.test(l);
    const isLabel = (l) => /(?:Level|Points|Floor|Age|Achievements)$/i.test(l);
    const cleanLine = (l) => String(l).replace(/[\u200b-\u200f\u2060\ufeff]/g, '').trim();
    // Lignes "libellé ........ valeur" comme dans le jeu (avec une jauge pour les "x / y"),
    // précédées des textes isolés sous forme d'étiquettes (soloLabel : ce qu'ils représentent)
    // groupRe : chaque ligne qui correspond ouvre un groupe, les suivantes en sont le détail (sanctuaires)
    function linesToHtml(lignes, soloLabel, groupRe) {
        const rows = [], solos = [];
        lignes = lignes.map(cleanLine).filter(Boolean);
        for (let i = 0; groupRe && i < lignes.length; i++) {
            const l = lignes[i], last = rows[rows.length - 1];
            if (groupRe.test(l)) rows.push([l, '']);
            else if (last) last[1] += (last[1] ? ' · ' : '') + l;
            else solos.push(l);
        }
        for (let i = 0; !groupRe && i < lignes.length; i++) {
            const l = lignes[i], next = lignes[i + 1];
            if (/\bof$/i.test(l) && next) { rows.push([l, next]); i++; }  // "Officer of" + guilde
            else if (!isValue(l) && next !== undefined && (isValue(next) || isLabel(l))) { rows.push([l, next]); i++; }
            else if (/^\(?\d+\s*\/\s*\d+\)?$/.test(l)) rows.push(['Achievements', l]); // libellé homonyme d'un onglet, retiré à la lecture
            else solos.push(l);
        }
        return (solos.length ? `<div class="mwi-r-solos">${soloLabel ? `<span class="mwi-r-solo-label">${esc(soloLabel)}</span>` : ''}${
            solos.map(s => `<span class="mwi-r-solo">${esc(s)}</span>`).join('')}</div>` : '') + rowsToHtml(rows);
    }

    // Lignes [libellé, valeur] ; une valeur "x / y" reçoit une jauge
    function rowsToHtml(rows) {
        if (!rows.length) return '';
        return `<dl class="mwi-r-rows">${rows.map(([k, v]) => {
            const m = String(v).match(/^\(?(\d+)\s*\/\s*(\d+)\)?$/);
            if (!m) return `<div class="mwi-r-row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`;
            const pct = +m[2] ? Math.min(100, Math.round(m[1] / m[2] * 100)) : 0;
            return `<div class="mwi-r-row${pct === 100 ? ' done' : ''}"><dt>${esc(k)}</dt><dd>${m[1]} / ${m[2]}</dd>
                <div class="mwi-r-bar"><div style="width: ${pct}%"></div></div></div>`;
        }).join('')}</dl>`;
    }

    // Section lue à l'écran (cases et lignes de texte d'un onglet du profil)
    function domSectionHtml(s) {
        // Achievements et sanctuaires : pas d'icônes, seulement les noms et leur valeur
        const shrine = /shrine/i.test(s.titre);
        const tuiles = shrine || /achievement|succ[èe]s/i.test(s.titre) ? [] : (s.tuiles || []);
        // Dans l'équipement, un texte isolé est le nom d'un emplacement vide
        const soloLabel = tuiles.length && /equip/i.test(s.titre) ? 'Vide :' : '';
        return tuiles.length || s.lignes.length
            ? (s.lignes.length ? linesToHtml(s.lignes, soloLabel, shrine ? /^shrine/i : null) : '') + tilesToHtml(tuiles, /skill/i.test(s.titre))
            : '<p class="mwi-r-pempty">Rien dans cet onglet.</p>';
    }

    // --- Sections construites à partir des données brutes du profil ---
    const hridName = (h) => String(h || '').split('/').pop();
    const pretty = (h) => hridName(h).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const nb = (n) => isFinite(n) && n !== '' && n !== null ? Number(n).toLocaleString('fr-FR') : String(n);

    // Adresse d'une planche d'icônes du jeu (items, skills, abilities), retrouvée dans la page ou les fichiers chargés
    const sprites = {}, spritesMiss = {};
    function spriteUrl(kind) {
        if (sprites[kind]) return sprites[kind];
        if (Date.now() - (spritesMiss[kind] || 0) < 3000) return '';
        const re = new RegExp(`[^"'\\s#]*/${kind}_sprite\\.[^"'\\s#]*\\.svg`);
        const hrefs = Array.from(document.querySelectorAll('use'), u => u.getAttribute('href') || u.getAttribute('xlink:href') || '')
            .concat(performance.getEntriesByType('resource').map(e => e.name));
        const hit = hrefs.map(h => (h.match(re) || [])[0]).find(Boolean);
        if (!hit) spritesMiss[kind] = Date.now();
        return hit ? (sprites[kind] = hit) : '';
    }
    // Sans planche trouvée, la case affiche le nom à la place de l'icône
    const spriteIcon = (kind, hrid) => {
        const url = spriteUrl(kind);
        return url ? `<svg><use href="${esc(url)}#${esc(hridName(hrid))}"></use></svg>` : '';
    };

    const SKILLS = ['milking', 'foraging', 'woodcutting', 'cheesesmithing', 'crafting', 'tailoring', 'cooking', 'brewing', 'alchemy',
        'enhancing', 'stamina', 'intelligence', 'attack', 'defense', 'melee', 'ranged', 'magic'];
    const ROOMS = ['dairy_barn', 'garden', 'log_shed', 'forge', 'workshop', 'sewing_parlor', 'kitchen', 'brewery', 'laboratory',
        'observatory', 'dining_room', 'library', 'dojo', 'armory', 'gym', 'archery_range', 'mystical_study'];
    // Emplacement d'équipement -> [colonne, ligne], comme dans le jeu
    const SLOTS = {
        back: [0, 0], head: [1, 0], trinket: [2, 0], neck: [4, 0],
        main_hand: [0, 1], body: [1, 1], off_hand: [2, 1], earrings: [4, 1],
        hands: [0, 2], legs: [1, 2], pouch: [2, 2], ring: [4, 2],
        feet: [1, 3], charm: [4, 3],
        milking_tool: [0, 4], foraging_tool: [1, 4], woodcutting_tool: [2, 4], cheesesmithing_tool: [3, 4], crafting_tool: [4, 4],
        tailoring_tool: [0, 5], cooking_tool: [1, 5], brewing_tool: [2, 5], alchemy_tool: [3, 5], enhancing_tool: [4, 5]
    };
    const TRIGGER_FR = {
        self: 'Soi', targeted_enemy: 'Cible', all_enemies: 'Ennemis', all_allies: 'Alliés',
        current_hp: 'PV', current_mp: 'PM', missing_hp: 'PV manquants', missing_mp: 'PM manquants',
        number_of_active_units: 'nombre en vie',
        greater_than_equal: '≥', less_than_equal: '≤', is_active: 'actif', is_inactive: 'inactif'
    };
    const trig = (h) => TRIGGER_FR[hridName(h)] || pretty(h);
    // "Soi : PV manquants ≥ 150", plusieurs conditions reliées par "et"
    const triggersText = (list) => (list || []).map(t => {
        const cmp = hridName(t.comparatorHrid);
        return `${trig(t.dependencyHrid)} : ${trig(t.conditionHrid)} ${trig(t.comparatorHrid)}${/^is_/.test(cmp) ? '' : ' ' + nb(t.value)}`;
    }).join(' et ');

    function sectionsFromData(b, p, dom) {
        const c = b.sharableCharacter || {};
        const levels = new Map((b.characterSkills || []).map(s => [hridName(s.skillHrid), s.level]));
        const done = (b.characterAchievements || []).filter(a => a.isCompleted).length;
        const sub = (t) => `<h4 class="mwi-r-sub">${esc(t)}</h4>`;
        const sections = [];

        const etat = [c.actionType && pretty(c.actionType), c.hideOnlineStatus ? '' : (c.isOnline ? 'En ligne' : 'Hors ligne')].filter(Boolean).join(' · ');
        const overview = [];
        if (b.guildName) overview.push([`${pretty(b.guildRole)} of`, b.guildName]);
        if (etat) overview.push(['Activité', etat]);
        overview.push(['Total Level', nb(levels.has('total_level') ? levels.get('total_level') : p.stats.total)],
            ['Combat Level', nb(Math.floor(b.combatLevel))],
            ['Achievements réalisés', nb(done)],
            ['Task Points', nb(b.totalTaskPoints)],
            ['Labyrinth Points', nb(b.labyrinthPoints)]);
        if (b.labyrinthHighestFloor) overview.push(['Highest Floor', `Floor ${b.labyrinthHighestFloor} (${b.labyrinthHighestFloorRooms} Rooms)`]);
        overview.push(['Collection Points', nb(b.collectionPoints)], ['Bestiary Points', nb(b.bestiaryPoints)], ['Age', p.stats.age]);
        sections.push({ titre: 'Overview', html: rowsToHtml(overview) });

        sections.push({ titre: 'Skills', html: tilesToHtml(SKILLS.filter(k => levels.has(k)).map(k => ({
            icone: spriteIcon('skills', k), nom: pretty(k), textes: [{ t: `Lv.${levels.get(k)}`, coin: 'tl' }]
        })), true) });

        if (b.hideWearableItems) {
            sections.push({ titre: 'Equipment', html: '<p class="mwi-r-pempty">Équipement masqué par le joueur.</p>' });
        } else {
            const worn = {};
            Object.values(b.wearableItemMap || {}).forEach(it => {
                const loc = hridName(it.itemLocationHrid);
                worn[loc === 'two_hand' ? 'main_hand' : loc] = it;
            });
            let extra = 0;
            const tuiles = Object.keys(SLOTS).concat(Object.keys(worn).filter(k => !SLOTS[k])).map(loc => {
                const it = worn[loc], [col, row] = SLOTS[loc] || [extra++, 6];
                return it ? {
                    icone: spriteIcon('items', it.itemHrid), nom: pretty(it.itemHrid), col, row,
                    textes: it.enhancementLevel ? [{ t: `+${it.enhancementLevel}`, coin: 'tl' }] : []
                } : { icone: '', nom: pretty(loc), vide: true, col, row, textes: [] };
            });
            sections.push({ titre: 'Equipment', html: tilesToHtml(tuiles) });
        }

        // Build de combat en cours : capacités, consommables et leurs conditions de déclenchement
        const abilities = [...(b.equippedAbilities || [])].sort((x, y) => x.slotNumber - y.slotNumber);
        const consos = b.combatConsumables || [];
        if (abilities.length || consos.length) {
            const triggers = abilities.map(a => [pretty(a.abilityHrid), triggersText((b.abilityCombatTriggersMap || {})[a.abilityHrid])])
                .concat(consos.map(i => [pretty(i.itemHrid), triggersText((b.consumableCombatTriggersMap || {})[i.itemHrid])]))
                .filter(r => r[1]);
            sections.push({ titre: 'Combat', html:
                (abilities.length ? sub('Capacités') + tilesToHtml(abilities.map(a => ({
                    icone: spriteIcon('abilities', a.abilityHrid), nom: pretty(a.abilityHrid), textes: [{ t: `Lv.${a.level}`, coin: 'tl' }]
                })), true) : '')
                + (consos.length ? sub('Consommables') + tilesToHtml(consos.map(i => ({
                    icone: spriteIcon('items', i.itemHrid), nom: pretty(i.itemHrid), textes: []
                })), true) : '')
                + (triggers.length ? sub('Déclencheurs') + rowsToHtml(triggers) : '') });
        }

        const rooms = Object.values(b.characterHouseRoomMap || {}).filter(r => r.level > 0)
            .sort((x, y) => ROOMS.indexOf(hridName(x.houseRoomHrid)) - ROOMS.indexOf(hridName(y.houseRoomHrid)));
        sections.push({ titre: 'House', html: rowsToHtml([['Pièces construites', `${rooms.length} / ${ROOMS.length}`]]
            .concat(rooms.map(r => [pretty(r.houseRoomHrid), `Niv. ${r.level}`]))) });

        const shrines = Object.entries(b.guildBuffLevelMap || {}).filter(([, lvl]) => lvl > 0).sort();
        if (shrines.length) sections.push({ titre: 'Shrines', html: rowsToHtml(shrines.map(([h, lvl]) => {
            const [nom, type] = hridName(h).split(/_(?=[^_]+$)/);
            return [`Shrine of ${pretty(nom)} · ${pretty(type)}`, `Niv. ${lvl}`];
        })) });

        // Le détail par groupe n'est pas dans les données : il vient de l'onglet Achievements lu à l'écran
        const ach = dom.find(s => /achievement/i.test(s.titre));
        sections.push({ titre: 'Achievements', html: ach && ach.lignes.length ? domSectionHtml(ach) : rowsToHtml([['Réalisés', nb(done)]]) });
        return sections;
    }

    function renderProfileView() {
        const view = document.getElementById('mwi-profile-view');
        const p = currentProfile && recrues.get(currentProfile);
        if (!view || !p) return;
        const cat = playerCategory(p);
        const statut = { free: 'Sans guilde', guild: 'En guilde', fail: 'Profil illisible', pending: 'En attente' }[cat];
        const nameStyle = p.color ? `color: ${p.color};` : '';
        const brut = profilsBruts.get(p.nom);

        const resume = `<dl class="mwi-r-pgrid">
                <dt>Statut</dt><dd class="mwi-r-pstat ${cat}">${statut}</dd>
                <dt>Mode</dt><dd>${p.ironcow ? '🐄 Ironcow' : 'Standard'}</dd>
                ${cat === 'guild' ? `<dt>Guilde</dt><dd>${esc(p.guilde)}</dd><dt>Rang</dt><dd>${esc(p.rang)}</dd>` : ''}
                ${p.profil || brut ? '' : `<dt>🛡️ Total</dt><dd>${esc(p.stats.total)}</dd>
                <dt>⚔️ Combat</dt><dd>${esc(p.stats.combat)}</dd>
                <dt>⏳ Age</dt><dd>${esc(p.stats.age)}</dd>`}
            </dl>${guildCompareHtml((brut && brut.guildName) || (cat === 'guild' ? p.guilde : ''))}`;
        const dom = (p.profil && p.profil.sections) || [];
        const sections = [{ titre: 'Résumé', html: resume }].concat(
            brut ? sectionsFromData(brut, p, dom) : dom.map(s => ({ titre: s.titre, html: domSectionHtml(s) })));
        if (currentSection >= sections.length) currentSection = 0;
        const hint = p.profil || brut ? '' : `<p class="mwi-r-pempty">${p.verifie
            ? 'Détails non récupérés pour ce joueur : relance la vérification.'
            : 'Profil pas encore vérifié : clique sur « 2. Vérifier Profils » pour récupérer toutes les infos.'}</p>`;

        // Toutes les sections sont dans la page : le CSS n'affiche que l'onglet actif en petite fenêtre,
        // et les répertorie toutes côte à côte (sans onglets) quand la modale est large
        const keys = sections.map((s, i) => i === 0 ? 'resume' : /skill/i.test(s.titre) ? 'skills'
            : /overview/i.test(s.titre) ? 'overview' : /equip/i.test(s.titre) ? 'equipment' : 'autre');
        const scroll = view.querySelector('.mwi-r-pbody')?.scrollTop || 0;
        view.innerHTML = `
            <div class="mwi-r-phead">
                <button class="mwi-r-btn" data-action="back" title="Retour à la liste">← Retour</button>
                <span class="mwi-r-pname" style="${nameStyle}">${esc(p.nom)}${p.ironcow ? ' <span class="mwi-r-iron">🐄</span>' : ''}</span>
                <button class="mwi-r-profile" data-action="game" data-player="${esc(p.nom)}" title="Ouvrir le profil dans le jeu">Profile</button>
            </div>
            <div class="mwi-r-ptabs">${sections.map((s, i) =>
                `<button class="mwi-r-ptab${i === currentSection ? ' active' : ''}" data-action="section" data-index="${i}">${esc(s.titre)}</button>`).join('')}
            </div>
            <div class="mwi-r-pbody"><div class="mwi-r-psecs">${sections.map((s, i) =>
                `<section class="mwi-r-psec${i === currentSection ? ' active' : ''}" data-key="${keys[i]}">
                    <h3 class="mwi-r-psec-title">${esc(s.titre)}</h3>
                    ${s.html}${i === 0 ? hint : ''}
                </section>`).join('')}
            </div></div>`;

        // Très grande modale : trois colonnes. Skills à gauche, Résumé puis Overview au milieu, Equipment à droite,
        // et chaque autre section sous la colonne la moins haute (les colonnes sont sans effet en petite fenêtre)
        const psecs = view.querySelector('.mwi-r-psecs');
        const secs = Array.from(psecs.children);
        const cols = [0, 1, 2].map(() => {
            const c = document.createElement('div');
            c.className = 'mwi-r-pcol';
            return psecs.appendChild(c);
        });
        const place = { skills: 0, resume: 1, overview: 1, equipment: 2 };
        secs.filter(s => s.dataset.key in place).forEach(s => cols[place[s.dataset.key]].appendChild(s));
        secs.filter(s => !(s.dataset.key in place)).forEach((s, n) => {
            const h = cols.map(c => c.offsetHeight);
            const col = h.some(Boolean) ? cols[h.indexOf(Math.min(...h))] : cols[1 + n % 2];
            col.appendChild(s);
        });
        view.querySelector('.mwi-r-pbody').scrollTop = scroll;
    }

    // flow : cases à la suite dans l'ordre du jeu, sans reprendre sa grille (autant par ligne que la largeur le permet)
    // --- Comparaison des guildes ---
    let guildSort = null; // classement utilisé pour trier le tableau
    function renderGuildView() {
        const view = document.getElementById('mwi-guild-view');
        if (!view) return;
        const head = `<div class="mwi-r-phead">
                <button class="mwi-r-btn" data-action="back" title="Retour à la liste">← Retour</button>
                <span class="mwi-r-pname">Guildes <span class="mwi-r-gcount">${guildes.size} lues</span></span>
            </div>`;
        const cats = [];
        guildes.forEach(g => Object.keys(g.stats).forEach(c => { if (!cats.includes(c)) cats.push(c); }));
        if (!cats.length) {
            view.innerHTML = head + '<p class="mwi-r-pempty">Aucune guilde lue pour le moment : ouvre les classements de l\'onglet Guilds du leaderboard du jeu, ils sont lus au passage.</p>';
            return;
        }
        if (!cats.includes(guildSort)) guildSort = cats[0];
        // Valeur principale d'un classement : la première colonne après le nom (Level, Points...)
        const colOf = (c) => { const g = Array.from(guildes.values()).find(x => x.stats[c]); return Object.keys(g.stats[c].valeurs)[0] || ''; };
        const val = (g, c) => g && g.stats[c] ? (g.stats[c].valeurs[colOf(c)] || '') : '';
        const rang = (g, c) => g && g.stats[c] && isFinite(g.stats[c].rang) ? g.stats[c].rang : null;
        const moi = guildes.get(MA_GUILDE);

        // Une carte par classement : notre rang, notre valeur, et l'écart avec le premier et la guilde juste devant
        const cartes = cats.map(c => {
            const tous = Array.from(guildes.values()).filter(g => rang(g, c) !== null).sort((x, y) => rang(x, c) - rang(y, c));
            const premier = tous[0];
            if (!moi || rang(moi, c) === null) {
                return `<div class="mwi-r-gcard"><h4>${esc(c)}</h4><p class="mwi-r-pempty">${esc(MA_GUILDE)} absente de ce classement.</p></div>`;
            }
            const devant = tous.filter(g => rang(g, c) < rang(moi, c)).pop();
            const ecart = (g) => { const d = num(val(g, c)) - num(val(moi, c)); return isFinite(d) ? ` (${d >= 0 ? '+' : ''}${nb(d)})` : ''; };
            return `<div class="mwi-r-gcard${c === guildSort ? ' active' : ''}" data-action="gsort" data-cat="${esc(c)}" title="Trier le tableau sur ce classement">
                <h4>${esc(c)}</h4>
                <div class="mwi-r-grank">#${nb(rang(moi, c))}</div>
                <dl class="mwi-r-rows">
                    <div class="mwi-r-row"><dt>${esc(colOf(c) || 'Valeur')}</dt><dd>${esc(val(moi, c))}</dd></div>
                    ${premier && premier !== moi ? `<div class="mwi-r-row"><dt>N°1 · ${esc(premier.nom)}</dt><dd>${esc(val(premier, c))}${ecart(premier)}</dd></div>` : ''}
                    ${devant && devant !== premier ? `<div class="mwi-r-row"><dt>Devant nous · #${nb(rang(devant, c))} ${esc(devant.nom)}</dt><dd>${esc(val(devant, c))}${ecart(devant)}</dd></div>` : ''}
                </dl>
            </div>`;
        }).join('');

        const liste = Array.from(guildes.values()).filter(g => rang(g, guildSort) !== null && g !== moi)
            .sort((x, y) => rang(x, guildSort) - rang(y, guildSort));
        const ligne = (g) => `<tr class="${g === moi ? 'moi' : ''}">
                <td class="n">${rang(g, guildSort) !== null ? '#' + nb(rang(g, guildSort)) : ''}</td><td>${esc(g.nom)}</td>
                ${cats.map(c => `<td class="n">${esc(val(g, c))}${rang(g, c) !== null ? ` <small>#${nb(rang(g, c))}</small>` : ''}</td>`).join('')}
            </tr>`;
        const scroll = view.querySelector('.mwi-r-gbody')?.scrollTop || 0;
        view.innerHTML = head + `<div class="mwi-r-gbody">
                <div class="mwi-r-gcards">${cartes}</div>
                <table class="mwi-r-gtable">
                    <thead><tr><th>Rang</th><th>Guilde</th>${cats.map(c =>
                        `<th class="n${c === guildSort ? ' active' : ''}" data-action="gsort" data-cat="${esc(c)}" title="Trier sur ce classement">${esc(c)}</th>`).join('')}</tr></thead>
                    <tbody>${moi ? ligne(moi) : ''}${liste.map(ligne).join('')}</tbody>
                </table>
            </div>`;
        view.querySelector('.mwi-r-gbody').scrollTop = scroll;
    }

    // Fiche joueur : la guilde du joueur face à la nôtre, d'après les classements de guildes lus.
    // Les classements où nous sommes devant sont mis en avant : ce sont les arguments pour contacter le joueur.
    function guildCompareHtml(nomGuilde) {
        if (!nomGuilde || nomGuilde === MA_GUILDE) return '';
        const titre = `<h4 class="mwi-r-sub">${esc(nomGuilde)} face à ${esc(MA_GUILDE)}</h4>`;
        if (!guildes.size) return titre + '<p class="mwi-r-pempty">Classements des guildes pas encore lus : ouvre l\'onglet Guilds du leaderboard du jeu.</p>';
        const g = guildes.get(nomGuilde), moi = guildes.get(MA_GUILDE);
        if (!moi) return titre + `<p class="mwi-r-pempty">${esc(MA_GUILDE)} absente des classements lus : comparaison impossible.</p>`;
        const rang = (x, c) => x && x.stats[c] && isFinite(x.stats[c].rang) ? x.stats[c].rang : null;
        const val = (x, c) => { const v = x.stats[c].valeurs, k = Object.keys(v)[0]; return k && v[k] ? ` (${v[k]})` : ''; };
        const cats = Object.keys(moi.stats).filter(c => rang(moi, c) !== null);
        const liste = (t, cls, lignes) => lignes.length ? `<p class="mwi-r-gverdict ${cls}">${t}</p>${rowsToHtml(lignes)}` : '';

        if (!g) {
            // Guilde hors des classements lus : nous sommes devant partout où nous figurons dans le haut du classement
            const dernier = (c) => Math.max(0, ...Array.from(guildes.values()).filter(x => x !== moi && rang(x, c) !== null).map(x => rang(x, c)));
            const devant = cats.filter(c => rang(moi, c) <= dernier(c));
            return titre + '<p class="mwi-r-pempty">Guilde absente des classements lus : elle n\'est pas dans le haut du leaderboard.</p>'
                + liste(`Nous sommes devant sur ${devant.length} classement(s)`, 'moins',
                    devant.map(c => [c, `nous #${nb(rang(moi, c))}${val(moi, c)} · eux non classés`]));
        }
        const communs = cats.filter(c => rang(g, c) !== null);
        const ligne = (c) => [c, `nous #${nb(rang(moi, c))}${val(moi, c)} · eux #${nb(rang(g, c))}${val(g, c)}`];
        const devant = communs.filter(c => rang(moi, c) < rang(g, c)), derriere = communs.filter(c => rang(moi, c) > rang(g, c));
        return titre
            + (devant.length ? '' : '<p class="mwi-r-gverdict mieux">Nous ne sommes devant sur aucun classement</p>')
            + liste(`Nous sommes devant sur ${devant.length} / ${communs.length} classements`, 'moins', devant.map(ligne))
            + liste(`Ils sont devant sur ${derriere.length} / ${communs.length} classements`, 'mieux', derriere.map(ligne));
    }

    function tilesToHtml(tuiles, flow) {
        if (!tuiles.length) return '';
        const located = tuiles.every(t => t.col !== undefined);
        if (flow && located) tuiles = [...tuiles].sort((a, b) => a.row - b.row || a.col - b.col);
        const placed = located && !flow;
        const cols = placed ? Math.max(...tuiles.map(t => t.col)) + 1 : 0;
        const style = placed ? ` style="--cols: ${cols}"` : '';
        const valueClass = (t) => /^\+\d/.test(t) ? ' plus' : /^[\d\s., ]+[kKmM]?$/.test(t) ? ' num' : '';
        return `<div class="mwi-r-tiles${placed ? ' placed' : ''}"${style}>${tuiles.map(t => {
            const textes = t.textes || (t.texte ? [{ t: t.texte, coin: 'tl' }] : []);
            const pos = placed ? ` style="grid-column: ${t.col + 1}; grid-row: ${t.row + 1}"` : '';
            return `<div class="mwi-r-tile${t.vide ? ' vide' : ''}"${pos} title="${esc(t.nom || textes.map(x => x.t).join(' '))}">
                ${t.icone ? `<div class="mwi-r-tico">${t.icone}</div>` : `<span class="mwi-r-tname">${esc(t.nom || '')}</span>`}
                ${textes.map(x => `<span class="mwi-r-tt ${x.coin}${valueClass(x.t)}">${esc(x.t)}</span>`).join('')}
                ${(t.badges || []).map(bd => `<span class="mwi-r-tb ${bd.coin}">${bd.icone}</span>`).join('')}
            </div>`;
        }).join('')}</div>`;
    }

    function playerCategory(p) {
        if (!p.verifie) return 'pending';
        if (p.echec) return 'fail';
        return p.hasGuild ? 'guild' : 'free';
    }

    const matchesMode = (p) => currentMode === 'all' || (currentMode === 'ironcow') === !!p.ironcow;

    function visiblePlayers() {
        return Array.from(recrues.values()).filter(p =>
            (currentFilter === 'all' || playerCategory(p) === currentFilter) && matchesMode(p));
    }

    async function copyVisibleNames() {
        const names = visiblePlayers().map(p => p.nom).join('\n');
        if (!names) { setStatus('Rien à copier.', 'warn'); return; }
        try {
            await navigator.clipboard.writeText(names);
        } catch (e) {
            const ta = document.createElement('textarea');
            ta.value = names;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
        setStatus(`${names.split('\n').length} pseudo(s) copié(s).`, 'ok');
    }

    function updateModalUI() {
        const list = document.getElementById('mwi-tracker-list');
        if (!list) return;
        if (currentProfile) renderProfileView();

        const all = Array.from(recrues.values());
        const counts = { free: 0, guild: 0, fail: 0, pending: 0 };
        all.forEach(p => counts[playerCategory(p)]++);

        const badge = document.getElementById('mwi-badge');
        if (badge) badge.textContent = counts.free;
        const countsEl = document.getElementById('mwi-counts');
        const ironCount = all.filter(p => p.ironcow).length;
        if (countsEl) countsEl.textContent = `${all.length} scannés (🐄 ${ironCount}) · ${counts.pending} en file`;

        const players = visiblePlayers();
        if (players.length === 0) {
            const msgs = {
                free: 'Aucun joueur sans guilde pour le moment.\nClique sur Scanner puis Vérifier.',
                guild: 'Aucun joueur en guilde.',
                fail: 'Aucun échec de lecture.',
                pending: 'Aucun joueur en attente.',
                all: 'Aucun joueur scanné.'
            };
            const modeHint = currentMode === 'all' ? '' : `\n(filtre : ${currentMode === 'ironcow' ? 'Ironcow' : 'Standard'})`;
            list.innerHTML = `<li class="mwi-r-empty" style="white-space: pre-line;">${msgs[currentFilter]}${modeHint}</li>`;
            return;
        }

        list.innerHTML = players.map(p => {
            const cat = playerCategory(p);
            const tag = { free: 'Sans guilde', guild: `${esc(p.rang)} of ${esc(p.guilde)}`, fail: 'Profil illisible', pending: 'En attente' }[cat];

            const nameStyle = p.color ? `color: ${p.color}; text-shadow: 0px 1px 2px rgba(0,0,0,0.5);` : 'color: var(--r-text);';

            const stats = (cat === 'free' || cat === 'guild') ? `
                <div class="mwi-r-stats">
                    <span>🛡️ Total <b>${esc(p.stats.total)}</b></span>
                    <span>⚔️ Combat <b>${esc(p.stats.combat)}</b></span>
                    <span>⏳ Age <b>${esc(p.stats.age)}</b></span>
                </div>` : '';
            // Détails affichés seulement avec les grandes cases
            const details = `
                <dl class="mwi-r-details">
                    <dt>Statut</dt><dd>${tag}</dd>
                    <dt>Mode</dt><dd>${p.ironcow ? '🐄 Ironcow' : 'Standard'}</dd>
                    ${cat === 'guild' ? `<dt>Guilde</dt><dd>${esc(p.guilde)}</dd><dt>Rang</dt><dd>${esc(p.rang)}</dd>` : ''}
                    ${(cat === 'free' || cat === 'guild') ? `<dt>🛡️ Total</dt><dd>${esc(p.stats.total)}</dd><dt>⚔️ Combat</dt><dd>${esc(p.stats.combat)}</dd><dt>⏳ Age</dt><dd>${esc(p.stats.age)}</dd>` : ''}
                </dl>`;
            return `<li class="mwi-r-card ${cat}" data-player="${esc(p.nom)}" title="Voir la fiche du joueur">
                <div class="mwi-r-name"><span class="mwi-r-who"><span class="mwi-r-player" style="${nameStyle}">${esc(p.nom)}</span>${p.ironcow ? '<span class="mwi-r-iron" title="Ironcow">🐄</span>' : ''}</span><span class="mwi-r-right"><button class="mwi-r-profile" data-player="${esc(p.nom)}" title="Ouvrir le profil">Profile</button><span class="mwi-r-tag" title="${tag}">${tag}</span></span></div>
                ${stats}
                ${details}
            </li>`;
        }).join('');
    }

    // ---------------------------------------------------------------
    // 4. Lecture du profil
    // ---------------------------------------------------------------
    // Chemin rapide : le titre du profil est un CharacterName avec data-name = pseudo exact.
    // On ignore ceux du chat, puis on remonte jusqu'au conteneur qui porte les stats.
    function findProfileModal(username) {
        const needle = username.toLowerCase();
        const nameEls = Array.from(document.querySelectorAll('[class*="CharacterName_name"][data-name]'))
            .filter(e => (e.getAttribute('data-name') || '').toLowerCase() === needle
                && !e.closest(`[class*="${CHAT_MESSAGE_CLASS}"]`)
                && !e.closest('#mwi-tracker-modal'));

        for (const nameEl of nameEls) {
            let el = nameEl.parentElement;
            for (let i = 0; i < 12 && el && el !== document.body; i++, el = el.parentElement) {
                const t = el.textContent || '';
                if (t.length > 3000) break;
                if (t.includes('Total Level') && t.includes('Combat Level')) {
                    return { el, label: nameEl, nameEl };
                }
            }
        }
        return { el: null };
    }

    // Ancienne méthode (recherche du libellé "Total Level"), plus lente : utilisée en secours seulement
    function findProfileModalByText(username) {
        const needle = username.toLowerCase();
        const labels = Array.from(document.querySelectorAll('div, span, td, th, p, li'))
            .filter(el => !el.closest('#mwi-tracker-modal')
                && el.children.length === 0
                && el.textContent.trim() === 'Total Level');

        for (const label of labels) {
            let el = label.parentElement;
            for (let i = 0; i < 12 && el && el !== document.body; i++, el = el.parentElement) {
                const t = el.innerText || '';
                if (t.length > 3000) break;
                if (t.includes('Combat Level') && hasExactName(el, needle, label)) {
                    return { el, label, labels: labels.length };
                }
            }
        }
        return { el: null, labels: labels.length };
    }

    // Le pseudo doit être le texte exact d'un élément situé avant "Total Level" (titre du profil),
    // sinon "lab" ou "age" matcheraient "Labyrinth Points" ou "Age" d'un profil resté ouvert.
    function hasExactName(root, needle, label) {
        return Array.from(root.querySelectorAll('*')).some(e =>
            !e.closest('[role="tablist"]')
            && (e.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING)
            && e.textContent.length <= 60
            && e.textContent.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() === needle);
    }

    function parseProfile(text) {
        const guildMatch = text.match(/^\s*([A-Za-z]+) of\s+(.+)$/m);
        const hasGuild = !!guildMatch;

        const grabNumber = (label) => {
            const m = text.match(new RegExp(label + '\\s*(\\d[\\d \\u00a0\\u202f\\u2009,.]*)', 'i'));
            return m ? m[1].replace(/\D/g, '') : "?";
        };

        const ageMatch = text.match(/\bAge\s+((?:\d+y\s*)?\d+d)/i);

        // Mention "Ironcow" sur le profil, en ignorant la ligne de guilde (une guilde peut s'appeler "Ironcow...")
        const ironcow = /ironcow/i.test(guildMatch ? text.replace(guildMatch[0], '') : text);

        return {
            hasGuild,
            ironcow,
            rang: guildMatch ? guildMatch[1] : '',
            guilde: guildMatch ? guildMatch[2].trim() : '',
            stats: {
                total: grabNumber('Total Level'),
                combat: grabNumber('Combat Level'),
                age: ageMatch ? ageMatch[1].trim() : "?"
            }
        };
    }

    // Onglets du profil du jeu (MuiTabs), cherchés en remontant depuis le bloc du profil
    function findProfileTabs(profileEl) {
        let el = profileEl;
        for (let i = 0; i < 8 && el && el !== document.body; i++, el = el.parentElement) {
            if ((el.textContent || '').length > 20000) break; // on est sorti du profil
            const tl = Array.from(el.querySelectorAll('[role="tablist"]')).find(t =>
                !t.closest('#mwi-tracker-modal') && !t.closest('[class*="Chat_"]')
                && !t.querySelector('[data-mention-channel]'));
            if (tl) return { root: el, tablist: tl, tabs: Array.from(tl.querySelectorAll('[role="tab"]')) };
        }
        return null;
    }

    // Contenu de l'onglet affiché : tabpanel MUI, sinon le bloc qui suit la barre d'onglets
    function findTabPanel(root, tablist) {
        const panel = Array.from(root.querySelectorAll('[role="tabpanel"]')).find(p => !p.hidden && p.offsetParent !== null);
        if (panel) return panel;
        const bar = tablist.closest('[class*="MuiTabs-root"]') || tablist;
        return bar.nextElementSibling;
    }

    // Nom lisible tiré d'une icône du jeu : "#cheesesmithing" -> "Cheesesmithing"
    function iconName(icon) {
        const use = icon.tagName.toLowerCase() === 'svg' ? icon.querySelector('use') : null;
        const ref = use ? (use.getAttribute('href') || use.getAttribute('xlink:href') || '') : '';
        const raw = (ref.split('#')[1] || icon.getAttribute('aria-label') || icon.getAttribute('alt') || icon.getAttribute('title') || '').trim();
        return raw.replace(/[_-]+/g, ' ').replace(/\w/g, c => c.toUpperCase());
    }

    // Icône réduite à l'essentiel (le dessin), sans classes ni styles du jeu
    function iconMarkup(icon) {
        if (icon.tagName.toLowerCase() === 'img') return `<img src="${esc(icon.src)}" alt="">`;
        const use = icon.querySelector('use');
        const ref = use && (use.getAttribute('href') || use.getAttribute('xlink:href'));
        if (ref) return `<svg viewBox="${esc(icon.getAttribute('viewBox') || '0 0 100 100')}"><use href="${esc(ref)}"></use></svg>`;
        const clone = icon.cloneNode(true);
        [clone, ...clone.querySelectorAll('*')].forEach(n => ['class', 'style', 'id', 'width', 'height'].forEach(at => n.removeAttribute(at)));
        return clone.outerHTML;
    }

    // Coin d'un élément dans sa case : t/b (haut/bas) + l/c/r (gauche/centre/droite)
    function cornerOf(r, box) {
        const cx = (r.left + r.right) / 2 - box.left, cy = (r.top + r.bottom) / 2 - box.top;
        return (cy < box.height / 2 ? 't' : 'b') + (cx < box.width / 3 ? 'l' : cx > box.width * 2 / 3 ? 'r' : 'c');
    }

    // Données d'un onglet : les cases (icône principale, textes et petits badges avec leur coin,
    // position dans la grille du jeu) et les lignes de texte restantes
    function extractPanel(panel) {
        const pr = panel.getBoundingClientRect();
        const icons = Array.from(panel.querySelectorAll('svg, img'))
            .filter(i => !i.parentElement.closest('svg'))
            .map(el => ({ el, r: el.getBoundingClientRect() }))
            .filter(o => o.r.width >= 12 && o.r.width <= 90)
            .sort((x, y) => y.r.width * y.r.height - x.r.width * x.r.height);
        const pris = new Set(), dansTuiles = new Set(), tuiles = [];

        for (const o of icons) {
            if (pris.has(o.el)) continue;
            // La case est le plus grand ancêtre qui reste à peine plus grand que l'icône
            let tile = null;
            for (let el = o.el.parentElement, k = 0; k < 6 && el && el !== panel; k++, el = el.parentElement) {
                const r = el.getBoundingClientRect();
                if (r.width > o.r.width * 2.2 || r.height > o.r.height * 2.2) break;
                tile = el;
            }
            if (!tile) continue; // icône dans une ligne de texte
            const inner = icons.filter(x => tile.contains(x.el));
            if (inner.some(x => pris.has(x.el))) continue;
            inner.forEach(x => pris.add(x.el));

            const box = tile.getBoundingClientRect();
            const badges = inner.filter(x => x !== o && x.r.width < o.r.width * 0.7)
                .map(x => ({ icone: iconMarkup(x.el), coin: cornerOf(x.r, box) }));
            const textes = [];
            const walker = document.createTreeWalker(tile, NodeFilter.SHOW_TEXT);
            for (let n = walker.nextNode(); n; n = walker.nextNode()) {
                const t = n.textContent.trim();
                if (!t || n.parentElement.closest('svg')) continue;
                const range = document.createRange();
                range.selectNodeContents(n);
                textes.push({ t, coin: cornerOf(range.getBoundingClientRect(), box) });
                dansTuiles.add(t);
            }
            textLines(tile).forEach(l => dansTuiles.add(l));
            tuiles.push({
                icone: iconMarkup(o.el), nom: iconName(o.el), textes, badges,
                x: box.left - pr.left, y: box.top - pr.top, w: box.width, h: box.height
            });
        }
        placeInGrid(tuiles);
        const lignes = textLines(panel).filter(l => !dansTuiles.has(l));
        return { tuiles, lignes };
    }

    // Colonne / ligne de chaque case d'après sa position à l'écran (garde les trous, ex. l'équipement)
    function placeInGrid(tuiles) {
        if (!tuiles.length) return;
        const axis = (key, size) => {
            const vals = tuiles.map(t => t[key]).sort((a, b) => a - b);
            const med = tuiles.map(t => t[size]).sort((a, b) => a - b)[Math.floor(tuiles.length / 2)] || 1;
            const centres = [];
            for (const v of vals) if (!centres.length || v - centres[centres.length - 1] > med / 2) centres.push(v);
            const pas = centres.slice(1).reduce((m, c, i) => Math.min(m, c - centres[i]), Infinity);
            const step = isFinite(pas) ? pas : med;
            tuiles.forEach(t => { t[key === 'x' ? 'col' : 'row'] = Math.min(40, Math.round((t[key] - vals[0]) / step)); });
        };
        axis('x', 'w');
        axis('y', 'h');
    }

    const textLines = (el) => (el.innerText || '').split('\n').map(l => l.trim()).filter(Boolean);

    // Clique chaque onglet, attend que le contenu change puis garde uniquement les lignes propres à l'onglet
    // Plus petit bloc (hors barre d'onglets) contenant la première et la dernière ligne qui ont changé
    function findPanelByLines(root, tablist, changed) {
        if (!changed.length) return null;
        const first = changed[0], last = changed[changed.length - 1];
        let best = null, bestLen = Infinity;
        for (const el of root.querySelectorAll('div, section, ul, table')) {
            if (el.contains(tablist)) continue;
            const t = el.innerText || '';
            if (t.length < bestLen && t.includes(first) && t.includes(last)) { best = el; bestLen = t.length; }
        }
        return best;
    }

    async function showTab(root, tab) {
        if (tab.getAttribute('aria-selected') === 'true') return;
        const before = root.innerText;
        tab.click();
        for (let k = 0; k < 15; k++) {
            await sleep(POLL_MS);
            if (root.innerText !== before) break;
        }
        await sleep(POLL_MS); // laisse le contenu finir de s'afficher
    }

    // Parcourt chaque onglet puis revient au premier ; le contenu d'un onglet est repéré
    // grâce aux lignes qui ont changé par rapport à l'onglet affiché juste avant
    // filtre : ne lire que les onglets dont le nom correspond (le reste vient des données brutes)
    async function readProfileTabs(profileEl, filtre) {
        const found = findProfileTabs(profileEl);
        if (!found || found.tabs.length === 0) return { root: profileEl, sections: [{ titre: 'Profil', lignes: textLines(profileEl) }] };

        const { root, tablist, tabs } = found;
        const labels = tabs.map(t => (t.innerText || t.textContent || '').trim() || 'Onglet');
        const raw = new Array(tabs.length), data = new Array(tabs.length);
        const voulus = [...tabs.keys()].filter(i => i === 0 || !filtre || filtre.test(labels[i]));
        const order = tabs.length > 1 ? [...voulus, 0] : [0];
        let prevLines = null;
        for (let step = 0; step < order.length; step++) {
            const i = order[step];
            await showTab(root, tabs[i]);
            const lines = textLines(root);
            if (prevLines) {
                const prevSet = new Set(prevLines);
                const panel = findPanelByLines(root, tablist, lines.filter(l => !prevSet.has(l))) || findTabPanel(root, tablist);
                if (panel) data[i] = extractPanel(panel);
            }
            if (raw[i] === undefined) raw[i] = lines;
            prevLines = lines;
        }
        if (tabs.length === 1) {
            const panel = findTabPanel(root, tablist);
            if (panel) data[0] = extractPanel(panel);
        }

        // Les lignes présentes dans tous les onglets (en-tête, noms des onglets) ne sont pas du contenu
        const common = raw.length > 1 ? new Set(raw[0].filter(l => raw.every(r => r.includes(l)))) : new Set();
        labels.forEach(l => common.add(l));
        return { root, sections: raw.map((lignes, i) => ({
            titre: labels[i],
            tuiles: data[i] ? data[i].tuiles : [],
            lignes: (data[i] ? data[i].lignes : lignes).filter(l => !common.has(l))
        })).filter(Boolean) };
    }

    async function analyzeProfile(username) {
        const playerData = recrues.get(username);
        if (!playerData) return true;

        let found = { el: null };
        const startedAt = Date.now();
        const maxTours = Math.ceil(ATTENTE_PROFIL_MS / POLL_MS);
        for (let i = 0; i < maxTours; i++) {
            await sleep(POLL_MS);
            if (spamDetectedAt >= startedAt - 300) return false; // inutile d'attendre, le jeu a refusé

            found = findProfileModal(username);
            // Secours lent de temps en temps, si le jeu n'expose pas data-name sur le profil
            if (!found.el && i % 8 === 7) found = findProfileModalByText(username);
            if (found.el) break;
        }

        if (!found.el) {
            return false;
        }

        // Relecture courte tant que les stats ne sont pas encore affichées
        let result = parseProfile(found.el.innerText);
        for (let i = 0; i < 5 && result.stats.total === '?'; i++) {
            await sleep(POLL_MS);
            result = parseProfile(found.el.innerText);
        }

        const nameEl = found.nameEl || found.el.querySelector('[class*="CharacterName_name"][data-name]');
        const icFromDom = nameEl ? readCharacterName(nameEl).ironcow : false;

        playerData.verifie = true;
        playerData.echec = false;
        playerData.hasGuild = result.hasGuild;
        playerData.guilde = result.guilde;
        playerData.rang = result.rang;
        playerData.stats = result.stats;
        // Le badge [IC] du profil fait foi ; sinon on garde ce que le chat avait indiqué
        if (nameEl) playerData.ironcow = icFromDom;
        else if (result.ironcow) playerData.ironcow = true;

        // Lecture de chaque onglet du profil (sections affichées ensuite dans la fiche du joueur)
        try {
            // Avec les données brutes, seul l'onglet Achievements (détail par groupe) reste à lire à l'écran
            const lecture = await readProfileTabs(found.el, profilsBruts.has(username) ? /achievement/i : null);
            if (lecture.sections.length) playerData.profil = { sections: lecture.sections, lu: Date.now() };
            // Le jeu a pu redessiner le bloc en changeant d'onglet : on ferme via le conteneur des onglets
            if (!found.el.isConnected) found.el = lecture.root;
        } catch (e) {
            log('Lecture des onglets du profil impossible :', e);
        }

        const closeBtn = found.el.querySelector('button[aria-label="Close"], [class*="close" i], svg[class*="close" i]');
        if (closeBtn) {
            (closeBtn.closest('button') || closeBtn).click();
        } else {
            found.el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
        }

        // Attente courte de la fermeture ; le pseudo exact (data-name) évite de toute façon de relire ce profil
        for (let i = 0; i < 8 && found.label.isConnected; i++) await sleep(25);
        return true;
    }

    // ---------------------------------------------------------------
    // 5. Boucle de vérification
    // ---------------------------------------------------------------
    // Surveille les messages ajoutés à la page (chat, notifications) pour repérer l'avertissement anti-spam
    function startSpamWatch() {
        const obs = new MutationObserver(muts => {
            for (const m of muts) {
                for (const n of m.addedNodes) {
                    const el = n.nodeType === 1 ? n : n.parentElement;
                    if (!el || el.closest('#mwi-tracker-modal')) continue;
                    const t = n.textContent || '';
                    if (t.length < 300 && ANTISPAM_RE.test(t)) {
                        spamDetectedAt = Date.now();
                        log('Anti-spam détecté :', t.trim());
                    }
                }
            }
        });
        obs.observe(document.body, { childList: true, subtree: true, characterData: false });
        return obs;
    }

    async function waitForSlot() {
        const wait = lastCommandAt + intervalleMs - Date.now();
        if (wait > 0) await sleep(wait);
        lastCommandAt = Date.now();
    }

    async function pauseAntispam(prefix) {
        for (let left = PAUSE_ANTISPAM_MS; left > 0; left -= 1000) {
            setStatus(`${prefix} Anti-spam du jeu : pause ${Math.ceil(left / 1000)}s...`, 'warn');
            await sleep(Math.min(1000, left));
        }
    }

    async function processUnverifiedProfiles() {
        if (isProcessing || isScanning) return;

        // On ne vérifie que le mode choisi (Standard / IC) pour gagner du temps.
        // Avec le filtre "Échecs", on retente les profils en échec (ex. bloqués par l'anti-spam).
        const retryFails = currentFilter === 'fail';
        const queue = Array.from(recrues.values())
            .filter(p => matchesMode(p) && (!p.verifie || (retryFails && p.echec)));
        const toVerify = queue.length;
        if (toVerify === 0) {
            setStatus(currentMode === 'all' ? 'Aucun nouveau profil à vérifier.'
                : `Aucun profil ${currentMode === 'ironcow' ? 'IC' : 'Standard'} à vérifier.`, 'warn');
            return;
        }

        isProcessing = true;
        const btn = document.getElementById('mwi-btn-process');
        const scanBtn = document.getElementById('mwi-btn-scan');
        const progress = document.getElementById('mwi-progress');
        const bar = document.getElementById('mwi-progress-bar');

        btn.disabled = true;
        scanBtn.disabled = true;
        btn.textContent = 'En cours...';
        progress.style.display = 'block';
        bar.style.width = '0%';

        let index = 0;
        const spamWatch = startSpamWatch();
        try {
            for (const data of queue) {
                const username = data.nom;
                index++;
                const prefix = `${index}/${toVerify}`;

                let ok = false;
                for (let reprise = 0; ; reprise++) {
                    await waitForSlot();
                    setStatus(`Vérification ${prefix} : ${username}...`, '');
                    const sentAt = Date.now();
                    if (!window.mwiSendProfileCommand(username)) break;
                    ok = await analyzeProfile(username);

                    const spamHit = spamDetectedAt >= sentAt - 300;
                    if (spamHit) {
                        // Le jeu trouve qu'on va trop vite : on ralentit durablement
                        intervalleMs = Math.min(intervalleMs * 2, INTERVALLE_MAX_MS);
                        log(`Intervalle entre profils porté à ${intervalleMs} ms.`);
                    }
                    if (ok || !spamHit || reprise >= MAX_REPRISES_ANTISPAM) break;
                    await pauseAntispam(prefix);
                }

                if (!ok) {
                    data.verifie = true;
                    data.echec = true;
                }
                bar.style.width = `${Math.round((index / toVerify) * 100)}%`;
                updateModalUI();
            }
            setStatus('Vérification terminée.', 'ok');
        } catch (e) {
            log('Erreur pendant la vérification :', e);
            setStatus('Erreur pendant la vérification (voir console).', 'err');
        } finally {
            spamWatch.disconnect();
            isProcessing = false;
            btn.disabled = false;
            scanBtn.disabled = false;
            btn.textContent = '2. Vérifier Profils';
            progress.style.display = 'none';
            updateModalUI();
        }
    }

    // Attente que la page soit prête pour injecter l'interface
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createTrackerModal);
    } else {
        setTimeout(createTrackerModal, 1000);
    }

    console.log("%c[Radar] Script chargé.", "color: #e0343c; font-weight: bold; font-size: 14px;");

})();
