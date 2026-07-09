// Page Sorts : 391 sorts illustrés en grille de cartes (couleur par école),
// filtres (texte, classe, école, niveau, concentration, rituel) et fiche
// détaillée en modale (résumé / complet).

import { DATA } from '../data.js';
import { el, escapeHtml, qs, qsa, debounce, stripAccents, slugify, storeGet, storeSet } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { spellImage, imgWithFallback } from '../images.js';
import { openModal } from '../ui.js';
import { actionBadge, spellActionKind } from '../character/action-economy.js';

const LEVEL_LABEL = (n) => n === 0 ? 'Sorts mineurs (niveau 0)' : `Niveau ${n}`;
const DESC_MODE_KEY = 'grimoire.spellDescMode';

function isRitual(s){ return /rituel/i.test(s.temps || '') || /rituel/i.test(s.duree || ''); }
function schoolClass(s){ return `school-${slugify(s.ecole)}`; }

export function spellDetailNode(s){
  const node = el('div', { class: schoolClass(s) });
  let mode = storeGet(DESC_MODE_KEY, 'resume');
  if(mode !== 'resume' && mode !== 'complet') mode = 'resume';
  if(!s.description_resume) mode = 'complet';

  const fact = (icon, label, value) => `
    <div class="fact-tile">
      <svg class="icon" aria-hidden="true"><use href="#${icon}"/></svg>
      <span class="fact-label">${label}</span>
      <span class="fact-value">${escapeHtml(value || '—')}</span>
    </div>`;

  node.innerHTML = `
    <div class="spell-hero">
      <div class="spell-hero-img">${imgWithFallback(spellImage(s.name), s._primaryName, { fallbackEmoji: '✨' })}</div>
      <div class="spell-hero-info">
        <div class="detail-chips" style="margin-top:0">
          <span class="chip chip-gold">${s._niveauNum === 0 ? 'Sort mineur' : 'Niveau ' + s.niveau}</span>
          <span class="chip chip-school"><span class="school-dot"></span>${escapeHtml(s.ecole)}</span>
          ${spellActionKind(s) ? actionBadge(spellActionKind(s)) : ''}
          ${s.concentration ? '<span class="chip chip-conc">Concentration</span>' : ''}
          ${isRitual(s) ? '<span class="chip chip-rituel">Rituel</span>' : ''}
        </div>
        <div class="spell-facts">
          ${fact('i-clock', 'Temps', s.temps)}
          ${fact('i-target', 'Portée', s.portee)}
          ${fact('i-pouch', 'Composants', (s.composants || []).join(', '))}
          ${fact('i-hourglass', 'Durée', s.duree)}
        </div>
        <div class="class-badges">
          ${(s.classes || []).map(c => `<span class="class-badge">${escapeHtml(c)}</span>`).join('')}
        </div>
      </div>
    </div>
    ${s._altName ? `<p class="flavor">Aussi connu sous le nom « ${escapeHtml(s._altName)} » (règles 2024).</p>` : ''}
    ${s.description_resume ? `
    <div class="seg-toggle" role="tablist" aria-label="Niveau de détail">
      <button type="button" class="seg ${mode === 'resume' ? 'is-active' : ''}" data-mode="resume">Résumé</button>
      <button type="button" class="seg ${mode === 'complet' ? 'is-active' : ''}" data-mode="complet">Complet</button>
    </div>` : ''}
    <div class="prose" id="spell-desc"></div>
    <div id="spell-extra"></div>
  `;

  const desc = qs('#spell-desc', node);
  const extra = qs('#spell-extra', node);
  const renderDesc = () => {
    const text = mode === 'resume' && s.description_resume ? s.description_resume : (s.description || '');
    desc.innerHTML = enrichHTML(text, { isPlainText: true });
    extra.innerHTML = mode === 'complet' && s.amelioration
      ? `<div class="beginner-note"><b>À plus haut niveau.</b> ${enrichHTML(s.amelioration, { isPlainText: true })}</div>`
      : '';
  };
  qsa('[data-mode]', node).forEach(b => b.addEventListener('click', () => {
    mode = b.dataset.mode;
    storeSet(DESC_MODE_KEY, mode);
    qsa('.seg', node).forEach(x => x.classList.toggle('is-active', x === b));
    renderDesc();
  }));
  renderDesc();
  return node;
}

export function openSpellModal(s){
  openModal({ title: escapeHtml(s._primaryName), node: spellDetailNode(s), className: 'modal-spell' });
}

function spellCard(s){
  const card = el('button', { class: `spell-card no-help ${schoolClass(s)}`, type: 'button', onclick: () => openSpellModal(s) });
  card.innerHTML = `
    <span class="spell-card-media">
      ${imgWithFallback(spellImage(s.name), '', { fallbackEmoji: '✨' })}
      <span class="spell-card-lvl" aria-label="Niveau ${s._niveauNum}">${s._niveauNum}</span>
      <span class="spell-card-flags">
        ${s.concentration ? '<span class="flag flag-c" title="Concentration">C</span>' : ''}
        ${isRitual(s) ? '<span class="flag flag-r" title="Rituel">R</span>' : ''}
      </span>
    </span>
    <span class="spell-card-body">
      <span class="spell-card-name">${escapeHtml(s._primaryName)}</span>
      <span class="spell-card-school"><span class="school-dot"></span>${escapeHtml(s.ecole)}</span>
      <span class="spell-card-meta">${spellActionKind(s) ? actionBadge(spellActionKind(s), { compact: true }) + ' ' : ''}${escapeHtml(s.temps || '')} · ${escapeHtml(s.portee || '')}</span>
    </span>`;
  return card;
}

export function renderSorts(view, params){
  // Routes : #sorts | #sorts/<slug> | #sorts/classe/<Nom>
  let openSlug = null, classFilter = '';
  if(params[0] === 'classe' && params[1]) classFilter = params[1];
  else if(params[0]) openSlug = params[0];

  const state = {
    q: '',
    classe: classFilter,
    ecole: '',
    niveau: null,
    conc: false,
    rituel: false,
  };

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">Le Grimoire · Chapitre III</p>
      <h1 class="page-title">Les Sorts</h1>
      <p class="page-lede">Les ${DATA.sorts.length} sorts des règles 2024, illustrés et expliqués. <em>Clique sur une carte
      pour ouvrir sa fiche.</em> « C » signale la Concentration (un seul sort de ce type à la fois),
      « R » un rituel (lançable sans dépenser d'emplacement, avec 10 minutes de plus).</p>
    </div>
    <div class="filter-bar">
      <input type="search" class="input search-input" id="sf-q" placeholder="Chercher un sort… (ex. boule de feu)" aria-label="Chercher un sort">
      <select class="select" id="sf-classe" aria-label="Filtrer par classe">
        <option value="">Toutes les classes</option>
        ${DATA.spellClassNames.map(c => `<option ${c === state.classe ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
      </select>
      <select class="select" id="sf-ecole" aria-label="Filtrer par école">
        <option value="">Toutes les écoles</option>
        ${DATA.spellSchools.map(e => `<option>${escapeHtml(e)}</option>`).join('')}
      </select>
      <span class="filter-count" id="sf-count"></span>
    </div>
    <div class="pill-row" id="sf-levels" style="margin-bottom:8px">
      <button class="pill is-active" type="button" data-lvl="">Tous niveaux</button>
      ${DATA.spellLevels.map(l => `<button class="pill" type="button" data-lvl="${l}">${l === '0' ? 'Mineurs' : 'Niv. ' + l}</button>`).join('')}
    </div>
    <div class="pill-row" style="margin-bottom:20px">
      <button class="pill" type="button" id="sf-conc">Concentration</button>
      <button class="pill" type="button" id="sf-rituel">Rituel</button>
    </div>
    <div id="spell-results"></div>
  `;

  const results = qs('#spell-results', view);
  const count = qs('#sf-count', view);

  function matches(s){
    if(state.classe && !(s.classes || []).includes(state.classe)) return false;
    if(state.ecole && s.ecole !== state.ecole) return false;
    if(state.niveau != null && s.niveau !== state.niveau) return false;
    if(state.conc && !s.concentration) return false;
    if(state.rituel && !isRitual(s)) return false;
    if(state.q){
      const hay = stripAccents(`${s.name} ${s.description_resume || ''}`).toLowerCase();
      for(const w of state.q.split(/\s+/)){
        if(!hay.includes(w)) return false;
      }
    }
    return true;
  }

  function renderList(){
    const found = DATA.sorts.filter(matches).sort((a, b) => a._niveauNum - b._niveauNum || a._primaryName.localeCompare(b._primaryName));
    count.textContent = `${found.length} sort${found.length > 1 ? 's' : ''}`;
    results.innerHTML = '';
    if(found.length === 0){
      results.innerHTML = '<p class="empty-note">Aucun sort ne répond à cet appel. Élargis tes filtres.</p>';
      return;
    }
    let lastLvl = null;
    let gridZone = null;
    for(const s of found){
      if(s._niveauNum !== lastLvl){
        lastLvl = s._niveauNum;
        results.appendChild(el('h2', { class: 'spell-group-title', text: LEVEL_LABEL(lastLvl) }));
        gridZone = el('div', { class: 'spell-grid' });
        results.appendChild(gridZone);
      }
      gridZone.appendChild(spellCard(s));
    }
  }

  qs('#sf-q', view).addEventListener('input', debounce((e) => {
    state.q = stripAccents(e.target.value).toLowerCase().trim();
    renderList();
  }, 140));
  qs('#sf-classe', view).addEventListener('change', (e) => { state.classe = e.target.value; renderList(); });
  qs('#sf-ecole', view).addEventListener('change', (e) => { state.ecole = e.target.value; renderList(); });
  qs('#sf-levels', view).addEventListener('click', (e) => {
    const b = e.target.closest('[data-lvl]');
    if(!b) return;
    state.niveau = b.dataset.lvl === '' ? null : b.dataset.lvl;
    qs('#sf-levels', view).querySelectorAll('.pill').forEach(p => p.classList.toggle('is-active', p === b));
    renderList();
  });
  qs('#sf-conc', view).addEventListener('click', (e) => {
    state.conc = !state.conc;
    e.target.classList.toggle('is-active', state.conc);
    renderList();
  });
  qs('#sf-rituel', view).addEventListener('click', (e) => {
    state.rituel = !state.rituel;
    e.target.classList.toggle('is-active', state.rituel);
    renderList();
  });

  renderList();

  if(openSlug){
    const s = DATA.sortsBySlug.get(openSlug);
    if(s) openSpellModal(s);
  }
}
