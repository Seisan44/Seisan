// Assistant de clôture de session : l'UNIQUE point d'écriture « session →
// campagne ». Trois étapes — relire le journal, valider les conséquences
// (états des créatures, objectifs des PJ, conséquences libres, notes de lore),
// rédiger le récap — puis tout s'applique d'un coup au classeur. Rien ne
// touche les entités globales sans passer par la validation finale du MJ.

import { el, escapeHtml } from '../utils.js';
import { openModal, toast } from '../ui.js';
import { findEntity, sessionLabel, commit, touch } from './store.js';
import { LOG_TAGS, ETAT_STATUTS, OBJECTIF_STATUTS, createObjectif } from './schema.js';
import { detectRefs, wikiLinkHTML } from './wiki.js';
import { richEditor } from './richtext.js';
import { openLoreForm } from './forms.js';

const etatLabel = k => ETAT_STATUTS.find(s => s.key === k)?.label ?? k;
const objectifLabel = k => OBJECTIF_STATUTS.find(s => s.key === k)?.label?.toLowerCase() ?? k;

export function openCloseoutWizard(session, { onDone } = {}){
  /* --- Qui est concerné ? Le plateau ∪ les entités citées au journal --- */
  const creatureIds = new Set(session.roster.creatures);
  for(const ev of session.log) for(const r of ev.refs || [])
    if(r.type === 'pnj' || r.type === 'monstre') creatureIds.add(r.id);
  const creatures = [...creatureIds].map(id => findEntity('pnj', id)).filter(Boolean);
  const pjs = session.roster.pjs.map(id => findEntity('pj', id)).filter(Boolean);

  /* --- État du wizard : des inputs construits UNE fois (les valeurs
         survivent aux allers-retours entre étapes), appliqués à la fin --- */
  const creatureEdits = creatures.map(cr => {
    const before = { statut: cr.etat?.statut ?? 'vivant', attitude: cr.etat?.attitude ?? '', lieu: cr.etat?.lieu ?? '', note: cr.etat?.note ?? '' };
    const statut = el('select', { class: 'select' }, ETAT_STATUTS.map(s => el('option', { value: s.key, text: `${s.icon ? `${s.icon} ` : ''}${s.label}` })));
    statut.value = before.statut;
    const mk = (v, ph) => { const i = el('input', { class: 'input', type: 'text', placeholder: ph }); i.value = v; return i; };
    return { cr, before, statut, attitude: mk(before.attitude, 'allié, hostile…'), lieu: mk(before.lieu, 'où est-il/elle désormais ?'), note: mk(before.note, 'note d’état') };
  });
  const pjEdits = pjs.map(pj => ({
    pj,
    objEdits: pj.objectifs.map(obj => {
      const select = el('select', { class: 'select' }, OBJECTIF_STATUTS.map(s => el('option', { value: s.key, text: s.label })));
      select.value = obj.statut;
      return { obj, before: obj.statut, select };
    }),
    nouvelObjectif: el('input', { class: 'input', type: 'text', placeholder: 'Nouvel objectif découvert en jeu… (optionnel)' }),
  }));
  const freeInputs = [];
  const loreCreated = [];
  const recapTa = el('textarea', { class: 'input', rows: 10 });
  recapTa.value = session.recap || '';
  const genRecap = () => session.log.map(ev => `• ${ev.texte}`).join('\n');

  /* --------------------------------- Rendu ---------------------------------- */

  const STEPS = ['Relecture du journal', 'Conséquences', 'Récap'];
  let step = 0;

  const stepsBar = el('div', { class: 'mj-wizard-steps' });
  const body = el('div', { class: 'mj-wizard-body' });
  const prevBtn = el('button', { class: 'btn btn-ghost', type: 'button', text: '← Précédent', onclick: () => go(step - 1) });
  const nextBtn = el('button', { class: 'btn btn-primary', type: 'button' });
  const foot = el('div', { class: 'mj-form-actions mj-wizard-foot' }, [prevBtn, nextBtn]);
  const node = el('div', { class: 'mj-wizard' }, [stepsBar, body, foot]);
  const modal = openModal({ title: `■ Clore — ${escapeHtml(sessionLabel(session))}`, node, className: 'modal-mj-form modal-wizard' });

  function go(n){
    step = Math.max(0, Math.min(STEPS.length - 1, n));
    stepsBar.replaceChildren(...STEPS.map((label, i) =>
      el('span', { class: `mj-wizard-step${i === step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`, text: `${i + 1}. ${label}` })));
    prevBtn.style.visibility = step === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = step === STEPS.length - 1 ? '✓ Clôturer la session' : 'Suivant →';
    nextBtn.className = step === STEPS.length - 1 ? 'btn btn-gold' : 'btn btn-primary';
    body.replaceChildren();
    if(step === 0) renderRelecture();
    else if(step === 1) renderConsequences();
    else renderRecapStep();
  }
  nextBtn.addEventListener('click', () => { step === STEPS.length - 1 ? apply() : go(step + 1); });

  /* --- Étape 1 : relire, corriger, retagger --- */
  function renderRelecture(){
    body.append(el('p', { class: 'mj-hint', text:
      'Relisez le journal de la partie : corrigez les textes, ajustez les tags (« En suspens » remontera dans la préparation de la prochaine session), supprimez le bruit.' }));
    if(!session.log.length){
      body.append(el('p', { class: 'mj-empty', text: 'Journal vide — passez à l’étape suivante.' }));
      return;
    }
    const list = el('div', { class: 'mj-wizard-log' });
    const refresh = () => {
      list.replaceChildren(...session.log.map(ev => {
        const tag = el('select', { class: 'select mj-log-tag-select' }, LOG_TAGS.map(t => el('option', { value: t.key, text: `${t.icon} ${t.label}` })));
        tag.value = ev.tag;
        tag.addEventListener('change', () => { ev.tag = tag.value; commit('session:log'); });
        const texte = el('input', { class: 'input', type: 'text' });
        texte.value = ev.texte;
        texte.addEventListener('change', () => {
          ev.texte = texte.value.trim();
          ev.refs = detectRefs(ev.texte);
          commit('session:log');
        });
        return el('div', { class: 'mj-wizard-log-row' }, [
          tag, texte,
          el('button', {
            class: 'icon-btn', type: 'button', 'aria-label': 'Supprimer',
            html: '<svg class="icon"><use href="#i-trash"/></svg>',
            onclick: () => { session.log = session.log.filter(x => x.id !== ev.id); commit('session:log'); refresh(); },
          }),
        ]);
      }));
    };
    refresh();
    body.append(list);
  }

  /* --- Étape 2 : les conséquences proposées, rien ne s'applique encore --- */
  function renderConsequences(){
    body.append(el('p', { class: 'mj-hint', text:
      'Mettez le monde à jour : seuls les champs que vous MODIFIEZ deviendront des conséquences (et nourriront l’historique de chaque fiche). Le reste ne bouge pas.' }));

    if(creatureEdits.length){
      body.append(el('h3', { class: 'mj-wizard-h', text: `🎭 Créatures de la session (${creatureEdits.length})` }));
      for(const e of creatureEdits){
        body.append(el('fieldset', { class: 'mj-wizard-entity' }, [
          el('legend', { html: wikiLinkHTML(e.cr.kind, e.cr.id, e.cr.nom) }),
          el('div', { class: 'mj-form-grid' }, [
            wfield('Statut', e.statut), wfield('Attitude', e.attitude),
            wfield('Lieu actuel', e.lieu), wfield('Note', e.note),
          ]),
        ]));
      }
    }

    if(pjEdits.length){
      body.append(el('h3', { class: 'mj-wizard-h', text: `🧙 Objectifs des joueurs présents` }));
      for(const pe of pjEdits){
        body.append(el('fieldset', { class: 'mj-wizard-entity' }, [
          el('legend', { html: wikiLinkHTML('pj', pe.pj.id, pe.pj.nom) }),
          pe.objEdits.length
            ? el('div', { class: 'mj-wizard-objectifs' }, pe.objEdits.map(oe =>
                el('div', { class: 'mj-wizard-obj-row' }, [
                  el('span', { class: 'mj-wizard-obj-texte', text: `🎯 ${oe.obj.texte}` }),
                  oe.select,
                ])))
            : el('p', { class: 'mj-empty', text: 'Aucun objectif suivi.' }),
          wfield('Découverte', pe.nouvelObjectif),
        ]));
      }
    }

    /* Conséquences hors fiches : texte libre, ou vraie note de lore. */
    body.append(el('h3', { class: 'mj-wizard-h', text: '➕ Autres conséquences' }));
    const freeList = el('div', { class: 'mj-list-editor' });
    const renderFree = () => {
      freeList.replaceChildren(
        ...freeInputs.map(input => el('div', { class: 'mj-wizard-log-row' }, [input])),
        ...loreCreated.map(n => el('p', { class: 'mj-wizard-lore', html: `📜 ${wikiLinkHTML('lore', n.id, n.titre)} <em>(note créée)</em>` })),
      );
    };
    renderFree();
    body.append(freeList, el('div', { class: 'mj-form-row' }, [
      el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Conséquence libre',
        onclick: () => {
          freeInputs.push(el('input', { class: 'input', type: 'text', placeholder: 'Ex. La garnison du col est en alerte' }));
          renderFree();
          freeList.lastElementChild?.querySelector('input')?.focus?.();
        },
      }),
      el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Note de lore',
        onclick: () => openLoreForm({ onSave: (n) => { loreCreated.push(n); renderFree(); } }),
      }),
    ]));
  }

  /* --- Étape 3 : le récap, pré-rempli depuis le journal --- */
  function renderRecapStep(){
    if(!recapTa.value.trim()) recapTa.value = genRecap();
    body.append(
      el('p', { class: 'mj-hint', text: 'Le brouillon reprend le journal ligne à ligne : réécrivez-le en quelques phrases — c’est lui que vous enverrez aux joueurs.' }),
      el('div', { class: 'mj-field' }, [
        el('label', { class: 'field-label', text: 'Récap de la session' }),
        richEditor(recapTa),
      ]),
      el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: '↺ Régénérer depuis le journal',
        onclick: () => { recapTa.value = genRecap(); recapTa.focus(); },
      }),
    );
  }

  /* ------------------------- Validation : tout s'applique ------------------- */

  function apply(){
    // Les refs du journal se complètent (une entité créée depuis peut matcher).
    for(const ev of session.log){
      const seen = new Set((ev.refs || []).map(r => `${r.type}:${r.id}`));
      for(const r of detectRefs(ev.texte)) if(!seen.has(`${r.type}:${r.id}`)) (ev.refs ||= []).push(r);
    }

    const consequences = [];

    for(const e of creatureEdits){
      const next = {
        statut: e.statut.value, attitude: e.attitude.value.trim(),
        lieu: e.lieu.value.trim(), note: e.note.value.trim(),
      };
      const changes = [];
      if(next.statut !== e.before.statut) changes.push(`statut : ${etatLabel(e.before.statut)} → ${etatLabel(next.statut)}`);
      if(next.attitude !== e.before.attitude) changes.push(`attitude : ${next.attitude || '—'}`);
      if(next.lieu !== e.before.lieu) changes.push(`lieu : ${next.lieu || '—'}`);
      if(next.note !== e.before.note) changes.push(`note : ${next.note || '—'}`);
      if(!changes.length) continue;
      e.cr.etat = next;
      touch(e.cr.kind, e.cr.id);
      consequences.push({ refType: e.cr.kind, refId: e.cr.id, resume: changes.join(' · ') });
    }

    for(const pe of pjEdits){
      let touched = false;
      for(const oe of pe.objEdits){
        if(oe.select.value === oe.before) continue;
        oe.obj.statut = oe.select.value;
        oe.obj.sessionId = oe.obj.statut === 'en_cours' ? null : session.id;
        consequences.push({ refType: 'pj', refId: pe.pj.id, resume: `Objectif « ${oe.obj.texte} » ${objectifLabel(oe.obj.statut)}` });
        touched = true;
      }
      const texte = pe.nouvelObjectif.value.trim();
      if(texte){
        pe.pj.objectifs.push(createObjectif({ texte }));
        consequences.push({ refType: 'pj', refId: pe.pj.id, resume: `Nouvel objectif : « ${texte} »` });
        touched = true;
      }
      if(touched) touch('pj', pe.pj.id);
    }

    for(const input of freeInputs){
      const texte = input.value.trim();
      if(texte) consequences.push({ refType: null, refId: null, resume: texte });
    }
    for(const n of loreCreated)
      consequences.push({ refType: 'lore', refId: n.id, resume: 'Note de lore née de la session' });

    session.consequences.push(...consequences);
    session.recap = recapTa.value.trim();
    session.statut = 'terminee';
    touch('session', session.id);
    commit('session:close');
    modal.close();
    toast(`Session clôturée — ${consequences.length} conséquence(s) appliquée(s) à la campagne`, { icon: '✅', duration: 3600 });
    onDone?.();
  }

  go(0);
}

const wfield = (label, control) => el('div', { class: 'mj-field' }, [
  el('label', { class: 'field-label', text: label }), control,
]);
