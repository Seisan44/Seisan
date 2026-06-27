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
  data: { species: null, classes: null, dons: null, glossaire: null, sorts: null, races: null, armes: null, armures: null, materiels: null, outils: null, objetsMagiques: null },
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

const PAGES = ['accueil', 'races', 'classes', 'dons', 'glossaire', 'sorts', 'equipements', 'combat', 'personnage'];

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
    <div class="card-header">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem">
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

function renderPersonnage(container) {
  container.innerHTML = `
  <div class="page">
    <div class="soon-page">
      <span class="soon-icon" aria-hidden="true">♟</span>
      <h1 class="soon-title">Fiche de personnage</h1>
      <p class="soon-text">Cette section est en cours de développement et sera disponible prochainement.</p>
    </div>
  </div>`;
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
