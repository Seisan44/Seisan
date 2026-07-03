import { DATA } from '../data.js';
import { escapeHtml } from '../utils.js';
import { speciesImage, classImageLocal, imgWithFallback } from '../images.js';
import { parseClassTraits, parseStartingEquipmentChoices } from '../class-traits.js';
import { ABILITIES, STANDARD_ARRAY, LANGUAGES } from './rules.js';
import { createCharacterShell, saveCharacter, setActiveId, deleteCharacter, listCharacters } from './storage.js';
import { openAvatarPicker } from './avatar.js';
import { navigate } from '../router.js';
import { toast } from '../toast.js';
import { confirmAction } from '../confirm.js';

const STEPS = [
  { key:'espece', label:'Espèce' },
  { key:'classe', label:'Classe' },
  { key:'historique', label:'Historique' },
  { key:'caracteristiques', label:'Caractéristiques' },
  { key:'infos', label:'Infos' },
  { key:'resume', label:'Résumé' },
];

export function renderWizard(container, existingDraft){
  const draft = existingDraft || createCharacterShell();
  let stepIndex = Math.min(draft.step || 0, STEPS.length - 1);

  function persist(){ saveCharacter(draft); setActiveId(draft.id); }

  function renderShell(){
    container.innerHTML = `
      <header class="page-header">
        <p class="eyebrow">Forge de personnage</p>
        <h1 class="page-title">Créer un personnage</h1>
      </header>
      <div class="wizard">
        <div class="wizard-progress" id="wiz-progress"></div>
        <div class="frame wizard-panel" id="wiz-panel" style="padding:clamp(18px,4vw,32px);"></div>
        <div class="wizard-nav">
          <button class="btn btn-ghost" id="wiz-cancel">Annuler</button>
          <button class="btn btn-ghost" id="wiz-prev">&larr; Précédent</button>
          <span class="spacer"></span>
          <button class="btn btn-ghost btn-danger" id="wiz-reset">Recommencer</button>
          <button class="btn btn-primary" id="wiz-next">Suivant &rarr;</button>
        </div>
      </div>
    `;
    wireNav();
    renderProgress();
    renderStep();
  }

  function renderProgress(){
    const el = container.querySelector('#wiz-progress');
    el.innerHTML = STEPS.map((s, i) => `
      <div class="wizard-step-node ${i < stepIndex ? 'is-done' : ''} ${i === stepIndex ? 'is-active' : ''}">
        <div class="dot">${i < stepIndex ? '✓' : i+1}</div>
        <div class="lbl">${s.label}</div>
      </div>
    `).join('');
  }

  function wireNav(){
    container.querySelector('#wiz-cancel').addEventListener('click', async () => {
      const ok = await confirmAction({
        title:'Annuler la création',
        message:'Ce personnage en cours de création sera supprimé. Continuer ?',
        confirmLabel:'Annuler la création',
      });
      if(!ok) return;
      deleteCharacter(draft.id);
      navigate(listCharacters().length ? 'personnage/personnages' : 'accueil');
    });
    container.querySelector('#wiz-prev').addEventListener('click', () => {
      if(stepIndex === 0) return;
      stepIndex--; draft.step = stepIndex; persist();
      renderProgress(); renderStep();
    });
    container.querySelector('#wiz-next').addEventListener('click', () => {
      if(!validateStep(stepIndex)){
        toast('Complétez cette étape avant de continuer.', { type:'error' });
        return;
      }
      if(stepIndex === STEPS.length - 1){ finish(); return; }
      stepIndex++; draft.step = stepIndex; persist();
      renderProgress(); renderStep();
    });
    container.querySelector('#wiz-reset').addEventListener('click', async () => {
      const ok = await confirmAction({
        title:'Recommencer la création',
        message:'Toutes les sélections déjà faites pour ce personnage seront perdues. Continuer ?',
        confirmLabel:'Recommencer',
      });
      if(!ok) return;
      Object.assign(draft, createCharacterShell(), { id: draft.id });
      stepIndex = 0; persist();
      renderProgress(); renderStep();
    });
    updateNextLabel();
  }

  function updateNextLabel(){
    const btn = container.querySelector('#wiz-next');
    btn.textContent = stepIndex === STEPS.length - 1 ? 'Terminer la création ✓' : 'Suivant →';
  }

  function renderStep(){
    updateNextLabel();
    const panel = container.querySelector('#wiz-panel');
    const key = STEPS[stepIndex].key;
    if(key === 'espece') return renderEspeceStep(panel);
    if(key === 'classe') return renderClasseStep(panel);
    if(key === 'historique') return renderHistoriqueStep(panel);
    if(key === 'caracteristiques') return renderCaracStep(panel);
    if(key === 'infos') return renderInfosStep(panel);
    if(key === 'resume') return renderResumeStep(panel);
  }

  // ---------- ÉTAPE 1 : ESPÈCE ----------
  function renderEspeceStep(panel){
    panel.innerHTML = `
      <h2>Choisissez une espèce</h2>
      <p class="page-lede" style="font-size:.94em;margin-bottom:1.4em;">Votre origine façonne vos traits innés — vision, résistances, capacités spéciales.</p>
      <div class="option-grid" id="espece-grid">
        ${DATA.species.map(s => `
          <button type="button" class="option-card ${draft.species===s.espece?'is-selected':''}" data-espece="${escapeHtml(s.espece)}">
            ${imgWithFallback(speciesImage(s.espece), s.espece, { fallbackEmoji:'🧬' })}
            <div class="oc-body"><span class="oc-title">${escapeHtml(s.espece)}</span><span class="oc-check">✓</span></div>
          </button>
        `).join('')}
      </div>
      <div id="espece-preview" style="margin-top:1.6em;"></div>
    `;
    function renderPreview(){
      const s = DATA.species.find(x => x.espece === draft.species);
      const prev = panel.querySelector('#espece-preview');
      if(!s){ prev.innerHTML = ''; return; }
      prev.innerHTML = `
        <div class="divider"></div>
        <div class="detail-badges" style="margin-bottom:1em;">
          <span class="pill">${escapeHtml(s.infos?.['Type de créature']||'')}</span>
          <span class="pill">${escapeHtml(s.infos?.['Taille']||'')}</span>
          <span class="pill">${escapeHtml(s.infos?.['Vitesse']||'')}</span>
        </div>
        ${s.sous_especes?.length ? `
          <p class="field-label">Lignée (optionnel)</p>
          <div class="chip-group" id="espece-sub-chips" style="margin-bottom:1.2em;">
            ${s.sous_especes.map(se => `<button type="button" class="chip ${draft.speciesChoiceSubrace===se.nom?'is-selected':''}" data-sub="${escapeHtml(se.nom)}"><svg class="i"><use href="#i-check"/></svg>${escapeHtml(se.nom)}</button>`).join('')}
          </div>
        ` : ''}
        <p class="page-lede" style="font-size:.9em;">${(s.capacites||[]).slice(0,3).map(c=>c.nom).join(' · ')}</p>
      `;
      prev.querySelectorAll('[data-sub]').forEach(b => b.addEventListener('click', () => {
        draft.speciesChoiceSubrace = draft.speciesChoiceSubrace === b.dataset.sub ? null : b.dataset.sub;
        persist(); renderPreview();
      }));
    }
    panel.querySelectorAll('[data-espece]').forEach(card => card.addEventListener('click', () => {
      draft.species = card.dataset.espece;
      draft.speciesChoiceSubrace = null;
      persist();
      panel.querySelectorAll('[data-espece]').forEach(c => c.classList.toggle('is-selected', c === card));
      renderPreview();
    }));
    renderPreview();
  }

  // ---------- ÉTAPE 2 : CLASSE ----------
  function renderClasseStep(panel){
    panel.innerHTML = `
      <h2>Choisissez une classe</h2>
      <p class="page-lede" style="font-size:.94em;margin-bottom:1.4em;">Votre classe détermine vos capacités de combat, votre magie éventuelle et votre équipement de départ.</p>
      <div class="option-grid" id="classe-grid">
        ${DATA.classes.map(c => `
          <button type="button" class="option-card ${draft.className===c.classe_title?'is-selected':''}" data-classe="${escapeHtml(c.classe_title)}">
            ${imgWithFallback(classImageLocal(c.image), c.classe_title, { fallbackEmoji:'⚔️' })}
            <div class="oc-body"><span class="oc-title">${escapeHtml(c.classe_title)}</span><span class="oc-check">✓</span></div>
          </button>
        `).join('')}
      </div>
      <div id="classe-detail" style="margin-top:1.6em;"></div>
    `;
    function renderDetail(){
      const c = DATA.classes.find(x => x.classe_title === draft.className);
      const box = panel.querySelector('#classe-detail');
      if(!c){ box.innerHTML = ''; return; }
      const traits = parseClassTraits(c.html_traits_table);
      const equipOptions = parseStartingEquipmentChoices(c.html_traits_table);
      if(!equipOptions.some(o => o.label === draft.classEquipmentChoice)) draft.classEquipmentChoice = equipOptions[0]?.label || 'A';

      box.innerHTML = `
        <div class="divider"></div>
        <p class="field-label">Compétences de classe — choisissez-en ${traits.competences.count}</p>
        <div class="chip-group" id="classe-skill-chips" style="margin-bottom:1.4em;">
          ${traits.competences.options.map(op => `
            <button type="button" class="chip ${draft.classSkills.includes(op)?'is-selected':''}" data-skill="${escapeHtml(op)}">
              <svg class="i"><use href="#i-check"/></svg>${escapeHtml(op)}
            </button>
          `).join('')}
        </div>
        <p class="field-label">Équipement de départ</p>
        <div class="choice-toggle" id="classe-equip-toggle" style="margin-bottom:1em;flex-wrap:wrap;">
          ${equipOptions.map(o => `<button type="button" class="btn btn-sm ${draft.classEquipmentChoice===o.label?'is-selected':''}" data-label="${o.label}">Option ${o.label}</button>`).join('')}
        </div>
        <div class="histo-choice" id="classe-equip-preview" style="max-width:480px;"></div>
      `;
      function renderEquipPreview(){
        const opt = equipOptions.find(o => o.label === draft.classEquipmentChoice) || equipOptions[0];
        panel.querySelector('#classe-equip-preview').innerHTML = opt ? `
          <ul>
            ${opt.items.map(it => `<li>${it.qty>1?`${it.qty}× `:''}${escapeHtml(it.name)}</li>`).join('')}
            ${opt.gold ? `<li class="histo-gold">${opt.gold} po</li>` : ''}
          </ul>` : '<p>Aucune donnée.</p>';
      }
      renderEquipPreview();
      box.querySelectorAll('[data-skill]').forEach(chip => chip.addEventListener('click', () => {
        const val = chip.dataset.skill;
        const idx = draft.classSkills.indexOf(val);
        if(idx >= 0){ draft.classSkills.splice(idx,1); }
        else {
          if(draft.classSkills.length >= traits.competences.count){
            toast(`Vous ne pouvez choisir que ${traits.competences.count} compétences.`, { type:'error' });
            return;
          }
          draft.classSkills.push(val);
        }
        persist();
        chip.classList.toggle('is-selected');
      }));
      box.querySelectorAll('[data-label]').forEach(btn => btn.addEventListener('click', () => {
        draft.classEquipmentChoice = btn.dataset.label;
        persist();
        box.querySelectorAll('[data-label]').forEach(b => b.classList.toggle('is-selected', b===btn));
        renderEquipPreview();
      }));
    }
    panel.querySelectorAll('[data-classe]').forEach(card => card.addEventListener('click', () => {
      if(draft.className !== card.dataset.classe) draft.classSkills = [];
      draft.className = card.dataset.classe;
      persist();
      panel.querySelectorAll('[data-classe]').forEach(c => c.classList.toggle('is-selected', c === card));
      renderDetail();
    }));
    renderDetail();
  }

  // ---------- ÉTAPE 3 : HISTORIQUE ----------
  function renderHistoriqueStep(panel){
    panel.innerHTML = `
      <h2>Choisissez un historique</h2>
      <p class="page-lede" style="font-size:.94em;margin-bottom:1.4em;">Votre passé accorde des compétences, un don et un point de départ matériel.</p>
      <div class="option-grid" id="histo-grid">
        ${DATA.historiques.map(h => `
          <button type="button" class="option-card ${draft.background===h.nom?'is-selected':''}" data-histo="${escapeHtml(h.nom)}" style="aspect-ratio:auto;">
            <div class="oc-body" style="padding:18px 14px;">
              <span style="font-size:1.5rem;">📖</span>
              <div class="oc-title" style="margin-top:.4em;">${escapeHtml(h.nom)}</div>
              <span class="oc-check">✓</span>
            </div>
          </button>
        `).join('')}
      </div>
      <div id="histo-detail" style="margin-top:1.6em;"></div>
    `;
    function renderDetail(){
      const h = DATA.historiques.find(x => x.nom === draft.background);
      const box = panel.querySelector('#histo-detail');
      if(!h){ box.innerHTML = ''; return; }
      box.innerHTML = `
        <div class="divider"></div>
        <div class="detail-badges" style="margin-bottom:1em;">
          <span class="pill">Don : ${escapeHtml(h.don)}</span>
          <span class="pill">Compétences : ${h.maitriser_competence.map(escapeHtml).join(', ')}</span>
          <span class="pill">Outils : ${escapeHtml(h.maitrise_outils)}</span>
        </div>
        <p class="field-label">Équipement de départ</p>
        <div class="choice-toggle" id="histo-equip-toggle" style="margin-bottom:1em;">
          <button type="button" class="btn btn-sm ${draft.backgroundEquipmentChoice==='A'?'is-selected':''}" data-label="A">Option A</button>
          <button type="button" class="btn btn-sm ${draft.backgroundEquipmentChoice==='B'?'is-selected':''}" data-label="B">Option B</button>
        </div>
        <div class="histo-choice" id="histo-equip-preview" style="max-width:480px;"></div>
      `;
      function renderPreview(){
        const choice = draft.backgroundEquipmentChoice === 'B' ? h._equipB : h._equipA;
        box.querySelector('#histo-equip-preview').innerHTML = `
          <ul>
            ${choice.items.map(it => `<li>${it.qty>1?`${it.qty}× `:''}${escapeHtml(it.name)}</li>`).join('')}
            ${choice.gold ? `<li class="histo-gold">${choice.gold} po</li>` : ''}
          </ul>`;
      }
      renderPreview();
      box.querySelectorAll('[data-label]').forEach(btn => btn.addEventListener('click', () => {
        draft.backgroundEquipmentChoice = btn.dataset.label;
        persist();
        box.querySelectorAll('[data-label]').forEach(b => b.classList.toggle('is-selected', b===btn));
        renderPreview();
      }));
    }
    panel.querySelectorAll('[data-histo]').forEach(card => card.addEventListener('click', () => {
      draft.background = card.dataset.histo;
      draft.backgroundEquipmentChoice = 'A';
      persist();
      panel.querySelectorAll('[data-histo]').forEach(c => c.classList.toggle('is-selected', c === card));
      renderDetail();
    }));
    renderDetail();
  }

  // ---------- ÉTAPE 4 : CARACTÉRISTIQUES ----------
  function renderCaracStep(panel){
    if(!draft.abilityBonusChoice) draft.abilityBonusChoice = { mode:'2-1', plus2:null, plus1:null };
    if(!draft.abilityAssign) draft.abilityAssign = {};

    const histo = DATA.historiques.find(h => h.nom === draft.background);
    const eligible = histo ? histo.valeurs_caracteristique : [];

    panel.innerHTML = `
      <h2>Répartissez vos caractéristiques</h2>
      <p class="page-lede" style="font-size:.94em;">Méthode du tableau standard : attribuez librement 15, 14, 13, 12, 10 et 8 entre vos six caractéristiques.</p>
      ${histo ? `
        <div class="divider"></div>
        <p class="field-label">Bonus d’historique (${escapeHtml(histo.nom)}) — parmi ${eligible.map(escapeHtml).join(', ')}</p>
        <div class="choice-toggle" id="carac-mode-toggle" style="max-width:420px;margin-bottom:1em;">
          <button type="button" class="btn btn-sm ${draft.abilityBonusChoice.mode==='2-1'?'is-selected':''}" data-mode="2-1">+2 / +1</button>
          <button type="button" class="btn btn-sm ${draft.abilityBonusChoice.mode==='1-1-1'?'is-selected':''}" data-mode="1-1-1">+1 / +1 / +1</button>
        </div>
        <div id="carac-bonus-picker" style="margin-bottom:1.6em;"></div>
      ` : `<p style="margin:1em 0;color:var(--ink-faint);">Choisissez d’abord un historique pour débloquer la répartition des bonus.</p>`}
      <div class="divider"></div>
      <div class="abil-grid" id="abil-grid"></div>
    `;

    function bonusFor(abilityLabel){
      const bc = draft.abilityBonusChoice;
      if(!histo) return 0;
      if(bc.mode === '1-1-1') return eligible.includes(abilityLabel) ? 1 : 0;
      if(bc.plus2 === abilityLabel) return 2;
      if(bc.plus1 === abilityLabel) return 1;
      return 0;
    }

    function renderBonusPicker(){
      if(!histo) return;
      const box = panel.querySelector('#carac-bonus-picker');
      const bc = draft.abilityBonusChoice;
      if(bc.mode === '1-1-1'){ box.innerHTML = `<p style="color:var(--ink-dim);font-size:.9em;">+1 appliqué à ${eligible.map(escapeHtml).join(', ')}.</p>`; return; }
      box.innerHTML = `
        <div class="flex-gap">
          <div>
            <p class="field-label">+2 à</p>
            <div class="chip-group">${eligible.map(a => `<button type="button" class="chip ${bc.plus2===a?'is-selected':''}" data-plus2="${escapeHtml(a)}">${escapeHtml(a)}</button>`).join('')}</div>
          </div>
          <div>
            <p class="field-label">+1 à</p>
            <div class="chip-group">${eligible.filter(a=>a!==bc.plus2).map(a => `<button type="button" class="chip ${bc.plus1===a?'is-selected':''}" data-plus1="${escapeHtml(a)}">${escapeHtml(a)}</button>`).join('')}</div>
          </div>
        </div>
      `;
      box.querySelectorAll('[data-plus2]').forEach(b => b.addEventListener('click', () => {
        bc.plus2 = bc.plus2 === b.dataset.plus2 ? null : b.dataset.plus2;
        if(bc.plus1 === bc.plus2) bc.plus1 = null;
        persist(); renderBonusPicker(); renderAbilGrid();
      }));
      box.querySelectorAll('[data-plus1]').forEach(b => b.addEventListener('click', () => {
        bc.plus1 = bc.plus1 === b.dataset.plus1 ? null : b.dataset.plus1;
        persist(); renderBonusPicker(); renderAbilGrid();
      }));
    }

    function usedValues(){
      return Object.values(draft.abilityAssign).filter(Boolean);
    }
    function renderAbilGrid(){
      const grid = panel.querySelector('#abil-grid');
      const used = usedValues();
      grid.innerHTML = ABILITIES.map(a => {
        const assigned = draft.abilityAssign[a.key] || '';
        const bonus = bonusFor(a.label);
        const final = assigned ? Number(assigned) + bonus : null;
        const mod = final != null ? Math.floor((final-10)/2) : null;
        return `
        <div class="abil-card frame">
          <div class="abil-name">${escapeHtml(a.label)}</div>
          <select class="field abil-select" data-abil="${a.key}">
            <option value="">—</option>
            ${STANDARD_ARRAY.map(v => `<option value="${v}" ${String(v)===String(assigned)?'selected':''} ${used.includes(v) && String(v)!==String(assigned) ? 'disabled':''}>${v}</option>`).join('')}
          </select>
          ${bonus ? `<div class="abil-breakdown">+${bonus} historique</div>` : ''}
          <div class="abil-final">${final ?? '—'}</div>
          <div class="abil-breakdown">${mod != null ? `modificateur ${mod>=0?'+':''}${mod}` : ''}</div>
        </div>`;
      }).join('');
      grid.querySelectorAll('.abil-select').forEach(sel => sel.addEventListener('change', () => {
        draft.abilityAssign[sel.dataset.abil] = sel.value ? Number(sel.value) : null;
        persist(); renderAbilGrid();
      }));
    }

    panel.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => {
      draft.abilityBonusChoice.mode = b.dataset.mode;
      draft.abilityBonusChoice.plus2 = null; draft.abilityBonusChoice.plus1 = null;
      persist();
      panel.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('is-selected', x===b));
      renderBonusPicker(); renderAbilGrid();
    }));
    renderBonusPicker();
    renderAbilGrid();
  }

  // ---------- ÉTAPE 5 : INFOS ----------
  function renderInfosStep(panel){
    if(!draft.languages.length) draft.languages = ['Commun'];
    if(draft.profile.avatar === undefined) draft.profile.avatar = null;
    const fallbackHTML = draft.species ? imgWithFallback(speciesImage(draft.species), draft.species, { fallbackEmoji:'🧬' }) : '🧬';
    panel.innerHTML = `
      <h2>Qui est votre personnage ?</h2>
      <p class="field-label">Portrait <span class="hint-inline">(optionnel — modifiable à tout moment depuis la fiche)</span></p>
      <div class="avatar-picker-inline" id="wiz-avatar-box" style="margin-bottom:1.4em;"></div>
      <div class="abil-grid" style="grid-template-columns:1fr;max-width:560px;gap:16px;">
        <div>
          <label class="field-label" for="info-name">Nom du personnage</label>
          <input type="text" class="field" id="info-name" value="${escapeHtml(draft.profile.name)}" placeholder="Ex. Elyndra Vent-d’Argent">
        </div>
        <div>
          <label class="field-label" for="info-appearance">Apparence</label>
          <textarea class="field" id="info-appearance" rows="3" placeholder="Silhouette, regard, tenue, signes distinctifs…">${escapeHtml(draft.profile.appearance)}</textarea>
        </div>
        <div>
          <label class="field-label" for="info-backstory">Autres détails</label>
          <textarea class="field" id="info-backstory" rows="4" placeholder="Origines, motivations, un secret, une relation qui compte…">${escapeHtml(draft.profile.backstory)}</textarea>
        </div>
      </div>
      <p class="field-label" style="margin-top:1.4em;">Langues parlées</p>
      <div class="chip-group" id="lang-chips">
        ${LANGUAGES.map(l => `<button type="button" class="chip ${draft.languages.includes(l)?'is-selected':''}" data-lang="${escapeHtml(l)}"><svg class="i"><use href="#i-check"/></svg>${escapeHtml(l)}</button>`).join('')}
      </div>
    `;
    function renderAvatarBox(){
      const box = panel.querySelector('#wiz-avatar-box');
      box.innerHTML = `
        <button type="button" class="avatar-picker-trigger" id="wiz-avatar-trigger" aria-label="Choisir un portrait">
          ${draft.profile.avatar ? `<img src="${draft.profile.avatar}" alt="Portrait du personnage">` : fallbackHTML}
          <span class="avatar-picker-edit"><svg class="i"><use href="#i-plus"/></svg></span>
        </button>
      `;
      box.querySelector('#wiz-avatar-trigger').addEventListener('click', (e) => {
        openAvatarPicker({
          currentSrc: draft.profile.avatar,
          fallbackHTML,
          originEl: e.currentTarget,
          onSave: (dataURL) => { draft.profile.avatar = dataURL; persist(); renderAvatarBox(); },
          onRemove: () => { draft.profile.avatar = null; persist(); renderAvatarBox(); },
        });
      });
    }
    renderAvatarBox();
    panel.querySelector('#info-name').addEventListener('input', (e) => { draft.profile.name = e.target.value; persist(); });
    panel.querySelector('#info-appearance').addEventListener('input', (e) => { draft.profile.appearance = e.target.value; persist(); });
    panel.querySelector('#info-backstory').addEventListener('input', (e) => { draft.profile.backstory = e.target.value; persist(); });
    panel.querySelectorAll('[data-lang]').forEach(chip => chip.addEventListener('click', () => {
      const l = chip.dataset.lang;
      const idx = draft.languages.indexOf(l);
      if(idx >= 0) draft.languages.splice(idx,1); else draft.languages.push(l);
      persist();
      chip.classList.toggle('is-selected');
    }));
  }

  // ---------- ÉTAPE 6 : RÉSUMÉ ----------
  function renderResumeStep(panel){
    const s = DATA.species.find(x => x.espece === draft.species);
    const c = DATA.classes.find(x => x.classe_title === draft.className);
    const h = DATA.historiques.find(x => x.nom === draft.background);
    const traits = c ? parseClassTraits(c.html_traits_table) : null;
    const equipOptions = c ? parseStartingEquipmentChoices(c.html_traits_table) : [];
    const classEquip = equipOptions.find(o => o.label === draft.classEquipmentChoice);
    const histoEquip = h ? (draft.backgroundEquipmentChoice==='B' ? h._equipB : h._equipA) : null;
    const totalGold = (classEquip?.gold||0) + (histoEquip?.gold||0);
    const hp = traits ? traits.deVieFaces + Math.floor(((finalScore('constitution')||10)-10)/2) : 10;

    function finalScore(key){
      const a = ABILITIES.find(x=>x.key===key);
      const base = draft.abilityAssign[key];
      if(!base) return null;
      let bonus = 0;
      if(h){
        const bc = draft.abilityBonusChoice;
        if(bc?.mode === '1-1-1') bonus = h.valeurs_caracteristique.includes(a.label) ? 1 : 0;
        else if(bc?.plus2 === a.label) bonus = 2;
        else if(bc?.plus1 === a.label) bonus = 1;
      }
      return base + bonus;
    }

    panel.innerHTML = `
      <h2>${escapeHtml(draft.profile.name || 'Votre personnage')}</h2>
      <p class="page-lede" style="font-size:.94em;margin-bottom:1.4em;">Vérifiez votre création avant de la finaliser. Vous pourrez continuer à faire évoluer votre personnage depuis sa fiche.</p>
      <div class="summary-grid">
        <div class="summary-block frame">
          <h3>Origine</h3>
          <p>${escapeHtml(s?.espece||'—')}${draft.speciesChoiceSubrace ? ` (${escapeHtml(draft.speciesChoiceSubrace)})` : ''}</p>
          <p>${escapeHtml(h?.nom||'—')}</p>
        </div>
        <div class="summary-block frame">
          <h3>Classe</h3>
          <p>${escapeHtml(c?.classe_title||'—')} — Niveau 1</p>
          <p style="font-size:.85em;color:var(--ink-faint);">${draft.classSkills.map(escapeHtml).join(', ')}</p>
        </div>
        <div class="summary-block frame">
          <h3>Points de vie</h3>
          <p class="abil-final" style="text-align:left;">${hp}</p>
        </div>
        <div class="summary-block frame">
          <h3>Bourse</h3>
          <p class="abil-final" style="text-align:left;">${totalGold} po</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="abil-grid">
        ${ABILITIES.map(a => {
          const f = finalScore(a.key);
          const mod = f!=null ? Math.floor((f-10)/2) : null;
          return `<div class="abil-card frame"><div class="abil-name">${escapeHtml(a.label)}</div><div class="abil-final">${f ?? '—'}</div><div class="abil-breakdown">${mod!=null?`${mod>=0?'+':''}${mod}`:''}</div></div>`;
        }).join('')}
      </div>
      <div class="divider"></div>
      <p class="field-label">Inventaire de départ</p>
      <ul class="prose">
        ${[...(classEquip?.items||[]), ...(histoEquip?.items||[])].map(it => `<li>${it.qty>1?`${it.qty}× `:''}${escapeHtml(it.name)}</li>`).join('')}
      </ul>
      <p class="field-label">Langues</p>
      <p>${draft.languages.map(escapeHtml).join(', ') || '—'}</p>
    `;
  }

  // ---------- VALIDATION ----------
  function validateStep(idx){
    const key = STEPS[idx].key;
    if(key === 'espece') return !!draft.species;
    if(key === 'classe') return !!draft.className && !!draft.classEquipmentChoice;
    if(key === 'historique') return !!draft.background;
    if(key === 'caracteristiques'){
      const allAssigned = ABILITIES.every(a => draft.abilityAssign?.[a.key]);
      if(!allAssigned) return false;
      const h = DATA.historiques.find(x => x.nom === draft.background);
      if(h && draft.abilityBonusChoice?.mode === '2-1'){
        return !!draft.abilityBonusChoice.plus2 && !!draft.abilityBonusChoice.plus1;
      }
      return true;
    }
    if(key === 'infos') return draft.profile.name.trim().length > 0;
    return true;
  }

  // ---------- FINALISATION ----------
  function finish(){
    const c = DATA.classes.find(x => x.classe_title === draft.className);
    const h = DATA.historiques.find(x => x.nom === draft.background);
    const traits = parseClassTraits(c.html_traits_table);
    const equipOptions = parseStartingEquipmentChoices(c.html_traits_table);
    const classEquip = equipOptions.find(o => o.label === draft.classEquipmentChoice) || { items:[], gold:0 };
    const histoEquip = draft.backgroundEquipmentChoice==='B' ? h._equipB : h._equipA;

    const finalAbilities = {};
    for(const a of ABILITIES){
      const base = draft.abilityAssign[a.key] || 10;
      let bonus = 0;
      const bc = draft.abilityBonusChoice;
      if(bc?.mode === '1-1-1') bonus = h.valeurs_caracteristique.includes(a.label) ? 1 : 0;
      else if(bc?.plus2 === a.label) bonus = 2;
      else if(bc?.plus1 === a.label) bonus = 1;
      finalAbilities[a.key] = base + bonus;
    }
    const conMod = Math.floor((finalAbilities.constitution-10)/2);
    const maxHp = traits.deVieFaces + conMod;

    draft.abilities = finalAbilities;
    draft.level = 1;
    draft.hp = { max: Math.max(1,maxHp), current: Math.max(1,maxHp), temp: 0 };
    draft.gold = { pp:0, po: (classEquip.gold||0) + (histoEquip.gold||0), pe:0, pa:0, pc:0 };
    draft.inventory = [...classEquip.items, ...histoEquip.items].map(it => ({ name: it.name, qty: it.qty }));
    draft.savingThrows = traits.sauvegardes;
    draft.subclass = null;
    draft.complete = true;
    draft.step = STEPS.length - 1;
    persist();
    toast('Personnage créé !', { type:'success' });
    navigate('personnage');
  }

  renderShell();
}
