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
  initModal();
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
              <td style="font-size:0.75rem;color:var(--text-muted)">${(p.capacites || []).join(', ') || '—'}</td>
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
  if ('points_ki' in p0) return `<td>${p.points_ki}</td><td>${p.de_arts_martiaux || '—'}</td>`;
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
      ${(s.sorts_recommandes_debutants || []).map(n => `<span class="tag tag-blue">${n}</span>`).join('')}
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
        <div class="card-tags">${r.traits.slice(0, 3).map(t => `<span class="tag">${t.name}</span>`).join('')}</div>
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

  // Construire les données de mise en évidence (nécessite window.DND_DATA.glossaire)
  buildSortTermsData();

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
    container.querySelectorAll('.sort-item').forEach((item, i) => {
      item.addEventListener('click', () => openSortModal(list[i]));
    });
  }

  function applyFilters() {
    const q = document.getElementById('sorts-search').value.toLowerCase();
    const niv = document.getElementById('sorts-niveau').value;
    const ecole = document.getElementById('sorts-ecole').value;
    const classe = document.getElementById('sorts-classe').value;
    const conc = document.getElementById('sorts-concentration').checked;
    let list = sorts;
    if (q) list = list.filter(s =>
      s.name.toLowerCase().includes(q) ||
      (s.description || '').toLowerCase().includes(q) ||
      (s.description_resume || '').toLowerCase().includes(q)
    );
    if (niv !== '') list = list.filter(s => String(s.niveau) === niv);
    if (ecole) list = list.filter(s => s.ecole === ecole);
    if (classe) list = list.filter(s => s.classes.includes(classe));
    if (conc) list = list.filter(s => s.concentration);
    render(list);
  }

  render(sorts);
  ['sorts-search', 'sorts-niveau', 'sorts-ecole', 'sorts-classe', 'sorts-concentration'].forEach(id => {
    document.getElementById(id).addEventListener('input', applyFilters);
    document.getElementById(id).addEventListener('change', applyFilters);
  });

  // Initialiser la barre de préférence de mode d'affichage
  const pills = document.querySelectorAll('.desc-mode-pill');
  const savedMode = getDescMode();
  pills.forEach(pill => {
    pill.classList.toggle('active', pill.dataset.mode === savedMode);
    pill.addEventListener('click', () => {
      setDescMode(pill.dataset.mode);
      pills.forEach(p => p.classList.toggle('active', p.dataset.mode === pill.dataset.mode));
    });
  });
}

function buildSortItem(s) {
  const niv = s.niveau === '0' ? 'Mineur' : `Niv.${s.niveau}`;
  const nameParts = s.name.split('|');
  const mainName = nameParts[0].trim();
  const altName = nameParts.length > 1 ? nameParts.slice(1).map(p => p.trim()).join(' / ') : null;
  const ec = getSortEcoleConfig(s.ecole);
  const preview = getSortPreview(s);
  const dureeShort = formatDuration(s.duree);
  return `<div class="sort-item" style="--ecole-color:${ec.color};--ecole-bg:${ec.bg}">
    <div class="sort-card-body">
      <div class="sort-card-toprow">
        <span class="sort-niveau-badge niveau-${s.niveau}">${niv}</span>
        <span class="sort-ecole-tag">${ec.emoji} ${s.ecole}</span>
        ${s.concentration ? `<span class="sort-tag-conc">◉ Conc.</span>` : ''}
      </div>
      <div class="sort-card-name">${mainName}${altName ? ` <span class="sort-name-alt">/ ${altName}</span>` : ''}</div>
      <div class="sort-card-meta">
        <span class="sort-meta-pill">⚡ ${s.temps}</span>
        <span class="sort-meta-pill">🎯 ${s.portee}</span>
        <span class="sort-meta-pill">⏱ ${dureeShort}</span>
      </div>
      ${preview ? `<div class="sort-card-preview">${preview}</div>` : ''}
      <div class="sort-card-classes">
        ${s.classes.map(c => `<span class="sort-card-class">${c}</span>`).join('')}
      </div>
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
    container.querySelectorAll('.glossaire-item').forEach((item, i) => {
      item.addEventListener('click', () => openGlossaireModal(list[i]));
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
  const cat = CAT_CONFIG[g.cat] || { emoji: '📖', label: g.cat };
  const excerpt = getGlossaireExcerpt(g.description);
  return `<div class="glossaire-item" data-id="${g.id}">
    <div class="glossaire-card-header">
      <div class="glossaire-cat-icon">${cat.emoji}</div>
      <div class="glossaire-card-info">
        <div class="glossaire-terme-row">
          <span class="glossaire-terme">${g.terme}</span>
          <span class="glossaire-cat ${g.cat}">${cat.label}</span>
        </div>
        ${g.anglais ? `<span class="glossaire-en">${g.anglais}</span>` : ''}
      </div>
    </div>
    ${excerpt ? `<div class="glossaire-excerpt">${excerpt}</div>` : ''}
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

// ===== MODALE FLOTTANTE =====
function initModal() {
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function showModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function openSortModal(s) {
  const niv = s.niveau === '0' ? 'Sort mineur' : `Niveau ${s.niveau}`;

  // Nom avec pipe (nouveau | ancien)
  const nameParts = s.name.split('|');
  const mainName = nameParts[0].trim();
  const altName = nameParts.length > 1 ? nameParts.slice(1).map(p => p.trim()).join(' / ') : null;

  // Description résumée : liste structurée + termes mis en évidence
  const descResumeHtml = formatSortDesc(s.description_resume);

  // Description complète : paragraphe avec termes mis en évidence
  const descCompleteHtml = s.description
    ? s.description.split('\n').filter(Boolean).map(l => `<p class="sort-desc-para">${highlightSortTerms(l)}</p>`).join('')
    : '<p class="sort-desc-para" style="color:var(--text-subtle);font-style:italic">Description complète non disponible.</p>';

  // Amélioration par niveau
  const ameliorationHtml = s.amelioration
    ? `<div class="sort-amelioration"><strong>⬆ Amélioration :</strong> ${highlightSortTerms(s.amelioration)}</div>`
    : '';

  const mode = getDescMode();

  showModal(`
    <div class="modal-badges">
      <span class="sort-niveau-badge niveau-${s.niveau}">${niv}</span>
      ${s.concentration ? `<span class="sort-tag-conc">Concentration</span>` : ''}
    </div>
    <div class="modal-title">
      ${mainName}${altName ? ` <span class="sort-name-alt">/ ${altName}</span>` : ''}
    </div>
    <div class="modal-subtitle">${s.ecole}</div>
    <div class="modal-desc-toggle">
      <button class="modal-desc-btn${mode === 'resume' ? ' active' : ''}" data-desc-mode="resume">📋 Résumé</button>
      <button class="modal-desc-btn${mode === 'complete' ? ' active' : ''}" data-desc-mode="complete">📜 Complet</button>
    </div>
    <hr class="modal-divider">
    <div class="sort-meta">
      <div class="sort-meta-item"><strong>Temps :</strong> ${s.temps}</div>
      <div class="sort-meta-item"><strong>Portée :</strong> ${s.portee}</div>
      <div class="sort-meta-item"><strong>Durée :</strong> ${s.duree}</div>
      <div class="sort-meta-item"><strong>Composants :</strong> ${s.composants.join(', ')}</div>
    </div>
    <hr class="modal-divider">
    <div class="sort-desc" id="modal-sort-desc">
      ${mode === 'resume' ? descResumeHtml : descCompleteHtml}
      ${ameliorationHtml}
    </div>
    <div class="sort-classes" style="margin-top:1rem">
      ${s.classes.map(c => `<span class="sort-class-tag">${c}</span>`).join('')}
    </div>
  `);

  // Toggle résumé / complet
  document.querySelectorAll('.modal-desc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newMode = btn.dataset.descMode;
      setDescMode(newMode);
      // Mettre à jour les boutons du modal
      document.querySelectorAll('.modal-desc-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.descMode === newMode)
      );
      // Mettre à jour le contenu
      document.getElementById('modal-sort-desc').innerHTML =
        (newMode === 'resume' ? descResumeHtml : descCompleteHtml) + ameliorationHtml;
      // Sync les pills de préférence dans l'onglet Sorts
      document.querySelectorAll('.desc-mode-pill').forEach(p =>
        p.classList.toggle('active', p.dataset.mode === newMode)
      );
      // Réattacher les handlers états dans le nouveau contenu
      attachEtatHandlers();
    });
  });

  // Rendre les termes d'état cliquables (→ modale glossaire)
  attachEtatHandlers();
}

function attachEtatHandlers() {
  document.querySelectorAll('#modal-content .term-etat[data-gloss]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const item = window.GLOSSAIRE_MAP?.[el.dataset.gloss];
      if (item) openGlossaireModal(item);
    });
  });
}

function openGlossaireModal(g) {
  showModal(`
    <div class="modal-badges">
      <span class="glossaire-cat ${g.cat}">${g.cat}</span>
    </div>
    <div class="modal-title">${g.terme}</div>
    ${g.anglais ? `<div class="modal-subtitle">${g.anglais}</div>` : ''}
    <hr class="modal-divider">
    <div class="glossaire-desc">${linkifyGlossaire(g.description)}</div>
    ${g.voir_aussi?.length ? `
      <div class="glossaire-links" style="margin-top:1rem">
        <span style="font-size:.7rem;color:var(--text-muted)">Voir aussi :</span>
        ${g.voir_aussi.map(id => `<span class="glossaire-link modal-voir-aussi" data-target="${id}">${getTerme(id)}</span>`).join('')}
      </div>` : ''}
  `);
  // Liens "Voir aussi" dans la modale → ouvre directement la modale du terme cible
  document.querySelectorAll('.modal-voir-aussi').forEach(link => {
    link.addEventListener('click', e => {
      e.stopPropagation();
      const item = window.GLOSSAIRE_MAP?.[link.dataset.target];
      if (item) openGlossaireModal(item);
    });
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
  { nom: 'Acrobaties', stat: 'dex' },
  { nom: 'Arcanes', stat: 'int' },
  { nom: 'Athlétisme', stat: 'for' },
  { nom: 'Discrétion', stat: 'dex' },
  { nom: 'Dressage', stat: 'sag' },
  { nom: 'Escamotage', stat: 'dex' },
  { nom: 'Histoire', stat: 'int' },
  { nom: 'Intimidation', stat: 'cha' },
  { nom: 'Investigation', stat: 'int' },
  { nom: 'Intuition', stat: 'sag' },
  { nom: 'Médecine', stat: 'sag' },
  { nom: 'Nature', stat: 'int' },
  { nom: 'Perception', stat: 'sag' },
  { nom: 'Persuasion', stat: 'cha' },
  { nom: 'Religion', stat: 'int' },
  { nom: 'Représentation', stat: 'cha' },
  { nom: 'Survie', stat: 'sag' },
  { nom: 'Tromperie', stat: 'cha' },
];

const STATS_LIST = ['for', 'dex', 'con', 'int', 'sag', 'cha'];

function getMod(score) { return Math.floor((score - 10) / 2); }
function fmtMod(mod) { return (mod >= 0 ? '+' : '') + mod; }
function getBM(niveau) {
  return Math.ceil(niveau / 4) + 1;
}

// ===== DESCRIPTION MODE PREFERENCE =====
const DESC_MODE_KEY = 'dnd_desc_mode';
function getDescMode() { return localStorage.getItem(DESC_MODE_KEY) || 'resume'; }
function setDescMode(mode) { localStorage.setItem(DESC_MODE_KEY, mode); }

// ===== SORT TERM HIGHLIGHTING =====
let SORT_ETAT_MAP = {};  // { terme.toLowerCase() → { id, terme } }

const SORT_DICE_REGEX = /\b\d*d(4|6|8|10|12|20)\b/gi;

// Termes mécaniques à mettre en gras (gold) — triés par longueur desc
const SORT_BOLD_TERMS = [
  'jet de sauvegarde de Dextérité',
  'jet de sauvegarde de Sagesse',
  'jet de sauvegarde de Constitution',
  'jet de sauvegarde de Charisme',
  'jet de sauvegarde de Force',
  'jet de sauvegarde d\'Intelligence',
  'jets de sauvegarde',
  'jet de sauvegarde',
  'jet d\'attaque à distance',
  'jet d\'attaque au corps à corps',
  'jet d\'attaque',
  'jets d\'attaque',
  'points de vie temporaires',
  'emplacement de sort',
  'emplacements de sort',
  'bonus de maîtrise',
  'classe d\'armure',
  'action bonus',
  'Degré de Difficulté',
  'points de vie',
  'concentration',
  'avantage',
  'désavantage',
  'réaction',
  'initiative',
  'demi-dégâts',
  'résistance',
  'immunité',
].sort((a, b) => b.length - a.length);

// ===== SCHOOLS CONFIG =====
const ECOLE_CONFIG = {
  'Abjuration':    { color: '#2e6dd4', bg: '#e8f0ff', emoji: '🛡️' },
  'Invocation':    { color: '#1a8070', bg: '#dff4f2', emoji: '🌀' },
  'Conjuration':   { color: '#1a8070', bg: '#dff4f2', emoji: '🌀' },
  'Divination':    { color: '#8a6000', bg: '#fff8e0', emoji: '🔮' },
  'Enchantement':  { color: '#b0184a', bg: '#fde4ec', emoji: '💫' },
  'Évocation':     { color: '#c82020', bg: '#ffecec', emoji: '⚡' },
  'Illusion':      { color: '#6a10a0', bg: '#f3e5f8', emoji: '👁️' },
  'Nécromancie':   { color: '#2a4040', bg: '#e4eeee', emoji: '💀' },
  'Transmutation': { color: '#b84000', bg: '#fff2e0', emoji: '⚗️' },
};

function getSortEcoleConfig(ecole) {
  return ECOLE_CONFIG[ecole] || { color: '#7a5a0a', bg: '#fdf8ee', emoji: '✨' };
}

function getSortPreview(s) {
  const text = s.description_resume || s.description || '';
  const firstLine = text.split('\n')[0].replace(/^- /, '').trim();
  return firstLine.length > 100 ? firstLine.slice(0, 97) + '…' : firstLine;
}

function formatDuration(duree) {
  if (!duree) return '—';
  if (duree === 'Instantanée') return 'Instant.';
  if (duree.startsWith('Concentration')) return 'Conc.';
  if (duree.includes('prochain tour')) return 'Fin de tour';
  return duree.replace('minutes', 'min').replace('minute', 'min')
              .replace('heures', 'h').replace('heure', 'h');
}

// ===== GLOSSAIRE CATEGORY CONFIG =====
const CAT_CONFIG = {
  'mécanique':    { emoji: '⚙️',  label: 'Mécanique'   },
  'combat':       { emoji: '⚔️',  label: 'Combat'       },
  'magie':        { emoji: '✨',  label: 'Magie'        },
  'etat':         { emoji: '🔴',  label: 'État'         },
  'action':       { emoji: '▶️',  label: 'Action'       },
  'exploration':  { emoji: '🗺️', label: 'Exploration'  },
  'repos':        { emoji: '💤',  label: 'Repos'        },
  'zone-d-effet': { emoji: '💥',  label: 'Zone'         },
  'déplacement':  { emoji: '👣',  label: 'Déplacement'  },
};

function getGlossaireExcerpt(desc) {
  if (!desc) return '';
  // Remplace #id# par le terme réel (lisible dans l'extrait)
  let plain = desc.replace(/#([a-z0-9-]+)#/g, (m, id) =>
    window.GLOSSAIRE_MAP?.[id]?.terme || ''
  );
  // Nettoie la ponctuation orpheline et normalise les espaces
  plain = plain.replace(/\s*[,:;]\s*(?=[,:;.])/g, '').replace(/\s+/g, ' ').trim();
  return plain.length > 115 ? plain.slice(0, 112) + '…' : plain;
}

// ===== DAMAGE TYPES =====
const DAMAGE_TYPE_PATTERNS = [
  [/(?<![a-zA-ZÀ-ÿ])(acide)(?![a-zA-ZÀ-ÿ])/g,        'dmg-acide'     ],
  [/(?<![a-zA-ZÀ-ÿ])(feu)(?![a-zA-ZÀ-ÿ])/g,          'dmg-feu'       ],
  [/(?<![a-zA-ZÀ-ÿ])(froid)(?![a-zA-ZÀ-ÿ])/g,        'dmg-froid'     ],
  [/(?<![a-zA-ZÀ-ÿ])(foudre)(?![a-zA-ZÀ-ÿ])/g,       'dmg-foudre'    ],
  [/(?<![a-zA-ZÀ-ÿ])(tonnerre)(?![a-zA-ZÀ-ÿ])/g,     'dmg-tonnerre'  ],
  [/(?<![a-zA-ZÀ-ÿ])(poison)(?![a-zA-ZÀ-ÿ])/g,       'dmg-poison'    ],
  [/(?<![a-zA-ZÀ-ÿ])(nécrotiques?)(?![a-zA-ZÀ-ÿ])/g, 'dmg-necrotique'],
  [/(?<![a-zA-ZÀ-ÿ])(radiants?)(?![a-zA-ZÀ-ÿ])/g,    'dmg-radiant'   ],
  [/(?<![a-zA-ZÀ-ÿ])(psychiques?)(?![a-zA-ZÀ-ÿ])/g,  'dmg-psychique' ],
  [/dégâts\s+de\s+(force)/g,                           'dmg-force'     ],
  [/(?<![a-zA-ZÀ-ÿ])(contondants?)(?![a-zA-ZÀ-ÿ])/g, 'dmg-physique'  ],
  [/(?<![a-zA-ZÀ-ÿ])(perforants?)(?![a-zA-ZÀ-ÿ])/g,  'dmg-physique'  ],
  [/(?<![a-zA-ZÀ-ÿ])(tranchants?)(?![a-zA-ZÀ-ÿ])/g,  'dmg-physique'  ],
];

function buildSortTermsData() {
  SORT_ETAT_MAP = {};
  const data = window.DND_DATA?.glossaire;
  if (!data) return;
  // Les états de jeu (Charmé, Aveuglé, etc.) → cliquables et colorés en rouge
  (data.etats || []).forEach(e => {
    if (e.terme) SORT_ETAT_MAP[e.terme.toLowerCase()] = { id: e.id, terme: e.terme };
  });
}

// Remplace uniquement dans les nœuds texte (pas dans les attributs HTML ni les balises)
function replaceInTextNodes(html, replaceFn) {
  return html.split(/(<[^>]+>)/).map(part =>
    part.startsWith('<') ? part : replaceFn(part)
  ).join('');
}

function highlightSortTerms(text) {
  if (!text) return '';
  let html = text;

  // Étape 1 : états de jeu → rouge + cliquable vers modale glossaire
  const sortedEtats = Object.values(SORT_ETAT_MAP).sort((a, b) => b.terme.length - a.terme.length);
  for (const { id, terme } of sortedEtats) {
    const esc = terme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?<![a-zA-ZÀ-ÿ])(${esc})(?![a-zA-ZÀ-ÿ])`, 'gi');
    html = replaceInTextNodes(html, txt =>
      txt.replace(re, `<span class="term-etat" data-gloss="${id}">$1</span>`)
    );
  }

  // Étape 2 : types de dégâts → étiquettes colorées
  for (const [re, cls] of DAMAGE_TYPE_PATTERNS) {
    re.lastIndex = 0; // reset global regex
    html = replaceInTextNodes(html, txt =>
      txt.replace(re, (match, g1) => {
        const word = g1 !== undefined ? g1 : match;
        const prefix = (g1 !== undefined && match !== g1) ? match.slice(0, match.lastIndexOf(g1)) : '';
        return prefix + `<span class="dmg-type ${cls}">${word}</span>`;
      })
    );
  }

  // Étape 3 : termes mécaniques → gras doré
  for (const term of SORT_BOLD_TERMS) {
    const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?<![a-zA-ZÀ-ÿ>])(${esc})(?![a-zA-ZÀ-ÿ])`, 'gi');
    html = replaceInTextNodes(html, txt =>
      txt.replace(re, `<strong class="term-mec">$1</strong>`)
    );
  }

  // Étape 4 : dés type 1d8, 2d6 → gras doré
  html = replaceInTextNodes(html, txt =>
    txt.replace(SORT_DICE_REGEX, `<strong class="term-mec">$&</strong>`)
  );

  return html;
}

// Convertit description_resume (texte brut avec "- " et \n) en HTML structuré
function formatSortDesc(text) {
  if (!text) return '<p class="sort-desc-para" style="color:var(--text-subtle);font-style:italic">Description non disponible.</p>';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  let html = '';
  let listItems = [];

  const flushList = () => {
    if (listItems.length) {
      html += '<ul class="sort-desc-list">' +
        listItems.map(li => `<li>${highlightSortTerms(li)}</li>`).join('') +
        '</ul>';
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    } else {
      flushList();
      html += `<p class="sort-desc-para">${highlightSortTerms(line)}</p>`;
    }
  }
  flushList();
  return html;
}

// ===== MODULE-LEVEL VARS (sorts + fiche state) =====
let FICHE_PREP_SPELLS = new Set();
let FICHE_PREP_CANTRIPS = new Set();
let FICHE_CLASS_SORTS = [];
let FICHE_PREP_LEVEL = 0;
let CURRENT_FICHE_CLASS = null;

function getStatKey(caract) {
  return {
    'Intelligence': 'int', 'Sagesse': 'sag', 'Charisme': 'cha',
    'Force': 'for', 'Dextérité': 'dex', 'Constitution': 'con'
  }[caract]
    || (caract || '').toLowerCase().slice(0, 3) || 'int';
}

function calcMaxPrepared(cls) {
  const niveau = parseInt(document.getElementById('f-niveau')?.value) || 1;
  const type = cls.sorts?.type || '';
  const isPrepared = /prépar/i.test(type);
  if (isPrepared) {
    const key = getStatKey(cls.sorts?.caracteristique || 'Intelligence');
    const val = parseInt(document.querySelector(`[data-stat="${key}"]`)?.value) || 10;
    return Math.max(1, niveau + getMod(val));
  }
  const prog = cls.progression?.[niveau - 1] || {};
  return prog.sorts_connus || prog.sorts_prepares || parseInt(cls.sorts?.sorts_prepares_niv1) || niveau;
}

function buildSortsPrep(cls) {
  FICHE_PREP_SPELLS = new Set();
  FICHE_PREP_CANTRIPS = new Set();
  CURRENT_FICHE_CLASS = cls;
  rebuildSortsPrepUI(cls);
}

function rebuildSortsPrepUI(cls) {
  const allSorts = window.DND_DATA.sorts || [];
  FICHE_CLASS_SORTS = allSorts.filter(s => s.classes.includes(cls.nom));
  const container = document.getElementById('sorts-selector-container');
  if (!container) return;
  if (!FICHE_CLASS_SORTS.length) { container.innerHTML = ''; return; }

  const niveau = parseInt(document.getElementById('f-niveau')?.value) || 1;
  const prog = cls.progression?.[niveau - 1] || {};

  const maxAccessLevel = (cls.sorts?.acces_niveaux_sorts?.[niveau - 1])
    || (prog.emplacements?.length || Math.ceil(niveau / 2));

  const levelSet = new Set(FICHE_CLASS_SORTS.map(s => parseInt(s.niveau)));
  const levels = [...levelSet].sort((a, b) => a - b)
    .filter(lv => lv === 0 || lv <= maxAccessLevel);
  if (!levels.length) { container.innerHTML = ''; return; }

  if (!levels.includes(FICHE_PREP_LEVEL)) FICHE_PREP_LEVEL = levels[0];

  const isPrepared = /prépar/i.test(cls.sorts?.type || '');
  const prepLabel = isPrepared ? 'Sorts préparés' : 'Sorts connus';
  const hasCantrips = levels.includes(0);
  const maxCantrips = prog.sorts_mineurs || parseInt(cls.sorts?.sorts_mineurs_niv1) || 3;
  const maxPrep = calcMaxPrepared(cls);
  const caractKey = getStatKey(cls.sorts?.caracteristique || 'Intelligence');
  const statVal = parseInt(document.querySelector(`[data-stat="${caractKey}"]`)?.value) || 10;
  const mod = getMod(statVal);

  const prevSearch = document.getElementById('sorts-prep-search')?.value || '';

  const tabs = levels.map(lv =>
    `<button class="sort-level-tab${lv === FICHE_PREP_LEVEL ? ' active' : ''}" data-level="${lv}">
      ${lv === 0 ? '✦ Mineurs' : `Niv.&nbsp;${lv}`}
    </button>`).join('');

  const formulaText = isPrepared
    ? `<strong>${prepLabel}</strong> = niveau (${niveau}) + mod. ${cls.sorts?.caracteristique} (${fmtMod(mod)}) = <strong>${maxPrep}</strong>`
    : `En tant que ${cls.nom} de niveau ${niveau}, vous connaissez <strong>${maxPrep} sort${maxPrep !== 1 ? 's' : ''}</strong>.`;

  container.innerHTML = `
    <div class="sorts-prep-wrap">
      <div class="sorts-prep-topbar">
        <div class="sorts-prep-counts">
          ${hasCantrips ? `<div class="prep-badge cantrip-badge">
            <span>Mineurs</span>
            <strong><span id="cantrip-count">0</span>/<span id="cantrip-max">${maxCantrips}</span></strong>
          </div>` : ''}
          <div class="prep-badge spell-badge">
            <span>${prepLabel}</span>
            <strong><span id="prep-count" class="">0</span>/<span id="prep-max">${maxPrep}</span></strong>
          </div>
        </div>
        <input type="text" id="sorts-prep-search" class="sorts-prep-search" placeholder="🔍 Filtrer les sorts…" value="${prevSearch}">
      </div>
      <div class="sorts-prep-formula">💡 ${formulaText}</div>
      <div class="fiche-tip conc-tip">⚠️ Un seul sort de <strong>Concentration</strong> actif à la fois — un second sort de Concentration annule immédiatement le premier.</div>
      <div class="sorts-level-tabs" id="sorts-level-tabs">${tabs}</div>
      <div class="sorts-prep-list" id="sorts-prep-list"></div>
    </div>`;

  document.querySelectorAll('.sort-level-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sort-level-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      FICHE_PREP_LEVEL = parseInt(tab.dataset.level);
      renderSortsPrepList();
    });
  });
  document.getElementById('sorts-prep-search').addEventListener('input', renderSortsPrepList);

  updatePrepCounts();
  renderSortsPrepList();
}

function renderSortsPrepList() {
  const container = document.getElementById('sorts-prep-list');
  if (!container) return;
  const q = (document.getElementById('sorts-prep-search')?.value || '').toLowerCase().trim();

  let filtered;
  if (q) {
    filtered = FICHE_CLASS_SORTS
      .filter(s => s.name.toLowerCase().includes(q) || s.ecole.toLowerCase().includes(q))
      .sort((a, b) => parseInt(a.niveau) - parseInt(b.niveau) || a.name.localeCompare(b.name));
  } else {
    filtered = FICHE_CLASS_SORTS
      .filter(s => parseInt(s.niveau) === FICHE_PREP_LEVEL)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  if (!filtered.length) {
    container.innerHTML = `<div class="sorts-prep-empty">Aucun sort trouvé</div>`;
    return;
  }

  container.innerHTML = filtered.map(s => {
    const lvl = parseInt(s.niveau);
    const isC = lvl === 0;
    const checked = (isC ? FICHE_PREP_CANTRIPS : FICHE_PREP_SPELLS).has(s.name);
    const niv = lvl === 0 ? 'Min.' : `N.${lvl}`;
    return `<label class="sort-prep-item${checked ? ' prepared' : ''}" data-name="${s.name}" data-cantrip="${isC}">
      <input type="checkbox" class="sort-prep-cb"${checked ? ' checked' : ''}>
      ${q ? `<span class="sort-niveau-badge niveau-${s.niveau}">${niv}</span>` : ''}
      <span class="sort-prep-name">${s.name}</span>
      <span class="sort-prep-school">${s.ecole}</span>
      ${s.concentration ? `<span class="sort-tag-conc" title="Concentration">C</span>` : ''}
    </label>`;
  }).join('');

  container.querySelectorAll('.sort-prep-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      const label = cb.closest('.sort-prep-item');
      const name = label.dataset.name;
      const isC = label.dataset.cantrip === 'true';
      if (cb.checked) { (isC ? FICHE_PREP_CANTRIPS : FICHE_PREP_SPELLS).add(name); label.classList.add('prepared'); }
      else { (isC ? FICHE_PREP_CANTRIPS : FICHE_PREP_SPELLS).delete(name); label.classList.remove('prepared'); }
      updatePrepCounts();
    });
  });
}

function updatePrepCounts() {
  const cc = document.getElementById('cantrip-count');
  const pc = document.getElementById('prep-count');
  const pm = document.getElementById('prep-max');
  if (cc) cc.textContent = FICHE_PREP_CANTRIPS.size;
  if (pc) {
    pc.textContent = FICHE_PREP_SPELLS.size;
    const max = pm ? parseInt(pm.textContent) : 99;
    pc.classList.toggle('over-limit', FICHE_PREP_SPELLS.size > max);
  }
}

function updatePVSuggestion(cls) {
  const el = document.getElementById('pv-suggestion');
  if (!el || !cls) return;
  const niveau = parseInt(document.getElementById('f-niveau')?.value) || 1;
  const conScore = parseInt(document.querySelector('[data-stat="con"]')?.value) || 10;
  const conMod = getMod(conScore);
  const dieVal = cls.de_vie?.valeur || 8;
  const avg = Math.floor(dieVal / 2) + 1;
  const suggested = (dieVal + conMod) + (niveau - 1) * (avg + conMod);
  el.innerHTML = `💡 PV max suggérés : <strong>${Math.max(1, suggested)}</strong>
    <span class="tip-note"> (1d${dieVal} max${fmtMod(conMod)} au niv.1, +${avg}${fmtMod(conMod)} par niveau suivant)</span>`;
  el.style.display = '';
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
      <span class="expertise-btn" data-comp="${c.nom}" title="Expertise : double le Bonus de Maîtrise">2×</span>
      <span class="skill-stat">${c.stat.toUpperCase()}</span>
      <span class="skill-name">${c.nom}</span>
      <span class="skill-bonus" id="comp-bonus-${c.nom}">+0</span>
    </div>`).join('');

  document.querySelectorAll('[data-save],[data-comp]').forEach(cb => {
    cb.addEventListener('change', updateDerivedStats);
  });

  skillsList.querySelectorAll('.expertise-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cb = document.getElementById('comp-' + btn.dataset.comp);
      if (!cb?.checked) return;
      btn.classList.toggle('active');
      updateDerivedStats();
    });
  });

  skillsList.querySelectorAll('[data-comp]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (!cb.checked) {
        document.querySelector(`.expertise-btn[data-comp="${cb.dataset.comp}"]`)?.classList.remove('active');
      }
    });
  });
}

function statNom(s) {
  return { for: 'Force', dex: 'Dextérité', con: 'Constitution', int: 'Intelligence', sag: 'Sagesse', cha: 'Charisme' }[s];
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
    const expertBtn = document.querySelector(`.expertise-btn[data-comp="${c.nom}"]`);
    const isProf = cb?.checked || false;
    const isExpert = isProf && (expertBtn?.classList.contains('active') || false);
    const mult = isExpert ? 2 : 1;
    const mod = getMod(scores[c.stat]) + (isProf ? bm * mult : 0);
    const el = document.getElementById('comp-bonus-' + c.nom);
    if (el) el.textContent = fmtMod(mod);
  });

  // Mise à jour sorts et PV si classe sélectionnée
  if (CURRENT_FICHE_CLASS) {
    updatePVSuggestion(CURRENT_FICHE_CLASS);
    if (CURRENT_FICHE_CLASS.sorts?.lanceur_de_sorts) {
      rebuildSortsPrepUI(CURRENT_FICHE_CLASS);
      updateSortsCalc(getStatKey(CURRENT_FICHE_CLASS.sorts.caracteristique).slice(0, 3));
    }
  }
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
    buildSortsPrep(cls);
    CURRENT_FICHE_CLASS = cls;
  } else {
    sortsSection.style.display = 'none';
    CURRENT_FICHE_CLASS = cls;
    document.getElementById('sorts-selector-container').innerHTML = '';
  }
  updatePVSuggestion(cls);
}

function buildSortsSlots(cls) {
  const container = document.getElementById('sorts-slots');
  const niveaux = [1, 2, 3, 4, 5];
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
  const statKey = { 'int': 'int', 'sag': 'sag', 'cha': 'cha', 'Intelligence': 'int', 'Sagesse': 'sag', 'Charisme': 'cha' }[caract] || caract;
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
  FICHE_PREP_SPELLS = new Set();
  FICHE_PREP_CANTRIPS = new Set();
  CURRENT_FICHE_CLASS = null;
  document.getElementById('sorts-selector-container').innerHTML = '';
  document.getElementById('pv-suggestion').style.display = 'none';
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
