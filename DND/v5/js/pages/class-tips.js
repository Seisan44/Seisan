// Conseils de jeu courts, rédigés à la main (non pilotés par les données) : un
// complément pratique à la table de capacités, pas une retranscription des règles.
export const CLASS_TIPS = {
  'Barbare': [
    "Activez votre Rage avant le premier coup si vous savez le combat inévitable : elle ne coûte qu'une action Bonus.",
    "Évitez le port d'armure lourde : il vous prive du bonus de Constitution à la CA et parfois de la Rage elle-même.",
    "Placez-vous au contact dès que possible : votre Résistance aux dégâts en Rage encaisse ce que les autres évitent.",
    "Gardez un œil sur vos points de vie : hors de portée de soins, une Rage prolongée peut devenir un pari risqué.",
  ],
  'Barde': [
    "Réservez votre Inspiration bardique aux jets serrés plutôt qu'aux premières occasions venues — elle est limitée par repos.",
    "Un Collège de la Séduction ou de la Vaillance change radicalement votre rôle : lisez votre sous-classe avant de jouer un combat.",
    "Le Barde connaît large : diversifiez vos sorts entre utilité, contrôle et un ou deux dégâts fiables.",
    "En dehors du combat, vos maîtrises de compétences étendues en font le meilleur généraliste du groupe.",
  ],
  'Clerc': [
    "Préparez vos sorts en pensant à la session à venir, pas seulement au prochain combat : soin, utilité et exploration comptent autant.",
    "Le Domaine choisi ajoute des sorts toujours disponibles en plus de votre liste préparée — ne les oubliez pas.",
    "Un bouclier et une arme de corps à corps restent pertinents : le Clerc n'est pas qu'un soigneur en retrait.",
    "Gardez toujours un sort de soin d'urgence prêt : votre groupe comptera sur vous en cas de coup dur.",
  ],
  'Druide': [
    "La Forme sauvage est une ressource offensive et défensive à la fois : changez de forme pour encaisser plutôt que de soigner.",
    "Hors combat, vos sorts de détection et de déplacement (vitesse d'escalade, de nage...) simplifient énormément l'exploration.",
    "Le Cercle choisi oriente fortement le style de jeu : Terre pour l'utilité, Lune pour la forme sauvage martiale, Mers pour le contrôle.",
    "Le focaliseur druidique remplace les composantes matérielles courantes : pensez à vous en équiper dès le niveau 1.",
  ],
  'Ensorceleur': [
    "La Métamagie transforme un sort ordinaire en solution tactique : gardez toujours un ou deux points de sorcellerie en réserve.",
    "Votre liste de sorts connus est courte : privilégiez la polyvalence (contrôle, dégâts, utilité) plutôt que les redondances.",
    "Votre origine (draconique, sauvage...) donne des capacités passives puissantes : elles influencent le choix des sorts à privilégier.",
    "Convertir emplacements et points de sorcellerie est une décision de repos court à anticiper avant d'en avoir besoin.",
  ],
  'Guerrier': [
    "L'action Bonus et les multiples attaques par tour rendent l'ordre des actions important : planifiez avant d'agir.",
    "Une sous-classe martiale (Champion, Chevalier occulte, Maître de guerre) change fortement votre jeu : choisissez-la en fonction du style désiré.",
    "Investissez dans vos maîtrises d'armes : l'effet de botte associé récompense la constance sur une même arme.",
    "Le Guerrier encaisse le mieux du groupe : placez-vous en première ligne pour protéger les profils fragiles.",
  ],
  'Magicien': [
    "Un Magicien prépare ses sorts chaque jour : adaptez la liste préparée à ce que vous anticipez de la journée.",
    "Le livre de sorts est votre véritable ressource : protégez-le, il conditionne toute votre progression.",
    "La sous-classe (École) offre des économies de emplacements ou des effets renforcés dans un domaine précis dès le niveau 2.",
    "Gardez toujours un sort de contrôle de zone en réserve : c'est souvent ce qui retourne un combat difficile.",
  ],
  'Moine': [
    "Le Ki est votre ressource centrale : ne la dépensez pas en Rafale de coups sur des ennemis déjà voués à tomber au corps à corps simple.",
    "La Défense sans arme récompense le combat à mains nues ou avec des armes de moine légères, pas les armes lourdes.",
    "Votre mobilité (vitesse accrue, Déplacement félin) sert autant à fuir qu'à isoler une cible pour vos alliés.",
    "Le Credo choisi (Éléments, Ombre, Paume) ouvre des options très différentes : lisez-le tôt pour orienter vos choix de Ki.",
  ],
  'Occultiste': [
    "Vos emplacements de sort sont peu nombreux mais reviennent après un repos court : lancez sans crainte, puis reposez-vous.",
    "Les Legs occultes (Invocations mystiques) sont votre polyvalence : choisissez-les selon vos lacunes plutôt que par pur flair.",
    "Le Protecteur choisi (Archifée, Céleste, Fiélon, Grand Ancien) définit une bonne partie de votre style et de vos sorts bonus.",
    "La Magie de pacte se lance souvent au niveau maximal disponible : vos sorts frappent plus fort que ceux d'un autre lanceur de même niveau.",
  ],
  'Paladin': [
    "Le Châtiment divin transforme une attaque réussie en gros dégâts ponctuels : gardez des emplacements pour les moments critiques plutôt que de les dépenser tous en soins.",
    "Votre Serment octroie des sorts toujours disponibles et des capacités thématiques fortes : il façonne votre rôle autant que votre classe.",
    "L'Imposition des mains est une réserve de soin flexible, à gérer sur la durée d'une journée d'aventure plutôt qu'en un seul coup.",
    "Vos auras de protection profitent à tout le groupe proche de vous : restez en formation plutôt qu'isolé.",
  ],
  'Rodeur': [
    "Un Ennemi juré ou Terrain favori bien choisi peut transformer une rencontre difficile en simple formalité : adaptez-les à la campagne en cours.",
    "Vos sorts sont peu nombreux mais très ciblés : ils comblent surtout des angles morts (détection, mobilité, contrôle discret).",
    "Une arme à distance reste souvent votre option la plus fiable ; les traits martiaux de sous-classe orientent vers le corps-à-corps ou le tir.",
    "Vos compétences de survie et de pistage en font le meilleur éclaireur du groupe en exploration.",
  ],
  'Roublard': [
    "L'Attaque sournoise ne s'applique qu'une fois par tour : cherchez l'avantage (allié adjacent, cible surprise) plutôt que de multiplier les attaques.",
    "La Discrétion en tant qu'action Bonus permet d'attaquer puis de disparaître à nouveau dans le même tour.",
    "Votre archétype (Arnaqueur arcanique, Assassin, Voleur) définit un angle de jeu bien précis : choisissez-le tôt et construisez autour.",
    "Vos maîtrises de compétences étendues (Expertise) en font l'expert incontesté d'une ou deux compétences clés du groupe.",
  ],
};
