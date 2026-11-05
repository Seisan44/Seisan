// Paramètres de l'application : mode expérimental (fiche mobile), thème, taille et police du texte.
// Le mode expérimental est un simple réglage d'affichage : la fiche lit et écrit les mêmes
// données de personnage dans les deux interfaces.

import { el, escapeHtml, storeGet, storeSet } from './utils.js';
import { openModal, toast } from './ui.js';
import { getCurrentRoute, applySkin } from './router.js';
import { isSrdOnly, setSrdOnly } from './data.js';
import {
  toggleTheme, currentTheme, cycleFontScale, FONT_FAMILIES, currentFontFamily, applyFontFamily,
} from './theme.js';

const KEY = 'grimoire.experimentalMode';
const TRACKER_KEY = 'grimoire.combatTracker';

// Suivi du tour (action, action bonus, réaction, déplacement) : activé par défaut.
export function isCombatTrackerOn(){
  return storeGet(TRACKER_KEY, true) !== false;
}

export function setCombatTracker(on){
  storeSet(TRACKER_KEY, !!on);
  document.dispatchEvent(new CustomEvent('grimoire:settings', { detail: { combatTracker: !!on } }));
  if(getCurrentRoute() === 'personnages') window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function isExperimental(){
  return storeGet(KEY, false) === true;
}

export function setExperimental(on){
  storeSet(KEY, !!on);
  document.dispatchEvent(new CustomEvent('grimoire:settings', { detail: { experimental: !!on } }));
  // Bascule instantanée : la page de personnage se redessine dans l'autre interface.
  if(getCurrentRoute() === 'personnages') window.dispatchEvent(new HashChangeEvent('hashchange'));
}

function switchHTML(id, on, label){
  return `<button type="button" id="${id}" class="switch ${on ? 'is-on' : ''}" role="switch" aria-checked="${on}" aria-label="${escapeHtml(label)}">
    <span class="switch-knob" aria-hidden="true"></span>
    <span class="switch-state" aria-hidden="true">${on ? 'ON' : 'OFF'}</span>
  </button>`;
}

export function openSettings(){
  const node = el('div', { class: 'settings' });
  const fontScale = () => Math.round((Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale')) || 1) * 100);

  const render = () => {
    const exp = isExperimental();
    const tracker = isCombatTrackerOn();
    const srdOnly = isSrdOnly();
    node.innerHTML = `
      <section class="settings-block">
        <h3 class="st-label">Fiche de personnage</h3>
        <div class="settings-row">
          <div class="settings-text">
            <strong>Mode expérimental</strong>
            <p>Remplace la fiche classique par une fiche pensée pour le téléphone, avec un menu à cinq directions
            inspiré des jeux de rôle. Les deux fiches utilisent exactement les mêmes données : tu peux basculer à tout moment,
            rien n'est perdu.</p>
            <p class="settings-hint">${exp ? 'Mode expérimental activé.' : 'Mode classique : la fiche garde sa présentation habituelle.'}</p>
          </div>
          ${switchHTML('set-experimental', exp, 'Mode expérimental')}
        </div>
        <div class="settings-row">
          <div class="settings-text">
            <strong>Suivi de combat</strong>
            <p>Affiche, dans l'onglet Actions, le suivi du tour : action, action bonus, réaction et déplacement restants.
            Désactive-le si tu n'en as pas besoin ; rien d'autre ne change sur la fiche.</p>
          </div>
          ${switchHTML('set-tracker', tracker, 'Suivi de combat')}
        </div>
      </section>
      <section class="settings-block">
        <h3 class="st-label">Affichage</h3>
        <div class="settings-row">
          <div class="settings-text"><strong>Thème</strong><p>Nuit arcanique ou parchemin.</p></div>
          <button type="button" class="btn btn-sm" id="set-theme">${currentTheme() === 'jour' ? 'Passer à la nuit' : 'Passer au parchemin'}</button>
        </div>
        <div class="settings-row">
          <div class="settings-text"><strong>Taille du texte</strong><p>Actuellement ${fontScale()} %.</p></div>
          <button type="button" class="btn btn-sm" id="set-fontsize">Agrandir</button>
        </div>
        <div class="settings-row">
          <div class="settings-text"><strong>Police du texte</strong>
            <select class="select" id="set-font" aria-label="Police du texte">
              ${FONT_FAMILIES.map(f => `<option value="${f.key}" ${f.key === currentFontFamily() ? 'selected' : ''}>${escapeHtml(f.label)} — ${escapeHtml(f.desc)}</option>`).join('')}
            </select>
          </div>
        </div>
      </section>
      <section class="settings-block">
        <h3 class="st-label">Contenu</h3>
        <div class="settings-row">
          <div class="settings-text">
            <strong>SRD 5.2.1 uniquement</strong>
            <p>N'affiche que le contenu libre du <em>System Reference Document 5.2.1</em> (CC-BY-4.0) : 12 sous-classes,
            4 historiques, 10 dons, 339 sorts, 257 monstres… Le reste (Manuel des joueurs, Manuel des monstres et Guide du
            maître 2024) est masqué des listes ; tes personnages existants restent lisibles. La page se recharge.</p>
          </div>
          ${switchHTML('set-srd', srdOnly, 'SRD 5.2.1 uniquement')}
        </div>
        <p class="settings-hint">Ce travail inclut du contenu du System Reference Document 5.2.1 (« SRD 5.2.1 ») de
        Wizards of the Coast LLC, disponible sur <a href="https://www.dndbeyond.com/srd" target="_blank" rel="noopener">dndbeyond.com/srd</a>,
        sous licence <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noopener">Creative Commons Attribution 4.0</a>.</p>
      </section>`;

    node.querySelector('#set-experimental').addEventListener('click', () => {
      const next = !isExperimental();
      setExperimental(next);
      toast(next ? 'Mode expérimental activé.' : 'Mode classique rétabli.', { icon: next ? '🧪' : '📜' });
      render();
      node.querySelector('#set-experimental')?.focus();
    });
    node.querySelector('#set-tracker').addEventListener('click', () => {
      const next = !isCombatTrackerOn();
      setCombatTracker(next);
      toast(next ? 'Suivi de combat activé.' : 'Suivi de combat masqué.', { icon: next ? '⚔️' : '🙈' });
      render();
      node.querySelector('#set-tracker')?.focus();
    });
    node.querySelector('#set-theme').addEventListener('click', () => { toggleTheme(); applySkin(); render(); });
    node.querySelector('#set-fontsize').addEventListener('click', () => { cycleFontScale(); render(); });
    node.querySelector('#set-font').addEventListener('change', (e) => { applyFontFamily(e.target.value); });
    node.querySelector('#set-srd').addEventListener('click', () => {
      setSrdOnly(!isSrdOnly());
      location.reload();
    });
  };

  render();
  openModal({ title: 'Paramètres', node, className: 'modal-sm modal-settings' });
}
