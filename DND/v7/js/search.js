// Recherche globale (Ctrl/Cmd+K) : palette traversant tout le compendium.

import { el, qs, qsa, escapeHtml, stripAccents, debounce, lockBodyScroll, unlockBodyScroll, trapFocus } from './utils.js';
import { DATA } from './data.js';
import { navigate } from './router.js';

let palette = null;
let results = [];
let selected = 0;

function norm(s){ return stripAccents(String(s || '')).toLowerCase(); }

function searchAll(query){
  const q = norm(query).trim();
  if(q.length < 2) return [];
  const words = q.split(/\s+/);
  const scored = [];
  for(const item of DATA.searchIndex){
    const label = norm(item.label);
    const sub = norm(item.sub);
    let score = 0;
    let ok = true;
    for(const w of words){
      if(label.startsWith(w)) score += 30;
      else if(label.includes(w)) score += 18;
      else if(sub.includes(w)) score += 6;
      else { ok = false; break; }
    }
    if(!ok) continue;
    if(label === q) score += 40;
    scored.push({ item, score });
  }
  scored.sort((a, b) => b.score - a.score || a.item.label.localeCompare(b.item.label));
  return scored.slice(0, 24).map(s => s.item);
}

function renderResults(query){
  const zone = qs('.palette-results', palette);
  results = searchAll(query);
  selected = 0;
  if(!query || query.trim().length < 2){
    zone.innerHTML = `<p class="palette-hint">Cherche un sort, une classe, une règle, un objet… <br>Exemples : <em>boule de feu</em>, <em>roublard</em>, <em>à terre</em>.</p>`;
    return;
  }
  if(results.length === 0){
    zone.innerHTML = `<p class="palette-hint">Aucun résultat pour « ${escapeHtml(query)} ». Le grimoire reste muet.</p>`;
    return;
  }
  let lastCat = null;
  zone.innerHTML = results.map((r, i) => {
    const catHead = r.cat !== lastCat ? `<div class="palette-cat">${escapeHtml(r.cat)}</div>` : '';
    lastCat = r.cat;
    return catHead + `<button type="button" class="palette-item ${i === selected ? 'is-selected' : ''}" data-idx="${i}">`
      + `<span class="palette-item-label">${escapeHtml(r.label)}</span>`
      + `<span class="palette-item-sub">${escapeHtml(r.sub)}</span></button>`;
  }).join('');
}

function moveSelection(delta){
  if(results.length === 0) return;
  selected = (selected + delta + results.length) % results.length;
  qsa('.palette-item', palette).forEach((n) => {
    const isSel = Number(n.dataset.idx) === selected;
    n.classList.toggle('is-selected', isSel);
    if(isSel) n.scrollIntoView({ block: 'nearest' });
  });
}

function goTo(item){
  if(!item) return;
  closeSearch();
  const params = [item.key, item.sub2].filter(Boolean);
  navigate(item.route, ...params);
}

function buildPalette(){
  palette = el('div', { class: 'palette-overlay', role: 'presentation' });
  palette.innerHTML = `
    <div class="palette" role="dialog" aria-modal="true" aria-label="Recherche dans le Grimoire">
      <div class="palette-input-row">
        <svg class="icon" aria-hidden="true"><use href="#i-search"/></svg>
        <input type="text" class="palette-input" placeholder="Chercher dans le Grimoire…" aria-label="Recherche" autocomplete="off" spellcheck="false">
        <kbd>Échap</kbd>
      </div>
      <div class="palette-results"></div>
    </div>`;
  document.body.appendChild(palette);

  const input = qs('.palette-input', palette);
  input.addEventListener('input', debounce(() => renderResults(input.value), 120));
  palette.addEventListener('pointerdown', (e) => { if(e.target === palette) closeSearch(); });
  palette.addEventListener('click', (e) => {
    const item = e.target.closest('.palette-item');
    if(item) goTo(results[Number(item.dataset.idx)]);
  });
  palette.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowDown'){ e.preventDefault(); moveSelection(1); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); moveSelection(-1); }
    else if(e.key === 'Enter'){ e.preventDefault(); goTo(results[selected]); }
    else if(e.key === 'Escape'){ e.preventDefault(); closeSearch(); }
    else trapFocus(qs('.palette', palette), e);
  });
}

export function openSearch(){
  if(!palette) buildPalette();
  palette.classList.add('is-open');
  lockBodyScroll();
  const input = qs('.palette-input', palette);
  input.value = '';
  renderResults('');
  setTimeout(() => input.focus(), 30);
}

export function closeSearch(){
  if(palette?.classList.contains('is-open')){
    palette.classList.remove('is-open');
    unlockBodyScroll();
  }
}

export function initSearch(){
  document.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
      e.preventDefault();
      if(palette?.classList.contains('is-open')) closeSearch();
      else openSearch();
    }
  });
}
