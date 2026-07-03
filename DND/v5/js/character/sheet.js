import { DATA } from '../data.js';
import { escapeHtml, clamp, stripAccents } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { speciesImage, spellImage, imgWithFallback } from '../images.js';
import { ABILITIES, proficiencyBonus, isCasterClass, SPELLCASTING_ABILITY, PREPARED_CASTERS, SKILL_ABILITY, CASTER_TYPE, computeArmorClass, computeSpeed, spellSaveDC, spellAttackBonus, passivePerception, CLASS_RESOURCE_DEFS, classResourceValue, weaponMasteryCount, hasWeaponMastery, superiorityDice, maneuversKnownCount, MANEUVERS_2024, metamagicKnownCount, METAMAGIC_2024, manifestationsKnownCount } from './rules.js';
import { parseClassTraits, parseSpellcastingTable, parseClassResourceColumns, ALL_SKILLS } from '../class-traits.js';
import { saveCharacter, deleteCharacter, setActiveId } from './storage.js';
import { attachPopover } from '../popover.js';
import { openModal, closeModal } from '../modal.js';
import { confirmAction } from '../confirm.js';
import { toast } from '../toast.js';
import { navigate } from '../router.js';
import { openSpellDetail, SCHOOL_ICON, SCHOOL_COLOR, castingTimeShort } from '../pages/sorts.js';
import { openDiceRoller, rollDice } from '../dice.js';
import { COMBAT_ACTIONS } from '../pages/combat-content.js';
import { openAvatarPicker } from './avatar.js';

const TABS = [
  { key:'actions', label:'Actions' },
  { key:'traits', label:'Traits' },
  { key:'sorts', label:'Sorts' },
  { key:'inventaire', label:'Inventaire' },
  { key:'or', label:'Or' },
  { key:'profil', label:'Profil' },
  { key:'notes', label:'Notes' },
];

// Conversion standard des pièces vers l'équivalent en pièces d'or (règles D&D).
const COIN_RATES = [['pp','Platine',10],['po','Or',1],['pe','Électrum',0.5],['pa','Argent',0.1],['pc','Cuivre',0.01]];

const ITEM_KIND_LABEL = { materiel:'Matériel', outil:'Outil', arme:'Arme', armure:'Armure', objet_magique:'Objet magique' };

// Bloc de description repliable par défaut : allège la lecture d'une longue liste de
// capacités — on ouvre seulement celles qui nous intéressent.
function capaciteBlockHTML(title, bodyHtml, badge = ''){
  return `
    <article class="capacite-block is-collapsible">
      <button type="button" class="capacite-toggle" data-cap-toggle>
        <span class="capacite-toggle-title">${badge}${escapeHtml(title)}</span>
        <svg class="i chevron"><use href="#i-chevron"/></svg>
      </button>
      <div class="capacite-body"><div class="prose">${bodyHtml}</div></div>
    </article>
  `;
}
function wireCollapsibles(panel){
  panel.querySelectorAll('[data-cap-toggle]').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.is-collapsible').classList.toggle('is-expanded'));
  });
}

// Résumé texte brut (sans balises) d'une description HTML — utilisé pour les aperçus de
// sous-classe dans le sélecteur, où une carte compacte ne peut pas se permettre du HTML riche.
function textExcerpt(html, n = 150){
  const text = String(html||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  return text.length > n ? `${text.slice(0, n).trimEnd()}…` : text;
}

// Cartes de la page Combat (grille repliable au clic) : réutilisées ici pour les attaques
// et les actions courantes, afin que la fiche de personnage ait le même vocabulaire visuel.
function wireActionCards(panel){
  panel.querySelectorAll('.cbt-action-card').forEach(card => {
    const toggle = (e) => {
      if(e.target.closest('[data-dice-roll]')) return;
      card.classList.toggle('is-open');
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if(e.target.closest('[data-dice-roll]')) return;
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(e); }
    });
  });
}

export function renderSheet(container, character){
  let ch = character;
  let activeTab = 'actions';
  const isCaster = isCasterClass(ch.className);
  const tabs = TABS.filter(t => t.key !== 'sorts' || isCaster);

  // Migration douce des personnages sauvegardés avant l'ajout des platines/électrum et
  // des dés de vie — on complète les champs manquants sans rien écraser.
  ch.gold = Object.assign({ pp:0, po:0, pe:0, pa:0, pc:0 }, ch.gold || {});
  ch.hitDiceUsed = ch.hitDiceUsed || 0;
  ch.profile = Object.assign({ name:'', appearance:'', notes:'', backstory:'', avatar:null }, ch.profile || {});
  ch.usedResources = ch.usedResources || {};
  ch.maneuvers = ch.maneuvers || [];
  ch.metamagic = ch.metamagic || [];
  ch.manifestations = ch.manifestations || [];
  ch.weaponMasteries = ch.weaponMasteries || [];

  function persist(){ ch.updatedAt = Date.now(); saveCharacter(ch); }

  function avatarInnerHTML(){
    if(ch.profile?.avatar) return `<img src="${ch.profile.avatar}" alt="Portrait de ${escapeHtml(ch.profile?.name||'')}">`;
    return ch.species ? imgWithFallback(speciesImage(ch.species), ch.species, { fallbackEmoji:'🐉' }) : '🐉';
  }
  function wireAvatar(){
    const btn = container.querySelector('#char-avatar-btn');
    btn.addEventListener('click', () => {
      openAvatarPicker({
        currentSrc: ch.profile?.avatar || null,
        fallbackHTML: ch.species ? imgWithFallback(speciesImage(ch.species), ch.species, { fallbackEmoji:'🐉' }) : '🐉',
        originEl: btn,
        onSave: (dataURL) => {
          ch.profile.avatar = dataURL;
          persist();
          btn.innerHTML = avatarInnerHTML() + '<span class="avatar-picker-edit"><svg class="i"><use href="#i-plus"/></svg></span>';
        },
        onRemove: () => {
          ch.profile.avatar = null;
          persist();
          btn.innerHTML = avatarInnerHTML() + '<span class="avatar-picker-edit"><svg class="i"><use href="#i-plus"/></svg></span>';
        },
      });
    });
  }

  function abilityMod(key){
    const score = ch.abilities?.[key] ?? 10;
    return Math.floor((score - 10) / 2);
  }
  function fmtMod(n){ return n >= 0 ? `+${n}` : `${n}`; }

  // ---------- ÉQUIPEMENT (règles D&D des emplacements de mains) ----------
  function itemLookedUp(it){ return DATA.lookupItem(it.name) || DATA.lookupItem(it.name.replace(/s$/,'')); }
  function isTwoHanded(looked){ return (looked?.proprietes||[]).some(p => /deux mains/i.test(p)); }

  /**
   * `it.equipped` vaut null, 'main', 'off', 'twohand' ou 'armor'. Une arme à deux mains
   * occupe 'twohand' (libère main ET secondaire) ; un bouclier occupe 'off' (une seule
   * main) ; une armure occupe 'armor' (n'utilise pas les mains). Un seul objet par
   * emplacement à la fois — équiper en libère automatiquement l'ancien occupant.
   */
  function setEquip(idx, slot){
    const it = ch.inventory[idx];
    if(!it) return;
    if(it.equipped === slot){
      it.equipped = null;
      persist();
      toast(`${it.name} déséquipé.`, { type:'info' });
      afterEquipChange();
      return;
    }
    if(slot === 'armor'){
      ch.inventory.forEach(i => { if(i.equipped === 'armor') i.equipped = null; });
    } else if(slot === 'twohand'){
      ch.inventory.forEach(i => { if(i.equipped === 'main' || i.equipped === 'off' || i.equipped === 'twohand') i.equipped = null; });
    } else if(slot === 'main'){
      ch.inventory.forEach(i => { if(i.equipped === 'main' || i.equipped === 'twohand') i.equipped = null; });
    } else if(slot === 'off'){
      ch.inventory.forEach(i => { if(i.equipped === 'off' || i.equipped === 'twohand') i.equipped = null; });
    }
    it.equipped = slot;
    persist();
    toast(`${it.name} équipé.`, { type:'success' });
    afterEquipChange();
  }
  function afterEquipChange(){ renderVitals(); renderTabPanel(); }

  // Personnages créés avant l'équipement : on équipe une fois, automatiquement, la
  // première armure/bouclier/arme trouvés dans l'inventaire de départ, pour que
  // l'onglet Actions ne se retrouve pas subitement vide.
  function autoEquipStarterGear(){
    if(ch.equipMigrated) return;
    ch.equipMigrated = true;
    let hasArmor = false, hasOff = false, hasMain = false;
    for(const it of ch.inventory){
      const looked = itemLookedUp(it);
      if(looked?.kind === 'armure' && looked.categorie !== 'Boucliers' && !hasArmor){ it.equipped = 'armor'; hasArmor = true; }
    }
    for(const it of ch.inventory){
      const looked = itemLookedUp(it);
      if(looked?.kind === 'armure' && looked.categorie === 'Boucliers' && !hasOff){ it.equipped = 'off'; hasOff = true; }
    }
    for(const it of ch.inventory){
      if(it.equipped) continue;
      const looked = itemLookedUp(it);
      if(looked?.kind !== 'arme') continue;
      if(!hasMain){
        it.equipped = isTwoHanded(looked) ? 'twohand' : 'main';
        hasMain = true;
        if(it.equipped === 'twohand') hasOff = true;
      } else if(!hasOff && !isTwoHanded(looked)){
        it.equipped = 'off'; hasOff = true;
      }
    }
    persist();
  }
  autoEquipStarterGear();

  function renderShell(){
    container.innerHTML = `
      <div class="char-sheet">
        <div class="frame char-topbar">
          <button type="button" class="char-avatar" id="char-avatar-btn" aria-label="Modifier le portrait">${avatarInnerHTML()}<span class="avatar-picker-edit"><svg class="i"><use href="#i-plus"/></svg></span></button>
          <div class="char-idbox">
            <h1>${escapeHtml(ch.profile?.name || 'Aventurier sans nom')}</h1>
            <p class="sub">${escapeHtml(ch.species||'')}${ch.speciesChoiceSubrace?` (${escapeHtml(ch.speciesChoiceSubrace)})`:''} · ${escapeHtml(ch.className||'')} niv. ${ch.level||1} · ${escapeHtml(ch.background||'')}</p>
          </div>
          <div class="char-actions-top">
            <a href="#personnage/personnages" class="btn btn-sm btn-ghost">Mes personnages</a>
            <a href="#personnage/nouveau" class="btn btn-sm btn-ghost"><svg class="i"><use href="#i-plus"/></svg> Nouveau</a>
            <button class="btn btn-sm btn-ghost" id="char-print"><svg class="i"><use href="#i-histo"/></svg> Imprimer</button>
            <button class="btn btn-sm btn-danger" id="char-delete"><svg class="i"><use href="#i-trash"/></svg></button>
          </div>
        </div>

        <div class="frame char-vitals-panel" id="char-vitals"></div>

        <div class="char-stats-row">
          <div class="frame hp-widget" id="hp-widget"></div>
          <div class="frame char-abilities-panel">
            <p class="field-label" style="margin-bottom:10px;">Caractéristiques <span class="hint-inline">(modifiables)</span></p>
            <div class="stat-grid" id="stat-grid"></div>
            <p class="field-label" style="margin:16px 0 10px;">Jets de sauvegarde</p>
            <div class="save-grid" id="save-grid"></div>
          </div>
        </div>

        <div class="char-main-grid">
          <aside class="frame char-sidebar" id="char-sidebar"></aside>
          <div class="char-panel-wrap">
            <div class="tabs" role="tablist" id="char-tabs">
              ${tabs.map(t => `<button class="tab" role="tab" data-tab="${t.key}">${t.label}</button>`).join('')}
            </div>
            <div class="tabpanel" id="char-panel"></div>
          </div>
        </div>
      </div>
      <div class="print-sheet print-only" id="print-sheet"></div>
    `;

    renderVitals();
    renderHpWidget();
    renderStatGrid();
    renderSaveGrid();
    renderSidebar();
    wireTopbar();
    wireAvatar();

    const tabBtns = container.querySelectorAll('.tab');
    function selectTab(key){
      activeTab = key;
      tabBtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === key)));
      renderTabPanel();
    }
    tabBtns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
    selectTab(tabs[0].key);
    renderPrintSheet();
  }

  // Recalcule tout ce qui dépend des caractéristiques/niveau/équipement — appelé après
  // toute modification qui a un effet en cascade (édition d'une caractéristique, bascule
  // d'une maîtrise de compétence, changement de niveau).
  function refreshAll(){
    renderVitals();
    renderStatGrid();
    renderSaveGrid();
    renderSidebar();
    renderTabPanel();
    container.querySelector('.sub').textContent = `${ch.species||''}${ch.speciesChoiceSubrace?` (${ch.speciesChoiceSubrace})`:''} · ${ch.className||''} niv. ${ch.level||1} · ${ch.background||''}`;
  }

  function renderStatGrid(){
    const grid = container.querySelector('#stat-grid');
    grid.innerHTML = ABILITIES.map(a => `
      <div class="stat-block">
        <div class="label">${a.short}</div>
        <input type="number" class="stat-score-input" data-abil="${a.key}" value="${ch.abilities?.[a.key] ?? 10}" min="1" max="30" aria-label="${escapeHtml(a.label)}">
        <div class="mod">${fmtMod(abilityMod(a.key))}</div>
      </div>
    `).join('');
    grid.querySelectorAll('.stat-score-input').forEach(input => {
      input.addEventListener('change', () => {
        const key = input.dataset.abil;
        const val = clamp(parseInt(input.value,10) || 10, 1, 30);
        ch.abilities = ch.abilities || {};
        ch.abilities[key] = val;
        persist();
        refreshAll();
      });
    });
  }

  // Un personnage n'est maîtrisé que dans les jets de sauvegarde de sa classe
  // (ch.savingThrows, libellés complets en français) — comparaison insensible aux accents/casse.
  function isSaveProficient(abilityKey){
    const label = stripAccents(ABILITIES.find(a => a.key === abilityKey)?.label || '').toLowerCase();
    return (ch.savingThrows||[]).some(s => stripAccents(s).toLowerCase().includes(label));
  }

  function renderSaveGrid(){
    const grid = container.querySelector('#save-grid');
    const prof = proficiencyBonus(ch.level||1);
    grid.innerHTML = ABILITIES.map(a => {
      const isProf = isSaveProficient(a.key);
      const bonus = abilityMod(a.key) + (isProf ? prof : 0);
      return `
        <div class="save-block ${isProf?'is-proficient':''}">
          <span class="save-dot"></span>
          <span class="save-label">${a.short}</span>
          <span class="save-bonus">${fmtMod(bonus)}</span>
        </div>
      `;
    }).join('');
  }

  function renderSidebar(){
    const el = container.querySelector('#char-sidebar');
    const prof = proficiencyBonus(ch.level||1);
    const skillRows = ALL_SKILLS.map(skill => {
      const abilKey = SKILL_ABILITY[skill] || 'force';
      const abilShort = ABILITIES.find(a => a.key === abilKey)?.short || '';
      const isProf = (ch.classSkills||[]).includes(skill);
      const bonus = abilityMod(abilKey) + (isProf ? prof : 0);
      return `
        <li class="skill-row ${isProf?'is-proficient':''}" data-skill="${escapeHtml(skill)}" role="button" tabindex="0" aria-pressed="${isProf}">
          <span class="skill-dot"></span>
          <span class="skill-name">${escapeHtml(skill)}</span>
          <span class="skill-abil">${abilShort}</span>
          <span class="skill-bonus">${fmtMod(bonus)}</span>
        </li>
      `;
    }).join('');
    el.innerHTML = `
      <h3 class="sidebar-heading">Compétences <span class="hint-inline">(cliquer pour maîtriser)</span></h3>
      <ul class="skill-list" id="skill-list">${skillRows}</ul>
      <h3 class="sidebar-heading">Langues</h3>
      <ul class="sidebar-list">
        ${(ch.languages||[]).map(s => `<li>${escapeHtml(s)}</li>`).join('') || '<li class="is-empty">Aucune</li>'}
      </ul>
    `;
    el.querySelectorAll('[data-skill]').forEach(row => {
      const toggle = () => {
        ch.classSkills = ch.classSkills || [];
        const skill = row.dataset.skill;
        const idx = ch.classSkills.indexOf(skill);
        if(idx >= 0) ch.classSkills.splice(idx,1); else ch.classSkills.push(skill);
        persist();
        refreshAll();
      };
      row.addEventListener('click', toggle);
      row.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); } });
    });
  }

  // ---------- STATISTIQUES DE COMBAT (CA, Initiative, Vitesse, DD sorts...) ----------
  function equippedArmorLooked(){
    const it = ch.inventory.find(i => i.equipped === 'armor');
    return it ? itemLookedUp(it) : null;
  }
  function hasShieldEquipped(){
    return ch.inventory.some(i => i.equipped === 'off' && itemLookedUp(i)?.categorie === 'Boucliers');
  }

  function renderVitals(){
    const el = container.querySelector('#char-vitals');
    const dexMod = abilityMod('dexterite');
    const prof = proficiencyBonus(ch.level||1);
    const armorLooked = equippedArmorLooked();
    const hasShield = hasShieldEquipped();
    const ac = computeArmorClass({ dexMod, armorCA: armorLooked?.ca ?? null, hasShield });

    const speciesObj = DATA.species.find(x => x.espece === ch.species);
    const forceReq = armorLooked && armorLooked.force != null ? Number(armorLooked.force) : null;
    const speed = computeSpeed({ speciesSpeedLabel: speciesObj?.infos?.['Vitesse'], forceScore: ch.abilities?.force, armorForceReq: forceReq });

    const perceptionBonus = abilityMod(SKILL_ABILITY['Perception']) + ((ch.classSkills||[]).includes('Perception') ? prof : 0);
    const passivePerc = passivePerception(perceptionBonus);

    const abilKey = SPELLCASTING_ABILITY[ch.className];
    const spellAbilMod = abilKey ? abilityMod(abilKey) : null;
    const abilLabel = abilKey ? ABILITIES.find(a => a.key === abilKey)?.label : '';

    const tiles = [
      { label:'CA', value: ac.value, tip:`Classe d'Armure = ${ac.breakdown.join(' ')}.${armorLooked ? '' : ' Équipez une armure depuis l’onglet Inventaire pour affiner ce calcul.'}` },
      { label:'Initiative', value: fmtMod(dexMod), tip:`Initiative = modificateur de Dextérité (${fmtMod(dexMod)}). Lancée en 1d20 + Initiative pour déterminer l’ordre d’action au début du combat.` },
      { label:'Vitesse', value: `${speed.value} m`, tip: speed.penalized ? `Vitesse de base ${speed.base} m, réduite de 3 m : l’armure portée exige plus de Force que vous n’en avez.` : `Vitesse de base de votre espèce (${speed.base} m). Distance que vous pouvez parcourir par tour.` },
      { label:'Maîtrise', value: fmtMod(prof), tip:`Bonus de maîtrise selon le niveau (niv. ${ch.level||1} → ${fmtMod(prof)}). S’ajoute aux jets où vous êtes formé : compétences maîtrisées, jets de sauvegarde de classe, attaques avec une arme maîtrisée…` },
    ];
    if(abilKey){
      tiles.push({ label:'DD sorts', value: spellSaveDC(prof, spellAbilMod), tip:`DD des sorts = 8 + maîtrise (${fmtMod(prof)}) + modificateur de ${abilLabel} (${fmtMod(spellAbilMod)}). C’est le DD que doivent battre les jets de sauvegarde contre vos sorts.` });
      tiles.push({ label:'Attaque sort', value: fmtMod(spellAttackBonus(prof, spellAbilMod)), tip:`Bonus au jet d’attaque de sort = maîtrise (${fmtMod(prof)}) + modificateur de ${abilLabel} (${fmtMod(spellAbilMod)}).` });
    }
    tiles.push({ label:'Perception passive', value: passivePerc, tip:`10 + bonus de Perception (${fmtMod(perceptionBonus)}). Utilisée sans jet actif, par exemple pour repérer une embuscade ou un piège évident.` });

    el.innerHTML = `
      <p class="field-label" style="margin-bottom:10px;">Statistiques de combat <span class="hint-inline">(survolez pour le détail)</span></p>
      <div class="vital-grid">
        ${tiles.map((t,i) => `
          <div class="vital-tile" data-vital-idx="${i}" tabindex="0">
            <div class="vital-value">${escapeHtml(String(t.value))}</div>
            <div class="vital-label">${escapeHtml(t.label)}</div>
          </div>
        `).join('')}
      </div>
    `;
    el.querySelectorAll('[data-vital-idx]').forEach(tile => {
      const t = tiles[Number(tile.dataset.vitalIdx)];
      attachPopover(tile, () => `<div class="popover-title"><span>${escapeHtml(t.label)}</span></div><div>${escapeHtml(t.tip)}</div>`);
    });
  }

  // Récupération des ressources de classe (Rage, Second souffle, Points de Sorcellerie...)
  // au repos, selon la règle propre à chacune (voir CLASS_RESOURCE_DEFS) : 'rest' se
  // récupère intégralement à un repos court OU long, 'long' seulement à un repos long, et
  // 'rage' ne rend qu'une utilisation au repos court mais toutes au repos long. Les dés de
  // Supériorité du Maître de guerre suivent la même règle que 'rest'.
  function recoverClassResources(kind){
    ch.usedResources = ch.usedResources || {};
    for(const def of CLASS_RESOURCE_DEFS[ch.className] || []){
      if(def.kind === 'info') continue;
      if(def.recovery === 'rest'){
        ch.usedResources[def.key] = [];
      } else if(def.recovery === 'long'){
        if(kind === 'long') ch.usedResources[def.key] = [];
      } else if(def.recovery === 'rage'){
        if(kind === 'long') ch.usedResources[def.key] = [];
        else if((ch.usedResources[def.key]||[]).length) ch.usedResources[def.key] = ch.usedResources[def.key].slice(0, -1);
      }
    }
    ch.usedResources.superiorite = [];
  }

  // Petit effet visuel (flash coloré + nombre flottant) qui accompagne un gain/perte
  // de PV — purement cosmétique, sans incidence sur l'état du personnage.
  function playHpVfx(box, kind, amount){
    const flashClass = kind === 'damage' ? 'is-flash-damage' : kind === 'heal' ? 'is-flash-heal' : 'is-flash-temp';
    box.classList.remove('is-flash-damage','is-flash-heal','is-flash-temp');
    void box.offsetWidth; // force le reflow pour pouvoir rejouer l'animation à la suite
    box.classList.add(flashClass);
    box.addEventListener('animationend', () => box.classList.remove(flashClass), { once:true });

    const float = document.createElement('span');
    float.className = `hp-float is-${kind}`;
    float.textContent = kind === 'damage' ? `−${amount}` : kind === 'heal' ? `+${amount}` : `+${amount} temp.`;
    box.appendChild(float);
    float.addEventListener('animationend', () => float.remove(), { once:true });
  }

  function renderHpWidget(){
    const box = container.querySelector('#hp-widget');
    ch.deathSaves = ch.deathSaves || { success:[false,false,false], fail:[false,false,false] };
    const pct = clamp(Math.round((ch.hp.current / Math.max(1,ch.hp.max)) * 100), 0, 100);
    const cls = pct <= 25 ? '' : pct <= 60 ? 'is-mid' : 'is-high';

    const maxDice = ch.level || 1;
    ch.hitDiceUsed = clamp(ch.hitDiceUsed || 0, 0, maxDice);
    const avail = maxDice - ch.hitDiceUsed;
    const cClass = DATA.classes.find(x => x.classe_title === ch.className);
    const dieFaces = cClass ? parseClassTraits(cClass.html_traits_table).deVieFaces : 8;

    const deathDots = (kind, label) => `
      <div class="death-row">
        <span class="death-row-label">${label}</span>
        <div class="death-dots">
          ${[0,1,2].map(i => `<button type="button" class="death-dot is-${kind} ${ch.deathSaves[kind][i]?'is-filled':''}" data-kind="${kind}" data-idx="${i}" aria-label="${label} ${i+1}"></button>`).join('')}
        </div>
      </div>
    `;
    box.innerHTML = `
      <div class="hp-bar-wrap">
        <div class="hp-bar-track"><div class="hp-bar-fill ${cls}" style="width:${pct}%;"></div></div>
        <div class="hp-nums">
          <span>PV ${ch.hp.current} / ${ch.hp.max}${ch.hp.temp ? ` <span class="hp-temp">(+${ch.hp.temp} temp.)</span>` : ''}</span>
          <span>Maîtrise ${fmtMod(proficiencyBonus(ch.level||1))}</span>
        </div>
      </div>
      <div class="hp-controls">
        <input type="number" class="field" id="hp-amount" value="1" min="1" style="width:70px;">
        <button class="btn btn-sm btn-danger" id="hp-damage">Dégâts</button>
        <button class="btn btn-sm btn-primary" id="hp-heal">Soin</button>
        <button class="btn btn-sm btn-ghost" id="hp-temp-btn">🛡️ PV temp.</button>
      </div>
      <div class="hp-rest-row">
        <button type="button" class="btn btn-sm btn-ghost" id="hp-rest-short">🔥 Repos court</button>
        <button type="button" class="btn btn-sm btn-ghost" id="hp-rest-long">🌙 Repos long</button>
        <span class="hp-hitdice-hint" id="hp-hitdice-hint" tabindex="0">🎲 Dés de vie ${avail}/${maxDice}</span>
      </div>
      <div class="death-saves">
        <p class="field-label" style="margin:0 0 8px;">Jets de sauvegarde contre la mort</p>
        <div class="death-saves-rows">
          ${deathDots('success','Réussites')}
          ${deathDots('fail','Échecs')}
        </div>
      </div>
    `;
    const amountInput = box.querySelector('#hp-amount');
    box.querySelector('#hp-damage').addEventListener('click', () => {
      const n = Math.max(0, parseInt(amountInput.value,10) || 0);
      if(n <= 0) return;
      let remaining = n;
      if(ch.hp.temp > 0){ const used = Math.min(ch.hp.temp, remaining); ch.hp.temp -= used; remaining -= used; }
      ch.hp.current = clamp(ch.hp.current - remaining, 0, ch.hp.max);
      persist(); renderHpWidget();
      playHpVfx(box, 'damage', n);
    });
    box.querySelector('#hp-heal').addEventListener('click', () => {
      const n = Math.max(0, parseInt(amountInput.value,10) || 0);
      if(n <= 0) return;
      ch.hp.current = clamp(ch.hp.current + n, 0, ch.hp.max);
      if(ch.hp.current > 0) ch.deathSaves = { success:[false,false,false], fail:[false,false,false] };
      persist(); renderHpWidget();
      playHpVfx(box, 'heal', n);
    });
    box.querySelector('#hp-temp-btn').addEventListener('click', () => {
      const n = Math.max(0, parseInt(amountInput.value,10) || 0);
      if(n <= 0) return;
      ch.hp.temp = Math.max(ch.hp.temp||0, n);
      persist(); renderHpWidget();
      playHpVfx(box, 'temp', n);
    });
    box.querySelectorAll('.death-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const kind = dot.dataset.kind;
        const idx = Number(dot.dataset.idx);
        ch.deathSaves[kind][idx] = !ch.deathSaves[kind][idx];
        persist();
        dot.classList.toggle('is-filled');
      });
    });

    attachPopover(box.querySelector('#hp-hitdice-hint'), () => `
      <div class="popover-title"><span>Dés de vie</span></div>
      <div>Vous disposez d’un dé de vie par niveau (ici D${dieFaces}). Dépensez-en pendant un repos court pour récupérer des PV (1 dé = 1D${dieFaces} + modificateur de Constitution). Vous en récupérez ${Math.max(1, Math.ceil(maxDice/2))} lors d’un repos long (la moitié du total, arrondi au supérieur).</div>
    `);

    box.querySelector('#hp-rest-short').addEventListener('click', () => {
      if(avail <= 0){ toast('Aucun dé de vie disponible — un repos long est nécessaire pour en récupérer.', { type:'error' }); return; }
      const conMod = abilityMod('constitution');
      openModal({
        eyebrow:'Repos court', title:'Dépenser des dés de vie',
        build(mbody){
          mbody.innerHTML = `
            <p class="page-lede" style="font-size:.92em;">Un repos court dure au moins 1 heure. Chaque dé de vie dépensé rend 1D${dieFaces} ${fmtMod(conMod)} PV. Dés disponibles : ${avail}/${maxDice}.</p>
            <div class="flex-gap" style="align-items:center;margin:1em 0;">
              <label class="field-label" style="margin:0;">Dés à dépenser</label>
              <input type="number" class="field" id="sr-count" value="1" min="1" max="${avail}" style="width:80px;">
            </div>
            <div class="flex-gap" style="justify-content:flex-end;">
              <button class="btn btn-primary" id="sr-spend">Dépenser et récupérer les PV</button>
            </div>
          `;
          mbody.querySelector('#sr-spend').addEventListener('click', () => {
            const n = clamp(parseInt(mbody.querySelector('#sr-count').value,10) || 1, 1, avail);
            const res = rollDice(n, dieFaces, conMod*n);
            const healed = Math.max(0, res.total);
            ch.hitDiceUsed = (ch.hitDiceUsed||0) + n;
            ch.hp.current = clamp(ch.hp.current + healed, 0, ch.hp.max);
            if(CASTER_TYPE[ch.className] === 'pact'){ ch.usedSlots = ch.usedSlots || {}; ch.usedSlots.pact = []; }
            recoverClassResources('short');
            persist();
            closeModal();
            renderHpWidget();
            renderTabPanel();
            toast(`Repos court : +${healed} PV (${n} dé${n>1?'s':''} de vie dépensé${n>1?'s':''}).`, { type:'success' });
          });
        }
      });
    });

    box.querySelector('#hp-rest-long').addEventListener('click', async () => {
      const recover = Math.max(1, Math.ceil(maxDice/2));
      const ok = await confirmAction({
        title:'Repos long',
        message:`Restaure tous les points de vie, réinitialise tous les emplacements de sorts utilisés et récupère ${recover} dé${recover>1?'s':''} de vie dépensé${recover>1?'s':''} (la moitié de votre total, arrondi au supérieur). Un repos long dure 8 heures — continuer ?`,
        confirmLabel:'Prendre un repos long', danger:false,
      });
      if(!ok) return;
      ch.hp.current = ch.hp.max;
      ch.hp.temp = 0;
      ch.usedSlots = {};
      ch.deathSaves = { success:[false,false,false], fail:[false,false,false] };
      ch.hitDiceUsed = Math.max(0, (ch.hitDiceUsed||0) - recover);
      recoverClassResources('long');
      persist();
      renderHpWidget();
      renderTabPanel();
      toast('Repos long terminé : PV et emplacements de sorts restaurés.', { type:'success' });
    });
  }

  function wireTopbar(){
    container.querySelector('#char-print').addEventListener('click', () => window.print());
    container.querySelector('#char-delete').addEventListener('click', async () => {
      const ok = await confirmAction({
        title:'Supprimer ce personnage',
        message:`Supprimer définitivement « ${ch.profile?.name || 'ce personnage'} » ? Cette action est irréversible.`,
        confirmLabel:'Supprimer',
      });
      if(!ok) return;
      deleteCharacter(ch.id);
      toast('Personnage supprimé.', { type:'success' });
      navigate('personnage');
    });
  }

  function renderTabPanel(){
    const panel = container.querySelector('#char-panel');
    if(activeTab === 'actions') return renderActionsTab(panel);
    if(activeTab === 'traits') return renderTraitsTab(panel);
    if(activeTab === 'sorts') return renderSortsTab(panel);
    if(activeTab === 'inventaire') return renderInventaireTab(panel);
    if(activeTab === 'or') return renderOrTab(panel);
    if(activeTab === 'profil') return renderProfilTab(panel);
    if(activeTab === 'notes') return renderNotesTab(panel);
  }

  // ---------- ACTIONS ----------
  function weaponAttacks(){
    const attacks = [];
    const masteryUnlocked = hasWeaponMastery(ch.className);
    for(const item of ch.inventory){
      if(item.equipped !== 'main' && item.equipped !== 'off' && item.equipped !== 'twohand') continue;
      const looked = itemLookedUp(item);
      if(looked && looked.kind === 'arme'){
        const isFinesse = (looked.proprietes||[]).some(p => /finesse/i.test(p));
        const isRanged = /distance/i.test(looked.categorie||'');
        const abilKey = isRanged ? 'dexterite' : (isFinesse ? (abilityMod('dexterite') > abilityMod('force') ? 'dexterite' : 'force') : 'force');
        const mod = abilityMod(abilKey);
        const prof = proficiencyBonus(ch.level||1);
        const mastery = masteryUnlocked && looked.botte && ch.weaponMasteries.includes(looked.nom)
          ? { name: looked.botte, description: DATA.weaponPropertyDefs.get(looked.botte) || '' }
          : null;
        attacks.push({ name: looked.nom, degats: looked.degats, bonus: mod + prof, dmgMod: mod, mastery });
      }
    }
    return attacks;
  }

  function renderActionsTab(panel){
    const attacks = weaponAttacks();
    const attackCards = attacks.map(a => {
      const dmgMatch = a.degats.match(/(\d+)d(\d+)/i);
      return `
        <div class="cbt-action-card" tabindex="0">
          <div class="cbt-action-head">
            <span class="cbt-action-icon">⚔️</span>
            <div class="cbt-action-name">${escapeHtml(a.name)}</div>
            <span class="cbt-action-cost">${fmtMod(a.bonus)} touché</span>
            <svg class="i chevron cbt-action-chevron"><use href="#i-chevron"/></svg>
          </div>
          <div class="cbt-action-body">
            <p>Dégâts : ${escapeHtml(a.degats)} (${fmtMod(a.dmgMod)})</p>
            <div class="flex-gap" style="margin-top:.7em;">
              <button type="button" class="btn btn-sm btn-ghost" data-dice-roll="1,20,${a.bonus}" data-dice-label="${escapeHtml(a.name)} — jet pour toucher">🎲 Toucher</button>
              ${dmgMatch ? `<button type="button" class="btn btn-sm btn-ghost" data-dice-roll="${dmgMatch[1]},${dmgMatch[2]},${a.dmgMod}" data-dice-label="${escapeHtml(a.name)} — dégâts">🎲 Dégâts</button>` : ''}
            </div>
            ${a.mastery ? `
              <div class="weapon-mastery-note">
                <span class="pill">🗡️ Botte : ${escapeHtml(a.mastery.name)}</span>
                <p>${escapeHtml(a.mastery.description)}</p>
              </div>
            ` : ''}
          </div>
        </div>`;
    }).join('');

    const isBattleMaster = ch.className === 'Guerrier' && ch.subclass === 'Maître de guerre' && ch.maneuvers.length;
    const dice = isBattleMaster ? superiorityDice(ch.level||1) : null;
    const maneuverCards = isBattleMaster ? ch.maneuvers.map(name => {
      const m = MANEUVERS_2024.find(x => x.name === name);
      if(!m) return '';
      return `
        <div class="cbt-action-card" tabindex="0">
          <div class="cbt-action-head">
            <span class="cbt-action-icon">🎯</span>
            <div class="cbt-action-name">${escapeHtml(m.name)}</div>
            <span class="cbt-action-cost">1 dé de Supériorité</span>
            <svg class="i chevron cbt-action-chevron"><use href="#i-chevron"/></svg>
          </div>
          <div class="cbt-action-body">
            <p>${escapeHtml(m.description)}</p>
            <div class="flex-gap" style="margin-top:.7em;">
              <button type="button" class="btn btn-sm btn-ghost" data-dice-roll="1,${dice.faces},0" data-dice-label="${escapeHtml(m.name)} — dé de Supériorité">🎲 Dé de Supériorité (d${dice.faces})</button>
            </div>
          </div>
        </div>`;
    }).join('') : '';

    const combatActionCards = DATA.glossaireRaw.actions.map(a => {
      const icon = COMBAT_ACTIONS.find(x => x.id === a.id)?.icon || '⚡';
      return `
        <div class="cbt-action-card" tabindex="0">
          <div class="cbt-action-head">
            <span class="cbt-action-icon">${icon}</span>
            <div class="cbt-action-name">${escapeHtml(a.terme)}</div>
            <span class="cbt-action-cost">Action</span>
            <svg class="i chevron cbt-action-chevron"><use href="#i-chevron"/></svg>
          </div>
          <div class="cbt-action-body"><p>${enrichHTML(a.description, { isPlainText:true })}</p></div>
        </div>`;
    }).join('');

    panel.innerHTML = `
      <div class="flex-gap" style="margin-bottom:1.4em;">
        <button class="btn btn-primary" id="actions-dice-btn"><svg class="i"><use href="#i-dice"/></svg> Lancer les dés</button>
      </div>
      ${attacks.length ? `
        <p class="field-label">Attaques (armes équipées)</p>
        <div class="cbt-action-grid" style="margin-bottom:1.8em;">${attackCards}</div>
      ` : `<p class="page-lede" style="margin-bottom:1.8em;">Aucune arme équipée — direction l’onglet Inventaire pour équiper une arme en main.</p>`}
      ${maneuverCards ? `
        <p class="field-label">Manœuvres (Maître de guerre)</p>
        <div class="cbt-action-grid" style="margin-bottom:1.8em;">${maneuverCards}</div>
      ` : ''}
      <p class="field-label">Actions de combat courantes</p>
      <div class="cbt-action-grid">${combatActionCards}</div>
    `;
    panel.querySelector('#actions-dice-btn').addEventListener('click', (e) => openDiceRoller(e.currentTarget));
    wireActionCards(panel);
  }

  // Rangée de jetons cliquables générique (emplacements de sorts, dés de Supériorité,
  // ressources de classe) — un seul type de widget visuel pour toutes les jauges à cocher.
  function resourceDotsHTML(key, n){
    const used = new Set(ch.usedResources[key] || []);
    let dots = '';
    for(let i=0;i<n;i++) dots += `<button type="button" class="slot-dot ${used.has(i)?'is-used':''}" data-resource="${key}" data-idx="${i}" aria-label="${escapeHtml(key)} ${i+1}"></button>`;
    return `<div class="slot-dots">${dots}</div>`;
  }

  // ---------- TRAITS (racial + classe + sous-classe + ressources) ----------
  function renderTraitsTab(panel){
    const speciesObj = DATA.species.find(x => x.espece === ch.species);
    const c = DATA.classes.find(x => x.classe_title === ch.className);
    if(!c){ panel.innerHTML = `<p>Classe introuvable.</p>`; return; }
    const level = ch.level || 1;
    const traits = parseClassTraits(c.html_traits_table);
    const resourceTable = parseClassResourceColumns(c.html_capacites_table);

    // La capacité "Sous-classe de X" indique en toutes lettres, via son propre niveau, à
    // quel palier la sous-classe est proposée — 2024 l'a normalisé au niveau 3 pour les
    // 12 classes, mais on le lit dans les données plutôt que de le figer en dur.
    const subclassGateCap = c.capacites.find(cap => /^Sous-classe /i.test(cap.capacite_name));
    const subclassLevel = subclassGateCap ? Number(subclassGateCap.niveau) : 3;
    const subclassObj = (c.subclasses||[]).find(sc => sc.classe_title === ch.subclass) || null;

    const baseUnlocked = c.capacites
      .filter(cap => Number(cap.niveau) <= level)
      .filter(cap => !/^Capacité de sous-classe$/i.test(cap.capacite_name))
      .filter(cap => !/^Sous-classe /i.test(cap.capacite_name));
    const subUnlocked = subclassObj
      ? subclassObj.capacites.filter(cap => Number(cap.niveau) <= level).map(cap => ({ ...cap, _sub:true }))
      : [];
    const merged = [...baseUnlocked, ...subUnlocked].sort((a,b) => Number(a.niveau) - Number(b.niveau));

    const resourceDefs = (CLASS_RESOURCE_DEFS[ch.className] || []).filter(def => {
      const v = classResourceValue(def, level, resourceTable);
      return v !== 0 && v != null;
    });
    const wmCount = hasWeaponMastery(ch.className) ? weaponMasteryCount(ch.className, level, resourceTable) : 0;
    const isBattleMaster = ch.className === 'Guerrier' && ch.subclass === 'Maître de guerre';
    const isSorcererMM = ch.className === 'Ensorceleur' && level >= 2;
    const isWarlock = ch.className === 'Occultiste';
    const hasResourceSection = resourceDefs.length > 0 || wmCount > 0 || isBattleMaster || isSorcererMM || isWarlock;

    function subclassSectionHTML(){
      if(!(c.subclasses||[]).length) return '';
      if(level < subclassLevel){
        return `<p class="page-lede" style="margin-bottom:1.4em;">La sous-classe sera proposée au niveau ${subclassLevel}.</p>`;
      }
      if(!subclassObj){
        return `
          <h3 class="level-heading">Choisissez une sous-classe</h3>
          <p class="page-lede" style="font-size:.92em;margin-bottom:1em;">Niveau ${subclassLevel} atteint : votre ${escapeHtml(ch.className)} se spécialise. Ce choix ajoute ses propres capacités dans la liste ci-dessous, au fil de votre progression.</p>
          <div class="option-grid" id="subclass-grid" style="margin-bottom:1.8em;">
            ${c.subclasses.map(sc => `
              <button type="button" class="option-card subclass-card" data-subclass="${escapeHtml(sc.classe_title)}" style="aspect-ratio:auto;">
                <div class="oc-body" style="padding:14px 16px;">
                  <span class="oc-title">${escapeHtml(sc.classe_title)}</span>
                  <p class="subclass-excerpt">${escapeHtml(textExcerpt(sc.classe_description))}</p>
                </div>
              </button>
            `).join('')}
          </div>
        `;
      }
      return `
        <div class="flex-gap" style="align-items:center;margin-bottom:1.8em;">
          <span class="pill">Sous-classe : ${escapeHtml(subclassObj.classe_title)}</span>
          <button type="button" class="btn btn-sm btn-ghost" id="subclass-change-btn">Changer de sous-classe</button>
        </div>
      `;
    }

    function poolsHTML(){
      if(!resourceDefs.length) return '';
      return `<div class="spell-slots-row">
        ${resourceDefs.map(def => {
          const v = classResourceValue(def, level, resourceTable);
          if(def.kind === 'info'){
            return `<div class="spell-slot-lvl frame"><div class="lvl-label">${def.icon} ${escapeHtml(def.label)}</div><div class="abil-final" style="font-size:1.1rem;margin-top:4px;">${escapeHtml(String(v))}</div></div>`;
          }
          return `<div class="spell-slot-lvl frame"><div class="lvl-label">${def.icon} ${escapeHtml(def.label)}</div>${resourceDotsHTML(def.key, v)}</div>`;
        }).join('')}
      </div>`;
    }

    function maneuversHTML(){
      const dice = superiorityDice(level);
      const knownMax = maneuversKnownCount(level);
      return `
        <div class="frame resource-block">
          <div class="flex-gap" style="align-items:center;margin-bottom:.9em;">
            <span class="field-label" style="margin:0;">Dés de Supériorité (d${dice.faces})</span>
            ${resourceDotsHTML('superiorite', dice.count)}
          </div>
          <p class="field-label">Manœuvres connues (<span id="maneuver-count"></span> / ${knownMax})</p>
          <p class="page-lede" style="font-size:.85em;margin-bottom:.8em;">Survolez une manœuvre pour lire son effet.</p>
          <div class="chip-group" id="maneuver-chips">
            ${MANEUVERS_2024.map(m => `
              <button type="button" class="chip ${ch.maneuvers.includes(m.name)?'is-selected':''}" data-maneuver="${escapeHtml(m.name)}">
                <svg class="i"><use href="#i-check"/></svg>${escapeHtml(m.name)}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    function metamagicHTML(){
      const knownMax = metamagicKnownCount(level);
      return `
        <div class="frame resource-block">
          <p class="field-label">Options de Métamagie connues (<span id="metamagic-count"></span> / ${knownMax})</p>
          <p class="page-lede" style="font-size:.85em;margin-bottom:.8em;">Survolez une option pour lire son coût et son effet.</p>
          <div class="chip-group" id="metamagic-chips">
            ${METAMAGIC_2024.map(m => `
              <button type="button" class="chip ${ch.metamagic.includes(m.name)?'is-selected':''}" data-metamagic="${escapeHtml(m.name)}">
                <svg class="i"><use href="#i-check"/></svg>${escapeHtml(m.name)}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    function manifestationsHTML(){
      const knownMax = manifestationsKnownCount(level, resourceTable);
      return `
        <div class="frame resource-block">
          <p class="field-label">Manifestations occultes connues (<span id="manifestation-count"></span> / ${knownMax})</p>
          <p class="page-lede" style="font-size:.85em;margin-bottom:.8em;">Survolez une manifestation pour lire son prérequis et son effet.</p>
          <div class="chip-group" id="manifestation-chips">
            ${(c.manifestations||[]).map(m => `
              <button type="button" class="chip ${ch.manifestations.includes(m.nom)?'is-selected':''}" data-manifestation="${escapeHtml(m.nom)}">
                <svg class="i"><use href="#i-check"/></svg>${escapeHtml(m.nom)}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    function weaponMasteryHTML(){
      return `
        <div class="frame resource-block">
          <p class="field-label">Bottes d'arme maîtrisées (<span id="wm-count"></span> / ${wmCount})</p>
          <p class="page-lede" style="font-size:.85em;margin-bottom:.8em;">Choisissez les types d'armes dont vous pouvez exploiter la botte — elle s'affichera automatiquement dans l'onglet Actions lorsque l'arme est équipée. Survolez un type pour voir son effet.</p>
          <div class="chip-group" id="wm-chips">
            ${DATA.weaponNames.map(name => `
              <button type="button" class="chip ${ch.weaponMasteries.includes(name)?'is-selected':''}" data-weapon="${escapeHtml(name)}">
                <svg class="i"><use href="#i-check"/></svg>${escapeHtml(name)}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    panel.innerHTML = `
      <div class="flex-gap" style="align-items:center;margin-bottom:1.4em;">
        <label class="field-label" for="char-level" style="margin:0;">Niveau</label>
        <select class="field" id="char-level" style="width:90px;">
          ${Array.from({length:20},(_,i)=>i+1).map(n => `<option value="${n}" ${n===level?'selected':''}>${n}</option>`).join('')}
        </select>
        <span class="pill">Bonus de maîtrise ${fmtMod(proficiencyBonus(level))}</span>
        <span class="pill">Dé de vie D${traits.deVieFaces}</span>
      </div>

      ${subclassSectionHTML()}

      ${hasResourceSection ? `
        <h3 class="level-heading">Ressources de classe</h3>
        <div class="resource-section" style="margin-bottom:1.8em;">
          ${poolsHTML()}
          ${isBattleMaster ? maneuversHTML() : ''}
          ${isSorcererMM ? metamagicHTML() : ''}
          ${isWarlock ? manifestationsHTML() : ''}
          ${wmCount > 0 ? weaponMasteryHTML() : ''}
        </div>
      ` : ''}

      ${speciesObj ? `
        <h3 class="level-heading">Traits raciaux — ${escapeHtml(speciesObj.espece)}</h3>
        <div class="capacite-list" style="margin-bottom:1.8em;">
          ${(speciesObj.capacites||[]).map(cap => capaciteBlockHTML(cap.nom, enrichHTML(cap.description, { isPlainText:true }))).join('')}
        </div>
      ` : ''}

      <h3 class="level-heading">Capacités de classe</h3>
      <div class="capacite-list">
        ${merged.map(cap => capaciteBlockHTML(
          cap.capacite_name,
          enrichHTML(cap.description_html),
          `${cap._sub ? '<span class="pill" style="margin-right:6px;">Sous-classe</span>' : ''}<span class="pill pill-muted" style="margin-right:8px;">Niv. ${cap.niveau}</span>`
        )).join('') || '<p class="page-lede">Aucune capacité à ce niveau.</p>'}
      </div>
    `;
    wireCollapsibles(panel);

    panel.querySelector('#char-level').addEventListener('change', (e) => {
      ch.level = Number(e.target.value);
      persist();
      refreshAll();
    });

    panel.querySelectorAll('[data-subclass]').forEach(card => card.addEventListener('click', () => {
      ch.subclass = card.dataset.subclass;
      persist();
      toast(`Sous-classe choisie : ${ch.subclass}.`, { type:'success' });
      refreshAll();
    }));
    panel.querySelector('#subclass-change-btn')?.addEventListener('click', async () => {
      const ok = await confirmAction({
        title:'Changer de sous-classe',
        message:'Les capacités actuelles de votre sous-classe seront remplacées par celles de la nouvelle sous-classe choisie. Continuer ?',
        confirmLabel:'Changer',
      });
      if(!ok) return;
      ch.subclass = null;
      persist();
      refreshAll();
    });

    panel.querySelectorAll('[data-resource]').forEach(dot => dot.addEventListener('click', () => {
      const key = dot.dataset.resource;
      const idx = Number(dot.dataset.idx);
      const used = new Set(ch.usedResources[key] || []);
      if(used.has(idx)) used.delete(idx); else used.add(idx);
      ch.usedResources[key] = [...used];
      persist();
      dot.classList.toggle('is-used');
    }));

    if(isBattleMaster){
      const countEl = panel.querySelector('#maneuver-count');
      const updateCount = () => { countEl.textContent = ch.maneuvers.length; };
      updateCount();
      panel.querySelectorAll('[data-maneuver]').forEach(chip => {
        const m = MANEUVERS_2024.find(x => x.name === chip.dataset.maneuver);
        attachPopover(chip, () => `<div class="popover-title"><span>${escapeHtml(m.name)}</span></div><div>${escapeHtml(m.description)}</div>`);
        chip.addEventListener('click', () => {
          const idx = ch.maneuvers.indexOf(m.name);
          if(idx >= 0){ ch.maneuvers.splice(idx,1); }
          else {
            const max = maneuversKnownCount(ch.level||1);
            if(ch.maneuvers.length >= max){ toast(`Vous ne pouvez connaître que ${max} manœuvres à ce niveau.`, { type:'error' }); return; }
            ch.maneuvers.push(m.name);
          }
          persist();
          chip.classList.toggle('is-selected');
          updateCount();
        });
      });
    }

    if(isSorcererMM){
      const countEl = panel.querySelector('#metamagic-count');
      const updateCount = () => { countEl.textContent = ch.metamagic.length; };
      updateCount();
      panel.querySelectorAll('[data-metamagic]').forEach(chip => {
        const m = METAMAGIC_2024.find(x => x.name === chip.dataset.metamagic);
        attachPopover(chip, () => `<div class="popover-title"><span>${escapeHtml(m.name)}</span><span class="popover-cat">${m.cost} pt${m.cost>1?'s':''} de Sorcellerie</span></div><div>${escapeHtml(m.description)}</div>`);
        chip.addEventListener('click', () => {
          const idx = ch.metamagic.indexOf(m.name);
          if(idx >= 0){ ch.metamagic.splice(idx,1); }
          else {
            const max = metamagicKnownCount(ch.level||1);
            if(ch.metamagic.length >= max){ toast(`Vous ne pouvez connaître que ${max} options de Métamagie à ce niveau.`, { type:'error' }); return; }
            ch.metamagic.push(m.name);
          }
          persist();
          chip.classList.toggle('is-selected');
          updateCount();
        });
      });
    }

    if(isWarlock){
      const countEl = panel.querySelector('#manifestation-count');
      const updateCount = () => { countEl.textContent = ch.manifestations.length; };
      updateCount();
      panel.querySelectorAll('[data-manifestation]').forEach(chip => {
        const m = (c.manifestations||[]).find(x => x.nom === chip.dataset.manifestation);
        attachPopover(chip, () => `<div class="popover-title"><span>${escapeHtml(m.nom)}</span></div>${m.prerequis ? `<div class="popover-cat" style="margin-bottom:.4em;">Prérequis : ${escapeHtml(m.prerequis)}</div>` : ''}<div>${escapeHtml(m.description)}</div>`);
        chip.addEventListener('click', () => {
          const idx = ch.manifestations.indexOf(m.nom);
          if(idx >= 0){ ch.manifestations.splice(idx,1); }
          else {
            const max = manifestationsKnownCount(level, resourceTable);
            if(ch.manifestations.length >= max){ toast(`Vous ne pouvez connaître que ${max} manifestations occultes à ce niveau.`, { type:'error' }); return; }
            ch.manifestations.push(m.nom);
          }
          persist();
          chip.classList.toggle('is-selected');
          updateCount();
        });
      });
    }

    if(wmCount > 0){
      const countEl = panel.querySelector('#wm-count');
      const updateCount = () => { countEl.textContent = ch.weaponMasteries.length; };
      updateCount();
      panel.querySelectorAll('[data-weapon]').forEach(chip => {
        const weaponName = chip.dataset.weapon;
        const looked = DATA.lookupItem(weaponName);
        const botteDesc = looked?.botte ? DATA.weaponPropertyDefs.get(looked.botte) : null;
        if(looked?.botte){
          attachPopover(chip, () => `<div class="popover-title"><span>Botte : ${escapeHtml(looked.botte)}</span></div><div>${escapeHtml(botteDesc||'')}</div>`);
        }
        chip.addEventListener('click', () => {
          const idx = ch.weaponMasteries.indexOf(weaponName);
          if(idx >= 0){ ch.weaponMasteries.splice(idx,1); }
          else {
            if(ch.weaponMasteries.length >= wmCount){ toast(`Vous ne pouvez maîtriser que ${wmCount} types d'armes à ce niveau.`, { type:'error' }); return; }
            ch.weaponMasteries.push(weaponName);
          }
          persist();
          chip.classList.toggle('is-selected');
          updateCount();
        });
      });
    }
  }

  // ---------- SORTS ----------
  function renderSortsTab(panel){
    const level = ch.level || 1;
    const classObj = DATA.classes.find(x => x.classe_title === ch.className);
    const table = classObj ? parseSpellcastingTable(classObj.html_capacites_table) : null;
    const row = table?.[Math.min(20, Math.max(1, parseInt(level,10)||1)) - 1] || null;
    const casterType = CASTER_TYPE[ch.className];
    const slots = row ? (casterType === 'pact' ? { type:casterType, n:row.pact?.n||0, lvl:row.pact?.lvl||0 } : { type:casterType, slots:row.slots }) : null;
    const abilKey = SPELLCASTING_ABILITY[ch.className];
    const isPrepared = PREPARED_CASTERS.has(ch.className);
    const maxKnown = row?.known || 0;
    const nCantrips = row?.cantrips || 0;
    const known = ch.spellsKnown || (ch.spellsKnown = []);

    const spellOf = (slug) => DATA.sorts.find(s => s._slug === slug);
    const cantripSlugs = () => known.filter(k => spellOf(k)?.niveau === '0');
    const leveledSlugs = () => known.filter(k => spellOf(k)?.niveau !== '0')
      .sort((a,b) => Number(spellOf(a)?.niveau||0) - Number(spellOf(b)?.niveau||0));

    let slotsHtml = '';
    if(slots?.type === 'pact'){
      slotsHtml = `<div class="spell-slot-lvl frame"><div class="lvl-label">Pacte · Niv ${slots.lvl}</div>${slotDots('pact', slots.n)}</div>`;
    } else if(slots?.slots?.length){
      slotsHtml = slots.slots.map((n,i) => n ? `<div class="spell-slot-lvl frame"><div class="lvl-label">Niveau ${i+1}</div>${slotDots(i+1, n)}</div>` : '').join('');
    }

    panel.innerHTML = `
      <div class="flex-gap" style="margin-bottom:1.2em;">
        <span class="pill">Caractéristique d'incantation : ${escapeHtml(ABILITIES.find(a=>a.key===abilKey)?.label||'—')}</span>
      </div>
      <p class="field-label">Emplacements de sorts</p>
      <div class="spell-slots-row" style="margin-bottom:1.6em;">${slotsHtml || '<p class="page-lede">Aucun emplacement à ce niveau.</p>'}</div>

      <div class="flex-gap" style="margin-bottom:1em;justify-content:space-between;align-items:center;">
        <p class="field-label" style="margin:0;">Sorts mineurs (<span id="cantrip-count"></span> / ${nCantrips})</p>
        ${nCantrips > 0 ? `<button class="btn btn-sm btn-primary" id="sorts-add-cantrip-btn"><svg class="i"><use href="#i-plus"/></svg> Ajouter un sort mineur</button>` : ''}
      </div>
      <div class="card-grid card-grid-wide spell-grid" id="cantrips-grid"></div>

      <div class="flex-gap" style="margin:1.8em 0 1em;justify-content:space-between;align-items:center;">
        <p class="field-label" style="margin:0;">${isPrepared ? 'Sorts préparés' : 'Sorts connus'} (<span id="leveled-count"></span> / ${maxKnown})</p>
        ${maxKnown > 0 ? `<button class="btn btn-sm btn-primary" id="sorts-add-leveled-btn"><svg class="i"><use href="#i-plus"/></svg> ${isPrepared ? 'Préparer un sort' : 'Apprendre un sort'}</button>` : ''}
      </div>
      <div class="card-grid card-grid-wide spell-grid" id="leveled-grid"></div>
    `;

    function spellMiniCard(slug){
      const sp = spellOf(slug);
      if(!sp) return '';
      const color = SCHOOL_COLOR[sp.ecole] || '#c9a84c';
      const isCantrip = sp.niveau === '0';
      const costLabel = isCantrip ? 'Sans emplacement' : `Coûte 1 emp. niv. ${sp.niveau}`;
      return `
        <div class="card spell-card spell-mini-card" data-slug="${slug}" style="--school-color:${color};padding:0;">
          <button type="button" class="spell-remove-btn" data-remove="${slug}" aria-label="Retirer ${escapeHtml(sp._primaryName)} de la préparation">
            <svg class="i"><use href="#i-close"/></svg>
          </button>
          <div class="card-body">
            <h3 class="card-title" style="font-size:.92rem;">${escapeHtml(sp._primaryName)}</h3>
            <div class="card-meta">
              <span class="pill pill-muted">${isCantrip?'Mineur':`Niv. ${sp.niveau}`}</span>
              <span class="pill pill-muted">${escapeHtml(sp.ecole)}</span>
              <span class="pill pill-muted">${escapeHtml(castingTimeShort(sp.temps))}</span>
              ${sp.concentration ? `<span class="pill pill-muted">Concentration</span>` : ''}
            </div>
            <p class="spell-mini-cost">${costLabel}</p>
          </div>
        </div>
      `;
    }

    function renderKnown(){
      const cSlugs = cantripSlugs(), lSlugs = leveledSlugs();
      panel.querySelector('#cantrip-count').textContent = cSlugs.length;
      panel.querySelector('#leveled-count').textContent = lSlugs.length;

      const cGrid = panel.querySelector('#cantrips-grid');
      const lGrid = panel.querySelector('#leveled-grid');
      cGrid.innerHTML = cSlugs.map(spellMiniCard).join('') || `<p class="page-lede">Aucun sort mineur sélectionné.</p>`;
      lGrid.innerHTML = lSlugs.map(spellMiniCard).join('') || `<p class="page-lede">Aucun sort sélectionné.</p>`;

      [cGrid, lGrid].forEach(grid => {
        grid.querySelectorAll('.spell-mini-card').forEach(card => {
          card.addEventListener('click', (e) => {
            if(e.target.closest('[data-remove]')) return;
            const sp = spellOf(card.dataset.slug);
            if(sp) openSpellDetail(sp, card);
          });
        });
        grid.querySelectorAll('[data-remove]').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = known.indexOf(btn.dataset.remove);
            if(idx>=0) known.splice(idx,1);
            ch.spellsKnown = known;
            persist(); renderKnown();
          });
        });
      });
    }
    renderKnown();

    panel.querySelectorAll('.slot-dot').forEach(dot => dot.addEventListener('click', () => {
      const lvlKey = dot.dataset.lvl;
      const idx = Number(dot.dataset.idx);
      ch.usedSlots = ch.usedSlots || {};
      const used = new Set(ch.usedSlots[lvlKey] || []);
      if(used.has(idx)) used.delete(idx); else used.add(idx);
      ch.usedSlots[lvlKey] = [...used];
      persist();
      dot.classList.toggle('is-used');
    }));

    panel.querySelector('#sorts-add-cantrip-btn')?.addEventListener('click', () => openSpellPicker('cantrip'));
    panel.querySelector('#sorts-add-leveled-btn')?.addEventListener('click', () => openSpellPicker('leveled'));

    function tryAddSpell(slug){
      const sp = spellOf(slug);
      if(!sp) return;
      if(known.includes(slug)){ toast('Ce sort est déjà dans le grimoire.', { type:'error' }); return; }
      const isCantrip = sp.niveau === '0';
      if(isCantrip && cantripSlugs().length >= nCantrips){
        toast(`Vous ne pouvez connaître que ${nCantrips} sorts mineurs à ce niveau.`, { type:'error' }); return;
      }
      if(!isCantrip && leveledSlugs().length >= maxKnown){
        toast(`Vous ne pouvez ${isPrepared ? 'préparer' : 'connaître'} que ${maxKnown} sorts à ce niveau.`, { type:'error' }); return;
      }
      known.push(slug);
      ch.spellsKnown = known;
      persist(); renderKnown();
      toast('Sort ajouté.', { type:'success' });
    }

    function openSpellPicker(kind){
      const wantCantrip = kind === 'cantrip';
      const available = DATA.getSpellsForClass(ch.className)
        .filter(s => (s.niveau === '0') === wantCantrip)
        .filter(s => !known.includes(s._slug))
        .slice()
        .sort((a,b)=>a._niveauNum-b._niveauNum || a._primaryName.localeCompare(b._primaryName));
      const title = wantCantrip ? 'Ajouter un sort mineur' : (isPrepared ? 'Préparer un sort' : 'Apprendre un sort');
      openModal({
        eyebrow:'Grimoire', title, wide:true,
        build(body){
          body.innerHTML = `
            <input type="text" class="field" id="spell-pick-q" placeholder="Filtrer les sorts…" style="margin-bottom:1em;">
            <div class="card-grid card-grid-wide spell-grid" id="spell-pick-grid" style="max-height:55vh;overflow-y:auto;"></div>
          `;
          const gridEl = body.querySelector('#spell-pick-grid');
          function draw(q=''){
            const qq = stripAccents(q.trim().toLowerCase());
            const filtered = available.filter(s => !qq || stripAccents(s._primaryName.toLowerCase()).includes(qq));
            gridEl.innerHTML = filtered.map(s => {
              const color = SCHOOL_COLOR[s.ecole] || '#c9a84c';
              const costLabel = s.niveau==='0' ? 'Sans emplacement' : `Coûte 1 emp. niv. ${s.niveau}`;
              return `
              <button type="button" class="card spell-card spell-mini-card" data-slug="${s._slug}" style="--school-color:${color};padding:0;">
                <div class="card-media">${imgWithFallback(spellImage(s.name), s._primaryName, { fallbackEmoji: SCHOOL_ICON[s.ecole] || '✨' })}</div>
                <div class="card-body">
                  <h3 class="card-title" style="font-size:.92rem;">${escapeHtml(s._primaryName)}</h3>
                  <div class="card-meta">
                    <span class="pill pill-muted">${s.niveau==='0'?'Mineur':`Niv. ${s.niveau}`}</span>
                    <span class="pill pill-muted">${escapeHtml(s.ecole)}</span>
                    <span class="pill pill-muted">${escapeHtml(castingTimeShort(s.temps))}</span>
                    ${s.concentration ? `<span class="pill pill-muted">Concentration</span>` : ''}
                  </div>
                  <p class="spell-mini-cost">${costLabel}</p>
                </div>
              </button>`;
            }).join('') || '<p class="page-lede">Aucun sort disponible à ajouter.</p>';
            gridEl.querySelectorAll('[data-slug]').forEach(b => {
              b.addEventListener('click', () => {
                const sp = available.find(s => s._slug === b.dataset.slug);
                if(!sp) return;
                openSpellDetail(sp, b, {
                  addLabel: wantCantrip ? 'Ajouter ce sort mineur' : (isPrepared ? 'Préparer ce sort' : 'Apprendre ce sort'),
                  onAdd: () => { tryAddSpell(sp._slug); closeModal(); },
                });
              });
            });
          }
          draw();
          body.querySelector('#spell-pick-q').addEventListener('input', (e) => draw(e.target.value));
        }
      });
    }
  }

  function slotDots(lvlKey, n){
    const used = new Set((ch.usedSlots && ch.usedSlots[lvlKey]) || []);
    let dots = '';
    for(let i=0;i<n;i++) dots += `<button type="button" class="slot-dot ${used.has(i)?'is-used':''}" data-lvl="${lvlKey}" data-idx="${i}" aria-label="Emplacement ${i+1}"></button>`;
    return `<div class="slot-dots">${dots}</div>`;
  }

  // ---------- INVENTAIRE ----------
  function renderInventaireTab(panel){
    panel.innerHTML = `
      <div class="flex-gap" style="margin-bottom:1em;">
        <div class="inv-combo" id="inv-combo">
          <input type="text" class="field" id="inv-new-name" placeholder="Nom de l’objet — tapez pour rechercher…" autocomplete="off">
          <div class="inv-suggest" id="inv-suggest" hidden></div>
        </div>
        <input type="number" class="field" id="inv-new-qty" value="1" min="1" style="width:80px;">
        <button class="btn btn-sm btn-primary" id="inv-add"><svg class="i"><use href="#i-plus"/></svg> Ajouter</button>
      </div>
      <p class="page-lede" style="font-size:.85em;margin-bottom:1em;">Équipez une arme en main principale/secondaire (ou à deux mains), une armure ou un bouclier — les emplacements de mains suivent les règles D&amp;D : une arme à deux mains occupe les deux mains, un bouclier occupe la main secondaire.</p>
      <div class="table-scroll">
        <table class="inv-table" id="inv-table">
          <thead><tr><th>Objet</th><th>Quantité</th><th>Poids</th><th>Équipement</th><th></th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    `;
    function equipLabel(slot){
      return { main:'Main principale', off:'Main secondaire', twohand:'Deux mains', armor:'Armure' }[slot] || '';
    }
    function equipCellHTML(it, idx){
      const looked = itemLookedUp(it);
      if(!looked || (looked.kind !== 'arme' && looked.kind !== 'armure')) return '—';
      if(looked.kind === 'arme'){
        if(isTwoHanded(looked)){
          const on = it.equipped === 'twohand';
          return `<button type="button" class="btn btn-sm ${on?'btn-primary':'btn-ghost'}" data-equip="${idx}" data-slot="twohand">${on?'Déséquiper':'Équiper (2 mains)'}</button>`;
        }
        return `
          <div class="inv-equip-ctl">
            <button type="button" class="btn btn-sm ${it.equipped==='main'?'btn-primary':'btn-ghost'}" data-equip="${idx}" data-slot="main">Princ.</button>
            <button type="button" class="btn btn-sm ${it.equipped==='off'?'btn-primary':'btn-ghost'}" data-equip="${idx}" data-slot="off">Sec.</button>
          </div>`;
      }
      const isShield = looked.categorie === 'Boucliers';
      const slot = isShield ? 'off' : 'armor';
      const on = it.equipped === slot;
      return `<button type="button" class="btn btn-sm ${on?'btn-primary':'btn-ghost'}" data-equip="${idx}" data-slot="${slot}">${on?'Déséquiper':(isShield?'Équiper le bouclier':"Équiper l’armure")}</button>`;
    }
    function renderRows(){
      const tbody = panel.querySelector('#inv-table tbody');
      if(!ch.inventory.length){ tbody.innerHTML = `<tr><td colspan="5" style="color:var(--ink-faint);">Inventaire vide.</td></tr>`; return; }
      tbody.innerHTML = ch.inventory.map((it, idx) => {
        const looked = itemLookedUp(it);
        return `
        <tr class="${it.equipped?'is-equipped':''}">
          <td><span class="inv-item-name" data-idx="${idx}">${escapeHtml(it.name)}</span>${it.equipped?`<span class="pill pill-muted inv-equip-pill">${equipLabel(it.equipped)}</span>`:''}</td>
          <td>
            <div class="inv-qty-ctl">
              <button data-dec="${idx}" aria-label="Diminuer">−</button>
              <span>${it.qty}</span>
              <button data-inc="${idx}" aria-label="Augmenter">+</button>
            </div>
          </td>
          <td>${escapeHtml(looked?.poids || '—')}</td>
          <td>${equipCellHTML(it, idx)}</td>
          <td><button class="btn btn-sm btn-ghost" data-rm="${idx}"><svg class="i"><use href="#i-trash"/></svg></button></td>
        </tr>`;
      }).join('');
      tbody.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => { ch.inventory[Number(b.dataset.inc)].qty++; persist(); renderRows(); }));
      tbody.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => {
        const i = Number(b.dataset.dec);
        ch.inventory[i].qty = Math.max(1, ch.inventory[i].qty - 1);
        persist(); renderRows();
      }));
      tbody.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => {
        ch.inventory.splice(Number(b.dataset.rm), 1); persist(); renderRows(); renderVitals();
      }));
      tbody.querySelectorAll('[data-equip]').forEach(b => b.addEventListener('click', (e) => {
        e.stopPropagation();
        setEquip(Number(b.dataset.equip), b.dataset.slot);
      }));
      tbody.querySelectorAll('.inv-item-name').forEach(el => {
        const it = ch.inventory[Number(el.dataset.idx)];
        const looked = itemLookedUp(it);
        if(!looked) return;
        attachPopover(el, () => `<div class="popover-title"><span>${escapeHtml(it.name)}</span></div><div>${escapeHtml(looked.description || looked.degats || looked.ca || '')} ${looked.prix||looked.cout?`· ${escapeHtml(looked.prix||looked.cout)}`:''}</div>`);
      });
    }
    renderRows();

    // ---- recherche d'objet au clavier (autocomplétion sur le compendium) ----
    const nameInput = panel.querySelector('#inv-new-name');
    const qtyInput = panel.querySelector('#inv-new-qty');
    const suggestBox = panel.querySelector('#inv-suggest');
    const catalog = [...DATA.itemLookup.values()];
    let matches = [];
    let activeIdx = -1;

    function closeSuggest(){
      suggestBox.hidden = true;
      suggestBox.innerHTML = '';
      matches = []; activeIdx = -1;
    }
    function highlightActive(){
      suggestBox.querySelectorAll('.inv-suggest-item').forEach((el,i) => el.classList.toggle('is-active', i === activeIdx));
      suggestBox.querySelector('.is-active')?.scrollIntoView({ block:'nearest' });
    }
    function pick(item){
      nameInput.value = item.nom;
      closeSuggest();
      qtyInput.focus(); qtyInput.select();
    }
    function openSuggest(query){
      const q = stripAccents(query.trim().toLowerCase());
      if(!q){ closeSuggest(); return; }
      matches = catalog
        .filter(it => stripAccents(it.nom.toLowerCase()).includes(q))
        .sort((a,b) => a.nom.localeCompare(b.nom))
        .slice(0, 40);
      activeIdx = -1;
      if(!matches.length){
        suggestBox.innerHTML = `<p class="inv-suggest-empty">Aucun objet du compendium ne correspond — « Ajouter » créera un objet personnalisé.</p>`;
        suggestBox.hidden = false;
        return;
      }
      suggestBox.innerHTML = matches.map((it,i) => `
        <button type="button" class="inv-suggest-item" data-idx="${i}">
          <span class="inv-suggest-name">${escapeHtml(it.nom)}</span>
          <span class="pill pill-muted">${ITEM_KIND_LABEL[it.kind]||''}</span>
        </button>
      `).join('');
      suggestBox.hidden = false;
      suggestBox.querySelectorAll('.inv-suggest-item').forEach(btn => {
        btn.addEventListener('click', () => pick(matches[Number(btn.dataset.idx)]));
      });
    }
    nameInput.addEventListener('input', () => openSuggest(nameInput.value));
    nameInput.addEventListener('keydown', (e) => {
      if(suggestBox.hidden || !matches.length) return;
      if(e.key === 'ArrowDown'){ e.preventDefault(); activeIdx = Math.min(matches.length-1, activeIdx+1); highlightActive(); }
      else if(e.key === 'ArrowUp'){ e.preventDefault(); activeIdx = Math.max(0, activeIdx-1); highlightActive(); }
      else if(e.key === 'Enter'){ if(activeIdx >= 0){ e.preventDefault(); pick(matches[activeIdx]); } }
      else if(e.key === 'Escape'){ closeSuggest(); }
    });
    nameInput.addEventListener('blur', () => setTimeout(closeSuggest, 150));

    panel.querySelector('#inv-add').addEventListener('click', () => {
      const name = nameInput.value.trim();
      if(!name) return;
      ch.inventory.push({ name, qty: Math.max(1, parseInt(qtyInput.value,10)||1), equipped:null });
      persist(); renderRows(); closeSuggest();
      nameInput.value=''; qtyInput.value='1'; nameInput.focus();
    });
  }

  // ---------- OR ----------
  function renderOrTab(panel){
    panel.innerHTML = `
      <div style="max-width:600px;">
        <div class="coin-grid">
          ${COIN_RATES.map(([k,label]) => `
            <div class="coin-tile frame">
              <div class="coin-icon">🪙</div>
              <div class="coin-label">${label}</div>
              <input type="number" class="field" min="0" id="gold-${k}" value="${ch.gold?.[k]||0}">
            </div>
          `).join('')}
        </div>
        <div class="gold-total frame" id="gold-total"></div>
      </div>
    `;
    function updateTotal(){
      const total = COIN_RATES.reduce((sum,[k,,rate]) => sum + (ch.gold?.[k]||0) * rate, 0);
      const rounded = Math.round(total * 100) / 100;
      panel.querySelector('#gold-total').textContent = `Équivalent total : ${rounded} pièces d’or`;
    }
    COIN_RATES.forEach(([k]) => {
      panel.querySelector(`#gold-${k}`).addEventListener('input', (e) => {
        ch.gold[k] = Math.max(0, parseInt(e.target.value,10) || 0);
        persist();
        updateTotal();
      });
    });
    updateTotal();
  }

  // ---------- PROFIL ----------
  function renderProfilTab(panel){
    panel.innerHTML = `
      <div class="abil-grid" style="grid-template-columns:1fr;max-width:600px;gap:16px;">
        <div><label class="field-label">Nom</label><input type="text" class="field" id="prof-name" value="${escapeHtml(ch.profile.name)}"></div>
        <div><label class="field-label">Apparence</label><textarea class="field" id="prof-appearance" rows="3">${escapeHtml(ch.profile.appearance)}</textarea></div>
        <div><label class="field-label">Historique &amp; motivations</label><textarea class="field" id="prof-backstory" rows="4">${escapeHtml(ch.profile.backstory)}</textarea></div>
      </div>
    `;
    panel.querySelector('#prof-name').addEventListener('input', (e) => {
      ch.profile.name = e.target.value; persist();
      container.querySelector('.char-idbox h1').textContent = ch.profile.name || 'Aventurier sans nom';
    });
    panel.querySelector('#prof-appearance').addEventListener('input', (e) => { ch.profile.appearance = e.target.value; persist(); });
    panel.querySelector('#prof-backstory').addEventListener('input', (e) => { ch.profile.backstory = e.target.value; persist(); });
  }

  // ---------- NOTES ----------
  function renderNotesTab(panel){
    panel.innerHTML = `<textarea class="notes-area" id="notes-area" placeholder="Notes de session, objectifs, contacts, indices…">${escapeHtml(ch.profile.notes||'')}</textarea>`;
    panel.querySelector('#notes-area').addEventListener('input', (e) => { ch.profile.notes = e.target.value; persist(); });
  }

  // ---------- FICHE IMPRIMABLE ----------
  function renderPrintSheet(){
    const box = container.querySelector('#print-sheet');
    const c = DATA.classes.find(x => x.classe_title === ch.className);
    const traits = c ? parseClassTraits(c.html_traits_table) : null;
    const dexMod = abilityMod('dexterite');
    const armorLooked = equippedArmorLooked();
    const ac = computeArmorClass({ dexMod, armorCA: armorLooked?.ca ?? null, hasShield: hasShieldEquipped() });
    box.innerHTML = `
      <h1>${escapeHtml(ch.profile.name||'Aventurier')}</h1>
      <p>${escapeHtml(ch.species||'')} ${ch.speciesChoiceSubrace?`(${escapeHtml(ch.speciesChoiceSubrace)})`:''} — ${escapeHtml(ch.className||'')} niveau ${ch.level} — ${escapeHtml(ch.background||'')}</p>
      <p>PV ${ch.hp.current}/${ch.hp.max} — CA ${ac.value} — Initiative ${fmtMod(dexMod)} — Bonus de maîtrise ${fmtMod(proficiencyBonus(ch.level||1))} ${traits?`— Dé de vie D${traits.deVieFaces}`:''}</p>
      <table class="eq-table"><thead><tr>${ABILITIES.map(a=>`<th>${a.short}</th>`).join('')}</tr></thead>
      <tbody><tr>${ABILITIES.map(a=>`<td>${ch.abilities?.[a.key]??10} (${fmtMod(abilityMod(a.key))})</td>`).join('')}</tr></tbody></table>
      <h3>Compétences &amp; langues</h3>
      <p>Compétences : ${(ch.classSkills||[]).join(', ')||'—'}<br>Langues : ${(ch.languages||[]).join(', ')||'—'}</p>
      <h3>Inventaire</h3>
      <p>${ch.inventory.map(i=>`${i.qty>1?`${i.qty}× `:''}${escapeHtml(i.name)}`).join(', ')||'—'} — Bourse : ${ch.gold?.pp||0} pp, ${ch.gold?.po||0} po, ${ch.gold?.pe||0} pe, ${ch.gold?.pa||0} pa, ${ch.gold?.pc||0} pc</p>
      <h3>Notes</h3>
      <p>${escapeHtml(ch.profile.notes||'—')}</p>
    `;
  }

  renderShell();
}
