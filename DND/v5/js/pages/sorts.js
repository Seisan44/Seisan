import { DATA } from '../data.js';
import { spellImage, spellAltName, imgWithFallback } from '../images.js';
import { enrichHTML } from '../enrich.js';
import { escapeHtml, debounce, stripAccents } from '../utils.js';
import { openModal } from '../modal.js';
import { isFavorite, toggleFavorite } from '../favorites.js';
import { toast } from '../toast.js';

export const SCHOOL_ICON = {
  'Abjuration':'🛡️','Divination':'🔮','Enchantement':'💫','Illusion':'🎭',
  'Invocation':'🌀','Nécromancie':'💀','Transmutation':'🔁','Évocation':'🔥',
};
export const SCHOOL_COLOR = {
  'Abjuration':'#5b8fc7','Divination':'#c9a84c','Enchantement':'#d46fa6','Illusion':'#9b7fd4',
  'Invocation':'#5fae7a','Nécromancie':'#8a4a4a','Transmutation':'#d68a3d','Évocation':'#c1453f',
};

/** Réduit le champ libre `temps` ("Action bonus, que vous prenez après…") à une étiquette
 * courte pour les cartes compactes — pour que les joueurs sachent d'un coup d'œil ce qui
 * leur reste comme économie d'action en combat. */
export function castingTimeShort(temps){
  const t = String(temps || '').trim();
  if(/^r[ée]action/i.test(t)) return 'Réaction';
  if(/^action bonus/i.test(t)) return 'Action bonus';
  if(/^action\b/i.test(t)) return 'Action';
  return t.split(/\s+ou\s+/i)[0] || t;
}

let state = { q:'', ecole:'', niveau:'', classe:'', concentration:false, favoris:false };

export async function renderSorts(container, parts){
  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Grimoire</p>
      <h1 class="page-title">Sorts</h1>
      <p class="page-lede">${DATA.sorts.length} formules, des murmures mineurs aux invocations qui plient la réalité.</p>
    </header>

    <div class="toolbar frame">
      <div class="search-field">
        <svg class="i"><use href="#i-search"/></svg>
        <input type="text" class="field" id="sorts-q" placeholder="Rechercher un sort…" aria-label="Rechercher un sort">
      </div>
      <div class="filter-row">
        <select class="field" id="sorts-ecole" aria-label="Filtrer par école">
          <option value="">Toutes écoles</option>
          ${DATA.spellSchools.map(e => `<option value="${escapeHtml(e)}">${escapeHtml(e)}</option>`).join('')}
        </select>
        <select class="field" id="sorts-niveau" aria-label="Filtrer par niveau">
          <option value="">Tous niveaux</option>
          ${DATA.spellLevels.map(n => `<option value="${n}">${n === '0' ? 'Sort mineur' : `Niveau ${n}`}</option>`).join('')}
        </select>
        <select class="field" id="sorts-classe" aria-label="Filtrer par classe">
          <option value="">Toutes classes</option>
          ${DATA.spellClassNames.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('')}
        </select>
        <button class="chip" id="sorts-concentration" type="button" aria-pressed="false">
          <svg class="i"><use href="#i-check"/></svg> Concentration
        </button>
        <button class="chip" id="sorts-favoris" type="button" aria-pressed="false">
          <svg class="i"><use href="#i-star"/></svg> Favoris
        </button>
        <button class="filter-clear" id="sorts-clear" type="button">Réinitialiser</button>
        <span class="filter-count" id="sorts-count" aria-live="polite"></span>
      </div>
    </div>

    <div class="card-grid card-grid-wide" id="sorts-grid"></div>
  `;

  const grid = container.querySelector('#sorts-grid');
  const qInput = container.querySelector('#sorts-q');
  const ecoleSel = container.querySelector('#sorts-ecole');
  const niveauSel = container.querySelector('#sorts-niveau');
  const classeSel = container.querySelector('#sorts-classe');
  const concBtn = container.querySelector('#sorts-concentration');
  const favBtn = container.querySelector('#sorts-favoris');
  const countEl = container.querySelector('#sorts-count');

  function apply(){
    const q = stripAccents(state.q.trim().toLowerCase());
    const results = DATA.sorts.filter(s => {
      if(state.ecole && s.ecole !== state.ecole) return false;
      if(state.niveau && s.niveau !== state.niveau) return false;
      if(state.classe && !s.classes.includes(state.classe)) return false;
      if(state.concentration && !s.concentration) return false;
      if(state.favoris && !isFavorite('sort', s._slug)) return false;
      if(q){
        const hay = stripAccents(s._primaryName.toLowerCase());
        if(!hay.includes(q)) return false;
      }
      return true;
    });
    renderGrid(grid, results);
    countEl.textContent = `${results.length} sort${results.length>1?'s':''}`;
  }

  qInput.addEventListener('input', debounce(() => { state.q = qInput.value; apply(); }, 160));
  ecoleSel.addEventListener('change', () => { state.ecole = ecoleSel.value; apply(); });
  niveauSel.addEventListener('change', () => { state.niveau = niveauSel.value; apply(); });
  classeSel.addEventListener('change', () => { state.classe = classeSel.value; apply(); });
  concBtn.addEventListener('click', () => {
    state.concentration = !state.concentration;
    concBtn.classList.toggle('is-selected', state.concentration);
    concBtn.setAttribute('aria-pressed', String(state.concentration));
    apply();
  });
  favBtn.addEventListener('click', () => {
    state.favoris = !state.favoris;
    favBtn.classList.toggle('is-selected', state.favoris);
    favBtn.setAttribute('aria-pressed', String(state.favoris));
    apply();
  });
  container.querySelector('#sorts-clear').addEventListener('click', () => {
    state = { q:'', ecole:'', niveau:'', classe:'', concentration:false, favoris:false };
    qInput.value = ''; ecoleSel.value=''; niveauSel.value=''; classeSel.value='';
    concBtn.classList.remove('is-selected'); concBtn.setAttribute('aria-pressed','false');
    favBtn.classList.remove('is-selected'); favBtn.setAttribute('aria-pressed','false');
    apply();
  });

  // restaure l'état des contrôles si on revient sur la page avec un filtre déjà actif
  qInput.value = state.q; ecoleSel.value = state.ecole; niveauSel.value = state.niveau; classeSel.value = state.classe;
  concBtn.classList.toggle('is-selected', state.concentration); concBtn.setAttribute('aria-pressed', String(state.concentration));
  favBtn.classList.toggle('is-selected', state.favoris); favBtn.setAttribute('aria-pressed', String(state.favoris));

  apply();

  if(parts && parts[0]){
    const spell = DATA.sorts.find(s => s._slug === parts[0]);
    if(spell) window.setTimeout(() => openSpellDetail(spell), 60);
  }
}

function renderGrid(grid, list){
  if(list.length === 0){
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><span class="i-big">🔍</span><p>Aucun sort ne correspond à ces filtres.</p></div>`;
    return;
  }
  grid.innerHTML = list.map(s => `
    <button type="button" class="card spell-card" data-slug="${s._slug}" style="--school-color:${SCHOOL_COLOR[s.ecole]||'#c9a84c'};">
      <span class="card-fav ${isFavorite('sort', s._slug) ? 'is-active':''}" data-fav="${s._slug}" role="button" tabindex="0" aria-label="Ajouter aux favoris">
        <svg class="i"><use href="#i-star"/></svg>
      </span>
      <div class="card-media">
        ${imgWithFallback(spellImage(s.name), s._primaryName, { fallbackEmoji: SCHOOL_ICON[s.ecole] || '✨' })}
      </div>
      <div class="card-body">
        <h2 class="card-title">${escapeHtml(s._primaryName)}</h2>
        <div class="card-meta">
          <span class="pill">${s.niveau === '0' ? 'Mineur' : `Niv. ${s.niveau}`}</span>
          <span class="pill pill-muted">${escapeHtml(s.ecole)}</span>
          ${s.concentration ? `<span class="pill pill-muted">Concentration</span>` : ''}
        </div>
        <p class="card-desc">${escapeHtml(s.classes.join(', '))}</p>
      </div>
    </button>
  `).join('');

  grid.querySelectorAll('.card[data-slug]').forEach(card => {
    card.addEventListener('click', (e) => {
      if(e.target.closest('[data-fav]')) return;
      const spell = DATA.sorts.find(s => s._slug === card.dataset.slug);
      if(spell) openSpellDetail(spell, card);
    });
  });
  grid.querySelectorAll('[data-fav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const active = toggleFavorite('sort', btn.dataset.fav);
      btn.classList.toggle('is-active', active);
      toast(active ? 'Sort ajouté aux favoris' : 'Sort retiré des favoris', { type:'success' });
    });
    btn.addEventListener('keydown', (e) => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); btn.click(); } });
  });
}

export function openSpellDetail(spell, originEl=null, extra=null){
  const alt = spell._altName;
  const favActive = isFavorite('sort', spell._slug);
  const schoolColor = SCHOOL_COLOR[spell.ecole] || '#c9a84c';
  const isCantrip = spell.niveau === '0';
  openModal({
    eyebrow: `${isCantrip ? 'Sort mineur' : `Sort de niveau ${spell.niveau}`} · ${spell.ecole}`,
    title: `${escapeHtml(spell._primaryName)}${alt ? ` <span style="color:var(--ink-faint);font-size:.7em;">(${escapeHtml(alt)})</span>` : ''}`,
    originEl,
    build(body){
      body.style.setProperty('--school-color', schoolColor);
      body.innerHTML = `
        <div class="spell-detail-hero">
          <div class="spell-detail-media">
            ${imgWithFallback(spellImage(spell.name), spell._primaryName, { fallbackEmoji: SCHOOL_ICON[spell.ecole] || '✨' })}
          </div>
          <div class="spell-meta-grid">
            <div class="spell-meta-box"><span class="smb-label">Temps d’incantation</span><span class="smb-value">${escapeHtml(spell.temps)}</span></div>
            <div class="spell-meta-box"><span class="smb-label">Portée</span><span class="smb-value">${escapeHtml(spell.portee)}</span></div>
            <div class="spell-meta-box"><span class="smb-label">Composantes</span><span class="smb-value">${escapeHtml((spell.composants||[]).join(', '))}</span></div>
            <div class="spell-meta-box"><span class="smb-label">Durée</span><span class="smb-value">${escapeHtml(spell.duree)}</span></div>
          </div>
        </div>
        <div class="flex-gap" style="align-items:center;margin-bottom:1.1em;flex-wrap:wrap;">
          <button class="btn btn-sm ${favActive?'btn-primary':'btn-ghost'}" id="spell-fav-btn">
            <svg class="i"><use href="#i-star"/></svg> ${favActive ? 'Dans les favoris' : 'Ajouter aux favoris'}
          </button>
          ${spell.concentration ? `<span class="pill">Concentration</span>` : ''}
          <span class="pill pill-muted">${isCantrip ? 'Sans emplacement' : `Coûte 1 emplacement niv. ${spell.niveau}`}</span>
          ${extra ? `<button type="button" class="btn btn-sm btn-primary" id="spell-add-btn"><svg class="i"><use href="#i-plus"/></svg> ${escapeHtml(extra.addLabel || 'Ajouter ce sort')}</button>` : ''}
        </div>
        <div class="spell-class-tags">
          ${(spell.classes||[]).map(c => `<span class="pill pill-muted">${escapeHtml(c)}</span>`).join('')}
        </div>
        ${spell.description_resume ? `
        <div class="choice-toggle" id="spell-desc-toggle" style="max-width:280px;margin-bottom:1em;">
          <button type="button" class="btn btn-sm is-selected" data-desc-view="resume">Résumé</button>
          <button type="button" class="btn btn-sm" data-desc-view="complete">Complet</button>
        </div>` : ''}
        <div class="prose${spell.description_resume ? ' spell-summary' : ''}" id="spell-desc-body">${enrichHTML(spell.description_resume || spell.description, { isPlainText:true })}</div>
        ${spell.amelioration ? `<div class="spell-upgrade"><p class="table-title">Aux niveaux supérieurs</p><div class="prose">${enrichHTML(spell.amelioration, {isPlainText:true})}</div></div>` : ''}
      `;
      const descBody = body.querySelector('#spell-desc-body');
      body.querySelectorAll('[data-desc-view]').forEach(btn => {
        btn.addEventListener('click', () => {
          body.querySelectorAll('[data-desc-view]').forEach(b => b.classList.toggle('is-selected', b === btn));
          const isResume = btn.dataset.descView === 'resume';
          descBody.classList.toggle('spell-summary', isResume);
          descBody.innerHTML = enrichHTML(isResume ? spell.description_resume : spell.description, { isPlainText:true });
        });
      });
      body.querySelector('#spell-fav-btn').addEventListener('click', (e) => {
        const active = toggleFavorite('sort', spell._slug);
        e.currentTarget.classList.toggle('btn-primary', active);
        e.currentTarget.classList.toggle('btn-ghost', !active);
        e.currentTarget.innerHTML = `<svg class="i"><use href="#i-star"/></svg> ${active ? 'Dans les favoris' : 'Ajouter aux favoris'}`;
        document.querySelector(`[data-fav="${spell._slug}"]`)?.classList.toggle('is-active', active);
      });
      if(extra){
        body.querySelector('#spell-add-btn')?.addEventListener('click', () => extra.onAdd?.(spell));
      }
    }
  });
}

/**
 * Délégation globale : tout sort cité dans une description enrichie (trait de classe,
 * texte d'un autre sort…) porte un `.spell-link[data-spell-slug]` posé par enrich.js.
 * On l'ouvre en overlay de détail, comme les cartes de la page Sorts.
 */
export function initSpellLinks(){
  const trigger = (e) => {
    const t = e.target.closest?.('.spell-link');
    if(!t) return;
    e.preventDefault();
    const spell = DATA.sorts.find(s => s._slug === t.dataset.spellSlug);
    if(spell) openSpellDetail(spell, t);
  };
  document.addEventListener('click', trigger);
  document.addEventListener('keydown', (e) => {
    if(e.key !== 'Enter' && e.key !== ' ') return;
    if(!e.target.closest?.('.spell-link')) return;
    trigger(e);
  });
}
