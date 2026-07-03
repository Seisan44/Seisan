// Lanceur de dés léger : jets rapides depuis la page Combat et la fiche de personnage.

import { openModal } from './modal.js';
import { escapeHtml } from './utils.js';

function rollOne(sides){ return 1 + Math.floor(Math.random() * sides); }

export function rollDice(count, sides, modifier = 0){
  const rolls = Array.from({ length: count }, () => rollOne(sides));
  const total = rolls.reduce((a,b) => a+b, 0) + modifier;
  return { rolls, total, sides, modifier };
}

const DICE = [4,6,8,10,12,20,100];
const history = [];

function resultLine(label, res){
  const detail = res.rolls.length > 1 || res.modifier
    ? `(${res.rolls.join(' + ')}${res.modifier ? ` ${res.modifier>=0?'+':''}${res.modifier}` : ''})`
    : '';
  return `<div class="dice-result-row"><span>${escapeHtml(label)}</span><span class="dice-total">${res.total}</span><span class="dice-detail">${detail}</span></div>`;
}

export function openDiceRoller(originEl){
  openModal({
    eyebrow: 'Lancer de dés',
    title: 'Jeter les dés',
    originEl,
    build(body){
      body.innerHTML = `
        <div class="chip-group" id="dice-buttons" style="margin-bottom:1em;">
          ${DICE.map(s => `<button type="button" class="chip" data-sides="${s}">d${s}</button>`).join('')}
        </div>
        <div class="flex-gap" style="margin-bottom:1.2em;align-items:center;">
          <label class="field-label" style="margin:0;">Quantité</label>
          <input type="number" class="field" id="dice-count" value="1" min="1" max="20" style="width:70px;">
          <label class="field-label" style="margin:0;">Modificateur</label>
          <input type="number" class="field" id="dice-mod" value="0" style="width:70px;">
        </div>
        <div id="dice-history" class="dice-history"></div>
      `;
      const countInput = body.querySelector('#dice-count');
      const modInput = body.querySelector('#dice-mod');
      const histBox = body.querySelector('#dice-history');
      function renderHistory(){
        histBox.innerHTML = history.slice(-8).reverse().map(h => resultLine(h.label, h.res)).join('') || '<p class="page-lede" style="font-size:.88em;">Aucun jet pour l’instant.</p>';
      }
      body.querySelectorAll('[data-sides]').forEach(btn => btn.addEventListener('click', () => {
        const sides = Number(btn.dataset.sides);
        const count = Math.max(1, parseInt(countInput.value,10)||1);
        const mod = parseInt(modInput.value,10)||0;
        const res = rollDice(count, sides, mod);
        history.push({ label: `${count}d${sides}${mod?(mod>0?`+${mod}`:mod):''}`, res });
        renderHistory();
        histBox.firstElementChild?.classList.add('dice-pop');
      }));
      renderHistory();
    }
  });
}

export function initDiceTriggers(){
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-dice-roll]');
    if(!t) return;
    e.stopPropagation();
    const [count, sides, mod] = t.dataset.diceRoll.split(',').map(Number);
    const res = rollDice(count || 1, sides || 20, mod || 0);
    const label = t.dataset.diceLabel || `${count}d${sides}`;
    history.push({ label, res });
    openDiceRoller(t);
  });
}
