// Antisèche automatique des traits : repère dans le TEXTE OFFICIEL d'une
// capacité les formulations connues (dégâts, résistances, avantages, durée,
// utilisations limitées…) et les REFORMULE en points télégraphiques d'une
// ligne, lisibles en 5 secondes. Rien n'est déduit ni inventé : seule une
// formulation reconnue produit une ligne — la description complète fait foi.

import { stripAccents, slugify } from '../utils.js';
import { detectActionKind } from './action-economy.js';
import { giantAncestryLabel } from './rules.js';

/** HTML → texte brut (le mémo travaille sur le texte officiel, sans balises). */
export function plainText(htmlOrText){
  return String(htmlOrText || '')
    .replace(/<li[^>]*>/gi, ' • ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

const norm = (s) => stripAccents(String(s || '')).toLowerCase().replace(/[’‘]/g, "'");

/* ------------------------ Utilisations limitées ------------------------
   « un nombre de fois égal à votre bonus de maîtrise… Repos long » ou
   « Une fois ce trait utilisé, vous ne pouvez plus le réutiliser avant
   d'avoir terminé un Repos long » — les deux formulations officielles.   */

export function parseLimitedUse(text){
  const t = norm(plainText(text));
  let uses = null;
  if(/nombre de fois egal a votre bonus de maitrise/.test(t)) uses = 'prof';
  else if(/une fois (ce trait|cette capacite) utilise/.test(t)
    || /ne pouvez plus (le |la |l')?(re)?utiliser avant d'avoir termine un repos/.test(t)) uses = 1;
  if(uses == null) return null;
  const reset = /repos court ou long/.test(t) ? 'court ou long'
    : /repos long/.test(t) ? 'long'
    : 'court';
  // « À partir du niveau N » n'est une condition d'accès que s'il OUVRE le
  // trait (Forme de géant) — en milieu de texte, il décrit autre chose (Fougue).
  const mMin = t.match(/^a partir du niveau (\d+)/);
  return { uses, reset, minLevel: mMin ? Number(mMin[1]) : null };
}

/**
 * Ressources à utilisation limitée détectées dans les traits d'espèce
 * (Souffle du drakéide, Poussée d'adrénaline de l'orc, ascendance du goliath…).
 * Goliath : la limite écrite sur « Ascendance gigante » (bonus de maîtrise /
 * Repos long) s'applique au bienfait choisi, qui devient la ressource affichée.
 * Retourne [{ key, label, max, reset, minLevel, trait, usesLabel }].
 */
export function speciesTraitResources(ch, sp, prof){
  if(!sp) return [];
  const caps = sp.capacites || [];
  const ancParent = caps.find(c => !giantAncestryLabel(c.nom)
    && /choisissez l'un des benefices suivants/.test(norm(c.description)));
  const out = [];
  for(const c of caps){
    const isAncestry = !!giantAncestryLabel(c.nom);
    let lim = null, label = c.nom;
    if(isAncestry){
      if(!ch.giantAncestry || c.nom !== ch.giantAncestry) continue;
      lim = parseLimitedUse(ancParent?.description || '') || parseLimitedUse(c.description);
      label = c.nom.replace(/\s*\([^)]*\)\s*$/, '').trim();
    } else {
      if(ancParent && c === ancParent && ch.giantAncestry) continue; // délégué au bienfait choisi
      lim = parseLimitedUse(c.description);
    }
    if(!lim) continue;
    if(lim.minLevel && ch.level < lim.minLevel) continue;
    const max = lim.uses === 'prof' ? prof : lim.uses;
    if(!Number.isFinite(max) || max <= 0) continue;
    out.push({
      key: 'sp-' + slugify(label), label, max, reset: lim.reset, minLevel: lim.minLevel, trait: c,
      usesLabel: lim.uses === 'prof' ? 'bonus de maîtrise' : `${lim.uses} fois`,
    });
  }
  return out;
}

/* ------------------------------- Antisèche -------------------------------
   Le mémo REFORMULE la description en points télégraphiques : une ligne =
   une info (condition, effet chiffré, restriction, durée, utilisations).
   Chaque extracteur reconnaît une formulation officielle précise et la
   condense — rien n'est inventé : formulation inconnue = pas de ligne.
   Groupes (ordre d'affichage) : 0 coût · 1 utilisations · 2 conditions ·
   3 effets · 3.5 contreparties · 4 restrictions · 5 durée · 6 progression. */

const AB_SHORT = {
  force: 'For', dexterite: 'Dex', constitution: 'Con',
  intelligence: 'Int', sagesse: 'Sag', charisme: 'Cha',
};
const abShort = (s) => AB_SHORT[norm(s).trim()] || String(s || '').trim();

// « contondants, perforants et tranchants » → « contondants, perforants, tranchants »
const listClean = (s) => String(s || '').trim()
  .replace(/^de\s+/i, '')
  .replace(/\s+et\s+(?:de\s+|d')?/gi, ', ')
  .replace(/\s+/g, ' ')
  .replace(/[.;,\s]+$/, '');

// Compression légère d'un complément (possessifs et remplissage retirés).
const squeeze = (s) => String(s || '')
  .replace(/que vous (effectuez|prenez|faites)\s*/gi, '')
  .replace(/autour de vous/gi, 'autour de toi')
  .replace(/contre vous/gi, 'contre toi')
  .replace(/\b(votre|vos)\s+/gi, '')
  .replace(/\s+/g, ' ')
  .replace(/[.;,\s]+$/, '')
  .trim();

const STATE_NAMES = "À terre|Agrippée?|Assourdie?|Aveuglée?|Charmée?|Effrayée?|Empoisonnée?|Entravée?|Étourdie?|Neutralisée?|Incapable d'agir|Inconsciente?|Invisible|Paralysée?|Pétrifiée?";

/**
 * Antisèche d'un trait : lignes { icon, text } très courtes, reformulées
 * depuis la description. Tableau vide si rien d'important n'est reconnu.
 */
export function traitInsights(name, htmlOrText){
  // Apostrophe typographique (’) → droite (') : tous les motifs utilisent la droite.
  const text = plainText(htmlOrText).replace(/[’‘]/g, "'");
  if(!text) return [];
  const out = [];
  const seen = new Set();
  const add = (grp, icon, line) => {
    const t = String(line).replace(/\s+/g, ' ').trim();
    if(!t || seen.has(t.toLowerCase())) return;
    seen.add(t.toLowerCase());
    out.push({ grp, icon, text: t });
  };
  let m;

  /* --- 0 · Coût en action --- */
  const kind = detectActionKind(text);
  if(kind === 'bonus') add(0, '⚡', 'Coût : action bonus');
  else if(kind === 'reaction') add(0, '⚡', 'Coût : ta réaction');
  else if(kind === 'action') add(0, '⚡', 'Coût : ton action');

  /* --- 1 · Utilisations limitées & récupération --- */
  const lim = parseLimitedUse(text);
  if(lim) add(1, '🔢', `Utilisations : ${lim.uses === 'prof' ? 'bonus de maîtrise' : lim.uses} · récup. Repos ${lim.reset}${lim.minLevel ? ` · dès le niveau ${lim.minLevel}` : ''}`);
  if((m = text.match(/autant de fois que[^.]{0,80}?colonne ([^.]+?) de la table/i))) add(1, '🔢', `Utilisations : colonne ${m[1].trim()} (table de classe)`);
  if((m = text.match(/vous pouvez utiliser (?:cette capacité|ce trait) (une|deux|trois|quatre) fois/i))){
    const n = { une: 1, deux: 2, trois: 3, quatre: 4 }[m[1].toLowerCase()];
    const col = (text.match(/davantage d'utilisations[^.]*?colonne ([^.]+?) de la table/i) || [])[1];
    add(1, '🔢', `Utilisations : ${n}${col ? ` · augmente avec le niveau (colonne ${col.trim()})` : ''}`);
  }
  if(/récupérez une utilisation dépensée[^.]*repos court[^.]*toutes les utilisations[^.]*repos long/i.test(text)) add(1, '🔁', 'Récup. : 1 au Repos court · tout au Repos long');
  if(/repos long ou dépenser une utilisation de votre rage/i.test(text)) add(1, '🔁', 'Récup. : Repos long — ou dépenser 1 Rage');
  if(/coût en dé[^.]*dés? de dégâts d'attaque sournoise/i.test(text)) add(1, '🎟️', 'Coût : sacrifier des dés d\'Attaque sournoise (avant de lancer)');

  /* --- 2 · Déclencheurs & conditions d'utilisation --- */
  if(/(?:lorsque|quand) vous touchez [^.]{0,60}?jet d'attaque|créature touchée avec un jet d'attaque/i.test(text))
    add(2, '🎯', `Sur une attaque qui touche${/et (?:lui )?infligez? des dégâts/i.test(text) ? ' (et inflige des dégâts)' : ''}`);
  if((m = text.match(/lorsque vous subissez des dégâts d'une créature[^.]{0,50}?rayon de ([\d,]+)\s*m/i))) add(2, '🎯', `Quand tu subis des dégâts (ennemi ≤ ${m[1]} m)`);
  else if(/lorsque vous subissez des dégâts/i.test(text)) add(2, '🎯', 'Quand tu subis des dégâts');
  if(/si vous tombez à 0 point/i.test(text)) add(2, '🎯', `Quand tu tombes à 0 PV${/sans être tué/i.test(text) ? ' (sans mourir sur le coup)' : ''}`);
  if(/lors de votre premier jet d'attaque/i.test(text)) add(2, '🎯', 'À ton premier jet d\'attaque du tour');
  if(/lorsque vous prenez l'action attaque/i.test(text)) add(2, '🎯', 'Pendant ton action Attaque');
  if(/arme avec la propriété finesse ou à distance/i.test(text)) add(2, '🗡️', 'Arme Finesse ou À distance requise');
  if(/pas besoin d'un avantage[^.]*alliés? se trouve dans un rayon de 1,50/i.test(text))
    add(2, '🎲', 'Avantage requis — ou un allié à 1,50 m de la cible (pas Incapable d\'agir)');
  else if(/si vous avez un avantage au jet/i.test(text)) add(2, '🎲', 'Avantage au jet requis');
  if((m = text.match(/créature de taille (TP|P|M|G|TG) ou inférieure/i))) add(2, '🎯', `Cible de taille ${m[1].toUpperCase()} ou moins`);
  if(/espace suffisamment grand/i.test(text)) add(2, '📏', 'Espace suffisant requis');
  if(/si vous ne portez pas d'armure lourde/i.test(text)) add(2, '🚫', 'Interdit en armure lourde');
  if(/tant que vous ne portez (?:pas d'|aucune )armure/i.test(text)) add(2, '🚫', 'Sans armure uniquement');
  if(/une fois par tour/i.test(text)) add(2, '🔁', '1 fois par tour maximum');
  if(/tant que votre rage est active/i.test(text)) add(2, '⏳', 'Tant que ta Rage est active');
  if(/au début de chacun de vos tours/i.test(text)) add(2, '🎯', 'Au début de chacun de tes tours');
  if((m = text.match(/chaque fois que vous activez votre ([A-ZÀ-Ü][\w éà-ü']*?)(?: par| pendant|,|\.)/i))) add(2, '🎯', `Quand tu actives ${m[1].trim()}`);
  if(/remplacer l'une de vos attaques/i.test(text)) add(2, '🎯', 'Remplace une attaque de l\'action Attaque');
  if(/que si vous ne vous êtes pas déplacé pendant ce tour/i.test(text)) add(2, '🚫', 'Seulement si tu ne t\'es pas déplacé ce tour');

  /* --- 3 · Effets --- */
  const dmgRe = /(\d+d\d+|\d+)\s*(?:points? de )?dégâts(?: de (\w+))? supplémentaires/gi;
  while((m = dmgRe.exec(text))) add(3, '⚔️', `+${m[1]} dégâts${m[2] ? ' de ' + m[2] : ''}`);
  if(/dégâts supplémentaires est identique à celui de l'arme|du même type que celui infligé par l'arme/i.test(text))
    add(3, '⚔️', 'Dégâts du même type que l\'arme');
  if((m = /vous obtenez un bonus aux dégâts/i.exec(text))){
    // La colonne citée juste après ce bonus (pas la première du texte).
    const col = (text.slice(m.index).match(/colonne ([^.]+?) de la table/i) || [])[1];
    add(3, '⚔️', `Bonus aux dégâts${/en utilisant la force/i.test(text) ? ' des attaques de Force' : ''}${col ? ` (colonne ${col.trim()})` : ''}`);
  }
  if((m = text.match(/(\d+d\d+) dégâts du type déterminé par votre (?:trait )?ascendance/i))) add(3, '⚔️', `${m[1]} dégâts (type de ton Ascendance draconique)`);
  if(/attaquer deux fois, au lieu d'une/i.test(text)) add(3, '⚔️', '2 attaques par action Attaque');
  if((m = text.match(/une action supplémentaire(?:, à l'exception de l'action (\w+))?/i))) add(3, '⚔️', `1 action supplémentaire ce tour${m[1] ? ` (sauf ${m[1]})` : ''}`);
  if((m = text.match(/coup critique sur un résultat de (\d+) ou (\d+)/i))) add(3, '⚔️', `Coup critique sur ${m[1]}–${m[2]}`);
  if((m = text.match(/vous gagnez l'expertise dans (deux|trois)/i))) add(3, '📈', 'Expertise : bonus de maîtrise doublé (compétences choisies)');
  if((m = text.match(/regagner des points de vie égaux à ([^.;]+?)(?=[.;]|$)/i))) add(3, '❤️', `Soigne ${squeeze(m[1]).replace(/\bplus\b/gi, '+')}`);

  if((m = text.match(/résistance à tous les types de dégâts, à l'exception des dégâts ([^.;]+?)(?=[.;]| tant | pendant | jusqu)/i))) add(3, '🛡️', `Résistance : tout sauf ${listClean(m[1])}`);
  else if((m = text.match(/résistance aux dégâts ([^.;]+?)(?=[.;]| tant | pendant | jusqu)/i))) add(3, '🛡️', `Résistance : ${listClean(m[1])}`);
  if((m = text.match(/immunité aux états? ([^.;]+?)(?=[.;]| tant | pendant | jusqu)/i))) add(3, '🛡️', `Immunité : ${listClean(m[1])}`);
  if((m = text.match(/immunité aux dégâts ([^.;]+?)(?=[.;]| tant | pendant | jusqu)/i))) add(3, '🛡️', `Immunité : dégâts ${listClean(m[1])}`);

  const advRe = /(?<!\bsi )(?<!\bque )(?:vous (?:avez|bénéficiez d'|obtenez)|cela vous confère|vous confère|qui vous donne)[^.;]{0,30}?\bavantage (?:aux?|à|pour) ([^.;]+?)(?=,? (?:mais|tant|jusqu|pendant|sauf|si\b|et que\b|et (?:votre|vos)\b)|[.;]|$)/gi;
  while((m = advRe.exec(text))) add(3, '🎲', `Avantage : ${squeeze(m[1])}`);
  if((m = text.match(/alliés bénéficient d'un avantage aux jets d'attaque contre ([^.;]+)/i))) add(3, '🎲', `Alliés : Avantage aux attaques contre ${squeeze(m[1])}`);
  if((m = text.match(/impose[rz]? le désavantage (?:à|aux) ([^.;]+)/i))) add(3, '🎲', `Impose le Désavantage : ${squeeze(m[1])}`);
  if((m = text.match(/la cible a le désavantage à ([^.;]+?)(?=,| et|[.;]|$)/i))) add(3, '🎲', `Cible : Désavantage à ${squeeze(m[1])}`);
  if((m = text.match(/converti en jet de (\w+)[^:]{0,80}:\s*([^.]+)/i))) add(3, '🎲', `${listClean(m[2])} → jets de ${m[1]}`);

  if((m = text.match(/points de vie temporaires égal(?:e|es)? à ([^.;]+?)(?=[.;]|$)/i))) add(3, '❤️', `PV temporaires = ${squeeze(m[1])}`);
  if(/remonter à 1 point de vie/i.test(text)) add(3, '❤️', 'Tu restes à 1 PV au lieu de tomber à 0');
  if((m = text.match(/points de vie se retrouvent[^.]*au double de votre niveau de (\w+)/i))) add(3, '❤️', `PV remontés à 2 × niveau de ${m[1]}`);
  if((m = text.match(/lancer 1d(\d+)[\s\S]{0,80}?modificateur de (\w+)[\s\S]{0,60}?réduisez les dégâts/i))) add(3, '🛡️', `Réduit les dégâts subis de 1d${m[1]} + ${abShort(m[2])}`);

  if((m = text.match(/classe d'armure de base est égale à (\d+) plus vos modificateurs de (\w+) et de (\w+)/i))) add(3, '🪖', `CA = ${m[1]} + ${abShort(m[2])} + ${abShort(m[3])}`);
  if(/vous pouvez utiliser un bouclier et bénéficier/i.test(text)) add(3, '🪖', 'Bouclier autorisé');

  if((m = text.match(/votre vitesse augmente de ([\d,]+)\s*m/i))) add(3, '🥾', `Ta Vitesse +${m[1]} m`);
  if((m = text.match(/(?:réduire sa vitesse de|vitesse de la cible est réduite de) ([\d,]+)\s*m/i))) add(3, '🥾', `Vitesse de la cible −${m[1]} m`);
  if(/réduire la vitesse de la cible à 0/i.test(text)) add(3, '🥾', 'Peut réduire la Vitesse de la cible à 0');
  if((m = text.match(/vitesse (d'escalade|de nage) égale à votre vitesse/i))) add(3, '🥾', `Vitesse ${m[1]} = ta Vitesse`);
  if(/déplacer jusqu'à la moitié de votre vitesse/i.test(text)) add(3, '🥾', 'Déplacement : jusqu\'à la moitié de ta Vitesse');
  if(/sans provoquer d'attaques? d'opportunité/i.test(text)) add(3, '🥾', 'Sans provoquer d\'attaque d\'Opportunité');
  if(/votre vitesse est de 0 jusqu'à la fin du tour/i.test(text)) add(3.5, '⚠️', 'Ta Vitesse tombe à 0 jusqu\'à la fin du tour');
  if((m = text.match(/vision dans le noir sur ([\d,]+)\s*m/i))) add(3, '👁️', `Vision dans le noir ${m[1]} m`);
  if((m = text.match(/vous vous téléportez[^.]*?jusqu'à ([\d,]+)\s*m/i))) add(3, '✨', `Téléportation ≤ ${m[1]} m (espace libre visible)`);
  if((m = text.match(/passer à la taille (G|TG)\b/i))) add(3, '📏', `Tu passes en taille ${m[1].toUpperCase()}`);
  if(/comme une taille supérieure[^.]*capacité de charge/i.test(text)) add(3, '📦', 'Charge portée : compte comme une taille au-dessus');
  const cone = text.match(/cône de ([\d,]+)\s*m/i);
  const ligne = text.match(/ligne de ([\d,]+)\s*m/i);
  if(cone || ligne) add(3, '📏', [cone && `Cône ${cone[1]} m`, ligne && `Ligne ${ligne[1]} m`].filter(Boolean).join(' ou '));
  if(/(?:elle subit la|la) moitié de ces dégâts(?: en cas de réussite)?|moitié des dégâts en cas de réussite/i.test(text)) add(3, '🎯', 'Réussite au JS : moitié des dégâts');
  if((m = text.match(/prendre l'une des actions suivantes en tant qu'action bonus\s*:\s*([^.]+)/i))) add(3, '🎯', `En action bonus : ${m[1].trim().replace(/[.;\s]+$/, '')}`);
  if((m = text.match(/prendre (?:les actions|l'action) ([^.]+?) (?:comme|dans le cadre de cette) action bonus/i))) add(3, '🎯', `En action bonus : ${listClean(m[1])}`);
  if((m = text.match(/vous pouvez lancer les? sorts? ([^,.;]+)/i))) add(3, '✨', `Sorts : ${listClean(m[1])}`);
  if((m = text.match(/vous connaissez le sort mineur ([^,.;]+)/i))) add(3, '✨', `Sort mineur : ${m[1].trim()}`);
  if(/aux niveaux 3 et 5, vous apprenez un sort de niveau supérieur/i.test(text)) add(6, '📈', 'Nouveau sort aux niveaux 3 et 5 (toujours préparé)');
  if((m = text.match(/la (\w+) est votre caractéristique d'incantation/i))) add(3, '✨', `Caractéristique d'incantation : ${m[1]}`);
  if((m = text.match(/obtenez un 1 (?:au|sur le) d20[^.]*relancer le dé/i))) add(3, '🎲', 'Sur un 1 au d20 : relance (garde le nouveau résultat)');
  if(/traverser la case de toute créature d'une taille supérieure/i.test(text)) add(3, '🥾', 'Traverse les cases des créatures plus grandes (sans s\'y arrêter)');
  if(/l'action furtivité même si vous n'êtes masqué que par une créature/i.test(text)) add(3, '🎯', 'Furtivité possible derrière une créature plus grande que toi');
  if(/maximum de points de vie augmente de 1[^.]*chaque fois que vous gagnez un niveau/i.test(text)) add(3, '❤️', 'PV max +1 par niveau');
  if(/vous gagnez l'inspiration héroïque chaque fois que vous terminez un repos long/i.test(text)) add(3, '✨', 'Inspiration héroïque à chaque Repos long');
  if(/vous maîtrisez une compétence de votre choix/i.test(text)) add(3, '📈', '+1 maîtrise de compétence au choix');
  if((m = text.match(/vous maîtrisez la compétence ([^,.;]+(?:, [^,.;]+)*(?: ou [^,.;]+)?)/i))) add(3, '📈', `Maîtrise : ${m[1].trim()}`);
  if(/vous gagnez un don d'origines? de votre choix/i.test(text)) add(3, '🎁', '+1 don d\'origine au choix');
  if(/terminer un repos long en 4 heures/i.test(text)) add(3, '🌙', 'Repos long en 4 h (transe méditative)');
  if(/la magie ne peut pas vous endormir/i.test(text)) add(3, '🛡️', 'Insensible au sommeil magique');
  if((m = text.match(/(?:lui|leur) infliger (\d+d\d+) dégâts de (\w+)(?!\w)(?! supplémentaires)/i))) add(3, '⚔️', `${m[1]} dégâts de ${m[2]}`);

  if((m = text.match(/jet de sauvegarde de (\w+)\s*\(?DD 8 plus votre modificateur de (\w+) et votre bonus de maîtrise\)?/i)))
    add(3, '🎯', `Impose un JS ${abShort(m[1])} · DD 8 + ${abShort(m[2])} + maîtrise`);
  else if((m = text.match(/jet de sauvegarde de (\w+)\s*\(?DD (\d+)/i)))
    add(3, '🎯', `Impose un JS ${abShort(m[1])} · DD ${m[2]}${/dd augmente de 5/i.test(text) ? ' (+5 par usage · repos → 10)' : ''}`);

  const stateRe = new RegExp(`(ne\\s+)?(?:subit|faire subir|subir)\\s+l'état (${STATE_NAMES})`, 'gi');
  while((m = stateRe.exec(text))){
    if(m[1]) continue; // « ne subit pas l'état… » : condition, pas un effet
    // « pendant 1 minute » ne compte que s'il suit CET état de près.
    const near = /^[^.]{0,60}pendant 1 minute/i.test(text.slice(m.index + m[0].length));
    add(3, '🩸', `Inflige l'état : ${m[2]}${near ? ' (1 min)' : ''}`);
  }

  /* --- 3.5 · Contreparties --- */
  if(/jets? d'attaque contre vous ont (?:aussi )?un avantage/i.test(text)) add(3.5, '⚠️', 'Les attaques contre toi ont aussi l\'Avantage');

  /* --- 4 · Restrictions --- */
  if(/ne pouvez pas maintenir votre concentration ni lancer de sorts/i.test(text)) add(4, '🚫', 'Pas de Concentration · pas de sorts');
  if(/s'arrête prématurément[^.]*armure lourde[^.]*incapable d'agir/i.test(text)) add(4, '🚫', 'Fin anticipée : armure lourde enfilée ou Incapable d\'agir');
  if(/si vous n'avez pas un désavantage au jet d'attaque/i.test(text)) add(4, '🚫', 'Impossible avec un Désavantage au jet d\'attaque');
  if((m = text.match(new RegExp(`sauf si vous subissez l'état (${STATE_NAMES})`, 'i')))) add(4, '🚫', `Sauf si tu es ${m[1]}`);
  if(/uniquement sous forme de rituels?/i.test(text)) add(4, '📖', 'Rituel uniquement');

  /* --- 5 · Durée --- */
  if((m = text.match(/(?:dure|pendant) (\d+) minutes?/i))) add(5, '⏳', `Durée : ${m[1]} min${/jusqu'à ce que vous y mettiez fin/i.test(text) ? ' (arrêt libre)' : ''}`);
  if(/jusqu'à la fin de votre prochain tour/i.test(text)) add(5, '⏳', 'Jusqu\'à la fin de ton prochain tour');
  else if(/jusqu'au début de votre (?:prochain tour|tour suivant)/i.test(text)) add(5, '⏳', 'Jusqu\'au début de ton prochain tour');
  if(/vous pouvez la prolonger d'un tour/i.test(text)) add(5, '🔁', 'À prolonger chaque tour : attaquer, imposer un JS ou action bonus');
  if((m = text.match(/maximum (\d+) minutes/i))) add(5, '⏳', `Maximum ${m[1]} min`);

  /* --- 6 · Progression --- */
  if((m = text.match(/augmentent? (?:à mesure|au fur et à mesure) que vous gagnez des niveaux de (\w+)/i))) add(6, '📈', `Augmente avec les niveaux de ${m[1]} (table)`);
  if((m = text.match(/augmentent de \d+d\d+ lorsque vous atteignez les niveaux ([^.]+)/i))) add(6, '📈', `Dégâts : niveaux ${listClean(m[1])}`);

  return out.sort((a, b) => a.grp - b.grp).slice(0, 9);
}

/**
 * Le trait a-t-il un état activé / désactivé à suivre en jeu (Rage, Forme de
 * géant…) ? Vrai si le texte décrit une activation ou un effet à durée, en
 * plus d'un coût en action — les riders passifs (« tant que votre Rage est
 * active » sur une autre capacité) restent sans interrupteur.
 */
export function traitToggleable(name, htmlOrText){
  const text = plainText(htmlOrText);
  const kind = detectActionKind(text);
  if(!kind || kind === 'reaction') return false;
  const t = norm(text);
  return /\bactiver?\b|\bactivez\b|lorsqu'elle est active/.test(t)
    || /(transformation|forme|effet) dure/.test(t)
    || /pendant (1|10) minutes?/.test(t);
}

/** Clé stable d'un trait pour ch.activeTraits. */
export const traitKey = (name) => slugify(String(name || '').replace(/\s*\([^)]*\)\s*$/, ''));
