// Page Glossaire & règles : tous les termes du jeu en grille de cartes,
// regroupés par lettre (ordre alphabétique), avec recherche, filtre par
// catégorie et fiche complète en modale (#glossaire/<id>).

import { DATA } from '../data.js';
import { escapeHtml, qs, debounce, stripAccents, slugify } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { openModal } from '../ui.js';

const CATS = [
  { key: '', label: 'Tout' },
  { key: 'mécanique', label: 'Mécaniques' },
  { key: 'action', label: 'Actions' },
  { key: 'etat', label: 'États' },
];
const CAT_LABEL = { 'mécanique': 'Mécanique', 'action': 'Action', 'etat': 'État' };

function openEntryModal(e){
  openModal({
    title: `${escapeHtml(e.terme)}${e.anglais ? ` <span style="font-size:.7em;color:var(--ink-faint);font-style:italic">${escapeHtml(e.anglais)}</span>` : ''}`,
    html: `<div class="detail-chips" style="margin-top:0">
        <span class="chip chip-arcane">${escapeHtml(CAT_LABEL[e.categorie] || e.categorie)}</span>
      </div>
      <div class="prose">${enrichHTML(e.description || '', { isPlainText: true })}</div>`,
  });
}

function entryCard(e){
  return `<button type="button" class="gloss-card cat-${slugify(e.categorie)}" data-entry="${escapeHtml(e.id)}">
    <span class="gloss-card-head">
      <span class="gloss-card-title">${escapeHtml(e.terme)}</span>
      ${e.anglais ? `<span class="gloss-card-en">${escapeHtml(e.anglais)}</span>` : ''}
    </span>
    <span class="gloss-card-desc">${escapeHtml(String(e.description || '').replace(/#/g, ''))}</span>
    <span class="gloss-card-cat">${escapeHtml(CAT_LABEL[e.categorie] || e.categorie)}</span>
  </button>`;
}

function firstLetter(terme){
  const c = stripAccents(String(terme || '?')).trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : '#';
}

export function renderGlossaire(view, params){
  const [openId] = params;
  let query = '';
  let cat = '';

  const entries = [...DATA.glossaryIndex.values()].sort((a, b) => a.terme.localeCompare(b.terme, 'fr'));
  const abrevs = Object.entries(DATA.glossaireRaw.abreviations || {}).sort((a, b) => a[0].localeCompare(b[0]));

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">Le Grimoire · Chapitre VII</p>
      <h1 class="page-title">Glossaire &amp; Règles</h1>
      <p class="page-lede">Tous les termes du jeu, expliqués. <em>C'est ici qu'on vérifie une règle en pleine
      partie</em> — utilise la recherche, ou <kbd>Ctrl</kbd>+<kbd>K</kbd> depuis n'importe quelle page.</p>
    </div>
    <div class="filter-bar">
      <input type="search" class="input search-input" id="gl-q" placeholder="Chercher un terme… (ex. avantage, à terre)" aria-label="Chercher un terme">
      <span class="filter-count" id="gl-count"></span>
    </div>
    <div class="pill-row" id="gl-cats" style="margin-bottom:20px">
      ${CATS.map(c => `<button type="button" class="pill ${c.key === '' ? 'is-active' : ''}" data-cat="${c.key}">${c.label}</button>`).join('')}
    </div>
    <div id="gl-zone"></div>
    <h2 class="section-title"><svg class="icon"><use href="#i-glossaire"/></svg>Abréviations</h2>
    <div class="table-scroll"><table class="core" style="min-width:280px">
      ${abrevs.map(([code, def]) => `<tr><td><strong>${escapeHtml(code)}</strong></td><td>${escapeHtml(def)}</td></tr>`).join('')}
    </table></div>
  `;

  const zone = qs('#gl-zone', view);
  const count = qs('#gl-count', view);

  function renderList(){
    const found = entries.filter(e => {
      if(cat && e.categorie !== cat) return false;
      if(query){
        const hay = stripAccents(e.terme + ' ' + (e.anglais || '') + ' ' + e.description).toLowerCase();
        return query.split(/\s+/).every(w => hay.includes(w));
      }
      return true;
    });
    count.textContent = `${found.length} terme${found.length > 1 ? 's' : ''}`;
    if(found.length === 0){
      zone.innerHTML = '<p class="empty-note">Aucun terme trouvé.</p>';
      return;
    }
    // Une rangée par lettre : lettrine + grille de cartes.
    let html = '';
    let letter = null;
    let cards = [];
    const flush = () => {
      if(letter == null) return;
      html += `<section class="gloss-letter-row">
        <div class="gloss-letter" aria-hidden="true">${letter}</div>
        <div class="gloss-grid">${cards.join('')}</div>
      </section>`;
      cards = [];
    };
    for(const e of found){
      const l = firstLetter(e.terme);
      if(l !== letter){ flush(); letter = l; }
      cards.push(entryCard(e));
    }
    flush();
    zone.innerHTML = html;
  }

  zone.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-entry]');
    if(!btn) return;
    const entry = DATA.glossaryIndex.get(btn.dataset.entry);
    if(entry) openEntryModal(entry);
  });
  qs('#gl-q', view).addEventListener('input', debounce((e) => {
    query = stripAccents(e.target.value).toLowerCase().trim();
    renderList();
  }, 140));
  qs('#gl-cats', view).addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if(!b) return;
    cat = b.dataset.cat;
    qs('#gl-cats', view).querySelectorAll('.pill').forEach(p => p.classList.toggle('is-active', p === b));
    renderList();
  });

  renderList();

  if(openId){
    const entry = DATA.glossaryIndex.get(openId);
    if(entry) openEntryModal(entry);
  }
}
