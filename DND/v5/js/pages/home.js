import { DATA } from '../data.js';
import { hasActiveCharacter } from '../character/storage.js';

const HUB_CARDS = [
  { route:'races', icon:'i-races', title:'Races', desc:'Neuf espèces jouables, leurs traits et leurs héritages.' },
  { route:'classes', icon:'i-classes', title:'Classes', desc:'Douze voies de héros et leurs sous-classes.' },
  { route:'dons', icon:'i-dons', title:'Dons', desc:'Talents et spécialisations pour façonner votre personnage.' },
  { route:'sorts', icon:'i-sorts', title:'Sorts', desc:'391 formules arcaniques, divines et primordiales.' },
  { route:'equipements', icon:'i-equip', title:'Équipement', desc:'Armes, armures, outils et objets magiques.' },
  { route:'glossaire', icon:'i-glossaire', title:'Glossaire', desc:'Toutes les règles et définitions, à portée de clic.' },
  { route:'combat', icon:'i-combat', title:'Combat', desc:'Le déroulé d’un tour, actions et cas particuliers.' },
  { route:'historiques', icon:'i-histo', title:'Historiques', desc:'Seize passés qui façonnent vos compétences.' },
];

export async function renderHome(container){
  const hasChar = hasActiveCharacter();
  container.innerHTML = `
    <section class="home-hero">
      <p class="eyebrow">Codex D&amp;D 2024 · édition française</p>
      <h1 class="page-title">Le grimoire s’ouvre devant vous</h1>
      <p class="page-lede">Un compendium complet des règles 2024&nbsp;: races, classes, sorts, dons et équipement —
      et un forgeur de personnage pour donner vie à votre héros avant la prochaine session.</p>
      <div class="home-hero-actions">
        <a class="btn btn-primary" href="#personnage">${hasChar ? 'Reprendre mon personnage' : 'Créer mon personnage'}</a>
        <a class="btn btn-ghost" href="#sorts">Parcourir les sorts</a>
      </div>
      <div class="home-stats">
        <div><strong>${DATA.species.length}</strong><span>espèces</span></div>
        <div><strong>${DATA.classes.length}</strong><span>classes</span></div>
        <div><strong>${DATA.sorts.length}</strong><span>sorts</span></div>
        <div><strong>${DATA.dons.length}</strong><span>dons</span></div>
        <div><strong>${DATA.objetsMagiques.length}</strong><span>objets magiques</span></div>
      </div>
    </section>

    <div class="divider"></div>

    <section>
      <h2 class="eyebrow" style="font-size:.8rem;">Explorer le codex</h2>
      <div class="card-grid card-grid-wide home-hub-grid">
        ${HUB_CARDS.map(c => `
          <a class="card hub-card" href="#${c.route}">
            <div class="card-body">
              <svg class="i hub-card-icon"><use href="#${c.icon}"/></svg>
              <h3 class="card-title">${c.title}</h3>
              <p class="card-desc">${c.desc}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}
