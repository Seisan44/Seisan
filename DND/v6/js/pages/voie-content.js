// Contenu de « La Voie de l'Aventurier » : le parcours pas-à-pas du joueur débutant.
// Les leçons sont volontairement courtes (l'essentiel se raconte à l'oral, à la table) ;
// l'épreuve du chapitre — le quiz — fait le vrai travail de vérification.
// Les réponses sont mélangées à chaque affichage (voir voie.js).

export const CHAPTERS = [
  {
    id: 'bienvenue',
    title: 'Bienvenue à la table',
    desc: 'Ce qu’est D&D, qui fait quoi, et comment se déroule une partie.',
    lessons: [
      {
        h: 'Un jeu de récit… avec des dés',
        html: `<p><strong>D&D</strong> se joue comme une conversation : le <strong>Maître du Jeu (MJ)</strong>
        décrit le monde et joue les monstres ; toi, tu incarnes <strong>un héros</strong> et tu dis ce
        qu'il tente de faire. Les dés décident si ça réussit. Ni gagnant, ni perdant : on gagne quand
        l'histoire est mémorable.</p>
        <div class="flavor">« Vous poussez la porte de la taverne… et toutes les conversations s'arrêtent.
        Que faites-vous ? »</div>`,
      },
      {
        h: 'Le matériel',
        html: `<ul>
        <li><strong>Un personnage</strong> — ce Grimoire le crée avec toi (chapitre 4).</li>
        <li><strong>Des dés</strong> — « d » + nombre de faces : un <strong>d20</strong> a 20 faces,
        « 2d6 » = deux dés à 6 faces additionnés.</li>
        <li><strong>De l'imagination</strong> — la seule chose qu'on ne peut pas te prêter.</li>
        </ul>`,
        try: { label: 'Lance ton tout premier d20 !', roll: '1d20', rollLabel: 'Mon premier d20' },
      },
      {
        h: 'Ton seul travail',
        html: `<ol>
        <li><strong>Décris ton intention</strong> : « j'escalade le mur », « je convaincs le garde ».</li>
        <li><strong>Le MJ te dit quoi lancer</strong> — en général un d20 + un bonus de ta fiche.</li>
        <li>Perdu en pleine partie ? <kbd>Ctrl</kbd>+<kbd>K</kbd> retrouve n'importe quelle règle.</li>
        </ol>`,
      },
    ],
    quiz: [
      {
        q: 'Que fait le Maître du Jeu (MJ) ?',
        options: [
          { t: 'Il décrit le monde et joue tous ceux qui ne sont pas les héros', ok: true, why: 'Exactement. Le MJ est le narrateur et l\'arbitre — pas ton adversaire.' },
          { t: 'Il joue contre les autres joueurs pour les éliminer', ok: false, why: 'Non : le MJ met en scène l\'histoire. Tout le monde joue ensemble.' },
          { t: 'Il compte les points pour désigner un vainqueur', ok: false, why: 'Il n\'y a pas de points ni de vainqueur à D&D.' },
        ],
      },
      {
        q: 'Que signifie « 2d6 » ?',
        options: [
          { t: 'Lancer deux dés à 6 faces et additionner', ok: true, why: 'Oui ! Le premier chiffre = nombre de dés, le second = nombre de faces.' },
          { t: 'Lancer un dé à 26 faces', ok: false, why: 'Non — 2d6, c\'est deux dés à six faces.' },
          { t: 'Lancer un dé à 6 faces deux fois en gardant le meilleur', ok: false, why: 'Ça, c\'est plutôt le principe de l\'Avantage… avec un d20 (chapitre 2 !).' },
        ],
      },
      {
        q: 'Comment gagne-t-on une partie de D&D ?',
        options: [
          { t: 'On ne « gagne » pas : on vit une bonne histoire ensemble', ok: true, why: 'C\'est ça. Pas de vainqueur — des souvenirs de table.' },
          { t: 'En tuant plus de monstres que les autres joueurs', ok: false, why: 'Les héros jouent ensemble, pas les uns contre les autres.' },
          { t: 'En finissant la campagne avant le MJ', ok: false, why: 'Le MJ n\'est pas un adversaire à battre — il raconte avec vous.' },
        ],
      },
      {
        q: 'À ton tour de parler, que dis-tu au MJ ?',
        options: [
          { t: 'Ce que mon personnage tente de faire, simplement', ok: true, why: 'Oui : décris l\'intention, le MJ te dira s\'il faut lancer un dé.' },
          { t: 'La page exacte de la règle que j\'applique', ok: false, why: 'Aucune règle à réciter — décris, le MJ gère.' },
          { t: 'Rien : seul le MJ a le droit de parler', ok: false, why: 'Au contraire, la partie EST la conversation.' },
        ],
      },
      {
        q: 'Quel dé est le plus utilisé du jeu ?',
        options: [
          { t: 'Le d20', ok: true, why: 'Le d20 résout presque tout : attaques, compétences, sauvegardes.' },
          { t: 'Le d6', ok: false, why: 'Le d6 sert surtout aux dégâts — le d20 résout les actions.' },
          { t: 'Le d100', ok: false, why: 'Rare ! C\'est le d20 qui fait tourner le jeu.' },
        ],
      },
    ],
  },

  {
    id: 'd20',
    title: 'Le d20, ton meilleur allié',
    desc: 'La règle d’or : d20 + modificateur contre un DD. Avantage, désavantage, critiques.',
    lessons: [
      {
        h: 'La règle d’or du jeu',
        html: `<p style="text-align:center;font-family:var(--font-title);font-size:1.25em">
        <span class="kw-dice">d20</span> + <strong>modificateur</strong> &nbsp;≥&nbsp; <span class="kw-dc">DD</span> ?
        </p>
        <ul>
        <li>Le <strong>modificateur</strong> est écrit sur ta fiche.</li>
        <li>Le <strong>DD</strong> est fixé par le MJ : 10 facile, 15 délicat, 20 héroïque.</li>
        <li><strong>Atteindre ou dépasser</strong> = réussite (égalité = réussite !).</li>
        <li>Contre une créature : atteindre sa <strong>CA</strong> pour toucher.</li>
        </ul>`,
        try: { label: '« Escalader la falaise, DD 15 ». Ton héros a +3 en Athlétisme. Lance !', roll: '1d20+3', rollLabel: 'Escalade (DD 15)' },
      },
      {
        h: 'Avantage et désavantage',
        html: `<p><strong>Avantage</strong> (la situation t'aide) : deux d20, garde le <strong>meilleur</strong>.
        <strong>Désavantage</strong> (elle te dessert) : deux d20, garde le <strong>pire</strong>.
        Jamais cumulé — et si tu as les deux, ils s'annulent.</p>`,
        try: { label: 'Essaie un jet avec Avantage depuis le lanceur de dés (bouton dédié).', open: true },
      },
      {
        h: 'Le 20 naturel (et le 1…)',
        html: `<p>Sur un jet d'attaque : <strong>20 naturel</strong> = touche toujours + <strong>coup
        critique</strong> (double les dés de dégâts). <strong>1 naturel</strong> = raté, peu importe les bonus.</p>`,
      },
    ],
    quiz: [
      {
        q: 'Ton total (d20 + modificateur) égale exactement le DD. Que se passe-t-il ?',
        options: [
          { t: 'C’est une réussite', ok: true, why: 'Oui : atteindre le DD suffit. « Égalité = réussite ».' },
          { t: 'C’est un échec', ok: false, why: 'Non — il faut atteindre OU dépasser le DD. Égalité = réussite.' },
          { t: 'On relance le dé', ok: false, why: 'Pas de relance : égalité = réussite, c\'est tout.' },
        ],
      },
      {
        q: 'Avec l’Avantage, tu lances 12 et 7. Quel résultat gardes-tu ?',
        options: [
          { t: '12', ok: true, why: 'Avantage = deux d20, on garde le meilleur.' },
          { t: '7', ok: false, why: 'Garder le pire, c\'est le Désavantage.' },
          { t: '19 (la somme)', ok: false, why: 'On n\'additionne jamais les deux d20 — on en garde un seul.' },
        ],
      },
      {
        q: 'Sur un jet d’attaque, le dé montre 20. Que se passe-t-il ?',
        options: [
          { t: 'Touché automatique + coup critique : dés de dégâts doublés', ok: true, why: 'Le fameux 20 naturel — le moment préféré de toute table.' },
          { t: 'Rien de spécial si le total ne dépasse pas la CA', ok: false, why: 'Le 20 naturel touche TOUJOURS, quelle que soit la CA.' },
          { t: 'Je rejoue immédiatement un second tour', ok: false, why: 'Pas de tour bonus — mais des dégâts doublés, c\'est déjà beau.' },
        ],
      }
    ],
  },

  {
    id: 'caracteristiques',
    title: 'Ton héros en six caractéristiques',
    desc: 'Force, Dextérité, Constitution, Intelligence, Sagesse, Charisme — et les compétences.',
    lessons: [
      {
        h: 'Les six piliers',
        html: `<ul>
        <li><strong>Force</strong> — frapper, soulever · <strong>Dextérité</strong> — esquiver, viser ·
        <strong>Constitution</strong> — encaisser</li>
        <li><strong>Intelligence</strong> — savoir · <strong>Sagesse</strong> — percevoir ·
        <strong>Charisme</strong> — convaincre</li>
        </ul>
        <p>Ce qui compte en jeu, c'est le <strong>modificateur</strong> — lui seul s'ajoute au d20 :</p>
        <div class="table-scroll"><table class="core">
        <tr><th>Valeur</th><td>8–9</td><td>10–11</td><td>12–13</td><td>14–15</td><td>16–17</td><td>18–19</td></tr>
        <tr><th>Modificateur</th><td>−1</td><td>+0</td><td>+1</td><td>+2</td><td>+3</td><td>+4</td></tr>
        </table></div>`,
      },
      {
        h: 'Compétences et maîtrise',
        html: `<p>Chaque compétence dépend d'une caractéristique : Athlétisme (For), Discrétion (Dex),
        Perception (Sag)… Si ton héros <strong>maîtrise</strong> la compétence, ajoute aussi son
        <strong>bonus de maîtrise</strong> : <strong>+2 au niveau 1</strong>. Ta fiche affiche les totaux
        déjà calculés.</p>`,
        try: { label: 'Ton roublard (Discrétion +5) se glisse derrière le garde. DD 13. Lance !', roll: '1d20+5', rollLabel: 'Discrétion (DD 13)' },
      },
      {
        h: 'Les jets de sauvegarde',
        html: `<p>Quand le danger te tombe dessus (souffle de dragon, sort de charme…), c'est un
        <strong>jet de sauvegarde</strong> : d20 + la caractéristique demandée. Réflexe : Dextérité pour
        esquiver, Constitution pour encaisser, Sagesse pour l'esprit.</p>`,
      },
    ],
    quiz: [
      {
        q: 'Ta Dextérité est de 16. Quel est ton modificateur ?',
        options: [
          { t: '+3', ok: true, why: '(16 − 10) ÷ 2 = 3. C\'est ce +3 qu\'on ajoute au d20.' },
          { t: '+16', ok: false, why: 'On n\'ajoute jamais la valeur brute — seulement le modificateur (+3 ici).' },
          { t: '+6', ok: false, why: 'Presque : c\'est (16 − 10) ÷ 2 = +3.' },
        ],
      },
      {
        q: 'Une trappe s’ouvre sous tes pieds ! Quel jet de sauvegarde, logiquement ?',
        options: [
          { t: 'Dextérité — pour sauter de côté', ok: true, why: 'Oui : Dextérité = esquiver, réagir vite.' },
          { t: 'Charisme — pour supplier la trappe', ok: false, why: 'Aussi élégant soit ton personnage, la trappe reste de marbre.' },
          { t: 'Intelligence — pour comprendre le mécanisme', ok: false, why: 'Trop tard pour réfléchir : il faut esquiver (Dextérité) !' },
        ],
      },
      {
        q: 'Ton bonus de maîtrise au niveau 1 est de…',
        options: [
          { t: '+2', ok: true, why: 'Oui, +2 — il grimpera avec les niveaux (+3 au niveau 5…).' },
          { t: '+5', ok: false, why: '+2 au niveau 1. Le +5 n\'arrive qu\'au niveau 13 !' },
          { t: '+1', ok: false, why: 'C\'est +2 dès le niveau 1.' },
        ],
      },
      {
        q: 'Convaincre un garde de te laisser passer, c’est un jet de…',
        options: [
          { t: 'Charisme (Persuasion)', ok: true, why: 'Le Charisme gouverne la parole : Persuasion, Tromperie, Intimidation.' },
          { t: 'Force (Athlétisme)', ok: false, why: 'Seulement si tu comptes le déplacer toi-même…' },
          { t: 'Intelligence (Histoire)', ok: false, why: 'Connaître la généalogie du garde ne l\'attendrira pas. Charisme !' },
        ],
      },
      {
        q: 'Remarquer un bruit suspect derrière la porte, c’est…',
        options: [
          { t: 'La Perception (Sagesse)', ok: true, why: 'Perception = les sens en éveil, gouvernée par la Sagesse.' },
          { t: 'L’Investigation (Intelligence)', ok: false, why: 'Investigation = déduire en examinant. Entendre, c\'est Perception.' },
          { t: 'L’Acrobatie (Dextérité)', ok: false, why: 'Les acrobaties n\'aiguisent pas l\'ouïe. Perception (Sagesse) !' },
        ],
      },
    ],
  },
  {
    id: 'combat',
    title: 'Le combat, tour par tour',
    desc: 'Initiative, ton tour (déplacement + action), attaques, dégâts et chute à 0 PV.',
    lessons: [
      {
        h: 'L’initiative : qui joue quand ?',
        html: `<p>Le combat éclate → chacun lance <strong>d20 + Dextérité</strong> : l'<strong>Initiative</strong>.
        On joue dans l'ordre décroissant, round après round (1 round ≈ 6 secondes).
        L'<a href="#ecran">Écran du joueur</a> a un suivi d'initiative intégré.</p>`,
        try: { label: 'Lance ton initiative (Dex +2) !', roll: '1d20+2', rollLabel: 'Initiative' },
      },
      {
        h: 'Ton tour : trois ressources',
        html: `<ul>
        <li><strong>Déplacement</strong> — 9 m en général, avant et/ou après l'action.</li>
        <li><strong>Une action</strong> — Attaque, Magie, Pointe, Désengagement, Esquive, Aide…</li>
        <li><strong>Action bonus</strong> — <em>seulement</em> si une capacité te la donne.</li>
        </ul>
        <p>Hors de ton tour : <strong>1 Réaction</strong> par round. Le réflexe qui sauve :
        <em>« je me déplace, j'attaque »</em>.</p>`,
      },
      {
        h: 'Attaquer : deux jets',
        html: `<ol>
        <li><strong>Attaque</strong> : d20 + carac. + maîtrise ≥ CA de la cible ?</li>
        <li><strong>Dégâts</strong> : dé de l'arme + la même caractéristique.</li>
        </ol>
        <p><strong>20 naturel</strong> = critique : double les dés de dégâts !</p>`,
        try: { label: 'Le gobelin a une CA de 13. Attaque à l’épée (+5), puis dégâts (1d8+3) si tu touches !', roll: '1d20+5', rollLabel: 'Attaque épée (CA 13)' },
      },
      {
        h: 'Tomber à 0 PV (et se relever)',
        html: `<p>À 0 PV : <strong>Inconscient</strong>, pas mort. À chaque tour, un d20 sans bonus —
        le <strong>jet contre la mort</strong> : 10+ réussite, 9− échec. Trois réussites = stable ;
        trois échecs = mort. 20 naturel : debout avec 1 PV ! Le moindre soin te relève.</p>`,
      },
    ],
    quiz: [
      {
        q: 'À ton tour, que peux-tu faire au minimum ?',
        options: [
          { t: 'Me déplacer ET faire une action', ok: true, why: 'Oui, les deux — dans l\'ordre que tu veux, déplacement fractionnable.' },
          { t: 'Me déplacer OU faire une action, pas les deux', ok: false, why: 'Bonne nouvelle : tu as droit aux deux à chaque tour !' },
          { t: 'Une action Bonus obligatoire', ok: false, why: 'L\'action Bonus n\'existe que si une capacité te la donne.' },
        ],
      },
      {
        q: 'Ton attaque (+5) donne 14 au total. La CA du gobelin est 13. Résultat ?',
        options: [
          { t: 'Touché — je lance les dégâts', ok: true, why: '14 ≥ 13 : touché ! On lance maintenant les dégâts de l\'arme.' },
          { t: 'Raté — il fallait dépasser strictement', ok: false, why: 'Égaler ou dépasser suffit… et là tu dépasses même d\'un point.' },
          { t: 'Le gobelin riposte automatiquement', ok: false, why: 'Non, il attendra son propre tour dans l\'ordre d\'initiative.' },
        ],
      },
      {
        q: 'L’initiative se lance avec…',
        options: [
          { t: 'd20 + modificateur de Dextérité', ok: true, why: 'Les plus vifs frappent en premier.' },
          { t: 'd20 + modificateur de Force', ok: false, why: 'La rapidité, c\'est la Dextérité — pas les muscles.' },
          { t: 'Un simple d6', ok: false, why: 'Comme presque tout : le d20 (+ Dex ici).' },
        ],
      },
      {
        q: 'Tu tombes à 0 PV. Que se passe-t-il ?',
        options: [
          { t: 'Je suis Inconscient et je fais des jets contre la mort', ok: true, why: 'Exact. Trois réussites = stable, trois échecs = mort. Un soin te relève immédiatement.' },
          { t: 'Mon personnage meurt immédiatement', ok: false, why: 'Non ! À 0 PV on lutte encore — c\'est tout l\'enjeu des jets contre la mort.' },
          { t: 'Je rejoue normalement avec un malus', ok: false, why: 'À 0 PV, tu es Inconscient : impossible d\'agir tant qu\'on ne te soigne pas.' },
        ],
      },
      {
        q: 'Combien de Réactions as-tu par round ?',
        options: [
          { t: 'Une seule', ok: true, why: 'Une par round — dépense-la bien (attaque d\'Opportunité, Protection…).' },
          { t: 'Autant que je veux', ok: false, why: 'Une seule ! Elle revient au début de ton tour suivant.' },
          { t: 'Aucune : les réactions sont réservées au MJ', ok: false, why: 'Tout le monde a sa Réaction — une par round.' },
        ],
      },
      {
        q: 'Un ennemi s’enfuit de ta portée de mêlée sans précaution. Tu peux…',
        options: [
          { t: 'Faire une attaque d’Opportunité (ta Réaction)', ok: true, why: 'Le classique ! Sauf s\'il prend l\'action Désengagement.' },
          { t: 'Rien : ce n’est pas ton tour', ok: false, why: 'Justement si — c\'est ça, une Réaction.' },
          { t: 'Rejouer un tour complet', ok: false, why: 'Juste une attaque de Réaction — pas un tour entier.' },
        ],
      },
    ],
  },

  {
    id: 'magie',
    title: 'La magie, sans migraine',
    desc: 'Sorts mineurs, emplacements de sorts, concentration et rituels.',
    lessons: [
      {
        h: 'Deux carburants',
        html: `<ul>
        <li><strong>Sorts mineurs</strong> (niveau 0) — <em>à volonté</em>, sans limite. Ton attaque
        magique de base.</li>
        <li><strong>Emplacements de sorts</strong> — pour les sorts de niveau 1+. Chaque sort lancé en
        consomme un ; le repos long les restaure. Lancé avec un emplacement plus haut, un sort devient
        souvent plus puissant (« À plus haut niveau »).</li>
        </ul>`,
      },
      {
        h: 'Toucher ou faire sauvegarder',
        html: `<ul>
        <li><strong>Attaque de sort</strong> — d20 + carac. magique + maîtrise, contre la CA.</li>
        <li><strong>Sauvegarde</strong> — la cible lance contre ton <strong>DD de sort</strong>
        (8 + maîtrise + carac. magique).</li>
        </ul>
        <p>Carac. magique : Intelligence (magicien), Sagesse (clerc, druide), Charisme (barde,
        ensorceleur, occultiste, paladin).</p>`,
        try: { label: 'Rayon de givre (attaque de sort +5), CA de l’ennemi 12. Puis 1d8 de dégâts de froid !', roll: '1d20+5', rollLabel: 'Rayon de givre (CA 12)' },
      },
      {
        h: 'Concentration et rituels',
        html: `<ul>
        <li><strong>Concentration</strong> — un seul sort « C » à la fois ; dégâts reçus → sauvegarde de
        Constitution ou le sort s'éteint.</li>
        <li><strong>Rituel</strong> — un sort « R » lancé en 10 minutes de plus ne consomme
        <em>aucun</em> emplacement. Parfait hors combat.</li>
        </ul>
        <p>Les badges C et R sont partout sur la page <a href="#sorts">Sorts</a>.</p>`,
      },
    ],
    quiz: [
      {
        q: 'Combien de sorts à Concentration peux-tu maintenir à la fois ?',
        options: [
          { t: 'Un seul', ok: true, why: 'Un seul — en lancer un second met fin au premier. Le piège classique !' },
          { t: 'Deux, si je réussis un jet', ok: false, why: 'Jamais : un seul sort de Concentration à la fois, sans exception.' },
          { t: 'Autant que mon modificateur', ok: false, why: 'Non, la limite est absolue : un seul.' },
        ],
      },
      {
        q: 'Tes emplacements de sorts sont épuisés. Que peux-tu encore lancer ?',
        options: [
          { t: 'Mes sorts mineurs, à volonté', ok: true, why: 'Oui — les sorts mineurs ne consomment rien. C\'est ton plan B éternel.' },
          { t: 'Plus rien avant un repos', ok: false, why: 'Les sorts mineurs restent disponibles à volonté !' },
          { t: 'N’importe quel sort, avec des dégâts en échange', ok: false, why: 'Cette règle n\'existe pas (mais elle serait dramatique, avoue).' },
        ],
      },
      {
        q: 'Lancer un sort marqué « R » en rituel…',
        options: [
          { t: 'Prend 10 minutes de plus mais ne consomme pas d’emplacement', ok: true, why: 'Le bon plan hors combat — Détection de la magie en tête.' },
          { t: 'Double ses dégâts', ok: false, why: 'Non : le rituel économise l\'emplacement, il n\'amplifie rien.' },
          { t: 'Nécessite un autel consacré', ok: false, why: 'Aucun autel requis — juste 10 minutes de patience.' },
        ],
      },
      {
        q: 'Ton DD de sort se calcule ainsi :',
        options: [
          { t: '8 + bonus de maîtrise + carac. magique', ok: true, why: 'C\'est le score que les cibles doivent atteindre pour résister.' },
          { t: '10 + modificateur de Dextérité', ok: false, why: 'Ça, c\'est la CA sans armure ! Le DD de sort : 8 + maîtrise + carac. magique.' },
          { t: 'd20 + niveau du sort', ok: false, why: 'Le DD est fixe, on ne le lance pas : 8 + maîtrise + carac. magique.' },
        ],
      },
      {
        q: 'Tu te concentres sur un sort et tu reçois des dégâts. Que faire ?',
        options: [
          { t: 'Sauvegarde de Constitution, ou le sort prend fin', ok: true, why: 'DD 10 ou la moitié des dégâts si c\'est pire. Encaisser fait partie du métier.' },
          { t: 'Rien : la concentration est incassable', ok: false, why: 'Hélas non — chaque coup reçu menace le sort.' },
          { t: 'Le sort se relance automatiquement', ok: false, why: 'S\'il se brise, il faudra le relancer (et re-payer l\'emplacement).' },
        ],
      },
    ],
  },

  {
    id: 'table',
    title: 'Bien jouer à la table',
    desc: 'Les repos, le rythme d’une partie, et les usages qui font les bonnes tables.',
    lessons: [
      {
        h: 'Les repos : reprendre des forces',
        html: `<ul>
        <li><strong>Repos court</strong> (1 h) — dépense des <strong>dés de vie</strong> pour te soigner ;
        certaines capacités reviennent.</li>
        <li><strong>Repos long</strong> (8 h) — <em>tous</em> les PV, la moitié des dés de vie, tous les
        emplacements de sorts. Un par 24 h.</li>
        </ul>`,
      },
      {
        h: 'Le savoir-vivre de l’aventurier',
        html: `<ul>
        <li><strong>Prépare ton action</strong> pendant le tour des autres.</li>
        <li><strong>Décris, ne calcule pas</strong> — « je fauche ses jambes » vaut mieux que « 7 dégâts ».</li>
        <li><strong>Le MJ a le dernier mot</strong> — on vérifie la règle après la séance.</li>
        <li><strong>Rater est intéressant</strong> — les meilleures anecdotes naissent des 1 naturels.</li>
        </ul>`,
      },
      {
        h: 'Ta panoplie pour la table',
        html: `<ul>
        <li><a href="#ecran"><strong>L'Écran du joueur</strong></a> — tour de jeu, actions, états, initiative.</li>
        <li><a href="#personnages"><strong>Ta fiche</strong></a> — PV, jets pré-remplis, sorts, inventaire.</li>
        <li><strong>Le lanceur de dés</strong> — bouton en haut à droite. <strong>Ctrl+K</strong> — tout retrouver.</li>
        </ul>
        <p class="flavor">La Voie s'achève ici, aventurier. Il ne reste qu'à jouer — et ça, aucun grimoire
        ne peut le faire à ta place.</p>`,
        cta: { label: 'Ouvrir l’Écran du joueur', href: '#ecran' },
      },
    ],
    quiz: [
      {
        q: 'Après un repos long, tu récupères…',
        options: [
          { t: 'Tous tes PV et tous tes emplacements de sorts', ok: true, why: 'Oui — le grand reset quotidien (limité à un par 24 h).' },
          { t: 'Seulement la moitié de tes PV', ok: false, why: 'Non, le repos long rend tous les PV (c\'est la moitié des dés de vie qui revient).' },
          { t: 'Rien si tu as combattu dans la journée', ok: false, why: 'Cette règle n\'existe pas — heureusement pour les aventuriers.' },
        ],
      },
      {
        q: 'Pendant un repos court, tu peux te soigner en…',
        options: [
          { t: 'Dépensant des dés de vie (dé + Con par dé)', ok: true, why: 'Une heure de pause, quelques dés de vie, et on repart.' },
          { t: 'Dormant 8 heures', ok: false, why: '8 heures, c\'est le repos LONG. Le court dure 1 heure.' },
          { t: 'Mangeant une ration', ok: false, why: 'La ration nourrit, mais ce sont les dés de vie qui soignent.' },
        ],
      },
      {
        q: 'Le MJ tranche une règle différemment du livre. Que faire ?',
        options: [
          { t: 'On joue sa version, on vérifiera après la séance', ok: true, why: 'C\'est l\'usage : le rythme de l\'histoire prime, la vérification attendra.' },
          { t: 'Arrêter la partie pour chercher la page exacte', ok: false, why: 'Vingt minutes de recherche pour un jet… l\'histoire mérite mieux.' },
          { t: 'Refuser de jouer tant qu’il n’a pas cédé', ok: false, why: 'Voilà comment les groupes se dissolvent. Le MJ a le dernier mot en séance.' },
        ],
      },
      {
        q: 'Le tour d’un autre joueur commence. Toi, tu…',
        options: [
          { t: 'Écoutes et prépares déjà ta prochaine action', ok: true, why: 'Le combat est deux fois plus rapide (et drôle) quand tout le monde fait ça.' },
          { t: 'Sors ton téléphone en attendant', ok: false, why: 'L\'histoire continue sans toi… et ton tour te surprendra les mains vides.' },
          { t: 'Lui souffles la meilleure action à jouer', ok: false, why: 'Chacun son héros — laisse-lui ses projecteurs.' },
        ],
      },
    ],
  },
];
