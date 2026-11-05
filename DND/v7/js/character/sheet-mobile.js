// Fiche de personnage « mode expérimental » : interface mobile à menu à cinq directions
// (maquette Stitch « Character Sheet - Pokemon Menu Concept »). Elle lit et écrit les mêmes
// données que la fiche classique et réutilise ses onglets : mêmes mécaniques, mêmes sauvegardes.

import { el, escapeHtml, qs, qsa, fmtMod } from '../utils.js';
import { speciesThumb, imgWithFallback } from '../images.js';
import { toast, openModal, openPopover } from '../ui.js';
import { saveCharacter } from './storage.js';
import { derive } from './derive.js';
import { ABILITIES, SKILL_ABILITY, SPELLCASTING_ABILITY, isCasterClass, skillProfMultiplier } from './rules.js';
import {
  ensureCharacterShape, tabActions, tabSorts, tabInventaire, tabTraits, tabNotes,
  openShortRestModal, openConditionsModal, openIdentityModal, etatById, conditionColor, glossExcerpt,
} from './sheet.js';
import {
  applyDamage, applyHeal, applyTempHp, applyLongRest, rollDeathSave, toggleDeathPip, deathSaveMessage,
} from './vitals.js';
import { setExperimental } from '../settings.js';

const SECTIONS = {
  actions: { title: 'Actions de combat' },
  traits: { title: 'Traits & capacités' },
  inventaire: { title: 'Sac & équipement' },
  sorts: { title: 'Grimoire de sorts' },
  caracteristiques: { title: 'Caractéristiques & compétences' },
  notes: { title: 'Notes du héros' },
};

let currentSection = 'actions';
let lastCharacterId = null;
let lastRoll = null;

// Polices de la maquette (Cinzel, Rajdhani), chargées seulement quand on entre dans ce mode.
function ensureFonts(){
  if(qs('link[data-xs-fonts]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.dataset.xsFonts = '1';
  link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&family=Rajdhani:wght@600;700&display=swap';
  document.head.append(link);
}

const rollAttr = (bonus) => `1d20${bonus ? (bonus > 0 ? '+' + bonus : bonus) : ''}`;
const fmtMeters = (n) => String(n).replace('.', ',');

/* ------------------------------ Journal de dés ------------------------------ */
function rollSummaryHTML(r){
  if(!r) return 'Prêt pour le lancer';
  const flag = r.faces === 20 && r.rolls.length === 1 ? (r.rolls[0] === 20 ? ' is-crit' : r.rolls[0] === 1 ? ' is-fumble' : '') : '';
  const detail = r.rolls.join(' + ') + (r.mod ? (r.mod > 0 ? ' + ' : ' − ') + Math.abs(r.mod) : '');
  return `<span class="xs-roll-name">${escapeHtml(r.label)} :</span> <b class="xs-roll-total${flag}">${r.total}</b> <span class="xs-roll-detail">(${escapeHtml(detail)})</span>`;
}
document.addEventListener('grimoire:roll', (e) => {
  lastRoll = e.detail;
  const n = qs('#xs-dice-result');
  if(n) n.innerHTML = rollSummaryHTML(lastRoll);
});

/* ------------------------------ Blocs de l'écran ------------------------------ */
const STAR = `<svg class="xs-star" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36"/></svg>`;
const SHIELD = `<svg class="xs-shield" viewBox="0 0 100 120" aria-hidden="true"><path d="M50 5 L92 20 L92 65 C92 95 50 115 50 115 C50 115 8 95 8 65 L8 20 Z"/></svg>`;
const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;

function identityHTML(ch, d){
  const subtitle = d.sub?.classe_title || ch.subspecies || '';
  return `
    <header class="xs-ident">
      <div class="xs-ident-left">
        <p class="xs-kicker">${escapeHtml(d.sp.espece)}</p>
        <p class="xs-class">${escapeHtml(d.cls.classe_title)} <span>Niv.${ch.level}</span></p>
      </div>
      <div class="xs-ident-center">
        <h1 class="xs-name">${escapeHtml(ch.name)}</h1>
        ${subtitle ? `<span class="xs-sub">${escapeHtml(subtitle)}</span>` : ''}
      </div>
      <div class="xs-ident-right">
        <span class="xs-kicker">Historique</span>
        <span class="xs-bg-chip">${escapeHtml(d.bg.nom)}</span>
      </div>
    </header>`;
}

function heroHTML(ch, d){
  const hp = ch.hp;
  const ratio = hp.max > 0 ? hp.current / hp.max : 0;
  const hpTone = hp.current === 0 ? 'is-down' : ratio <= .25 ? 'is-low' : 'is-ok';
  const portrait = ch.portrait
    ? `<img src="${ch.portrait}" alt="Portrait de ${escapeHtml(ch.name)}">`
    : imgWithFallback(speciesThumb(d.sp.espece), d.sp.espece, { fallbackEmoji: '🛡️' });
  return `
    <section class="xs-hero">
      <div class="xs-col">
        <button type="button" class="xs-stat xs-stat-bm" data-xs-info="bm" aria-label="Bonus de maîtrise ${fmtMod(d.prof)}">
          ${STAR}<span class="xs-stat-num">${fmtMod(d.prof)}</span>
        </button>
        <span class="xs-stat-label">BM</span>
        <button type="button" class="xs-stat xs-stat-ca" data-xs-info="ca" aria-label="Classe d'armure ${d.ca.value}">
          ${SHIELD}<span class="xs-stat-num">${d.ca.value}<small>CA</small></span>
        </button>
      </div>

      <div class="xs-center">
        <div class="xs-ring">
          <button type="button" class="xs-camera" id="xs-identity" aria-label="Modifier l'identité et le portrait">${icon('i-camera')}</button>
          <div class="xs-portrait">${portrait}</div>
        </div>
        <div class="xs-hp" role="group" aria-label="Points de vie">
          <button type="button" class="xs-hp-btn is-dmg" id="xs-hp-minus" aria-label="Retirer 1 PV">−1</button>
          <button type="button" class="xs-hp-pill ${hpTone}" id="xs-hp-open" aria-label="PV ${hp.current} sur ${hp.max} — gérer les points de vie">
            <span class="xs-hp-lbl">PV</span><b>${hp.current}</b><i>/</i><span>${hp.max}</span>
          </button>
          <button type="button" class="xs-hp-btn is-heal" id="xs-hp-plus" aria-label="Ajouter 1 PV">+1</button>
          <button type="button" class="xs-hp-temp ${hp.temp > 0 ? 'is-on' : ''}" id="xs-hp-temp" aria-label="PV temporaires : ${hp.temp}">
            ${icon('i-shield-plus')}<b>+${hp.temp}</b>
          </button>
        </div>
      </div>

      <div class="xs-col">
        <button type="button" class="xs-stat xs-stat-box" data-xs-info="speed" aria-label="Vitesse ${fmtMeters(d.speed.value)} mètres">
          ${icon('i-boot')}<span class="xs-stat-num">${fmtMeters(d.speed.value)}m</span>
        </button>
        <span class="xs-stat-label">Vitesse</span>
        <button type="button" class="xs-stat xs-stat-box" data-roll="${rollAttr(d.initiative)}" data-roll-label="Initiative" aria-label="Initiative ${fmtMod(d.initiative)} — toucher pour lancer">
          ${icon('i-bolt')}<span class="xs-stat-num">${fmtMod(d.initiative)}</span>
        </button>
        <span class="xs-stat-label">Init</span>
      </div>
    </section>`;
}

function statusHTML(ch){
  const etats = etatById();
  const chips = ch.conditions.map(id => {
    const e = etats.get(id);
    if(!e) return '';
    return `<button type="button" class="cond-chip" style="--cond:${conditionColor(id)}" data-cond-del="${id}"
      title="${escapeHtml(glossExcerpt(e.description))} — toucher pour retirer l'état">${escapeHtml(e.terme)}<span class="cond-x" aria-hidden="true">✕</span></button>`;
  }).join('');
  const ds = ch.deathSaves;
  const dying = ch.hp.current === 0;
  const pips = (kind, n) => [0, 1, 2].map(i =>
    `<button type="button" class="death-pip is-${kind} ${i < n ? 'is-on' : ''}" data-death="${kind}:${i}" aria-label="${kind === 's' ? 'Succès' : 'Échec'} ${i + 1}"></button>`).join('');
  return `
    <section class="xs-status" aria-label="États et sauvegardes contre la mort">
      <div class="cond-zone">
        <span class="cond-title">États :</span>
        ${chips || '<span class="cond-none">aucun</span>'}
        <button type="button" class="cond-add" id="xs-cond-add">＋ État</button>
      </div>
      ${dying ? `
      <div class="xs-death">
        <strong>☠️ Sauvegardes contre la mort</strong>
        <div class="death-rows">
          <div class="death-row"><span class="death-label">Succès</span>${pips('s', ds.s)}</div>
          <div class="death-row"><span class="death-label">Échecs</span>${pips('f', ds.f)}</div>
        </div>
        <button class="btn btn-sm" type="button" id="xs-death-roll" ${ds.s >= 3 || ds.f >= 3 ? 'disabled' : ''}>🎲 Lancer le d20</button>
      </div>` : ''}
    </section>`;
}

function hubHTML(caster){
  const right = caster
    ? { key: 'sorts', label: 'Sorts', icon: 'i-sorts' }
    : { key: 'notes', label: 'Notes', icon: 'i-quill' };
  const on = (k) => currentSection === k ? ' is-active' : '';
  const press = (k) => `aria-pressed="${currentSection === k}"`;
  return `
    <section class="xs-menu" aria-label="Menu tactique">
      <p class="xs-menu-title">Menu tactique Arcana</p>
      <div class="xs-hub-frame">
        <div class="xs-hub">
          <button type="button" class="xs-facet facet-top${on('traits')}" data-xs-section="traits" ${press('traits')}>
            ${icon('i-scroll')}<span>Traits</span>
          </button>
          <button type="button" class="xs-facet facet-left${on('inventaire')}" data-xs-section="inventaire" ${press('inventaire')}>
            ${icon('i-bag')}<span>Sac</span>
          </button>
          <button type="button" class="xs-facet facet-center${on('actions')}" data-xs-section="actions" ${press('actions')}>
            <em>${currentSection === 'actions' ? 'Actif' : 'Combat'}</em><strong>Actions</strong><small>Attaques &amp; tours</small>
          </button>
          <button type="button" class="xs-facet facet-right${on(right.key)}" data-xs-section="${right.key}" ${press(right.key)}>
            ${icon(right.icon)}<span>${right.label}</span>
          </button>
          <button type="button" class="xs-facet facet-bottom${on('caracteristiques')}" data-xs-section="caracteristiques" ${press('caracteristiques')}>
            ${icon('i-d20')}<span>Caract / Compétences</span>
          </button>
        </div>
      </div>
    </section>`;
}

function abilityStripHTML(ch, d, castKey){
  return `
    <footer class="xs-abilities" aria-label="Caractéristiques — toucher pour lancer un test">
      ${ABILITIES.map(a => `
        <button type="button" class="xs-ab ${a.key === castKey ? 'is-key' : ''}" data-roll="${rollAttr(d.mods[a.key])}" data-roll-label="Jet de ${escapeHtml(a.label)}" title="${escapeHtml(a.label)}">
          <span class="xs-ab-name">${a.short}</span>
          <b>${ch.abilities[a.key]}</b>
          <span class="xs-ab-mod">${fmtMod(d.mods[a.key])}</span>
        </button>`).join('')}
    </footer>`;
}

/* ----------------------- Section « Caractéristiques / Compétences » ----------------------- */
function caracteristiquesHTML(ch, d){
  const ov = ch.overrides;
  const abilityTile = (a) => {
    const prof = d.saveProf[a.key];
    const saveBonus = d.mods[a.key] + (prof ? d.prof : 0) + (ov.saves?.[a.key] || 0);
    return `
      <div class="xs-ability ${prof ? 'is-prof' : ''}">
        <span class="xs-ability-name">${a.label}${prof ? ' ★' : ''}</span>
        <button type="button" class="xs-ability-mod" data-roll="${rollAttr(d.mods[a.key])}" data-roll-label="Jet de ${escapeHtml(a.label)}">${fmtMod(d.mods[a.key])}</button>
        <span class="xs-ability-score">${ch.abilities[a.key]}</span>
        <button type="button" class="xs-save" data-roll="${rollAttr(saveBonus)}" data-roll-label="Sauvegarde de ${escapeHtml(a.label)}">Sauv. ${fmtMod(saveBonus)}${prof ? ' ★' : ''}</button>
      </div>`;
  };
  const skillBonus = (skill) => {
    const key = SKILL_ABILITY[skill];
    return d.mods[key] + skillProfMultiplier(ch, skill) * d.prof + (ov.skills?.[skill] || 0);
  };
  const skillBtn = (skill) => {
    const prof = ch.skills.includes(skill);
    const expert = skillProfMultiplier(ch, skill) === 2;
    const ab = ABILITIES.find(a => a.key === SKILL_ABILITY[skill]);
    const b = skillBonus(skill);
    return `<button type="button" class="xs-skill ${prof ? 'is-prof' : ''}" data-roll="${rollAttr(b)}" data-roll-label="${escapeHtml(skill)}">
      <span>${prof ? `<i aria-hidden="true">${expert ? '★★' : '★'}</i>` : ''}${escapeHtml(skill)} <small>(${ab.short})</small></span><b>${fmtMod(b)}</b>
    </button>`;
  };
  const all = Object.keys(SKILL_ABILITY).sort((a, b) => a.localeCompare(b, 'fr'));
  const proficient = all.filter(s => ch.skills.includes(s));
  const others = all.filter(s => !ch.skills.includes(s));
  return `
    <div class="xs-ability-grid">${ABILITIES.map(abilityTile).join('')}</div>
    <p class="xs-subtitle">Compétences maîtrisées <span>(${proficient.length})</span></p>
    <div class="xs-skill-grid">${proficient.map(skillBtn).join('') || '<p class="empty-note">Aucune compétence maîtrisée.</p>'}</div>
    <p class="xs-subtitle">Autres compétences</p>
    <div class="xs-skill-grid">${others.map(skillBtn).join('')}</div>
    <div class="xs-facts">
      <span>👁️ Perception passive <b>${d.perception}</b></span>
      <span>⚔️ ${escapeHtml(d.traits.armes || '—')}</span>
      <span>🛡️ ${escapeHtml(d.traits.armures || 'Aucune armure')}</span>
    </div>
    <p class="xs-hint">Un toucher lance le d20. Pour ajuster des valeurs à la main (objet, effet du MJ), passe en mode classique.</p>`;
}

/* ------------------------------------ Écran ------------------------------------ */
export function renderExperimentalSheet(view, ch, tab){
  ensureFonts();
  ensureCharacterShape(ch);
  const d = derive(ch);
  if(!d.cls || !d.sp || !d.bg){
    view.innerHTML = '<p class="empty-note">Ce personnage référence des données introuvables.</p>';
    return;
  }
  const caster = isCasterClass(d.cls.classe_title);
  if(ch.id !== lastCharacterId){ currentSection = 'actions'; lastCharacterId = ch.id; }
  if(tab && SECTIONS[tab]) currentSection = tab;
  if(currentSection === 'sorts' && !caster) currentSection = 'actions';
  if(currentSection === 'notes' && caster) currentSection = 'actions';

  const castKey = caster ? SPELLCASTING_ABILITY[d.cls.classe_title] : null;
  const persist = () => saveCharacter(ch);
  const redraw = () => renderExperimentalSheet(view, ch);

  document.body.classList.add('exp-sheet');
  view.innerHTML = `
    <div class="xs-sheet">
      <div class="xs-topline">
        <a class="back-link" href="#personnages">${icon('i-back')} Mes personnages</a>
        <button type="button" class="xs-mode" id="xs-classic" title="Revenir à la fiche classique (mêmes données)">
          ${icon('i-cube')}<span>Mode classique</span>
        </button>
      </div>
      ${identityHTML(ch, d)}
      ${heroHTML(ch, d)}
      ${statusHTML(ch)}
      ${hubHTML(caster)}
      <section class="xs-deck" aria-live="polite">
        <div class="xs-deck-head">
          <h2><span class="xs-dot" aria-hidden="true"></span>${SECTIONS[currentSection].title}</h2>
          <div class="xs-rest">
            <button type="button" id="xs-short-rest" title="Une heure de pause : dépense des dés de vie pour récupérer des PV">${icon('i-camp')}Court</button>
            <button type="button" id="xs-long-rest" title="Une nuit de sommeil : PV, emplacements et ressources récupérés">${icon('i-bed')}Long</button>
          </div>
        </div>
        <div id="xs-zone" class="xs-zone"></div>
        <div class="xs-dice" role="status">
          <span class="xs-dice-label">${icon('i-d20')} Journal de dés :</span>
          <span id="xs-dice-result" class="xs-dice-result">${rollSummaryHTML(lastRoll)}</span>
        </div>
      </section>
      ${abilityStripHTML(ch, d, castKey)}
    </div>`;

  /* --- Contenu de la section : les onglets de la fiche classique, tels quels --- */
  const zone = qs('#xs-zone', view);
  if(currentSection === 'actions') tabActions(zone, ch, d, persist, redraw);
  else if(currentSection === 'sorts') tabSorts(zone, ch, d, persist, redraw);
  else if(currentSection === 'inventaire') tabInventaire(zone, ch, d, persist, redraw);
  else if(currentSection === 'traits') tabTraits(zone, ch, d, persist, redraw);
  else if(currentSection === 'notes') tabNotes(zone, ch, persist);
  else zone.innerHTML = caracteristiquesHTML(ch, d);

  /* --- Menu à cinq directions --- */
  qsa('[data-xs-section]', view).forEach(b => b.addEventListener('click', () => {
    currentSection = b.dataset.xsSection;
    redraw();
    qs('.xs-deck', view)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }));

  /* --- Mode, identité, repos --- */
  qs('#xs-classic', view).addEventListener('click', () => setExperimental(false));
  qs('#xs-identity', view).addEventListener('click', () => openIdentityModal(ch, d, persist, redraw));
  qs('#xs-short-rest', view).addEventListener('click', () => openShortRestModal(ch, d, persist, redraw));
  qs('#xs-long-rest', view).addEventListener('click', () => {
    applyLongRest(ch);
    persist();
    toast('Repos long : PV, emplacements, ressources et tous les dés de vie.', { icon: '🌙' });
    redraw();
  });

  /* --- Points de vie --- */
  qs('#xs-hp-minus', view).addEventListener('click', () => { applyDamage(ch, 1); persist(); redraw(); });
  qs('#xs-hp-plus', view).addEventListener('click', () => { applyHeal(ch, 1); persist(); redraw(); });
  qs('#xs-hp-open', view).addEventListener('click', () => openHpModal(ch, persist, redraw));
  qs('#xs-hp-temp', view).addEventListener('click', () => openHpModal(ch, persist, redraw));

  /* --- États et sauvegardes contre la mort --- */
  qs('#xs-cond-add', view).addEventListener('click', () => openConditionsModal(ch, persist, redraw));
  qsa('[data-cond-del]', view).forEach(b => b.addEventListener('click', () => {
    ch.conditions = ch.conditions.filter(id => id !== b.dataset.condDel);
    persist(); redraw();
  }));
  qs('#xs-death-roll', view)?.addEventListener('click', () => {
    const res = rollDeathSave(ch);
    persist(); redraw();
    const msg = deathSaveMessage(res);
    toast(msg.text, { icon: msg.icon });
  });
  qsa('[data-death]', view).forEach(b => b.addEventListener('click', () => {
    const [kind, i] = b.dataset.death.split(':');
    toggleDeathPip(ch, kind, Number(i));
    persist(); redraw();
  }));

  /* --- Bulles d'explication (BM, CA, vitesse) --- */
  const INFO = {
    bm: { title: 'Bonus de maîtrise (BM)', category: 'bonus', body: `<p>Il s'ajoute à tes jets d'attaque, tests et sauvegardes <strong>où tu es compétent</strong>. À ton niveau (${ch.level}) : <strong>${fmtMod(d.prof)}</strong>.</p>` },
    ca: { title: `Classe d'armure : ${d.ca.value}`, category: 'défense', body: `<p>Une attaque te touche si son jet atteint ou dépasse ce score.</p><p><em>${escapeHtml(d.ca.breakdown.join(' '))}</em></p>` },
    speed: { title: `Vitesse : ${fmtMeters(d.speed.value)} m`, category: 'déplacement', body: `<p>Distance que tu peux parcourir à ton tour.</p>${d.speed.overloaded ? '<p>⚠️ Surchargé : ta vitesse est réduite.</p>' : d.speed.penalized ? '<p>Armure trop lourde : ta vitesse est réduite.</p>' : ''}` },
  };
  qsa('[data-xs-info]', view).forEach(b => b.addEventListener('click', () => {
    const info = INFO[b.dataset.xsInfo];
    if(info) openPopover(b, { title: info.title, category: info.category, bodyHTML: info.body });
  }));
}

/* Gestion fine des PV : quantité libre, dégâts / soins / PV temporaires. */
function openHpModal(ch, persist, redraw){
  const node = el('div', { class: 'xs-hpmodal' });
  node.innerHTML = `
    <p class="xs-hpmodal-now">PV <b>${ch.hp.current}</b> / ${ch.hp.max}${ch.hp.temp ? ` · temp. <b>${ch.hp.temp}</b>` : ''}</p>
    <label class="field-label" for="xs-hp-amount">Quantité</label>
    <input class="input" id="xs-hp-amount" type="number" inputmode="numeric" min="1" max="999" value="1">
    <div class="xs-hpmodal-actions">
      <button type="button" class="btn btn-hp-dmg" data-act="dmg">Dégâts</button>
      <button type="button" class="btn btn-hp-heal" data-act="heal">Soins</button>
      <button type="button" class="btn btn-hp-temp" data-act="temp">PV temp.</button>
    </div>`;
  const m = openModal({ title: 'Points de vie', node, className: 'modal-sm' });
  const amountOf = () => Math.min(999, Math.max(1, parseInt(qs('#xs-hp-amount', node).value, 10) || 1));
  qsa('[data-act]', node).forEach(b => b.addEventListener('click', () => {
    const n = amountOf();
    if(b.dataset.act === 'dmg') applyDamage(ch, n);
    else if(b.dataset.act === 'heal') applyHeal(ch, n);
    else applyTempHp(ch, n);
    persist();
    m.close();
    redraw();
  }));
  setTimeout(() => qs('#xs-hp-amount', node)?.select(), 40);
}
