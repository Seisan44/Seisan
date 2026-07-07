import { enrichHTML, getGlossaryEntry } from '../enrich.js';
import { escapeHtml } from '../utils.js';
import { openDiceRoller } from '../dice.js';
import { markMilestone } from '../beginner.js';
import { openCombatTutorial } from './combat-tutorial.js';
import * as C from './combat-content.js';

const TABS = [
  { id:'tour',        label:'Votre Tour',       icon:'🗓' },
  { id:'actions',     label:'Actions',          icon:'⚔' },
  { id:'deplacement', label:'Déplacement',      icon:'🏃' },
  { id:'attaque',     label:'Attaquer',         icon:'🎯' },
  { id:'bonus',       label:'Bonus & Réactions',icon:'✦' },
  { id:'couvert',     label:'Couvert',          icon:'🛡' },
  { id:'special',     label:'Règles Spéciales', icon:'⚡' },
  { id:'pv',          label:'PV & Mort',        icon:'💀' },
];

function termLink(id, label){
  const entry = getGlossaryEntry(id);
  const text = escapeHtml(label || entry?.terme || id);
  if(!entry) return `<strong class="term-fallback">${text}</strong>`;
  return `<span class="term-link" data-glossary-id="${id}" tabindex="0" role="button" aria-haspopup="true">${text}</span>`;
}

function callout(variant, icon, html){
  return `<div class="cbt-callout c-${variant}"><span class="cbt-callout-icon">${icon}</span><div>${html}</div></div>`;
}

// ── SECTION : Votre Tour ────────────────────────────────────────────────
function sectionTour(){
  const flow = C.TURN_FLOW.map((s,i) => `
    ${i>0 ? `<div class="cbt-flow-arrow" aria-hidden="true">${s.linkArrow ? '⟷' : '→'}</div>` : ''}
    <div class="cbt-flow-step cbt-flow-step--${s.key}">
      <div class="cbt-flow-icon">${s.icon}</div>
      <div class="cbt-flow-label">${escapeHtml(s.label)}</div>
      <div class="cbt-flow-desc">${escapeHtml(s.desc)}${s.note ? `<br><span class="cbt-flow-note">${escapeHtml(s.note)}</span>` : ''}</div>
      <div class="cbt-flow-badge is-${s.badge}">${escapeHtml(s.badgeLabel)}</div>
    </div>`).join('');

  const tips = C.TURN_TIPS.map(t => `
    <li><span class="tips-icon">${t.icon}</span><div><strong>${escapeHtml(t.title)}</strong> — ${escapeHtml(t.text)}</div></li>
  `).join('');

  const order = C.TURN_ORDER.map((s,i) => `
    <div class="cbt-step"><span class="cbt-step-circle">${i+1}</span><div><strong>${escapeHtml(s.title)}</strong><p>${escapeHtml(s.desc)}</p></div></div>
  `).join('');

  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">⏱ Un tour de combat = <span class="cbt-highlight">6 secondes</span></h2>
    <p class="cbt-lead">Chaque round, dans l'ordre d'Initiative, chaque participant prend son tour. Voici ce que vous pouvez y faire.</p>

    <div class="cbt-flow">${flow}</div>

    <ul class="tips-list cbt-tips">${tips}</ul>

    <h3 class="cbt-subsection">🗓 Ordre du combat</h3>
    <div class="cbt-steps">${order}</div>

    ${callout('gold','ℹ', escapeHtml(C.EN_PERIL_TEXT))}
  </div>`;
}

// ── SECTION : Actions ───────────────────────────────────────────────────
function sectionActions(){
  const cards = C.COMBAT_ACTIONS.map(a => {
    const entry = getGlossaryEntry(a.id);
    const label = entry?.terme || a.id;
    const desc = entry ? enrichHTML(entry.description) : '';
    return `
    <div class="cbt-action-card" tabindex="0" data-action="${a.id}">
      <div class="cbt-action-head">
        <span class="cbt-action-icon">${a.icon}</span>
        <div class="cbt-action-name">${escapeHtml(label)}</div>
        <span class="cbt-action-cost">1 action</span>
        <svg class="i chevron cbt-action-chevron"><use href="#i-chevron"/></svg>
      </div>
      <div class="cbt-action-body"><p>${desc}</p></div>
    </div>`;
  }).join('');

  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">⚔ Que puis-je faire avec mon action ?</h2>
    <p class="cbt-lead">Le tronc commun des actions disponibles à tout personnage. Cliquez une carte pour afficher la règle complète.</p>
    <div class="cbt-action-grid">${cards}</div>
    ${callout('gold','💡', "Votre classe ou vos dons peuvent vous accorder des <strong>actions supplémentaires</strong> (voir l'onglet Classes) — consultez toujours la description de vos capacités.")}
  </div>`;
}

// ── SECTION : Déplacement ───────────────────────────────────────────────
function ruleCard(r){
  return `
  <div class="cbt-rule-card${r.variant ? ` is-${r.variant}` : ''}">
    <div class="cbt-rule-icon">${r.icon}</div>
    <div class="cbt-rule-title">${escapeHtml(r.title)}</div>
    <p>${escapeHtml(r.html)}</p>
    ${r.note ? `<div class="cbt-rule-note">${escapeHtml(r.note)}</div>` : ''}
    ${r.example ? `<div class="cbt-rule-example">${escapeHtml(r.example)}</div>` : ''}
  </div>`;
}

function sectionDeplacement(){
  const cards = C.MOVEMENT_RULES.map(ruleCard).join('');
  const sizeRows = C.SIZE_TABLE.map(s => `<tr><td class="eq-name">${escapeHtml(s.taille)}</td><td>${escapeHtml(s.exemples)}</td><td>${escapeHtml(s.espace)}</td></tr>`).join('');

  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">🏃 Se déplacer en combat</h2>
    <div class="cbt-rule-grid">${cards}</div>

    <h3 class="cbt-subsection">🎯 Espace occupé par les créatures</h3>
    <div class="table-scroll">
      <table class="eq-table">
        <thead><tr><th>Taille</th><th>Exemples</th><th>Espace</th></tr></thead>
        <tbody>${sizeRows}</tbody>
      </table>
    </div>
    ${callout('info','ℹ', escapeHtml(C.SIZE_TABLE_NOTE))}
  </div>`;
}

// ── SECTION : Attaquer ──────────────────────────────────────────────────
function sectionAttaque(){
  const parts = C.ATTACK_FORMULA.parts.map((p,i) => `
    ${i>0 ? `<span class="cbt-formula-op">${p.op || '+'}</span>` : ''}
    <span class="cbt-formula-part c-${p.key}">${p.label}${p.sub ? `<br><small>${escapeHtml(p.sub)}</small>` : ''}</span>
  `).join('');

  const critCards = C.CRIT_RULES.map(ruleCard).join('');
  const dmgCards = C.DAMAGE_TYPE_RULES.map(ruleCard).join('');

  const advList = C.ADV_CASES.map(c => `<li>${escapeHtml(c)}</li>`).join('');
  const disadvList = C.DISADV_CASES.map(c => `<li>${escapeHtml(c)}</li>`).join('');

  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">🎯 Effectuer une attaque</h2>

    <div class="cbt-formula-block">
      <div class="cbt-formula-title">Jet d'attaque</div>
      <div class="cbt-formula">${parts}</div>
    </div>

    <div class="cbt-rule-grid">${critCards}</div>

    <h3 class="cbt-subsection">Avantage &amp; Désavantage</h3>
    <div class="cbt-twocol">
      <div class="cbt-adv-panel is-adv">
        <div class="cbt-adv-pill">Avantage</div>
        <div class="cbt-adv-formula">Lancez 2d20 — gardez le <strong>plus haut</strong></div>
        <p class="cbt-adv-lead">Vous attaquez avec Avantage si :</p>
        <ul>${advList}</ul>
      </div>
      <div class="cbt-adv-panel is-disadv">
        <div class="cbt-adv-pill">Désavantage</div>
        <div class="cbt-adv-formula">Lancez 2d20 — gardez le <strong>plus bas</strong></div>
        <p class="cbt-adv-lead">Vous attaquez avec Désavantage si :</p>
        <ul>${disadvList}</ul>
      </div>
    </div>
    ${callout('gold','⚖', "Si vous avez à la fois Avantage et Désavantage sur la même attaque, ils <strong>s'annulent</strong> — lancez un seul d20, peu importe le nombre de sources de chaque côté.")}

    <h3 class="cbt-subsection">Dégâts</h3>
    <div class="cbt-rule-grid">${dmgCards}</div>
    ${callout('info','ℹ', escapeHtml(C.DAMAGE_TYPE_NOTE))}
    <p class="cbt-lead cbt-footnote">${escapeHtml(C.UNARMED_NOTE)}</p>
  </div>`;
}

// ── SECTION : Bonus & Réactions ─────────────────────────────────────────
function infoPanel(kind, title, info){
  const examples = info.examples.map(e => `
    <div class="cbt-tag-row"><span class="cbt-tag c-${e.color}">${escapeHtml(e.tag)}</span><span>${escapeHtml(e.text)}</span></div>
  `).join('');
  return `
  <div class="cbt-info-panel is-${kind}">
    <h3 class="cbt-panel-title">${title}</h3>
    <div class="cbt-info-rule">${escapeHtml(info.rule)}</div>
    <div class="cbt-panel-label">Exemples courants</div>
    <div class="cbt-tag-examples">${examples}</div>
  </div>`;
}

function treeBranches(branches){
  return `
  <div class="cbt-tree-branches">
    ${branches.map(b => `
      <div class="cbt-tree-branch">
        <div class="cbt-tree-cond">${escapeHtml(b.cond)}</div>
        <div class="cbt-tree-result is-${b.result}">${escapeHtml(b.text)}</div>
      </div>`).join('')}
  </div>`;
}

function sectionBonus(){
  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">✦ Actions Bonus &amp; Réactions</h2>
    <div class="cbt-panel-grid">
      ${infoPanel('bonus', '✦ Action Bonus', C.BONUS_ACTION_INFO)}
      ${infoPanel('reaction', '⚡ Réaction', C.REACTION_INFO)}
    </div>

    <h3 class="cbt-subsection">⏳ ${termLink('intention','Intention')} — « Se tenir prêt »</h3>
    <div class="cbt-tree">
      <div class="cbt-tree-setup">
        ${escapeHtml(C.READY_TREE.setup)}
        <div class="cbt-tree-example">${escapeHtml(C.READY_TREE.example)}</div>
      </div>
      <div class="cbt-tree-arrow" aria-hidden="true">↓</div>
      ${treeBranches(C.READY_TREE.branches)}
    </div>
    ${callout('warning','⚠', escapeHtml(C.READY_TREE.note))}
  </div>`;
}

// ── SECTION : Couvert ───────────────────────────────────────────────────
function sectionCouvert(){
  const cards = C.COVER_LEVELS.map(cv => `
    <div class="cbt-cover-card is-${cv.variant}">
      <div class="cbt-cover-icon">${cv.icon}</div>
      <div class="cbt-cover-level">${escapeHtml(cv.level)}</div>
      <p class="cbt-cover-desc">${escapeHtml(cv.desc)}</p>
      <div class="cbt-cover-bonus">
        <span class="cbt-cover-stat">${cv.bonus}</span>
        <span class="cbt-cover-stat-label">${escapeHtml(cv.bonusLabel)}</span>
      </div>
    </div>`).join('');

  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">🛡 Le Couvert</h2>
    <p class="cbt-lead">Un couvert protège une créature des attaques et de certains sorts en modifiant sa Classe d'armure et ses jets de sauvegarde de Dextérité.</p>
    <div class="cbt-cover-grid">${cards}</div>
    ${callout('gold','💡', escapeHtml(C.COVER_NOTE))}
  </div>`;
}

// ── SECTION : Règles Spéciales ──────────────────────────────────────────
function sectionSpecial(){
  const items = C.SPECIAL_RULES.map(r => `
    <article class="capacite-block is-collapsible${r.open ? ' is-expanded' : ''}">
      <button type="button" class="capacite-toggle" data-cap-toggle>
        <span class="capacite-toggle-title"><span class="cbt-acc-icon">${r.icon}</span> ${escapeHtml(r.title)}</span>
        <svg class="i chevron"><use href="#i-chevron"/></svg>
      </button>
      <div class="capacite-body">
        <div class="prose">
          ${r.html}
          ${r.branches ? treeBranches(r.branches) : ''}
          ${r.note ? callout('info','ℹ', escapeHtml(r.note)) : ''}
          ${r.example ? `<div class="cbt-rule-example">${escapeHtml(r.example)}</div>` : ''}
        </div>
      </div>
    </article>`).join('');

  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">⚡ Règles Spéciales</h2>
    <div class="capacite-list cbt-accordion">${items}</div>
  </div>`;
}

// ── SECTION : PV & Mort ─────────────────────────────────────────────────
function sectionPV(){
  const deathRows = C.DEATH_SAVE_RESULTS.map(d => `
    <div class="cbt-death-row is-${d.variant}">
      <div class="cbt-death-icon">${d.icon}</div>
      <div><strong>${escapeHtml(d.title)}</strong> — ${escapeHtml(d.text)}${d.note ? `<br><em class="cbt-note">${escapeHtml(d.note)}</em>` : ''}</div>
    </div>`).join('');

  const stabList = C.STABILIZATION_RULES.map(s => `<li><span class="cbt-rule-check">✔</span><div>${escapeHtml(s)}</div></li>`).join('');

  const condCards = C.COMBAT_CONDITIONS.map(cd => {
    const entry = getGlossaryEntry(cd.id);
    const desc = entry ? enrichHTML(entry.description) : '';
    return `
    <div class="cbt-cond-card">
      <span class="cbt-cond-icon">${cd.icon}</span>
      <div class="cbt-cond-name">${termLink(cd.id)}</div>
      <p class="cbt-cond-desc">${desc}</p>
    </div>`;
  }).join('');

  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">💀 Points de vie &amp; Mort</h2>
    <div class="cbt-panel-grid">
      <div class="cbt-info-panel">
        <h3 class="cbt-panel-title">💔 Tomber à 0 PV</h3>
        <p>Vous tombez ${termLink('inconscient','Inconscient')} et recevez l'état ${termLink('a-terre','À terre')}. À chacun de vos tours, effectuez un ${termLink('jet-de-sauvegarde-mort','jet de sauvegarde contre la mort')} : d20 sans aucun modificateur.</p>
        <div class="cbt-death-list">${deathRows}</div>
      </div>
      <div class="cbt-info-panel">
        <h3 class="cbt-panel-title">💊 Être ${termLink('stabilise','stabilisé')}</h3>
        <ul class="cbt-check-list">${stabList}</ul>
        <h3 class="cbt-panel-title cbt-mt">☠ Mort instantanée</h3>
        ${callout('danger','💀', escapeHtml(C.INSTANT_DEATH_TEXT))}
      </div>
    </div>

    <h3 class="cbt-subsection">États courants en combat</h3>
    <div class="cbt-cond-grid">${condCards}</div>
  </div>`;
}

const SECTION_RENDERERS = {
  tour: sectionTour,
  actions: sectionActions,
  deplacement: sectionDeplacement,
  attaque: sectionAttaque,
  bonus: sectionBonus,
  couvert: sectionCouvert,
  special: sectionSpecial,
  pv: sectionPV,
};

export async function renderCombat(container, parts){
  markMilestone('combat');
  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Référence rapide</p>
      <h1 class="page-title">Combat</h1>
      <p class="page-lede">Un aide-mémoire interactif des règles 2024, pensé pour suivre votre tour sans interrompre la partie.</p>
      <div class="cbt-callout c-gold cbt-beginner-note">
        <span class="cbt-callout-icon">🎓</span>
        <div>Mode Découverte : on garde seulement l'essentiel — <strong>votre tour</strong>, <strong>vos actions</strong> (attaquer, lancer un sort…) et le détail d'une <strong>attaque</strong>. Les règles avancées (couvert, états spéciaux…) reviendront quand vous désactiverez ce mode.</div>
      </div>
      <div class="flex-gap" style="margin-top:1em;">
        <button class="btn btn-primary" id="combat-dice-btn"><svg class="i"><use href="#i-dice"/></svg> Lancer les dés</button>
        <button class="btn btn-ghost cbt-tutorial-btn" id="combat-tutorial-btn">🎓 Faire un tour d'essai</button>
      </div>
    </header>
    <div class="tabs" role="tablist" id="combat-tabs">
      ${TABS.map((t,i) => `<button class="tab" role="tab" data-tab="${t.id}" aria-selected="${i===0}">${t.icon} ${t.label}</button>`).join('')}
    </div>
    <div class="cbt-content" id="combat-panel"></div>
  `;
  container.querySelector('#combat-dice-btn').addEventListener('click', (e) => openDiceRoller(e.currentTarget));
  container.querySelector('#combat-tutorial-btn').addEventListener('click', (e) => openCombatTutorial(e.currentTarget));

  const panel = container.querySelector('#combat-panel');
  const tabBtns = container.querySelectorAll('.tab');

  function wireInteractions(){
    panel.querySelectorAll('[data-cap-toggle]').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.is-collapsible').classList.toggle('is-expanded'));
    });
    panel.querySelectorAll('.cbt-action-card').forEach(card => {
      // Sur tactile, un tap sur un terme à info-bulle (.term-link) ne doit pas aussi
      // refermer la carte — sur PC ce n'était pas gênant car on pouvait survoler le
      // terme sans cliquer, mais au tactile le tap est le seul moyen de voir la bulle.
      const toggle = (e) => {
        if(e?.target?.closest?.('.term-link')) return;
        card.classList.toggle('is-open');
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if(e.target.closest('.term-link')) return;
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(e); }
      });
    });
  }

  function selectTab(key){
    tabBtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === key)));
    const render = SECTION_RENDERERS[key] || SECTION_RENDERERS.tour;
    panel.innerHTML = render();
    wireInteractions();
  }
  tabBtns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));

  const initial = (parts && parts[0] && SECTION_RENDERERS[parts[0]]) ? parts[0] : TABS[0].id;
  tabBtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === initial)));
  selectTab(initial);
}
