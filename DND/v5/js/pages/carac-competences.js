// Page de référence "Carac. / Compét." : explique en langage simple ce que représente
// chaque caractéristique, les compétences qui lui sont associées (avec un exemple concret
// pour chacune), et les mécaniques générales du chapitre "Utiliser les caractéristiques" du
// Manuel des Joueurs 2024 (jets de caractéristique, Avantage/Désavantage, bonus de maîtrise,
// DD, oppositions, jets passifs, travailler ensemble, jets de sauvegarde) — pensée pour un
// joueur qui découvre le jeu (Mode Découverte), avec un schéma simple en tête de page plutôt
// que la règle complète (déjà couverte, plus densément, par le Glossaire).

import { ABILITIES, SKILL_ABILITY } from '../character/rules.js';
import { enrichHTML, getGlossaryEntry } from '../enrich.js';
import { escapeHtml } from '../utils.js';
import * as R from './carac-competences-content.js';

const ABILITY_ICON = {
  force: '💪', dexterite: '🤸', constitution: '❤️',
  intelligence: '🧠', sagesse: '🦉', charisme: '🎭',
};

const ABILITY_INFO = {
  force: {
    desc: "Votre puissance physique brute : la capacité à pousser, tirer, soulever ou frapper fort. Elle détermine aussi les dégâts de vos attaques au corps à corps avec les armes lourdes.",
    example: "Vous voulez enfoncer une porte en bois coincée, ou gagner un bras de fer contre un adversaire : jet de Force, sans compétence particulière.",
  },
  dexterite: {
    desc: "Votre agilité, vos réflexes et la précision de vos gestes. Elle influence votre Classe d'Armure, votre Initiative, et les attaques avec les armes fines ou à distance.",
    example: "Vous devez rattraper un vase qui tombe d'une étagère avant qu'il ne se brise : jet de Dextérité, sans compétence particulière.",
  },
  constitution: {
    desc: "Votre endurance et votre robustesse physique. Elle détermine vos points de vie et votre résistance à la fatigue, au poison ou à la maladie.",
    example: "Vous devez retenir votre respiration sous l'eau plus longtemps que la normale, ou rester debout malgré une blessure grave : jet de Constitution (ou jet de sauvegarde).",
    note: "Aucune compétence n'est associée à la Constitution : c'est de l'endurance brute, pas un savoir-faire qui s'entraîne. Elle sert surtout aux jets de sauvegarde.",
  },
  intelligence: {
    desc: "Votre raisonnement, votre mémoire et votre savoir livresque. Elle sert à se souvenir d'un fait, analyser une situation, ou lancer les sorts d'un Magicien.",
    example: "Vous essayez de déchiffrer un texte codé à la seule force de la logique : jet d'Intelligence, sans compétence particulière.",
  },
  sagesse: {
    desc: "Votre perspicacité, votre attention et votre lien intuitif au monde qui vous entoure. Elle sert à remarquer, deviner, soigner, ou lancer les sorts d'un Clerc, d'un Druide ou d'un Rôdeur.",
    example: "Vous entrez dans une pièce et sentez confusément que quelque chose ne va pas, sans savoir précisément quoi : jet de Sagesse, sans compétence particulière.",
  },
  charisme: {
    desc: "Votre force de personnalité et votre capacité à influencer les autres — par la conviction, la peur ou le charme. Elle sert aussi à lancer les sorts d'un Barde, d'un Ensorceleur, d'un Occultiste ou d'un Paladin.",
    example: "Vous voulez faire bonne impression en entrant pour la première fois dans une salle de bal : jet de Charisme, sans compétence particulière.",
  },
};

const SKILL_ICON = {
  'Athlétisme': '🧗', 'Acrobaties': '🤹', 'Discrétion': '🥷', 'Escamotage': '🎩',
  'Arcanes': '🔮', 'Histoire': '📜', 'Investigation': '🔍', 'Nature': '🌿', 'Religion': '📿',
  'Dressage': '🐴', 'Intuition': '👁', 'Médecine': '⚕', 'Perception': '👂', 'Survie': '🏕',
  'Intimidation': '😠', 'Persuasion': '🗣', 'Représentation': '🎼', 'Tromperie': '🃏',
};

const SKILL_INFO = {
  'Athlétisme': { desc: "Grimper, sauter, nager ou vous libérer d'une prise : tout effort physique athlétique.", example: "Escalader une paroi rocheuse sans corde, ou repousser un adversaire qui vous agrippe." },
  'Acrobaties': { desc: "Garder l'équilibre, retomber sur vos pieds, ou vous faufiler sans vous faire mal dans un mouvement délicat.", example: "Traverser une poutre étroite au-dessus du vide, ou rouler pour amortir une chute." },
  'Discrétion': { desc: "Vous déplacer sans bruit et sans être vu.", example: "Vous glisser derrière un garde sans qu'il remarque votre présence." },
  'Escamotage': { desc: "La dextérité manuelle fine : vol à la tire, crochetage de serrure, tour de passe-passe.", example: "Crocheter une serrure fermée, ou subtiliser une bourse sans que son propriétaire s'en aperçoive." },
  'Arcanes': { desc: "Vos connaissances sur la magie, les sorts, les objets enchantés et les plans d'existence.", example: "Reconnaître le sort qu'un ennemi vient de lancer, ou identifier un symbole runique magique." },
  'Histoire': { desc: "Vos connaissances sur les événements passés, les civilisations et les grandes figures historiques.", example: "Vous souvenir de la raison pour laquelle une forteresse en ruines a été abandonnée." },
  'Investigation': { desc: "Déduire à partir d'indices, fouiller méthodiquement, comprendre un mécanisme.", example: "Fouiller un bureau pour trouver un tiroir secret, ou reconstituer le déroulé d'un crime à partir des indices sur place." },
  'Nature': { desc: "Vos connaissances sur la faune, la flore, la météo et les terrains naturels.", example: "Reconnaître une plante toxique, ou prévoir qu'un orage approche." },
  'Religion': { desc: "Vos connaissances sur les divinités, les rites religieux et les morts-vivants.", example: "Reconnaître le symbole sacré d'un culte obscur, ou savoir comment repousser une créature morte-vivante." },
  'Dressage': { desc: "Comprendre, calmer ou entraîner un animal, y compris en pleine situation délicate.", example: "Calmer un cheval affolé par le bruit du combat, ou faire obéir un chien de garde méfiant." },
  'Intuition': { desc: "Percevoir les intentions et les émotions des autres, sentir qu'on vous ment.", example: "Sentir qu'un marchand vous cache quelque chose pendant que vous négociez avec lui." },
  'Médecine': { desc: "Stabiliser un blessé, diagnostiquer une maladie, déterminer une cause de décès.", example: "Stabiliser un allié tombé à l'agonie, ou identifier les symptômes d'un mal inconnu." },
  'Perception': { desc: "Remarquer ce qui vous entoure : un bruit, une odeur, un détail visuel, une présence cachée.", example: "Repérer un garde dissimulé dans l'ombre, ou entendre des pas approcher derrière une porte." },
  'Survie': { desc: "Suivre une piste, vous orienter en milieu sauvage, trouver nourriture, eau ou un abri.", example: "Suivre les traces d'une bête à travers la forêt, ou trouver un point d'eau potable en pleine nature." },
  'Intimidation': { desc: "Menacer, effrayer ou imposer votre présence pour obtenir quelque chose par la crainte.", example: "Menacer un prisonnier récalcitrant pour qu'il vous livre une information." },
  'Persuasion': { desc: "Convaincre par de bons arguments, la diplomatie ou le tact — sans mentir.", example: "Convaincre un garde de vous laisser passer en échange d'un service rendu." },
  'Représentation': { desc: "Divertir un public par la musique, la danse, le conte ou la comédie.", example: "Jouer un morceau entraînant dans une taverne pour gagner quelques pièces et l'attention de la salle." },
  'Tromperie': { desc: "Mentir de façon crédible, bluffer, ou vous faire passer pour quelqu'un d'autre.", example: "Vous faire passer pour un garde afin de franchir un poste de contrôle sans éveiller les soupçons." },
};

const TABS = [
  { key:'bases', label:'Les bases', icon:'🎲' },
  ...ABILITIES.map(a => ({ key:a.key, label:a.label, icon:ABILITY_ICON[a.key] || '' })),
  { key:'sauvegardes', label:'Sauvegardes', icon:'🛡' },
];

let activeTab = TABS[0].key;

function callout(variant, icon, html){
  return `<div class="cbt-callout c-${variant}"><span class="cbt-callout-icon">${icon}</span><div>${html}</div></div>`;
}
function termLink(id, label){
  const entry = getGlossaryEntry(id);
  const text = escapeHtml(label || entry?.terme || id);
  if(!entry) return `<strong class="term-fallback">${text}</strong>`;
  return `<span class="term-link" data-glossary-id="${id}" tabindex="0" role="button" aria-haspopup="true">${text}</span>`;
}
function fmtMod(n){ return n >= 0 ? `+${n}` : `${n}`; }
function formulaBlock(title, formula){
  const parts = formula.parts.map((p,i) => `
    ${i>0 ? `<span class="cbt-formula-op">${p.op || '+'}</span>` : ''}
    <span class="cbt-formula-part c-${p.key}">${p.label}${p.sub ? `<br><small>${escapeHtml(p.sub)}</small>` : ''}</span>
  `).join('');
  return `
    <div class="cbt-formula-block">
      <div class="cbt-formula-title">${escapeHtml(title)}</div>
      <div class="cbt-formula">${parts}</div>
    </div>`;
}
function ruleCard(m){
  return `
    <div class="cbt-rule-card${m.variant ? ` is-${m.variant}` : ''}">
      <div class="cbt-rule-icon">${m.icon}</div>
      <div class="cbt-rule-title">${escapeHtml(m.title)}</div>
      <p>${enrichHTML(m.text, { isPlainText:true })}</p>
    </div>`;
}

function skillsFor(abilityKey){
  return Object.entries(SKILL_ABILITY).filter(([, key]) => key === abilityKey).map(([skill]) => skill);
}

function skillCard(skill){
  const info = SKILL_INFO[skill] || {};
  return `
    <div class="cbt-action-card" tabindex="0" data-skill="${escapeHtml(skill)}">
      <div class="cbt-action-head">
        <span class="cbt-action-icon">${SKILL_ICON[skill] || '📖'}</span>
        <div class="cbt-action-name">${escapeHtml(skill)}</div>
        <svg class="i chevron cbt-action-chevron"><use href="#i-chevron"/></svg>
      </div>
      <div class="cbt-action-body">
        <p>${enrichHTML(info.desc || '', { isPlainText:true })}</p>
        <p><strong>Exemple :</strong> ${enrichHTML(info.example || '', { isPlainText:true })}</p>
      </div>
    </div>
  `;
}

// ── SECTION : Les bases (schéma d20 + table de modificateurs + Avantage/Désavantage + ── ───
//    maîtrise + DD + opposition + jets passifs + travailler ensemble) ───────────────────────
function sectionBases(){
  const modRow = R.MODIFIER_TABLE.map(r => `<th>${escapeHtml(r.range)}</th>`).join('');
  const modValues = R.MODIFIER_TABLE.map(r => `<td>${fmtMod(r.mod)}</td>`).join('');

  const profRow = R.PROFICIENCY_TABLE.map(r => `<th>Niv. ${r.from === r.to ? r.from : `${r.from}-${r.to}`}</th>`).join('');
  const profValues = R.PROFICIENCY_TABLE.map(r => `<td>${fmtMod(r.bonus)}</td>`).join('');

  const ddRows = R.DD_TABLE.map(r => `<tr><td>${escapeHtml(r.tache)}</td><td>${r.dd}</td></tr>`).join('');

  const advList = R.ADV_CASES_GENERAL.map(c => `<li>${escapeHtml(c)}</li>`).join('');
  const disadvList = R.DISADV_CASES_GENERAL.map(c => `<li>${escapeHtml(c)}</li>`).join('');

  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">🎲 La règle d'or : <span class="cbt-highlight">d20 + modificateur ≥ DD</span></h2>
    <p class="cbt-lead">Presque tout ce que vous tentez en jeu — soulever une porte, convaincre un garde, éviter un piège — passe par cette même formule : ce qui change, c'est seulement quelle caractéristique et quelle compétence s'appliquent. Les jets d'attaque suivent une variante décrite dans la page Combat.</p>

    ${formulaBlock('Jet de caractéristique', R.CHECK_FORMULA)}

    <h3 class="cbt-subsection">📐 Valeur de caractéristique → modificateur</h3>
    <div class="table-scroll">
      <table class="eq-table"><thead><tr>${modRow}</tr></thead><tbody><tr>${modValues}</tr></tbody></table>
    </div>
    <p class="cbt-lead cbt-footnote">${escapeHtml(R.MODIFIER_SHORTCUT)}</p>

    <h3 class="cbt-subsection">⚖ ${termLink('avantage','Avantage')} &amp; ${termLink('desavantage','Désavantage')}</h3>
    <div class="cbt-twocol">
      <div class="cbt-adv-panel is-adv">
        <div class="cbt-adv-pill">Avantage</div>
        <div class="cbt-adv-formula">Lancez 2d20 — gardez le <strong>plus haut</strong></div>
        <p class="cbt-adv-lead">Vous avez l'Avantage si :</p>
        <ul>${advList}</ul>
      </div>
      <div class="cbt-adv-panel is-disadv">
        <div class="cbt-adv-pill">Désavantage</div>
        <div class="cbt-adv-formula">Lancez 2d20 — gardez le <strong>plus bas</strong></div>
        <p class="cbt-adv-lead">Vous avez le Désavantage si :</p>
        <ul>${disadvList}</ul>
      </div>
    </div>
    ${callout('gold','⚖', enrichHTML(R.ADV_STACKING_NOTE, { isPlainText:true }))}

    <h3 class="cbt-subsection">🎖 ${termLink('bonus-de-maitrise','Bonus de maîtrise')}</h3>
    <div class="table-scroll">
      <table class="eq-table"><thead><tr>${profRow}</tr></thead><tbody><tr>${profValues}</tr></tbody></table>
    </div>
    ${callout('info','ℹ', enrichHTML(R.PROFICIENCY_NOTE, { isPlainText:true }))}

    <h3 class="cbt-subsection">📊 Degré de Difficulté (DD)</h3>
    <div class="table-scroll">
      <table class="eq-table"><thead><tr><th>Tâche</th><th>DD</th></tr></thead><tbody>${ddRows}</tbody></table>
    </div>

    <h3 class="cbt-subsection">⚔ Jets d'opposition</h3>
    ${callout('gold','⚔', `${enrichHTML(R.OPPOSED_CHECK.text, { isPlainText:true })}<br><br>${enrichHTML(R.OPPOSED_CHECK.tieNote, { isPlainText:true })}`)}

    <h3 class="cbt-subsection">👁 Jets passifs</h3>
    <div class="cbt-rule-grid">
      ${ruleCard({ icon:'👁', title:'Formule', text: R.PASSIVE_CHECK.formulaText, variant:'steel' })}
      ${ruleCard({ icon:'💡', title:'Exemple', text: R.PASSIVE_CHECK.example })}
    </div>
    ${callout('info','ℹ', enrichHTML(R.PASSIVE_CHECK.note, { isPlainText:true }))}

    <h3 class="cbt-subsection">Travailler à plusieurs</h3>
    <div class="cbt-rule-grid">
      ${ruleCard({ icon:'🤝', title: R.WORKING_TOGETHER.title, text: R.WORKING_TOGETHER.text })}
      ${ruleCard({ icon:'👥', title: R.GROUP_CHECK.title, text: R.GROUP_CHECK.text })}
    </div>

    ${callout('gold','🔀', enrichHTML(R.CROSS_ABILITY_NOTE, { isPlainText:true }))}
  </div>`;
}

// ── SECTION : caractéristique (Force, Dextérité...) ─────────────────────────────────────────
function renderAbilityPanel(key){
  const ability = ABILITIES.find(a => a.key === key);
  const info = ABILITY_INFO[key];
  const skills = skillsFor(key);
  const otherUses = R.ABILITY_OTHER_USES[key] || [];
  const mechanics = R.ABILITY_MECHANICS[key] || [];

  return `
    <div class="cbt-section">
      <h2 class="cbt-section-title">${ABILITY_ICON[key] || ''} ${escapeHtml(ability.label)} <span class="cbt-highlight">${escapeHtml(ability.short)}</span></h2>
      <p class="cbt-lead">${enrichHTML(info.desc, { isPlainText:true })}</p>

      <div class="cbt-callout c-gold">
        <span class="cbt-callout-icon">🎲</span>
        <div><strong>Sans compétence :</strong> ${enrichHTML(info.example, { isPlainText:true })}</div>
      </div>

      ${skills.length ? `
        <h3 class="cbt-subsection">Compétences associées</h3>
        <div class="cbt-action-grid">${skills.map(skillCard).join('')}</div>
      ` : `
        <div class="cbt-callout c-info">
          <span class="cbt-callout-icon">ℹ</span>
          <div>${enrichHTML(info.note || '', { isPlainText:true })}</div>
        </div>
      `}

      ${otherUses.length ? `
        <h3 class="cbt-subsection">Autres jets de ${escapeHtml(ability.label)}</h3>
        <div class="prose"><ul>${otherUses.map(u => `<li>${escapeHtml(u)}</li>`).join('')}</ul></div>
      ` : ''}

      ${mechanics.length ? `
        <h3 class="cbt-subsection">Ce que ${escapeHtml(ability.label)} détermine d'autre</h3>
        <div class="cbt-rule-grid">${mechanics.map(m => ruleCard({ ...m, variant: m.featured ? 'green' : m.variant })).join('')}</div>
      ` : ''}
    </div>
  `;
}

// ── SECTION : Jets de sauvegarde ─────────────────────────────────────────────────────────────
function sectionSauvegardes(){
  return `
  <div class="cbt-section">
    <h2 class="cbt-section-title">🛡 ${termLink('jet-de-sauvegarde','Jets de sauvegarde')}</h2>
    <p class="cbt-lead">${enrichHTML(R.SAVE_INTRO, { isPlainText:true })}</p>

    ${formulaBlock('Jet de sauvegarde', R.SAVE_FORMULA)}

    ${callout('info','ℹ', enrichHTML(R.SAVE_PROFICIENCY_NOTE, { isPlainText:true }))}

    <div class="cbt-rule-grid">
      ${ABILITIES.map(a => ruleCard({ icon: ABILITY_ICON[a.key], title: `Sauvegarde de ${a.label}`, text: ABILITY_INFO[a.key].desc })).join('')}
    </div>
  </div>`;
}

const SECTION_RENDERERS = {
  bases: sectionBases,
  sauvegardes: sectionSauvegardes,
};
for(const a of ABILITIES) SECTION_RENDERERS[a.key] = () => renderAbilityPanel(a.key);

export async function renderCaracCompetences(container, parts){
  const target = parts && parts[0];
  if(target && SECTION_RENDERERS[target]) activeTab = target;

  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Compendium des règles</p>
      <h1 class="page-title">Caractéristiques &amp; Compétences</h1>
      <p class="page-lede">Les six caractéristiques de votre personnage, comment elles se traduisent en jets de dés, et tout ce qu'elles déterminent d'autre sur votre fiche — de la Classe d'Armure à la capacité de charge.</p>
    </header>

    <div class="tabs" role="tablist" id="carac-tabs">
      ${TABS.map(t => `<button class="tab" role="tab" data-tab="${t.key}" aria-selected="${t.key === activeTab}">${t.icon} ${escapeHtml(t.label)}</button>`).join('')}
    </div>
    <div class="cbt-content" id="carac-panel"></div>
  `;

  const panel = container.querySelector('#carac-panel');
  const tabBtns = container.querySelectorAll('#carac-tabs .tab');

  function wireInteractions(){
    panel.querySelectorAll('.cbt-action-card').forEach(card => {
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
    activeTab = key;
    tabBtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === key)));
    panel.innerHTML = (SECTION_RENDERERS[key] || SECTION_RENDERERS.bases)();
    wireInteractions();
  }

  tabBtns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
  selectTab(activeTab);
}
