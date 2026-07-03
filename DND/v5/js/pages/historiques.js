import { DATA } from '../data.js';
import { enrichHTML } from '../enrich.js';
import { escapeHtml } from '../utils.js';
import { openModal } from '../modal.js';

export async function renderHistoriques(container, parts){
  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Passés d’aventurier</p>
      <h1 class="page-title">Historiques</h1>
      <p class="page-lede">${DATA.historiques.length} parcours de vie, chacun apportant compétences, outils, un don et un point de départ matériel.</p>
    </header>
    <div class="card-grid" id="histo-grid"></div>
  `;
  const grid = container.querySelector('#histo-grid');
  grid.innerHTML = DATA.historiques.map(h => `
    <button type="button" class="card" data-slug="${h.slug}" style="padding:0;">
      <div class="card-body" style="padding-top:20px;">
        <span style="font-size:1.6rem;" aria-hidden="true">📖</span>
        <h2 class="card-title">${escapeHtml(h.nom)}</h2>
        <div class="card-meta">
          <span class="pill pill-muted">${escapeHtml(h.valeurs_caracteristique.join(' / '))}</span>
        </div>
        <p class="card-desc">${escapeHtml(h.don)}</p>
      </div>
    </button>
  `).join('');

  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const h = DATA.historiques.find(x => x.slug === card.dataset.slug);
      if(h) openHistoDetail(h, card);
    });
  });

  if(parts && parts[0]){
    const h = DATA.historiques.find(x => x.slug === parts[0]);
    if(h) window.setTimeout(() => openHistoDetail(h), 60);
  }
}

function equipChoiceCard(label, choice){
  return `
    <div class="histo-choice">
      <p class="table-title">Option ${label}</p>
      <ul>
        ${choice.items.map(it => `<li>${it.qty > 1 ? `${it.qty}× ` : ''}${escapeHtml(it.name)}</li>`).join('')}
        ${choice.gold ? `<li class="histo-gold">${choice.gold} po</li>` : ''}
      </ul>
    </div>
  `;
}

function openHistoDetail(h, originEl=null){
  openModal({
    eyebrow: 'Historique',
    title: escapeHtml(h.nom),
    originEl,
    build(body){
      body.innerHTML = `
        <div class="detail-badges" style="margin-bottom:1.2em;">
          <span class="pill">Caractéristiques : ${escapeHtml(h.valeurs_caracteristique.join(', '))}</span>
          <span class="pill">Don : ${escapeHtml(h.don)}</span>
        </div>
        <p><strong>Compétences maîtrisées</strong> : ${h.maitriser_competence.map(escapeHtml).join(', ')}</p>
        <p><strong>Maîtrise d’outils</strong> : ${escapeHtml(h.maitrise_outils)}</p>
        <div class="prose" style="margin:1em 0 1.4em;">${enrichHTML(h.description, { isPlainText:true })}</div>
        <p class="table-title">Équipement de départ</p>
        <div class="histo-choices">
          ${equipChoiceCard('A', h._equipA)}
          ${equipChoiceCard('B', h._equipB)}
        </div>
      `;
    }
  });
}
