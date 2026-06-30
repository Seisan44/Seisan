/* ============================================================
   CODEX D&D — Application
   Vanilla JS, No Framework
   ============================================================ */

'use strict';

// ============================================================
// CONSTANTS
// ============================================================

const CLASS_ICONS = {
  'Barbare': '⚔', 'Barde': '♪', 'Clerc': '✙', 'Druide': '❧',
  'Ensorceleur': '✦', 'Guerrier': '🛡', 'Magicien': '✎', 'Moine': '☯',
  'Occultiste': '✸', 'Paladin': '⚜', 'Rodeur': '🏹', 'Roublard': '⚟',
};

const SCHOOL_DOTS = {
  'Abjuration': '#4a9edd', 'Divination': '#9b59d6', 'Enchantement': '#e91e8c',
  'Illusion': '#1abc9c', 'Invocation': '#2ecc71', 'Nécromancie': '#9b59b6',
  'Transmutation': '#e67e22', 'Évocation': '#e74c3c',
};

const DMG_ICONS = {
  'dmg-fire':        'img/type_degats/fire_damage.png',
  'dmg-cold':        'img/type_degats/cold_damage.png',
  'dmg-lightning':   'img/type_degats/lightning_damage.png',
  'dmg-acid':        'img/type_degats/acid_damage.png',
  'dmg-poison':      'img/type_degats/poison_damage.png',
  'dmg-necrotic':    'img/type_degats/necrotic_damage.png',
  'dmg-radiant':     'img/type_degats/radiant_damage.png',
  'dmg-thunder':     'img/type_degats/thunder_damage.png',
  'dmg-force':       'img/type_degats/force_damage.png',
  'dmg-psychic':     'img/type_degats/psychic_damage.png',
  'dmg-bludgeoning': 'img/type_degats/bludgeoning_damage.png',
  'dmg-slashing':    'img/type_degats/slashing_damage.png',
  'dmg-piercing':    'img/type_degats/piercing_damage.png',
};

const DON_TYPE_LABELS = {
  'general': { label: 'Général', tagClass: 'tag-gold' },
  'origine': { label: 'Origine', tagClass: 'tag-blue' },
  'style_combat': { label: 'Style de combat', tagClass: 'tag-red' },
};

const CAT_LABELS = {
  'mécanique': { label: 'Mécanique', tagClass: 'tag-gold' },
  'combat': { label: 'Combat', tagClass: 'tag-red' },
  'magie': { label: 'Magie', tagClass: 'tag-purple' },
  'déplacement': { label: 'Déplacement', tagClass: 'tag-green' },
  'exploration': { label: 'Exploration', tagClass: 'tag-teal' },
  'repos': { label: 'Repos', tagClass: 'tag-blue' },
  'zone-d-effet': { label: "Zone d'effet", tagClass: 'tag-orange' },
};

const RACE_ICONS = {
  'Drakéide': '🐉', 'Elfe': '✨', 'Gnome': '⚙', 'Goliath': '⛰',
  'Halfelin': '🍀', 'Humain': '⚑', 'Nain': '⚒', 'Orc': '⚔', 'Tieffelin': '🔥',
};

// ============================================================
// APP STATE
// ============================================================

const APP = {
  data: { species: null, classes: null, dons: null, glossaire: null, sorts: null, races: null, armes: null, armures: null, materiels: null, outils: null, objetsMagiques: null, historiques: null },
  termRegistry: new Map(),    // slug → { type, id, data }
  glossaireById: new Map(),   // id → entry
  currentPage: null,
  tooltipTimer: null,
};

// ============================================================
// UTILITIES
// ============================================================

function normalize(str) {
  return String(str).toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ').trim();
}

function slugify(str) {
  return normalize(str).replace(/\s+/g, '-');
}

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function truncate(str, len) {
  const s = str.replace(/<[^>]*>/g, '');
  return s.length > len ? s.slice(0, len).trimEnd() + '…' : s;
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function tag(text, cls = 'tag-gray', extra = '') {
  return `<span class="tag ${cls}" ${extra}>${escHtml(text)}</span>`;
}

// ============================================================
// DATA LOADING
// ============================================================

async function loadData() {
  const files = {
    species:   'data/species.json',
    classes:   'data/classes.json',
    dons:      'data/dons.json',
    glossaire: 'data/glossaire.json',
    sorts:     'data/sorts.json',
    races:     'data/races.json',
    armes:          'data/armes.json',
    armures:        'data/armures.json',
    materiels:      'data/materiels_aventuriers.json',
    outils:         'data/outils.json',
    objetsMagiques: 'data/objets_magiques.json',
    historiques:    'data/historiques.json',
  };
  const entries = Object.entries(files);
  const results = await Promise.all(entries.map(([, path]) => fetch(path).then(r => r.json()).catch(() => null)));
  entries.forEach(([key], i) => APP.data[key] = results[i]);
}

// ============================================================
// TERM REGISTRY
// ============================================================

function buildTermRegistry() {
  const reg = APP.termRegistry;
  const glos = APP.glossaireById;

  // Glossaire
  if (APP.data.glossaire?.glossaire) {
    for (const entry of APP.data.glossaire.glossaire) {
      glos.set(entry.id, entry);
      reg.set(slugify(entry.terme), { type: 'glossaire', id: entry.id, label: entry.terme });
    }
  }

  // Races / especes
  if (APP.data.species) {
    for (const s of APP.data.species) {
      reg.set(slugify(s.espece), { type: 'espece', id: slugify(s.espece), label: s.espece });
    }
  }

  // Classes
  if (APP.data.classes) {
    for (const group of APP.data.classes) {
      reg.set(slugify(group[0].classe_title), { type: 'classe', id: slugify(group[0].classe_title), label: group[0].classe_title });
    }
  }

  // Sorts
  if (APP.data.sorts) {
    for (const s of APP.data.sorts) {
      const mainName = s.name.includes('|') ? s.name.split('|')[0].trim() : s.name;
      reg.set(slugify(mainName), { type: 'sort', id: slugify(mainName), label: mainName, data: s });
    }
  }

  // Équipements
  const allEquip = [];
  if (APP.data.armes?.armes) APP.data.armes.armes.forEach(cat => cat.armes?.forEach(a => allEquip.push({ nom: a.nom, type: 'equipement', subtype: 'arme' })));
  if (APP.data.armures?.armures) APP.data.armures.armures.forEach(cat => cat.armures?.forEach(a => allEquip.push({ nom: a.nom, type: 'equipement', subtype: 'armure' })));
  if (APP.data.materiels) APP.data.materiels.forEach(m => allEquip.push({ nom: m.nom, type: 'equipement', subtype: 'materiel' }));
  if (APP.data.outils) APP.data.outils.forEach(o => allEquip.push({ nom: o.nom, type: 'equipement', subtype: 'outil' }));
  if (APP.data.objetsMagiques) APP.data.objetsMagiques.forEach(o => allEquip.push({ nom: o.nom, type: 'equipement', subtype: 'objet-magique' }));
  APP.data._allEquip = allEquip;
  for (const e of allEquip) {
    reg.set(slugify(e.nom), { type: 'equipement', id: slugify(e.nom), label: e.nom, data: e });
  }
}

// ============================================================
// GLOSSAIRE TEXT ENRICHMENT (# notation)
// ============================================================

function enrichGlossaireText(text) {
  if (!text) return '';
  return text.replace(/#([^#]+)#/g, (_, id) => {
    const entry = APP.glossaireById.get(id);
    if (entry) {
      return `<a class="term-link" href="#glossaire" data-term-id="${entry.id}" data-term-type="glossaire">${escHtml(entry.terme)}</a>`;
    }
    return `<strong>${escHtml(id)}</strong>`;
  });
}

// ============================================================
// ROUTER
// ============================================================

const PAGES = ['accueil', 'races', 'classes', 'dons', 'glossaire', 'sorts', 'equipements', 'combat', 'historiques', 'personnage'];

function navigate(page) {
  if (!PAGES.includes(page)) page = 'accueil';
  APP.currentPage = page;
  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  // Close mobile nav
  closeMobileNav();
  // Render page
  const app = document.getElementById('app');
  app.innerHTML = '';
  const renderers = {
    accueil: renderAccueil,
    races: renderRaces,
    classes: renderClasses,
    dons: renderDons,
    glossaire: renderGlossaire,
    sorts: renderSorts,
    equipements: renderEquipements,
    combat:      renderCombat,
    historiques: renderHistoriques,
    personnage:  renderPersonnage,
  };
  if (renderers[page]) renderers[page](app);
}

function getHashPage() {
  return location.hash.replace('#', '') || 'accueil';
}

// ============================================================
// MODAL
// ============================================================

const Modal = {
  el: null,
  overlay: null,
  body: null,
  close: null,

  init() {
    this.overlay = document.getElementById('modal-overlay');
    this.el = document.getElementById('modal');
    this.body = document.getElementById('modal-body');
    this.close = document.getElementById('modal-close');
    this.overlay.addEventListener('click', e => { if (e.target === this.overlay) this.hide(); });
    this.close.addEventListener('click', () => this.hide());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') this.hide(); });
  },

  show(html) {
    this.body.innerHTML = html;
    this.overlay.classList.remove('hidden');
    this.el.focus();
    document.body.style.overflow = 'hidden';
    // Wire term links inside modal
    wireTermLinks(this.body);
  },

  hide() {
    this.overlay.classList.add('hidden');
    this.body.innerHTML = '';
    document.body.style.overflow = '';
  },
};

// ============================================================
// TOOLTIP
// ============================================================

const Tooltip = {
  el: null,
  inner: null,

  init() {
    this.el = document.getElementById('tooltip');
    this.inner = document.getElementById('tooltip-inner');
  },

  show(html, x, y) {
    this.inner.innerHTML = html;
    this.el.classList.remove('hidden');
    this.el.setAttribute('aria-hidden', 'false');
    this.position(x, y);
  },

  hide() {
    this.el.classList.add('hidden');
    this.el.setAttribute('aria-hidden', 'true');
  },

  position(x, y) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const r = this.el.getBoundingClientRect();
    let lx = x + 16, ly = y + 16;
    if (lx + r.width > vw - 8) lx = x - r.width - 10;
    if (ly + r.height > vh - 8) ly = y - r.height - 10;
    this.el.style.left = Math.max(8, lx) + 'px';
    this.el.style.top  = Math.max(8, ly) + 'px';
  },
};

// ============================================================
// TERM LINKS (hover tooltips)
// ============================================================

function wireTermLinks(container) {
  container.querySelectorAll('.term-link').forEach(el => {
    el.addEventListener('mouseenter', e => {
      const id = el.dataset.termId;
      const type = el.dataset.termType;
      if (type === 'glossaire') {
        const entry = APP.glossaireById.get(id);
        if (!entry) return;
        const cat = CAT_LABELS[entry.categorie] || { label: entry.categorie };
        const html = `
          <div class="tooltip-title">${escHtml(entry.terme)}</div>
          <div class="tooltip-cat">${escHtml(cat.label || entry.categorie)}</div>
          <div class="tooltip-desc">${truncate(entry.description.replace(/#([^#]+)#/g, '$1'), 180)}</div>`;
        clearTimeout(APP.tooltipTimer);
        APP.tooltipTimer = setTimeout(() => Tooltip.show(html, e.clientX, e.clientY), 200);
      }
    });
    el.addEventListener('mousemove', e => {
      if (!Tooltip.el.classList.contains('hidden')) Tooltip.position(e.clientX, e.clientY);
    });
    el.addEventListener('mouseleave', () => {
      clearTimeout(APP.tooltipTimer);
      Tooltip.hide();
    });
    el.addEventListener('click', e => {
      const id = el.dataset.termId;
      const type = el.dataset.termType;
      if (type === 'glossaire') {
        e.preventDefault();
        Modal.hide();
        navigate('glossaire');
        // Wait for page to render then scroll
        setTimeout(() => {
          const target = document.getElementById(`glos-${id}`);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    });
  });
}

// ============================================================
// SEARCH UTILITY
// ============================================================

function createSearch(container, items, options) {
  const {
    searchFields = [],
    renderItem,
    filters = [],       // [{ key, value }] active filters
    emptyText = 'Aucun résultat',
  } = options;

  const matchSearch = (item, query) => {
    if (!query) return true;
    const q = normalize(query);
    return searchFields.some(fn => normalize(fn(item)).includes(q));
  };

  const matchFilters = (item, activeFilters) => {
    return activeFilters.every(f => f.test(item));
  };

  return (query = '', activeFilters = []) => {
    const filtered = items.filter(item => matchSearch(item, query) && matchFilters(item, activeFilters));
    if (filtered.length === 0) {
      container.innerHTML = `<div class="no-results"><div class="no-results-icon">🔍</div><p class="no-results-text">${escHtml(emptyText)}</p></div>`;
    } else {
      container.innerHTML = filtered.map((item, i) => renderItem(item, i)).join('');
    }
    return filtered.length;
  };
}

// ============================================================
// PAGE: ACCUEIL
// ============================================================

function renderAccueil(container) {
  const data = APP.data;
  const nSorts = data.sorts?.length || 0;
  const nDons = data.dons?.length || 0;
  const nSpecies = data.species?.length || 0;
  const nClasses = data.classes?.length || 0;
  const nGlos = data.glossaire?.glossaire?.length || 0;

  const html = `
  <div class="page">
    <div class="accueil-hero">
      <span class="hero-sigil" aria-hidden="true">⚔</span>
      <h1 class="hero-title">Codex D&D</h1>
      <p class="hero-tagline">Compagnon interactif pour Dungeons &amp; Dragons 2024</p>
      <div class="page-ornament" aria-hidden="true">✦</div>
      <div class="accueil-stats" aria-label="Statistiques du Codex">
        <div class="stat-item">
          <span class="stat-number">${nSpecies}</span>
          <span class="stat-label">Races</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${nClasses}</span>
          <span class="stat-label">Classes</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${nDons}</span>
          <span class="stat-label">Dons</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${nSorts}</span>
          <span class="stat-label">Sorts</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${nGlos}</span>
          <span class="stat-label">Termes</span>
        </div>
      </div>
    </div>
    <div class="accueil-nav-grid" role="navigation" aria-label="Sections du Codex">
      ${[
        { page: 'races',     icon: '❧', title: 'Races',     count: `${nSpecies} espèces`,    desc: 'Explorez les espèces jouables' },
        { page: 'classes',   icon: '⚔', title: 'Classes',   count: `${nClasses} classes`,    desc: '+ sous-classes disponibles' },
        { page: 'dons',      icon: '✦', title: 'Dons',      count: `${nDons} dons`,          desc: 'Général, Origine, Combat' },
        { page: 'glossaire', icon: '✎', title: 'Glossaire', count: `${nGlos} termes`,        desc: 'Règles et mécaniques' },
        { page: 'sorts',     icon: '✸', title: 'Sorts',     count: `${nSorts} sorts`,        desc: '8 écoles de magie' },
      ].map(({ page, icon, title, count, desc }) => `
        <button class="accueil-nav-card" data-nav="${page}" aria-label="Aller à ${title}">
          <span class="accueil-card-icon" aria-hidden="true">${icon}</span>
          <span class="accueil-card-title">${escHtml(title)}</span>
          <span class="accueil-card-count">${escHtml(count)}</span>
          <span class="accueil-card-desc" style="font-size:.8rem;color:var(--text-faint)">${escHtml(desc)}</span>
        </button>`).join('')}
    </div>
  </div>`;

  container.innerHTML = html;
  container.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.nav;
      location.hash = page;
    });
  });
}

// ============================================================
// PAGE: RACES
// ============================================================

function renderRaces(container) {
  const species = APP.data.species || [];

  const pageHtml = `
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Races & Espèces</h1>
        <div class="page-ornament" aria-hidden="true">❧</div>
        <p class="page-subtitle">${species.length} espèces jouables — Dungeons &amp; Dragons 2024</p>
      </div>
      <div class="controls-bar">
        <div class="search-bar-wrap">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input class="search-input" type="search" id="races-search" placeholder="Rechercher une race…" aria-label="Rechercher une race">
          <button class="search-clear" id="races-clear" aria-label="Effacer">✕</button>
        </div>
        <span class="results-count" id="races-count">${species.length} espèce${species.length > 1 ? 's' : ''}</span>
      </div>
      <div class="cards-grid cards-grid--3" id="races-grid" role="list"></div>
    </div>
  </div>`;

  container.innerHTML = pageHtml;
  const grid = document.getElementById('races-grid');
  const searchInput = document.getElementById('races-search');
  const clearBtn = document.getElementById('races-clear');
  const countEl = document.getElementById('races-count');

  const render = createSearch(grid, species, {
    searchFields: [s => s.espece, s => s.infos?.['Type de créature'] || '', s => (s.capacites || []).map(c => c.nom).join(' ')],
    renderItem: (s) => renderRaceCard(s),
    emptyText: 'Aucune race ne correspond à cette recherche.',
  });

  const update = debounce(() => {
    const n = render(searchInput.value);
    countEl.textContent = `${n} espèce${n > 1 ? 's' : ''}`;
    wireRaceCards();
  }, 150);

  render('');
  wireRaceCards();

  searchInput.addEventListener('input', update);
  clearBtn.addEventListener('click', () => { searchInput.value = ''; update(); searchInput.focus(); });
}

function speciesImagePath(nom, type = 'full') {
  const map = {
    'Elfe': 'elf', 'Nain': 'dwarf', 'Humain': 'human', 'Halfelin': 'halfling',
    'Gnome': 'gnome', 'Demi-Elfe': 'elf', 'Tiefelin': 'tiefling', 'Demi-Orc': 'orc',
    'Dragonide': 'dragonborn', 'Goliath': 'goliath', 'Orc': 'orc', 'Tieffelin': 'tiefling',
    'Drakéide': 'dragonborn',
  };
  const key = map[nom] || nom.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
  return type === 'thumb'
    ? `img/species/thunbmail_${key}.png`
    : `img/species/${key}.png`;
}

function renderRaceCard(s) {
  const infos = s.infos || {};
  const subCount = s.sous_especes?.length || 0;
  const thumbUrl = speciesImagePath(s.espece, 'thumb');
  return `
  <article class="card" data-espece="${escHtml(s.espece)}" role="listitem" tabindex="0"
    aria-label="${escHtml(s.espece)}" style="cursor:pointer">
    <div class="race-card-img" style="background-image:url('${thumbUrl}')"></div>
    <div class="card-header" style="border-top:0">
      <h3 class="card-title">${escHtml(s.espece)}</h3>
      ${subCount ? `<p class="card-subtitle">${subCount} sous-espèce${subCount > 1 ? 's' : ''}</p>` : ''}
    </div>
    <div class="card-body">
      <div class="race-info-strip">
        ${infos['Taille'] ? tag(infos['Taille'], 'tag-gray') : ''}
        ${infos['Vitesse'] ? tag('Vitesse ' + infos['Vitesse'], 'tag-teal') : ''}
        ${infos['Type de créature'] ? tag(infos['Type de créature'], 'tag-gold') : ''}
      </div>
      <p class="card-desc" style="margin-top:.5rem">${escHtml((s.capacites || []).slice(0, 3).map(c => c.nom).join(' · '))}</p>
    </div>
    <div class="card-footer">
      <span style="font-size:.8rem;color:var(--text3)">${(s.capacites || []).length} capacité${(s.capacites || []).length > 1 ? 's' : ''}</span>
    </div>
  </article>`;
}

function wireRaceCards() {
  document.querySelectorAll('[data-espece]').forEach(card => {
    const handler = () => {
      const name = card.dataset.espece;
      const s = APP.data.species.find(sp => sp.espece === name);
      if (s) Modal.show(renderRaceModal(s));
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

function renderRaceModal(s) {
  const infos = s.infos || {};
  const subs = s.sous_especes || [];
  const caps = s.capacites || [];
  const tables = s.tables || [];
  const imgUrl = speciesImagePath(s.espece, 'full');

  return `
    <div class="race-modal-hero">
      <img class="race-modal-hero-img" src="${imgUrl}" alt="${escHtml(s.espece)}" loading="lazy" onerror="this.closest('.race-modal-hero').style.display='none'">
      <div class="race-modal-hero-title">
        <h2 class="modal-title race-modal-title" id="modal-title">${escHtml(s.espece)}</h2>
      </div>
    </div>
    <div class="modal-tags">
      ${infos['Taille'] ? tag(infos['Taille'], 'tag-gray') : ''}
      ${infos['Vitesse'] ? tag('Vitesse : ' + infos['Vitesse'], 'tag-teal') : ''}
      ${infos['Type de créature'] ? tag(infos['Type de créature'], 'tag-gold') : ''}
    </div>

    ${infos && Object.keys(infos).length ? `
    <div class="info-grid">
      ${Object.entries(infos).map(([k, v]) => `
        <div class="info-cell">
          <div class="info-cell-label">${escHtml(k)}</div>
          <div class="info-cell-value">${escHtml(v)}</div>
        </div>`).join('')}
    </div>` : ''}

    ${caps.length ? `
    <h3 class="modal-section-title">Capacités raciales</h3>
    <div class="capacite-list">
      ${caps.map(c => `
        <div class="capacite-item">
          <div class="capacite-name">${escHtml(c.nom)}</div>
          <div class="capacite-desc">${escHtml(c.description)}</div>
          ${(c.tables || []).map(t => `<div class="mt-2">${t.html}</div>`).join('')}
        </div>`).join('')}
    </div>` : ''}

    ${subs.length ? `
    <div class="modal-divider"></div>
    <h3 class="modal-section-title">Sous-espèces</h3>
    <div class="sous-espece-list">
      ${subs.map(sub => `
        <div class="sous-espece-item">
          <div class="sous-espece-name">${escHtml(sub.nom)}</div>
          <div style="font-size:.9rem;color:var(--text2);line-height:1.55">${escHtml(sub.description)}</div>
        </div>`).join('')}
    </div>` : ''}

    ${tables.length ? `
    ${tables.map(t => `<div class="mt-2">${t.html}</div>`).join('')}` : ''}`;
}

// ============================================================
// PAGE: CLASSES — Redesign complet
// ============================================================

const CLASS_COLORS = {
  'Barbare': '#c0392b', 'Barde': '#8e44ad', 'Clerc': '#d4ac0d',
  'Druide': '#1e8449', 'Ensorceleur': '#922b21', 'Guerrier': '#d35400',
  'Magicien': '#1a5276', 'Moine': '#117a65', 'Occultiste': '#6c3483',
  'Paladin': '#b7950b', 'Rodeur': '#196f3d', 'Roublard': '#566573',
};

// Classes avec accès aux sorts (normalisation pour correspondre sorts.json)
const SPELLCASTING_CLASSES = new Set([
  'barde', 'clerc', 'druide', 'ensorceleur', 'magicien', 'occultiste', 'paladin', 'rodeur'
]);

// État de la page classes (persist entre appels de renderClasses si même page)
let CLS = { groupIdx: null, tab: 'presentation', capLevel: null, sortLevel: null };

/* ===== ENRICHISSEMENT D&D — couleurs + mots-clés ===== */
const _FL  = 'a-zàáâãäçèéêëîïôùûü';     // lettres françaises (flag /i gère les majuscules)
const _WS  = `(?<![${_FL}])`;             // début de mot : non précédé d'une lettre française
const _WE  = `(?![${_FL}])`;             // fin de mot   : non suivi d'une lettre française

// [pattern_string, css_class]  — ordre = priorité (premier match gagne)
const ENRICH_RULES = [
  [`\\d+d\\d+(?:\\s*[-+]\\s*\\d+)?`,        'dnd-dice'      ],  // 1d6, 2d8+3
  [`jet(?:s)? de sauvegarde`,               'dnd-saving'    ],  // jet de sauvegarde
  [`action bonus`,                          'dnd-action'    ],  // action bonus (avant "action")
  [`à terre`,                               'dnd-condition' ],  // à terre (avant "terre")
  [`désavantage`,                           'dnd-disadv'    ],  // avant "avantage"
  [`avantage`,                              'dnd-adv'       ],
  [`réaction`,                              'dnd-action'    ],
  // Types de dégâts — forme adjectivale (dégâts nécrotiques)
  [`nécrotiques?`,                          'dmg-necrotic'  ],
  [`radiante?s?`,                           'dmg-radiant'   ],
  [`psychiques?`,                           'dmg-psychic'   ],
  [`contondante?s?`,                        'dmg-bludgeoning'],
  [`tranchante?s?`,                         'dmg-slashing'  ],
  [`perforante?s?`,                         'dmg-piercing'  ],
  // Types de dégâts — forme nominale (dégâts de X / dégâts d'X)
  [`(?<=dégâts\\s+de\\s+)foudre`,          'dmg-lightning' ],
  [`(?<=dégâts\\s+de\\s+)tonnerre`,        'dmg-thunder'   ],
  [`(?<=dégâts\\s+d')acide`,               'dmg-acid'      ],
  [`(?<=dégâts\\s+de\\s+)poison`,          'dmg-poison'    ],
  [`(?<=dégâts\\s+de\\s+)froid`,           'dmg-cold'      ],
  [`(?<=dégâts\\s+de\\s+)feu`,             'dmg-fire'      ],
  [`(?<=dégâts\\s+de\\s+)force`,           'dmg-force'     ],
  // Caractéristiques D&D — après dmg-force pour lui laisser priorité sur "Force"
  [`Force|Dextérité|Constitution|Intelligence|Sagesse|Charisme`, 'dnd-ability'],
  // Distances françaises : "9 mètres", "1,50 mètre"
  [`\\d[\\d,]*\\s*mètres?`,                'dnd-dist'      ],
  // Conditions D&D (apparaissent souvent avec majuscule dans le texte)
  [`étourdie?s?`,                          'dnd-condition' ],
  [`charmée?s?`,                           'dnd-condition' ],
  [`effrayée?s?`,                          'dnd-condition' ],
  [`paralysée?s?`,                         'dnd-condition' ],
  [`pétrifiée?s?`,                         'dnd-condition' ],
  [`aveuglée?s?`,                          'dnd-condition' ],
  [`assourdie?s?`,                         'dnd-condition' ],
  [`empoisonnée?s?`,                       'dnd-condition' ],
  [`épuisement`,                           'dnd-condition' ],
  [`invisibles?`,                          'dnd-condition' ],
  [`entravée?s?`,                          'dnd-condition' ],
  [`inconsciente?s?`,                      'dnd-condition' ],
  [`neutralisée?s?`,                       'dnd-condition' ],
  [`agrippée?s?`,                          'dnd-condition' ],
];

// Regex combinée : chaque règle = un groupe de capture
const ENRICH_RE = (() => {
  const parts = ENRICH_RULES.map(([pat]) => {
    // Patterns avec lookbehind : le WS viendrait APRÈS le lookbehind
    if (pat.startsWith('(?<=')) return `(${pat}${_WE})`;
    return `(${_WS}${pat}${_WE})`;
  });
  return new RegExp(parts.join('|'), 'gi');
})();

function _enrichCls(m) {
  // Retourne la classe CSS du premier groupe capturé dans le match
  const i = ENRICH_RULES.findIndex((_, j) => m[j + 1] !== undefined);
  return i >= 0 ? ENRICH_RULES[i][1] : '';
}

const SORT_IMG_OVERRIDES = {
  'amis':                                'faux_amis',
  'lumieres_dansantes':                  'lumiere_dansantes',
  'main_de_mage':                        'main_du_mage',
  'armure_de_mage':                      'armure_du_mage',
  'charme_personne':                     'charmepersonne',
  'agrandissement_rapetissement':        'agrandissement__rapetissement',
  'apaisement_des_emotions':             'apaisemment_des_emotions',
  'cecite_surdite':                      'cecitesurdite',
  'localisation_danimaux_ou_de_plantes': 'localisation_danimaux_ou_de_plante',
  'verrou_arcanique':                    'verrou_magique',
  'convocation_de_mort_vivant':          'convocation_de_mortvivant',
  'invocation_de_projectiles':           'herissement_de_projectiles',
  'marche_sur_leau':                     'marche_sur_londe',
  'peur':                                'terreur',
  'charme_monstre':                      'charmemonstre',
  'fontaine_de_lune':                    'fontaine_de_la_lune',
  'oeil_du_mage':                        'il_du_mage',
  'sphere_resiliente_dotiluke':          'sphere_resiliente_d_otiluke',
  'communion_avec_la_nature':            'communion',
  'passe_muraille':                      'passemuraille',
  'chaudron_bouillonnant_de_tasha':      'chaudron_bouillant_de_tasha',
  'creation_de_mort_vivant':             'creation_de_mortvivant',
  'mauvais_oeil':                        'mauvais_il',
  'protections_et_sceaux':              'protection_et_sceaux',
  'urne_magique':                        'possession',
  'aversion_attirance':                  'aversion__attirance',
  'demi_plan':                           'demiplan',
};

// Retourne l'URL de l'image d'un sort (img/sorts/<slug>.png)
function getSortImgUrl(nom) {
  const slug = nom
    .split('|')[0].trim()
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
  return `img/sorts/${SORT_IMG_OVERRIDES[slug] || slug}.png`;
}

// Pour les descriptions de sorts (texte brut → HTML enrichi)
function enrichSortText(text) {
  if (!text) return '';
  ENRICH_RE.lastIndex = 0;
  const parts = [];
  let last = 0, m;
  while ((m = ENRICH_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(escHtml(text.slice(last, m.index)));
    const _cls = _enrichCls(m);
    const _icon = DMG_ICONS[_cls];
    const _iconHtml = _icon ? `<img class="dmg-icon" src="${_icon}" alt="" aria-hidden="true" loading="lazy">` : '';
    parts.push(`<span class="${_cls}">${escHtml(m[0])}${_iconHtml}</span>`);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(escHtml(text.slice(last)));
  return parts.join('').replace(/\n/g, '<br>');
}

function localImage(url) {
  if (!url) return null;
  if (url.includes('aidedd.org/assets/')) {
    return 'img/classes/' + url.split('/').pop();
  }
  return url;
}

function sanitizeHtml(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('a').forEach(a => {
    const parent = a.parentNode;
    while (a.firstChild) parent.insertBefore(a.firstChild, a);
    parent.removeChild(a);
  });
  return div.innerHTML;
}

function enrichTraitHtml(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const inner = a.innerHTML;
    const span = document.createElement('span');
    span.innerHTML = inner;
    const spellM = href.match(/\/spell\/fr\/([^/?#]+)/);
    const featM  = href.match(/\/feat\/fr\/([^/?#]+)/);
    if (spellM && spellM[1] !== 'fr') {
      span.className = 'trait-link trait-link--sort';
      span.dataset.traitSort = spellM[1];
      span.setAttribute('tabindex', '0');
      span.setAttribute('role', 'button');
    } else if (featM && featM[1] !== 'fr') {
      span.className = 'trait-link trait-link--don';
      span.dataset.traitDon = featM[1];
      span.setAttribute('tabindex', '0');
      span.setAttribute('role', 'button');
    }
    a.parentNode.replaceChild(span, a);
  });
  return div.innerHTML;
}

function isSpellcaster(title) {
  return SPELLCASTING_CLASSES.has(normalize(title));
}

function getSortsForClass(title) {
  const norm = normalize(title);
  return (APP.data.sorts || []).filter(s =>
    (s.classes || []).some(c => normalize(c) === norm)
  );
}

function renderClasses(container) {
  CLS = { groupIdx: null, tab: 'presentation', capLevel: null, sortLevel: null };
  showClassBrowse(container);
}

function showClassBrowse(container) {
  const groups = APP.data.classes || [];
  container.innerHTML = `
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Classes</h1>
        <div class="page-ornament" aria-hidden="true">⚔</div>
        <p class="page-subtitle">${groups.length} classes — choisissez votre vocation</p>
      </div>
      <div class="controls-bar" style="margin-bottom:2rem">
        <div class="search-bar-wrap">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input class="search-input" type="search" id="classes-search" placeholder="Rechercher une classe…" aria-label="Rechercher une classe">
          <button class="search-clear" id="classes-clear" aria-label="Effacer">✕</button>
        </div>
        <span class="results-count" id="classes-count">${groups.length} classe${groups.length > 1 ? 's' : ''}</span>
      </div>
      <div class="class-browse-grid" id="classes-grid"></div>
    </div>
  </div>`;

  const grid = document.getElementById('classes-grid');
  const search = document.getElementById('classes-search');
  const clear = document.getElementById('classes-clear');
  const count = document.getElementById('classes-count');

  function renderBrowse(q) {
    const nq = normalize(q || '');
    const filtered = nq
      ? groups.filter(g => normalize(g[0].classe_title).includes(nq) ||
          g.slice(1).some(s => normalize(s.classe_title).includes(nq)))
      : groups;
    grid.innerHTML = filtered.map((g, i) => renderBrowseCard(g, i)).join('');
    count.textContent = `${filtered.length} classe${filtered.length > 1 ? 's' : ''}`;
    wireBrowseCards(filtered);
    return filtered.length;
  }

  renderBrowse('');
  search.addEventListener('input', debounce(() => renderBrowse(search.value), 150));
  clear.addEventListener('click', () => { search.value = ''; renderBrowse(''); search.focus(); });
}

function renderBrowseCard(group, idx) {
  const cls = group[0];
  const subs = group.slice(1);
  const icon = CLASS_ICONS[cls.classe_title] || '⚔';
  const imgPath = localImage(cls.image);
  const color = CLASS_COLORS[cls.classe_title] || 'var(--gold-dark)';
  const imgStyle = imgPath
    ? `style="background-image:url('${imgPath}')"`
    : '';
  return `
  <article class="cls-browse-card" data-group-idx="${idx}" tabindex="0" role="button"
    aria-label="${escHtml(cls.classe_title)}, ${subs.length} sous-classe${subs.length > 1 ? 's' : ''}">
    <div class="cls-browse-img${imgPath ? '' : ' cls-browse-img--fallback'}" ${imgStyle}
      style="${imgPath ? `background-image:url('${imgPath}')` : `background:${color}22`}" aria-hidden="true">
      ${imgPath ? '' : icon}
    </div>
    <div class="cls-browse-info" aria-hidden="true">
      <span class="cls-browse-icon">${icon}</span>
      <div class="cls-browse-name">${escHtml(cls.classe_title)}</div>
      <div class="cls-browse-sub">${subs.length} sous-classe${subs.length > 1 ? 's' : ''}</div>
    </div>
  </article>`;
}

function wireBrowseCards(filteredGroups) {
  document.querySelectorAll('.cls-browse-card').forEach((card, i) => {
    const handler = () => {
      const idx = parseInt(card.dataset.groupIdx);
      const group = filteredGroups[idx];
      if (group) showClassDetail(group);
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
    });
  });
}

function showClassDetail(group) {
  const cls = group[0];
  const subs = group.slice(1);
  const icon = CLASS_ICONS[cls.classe_title] || '⚔';
  const imgPath = localImage(cls.image);
  const color = CLASS_COLORS[cls.classe_title] || 'var(--gold-dark)';
  const hasSorts = isSpellcaster(cls.classe_title);
  CLS.tab = 'presentation';
  CLS.capLevel = null;
  CLS.sortLevel = null;

  const tabs = [
    { id: 'presentation', label: 'Présentation', icon: '📖' },
    { id: 'capacites',    label: 'Capacités',    icon: '⚙' },
    ...(hasSorts ? [{ id: 'sorts', label: 'Sorts', icon: '✦' }] : []),
    { id: 'sousclasses',  label: 'Sous-classes', icon: '❧' },
    { id: 'conseils',     label: 'Conseils',     icon: '💡' },
  ];

  const container = document.getElementById('app');
  container.innerHTML = `
  <div class="cls-detail-page" id="cls-detail-page">
    <!-- HERO -->
    <div class="cls-detail-hero" id="cls-hero">
      ${imgPath ? `<div class="cls-detail-hero-bg" style="background-image:url('${imgPath}')"></div>` : `<div class="cls-detail-hero-bg" style="background:${color}"></div>`}
      <div class="container cls-detail-hero-inner">
        <button class="cls-back-btn" id="cls-back-btn" aria-label="Retour aux classes">
          ← Toutes les classes
        </button>
        <div class="cls-detail-header">
          <div class="cls-detail-icon" aria-hidden="true">${icon}</div>
          <div class="cls-detail-title-wrap">
            <h1 class="cls-detail-title">${escHtml(cls.classe_title)}</h1>
            <p class="cls-detail-subtitle">${subs.length} sous-classe${subs.length > 1 ? 's' : ''} · Sous-classe au niveau 3</p>
          </div>
          ${imgPath ? `<img class="cls-detail-portrait" src="${imgPath}" alt="${escHtml(cls.classe_title)}" loading="lazy">` : ''}
        </div>
      </div>
    </div>

    <!-- TABS -->
    <div class="cls-tabs-bar" id="cls-tabs-bar" role="tablist">
      <div class="container">
        <div class="cls-tabs">
          ${tabs.map(t => `
            <button class="cls-tab${t.id === CLS.tab ? ' active' : ''}"
              data-tab="${t.id}" role="tab" aria-selected="${t.id === CLS.tab}" aria-controls="cls-tab-${t.id}">
              ${t.label}
            </button>`).join('')}
        </div>
      </div>
    </div>

    <!-- TAB CONTENT -->
    <div class="container">
      <div class="cls-tab-content" id="cls-tab-content"></div>
    </div>
  </div>`;

  document.getElementById('cls-back-btn').addEventListener('click', () => {
    showClassBrowse(container);
  });

  document.querySelectorAll('.cls-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cls-tab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      CLS.tab = btn.dataset.tab;
      renderClassTab(group, CLS.tab);
    });
  });

  renderClassTab(group, CLS.tab);
}

function renderClassTab(group, tabId) {
  const content = document.getElementById('cls-tab-content');
  if (!content) return;
  content.innerHTML = '';
  switch (tabId) {
    case 'presentation': content.innerHTML = renderTabPresentation(group); wireTermLinks(content); break;
    case 'capacites':    content.innerHTML = renderTabCapacites(group);    wireCapCards(group); break;
    case 'sorts':        content.innerHTML = renderTabSorts(group);        wireSortLvlBtns(group); break;
    case 'sousclasses':  content.innerHTML = renderTabSousClasses(group);  wireSubCards(group); break;
    case 'conseils':     content.innerHTML = renderTabConseils(group);     wireConseilSubs(group); break;
  }
}

/* ===== TAB: PRÉSENTATION — html_traits_table injecté directement ===== */
function renderTabPresentation(group) {
  const cls     = group[0];
  const imgPath = localImage(cls.image);
  const desc    = sanitizeHtml(cls.classe_description || '');
  // html_traits_table est injecté tel quel — CSS s'occupe du rendu
  const traitsHtml = sanitizeHtml(cls.html_traits_table || '');


  return `
  <div class="cls-pres-layout${imgPath ? '' : ' cls-pres-layout--no-img'}">
    <div class="cls-pres-main">
      ${desc ? `<div class="cls-pres-desc html-content">${desc}</div>` : ''}
      ${traitsHtml ? `<div class="cls-traits-table">${traitsHtml}</div>` : ''}
    </div>
  </div>`;
}

/* ===== TAB: CAPACITÉS — html_capacites_table injecté directement, noms enrichis ===== */
function renderTabCapacites(group) {
  const cls      = group[0];
  const capsHtml = sanitizeHtml(cls.html_capacites_table || '');
  return `
  <div class="cls-caps-table-wrap">
    <div class="cls-caps-table">${capsHtml}</div>
  </div>`;
}

// Après injection : enrichit la colonne "Capacités de classe" avec des spans cliquables
function enrichCapTableLinks(container, cls) {
  // Dictionnaire normalisé : nom de capacité → objet capacité
  const capMap = new Map();
  (cls.capacites || []).forEach(cap => {
    capMap.set(normalize(cap.capacite_name), cap);
    // Alias sans tirets/accents
    capMap.set(cap.capacite_name.toLowerCase(), cap);
  });

  const trs = Array.from(container.querySelectorAll('table tr'));

  // Masquer la 1ère ligne si c'est uniquement un espaceur colspan vide
  const firstTr = trs[0];
  if (firstTr) {
    const ths = firstTr.querySelectorAll('th');
    if (ths.length === 1 && ths[0].hasAttribute('colspan') && !ths[0].textContent.trim()) {
      firstTr.style.display = 'none';
    }
  }

  // Lignes de données = contiennent des <td>
  trs.filter(tr => tr.querySelector('td')).forEach(row => {
    const tds = row.querySelectorAll('td');
    const capCell = tds[2];   // col 2 toujours = "Capacités de classe"
    if (!capCell) return;

    const text = capCell.textContent.trim();
    if (!text || text === '–' || text === '-') return;

    // Construire l'HTML enrichi sans modifier le texte
    capCell.innerHTML = text.split(',').map(part => {
      const name = part.trim();
      const cap  = capMap.get(normalize(name)) || capMap.get(name.toLowerCase());
      if (cap) {
        return `<span class="cap-table-link" data-cap-name="${escHtml(cap.capacite_name)}" tabindex="0" role="button" aria-label="Voir ${escHtml(cap.capacite_name)}">${escHtml(name)}</span>`;
      }
      return escHtml(name);
    }).join(', ');
  });
}

function wireCapCards(group) {
  const cls    = group[0];
  const capMap = new Map();
  (cls.capacites || []).forEach(cap => capMap.set(cap.capacite_name, cap));

  const wrap = document.querySelector('.cls-caps-table');
  if (wrap) enrichCapTableLinks(wrap, cls);

  document.querySelectorAll('.cap-table-link').forEach(span => {
    const handler = () => {
      const cap = capMap.get(span.dataset.capName);
      if (!cap) return;
      const cleanDesc = sanitizeHtml(cap.description_html || '');
      Modal.show(`
        <div class="cap-modal-level">Niveau ${escHtml(cap.niveau || '?')}</div>
        <h2 class="modal-title" id="modal-title">${escHtml(cap.capacite_name)}</h2>
        ${cleanDesc
          ? `<div class="html-content mt-1">${cleanDesc}</div>`
          : '<p style="color:var(--text3)">Aucune description disponible.</p>'}
      `);
    };
    span.addEventListener('click', handler);
    span.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
    });
  });
}

/* ===== TAB: SORTS ===== */
function renderTabSorts(group) {
  const cls = group[0];
  const allSorts = getSortsForClass(cls.classe_title);

  if (!allSorts.length) {
    return `<div class="cls-no-sorts">
      <div class="cls-no-sorts-icon">✦</div>
      <div class="cls-no-sorts-title">Pas de sorts connus</div>
      <p class="cls-no-sorts-text">Cette classe ne dispose d'aucun sort répertorié dans le codex.</p>
    </div>`;
  }

  // Group by level
  const byLvl = {};
  for (const s of allSorts) {
    const l = String(s.niveau);
    if (!byLvl[l]) byLvl[l] = [];
    byLvl[l].push(s);
  }
  const lvls = Object.keys(byLvl).sort((a, b) => Number(a) - Number(b));

  const filterBtns = `
    <div class="cls-sort-filters">
      <button class="cls-sort-lvl-btn${CLS.sortLevel === null ? ' active' : ''}" data-sort-lvl="">Tous (${allSorts.length})</button>
      ${lvls.map(l => `<button class="cls-sort-lvl-btn${CLS.sortLevel === l ? ' active' : ''}" data-sort-lvl="${l}">${l === '0' ? 'Sorts mineurs' : `Niv. ${l}`} (${byLvl[l].length})</button>`).join('')}
    </div>`;

  const renderSortEntry = s => {
    const mainName = s.name.includes('|') ? s.name.split('|')[0].trim() : s.name;
    const school = s.ecole || '';
    const dot = SCHOOL_DOTS[school] || 'var(--text3)';
    const lvlLabel = s.niveau === 0 ? 'Sort mineur' : `Niveau ${s.niveau}`;
    return `
    <article class="card" style="padding:.75rem 1rem;display:flex;align-items:center;gap:.8rem;cursor:pointer"
      tabindex="0" role="button" data-sort-name="${escHtml(s.name)}" aria-label="${escHtml(mainName)}">
      <span style="width:8px;height:8px;border-radius:50%;background:${dot};flex-shrink:0" aria-hidden="true"></span>
      <div style="flex:1;min-width:0">
        <div style="font-family:var(--font-heading);font-size:.9rem;color:var(--gold-light);font-weight:600">${escHtml(mainName)}</div>
        <div style="font-size:.75rem;color:var(--text3)">${escHtml(lvlLabel)} · ${escHtml(school)}</div>
      </div>
      ${s.concentration ? `<span class="tag tag-teal" style="font-size:.65rem">C</span>` : ''}
    </article>`;
  };

  const renderLevel = (l) => {
    const label = l === '0' ? 'Sorts mineurs' : `Sorts de niveau ${l}`;
    return `
    <div class="cls-sort-level-group" data-sort-level="${l}">
      <p class="cls-section-title" style="margin-top:1.5rem">${label}</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.5rem">
        ${byLvl[l].map(s => renderSortEntry(s)).join('')}
      </div>
    </div>`;
  };

  const activeLvls = CLS.sortLevel !== null ? [CLS.sortLevel] : lvls;

  return `
  <div class="cls-sorts">
    <div class="cls-sorts-header">
      <div class="cls-sorts-count"><strong>${allSorts.length}</strong> sorts disponibles</div>
      ${filterBtns}
    </div>
    <div id="cls-sorts-content">${activeLvls.map(l => renderLevel(l)).join('')}</div>
  </div>`;
}

function wireSortLvlBtns(group) {
  document.querySelectorAll('.cls-sort-lvl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      CLS.sortLevel = btn.dataset.sortLvl || null;
      renderClassTab(group, 'sorts');
    });
  });

  // Wire sort cards → modal
  document.querySelectorAll('[data-sort-name]').forEach(card => {
    const handler = () => {
      const name = card.dataset.sortName;
      const sort = (APP.data.sorts || []).find(s => s.name === name);
      if (sort) {
        const altName = sort.name.includes('|') ? sort.name.split('|')[1].trim() : null;
        Modal.show(renderSortModal({ ...sort, mainName: sort.name.includes('|') ? sort.name.split('|')[0].trim() : sort.name, altName }));
      }
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

/* ===== TAB: SOUS-CLASSES ===== */
function renderTabSousClasses(group) {
  const cls = group[0];
  const subs = group.slice(1);

  if (!subs.length) {
    return `<p style="color:var(--text3);padding:2rem 0">Cette classe n'a pas de sous-classes répertoriées.</p>`;
  }

  const cards = subs.map((sub, i) => {
    const imgPath = localImage(sub.image);
    const desc = truncate(sanitizeHtml(sub.classe_description || ''), 200);
    return `
    <article class="cls-sub-card" data-sub-idx="${i}" tabindex="0" role="button"
      aria-label="${escHtml(sub.classe_title)}">
      <div class="cls-sub-img-wrap">
        ${imgPath
          ? `<img class="cls-sub-img" src="${imgPath}" alt="${escHtml(sub.classe_title)}" loading="lazy">`
          : `<div class="cls-sub-img--fallback" aria-hidden="true">${CLASS_ICONS[cls.classe_title] || '⚔'}</div>`}
      </div>
      <div class="cls-sub-info">
        <div class="cls-sub-name">${escHtml(sub.classe_title)}</div>
        ${desc ? `<p class="cls-sub-desc">${desc}</p>` : ''}
        <span class="cls-sub-cta">Voir les capacités →</span>
      </div>
    </article>`;
  }).join('');

  return `<div class="cls-sub-grid">${cards}</div>`;
}

function wireSubCards(group) {
  const subs = group.slice(1);
  document.querySelectorAll('.cls-sub-card').forEach(card => {
    const handler = () => {
      const idx = parseInt(card.dataset.subIdx);
      const sub = subs[idx];
      if (sub) renderSubClassModal(group, sub);
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

function renderSubClassModal(group, sub) {
  const imgPath = localImage(sub.image);
  const cls = group[0];
  const desc = sanitizeHtml(sub.classe_description || '');
  const caps = sub.capacites || [];

  // Group capacites by level
  const byLevel = {};
  for (const cap of caps) {
    const lvl = cap.niveau || '?';
    if (!byLevel[lvl]) byLevel[lvl] = [];
    byLevel[lvl].push(cap);
  }
  const levels = Object.keys(byLevel).sort((a, b) => Number(a) - Number(b));

  Modal.show(`
    ${imgPath ? `<img class="cls-sub-modal-banner" src="${imgPath}" alt="${escHtml(sub.classe_title)}" loading="lazy">` : ''}
    <h2 class="modal-title" id="modal-title">${escHtml(sub.classe_title)}</h2>
    <p style="font-size:.8rem;color:var(--text3);font-family:var(--font-heading);letter-spacing:.05em;text-transform:uppercase;margin-bottom:1rem">
      Sous-classe de ${escHtml(cls.classe_title)} · Niveau 3
    </p>
    ${desc ? `<div class="html-content" style="margin-bottom:1.5rem">${desc}</div>` : ''}
    ${levels.length ? `
      <div class="modal-divider"></div>
      <h3 class="modal-section-title">Capacités</h3>
      ${levels.map(lvl => `
        <div class="niveau-group">
          <span class="niveau-label">Niveau ${escHtml(lvl)}</span>
          ${byLevel[lvl].map(cap => `
            <div class="capacite-item">
              <div class="capacite-name">${escHtml(cap.capacite_name)}</div>
              <div class="capacite-desc html-content">${sanitizeHtml(cap.description_html || '')}</div>
            </div>`).join('')}
        </div>`).join('')}` : ''}
  `);
}

/* ===== TAB: CONSEILS ===== */
function renderTabConseils(group) {
  const cls = group[0];
  const subs = group.slice(1);
  const icon = CLASS_ICONS[cls.classe_title] || '⚔';
  const caps = cls.capacites || [];
  const color = CLASS_COLORS[cls.classe_title] || 'var(--gold-dark)';
  const hasSorts = isSpellcaster(cls.classe_title);

  // Extract key traits from html_traits_table
  const traitsRaw = [];
  if (cls.html_traits_table) {
    const div = document.createElement('div');
    div.innerHTML = cls.html_traits_table;
    div.querySelectorAll('tr').forEach(row => {
      const cells = row.querySelectorAll('td, th');
      if (cells.length >= 2) {
        const k = cells[0].textContent.trim();
        const v = cells[1].textContent.trim();
        if (k && v && k !== 'Caractéristique' && k !== 'Détails') traitsRaw.push({ k, v });
      }
    });
  }

  // Key milestones: levels 1, 2, 3, 5, 7, 11, 17, 20
  const MILESTONE_LEVELS = ['1', '2', '3', '5', '7', '11', '17', '20'];
  const milestones = MILESTONE_LEVELS.map(lvl => {
    const lvlCaps = caps.filter(c => c.niveau === lvl);
    return lvlCaps.length ? { level: lvl, caps: lvlCaps } : null;
  }).filter(Boolean);

  // What makes this class unique
  const unique = truncate(sanitizeHtml(cls.classe_description || ''), 400);

  const subMinis = subs.map((sub, i) => {
    const imgPath = localImage(sub.image);
    return `
    <div class="cls-sub-mini" data-conseil-sub="${i}" tabindex="0" role="button" aria-label="${escHtml(sub.classe_title)}">
      ${imgPath
        ? `<img src="${imgPath}" alt="${escHtml(sub.classe_title)}" loading="lazy">`
        : `<span style="width:28px;height:28px;border-radius:50%;background:${color}33;display:flex;align-items:center;justify-content:center;font-size:.85rem">${icon}</span>`}
      <span>${escHtml(sub.classe_title)}</span>
    </div>`;
  }).join('');

  return `
  <div class="cls-conseils">

    <!-- Bloc 1: Qui joue cette classe ? -->
    <div class="cls-conseil-block">
      <div class="cls-conseil-icon" aria-hidden="true">${icon}</div>
      <div>
        <h3 class="cls-conseil-title">Qu'est-ce que le ${escHtml(cls.classe_title)} ?</h3>
        <p class="cls-conseil-text">${unique}</p>
      </div>
    </div>

    ${traitsRaw.length ? `
    <!-- Bloc 2: Traits à retenir -->
    <div class="cls-conseil-block">
      <div class="cls-conseil-icon" aria-hidden="true">📋</div>
      <div>
        <h3 class="cls-conseil-title">Traits essentiels</h3>
        <p class="cls-conseil-text" style="margin-bottom:.75rem">Les caractéristiques clés de la classe :</p>
        <div class="cls-conseil-traits">
          ${traitsRaw.slice(0, 10).map(t => `
          <div class="cls-conseil-trait">
            <span class="cls-conseil-trait-key">${escHtml(t.k)}</span>
            <span class="cls-conseil-trait-val">${escHtml(t.v)}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>` : ''}

    ${hasSorts ? `
    <!-- Bloc 3: Sorts (si classe magicasteurs) -->
    <div class="cls-conseil-block">
      <div class="cls-conseil-icon" aria-hidden="true">✦</div>
      <div>
        <h3 class="cls-conseil-title">Accès aux sorts</h3>
        <p class="cls-conseil-text">Le ${escHtml(cls.classe_title)} est une <strong>classe magicasteur</strong>. Explorez l'onglet <strong>Sorts</strong> pour découvrir les ${getSortsForClass(cls.classe_title).length} sorts de la liste de classe, classés par niveau et filtrables par école.</p>
      </div>
    </div>` : ''}

    ${milestones.length ? `
    <!-- Bloc 4: Jalons importants -->
    <div class="cls-conseil-block">
      <div class="cls-conseil-icon" aria-hidden="true">📈</div>
      <div>
        <h3 class="cls-conseil-title">Jalons de progression</h3>
        <p class="cls-conseil-text" style="margin-bottom:.75rem">Ce que vous obtenez aux niveaux clés :</p>
        <div class="cls-milestones">
          ${milestones.map(m => `
          <div class="cls-milestone">
            <div class="cls-milestone-level">Niveau ${escHtml(m.level)}</div>
            ${m.caps.map(c => `<div class="cls-milestone-cap"><strong>${escHtml(c.capacite_name)}</strong></div>`).join('')}
          </div>`).join('')}
        </div>
      </div>
    </div>` : ''}

    ${subs.length ? `
    <!-- Bloc 5: Sous-classes -->
    <div class="cls-conseil-block">
      <div class="cls-conseil-icon" aria-hidden="true">❧</div>
      <div>
        <h3 class="cls-conseil-title">Choisir sa sous-classe (niveau 3)</h3>
        <p class="cls-conseil-text">À partir du niveau 3, choisissez votre archétype parmi ${subs.length} sous-classe${subs.length > 1 ? 's' : ''} — chacune modifie profondément votre style de jeu. Cliquez pour en savoir plus :</p>
        <div class="cls-sub-mini-grid">${subMinis}</div>
      </div>
    </div>` : ''}

  </div>`;
}

function wireConseilSubs(group) {
  const subs = group.slice(1);
  document.querySelectorAll('[data-conseil-sub]').forEach(el => {
    const handler = () => {
      const idx = parseInt(el.dataset.conseilSub);
      const sub = subs[idx];
      if (sub) renderSubClassModal(group, sub);
    };
    el.addEventListener('click', handler);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

// ============================================================
// PAGE: DONS
// ============================================================

function renderDons(container) {
  const dons = APP.data.dons || [];

  container.innerHTML = `
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Dons</h1>
        <div class="page-ornament" aria-hidden="true">✦</div>
        <p class="page-subtitle">${dons.length} dons disponibles</p>
      </div>
      <div class="controls-bar">
        <div class="search-bar-wrap">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input class="search-input" type="search" id="dons-search" placeholder="Rechercher un don…" aria-label="Rechercher un don">
          <button class="search-clear" id="dons-clear" aria-label="Effacer">✕</button>
        </div>
        <div class="filter-chips" role="group" aria-label="Filtrer par type">
          <button class="chip active" data-type="all">Tous</button>
          ${Object.entries(DON_TYPE_LABELS).map(([k, v]) =>
            `<button class="chip" data-type="${k}">${escHtml(v.label)}</button>`).join('')}
        </div>
        <span class="results-count" id="dons-count">${dons.length} don${dons.length > 1 ? 's' : ''}</span>
      </div>
      <div class="cards-grid cards-grid--3" id="dons-grid" role="list"></div>
    </div>
  </div>`;

  const grid = document.getElementById('dons-grid');
  const search = document.getElementById('dons-search');
  const clear = document.getElementById('dons-clear');
  const count = document.getElementById('dons-count');
  let activeType = 'all';

  const getPrereqText = d => {
    const ps = d.prerequis?.prerequis || [];
    return ps.map(p => p.type === 'niveau' ? `Niveau ${p.minimum}` : p.nom || '').filter(Boolean).join(', ');
  };

  const render = createSearch(grid, dons, {
    searchFields: [d => d.name, d => d.html_description || '', d => getPrereqText(d)],
    renderItem: (d) => renderDonCard(d, getPrereqText(d)),
    emptyText: 'Aucun don ne correspond à cette recherche.',
  });

  const update = debounce(() => {
    const filters = activeType !== 'all'
      ? [{ test: d => d.prerequis?.type_don === activeType }] : [];
    const n = render(search.value, filters);
    count.textContent = `${n} don${n > 1 ? 's' : ''}`;
    wireDonCards();
  }, 150);

  render('');
  wireDonCards();

  search.addEventListener('input', update);
  clear.addEventListener('click', () => { search.value = ''; update(); search.focus(); });

  document.querySelectorAll('[data-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.type;
      document.querySelectorAll('[data-type]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      update();
    });
  });
}

function renderDonCard(d, prereqText) {
  const typeInfo = DON_TYPE_LABELS[d.prerequis?.type_don] || { label: d.prerequis?.type_don || '', tagClass: 'tag-gray' };
  const shortDesc = truncate(d.html_description || '', 150);
  return `
  <article class="card" data-don="${escHtml(d.name)}" data-don-type="${escHtml(d.prerequis?.type_don || '')}" role="listitem" tabindex="0"
    aria-label="${escHtml(d.name)}">
    <div class="card-header">
      <h3 class="card-title">${escHtml(d.name)}</h3>
      ${prereqText ? `<p class="don-prereq">${escHtml(prereqText)}</p>` : ''}
    </div>
    <div class="card-body">
      <p class="card-desc">${shortDesc}</p>
    </div>
    <div class="card-footer">
      <span class="tag ${typeInfo.tagClass}">${escHtml(typeInfo.label)}</span>
    </div>
  </article>`;
}

function wireDonCards() {
  document.querySelectorAll('[data-don]').forEach(card => {
    const handler = () => {
      const name = card.dataset.don;
      const don = APP.data.dons.find(d => d.name === name);
      if (don) Modal.show(renderDonModal(don));
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

function renderDonModal(d) {
  const typeInfo = DON_TYPE_LABELS[d.prerequis?.type_don] || { label: d.prerequis?.type_don || '', tagClass: 'tag-gray' };
  const prereqs = d.prerequis?.prerequis || [];
  const prereqLines = prereqs.map(p => {
    if (p.type === 'niveau') return `Niveau ${p.minimum} minimum`;
    if (p.type === 'capacite') return `Capacité : ${p.nom}`;
    if (p.type === 'caracteristique') return `${p.nom} ${p.minimum}+`;
    return JSON.stringify(p);
  });

  return `
    <h2 class="modal-title" id="modal-title">${escHtml(d.name)}</h2>
    <div class="modal-tags">
      <span class="tag ${typeInfo.tagClass}">${escHtml(typeInfo.label)}</span>
      ${prereqLines.map(p => tag(p, 'tag-gray')).join('')}
    </div>
    <div class="modal-divider"></div>
    <div class="html-content">${sanitizeHtml(d.html_description || '')}</div>`;
}

// ============================================================
// PAGE: GLOSSAIRE
// ============================================================

function renderGlossaire(container) {
  const glosData = APP.data.glossaire || {};
  const entries = glosData.glossaire || [];
  const abbrevs = glosData.abreviations || {};

  // Group by first letter
  const groups = {};
  for (const e of entries) {
    const letter = e.terme[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(e);
  }
  const letters = Object.keys(groups).sort();

  // All categories
  const cats = [...new Set(entries.map(e => e.categorie))].sort();

  container.innerHTML = `
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Glossaire</h1>
        <div class="page-ornament" aria-hidden="true">✎</div>
        <p class="page-subtitle">${entries.length} termes — Règles D&D 2024</p>
      </div>
      <div class="controls-bar" style="margin-bottom:2rem">
        <div class="search-bar-wrap">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input class="search-input" type="search" id="glos-search" placeholder="Rechercher un terme…" aria-label="Rechercher un terme">
          <button class="search-clear" id="glos-clear" aria-label="Effacer">✕</button>
        </div>
        <div class="filter-chips" role="group" aria-label="Filtrer par catégorie">
          <button class="chip active" data-cat="all">Tous</button>
          ${cats.map(c => {
            const info = CAT_LABELS[c] || { label: c };
            return `<button class="chip" data-cat="${escHtml(c)}">${escHtml(info.label)}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="glossaire-layout">
        <aside class="glossaire-sidebar" aria-label="Navigation alphabétique">
          <div class="glossaire-alpha-nav" role="list">
            ${letters.map(l => `
              <button class="alpha-btn has-entries" data-alpha="${l}" role="listitem"
                aria-label="Lettre ${l}">${l}</button>`).join('')}
          </div>
          <div class="glossaire-abbrev">
            <div class="abbrev-title">Abréviations</div>
            <div class="abbrev-list">
              ${Object.entries(abbrevs).slice(0, 15).map(([k, v]) =>
                `<div class="abbrev-row"><span class="abbrev-key">${escHtml(k)}</span><span>${escHtml(v)}</span></div>`
              ).join('')}
              ${Object.keys(abbrevs).length > 15 ? `<div class="abbrev-row" style="color:var(--text-faint);font-style:italic">+${Object.keys(abbrevs).length - 15} autres</div>` : ''}
            </div>
          </div>
        </aside>
        <main class="glossaire-main" id="glos-main" aria-label="Liste des termes">
          ${renderGlosLetters(groups, letters)}
        </main>
      </div>
    </div>
  </div>`;

  const main = document.getElementById('glos-main');
  const searchInput = document.getElementById('glos-search');
  const clearBtn = document.getElementById('glos-clear');
  let activeCat = 'all';
  let activeAlpha = null;

  const redraw = debounce(() => {
    const q = normalize(searchInput.value);
    const filtered = entries.filter(e => {
      const matchQ = !q || normalize(e.terme).includes(q) || normalize(e.description.replace(/#/g, '')).includes(q);
      const matchC = activeCat === 'all' || e.categorie === activeCat;
      return matchQ && matchC;
    });

    if (filtered.length === 0) {
      main.innerHTML = `<div class="no-results"><div class="no-results-icon">🔍</div><p class="no-results-text">Aucun terme trouvé</p></div>`;
      return;
    }

    const filteredGroups = {};
    for (const e of filtered) {
      const l = e.terme[0].toUpperCase();
      if (!filteredGroups[l]) filteredGroups[l] = [];
      filteredGroups[l].push(e);
    }
    const filteredLetters = Object.keys(filteredGroups).sort();
    main.innerHTML = renderGlosLetters(filteredGroups, filteredLetters);
    wireGlosEntries();
    wireTermLinks(main);
  }, 150);

  function renderGlosLetters(grps, lts) {
    return lts.map(l => `
      <div class="glossaire-letter-group" id="alpha-${l}" data-letter="${l}">
        <div class="letter-heading glos-alpha-letter">${l}</div>
        <div class="glos-grid">
          ${(grps[l] || []).map(e => renderGlosCard(e)).join('')}
        </div>
      </div>`).join('');
  }

  wireGlosEntries();
  wireTermLinks(main);
  searchInput.addEventListener('input', redraw);
  clearBtn.addEventListener('click', () => { searchInput.value = ''; redraw(); searchInput.focus(); });

  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCat = btn.dataset.cat;
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      redraw();
    });
  });

  document.querySelectorAll('[data-alpha]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeAlpha = btn.dataset.alpha;
      const target = document.getElementById(`alpha-${activeAlpha}`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelectorAll('[data-alpha]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function renderGlosCard(e) {
  const cat = CAT_LABELS[e.categorie] || { label: e.categorie, tagClass: 'tag-gray' };
  const desc = (e.description || '').replace(/#[^#]+#/g, '').replace(/<[^>]+>/g, '');
  const preview = desc.length > 90 ? desc.slice(0, 90) + '…' : desc;
  return `
    <article class="card glos-card" id="glos-${e.id}" data-glos-id="${e.id}" tabindex="0" role="listitem">
      <div class="glos-card-terme">${escHtml(e.terme)}</div>
      ${e.categorie ? `<span class="tag ${cat.tagClass || 'tag-gray'} glos-card-cat">${escHtml(cat.label || e.categorie)}</span>` : ''}
      <p class="glos-card-desc">${escHtml(preview)}</p>
    </article>`;
}

function renderGlosEntry(e) {
  const cat = CAT_LABELS[e.categorie] || { label: e.categorie, tagClass: 'tag-gray' };
  const enriched = enrichGlossaireText(e.description);
  const voirAussi = e.voir_aussi || [];
  return `
    <div class="glossaire-entry" id="glos-${e.id}" data-glos-id="${e.id}" tabindex="0" role="article">
      <div class="glossaire-entry-header">
        <span class="glossaire-term">${escHtml(e.terme)}</span>
        <span class="tag ${cat.tagClass || 'tag-gray'} glossaire-cat">${escHtml(cat.label || e.categorie)}</span>
      </div>
      <div class="glossaire-desc">${enriched}</div>
      ${voirAussi.length ? `
        <div class="glossaire-voir">
          Voir aussi : ${voirAussi.map(id => {
            const ref = APP.glossaireById.get(id);
            return ref ? `<a class="term-link" href="#glossaire" data-term-id="${id}" data-term-type="glossaire">${escHtml(ref.terme)}</a>` : escHtml(id);
          }).join(', ')}
        </div>` : ''}
    </div>`;
}

function wireGlosEntries() {
  document.querySelectorAll('[data-glos-id]').forEach(entry => {
    entry.addEventListener('keydown', e => {
      if (e.key === 'Enter') entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    entry.addEventListener('click', () => {
      const glosEntry = APP.glossaireById && APP.glossaireById.get(entry.dataset.glosId);
      if (!glosEntry) return;
      const cat = CAT_LABELS[glosEntry.categorie] || { label: glosEntry.categorie, tagClass: 'tag-gray' };
      const enriched = enrichGlossaireText(glosEntry.description);
      const voirAussi = glosEntry.voir_aussi || [];
      Modal.show(`
        <div class="glossaire-entry-header" style="margin-bottom:.75rem">
          <span class="glossaire-term" style="font-size:1.3rem">${escHtml(glosEntry.terme)}</span>
          <span class="tag ${cat.tagClass || 'tag-gray'} glossaire-cat">${escHtml(cat.label || glosEntry.categorie)}</span>
        </div>
        <div class="glossaire-desc" style="font-size:1rem;line-height:1.65">${enriched}</div>
        ${voirAussi.length ? `
          <div class="glossaire-voir" style="margin-top:.75rem">
            Voir aussi : ${voirAussi.map(id => {
              const ref = APP.glossaireById.get(id);
              return ref ? `<a class="term-link" href="#glossaire" data-term-id="${id}" data-term-type="glossaire">${escHtml(ref.terme)}</a>` : escHtml(id);
            }).join(', ')}
          </div>` : ''}
      `);
    });
  });
}

// ============================================================
// PAGE: SORTS
// ============================================================

function renderSorts(container) {
  const sorts = (APP.data.sorts || []).map(s => ({
    ...s,
    mainName: s.name.includes('|') ? s.name.split('|')[0].trim() : s.name,
    altName:  s.name.includes('|') ? s.name.split('|')[1].trim() : null,
  })).sort((a, b) => a.mainName.localeCompare(b.mainName, 'fr'));

  const allSchools = [...new Set(sorts.map(s => s.ecole))].sort();
  const allClasses = [...new Set(sorts.flatMap(s => s.classes || []))].sort();
  const allLevels  = [...new Set(sorts.map(s => s.niveau))].sort((a, b) => Number(a) - Number(b));

  let activeSchools   = new Set();
  let activeLevels    = new Set();
  let activeClasses   = new Set();
  let filterConc      = false;

  container.innerHTML = `
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Sorts</h1>
        <div class="page-ornament" aria-hidden="true">✸</div>
        <p class="page-subtitle">${sorts.length} sorts — 8 écoles de magie</p>
      </div>
      <div class="controls-bar" style="margin-bottom:1.5rem">
        <div class="search-bar-wrap">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input class="search-input" type="search" id="sorts-search" placeholder="Rechercher un sort…" aria-label="Rechercher un sort">
          <button class="search-clear" id="sorts-clear" aria-label="Effacer">✕</button>
        </div>
        <span class="results-count" id="sorts-count">${sorts.length} sorts</span>
      </div>
      <div class="sorts-layout">
        <aside class="sorts-sidebar" aria-label="Filtres">
          <div class="sidebar-section">
            <div class="sidebar-title">Niveau</div>
            <div class="level-grid">
              ${allLevels.map(l => `
                <button class="level-btn" data-level="${l}" aria-label="Niveau ${l === '0' ? 'Tour de magie' : l}">
                  ${l === '0' ? '✦' : l}
                </button>`).join('')}
            </div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-title">École</div>
            <div class="school-filter-list">
              ${allSchools.map(school => `
                <button class="school-filter-btn" data-school="${escHtml(school)}">
                  <span class="school-dot" style="background:${SCHOOL_DOTS[school] || '#888'}"></span>
                  ${escHtml(school)}
                </button>`).join('')}
            </div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-title">Classe</div>
            <div class="class-filter-list">
              ${allClasses.map(cls => `
                <button class="chip" data-class-filter="${escHtml(cls)}">${escHtml(cls)}</button>`).join('')}
            </div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-title">Options</div>
            <div class="toggle-row">
              <span class="toggle-label">Concentration uniquement</span>
              <div class="toggle-switch" id="conc-toggle" role="switch" aria-checked="false" tabindex="0"></div>
            </div>
          </div>
          <button class="filter-reset" id="sorts-filter-reset">Réinitialiser les filtres</button>
        </aside>
        <div>
          <div class="cards-grid cards-grid--3" id="sorts-grid" role="list"></div>
        </div>
      </div>
    </div>
  </div>`;

  const grid     = document.getElementById('sorts-grid');
  const search   = document.getElementById('sorts-search');
  const clear    = document.getElementById('sorts-clear');
  const countEl  = document.getElementById('sorts-count');
  const reset    = document.getElementById('sorts-filter-reset');
  const concTgl  = document.getElementById('conc-toggle');

  const matchSort = (s, q) => {
    if (q && !normalize(s.mainName).includes(q) && !normalize(s.altName || '').includes(q) &&
        !normalize(s.description || '').includes(q)) return false;
    if (activeSchools.size && !activeSchools.has(s.ecole)) return false;
    if (activeLevels.size && !activeLevels.has(s.niveau)) return false;
    if (activeClasses.size && !(s.classes || []).some(c => activeClasses.has(c))) return false;
    if (filterConc && !s.concentration) return false;
    return true;
  };

  const update = debounce(() => {
    const q = normalize(search.value);
    const filtered = sorts.filter(s => matchSort(s, q));
    grid.innerHTML = filtered.length
      ? filtered.map(s => renderSortCard(s)).join('')
      : `<div class="no-results"><div class="no-results-icon">✸</div><p class="no-results-text">Aucun sort trouvé</p></div>`;
    countEl.textContent = `${filtered.length} sort${filtered.length > 1 ? 's' : ''}`;
    wireSortCards();
  }, 150);

  update();
  search.addEventListener('input', update);
  clear.addEventListener('click', () => { search.value = ''; update(); search.focus(); });

  // Level buttons
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lvl = btn.dataset.level;
      if (activeLevels.has(lvl)) { activeLevels.delete(lvl); btn.classList.remove('active'); }
      else { activeLevels.add(lvl); btn.classList.add('active'); }
      update();
    });
  });

  // School buttons
  document.querySelectorAll('.school-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const school = btn.dataset.school;
      if (activeSchools.has(school)) { activeSchools.delete(school); btn.classList.remove('active'); }
      else { activeSchools.add(school); btn.classList.add('active'); }
      update();
    });
  });

  // Class chips
  document.querySelectorAll('[data-class-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      const cls = chip.dataset.classFilter;
      if (activeClasses.has(cls)) { activeClasses.delete(cls); chip.classList.remove('active'); }
      else { activeClasses.add(cls); chip.classList.add('active'); }
      update();
    });
  });

  // Toggles
  const toggleEl = (el, state, setter) => {
    el.classList.toggle('active', state);
    el.setAttribute('aria-checked', state);
    setter(state);
    update();
  };

  concTgl.addEventListener('click', () => toggleEl(concTgl, !filterConc, v => filterConc = v));
  concTgl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') concTgl.click(); });

  // Reset
  reset.addEventListener('click', () => {
    activeSchools.clear(); activeLevels.clear(); activeClasses.clear();
    filterConc = false;
    document.querySelectorAll('.level-btn, .school-filter-btn, [data-class-filter]').forEach(el => el.classList.remove('active'));
    toggleEl(concTgl, false, v => filterConc = v);
    search.value = '';
    update();
  });
}

function renderSortCard(s) {
  const lvlLabel = s.niveau === '0' ? 'Tour de magie' : `Niv. ${s.niveau}`;
  return `
  <article class="card sort-card" data-sort="${escHtml(s.mainName)}" data-school="${escHtml(s.ecole)}"
    role="listitem" tabindex="0" aria-label="${escHtml(s.mainName)}">
    <div class="sort-card-img-wrap">
      <img src="${getSortImgUrl(s.mainName)}" alt="" class="sort-card-img" loading="lazy"
           onerror="this.closest('.sort-card-img-wrap').style.display='none'">
    </div>
    <div class="card-header">
      <div style="display:flex;align-items:center;justify-content:space-between;width100%">
        <h3 class="card-title">${escHtml(s.mainName)}</h3>
        <span class="level-badge" title="${lvlLabel}">${s.niveau === '0' ? '✦' : s.niveau}</span>
      </div>
      ${s.altName ? `<div class="sort-alt-name">${escHtml(s.altName)}</div>` : ''}
    </div>
    <div class="card-body">
      <div class="sort-stats">
        <div class="sort-stat"><span class="sort-stat-k">Temps</span><span class="sort-stat-v">${escHtml(s.temps || '—')}</span></div>
        <div class="sort-stat"><span class="sort-stat-k">Portée</span><span class="sort-stat-v">${escHtml(s.portee || '—')}</span></div>
        <div class="sort-stat"><span class="sort-stat-k">Durée</span><span class="sort-stat-v">${escHtml(s.duree || '—')}</span></div>
        <div class="sort-stat"><span class="sort-stat-k">Comp.</span><span class="sort-stat-v">${escHtml((s.composants || []).join(', '))}</span></div>
      </div>
    </div>
    <div class="card-footer">
      <span class="school-tag school-${escHtml(s.ecole)}">${escHtml(s.ecole)}</span>
      ${s.concentration ? tag('C', 'tag-purple', 'title="Concentration"') : ''}
      ${(s.classes || []).slice(0, 3).map(c => tag(c, 'tag-gray')).join('')}
      ${(s.classes || []).length > 3 ? `<span style="font-size:.7rem;color:var(--text3)">+${s.classes.length - 3}</span>` : ''}
    </div>
  </article>`;
}

function wireSortCards() {
  document.querySelectorAll('[data-sort]').forEach(card => {
    const handler = () => {
      const name = card.dataset.sort;
      const sort = APP.data.sorts.find(s => {
        const mn = s.name.includes('|') ? s.name.split('|')[0].trim() : s.name;
        return mn === name;
      });
      if (sort) {
        const altName = sort.name.includes('|') ? sort.name.split('|')[1].trim() : null;
        Modal.show(renderSortModal({ ...sort, mainName: name, altName }));
      }
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

function renderSortModal(s) {
  const lvlLabel = s.niveau === '0' ? 'Tour de magie' : `Niveau ${s.niveau}`;

  return `
    <div class="sort-modal-banner-wrap">
      <img src="${getSortImgUrl(s.mainName)}" alt="" class="sort-modal-banner" loading="lazy"
           onerror="this.closest('.sort-modal-banner-wrap').style.display='none'">
    </div>
    <h2 class="modal-title" id="modal-title">${escHtml(s.mainName)}</h2>
    ${s.altName ? `<p style="font-size:.9rem;color:var(--text3);font-style:italic;margin-bottom:.75rem">${escHtml(s.altName)}</p>` : ''}
    <div class="modal-tags">
      <span class="school-tag school-${escHtml(s.ecole)}">${escHtml(s.ecole)}</span>
      <span class="tag tag-gold">${escHtml(lvlLabel)}</span>
      ${s.concentration ? tag('Concentration', 'tag-purple') : ''}
      ${(s.classes || []).map(c => tag(c, 'tag-gray')).join('')}
    </div>
    <div class="info-grid">
      <div class="info-cell"><div class="info-cell-label">Temps d'incantation</div><div class="info-cell-value">${escHtml(s.temps || '—')}</div></div>
      <div class="info-cell"><div class="info-cell-label">Portée</div><div class="info-cell-value">${escHtml(s.portee || '—')}</div></div>
      <div class="info-cell"><div class="info-cell-label">Durée</div><div class="info-cell-value">${escHtml(s.duree || '—')}</div></div>
      <div class="info-cell"><div class="info-cell-label">Composantes</div><div class="info-cell-value">${escHtml((s.composants || []).join(', '))}</div></div>
    </div>
    <div class="modal-divider"></div>
    <div class="html-content">${enrichSortText(s.description || '')}</div>
    ${s.amelioration ? `
    <div class="sort-upcast-block">
      <div class="sort-upcast-icon">✦</div>
      <div class="sort-upcast-body">
        <div class="sort-upcast-title">Aux niveaux supérieurs</div>
        <div class="html-content">${enrichSortText(s.amelioration)}</div>
      </div>
    </div>` : ''}`;
}

// ============================================================
// PAGE: ÉQUIPEMENTS
// ============================================================

function raritySlug(rarete) {
  if (!rarete) return 'commun';
  const r = rarete.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  if (r.startsWith('legend')) return 'legendaire';
  if (r.startsWith('tres') || r.startsWith('tres')) return 'tres-rare';
  if (r.startsWith('rare')) return 'rare';
  if (r.startsWith('peu')) return 'peu-commun';
  return 'commun';
}

function showEquipModal(type, nom) {
  let item = null;
  if (type === 'arme') {
    for (const cat of (APP.data.armes?.armes || [])) {
      item = cat.armes?.find(a => a.nom === nom);
      if (item) { item = { ...item, _cat: cat.categorie }; break; }
    }
    if (!item) return;
    Modal.show(`
      <h2 class="modal-title" id="modal-title">${escHtml(item.nom)}</h2>
      <div class="modal-tags">
        <span class="tag tag-red">${escHtml(item._cat)}</span>
        ${item.degats ? `<span class="equip-damage-badge" style="font-size:.9rem">${escHtml(item.degats)}</span>` : ''}
      </div>
      <div class="info-grid">
        ${item.prix  ? `<div class="info-cell"><div class="info-cell-label">Prix</div><div class="info-cell-value">${escHtml(item.prix)}</div></div>` : ''}
        ${item.poids ? `<div class="info-cell"><div class="info-cell-label">Poids</div><div class="info-cell-value">${escHtml(item.poids)}</div></div>` : ''}
        ${item.botte ? `<div class="info-cell"><div class="info-cell-label">Botte d'arme</div><div class="info-cell-value">${escHtml(item.botte)}</div></div>` : ''}
      </div>
      ${item.proprietes?.length ? `
        <p class="cls-section-title">Propriétés</p>
        <div class="equip-modal-props">${item.proprietes.map(p => `<span class="tag tag-slate">${escHtml(p)}</span>`).join(' ')}</div>` : ''}
    `);
  } else if (type === 'armure') {
    for (const cat of (APP.data.armures?.armures || [])) {
      item = cat.armures?.find(a => a.nom === nom);
      if (item) { item = { ...item, _cat: cat.categorie, _temps: cat.temps }; break; }
    }
    if (!item) return;
    Modal.show(`
      <h2 class="modal-title" id="modal-title">${escHtml(item.nom)}</h2>
      <div class="modal-tags">
        <span class="tag tag-blue">${escHtml(item._cat)}</span>
        ${item.ca ? `<span class="equip-ca-badge" style="font-size:.9rem">CA ${escHtml(item.ca)}</span>` : ''}
      </div>
      <div class="info-grid">
        ${item.force ? `<div class="info-cell"><div class="info-cell-label">Force min.</div><div class="info-cell-value">${escHtml(item.force)}</div></div>` : ''}
        ${item.cout  ? `<div class="info-cell"><div class="info-cell-label">Prix</div><div class="info-cell-value">${escHtml(item.cout)}</div></div>` : ''}
        ${item.poids ? `<div class="info-cell"><div class="info-cell-label">Poids</div><div class="info-cell-value">${escHtml(item.poids)}</div></div>` : ''}
        ${item._temps?.enfiler ? `<div class="info-cell"><div class="info-cell-label">Enfiler</div><div class="info-cell-value">${escHtml(item._temps.enfiler)}</div></div>` : ''}
        ${item._temps?.retirer ? `<div class="info-cell"><div class="info-cell-label">Retirer</div><div class="info-cell-value">${escHtml(item._temps.retirer)}</div></div>` : ''}
      </div>
      ${item.discretion === 'Désavantage' ? `<div style="margin-top:.5rem"><span class="tag tag-red">⚠ Désavantage à la Discrétion</span></div>` : ''}
    `);
  } else if (type === 'materiel') {
    item = APP.data.materiels?.find(m => m.nom === nom);
    if (!item) return;
    Modal.show(`
      <h2 class="modal-title" id="modal-title">${escHtml(item.nom)}</h2>
      <div class="modal-tags">
        ${item.prix  ? `<span class="tag tag-bronze">${escHtml(item.prix)}</span>` : ''}
        ${item.poids && item.poids !== '—' ? `<span class="tag tag-slate">${escHtml(item.poids)}</span>` : ''}
      </div>
      ${item.description ? `<div class="modal-divider"></div><div class="html-content">${enrichSortText(item.description)}</div>` : ''}
    `);
  } else if (type === 'outil') {
    item = APP.data.outils?.find(o => o.nom === nom);
    if (!item) return;
    Modal.show(`
      <h2 class="modal-title" id="modal-title">${escHtml(item.nom)}</h2>
      <div class="modal-tags">
        ${item.caracteristique ? `<span class="tag tag-forest">${escHtml(item.caracteristique)}</span>` : ''}
        ${item.prix ? `<span class="tag tag-bronze">${escHtml(item.prix)}</span>` : ''}
      </div>
      ${item.utilisations?.length ? `
        <p class="cls-section-title">Utilisations</p>
        <div class="equip-modal-uses">
          ${item.utilisations.map(u => `<div class="equip-use-row"><span class="equip-use-action">${escHtml(u.action)}</span><span class="tag tag-gold">DD ${u.dd}</span></div>`).join('')}
        </div>` : ''}
      ${item.artisanat?.length ? `
        <p class="cls-section-title">Artisanat possible</p>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem">${item.artisanat.map(a => `<span class="tag tag-green">${escHtml(a)}</span>`).join('')}</div>` : ''}
    `);
  } else if (type === 'objet-magique') {
    item = (APP.data.objetsMagiques || []).find(o => o.nom === nom);
    if (!item) return;
    const rslug = raritySlug(item.rarete);
    const rariteLabel = (item.rarete || '').split('(')[0].trim();
    Modal.show(`
      <h2 class="modal-title" id="modal-title">${escHtml(item.nom)}</h2>
      <div class="modal-tags">
        <span class="tag equip-rarity-tag equip-rarity-tag--${rslug}">${escHtml(rariteLabel)}</span>
        ${item.type ? `<span class="tag tag-purple">${escHtml(item.type)}</span>` : ''}
        ${item.lien ? `<span class="tag tag-slate">${escHtml(item.lien)}</span>` : ''}
      </div>
      ${item.description ? `<div class="modal-divider"></div><div class="html-content">${enrichSortText(item.description)}</div>` : '<p style="color:var(--text3)">Aucune description.</p>'}
    `);
  }
}

function renderEquipements(container) {
  const TABS = [
    { id: 'armes',          label: 'Armes',          icon: '⚔' },
    { id: 'armures',        label: 'Armures',         icon: '🛡' },
    { id: 'materiel',       label: 'Matériel',        icon: '🎒' },
    { id: 'outils',         label: 'Outils',          icon: '🔧' },
    { id: 'objets-magiques', label: 'Objets Magiques', icon: '✦' },
  ];
  let activeTab = 'armes';
  let searchVal = '';
  let activeRarity = '';

  const RARITIES = [
    { id: '',           label: 'Toutes'    },
    { id: 'commun',     label: 'Commun'    },
    { id: 'peu-commun', label: 'Peu commun' },
    { id: 'rare',       label: 'Rare'      },
    { id: 'tres-rare',  label: 'Très rare' },
    { id: 'legendaire', label: 'Légendaire' },
  ];

  container.innerHTML = `<div class="page"><div class="container">
    <div class="page-header">
      <h1 class="page-title">Équipements &amp; Objets</h1>
      <div class="page-ornament" aria-hidden="true">⚔</div>
      <p class="page-subtitle">Armes, armures, matériel d'aventurier, outils et objets magiques</p>
    </div>
    <div class="controls-bar">
      <div class="search-bar-wrap">
        <span class="search-icon">🔍</span>
        <input class="search-input" type="search" id="equip-search" placeholder="Rechercher…">
        <button class="search-clear" id="equip-clear">✕</button>
      </div>
      <span class="results-count" id="equip-count"></span>
    </div>
    <div class="equip-tabs-bar">
      ${TABS.map(t => `<button class="equip-tab${t.id === activeTab ? ' active' : ''}" data-tab="${t.id}">${t.icon} ${t.label}</button>`).join('')}
    </div>
    <div id="equip-rarity-bar" class="equip-rarity-bar" style="display:none"></div>
    <div id="equip-content"></div>
  </div></div>`;

  function renderRarityBar(show) {
    const bar = document.getElementById('equip-rarity-bar');
    if (!show) { bar.style.display = 'none'; return; }
    bar.style.display = 'flex';
    bar.innerHTML = RARITIES.map(r => `
      <button class="equip-rarity-btn${r.id === activeRarity ? ' active' : ''}${r.id ? ' equip-rarity-btn--' + r.id : ''}" data-rarity="${r.id}">${r.label}</button>
    `).join('');
    bar.querySelectorAll('.equip-rarity-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeRarity = btn.dataset.rarity;
        bar.querySelectorAll('.equip-rarity-btn').forEach(b => b.classList.toggle('active', b === btn));
        renderTab('objets-magiques', searchVal);
      });
    });
  }

  function wireEquipCards() {
    document.querySelectorAll('.equip-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => showEquipModal(card.dataset.equipType, card.dataset.equipNom));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showEquipModal(card.dataset.equipType, card.dataset.equipNom); }
      });
    });
  }

  function renderTab(tab, search) {
    const q = search.toLowerCase().trim();
    const content = document.getElementById('equip-content');
    const count = document.getElementById('equip-count');
    renderRarityBar(tab === 'objets-magiques');

    if (tab === 'armes') {
      let total = 0;
      const html = (APP.data.armes?.armes || []).map(cat => {
        const filtered = (cat.armes || []).filter(a =>
          !q || a.nom.toLowerCase().includes(q) ||
          (a.degats || '').toLowerCase().includes(q) ||
          (a.proprietes || []).some(p => p.toLowerCase().includes(q))
        );
        if (!filtered.length) return '';
        total += filtered.length;
        return `<div class="equip-category">
          <p class="cls-section-title">${escHtml(cat.categorie)}</p>
          <div class="cards-grid cards-grid--4">
            ${filtered.map(a => `
            <article class="card equip-card equip-card--arme" data-equip-type="arme" data-equip-nom="${escHtml(a.nom)}" tabindex="0">
              <div class="equip-card-inner">
                <div class="equip-card-head">
                  <div class="equip-card-name">${escHtml(a.nom)}</div>
                </div>
                ${a.degats ? `<div class="equip-damage-badge">${escHtml(a.degats)}</div>` : ''}
                ${(a.proprietes || []).length ? `
                <div class="equip-card-props">
                  ${(a.proprietes || []).slice(0, 2).map(p => `<span class="tag tag-slate">${escHtml(p)}</span>`).join('')}
                </div>` : ''}
              </div>
              <div class="equip-card-footer">
                ${a.botte ? `<span class="equip-card-botte" title="Botte d'arme">${escHtml(a.botte)}</span>` : '<span></span>'}
                <span class="equip-card-price-tag">${escHtml(a.prix || '—')}</span>
              </div>
            </article>`).join('')}
          </div>
        </div>`;
      }).join('');
      content.innerHTML = html || '<p class="text-empty">Aucun résultat.</p>';
      count.textContent = total + ' arme' + (total > 1 ? 's' : '');

    } else if (tab === 'armures') {
      let total = 0;
      const html = (APP.data.armures?.armures || []).map(cat => {
        const filtered = (cat.armures || []).filter(a =>
          !q || a.nom.toLowerCase().includes(q) || (a.ca || '').toLowerCase().includes(q)
        );
        if (!filtered.length) return '';
        total += filtered.length;
        return `<div class="equip-category">
          <p class="cls-section-title">${escHtml(cat.categorie)}</p>
          <div class="cards-grid cards-grid--4">
            ${filtered.map(a => `
            <article class="card equip-card equip-card--armure" data-equip-type="armure" data-equip-nom="${escHtml(a.nom)}" tabindex="0">
              <div class="equip-card-inner">
                <div class="equip-card-head">
                  <div class="equip-card-name">${escHtml(a.nom)}</div>
                </div>
                ${a.ca ? `<div class="equip-ca-badge">CA ${escHtml(a.ca)}</div>` : ''}
                ${a.discretion === 'Désavantage' ? `
                <div class="equip-card-props"><span class="tag tag-red" style="font-size:.62rem">⚠ Discrétion</span></div>` : ''}
              </div>
              <div class="equip-card-footer">
                ${a.force ? `<span class="equip-card-botte">FOR ${escHtml(a.force)}</span>` : '<span></span>'}
                <span class="equip-card-price-tag">${escHtml(a.cout || '—')}</span>
              </div>
            </article>`).join('')}
          </div>
        </div>`;
      }).join('');
      content.innerHTML = html || '<p class="text-empty">Aucun résultat.</p>';
      count.textContent = total + ' armure' + (total > 1 ? 's' : '');

    } else if (tab === 'materiel') {
      const items = (APP.data.materiels || []).filter(m =>
        !q || m.nom.toLowerCase().includes(q) || (m.description || '').toLowerCase().includes(q)
      );
      content.innerHTML = items.length ? `<div class="cards-grid cards-grid--3">
        ${items.map(m => `
        <article class="card equip-card equip-card--materiel" data-equip-type="materiel" data-equip-nom="${escHtml(m.nom)}" tabindex="0">
          <div class="equip-card-inner">
            <div class="equip-card-head">
              <div class="equip-card-name">${escHtml(m.nom)}</div>
              <span class="equip-card-price-badge">${escHtml(m.prix || '—')}</span>
            </div>
            ${m.description ? `<p class="equip-card-desc">${escHtml(m.description.slice(0, 100))}${m.description.length > 100 ? '…' : ''}</p>` : ''}
            ${m.poids && m.poids !== '—' ? `<div class="equip-card-props" style="margin-top:auto"><span class="tag tag-gray" style="font-size:.65rem">${escHtml(m.poids)}</span></div>` : ''}
          </div>
        </article>`).join('')}
      </div>` : '<p class="text-empty">Aucun résultat.</p>';
      count.textContent = items.length + ' objet' + (items.length > 1 ? 's' : '');

    } else if (tab === 'outils') {
      const items = (APP.data.outils || []).filter(o =>
        !q || o.nom.toLowerCase().includes(q) || (o.caracteristique || '').toLowerCase().includes(q)
      );
      content.innerHTML = items.length ? `<div class="cards-grid cards-grid--3">
        ${items.map(o => `
        <article class="card equip-card equip-card--outil" data-equip-type="outil" data-equip-nom="${escHtml(o.nom)}" tabindex="0">
          <div class="equip-card-inner">
            <div class="equip-card-head">
              <div class="equip-card-name">${escHtml(o.nom)}</div>
            </div>
            ${o.caracteristique ? `<div class="equip-car-badge">${escHtml(o.caracteristique)}</div>` : ''}
            ${o.utilisations?.length ? `<p class="equip-card-desc">${escHtml(o.utilisations[0].action)}</p>` : ''}
          </div>
          <div class="equip-card-footer">
            ${o.utilisations?.length ? `<span class="equip-card-botte">${o.utilisations.length} usage${o.utilisations.length > 1 ? 's' : ''}</span>` : '<span></span>'}
            <span class="equip-card-price-tag">${escHtml(o.prix || '—')}</span>
          </div>
        </article>`).join('')}
      </div>` : '<p class="text-empty">Aucun résultat.</p>';
      count.textContent = items.length + ' outil' + (items.length > 1 ? 's' : '');

    } else if (tab === 'objets-magiques') {
      const all = APP.data.objetsMagiques || [];
      const items = all.filter(o => {
        const matchQ = !q || o.nom.toLowerCase().includes(q) ||
          (o.type || '').toLowerCase().includes(q) ||
          (o.description || '').toLowerCase().includes(q);
        const matchR = !activeRarity || raritySlug(o.rarete) === activeRarity;
        return matchQ && matchR;
      });
      content.innerHTML = items.length ? `<div class="cards-grid cards-grid--3">
        ${items.map(o => {
          const rslug = raritySlug(o.rarete);
          const rariteLabel = (o.rarete || '').split('(')[0].trim();
          return `
          <article class="card equip-card equip-card--magique equip-rarity-${rslug}" data-equip-type="objet-magique" data-equip-nom="${escHtml(o.nom)}" tabindex="0">
            <div class="equip-card-inner">
              <div class="equip-card-head">
                <span class="equip-magic-sigil">✦</span>
                <div class="equip-card-name">${escHtml(o.nom)}</div>
              </div>
              <div class="equip-card-props">
                <span class="tag equip-rarity-tag equip-rarity-tag--${rslug}">${escHtml(rariteLabel)}</span>
                ${o.type ? `<span class="tag tag-purple" style="font-size:.62rem">${escHtml(o.type)}</span>` : ''}
              </div>
              ${o.lien ? `<div class="equip-magic-lien">${escHtml(o.lien)}</div>` : ''}
              ${o.description ? `<p class="equip-card-desc">${escHtml(o.description.slice(0, 90))}${o.description.length > 90 ? '…' : ''}</p>` : ''}
            </div>
          </article>`;
        }).join('')}
      </div>` : '<p class="text-empty">Aucun objet magique trouvé.</p>';
      count.textContent = items.length + ' objet' + (items.length > 1 ? 's' : '');
    }

    wireEquipCards();
  }

  document.querySelectorAll('.equip-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      activeRarity = '';
      document.querySelectorAll('.equip-tab').forEach(b => b.classList.toggle('active', b === btn));
      renderTab(activeTab, searchVal);
    });
  });

  const searchInput = document.getElementById('equip-search');
  const clearBtn = document.getElementById('equip-clear');
  searchInput.addEventListener('input', debounce(() => { searchVal = searchInput.value; renderTab(activeTab, searchVal); }, 150));
  clearBtn.addEventListener('click', () => { searchInput.value = ''; searchVal = ''; renderTab(activeTab, ''); searchInput.focus(); });

  renderTab(activeTab, '');
}

// ============================================================
// PAGE: PERSONNAGE (coming soon)
// ============================================================

// ============================================================
// PAGE: COMBAT — Guide du Joueur
// ============================================================

function renderCombat(container) {
  const TABS = [
    { id: 'tour',       label: 'Votre Tour',      icon: '🗓' },
    { id: 'actions',    label: 'Actions',          icon: '⚔' },
    { id: 'deplacement',label: 'Déplacement',      icon: '🏃' },
    { id: 'attaque',    label: 'Attaquer',         icon: '🎯' },
    { id: 'bonus',      label: 'Bonus & Réactions',icon: '✦' },
    { id: 'couvert',    label: 'Couvert',          icon: '🛡' },
    { id: 'special',    label: 'Règles Spéciales', icon: '⚡' },
    { id: 'pv',         label: 'PV & Mort',        icon: '💀' },
  ];

  container.innerHTML = `
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Guide du Joueur — Combat</h1>
        <div class="page-ornament" aria-hidden="true">⚔</div>
        <p class="page-subtitle">Votre aide-mémoire interactif pour chaque tour de combat</p>
      </div>
      <div class="cbt-tabs" role="tablist">
        ${TABS.map((t,i) => `<button class="cbt-tab${i===0?' active':''}" data-section="${t.id}" role="tab">${t.icon} ${t.label}</button>`).join('')}
      </div>
      <div id="cbt-content" class="cbt-content"></div>
    </div>
  </div>`;

  // ── SECTION: Votre Tour ─────────────────────────────────────
  function sectionTour() { return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">⏱ Un tour de combat = <span class="cbt-highlight">6 secondes</span></h2>
    <p class="cbt-lead">Chaque round, dans l'ordre d'initiative, chaque participant fait son tour. Voici ce que vous pouvez faire :</p>

    <div class="cbt-turn-flow">
      <div class="cbt-turn-step cbt-step--move">
        <div class="cbt-step-icon">🏃</div>
        <div class="cbt-step-label">MOUVEMENT</div>
        <div class="cbt-step-desc">Jusqu'à votre vitesse<br><span class="cbt-step-note">Divisible à volonté</span></div>
        <div class="cbt-step-badge cbt-badge--optional">Optionnel</div>
      </div>
      <div class="cbt-turn-arrow">→</div>
      <div class="cbt-turn-step cbt-step--action">
        <div class="cbt-step-icon">⚔</div>
        <div class="cbt-step-label">ACTION</div>
        <div class="cbt-step-desc">Attaquer, sort, foncer…<br><span class="cbt-step-note">Une par tour</span></div>
        <div class="cbt-step-badge cbt-badge--required">1 par tour</div>
      </div>
      <div class="cbt-turn-arrow">→</div>
      <div class="cbt-turn-step cbt-step--bonus">
        <div class="cbt-step-icon">✦</div>
        <div class="cbt-step-label">ACTION BONUS</div>
        <div class="cbt-step-desc">Si une capacité<br>vous le permet</div>
        <div class="cbt-step-badge cbt-badge--optional">Si disponible</div>
      </div>
      <div class="cbt-turn-arrow">⟷</div>
      <div class="cbt-turn-step cbt-step--reaction">
        <div class="cbt-step-icon">⚡</div>
        <div class="cbt-step-label">RÉACTION</div>
        <div class="cbt-step-desc">À tout moment<br>du round</div>
        <div class="cbt-step-badge cbt-badge--special">1 par round</div>
      </div>
    </div>

    <div class="cbt-tip-row">
      <div class="cbt-tip">
        <span class="cbt-tip-icon">🆓</span>
        <div><strong>Interaction gratuite</strong> — Dégainer une arme, ouvrir une porte, ramasser un objet… <em>une interaction simple par tour</em>, sans utiliser votre action.</div>
      </div>
      <div class="cbt-tip">
        <span class="cbt-tip-icon">💬</span>
        <div><strong>Parler</strong> — Quelques mots ou une phrase courte sont toujours gratuits, même hors de votre tour.</div>
      </div>
    </div>

    <h3 class="cbt-subsection">🗓 Ordre du combat</h3>
    <div class="cbt-steps-list">
      <div class="cbt-step-num"><span>1</span><div><strong>Surprise ?</strong> Le MJ détermine si des participants sont surpris. Les surpris ne peuvent pas agir au premier round.</div></div>
      <div class="cbt-step-num"><span>2</span><div><strong>Initiative</strong> — Chacun lance un <span class="dnd-dice">d20</span> + modificateur de Dextérité. On joue dans l'ordre décroissant.</div></div>
      <div class="cbt-step-num"><span>3</span><div><strong>Rounds</strong> — Chaque participant prend son tour. Quand tout le monde a joué, un nouveau round commence.</div></div>
      <div class="cbt-step-num"><span>4</span><div><strong>Fin du combat</strong> — Quand un camp est vaincu, en fuite ou rend les armes.</div></div>
    </div>
  </div>`; }

  // ── SECTION: Actions ────────────────────────────────────────
  function sectionActions() {
    const actions = [
      { icon: '⚔', name: 'Attaquer', color: 'crimson', key: '1 action', desc: 'Effectuez une ou plusieurs attaques au corps à corps ou à distance.', detail: 'Le nombre d\'attaques dépend de vos capacités (Attaque supplémentaire). Chaque attaque = 1 jet d\'attaque.' },
      { icon: '🪄', name: 'Lancer un Sort', color: 'purple', key: '1 action', desc: 'Lancez un sort dont le temps d\'incantation est « 1 action ».', detail: 'Les sorts avec incantation en action bonus ou réaction utilisent l\'action bonus ou la réaction, pas l\'action.' },
      { icon: '🏃', name: 'Foncer', color: 'forest', key: '1 action', desc: 'Gagnez du mouvement supplémentaire égal à votre vitesse ce tour.', detail: 'Avec une vitesse de 9m, Foncer vous donne 9m de mouvement supplémentaire (18m total ce tour).' },
      { icon: '🛡', name: 'Esquiver', color: 'steel', key: '1 action', desc: 'Vous concentrez sur votre défense jusqu\'au début de votre prochain tour.', detail: 'Toutes les attaques contre vous ont désavantage. Vous avez avantage à vos jets de sauvegarde de Dextérité. Effet annulé si incapacité ou vitesse 0.' },
      { icon: '🤝', name: 'Aider', color: 'bronze', key: '1 action', desc: 'Un allié obtient l\'avantage sur son prochain jet de caractéristique ou d\'attaque.', detail: 'Pour un jet d\'attaque, vous devez menacer la même cible. L\'avantage s\'applique à la prochaine action de l\'allié avant votre prochain tour.' },
      { icon: '🔍', name: 'Chercher', color: 'gold', key: '1 action', desc: 'Cherchez une créature cachée, un piège, ou un objet.', detail: 'Jet de Sagesse (Perception) ou Intelligence (Investigation), selon ce que vous cherchez.' },
      { icon: '👁', name: 'Se Cacher', color: 'slate', key: '1 action', desc: 'Tentez de disparaître aux yeux de vos ennemis.', detail: 'Jet de Dextérité (Discrétion) contre la Perception passive de vos ennemis. Vous devez être hors de leur champ de vision.' },
      { icon: '⏳', name: 'Se Tenir Prêt', color: 'steel', key: '1 action', desc: 'Préparez une action à déclencher sur un événement précis.', detail: 'Décidez d\'un déclencheur ("quand l\'ennemi sort de derrière le pilier…") et d\'une action. Quand le déclencheur se produit, utilisez votre réaction pour agir.' },
      { icon: '💨', name: 'Se Désengager', color: 'forest', key: '1 action', desc: 'Vos déplacements ce tour ne provoquent pas d\'attaques d\'opportunité.', detail: 'Idéal pour s\'échapper d\'un corps à corps sans risque. S\'applique à tout votre mouvement restant ce tour.' },
      { icon: '🔧', name: 'Utiliser un Objet', color: 'bronze', key: '1 action', desc: 'Pour les objets nécessitant une action pour être utilisés.', detail: 'Par exemple : boire une potion (action gratuite si vous la buvez vous-même, mais action complète pour la donner à quelqu\'un). Attention à vérifier la description de l\'objet.' },
    ];
    return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">⚔ Que puis-je faire avec mon action ?</h2>
    <p class="cbt-lead">Cliquez sur une action pour voir les détails.</p>
    <div class="cbt-actions-grid">
      ${actions.map(a => `
      <div class="cbt-action-card cbt-action--${a.color}" tabindex="0">
        <div class="cbt-action-head">
          <span class="cbt-action-icon">${a.icon}</span>
          <div class="cbt-action-name">${a.name}</div>
          <span class="cbt-action-cost">${a.key}</span>
        </div>
        <p class="cbt-action-desc">${a.desc}</p>
        <div class="cbt-action-detail">${a.detail}</div>
      </div>`).join('')}
    </div>
    <div class="cbt-callout cbt-callout--gold">
      <span class="cbt-callout-icon">💡</span>
      <div>Votre classe ou vos capacités peuvent vous donner des <strong>actions supplémentaires</strong>. Consultez toujours la description de vos aptitudes de classe.</div>
    </div>
  </div>`;
  }

  // ── SECTION: Déplacement ────────────────────────────────────
  function sectionDeplacement() { return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">🏃 Se déplacer en combat</h2>
    <div class="cbt-rule-cards">
      <div class="cbt-rule-card">
        <div class="cbt-rule-icon">📏</div>
        <div class="cbt-rule-title">Vitesse de déplacement</div>
        <p>Vous pouvez vous déplacer d'une distance <strong>inférieure ou égale à votre vitesse</strong> par tour. La plupart des personnages humanoïdes ont 9 m de vitesse.</p>
        <div class="cbt-rule-note">Vous n'êtes pas obligé de tout utiliser d'un coup !</div>
      </div>
      <div class="cbt-rule-card">
        <div class="cbt-rule-icon">✂</div>
        <div class="cbt-rule-title">Diviser son mouvement</div>
        <p>Vous pouvez <strong>découper votre déplacement</strong> autour de vos attaques.</p>
        <div class="cbt-example">Ex : Avancer de 4,5m → Attaquer → Reculer de 4,5m</div>
      </div>
      <div class="cbt-rule-card cbt-rule--warning">
        <div class="cbt-rule-icon">🏔</div>
        <div class="cbt-rule-title">Terrain difficile</div>
        <p>Dans un terrain difficile (eau, neige, débris…), <strong>chaque mètre parcouru coûte 2 m</strong> de mouvement.</p>
        <div class="cbt-rule-note">Votre vitesse de 9m vous permet seulement de parcourir 4,5m en terrain difficile.</div>
      </div>
      <div class="cbt-rule-card cbt-rule--danger">
        <div class="cbt-rule-icon">😓</div>
        <div class="cbt-rule-title">Se relever (état : À Terre)</div>
        <p>Se relever coûte <strong>la moitié de votre vitesse</strong>. Avec 9m de vitesse, se relever coûte 4,5m.</p>
        <div class="cbt-rule-note">Ramper (rester à terre) : chaque mètre parcouru coûte 2m (terrain difficile cumulable).</div>
      </div>
    </div>

    <h3 class="cbt-subsection">🎯 Espace occupé par les créatures</h3>
    <div class="cbt-size-table">
      <div class="cbt-size-row cbt-size-header">
        <span>Taille</span><span>Exemples</span><span>Espace</span>
      </div>
      <div class="cbt-size-row"><span>Minuscule / Petite</span><span>Gobelin, Halfelin</span><span>1,5 m × 1,5 m</span></div>
      <div class="cbt-size-row"><span>Moyenne</span><span>Humain, Elfe, Nain</span><span>1,5 m × 1,5 m</span></div>
      <div class="cbt-size-row"><span>Grande</span><span>Cheval, Ogre</span><span>3 m × 3 m</span></div>
      <div class="cbt-size-row"><span>Très Grande</span><span>Géant des collines</span><span>4,5 m × 4,5 m</span></div>
      <div class="cbt-size-row"><span>Gigantesque</span><span>Tarrasque</span><span>6 m × 6 m +</span></div>
    </div>

    <div class="cbt-callout cbt-callout--info">
      <span class="cbt-callout-icon">ℹ</span>
      <div>Vous pouvez traverser l'espace d'une créature <strong>alliée</strong>, mais pas d'une créature hostile (sauf si vous avez au moins deux tailles d'écart).</div>
    </div>
  </div>`; }

  // ── SECTION: Attaque ────────────────────────────────────────
  function sectionAttaque() { return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">🎯 Effectuer une attaque</h2>

    <div class="cbt-formula-block">
      <div class="cbt-formula-title">JET D'ATTAQUE</div>
      <div class="cbt-formula">
        <span class="cbt-formula-part cbt-fp--dice">d20</span>
        <span class="cbt-formula-op">+</span>
        <span class="cbt-formula-part cbt-fp--stat">Mod. Force<br><small>(ou Dex pour distance)</small></span>
        <span class="cbt-formula-op">+</span>
        <span class="cbt-formula-part cbt-fp--prof">Bonus de<br>Maîtrise</span>
        <span class="cbt-formula-op">≥</span>
        <span class="cbt-formula-part cbt-fp--target">CA<br>de la cible</span>
        <span class="cbt-formula-op">=</span>
        <span class="cbt-formula-part cbt-fp--hit">TOUCHÉ</span>
      </div>
    </div>

    <div class="cbt-rule-cards">
      <div class="cbt-rule-card cbt-rule--special">
        <div class="cbt-rule-icon">⭐</div>
        <div class="cbt-rule-title">Coup Critique — 20 naturel</div>
        <p>Un <span class="dnd-dice">20</span> au dé = touché automatique. Lancez les <strong>dés de dégâts deux fois</strong> (pas les modificateurs).</p>
        <div class="cbt-example">Ex : Dague 1d4+3 → critique = 2d4+3</div>
      </div>
      <div class="cbt-rule-card cbt-rule--danger">
        <div class="cbt-rule-icon">💀</div>
        <div class="cbt-rule-title">Échec automatique — 1 naturel</div>
        <p>Un <span class="dnd-dice">1</span> au dé = raté automatiquement, quelle que soit la CA de la cible.</p>
      </div>
    </div>

    <h3 class="cbt-subsection">Avantage & Désavantage</h3>
    <div class="cbt-adv-grid">
      <div class="cbt-adv-block cbt-adv--adv">
        <div class="cbt-adv-title"><span class="dnd-adv">AVANTAGE</span></div>
        <div class="cbt-adv-formula">Lancez 2d20 — gardez le <strong>plus haut</strong></div>
        <div class="cbt-adv-cases">
          <strong>Vous attaquez avec avantage si :</strong>
          <ul>
            <li>La cible est <span class="dnd-condition">À Terre</span> et vous êtes adjacent</li>
            <li>La cible est <span class="dnd-condition">Aveuglée</span>, <span class="dnd-condition">Paralysée</span>, <span class="dnd-condition">Inconsciente</span>…</li>
            <li>Vous êtes <span class="dnd-condition">Invisible</span> pour la cible</li>
            <li>Un allié a utilisé l'action <strong>Aider</strong></li>
          </ul>
        </div>
      </div>
      <div class="cbt-adv-block cbt-adv--disadv">
        <div class="cbt-adv-title"><span class="dnd-disadv">DÉSAVANTAGE</span></div>
        <div class="cbt-adv-formula">Lancez 2d20 — gardez le <strong>plus bas</strong></div>
        <div class="cbt-adv-cases">
          <strong>Vous attaquez avec désavantage si :</strong>
          <ul>
            <li>La cible est <span class="dnd-condition">Invisible</span> pour vous</li>
            <li>Vous êtes <span class="dnd-condition">Empoisonné</span>, <span class="dnd-condition">À Terre</span>…</li>
            <li>Attaque à distance quand un ennemi est <strong>adjacent</strong> à vous</li>
            <li>Cible hors de la portée normale d'une arme à distance</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="cbt-callout cbt-callout--gold">
      <span class="cbt-callout-icon">⚖</span>
      <div>Si vous avez à la fois avantage ET désavantage pour la même attaque, ils <strong>s'annulent</strong> — lancez un seul d20, peu importe combien de sources vous avez.</div>
    </div>

    <h3 class="cbt-subsection">Dégâts</h3>
    <div class="cbt-rule-cards">
      <div class="cbt-rule-card">
        <div class="cbt-rule-icon">🗡</div>
        <div class="cbt-rule-title">Jet de dégâts</div>
        <p>Dés indiqués par l'arme + modificateur de Force (ou Dex pour armes de finesse / distance).</p>
      </div>
      <div class="cbt-rule-card cbt-rule--green">
        <div class="cbt-rule-icon">🛡</div>
        <div class="cbt-rule-title">Résistance</div>
        <p>Dégâts <strong>divisés par 2</strong> (arrondi à l'inférieur) pour ce type de dégâts.</p>
      </div>
      <div class="cbt-rule-card cbt-rule--danger">
        <div class="cbt-rule-icon">💥</div>
        <div class="cbt-rule-title">Vulnérabilité</div>
        <p>Dégâts <strong>doublés</strong> pour ce type de dégâts. Résistance et vulnérabilité ne se cumulent pas.</p>
      </div>
    </div>
  </div>`; }

  // ── SECTION: Bonus & Réactions ──────────────────────────────
  function sectionBonus() { return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">✦ Actions Bonus & Réactions</h2>

    <div class="cbt-two-col">
      <div class="cbt-panel cbt-panel--bonus">
        <h3 class="cbt-panel-title">✦ Action Bonus</h3>
        <div class="cbt-panel-rule">
          <div class="cbt-big-rule">Une seule action bonus par tour</div>
          <p>Vous ne pouvez utiliser une action bonus que si <strong>une capacité, un sort ou une règle</strong> vous le permet explicitement.</p>
        </div>
        <div class="cbt-examples-list">
          <div class="cbt-panel-rule-title">Exemples courants :</div>
          <div class="cbt-example-row"><span class="tag tag-red">Roublard</span> Ruse (Désengager, Foncer, Se cacher en bonus)</div>
          <div class="cbt-example-row"><span class="tag tag-bronze">Barbare</span> Entrer en Rage</div>
          <div class="cbt-example-row"><span class="tag tag-gold">Paladin</span> Châtiment divin (souvent bonus)</div>
          <div class="cbt-example-row"><span class="tag tag-forest">Druide / Clerc</span> Certains sorts (Soins des blessures… selon niveau)</div>
          <div class="cbt-example-row"><span class="tag tag-slate">Combat à 2 armes</span> 2e attaque avec arme légère</div>
        </div>
        <div class="cbt-callout cbt-callout--warning" style="margin-top:1rem">
          <span class="cbt-callout-icon">⚠</span>
          <div>Si vous ne disposez d'aucune capacité autorisant une action bonus, <strong>vous n'en avez pas</strong>.</div>
        </div>
      </div>

      <div class="cbt-panel cbt-panel--reaction">
        <h3 class="cbt-panel-title">⚡ Réaction</h3>
        <div class="cbt-panel-rule">
          <div class="cbt-big-rule">Une seule réaction par round</div>
          <p>Se recharge au <strong>début de votre propre tour</strong>. Une réaction peut être utilisée à n'importe quel moment du round — pendant votre tour ou celui d'un autre.</p>
        </div>
        <div class="cbt-examples-list">
          <div class="cbt-panel-rule-title">Exemples courants :</div>
          <div class="cbt-example-row"><span class="tag tag-red">Attaque d'opportunité</span> Quand un ennemi quitte votre allonge</div>
          <div class="cbt-example-row"><span class="tag tag-steel">Bouclier (sort)</span> +5 CA contre une attaque</div>
          <div class="cbt-example-row"><span class="tag tag-forest">Absorber les Éléments</span> Réduire dégâts élémentaires</div>
          <div class="cbt-example-row"><span class="tag tag-gold">Se Tenir Prêt</span> Déclencher votre action préparée</div>
          <div class="cbt-example-row"><span class="tag tag-slate">Barbare (Retour à l'envoyeur)</span> Renvoyer une attaque</div>
        </div>
        <div class="cbt-callout cbt-callout--info" style="margin-top:1rem">
          <span class="cbt-callout-icon">ℹ</span>
          <div>Si votre réaction se déclenche pendant le tour d'une autre créature, votre prochain tour commence juste après.</div>
        </div>
      </div>
    </div>

    <h3 class="cbt-subsection">⏳ Se Tenir Prêt — Comment ça fonctionne ?</h3>
    <div class="cbt-decision-tree">
      <div class="cbt-dt-step cbt-dt--action">
        <strong>Pendant votre tour :</strong> Choisissez une action et un déclencheur
        <div class="cbt-dt-example">« Si un ennemi franchit cette porte, je lui lance une attaque »</div>
      </div>
      <div class="cbt-dt-arrow">↓</div>
      <div class="cbt-dt-row">
        <div class="cbt-dt-branch">
          <div class="cbt-dt-cond">Le déclencheur se produit</div>
          <div class="cbt-dt-step cbt-dt--good">→ Utilisez votre réaction pour agir</div>
        </div>
        <div class="cbt-dt-branch">
          <div class="cbt-dt-cond">Le déclencheur ne se produit pas</div>
          <div class="cbt-dt-step cbt-dt--neutral">→ Rien ne se passe, réaction conservée</div>
        </div>
      </div>
      <div class="cbt-callout cbt-callout--warning" style="margin-top:1rem">
        <span class="cbt-callout-icon">⚠</span>
        <div>Un sort préparé avec Se Tenir Prêt exige la <strong>concentration</strong> jusqu'à ce que vous le déclenchiez.</div>
      </div>
    </div>
  </div>`; }

  // ── SECTION: Couvert ────────────────────────────────────────
  function sectionCouvert() { return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">🛡 Le Couvert</h2>
    <p class="cbt-lead">Un couvert vous protège des attaques et de certains sorts. Il existe 3 niveaux.</p>
    <div class="cbt-cover-grid">
      <div class="cbt-cover-card cbt-cover--half">
        <div class="cbt-cover-icon">🧱</div>
        <div class="cbt-cover-level">Couvert Partiel</div>
        <div class="cbt-cover-desc">La moitié du corps est protégée (pilier, mur bas, autre créature)</div>
        <div class="cbt-cover-bonus">
          <span class="cbt-cover-stat">+2</span>
          <span class="cbt-cover-stat-label">CA & jets de sauvegarde Dextérité</span>
        </div>
      </div>
      <div class="cbt-cover-card cbt-cover--three-quarter">
        <div class="cbt-cover-icon">🏰</div>
        <div class="cbt-cover-level">Couvert Important</div>
        <div class="cbt-cover-desc">Les 3/4 du corps sont protégés (meurtrière, fenêtre, grille)</div>
        <div class="cbt-cover-bonus">
          <span class="cbt-cover-stat">+5</span>
          <span class="cbt-cover-stat-label">CA & jets de sauvegarde Dextérité</span>
        </div>
      </div>
      <div class="cbt-cover-card cbt-cover--full">
        <div class="cbt-cover-icon">🚫</div>
        <div class="cbt-cover-level">Couvert Total</div>
        <div class="cbt-cover-desc">Corps complètement caché (derrière un mur plein)</div>
        <div class="cbt-cover-bonus">
          <span class="cbt-cover-stat">🚫</span>
          <span class="cbt-cover-stat-label">Impossible à cibler directement</span>
        </div>
      </div>
    </div>
    <div class="cbt-callout cbt-callout--gold">
      <span class="cbt-callout-icon">💡</span>
      <div>Si vous avez plusieurs sources de couvert, seul le <strong>meilleur</strong> s'applique. Un couvert total ne protège pas contre les effets de zone qui ne nécessitent pas de ciblage.</div>
    </div>
  </div>`; }

  // ── SECTION: Règles Spéciales ───────────────────────────────
  function sectionSpecial() { return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">⚡ Règles Spéciales</h2>

    <div class="cbt-accordion">

      <div class="cbt-accordion-item open">
        <div class="cbt-accordion-head">
          <span class="cbt-acc-icon">🗡🗡</span>
          <span class="cbt-acc-title">Combat à Deux Armes</span>
          <span class="cbt-acc-arrow">▾</span>
        </div>
        <div class="cbt-accordion-body">
          <div class="cbt-dt-step cbt-dt--action">
            <strong>Conditions :</strong> Votre action principale était Attaquer avec une arme légère de corps à corps
          </div>
          <div class="cbt-dt-arrow">↓</div>
          <div class="cbt-decision-tree">
            <div class="cbt-dt-step cbt-dt--good">
              Action Bonus → Attaquer avec une <strong>2e arme légère</strong> que vous tenez en main secondaire
            </div>
          </div>
          <div class="cbt-callout cbt-callout--warning" style="margin-top:.75rem">
            <span class="cbt-callout-icon">⚠</span>
            <div>N'ajoutez <strong>pas</strong> votre modificateur de caractéristique aux dégâts de cette attaque bonus (sauf s'il est négatif).</div>
          </div>
          <div class="cbt-example" style="margin-top:.75rem">Ex : Dague (1d4+3 en action) + Dague (1d4 en bonus, <em>sans le +3</em>)</div>
        </div>
      </div>

      <div class="cbt-accordion-item">
        <div class="cbt-accordion-head">
          <span class="cbt-acc-icon">👊</span>
          <span class="cbt-acc-title">Attaque d'Opportunité</span>
          <span class="cbt-acc-arrow">▾</span>
        </div>
        <div class="cbt-accordion-body">
          <div class="cbt-dt-step cbt-dt--action">
            Une créature hostile visible <strong>quitte votre portée</strong> (généralement 1,5 m)
          </div>
          <div class="cbt-dt-arrow">↓</div>
          <div class="cbt-dt-row">
            <div class="cbt-dt-branch">
              <div class="cbt-dt-cond">Vous réagissez</div>
              <div class="cbt-dt-step cbt-dt--good">Utilisez votre <strong>réaction</strong> → une attaque au corps à corps contre elle</div>
            </div>
            <div class="cbt-dt-branch">
              <div class="cbt-dt-cond">Vous laissez passer</div>
              <div class="cbt-dt-step cbt-dt--neutral">La créature se déplace sans encombre</div>
            </div>
          </div>
          <div class="cbt-callout cbt-callout--info" style="margin-top:.75rem">
            <span class="cbt-callout-icon">ℹ</span>
            <div>PAS d'attaque d'opportunité si la créature utilise l'action <strong>Se Désengager</strong> avant de se déplacer.</div>
          </div>
        </div>
      </div>

      <div class="cbt-accordion-item">
        <div class="cbt-accordion-head">
          <span class="cbt-acc-icon">💪</span>
          <span class="cbt-acc-title">Lutte (Agripper)</span>
          <span class="cbt-acc-arrow">▾</span>
        </div>
        <div class="cbt-accordion-body">
          <p>Au lieu d'une attaque normale, tentez d'agripper une créature.</p>
          <div class="cbt-duel-table">
            <div class="cbt-duel-row">
              <div class="cbt-duel-you">Vous : <strong>Force (Athlétisme)</strong></div>
              <span class="cbt-duel-vs">vs</span>
              <div class="cbt-duel-them">Cible : <strong>Force (Athlétisme)</strong> ou <strong>Dex (Acrobaties)</strong></div>
            </div>
          </div>
          <div class="cbt-dt-row" style="margin-top:.75rem">
            <div class="cbt-dt-branch">
              <div class="cbt-dt-cond">Vous réussissez</div>
              <div class="cbt-dt-step cbt-dt--good">Cible → état <span class="dnd-condition">Agrippée</span> (vitesse = 0)</div>
            </div>
            <div class="cbt-dt-branch">
              <div class="cbt-dt-cond">Vous échouez</div>
              <div class="cbt-dt-step cbt-dt--neutral">Attaque ratée, action utilisée</div>
            </div>
          </div>
          <div class="cbt-callout cbt-callout--info" style="margin-top:.75rem">
            <span class="cbt-callout-icon">ℹ</span>
            <div>La cible ne doit pas faire plus d'une catégorie de taille de plus que vous. Vous devez avoir une main libre.</div>
          </div>
        </div>
      </div>

      <div class="cbt-accordion-item">
        <div class="cbt-accordion-head">
          <span class="cbt-acc-icon">🤜</span>
          <span class="cbt-acc-title">Bousculade (Repousser ou Mettre à Terre)</span>
          <span class="cbt-acc-arrow">▾</span>
        </div>
        <div class="cbt-accordion-body">
          <p>Au lieu d'une attaque, tentez de repousser ou de faire tomber une créature.</p>
          <div class="cbt-duel-table">
            <div class="cbt-duel-row">
              <div class="cbt-duel-you">Vous : <strong>Force (Athlétisme)</strong></div>
              <span class="cbt-duel-vs">vs</span>
              <div class="cbt-duel-them">Cible : <strong>Force (Athlétisme)</strong> ou <strong>Dex (Acrobaties)</strong></div>
            </div>
          </div>
          <div class="cbt-dt-row" style="margin-top:.75rem">
            <div class="cbt-dt-branch">
              <div class="cbt-dt-cond">Vous réussissez</div>
              <div class="cbt-dt-step cbt-dt--good">Cible → <span class="dnd-condition">À Terre</span> <strong>OU</strong> repoussée de 1,5 m (votre choix)</div>
            </div>
            <div class="cbt-dt-branch">
              <div class="cbt-dt-cond">Vous échouez</div>
              <div class="cbt-dt-step cbt-dt--neutral">Rien ne se passe</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>`; }

  // ── SECTION: PV & Mort ──────────────────────────────────────
  function sectionPV() { return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">💀 Points de Vie & Mort</h2>

    <div class="cbt-two-col">
      <div class="cbt-panel">
        <h3 class="cbt-panel-title">💔 Tomber à 0 PV</h3>
        <div class="cbt-dt-step cbt-dt--danger">
          Vous tombez <span class="dnd-condition">Inconscient</span> et êtes <strong>À Terre</strong>
        </div>
        <div class="cbt-dt-arrow">↓</div>
        <div class="cbt-dt-step cbt-dt--neutral">
          À chacun de vos tours → <strong>Jet de sauvegarde contre la mort</strong>
          <div class="cbt-example"><span class="dnd-dice">d20</span> — aucun modificateur</div>
        </div>
        <div class="cbt-dt-arrow">↓</div>
        <div class="cbt-death-saves">
          <div class="cbt-save-row cbt-save--good">
            <div class="cbt-save-icon">✔</div>
            <div><strong>10 ou plus</strong> = Succès<br><em class="cbt-note">3 succès → Stabilisé</em></div>
          </div>
          <div class="cbt-save-row cbt-save--bad">
            <div class="cbt-save-icon">✗</div>
            <div><strong>9 ou moins</strong> = Échec<br><em class="cbt-note">3 échecs → Mort</em></div>
          </div>
          <div class="cbt-save-row cbt-save--crit">
            <div class="cbt-save-icon">⭐</div>
            <div><strong>20 naturel</strong> = Revenir à 1 PV</div>
          </div>
          <div class="cbt-save-row cbt-save--worst">
            <div class="cbt-save-icon">💀</div>
            <div><strong>1 naturel</strong> = 2 Échecs d'un coup</div>
          </div>
        </div>
      </div>

      <div class="cbt-panel">
        <h3 class="cbt-panel-title">💊 Être stabilisé</h3>
        <div class="cbt-rule-list">
          <div class="cbt-rule-item">
            <span class="cbt-rule-check">✔</span>
            <div>Un allié peut vous stabiliser en réussissant un jet de <strong>Sagesse (Médecine) DD 10</strong> à votre contact</div>
          </div>
          <div class="cbt-rule-item">
            <span class="cbt-rule-check">✔</span>
            <div>Recevoir des <strong>soins</strong> (sort, potion) vous fait reprendre conscience avec les PV guéris</div>
          </div>
          <div class="cbt-rule-item">
            <span class="cbt-rule-check">✔</span>
            <div>Stabilisé = plus de jets contre la mort. Vous restez inconscient à 0 PV</div>
          </div>
          <div class="cbt-rule-item">
            <span class="cbt-rule-check">✔</span>
            <div>Recevoir des dégâts à 0 PV = un nouvel échec de jet contre la mort (critique = 2 échecs)</div>
          </div>
        </div>

        <h3 class="cbt-panel-title" style="margin-top:1.5rem">☠ Mort instantanée</h3>
        <div class="cbt-callout cbt-callout--danger">
          <span class="cbt-callout-icon">💀</span>
          <div>Si vous tombez à 0 PV et que les dégâts excédentaires égalent ou dépassent votre maximum de PV, vous mourez instantanément (sans jet de sauvegarde).</div>
        </div>
      </div>
    </div>

    <h3 class="cbt-subsection">États courants en combat</h3>
    <div class="cbt-conditions-grid">
      <div class="cbt-condition-card">
        <span class="cbt-cond-icon">😓</span>
        <div class="cbt-cond-name"><span class="dnd-condition">À Terre</span></div>
        <ul class="cbt-cond-effects">
          <li>Attaques à distance contre vous → <span class="dnd-disadv">désavantage</span></li>
          <li>Attaques de CàC contre vous → <span class="dnd-adv">avantage</span></li>
          <li>Se relever coûte la moitié de votre vitesse</li>
          <li>Se déplacer à terre : 1m = 2m de vitesse</li>
        </ul>
      </div>
      <div class="cbt-condition-card">
        <span class="cbt-cond-icon">😵</span>
        <div class="cbt-cond-name"><span class="dnd-condition">Inconscient</span></div>
        <ul class="cbt-cond-effects">
          <li>Incapacité (aucune action)</li>
          <li>Tombe à terre automatiquement</li>
          <li>Attaques → avantage pour l'attaquant</li>
          <li>Les coups au corps à corps → coup critique automatique</li>
        </ul>
      </div>
      <div class="cbt-condition-card">
        <span class="cbt-cond-icon">😱</span>
        <div class="cbt-cond-name"><span class="dnd-condition">Effrayé</span></div>
        <ul class="cbt-cond-effects">
          <li>Désavantage aux jets si source de peur visible</li>
          <li>Ne peut pas s'approcher volontairement de la source</li>
        </ul>
      </div>
      <div class="cbt-condition-card">
        <span class="cbt-cond-icon">🫀</span>
        <div class="cbt-cond-name"><span class="dnd-condition">Charmé</span></div>
        <ul class="cbt-cond-effects">
          <li>Ne peut pas attaquer le charmeur ni le cibler avec des effets néfastes</li>
          <li>Le charmeur a l'avantage aux interactions sociales avec vous</li>
        </ul>
      </div>
      <div class="cbt-condition-card">
        <span class="cbt-cond-icon">🤢</span>
        <div class="cbt-cond-name"><span class="dnd-condition">Empoisonné</span></div>
        <ul class="cbt-cond-effects">
          <li>Désavantage à tous les jets d'attaque et de caractéristique</li>
        </ul>
      </div>
      <div class="cbt-condition-card">
        <span class="cbt-cond-icon">🧊</span>
        <div class="cbt-cond-name"><span class="dnd-condition">Paralysé</span></div>
        <ul class="cbt-cond-effects">
          <li>Incapacité totale, ne peut ni bouger ni parler</li>
          <li>Coups reçus → avantage pour l'attaquant</li>
          <li>CàC adjacent → coup critique automatique</li>
        </ul>
      </div>
    </div>
  </div>`; }

  // ── Wire sections ────────────────────────────────────────────
  const SECTIONS = {
    tour:        sectionTour(),
    actions:     sectionActions(),
    deplacement: sectionDeplacement(),
    attaque:     sectionAttaque(),
    bonus:       sectionBonus(),
    couvert:     sectionCouvert(),
    special:     sectionSpecial(),
    pv:          sectionPV(),
  };

  function showSection(id) {
    const content = document.getElementById('cbt-content');
    if (!content) return;
    content.innerHTML = SECTIONS[id] || '';
    document.querySelectorAll('.cbt-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === id);
    });
    // Wire accordion
    content.querySelectorAll('.cbt-accordion-head').forEach(head => {
      head.addEventListener('click', () => {
        const item = head.closest('.cbt-accordion-item');
        if (item) item.classList.toggle('open');
      });
    });
    // Wire action cards expand/collapse
    content.querySelectorAll('.cbt-action-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('expanded'));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('expanded'); }
      });
    });
  }

  document.querySelectorAll('.cbt-tab').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  showSection('tour');
}

// ============================================================
// PAGE: HISTORIQUES
// ============================================================

function renderHistoriques(container) {
  const list = APP.data.historiques || [];

  container.innerHTML = `
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Historiques</h1>
        <div class="page-ornament" aria-hidden="true">📜</div>
        <p class="page-subtitle">${list.length} historiques disponibles — l'origine qui a façonné votre aventurier</p>
      </div>
      <div class="search-bar-wrap hist-search-wrap">
        <span class="search-icon" aria-hidden="true">🔍</span>
        <input class="search-input" id="hist-search" type="search" placeholder="Rechercher un historique…" autocomplete="off" aria-label="Rechercher un historique">
      </div>
      <div class="hist-grid" id="hist-grid">
        ${list.map(h => renderHistoriqueCard(h)).join('')}
      </div>
    </div>
  </div>`;

  const grid = container.querySelector('#hist-grid');
  container.querySelector('#hist-search').addEventListener('input', debounce(e => {
    const q = normalize(e.target.value);
    grid.querySelectorAll('.hist-card').forEach(card => {
      card.hidden = q && !normalize(card.dataset.search).includes(q);
    });
  }, 180));

  grid.addEventListener('click', e => {
    const card = e.target.closest('.hist-card');
    if (!card) return;
    const name = card.dataset.nom;
    const h = list.find(x => x.nom === name);
    if (!h) return;
    Modal.show(renderHistoriqueModal(h));
  });
}

function renderHistoriqueCard(h) {
  return `
  <article class="hist-card" data-nom="${escHtml(h.nom)}" data-search="${escHtml(normalize(h.nom + ' ' + (h.description||'')))}">
    <div class="hist-card-head">
      <div class="hist-card-left">
        <span class="hist-card-icon">📜</span>
        <div class="hist-card-info">
          <div class="hist-card-name">${escHtml(h.nom)}</div>
          <div class="hist-card-tags">
            ${(h.maitriser_competence||[]).map(c=>`<span class="tag tag-forest">${escHtml(c)}</span>`).join('')}
            ${h.maitrise_outils ? `<span class="tag tag-bronze">${escHtml(h.maitrise_outils)}</span>` : ''}
          </div>
          ${h.equipement ? `<div class="hist-card-equip-preview">
            ${h.equipement.choix_A ? `<div class="hist-equip-row"><span class="hist-equip-badge">(A)</span><span class="hist-equip-text">${escHtml(h.equipement.choix_A)}</span></div>` : ''}
            ${h.equipement.choix_B ? `<div class="hist-equip-row"><span class="hist-equip-badge">(B)</span><span class="hist-equip-text">${escHtml(h.equipement.choix_B)}</span></div>` : ''}
          </div>` : ''}
        </div>
      </div>
      <span class="hist-card-arrow">›</span>
    </div>
  </article>`;
}

function renderHistoriqueModal(h) {
  return `
    <div class="modal-title">📜 ${escHtml(h.nom)}</div>
    <div class="modal-tags">
      ${(h.maitriser_competence||[]).map(c=>`<span class="tag tag-forest">${escHtml(c)}</span>`).join('')}
      ${h.maitrise_outils ? `<span class="tag tag-bronze">${escHtml(h.maitrise_outils)}</span>` : ''}
    </div>
    ${h.description ? `<p class="hist-desc">${escHtml(h.description)}</p>` : ''}
    <div class="modal-divider"></div>
    <div class="hist-info-grid">
      <div class="hist-info-item"><span class="hist-info-label">Maîtrises</span><span>${escHtml((h.maitriser_competence||[]).join(', '))}</span></div>
      <div class="hist-info-item"><span class="hist-info-label">Outils</span><span>${escHtml(h.maitrise_outils || '—')}</span></div>
      <div class="hist-info-item"><span class="hist-info-label">Don suggéré</span><span>${escHtml(h.don || '—')}</span></div>
      <div class="hist-info-item"><span class="hist-info-label">Caractéristiques</span><span>${escHtml((h.valeurs_caracteristique||[]).join(', '))}</span></div>
    </div>
    ${h.equipement ? `
    <div class="modal-divider"></div>
    <div class="modal-section-title">Équipement de départ</div>
    <div class="hist-equip">
      ${h.equipement.choix_A ? `<div class="hist-equip-row"><span class="hist-equip-badge">(A)</span>${escHtml(h.equipement.choix_A)}</div>` : ''}
      ${h.equipement.choix_B ? `<div class="hist-equip-row"><span class="hist-equip-badge">(B)</span>${escHtml(h.equipement.choix_B)}</div>` : ''}
    </div>` : ''}
  `;
}

// ============================================================
// PERSONNAGE — CONSTANTES & HELPERS
// ============================================================

const CHAR_KEY = 'dnd-codex-character';

const ABILITY_KEYS = ['FOR','DEX','CON','INT','SAG','CHA'];
const ABILITY_NAMES = {FOR:'Force',DEX:'Dextérité',CON:'Constitution',INT:'Intelligence',SAG:'Sagesse',CHA:'Charisme'};
const ABILITY_SHORT = {FOR:'For.',DEX:'Dex.',CON:'Con.',INT:'Int.',SAG:'Sag.',CHA:'Cha.'};

const ALL_SKILLS = [
  {nom:'Acrobaties',stat:'DEX'},{nom:'Arcanes',stat:'INT'},{nom:'Athlétisme',stat:'FOR'},
  {nom:'Discrétion',stat:'DEX'},{nom:'Dressage',stat:'SAG'},{nom:'Escamotage',stat:'DEX'},
  {nom:'Histoire',stat:'INT'},{nom:'Intimidation',stat:'CHA'},{nom:'Investigation',stat:'INT'},
  {nom:'Intuition',stat:'SAG'},{nom:'Médecine',stat:'SAG'},{nom:'Nature',stat:'INT'},
  {nom:'Perception',stat:'SAG'},{nom:'Persuasion',stat:'CHA'},{nom:'Religion',stat:'INT'},
  {nom:'Représentation',stat:'CHA'},{nom:'Survie',stat:'SAG'},{nom:'Tromperie',stat:'CHA'},
];

const CLASS_DATA = {
  'Barbare':    {hitDie:12,saves:['FOR','CON'],spellcaster:false,speed:9},
  'Barde':      {hitDie:8, saves:['DEX','CHA'],spellcaster:'full',spellAbility:'CHA',speed:9},
  'Clerc':      {hitDie:8, saves:['SAG','CHA'],spellcaster:'full',spellAbility:'SAG',speed:9},
  'Druide':     {hitDie:8, saves:['INT','SAG'],spellcaster:'full',spellAbility:'SAG',speed:9},
  'Guerrier':   {hitDie:10,saves:['FOR','CON'],spellcaster:false,speed:9},
  'Moine':      {hitDie:8, saves:['FOR','DEX'],spellcaster:false,speed:9},
  'Paladin':    {hitDie:10,saves:['SAG','CHA'],spellcaster:'half',spellAbility:'CHA',speed:9},
  'Rodeur':     {hitDie:10,saves:['FOR','DEX'],spellcaster:'half',spellAbility:'SAG',speed:9},
  'Roublard':   {hitDie:8, saves:['DEX','INT'],spellcaster:false,speed:9},
  'Ensorceleur':{hitDie:6, saves:['CON','CHA'],spellcaster:'full',spellAbility:'CHA',speed:9},
  'Occultiste': {hitDie:8, saves:['SAG','CHA'],spellcaster:'patron',spellAbility:'CHA',speed:9},
  'Magicien':   {hitDie:6, saves:['INT','SAG'],spellcaster:'full',spellAbility:'INT',speed:9},
};

const CLASS_SKILLS_MAP = {
  'Barbare':    {count:2,list:['Athlétisme','Dressage','Intimidation','Nature','Perception','Survie']},
  'Barde':      {count:3,list:'any'},
  'Clerc':      {count:2,list:['Histoire','Intuition','Médecine','Persuasion','Religion']},
  'Druide':     {count:2,list:['Arcanes','Dressage','Intuition','Médecine','Nature','Perception','Religion','Survie']},
  'Guerrier':   {count:2,list:['Acrobaties','Athlétisme','Dressage','Histoire','Intimidation','Intuition','Perception','Survie']},
  'Moine':      {count:2,list:['Acrobaties','Athlétisme','Histoire','Intuition','Religion','Discrétion']},
  'Paladin':    {count:2,list:['Athlétisme','Intuition','Intimidation','Médecine','Persuasion','Religion']},
  'Rodeur':     {count:3,list:['Athlétisme','Discrétion','Dressage','Investigation','Nature','Perception','Intuition','Survie']},
  'Roublard':   {count:4,list:['Acrobaties','Athlétisme','Tromperie','Discrétion','Intuition','Intimidation','Investigation','Perception','Représentation','Persuasion','Escamotage']},
  'Ensorceleur':{count:2,list:['Arcanes','Tromperie','Intuition','Intimidation','Persuasion','Religion']},
  'Occultiste': {count:2,list:['Arcanes','Tromperie','Histoire','Intimidation','Investigation','Nature','Religion']},
  'Magicien':   {count:2,list:['Arcanes','Histoire','Intuition','Investigation','Médecine','Religion']},
};

const LANGUAGES_LIST = ['Elfique','Nain','Géant','Gnome','Gobelin','Halfelin','Orc','Abyssal','Céleste','Commun des profondeurs','Draconique','Infernal','Primordial','Sylvestre'];

const CLASS_EQUIP = {
  'Barbare':    { choix_A: 'Hache de guerre, 4 javelines, sac d\'explorateur', choix_B: '75 po' },
  'Barde':      { choix_A: 'Rapière, cuir, instrument de musique, sac d\'artiste, 26 po', choix_B: '50 po' },
  'Clerc':      { choix_A: 'Cotte de mailles, bouclier, fléau, symbole sacré, sac d\'explorateur, 7 po', choix_B: '110 po' },
  'Druide':     { choix_A: 'Bâton de combat, cuir, sacoche de composants, trousse de soins, sac d\'explorateur, 9 po', choix_B: '50 po' },
  'Guerrier':   { choix_A: 'Cotte de mailles, arc long, 20 flèches, carquois, épée longue', choix_B: '150 po' },
  'Moine':      { choix_A: 'Bâton de combat, 5 dards, tenue de voyage, sac d\'aventurier, 11 po', choix_B: '50 po' },
  'Occultiste': { choix_A: 'Arbalète légère, 20 carreaux, cuir, 2 dagues, sac d\'explorateur, sacoche de composants', choix_B: '100 po' },
  'Paladin':    { choix_A: 'Cotte de mailles, bouclier, épée longue, 5 javelines, symbole sacré, sac d\'explorateur', choix_B: '150 po' },
  'Rodeur':     { choix_A: 'Armure de peaux, arc long, 20 flèches, carquois, épée courte, sac d\'explorateur', choix_B: '50 po' },
  'Roublard':   { choix_A: 'Rapière, arc court, 20 flèches, carquois, cuir, 2 dagues, outils de voleur, sac de cambrioleur', choix_B: '100 po' },
  'Ensorceleur':{ choix_A: 'Arbalète légère, 20 carreaux, 2 dagues, sac d\'explorateur, sacoche de composants', choix_B: '50 po' },
  'Magicien':   { choix_A: 'Bâton de combat, 2 dagues, livre de sorts, sac de chercheur, sacoche de composants', choix_B: '50 po' },
};

// Cantrips connus par classe et par niveau (index 0 = niveau 1)
const CANTRIPS_BY_LEVEL = {
  Barde:      [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
  Clerc:      [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
  Druide:     [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
  Ensorceleur:[4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6],
  Magicien:   [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
  Occultiste: [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
};
// Sorts préparés max par classe (table par niveau ou formule)
const PREPARED_BY_LEVEL = {
  Barde:      { table: [4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22] },
  Clerc:      { formula: (lvl, mods) => Math.max(1, lvl + mods.SAG) },
  Druide:     { formula: (lvl, mods) => Math.max(1, lvl + mods.SAG) },
  Ensorceleur:{ table: [2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15] },
  Magicien:   { formula: (lvl, mods) => Math.max(1, lvl + mods.INT) },
  Occultiste: { table: [2,3,4,4,5,5,6,6,7,7,7,7,7,7,7,7,7,7,7,7] },
  Paladin:    { formula: (lvl, mods) => Math.max(1, Math.floor(lvl/2) + mods.CHA) },
  Rodeur:     { table: [2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,9,10,10,10,10] },
};

function getSpellLimits(char) {
  const lvl  = Math.max(1, Math.min(20, char.niveau||1));
  const idx  = lvl - 1;
  const cls  = char.classe;
  const mods = { SAG: statMod(char.stats?.SAG||10), INT: statMod(char.stats?.INT||10), CHA: statMod(char.stats?.CHA||10) };
  const maxCantrips  = (CANTRIPS_BY_LEVEL[cls]?.[idx]) || 0;
  const prepDef      = PREPARED_BY_LEVEL[cls];
  let   maxPrepares  = 0;
  if (prepDef?.table)   maxPrepares = prepDef.table[idx] || 0;
  if (prepDef?.formula) maxPrepares = prepDef.formula(lvl, mods);
  return { maxCantrips, maxPrepares };
}

const SPELL_SLOTS_TABLE = {
  1:[2,0,0,0,0,0,0,0,0], 2:[3,0,0,0,0,0,0,0,0], 3:[4,2,0,0,0,0,0,0,0],
  4:[4,3,0,0,0,0,0,0,0], 5:[4,3,2,0,0,0,0,0,0], 6:[4,3,3,0,0,0,0,0,0],
  7:[4,3,3,1,0,0,0,0,0], 8:[4,3,3,2,0,0,0,0,0], 9:[4,3,3,3,1,0,0,0,0],
  10:[4,3,3,3,2,0,0,0,0],11:[4,3,3,3,2,1,0,0,0],12:[4,3,3,3,2,1,0,0,0],
  13:[4,3,3,3,2,1,1,0,0],14:[4,3,3,3,2,1,1,0,0],15:[4,3,3,3,2,1,1,1,0],
  16:[4,3,3,3,2,1,1,1,0],17:[4,3,3,3,2,1,1,1,1],18:[4,3,3,3,3,1,1,1,1],
  19:[4,3,3,3,3,2,1,1,1],20:[4,3,3,3,3,2,2,1,1],
};

const STAT_HELP = {
  'CA':{title:'Classe d\'Armure',formula:'10 + Mod.Dex (+ armure)',desc:'Mesure votre protection. Une attaque touche si son jet ≥ votre CA.'},
  'Initiative':{title:'Initiative',formula:'= Mod.Dextérité',desc:'Ordre de jeu en combat. Plus c\'est haut, plus vous jouez tôt.'},
  'Maîtrise':{title:'Bonus de Maîtrise',formula:'+2 (niv.1-4) → +6 (niv.17+)',desc:'S\'ajoute aux jets des compétences, sauvegardes et attaques maîtrisées.'},
  'Vitesse':{title:'Vitesse de déplacement',formula:'9 m par défaut',desc:'Distance max en un tour. Terrain difficile : 2 m de mouvement pour 1 m parcouru.'},
  'Perc.passive':{title:'Perception Passive',formula:'10 + bonus Perception',desc:'Le MJ l\'utilise pour voir si vous détectez quelque chose sans chercher.'},
  'DD Sorts':{title:'Difficulté des Sorts',formula:'8 + Maîtrise + Mod.Caractéristique',desc:'Score que les cibles doivent battre pour résister à vos sorts.'},
  'Att.Sort':{title:'Bonus d\'Attaque de Sort',formula:'Maîtrise + Mod.Caractéristique',desc:'S\'ajoute au d20 quand un sort nécessite un jet d\'attaque.'},
  'FOR':{title:'Force',formula:'Mod = ⌊(score−10)/2⌋',desc:'Puissance physique. Attaques CàC, Athlétisme, charges de poids.'},
  'DEX':{title:'Dextérité',formula:'Mod = ⌊(score−10)/2⌋',desc:'Agilité et précision. CA de base, Initiative, attaques à distance, Discrétion.'},
  'CON':{title:'Constitution',formula:'Mod = ⌊(score−10)/2⌋',desc:'Endurance. Détermine PV max et jets de Concentration pour maintenir un sort.'},
  'INT':{title:'Intelligence',formula:'Mod = ⌊(score−10)/2⌋',desc:'Mémoire et logique. Magie du Magicien, Arcanes, Investigation, Histoire.'},
  'SAG':{title:'Sagesse',formula:'Mod = ⌊(score−10)/2⌋',desc:'Perception et instinct. Magie divine (Clerc/Druide), Perception, Intuition.'},
  'CHA':{title:'Charisme',formula:'Mod = ⌊(score−10)/2⌋',desc:'Personnalité et influence. Magie de Barde/Ensorceleur, Persuasion, Tromperie.'},
  'PV':{title:'Points de Vie',formula:'Max = Dé de vie + Mod.Con × niveau',desc:'Votre vitalité. À 0 PV : inconscient. 3 échecs aux jets de mort = mort.'},
};

function getChar() { try { return JSON.parse(localStorage.getItem(CHAR_KEY)||'null'); } catch { return null; } }
function saveChar(c) { localStorage.setItem(CHAR_KEY, JSON.stringify(c)); }
function delChar()  { localStorage.removeItem(CHAR_KEY); }
function statMod(s) { return Math.floor((s-10)/2); }
function profBonus(lvl) { return 1+Math.ceil(lvl/4); }
function fmtMod(n) { return (n>=0?'+':'')+n; }

function computeCharDerived(c) {
  const cls = CLASS_DATA[c.classe] || {};
  const lvl = c.niveau || 1;
  const pb = profBonus(lvl);
  const dexMod = statMod(c.stats.DEX||10);
  const conMod = statMod(c.stats.CON||10);
  const hitDie = cls.hitDie || 8;
  const hpMax = hitDie + conMod + (lvl-1)*(Math.floor(hitDie/2)+1+conMod);
  const ca = 10 + dexMod; // base (no armor)
  const speed = (c.espece === 'Nain' ? 7.5 : 9);
  const spellAb = cls.spellAbility;
  const spellMod = spellAb ? statMod(c.stats[spellAb]||10) : 0;
  const spellDC = spellAb ? 8+pb+spellMod : null;
  const spellAtk = spellAb ? pb+spellMod : null;
  const percPassive = 10 + (ALL_SKILLS.find(s=>s.nom==='Perception')
    ? statMod(c.stats.SAG||10) + ((c.competences||[]).includes('Perception') ? pb : 0) : 0);
  return { pb, ca, speed, hpMax, spellDC, spellAtk, percPassive };
}

function showStatHelp(key, anchorEl) {
  const h = STAT_HELP[key]; if (!h) return;
  const t = document.getElementById('tooltip');
  const ti = document.getElementById('tooltip-inner');
  ti.innerHTML = `<strong>${escHtml(h.title)}</strong><br><em style="color:var(--gold);font-size:.8em">${escHtml(h.formula)}</em><br>${escHtml(h.desc)}`;
  const r = anchorEl.getBoundingClientRect();
  const left = Math.min(r.left+window.scrollX, window.innerWidth-240);
  t.style.left = Math.max(8,left)+'px';
  t.style.top = (r.bottom+window.scrollY+6)+'px';
  t.style.maxWidth = '230px';
  t.classList.remove('hidden');
  t.removeAttribute('aria-hidden');
}
function hideStatHelp() {
  const t = document.getElementById('tooltip');
  t.classList.add('hidden');
  t.setAttribute('aria-hidden','true');
}
function wireHelp(container) {
  container.querySelectorAll('[data-help]').forEach(el => {
    el.addEventListener('mouseenter', () => showStatHelp(el.dataset.help, el));
    el.addEventListener('mouseleave', hideStatHelp);
    el.addEventListener('focus',      () => showStatHelp(el.dataset.help, el));
    el.addEventListener('blur',       hideStatHelp);
  });
}

// ============================================================
// PERSONNAGE — WIZARD
// ============================================================

let WIZ = null;

function wizReset() {
  WIZ = {
    step: 0,
    espece: null,
    classe: null,
    classeSkills: [],
    classeEquipChoix: 'A',
    histEquipChoix: 'A',
    histOutilChoix: '',
    historique: null,
    pool: [15,14,13,12,10,8],
    assignments: {FOR:null,DEX:null,CON:null,INT:null,SAG:null,CHA:null},
    nom: '', age: '', description: '', histoire: '',
    langues: ['Commun'],
    extraLang: [],
  };
}

const WIZ_STEPS = ['Espèce','Classe','Historique','Caractéristiques','Informations','Résumé'];

function wizProgressBar() {
  return `<div class="wiz-progress">
    ${WIZ_STEPS.map((s,i)=>`<div class="wiz-step-dot${i===WIZ.step?' active':i<WIZ.step?' done':''}">
      <span class="wiz-dot-num">${i<WIZ.step?'✓':(i+1)}</span>
      <span class="wiz-dot-label">${escHtml(s)}</span>
    </div>${i<WIZ_STEPS.length-1?'<div class="wiz-step-line'+(i<WIZ.step?' done':'')+'"></div>':''}`).join('')}
  </div>`;
}

function renderWizard(container) {
  if (!WIZ) wizReset();
  const steps = [wizStepEspece, wizStepClasse, wizStepHistorique, wizStepStats, wizStepInfo, wizStepResume];
  const stepFn = steps[WIZ.step] || wizStepResume;

  container.innerHTML = `
  <div class="page">
    <div class="container">
      <div class="wiz-header">
        <h1 class="page-title">Créer mon Aventurier</h1>
        <p class="page-subtitle">Étape ${WIZ.step+1} sur ${WIZ_STEPS.length} — ${WIZ_STEPS[WIZ.step]}</p>
        ${wizProgressBar()}
      </div>
      <div class="wiz-body" id="wiz-body">
        ${stepFn()}
      </div>
      <div class="wiz-nav" id="wiz-nav">
        ${WIZ.step > 0 ? `<button class="wiz-btn wiz-btn--back" id="wiz-back">← Retour</button>` : '<span></span>'}
        ${WIZ.step < WIZ_STEPS.length-1
          ? `<button class="wiz-btn wiz-btn--next" id="wiz-next" ${!canAdvance()?'disabled':''}>Suivant →</button>`
          : `<button class="wiz-btn wiz-btn--create" id="wiz-create">⚔ Créer mon personnage</button>`}
      </div>
    </div>
  </div>`;

  wireWizardEvents(container);
}

function canAdvance() {
  if (WIZ.step===0) return !!WIZ.espece;
  if (WIZ.step===1) {
    const cs = CLASS_SKILLS_MAP[WIZ.classe?.classe_title||''];
    const needed = cs?.count || 0;
    return !!WIZ.classe && WIZ.classeSkills.length >= needed;
  }
  if (WIZ.step===2) return !!WIZ.historique;
  if (WIZ.step===3) return ABILITY_KEYS.every(k=>WIZ.assignments[k]!==null);
  if (WIZ.step===4) return WIZ.nom.trim().length > 0;
  return true;
}

function wireWizardEvents(container) {
  const back = container.querySelector('#wiz-back');
  const next = container.querySelector('#wiz-next');
  const create = container.querySelector('#wiz-create');

  if (back) back.addEventListener('click', () => { WIZ.step--; renderWizard(container); });
  if (next) next.addEventListener('click', () => { if (canAdvance()) { WIZ.step++; renderWizard(container); } });
  if (create) create.addEventListener('click', () => finalizeCharacter(container));

  // Step-specific wiring
  if (WIZ.step===0) wireStepEspece(container);
  if (WIZ.step===1) wireStepClasse(container);
  if (WIZ.step===2) wireStepHistorique(container);
  if (WIZ.step===3) wireStepStats(container);
  if (WIZ.step===4) wireStepInfo(container);
}

// ── Weapon lookup helper ──────────────────────────────────────
function getWeaponData(nom) {
  const cats = APP.data.armes?.armes || [];
  const key = normalize(nom);
  for (const cat of cats) {
    const found = (cat.armes||[]).find(a => normalize(a.nom) === key || normalize(a.nom).includes(key) || key.includes(normalize(a.nom)));
    if (found) return found;
  }
  return null;
}

// ── Wizard modal helpers ──────────────────────────────────────

function wizEspeceModalHtml(s) {
  const infos = s.infos ? Object.entries(s.infos) : [];
  const caps = (s.capacites||[]).filter(c=>c&&c.nom);
  const sousEspeces = s.sous_especes || [];
  return `
  <div class="wiz-modal-content">
    <div class="wiz-modal-portrait">
      <img src="${speciesImagePath(s.espece,'full')}" alt="${escHtml(s.espece)}" onerror="this.closest('.wiz-modal-portrait').style.display='none'">
    </div>
    <h2 class="wiz-modal-title">${escHtml(s.espece)}</h2>
    ${infos.length ? `<div class="wiz-modal-infos">
      ${infos.map(([k,v])=>`<div class="wiz-modal-info-row"><span class="wiz-modal-info-key">${escHtml(k)}</span><span>${escHtml(String(v))}</span></div>`).join('')}
    </div>` : ''}
    ${sousEspeces.length ? `<div class="wiz-modal-section">
      <h3 class="wiz-modal-sh">Sous-espèces</h3>
      ${sousEspeces.map(se=>`<div class="wiz-modal-trait"><strong>${escHtml(se.nom||'')}</strong>${se.description?` — <span class="wiz-modal-trait-desc">${escHtml(String(se.description).replace(/<[^>]*>/g,'').slice(0,160))}…</span>`:''}</div>`).join('')}
    </div>` : ''}
    ${caps.length ? `<div class="wiz-modal-section">
      <h3 class="wiz-modal-sh">Traits raciaux</h3>
      ${caps.map(c=>`
      <details class="wiz-modal-detail">
        <summary>${escHtml(c.nom)}</summary>
        <p>${escHtml(String(c.description||'').replace(/<[^>]*>/g,''))}</p>
      </details>`).join('')}
    </div>` : ''}
    <div class="wiz-modal-footer">
      <button class="wiz-modal-choose-btn" data-choose-espece="${escHtml(s.espece)}">
        ✓ Je choisis cette espèce
      </button>
    </div>
  </div>`;
}

function wizClasseModalHtml(cls, tempSkills, choixEquip) {
  const map = CLASS_SKILLS_MAP[cls.classe_title];
  const count = map?.count || 0;
  const list = map?.list === 'any' ? ALL_SKILLS.map(s=>s.nom) : (map?.list || []);
  const cd = CLASS_DATA[cls.classe_title] || {};
  const saves = (cd.saves||[]).map(k=>ABILITY_NAMES[k]||k).join(', ');
  const feats = (cls.capacites||[]).filter(f=>f.niveau===1).slice(0,4);
  const equip = CLASS_EQUIP[cls.classe_title];
  return `
  <div class="wiz-modal-content">
    ${cls.image?`<div class="wiz-modal-portrait"><img src="${escHtml(cls.image)}" alt="${escHtml(cls.classe_title)}" onerror="this.closest('.wiz-modal-portrait').style.display='none'"></div>`:''}
    <h2 class="wiz-modal-title">${escHtml(cls.classe_title)}</h2>
    <div class="wiz-modal-infos">
      <div class="wiz-modal-info-row"><span class="wiz-modal-info-key">Dé de vie</span><span><strong>d${cd.hitDie||8}</strong></span></div>
      <div class="wiz-modal-info-row"><span class="wiz-modal-info-key">Sauvegardes</span><span>${escHtml(saves)}</span></div>
      ${cd.spellcaster?`<div class="wiz-modal-info-row"><span class="wiz-modal-info-key">Incantation</span><span>${ABILITY_NAMES[cd.spellAbility]||''}</span></div>`:''}
    </div>
    <div class="wiz-modal-section">
      <p class="wiz-modal-desc">${escHtml(truncate(cls.classe_description||'',400))}</p>
    </div>
    ${feats.length ? `<div class="wiz-modal-section">
      <h3 class="wiz-modal-sh">Capacités de niveau 1</h3>
      ${feats.map(f=>`
      <details class="wiz-modal-detail">
        <summary>${escHtml(f.capacite_name)}</summary>
        <div>${f.description_html||''}</div>
      </details>`).join('')}
    </div>` : ''}
    ${count > 0 ? `<div class="wiz-modal-section">
      <h3 class="wiz-modal-sh">Choisissez ${count} compétence${count>1?'s':''}</h3>
      <div class="wiz-skill-chips" id="modal-skill-chips">
        ${list.map(sk=>`
        <div class="wiz-skill-chip${tempSkills.includes(sk)?' checked':''}" data-skill="${escHtml(sk)}" tabindex="0" role="checkbox" aria-checked="${tempSkills.includes(sk)}">
          ${escHtml(sk)}
        </div>`).join('')}
      </div>
      <div class="wiz-skill-count" id="modal-skill-count">${tempSkills.length}/${count} sélectionnée${tempSkills.length>1?'s':''}</div>
    </div>` : ''}
    ${equip ? `<div class="wiz-modal-section">
      <h3 class="wiz-modal-sh">Équipement de départ (classe)</h3>
      <div class="wiz-equip-radios" id="modal-cls-equip-radios">
        ${equip.choix_A ? `<div class="wiz-equip-radio${choixEquip==='A'?' chosen':''}" data-cls-equip="A">
          <div class="wiz-equip-radio-card">
            <span class="wiz-equip-badge">Choix (A)</span>
            <span>${escHtml(equip.choix_A)}</span>
          </div>
        </div>` : ''}
        ${equip.choix_B ? `<div class="wiz-equip-radio${choixEquip==='B'?' chosen':''}" data-cls-equip="B">
          <div class="wiz-equip-radio-card">
            <span class="wiz-equip-badge">Choix (B)</span>
            <span>${escHtml(equip.choix_B)}</span>
          </div>
        </div>` : ''}
      </div>
    </div>` : ''}
    <div class="wiz-modal-footer">
      <button class="wiz-modal-choose-btn" id="modal-choose-classe" data-choose-classe="${escHtml(cls.classe_title)}" ${tempSkills.length < count ? 'disabled' : ''}>
        ✓ Je choisis cette classe
      </button>
    </div>
  </div>`;
}

const OUTILS_NON_ARTISAN = new Set([
  'Accessoires de déguisement','Boîte de jeux','Instrument de musique',
  'Instruments de navigateur',"Matériel d'empoisonneur","Matériel d'herboriste",
  'Matériel de contrefaçon','Outils de voleur'
]);
const INSTRUMENTS = ['Cornemuse','Cor','Flûte','Flûte de pan','Luth','Lyre','Tambour','Viole'];
const JEUX = ["Cartes à jouer","Dés","Jeu d'échecs des dragons","Dominos","Jeu de dés truqués"];

function getOutilChoices(maitrise_outils) {
  if (!maitrise_outils) return [];
  const txt = maitrise_outils.toLowerCase();
  if (txt.includes('artisan')) return (APP.data.outils||[]).filter(o=>!OUTILS_NON_ARTISAN.has(o.nom)).map(o=>o.nom);
  if (txt.includes('instrument')) return INSTRUMENTS;
  if (txt.includes('jeu') || txt.includes('boîte')) return JEUX;
  return [];
}

function wizHistModalHtml(h, choixEquip, choixOutil) {
  const hasEquip = h.equipement?.choix_A || h.equipement?.choix_B;
  const outilChoices = getOutilChoices(h.maitrise_outils);
  const needsOutilChoice = outilChoices.length > 0;
  return `
  <div class="wiz-modal-content">
    <h2 class="wiz-modal-title">${escHtml(h.nom)}</h2>
    <div class="wiz-modal-infos">
      <div class="wiz-modal-info-row"><span class="wiz-modal-info-key">Maîtrises</span><span>${escHtml((h.maitriser_competence||[]).join(', '))}</span></div>
      ${h.maitrise_outils?`<div class="wiz-modal-info-row"><span class="wiz-modal-info-key">Outils</span><span>${escHtml(needsOutilChoice ? (choixOutil||h.maitrise_outils) : h.maitrise_outils)}</span></div>`:''}
      ${h.don?`<div class="wiz-modal-info-row"><span class="wiz-modal-info-key">Don suggéré</span><span>${escHtml(h.don)}</span></div>`:''}
      ${h.valeurs_caracteristique?.length?`<div class="wiz-modal-info-row"><span class="wiz-modal-info-key">Caractéristiques</span><span>${escHtml(h.valeurs_caracteristique.join(', '))}</span></div>`:''}
    </div>
    <div class="wiz-modal-section">
      <p class="wiz-modal-desc">${escHtml(h.description||'')}</p>
    </div>
    ${needsOutilChoice ? `<div class="wiz-modal-section">
      <h3 class="wiz-modal-sh">Maîtrise d'outil</h3>
      <p class="wiz-outil-hint">${escHtml(h.maitrise_outils)}</p>
      <select class="wiz-outil-select" id="hist-outil-select">
        <option value="">— Choisissez un outil —</option>
        ${outilChoices.map(c=>`<option value="${escHtml(c)}"${choixOutil===c?' selected':''}>${escHtml(c)}</option>`).join('')}
      </select>
    </div>` : ''}
    ${h.equipement?.choix_A || h.equipement?.choix_B ? `<div class="wiz-modal-section">
      <h3 class="wiz-modal-sh">Équipement de départ</h3>
      <div class="wiz-equip-radios">
        ${h.equipement.choix_A ? `<label class="wiz-equip-radio${choixEquip==='A'?' chosen':''}">
          <input type="radio" name="hist-equip" value="A" ${choixEquip==='A'?'checked':''}>
          <div class="wiz-equip-radio-card">
            <span class="wiz-equip-badge">Choix (A)</span>
            <span>${escHtml(h.equipement.choix_A)}</span>
          </div>
        </label>` : ''}
        ${h.equipement.choix_B ? `<label class="wiz-equip-radio${choixEquip==='B'?' chosen':''}">
          <input type="radio" name="hist-equip" value="B" ${choixEquip==='B'?'checked':''}>
          <div class="wiz-equip-radio-card">
            <span class="wiz-equip-badge">Choix (B)</span>
            <span>${escHtml(h.equipement.choix_B)}</span>
          </div>
        </label>` : ''}
      </div>
    </div>` : ''}
    <div class="wiz-modal-footer">
      <button class="wiz-modal-choose-btn" data-choose-hist="${escHtml(h.nom)}">
        ✓ Je choisis cet historique
      </button>
    </div>
  </div>`;
}

// Step 1 — Espèce
function wizStepEspece() {
  const species = APP.data.species || [];
  return `
  <div class="wiz-step-espece">
    <p class="wiz-step-intro">Cliquez sur une espèce pour découvrir ses traits et la choisir.</p>
    <div class="wiz-cards-grid" id="wiz-species-grid">
      ${species.map(s=>`
      <button class="wiz-card${WIZ.espece?.espece===s.espece?' selected':''}" data-open-espece="${escHtml(s.espece)}">
        <div class="wiz-card-img" style="background-image:url('${speciesImagePath(s.espece,'thumb')}')"></div>
        <div class="wiz-card-name">${escHtml(s.espece)}</div>
        ${WIZ.espece?.espece===s.espece?'<div class="wiz-card-check">✓</div>':''}
      </button>`).join('')}
    </div>
    ${WIZ.espece ? `<p class="wiz-selection-confirm">✓ <strong>${escHtml(WIZ.espece.espece)}</strong> sélectionnée — cliquez sur une autre pour changer</p>` : ''}
  </div>`;
}

function wireStepEspece(container) {
  container.querySelector('#wiz-species-grid')?.addEventListener('click', e => {
    const card = e.target.closest('[data-open-espece]');
    if (!card) return;
    const name = card.dataset.openEspece;
    const s = (APP.data.species||[]).find(x=>x.espece===name);
    if (!s) return;
    Modal.show(wizEspeceModalHtml(s));
    Modal.body.querySelector('[data-choose-espece]')?.addEventListener('click', () => {
      WIZ.espece = s;
      Modal.hide();
      renderWizard(container);
    });
  });
}

// Step 2 — Classe
function wizStepClasse() {
  const classes = (APP.data.classes||[]).map(g=>g[0]);
  return `
  <div class="wiz-step-classe">
    <p class="wiz-step-intro">Cliquez sur une classe pour en découvrir les capacités et choisir vos compétences.</p>
    <div class="wiz-cards-grid wiz-cards-grid--classes" id="wiz-class-grid">
      ${classes.map(cls=>{
        const cd = CLASS_DATA[cls.classe_title]||{};
        const sel = WIZ.classe?.classe_title===cls.classe_title;
        return `
        <button class="wiz-card wiz-card--cls${sel?' selected':''}" data-open-classe="${escHtml(cls.classe_title)}">
          ${cls.image?`<img class="wiz-card-img-obj" src="${escHtml(cls.image)}" alt="" onerror="this.style.display='none'">` : '<div class="wiz-card-img wiz-card-img--cls"></div>'}
          <div class="wiz-card-name">${escHtml(cls.classe_title)}</div>
          <div class="wiz-card-die">d${cd.hitDie||8}</div>
          ${sel?'<div class="wiz-card-check">✓</div>':''}
        </button>`;
      }).join('')}
    </div>
    ${WIZ.classe ? `<p class="wiz-selection-confirm">✓ <strong>${escHtml(WIZ.classe.classe_title)}</strong> — ${escHtml(WIZ.classeSkills.join(', ')||'aucune compétence sélectionnée')}</p>` : ''}
  </div>`;
}

function wireStepClasse(container) {
  const classes = (APP.data.classes||[]).map(g=>g[0]);
  container.querySelector('#wiz-class-grid')?.addEventListener('click', e => {
    const card = e.target.closest('[data-open-classe]');
    if (!card) return;
    const name = card.dataset.openClasse;
    const cls = classes.find(c=>c.classe_title===name);
    if (!cls) return;

    let tempSkills = WIZ.classe?.classe_title===name ? [...WIZ.classeSkills] : [];
    let tempEquipChoix = WIZ.classe?.classe_title===name ? WIZ.classeEquipChoix : 'A';
    const map = CLASS_SKILLS_MAP[name];
    const count = map?.count || 0;

    Modal.show(wizClasseModalHtml(cls, tempSkills, tempEquipChoix));

    const body = Modal.body;
    const content = body.querySelector('.wiz-modal-content') || body;
    const chooseBtn = body.querySelector('#modal-choose-classe');
    const updateChooseBtn = () => { if (chooseBtn) chooseBtn.disabled = tempSkills.length < count; };

    // Skill chip clicks (direct click, no hidden checkbox)
    content.querySelectorAll('.wiz-skill-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.dataset.skill;
        if (chip.classList.contains('checked')) {
          chip.classList.remove('checked');
          chip.setAttribute('aria-checked', 'false');
          tempSkills = tempSkills.filter(s => s !== val);
        } else {
          if (tempSkills.length >= count) return;
          chip.classList.add('checked');
          chip.setAttribute('aria-checked', 'true');
          tempSkills.push(val);
        }
        const cnt = body.querySelector('#modal-skill-count');
        if (cnt) cnt.textContent = `${tempSkills.length}/${count} sélectionnée${tempSkills.length>1?'s':''}`;
        updateChooseBtn();
      });
      chip.addEventListener('keydown', e2 => { if (e2.key===' '||e2.key==='Enter') { e2.preventDefault(); chip.click(); } });
    });

    // Class equipment choice clicks
    content.querySelectorAll('[data-cls-equip]').forEach(opt => {
      opt.addEventListener('click', () => {
        tempEquipChoix = opt.dataset.clsEquip;
        content.querySelectorAll('[data-cls-equip]').forEach(o => o.classList.toggle('chosen', o.dataset.clsEquip === tempEquipChoix));
      });
    });

    chooseBtn?.addEventListener('click', () => {
      WIZ.classe = cls;
      WIZ.classeSkills = [...tempSkills];
      WIZ.classeEquipChoix = tempEquipChoix;
      Modal.hide();
      renderWizard(container);
    });
  });
}

// Step 3 — Historique
function wizStepHistorique() {
  const hists = APP.data.historiques || [];
  return `
  <div class="wiz-step-historique">
    <p class="wiz-step-intro">Cliquez sur un historique pour le découvrir et choisir votre équipement de départ.</p>
    <div class="wiz-hist-cards" id="wiz-hist-grid">
      ${hists.map(h=>`
      <button class="wiz-hist-card${WIZ.historique?.nom===h.nom?' selected':''}" data-open-hist="${escHtml(h.nom)}">
        <div class="wiz-hist-card-head">
          <span class="wiz-hist-card-name">${escHtml(h.nom)}</span>
          ${WIZ.historique?.nom===h.nom?'<span class="wiz-card-check-inline">✓</span>':''}
        </div>
        <div class="wiz-hist-card-tags">
          ${(h.maitriser_competence||[]).map(c=>`<span class="tag tag-forest">${escHtml(c)}</span>`).join('')}
        </div>
      </button>`).join('')}
    </div>
    ${WIZ.historique ? `<p class="wiz-selection-confirm">✓ <strong>${escHtml(WIZ.historique.nom)}</strong> — équipement (${WIZ.histEquipChoix})${WIZ.histOutilChoix && WIZ.histOutilChoix !== WIZ.historique.maitrise_outils ? ` · outil : ${escHtml(WIZ.histOutilChoix)}` : ''}</p>` : ''}
  </div>`;
}

function wireStepHistorique(container) {
  const hists = APP.data.historiques || [];
  container.querySelector('#wiz-hist-grid')?.addEventListener('click', e => {
    const card = e.target.closest('[data-open-hist]');
    if (!card) return;
    const name = card.dataset.openHist;
    const h = hists.find(x=>x.nom===name);
    if (!h) return;

    let choix = WIZ.historique?.nom===name ? WIZ.histEquipChoix : 'A';
    let outilChoix = WIZ.historique?.nom===name ? WIZ.histOutilChoix : '';
    Modal.show(wizHistModalHtml(h, choix, outilChoix));

    const body = Modal.body;
    const content = body.querySelector('.wiz-modal-content') || body;

    // Wire outil select
    content.querySelector('#hist-outil-select')?.addEventListener('change', e => {
      outilChoix = e.target.value;
    });

    // Wire hist equip radios directly (avoid persistent listener accumulation)
    content.querySelectorAll('.wiz-equip-radio').forEach(el => {
      el.addEventListener('click', () => {
        const inp = el.querySelector('input');
        if (inp) {
          choix = inp.value;
          content.querySelectorAll('.wiz-equip-radio').forEach(o => o.classList.toggle('chosen', o.querySelector('input')?.value === choix));
        }
      });
    });

    content.querySelector('[data-choose-hist]')?.addEventListener('click', () => {
      WIZ.historique = h;
      WIZ.histEquipChoix = choix;
      WIZ.histOutilChoix = outilChoix || h.maitrise_outils || '';
      Modal.hide();
      renderWizard(container);
    });
  });
}

// Step 4 — Stats (Standard Array)
function wizStepStats() {
  const used = Object.values(WIZ.assignments).filter(v=>v!==null);
  const available = WIZ.pool.filter(v=> {
    const usedCount = used.filter(u=>u===v).length;
    const poolCount = WIZ.pool.filter(p=>p===v).length;
    return usedCount < poolCount;
  });

  const speciesBonuses = getSpeciesBonuses();
  const histBonuses = getHistBonuses();

  return `
  <div class="wiz-step-stats">
    <p class="wiz-step-intro">Répartissez ces valeurs entre vos 6 caractéristiques. Les bonus d'espèce et d'historique seront appliqués automatiquement.</p>
    <div class="wiz-pool">
      <div class="wiz-pool-title">Valeurs disponibles (Standard Array)</div>
      <div class="wiz-pool-chips">
        ${WIZ.pool.map((v,i)=>{
          const alreadyUsed = Object.values(WIZ.assignments).filter(a=>a===v).length;
          const poolOccurrences = WIZ.pool.filter(p=>p===v).length;
          const consumed = alreadyUsed >= poolOccurrences;
          return `<span class="wiz-pool-chip${consumed?' used':''}">${v}</span>`;
        }).join('')}
      </div>
    </div>
    <div class="wiz-stats-grid">
      ${ABILITY_KEYS.map(key=>{
        const base = WIZ.assignments[key];
        const sb = speciesBonuses[key]||0;
        const hb = histBonuses[key]||0;
        const total = base!==null ? base+sb+hb : null;
        const mod = total!==null ? statMod(total) : null;
        return `
        <div class="wiz-stat-block" data-stat="${key}">
          <div class="wiz-stat-name" data-help="${key}">${ABILITY_NAMES[key]}</div>
          <select class="wiz-stat-select" data-key="${key}">
            <option value="">—</option>
            ${WIZ.pool.map(v=>`<option value="${v}" ${WIZ.assignments[key]===v?'selected':''}>${v}</option>`).join('')}
          </select>
          <div class="wiz-stat-bonuses">
            ${sb?`<span class="wiz-bonus-tag">Espèce +${sb}</span>`:''}
            ${hb?`<span class="wiz-bonus-tag">Hist. +${hb}</span>`:''}
          </div>
          ${total!==null?`
          <div class="wiz-stat-total">${total}</div>
          <div class="wiz-stat-mod">${fmtMod(mod)}</div>`:`<div class="wiz-stat-empty">—</div>`}
        </div>`;
      }).join('')}
    </div>
    <div class="wiz-stats-preview">
      <div class="wiz-preview-title">Aperçu des jets de sauvegarde</div>
      <div class="wiz-preview-saves">
        ${ABILITY_KEYS.map(key=>{
          const cls = CLASS_DATA[WIZ.classe?.classe_title||''];
          const hasSave = cls?.saves?.includes(key);
          const base = WIZ.assignments[key];
          const sb = speciesBonuses[key]||0;
          const hb = histBonuses[key]||0;
          const total = base!==null ? base+sb+hb : 10;
          const pb = 2;
          const saveVal = statMod(total)+(hasSave?pb:0);
          return `<div class="wiz-save-chip${hasSave?' prof':''}">
            <span>${ABILITY_SHORT[key]}</span>
            <span>${base!==null?fmtMod(saveVal):'—'}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

function getSpeciesBonuses() {
  // D&D 2024: flexible bonuses — for wizard step, all +1 to species' typical stats
  // We'll show a generic +1 hint but let user choose with selects
  return {};
}

function getHistBonuses() {
  if (!WIZ.historique) return {};
  // historique gives +2 to one and +1 to another from valeurs_caracteristique
  // map French names to keys
  return {};
}

const STAT_FR_KEY = {'Force':'FOR','Dextérité':'DEX','Constitution':'CON','Intelligence':'INT','Sagesse':'SAG','Charisme':'CHA'};

function wireStepStats(container) {
  container.querySelectorAll('.wiz-stat-select').forEach(sel => {
    sel.addEventListener('change', e => {
      const key = sel.dataset.key;
      const val = sel.value ? parseInt(sel.value) : null;
      WIZ.assignments[key] = val;
      // Re-render just the stats section
      const body = container.querySelector('#wiz-body');
      if (body) {
        body.innerHTML = wizStepStats();
        wireStepStats(container);
        wireHelp(container);
      }
      const nxt = container.querySelector('#wiz-next');
      if (nxt) nxt.disabled = !canAdvance();
    });
  });
  wireHelp(container);
}

// Step 5 — Informations
function wizStepInfo() {
  const langOptions = LANGUAGES_LIST.map(l => wizStepInfoLangChipHtml(l)).join('');
  return `
  <div class="wiz-step-info">
    <p class="wiz-step-intro">Donnez vie à votre aventurier avec son nom, son apparence et son histoire personnelle.</p>
    <div class="wiz-info-form">
      <div class="wiz-field">
        <label class="wiz-label">Nom du personnage <span class="wiz-required">*</span></label>
        <input type="text" class="wiz-input" id="wiz-nom" value="${escHtml(WIZ.nom)}" placeholder="Ex : Aiden Forgebrise">
      </div>
      <div class="wiz-field-row">
        <div class="wiz-field">
          <label class="wiz-label">Âge</label>
          <input type="text" class="wiz-input" id="wiz-age" value="${escHtml(WIZ.age)}" placeholder="Ex : 24 ans">
        </div>
      </div>
      <div class="wiz-field">
        <label class="wiz-label">Description physique</label>
        <textarea class="wiz-textarea" id="wiz-description" placeholder="Apparence, traits distinctifs…">${escHtml(WIZ.description)}</textarea>
      </div>
      <div class="wiz-field">
        <label class="wiz-label">Histoire personnelle</label>
        <textarea class="wiz-textarea" id="wiz-histoire" placeholder="Votre passé, vos motivations, ce qui vous a poussé à l'aventure…">${escHtml(WIZ.histoire)}</textarea>
      </div>
      <div class="wiz-field">
        <label class="wiz-label">Langues</label>
        <div class="wiz-lang-known">
          <span class="wiz-lang-fixed">Commun (automatique)</span>
          ${WIZ.historique ? `<span class="wiz-lang-note">+ bonus de votre historique selon la classe</span>` : ''}
        </div>
        <div class="wiz-lang-title">Choisissez 2 langues supplémentaires :</div>
        <div class="wiz-skill-chips">${langOptions}</div>
        <div class="wiz-lang-count" id="lang-count">${WIZ.extraLang.length}/2 sélectionnées</div>
      </div>
    </div>
  </div>`;
}

function wizStepInfoLangChipHtml(l) {
  const checked = WIZ.extraLang.includes(l);
  return `<div class="wiz-lang-chip${checked?' checked':''}" data-lang="${escHtml(l)}" tabindex="0" role="checkbox" aria-checked="${checked}">${escHtml(l)}</div>`;
}

function wireStepInfo(container) {
  const nomEl = container.querySelector('#wiz-nom');
  const ageEl = container.querySelector('#wiz-age');
  const descEl = container.querySelector('#wiz-description');
  const histEl = container.querySelector('#wiz-histoire');
  const nxt = container.querySelector('#wiz-next');

  const sync = () => {
    WIZ.nom = nomEl?.value || '';
    WIZ.age = ageEl?.value || '';
    WIZ.description = descEl?.value || '';
    WIZ.histoire = histEl?.value || '';
    if (nxt) nxt.disabled = !canAdvance();
  };
  [nomEl,ageEl,descEl,histEl].forEach(el=>el?.addEventListener('input',sync));

  // Wire lang chips directly on the fresh elements (no listener accumulation)
  const stepEl = container.querySelector('.wiz-step-info') || container;
  stepEl.querySelectorAll('.wiz-lang-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.dataset.lang;
      if (chip.classList.contains('checked')) {
        chip.classList.remove('checked');
        chip.setAttribute('aria-checked', 'false');
        WIZ.extraLang = WIZ.extraLang.filter(l => l !== val);
      } else {
        if (WIZ.extraLang.length >= 2) return;
        chip.classList.add('checked');
        chip.setAttribute('aria-checked', 'true');
        WIZ.extraLang.push(val);
      }
      const cnt = stepEl.querySelector('#lang-count');
      if (cnt) cnt.textContent = `${WIZ.extraLang.length}/2 sélectionnées`;
    });
    chip.addEventListener('keydown', e => { if (e.key===' '||e.key==='Enter') { e.preventDefault(); chip.click(); } });
  });
}

// Step 6 — Résumé
function wizStepResume() {
  const cls = CLASS_DATA[WIZ.classe?.classe_title||''] || {};
  const speciesBonuses = getSpeciesBonuses();
  const histBonuses = getHistBonuses();
  const stats = ABILITY_KEYS.map(k=>{
    const base = WIZ.assignments[k]||10;
    const total = base+(speciesBonuses[k]||0)+(histBonuses[k]||0);
    return `<div class="wiz-resume-stat"><span>${ABILITY_SHORT[k]}</span><strong>${total}</strong><span>${fmtMod(statMod(total))}</span></div>`;
  }).join('');
  return `
  <div class="wiz-step-resume">
    <div class="wiz-resume-card">
      <div class="wiz-resume-portrait">
        ${WIZ.espece ? `<img src="${speciesImagePath(WIZ.espece.espece,'full')}" alt="${escHtml(WIZ.espece.espece)}" onerror="this.closest('.wiz-resume-portrait').style.display='none'">` : ''}
      </div>
      <div class="wiz-resume-info">
        <h2 class="wiz-resume-name">${WIZ.nom?escHtml(WIZ.nom):'<em>Sans nom</em>'}</h2>
        <div class="wiz-resume-line">${WIZ.classe?escHtml(WIZ.classe.classe_title):''} · ${WIZ.espece?escHtml(WIZ.espece.espece):''} · ${WIZ.historique?escHtml(WIZ.historique.nom):''}</div>
        ${WIZ.age?`<div class="wiz-resume-line">${escHtml(WIZ.age)}</div>`:''}
        <div class="wiz-resume-stats">${stats}</div>
        <div class="wiz-resume-badges">
          ${WIZ.classeSkills.map(s=>`<span class="tag tag-forest">${escHtml(s)}</span>`).join('')}
          ${(WIZ.historique?.maitriser_competence||[]).map(s=>`<span class="tag tag-bronze">${escHtml(s)}</span>`).join('')}
        </div>
        <div class="wiz-resume-langs">
          🌐 Langues : ${['Commun',...WIZ.extraLang].join(', ')}
        </div>
      </div>
    </div>
    <div class="wiz-resume-note">Vous pourrez modifier tous ces éléments ultérieurement depuis votre fiche.</div>
  </div>`;
}

function finalizeCharacter(container) {
  const speciesBonuses = getSpeciesBonuses();
  const histBonuses = getHistBonuses();
  const stats = {};
  ABILITY_KEYS.forEach(k=>{
    const base = WIZ.assignments[k]||10;
    stats[k] = base+(speciesBonuses[k]||0)+(histBonuses[k]||0);
  });
  const cls = CLASS_DATA[WIZ.classe?.classe_title||''] || {hitDie:8};
  const conMod = statMod(stats.CON||10);
  const hpMax = cls.hitDie + conMod;
  const allCompetences = [...WIZ.classeSkills, ...(WIZ.historique?.maitriser_competence||[])];

  const starterEquip = buildStarterEquipment();
  const char = {
    version: 1,
    nom: WIZ.nom.trim()||'Aventurier',
    age: WIZ.age,
    description: WIZ.description,
    histoire: WIZ.histoire,
    espece: WIZ.espece?.espece||'',
    classe: WIZ.classe?.classe_title||'',
    historique: WIZ.historique?.nom||'',
    niveau: 1,
    experience: 0,
    stats,
    hp: { max: hpMax, current: hpMax, temp: 0 },
    inspiration: 0,
    concentration: null,
    competences: allCompetences,
    expertise: [],
    outils_maitrise: WIZ.histOutilChoix || WIZ.historique?.maitrise_outils || '',
    langues: ['Commun',...WIZ.extraLang],
    equipement: starterEquip.items,
    argent: { po: starterEquip.po, pa: 0, pc: 0, pp: 0 },
    sorts_mineurs: [],
    sorts_connus: [],
    sorts_prepares: [],
    emplacements_uses: {},
    notes: '',
    homebrew_capacites: [],
    homebrew_sorts: [],
    homebrew_items: [],
    created: new Date().toISOString(),
  };
  saveChar(char);
  WIZ = null;
  renderPersonnage(container);
}

function parseEquipmentString(raw, items, goldAcc, baseTime) {
  if (!raw) return;
  const PO_RE = /^(\d+(?:[.,]\d+)?)\s*po$/i;
  raw.split(',').forEach((part, i) => {
    const trimmed = part.trim();
    const poMatch = trimmed.match(PO_RE);
    if (poMatch) { goldAcc.po += parseInt(poMatch[1]) || 0; return; }

    const leadMatch = trimmed.match(/^(\d+)\s+/);
    const quantite = leadMatch ? parseInt(leadMatch[1]) : 1;
    const clean = trimmed
      .replace(/^\d+\s*x?\s*/,'')
      .replace(/\s*\(.*?\)\s*$/, '')
      .trim();
    if (clean.length > 1) {
      const nom = capitalize(clean);
      const weaponData = getWeaponData(clean);
      const uid = (baseTime + i).toString(36);
      items.push({
        id: uid,
        nom,
        quantite,
        equipe: false,
        type: weaponData ? 'arme' : 'misc',
        degats: weaponData?.degats || null,
      });
    }
  });
}

function buildStarterEquipment() {
  const items = [];
  const goldAcc = { po: 0 };
  const base = Date.now();

  // Historique equipment
  const hist = WIZ.historique;
  const histChoix = WIZ.histEquipChoix || 'A';
  const histRaw = hist?.equipement?.[`choix_${histChoix}`] || hist?.equipement?.choix_A || '';
  parseEquipmentString(histRaw, items, goldAcc, base);

  // Class equipment
  const classEquip = CLASS_EQUIP[WIZ.classe?.classe_title];
  const clsChoix = WIZ.classeEquipChoix || 'A';
  const clsRaw = classEquip?.[`choix_${clsChoix}`] || '';
  parseEquipmentString(clsRaw, items, goldAcc, base + 1000);

  return { items, po: goldAcc.po };
}

// ============================================================
// CUSTOM DIALOGS (no native prompt/confirm/alert)
// ============================================================

function showConfirmModal(msg, onYes, btnLabel='Confirmer') {
  Modal.show(`
  <div class="ps-dialog">
    <div class="ps-dialog-icon">⚠</div>
    <p class="ps-dialog-msg">${escHtml(msg)}</p>
    <div class="ps-dialog-btns">
      <button class="ps-dialog-btn ps-dialog-btn--cancel" id="dlg-cancel">Annuler</button>
      <button class="ps-dialog-btn ps-dialog-btn--danger" id="dlg-confirm">${escHtml(btnLabel)}</button>
    </div>
  </div>`);
  Modal.body.querySelector('#dlg-confirm')?.addEventListener('click', () => { Modal.hide(); onYes?.(); });
  Modal.body.querySelector('#dlg-cancel')?.addEventListener('click', () => Modal.hide());
}

function showPromptModal(label, defVal, onConfirm, opts) {
  const title = opts?.title || '';
  const textarea = opts?.textarea || false;
  const inputType = opts?.number ? 'number' : 'text';
  const min = opts?.min !== undefined ? `min="${opts.min}"` : '';
  const max = opts?.max !== undefined ? `max="${opts.max}"` : '';
  Modal.show(`
  <div class="ps-dialog">
    ${title ? `<h3 class="ps-dialog-title">${escHtml(title)}</h3>` : ''}
    <label class="ps-dialog-label">${escHtml(label)}</label>
    ${textarea
      ? `<textarea class="ps-dialog-input ps-dialog-textarea" id="dlg-input">${escHtml(String(defVal||''))}</textarea>`
      : `<input type="${inputType}" class="ps-dialog-input" id="dlg-input" value="${escHtml(String(defVal||''))}" ${min} ${max}>`}
    <div class="ps-dialog-btns">
      <button class="ps-dialog-btn ps-dialog-btn--cancel" id="dlg-cancel">Annuler</button>
      <button class="ps-dialog-btn ps-dialog-btn--ok" id="dlg-ok">Valider</button>
    </div>
  </div>`);
  const inp = Modal.body.querySelector('#dlg-input');
  inp?.focus();
  if (!textarea) inp?.select();
  const submit = () => {
    const v = opts?.number ? parseInt(inp?.value)||0 : (inp?.value ?? '');
    Modal.hide();
    onConfirm?.(opts?.number ? v : (v.trim() || null));
  };
  Modal.body.querySelector('#dlg-ok')?.addEventListener('click', submit);
  Modal.body.querySelector('#dlg-cancel')?.addEventListener('click', () => { Modal.hide(); onConfirm?.(null); });
  inp?.addEventListener('keydown', e => { if (e.key==='Enter' && !textarea) submit(); if (e.key==='Escape') { Modal.hide(); onConfirm?.(null); } });
}

// ============================================================
// HP — INLINE UPDATE (no full re-render)
// ============================================================

function updateHPInPlace(container, char, delta, type) {
  const curEl  = container.querySelector('#ps-hp-cur');
  const bar    = container.querySelector('#ps-hp-bar');
  const tempEl = container.querySelector('#ps-hp-temp-display');
  const widget = container.querySelector('.ps-hp-widget');

  if (curEl) curEl.textContent = char.hp.current;

  if (bar) {
    const pct   = Math.max(0, Math.min(100, (char.hp.current / char.hp.max) * 100));
    const color = char.hp.current <= 0 ? '#7a1a1a'
                : char.hp.current < char.hp.max * 0.3 ? '#c0602a'
                : '#2a7a3a';
    bar.style.width = pct + '%';
    bar.style.background = color;
  }

  if (tempEl) {
    tempEl.hidden = !char.hp.temp;
    if (char.hp.temp) tempEl.textContent = `+${char.hp.temp} PV temporaires`;
  }

  if (widget && delta > 0) {
    const flashCls = type === 'dmg' ? 'ps-flash-dmg' : 'ps-flash-heal';
    widget.classList.remove('ps-flash-dmg', 'ps-flash-heal');
    void widget.offsetWidth; // reflow
    widget.classList.add(flashCls);
    setTimeout(() => widget.classList.remove(flashCls), 700);

    const floater = document.createElement('div');
    floater.className = `ps-hp-floater ps-hp-floater--${type}`;
    floater.textContent = type === 'dmg' ? `-${delta}` : `+${delta}`;
    widget.appendChild(floater);
    requestAnimationFrame(() => floater.classList.add('ps-hp-floater--fly'));
    setTimeout(() => floater.remove(), 800);
  }
}

// ============================================================
// PERSONNAGE — CHARACTER SHEET
// ============================================================

function psHpWidget(char) {
  const pct = Math.max(0, Math.min(100, (char.hp.current / char.hp.max) * 100));
  const color = char.hp.current <= 0 ? '#7a1a1a' : char.hp.current < char.hp.max * 0.3 ? '#c0602a' : '#2a7a3a';
  return `
  <div class="ps-widget-title" data-help="PV">❤ Points de Vie</div>
  <div class="ps-hp-display">
    <span class="ps-hp-current" id="ps-hp-cur" tabindex="0">${char.hp.current}</span>
    <span class="ps-hp-sep">/</span>
    <span class="ps-hp-max" id="ps-hp-max">${char.hp.max}</span>
    <span class="ps-hp-state">${char.hp.current<=0?'<span class="ps-hp-ko">K.O.</span>':''}</span>
  </div>
  <div class="ps-hp-bar-wrap">
    <div class="ps-hp-bar" id="ps-hp-bar" style="width:${pct}%;background:${color}"></div>
  </div>
  <div class="ps-hp-temp-display" id="ps-hp-temp-display" ${char.hp.temp?'':'hidden'}>+${char.hp.temp||0} PV temporaires</div>
  <div class="ps-hp-controls">
    <div class="ps-hp-ctrl-group">
      <input type="number" class="ps-hp-input" id="ps-dmg-val" placeholder="0" min="0">
      <button class="ps-hp-ctrl-btn ps-hp-dmg" id="ps-apply-dmg">🗡 Dégâts</button>
    </div>
    <div class="ps-hp-ctrl-group">
      <input type="number" class="ps-hp-input" id="ps-heal-val" placeholder="0" min="0">
      <button class="ps-hp-ctrl-btn ps-hp-heal" id="ps-apply-heal">💚 Soins</button>
    </div>
    <div class="ps-hp-ctrl-group">
      <input type="number" class="ps-hp-input" id="ps-temp-val" placeholder="0" min="0">
      <button class="ps-hp-ctrl-btn ps-hp-temp" id="ps-apply-temp">🛡 PV temp</button>
    </div>
  </div>`;
}

function psAbilitiesWidget(char, clsData, d) {
  return `
  <div class="ps-widget-title">Caractéristiques</div>
  <div class="ps-abilities-grid">
    ${ABILITY_KEYS.map(key => {
      const score = char.stats[key] || 10;
      const mod = statMod(score);
      const hasSave = (clsData.saves || []).includes(key);
      const saveVal = mod + (hasSave ? d.pb : 0);
      const saveTitle = hasSave
        ? `Sauvegarde maîtrisée : Mod.${key} (${fmtMod(mod)}) + Maîtrise (${fmtMod(d.pb)}) = ${fmtMod(saveVal)}`
        : `Sauvegarde : Mod.${key} (${fmtMod(mod)}) = ${fmtMod(saveVal)}`;
      const modTitle = `Modificateur = ⌊(${score} − 10) / 2⌋ = ${fmtMod(mod)}`;
      return `
      <div class="ps-ability-block" data-key="${key}">
        <div class="ps-ab-name" data-help="${key}" tabindex="0">${ABILITY_NAMES[key]}</div>
        <div class="ps-ab-mod" title="${escHtml(modTitle)}">${fmtMod(mod)}</div>
        <div class="ps-ab-score" data-editable-stat="${key}" tabindex="0" title="Score ${ABILITY_NAMES[key]} — cliquer pour modifier">${score}</div>
        <div class="ps-ab-save${hasSave ? ' proficient' : ''}" title="${escHtml(saveTitle)}">
          <span class="ps-save-dot"></span>
          <span>${fmtMod(saveVal)}</span>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function psSkillsWidget(char, d) {
  return `
  <div class="ps-widget-title">Compétences</div>
  <div class="ps-skills-list" id="ps-skills-list">
    ${ALL_SKILLS.map(sk => {
      const base = statMod(char.stats[sk.stat] || 10);
      const hasMait = (char.competences || []).includes(sk.nom);
      const hasExp  = (char.expertise   || []).includes(sk.nom);
      const mult    = hasExp ? 2 : hasMait ? 1 : 0;
      const bonus   = base + mult * d.pb;
      return `
      <div class="ps-skill-row${hasMait ? ' ps-has-mait' : ''}" data-skill="${escHtml(sk.nom)}" title="${escHtml(sk.nom)} : Mod.${ABILITY_SHORT[sk.stat]} (${fmtMod(base)})${mult>0?` + Maîtrise×${mult} (${fmtMod(mult*d.pb)})`:''} = ${fmtMod(bonus)}">
        <span class="ps-skill-dot${hasExp ? ' expert' : hasMait ? ' mait' : ''}"></span>
        <span class="ps-skill-ab">${ABILITY_SHORT[sk.stat]}</span>
        <span class="ps-skill-name">${escHtml(sk.nom)}</span>
        <span class="ps-skill-val">${fmtMod(bonus)}</span>
      </div>`;
    }).join('')}
  </div>`;
}

function renderPersonnage(container) {
  const char = getChar();
  if (!char) {
    if (!WIZ) wizReset();
    renderWizard(container);
    return;
  }

  const d = computeCharDerived(char);
  const clsData = CLASS_DATA[char.classe] || {};
  const isSpellcaster = !!clsData.spellcaster;

  container.innerHTML = `
  <div class="page perso-page">
    <div class="ps-wrap">

      <!-- LIGNE 1 : HEADER — inchangé -->
      <header class="ps-header">
        <div class="ps-portrait-wrap">
          <img class="ps-portrait-img" src="${speciesImagePath(char.espece,'thumb')}" alt="${escHtml(char.espece)}" onerror="this.src='';this.style.display='none'">
        </div>
        <div class="ps-identity">
          <h1 class="ps-char-name" data-editable="nom" tabindex="0">${escHtml(char.nom)}</h1>
          <div class="ps-char-sub">${escHtml(char.classe)} · ${escHtml(char.espece)} · ${escHtml(char.historique)}</div>
          <div class="ps-level-row">
            <span class="ps-level-badge">Niveau ${char.niveau}</span>
            <div class="ps-xp-bar"><div class="ps-xp-fill" style="width:${Math.min(100,(char.experience||0)/300*100)}%"></div></div>
            <span class="ps-xp-label">${char.experience||0} XP</span>
          </div>
        </div>
        <div class="ps-quick-stats">
          <div class="ps-qs-item" data-help="CA" tabindex="0"><span class="ps-qs-val">${d.ca}</span><span class="ps-qs-label">CA</span></div>
          <div class="ps-qs-item" data-help="Initiative" tabindex="0"><span class="ps-qs-val">${fmtMod(statMod(char.stats.DEX||10))}</span><span class="ps-qs-label">Initiative</span></div>
          <div class="ps-qs-item" data-help="Vitesse" tabindex="0"><span class="ps-qs-val">${d.speed}m</span><span class="ps-qs-label">Vitesse</span></div>
          <div class="ps-qs-item" data-help="Maîtrise" tabindex="0"><span class="ps-qs-val">${fmtMod(d.pb)}</span><span class="ps-qs-label">Maîtrise</span></div>
          ${isSpellcaster?`
          <div class="ps-qs-item" data-help="DD Sorts" tabindex="0" title="DD = 8 + Maîtrise (${fmtMod(d.pb)}) + Mod.Carac = ${d.spellDC}"><span class="ps-qs-val">${d.spellDC}</span><span class="ps-qs-label">DD Sorts</span></div>
          <div class="ps-qs-item" data-help="Att.Sort" tabindex="0" title="Att. Sort = Maîtrise (${fmtMod(d.pb)}) + Mod.Carac = ${fmtMod(d.spellAtk)}"><span class="ps-qs-val">${fmtMod(d.spellAtk)}</span><span class="ps-qs-label">Att.Sort</span></div>`:''}
          <div class="ps-qs-item" data-help="Perc.passive" tabindex="0"><span class="ps-qs-val">${d.percPassive}</span><span class="ps-qs-label">Perc.pas.</span></div>
        </div>
        <div class="ps-header-actions">
          <button class="ps-action-btn" id="ps-rest-long">🌙 Repos long</button>
          <button class="ps-action-btn" id="ps-rest-short">☀ Repos court</button>
          <div class="ps-inspiration-row">
            <span class="ps-insp-label">Inspiration</span>
            <div class="ps-insp-pip${char.inspiration?' active':''}" id="ps-inspiration" tabindex="0">${char.inspiration?'★':'☆'}</div>
          </div>
          <button class="ps-danger-btn" id="ps-delete-char">✕ Nouveau perso</button>
        </div>
      </header>

      <!-- LIGNE 2 : PV (gauche) + CARACTÉRISTIQUES (droite) -->
      <div class="ps-row2">
        <div class="ps-widget ps-hp-widget" id="ps-hp-block">
          ${psHpWidget(char)}
        </div>
        <div class="ps-widget ps-abilities-widget">
          ${psAbilitiesWidget(char, clsData, d)}
        </div>
      </div>

      <!-- LIGNE 3 : COMPÉTENCES (gauche) + ONGLETS (droite) -->
      <div class="ps-row3">
        <div class="ps-widget ps-skills-col">
          ${psSkillsWidget(char, d)}
        </div>
        <main class="ps-main">
          <div class="ps-tabs" role="tablist">
            <button class="ps-tab active" data-tab="actions" role="tab">⚔ Actions</button>
            <button class="ps-tab" data-tab="classe" role="tab">🌟 Traits</button>
            ${isSpellcaster?`<button class="ps-tab" data-tab="sorts" role="tab">🪄 Sorts</button>`:''}
            <button class="ps-tab" data-tab="inventaire" role="tab">🎒 Inventaire</button>
            <button class="ps-tab" data-tab="or" role="tab">💰 Or</button>
            <button class="ps-tab" data-tab="profil" role="tab">📋 Profil</button>
            <button class="ps-tab" data-tab="notes" role="tab">📝 Notes</button>
          </div>
          <div class="ps-tab-panels" id="ps-tab-panels">
            ${psTabActions(char, d)}
          </div>
        </main>
      </div>

    </div><!-- /ps-wrap -->
  </div>`;

  wireSheet(container, char, d);
  wireHelp(container);
}

const STD_ACTIONS = [
  {icon:'⚔',label:'Attaque',sub:'Action',desc:'Attaquez avec une arme ou à mains nues.'},
  {icon:'🏃',label:'Foncer',sub:'Action',desc:'Doublez votre vitesse de déplacement ce tour.'},
  {icon:'🛡',label:'Esquiver',sub:'Action',desc:'Les attaques contre vous ont Désavantage jusqu\'à votre prochain tour.'},
  {icon:'💨',label:'Se désengager',sub:'Action',desc:'Votre déplacement ne provoque pas d\'attaques d\'opportunité ce tour.'},
  {icon:'🤝',label:'Aider',sub:'Action',desc:'Une créature alliée gagne Avantage à son prochain jet d\'attaque ou compétence.'},
  {icon:'👁',label:'Chercher',sub:'Action',desc:'Effectuez un test de Perception ou Investigation pour trouver quelque chose.'},
  {icon:'⏸',label:'Se tenir prêt',sub:'Action',desc:'Préparez une action à déclencher sur une condition précise (Réaction).'},
  {icon:'🎒',label:'Utiliser un objet',sub:'Action',desc:'Utilisez un objet magique ou activez un item de l\'inventaire.'},
  {icon:'🫥',label:'Se cacher',sub:'Action Bonus',desc:'Effectuez un test de Discrétion pour devenir Invisible à vos ennemis.'},
];

function psTabActions(char, d) {
  const cls = CLASS_DATA[char.classe]||{};
  const isSpellcaster = !!cls.spellcaster;
  const pb = d.pb;
  const forMod = statMod(char.stats.FOR||10);
  const dexMod = statMod(char.stats.DEX||10);

  // Unarmed strike
  const unarmedBonus = forMod + pb;
  const unarmedAtk = `<span class="ps-dice">1d4</span> + ${forMod} contondants`;
  const unarmedTitle = `Bonus d'attaque : Mod.FOR (${fmtMod(forMod)}) + Maîtrise (${fmtMod(pb)}) = ${fmtMod(unarmedBonus)}`;

  // Equipped weapons with JSON lookup
  const equipped = (char.equipement||[]).filter(i=>i.equipe&&i.type==='arme');
  const weaponRows = equipped.map(w=>{
    const data = getWeaponData(w.nom) || { degats: w.degats||'1d6', proprietes:[] };
    const isFinesse = (data.proprietes||[]).some(p=>p.toLowerCase().includes('finesse'));
    const isRanged = (data.proprietes||[]).some(p=>p.toLowerCase().includes('portée')||p.toLowerCase().includes('munitions'));
    const statMd = isFinesse ? Math.max(forMod,dexMod) : isRanged ? dexMod : forMod;
    const atkBonus = statMd + pb;
    const degats = data.degats || w.degats || '1d6';
    const propTags = (data.proprietes||[]).slice(0,3).map(p=>`<span class="ps-prop-tag">${escHtml(p.split('(')[0].trim())}</span>`).join('');
    const statName = isFinesse ? 'FOR/DEX (meilleur)' : isRanged ? 'DEX' : 'FOR';
    const atkTitle = `Bonus d'attaque : Mod.${statName} (${fmtMod(statMd)}) + Maîtrise (${fmtMod(pb)}) = ${fmtMod(atkBonus)}`;
    return `
    <div class="ps-attack-card">
      <div class="ps-atk-icon">🗡</div>
      <div class="ps-atk-info">
        <div class="ps-atk-name">${escHtml(capitalize(w.nom))}</div>
        <div class="ps-atk-dice" title="${escHtml(atkTitle)}">${fmtMod(atkBonus)} att · <span class="ps-dice">${escHtml(degats)}</span>${statMd!==0?` ${fmtMod(statMd)}`:''}${data.botte?` · <em>${escHtml(data.botte)}</em>`:''}</div>
        ${propTags?`<div class="ps-atk-props">${propTags}</div>`:''}
      </div>
    </div>`;
  });

  // Available class features (usable in combat / at-will)
  const clsFeats = getAllClassFeats(char).filter(f=>f.niveau<=char.niveau);
  const combatFeats = clsFeats.filter(f=>{
    const n = f.capacite_name.toLowerCase();
    return n.includes('rage')||n.includes('souffle')||n.includes('second souffle')||
           n.includes('déferlement')||n.includes('fureur')||n.includes('inspiration')||
           n.includes('forme sauvage')||n.includes('ki')||n.includes('attaque')||
           n.includes('action bonus')||n.includes('volée');
  }).slice(0,5);

  return `
  <div class="ps-actions-tab">

    <h3 class="ps-tab-section-title">⚔ Attaquer</h3>
    <div class="ps-attack-card">
      <div class="ps-atk-icon">👊</div>
      <div class="ps-atk-info">
        <div class="ps-atk-name">Attaque à mains nues</div>
        <div class="ps-atk-dice" title="${escHtml(unarmedTitle)}">${fmtMod(unarmedBonus)} att · ${unarmedAtk}</div>
      </div>
    </div>
    ${weaponRows.length ? weaponRows.join('') : '<p class="ps-empty">Équipez des armes depuis l\'onglet <em>Inventaire</em> pour les voir ici.</p>'}
    ${isSpellcaster ? `
    <div class="ps-attack-card ps-attack-card--spell">
      <div class="ps-atk-icon">🪄</div>
      <div class="ps-atk-info">
        <div class="ps-atk-name">Attaque de sort</div>
        <div class="ps-atk-dice">${fmtMod(d.spellAtk||0)} · DD ${d.spellDC||8}</div>
      </div>
    </div>` : ''}

    ${combatFeats.length ? `
    <h3 class="ps-tab-section-title">🌟 Capacités utilisables</h3>
    ${combatFeats.map(f=>`
    <div class="ps-feat-action-card" data-feat-name="${escHtml(f.capacite_name)}">
      <div class="ps-fa-icon">✦</div>
      <div class="ps-fa-info">
        <div class="ps-fa-name">${escHtml(f.capacite_name)}</div>
        <div class="ps-fa-detail">${escHtml((f.description_html||'').replace(/<[^>]*>/g,'').slice(0,90))}…</div>
      </div>
    </div>`).join('')}` : ''}

    <h3 class="ps-tab-section-title">Actions de combat</h3>
    <div class="ps-std-grid">
      ${STD_ACTIONS.map(a=>`
      <div class="ps-std-card" title="${escHtml(a.desc)}">
        <span class="ps-std-icon">${a.icon}</span>
        <div class="ps-std-body">
          <span class="ps-std-label">${escHtml(a.label)}</span>
          <span class="ps-std-sub">${escHtml(a.sub)}</span>
        </div>
      </div>`).join('')}
      ${isSpellcaster?`<div class="ps-std-card"><span class="ps-std-icon">🪄</span><div class="ps-std-body"><span class="ps-std-label">Lancer un sort</span><span class="ps-std-sub">Action</span></div></div>`:''}
    </div>

  </div>`;
}

function psTabClasse(char) {
  const clsGroup = (APP.data.classes||[]).find(g=>g[0].classe_title===char.classe);
  const clsObj = clsGroup?.[0];
  const species = (APP.data.species||[]).find(s=>s.espece===char.espece);
  const hist = (APP.data.historiques||[]).find(h=>h.nom===char.historique);
  const feats = getAllClassFeats(char).filter(f=>f.niveau<=char.niveau);

  const speciesTraits = species?.capacites?.filter(c=>c&&typeof c==='object'&&c.nom) || [];

  return `
  <div class="ps-classe-tab">
    <h3 class="ps-tab-section-title">Capacités de classe — ${escHtml(char.classe)}</h3>
    ${feats.length?feats.map(f=>`
    <details class="ps-feat-item">
      <summary class="ps-feat-summary">
        <span class="ps-feat-name">${escHtml(f.capacite_name)}</span>
        <span class="ps-feat-level">Niv. ${f.niveau}</span>
      </summary>
      <div class="ps-feat-body">${enrichTraitHtml(f.description_html||'')}</div>
    </details>`).join(''):'<p class="ps-empty">Aucune capacité de classe trouvée.</p>'}

    <h3 class="ps-tab-section-title">Traits raciaux — ${escHtml(char.espece)}</h3>
    ${speciesTraits.length?speciesTraits.map(t=>`
    <details class="ps-feat-item">
      <summary class="ps-feat-summary"><span class="ps-feat-name">${escHtml(t.nom)}</span></summary>
      <div class="ps-feat-body">${typeof t.description==='string'?escHtml(t.description):''}</div>
    </details>`).join(''):'<p class="ps-empty">—</p>'}

    ${hist?`
    <h3 class="ps-tab-section-title">Historique — ${escHtml(hist.nom)}</h3>
    <div class="ps-hist-block">
      <p class="ps-hist-desc">${escHtml(hist.description||'')}</p>
      <div class="ps-hist-tags">
        ${(hist.maitriser_competence||[]).map(c=>`<span class="tag tag-forest">${escHtml(c)}</span>`).join('')}
        ${hist.maitrise_outils?`<span class="tag tag-bronze">${escHtml(char.outils_maitrise || hist.maitrise_outils)}</span>`:''}
        ${hist.don?`<span class="tag tag-gold">Don : ${escHtml(hist.don)}</span>`:''}
      </div>
    </div>` : ''}

    ${(char.homebrew_capacites||[]).length?`
    <h3 class="ps-tab-section-title">Capacités personnalisées (Homebrew)</h3>
    ${char.homebrew_capacites.map((cap,i)=>`
    <details class="ps-feat-item ps-feat--homebrew">
      <summary class="ps-feat-summary">
        <span class="ps-feat-name">${escHtml(cap.nom)}</span>
        <span class="ps-feat-badge">Homebrew</span>
        <button class="ps-feat-del" data-del-cap="${i}" title="Supprimer">✕</button>
      </summary>
      <div class="ps-feat-body">${escHtml(cap.description)}</div>
    </details>`).join('')}` : ''}

    <button class="ps-add-btn" id="ps-add-cap">+ Ajouter une capacité Homebrew</button>
  </div>`;
}

function sortCardHtml(nom, type, idx) {
  const sort = (APP.data.sorts||[]).find(s => {
    const n = s.name || '';
    const mainN = n.includes('|') ? n.split('|')[0].trim() : n;
    return mainN === nom || n === nom;
  });
  const ecole = sort?.ecole || '';
  const niveau = sort?.niveau != null ? String(sort.niveau) : '';
  const dot = SCHOOL_DOTS[ecole] || '#888';
  const lvlLabel = niveau === '0' ? 'Mineur' : niveau ? `Niv. ${niveau}` : '';
  const conc = sort?.concentration ? '<span class="ps-sc-conc" title="Concentration">C</span>' : '';
  const delBtn = idx !== undefined
    ? `<button class="ps-sort-del ps-sc-del" data-sort-type="${escHtml(type)}" data-sort-idx="${idx}" title="Retirer">✕</button>`
    : '';
  return `<div class="ps-sc-card" data-sort-name="${escHtml(nom)}" data-sort-type="${escHtml(type||'')}" data-sort-idx="${idx !== undefined ? idx : ''}" tabindex="0" role="button">
    <div class="ps-sc-top">
      <span class="ps-sc-dot" style="background:${dot}"></span>
      <span class="ps-sc-name">${escHtml(nom)}</span>
      ${conc}${delBtn}
    </div>
    ${lvlLabel||ecole ? `<div class="ps-sc-meta">${escHtml(lvlLabel)}${lvlLabel&&ecole?' · ':''}${escHtml(ecole)}</div>` : ''}
  </div>`;
}

function psTabSorts(char, d) {
  const slots     = SPELL_SLOTS_TABLE[char.niveau]||[];
  const usedSlots = char.emplacements_uses || {};
  const mineurs   = char.sorts_mineurs||[];
  const prepares  = char.sorts_prepares||[];
  const connus    = char.sorts_connus||[];
  const limits    = getSpellLimits(char);

  const slotsHtml = slots.map((total,i)=>{
    if (!total) return '';
    const lvl  = i+1;
    const used = usedSlots[lvl]||0;
    const pips = Array.from({length:total},(_,j)=>
      `<button class="ps-slot-pip${j<(total-used)?'':' used'}" data-slot-lvl="${lvl}" data-slot-idx="${j}" title="N${lvl}: ${j<(total-used)?'disponible':'utilisé'}">${j<(total-used)?'◉':'◯'}</button>`
    ).join('');
    return `<div class="ps-slot-row"><span class="ps-slot-label">N${lvl}</span><div class="ps-slot-pips">${pips}</div></div>`;
  }).filter(Boolean).join('');

  const minFull  = limits.maxCantrips  && mineurs.length  >= limits.maxCantrips;
  const prepFull = limits.maxPrepares  && prepares.length >= limits.maxPrepares;

  const limitBadge = (cur, max) => max
    ? `<span class="ps-sort-limit${cur>=max?' ps-sort-limit--full':''}">${cur}/${max}</span>`
    : '';

  return `
  <div class="ps-sorts-tab">
    ${slotsHtml ? `<div class="ps-slots-panel">${slotsHtml}</div>` : ''}

    <div class="ps-sort-section-row">
      <span class="ps-sort-section-lbl">Mineurs</span>
      ${limitBadge(mineurs.length, limits.maxCantrips)}
      <button class="ps-sort-section-add" id="ps-add-mineur" title="Ajouter un sort mineur"${minFull?' disabled':''}>+</button>
    </div>
    <div class="ps-sc-grid">
      ${mineurs.length ? mineurs.map((s,i) => sortCardHtml(s,'mineur',i)).join('') : '<span class="ps-empty-inline">Aucun sort mineur.</span>'}
    </div>

    <div class="ps-sort-section-row">
      <span class="ps-sort-section-lbl">Préparés</span>
      ${limitBadge(prepares.length, limits.maxPrepares)}
      <button class="ps-sort-section-add" id="ps-add-prepare" title="Préparer un sort"${prepFull?' disabled':''}>+</button>
    </div>
    <div class="ps-sc-grid">
      ${prepares.length ? prepares.map((s,i) => sortCardHtml(s,'prepare',i)).join('') : '<span class="ps-empty-inline">Aucun sort préparé.</span>'}
    </div>

    ${connus.length ? `
    <div class="ps-sort-section-row">
      <span class="ps-sort-section-lbl">Connus</span>
    </div>
    <div class="ps-sc-grid">${connus.map((s,i) => sortCardHtml(s,'connu',i)).join('')}</div>` : ''}
  </div>`;
}

function psTabInventaire(char) {
  const items = char.equipement||[];
  const armes = items.filter(i=>i.type==='arme');
  const armures = items.filter(i=>i.type==='armure');
  const misc = items.filter(i=>i.type!=='arme'&&i.type!=='armure');

  const renderItem = it => `
  <div class="ps-inv-item" data-item-id="${escHtml(it.id)}">
    <div class="ps-inv-equip-btn${it.equipe?' equipped':''}" data-equip="${escHtml(it.id)}" title="${it.equipe?'Déséquiper':'Équiper'}">${it.equipe?'●':'○'}</div>
    <div class="ps-inv-name" data-inv-tooltip="${escHtml(it.nom)}" data-inv-type="${escHtml(it.type||'misc')}">${escHtml(capitalize(it.nom))}</div>
    <div class="ps-inv-qty-ctrl">
      <button class="ps-inv-qty-btn" data-qty-dec="${escHtml(it.id)}">−</button>
      <span class="ps-inv-qty" data-qty-val="${escHtml(it.id)}">${it.quantite||1}</span>
      <button class="ps-inv-qty-btn" data-qty-inc="${escHtml(it.id)}">+</button>
    </div>
    <button class="ps-inv-del" data-del="${escHtml(it.id)}" title="Supprimer">✕</button>
  </div>`;

  return `
  <div class="ps-inventaire-tab">
    ${armes.length?`<div class="ps-inv-section"><div class="ps-inv-section-title">⚔ Armes</div>${armes.map(renderItem).join('')}</div>`:''}
    ${armures.length?`<div class="ps-inv-section"><div class="ps-inv-section-title">🛡 Armures</div>${armures.map(renderItem).join('')}</div>`:''}
    ${misc.length?`<div class="ps-inv-section"><div class="ps-inv-section-title">🎒 Objets</div>${misc.map(renderItem).join('')}</div>`:''}
    ${!items.length?'<p class="ps-empty">Inventaire vide.</p>':''}
    <div class="ps-inv-add-row">
      <button class="ps-add-btn" id="ps-add-item">+ Ajouter un objet</button>
    </div>
  </div>`;
}

function psTabOr(char) {
  const a = char.argent||{po:0,pa:0,pc:0,pp:0};
  const coins = [
    {key:'pp',label:'Platine',color:'#c8d8e8'},
    {key:'po',label:'Or',color:'#c9a84c'},
    {key:'pe',label:'Électrum',color:'#7ab0a0'},
    {key:'pa',label:'Argent',color:'#c0c0c0'},
    {key:'pc',label:'Cuivre',color:'#b87040'},
  ];
  return `
  <div class="ps-or-tab">
    <div class="ps-coins-grid">
      ${coins.map(c=>`
      <div class="ps-coin-block" style="--coin-color:${c.color}">
        <div class="ps-coin-disc">${c.label[0]}</div>
        <div class="ps-coin-label">${c.label}</div>
        <div class="ps-coin-value" data-coin="${c.key}" tabindex="0" title="Cliquer pour modifier">${a[c.key]||0}</div>
        <div class="ps-coin-btns">
          <button class="ps-coin-btn" data-coin-delta="${c.key}" data-delta="-1">-</button>
          <button class="ps-coin-btn" data-coin-delta="${c.key}" data-delta="1">+</button>
        </div>
      </div>`).join('')}
    </div>
    <div class="ps-or-equiv">
      Équivalent total : <strong>${((a.pp||0)*10+(a.po||0)+(a.pe||0)*0.5+(a.pa||0)*0.1+(a.pc||0)*0.01).toFixed(2)} pièces d'or</strong>
    </div>
  </div>`;
}

function psTabProfil(char) {
  return `
  <div class="ps-profil-tab">
    <div class="ps-profil-grid">
      <div class="ps-profil-field">
        <label class="ps-profil-label">Nom</label>
        <div class="ps-profil-val" data-editable="nom" tabindex="0">${escHtml(char.nom)}</div>
      </div>
      <div class="ps-profil-field">
        <label class="ps-profil-label">Âge</label>
        <div class="ps-profil-val" data-editable="age" tabindex="0">${escHtml(char.age||'—')}</div>
      </div>
      <div class="ps-profil-field ps-profil-wide">
        <label class="ps-profil-label">Description physique</label>
        <div class="ps-profil-val" data-editable="description" tabindex="0">${escHtml(char.description||'—')}</div>
      </div>
      <div class="ps-profil-field ps-profil-wide">
        <label class="ps-profil-label">Histoire</label>
        <div class="ps-profil-val" data-editable="histoire" tabindex="0">${escHtml(char.histoire||'—')}</div>
      </div>
    </div>
    <div class="ps-profil-langs">
      <div class="ps-profil-label">Langues connues</div>
      <div class="ps-lang-chips">
        ${(char.langues||['Commun']).map(l=>`<span class="tag tag-slate">${escHtml(l)}</span>`).join('')}
        <button class="ps-add-btn-sm" id="ps-add-lang">+ Langue</button>
      </div>
    </div>
  </div>`;
}

function psTabNotes(char) {
  return `
  <div class="ps-notes-tab">
    <textarea class="ps-notes-area" id="ps-notes-area" placeholder="Notes de campagne, liens importants, PNJ mémorables…">${escHtml(char.notes||'')}</textarea>
    <div class="ps-notes-saved" id="ps-notes-saved" hidden>✔ Sauvegardé</div>
  </div>`;
}

function getAllClassFeats(char) {
  const groups = APP.data.classes || [];
  const group = groups.find(g=>g[0].classe_title===char.classe);
  if (!group) return [];
  return group[0].capacites || [];
}

// ============================================================
// SHEET — EVENTS
// ============================================================

function wireSheet(container, char, d) {
  // Tab switching
  const tabs = container.querySelectorAll('.ps-tab');
  const panel = container.querySelector('#ps-tab-panels');
  const isSpellcaster = !!(CLASS_DATA[char.classe]||{}).spellcaster;

  const TAB_RENDERS = {
    actions:    () => psTabActions(getChar() || char, d),
    classe:     () => psTabClasse(getChar() || char),
    sorts:      () => psTabSorts(getChar() || char, d),
    inventaire: () => psTabInventaire(getChar() || char),
    or:         () => psTabOr(getChar() || char),
    profil:     () => psTabProfil(getChar() || char),
    notes:      () => psTabNotes(getChar() || char),
  };

  function switchTab(name) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    const fresh = getChar() || char;
    panel.innerHTML = TAB_RENDERS[name]?.() || '';
    wireTabEvents(container, name, fresh, d);
    wireHelp(container);
  }

  tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
  wireTabEvents(container, 'actions', char, d);

  // ── HP controls (in-place, no full re-render) ──────────────────────────────
  const applyHPChange = (delta, type) => {
    const fresh = getChar(); if (!fresh) return;
    if (type === 'temp') {
      fresh.hp.temp = Math.max(0, parseInt(delta) || 0);
    } else if (type === 'dmg') {
      const actual = Math.min(fresh.hp.current, Math.max(0, parseInt(delta) || 0));
      fresh.hp.current = Math.max(0, fresh.hp.current - actual);
      saveChar(fresh);
      updateHPInPlace(container, fresh, actual, 'dmg');
      return;
    } else {
      const actual = Math.min(fresh.hp.max - fresh.hp.current, Math.max(0, parseInt(delta) || 0));
      fresh.hp.current = Math.min(fresh.hp.max, fresh.hp.current + actual);
      saveChar(fresh);
      updateHPInPlace(container, fresh, actual, 'heal');
      return;
    }
    saveChar(fresh);
    updateHPInPlace(container, fresh, 0, 'temp');
  };

  container.querySelector('#ps-apply-dmg')?.addEventListener('click', () => {
    const v = parseInt(container.querySelector('#ps-dmg-val')?.value || '0');
    if (v > 0) { applyHPChange(v, 'dmg'); container.querySelector('#ps-dmg-val').value=''; }
  });
  container.querySelector('#ps-apply-heal')?.addEventListener('click', () => {
    const v = parseInt(container.querySelector('#ps-heal-val')?.value || '0');
    if (v > 0) { applyHPChange(v, 'heal'); container.querySelector('#ps-heal-val').value=''; }
  });
  container.querySelector('#ps-apply-temp')?.addEventListener('click', () => {
    const v = parseInt(container.querySelector('#ps-temp-val')?.value || '0');
    applyHPChange(v, 'temp');
    container.querySelector('#ps-temp-val').value = '';
  });

  [['#ps-dmg-val','#ps-apply-dmg'],['#ps-heal-val','#ps-apply-heal'],['#ps-temp-val','#ps-apply-temp']].forEach(([inp,btn])=>{
    container.querySelector(inp)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') container.querySelector(btn)?.click();
    });
  });

  // ── Inspiration ────────────────────────────────────────────────────────────
  container.querySelector('#ps-inspiration')?.addEventListener('click', () => {
    const fresh = getChar(); if (!fresh) return;
    fresh.inspiration = fresh.inspiration ? 0 : 1;
    saveChar(fresh);
    const pip = container.querySelector('#ps-inspiration');
    if (pip) { pip.textContent = fresh.inspiration ? '★' : '☆'; pip.classList.toggle('active', !!fresh.inspiration); }
  });

  // ── Rest ───────────────────────────────────────────────────────────────────
  container.querySelector('#ps-rest-long')?.addEventListener('click', () => {
    const fresh = getChar(); if (!fresh) return;
    const prev = fresh.hp.current;
    fresh.hp.current = fresh.hp.max;
    fresh.hp.temp = 0;
    fresh.emplacements_uses = {};
    fresh.concentration = null;
    saveChar(fresh);
    updateHPInPlace(container, fresh, fresh.hp.max - prev, 'heal');
    showNotif(container, '🌙 Repos long — PV et ressources récupérés !');
  });
  container.querySelector('#ps-rest-short')?.addEventListener('click', () => {
    showNotif(container, '☀ Repos court effectué.');
  });

  // ── Delete character ───────────────────────────────────────────────────────
  container.querySelector('#ps-delete-char')?.addEventListener('click', () => {
    showConfirmModal(
      'Supprimer ce personnage et en créer un nouveau ? Cette action est irréversible.',
      () => { delChar(); WIZ = null; renderPersonnage(container); },
      'Supprimer'
    );
  });

  // ── Inline stat editing ────────────────────────────────────────────────────
  container.querySelectorAll('[data-editable-stat]').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.editableStat;
      const fresh = getChar(); if (!fresh) return;
      showPromptModal(
        `${ABILITY_NAMES[key]} (1–30)`,
        fresh.stats[key] || 10,
        val => {
          if (val === null) return;
          const n = Math.max(1, Math.min(30, parseInt(val) || 10));
          fresh.stats[key] = n;
          saveChar(fresh);
          renderPersonnage(container);
        },
        { title: 'Modifier la caractéristique', number: true, min: 1, max: 30 }
      );
    });
  });

  // ── Inline name editing (header) ───────────────────────────────────────────
  container.querySelectorAll('[data-editable]').forEach(el => {
    el.addEventListener('click', () => {
      const field = el.dataset.editable;
      const fresh = getChar(); if (!fresh) return;
      showPromptModal(
        `Nouveau ${field}`,
        fresh[field] || '',
        val => {
          if (val === null) return;
          fresh[field] = val.trim();
          saveChar(fresh);
          el.textContent = fresh[field] || '—';
        },
        { title: `Modifier : ${field}` }
      );
    });
  });
}

function showSortFloat(nom, type, idx) {
  const sort = (APP.data.sorts||[]).find(s => {
    const n = s.name || '';
    const mainN = n.includes('|') ? n.split('|')[0].trim() : n;
    return mainN === nom || n === nom;
  });
  if (!sort) return;
  const mainName = (sort.name||nom).includes('|') ? (sort.name||nom).split('|')[0].trim() : (sort.name||nom);
  const altName  = (sort.name||nom).includes('|') ? (sort.name||nom).split('|')[1]?.trim() : null;
  Modal.show(renderSortModal({ ...sort, mainName, altName }));
}

function wireTabEvents(container, tabName, char, d) {
  const panel = container.querySelector('#ps-tab-panels');
  if (!panel) return;
  // Abort any previous panel-level listener before adding a new one
  if (panel._tabAC) panel._tabAC.abort();
  panel._tabAC = new AbortController();
  const { signal } = panel._tabAC;

  if (tabName === 'notes') {
    const area = panel.querySelector('#ps-notes-area');
    const saved = panel.querySelector('#ps-notes-saved');
    let saveTimer;
    area?.addEventListener('input', () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        const fresh = getChar(); if (!fresh) return;
        fresh.notes = area.value; saveChar(fresh);
        if (saved) { saved.hidden = false; setTimeout(() => saved.hidden = true, 1500); }
      }, 1000);
    });
  }

  if (tabName === 'or') {
    panel.addEventListener('click', e => {
      const btn = e.target.closest('[data-coin-delta]');
      if (!btn) return;
      const fresh = getChar(); if (!fresh) return;
      if (!fresh.argent) fresh.argent = { po:0, pa:0, pc:0, pp:0 };
      const key = btn.dataset.coinDelta;
      const delta = parseInt(btn.dataset.delta) || 0;
      fresh.argent[key] = Math.max(0, (fresh.argent[key] || 0) + delta);
      saveChar(fresh);
      const valEl = panel.querySelector(`[data-coin="${key}"]`);
      if (valEl) valEl.textContent = fresh.argent[key];
      const equiv = panel.querySelector('.ps-or-equiv strong');
      if (equiv) {
        const a = fresh.argent;
        equiv.textContent = ((a.pp||0)*10+(a.po||0)+(a.pe||0)*0.5+(a.pa||0)*0.1+(a.pc||0)*0.01).toFixed(2) + ' po';
      }
    }, { signal });
    panel.querySelectorAll('[data-coin]').forEach(el => {
      el.addEventListener('click', () => {
        const key = el.dataset.coin;
        const fresh = getChar(); if (!fresh) return;
        if (!fresh.argent) fresh.argent = { po:0, pa:0, pc:0, pp:0 };
        showPromptModal(
          `Montant en ${key.toUpperCase()}`,
          fresh.argent[key] || 0,
          val => {
            if (val === null) return;
            fresh.argent[key] = Math.max(0, parseInt(val) || 0);
            saveChar(fresh);
            el.textContent = fresh.argent[key];
          },
          { title: 'Modifier la monnaie', number: true, min: 0 }
        );
      });
    });
  }

  if (tabName === 'inventaire') {
    wireInvTooltips(panel);
    panel.addEventListener('click', e => {
      const equipBtn = e.target.closest('[data-equip]');
      const delBtn   = e.target.closest('[data-del]');
      const addBtn   = e.target.closest('#ps-add-item');
      const qtyDec   = e.target.closest('[data-qty-dec]');
      const qtyInc   = e.target.closest('[data-qty-inc]');

      if (equipBtn) {
        const id = equipBtn.dataset.equip;
        const fresh = getChar(); if (!fresh) return;
        const it = fresh.equipement.find(i => i.id === id);
        if (it) { it.equipe = !it.equipe; saveChar(fresh); }
        panel.innerHTML = psTabInventaire(fresh);
        wireInvTooltips(panel);
      }
      if (delBtn) {
        const id = delBtn.dataset.del;
        const fresh = getChar(); if (!fresh) return;
        const it = fresh.equipement.find(i => i.id === id);
        showConfirmModal(
          `Supprimer "${capitalize(it?.nom) || 'cet objet'}" de l'inventaire ?`,
          () => {
            const f2 = getChar(); if (!f2) return;
            f2.equipement = f2.equipement.filter(i => i.id !== id);
            saveChar(f2);
            panel.innerHTML = psTabInventaire(f2);
            wireInvTooltips(panel);
          },
          'Supprimer'
        );
      }
      if (qtyDec) {
        const id = qtyDec.dataset.qtyDec;
        const fresh = getChar(); if (!fresh) return;
        const it = fresh.equipement.find(i => i.id === id);
        if (it && (it.quantite||1) > 1) { it.quantite = (it.quantite||1) - 1; saveChar(fresh); }
        const span = panel.querySelector(`[data-qty-val="${id}"]`);
        if (span && it) span.textContent = it.quantite;
      }
      if (qtyInc) {
        const id = qtyInc.dataset.qtyInc;
        const fresh = getChar(); if (!fresh) return;
        const it = fresh.equipement.find(i => i.id === id);
        if (it) { it.quantite = (it.quantite||1) + 1; saveChar(fresh); }
        const span = panel.querySelector(`[data-qty-val="${id}"]`);
        if (span && it) span.textContent = it.quantite;
      }
      if (addBtn) {
        showAddItemModal(container, d);
      }
    }, { signal });
  }

  if (tabName === 'sorts') {
    panel.addEventListener('click', e => {
      const pip      = e.target.closest('.ps-slot-pip');
      const addMin   = e.target.closest('#ps-add-mineur');
      const addPre   = e.target.closest('#ps-add-prepare');
      const delBtn   = e.target.closest('.ps-sort-del');
      const sortCard = e.target.closest('.ps-sc-card');

      if (delBtn) {
        const type = delBtn.dataset.sortType;
        const idx  = parseInt(delBtn.dataset.sortIdx);
        const fresh = getChar(); if (!fresh) return;
        if (type === 'mineur')   fresh.sorts_mineurs.splice(idx, 1);
        else if (type === 'prepare') fresh.sorts_prepares.splice(idx, 1);
        else if (type === 'connu')   (fresh.sorts_connus||[]).splice(idx, 1);
        saveChar(fresh);
        panel.innerHTML = psTabSorts(fresh, d);
        return;
      }

      if (sortCard) {
        const nom  = sortCard.dataset.sortName;
        const type = sortCard.dataset.sortType;
        const idx  = sortCard.dataset.sortIdx !== undefined ? parseInt(sortCard.dataset.sortIdx) : undefined;
        if (nom) showSortFloat(nom, type, idx);
        return;
      }

      if (pip) {
        const lvl = parseInt(pip.dataset.slotLvl);
        const idx = parseInt(pip.dataset.slotIdx);
        const fresh = getChar(); if (!fresh) return;
        if (!fresh.emplacements_uses) fresh.emplacements_uses = {};
        const total = SPELL_SLOTS_TABLE[fresh.niveau]?.[lvl-1] || 0;
        const used  = fresh.emplacements_uses[lvl] || 0;
        if (idx < total - used) fresh.emplacements_uses[lvl] = used + 1;
        else fresh.emplacements_uses[lvl] = Math.max(0, used - 1);
        saveChar(fresh);
        panel.innerHTML = psTabSorts(fresh, d);
        return;
      }

      if (addMin || addPre) {
        showSortBrowserModal(container, d, addMin ? 'mineur' : 'prepare');
      }
    }, { signal });

    // Float closed via its own backdrop — no extra listener needed here
  }

  if (tabName === 'classe') {
    panel.querySelector('#ps-add-cap')?.addEventListener('click', () => {
      Modal.show(`
      <div class="ps-dialog ps-dialog--wide">
        <h3 class="ps-dialog-title">Ajouter une capacité</h3>
        <label class="ps-dialog-label">Nom</label>
        <input type="text" class="ps-dialog-input" id="dlg-cap-nom" placeholder="Nom de la capacité">
        <label class="ps-dialog-label" style="margin-top:.75rem">Description</label>
        <textarea class="ps-dialog-input ps-dialog-textarea" id="dlg-cap-desc" placeholder="Description (optionnel)"></textarea>
        <div class="ps-dialog-btns">
          <button class="ps-dialog-btn ps-dialog-btn--cancel" id="dlg-cancel">Annuler</button>
          <button class="ps-dialog-btn ps-dialog-btn--ok" id="dlg-ok">Ajouter</button>
        </div>
      </div>`);
      const nomEl  = Modal.body.querySelector('#dlg-cap-nom');
      const descEl = Modal.body.querySelector('#dlg-cap-desc');
      nomEl?.focus();
      Modal.body.querySelector('#dlg-ok')?.addEventListener('click', () => {
        const nom  = nomEl?.value?.trim();
        if (!nom) { nomEl?.focus(); return; }
        const desc = descEl?.value?.trim() || '';
        Modal.hide();
        const fresh = getChar(); if (!fresh) return;
        if (!fresh.homebrew_capacites) fresh.homebrew_capacites = [];
        fresh.homebrew_capacites.push({ nom, description: desc });
        saveChar(fresh);
        panel.innerHTML = psTabClasse(fresh);
        wireTabEvents(container, 'classe', fresh, d);
      });
      Modal.body.querySelector('#dlg-cancel')?.addEventListener('click', () => Modal.hide());
    });

    panel.addEventListener('click', e => {
      const delBtn = e.target.closest('[data-del-cap]');
      if (!delBtn) return;
      const i = parseInt(delBtn.dataset.delCap);
      const fresh = getChar(); if (!fresh) return;
      const nom = fresh.homebrew_capacites?.[i]?.nom || 'cette capacité';
      showConfirmModal(`Supprimer "${nom}" ?`, () => {
        const f2 = getChar(); if (!f2) return;
        f2.homebrew_capacites.splice(i, 1);
        saveChar(f2);
        panel.innerHTML = psTabClasse(f2);
        wireTabEvents(container, 'classe', f2, d);
      }, 'Supprimer');
    }, { signal });

    panel.addEventListener('click', e => {
      const link = e.target.closest('.trait-link');
      if (!link) return;
      if (link.classList.contains('trait-link--sort')) {
        const slug = link.dataset.traitSort;
        const normSlug = normalize(slug.replace(/-/g, ' '));
        const sort = (APP.data.sorts || []).find(s => {
          const main = s.name.includes('|') ? s.name.split('|')[0].trim() : s.name;
          return normalize(main) === normSlug;
        });
        if (sort) {
          const mainName = sort.name.includes('|') ? sort.name.split('|')[0].trim() : sort.name;
          const altName  = sort.name.includes('|') ? sort.name.split('|')[1].trim() : null;
          Modal.show(renderSortModal({ ...sort, mainName, altName }));
        }
      } else if (link.classList.contains('trait-link--don')) {
        const slug = link.dataset.traitDon;
        const normSlug = normalize(slug.replace(/-/g, ' '));
        const don = (APP.data.dons || []).find(d => {
          const main = d.name.includes('|') ? d.name.split('|')[0].trim() : d.name;
          return normalize(main) === normSlug;
        });
        if (don) Modal.show(renderDonModal(don));
      }
    }, { signal });

    panel.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const link = e.target.closest('.trait-link');
      if (link) { e.preventDefault(); link.click(); }
    }, { signal });
  }

  if (tabName === 'profil') {
    panel.querySelectorAll('[data-editable]').forEach(el => {
      el.addEventListener('click', () => {
        const field  = el.dataset.editable;
        const fresh  = getChar(); if (!fresh) return;
        const isLong = ['description', 'histoire'].includes(field);
        const label  = { nom:'Nom', age:'Âge', description:'Description', histoire:'Histoire', apparence:'Apparence' }[field] || field;
        showPromptModal(
          label,
          fresh[field] || '',
          val => {
            if (val === null) return;
            fresh[field] = val.trim();
            saveChar(fresh);
            el.textContent = fresh[field] || '—';
          },
          { title: `Modifier : ${label}`, textarea: isLong }
        );
      });
    });

    panel.querySelector('#ps-add-lang')?.addEventListener('click', () => {
      const fresh = getChar(); if (!fresh) return;
      Modal.show(`
      <div class="ps-dialog">
        <h3 class="ps-dialog-title">Ajouter une langue</h3>
        <label class="ps-dialog-label">Langue connue</label>
        <select class="wiz-stat-select" id="dlg-lang-sel">
          <option value="">— Choisir dans la liste —</option>
          ${LANGUAGES_LIST.map(l=>`<option value="${escHtml(l)}">${escHtml(l)}</option>`).join('')}
          <option value="__custom__">Autre (saisir manuellement)</option>
        </select>
        <input type="text" class="ps-dialog-input" id="dlg-lang-custom" placeholder="Nom de la langue" style="display:none;margin-top:.5rem">
        <div class="ps-dialog-btns">
          <button class="ps-dialog-btn ps-dialog-btn--cancel" id="dlg-cancel">Annuler</button>
          <button class="ps-dialog-btn ps-dialog-btn--ok" id="dlg-ok">Ajouter</button>
        </div>
      </div>`);
      const sel    = Modal.body.querySelector('#dlg-lang-sel');
      const custom = Modal.body.querySelector('#dlg-lang-custom');
      sel?.addEventListener('change', () => {
        custom.style.display = sel.value === '__custom__' ? '' : 'none';
        if (sel.value !== '__custom__') custom.value = '';
      });
      Modal.body.querySelector('#dlg-ok')?.addEventListener('click', () => {
        const lang = sel?.value === '__custom__' ? custom?.value?.trim() : sel?.value;
        if (!lang) return;
        Modal.hide();
        const f2 = getChar(); if (!f2) return;
        if (!f2.langues) f2.langues = ['Commun'];
        if (!f2.langues.includes(lang)) f2.langues.push(lang);
        saveChar(f2);
        panel.innerHTML = psTabProfil(f2);
        wireTabEvents(container, 'profil', f2, d);
      });
      Modal.body.querySelector('#dlg-cancel')?.addEventListener('click', () => Modal.hide());
    });

    panel.addEventListener('click', e => {
      const delLang = e.target.closest('[data-del-lang]');
      if (!delLang) return;
      const lang = delLang.dataset.delLang;
      const fresh = getChar(); if (!fresh) return;
      fresh.langues = (fresh.langues || []).filter(l => l !== lang);
      saveChar(fresh);
      const langList = panel.querySelector('.ps-profil-langs');
      if (langList) {
        langList.innerHTML = (fresh.langues||[]).map(l =>
          `<span class="ps-lang-chip">${escHtml(l)} <button class="ps-lang-del" data-del-lang="${escHtml(l)}" title="Retirer">✕</button></span>`
        ).join('');
      }
    });
  }
}

function showSpellDetail(s, nom) {
  // Backdrop
  let backdrop = document.getElementById('sdp-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'sdp-backdrop';
    document.body.appendChild(backdrop);
  }

  let popup = document.getElementById('sdp-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'sdp-popup';
    document.body.appendChild(popup);
  }

  const niv  = parseInt(s.niveau) || 0;
  const dot  = SCHOOL_DOTS[s.ecole||''] || '#888';
  const lvl  = niv === 0 ? 'Tour de magie' : `Niveau ${niv}`;
  const comp = (s.composants||[]).join(', ');
  const desc = (s.description||'').replace(/<[^>]*>/g,'').trim();
  const rows = [
    ['Temps d\'incantation', s.temps],
    ['Portée',               s.portee],
    ['Durée',                s.duree],
    ['Composantes',          comp],
  ].filter(([,v]) => v);

  popup.innerHTML = `
    <div class="sdp-img-wrap">
      <img src="${getSortImgUrl(nom)}" alt="" class="sdp-img" loading="lazy"
           onerror="this.closest('.sdp-img-wrap').style.display='none'">
    </div>
    <div class="sdp-head">
      <div class="sdp-head-left">
        <span class="sdp-dot" style="background:${dot}"></span>
        <div>
          <div class="sdp-name">${escHtml(nom)}</div>
          <div class="sdp-meta">${escHtml(lvl)}${s.ecole ? ' · ' + escHtml(s.ecole) : ''}${s.concentration ? ' · <em>Concentration</em>' : ''}</div>
        </div>
      </div>
      <button class="sdp-close" id="sdp-close" title="Fermer">✕</button>
    </div>
    ${rows.length ? `<table class="sdp-table"><tbody>${rows.map(([k,v]) =>
      `<tr><td class="sdp-k">${escHtml(k)}</td><td class="sdp-v">${escHtml(v)}</td></tr>`
    ).join('')}</tbody></table>` : ''}
    ${desc ? `<div class="sdp-desc">${enrichSortText(desc)}</div>` : ''}
    ${s.amelioration ? `<div class="sdp-upcast"><strong>Niveaux supérieurs :</strong> ${enrichSortText(s.amelioration)}</div>` : ''}`;

  const close = () => {
    popup.classList.remove('sdp-open');
    backdrop.classList.remove('sdp-open');
  };

  backdrop.classList.add('sdp-open');
  popup.classList.add('sdp-open');
  document.getElementById('sdp-close').onclick = close;
  backdrop.onclick = close;
}

function showSortBrowserModal(container, d, addType) {
  const char = getChar(); if (!char) return;

  const allSorts   = APP.data.sorts || [];
  const clsNorm    = normalize(char.classe);
  const classSorts = allSorts.filter(s =>
    (s.classes||[]).some(c => normalize(c).includes(clsNorm) || clsNorm.includes(normalize(c)))
  );
  const maxSlot   = Math.ceil(char.niveau / 2);
  const limits    = getSpellLimits(char);
  const isCantrip = addType === 'mineur';

  const getName  = s => { const n = s.name||''; return n.includes('|') ? n.split('|')[0].trim() : n; };
  const getNiv   = s => parseInt(s.niveau) || 0;
  const getAdded = () => isCantrip ? (getChar()?.sorts_mineurs||[]) : (getChar()?.sorts_prepares||[]);
  const getMax   = () => isCantrip ? limits.maxCantrips : limits.maxPrepares;

  const pool0 = isCantrip
    ? classSorts.filter(s => getNiv(s) === 0)
    : classSorts.filter(s => getNiv(s) > 0 && getNiv(s) <= maxSlot);

  const cardHtml = s => {
    const nom   = getName(s);
    const niv   = getNiv(s);
    const dot   = SCHOOL_DOTS[s.ecole||''] || '#888';
    const sub   = `${niv === 0 ? 'Mineur' : `Niv. ${niv}`}${s.ecole ? ' · ' + s.ecole : ''}`;
    const conc  = s.concentration ? ' ©' : '';
    const added = getAdded().includes(nom);
    return `<div class="sbr-card${added ? ' sbr-card--added' : ''}" data-nom="${escHtml(nom)}" tabindex="0">
      <div class="sbr-img-wrap">
        <img src="${getSortImgUrl(nom)}" alt="" class="sbr-img" loading="lazy"
             onerror="this.closest('.sbr-img-wrap').style.display='none'">
      </div>
      <div class="sbr-card-top">
        <span class="sbr-dot" style="background:${dot}"></span>
        <span class="sbr-name">${escHtml(nom)}${conc}</span>
        ${added ? `<span class="sbr-added">✓</span>` : `<button class="sbr-add" title="Ajouter">+</button>`}
      </div>
      <div class="sbr-sub">${escHtml(sub)}</div>
    </div>`;
  };

  const renderGrid = items =>
    items.map(cardHtml).join('') ||
    `<p style="color:var(--text3);font-style:italic;font-size:.85rem;padding:.25rem">Aucun sort trouvé</p>`;

  const cnt0 = getAdded().length, max0 = getMax();
  const title = isCantrip ? 'Sorts mineurs' : 'Sorts préparés';

  Modal.show(`<div class="sbr-modal">
    <div class="sbr-header">
      <span class="sbr-title">${escHtml(title)}</span>
      ${max0 ? `<span class="sbr-count${cnt0>=max0?' sbr-count--full':''}" id="sbr-count">${cnt0}/${max0}</span>` : ''}
    </div>
    <div class="sbr-search-row">
      <input type="search" class="sbr-search" id="sbr-search" placeholder="Filtrer les sorts…" autocomplete="off">
      <div class="sbr-hint" id="sbr-hint">${escHtml(char.classe)} · ${pool0.length} sort${pool0.length>1?'s':''}</div>
    </div>
    <div class="sbr-grid-wrap">
      <div class="sbr-grid" id="sbr-grid">${renderGrid(pool0)}</div>
    </div>
    <p class="sbr-tip">Cliquez sur une carte pour lire le sort en détail</p>
  </div>`);

  const gridEl   = Modal.body.querySelector('#sbr-grid');
  const searchEl = Modal.body.querySelector('#sbr-search');
  const hintEl   = Modal.body.querySelector('#sbr-hint');

  const wireCards = () => {
    gridEl.querySelectorAll('.sbr-card').forEach(card => {
      const nom  = card.dataset.nom;
      const sort = allSorts.find(s => getName(s) === nom);

      card.addEventListener('click', e => {
        if (e.target.closest('.sbr-add')) return;
        if (sort) showSpellDetail(sort, nom);
      });

      card.querySelector('.sbr-add')?.addEventListener('click', e => {
        e.stopPropagation();
        const fresh = getChar(); if (!fresh) return;
        const max  = getMax();
        const list = isCantrip ? (fresh.sorts_mineurs ??= []) : (fresh.sorts_prepares ??= []);
        if (max && list.length >= max) return;
        if (!list.includes(nom)) list.push(nom);
        saveChar(fresh);
        card.classList.add('sbr-card--added');
        card.style.pointerEvents = 'none';
        card.querySelector('.sbr-add').outerHTML = `<span class="sbr-added">✓</span>`;
        const countEl = Modal.body.querySelector('#sbr-count');
        if (countEl) {
          const c = getAdded().length, m = getMax();
          countEl.textContent = `${c}/${m}`;
          countEl.classList.toggle('sbr-count--full', c >= m);
        }
        const panel = container.querySelector('#ps-tab-panels');
        if (panel) { panel.innerHTML = psTabSorts(fresh, d); wireTabEvents(container, 'sorts', fresh, d); }
      });
    });
  };

  searchEl.addEventListener('input', debounce(e => {
    const q    = normalize(e.target.value.trim());
    const pool = q
      ? classSorts.filter(s => normalize(getName(s)).includes(q) || normalize(s.ecole||'').includes(q))
      : pool0;
    gridEl.innerHTML = renderGrid(pool);
    if (hintEl) hintEl.textContent = `${char.classe} · ${pool.length} sort${pool.length>1?'s':''}`;
    wireCards();
  }, 150));

  wireCards();
  searchEl.focus();
}

function lookupItemData(nom) {
  const key = normalize(nom);
  // Armes
  for (const cat of (APP.data.armes?.armes || [])) {
    const found = (cat.armes||[]).find(a => normalize(a.nom) === key || key.includes(normalize(a.nom)) || normalize(a.nom).includes(key));
    if (found) return { ...found, _cat: cat.categorie, _type: 'Arme' };
  }
  // Armures
  for (const cat of (APP.data.armures?.armures || [])) {
    const found = (cat.armures||[]).find(a => a?.nom && (normalize(a.nom) === key || key.includes(normalize(a.nom)) || normalize(a.nom).includes(key)));
    if (found) return { ...found, _cat: cat.categorie, _type: 'Armure' };
  }
  // Matériels
  const mat = (APP.data.materiels||[]).find(m => normalize(m.nom) === key || key.includes(normalize(m.nom)) || normalize(m.nom).includes(key));
  if (mat) return { ...mat, _type: 'Matériel' };
  // Outils
  const out = (APP.data.outils||[]).find(o => normalize(o.nom) === key || key.includes(normalize(o.nom)));
  if (out) return { ...out, _type: 'Outil' };
  return null;
}

function buildItemTooltipHtml(nom) {
  const data = lookupItemData(nom);
  if (!data) return `<div class="tooltip-title">${escHtml(capitalize(nom))}</div><div class="tooltip-desc" style="color:var(--text3);font-size:.8rem">Objet divers</div>`;
  const parts = [];
  if (data._type) parts.push(`<div class="tooltip-cat">${escHtml(data._type)}${data._cat ? ` · ${escHtml(data._cat)}` : ''}</div>`);
  if (data.degats) parts.push(`<div class="tooltip-desc"><strong>Dégâts :</strong> ${escHtml(data.degats)}</div>`);
  if (data.ca) parts.push(`<div class="tooltip-desc"><strong>CA :</strong> ${escHtml(data.ca)}</div>`);
  if (data.botte) parts.push(`<div class="tooltip-desc"><strong>Botte :</strong> ${escHtml(data.botte)}</div>`);
  if (data.proprietes?.length) parts.push(`<div class="tooltip-desc">${data.proprietes.map(p=>escHtml(p)).join(', ')}</div>`);
  if (data.description) parts.push(`<div class="tooltip-desc" style="font-style:italic;font-size:.8rem;color:var(--text2)">${escHtml(data.description.slice(0, 160))}${data.description.length>160?'…':''}</div>`);
  if (data.prix||data.cout) parts.push(`<div class="tooltip-desc" style="color:var(--gold);font-size:.78rem">Prix : ${escHtml(data.prix||data.cout||'—')}</div>`);
  return `<div class="tooltip-title">${escHtml(capitalize(nom))}</div>${parts.join('')}`;
}

function wireInvTooltips(panel) {
  panel.querySelectorAll('[data-inv-tooltip]').forEach(el => {
    el.style.cursor = 'help';
    el.addEventListener('mouseenter', e => {
      const html = buildItemTooltipHtml(el.dataset.invTooltip);
      clearTimeout(APP.tooltipTimer);
      APP.tooltipTimer = setTimeout(() => Tooltip.show(html, e.clientX, e.clientY), 150);
    });
    el.addEventListener('mousemove', e => {
      if (!Tooltip.el.classList.contains('hidden')) Tooltip.position(e.clientX, e.clientY);
    });
    el.addEventListener('mouseleave', () => { clearTimeout(APP.tooltipTimer); Tooltip.hide(); });
  });
}

function showAddItemModal(container, d) {
  // Compile all inventory items from all data files
  const allItems = [];
  (APP.data.armes?.armes || []).forEach(cat => {
    (cat.armes||[]).forEach(a => allItems.push({ nom: a.nom, type:'arme',   detail: a.degats||'', prix: a.prix||'', cat: cat.categorie }));
  });
  (APP.data.armures?.armures || []).forEach(cat => {
    (cat.armures||[]).forEach(a => { if (a?.nom) allItems.push({ nom: a.nom, type:'armure', detail: a.ca ? `CA ${a.ca}` : '', prix: a.cout||'', cat: cat.categorie||'Armure' }); });
  });
  (APP.data.materiels||[]).forEach(m => allItems.push({ nom: m.nom, type:'misc', detail: (m.description||'').slice(0,50), prix: m.prix||'', cat: 'Matériel' }));
  (APP.data.outils||[]).forEach(o => allItems.push({ nom: o.nom, type:'misc', detail:'', prix: o.prix||'', cat: 'Outil' }));

  const typeBadge = t => ({ arme:'Arme', armure:'Armure', misc:'Divers' }[t] || t);
  const typeColor  = { arme:'#c9442c', armure:'#3a7bc8', misc:'#6a8a6a' };

  const renderCards = (items) => items.slice(0, 40).map(it => `
    <div class="ps-ic-card">
      <div class="ps-ic-top">
        <span class="ps-ic-badge" style="background:${typeColor[it.type]||'#555'}">${typeBadge(it.type)}</span>
        <span class="ps-ic-name">${escHtml(it.nom)}</span>
      </div>
      ${it.detail||it.prix ? `<div class="ps-ic-meta">${[it.detail,it.prix].filter(Boolean).map(escHtml).join(' · ')}</div>` : ''}
      <div class="ps-ic-footer">
        <div class="ps-ic-qty-row">
          <button class="ps-ic-qty-btn" data-ic-dec tabindex="-1">−</button>
          <input class="ps-ic-qty-input" type="number" value="1" min="1" max="999" tabindex="-1">
          <button class="ps-ic-qty-btn" data-ic-inc tabindex="-1">+</button>
        </div>
        <button class="ps-ic-add-btn" data-item-nom="${escHtml(it.nom)}" data-item-type="${it.type}" title="Ajouter à l'inventaire">+</button>
      </div>
    </div>`).join('');

  Modal.show(`
  <div class="ps-add-item-modal ps-aim-v2">
    <h3 class="ps-dialog-title">Ajouter un objet</h3>
    <input type="search" class="wiz-input" id="item-search" placeholder="Arme, armure, matériel, outil…" autocomplete="off">
    <div class="ps-ic-count" id="ic-count">${allItems.length} objets disponibles</div>
    <div class="ps-ic-grid" id="item-sugg-grid">
      ${renderCards(allItems.slice(0, 24))}
    </div>
    <div class="ps-add-item-separator">— ou entrer manuellement —</div>
    <div class="ps-aim-manual-row">
      <input type="text" class="ps-dialog-input ps-aim-nom" id="item-nom-custom" placeholder="Nom de l'objet">
      <select class="wiz-stat-select ps-aim-type" id="item-type-custom">
        <option value="misc">Divers</option>
        <option value="arme">Arme</option>
        <option value="armure">Armure</option>
      </select>
      <input type="number" class="ps-aim-qty-manual" id="item-qty-custom" value="1" min="1" max="999" title="Quantité">
      <button class="ps-dialog-btn ps-dialog-btn--ok ps-aim-add-btn" id="item-add-custom">Ajouter</button>
    </div>
    <button class="ps-dialog-btn ps-dialog-btn--cancel" id="item-cancel" style="margin-top:.4rem;width:100%">Fermer</button>
  </div>`);

  const searchEl = Modal.body.querySelector('#item-search');
  const gridEl   = Modal.body.querySelector('#item-sugg-grid');
  const countEl  = Modal.body.querySelector('#ic-count');

  const addItem = (nom, type, quantite) => {
    const fresh = getChar(); if (!fresh) return;
    if (!fresh.equipement) fresh.equipement = [];
    const id = Math.random().toString(36).slice(2);
    fresh.equipement.push({ id, nom: capitalize(nom.trim()), type, quantite: Math.max(1, parseInt(quantite)||1), equipe: false });
    saveChar(fresh);
    const panel = container.querySelector('#ps-tab-panels');
    if (panel) { panel.innerHTML = psTabInventaire(fresh); wireTabEvents(container, 'inventaire', fresh, d); }
    // Flash confirmation instead of closing modal so user can add more
    const toast = document.createElement('div');
    toast.className = 'ps-aim-toast';
    toast.textContent = `${capitalize(nom)} ajouté !`;
    Modal.body.querySelector('.ps-aim-v2')?.appendChild(toast);
    setTimeout(() => toast.remove(), 1400);
  };

  // Wire grid events (re-runs after each search update)
  const wireGrid = () => {
    gridEl.querySelectorAll('.ps-ic-card').forEach(card => {
      const qtyInput = card.querySelector('.ps-ic-qty-input');
      card.querySelector('[data-ic-dec]')?.addEventListener('click', () => { qtyInput.value = Math.max(1, parseInt(qtyInput.value||1)-1); });
      card.querySelector('[data-ic-inc]')?.addEventListener('click', () => { qtyInput.value = Math.min(999, parseInt(qtyInput.value||1)+1); });
      card.querySelector('[data-item-nom]')?.addEventListener('click', e => {
        const btn = e.currentTarget;
        addItem(btn.dataset.itemNom, btn.dataset.itemType||'misc', qtyInput?.value||1);
      });
    });
  };

  searchEl?.addEventListener('input', debounce(e => {
    const q = normalize(e.target.value);
    const pool = q
      ? allItems.filter(it => normalize(it.nom).includes(q) || normalize(it.cat||'').includes(q) || normalize(it.detail||'').includes(q))
      : allItems.slice(0, 24);
    gridEl.innerHTML = renderCards(pool) || '<p style="color:var(--ps-text3);padding:.5rem">Aucun résultat</p>';
    if (countEl) countEl.textContent = q ? `${pool.length} résultat${pool.length>1?'s':''}` : `${allItems.length} objets disponibles`;
    wireGrid();
  }, 160));

  Modal.body.querySelector('#item-add-custom')?.addEventListener('click', () => {
    const nom = Modal.body.querySelector('#item-nom-custom')?.value?.trim();
    if (!nom) { Modal.body.querySelector('#item-nom-custom')?.focus(); return; }
    const qty = Modal.body.querySelector('#item-qty-custom')?.value || '1';
    addItem(nom, Modal.body.querySelector('#item-type-custom')?.value||'misc', qty);
    Modal.body.querySelector('#item-nom-custom').value = '';
  });

  Modal.body.querySelector('#item-cancel')?.addEventListener('click', () => Modal.hide());

  wireGrid();
  searchEl?.focus();
}

function showNotif(container, msg) {
  let notif = container.querySelector('.ps-notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'ps-notif';
    container.querySelector('.ps-wrap')?.appendChild(notif);
  }
  notif.textContent = msg;
  notif.classList.add('show');
  setTimeout(()=>notif.classList.remove('show'), 2500);
}

// ============================================================
// MOBILE NAV
// ============================================================

function closeMobileNav() {
  const nav = document.getElementById('main-nav');
  const btn = document.getElementById('nav-toggle');
  nav.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}

function setupMobileNav() {
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) closeMobileNav();
  });
}

// ============================================================
// EVENT DELEGATION — nav links
// ============================================================

function setupNavLinks() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      const page = el.dataset.page;
      if (PAGES.includes(page)) {
        e.preventDefault();
        location.hash = page;
      }
    });
  });
}

// ============================================================
// INIT
// ============================================================

// ============================================================
// THEME TOGGLE
// ============================================================

async function init() {
  Modal.init();
  Tooltip.init();
  setupMobileNav();

  try {
    await loadData();
    buildTermRegistry();
  } catch (err) {
    document.getElementById('app').innerHTML = `
      <div class="loading-screen">
        <div class="loading-sigil" style="animation:none;opacity:.4">⚠</div>
        <p class="loading-text">Erreur de chargement des données</p>
        <p style="color:var(--text3);font-size:.85rem;margin-top:.5rem">${escHtml(err.message)}</p>
        <p style="color:var(--text-faint);font-size:.8rem;margin-top:1rem">
          Lancez un serveur local : <code style="background:var(--surface2);padding:.2rem .5rem;border-radius:4px">python3 -m http.server 8080</code>
        </p>
      </div>`;
    return;
  }

  setupNavLinks();

  // Hash routing
  window.addEventListener('hashchange', () => navigate(getHashPage()));
  navigate(getHashPage());
}

document.addEventListener('DOMContentLoaded', init);
