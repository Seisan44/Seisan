// Info-bulles légères : termes de glossaire, abréviations, objets d'inventaire.
// Distinctes des modales de détail : pas de fond flouté, apparition/disparition rapides,
// ne doivent jamais capturer le focus au clavier au point de bloquer la lecture.

import { qs } from './utils.js';
import { getGlossaryEntry } from './enrich.js';
import { escapeHtml } from './utils.js';

let popEl = null;
let hideTimer = null;
let currentTrigger = null;

function ensurePopEl(){
  if(popEl) return popEl;
  popEl = document.createElement('div');
  popEl.className = 'popover';
  popEl.setAttribute('role', 'tooltip');
  qs('#popover-root').appendChild(popEl);
  popEl.addEventListener('mouseenter', cancelHide);
  popEl.addEventListener('mouseleave', scheduleHide);
  return popEl;
}

function cancelHide(){ if(hideTimer){ clearTimeout(hideTimer); hideTimer = null; } }
function scheduleHide(delay=180){
  cancelHide();
  hideTimer = setTimeout(() => hidePopover(), delay);
}

export function hidePopover(){
  cancelHide();
  if(popEl) popEl.classList.remove('is-visible');
  currentTrigger = null;
}

function position(triggerEl){
  const el = ensurePopEl();
  const r = triggerEl.getBoundingClientRect();
  const margin = 10;
  el.style.maxWidth = Math.min(300, window.innerWidth - margin*2) + 'px';
  // mesure d'abord hors écran pour connaître sa taille réelle
  el.style.left = '-9999px'; el.style.top = '-9999px';
  el.classList.add('is-visible');
  const pr = el.getBoundingClientRect();
  let left = r.left + r.width/2 - pr.width/2;
  left = Math.max(margin, Math.min(left, window.innerWidth - pr.width - margin));
  let top = r.bottom + 8;
  if(top + pr.height > window.innerHeight - margin){
    top = r.top - pr.height - 8;
  }
  top = Math.max(margin, top);
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}

export function showPopoverHTML(triggerEl, html){
  cancelHide();
  currentTrigger = triggerEl;
  const el = ensurePopEl();
  el.innerHTML = html;
  position(triggerEl);
}

function glossaryPopoverHTML(id){
  const entry = getGlossaryEntry(id);
  if(!entry) return null;
  const catLabel = { 'mécanique':'Mécanique', 'action':'Action', 'etat':'État', 'combat':'Combat', 'magie':'Magie',
    'exploration':'Exploration', 'repos':'Repos', 'déplacement':'Déplacement', 'zone-d-effet':'Zone d’effet' }[entry.categorie] || entry.categorie;
  return `
    <div class="popover-title"><span>${escapeHtml(entry.terme)}</span><span class="popover-cat">${escapeHtml(catLabel||'')}</span></div>
    <div>${escapeHtml(entry.description).slice(0, 320)}${entry.description.length>320?'…':''}</div>
    <a class="popover-more" href="#glossaire/${entry.id}">Voir dans le glossaire →</a>
  `;
}

/** Délégation globale : tout élément portant data-glossary-id ou data-abbr-def déclenche une popover. */
export function initGlossaryPopovers(){
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('.term-link');
    if(!t) return;
    handleTrigger(t);
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target.closest('.term-link');
    if(!t) return;
    if(!e.relatedTarget || !popEl?.contains(e.relatedTarget)) scheduleHide();
  });
  document.addEventListener('focusin', (e) => {
    const t = e.target.closest?.('.term-link');
    if(t) handleTrigger(t);
  });
  document.addEventListener('focusout', (e) => {
    const t = e.target.closest?.('.term-link');
    if(t) scheduleHide(50);
  });
  document.addEventListener('click', (e) => {
    const t = e.target.closest('.term-link');
    if(!t) return;
    if(t.matches('a')) return;
    e.preventDefault();
    if(currentTrigger === t && popEl?.classList.contains('is-visible')){ hidePopover(); return; }
    handleTrigger(t);
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') hidePopover();
  });
  window.addEventListener('scroll', () => hidePopover(), true);
  window.addEventListener('resize', () => hidePopover());
}

function handleTrigger(t){
  let html = null;
  if(t.dataset.glossaryId) html = glossaryPopoverHTML(t.dataset.glossaryId);
  else if(t.dataset.abbrDef){
    html = `<div class="popover-title"><span>${escapeHtml(t.dataset.abbrCode||'')}</span><span class="popover-cat">Abréviation</span></div><div>${escapeHtml(t.dataset.abbrDef)}</div>`;
  }
  if(html) showPopoverHTML(t, html);
}

/** API générique utilisée par la fiche de personnage pour les objets d'inventaire, etc. */
export function attachPopover(el, htmlOrFn){
  el.addEventListener('mouseenter', () => {
    const html = typeof htmlOrFn === 'function' ? htmlOrFn() : htmlOrFn;
    showPopoverHTML(el, html);
  });
  el.addEventListener('mouseleave', () => scheduleHide());
  el.addEventListener('focus', () => {
    const html = typeof htmlOrFn === 'function' ? htmlOrFn() : htmlOrFn;
    showPopoverHTML(el, html);
  });
  el.addEventListener('blur', () => scheduleHide(50));
}
