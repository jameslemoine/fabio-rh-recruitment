// ==UserScript==
// @name         Fabio RH Recruit Team
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  RH Tool for guild-free player
// @author       Yloise and Claude
// @run-at       document-start
// @match        https://www.milkywayidle.com/*
// @match        https://test.milkywayidle.com/*
// @copyright    2026, Yloise (https://github.com/Yloise)
// @license      All Rights Reserved; This script is proprietary and cannot be copied, modified, or distributed without explicit permission.
// ==/UserScript==



(function() {
    'use strict';

    const CHAT_MESSAGE_CLASS = 'ChatMessage_chatMessage';
    const MAX_ESSAIS = 2;
    const ATTENTE_PROFIL_MS = 3000;
    const POLL_MS = 100;
    const STORAGE_KEY = 'mwi-radar-ui';
    const TAB_SWITCH_WAIT_MS = 350; // Ajusté à 350ms pour laisser le temps au DOM de charger l'historique

    const recrues = new Map();
    let isProcessing = false;
    let currentFilter = 'free';

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const log = (...a) => console.log('[Radar]', ...a);
    const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // ---------------------------------------------------------------
    // 1. Scanner le chat (Cible précisément les onglets du jeu via data-mention-channel)
    // ---------------------------------------------------------------
    function getChatTabs() {
        const tabs = Array.from(document.querySelectorAll('[role="tablist"] button[role="tab"]'));
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

    function scanVisibleMessages(scanLog) {
        // Utilise un sélecteur large et robuste basé sur la classe partielle
        const messages = document.querySelectorAll(`[class*="${CHAT_MESSAGE_CLASS}"]`);
        let countNew = 0;

        messages.forEach(node => {
            const fullText = node.innerText || '';
            const lines = fullText.split('\n').map(l => l.trim()).filter(Boolean);
            if (lines.length === 0) return;

            const possibleColors = Array.from(node.querySelectorAll('*'))
                .filter(el => el.style && el.style.color)
                .map(el => ({ text: el.textContent.trim(), color: el.style.color }));

            const tsOnly = /^\[[^\]]*\d{1,2}:\d{2}(?::\d{2})?\]$/;
            const tsPrefix = /^\[[^\]]*\d{1,2}:\d{2}(?::\d{2})?\]\s*/;
            if (tsOnly.test(lines[0])) lines.shift();
            else lines[0] = lines[0].replace(tsPrefix, '');

            if (lines.length === 0) return;

            // Messages système classiques (buffs)
            const sysMatch = lines[0].match(/^([\w.-]{2,30}) has added .*community buff/i);
            if (sysMatch) {
                const sysName = sysMatch[1];
                let nodeColor = node.style.color || '#4ea1e8';

                if (recrues.has(sysName)) {
                    if (!recrues.get(sysName).color) recrues.get(sysName).color = nodeColor;
                    scanLog.push({ pseudo: sysName, resultat: 'déjà connu (système)', brut: lines[0].slice(0, 40) });
                } else {
                    recrues.set(sysName, newRecruit(sysName, nodeColor));
                    countNew++;
                    scanLog.push({ pseudo: sysName, resultat: 'AJOUTÉ (système)', brut: lines[0].slice(0, 40) });
                }
                return;
            }

            const match = lines[0].match(/^([^:]+):/);
            if (!match) {
                scanLog.push({ pseudo: '-', resultat: 'ignoré (pas d\'en-tête)', brut: lines[0].slice(0, 40) });
                return;
            }

            let namePart = match[1];

            ['[Global]', '[Français]', '[Recruit]', '[Guild]', '[Party]', '[Whisper]', '[Local]', '[Help]', '[Trade]'].forEach(c => {
                if (namePart.startsWith(c)) namePart = namePart.replace(c, '').trim();
            });

            namePart = namePart.replace(/^(to|from)\s+/i, '');
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

            let userColor = '';
            const colorMatch = possibleColors.find(c => c.text.includes(username));
            if (colorMatch) {
                userColor = colorMatch.color;
            }

            if (recrues.has(username)) {
                if (userColor && !recrues.get(username).color) recrues.get(username).color = userColor;
                scanLog.push({ pseudo: username, resultat: 'déjà connu', brut: '' });
                return;
            }

            recrues.set(username, newRecruit(username, userColor));
            countNew++;
            scanLog.push({ pseudo: username, resultat: 'AJOUTÉ à la file', brut: match[1].slice(0, 40) });
        });

        return { countNew, total: messages.length };
    }

    window.mwiScanChat = async function() {
        if (isProcessing) {
            setStatus('Patiente, une vérification de profils est en cours.', 'warn');
            return;
        }

        const tabs = getChatTabs();
        const scanBtn = document.getElementById('mwi-btn-scan');

        if (tabs.length === 0) {
            setStatus('Aucun onglet de chat trouvé.', 'warn');
            return;
        }

        if (scanBtn) { scanBtn.disabled = true; scanBtn.textContent = 'Scan en cours...'; }

        const activeTab = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
        let countNew = 0;
        let totalMessages = 0;
        const scanLog = [];

        try {
            for (const tab of tabs) {
                const labelSpan = tab.querySelector('span');
                const label = labelSpan ? labelSpan.textContent.trim() : (tab.getAttribute('title') || 'Canal');
                setStatus(`Scan de "${label}"...`, '');

                tab.click();
                await sleep(TAB_SWITCH_WAIT_MS);

                const before = scanLog.length;
                const result = scanVisibleMessages(scanLog);
                for (let i = before; i < scanLog.length; i++) scanLog[i].onglet = label;

                countNew += result.countNew;
                totalMessages += result.total;
            }
            activeTab.click();
            await sleep(50);
        } finally {
            if (scanBtn) { scanBtn.disabled = false; scanBtn.textContent = '1. Scanner Chat'; }
        }

        log(`${countNew} nouveaux joueurs mis en file d'attente (${recrues.size} au total).`);
        setStatus(`Scan terminé (${tabs.length} onglets) : ${countNew} nouveau(x) joueur(s).`, 'ok');
        updateModalUI();
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
            stats: { total: "?", combat: "?", age: "?" }
        };
    }

    // ---------------------------------------------------------------
    // 2. Envoyer la commande de profil
    // ---------------------------------------------------------------
    window.mwiSendProfileCommand = function(username) {
        const chatInput = document.querySelector('input[placeholder*="message" i], input[class*="chat" i], textarea[class*="chat" i], input[type="text"]');
        if (!chatInput) return false;

        const command = `/profile ${username}`;

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
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
    const CSS = `
    #mwi-tracker-modal, #mwi-radar-launcher {
        --r-bg: #131628;
        --r-panel: #1c1f3a;
        --r-panel-2: #252950;
        --r-border: #3a3f73;
        --r-accent: #98a7e9;
        --r-accent-strong: #6f82e0;
        --r-text: #e9eaf5;
        --r-muted: #8f95bd;
        --r-ok: #4ecb8d;
        --r-warn: #f0a950;
        --r-err: #e26d6d;
        font-family: "Roboto", "Segoe UI", sans-serif;
        box-sizing: border-box;
    }
    #mwi-tracker-modal *, #mwi-radar-launcher * { box-sizing: border-box; }

    #mwi-tracker-modal {
        position: fixed; top: 60px; right: 12px; z-index: 99999;
        width: 340px; max-width: calc(100vw - 16px);
        display: flex; flex-direction: column;
        background: var(--r-bg); color: var(--r-text);
        border: 1px solid var(--r-border); border-radius: 10px;
        box-shadow: 0 8px 24px rgba(0,0,0,.55);
        overflow: hidden; font-size: 13px;
    }
    #mwi-tracker-modal[data-mode="max"] {
        top: 5vh !important; left: 5vw !important; right: auto !important;
        width: 90vw; height: 88vh;
    }
    #mwi-tracker-modal[data-mode="min"] .mwi-r-body { display: none; }
    #mwi-tracker-modal[data-mode="min"] { width: 260px; }

    .mwi-r-head {
        display: flex; align-items: center; gap: 8px;
        padding: 8px 10px; cursor: move; user-select: none;
        background: linear-gradient(180deg, var(--r-panel-2), var(--r-panel));
        border-bottom: 1px solid var(--r-border);
    }
    #mwi-tracker-modal[data-mode="max"] .mwi-r-head { cursor: default; }
    .mwi-r-title { flex: 1; font-size: 14px; font-weight: 700; color: var(--r-accent); letter-spacing: .3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .mwi-r-badge {
        min-width: 22px; padding: 1px 7px; text-align: center;
        font-size: 12px; font-weight: 700; color: var(--r-bg);
        background: var(--r-ok); border-radius: 10px;
    }
    .mwi-r-ctrl { display: flex; gap: 4px; }
    .mwi-r-icon {
        width: 24px; height: 24px; padding: 0; line-height: 1;
        display: flex; align-items: center; justify-content: center;
        color: var(--r-text); background: transparent;
        border: 1px solid var(--r-border); border-radius: 5px;
        cursor: pointer; font-size: 14px; transition: background .15s, border-color .15s;
    }
    .mwi-r-icon:hover { background: var(--r-panel-2); border-color: var(--r-accent); }
    .mwi-r-icon.close:hover { background: var(--r-err); border-color: var(--r-err); }

    .mwi-r-body { display: flex; flex-direction: column; gap: 10px; padding: 10px; flex: 1; min-height: 0; }

    .mwi-r-toolbar { display: flex; gap: 6px; align-items: center; }
    .mwi-r-select {
        flex: 1; padding: 5px 8px; color: var(--r-text);
        background: var(--r-panel); border: 1px solid var(--r-border);
        border-radius: 5px; font-size: 12px; outline: none;
    }
    .mwi-r-select:focus { border-color: var(--r-accent); }

    .mwi-r-btn {
        padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer;
        color: var(--r-text); background: var(--r-panel-2);
        border: 1px solid var(--r-border); border-radius: 5px;
        transition: background .15s, border-color .15s, opacity .15s;
    }
    .mwi-r-btn:hover:not(:disabled) { border-color: var(--r-accent); background: #2d3262; }
    .mwi-r-btn.primary { color: #0e1124; background: var(--r-accent); border-color: var(--r-accent); }
    .mwi-r-btn.primary:hover:not(:disabled) { background: #b0bdf2; }
    .mwi-r-btn:disabled { opacity: .55; cursor: not-allowed; }

    .mwi-r-list {
        flex: 1; min-height: 120px; max-height: 320px; overflow-y: auto;
        list-style: none; margin: 0; padding: 0;
        display: grid; grid-template-columns: 1fr; gap: 6px; align-content: start;
    }
    #mwi-tracker-modal[data-mode="max"] .mwi-r-list {
        max-height: none;
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    }
    .mwi-r-list::-webkit-scrollbar { width: 8px; }
    .mwi-r-list::-webkit-scrollbar-thumb { background: var(--r-border); border-radius: 4px; }

    .mwi-r-card {
        padding: 8px 10px; background: var(--r-panel);
        border: 1px solid var(--r-border); border-left: 3px solid var(--r-ok);
        border-radius: 6px;
    }
    .mwi-r-card.guild { border-left-color: var(--r-accent); }
    .mwi-r-card.fail { border-left-color: var(--r-err); }
    .mwi-r-card.pending { border-left-color: var(--r-muted); }
    .mwi-r-name { font-weight: 700; font-size: 14px; color: var(--r-text); display: flex; justify-content: space-between; gap: 6px; }
    .mwi-r-tag { font-size: 11px; font-weight: 700; color: var(--r-muted); }
    .mwi-r-card:not(.guild):not(.fail):not(.pending) .mwi-r-tag { color: var(--r-ok); }
    .mwi-r-card.fail .mwi-r-tag { color: var(--r-err); }
    .mwi-r-card.guild .mwi-r-tag { color: var(--r-accent); }
    .mwi-r-stats { display: flex; flex-wrap: wrap; gap: 4px 12px; margin-top: 5px; font-size: 12px; color: var(--r-muted); }
    .mwi-r-stats b { color: var(--r-text); font-weight: 600; }
    .mwi-r-empty { padding: 18px 8px; text-align: center; font-style: italic; color: var(--r-muted); background: var(--r-panel); border: 1px dashed var(--r-border); border-radius: 6px; }

    .mwi-r-progress { height: 4px; background: var(--r-panel); border-radius: 2px; overflow: hidden; display: none; }
    .mwi-r-progress > div { height: 100%; width: 0; background: var(--r-accent); transition: width .2s; }

    .mwi-r-actions { display: flex; gap: 8px; }
    .mwi-r-actions .mwi-r-btn { flex: 1; }

    .mwi-r-foot { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 11px; color: var(--r-muted); }
    #mwi-status.ok { color: var(--r-ok); }
    #mwi-status.warn { color: var(--r-warn); }
    #mwi-status.err { color: var(--r-err); }

    #mwi-radar-launcher {
        position: fixed; bottom: 16px; right: 16px; z-index: 99998; display: none;
        width: 44px; height: 44px; align-items: center; justify-content: center;
        font-size: 20px; cursor: pointer; color: var(--r-accent);
        background: var(--r-panel); border: 1px solid var(--r-border);
        border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,.5);
    }
    #mwi-radar-launcher:hover { border-color: var(--r-accent); background: var(--r-panel-2); }
    `;

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
                <span class="mwi-r-title">📡 Radar Recrutement</span>
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
                    <button class="mwi-r-btn" id="mwi-btn-copy" title="Copier les pseudos affichés">Copier</button>
                    <button class="mwi-r-btn" id="mwi-btn-clear" title="Vider la liste">Vider</button>
                </div>
                <ul class="mwi-r-list" id="mwi-tracker-list"></ul>
                <div class="mwi-r-progress" id="mwi-progress"><div id="mwi-progress-bar"></div></div>
                <div class="mwi-r-actions">
                    <button class="mwi-r-btn" id="mwi-btn-scan">1. Scanner Chat</button>
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
        launcher.title = 'Ouvrir le Radar';
        launcher.textContent = '📡';
        document.body.appendChild(launcher);

        const saved = loadUI();
        if (saved.left && saved.top) {
            modal.style.left = saved.left; modal.style.top = saved.top; modal.style.right = 'auto';
        }
        setMode(saved.mode === 'max' || saved.mode === 'min' ? saved.mode : 'normal');
        setVisible(saved.visible !== false);

        document.getElementById('mwi-btn-scan').addEventListener('click', window.mwiScanChat);
        document.getElementById('mwi-btn-process').addEventListener('click', processUnverifiedProfiles);
        document.getElementById('mwi-btn-close').addEventListener('click', () => setVisible(false));
        launcher.addEventListener('click', () => setVisible(true));
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
        document.getElementById('mwi-btn-copy').addEventListener('click', copyVisibleNames);
        document.getElementById('mwi-btn-clear').addEventListener('click', () => {
            if (isProcessing) return;
            recrues.clear();
            setStatus('Liste vidée.', '');
            updateModalUI();
        });

        enableDrag(modal, document.getElementById('mwi-r-head'));
        updateModalUI();
    }

    function playerCategory(p) {
        if (!p.verifie) return 'pending';
        if (p.echec) return 'fail';
        return p.hasGuild ? 'guild' : 'free';
    }

    function visiblePlayers() {
        return Array.from(recrues.values()).filter(p => currentFilter === 'all' || playerCategory(p) === currentFilter);
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

        const all = Array.from(recrues.values());
        const counts = { free: 0, guild: 0, fail: 0, pending: 0 };
        all.forEach(p => counts[playerCategory(p)]++);

        const badge = document.getElementById('mwi-badge');
        if (badge) badge.textContent = counts.free;
        const countsEl = document.getElementById('mwi-counts');
        if (countsEl) countsEl.textContent = `${all.length} scannés · ${counts.pending} en file`;

        const players = visiblePlayers();
        if (players.length === 0) {
            const msgs = {
                free: 'Aucun joueur sans guilde pour le moment.\nClique sur Scanner puis Vérifier.',
                guild: 'Aucun joueur en guilde.',
                fail: 'Aucun échec de lecture.',
                pending: 'Aucun joueur en attente.',
                all: 'Aucun joueur scanné.'
            };
            list.innerHTML = `<li class="mwi-r-empty" style="white-space: pre-line;">${msgs[currentFilter]}</li>`;
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
            return `<li class="mwi-r-card ${cat}">
                <div class="mwi-r-name"><span style="${nameStyle}">${esc(p.nom)}</span><span class="mwi-r-tag">${tag}</span></div>
                ${stats}
            </li>`;
        }).join('');
    }

    // ---------------------------------------------------------------
    // 4. Lecture du profil
    // ---------------------------------------------------------------
    function findProfileModal(username) {
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
                if (t.toLowerCase().includes(needle) && t.includes('Combat Level')) {
                    return { el, labels: labels.length };
                }
            }
        }
        return { el: null, labels: labels.length };
    }

    function parseProfile(text) {
        const guildMatch = text.match(/^\s*([A-Za-z]+) of\s+(.+)$/m);
        const hasGuild = !!guildMatch;

        const grabNumber = (label) => {
            const m = text.match(new RegExp(label + '\\s*(\\d[\\d \\u00a0\\u202f\\u2009,.]*)', 'i'));
            return m ? m[1].replace(/\D/g, '') : "?";
        };

        const ageMatch = text.match(/\bAge\s+((?:\d+y\s*)?\d+d)/i);

        return {
            hasGuild,
            rang: guildMatch ? guildMatch[1] : '',
            guilde: guildMatch ? guildMatch[2].trim() : '',
            stats: {
                total: grabNumber('Total Level'),
                combat: grabNumber('Combat Level'),
                age: ageMatch ? ageMatch[1].trim() : "?"
            }
        };
    }

    async function analyzeProfile(username) {
        const playerData = recrues.get(username);
        if (!playerData) return true;

        let found = { el: null, labels: 0 };
        const maxTours = Math.ceil(ATTENTE_PROFIL_MS / POLL_MS);
        for (let i = 0; i < maxTours; i++) {
            await sleep(POLL_MS);
            found = findProfileModal(username);
            if (found.el) break;
        }

        if (!found.el) {
            return false;
        }

        await sleep(100);
        const text = found.el.innerText;
        const result = parseProfile(text);

        playerData.verifie = true;
        playerData.echec = false;
        playerData.hasGuild = result.hasGuild;
        playerData.guilde = result.guilde;
        playerData.rang = result.rang;
        playerData.stats = result.stats;

        const closeBtn = found.el.querySelector('button[aria-label="Close"], [class*="close" i], svg[class*="close" i]');
        if (closeBtn) {
            (closeBtn.closest('button') || closeBtn).click();
        } else {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
        }

        await sleep(150);
        return true;
    }

    // ---------------------------------------------------------------
    // 5. Boucle de vérification
    // ---------------------------------------------------------------
    async function processUnverifiedProfiles() {
        if (isProcessing) return;

        const toVerify = Array.from(recrues.values()).filter(p => !p.verifie).length;
        if (toVerify === 0) {
            setStatus('Aucun nouveau profil à vérifier.', 'warn');
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
        for (const [username, data] of recrues.entries()) {
            if (data.verifie) continue;
            index++;
            setStatus(`Vérification ${index}/${toVerify} : ${username}...`, '');

            let ok = false;
            for (let essai = 1; essai <= MAX_ESSAIS && !ok; essai++) {
                if (!window.mwiSendProfileCommand(username)) break;
                ok = await analyzeProfile(username);
            }

            if (!ok) {
                data.verifie = true;
                data.echec = true;
            }
            bar.style.width = `${Math.round((index / toVerify) * 100)}%`;
            updateModalUI();
        }

        isProcessing = false;
        btn.disabled = false;
        scanBtn.disabled = false;
        btn.textContent = '2. Vérifier Profils';
        progress.style.display = 'none';
        setStatus('Vérification terminée.', 'ok');
        updateModalUI();
    }

    // Attente que la page soit prête pour injecter l'interface
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createTrackerModal);
    } else {
        setTimeout(createTrackerModal, 1000);
    }

    console.log("%c[Radar] Script chargé.", "color: #98a7e9; font-weight: bold; font-size: 14px;");

})();