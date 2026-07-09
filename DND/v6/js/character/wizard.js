// Assistant de création de personnage : un parcours guidé en 8 étapes, pensé pour
// un joueur qui n'a jamais rempli de fiche. Les règles chiffrées sont lues depuis
// classes.json / historiques.json (voir class-traits.js), jamais recodées à la main.

import { DATA } from '../data.js';
import { el, escapeHtml, qs, qsa, abilityMod, fmtMod, stripAccents } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { speciesThumb, classImageLocal, imgWithFallback, spellImage, imageFileToDataURL } from '../images.js';
import { parseClassTraits, parseStartingEquipmentChoices, parseSpellcastingTable } from '../class-traits.js';
import { ABILITIES, ABILITY_HINTS, STANDARD_ARRAY, SPELLCASTING_ABILITY, isCasterClass, giantAncestryOptions, giantAncestryLabel } from './rules.js';
import { saveCharacter, setCurrentCharacterId } from './storage.js';
import { grantMilestone } from '../progress.js';
import { toast } from '../ui.js';
import { navigate } from '../router.js';
import { openSpellModal } from '../pages/sorts.js';
import { openItemModal } from './sheet.js';
import { actionBadge, spellActionKind } from './action-economy.js';
import {
  CLASS_ABILITY_PRIORITY, optimizedAbilities, recommendedBonusChoice,
  isRecommendedBackground, isRecommendedSpell, sortRecommendedFirst,
} from './recommendations.js';

const STEPS = [
  { key: 'espece', label: 'Espèce' },
  { key: 'classe', label: 'Classe' },
  { key: 'historique', label: 'Historique' },
  { key: 'caracs', label: 'Caractéristiques' },
  { key: 'competences', label: 'Compétences' },
  { key: 'equipement', label: 'Équipement' },
  { key: 'sorts', label: 'Sorts' },
  { key: 'identite', label: 'Identité' },
];

export function parseBackgroundEquipment(str){
  // "Matériel de calligraphe, livre (prières), symbole sacré, parchemin (10 feuilles), robe, 8 po"
  const items = [];
  let gold = 0;
  for(const tok of String(str || '').split(',').map(t => t.trim()).filter(Boolean)){
    const g = tok.match(/^(\d+(?:[.,]\d+)?)\s*po$/i);
    if(g){ gold += parseFloat(g[1].replace(',', '.')); continue; }
    items.push({ name: tok.charAt(0).toUpperCase() + tok.slice(1), qty: 1 });
  }
  return { items, gold };
}

/* Certains historiques laissent choisir leur maîtrise d'outil ("Choisissez un
   instrument de musique", "… un type de boîte de jeux", "… parmi les outils
   d'artisan"). Les options viennent de outils.json (variantes incluses). */
export function toolChoiceOptions(bg){
  const label = String(bg?.maitrise_outils || '').trim();
  if(!/^choisissez/i.test(label)) return null;
  const l = stripAccents(label).toLowerCase();
  if(l.includes('instrument')){
    const base = DATA.outils.find(o => /instrument de musique/i.test(o.nom));
    return { kind: '🎻 Instrument de musique', options: (base?.variantes || []).map(v => `Instrument de musique (${v.nom})`) };
  }
  if(l.includes('boite de jeu') || l.includes('type de jeu')){
    const base = DATA.outils.find(o => /boite de jeux/i.test(stripAccents(o.nom)));
    return { kind: '🎲 Boîte de jeux', options: (base?.variantes || []).map(v => `Boîte de jeux (${v.nom})`) };
  }
  if(l.includes('artisan')){
    return { kind: '🛠️ Outils d\'artisan', options: DATA.outils.filter(o => (o.artisanat || []).length).map(o => o.nom) };
  }
  return { kind: '🧰 Outil', options: DATA.outils.map(o => o.nom) };
}

/** Maîtrises d'outils finales d'un historique (choix du joueur ou outil imposé). */
export function resolveBackgroundTools(bg, chosenTool){
  const label = String(bg?.maitrise_outils || '').trim();
  if(!label || label === '—') return [];
  if(/^choisissez/i.test(label)) return chosenTool ? [chosenTool] : [];
  return [label];
}

export function startWizard(view){
  const draft = {
    species: null,       // slug
    subspecies: null,    // nom de la sous-espèce (si l'espèce en propose)
    giantAncestry: null, // Goliath : nom de la capacité d'ascendance gigante choisie
    classSlug: null,
    background: null,    // slug
    tool: null,          // outil choisi si l'historique le permet (instrument, boîte de jeux…)
    abilities: {},       // key -> valeur du tableau standard
    bonusMode: '2-1',
    bonusPlus2: null, bonusPlus1: null,
    skills: [],
    classEquip: 'A', bgEquip: 'A',
    cantrips: [], spells: [],
    name: '',
    portrait: null,      // dataURL d'une photo personnalisée
    description: '',
    appearance: '',
  };
  let step = 0;

  const excerpt = (t, n) => {
    t = String(t || '').trim().replace(/\s+/g, ' ');
    return t.length > n ? t.slice(0, n).trimEnd() + '…' : t;
  };

  const getClass = () => DATA.classesBySlug.get(draft.classSlug) || null;
  const getSpecies = () => DATA.speciesBySlug.get(draft.species) || null;
  const getBackground = () => DATA.historiquesBySlug.get(draft.background) || null;

  function stepsBarHTML(){
    const caster = draft.classSlug ? isCasterClass(getClass().classe_title) : true;
    return `<div class="wizard-steps">${STEPS.map((s, i) => {
      if(s.key === 'sorts' && !caster) return '';
      const cls = i === step ? 'is-current' : i < step ? 'is-done' : '';
      return `<span class="wizard-step ${cls}"><span class="step-n">${i < step ? '✓' : i + 1}</span>${s.label}</span>`;
    }).join('')}</div>`;
  }

  function shell(title, lede, bodyHTML, { canNext = true, nextLabel = 'Continuer' } = {}){
    view.innerHTML = `
      <a class="back-link" href="#personnages"><svg class="icon"><use href="#i-back"/></svg> Mes personnages</a>
      <div class="page-head" style="margin-bottom:16px">
        <p class="page-eyebrow">Création guidée</p>
        <h1 class="page-title" style="font-size: calc(clamp(24px,3.6vw,34px) * var(--font-scale))">${title}</h1>
        <p class="page-lede">${lede}</p>
      </div>
      ${stepsBarHTML()}
      <div id="wiz-body">${bodyHTML}</div>
      <div class="wizard-actions">
        <button class="btn btn-ghost" type="button" id="wiz-prev" ${step === 0 ? 'disabled' : ''}>
          <svg class="icon"><use href="#i-back"/></svg> Retour
        </button>
        <button class="btn btn-primary" type="button" id="wiz-next" ${canNext ? '' : 'disabled'}>
          ${nextLabel} <svg class="icon"><use href="#i-chevron"/></svg>
        </button>
      </div>
    `;
    qs('#wiz-prev', view).addEventListener('click', () => { step = prevStep(step); render(); });
    qs('#wiz-next', view).addEventListener('click', () => tryNext());
  }

  function setNextEnabled(on){
    const b = qs('#wiz-next', view);
    if(b) b.disabled = !on;
  }

  function nextStep(s){
    let n = s + 1;
    if(STEPS[n]?.key === 'sorts' && !isCasterClass(getClass()?.classe_title)) n++;
    return Math.min(n, STEPS.length - 1);
  }
  function prevStep(s){
    let n = s - 1;
    if(STEPS[n]?.key === 'sorts' && !isCasterClass(getClass()?.classe_title)) n--;
    return Math.max(n, 0);
  }

  function tryNext(){
    const key = STEPS[step].key;
    if(key === 'identite'){ finish(); return; }
    step = nextStep(step);
    render();
  }

  /* ------------------------------ Étapes ------------------------------ */

  function renderEspece(){
    const sp = getSpecies();
    const subs = sp?.sous_especes || [];
    const needSub = subs.length > 0;
    const ancs = giantAncestryOptions(sp);
    const needAnc = ancs.length > 0;
    shell('Choisis ton espèce',
      'Ton peuple d\'origine : une allure, une histoire, quelques dons naturels. Aucun mauvais choix — suis ton instinct.',
      `<div class="option-grid">${DATA.species.map(s => `
        <button type="button" class="option-card ${draft.species === s.slug ? 'is-selected' : ''}" data-pick="${s.slug}">
          <div class="card-media card-media-square">${imgWithFallback(speciesThumb(s.espece), s.espece, { fallbackEmoji: '🧝' })}</div>
          <div class="card-body">
            <span class="card-title">${escapeHtml(s.espece)}</span>
            <span class="card-sub">${escapeHtml(s.infos?.['Vitesse'] ? 'Vitesse ' + s.infos['Vitesse'] : '')}${(s.sous_especes || []).length ? ' · ' + s.sous_especes.length + ' lignées' : ''}</span>
          </div>
        </button>`).join('')}
      </div>
      ${needSub ? `
      <h3 class="section-title">Ta lignée de ${escapeHtml(sp.espece.toLowerCase())}</h3>
      <p style="color:var(--ink-dim);margin-bottom:12px">Cette espèce se décline en <strong>${subs.length} sous-espèces</strong> — choisis la tienne :</p>
      <div class="option-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
        ${subs.map(s => `
        <button type="button" class="option-card ${draft.subspecies === s.nom ? 'is-selected' : ''}" data-sub="${escapeHtml(s.nom)}">
          <div class="card-body">
            <span class="card-title">${escapeHtml(s.nom)}</span>
            <span class="card-desc">${escapeHtml(excerpt(s.description, 150))}</span>
          </div>
        </button>`).join('')}
      </div>` : ''}
      ${needAnc ? `
      <h3 class="section-title">Ton ascendance gigante</h3>
      <p style="color:var(--ink-dim);margin-bottom:12px">Tu descends de géants — choisis le bienfait
      hérité de ta lignée (utilisable un nombre de fois égal à ton bonus de maîtrise, récupéré
      après un Repos long) :</p>
      <div class="option-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
        ${ancs.map(c => `
        <button type="button" class="option-card ${draft.giantAncestry === c.nom ? 'is-selected' : ''}" data-anc="${escapeHtml(c.nom)}">
          <div class="card-body">
            <span class="card-title">${escapeHtml(giantAncestryLabel(c.nom))}</span>
            <span class="card-sub">${escapeHtml(c.nom.replace(/\s*\([^)]*\)\s*$/, ''))}</span>
            <span class="card-desc">${escapeHtml(excerpt(c.description, 150))}</span>
          </div>
        </button>`).join('')}
      </div>` : ''}
      <div class="beginner-note"><b>Pssst.</b> Depuis les règles 2024, l'espèce ne modifie plus tes
      caractéristiques : choisis-la pour son style et ses traits, pas pour l'optimisation.
      Détails complets sur la page <a href="#especes">Espèces</a>.</div>`,
      { canNext: !!draft.species && (!needSub || !!draft.subspecies) && (!needAnc || !!draft.giantAncestry) });
    qsa('[data-pick]', view).forEach(b => b.addEventListener('click', () => {
      if(draft.species !== b.dataset.pick){ draft.subspecies = null; draft.giantAncestry = null; }
      draft.species = b.dataset.pick;
      renderEspece();
    }));
    qsa('[data-sub]', view).forEach(b => b.addEventListener('click', () => {
      draft.subspecies = b.dataset.sub;
      renderEspece();
    }));
    qsa('[data-anc]', view).forEach(b => b.addEventListener('click', () => {
      draft.giantAncestry = b.dataset.anc;
      renderEspece();
    }));
  }

  function renderClasse(){
    shell('Choisis ta classe',
      'Ton métier d\'aventurier — le choix qui compte le plus. Le badge indique la facilité de prise en main.',
      `<div class="option-grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">${DATA.classes.map(c => {
        const t = parseClassTraits(c.html_traits_table);
        return `
        <button type="button" class="option-card ${draft.classSlug === c.slug ? 'is-selected' : ''}" data-pick="${c.slug}">
          <div class="card-media">${imgWithFallback(classImageLocal(c.image), c.classe_title, { fallbackEmoji: '🛡️' })}</div>
          <div class="card-body">
            <span class="card-title">${escapeHtml(c.classe_title)}</span>
            <span class="card-sub">${escapeHtml(t.caracteristique)} · d${t.deVieFaces}${isCasterClass(c.classe_title) ? ' · ✨ sorts' : ''}</span>
          </div>
        </button>`;
      }).join('')}</div>
      <div class="beginner-note"><b>Premier personnage ?</b> Guerrier, Barbare ou Roublard sont les plus
      simples à jouer. Envie de magie dès le départ ? Clerc ou Magicien. Compare tout sur la page
      <a href="#classes">Classes</a>.</div>`,
      { canNext: !!draft.classSlug });
    qsa('[data-pick]', view).forEach(b => b.addEventListener('click', () => {
      if(draft.classSlug !== b.dataset.pick){ draft.skills = []; draft.cantrips = []; draft.spells = []; draft.classEquip = 'A'; }
      draft.classSlug = b.dataset.pick;
      qsa('.option-card', view).forEach(c => c.classList.toggle('is-selected', c === b));
      setNextEnabled(true);
    }));
  }

  function renderHistorique(){
    const cls = getClass();
    const clsTitle = cls?.classe_title || '';
    const mainCarac = cls ? parseClassTraits(cls.html_traits_table).caracteristique : '';
    const sorted = [...DATA.historiques].sort((a, b) =>
      (isRecommendedBackground(clsTitle, a.nom) ? 0 : 1) - (isRecommendedBackground(clsTitle, b.nom) ? 0 : 1)
      || a.nom.localeCompare(b.nom));

    const histoRow = (h) => {
      const reco = isRecommendedBackground(clsTitle, h.nom);
      const caracChip = (c) => {
        const main = mainCarac.includes(c);
        return `<span class="chip chip-carac ${main ? 'is-main' : ''}"
          title="${main ? `Booste la caractéristique principale de ta classe (${escapeHtml(mainCarac)}) — excellent choix !` : 'Caractéristique pouvant recevoir les bonus +2 / +1 de cet historique'}">${main ? '★ ' : ''}${escapeHtml(c)}</span>`;
      };
      return `
        <button type="button" class="spell-row ${draft.background === h.slug ? 'is-selected' : ''}" data-pick="${h.slug}" style="${draft.background === h.slug ? 'border-color:var(--gold);box-shadow:inset 3px 0 0 var(--gold)' : ''}">
          <span class="spell-row-main">
            <span class="spell-row-name">${draft.background === h.slug ? '✓ ' : ''}${escapeHtml(h.nom)}
              ${reco ? `<span class="chip chip-reco" title="Un des historiques les plus adaptés ${clsTitle ? 'aux ' + escapeHtml(clsTitle.toLowerCase()) + 's' : 'à ta classe'}">⭐ Recommandé</span>` : ''}</span>
            <span class="histo-chips">
              ${(h.valeurs_caracteristique || []).map(caracChip).join('')}
              <span class="chip chip-arcane" title="Don d'origine offert par cet historique">🎁 ${escapeHtml(h.don || '')}</span>
              ${(h.maitriser_competence || []).map(s => `<span class="chip chip-skill" title="Compétence maîtrisée offerte par cet historique">✓ ${escapeHtml(s)}</span>`).join('')}
            </span>
          </span>
        </button>`;
    };

    const bg = getBackground();
    const choice = toolChoiceOptions(bg);
    const toolHTML = choice ? `
      <h3 class="section-title">${choice.kind} — à toi de choisir !</h3>
      <p style="color:var(--ink-dim);margin-bottom:12px">L'historique « ${escapeHtml(bg.nom)} » t'offre une
      maîtrise d'outil au choix : <strong>${escapeHtml(bg.maitrise_outils)}</strong>.</p>
      <div class="histo-chips" style="margin-bottom:8px">
        ${choice.options.map(name => `<button type="button" class="chip chip-clickable tool-pick ${draft.tool === name ? 'is-picked' : ''}" data-tool="${escapeHtml(name)}">${draft.tool === name ? '✓ ' : ''}${escapeHtml(name)}</button>`).join('')}
      </div>` : '';

    shell('Choisis ton historique',
      'Ta vie d\'avant l\'aventure. Il fixe tes bonus de caractéristiques, un don d\'origine, deux compétences, une maîtrise d\'outil et un lot d\'équipement.',
      `<div class="list-rows">${sorted.map(histoRow).join('')}</div>
      ${toolHTML}
      <div class="beginner-note"><b>Comment lire les étiquettes ?</b>
      <span class="chip chip-carac is-main">★ Caractéristique</span> = booste la caractéristique principale de ta classe${mainCarac ? ` (<strong>${escapeHtml(mainCarac)}</strong> pour ${escapeHtml(clsTitle.toLowerCase())})` : ''} ·
      <span class="chip chip-arcane">🎁 Don</span> = don d'origine offert ·
      <span class="chip chip-skill">✓ Compétence</span> = compétences maîtrisées.
      Les <strong>⭐ Recommandé</strong> sont en tête de liste. Descriptions complètes sur la page <a href="#historiques">Historiques</a>.</div>`,
      { canNext: !!draft.background && (!choice || !!draft.tool) });
    qsa('[data-pick]', view).forEach(b => b.addEventListener('click', () => {
      if(draft.background !== b.dataset.pick) draft.tool = null;
      draft.background = b.dataset.pick;
      draft.bonusPlus2 = null; draft.bonusPlus1 = null;
      renderHistorique();
    }));
    qsa('[data-tool]', view).forEach(b => b.addEventListener('click', () => {
      draft.tool = b.dataset.tool;
      renderHistorique();
    }));
  }

  function renderCaracs(){
    const bg = getBackground();
    const cls = getClass();
    const mainCarac = cls ? parseClassTraits(cls.html_traits_table).caracteristique : '';
    const bgCaracs = bg?.valeurs_caracteristique || [];

    const options = STANDARD_ARRAY;
    const used = Object.values(draft.abilities);

    const bonusFor = (label) => {
      if(draft.bonusMode === '1-1-1') return bgCaracs.includes(label) ? 1 : 0;
      if(draft.bonusPlus2 === label) return 2;
      if(draft.bonusPlus1 === label) return 1;
      return 0;
    };

    const allAssigned = ABILITIES.every(a => draft.abilities[a.key]);
    const bonusOk = draft.bonusMode === '1-1-1' || (draft.bonusPlus2 && draft.bonusPlus1 && draft.bonusPlus2 !== draft.bonusPlus1);

    shell('Répartis tes caractéristiques',
      `Distribue les six valeurs du tableau standard (15, 14, 13, 12, 10, 8), puis place les bonus
      offerts par ton historique.`,
      `
      <div class="beginner-note"><b>Le conseil qui change tout.</b> Mets le <strong>15</strong> en
      <strong>${escapeHtml(mainCarac || 'ta caractéristique principale')}</strong>, puis la Constitution
      assez haut (c'est tes points de vie). Le 8 va dans ce que ton héros assume le moins bien.</div>
      ${cls && CLASS_ABILITY_PRIORITY[cls.classe_title] ? `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px">
        <button class="btn btn-gold" type="button" id="wiz-optimize">🎯 Optimiser pour ${escapeHtml(cls.classe_title.toLowerCase())}</button>
        <span style="color:var(--ink-faint);font-size: calc(13.5px * var(--font-scale))">place les six valeurs et les bonus d'historique
        selon les forces de la classe — tu peux ensuite tout ajuster à la main.</span>
      </div>` : ''}
      <div class="ability-assign">
        ${ABILITIES.map(a => {
          const val = draft.abilities[a.key] || '';
          const bonus = bonusFor(a.label);
          const total = val ? Number(val) + bonus : null;
          return `<div class="ability-slot">
            <div class="ability-slot-label">${a.label}${a.label === mainCarac ? ' ★' : ''}</div>
            <div class="ability-slot-hint">${ABILITY_HINTS[a.key]}</div>
            <select class="select" data-ability="${a.key}" aria-label="${a.label}">
              <option value="">—</option>
              ${options.map(v => `<option value="${v}" ${String(val) === String(v) ? 'selected' : ''} ${used.includes(v) && String(val) !== String(v) ? 'disabled' : ''}>${v}</option>`).join('')}
            </select>
            <div class="mod-preview">${total != null ? `${total}${bonus ? ` <span style="color:var(--gold-bright);font-size:.75em">(+${bonus})</span>` : ''} → ${fmtMod(abilityMod(total))}` : '&nbsp;'}</div>
          </div>`;
        }).join('')}
      </div>

      <h3 class="section-title" style="margin-top:26px">Bonus de l'historique « ${escapeHtml(bg?.nom || '')} »</h3>
      <p style="color:var(--ink-dim);margin-bottom:12px">Caractéristiques concernées :
      <strong>${escapeHtml(bgCaracs.join(', '))}</strong>. Choisis la répartition :</p>
      <div class="pill-row" style="margin-bottom:14px">
        <button type="button" class="pill ${draft.bonusMode === '2-1' ? 'is-active' : ''}" data-mode="2-1">+2 et +1</button>
        <button type="button" class="pill ${draft.bonusMode === '1-1-1' ? 'is-active' : ''}" data-mode="1-1-1">+1 aux trois</button>
      </div>
      ${draft.bonusMode === '2-1' ? `
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          <div style="flex:1;min-width:180px">
            <label class="field-label">+2 en…</label>
            <select class="select" id="bonus-p2">
              <option value="">—</option>
              ${bgCaracs.map(c => `<option ${draft.bonusPlus2 === c ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
            </select>
          </div>
          <div style="flex:1;min-width:180px">
            <label class="field-label">+1 en…</label>
            <select class="select" id="bonus-p1">
              <option value="">—</option>
              ${bgCaracs.map(c => `<option ${draft.bonusPlus1 === c ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
            </select>
          </div>
        </div>
        ${draft.bonusPlus2 && draft.bonusPlus2 === draft.bonusPlus1 ? '<p style="color:var(--danger);margin-top:8px">Choisis deux caractéristiques différentes.</p>' : ''}
      ` : ''}`,
      { canNext: allAssigned && bonusOk });

    qs('#wiz-optimize', view)?.addEventListener('click', () => {
      const opt = optimizedAbilities(cls.classe_title);
      if(!opt) return;
      draft.abilities = { ...opt };
      const rec = recommendedBonusChoice(cls.classe_title, bgCaracs, (k) => ABILITIES.find(a => a.key === k).label);
      draft.bonusMode = '2-1';
      draft.bonusPlus2 = rec.plus2;
      draft.bonusPlus1 = rec.plus1;
      toast(`Valeurs réparties pour un ${cls.classe_title.toLowerCase()} efficace — ajuste si tu veux !`, { icon: '🎯' });
      renderCaracs();
    });
    qsa('[data-ability]', view).forEach(sel => sel.addEventListener('change', () => {
      const key = sel.dataset.ability;
      const v = sel.value ? Number(sel.value) : null;
      if(v == null) delete draft.abilities[key];
      else draft.abilities[key] = v;
      renderCaracs();
    }));
    qsa('[data-mode]', view).forEach(b => b.addEventListener('click', () => {
      draft.bonusMode = b.dataset.mode;
      renderCaracs();
    }));
    qs('#bonus-p2', view)?.addEventListener('change', (e) => { draft.bonusPlus2 = e.target.value || null; renderCaracs(); });
    qs('#bonus-p1', view)?.addEventListener('change', (e) => { draft.bonusPlus1 = e.target.value || null; renderCaracs(); });
  }

  function renderCompetences(){
    const cls = getClass();
    const bg = getBackground();
    const traits = parseClassTraits(cls.html_traits_table);
    const bgSkills = bg?.maitriser_competence || [];
    const options = traits.competences.options.filter(o => !bgSkills.includes(o));
    const count = traits.competences.count;

    shell('Choisis tes compétences',
      `Ton historique t'offre déjà <strong>${escapeHtml(bgSkills.join(' et '))}</strong>. Ta classe ajoute
      <strong>${count}</strong> compétence${count > 1 ? 's' : ''} au choix.`,
      `
      <div class="detail-chips">${bgSkills.map(s => `<span class="chip chip-gold">✓ ${escapeHtml(s)} (historique)</span>`).join('')}</div>
      <div class="skill-grid" style="margin-top:8px">
        ${options.map(o => `
          <button type="button" class="skill-row ${draft.skills.includes(o) ? 'is-prof' : ''}" data-skill="${escapeHtml(o)}">
            <span class="skill-dot"></span>${escapeHtml(o)}
          </button>`).join('')}
      </div>
      <p style="margin-top:12px;color:var(--ink-dim)" id="skill-count"></p>
      <div class="beginner-note"><b>Pas d'inspiration ?</b> Perception est la compétence la plus demandée
      du jeu. Ensuite, prends ce qui colle au tempérament de ton héros.</div>`,
      { canNext: draft.skills.length === count });

    const update = () => {
      qs('#skill-count', view).textContent = `${draft.skills.length} / ${count} choisies`;
      setNextEnabled(draft.skills.length === count);
    };
    qsa('[data-skill]', view).forEach(b => b.addEventListener('click', () => {
      const s = b.dataset.skill;
      if(draft.skills.includes(s)) draft.skills = draft.skills.filter(x => x !== s);
      else if(draft.skills.length < count) draft.skills.push(s);
      b.classList.toggle('is-prof', draft.skills.includes(s));
      update();
    }));
    update();
  }

  function renderEquipement(){
    const cls = getClass();
    const bg = getBackground();
    const classChoices = parseStartingEquipmentChoices(cls.html_traits_table);

    const itemChip = (i) => {
      const known = DATA.lookupItem(i.name);
      const qty = i.qty > 1 ? i.qty + '× ' : '';
      if(known?.kind === 'arme'){
        return `<span class="chip chip-item-arme chip-clickable" data-item-detail="${escapeHtml(i.name)}"
          title="Arme — dégâts ${escapeHtml(known.degats || '?')} · clique pour la fiche complète">⚔️ ${qty}${escapeHtml(i.name)}</span>`;
      }
      if(known?.kind === 'armure'){
        const shield = /bouclier/i.test(known.categorie || '');
        return `<span class="chip chip-item-armure chip-clickable" data-item-detail="${escapeHtml(i.name)}"
          title="${shield ? 'Bouclier — +2 CA' : 'Armure — CA ' + escapeHtml(String(known.ca || '?'))} · clique pour la fiche complète">🛡️ ${qty}${escapeHtml(i.name)}</span>`;
      }
      if(known){
        return `<span class="chip chip-clickable" data-item-detail="${escapeHtml(i.name)}" title="Clique pour la fiche complète">${qty}${escapeHtml(i.name)}</span>`;
      }
      return `<span class="chip">${qty}${escapeHtml(i.name)}</span>`;
    };

    const choiceCard = (choice, group) => `
      <button type="button" class="option-card ${draft[group] === choice.label ? 'is-selected' : ''}" data-equip="${group}:${choice.label}" style="padding:0">
        <div class="card-body">
          <span class="card-title">Option ${choice.label}</span>
          <span class="histo-chips">
            ${choice.items.map(itemChip).join('')}
            ${choice.gold ? `<span class="chip chip-gold" title="Pièces d'or de départ">🪙 ${choice.gold} po</span>` : ''}
          </span>
        </div>
      </button>`;

    shell('Ton équipement de départ',
      'Deux lots à choisir : celui de ta classe, celui de ton historique. L\'option « argent seul » laisse acheter plus tard.',
      `
      <h3 class="section-title" style="margin-top:0">Lot de ${escapeHtml(cls.classe_title.toLowerCase())}</h3>
      <div class="option-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
        ${classChoices.map(c => choiceCard(c, 'classEquip')).join('')}
      </div>
      <h3 class="section-title">Lot d'historique « ${escapeHtml(bg.nom)} »</h3>
      <div class="option-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
        ${['A', 'B'].map(label => {
          const parsed = parseBackgroundEquipment(bg.equipement?.['choix_' + label]);
          return choiceCard({ label, items: parsed.items, gold: parsed.gold }, 'bgEquip');
        }).join('')}
      </div>
      <div class="beginner-note"><b>Le choix simple :</b> prends l'option A des deux côtés — c'est le
      « kit complet » pensé pour partir à l'aventure tout de suite.
      <span class="chip chip-item-arme">⚔️ arme</span> et <span class="chip chip-item-armure">🛡️ armure</span>
      sont ce qui compte le plus au combat — clique une étiquette pour lire la fiche de l'objet.</div>`,
      { canNext: true });

    qsa('[data-equip]', view).forEach(b => b.addEventListener('click', (e) => {
      const det = e.target.closest('[data-item-detail]');
      if(det){ openItemModal(det.dataset.itemDetail); return; }
      const [group, label] = b.dataset.equip.split(':');
      draft[group] = label;
      renderEquipement();
    }));
  }

  function renderSorts(){
    const cls = getClass();
    const table = parseSpellcastingTable(cls.html_capacites_table);
    const lvl1 = table?.[0] || { cantrips: 0, known: 0, slots: [0], pact: null };
    const maxCantrips = lvl1.cantrips;
    const maxSpells = lvl1.known;
    const pool = DATA.getSpellsForClass(cls.classe_title);
    const cantripPool = sortRecommendedFirst(cls.classe_title, pool.filter(s => s._niveauNum === 0));
    const spellPool = sortRecommendedFirst(cls.classe_title, pool.filter(s => s._niveauNum === 1));

    const spellBtn = (s, listName, max) => {
      const list = draft[listName];
      const sel = list.includes(s._slug);
      const reco = isRecommendedSpell(cls.classe_title, s);
      const kind = spellActionKind(s);
      return `<button type="button" class="spell-row" data-slug="${s._slug}" data-list="${listName}" style="${sel ? 'border-color:var(--gold);box-shadow:inset 3px 0 0 var(--gold)' : ''}">
        <span class="spell-row-img">${imgWithFallback(spellImage(s.name), '', { fallbackEmoji: '✨' })}</span>
        <span class="spell-row-main">
          <span class="spell-row-name">${sel ? '✓ ' : ''}${escapeHtml(s._primaryName)}
            ${reco ? `<span class="chip chip-reco" title="Un classique fiable pour débuter ${escapeHtml(cls.classe_title.toLowerCase())} — clique « ? » pour vérifier qu'il te plaît">⭐ Recommandé</span>` : ''}</span><br>
          <span class="spell-row-sub">${kind ? actionBadge(kind) + ' ' : ''}${escapeHtml(s.ecole)} · ${escapeHtml(s.temps || '')}${s.concentration ? ' · Concentration' : ''}</span>
        </span>
        <span class="chip" data-detail="${s._slug}" title="Lire la fiche complète du sort">?</span>
      </button>`;
    };

    shell('Choisis tes premiers sorts',
      `Au niveau 1, ${escapeHtml(cls.classe_title.toLowerCase())} connaît <strong>${maxCantrips} sorts
      mineurs</strong> (à volonté) et prépare <strong>${maxSpells} sorts de niveau 1</strong>
      (${lvl1.pact ? lvl1.pact.n + ' emplacement(s) de pacte' : (lvl1.slots?.[0] || 0) + ' emplacements par repos long'}).`,
      `
      <div class="beginner-note"><b>Clique sur « ? »</b> pour lire la fiche d'un sort avant de le prendre.
      Les <span class="chip chip-reco">⭐ Recommandé</span> (en tête de liste) forment un kit de départ
      qui a fait ses preuves : un sort d'attaque, un utilitaire, un sort de secours.
      Le badge coloré t'indique quand le sort se lance : ${actionBadge('action')} ${actionBadge('bonus')} ${actionBadge('reaction')}.</div>
      <h3 class="section-title" style="margin-top:8px">Sorts mineurs <span style="font-size:.75em;color:var(--ink-faint)" id="cantrip-count"></span></h3>
      <div class="spell-list">${cantripPool.map(s => spellBtn(s, 'cantrips', maxCantrips)).join('')}</div>
      <h3 class="section-title">Sorts de niveau 1 <span style="font-size:.75em;color:var(--ink-faint)" id="spell-count"></span></h3>
      <div class="spell-list">${spellPool.map(s => spellBtn(s, 'spells', maxSpells)).join('')}</div>`,
      { canNext: draft.cantrips.length === maxCantrips && draft.spells.length === maxSpells });

    const update = () => {
      qs('#cantrip-count', view).textContent = `— ${draft.cantrips.length} / ${maxCantrips}`;
      qs('#spell-count', view).textContent = `— ${draft.spells.length} / ${maxSpells}`;
      setNextEnabled(draft.cantrips.length === maxCantrips && draft.spells.length === maxSpells);
    };
    qsa('[data-slug]', view).forEach(b => {
      b.addEventListener('click', (e) => {
        const detail = e.target.closest('[data-detail]');
        if(detail){
          const s = DATA.sortsBySlug.get(detail.dataset.detail);
          if(s) openSpellModal(s);
          return;
        }
        const listName = b.dataset.list;
        const max = listName === 'cantrips' ? maxCantrips : maxSpells;
        const slug = b.dataset.slug;
        const list = draft[listName];
        if(list.includes(slug)) draft[listName] = list.filter(x => x !== slug);
        else if(list.length < max) draft[listName].push(slug);
        renderSorts();
      });
    });
    update();
  }

  function renderIdentite(){
    const sp = getSpecies();
    const cls = getClass();
    const bg = getBackground();
    shell('Donne-lui un visage et un nom',
      'Dernière étape : le nom qui sera crié autour de la table pendant des mois — et, si tu veux, un portrait et quelques mots sur ton héros.',
      `
      <div class="panel panel-ornate" style="max-width:640px">
        <div class="identity-grid">
          <div class="identity-photo">
            <div class="sheet-avatar identity-avatar" id="wiz-avatar">${draft.portrait
              ? `<img src="${draft.portrait}" alt="">`
              : imgWithFallback(speciesThumb(sp?.espece), sp?.espece || '', { fallbackEmoji: '🧝' })}</div>
            <label class="btn btn-sm"><svg class="icon"><use href="#i-camera"/></svg> Photo
              <input type="file" id="wiz-photo" accept="image/*" hidden></label>
            <button class="btn btn-ghost btn-sm" type="button" id="wiz-photo-reset" ${draft.portrait ? '' : 'hidden'}>Retirer</button>
          </div>
          <div class="identity-fields">
            <label class="field-label" for="wiz-name">Nom du personnage</label>
            <input class="input" id="wiz-name" value="${escapeHtml(draft.name)}" placeholder="Ex. Korgan Forgefer, Lyra du Val…" autocomplete="off" maxlength="60">
            <label class="field-label" for="wiz-desc" style="margin-top:12px">Description <span style="color:var(--ink-faint);font-weight:400">(caractère, histoire — optionnel)</span></label>
            <textarea class="input" id="wiz-desc" rows="3" placeholder="Qui est ce héros ? D'où vient-il ?">${escapeHtml(draft.description)}</textarea>
            <label class="field-label" for="wiz-look" style="margin-top:12px">Apparence <span style="color:var(--ink-faint);font-weight:400">(optionnel)</span></label>
            <textarea class="input" id="wiz-look" rows="2" placeholder="Taille, allure, signes distinctifs…">${escapeHtml(draft.appearance)}</textarea>
          </div>
        </div>
        <p style="margin-top:16px;color:var(--ink-dim)">
          <strong>${escapeHtml(sp?.espece || '')}${draft.subspecies ? ` (${escapeHtml(draft.subspecies)})` : draft.giantAncestry ? ` (${escapeHtml(giantAncestryLabel(draft.giantAncestry))})` : ''} ${escapeHtml(cls?.classe_title.toLowerCase() || '')}</strong>,
          ${escapeHtml((bg?.nom || '').toLowerCase())} avant l'aventure.
        </p>
        <div class="beginner-note"><b>En panne de nom ?</b> Un truc de MJ : deux syllabes sonores + un nom
        de famille imagé. Brakka Vent-Noir. Tilio Neufdoigts. Sila des Brumes.</div>
      </div>`,
      { canNext: draft.name.trim().length > 0, nextLabel: 'Forger le personnage ✦' });
    const input = qs('#wiz-name', view);
    input.addEventListener('input', () => {
      draft.name = input.value;
      setNextEnabled(draft.name.trim().length > 0);
    });
    qs('#wiz-desc', view).addEventListener('input', (e) => { draft.description = e.target.value; });
    qs('#wiz-look', view).addEventListener('input', (e) => { draft.appearance = e.target.value; });
    qs('#wiz-photo', view).addEventListener('change', (e) => {
      imageFileToDataURL(e.target.files?.[0], 512, (url) => {
        draft.portrait = url;
        qs('#wiz-avatar', view).innerHTML = `<img src="${url}" alt="">`;
        qs('#wiz-photo-reset', view).hidden = false;
      });
    });
    qs('#wiz-photo-reset', view).addEventListener('click', () => {
      draft.portrait = null;
      qs('#wiz-avatar', view).innerHTML = imgWithFallback(speciesThumb(sp?.espece), sp?.espece || '', { fallbackEmoji: '🧝' });
      qs('#wiz-photo-reset', view).hidden = true;
    });
    input.focus();
  }

  /* ------------------------------ Finalisation ------------------------------ */

  function finish(){
    const cls = getClass();
    const bg = getBackground();
    const traits = parseClassTraits(cls.html_traits_table);

    // Caractéristiques finales = tableau standard + bonus d'historique.
    const abilities = {};
    for(const a of ABILITIES){
      let v = draft.abilities[a.key];
      if(draft.bonusMode === '1-1-1'){
        if((bg.valeurs_caracteristique || []).includes(a.label)) v += 1;
      } else {
        if(draft.bonusPlus2 === a.label) v += 2;
        if(draft.bonusPlus1 === a.label) v += 1;
      }
      abilities[a.key] = v;
    }

    // Inventaire : lot de classe + lot d'historique.
    const inventory = [];
    let gold = 0;
    const classChoice = parseStartingEquipmentChoices(cls.html_traits_table).find(c => c.label === draft.classEquip);
    if(classChoice){
      for(const it of classChoice.items) inventory.push({ name: it.name, qty: it.qty, equipped: false });
      gold += classChoice.gold || 0;
    }
    const bgParsed = parseBackgroundEquipment(bg.equipement?.['choix_' + draft.bgEquip]);
    for(const it of bgParsed.items) inventory.push({ name: it.name, qty: it.qty, equipped: false });
    gold += bgParsed.gold;

    // Équipe automatiquement la première armure / le premier bouclier / les armes du lot.
    let armorDone = false, shieldDone = false;
    for(const item of inventory){
      const known = DATA.lookupItem(item.name);
      if(!known) continue;
      if(known.kind === 'armure' && /bouclier/i.test(known.categorie) && !shieldDone){ item.equipped = true; shieldDone = true; }
      else if(known.kind === 'armure' && !/bouclier/i.test(known.categorie) && !armorDone){ item.equipped = true; armorDone = true; }
      else if(known.kind === 'arme') item.equipped = true;
    }

    const conMod = abilityMod(abilities.constitution);
    const hpMax = traits.deVieFaces + conMod;

    const ch = saveCharacter({
      name: draft.name.trim(),
      level: 1,
      species: draft.species,
      subspecies: draft.subspecies || null,
      giantAncestry: draft.giantAncestry || null,
      classSlug: draft.classSlug,
      background: draft.background,
      abilities,
      skills: [...(bg.maitriser_competence || []), ...draft.skills],
      inventory,
      gold,
      tools: resolveBackgroundTools(bg, draft.tool),
      cantrips: draft.cantrips,
      spells: draft.spells,
      unprepared: [],
      conditions: [],
      hp: { max: hpMax, current: hpMax, temp: 0 },
      usedSlots: {},
      usedRes: {},
      hitDiceUsed: 0,
      overrides: {},
      portrait: draft.portrait || null,
      description: draft.description.trim(),
      appearance: draft.appearance.trim(),
      notes: '',
      createdAt: Date.now(),
    });
    setCurrentCharacterId(ch.id);
    grantMilestone('personnage-cree');
    toast(`${ch.name} rejoint la légende !`, { icon: '🛡️' });
    navigate('personnages', 'fiche', ch.id);
  }

  /* ------------------------------ Rendu ------------------------------ */

  function render(){
    const key = STEPS[step].key;
    if(key === 'espece') renderEspece();
    else if(key === 'classe') renderClasse();
    else if(key === 'historique') renderHistorique();
    else if(key === 'caracs') renderCaracs();
    else if(key === 'competences') renderCompetences();
    else if(key === 'equipement') renderEquipement();
    else if(key === 'sorts') renderSorts();
    else renderIdentite();
    window.scrollTo(0, 0);
  }

  render();
}
