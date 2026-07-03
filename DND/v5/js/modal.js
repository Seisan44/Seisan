// Système de fenêtres de détail flottantes (sorts, dons, objets, historiques...).
// Ouverture animée depuis la carte cliquée, fond flouté, piège à focus, Échap,
// clic extérieur, défilement interne.

import { qs, qsa, lockBodyScroll, unlockBodyScroll, trapFocus } from './utils.js';

let backdropEl = null;
let lastFocused = null;
let onKeydown = null;

function ensureRoot(){
  return qs('#overlay-root');
}

export function isModalOpen(){
  return !!backdropEl;
}

export function closeModal(){
  if(!backdropEl) return;
  const el = backdropEl;
  backdropEl = null;
  el.classList.remove('is-visible');
  document.removeEventListener('keydown', onKeydown);
  unlockBodyScroll();
  const focusTarget = lastFocused;
  window.setTimeout(() => {
    el.remove();
    if(focusTarget && document.contains(focusTarget)) focusTarget.focus();
  }, 260);
}

/**
 * @param {Object} opts
 * @param {string} opts.eyebrow - petite étiquette au-dessus du titre
 * @param {string} opts.title
 * @param {string} [opts.bodyHTML]
 * @param {(body:HTMLElement)=>void} [opts.build] - alternative à bodyHTML pour construire le contenu en JS
 * @param {HTMLElement} [opts.originEl] - élément déclencheur, sert d'origine à l'animation
 * @param {string} [opts.wide]
 */
export function openModal({ eyebrow='', title='', bodyHTML='', build=null, originEl=null, wide=false } = {}){
  closeModal();
  lastFocused = originEl || document.activeElement;

  const root = ensureRoot();
  const backdrop = document.createElement('div');
  backdrop.className = 'overlay-backdrop';
  backdrop.setAttribute('role', 'presentation');

  if(originEl){
    const r = originEl.getBoundingClientRect();
    backdrop.style.setProperty('--origin-x', `${r.left + r.width/2}px`);
    backdrop.style.setProperty('--origin-y', `${r.top + r.height/2}px`);
  }

  const panel = document.createElement('div');
  panel.className = 'overlay-panel';
  if(wide) panel.style.maxWidth = '960px';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('tabindex', '-1');
  const titleId = 'modal-title-' + Date.now();
  panel.setAttribute('aria-labelledby', titleId);

  panel.innerHTML = `
    <div class="overlay-head">
      <div>
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
        <h2 id="${titleId}" style="font-size:1.5rem;margin:0;">${title}</h2>
      </div>
      <button class="overlay-close" aria-label="Fermer la fenêtre"><svg class="i"><use href="#i-close"/></svg></button>
    </div>
    <div class="overlay-body reading prose"></div>
  `;
  const bodyEl = qs('.overlay-body', panel);
  if(build) build(bodyEl);
  else bodyEl.innerHTML = bodyHTML;

  backdrop.appendChild(panel);
  root.appendChild(backdrop);
  root.setAttribute('aria-hidden', 'false');
  backdropEl = backdrop;
  lockBodyScroll();

  requestAnimationFrame(() => backdrop.classList.add('is-visible'));

  qs('.overlay-close', panel).addEventListener('click', () => closeModal());
  backdrop.addEventListener('mousedown', (e) => { if(e.target === backdrop) closeModal(); });

  onKeydown = (e) => {
    if(e.key === 'Escape'){ e.preventDefault(); closeModal(); }
    else trapFocus(panel, e);
  };
  document.addEventListener('keydown', onKeydown);

  window.setTimeout(() => panel.focus(), 30);

  // Délègue les clics sur les cartes/liens internes qui doivent ouvrir un autre détail
  return { panel, bodyEl, close: closeModal };
}
