// Parsing du texte libre "choix_A / choix_B" des historiques en objets structurés.
// Convention des données : "N po" isolé = de l'or ; "N <objet>" = quantité d'un objet.

export function parseEquipmentString(str){
  const items = [];
  let gold = 0;
  const tokens = String(str||'').split(',').map(t => t.trim()).filter(Boolean);
  for(const token of tokens){
    const goldMatch = token.match(/^(\d+(?:[.,]\d+)?)\s*po$/i);
    if(goldMatch){
      gold += parseFloat(goldMatch[1].replace(',', '.'));
      continue;
    }
    const qtyMatch = token.match(/^(\d+)\s+(.+)$/);
    let qty = 1, name = token;
    if(qtyMatch){ qty = parseInt(qtyMatch[1], 10); name = qtyMatch[2]; }
    name = name.charAt(0).toUpperCase() + name.slice(1);
    items.push({ name, qty });
  }
  return { items, gold };
}
