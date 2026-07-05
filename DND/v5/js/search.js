// Palette de commandes : recherche globale (sorts, dons, glossaire, équipement, classes...)
// déclenchée par Ctrl/Cmd+K ou le bouton loupe du header.

import { DATA } from './data.js';
import { qs, debounce, escapeHtml, lockBodyScroll, unlockBodyScroll, trapFocus } from './utils.js';
import { navigate } from './router.js';
import { isBeginnerMode } from './beginner.js';

const BEGINNER_HIDDEN_CATS = new Set(['Dons', 'Équipement', 'Historiques']);

let backdrop = null;
let inputEl, resultsEl;
let activeIndex = 0;
let currentResults = [];
let onKeydown = null;

const CAT_ICONS = {
  'Races':'i-races', 'Classes':'i-classes', 'Dons':'i-dons', 'Sorts':'i-sorts',
  'Équipement':'i-equip', 'Glossaire':'i-glossaire', 'Historiques':'i-histo', 'Référence':'i-combat',
};

function close(){
  if(!backdrop) return;
  const el = backdrop;
  backdrop = null;
  el.classList.remove('is-visible');
  document.removeEventListener('keydown', onKeydown);
  unlockBodyScroll();
  window.setTimeout(() => el.remove(), 220);
}

function runSearch(q){
  const query = q.trim().toLowerCase();
  if(!query){
    currentResults = [];
    renderEmpty('Tapez pour chercher un sort, un don, une règle, un objet…');
    return;
  }
  const beginner = isBeginnerMode();
  const scored = [];
  for(const item of DATA.searchIndex){
    if(beginner && BEGINNER_HIDDEN_CATS.has(item.cat)) continue;
    const label = item.label.toLowerCase();
    const sub = (item.sub||'').toLowerCase();
    let score = -1;
    if(label === query) score = 100;
    else if(label.startsWith(query)) score = 80;
    else if(label.includes(query)) score = 60;
    else if(sub.includes(query)) score = 20;
    if(score >= 0) scored.push({ item, score });
  }
  scored.sort((a,b) => b.score - a.score || a.item.label.localeCompare(b.item.label));
  currentResults = scored.slice(0, 60).map(s => s.item);
  activeIndex = 0;
  renderResults();
}

function renderEmpty(msg){
  resultsEl.innerHTML = `<div class="cmdk-empty">${escapeHtml(msg)}</div>`;
}

function renderResults(){
  if(currentResults.length === 0){ renderEmpty('Aucun résultat.'); return; }
  const groups = new Map();
  for(const item of currentResults){
    if(!groups.has(item.cat)) groups.set(item.cat, []);
    groups.get(item.cat).push(item);
  }
  let html = '';
  let i = 0;
  for(const [cat, items] of groups){
    html += `<div class="cmdk-group-label">${escapeHtml(cat)}</div>`;
    for(const item of items){
      const idx = i++;
      html += `<div class="cmdk-item" data-idx="${idx}" role="option" id="cmdk-opt-${idx}">
        <svg class="i"><use href="#${CAT_ICONS[item.cat]||'i-search'}"/></svg>
        <span>${escapeHtml(item.label)}</span>
        <span class="cmdk-item-sub">${escapeHtml(item.sub||'')}</span>
      </div>`;
    }
  }
  resultsEl.innerHTML = html;
  updateActiveVisual();
  resultsEl.querySelectorAll('.cmdk-item').forEach(el => {
    el.addEventListener('mouseenter', () => { activeIndex = Number(el.dataset.idx); updateActiveVisual(); });
    el.addEventListener('click', () => selectItem(currentResults[Number(el.dataset.idx)]));
  });
}

function updateActiveVisual(){
  resultsEl.querySelectorAll('.cmdk-item').forEach(el => {
    el.classList.toggle('is-active', Number(el.dataset.idx) === activeIndex);
  });
  const active = resultsEl.querySelector('.cmdk-item.is-active');
  if(active) active.scrollIntoView({ block:'nearest' });
}

function selectItem(item){
  if(!item) return;
  const hash = item.key ? `${item.route}/${item.key}${item.sub2 ? '/'+item.sub2 : ''}` : item.route;
  close();
  navigate(hash);
}

const debouncedSearch = debounce((q) => runSearch(q), 120);

export function openCommandPalette(){
  if(backdrop) return;
  const root = qs('#overlay-root');
  backdrop = document.createElement('div');
  backdrop.className = 'overlay-backdrop';
  backdrop.innerHTML = `
    <div class="overlay-panel cmdk-panel" role="dialog" aria-modal="true" aria-label="Recherche globale" tabindex="-1">
      <div class="cmdk-input-wrap">
        <svg class="i"><use href="#i-search"/></svg>
        <input type="text" class="cmdk-input" placeholder="Rechercher un sort, un don, un objet, une règle…" role="combobox" aria-expanded="true" aria-controls="cmdk-results" autocomplete="off">
      </div>
      <div class="cmdk-results" id="cmdk-results" role="listbox"></div>
      <div class="cmdk-hint">
        <span><span class="kbd">↑↓</span> naviguer</span>
        <span><span class="kbd">Entrée</span> ouvrir</span>
        <span><span class="kbd">Échap</span> fermer</span>
      </div>
    </div>`;
  root.appendChild(backdrop);
  inputEl = qs('.cmdk-input', backdrop);
  resultsEl = qs('.cmdk-results', backdrop);
  renderEmpty('Tapez pour chercher un sort, un don, une règle, un objet…');
  lockBodyScroll();
  requestAnimationFrame(() => backdrop.classList.add('is-visible'));
  window.setTimeout(() => inputEl.focus(), 30);

  inputEl.addEventListener('input', () => debouncedSearch(inputEl.value));
  backdrop.addEventListener('mousedown', (e) => { if(e.target === backdrop) close(); });

  onKeydown = (e) => {
    if(e.key === 'Escape'){ e.preventDefault(); close(); return; }
    if(e.key === 'ArrowDown'){ e.preventDefault(); activeIndex = Math.min(activeIndex+1, currentResults.length-1); updateActiveVisual(); return; }
    if(e.key === 'ArrowUp'){ e.preventDefault(); activeIndex = Math.max(activeIndex-1, 0); updateActiveVisual(); return; }
    if(e.key === 'Enter'){ e.preventDefault(); selectItem(currentResults[activeIndex]); return; }
    trapFocus(backdrop.querySelector('.overlay-panel'), e);
  };
  document.addEventListener('keydown', onKeydown);
}

export function initCommandPalette(){
  qs('#search-trigger').addEventListener('click', openCommandPalette);
  document.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
      e.preventDefault();
      backdrop ? close() : openCommandPalette();
    }
  });
}
