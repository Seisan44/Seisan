// Page d'accueil : héros immersif, parcours du débutant, accès rapides au compendium.

import { DATA } from '../data.js';
import { qs, escapeHtml } from '../utils.js';
import { CHAPTERS } from './voie-content.js';
import { progressSummary, MILESTONES } from '../progress.js';
import { listCharacters } from '../character/storage.js';
import { openSearch } from '../search.js';

export function renderHome(view){
  const prog = progressSummary(CHAPTERS.length);
  const chars = listCharacters();
  const started = prog.chapters > 0 || chars.length > 0;

  view.innerHTML = `
    <section class="hero">
      <p class="hero-eyebrow">Donjons &amp; Dragons · 5e édition (règles 2024)</p>
      <h1>Ouvre le Grimoire,<br>deviens la légende.</h1>
      <p class="hero-lede">Ce grimoire accompagne les <em>héros débutants</em> : un guide pas-à-pas pour
      apprendre à jouer, un assistant pour créer ton personnage, et toutes les règles à portée de
      main pour jouer serein à la table.</p>
      <div class="hero-actions">
        <a class="btn btn-gold btn-lg" href="#voie">
          <svg class="icon"><use href="#i-voie"/></svg>
          ${started ? 'Reprendre la Voie de l’Aventurier' : 'Commencer l’aventure'}
        </a>
        <a class="btn btn-primary btn-lg" href="#personnages">
          <svg class="icon"><use href="#i-perso"/></svg>
          ${chars.length ? 'Mes personnages (' + chars.length + ')' : 'Créer mon personnage'}
        </a>
      </div>
      <div class="hero-progress">
        <span>Progression : <b>${prog.chapters}/${prog.totalChapters}</b> chapitres</span>
        <span aria-hidden="true">·</span>
        <span>${prog.milestones.length ? prog.milestones.map(m => m.icon + ' ' + m.label).join(' · ') : 'Jalons à conquérir : ' + MILESTONES.map(m => m.icon).join(' ')}</span>
      </div>
    </section>

    <h2 class="section-title"><svg class="icon"><use href="#i-voie"/></svg>Par où commencer ?</h2>
    <div class="home-grid">
      <a class="home-tile" href="#voie">
        <svg class="icon"><use href="#i-voie"/></svg>
        <span class="home-tile-title">1 · Apprends les bases</span>
        <span class="home-tile-desc">La Voie de l'Aventurier : 7 chapitres courts, des jets de dés à essayer, des quiz pour valider.</span>
        <span class="home-tile-count">≈ 30 minutes</span>
      </a>
      <a class="home-tile" href="#personnages">
        <svg class="icon"><use href="#i-perso"/></svg>
        <span class="home-tile-title">2 · Crée ton héros</span>
        <span class="home-tile-desc">L'assistant guidé enchaîne espèce, classe, historique et caractéristiques — tout est calculé pour toi.</span>
        <span class="home-tile-count">≈ 15 minutes</span>
      </a>
      <a class="home-tile" href="#ecran">
        <svg class="icon"><use href="#i-ecran"/></svg>
        <span class="home-tile-title">3 · Joue à la table</span>
        <span class="home-tile-desc">L'Écran du joueur : ton tour résumé, les actions, les états, l'initiative — et le lanceur de dés partout.</span>
        <span class="home-tile-count">Le jour J</span>
      </a>
    </div>

    <h2 class="section-title"><svg class="icon"><use href="#i-glossaire"/></svg>Explorer le Grimoire</h2>
    <div class="home-grid">
      <a class="home-tile" href="#especes">
        <svg class="icon"><use href="#i-especes"/></svg>
        <span class="home-tile-title">Espèces</span>
        <span class="home-tile-desc">Nains, elfes, drakéides… choisis ton peuple.</span>
        <span class="home-tile-count">${DATA.species.length} espèces illustrées</span>
      </a>
      <a class="home-tile" href="#classes">
        <svg class="icon"><use href="#i-classes"/></svg>
        <span class="home-tile-title">Classes</span>
        <span class="home-tile-desc">Du barbare au magicien, avec leurs sous-classes.</span>
        <span class="home-tile-count">${DATA.classes.length} classes · ${DATA.classes.reduce((n, c) => n + c.subclasses.length, 0)} sous-classes</span>
      </a>
      <a class="home-tile" href="#sorts">
        <svg class="icon"><use href="#i-sorts"/></svg>
        <span class="home-tile-title">Sorts</span>
        <span class="home-tile-desc">Filtres par classe, niveau, école — chaque sort illustré.</span>
        <span class="home-tile-count">${DATA.sorts.length} sorts</span>
      </a>
      <a class="home-tile" href="#dons">
        <svg class="icon"><use href="#i-dons"/></svg>
        <span class="home-tile-title">Dons</span>
        <span class="home-tile-desc">Les talents qui rendent ton héros unique.</span>
        <span class="home-tile-count">${DATA.dons.length} dons</span>
      </a>
      <a class="home-tile" href="#historiques">
        <svg class="icon"><use href="#i-histo"/></svg>
        <span class="home-tile-title">Historiques</span>
        <span class="home-tile-desc">Ta vie d'avant : bonus, don d'origine, équipement.</span>
        <span class="home-tile-count">${DATA.historiques.length} historiques</span>
      </a>
      <a class="home-tile" href="#equipement">
        <svg class="icon"><use href="#i-equip"/></svg>
        <span class="home-tile-title">Équipement</span>
        <span class="home-tile-desc">Armes, armures, outils et objets magiques.</span>
        <span class="home-tile-count">${DATA.armes.armes.reduce((n, g) => n + g.armes.length, 0)} armes · ${DATA.objetsMagiques.length} objets magiques</span>
      </a>
      <a class="home-tile" href="#glossaire">
        <svg class="icon"><use href="#i-glossaire"/></svg>
        <span class="home-tile-title">Glossaire &amp; règles</span>
        <span class="home-tile-desc">Chaque terme du jeu, expliqué et relié.</span>
        <span class="home-tile-count">${DATA.glossaryIndex.size} entrées</span>
      </a>
      <button class="home-tile" type="button" id="home-search">
        <svg class="icon"><use href="#i-search"/></svg>
        <span class="home-tile-title">Tout chercher</span>
        <span class="home-tile-desc">Un sort, une règle, un objet — la palette traverse tout le Grimoire.</span>
        <span class="home-tile-count">Ctrl + K</span>
      </button>
    </div>
  `;

  qs('#home-search', view).addEventListener('click', openSearch);
}
