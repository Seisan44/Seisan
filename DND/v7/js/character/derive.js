// Statistiques dérivées d'un personnage (CA, vitesse, initiative, maîtrises, bottes…) et
// attaques d'arme : pur calcul à partir du personnage et de DATA, sans DOM.

import { DATA } from '../data.js';
import { abilityMod } from '../utils.js';
import { classTraits, classResourceColumns, readResourceColumn } from '../class-traits.js';
import {
  ABILITIES, proficiencyBonus, computeArmorClass, computeSpeed, parseArmorForceReq,
  parseWeightKg, parseSizeCategory, carryCapacity, isWeaponProficient,
  skillProfMultiplier, weaponMasteryCountFromText, FIGHTING_STYLES, giantAncestryOptions,
} from './rules.js';
import { isTwoHandedOnly, isVersatile, versatileDice } from './equipment.js';
import { speciesTraitResources } from './trait-insights.js';

export function derive(ch){
  const cls = DATA.classesBySlug.get(ch.classSlug);
  // Sous-classe choisie au niveau 3 (null tant que le choix n'est pas fait).
  const sub = (cls?.allSubclasses || cls?.subclasses || []).find(s => s.slug === ch.subclass) || null;
  let sp = DATA.speciesBySlug.get(ch.species);
  // Goliath : si une ascendance gigante a été choisie à la création, seule
  // celle-ci reste sur la fiche (les 5 autres options disparaissent).
  if(sp && ch.giantAncestry){
    const ancs = giantAncestryOptions(sp);
    if(ancs.some(c => c.nom === ch.giantAncestry)){
      sp = { ...sp, capacites: (sp.capacites || []).filter(c => !ancs.includes(c) || c.nom === ch.giantAncestry) };
    }
  }
  const bg = DATA.historiquesBySlug.get(ch.background);
  const traits = classTraits(cls);
  // Overrides manuels (objets inconnus, effets maison) : ils priment sur le calcul.
  const ov = ch.overrides || {};
  const ovStats = ov.stats || {};
  const profAuto = proficiencyBonus(ch.level);
  const prof = Number.isFinite(ovStats.maitrise) ? ovStats.maitrise : profAuto;
  const mods = {};
  for(const a of ABILITIES) mods[a.key] = abilityMod(ch.abilities[a.key] ?? 10);

  // Armure / bouclier équipés.
  let armorItem = null, hasShield = false;
  for(const item of ch.inventory || []){
    if(!item.equipped) continue;
    const known = DATA.lookupItem(item.name);
    if(known?.kind === 'armure'){
      if(/bouclier/i.test(known.categorie)) hasShield = true;
      else armorItem = known;
    }
  }
  let ca = computeArmorClass({ dexMod: mods.dexterite, armorCA: armorItem?.ca ?? null, hasShield });
  // Défense sans armure (Barbare, Moine…) : formule et bouclier lus dans la capacité de classe.
  const udCap = !armorItem && (cls?.capacites || []).find(c => /d[ée]fense sans armure/i.test(c.capacite_name) && parseInt(c.niveau, 10) <= ch.level);
  if(udCap){
    const txt = String(udCap.description_html || '').replace(/<[^>]+>/g, ' ');
    const word = (txt.match(/Dext[ée]rit[ée] et de (\p{L}+)/iu) || [])[1] || '';
    const second = ABILITIES.find(a => a.label.toLowerCase() === word.toLowerCase());
    const noShield = /ne maniez pas de bouclier/i.test(txt);
    if(second && !(noShield && hasShield)){
      const value = 10 + mods.dexterite + mods[second.key] + (hasShield ? 2 : 0);
      if(value > ca.value){
        ca = { value, breakdown: [`10 + Dex + ${second.short} (${udCap.capacite_name})`, ...(hasShield ? ['+2 bouclier'] : [])] };
      }
    }
  }
  if(ch.fightingStyle === 'defense' && armorItem){
    ca.value += 1;
    ca.breakdown.push('+1 style Défense');
  }
  const caAuto = ca.value;
  if(Number.isFinite(ovStats.ca)){
    ca = { value: ovStats.ca, breakdown: ['valeur fixée à la main'] };
  }

  // Charge portée / capacité (taille × Force).
  let totalWeight = 0;
  for(const item of ch.inventory || []){
    const known = DATA.lookupItem(item.name);
    if(known?.poids) totalWeight += parseWeightKg(known.poids) * (item.qty || 1);
  }
  const sizeCat = parseSizeCategory(sp?.infos?.['Taille']);
  const capacity = carryCapacity(sizeCat, ch.abilities.force);
  const overloaded = totalWeight > capacity.carry;

  let speed = computeSpeed({
    speciesSpeedLabel: sp?.infos?.['Vitesse'],
    forceScore: ch.abilities.force,
    armorForceReq: armorItem ? parseArmorForceReq(armorItem.force) : null,
    overloaded,
  });
  const speedAuto = speed.value;
  if(Number.isFinite(ovStats.vitesse)){
    speed = { ...speed, value: ovStats.vitesse, penalized: false, overloaded: false };
  }

  // Don Vigilant : le bonus de maîtrise s'ajoute à l'initiative.
  const alertFeat = /^vigilant\b/i.test(String(bg?.don || '').trim());
  const initiativeAuto = mods.dexterite + (alertFeat ? prof : 0);
  const initiative = Number.isFinite(ovStats.initiative) ? ovStats.initiative : initiativeAuto;

  const perceptionBonus = mods.sagesse + skillProfMultiplier(ch, 'Perception') * prof + (ov.skills?.['Perception'] || 0);
  const perceptionAuto = 10 + perceptionBonus;
  const perception = Number.isFinite(ovStats.perception) ? ovStats.perception : perceptionAuto;

  // Maîtrise des sauvegardes : celle de la classe, modifiable à la main.
  const saveProf = {};
  for(const a of ABILITIES){
    const base = traits.sauvegardes.some(s => s.toLowerCase().startsWith(a.label.toLowerCase().slice(0, 5)));
    saveProf[a.key] = ov.saveProf?.[a.key] ?? base;
  }

  const resourceCols = classResourceColumns(cls);
  // Bottes d'arme : nombre lu dans la table de classe (Barbare, Guerrier) ou dans le texte de la capacité.
  const masteryCap = (cls?.capacites || []).find(c => /^bottes? d.arme/i.test(c.capacite_name) && parseInt(c.niveau, 10) <= ch.level);
  const masteryMax = masteryCap
    ? (parseInt(readResourceColumn(resourceCols, ch.level, "Botte d'arme"), 10)
      || weaponMasteryCountFromText(String(masteryCap.description_html || '').replace(/<[^>]+>/g, ' ')))
    : 0;
  // Sans choix enregistré (anciens personnages) : les armes équipées et maîtrisées, dans la limite.
  const masteries = masteryMax <= 0 ? []
    : Array.isArray(ch.masteries) ? ch.masteries.slice(0, masteryMax)
    : [...new Set((ch.inventory || []).filter(it => it.equipped).map(it => DATA.lookupItem(it.name))
      .filter(k => k?.kind === 'arme' && k.botte && isWeaponProficient(traits.armes, k)).map(k => k.nom))].slice(0, masteryMax);

  // Maîtrises d'outils : choisies à la création (ch.tools) ; pour les personnages
  // d'avant ce champ, on retombe sur l'outil imposé par l'historique.
  const toolProfs = [...(ch.tools || [])];
  if(!toolProfs.length && bg?.maitrise_outils && !/^choisissez/i.test(bg.maitrise_outils.trim())){
    toolProfs.push(bg.maitrise_outils.trim());
  }

  return {
    cls, sub, sp, bg, traits, prof, profAuto, mods, ca, caAuto, speed, speedAuto,
    initiative, initiativeAuto, armorItem, hasShield,
    perception, perceptionAuto, saveProf, toolProfs,
    totalWeight, capacity, overloaded, sizeCat, resourceCols, masteryMax, masteries, alertFeat,
    fightingStyle: FIGHTING_STYLES.find(f => f.id === ch.fightingStyle) || null,
    spResources: speciesTraitResources(ch, sp, prof),
  };
}

export function weaponAttack(ch, d, item, known, { offHand = false } = {}){
  const ranged = /distance/i.test(known.categorie || '');
  const finesse = (known.proprietes || []).some(p => /finesse/i.test(p));
  const thrown = (known.proprietes || []).some(p => /lancer/i.test(p));
  let mod;
  if(ranged) mod = d.mods.dexterite;
  else if(finesse) mod = Math.max(d.mods.force, d.mods.dexterite);
  else mod = d.mods.force;

  // Bonus de maîtrise UNIQUEMENT si la classe maîtrise cette arme.
  const proficient = isWeaponProficient(d.traits.armes, known);
  let atk = mod + (proficient ? d.prof : 0);
  let dmgBonus = mod;

  const twoHandedGrip = item.slot === '2m' || isTwoHandedOnly(known);

  // Duel : arme de corps à corps à une main et aucune autre arme — jamais sur l'attaque de
  // la seconde arme. L'appli ne suit pas les mains pour l'arme principale (rappel en puce).
  const duel = ch.fightingStyle === 'duel' && !ranged && !twoHandedGrip && !offHand;
  if(ch.fightingStyle === 'archerie' && ranged) atk += 2;
  if(duel) dmgBonus += 2;
  if(ch.fightingStyle === 'armes-de-lancer' && thrown) dmgBonus += 2;

  // Combat à deux armes (propriété Légère) : l'attaque d'action bonus n'ajoute
  // pas le modificateur aux dégâts — sauf s'il est négatif, ou avec le style.
  if(offHand && dmgBonus > 0 && ch.fightingStyle !== 'combat-a-deux-armes'){
    dmgBonus -= mod;
  }

  // Arme polyvalente maniée à deux mains : les dégâts entre parenthèses.
  let dice = (String(known.degats || '').match(/(\d+d\d+)/i) || [])[1] || '1d4';
  let versatileUsed = false;
  if(item.slot === '2m' && isVersatile(known)){
    const vd = versatileDice(known);
    if(vd){ dice = vd; versatileUsed = true; }
  }
  const dmgType = String(known.degats || '').replace(/^\s*\d+d\d+\s*/i, '');
  const dmg = `${dice}${dmgBonus ? (dmgBonus > 0 ? '+' + dmgBonus : dmgBonus) : ''}`;
  return { atk, dmg, dmgType, ranged, finesse, proficient, versatileUsed, duel };
}
