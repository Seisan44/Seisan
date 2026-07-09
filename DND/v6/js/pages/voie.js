// La Voie de l'Aventurier : parcours pas-à-pas du débutant.
// Sommaire avec progression + vue chapitre (leçons, encarts interactifs, quiz).

import { CHAPTERS } from './voie-content.js';
import { el, escapeHtml, qs, qsa } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { isChapterDone, setChapterDone, chaptersDone, resetChapters } from '../progress.js';
import { navigate } from '../router.js';
import { toast, confirmDialog } from '../ui.js';
import { openDiceTray } from '../dice.js';

function renderSummary(view){
  const done = chaptersDone().filter(id => CHAPTERS.some(c => c.id === id)).length;
  const pct = Math.round((done / CHAPTERS.length) * 100);

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">Guide du débutant</p>
      <h1 class="page-title">La Voie de l'Aventurier</h1>
      <p class="page-lede">Sept chapitres courts pour passer de <em>« c'est quoi un d20 ? »</em> à
      <em>« à mon tour, j'attaque »</em>. Lis dans l'ordre, essaie les jets de dés au fil des pages,
      valide chaque étape — et garde le Grimoire à portée de main à la table.</p>
      <div class="voie-progress-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
        <div class="voie-progress-fill" style="width:${pct}%"></div>
      </div>
      <p class="voie-progress-label">${done} / ${CHAPTERS.length} chapitres terminés ${done === CHAPTERS.length ? '— la Voie est tracée, héros !' : ''}</p>
      ${done > 0 ? `<p style="margin-top:10px"><button class="btn btn-ghost btn-sm" type="button" id="voie-reset">
        <svg class="icon"><use href="#i-trash"/></svg> Réinitialiser toutes les étapes
      </button></p>` : ''}
    </div>
    <div class="chapter-list"></div>
  `;

  qs('#voie-reset', view)?.addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Repartir de zéro ?',
      message: 'Remettre <strong>tous les chapitres</strong> de la Voie à l\'état « à lire » ? Tes personnages et jalons ne sont pas touchés.',
      confirmLabel: 'Tout réinitialiser', danger: true,
    });
    if(ok){
      resetChapters();
      toast('La Voie recommence au premier pas.', { icon: '🥾' });
      renderSummary(view);
    }
  });

  const list = qs('.chapter-list', view);
  CHAPTERS.forEach((ch, i) => {
    const isDone = isChapterDone(ch.id);
    const card = el('a', { class: `chapter-card ${isDone ? 'is-done' : ''}`, href: `#voie/${ch.id}` });
    card.innerHTML = `
      <span class="chapter-num">${isDone ? '✓' : i + 1}</span>
      <span class="chapter-info">
        <span class="chapter-title">${escapeHtml(ch.title)}</span>
        <span class="chapter-desc">${escapeHtml(ch.desc)}</span>
      </span>
      <span class="chapter-status">${isDone ? 'Terminé' : 'Lire'} <svg class="icon" style="width:15px;height:15px"><use href="#i-chevron"/></svg></span>`;
    list.appendChild(card);
  });
}

function tryBoxHTML(t, idx){
  if(t.open){
    return `<div class="try-box">
      <p class="try-box-title">🎲 À toi de jouer</p>
      <p>${escapeHtml(t.label)}</p>
      <button class="btn btn-primary btn-sm" type="button" data-open-dice>Ouvrir le lanceur de dés</button>
    </div>`;
  }
  return `<div class="try-box">
    <p class="try-box-title">🎲 À toi de jouer</p>
    <p>${escapeHtml(t.label)}</p>
    <button class="btn btn-primary btn-sm" type="button" data-roll="${escapeHtml(t.roll)}" data-roll-label="${escapeHtml(t.rollLabel || t.roll)}">Lancer ${escapeHtml(t.roll)}</button>
  </div>`;
}

// Mélange de Fisher-Yates : l'ordre des réponses change à chaque affichage.
function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function quizHTML(quiz){
  if(!quiz?.length) return '';
  return `<div class="panel panel-ornate" id="quiz-zone">
    <h3 style="font-family:var(--font-title);color:var(--gold-bright);margin-bottom:6px">L'épreuve du chapitre</h3>
    <p style="color:var(--ink-dim);margin-bottom:18px">Réponds juste à tout pour marquer le chapitre comme terminé — ou termine-le librement plus bas.</p>
    ${quiz.map((q, qi) => `
      <div class="quiz-q" data-q="${qi}">
        <p><strong>${qi + 1}. ${escapeHtml(q.q)}</strong></p>
        <div class="quiz-options">
          ${shuffle(q.options.map((o, oi) => ({ o, oi }))).map(({ o, oi }) =>
            `<button type="button" class="quiz-option" data-q="${qi}" data-o="${oi}">${escapeHtml(o.t)}</button>`).join('')}
        </div>
        <p class="quiz-feedback" data-feedback="${qi}"></p>
      </div>`).join('')}
  </div>`;
}

function renderChapter(view, ch){
  const idx = CHAPTERS.indexOf(ch);
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];
  const done = isChapterDone(ch.id);

  view.innerHTML = `
    <a class="back-link" href="#voie"><svg class="icon"><use href="#i-back"/></svg> Sommaire de la Voie</a>
    <div class="page-head">
      <p class="page-eyebrow">Chapitre ${idx + 1} sur ${CHAPTERS.length}</p>
      <h1 class="page-title">${escapeHtml(ch.title)}</h1>
      <p class="page-lede">${escapeHtml(ch.desc)}</p>
    </div>
    <div id="lessons"></div>
    ${quizHTML(ch.quiz)}
    <div class="panel" style="margin-top:18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">
      <button class="btn ${done ? 'btn-ghost' : 'btn-gold'}" type="button" id="btn-done">
        <svg class="icon"><use href="#i-check"/></svg>
        ${done ? 'Chapitre terminé — cliquer pour réinitialiser' : 'Marquer le chapitre comme terminé'}
      </button>
      <span style="color:var(--ink-faint);font-style:italic">${done ? 'Bien joué, aventurier.' : ''}</span>
    </div>
    <div class="voie-chapter-nav">
      ${prev ? `<a class="btn btn-ghost" href="#voie/${prev.id}"><svg class="icon"><use href="#i-back"/></svg> ${escapeHtml(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="btn btn-primary" href="#voie/${next.id}">${escapeHtml(next.title)} <svg class="icon"><use href="#i-chevron"/></svg></a>`
             : `<a class="btn btn-gold" href="#personnages">Créer mon personnage <svg class="icon"><use href="#i-chevron"/></svg></a>`}
    </div>
  `;

  // Leçons (HTML enrichi : termes du glossaire cliquables, dés/DD mis en valeur).
  const lessonsZone = qs('#lessons', view);
  for(const lesson of ch.lessons){
    const block = el('section', { class: 'lesson-block' });
    block.innerHTML = `<h3>${escapeHtml(lesson.h)}</h3>
      <div class="prose">${enrichHTML(lesson.html)}</div>
      ${lesson.try ? tryBoxHTML(lesson.try) : ''}
      ${lesson.cta ? `<p style="margin-top:14px"><a class="btn btn-gold" href="${lesson.cta.href}">${escapeHtml(lesson.cta.label)} <svg class="icon"><use href="#i-chevron"/></svg></a></p>` : ''}`;
    lessonsZone.appendChild(block);
  }

  qsa('[data-open-dice]', view).forEach(b => b.addEventListener('click', () => openDiceTray()));

  // Quiz : feedback immédiat ; tout juste => chapitre validé.
  const answered = new Map();
  qsa('.quiz-option', view).forEach(btn => {
    btn.addEventListener('click', () => {
      const qi = Number(btn.dataset.q);
      const oi = Number(btn.dataset.o);
      const question = ch.quiz[qi];
      const option = question.options[oi];
      qsa(`.quiz-option[data-q="${qi}"]`, view).forEach(b => b.classList.remove('is-correct', 'is-wrong'));
      btn.classList.add(option.ok ? 'is-correct' : 'is-wrong');
      const feedback = qs(`[data-feedback="${qi}"]`, view);
      feedback.textContent = option.why;
      answered.set(qi, option.ok);
      if(answered.size === ch.quiz.length && [...answered.values()].every(Boolean) && !isChapterDone(ch.id)){
        setChapterDone(ch.id, true);
        toast('Chapitre validé par l\'épreuve !', { icon: '🏅' });
        const btnDone = qs('#btn-done', view);
        btnDone.classList.remove('btn-gold');
        btnDone.classList.add('btn-ghost');
        btnDone.innerHTML = '<svg class="icon"><use href="#i-check"/></svg> Chapitre terminé — cliquer pour réinitialiser';
      }
    });
  });

  qs('#btn-done', view).addEventListener('click', () => {
    const nowDone = !isChapterDone(ch.id);
    setChapterDone(ch.id, nowDone);
    if(nowDone && next){ toast('Chapitre terminé !', { icon: '✅' }); navigate('voie', next.id); }
    else if(nowDone){ toast('La Voie est achevée. En route, héros !', { icon: '🏆' }); navigate('voie'); }
    else renderChapter(view, ch);
  });
}

export function renderVoie(view, params){
  const [chapterId] = params;
  const ch = CHAPTERS.find(c => c.id === chapterId);
  if(ch) return renderChapter(view, ch);
  renderSummary(view);
}
