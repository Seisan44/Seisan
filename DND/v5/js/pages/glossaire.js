import { DATA } from '../data.js';
import { enrichHTML, getGlossaryEntry } from '../enrich.js';
import { escapeHtml, debounce, stripAccents } from '../utils.js';

const CAT_LABEL = {
  'mécanique':'Mécanique', 'combat':'Combat', 'magie':'Magie', 'exploration':'Exploration',
  'repos':'Repos', 'déplacement':'Déplacement', 'zone-d-effet':'Zone d’effet', 'action':'Action', 'etat':'État',
};

let activeTab = 'glossaire';
let query = '';

export async function renderGlossaire(container, parts){
  const target = parts && parts[0];
  if(target){
    const entry = getGlossaryEntry(target);
    if(entry) activeTab = entry.categorie === 'action' ? 'actions' : entry.categorie === 'etat' ? 'etats' : 'glossaire';
    container.dataset.noAutoScroll = '1';
  }

  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Compendium des règles</p>
      <h1 class="page-title">Glossaire</h1>
      <p class="page-lede">Toutes les définitions du jeu, reliées entre elles — survolez ou touchez un terme souligné n'importe où sur le site pour l'ouvrir en aperçu.</p>
    </header>

    <div class="toolbar frame">
      <div class="search-field">
        <svg class="i"><use href="#i-search"/></svg>
        <input type="text" class="field" id="gloss-q" placeholder="Rechercher un terme…" aria-label="Rechercher un terme">
      </div>
    </div>

    <div class="tabs" role="tablist" id="gloss-tabs">
      <button class="tab" role="tab" data-tab="glossaire">Glossaire (${DATA.glossaireRaw.glossaire.length})</button>
      <button class="tab" role="tab" data-tab="actions">Actions (${DATA.glossaireRaw.actions.length})</button>
      <button class="tab" role="tab" data-tab="etats">États (${DATA.glossaireRaw.etats.length})</button>
      <button class="tab" role="tab" data-tab="abreviations">Abréviations (${Object.keys(DATA.glossaireRaw.abreviations).length})</button>
    </div>
    <div id="gloss-panel"></div>
  `;

  const panel = container.querySelector('#gloss-panel');
  const qInput = container.querySelector('#gloss-q');
  const tabBtns = container.querySelectorAll('.tab');

  function selectTab(key){
    activeTab = key;
    tabBtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === key)));
    renderPanel();
  }
  function renderPanel(){
    panel.innerHTML = renderTabContent(activeTab, query);
    wirePanel(panel);
    if(target){
      const el = panel.querySelector(`#term-${CSS.escape(target)}`);
      if(el){
        el.scrollIntoView({ block:'center', behavior:'smooth' });
        el.classList.add('is-highlighted');
        window.setTimeout(() => el.classList.remove('is-highlighted'), 2200);
      }
    }
  }

  tabBtns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
  qInput.addEventListener('input', debounce(() => { query = qInput.value; renderPanel(); }, 140));
  qInput.value = query;

  selectTab(activeTab);
}

function wirePanel(panel){
  panel.querySelectorAll('[data-jump]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const el = panel.querySelector(`#term-${CSS.escape(a.dataset.jump)}`);
      if(el){ el.scrollIntoView({ block:'center', behavior:'smooth' }); el.classList.add('is-highlighted'); window.setTimeout(()=>el.classList.remove('is-highlighted'), 2200); }
    });
  });
}

function matches(str, q){
  return stripAccents(str.toLowerCase()).includes(stripAccents(q.toLowerCase()));
}

function entryCard(entry){
  return `
    <article class="glossary-entry" id="term-${entry.id}">
      <h3>${escapeHtml(entry.terme)}${entry.anglais ? ` <span class="gloss-en">(${escapeHtml(entry.anglais)})</span>` : ''}
        <span class="pill pill-muted" style="font-size:.62rem;">${CAT_LABEL[entry.categorie] || entry.categorie || ''}</span>
      </h3>
      <div class="prose">${enrichHTML(entry.description, { isPlainText:true })}</div>
      ${entry.voir_aussi?.length ? `
        <div class="gloss-seealso">
          <span>Voir aussi :</span>
          ${entry.voir_aussi.map(id => {
            const e2 = getGlossaryEntry(id);
            return e2 ? `<a href="#" class="pill" data-jump="${id}">${escapeHtml(e2.terme)}</a>` : '';
          }).join('')}
        </div>` : ''}
    </article>
  `;
}

function renderTabContent(tab, q){
  if(tab === 'abreviations'){
    const entries = Object.entries(DATA.glossaireRaw.abreviations).filter(([code, def]) => !q || matches(code, q) || matches(def, q));
    if(!entries.length) return emptyState();
    return `<div class="abbrev-grid">${entries.map(([code, def]) => `
      <div class="abbrev-row"><span class="abbrev-code">${escapeHtml(code)}</span><span>${escapeHtml(def)}</span></div>
    `).join('')}</div>`;
  }

  const list = tab === 'actions' ? DATA.glossaireRaw.actions : tab === 'etats' ? DATA.glossaireRaw.etats : DATA.glossaireRaw.glossaire;
  const filtered = list.filter(e => !q || matches(e.terme, q) || matches(e.description, q));
  if(!filtered.length) return emptyState();

  if(tab !== 'glossaire'){
    return `<div class="glossary-list">${filtered.map(entryCard).join('')}</div>`;
  }

  // Groupement alphabétique + nav A-Z pour le glossaire général
  const groups = new Map();
  for(const e of filtered){
    const letter = stripAccents(e.terme[0]).toUpperCase();
    if(!groups.has(letter)) groups.set(letter, []);
    groups.get(letter).push(e);
  }
  const letters = [...groups.keys()].sort();
  return `
    <nav class="az-nav" aria-label="Navigation alphabétique">
      ${letters.map(l => `<a href="#az-${l}">${l}</a>`).join('')}
    </nav>
    <div class="glossary-list">
      ${letters.map(l => `
        <div id="az-${l}" class="az-group">
          <h2 class="az-letter">${l}</h2>
          ${groups.get(l).map(entryCard).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

function emptyState(){
  return `<div class="empty-state"><span class="i-big">🔍</span><p>Aucun terme ne correspond à cette recherche.</p></div>`;
}
