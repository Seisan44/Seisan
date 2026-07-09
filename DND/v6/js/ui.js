// Système d'overlays du Grimoire : modale, popover de glossaire, toasts, confirmation.

import { el, qs, escapeHtml, lockBodyScroll, unlockBodyScroll, trapFocus } from './utils.js';

/* ---------------------------------- Modale ---------------------------------- */

let modalStack = [];

export function openModal({ title = '', html = '', node = null, className = '', onClose = null } = {}){
  const overlay = el('div', { class: 'modal-overlay', role: 'presentation' });
  const dialog = el('div', {
    class: `modal ${className}`,
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': title || 'Fenêtre',
  });
  const head = el('header', { class: 'modal-head' }, [
    el('h2', { class: 'modal-title', html: title }),
    el('button', {
      class: 'icon-btn modal-close', type: 'button', 'aria-label': 'Fermer',
      onclick: () => close(),
      html: '<svg class="icon"><use href="#i-close"/></svg>',
    }),
  ]);
  const body = el('div', { class: 'modal-body' });
  if(node) body.appendChild(node);
  else body.innerHTML = html;

  dialog.append(head, body);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  lockBodyScroll();

  const prevFocus = document.activeElement;
  const entry = { overlay, close, prevFocus, onClose };
  modalStack.push(entry);

  function close(){
    const i = modalStack.indexOf(entry);
    if(i === -1) return;
    modalStack.splice(i, 1);
    overlay.classList.add('is-closing');
    setTimeout(() => overlay.remove(), 180);
    unlockBodyScroll();
    entry.onClose?.();
    if(entry.prevFocus?.focus) entry.prevFocus.focus();
  }

  overlay.addEventListener('pointerdown', (e) => { if(e.target === overlay) close(); });
  dialog.addEventListener('keydown', (e) => trapFocus(dialog, e));
  setTimeout(() => {
    overlay.classList.add('is-open');
    (dialog.querySelector('.modal-close') || dialog).focus();
  }, 10);

  return { close, dialog, body };
}

export function closeTopModal(){
  const top = modalStack[modalStack.length - 1];
  if(top){ top.close(); return true; }
  return false;
}

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    if(closePopover()) { e.stopPropagation(); return; }
    if(closeTopModal()) e.stopPropagation();
  }
}, true);

/* ------------------------------- Confirmation ------------------------------- */

export function confirmDialog({ title = 'Confirmer', message = '', confirmLabel = 'Confirmer', danger = false } = {}){
  return new Promise((resolve) => {
    const node = el('div', { class: 'confirm-box' }, [
      el('p', { class: 'confirm-message', html: message }),
      el('div', { class: 'confirm-actions' }, [
        el('button', { class: 'btn btn-ghost', type: 'button', text: 'Annuler', onclick: () => { resolve(false); m.close(); } }),
        // resolve AVANT close : close() déclenche onClose → resolve(false), et une
        // promesse déjà réglée ignore ce second resolve.
        el('button', { class: `btn ${danger ? 'btn-danger' : 'btn-primary'}`, type: 'button', text: confirmLabel, onclick: () => { resolve(true); m.close(); } }),
      ]),
    ]);
    const m = openModal({ title, node, className: 'modal-sm', onClose: () => resolve(false) });
  });
}

/* ---------------------------------- Toasts ---------------------------------- */

let toastZone = null;
export function toast(message, { icon = '✦', duration = 2600 } = {}){
  if(!toastZone){
    toastZone = el('div', { class: 'toast-zone', 'aria-live': 'polite' });
    document.body.appendChild(toastZone);
  }
  const t = el('div', { class: 'toast', html: `<span class="toast-icon">${icon}</span><span>${escapeHtml(message)}</span>` });
  toastZone.appendChild(t);
  setTimeout(() => t.classList.add('is-open'), 10);
  setTimeout(() => {
    t.classList.remove('is-open');
    setTimeout(() => t.remove(), 300);
  }, duration);
}

/* ----------------------------- Popover de glossaire ----------------------------- */

let popoverNode = null;
let popoverAnchor = null;

export function closePopover(){
  if(!popoverNode) return false;
  popoverNode.remove();
  popoverNode = null;
  popoverAnchor = null;
  return true;
}

export function openPopover(anchor, { title = '', category = '', bodyHTML = '', footHTML = '' } = {}){
  if(popoverAnchor === anchor){ closePopover(); return; }
  closePopover();
  popoverAnchor = anchor;

  popoverNode = el('div', { class: 'popover', role: 'dialog', 'aria-label': title }, []);
  popoverNode.innerHTML =
    `<div class="popover-head">`
    + `<span class="popover-title">${title}</span>`
    + (category ? `<span class="popover-cat">${escapeHtml(category)}</span>` : '')
    + `</div>`
    + `<div class="popover-body">${bodyHTML}</div>`
    + (footHTML ? `<div class="popover-foot">${footHTML}</div>` : '');
  document.body.appendChild(popoverNode);

  // Positionnement : sous l'ancre, recalé dans la fenêtre.
  const r = anchor.getBoundingClientRect();
  const pw = Math.min(360, window.innerWidth - 24);
  popoverNode.style.width = pw + 'px';
  let left = r.left + r.width / 2 - pw / 2;
  left = Math.max(12, Math.min(left, window.innerWidth - pw - 12));
  const ph = popoverNode.offsetHeight;
  let top = r.bottom + 10;
  let placement = 'bottom';
  if(top + ph > window.innerHeight - 12 && r.top - ph - 10 > 12){
    top = r.top - ph - 10;
    placement = 'top';
  }
  popoverNode.style.left = left + window.scrollX + 'px';
  popoverNode.style.top = top + window.scrollY + 'px';
  popoverNode.dataset.placement = placement;
  const arrowX = r.left + r.width / 2 - left;
  popoverNode.style.setProperty('--arrow-x', Math.max(16, Math.min(pw - 16, arrowX)) + 'px');
  setTimeout(() => popoverNode?.classList.add('is-open'), 10);
}

document.addEventListener('pointerdown', (e) => {
  if(popoverNode && !popoverNode.contains(e.target) && e.target !== popoverAnchor && !popoverAnchor?.contains?.(e.target)){
    closePopover();
  }
});
window.addEventListener('scroll', () => closePopover(), { passive: true });

/* ------------------------------ Infobulles ------------------------------
   Remplace les bulles natives (attribut title, grises et lentes) par une
   infobulle stylée. Délégation globale : au survol, le `title` est déplacé
   vers data-tip (ce qui désactive la bulle native) puis affiché joliment. */

let tipNode = null;
let tipTarget = null;
let tipTimer = null;

function hideTooltip(){
  clearTimeout(tipTimer);
  tipTimer = null;
  tipTarget = null;
  tipNode?.classList.remove('is-open');
}

function showTooltip(target){
  const text = target.dataset.tip;
  if(!text) return;
  if(!tipNode){
    tipNode = el('div', { class: 'ui-tip', role: 'tooltip' });
    document.body.appendChild(tipNode);
  }
  tipNode.textContent = text;
  tipNode.dataset.placement = 'top';
  const tw = tipNode.offsetWidth;
  const th = tipNode.offsetHeight;
  const r = target.getBoundingClientRect();
  let left = r.left + r.width / 2 - tw / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
  let top = r.top - th - 10;
  if(top < 8){
    top = r.bottom + 10;
    tipNode.dataset.placement = 'bottom';
  }
  tipNode.style.left = left + 'px';
  tipNode.style.top = top + 'px';
  const arrowX = r.left + r.width / 2 - left;
  tipNode.style.setProperty('--arrow-x', Math.max(14, Math.min(tw - 14, arrowX)) + 'px');
  tipNode.classList.add('is-open');
}

export function initTooltips(){
  const enter = (e) => {
    const t = e.target.closest?.('[title], [data-tip]');
    if(!t) return;
    if(t.hasAttribute('title')){
      const v = t.getAttribute('title');
      t.removeAttribute('title');
      if(v && v.trim()) t.dataset.tip = v.trim();
    }
    if(!t.dataset.tip || t === tipTarget) return;
    tipTarget = t;
    clearTimeout(tipTimer);
    tipTimer = setTimeout(() => { if(tipTarget === t) showTooltip(t); }, 140);
  };
  document.addEventListener('mouseover', enter);
  document.addEventListener('mouseout', (e) => {
    if(tipTarget && !tipTarget.contains(e.relatedTarget)) hideTooltip();
  });
  document.addEventListener('focusin', enter);
  document.addEventListener('focusout', hideTooltip);
  window.addEventListener('scroll', hideTooltip, { passive: true, capture: true });
  document.addEventListener('pointerdown', hideTooltip, true);
}
