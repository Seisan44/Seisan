// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  await loadAllData();
  initNav();
  initClasses();
  initRaces();
  initSorts();
  initGlossaire();
  initFiche();
  initTooltip();
});

// ===== NAVIGATION =====
function initNav() {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.nav-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabId);
    b.setAttribute('aria-selected', b.dataset.tab === tabId ? 'true' : 'false');
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'tab-' + tabId);
  });
}

// ===== CLASSES =====
function initClasses() {
  const data = window.DND_DATA.classes;
  if (!data) return;
  const classes = data.classes;
  const grid = document.getElementById('classes-grid');
  const detail = document.getElementById('class-detail');

  function render(list) {
    grid.innerHTML = list.map(c => `
      <div class="class-card" data-id="${c.id}" style="--class-color:${c.couleur}">
        <span class="card-emoji">${c.emoji}</span>
        <div class="card-name">${c.nom}</div>
        <div class="card-role">${c.role}</div>
        <div class="difficulty-badge diff-${c.difficulte}">${c.difficulte_label}</div>
        <div class="card-desc">${c.accroche}</div>
        <div class="card-tags">${c.roles_tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    `).join('');
    grid.querySelectorAll('.class-card').forEach(card => {
      card.addEventListener('click', () => {
        const cls = classes.find(c => c.id === card.dataset.id);
        showClassDetail(cls, detail, grid);
      });
    });
  }

  render(classes);

  // Search
  document.getElementById('classes-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const diff = document.querySelector('.filter-btn.active[data-filter]')?.dataset.filter || 'all';
    filterClasses(classes, q, diff, render);
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = document.getElementById('classes-search').value.toLowerCase();
      filterClasses(classes, q, btn.dataset.filter, render);
    });
  });
}

function filterClasses(classes, q, diff, render) {
  let list = classes;
  if (q) list = list.filter(c =>
    c.nom.toLowerCase().includes(q) ||
    c.role.toLowerCase().includes(q) ||
    c.roles_tags.some(t => t.toLowerCase().includes(q))
  );
  if (diff !== 'all') list = list.filter(c => String(c.difficulte) === diff);
  render(list);
}

function showClassDetail(cls, detail, grid) {
  detail.classList.remove('hidden');
  detail.innerHTML = buildClassDetail(cls);
  detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  detail.querySelector('.detail-close').addEventListener('click', () => detail.classList.add('hidden'));
  detail.querySelectorAll('.detail-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      detail.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      detail.querySelectorAll('.detail-content > div').forEach(p => p.classList.remove('active'));
      detail.querySelector('#dtab-' + tab.dataset.dtab)?.classList.add('active');
    });
  });
}

function buildClassDetail(c) {
  const hasSorts = c.sorts?.lanceur_de_sorts;
  return `
    <button class="detail-close" title="Fermer">✕</button>
    <div class="detail-header">
      ${c.image ? `<img src="${c.image}" alt="${c.nom}" class="detail-header-img" loading="lazy">` : ''}
      <div class="detail-header-info">
        <h2>${c.emoji} ${c.nom}</h2>
        <div class="detail-sub">${c.description_courte}</div>
        <div class="detail-tags">
          <span class="difficulty-badge diff-${c.difficulte}">${c.difficulte_label}</span>
          ${c.roles_tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
    <div class="detail-tabs">
      <button class="detail-tab active" data-dtab="overview">Présentation</button>
      <button class="detail-tab" data-dtab="capacites">Capacités</button>
      <button class="detail-tab" data-dtab="progression">Progression</button>
      ${hasSorts ? `<button class="detail-tab" data-dtab="sorts">Sorts</button>` : ''}
      <button class="detail-tab" data-dtab="sousclasses">Sous-classes</button>
      <button class="detail-tab" data-dtab="conseils">Conseils</button>
    </div>
    <div class="detail-content">
      <div id="dtab-overview" class="active">
        <div class="info-grid">
          <div class="info-block"><div class="info-label">Dé de vie</div><div class="info-value">${c.de_vie.de} ${c.de_vie.meilleur_du_jeu ? '⭐ Meilleur du jeu' : ''}</div></div>
          <div class="info-block"><div class="info-label">Caract. principale</div><div class="info-value">${c.caracteristiques.principale}</div></div>
          <div class="info-block"><div class="info-label">Jets de sauvegarde</div><div class="info-value">${c.caracteristiques.jets_sauvegarde.join(', ')}</div></div>
          <div class="info-block"><div class="info-label">Armures</div><div class="info-value">${c.maitrise.armures.join(', ') || '—'}</div></div>
          <div class="info-block"><div class="info-label">Armes</div><div class="info-value">${c.maitrise.armes.join(', ')}</div></div>
          <div class="info-block"><div class="info-label">Compétences (choix ${c.caracteristiques.nb_competences})</div><div class="info-value" style="font-size:0.78rem">${c.caracteristiques.competences_disponibles.join(', ')}</div></div>
        </div>
        <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.6;margin-bottom:1rem">${c.description_longue}</p>
        <div class="info-block" style="margin-bottom:0.7rem">
          <div class="info-label">Archétypes typiques</div>
          <div class="info-value" style="font-size:0.82rem">${c.fantaisie}</div>
        </div>
        <h4 style="color:var(--text-muted);font-size:0.75rem;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem">Équipement de départ</h4>
        ${c.equipement_depart.map(opt => `
          <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:.3rem">
            <strong style="color:var(--text-primary)">Option ${opt.option} :</strong> ${opt.items.join(', ')}
          </div>`).join('')}
      </div>

      <div id="dtab-capacites">
        <div class="capacites-list">
          ${c.capacites_cles.map(cap => `
            <div class="capacite-item">
              <div class="capacite-header">
                <span class="capacite-name">${cap.nom}</span>
                <span class="capacite-niveau">Niv. ${cap.niveau}</span>
                <span class="capacite-type ${cap.type}">${cap.type}</span>
                ${cap.tags.map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
              <div class="capacite-resume">${cap.resume}</div>
            </div>`).join('')}
        </div>
      </div>

      <div id="dtab-progression">
        <div style="overflow-x:auto">
        <table class="progression-table">
          <thead><tr>
            <th>Niv.</th><th>BM</th>
            ${buildProgressionHeaders(c)}
            <th>Capacités</th>
          </tr></thead>
          <tbody>
            ${c.progression.map(p => `<tr>
              <td><strong>${p.niveau}</strong></td>
              <td>+${p.bonus_maitrise}</td>
              ${buildProgressionCells(c, p)}
              <td style="font-size:0.75rem;color:var(--text-muted)">${(p.capacites||[]).join(', ') || '—'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
        </div>
      </div>

      ${hasSorts ? buildSortsTab(c) : ''}

      <div id="dtab-sousclasses">
        <div class="sous-classes-grid">
          ${c.sous_classes.map(sc => `
            <div class="sous-classe-card">
              ${sc.image ? `<img src="${sc.image}" alt="${sc.nom}" loading="lazy">` : ''}
              <div class="sous-classe-name">${sc.nom}</div>
              <div class="sous-classe-style">${sc.style}</div>
              <div class="sous-classe-resume">${sc.resume}</div>
            </div>`).join('')}
        </div>
      </div>

      <div id="dtab-conseils">
        <div class="conseils-section">
          <div class="conseil-block">
            <h4>💡 Conseil principal</h4>
            <p style="font-size:0.85rem;color:var(--text-muted)">${c.comment_jouer.conseil_principal}</p>
          </div>
          <div style="display:flex;gap:.8rem;flex-wrap:wrap">
            <div class="conseil-block" style="flex:1;min-width:200px">
              <h4>✅ Points forts</h4>
              <ul class="points-list">${c.comment_jouer.points_forts.map(p => `<li>${p}</li>`).join('')}</ul>
            </div>
            <div class="conseil-block" style="flex:1;min-width:200px">
              <h4>⚠️ Points faibles</h4>
              <ul class="points-list neg">${c.comment_jouer.points_faibles.map(p => `<li>${p}</li>`).join('')}</ul>
            </div>
          </div>
          <div class="conseil-block">
            <h4>🎭 Style de jeu</h4>
            <p style="font-size:0.85rem;color:var(--text-muted)">${c.comment_jouer.style_jeu}</p>
          </div>
          <div class="conseil-block">
            <h4>📊 Caractéristiques prioritaires</h4>
            <div class="caracteristiques-prio">${c.comment_jouer.caracteristiques_prioritaires.map(s => `<span class="prio-badge">${s}</span>`).join('')}</div>
          </div>
          <div class="conseil-block">
            <h4>👤 Pour qui ?</h4>
            <p style="font-size:0.85rem;color:var(--text-muted)">${c.comment_jouer.pour_qui}</p>
          </div>
        </div>
      </div>
    </div>`;
}

function buildProgressionHeaders(c) {
  const p0 = c.progression[0];
  const headers = [];
  if ('rages' in p0) headers.push('<th>Rages</th><th>Dég. Rage</th>');
  else if ('sorts_mineurs' in p0) headers.push('<th>Sorts min.</th><th>Sorts prép.</th>');
  else if ('points_ki' in p0) headers.push('<th>Ki</th><th>Arts (dé)</th>');
  else if ('second_souffle' in p0) headers.push('<th>2nd Souffle</th>');
  else if ('sorts_connus' in p0) headers.push('<th>Sorts min.</th><th>Connus</th><th>Pts Sorc.</th>');
  else if ('formes_sauvages' in p0) headers.push('<th>Formes S.</th><th>Sorts min.</th><th>Sorts prép.</th>');
  return headers.join('');
}

function buildProgressionCells(c, p) {
  const p0 = c.progression[0];
  if ('rages' in p0) return `<td>${p.rages}</td><td>${p.degats_rage}</td>`;
  if ('sorts_mineurs' in p0 && 'sorts_prepares' in p0 && !('sorts_connus' in p0)) return `<td>${p.sorts_mineurs}</td><td>${p.sorts_prepares}</td>`;
  if ('points_ki' in p0) return `<td>${p.points_ki}</td><td>${p.de_arts_martiaux||'—'}</td>`;
  if ('second_souffle' in p0 && !('sorts_mineurs' in p0)) return `<td>${p.second_souffle}</td>`;
  if ('sorts_connus' in p0) return `<td>${p.sorts_mineurs}</td><td>${p.sorts_connus}</td><td>${p.points_sorcellerie}</td>`;
  if ('formes_sauvages' in p0) return `<td>${p.formes_sauvages}</td><td>${p.sorts_mineurs}</td><td>${p.sorts_prepares}</td>`;
  return '';
}

function buildSortsTab(c) {
  const s = c.sorts;
  return `<div id="dtab-sorts">
    <div class="info-grid">
      <div class="info-block"><div class="info-label">Type</div><div class="info-value">${s.type}</div></div>
      <div class="info-block"><div class="info-label">Caractéristique</div><div class="info-value">${s.caracteristique}</div></div>
      <div class="info-block"><div class="info-label">Récupération</div><div class="info-value">${s.recuperation}</div></div>
      <div class="info-block"><div class="info-label">Sorts mineurs niv.1</div><div class="info-value">${s.sorts_mineurs_niv1}</div></div>
      <div class="info-block"><div class="info-label">Sorts préparés niv.1</div><div class="info-value">${s.sorts_prepares_niv1}</div></div>
    </div>
    ${s.note ? `<div class="conseil-block" style="margin:0.7rem 0"><p style="font-size:0.82rem;color:var(--text-muted)">${s.note}</p></div>` : ''}
    <h4 style="color:var(--text-muted);font-size:0.75rem;text-transform:uppercase;letter-spacing:.05em;margin:0.8rem 0 .5rem">Sorts recommandés pour débutants</h4>
    <div class="card-tags">
      ${(s.sorts_recommandes_debutants||[]).map(n => `<span class="tag tag-blue">${n}</span>`).join('')}
    </div>
  </div>`;
}

// ===== RACES =====
function initRaces() {
  const data = window.DND_DATA.races;
  if (!data) return;
  const species = data.species;
  const grid = document.getElementById('races-grid');
  const detail = document.getElementById('race-detail');

  function render(list) {
    grid.innerHTML = list.map(r => `
      <div class="race-card" data-id="${r.id}">
        <div class="card-name">${r.name}</div>
        <div class="card-role">${r.size === 'P' ? 'Petite taille' : r.size === 'M' ? 'Taille moyenne' : r.size} · ${r.speed}</div>
        <div class="card-desc">${r.overview}</div>
        <div class="card-tags">${r.traits.slice(0,3).map(t => `<span class="tag">${t.name}</span>`).join('')}</div>
      </div>`).join('');
    grid.querySelectorAll('.race-card').forEach(card => {
      card.addEventListener('click', () => {
        const race = species.find(r => r.id === card.dataset.id);
        showRaceDetail(race, detail);
      });
    });
  }

  render(species);

  document.getElementById('races-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    render(species.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.overview.toLowerCase().includes(q) ||
      r.traits.some(t => t.name.toLowerCase().includes(q))
    ));
  });
}

function showRaceDetail(r, detail) {
  detail.classList.remove('hidden');
  detail.innerHTML = `
    <button class="detail-close" title="Fermer">✕</button>
    <div class="detail-header">
      <div class="detail-header-info">
        <h2>${r.name}</h2>
        <div class="detail-sub">${r.type} · Taille ${r.size} · Vitesse ${r.speed}</div>
      </div>
    </div>
    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;line-height:1.6">${r.overview}</p>
    <h4 style="color:var(--gold);font-size:0.82rem;margin-bottom:.6rem">Traits raciaux</h4>
    <div class="capacites-list">
      ${r.traits.map(t => `
        <div class="capacite-item">
          <div class="capacite-header"><span class="capacite-name">${t.name}</span></div>
          <div class="capacite-resume">${t.description}</div>
        </div>`).join('')}
    </div>
    ${r.subspecies ? `
      <h4 style="color:var(--gold);font-size:0.82rem;margin:1rem 0 .6rem">Sous-espèces</h4>
      <div class="sous-classes-grid">
        ${r.subspecies.map(ss => `
          <div class="sous-classe-card">
            <div class="sous-classe-name">${ss.name}</div>
            ${ss.traits.map(t => `
              <div style="margin-top:.4rem">
                <div class="capacite-name" style="font-size:.82rem">${t.name}</div>
                <div class="capacite-resume">${t.description}</div>
              </div>`).join('')}
          </div>`).join('')}
      </div>` : ''}
  `;
  detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  detail.querySelector('.detail-close').addEventListener('click', () => detail.classList.add('hidden'));
}

// ===== SORTS =====
function initSorts() {
  const sorts = window.DND_DATA.sorts;
  if (!sorts) return;

  // Populate filters
  const ecoles = [...new Set(sorts.map(s => s.ecole))].sort();
  const classes = [...new Set(sorts.flatMap(s => s.classes))].sort();
  const selEcole = document.getElementById('sorts-ecole');
  const selClasse = document.getElementById('sorts-classe');
  ecoles.forEach(e => selEcole.appendChild(new Option(e, e)));
  classes.forEach(c => selClasse.appendChild(new Option(c, c)));

  function render(list) {
    const container = document.getElementById('sorts-list');
    document.getElementById('sorts-count').textContent = `${list.length} sort${list.length > 1 ? 's' : ''} trouvé${list.length > 1 ? 's' : ''}`;
    container.innerHTML = list.map(s => buildSortItem(s)).join('');
    container.querySelectorAll('.sort-header').forEach(h => {
      h.addEventListener('click', () => h.closest('.sort-item').classList.toggle('open'));
    });
  }

  function applyFilters() {
    const q = document.getElementById('sorts-search').value.toLowerCase();
    const niv = document.getElementById('sorts-niveau').value;
    const ecole = document.getElementById('sorts-ecole').value;
    const classe = document.getElementById('sorts-classe').value;
    const conc = document.getElementById('sorts-concentration').checked;
    let list = sorts;
    if (q) list = list.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    if (niv !== '') list = list.filter(s => String(s.niveau) === niv);
    if (ecole) list = list.filter(s => s.ecole === ecole);
    if (classe) list = list.filter(s => s.classes.includes(classe));
    if (conc) list = list.filter(s => s.concentration);
    render(list);
  }

  render(sorts);
  ['sorts-search','sorts-niveau','sorts-ecole','sorts-classe','sorts-concentration'].forEach(id => {
    document.getElementById(id).addEventListener('input', applyFilters);
    document.getElementById(id).addEventListener('change', applyFilters);
  });
}

function buildSortItem(s) {
  const niv = s.niveau === '0' ? 'Mineur' : `Niv.${s.niveau}`;
  return `<div class="sort-item">
    <div class="sort-header">
      <span class="sort-niveau-badge niveau-${s.niveau}">${niv}</span>
      <span class="sort-name">${s.name}</span>
      <span class="sort-ecole">${s.ecole}</span>
      <div class="sort-tags">
        ${s.concentration ? `<span class="sort-tag-conc">Concentration</span>` : ''}
      </div>
      <span class="sort-chevron">▶</span>
    </div>
    <div class="sort-body">
      <div class="sort-meta">
        <div class="sort-meta-item"><strong>Temps :</strong> ${s.temps}</div>
        <div class="sort-meta-item"><strong>Portée :</strong> ${s.portee}</div>
        <div class="sort-meta-item"><strong>Durée :</strong> ${s.duree}</div>
        <div class="sort-meta-item"><strong>Composants :</strong> ${s.composants.join(', ')}</div>
      </div>
      <div class="sort-desc">${s.description.replace(/\n/g, '<br>')}</div>
      <div class="sort-classes">${s.classes.map(c => `<span class="sort-class-tag">${c}</span>`).join('')}</div>
    </div>
  </div>`;
}

// ===== GLOSSAIRE =====
function initGlossaire() {
  const data = window.DND_DATA.glossaire;
  if (!data) return;

  // Build master list from all sections
  const allItems = [
    ...data.glossaire.map(g => ({ ...g, section: 'glossaire', cat: g.categorie })),
    ...data.actions.map(g => ({ ...g, cat: 'action', section: 'actions' })),
    ...data.etats.map(g => ({ ...g, cat: 'etat', section: 'etats' })),
  ];

  // Build lookup map for tooltips
  window.GLOSSAIRE_MAP = {};
  allItems.forEach(item => { window.GLOSSAIRE_MAP[item.id] = item; });

  function render(list) {
    const container = document.getElementById('glossaire-list');
    document.getElementById('glossaire-count').textContent = `${list.length} terme${list.length > 1 ? 's' : ''}`;
    container.innerHTML = list.map(g => buildGlossaireItem(g)).join('');
    container.querySelectorAll('.glossaire-header').forEach(h => {
      h.addEventListener('click', () => h.closest('.glossaire-item').classList.toggle('open'));
    });
    container.querySelectorAll('.glossaire-link').forEach(link => {
      link.addEventListener('click', e => {
        e.stopPropagation();
        const targetId = link.dataset.target;
        const el = document.querySelector(`.glossaire-item[data-id="${targetId}"]`);
        if (el) { el.classList.add('open'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      });
    });
  }

  function applyFilters() {
    const q = document.getElementById('glossaire-search').value.toLowerCase();
    const cat = document.querySelector('.filter-btn.active[data-gfilter]')?.dataset.gfilter || 'all';
    let list = allItems;
    if (q) list = list.filter(g =>
      g.terme.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      (g.anglais || '').toLowerCase().includes(q)
    );
    if (cat !== 'all') list = list.filter(g => g.cat === cat);
    render(list);
  }

  render(allItems);

  document.getElementById('glossaire-search').addEventListener('input', applyFilters);
  document.querySelectorAll('.filter-btn[data-gfilter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-gfilter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });
}

function buildGlossaireItem(g) {
  const links = [...(g.voir_aussi || [])];
  return `<div class="glossaire-item" data-id="${g.id}">
    <div class="glossaire-header">
      <span class="glossaire-terme">${g.terme}</span>
      ${g.anglais ? `<span class="glossaire-en">${g.anglais}</span>` : ''}
      <span class="glossaire-cat ${g.cat}">${g.cat}</span>
      <span class="sort-chevron">▶</span>
    </div>
    <div class="glossaire-body">
      <div class="glossaire-desc">${linkifyGlossaire(g.description)}</div>
      ${links.length ? `<div class="glossaire-links">
        <span style="font-size:.7rem;color:var(--text-muted)">Voir aussi :</span>
        ${links.map(id => `<span class="glossaire-link" data-target="${id}">${getTerme(id)}</span>`).join('')}
      </div>` : ''}
    </div>
  </div>`;
}

function getTerme(id) {
  return window.GLOSSAIRE_MAP?.[id]?.terme || id;
}

function linkifyGlossaire(text) {
  return text.replace(/#([a-z0-9-]+)#/g, (match, id) => {
    const terme = getTerme(id);
    return `<span class="gloss-term" data-gloss="${id}">${terme}</span>`;
  });
}

// ===== TOOLTIP GLOSSAIRE =====
function initTooltip() {
  const tooltip = document.getElementById('tooltip');
  let hideTimer;

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('[data-gloss]');
    if (!el) return;
    clearTimeout(hideTimer);
    const id = el.dataset.gloss;
    const item = window.GLOSSAIRE_MAP?.[id];
    if (!item) return;
    tooltip.innerHTML = `<div class="tooltip-terme">${item.terme}</div><div class="tooltip-desc">${item.description.replace(/#([a-z0-9-]+)#/g, (_, id2) => getTerme(id2))}</div>`;
    tooltip.classList.remove('hidden');
    positionTooltip(e, tooltip);
  });

  document.addEventListener('mousemove', e => {
    if (!tooltip.classList.contains('hidden')) positionTooltip(e, tooltip);
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest('[data-gloss]')) {
      hideTimer = setTimeout(() => tooltip.classList.add('hidden'), 200);
    }
  });
}

function positionTooltip(e, tooltip) {
  const x = e.clientX + 14;
  const y = e.clientY + 14;
  const rect = tooltip.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  tooltip.style.left = (x + rect.width > vw ? vw - rect.width - 10 : x) + 'px';
  tooltip.style.top = (y + rect.height > vh ? e.clientY - rect.height - 8 : y) + 'px';
}

// ===== FICHE DE PERSONNAGE =====
const COMPETENCES = [
  { nom: 'Acrobaties',    stat: 'dex' },
  { nom: 'Arcanes',       stat: 'int' },
  { nom: 'Athlétisme',    stat: 'for' },
  { nom: 'Discrétion',    stat: 'dex' },
  { nom: 'Dressage',      stat: 'sag' },
  { nom: 'Escamotage',    stat: 'dex' },
  { nom: 'Histoire',      stat: 'int' },
  { nom: 'Intimidation',  stat: 'cha' },
  { nom: 'Investigation', stat: 'int' },
  { nom: 'Intuition',     stat: 'sag' },
  { nom: 'Médecine',      stat: 'sag' },
  { nom: 'Nature',        stat: 'int' },
  { nom: 'Perception',    stat: 'sag' },
  { nom: 'Persuasion',    stat: 'cha' },
  { nom: 'Religion',      stat: 'int' },
  { nom: 'Représentation',stat: 'cha' },
  { nom: 'Survie',        stat: 'sag' },
  { nom: 'Tromperie',     stat: 'cha' },
];

const STATS_LIST = ['for','dex','con','int','sag','cha'];

function getMod(score) { return Math.floor((score - 10) / 2); }
function fmtMod(mod) { return (mod >= 0 ? '+' : '') + mod; }
function getBM(niveau) {
  return Math.ceil(niveau / 4) + 1;
}

function initFiche() {
  // Populate class and race selects
  const classes = window.DND_DATA.classes?.classes || [];
  const races = window.DND_DATA.races?.species || [];
  const selClasse = document.getElementById('f-classe');
  const selRace = document.getElementById('f-race');
  classes.forEach(c => selClasse.appendChild(new Option(`${c.emoji} ${c.nom}`, c.id)));
  races.forEach(r => selRace.appendChild(new Option(r.name, r.id)));

  // Build competences and saves lists
  buildSkillsList();

  // Live calculations
  document.querySelectorAll('.stat-score').forEach(input => {
    input.addEventListener('input', updateDerivedStats);
  });
  document.getElementById('f-niveau').addEventListener('input', updateDerivedStats);
  document.getElementById('f-classe').addEventListener('change', updateClassInfo);
  updateDerivedStats();
  addAttack(); // one default row
}

function buildSkillsList() {
  const savesList = document.getElementById('sauvegardes-list');
  const skillsList = document.getElementById('competences-list');

  savesList.innerHTML = STATS_LIST.map(s => `
    <div class="save-row">
      <input type="checkbox" id="save-${s}" data-save="${s}">
      <span class="skill-stat">${s.toUpperCase()}</span>
      <span class="skill-name">${statNom(s)}</span>
      <span class="skill-bonus" id="save-bonus-${s}">+0</span>
    </div>`).join('');

  skillsList.innerHTML = COMPETENCES.map(c => `
    <div class="skill-row">
      <input type="checkbox" id="comp-${c.nom}" data-comp="${c.nom}" data-stat="${c.stat}">
      <span class="skill-stat">${c.stat.toUpperCase()}</span>
      <span class="skill-name">${c.nom}</span>
      <span class="skill-bonus" id="comp-bonus-${c.nom}">+0</span>
    </div>`).join('');

  document.querySelectorAll('[data-save],[data-comp]').forEach(cb => {
    cb.addEventListener('change', updateDerivedStats);
  });
}

function statNom(s) {
  return { for:'Force', dex:'Dextérité', con:'Constitution', int:'Intelligence', sag:'Sagesse', cha:'Charisme' }[s];
}

function updateDerivedStats() {
  const scores = {};
  STATS_LIST.forEach(s => {
    const val = parseInt(document.querySelector(`[data-stat="${s}"]`)?.value) || 10;
    scores[s] = val;
    const mod = getMod(val);
    const el = document.getElementById('mod-' + s);
    if (el) el.textContent = fmtMod(mod);
  });

  const niveau = parseInt(document.getElementById('f-niveau')?.value) || 1;
  const bm = getBM(niveau);
  document.getElementById('f-bm').textContent = '+' + bm;
  document.getElementById('f-init').textContent = fmtMod(getMod(scores.dex));

  // Saves
  STATS_LIST.forEach(s => {
    const cb = document.getElementById('save-' + s);
    const mod = getMod(scores[s]) + (cb?.checked ? bm : 0);
    const el = document.getElementById('save-bonus-' + s);
    if (el) el.textContent = fmtMod(mod);
  });

  // Competences
  COMPETENCES.forEach(c => {
    const cb = document.getElementById('comp-' + c.nom);
    const mod = getMod(scores[c.stat]) + (cb?.checked ? bm : 0);
    const el = document.getElementById('comp-bonus-' + c.nom);
    if (el) el.textContent = fmtMod(mod);
  });
}

function updateClassInfo() {
  const classId = document.getElementById('f-classe').value;
  const classes = window.DND_DATA.classes?.classes || [];
  const cls = classes.find(c => c.id === classId);
  if (!cls) return;

  // Set dé de vie
  document.getElementById('f-dv').value = `1d${cls.de_vie.valeur}`;

  // Sorts info
  const sortsSection = document.getElementById('fiche-sorts-section');
  const sortsInfo = document.getElementById('sorts-fiche-info');
  if (cls.sorts?.lanceur_de_sorts) {
    sortsSection.style.display = '';
    const caract = cls.sorts.caracteristique?.toLowerCase().slice(0, 3) || '—';
    document.getElementById('f-sort-caract').value = cls.sorts.caracteristique || '—';
    sortsInfo.textContent = `${cls.nom} · ${cls.sorts.type} · Récup : ${cls.sorts.recuperation}`;
    buildSortsSlots(cls);
    updateSortsCalc(caract);
  } else {
    sortsSection.style.display = 'none';
  }
}

function buildSortsSlots(cls) {
  const container = document.getElementById('sorts-slots');
  const niveaux = [1,2,3,4,5];
  container.innerHTML = niveaux.map(n => `
    <div class="slot-group">
      <div class="slot-label">Niv. ${n}</div>
      <div class="slot-count">
        <input type="number" id="slot-used-${n}" min="0" max="9" value="0" title="Utilisés">
        <span>/</span>
        <input type="number" id="slot-max-${n}" min="0" max="9" value="0" title="Max">
      </div>
    </div>`).join('');
}

function updateSortsCalc(caract) {
  // caract = first 3 chars of stat key
  const statKey = { 'int':'int', 'sag':'sag', 'cha':'cha', 'Intelligence':'int', 'Sagesse':'sag', 'Charisme':'cha' }[caract] || caract;
  const score = parseInt(document.querySelector(`[data-stat="${statKey}"]`)?.value) || 10;
  const niveau = parseInt(document.getElementById('f-niveau')?.value) || 1;
  const bm = getBM(niveau);
  const mod = getMod(score);
  document.getElementById('f-sort-dd').textContent = 8 + bm + mod;
  document.getElementById('f-sort-atk').textContent = fmtMod(bm + mod);
}

let attackCount = 0;
function addAttack() {
  attackCount++;
  const id = attackCount;
  const list = document.getElementById('attacks-list');
  const row = document.createElement('div');
  row.className = 'attack-row';
  row.id = 'attack-' + id;
  row.innerHTML = `
    <input type="text" placeholder="Épée longue" aria-label="Nom de l'attaque">
    <input type="text" placeholder="+5" aria-label="Bonus d'attaque">
    <input type="text" placeholder="1d8+3" aria-label="Dégâts">
    <input type="text" placeholder="Tranchant" aria-label="Type de dégâts">
    <input type="text" placeholder="Notes…" aria-label="Notes">
    <button class="attack-del" onclick="removeAttack(${id})" title="Supprimer">✕</button>`;
  list.appendChild(row);
}

function removeAttack(id) {
  document.getElementById('attack-' + id)?.remove();
}

function resetFiche() {
  if (!confirm('Réinitialiser la fiche ? Toutes les données seront perdues.')) return;
  document.querySelectorAll('#tab-fiche input, #tab-fiche textarea, #tab-fiche select').forEach(el => {
    if (el.type === 'checkbox') el.checked = false;
    else if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else if (el.type === 'number') el.value = el.min || 0;
    else el.value = '';
  });
  document.getElementById('f-niveau').value = 1;
  document.getElementById('f-vitesse').value = '9 m';
  document.querySelectorAll('.stat-score').forEach(i => i.value = 10);
  document.getElementById('attacks-list').innerHTML = `<div class="attacks-header">
    <span>Arme / Sort</span><span>Bonus d'attaque</span><span>Dégâts</span><span>Type</span><span>Notes</span><span></span>
  </div>`;
  attackCount = 0;
  updateDerivedStats();
  addAttack();
}

function printFiche() {
  window.print();
}
