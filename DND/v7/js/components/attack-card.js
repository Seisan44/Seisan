// Carte d'attaque (design Stitch) : nom + badge d'activation, sous-titre, puis
// deux déclencheurs de jet — « Toucher » et « Dégâts ». Les boutons portent
// data-roll / data-roll-label : le lanceur de dés (dice.js) les prend en charge.

import { escapeHtml, fmtMod } from '../utils.js';
import { actionBadge } from '../character/action-economy.js';
import { critNotation } from '../dice.js';

/**
 * @param {object} o
 * @param {string} o.nameHTML   nom (HTML déjà échappé, peut contenir un lien)
 * @param {string} [o.kind]     'action' | 'bonus' | 'reaction'
 * @param {string} [o.subHTML]  ligne descriptive sous le nom
 * @param {{bonus:number,label:string,toHit?:string}} o.hit
 * @param {{dice?:string,typeHTML?:string,label:string,fixedHTML?:string,fixedTitle?:string}} o.damage
 * @param {string} [o.chipsHTML]
 * @param {string} [o.className]
 */
export function attackCardHTML({ nameHTML, kind = 'action', subHTML = '', hit, damage, chipsHTML = '', className = '' }){
  const hitBtn = `
    <button class="roll-btn is-hit" type="button" data-roll="1d20+${hit.bonus}" data-roll-kind="attack" data-roll-label="${escapeHtml(hit.label)}">
      <span class="roll-btn-text">
        <span class="roll-btn-label">Toucher</span>
        <span class="roll-btn-value">${fmtMod(hit.bonus)}</span>
      </span>
      <svg class="icon" aria-hidden="true"><use href="#i-d20"/></svg>
    </button>`;

  const dmgBtn = damage.dice
    ? `<button class="roll-btn is-dmg" type="button" data-roll="${escapeHtml(damage.dice)}" data-roll-label="${escapeHtml(damage.label)}">
        <span class="roll-btn-text">
          <span class="roll-btn-label">Dégâts</span>
          <span class="roll-btn-value">${escapeHtml(damage.dice)} <span class="roll-btn-type">${damage.typeHTML || ''}</span></span>
        </span>
        <svg class="icon" aria-hidden="true"><use href="#i-swords"/></svg>
      </button>`
    : `<div class="roll-btn is-static" ${damage.fixedTitle ? `title="${escapeHtml(damage.fixedTitle)}"` : ''}>
        <span class="roll-btn-text">
          <span class="roll-btn-label">Dégâts</span>
          <span class="roll-btn-value">${damage.fixedHTML || ''}</span>
        </span>
      </div>`;

  const critDice = damage.dice ? critNotation(damage.dice) : '';
  const critChip = critDice
    ? `<button type="button" class="chip chip-clickable" data-roll="${escapeHtml(critDice)}" data-roll-label="${escapeHtml(damage.label)} (critique)" title="Sur un 20 naturel au toucher : les dés de dégâts sont doublés, pas le modificateur">💥 Critique : ${escapeHtml(critDice)}</button>`
    : '';
  const rowHTML = critChip + chipsHTML;

  return `<div class="attack-card ${className}">
    <div class="attack-card-head">
      <span class="attack-card-name">${nameHTML}</span>
      ${actionBadge(kind)}
    </div>
    ${subHTML ? `<p class="attack-card-sub">${subHTML}</p>` : ''}
    <div class="roll-grid">${hitBtn}${dmgBtn}</div>
    ${rowHTML ? `<div class="attack-card-row">${rowHTML}</div>` : ''}
  </div>`;
}
