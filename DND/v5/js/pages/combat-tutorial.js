// Tutoriel interactif du premier tour de combat (Mode Découverte) : transforme la
// lecture passive de la page Combat en un premier geste de jeu concret, en réutilisant
// le même lanceur de dés (js/dice.js -> rollDice) que le reste du site, sans ouvrir sa
// propre modale par-dessus (openModal() en fermerait une autre) — les jets sont donc
// affichés en ligne, à même l'étape du tutoriel.

import { openModal } from '../modal.js';
import { escapeHtml } from '../utils.js';
import { rollDice } from '../dice.js';
import { getGlossaryEntry, enrichHTML } from '../enrich.js';
import { navigate } from '../router.js';

function diceResultHTML(res){
  const detail = res.rolls.length > 1 || res.modifier
    ? `(${res.rolls.join(' + ')}${res.modifier ? ` ${res.modifier>=0?'+':''}${res.modifier}` : ''})`
    : '';
  return `<div class="abil-card frame tut-roll dice-pop" style="max-width:180px;margin:1em 0;">
    <div class="abil-name">Résultat</div>
    <div class="abil-final">${res.total}</div>
    ${detail ? `<div class="abil-breakdown">${escapeHtml(detail)}</div>` : ''}
  </div>`;
}

export function openCombatTutorial(originEl){
  let step = 0;
  let attackRoll = null;
  let damageRoll = null;

  const STEPS = [
    // 0 — C'est votre tour
    () => ({
      title: "C'est votre tour !",
      body: `
        <p class="cbt-lead">Dans l'ordre d'Initiative, chaque participant joue son tour l'un après l'autre. Sur le vôtre, vous pouvez généralement faire trois choses :</p>
        <ul class="tips-list">
          <li><span class="tips-icon">🏃</span><div><strong>Vous déplacer</strong> — jusqu'à votre vitesse.</div></li>
          <li><span class="tips-icon">⚔</span><div><strong>Une action</strong> — le plus souvent, attaquer.</div></li>
          <li><span class="tips-icon">✦</span><div><strong>Une action bonus</strong> — si une capacité vous en donne une.</div></li>
        </ul>
        <p class="page-lede">Essayons l'exemple le plus courant : attaquer un ennemi.</p>
      `,
      next: 'Suivant → Choisir une action',
    }),
    // 1 — Que puis-je faire
    () => {
      const entry = getGlossaryEntry('attaque');
      return {
        title: 'Vous choisissez : Attaquer',
        body: `
          <div class="cbt-action-card is-open" style="cursor:default;">
            <div class="cbt-action-head">
              <span class="cbt-action-icon">⚔</span>
              <div class="cbt-action-name">${escapeHtml(entry?.terme || 'Attaquer')}</div>
              <span class="cbt-action-cost">1 action</span>
            </div>
            <div class="cbt-action-body"><p>${entry ? enrichHTML(entry.description) : ''}</p></div>
          </div>
          <p class="page-lede" style="margin-top:1em;">Pour savoir si vous touchez, il faut faire un <strong>jet d'attaque</strong>.</p>
        `,
        next: "Suivant → Jet d'attaque",
      };
    },
    // 2 — Jet d'attaque
    () => ({
      title: "Jet d'attaque",
      body: `
        <p class="cbt-lead">Lancez un <strong>d20</strong> et ajoutez vos bonus (modificateur de caractéristique + Maîtrise). Sur la fiche d'un personnage, ce total est déjà calculé pour vous — ici, lançons juste le d20.</p>
        <button type="button" class="btn btn-primary" id="tut-roll-attack">🎲 Lancer 1d20</button>
        ${attackRoll ? diceResultHTML(attackRoll) : ''}
        ${attackRoll ? `<p class="page-lede">Contre la Classe d'Armure typique d'un adversaire de départ (environ 13), <strong>${attackRoll.total >= 13 ? 'ce jet touche' : 'ce jet rate'}</strong> (une fois vos bonus ajoutés, le vrai résultat peut changer).</p>` : ''}
      `,
      next: attackRoll ? 'Suivant → Dégâts' : null,
    }),
    // 3 — Dégâts
    () => ({
      title: 'Dégâts',
      body: `
        <p class="cbt-lead">Une attaque réussie inflige des dégâts : lancez le ou les dés de votre arme. Prenons l'exemple d'une épée longue, <strong>1d8</strong>.</p>
        <button type="button" class="btn btn-primary" id="tut-roll-damage">🎲 Lancer 1d8</button>
        ${damageRoll ? diceResultHTML(damageRoll) : ''}
      `,
      next: damageRoll ? 'Suivant → Terminer' : null,
    }),
    // 4 — Fin
    () => ({
      title: 'Bravo, premier tour joué !',
      body: `
        <p class="cbt-lead">Vous venez d'enchaîner : <strong>action</strong> → <strong>jet d'attaque</strong> → <strong>dégâts</strong>. C'est la structure de la grande majorité des tours de combat.</p>
        <p class="page-lede">En vraie partie, les bonus à ajouter sont déjà calculés pour vous sur la fiche de votre personnage (onglet Actions) — un simple bouton "🎲 Toucher" / "🎲 Dégâts" y fait le même travail.</p>
      `,
      next: null,
      final: true,
    }),
  ];

  function render(){
    const def = STEPS[step]();
    modalRef.panel.querySelector('h2').textContent = def.title;
    modalRef.bodyEl.innerHTML = `
      <div class="quiz-progress">${STEPS.map((_,i) => `<span class="quiz-dot ${i < step ? 'is-done' : ''} ${i === step ? 'is-active' : ''}"></span>`).join('')}</div>
      ${def.body}
      <div class="wizard-nav" style="border:none;padding:0;margin-top:1.4em;">
        ${step > 0 ? `<button type="button" class="btn btn-ghost" id="tut-prev">&larr; Précédent</button>` : '<span></span>'}
        <span class="spacer"></span>
        ${def.final
          ? `<button type="button" class="btn btn-primary" id="tut-finish">Voir ma fiche</button>
             <button type="button" class="btn btn-ghost" id="tut-close">Fermer</button>`
          : `<button type="button" class="btn btn-primary" id="tut-next" ${def.next ? '' : 'disabled'}>${escapeHtml(def.next || 'Lancez le dé pour continuer')}</button>`
        }
      </div>
    `;
    wire();
  }

  function wire(){
    modalRef.bodyEl.querySelector('#tut-prev')?.addEventListener('click', () => { step--; render(); });
    modalRef.bodyEl.querySelector('#tut-next')?.addEventListener('click', () => { step++; render(); });
    modalRef.bodyEl.querySelector('#tut-close')?.addEventListener('click', () => modalRef.close());
    modalRef.bodyEl.querySelector('#tut-finish')?.addEventListener('click', () => { modalRef.close(); navigate('personnage'); });
    modalRef.bodyEl.querySelector('#tut-roll-attack')?.addEventListener('click', () => {
      attackRoll = rollDice(1, 20, 0);
      render();
    });
    modalRef.bodyEl.querySelector('#tut-roll-damage')?.addEventListener('click', () => {
      damageRoll = rollDice(1, 8, 0);
      render();
    });
  }

  const modalRef = openModal({
    eyebrow: 'Mode Découverte',
    title: STEPS[0]().title,
    originEl,
    build(){ /* rempli par render() juste après */ },
  });
  render();
}
