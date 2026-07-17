// Mini-tracker de combat : initiative et PV en direct pour une rencontre.
// L'état est volatil (non sauvegardé dans la campagne) : chaque « Lancer le
// combat » repart d'une situation fraîche. Seule exception : si une session
// est en cours, « Consigner » écrit un résumé du combat dans son journal —
// le combat laisse une trace choisie, sans perdre sa légèreté.

import { el, escapeHtml } from '../utils.js';
import { openModal, toast } from '../ui.js';
import { findEntity, getActiveSession, commit } from './store.js';
import { createLogEvent } from './schema.js';
import { detectRefs } from './wiki.js';

const intFrom = (s, fb = 0) => {
  const m = String(s ?? '').match(/-?\d+/);
  return m ? parseInt(m[0], 10) : fb;
};
const d20 = () => Math.floor(Math.random() * 20) + 1;

export function openTracker(encounter){
  // « Gobelin 1 », « Gobelin 2 »… : une ligne par individu.
  const combatants = [];
  for(const p of encounter.participants){
    const cr = findEntity('pnj', p.creatureId);
    if(!cr) continue;
    const qty = Math.max(1, p.quantite || 1);
    const pvMax = intFrom(cr.statBlock?.pv, 10);
    const initMod = intFrom(cr.statBlock?.initiative, 0);
    for(let i = 1; i <= qty; i++){
      combatants.push({
        nom: qty > 1 ? `${cr.nom} ${i}` : cr.nom,
        init: d20() + initMod,
        pv: pvMax, pvMax,
      });
    }
  }
  if(!combatants.length) toast('Rencontre sans participant : ajoutez les combattants à la main', { icon: 'ℹ️' });

  let round = 1;
  let turn = 0;

  const roundLabel = el('strong', { class: 'mj-tracker-round' });
  const list = el('div', { class: 'mj-tracker-list' });

  const sortByInit = () => combatants.sort((a, b) => b.init - a.init);
  sortByInit();

  function render(){
    roundLabel.textContent = `Round ${round}`;
    if(combatants.length) turn = Math.min(turn, combatants.length - 1);
    list.replaceChildren(...combatants.map((c, i) => {
      const initInput = el('input', { class: 'input mj-tracker-num', type: 'number', 'aria-label': 'Initiative' });
      initInput.value = c.init;
      initInput.addEventListener('change', () => { c.init = parseInt(initInput.value, 10) || 0; });

      const pvInput = el('input', { class: 'input mj-tracker-num', type: 'number', 'aria-label': 'Points de vie' });
      pvInput.value = c.pv;
      const syncPv = () => {
        c.pv = parseInt(pvInput.value, 10) || 0;
        row.classList.toggle('is-down', c.pv <= 0);
      };
      pvInput.addEventListener('change', syncPv);

      const bump = (delta) => { pvInput.value = (parseInt(pvInput.value, 10) || 0) + delta; syncPv(); };

      const row = el('div', { class: `mj-tracker-row${i === turn ? ' is-turn' : ''}${c.pv <= 0 ? ' is-down' : ''}` }, [
        el('span', { class: 'mj-tracker-marker', text: i === turn ? '▶' : '' }),
        initInput,
        el('span', { class: 'mj-tracker-name', text: c.nom }),
        el('div', { class: 'mj-tracker-pv' }, [
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: '−5', onclick: () => bump(-5) }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: '−1', onclick: () => bump(-1) }),
          pvInput,
          el('span', { class: 'mj-tracker-pvmax', text: `/ ${c.pvMax}` }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: '+1', onclick: () => bump(1) }),
        ]),
        el('button', {
          class: 'icon-btn', type: 'button', 'aria-label': `Retirer ${c.nom}`,
          html: '<svg class="icon"><use href="#i-trash"/></svg>',
          onclick: () => { combatants.splice(i, 1); if(turn >= combatants.length) turn = 0; render(); },
        }),
      ]);
      return row;
    }));
  }

  function nextTurn(){
    if(!combatants.length) return;
    turn++;
    if(turn >= combatants.length){ turn = 0; round++; }
    render();
  }

  // Ajout à la main (personnages des joueurs, renforts…).
  const addName = el('input', { class: 'input', type: 'text', placeholder: 'Nom (ex. Kara la barde)' });
  const addInit = el('input', { class: 'input mj-tracker-num', type: 'number', placeholder: 'Init' });
  const addPv = el('input', { class: 'input mj-tracker-num', type: 'number', placeholder: 'PV' });
  const addForm = el('form', { class: 'mj-tracker-add' }, [
    addName, addInit, addPv,
    el('button', { class: 'btn btn-sm', type: 'submit', text: 'Ajouter' }),
  ]);
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!addName.value.trim()) return;
    const pv = parseInt(addPv.value, 10) || 10;
    combatants.push({ nom: addName.value.trim(), init: parseInt(addInit.value, 10) || d20(), pv, pvMax: pv });
    sortByInit();
    addName.value = addInit.value = addPv.value = '';
    render();
  });

  // Session en cours au moment du lancement : le combat peut être consigné.
  function logToSession(){
    const session = getActiveSession();
    if(!session){ toast('Aucune session en cours : rien à consigner', { icon: 'ℹ️' }); return; }
    const down = combatants.filter(c => c.pv <= 0).map(c => c.nom);
    const up = combatants.filter(c => c.pv > 0).map(c => `${c.nom} (${c.pv}/${c.pvMax} PV)`);
    const texte = `Combat « ${encounter.titre || 'sans titre'} » — round ${round}.`
      + (down.length ? ` À terre : ${down.join(', ')}.` : '')
      + (up.length ? ` Debout : ${up.join(', ')}.` : '');
    session.log.push(createLogEvent({ texte, tag: 'combat', refs: detectRefs(texte) }));
    commit('session:log');
    toast('Combat consigné dans le journal de la session', { icon: '📝' });
  }

  const node = el('div', { class: 'mj-tracker' }, [
    el('div', { class: 'mj-tracker-bar' }, [
      roundLabel,
      el('button', { class: 'btn btn-gold btn-sm', type: 'button', text: 'Tour suivant ▶', onclick: nextTurn }),
      el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Trier par initiative', onclick: () => { sortByInit(); turn = 0; render(); } }),
      getActiveSession() && el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: '📝 Consigner',
        title: 'Écrire le résumé du combat dans le journal de la session en cours',
        onclick: logToSession,
      }),
    ]),
    list,
    addForm,
  ]);
  render();

  openModal({ title: `⚔ ${escapeHtml(encounter.titre || 'Combat')}`, node, className: 'modal-tracker' });
}
