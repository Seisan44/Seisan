// Page Mes personnages : liste des héros, création guidée, mode découverte
// (personnages prêts à jouer + quiz d'orientation), accès aux fiches.
// Routes : #personnages | #personnages/creer | #personnages/decouverte | #personnages/fiche/<id>

import { DATA } from '../data.js';
import { el, escapeHtml, qs, qsa } from '../utils.js';
import { speciesThumb, imgWithFallback } from '../images.js';
import { listCharacters, getCharacter, setCurrentCharacterId, saveCharacter, sanitizeImportedCharacter } from '../character/storage.js';
import { startWizard } from '../character/wizard.js';
import { renderSheet } from '../character/sheet.js';
import { PREGEN_DEFS, QUIZ_QUESTIONS, scorePregens, buildPregenCharacter } from '../character/pregens.js';
import { ABILITIES, isCasterClass } from '../character/rules.js';
import { grantMilestone } from '../progress.js';
import { toast, openModal } from '../ui.js';
import { navigate } from '../router.js';

export function renderPersonnages(view, params){
  const [action, id, tab] = params;

  if(action === 'creer') return startWizard(view);
  if(action === 'decouverte') return renderDecouverte(view);
  if(action === 'fiche' && id){
    const ch = getCharacter(id);
    if(ch){
      setCurrentCharacterId(ch.id);
      return renderSheet(view, ch, tab || 'actions');
    }
  }

  const chars = listCharacters().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">À la table</p>
      <h1 class="page-title">Mes personnages</h1>
      <p class="page-lede">Tes héros vivent ici, dans ce navigateur. Crée le tien avec l'assistant guidé —
      <em>aucune connaissance des règles n'est nécessaire</em> — ou adopte un héros
      <strong>prêt à jouer</strong> pour commencer en deux minutes.</p>
    </div>
    <div style="margin-bottom:26px;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <a class="btn btn-gold btn-lg" href="#personnages/creer">
        <svg class="icon"><use href="#i-plus"/></svg> Créer un personnage
      </a>
      <a class="btn btn-primary btn-lg" href="#personnages/decouverte">🎲 Personnage prêt à jouer</a>
      <label class="btn btn-lg" style="cursor:pointer">
        <svg class="icon"><use href="#i-upload"/></svg> Importer (.json)
        <input type="file" id="char-import" accept=".json,application/json" hidden>
      </label>
    </div>
    <div class="card-grid" id="char-grid"></div>
  `;

  // Import d'un personnage exporté depuis le Grimoire (bouton « Exporter » de la fiche).
  qs('#char-import', view).addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    let raw;
    try { raw = JSON.parse(await file.text()); }
    catch { toast('Fichier illisible — ce n\'est pas du JSON valide.', { icon: '⚠️' }); return; }
    const clean = sanitizeImportedCharacter(raw);
    if(!clean){ toast('Ce fichier ne ressemble pas à un personnage du Grimoire.', { icon: '⚠️' }); return; }
    const saved = saveCharacter(clean);
    toast(`${saved.name} rejoint la troupe !`, { icon: '📥' });
    renderPersonnages(view, []);
  });

  const grid = qs('#char-grid', view);
  if(chars.length === 0){
    grid.outerHTML = `<p class="empty-note">Aucun héros pour l'instant. La légende attend son premier nom…<br><br>
    Nouveau dans D&D ? Commence par <a href="#voie">la Voie de l'Aventurier</a>, le chapitre 4 t'amènera ici.
    Pressé de jouer ? <a href="#personnages/decouverte">Adopte un héros prêt à jouer</a>.</p>`;
    return;
  }

  for(const ch of chars){
    const sp = DATA.speciesBySlug.get(ch.species);
    const cls = DATA.classesBySlug.get(ch.classSlug);
    const bg = DATA.historiquesBySlug.get(ch.background);
    const card = el('a', { class: 'card is-clickable', href: `#personnages/fiche/${ch.id}` });
    card.innerHTML = `
      <div class="card-media card-media-square">${ch.portrait
        ? `<img src="${ch.portrait}" alt="" loading="lazy">`
        : imgWithFallback(sp ? speciesThumb(sp.espece) : null, sp?.espece || '', { fallbackEmoji: '🛡️' })}</div>
      <div class="card-body">
        <h2 class="card-title">${escapeHtml(ch.name)}</h2>
        <p class="card-sub">${escapeHtml(sp?.espece || '?')}${ch.subspecies ? ` (${escapeHtml(ch.subspecies)})` : ''} ${escapeHtml(cls?.classe_title.toLowerCase() || '?')} niv. ${ch.level}</p>
        <div class="card-foot">
          <span class="chip">${escapeHtml(bg?.nom || '')}</span>
          <span class="chip chip-gold">PV ${ch.hp?.current ?? '?'}/${ch.hp?.max ?? '?'}</span>
        </div>
      </div>`;
    grid.appendChild(card);
  }
}

/* ------------------------- Mode découverte (pregens) -------------------------
   Six héros complets, à adopter tel quel (nom personnalisable). Pour hésitants :
   un quiz de 4 questions oriente vers le pregen le plus proche du profil. */

function renderDecouverte(view){
  view.innerHTML = `
    <a class="back-link" href="#personnages"><svg class="icon"><use href="#i-back"/></svg> Mes personnages</a>
    <div class="page-head" style="margin-bottom:18px">
      <p class="page-eyebrow">Mode découverte</p>
      <h1 class="page-title" style="font-size: calc(clamp(24px,3.6vw,34px) * var(--font-scale))">Des héros prêts à jouer</h1>
      <p class="page-lede">Envie de jouer <em>tout de suite</em> ? Adopte un héros complet — équipement,
      sorts et compétences déjà réglés selon les règles officielles. Tu apprendras en jouant,
      et tu pourras tout modifier plus tard sur sa fiche.</p>
    </div>
    <div style="margin-bottom:24px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn btn-gold btn-lg" type="button" id="quiz-start">🧭 Aide-moi à choisir — quiz en 4 questions</button>
      <a class="btn btn-lg" href="#personnages/creer">🛠️ Je préfère créer le mien</a>
    </div>
    <div class="pregen-grid">
      ${PREGEN_DEFS.map((p, i) => {
        const cls = DATA.classesBySlug.get(p.classSlug);
        const sp = DATA.speciesBySlug.get(p.species);
        const bg = DATA.historiquesBySlug.get(p.background);
        if(!cls || !sp || !bg) return '';
        return `<button type="button" class="pregen-card" data-pregen="${i}">
          <span class="pregen-emoji" aria-hidden="true">${p.emoji}</span>
          <span class="pregen-title">${escapeHtml(p.title)}</span>
          <span class="pregen-sub">${escapeHtml(sp.espece)} ${escapeHtml(cls.classe_title.toLowerCase())} · ${escapeHtml(bg.nom)}</span>
          <span class="pregen-pitch">${escapeHtml(p.pitch)}</span>
          <span class="pregen-foot">
            ${p.tags.includes('simple') ? '<span class="chip chip-reco">⭐ Facile à jouer</span>' : ''}
            ${isCasterClass(cls.classe_title) ? '<span class="chip chip-arcane">✨ sorts</span>' : '<span class="chip">sans magie à gérer</span>'}
            <span class="chip chip-gold">Découvrir →</span>
          </span>
        </button>`;
      }).join('')}
    </div>
    <div class="beginner-note"><b>Aucun mauvais choix :</b> ces six héros couvrent les grands styles de jeu
    et sont construits exactement comme avec l'assistant. Le badge <span class="chip chip-reco">⭐ Facile à jouer</span>
    signale les plus simples pour une toute première partie.</div>
  `;
  qsa('[data-pregen]', view).forEach(b => b.addEventListener('click', () => openPregenModal(PREGEN_DEFS[Number(b.dataset.pregen)])));
  qs('#quiz-start', view).addEventListener('click', openQuizModal);
}

/** Fiche de présentation d'un pregen : aperçu complet + nom personnalisable + adoption. */
function openPregenModal(def){
  const preview = buildPregenCharacter(def, null);
  if(!preview){ toast('Données introuvables pour ce héros.', { icon: '⚠️' }); return; }
  const cls = DATA.classesBySlug.get(def.classSlug);
  const sp = DATA.speciesBySlug.get(def.species);
  const bg = DATA.historiquesBySlug.get(def.background);
  const spellNames = (slugs) => slugs.map(s => DATA.sortsBySlug.get(s)?._primaryName).filter(Boolean).join(', ');

  const node = el('div');
  node.innerHTML = `
    <p class="pregen-sub" style="margin-top:0">${escapeHtml(sp.espece)}${def.subspecies ? ` (${escapeHtml(def.subspecies)})` : ''}
      ${escapeHtml(cls.classe_title.toLowerCase())} niveau 1 · ${escapeHtml(bg.nom)}</p>
    <p style="color:var(--ink-dim);margin:10px 0">${escapeHtml(def.pitch)}</p>
    <div class="detail-chips" style="margin-top:0">
      <span class="chip chip-gold">❤️ PV ${preview.hp.max}</span>
      ${ABILITIES.map(a => `<span class="chip" title="${a.label}">${a.short} ${preview.abilities[a.key]}</span>`).join('')}
    </div>
    <p style="margin-top:12px"><strong>Compétences :</strong> ${escapeHtml(preview.skills.join(', '))}</p>
    <p style="margin-top:6px"><strong>Équipement :</strong> ${escapeHtml(preview.inventory.map(i => (i.qty > 1 ? i.qty + '× ' : '') + i.name).join(', '))}${preview.gold ? ` — et ${preview.gold} po` : ''}</p>
    ${preview.cantrips.length ? `<p style="margin-top:6px"><strong>Sorts mineurs :</strong> ${escapeHtml(spellNames(preview.cantrips))}</p>` : ''}
    ${preview.spells.length ? `<p style="margin-top:6px"><strong>Sorts préparés :</strong> ${escapeHtml(spellNames(preview.spells))}</p>` : ''}
    <h4 class="carac-sub" style="margin-top:16px">Comment le jouer ?</h4>
    <ul style="margin:6px 0 0 18px;color:var(--ink-dim)">
      ${def.playTips.map(t => `<li style="margin-bottom:5px">${escapeHtml(t)}</li>`).join('')}
    </ul>
    <label class="field-label" for="pg-name" style="margin-top:16px">Son nom <span style="color:var(--ink-faint);font-weight:400">(garde-le ou invente le tien)</span></label>
    <input class="input" id="pg-name" maxlength="60" value="${escapeHtml(def.name)}" autocomplete="off">
    <div class="confirm-actions" style="margin-top:16px">
      <button class="btn btn-ghost" type="button" id="pg-cancel">Retour</button>
      <button class="btn btn-gold" type="button" id="pg-adopt">⚔️ Adopter ce héros</button>
    </div>`;
  const m = openModal({ title: `${def.emoji} ${escapeHtml(def.title)}`, node });

  qs('#pg-cancel', node).addEventListener('click', () => m.close());
  qs('#pg-adopt', node).addEventListener('click', () => {
    const name = qs('#pg-name', node).value.trim() || def.name;
    const saved = saveCharacter(buildPregenCharacter(def, name));
    setCurrentCharacterId(saved.id);
    grantMilestone('personnage-cree');
    m.close();
    toast(`${saved.name} rejoint la légende — bonne première partie !`, { icon: def.emoji });
    navigate('personnages', 'fiche', saved.id);
  });
}

/** Quiz d'orientation : 4 questions, puis le pregen au meilleur score de tags. */
function openQuizModal(){
  const answers = [];
  let i = 0;
  const node = el('div');
  const m = openModal({ title: '🧭 Quel héros pour toi ?', node, className: 'modal-sm' });

  const draw = () => {
    if(i < QUIZ_QUESTIONS.length){
      const q = QUIZ_QUESTIONS[i];
      node.innerHTML = `
        <div class="quiz-progress" aria-label="Question ${i + 1} sur ${QUIZ_QUESTIONS.length}">
          ${QUIZ_QUESTIONS.map((_, j) => `<span class="quiz-dot ${j < i ? 'is-done' : ''}"></span>`).join('')}
        </div>
        <h3 style="font-family:var(--font-title);font-size: calc(18px * var(--font-scale));margin-bottom:14px">${escapeHtml(q.question)}</h3>
        <div class="quiz-answers">
          ${q.answers.map((a, k) => `<button type="button" class="quiz-answer" data-a="${k}">${escapeHtml(a.label)}</button>`).join('')}
        </div>
        ${i > 0 ? '<button class="btn btn-ghost btn-sm" type="button" id="quiz-back" style="margin-top:14px">← Question précédente</button>' : ''}`;
      qsa('[data-a]', node).forEach(b => b.addEventListener('click', () => {
        answers[i] = q.answers[Number(b.dataset.a)].tags;
        i++;
        draw();
      }));
      qs('#quiz-back', node)?.addEventListener('click', () => { i--; answers.length = i; draw(); });
      return;
    }

    const ranked = scorePregens(answers);
    const best = ranked[0].def;
    const second = ranked[1]?.def;
    const cls = DATA.classesBySlug.get(best.classSlug);
    const sp = DATA.speciesBySlug.get(best.species);
    node.innerHTML = `
      <p style="color:var(--ink-dim);margin-bottom:12px">Ton profil d'aventurier correspond à…</p>
      <div class="pregen-card" style="cursor:default">
        <span class="pregen-emoji" aria-hidden="true">${best.emoji}</span>
        <span class="pregen-title">${escapeHtml(best.title)}</span>
        <span class="pregen-sub">${escapeHtml(sp?.espece || '')} ${escapeHtml(cls?.classe_title.toLowerCase() || '')}</span>
        <span class="pregen-pitch">${escapeHtml(best.pitch)}</span>
      </div>
      ${second ? `<p style="color:var(--ink-faint);font-size: calc(13.5px * var(--font-scale));margin-top:10px">Autre bonne pioche :
        <button type="button" class="chip chip-clickable" id="quiz-second">${second.emoji} ${escapeHtml(second.title)}</button></p>` : ''}
      <div class="confirm-actions" style="margin-top:16px">
        <button class="btn btn-ghost" type="button" id="quiz-redo">↻ Refaire le quiz</button>
        <button class="btn btn-gold" type="button" id="quiz-pick">Découvrir ${escapeHtml(best.name)} ✦</button>
      </div>`;
    qs('#quiz-pick', node).addEventListener('click', () => { m.close(); openPregenModal(best); });
    qs('#quiz-second', node)?.addEventListener('click', () => { m.close(); openPregenModal(second); });
    qs('#quiz-redo', node).addEventListener('click', () => { i = 0; answers.length = 0; draw(); });
  };
  draw();
}
