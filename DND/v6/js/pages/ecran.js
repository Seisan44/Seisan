// Écran du joueur : l'aide de jeu à garder ouverte à la table.
// Résumé du tour, actions officielles, états, 0 PV, repos + suivi d'initiative persistant.

import { DATA } from '../data.js';
import { el, escapeHtml, qs, qsa, storeGet, storeSet } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { grantMilestone } from '../progress.js';
import { openDiceTray } from '../dice.js';

const INIT_KEY = 'grimoire.initiative';

function refCard(title, icon, bodyHTML, tone = ''){
  return `<div class="ref-card ${tone}">
    <div class="ref-card-head"><svg class="icon"><use href="#${icon}"/></svg>${title}</div>
    <div class="ref-card-body">${bodyHTML}</div>
  </div>`;
}

/* -------- Schéma du tour : déplacement → action → bonus (+ réaction) -------- */
function turnBoardHTML(){
  return `
  <div class="turn-board">
    <p class="turn-board-title"><svg class="icon"><use href="#i-swords"/></svg> Ton tour, en un coup d'œil</p>
    <div class="turn-flow">
      <div class="turn-step tone-move">
        <span class="turn-step-head"><span class="turn-step-n">1</span><svg class="icon"><use href="#i-boot"/></svg></span>
        <b>Déplacement</b>
        <span>Jusqu'à ta <strong>Vitesse</strong> (9 m en général), avant et/ou après ton action.</span>
      </div>
      <div class="turn-arrow" aria-hidden="true">➜</div>
      <div class="turn-step tone-action">
        <span class="turn-step-head"><span class="turn-step-n">2</span><svg class="icon"><use href="#i-swords"/></svg></span>
        <b>Une action</b>
        <span>Attaque, Magie, Pointe, Désengagement, Esquive, Aide…</span>
      </div>
      <div class="turn-arrow" aria-hidden="true">➜</div>
      <div class="turn-step tone-bonus">
        <span class="turn-step-head"><span class="turn-step-n">3</span><svg class="icon"><use href="#i-bolt"/></svg></span>
        <b>Action bonus</b>
        <span><em>Seulement</em> si une capacité te la donne (Rage, certains sorts…).</span>
      </div>
    </div>
    <div class="turn-reaction tone-reaction">
      <svg class="icon"><use href="#i-shield"/></svg>
      <span><strong>Hors de ton tour :</strong> 1 Réaction par round — ex. l'attaque d'Opportunité contre
      un ennemi qui s'éloigne de ta portée.</span>
    </div>
  </div>`;
}

/* ------------------------------ Initiative ------------------------------ */

function loadInit(){ return storeGet(INIT_KEY, { rows: [], turn: 0, round: 1 }); }
function saveInit(s){ storeSet(INIT_KEY, s); }

function initiativeHTML(){
  return `
    <div id="init-zone">
      <div class="initiative-list" id="init-list"></div>
      <form class="initiative-form" id="init-form">
        <input class="input" id="init-name" placeholder="Nom (ex. Korgan, Gobelin 1)" aria-label="Nom du combattant" autocomplete="off">
        <input class="input input-num" id="init-score" type="number" placeholder="Init." aria-label="Score d'initiative" min="-5" max="40">
        <button class="btn btn-sm" type="submit"><svg class="icon"><use href="#i-plus"/></svg></button>
      </form>
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" type="button" id="init-next">Tour suivant →</button>
        <span class="chip chip-gold" id="init-round"></span>
        <button class="btn btn-danger btn-sm" type="button" id="init-clear" style="margin-left:auto">Vider</button>
      </div>
    </div>`;
}

function bindInitiative(view){
  const state = loadInit();
  const list = qs('#init-list', view);
  const roundChip = qs('#init-round', view);

  function render(){
    state.rows.sort((a, b) => b.score - a.score);
    if(state.rows.length === 0){
      list.innerHTML = '<p class="dice-history-empty">Ajoute les combattants puis mène la danse.</p>';
    } else {
      list.innerHTML = state.rows.map((r, i) => `
        <div class="initiative-row ${i === state.turn ? 'is-current' : ''}">
          <span class="initiative-score">${r.score}</span>
          <span class="initiative-name">${escapeHtml(r.name)} ${i === state.turn ? '<strong style="color:var(--gold-bright)">← à lui de jouer</strong>' : ''}</span>
          <button class="icon-btn" type="button" data-del="${i}" aria-label="Retirer ${escapeHtml(r.name)}" style="width:30px;height:30px"><svg class="icon" style="width:15px;height:15px"><use href="#i-trash"/></svg></button>
        </div>`).join('');
    }
    roundChip.textContent = `Round ${state.round}`;
    saveInit(state);
  }

  qs('#init-form', view).addEventListener('submit', (e) => {
    e.preventDefault();
    const name = qs('#init-name', view).value.trim();
    const score = parseInt(qs('#init-score', view).value, 10);
    if(!name || !Number.isFinite(score)) return;
    state.rows.push({ name, score });
    qs('#init-name', view).value = '';
    qs('#init-score', view).value = '';
    qs('#init-name', view).focus();
    render();
  });
  list.addEventListener('click', (e) => {
    const del = e.target.closest('[data-del]');
    if(!del) return;
    const i = Number(del.dataset.del);
    state.rows.splice(i, 1);
    if(state.turn >= state.rows.length) state.turn = 0;
    render();
  });
  qs('#init-next', view).addEventListener('click', () => {
    if(state.rows.length === 0) return;
    state.turn++;
    if(state.turn >= state.rows.length){ state.turn = 0; state.round++; }
    render();
  });
  qs('#init-clear', view).addEventListener('click', () => {
    state.rows = []; state.turn = 0; state.round = 1;
    render();
  });

  render();
}

/* --------------------------------- Page --------------------------------- */

export function renderEcran(view){
  grantMilestone('ecran-consulte');

  const actions = DATA.glossaireRaw.actions || [];
  const etats = DATA.glossaireRaw.etats || [];

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">À la table</p>
      <h1 class="page-title">Écran du joueur</h1>
      <p class="page-lede">Tout ce qu'il faut garder sous les yeux pendant la partie, <em>rangé par couleur</em> :
      <span class="tone-key tone-action">rouge = attaquer</span>, <span class="tone-key tone-move">vert = survivre</span>,
      <span class="tone-key tone-rest">bleu = récupérer</span>, <span class="tone-key tone-bonus">violet = règles d'or</span>.
      Clique sur un terme souligné pour sa règle complète.</p>
    </div>

    ${turnBoardHTML()}

    <div class="ref-grid">
      ${refCard('Attaquer', 'i-swords', `
        <ol>
          <li><span class="kw-dice">d20</span> + carac. + maîtrise <strong>≥ CA</strong> de la cible ?</li>
          <li>Touché : lance les <strong>dégâts</strong> (dé de l'arme + carac.).</li>
          <li><strong>20 naturel</strong> : critique, double les dés de dégâts !</li>
        </ol>
        <p style="margin-top:10px"><button class="btn btn-sm" type="button" id="ecran-dice"><svg class="icon"><use href="#i-d20"/></svg> Ouvrir les dés</button></p>`, 'tone-action')}

      ${refCard('Tomber à 0 PV', 'i-heart', `
        <ul>
          <li>Tu es <strong>Inconscient</strong> — à ton tour : <span class="kw-dice">d20</span> sans bonus.</li>
          <li><strong>10+</strong> : réussite (3 = stable) · <strong>9−</strong> : échec (3 = mort).</li>
          <li><strong>20 nat.</strong> : debout avec 1 PV · <strong>1 nat.</strong> : 2 échecs.</li>
          <li>Le moindre soin te relève immédiatement.</li>
        </ul>`, 'tone-move')}

      ${refCard('Les repos', 'i-home', `
        <ul>
          <li><strong>Court (1 h)</strong> — dépense des dés de vie pour te soigner ; certaines capacités reviennent.</li>
          <li><strong>Long (8 h)</strong> — tous les PV, la moitié des dés de vie, tous les emplacements de sorts. Un par 24 h.</li>
        </ul>`, 'tone-rest')}

      ${refCard('Rappels qui sauvent', 'i-voie', `
        <ul>
          <li><strong>Avantage / Désavantage</strong> : 2d20, garde le meilleur / le pire. Jamais cumulé.</li>
          <li><strong>Concentration</strong> : un seul sort à la fois ; dégâts reçus → sauvegarde de Constitution.</li>
          <li><strong>Égalité au DD</strong> = réussite.</li>
          <li>Perdu ? <kbd>Ctrl</kbd>+<kbd>K</kbd> et tape le mot qui te manque.</li>
        </ul>`, 'tone-bonus')}

      <div class="ref-card tone-gold">
        <div class="ref-card-head"><svg class="icon"><use href="#i-bolt"/></svg>Suivi d'initiative</div>
        <div class="ref-card-body">${initiativeHTML()}</div>
      </div>
    </div>

    <h2 class="section-title tone-title-action"><svg class="icon"><use href="#i-swords"/></svg>Les actions officielles</h2>
    <div id="ecran-actions"></div>

    <h2 class="section-title tone-title-etat"><svg class="icon"><use href="#i-glossaire"/></svg>Les états (Charmé, À terre, Empoisonné…)</h2>
    <div id="ecran-etats"></div>
  `;

  const acc = (e, catClass) => `<details class="acc ${catClass}">
    <summary>${escapeHtml(e.terme)}
      ${e.anglais ? `<span class="chip" style="font-weight:400">${escapeHtml(e.anglais)}</span>` : ''}
      <svg class="icon acc-chevron"><use href="#i-chevron"/></svg>
    </summary>
    <div class="acc-body prose">${enrichHTML(e.description || '', { isPlainText: true })}</div>
  </details>`;

  qs('#ecran-actions', view).innerHTML = actions.map(e => acc(e, 'cat-action')).join('');
  qs('#ecran-etats', view).innerHTML = etats.map(e => acc(e, 'cat-etat')).join('');
  qs('#ecran-dice', view).addEventListener('click', () => openDiceTray());

  bindInitiative(view);
}
