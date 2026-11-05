// Générateur de noms de PNJ : prénoms procéduraux par syllabes,
// combinés à des structures « prénom + surnom/titre/lieu ».

const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const cap  = s => s.charAt(0).toUpperCase() + s.slice(1);

// Attaque + voyelle (+ coda sur la dernière syllabe uniquement).
const ONSETS = ['b', 'br', 'd', 'dr', 'f', 'g', 'gal', 'gar', 'gr', 'k', 'kr', 'l', 'm', 'mor', 'n', 'r', 's', 'sel', 'th', 'thal', 'v', 'vor', 'z'];
const NUCLEI = ['a', 'e', 'i', 'o', 'u', 'a', 'é', 'ia', 'ei', 'ae', 'ou'];
const CODAS  = ['', '', 'n', 'r', 's', 'l', 'k', 'th', 'm', 'nd', 'ric', 'wyn', 'dor'];

export function syllableName(min = 2, max = 3){
  const n = min + Math.floor(Math.random() * (max - min + 1));
  let name = '';
  for(let i = 0; i < n; i++){
    name += pick(ONSETS) + pick(NUCLEI);
    if(i === n - 1) name += pick(CODAS);
  }
  return cap(name);
}

const EPITHETES = [
  'le Silencieux', 'la Rouge', 'le Borgne', 'la Prudente', 'le Chanceux', 'l’Ancienne',
  'le Balafré', 'la Grise', 'le Pieux', 'Trois-Doigts', 'au Poing d’Acier', 'sans Ombre',
];
const TITRES = ['Capitaine', 'Dame', 'Maître', 'Frère', 'Mère', 'Vieux', 'Sergent', 'Docteur'];
const NOMS_COMPOSES = ['Brisefer', 'Ventenoire', 'Fendelune', 'Piedléger', 'Cœur-de-Chêne', 'Longuevue', 'Malaubois'];

// Chaque structure est une fonction : on en tire une au hasard à chaque clic.
const STRUCTURES = [
  () => syllableName(),                                 // « Thalric »
  () => `${syllableName()} ${pick(EPITHETES)}`,         // « Garrick le Silencieux »
  () => `${pick(TITRES)} ${syllableName()}`,            // « Capitaine Morwyn »
  () => `${syllableName()} ${pick(NOMS_COMPOSES)}`,     // « Selia Brisefer »
  () => `${syllableName()} de ${syllableName(2, 2)}`,   // « Vorden de Karak »
];

export function generateNpcName(){
  return pick(STRUCTURES)();
}
