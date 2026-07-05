// Point d'entrée guidé de la page Personnage en Mode Découverte : deux façons de démarrer
// (créer pas à pas, ou choisir un personnage prêt à jouer — recommandé), avec un quiz
// optionnel pour orienter le choix. Composant auto-porté comme js/character/wizard.js :
// un seul conteneur, des écrans internes gérés par simples appels de fonction (pas de
// nouvelles routes hash).

import { DATA } from '../data.js';
import { escapeHtml, formatList } from '../utils.js';
import { speciesImage, imgWithFallback } from '../images.js';
import { ABILITIES } from './rules.js';
import { CLASS_ARCHETYPES } from '../pages/class-tips.js';
import { createCharacterShell, saveCharacter, setActiveId } from './storage.js';
import { renderWizard } from './wizard.js';
import { navigate } from '../router.js';
import { toast } from '../toast.js';
import { PREGEN_DEFS, buildPregenCharacter } from './pregens.js';
import { QUIZ_QUESTIONS, scorePregens } from './quiz.js';

const TAG_LABELS = {
  melee:'le combat au corps-à-corps', tank:'encaisser les coups', protecteur:'protéger ses alliés',
  ranged:'le combat à distance', nature:'la nature', explorateur:'l’exploration',
  stealth:'la discrétion', skill:'la ruse et les compétences', malin:'la ruse',
  healer:'le soin', support:'le soutien',
  caster:'la magie', arcane:'la magie arcanique', tactique:'la tactique',
  berserker:'la rage', degats:'les gros dégâts', simple:'la simplicité',
  polyvalent:'la polyvalence',
};

function tip(text){
  return `<div class="cbt-callout c-gold" style="margin:1.2em 0;"><span class="cbt-callout-icon">💡</span><div>${text}</div></div>`;
}

export function renderStartHub(container){
  let quizAnswers = [];
  let quizIndex = 0;

  function showChoice(){
    container.innerHTML = `
      <header class="page-header">
        <p class="eyebrow">Mode Découverte</p>
        <h1 class="page-title">Comment voulez-vous commencer ?</h1>
        <p class="page-lede">Deux façons simples de démarrer — vous pourrez toujours personnaliser votre personnage plus tard, depuis sa fiche.</p>
      </header>
      <div class="start-choice-grid">
        <button type="button" class="start-choice-card" data-choice="creer">
          <span class="start-choice-icon" aria-hidden="true">🖌</span>
          <h2>Je crée mon personnage</h2>
          <p>Choisissez votre espèce, votre classe et votre historique pas à pas, en six étapes guidées.</p>
          <span class="btn btn-ghost">Commencer la création →</span>
        </button>
        <button type="button" class="start-choice-card is-recommended" data-choice="pregens">
          <span class="pill start-choice-badge">Recommandé</span>
          <span class="start-choice-icon" aria-hidden="true">🎭</span>
          <h2>Un personnage prêt à jouer</h2>
          <p>Répondez à quelques questions, ou choisissez directement parmi 6 personnages déjà prêts pour l'aventure.</p>
          <span class="btn btn-primary">Voir les personnages →</span>
        </button>
      </div>
    `;
    container.querySelector('[data-choice="creer"]').addEventListener('click', startWizard);
    container.querySelector('[data-choice="pregens"]').addEventListener('click', showBrowse);
  }

  function startWizard(){
    const draft = createCharacterShell();
    saveCharacter(draft);
    setActiveId(draft.id);
    renderWizard(container, draft);
  }

  function pregenCardHTML(def){
    return `
    <button type="button" class="pregen-card" data-pregen="${def.id}">
      <div class="pregen-card-media">${imgWithFallback(speciesImage(def.species), def.species, { fallbackEmoji: def.emoji })}</div>
      <div class="pregen-card-body">
        <h3 class="pregen-card-title">${escapeHtml(def.title)}</h3>
        <div class="detail-badges">
          <span class="pill">${escapeHtml(def.species)}</span>
          <span class="pill">${escapeHtml(def.className)}</span>
        </div>
        <p class="pregen-card-pitch">${escapeHtml(def.pitch)}</p>
      </div>
    </button>`;
  }

  function wireBrowseGrid(root){
    root.querySelectorAll('[data-pregen]').forEach(card => {
      card.addEventListener('click', () => showPreview(PREGEN_DEFS.find(d => d.id === card.dataset.pregen)));
    });
  }

  function showBrowse(){
    container.innerHTML = `
      <header class="page-header">
        <button type="button" class="btn btn-ghost btn-sm" id="hub-back">&larr; Retour</button>
        <p class="eyebrow" style="margin-top:.8em;">Personnages prêts à jouer</p>
        <h1 class="page-title">Choisissez votre héros</h1>
        <p class="page-lede">Parcourez la liste, ou laissez-vous guider par un quiz de 4 questions.</p>
      </header>
      <button type="button" class="btn btn-primary" id="hub-quiz-entry" style="margin-bottom:1.6em;">🧭 Pas sûr ? Répondre à 4 questions</button>
      <div class="pregen-grid" id="pregen-grid">${PREGEN_DEFS.map(pregenCardHTML).join('')}</div>
    `;
    container.querySelector('#hub-back').addEventListener('click', showChoice);
    container.querySelector('#hub-quiz-entry').addEventListener('click', () => { quizAnswers = []; quizIndex = 0; showQuiz(); });
    wireBrowseGrid(container.querySelector('#pregen-grid'));
  }

  function showQuiz(){
    const q = QUIZ_QUESTIONS[quizIndex];
    container.innerHTML = `
      <header class="page-header">
        <button type="button" class="btn btn-ghost btn-sm" id="hub-back">&larr; Annuler le quiz</button>
        <p class="eyebrow" style="margin-top:.8em;">Question ${quizIndex + 1} / ${QUIZ_QUESTIONS.length}</p>
        <h1 class="page-title">${escapeHtml(q.question)}</h1>
      </header>
      <div class="quiz-progress">
        ${QUIZ_QUESTIONS.map((_, i) => `<span class="quiz-dot ${i < quizIndex ? 'is-done' : ''} ${i === quizIndex ? 'is-active' : ''}"></span>`).join('')}
      </div>
      <div class="quiz-options">
        ${q.answers.map((a, i) => `<button type="button" class="quiz-option" data-answer="${i}">${escapeHtml(a.label)}</button>`).join('')}
      </div>
    `;
    container.querySelector('#hub-back').addEventListener('click', showBrowse);
    container.querySelectorAll('[data-answer]').forEach(btn => btn.addEventListener('click', () => {
      quizAnswers.push(q.answers[Number(btn.dataset.answer)].tags);
      quizIndex++;
      if(quizIndex >= QUIZ_QUESTIONS.length) showRecommendation();
      else showQuiz();
    }));
  }

  function showRecommendation(){
    const pickedTags = quizAnswers.flat();
    const ranked = scorePregens(quizAnswers, PREGEN_DEFS);
    const top = ranked[0].def;
    const matched = top.tags.filter(t => pickedTags.includes(t)).map(t => TAG_LABELS[t] || t);

    container.innerHTML = `
      <header class="page-header">
        <button type="button" class="btn btn-ghost btn-sm" id="hub-back">&larr; Voir d'autres personnages</button>
        <p class="eyebrow" style="margin-top:.8em;">D'après vos réponses</p>
        <h1 class="page-title">On vous propose ${escapeHtml(top.title)}</h1>
        ${matched.length ? `<p class="page-lede">Parce que vous aimez ${escapeHtml(formatList(matched))}.</p>` : ''}
      </header>
      <div class="pregen-grid" style="max-width:360px;" id="reco-grid">${pregenCardHTML(top)}</div>
    `;
    container.querySelector('#hub-back').addEventListener('click', showBrowse);
    wireBrowseGrid(container.querySelector('#reco-grid'));
  }

  function abilGridHTML(finalAbilities){
    return `<div class="abil-grid">${ABILITIES.map(a => {
      const f = finalAbilities[a.key];
      const mod = Math.floor((f - 10) / 2);
      return `<div class="abil-card frame"><div class="abil-name">${escapeHtml(a.label)}</div><div class="abil-final">${f}</div><div class="abil-breakdown">${mod >= 0 ? '+' : ''}${mod}</div></div>`;
    }).join('')}</div>`;
  }

  function showPreview(def){
    const preview = buildPregenCharacter(def);
    const histo = DATA.historiques.find(h => h.nom === def.background);

    container.innerHTML = `
      <header class="page-header">
        <button type="button" class="btn btn-ghost btn-sm" id="hub-back">&larr; Retour à la liste</button>
      </header>
      <div class="flex-gap" style="align-items:flex-start;margin-bottom:1.2em;">
        <div class="char-avatar" style="width:88px;height:88px;font-size:2.4rem;flex:none;">${imgWithFallback(speciesImage(def.species), def.species, { fallbackEmoji: def.emoji })}</div>
        <div>
          <h1 class="page-title" style="margin-bottom:.2em;">${escapeHtml(def.title)}</h1>
          <div class="detail-badges">
            <span class="pill">${escapeHtml(def.species)}</span>
            <span class="pill">${escapeHtml(def.className)}</span>
            <span class="pill">${escapeHtml(def.background)}</span>
            <span class="pill pill-muted">Don : ${escapeHtml(histo.don)}</span>
          </div>
        </div>
      </div>
      <p class="page-lede">${escapeHtml(def.pitch)}</p>
      ${CLASS_ARCHETYPES[def.className] ? `<p class="page-lede" style="font-size:.92em;">${escapeHtml(CLASS_ARCHETYPES[def.className])}</p>` : ''}

      <div class="divider"></div>
      ${abilGridHTML(preview.abilities)}

      <div class="summary-grid" style="margin-top:1.2em;">
        <div class="summary-block frame">
          <h3>Points de vie</h3>
          <p class="abil-final" style="text-align:left;">${preview.hp.max}</p>
        </div>
        <div class="summary-block frame">
          <h3>Bourse</h3>
          <p class="abil-final" style="text-align:left;">${preview.gold.po} po</p>
        </div>
      </div>

      <p class="field-label" style="margin-top:1.4em;">Inventaire de départ</p>
      <ul class="prose">${preview.inventory.map(it => `<li>${it.qty > 1 ? `${it.qty}× ` : ''}${escapeHtml(it.name)}</li>`).join('')}</ul>

      <p class="field-label">Comment le jouer</p>
      <ul class="tips-list">
        ${def.playTips.map(t => `<li><span class="tips-icon">💡</span><div>${escapeHtml(t)}</div></li>`).join('')}
      </ul>

      ${tip("Rien n'est figé : vous pourrez tout modifier (nom, apparence, équipement…) depuis la fiche de personnage ensuite.")}

      <label class="field-label" for="pregen-name">Nom du personnage</label>
      <input type="text" class="field" id="pregen-name" value="${escapeHtml(def.title)}" style="max-width:420px;margin-bottom:1.4em;">

      <div class="wizard-nav" style="border:none;padding:0;">
        <span class="spacer"></span>
        <button type="button" class="btn btn-primary" id="pregen-confirm">🎲 Jouer ce personnage</button>
      </div>
    `;
    container.querySelector('#hub-back').addEventListener('click', showBrowse);
    container.querySelector('#pregen-confirm').addEventListener('click', () => {
      const name = container.querySelector('#pregen-name').value;
      const character = buildPregenCharacter(def, name);
      saveCharacter(character);
      setActiveId(character.id);
      toast('Personnage créé — prêt à jouer !', { type:'success' });
      navigate('personnage');
    });
  }

  showChoice();
}
