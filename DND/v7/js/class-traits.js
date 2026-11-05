// Accès aux données structurées des classes (data/classes.json : `traits`, `progression`,
// `incantation`), générées une fois depuis les tables HTML officielles par
// tools/convert_class_tables.py. Les tables HTML ne servent plus qu'à l'affichage.

import { stripAccents } from './utils.js';

export const ALL_SKILLS = [
  'Acrobaties', 'Arcanes', 'Athlétisme', 'Discrétion', 'Dressage', 'Escamotage',
  'Histoire', 'Intimidation', 'Intuition', 'Investigation', 'Médecine', 'Nature',
  'Perception', 'Persuasion', 'Religion', 'Représentation', 'Survie', 'Tromperie',
];

/** Traits de base : caractéristique principale, dé de vie, sauvegardes, maîtrises, compétences. */
export function classTraits(cls){
  const t = cls?.traits || {};
  return {
    caracteristique: t.caracteristique || '',
    deVieFaces: t.de_vie_faces || 8,
    deVieLabel: t.de_vie || '',
    sauvegardes: t.sauvegardes || [],
    armures: t.armures || '',
    armes: t.armes || '',
    outils: t.outils || '',
    competences: {
      count: t.competences?.nombre ?? 2,
      options: t.competences?.options || ALL_SKILLS.slice(),
    },
  };
}

/** Équipement de départ officiel : options (A), (B)… → { label, items:[{name, qty}], gold }. */
export function startingEquipmentChoices(cls){
  return (cls?.traits?.equipement_depart || []).map(e => ({
    label: e.option,
    items: (e.objets || []).map(o => ({ name: o.nom, qty: o.quantite })),
    gold: e.po || 0,
  }));
}

// Clé de colonne insensible aux espaces/accents/casse.
function resourceColKey(s){
  return stripAccents(String(s || '')).toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Colonnes de ressource propres à une classe (Rages, Points de credo, Conduit divin…).
 * Tableau indexé par niveau (index 0 = niveau 1), chaque entrée = { [cléNormalisée]: valeurBrute }.
 */
export function classResourceColumns(cls){
  if(!cls?.progression) return null;
  return cls.progression.map(p => Object.fromEntries(
    Object.entries(p.colonnes || {}).map(([label, v]) => [resourceColKey(label), v])
  ));
}

export function readResourceColumn(byLevel, level, naturalLabel){
  const row = byLevel?.[Math.min(20, Math.max(1, parseInt(level, 10) || 1)) - 1];
  if(!row) return null;
  return row[resourceColKey(naturalLabel)] ?? null;
}

/**
 * Progression d'incantation par niveau : { cantrips, known, slots:[niv1..niv9], pact:{n,lvl}|null },
 * ou null si la classe ne lance pas de sorts.
 */
export function spellcastingTable(cls){
  if(!cls?.incantation) return null;
  return cls.incantation.map(r => ({
    cantrips: r.mineurs || 0,
    known: r.prepares || 0,
    slots: r.emplacements || Array(9).fill(0),
    pact: r.pacte ? { n: r.pacte.nombre, lvl: r.pacte.niveau } : null,
  }));
}
