// Lanceur de dés immersif : plateau coulissant accessible partout (bouton d'en-tête),
// notation libre (2d6+3), avantage/désavantage, historique persistant de session.

import { el, qs, escapeHtml, clamp } from './utils.js';

const DICE = [4, 6, 8, 10, 12, 20, 100];
let tray = null;
let history = [];

export function parseNotation(str){
  // "2d6+3", "d20", "1d8-1"
  const m = String(str || '').trim().toLowerCase().replace(/\s+/g, '').match(/^(\d*)d(\d+)([+-]\d+)?$/);
  if(!m) return null;
  return {
    count: clamp(parseInt(m[1] || '1', 10), 1, 40),
    faces: clamp(parseInt(m[2], 10), 2, 1000),
    mod: parseInt(m[3] || '0', 10),
  };
}

export function roll(count, faces, mod = 0){
  const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * faces));
  const total = rolls.reduce((a, b) => a + b, 0) + mod;
  return { rolls, mod, total, faces, count };
}

function announceRoll(result, label){
  history.unshift({ ...result, label: label || `${result.count}d${result.faces}${result.mod ? (result.mod > 0 ? '+' + result.mod : result.mod) : ''}`, at: Date.now() });
  history = history.slice(0, 30);
  document.dispatchEvent(new CustomEvent('grimoire:roll', { detail: result }));
}

function resultHTML(result){
  const { rolls, mod, total, faces } = result;
  const isD20Single = faces === 20 && rolls.length === 1;
  const crit = isD20Single && rolls[0] === 20;
  const fumble = isD20Single && rolls[0] === 1;
  const dieClass = crit ? 'is-crit' : fumble ? 'is-fumble' : '';
  const detail = rolls.map(r => `<span class="die-chip ${faces === 20 && r === 20 ? 'is-crit' : ''} ${faces === 20 && r === 1 ? 'is-fumble' : ''}">${r}</span>`).join('')
    + (mod ? `<span class="die-mod">${mod > 0 ? '+' : ''}${mod}</span>` : '');
  const note = crit ? '<div class="roll-note roll-note-crit">Coup critique ! Les dés chantent.</div>'
    : fumble ? '<div class="roll-note roll-note-fumble">Échec critique… le destin se moque.</div>' : '';
  return `<div class="roll-total ${dieClass}">${total}</div><div class="roll-detail">${detail}</div>${note}`;
}

function renderHistory(){
  const zone = qs('.dice-history', tray);
  if(!zone) return;
  if(history.length === 0){
    zone.innerHTML = '<p class="dice-history-empty">Aucun jet pour l’instant. Le destin attend.</p>';
    return;
  }
  zone.innerHTML = history.slice(0, 12).map(h =>
    `<div class="dice-history-row"><span class="dice-history-label">${escapeHtml(h.label)}</span>`
    + `<span class="dice-history-rolls">${h.rolls.join(' · ')}${h.mod ? (h.mod > 0 ? ' +' + h.mod : ' ' + h.mod) : ''}</span>`
    + `<span class="dice-history-total">${h.total}</span></div>`
  ).join('');
}

function doRoll(count, faces, mod, label){
  const stage = qs('.dice-stage', tray);
  const result = roll(count, faces, mod);
  stage.classList.remove('is-rolling');
  void stage.offsetWidth;
  stage.classList.add('is-rolling');
  stage.innerHTML = `<div class="dice-spin" aria-hidden="true"><svg class="icon icon-die"><use href="#i-d20"/></svg></div>`;
  setTimeout(() => {
    stage.innerHTML = resultHTML(result);
    announceRoll(result, label);
    renderHistory();
  }, 520);
}

function doAdvRoll(kind){
  // kind: 'adv' | 'dis'
  const stage = qs('.dice-stage', tray);
  const a = roll(1, 20, 0), b = roll(1, 20, 0);
  const keep = kind === 'adv' ? Math.max(a.total, b.total) : Math.min(a.total, b.total);
  stage.classList.remove('is-rolling');
  void stage.offsetWidth;
  stage.classList.add('is-rolling');
  stage.innerHTML = `<div class="dice-spin" aria-hidden="true"><svg class="icon icon-die"><use href="#i-d20"/></svg></div>`;
  setTimeout(() => {
    const label = kind === 'adv' ? 'Avantage' : 'Désavantage';
    stage.innerHTML =
      `<div class="roll-total ${keep === 20 ? 'is-crit' : keep === 1 ? 'is-fumble' : ''}">${keep}</div>`
      + `<div class="roll-detail"><span class="die-chip ${a.total === keep ? 'is-kept' : 'is-dropped'}">${a.total}</span>`
      + `<span class="die-chip ${b.total === keep && a.total !== keep ? 'is-kept' : (a.total === keep ? 'is-dropped' : 'is-dropped')}">${b.total}</span>`
      + `<span class="die-mod">${label} : on garde ${keep}</span></div>`;
    const res = { rolls: [a.total, b.total], mod: 0, total: keep, faces: 20, count: 2 };
    announceRoll(res, `d20 ${label}`);
    renderHistory();
  }, 520);
}

function buildTray(){
  tray = el('div', { class: 'dice-tray', role: 'dialog', 'aria-label': 'Lanceur de dés' });
  tray.innerHTML = `
    <div class="dice-tray-inner">
      <header class="dice-tray-head">
        <h2><svg class="icon"><use href="#i-d20"/></svg> Table des dés</h2>
        <button class="icon-btn dice-close" type="button" aria-label="Fermer le lanceur de dés"><svg class="icon"><use href="#i-close"/></svg></button>
      </header>
      <div class="dice-stage" aria-live="polite">
        <p class="dice-stage-hint">Choisis un dé, ou écris une formule (ex. 2d6+3).</p>
      </div>
      <div class="dice-buttons">
        ${DICE.map(f => `<button class="die-btn" type="button" data-faces="${f}">d${f}</button>`).join('')}
      </div>
      <div class="dice-adv">
        <button class="btn btn-ghost btn-sm" type="button" data-adv="adv">Avantage (2d20, meilleur)</button>
        <button class="btn btn-ghost btn-sm" type="button" data-adv="dis">Désavantage (2d20, pire)</button>
      </div>
      <form class="dice-form">
        <input type="text" class="dice-input" placeholder="Formule : 2d6+3" aria-label="Formule de dés" autocomplete="off" spellcheck="false">
        <button class="btn btn-primary btn-sm" type="submit">Lancer</button>
      </form>
      <div class="dice-history"></div>
    </div>`;
  document.body.appendChild(tray);

  qs('.dice-close', tray).addEventListener('click', closeDiceTray);
  tray.addEventListener('pointerdown', (e) => { if(e.target === tray) closeDiceTray(); });
  tray.querySelectorAll('.die-btn').forEach(btn => {
    btn.addEventListener('click', () => doRoll(1, Number(btn.dataset.faces), 0));
  });
  tray.querySelectorAll('[data-adv]').forEach(btn => {
    btn.addEventListener('click', () => doAdvRoll(btn.dataset.adv));
  });
  qs('.dice-form', tray).addEventListener('submit', (e) => {
    e.preventDefault();
    const input = qs('.dice-input', tray);
    const parsed = parseNotation(input.value);
    if(!parsed){
      input.classList.add('is-invalid');
      setTimeout(() => input.classList.remove('is-invalid'), 700);
      return;
    }
    doRoll(parsed.count, parsed.faces, parsed.mod, input.value.trim());
  });
  renderHistory();
}

export function openDiceTray(prefill = null){
  if(!tray) buildTray();
  tray.classList.add('is-open');
  document.body.classList.add('dice-open');
  if(prefill){
    const input = qs('.dice-input', tray);
    if(prefill.notation) input.value = prefill.notation;
    const parsed = parseNotation(prefill.notation || '');
    if(parsed && prefill.auto) doRoll(parsed.count, parsed.faces, parsed.mod, prefill.label || prefill.notation);
  }
}

export function closeDiceTray(){
  if(tray){
    tray.classList.remove('is-open');
    document.body.classList.remove('dice-open');
  }
}

export function toggleDiceTray(){
  if(tray?.classList.contains('is-open')) closeDiceTray();
  else openDiceTray();
}

// Délégation globale : tout élément [data-roll] lance sa formule directement.
document.addEventListener('click', (e) => {
  const trigger = e.target.closest?.('[data-roll]');
  if(!trigger) return;
  const notation = trigger.dataset.roll;
  const label = trigger.dataset.rollLabel || notation;
  openDiceTray({ notation, label, auto: true });
});
