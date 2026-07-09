// Fiche de personnage : PV suivis (dégâts / soins / PV temporaires), jets
// pré-remplis, ressources de classe, sorts, inventaire avec capacité de charge,
// traits, notes — et une mise en page imprimable pour la table.

import { DATA } from '../data.js';
import { el, escapeHtml, qs, qsa, abilityMod, fmtMod, clamp, stripAccents, slugify } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { speciesThumb, imgWithFallback, spellImage, classImageLocal, colorizeDamageString, imageFileToDataURL } from '../images.js';
import { parseClassTraits, parseSpellcastingTable, parseClassResourceColumns, readResourceColumn } from '../class-traits.js';
import {
  ABILITIES, SKILL_ABILITY, ABILITY_HINTS, SPELLCASTING_ABILITY, isCasterClass, CASTER_TYPE,
  proficiencyBonus, computeArmorClass, computeSpeed, parseArmorForceReq, spellSaveDC, spellAttackBonus,
  parseWeightKg, parseSizeCategory, carryCapacity, isWeaponProficient,
  FIGHTING_STYLES, FIGHTING_STYLE_LEVEL, CLASS_RESOURCES,
  COINS, coinsTotalPo, coinsFromGold,
  giantAncestryOptions, giantAncestryLabel,
} from './rules.js';
import { saveCharacter, deleteCharacter, characterExportPayload } from './storage.js';
import { roll } from '../dice.js';
import { toast, confirmDialog, openModal } from '../ui.js';
import { navigate } from '../router.js';
import { openSpellModal } from '../pages/sorts.js';
import { historiqueDetailHTML } from '../pages/historiques.js';
import { actionBadge, spellActionKind, featureActionKind, collectFeatureActions } from './action-economy.js';
import { isRecommendedSpell } from './recommendations.js';

const TABS = [
  { key: 'actions', label: 'Actions' },
  { key: 'sorts', label: 'Sorts' },
  { key: 'inventaire', label: 'Inventaire' },
  { key: 'traits', label: 'Traits' },
  { key: 'notes', label: 'Notes' },
];

const ABILITY_ICON = {
  force: 'i-muscle', dexterite: 'i-quill', constitution: 'i-heartbeat',
  intelligence: 'i-bulb', sagesse: 'i-eye', charisme: 'i-mask',
};

// Couleur de chaque état (data/glossaire.json → etats) : les pastilles du widget PV.
const CONDITION_COLORS = {
  'a-terre': '#c08b4a', 'agrippe': '#b8973b', 'assourdi': '#8a9bb0',
  'aveugle': '#9a8fa8', 'charme': '#d977a8', 'effraye': '#a06fd6',
  'empoisonne': '#7fb069', 'entrave': '#c07a52', 'epuisement': '#b3543f',
  'etourdi': '#d5aa52', 'neutralise': '#8f8f8f', 'inconscient': '#7d6b9e',
  'invisible': '#7db8e8', 'paralyse': '#5fb5b5', 'petrifie': '#a8a29a',
};
const conditionColor = (id) => CONDITION_COLORS[id] || 'var(--arcane)';
const etatById = () => new Map((DATA.glossaireRaw?.etats || []).map(e => [e.id, e]));

// Aperçu court d'une description du glossaire pour une infobulle (sans les #liens#).
function glossExcerpt(text, n = 220){
  const t = String(text || '').replace(/#([a-z0-9-]+)#/gi, (m, id) => id.replace(/-/g, ' ')).replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n).trimEnd() + '…' : t;
}

// Onglet interne actif des blocs Action / Action bonus (persiste entre re-rendus).
let actionSubTab = 'attaque';
let bonusSubTab = 'caps';

function derive(ch){
  const cls = DATA.classesBySlug.get(ch.classSlug);
  // Sous-classe choisie au niveau 3 (null tant que le choix n'est pas fait).
  const sub = (cls?.subclasses || []).find(s => s.slug === ch.subclass) || null;
  let sp = DATA.speciesBySlug.get(ch.species);
  // Goliath : si une ascendance gigante a été choisie à la création, seule
  // celle-ci reste sur la fiche (les 5 autres options disparaissent).
  if(sp && ch.giantAncestry){
    const ancs = giantAncestryOptions(sp);
    if(ancs.some(c => c.nom === ch.giantAncestry)){
      sp = { ...sp, capacites: (sp.capacites || []).filter(c => !ancs.includes(c) || c.nom === ch.giantAncestry) };
    }
  }
  const bg = DATA.historiquesBySlug.get(ch.background);
  const traits = parseClassTraits(cls?.html_traits_table);
  // Overrides manuels (objets inconnus, effets maison) : ils priment sur le calcul.
  const ov = ch.overrides || {};
  const ovStats = ov.stats || {};
  const profAuto = proficiencyBonus(ch.level);
  const prof = Number.isFinite(ovStats.maitrise) ? ovStats.maitrise : profAuto;
  const mods = {};
  for(const a of ABILITIES) mods[a.key] = abilityMod(ch.abilities[a.key] ?? 10);

  // Armure / bouclier équipés.
  let armorItem = null, hasShield = false;
  for(const item of ch.inventory || []){
    if(!item.equipped) continue;
    const known = DATA.lookupItem(item.name);
    if(known?.kind === 'armure'){
      if(/bouclier/i.test(known.categorie)) hasShield = true;
      else armorItem = known;
    }
  }
  let ca = computeArmorClass({ dexMod: mods.dexterite, armorCA: armorItem?.ca ?? null, hasShield });
  // Défense sans armure : Barbare 10 + Dex + Con (bouclier autorisé) ;
  // Moine 10 + Dex + Sag (sans bouclier).
  if(!armorItem && cls){
    if(cls.classe_title === 'Barbare'){
      ca.value = 10 + mods.dexterite + mods.constitution + (hasShield ? 2 : 0);
      ca.breakdown = ['10 + Dex + Con (Défense sans armure)', ...(hasShield ? ['+2 bouclier'] : [])];
    } else if(cls.classe_title === 'Moine' && !hasShield){
      ca.value = 10 + mods.dexterite + mods.sagesse;
      ca.breakdown = ['10 + Dex + Sag (Défense sans armure)'];
    }
  }
  if(ch.fightingStyle === 'defense' && armorItem){
    ca.value += 1;
    ca.breakdown.push('+1 style Défense');
  }
  const caAuto = ca.value;
  if(Number.isFinite(ovStats.ca)){
    ca = { value: ovStats.ca, breakdown: ['valeur fixée à la main'] };
  }

  // Charge portée / capacité (taille × Force).
  let totalWeight = 0;
  for(const item of ch.inventory || []){
    const known = DATA.lookupItem(item.name);
    if(known?.poids) totalWeight += parseWeightKg(known.poids) * (item.qty || 1);
  }
  const sizeCat = parseSizeCategory(sp?.infos?.['Taille']);
  const capacity = carryCapacity(sizeCat, ch.abilities.force);
  const overloaded = totalWeight > capacity.carry;

  let speed = computeSpeed({
    speciesSpeedLabel: sp?.infos?.['Vitesse'],
    forceScore: ch.abilities.force,
    armorForceReq: armorItem ? parseArmorForceReq(armorItem.force) : null,
    overloaded,
  });
  const speedAuto = speed.value;
  if(Number.isFinite(ovStats.vitesse)){
    speed = { ...speed, value: ovStats.vitesse, penalized: false, overloaded: false };
  }

  const initiativeAuto = mods.dexterite;
  const initiative = Number.isFinite(ovStats.initiative) ? ovStats.initiative : initiativeAuto;

  const perceptionBonus = mods.sagesse + (ch.skills.includes('Perception') ? prof : 0) + (ov.skills?.['Perception'] || 0);
  const perceptionAuto = 10 + perceptionBonus;
  const perception = Number.isFinite(ovStats.perception) ? ovStats.perception : perceptionAuto;

  // Maîtrise des sauvegardes : celle de la classe, modifiable à la main.
  const saveProf = {};
  for(const a of ABILITIES){
    const base = traits.sauvegardes.some(s => s.toLowerCase().startsWith(a.label.toLowerCase().slice(0, 5)));
    saveProf[a.key] = ov.saveProf?.[a.key] ?? base;
  }

  const resourceCols = parseClassResourceColumns(cls?.html_capacites_table);
  const hasWeaponMastery = (cls?.capacites || []).some(c => /botte/i.test(c.capacite_name) && parseInt(c.niveau, 10) <= ch.level);

  // Maîtrises d'outils : choisies à la création (ch.tools) ; pour les personnages
  // d'avant ce champ, on retombe sur l'outil imposé par l'historique.
  const toolProfs = [...(ch.tools || [])];
  if(!toolProfs.length && bg?.maitrise_outils && !/^choisissez/i.test(bg.maitrise_outils.trim())){
    toolProfs.push(bg.maitrise_outils.trim());
  }

  return {
    cls, sub, sp, bg, traits, prof, profAuto, mods, ca, caAuto, speed, speedAuto,
    initiative, initiativeAuto, armorItem, hasShield,
    perception, perceptionAuto, saveProf, toolProfs,
    totalWeight, capacity, overloaded, sizeCat, resourceCols, hasWeaponMastery,
    fightingStyle: FIGHTING_STYLES.find(f => f.id === ch.fightingStyle) || null,
  };
}

function weaponAttack(ch, d, item, known){
  const ranged = /distance/i.test(known.categorie || '');
  const finesse = (known.proprietes || []).some(p => /finesse/i.test(p));
  const twoHanded = (known.proprietes || []).some(p => /deux mains/i.test(p));
  const thrown = (known.proprietes || []).some(p => /lancer/i.test(p));
  let mod;
  if(ranged) mod = d.mods.dexterite;
  else if(finesse) mod = Math.max(d.mods.force, d.mods.dexterite);
  else mod = d.mods.force;

  // Bonus de maîtrise UNIQUEMENT si la classe maîtrise cette arme.
  const proficient = isWeaponProficient(d.traits.armes, known);
  let atk = mod + (proficient ? d.prof : 0);
  let dmgBonus = mod;

  // Style de combat (effets chiffrés simples).
  if(ch.fightingStyle === 'archerie' && ranged) atk += 2;
  if(ch.fightingStyle === 'duel' && !ranged && !twoHanded) dmgBonus += 2;
  if(ch.fightingStyle === 'armes-de-lancer' && thrown) dmgBonus += 2;

  const dice = (String(known.degats || '').match(/(\d+d\d+)/i) || [])[1] || '1d4';
  const dmgType = String(known.degats || '').replace(/^\s*\d+d\d+\s*/i, '');
  const dmg = `${dice}${dmgBonus ? (dmgBonus > 0 ? '+' + dmgBonus : dmgBonus) : ''}`;
  return { atk, dmg, dmgType, ranged, finesse, proficient };
}

// Fiche en mode édition (overrides à la main) : id du personnage en cours d'édition,
// et instantané pris à l'entrée en édition pour pouvoir tout annuler.
let editingId = null;
let editSnapshot = null;

export function renderSheet(view, ch, activeTab = 'actions'){
  if(!ch.hp.temp) ch.hp.temp = 0;
  if(!ch.usedRes) ch.usedRes = {};
  if(!ch.overrides || typeof ch.overrides !== 'object') ch.overrides = {};
  if(!ch.overrides.stats) ch.overrides.stats = {};
  if(!ch.deathSaves) ch.deathSaves = { s: 0, f: 0 };
  if(!Number.isFinite(ch.hitDiceUsed)) ch.hitDiceUsed = 0;
  // Migration : l'ancienne bourse `gold` (po seul) devient `coins` (5 monnaies).
  if(!ch.coins || typeof ch.coins !== 'object') ch.coins = coinsFromGold(ch.gold);
  for(const c of COINS) ch.coins[c.key] = Math.max(0, Math.round(Number(ch.coins[c.key]) || 0));
  // Champs récents (personnages créés avant leur ajout).
  if(!Array.isArray(ch.conditions)) ch.conditions = [];
  if(!Array.isArray(ch.tools)) ch.tools = [];
  if(!Array.isArray(ch.unprepared)) ch.unprepared = [];
  // Suivi du tour de combat (action / action bonus / réaction / déplacement).
  if(!ch.turn || typeof ch.turn !== 'object') ch.turn = {};
  const turnDefaults = { actionMax: 1, actionUsed: 0, bonusUsed: 0, reactionUsed: 0, moveUsed: 0 };
  for(const k of Object.keys(turnDefaults)) if(!Number.isFinite(ch.turn[k])) ch.turn[k] = turnDefaults[k];

  const d = derive(ch);
  if(!d.cls || !d.sp || !d.bg){
    view.innerHTML = '<p class="empty-note">Ce personnage référence des données introuvables.</p>';
    return;
  }

  const editMode = editingId === ch.id;
  const ov = ch.overrides;
  const ds = ch.deathSaves;
  const caster = isCasterClass(d.cls.classe_title);
  const tabs = TABS.filter(t => t.key !== 'sorts' || caster);
  if(!tabs.some(t => t.key === activeTab)) activeTab = 'actions';

  const persist = () => saveCharacter(ch);
  const rerender = (tab = activeTab) => renderSheet(view, ch, tab);
  const rollAttr = (bonus) => `1d20${bonus ? (bonus > 0 ? '+' + bonus : bonus) : ''}`;

  const statTile = (icon, label, value, sub, { ovKey = null, auto = '', rollAttrs = '' } = {}) => {
    const isOv = ovKey && ov.stats[ovKey] != null;
    return `
    <div class="stat-tile ${isOv ? 'is-ov' : ''}" ${editMode ? '' : rollAttrs} ${isOv ? 'title="Valeur fixée à la main"' : ''}>
      <div class="stat-tile-label"><svg class="icon" aria-hidden="true"><use href="#${icon}"/></svg><span>${label}</span></div>
      <div class="stat-tile-value">${value}</div>
      ${editMode && ovKey
        ? `<input class="input ov-input" type="number" data-ov-stat="${ovKey}" value="${ov.stats[ovKey] ?? ''}" placeholder="auto ${auto}" aria-label="${label} — valeur manuelle">`
        : `<div class="stat-tile-sub">${isOv ? '✦ fixé à la main' : (sub || '&nbsp;')}</div>`}
    </div>`;
  };

  const saveRow = (a) => {
    const prof = d.saveProf[a.key];
    const misc = ov.saves?.[a.key] || 0;
    const bonus = d.mods[a.key] + (prof ? d.prof : 0) + misc;
    if(editMode){
      return `<div class="skill-row is-editable ${prof ? 'is-prof' : ''}" data-toggle-save="${a.key}" role="button" tabindex="0" title="Clic : maîtrise oui / non">
        <span class="skill-dot"></span>${a.label}<span class="skill-mod">${fmtMod(bonus)}</span>
        <input class="input skill-bonus-input" type="number" data-ov-save="${a.key}" value="${misc || ''}" placeholder="±0" aria-label="Bonus divers — sauvegarde de ${a.label}" title="Bonus divers (objet, effet…)">
      </div>`;
    }
    return `<button type="button" class="skill-row ${prof ? 'is-prof' : ''}" data-roll="${rollAttr(bonus)}" data-roll-label="Sauvegarde de ${a.label}">
      <span class="skill-dot"></span>${a.label}${misc ? ' <span class="misc-mark" title="Bonus divers inclus">✦</span>' : ''}<span class="skill-mod">${fmtMod(bonus)}</span>
    </button>`;
  };

  const skillRow = (skill) => {
    const key = SKILL_ABILITY[skill];
    const prof = ch.skills.includes(skill);
    const misc = ov.skills?.[skill] || 0;
    const bonus = d.mods[key] + (prof ? d.prof : 0) + misc;
    const abShort = `<span style="color:var(--ab, var(--ink-faint));font-size:.85em">(${ABILITIES.find(a => a.key === key).short})</span>`;
    if(editMode){
      return `<div class="skill-row is-editable ${prof ? 'is-prof' : ''}" data-toggle-skill="${escapeHtml(skill)}" role="button" tabindex="0" title="Clic : maîtrise oui / non">
        <span class="skill-dot"></span>${skill} ${abShort}
        <span class="skill-mod">${fmtMod(bonus)}</span>
        <input class="input skill-bonus-input" type="number" data-ov-skill="${escapeHtml(skill)}" value="${misc || ''}" placeholder="±0" aria-label="Bonus divers — ${escapeHtml(skill)}" title="Bonus divers (objet, effet…)">
      </div>`;
    }
    return `<button type="button" class="skill-row ${prof ? 'is-prof' : ''}" data-roll="${rollAttr(bonus)}" data-roll-label="${escapeHtml(skill)}">
      <span class="skill-dot"></span>${skill} ${abShort}${misc ? ' <span class="misc-mark" title="Bonus divers inclus">✦</span>' : ''}
      <span class="skill-mod">${fmtMod(bonus)}</span>
    </button>`;
  };

  const abilityTile = (a) => {
    const labelHTML = `<div class="ability-tile-label"><svg class="icon" aria-hidden="true"><use href="#${ABILITY_ICON[a.key]}"/></svg><span>${a.short}</span></div>`;
    if(editMode){
      return `<div class="ability-tile is-editing" style="--ab:var(--ab-${a.key})">
        ${labelHTML}
        <div class="ability-tile-mod">${fmtMod(d.mods[a.key])}</div>
        <input class="input ov-input" type="number" min="1" max="30" data-ab="${a.key}" value="${ch.abilities[a.key]}" aria-label="Valeur de ${a.label}">
      </div>`;
    }
    return `<button type="button" class="ability-tile" style="--ab:var(--ab-${a.key})" data-roll="${rollAttr(d.mods[a.key])}" data-roll-label="Jet de ${a.label}" title="${escapeHtml(ABILITY_HINTS[a.key] || '')}">
      ${labelHTML}
      <div class="ability-tile-mod">${fmtMod(d.mods[a.key])}</div>
      <div class="ability-tile-score">${ch.abilities[a.key]}</div>
    </button>`;
  };

  /* --- Widget PV : jets de sauvegarde contre la mort (toujours visibles,
         actifs à 0 PV — règle 2024 : 3 succès = stabilisé, 3 échecs = mort) --- */
  const dying = ch.hp.current === 0;
  const deathHTML = `
    <div class="death-saves ${dying ? 'is-active' : 'is-idle'}">
      <div class="death-head">
        <strong>☠️ Sauvegardes contre la mort</strong>
        ${dying ? `<button class="btn btn-sm" type="button" id="death-roll" ${ds.s >= 3 || ds.f >= 3 ? 'disabled' : ''}>🎲 Lancer le d20</button>` : ''}
      </div>
      <div class="death-rows">
        <div class="death-row">
          <span class="death-label">Succès</span>
          ${[0, 1, 2].map(i => `<button type="button" class="death-pip is-s ${i < ds.s ? 'is-on' : ''}" data-death="s:${i}" aria-label="Succès ${i + 1}"></button>`).join('')}
        </div>
        <div class="death-row">
          <span class="death-label">Échecs</span>
          ${[0, 1, 2].map(i => `<button type="button" class="death-pip is-f ${i < ds.f ? 'is-on' : ''}" data-death="f:${i}" aria-label="Échec ${i + 1}"></button>`).join('')}
        </div>
      </div>
      ${!dying ? '<p class="death-note">À 0 PV, lance un d20 à chaque tour : 10 ou + = succès ✅, sinon échec ❌.</p>'
        : ds.s >= 3 ? '<p class="death-note is-stable">✨ 3 succès — stabilisé ! Inconscient à 0 PV, mais hors de danger.</p>'
        : ds.f >= 3 ? '<p class="death-note is-dead">💀 3 échecs… le héros s\'éteint. Seul un miracle peut le ramener.</p>'
        : '<p class="death-note">d20 : 10 ou + = succès. 3 succès → stabilisé · 3 échecs → mort. Sur un 20 naturel, tu te relèves à 1 PV !</p>'}
    </div>`;

  /* --- États (Empoisonné, À terre…) : pastilles colorées dans le widget PV --- */
  const etats = etatById();
  const condChips = ch.conditions.map(id => {
    const e = etats.get(id);
    if(!e) return '';
    return `<button type="button" class="cond-chip" style="--cond:${conditionColor(id)}" data-cond-del="${id}"
      title="${escapeHtml(glossExcerpt(e.description))} — clic pour retirer l'état">${escapeHtml(e.terme)}<span class="cond-x" aria-hidden="true">✕</span></button>`;
  }).join('');
  const condHTML = `
    <div class="cond-zone">
      <span class="cond-title">États :</span>
      ${condChips || '<span class="cond-none">aucun — tout va bien !</span>'}
      <button type="button" class="cond-add" id="cond-add" title="Ajouter ou retirer un état (Empoisonné, À terre, Agrippé…)">＋ État</button>
    </div>`;

  const hpPct = clamp(Math.round((ch.hp.current / ch.hp.max) * 100), 0, 100);
  const hpWidget = `
    <div class="panel hp-widget" id="hp-widget" style="padding:16px 20px">
      <div class="hp-top">
        <strong class="hp-title"><svg class="icon"><use href="#i-heart"/></svg> Points de vie</strong>
        <div class="hp-readout">
          <span class="hp-current" id="hp-value">${ch.hp.current}</span>
          <span class="hp-max">/ ${editMode ? `<input class="input ov-input" id="hp-max-edit" type="number" min="1" max="999" value="${ch.hp.max}" aria-label="PV maximum">` : ch.hp.max}</span>
          ${ch.hp.temp > 0 ? `<span class="chip chip-temp" id="hp-temp-chip"><svg class="icon" style="width:14px;height:14px"><use href="#i-shield-plus"/></svg> +${ch.hp.temp} temp.</span>` : ''}
        </div>
      </div>
      <div class="hp-bar">
        <div class="hp-fill ${(ch.hp.current / ch.hp.max) <= .25 ? 'is-critical' : (ch.hp.current / ch.hp.max) <= .55 ? 'is-low' : ''}" style="width:${hpPct}%"></div>
        ${ch.hp.temp > 0 ? `<div class="hp-temp-fill" style="width:${clamp(Math.round((ch.hp.temp / ch.hp.max) * 100), 0, 100 - hpPct)}%"></div>` : ''}
      </div>
      <div class="hp-actions">
        <input class="input hp-amount" id="hp-amount" type="number" min="1" max="999" value="1" aria-label="Quantité de PV">
        <button class="btn btn-sm btn-hp-dmg" type="button" id="hp-dmg"><svg class="icon"><use href="#i-swords"/></svg> Dégâts</button>
        <button class="btn btn-sm btn-hp-heal" type="button" id="hp-heal"><svg class="icon"><use href="#i-heart"/></svg> Soins</button>
        <button class="btn btn-sm btn-hp-temp" type="button" id="hp-temp"><svg class="icon"><use href="#i-shield-plus"/></svg> PV temp.</button>
      </div>
      <div class="hp-rest">
        <button class="btn btn-sm" type="button" id="sheet-shortrest" title="Une heure de pause : dépense des dés de vie pour récupérer des PV">🌤️ Repos court</button>
        <button class="btn btn-sm" type="button" id="sheet-rest" title="Une nuit de sommeil : PV, emplacements et ressources récupérés">🌙 Repos long</button>
      </div>
      ${condHTML}
      ${deathHTML}
    </div>`;

  /* --- Incantation (lanceurs) : caractéristique, DD, attaque de sort --- */
  let castHTML = '';
  if(caster){
    const castKey = SPELLCASTING_ABILITY[d.cls.classe_title];
    const castAb = ABILITIES.find(a => a.key === castKey);
    const castMod = d.mods[castKey];
    const castDC = spellSaveDC(d.prof, castMod);
    const castAtk = spellAttackBonus(d.prof, castMod);
    castHTML = `
      <h4 class="carac-sub"><svg class="icon"><use href="#i-sorts"/></svg> Incantation</h4>
      <div class="cast-band">
        <div class="cast-tile" title="La caractéristique qui alimente ta magie : elle fixe ton DD et ton attaque de sort.">
          <span class="cast-label">Caractéristique</span>
          <span class="cast-value">${castAb?.label || ''} <small>(${fmtMod(castMod)})</small></span>
        </div>
        <div class="cast-tile" title="Difficulté des jets de sauvegarde contre tes sorts : 8 + bonus de maîtrise + modificateur de ${castAb?.label || ''}.">
          <span class="cast-label">DD de sort</span>
          <span class="cast-value">${castDC}</span>
        </div>
        <button type="button" class="cast-tile is-roll" data-roll="1d20+${castAtk}" data-roll-label="Attaque de sort"
          title="Bonus de tes jets d'attaque de sort — clique pour lancer le d20.">
          <span class="cast-label">Attaque de sort</span>
          <span class="cast-value">${fmtMod(castAtk)} 🎲</span>
        </button>
      </div>`;
  }

  /* --- Compétences groupées par caractéristique : la couleur sert de repère
         (rouge = Force, vert = Dextérité…) pour retenir qui nourrit quoi. --- */
  const skillGroupsHTML = ABILITIES
    .map(a => ({ a, skills: Object.keys(SKILL_ABILITY).filter(s => SKILL_ABILITY[s] === a.key) }))
    .filter(g => g.skills.length)
    .map(({ a, skills }) => `
      <section class="skill-group" style="--ab:var(--ab-${a.key})">
        <h4 class="skill-group-head" title="${escapeHtml(ABILITY_HINTS[a.key] || '')}">
          <svg class="icon" aria-hidden="true"><use href="#${ABILITY_ICON[a.key]}"/></svg>
          <span>${a.label}</span>
          <span class="skill-group-mod">${fmtMod(d.mods[a.key])}</span>
        </h4>
        <div class="skill-group-rows">${skills.map(skillRow).join('')}</div>
      </section>`).join('');

  /* --- Article Caractéristiques : les six valeurs + jets de sauvegarde --- */
  const caracPanel = `
    <article class="panel carac-panel">
      <h3 class="carac-title"><svg class="icon"><use href="#i-muscle"/></svg> Caractéristiques</h3>
      <div class="ability-band">${ABILITIES.map(abilityTile).join('')}</div>
      <h4 class="carac-sub"><svg class="icon"><use href="#i-shield"/></svg> Jets de sauvegarde</h4>
      <div class="saves-band">${ABILITIES.map(saveRow).join('')}</div>
      ${castHTML}
    </article>`;

  view.innerHTML = `
    <a class="back-link" href="#personnages"><svg class="icon"><use href="#i-back"/></svg> Mes personnages</a>

    <div class="sheet-head no-print">
      <div class="sheet-avatar">${ch.portrait
        ? `<img src="${ch.portrait}" alt="">`
        : imgWithFallback(speciesThumb(d.sp.espece), d.sp.espece, { fallbackEmoji: '🛡️' })}</div>
      <div class="sheet-id">
        <h1 class="sheet-name">${escapeHtml(ch.name)}</h1>
        <p class="sheet-tagline">${escapeHtml(d.sp.espece)}${ch.subspecies ? ` (${escapeHtml(ch.subspecies)})` : ch.giantAncestry ? ` (${escapeHtml(giantAncestryLabel(ch.giantAncestry))})` : ''} ${escapeHtml(d.cls.classe_title.toLowerCase())}${d.sub ? ` — ${escapeHtml(d.sub.classe_title)}` : ''} niveau ${ch.level} · ${escapeHtml(d.bg.nom)}</p>
      </div>
      <div class="sheet-head-actions">
        <button class="btn btn-sm ${editMode ? 'btn-gold' : ''}" type="button" id="sheet-editmode"><svg class="icon"><use href="#i-pencil"/></svg> ${editMode ? 'Terminer l\'édition' : 'Modifier'}</button>
        ${editMode ? `<button class="btn btn-sm" type="button" id="sheet-edit-cancel" title="Annule tout ce qui a été modifié depuis l'entrée en édition">↩️ Annuler</button>
        <button class="btn btn-sm" type="button" id="sheet-edit-reset" title="Efface les valeurs fixées à la main : tout redevient calculé par les règles">🧮 Par défaut (règles)</button>` : ''}
        <button class="btn btn-sm" type="button" id="sheet-identity"><svg class="icon"><use href="#i-camera"/></svg> Identité</button>
        ${ch.level < 20 ? `<button class="btn btn-sm" type="button" id="sheet-levelup" title="Passer au niveau ${ch.level + 1}">⬆️ Niveau ${ch.level + 1}</button>` : ''}
        <button class="btn btn-sm" type="button" id="sheet-export"><svg class="icon"><use href="#i-download"/></svg> Exporter</button>
        <button class="btn btn-sm" type="button" id="sheet-print"><svg class="icon"><use href="#i-print"/></svg> Imprimer</button>
        <button class="btn btn-danger btn-sm" type="button" id="sheet-delete" aria-label="Supprimer"><svg class="icon"><use href="#i-trash"/></svg></button>
      </div>
    </div>

    ${editMode ? `<p class="edit-hint no-print">✏️ <strong>Mode édition</strong> — un objet mystérieux, un effet de MJ ?
    Ajuste tout : valeurs de caractéristiques, PV max, CA, initiative, vitesse, maîtrise, perception (champ vide = calcul automatique).
    Clique une sauvegarde ou une compétence pour changer sa maîtrise ; son petit champ « ±0 » ajoute un bonus divers.
    <strong>« Annuler »</strong> revient à l'état d'avant l'édition · <strong>« Par défaut (règles) »</strong> efface les valeurs
    fixées à la main et laisse les règles tout recalculer.</p>` : ''}

    <div class="stat-band no-print">
      ${statTile('i-shield', 'Classe d\'armure', d.ca.value, d.ca.breakdown.join(' '), { ovKey: 'ca', auto: d.caAuto })}
      ${statTile('i-bolt', 'Initiative', fmtMod(d.initiative), 'clic pour lancer',
        { ovKey: 'initiative', auto: fmtMod(d.initiativeAuto), rollAttrs: `style="cursor:pointer" data-roll="${rollAttr(d.initiative)}" data-roll-label="Initiative"` })}
      ${statTile('i-boot', 'Vitesse', `${d.speed.value}&nbsp;m`,
        d.speed.overloaded ? '⚠️ surchargé !' : d.speed.penalized ? 'armure trop lourde !' : '', { ovKey: 'vitesse', auto: d.speedAuto })}
      ${statTile('i-medal', 'Maîtrise', '+' + d.prof, `niveau ${ch.level}`, { ovKey: 'maitrise', auto: '+' + d.profAuto })}
      ${statTile('i-eye', 'Perception passive', d.perception, '', { ovKey: 'perception', auto: d.perceptionAuto })}
      ${statTile('i-d20', 'Dé de vie', 'd' + d.traits.deVieFaces, `${ch.level - ch.hitDiceUsed} / ${ch.level} dispo`)}
    </div>

    <div class="sheet-vitals no-print">
      ${hpWidget}
      ${caracPanel}
    </div>

    <div class="sheet-layout no-print">
      <aside class="sheet-side">
        <h3 class="sheet-side-title"><svg class="icon"><use href="#i-voie"/></svg>Compétences</h3>
        <div class="sheet-side-skills">${skillGroupsHTML}</div>
        <p class="sheet-side-hint">${editMode
          ? 'Mode édition : clic = maîtrise oui / non, champ « ±0 » = bonus divers (objet, effet…).'
          : 'Point doré = maîtrisée (bonus de maîtrise inclus). Un clic lance le d20 · « Modifier » pour ajuster.'}</p>
        <h3 class="sheet-side-title" style="margin-top:20px"><svg class="icon"><use href="#i-swords"/></svg>Maîtrises — armes &amp; outils</h3>
        <div class="side-profs">
          <div class="side-prof" title="Une arme non maîtrisée s'utilise quand même, mais sans le bonus de maîtrise au jet d'attaque.">
            <span class="side-prof-label">⚔️ Armes</span>
            <span class="side-prof-val">${escapeHtml(d.traits.armes || '—')}</span>
          </div>
          <div class="side-prof" title="Porter une armure non maîtrisée impose le Désavantage aux jets de d20 de Force et de Dextérité.">
            <span class="side-prof-label">🛡️ Armures</span>
            <span class="side-prof-val">${escapeHtml(d.traits.armures || 'Aucune')}</span>
          </div>
          <div class="side-prof">
            <span class="side-prof-label">🧰 Outils</span>
            <span class="side-prof-val">${d.toolProfs.length
              ? d.toolProfs.map(t => `<button type="button" class="chip chip-clickable" data-item="${escapeHtml(t)}" title="Maîtrise d'outil (historique) — clique pour la fiche de l'outil">${escapeHtml(t)}</button>`).join(' ')
              : 'Aucun'}</span>
          </div>
        </div>
      </aside>
      <div class="sheet-main">
        <div class="tabs">
          ${tabs.map(t => `<button type="button" class="tab ${t.key === activeTab ? 'is-active' : ''}" data-tab="${t.key}">${t.label}</button>`).join('')}
        </div>
        <div id="sheet-tab-zone"></div>
      </div>
    </div>
    <div id="sheet-print-zone" class="print-only"></div>
  `;

  /* ------------------------- PV : dégâts, soins, temp ------------------------- */
  const amountInput = qs('#hp-amount', view);
  const getAmount = () => clamp(parseInt(amountInput.value, 10) || 1, 1, 999);

  function hpVfx(kind, text){
    const widget = qs('#hp-widget', view);
    if(!widget) return;
    widget.classList.remove('vfx-dmg', 'vfx-heal', 'vfx-temp');
    void widget.offsetWidth; // relance l'animation
    widget.classList.add(kind);
    const float = el('span', { class: `hp-float ${kind}`, text });
    widget.appendChild(float);
    setTimeout(() => float.remove(), 1100);
  }

  qs('#hp-dmg', view).addEventListener('click', () => {
    const amount = getAmount();
    const before = ch.hp.current;
    // Les PV temporaires encaissent d'abord.
    let n = amount;
    const fromTemp = Math.min(ch.hp.temp || 0, n);
    ch.hp.temp = (ch.hp.temp || 0) - fromTemp;
    n -= fromTemp;
    ch.hp.current = clamp(ch.hp.current - n, 0, ch.hp.max);
    // Règle : blessé alors qu'on est déjà à 0 PV = un échec de sauvegarde contre la mort.
    if(before === 0 && n > 0) ch.deathSaves.f = Math.min(3, ch.deathSaves.f + 1);
    if(before > 0 && ch.hp.current === 0) ch.deathSaves = { s: 0, f: 0 };
    persist(); rerender();
    hpVfx('vfx-dmg', `−${amount}`);
  });
  qs('#hp-heal', view).addEventListener('click', () => {
    const n = getAmount();
    ch.hp.current = clamp(ch.hp.current + n, 0, ch.hp.max);
    if(ch.hp.current > 0) ch.deathSaves = { s: 0, f: 0 };
    persist(); rerender();
    hpVfx('vfx-heal', `+${n}`);
  });
  qs('#hp-temp', view).addEventListener('click', () => {
    const n = getAmount();
    // Règle : les PV temporaires ne se cumulent pas, on garde le meilleur.
    ch.hp.temp = Math.max(ch.hp.temp || 0, n);
    persist(); rerender();
    hpVfx('vfx-temp', `+${n} temp.`);
  });

  // Jet de sauvegarde contre la mort : le résultat est appliqué automatiquement
  // (10+ = succès, 9- = échec, 1 naturel = deux échecs, 20 naturel = debout à 1 PV).
  qs('#death-roll', view)?.addEventListener('click', () => {
    const r = roll(1, 20, 0).total;
    if(r === 20){
      ch.hp.current = 1;
      ch.deathSaves = { s: 0, f: 0 };
      persist(); rerender();
      hpVfx('vfx-heal', '+1');
      toast('d20 → 20 naturel ! Tu te relèves à 1 PV !', { icon: '✨' });
      return;
    }
    if(r === 1){
      ch.deathSaves.f = Math.min(3, ch.deathSaves.f + 2);
      toast('d20 → 1 naturel… deux échecs d\'un coup.', { icon: '💀' });
    } else if(r >= 10){
      ch.deathSaves.s = Math.min(3, ch.deathSaves.s + 1);
      toast(`d20 → ${r} : succès !`, { icon: '🎲' });
    } else {
      ch.deathSaves.f = Math.min(3, ch.deathSaves.f + 1);
      toast(`d20 → ${r} : échec…`, { icon: '🎲' });
    }
    persist(); rerender();
  });

  // Pastilles de sauvegarde contre la mort (clic = cocher / décocher).
  qsa('[data-death]', view).forEach(b => b.addEventListener('click', () => {
    const [kind, iStr] = b.dataset.death.split(':');
    const i = Number(iStr);
    const cur = ch.deathSaves[kind] || 0;
    ch.deathSaves[kind] = i < cur ? i : i + 1;
    persist(); rerender();
  }));

  /* ------------------------------- États ------------------------------- */
  qs('#cond-add', view)?.addEventListener('click', () => openConditionsModal(ch, persist, rerender));
  qsa('[data-cond-del]', view).forEach(b => b.addEventListener('click', () => {
    ch.conditions = ch.conditions.filter(id => id !== b.dataset.condDel);
    persist(); rerender();
  }));

  // Maîtrises d'outils du volet latéral : clic = fiche de l'outil.
  qsa('.sheet-side [data-item]', view).forEach(b => b.addEventListener('click', () => openItemModal(b.dataset.item)));

  /* ---------------------------- Mode édition ---------------------------- */
  qs('#sheet-editmode', view).addEventListener('click', () => {
    if(editMode){
      editingId = null;
      editSnapshot = null;
    } else {
      // Instantané de ce que l'édition peut toucher, pour le bouton « Annuler ».
      editingId = ch.id;
      editSnapshot = JSON.stringify({ abilities: ch.abilities, skills: ch.skills, overrides: ch.overrides, hpMax: ch.hp.max });
    }
    rerender();
  });
  qs('#sheet-edit-cancel', view)?.addEventListener('click', () => {
    if(editSnapshot){
      const snap = JSON.parse(editSnapshot);
      ch.abilities = snap.abilities;
      ch.skills = snap.skills;
      ch.overrides = snap.overrides;
      ch.hp.max = snap.hpMax;
      ch.hp.current = Math.min(ch.hp.current, ch.hp.max);
      persist();
    }
    editingId = null;
    editSnapshot = null;
    toast('Modifications annulées — la fiche revient à son état d\'avant.', { icon: '↩️' });
    rerender();
  });
  qs('#sheet-edit-reset', view)?.addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Revenir au calcul par les règles ?',
      message: `Efface <strong>tous les ajustements manuels</strong> (CA, initiative, vitesse, maîtrise,
      perception, bonus divers, maîtrises de sauvegarde modifiées) : tout redevient calculé
      automatiquement par les règles. Les caractéristiques et les PV max ne bougent pas.`,
      confirmLabel: 'Réinitialiser',
    });
    if(!ok) return;
    ch.overrides = { stats: {} };
    persist();
    toast('Retour au calcul automatique selon les règles.', { icon: '🧮' });
    rerender();
  });
  // Les champs d'édition ne doivent pas déclencher le jet / le toggle parent.
  qsa('.ov-input, .skill-bonus-input', view).forEach(inp => inp.addEventListener('click', e => e.stopPropagation()));
  qsa('[data-ov-stat]', view).forEach(inp => inp.addEventListener('change', () => {
    const key = inp.dataset.ovStat;
    if(inp.value === '' || !Number.isFinite(Number(inp.value))) delete ov.stats[key];
    else ov.stats[key] = Number(inp.value);
    persist(); rerender();
  }));
  qsa('[data-ab]', view).forEach(inp => inp.addEventListener('change', () => {
    ch.abilities[inp.dataset.ab] = clamp(parseInt(inp.value, 10) || 10, 1, 30);
    persist(); rerender();
  }));
  qs('#hp-max-edit', view)?.addEventListener('change', (e) => {
    ch.hp.max = clamp(parseInt(e.target.value, 10) || ch.hp.max, 1, 999);
    ch.hp.current = Math.min(ch.hp.current, ch.hp.max);
    persist(); rerender();
  });
  qsa('[data-ov-save]', view).forEach(inp => inp.addEventListener('change', () => {
    if(!ov.saves) ov.saves = {};
    const v = parseInt(inp.value, 10);
    if(!v) delete ov.saves[inp.dataset.ovSave];
    else ov.saves[inp.dataset.ovSave] = v;
    persist(); rerender();
  }));
  qsa('[data-ov-skill]', view).forEach(inp => inp.addEventListener('change', () => {
    if(!ov.skills) ov.skills = {};
    const v = parseInt(inp.value, 10);
    if(!v) delete ov.skills[inp.dataset.ovSkill];
    else ov.skills[inp.dataset.ovSkill] = v;
    persist(); rerender();
  }));
  qsa('[data-toggle-save]', view).forEach(row => row.addEventListener('click', () => {
    if(!ov.saveProf) ov.saveProf = {};
    const key = row.dataset.toggleSave;
    ov.saveProf[key] = !d.saveProf[key];
    persist(); rerender();
  }));
  qsa('[data-toggle-skill]', view).forEach(row => row.addEventListener('click', () => {
    const s = row.dataset.toggleSkill;
    if(ch.skills.includes(s)) ch.skills = ch.skills.filter(x => x !== s);
    else ch.skills.push(s);
    persist(); rerender();
  }));

  /* ---------------- entête : identité, repos, export, impression ---------------- */
  qs('#sheet-identity', view).addEventListener('click', () => openIdentityModal(ch, d, persist, rerender));
  qs('#sheet-levelup', view)?.addEventListener('click', () => openLevelUpModal(ch, d, persist, rerender));
  qs('#sheet-shortrest', view).addEventListener('click', () => openShortRestModal(ch, d, persist, rerender));
  qs('#sheet-rest', view).addEventListener('click', () => {
    ch.hp.current = ch.hp.max;
    ch.hp.temp = 0;
    ch.usedSlots = {};
    ch.usedRes = {};
    ch.deathSaves = { s: 0, f: 0 };
    // Règle : un repos long rend la moitié des dés de vie (minimum 1).
    ch.hitDiceUsed = Math.max(0, ch.hitDiceUsed - Math.max(1, Math.floor(ch.level / 2)));
    persist();
    toast('Repos long : PV, emplacements, ressources — et la moitié des dés de vie.', { icon: '🌙' });
    rerender();
  });
  qs('#sheet-export', view).addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(characterExportPayload(ch), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: `${slugify(ch.name) || 'personnage'}.json` });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast('Fiche exportée en JSON — garde-la précieusement.', { icon: '📦' });
  });
  qs('#sheet-print', view).addEventListener('click', () => {
    qs('#sheet-print-zone', view).innerHTML = printHTML(ch, d);
    window.print();
  });
  qs('#sheet-delete', view).addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Adieu, héros ?',
      message: `Supprimer définitivement <strong>${escapeHtml(ch.name)}</strong> ? Les légendes n'ont pas de corbeille.`,
      confirmLabel: 'Supprimer', danger: true,
    });
    if(ok){ deleteCharacter(ch.id); toast(`${ch.name} quitte la légende.`, { icon: '🕯️' }); navigate('personnages'); }
  });
  qsa('[data-tab]', view).forEach(b => b.addEventListener('click', () => rerender(b.dataset.tab)));

  /* -------------------------------- Onglets -------------------------------- */
  const zone = qs('#sheet-tab-zone', view);
  if(activeTab === 'actions') tabActions(zone, ch, d, persist, rerender);
  else if(activeTab === 'sorts') tabSorts(zone, ch, d, persist, rerender);
  else if(activeTab === 'inventaire') tabInventaire(zone, ch, d, persist, rerender);
  else if(activeTab === 'traits') tabTraits(zone, ch, d, persist, rerender);
  else tabNotes(zone, ch, persist);
}

/* ------------------------------- Repos court -------------------------------
   Une heure de pause : on dépense des dés de vie (1dX + Con chacun), puis les
   capacités « repos court » se rechargent (et la magie de pacte de l'Occultiste). */
function openShortRestModal(ch, d, persist, rerender){
  const faces = d.traits.deVieFaces;
  const conMod = d.mods.constitution;
  const log = [];
  const node = el('div');
  const m = openModal({ title: '🌤️ Repos court', node, className: 'modal-sm' });

  const draw = () => {
    const left = ch.level - ch.hitDiceUsed;
    const full = ch.hp.current >= ch.hp.max;
    node.innerHTML = `
      <p style="color:var(--ink-dim);margin-bottom:10px">Une heure de pause. Chaque <strong>dé de vie</strong>
      dépensé rend <strong>1d${faces}&nbsp;${fmtMod(conMod)}</strong> PV. Les capacités « repos court »
      se rechargent quand tu termines le repos.</p>
      <p style="margin-bottom:10px">PV : <strong>${ch.hp.current} / ${ch.hp.max}</strong> · Dés de vie : <strong>${left} / ${ch.level}</strong></p>
      ${log.length ? `<div class="sr-log">${log.map(l => `<span class="sr-log-line">${l}</span>`).join('')}</div>` : ''}
      ${left <= 0 ? '<p style="color:var(--ink-faint);font-size: calc(13.5px * var(--font-scale));margin-bottom:10px">Plus de dés de vie — un repos long en restaure la moitié.</p>' : ''}
      <div class="confirm-actions">
        <button class="btn btn-primary" type="button" id="sr-roll" ${left <= 0 || full ? 'disabled' : ''}>🎲 Dépenser un dé de vie</button>
        <button class="btn btn-gold" type="button" id="sr-done">Terminer le repos</button>
      </div>`;
    qs('#sr-roll', node)?.addEventListener('click', () => {
      const r = roll(1, faces, conMod);
      const heal = Math.max(0, r.total);
      ch.hitDiceUsed += 1;
      ch.hp.current = clamp(ch.hp.current + heal, 0, ch.hp.max);
      if(ch.hp.current > 0) ch.deathSaves = { s: 0, f: 0 };
      log.unshift(`d${faces} → ${r.rolls[0]}${conMod ? ` ${fmtMod(conMod)}` : ''} = <strong>+${heal} PV</strong>`);
      persist();
      draw();
    });
    qs('#sr-done', node).addEventListener('click', () => {
      for(const def of CLASS_RESOURCES[d.cls.classe_title] || []){
        if(def.reset && /court/i.test(def.reset)) delete ch.usedRes[def.key];
      }
      if(CASTER_TYPE[d.cls.classe_title] === 'pact') ch.usedSlots = {};
      persist();
      m.close();
      toast('Repos court terminé — souffle repris.', { icon: '🌤️' });
      rerender();
    });
  };
  draw();
}

/* -------------------------------- Sous-classe --------------------------------
   Choisie au niveau 3 (règles 2024). Le choix est proposé à la montée de niveau
   qui atteint le niveau 3 — ou à la première montée suivante si le personnage
   l'a dépassé sans choisir. Ensuite, ses capacités arrivent avec les niveaux. */

function capaciteAcc(c, { tag = null, open = false } = {}){
  const kind = featureActionKind(c.capacite_name, String(c.description_html || '').replace(/<[^>]+>/g, ' '));
  return `<details class="acc" ${open ? 'open' : ''}>
    <summary><span class="acc-level">Niv. ${escapeHtml(c.niveau)}</span>${escapeHtml(c.capacite_name)}
      ${kind ? `<span style="margin-left:8px">${actionBadge(kind)}</span>` : ''}
      ${tag ? `<span class="chip chip-arcane" style="margin-left:8px">${escapeHtml(tag)}</span>` : ''}
      <svg class="icon acc-chevron"><use href="#i-chevron"/></svg></summary>
    <div class="acc-body prose">${enrichHTML(c.description_html || '')}</div>
  </details>`;
}

function subclassCardHTML(s, selected){
  const lvls = [...new Set((s.capacites || []).map(c => parseInt(c.niveau, 10)).filter(Number.isFinite))].sort((a, b) => a - b);
  return `<button type="button" class="option-card ${selected ? 'is-selected' : ''}" data-subclass="${s.slug}">
    <div class="card-media">${imgWithFallback(classImageLocal(s.image), s.classe_title, { fallbackEmoji: '🛡️' })}</div>
    <div class="card-body">
      <span class="card-title">${escapeHtml(s.classe_title)}</span>
      <span class="card-sub">Capacités aux niveaux ${lvls.join(', ')}</span>
      <span class="chip" data-sub-detail="${s.slug}" style="margin-top:6px">? tout lire</span>
    </div>
  </button>`;
}

function bindSubclassCards(node, subs, onPick){
  qsa('[data-subclass]', node).forEach(b => b.addEventListener('click', (e) => {
    const det = e.target.closest('[data-sub-detail]');
    if(det){
      openSubclassDetail(subs.find(s => s.slug === det.dataset.subDetail));
      return;
    }
    onPick(b.dataset.subclass);
  }));
}

/** Fiche de lecture d'une sous-classe : description + toutes ses capacités (présentes et futures). */
function openSubclassDetail(sub){
  if(!sub) return;
  const node = el('div');
  node.innerHTML = `
    <div class="prose" style="margin-bottom:12px">${enrichHTML(sub.classe_description || '')}</div>
    ${(sub.capacites || []).map(c => capaciteAcc(c)).join('')}`;
  openModal({ title: sub.classe_title, node });
}

/** Choix de sous-classe hors montée de niveau (personnage déjà niveau 3+ sans sous-classe). */
function openSubclassModal(ch, d, persist, rerender){
  const subs = d.cls.subclasses || [];
  if(!subs.length) return;
  const state = { picked: null };
  const node = el('div');
  const m = openModal({ title: `⚜️ Sous-classe de ${d.cls.classe_title.toLowerCase()}`, node });

  const draw = () => {
    const sel = subs.find(s => s.slug === state.picked);
    const gained = sel ? (sel.capacites || []).filter(c => parseInt(c.niveau, 10) <= ch.level) : [];
    node.innerHTML = `
      <p style="color:var(--ink-dim);margin-bottom:12px">Au niveau 3, chaque ${escapeHtml(d.cls.classe_title.toLowerCase())}
      choisit sa spécialisation. Elle accorde des capacités <strong>dès maintenant</strong>, puis à des niveaux futurs —
      ouvre « ? tout lire » pour comparer avant de trancher : <strong>le choix est définitif</strong>.</p>
      <div class="option-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
        ${subs.map(s => subclassCardHTML(s, state.picked === s.slug)).join('')}
      </div>
      ${gained.length ? `<h3 class="section-title">Capacités acquises au niveau ${ch.level}</h3>
      ${gained.map(c => capaciteAcc(c)).join('')}` : ''}
      <div class="confirm-actions" style="margin-top:18px">
        <button class="btn btn-ghost" type="button" id="sub-cancel">Plus tard</button>
        <button class="btn btn-gold" type="button" id="sub-confirm" ${state.picked ? '' : 'disabled'}>Choisir ${sel ? escapeHtml(sel.classe_title) : ''} ✦</button>
      </div>`;
    bindSubclassCards(node, subs, (slug) => { state.picked = slug; draw(); });
    qs('#sub-cancel', node).addEventListener('click', () => m.close());
    qs('#sub-confirm', node).addEventListener('click', () => {
      if(!state.picked) return;
      ch.subclass = state.picked;
      persist();
      m.close();
      toast(`${ch.name} embrasse la voie « ${sel.classe_title} » !`, { icon: '⚜️' });
      rerender('traits');
    });
  };
  draw();
}

/* ------------------------------ Montée de niveau ------------------------------
   Passage au niveau suivant, tout appliqué d'un coup à la confirmation :
   gain de PV (moyenne fixe ou dé de vie lancé), nouvelles capacités de classe
   et de sous-classe (choisie au niveau 3), bonus de maîtrise, amélioration de
   caractéristiques quand la classe l'accorde, nouveaux sorts pour les lanceurs
   (comptes lus dans la table de la classe). */
function openLevelUpModal(ch, d, persist, rerender){
  const cls = d.cls;
  const newLevel = Math.min(20, ch.level + 1);
  const faces = d.traits.deVieFaces;
  const conMod = d.mods.constitution;
  const avgGain = Math.max(1, Math.floor(faces / 2) + 1 + conMod);
  const profOld = proficiencyBonus(ch.level);
  const profNew = proficiencyBonus(newLevel);

  const newCaps = (cls.capacites || []).filter(c => parseInt(c.niveau, 10) === newLevel);
  const hasASI = newCaps.some(c => /am.{0,2}lioration de caract/i.test(c.capacite_name));

  /* --- Sous-classe : à choisir en atteignant le niveau 3 (ou dès que possible
     si le personnage l'a dépassé sans choisir) ; ensuite, ses capacités du
     nouveau niveau rejoignent les nouveautés. --- */
  const subs = cls.subclasses || [];
  const needSubclass = newLevel >= 3 && !d.sub && subs.length > 0;
  const subNewCaps = d.sub ? (d.sub.capacites || []).filter(c => parseInt(c.niveau, 10) === newLevel) : [];

  /* --- Sorts : ce que le nouveau niveau accorde en plus (table de la classe) --- */
  const caster = isCasterClass(cls.classe_title);
  const table = caster ? parseSpellcastingTable(cls.html_capacites_table) : null;
  const oldRow = table?.[ch.level - 1] || null;
  const newRow = table?.[newLevel - 1] || null;
  const needCantrips = newRow ? Math.max(0, newRow.cantrips - (ch.cantrips || []).length) : 0;
  const needSpells = newRow ? Math.max(0, newRow.known - (ch.spells || []).length) : 0;
  let maxSpellLevel = 1;
  if(newRow){
    if(newRow.pact?.n) maxSpellLevel = newRow.pact.lvl || 1;
    else newRow.slots.forEach((n, i) => { if(n > 0) maxSpellLevel = i + 1; });
  }
  const slotNews = [];
  if(newRow){
    if(newRow.pact?.n){
      if(!oldRow?.pact || oldRow.pact.n !== newRow.pact.n || oldRow.pact.lvl !== newRow.pact.lvl)
        slotNews.push(`${newRow.pact.n} emplacement${newRow.pact.n > 1 ? 's' : ''} de pacte de niveau ${newRow.pact.lvl}`);
    } else {
      newRow.slots.forEach((n, i) => {
        const o = oldRow?.slots?.[i] || 0;
        if(n > o) slotNews.push(`emplacements de niveau ${i + 1} : ${o} → ${n}`);
      });
    }
  }

  const pool = caster ? DATA.getSpellsForClass(cls.classe_title) : [];
  const recoRank = (s) => isRecommendedSpell(cls.classe_title, s) ? 0 : 1;
  const cantripPool = pool.filter(s => s._niveauNum === 0 && !(ch.cantrips || []).includes(s._slug))
    .sort((a, b) => recoRank(a) - recoRank(b) || a._primaryName.localeCompare(b._primaryName));
  const spellPool = pool.filter(s => s._niveauNum >= 1 && s._niveauNum <= maxSpellLevel && !(ch.spells || []).includes(s._slug))
    .sort((a, b) => recoRank(a) - recoRank(b) || (a._niveauNum - b._niveauNum) || a._primaryName.localeCompare(b._primaryName));
  const wantCantrips = Math.min(needCantrips, cantripPool.length);
  const wantSpells = Math.min(needSpells, spellPool.length);

  const state = {
    hpMode: 'avg',
    rolled: null,       // le dé de vie ne se lance qu'une fois, comme à la table
    asiMode: hasASI ? '2' : null,
    asiA: null, asiB: null,
    subclass: null,
    cantrips: [], spells: [],
  };

  const node = el('div');
  const m = openModal({ title: `⬆️ Vers le niveau ${newLevel}`, node });

  const spellBtn = (s, listName) => {
    const sel = state[listName].includes(s._slug);
    const reco = isRecommendedSpell(cls.classe_title, s);
    const kind = spellActionKind(s);
    return `<button type="button" class="spell-row" data-slug="${s._slug}" data-list="${listName}" style="${sel ? 'border-color:var(--gold);box-shadow:inset 3px 0 0 var(--gold)' : ''}">
      <span class="spell-row-img">${imgWithFallback(spellImage(s.name), '', { fallbackEmoji: '✨' })}</span>
      <span class="spell-row-main">
        <span class="spell-row-name">${sel ? '✓ ' : ''}${escapeHtml(s._primaryName)}${reco ? ' <span class="chip chip-reco" title="Un classique fiable pour ta classe">⭐ Recommandé</span>' : ''}</span><br>
        <span class="spell-row-sub">${kind ? actionBadge(kind) + ' ' : ''}${s._niveauNum > 0 ? `Niveau ${s._niveauNum} · ` : ''}${escapeHtml(s.ecole)}${s.concentration ? ' · Concentration' : ''}</span>
      </span>
      <span class="chip" data-detail="${s._slug}" title="Lire la fiche complète du sort">?</span>
    </button>`;
  };

  const asiSelect = (id, current, other, bump) => `
    <select class="select" id="${id}" style="max-width:240px">
      <option value="">—</option>
      ${ABILITIES.map(a => `<option value="${a.key}" ${current === a.key ? 'selected' : ''}
        ${ch.abilities[a.key] + bump > 20 || other === a.key ? 'disabled' : ''}>${a.label} (${ch.abilities[a.key]})</option>`).join('')}
    </select>`;

  const draw = () => {
    const rollGain = state.rolled != null ? Math.max(1, state.rolled + conMod) : null;
    const gain = state.hpMode === 'roll' && rollGain != null ? rollGain : avgGain;
    const asiOk = !hasASI || state.asiMode === 'later'
      || (state.asiMode === '2' ? !!state.asiA : (state.asiA && state.asiB && state.asiA !== state.asiB));
    const spellsOk = state.cantrips.length === wantCantrips && state.spells.length === wantSpells;
    const pickedSub = subs.find(s => s.slug === state.subclass) || null;
    const subOk = !needSubclass || !!pickedSub;
    const ready = asiOk && spellsOk && subOk;

    node.innerHTML = `
      <h3 class="section-title" style="margin-top:0"><svg class="icon"><use href="#i-heart"/></svg>Points de vie</h3>
      <p style="color:var(--ink-dim);margin-bottom:10px">Chaque niveau ajoute <strong>1d${faces} ${fmtMod(conMod)}
      (Constitution)</strong> PV — ou la moyenne fixe, pour qui n'aime pas tenter le destin.</p>
      <div class="lvlup-hp">
        <button type="button" class="option-card ${state.hpMode === 'avg' ? 'is-selected' : ''}" id="lu-avg" ${state.rolled != null ? 'disabled title="Le dé est lancé — on l\'assume !"' : ''}>
          <div class="card-body"><span class="card-title">Moyenne (sûr)</span><span class="card-desc">+${avgGain} PV</span></div>
        </button>
        <button type="button" class="option-card ${state.hpMode === 'roll' ? 'is-selected' : ''}" id="lu-roll">
          <div class="card-body"><span class="card-title">🎲 Lancer 1d${faces}</span>
          <span class="card-desc">${state.rolled != null ? `dé : ${state.rolled} → <strong>+${rollGain} PV</strong>` : 'le dé ne se relance pas !'}</span></div>
        </button>
      </div>

      <h3 class="section-title"><svg class="icon"><use href="#i-medal"/></svg>Nouveautés du niveau ${newLevel}</h3>
      <div class="detail-chips" style="margin-top:0">
        ${profNew !== profOld ? `<span class="chip chip-gold">Bonus de maîtrise : +${profOld} → +${profNew}</span>` : ''}
        <span class="chip">Dés de vie : ${newLevel} d${faces}</span>
        ${slotNews.map(s => `<span class="chip chip-arcane">${s}</span>`).join('')}
      </div>
      ${newCaps.map(c => capaciteAcc(c)).join('')}
      ${subNewCaps.map(c => capaciteAcc(c, { tag: d.sub?.classe_title })).join('')}
      ${newCaps.length + subNewCaps.length === 0 ? '<p style="color:var(--ink-faint);font-size: calc(13.5px * var(--font-scale))">Aucune nouvelle capacité de classe à ce niveau — mais chaque niveau rend plus robuste.</p>' : ''}

      ${needSubclass ? `
      <h3 class="section-title">⚜️ Choisis ta sous-classe</h3>
      <p style="color:var(--ink-dim);margin-bottom:12px">Au niveau 3, chaque ${escapeHtml(cls.classe_title.toLowerCase())}
      choisit sa spécialisation — <strong>le choix est définitif</strong> et il façonnera tes capacités jusqu'au
      niveau 20. Ouvre « ? tout lire » pour comparer : tu y verras aussi les capacités des niveaux futurs.</p>
      <div class="option-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
        ${subs.map(s => subclassCardHTML(s, state.subclass === s.slug)).join('')}
      </div>
      ${pickedSub ? `
        <h4 class="carac-sub" style="margin-top:14px">Capacités gagnées dès maintenant :</h4>
        ${(pickedSub.capacites || []).filter(c => parseInt(c.niveau, 10) <= newLevel).map(c => capaciteAcc(c, { tag: pickedSub.classe_title })).join('')}
        ${(() => {
          const lvls = [...new Set((pickedSub.capacites || []).map(c => parseInt(c.niveau, 10)).filter(n => Number.isFinite(n) && n > newLevel))].sort((a, b) => a - b);
          return lvls.length ? `<p style="color:var(--ink-faint);font-size: calc(13.5px * var(--font-scale));margin-top:8px">Et ce n'est que le début : cette voie t'apportera d'autres capacités aux niveaux ${lvls.join(', ')}.</p>` : '';
        })()}
      ` : ''}` : ''}

      ${hasASI ? `
      <h3 class="section-title"><svg class="icon"><use href="#i-muscle"/></svg>Amélioration de caractéristiques</h3>
      <p style="color:var(--ink-dim);margin-bottom:10px">Ce niveau accorde <strong>+2 à une caractéristique</strong>
      ou <strong>+1 à deux</strong> (maximum 20). Tu peux aussi choisir un <a href="#dons">don</a> à la place —
      prends « Plus tard » et ajuste via « Modifier ».</p>
      <div class="pill-row" style="margin-bottom:12px">
        <button type="button" class="pill ${state.asiMode === '2' ? 'is-active' : ''}" data-asi-mode="2">+2 à une</button>
        <button type="button" class="pill ${state.asiMode === '1-1' ? 'is-active' : ''}" data-asi-mode="1-1">+1 à deux</button>
        <button type="button" class="pill ${state.asiMode === 'later' ? 'is-active' : ''}" data-asi-mode="later">Plus tard / un don</button>
      </div>
      ${state.asiMode === '2' ? asiSelect('lu-asi-a', state.asiA, null, 2) : ''}
      ${state.asiMode === '1-1' ? `<div style="display:flex;gap:12px;flex-wrap:wrap">
        ${asiSelect('lu-asi-a', state.asiA, state.asiB, 1)}
        ${asiSelect('lu-asi-b', state.asiB, state.asiA, 1)}
      </div>` : ''}` : ''}

      ${wantCantrips > 0 ? `
      <h3 class="section-title">✨ Nouveaux sorts mineurs <span style="font-size:.75em;color:var(--ink-faint)">— ${state.cantrips.length} / ${wantCantrips}</span></h3>
      <div class="spell-list lvlup-spells">${cantripPool.map(s => spellBtn(s, 'cantrips')).join('')}</div>` : ''}
      ${wantSpells > 0 ? `
      <h3 class="section-title">✨ Nouveaux sorts préparés <span style="font-size:.75em;color:var(--ink-faint)">— ${state.spells.length} / ${wantSpells} (niveau ${maxSpellLevel} max)</span></h3>
      <div class="spell-list lvlup-spells">${spellPool.map(s => spellBtn(s, 'spells')).join('')}</div>` : ''}

      <div class="confirm-actions" style="margin-top:18px">
        <button class="btn btn-ghost" type="button" id="lu-cancel">Annuler</button>
        <button class="btn btn-gold" type="button" id="lu-confirm" ${ready ? '' : 'disabled'}>Passer au niveau ${newLevel} ✦ (+${gain} PV)</button>
      </div>
      ${ready ? '' : '<p style="color:var(--ink-faint);font-size: calc(13px * var(--font-scale));margin-top:8px">Complète les choix ci-dessus pour confirmer.</p>'}
    `;

    qs('#lu-avg', node)?.addEventListener('click', () => { state.hpMode = 'avg'; draw(); });
    qs('#lu-roll', node).addEventListener('click', () => {
      if(state.rolled == null) state.rolled = roll(1, faces, 0).rolls[0];
      state.hpMode = 'roll';
      draw();
    });
    qsa('[data-asi-mode]', node).forEach(b => b.addEventListener('click', () => {
      state.asiMode = b.dataset.asiMode;
      state.asiA = null; state.asiB = null;
      draw();
    }));
    qs('#lu-asi-a', node)?.addEventListener('change', (e) => { state.asiA = e.target.value || null; draw(); });
    qs('#lu-asi-b', node)?.addEventListener('change', (e) => { state.asiB = e.target.value || null; draw(); });
    if(needSubclass) bindSubclassCards(node, subs, (slug) => { state.subclass = slug; draw(); });
    qsa('[data-slug]', node).forEach(b => b.addEventListener('click', (e) => {
      const detail = e.target.closest('[data-detail]');
      if(detail){
        const s = DATA.sortsBySlug.get(detail.dataset.detail);
        if(s) openSpellModal(s);
        return;
      }
      const listName = b.dataset.list;
      const max = listName === 'cantrips' ? wantCantrips : wantSpells;
      const slug = b.dataset.slug;
      if(state[listName].includes(slug)) state[listName] = state[listName].filter(x => x !== slug);
      else if(state[listName].length < max) state[listName].push(slug);
      draw();
    }));
    qs('#lu-cancel', node).addEventListener('click', () => m.close());
    qs('#lu-confirm', node).addEventListener('click', () => {
      ch.level = newLevel;
      ch.hp.max += gain;
      ch.hp.current = clamp(ch.hp.current + gain, 0, ch.hp.max);
      if(hasASI && state.asiMode === '2' && state.asiA){
        ch.abilities[state.asiA] = Math.min(20, ch.abilities[state.asiA] + 2);
      } else if(hasASI && state.asiMode === '1-1' && state.asiA && state.asiB){
        ch.abilities[state.asiA] = Math.min(20, ch.abilities[state.asiA] + 1);
        ch.abilities[state.asiB] = Math.min(20, ch.abilities[state.asiB] + 1);
      }
      ch.cantrips = [...(ch.cantrips || []), ...state.cantrips];
      ch.spells = [...(ch.spells || []), ...state.spells];
      const chosenSub = needSubclass ? subs.find(s => s.slug === state.subclass) : null;
      if(chosenSub) ch.subclass = chosenSub.slug;
      persist();
      m.close();
      toast(`${ch.name} passe au niveau ${newLevel} ! +${gain} PV max.${chosenSub ? ` Voie « ${chosenSub.classe_title} » embrassée !` : ''}`, { icon: '⬆️' });
      rerender();
    });
  };
  draw();
}

/* --------------------------- Identité du héros ---------------------------
   Nom, portrait, description et apparence, modifiables après la création. */
function openIdentityModal(ch, d, persist, rerender){
  let portrait = ch.portrait || null;
  const node = el('div');
  const avatarHTML = () => portrait
    ? `<img src="${portrait}" alt="">`
    : imgWithFallback(speciesThumb(d.sp.espece), d.sp.espece, { fallbackEmoji: '🛡️' });

  node.innerHTML = `
    <div class="identity-grid">
      <div class="identity-photo">
        <div class="sheet-avatar identity-avatar" id="id-avatar">${avatarHTML()}</div>
        <label class="btn btn-sm"><svg class="icon"><use href="#i-camera"/></svg> Photo
          <input type="file" id="id-photo" accept="image/*" hidden></label>
        <button class="btn btn-ghost btn-sm" type="button" id="id-photo-reset" ${portrait ? '' : 'hidden'}>Retirer</button>
      </div>
      <div class="identity-fields">
        <label class="field-label" for="id-name">Nom du personnage</label>
        <input class="input" id="id-name" maxlength="60" value="${escapeHtml(ch.name)}" autocomplete="off">
        <label class="field-label" for="id-desc" style="margin-top:12px">Description <span style="color:var(--ink-faint);font-weight:400">(caractère, histoire)</span></label>
        <textarea class="input" id="id-desc" rows="3" placeholder="Qui est ce héros ? D'où vient-il ?">${escapeHtml(ch.description || '')}</textarea>
        <label class="field-label" for="id-look" style="margin-top:12px">Apparence</label>
        <textarea class="input" id="id-look" rows="2" placeholder="Taille, allure, signes distinctifs…">${escapeHtml(ch.appearance || '')}</textarea>
      </div>
    </div>
    <div class="confirm-actions" style="margin-top:18px">
      <button class="btn btn-ghost" type="button" id="id-cancel">Annuler</button>
      <button class="btn btn-primary" type="button" id="id-save">Enregistrer</button>
    </div>`;
  const m = openModal({ title: 'Nom, portrait &amp; description', node });

  qs('#id-photo', node).addEventListener('change', (e) => {
    imageFileToDataURL(e.target.files?.[0], 512, (url) => {
      portrait = url;
      qs('#id-avatar', node).innerHTML = avatarHTML();
      qs('#id-photo-reset', node).hidden = false;
    });
  });
  qs('#id-photo-reset', node).addEventListener('click', () => {
    portrait = null;
    qs('#id-avatar', node).innerHTML = avatarHTML();
    qs('#id-photo-reset', node).hidden = true;
  });
  qs('#id-cancel', node).addEventListener('click', () => m.close());
  qs('#id-save', node).addEventListener('click', () => {
    const name = qs('#id-name', node).value.trim();
    if(!name){ toast('Un héros sans nom ? Donne-lui-en un !', { icon: '✍️' }); return; }
    ch.name = name.slice(0, 60);
    ch.portrait = portrait;
    ch.description = qs('#id-desc', node).value.trim();
    ch.appearance = qs('#id-look', node).value.trim();
    persist();
    m.close();
    toast('Identité mise à jour.', { icon: '🪶' });
    rerender();
  });
}

/* --------------------------------- Actions ---------------------------------
   L'onglet central du combat : armes équipées avec jets pré-remplis, puis les
   capacités du personnage rangées par économie d'action (Action / Action bonus /
   Réaction) — chaque rangée s'ouvre en modale de description. Le bouton
   « C'est ton tour ? » ouvre un guide du tour pas-à-pas pour les débutants. */

const OPPORTUNITY_ATTACK = {
  name: 'Attaque d\'opportunité',
  kind: 'reaction',
  source: 'Règle générale',
  sourceKind: 'règle',
  isPlain: true,
  html: 'Quand une créature que tu peux voir quitte ta portée de corps à corps, tu peux utiliser ta Réaction '
    + 'pour lui porter une attaque au corps à corps. C\'est LA réaction que tout le monde possède : elle punit '
    + 'les ennemis qui s\'éloignent sans prendre l\'action Désengagement.',
};

/** Fiche de lecture d'une capacité (classe, sous-classe, espèce, style, règle). */
function openFeatureModal(f){
  const node = el('div');
  node.innerHTML = `
    <div class="detail-chips" style="margin-top:0">
      ${f.kind ? actionBadge(f.kind) : ''}
      <span class="chip">${escapeHtml(f.sourceKind)} · ${escapeHtml(f.source)}</span>
    </div>
    <div class="prose" style="margin-top:12px">${enrichHTML(f.html || '', { isPlainText: !!f.isPlain })}</div>
    ${(f.tables || []).map(t => `<h4 class="carac-sub" style="margin-top:14px">${escapeHtml(t.titre || '')}</h4><div class="prose">${t.html || ''}</div>`).join('')}
  `;
  openModal({ title: escapeHtml(f.name), node });
}

/** Définition de la règle d'une botte d'arme (Renversement, Sape…). */
function openBotteModal(botteName){
  const base = String(botteName || '').split('(')[0].trim();
  const def = DATA.weaponPropertyDefs.get(base);
  openModal({
    title: `Botte : ${escapeHtml(base)}`,
    html: `<p class="item-modal-kind">Botte d'arme — utilisable grâce à la capacité « Bottes d'arme » de ta classe</p>
      <div class="prose">${enrichHTML(def || 'Règle non trouvée dans les données des armes.', { isPlainText: true })}</div>`,
    className: 'modal-sm',
  });
}

/* ------------------------------ États (PV) ------------------------------
   Ajout / retrait des états du glossaire (Empoisonné, À terre, Agrippé…),
   chacun avec sa couleur. Le « ? » ouvre la règle complète. */
function openConditionsModal(ch, persist, rerender){
  const etats = DATA.glossaireRaw?.etats || [];
  const node = el('div');
  openModal({ title: '🩸 États du personnage', node });

  const draw = () => {
    node.innerHTML = `
      <p style="color:var(--ink-dim);margin-bottom:14px">Clique un état pour l'<strong>ajouter</strong> ou le
      <strong>retirer</strong> de la fiche — le « ? » ouvre sa règle complète. Les états actifs restent
      visibles en couleur dans le widget Points de vie.</p>
      <div class="cond-grid">
        ${etats.map(e => {
          const on = ch.conditions.includes(e.id);
          return `<div class="cond-card ${on ? 'is-on' : ''}" style="--cond:${conditionColor(e.id)}">
            <button type="button" class="cond-card-main" data-cond-toggle="${e.id}" title="${escapeHtml(glossExcerpt(e.description, 180))}">
              <span class="cond-dot" aria-hidden="true"></span>${on ? '✓ ' : ''}${escapeHtml(e.terme)}
            </button>
            <button type="button" class="cond-card-help" data-cond-help="${e.id}" aria-label="Règle complète de ${escapeHtml(e.terme)}">?</button>
          </div>`;
        }).join('')}
      </div>`;
    qsa('[data-cond-toggle]', node).forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.condToggle;
      if(ch.conditions.includes(id)) ch.conditions = ch.conditions.filter(x => x !== id);
      else ch.conditions.push(id);
      persist();
      rerender();
      draw();
    }));
    qsa('[data-cond-help]', node).forEach(b => b.addEventListener('click', () => {
      const e = etats.find(x => x.id === b.dataset.condHelp);
      if(!e) return;
      openModal({
        title: escapeHtml(e.terme),
        html: `<p class="item-modal-kind">État — règles 2024</p><div class="prose">${enrichHTML(e.description, { isPlainText: true })}</div>`,
        className: 'modal-sm',
      });
    }));
  };
  draw();
}

const normFeat = (s) => stripAccents(String(s || '')).toLowerCase().replace(/[^a-z0-9]/g, '');

/** Ressource de classe (Rage, Second souffle…) correspondant à une capacité, si elle existe. */
function matchResourceDef(d, ch, featName){
  const n = normFeat(featName);
  if(!n) return null;
  for(const def of CLASS_RESOURCES[d.cls.classe_title] || []){
    if(def.static) continue;
    if(def.minLevel && ch.level < def.minLevel) continue;
    const l = normFeat(def.label);
    if(l.startsWith(n) || n.startsWith(l)) return def;
  }
  return null;
}

function resourceMax(def, ch, d){
  const raw = def.col ? readResourceColumn(d.resourceCols, ch.level, def.col) : null;
  const max = def.uses ? def.uses(d, ch) : parseInt(String(raw ?? '').replace(/[^\d]/g, ''), 10);
  return Number.isFinite(max) && max > 0 ? max : 0;
}

/* ------------------- Ressources : cartes de l'onglet Actions -------------------
   Ressources de classe (Rage, Second souffle, Forme sauvage…) et emplacements
   de sorts vivent dans l'onglet Actions, au plus près du combat. */
function classResourceCardsHTML(ch, d){
  const defs = CLASS_RESOURCES[d.cls.classe_title] || [];
  let resHTML = '';
  for(const def of defs){
    if(def.minLevel && ch.level < def.minLevel) continue;
    const toneStyle = def.tone ? ` style="--res:var(--res-${def.tone})"` : '';
    let raw = def.col ? readResourceColumn(d.resourceCols, ch.level, def.col) : null;
    if(def.static){
      if(!raw || raw === '—') continue;
      resHTML += `<div class="res-card"${toneStyle}>
        <div class="res-card-name">${escapeHtml(def.label)}</div>
        <div class="res-static">${colorizeDamageString(raw)}</div>
      </div>`;
      continue;
    }
    let max = def.uses ? def.uses(d, ch) : parseInt(String(raw ?? '').replace(/[^\d]/g, ''), 10);
    if(!Number.isFinite(max) || max <= 0) continue;
    const used = clamp(ch.usedRes?.[def.key] || 0, 0, max);
    const suffix = def.suffixCol ? readResourceColumn(d.resourceCols, ch.level, def.suffixCol) : null;
    if(max <= 12){
      resHTML += `<div class="res-card"${toneStyle}>
        <div class="res-card-name">${def.icon ? `<svg class="icon"><use href="#${def.icon}"/></svg>` : ''}${escapeHtml(def.label)}${suffix ? ` <span class="chip chip-arcane">${escapeHtml(suffix)}</span>` : ''}</div>
        <div class="token-row">${Array.from({ length: max }, (_, i) =>
          `<button type="button" class="token ${i < used ? 'is-spent' : ''}" data-res="${def.key}" data-max="${max}" data-i="${i}" aria-label="${escapeHtml(def.label)} ${i + 1}" title="${i < used ? 'Dépensé — clique pour récupérer' : 'Disponible — clique pour dépenser'}"></button>`).join('')}
          <span style="color:var(--ink-faint);font-size: calc(13px * var(--font-scale))">${max - used} restant${max - used > 1 ? 's' : ''} · récup. repos ${def.reset || 'long'}</span>
        </div>
      </div>`;
    } else {
      resHTML += `<div class="res-card"${toneStyle}>
        <div class="res-card-name">${def.icon ? `<svg class="icon"><use href="#${def.icon}"/></svg>` : ''}${escapeHtml(def.label)}</div>
        <div class="res-counter">
          <button type="button" class="icon-btn" data-res-step="${def.key}:-1:${max}" aria-label="Dépenser"><svg class="icon"><use href="#i-minus"/></svg></button>
          <span class="res-counter-value">${max - used}</span>
          <span style="color:var(--ink-faint)">/ ${max}</span>
          <button type="button" class="icon-btn" data-res-step="${def.key}:1:${max}" aria-label="Récupérer"><svg class="icon"><use href="#i-plus"/></svg></button>
          <span style="color:var(--ink-faint);font-size: calc(13px * var(--font-scale))">récup. repos ${def.reset || 'long'}</span>
        </div>
      </div>`;
    }
  }
  return resHTML;
}

function spellSlotCardsHTML(ch, d){
  if(!isCasterClass(d.cls.classe_title)) return '';
  const table = parseSpellcastingTable(d.cls.html_capacites_table);
  const row = table?.[ch.level - 1];
  const slotTokens = (lvl, total) => {
    const used = ch.usedSlots?.[lvl] || 0;
    return `<div class="res-card" style="--res:var(--res-arcane)">
      <div class="res-card-name"><svg class="icon"><use href="#i-sorts"/></svg>Emplacements de sorts — niv. ${lvl}</div>
      <div class="token-row">${Array.from({ length: total }, (_, i) =>
        `<button type="button" class="token ${i < used ? 'is-spent' : ''}" data-slot="${lvl}" data-i="${i}" aria-label="Emplacement ${i + 1}"></button>`).join('')}
        <span style="color:var(--ink-faint);font-size: calc(13px * var(--font-scale))">${total - used} restant${total - used > 1 ? 's' : ''}</span>
      </div>
    </div>`;
  };
  let html = '';
  if(row?.pact?.n) html += slotTokens(row.pact.lvl || 1, row.pact.n);
  else if(row) row.slots.forEach((n, i) => { if(n > 0) html += slotTokens(i + 1, n); });
  return html;
}

function bindResourceHandlers(zone, ch, persist, redraw){
  qsa('.act-resources [data-res]', zone).forEach(t => t.addEventListener('click', () => {
    const key = t.dataset.res;
    const max = Number(t.dataset.max);
    const i = Number(t.dataset.i);
    const used = clamp(ch.usedRes?.[key] || 0, 0, max);
    if(!ch.usedRes) ch.usedRes = {};
    ch.usedRes[key] = i < used ? i : i + 1;
    persist();
    redraw();
  }));
  qsa('.act-resources [data-res-step]', zone).forEach(b => b.addEventListener('click', () => {
    const [key, delta, max] = b.dataset.resStep.split(':');
    if(!ch.usedRes) ch.usedRes = {};
    // delta -1 = dépenser (used+1), +1 = récupérer (used-1)
    ch.usedRes[key] = clamp((ch.usedRes[key] || 0) - Number(delta), 0, Number(max));
    persist();
    redraw();
  }));
  qsa('.act-resources [data-slot]', zone).forEach(t => t.addEventListener('click', () => {
    const lvl = t.dataset.slot;
    const i = Number(t.dataset.i);
    const used = ch.usedSlots?.[lvl] || 0;
    if(!ch.usedSlots) ch.usedSlots = {};
    ch.usedSlots[lvl] = i < used ? i : i + 1;
    persist();
    redraw();
  }));
}

function tabActions(zone, ch, d, persist, rerender){
  const weapons = (ch.inventory || []).filter(it => it.equipped && DATA.lookupItem(it.name)?.kind === 'arme');

  // Mains nues (règles 2024) : toujours disponible — For + maîtrise au toucher,
  // dégâts fixes 1 + For (pas de dé), ou Agripper / Pousser (DD 8 + For + maîtrise).
  const unarmedAtk = d.mods.force + d.prof;
  const unarmedDC = 8 + d.mods.force + d.prof;
  const unarmedCard = `<div class="attack-card">
    <div class="attack-card-name">Mains nues 👊 ${actionBadge('action', { compact: true })}</div>
    <div class="attack-card-row">
      <button class="btn btn-primary btn-sm" type="button" data-roll="1d20+${unarmedAtk}" data-roll-label="Attaque — mains nues">Attaque ${fmtMod(unarmedAtk)}</button>
      <span title="Pas de dé de dégâts : les mains nues infligent toujours 1 + modificateur de Force">Dégâts ${Math.max(0, 1 + d.mods.force)} (fixe) ${colorizeDamageString('contondant')}</span>
    </div>
    <div class="attack-card-row">
      <span class="chip" title="Au lieu d'infliger des dégâts, tu peux Agripper ou Pousser la cible : elle doit réussir un jet de sauvegarde de Force ou de Dextérité contre ce DD.">🤼 ou Agripper / Pousser — DD ${unarmedDC}</span>
    </div>
  </div>`;

  let cards = '';
  for(const it of weapons){
    const known = DATA.lookupItem(it.name);
    const w = weaponAttack(ch, d, it, known);
    cards += `<div class="attack-card">
      <div class="attack-card-name"><button type="button" class="link-item" data-item="${escapeHtml(it.name)}" title="Voir les détails de l'arme">${escapeHtml(it.name)}</button> ${w.ranged ? '🏹' : '⚔️'} ${actionBadge('action', { compact: true })}</div>
      <div class="attack-card-row">
        <button class="btn btn-primary btn-sm" type="button" data-roll="1d20+${w.atk}" data-roll-label="Attaque — ${escapeHtml(it.name)}">Attaque ${fmtMod(w.atk)}</button>
        <button class="btn btn-sm" type="button" data-roll="${w.dmg}" data-roll-label="Dégâts — ${escapeHtml(it.name)}">Dégâts ${w.dmg}</button>
        <span>${colorizeDamageString(w.dmgType)}</span>
      </div>
      <div class="attack-card-row">
        ${w.proficient
          ? '<span class="chip chip-gold" title="Ta classe maîtrise cette arme : bonus de maîtrise inclus au jet d\'attaque">✓ maîtrisée</span>'
          : '<span class="chip chip-conc" title="Ta classe ne maîtrise pas cette arme : pas de bonus de maîtrise au jet d\'attaque">✗ non maîtrisée — sans bonus de maîtrise</span>'}
        ${known.botte && w.proficient && d.hasWeaponMastery ? `<button type="button" class="chip chip-arcane chip-clickable" data-botte="${escapeHtml(known.botte)}" title="Botte d'arme (capacité de ta classe) — clique pour lire la règle">⚡ Botte : ${escapeHtml(known.botte)} ?</button>` : ''}
        ${(known.proprietes || []).map(p => `<span class="chip">${escapeHtml(p)}</span>`).join('')}
      </div>
    </div>`;
  }

  const feats = collectFeatureActions(ch, d);
  const allFeats = [...feats, OPPORTUNITY_ATTACK];
  const byKind = (k) => allFeats.filter(f => f.kind === k);

  // Les sorts « non préparés » (gérés dans l'onglet Sorts) restent hors du combat.
  const unprepSet = new Set(ch.unprepared || []);
  const knownSpells = [...(ch.cantrips || []), ...(ch.spells || [])]
    .filter(slug => !unprepSet.has(slug))
    .map(slug => DATA.sortsBySlug.get(slug)).filter(Boolean)
    .sort((a, b) => (a._niveauNum - b._niveauNum) || a._primaryName.localeCompare(b._primaryName));

  /* Sorts d'une catégorie d'économie d'action, en rangées façon onglet Sorts.
     Le temps d'incantation décide de la liste ; pour les réactions et actions
     bonus, la condition de déclenchement (après la virgule du `temps`) est
     affichée : c'est elle qu'on cherche en plein combat. */
  const spellRows = (kind, label) => {
    const list = knownSpells.filter(s => spellActionKind(s) === kind);
    if(list.length === 0) return '';
    return `<h4 class="carac-sub" style="margin-top:14px">✨ ${label}</h4>
      <div class="spell-list is-grid" style="margin-bottom:14px">${list.map(s => {
        const t = String(s.temps || '');
        const trigger = t.includes(',') ? t.slice(t.indexOf(',') + 1).trim() : '';
        return `<button type="button" class="spell-row" data-spell="${s._slug}" title="Lire la fiche complète du sort">
          <span class="spell-row-img">${imgWithFallback(spellImage(s.name), '', { fallbackEmoji: '✨' })}</span>
          <span class="spell-row-main">
            <span class="spell-row-name">${escapeHtml(s._primaryName)}</span><br>
            <span class="spell-row-sub">${s._niveauNum === 0 ? 'à volonté' : 'consomme un emplacement'}${s.concentration ? ' · Concentration' : ''} · Portée ${escapeHtml(s.portee || '—')}${trigger ? `<br><em>${escapeHtml(trigger.charAt(0).toUpperCase() + trigger.slice(1))}</em>` : ''}</span>
          </span>
          <span class="spell-lvl ${s._niveauNum === 0 ? 'is-cantrip' : ''}" title="${s._niveauNum === 0 ? 'Sort mineur — à volonté' : `Sort de niveau ${s._niveauNum}`}">${s._niveauNum === 0 ? 'Mineur' : 'Niv. ' + s._niveauNum}</span>
        </button>`;
      }).join('')}</div>`;
  };

  // Sorts connus trop longs pour un tour (1 minute, 1 heure…) : hors des listes.
  const slowSpells = knownSpells.filter(s => spellActionKind(s) === null);

  const featureRowHTML = (f) => {
    const i = allFeats.indexOf(f);
    let tokens = '';
    if(f.sourceKind === 'classe'){
      const def = matchResourceDef(d, ch, f.name);
      const max = def ? resourceMax(def, ch, d) : 0;
      if(def && max > 0){
        const used = clamp(ch.usedRes?.[def.key] || 0, 0, max);
        tokens = max <= 8
          ? `<span class="feature-tokens" ${def.tone ? `style="--res:var(--res-${def.tone})"` : ''} title="Utilisations — clique un jeton pour dépenser / récupérer">${Array.from({ length: max }, (_, j) =>
              `<button type="button" class="token ${j < used ? 'is-spent' : ''}" data-res="${def.key}" data-max="${max}" data-i="${j}" aria-label="${escapeHtml(def.label)} ${j + 1}"></button>`).join('')}</span>`
          : `<span class="chip chip-gold" title="Utilisations restantes — gère le détail dans l'onglet Traits">${max - used} / ${max}</span>`;
      }
    }
    return `<div class="feature-row" role="button" tabindex="0" data-feature="${i}" title="Clique pour lire la description complète">
      ${actionBadge(f.kind)}
      <span class="feature-name">${escapeHtml(f.name)}</span>
      ${tokens}
      <span class="feature-src">${escapeHtml(f.source)}</span>
      <span class="feature-help" aria-hidden="true">?</span>
    </div>`;
  };

  const actionFeats = byKind('action');
  const bonusFeats = byKind('bonus');
  const reactionFeats = byKind('reaction');

  /* --- Tracker de tour : Action X/X, Action bonus, Réaction, déplacement --- */
  const caster = isCasterClass(d.cls.classe_title);
  if(!caster && actionSubTab === 'magie') actionSubTab = 'attaque';
  if(!caster && bonusSubTab === 'magie') bonusSubTab = 'caps';
  const t = ch.turn;
  const speed = d.speed.value;
  const moveLeft = Math.max(0, Math.round((speed - t.moveUsed) * 2) / 2);
  const fmtM = (n) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 });
  const pips = (used, max, key, what) => Array.from({ length: max }, (_, i) =>
    `<button type="button" class="turn-pip ${i < used ? 'is-spent' : ''}" data-turn-pip="${key}:${i}"
      title="${what} — clique pour ${i < used ? 'récupérer' : 'dépenser'}" aria-label="${what} ${i + 1}"></button>`).join('');

  const resCards = classResourceCardsHTML(ch, d) + spellSlotCardsHTML(ch, d);

  const subtabBtn = (group, key, label, current) =>
    `<button type="button" class="subtab ${current === key ? 'is-active' : ''}" data-subtab="${group}:${key}">${label}</button>`;
  const paneDiv = (group, key, current, inner) =>
    `<div class="subtab-pane" data-pane="${group}:${key}" ${current === key ? '' : 'hidden'}>${inner}</div>`;

  // Actions de base des règles 2024 (Désengagement, Esquive, Étude…), lues du
  // glossaire — Attaque et Magie ont déjà leurs propres onglets.
  const stdActions = (DATA.glossaireRaw?.actions || []).filter(a => a.id !== 'attaque' && a.id !== 'magie');
  const stdRowHTML = (a) => `
    <div class="feature-row" role="button" tabindex="0" data-std-action="${a.id}" title="${escapeHtml(glossExcerpt(a.description, 180))}">
      ${actionBadge('action')}
      <span class="feature-name">${escapeHtml(a.terme)}</span>
      <span class="feature-src">action de base</span>
      <span class="feature-help" aria-hidden="true">?</span>
    </div>`;

  zone.innerHTML = `
    <div class="quick-jump no-print">
      <span class="quick-jump-label">Voir rapidement :</span>
      <button type="button" class="quick-link tone-act" data-jump="act-action"><span class="quick-dot" aria-hidden="true"></span>Action</button>
      <button type="button" class="quick-link tone-bon" data-jump="act-bonus"><span class="quick-dot" aria-hidden="true"></span>Action bonus</button>
      <button type="button" class="quick-link tone-rea" data-jump="act-reaction"><span class="quick-star" aria-hidden="true">★</span>Réaction</button>
    </div>

    <div class="panel turn-tracker">
      <div class="turn-track tone-act">
        <div class="turn-track-head">
          <b>Tour</b>
          <button class="btn btn-sm" type="button" id="turn-new" title="À cliquer quand ton tour commence : recharge l'action, l'action bonus et le déplacement">🔄 Nouveau tour</button>
        </div>
        <div class="turn-track-row">
          <span class="turn-track-label">${actionBadge('action')}</span>
          <span class="turn-pips">${pips(t.actionUsed, t.actionMax, 'action', 'Action')}</span>
          <span class="turn-count">${Math.max(0, t.actionMax - t.actionUsed)} / ${t.actionMax}</span>
          <span class="turn-max-ctrl">
            <button type="button" class="turn-max-btn" data-turn-max="-1" title="Une action de moins par tour (fin d'un effet)" aria-label="Réduire le nombre d'actions">−</button>
            <button type="button" class="turn-max-btn" data-turn-max="1" title="Une action de plus par tour (ex. potion de vitesse)" aria-label="Augmenter le nombre d'actions">＋</button>
          </span>
        </div>
        <div class="turn-track-row tone-bon">
          <span class="turn-track-label">${actionBadge('bonus')}</span>
          <span class="turn-pips">${pips(t.bonusUsed, 1, 'bonus', 'Action bonus')}</span>
          <span class="turn-count">${1 - t.bonusUsed} / 1</span>
        </div>
        <div class="turn-track-row tone-mov">
          <span class="turn-track-label">🥾 Déplacement</span>
          <input type="range" class="turn-move-slider" id="turn-move" min="0" max="${speed}" step="0.5" value="${moveLeft}"
            aria-label="Déplacement restant en mètres" title="Fais glisser vers la gauche pour soustraire les mètres parcourus">
          <span class="turn-count"><b id="turn-move-val">${fmtM(moveLeft)}</b> / ${fmtM(speed)} m</span>
        </div>
      </div>
      <div class="turn-track tone-rea">
        <div class="turn-track-head">
          <b>Round</b>
          <button class="btn btn-sm" type="button" id="round-new" title="À cliquer quand un nouveau round commence : recharge la réaction">🔄 Nouveau round</button>
        </div>
        <div class="turn-track-row">
          <span class="turn-track-label">${actionBadge('reaction')}</span>
          <span class="turn-pips">${pips(t.reactionUsed, 1, 'reaction', 'Réaction')}</span>
          <span class="turn-count">${1 - t.reactionUsed} / 1</span>
        </div>
      </div>
    </div>

    ${resCards ? `<section class="act-resources">
      <h3 class="act-res-title"><svg class="icon"><use href="#i-rage"/></svg> Ressources</h3>
      <div class="card-grid card-grid-lg">${resCards}</div>
      <p class="act-res-hint">Clique un jeton pour dépenser / récupérer — les repos les restaurent.</p>
    </section>` : ''}

    <section class="act-group tone-act" id="act-action">
      <h3 class="act-group-title">${actionBadge('action')} Action <span class="act-group-hint">une par tour</span></h3>
      <div class="subtabs">
        ${subtabBtn('action', 'attaque', '⚔️ Attaquer', actionSubTab)}
        ${caster ? subtabBtn('action', 'magie', '✨ Magie', actionSubTab) : ''}
        ${subtabBtn('action', 'autres', '🎯 Autres actions', actionSubTab)}
      </div>
      ${paneDiv('action', 'attaque', actionSubTab, `
        <div class="card-grid card-grid-lg">${unarmedCard}${cards}</div>
        ${cards ? '' : '<p class="empty-note" style="margin-top:10px">Aucune arme équipée — passe par l\'onglet Inventaire pour en équiper une.</p>'}`)}
      ${caster ? paneDiv('action', 'magie', actionSubTab,
        spellRows('action', 'Lancer un sort — coûte ton action') || '<p class="empty-note">Aucun sort préparé ne se lance en une action.</p>') : ''}
      ${paneDiv('action', 'autres', actionSubTab, `
        ${actionFeats.length ? `<h4 class="carac-sub" style="margin-top:0">Capacités du personnage</h4>${actionFeats.map(featureRowHTML).join('')}` : ''}
        <h4 class="carac-sub" ${actionFeats.length ? '' : 'style="margin-top:0"'}>Actions de base — tout aventurier peut les faire</h4>
        ${stdActions.map(stdRowHTML).join('')}`)}
    </section>

    <section class="act-group tone-bon" id="act-bonus">
      <h3 class="act-group-title">${actionBadge('bonus')} Action bonus <span class="act-group-hint">une par tour, si une capacité te la donne</span></h3>
      ${caster ? `<div class="subtabs">
        ${subtabBtn('bonus', 'caps', '🎯 Capacités', bonusSubTab)}
        ${subtabBtn('bonus', 'magie', '✨ Magie', bonusSubTab)}
      </div>` : ''}
      ${paneDiv('bonus', 'caps', caster ? bonusSubTab : 'caps', bonusFeats.length
        ? bonusFeats.map(featureRowHTML).join('')
        : `<p class="empty-note">Rien pour l'instant — c'est normal ! L'action bonus n'existe que si une capacité te la donne. Ton déplacement et ton action suffisent largement.</p>`)}
      ${caster ? paneDiv('bonus', 'magie', bonusSubTab,
        spellRows('bonus', 'Sorts en action bonus') || '<p class="empty-note">Aucun sort préparé ne se lance en action bonus.</p>') : ''}
    </section>

    <section class="act-group tone-rea" id="act-reaction">
      <h3 class="act-group-title">${actionBadge('reaction')} Réaction <span class="act-group-hint">une par round, même hors de ton tour</span></h3>
      ${reactionFeats.map(featureRowHTML).join('')}
      ${spellRows('reaction', 'Sorts en réaction')}
    </section>

    ${slowSpells.length ? `<div class="histo-chips" style="margin-top:16px">
      <span style="color:var(--ink-faint);font-size: calc(13px * var(--font-scale))">🕰️ Trop longs pour un tour de combat (temps d'incantation en minutes ou en heures) :</span>
      ${slowSpells.map(s => `<button type="button" class="chip chip-clickable" data-spell="${s._slug}" title="Temps d'incantation : ${escapeHtml(s.temps || '')} — clique pour lire la fiche">${escapeHtml(s._primaryName)} (${escapeHtml(String(s.temps || '').split(' ou ')[0].toLowerCase())})</button>`).join('')}
    </div>` : ''}

    <div class="beginner-note"><b>Rappel :</b> l'attaque touche si d20 + bonus ≥ CA de la cible ; sur un
    20 naturel, double les dés de dégâts. Clique une rangée colorée pour lire sa règle complète — et le
    tracker en haut suit ton budget du tour.</div>
  `;

  qsa('[data-item]', zone).forEach(b => b.addEventListener('click', () => openItemModal(b.dataset.item)));
  qsa('[data-botte]', zone).forEach(b => b.addEventListener('click', () => openBotteModal(b.dataset.botte)));
  qsa('[data-spell]', zone).forEach(b => b.addEventListener('click', () => {
    const s = DATA.sortsBySlug.get(b.dataset.spell);
    if(s) openSpellModal(s);
  }));
  qsa('[data-feature]', zone).forEach(row => {
    const open = () => openFeatureModal(allFeats[Number(row.dataset.feature)]);
    row.addEventListener('click', (e) => {
      const t = e.target.closest('[data-res]');
      if(t){
        const key = t.dataset.res;
        const max = Number(t.dataset.max);
        const j = Number(t.dataset.i);
        const used = clamp(ch.usedRes?.[key] || 0, 0, max);
        if(!ch.usedRes) ch.usedRes = {};
        ch.usedRes[key] = j < used ? j : j + 1;
        persist();
        rerender('actions');
        return;
      }
      open();
    });
    row.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); }
    });
  });

  /* --- Sous-onglets Attaquer / Magie / Autres (bascule sans re-rendu) --- */
  qsa('[data-subtab]', zone).forEach(b => b.addEventListener('click', () => {
    const [group, key] = b.dataset.subtab.split(':');
    if(group === 'action') actionSubTab = key;
    else bonusSubTab = key;
    qsa(`[data-subtab^="${group}:"]`, zone).forEach(x => x.classList.toggle('is-active', x === b));
    qsa(`[data-pane^="${group}:"]`, zone).forEach(p => { p.hidden = p.dataset.pane !== `${group}:${key}`; });
  }));

  /* --- Ancres « Voir rapidement » --- */
  qsa('[data-jump]', zone).forEach(b => b.addEventListener('click', () => {
    qs('#' + b.dataset.jump, zone)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  /* --- Tracker de tour --- */
  qsa('[data-turn-pip]', zone).forEach(b => b.addEventListener('click', () => {
    const [key, iStr] = b.dataset.turnPip.split(':');
    const i = Number(iStr);
    const field = key === 'action' ? 'actionUsed' : key === 'bonus' ? 'bonusUsed' : 'reactionUsed';
    const cur = t[field] || 0;
    t[field] = i < cur ? i : i + 1;
    persist();
    rerender('actions');
  }));
  qsa('[data-turn-max]', zone).forEach(b => b.addEventListener('click', () => {
    t.actionMax = clamp(t.actionMax + Number(b.dataset.turnMax), 1, 4);
    t.actionUsed = Math.min(t.actionUsed, t.actionMax);
    persist();
    rerender('actions');
  }));
  qs('#turn-new', zone).addEventListener('click', () => {
    t.actionUsed = 0;
    t.bonusUsed = 0;
    t.moveUsed = 0;
    persist();
    rerender('actions');
    toast('Nouveau tour : action, action bonus et déplacement rechargés.', { icon: '🔄' });
  });
  qs('#round-new', zone).addEventListener('click', () => {
    t.reactionUsed = 0;
    persist();
    rerender('actions');
    toast('Nouveau round : réaction disponible.', { icon: '🔄' });
  });
  const moveSlider = qs('#turn-move', zone);
  moveSlider?.addEventListener('input', () => {
    const left = Math.max(0, Number(moveSlider.value) || 0);
    t.moveUsed = Math.max(0, speed - left);
    qs('#turn-move-val', zone).textContent = fmtM(left);
  });
  moveSlider?.addEventListener('change', persist);

  /* --- Ressources (jetons, compteurs, emplacements de sorts) --- */
  bindResourceHandlers(zone, ch, persist, () => rerender('actions'));

  /* --- Actions de base : règle complète en modale --- */
  qsa('[data-std-action]', zone).forEach(row => {
    const open = () => {
      const a = (DATA.glossaireRaw?.actions || []).find(x => x.id === row.dataset.stdAction);
      if(!a) return;
      openModal({
        title: escapeHtml(a.terme),
        html: `<p class="item-modal-kind">Action de base — règles 2024</p><div class="prose">${enrichHTML(a.description, { isPlainText: true })}</div>`,
        className: 'modal-sm',
      });
    };
    row.addEventListener('click', open);
    row.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); }
    });
  });
}

/* ---------------------------------- Sorts ----------------------------------
   Grille de cartes taguées « Mineur » / « Niv. X », avec gestion complète :
   préparer / dépréparer, retirer, apprendre de nouveaux sorts. Les emplacements
   se cochent dans l'onglet Actions ; DD et attaque vivent dans Caractéristiques. */
function tabSorts(zone, ch, d, persist, rerender){
  const table = parseSpellcastingTable(d.cls.html_capacites_table);
  const row = table?.[ch.level - 1];
  let maxSpellLevel = 1;
  if(row){
    if(row.pact?.n) maxSpellLevel = row.pact.lvl || 1;
    else row.slots.forEach((n, i) => { if(n > 0) maxSpellLevel = i + 1; });
  }
  const cantripsAllowed = row?.cantrips || 0;
  const preparedAllowed = row?.known || 0;
  const unprep = new Set(ch.unprepared || []);
  const preparedCount = (ch.spells || []).filter(s => !unprep.has(s)).length;

  const cardHTML = (slug, isCantrip) => {
    const s = DATA.sortsBySlug.get(slug);
    if(!s) return '';
    const isPrep = !unprep.has(slug);
    const kind = spellActionKind(s);
    return `<div class="scard ${isCantrip || isPrep ? '' : 'is-unprep'}" data-spell-open="${slug}" role="button" tabindex="0" title="Clique pour lire la fiche complète du sort">
      <span class="scard-img">${imgWithFallback(spellImage(s.name), '', { fallbackEmoji: '✨' })}</span>
      <span class="scard-body">
        <span class="scard-name">${escapeHtml(s._primaryName)}</span>
        <span class="scard-meta">${kind ? actionBadge(kind, { compact: true }) + ' ' : ''}${escapeHtml(s.ecole || '')}${s.concentration ? ' · Conc.' : ''} · ${escapeHtml(s.portee || '')}</span>
        <span class="scard-ctrl">
          ${isCantrip ? '' : `<button type="button" class="scard-btn ${isPrep ? 'is-on' : ''}" data-prep="${slug}"
            title="${isPrep ? 'Sort préparé : visible dans l\'onglet Actions — clique pour le dépréparer' : 'Sort non préparé (il attend dans le grimoire) — clique pour le préparer'}">${isPrep ? '✓ Préparé' : '○ Préparer'}</button>`}
          <button type="button" class="scard-btn is-del" data-unlearn="${slug}" title="Retirer ce sort de la fiche" aria-label="Retirer ${escapeHtml(s._primaryName)}">✕</button>
        </span>
      </span>
      <span class="scard-tag ${isCantrip ? 'is-cantrip' : ''}">${isCantrip ? 'Mineur' : 'Niv. ' + s._niveauNum}</span>
    </div>`;
  };

  const sortSlugs = (slugs) => [...slugs].sort((a, b) => {
    const sa = DATA.sortsBySlug.get(a), sb = DATA.sortsBySlug.get(b);
    if(!sa || !sb) return 0;
    return (sa._niveauNum - sb._niveauNum) || sa._primaryName.localeCompare(sb._primaryName);
  });

  zone.innerHTML = `
    <div class="detail-chips" style="margin-top:0">
      <span class="chip chip-cantrip" title="Les sorts mineurs se lancent à volonté, sans dépenser d'emplacement.">Mineur = à volonté</span>
      <span class="chip chip-gold" title="Les sorts de niveau 1+ consomment un emplacement de sort à chaque lancement.">Niv. X = consomme un emplacement</span>
      <span class="chip" title="Les jetons d'emplacements sont dans l'onglet Actions, avec les autres ressources de combat ; le DD et l'attaque de sort sont dans le panneau Caractéristiques.">Emplacements → Actions · DD &amp; attaque → Caractéristiques</span>
    </div>

    <h3 class="section-title sorts-head" style="margin-top:8px">✨ Sorts mineurs
      <span class="sorts-count">${(ch.cantrips || []).length} / ${cantripsAllowed || '—'} connus</span>
      <button class="btn btn-sm" type="button" id="add-cantrip">＋ Ajouter</button>
    </h3>
    <div class="scard-grid">${sortSlugs(ch.cantrips || []).map(sl => cardHTML(sl, true)).join('') || '<p class="empty-note">Aucun sort mineur — clique « ＋ Ajouter ».</p>'}</div>

    <h3 class="section-title sorts-head">📜 Sorts
      <span class="sorts-count">${preparedCount} / ${preparedAllowed || '—'} préparés</span>
      <button class="btn btn-sm" type="button" id="add-spell">＋ Ajouter</button>
    </h3>
    <div class="scard-grid">${sortSlugs(ch.spells || []).map(sl => cardHTML(sl, false)).join('') || '<p class="empty-note">Aucun sort appris — clique « ＋ Ajouter ».</p>'}</div>

    <div class="beginner-note"><b>Préparé ou pas ?</b> Seuls les sorts <strong>✓ préparés</strong> apparaissent
    dans l'onglet Actions. Après un repos long, tu peux échanger : déprépare un sort, prépares-en un autre.
    Les sorts mineurs, eux, sont toujours prêts.</div>
  `;

  // Clic sur la carte = fiche du sort ; les boutons internes gèrent le grimoire.
  qsa('[data-spell-open]', zone).forEach(card => {
    const open = () => {
      const s = DATA.sortsBySlug.get(card.dataset.spellOpen);
      if(s) openSpellModal(s);
    };
    card.addEventListener('click', (e) => {
      if(e.target.closest('[data-prep], [data-unlearn]')) return;
      open();
    });
    card.addEventListener('keydown', (e) => {
      if((e.key === 'Enter' || e.key === ' ') && e.target === card){ e.preventDefault(); open(); }
    });
  });
  qsa('[data-prep]', zone).forEach(b => b.addEventListener('click', () => {
    const slug = b.dataset.prep;
    if(unprep.has(slug)){
      if(preparedAllowed && preparedCount >= preparedAllowed){
        toast(`Déjà ${preparedCount} sorts préparés sur ${preparedAllowed} — déprépare-en un d'abord.`, { icon: '📜' });
        return;
      }
      ch.unprepared = (ch.unprepared || []).filter(x => x !== slug);
    } else {
      ch.unprepared = [...(ch.unprepared || []), slug];
    }
    persist();
    rerender('sorts');
  }));
  qsa('[data-unlearn]', zone).forEach(b => b.addEventListener('click', async () => {
    const slug = b.dataset.unlearn;
    const s = DATA.sortsBySlug.get(slug);
    const ok = await confirmDialog({
      title: 'Retirer ce sort ?',
      message: `Retirer <strong>${escapeHtml(s?._primaryName || slug)}</strong> de la fiche ? Tu pourras le réapprendre via « ＋ Ajouter ».`,
      confirmLabel: 'Retirer', danger: true,
    });
    if(!ok) return;
    ch.cantrips = (ch.cantrips || []).filter(x => x !== slug);
    ch.spells = (ch.spells || []).filter(x => x !== slug);
    ch.unprepared = (ch.unprepared || []).filter(x => x !== slug);
    persist();
    rerender('sorts');
  }));
  qs('#add-cantrip', zone).addEventListener('click', () => openAddSpellModal(ch, d, { cantrip: true, maxSpellLevel }, persist, rerender));
  qs('#add-spell', zone).addEventListener('click', () => openAddSpellModal(ch, d, { cantrip: false, maxSpellLevel }, persist, rerender));
}

/** Apprendre un nouveau sort dans la liste de la classe (hors montée de niveau). */
function openAddSpellModal(ch, d, { cantrip, maxSpellLevel }, persist, rerender){
  const node = el('div');
  openModal({ title: cantrip ? '✨ Apprendre un sort mineur' : `📜 Apprendre un sort (niveau ${maxSpellLevel} max)`, node });
  const recoRank = (s) => isRecommendedSpell(d.cls.classe_title, s) ? 0 : 1;
  let q = '';

  const draw = () => {
    const known = new Set([...(ch.cantrips || []), ...(ch.spells || [])]);
    const pool = DATA.getSpellsForClass(d.cls.classe_title)
      .filter(s => cantrip ? s._niveauNum === 0 : (s._niveauNum >= 1 && s._niveauNum <= maxSpellLevel))
      .filter(s => !known.has(s._slug))
      .filter(s => !q || stripAccents(s._primaryName).toLowerCase().includes(q))
      .sort((a, b) => recoRank(a) - recoRank(b) || (a._niveauNum - b._niveauNum) || a._primaryName.localeCompare(b._primaryName));

    node.innerHTML = `
      <input class="input" id="addspell-q" type="search" placeholder="Chercher un sort… (ex. lumière)" value="${escapeHtml(q)}" style="margin-bottom:12px;width:100%" aria-label="Chercher un sort">
      <div class="spell-list" style="max-height:52vh;overflow-y:auto;padding-right:4px">
        ${pool.map(s => {
          const reco = isRecommendedSpell(d.cls.classe_title, s);
          const kind = spellActionKind(s);
          return `<button type="button" class="spell-row" data-learn="${s._slug}">
            <span class="spell-row-img">${imgWithFallback(spellImage(s.name), '', { fallbackEmoji: '✨' })}</span>
            <span class="spell-row-main">
              <span class="spell-row-name">${escapeHtml(s._primaryName)}${reco ? ' <span class="chip chip-reco" title="Un classique fiable pour ta classe">⭐ Recommandé</span>' : ''}</span><br>
              <span class="spell-row-sub">${kind ? actionBadge(kind) + ' ' : ''}${s._niveauNum > 0 ? `Niveau ${s._niveauNum} · ` : 'Mineur · '}${escapeHtml(s.ecole || '')}${s.concentration ? ' · Concentration' : ''}</span>
            </span>
            <span class="chip" data-detail="${s._slug}" title="Lire la fiche complète avant d'apprendre">?</span>
          </button>`;
        }).join('') || '<p class="empty-note">Aucun sort ne correspond à cette recherche.</p>'}
      </div>`;

    const input = qs('#addspell-q', node);
    input.addEventListener('input', () => {
      q = stripAccents(input.value).toLowerCase().trim();
      const raw = input.value;
      draw();
      const ni = qs('#addspell-q', node);
      ni.value = raw;
      ni.focus();
      ni.setSelectionRange(raw.length, raw.length);
    });
    qsa('[data-learn]', node).forEach(b => b.addEventListener('click', (e) => {
      const det = e.target.closest('[data-detail]');
      if(det){
        const s = DATA.sortsBySlug.get(det.dataset.detail);
        if(s) openSpellModal(s);
        return;
      }
      const slug = b.dataset.learn;
      const s = DATA.sortsBySlug.get(slug);
      if(!s) return;
      if(cantrip) ch.cantrips = [...(ch.cantrips || []), slug];
      else ch.spells = [...(ch.spells || []), slug];
      persist();
      toast(`${s._primaryName} rejoint le grimoire !`, { icon: '✨' });
      rerender('sorts');
      draw();
    }));
  };
  draw();
}

/* ------------------------ Détails d'un objet (modale) ------------------------
   Ouvre la fiche complète d'un objet connu du Grimoire (arme, armure, outil,
   matériel, objet magique) — accessible en cliquant son nom dans la fiche. */
const ITEM_KIND_LABEL = {
  arme: 'Arme', armure: 'Armure', outil: 'Outil',
  materiel: 'Matériel d\'aventurier', objet_magique: 'Objet magique',
};

export function openItemModal(name){
  const known = DATA.lookupItem(name);
  if(!known) return;
  const kv = (label, value) => value ? `<div class="item-kv-row"><span class="item-kv-label">${label}</span><span>${value}</span></div>` : '';
  const propChip = (p) => {
    const def = DATA.weaponPropertyDefs.get(p.split('(')[0].trim());
    return `<span class="chip" ${def ? `title="${escapeHtml(def)}"` : ''}>${escapeHtml(p)}</span>`;
  };

  let body = '';
  if(known.kind === 'arme'){
    body = kv('Catégorie', escapeHtml(known.categorie || ''))
      + kv('Dégâts', colorizeDamageString(known.degats || '—'))
      + kv('Propriétés', (known.proprietes || []).map(propChip).join(' ') || '—')
      + kv('Botte', escapeHtml(known.botte || ''))
      + kv('Poids', escapeHtml(known.poids || ''))
      + kv('Prix', escapeHtml(known.prix || ''))
      + '<p class="item-modal-hint">Survole une propriété pour lire sa définition.</p>';
  } else if(known.kind === 'armure'){
    body = kv('Catégorie', escapeHtml(known.categorie || ''))
      + kv('Classe d\'armure', escapeHtml(known.ca || ''))
      + kv('Force requise', escapeHtml(known.force || ''))
      + kv('Discrétion', escapeHtml(known.discretion || ''))
      + kv('Poids', escapeHtml(known.poids || ''))
      + kv('Prix', escapeHtml(known.cout || ''));
  } else if(known.kind === 'outil'){
    body = kv('Caractéristique', escapeHtml(known.caracteristique || ''))
      + kv('Poids', escapeHtml(known.poids || ''))
      + kv('Prix', escapeHtml(known.prix || ''))
      + ((known.utilisations || []).length ? `<p style="margin-top:12px"><strong>Utilisations :</strong></p>
        <ul class="item-modal-list">${known.utilisations.map(u => `<li>${escapeHtml(u.action)} <span class="kw-dc">DD ${escapeHtml(String(u.dd))}</span></li>`).join('')}</ul>` : '')
      + ((known.artisanat || []).length ? `<p style="margin-top:10px"><strong>Artisanat :</strong> ${escapeHtml(known.artisanat.join(', '))}</p>` : '');
  } else if(known.kind === 'objet_magique'){
    body = kv('Type', escapeHtml(known.type || ''))
      + kv('Rareté', escapeHtml(known.rarete || ''))
      + kv('Lien', escapeHtml(known.lien || ''))
      + (known.description ? `<div class="prose" style="margin-top:12px">${enrichHTML(known.description, { isPlainText: true })}</div>` : '');
  } else {
    body = kv('Prix', escapeHtml(known.prix || ''))
      + kv('Poids', escapeHtml(known.poids || ''))
      + (known.description ? `<div class="prose" style="margin-top:12px">${enrichHTML(known.description, { isPlainText: true })}</div>` : '');
  }

  openModal({
    title: escapeHtml(known.nom),
    html: `<p class="item-modal-kind">${ITEM_KIND_LABEL[known.kind] || 'Objet'}</p><div class="item-kv">${body}</div>`,
    className: 'modal-sm',
  });
}

/* -------------------------------- Inventaire -------------------------------- */
function tabInventaire(zone, ch, d, persist, rerender){
  const rows = (ch.inventory || []).map((it, i) => {
    const known = DATA.lookupItem(it.name);
    const equippable = known && (known.kind === 'arme' || known.kind === 'armure');
    const wKg = known?.poids ? parseWeightKg(known.poids) * (it.qty || 1) : 0;
    return `<div class="inv-row">
      <span class="inv-name">${known
        ? `<button type="button" class="link-item" data-item="${escapeHtml(it.name)}" title="Voir les détails">${escapeHtml(it.name)}</button> <span style="color:var(--ink-faint);font-size:.85em">(${known.kind === 'armure' ? known.categorie : known.kind})</span>`
        : escapeHtml(it.name)}</span>
      <span class="inv-qty-ctrl">
        <button class="inv-qty-btn" type="button" data-qty="${i}:-1" aria-label="Moins">−</button>
        <span class="inv-qty">× ${it.qty || 1}</span>
        <button class="inv-qty-btn" type="button" data-qty="${i}:1" aria-label="Plus">+</button>
      </span>
      <span class="inv-weight">${wKg ? wKg.toLocaleString('fr-FR', { maximumFractionDigits: 2 }) + ' kg' : '—'}</span>
      ${equippable ? `<button type="button" class="inv-equip ${it.equipped ? 'is-on' : ''}" data-equip="${i}">${it.equipped ? 'Équipé' : 'Équiper'}</button>` : ''}
      <button class="icon-btn" type="button" data-del="${i}" aria-label="Retirer" style="width:30px;height:30px"><svg class="icon" style="width:15px;height:15px"><use href="#i-trash"/></svg></button>
    </div>`;
  }).join('');

  const pct = d.capacity.carry > 0 ? clamp(Math.round((d.totalWeight / d.capacity.carry) * 100), 0, 100) : 0;
  const fmtKg = (n) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 });

  const fmtPo = (n) => n.toLocaleString('fr-FR', { maximumFractionDigits: 2 });

  zone.innerHTML = `
    <div class="detail-chips" style="margin-top:0">
      <span class="chip"><svg class="icon" style="width:15px;height:15px"><use href="#i-shield"/></svg> CA ${d.ca.value}</span>
      ${d.armorItem ? `<span class="chip">${escapeHtml(d.armorItem.nom)}</span>` : '<span class="chip">Sans armure</span>'}
      ${d.hasShield ? '<span class="chip">Bouclier (+2)</span>' : ''}
    </div>

    <div class="purse">
      <div class="purse-head">
        <span class="purse-title"><svg class="icon"><use href="#i-coin"/></svg> La bourse</span>
        <span class="purse-total">Total : <b id="purse-total">${fmtPo(coinsTotalPo(ch.coins))}</b> po</span>
      </div>
      <div class="purse-coins">
        ${COINS.map(c => `<label class="purse-coin coin-${c.key}" title="Pièces de ${c.label.toLowerCase()} (1 ${c.key} = ${c.inPo} po)">
          <span class="coin-dot" aria-hidden="true"></span>
          <input class="input purse-input" type="number" min="0" max="999999" value="${ch.coins[c.key]}" data-coin="${c.key}" aria-label="Pièces de ${c.label.toLowerCase()}">
          <span class="purse-coin-label">${c.key} · ${c.label}</span>
        </label>`).join('')}
      </div>
      <p class="purse-hint">1 pp = 10 po · 1 po = 2 pe = 10 pa = 100 pc — le total convertit tout en or.</p>
    </div>

    <div class="carry-panel ${d.overloaded ? 'is-over' : ''}">
      <div class="carry-head">
        <span class="carry-title"><svg class="icon"><use href="#i-weight"/></svg> Capacité de charge</span>
        <span class="carry-nums"><b>${fmtKg(d.totalWeight)}</b> / ${fmtKg(d.capacity.carry)} kg</span>
      </div>
      <div class="carry-bar"><div class="carry-fill ${pct >= 100 ? 'is-critical' : pct >= 75 ? 'is-low' : ''}" style="width:${pct}%"></div></div>
      <div class="carry-details">
        <span>Taille <b>${d.sizeCat}</b> × Force <b>${ch.abilities.force}</b> → porter <b>${fmtKg(d.capacity.carry)} kg</b></span>
        <span>· pousser / tirer / soulever : <b>${fmtKg(d.capacity.pushDragLift)} kg</b></span>
      </div>
      ${d.overloaded ? '<p class="carry-warn">⚠️ Charge dépassée : ta Vitesse est plafonnée à 1,50 m tant que tu portes tout ça.</p>' : ''}
    </div>

    <div class="list-rows" style="margin-top:14px">${rows || '<p class="empty-note">Sacoche vide.</p>'}</div>
    <form id="inv-add" class="initiative-form autocomplete-wrap" style="max-width:480px">
      <input class="input" id="inv-name" placeholder="Ajouter un objet (ex. Potion de soins)" autocomplete="off" role="combobox" aria-expanded="false" aria-label="Ajouter un objet">
      <button class="btn btn-sm" type="submit"><svg class="icon"><use href="#i-plus"/></svg></button>
      <div class="autocomplete" id="inv-suggest" hidden></div>
    </form>
    <div class="beginner-note"><b>Équiper compte !</b> L'armure et le bouclier équipés fixent ta CA ;
    les armes équipées apparaissent dans l'onglet Actions avec leurs jets pré-remplis.</div>
  `;

  qsa('[data-coin]', zone).forEach(inp => inp.addEventListener('change', () => {
    ch.coins[inp.dataset.coin] = clamp(parseInt(inp.value, 10) || 0, 0, 999999);
    inp.value = ch.coins[inp.dataset.coin];
    qs('#purse-total', zone).textContent = fmtPo(coinsTotalPo(ch.coins));
    persist();
  }));
  qsa('[data-item]', zone).forEach(b => b.addEventListener('click', () => openItemModal(b.dataset.item)));
  qsa('[data-equip]', zone).forEach(b => b.addEventListener('click', () => {
    const it = ch.inventory[Number(b.dataset.equip)];
    const known = DATA.lookupItem(it.name);
    if(!it.equipped && known?.kind === 'armure' && !/bouclier/i.test(known.categorie)){
      // Une seule armure portée à la fois.
      for(const other of ch.inventory){
        const ok = DATA.lookupItem(other.name);
        if(ok?.kind === 'armure' && !/bouclier/i.test(ok.categorie)) other.equipped = false;
      }
    }
    it.equipped = !it.equipped;
    persist();
    rerender('inventaire');
  }));
  qsa('[data-del]', zone).forEach(b => b.addEventListener('click', () => {
    ch.inventory.splice(Number(b.dataset.del), 1);
    persist();
    rerender('inventaire');
  }));
  qsa('[data-qty]', zone).forEach(b => b.addEventListener('click', () => {
    const [i, delta] = b.dataset.qty.split(':').map(Number);
    const it = ch.inventory[i];
    it.qty = Math.max(1, (it.qty || 1) + delta);
    persist();
    rerender('inventaire');
  }));

  /* --------------- Ajout avec suggestions (objets connus) --------------- */
  const input = qs('#inv-name', zone);
  const suggestBox = qs('#inv-suggest', zone);
  let suggestions = [];
  let selected = -1;

  const allItems = [...DATA.itemLookup.values()];
  const closeSuggest = () => {
    suggestBox.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    selected = -1;
  };
  const renderSuggest = () => {
    if(suggestions.length === 0){ closeSuggest(); return; }
    suggestBox.innerHTML = suggestions.map((s, i) => `
      <button type="button" class="autocomplete-item ${i === selected ? 'is-selected' : ''}" data-pick="${escapeHtml(s.nom)}">
        <span>${escapeHtml(s.nom)}</span>
        <span class="autocomplete-kind">${escapeHtml(s.kind === 'armure' ? s.categorie : s.kind.replace('_', ' '))}</span>
      </button>`).join('');
    suggestBox.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };
  const updateSuggest = () => {
    const q = stripAccents(input.value).toLowerCase().trim();
    if(q.length < 2){ suggestions = []; closeSuggest(); return; }
    const starts = [], contains = [];
    for(const it of allItems){
      const name = stripAccents(it.nom).toLowerCase();
      if(name.startsWith(q)) starts.push(it);
      else if(name.includes(q)) contains.push(it);
      if(starts.length >= 8) break;
    }
    suggestions = [...starts, ...contains].slice(0, 8);
    selected = -1;
    renderSuggest();
  };
  const addItem = (name) => {
    if(!name) return;
    const existing = ch.inventory.find(it => it.name.toLowerCase() === name.toLowerCase());
    if(existing) existing.qty = (existing.qty || 1) + 1;
    else ch.inventory.push({ name, qty: 1, equipped: false });
    persist();
    rerender('inventaire');
  };

  input.addEventListener('input', updateSuggest);
  input.addEventListener('keydown', (e) => {
    if(suggestBox.hidden) return;
    if(e.key === 'ArrowDown'){ e.preventDefault(); selected = (selected + 1) % suggestions.length; renderSuggest(); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); selected = (selected - 1 + suggestions.length) % suggestions.length; renderSuggest(); }
    else if(e.key === 'Enter' && selected >= 0){ e.preventDefault(); addItem(suggestions[selected].nom); }
    else if(e.key === 'Escape'){ closeSuggest(); }
  });
  suggestBox.addEventListener('mousedown', (e) => {
    const b = e.target.closest('[data-pick]');
    if(b){ e.preventDefault(); addItem(b.dataset.pick); }
  });
  input.addEventListener('blur', () => setTimeout(closeSuggest, 120));
  qs('#inv-add', zone).addEventListener('submit', (e) => {
    e.preventDefault();
    addItem(input.value.trim());
  });
}

/* ---------------------------------- Traits ---------------------------------- */
function tabTraits(zone, ch, d, persist, rerender){
  const classCaps = (d.cls.capacites || []).filter(c => parseInt(c.niveau, 10) <= ch.level);

  /* ----- Sous-classe : capacités acquises, ou invitation à la choisir ----- */
  const subs = d.cls.subclasses || [];
  let subclassHTML = '';
  if(d.sub){
    const gained = (d.sub.capacites || []).filter(c => parseInt(c.niveau, 10) <= ch.level);
    const futureLvls = [...new Set((d.sub.capacites || []).map(c => parseInt(c.niveau, 10)).filter(n => Number.isFinite(n) && n > ch.level))].sort((a, b) => a - b);
    subclassHTML = `
      <h3 class="section-title">⚜️ Sous-classe : ${escapeHtml(d.sub.classe_title)}</h3>
      ${gained.map(c => capaciteAcc(c)).join('') || '<p class="empty-note">Ses capacités arrivent aux prochains niveaux.</p>'}
      ${futureLvls.length ? `<p style="color:var(--ink-faint);font-size: calc(13.5px * var(--font-scale));margin-top:6px">À venir sur cette voie : nouvelles capacités aux niveaux ${futureLvls.join(', ')}.</p>` : ''}`;
  } else if(ch.level >= 3 && subs.length){
    subclassHTML = `
      <div class="beginner-note" style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <span><b>⚜️ Niveau ${ch.level} atteint :</b> il est temps de choisir ta sous-classe —
        elle t'apporte des capacités dès maintenant !</span>
        <button class="btn btn-gold btn-sm" type="button" id="pick-subclass">Choisir ma sous-classe</button>
      </div>`;
  }

  /* ----- Don d'origine de l'historique : description complète depuis dons.json ----- */
  const donName = String(d.bg.don || '').trim();
  const donBase = donName.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const donNorm = stripAccents(donBase).toLowerCase();
  const donEntry = DATA.donsBySlug.get(slugify(donBase))
    || DATA.dons.find(dn => stripAccents(dn._primaryName).toLowerCase() === donNorm
      || stripAccents(dn._altName || '').toLowerCase() === donNorm)
    || null;
  const donHTML = donName ? `
    <details class="acc" open>
      <summary>🎁 Don d'origine : ${escapeHtml(donName)}
        <span class="chip chip-arcane" style="margin-left:8px">offert par « ${escapeHtml(d.bg.nom)} »</span>
        <svg class="icon acc-chevron"><use href="#i-chevron"/></svg></summary>
      <div class="acc-body prose">${donEntry
        ? enrichHTML(donEntry.html_description || '')
        : `<p>Description introuvable dans les données — retrouve ce don sur la page <a href="#dons">Dons</a>.</p>`}</div>
    </details>` : '';

  /* ----- Style de combat (si la classe y a droit) ----- */
  const fsLevel = FIGHTING_STYLE_LEVEL[d.cls.classe_title];
  let fsHTML = '';
  if(fsLevel && ch.level >= fsLevel){
    const current = FIGHTING_STYLES.find(f => f.id === ch.fightingStyle);
    fsHTML = `<h3 class="section-title"><svg class="icon"><use href="#i-swords"/></svg>Style de combat</h3>
      <div class="panel" style="padding:16px 20px">
        <select class="select" id="fs-select" aria-label="Style de combat" style="max-width:340px">
          <option value="">— Choisir un style de combat —</option>
          ${FIGHTING_STYLES.map(f => `<option value="${f.id}" ${ch.fightingStyle === f.id ? 'selected' : ''}>${escapeHtml(f.nom)}</option>`).join('')}
        </select>
        ${current ? `<p style="margin-top:10px;color:var(--ink-dim)">${escapeHtml(current.desc)}</p>
        ${['archerie', 'defense', 'duel', 'armes-de-lancer'].includes(current.id) ? '<p style="margin-top:6px;color:var(--success);font-size:.9em">✓ Effet appliqué automatiquement (CA / jets d\'attaque / dégâts).</p>' : ''}` : ''}
      </div>`;
  }

  /* ----- Maîtrises (armes, armures, outils) ----- */
  const profHTML = `<h3 class="section-title"><svg class="icon"><use href="#i-medal"/></svg>Maîtrises</h3>
    <div class="detail-chips" style="margin-top:0">
      <span class="chip chip-gold"><svg class="icon" style="width:14px;height:14px"><use href="#i-swords"/></svg> Armes : ${escapeHtml(d.traits.armes || '—')}</span>
      <span class="chip"><svg class="icon" style="width:14px;height:14px"><use href="#i-shield"/></svg> Armures : ${escapeHtml(d.traits.armures || 'Aucune')}</span>
      <span class="chip chip-arcane">Sauvegardes : ${escapeHtml(d.traits.sauvegardes.join(', '))}</span>
      ${d.toolProfs.map(t => `<span class="chip chip-skill">🧰 ${escapeHtml(t)}</span>`).join('')}
    </div>
    <p style="color:var(--ink-faint);font-size:.9em;margin-top:6px">Une arme non maîtrisée s'utilise
    quand même — mais <strong>sans le bonus de maîtrise</strong> au jet d'attaque (voir l'onglet Actions).</p>`;

  /* ----- Identité (description & apparence, éditables via « Identité ») ----- */
  const idHTML = (ch.description || ch.appearance) ? `
    <h3 class="section-title" style="margin-top:0"><svg class="icon"><use href="#i-perso"/></svg>Identité</h3>
    <div class="panel" style="padding:14px 18px">
      ${ch.description ? `<p style="color:var(--ink-dim)"><strong>Description :</strong> ${escapeHtml(ch.description)}</p>` : ''}
      ${ch.appearance ? `<p style="color:var(--ink-dim)${ch.description ? ';margin-top:6px' : ''}"><strong>Apparence :</strong> ${escapeHtml(ch.appearance)}</p>` : ''}
    </div>` : '';

  zone.innerHTML = `
    ${idHTML}
    ${fsHTML}
    ${profHTML}
    <h3 class="section-title">Capacités de ${escapeHtml(d.cls.classe_title.toLowerCase())} (niveau ${ch.level})</h3>
    ${classCaps.map(c => capaciteAcc(c)).join('')}
    ${subclassHTML}
    <h3 class="section-title">Traits de ${escapeHtml(d.sp.espece)}</h3>
    ${(d.sp.capacites || []).map(c => {
      const kind = featureActionKind(c.nom, c.description || '');
      return `<details class="acc">
      <summary>${escapeHtml(c.nom)}${kind ? `<span style="margin-left:8px">${actionBadge(kind)}</span>` : ''}<svg class="icon acc-chevron"><use href="#i-chevron"/></svg></summary>
      <div class="acc-body prose">${enrichHTML(c.description || '', { isPlainText: true })}</div>
    </details>`;
    }).join('')}
    <h3 class="section-title">Historique : ${escapeHtml(d.bg.nom)}</h3>
    ${donHTML}
    <div class="panel">${historiqueDetailHTML(d.bg)}</div>
    <p style="color:var(--ink-faint);font-size: calc(13px * var(--font-scale));margin-top:10px">💡 Les ressources
    de classe (Rage, emplacements de sorts…) se gèrent désormais dans l'onglet <strong>Actions</strong>.</p>
  `;

  qs('#pick-subclass', zone)?.addEventListener('click', () => openSubclassModal(ch, d, persist, rerender));

  qs('#fs-select', zone)?.addEventListener('change', (e) => {
    ch.fightingStyle = e.target.value || null;
    persist();
    rerender('traits');
  });
}

/* ---------------------------------- Notes ----------------------------------- */
function tabNotes(zone, ch, persist){
  zone.innerHTML = `
    <label class="field-label" for="notes-area">Journal de ${escapeHtml(ch.name)}</label>
    <textarea class="input" id="notes-area" rows="12" placeholder="Alliés rencontrés, dettes contractées, dragons contrariés…">${escapeHtml(ch.notes || '')}</textarea>
    <p style="color:var(--ink-faint);font-size: calc(13.5px * var(--font-scale));margin-top:8px">Sauvegardé automatiquement.</p>
  `;
  const area = qs('#notes-area', zone);
  let t;
  area.addEventListener('input', () => {
    ch.notes = area.value;
    clearTimeout(t);
    t = setTimeout(persist, 400);
  });
}

/* -------------------------------- Impression -------------------------------- */
function printHTML(ch, d){
  const weapons = (ch.inventory || []).filter(it => it.equipped && DATA.lookupItem(it.name)?.kind === 'arme');
  const spellNames = (slugs) => slugs.map(s => DATA.sortsBySlug.get(s)?._primaryName).filter(Boolean).join(', ');
  return `
    <h1 style="font-size: calc(24px * var(--font-scale))">${escapeHtml(ch.name)}</h1>
    <p>${escapeHtml(d.sp.espece)}${ch.subspecies ? ` (${escapeHtml(ch.subspecies)})` : ch.giantAncestry ? ` (${escapeHtml(giantAncestryLabel(ch.giantAncestry))})` : ''} ${escapeHtml(d.cls.classe_title.toLowerCase())}${d.sub ? ` — ${escapeHtml(d.sub.classe_title)}` : ''} niveau ${ch.level} · ${escapeHtml(d.bg.nom)}</p>
    <p><strong>CA ${d.ca.value}</strong> · PV max ${ch.hp.max} · Vitesse ${d.speed.value} m · Initiative ${fmtMod(d.initiative)} · Maîtrise +${d.prof} · Perception passive ${d.perception}</p>
    <p>${ABILITIES.map(a => `<strong>${a.short}</strong> ${ch.abilities[a.key]} (${fmtMod(d.mods[a.key])})`).join(' · ')}</p>
    <p><strong>Sauvegardes :</strong> ${escapeHtml(d.traits.sauvegardes.join(', '))} · <strong>Compétences :</strong> ${escapeHtml(ch.skills.join(', '))}</p>
    <p><strong>Maîtrises d'armes :</strong> ${escapeHtml(d.traits.armes || '—')} · <strong>Outils :</strong> ${escapeHtml(d.toolProfs.join(', ') || '—')} · <strong>Charge :</strong> ${d.totalWeight.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} / ${d.capacity.carry.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} kg</p>
    <p><strong>Don d'origine :</strong> ${escapeHtml(d.bg.don || '—')}${(ch.conditions || []).length ? ` · <strong>États :</strong> ${escapeHtml(ch.conditions.map(id => (DATA.glossaireRaw?.etats || []).find(e => e.id === id)?.terme || id).join(', '))}` : ''}</p>
    ${weapons.length ? `<p><strong>Attaques :</strong> ${weapons.map(it => {
      const known = DATA.lookupItem(it.name);
      const w = weaponAttack(ch, d, it, known);
      return `${escapeHtml(it.name)} ${fmtMod(w.atk)}${w.proficient ? '' : ' (non maîtrisée)'} (${w.dmg} ${escapeHtml(w.dmgType)})`;
    }).join(' · ')}</p>` : ''}
    ${(ch.cantrips || []).length ? `<p><strong>Sorts mineurs :</strong> ${escapeHtml(spellNames(ch.cantrips))}</p>` : ''}
    ${(ch.spells || []).length ? `<p><strong>Sorts préparés :</strong> ${escapeHtml(spellNames(ch.spells))}</p>` : ''}
    <p><strong>Inventaire :</strong> ${(ch.inventory || []).map(i => `${i.qty > 1 ? i.qty + '× ' : ''}${escapeHtml(i.name)}`).join(', ')}</p>
    <p><strong>Bourse :</strong> ${COINS.map(c => `${ch.coins?.[c.key] || 0} ${c.key}`).join(' · ')} — soit ${coinsTotalPo(ch.coins || {}).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} po</p>
    ${ch.notes ? `<p><strong>Notes :</strong> ${escapeHtml(ch.notes)}</p>` : ''}
    <p style="margin-top:10px;font-style:italic">Le Grimoire de Seisan — fiche de table</p>
  `;
}
