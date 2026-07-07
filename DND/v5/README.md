# Codex D&D 2024

Compendium interactif des règles *Donjons & Dragons* 2024, en français, avec un créateur
de personnage complet. SPA 100% vanilla (HTML/CSS/JS natifs), sans framework, sans
bundler, entièrement pilotée par les données de `data/*.json`.

## Lancer le projet

Un serveur local est nécessaire : le `fetch()` des fichiers JSON échoue en `file://`
à cause des restrictions CORS des navigateurs.

```bash
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080/`. Aucune installation, aucune dépendance à télécharger
(les seules ressources externes sont les polices Google Fonts, chargées via `<link>`).

## Structure du projet

```
index.html            Coquille de l'application (un seul point d'entrée)
css/style.css          Feuille de style unique — design system complet
manifest.json, sw.js   PWA (installable, cache hors-ligne)
js/
  main.js               Amorçage : chargement des données, routeur, écoute globale
  router.js              Routeur SPA par hash (#route/param1/param2)
  data.js                 Chargement de data/*.json + construction des index dérivés
  enrich.js                Moteur d'enrichissement de texte (liens de glossaire, mots-clés)
  images.js                 Résolution des chemins d'images (espèces, classes, sorts, dégâts)
  class-traits.js           Extraction de données structurées depuis html_traits_table
  equipment.js               Parsing du texte libre d'équipement des historiques
  modal.js, popover.js, toast.js, confirm.js   Système d'overlays
  search.js                  Palette de commandes (Ctrl/Cmd+K)
  theme.js                    Confort de lecture (taille de texte, thème clair/sombre)
  favorites.js                  Favoris (sorts, dons, objets magiques)
  dice.js                       Lanceur de dés
  pages/                          Un module par page (races, classes, sorts, dons, glossaire,
                                    équipements, combat, historiques, carac-competences, accueil,
                                    personnage)
  character/                      Créateur de personnage : wizard, fiche, règles, stockage, avatar
```

Aucune étape de build : chaque fichier `.js` est un module ES natif (`import`/`export`),
chargé depuis un unique `<script type="module" src="js/main.js">` dans `index.html`.

## Notes sur les données

Le développement a révélé quelques écarts entre le format annoncé et le format réel des
données, corrigés à la source plutôt que contournés :

- `species.json` : `sous_especes` est un tableau d'objets `{nom, description}`, pas de
  simples chaînes.
- `dons.json` : deux dons utilisent la même convention de renommage 2024 que les sorts
  (`Ancien|Nouveau`), gérée comme pour `sorts.json`.
- `classes.json` : `html_traits_table` contient déjà l'équipement de départ officiel
  ("Choisissez A ou B : ...") — il est extrait et structuré (`parseStartingEquipmentChoices`)
  plutôt que reconstitué à la main, pour une fidélité maximale aux règles.
- Les descriptions HTML de `classes.json` contiennent des liens `<a>` hérités du site
  d'origine (aidedd.org) : ils sont désamorcés (texte conservé, lien retiré) pour que le
  site reste un SPA autonome sans dépendance externe.

## Choix méthodologiques du créateur de personnage

- **Caractéristiques** : méthode du tableau standard (15/14/13/12/10/8), attribuée
  librement par le joueur. Les bonus de caractéristique proviennent de l'historique
  choisi (règle 2024 : +2/+1 sur deux caractéristiques au choix parmi les trois listées,
  ou +1/+1/+1 sur les trois), pas de l'espèce — conforme aux règles 2024.
- **Équipement de départ des classes** : extrait directement des données (voir plus haut),
  donc fidèle aux règles officielles pour les 12 classes.
- **Emplacements de sorts / sorts connus** : tables de progression standard reconstruites
  à la main (lanceurs complets, demi-lanceurs, magie de pacte de l'occultiste), ces
  tables étant absentes de `data/*.json` mais publiques et stables depuis longtemps.
- **Points de vie** : dé de vie maximal + modificateur de Constitution au niveau 1,
  recalculés si le niveau est modifié depuis la fiche.
- **Multi-personnages** : implémenté (liste, sélection, suppression avec confirmation) —
  ce n'était pas garanti au départ vu l'ampleur du reste, mais le temps l'a permis.
- **Portrait de personnage** : import d'une image locale (recadrée en carré et compressée
  côté client via `<canvas>`, stockée en dataURL), proposé à l'étape Infos de l'assistant
  et modifiable à tout moment depuis l'avatar de la fiche — sans ça le portrait resterait
  figé sur l'illustration générique de l'espèce.
- **Sous-classe au niveau 3** : `classes.json` indique déjà, via le niveau de la capacité
  "Sous-classe de X" (harmonisé à 3 pour les 12 classes en 2024), à quel palier la proposer ;
  la fiche (onglet Traits) affiche alors un sélecteur, puis fusionne les capacités de la
  sous-classe choisie (filtrées par niveau) dans la liste, à la place des entrées génériques
  "Capacité de sous-classe" qui ne servaient que de repère dans les données.
- **Ressources de classe** (Rage, Second souffle, Points de Credo, Points de Sorcellerie,
  Conduit divin) : les valeurs par niveau sont déjà publiées dans `html_capacites_table`
  (mêmes tables que les emplacements de sorts) ; `parseClassResourceColumns` les extrait
  génériquement, et `CLASS_RESOURCE_DEFS` (js/character/rules.js) indique pour chaque classe
  quelle colonne lire et la règle de récupération (repos court, long, ou la règle propre à
  la Rage). Affichées en jetons à cocher, comme les emplacements de sorts.
- **Manœuvres (Maître de guerre) & Métamagie (Ensorceleur)** : la section qui liste ces
  options est référencée dans la description des capacités correspondantes mais absente de
  `classes.json` ; les 20 manœuvres et les 10 options de Métamagie 2024 ont donc été
  reconstituées à la main (texte officiel intégral, même source — aidedd.org — que le reste
  des données), avec un sélecteur limité au nombre connu par niveau et une réserve de dés de
  Supériorité / points de Sorcellerie.
- **Manifestations occultes (Occultiste)** : contrairement aux manœuvres/métamagie ci-dessus,
  la liste complète (nom, prérequis, description) est déjà publiée dans `classes.json`
  (champ `manifestations` de la classe Occultiste) — seul le nombre connu par niveau est lu
  depuis `html_capacites_table` via `parseClassResourceColumns`, comme les autres ressources
  de classe. Sélecteur limité à ce nombre, prérequis affiché au survol.
- **Maîtrise des armes ("Bottes d'arme")** : chaque arme porte déjà sa propriété de botte
  dans `armes.json` ; un personnage d'une classe concernée (Barbare, Guerrier, Paladin,
  Rôdeur, Roublard) choisit ses types d'armes maîtrisés dans l'onglet Traits, et l'onglet
  Actions affiche alors automatiquement l'effet de la botte sur les cartes d'attaque des
  armes équipées correspondantes.

## Au-delà de la parité fonctionnelle

Dix améliorations ont été retenues plutôt que saupoudrées :

1. **PWA installable** (`manifest.json` + `sw.js`) — cache complet du code, des données et
   des pages consultées, pour un usage hors-ligne à la table de jeu.
2. **Recherche globale** (Ctrl/Cmd+K) — traverse sorts, dons, glossaire, équipement,
   classes, races et historiques en une seule frappe.
3. **Confort de lecture** — taille de texte réglable et thème clair "parchemin" en plus
   du thème sombre par défaut, persistés en local.
4. **Favoris** — sur les sorts, les dons et les objets magiques, pour un accès rapide en
   session.
5. **Lanceur de dés** — accessible depuis la page Combat et la fiche de personnage
   (jets de dés génériques, et jets "toucher"/"dégâts" pré-remplis pour chaque arme portée).
6. **Export/impression de la fiche** — une mise en page dédiée à l'impression, indépendante
   de l'interface à onglets.
7. **Mode Découverte** — pensé pour un joueur qui n'a jamais fait de JDR, activable/désactivable
   à tout moment (`js/beginner.js`) : nav et page Combat simplifiées aux règles essentielles,
   encarts explicatifs dans l'assistant de création, et surtout un point d'entrée dédié sur la
   page Personnage (`js/character/start-hub.js`) — soit l'assistant complet, soit 6 personnages
   prêts à jouer (`js/character/pregens.js`), orientés par un quiz de 4 questions
   (`js/character/quiz.js`) qui recoupe les tags des réponses avec ceux des personnages (et
   propose 2 alternatives quand le score ne départage pas clairement un favori). Un suivi de
   progression (jalons "Personnage créé" / "Combat consulté" / "Premier jet de dés",
   persistés en local) donne un retour concret sur l'avancement, via une pastille sur le bouton
   Mode Découverte et une ligne dans le bandeau. Un tutoriel interactif du premier tour de combat
   (`js/pages/combat-tutorial.js`), accessible depuis la page Combat, fait enchaîner action → jet
   d'attaque → dégâts en réutilisant le lanceur de dés, pour un premier geste de jeu avant la
   vraie partie.
8. **Page "Carac. / Compét."** (`js/pages/carac-competences.js` + `carac-competences-content.js`)
   — un onglet "Les bases" qui pose le schéma d20 + modificateur + maîtrise ≥ DD (table des
   modificateurs, Avantage/Désavantage, bonus de maîtrise, DD, oppositions, jets passifs,
   travailler ensemble), un onglet par caractéristique avec sa description en langage simple,
   un exemple de jet sans compétence, une carte dépliable par compétence associée, la liste des
   "autres jets" et des mécaniques que la caractéristique détermine (CA, Initiative, PV,
   capacité de charge, DD de sorts...), et un onglet Sauvegardes. Indexée dans la recherche
   globale (ex. taper "Perception" ouvre directement l'onglet Sagesse).
9. **Capacité de charge & encombrement** (`js/character/rules.js` -> `carryingCapacity`,
   `encumbranceState`) — le poids total de l'inventaire (parsé depuis le champ `poids` du
   compendium) est comparé en continu à Force × 7,5 kg. Au-delà de 2,5× / 5× la valeur de
   Force, le personnage devient Encombré / Fortement encombré : la tuile "Charge" et la barre
   de l'onglet Inventaire se colorent en conséquence, la Vitesse est réduite (-3 m / -6 m, en
   plus de la pénalité d'armure existante), et un bandeau d'alerte rappelle le désavantage aux
   jets de Force/Dextérité/Constitution qui s'ajoute au-delà du second seuil — matérialisé par
   un repère ⚠ sur les blocs Force/Dex/Con des caractéristiques et des jets de sauvegarde (cette
   règle variante du Manuel des Joueurs a été appliquée automatiquement plutôt que laissée
   informative, par choix explicite).
10. **Atelier homebrew** (`js/character/homebrew.js` + `js/pages/homebrew.js`, page "Atelier") —
    création de dons, espèces, classes (y compris des sous-classes de classes existantes) et
    objets personnalisés via des formulaires guidés (avec un encart "Guide de conception" par
    type, rappelant les repères d'équilibrage 2024), sans jamais toucher aux fichiers `data/*.json`
    (stockage `localStorage`). Le contenu créé est fusionné dans les mêmes structures que le
    contenu officiel au démarrage et après chaque création/édition/suppression (`refreshHomebrew()`) :
    il apparaît donc automatiquement dans l'assistant de création (espèces/classes sélectionnables
    comme les 9/12 officielles), sur les pages Races/Classes/Dons/Équipement (repéré par une
    pastille "✨ Homebrew"), dans la recherche globale et les favoris. Une classe homebrew lanceuse
    de sorts réutilise la table de progression (emplacements, sorts disponibles) d'une classe
    officielle au choix plutôt que d'en inventer une nouvelle. Depuis la fiche de personnage,
    l'onglet Inventaire permet de créer un objet personnalisé à la volée, et l'onglet Traits
    propose d'attacher n'importe quel don (officiel ou personnalisé) via une section "Dons acquis".

## Enrichissement du texte

Toutes les descriptions (sorts, dons, capacités de classe, historiques, glossaire, et
même le contenu rédigé à la main de la page Combat) passent par un même moteur
(`js/enrich.js`) qui, sans jamais toucher aux balises HTML :

- résout les références `#identifiant#` du glossaire ;
- détecte et relie automatiquement les termes de glossaire cités en toutes lettres ;
- met en valeur les abréviations connues (BM, CA, DD, JS...) avec une infobulle de
  définition ;
- fait ressortir la notation de dés, les DD et les types de dégâts (avec icône).

Un seul lien par identifiant de glossaire est créé par bloc de texte, pour éviter de
saturer une description longue de liens répétés.

## Limites connues

- Le choix de sous-classe se fait sur la fiche (onglet Traits, via le niveau atteint),
  pas pendant l'assistant de création — un personnage de niveau 1 n'en a pas encore besoin
  selon les règles 2024.
- Les ressources de classe reconstruites couvrent les cas les plus fréquents à table
  (Barbare, Guerrier, Moine, Ensorceleur, Clerc, Paladin) ; les ressources plus situationnelles
  d'autres classes (Forme sauvage du Druide, Ennemi juré du Rôdeur...) ne sont pas encore
  suivies par des jetons dédiés.
- Les tables de sorts connus pour les lanceurs "à sorts connus" (Barde, Ensorceleur,
  Occultiste, Rôdeur) sont des valeurs standard reconstituées ; le nombre de sorts
  préparés pour les autres classes suit la formule officielle (niveau + modificateur).
- Le glossaire fait de son mieux pour détecter les termes cités en toutes lettres dans un
  texte libre ; ce n'est pas un moteur linguistique complet (accords, synonymes).
- Les personnages prêts à jouer du Mode Découverte couvrent 6 classes sur 12 (Guerrier,
  Roublard, Magicien, Clerc, Barbare, Rôdeur) — un choix assumé plutôt qu'un oubli : ce sont
  les 6 archétypes les plus simples à prendre en main pour un tout premier personnage. Les
  6 classes restantes (Barde, Druide, Ensorceleur, Moine, Occultiste, Paladin) restent
  accessibles via l'assistant de création complet.
- Les objets homebrew de l'Atelier restent volontairement simples : pas de dégâts ni de bonus
  de CA chiffrés exploitables dans les jets, seulement des objets d'inventaire décrits (comme le
  matériel et les objets magiques du compendium officiel).
- Une classe homebrew avec une ressource de classe propre (façon Rage/Ki) n'est pas suivie par un
  widget dédié sur la fiche — elle se décrit dans le texte de ses capacités par niveau.
- L'espèce et la classe d'un personnage se choisissent à la création (assistant) et ne sont pas
  modifiables ensuite depuis la fiche — ceci vaut aussi bien pour le contenu officiel que pour le
  contenu homebrew créé après coup.
