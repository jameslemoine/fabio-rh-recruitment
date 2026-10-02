// ==UserScript==
// @name         Fabio RH Recruit Team
// @namespace    https://raw.githack.com/jameslemoine/fabio-rh-recruitment/main/Fabio%20RH%20Recruit%20Team-1.0.js
// @version      1.21
// @description  RH Tool for guild-free player
// @author       Yloise and Claude
// @run-at       document-start
// @match        https://www.milkywayidle.com/*
// @match        https://test.milkywayidle.com/*
// @copyright    2026 Fabio Lucci - Tous droits reserves - Yloise
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      cyvtgzkepticodlcrtjb.supabase.co
// @grant        unsafeWindow
// @license      All Rights Reserved; This script is proprietary and cannot be copied, modified, or distributed without explicit permission.
// ==/UserScript==



(function() {
    'use strict';

    const CHAT_MESSAGE_CLASS = 'ChatMessage_chatMessage';
    const FABIO_ICON = 'data:image/png;base64,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';
    const ATTENTE_PROFIL_MS = 1500; // délai MAX : on passe au suivant dès que le profil est lu
    const POLL_MS = 40;

    // Respect de l'anti-spam du jeu (voir creerLimiteur) : délai minimum entre deux commandes, allongé
    // automatiquement si le jeu signale un spam, puis pause avant de retenter la même commande.
    const INTERVALLE_MIN_MS = 1500;
    const INTERVALLE_MAX_MS = 8000;
    const PAUSE_ANTISPAM_MS = 15000;
    const MAX_REPRISES_ANTISPAM = 3;
    const ANTISPAM_RE = /spam|too (?:fast|quickly|many|frequent)|slow down|rate.?limit|trop (?:vite|rapide)/i;
    let spamDetectedAt = 0;
    const STORAGE_KEY = 'mwi-radar-ui';
    const TAB_SWITCH_WAIT_MS = 200; // laisse le temps au DOM de charger l'historique du canal

    const recrues = new Map();
    const MA_GUILDE = 'Fabio Lucci';
    const guildes = new Map(); // nom -> { nom, stats: { classement: { rang, valeurs: { colonne: texte } } } }
    let isProcessing = false;
    let isScanning = false;
    let arretDemande = false; // bouton « Arrêter » pendant la vérification des profils
    let enAttente = null; // pseudo dont la commande /profile est préremplie, en attente de la touche Entrée du joueur
    let currentFilter = 'free';
    let currentMode = 'all'; // 'all' | 'standard' | 'ironcow'
    // Filtres du dernier /profile : en ligne '' (tous) | 'on' | 'off' ; activité '' (tous) | 'occupe' | 'rien'
    let filtreEnLigne = '';
    const EN_LIGNE = { '': '⚪ En ligne', on: '🟢 En ligne', off: '🔴 Hors ligne' };
    let filtreActivite = '';
    const ACTIVITES = { '': 'Activité', occupe: '⚙ Fait quelque chose', rien: '💤 Ne fait rien' };
    let currentSkill = ''; // '' (tous les joueurs) | 'combat_level' | un skill : joueurs à NIVEAU_MIN_SKILL ou plus
    const NIVEAU_MIN_SKILL = 120;
    // Un joueur vérifié il y a plus longtemps repasse « à revérifier » (dans la file de « 2. Vérifier Profils »)
    const DELAI_REVERIF_JOURS = 7;
    const joursDepuis = (t) => Math.floor((Date.now() - t) / 86400000);

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
        page.__fabioOnProfile = toPage((json) => {
            try {
                const msg = JSON.parse(json);
                const nom = msg.type === 'profile_shared' && msg.profile && msg.profile.sharableCharacter && msg.profile.sharableCharacter.name;
                if (nom) profilsBruts.set(nom, msg.profile);
            } catch (e) { }
        });
        // Un seul crochet par page, même si le script est relancé (console) : il appelle le dernier __fabioOnProfile
        if (!page.__fabioHook) {
            const desc = Object.getOwnPropertyDescriptor(page.MessageEvent.prototype, 'data');
            const get = toPage(function() {
                const d = desc.get.call(this);
                if (typeof d === 'string' && d.includes('"profile_shared"')) {
                    try { page.__fabioOnProfile(d); } catch (e) { }
                }
                return d;
            });
            Object.defineProperty(page.MessageEvent.prototype, 'data', { configurable: true, enumerable: desc.enumerable, get });
            page.__fabioHook = true;
        }
    } catch (e) {
        log('Écoute des profils impossible, lecture à l\'écran uniquement :', e);
    }

    // ---------------------------------------------------------------
    // 0b. Base Supabase : chaque scan et chaque vérification y est enregistré
    // ---------------------------------------------------------------
    // Accès réservé aux recruteurs (compte Supabase autorisé dans la table recruteurs, RLS côté base).
    // La clé publishable ne donne accès à rien sans connexion. Rien n'est envoyé au serveur du jeu.
    const DB_URL = 'https://cyvtgzkepticodlcrtjb.supabase.co';
    const DB_KEY = 'sb_publishable_iDo61JeURJa-DFmvwFQfWA_iNvrGi3M';
    const DB_SESSION = 'fabio-db-session';
    const DB_FILE = 'fabio-db-file'; // envois en attente (pas connecté, réseau coupé...)
    const DB_FILE_MAX = 300;
    let dbEnvoi = false;

    // Stockage du gestionnaire de scripts (hors de la page du jeu), localStorage dans la console
    const gmGet = (k, d) => {
        try { return typeof GM_getValue === 'function' ? GM_getValue(k, d) : (JSON.parse(localStorage.getItem(k)) ?? d); } catch (e) { return d; }
    };
    const gmSet = (k, v) => {
        try { if (typeof GM_setValue === 'function') GM_setValue(k, v); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { }
    };

    // Requête HTTP : GM_xmlhttpRequest (pas bloqué par la CSP du jeu), fetch dans la console
    function dbHttp(method, path, body, token) {
        const headers = { apikey: DB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' };
        if (token) headers.Authorization = `Bearer ${token}`;
        const data = body === undefined ? undefined : JSON.stringify(body);
        const lire = (status, text) => {
            let json = null;
            try { json = text ? JSON.parse(text) : null; } catch (e) { }
            return { ok: status >= 200 && status < 300, status, json };
        };
        if (typeof GM_xmlhttpRequest !== 'function') {
            return fetch(DB_URL + path, { method, headers, body: data })
                .then(async r => lire(r.status, await r.text()), () => ({ ok: false, status: 0, json: null }));
        }
        return new Promise(resolve => GM_xmlhttpRequest({
            method, url: DB_URL + path, headers, data,
            onload: r => resolve(lire(r.status, r.responseText)),
            onerror: () => resolve({ ok: false, status: 0, json: null }),
            ontimeout: () => resolve({ ok: false, status: 0, json: null })
        }));
    }

    const dbSession = () => gmGet(DB_SESSION, null);
    // Rôle du compte (table recruteurs) : « rh » scanne, vérifie et écrit ; « lecteur » consulte seulement
    const estRh = () => (dbSession() || {}).role === 'rh';
    function garderSession(json, role) {
        const s = { access: json.access_token, refresh: json.refresh_token, expire: json.expires_at * 1000, email: json.user && json.user.email, role };
        gmSet(DB_SESSION, s);
        return s;
    }

    async function dbConnexion(email, password) {
        const r = await dbHttp('POST', '/auth/v1/token?grant_type=password', { email, password });
        if (!r.ok) return (r.json && (r.json.msg || r.json.error_description || r.json.message)) || `erreur ${r.status}`;
        garderSession(r.json);
        dbVider();
        dbCharger();
        return '';
    }

    async function dbDeconnexion() {
        const s = dbSession();
        gmSet(DB_SESSION, null);
        if (s) await dbHttp('POST', '/auth/v1/logout', {}, s.access);
        majBase();
    }

    // Jeton valide (rafraîchi une minute avant expiration), null si pas connecté
    async function dbJeton() {
        const s = dbSession();
        if (!s) return null;
        if (Date.now() < s.expire - 60000) return s.access;
        const r = await dbHttp('POST', '/auth/v1/token?grant_type=refresh_token', { refresh_token: s.refresh });
        if (r.ok) return garderSession(r.json, s.role).access;
        if (r.status >= 400 && r.status < 500) gmSet(DB_SESSION, null); // session révoquée : reconnexion nécessaire
        return null;
    }

    // Ajoute un envoi à la file puis la vide dans l'ordre ; un échec garde le reste pour plus tard
    function dbEnvoyer(type, donnees) {
        if (!estRh()) return; // un lecteur n'écrit rien
        const file = gmGet(DB_FILE, []);
        file.push({ type, donnees });
        gmSet(DB_FILE, file.slice(-DB_FILE_MAX));
        dbVider();
    }

    async function dbVider() {
        if (dbEnvoi) return;
        dbEnvoi = true;
        try {
            for (;;) {
                const file = gmGet(DB_FILE, []);
                if (!file.length) break;
                const jeton = await dbJeton();
                if (!jeton) break;
                const { type, donnees } = file[0];
                const r = type === 'scan'
                    ? await dbHttp('POST', '/rest/v1/rpc/enregistrer_scan', { scan: donnees }, jeton)
                    : await dbHttp('POST', '/rest/v1/verifications', donnees, jeton);
                if (!r.ok) {
                    log(`Base : envoi ${type} refusé (${r.status})`, r.json);
                    // Données refusées par la base : on ne bloque pas la file. 403 (compte pas encore autorisé)
                    // ou réseau : on garde tout pour plus tard
                    if (r.status === 400 || r.status === 409 || r.status === 422) gmSet(DB_FILE, gmGet(DB_FILE, []).slice(1));
                    else break;
                    continue;
                }
                gmSet(DB_FILE, gmGet(DB_FILE, []).slice(1));
            }
        } finally {
            dbEnvoi = false;
            majBase();
        }
    }

    // Une vérification : résultat lu + profil brut du WebSocket + sections lues à l'écran
    function dbVerification(p) {
        p.perime = false;
        p.derniereVerif = Date.now();
        const entier = (v) => /^\d+$/.test(String(v)) ? +v : null;
        const brut = profilsBruts.get(p.nom) || null;
        const c = brut && brut.sharableCharacter;
        let sections = null;
        try { sections = p.profil ? JSON.parse(JSON.stringify(p.profil.sections)) : null; } catch (e) { }
        dbEnvoyer('verification', {
            joueur: p.nom,
            verifie_le: new Date().toISOString(),
            succes: !p.echec,
            a_guilde: p.echec ? null : p.hasGuild,
            guilde: p.echec ? null : p.guilde || null,
            rang: p.echec ? null : p.rang || null,
            total_level: p.echec ? null : entier(p.stats.total),
            combat_level: p.echec ? null : entier(p.stats.combat),
            age: p.echec || p.stats.age === '?' ? null : p.stats.age,
            ironcow: p.ironcow,
            en_ligne: !c || c.hideOnlineStatus ? null : !!c.isOnline,
            profil_brut: brut,
            sections
        });
    }

    // Un scan : onglets, compteurs, journal complet (y compris les lignes ignorées), joueurs vus et classements de guildes
    function dbScan({ debut, onglets, totalMessages, countNew, classements, guildesLues, scanLog }) {
        const vus = new Set(scanLog.filter(e => recrues.has(e.pseudo)).map(e => e.pseudo));
        dbEnvoyer('scan', {
            debut,
            onglets,
            sources: [...(onglets.length ? ['chat'] : []), ...classements],
            mode: currentMode,
            nb_messages: totalMessages,
            nb_nouveaux: countNew,
            nb_classements: classements.length,
            joueurs: Array.from(vus, nom => { const r = recrues.get(nom); return { nom, ironcow: !!r.ironcow, couleur: r.color || '' }; }),
            entrees: scanLog.map(e => ({ pseudo: String(e.pseudo || '-'), resultat: e.resultat, onglet: e.onglet || null, brut: e.brut || null })),
            guildes: guildesLues
        });
    }

    // Lecture paginée d'une table (PostgREST renvoie 1000 lignes au plus par requête)
    async function dbLire(chemin, jeton) {
        const lignes = [];
        for (let debut = 0; ; debut += 1000) {
            const r = await dbHttp('GET', `${chemin}&limit=1000&offset=${debut}`, undefined, jeton);
            if (!r.ok || !Array.isArray(r.json)) return r.ok ? lignes : null;
            lignes.push(...r.json);
            if (r.json.length < 1000) return lignes;
        }
    }

    // Au chargement et à la connexion : joueurs déjà repérés (avec leur dernier statut) et derniers classements de guildes.
    // Les profils bruts ne sont chargés qu'à l'ouverture d'une fiche (dbFiche).
    async function dbCharger() {
        const jeton = await dbJeton();
        if (!jeton) return;
        const moi = await dbHttp('GET', '/rest/v1/recruteurs?select=role,actif', undefined, jeton);
        if (moi.ok) {
            const ligne = (moi.json || [])[0];
            const s = dbSession();
            if (s) gmSet(DB_SESSION, { ...s, role: ligne && ligne.actif ? ligne.role : 'aucun' });
            majBase();
            if (!ligne || !ligne.actif) { setStatus('Compte connecté mais pas encore autorisé : demande un accès.', 'warn'); return; }
        }
        const joueurs = await dbLire('/rest/v1/joueurs?select=nom,ironcow,couleur,statut,a_guilde,guilde,rang,total_level,combat_level,age,niveaux,equipement,en_ligne,activite,derniere_verif&order=nom', jeton);
        if (!joueurs) { log('Base : lecture des joueurs impossible.'); return; }
        let ajoutes = 0;
        for (const j of joueurs) {
            let p = recrues.get(j.nom);
            if (!p) { p = newRecruit(j.nom, j.couleur); recrues.set(j.nom, p); ajoutes++; }
            if (j.ironcow) p.ironcow = true;
            if (!p.color && j.couleur) p.color = j.couleur;
            if (!p.niveaux && j.niveaux) p.niveaux = j.niveaux;
            if (!p.equipement && j.equipement) p.equipement = j.equipement;
            if (p.activite === undefined && j.activite !== null) { p.activite = j.activite; p.enLigne = j.en_ligne; }
            // Ce qui a été vérifié pendant cette session fait foi
            if (p.verifie || j.statut === 'pending') continue;
            const verif = Date.parse(j.derniere_verif || '');
            if (Number.isFinite(verif)) p.derniereVerif = verif;
            p.verifie = true;
            p.echec = j.statut === 'fail';
            p.hasGuild = !!j.a_guilde;
            p.guilde = j.guilde || '';
            p.rang = j.rang || '';
            p.stats = { total: j.total_level ?? '?', combat: j.combat_level ?? '?', age: j.age || '?' };
            p.ironcow = !!j.ironcow;
            // Vérifié il y a trop longtemps : on garde ses infos mais il repart dans la file à vérifier
            p.perime = Number.isFinite(verif) && joursDepuis(verif) >= DELAI_REVERIF_JOURS;
            if (p.perime) p.verifie = false;
        }

        // Dernier relevé de chaque guilde dans chaque classement (chaque scan n'en lit qu'un) ;
        // ce qui a été lu pendant cette session reste prioritaire
        const lignes = await dbLire('/rest/v1/guildes_classements_derniers?select=guilde,classement,rang,valeurs&order=guilde,classement', jeton);
        (lignes || []).forEach(l => {
            const g = guildes.get(l.guilde) || { nom: l.guilde, stats: {} };
            if (!g.stats[l.classement]) g.stats[l.classement] = { rang: l.rang ?? NaN, valeurs: l.valeurs || {} };
            guildes.set(l.guilde, g);
        });
        log(`Base : ${joueurs.length} joueurs lus (${ajoutes} ajoutés à la liste), ${guildes.size} guildes.`);
        setStatus(`Base : ${joueurs.length} joueur(s) chargé(s).`, 'ok');
        updateModalUI();
    }

    // Fiche d'un joueur vérifié lors d'une session précédente : profil brut et onglets de sa dernière vérification réussie
    const fichesDemandees = new Set();
    async function dbFiche(p) {
        if ((!p.verifie && !p.perime) || p.echec || profilsBruts.has(p.nom) || fichesDemandees.has(p.nom)) return;
        fichesDemandees.add(p.nom);
        const jeton = await dbJeton();
        if (!jeton) { fichesDemandees.delete(p.nom); return; }
        const r = await dbHttp('GET', `/rest/v1/verifications?select=profil_brut,sections&joueur=eq.${encodeURIComponent(p.nom)}&succes=is.true&order=verifie_le.desc&limit=1`, undefined, jeton);
        const v = r.ok && r.json && r.json[0];
        if (!v) { fichesDemandees.delete(p.nom); return; }
        if (v.profil_brut && !profilsBruts.has(p.nom)) profilsBruts.set(p.nom, v.profil_brut);
        if (!p.niveaux) p.niveaux = niveauxProfil(v.profil_brut);
        if (!p.equipement) p.equipement = equipementProfil(v.profil_brut);
        if (v.sections && !p.profil) p.profil = { sections: v.sections, lu: Date.now() };
        if (currentProfile === p.nom) renderProfileView();
        updateModalUI();
    }

    // Pastille « Base » de la modale : connecté ou non, envois en attente
    function majBase() {
        const el = document.getElementById('mwi-db');
        if (!el) return;
        const s = dbSession(), attente = gmGet(DB_FILE, []).length;
        el.dataset.etat = !s ? 'off' : attente ? 'attente' : 'on';
        el.title = !s ? 'Base : non connecté (clic pour se connecter)'
            : `Base : connecté (${s.email})${attente ? ` · ${attente} envoi(s) en attente` : ''}`;
        const info = document.getElementById('mwi-db-info');
        if (info) info.textContent = s ? `Connecté : ${s.email}${attente ? ` · ${attente} en attente` : ''}` : '';
        const panneau = document.getElementById('mwi-db-panel');
        if (panneau) panneau.dataset.connecte = s ? '1' : '';
        // Scan et vérification masqués hors compte rh
        const modal = document.getElementById('mwi-tracker-modal');
        if (modal) modal.dataset.role = estRh() ? 'rh' : 'lecteur';
        if (info && s && s.role) info.textContent += ` · ${s.role === 'rh' ? 'RH' : s.role === 'lecteur' ? 'lecture seule' : 'non autorisé'}`;
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

    // Le scan lit toujours les mêmes onglets : tous ceux du chat, sauf ceux exclus autrefois dans la modale
    function getSelectedTabs() {
        const excluded = loadUI().excludedChannels || [];
        return getChatTabs().filter(t => !excluded.includes(tabKey(t)));
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

    // dejaLus : messages déjà traités pendant ce scan (WeakSet), ignorés aux passages suivants
    function scanVisibleMessages(scanLog, dejaLus) {
        // Utilise un sélecteur large et robuste basé sur la classe partielle
        const messages = Array.from(document.querySelectorAll(`[class*="${CHAT_MESSAGE_CLASS}"]`)).filter(n => !dejaLus.has(n));
        let countNew = 0;

        messages.forEach(node => {
            dejaLus.add(node);
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

    // « Scanner le chat » : lecture unique de chaque onglet de chat coché, envoyée à la base comme un scan
    window.mwiScanChat = async function() {
        if (!estRh()) { setStatus('Scan réservé aux comptes RH.', 'warn'); return; }
        if (isProcessing || isScanning) {
            setStatus('Patiente, une opération est déjà en cours.', 'warn');
            return;
        }

        const allTabs = getChatTabs();
        const tabs = getSelectedTabs();
        if (allTabs.length === 0) {
            setStatus('Aucun onglet de chat trouvé.', 'warn');
            return;
        }

        isScanning = true;
        majBoutonsScan();
        const scanBtn = document.getElementById('mwi-btn-scan');
        if (scanBtn) scanBtn.textContent = 'Scan en cours...';

        const activeTab = allTabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
        let countNew = 0, totalMessages = 0;
        const scanLog = [], dejaLus = new WeakSet();
        const debut = new Date().toISOString();

        try {
            for (const tab of tabs) {
                const label = tabLabel(tab);
                setStatus(`Scan de "${label}"...`, '');

                tab.click();
                await sleep(TAB_SWITCH_WAIT_MS);

                const before = scanLog.length;
                const result = scanVisibleMessages(scanLog, dejaLus);
                for (let i = before; i < scanLog.length; i++) scanLog[i].onglet = label;

                countNew += result.countNew;
                totalMessages += result.total;
            }
            if (activeTab) activeTab.click();
            await sleep(50);
        } finally {
            isScanning = false;
            if (scanBtn) scanBtn.textContent = '1. Scanner le chat';
            majBoutonsScan();
        }

        log(`${countNew} nouveaux joueurs mis en file d'attente (${recrues.size} au total).`);
        dbScan({ debut, onglets: tabs.map(tabLabel), totalMessages, countNew, classements: [], guildesLues: [], scanLog });
        console.table(scanLog.filter(e => e.resultat.startsWith('ignoré')));
        setStatus(`Scan du chat terminé (${tabs.length} onglets) : ${countNew} nouveau(x) joueur(s).`, 'ok');
        updateModalUI();
    };

    // Boutons de scan et de vérification selon l'opération en cours
    function majBoutonsScan() {
        const chat = document.getElementById('mwi-btn-scan'), lb = document.getElementById('mwi-btn-lb'),
            verif = document.getElementById('mwi-btn-process');
        if (chat) chat.disabled = isScanning || isProcessing;
        if (lb) {
            lb.disabled = !scanLb && (isScanning || isProcessing);
            lb.textContent = scanLb ? '■ Arrêter le leaderboard' : '🏆 Leaderboard';
            lb.classList.toggle('actif', !!scanLb);
        }
        if (verif && !isProcessing) verif.disabled = isScanning;
    }

    // « Leaderboard » : scan continu sans aucun clic. Le joueur ouvre lui-même chaque classement (skills ou guildes),
    // le script lit celui qui est affiché dès qu'il change. « Arrêter » envoie tout à la base en un seul scan.
    let scanLb = null;

    function mwiScanLeaderboard() {
        if (scanLb) { terminerScanLb(scanLb); return; }
        if (!estRh()) { setStatus('Scan réservé aux comptes RH.', 'warn'); return; }
        if (isProcessing || isScanning) {
            setStatus('Patiente, une opération est déjà en cours.', 'warn');
            return;
        }
        const sc = { debut: new Date().toISOString(), scanLog: [], countNew: 0, signature: '', classements: [],
            guildesLues: new Map(), obs: null, minuterie: 0 };

        // Surveillance de la page (hors modale) : au plus une relecture toutes les 400 ms. Pas de délai relancé à
        // chaque modification : la page du jeu change sans arrêt (barres de progression) et la lecture n'aurait jamais lieu
        sc.obs = new MutationObserver(muts => {
            if (sc.minuterie) return;
            const dehors = muts.some(m => {
                const el = m.target.nodeType === 1 ? m.target : m.target.parentElement;
                return el && !el.closest('#mwi-tracker-modal');
            });
            if (!dehors) return;
            sc.minuterie = setTimeout(() => { sc.minuterie = 0; lectureLb(sc); }, 400);
        });
        sc.obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'aria-selected'] });
        // Page fermée pendant le scan : ce qui a été lu part dans la file d'envoi (envoyée au prochain chargement)
        sc.surFermeture = () => terminerScanLb(sc);
        window.addEventListener('pagehide', sc.surFermeture);
        scanLb = sc;
        isScanning = true;
        majBoutonsScan();
        lectureLb(sc);
    }

    // Signature du classement affiché : on ne relit le leaderboard que lorsqu'elle change
    function signatureLeaderboard() {
        const root = findLeaderboard();
        if (!root) return '';
        const box = panneauAffiche(root);
        const noms = Array.from(box.querySelectorAll('[class*="CharacterName_name"][data-name]')).filter(e => !masque(e));
        const t = noms.length ? null : readTable(root);
        return [classementOuvert(root, 'Milking', 'Foraging'), classementOuvert(root, 'Buildings', 'Shrines'),
            ['Standard', 'Ironcow', 'Guilds'].filter(n => { const o = tabEl(root, n); return o && selectionne(o); }).join(),
            noms.length, noms.slice(0, 5).map(e => e.getAttribute('data-name')).join(),
            t ? t.rows.length + ':' + t.rows.slice(0, 5).map(r => r.join(',')).join('|') : ''].join('#');
    }

    function lectureLb(sc) {
        if (scanLb && scanLb !== sc) return;
        const sig = signatureLeaderboard();
        if (sig && sig !== sc.signature) {
            sc.signature = sig;
            try {
                const lb = lireLeaderboardAffiche(sc.scanLog);
                if (lb.type) {
                    sc.countNew += lb.countNew;
                    const nom = `${lb.type === 'guildes' ? 'guildes' : 'leaderboard'} : ${lb.classement}`;
                    if (!sc.classements.includes(nom)) sc.classements.push(nom);
                    lb.guildesLues.forEach(g => sc.guildesLues.set(g.guilde + '\n' + g.classement, g));
                    updateModalUI();
                    if (document.getElementById('mwi-tracker-modal').dataset.view === 'guilds') renderGuildView();
                }
            } catch (e) {
                log('Erreur pendant la lecture du leaderboard :', e);
            }
        }
        if (scanLb === sc) setStatus(`Leaderboard : ${sc.classements.length} classement(s) lu(s), ${sc.countNew} nouveau(x) joueur(s). `
            + 'Ouvre les classements un par un, puis « Arrêter le leaderboard ».', 'ok');
    }

    function terminerScanLb(sc) {
        if (!sc || scanLb !== sc) return;
        lectureLb(sc); // dernière lecture de la page
        scanLb = null;
        sc.obs.disconnect();
        clearTimeout(sc.minuterie);
        window.removeEventListener('pagehide', sc.surFermeture);
        isScanning = false;
        majBoutonsScan();

        log(`Leaderboard : ${sc.classements.length} classements lus, ${sc.countNew} nouveaux joueurs.`, sc.classements);
        if (sc.classements.length) dbScan({ debut: sc.debut, onglets: [], totalMessages: 0, countNew: sc.countNew,
            classements: sc.classements, guildesLues: Array.from(sc.guildesLues.values()), scanLog: sc.scanLog });
        setStatus(`Leaderboard terminé : ${sc.classements.length} classement(s) lu(s), ${sc.countNew} nouveau(x) joueur(s).`,
            sc.classements.length ? 'ok' : 'warn');
        updateModalUI();
        if (document.getElementById('mwi-tracker-modal').dataset.view === 'guilds') renderGuildView();
    }

    // ---------------------------------------------------------------
    // 1b. Leaderboard : lecture du classement affiché par le joueur
    // ---------------------------------------------------------------
    // Règle du jeu : chaque onglet du leaderboard et des guildes demande des données au serveur. Le script ne les
    // parcourt pas et ne clique rien : le joueur ouvre lui-même un classement, « Scanner » lit celui qui est affiché.
    const horsJeu = (e) => e.closest('#mwi-tracker-modal') || e.closest('[class*="NavigationBar_"]') || e.closest('[class*="Chat_"]');
    const txt = (e) => (e.textContent || '').trim();
    // Éléments visibles dont le texte est exactement celui demandé : le plus profond de chaque branche
    // (un bouton du jeu contient souvent son texte + un élément vide pour l'effet de clic)
    const exactEls = (root, text) => Array.from(root.querySelectorAll('*')).filter(e =>
        txt(e) === text && !Array.from(e.children).some(c => txt(c) === text) && e.offsetParent !== null && !horsJeu(e));
    const commonAncestor = (a, b) => { let el = a; while (el && !el.contains(b)) el = el.parentElement; return el; };

    const visible = (e) => e.offsetParent !== null && !horsJeu(e);
    // Onglet ou bouton du jeu portant exactement ce texte
    const tabEl = (root, text) => Array.from(root.querySelectorAll('[role="tab"], button')).find(e => txt(e) === text && visible(e))
        || exactEls(root, text)[0];

    // Page Leaderboard du jeu, seulement si elle est affichée (les pages non affichées restent dans le document, masquées) :
    // le panneau nommé par le jeu, sinon le bloc autour de l'onglet "Guilds" qui contient aussi le tableau
    function findLeaderboard() {
        const panel = Array.from(document.querySelectorAll('[class*="LeaderboardPanel"]')).find(visible);
        if (panel) return panel;
        let el = tabEl(document.body, 'Guilds');
        while (el && el !== document.body && !/Rank[\s\S]*Name/.test(el.textContent)) el = el.parentElement;
        return el && el !== document.body ? el : null;
    }

    // Chaque classement a son propre TabPanel ; les autres restent dans le document en "TabPanel_hidden".
    // Le contenu est donc cherché dans le panneau de classement affiché, pas dans la racine trouvée au départ.
    const masque = (e) => !!e.closest('[class*="TabPanel_hidden"], [hidden]');
    function panneauAffiche(root) {
        const tous = Array.from(document.querySelectorAll('[class*="LeaderboardPanel_content"]')).filter(e => !masque(e) && visible(e));
        return tous[0] || root;
    }

    // Joueurs du classement affiché : composant CharacterName du jeu (vide pour un classement de guildes)
    function leaderboardPlayers(root) {
        const box = panneauAffiche(root);
        return Array.from(box.querySelectorAll('[class*="CharacterName_name"][data-name]')).filter(e => !masque(e)).map(readCharacterName);
    }

    // Onglet sélectionné : aria-selected, ou classe "selected" / "active" sur l'élément ou un parent proche
    const selectionne = (el) => {
        for (let e = el, k = 0; e && k < 3; e = e.parentElement, k++) {
            if (e.getAttribute('aria-selected') === 'true' || /(?:^|[\s_-])(?:Mui-)?(?:selected|active)\b/i.test(e.className || '')) return true;
        }
        return false;
    };
    // Nom du classement ouvert dans la liste qui contient les deux libellés donnés ('' si on ne le trouve pas)
    function classementOuvert(root, a, b) {
        const ea = exactEls(root, a)[0], eb = exactEls(root, b)[0];
        const box = ea && eb && commonAncestor(ea, eb);
        if (!box) return '';
        const choix = Array.from(box.children).find(c => selectionne(c) || Array.from(c.querySelectorAll('*')).some(selectionne));
        return choix ? txt(choix) : '';
    }

    // Lit le classement affiché : joueurs d'un classement de skill, ou guildes d'un classement de l'onglet Guilds.
    // Renvoie { type: 'joueurs' | 'guildes' | '', classement, countNew, guildesLues }
    function lireLeaderboardAffiche(scanLog) {
        const vide = { type: '', classement: '', countNew: 0, guildesLues: [] };
        const root = findLeaderboard();
        if (!root) { log('Leaderboard : page non affichée, rien à lire.'); return vide; }
        const ongletGuildes = tabEl(root, 'Guilds');
        const modeGuildes = !!ongletGuildes && selectionne(ongletGuildes);

        const joueurs = modeGuildes ? [] : leaderboardPlayers(root);
        if (joueurs.length) {
            const ongletIc = tabEl(root, 'Ironcow');
            const ironcow = !!ongletIc && selectionne(ongletIc);
            const classement = classementOuvert(root, 'Milking', 'Foraging') || 'classement affiché';
            let countNew = 0;
            joueurs.forEach(c => {
                if (!/^[a-zA-Z0-9_-]{2,30}$/.test(c.username || '')) return;
                if (upsertRecruit(c.username, c.color, c.ironcow || ironcow, scanLog, `leaderboard ${classement}`, '')) countNew++;
            });
            log(`Leaderboard : ${joueurs.length} joueurs lus dans "${classement}"${ironcow ? ' (Ironcow)' : ''}.`);
            return { type: 'joueurs', classement: `${ironcow ? 'Ironcow' : 'Standard'} · ${classement}`, countNew, guildesLues: [] };
        }

        // Classement de guildes (Level, Buildings, Shrines...) : rang et colonnes de chaque guilde.
        // Le jeu affiche notre propre guilde en première ligne avec son vrai rang, même hors du haut du classement.
        const t = readTable(root);
        if (!t || !t.rows.length) { log('Leaderboard : aucun joueur ni guilde lisible sur la page affichée.'); return vide; }
        const classement = classementOuvert(root, 'Buildings', 'Shrines') || t.headers[2] || 'Classement';
        const guildesLues = [];
        t.rows.forEach(cells => {
            const nom = cells[1];
            if (!nom) return;
            const g = guildes.get(nom) || { nom, stats: {} };
            const valeurs = {};
            t.headers.forEach((h, i) => { if (i >= 2 && h) valeurs[h] = cells[i] || ''; });
            g.stats[classement] = { rang: num(cells[0]), valeurs };
            guildes.set(nom, g);
            guildesLues.push({ guilde: nom, classement, rang: Number.isFinite(num(cells[0])) ? num(cells[0]) : null, valeurs });
        });
        log(`Guildes : ${guildesLues.length} guildes lues dans "${classement}".`);
        return { type: 'guildes', classement, countNew: 0, guildesLues };
    }

    // Nombre lu dans une cellule du jeu : "10 054 281", "1,2M", "513", "12.5"
    // Un seul "." ou "," suivi de 1 ou 2 chiffres est une décimale, sinon un séparateur de milliers
    const num = (v) => {
        const m = String(v).replace(/\s/g, '').match(/^(-?\d[\d.,]*)([KMBT])?/i);
        if (!m) return NaN;
        const mult = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[(m[2] || '').toUpperCase()] || 1;
        const decimal = mult > 1 || /^-?\d+[.,]\d{1,2}$/.test(m[1]);
        return parseFloat(decimal ? m[1].replace(',', '.') : m[1].replace(/[.,]/g, '')) * mult;
    };

    // Tableau affiché sur la page : en-têtes nettoyés (sans flèches de tri) et lignes de cellules
    function readTable(root) {
        const table = Array.from(panneauAffiche(root).querySelectorAll('table')).find(t => visible(t) && !masque(t));
        if (!table) return null;
        const trs = Array.from(table.querySelectorAll('tr'));
        const head = trs.find(tr => tr.querySelector('th')) || trs[0];
        if (!head) return null;
        return {
            headers: Array.from(head.children, c => txt(c).replace(/[^\w\s/().%-]/g, '').trim()),
            rows: trs.filter(tr => tr !== head && tr.children.length >= 2).map(tr => Array.from(tr.children, txt))
        };
    }

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
    // 2. Préremplir la commande de profil
    // ---------------------------------------------------------------
    // Règle du jeu : le script écrit la commande mais ne l'envoie jamais, c'est le joueur qui appuie sur Entrée.
    // Renvoie le champ du chat (null s'il est introuvable)
    const preremplirProfil = (username) => preremplirChat(`/profile ${username}`);
    function preremplirChat(command) {
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
        if (!chatInput) return null;

        const proto = chatInput instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
        if (nativeInputValueSetter) {
            nativeInputValueSetter.call(chatInput, command);
        } else {
            chatInput.value = command;
        }

        chatInput.dispatchEvent(new Event('input', { bubbles: true }));
        chatInput.dispatchEvent(new Event('change', { bubbles: true }));
        // Curseur en fin de commande : le joueur n'a plus qu'à appuyer sur Entrée
        chatInput.focus();
        try { chatInput.setSelectionRange(command.length, command.length); } catch (e) { }

        return chatInput;
    }

    // Vide le champ du chat s'il contient encore la commande préremplie (vérification arrêtée ou annulée)
    function viderPreremplissage(chatInput, username) {
        if (!chatInput || chatInput.value !== `/profile ${username}`) return;
        const proto = chatInput instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
        if (setter) setter.call(chatInput, ''); else chatInput.value = '';
        chatInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Attend que le joueur envoie la commande (le jeu vide le champ, ou le profil s'affiche), puis lit le profil.
    // continuer() faux = attente abandonnée (bouton Arrêter, fiche fermée) : renvoie null
    async function attendreEnvoi(chatInput, username, continuer) {
        for (;;) {
            if (!continuer()) { viderPreremplissage(chatInput, username); return null; }
            if (!chatInput.isConnected || chatInput.value === '' || findProfileModal(username).el) break;
            await sleep(POLL_MS);
        }
        limiteurProfils.marquerEnvoi();
        enAttente = null;
        setStatus(`Lecture du profil de ${username}...`, '');
        return analyzeProfile(username);
    }

    // ---------------------------------------------------------------
    // 3. Interface & Styles
    // ---------------------------------------------------------------
    const CSS = "#mwi-tracker-modal, #mwi-radar-launcher {\n    --r-bg: #0c0a0b;\n    --r-panel: #171113;\n    --r-panel-2: #24161a;\n    --r-border: #4a1f25;\n    --r-accent: #e0343c;\n    --r-accent-strong: #b3151d;\n    --r-gold: #e8b64c;\n    --r-text: #f4ece6;\n    --r-muted: #a08a8c;\n    --r-ok: #4ecb8d;\n    --r-warn: #f0a950;\n    --r-err: #ff5a5f;\n    font-family: \"Roboto\", \"Segoe UI\", sans-serif;\n    box-sizing: border-box;\n}\n#mwi-tracker-modal *, #mwi-radar-launcher * { box-sizing: border-box; }\n\n#mwi-tracker-modal {\n    position: fixed; top: 60px; right: 12px; z-index: 99999;\n    width: 440px; max-width: calc(100vw - 16px);\n    display: flex; flex-direction: column;\n    background: var(--r-bg); color: var(--r-text);\n    border: 1px solid var(--r-border); border-radius: 10px;\n    box-shadow: 0 8px 24px rgba(0,0,0,.55);\n    overflow: hidden; font-size: 13px;\n}\n#mwi-tracker-modal[data-mode=\"max\"] {\n    top: 5vh !important; left: 5vw !important; right: auto !important;\n    width: 90vw !important; height: 88vh !important;\n}\n#mwi-tracker-modal[data-mode=\"min\"] { height: auto !important; }\n#mwi-tracker-modal[data-sized=\"1\"] .mwi-r-list { max-height: none; }\n#mwi-tracker-modal[data-mode=\"min\"] .mwi-r-body { display: none; }\n#mwi-tracker-modal[data-mode=\"min\"] { width: 260px; }\n\n.mwi-r-head {\n    display: flex; align-items: center; gap: 8px;\n    padding: 8px 10px; cursor: move; user-select: none;\n    background: linear-gradient(180deg, var(--r-panel-2), var(--r-panel));\n    border-bottom: 2px solid var(--r-accent);\n}\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-head { cursor: default; }\n.mwi-r-title { flex: 1; font-size: 14px; font-weight: 700; color: var(--r-accent); letter-spacing: .3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.mwi-r-logo { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; display: block; }\n#mwi-radar-launcher { padding: 0; overflow: hidden; }\n#mwi-radar-launcher .mwi-r-logo { width: 100%; height: 100%; }\n.mwi-r-player { cursor: pointer; }\n.mwi-r-player:hover { text-decoration: underline; }\n.mwi-r-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }\n.mwi-r-profile {\n    visibility: hidden; font-weight: 700;\n    padding: 3px 12px; font-size: 12px; letter-spacing: .3px; cursor: pointer;\n    color: #fff; background: var(--r-accent);\n    border: 1px solid var(--r-accent); border-radius: 4px;\n    box-shadow: 0 0 8px rgba(224, 52, 60, .45);\n    transition: background .15s, box-shadow .15s, transform .1s;\n}\n.mwi-r-profile:hover { text-decoration: none; background: var(--r-accent-strong); box-shadow: 0 0 12px rgba(224, 52, 60, .75); transform: translateY(-1px); }\n.mwi-r-badge {\n    min-width: 22px; padding: 1px 7px; text-align: center;\n    font-size: 12px; font-weight: 700; color: var(--r-bg);\n    background: var(--r-ok); border-radius: 10px;\n}\n.mwi-r-ctrl { display: flex; gap: 4px; }\n.mwi-r-icon {\n    width: 24px; height: 24px; padding: 0; line-height: 1;\n    display: flex; align-items: center; justify-content: center;\n    color: var(--r-text); background: transparent;\n    border: 1px solid var(--r-border); border-radius: 5px;\n    cursor: pointer; font-size: 14px; transition: background .15s, border-color .15s;\n}\n.mwi-r-icon:hover { background: var(--r-panel-2); border-color: var(--r-accent); }\n.mwi-r-icon.close:hover { background: var(--r-err); border-color: var(--r-err); }\n\n.mwi-r-body { display: flex; flex-direction: column; gap: 14px; padding: 14px; flex: 1; min-height: 0; }\n\n/* Barre du haut : recherche + icônes (guildes, copier, vider), puis filtres et taille des cases */\n.mwi-r-toolbar { display: flex; gap: 8px; align-items: center; }\n.mwi-r-toolbar .mwi-r-search { flex: 1; }\n.mwi-r-tools { display: flex; gap: 4px; flex-shrink: 0; }\n.mwi-r-tools .mwi-r-icon { width: 30px; height: 30px; font-size: 15px; }\n.mwi-r-filters { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }\n.mwi-r-filters .mwi-r-select { flex: 1 1 110px; }\n.mwi-r-filters .mwi-r-sizes { margin-left: auto; }\n.mwi-r-db[data-etat=\"off\"] { color: var(--r-muted); }\n.mwi-r-db[data-etat=\"on\"] { color: var(--r-ok); border-color: var(--r-ok); }\n.mwi-r-db[data-etat=\"attente\"] { color: var(--r-warn); border-color: var(--r-warn); }\n.mwi-r-dbpanel {\n    display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 8px;\n    background: var(--r-panel); border: 1px solid var(--r-accent); border-radius: 8px;\n}\n.mwi-r-dbpanel[hidden] { display: none; }\n.mwi-r-dbtitre { flex-basis: 100%; font-size: 11px; font-weight: 700; color: var(--r-gold); }\n.mwi-r-dbinfo { flex: 1; font-size: 12px; color: var(--r-ok); }\n.mwi-r-dbpanel[data-connecte=\"1\"] input, .mwi-r-dbpanel[data-connecte=\"1\"] #mwi-db-login,\n.mwi-r-dbpanel:not([data-connecte=\"1\"]) #mwi-db-sync, .mwi-r-dbpanel:not([data-connecte=\"1\"]) #mwi-db-logout { display: none; }\n/* Lecture seule (lecteur ou non connecté) : ni scan, ni vérification */\n#mwi-tracker-modal[data-role=\"lecteur\"] .mwi-r-progress,\n#mwi-tracker-modal[data-role=\"lecteur\"] .mwi-r-actions { display: none; }\n\n.mwi-r-iron { font-size: 11px; font-weight: 700; color: var(--r-warn); margin-left: 4px; flex-shrink: 0; }\n.mwi-r-select {\n    flex: 0 1 150px; padding: 5px 8px; color: var(--r-text);\n    background: var(--r-panel); border: 1px solid var(--r-border);\n    border-radius: 5px; font-size: 12px; outline: none;\n}\n.mwi-r-select:focus { border-color: var(--r-accent); }\n\n.mwi-r-btn {\n    padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer;\n    color: var(--r-text); background: var(--r-panel-2);\n    border: 1px solid var(--r-border); border-radius: 5px;\n    transition: background .15s, border-color .15s, opacity .15s;\n}\n.mwi-r-btn:hover:not(:disabled) { border-color: var(--r-accent); background: #331a1f; }\n.mwi-r-btn.primary { color: #fff; background: var(--r-accent); border-color: var(--r-accent); }\n.mwi-r-btn.primary:hover:not(:disabled) { background: var(--r-accent-strong); }\n.mwi-r-btn:disabled { opacity: .55; cursor: not-allowed; }\n\n.mwi-r-list {\n    overflow-x: hidden; padding-right: 2px;\n    flex: 1; min-height: 160px; max-height: 400px; overflow-y: auto;\n    list-style: none; margin: 0; padding: 0;\n    display: grid; grid-template-columns: 1fr; gap: 10px; align-content: start; padding-right: 4px;\n}\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-list {\n    max-height: none;\n    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));\n}\n.mwi-r-list::-webkit-scrollbar { width: 8px; }\n.mwi-r-list::-webkit-scrollbar-thumb { background: var(--r-border); border-radius: 4px; }\n\n.mwi-r-card {\n    padding: 12px 14px; background: var(--r-panel);\n    border: 1px solid var(--r-border); border-left: 3px solid var(--r-ok);\n    border-radius: 6px; min-width: 0;\n    transition: border-color .15s, background .15s;\n}\n.mwi-r-card.guild { border-left-color: var(--r-gold); }\n.mwi-r-card.fail { border-left-color: var(--r-err); }\n.mwi-r-card.pending { border-left-color: var(--r-muted); }\n.mwi-r-name { font-weight: 700; font-size: 14px; line-height: 1.3; color: var(--r-text); display: flex; justify-content: space-between; align-items: center; gap: 10px; min-width: 0; }\n.mwi-r-who { display: flex; align-items: center; min-width: 0; overflow: hidden; }\n.mwi-r-who .mwi-r-player { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.mwi-r-card:hover { background: var(--r-panel-2); border-color: var(--r-accent); }\n.mwi-r-tag { font-size: 11px; font-weight: 700; color: var(--r-muted); white-space: nowrap; }\n/* Niveau du skill choisi (ou du meilleur skill) */\n.mwi-r-lvl {\n    padding: 1px 7px; font-size: 11px; white-space: nowrap; color: var(--r-muted);\n    background: var(--r-bg); border: 1px solid var(--r-border); border-radius: 10px;\n}\n.mwi-r-lvl i { font-style: normal; }\n.mwi-r-lvl b { color: var(--r-gold); }\n/* Équipement du métier dans la pastille : ✨ outil celestial, 👕 haut, 👖 bas, 🔮 charme */\n.mwi-r-lvl .eq { margin-left: 5px; padding-left: 5px; border-left: 1px solid var(--r-border); color: var(--r-warn); font-weight: 700; letter-spacing: 1px; }\n.mwi-r-details .eq { color: var(--r-warn); letter-spacing: 1px; }\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-lvl i { display: none; }\n\n/* Liste + barre des skills à gauche, comme dans le jeu (icônes seules quand la modale est étroite) */\n.mwi-r-main { display: flex; gap: 12px; flex: 1; min-height: 0; container-type: inline-size; container-name: mwi-main; }\n.mwi-r-main .mwi-r-list { flex: 1; min-width: 0; }\n.mwi-r-skills {\n    display: flex; flex-direction: column; gap: 1px; flex-shrink: 0; width: 44px;\n    max-height: 400px; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;\n    background: var(--r-panel); border: 1px solid var(--r-border); border-radius: 6px;\n}\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-skills,\n#mwi-tracker-modal[data-sized=\"1\"] .mwi-r-skills { max-height: none; }\n.mwi-r-sk {\n    position: relative; display: flex; align-items: center; gap: 10px; width: 100%; padding: 7px 6px;\n    font-size: 13px; text-align: left; cursor: pointer; color: var(--r-text);\n    background: transparent; border: 0; border-left: 3px solid transparent;\n    transition: background .15s;\n}\n.mwi-r-sk:hover { background: var(--r-panel-2); }\n.mwi-r-sk.active { background: rgba(224, 52, 60, .28); border-left-color: var(--r-accent); }\n.mwi-r-sk.vide:not(.active) { opacity: .45; }\n.mwi-r-sk.titre { margin-top: 4px; border-top: 1px solid var(--r-border); }\n.mwi-r-sk .ico { width: 26px; height: 26px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 16px; }\n.mwi-r-sk .ico svg { width: 26px; height: 26px; }\n.mwi-r-sk .ico b { font-size: 11px; color: var(--r-muted); }\n.mwi-r-sk .nom { display: none; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.mwi-r-sk .nb {\n    position: absolute; right: 1px; bottom: 1px; min-width: 14px; padding: 0 3px;\n    font-size: 9px; font-weight: 700; line-height: 13px; text-align: center;\n    color: var(--r-bg); background: var(--r-gold); border-radius: 7px;\n}\n.mwi-r-sk.vide .nb { display: none; }\n@container mwi-main (min-width: 560px) {\n    .mwi-r-skills { width: 190px; }\n    .mwi-r-sk .nom { display: block; }\n    .mwi-r-sk.sous { padding-left: 18px; }\n    .mwi-r-sk .nb { position: static; font-size: 11px; line-height: 16px; padding: 0 6px; }\n    .mwi-r-sk.vide .nb { display: inline; background: none; color: var(--r-muted); }\n}\n.mwi-r-card:not(.guild):not(.fail):not(.pending) .mwi-r-tag { color: var(--r-ok); }\n.mwi-r-card.fail .mwi-r-tag { color: var(--r-err); }\n.mwi-r-card.guild .mwi-r-tag { color: var(--r-gold); }\n.mwi-r-stats { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 16px; margin-top: 8px; font-size: 12px; color: var(--r-muted); }\n/* Pastille du skill : sur la ligne des stats (cases moyennes), à côté du nom pour les petites et grandes cases */\n.mwi-r-right .mwi-r-lvl { display: none; }\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-right .mwi-r-lvl,\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-right .mwi-r-lvl { display: inline; }\n.mwi-r-stats b { color: var(--r-text); font-weight: 600; }\n.mwi-r-sizes { display: flex; gap: 2px; padding: 2px; background: var(--r-panel); border: 1px solid var(--r-border); border-radius: 6px; }\n.mwi-r-sizes .mwi-r-icon { border-color: transparent; color: var(--r-muted); }\n.mwi-r-sizes .mwi-r-icon.active { color: var(--r-accent); background: var(--r-panel-2); border-color: var(--r-accent); }\n.mwi-r-details { display: none; grid-template-columns: auto 1fr; gap: 6px 14px; margin: 10px 0 0; font-size: 12px; }\n.mwi-r-details dt { color: var(--r-muted); }\n.mwi-r-details dd { margin: 0; color: var(--r-text); font-weight: 600; }\n\n/* Taille des cases : grandes = toutes les infos en liste, moyennes = stats sur une ligne, petites = nom seul */\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-card { padding: 12px 14px; }\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-name { font-size: 15px; }\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-stats,\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-tag { display: none; }\n#mwi-tracker-modal[data-size=\"large\"] .mwi-r-details { display: grid; }\n#mwi-tracker-modal[data-size=\"large\"][data-mode=\"max\"] .mwi-r-list { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-card { padding: 6px 10px; }\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-name { font-size: 13px; align-items: center; }\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-stats { display: none; }\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-list { gap: 4px; }\n#mwi-tracker-modal[data-size=\"small\"][data-mode=\"max\"] .mwi-r-list { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); }\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-card { border-left-width: 1px; }\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-tag { font-size: 0; }\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-tag::before {\n    content: ''; display: block; width: 8px; height: 8px; border-radius: 50%; background: currentColor;\n}\n#mwi-tracker-modal[data-size=\"small\"] .mwi-r-card.pending .mwi-r-tag { color: var(--r-muted); }\n#mwi-tracker-modal[data-size=\"medium\"][data-mode=\"max\"] .mwi-r-list { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }\n.mwi-r-card[data-player] { cursor: pointer; }\n\n/* Fiche joueur */\n.mwi-r-pview { display: none; flex: 1; min-height: 0; flex-direction: column; gap: 8px; }\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-pview { display: flex; }\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-main,\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-list,\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-toolbar,\n#mwi-tracker-modal[data-view=\"profile\"] .mwi-r-filters { display: none; }\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-main,\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-list,\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-toolbar,\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-filters,\n#mwi-tracker-modal[data-view=\"stats\"] .mwi-r-main,\n#mwi-tracker-modal[data-view=\"stats\"] .mwi-r-list,\n#mwi-tracker-modal[data-view=\"stats\"] .mwi-r-toolbar,\n#mwi-tracker-modal[data-view=\"stats\"] .mwi-r-filters { display: none; }\n.mwi-r-phead { display: flex; align-items: center; gap: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--r-border); }\n.mwi-r-pname { flex: 1; min-width: 0; font-size: 17px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.mwi-r-pview .mwi-r-profile { visibility: visible; }\n/* Bouton Recruter et choix du message privé */\n.mwi-r-recruter { flex-shrink: 0; white-space: nowrap; }\n.mwi-r-recrut { display: flex; flex-direction: column; gap: 6px; padding: 8px; background: var(--r-panel); border: 1px solid var(--r-gold); border-radius: 8px; }\n.mwi-r-recrut-titre { font-size: 11px; font-weight: 700; color: var(--r-gold); }\n.mwi-r-msg {\n    display: flex; flex-direction: column; gap: 2px; padding: 6px 10px; cursor: pointer; text-align: left;\n    color: var(--r-text); background: var(--r-bg); border: 1px solid var(--r-border); border-radius: 6px;\n    font-size: 12px; transition: border-color .15s, background .15s;\n}\n.mwi-r-msg:hover { border-color: var(--r-accent); background: var(--r-panel-2); }\n.mwi-r-msg.active { border-color: var(--r-accent); background: var(--r-panel-2); }\n.mwi-r-msg b { font-size: 11px; color: var(--r-accent); }\n.mwi-r-msg span { color: var(--r-muted); }\n.mwi-r-recrut-tete { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px; }\n.mwi-r-recrut-texte { width: 100%; min-height: 58px; resize: vertical; font-family: inherit; line-height: 1.4; }\n.mwi-r-recrut-pied { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px; }\n.mwi-r-recrut-cmd { font-size: 11px; color: var(--r-muted); }\n.mwi-r-ptabs { display: flex; flex-wrap: wrap; gap: 4px; }\n.mwi-r-ptab {\n    padding: 4px 10px; font-size: 12px; font-weight: 700; cursor: pointer;\n    color: var(--r-muted); background: var(--r-panel);\n    border: 1px solid var(--r-border); border-radius: 14px;\n    transition: color .15s, border-color .15s, background .15s;\n}\n.mwi-r-ptab:hover { color: var(--r-text); border-color: var(--r-accent); }\n.mwi-r-ptab.active { color: #fff; background: var(--r-accent); border-color: var(--r-accent); }\n.mwi-r-pbody {\n    flex: 1; min-height: 140px; max-height: 360px; overflow-y: auto; padding: 10px 12px;\n    background: var(--r-panel); border: 1px solid var(--r-border); border-radius: 6px;\n}\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-pbody,\n#mwi-tracker-modal[data-sized=\"1\"] .mwi-r-pbody { max-height: none; }\n.mwi-r-pbody::-webkit-scrollbar { width: 8px; }\n.mwi-r-pbody::-webkit-scrollbar-thumb { background: var(--r-border); border-radius: 4px; }\n.mwi-r-pgrid { display: grid; grid-template-columns: auto 1fr; gap: 8px 18px; margin: 0; font-size: 13px; }\n.mwi-r-pgrid dt { color: var(--r-muted); }\n.mwi-r-pgrid dd { margin: 0; font-weight: 700; }\n.mwi-r-pstat.free { color: var(--r-ok); }\n.mwi-r-pstat.guild { color: var(--r-gold); }\n.mwi-r-pstat.fail { color: var(--r-err); }\n.mwi-r-pstat.pending { color: var(--r-muted); }\n.mwi-r-ptab:focus { outline: none; }\n.mwi-r-rows { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 0 20px; margin: 0; font-size: 13px; }\n.mwi-r-row {\n    display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 4px 12px;\n    padding: 6px 2px; border-bottom: 1px solid rgba(255,255,255,.06);\n}\n.mwi-r-row dt { color: var(--r-muted); }\n.mwi-r-row dd { margin: 0; font-weight: 700; color: var(--r-text); text-align: right; font-variant-numeric: tabular-nums; }\n.mwi-r-row.done dd { color: var(--r-ok); }\n.mwi-r-bar { flex-basis: 100%; height: 4px; background: var(--r-bg); border-radius: 2px; overflow: hidden; }\n.mwi-r-bar > div { height: 100%; background: var(--r-accent); border-radius: 2px; }\n.mwi-r-row.done .mwi-r-bar > div { background: var(--r-ok); }\n.mwi-r-solos { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-bottom: 8px; font-size: 12px; }\n.mwi-r-solo-label { color: var(--r-muted); }\n.mwi-r-solo { padding: 2px 10px; font-weight: 700; color: var(--r-text); background: var(--r-bg); border: 1px solid var(--r-border); border-radius: 12px; }\n.mwi-r-solo-label ~ .mwi-r-solo { font-weight: 400; color: var(--r-muted); border-style: dashed; }\n/* Cases du profil : icône au centre, textes et badges dans les coins */\n.mwi-r-tiles {\n    --tile: 58px;\n    display: grid; grid-template-columns: repeat(auto-fill, var(--tile)); grid-auto-rows: var(--tile);\n    gap: 6px; margin-top: 10px; justify-content: start; overflow-x: auto; padding-bottom: 2px;\n}\n.mwi-r-tiles:first-child { margin-top: 0; }\n.mwi-r-tiles.placed { grid-template-columns: repeat(var(--cols), var(--tile)); }\n.mwi-r-tile {\n    position: relative; width: var(--tile); height: var(--tile);\n    display: flex; align-items: center; justify-content: center;\n    background: linear-gradient(160deg, var(--r-panel-2), var(--r-bg));\n    border: 1px solid var(--r-border); border-radius: 6px;\n    transition: border-color .15s, box-shadow .15s;\n}\n.mwi-r-tile:hover { border-color: var(--r-accent); box-shadow: 0 0 8px rgba(224, 52, 60, .35); }\n.mwi-r-tico { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }\n.mwi-r-tico svg, .mwi-r-tico img { width: 40px; height: 40px; object-fit: contain; }\n.mwi-r-tt {\n    position: absolute; max-width: calc(100% - 4px); overflow: hidden; white-space: nowrap;\n    font-size: 11px; font-weight: 700; line-height: 1; color: var(--r-text);\n    text-shadow: 0 0 3px #000, 0 0 3px #000;\n}\n.mwi-r-tt.tl { top: 3px; left: 3px; }\n.mwi-r-tt.tc { top: 3px; left: 50%; transform: translateX(-50%); }\n.mwi-r-tt.tr { top: 3px; right: 3px; }\n.mwi-r-tt.bl { bottom: 3px; left: 3px; }\n.mwi-r-tt.bc { bottom: 3px; left: 50%; transform: translateX(-50%); }\n.mwi-r-tt.br { bottom: 3px; right: 3px; }\n.mwi-r-tt.plus { color: var(--r-warn); }\n.mwi-r-tt.num { color: var(--r-ok); }\n.mwi-r-tb { position: absolute; width: 16px; height: 16px; }\n.mwi-r-tb svg, .mwi-r-tb img { width: 16px; height: 16px; }\n.mwi-r-tb.tl { top: 2px; left: 2px; }\n.mwi-r-tb.tr { top: 2px; right: 2px; }\n.mwi-r-tb.bl { bottom: 2px; left: 2px; }\n.mwi-r-tb.br { bottom: 2px; right: 2px; }\n.mwi-r-tb.tc { top: 2px; left: calc(50% - 8px); }\n.mwi-r-tb.bc { bottom: 2px; left: calc(50% - 8px); }\n.mwi-r-tile.vide { background: none; border-style: dashed; opacity: .75; }\n.mwi-r-tname { padding: 2px; font-size: 9px; line-height: 1.15; text-align: center; color: var(--r-muted); overflow: hidden; }\n.mwi-r-sub { margin: 14px 0 6px; font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--r-muted); }\n.mwi-r-sub:first-child { margin-top: 0; }\n.mwi-r-psec .mwi-r-sub + .mwi-r-tiles, .mwi-r-sub + .mwi-r-tiles { margin-top: 0; }\n.mwi-r-pempty { margin: 10px 0 0; font-style: italic; color: var(--r-muted); font-size: 12px; }\n\n/* Petite fenêtre : un onglet à la fois. Modale large : toutes les sections répertoriées en colonnes, sans onglets */\n.mwi-r-pview { container-type: inline-size; container-name: mwi-pview; }\n.mwi-r-psec:not(.active) { display: none; }\n.mwi-r-psec-title { display: none; }\n@container mwi-pview (min-width: 880px) {\n    .mwi-r-ptabs { display: none; }\n    .mwi-r-pbody { padding: 0 4px 0 0; background: none; border: 0; border-radius: 0; }\n    .mwi-r-psecs { columns: 420px; column-gap: 12px; }\n    .mwi-r-psec, .mwi-r-psec:not(.active) {\n        display: block; break-inside: avoid; margin: 0 0 12px; padding: 12px 14px 14px;\n        background: linear-gradient(180deg, var(--r-panel-2), var(--r-panel) 46px);\n        border: 1px solid var(--r-border); border-top: 2px solid var(--r-accent); border-radius: 8px;\n        box-shadow: 0 2px 10px rgba(0,0,0,.35);\n    }\n    .mwi-r-psec-title {\n        display: flex; align-items: center; gap: 8px; margin: 0 0 12px;\n        font-size: 12px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; color: var(--r-gold);\n    }\n    .mwi-r-psec-title::after { content: ''; flex: 1; height: 1px; background: var(--r-border); }\n    .mwi-r-psec .mwi-r-rows { grid-template-columns: 1fr; }\n    .mwi-r-psec .mwi-r-tiles { justify-content: center; }\n}\n/* Très grande modale : trois colonnes indépendantes (Skills | Résumé, Overview | Equipment), le reste réparti en dessous */\n.mwi-r-pcol { display: contents; }\n@container mwi-pview (min-width: 1200px) {\n    .mwi-r-psecs {\n        columns: auto; display: grid; gap: 12px; align-items: start;\n        grid-template-columns: minmax(0, .8fr) minmax(0, 1fr) minmax(400px, 1.1fr);\n    }\n    .mwi-r-pcol { display: flex; flex-direction: column; gap: 12px; min-width: 0; }\n    .mwi-r-psec, .mwi-r-psec:not(.active) { margin: 0; min-width: 0; }\n    /* Cases plus grandes, réparties sur toute la largeur de la section */\n    .mwi-r-psec .mwi-r-tiles {\n        --tile: clamp(58px, 4cqw, 72px); gap: 12px 8px; margin-top: 12px;\n        grid-template-columns: repeat(auto-fill, minmax(calc(var(--tile) + 14px), 1fr));\n        justify-content: stretch; justify-items: center;\n    }\n    .mwi-r-psec .mwi-r-tiles.placed { grid-template-columns: repeat(var(--cols), minmax(var(--tile), 1fr)); }\n    .mwi-r-psec .mwi-r-tico, .mwi-r-psec .mwi-r-tico svg, .mwi-r-psec .mwi-r-tico img { width: calc(var(--tile) - 18px); height: calc(var(--tile) - 18px); }\n    .mwi-r-psec .mwi-r-tt { font-size: 12px; }\n}\n\n/* Comparaison des guildes */\n.mwi-r-gview { display: none; flex: 1; min-height: 0; flex-direction: column; gap: 8px; }\n#mwi-tracker-modal[data-view=\"guilds\"] .mwi-r-gview { display: flex; }\n.mwi-r-gcount { margin-left: 8px; font-size: 12px; font-weight: 400; color: var(--r-muted); }\n.mwi-r-gbody { flex: 1; min-height: 140px; max-height: 360px; overflow: auto; padding-right: 4px; }\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-gbody,\n#mwi-tracker-modal[data-sized=\"1\"] .mwi-r-gbody { max-height: none; }\n.mwi-r-gbody::-webkit-scrollbar { width: 8px; height: 8px; }\n.mwi-r-gbody::-webkit-scrollbar-thumb { background: var(--r-border); border-radius: 4px; }\n.mwi-r-gcards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; margin-bottom: 12px; }\n.mwi-r-gcard {\n    padding: 10px 12px; cursor: pointer;\n    background: linear-gradient(180deg, var(--r-panel-2), var(--r-panel) 46px);\n    border: 1px solid var(--r-border); border-top: 2px solid var(--r-border); border-radius: 8px;\n    transition: border-color .15s;\n}\n.mwi-r-gcard:hover, .mwi-r-gcard.active { border-color: var(--r-accent); }\n.mwi-r-gcard h4 { margin: 0 0 4px; font-size: 12px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; color: var(--r-gold); }\n.mwi-r-grank { font-size: 24px; font-weight: 700; line-height: 1.2; color: var(--r-text); }\n.mwi-r-gcard .mwi-r-rows { grid-template-columns: 1fr; font-size: 12px; }\n.mwi-r-rows + .mwi-r-gverdict { margin-top: 10px; }\n.mwi-r-gverdict { margin: 0 0 6px; padding: 5px 10px; font-size: 12px; font-weight: 700; color: var(--r-muted); background: var(--r-bg); border-left: 3px solid var(--r-muted); border-radius: 4px; }\n.mwi-r-gverdict.mieux { color: var(--r-err); border-left-color: var(--r-err); }\n.mwi-r-gverdict.moins { color: var(--r-ok); border-left-color: var(--r-ok); }\n.mwi-r-gverdict.egal { color: var(--r-warn); border-left-color: var(--r-warn); }\n.mwi-r-gtable { width: 100%; border-collapse: collapse; font-size: 12px; }\n.mwi-r-gtable th {\n    position: sticky; top: 0; z-index: 1; padding: 6px 8px; text-align: left; white-space: nowrap;\n    color: var(--r-muted); background: var(--r-panel-2); border-bottom: 2px solid var(--r-border);\n}\n.mwi-r-gtable th[data-action] { cursor: pointer; }\n.mwi-r-gtable th[data-action]:hover { color: var(--r-text); }\n.mwi-r-gtable th.active { color: var(--r-accent); border-bottom-color: var(--r-accent); }\n.mwi-r-gtable td { padding: 5px 8px; white-space: nowrap; border-bottom: 1px solid rgba(255,255,255,.05); }\n.mwi-r-gtable .n { text-align: right; font-variant-numeric: tabular-nums; }\n.mwi-r-gtable small { margin-left: 4px; color: var(--r-muted); }\n.mwi-r-gtable tbody tr:hover { background: var(--r-panel); }\n.mwi-r-gtable tr.moi td { font-weight: 700; color: var(--r-gold); background: var(--r-panel-2); border-bottom: 1px solid var(--r-accent); }\n\n/* Guildes, onglet Consultation : liste triable des guildes et fiche de la guilde choisie avec ses joueurs.\n   Modale étroite : la liste, puis la fiche à sa place ; modale large : les deux côte à côte */\n.mwi-r-gview { container-type: inline-size; container-name: mwi-gview; }\n.mwi-r-gcons { flex: 1; min-height: 140px; max-height: 360px; display: grid; grid-template-columns: 1fr; gap: 12px; }\n#mwi-tracker-modal[data-mode=\"max\"] .mwi-r-gcons,\n#mwi-tracker-modal[data-sized=\"1\"] .mwi-r-gcons { max-height: none; }\n.mwi-r-gcons[data-sel=\"1\"] .mwi-r-glist, .mwi-r-gcons:not([data-sel=\"1\"]) .mwi-r-gdetail { display: none; }\n.mwi-r-glist { display: flex; flex-direction: column; gap: 6px; min-height: 0; }\n.mwi-r-gfiltres { display: flex; flex-wrap: wrap; gap: 6px; }\n.mwi-r-gfiltres .mwi-r-select { flex: 1 1 120px; min-width: 0; }\n.mwi-r-gitems { flex: 1; min-height: 0; overflow-y: auto; margin: 0; padding: 0 4px 0 0; list-style: none; display: flex; flex-direction: column; gap: 4px; }\n.mwi-r-gitems li {\n    display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px 8px; padding: 6px 10px; cursor: pointer;\n    background: var(--r-panel); border: 1px solid var(--r-border); border-left: 3px solid var(--r-border); border-radius: 6px;\n    transition: border-color .15s, background .15s;\n}\n.mwi-r-gitems li:hover { background: var(--r-panel-2); border-color: var(--r-accent); }\n.mwi-r-gitems li.active { background: var(--r-panel-2); border-color: var(--r-accent); border-left-color: var(--r-accent); }\n.mwi-r-gitems li.moi { border-left-color: var(--r-gold); }\n.mwi-r-gitems li.moi .nom { color: var(--r-gold); }\n.mwi-r-gitems li.vide { cursor: default; font-style: italic; color: var(--r-muted); }\n.mwi-r-gitems .nom { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 700; }\n.mwi-r-gitems .rk { font-size: 11px; font-weight: 700; color: var(--r-gold); white-space: nowrap; }\n.mwi-r-gitems .info { grid-column: 1 / -1; font-size: 11px; color: var(--r-muted); }\n.mwi-r-gdetail { min-height: 0; overflow-y: auto; padding-right: 4px; }\n.mwi-r-gitems::-webkit-scrollbar, .mwi-r-gdetail::-webkit-scrollbar { width: 8px; }\n.mwi-r-gitems::-webkit-scrollbar-thumb, .mwi-r-gdetail::-webkit-scrollbar-thumb { background: var(--r-border); border-radius: 4px; }\n.mwi-r-gdhead { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }\n.mwi-r-gdhead h3 { margin: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 16px; color: var(--r-gold); }\n.mwi-r-gmoi { padding: 1px 8px; font-size: 11px; font-weight: 700; color: var(--r-bg); background: var(--r-gold); border-radius: 10px; white-space: nowrap; }\n.mwi-r-gdetail .mwi-r-kpis { margin-bottom: 4px; }\n.mwi-r-gmembres th[data-action] { cursor: pointer; }\n.mwi-r-gmembres tbody tr, .mwi-r-gtable tr[data-action] { cursor: pointer; }\n@container mwi-gview (min-width: 720px) {\n    .mwi-r-gcons { grid-template-columns: minmax(240px, 300px) minmax(0, 1fr); }\n    .mwi-r-gcons[data-sel=\"1\"] .mwi-r-glist { display: flex; }\n    .mwi-r-gcons:not([data-sel=\"1\"]) .mwi-r-gdetail { display: block; }\n    .mwi-r-gretour { display: none; }\n}\n\n/* Statistiques : chiffres clés, nouveaux joueurs par jour, listes à jauges */\n.mwi-r-sview { display: none; flex: 1; min-height: 0; flex-direction: column; gap: 8px; }\n#mwi-tracker-modal[data-view=\"stats\"] .mwi-r-sview { display: flex; }\n.mwi-r-speriode { display: flex; gap: 2px; padding: 2px; background: var(--r-panel); border: 1px solid var(--r-border); border-radius: 6px; }\n.mwi-r-speriode button { padding: 2px 8px; font-size: 11px; font-weight: 700; cursor: pointer; color: var(--r-muted); background: none; border: 1px solid transparent; border-radius: 4px; }\n.mwi-r-speriode button.active { color: var(--r-accent); background: var(--r-panel-2); border-color: var(--r-accent); }\n.mwi-r-kpis { display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr)); gap: 8px; margin-bottom: 12px; }\n.mwi-r-kpi { padding: 8px 10px; background: var(--r-panel); border: 1px solid var(--r-border); border-radius: 8px; }\n.mwi-r-kpi b { display: block; font-size: 20px; line-height: 1.2; color: var(--r-text); font-variant-numeric: tabular-nums; }\n.mwi-r-kpi span { font-size: 11px; color: var(--r-muted); }\n.mwi-r-kpi.free b { color: var(--r-ok); }\n.mwi-r-sgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }\n.mwi-r-scard {\n    min-width: 0; padding: 10px 12px;\n    background: linear-gradient(180deg, var(--r-panel-2), var(--r-panel) 46px);\n    border: 1px solid var(--r-border); border-top: 2px solid var(--r-accent); border-radius: 8px;\n}\n.mwi-r-scard.large { grid-column: 1 / -1; }\n.mwi-r-scard h4 { margin: 0 0 8px; font-size: 12px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; color: var(--r-gold); }\n.mwi-r-scard h4 small { margin-left: 6px; font-weight: 400; letter-spacing: 0; text-transform: none; color: var(--r-muted); }\n.mwi-r-legende { display: flex; flex-wrap: wrap; gap: 4px 12px; margin-bottom: 6px; font-size: 11px; color: var(--r-muted); }\n.mwi-r-legende i { display: inline-block; width: 10px; height: 10px; margin-right: 4px; vertical-align: -1px; border-radius: 2px; }\n/* Histogramme : une colonne par jour, segments empilés séparés par 2px */\n.mwi-r-histo { display: flex; align-items: flex-end; gap: 2px; height: 130px; padding-top: 16px; border-bottom: 1px solid var(--r-border); }\n.mwi-r-hcol { position: relative; flex: 1; min-width: 3px; height: 100%; display: flex; flex-direction: column-reverse; gap: 2px; cursor: default; }\n.mwi-r-hcol:hover { background: rgba(255,255,255,.04); }\n.mwi-r-hcol > div { flex-shrink: 0; }\n.mwi-r-hcol > div:last-of-type { border-radius: 3px 3px 0 0; }\n.mwi-r-hcol em { position: absolute; left: 50%; transform: translateX(-50%); font-style: normal; font-size: 10px; color: var(--r-text); white-space: nowrap; }\n.mwi-r-hjours { display: flex; gap: 2px; margin-top: 3px; font-size: 10px; color: var(--r-muted); }\n.mwi-r-hjours span { flex: 1; min-width: 3px; text-align: center; overflow: visible; white-space: nowrap; }\n.s-free { background: var(--r-ok); }\n.s-guild { background: var(--r-gold); }\n.s-autre { background: var(--r-muted); }\n.s-verif { background: var(--r-accent); }\n/* Listes à jauge : libellé, nombre, part des sans guilde */\n.mwi-r-blist { display: flex; flex-direction: column; gap: 6px; margin: 0; padding: 0; list-style: none; font-size: 12px; }\n.mwi-r-blist li { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px 8px; }\n.mwi-r-blist li[data-action] { cursor: pointer; }\n.mwi-r-blist li[data-action]:hover .nom { color: var(--r-accent); }\n.mwi-r-blist .nom { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--r-text); }\n.mwi-r-blist .val { text-align: right; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--r-text); }\n.mwi-r-blist .val small { margin-left: 4px; font-weight: 400; color: var(--r-muted); }\n.mwi-r-blist .jauge { grid-column: 1 / -1; display: flex; gap: 2px; height: 6px; background: var(--r-bg); border-radius: 3px; overflow: hidden; }\n.mwi-r-blist .jauge > div { height: 100%; }\n.mwi-r-blist .jauge > div:last-child { border-radius: 0 3px 3px 0; }\n\n.mwi-r-empty { padding: 18px 8px; text-align: center; font-style: italic; color: var(--r-muted); background: var(--r-panel); border: 1px dashed var(--r-border); border-radius: 6px; }\n\n.mwi-r-progress { height: 4px; background: var(--r-panel); border-radius: 2px; overflow: hidden; display: none; }\n.mwi-r-progress > div { height: 100%; width: 0; background: var(--r-accent); transition: width .2s; }\n\n.mwi-r-actions { display: flex; gap: 8px; }\n.mwi-r-actions { flex-wrap: wrap; }\n.mwi-r-actions .mwi-r-btn { flex: 1 1 0; white-space: nowrap; }\n.mwi-r-btn.actif { color: #fff; background: var(--r-gold); border-color: var(--r-gold); color: var(--r-bg); }\n\n.mwi-r-foot { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 11px; color: var(--r-muted); }\n#mwi-status.ok { color: var(--r-ok); }\n#mwi-status.warn { color: var(--r-warn); }\n#mwi-status.err { color: var(--r-err); }\n\n#mwi-radar-launcher {\n    position: fixed; bottom: 16px; right: 16px; z-index: 99998; display: none;\n    width: 44px; height: 44px; align-items: center; justify-content: center;\n    font-size: 20px; cursor: pointer; color: var(--r-accent);\n    background: var(--r-panel); border: 1px solid var(--r-border);\n    border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,.5);\n}\n#mwi-radar-launcher:hover { border-color: var(--r-accent); background: var(--r-panel-2); }\n\n/* Voyant en ligne / hors ligne */\n.mwi-r-dot { display: inline-block; flex-shrink: 0; width: 8px; height: 8px; margin-right: 6px; vertical-align: middle; border-radius: 50%; background: var(--r-muted); opacity: .5; }\n.mwi-r-dot.on { background: var(--r-ok); opacity: 1; box-shadow: 0 0 6px var(--r-ok); }\n.mwi-r-dot.off { background: var(--r-err); opacity: .8; }\n.mwi-r-dot.masque { background: transparent; border: 1px solid var(--r-muted); }\n.mwi-r-zz { margin-right: 6px; font-size: 11px; flex-shrink: 0; }\n/* Boutons « En ligne » et « Activité » (dernier /profile) */\n.mwi-r-dispo { padding: 5px 10px; font-weight: 600; white-space: nowrap; }\n\n/* Recherche de joueur avec suggestions */\n.mwi-r-search { position: relative; flex: 1 1 160px; min-width: 140px; }\n.mwi-r-search .mwi-r-select { width: 100%; }\n.mwi-r-sugg {\n    display: none; position: absolute; top: calc(100% + 2px); left: 0; right: 0; z-index: 5;\n    max-height: 260px; overflow-y: auto; margin: 0; padding: 4px 0; list-style: none;\n    background: var(--r-panel); border: 1px solid var(--r-accent); border-radius: 6px;\n    box-shadow: 0 6px 16px rgba(0,0,0,.6); min-width: 220px;\n}\n.mwi-r-sugg.open { display: block; }\n.mwi-r-sugg li { display: flex; align-items: center; gap: 4px; padding: 5px 10px; font-size: 12px; cursor: pointer; white-space: nowrap; }\n.mwi-r-sugg li .nom { overflow: hidden; text-overflow: ellipsis; }\n.mwi-r-sugg li b { color: var(--r-accent); }\n.mwi-r-sugg li.actif, .mwi-r-sugg li:hover { background: var(--r-panel-2); }\n.mwi-r-sugg li.vide { cursor: default; font-style: italic; color: var(--r-muted); }\n.mwi-r-sugg-tag { margin-left: auto; padding-left: 8px; font-size: 11px; color: var(--r-muted); overflow: hidden; text-overflow: ellipsis; }\n.mwi-r-sugg-tag.free { color: var(--r-ok); }\n.mwi-r-sugg-tag.guild { color: var(--r-gold); }\n.mwi-r-sugg-tag.fail { color: var(--r-err); }\n"; // fabio-rh.css, inséré par tools/integrer-css.py

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
    function setVisible(show) {
        const modal = document.getElementById('mwi-tracker-modal');
        const launcher = document.getElementById('mwi-radar-launcher');
        if (modal) modal.style.display = show ? 'flex' : 'none';
        if (launcher) launcher.style.display = show ? 'none' : 'flex';
        saveUI({ visible: show });
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
                    <button class="mwi-r-icon mwi-r-db" id="mwi-db" data-etat="off" title="Base">☁</button>
                    <button class="mwi-r-icon" id="mwi-btn-min" title="Réduire">–</button>
                    <button class="mwi-r-icon" id="mwi-btn-max" title="Agrandir">□</button>
                    <button class="mwi-r-icon close" id="mwi-btn-close" title="Fermer">✕</button>
                </div>
            </div>
            <div class="mwi-r-body">
                <form class="mwi-r-dbpanel" id="mwi-db-panel" hidden>
                    <span class="mwi-r-dbtitre">Base Fabio RH</span>
                    <input type="email" class="mwi-r-select" id="mwi-db-email" placeholder="E-mail" autocomplete="username">
                    <input type="password" class="mwi-r-select" id="mwi-db-pass" placeholder="Mot de passe" autocomplete="current-password">
                    <button type="submit" class="mwi-r-btn primary" id="mwi-db-login">Connexion</button>
                    <span class="mwi-r-dbinfo" id="mwi-db-info"></span>
                    <button type="button" class="mwi-r-btn" id="mwi-db-sync" title="Renvoyer les scans et vérifications en attente">Envoyer</button>
                    <button type="button" class="mwi-r-btn" id="mwi-db-logout">Déconnexion</button>
                </form>
                <div class="mwi-r-toolbar">
                    <div class="mwi-r-search">
                        <input type="text" class="mwi-r-select" id="mwi-search" placeholder="🔍 Rechercher un joueur" autocomplete="off" spellcheck="false">
                        <ul class="mwi-r-sugg" id="mwi-search-list" role="listbox"></ul>
                    </div>
                    <div class="mwi-r-tools">
                        <button class="mwi-r-icon" id="mwi-btn-guilds" title="Guildes : comparer notre guilde aux autres">🛡</button>
                        <button class="mwi-r-icon" id="mwi-btn-stats" title="Statistiques : nouveaux joueurs par jour, sources, canaux...">📊</button>
                        <button class="mwi-r-icon" id="mwi-btn-copy" title="Copier les pseudos affichés">⧉</button>
                        <button class="mwi-r-icon" id="mwi-btn-clear" title="Vider la liste">🗑</button>
                    </div>
                </div>
                <div class="mwi-r-filters">
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
                    <button class="mwi-r-btn mwi-r-dispo" id="mwi-btn-enligne" title="Statut au dernier /profile : tous, puis en ligne, puis hors ligne">⚪ En ligne</button>
                    <button class="mwi-r-btn mwi-r-dispo" id="mwi-btn-activite" title="Activité au dernier /profile : tous, puis ceux qui font quelque chose, puis ceux qui ne font rien">Activité</button>
                    <div class="mwi-r-sizes" id="mwi-size" title="Taille des cases">
                        <button class="mwi-r-icon" data-size="large" title="Grandes cases : toutes les infos"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1" y="1" width="14" height="6" rx="1"/><rect x="1" y="9" width="14" height="6" rx="1"/></svg></button>
                        <button class="mwi-r-icon" data-size="medium" title="Cases moyennes"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1" y="1" width="14" height="4" rx="1"/><rect x="1" y="6" width="14" height="4" rx="1"/><rect x="1" y="11" width="14" height="4" rx="1"/></svg></button>
                        <button class="mwi-r-icon" data-size="small" title="Petites cases : nom seul"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1" y="1" width="14" height="2" rx="1"/><rect x="1" y="4" width="14" height="2" rx="1"/><rect x="1" y="7" width="14" height="2" rx="1"/><rect x="1" y="10" width="14" height="2" rx="1"/><rect x="1" y="13" width="14" height="2" rx="1"/></svg></button>
                    </div>
                </div>
                <div class="mwi-r-main">
                    <nav class="mwi-r-skills" id="mwi-skills"></nav>
                    <ul class="mwi-r-list" id="mwi-tracker-list"></ul>
                </div>
                <div class="mwi-r-pview" id="mwi-profile-view"></div>
                <div class="mwi-r-gview" id="mwi-guild-view"></div>
                <div class="mwi-r-sview" id="mwi-stats-view"></div>
                <div class="mwi-r-progress" id="mwi-progress"><div id="mwi-progress-bar"></div></div>
                <div class="mwi-r-actions">
                    <button class="mwi-r-btn" id="mwi-btn-scan" title="Lit une fois chaque onglet de chat coché">1. Scanner le chat</button>
                    <button class="mwi-r-btn" id="mwi-btn-lb" title="Surveille le leaderboard : ouvre les classements un par un, puis arrête">🏆 Leaderboard</button>
                    <button class="mwi-r-btn primary" id="mwi-btn-process" title="Prépare /profile dans le chat pour chaque joueur : appuie sur Entrée pour chacun">2. Vérifier Profils</button>
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
        document.getElementById('mwi-btn-lb').addEventListener('click', mwiScanLeaderboard);
        document.getElementById('mwi-btn-process').addEventListener('click', processUnverifiedProfiles);
        document.getElementById('mwi-btn-close').addEventListener('click', () => setVisible(false));
        launcher.addEventListener('click', () => setVisible(true));
        // Clic sur la case : ouvre la fiche dans la modale (le bouton Profile du jeu est dans la fiche)
        document.getElementById('mwi-tracker-list').addEventListener('click', e => {
            const card = e.target.closest('.mwi-r-card[data-player]');
            if (card) openProfileView(card.dataset.player);
        });
        document.getElementById('mwi-profile-view').addEventListener('click', e => {
            const t = e.target.closest('[data-action]');
            if (!t) return;
            if (t.dataset.action === 'back') closeProfileView();
            else if (t.dataset.action === 'game') openGameProfile(t.dataset.player);
            else if (t.dataset.action === 'recruter') {
                recruterOuvert = !recruterOuvert;
                if (recruterOuvert && !recrutTexte) choisirRecrutement(currentProfile, recrutChoix); else renderProfileView();
            }
            else if (t.dataset.action === 'rchoix') choisirRecrutement(t.dataset.player, +t.dataset.index);
            else if (t.dataset.action === 'rlangue') { recrutLangue = t.dataset.langue; saveUI({ recrutLangue }); choisirRecrutement(currentProfile, recrutChoix); }
            else if (t.dataset.action === 'rpreparer') preparerRecrutement(t.dataset.player);
            else if (t.dataset.action === 'section') { currentSection = +t.dataset.index; renderProfileView(); }
        });
        // Message de recrutement modifié à la main : Entrée le prépare dans le chat (Maj+Entrée ne fait rien de plus)
        const profileView = document.getElementById('mwi-profile-view');
        profileView.addEventListener('input', e => {
            if (e.target.id !== 'mwi-recrut-texte') return;
            recrutTexte = e.target.value;
            document.getElementById('mwi-recrut-nb').textContent = recrutTexte.length;
        });
        profileView.addEventListener('keydown', e => {
            if (e.target.id !== 'mwi-recrut-texte') return;
            e.stopPropagation(); // les touches ne partent pas vers le jeu
            if (e.key === 'Enter') { e.preventDefault(); if (!e.shiftKey) preparerRecrutement(currentProfile); }
        });
        document.getElementById('mwi-btn-guilds').addEventListener('click', () => {
            currentProfile = null;
            modal.dataset.view = 'guilds';
            renderGuildView();
        });
        const guildView = document.getElementById('mwi-guild-view');
        guildView.addEventListener('click', e => {
            const t = e.target.closest('[data-action]');
            if (!t) return;
            const a = t.dataset.action;
            if (a === 'back') { modal.dataset.view = 'list'; updateModalUI(); }
            else if (a === 'gsort') { guildSort = t.dataset.cat; renderGuildView(); }
            else if (a === 'gtab') { guildOnglet = t.dataset.onglet; saveUI({ guildOnglet }); renderGuildView(); }
            else if (a === 'gsel') ouvrirGuilde(t.dataset.guilde);
            else if (a === 'gdeselect') { guildSel = null; renderGuildView(); }
            else if (a === 'msort') { membresTri = t.dataset.cle; renderGuildView(); }
            else if (a === 'gjoueur') openProfileView(t.dataset.player, 'guilds');
        });
        // Recherche et tri des guildes : seule la liste est redessinée (le champ garde le focus)
        guildView.addEventListener('input', e => {
            if (e.target.id !== 'mwi-gsearch') return;
            guildRecherche = e.target.value;
            document.getElementById('mwi-gliste').innerHTML = guildListeHtml();
        });
        guildView.addEventListener('change', e => {
            if (e.target.id !== 'mwi-gtri') return;
            guildTri = e.target.value;
            document.getElementById('mwi-gliste').innerHTML = guildListeHtml();
        });
        guildView.addEventListener('keydown', e => { if (e.target.id === 'mwi-gsearch') e.stopPropagation(); }); // pas de touches vers le jeu
        document.getElementById('mwi-btn-stats').addEventListener('click', () => {
            currentProfile = null;
            modal.dataset.view = 'stats';
            renderStatsView();
            dbStats(statsJours);
        });
        document.getElementById('mwi-stats-view').addEventListener('click', e => {
            const t = e.target.closest('[data-action]');
            if (!t) return;
            if (t.dataset.action === 'back') { modal.dataset.view = 'list'; updateModalUI(); }
            else if (t.dataset.action === 'periode') { statsJours = +t.dataset.jours; saveUI({ statsJours }); dbStats(statsJours); }
            else if (t.dataset.action === 'refresh') dbStats(statsJours);
            else if (t.dataset.action === 'guilde') ouvrirGuilde(t.dataset.guilde);
            else if (t.dataset.action === 'skill') {
                // Liste des sans guilde de ce skill
                currentFilter = 'free';
                document.getElementById('mwi-filter').value = 'free';
                currentSkill = t.dataset.skill;
                saveUI({ skillSort: currentSkill });
                modal.dataset.view = 'list';
                updateModalUI();
            }
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
        modeSelect.addEventListener('change', (e) => {
            currentMode = e.target.value;
            saveUI({ modeFilter: currentMode });
            updateModalUI();
        });
        // Barre des skills : un clic affiche les joueurs du skill, un second clic revient à tous les joueurs
        currentSkill = saved.skillSort === 'combat_level' || SKILLS.includes(saved.skillSort) ? saved.skillSort : '';
        document.getElementById('mwi-skills').addEventListener('click', e => {
            const b = e.target.closest('[data-skill]');
            if (!b) return;
            currentSkill = b.dataset.skill === currentSkill ? '' : b.dataset.skill;
            saveUI({ skillSort: currentSkill });
            document.getElementById('mwi-tracker-list').scrollTop = 0;
            updateModalUI();
        });
        // Filtres « En ligne » (tous → en ligne → hors ligne) et « Activité » (tous → fait quelque chose → ne fait rien), au dernier /profile
        const enLigneBtn = document.getElementById('mwi-btn-enligne'), activiteBtn = document.getElementById('mwi-btn-activite');
        filtreEnLigne = saved.filtreEnLigne === true ? 'on' : saved.filtreEnLigne in EN_LIGNE ? saved.filtreEnLigne : '';
        filtreActivite = saved.filtreActivite in ACTIVITES ? saved.filtreActivite : '';
        const majFiltresEtat = () => {
            enLigneBtn.classList.toggle('actif', !!filtreEnLigne);
            enLigneBtn.textContent = EN_LIGNE[filtreEnLigne];
            activiteBtn.classList.toggle('actif', !!filtreActivite);
            activiteBtn.textContent = ACTIVITES[filtreActivite];
        };
        majFiltresEtat();
        enLigneBtn.addEventListener('click', () => {
            filtreEnLigne = { '': 'on', on: 'off', off: '' }[filtreEnLigne];
            saveUI({ filtreEnLigne });
            majFiltresEtat();
            updateModalUI();
        });
        activiteBtn.addEventListener('click', () => {
            filtreActivite = { '': 'occupe', occupe: 'rien', rien: '' }[filtreActivite];
            saveUI({ filtreActivite });
            majFiltresEtat();
            updateModalUI();
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
        document.getElementById('mwi-btn-copy').addEventListener('click', copyVisibleNames);
        enableSearch();
        document.getElementById('mwi-btn-clear').addEventListener('click', () => {
            if (isProcessing || isScanning) return;
            recrues.clear();
            setStatus('Liste vidée.', '');
            updateModalUI();
        });

        const dbPanel = document.getElementById('mwi-db-panel');
        document.getElementById('mwi-db').addEventListener('click', () => { dbPanel.hidden = !dbPanel.hidden; majBase(); });
        dbPanel.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('mwi-db-email'), pass = document.getElementById('mwi-db-pass');
            setStatus('Connexion à la base...', '');
            const erreur = await dbConnexion(email.value.trim(), pass.value);
            pass.value = '';
            setStatus(erreur ? `Connexion refusée : ${erreur}` : 'Connecté à la base.', erreur ? 'err' : 'ok');
            if (!erreur) dbPanel.hidden = true;
            majBase();
        });
        document.getElementById('mwi-db-sync').addEventListener('click', dbVider);
        document.getElementById('mwi-db-logout').addEventListener('click', dbDeconnexion);
        majBase();
        dbVider(); // envois restés en attente à la dernière session
        dbCharger(); // joueurs et guildes enregistrés lors des sessions précédentes

        enableDrag(modal, document.getElementById('mwi-r-head'));
        enableResize(modal);
        updateModalUI();
    }

    let currentProfile = null;
    let currentSection = 0;

    // Bouton Recruter de la fiche : trois messages au choix, envoyés en message privé au joueur.
    // Le script les écrit dans le chat (commande COMMANDE_MP), le joueur appuie sur Entrée.
    const COMMANDE_MP = '/w';
    // Ce que les messages reprennent du profil : niveaux, meilleur skill, métier équipé, guilde actuelle
    // et classements de guildes où nous sommes devant la sienne
    function contexteRecrutement(p) {
        const brut = profilsBruts.get(p.nom);
        const guilde = (brut && brut.guildName) || guildeDe(p);
        const moi = guildes.get(MA_GUILDE), g = guilde ? guildes.get(guilde) : null;
        const cats = moi ? Object.keys(moi.stats).filter(c => guildRang(moi, c) !== null).sort((x, y) => guildRang(moi, x) - guildRang(moi, y)) : [];
        // Guilde absente des classements lus : nous sommes devant partout où nous sommes dans le haut du classement
        const dernier = (c) => Math.max(0, ...Array.from(guildes.values()).filter(x => x !== moi && guildRang(x, c) !== null).map(x => guildRang(x, c)));
        const devant = !guilde ? [] : cats.filter(c => g && guildRang(g, c) !== null ? guildRang(moi, c) < guildRang(g, c) : guildRang(moi, c) <= dernier(c));
        return {
            nom: p.nom, total: statNum(p.stats.total), combat: statNum(p.stats.combat), ironcow: p.ironcow, guilde, devant,
            ms: meilleurSkill(p.niveaux), metier: meilleurMetier(p.niveaux, p.equipement),
            notreRang: cats.length ? { c: cats[0], r: guildRang(moi, cats[0]) } : null
        };
    }

    // Noms des skills dans le jeu en chinois, et du métier en français (« un vrai brasseur »)
    const SKILLS_ZH = { milking: '挤奶', foraging: '采摘', woodcutting: '伐木', cheesesmithing: '奶酪锻造', crafting: '制作', tailoring: '缝纫',
        cooking: '烹饪', brewing: '冲泡', alchemy: '炼金', enhancing: '强化', stamina: '耐力', intelligence: '智力', attack: '攻击',
        defense: '防御', melee: '近战', ranged: '远程', magic: '魔法' };
    const METIERS_FR = { milking: 'trayeur', foraging: 'cueilleur', woodcutting: 'bûcheron', cheesesmithing: 'fromager', crafting: 'artisan',
        tailoring: 'tailleur', cooking: 'cuisinier', brewing: 'brasseur', alchemy: 'alchimiste', enhancing: 'améliorateur' };
    // Liste « a, b and c » dans chaque langue
    const enumerer = (l, et) => l.length > 1 ? l.slice(0, -1).join(et === '、' ? '、' : ', ') + (et === '、' ? '、' : ` ${et} `) + l[l.length - 1] : l[0] || '';
    // Mots propres à chaque langue : nom d'un skill, équipement du métier, rang de la guilde
    const LANGUES = {
        en: { nom: 'English', skill: (k) => pretty(k), et: 'and',
            eq: { celeste: (p) => `a celestial tool${p ? ' +' + p : ''}`, tenue: 'the full outfit', haut: 'the top', bas: 'the bottoms', charme: (c) => `a ${c} charm` },
            rang: (r) => ` (#${r.r} in ${r.c})` },
        fr: { nom: 'Français', skill: (k) => pretty(k), et: 'et',
            eq: { celeste: (p) => `un outil celestial${p ? ' +' + p : ''}`, tenue: 'la tenue complète', haut: 'le haut', bas: 'le bas', charme: (c) => `un charme ${c}` },
            rang: (r) => ` (#${r.r} en ${r.c})` },
        zh: { nom: '中文', skill: (k) => SKILLS_ZH[k] || pretty(k), et: '、',
            eq: { celeste: (p) => `天界工具${p ? ' +' + p : ''}`, tenue: '全套职业服装', haut: '职业上衣', bas: '职业裤子', charme: (c) => `${c} 护符` },
            rang: (r) => `（${r.c} 排名第 ${r.r}）` }
    };
    function equipementTexte(e, langue) {
        const m = LANGUES[langue].eq, it = [];
        if (e.celeste) it.push(m.celeste(e.plus));
        if (e.haut && e.bas) it.push(m.tenue);
        else if (e.haut || e.bas) it.push(e.haut ? m.haut : m.bas);
        if (e.charme) it.push(m.charme(e.charme));
        return enumerer(it, LANGUES[langue].et);
    }

    // Trois messages par langue : profil (niveaux), spécialité (métier équipé ou combat), guilde (classements ou sans guilde)
    const MESSAGES_RECRUTEMENT = [
        { titre: 'Profil', texte: {
            en: (c, s) => `Hi ${c.nom}! ${c.total ? `Total level ${c.total}` : 'Nice profile'}${c.ms ? ` with ${s(c.ms.skill)} ${c.ms.niveau}` : ''}`
                + `${c.combat ? ` and combat ${c.combat}` : ''}${c.total ? ', impressive!' : '!'} ${MA_GUILDE} is recruiting${c.ironcow ? ' Ironcow players' : ''}, want to join us?`,
            fr: (c, s) => `Salut ${c.nom} ! ${c.total ? `Niveau total ${c.total}` : 'Beau profil'}${c.ms ? ` avec ${s(c.ms.skill)} ${c.ms.niveau}` : ''}`
                + `${c.combat ? ` et combat ${c.combat}` : ''}${c.total ? ', impressionnant !' : ' !'} ${MA_GUILDE} recrute${c.ironcow ? ' des joueurs Ironcow' : ''}, ça te dirait de nous rejoindre ?`,
            zh: (c, s) => `你好 ${c.nom}！${c.total ? `总等级 ${c.total}` : '你的资料很棒'}${c.ms ? `，${s(c.ms.skill)} ${c.ms.niveau}` : ''}`
                + `${c.combat ? `，战斗等级 ${c.combat}` : ''}${c.total ? '，很厉害！' : '！'}${MA_GUILDE} 正在招募${c.ironcow ? '铁牛玩家' : '成员'}，有兴趣加入我们吗？`
        } },
        { titre: 'Spécialité', texte: {
            // Métier équipé, sinon combattant, sinon meilleur skill
            en: (c, s, eq) => c.metier ? `Hey ${c.nom}, ${s(c.metier.skill)} ${c.metier.niveau}${eq ? ` with ${eq}` : ''}: a real ${TENUES[c.metier.skill].replace(/s$/, '')}! `
                    + `${MA_GUILDE} needs players like you, interested?`
                : c.combat && (!c.ms || SKILLS_COMBAT.includes(c.ms.skill)) ? `Hey ${c.nom}, combat level ${c.combat}${c.ms ? ` and ${s(c.ms.skill)} ${c.ms.niveau}` : ''}, `
                    + `that's a strong fighter! ${MA_GUILDE} is recruiting, want to join us?`
                : `Hey ${c.nom}, ${c.ms ? `${s(c.ms.skill)} ${c.ms.niveau}, nice!` : 'nice profile!'} ${MA_GUILDE} is looking for players like you. Interested?`,
            fr: (c, s, eq) => c.metier ? `Hey ${c.nom}, ${s(c.metier.skill)} ${c.metier.niveau}${eq ? ` avec ${eq}` : ''} : un vrai ${METIERS_FR[c.metier.skill]} ! `
                    + `${MA_GUILDE} cherche des joueurs comme toi, intéressé ?`
                : c.combat && (!c.ms || SKILLS_COMBAT.includes(c.ms.skill)) ? `Hey ${c.nom}, niveau de combat ${c.combat}${c.ms ? ` et ${s(c.ms.skill)} ${c.ms.niveau}` : ''}, `
                    + `sacré combattant ! ${MA_GUILDE} recrute, ça te tente ?`
                : `Hey ${c.nom}, ${c.ms ? `${s(c.ms.skill)} ${c.ms.niveau}, joli !` : 'beau profil !'} ${MA_GUILDE} cherche des joueurs comme toi. Intéressé ?`,
            zh: (c, s, eq) => c.metier ? `嗨 ${c.nom}，${s(c.metier.skill)} ${c.metier.niveau}${eq ? `，装备${eq}` : ''}，真正的${s(c.metier.skill)}高手！`
                    + `${MA_GUILDE} 需要像你这样的玩家，有兴趣吗？`
                : c.combat && (!c.ms || SKILLS_COMBAT.includes(c.ms.skill)) ? `嗨 ${c.nom}，战斗等级 ${c.combat}${c.ms ? `，${s(c.ms.skill)} ${c.ms.niveau}` : ''}，`
                    + `很强的战士！${MA_GUILDE} 正在招募，想加入吗？`
                : `嗨 ${c.nom}，${c.ms ? `${s(c.ms.skill)} ${c.ms.niveau}，不错！` : '资料很棒！'}${MA_GUILDE} 在寻找像你这样的玩家，有兴趣吗？`
        } },
        { titre: 'Guilde', texte: {
            en: (c, s, eq, rang) => c.guilde && c.devant.length ? `Hi ${c.nom}! ${MA_GUILDE} is ahead of ${c.guilde} in ${c.devant.slice(0, 2).join(' and ')}`
                    + `${c.devant.length > 2 ? ` (+${c.devant.length - 2} more rankings)` : ''}. Fancy a change? Whisper me!`
                : c.guilde ? `Hi ${c.nom}! If you ever want a change from ${c.guilde}, ${MA_GUILDE} is recruiting active players. Whisper me!`
                : `Hi ${c.nom}! You don't have a guild yet: ${MA_GUILDE}${rang} is recruiting and we help each other progress. Want to join?`,
            fr: (c, s, eq, rang) => c.guilde && c.devant.length ? `Salut ${c.nom} ! ${MA_GUILDE} est devant ${c.guilde} en ${c.devant.slice(0, 2).join(' et ')}`
                    + `${c.devant.length > 2 ? ` (+${c.devant.length - 2} autres classements)` : ''}. Envie de changer ? Écris-moi !`
                : c.guilde ? `Salut ${c.nom} ! Si un jour tu veux quitter ${c.guilde}, ${MA_GUILDE} recrute des joueurs actifs. Écris-moi !`
                : `Salut ${c.nom} ! Tu n'as pas encore de guilde : ${MA_GUILDE}${rang} recrute et on s'entraide pour progresser. Ça te dirait ?`,
            zh: (c, s, eq, rang) => c.guilde && c.devant.length ? `你好 ${c.nom}！${MA_GUILDE} 在 ${c.devant.slice(0, 2).join('和')} 排名领先 ${c.guilde}`
                    + `${c.devant.length > 2 ? `（还有 ${c.devant.length - 2} 个排行榜）` : ''}。想换个公会吗？私聊我！`
                : c.guilde ? `你好 ${c.nom}！如果你想离开 ${c.guilde}，${MA_GUILDE} 正在招募活跃玩家。私聊我！`
                : `你好 ${c.nom}！你还没有公会：${MA_GUILDE}${rang} 正在招募，我们互相帮助一起进步。想加入吗？`
        } }
    ];
    const messageRecrutement = (p, i, langue) => {
        const c = contexteRecrutement(p), L = LANGUES[langue];
        return MESSAGES_RECRUTEMENT[i].texte[langue](c, L.skill, c.metier ? equipementTexte(c.metier.eq, langue) : '', c.notreRang ? L.rang(c.notreRang) : '');
    };

    // Panneau Recruter : langue, message choisi (modifiable à la main avant de le préparer dans le chat)
    let recruterOuvert = false, recrutChoix = 0, recrutTexte = '';
    let recrutLangue = loadUI().recrutLangue in LANGUES ? loadUI().recrutLangue : 'en';
    function choisirRecrutement(username, i) {
        recrutChoix = i;
        recrutTexte = messageRecrutement(recrues.get(username), i, recrutLangue);
        renderProfileView();
    }
    function preparerRecrutement(username) {
        const p = recrues.get(username);
        const texte = recrutTexte.replace(/\s+/g, ' ').trim(); // le chat n'a qu'une ligne
        if (!p || !texte) return;
        if (isProcessing) { setStatus('Vérification en cours : attends la fin ou arrête-la.', 'warn'); return; }
        recruterOuvert = false;
        renderProfileView();
        if (preremplirChat(`${COMMANDE_MP} ${p.nom} ${texte}`)) setStatus(`Message prêt : appuie sur Entrée dans le chat du jeu pour l'envoyer à ${p.nom}.`, 'ok');
        else setStatus('Champ de chat introuvable.', 'err');
    }
    function recrutementHtml(p) {
        return `<div class="mwi-r-recrut">
                <div class="mwi-r-recrut-tete">
                    <span class="mwi-r-recrut-titre">Message privé à ${esc(p.nom)}</span>
                    <div class="mwi-r-speriode">${Object.entries(LANGUES).map(([k, l]) =>
                        `<button data-action="rlangue" data-langue="${k}" class="${k === recrutLangue ? 'active' : ''}">${l.nom}</button>`).join('')}</div>
                </div>
                ${MESSAGES_RECRUTEMENT.map((m, i) => `<button class="mwi-r-msg${i === recrutChoix ? ' active' : ''}" data-action="rchoix" data-player="${esc(p.nom)}" data-index="${i}">
                    <b>${esc(m.titre)}</b><span>${esc(messageRecrutement(p, i, recrutLangue))}</span></button>`).join('')}
                <textarea class="mwi-r-select mwi-r-recrut-texte" id="mwi-recrut-texte" rows="3" spellcheck="false" title="Modifiable avant de le préparer dans le chat">${esc(recrutTexte)}</textarea>
                <div class="mwi-r-recrut-pied">
                    <span class="mwi-r-recrut-cmd">${esc(COMMANDE_MP)} ${esc(p.nom)} … · <span id="mwi-recrut-nb">${recrutTexte.length}</span> car.</span>
                    <button class="mwi-r-btn primary" data-action="rpreparer" data-player="${esc(p.nom)}" title="Écrit le message dans le chat du jeu : il reste à appuyer sur Entrée">Préparer dans le chat</button>
                </div>
            </div>`;
    }

    // Bouton Profile : prépare la commande dans le chat, le joueur l'envoie lui-même
    function openGameProfile(username) {
        if (isProcessing) { setStatus('Vérification en cours : attends la fin ou arrête-la.', 'warn'); return; }
        if (preremplirProfil(username)) setStatus(`Appuie sur Entrée dans le chat du jeu pour ouvrir le profil de ${username}.`, 'ok');
        else setStatus('Champ de chat introuvable.', 'err');
    }
    // Recherche de joueur : suggestions parmi les joueurs connus (début du pseudo d'abord),
    // flèches pour naviguer, Entrée ou clic pour ouvrir la fiche. Un pseudo inconnu est ajouté à la liste.
    function enableSearch() {
        const input = document.getElementById('mwi-search'), list = document.getElementById('mwi-search-list');
        let choix = [], actif = -1;
        const fermer = () => { list.innerHTML = ''; list.classList.remove('open'); choix = []; actif = -1; };
        const afficher = () => {
            const q = input.value.trim().toLowerCase();
            if (!q) return fermer();
            const noms = Array.from(recrues.values());
            choix = noms.filter(p => p.nom.toLowerCase().startsWith(q))
                .concat(noms.filter(p => !p.nom.toLowerCase().startsWith(q) && p.nom.toLowerCase().includes(q)))
                .slice(0, 12);
            actif = choix.length ? 0 : -1;
            const valide = /^[a-zA-Z0-9_-]{2,30}$/.test(input.value.trim());
            list.innerHTML = choix.map((p, i) => {
                const cat = playerCategory(p);
                const tag = { free: 'Sans guilde', guild: p.guilde, fail: 'Illisible', pending: p.perime ? 'À revérifier' : 'En attente' }[cat];
                const debut = p.nom.toLowerCase().indexOf(q);
                const nom = esc(p.nom.slice(0, debut)) + '<b>' + esc(p.nom.slice(debut, debut + q.length)) + '</b>' + esc(p.nom.slice(debut + q.length));
                return `<li class="${i === actif ? 'actif' : ''}" data-i="${i}" role="option">${voyant(p)}<span class="nom">${nom}</span>${p.ironcow ? ' 🐄' : ''}<span class="mwi-r-sugg-tag ${cat}">${esc(tag)}</span></li>`;
            }).join('') + (!choix.some(p => p.nom.toLowerCase() === q) && valide
                ? `<li class="${choix.length ? '' : 'actif'}" data-new="1" role="option">➕ Ajouter « ${esc(input.value.trim())} » et voir sa fiche</li>` : '')
                || '<li class="vide">Aucun joueur connu</li>';
            list.classList.add('open');
        };
        const ouvrir = (li) => {
            if (!li || li.classList.contains('vide')) return;
            let nom;
            if (li.dataset.new) {
                nom = input.value.trim();
                if (!recrues.has(nom)) recrues.set(nom, newRecruit(nom));
            } else nom = choix[+li.dataset.i].nom;
            input.value = '';
            fermer();
            input.blur();
            openProfileView(nom);
        };
        input.addEventListener('input', afficher);
        input.addEventListener('focus', afficher);
        input.addEventListener('keydown', e => {
            const items = Array.from(list.querySelectorAll('li:not(.vide)'));
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                if (!items.length) return;
                actif = (Math.max(actif, items.findIndex(li => li.classList.contains('actif'))) + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length;
                items.forEach((li, i) => li.classList.toggle('actif', i === actif));
                items[actif].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                e.preventDefault();
                ouvrir(list.querySelector('li.actif') || items[0]);
            } else if (e.key === 'Escape') { input.value = ''; fermer(); input.blur(); }
            e.stopPropagation(); // les touches ne partent pas vers le jeu
        });
        // mousedown plutôt que click : le choix est pris avant que le champ perde le focus
        list.addEventListener('mousedown', e => { e.preventDefault(); ouvrir(e.target.closest('li')); });
        input.addEventListener('blur', () => setTimeout(fermer, 100));
    }

    let profilRetour = 'list'; // vue affichée par « ← Retour » de la fiche joueur
    function openProfileView(username, retour = 'list') {
        if (currentProfile !== username) { recruterOuvert = false; recrutTexte = ''; }
        currentProfile = username;
        profilRetour = retour;
        currentSection = 0;
        document.getElementById('mwi-tracker-modal').dataset.view = 'profile';
        renderProfileView();
        const p = recrues.get(username);
        if (p && !p.verifie && estRh()) verifierUn(p);
        if (p && (p.verifie || p.perime)) dbFiche(p);
    }

    // Vérification d'un seul joueur à l'ouverture de sa fiche (sauf si un scan ou une vérification tourne déjà) :
    // la commande est préremplie, le joueur l'envoie ; quitter la fiche annule l'attente
    async function verifierUn(p) {
        if (isProcessing || isScanning || !estRh()) return;
        isProcessing = true;
        const btn = document.getElementById('mwi-btn-process');
        btn.disabled = true;
        majBoutonsScan();
        const spamWatch = startSpamWatch();
        let chatInput = null;
        try {
            const o = await limiteurProfils.executer(() => {
                chatInput = preremplirProfil(p.nom);
                if (!chatInput) return false;
                enAttente = p.nom;
                setStatus(`Appuie sur Entrée dans le chat du jeu pour vérifier ${p.nom}.`, '');
                if (currentProfile === p.nom) renderProfileView();
            }, () => attendreEnvoi(chatInput, p.nom, () => currentProfile === p.nom), p.nom, ok => ok !== false);
            if (o.impossible) setStatus('Champ de chat introuvable.', 'err');
            else if (o.res === null) setStatus(`Vérification de ${p.nom} annulée.`, '');
            else if (!o.res) { p.verifie = true; p.echec = true; dbVerification(p); setStatus(`Profil de ${p.nom} illisible.`, 'warn'); }
            else setStatus(`Profil de ${p.nom} vérifié.`, 'ok');
        } catch (e) {
            log('Erreur pendant la vérification :', e);
        } finally {
            spamWatch.disconnect();
            isProcessing = false;
            enAttente = null;
            btn.disabled = false;
            majBoutonsScan();
            updateModalUI();
        }
        // Fiche d'un autre joueur ouverte pendant l'attente : on prépare la sienne
        const autre = currentProfile && recrues.get(currentProfile);
        if (autre && autre !== p && !autre.verifie) verifierUn(autre);
    }
    function closeProfileView() {
        currentProfile = null;
        document.getElementById('mwi-tracker-modal').dataset.view = profilRetour;
        if (profilRetour === 'guilds') renderGuildView();
        else updateModalUI();
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
    const SKILLS_COMBAT = ['stamina', 'intelligence', 'attack', 'defense', 'melee', 'ranged', 'magic'];
    // Niveau de chaque skill d'un profil brut : { milking: 106, brewing: 135, ... } (sans total_level), null s'il n'y en a pas
    function niveauxProfil(brut) {
        const niveaux = {};
        ((brut && brut.characterSkills) || []).forEach(s => {
            const k = hridName(s.skillHrid);
            if (k && k !== 'total_level' && Number.isFinite(s.level)) niveaux[k] = s.level;
        });
        return Object.keys(niveaux).length ? niveaux : null;
    }
    // Skill où le joueur a le plus haut niveau (à égalité, le premier dans l'ordre du jeu) : { skill, niveau } ou null
    function meilleurSkill(niveaux) {
        let best = null;
        SKILLS.forEach(k => { const n = niveaux && niveaux[k]; if (Number.isFinite(n) && (!best || n > best.niveau)) best = { skill: k, niveau: n }; });
        return best;
    }
    // Tenue (haut + bas) de chaque métier dans le jeu : brewers_top, brewers_bottoms...
    const TENUES = { milking: 'dairyhands', foraging: 'foragers', woodcutting: 'lumberjacks', cheesesmithing: 'cheesemakers', crafting: 'crafters', tailoring: 'tailors', cooking: 'chefs', brewing: 'brewers', alchemy: 'alchemists', enhancing: 'enhancers' };
    // Équipement porté utile aux métiers : { brewing_tool: 'celestial_pot+8', body: 'brewers_top', legs: ..., charm: ... }, null si masqué
    function equipementProfil(brut) {
        if (!brut || brut.hideWearableItems) return null;
        const eq = {};
        Object.values(brut.wearableItemMap || {}).forEach(it => {
            const loc = hridName(it.itemLocationHrid);
            if (/_tool$/.test(loc) || ['body', 'legs', 'charm'].includes(loc)) eq[loc] = hridName(it.itemHrid) + (it.enhancementLevel > 0 ? '+' + it.enhancementLevel : '');
        });
        return Object.keys(eq).length ? eq : null;
    }
    // Équipement d'un métier : outil celestial (et son amélioration), haut et bas du métier, charme du métier.
    // score : 2 pour l'outil celestial, 1 par pièce de tenue, 1 pour le charme
    function equipementMetier(eq, skill) {
        const r = { celeste: false, plus: 0, haut: false, bas: false, charme: '', score: 0 };
        if (!eq || !TENUES[skill]) return r;
        const outil = /^celestial_[a-z_]+(?:\+(\d+))?$/.exec(eq[skill + '_tool'] || '');
        if (outil) { r.celeste = true; r.plus = +(outil[1] || 0); }
        r.haut = (eq.body || '').split('+')[0] === TENUES[skill] + '_top';
        r.bas = (eq.legs || '').split('+')[0] === TENUES[skill] + '_bottoms';
        const charme = new RegExp(`^([a-z]+)_${skill}_charm`).exec(eq.charm || '');
        if (charme) r.charme = charme[1];
        r.score = (r.celeste ? 2 : 0) + r.haut + r.bas + (r.charme ? 1 : 0);
        return r;
    }
    // Métier où le joueur produit le mieux : le mieux équipé, puis l'outil le plus amélioré, puis le plus haut niveau.
    // { skill, niveau, eq } ou null sans équipement de métier
    function meilleurMetier(niveaux, eq) {
        let best = null;
        Object.keys(TENUES).forEach(k => {
            const e = equipementMetier(eq, k), n = (niveaux && niveaux[k]) || 0;
            if (!e.score) return;
            if (!best || (e.score - best.eq.score || e.plus - best.eq.plus || n - best.niveau) > 0) best = { skill: k, niveau: n, eq: e };
        });
        return best;
    }
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
        const statut = { free: 'Sans guilde', guild: 'En guilde', fail: 'Profil illisible', pending: p.perime ? 'À revérifier' : 'En attente' }[cat];
        const nameStyle = p.color ? `color: ${p.color};` : '';
        const brut = profilsBruts.get(p.nom);
        const recrutable = ((brut && brut.guildName) || guildeDe(p)) !== MA_GUILDE;

        const resume = `<dl class="mwi-r-pgrid">
                <dt>Statut</dt><dd class="mwi-r-pstat ${cat}">${statut}</dd>
                <dt>Mode</dt><dd>${p.ironcow ? '🐄 Ironcow' : 'Standard'}</dd>
                ${cat === 'guild' ? `<dt>Guilde</dt><dd>${esc(p.guilde)}</dd><dt>Rang</dt><dd>${esc(p.rang)}</dd>` : ''}
                ${p.perime && p.guilde ? `<dt>Guilde (ancienne)</dt><dd>${esc(p.rang)} of ${esc(p.guilde)}</dd>` : ''}
                ${p.derniereVerif ? `<dt>Vérifié</dt><dd>${dateVerif(p)}</dd>` : ''}
                ${p.profil || brut ? '' : statsDl(p)}
            </dl>${guildCompareHtml((brut && brut.guildName) || (cat === 'guild' ? p.guilde : ''))}`;
        const dom = (p.profil && p.profil.sections) || [];
        const sections = [{ titre: 'Résumé', html: resume }].concat(
            brut ? sectionsFromData(brut, p, dom) : dom.map(s => ({ titre: s.titre, html: domSectionHtml(s) })));
        if (currentSection >= sections.length) currentSection = 0;
        const hint = p.profil || brut ? '' : `<p class="mwi-r-pempty">${p.verifie
            ? 'Détails non récupérés pour ce joueur : relance la vérification.'
            : enAttente === p.nom ? 'Commande /profile prête dans le chat du jeu : appuie sur Entrée pour récupérer toutes les infos.'
            : isProcessing ? 'Vérification du profil en cours...'
            : !estRh() ? 'Profil pas encore vérifié par un RH.'
            : 'Profil pas encore vérifié : clique sur « 2. Vérifier Profils » pour récupérer toutes les infos.'}</p>`;

        // Toutes les sections sont dans la page : le CSS n'affiche que l'onglet actif en petite fenêtre,
        // et les répertorie toutes côte à côte (sans onglets) quand la modale est large
        const keys = sections.map((s, i) => i === 0 ? 'resume' : /skill/i.test(s.titre) ? 'skills'
            : /overview/i.test(s.titre) ? 'overview' : /equip/i.test(s.titre) ? 'equipment' : 'autre');
        const scroll = view.querySelector('.mwi-r-pbody')?.scrollTop || 0;
        const saisie = document.activeElement && document.activeElement.id === 'mwi-recrut-texte' ? document.activeElement.selectionStart : null;
        view.innerHTML = `
            <div class="mwi-r-phead">
                <button class="mwi-r-btn" data-action="back" title="Retour à la liste">← Retour</button>
                <span class="mwi-r-pname" style="${nameStyle}">${voyant(p)}${esc(p.nom)}${p.ironcow ? ' <span class="mwi-r-iron">🐄</span>' : ''}</span>
                ${recrutable ? `<button class="mwi-r-btn mwi-r-recruter${recruterOuvert ? ' actif' : ''}" data-action="recruter" title="Choisir un message de recrutement à envoyer en privé">✉ Recruter</button>` : ''}
                <button class="mwi-r-profile" data-action="game" data-player="${esc(p.nom)}" title="Ouvrir le profil dans le jeu">Profile</button>
            </div>
            ${recrutable && recruterOuvert ? recrutementHtml(p) : ''}
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
        const zone = document.getElementById('mwi-recrut-texte');
        if (zone && saisie !== null) { zone.focus(); zone.setSelectionRange(saisie, saisie); }
    }

    // --- Guildes : consultation (chaque guilde et ses joueurs) et classements du leaderboard ---
    let guildSort = null; // classement utilisé pour trier le tableau des classements
    let guildOnglet = loadUI().guildOnglet === 'classements' ? 'classements' : 'consult';
    let guildSel = null, guildTri = 'membres', guildRecherche = '', membresTri = 'role';
    const RANGS = ['Leader', 'General', 'Officer', 'Member'];
    // Rang d'une guilde dans un classement (null si absente)
    const guildRang = (g, c) => g && g.stats[c] && isFinite(g.stats[c].rang) ? g.stats[c].rang : null;
    // Valeur principale d'un classement : la première colonne après le nom (Level, Points...)
    const guildCol = (c) => { const g = Array.from(guildes.values()).find(x => x.stats[c]); return g ? Object.keys(g.stats[c].valeurs)[0] || '' : ''; };
    const guildVal = (g, c) => g && g.stats[c] ? (g.stats[c].valeurs[guildCol(c)] || '') : '';
    // Guilde d'un joueur d'après sa dernière vérification réussie (même s'il est à revérifier)
    const guildeDe = (p) => !p.echec && p.hasGuild && p.guilde ? p.guilde : '';
    const statNum = (v) => { const n = parseInt(v, 10); return Number.isFinite(n) ? n : null; };
    const moyenne = (l) => l.length ? Math.round(l.reduce((s, x) => s + x, 0) / l.length) : null;
    const guildCats = () => { const cats = []; guildes.forEach(g => Object.keys(g.stats).forEach(c => { if (!cats.includes(c)) cats.push(c); })); return cats; };

    // Toutes les guildes connues : celles des joueurs vérifiés et celles lues dans les classements
    function listeGuildes() {
        const m = new Map();
        const get = (nom) => m.get(nom) || m.set(nom, { nom, membres: [] }).get(nom);
        recrues.forEach(p => { const g = guildeDe(p); if (g) get(g).membres.push(p); });
        guildes.forEach((g, nom) => get(nom));
        return Array.from(m.values()).map(g => ({
            ...g, classe: guildes.get(g.nom),
            niveau: moyenne(g.membres.map(p => statNum(p.stats.total)).filter(n => n !== null))
        }));
    }

    // Tri : joueurs repérés, niveau total moyen, nom, ou rang dans un classement (non classées à la fin)
    function guildesTriees(liste) {
        const q = guildRecherche.trim().toLowerCase();
        return liste.filter(g => !q || g.nom.toLowerCase().includes(q)).sort((a, b) => {
            if (guildTri === 'nom') return a.nom.localeCompare(b.nom);
            if (guildTri === 'membres') return b.membres.length - a.membres.length || a.nom.localeCompare(b.nom);
            if (guildTri === 'niveau') return (b.niveau ?? -1) - (a.niveau ?? -1) || a.nom.localeCompare(b.nom);
            return (guildRang(a.classe, guildTri) ?? Infinity) - (guildRang(b.classe, guildTri) ?? Infinity) || b.membres.length - a.membres.length;
        });
    }

    // Meilleur rang de la guilde (ou son rang dans le classement de tri)
    function guildBadge(g) {
        if (!['membres', 'niveau', 'nom'].includes(guildTri)) { const r = guildRang(g.classe, guildTri); return r !== null ? `#${nb(r)}` : ''; }
        const best = g.classe ? Object.keys(g.classe.stats).map(c => [c, guildRang(g.classe, c)]).filter(x => x[1] !== null).sort((x, y) => x[1] - y[1])[0] : null;
        return best ? `#${nb(best[1])} ${best[0]}` : '';
    }

    function guildListeHtml() {
        const liste = guildesTriees(listeGuildes());
        if (!liste.length) return '<li class="vide">Aucune guilde.</li>';
        return liste.map(g => { const badge = guildBadge(g); return `<li class="${g.nom === guildSel ? 'active' : ''}${g.nom === MA_GUILDE ? ' moi' : ''}" data-action="gsel" data-guilde="${esc(g.nom)}">
                <span class="nom">${esc(g.nom)}</span>${badge ? `<span class="rk">${esc(badge)}</span>` : ''}
                <span class="info">👥 ${g.membres.length}${g.niveau !== null ? ` · 🛡️ ${nb(g.niveau)} moy.` : ''}</span>
            </li>`; }).join('');
    }

    // Fiche d'une guilde : chiffres, classements, comparaison avec la nôtre et joueurs repérés
    function guildDetailHtml(g) {
        if (!g) return '<p class="mwi-r-pempty">Choisis une guilde dans la liste pour voir ses joueurs.</p>';
        const m = g.membres;
        const ordre = (p) => { const i = RANGS.indexOf(p.rang); return i < 0 ? RANGS.length : i; };
        const parNiveau = (k) => (a, b) => (statNum(b.stats[k]) ?? -1) - (statNum(a.stats[k]) ?? -1);
        const tri = { role: (a, b) => ordre(a) - ordre(b) || parNiveau('total')(a, b), total: parNiveau('total'),
            combat: parNiveau('combat'), nom: (a, b) => a.nom.localeCompare(b.nom) }[membresTri];
        const cats = g.classe ? Object.keys(g.classe.stats).filter(c => guildRang(g.classe, c) !== null) : [];
        const kpi = (v, l) => `<div class="mwi-r-kpi"><b>${v}</b><span>${esc(l)}</span></div>`;
        const th = (k, t) => `<th class="${['total', 'combat'].includes(k) ? 'n' : ''}${k === membresTri ? ' active' : ''}" data-action="msort" data-cle="${k}" title="Trier">${t}</th>`;
        const ligne = (p) => {
            const ms = meilleurSkill(p.niveaux);
            return `<tr data-action="gjoueur" data-player="${esc(p.nom)}" title="Voir la fiche du joueur">
                <td>${voyant(p)}<span style="${p.color ? `color: ${esc(p.color)}` : ''}">${esc(p.nom)}</span>${p.ironcow ? ' 🐄' : ''}</td>
                <td>${esc(p.rang || '?')}</td><td class="n">${esc(p.stats.total)}</td><td class="n">${esc(p.stats.combat)}</td>
                <td>${ms ? `${esc(pretty(ms.skill))} ${ms.niveau}` : ''}</td>
                <td>${p.derniereVerif ? dateVerif(p) : ''}</td>
            </tr>`;
        };
        return `<div class="mwi-r-gdhead">
                <button class="mwi-r-btn mwi-r-gretour" data-action="gdeselect" title="Retour aux guildes">← Guildes</button>
                <h3>${esc(g.nom)}</h3>${g.nom === MA_GUILDE ? '<span class="mwi-r-gmoi">Notre guilde</span>' : ''}
            </div>
            <div class="mwi-r-kpis">
                ${kpi(nb(m.length), 'joueurs repérés')}
                ${kpi(g.niveau !== null ? nb(g.niveau) : '-', 'niveau total moyen')}
                ${kpi(nb(moyenne(m.map(p => statNum(p.stats.combat)).filter(n => n !== null)) ?? '-'), 'combat moyen')}
                ${kpi(nb(m.filter(p => etatJoueur(p).enLigne === true).length), 'en ligne au /profile')}
                ${kpi(nb(m.filter(p => p.ironcow).length), 'Ironcow 🐄')}
            </div>
            ${cats.length ? `<h4 class="mwi-r-sub">Classements</h4>${rowsToHtml(cats.sort((x, y) => guildRang(g.classe, x) - guildRang(g.classe, y))
                .map(c => [c, `#${nb(guildRang(g.classe, c))}${guildVal(g.classe, c) ? ' · ' + guildVal(g.classe, c) : ''}`]))}` : ''}
            ${guildCompareHtml(g.nom)}
            <h4 class="mwi-r-sub">Joueurs repérés</h4>
            ${m.length ? `<table class="mwi-r-gtable mwi-r-gmembres">
                <thead><tr>${th('nom', 'Joueur')}${th('role', 'Rôle')}${th('total', 'Total')}${th('combat', 'Combat')}<th>Meilleur skill</th><th>Vérifié</th></tr></thead>
                <tbody>${[...m].sort(tri).map(ligne).join('')}</tbody>
            </table>` : '<p class="mwi-r-pempty">Aucun joueur de cette guilde vérifié pour le moment.</p>'}`;
    }

    function consultationHtml(tous) {
        const options = [['membres', 'joueurs repérés'], ['niveau', 'niveau moyen'], ['nom', 'nom']]
            .concat(guildCats().map(c => [c, `rang ${c}`]));
        return `<div class="mwi-r-gcons"${guildSel ? ' data-sel="1"' : ''}>
                <div class="mwi-r-glist">
                    <div class="mwi-r-gfiltres">
                        <input type="text" class="mwi-r-select" id="mwi-gsearch" placeholder="🔍 Guilde" value="${esc(guildRecherche)}" autocomplete="off" spellcheck="false">
                        <select class="mwi-r-select" id="mwi-gtri" title="Trier les guildes">${options.map(([k, t]) =>
                            `<option value="${esc(k)}"${k === guildTri ? ' selected' : ''}>Tri : ${esc(t)}</option>`).join('')}</select>
                    </div>
                    <ul class="mwi-r-gitems" id="mwi-gliste">${guildListeHtml()}</ul>
                </div>
                <div class="mwi-r-gdetail">${guildDetailHtml(tous.find(g => g.nom === guildSel))}</div>
            </div>`;
    }

    // Classements de guildes lus dans le leaderboard : notre rang et l'écart avec les autres, tableau complet
    function classementsHtml() {
        const cats = guildCats();
        if (!cats.length) return '<p class="mwi-r-pempty">Aucune guilde lue pour le moment : lance « 🏆 Leaderboard » puis ouvre les classements de l\'onglet Guilds.</p>';
        if (!cats.includes(guildSort)) guildSort = cats[0];
        const colOf = guildCol, val = guildVal, rang = guildRang;
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
        const ligne = (g) => `<tr class="${g === moi ? 'moi' : ''}" data-action="gsel" data-guilde="${esc(g.nom)}" title="Voir la guilde et ses joueurs">
                <td class="n">${rang(g, guildSort) !== null ? '#' + nb(rang(g, guildSort)) : ''}</td><td>${esc(g.nom)}</td>
                ${cats.map(c => `<td class="n">${esc(val(g, c))}${rang(g, c) !== null ? ` <small>#${nb(rang(g, c))}</small>` : ''}</td>`).join('')}
            </tr>`;
        return `<div class="mwi-r-gbody">
                <div class="mwi-r-gcards">${cartes}</div>
                <table class="mwi-r-gtable">
                    <thead><tr><th>Rang</th><th>Guilde</th>${cats.map(c =>
                        `<th class="n${c === guildSort ? ' active' : ''}" data-action="gsort" data-cat="${esc(c)}" title="Trier sur ce classement">${esc(c)}</th>`).join('')}</tr></thead>
                    <tbody>${moi ? ligne(moi) : ''}${liste.map(ligne).join('')}</tbody>
                </table>
            </div>`;
    }

    function renderGuildView() {
        const view = document.getElementById('mwi-guild-view');
        if (!view) return;
        const tous = listeGuildes();
        const head = `<div class="mwi-r-phead">
                <button class="mwi-r-btn" data-action="back" title="Retour à la liste">← Retour</button>
                <span class="mwi-r-pname">Guildes <span class="mwi-r-gcount">${tous.length} connues</span></span>
                <div class="mwi-r-speriode">${[['consult', 'Consultation'], ['classements', 'Classements']].map(([k, t]) =>
                    `<button data-action="gtab" data-onglet="${k}" class="${k === guildOnglet ? 'active' : ''}">${t}</button>`).join('')}</div>
            </div>`;
        // Relecture pendant une saisie (leaderboard) : on garde le focus et les défilements
        const saisie = document.activeElement && document.activeElement.id === 'mwi-gsearch';
        const defil = ['.mwi-r-gbody', '.mwi-r-gitems', '.mwi-r-gdetail'].map(s => view.querySelector(s)?.scrollTop || 0);
        view.innerHTML = head + (guildOnglet === 'consult' ? consultationHtml(tous) : classementsHtml());
        ['.mwi-r-gbody', '.mwi-r-gitems', '.mwi-r-gdetail'].forEach((s, i) => { const el = view.querySelector(s); if (el) el.scrollTop = defil[i]; });
        if (saisie) { const el = document.getElementById('mwi-gsearch'); el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
    }

    // Ouvre la fiche d'une guilde dans l'onglet Consultation
    function ouvrirGuilde(nom) {
        currentProfile = null;
        guildOnglet = 'consult';
        guildSel = nom;
        document.getElementById('mwi-tracker-modal').dataset.view = 'guilds';
        renderGuildView();
        const d = document.querySelector('#mwi-guild-view .mwi-r-gdetail');
        if (d) d.scrollTop = 0;
    }

    // --- Statistiques de recrutement (rpc/stats_recrutement, calculées par la base) ---
    let statsJours = [7, 30, 90].includes(loadUI().statsJours) ? loadUI().statsJours : 30;
    let stats = null, statsErreur = '', statsChargement = false;
    async function dbStats(jours) {
        statsChargement = true;
        renderStatsView();
        const jeton = await dbJeton();
        const r = jeton ? await dbHttp('POST', '/rest/v1/rpc/stats_recrutement', { jours }, jeton) : null;
        statsChargement = false;
        if (r && r.ok && r.json) { stats = { jours, ...r.json }; statsErreur = ''; }
        else statsErreur = !jeton ? 'Connecte-toi à la base (bouton ☁) pour voir les statistiques.' : `Lecture impossible (erreur ${r.status}).`;
        renderStatsView();
    }

    const pct = (a, b) => b ? Math.round(a / b * 100) + ' %' : '-';
    const jourCourt = (d) => { const [, m, j] = d.split('-'); return `${+j}/${+m}`; };
    const jourLong = (d) => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });

    // Histogramme par jour : segments empilés (series : [{ cle, cls, nom }]), valeur écrite sur le plus haut jour et sur aujourd'hui
    function histoHtml(jours, series, infobulle) {
        const total = (j) => series.reduce((s, x) => s + (j[x.cle] || 0), 0);
        const max = Math.max(1, ...jours.map(total));
        const pas = Math.ceil(jours.length / 10), haut = jours.reduce((m, j, i) => total(j) > total(jours[m]) ? i : m, 0);
        return (series.length > 1 ? `<div class="mwi-r-legende">${series.map(x => `<span><i class="${x.cls}"></i>${esc(x.nom)}</span>`).join('')}</div>` : '')
            + `<div class="mwi-r-histo">${jours.map((j, i) => {
                const t = total(j), h = t / max * 100;
                return `<div class="mwi-r-hcol" title="${esc(infobulle(j))}">${series.filter(x => j[x.cle]).map(x =>
                    `<div class="${x.cls}" style="height: calc(${j[x.cle] / max * 100}% - 2px)"></div>`).join('')}${
                    t && (i === haut || i === jours.length - 1) ? `<em style="bottom: calc(${h}% + 2px)">${nb(t)}</em>` : ''}</div>`;
            }).join('')}</div>
            <div class="mwi-r-hjours">${jours.map((j, i) => `<span>${(jours.length - 1 - i) % pas ? '' : jourCourt(j.jour)}</span>`).join('')}</div>`;
    }

    // Liste à jauges : { nom, n, free (part sans guilde, facultative), action } ; la jauge est relative au plus grand
    function blistHtml(lignes, detail) {
        if (!lignes || !lignes.length) return '<p class="mwi-r-pempty">Pas encore de données.</p>';
        const max = Math.max(1, ...lignes.map(l => l.n));
        return `<ul class="mwi-r-blist">${lignes.map(l => {
            const libre = l.free !== undefined;
            return `<li${l.action ? ` ${l.action}` : ''} title="${esc(l.titre || l.nom)}">
                <span class="nom">${esc(l.nom)}</span><span class="val">${nb(libre && detail ? l.free : l.n)}${detail ? `<small>${detail(l)}</small>` : ''}</span>
                <div class="jauge">${libre
                    ? `<div class="s-free" style="width: ${l.free / max * 100}%"></div><div class="s-autre" style="width: ${(l.n - l.free) / max * 100}%; opacity: .45"></div>`
                    : `<div class="s-free" style="width: ${l.n / max * 100}%"></div>`}</div>
            </li>`;
        }).join('')}</ul>`;
    }

    function renderStatsView() {
        const view = document.getElementById('mwi-stats-view');
        if (!view) return;
        const head = `<div class="mwi-r-phead">
                <button class="mwi-r-btn" data-action="back" title="Retour à la liste">← Retour</button>
                <span class="mwi-r-pname">Statistiques${statsChargement ? ' <span class="mwi-r-gcount">chargement...</span>' : ''}</span>
                <div class="mwi-r-speriode">${[7, 30, 90].map(j =>
                    `<button data-action="periode" data-jours="${j}" class="${j === statsJours ? 'active' : ''}">${j} j</button>`).join('')}</div>
                <button class="mwi-r-icon" data-action="refresh" title="Recharger">↻</button>
            </div>`;
        if (!stats) {
            view.innerHTML = head + (statsErreur ? `<p class="mwi-r-pempty">${esc(statsErreur)}</p>` : '');
            return;
        }
        const t = stats.totaux || {}, jours = (stats.par_jour || []).map(j => ({ ...j, autre: j.pending + j.fail }));
        const verifies = (t.free || 0) + (t.guild || 0);
        const periode = jours.reduce((s, j) => ({ n: s.n + j.nouveaux, free: s.free + j.free, v: s.v + j.verifications }), { n: 0, free: 0, v: 0 });
        const actifs = jours.filter(j => j.nouveaux).length;
        const kpi = (v, l, cls = '', titre = '') => `<div class="mwi-r-kpi ${cls}" title="${esc(titre)}"><b>${v}</b><span>${esc(l)}</span></div>`;
        const carte = (titre, sous, html, cls = '') => `<div class="mwi-r-scard ${cls}"><h4>${esc(titre)}${sous ? `<small>${esc(sous)}</small>` : ''}</h4>${html}</div>`;
        const partFree = (l) => ` / ${nb(l.n)} · ${pct(l.free, l.n)}`;
        const TRANCHES = ['0 - 499', '500 - 999', '1000 - 1499', '1500 - 1999', '2000 - 2499', '2500 +'];
        const scroll = view.querySelector('.mwi-r-gbody')?.scrollTop || 0;

        view.innerHTML = head + `<div class="mwi-r-gbody">
            <div class="mwi-r-kpis">
                ${kpi(nb(t.joueurs), 'joueurs repérés')}
                ${kpi(nb(periode.n), `nouveaux sur ${stats.jours} j`, '', actifs ? `${nb(Math.round(periode.n / actifs))} par jour de scan en moyenne` : '')}
                ${kpi(nb(t.free), 'sans guilde', 'free', `${pct(t.free, verifies)} des profils vérifiés`)}
                ${kpi(pct(t.free, verifies), 'des vérifiés sans guilde')}
                ${kpi(nb(t.pending), 'en attente de vérif.')}
                ${kpi(nb(t.free_en_ligne), 'sans guilde en ligne', '', 'En ligne à leur dernier /profile')}
                ${kpi(nb(t.free_inactifs), 'sans guilde inactifs 💤', '', 'Ne faisaient rien à leur dernier /profile')}
                ${kpi(nb(t.ironcow), 'Ironcow 🐄', '', `${nb(t.free_ironcow)} sans guilde`)}
                ${kpi(nb(t.verifications), 'vérifications', '', `${nb(t.scans)} scans au total`)}
            </div>
            <div class="mwi-r-sgrid">
                ${carte('Nouveaux joueurs par jour', `statut actuel · ${stats.jours} j`, histoHtml(jours, [
                    { cle: 'free', cls: 's-free', nom: 'Sans guilde' },
                    { cle: 'guild', cls: 's-guild', nom: 'En guilde' },
                    { cle: 'autre', cls: 's-autre', nom: 'En attente / échec' }
                ], j => `${jourLong(j.jour)} : ${nb(j.nouveaux)} nouveau(x) · ${nb(j.free)} sans guilde · ${nb(j.guild)} en guilde · ${nb(j.pending + j.fail)} en attente ou échec · ${nb(j.scans)} scan(s)`)
                    , 'large')}
                ${carte('Vérifications par jour', `${nb(periode.v)} sur ${stats.jours} j`, histoHtml(jours,
                    [{ cle: 'verifications', cls: 's-verif', nom: 'Vérifications' }],
                    j => `${jourLong(j.jour)} : ${nb(j.verifications)} vérification(s), ${nb(j.verif_ok)} réussie(s)`), 'large')}
                ${carte('Sources', 'sans guilde / repérés', blistHtml(stats.sources, partFree))}
                ${carte('Canaux du chat', 'sans guilde / repérés', blistHtml(stats.canaux, partFree))}
                ${carte('Classements du leaderboard', 'les plus riches en sans guilde', blistHtml(stats.classements, partFree))}
                ${carte('Niveau total des sans guilde', '', blistHtml((stats.niveaux_free || []).map(x => ({ nom: TRANCHES[x.t], n: x.n }))))}
                ${carte('Activité des sans guilde', 'au dernier /profile', blistHtml((stats.activites_free || []).map(x => ({
                    nom: x.nom === '' ? '💤 Ne fait rien' : x.nom === '?' ? 'Inconnue' : pretty(x.nom), n: x.n }))))}
                ${carte(`Sans guilde niveau 120+`, 'clic : voir la liste', blistHtml((stats.skills_free || []).map(x => ({
                    nom: pretty(x.nom), n: x.n, titre: 'Afficher ces joueurs', action: `data-action="skill" data-skill="${esc(x.nom)}"` }))))}
                ${carte('Guildes des joueurs repérés', 'top 10 · clic : voir la guilde', blistHtml((stats.guildes || []).map(x => ({
                    ...x, titre: 'Voir la guilde et ses joueurs', action: `data-action="guilde" data-guilde="${esc(x.nom)}"` }))))}
            </div>
        </div>`;
        view.querySelector('.mwi-r-gbody').scrollTop = scroll;
    }

    // Fiche joueur : la guilde du joueur face à la nôtre, d'après les classements de guildes lus.
    // Les classements où nous sommes devant sont mis en avant : ce sont les arguments pour contacter le joueur.
    function guildCompareHtml(nomGuilde) {
        if (!nomGuilde || nomGuilde === MA_GUILDE) return '';
        const titre = `<h4 class="mwi-r-sub">${esc(nomGuilde)} face à ${esc(MA_GUILDE)}</h4>`;
        if (!guildes.size) return titre + '<p class="mwi-r-pempty">Classements des guildes pas encore lus : lance « 🏆 Leaderboard » et ouvre l\'onglet Guilds.</p>';
        const g = guildes.get(nomGuilde), moi = guildes.get(MA_GUILDE);
        if (!moi) return titre + `<p class="mwi-r-pempty">${esc(MA_GUILDE)} absente des classements lus : comparaison impossible.</p>`;
        const rang = guildRang;
        const val = (x, c) => { const v = guildVal(x, c); return v ? ` (${v})` : ''; };
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

    // flow : cases à la suite dans l'ordre du jeu, sans reprendre sa grille (autant par ligne que la largeur le permet)
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

    // « aujourd'hui », « il y a 3 j » ; au-delà du délai, signalé à revérifier
    function dateVerif(p) {
        const j = joursDepuis(p.derniereVerif);
        return (j < 1 ? "aujourd'hui" : `il y a ${j} j`) + (p.perime ? ' (à revérifier)' : '');
    }

    // Stats principales en lignes <dt>/<dd> (fiche joueur et grandes cases)
    const statsDl = (p) => `<dt>🛡️ Total</dt><dd>${esc(p.stats.total)}</dd><dt>⚔️ Combat</dt><dd>${esc(p.stats.combat)}</dd><dt>⏳ Age</dt><dd>${esc(p.stats.age)}</dd>`;

    // En ligne et activité au dernier /profile : profil brut de la session, sinon valeurs de la base.
    // enLigne : true / false / null (masqué ou inconnu) ; activite : '' = ne fait rien, undefined = inconnue
    function etatJoueur(p) {
        const c = (profilsBruts.get(p.nom) || {}).sharableCharacter;
        if (c) return { enLigne: c.hideOnlineStatus ? null : !!c.isOnline, masque: !!c.hideOnlineStatus, activite: hridName(c.actionType || '') };
        return { enLigne: p.enLigne ?? null, masque: p.enLigne === null && p.activite !== undefined, activite: p.activite };
    }
    // Filtres « En ligne » et « Activité » ; un joueur dont l'état est inconnu n'y passe pas
    function passeFiltresEtat(p) {
        if (!filtreEnLigne && !filtreActivite) return true;
        const e = etatJoueur(p);
        if (filtreEnLigne === 'on' && e.enLigne !== true) return false;
        if (filtreEnLigne === 'off' && e.enLigne !== false) return false;
        if (filtreActivite === 'occupe' && !e.activite) return false;
        if (filtreActivite === 'rien' && e.activite !== '') return false;
        return true;
    }

    // Voyant en ligne / hors ligne (gris si inconnu ou masqué par le joueur), 💤 s'il ne faisait rien
    function voyant(p) {
        const e = etatJoueur(p);
        const etat = e.enLigne === true ? 'on' : e.enLigne === false ? 'off' : e.masque ? 'masque' : 'inconnu';
        const titre = { on: 'En ligne', off: 'Hors ligne', masque: 'Statut masqué par le joueur', inconnu: 'Statut inconnu (profil pas encore vérifié)' }[etat];
        return `<span class="mwi-r-dot ${etat}" title="${titre} au dernier /profile"></span>`
            + (e.activite === '' ? '<span class="mwi-r-zz" title="Ne faisait rien au dernier /profile">💤</span>' : '');
    }

    function playerCategory(p) {
        if (!p.verifie) return 'pending';
        if (p.echec) return 'fail';
        return p.hasGuild ? 'guild' : 'free';
    }

    const matchesMode = (p) => currentMode === 'all' || (currentMode === 'ironcow') === !!p.ironcow;

    // Niveau du joueur dans le skill choisi (ou son niveau de combat) ; null si inconnu
    function niveauSkill(p, skill) {
        const n = skill === 'combat_level' ? parseInt(p.stats.combat, 10) : p.niveaux && p.niveaux[skill];
        return Number.isFinite(n) ? n : null;
    }
    // Joueur retenu pour un skill : niveau NIVEAU_MIN_SKILL ou plus, ou (métiers) outil celestial ou tenue du métier
    const dansSkill = (p, skill) => {
        if (niveauSkill(p, skill) >= NIVEAU_MIN_SKILL) return true;
        const e = equipementMetier(p.equipement, skill);
        return e.celeste || e.haut || e.bas;
    };

    // Joueurs affichés. Un skill choisi ne garde que les joueurs retenus pour ce skill :
    // les mieux équipés d'abord (outil celestial, tenue, charme), puis l'outil le plus amélioré, puis le plus haut niveau
    function visiblePlayers(skill = currentSkill) {
        const players = Array.from(recrues.values()).filter(p =>
            (currentFilter === 'all' || playerCategory(p) === currentFilter) && matchesMode(p) && passeFiltresEtat(p)
            && (!skill || dansSkill(p, skill)));
        if (!skill) return players;
        const cle = (p) => { const e = equipementMetier(p.equipement, skill); return [e.score, e.plus, niveauSkill(p, skill) || 0]; };
        return players.map(p => [p, cle(p)]).sort((a, b) => b[1][0] - a[1][0] || b[1][1] - a[1][1] || b[1][2] - a[1][2]).map(x => x[0]);
    }

    // Barre des skills, comme dans le jeu : icône, nom et nombre de joueurs à NIVEAU_MIN_SKILL ou plus (filtres compris)
    function renderSkillBar() {
        const bar = document.getElementById('mwi-skills');
        if (!bar) return;
        const players = visiblePlayers('');
        const nbSkill = (k) => players.filter(p => dansSkill(p, k)).length;
        const icone = (k) => spriteIcon('skills', k) || `<b>${esc(pretty(k).slice(0, 2))}</b>`;
        const item = (k, ico, nom, n, cls = '') => `<button class="mwi-r-sk${cls}${k === currentSkill ? ' active' : ''}${n ? '' : ' vide'}" data-skill="${k}"
                title="${esc(nom)}${k ? ` : ${n} joueur(s) niveau ${NIVEAU_MIN_SKILL}+${TENUES[k] ? ' ou équipé(s) pour ce métier' : ''}` : ''}"><span class="ico">${ico}</span><span class="nom">${esc(nom)}</span><span class="nb">${n}</span></button>`;
        const scroll = bar.scrollTop;
        bar.innerHTML = item('', '☰', 'Tous', players.length)
            + SKILLS.filter(k => !SKILLS_COMBAT.includes(k)).map(k => item(k, icone(k), pretty(k), nbSkill(k))).join('')
            + item('combat_level', spriteIcon('skills', 'combat') || '⚔️', 'Combat', nbSkill('combat_level'), ' titre')
            + SKILLS_COMBAT.map(k => item(k, icone(k), pretty(k), nbSkill(k), ' sous')).join('');
        bar.scrollTop = scroll;
    }

    // Équipement d'un métier en petites icônes : ✨ outil celestial (+N), 👕 haut, 👖 bas, 🔮 charme
    const CHARMES = { trainee: 'T', basic: 'B', advanced: 'A', expert: 'E', master: 'M', grandmaster: 'GM' };
    function equipementHtml(e) {
        const it = [];
        if (e.celeste) it.push(`<span title="Outil celestial${e.plus ? ' +' + e.plus : ''}">✨${e.plus ? '+' + e.plus : ''}</span>`);
        if (e.haut) it.push('<span title="Haut du métier">👕</span>');
        if (e.bas) it.push('<span title="Bas du métier">👖</span>');
        if (e.charme) it.push(`<span title="Charme ${esc(pretty(e.charme))}">🔮${CHARMES[e.charme] || ''}</span>`);
        return it.length ? `<span class="eq">${it.join('')}</span>` : '';
    }

    // Pastille sur la case : le skill choisi, sinon le métier où le joueur est le mieux équipé, sinon son meilleur skill
    function skillChip(p) {
        const m = meilleurSkill(p.niveaux), prod = meilleurMetier(p.niveaux, p.equipement);
        const k = currentSkill || (prod && prod.skill) || (m && m.skill);
        const n = k ? niveauSkill(p, k) : null;
        const e = k ? equipementMetier(p.equipement, k) : { score: 0 };
        if (n === null && !e.score) return '';
        const nom = k === 'combat_level' ? 'Combat' : pretty(k);
        const titre = `${nom}${n !== null ? ' niveau ' + n : ''}${m && k !== m.skill ? ` · meilleur niveau : ${pretty(m.skill)} ${m.niveau}` : ''}`;
        return `<span class="mwi-r-lvl" title="${esc(titre)}"><i>${esc(nom)}</i> <b>${n !== null ? n : '?'}</b>${equipementHtml(e)}</span>`;
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

        renderSkillBar();
        const players = visiblePlayers();
        if (players.length === 0 && currentSkill) {
            list.innerHTML = `<li class="mwi-r-empty">Aucun joueur niveau ${NIVEAU_MIN_SKILL}+ en ${esc(currentSkill === 'combat_level' ? 'Combat' : pretty(currentSkill))} avec ces filtres.</li>`;
            return;
        }
        if (players.length === 0) {
            const msgs = {
                free: 'Aucun joueur sans guilde pour le moment.\nClique sur Scanner puis Vérifier.',
                guild: 'Aucun joueur en guilde.',
                fail: 'Aucun échec de lecture.',
                pending: 'Aucun joueur en attente.',
                all: 'Aucun joueur scanné.'
            };
            const modeHint = (currentMode === 'all' ? '' : `\n(filtre : ${currentMode === 'ironcow' ? 'Ironcow' : 'Standard'})`)
                + (filtreEnLigne ? `\n(filtre : ${EN_LIGNE[filtreEnLigne]})` : '') + (filtreActivite ? `\n(filtre : ${ACTIVITES[filtreActivite]})` : '');
            list.innerHTML = `<li class="mwi-r-empty" style="white-space: pre-line;">${msgs[currentFilter]}${modeHint}</li>`;
            return;
        }

        list.innerHTML = players.map(p => {
            const cat = playerCategory(p);
            const tag = { free: 'Sans guilde', guild: `${esc(p.rang)} of ${esc(p.guilde)}`, fail: 'Profil illisible',
                pending: p.perime ? `À revérifier · ${joursDepuis(p.derniereVerif)} j` : 'En attente' }[cat];

            const nameStyle = p.color ? `color: ${p.color}; text-shadow: 0px 1px 2px rgba(0,0,0,0.5);` : 'color: var(--r-text);';

            const stats = (cat === 'free' || cat === 'guild' || (p.perime && !p.echec)) ? `
                <div class="mwi-r-stats">
                    ${skillChip(p)}
                    <span>🛡️ Total <b>${esc(p.stats.total)}</b></span>
                    <span>⚔️ Combat <b>${esc(p.stats.combat)}</b></span>
                </div>` : '';
            // Détails affichés seulement avec les grandes cases
            const meilleur = meilleurSkill(p.niveaux), production = meilleurMetier(p.niveaux, p.equipement);
            const details = `
                <dl class="mwi-r-details">
                    <dt>Statut</dt><dd>${tag}</dd>
                    <dt>Mode</dt><dd>${p.ironcow ? '🐄 Ironcow' : 'Standard'}</dd>
                    ${cat === 'guild' ? `<dt>Guilde</dt><dd>${esc(p.guilde)}</dd><dt>Rang</dt><dd>${esc(p.rang)}</dd>` : ''}
                    ${(cat === 'free' || cat === 'guild') ? statsDl(p) : ''}
                    ${meilleur ? `<dt>🏅 Meilleur</dt><dd>${esc(pretty(meilleur.skill))} ${meilleur.niveau}</dd>` : ''}
                    ${production ? `<dt>🏭 Production</dt><dd>${esc(pretty(production.skill))} ${equipementHtml(production.eq)}</dd>` : ''}
                </dl>`;
            return `<li class="mwi-r-card ${cat}" data-player="${esc(p.nom)}" title="Voir la fiche du joueur">
                <div class="mwi-r-name"><span class="mwi-r-who"><span class="mwi-r-player" style="${nameStyle}">${esc(p.nom)}</span>${p.ironcow ? '<span class="mwi-r-iron" title="Ironcow">🐄</span>' : ''}</span><span class="mwi-r-right">${skillChip(p)}<span class="mwi-r-tag" title="${tag}">${tag}</span></span></div>
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
                    return { el, label };
                }
            }
        }
        return { el: null };
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
        // Rangs de guilde connus uniquement : "Shrine of ..." ou autre "X of Y" ne sont pas une guilde
        const guildMatch = text.match(/^\s*(Leader|General|Officer|Member) of\s+(.+)$/m);
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
        playerData.niveaux = niveauxProfil(profilsBruts.get(username)) || playerData.niveaux;
        playerData.equipement = equipementProfil(profilsBruts.get(username)) || playerData.equipement;
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
        dbVerification(playerData);

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
        obs.observe(document.body, { childList: true, subtree: true });
        return obs;
    }

    // Limiteur anti-spam : l'intervalle doublé après un spam reste valable toute la session.
    // executer(action, attendre, prefix, reussi) : action() envoie la commande (false = impossible),
    // attendre() renvoie le résultat ; on retente tant que le jeu signale un spam et que reussi(res) est faux.
    // Renvoie { res, spam: true si le jeu a refusé jusqu'au bout, impossible: true si action() a échoué }
    // min : délai de départ entre deux commandes (0 = aucun tant que le jeu ne signale pas de spam)
    function creerLimiteur(nom, min = INTERVALLE_MIN_MS) {
        let intervalle = min, dernier = 0;
        return {
            // L'envoi part plus tard que action() quand c'est le joueur qui valide : le délai compte depuis l'envoi réel
            marquerEnvoi() { dernier = Date.now(); },
            async executer(action, attendre, prefix, reussi = () => false) {
                for (let reprise = 0; ; reprise++) {
                    const wait = dernier + intervalle - Date.now();
                    if (wait > 0) await sleep(wait);
                    if (arretDemande) return { res: undefined, spam: false, arrete: true };
                    const sentAt = dernier = Date.now();
                    if (action() === false) return { res: undefined, spam: false, impossible: true };
                    const res = await attendre();
                    if (spamDetectedAt < sentAt - 300) return { res, spam: false };
                    // Le jeu trouve qu'on va trop vite : on ralentit durablement
                    intervalle = Math.min(Math.max(intervalle * 2, INTERVALLE_MIN_MS), INTERVALLE_MAX_MS);
                    log(`Intervalle entre ${nom} porté à ${intervalle} ms.`);
                    if (reussi(res)) return { res, spam: false };
                    if (reprise >= MAX_REPRISES_ANTISPAM) return { res, spam: true };
                    await pauseAntispam(prefix);
                }
            }
        };
    }
    // C'est le joueur qui envoie chaque /profile : le suivant est prérempli dès que le profil est lu,
    // le délai anti-spam ne s'applique qu'après un avertissement du jeu
    const limiteurProfils = creerLimiteur('profils', 0);

    async function pauseAntispam(prefix) {
        for (let left = PAUSE_ANTISPAM_MS; left > 0 && !arretDemande; left -= 1000) {
            setStatus(`${prefix} Anti-spam du jeu : pause ${Math.ceil(left / 1000)}s...`, 'warn');
            await sleep(Math.min(1000, left));
        }
    }

    async function processUnverifiedProfiles() {
        if (!estRh()) { setStatus('Vérification réservée aux comptes RH.', 'warn'); return; }
        // Pendant la vérification, le même bouton sert à l'arrêter (après le profil en cours)
        if (isProcessing) {
            arretDemande = true;
            const b = document.getElementById('mwi-btn-process');
            b.disabled = true;
            b.textContent = 'Arrêt...';
            return;
        }
        if (isScanning) return;

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
        const progress = document.getElementById('mwi-progress');
        const bar = document.getElementById('mwi-progress-bar');

        arretDemande = false;
        majBoutonsScan();
        btn.textContent = '■ Arrêter';
        btn.title = 'Arrêter la vérification après le profil en cours';
        progress.style.display = 'block';
        bar.style.width = '0%';

        let index = 0, introuvable = false;
        const spamWatch = startSpamWatch();
        try {
            for (const data of queue) {
                if (arretDemande) break;
                const username = data.nom;
                index++;
                const prefix = `${index}/${toVerify}`;

                // Le script prépare la commande, le joueur appuie sur Entrée dans le chat pour chaque profil
                let chatInput = null;
                const o = await limiteurProfils.executer(() => {
                    chatInput = preremplirProfil(username);
                    if (!chatInput) return false;
                    enAttente = username;
                    setStatus(`${prefix} : appuie sur Entrée dans le chat du jeu pour vérifier ${username}.`, '');
                }, () => attendreEnvoi(chatInput, username, () => !arretDemande), prefix, ok => ok !== false);
                if (o.impossible) { index--; introuvable = true; break; }
                if (o.arrete || o.res === null) { index--; break; } // arrêté pendant l'attente : ce profil reste en file

                if (!o.res) {
                    data.verifie = true;
                    data.echec = true;
                    dbVerification(data);
                }
                bar.style.width = `${Math.round((index / toVerify) * 100)}%`;
                updateModalUI();
            }
            if (introuvable) setStatus('Champ de chat introuvable.', 'err');
            else setStatus(arretDemande ? `Vérification arrêtée (${index}/${toVerify} traités).` : 'Vérification terminée.', arretDemande ? 'warn' : 'ok');
        } catch (e) {
            log('Erreur pendant la vérification :', e);
            setStatus('Erreur pendant la vérification (voir console).', 'err');
        } finally {
            spamWatch.disconnect();
            isProcessing = false;
            arretDemande = false;
            enAttente = null;
            btn.disabled = false;
            btn.title = 'Prépare /profile dans le chat pour chaque joueur : appuie sur Entrée pour chacun';
            majBoutonsScan();
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
