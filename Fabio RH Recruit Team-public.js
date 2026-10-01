// ==UserScript==
// @name         Fabio RH Recruit Team
// @namespace    https://raw.githack.com/jameslemoine/fabio-rh-recruitment/main/Fabio%20RH%20Recruit%20Team-1.0.js
// @version      1.18
// @description  RH Tool for guild-free player (consultation)
// @author       Yloise and Claude
// @run-at       document-start
// @match        https://www.milkywayidle.com/*
// @match        https://test.milkywayidle.com/*
// @copyright    2026 Fabio Lucci - Tous droits reserves - Yloise
// @resource     FABIO_CSS https://cdn.jsdelivr.net/gh/jameslemoine/fabio-rh-recruitment@42ea415b857a4b4c13d74d9342a36ec80ac441f0/fabio-rh.css
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      cyvtgzkepticodlcrtjb.supabase.co
// @license      All Rights Reserved; This script is proprietary and cannot be copied, modified, or distributed without explicit permission.
// ==/UserScript==

// Fichier généré par tools/build-public.py depuis la version privée : ne pas modifier à la main.
// Version de consultation : liste des joueurs et fiches lues dans la base (compte lecteur ou rh).

(function() {
    'use strict';

    const FABIO_ICON = 'data:image/png;base64,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';
    const STORAGE_KEY = 'mwi-radar-ui';

    const recrues = new Map();
    const MA_GUILDE = 'Fabio Lucci';
    const guildes = new Map(); // nom -> { nom, stats: { classement: { rang, valeurs: { colonne: texte } } } }
    let isProcessing = false;
    let isScanning = false;
    let enAttente = null; // pseudo dont la commande /profile est préremplie, en attente de la touche Entrée du joueur
    let currentFilter = 'free';
    let currentMode = 'all'; // 'all' | 'standard' | 'ironcow'

    const log = (...a) => console.log('[Radar]', ...a);
    const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // ---------------------------------------------------------------
    // 0. Données brutes des profils
    // ---------------------------------------------------------------
    // À chaque /profile, le serveur envoie au jeu un message "profile_shared" avec toutes les données du joueur
    // (skills, équipement, capacités, consommables et déclencheurs de combat, maison, sanctuaires...).
    // On l'écoute au passage, sans rien envoyer : plus fiable et plus complet que la lecture de l'écran.
    const profilsBruts = new Map(); // pseudo -> profil

    // ---------------------------------------------------------------
    // 0b. Base Supabase : chaque scan et chaque vérification y est enregistré
    // ---------------------------------------------------------------
    // Accès réservé aux recruteurs (compte Supabase autorisé dans la table recruteurs, RLS côté base).
    // La clé publishable ne donne accès à rien sans connexion. Rien n'est envoyé au serveur du jeu.
    const DB_URL = 'https://cyvtgzkepticodlcrtjb.supabase.co';
    const DB_KEY = 'sb_publishable_iDo61JeURJa-DFmvwFQfWA_iNvrGi3M';
    const DB_SESSION = 'fabio-db-session';
    const DB_FILE = 'fabio-db-file'; // envois en attente (pas connecté, réseau coupé...)

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
        const joueurs = await dbLire('/rest/v1/joueurs?select=nom,ironcow,couleur,statut,a_guilde,guilde,rang,total_level,combat_level,age&order=nom', jeton);
        if (!joueurs) { log('Base : lecture des joueurs impossible.'); return; }
        let ajoutes = 0;
        for (const j of joueurs) {
            let p = recrues.get(j.nom);
            if (!p) { p = newRecruit(j.nom, j.couleur); recrues.set(j.nom, p); ajoutes++; }
            if (j.ironcow) p.ironcow = true;
            if (!p.color && j.couleur) p.color = j.couleur;
            // Ce qui a été vérifié pendant cette session fait foi
            if (p.verifie || j.statut === 'pending') continue;
            p.verifie = true;
            p.echec = j.statut === 'fail';
            p.hasGuild = !!j.a_guilde;
            p.guilde = j.guilde || '';
            p.rang = j.rang || '';
            p.stats = { total: j.total_level ?? '?', combat: j.combat_level ?? '?', age: j.age || '?' };
            p.ironcow = !!j.ironcow;
        }

        // Classements du dernier scan qui a lu l'onglet Guilds (sauf si un scan de cette session les a déjà lus)
        if (!guildes.size) {
            const dernier = await dbHttp('GET', '/rest/v1/guildes_classements?select=scan_id&order=scan_id.desc&limit=1', undefined, jeton);
            const scanId = dernier.ok && dernier.json && dernier.json[0] && dernier.json[0].scan_id;
            const lignes = scanId ? await dbLire(`/rest/v1/guildes_classements?select=guilde,classement,rang,valeurs&scan_id=eq.${scanId}&order=id`, jeton) : null;
            (lignes || []).forEach(l => {
                const g = guildes.get(l.guilde) || { nom: l.guilde, stats: {} };
                g.stats[l.classement] = { rang: l.rang ?? NaN, valeurs: l.valeurs || {} };
                guildes.set(l.guilde, g);
            });
        }
        log(`Base : ${joueurs.length} joueurs lus (${ajoutes} ajoutés à la liste), ${guildes.size} guildes.`);
        setStatus(`Base : ${joueurs.length} joueur(s) chargé(s).`, 'ok');
        updateModalUI();
    }

    // Fiche d'un joueur vérifié lors d'une session précédente : profil brut et onglets de sa dernière vérification réussie
    const fichesDemandees = new Set();
    async function dbFiche(p) {
        if (!p.verifie || p.echec || profilsBruts.has(p.nom) || fichesDemandees.has(p.nom)) return;
        fichesDemandees.add(p.nom);
        const jeton = await dbJeton();
        if (!jeton) { fichesDemandees.delete(p.nom); return; }
        const r = await dbHttp('GET', `/rest/v1/verifications?select=profil_brut,sections&joueur=eq.${encodeURIComponent(p.nom)}&succes=is.true&order=verifie_le.desc&limit=1`, undefined, jeton);
        const v = r.ok && r.json && r.json[0];
        if (!v) { fichesDemandees.delete(p.nom); return; }
        if (v.profil_brut && !profilsBruts.has(p.nom)) profilsBruts.set(p.nom, v.profil_brut);
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

    // Nombre lu dans une cellule du jeu : "10 054 281", "1,2M", "513", "12.5"
    // Un seul "." ou "," suivi de 1 ou 2 chiffres est une décimale, sinon un séparateur de milliers
    const num = (v) => {
        const m = String(v).replace(/\s/g, '').match(/^(-?\d[\d.,]*)([KMBT])?/i);
        if (!m) return NaN;
        const mult = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[(m[2] || '').toUpperCase()] || 1;
        const decimal = mult > 1 || /^-?\d+[.,]\d{1,2}$/.test(m[1]);
        return parseFloat(decimal ? m[1].replace(',', '.') : m[1].replace(/[.,]/g, '')) * mult;
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
    // 2. Préremplir la commande de profil
    // ---------------------------------------------------------------
    // Règle du jeu : le script écrit la commande mais ne l'envoie jamais, c'est le joueur qui appuie sur Entrée.
    // Renvoie le champ du chat (null s'il est introuvable)
    function preremplirProfil(username) {
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
        // Curseur en fin de commande : le joueur n'a plus qu'à appuyer sur Entrée
        chatInput.focus();
        try { chatInput.setSelectionRange(command.length, command.length); } catch (e) { }

        return chatInput;
    }

    // ---------------------------------------------------------------
    // 3. Interface & Styles
    // ---------------------------------------------------------------
    const CSS = GM_getResourceText('FABIO_CSS');

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
                    <button type="button" class="mwi-r-btn" id="mwi-db-logout">Déconnexion</button>
                </form>
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
                    <div class="mwi-r-search">
                        <input type="text" class="mwi-r-select" id="mwi-search" placeholder="🔍 Rechercher un joueur" autocomplete="off" spellcheck="false">
                        <ul class="mwi-r-sugg" id="mwi-search-list" role="listbox"></ul>
                    </div>
                    <button class="mwi-r-btn" id="mwi-btn-guilds" title="Comparer notre guilde aux autres (données lues par le scan)">Guildes</button>
                    <button class="mwi-r-btn" id="mwi-btn-copy" title="Copier les pseudos affichés">Copier</button>
                    <button class="mwi-r-btn" id="mwi-btn-clear" title="Vider la liste">Vider</button>
                </div>
                <ul class="mwi-r-list" id="mwi-tracker-list"></ul>
                <div class="mwi-r-pview" id="mwi-profile-view"></div>
                <div class="mwi-r-gview" id="mwi-guild-view"></div>
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
        modeSelect.addEventListener('change', (e) => {
            currentMode = e.target.value;
            saveUI({ modeFilter: currentMode });
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
        document.getElementById('mwi-db-logout').addEventListener('click', dbDeconnexion);
        majBase();
        dbCharger(); // joueurs et guildes enregistrés lors des sessions précédentes

        enableDrag(modal, document.getElementById('mwi-r-head'));
        enableResize(modal);
        updateModalUI();
    }

    let currentProfile = null;
    let currentSection = 0;

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
                const tag = { free: 'Sans guilde', guild: p.guilde, fail: 'Illisible', pending: 'En attente' }[cat];
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

    function openProfileView(username) {
        currentProfile = username;
        currentSection = 0;
        document.getElementById('mwi-tracker-modal').dataset.view = 'profile';
        renderProfileView();
        const p = recrues.get(username);
        if (p) dbFiche(p);
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
        view.innerHTML = `
            <div class="mwi-r-phead">
                <button class="mwi-r-btn" data-action="back" title="Retour à la liste">← Retour</button>
                <span class="mwi-r-pname" style="${nameStyle}">${voyant(p)}${esc(p.nom)}${p.ironcow ? ' <span class="mwi-r-iron">🐄</span>' : ''}</span>
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

    // --- Comparaison des guildes ---
    let guildSort = null; // classement utilisé pour trier le tableau
    // Rang d'une guilde dans un classement (null si absente)
    const guildRang = (g, c) => g && g.stats[c] && isFinite(g.stats[c].rang) ? g.stats[c].rang : null;
    // Valeur principale d'un classement : la première colonne après le nom (Level, Points...)
    const guildCol = (c) => { const g = Array.from(guildes.values()).find(x => x.stats[c]); return g ? Object.keys(g.stats[c].valeurs)[0] || '' : ''; };
    const guildVal = (g, c) => g && g.stats[c] ? (g.stats[c].valeurs[guildCol(c)] || '') : '';
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
            view.innerHTML = head + '<p class="mwi-r-pempty">Aucune guilde lue pour le moment : clique sur « 1. Scanner », qui parcourt aussi l\'onglet Guilds du leaderboard.</p>';
            return;
        }
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
        if (!guildes.size) return titre + '<p class="mwi-r-pempty">Classements des guildes pas encore lus : clique sur « 1. Scanner ».</p>';
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

    // Stats principales en lignes <dt>/<dd> (fiche joueur et grandes cases)
    const statsDl = (p) => `<dt>🛡️ Total</dt><dd>${esc(p.stats.total)}</dd><dt>⚔️ Combat</dt><dd>${esc(p.stats.combat)}</dd><dt>⏳ Age</dt><dd>${esc(p.stats.age)}</dd>`;

    // Voyant en ligne / hors ligne, d'après les données du dernier /profile (gris si inconnu ou masqué par le joueur)
    function voyant(p) {
        const c = (profilsBruts.get(p.nom) || {}).sharableCharacter;
        const etat = !c ? 'inconnu' : c.hideOnlineStatus ? 'masque' : c.isOnline ? 'on' : 'off';
        const titre = { on: 'En ligne', off: 'Hors ligne', masque: 'Statut masqué par le joueur', inconnu: 'Statut inconnu (profil pas encore vérifié)' }[etat];
        return `<span class="mwi-r-dot ${etat}" title="${titre}"></span>`;
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
                    ${(cat === 'free' || cat === 'guild') ? statsDl(p) : ''}
                </dl>`;
            return `<li class="mwi-r-card ${cat}" data-player="${esc(p.nom)}" title="Voir la fiche du joueur">
                <div class="mwi-r-name"><span class="mwi-r-who">${voyant(p)}<span class="mwi-r-player" style="${nameStyle}">${esc(p.nom)}</span>${p.ironcow ? '<span class="mwi-r-iron" title="Ironcow">🐄</span>' : ''}</span><span class="mwi-r-right"><button class="mwi-r-profile" data-player="${esc(p.nom)}" title="Ouvrir le profil">Profile</button><span class="mwi-r-tag" title="${tag}">${tag}</span></span></div>
                ${stats}
                ${details}
            </li>`;
        }).join('');
    }

    // Attente que la page soit prête pour injecter l'interface
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createTrackerModal);
    } else {
        setTimeout(createTrackerModal, 1000);
    }

    console.log("%c[Radar] Script chargé.", "color: #e0343c; font-weight: bold; font-size: 14px;");

})();
