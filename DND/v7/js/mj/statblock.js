// Rendu d'un bloc de statistiques (créature de campagne ou monstre du bestiaire :
// les deux partagent la même forme, héritée de data/monstres.json).

import { el, escapeHtml } from '../utils.js';
import { ABILITIES } from './schema.js';
import { renderRichInline } from './richtext.js';

function statLine(label, value){
  if(!value) return null;
  return el('p', { class: 'mj-sb-line', html: `<strong>${label}.</strong> ${escapeHtml(value)}` });
}

function actionSection(title, items){
  if(!items?.length) return null;
  return el('section', { class: 'mj-sb-section' }, [
    el('h4', { text: title }),
    ...items.map(a => el('p', { class: 'mj-sb-action', html: `<strong>${escapeHtml(a.nom)}.</strong> ${renderRichInline(a.texte)}` })),
  ]);
}

export function statblockNode(sb){
  if(!sb) return el('p', { class: 'mj-empty', text: 'Pas de bloc de statistiques.' });

  const abilities = el('div', { class: 'mj-sb-abilities' }, ABILITIES.map(ab => {
    const c = sb.caracteristiques?.[ab];
    return el('div', { class: 'mj-sb-ability' }, [
      el('span', { class: 'mj-sb-ab-name', text: ab }),
      el('span', { class: 'mj-sb-ab-val', text: c ? String(c.valeur) : '—' }),
      el('span', { class: 'mj-sb-ab-mod', text: c ? `${c.mod} / JdS ${c.jds}` : '' }),
    ]);
  }));

  return el('div', { class: 'mj-statblock' }, [
    sb.type_texte && el('p', { class: 'mj-sb-type', text: sb.type_texte }),
    el('div', { class: 'mj-sb-vitals' }, [
      el('span', { html: `<strong>CA</strong> ${escapeHtml(sb.ca ?? '—')}` }),
      el('span', { html: `<strong>PV</strong> ${escapeHtml(sb.pv ?? '—')}` }),
      el('span', { html: `<strong>Vitesse</strong> ${escapeHtml(sb.vitesse ?? '—')}` }),
      el('span', { html: `<strong>Init.</strong> ${escapeHtml(sb.initiative ?? '—')}` }),
    ]),
    abilities,
    statLine('Compétences', sb.competences),
    statLine('Vulnérabilités', sb.vulnerabilites),
    statLine('Résistances', sb.resistances),
    statLine('Immunités', sb.immunites),
    statLine('Sens', sb.sens),
    statLine('Langues', sb.langues),
    statLine('FP', sb.fp_texte || sb.fp),
    actionSection('Traits', sb.traits),
    actionSection('Actions', sb.actions),
    actionSection('Actions bonus', sb.actions_bonus),
    actionSection('Réactions', sb.reactions),
    actionSection('Actions légendaires', sb.actions_legendaires),
  ]);
}
