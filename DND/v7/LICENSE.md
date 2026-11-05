# Licences et sources

## Contenu du System Reference Document 5.2.1

Ce travail inclut du contenu du System Reference Document 5.2.1 (« SRD 5.2.1 ») de Wizards of
the Coast LLC, disponible sur <https://www.dndbeyond.com/srd>. Le SRD 5.2.1 est placé sous
licence Creative Commons Attribution 4.0 International, disponible sur
<https://creativecommons.org/licenses/by/4.0/legalcode>.

*This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards
of the Coast LLC, available at <https://www.dndbeyond.com/srd>. The SRD 5.2.1 is licensed under
the Creative Commons Attribution 4.0 International License, available at
<https://creativecommons.org/licenses/by/4.0/legalcode>.*

Dans `data/*.json`, chaque entrée porte un champ `source` :

| `source`    | Contenu                                                     | Redistribuable |
|-------------|-------------------------------------------------------------|----------------|
| `SRD 5.2.1` | System Reference Document 5.2.1 (CC-BY-4.0)                 | oui, avec l'attribution ci-dessus |
| `PHB 2024`  | Player's Handbook 2024 (sous-classes, dons, historiques, sorts hors SRD) | non |
| `MM 2024`   | Monster Manual 2024 (monstres hors SRD)                     | non |
| `DMG 2024`  | Dungeon Master's Guide 2024 (objets magiques hors SRD)      | non |

Les textes français proviennent des traductions d'[AideDD](https://www.aidedd.org/). Le contenu
hors SRD reste © Wizards of the Coast : il est réservé à un **usage privé** et ne doit pas être
redistribué. Le réglage **Paramètres → Contenu → SRD 5.2.1 uniquement** masque tout ce qui
n'est pas `SRD 5.2.1`. Pour une diffusion publique, il faut retirer le contenu hors SRD des
fichiers de données, pas seulement le masquer.

Répartition actuelle :

| Fichier                 | SRD 5.2.1 | Total |
|-------------------------|----------:|------:|
| sorts                   | 339       | 391   |
| classes + sous-classes  | 24        | 52    |
| dons                    | 10        | 63    |
| historiques             | 4         | 16    |
| espèces                 | 9         | 9     |
| monstres                | 257       | 392   |
| objets magiques         | 40        | 43    |
| armes, armures, outils, matériel, glossaire | tout | — |

La classification est produite par `tools/annotate_sources.py` à partir des listes officielles
anglaises du SRD 5.2.1 (`tools/srd/srd-5.2.1-index.json`, issues de l'API Open5e, document
`srd-2024`).

## Illustrations

Les images de `img/` ne relèvent pas du SRD. Vérifier leurs droits avant toute diffusion.

## Code source

Le code (HTML, CSS, JavaScript, scripts) appartient à son auteur. Aucune licence de
redistribution n'a encore été choisie.

D&D, Dungeons & Dragons et Wizards of the Coast sont des marques de Wizards of the Coast LLC. Ce
projet n'est ni affilié ni approuvé par Wizards of the Coast.
