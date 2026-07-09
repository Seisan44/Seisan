// Page Classes : galerie des 12 classes + fiche détaillée (traits, capacités par
// niveau, sous-classes, lien vers la liste de sorts de la classe).

import { DATA } from '../data.js';
import { el, escapeHtml, qs, qsa } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { classImageLocal, imgWithFallback } from '../images.js';
import { parseClassTraits } from '../class-traits.js';
import { isCasterClass } from '../character/rules.js';
import { navigate } from '../router.js';

const CLASS_TAGLINES = {
  'Barbare': 'La rage comme bouclier, la fureur comme arme.',
  'Barde': 'La magie au bout des doigts, l’histoire au bout des lèvres.',
  'Clerc': 'La foi qui soigne, la foi qui frappe.',
  'Druide': 'La nature entière comme alliée.',
  'Ensorceleur': 'La magie coule dans ses veines.',
  'Guerrier': 'Maître de toutes les armes, simple et redoutable.',
  'Magicien': 'Le savoir est un pouvoir — littéralement.',
  'Moine': 'Le corps est la seule arme nécessaire.',
  'Occultiste': 'Un pacte obscur, des pouvoirs singuliers.',
  'Paladin': 'Un serment sacré, un marteau vengeur.',
  'Rodeur': 'Chasseur des terres sauvages, nulle piste ne lui échappe.',
  'Roublard': 'Une ombre, une lame, une bourse en moins.',
};
// Difficulté de prise en main pour un premier personnage.
const CLASS_LEVEL_EASE = {
  'Guerrier': 'Facile', 'Barbare': 'Facile', 'Roublard': 'Facile', 'Rodeur': 'Facile',
  'Clerc': 'Moyen', 'Paladin': 'Moyen', 'Magicien': 'Moyen', 'Occultiste': 'Moyen',
  'Barde': 'Avancé', 'Druide': 'Avancé', 'Ensorceleur': 'Avancé', 'Moine': 'Moyen',
};

function capacitesByLevel(caps){
  const byLevel = new Map();
  for(const c of caps || []){
    const lvl = parseInt(c.niveau, 10) || 0;
    if(!byLevel.has(lvl)) byLevel.set(lvl, []);
    byLevel.get(lvl).push(c);
  }
  return [...byLevel.entries()].sort((a, b) => a[0] - b[0]);
}

function capaciteAccordion(c, open = false){
  return `<details class="acc" ${open ? 'open' : ''}>
    <summary><span class="acc-level">Niv. ${escapeHtml(c.niveau)}</span>${escapeHtml(c.capacite_name)}<svg class="icon acc-chevron"><use href="#i-chevron"/></svg></summary>
    <div class="acc-body prose">${enrichHTML(c.description_html || '')}</div>
  </details>`;
}

function renderSubclass(container, cls, sub){
  container.innerHTML = `
    <div class="detail-head" style="margin-top:18px">
      <div class="detail-portrait" style="width:min(240px,100%)">${imgWithFallback(classImageLocal(sub.image), sub.classe_title, { fallbackEmoji: '🛡️' })}</div>
      <div class="detail-head-info">
        <h3 style="font-family:var(--font-title);font-size: calc(24px * var(--font-scale));color:var(--gold-bright)">${escapeHtml(sub.classe_title)}</h3>
        <div class="prose" style="margin-top:10px">${enrichHTML(sub.classe_description || '')}</div>
      </div>
    </div>
    ${(sub.capacites || []).map(c => capaciteAccordion(c)).join('')}
  `;
}

function renderDetail(view, cls, subSlug){
  const traits = parseClassTraits(cls.html_traits_table);
  const ease = CLASS_LEVEL_EASE[cls.classe_title] || 'Moyen';
  const caster = isCasterClass(cls.classe_title);

  view.innerHTML = `
    <a class="back-link" href="#classes"><svg class="icon"><use href="#i-back"/></svg> Toutes les classes</a>
    <div class="detail-head">
      <div class="detail-portrait">${imgWithFallback(classImageLocal(cls.image), cls.classe_title, { fallbackEmoji: '🛡️' })}</div>
      <div class="detail-head-info">
        <div class="page-head" style="margin-bottom:14px">
          <p class="page-eyebrow">Classe</p>
          <h1 class="page-title">${escapeHtml(cls.classe_title)}</h1>
          <p class="page-lede"><em>${escapeHtml(CLASS_TAGLINES[cls.classe_title] || '')}</em></p>
        </div>
        <div class="detail-chips">
          <span class="chip chip-gold">Carac. principale : ${escapeHtml(traits.caracteristique || '?')}</span>
          <span class="chip">Dé de vie : d${traits.deVieFaces}</span>
          <span class="chip chip-arcane">Prise en main : ${ease}</span>
          ${caster ? '<span class="chip chip-arcane">Lanceur de sorts</span>' : ''}
        </div>
        <dl class="info-table">
          <dt>Sauvegardes</dt><dd>${escapeHtml(traits.sauvegardes.join(', '))}</dd>
          <dt>Armures</dt><dd>${escapeHtml(traits.armures || '—')}</dd>
          <dt>Armes</dt><dd>${escapeHtml(traits.armes || '—')}</dd>
          <dt>Compétences</dt><dd>${escapeHtml(traits.competences.count)} au choix parmi : ${escapeHtml(traits.competences.options.join(', '))}</dd>
        </dl>
        <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
          ${caster ? `<a class="btn btn-sm" href="#sorts/classe/${encodeURIComponent(cls.classe_title)}"><svg class="icon"><use href="#i-sorts"/></svg> Sorts de ${escapeHtml(cls.classe_title.toLowerCase())}</a>` : ''}
          <a class="btn btn-sm btn-primary" href="#personnages"><svg class="icon"><use href="#i-perso"/></svg> Créer un ${escapeHtml(cls.classe_title.toLowerCase())}</a>
        </div>
      </div>
    </div>

    <details class="acc">
      <summary>Présentation de la classe<svg class="icon acc-chevron"><use href="#i-chevron"/></svg></summary>
      <div class="acc-body prose prose-dropcap">${enrichHTML(cls.classe_description || '')}</div>
    </details>
    <details class="acc">
      <summary>Table des traits et de progression<svg class="icon acc-chevron"><use href="#i-chevron"/></svg></summary>
      <div class="acc-body prose">
        <div class="table-scroll">${enrichHTML(cls.html_traits_table || '')}</div>
        <div class="table-scroll">${enrichHTML(cls.html_capacites_table || '')}</div>
      </div>
    </details>

    <h2 class="section-title"><svg class="icon"><use href="#i-dons"/></svg>Capacités de classe</h2>
    <div id="class-caps"></div>

    <h2 class="section-title"><svg class="icon"><use href="#i-classes"/></svg>Sous-classes <span style="font-size:.7em;color:var(--ink-faint);letter-spacing:0">(choisie au niveau 3)</span></h2>
    <div class="tabs" id="sub-tabs"></div>
    <div id="sub-view"></div>
  `;

  // Capacités groupées par niveau.
  const capsZone = qs('#class-caps', view);
  let capsHTML = '';
  for(const [lvl, caps] of capacitesByLevel(cls.capacites)){
    capsHTML += caps.map(c => capaciteAccordion(c, false)).join('');
  }
  capsZone.innerHTML = capsHTML;

  // Onglets de sous-classes.
  const tabs = qs('#sub-tabs', view);
  const subView = qs('#sub-view', view);
  const subs = cls.subclasses || [];
  const active = subs.find(s => s.slug === subSlug) || subs[0];
  for(const sub of subs){
    const b = el('button', {
      class: `tab ${sub === active ? 'is-active' : ''}`,
      type: 'button',
      text: sub.classe_title,
      onclick: () => navigate('classes', cls.slug, sub.slug),
    });
    tabs.appendChild(b);
  }
  if(active) renderSubclass(subView, cls, active);
  if(subSlug && active?.slug === subSlug){
    subView.scrollIntoView({ block: 'start', behavior: 'instant' });
    window.scrollBy(0, -80);
  }
}

export function renderClasses(view, params){
  const [slug, subSlug] = params;
  if(slug){
    const cls = DATA.classesBySlug.get(slug);
    if(cls) return renderDetail(view, cls, subSlug);
  }

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">Le Grimoire · Chapitre II</p>
      <h1 class="page-title">Les Classes</h1>
      <p class="page-lede">Ta classe définit <em>ce que tu sais faire</em> : ta manière de te battre, tes talents,
      et parfois ta magie. C'est le choix le plus important de ton personnage — le badge indique
      la facilité de prise en main pour une première partie.</p>
    </div>
    <div class="card-grid card-grid-lg" id="class-grid"></div>
  `;

  const grid = view.querySelector('#class-grid');
  for(const cls of DATA.classes){
    const traits = parseClassTraits(cls.html_traits_table);
    const ease = CLASS_LEVEL_EASE[cls.classe_title] || 'Moyen';
    const easeChip = ease === 'Facile' ? 'chip-rituel' : ease === 'Avancé' ? 'chip-conc' : 'chip-gold';
    const card = el('a', { class: 'card is-clickable', href: `#classes/${cls.slug}` });
    card.innerHTML = `
      <div class="card-media">${imgWithFallback(classImageLocal(cls.image), cls.classe_title, { fallbackEmoji: '🛡️' })}</div>
      <div class="card-body">
        <h2 class="card-title">${escapeHtml(cls.classe_title)}</h2>
        <p class="card-desc">${escapeHtml(CLASS_TAGLINES[cls.classe_title] || '')}</p>
        <div class="card-foot">
          <span class="chip">${escapeHtml(traits.caracteristique || '')}</span>
          <span class="chip">d${traits.deVieFaces}</span>
          <span class="chip ${easeChip}">${ease}</span>
          ${isCasterClass(cls.classe_title) ? '<span class="chip chip-arcane">✨ Sorts</span>' : ''}
        </div>
      </div>`;
    grid.appendChild(card);
  }
}
