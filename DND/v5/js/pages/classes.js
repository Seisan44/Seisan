import { DATA } from '../data.js';
import { classImageLocal, imgWithFallback } from '../images.js';
import { enrichHTML } from '../enrich.js';
import { escapeHtml } from '../utils.js';
import { parseClassTraits } from '../class-traits.js';
import { openModal } from '../modal.js';
import { CLASS_TIPS } from './class-tips.js';

export async function renderClasses(container, parts){
  if(parts && parts[0]){
    const cls = DATA.classesBySlug.get(parts[0]);
    if(cls){ renderDetail(container, cls, parts[1]); return; }
  }
  renderGrid(container);
}

function renderGrid(container){
  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Voies de héros</p>
      <h1 class="page-title">Classes</h1>
      <p class="page-lede">Douze vocations, chacune avec ses propres capacités, ses sous-classes et sa manière de peser sur un combat.</p>
    </header>
    <div class="card-grid card-grid-wide" id="classes-grid"></div>
  `;
  const grid = container.querySelector('#classes-grid');
  grid.innerHTML = DATA.classes.map(c => {
    const traits = parseClassTraits(c.html_traits_table);
    return `
    <a class="card" href="#classes/${c.slug}">
      <div class="card-media">${imgWithFallback(classImageLocal(c.image), c.classe_title, { fallbackEmoji:'⚔️' })}</div>
      <div class="card-body">
        <h2 class="card-title">${escapeHtml(c.classe_title)}</h2>
        <div class="card-meta">
          <span class="pill pill-muted">${escapeHtml(traits.caracteristique)}</span>
          <span class="pill pill-muted">D${traits.deVieFaces}</span>
          ${c._homebrew ? `<span class="pill">✨ Homebrew</span>` : ''}
        </div>
        <p class="card-desc">${c.subclasses.length} sous-classe${c.subclasses.length>1?'s':''} : ${escapeHtml(c.subclasses.map(s=>s.classe_title).join(', '))}</p>
      </div>
    </a>`;
  }).join('');
}

const TABS = [
  { key:'presentation', label:'Présentation' },
  { key:'capacites', label:'Capacités' },
  { key:'sorts', label:'Sorts' },
  { key:'sousclasses', label:'Sous-classes' },
  { key:'conseils', label:'Conseils' },
];

function renderDetail(container, c, subSlugFromUrl){
  const traits = parseClassTraits(c.html_traits_table);
  const isCaster = DATA.getSpellsForClass(c.classe_title).length > 0;
  const tabs = TABS.filter(t => t.key !== 'sorts' || isCaster);

  container.innerHTML = `
    <a href="#classes" class="btn btn-ghost btn-sm" style="margin-bottom:1.4rem;">&larr; Toutes les classes</a>
    <div class="detail-hero">
      <div class="detail-portrait">${imgWithFallback(classImageLocal(c.image), c.classe_title, { fallbackEmoji:'⚔️' })}</div>
      <div class="detail-heading">
        <p class="eyebrow">Classe</p>
        <h1 class="page-title" style="font-size:2.2rem;">${escapeHtml(c.classe_title)}</h1>
        <div class="detail-badges">
          ${c._homebrew ? `<span class="pill">✨ Homebrew</span>` : ''}
          <span class="pill">${escapeHtml(traits.caracteristique)}</span>
          <span class="pill">D${traits.deVieFaces} par niveau</span>
          <span class="pill">JS : ${escapeHtml(traits.sauvegardes.join(', '))}</span>
          ${isCaster ? `<span class="pill">Lanceur de sorts</span>` : ''}
        </div>
      </div>
    </div>

    <div class="tabs" role="tablist" id="class-tabs">
      ${tabs.map((t,i) => `<button class="tab" role="tab" data-tab="${t.key}" aria-selected="${i===0}">${t.label}</button>`).join('')}
    </div>
    <div class="tabpanel" id="class-tabpanel"></div>
  `;

  const panel = container.querySelector('#class-tabpanel');
  const tabBtns = container.querySelectorAll('.tab');
  function selectTab(key){
    tabBtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === key)));
    panel.innerHTML = renderPanel(key, c, traits, isCaster);
    wirePanel(key, panel, c);
  }
  tabBtns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
  selectTab(tabs[0].key);

  if(subSlugFromUrl){
    const sc = c.subclasses.find(s => s.slug === subSlugFromUrl);
    if(sc) window.setTimeout(() => openSubclassModal(sc, c), 60);
  }
}

function renderPanel(key, c, traits, isCaster){
  if(key === 'presentation'){
    return `
      <div class="prose reading">${enrichHTML(c.classe_description)}</div>
      <div class="table-wrap">${c.html_traits_table || ''}</div>
    `;
  }
  if(key === 'capacites'){
    const byLevel = new Map();
    for(const cap of c.capacites){
      const lvl = Number(cap.niveau);
      if(!byLevel.has(lvl)) byLevel.set(lvl, []);
      byLevel.get(lvl).push(cap);
    }
    const levels = [...byLevel.keys()].sort((a,b) => a-b);
    return `
      ${c.html_capacites_table ? `<div class="table-wrap">${c.html_capacites_table}</div>` : ''}
      <div class="capacite-list">
        ${levels.map(lvl => `
          <div class="level-group">
            <h3 class="level-heading">Niveau ${lvl}</h3>
            ${byLevel.get(lvl).map(cap => capaciteBlock(cap.capacite_name, cap.description_html)).join('')}
          </div>
        `).join('')}
      </div>
    `;
  }
  if(key === 'sorts'){
    if(!isCaster) return `<p class="page-lede">Cette classe ne lance pas de sorts.</p>`;
    const spells = DATA.getSpellsForClass(c.classe_title).slice().sort((a,b) => a._niveauNum - b._niveauNum || a._primaryName.localeCompare(b._primaryName));
    const byLevel = new Map();
    for(const s of spells){ if(!byLevel.has(s.niveau)) byLevel.set(s.niveau, []); byLevel.get(s.niveau).push(s); }
    const levels = [...byLevel.keys()].sort((a,b) => Number(a)-Number(b));
    return `
      <p class="page-lede" style="margin-bottom:1.2em;">${spells.length} sorts accessibles à cette classe. Cliquez un sort pour voir son détail complet.</p>
      ${levels.map(lvl => `
        <div class="level-group">
          <h3 class="level-heading">${lvl === '0' ? 'Sorts mineurs' : `Niveau ${lvl}`}</h3>
          <div class="spell-chip-row">
            ${byLevel.get(lvl).map(s => `<a class="pill pill-muted spell-chip" href="#sorts/${s._slug}">${escapeHtml(s._primaryName)}</a>`).join('')}
          </div>
        </div>
      `).join('')}
    `;
  }
  if(key === 'sousclasses'){
    if(!c.subclasses.length) return `<p class="page-lede">Aucune sous-classe recensée.</p>`;
    return `
      <div class="card-grid" id="subclass-grid">
        ${c.subclasses.map(sc => `
          <button type="button" class="card" data-subslug="${sc.slug}">
            <div class="card-media">${imgWithFallback(classImageLocal(sc.image), sc.classe_title, { fallbackEmoji:'✦' })}</div>
            <div class="card-body">
              <h2 class="card-title">${escapeHtml(sc.classe_title)}</h2>
              ${sc._homebrew ? `<div class="card-meta"><span class="pill">✨ Homebrew</span></div>` : ''}
            </div>
          </button>
        `).join('')}
      </div>
    `;
  }
  if(key === 'conseils'){
    const tips = CLASS_TIPS[c.classe_title] || [];
    return `
      <ul class="tips-list">
        ${tips.map(t => `<li><span class="tips-icon" aria-hidden="true">✦</span><span>${escapeHtml(t)}</span></li>`).join('')}
      </ul>
    `;
  }
  return '';
}

function wirePanel(key, panel, c){
  if(key === 'sousclasses'){
    panel.querySelectorAll('[data-subslug]').forEach(card => {
      card.addEventListener('click', () => {
        const sc = c.subclasses.find(s => s.slug === card.dataset.subslug);
        if(sc) openSubclassModal(sc, c, card);
      });
    });
  }
  if(key === 'capacites') wireCapaciteToggles(panel);
}

/** Bloc de capacité replié par défaut : titre cliquable, description masquée tant qu'on
 * ne l'a pas ouverte, pour alléger la lecture d'une longue liste de capacités. */
function capaciteBlock(name, descriptionHtml){
  return `
    <article class="capacite-block is-collapsible">
      <button type="button" class="capacite-toggle" data-cap-toggle>
        <span class="capacite-toggle-title">${escapeHtml(name)}</span>
        <svg class="i chevron"><use href="#i-chevron"/></svg>
      </button>
      <div class="capacite-body">
        <div class="prose">${enrichHTML(descriptionHtml)}</div>
      </div>
    </article>
  `;
}

function wireCapaciteToggles(root){
  root.querySelectorAll('[data-cap-toggle]').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.is-collapsible').classList.toggle('is-expanded'));
  });
}

function openSubclassModal(sc, parentClass, originEl){
  openModal({
    eyebrow: (sc._homebrew ? '✨ Homebrew · ' : '') + `Sous-classe de ${parentClass.classe_title}`,
    title: escapeHtml(sc.classe_title),
    originEl,
    wide: true,
    build(body){
      const byLevel = new Map();
      for(const cap of sc.capacites || []){
        const lvl = Number(cap.niveau);
        if(!byLevel.has(lvl)) byLevel.set(lvl, []);
        byLevel.get(lvl).push(cap);
      }
      const levels = [...byLevel.keys()].sort((a,b) => a-b);
      body.innerHTML = `
        <div class="prose">${enrichHTML(sc.classe_description)}</div>
        <div class="capacite-list" style="margin-top:1.2em;">
          ${levels.map(lvl => `
            <div class="level-group">
              <h3 class="level-heading">Niveau ${lvl}</h3>
              ${byLevel.get(lvl).map(cap => capaciteBlock(cap.capacite_name, cap.description_html)).join('')}
            </div>
          `).join('')}
        </div>
      `;
      wireCapaciteToggles(body);
    }
  });
}
