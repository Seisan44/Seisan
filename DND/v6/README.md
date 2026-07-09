# Le Grimoire de Seisan

Compagnon web des joueurs **débutants** de *Donjons & Dragons 5e édition* (règles 2024, en
français). SPA 100 % vanilla — HTML, CSS et JavaScript natifs, sans framework ni build —
entièrement pilotée par les données locales de `data/*.json` et les illustrations de `img/`.

L'objectif : qu'un joueur qui n'a jamais ouvert un livre de règles puisse **se guider pas à
pas** (apprendre → créer son personnage → jouer) et garder le Grimoire ouvert à la table
comme aide de jeu permanente.

## Lancer le site

Un serveur local est nécessaire (le `fetch()` des JSON échoue en `file://`) :

```bash
python3 -m http.server 8080
```

Puis ouvrir <http://localhost:8080/>. Aucune installation, aucune dépendance (seules les
polices Google Fonts sont chargées en externe, avec repli serif natif).

## Ce que contient le Grimoire

### Pour débuter
- **La Voie de l'Aventurier** — un parcours pédagogique en 7 chapitres (qu'est-ce que D&D,
  le d20, les caractéristiques, la création de personnage, le combat, la magie, la vie à la
  table), avec des encarts « À toi de jouer » qui déclenchent de vrais jets de dés, un
  mini-quiz de validation par chapitre et une progression persistée en local.
- **L'assistant de création de personnage** — 8 étapes guidées (espèce → classe → historique
  → caractéristiques → compétences → équipement → sorts → nom), avec des conseils de débutant
  à chaque étape. Les règles chiffrées (traits de classe, équipement de départ officiel,
  tables d'incantation) sont extraites de `classes.json`, jamais recodées à la main.

### Le compendium
- **Espèces** (9, illustrées), **Classes** (12 + 44 sous-classes, illustrées, avec capacités
  par niveau et tables officielles), **Sorts** (391, illustrés, filtres par classe / niveau /
  école / concentration / rituel), **Dons** (63, groupés par type), **Historiques** (16),
  **Équipement** (armes, armures, outils, matériel, objets magiques), **Glossaire** complet
  (mécaniques, actions, états, abréviations).
- **Enrichissement de texte** : dans toutes les descriptions, les termes de règles deviennent
  cliquables (popover de définition), les dés `2d6`, les `DD` et les types de dégâts (avec
  icône) sont mis en valeur, les sorts cités ouvrent leur fiche.

### À la table
- **Fiche de personnage** — PV suivis, CA/vitesse/initiative calculées, jets pré-remplis
  (un clic sur une compétence, une sauvegarde ou une attaque lance le d20 avec le bon bonus),
  emplacements de sorts en jetons, inventaire avec équipement, repos long, impression,
  multi-personnages (stockage local).
- **Écran du joueur** — résumé du tour, aide-mémoire attaque / 0 PV / repos, les 12 actions
  officielles, les 15 états, et un **suivi d'initiative** persistant.
- **Lanceur de dés** — accessible partout (bouton d'en-tête), d4 → d100, formules libres
  (`2d6+3`), avantage/désavantage, historique des jets, détection des critiques.
- **Recherche globale** (`Ctrl+K`) — traverse sorts, classes, espèces, dons, historiques,
  équipement, glossaire et pages du guide.
- **Confort** — thème « nuit arcanique » / « parchemin », taille de texte réglable, persistés.

## Structure

```
index.html          Coquille de l'application (sprite SVG, nav, chargeur)
css/style.css       Design system complet (thèmes, composants, impression, responsive)
js/
  main.js           Amorçage : données, routes, écouteurs globaux
  data.js           Chargement de data/*.json + index dérivés (recherche, sorts par classe…)
  router.js         Routeur SPA par hash (#route/param)
  enrich.js         Moteur d'enrichissement des textes de règles
  class-traits.js   Extraction des tables HTML de classes.json (traits, équipement, sorts)
  images.js         Résolution des chemins d'images locales (+ corrections de slugs)
  ui.js             Modale, popover, toast, confirmation
  dice.js           Lanceur de dés
  search.js         Palette de recherche (Ctrl+K)
  theme.js          Thèmes et taille de texte
  progress.js       Progression du débutant (chapitres, jalons)
  utils.js          Utilitaires (DOM, slug, storage…)
  pages/            Un module par page (accueil, voie, especes, classes, sorts, dons,
                    historiques, equipement, glossaire, ecran, personnages)
  character/        rules.js (règles 2024), wizard.js (assistant), sheet.js (fiche),
                    storage.js (multi-personnages)
```

## Notes de conception

- **Fidélité aux données** : la caractéristique principale, le dé de vie, les sauvegardes,
  les compétences au choix, l'équipement de départ « (A)… ou (B)… » et les tables
  d'incantation par niveau sont *parsés* depuis `html_traits_table` / `html_capacites_table`
  de `classes.json` — la source officielle embarquée — plutôt que redéfinis à la main.
- **Règles 2024** : bonus de caractéristiques portés par l'historique (+2/+1 ou +1/+1/+1),
  tableau standard (15/14/13/12/10/8), PV niveau 1 = dé de vie max + Con, CA selon la
  formule de l'armure équipée (+2 bouclier), pénalité de vitesse si la Force est
  insuffisante pour l'armure.
- **Deux sorts** (« Convocations instantanées de Drawmij », « Résurrection ») n'ont pas
  d'illustration dans `img/sorts/` : un repli élégant ✦ s'affiche, aucune image cassée.
- Tout l'état utilisateur (thème, progression, personnages, initiative) vit dans
  `localStorage` — rien ne quitte le navigateur.
