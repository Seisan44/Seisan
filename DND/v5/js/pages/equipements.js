import { DATA } from '../data.js';
import { enrichHTML } from '../enrich.js';
import { escapeHtml, debounce, stripAccents, normKey } from '../utils.js';
import { openModal } from '../modal.js';
import { attachPopover } from '../popover.js';
import { isFavorite, toggleFavorite } from '../favorites.js';
import { toast } from '../toast.js';

const TABS = [
  { key:'armes', label:'Armes' },
  { key:'armures', label:'Armures' },
  { key:'materiel', label:'Matériel' },
  { key:'outils', label:'Outils' },
  { key:'magiques', label:'Objets magiques' },
];

const RARITY_ORDER = ['commun','peu commun','rare','très rare','légendaire'];
const RARITY_COLOR = {
  'commun':'#9aa0a6', 'peu commun':'#7fae63', 'rare':'#7a9bc4', 'très rare':'#9b7fd4', 'légendaire':'#d6a03d',
};
function primaryRarity(str){
  const s = stripAccents(str.toLowerCase());
  for(const r of [...RARITY_ORDER].reverse()){
    if(s.includes(stripAccents(r))) return r;
  }
  return 'commun';
}

let activeTab = 'armes';
let materielQuery = '', outilsQuery = '', magiquesQuery = '', magiquesRarity = '';

export async function renderEquipements(container, parts){
  if(parts && parts[0] && TABS.some(t => t.key === parts[0])) activeTab = parts[0];

  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Barda d’aventurier</p>
      <h1 class="page-title">Équipement</h1>
      <p class="page-lede">Armes, armures, outils et curiosités magiques — de quoi équiper n’importe quel aventurier.</p>
    </header>
    <div class="tabs" role="tablist" id="equip-tabs">
      ${TABS.map(t => `<button class="tab" role="tab" data-tab="${t.key}">${t.label}</button>`).join('')}
    </div>
    <div class="tabpanel" id="equip-panel"></div>
  `;

  const panel = container.querySelector('#equip-panel');
  const tabBtns = container.querySelectorAll('.tab');
  function selectTab(key){
    activeTab = key;
    tabBtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === key)));
    renderTab(panel, key);
  }
  tabBtns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
  selectTab(activeTab);
}

function renderTab(panel, key){
  if(key === 'armes') return renderArmes(panel);
  if(key === 'armures') return renderArmures(panel);
  if(key === 'materiel') return renderMateriel(panel);
  if(key === 'outils') return renderOutils(panel);
  if(key === 'magiques') return renderMagiques(panel);
}

function propertyLookup(){
  const map = new Map();
  for(const p of DATA.armes.proprietes) map.set(normKey(p.nom), p.description);
  return map;
}
function propPill(raw, lookup){
  const base = raw.split('(')[0].trim();
  const def = lookup.get(normKey(base));
  if(!def) return `<span class="pill pill-muted">${escapeHtml(raw)}</span>`;
  return `<span class="pill pill-muted prop-pill" data-def="${escapeHtml(def)}" data-label="${escapeHtml(base)}" tabindex="0">${escapeHtml(raw)}</span>`;
}
function wirePropPills(panel){
  panel.querySelectorAll('.prop-pill').forEach(el => {
    attachPopover(el, () => `<div class="popover-title"><span>${el.dataset.label}</span></div><div>${el.dataset.def}</div>`);
  });
}

function explicationsPills(list){
  return `<div class="chip-group" style="margin-bottom:1.4em;">${list.map(e =>
    `<span class="pill explication-pill" data-label="${escapeHtml(e.nom)}" data-def="${escapeHtml(e.description)}" tabindex="0">${escapeHtml(e.nom)}</span>`
  ).join('')}</div>`;
}
function wireExplicationPills(panel){
  panel.querySelectorAll('.explication-pill').forEach(el => {
    attachPopover(el, () => `<div class="popover-title"><span>${el.dataset.label}</span></div><div>${el.dataset.def}</div>`);
  });
}

function renderArmes(panel){
  const lookup = propertyLookup();
  panel.innerHTML = `
    ${explicationsPills(DATA.armes.explications)}
    ${DATA.armes.armes.map(grp => `
      <div class="level-group">
        <h3 class="level-heading">${escapeHtml(grp.categorie)}</h3>
        <div class="table-scroll">
          <table class="eq-table">
            <thead><tr><th>Arme</th><th>Dégâts</th><th>Propriétés</th><th>Botte</th><th>Poids</th><th>Prix</th></tr></thead>
            <tbody>
              ${grp.armes.map(a => `
                <tr>
                  <td class="eq-name">${escapeHtml(a.nom)}</td>
                  <td>${escapeHtml(a.degats)}</td>
                  <td>${(a.proprietes||[]).map(p => propPill(p, lookup)).join(' ')}</td>
                  <td>${escapeHtml(a.botte||'—')}</td>
                  <td>${escapeHtml(a.poids)}</td>
                  <td>${escapeHtml(a.prix)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `).join('')}
  `;
  wirePropPills(panel);
  wireExplicationPills(panel);
}

function renderArmures(panel){
  panel.innerHTML = `
    ${explicationsPills(DATA.armures.explications)}
    ${DATA.armures.armures.map(grp => `
      <div class="level-group">
        <h3 class="level-heading">${escapeHtml(grp.categorie)}${grp.temps ? ` <span class="pill pill-muted" style="font-size:.62rem;">Enfiler ${escapeHtml(grp.temps.enfiler)} · Retirer ${escapeHtml(grp.temps.retirer)}</span>` : ''}</h3>
        <div class="table-scroll">
          <table class="eq-table">
            <thead><tr><th>Armure</th><th>CA</th><th>Force</th><th>Discrétion</th><th>Poids</th><th>Coût</th></tr></thead>
            <tbody>
              ${grp.armures.map(a => `
                <tr>
                  <td class="eq-name">${escapeHtml(a.nom)}</td>
                  <td>${escapeHtml(a.ca)}</td>
                  <td>${escapeHtml(a.force || '—')}</td>
                  <td>${escapeHtml(a.discretion || '—')}</td>
                  <td>${escapeHtml(a.poids)}</td>
                  <td>${escapeHtml(a.cout)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `).join('')}
  `;
  wireExplicationPills(panel);
}

function renderMateriel(panel){
  panel.innerHTML = `
    <div class="toolbar frame">
      <div class="search-field"><svg class="i"><use href="#i-search"/></svg>
        <input type="text" class="field" id="mat-q" placeholder="Rechercher un objet…" aria-label="Rechercher un objet"></div>
      <span class="filter-count" id="mat-count"></span>
    </div>
    <div class="card-grid" id="mat-grid"></div>
  `;
  const grid = panel.querySelector('#mat-grid');
  const qInput = panel.querySelector('#mat-q');
  const countEl = panel.querySelector('#mat-count');
  function apply(){
    const q = stripAccents(materielQuery.toLowerCase());
    const list = DATA.materiels.filter(m => !q || stripAccents(m.nom.toLowerCase()).includes(q));
    grid.innerHTML = list.map(m => `
      <button type="button" class="card" data-name="${escapeHtml(m.nom)}" style="padding:0;">
        <div class="card-body" style="padding-top:18px;">
          <h2 class="card-title">${escapeHtml(m.nom)}</h2>
          <div class="card-meta"><span class="pill pill-muted">${escapeHtml(m.poids||'—')}</span><span class="pill pill-muted">${escapeHtml(m.prix||'—')}</span></div>
          <p class="card-desc">${escapeHtml(m.description||'')}</p>
        </div>
      </button>
    `).join('') || `<div class="empty-state" style="grid-column:1/-1;"><span class="i-big">🔍</span><p>Aucun objet trouvé.</p></div>`;
    countEl.textContent = `${list.length} objets`;
    grid.querySelectorAll('.card').forEach(card => card.addEventListener('click', () => {
      const item = DATA.materiels.find(m => m.nom === card.dataset.name);
      openSimpleModal(item.nom, `${item.poids||''} · ${item.prix||''}`, enrichHTML(item.description||'Aucune description.', {isPlainText:true}), card);
    }));
  }
  qInput.addEventListener('input', debounce(() => { materielQuery = qInput.value; apply(); }, 140));
  qInput.value = materielQuery;
  apply();
}

function renderOutils(panel){
  panel.innerHTML = `
    <div class="toolbar frame">
      <div class="search-field"><svg class="i"><use href="#i-search"/></svg>
        <input type="text" class="field" id="out-q" placeholder="Rechercher un outil…" aria-label="Rechercher un outil"></div>
      <span class="filter-count" id="out-count"></span>
    </div>
    <div class="card-grid" id="out-grid"></div>
  `;
  const grid = panel.querySelector('#out-grid');
  const qInput = panel.querySelector('#out-q');
  const countEl = panel.querySelector('#out-count');
  function apply(){
    const q = stripAccents(outilsQuery.toLowerCase());
    const list = DATA.outils.filter(o => !q || stripAccents(o.nom.toLowerCase()).includes(q));
    grid.innerHTML = list.map(o => `
      <button type="button" class="card" data-name="${escapeHtml(o.nom)}" style="padding:0;">
        <div class="card-body" style="padding-top:18px;">
          <h2 class="card-title">${escapeHtml(o.nom)}</h2>
          <div class="card-meta"><span class="pill pill-muted">${escapeHtml(o.caracteristique||'—')}</span><span class="pill pill-muted">${escapeHtml(o.prix||'—')}</span></div>
          <p class="card-desc">${(o.artisanat||[]).slice(0,4).join(', ')}</p>
        </div>
      </button>
    `).join('') || `<div class="empty-state" style="grid-column:1/-1;"><span class="i-big">🔍</span><p>Aucun outil trouvé.</p></div>`;
    countEl.textContent = `${list.length} outils`;
    grid.querySelectorAll('.card').forEach(card => card.addEventListener('click', () => {
      const item = DATA.outils.find(o => o.nom === card.dataset.name);
      const body = `
        <table class="spell-meta-table">
          <tr><th>Caractéristique</th><td>${escapeHtml(item.caracteristique||'—')}</td></tr>
          <tr><th>Prix</th><td>${escapeHtml(item.prix||'—')}</td></tr>
          <tr><th>Poids</th><td>${escapeHtml(item.poids||'—')}</td></tr>
        </table>
        ${item.utilisations?.length ? `<p class="table-title">Utilisations</p><ul>${item.utilisations.map(u => `<li>${escapeHtml(u.action)} — DD ${escapeHtml(String(u.dd))}</li>`).join('')}</ul>` : ''}
        ${item.artisanat?.length ? `<p class="table-title">Permet de fabriquer</p><p>${item.artisanat.map(escapeHtml).join(', ')}</p>` : ''}
      `;
      openSimpleModal(item.nom, 'Outil', body, card);
    }));
  }
  qInput.addEventListener('input', debounce(() => { outilsQuery = qInput.value; apply(); }, 140));
  qInput.value = outilsQuery;
  apply();
}

function renderMagiques(panel){
  panel.innerHTML = `
    <div class="toolbar frame">
      <div class="search-field"><svg class="i"><use href="#i-search"/></svg>
        <input type="text" class="field" id="mag-q" placeholder="Rechercher un objet magique…" aria-label="Rechercher un objet magique"></div>
      <div class="filter-row">
        <div class="chip-group" id="mag-rarity-chips">
          <button class="chip ${magiquesRarity===''?'is-selected':''}" data-r="" type="button">Toutes raretés</button>
          ${RARITY_ORDER.map(r => `<button class="chip ${magiquesRarity===r?'is-selected':''}" data-r="${r}" type="button" style="--accent-rgb:0,0,0;">${r}</button>`).join('')}
        </div>
        <span class="filter-count" id="mag-count"></span>
      </div>
    </div>
    <div class="card-grid" id="mag-grid"></div>
  `;
  const grid = panel.querySelector('#mag-grid');
  const qInput = panel.querySelector('#mag-q');
  const countEl = panel.querySelector('#mag-count');
  function apply(){
    const q = stripAccents(magiquesQuery.toLowerCase());
    const list = DATA.objetsMagiques.filter(o => {
      if(magiquesRarity && !stripAccents(o.rarete.toLowerCase()).includes(stripAccents(magiquesRarity))) return false;
      if(q && !stripAccents(o.nom.toLowerCase()).includes(q)) return false;
      return true;
    });
    grid.innerHTML = list.map(o => {
      const rar = primaryRarity(o.rarete);
      return `
      <button type="button" class="card magic-item-card" data-name="${escapeHtml(o.nom)}" style="padding:0; --rar-color:${RARITY_COLOR[rar]};">
        <span class="card-fav ${isFavorite('objet', o.nom) ? 'is-active':''}" data-fav="${escapeHtml(o.nom)}" role="button" tabindex="0" aria-label="Ajouter aux favoris">
          <svg class="i"><use href="#i-star"/></svg>
        </span>
        <div class="card-body" style="padding-top:18px;border-top:3px solid var(--rar-color);">
          <h2 class="card-title">${escapeHtml(o.nom)}</h2>
          <div class="card-meta">
            <span class="pill" style="background:color-mix(in srgb, var(--rar-color) 20%, transparent); border-color:var(--rar-color); color:var(--rar-color);">${escapeHtml(o.rarete)}</span>
            ${o.lien ? `<span class="pill pill-muted">Lien</span>` : ''}
          </div>
          <p class="card-desc">${escapeHtml(o.type||'')}</p>
        </div>
      </button>`;
    }).join('') || `<div class="empty-state" style="grid-column:1/-1;"><span class="i-big">🔍</span><p>Aucun objet magique trouvé.</p></div>`;
    countEl.textContent = `${list.length} objets`;
    grid.querySelectorAll('.card').forEach(card => card.addEventListener('click', (e) => {
      if(e.target.closest('[data-fav]')) return;
      const item = DATA.objetsMagiques.find(o => o.nom === card.dataset.name);
      const body = `
        <div class="flex-gap" style="margin-bottom:1em;">
          <span class="pill">${escapeHtml(item.type)}</span>
          <span class="pill">${escapeHtml(item.rarete)}</span>
          ${item.lien ? `<span class="pill">${escapeHtml(item.lien)}</span>` : ''}
        </div>
        <div class="prose">${enrichHTML(item.description, {isPlainText:true})}</div>
      `;
      openSimpleModal(item.nom, item.type, body, card);
    }));
    grid.querySelectorAll('[data-fav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const active = toggleFavorite('objet', btn.dataset.fav);
        btn.classList.toggle('is-active', active);
        toast(active ? 'Objet ajouté aux favoris' : 'Objet retiré des favoris', { type:'success' });
      });
    });
  }
  qInput.addEventListener('input', debounce(() => { magiquesQuery = qInput.value; apply(); }, 140));
  qInput.value = magiquesQuery;
  panel.querySelectorAll('#mag-rarity-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      magiquesRarity = chip.dataset.r;
      panel.querySelectorAll('#mag-rarity-chips .chip').forEach(c => c.classList.toggle('is-selected', c === chip));
      apply();
    });
  });
  apply();
}

function openSimpleModal(title, eyebrow, bodyHTML, originEl){
  openModal({ eyebrow, title: escapeHtml(title), bodyHTML, originEl });
}
