import { DATA } from '../data.js';
import { enrichHTML } from '../enrich.js';
import { escapeHtml, debounce, stripAccents } from '../utils.js';
import { openModal } from '../modal.js';
import { isFavorite, toggleFavorite } from '../favorites.js';
import { toast } from '../toast.js';

const TYPE_LABEL = { 'general':'Général', 'style_combat':'Style de combat', 'origine':'Origine' };
const TYPE_ICON = { 'general':'✦', 'style_combat':'⚔️', 'origine':'🌱' };

let state = { q:'', type:'', favoris:false };

export async function renderDons(container, parts){
  const types = [...new Set(DATA.dons.map(d => d.prerequis?.type_don).filter(Boolean))];

  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Talents</p>
      <h1 class="page-title">Dons</h1>
      <p class="page-lede">${DATA.dons.length} dons pour spécialiser, affiner ou réinventer votre personnage au fil de sa progression.</p>
    </header>

    <div class="toolbar frame">
      <div class="search-field">
        <svg class="i"><use href="#i-search"/></svg>
        <input type="text" class="field" id="dons-q" placeholder="Rechercher un don…" aria-label="Rechercher un don">
      </div>
      <div class="filter-row">
        <div class="chip-group" id="dons-type-chips">
          <button class="chip is-selected" data-type="" type="button">Tous</button>
          ${types.map(t => `<button class="chip" data-type="${t}" type="button">${TYPE_ICON[t]||''} ${TYPE_LABEL[t]||t}</button>`).join('')}
        </div>
        <button class="chip" id="dons-favoris" type="button" aria-pressed="false"><svg class="i"><use href="#i-star"/></svg> Favoris</button>
        <span class="filter-count" id="dons-count" aria-live="polite"></span>
      </div>
    </div>

    <div class="card-grid" id="dons-grid"></div>
  `;

  const grid = container.querySelector('#dons-grid');
  const qInput = container.querySelector('#dons-q');
  const countEl = container.querySelector('#dons-count');
  const favBtn = container.querySelector('#dons-favoris');

  function apply(){
    const q = stripAccents(state.q.trim().toLowerCase());
    const results = DATA.dons.filter(d => {
      if(state.type && d.prerequis?.type_don !== state.type) return false;
      if(state.favoris && !isFavorite('don', d.slug)) return false;
      if(q && !stripAccents(d._primaryName.toLowerCase()).includes(q)) return false;
      return true;
    });
    renderGrid(grid, results);
    countEl.textContent = `${results.length} don${results.length>1?'s':''}`;
  }

  qInput.addEventListener('input', debounce(() => { state.q = qInput.value; apply(); }, 160));
  container.querySelectorAll('#dons-type-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.type = chip.dataset.type;
      container.querySelectorAll('#dons-type-chips .chip').forEach(c => c.classList.toggle('is-selected', c === chip));
      apply();
    });
  });
  favBtn.addEventListener('click', () => {
    state.favoris = !state.favoris;
    favBtn.classList.toggle('is-selected', state.favoris);
    favBtn.setAttribute('aria-pressed', String(state.favoris));
    apply();
  });

  apply();

  if(parts && parts[0]){
    const don = DATA.dons.find(d => d.slug === parts[0]);
    if(don) window.setTimeout(() => openDonDetail(don), 60);
  }
}

function formatPrereq(don){
  const p = don.prerequis;
  if(!p || !p.prerequis || !p.prerequis.length) return 'Aucun prérequis';
  return p.prerequis.map(pr => {
    if(pr.type === 'niveau') return `Niveau ${pr.minimum}+`;
    if(pr.type === 'capacite') return pr.nom;
    return '';
  }).filter(Boolean).join(' · ');
}

function renderGrid(grid, list){
  if(list.length === 0){
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><span class="i-big">🔍</span><p>Aucun don ne correspond à ces filtres.</p></div>`;
    return;
  }
  grid.innerHTML = list.map(d => {
    const type = d.prerequis?.type_don;
    return `
    <button type="button" class="card" data-slug="${d.slug}" style="padding:0;">
      <span class="card-fav ${isFavorite('don', d.slug) ? 'is-active':''}" data-fav="${d.slug}" role="button" tabindex="0" aria-label="Ajouter aux favoris">
        <svg class="i"><use href="#i-star"/></svg>
      </span>
      <div class="card-body" style="padding-top:20px;">
        <span style="font-size:1.6rem;" aria-hidden="true">${TYPE_ICON[type] || '✦'}</span>
        <h2 class="card-title">${escapeHtml(d._primaryName)}${d._altName ? ` <span style="color:var(--ink-faint);font-size:.7em;">(${escapeHtml(d._altName)})</span>` : ''}</h2>
        <div class="card-meta">
          <span class="pill pill-muted">${TYPE_LABEL[type] || type || 'Don'}</span>
        </div>
        <p class="card-desc">${escapeHtml(formatPrereq(d))}</p>
      </div>
    </button>`;
  }).join('');

  grid.querySelectorAll('.card[data-slug]').forEach(card => {
    card.addEventListener('click', (e) => {
      if(e.target.closest('[data-fav]')) return;
      const don = DATA.dons.find(d => d.slug === card.dataset.slug);
      if(don) openDonDetail(don, card);
    });
  });
  grid.querySelectorAll('[data-fav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const active = toggleFavorite('don', btn.dataset.fav);
      btn.classList.toggle('is-active', active);
      toast(active ? 'Don ajouté aux favoris' : 'Don retiré des favoris', { type:'success' });
    });
    btn.addEventListener('keydown', (e) => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); btn.click(); } });
  });
}

function openDonDetail(don, originEl=null){
  const type = don.prerequis?.type_don;
  openModal({
    eyebrow: TYPE_LABEL[type] || 'Don',
    title: `${escapeHtml(don._primaryName)}${don._altName ? ` <span style="color:var(--ink-faint);font-size:.7em;">(${escapeHtml(don._altName)})</span>` : ''}`,
    originEl,
    build(body){
      body.innerHTML = `
        <p class="pill" style="margin-bottom:1em;">${escapeHtml(formatPrereq(don))}</p>
        <div class="prose">${enrichHTML(don.html_description)}</div>
      `;
    }
  });
}
