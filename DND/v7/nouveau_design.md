<!-- Arcana 5e - Grimoire Dashboard -->
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/><meta content="mobile_tab" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{width:100vw;margin:0;padding:0;background-color:#0f131d;}body{overscroll-behavior:none;}.pb-safe{padding-bottom:env(safe-area-inset-bottom,0px);}.pt-safe{padding-top:env(safe-area-inset-top,0px);}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-tertiary-fixed-variant": "#2f3aa3", "primary-container": "#d4af37", "on-primary": "#3c2f00", "on-secondary-container": "#00374d", "surface-bright": "#353944", "surface": "#0f131d", "surface-container-high": "#262a34", "tertiary-container": "#a5adff", "background": "#0f131d", "surface-container": "#1b1f2a", "on-surface-variant": "#d0c5af", "outline": "#99907c", "outline-variant": "#4d4635", "secondary-container": "#00a6e0", "on-background": "#dfe2f0", "primary-fixed-dim": "#e9c349", "tertiary-fixed": "#e0e0ff", "on-primary-fixed": "#241a00", "primary": "#f2ca50", "on-primary-fixed-variant": "#574500", "tertiary": "#c7cbff", "surface-variant": "#313540", "on-tertiary-fixed": "#000767", "surface-container-lowest": "#0a0e18", "error-container": "#93000a", "on-primary-container": "#554300", "surface-dim": "#0f131d", "secondary-fixed-dim": "#7bd0ff", "surface-container-highest": "#313540", "primary-fixed": "#ffe088", "on-secondary-fixed": "#001e2c", "on-tertiary": "#131e8c", "on-error": "#690005", "tertiary-fixed-dim": "#bdc2ff", "on-tertiary-container": "#2d38a1", "inverse-surface": "#dfe2f0", "secondary-fixed": "#c4e7ff", "on-surface": "#dfe2f0", "on-error-container": "#ffdad6", "surface-container-low": "#171b26", "inverse-primary": "#735c00", "secondary": "#7bd0ff", "error": "#ffb4ab", "on-secondary": "#00354a", "surface-tint": "#e9c349", "on-secondary-fixed-variant": "#004c69", "inverse-on-surface": "#2c303b" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "space-sm": "0.5rem", "space-lg": "1.5rem", "gutter": "1.5rem", "space-xs": "0.25rem", "gutter-mobile": "0.75rem", "margin-mobile": "1rem", "space-md": "1rem", "space-xl": "2.5rem", "margin": "2rem" }, "fontFamily": { "body-md": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Playfair Display"], "body-lg": ["Plus Jakarta Sans"], "stat-numeric": ["JetBrains Mono"], "body-sm": ["Plus Jakarta Sans"], "display-lg": ["Playfair Display"], "label-caps": ["Plus Jakarta Sans"], "headline-md": ["Playfair Display"], "display-lg-mobile": ["Playfair Display"], "formula-sm": ["JetBrains Mono"], "headline-sm": ["Playfair Display"], "stat-modifier": ["JetBrains Mono"], "headline-lg": ["Playfair Display"] }, "fontSize": { "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "400" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "0em", "fontWeight": "600" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "stat-numeric": ["24px", { "lineHeight": "28px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "400" }], "display-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-caps": ["11px", { "lineHeight": "14px", "letterSpacing": "0.08em", "fontWeight": "700" }], "headline-md": ["22px", { "lineHeight": "28px", "letterSpacing": "0.01em", "fontWeight": "600" }], "display-lg-mobile": ["30px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "formula-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "headline-sm": ["18px", { "lineHeight": "24px", "letterSpacing": "0.02em", "fontWeight": "600" }], "stat-modifier": ["16px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "0em", "fontWeight": "600" }] } } } }</script><style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head><body class="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary selection:text-on-primary"><header class="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(0,0,0,0.5)]"><div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm min-w-0"><img alt="Arcana 5e Emblem" class="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1XmU8-_97BRk3fBob1fCTSwJ0v9Y7WI6c_7Tz5zpY_Z7Ha1I5yu9hNSJP6ynPten5XLbO44ZCateTNf-tbKZDQsorGHclyB-k_PXer5mGZxG7fZLmtsBqyFUSOZAQzk0_9BVVUxkM8ZaZ2sdiT_D9c6w9unC_NMiNZ1EyyiwUxRy7E2Rsg4QcO8e3R5cdW-CzzZfA7apEViepCJSkCCfPfSHfu0GGiooFw2WmHwwvzEPg"/><div class="flex flex-col min-w-0"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary tracking-wide font-bold uppercase truncate">ARCANA 5E</span><span class="text-xs text-outline font-stat-numeric hidden sm:inline">•</span><span class="text-xs text-outline truncate hidden sm:inline uppercase tracking-widest font-label-caps">Dashboard</span></div><span class="font-label-caps text-label-caps text-on-surface-variant/80 tracking-widest uppercase truncate">2024 RULES COMPENDIUM</span></div></div><div class="flex items-center gap-space-xs flex-shrink-0"><button aria-label="Quick Dice Roll d20" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-primary transition-all" type="button"><span class="material-symbols-outlined text-[20px]">casino</span></button><button aria-label="Search compendium" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-on-surface transition-all" type="button"><span class="material-symbols-outlined text-[20px]">search</span></button><button aria-label="Character profile Aeloria Level 7" class="h-11 pl-space-xs pr-space-sm flex items-center gap-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all" type="button"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/><div class="flex flex-col items-start leading-none pr-0.5"><span class="font-label-caps text-[10px] text-on-surface font-semibold truncate max-w-[64px]">Aeloria</span><span class="font-formula-sm text-[9px] text-primary">Lv.7</span></div></button></div></div></header><main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full px-margin-mobile pb-space-xl gap-space-md">
<!-- Ambient Living Banner -->
<section class="relative w-full rounded-xl bg-surface-container overflow-hidden shadow-xl p-space-md">
<div class="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
<div class="absolute -bottom-16 -left-12 w-48 h-48 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
<div class="relative z-10 flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-surface-container-high text-primary">
<span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Campaign Dossier</span>
</div>
<span class="font-formula-sm text-formula-sm px-2 py-0.5 rounded-full bg-surface-container-highest text-primary">Session 14</span>
</div>
<div class="flex flex-col">
<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-normal leading-tight">Greetings, Archmage</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">The Shattered Crown • Sanctum of the Silver Moon</p>
</div>
<!-- Character Hero Card Spotlight -->
<div class="mt-space-xs rounded-xl bg-surface-container-low p-space-sm flex flex-col gap-space-sm shadow-md">
<div class="flex items-center gap-space-sm">
<div class="relative flex-shrink-0">
<img class="w-14 h-14 rounded-xl object-cover shadow-md" data-alt="Intricate digital concept portrait of Aeloria Silvervein, an elegant female high elf wizard bladesinger with glowing silver runes dancing along her rapier blade, moonlit sapphire velvet robes with antique brass trim, sharp intelligent eyes, floating arcane sparks in dark atmospheric gothic study." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBflRXjh0GObnrS_rQjlCt4jiGOyLuLAL8Pyz6pN-GEysR371M6CMmKyLySF7Am9OysioxvKWPTEna_x0FcoRABdB61q8dqNKECQcMmgUOE8xB4fjMNQBsKTGpMbaRCtt3H8FGmYfUQCig4Svfoyhbdp_SE3o0v8dFUQdMTjwCN_4QdUhY5OwJqs7XUsiIWY4rSN4es6XV78aaaOgjcflyFg3SixCYbNw0x-H_zQ0oD"/>
<span class="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-container-highest text-[10px] font-stat-numeric text-primary">7</span>
</div>
<div class="flex flex-col min-w-0 flex-1">
<div class="flex items-center justify-between">
<h2 class="font-headline-sm text-headline-sm text-on-surface truncate">Aeloria Silvervein</h2>
<span class="font-formula-sm text-formula-sm px-1.5 py-0.5 rounded-lg bg-surface-container-high text-secondary">Bladesinging</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">High Elf Wizard • Evoker of the Spire</span>
</div>
</div>
<!-- HP & Defenses Grid -->
<div class="grid grid-cols-3 gap-space-xs text-center">
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container">
<span class="font-label-caps text-[10px] text-on-surface-variant uppercase">HP Meter</span>
<div class="flex items-baseline gap-0.5 mt-0.5">
<span class="font-stat-numeric text-[17px] text-secondary font-bold">48</span>
<span class="font-formula-sm text-[11px] text-on-surface-variant">/48</span>
</div>
<div class="w-full bg-surface-container-highest h-1 rounded-full mt-1 overflow-hidden">
<div class="bg-secondary h-full rounded-full" style="width: 100%;"></div>
</div>
</div>
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container">
<span class="font-label-caps text-[10px] text-on-surface-variant uppercase">Armor Class</span>
<div class="flex items-baseline gap-1 mt-0.5">
<span class="font-stat-numeric text-[17px] text-primary font-bold">16</span>
<span class="font-formula-sm text-[10px] text-primary/80" title="During Bladesong">(20)</span>
</div>
<span class="font-body-sm text-[10px] text-on-surface-variant truncate">Song Ready</span>
</div>
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container">
<span class="font-label-caps text-[10px] text-on-surface-variant uppercase">Passive Prc</span>
<div class="flex items-baseline gap-0.5 mt-0.5">
<span class="font-stat-numeric text-[17px] text-on-surface font-bold">15</span>
</div>
<span class="font-body-sm text-[10px] text-on-surface-variant">Darkvision 60'</span>
</div>
</div>
<!-- Spell Slot Glyphs -->
<div class="flex flex-col gap-1.5 pt-1 bg-surface-container/60 p-2 rounded-lg">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
<span class="material-symbols-outlined text-[13px] text-primary">magic_button</span> Arcane Mana Reservoirs (2024)
            </span>
<span class="font-formula-sm text-[10px] text-primary">10 / 11 Active</span>
</div>
<div class="grid grid-cols-4 gap-1.5 text-center">
<!-- 1st Level -->
<div class="flex flex-col items-center gap-1 py-1 rounded bg-surface-container">
<span class="font-label-caps text-[9px] text-on-surface-variant">1ST TIER</span>
<div class="flex gap-1">
<span class="w-2.5 h-2.5 rotate-45 bg-secondary rounded-[1px] shadow-[0_0_8px_rgba(123,208,255,0.7)]"></span>
<span class="w-2.5 h-2.5 rotate-45 bg-secondary rounded-[1px] shadow-[0_0_8px_rgba(123,208,255,0.7)]"></span>
<span class="w-2.5 h-2.5 rotate-45 bg-secondary rounded-[1px] shadow-[0_0_8px_rgba(123,208,255,0.7)]"></span>
<span class="w-2.5 h-2.5 rotate-45 bg-secondary rounded-[1px] shadow-[0_0_8px_rgba(123,208,255,0.7)]"></span>
</div>
</div>
<!-- 2nd Level -->
<div class="flex flex-col items-center gap-1 py-1 rounded bg-surface-container">
<span class="font-label-caps text-[9px] text-on-surface-variant">2ND TIER</span>
<div class="flex gap-1">
<span class="w-2.5 h-2.5 rotate-45 bg-secondary rounded-[1px] shadow-[0_0_8px_rgba(123,208,255,0.7)]"></span>
<span class="w-2.5 h-2.5 rotate-45 bg-secondary rounded-[1px] shadow-[0_0_8px_rgba(123,208,255,0.7)]"></span>
<span class="w-2.5 h-2.5 rotate-45 bg-secondary rounded-[1px] shadow-[0_0_8px_rgba(123,208,255,0.7)]"></span>
</div>
</div>
<!-- 3rd Level (1 expended) -->
<div class="flex flex-col items-center gap-1 py-1 rounded bg-surface-container">
<span class="font-label-caps text-[9px] text-on-surface-variant">3RD TIER</span>
<div class="flex gap-1">
<span class="w-2.5 h-2.5 rotate-45 bg-secondary rounded-[1px] shadow-[0_0_8px_rgba(123,208,255,0.7)]"></span>
<span class="w-2.5 h-2.5 rotate-45 bg-secondary rounded-[1px] shadow-[0_0_8px_rgba(123,208,255,0.7)]"></span>
<span class="w-2.5 h-2.5 rotate-45 bg-surface-container-highest rounded-[1px]" title="Expended"></span>
</div>
</div>
<!-- 4th Level -->
<div class="flex flex-col items-center gap-1 py-1 rounded bg-surface-container">
<span class="font-label-caps text-[9px] text-on-surface-variant">4TH TIER</span>
<div class="flex gap-1">
<span class="w-2.5 h-2.5 rotate-45 bg-primary rounded-[1px] shadow-[0_0_8px_rgba(242,202,80,0.8)]"></span>
</div>
</div>
</div>
</div>
<button class="w-full mt-0.5 py-2.5 px-3 rounded-lg bg-primary hover:bg-primary-fixed-dim text-on-primary font-label-caps text-label-caps uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-md" type="button">
<span class="material-symbols-outlined text-[18px]">account_box</span>
<span>Open Full Character Grimoire</span>
</button>
</div>
</div>
</section>
<!-- Global Arcane Search -->
<section class="flex flex-col gap-space-xs w-full">
<div class="relative flex items-center w-full">
<span class="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">search_spark</span>
<input class="w-full h-12 pl-10 pr-10 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:bg-surface-container-high focus:outline-none focus:ring-0 shadow-inner" placeholder="Search 2024 Spells, Feats, Classes, Rules..." type="text"/>
<button aria-label="Voice rune dictation" class="absolute right-2.5 w-7 h-7 rounded-lg bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-container-highest" type="button">
<span class="material-symbols-outlined text-[16px]">mic</span>
</button>
</div>
<!-- Quick Category Filter Chips -->
<div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
<button class="px-3 py-1 rounded-full bg-primary text-on-primary font-label-caps text-[10px] uppercase tracking-wider whitespace-nowrap shadow-sm" type="button">All Codex</button>
<button class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-[10px] uppercase tracking-wider whitespace-nowrap" type="button">Spells (390+)</button>
<button class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-[10px] uppercase tracking-wider whitespace-nowrap" type="button">Classes</button>
<button class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-[10px] uppercase tracking-wider whitespace-nowrap" type="button">Species</button>
<button class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-[10px] uppercase tracking-wider whitespace-nowrap" type="button">Magic Items</button>
<button class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-[10px] uppercase tracking-wider whitespace-nowrap" type="button">Rules 2024</button>
</div>
</section>
<!-- Quick Action & Dice Tray Bar -->
<section class="flex flex-col gap-space-xs rounded-xl bg-surface-container p-space-sm shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-primary text-[18px]">casino</span>
<span class="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">Fast Dice Crucible</span>
</div>
<!-- Modifier Selector Drop -->
<div class="flex items-center gap-1">
<button class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-stat-modifier text-[12px] hover:bg-primary hover:text-on-primary transition-colors" id="mod-int" type="button">+4 INT</button>
<button class="px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-stat-modifier text-[12px] hover:bg-surface-container-high transition-colors" id="mod-dex" type="button">+3 DEX</button>
<button class="px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-stat-modifier text-[12px] hover:bg-surface-container-high transition-colors" id="mod-prof" type="button">+3 PB</button>
</div>
</div>
<!-- Dice Selector Strip -->
<div class="grid grid-cols-7 gap-1 pt-1">
<button class="dice-btn flex flex-col items-center justify-center py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-95 transition-all" data-die="4" type="button">
<span class="font-formula-sm text-[11px] text-on-surface-variant">d4</span>
<span class="material-symbols-outlined text-[16px] text-primary mt-0.5">change_history</span>
</button>
<button class="dice-btn flex flex-col items-center justify-center py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-95 transition-all" data-die="6" type="button">
<span class="font-formula-sm text-[11px] text-on-surface-variant">d6</span>
<span class="material-symbols-outlined text-[16px] text-primary mt-0.5">square</span>
</button>
<button class="dice-btn flex flex-col items-center justify-center py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-95 transition-all" data-die="8" type="button">
<span class="font-formula-sm text-[11px] text-on-surface-variant">d8</span>
<span class="material-symbols-outlined text-[16px] text-primary mt-0.5">diamond</span>
</button>
<button class="dice-btn flex flex-col items-center justify-center py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-95 transition-all" data-die="10" type="button">
<span class="font-formula-sm text-[11px] text-on-surface-variant">d10</span>
<span class="material-symbols-outlined text-[16px] text-primary mt-0.5">pentagon</span>
</button>
<button class="dice-btn flex flex-col items-center justify-center py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-95 transition-all" data-die="12" type="button">
<span class="font-formula-sm text-[11px] text-on-surface-variant">d12</span>
<span class="material-symbols-outlined text-[16px] text-primary mt-0.5">hexagon</span>
</button>
<button class="dice-btn flex flex-col items-center justify-center py-2 rounded-lg bg-primary-container text-on-primary-container hover:brightness-110 active:scale-95 transition-all shadow-md" data-die="20" type="button">
<span class="font-formula-sm text-[11px] font-bold">d20</span>
<span class="material-symbols-outlined text-[18px] mt-0.5 font-bold">token</span>
</button>
<button class="dice-btn flex flex-col items-center justify-center py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-95 transition-all" data-die="100" type="button">
<span class="font-formula-sm text-[11px] text-on-surface-variant">d%</span>
<span class="material-symbols-outlined text-[16px] text-primary mt-0.5">percent</span>
</button>
</div>
<!-- Micro Roll Output Preview (Dynamic Delight) -->
<div class="flex items-center justify-between px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface" id="dice-banner-result">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-secondary">cloud_upload</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant" id="dice-calc">d20 + 4 (INT Check)</span>
</div>
<div class="flex items-center gap-1.5">
<span class="font-label-caps text-[10px] text-outline uppercase">Natural: 15</span>
<span class="font-stat-numeric text-[18px] text-primary" id="dice-total">19</span>
</div>
</div>
</section>
<!-- Active Buffs & Session Ticker -->
<section class="flex flex-col gap-1.5 w-full">
<div class="flex items-center justify-between px-0.5">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Active Wards &amp; Condition Status</span>
<span class="font-formula-sm text-[11px] text-secondary">2 Sustained</span>
</div>
<div class="grid grid-cols-2 gap-space-xs">
<div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container shadow-sm">
<div class="flex items-center gap-2 min-w-0">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse flex-shrink-0"></span>
<div class="flex flex-col min-w-0">
<span class="font-body-sm text-[13px] text-on-surface font-semibold truncate">Mage Armor</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">6h 20m remaining</span>
</div>
</div>
<span class="font-formula-sm text-[11px] text-secondary px-1.5 py-0.5 rounded bg-surface-container-high">+3 AC</span>
</div>
<div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container shadow-sm">
<div class="flex items-center gap-2 min-w-0">
<span class="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
<div class="flex flex-col min-w-0">
<span class="font-body-sm text-[13px] text-on-surface font-semibold truncate">Bladesong</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">2/3 uses primed</span>
</div>
</div>
<button class="font-label-caps text-[10px] text-on-primary bg-primary px-2 py-1 rounded uppercase tracking-wider active:scale-95 transition-transform" type="button">Cast</button>
</div>
</div>
</section>
<!-- Quick Reference Compendium Categories (The Arcane Grimoire) -->
<section class="flex flex-col gap-space-xs w-full">
<div class="flex items-center justify-between px-0.5">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-primary text-[18px]">menu_book</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">2024 Compendium Codex</h2>
</div>
<a class="font-label-caps text-label-caps text-primary uppercase tracking-wider hover:underline" href="#">Explore All</a>
</div>
<!-- Category 2-Column Cards Deck -->
<div class="grid grid-cols-2 gap-space-sm">
<!-- Card 1: Classes & Subclasses -->
<a class="group flex flex-col justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md" href="#">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="w-8 h-8 rounded-lg bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-[18px]">swords</span>
</span>
<span class="font-formula-sm text-[10px] text-primary px-1.5 py-0.5 rounded bg-surface-container-lowest">Weapon Mastery</span>
</div>
<h3 class="font-headline-sm text-[15px] text-on-surface group-hover:text-primary transition-colors">Classes &amp; Subclasses</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-2">12 Core 2024 classes, revised progression paths, and tactical mastery.</p>
</div>
<div class="flex items-center justify-between pt-2 mt-2 bg-surface-container-lowest/50 px-2 py-1 rounded">
<span class="font-label-caps text-[9px] text-on-surface-variant uppercase">48 Archetypes</span>
<span class="material-symbols-outlined text-[14px] text-primary group-hover:translate-x-0.5 transition-transform">chevron_right</span>
</div>
</a>
<!-- Card 2: Spells & Invocations -->
<a class="group flex flex-col justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md" href="#">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="w-8 h-8 rounded-lg bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary text-secondary flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-[18px]">auto_fix_high</span>
</span>
<span class="font-formula-sm text-[10px] text-secondary px-1.5 py-0.5 rounded bg-surface-container-lowest">390+ Spells</span>
</div>
<h3 class="font-headline-sm text-[15px] text-on-surface group-hover:text-primary transition-colors">Spells &amp; Invocations</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-2">Complete revised spell lists, upcasting scaling, ritual tags &amp; material components.</p>
</div>
<div class="flex items-center justify-between pt-2 mt-2 bg-surface-container-lowest/50 px-2 py-1 rounded">
<span class="font-label-caps text-[9px] text-on-surface-variant uppercase">Full Grimoire</span>
<span class="material-symbols-outlined text-[14px] text-primary group-hover:translate-x-0.5 transition-transform">chevron_right</span>
</div>
</a>
<!-- Card 3: Species & Lineages -->
<a class="group flex flex-col justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md" href="#">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="w-8 h-8 rounded-lg bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary text-tertiary flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-[18px]">group</span>
</span>
<span class="font-formula-sm text-[10px] text-tertiary px-1.5 py-0.5 rounded bg-surface-container-lowest">Origins</span>
</div>
<h3 class="font-headline-sm text-[15px] text-on-surface group-hover:text-primary transition-colors">Species &amp; Lineages</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-2">Updated 2024 traits, Elven Trance adjustments, Aasimar planar forms, Tiefling heritages.</p>
</div>
<div class="flex items-center justify-between pt-2 mt-2 bg-surface-container-lowest/50 px-2 py-1 rounded">
<span class="font-label-caps text-[9px] text-on-surface-variant uppercase">10 Lineages</span>
<span class="material-symbols-outlined text-[14px] text-primary group-hover:translate-x-0.5 transition-transform">chevron_right</span>
</div>
</a>
<!-- Card 4: Feats & Backgrounds -->
<a class="group flex flex-col justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md" href="#">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="w-8 h-8 rounded-lg bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-[18px]">military_tech</span>
</span>
<span class="font-formula-sm text-[10px] text-primary px-1.5 py-0.5 rounded bg-surface-container-lowest">Epic Boons</span>
</div>
<h3 class="font-headline-sm text-[15px] text-on-surface group-hover:text-primary transition-colors">Feats &amp; Backgrounds</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-2">Origin Feats at Level 1, revised stat ASI feats, and Level 19 Epic Boon rewards.</p>
</div>
<div class="flex items-center justify-between pt-2 mt-2 bg-surface-container-lowest/50 px-2 py-1 rounded">
<span class="font-label-caps text-[9px] text-on-surface-variant uppercase">75+ Feats</span>
<span class="material-symbols-outlined text-[14px] text-primary group-hover:translate-x-0.5 transition-transform">chevron_right</span>
</div>
</a>
<!-- Card 5: 2024 Core Rules -->
<a class="group flex flex-col justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md" href="#">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="w-8 h-8 rounded-lg bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary text-secondary flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-[18px]">gavel</span>
</span>
<span class="font-formula-sm text-[10px] text-secondary px-1.5 py-0.5 rounded bg-surface-container-lowest">Rules Glossary</span>
</div>
<h3 class="font-headline-sm text-[15px] text-on-surface group-hover:text-primary transition-colors">2024 Core Rules</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-2">New Exhaustion system, Influence actions, Surprise reworks, tactical movement rules.</p>
</div>
<div class="flex items-center justify-between pt-2 mt-2 bg-surface-container-lowest/50 px-2 py-1 rounded">
<span class="font-label-caps text-[9px] text-on-surface-variant uppercase">Glossary A-Z</span>
<span class="material-symbols-outlined text-[14px] text-primary group-hover:translate-x-0.5 transition-transform">chevron_right</span>
</div>
</a>
<!-- Card 6: Bestiary of the Realms -->
<a class="group flex flex-col justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md" href="#">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="w-8 h-8 rounded-lg bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary text-error flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-[18px]">pets</span>
</span>
<span class="font-formula-sm text-[10px] text-error px-1.5 py-0.5 rounded bg-surface-container-lowest">CR 0 - 30</span>
</div>
<h3 class="font-headline-sm text-[15px] text-on-surface group-hover:text-primary transition-colors">Bestiary of Realms</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-2">Streamlined monster stat blocks, distinct spell actions, and dynamic lair triggers.</p>
</div>
<div class="flex items-center justify-between pt-2 mt-2 bg-surface-container-lowest/50 px-2 py-1 rounded">
<span class="font-label-caps text-[9px] text-on-surface-variant uppercase">500+ Foes</span>
<span class="material-symbols-outlined text-[14px] text-primary group-hover:translate-x-0.5 transition-transform">chevron_right</span>
</div>
</a>
</div>
</section>
<!-- Recently Viewed & Bookmarked Runes -->
<section class="flex flex-col gap-space-xs w-full">
<div class="flex items-center justify-between px-0.5">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-primary text-[18px]">bookmark_heart</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Grimoire Bookmarks</h2>
</div>
<button class="font-formula-sm text-[11px] text-on-surface-variant hover:text-on-surface" type="button">Clear History</button>
</div>
<div class="flex flex-col gap-1.5">
<!-- Item 1: Silvery Barbs -->
<div class="flex items-center justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors shadow-sm">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">flash_on</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-1.5">
<span class="font-body-lg text-[14px] font-semibold text-on-surface truncate">Silvery Barbs</span>
<span class="px-1.5 py-0.2 rounded bg-surface-container-highest text-error font-formula-sm text-[10px]">Reaction</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">1st-Level Enchantment • 60 ft Range</span>
</div>
</div>
<button class="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">visibility</span>
</button>
</div>
<!-- Item 2: Bladesong -->
<div class="flex items-center justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors shadow-sm">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">music_note</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-1.5">
<span class="font-body-lg text-[14px] font-semibold text-on-surface truncate">Bladesong</span>
<span class="px-1.5 py-0.2 rounded bg-surface-container-highest text-tertiary font-formula-sm text-[10px]">Bonus Action</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Wizard Feature • +INT to AC &amp; Conc Saves</span>
</div>
</div>
<button class="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">visibility</span>
</button>
</div>
<!-- Item 3: Weapon Mastery: Nick -->
<div class="flex items-center justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors shadow-sm">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">colorize</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-1.5">
<span class="font-body-lg text-[14px] font-semibold text-on-surface truncate">Weapon Mastery: Nick</span>
<span class="px-1.5 py-0.2 rounded bg-surface-container-highest text-primary font-formula-sm text-[10px]">Passive Rule</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Light Weapon Extra Attack without Bonus Action</span>
</div>
</div>
<button class="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">visibility</span>
</button>
</div>
<!-- Item 4: Counterspell (2024 Revision) -->
<div class="flex items-center justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors shadow-sm">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">chevron_left</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-1.5">
<span class="font-body-lg text-[14px] font-semibold text-on-surface truncate">Counterspell (2024 Revision)</span>
<span class="px-1.5 py-0.2 rounded bg-surface-container-highest text-error font-formula-sm text-[10px]">Reaction</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">3rd-Level Abjuration • Target makes CON Save</span>
</div>
</div>
<button class="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">visibility</span>
</button>
</div>
</div>
</section>
<!-- Interactive Tactical Dice Quick Trigger Script -->
<script>
    (function initDashboardDiceTray() {
      const diceBtns = document.querySelectorAll('.dice-btn');
      const calcSpan = document.getElementById('dice-calc');
      const totalSpan = document.getElementById('dice-total');
      const modIntBtn = document.getElementById('mod-int');
      const modDexBtn = document.getElementById('mod-dex');
      const modProfBtn = document.getElementById('mod-prof');

      let currentModName = 'INT';
      let currentModVal = 4;

      function updateModUI(activeBtn, name, val) {
        [modIntBtn, modDexBtn, modProfBtn].forEach(b => {
          b.classList.remove('bg-surface-container-highest', 'text-primary');
          b.classList.add('bg-surface-container-low', 'text-on-surface-variant');
        });
        activeBtn.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
        activeBtn.classList.add('bg-surface-container-highest', 'text-primary');
        currentModName = name;
        currentModVal = val;
      }

      if (modIntBtn) modIntBtn.addEventListener('click', () => updateModUI(modIntBtn, 'INT Check', 4));
      if (modDexBtn) modDexBtn.addEventListener('click', () => updateModUI(modDexBtn, 'DEX Save', 3));
      if (modProfBtn) modProfBtn.addEventListener('click', () => updateModUI(modProfBtn, 'Proficiency', 3));

      diceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const die = parseInt(btn.getAttribute('data-die') || '20', 10);
          const roll = Math.floor(Math.random() * die) + 1;
          const sum = roll + currentModVal;

          btn.classList.add('scale-90');
          setTimeout(() => btn.classList.remove('scale-90'), 150);

          if (calcSpan && totalSpan) {
            calcSpan.textContent = 'd' + die + ' (' + roll + ') + ' + currentModVal + ' (' + currentModName + ')';
            totalSpan.textContent = sum;

            if (die === 20 && roll === 20) {
              totalSpan.classList.add('text-primary');
              totalSpan.classList.remove('text-error');
              totalSpan.textContent = '20 (CRIT!)';
            } else if (die === 20 && roll === 1) {
              totalSpan.classList.remove('text-primary');
              totalSpan.classList.add('text-error');
              totalSpan.textContent = '1 (Fumble)';
            } else {
              totalSpan.classList.remove('text-error');
              totalSpan.classList.add('text-primary');
            }
          }
        });
      });
    })();
  </script>
</div></main><nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.65)]" data-active-classes="text-primary font-semibold"><div class="flex justify-around items-center h-16 px-space-xs"><a aria-current="page" class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors text-primary font-semibold" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[22px]">explore</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Dashboard</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="compendium" href="#"><span class="material-symbols-outlined text-[22px]">local_library</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Library</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="sheet" href="#"><span class="material-symbols-outlined text-[22px]">shield_person</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Sheet</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="spell" href="#"><span class="material-symbols-outlined text-[22px]">auto_fix_high</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Spells</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="abilities" href="#"><span class="material-symbols-outlined text-[22px]">swords</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Features</span></a></div></nav></body></html>

<!-- Spell Reference - Fireball -->
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/><meta content="mobile_tab" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{width:100vw;margin:0;padding:0;background-color:#0f131d;}body{overscroll-behavior:none;}.pb-safe{padding-bottom:env(safe-area-inset-bottom,0px);}.pt-safe{padding-top:env(safe-area-inset-top,0px);}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-tertiary-fixed-variant": "#2f3aa3", "primary-container": "#d4af37", "on-primary": "#3c2f00", "on-secondary-container": "#00374d", "surface-bright": "#353944", "surface": "#0f131d", "surface-container-high": "#262a34", "tertiary-container": "#a5adff", "background": "#0f131d", "surface-container": "#1b1f2a", "on-surface-variant": "#d0c5af", "outline": "#99907c", "outline-variant": "#4d4635", "secondary-container": "#00a6e0", "on-background": "#dfe2f0", "primary-fixed-dim": "#e9c349", "tertiary-fixed": "#e0e0ff", "on-primary-fixed": "#241a00", "primary": "#f2ca50", "on-primary-fixed-variant": "#574500", "tertiary": "#c7cbff", "surface-variant": "#313540", "on-tertiary-fixed": "#000767", "surface-container-lowest": "#0a0e18", "error-container": "#93000a", "on-primary-container": "#554300", "surface-dim": "#0f131d", "secondary-fixed-dim": "#7bd0ff", "surface-container-highest": "#313540", "primary-fixed": "#ffe088", "on-secondary-fixed": "#001e2c", "on-tertiary": "#131e8c", "on-error": "#690005", "tertiary-fixed-dim": "#bdc2ff", "on-tertiary-container": "#2d38a1", "inverse-surface": "#dfe2f0", "secondary-fixed": "#c4e7ff", "on-surface": "#dfe2f0", "on-error-container": "#ffdad6", "surface-container-low": "#171b26", "inverse-primary": "#735c00", "secondary": "#7bd0ff", "error": "#ffb4ab", "on-secondary": "#00354a", "surface-tint": "#e9c349", "on-secondary-fixed-variant": "#004c69", "inverse-on-surface": "#2c303b" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "space-sm": "0.5rem", "space-lg": "1.5rem", "gutter": "1.5rem", "space-xs": "0.25rem", "gutter-mobile": "0.75rem", "margin-mobile": "1rem", "space-md": "1rem", "space-xl": "2.5rem", "margin": "2rem" }, "fontFamily": { "body-md": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Playfair Display"], "body-lg": ["Plus Jakarta Sans"], "stat-numeric": ["JetBrains Mono"], "body-sm": ["Plus Jakarta Sans"], "display-lg": ["Playfair Display"], "label-caps": ["Plus Jakarta Sans"], "headline-md": ["Playfair Display"], "display-lg-mobile": ["Playfair Display"], "formula-sm": ["JetBrains Mono"], "headline-sm": ["Playfair Display"], "stat-modifier": ["JetBrains Mono"], "headline-lg": ["Playfair Display"] }, "fontSize": { "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "400" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "0em", "fontWeight": "600" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "stat-numeric": ["24px", { "lineHeight": "28px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "400" }], "display-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-caps": ["11px", { "lineHeight": "14px", "letterSpacing": "0.08em", "fontWeight": "700" }], "headline-md": ["22px", { "lineHeight": "28px", "letterSpacing": "0.01em", "fontWeight": "600" }], "display-lg-mobile": ["30px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "formula-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "headline-sm": ["18px", { "lineHeight": "24px", "letterSpacing": "0.02em", "fontWeight": "600" }], "stat-modifier": ["16px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "0em", "fontWeight": "600" }] } } } }</script><style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head><body class="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary selection:text-on-primary"><header class="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(0,0,0,0.5)]"><div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm min-w-0"><img alt="Arcana 5e Emblem" class="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1XmU8-_97BRk3fBob1fCTSwJ0v9Y7WI6c_7Tz5zpY_Z7Ha1I5yu9hNSJP6ynPten5XLbO44ZCateTNf-tbKZDQsorGHclyB-k_PXer5mGZxG7fZLmtsBqyFUSOZAQzk0_9BVVUxkM8ZaZ2sdiT_D9c6w9unC_NMiNZ1EyyiwUxRy7E2Rsg4QcO8e3R5cdW-CzzZfA7apEViepCJSkCCfPfSHfu0GGiooFw2WmHwwvzEPg"/><div class="flex flex-col min-w-0"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary tracking-wide font-bold uppercase truncate">ARCANA 5E</span><span class="text-xs text-outline font-stat-numeric hidden sm:inline">•</span><span class="text-xs text-outline truncate hidden sm:inline uppercase tracking-widest font-label-caps">Spell</span></div><span class="font-label-caps text-label-caps text-on-surface-variant/80 tracking-widest uppercase truncate">2024 RULES COMPENDIUM</span></div></div><div class="flex items-center gap-space-xs flex-shrink-0"><button aria-label="Quick Dice Roll d20" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-primary transition-all" type="button"><span class="material-symbols-outlined text-[20px]">casino</span></button><button aria-label="Search compendium" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-on-surface transition-all" type="button"><span class="material-symbols-outlined text-[20px]">search</span></button><button aria-label="Character profile Aeloria Level 7" class="h-11 pl-space-xs pr-space-sm flex items-center gap-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all" type="button"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/><div class="flex flex-col items-start leading-none pr-0.5"><span class="font-label-caps text-[10px] text-on-surface font-semibold truncate max-w-[64px]">Aeloria</span><span class="font-formula-sm text-[9px] text-primary">Lv.7</span></div></button></div></div></header><main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full px-margin-mobile pb-space-xl gap-space-md">
<!-- Breadcrumbs & Quick Spell Switcher -->
<div class="flex items-center justify-between pt-space-xs">
<div class="flex items-center gap-space-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">menu_book</span>
<span class="font-label-caps text-label-caps tracking-widest uppercase">Grimoire Codex</span>
<span class="text-outline text-xs">/</span>
<span class="font-formula-sm text-formula-sm text-primary uppercase">3rd Level</span>
</div>
<div class="flex items-center gap-space-xs">
<button aria-label="Previous Spell" class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all" type="button">
<span class="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<span class="font-formula-sm text-formula-sm text-on-surface-variant px-1">42 / 184</span>
<button aria-label="Next Spell" class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all" type="button">
<span class="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
<!-- 1. Spell Header Card -->
<div class="relative w-full rounded-xl bg-surface-container p-space-md shadow-xl overflow-hidden flex flex-col gap-space-md">
<!-- Atmospheric Rune Watermark & Arcane Flare -->
<div class="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-gradient-to-br from-error-container/40 via-primary-container/10 to-transparent pointer-events-none blur-2xl"></div>
<div class="relative flex flex-col gap-space-xs">
<div class="flex items-center justify-between gap-space-xs">
<!-- Evocation Ruby Badge -->
<div class="flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-error-container/30 text-error shadow-sm">
<span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
<span class="font-label-caps text-label-caps tracking-wider uppercase font-bold">3rd-Level Evocation</span>
</div>
<div class="flex items-center gap-1.5">
<!-- Favorite/Prepared Toggle -->
<button aria-label="Toggle Prepared State" class="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-primary transition-all active:scale-90" id="prep-toggle-btn" type="button">
<span class="material-symbols-outlined text-[20px]" id="prep-icon" style="font-variation-settings: 'FILL' 1;">star</span>
</button>
<!-- Share Rune -->
<button aria-label="Share Spell Link" class="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90" type="button">
<span class="material-symbols-outlined text-[18px]">share</span>
</button>
</div>
</div>
<div class="flex flex-col mt-1">
<div class="flex items-baseline justify-between">
<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-wide">Fireball</h1>
<span class="font-formula-sm text-formula-sm text-outline tracking-wider">ID #EVO-0309</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span class="material-symbols-outlined text-[14px] text-outline">verified</span>
          Player's Handbook 2024 (p. 272)
        </p>
</div>
</div>
<!-- Quick Action Cast Bar -->
<div class="relative flex items-center gap-space-xs bg-surface-container-low p-space-xs rounded-lg">
<button class="flex-1 h-12 rounded-lg bg-primary hover:bg-primary-fixed-dim text-on-primary font-label-caps text-label-caps font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all" id="cast-trigger-btn" type="button">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
<span id="cast-label">Cast Spell (-1 Lv.3 Slot)</span>
</button>
<!-- Slot Tracker Quick Pip Indicator -->
<div class="flex flex-col items-center justify-center px-3 py-1 rounded bg-surface-container-high min-w-[70px]">
<span class="font-label-caps text-[9px] text-outline tracking-wider uppercase">Lv 3 Slots</span>
<div class="flex items-center gap-1 mt-1" id="slot-dots">
<span class="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.8)]"></span>
<span class="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.8)]"></span>
<span class="w-2.5 h-2.5 rounded-full bg-surface-bright"></span>
</div>
</div>
</div>
</div>
<!-- 2. Core Mechanics Matrix (High-Contrast 2x3 Grid) -->
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between px-1">
<span class="font-label-caps text-label-caps text-outline tracking-widest uppercase font-semibold">Casting Parameters</span>
<span class="font-formula-sm text-formula-sm text-secondary flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> 2024 Revision
      </span>
</div>
<div class="grid grid-cols-2 gap-space-xs">
<!-- Casting Time -->
<div class="rounded-xl bg-surface-container p-space-sm flex flex-col justify-between min-h-[74px]">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[10px] text-outline tracking-wider uppercase">Casting Time</span>
<span class="material-symbols-outlined text-[16px] text-primary">schedule</span>
</div>
<div class="flex items-baseline gap-1.5">
<span class="font-body-lg text-body-lg font-bold text-on-surface">1 Action</span>
</div>
</div>
<!-- Range / Area -->
<div class="rounded-xl bg-surface-container p-space-sm flex flex-col justify-between min-h-[74px]">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[10px] text-outline tracking-wider uppercase">Range / Area</span>
<span class="material-symbols-outlined text-[16px] text-secondary">explore</span>
</div>
<div class="flex flex-col">
<span class="font-body-lg text-body-lg font-bold text-on-surface truncate">150 Feet</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">20-Ft Sphere</span>
</div>
</div>
<!-- Components -->
<div class="rounded-xl bg-surface-container p-space-sm flex flex-col justify-between min-h-[74px]">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[10px] text-outline tracking-wider uppercase">Components</span>
<span class="material-symbols-outlined text-[16px] text-outline">grain</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-1">
<span class="px-1 py-0.5 rounded bg-surface-container-high font-formula-sm text-[10px] text-primary">V</span>
<span class="px-1 py-0.5 rounded bg-surface-container-high font-formula-sm text-[10px] text-primary">S</span>
<span class="px-1 py-0.5 rounded bg-surface-container-high font-formula-sm text-[10px] text-primary">M</span>
</div>
<span class="font-formula-sm text-[10px] text-on-surface-variant truncate mt-1">Guano &amp; sulfur</span>
</div>
</div>
<!-- Duration -->
<div class="rounded-xl bg-surface-container p-space-sm flex flex-col justify-between min-h-[74px]">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[10px] text-outline tracking-wider uppercase">Duration</span>
<span class="material-symbols-outlined text-[16px] text-outline">hourglass_empty</span>
</div>
<div class="flex items-baseline gap-1.5">
<span class="font-body-lg text-body-lg font-bold text-on-surface">Instant</span>
</div>
</div>
<!-- Attack / Save -->
<div class="rounded-xl bg-surface-container p-space-sm flex flex-col justify-between min-h-[74px]">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[10px] text-outline tracking-wider uppercase">Defense Save</span>
<span class="material-symbols-outlined text-[16px] text-secondary">shield</span>
</div>
<div class="flex flex-col">
<span class="font-body-lg text-body-lg font-bold text-secondary">DEX Save</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Half on success</span>
</div>
</div>
<!-- Damage Type & Roll Affordance -->
<div class="rounded-xl bg-surface-container-high p-space-sm flex flex-col justify-between min-h-[74px] shadow-sm relative overflow-hidden">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[10px] text-error tracking-wider uppercase font-semibold">Fire Damage</span>
<span class="material-symbols-outlined text-[16px] text-error">local_fire_department</span>
</div>
<div class="flex items-center justify-between mt-1">
<span class="font-stat-numeric text-stat-numeric text-error font-bold tracking-tight" id="damage-matrix-label">8d6</span>
<button class="px-2.5 py-1 rounded bg-error hover:bg-error-container text-on-error font-formula-sm text-formula-sm font-bold flex items-center gap-1 active:scale-95 transition-all shadow" id="quick-roll-dice" type="button">
<span class="material-symbols-outlined text-[14px]">casino</span>
<span>Roll</span>
</button>
</div>
</div>
</div>
</div>
<!-- Interactive Dice Roller Output Tray (Hidden by default, pops on click) -->
<div class="hidden rounded-xl bg-surface-container-lowest p-space-md shadow-2xl flex flex-col gap-space-xs animate-fade-in" id="dice-roll-tray">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[18px]">casino</span>
<span class="font-label-caps text-label-caps uppercase tracking-wider text-on-surface font-semibold">Rune Dice Result: Fire Damage</span>
</div>
<button class="text-on-surface-variant hover:text-on-surface" id="close-dice-tray" type="button">
<span class="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
<div class="flex items-center justify-between bg-surface-container-high rounded-lg p-space-sm">
<div class="flex flex-col">
<span class="font-formula-sm text-formula-sm text-outline" id="dice-breakdown">8d6 Rolls: [4, 6, 2, 5, 6, 3, 4, 1]</span>
<span class="font-label-caps text-[10px] text-secondary">Dexterity DC 15 negates half</span>
</div>
<div class="flex items-baseline gap-1">
<span class="font-display-lg-mobile text-display-lg-mobile text-primary font-bold" id="dice-total">31</span>
<span class="font-label-caps text-[11px] text-error font-bold uppercase">Fire</span>
</div>
</div>
</div>
<!-- 3. Visual Spell Area Diagram & Description -->
<div class="rounded-xl bg-surface-container p-space-md flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-outline tracking-widest uppercase font-semibold">Trajectory &amp; Area of Effect</span>
<span class="font-formula-sm text-formula-sm text-primary">20-Foot-Radius Sphere</span>
</div>
<!-- Stylized Vector Blast Diagram -->
<div class="relative w-full h-44 rounded-lg bg-surface-container-lowest overflow-hidden flex items-center justify-center">
<!-- Radial Grid Texture -->
<svg class="w-full h-full" fill="none" viewbox="0 0 340 180" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialgradient cx="220" cy="90" gradientunits="userSpaceOnUse" id="blastGlow" r="65">
<stop offset="0%" stop-color="#f2ca50" stop-opacity="0.8"></stop>
<stop offset="35%" stop-color="#ffb4ab" stop-opacity="0.5"></stop>
<stop offset="70%" stop-color="#93000a" stop-opacity="0.3"></stop>
<stop offset="100%" stop-color="#0f131d" stop-opacity="0"></stop>
</radialgradient>
<lineargradient gradientunits="userSpaceOnUse" id="trajLine" x1="40" x2="220" y1="140" y2="90">
<stop offset="0%" stop-color="#7bd0ff"></stop>
<stop offset="80%" stop-color="#f2ca50"></stop>
<stop offset="100%" stop-color="#ffb4ab"></stop>
</lineargradient>
</defs>
<!-- Distance Rings Grid -->
<circle cx="220" cy="90" r="25" stroke="#4d4635" stroke-dasharray="3 3" stroke-width="1"></circle>
<circle cx="220" cy="90" r="50" stroke="#4d4635" stroke-dasharray="3 3" stroke-width="1"></circle>
<circle cx="220" cy="90" r="70" stroke="#313540" stroke-width="1"></circle>
<!-- Blast Radius Filled Area -->
<circle cx="220" cy="90" fill="url(#blastGlow)" r="56"></circle>
<circle cx="220" cy="90" r="56" stroke="#f2ca50" stroke-dasharray="4 2" stroke-opacity="0.6" stroke-width="1.5"></circle>
<!-- Caster Point -->
<circle cx="40" cy="140" fill="#7bd0ff" r="5"></circle>
<circle cx="40" cy="140" r="10" stroke="#7bd0ff" stroke-opacity="0.4" stroke-width="1"></circle>
<text fill="#dfe2f0" font-family="Plus Jakarta Sans" font-size="9" font-weight="600" text-anchor="middle" x="40" y="162">CASTER (0 ft)</text>
<!-- Golden Trajectory Arc -->
<path d="M 40 140 Q 110 70, 220 90" fill="none" stroke="url(#trajLine)" stroke-linecap="round" stroke-width="2.5"></path>
<!-- Target Detonation Center -->
<circle cx="220" cy="90" fill="#ffffff" r="4"></circle>
<text fill="#f2ca50" font-family="Plus Jakarta Sans" font-size="10" font-weight="700" text-anchor="middle" x="220" y="70">20 FT RADIUS</text>
<text fill="#d0c5af" font-family="JetBrains Mono" font-size="9" text-anchor="middle" x="220" y="162">Range Limit: 150 ft</text>
<!-- Compass Scale Rulers -->
<line stroke="#f2ca50" stroke-width="1.5" x1="220" x2="276" y1="90" y2="90"></line>
<circle cx="276" cy="90" fill="#f2ca50" r="2"></circle>
</svg>
<!-- Tactical Metric Overlay Pills -->
<div class="absolute bottom-2 left-2 flex items-center gap-1.5">
<span class="px-2 py-0.5 rounded bg-surface-container-high/90 backdrop-blur font-formula-sm text-[10px] text-on-surface">44 Hexes Covered</span>
</div>
<div class="absolute top-2 right-2">
<span class="px-2 py-0.5 rounded bg-surface-container-high/90 backdrop-blur font-formula-sm text-[10px] text-primary">Spreads around corners</span>
</div>
</div>
<!-- Rules Body Text -->
<div class="flex flex-col gap-space-sm text-on-surface">
<p class="font-body-md text-body-md leading-relaxed">
        A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame.
      </p>
<p class="font-body-md text-body-md leading-relaxed text-on-surface-variant">
        Each creature in a <span class="text-primary font-semibold">20-foot-radius sphere</span> centered on that point must make a <span class="text-secondary font-semibold">Dexterity saving throw</span>. A target takes <span class="text-error font-semibold font-stat-modifier">8d6 fire damage</span> on a failed save, or half as much damage on a successful one.
      </p>
</div>
<!-- Antique Parchment Flammable Alert Box -->
<div class="rounded-lg bg-surface-container-low p-space-sm flex items-start gap-space-sm">
<div class="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
<span class="material-symbols-outlined text-[18px]">local_fire_department</span>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-primary tracking-wider uppercase font-bold">Ignition Hazard</span>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried.
        </p>
</div>
</div>
</div>
<!-- 4. Using a Higher-Level Slot (2024 Upcast Banner) -->
<div class="rounded-xl bg-surface-container p-space-md flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[20px]">upgrade</span>
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase font-bold">Using a Higher-Level Slot</span>
</div>
<span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-formula-sm text-formula-sm font-semibold">+1d6 / Slot Level</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
      When you cast this spell using a spell slot of 4th level or higher, the damage increases by <span class="text-on-surface font-semibold font-stat-modifier">1d6</span> for each slot level above 3rd.
    </p>
<!-- Upcast Interactive Selector -->
<div class="flex flex-col gap-space-xs bg-surface-container-lowest p-space-sm rounded-lg">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] text-outline uppercase font-semibold">Selected Cast Level:</span>
<span class="font-formula-sm text-formula-sm text-primary font-bold" id="current-slot-level-text">Slot Level 3 (Default)</span>
</div>
<!-- Quick Selector Level Buttons -->
<div class="grid grid-cols-7 gap-1 mt-1">
<button class="upcast-btn py-2 rounded font-formula-sm text-formula-sm font-bold bg-primary text-on-primary transition-all" data-dice="8d6" data-slot="3" type="button">3</button>
<button class="upcast-btn py-2 rounded font-formula-sm text-formula-sm font-bold bg-surface-container text-on-surface-variant hover:text-on-surface transition-all" data-dice="9d6" data-slot="4" type="button">4</button>
<button class="upcast-btn py-2 rounded font-formula-sm text-formula-sm font-bold bg-surface-container text-on-surface-variant hover:text-on-surface transition-all" data-dice="10d6" data-slot="5" type="button">5</button>
<button class="upcast-btn py-2 rounded font-formula-sm text-formula-sm font-bold bg-surface-container text-on-surface-variant hover:text-on-surface transition-all" data-dice="11d6" data-slot="6" type="button">6</button>
<button class="upcast-btn py-2 rounded font-formula-sm text-formula-sm font-bold bg-surface-container text-on-surface-variant hover:text-on-surface transition-all" data-dice="12d6" data-slot="7" type="button">7</button>
<button class="upcast-btn py-2 rounded font-formula-sm text-formula-sm font-bold bg-surface-container text-on-surface-variant hover:text-on-surface transition-all" data-dice="13d6" data-slot="8" type="button">8</button>
<button class="upcast-btn py-2 rounded font-formula-sm text-formula-sm font-bold bg-surface-container text-on-surface-variant hover:text-on-surface transition-all" data-dice="14d6" data-slot="9" type="button">9</button>
</div>
<!-- Dynamic Scaled Result Display -->
<div class="flex items-center justify-between mt-2 pt-2 bg-surface-container/60 rounded px-2.5 py-1.5">
<span class="font-body-sm text-body-sm text-on-surface-variant">Scaled Output:</span>
<div class="flex items-center gap-2">
<span class="font-stat-numeric text-[16px] text-error font-bold" id="scaled-dice-label">8d6 Fire Damage</span>
<span class="font-formula-sm text-[11px] text-outline">Avg: ~28 dmg</span>
</div>
</div>
</div>
</div>
<!-- 5. Class Accessibility Tags -->
<div class="rounded-xl bg-surface-container p-space-md flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-outline tracking-widest uppercase font-semibold">Spellcaster Availability</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">5 Disciplines</span>
</div>
<div class="flex flex-wrap gap-1.5">
<span class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-caps text-[11px] flex items-center gap-1.5 hover:bg-surface-bright transition-colors cursor-pointer">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
        Wizard
      </span>
<span class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-caps text-[11px] flex items-center gap-1.5 hover:bg-surface-bright transition-colors cursor-pointer">
<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
        Sorcerer
      </span>
<span class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-caps text-[11px] flex items-center gap-1.5 hover:bg-surface-bright transition-colors cursor-pointer">
<span class="w-1.5 h-1.5 rounded-full bg-error"></span>
        Light Domain Cleric
      </span>
<span class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-caps text-[11px] flex items-center gap-1.5 hover:bg-surface-bright transition-colors cursor-pointer">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
        Fiend Warlock
      </span>
<span class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-caps text-[11px] flex items-center gap-1.5 hover:bg-surface-bright transition-colors cursor-pointer">
<span class="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
        Artillerist Artificer
      </span>
</div>
</div>
<!-- Visual Card Placeholder: Arcane Casting Miniature -->
<div class="rounded-xl bg-surface-container-low overflow-hidden flex flex-col gap-2 p-space-sm">
<div class="relative w-full h-32 rounded-lg overflow-hidden bg-cover bg-center" data-alt="Dark fantasy tabletop grimoire illuminated page detailing a 3rd-level evocation spell called Fireball. Intricate golden arcane circles, floating ember particles, obsidian textured tabletop background, parchment borders, moody dramatic cinematic fantasy lighting with amber and deep indigo shadows." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAI8FTWO1IU2GGNtmyPEWEEl_nVJ8x0jTyygPJVqDAotDIuZKzdXzaLW5ICeqvHu0ihsxkQ2gnRjIgboGPp2CsL_t-X0jL5NARXdKOv7hOaw6KgEownGtf_nh1hOIYurgxMuJ58KkL_fbVgC58_yaG49oJ9xT9fhKpreXEP7W0aKxOmeZ-HePtzL-3wpJYJ0ElWpqMKoWM9lUedAHMc80sAztqGflJSnMxyAjhl0OJw')">
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent flex items-end p-space-sm">
<div class="flex flex-col">
<span class="font-label-caps text-[10px] text-primary uppercase font-bold tracking-wider">Codex Visual Record</span>
<span class="font-body-sm text-body-sm text-on-surface font-medium">Ignition Inscription &amp; Hand Geometry</span>
</div>
</div>
</div>
</div>
<!-- 6. Related Spells & Mechanics Drawer Links -->
<div class="flex flex-col gap-space-xs">
<span class="font-label-caps text-label-caps text-outline tracking-widest uppercase font-semibold px-1">Cross-Reference Grimoire</span>
<div class="grid grid-cols-2 gap-space-xs">
<!-- Related 1 -->
<a class="rounded-xl bg-surface-container p-space-sm flex items-center justify-between hover:bg-surface-container-high active:scale-[0.98] transition-all" href="#">
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-label-caps text-on-surface font-bold truncate">Delayed Fireball</span>
<span class="font-formula-sm text-[10px] text-outline">7th-Level Variant</span>
</div>
<span class="material-symbols-outlined text-[18px] text-primary flex-shrink-0">arrow_forward</span>
</a>
<!-- Related 2 -->
<a class="rounded-xl bg-surface-container p-space-sm flex items-center justify-between hover:bg-surface-container-high active:scale-[0.98] transition-all" href="#">
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-label-caps text-on-surface font-bold truncate">Counterspell</span>
<span class="font-formula-sm text-[10px] text-outline">Reaction Abjuration</span>
</div>
<span class="material-symbols-outlined text-[18px] text-secondary flex-shrink-0">arrow_forward</span>
</a>
<!-- Related 3 -->
<a class="rounded-xl bg-surface-container p-space-sm flex items-center justify-between hover:bg-surface-container-high active:scale-[0.98] transition-all" href="#">
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-label-caps text-on-surface font-bold truncate">DEX Save Rules</span>
<span class="font-formula-sm text-[10px] text-outline">2024 Rulebook §9</span>
</div>
<span class="material-symbols-outlined text-[18px] text-outline flex-shrink-0">menu_book</span>
</a>
<!-- Related 4 -->
<a class="rounded-xl bg-surface-container p-space-sm flex items-center justify-between hover:bg-surface-container-high active:scale-[0.98] transition-all" href="#">
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-label-caps text-on-surface font-bold truncate">Elemental Adept</span>
<span class="font-formula-sm text-[10px] text-outline">Ignores Fire Resist</span>
</div>
<span class="material-symbols-outlined text-[18px] text-primary flex-shrink-0">military_tech</span>
</a>
</div>
</div>
</div>
<!-- Client-side Interactive Script for Micro-Interactions -->
<script>
  (function() {
    // 1. Prepared / Favorite Toggle
    const prepBtn = document.getElementById('prep-toggle-btn');
    const prepIcon = document.getElementById('prep-icon');
    let isPrepared = true;

    if (prepBtn && prepIcon) {
      prepBtn.addEventListener('click', () => {
        isPrepared = !isPrepared;
        if (isPrepared) {
          prepIcon.style.fontVariationSettings = "'FILL' 1";
          prepIcon.classList.remove('text-on-surface-variant');
          prepIcon.classList.add('text-primary');
        } else {
          prepIcon.style.fontVariationSettings = "'FILL' 0";
          prepIcon.classList.remove('text-primary');
          prepIcon.classList.add('text-on-surface-variant');
        }
      });
    }

    // 2. Cast Spell Slot Spending Micro-Interaction
    const castBtn = document.getElementById('cast-trigger-btn');
    const castLabel = document.getElementById('cast-label');
    const slotDots = document.getElementById('slot-dots');
    let slotsRemaining = 2;

    if (castBtn && castLabel && slotDots) {
      castBtn.addEventListener('click', () => {
        if (slotsRemaining > 0) {
          slotsRemaining--;
          const dots = slotDots.querySelectorAll('span');
          if (dots[slotsRemaining]) {
            dots[slotsRemaining].classList.remove('bg-secondary', 'shadow-[0_0_8px_rgba(123,208,255,0.8)]');
            dots[slotsRemaining].classList.add('bg-surface-bright');
          }
          if (slotsRemaining === 0) {
            castLabel.textContent = 'Slots Expended (Lv.3)';
            castBtn.classList.remove('bg-primary', 'text-on-primary');
            castBtn.classList.add('bg-surface-container-highest', 'text-outline');
          }
        }
      });
    }

    // 3. Dice Roller Output Simulation
    const rollTrigger = document.getElementById('quick-roll-dice');
    const diceTray = document.getElementById('dice-roll-tray');
    const closeTray = document.getElementById('close-dice-tray');
    const diceBreakdown = document.getElementById('dice-breakdown');
    const diceTotal = document.getElementById('dice-total');

    let currentDiceCount = 8;

    function rollDice(count) {
      const rolls = [];
      let sum = 0;
      for (let i = 0; i < count; i++) {
        const val = Math.floor(Math.random() * 6) + 1;
        rolls.push(val);
        sum += val;
      }
      return { rolls, sum };
    }

    if (rollTrigger && diceTray) {
      rollTrigger.addEventListener('click', () => {
        const result = rollDice(currentDiceCount);
        diceBreakdown.textContent = `${currentDiceCount}d6 Rolls: [${result.rolls.join(', ')}]`;
        diceTotal.textContent = result.sum;
        diceTray.classList.remove('hidden');
      });
    }

    if (closeTray && diceTray) {
      closeTray.addEventListener('click', () => {
        diceTray.classList.add('hidden');
      });
    }

    // 4. Upcast Level Buttons Interactivity
    const upcastButtons = document.querySelectorAll('.upcast-btn');
    const currentSlotText = document.getElementById('current-slot-level-text');
    const scaledLabel = document.getElementById('scaled-dice-label');
    const matrixDamageLabel = document.getElementById('damage-matrix-label');

    upcastButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        upcastButtons.forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary');
          b.classList.add('bg-surface-container', 'text-on-surface-variant');
        });
        btn.classList.add('bg-primary', 'text-on-primary');
        btn.classList.remove('bg-surface-container', 'text-on-surface-variant');

        const slot = parseInt(btn.getAttribute('data-slot'));
        const diceString = btn.getAttribute('data-dice');
        currentDiceCount = 8 + (slot - 3);

        if (currentSlotText) {
          currentSlotText.textContent = slot === 3 ? 'Slot Level 3 (Default)' : `Slot Level ${slot} Upcast`;
        }
        if (scaledLabel) {
          const avgDmg = Math.round(currentDiceCount * 3.5);
          scaledLabel.textContent = `${diceString} Fire Damage`;
        }
        if (matrixDamageLabel) {
          matrixDamageLabel.textContent = diceString;
        }
      });
    });
  })();
</script></main><nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.65)]" data-active-classes="text-primary font-semibold"><div class="flex justify-around items-center h-16 px-space-xs"><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[22px]">explore</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Dashboard</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="compendium" href="#"><span class="material-symbols-outlined text-[22px]">local_library</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Library</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="sheet" href="#"><span class="material-symbols-outlined text-[22px]">shield_person</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Sheet</span></a><a aria-current="page" class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors text-primary font-semibold" data-path="spell" href="#"><span class="material-symbols-outlined text-[22px]">auto_fix_high</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Spells</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="abilities" href="#"><span class="material-symbols-outlined text-[22px]">swords</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Features</span></a></div></nav></body></html>

<!-- Character Sheet - Aeloria Lv.7 -->
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/><meta content="mobile_tab" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{width:100vw;margin:0;padding:0;background-color:#0f131d;}body{overscroll-behavior:none;}.pb-safe{padding-bottom:env(safe-area-inset-bottom,0px);}.pt-safe{padding-top:env(safe-area-inset-top,0px);}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-tertiary-fixed-variant": "#2f3aa3", "primary-container": "#d4af37", "on-primary": "#3c2f00", "on-secondary-container": "#00374d", "surface-bright": "#353944", "surface": "#0f131d", "surface-container-high": "#262a34", "tertiary-container": "#a5adff", "background": "#0f131d", "surface-container": "#1b1f2a", "on-surface-variant": "#d0c5af", "outline": "#99907c", "outline-variant": "#4d4635", "secondary-container": "#00a6e0", "on-background": "#dfe2f0", "primary-fixed-dim": "#e9c349", "tertiary-fixed": "#e0e0ff", "on-primary-fixed": "#241a00", "primary": "#f2ca50", "on-primary-fixed-variant": "#574500", "tertiary": "#c7cbff", "surface-variant": "#313540", "on-tertiary-fixed": "#000767", "surface-container-lowest": "#0a0e18", "error-container": "#93000a", "on-primary-container": "#554300", "surface-dim": "#0f131d", "secondary-fixed-dim": "#7bd0ff", "surface-container-highest": "#313540", "primary-fixed": "#ffe088", "on-secondary-fixed": "#001e2c", "on-tertiary": "#131e8c", "on-error": "#690005", "tertiary-fixed-dim": "#bdc2ff", "on-tertiary-container": "#2d38a1", "inverse-surface": "#dfe2f0", "secondary-fixed": "#c4e7ff", "on-surface": "#dfe2f0", "on-error-container": "#ffdad6", "surface-container-low": "#171b26", "inverse-primary": "#735c00", "secondary": "#7bd0ff", "error": "#ffb4ab", "on-secondary": "#00354a", "surface-tint": "#e9c349", "on-secondary-fixed-variant": "#004c69", "inverse-on-surface": "#2c303b" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "space-sm": "0.5rem", "space-lg": "1.5rem", "gutter": "1.5rem", "space-xs": "0.25rem", "gutter-mobile": "0.75rem", "margin-mobile": "1rem", "space-md": "1rem", "space-xl": "2.5rem", "margin": "2rem" }, "fontFamily": { "body-md": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Playfair Display"], "body-lg": ["Plus Jakarta Sans"], "stat-numeric": ["JetBrains Mono"], "body-sm": ["Plus Jakarta Sans"], "display-lg": ["Playfair Display"], "label-caps": ["Plus Jakarta Sans"], "headline-md": ["Playfair Display"], "display-lg-mobile": ["Playfair Display"], "formula-sm": ["JetBrains Mono"], "headline-sm": ["Playfair Display"], "stat-modifier": ["JetBrains Mono"], "headline-lg": ["Playfair Display"] }, "fontSize": { "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "400" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "0em", "fontWeight": "600" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "stat-numeric": ["24px", { "lineHeight": "28px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "400" }], "display-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-caps": ["11px", { "lineHeight": "14px", "letterSpacing": "0.08em", "fontWeight": "700" }], "headline-md": ["22px", { "lineHeight": "28px", "letterSpacing": "0.01em", "fontWeight": "600" }], "display-lg-mobile": ["30px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "formula-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "headline-sm": ["18px", { "lineHeight": "24px", "letterSpacing": "0.02em", "fontWeight": "600" }], "stat-modifier": ["16px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "0em", "fontWeight": "600" }] } } } }</script></head><body class="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary selection:text-on-primary"><header class="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(0,0,0,0.5)]"><div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm min-w-0"><img alt="Arcana 5e Emblem" class="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1XmU8-_97BRk3fBob1fCTSwJ0v9Y7WI6c_7Tz5zpY_Z7Ha1I5yu9hNSJP6ynPten5XLbO44ZCateTNf-tbKZDQsorGHclyB-k_PXer5mGZxG7fZLmtsBqyFUSOZAQzk0_9BVVUxkM8ZaZ2sdiT_D9c6w9unC_NMiNZ1EyyiwUxRy7E2Rsg4QcO8e3R5cdW-CzzZfA7apEViepCJSkCCfPfSHfu0GGiooFw2WmHwwvzEPg"/><div class="flex flex-col min-w-0"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary tracking-wide font-bold uppercase truncate">ARCANA 5E</span><span class="text-xs text-outline font-stat-numeric hidden sm:inline">•</span><span class="text-xs text-outline truncate hidden sm:inline uppercase tracking-widest font-label-caps">Sheet</span></div><span class="font-label-caps text-label-caps text-on-surface-variant/80 tracking-widest uppercase truncate">2024 RULES COMPENDIUM</span></div></div><div class="flex items-center gap-space-xs flex-shrink-0"><button aria-label="Quick Dice Roll d20" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-primary transition-all" type="button"><span class="material-symbols-outlined text-[20px]">casino</span></button><button aria-label="Search compendium" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-on-surface transition-all" type="button"><span class="material-symbols-outlined text-[20px]">search</span></button><button aria-label="Character profile Aeloria Level 7" class="h-11 pl-space-xs pr-space-sm flex items-center gap-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all" type="button"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/><div class="flex flex-col items-start leading-none pr-0.5"><span class="font-label-caps text-[10px] text-on-surface font-semibold truncate max-w-[64px]">Aeloria</span><span class="font-formula-sm text-[9px] text-primary">Lv.7</span></div></button></div></div></header><main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full px-margin-mobile pb-space-xl gap-space-md">
<!-- Floating Live Dice Roll Toast Overlay (Managed via JS) -->
<div class="hidden fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-surface-container-highest/95 backdrop-blur-md px-space-md py-space-sm rounded-xl shadow-xl flex items-center gap-space-sm transition-all duration-300" id="dice-banner">
<div class="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-stat-numeric text-stat-modifier">
<span class="material-symbols-outlined text-[18px]">casino</span>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" id="dice-label">d20 Roll</span>
<span class="font-stat-numeric text-stat-numeric text-primary leading-tight" id="dice-result">18 <span class="text-body-sm font-formula-sm text-on-surface">(Nat 15 + 3)</span></span>
</div>
</div>
<!-- 1. Character Identity & Vitality Card -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md shadow-md gap-space-md relative overflow-hidden">
<!-- Ambient Arcane Backlight -->
<div class="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
<!-- Identity Header Row -->
<div class="flex items-center gap-space-md relative">
<div class="relative flex-shrink-0">
<img alt="Aeloria Silvervein" class="w-16 h-16 rounded-xl object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/>
<span class="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-primary text-on-primary font-formula-sm text-formula-sm font-bold shadow-sm">Lv.7</span>
</div>
<div class="flex flex-col min-w-0 flex-1">
<div class="flex items-center justify-between gap-space-xs">
<h2 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight truncate">Aeloria Silvervein</h2>
<!-- Inspiration Gem -->
<button class="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-high text-primary hover:bg-surface-bright transition-all active:scale-95" id="inspiration-btn" onclick="toggleInspiration()" title="Heroic Inspiration">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="font-label-caps text-[10px] uppercase font-bold tracking-wide">Inspired</span>
</button>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant truncate">High Elf Wizard (Bladesinger)</p>
<div class="flex items-center gap-2 mt-1">
<span class="font-formula-sm text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant">Sage</span>
<span class="font-formula-sm text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-container-low text-secondary">Neutral Good</span>
<span class="font-formula-sm text-[10px] px-1.5 py-0.5 rounded bg-primary-container/20 text-primary">Prof +3</span>
</div>
</div>
</div>
<!-- Active Bladesong & Stance Banner -->
<div class="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-2 min-w-0">
<span class="flex h-2.5 w-2.5 rounded-full bg-secondary animate-pulse flex-shrink-0"></span>
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-label-caps text-secondary font-bold uppercase truncate">Bladesong Active</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">8 rounds left · Conc: Haste (+2 AC)</span>
</div>
</div>
<button class="px-space-sm py-1 rounded-md bg-secondary text-on-secondary font-label-caps text-label-caps uppercase font-bold active:scale-95 transition-transform flex-shrink-0 shadow-sm" id="bladesong-toggle-btn" onclick="toggleBladesong()">
        Deactivate
      </button>
</div>
<!-- Tactical Vitality HUD -->
<div class="grid grid-cols-4 gap-space-xs">
<!-- Armor Class -->
<div class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold">Armor Class</span>
<div class="flex items-baseline gap-1 my-0.5">
<span class="font-stat-numeric text-stat-numeric text-primary font-bold" id="ac-value">20</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant line-through" id="ac-base">16</span>
</div>
<span class="font-formula-sm text-[9px] text-secondary uppercase font-semibold">Bladesong</span>
</div>
<!-- Initiative -->
<button class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center hover:bg-surface-container-high transition-all active:scale-95 group" onclick="triggerRoll('Initiative', 3)">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold group-hover:text-primary">Initiative</span>
<div class="flex items-center gap-0.5 my-0.5 text-primary">
<span class="font-stat-numeric text-stat-numeric font-bold">+3</span>
<span class="material-symbols-outlined text-[14px]">casino</span>
</div>
<span class="font-formula-sm text-[9px] text-on-surface-variant uppercase font-semibold">Advantage</span>
</button>
<!-- Speed -->
<div class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold">Speed</span>
<div class="flex items-baseline gap-0.5 my-0.5">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold" id="speed-value">40</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">ft</span>
</div>
<span class="font-formula-sm text-[9px] text-secondary uppercase font-semibold">+10ft Song</span>
</div>
<!-- Passive Senses -->
<div class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold">Passives</span>
<div class="flex items-center gap-1.5 my-0.5">
<span class="font-stat-modifier text-stat-modifier text-on-surface font-bold" title="Passive Perception">15<span class="font-formula-sm text-[9px] text-on-surface-variant">P</span></span>
<span class="text-on-surface-variant">/</span>
<span class="font-stat-modifier text-stat-modifier text-primary font-bold" title="Passive Investigation">18<span class="font-formula-sm text-[9px] text-on-surface-variant">I</span></span>
</div>
<span class="font-formula-sm text-[9px] text-on-surface-variant uppercase font-semibold">Darkvision 60</span>
</div>
</div>
<!-- Hit Point Management Module -->
<div class="flex flex-col bg-surface-container-low rounded-lg p-space-sm gap-space-xs">
<div class="flex items-center justify-between">
<div class="flex items-baseline gap-1.5">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Hit Points</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface"><span id="current-hp">48</span> <span class="text-body-sm font-formula-sm text-on-surface-variant">/ 48</span></span>
</div>
<div class="flex items-center gap-1.5">
<span class="font-formula-sm text-[11px] text-on-surface-variant">Temp:</span>
<button class="px-2 py-0.5 rounded bg-surface-container text-primary font-formula-sm text-formula-sm font-bold active:scale-95" id="temp-hp-display" onclick="adjustTempHp(1)">+0</button>
</div>
</div>
<!-- Health Gauge Bar -->
<div class="w-full h-2.5 rounded-full bg-surface-container-lowest overflow-hidden flex">
<div class="h-full bg-secondary-container transition-all duration-300 rounded-full" id="hp-bar-fill" style="width: 100%;"></div>
</div>
<!-- Tactile HP Incrementors -->
<div class="grid grid-cols-4 gap-space-xs pt-1">
<button class="py-1.5 rounded-md bg-error-container text-on-error-container font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(-5)">-5</button>
<button class="py-1.5 rounded-md bg-surface-container text-error font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(-1)">-1</button>
<button class="py-1.5 rounded-md bg-surface-container text-primary font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(1)">+1</button>
<button class="py-1.5 rounded-md bg-primary-container text-on-primary-container font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(5)">+5</button>
</div>
<!-- Hit Dice & Death Saves Bar -->
<div class="flex items-center justify-between pt-1 gap-2 border-none">
<div class="flex items-center gap-2">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">Hit Dice:</span>
<span class="font-formula-sm text-formula-sm text-on-surface" id="hit-dice-display">5/7d6</span>
<button class="px-1.5 py-0.5 rounded bg-surface-container text-primary hover:bg-surface-bright font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="spendHitDice()">Short Rest</button>
</div>
<!-- Death Saves Toggles -->
<div class="flex items-center gap-1.5">
<div class="flex items-center gap-0.5" title="Successes">
<span class="material-symbols-outlined text-[13px] text-primary">check</span>
<input class="w-3 h-3 accent-primary rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-primary rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-primary rounded cursor-pointer" type="checkbox"/>
</div>
<div class="flex items-center gap-0.5" title="Failures">
<span class="material-symbols-outlined text-[13px] text-error">close</span>
<input class="w-3 h-3 accent-error rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-error rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-error rounded cursor-pointer" type="checkbox"/>
</div>
</div>
</div>
</div>
</section>
<!-- 2. Ability Scores & Saving Throws Array -->
<section class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between px-1">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Attributes &amp; Saves</span>
<span class="font-formula-sm text-[10px] text-primary">★ Proficient Save</span>
</div>
<div class="grid grid-cols-3 gap-space-xs">
<!-- STR -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">STR</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('STR Check', -1)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">-1</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">8</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-formula-sm text-[10px] hover:text-on-surface" onclick="triggerRoll('STR Save', -1)">
          Save -1
        </button>
</div>
<!-- DEX -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">DEX</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('DEX Check', 3)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+3</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">16</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-formula-sm text-[10px] hover:text-on-surface" onclick="triggerRoll('DEX Save', 3)">
          Save +3
        </button>
</div>
<!-- CON -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">CON</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('CON Check', 2)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+2</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">14</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-secondary font-formula-sm text-[10px] font-semibold" onclick="triggerRoll('CON Save (+4 Song)', 6)" title="Song gives +INT to Concentration Saves">
          Save +6*
        </button>
</div>
<!-- INT (Key) -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-bl-sm"></div>
<span class="font-label-caps text-[10px] uppercase text-primary font-bold">INT ★</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('INT Check', 4)">
<span class="font-stat-numeric text-headline-sm text-primary font-bold">+4</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">18</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-formula-sm text-[10px] font-bold shadow-sm" onclick="triggerRoll('INT Save', 7)">
          Save +7 ★
        </button>
</div>
<!-- WIS -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-bl-sm"></div>
<span class="font-label-caps text-[10px] uppercase text-primary font-bold">WIS ★</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('WIS Check', 1)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+1</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">12</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-formula-sm text-[10px] font-bold shadow-sm" onclick="triggerRoll('WIS Save', 4)">
          Save +4 ★
        </button>
</div>
<!-- CHA -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">CHA</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('CHA Check', 0)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+0</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">10</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-formula-sm text-[10px] hover:text-on-surface" onclick="triggerRoll('CHA Save', 0)">
          Save +0
        </button>
</div>
</div>
</section>
<!-- 3. Resource Tracker Bar (Bladesong & Arcane Recovery) -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-sm shadow-md">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Arcane Resources</span>
<button class="font-formula-sm text-[10px] text-primary uppercase font-bold hover:underline" onclick="resetResources()">Short/Long Rest</button>
</div>
<!-- Bladesong Uses -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Bladesong Ward</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Prof / Day (+INT to AC, Con saves)</span>
</div>
<div class="flex items-center gap-2" id="bladesong-pips">
<button class="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-on-secondary shadow-sm active:scale-90 transition-transform" onclick="togglePip(this)">
<span class="material-symbols-outlined text-[16px]">shield</span>
</button>
<button class="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-on-secondary shadow-sm active:scale-90 transition-transform" onclick="togglePip(this)">
<span class="material-symbols-outlined text-[16px]">shield</span>
</button>
<button class="w-6 h-6 rounded-md bg-surface-container-highest flex items-center justify-center text-on-surface-variant active:scale-90 transition-transform" onclick="togglePip(this)">
<span class="material-symbols-outlined text-[16px]">shield</span>
</button>
</div>
</div>
<!-- Arcane Recovery -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Arcane Recovery</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Recover up to 4 spell levels</span>
</div>
<button class="px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-formula-sm text-formula-sm font-bold active:scale-95 transition-all shadow-sm" id="arcane-recovery-btn" onclick="toggleRecovery(this)">
        1/1 Ready
      </button>
</div>
</section>
<!-- 4. Spell Slots Matrix (Interactive slot nodules) -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-sm shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-primary text-[18px]">auto_fix_high</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Spell Slots Matrix</span>
</div>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Tap gem to spend / restore</span>
</div>
<div class="grid grid-cols-2 gap-space-xs">
<!-- Level 1 Slots (4) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">1st Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl1-count">4/4</span>
</div>
<div class="flex items-center gap-1.5" data-tier="1">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 1"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 2"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 3"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 4"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
</div>
</div>
<!-- Level 2 Slots (3) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">2nd Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl2-count">3/3</span>
</div>
<div class="flex items-center gap-1.5" data-tier="2">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl2-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl2-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl2-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
</div>
</div>
<!-- Level 3 Slots (3: 2 available, 1 spent) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">3rd Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl3-count">2/3</span>
</div>
<div class="flex items-center gap-1.5" data-tier="3">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl3-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl3-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-surface-container-highest text-outline flex items-center justify-center transition-all active:scale-90 opacity-60" onclick="toggleSpellSlot(this, 'lvl3-count')"><span class="-rotate-45 text-[9px] font-bold">◇</span></button>
</div>
</div>
<!-- Level 4 Slots (1) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">4th Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl4-count">1/1</span>
</div>
<div class="flex items-center gap-1.5" data-tier="4">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl4-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
</div>
</div>
</div>
</section>
<!-- 5. Quick Combat & Action Economy Bar with Attack Cards -->
<section class="flex flex-col gap-space-sm">
<!-- Visual Segmented Toggle -->
<div class="flex p-1 rounded-xl bg-surface-container overflow-x-auto no-scrollbar gap-1">
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg bg-surface-container-high text-primary font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center" onclick="selectCombatTab(this, 'actions-tab')">
        Actions (Amber)
      </button>
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface" onclick="selectCombatTab(this, 'bonus-tab')">
        Bonus (Cyan)
      </button>
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface" onclick="selectCombatTab(this, 'reactions-tab')">
        Reactions (Violet)
      </button>
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface" onclick="selectCombatTab(this, 'spells-tab')">
        Spells
      </button>
</div>
<!-- TAB 1: Primary Actions (Bladesinger Weapon & Cantrips) -->
<div class="combat-view flex flex-col gap-space-xs" id="actions-tab">
<!-- Moonblade (Rapier +1) -->
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></span>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Moonblade</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">+1 Rapier</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Melee Weapon · Finesse, Light · Silvered Arcane focus</p>
<!-- Attack Trigger & Damage Roll Grid -->
<div class="grid grid-cols-2 gap-space-xs mt-1">
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerRoll('Moonblade Atk', 7, '1d20+7')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-primary">To Hit</span>
<span class="font-stat-numeric text-stat-modifier text-primary font-bold">+7</span>
</div>
<span class="material-symbols-outlined text-primary text-[20px]">casino</span>
</button>
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerDamage('Moonblade Dmg', '1d8+4', 'Piercing')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-on-surface">Damage</span>
<span class="font-stat-numeric text-stat-modifier text-on-surface font-bold">1d8+4 <span class="font-formula-sm text-[10px] text-on-surface-variant">Prc</span></span>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">swords</span>
</button>
</div>
<!-- Cantrip Rider Option: Booming Blade Toggle -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest mt-1">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[16px]">thunderstorm</span>
<span class="font-formula-sm text-[11px] text-on-surface">Booming Blade rider: <strong class="text-secondary">+1d8 Thunder</strong></span>
</div>
<button class="px-2 py-0.5 rounded bg-surface-container-high text-secondary hover:bg-surface-bright font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerDamage('Booming Blade', '1d8', 'Thunder')">
            +Roll rider
          </button>
</div>
</div>
<!-- Ray of Frost -->
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-secondary flex-shrink-0"></span>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Ray of Frost</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-secondary font-formula-sm text-[10px] font-semibold">Cantrip</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Ranged Spell Attack · 60 ft · Target speed reduced by 10 ft</p>
<div class="grid grid-cols-2 gap-space-xs mt-1">
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerRoll('Ray of Frost Atk', 7, '1d20+7')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-primary">Spell Atk</span>
<span class="font-stat-numeric text-stat-modifier text-primary font-bold">+7</span>
</div>
<span class="material-symbols-outlined text-primary text-[20px]">casino</span>
</button>
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerDamage('Ray of Frost Dmg', '2d8', 'Cold')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-secondary">Damage</span>
<span class="font-stat-numeric text-stat-modifier text-secondary font-bold">2d8 <span class="font-formula-sm text-[10px] text-on-surface-variant">Cold</span></span>
</div>
<span class="material-symbols-outlined text-secondary text-[20px]">ac_unit</span>
</button>
</div>
</div>
<!-- Fire Bolt -->
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-error flex-shrink-0"></span>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Fire Bolt</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-error font-formula-sm text-[10px] font-semibold">Cantrip</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Ranged Spell Attack · 120 ft · Ignites flammable objects</p>
<div class="grid grid-cols-2 gap-space-xs mt-1">
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerRoll('Fire Bolt Atk', 7, '1d20+7')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-primary">Spell Atk</span>
<span class="font-stat-numeric text-stat-modifier text-primary font-bold">+7</span>
</div>
<span class="material-symbols-outlined text-primary text-[20px]">casino</span>
</button>
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerDamage('Fire Bolt Dmg', '2d10', 'Fire')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-error">Damage</span>
<span class="font-stat-numeric text-stat-modifier text-error font-bold">2d10 <span class="font-formula-sm text-[10px] text-on-surface-variant">Fire</span></span>
</div>
<span class="material-symbols-outlined text-error text-[20px]">local_fire_department</span>
</button>
</div>
</div>
</div>
<!-- TAB 2: Bonus Actions (Hidden by default) -->
<div class="combat-view hidden flex-col gap-space-xs" id="bonus-tab">
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Bladesong Activation</span>
</div>
<span class="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Bonus Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Duration: 1 minute (10 rounds). Grants +4 AC, +10ft speed, advantage on Acrobatics checks, +4 bonus to Constitution saves to maintain concentration.</p>
<button class="mt-2 py-2 rounded-lg bg-secondary text-on-secondary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center shadow-sm" onclick="toggleBladesong()">
          Activate Bladesong
        </button>
</div>
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Misty Step</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">2nd Level</span>
</div>
<span class="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Bonus Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Range: Self (30 ft). Briefly surrounded by silver mist, teleport up to 30 feet to an unoccupied space you can see.</p>
<button class="mt-2 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-secondary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center" onclick="triggerQuickCast('Misty Step', 2)">
          Cast (Expends Level 2 Slot)
        </button>
</div>
</div>
<!-- TAB 3: Reactions (Hidden by default) -->
<div class="combat-view hidden flex-col gap-space-xs" id="reactions-tab">
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Shield</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">1st Level</span>
</div>
<span class="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Reaction</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Trigger: When hit by an attack or targeted by magic missile. Grants +5 AC until start of your next turn and negates Magic Missile damage.</p>
<button class="mt-2 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-tertiary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center" onclick="triggerQuickCast('Shield', 1)">
          Trigger +5 AC (AC 25)
        </button>
</div>
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Absorb Elements</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">1st Level</span>
</div>
<span class="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Reaction</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Trigger: Taking acid, cold, fire, lightning, or thunder damage. Gain resistance against triggering type, and next melee attack deals +1d6 extra damage.</p>
<button class="mt-2 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-tertiary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center" onclick="triggerQuickCast('Absorb Elements', 1)">
          Gain Resistance (Lvl 1)
        </button>
</div>
</div>
<!-- TAB 4: Prepared Spells Quick List (Hidden by default) -->
<div class="combat-view hidden flex-col gap-space-xs" id="spells-tab">
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-sm shadow-md">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Prepared Grimoire</span>
<span class="font-formula-sm text-formula-sm text-primary">12 Prepared / Save DC 15</span>
</div>
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Haste <span class="text-secondary text-[11px]">(Concentrating)</span></span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">3rd Level · Action · Double speed, +2 AC, extra Action</span>
</div>
<button class="px-2 py-1 rounded bg-error-container text-on-error-container font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="breakConcentration()">Drop Conc</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Fireball</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">3rd Level · 150 ft · 20 ft radius · 8d6 Fire (DEX save DC 15)</span>
</div>
<button class="px-2 py-1 rounded bg-primary-container text-on-primary-container font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerDamage('Fireball', '8d6', 'Fire')">Cast 8d6</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Counterspell</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">3rd Level · Reaction · 60 ft · Interrupt spell of 3rd or lower</span>
</div>
<button class="px-2 py-1 rounded bg-surface-container text-primary font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerRoll('Counterspell Check (INT)', 4)">Check +4</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Dimension Door</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">4th Level · 500 ft · Teleport self + 1 willing passenger</span>
</div>
<button class="px-2 py-1 rounded bg-surface-container text-primary font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerQuickCast('Dimension Door', 4)">Slot 4</button>
</div>
</div>
</div>
</div>
</section>
</div>
<script>
  // Character Vitality State
  let currentHp = 48;
  const maxHp = 48;
  let tempHp = 0;
  let isBladesongActive = true;
  let hasInspiration = true;
  let remainingHitDice = 5;

  function changeHp(delta) {
    currentHp = Math.max(0, Math.min(maxHp, currentHp + delta));
    const hpElem = document.getElementById('current-hp');
    const barElem = document.getElementById('hp-bar-fill');
    if (hpElem) hpElem.innerText = currentHp;
    if (barElem) {
      const pct = (currentHp / maxHp) * 100;
      barElem.style.width = pct + '%';
      if (pct <= 25) {
        barElem.className = 'h-full bg-error transition-all duration-300 rounded-full';
      } else if (pct <= 50) {
        barElem.className = 'h-full bg-primary transition-all duration-300 rounded-full';
      } else {
        barElem.className = 'h-full bg-secondary-container transition-all duration-300 rounded-full';
      }
    }
  }

  function adjustTempHp(amount) {
    tempHp = (tempHp === 0) ? 8 : 0;
    const btn = document.getElementById('temp-hp-display');
    if (btn) btn.innerText = '+' + tempHp;
  }

  function spendHitDice() {
    if (remainingHitDice > 0) {
      remainingHitDice--;
      document.getElementById('hit-dice-display').innerText = remainingHitDice + '/7d6';
      showToast('Spent Hit Die', 'Regained 1d6+2 HP');
      changeHp(6);
    } else {
      showToast('No Hit Dice Left', 'Requires a Long Rest');
    }
  }

  function toggleBladesong() {
    isBladesongActive = !isBladesongActive;
    const acEl = document.getElementById('ac-value');
    const spdEl = document.getElementById('speed-value');
    const btn = document.getElementById('bladesong-toggle-btn');
    if (isBladesongActive) {
      if (acEl) acEl.innerText = '20';
      if (spdEl) spdEl.innerText = '40';
      if (btn) {
        btn.innerText = 'Deactivate';
        btn.className = 'px-space-sm py-1 rounded-md bg-secondary text-on-secondary font-label-caps text-label-caps uppercase font-bold active:scale-95 transition-transform flex-shrink-0 shadow-sm';
      }
      showToast('Bladesong Activated', '+4 AC, +10ft Speed, +4 Conc');
    } else {
      if (acEl) acEl.innerText = '16';
      if (spdEl) spdEl.innerText = '30';
      if (btn) {
        btn.innerText = 'Activate';
        btn.className = 'px-space-sm py-1 rounded-md bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps uppercase font-bold active:scale-95 transition-transform flex-shrink-0';
      }
      showToast('Bladesong Ended', 'Returned to base defenses');
    }
  }

  function toggleInspiration() {
    hasInspiration = !hasInspiration;
    const btn = document.getElementById('inspiration-btn');
    if (btn) {
      if (hasInspiration) {
        btn.className = 'flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-high text-primary hover:bg-surface-bright transition-all active:scale-95';
        showToast('Inspiration Ready', 'Reroll any d20 check');
      } else {
        btn.className = 'flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all active:scale-95 opacity-50';
        showToast('Inspiration Expended', 'Heroic reroll used');
      }
    }
  }

  function togglePip(button) {
    if (button.classList.contains('bg-secondary')) {
      button.className = 'w-6 h-6 rounded-md bg-surface-container-highest flex items-center justify-center text-on-surface-variant active:scale-90 transition-transform';
    } else {
      button.className = 'w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-on-secondary shadow-sm active:scale-90 transition-transform';
    }
  }

  function toggleRecovery(button) {
    if (button.innerText.includes('Ready')) {
      button.innerText = '0/1 Used';
      button.className = 'px-2.5 py-1 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm font-bold opacity-60';
      showToast('Arcane Recovery Used', 'Recovered up to 4 spell slot levels');
    } else {
      button.innerText = '1/1 Ready';
      button.className = 'px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-formula-sm text-formula-sm font-bold active:scale-95 transition-all shadow-sm';
    }
  }

  function resetResources() {
    remainingHitDice = 7;
    document.getElementById('hit-dice-display').innerText = '7/7d6';
    currentHp = maxHp;
    changeHp(0);
    showToast('Long Rest Completed', 'All HP, Hit Dice, and spell slots replenished');
  }

  function toggleSpellSlot(btn, counterId) {
    const isAvailable = btn.classList.contains('bg-primary');
    if (isAvailable) {
      btn.className = 'w-6 h-6 rotate-45 rounded-sm bg-surface-container-highest text-outline flex items-center justify-center transition-all active:scale-90 opacity-60';
      btn.firstElementChild.innerText = '◇';
    } else {
      btn.className = 'w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm';
      btn.firstElementChild.innerText = '◆';
    }

    // Update parent count
    const parentContainer = btn.parentElement;
    const activeCount = parentContainer.querySelectorAll('.bg-primary').length;
    const totalCount = parentContainer.children.length;
    const countDisplay = document.getElementById(counterId);
    if (countDisplay) {
      countDisplay.innerText = activeCount + '/' + totalCount;
    }
  }

  function selectCombatTab(btn, targetId) {
    document.querySelectorAll('.combat-tab').forEach(b => {
      b.className = 'combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface';
    });
    btn.className = 'combat-tab flex-1 py-1.5 px-3 rounded-lg bg-surface-container-high text-primary font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center';

    document.querySelectorAll('.combat-view').forEach(v => {
      v.classList.add('hidden');
      v.classList.remove('flex');
    });

    const activeView = document.getElementById(targetId);
    if (activeView) {
      activeView.classList.remove('hidden');
      activeView.classList.add('flex');
    }
  }

  function triggerRoll(title, mod, formula = '1d20') {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    const isCrit = d20 === 20;
    const isFumble = d20 === 1;

    let descriptor = `(Nat ${d20} + ${mod})`;
    if (isCrit) descriptor = `(NATURAL 20!)`;
    if (isFumble) descriptor = `(CRITICAL MISS)`;

    showToast(title, `${total} <span class="text-body-sm font-formula-sm text-on-surface">${descriptor}</span>`);
  }

  function triggerDamage(title, diceString, type) {
    // Basic dice simulator (e.g. 1d8+4, 2d8, 8d6)
    let total = 0;
    if (diceString === '1d8+4') total = Math.floor(Math.random() * 8) + 1 + 4;
    else if (diceString === '1d8') total = Math.floor(Math.random() * 8) + 1;
    else if (diceString === '2d8') total = Math.floor(Math.random() * 8) + Math.floor(Math.random() * 8) + 2;
    else if (diceString === '2d10') total = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 2;
    else if (diceString === '8d6') total = 28; // Average representation for instant test

    showToast(title, `${total} ${type} <span class="text-body-sm font-formula-sm text-on-surface">(${diceString})</span>`);
  }

  function triggerQuickCast(spellName, level) {
    showToast(`Cast ${spellName}`, `Expended Level ${level} Spell Slot`);
  }

  function breakConcentration() {
    showToast('Concentration Broken', 'Haste dropped: Lethargy for 1 turn');
  }

  let toastTimer = null;
  function showToast(label, resultHtml) {
    const toast = document.getElementById('dice-banner');
    const labelEl = document.getElementById('dice-label');
    const resultEl = document.getElementById('dice-result');

    if (!toast || !labelEl || !resultEl) return;

    labelEl.innerText = label;
    resultEl.innerHTML = resultHtml;

    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }
</script></main><nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.65)]" data-active-classes="text-primary font-semibold"><div class="flex justify-around items-center h-16 px-space-xs"><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[22px]">explore</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Dashboard</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="compendium" href="#"><span class="material-symbols-outlined text-[22px]">local_library</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Library</span></a><a aria-current="page" class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors text-primary font-semibold" data-path="sheet" href="#"><span class="material-symbols-outlined text-[22px]">shield_person</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Sheet</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="spell" href="#"><span class="material-symbols-outlined text-[22px]">auto_fix_high</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Spells</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="abilities" href="#"><span class="material-symbols-outlined text-[22px]">swords</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Features</span></a></div></nav></body></html>

<!-- Compendium - The Wizard (2024) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/><meta content="mobile_tab" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{width:100vw;margin:0;padding:0;background-color:#0f131d;}body{overscroll-behavior:none;}.pb-safe{padding-bottom:env(safe-area-inset-bottom,0px);}.pt-safe{padding-top:env(safe-area-inset-top,0px);}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-tertiary-fixed-variant": "#2f3aa3", "primary-container": "#d4af37", "on-primary": "#3c2f00", "on-secondary-container": "#00374d", "surface-bright": "#353944", "surface": "#0f131d", "surface-container-high": "#262a34", "tertiary-container": "#a5adff", "background": "#0f131d", "surface-container": "#1b1f2a", "on-surface-variant": "#d0c5af", "outline": "#99907c", "outline-variant": "#4d4635", "secondary-container": "#00a6e0", "on-background": "#dfe2f0", "primary-fixed-dim": "#e9c349", "tertiary-fixed": "#e0e0ff", "on-primary-fixed": "#241a00", "primary": "#f2ca50", "on-primary-fixed-variant": "#574500", "tertiary": "#c7cbff", "surface-variant": "#313540", "on-tertiary-fixed": "#000767", "surface-container-lowest": "#0a0e18", "error-container": "#93000a", "on-primary-container": "#554300", "surface-dim": "#0f131d", "secondary-fixed-dim": "#7bd0ff", "surface-container-highest": "#313540", "primary-fixed": "#ffe088", "on-secondary-fixed": "#001e2c", "on-tertiary": "#131e8c", "on-error": "#690005", "tertiary-fixed-dim": "#bdc2ff", "on-tertiary-container": "#2d38a1", "inverse-surface": "#dfe2f0", "secondary-fixed": "#c4e7ff", "on-surface": "#dfe2f0", "on-error-container": "#ffdad6", "surface-container-low": "#171b26", "inverse-primary": "#735c00", "secondary": "#7bd0ff", "error": "#ffb4ab", "on-secondary": "#00354a", "surface-tint": "#e9c349", "on-secondary-fixed-variant": "#004c69", "inverse-on-surface": "#2c303b" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "space-sm": "0.5rem", "space-lg": "1.5rem", "gutter": "1.5rem", "space-xs": "0.25rem", "gutter-mobile": "0.75rem", "margin-mobile": "1rem", "space-md": "1rem", "space-xl": "2.5rem", "margin": "2rem" }, "fontFamily": { "body-md": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Playfair Display"], "body-lg": ["Plus Jakarta Sans"], "stat-numeric": ["JetBrains Mono"], "body-sm": ["Plus Jakarta Sans"], "display-lg": ["Playfair Display"], "label-caps": ["Plus Jakarta Sans"], "headline-md": ["Playfair Display"], "display-lg-mobile": ["Playfair Display"], "formula-sm": ["JetBrains Mono"], "headline-sm": ["Playfair Display"], "stat-modifier": ["JetBrains Mono"], "headline-lg": ["Playfair Display"] }, "fontSize": { "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "400" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "0em", "fontWeight": "600" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "stat-numeric": ["24px", { "lineHeight": "28px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "400" }], "display-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-caps": ["11px", { "lineHeight": "14px", "letterSpacing": "0.08em", "fontWeight": "700" }], "headline-md": ["22px", { "lineHeight": "28px", "letterSpacing": "0.01em", "fontWeight": "600" }], "display-lg-mobile": ["30px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "formula-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "headline-sm": ["18px", { "lineHeight": "24px", "letterSpacing": "0.02em", "fontWeight": "600" }], "stat-modifier": ["16px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "0em", "fontWeight": "600" }] } } } }</script><style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head><body class="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary selection:text-on-primary"><header class="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(0,0,0,0.5)]"><div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm min-w-0"><img alt="Arcana 5e Emblem" class="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1XmU8-_97BRk3fBob1fCTSwJ0v9Y7WI6c_7Tz5zpY_Z7Ha1I5yu9hNSJP6ynPten5XLbO44ZCateTNf-tbKZDQsorGHclyB-k_PXer5mGZxG7fZLmtsBqyFUSOZAQzk0_9BVVUxkM8ZaZ2sdiT_D9c6w9unC_NMiNZ1EyyiwUxRy7E2Rsg4QcO8e3R5cdW-CzzZfA7apEViepCJSkCCfPfSHfu0GGiooFw2WmHwwvzEPg"/><div class="flex flex-col min-w-0"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary tracking-wide font-bold uppercase truncate">ARCANA 5E</span><span class="text-xs text-outline font-stat-numeric hidden sm:inline">•</span><span class="text-xs text-outline truncate hidden sm:inline uppercase tracking-widest font-label-caps">Compendium</span></div><span class="font-label-caps text-label-caps text-on-surface-variant/80 tracking-widest uppercase truncate">2024 RULES COMPENDIUM</span></div></div><div class="flex items-center gap-space-xs flex-shrink-0"><button aria-label="Quick Dice Roll d20" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-primary transition-all" type="button"><span class="material-symbols-outlined text-[20px]">casino</span></button><button aria-label="Search compendium" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-on-surface transition-all" type="button"><span class="material-symbols-outlined text-[20px]">search</span></button><button aria-label="Character profile Aeloria Level 7" class="h-11 pl-space-xs pr-space-sm flex items-center gap-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all" type="button"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/><div class="flex flex-col items-start leading-none pr-0.5"><span class="font-label-caps text-[10px] text-on-surface font-semibold truncate max-w-[64px]">Aeloria</span><span class="font-formula-sm text-[9px] text-primary">Lv.7</span></div></button></div></div></header><main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full">
<!-- Visual Breadcrumb & Title Cluster -->
<section class="px-gutter-mobile pt-space-md pb-space-sm flex flex-col gap-space-xs">
<nav class="flex items-center gap-1.5 flex-wrap text-on-surface-variant font-label-caps text-label-caps tracking-widest uppercase">
<span class="hover:text-primary transition-colors cursor-pointer">Compendium</span>
<span class="material-symbols-outlined text-[12px] text-outline">chevron_right</span>
<span class="hover:text-primary transition-colors cursor-pointer">Classes</span>
<span class="material-symbols-outlined text-[12px] text-outline">chevron_right</span>
<span class="text-primary font-bold">Wizard (2024 Core)</span>
</nav>
<div class="flex items-start justify-between gap-space-sm mt-space-xs">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase">Arcane Paradigm • 2024 Revision</span>
<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-headline-lg">The Wizard</h1>
</div>
<div class="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shadow-md flex-shrink-0 text-primary">
<span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant italic">Masters of arcane resonance, codifying raw planar energy through relentless intellect and ancient inscriptions.</p>
<!-- Key Stats Capsule Grid -->
<div class="grid grid-cols-2 gap-space-xs mt-space-sm">
<div class="bg-surface-container p-space-sm rounded-lg flex items-center gap-space-xs shadow-sm">
<span class="material-symbols-outlined text-primary text-[20px]">psychology</span>
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-[10px] text-outline uppercase tracking-wider">Primary Ability</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface truncate">Intelligence</span>
</div>
</div>
<div class="bg-surface-container p-space-sm rounded-lg flex items-center gap-space-xs shadow-sm">
<span class="material-symbols-outlined text-secondary text-[20px]">favorite</span>
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-[10px] text-outline uppercase tracking-wider">Hit Die</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface truncate">1d6 per Wizard Lv.</span>
</div>
</div>
<div class="bg-surface-container p-space-sm rounded-lg flex items-center gap-space-xs shadow-sm">
<span class="material-symbols-outlined text-tertiary text-[20px]">shield</span>
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-[10px] text-outline uppercase tracking-wider">Armor Training</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface truncate">None</span>
</div>
</div>
<div class="bg-surface-container p-space-sm rounded-lg flex items-center gap-space-xs shadow-sm">
<span class="material-symbols-outlined text-primary-fixed-dim text-[20px]">security</span>
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-[10px] text-outline uppercase tracking-wider">Saving Throws</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface truncate">INT &amp; WIS</span>
</div>
</div>
</div>
<!-- Weapon Proficiencies Line -->
<div class="bg-surface-container-low px-space-sm py-space-xs rounded flex items-center gap-space-xs text-on-surface-variant font-formula-sm text-formula-sm">
<span class="material-symbols-outlined text-primary text-[14px]">swords</span>
<span class="text-on-surface font-semibold">Weapons:</span>
<span class="truncate">Dagger, Dart, Sling, Quarterstaff, Light Crossbow</span>
</div>
</section>
<!-- Sticky Dynamic Section Bar -->
<div class="sticky top-16 z-40 bg-surface/95 backdrop-blur-md px-gutter-mobile py-space-xs shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
<div class="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-0.5" id="nav-tabs">
<a class="tab-chip px-space-sm py-1 rounded bg-surface-container-high text-primary font-label-caps text-label-caps uppercase whitespace-nowrap shadow-sm" href="#overview">Overview</a>
<a class="tab-chip px-space-sm py-1 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps uppercase whitespace-nowrap" href="#features">Features</a>
<a class="tab-chip px-space-sm py-1 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps uppercase whitespace-nowrap" href="#bladesinger">Bladesinger</a>
<a class="tab-chip px-space-sm py-1 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps uppercase whitespace-nowrap" href="#level-table">Progression</a>
<a class="tab-chip px-space-sm py-1 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps uppercase whitespace-nowrap" href="#subclasses">Subclasses</a>
</div>
</div>
<!-- Main Reference Content Deck -->
<div class="px-gutter-mobile flex flex-col gap-space-lg mt-space-md">
<!-- Section 1: 2024 Revision Briefing / Overview -->
<section class="flex flex-col gap-space-sm scroll-mt-28" id="overview">
<div class="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-sm shadow-md relative overflow-hidden">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[20px]">history_edu</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface font-headline-sm">2024 Codex Revision Notes</h2>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
          The 2024 Fifth Edition revisions fundamentally elevate the Wizard's scholarly mastery over spell preparation and ritual performance. Spellbooks now integrate seamless swapping mechanics, Scholar grants automatic expertise, and subclass selection has standardized to Level 3.
        </p>
<!-- Grimoire Artwork Spotlight -->
<div class="w-full h-44 rounded-lg bg-surface-container-lowest overflow-hidden shadow-inner relative mt-space-xs">
<img class="w-full h-full object-cover opacity-85" data-alt="Dark fantasy grimoire open on an obsidian altar surrounded by glowing golden runic sigils, faint blue arcane motes floating in midair, scholarly codex with leather-bound brass embellishments, cinematic atmospheric tabletop lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCopalATK8YOumHCXBEIXF4Tpq2hj-QaEY0Z2rOmNMd3xmSf64al30OHszZ3W2fKkYNzeqWon_TPFZQ4Dy-gYcOWlB5q0l3-i8PLRd6krUaVN5ov9uTbdoxmB0ScPJkmA_baMgOLCJK7AdV3xTEXUuc51VmhF4su2iqX7IAu1RcDV95JvyXmVOer_BOydp_nDjHT-yvjlNvUZ3d4UGlgympnOQnX3hLtjXIGpPCqama"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
<div class="absolute bottom-2 left-3 right-3 flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary bg-surface-container-lowest/80 px-space-xs py-0.5 rounded backdrop-blur">Grimoire of Aeloria</span>
<span class="font-label-caps text-[10px] text-on-surface-variant">Ars Arcana • Volume VII</span>
</div>
</div>
</div>
</section>
<!-- Section 2: Core Class Features Progression -->
<section class="flex flex-col gap-space-md scroll-mt-28" id="features">
<div class="flex items-center justify-between">
<h2 class="font-headline-sm text-headline-sm text-on-surface flex items-center gap-space-xs font-headline-sm">
<span class="material-symbols-outlined text-primary text-[22px]">menu_book</span>
          Core Class Features
        </h2>
<span class="font-formula-sm text-formula-sm text-primary bg-surface-container px-space-xs py-0.5 rounded">Lv. 1 - Lv. 20</span>
</div>
<!-- Feature 1: Spellcasting -->
<article class="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-sm shadow-md">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs flex-wrap">
<span class="bg-primary/20 text-primary px-space-xs py-0.5 rounded font-formula-sm text-formula-sm font-bold">LEVEL 1</span>
<span class="bg-surface-container-high text-secondary px-space-xs py-0.5 rounded font-formula-sm text-formula-sm">Ritual Adept</span>
<span class="bg-surface-container-high text-tertiary px-space-xs py-0.5 rounded font-formula-sm text-formula-sm">Prepared Caster</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mt-1">Spellcasting &amp; Memorization</h3>
</div>
<span class="material-symbols-outlined text-primary text-[24px]">flare</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
          As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.
        </p>
<!-- Prepared Spells Formula Box -->
<div class="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-space-xs">
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase">Prepared Spells Formula (2024)</span>
<div class="flex items-center gap-space-sm bg-surface-container-lowest p-space-xs px-space-sm rounded">
<span class="font-stat-numeric text-stat-numeric text-primary">INT MOD + WIZARD LEVEL</span>
<span class="text-xs text-outline font-formula-sm">(Min. 1 spell)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Under 2024 rules, you can cast any spell from your spellbook as a ritual if it has the Ritual tag—you no longer need to have it prepared!
          </p>
</div>
<!-- 2024 Memorize Spell Micro-Feature -->
<div class="bg-surface-container-high/60 p-space-sm rounded-lg flex items-start gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[20px] flex-shrink-0 mt-0.5">swap_horizontal_circle</span>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-on-surface font-semibold">Memorize Spell (Level 1)</span>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Whenever you finish a Short Rest, you can replace one of your prepared spells with another from your spellbook.</p>
</div>
</div>
</article>
<!-- Feature 2: Arcane Recovery + Interactive Simulator Card -->
<article class="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-sm shadow-md">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="bg-primary/20 text-primary px-space-xs py-0.5 rounded font-formula-sm text-formula-sm font-bold">LEVEL 1</span>
<span class="bg-surface-container-high text-on-surface-variant px-space-xs py-0.5 rounded font-formula-sm text-formula-sm">1 / Short Rest</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mt-1">Arcane Recovery</h3>
</div>
<span class="material-symbols-outlined text-secondary text-[24px]">hourglass_top</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
          You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a Short Rest, recover expended spell slots with a combined level equal to or less than half your Wizard level (rounded up), and none of the slots can be 6th level or higher.
        </p>
<!-- Interactive Recovery Slot Simulator -->
<div class="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-space-sm" id="recovery-calculator">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-secondary tracking-widest uppercase">Recovery Calculator Simulator</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant" id="recov-capacity">Capacity: 4 Levels</span>
</div>
<!-- Wizard Level Slider -->
<div class="flex flex-col gap-1">
<div class="flex justify-between items-center text-xs font-formula-sm text-on-surface-variant">
<span>Wizard Level: <strong class="text-primary" id="lvl-display">7</strong></span>
<span>Slots Reclaimable: <strong class="text-secondary" id="recov-display">4 Levels</strong></span>
</div>
<input class="w-full accent-primary h-1.5 bg-surface-container-highest rounded cursor-pointer" id="wizard-level-slider" max="20" min="1" type="range" value="7"/>
</div>
<!-- Slot Configuration Preset Pills -->
<div class="flex items-center gap-space-xs overflow-x-auto no-scrollbar pt-1" id="slot-pills">
<button class="bg-surface-container-high px-space-xs py-1 rounded text-primary font-formula-sm text-formula-sm flex items-center gap-1 shadow-sm active:scale-95" type="button">
<span class="material-symbols-outlined text-[14px]">auto_fix</span> 2 × Lv.2 Slots
            </button>
<button class="bg-surface-container-high px-space-xs py-1 rounded text-secondary font-formula-sm text-formula-sm flex items-center gap-1 shadow-sm active:scale-95" type="button">
<span class="material-symbols-outlined text-[14px]">bolt</span> 1 × Lv.3 + 1 × Lv.1
            </button>
<button class="bg-surface-container-high px-space-xs py-1 rounded text-tertiary font-formula-sm text-formula-sm flex items-center gap-1 shadow-sm active:scale-95" type="button">
<span class="material-symbols-outlined text-[14px]">star</span> 1 × Lv.4 Slot
            </button>
</div>
</div>
</article>
<!-- Feature 3: Scholar (NEW 2024) -->
<article class="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-sm shadow-md">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="bg-primary/20 text-primary px-space-xs py-0.5 rounded font-formula-sm text-formula-sm font-bold">LEVEL 2</span>
<span class="bg-primary-container text-on-primary-container px-space-xs py-0.5 rounded font-formula-sm text-formula-sm font-bold uppercase">New 2024</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mt-1">Scholar</h3>
</div>
<span class="material-symbols-outlined text-primary text-[24px]">school</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
          While studying magic, you specialized your academic training. You gain Expertise in one of your proficient Wizard skills from the Academic repertoire:
        </p>
<!-- Expertise Selection Pills -->
<div class="grid grid-cols-2 gap-space-xs">
<div class="bg-surface-container-low p-space-xs px-space-sm rounded flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-on-surface">Arcana</span>
<span class="material-symbols-outlined text-primary text-[18px]">verified</span>
</div>
<div class="bg-surface-container-low p-space-xs px-space-sm rounded flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-on-surface">History</span>
<span class="material-symbols-outlined text-outline text-[18px]">radio_button_unchecked</span>
</div>
<div class="bg-surface-container-low p-space-xs px-space-sm rounded flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-on-surface">Nature</span>
<span class="material-symbols-outlined text-outline text-[18px]">radio_button_unchecked</span>
</div>
<div class="bg-surface-container-low p-space-xs px-space-sm rounded flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-on-surface">Religion</span>
<span class="material-symbols-outlined text-outline text-[18px]">radio_button_unchecked</span>
</div>
</div>
</article>
</section>
<!-- Section 3: Featured Subclass — School of Bladesinging -->
<section class="flex flex-col gap-space-sm scroll-mt-28" id="bladesinger">
<div class="flex items-center justify-between">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-secondary tracking-widest uppercase">Featured Subclass</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface font-headline-sm">School of Bladesinging</h2>
</div>
<span class="bg-secondary/15 text-secondary px-space-sm py-1 rounded font-formula-sm text-formula-sm font-semibold">Level 3 Subclass</span>
</div>
<div class="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-md shadow-md">
<!-- Subclass Art Vignette -->
<div class="w-full h-40 rounded-lg bg-surface-container-lowest overflow-hidden shadow-inner relative">
<img class="w-full h-full object-cover" data-alt="An elven bladesinger wizard in flowing dark midnight blue combat robes wielding an illuminated crystalline rapier, swirling arcane runes of cyan and gold circling the blade in mid-spin, dynamic duelist pose inside an ancient moonlit temple." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZO74JI8biuGol4Ao8bSoi72aDsQtviEu_s_dO9THSfcASWjrSPHInSLj1PIInB324v3F1oju1-jWYKa1lsLxzZl0YDB0jIa1-QzHQ3dFg0G_I6mQZzOL1tcSpVhi2v7UFO9b3XD4RYArGT6tYrho2Cn6G7_-WNLpxsD4c4PURC8rW_yhLMcy0wPbyAVjszw4I8QRBgw_7MruTMzHcv86yPSeIuOP-YUvUO3C84PV7"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent"></div>
<div class="absolute bottom-2 left-3 right-3 flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-secondary bg-surface-container-lowest/80 px-space-xs py-0.5 rounded backdrop-blur">Elven Martial Tradition</span>
<span class="font-label-caps text-[10px] text-on-surface-variant font-formula-sm">Bonus: Light Armor &amp; Rapier</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
          Bladesingers master a tradition of wizardry that incorporates swordplay and dance. In combat, a Bladesinger channels magic into fluid, lethal defensive maneuvers and devastating spell-infused strikes.
        </p>
<!-- Feature Card: Bladesong -->
<div class="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-space-xs shadow-sm">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-[16px] text-primary font-semibold">Bladesong (Bonus Action)</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Uses: Prof. Bonus / Long Rest</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            You invoke an arcane song that lasts for 1 minute or until you are incapacitated, don medium/heavy armor or a shield, or use two hands to make an attack:
          </p>
<ul class="flex flex-col gap-1 mt-1 text-on-surface font-body-sm text-body-sm pl-1">
<li class="flex items-start gap-space-xs">
<span class="material-symbols-outlined text-primary text-[16px] mt-0.5">add_circle</span>
<span><strong>AC Bonus:</strong> Gain a bonus to AC equal to your Intelligence modifier (minimum +1).</span>
</li>
<li class="flex items-start gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[16px] mt-0.5">directions_run</span>
<span><strong>Mobility:</strong> Your walking speed increases by +10 feet.</span>
</li>
<li class="flex items-start gap-space-xs">
<span class="material-symbols-outlined text-tertiary text-[16px] mt-0.5">psychology_alt</span>
<span><strong>Concentration Shield:</strong> Advantage on Concentration checks to maintain spells.</span>
</li>
</ul>
</div>
<!-- Feature Card: Extra Attack with Cantrip Swap -->
<div class="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-space-xs shadow-sm">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-[16px] text-secondary font-semibold">Extra Attack (Level 6)</span>
<span class="bg-surface-container text-on-surface px-space-xs py-0.5 rounded font-formula-sm text-formula-sm font-semibold">Cantrip Substitution</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            You can attack twice instead of once whenever you take the Attack action on your turn. Moreover, you can cast one of your cantrips with a casting time of 1 action in place of one of those attacks (e.g., <em>Booming Blade</em> or <em>Mind Sliver</em>).
          </p>
</div>
</div>
</section>
<!-- Section 4: Subclasses Quick Filter Selector -->
<section class="flex flex-col gap-space-sm scroll-mt-28" id="subclasses">
<div class="flex items-center justify-between">
<h2 class="font-headline-sm text-headline-sm text-on-surface font-headline-sm">Wizard Subclasses (2024)</h2>
<span class="font-label-caps text-label-caps text-outline uppercase">6 Traditions</span>
</div>
<!-- Filter Carousel Buttons -->
<div class="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1">
<button class="subclass-btn active px-space-sm py-1.5 rounded-lg bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-wider whitespace-nowrap shadow font-bold" type="button">Bladesinger</button>
<button class="subclass-btn px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps uppercase tracking-wider whitespace-nowrap" type="button">Abjurer</button>
<button class="subclass-btn px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps uppercase tracking-wider whitespace-nowrap" type="button">Diviner</button>
<button class="subclass-btn px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps uppercase tracking-wider whitespace-nowrap" type="button">Evoker</button>
<button class="subclass-btn px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps uppercase tracking-wider whitespace-nowrap" type="button">Illusionist</button>
<button class="subclass-btn px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps uppercase tracking-wider whitespace-nowrap" type="button">Necromancer</button>
</div>
<!-- Active Subclass Summary Preview Card -->
<div class="bg-surface-container rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-md">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase">School Focus</span>
<span class="font-headline-sm text-headline-sm text-on-surface font-semibold">School of Divination</span>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Portent rolls allow you to glimpse future rolls and replace d20 outcomes directly.</p>
</div>
<button aria-label="Explore Divination Subclass" class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0 active:scale-95 shadow-sm" type="button">
<span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
</section>
<!-- Section 5: Interactive Level Progression Matrix -->
<section class="flex flex-col gap-space-sm scroll-mt-28" id="level-table">
<div class="flex items-center justify-between">
<div>
<h2 class="font-headline-sm text-headline-sm text-on-surface font-headline-sm">Class Progression</h2>
<span class="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase">Level 1 Through 20 Full Matrix</span>
</div>
<button class="bg-surface-container px-space-xs py-1 rounded text-primary font-formula-sm text-formula-sm active:scale-95 shadow-sm" id="toggle-all-levels" type="button">Expand All</button>
</div>
<!-- Accordion Mobile Matrix -->
<div class="flex flex-col gap-space-xs" id="accordion-container">
<!-- Level 1 Item -->
<details class="group bg-surface-container rounded-xl overflow-hidden shadow-sm" open="">
<summary class="flex items-center justify-between p-space-sm cursor-pointer select-none bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-8 h-8 rounded bg-primary/20 text-primary font-stat-modifier text-stat-modifier flex items-center justify-center font-bold">1</span>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-on-surface truncate">Spellcasting, Arcane Recovery</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Prof: +2 • Cantrips: 3 • Slots: 2 (1st)</span>
</div>
</div>
<span class="material-symbols-outlined text-outline text-[20px] transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-space-sm pb-space-sm pt-space-xs bg-surface-container-low flex flex-col gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div class="flex justify-between items-center py-1">
<span class="text-on-surface font-semibold">Spell Slots Available:</span>
<span class="font-formula-sm text-formula-sm text-primary">2 × 1st Level</span>
</div>
<p>You can prepare 4 spells from your spellbook. Cast ritual spells without preparation if they reside in your spellbook.</p>
</div>
</details>
<!-- Level 2 Item -->
<details class="group bg-surface-container rounded-xl overflow-hidden shadow-sm">
<summary class="flex items-center justify-between p-space-sm cursor-pointer select-none bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-8 h-8 rounded bg-surface-container-highest text-on-surface font-stat-modifier text-stat-modifier flex items-center justify-center font-bold">2</span>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-on-surface truncate">Scholar (New 2024)</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Prof: +2 • Cantrips: 3 • Slots: 3 (1st)</span>
</div>
</div>
<span class="material-symbols-outlined text-outline text-[20px] transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-space-sm pb-space-sm pt-space-xs bg-surface-container-low flex flex-col gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div class="flex justify-between items-center py-1">
<span class="text-on-surface font-semibold">Spell Slots Available:</span>
<span class="font-formula-sm text-formula-sm text-primary">3 × 1st Level</span>
</div>
<p>Gain Expertise in Arcana, History, Nature, or Religion. Scholar solidifies research checks during downtime and exploration.</p>
</div>
</details>
<!-- Level 3 Item -->
<details class="group bg-surface-container rounded-xl overflow-hidden shadow-sm">
<summary class="flex items-center justify-between p-space-sm cursor-pointer select-none bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-8 h-8 rounded bg-surface-container-highest text-on-surface font-stat-modifier text-stat-modifier flex items-center justify-center font-bold">3</span>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-on-surface truncate">Wizard Subclass Feature</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Prof: +2 • Cantrips: 3 • Slots: 4 (1st), 2 (2nd)</span>
</div>
</div>
<span class="material-symbols-outlined text-outline text-[20px] transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-space-sm pb-space-sm pt-space-xs bg-surface-container-low flex flex-col gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div class="flex justify-between items-center py-1">
<span class="text-on-surface font-semibold">Spell Slots Available:</span>
<span class="font-formula-sm text-formula-sm text-primary">4 × 1st, 2 × 2nd Level</span>
</div>
<p>Choose an Arcane Tradition (e.g., Bladesinger or Evoker). Subclass unlocks standardized to Level 3 in the 2024 Core Rules.</p>
</div>
</details>
<!-- Level 5 Item (Milestone Tier 2) -->
<details class="group bg-surface-container rounded-xl overflow-hidden shadow-sm">
<summary class="flex items-center justify-between p-space-sm cursor-pointer select-none bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-8 h-8 rounded bg-secondary/20 text-secondary font-stat-modifier text-stat-modifier flex items-center justify-center font-bold">5</span>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-on-surface truncate">Tier 2: 3rd Level Spells</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Prof: +3 • Cantrips: 4 • Slots: 4/3/2</span>
</div>
</div>
<span class="material-symbols-outlined text-outline text-[20px] transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-space-sm pb-space-sm pt-space-xs bg-surface-container-low flex flex-col gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div class="flex justify-between items-center py-1">
<span class="text-on-surface font-semibold">3rd Level Access:</span>
<span class="font-formula-sm text-formula-sm text-secondary">Fireball, Counterspell, Haste</span>
</div>
<p>Cantrip damage scales up to 2 dice. Arcane Recovery can now retrieve up to 3 total spell levels during a Short Rest.</p>
</div>
</details>
<!-- Level 20 Item (Capstone) -->
<details class="group bg-surface-container rounded-xl overflow-hidden shadow-sm">
<summary class="flex items-center justify-between p-space-sm cursor-pointer select-none bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-8 h-8 rounded bg-primary text-on-primary font-stat-modifier text-stat-modifier flex items-center justify-center font-bold">20</span>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-primary truncate">Archmage (Signature Spells)</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Prof: +6 • Epic Boon • Infinite 3rd Lvl</span>
</div>
</div>
<span class="material-symbols-outlined text-outline text-[20px] transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-space-sm pb-space-sm pt-space-xs bg-surface-container-low flex flex-col gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div class="flex justify-between items-center py-1">
<span class="text-on-surface font-semibold">Capstone Power:</span>
<span class="font-formula-sm text-formula-sm text-primary">Always Prepared &amp; Free Casts</span>
</div>
<p>Choose two 3rd-level spells as your Signature Spells. You always have them prepared and can cast each once without expending a spell slot.</p>
</div>
</details>
</div>
</section>
<!-- Section 6: Related Compendium Resources -->
<section class="flex flex-col gap-space-sm pb-space-lg">
<h2 class="font-headline-sm text-headline-sm text-on-surface flex items-center gap-space-xs font-headline-sm">
<span class="material-symbols-outlined text-primary text-[22px]">hub</span>
        Related 2024 Compendium Codex
      </h2>
<div class="grid grid-cols-1 gap-space-xs">
<!-- Resource 1 -->
<a class="bg-surface-container hover:bg-surface-container-high p-space-sm rounded-xl flex items-center justify-between gap-space-sm transition-all active:scale-[0.98] shadow-sm" href="#">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">auto_fix_high</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-on-surface truncate font-semibold">2024 Wizard Spell List (Full)</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant truncate">316 spells categorized by spell level and school</span>
</div>
</div>
<span class="material-symbols-outlined text-primary text-[20px] flex-shrink-0">arrow_forward</span>
</a>
<!-- Resource 2 -->
<a class="bg-surface-container hover:bg-surface-container-high p-space-sm rounded-xl flex items-center justify-between gap-space-sm transition-all active:scale-[0.98] shadow-sm" href="#">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">diamond</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-on-surface truncate font-semibold">Arcane Focus &amp; Material Components</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant truncate">Costly components, orbs, wands, and staves pricing</span>
</div>
</div>
<span class="material-symbols-outlined text-primary text-[20px] flex-shrink-0">arrow_forward</span>
</a>
<!-- Resource 3 -->
<a class="bg-surface-container hover:bg-surface-container-high p-space-sm rounded-xl flex items-center justify-between gap-space-sm transition-all active:scale-[0.98] shadow-sm" href="#">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-tertiary flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">military_tech</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-on-surface truncate font-semibold">War Caster Feat (2024 Updates)</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant truncate">Advantage on concentration &amp; somatic weapon casting</span>
</div>
</div>
<span class="material-symbols-outlined text-primary text-[20px] flex-shrink-0">arrow_forward</span>
</a>
<!-- Resource 4 -->
<a class="bg-surface-container hover:bg-surface-container-high p-space-sm rounded-xl flex items-center justify-between gap-space-sm transition-all active:scale-[0.98] shadow-sm" href="#">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-fixed-dim flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">all_inclusive</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-[15px] text-on-surface truncate font-semibold">Ritual Casting Mechanics</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant truncate">Rules for casting without expending dedicated slots</span>
</div>
</div>
<span class="material-symbols-outlined text-primary text-[20px] flex-shrink-0">arrow_forward</span>
</a>
</div>
</section>
</div>
</div>
<script>
  (function() {
    // Arcane Recovery Slider Micro-interaction
    const slider = document.getElementById('wizard-level-slider');
    const lvlDisplay = document.getElementById('lvl-display');
    const recovDisplay = document.getElementById('recov-display');
    const capacityDisplay = document.getElementById('recov-capacity');

    if (slider && lvlDisplay && recovDisplay && capacityDisplay) {
      slider.addEventListener('input', function(e) {
        const lvl = parseInt(e.target.value, 10);
        const recoveryMax = Math.ceil(lvl / 2);
        lvlDisplay.textContent = lvl;
        recovDisplay.textContent = recoveryMax + ' Levels';
        capacityDisplay.textContent = 'Capacity: ' + recoveryMax + ' Levels';
      });
    }

    // Subclass button selection styling
    const subclassBtns = document.querySelectorAll('.subclass-btn');
    subclassBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        subclassBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
          b.classList.add('bg-surface-container', 'text-on-surface-variant');
        });
        this.classList.remove('bg-surface-container', 'text-on-surface-variant');
        this.classList.add('bg-primary', 'text-on-primary', 'font-bold');
      });
    });

    // Expand / Collapse all progression levels
    const toggleBtn = document.getElementById('toggle-all-levels');
    const accordions = document.querySelectorAll('#accordion-container details');
    let expanded = false;

    if (toggleBtn && accordions.length) {
      toggleBtn.addEventListener('click', function() {
        expanded = !expanded;
        accordions.forEach(d => {
          d.open = expanded;
        });
        toggleBtn.textContent = expanded ? 'Collapse All' : 'Expand All';
      });
    }

    // Sticky tab click highlighting
    const tabs = document.querySelectorAll('.tab-chip');
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => {
          t.classList.remove('bg-surface-container-high', 'text-primary');
          t.classList.add('bg-surface-container', 'text-on-surface-variant');
        });
        this.classList.remove('bg-surface-container', 'text-on-surface-variant');
        this.classList.add('bg-surface-container-high', 'text-primary');
      });
    });
  })();
</script></main><nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.65)]" data-active-classes="text-primary font-semibold"><div class="flex justify-around items-center h-16 px-space-xs"><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[22px]">explore</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Dashboard</span></a><a aria-current="page" class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors text-primary font-semibold" data-path="compendium" href="#"><span class="material-symbols-outlined text-[22px]">local_library</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Library</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="sheet" href="#"><span class="material-symbols-outlined text-[22px]">shield_person</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Sheet</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="spell" href="#"><span class="material-symbols-outlined text-[22px]">auto_fix_high</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Spells</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="abilities" href="#"><span class="material-symbols-outlined text-[22px]">swords</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Features</span></a></div></nav></body></html>

<!-- Character Sheet - Aeloria Lv.7 (Desktop Dual-Column) -->
<!DOCTYPE html><html class="dark" lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"surface-dim":"#0f131d","on-tertiary-fixed":"#000767","error-container":"#93000a","inverse-surface":"#dfe2f0","surface-container-highest":"#313540","surface-container":"#1b1f2a","surface-tint":"#e9c349","on-secondary-fixed-variant":"#004c69","on-tertiary-container":"#2d38a1","on-surface":"#dfe2f0","inverse-primary":"#735c00","secondary-fixed":"#c4e7ff","surface":"#0f131d","surface-container-low":"#171b26","on-primary-fixed":"#241a00","primary-fixed-dim":"#e9c349","secondary-container":"#00a6e0","inverse-on-surface":"#2c303b","on-tertiary":"#131e8c","tertiary-fixed-dim":"#bdc2ff","primary-container":"#d4af37","tertiary":"#c7cbff","outline-variant":"#4d4635","on-secondary-fixed":"#001e2c","on-tertiary-fixed-variant":"#2f3aa3","on-background":"#dfe2f0","on-surface-variant":"#d0c5af","outline":"#99907c","secondary":"#7bd0ff","secondary-fixed-dim":"#7bd0ff","background":"#0f131d","tertiary-fixed":"#e0e0ff","on-primary":"#3c2f00","on-error":"#690005","on-secondary":"#00354a","on-secondary-container":"#00374d","surface-container-lowest":"#0a0e18","primary-fixed":"#ffe088","error":"#ffb4ab","tertiary-container":"#a5adff","on-primary-container":"#554300","surface-bright":"#353944","primary":"#f2ca50","surface-container-high":"#262a34","surface-variant":"#313540","on-error-container":"#ffdad6","on-primary-fixed-variant":"#574500"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"margin":"2rem","margin-mobile":"1rem","gutter":"1.5rem","space-sm":"0.5rem","space-xl":"2.5rem","space-lg":"1.5rem","space-md":"1rem","space-xs":"0.25rem","gutter-mobile":"0.75rem"},"fontFamily":{"label-caps":["Plus Jakarta Sans"],"stat-numeric":["JetBrains Mono"],"headline-sm":["Playfair Display"],"display-lg-mobile":["Playfair Display"],"stat-modifier":["JetBrains Mono"],"headline-lg-mobile":["Playfair Display"],"body-md":["Plus Jakarta Sans"],"display-lg":["Playfair Display"],"formula-sm":["JetBrains Mono"],"body-sm":["Plus Jakarta Sans"],"headline-lg":["Playfair Display"],"headline-md":["Playfair Display"],"body-lg":["Plus Jakarta Sans"]},"fontSize":{"label-caps":["11px",{"lineHeight":"14px","letterSpacing":"0.08em","fontWeight":"700"}],"stat-numeric":["24px",{"lineHeight":"28px","letterSpacing":"-0.02em","fontWeight":"700"}],"headline-sm":["18px",{"lineHeight":"24px","letterSpacing":"0.02em","fontWeight":"600"}],"display-lg-mobile":["30px",{"lineHeight":"36px","letterSpacing":"-0.01em","fontWeight":"700"}],"stat-modifier":["16px",{"lineHeight":"20px","letterSpacing":"0em","fontWeight":"600"}],"headline-lg-mobile":["24px",{"lineHeight":"32px","letterSpacing":"0em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","letterSpacing":"0.01em","fontWeight":"400"}],"display-lg":["40px",{"lineHeight":"48px","letterSpacing":"-0.01em","fontWeight":"700"}],"formula-sm":["11px",{"lineHeight":"14px","letterSpacing":"0.02em","fontWeight":"500"}],"body-sm":["12px",{"lineHeight":"16px","letterSpacing":"0.02em","fontWeight":"400"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"0em","fontWeight":"600"}],"headline-md":["22px",{"lineHeight":"28px","letterSpacing":"0.01em","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"24px","letterSpacing":"0em","fontWeight":"400"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.4)]"><div class="flex flex-col"><div class="h-16 px-space-md flex items-center justify-between bg-surface-container-lowest/60"><div class="flex items-center gap-space-sm"><div class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.25)]"><span class="material-symbols-outlined text-on-primary-container text-[20px]">auto_stories</span></div><div><span class="font-headline-sm text-headline-sm text-primary tracking-wide block leading-none">ARCANA 5E</span><span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase tracking-widest block">2024 Codex</span></div></div><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span></div></div><div class="p-space-sm"><div class="bg-surface-container rounded-lg p-space-sm flex items-center justify-between"><div class="flex items-center gap-space-sm overflow-hidden"><div class="w-8 h-8 rounded-full bg-surface-container-high flex-shrink-0 flex items-center justify-center"><span class="material-symbols-outlined text-primary text-[18px]">swords</span></div><div class="min-w-0"><span class="font-body-sm text-body-sm font-semibold text-on-surface truncate block">Aeloria Silvervein</span><span class="font-formula-sm text-formula-sm text-on-surface-variant truncate block">Lv.7 Bladesinger</span></div></div><button class="p-space-xs text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">unfold_more</span></button></div></div><nav class="flex flex-col gap-space-xs px-space-sm py-space-xs" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg"><a aria-current="page" class="flex items-center gap-space-sm px-space-md py-space-sm transition-all bg-primary-container text-on-primary-container font-semibold rounded-lg" data-path="character-sheet" href="#"><span class="material-symbols-outlined text-[18px]">shield_person</span><span class="font-body-md text-body-md">Character Sheet</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="grimoire-spells" href="#"><span class="material-symbols-outlined text-[18px]">magic_button</span><span class="font-body-md text-body-md">Spell Grimoire</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="tactical-combat" href="#"><span class="material-symbols-outlined text-[18px]">sports_martial_arts</span><span class="font-body-md text-body-md">Combat Tracker</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="inventory-attunement" href="#"><span class="material-symbols-outlined text-[18px]">backpack</span><span class="font-body-md text-body-md">Inventory &amp; Attunement</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="compendium-rules" href="#"><span class="material-symbols-outlined text-[18px]">menu_book</span><span class="font-body-md text-body-md">2024 Compendium</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="campaign-notes" href="#"><span class="material-symbols-outlined text-[18px]">history_edu</span><span class="font-body-md text-body-md">Campaign Chronicle</span></a></nav></div><div class="p-space-sm"><div class="bg-surface-container-lowest rounded-lg p-space-sm mb-space-sm flex items-center justify-between"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-secondary text-[16px]">casino</span><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Arcane Focus</span></div><span class="font-stat-modifier text-stat-modifier text-primary">+4 INT</span></div><div class="flex items-center justify-between text-on-surface-variant px-space-xs"><span class="font-formula-sm text-formula-sm">System SRD 5.24</span><span class="font-formula-sm text-formula-sm text-outline">Sync: Active</span></div></div></aside><div class="pl-64 flex flex-col min-h-screen"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl z-30 shadow-[0_1px_8px_rgba(0,0,0,0.3)] flex items-center justify-between px-gutter"><div class="flex items-center gap-space-md flex-1 max-w-xl"><div class="relative w-full"><span class="material-symbols-outlined text-outline absolute left-3 top-1/2 -translate-y-1/2 text-[18px]">search</span><input class="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-10 pr-16 py-2 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-all" placeholder="Search spells, feats, weapons, rules..." type="text"><div class="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1"><kbd class="bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.5 rounded shadow-sm">Ctrl</kbd><kbd class="bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.5 rounded shadow-sm">K</kbd></div></div></div><div class="flex items-center gap-space-md"><button class="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-xl hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-primary text-[18px]">casino</span><span class="font-label-caps text-label-caps text-on-surface uppercase">Dice Tray</span><span class="font-formula-sm text-formula-sm bg-surface-container-high px-1.5 py-0.5 rounded text-primary-fixed-dim">d20</span></button><button class="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[20px]">bookmarks</span><span class="w-2 h-2 rounded-full bg-primary-container absolute top-1 right-1"></span></button><button class="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[20px]">notifications</span><span class="w-1.5 h-1.5 rounded-full bg-error absolute top-1 right-1"></span></button><div class="h-6 w-px bg-outline-variant/30"></div><div class="flex items-center gap-space-sm"><div class="text-right hidden xl:block"><span class="font-body-sm text-body-sm font-semibold text-on-surface block leading-none">Dungeon Sage</span><span class="font-formula-sm text-formula-sm text-on-surface-variant block">Player ID: #7821</span></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="relative w-full pt-16 pb-14 bg-surface px-gutter flex-1"><div class="flex flex-col w-full gap-space-lg pb-12">
<!-- Character Identity & Strategic Header -->
<section class="relative bg-surface-container-low rounded-xl p-space-lg shadow-xl overflow-hidden">
<!-- Ambient Arcane Energy Background Glow -->
<div class="absolute -right-24 -top-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<div class="absolute left-1/3 -bottom-20 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<div class="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-md border-b border-surface-container-highest/60 pb-space-md">
<!-- Identification & Title -->
<div class="flex items-center gap-space-md">
<div class="relative group">
<div class="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center shadow-md border border-primary/20 overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Intricate digital fantasy painting of Aeloria Silvervein, a moonlit High Elf Bladesinger Wizard. Silver braided hair, piercing sapphire eyes, wearing dark slate and filigree gold elven battle robes while holding a glowing rapier enveloped in azure arcane mist." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6ZjFHfL8RHAjEUfJu-8s5USQpyKhMp8oAjn9u0bjmmSUkDxnmmYh1NRrDjz3bcr5Da4OJO72pyBDhhZcOodC1KzHYivgaX3MOZ8mJmllBQE8w1ysKcq86AZtb3gI2zIG1E05eti_Ake3G9tO-dzwl3drGvXIZRQoo02hqOtKefT8I2nTuepBUHNwS4MKjVXAgg6qlhROHsxlfSUv2J8zZP0ZUPnzm5vKwI7_f4gN">
</div>
<span class="absolute -bottom-1 -right-1 flex h-4 w-4">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span class="relative inline-flex rounded-full h-4 w-4 bg-primary text-on-primary font-formula-sm text-[9px] items-center justify-center font-bold">7</span>
</span>
</div>
<div class="space-y-0.5">
<div class="flex flex-wrap items-center gap-space-xs">
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">Aeloria Silvervein</h1>
<span class="bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm px-2 py-0.5 rounded uppercase">High Elf</span>
<span class="bg-surface-container-high text-primary font-formula-sm text-formula-sm px-2 py-0.5 rounded font-semibold">Wizard (Bladesinger 2024)</span>
<span class="bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm px-2 py-0.5 rounded">Sage • Neutral Good</span>
</div>
<div class="flex items-center gap-space-md text-on-surface-variant font-body-sm text-body-sm">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-primary">military_tech</span> Prof Bonus: <strong class="text-on-surface font-stat-modifier text-stat-modifier">+3</strong></span>
<span class="text-outline-variant">•</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-secondary">visibility</span> Darkvision: <strong>60 ft</strong></span>
<span class="text-outline-variant">•</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-primary">auto_fix_high</span> Spell Save DC: <strong class="text-primary font-stat-modifier text-stat-modifier">15</strong></span>
<span class="text-outline-variant">•</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-secondary">bolt</span> Spell Atk: <strong class="text-secondary font-stat-modifier text-stat-modifier">+7</strong></span>
</div>
</div>
</div>
<!-- Inspiration & Concentration Indicators -->
<div class="flex flex-wrap items-center gap-space-sm self-stretch xl:self-auto justify-between xl:justify-end">
<button class="flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-container-highest px-3 py-1.5 rounded-xl transition-all shadow-sm group" id="inspiration-badge" onclick="toggleInspiration(this)">
<span class="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">star</span>
<div class="text-left leading-tight">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block">Inspiration</span>
<span class="font-formula-sm text-formula-sm text-primary font-semibold block" id="inspiration-state">Ready (+ Advantage)</span>
</div>
</button>
<div class="flex items-center gap-space-xs bg-surface-container-lowest px-3 py-1.5 rounded-xl border border-primary/20 shadow-inner">
<span class="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
<div class="leading-tight">
<span class="font-label-caps text-label-caps text-secondary uppercase block">Active Concentration</span>
<span class="font-body-sm text-body-sm text-on-surface font-medium block">Haste (+2 AC, Extra Dash/Atk)</span>
</div>
<button class="text-on-surface-variant hover:text-error transition-colors ml-1" title="Break Concentration">
<span class="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
</div>
</div>
<!-- Rapid Combat Vitals Bar -->
<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-space-sm pt-space-md items-center">
<!-- Hit Points Meter Block -->
<div class="col-span-2 bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-error text-[18px]">favorite</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Hit Points</span>
</div>
<div class="flex items-center gap-1 font-stat-numeric text-stat-numeric">
<span class="text-on-surface" id="hp-current">48</span>
<span class="text-outline font-body-sm text-body-sm">/ 48</span>
<span class="font-formula-sm text-formula-sm text-primary-fixed ml-1">(+0 Temp)</span>
</div>
</div>
<!-- Health Bar Visualization -->
<div class="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden my-2">
<div class="bg-gradient-to-r from-primary-container to-secondary-container h-full transition-all duration-300" id="hp-progress-bar" style="width: 100%;"></div>
</div>
<div class="flex items-center justify-between gap-1 pt-0.5">
<div class="flex items-center gap-1">
<button class="font-formula-sm text-formula-sm bg-surface-container-high hover:bg-error/30 hover:text-error text-on-surface px-2 py-0.5 rounded transition" onclick="adjustHP(-5)">-5</button>
<button class="font-formula-sm text-formula-sm bg-surface-container-high hover:bg-error/30 hover:text-error text-on-surface px-2 py-0.5 rounded transition" onclick="adjustHP(-1)">-1</button>
<button class="font-formula-sm text-formula-sm bg-surface-container-high hover:bg-secondary/30 hover:text-secondary text-on-surface px-2 py-0.5 rounded transition" onclick="adjustHP(1)">+1</button>
<button class="font-formula-sm text-formula-sm bg-surface-container-high hover:bg-secondary/30 hover:text-secondary text-on-surface px-2 py-0.5 rounded transition" onclick="adjustHP(5)">+5</button>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Max: 48</span>
</div>
</div>
<!-- Armor Class with Bladesong Switch -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Armor Class</span>
<span class="material-symbols-outlined text-secondary text-[18px]">shield</span>
</div>
<div class="flex items-baseline gap-1 my-0.5">
<span class="font-stat-numeric text-stat-numeric text-secondary font-bold" id="ac-display">22</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(16 base + 4 song + 2 haste)</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant pt-1 border-t border-surface-container-highest/40">
<span class="font-formula-sm text-formula-sm">Bladesong</span>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" id="bladesong-toggle" onchange="toggleBladesongMechanics(this)" type="checkbox">
<div class="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
</div>
<!-- Initiative & Speed -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Initiative</span>
<span class="material-symbols-outlined text-primary text-[18px]">bolt</span>
</div>
<div class="flex items-center justify-between my-0.5">
<span class="font-stat-numeric text-stat-numeric text-primary font-bold">+3</span>
<div class="text-right">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block">Speed</span>
<span class="font-formula-sm text-formula-sm text-on-surface font-semibold" id="speed-display">40 ft <span class="text-primary">(+10)</span></span>
</div>
</div>
<div class="flex items-center gap-1 text-on-surface-variant pt-1 border-t border-surface-container-highest/40 font-formula-sm text-formula-sm">
<span class="material-symbols-outlined text-[14px] text-primary">offline_bolt</span>
<span class="">Advantage on Init</span>
</div>
</div>
<!-- Hit Dice & Rest -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Hit Dice</span>
<span class="font-formula-sm text-formula-sm text-outline">d6 Wizard</span>
</div>
<div class="my-0.5 flex items-baseline gap-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface">5</span>
<span class="text-outline font-body-sm text-body-sm">/ 7 d6</span>
</div>
<div class="flex items-center gap-1 pt-1 border-t border-surface-container-highest/40 font-formula-sm text-formula-sm">
<button class="hover:text-primary transition-colors" onclick="logRoll('Short Rest Triggered: Spend d6 HD')">Short Rest</button>
<span class="text-outline-variant">•</span>
<button class="hover:text-primary transition-colors" onclick="logRoll('Long Rest: All resources reset')">Long Rest</button>
</div>
</div>
<!-- Passive Senses -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Passives</span>
<span class="material-symbols-outlined text-outline text-[18px]">psychology</span>
</div>
<div class="space-y-0.5 my-0.5 font-formula-sm text-formula-sm">
<div class="flex justify-between"><span class="text-on-surface-variant">Perception:</span> <strong class="text-on-surface">15</strong></div>
<div class="flex justify-between"><span class="text-on-surface-variant">Investigation:</span> <strong class="text-primary">18</strong></div>
</div>
<div class="text-on-surface-variant pt-1 border-t border-surface-container-highest/40 font-formula-sm text-formula-sm truncate">
          Insight: 11 • Adv vs Charm
        </div>
</div>
<!-- Defense Profile -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Defenses</span>
<span class="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
</div>
<div class="space-y-0.5 my-0.5 font-formula-sm text-formula-sm">
<div class="text-secondary font-medium">Immune: Sleep Magic</div>
<div class="text-on-surface-variant truncate">Adv: Charmed Saves</div>
</div>
<div class="text-on-surface-variant pt-1 border-t border-surface-container-highest/40 font-formula-sm text-formula-sm">
          Shield Spell: +5 AC (Reac)
        </div>
</div>
</div>
</section>
<!-- Dual-Column Master Workspace -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- LEFT COLUMN (38% on Desktop): Attributes, Saves, Proficiencies, Arcane Resources -->
<div class="lg:col-span-5 flex flex-col gap-space-lg">
<!-- Six Core Ability Scores Grid -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[18px]">grid_view</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Ability Scores &amp; Saves</h2>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">2024 Core</span>
</div>
<div class="grid grid-cols-3 gap-space-xs">
<!-- INT (Primary) -->
<div class="bg-surface-container-high/80 rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container-high transition-colors">
<div class="absolute top-0 left-0 right-0 h-0.5 bg-primary"></div>
<span class="font-label-caps text-label-caps text-primary uppercase">INT</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-primary font-bold">+4</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">18</span>
</div>
<button class="bg-surface-container-lowest/80 hover:bg-primary-container hover:text-on-primary-container text-primary font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(7, 'Intelligence Save')">
<span class="material-symbols-outlined text-[12px]">star</span> Save +7
            </button>
</div>
<!-- DEX -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">DEX</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold">+3</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">16</span>
</div>
<button class="bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(3, 'Dexterity Save')">
              Save +3
            </button>
</div>
<!-- CON -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors relative">
<div class="absolute top-0 right-0 w-2 h-2 rounded-full bg-secondary-container" title="Bladesong adds +4 INT to concentration"></div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">CON</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold">+2</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">14</span>
</div>
<button class="bg-surface-container-lowest hover:bg-secondary-container hover:text-on-secondary-fixed text-secondary font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(6, 'Constitution (Concentration) Save [Advantage: War Caster]')" title="Concentration: +6 with Bladesong">
              Save +2 <span class="text-[10px] text-primary">(+6*)</span>
</button>
</div>
<!-- WIS -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">WIS</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold">+1</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">12</span>
</div>
<button class="bg-surface-container-lowest/80 hover:bg-primary-container hover:text-on-primary-container text-primary font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(4, 'Wisdom Save')">
<span class="material-symbols-outlined text-[12px]">star</span> Save +4
            </button>
</div>
<!-- CHA -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">CHA</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold">+0</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">10</span>
</div>
<button class="bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(0, 'Charisma Save')">
              Save +0
            </button>
</div>
<!-- STR -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">STR</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface-variant font-bold">-1</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">8</span>
</div>
<button class="bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(-1, 'Strength Save')">
              Save -1
            </button>
</div>
</div>
</section>
<!-- Arcane Resource Trackers (Bladesong & Spell Slots Matrix) -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md space-y-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[18px]">diamond</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Resource Wells &amp; Slots</h2>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Short/Long Rest Tracks</span>
</div>
<!-- Bladesong Uses -->
<div class="bg-surface-container rounded-xl p-space-sm flex items-center justify-between">
<div>
<div class="flex items-center gap-1.5">
<span class="font-body-md text-body-md font-semibold text-primary">Bladesong Invocations</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(3 / Long Rest)</span>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block">10 Rounds • +4 AC • +10 ft • Adv Acrobatics • +4 Conc</span>
</div>
<!-- 3 Gem Pips -->
<div class="flex items-center gap-1.5">
<button class="w-6 h-6 rotate-45 bg-primary-container text-on-primary-container flex items-center justify-center rounded-sm transition-transform hover:scale-110 shadow-sm" onclick="toggleResource(this)" title="Expended / Available"></button>
<button class="w-6 h-6 rotate-45 bg-primary-container text-on-primary-container flex items-center justify-center rounded-sm transition-transform hover:scale-110 shadow-sm" onclick="toggleResource(this)" title="Expended / Available"></button>
<button class="w-6 h-6 rotate-45 bg-primary-container text-on-primary-container flex items-center justify-center rounded-sm transition-transform hover:scale-110 shadow-sm" onclick="toggleResource(this)" title="Expended / Available"></button>
</div>
</div>
<!-- Arcane Recovery -->
<div class="bg-surface-container rounded-xl p-space-sm flex items-center justify-between">
<div>
<span class="font-body-md text-body-md font-semibold text-on-surface block">Arcane Recovery (1/Day)</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Regain up to 4 combined spell levels during short rest</span>
</div>
<button class="bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-formula-sm text-formula-sm px-2.5 py-1 rounded transition" id="recovery-btn" onclick="toggleRecovery(this)">
            Available (4 Lvls)
          </button>
</div>
<!-- Spell Slot Matrix (2024 Rules, Level 7 Wizard: 4/3/3/1) -->
<div class="space-y-space-xs pt-1">
<div class="flex items-center justify-between text-on-surface-variant px-1 font-label-caps text-label-caps uppercase">
<span class="">Spell Rank</span>
<span class="">Slots Available (Click to Cast/Expend)</span>
</div>
<!-- 1st Level (4) -->
<div class="bg-surface-container rounded-lg p-space-xs flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-5 h-5 rounded bg-surface-container-high text-on-surface font-formula-sm text-formula-sm flex items-center justify-center font-bold">1</span>
<span class="font-body-sm text-body-sm text-on-surface">1st Level</span>
</div>
<div class="flex items-center gap-2">
<button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 1"></button>
<button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 2"></button>
<button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 3"></button>
<button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 4"></button>
<span class="font-formula-sm text-formula-sm text-on-surface-variant ml-1 slot-count">4/4</span>
</div>
</div>
<!-- 2nd Level (3) -->
<div class="bg-surface-container rounded-lg p-space-xs flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-5 h-5 rounded bg-surface-container-high text-on-surface font-formula-sm text-formula-sm flex items-center justify-center font-bold">2</span>
<span class="font-body-sm text-body-sm text-on-surface">2nd Level</span>
</div>
<div class="flex items-center gap-2">
<button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button>
<button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button>
<button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button>
<span class="font-formula-sm text-formula-sm text-on-surface-variant ml-1 slot-count">3/3</span>
</div>
</div>
<!-- 3rd Level (3 - 1 used) -->
<div class="bg-surface-container rounded-lg p-space-xs flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-5 h-5 rounded bg-surface-container-high text-primary font-formula-sm text-formula-sm flex items-center justify-center font-bold">3</span>
<span class="font-body-sm text-body-sm text-on-surface">3rd Level</span>
</div>
<div class="flex items-center gap-2">
<button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button>
<button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button>
<!-- Expended Slot -->
<button class="w-4 h-4 rotate-45 bg-surface-container-highest opacity-40 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Expended Slot"></button>
<span class="font-formula-sm text-formula-sm text-on-surface-variant ml-1 slot-count">2/3</span>
</div>
</div>
<!-- 4th Level (1) -->
<div class="bg-surface-container rounded-lg p-space-xs flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-5 h-5 rounded bg-surface-container-high text-primary-fixed font-formula-sm text-formula-sm flex items-center justify-center font-bold">4</span>
<span class="font-body-sm text-body-sm text-on-surface font-semibold">4th Level</span>
</div>
<div class="flex items-center gap-2">
<button class="w-4 h-4 rotate-45 bg-primary-container hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 1"></button>
<span class="font-formula-sm text-formula-sm text-on-surface-variant ml-1 slot-count">1/1</span>
</div>
</div>
</div>
</section>
<!-- Skills & Proficiencies Breakdown -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-outline text-[18px]">checklist</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Skills &amp; Expertises</h2>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Sorted by Modifier</span>
</div>
<div class="space-y-1">
<!-- Arcana -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Proficient"></span>
<span class="font-body-sm text-body-sm font-semibold text-on-surface">Arcana</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(INT)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-primary hover:underline" onclick="rollD20(7, 'Arcana Check')">+7</button>
</div>
<!-- History -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Proficient"></span>
<span class="font-body-sm text-body-sm text-on-surface">History</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(INT)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-primary hover:underline" onclick="rollD20(7, 'History Check')">+7</button>
</div>
<!-- Investigation -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Proficient"></span>
<span class="font-body-sm text-body-sm text-on-surface">Investigation</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(INT)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-primary hover:underline" onclick="rollD20(7, 'Investigation Check')">+7</button>
</div>
<!-- Acrobatics -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Proficient"></span>
<span class="font-body-sm text-body-sm font-semibold text-secondary">Acrobatics</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(DEX • Adv in Song)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-secondary hover:underline" onclick="rollD20(6, 'Acrobatics Check (Advantage Bladesong)')">+6</button>
</div>
<!-- Perception -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Keen Senses"></span>
<span class="font-body-sm text-body-sm text-on-surface">Perception</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(WIS)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-on-surface hover:underline" onclick="rollD20(4, 'Perception Check')">+4</button>
</div>
<!-- Religion -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-surface-container-highest"></span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Religion</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(INT)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-on-surface hover:underline" onclick="rollD20(4, 'Religion Check')">+4</button>
</div>
<!-- Stealth -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-surface-container-highest"></span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Stealth</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(DEX)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-on-surface hover:underline" onclick="rollD20(3, 'Stealth Check')">+3</button>
</div>
</div>
</section>
<!-- High Elf & Bladesinger Passives -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md space-y-space-sm">
<h2 class="font-headline-sm text-headline-sm text-on-surface flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[18px]">spa</span>
          Species Traits &amp; Ancestry
        </h2>
<div class="grid grid-cols-1 gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div class="bg-surface-container p-space-xs rounded-lg">
<strong class="text-on-surface">Fey Ancestry:</strong> Advantage on saves to avoid or end the Charmed condition. Magic cannot put you to sleep.
          </div>
<div class="bg-surface-container p-space-xs rounded-lg">
<strong class="text-on-surface">Trance:</strong> Don't need sleep; finish a Long Rest in 4 hours of meditative trance while remaining conscious.
          </div>
<div class="bg-surface-container p-space-xs rounded-lg">
<strong class="text-on-surface">Training in War &amp; Song:</strong> Light armor proficiency, simple weapon proficiencies + Rapier mastery. Performance proficiency added.
          </div>
</div>
</section>
</div>
<!-- RIGHT COLUMN (62% on Desktop): Combat Arsenal, Action Economy & Grimoire -->
<div class="lg:col-span-7 flex flex-col gap-space-lg">
<!-- Action Filter Navigation Header -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md">
<div class="flex flex-wrap items-center justify-between gap-space-xs mb-space-md">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[20px]">sports_martial_arts</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Tactical Action Economy</h2>
</div>
<!-- Category Filter Chips -->
<div class="flex flex-wrap gap-1" id="filter-container">
<button class="bg-primary-container text-on-primary-container font-label-caps text-label-caps px-2.5 py-1 rounded font-bold uppercase transition" onclick="filterCombat('all', this)">All</button>
<button class="bg-surface-container-high hover:bg-primary-container/20 text-primary font-label-caps text-label-caps px-2.5 py-1 rounded uppercase transition" onclick="filterCombat('action', this)">Actions</button>
<button class="bg-surface-container-high hover:bg-secondary-container/20 text-secondary font-label-caps text-label-caps px-2.5 py-1 rounded uppercase transition" onclick="filterCombat('bonus', this)">Bonus Actions</button>
<button class="bg-surface-container-high hover:bg-error-container/20 text-error font-label-caps text-label-caps px-2.5 py-1 rounded uppercase transition" onclick="filterCombat('reaction', this)">Reactions</button>
<button class="bg-surface-container-high hover:bg-primary/20 text-on-surface font-label-caps text-label-caps px-2.5 py-1 rounded uppercase transition" onclick="filterCombat('spell', this)">Grimoire</button>
</div>
</div>
<!-- 2024 Bladesinger Extra Attack Special Banner -->
<div class="bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high p-space-sm rounded-xl mb-space-md shadow-inner flex items-start gap-space-sm border-l-2 border-primary">
<span class="material-symbols-outlined text-primary text-[22px] flex-shrink-0 mt-0.5">auto_mode</span>
<div>
<div class="flex items-center gap-2">
<span class="font-body-md text-body-md font-bold text-primary">Bladesinger Extra Attack (2024 Rule)</span>
<span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.2 rounded">Level 6 Feature</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              When taking the Attack action, you attack twice. You can replace one attack with any wizard cantrip that has a casting time of 1 action (e.g., <em>Booming Blade</em> or <em>Ray of Frost</em>).
            </p>
</div>
</div>
<!-- Martial Weapon Strikes (Moonblade +1) -->
<div class="space-y-space-sm" id="combat-items-container"><!-- Item 1: Moonblade Strike -->
<div class="combat-item action bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm">
<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-primary">
<span class="material-symbols-outlined text-[22px]">swords</span>
</div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-body-lg text-body-lg font-bold text-on-surface">Moonblade (+1 Rapier)</h3>
<span class="bg-surface-container-highest text-primary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase">Action / Attack</span>
<span class="font-formula-sm text-formula-sm text-outline">Finesse • Silvered</span>
</div>
<div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">
<span class="">Reach: 5 ft</span>
<span class="">•</span>
<span class="text-secondary">Hit Bonus: <strong>+7</strong></span>
<span class="">•</span>
<span class="">Base Dmg: <strong>1d8 + 4</strong> Piercing</span>
</div>
</div>
</div>
<div class="flex items-center gap-1.5 self-end sm:self-auto">
<button class="bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="rollAttack('Moonblade Strike', 7, '1d8+4', 'Piercing')">
<span class="material-symbols-outlined text-[14px]">casino</span> Atk +7
</button>
<button class="bg-surface-container-highest hover:bg-surface-bright text-on-surface px-2.5 py-1.5 rounded-lg font-formula-sm text-formula-sm transition" onclick="rollDamage('Moonblade Dmg', '1d8+4', 'Piercing')">
1d8+4
</button>
<button class="bg-secondary-container/20 hover:bg-secondary-container hover:text-on-secondary-fixed text-secondary px-2.5 py-1.5 rounded-lg font-formula-sm text-formula-sm transition" onclick="triggerBoomingBladeRider()" title="Add 1d8 Thunder damage">
+1d8 Booming
</button>
</div>
</div>
</div>

<!-- Item 2: Booming Blade Cantrip Action -->
<div class="combat-item action spell bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm cursor-pointer group" onclick="openSpellModal('booming-blade')">
<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-secondary">
<span class="material-symbols-outlined text-[22px]">volume_up</span>
</div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">Booming Blade <span class="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">info</span></h3><button class="text-on-surface-variant hover:text-primary transition-colors p-0.5" onclick="openSpellModal('booming-blade')" title="Inspect in Grimoire"><span class="material-symbols-outlined text-[16px]">menu_book</span></button>
<span class="bg-surface-container-highest text-primary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase">Action</span>
<span class="bg-secondary-container/20 text-secondary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase">Evocation</span>
</div>
<div class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">
Range: 5 ft • Melee Weapon Attack • <strong>+1d8 Thunder</strong> on hit; <strong>2d8 Thunder</strong> if target moves
</div>
</div>
</div>
<div class="flex items-center gap-1.5 self-end sm:self-auto" onclick="event.stopPropagation()">
<button class="bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="rollAttack('Booming Blade Strike', 7, '1d8+4', 'Piercing + 1d8 Thunder')">
Weave Attack
</button>
<button class="p-1.5 rounded-lg bg-surface-container-highest text-outline hover:text-primary hover:bg-surface-bright transition" onclick="openSpellModal('booming-blade')" title="Inspect Spell Details">
<span class="material-symbols-outlined text-[18px]">menu_book</span>
</button>
</div>
</div>
</div>

<!-- Item 3: Ray of Frost -->
<div class="combat-item action spell bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm cursor-pointer group" onclick="openSpellModal('ray-of-frost')">
<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-secondary">
<span class="material-symbols-outlined text-[22px]">ac_unit</span>
</div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">Ray of Frost <span class="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">info</span></h3><button class="text-on-surface-variant hover:text-primary transition-colors p-0.5" onclick="openSpellModal('ray-of-frost')" title="Inspect in Grimoire"><span class="material-symbols-outlined text-[16px]">menu_book</span></button>
<span class="bg-surface-container-highest text-primary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase">Action / Weave</span>
<span class="font-formula-sm text-formula-sm text-outline">Cantrip (Lv.7 = 2d8)</span>
</div>
<div class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">
Range: 60 ft • Ranged Spell Attack <strong>+7</strong> • <strong>2d8 Cold</strong> • Target speed reduced by 10 ft
</div>
</div>
</div>
<div class="flex items-center gap-1.5 self-end sm:self-auto" onclick="event.stopPropagation()">
<button class="bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="rollAttack('Ray of Frost', 7, '2d8', 'Cold (-10 ft speed)')">
Cast +7
</button>
<button class="bg-surface-container-highest hover:bg-surface-bright text-on-surface px-2.5 py-1.5 rounded-lg font-formula-sm text-formula-sm transition" onclick="rollDamage('Ray of Frost Dmg', '2d8', 'Cold')">
2d8 Dmg
</button>
<button class="p-1.5 rounded-lg bg-surface-container-highest text-outline hover:text-primary hover:bg-surface-bright transition" onclick="openSpellModal('ray-of-frost')" title="Inspect Spell Details">
<span class="material-symbols-outlined text-[18px]">menu_book</span>
</button>
</div>
</div>
</div>

<!-- Item 4: Shield Spell (Reaction) -->
<div class="combat-item reaction spell bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-error cursor-pointer group" onclick="openSpellModal('shield')">
<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-error-container/20 flex items-center justify-center flex-shrink-0 text-error">
<span class="material-symbols-outlined text-[22px]">security</span>
</div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">Shield <span class="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">info</span></h3><button class="text-on-surface-variant hover:text-primary transition-colors p-0.5" onclick="openSpellModal('shield')" title="Inspect in Grimoire"><span class="material-symbols-outlined text-[16px]">menu_book</span></button>
<span class="bg-error-container/30 text-error font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase">Reaction</span>
<span class="font-formula-sm text-formula-sm text-primary">1st Level Abjuration</span>
</div>
<div class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">
Trigger: Hit by an attack or targeted by Magic Missile • <strong>+5 AC</strong> until start of next turn
</div>
</div>
</div>
<div class="flex items-center gap-1.5 self-end sm:self-auto" onclick="event.stopPropagation()">
<button class="bg-error-container/30 hover:bg-error hover:text-on-error text-error px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="castShield()">
<span class="material-symbols-outlined text-[14px]">shield</span> Trigger Shield (-1 Slot)
</button>
<button class="p-1.5 rounded-lg bg-surface-container-highest text-outline hover:text-primary hover:bg-surface-bright transition" onclick="openSpellModal('shield')" title="Inspect Spell Details">
<span class="material-symbols-outlined text-[18px]">menu_book</span>
</button>
</div>
</div>
</div>

<!-- Item 5: Misty Step (Bonus Action) -->
<div class="combat-item bonus spell bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-secondary cursor-pointer group" onclick="openSpellModal('misty-step')">
<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center flex-shrink-0 text-secondary">
<span class="material-symbols-outlined text-[22px]">qr_code_2</span>
</div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">Misty Step <span class="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">info</span></h3><button class="text-on-surface-variant hover:text-primary transition-colors p-0.5" onclick="openSpellModal('misty-step')" title="Inspect in Grimoire"><span class="material-symbols-outlined text-[16px]">menu_book</span></button>
<span class="bg-secondary-container/30 text-secondary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase">Bonus Action</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">2nd Level Conjuration</span>
</div>
<div class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">
Range: Self • Teleport up to <strong>30 feet</strong> to an unoccupied space you can see • Verbal only
</div>
</div>
</div>
<div class="flex items-center gap-1.5 self-end sm:self-auto" onclick="event.stopPropagation()">
<button class="bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="logRoll('Misty Step Cast: Teleport 30ft (-1 Lv.2 Slot)')">
Teleport (-1 Slot)
</button>
<button class="p-1.5 rounded-lg bg-surface-container-highest text-outline hover:text-primary hover:bg-surface-bright transition" onclick="openSpellModal('misty-step')" title="Inspect Spell Details">
<span class="material-symbols-outlined text-[18px]">menu_book</span>
</button>
</div>
</div>
</div>

<!-- Item 6: Fireball (3rd Level Spell) -->
<div class="combat-item action spell bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm cursor-pointer group" onclick="openSpellModal('fireball')">
<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-primary">
<span class="material-symbols-outlined text-[22px]">local_fire_department</span>
</div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">Fireball <span class="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">info</span></h3><button class="text-on-surface-variant hover:text-primary transition-colors p-0.5" onclick="openSpellModal('fireball')" title="Inspect in Grimoire"><span class="material-symbols-outlined text-[16px]">menu_book</span></button>
<span class="bg-surface-container-highest text-primary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase">Action</span>
<span class="font-formula-sm text-formula-sm text-primary">3rd Level Evocation</span>
</div>
<div class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">
Range: 150 ft • 20-ft radius sphere • <strong>DEX Save DC 15</strong> • <strong>8d6 Fire damage</strong> (half on save)
</div>
</div>
</div>
<div class="flex items-center gap-1.5 self-end sm:self-auto" onclick="event.stopPropagation()">
<button class="bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="rollDamage('Fireball Burst', '8d6', 'Fire (DC 15 Dex Half)')">
Cast 8d6 (-1 Lv.3)
</button>
<button class="p-1.5 rounded-lg bg-surface-container-highest text-outline hover:text-primary hover:bg-surface-bright transition" onclick="openSpellModal('fireball')" title="Inspect Spell Details">
<span class="material-symbols-outlined text-[18px]">menu_book</span>
</button>
</div>
</div>
</div>

<!-- Item 7: Counterspell (Reaction) -->
<div class="combat-item reaction spell bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-error cursor-pointer group" onclick="openSpellModal('counterspell')">
<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-error-container/20 flex items-center justify-center flex-shrink-0 text-error">
<span class="material-symbols-outlined text-[22px]">spellcheck</span>
</div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">Counterspell (2024 Rule) <span class="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">info</span></h3><button class="text-on-surface-variant hover:text-primary transition-colors p-0.5" onclick="openSpellModal('counterspell')" title="Inspect in Grimoire"><span class="material-symbols-outlined text-[16px]">menu_book</span></button>
<span class="bg-error-container/30 text-error font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase">Reaction</span>
<span class="font-formula-sm text-formula-sm text-primary">3rd Level Abjuration</span>
</div>
<div class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">
Range: 60 ft • Target casting a spell must succeed on a <strong>CON Save vs DC 15</strong> or spell is interrupted
</div>
</div>
</div>
<div class="flex items-center gap-1.5 self-end sm:self-auto" onclick="event.stopPropagation()">
<button class="bg-error-container/30 hover:bg-error hover:text-on-error text-error px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="logRoll('Counterspell Cast: Target DC 15 CON Save (-1 Lv.3 Slot)')">
Intervene (-1 Slot)
</button>
<button class="p-1.5 rounded-lg bg-surface-container-highest text-outline hover:text-primary hover:bg-surface-bright transition" onclick="openSpellModal('counterspell')" title="Inspect Spell Details">
<span class="material-symbols-outlined text-[18px]">menu_book</span>
</button>
</div>
</div>
</div></div>
</section>
<!-- Combat Feats & Class Masteries Card -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md space-y-space-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[18px]">workspace_premium</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Feats &amp; Arcane Masteries</h2>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Active Augments</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm font-body-sm text-body-sm">
<!-- War Caster -->
<div class="bg-surface-container p-space-sm rounded-xl space-y-1">
<div class="flex items-center justify-between">
<span class="font-body-md text-body-md font-bold text-primary">War Caster (Feat)</span>
<span class="material-symbols-outlined text-primary text-[18px]">verified</span>
</div>
<ul class="text-on-surface-variant space-y-1 list-disc list-inside">
<li class=""><strong>Advantage on CON Saves</strong> made to maintain concentration on a spell when taking damage.</li>
<li class="">Perform somatic components with weapons/shield in hand.</li>
<li class="">Cast single-target spell as an <strong>Opportunity Attack Reaction</strong>.</li>
</ul>
</div>
<!-- Bladesong Masteries -->
<div class="bg-surface-container p-space-sm rounded-xl space-y-1">
<div class="flex items-center justify-between">
<span class="font-body-md text-body-md font-bold text-secondary">Bladesong Mastery</span>
<span class="material-symbols-outlined text-secondary text-[18px]">auto_stories</span>
</div>
<ul class="text-on-surface-variant space-y-1 list-disc list-inside">
<li class=""><strong>+4 AC</strong> equal to Intelligence modifier while active.</li>
<li class="">Walking speed increases by <strong>10 feet</strong>.</li>
<li class="">Advantage on <strong>Acrobatics (Dexterity)</strong> checks.</li>
<li class="">Bonus to Concentration checks equal to INT (+4).</li>
</ul>
</div>
</div>
</section>
<!-- Live Runic Dice Roller Console Drawer -->
<section class="bg-surface-container-lowest rounded-xl p-space-md shadow-xl border border-surface-container-highest">
<div class="flex items-center justify-between border-b border-surface-container-highest/60 pb-space-xs mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[18px]">casino</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Runic Dice Roller Feed</h3>
</div>
<div class="flex items-center gap-1">
<button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm px-2 py-0.5 rounded" onclick="rollD20(0, 'Raw d20 Roll')">d20</button>
<button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm px-2 py-0.5 rounded" onclick="rollCustom(8, 'Raw d8 Roll')">d8</button>
<button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm px-2 py-0.5 rounded" onclick="rollCustom(6, 'Raw d6 Roll')">d6</button>
<button class="text-on-surface-variant hover:text-error font-formula-sm text-formula-sm ml-2" onclick="clearRollLog()">Clear</button>
</div>
</div>
<!-- Dynamic Roll History Console Log -->
<div class="space-y-1.5 max-h-36 overflow-y-auto pr-1 font-formula-sm text-formula-sm" id="roll-history">
<div class="flex items-center justify-between text-on-surface-variant bg-surface-container/50 px-2 py-1 rounded">
<span class="">[Log Ready] Character sheet initialized. All dice triggers active.</span>
<span class="text-outline">Ready</span>
</div>
</div>
</section>
</div>
</div>
</div>
<script>
  let currentHP = 48;
  const maxHP = 48;
  let isBladesong = true;
  let inspirationActive = true;

  function adjustHP(amount) {
    currentHP = Math.max(0, Math.min(maxHP, currentHP + amount));
    const hpDisplay = document.getElementById('hp-current');
    const hpProgressBar = document.getElementById('hp-progress-bar');
    
    if (hpDisplay) hpDisplay.innerText = currentHP;
    if (hpProgressBar) {
      const percentage = (currentHP / maxHP) * 100;
      hpProgressBar.style.width = percentage + '%';
      if (percentage <= 25) {
        hpProgressBar.className = 'bg-error h-full transition-all duration-300';
      } else if (percentage <= 50) {
        hpProgressBar.className = 'bg-primary h-full transition-all duration-300';
      } else {
        hpProgressBar.className = 'bg-gradient-to-r from-primary-container to-secondary-container h-full transition-all duration-300';
      }
    }
    logRoll(`HP Adjusted by ${amount > 0 ? '+' + amount : amount} (Current: ${currentHP}/${maxHP})`);
  }

  function toggleBladesongMechanics(checkbox) {
    isBladesong = checkbox.checked;
    const acDisplay = document.getElementById('ac-display');
    const speedDisplay = document.getElementById('speed-display');

    if (isBladesong) {
      if (acDisplay) acDisplay.innerText = '22';
      if (speedDisplay) speedDisplay.innerHTML = '40 ft <span class="text-primary">(+10)</span>';
      logRoll('Bladesong Activated: AC +4, Speed +10ft, Conc +4');
    } else {
      if (acDisplay) acDisplay.innerText = '18';
      if (speedDisplay) speedDisplay.innerHTML = '30 ft <span class="text-outline">(Base)</span>';
      logRoll('Bladesong Expired / Dismissed');
    }
  }

  function toggleInspiration(btn) {
    inspirationActive = !inspirationActive;
    const textSpan = document.getElementById('inspiration-state');
    if (inspirationActive) {
      if (textSpan) textSpan.innerText = 'Ready (+ Advantage)';
      btn.className = 'flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-container-highest px-3 py-1.5 rounded-xl transition-all shadow-sm group';
      logRoll('Inspiration Restored');
    } else {
      if (textSpan) textSpan.innerText = 'Expended';
      btn.className = 'flex items-center gap-space-xs bg-surface-container/40 hover:bg-surface-container px-3 py-1.5 rounded-xl transition-all shadow-sm opacity-60';
      logRoll('Inspiration Expended for Advantage roll');
    }
  }

  function toggleResource(gem) {
    if (gem.classList.contains('bg-primary-container')) {
      gem.classList.remove('bg-primary-container', 'shadow-sm');
      gem.classList.add('bg-surface-container-highest', 'opacity-30');
      logRoll('Expended 1 Bladesong charge');
    } else {
      gem.classList.remove('bg-surface-container-highest', 'opacity-30');
      gem.classList.add('bg-primary-container', 'shadow-sm');
      logRoll('Restored 1 Bladesong charge');
    }
  }

  function toggleRecovery(btn) {
    if (btn.classList.contains('bg-surface-container-high')) {
      btn.classList.remove('bg-surface-container-high', 'text-primary');
      btn.classList.add('bg-surface-container-highest', 'text-outline', 'opacity-50');
      btn.innerText = 'Used (Long Rest)';
      logRoll('Arcane Recovery triggered: Regained spell slots');
    } else {
      btn.classList.add('bg-surface-container-high', 'text-primary');
      btn.classList.remove('bg-surface-container-highest', 'text-outline', 'opacity-50');
      btn.innerText = 'Available (4 Lvls)';
      logRoll('Arcane Recovery ready');
    }
  }

  function toggleSlot(slot) {
    if (slot.classList.contains('opacity-40')) {
      slot.classList.remove('opacity-40', 'bg-surface-container-highest');
      slot.classList.add('bg-secondary');
      logRoll('Spell slot regained');
    } else {
      slot.classList.remove('bg-secondary');
      slot.classList.add('opacity-40', 'bg-surface-container-highest');
      logRoll('Spell slot expended');
    }
  }

  function castShield() {
    logRoll('Shield Cast! AC temporarily becomes 27 (+5 AC until next turn) [-1 Slot]');
  }

  function triggerBoomingBladeRider() {
    const d8 = Math.floor(Math.random() * 8) + 1;
    logRoll(`Booming Blade Rider: rolled ${d8} Thunder damage on strike`);
  }

  function rollD20(modifier, label) {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + modifier;
    const critTag = d20 === 20 ? ' [NAT 20 CRITICAL!]' : d20 === 1 ? ' [NAT 1 CRITICAL FAIL]' : '';
    logRoll(`${label}: [${d20}] + ${modifier} = ${total}${critTag}`);
  }

  function rollAttack(name, mod, dmgNotation, dmgType) {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    const critTag = d20 === 20 ? ' (CRIT!)' : '';
    logRoll(`${name} To Hit: [${d20}] + ${mod} = ${total}${critTag} (Base Dmg: ${dmgNotation} ${dmgType})`);
  }

  function rollDamage(label, formula, type) {
    // Basic parser for d notation
    let total = 0;
    if (formula === '1d8+4') {
      const roll = Math.floor(Math.random() * 8) + 1;
      total = roll + 4;
      logRoll(`${label}: [${roll}] + 4 = ${total} ${type}`);
    } else if (formula === '2d8') {
      const r1 = Math.floor(Math.random() * 8) + 1;
      const r2 = Math.floor(Math.random() * 8) + 1;
      total = r1 + r2;
      logRoll(`${label}: [${r1} + ${r2}] = ${total} ${type}`);
    } else if (formula === '8d6') {
      let sum = 0;
      let rolls = [];
      for (let i = 0; i < 8; i++) {
        let r = Math.floor(Math.random() * 6) + 1;
        rolls.push(r);
        sum += r;
      }
      logRoll(`${label}: [${rolls.join('+')}] = ${sum} ${type}`);
    } else {
      logRoll(`${label}: ${formula} rolled`);
    }
  }

  function rollCustom(dieSides, label) {
    const roll = Math.floor(Math.random() * dieSides) + 1;
    logRoll(`${label}: rolled [${roll}] on d${dieSides}`);
  }

  function logRoll(text) {
    const history = document.getElementById('roll-history');
    if (!history) return;
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between text-on-surface bg-surface-container px-2 py-1 rounded border-l-2 border-primary animate-fadeIn';
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    row.innerHTML = `<span>${text}</span><span class="text-outline font-formula-sm text-[10px] ml-2">${timeStr}</span>`;
    history.prepend(row);
  }

  function clearRollLog() {
    const history = document.getElementById('roll-history');
    if (history) {
      history.innerHTML = '<div class="text-outline-variant italic px-2 py-1">Log cleared. Ready for next action.</div>';
    }
  }

  function filterCombat(type, btn) {
    // Update button states
    const container = document.getElementById('filter-container');
    if (container) {
      Array.from(container.children).forEach(b => {
        b.className = 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps px-2.5 py-1 rounded uppercase transition';
      });
      btn.className = 'bg-primary-container text-on-primary-container font-label-caps text-label-caps px-2.5 py-1 rounded font-bold uppercase transition';
    }

    const items = document.querySelectorAll('.combat-item');
    items.forEach(item => {
      if (type === 'all') {
        item.style.display = 'block';
      } else {
        if (item.classList.contains(type)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      }
    });
  }
</script></main><footer class="fixed bottom-0 left-64 right-0 h-14 bg-surface-container-lowest/95 backdrop-blur-md z-20 flex items-center justify-between px-gutter shadow-[0_-1px_6px_rgba(0,0,0,0.3)]"><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-error text-[18px]">favorite</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">HP:</span><span class="font-stat-modifier text-stat-modifier text-on-surface">52</span><span class="font-formula-sm text-formula-sm text-outline">/ 52</span></div><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-secondary text-[18px]">shield</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">AC:</span><span class="font-stat-modifier text-stat-modifier text-secondary">17</span><span class="font-formula-sm text-formula-sm text-primary">[22 Bladesong]</span></div><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-primary text-[18px]">bolt</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Init:</span><span class="font-stat-modifier text-stat-modifier text-primary">+4</span></div><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-tertiary text-[18px]">speed</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Speed:</span><span class="font-stat-modifier text-stat-modifier text-on-surface">30 ft.</span></div><div class="hidden md:flex items-center gap-space-xs"><span class="material-symbols-outlined text-primary-container text-[18px]">hourglass_bottom</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Slots Lv.4:</span><span class="font-stat-modifier text-stat-modifier text-primary-fixed">1/1</span></div></div><div class="flex items-center gap-space-md"><div class="flex items-center gap-space-xs"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Bladesong:</span><span class="bg-surface-container-high text-primary font-formula-sm text-formula-sm px-2 py-0.5 rounded">Ready (3/3)</span></div><div class="flex items-center gap-space-xs"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Inspiration:</span><span class="w-3 h-3 rounded-full bg-primary-container shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span></div></div></footer></div>

<div id="spell-inspector-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-surface-container-lowest/80 backdrop-blur-md p-4 transition-all"><div class="relative w-full max-w-2xl bg-surface-container-low border border-primary/30 rounded-2xl shadow-[0_0_32px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col max-h-[90vh]"><div class="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div><div class="absolute -left-20 -bottom-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div><div class="relative z-10 px-6 py-4 border-b border-surface-container-highest/60 flex items-center justify-between bg-surface-container-lowest/60"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-surface-container-high border border-primary/20 flex items-center justify-center text-primary shadow-sm"><span id="modal-spell-icon" class="material-symbols-outlined text-[24px]">magic_button</span></div><div><div class="flex items-center gap-2"><h3 id="modal-spell-name" class="font-headline-sm text-headline-sm text-primary">Spell Name</h3><span id="modal-spell-school-pill" class="bg-surface-container-highest text-secondary font-label-caps text-label-caps px-2 py-0.5 rounded uppercase">School</span></div><p id="modal-spell-subheading" class="font-formula-sm text-formula-sm text-on-surface-variant">Level • Casting Details</p></div></div><button onclick="closeSpellModal()" class="text-on-surface-variant hover:text-error hover:bg-surface-container-high p-2 rounded-xl transition-colors"><span class="material-symbols-outlined text-[20px]">close</span></button></div><div class="relative z-10 p-6 overflow-y-auto space-y-5 font-body-sm text-body-sm"><div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-container rounded-xl p-3 border border-surface-container-highest/40"><div class="text-center"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Casting Time</span><span id="modal-casting-time" class="font-formula-sm text-formula-sm font-semibold text-on-surface">1 Action</span></div><div class="text-center border-l border-surface-container-highest/40"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Range / Area</span><span id="modal-range" class="font-formula-sm text-formula-sm font-semibold text-on-surface">60 ft</span></div><div class="text-center border-l border-surface-container-highest/40"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Components</span><span id="modal-components" class="font-formula-sm text-formula-sm font-semibold text-on-surface">V, S</span></div><div class="text-center border-l border-surface-container-highest/40"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Duration</span><span id="modal-duration" class="font-formula-sm text-formula-sm font-semibold text-on-surface">Instantaneous</span></div></div><div class="space-y-2"><div class="flex items-center gap-2 text-primary font-semibold"><span class="material-symbols-outlined text-[18px]">menu_book</span><span class="">Grimoire Inscription</span></div><p id="modal-description" class="text-on-surface bg-surface-container-lowest/80 p-4 rounded-xl border border-surface-container-highest/40 leading-relaxed font-body-sm"></p></div><div id="modal-higher-levels-container" class="space-y-1.5 hidden"><div class="flex items-center gap-2 text-secondary font-semibold"><span class="material-symbols-outlined text-[18px]">upgrade</span><span class="">At Higher Levels (2024 Upcast)</span></div><p id="modal-higher-levels-desc" class="text-on-surface-variant bg-surface-container p-3 rounded-lg font-formula-sm text-formula-sm"></p></div><div class="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-surface-container-highest/60"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">tune</span><span class="font-label-caps text-label-caps text-on-surface uppercase">Cast Rank</span></div><div class="flex items-center gap-2"><select id="modal-upcast-select" class="bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-lg px-3 py-1 font-formula-sm text-formula-sm focus:outline-none focus:border-primary"><option value="base">Base Level</option></select></div></div></div><div class="relative z-10 px-6 py-4 border-t border-surface-container-highest/60 bg-surface-container-lowest flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-2"><span class="font-formula-sm text-formula-sm text-on-surface-variant">Spellbook ID: <strong class="text-primary">#GRM-2024-5E</strong></span></div><div class="flex items-center gap-2"><button id="modal-roll-btn" onclick="modalCastCurrentSpell()" class="bg-primary-container hover:brightness-110 text-on-primary-container px-4 py-2 rounded-xl font-formula-sm text-formula-sm font-bold flex items-center gap-2 shadow-sm transition"><span class="material-symbols-outlined text-[18px]">casino</span><span class="">Cast &amp; Roll Effect</span></button><button onclick="closeSpellModal()" class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-xl font-formula-sm text-formula-sm transition">Dismiss</button></div></div></div></div></body></html>

<!-- Character Sheet - Experimental & Classic Modes -->
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/><meta content="mobile_tab" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{width:100vw;margin:0;padding:0;background-color:#0f131d;}body{overscroll-behavior:none;}.pb-safe{padding-bottom:env(safe-area-inset-bottom,0px);}.pt-safe{padding-top:env(safe-area-inset-top,0px);}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-tertiary-fixed-variant": "#2f3aa3", "primary-container": "#d4af37", "on-primary": "#3c2f00", "on-secondary-container": "#00374d", "surface-bright": "#353944", "surface": "#0f131d", "surface-container-high": "#262a34", "tertiary-container": "#a5adff", "background": "#0f131d", "surface-container": "#1b1f2a", "on-surface-variant": "#d0c5af", "outline": "#99907c", "outline-variant": "#4d4635", "secondary-container": "#00a6e0", "on-background": "#dfe2f0", "primary-fixed-dim": "#e9c349", "tertiary-fixed": "#e0e0ff", "on-primary-fixed": "#241a00", "primary": "#f2ca50", "on-primary-fixed-variant": "#574500", "tertiary": "#c7cbff", "surface-variant": "#313540", "on-tertiary-fixed": "#000767", "surface-container-lowest": "#0a0e18", "error-container": "#93000a", "on-primary-container": "#554300", "surface-dim": "#0f131d", "secondary-fixed-dim": "#7bd0ff", "surface-container-highest": "#313540", "primary-fixed": "#ffe088", "on-secondary-fixed": "#001e2c", "on-tertiary": "#131e8c", "on-error": "#690005", "tertiary-fixed-dim": "#bdc2ff", "on-tertiary-container": "#2d38a1", "inverse-surface": "#dfe2f0", "secondary-fixed": "#c4e7ff", "on-surface": "#dfe2f0", "on-error-container": "#ffdad6", "surface-container-low": "#171b26", "inverse-primary": "#735c00", "secondary": "#7bd0ff", "error": "#ffb4ab", "on-secondary": "#00354a", "surface-tint": "#e9c349", "on-secondary-fixed-variant": "#004c69", "inverse-on-surface": "#2c303b" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "space-sm": "0.5rem", "space-lg": "1.5rem", "gutter": "1.5rem", "space-xs": "0.25rem", "gutter-mobile": "0.75rem", "margin-mobile": "1rem", "space-md": "1rem", "space-xl": "2.5rem", "margin": "2rem" }, "fontFamily": { "body-md": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Playfair Display"], "body-lg": ["Plus Jakarta Sans"], "stat-numeric": ["JetBrains Mono"], "body-sm": ["Plus Jakarta Sans"], "display-lg": ["Playfair Display"], "label-caps": ["Plus Jakarta Sans"], "headline-md": ["Playfair Display"], "display-lg-mobile": ["Playfair Display"], "formula-sm": ["JetBrains Mono"], "headline-sm": ["Playfair Display"], "stat-modifier": ["JetBrains Mono"], "headline-lg": ["Playfair Display"] }, "fontSize": { "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "400" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "0em", "fontWeight": "600" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "stat-numeric": ["24px", { "lineHeight": "28px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "400" }], "display-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-caps": ["11px", { "lineHeight": "14px", "letterSpacing": "0.08em", "fontWeight": "700" }], "headline-md": ["22px", { "lineHeight": "28px", "letterSpacing": "0.01em", "fontWeight": "600" }], "display-lg-mobile": ["30px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "formula-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "headline-sm": ["18px", { "lineHeight": "24px", "letterSpacing": "0.02em", "fontWeight": "600" }], "stat-modifier": ["16px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "0em", "fontWeight": "600" }] } } } }</script></head><body class="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary selection:text-on-primary"><header class="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(0,0,0,0.5)]"><div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm min-w-0"><img alt="Arcana 5e Emblem" class="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1XmU8-_97BRk3fBob1fCTSwJ0v9Y7WI6c_7Tz5zpY_Z7Ha1I5yu9hNSJP6ynPten5XLbO44ZCateTNf-tbKZDQsorGHclyB-k_PXer5mGZxG7fZLmtsBqyFUSOZAQzk0_9BVVUxkM8ZaZ2sdiT_D9c6w9unC_NMiNZ1EyyiwUxRy7E2Rsg4QcO8e3R5cdW-CzzZfA7apEViepCJSkCCfPfSHfu0GGiooFw2WmHwwvzEPg"/><div class="flex flex-col min-w-0"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary tracking-wide font-bold uppercase truncate">ARCANA 5E</span><span class="text-xs text-outline font-stat-numeric hidden sm:inline">•</span><span class="text-xs text-outline truncate hidden sm:inline uppercase tracking-widest font-label-caps">Sheet</span></div><span class="font-label-caps text-label-caps text-on-surface-variant/80 tracking-widest uppercase truncate">2024 RULES COMPENDIUM</span></div></div><div class="flex items-center gap-space-xs flex-shrink-0"><button class="h-11 px-2.5 flex items-center gap-1.5 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 active:scale-95 transition-all" id="mode-toggle-chip" onclick="toggleSheetMode()" title="Basculer vers le mode expérimental (croquis)"><span class="material-symbols-outlined text-[18px]">view_in_ar</span><span class="font-label-caps text-[10px] uppercase font-bold tracking-wider hidden sm:inline" id="mode-toggle-text">Expérimental</span><span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span></button><button aria-label="Quick Dice Roll d20" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-primary transition-all" type="button"><span class="material-symbols-outlined text-[20px]">casino</span></button><button aria-label="Search compendium" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-on-surface transition-all" type="button"><span class="material-symbols-outlined text-[20px]">search</span></button><button aria-label="Character profile Aeloria Level 7" class="h-11 pl-space-xs pr-space-sm flex items-center gap-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all" type="button"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/><div class="flex flex-col items-start leading-none pr-0.5"><span class="font-label-caps text-[10px] text-on-surface font-semibold truncate max-w-[64px]">Aeloria</span><span class="font-formula-sm text-[9px] text-primary">Lv.7</span></div></button></div></div></header><main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full px-margin-mobile pb-space-xl gap-space-md" id="classic-sheet-view">
<!-- Floating Live Dice Roll Toast Overlay (Managed via JS) -->
<div class="hidden fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-surface-container-highest/95 backdrop-blur-md px-space-md py-space-sm rounded-xl shadow-xl flex items-center gap-space-sm transition-all duration-300" id="dice-banner">
<div class="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-stat-numeric text-stat-modifier">
<span class="material-symbols-outlined text-[18px]">casino</span>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" id="dice-label">d20 Roll</span>
<span class="font-stat-numeric text-stat-numeric text-primary leading-tight" id="dice-result">18 <span class="text-body-sm font-formula-sm text-on-surface">(Nat 15 + 3)</span></span>
</div>
</div>
<!-- 1. Character Identity & Vitality Card -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md shadow-md gap-space-md relative overflow-hidden">
<!-- Ambient Arcane Backlight -->
<div class="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
<!-- Identity Header Row -->
<div class="flex items-center gap-space-md relative">
<div class="relative flex-shrink-0">
<img alt="Aeloria Silvervein" class="w-16 h-16 rounded-xl object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/>
<span class="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-primary text-on-primary font-formula-sm text-formula-sm font-bold shadow-sm">Lv.7</span>
</div>
<div class="flex flex-col min-w-0 flex-1">
<div class="flex items-center justify-between gap-space-xs">
<h2 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight truncate">Aeloria Silvervein</h2>
<!-- Inspiration Gem -->
<button class="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-high text-primary hover:bg-surface-bright transition-all active:scale-95" id="inspiration-btn" onclick="toggleInspiration()" title="Heroic Inspiration">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="font-label-caps text-[10px] uppercase font-bold tracking-wide">Inspired</span>
</button>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant truncate">High Elf Wizard (Bladesinger)</p>
<div class="flex items-center gap-2 mt-1">
<span class="font-formula-sm text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant">Sage</span>
<span class="font-formula-sm text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-container-low text-secondary">Neutral Good</span>
<span class="font-formula-sm text-[10px] px-1.5 py-0.5 rounded bg-primary-container/20 text-primary">Prof +3</span>
</div>
</div>
</div>
<!-- Active Bladesong & Stance Banner -->
<div class="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-2 min-w-0">
<span class="flex h-2.5 w-2.5 rounded-full bg-secondary animate-pulse flex-shrink-0"></span>
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-label-caps text-secondary font-bold uppercase truncate">Bladesong Active</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">8 rounds left · Conc: Haste (+2 AC)</span>
</div>
</div>
<button class="px-space-sm py-1 rounded-md bg-secondary text-on-secondary font-label-caps text-label-caps uppercase font-bold active:scale-95 transition-transform flex-shrink-0 shadow-sm" id="bladesong-toggle-btn" onclick="toggleBladesong()">
        Deactivate
      </button>
</div>
<!-- Tactical Vitality HUD -->
<div class="grid grid-cols-4 gap-space-xs">
<!-- Armor Class -->
<div class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold">Armor Class</span>
<div class="flex items-baseline gap-1 my-0.5">
<span class="font-stat-numeric text-stat-numeric text-primary font-bold" id="ac-value">20</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant line-through" id="ac-base">16</span>
</div>
<span class="font-formula-sm text-[9px] text-secondary uppercase font-semibold">Bladesong</span>
</div>
<!-- Initiative -->
<button class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center hover:bg-surface-container-high transition-all active:scale-95 group" onclick="triggerRoll('Initiative', 3)">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold group-hover:text-primary">Initiative</span>
<div class="flex items-center gap-0.5 my-0.5 text-primary">
<span class="font-stat-numeric text-stat-numeric font-bold">+3</span>
<span class="material-symbols-outlined text-[14px]">casino</span>
</div>
<span class="font-formula-sm text-[9px] text-on-surface-variant uppercase font-semibold">Advantage</span>
</button>
<!-- Speed -->
<div class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold">Speed</span>
<div class="flex items-baseline gap-0.5 my-0.5">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold" id="speed-value">40</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">ft</span>
</div>
<span class="font-formula-sm text-[9px] text-secondary uppercase font-semibold">+10ft Song</span>
</div>
<!-- Passive Senses -->
<div class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold">Passives</span>
<div class="flex items-center gap-1.5 my-0.5">
<span class="font-stat-modifier text-stat-modifier text-on-surface font-bold" title="Passive Perception">15<span class="font-formula-sm text-[9px] text-on-surface-variant">P</span></span>
<span class="text-on-surface-variant">/</span>
<span class="font-stat-modifier text-stat-modifier text-primary font-bold" title="Passive Investigation">18<span class="font-formula-sm text-[9px] text-on-surface-variant">I</span></span>
</div>
<span class="font-formula-sm text-[9px] text-on-surface-variant uppercase font-semibold">Darkvision 60</span>
</div>
</div>
<!-- Hit Point Management Module -->
<div class="flex flex-col bg-surface-container-low rounded-lg p-space-sm gap-space-xs">
<div class="flex items-center justify-between">
<div class="flex items-baseline gap-1.5">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Hit Points</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface"><span id="current-hp">48</span> <span class="text-body-sm font-formula-sm text-on-surface-variant">/ 48</span></span>
</div>
<div class="flex items-center gap-1.5">
<span class="font-formula-sm text-[11px] text-on-surface-variant">Temp:</span>
<button class="px-2 py-0.5 rounded bg-surface-container text-primary font-formula-sm text-formula-sm font-bold active:scale-95" id="temp-hp-display" onclick="adjustTempHp(1)">+0</button>
</div>
</div>
<!-- Health Gauge Bar -->
<div class="w-full h-2.5 rounded-full bg-surface-container-lowest overflow-hidden flex">
<div class="h-full bg-secondary-container transition-all duration-300 rounded-full" id="hp-bar-fill" style="width: 100%;"></div>
</div>
<!-- Tactile HP Incrementors -->
<div class="grid grid-cols-4 gap-space-xs pt-1">
<button class="py-1.5 rounded-md bg-error-container text-on-error-container font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(-5)">-5</button>
<button class="py-1.5 rounded-md bg-surface-container text-error font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(-1)">-1</button>
<button class="py-1.5 rounded-md bg-surface-container text-primary font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(1)">+1</button>
<button class="py-1.5 rounded-md bg-primary-container text-on-primary-container font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(5)">+5</button>
</div>
<!-- Hit Dice & Death Saves Bar -->
<div class="flex items-center justify-between pt-1 gap-2 border-none">
<div class="flex items-center gap-2">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">Hit Dice:</span>
<span class="font-formula-sm text-formula-sm text-on-surface" id="hit-dice-display">5/7d6</span>
<button class="px-1.5 py-0.5 rounded bg-surface-container text-primary hover:bg-surface-bright font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="spendHitDice()">Short Rest</button>
</div>
<!-- Death Saves Toggles -->
<div class="flex items-center gap-1.5">
<div class="flex items-center gap-0.5" title="Successes">
<span class="material-symbols-outlined text-[13px] text-primary">check</span>
<input class="w-3 h-3 accent-primary rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-primary rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-primary rounded cursor-pointer" type="checkbox"/>
</div>
<div class="flex items-center gap-0.5" title="Failures">
<span class="material-symbols-outlined text-[13px] text-error">close</span>
<input class="w-3 h-3 accent-error rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-error rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-error rounded cursor-pointer" type="checkbox"/>
</div>
</div>
</div>
</div>
</section>
<!-- 2. Ability Scores & Saving Throws Array -->
<section class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between px-1">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Attributes &amp; Saves</span>
<span class="font-formula-sm text-[10px] text-primary">★ Proficient Save</span>
</div>
<div class="grid grid-cols-3 gap-space-xs">
<!-- STR -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">STR</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('STR Check', -1)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">-1</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">8</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-formula-sm text-[10px] hover:text-on-surface" onclick="triggerRoll('STR Save', -1)">
          Save -1
        </button>
</div>
<!-- DEX -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">DEX</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('DEX Check', 3)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+3</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">16</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-formula-sm text-[10px] hover:text-on-surface" onclick="triggerRoll('DEX Save', 3)">
          Save +3
        </button>
</div>
<!-- CON -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">CON</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('CON Check', 2)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+2</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">14</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-secondary font-formula-sm text-[10px] font-semibold" onclick="triggerRoll('CON Save (+4 Song)', 6)" title="Song gives +INT to Concentration Saves">
          Save +6*
        </button>
</div>
<!-- INT (Key) -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-bl-sm"></div>
<span class="font-label-caps text-[10px] uppercase text-primary font-bold">INT ★</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('INT Check', 4)">
<span class="font-stat-numeric text-headline-sm text-primary font-bold">+4</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">18</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-formula-sm text-[10px] font-bold shadow-sm" onclick="triggerRoll('INT Save', 7)">
          Save +7 ★
        </button>
</div>
<!-- WIS -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-bl-sm"></div>
<span class="font-label-caps text-[10px] uppercase text-primary font-bold">WIS ★</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('WIS Check', 1)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+1</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">12</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-formula-sm text-[10px] font-bold shadow-sm" onclick="triggerRoll('WIS Save', 4)">
          Save +4 ★
        </button>
</div>
<!-- CHA -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">CHA</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('CHA Check', 0)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+0</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">10</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-formula-sm text-[10px] hover:text-on-surface" onclick="triggerRoll('CHA Save', 0)">
          Save +0
        </button>
</div>
</div>
</section>
<!-- 3. Resource Tracker Bar (Bladesong & Arcane Recovery) -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-sm shadow-md">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Arcane Resources</span>
<button class="font-formula-sm text-[10px] text-primary uppercase font-bold hover:underline" onclick="resetResources()">Short/Long Rest</button>
</div>
<!-- Bladesong Uses -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Bladesong Ward</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Prof / Day (+INT to AC, Con saves)</span>
</div>
<div class="flex items-center gap-2" id="bladesong-pips">
<button class="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-on-secondary shadow-sm active:scale-90 transition-transform" onclick="togglePip(this)">
<span class="material-symbols-outlined text-[16px]">shield</span>
</button>
<button class="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-on-secondary shadow-sm active:scale-90 transition-transform" onclick="togglePip(this)">
<span class="material-symbols-outlined text-[16px]">shield</span>
</button>
<button class="w-6 h-6 rounded-md bg-surface-container-highest flex items-center justify-center text-on-surface-variant active:scale-90 transition-transform" onclick="togglePip(this)">
<span class="material-symbols-outlined text-[16px]">shield</span>
</button>
</div>
</div>
<!-- Arcane Recovery -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Arcane Recovery</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Recover up to 4 spell levels</span>
</div>
<button class="px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-formula-sm text-formula-sm font-bold active:scale-95 transition-all shadow-sm" id="arcane-recovery-btn" onclick="toggleRecovery(this)">
        1/1 Ready
      </button>
</div>
</section>
<!-- 4. Spell Slots Matrix (Interactive slot nodules) -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-sm shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-primary text-[18px]">auto_fix_high</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Spell Slots Matrix</span>
</div>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Tap gem to spend / restore</span>
</div>
<div class="grid grid-cols-2 gap-space-xs">
<!-- Level 1 Slots (4) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">1st Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl1-count">4/4</span>
</div>
<div class="flex items-center gap-1.5" data-tier="1">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 1"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 2"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 3"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 4"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
</div>
</div>
<!-- Level 2 Slots (3) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">2nd Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl2-count">3/3</span>
</div>
<div class="flex items-center gap-1.5" data-tier="2">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl2-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl2-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl2-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
</div>
</div>
<!-- Level 3 Slots (3: 2 available, 1 spent) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">3rd Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl3-count">2/3</span>
</div>
<div class="flex items-center gap-1.5" data-tier="3">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl3-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl3-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-surface-container-highest text-outline flex items-center justify-center transition-all active:scale-90 opacity-60" onclick="toggleSpellSlot(this, 'lvl3-count')"><span class="-rotate-45 text-[9px] font-bold">◇</span></button>
</div>
</div>
<!-- Level 4 Slots (1) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">4th Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl4-count">1/1</span>
</div>
<div class="flex items-center gap-1.5" data-tier="4">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl4-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
</div>
</div>
</div>
</section>
<!-- 5. Quick Combat & Action Economy Bar with Attack Cards -->
<section class="flex flex-col gap-space-sm">
<!-- Visual Segmented Toggle -->
<div class="flex p-1 rounded-xl bg-surface-container overflow-x-auto no-scrollbar gap-1">
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg bg-surface-container-high text-primary font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center" onclick="selectCombatTab(this, 'actions-tab')">
        Actions (Amber)
      </button>
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface" onclick="selectCombatTab(this, 'bonus-tab')">
        Bonus (Cyan)
      </button>
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface" onclick="selectCombatTab(this, 'reactions-tab')">
        Reactions (Violet)
      </button>
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface" onclick="selectCombatTab(this, 'spells-tab')">
        Spells
      </button>
</div>
<!-- TAB 1: Primary Actions (Bladesinger Weapon & Cantrips) -->
<div class="combat-view flex flex-col gap-space-xs" id="actions-tab">
<!-- Moonblade (Rapier +1) -->
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></span>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Moonblade</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">+1 Rapier</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Melee Weapon · Finesse, Light · Silvered Arcane focus</p>
<!-- Attack Trigger & Damage Roll Grid -->
<div class="grid grid-cols-2 gap-space-xs mt-1">
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerRoll('Moonblade Atk', 7, '1d20+7')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-primary">To Hit</span>
<span class="font-stat-numeric text-stat-modifier text-primary font-bold">+7</span>
</div>
<span class="material-symbols-outlined text-primary text-[20px]">casino</span>
</button>
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerDamage('Moonblade Dmg', '1d8+4', 'Piercing')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-on-surface">Damage</span>
<span class="font-stat-numeric text-stat-modifier text-on-surface font-bold">1d8+4 <span class="font-formula-sm text-[10px] text-on-surface-variant">Prc</span></span>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">swords</span>
</button>
</div>
<!-- Cantrip Rider Option: Booming Blade Toggle -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest mt-1">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[16px]">thunderstorm</span>
<span class="font-formula-sm text-[11px] text-on-surface">Booming Blade rider: <strong class="text-secondary">+1d8 Thunder</strong></span>
</div>
<button class="px-2 py-0.5 rounded bg-surface-container-high text-secondary hover:bg-surface-bright font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerDamage('Booming Blade', '1d8', 'Thunder')">
            +Roll rider
          </button>
</div>
</div>
<!-- Ray of Frost -->
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-secondary flex-shrink-0"></span>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Ray of Frost</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-secondary font-formula-sm text-[10px] font-semibold">Cantrip</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Ranged Spell Attack · 60 ft · Target speed reduced by 10 ft</p>
<div class="grid grid-cols-2 gap-space-xs mt-1">
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerRoll('Ray of Frost Atk', 7, '1d20+7')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-primary">Spell Atk</span>
<span class="font-stat-numeric text-stat-modifier text-primary font-bold">+7</span>
</div>
<span class="material-symbols-outlined text-primary text-[20px]">casino</span>
</button>
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerDamage('Ray of Frost Dmg', '2d8', 'Cold')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-secondary">Damage</span>
<span class="font-stat-numeric text-stat-modifier text-secondary font-bold">2d8 <span class="font-formula-sm text-[10px] text-on-surface-variant">Cold</span></span>
</div>
<span class="material-symbols-outlined text-secondary text-[20px]">ac_unit</span>
</button>
</div>
</div>
<!-- Fire Bolt -->
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-error flex-shrink-0"></span>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Fire Bolt</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-error font-formula-sm text-[10px] font-semibold">Cantrip</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Ranged Spell Attack · 120 ft · Ignites flammable objects</p>
<div class="grid grid-cols-2 gap-space-xs mt-1">
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerRoll('Fire Bolt Atk', 7, '1d20+7')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-primary">Spell Atk</span>
<span class="font-stat-numeric text-stat-modifier text-primary font-bold">+7</span>
</div>
<span class="material-symbols-outlined text-primary text-[20px]">casino</span>
</button>
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerDamage('Fire Bolt Dmg', '2d10', 'Fire')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-error">Damage</span>
<span class="font-stat-numeric text-stat-modifier text-error font-bold">2d10 <span class="font-formula-sm text-[10px] text-on-surface-variant">Fire</span></span>
</div>
<span class="material-symbols-outlined text-error text-[20px]">local_fire_department</span>
</button>
</div>
</div>
</div>
<!-- TAB 2: Bonus Actions (Hidden by default) -->
<div class="combat-view hidden flex-col gap-space-xs" id="bonus-tab">
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Bladesong Activation</span>
</div>
<span class="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Bonus Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Duration: 1 minute (10 rounds). Grants +4 AC, +10ft speed, advantage on Acrobatics checks, +4 bonus to Constitution saves to maintain concentration.</p>
<button class="mt-2 py-2 rounded-lg bg-secondary text-on-secondary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center shadow-sm" onclick="toggleBladesong()">
          Activate Bladesong
        </button>
</div>
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Misty Step</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">2nd Level</span>
</div>
<span class="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Bonus Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Range: Self (30 ft). Briefly surrounded by silver mist, teleport up to 30 feet to an unoccupied space you can see.</p>
<button class="mt-2 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-secondary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center" onclick="triggerQuickCast('Misty Step', 2)">
          Cast (Expends Level 2 Slot)
        </button>
</div>
</div>
<!-- TAB 3: Reactions (Hidden by default) -->
<div class="combat-view hidden flex-col gap-space-xs" id="reactions-tab">
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Shield</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">1st Level</span>
</div>
<span class="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Reaction</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Trigger: When hit by an attack or targeted by magic missile. Grants +5 AC until start of your next turn and negates Magic Missile damage.</p>
<button class="mt-2 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-tertiary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center" onclick="triggerQuickCast('Shield', 1)">
          Trigger +5 AC (AC 25)
        </button>
</div>
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Absorb Elements</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">1st Level</span>
</div>
<span class="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Reaction</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Trigger: Taking acid, cold, fire, lightning, or thunder damage. Gain resistance against triggering type, and next melee attack deals +1d6 extra damage.</p>
<button class="mt-2 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-tertiary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center" onclick="triggerQuickCast('Absorb Elements', 1)">
          Gain Resistance (Lvl 1)
        </button>
</div>
</div>
<!-- TAB 4: Prepared Spells Quick List (Hidden by default) -->
<div class="combat-view hidden flex-col gap-space-xs" id="spells-tab">
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-sm shadow-md">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Prepared Grimoire</span>
<span class="font-formula-sm text-formula-sm text-primary">12 Prepared / Save DC 15</span>
</div>
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Haste <span class="text-secondary text-[11px]">(Concentrating)</span></span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">3rd Level · Action · Double speed, +2 AC, extra Action</span>
</div>
<button class="px-2 py-1 rounded bg-error-container text-on-error-container font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="breakConcentration()">Drop Conc</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Fireball</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">3rd Level · 150 ft · 20 ft radius · 8d6 Fire (DEX save DC 15)</span>
</div>
<button class="px-2 py-1 rounded bg-primary-container text-on-primary-container font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerDamage('Fireball', '8d6', 'Fire')">Cast 8d6</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Counterspell</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">3rd Level · Reaction · 60 ft · Interrupt spell of 3rd or lower</span>
</div>
<button class="px-2 py-1 rounded bg-surface-container text-primary font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerRoll('Counterspell Check (INT)', 4)">Check +4</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Dimension Door</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">4th Level · 500 ft · Teleport self + 1 willing passenger</span>
</div>
<button class="px-2 py-1 rounded bg-surface-container text-primary font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerQuickCast('Dimension Door', 4)">Slot 4</button>
</div>
</div>
</div>
</div>
</section>
</div><!-- Experimental Sketch View Container (Hidden initially until toggled or directly accessible) -->
<div class="hidden flex-col w-full px-margin-mobile pb-space-xl gap-space-md animate-fadeIn" id="experimental-sheet-view">
<!-- Mode Banner Indicator -->
<div class="bg-surface-container-low border border-primary/20 rounded-xl p-3 flex items-center justify-between shadow-md">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]">draw</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-1.5">
<span class="font-label-caps text-[11px] font-bold text-primary tracking-wider uppercase">Mode Croquis Expérimental</span>
<span class="px-1.5 py-0.2 rounded text-[9px] bg-primary text-on-primary font-bold uppercase font-formula-sm">Proto v2</span>
</div>
<span class="text-[11px] text-on-surface-variant font-body-sm">Inspiré du prototype manuscrit • Navigation prisme 5-facettes</span>
</div>
</div>
<button class="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-caps text-[10px] uppercase font-bold tracking-wider active:scale-95 transition-all" onclick="toggleSheetMode()">
      Vue Classique
    </button>
</div>
<!-- Sketch Identity & Core Attributes Header (Humain, Barde lvl 2 / Toto Tata / Artiste) -->
<div class="bg-surface-container rounded-2xl p-4 shadow-xl border border-outline-variant/30 relative overflow-hidden flex flex-col gap-4">
<div class="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>
<!-- Identity Row matching sketch top bar -->
<div class="flex items-start justify-between border-b border-surface-container-highest/60 pb-3">
<div class="flex flex-col">
<span class="font-headline-sm text-lg font-bold text-on-surface leading-tight tracking-wide">Humain</span>
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="font-body-md font-semibold text-primary">Barde</span>
<span class="text-xs font-formula-sm px-1.5 py-0.5 rounded bg-surface-container-low text-secondary font-bold">lvl 2</span>
</div>
</div>
<div class="flex flex-col items-center text-center">
<span class="font-headline-md text-xl font-bold text-primary tracking-wide">Toto, Tata</span>
<span class="text-[10px] font-formula-sm text-outline tracking-wider uppercase">Personnage Joueur</span>
</div>
<div class="flex flex-col items-end">
<span class="font-headline-sm text-lg font-bold text-secondary text-right">Artiste</span>
<span class="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider">Historique</span>
</div>
</div>
<!-- Central Layout corresponding to sketch portrait + 4 corner stats -->
<div class="grid grid-cols-3 items-center gap-2 relative py-1">
<!-- Left Column: Bonus Maîtrise (+2 BM) & Bouclier CA 11 -->
<div class="flex flex-col items-center justify-around gap-4">
<!-- Star Proficiency Bonus (+2 BM) -->
<button class="flex flex-col items-center group active:scale-95 transition-transform" onclick="triggerRoll('Bonus de Maîtrise', 2)" title="Bonus de Maîtrise (+2 BM)">
<div class="relative w-14 h-14 flex items-center justify-center text-primary filter drop-shadow-[0_2px_8px_rgba(242,202,80,0.25)]">
<svg class="w-14 h-14 fill-surface-container-high stroke-primary stroke-2" viewbox="0 0 24 24">
<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
</svg>
<span class="absolute font-stat-numeric text-base font-bold text-primary group-hover:scale-110 transition-transform">+2</span>
</div>
<span class="font-label-caps text-[11px] font-bold text-primary tracking-widest mt-0.5">BM</span>
</button>
<!-- Shield Armor Class (11 CA) -->
<div class="flex flex-col items-center" title="Classe d'Armure">
<div class="relative w-14 h-16 flex items-center justify-center text-on-surface filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
<svg class="w-14 h-16 fill-surface-container-high stroke-outline stroke-[1.5]" viewbox="0 0 24 24">
<path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"></path>
</svg>
<span class="absolute font-stat-numeric text-xl font-bold text-on-surface" id="exp-ac-val">11</span>
</div>
<span class="font-label-caps text-[10px] text-on-surface-variant uppercase font-semibold mt-0.5">Armure</span>
</div>
</div>
<!-- Central Circular Portrait (Camera at top + Avatar) -->
<div class="flex flex-col items-center justify-center relative">
<!-- Camera badge at top circle edge -->
<div class="z-10 -mb-3 bg-surface-container-highest border border-outline-variant/60 w-8 h-8 rounded-full flex items-center justify-center text-primary shadow-md hover:bg-surface-bright cursor-pointer active:scale-90 transition-transform" title="Modifier l'avatar du personnage">
<span class="material-symbols-outlined text-[16px]">photo_camera</span>
</div>
<!-- Portrait Circle Frame with double rings -->
<div class="relative w-32 h-32 rounded-full p-1 bg-gradient-to-b from-primary/60 via-outline-variant/40 to-secondary/50 shadow-xl">
<div class="w-full h-full rounded-full bg-surface-container-lowest overflow-hidden flex items-center justify-center border-2 border-surface">
<img alt="Toto Tata Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/>
</div>
</div>
</div>
<!-- Right Column: Speed (9m / Vitesse) & Initiative (+2) -->
<div class="flex flex-col items-center justify-around gap-4">
<!-- Speed with boot movement lines (9m) -->
<div class="flex flex-col items-center" title="Vitesse de déplacement">
<div class="flex items-center gap-1 text-secondary">
<span class="material-symbols-outlined text-[24px]">directions_run</span>
</div>
<div class="flex items-baseline gap-0.5 border-b border-outline-variant/60 pb-0.5 px-2">
<span class="font-stat-numeric text-xl font-bold text-on-surface">9</span>
<span class="font-formula-sm text-xs text-secondary font-semibold">m</span>
</div>
<span class="font-label-caps text-[10px] text-on-surface-variant uppercase font-semibold mt-0.5">Vitesse</span>
</div>
<!-- Initiative with Lightning Bolt (Init +2) -->
<button class="flex flex-col items-center group active:scale-95 transition-transform" onclick="triggerRoll('Initiative (Barde lvl 2)', 2)" title="Lancer Initiative">
<span class="font-label-caps text-[10px] font-bold text-on-surface-variant uppercase tracking-wider group-hover:text-primary">Init</span>
<div class="flex items-center gap-0.5 text-primary">
<span class="material-symbols-outlined text-[20px]">bolt</span>
<span class="font-stat-numeric text-xl font-bold">+2</span>
</div>
<span class="font-formula-sm text-[9px] text-outline font-semibold uppercase">d20+2</span>
</button>
</div>
</div>
<!-- Hit Points & Bubble Adjustment Cluster directly under portrait circle -->
<!-- Matches sketch: (-1) (9/9) (+1) (+1 bouclier temp) -->
<div class="flex items-center justify-center gap-2 pt-1 pb-1">
<!-- Bubble -1 HP -->
<button class="w-11 h-11 rounded-full bg-surface-container-high border border-outline-variant/60 text-error font-stat-numeric text-base font-bold flex items-center justify-center hover:bg-error-container hover:text-on-error-container active:scale-90 transition-all shadow-sm" onclick="changeSketchHp(-1)" title="Subir 1 dégât">
        -1
      </button>
<!-- Main HP Pill (9/9) -->
<div class="px-4 py-2 rounded-full bg-surface-container-lowest border-2 border-primary/40 flex items-center gap-1.5 shadow-inner">
<span class="material-symbols-outlined text-primary text-[16px]">favorite</span>
<span class="font-stat-numeric text-lg font-bold text-on-surface" id="exp-hp-display">9/9</span>
</div>
<!-- Bubble +1 HP -->
<button class="w-11 h-11 rounded-full bg-surface-container-high border border-outline-variant/60 text-primary font-stat-numeric text-base font-bold flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container active:scale-90 transition-all shadow-sm" onclick="changeSketchHp(1)" title="Soigner 1 PV">
        +1
      </button>
<!-- Shield Bubble (+1 PV Temporaire) -->
<button class="h-11 px-3 rounded-full bg-surface-container-high border border-secondary/40 text-secondary font-stat-numeric text-sm font-bold flex items-center gap-1 hover:bg-secondary-container hover:text-on-secondary-container active:scale-90 transition-all shadow-sm" onclick="toggleSketchTempHp()" title="Points de Vie Temporaires">
<span class="material-symbols-outlined text-[15px]">shield</span>
<span id="exp-temp-hp-text">+1</span>
</button>
</div>
</div>
<!-- 3D Perspective Prism Hub (Faithful replication of the 5-facet diagram in the sketch) -->
<div class="bg-surface-container rounded-2xl p-4 shadow-xl border border-outline-variant/30 flex flex-col gap-3">
<div class="flex items-center justify-between px-1">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[18px]">view_in_ar</span>
<span class="font-label-caps text-xs uppercase font-bold text-on-surface tracking-wider">Prisme de Navigation 5D</span>
</div>
<span class="text-[10px] font-formula-sm text-outline">Touchez une facette pour inspecter</span>
</div>
<!-- Isometric 5-Faceted Perspective Board matching sketch trapezoids -->
<div class="relative w-full max-w-sm mx-auto aspect-[4/3.4] p-2 flex items-center justify-center select-none">
<!-- 1. Top Facet: TRAITS -->
<button class="prism-facet absolute top-2 left-6 right-6 h-16 bg-surface-container-high/90 hover:bg-primary/20 border-2 border-primary/40 text-on-surface font-headline-sm font-bold text-lg tracking-widest uppercase flex items-center justify-center shadow-lg active:scale-95 transition-all group" id="facet-traits" onclick="selectPrismSection('traits')" style="clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[18px] group-hover:animate-bounce">psychology</span>
<span class="group-hover:text-primary transition-colors">TRAITS</span>
</div>
</button>
<!-- 2. Left Facet: SAC / ÉQUIPEMENT (Backpack Icon in sketch) -->
<button class="prism-facet absolute left-2 top-16 bottom-16 w-20 bg-surface-container-high/90 hover:bg-secondary/20 border-2 border-secondary/40 text-on-surface flex flex-col items-center justify-center shadow-lg active:scale-95 transition-all group" id="facet-bag" onclick="selectPrismSection('bag')" style="clip-path: polygon(0% 0%, 100% 18%, 100% 82%, 0% 100%);">
<span class="material-symbols-outlined text-secondary text-[28px] group-hover:scale-110 transition-transform">backpack</span>
<span class="font-label-caps text-[9px] uppercase font-bold text-on-surface-variant tracking-wider mt-1">Sac</span>
</button>
<!-- 3. Center Core: ACTIONS (Rectangular core in sketch) -->
<button class="prism-facet z-20 w-36 h-28 bg-primary/20 border-2 border-primary rounded-xl text-primary font-headline-md font-bold text-xl tracking-wider uppercase flex flex-col items-center justify-center shadow-2xl hover:bg-primary/30 active:scale-95 transition-all ring-4 ring-surface" id="facet-actions" onclick="selectPrismSection('actions')">
<span class="material-symbols-outlined text-primary text-[24px]">swords</span>
<span class="mt-1 text-primary drop-shadow">Actions</span>
<span class="font-formula-sm text-[9px] text-on-surface-variant uppercase tracking-widest mt-0.5">Attaque &amp; Sort</span>
</button>
<!-- 4. Right Facet: SORTS & CAPACITÉS (Magic Wand & Star Icon in sketch) -->
<button class="prism-facet absolute right-2 top-16 bottom-16 w-20 bg-surface-container-high/90 hover:bg-tertiary/20 border-2 border-tertiary/40 text-on-surface flex flex-col items-center justify-center shadow-lg active:scale-95 transition-all group" id="facet-spells" onclick="selectPrismSection('spells')" style="clip-path: polygon(0% 18%, 100% 0%, 100% 100%, 0% 82%);">
<span class="material-symbols-outlined text-tertiary text-[28px] group-hover:scale-110 transition-transform">auto_fix_high</span>
<span class="font-label-caps text-[9px] uppercase font-bold text-on-surface-variant tracking-wider mt-1">Magie</span>
</button>
<!-- 5. Bottom Facet: CARACT / COMPÉTENCES -->
<button class="prism-facet absolute bottom-2 left-6 right-6 h-16 bg-surface-container-high/90 hover:bg-secondary/20 border-2 border-secondary/40 text-on-surface font-headline-sm font-bold text-sm tracking-wider uppercase flex items-center justify-center shadow-lg active:scale-95 transition-all group" id="facet-stats" onclick="selectPrismSection('stats')" style="clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%);">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[18px]">format_list_bulleted</span>
<span class="group-hover:text-secondary transition-colors text-center text-[12px] sm:text-sm">CARACT / COMPÉTENCES</span>
</div>
</button>
</div>
<!-- Interactive Panel corresponding to the selected Prism Facet -->
<div class="mt-2 pt-2 border-t border-surface-container-highest/60 flex flex-col gap-3" id="prism-content-container">
<!-- PANEL A: Actions (Selected by default) -->
<div class="prism-panel flex flex-col gap-2" id="panel-actions">
<div class="flex items-center justify-between">
<span class="font-label-caps text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">swords</span> Actions de Combat (Barde)
          </span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">1 Action · 1 Action Bonus</span>
</div>
<!-- Rapière d'Artiste -->
<div class="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="font-body-md font-bold text-on-surface">Rapière Fine</span>
<span class="px-1.5 py-0.2 rounded bg-surface-container-high font-formula-sm text-[9px] text-secondary">Corps à corps</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[9px] uppercase font-bold">Action</span>
</div>
<div class="grid grid-cols-2 gap-2 mt-1">
<button class="py-1.5 px-2 rounded-lg bg-surface-container hover:bg-surface-bright flex items-center justify-between text-left active:scale-95 transition-all" onclick="triggerRoll('Attaque Rapière', 4)">
<span class="text-[10px] uppercase font-label-caps text-on-surface-variant">Toucher</span>
<span class="font-stat-numeric text-primary font-bold">+4</span>
</button>
<button class="py-1.5 px-2 rounded-lg bg-surface-container hover:bg-surface-bright flex items-center justify-between text-left active:scale-95 transition-all" onclick="triggerDamage('Dégâts Rapière', '1d8+2', 'Perforant')">
<span class="text-[10px] uppercase font-label-caps text-on-surface-variant">Dégâts</span>
<span class="font-stat-numeric text-on-surface font-bold">1d8+2 <span class="text-[9px] text-outline font-formula-sm">Prc</span></span>
</button>
</div>
</div>
<!-- Moquerie Cruelle (Vicious Mockery) -->
<div class="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="font-body-md font-bold text-on-surface">Moquerie Cruelle</span>
<span class="px-1.5 py-0.2 rounded bg-surface-container-high font-formula-sm text-[9px] text-tertiary">Tour de magie</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[9px] uppercase font-bold">Action</span>
</div>
<p class="text-xs text-on-surface-variant font-body-sm">Portée 18m. JdS Sagesse DD 13 ou subit 1d4 psychique et désavantage au prochain jet.</p>
<button class="mt-1 py-1.5 px-3 rounded-lg bg-surface-container text-tertiary font-label-caps text-[10px] uppercase font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform" onclick="triggerDamage('Moquerie Cruelle', '1d4', 'Psychique')">
<span class="material-symbols-outlined text-[14px]">record_voice_over</span> Lancer 1d4 Psychique (DD 13)
          </button>
</div>
<!-- Inspiration Bardique -->
<div class="bg-surface-container-low rounded-xl p-3 flex items-center justify-between">
<div class="flex flex-col">
<span class="font-body-md font-bold text-on-surface">Inspiration Bardique (d6)</span>
<span class="text-[10px] font-formula-sm text-secondary">3 utilisations / Repos long</span>
</div>
<button class="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary font-label-caps text-[10px] uppercase font-bold active:scale-95 shadow-sm transition-transform" onclick="triggerRoll('Inspiration Bardique donnée', 0, '1d6')">
            Donner d6
          </button>
</div>
</div>
<!-- PANEL B: Traits (Hidden by default) -->
<div class="prism-panel hidden flex-col gap-2" id="panel-traits">
<div class="flex items-center justify-between">
<span class="font-label-caps text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">psychology</span> Traits &amp; Origines
          </span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Humain · Barde 2</span>
</div>
<div class="bg-surface-container-low rounded-xl p-3 flex flex-col gap-2">
<div>
<span class="font-body-sm font-bold text-primary">Touche-à-tout (Jack of All Trades)</span>
<p class="text-xs text-on-surface-variant mt-0.5">Vous pouvez ajouter la moitié de votre bonus de maîtrise (+1) à tout test de caractéristique ne bénéficiant pas déjà de votre maîtrise.</p>
</div>
<div class="border-t border-surface-container-highest/60 pt-2">
<span class="font-body-sm font-bold text-secondary">Chant de repos (Song of Rest)</span>
<p class="text-xs text-on-surface-variant mt-0.5">Lors d'un repos court, vos alliés regagnent +1d6 points de vie supplémentaires en dépensant des dés de vie.</p>
</div>
<div class="border-t border-surface-container-highest/60 pt-2">
<span class="font-body-sm font-bold text-on-surface">Origine Humaine : Ingénieux</span>
<p class="text-xs text-on-surface-variant mt-0.5">Vous commencez avec l'Inspiration héroïque à l'issue de chaque repos long.</p>
</div>
</div>
</div>
<!-- PANEL C: Bag / Sac (Hidden by default) -->
<div class="prism-panel hidden flex-col gap-2" id="panel-bag">
<div class="flex items-center justify-between">
<span class="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">backpack</span> Équipement &amp; Sac d'Artiste
          </span>
<span class="font-formula-sm text-[10px] text-primary">18 / 60 kg · 25 PO</span>
</div>
<div class="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5">
<div class="flex items-center justify-between py-1 border-b border-surface-container-highest/40">
<span class="font-body-sm text-on-surface font-semibold">Luth ouvragé d'artiste</span>
<span class="font-formula-sm text-[10px] text-secondary">Focalisateur d'incantation</span>
</div>
<div class="flex items-center justify-between py-1 border-b border-surface-container-highest/40">
<span class="font-body-sm text-on-surface font-semibold">Armure de cuir souple</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">CA 11 (+DEX)</span>
</div>
<div class="flex items-center justify-between py-1 border-b border-surface-container-highest/40">
<span class="font-body-sm text-on-surface font-semibold">Dague de voyage</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">1d4 perforant</span>
</div>
<div class="flex items-center justify-between py-1">
<span class="font-body-sm text-on-surface font-semibold">Pack de l'amuseur (torches, rations, corde)</span>
<span class="font-formula-sm text-[10px] text-outline">12 kg</span>
</div>
</div>
</div>
<!-- PANEL D: Spells / Magie (Hidden by default) -->
<div class="prism-panel hidden flex-col gap-2" id="panel-spells">
<div class="flex items-center justify-between">
<span class="font-label-caps text-xs text-tertiary font-bold uppercase tracking-wider flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">auto_fix_high</span> Grimoire &amp; Sorts de Barde
          </span>
<span class="font-formula-sm text-[10px] text-primary">DD 13 · Attaque Sort +5</span>
</div>
<div class="bg-surface-container-low rounded-xl p-3 flex flex-col gap-2">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface uppercase">Emplacements Niv 1 (3/3)</span>
<div class="flex items-center gap-1">
<button class="w-5 h-5 rounded bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">◆</button>
<button class="w-5 h-5 rounded bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">◆</button>
<button class="w-5 h-5 rounded bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">◆</button>
</div>
</div>
<div class="flex flex-col gap-1.5 mt-1">
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container">
<div class="flex flex-col">
<span class="font-body-sm font-bold text-on-surface">Mot de Guérison</span>
<span class="text-[10px] text-on-surface-variant font-formula-sm">Bonus Action · 18m · 1d4+3 soins</span>
</div>
<button class="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerDamage('Soin : Mot de Guérison', '1d4+3', 'Soins')">Soigner</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container">
<div class="flex flex-col">
<span class="font-body-sm font-bold text-on-surface">Vague Tonnante (Thunderwave)</span>
<span class="text-[10px] text-on-surface-variant font-formula-sm">Action · Cube 4.5m · 2d8 tonnerre</span>
</div>
<button class="px-2.5 py-1 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerDamage('Vague Tonnante', '2d8', 'Tonnerre')">Lancer</button>
</div>
</div>
</div>
</div>
<!-- PANEL E: Stats & Compétences (Hidden by default) -->
<div class="prism-panel hidden flex-col gap-2" id="panel-stats">
<div class="flex items-center justify-between">
<span class="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">format_list_bulleted</span> Caractéristiques &amp; Compétences
          </span>
<span class="font-formula-sm text-[10px] text-primary">Prof. BM +2</span>
</div>
<div class="grid grid-cols-6 gap-1">
<div class="bg-surface-container-low rounded-lg p-1.5 text-center flex flex-col items-center">
<span class="font-label-caps text-[9px] text-outline font-bold">FOR</span>
<span class="font-stat-numeric text-sm font-bold text-on-surface">-1</span>
<span class="text-[9px] text-outline">8</span>
</div>
<div class="bg-surface-container-low rounded-lg p-1.5 text-center flex flex-col items-center border border-secondary/30">
<span class="font-label-caps text-[9px] text-secondary font-bold">DEX</span>
<span class="font-stat-numeric text-sm font-bold text-secondary">+2</span>
<span class="text-[9px] text-outline">14</span>
</div>
<div class="bg-surface-container-low rounded-lg p-1.5 text-center flex flex-col items-center">
<span class="font-label-caps text-[9px] text-outline font-bold">CON</span>
<span class="font-stat-numeric text-sm font-bold text-on-surface">+1</span>
<span class="text-[9px] text-outline">12</span>
</div>
<div class="bg-surface-container-low rounded-lg p-1.5 text-center flex flex-col items-center">
<span class="font-label-caps text-[9px] text-outline font-bold">INT</span>
<span class="font-stat-numeric text-sm font-bold text-on-surface">+0</span>
<span class="text-[9px] text-outline">10</span>
</div>
<div class="bg-surface-container-low rounded-lg p-1.5 text-center flex flex-col items-center">
<span class="font-label-caps text-[9px] text-outline font-bold">SAG</span>
<span class="font-stat-numeric text-sm font-bold text-on-surface">+1</span>
<span class="text-[9px] text-outline">12</span>
</div>
<div class="bg-surface-container-low rounded-lg p-1.5 text-center flex flex-col items-center border border-primary/40 bg-primary/10">
<span class="font-label-caps text-[9px] text-primary font-bold">CHA★</span>
<span class="font-stat-numeric text-sm font-bold text-primary">+3</span>
<span class="text-[9px] text-outline">16</span>
</div>
</div>
<div class="bg-surface-container-low rounded-xl p-2.5 flex flex-col gap-1.5 mt-1">
<div class="flex items-center justify-between text-xs">
<span class="text-on-surface flex items-center gap-1 font-semibold"><span class="text-primary text-[10px]">★</span> Représentation (CHA)</span>
<button class="font-formula-sm text-primary font-bold hover:underline" onclick="triggerRoll('Test Représentation', 5)">+5 Roll</button>
</div>
<div class="flex items-center justify-between text-xs">
<span class="text-on-surface flex items-center gap-1 font-semibold"><span class="text-primary text-[10px]">★</span> Persuasion (CHA)</span>
<button class="font-formula-sm text-primary font-bold hover:underline" onclick="triggerRoll('Test Persuasion', 5)">+5 Roll</button>
</div>
<div class="flex items-center justify-between text-xs">
<span class="text-on-surface flex items-center gap-1 font-semibold"><span class="text-primary text-[10px]">★</span> Acrobaties (DEX)</span>
<button class="font-formula-sm text-secondary font-bold hover:underline" onclick="triggerRoll('Test Acrobaties', 4)">+4 Roll</button>
</div>
<div class="flex items-center justify-between text-xs">
<span class="text-on-surface-variant flex items-center gap-1 font-medium"><span class="text-outline text-[10px]">•</span> Discrétion (DEX - Jack)</span>
<button class="font-formula-sm text-outline font-bold hover:underline" onclick="triggerRoll('Test Discrétion (Jack)', 3)">+3 Roll</button>
</div>
</div>
</div>
</div>
</div>
</div>
<script>
  // Character Vitality State
  let currentHp = 48;
  const maxHp = 48;
  let tempHp = 0;
  let isBladesongActive = true;
  let hasInspiration = true;
  let remainingHitDice = 5;

  function changeHp(delta) {
    currentHp = Math.max(0, Math.min(maxHp, currentHp + delta));
    const hpElem = document.getElementById('current-hp');
    const barElem = document.getElementById('hp-bar-fill');
    if (hpElem) hpElem.innerText = currentHp;
    if (barElem) {
      const pct = (currentHp / maxHp) * 100;
      barElem.style.width = pct + '%';
      if (pct <= 25) {
        barElem.className = 'h-full bg-error transition-all duration-300 rounded-full';
      } else if (pct <= 50) {
        barElem.className = 'h-full bg-primary transition-all duration-300 rounded-full';
      } else {
        barElem.className = 'h-full bg-secondary-container transition-all duration-300 rounded-full';
      }
    }
  }

  function adjustTempHp(amount) {
    tempHp = (tempHp === 0) ? 8 : 0;
    const btn = document.getElementById('temp-hp-display');
    if (btn) btn.innerText = '+' + tempHp;
  }

  function spendHitDice() {
    if (remainingHitDice > 0) {
      remainingHitDice--;
      document.getElementById('hit-dice-display').innerText = remainingHitDice + '/7d6';
      showToast('Spent Hit Die', 'Regained 1d6+2 HP');
      changeHp(6);
    } else {
      showToast('No Hit Dice Left', 'Requires a Long Rest');
    }
  }

  function toggleBladesong() {
    isBladesongActive = !isBladesongActive;
    const acEl = document.getElementById('ac-value');
    const spdEl = document.getElementById('speed-value');
    const btn = document.getElementById('bladesong-toggle-btn');
    if (isBladesongActive) {
      if (acEl) acEl.innerText = '20';
      if (spdEl) spdEl.innerText = '40';
      if (btn) {
        btn.innerText = 'Deactivate';
        btn.className = 'px-space-sm py-1 rounded-md bg-secondary text-on-secondary font-label-caps text-label-caps uppercase font-bold active:scale-95 transition-transform flex-shrink-0 shadow-sm';
      }
      showToast('Bladesong Activated', '+4 AC, +10ft Speed, +4 Conc');
    } else {
      if (acEl) acEl.innerText = '16';
      if (spdEl) spdEl.innerText = '30';
      if (btn) {
        btn.innerText = 'Activate';
        btn.className = 'px-space-sm py-1 rounded-md bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps uppercase font-bold active:scale-95 transition-transform flex-shrink-0';
      }
      showToast('Bladesong Ended', 'Returned to base defenses');
    }
  }

  function toggleInspiration() {
    hasInspiration = !hasInspiration;
    const btn = document.getElementById('inspiration-btn');
    if (btn) {
      if (hasInspiration) {
        btn.className = 'flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-high text-primary hover:bg-surface-bright transition-all active:scale-95';
        showToast('Inspiration Ready', 'Reroll any d20 check');
      } else {
        btn.className = 'flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all active:scale-95 opacity-50';
        showToast('Inspiration Expended', 'Heroic reroll used');
      }
    }
  }

  function togglePip(button) {
    if (button.classList.contains('bg-secondary')) {
      button.className = 'w-6 h-6 rounded-md bg-surface-container-highest flex items-center justify-center text-on-surface-variant active:scale-90 transition-transform';
    } else {
      button.className = 'w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-on-secondary shadow-sm active:scale-90 transition-transform';
    }
  }

  function toggleRecovery(button) {
    if (button.innerText.includes('Ready')) {
      button.innerText = '0/1 Used';
      button.className = 'px-2.5 py-1 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm font-bold opacity-60';
      showToast('Arcane Recovery Used', 'Recovered up to 4 spell slot levels');
    } else {
      button.innerText = '1/1 Ready';
      button.className = 'px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-formula-sm text-formula-sm font-bold active:scale-95 transition-all shadow-sm';
    }
  }

  function resetResources() {
    remainingHitDice = 7;
    document.getElementById('hit-dice-display').innerText = '7/7d6';
    currentHp = maxHp;
    changeHp(0);
    showToast('Long Rest Completed', 'All HP, Hit Dice, and spell slots replenished');
  }

  function toggleSpellSlot(btn, counterId) {
    const isAvailable = btn.classList.contains('bg-primary');
    if (isAvailable) {
      btn.className = 'w-6 h-6 rotate-45 rounded-sm bg-surface-container-highest text-outline flex items-center justify-center transition-all active:scale-90 opacity-60';
      btn.firstElementChild.innerText = '◇';
    } else {
      btn.className = 'w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm';
      btn.firstElementChild.innerText = '◆';
    }

    // Update parent count
    const parentContainer = btn.parentElement;
    const activeCount = parentContainer.querySelectorAll('.bg-primary').length;
    const totalCount = parentContainer.children.length;
    const countDisplay = document.getElementById(counterId);
    if (countDisplay) {
      countDisplay.innerText = activeCount + '/' + totalCount;
    }
  }

  function selectCombatTab(btn, targetId) {
    document.querySelectorAll('.combat-tab').forEach(b => {
      b.className = 'combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface';
    });
    btn.className = 'combat-tab flex-1 py-1.5 px-3 rounded-lg bg-surface-container-high text-primary font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center';

    document.querySelectorAll('.combat-view').forEach(v => {
      v.classList.add('hidden');
      v.classList.remove('flex');
    });

    const activeView = document.getElementById(targetId);
    if (activeView) {
      activeView.classList.remove('hidden');
      activeView.classList.add('flex');
    }
  }

  function triggerRoll(title, mod, formula = '1d20') {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    const isCrit = d20 === 20;
    const isFumble = d20 === 1;

    let descriptor = `(Nat ${d20} + ${mod})`;
    if (isCrit) descriptor = `(NATURAL 20!)`;
    if (isFumble) descriptor = `(CRITICAL MISS)`;

    showToast(title, `${total} <span class="text-body-sm font-formula-sm text-on-surface">${descriptor}</span>`);
  }

  function triggerDamage(title, diceString, type) {
    // Basic dice simulator (e.g. 1d8+4, 2d8, 8d6)
    let total = 0;
    if (diceString === '1d8+4') total = Math.floor(Math.random() * 8) + 1 + 4;
    else if (diceString === '1d8') total = Math.floor(Math.random() * 8) + 1;
    else if (diceString === '2d8') total = Math.floor(Math.random() * 8) + Math.floor(Math.random() * 8) + 2;
    else if (diceString === '2d10') total = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 2;
    else if (diceString === '8d6') total = 28; // Average representation for instant test

    showToast(title, `${total} ${type} <span class="text-body-sm font-formula-sm text-on-surface">(${diceString})</span>`);
  }

  function triggerQuickCast(spellName, level) {
    showToast(`Cast ${spellName}`, `Expended Level ${level} Spell Slot`);
  }

  function breakConcentration() {
    showToast('Concentration Broken', 'Haste dropped: Lethargy for 1 turn');
  }

  let toastTimer = null;
  function showToast(label, resultHtml) {
    const toast = document.getElementById('dice-banner');
    const labelEl = document.getElementById('dice-label');
    const resultEl = document.getElementById('dice-result');

    if (!toast || !labelEl || !resultEl) return;

    labelEl.innerText = label;
    resultEl.innerHTML = resultHtml;

    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }
</script></main><nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.65)]" data-active-classes="text-primary font-semibold"><div class="flex justify-around items-center h-16 px-space-xs"><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[22px]">explore</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Dashboard</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="compendium" href="#"><span class="material-symbols-outlined text-[22px]">local_library</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Library</span></a><a aria-current="page" class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors text-primary font-semibold" data-path="sheet" href="#"><span class="material-symbols-outlined text-[22px]">shield_person</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Sheet</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="spell" href="#"><span class="material-symbols-outlined text-[22px]">auto_fix_high</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Spells</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="abilities" href="#"><span class="material-symbols-outlined text-[22px]">swords</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Features</span></a></div></nav></body></html>

<!-- Character Sheet - Pokemon Menu Concept (Toto, Tata) -->
<!DOCTYPE html>

<html class="dark" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
<title>Feuille de Personnage D&amp;D 5e - Toto, Tata</title>
<!-- Tailwind CSS CDN with forms and container queries -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- FontAwesome for RPG Icons -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>
<!-- Google Fonts: Cinzel Decorative for Fantasy Headers & Rajdhani / Inter for Tactical Readability -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&amp;family=Cinzel+Decorative:wght@700&amp;family=Rajdhani:wght@600;700&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            arcana: {
              obsidian: '#090d16',
              surface: '#111827',
              panel: '#151d30',
              border: '#2a354d',
              gold: '#d4af37',
              goldLight: '#f6e082',
              goldDark: '#8a6e1d',
              crimson: '#e11d48',
              mana: '#38bdf8'
            }
          },
          fontFamily: {
            cinzel: ['"Cinzel"', 'serif'],
            decorative: ['"Cinzel Decorative"', 'serif'],
            tactical: ['"Rajdhani"', 'sans-serif'],
            sans: ['"Inter"', 'sans-serif']
          }
        }
      }
    }
  </script>
<!-- BEGIN: Custom Aesthetic Styles -->
<style data-purpose="rpg-layout-effects">
    /* Subtle starry parchment atmospheric background */
    body {
      background-color: #060911;
      background-image: 
        radial-gradient(circle at 50% 10%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 10% 80%, rgba(56, 189, 248, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 90% 70%, rgba(225, 29, 72, 0.05) 0%, transparent 40%);
      min-height: 100vh;
      -webkit-tap-highlight-color: transparent;
    }

    /* Gold Metallic Gradients & Borders */
    .border-gold-emboss {
      border: 1px solid #d4af37;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.2), inset 0 0 8px rgba(212, 175, 55, 0.15);
    }
    .text-gold-glow {
      text-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
    }
    
    /* 5-Way Isometric / Bevelled Pokémon RPG Hub Layout */
    .menu-hub-grid {
      display: grid;
      grid-template-columns: 80px 1fr 80px;
      grid-template-rows: 58px 90px 58px;
      gap: 5px;
      position: relative;
    }

    /* Polygons replicating the hand-drawn perspective trapezoids */
    .facet-top {
      grid-column: 1 / 4;
      grid-row: 1;
      clip-path: polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%);
    }

    .facet-bottom {
      grid-column: 1 / 4;
      grid-row: 3;
      clip-path: polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%);
    }

    .facet-left {
      grid-column: 1;
      grid-row: 1 / 4;
      clip-path: polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%);
      z-index: 10;
    }

    .facet-right {
      grid-column: 3;
      grid-row: 1 / 4;
      clip-path: polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%);
      z-index: 10;
    }

    .facet-center {
      grid-column: 2;
      grid-row: 2;
      z-index: 20;
    }

    /* Tactile button active states */
    .btn-tactile:active {
      transform: scale(0.96);
    }

    /* Custom Scrollbar for action drawer */
    .custom-scroll::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #2a354d;
      border-radius: 4px;
    }
  </style>
<!-- END: Custom Aesthetic Styles -->
</head>
<body class="text-slate-200 font-sans flex justify-center selection:bg-arcana-gold selection:text-black">
<!-- BEGIN: Mobile Device Frame Container -->
<main class="w-full max-w-[420px] min-h-screen bg-arcana-obsidian/95 border-x border-arcana-border/40 flex flex-col justify-between shadow-2xl relative pb-6 overflow-hidden">
<!-- Top Arcane Ambient Edge -->
<div class="h-1 w-full bg-gradient-to-r from-transparent via-arcana-gold to-transparent opacity-80"></div>
<!-- BEGIN: HeaderAndIdentity -->
<header class="px-4 pt-3 pb-1" data-purpose="character-identity-header">
<!-- Title row directly reflecting sketch: Humain / Barde lvl 2 | Toto, Tata | Artiste -->
<div class="flex items-center justify-between border-b border-arcana-gold/30 pb-2">
<!-- Class & Race -->
<div class="text-left w-1/3">
<p class="text-[11px] uppercase tracking-wider text-arcana-gold font-tactical font-semibold">Humain</p>
<p class="text-xs font-bold text-slate-100 font-cinzel leading-none">Barde <span class="text-arcana-gold">Niv.2</span></p>
</div>
<!-- Character Name (Direct from sketch: "Toto, Tata") -->
<div class="text-center w-1/3">
<h1 class="font-decorative text-lg text-arcana-goldLight tracking-wide font-black truncate drop-shadow text-gold-glow">Toto, Tata</h1>
<span class="inline-block text-[9px] uppercase tracking-widest text-slate-400 font-tactical -mt-1">Inspirateur</span>
</div>
<!-- Background / Profession (Direct from sketch: "Artiste") -->
<div class="text-right w-1/3">
<span class="text-[10px] text-slate-400 block font-tactical uppercase">Historique</span>
<span class="inline-block text-xs font-cinzel font-bold text-amber-200/90 border border-arcana-gold/40 px-2 py-0.5 rounded bg-arcana-surface/80">Artiste</span>
</div>
</div>
</header>
<!-- END: HeaderAndIdentity -->
<!-- BEGIN: HeroPortraitAndStatsHUD -->
<section class="px-4 pt-2 relative" data-purpose="hero-stats-overview">
<div class="relative flex items-center justify-between min-h-[165px]">
<!-- LEFT COLUMN: BM Star & Shield Armor Class (As sketched) -->
<div class="flex flex-col items-center space-y-4 w-16 z-20">
<!-- BM Star (+2 Bonus de Maîtrise) -->
<div class="flex flex-col items-center group cursor-pointer" data-purpose="stat-proficiency-bonus" title="Bonus de Maîtrise">
<div class="relative w-12 h-12 flex items-center justify-center transition-transform transform active:scale-95">
<svg class="w-full h-full fill-arcana-panel stroke-arcana-gold stroke-[4] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" viewbox="0 0 100 100">
<polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36"></polygon>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center pt-0.5">
<span class="text-sm font-black font-tactical text-amber-200 leading-none">+2</span>
</div>
</div>
<span class="text-[11px] font-bold tracking-wider text-arcana-gold font-tactical -mt-0.5">BM</span>
</div>
<!-- Medieval Armor Class Shield: "11" (As sketched) -->
<div class="flex flex-col items-center" data-purpose="stat-armor-class" title="Classe d'Armure (CA)">
<div class="relative w-11 h-13 flex items-center justify-center">
<svg class="w-11 h-13 fill-arcana-panel stroke-arcana-gold/80 stroke-[4] drop-shadow-md" viewbox="0 0 100 120">
<path d="M50 5 L92 20 L92 65 C92 95 50 115 50 115 C50 115 8 95 8 65 L8 20 Z"></path>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center pt-1">
<span class="text-base font-black font-tactical text-white">11</span>
<span class="text-[8px] font-bold text-slate-400 -mt-1 font-tactical uppercase">CA</span>
</div>
</div>
</div>
</div>
<!-- CENTER: Circular Portrait Ring with Top Camera Icon + Overlay Hero (Faithful to Sketch) -->
<div class="relative flex flex-col items-center justify-center z-10 -mt-2">
<!-- Outer Celestial Decorative Rings -->
<div class="relative w-36 h-36 rounded-full p-1 bg-gradient-to-b from-arcana-gold via-arcana-goldDark to-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center">
<!-- Camera Glyph At Apex (from sketch) -->
<button class="absolute -top-2.5 z-30 w-7 h-6 rounded-md bg-arcana-surface border border-arcana-gold flex items-center justify-center text-arcana-gold hover:text-white shadow-lg btn-tactile" title="Changer l'avatar">
<i class="fa-solid fa-camera text-[10px]"></i>
</button>
<!-- Inner Circle Frame with Bard Avatar Vector Art -->
<div class="w-full h-full rounded-full bg-arcana-surface overflow-hidden relative border-2 border-arcana-obsidian flex items-center justify-center">
<!-- Stylized Bard Performer Avatar -->
<svg class="w-full h-full object-cover" viewbox="0 0 140 140">
<defs>
<lineargradient id="bgGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#1e293b"></stop>
<stop offset="100%" stop-color="#0f172a"></stop>
</lineargradient>
<lineargradient id="cloakGrad" x1="0" x2="1" y1="0" y2="1">
<stop offset="0%" stop-color="#7c2d12"></stop>
<stop offset="100%" stop-color="#451a03"></stop>
</lineargradient>
</defs>
<!-- Background aura -->
<circle cx="70" cy="70" fill="url(#bgGrad)" r="70"></circle>
<circle cx="70" cy="50" fill="#d4af37" opacity="0.15" r="28"></circle>
<!-- Hero Cloak/Torso -->
<path d="M25 140 C25 100 45 85 70 85 C95 85 115 100 115 140 Z" fill="url(#cloakGrad)" stroke="#d4af37" stroke-width="1.5"></path>
<!-- Hero Head -->
<circle cx="70" cy="55" fill="#fed7aa" r="22" stroke="#d4af37" stroke-width="1"></circle>
<!-- Feathered Bard Hat -->
<path d="M40 50 Q70 30 100 50 Q70 42 40 50 Z" fill="#991b1b"></path>
<path d="M80 32 C95 18 105 15 100 35" fill="none" stroke="#fef08a" stroke-linecap="round" stroke-width="3"></path>
<!-- Lute Neck/Strings silhouette over shoulder -->
<path d="M45 105 L28 65" stroke="#f59e0b" stroke-linecap="round" stroke-width="3.5"></path>
<circle cx="28" cy="65" fill="#d97706" r="4"></circle>
</svg>
<!-- Arcane vignette -->
<div class="absolute inset-0 bg-radial-vignette pointer-events-none rounded-full ring-1 ring-inset ring-white/10"></div>
</div>
</div>
<!-- THE 3-BUBBLE HP CLUSTER ANCHORED AT CIRCLE BOTTOM EDGE (Exactly matching sketch) -->
<div class="relative -mt-6 z-30 flex items-center space-x-1.5 filter drop-shadow-lg" data-purpose="hp-cluster-controller">
<!-- Left Bubble: -1 HP Quick Decrease -->
<button class="w-9 h-9 rounded-full bg-arcana-surface border-2 border-arcana-crimson/90 text-rose-300 hover:bg-rose-950 font-tactical font-black text-sm flex items-center justify-center btn-tactile shadow-md" id="hp-minus-btn" title="Retirer 1 PV">
              -1
            </button>
<!-- Center Pill: Current HP / Max HP (9/9) -->
<div class="h-9 px-3.5 rounded-full bg-gradient-to-r from-arcana-panel via-slate-900 to-arcana-panel border-2 border-arcana-gold flex items-center justify-center space-x-1 shadow-inner">
<span class="text-[10px] text-slate-400 font-tactical uppercase">PV</span>
<span class="text-base font-black font-tactical text-emerald-400 leading-none" id="current-hp">9</span>
<span class="text-slate-500 font-bold text-xs">/</span>
<span class="text-xs font-bold font-tactical text-slate-300 leading-none">9</span>
</div>
<!-- Right Bubble: +1 HP Quick Increase -->
<button class="w-9 h-9 rounded-full bg-arcana-surface border-2 border-emerald-500/90 text-emerald-300 hover:bg-emerald-950 font-tactical font-black text-sm flex items-center justify-center btn-tactile shadow-md" id="hp-plus-btn" title="Ajouter 1 PV">
              +1
            </button>
<!-- Temporary HP Badge: "🛡️ +1" (Immediately next to HP in sketch) -->
<div class="h-8 px-2 rounded-lg bg-blue-950/80 border border-arcana-mana/80 flex items-center space-x-1 ml-0.5 shadow" title="Points de Vie Temporaires">
<i class="fa-solid fa-shield-halved text-arcana-mana text-[10px]"></i>
<span class="text-xs font-black font-tactical text-cyan-200">+1</span>
</div>
</div>
</div>
<!-- RIGHT COLUMN: Speed Metric & Initiative (As sketched) -->
<div class="flex flex-col items-center space-y-4 w-16 z-20">
<!-- Running Foot & 9m Speed (Sketch: 3 dashes + foot + "9m") -->
<div class="flex flex-col items-center cursor-pointer group" data-purpose="stat-speed" title="Vitesse de déplacement">
<div class="w-11 h-11 rounded-xl bg-arcana-panel border border-arcana-border flex flex-col items-center justify-center group-hover:border-arcana-gold transition-colors">
<div class="flex items-center space-x-0.5 text-arcana-gold text-xs">
<i class="fa-solid fa-angles-right text-[9px] opacity-75"></i>
<i class="fa-solid fa-shoe-prints -rotate-90 text-[11px]"></i>
</div>
<span class="text-sm font-black font-tactical text-slate-100 leading-tight">9m</span>
</div>
<span class="text-[10px] font-bold text-slate-400 font-tactical uppercase">Vitesse</span>
</div>
<!-- Initiative Lightning Bolt: "+2 Init" (As sketched) -->
<div class="flex flex-col items-center cursor-pointer group" data-purpose="stat-initiative" title="Modificateur d'Initiative">
<div class="w-11 h-11 rounded-xl bg-arcana-panel border border-arcana-border flex flex-col items-center justify-center group-hover:border-arcana-gold transition-colors">
<i class="fa-solid fa-bolt text-amber-400 text-xs leading-none"></i>
<span class="text-sm font-black font-tactical text-amber-200 leading-tight">+2</span>
</div>
<span class="text-[10px] font-bold text-slate-400 font-tactical uppercase">Init</span>
</div>
</div>
</div>
</section>
<!-- END: HeroPortraitAndStatsHUD -->
<!-- BEGIN: PokemonIsometricCommandHub -->
<!-- Faithful rendering of the 5-facet perspective central menu box from image.png -->
<section class="px-3 pt-4 pb-2" data-purpose="5-way-isometric-rpg-menu">
<div class="text-center mb-1">
<span class="text-[10px] uppercase font-tactical tracking-widest text-arcana-gold/70">Menu Tactique Arcana</span>
</div>
<!-- The 5-Perspective Bevelled Grid -->
<div class="relative bg-black/60 p-1.5 rounded-2xl border border-arcana-gold/40 shadow-[0_4px_25px_rgba(0,0,0,0.8)] overflow-hidden">
<div class="menu-hub-grid">
<!-- 1. TOP FACET: TRAITS -->
<button class="facet-top bg-gradient-to-b from-arcana-panel to-slate-900 hover:from-arcana-gold/20 hover:to-slate-800 border-t-2 border-arcana-gold text-center flex items-center justify-center group transition-all btn-tactile" id="tab-traits" onclick="switchCategory('traits')">
<div class="flex items-center space-x-1.5 pb-2">
<i class="fa-solid fa-scroll text-arcana-gold group-hover:scale-110 text-xs"></i>
<span class="font-cinzel text-xs font-black tracking-widest text-slate-200 group-hover:text-arcana-goldLight">TRAITS</span>
</div>
</button>
<!-- 2. LEFT FACET: SAC / INVENTAIRE (Backpack from sketch) -->
<button class="facet-left bg-gradient-to-r from-arcana-panel to-slate-900 hover:from-arcana-gold/20 border-l-2 border-arcana-gold flex flex-col items-center justify-center text-center group transition-all btn-tactile pr-2" id="tab-inventory" onclick="switchCategory('inventory')">
<i class="fa-solid fa-sack-dollar text-slate-300 group-hover:text-arcana-gold text-lg mb-0.5"></i>
<span class="font-tactical text-[11px] font-bold tracking-wider text-slate-300 uppercase">SAC</span>
</button>
<!-- 3. CENTER CORE: ACTIONS (Prominent rectangular core screen from sketch) -->
<button class="facet-center bg-gradient-to-b from-amber-900/60 via-arcana-panel to-black border-2 border-arcana-gold rounded-lg flex flex-col items-center justify-center p-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] group btn-tactile ring-2 ring-arcana-gold/30" id="tab-actions" onclick="switchCategory('actions')">
<span class="inline-block text-[9px] uppercase font-tactical font-bold text-amber-300 tracking-wider">Actif</span>
<span class="font-cinzel text-base font-black text-arcana-goldLight tracking-wider group-hover:scale-105 transition-transform">ACTIONS</span>
<span class="text-[9px] text-slate-400 font-tactical">Attaques &amp; Tours</span>
</button>
<!-- 4. RIGHT FACET: SORTS (Star wand with sparks from sketch) -->
<button class="facet-right bg-gradient-to-l from-arcana-panel to-slate-900 hover:from-arcana-gold/20 border-r-2 border-arcana-gold flex flex-col items-center justify-center text-center group transition-all btn-tactile pl-2" id="tab-spells" onclick="switchCategory('spells')">
<i class="fa-solid fa-wand-magic-sparkles text-arcana-mana group-hover:text-cyan-300 text-lg mb-0.5"></i>
<span class="font-tactical text-[11px] font-bold tracking-wider text-slate-300 uppercase">SORTS</span>
</button>
<!-- 5. BOTTOM FACET: CARACT / COMPÉTENCES (From sketch) -->
<button class="facet-bottom bg-gradient-to-t from-arcana-panel to-slate-900 hover:from-arcana-gold/20 hover:to-slate-800 border-b-2 border-arcana-gold text-center flex items-center justify-center group transition-all btn-tactile" id="tab-skills" onclick="switchCategory('skills')">
<div class="flex items-center space-x-1.5 pt-2">
<i class="fa-solid fa-dice-d20 text-arcana-gold group-hover:rotate-45 transition-transform text-xs"></i>
<span class="font-cinzel text-[11px] font-black tracking-widest text-slate-200 group-hover:text-arcana-goldLight">CARACT / COMPÉTENCES</span>
</div>
</button>
</div>
</div>
</section>
<!-- END: PokemonIsometricCommandHub -->
<!-- BEGIN: DynamicDetailDeck -->
<!-- Content drawer adapting seamlessly according to the selected facet -->
<section class="px-4 flex-1 flex flex-col" data-purpose="active-view-container">
<!-- View Title & Quick Rest Buttons -->
<div class="flex items-center justify-between py-2 border-b border-arcana-border/50">
<div class="flex items-center space-x-2">
<span class="w-2 h-2 rounded-full bg-arcana-gold animate-pulse"></span>
<h2 class="font-cinzel text-sm font-black text-arcana-goldLight uppercase tracking-wide" id="view-title">Actions de Combat</h2>
</div>
<!-- Rest Actions -->
<div class="flex items-center space-x-1.5 text-[10px] font-tactical">
<button class="px-2 py-1 rounded bg-arcana-surface border border-arcana-border hover:border-arcana-gold text-slate-300 transition-colors btn-tactile">
<i class="fa-solid fa-campground text-[9px] mr-1 text-amber-400"></i>Court
          </button>
<button class="px-2 py-1 rounded bg-arcana-surface border border-arcana-border hover:border-arcana-gold text-slate-300 transition-colors btn-tactile">
<i class="fa-solid fa-bed text-[9px] mr-1 text-arcana-mana"></i>Long
          </button>
</div>
</div>
<!-- Action Cards View (Default Active State matching Sketch) -->
<div class="space-y-2 mt-2 max-h-[220px] overflow-y-auto pr-1 custom-scroll" id="content-deck">
<!-- Card 1: Rapière d'artiste (Weapon Attack) -->
<div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
<div class="flex items-center space-x-2.5">
<div class="w-9 h-9 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-arcana-gold">
<i class="fa-solid fa-khanda text-sm"></i>
</div>
<div>
<h3 class="text-xs font-bold text-slate-100 font-cinzel">Rapière d'artiste</h3>
<p class="text-[11px] text-slate-400 font-tactical">Attaque CàC • Finesse</p>
</div>
</div>
<div class="flex items-center space-x-2">
<button class="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-arcana-panel to-slate-800 border border-arcana-gold/50 text-arcana-goldLight font-tactical font-black text-xs btn-tactile hover:bg-arcana-gold hover:text-black" onclick="simulateRoll('Rapière (Attaque)', '1d20+4')">
              +4 <span class="text-[10px] font-normal text-slate-300">Toucher</span>
</button>
<button class="px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-tactical font-bold text-xs btn-tactile" onclick="simulateRoll('Rapière (Dégâts)', '1d8+2 Perforant')">
              1d8+2
            </button>
</div>
</div>
<!-- Card 2: Moquerie Cruelle (Vicious Mockery - Bard Cantrip) -->
<div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
<div class="flex items-center space-x-2.5">
<div class="w-9 h-9 rounded-lg bg-purple-950/40 border border-purple-500/40 flex items-center justify-center text-purple-300">
<i class="fa-solid fa-masks-theater text-sm"></i>
</div>
<div>
<h3 class="text-xs font-bold text-slate-100 font-cinzel">Moquerie cruelle</h3>
<p class="text-[11px] text-slate-400 font-tactical">Tour de magie • Portée 18m</p>
</div>
</div>
<div class="flex items-center space-x-2">
<span class="text-[10px] font-tactical text-amber-300 bg-amber-950/40 px-2 py-1 rounded border border-amber-600/30">
              JS SAG 13
            </span>
<button class="px-2 py-1.5 rounded-lg bg-purple-900/60 border border-purple-500/50 text-purple-200 font-tactical font-bold text-xs btn-tactile" onclick="simulateRoll('Moquerie Cruelle', '1d4 Psychique')">
              1d4 Psy
            </button>
</div>
</div>
<!-- Card 3: Inspiration Bardique (Class Trait Resource) -->
<div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
<div class="flex items-center space-x-2.5">
<div class="w-9 h-9 rounded-lg bg-cyan-950/40 border border-arcana-mana/40 flex items-center justify-center text-arcana-mana">
<i class="fa-solid fa-music text-sm"></i>
</div>
<div>
<h3 class="text-xs font-bold text-slate-100 font-cinzel">Inspiration bardique</h3>
<p class="text-[11px] text-slate-400 font-tactical">Action bonus • Dé d6</p>
</div>
</div>
<div class="flex items-center space-x-1.5">
<!-- 3 Resource slots -->
<div class="flex space-x-1">
<span class="w-3 h-3 rounded-full bg-arcana-mana shadow-[0_0_6px_rgba(56,189,248,0.8)]"></span>
<span class="w-3 h-3 rounded-full bg-arcana-mana shadow-[0_0_6px_rgba(56,189,248,0.8)]"></span>
<span class="w-3 h-3 rounded-full bg-arcana-mana shadow-[0_0_6px_rgba(56,189,248,0.8)]"></span>
</div>
<button class="ml-2 px-2.5 py-1 rounded bg-slate-800 border border-arcana-mana text-arcana-mana font-tactical font-bold text-xs btn-tactile" onclick="simulateRoll('Inspiration Bardique Donnée', '1d6')">
              Donner d6
            </button>
</div>
</div>
</div>
<!-- Quick Dice Roll Outcome Notification Bar -->
<div class="mt-2 py-1.5 px-3 rounded-lg bg-arcana-panel border border-arcana-gold/40 flex items-center justify-between text-xs" id="dice-banner">
<span class="text-slate-400 font-tactical"><i class="fa-solid fa-dice text-arcana-gold mr-1.5"></i>Journal de dés:</span>
<span class="font-tactical font-bold text-arcana-goldLight" id="dice-result">Prêt pour le lancer</span>
</div>
</section>
<!-- END: DynamicDetailDeck -->
<!-- BEGIN: QuickAttributeBar (Bottom Stats Strip) -->
<footer class="mt-3 px-4 pt-2 border-t border-arcana-border/40" data-purpose="quick-attribute-footer">
<div class="grid grid-cols-6 gap-1 text-center font-tactical">
<!-- STR -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">FOR</span>
<span class="font-bold text-xs text-slate-200">10</span>
<span class="text-[9px] text-slate-400">+0</span>
</div>
<!-- DEX -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">DEX</span>
<span class="font-bold text-xs text-amber-300">15</span>
<span class="text-[9px] text-amber-400 font-semibold">+2</span>
</div>
<!-- CON -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">CON</span>
<span class="font-bold text-xs text-slate-200">12</span>
<span class="text-[9px] text-slate-400">+1</span>
</div>
<!-- INT -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">INT</span>
<span class="font-bold text-xs text-slate-200">13</span>
<span class="text-[9px] text-slate-400">+1</span>
</div>
<!-- WIS -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">SAG</span>
<span class="font-bold text-xs text-slate-200">10</span>
<span class="text-[9px] text-slate-400">+0</span>
</div>
<!-- CHA -->
<div class="p-1 rounded bg-amber-950/30 border border-arcana-gold/50 shadow-sm">
<span class="block text-[9px] text-arcana-gold font-bold">CHA</span>
<span class="font-bold text-xs text-arcana-goldLight">16</span>
<span class="text-[9px] text-amber-300 font-black">+3</span>
</div>
</div>
</footer>
<!-- END: QuickAttributeBar -->
</main>
<!-- END: Mobile Device Frame Container -->
<!-- BEGIN: Logic & Interactivity Scripts -->
<script data-purpose="hp-counter-logic">
    // Interactive HP Bubble handlers faithfully matching sketch functionality
    let currentHP = 9;
    const maxHP = 9;
    const hpDisplay = document.getElementById('current-hp');
    const minusBtn = document.getElementById('hp-minus-btn');
    const plusBtn = document.getElementById('hp-plus-btn');

    minusBtn.addEventListener('click', () => {
      if (currentHP > 0) {
        currentHP--;
        updateHPDisplay();
      }
    });

    plusBtn.addEventListener('click', () => {
      currentHP++;
      updateHPDisplay();
    });

    function updateHPDisplay() {
      hpDisplay.textContent = currentHP;
      if (currentHP <= 3) {
        hpDisplay.className = 'text-base font-black font-tactical text-rose-500 animate-pulse leading-none';
      } else if (currentHP > maxHP) {
        hpDisplay.className = 'text-base font-black font-tactical text-cyan-300 leading-none';
      } else {
        hpDisplay.className = 'text-base font-black font-tactical text-emerald-400 leading-none';
      }
    }
  </script>
<script data-purpose="category-switching-and-dice-roller">
    // 5-way tactical deck content store
    const categoryContent = {
      actions: {
        title: "Actions de Combat",
        html: `
          <!-- Rapière -->
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-arcana-gold">
                <i class="fa-solid fa-khanda text-sm"></i>
              </div>
              <div>
                <h3 class="text-xs font-bold text-slate-100 font-cinzel">Rapière d'artiste</h3>
                <p class="text-[11px] text-slate-400 font-tactical">Attaque CàC • Finesse</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="simulateRoll('Rapière (Attaque)', '1d20+4')" class="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-arcana-panel to-slate-800 border border-arcana-gold/50 text-arcana-goldLight font-tactical font-black text-xs btn-tactile">
                +4 <span class="text-[10px] font-normal text-slate-300">Toucher</span>
              </button>
              <button onclick="simulateRoll('Rapière (Dégâts)', '1d8+2 Perforant')" class="px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-tactical font-bold text-xs btn-tactile">
                1d8+2
              </button>
            </div>
          </div>
          <!-- Moquerie Cruelle -->
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-lg bg-purple-950/40 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <i class="fa-solid fa-masks-theater text-sm"></i>
              </div>
              <div>
                <h3 class="text-xs font-bold text-slate-100 font-cinzel">Moquerie cruelle</h3>
                <p class="text-[11px] text-slate-400 font-tactical">Tour de magie • Portée 18m</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-[10px] font-tactical text-amber-300 bg-amber-950/40 px-2 py-1 rounded border border-amber-600/30">JS SAG 13</span>
              <button onclick="simulateRoll('Moquerie Cruelle', '1d4 Psychique')" class="px-2 py-1.5 rounded-lg bg-purple-900/60 border border-purple-500/50 text-purple-200 font-tactical font-bold text-xs btn-tactile">
                1d4 Psy
              </button>
            </div>
          </div>
          <!-- Inspiration -->
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-lg bg-cyan-950/40 border border-arcana-mana/40 flex items-center justify-center text-arcana-mana">
                <i class="fa-solid fa-music text-sm"></i>
              </div>
              <div>
                <h3 class="text-xs font-bold text-slate-100 font-cinzel">Inspiration bardique</h3>
                <p class="text-[11px] text-slate-400 font-tactical">Action bonus • Dé d6</p>
              </div>
            </div>
            <div class="flex items-center space-x-1.5">
              <div class="flex space-x-1">
                <span class="w-2.5 h-2.5 rounded-full bg-arcana-mana"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-arcana-mana"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-arcana-mana"></span>
              </div>
              <button onclick="simulateRoll('Inspiration Bardique', '1d6')" class="ml-2 px-2 py-1 rounded bg-slate-800 border border-arcana-mana text-arcana-mana font-tactical font-bold text-xs btn-tactile">
                d6
              </button>
            </div>
          </div>
        `
      },
      traits: {
        title: "Traits & Dons de Barde",
        html: `
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border space-y-1">
            <div class="flex justify-between items-center">
              <span class="font-cinzel text-xs font-bold text-arcana-gold">Touche-à-tout (Jack of All Trades)</span>
              <span class="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-tactical">Niv.2 Passif</span>
            </div>
            <p class="text-xs text-slate-400 leading-tight">Vous ajoutez la moitié de votre bonus de maîtrise (+1) à tout test de caractéristique qui n'en bénéficie pas déjà.</p>
          </div>
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border space-y-1">
            <div class="flex justify-between items-center">
              <span class="font-cinzel text-xs font-bold text-arcana-gold">Chant de repos (Song of Rest)</span>
              <span class="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-tactical">1d6 Suppl.</span>
            </div>
            <p class="text-xs text-slate-400 leading-tight">Aide les alliés à récupérer leurs forces durant un repos court (+1d6 PV soignés).</p>
          </div>
        `
      },
      inventory: {
        title: "Sacoche & Équipement",
        html: `
          <div class="grid grid-cols-2 gap-2">
            <div class="p-2 rounded-lg bg-arcana-surface border border-arcana-border flex items-center space-x-2">
              <i class="fa-solid fa-guitar text-arcana-gold text-sm"></i>
              <div>
                <p class="text-xs font-bold text-slate-200">Luth ouvragé</p>
                <p class="text-[10px] text-slate-400 font-tactical">Instrument fétiche</p>
              </div>
            </div>
            <div class="p-2 rounded-lg bg-arcana-surface border border-arcana-border flex items-center space-x-2">
              <i class="fa-solid fa-shield text-slate-400 text-sm"></i>
              <div>
                <p class="text-xs font-bold text-slate-200">Armure de cuir</p>
                <p class="text-[10px] text-slate-400 font-tactical">CA 11 (+2 Dex)</p>
              </div>
            </div>
            <div class="p-2 rounded-lg bg-arcana-surface border border-arcana-border flex items-center space-x-2 col-span-2 justify-between">
              <span class="text-xs text-slate-300"><i class="fa-solid fa-coins text-amber-400 mr-1.5"></i>Bourse d'aventurier:</span>
              <span class="font-tactical font-black text-amber-300 text-sm">24 PO • 15 PA</span>
            </div>
          </div>
        `
      },
      spells: {
        title: "Grimoire de Sorts (Emplacements 2/2)",
        html: `
          <div class="p-2 rounded-xl bg-arcana-surface/90 border border-arcana-border flex justify-between items-center">
            <div>
              <h4 class="text-xs font-cinzel font-bold text-cyan-200">Murmures dissonants</h4>
              <p class="text-[10px] text-slate-400 font-tactical">Niv.1 • 3d6 Psychique + Fuite</p>
            </div>
            <button onclick="simulateRoll('Sort: Murmures Dissonants', '3d6 Psychique')" class="px-2 py-1 rounded bg-cyan-950 border border-arcana-mana text-cyan-300 font-tactical text-xs font-bold btn-tactile">Lancer (Niv 1)</button>
          </div>
          <div class="p-2 rounded-xl bg-arcana-surface/90 border border-arcana-border flex justify-between items-center">
            <div>
              <h4 class="text-xs font-cinzel font-bold text-cyan-200">Mot de guérison</h4>
              <p class="text-[10px] text-slate-400 font-tactical">Niv.1 • Action bonus • Soin 1d4+3</p>
            </div>
            <button onclick="simulateRoll('Sort: Mot de Guérison', '1d4+3 PV')" class="px-2 py-1 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-tactical text-xs font-bold btn-tactile">Soigner</button>
          </div>
        `
      },
      skills: {
        title: "Compétences Maîtrisées",
        html: `
          <div class="grid grid-cols-2 gap-1.5 text-xs font-tactical">
            <div class="p-1.5 rounded bg-arcana-surface border border-arcana-gold/40 flex justify-between">
              <span class="text-amber-200 font-semibold"><i class="fa-solid fa-star text-[9px] text-arcana-gold mr-1"></i>Représentation</span>
              <span class="font-black text-white">+5</span>
            </div>
            <div class="p-1.5 rounded bg-arcana-surface border border-arcana-gold/40 flex justify-between">
              <span class="text-amber-200 font-semibold"><i class="fa-solid fa-star text-[9px] text-arcana-gold mr-1"></i>Persuasion</span>
              <span class="font-black text-white">+5</span>
            </div>
            <div class="p-1.5 rounded bg-arcana-surface border border-arcana-border flex justify-between">
              <span class="text-slate-300">Acrobaties</span>
              <span class="font-bold text-slate-200">+4</span>
            </div>
            <div class="p-1.5 rounded bg-arcana-surface border border-arcana-border flex justify-between">
              <span class="text-slate-300">Tromperie</span>
              <span class="font-bold text-slate-200">+5</span>
            </div>
          </div>
        `
      }
    };

    function switchCategory(key) {
      const selected = categoryContent[key];
      if (!selected) return;

      document.getElementById('view-title').textContent = selected.title;
      document.getElementById('content-deck').innerHTML = selected.html;

      // Highlight active central hub styling
      const buttons = ['traits', 'inventory', 'actions', 'spells', 'skills'];
      buttons.forEach(b => {
        const el = document.getElementById(`tab-${b}`);
        if (!el) return;
        if (b === key) {
          el.classList.add('ring-2', 'ring-arcana-gold');
        } else {
          el.classList.remove('ring-2', 'ring-arcana-gold');
        }
      });
    }

    function simulateRoll(name, diceNotation) {
      const banner = document.getElementById('dice-result');
      // Simple RNG simulation
      let randomVal = Math.floor(Math.random() * 20) + 1;
      banner.innerHTML = `<span class="text-white font-bold">${name}:</span> <span class="text-emerald-400 font-black">${randomVal}</span> <span class="text-[10px] text-slate-400">(${diceNotation})</span>`;
    }
  </script>
<!-- END: Logic & Interactivity Scripts -->
</body></html>

<!-- Character Sheet - Action Economy & Resource Architecture (Desktop) -->
<!DOCTYPE html>

<html class="dark" lang="en" style=""><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"surface-dim":"#0f131d","on-tertiary-fixed":"#000767","error-container":"#93000a","inverse-surface":"#dfe2f0","surface-container-highest":"#313540","surface-container":"#1b1f2a","surface-tint":"#e9c349","on-secondary-fixed-variant":"#004c69","on-tertiary-container":"#2d38a1","on-surface":"#dfe2f0","inverse-primary":"#735c00","secondary-fixed":"#c4e7ff","surface":"#0f131d","surface-container-low":"#171b26","on-primary-fixed":"#241a00","primary-fixed-dim":"#e9c349","secondary-container":"#00a6e0","inverse-on-surface":"#2c303b","on-tertiary":"#131e8c","tertiary-fixed-dim":"#bdc2ff","primary-container":"#d4af37","tertiary":"#c7cbff","outline-variant":"#4d4635","on-secondary-fixed":"#001e2c","on-tertiary-fixed-variant":"#2f3aa3","on-background":"#dfe2f0","on-surface-variant":"#d0c5af","outline":"#99907c","secondary":"#7bd0ff","secondary-fixed-dim":"#7bd0ff","background":"#0f131d","tertiary-fixed":"#e0e0ff","on-primary":"#3c2f00","on-error":"#690005","on-secondary":"#00354a","on-secondary-container":"#00374d","surface-container-lowest":"#0a0e18","primary-fixed":"#ffe088","error":"#ffb4ab","tertiary-container":"#a5adff","on-primary-container":"#554300","surface-bright":"#353944","primary":"#f2ca50","surface-container-high":"#262a34","surface-variant":"#313540","on-error-container":"#ffdad6","on-primary-fixed-variant":"#574500"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"margin":"2rem","margin-mobile":"1rem","gutter":"1.5rem","space-sm":"0.5rem","space-xl":"2.5rem","space-lg":"1.5rem","space-md":"1rem","space-xs":"0.25rem","gutter-mobile":"0.75rem"},"fontFamily":{"label-caps":["Plus Jakarta Sans"],"stat-numeric":["JetBrains Mono"],"headline-sm":["Playfair Display"],"display-lg-mobile":["Playfair Display"],"stat-modifier":["JetBrains Mono"],"headline-lg-mobile":["Playfair Display"],"body-md":["Plus Jakarta Sans"],"display-lg":["Playfair Display"],"formula-sm":["JetBrains Mono"],"body-sm":["Plus Jakarta Sans"],"headline-lg":["Playfair Display"],"headline-md":["Playfair Display"],"body-lg":["Plus Jakarta Sans"]},"fontSize":{"label-caps":["11px",{"lineHeight":"14px","letterSpacing":"0.08em","fontWeight":"700"}],"stat-numeric":["24px",{"lineHeight":"28px","letterSpacing":"-0.02em","fontWeight":"700"}],"headline-sm":["18px",{"lineHeight":"24px","letterSpacing":"0.02em","fontWeight":"600"}],"display-lg-mobile":["30px",{"lineHeight":"36px","letterSpacing":"-0.01em","fontWeight":"700"}],"stat-modifier":["16px",{"lineHeight":"20px","letterSpacing":"0em","fontWeight":"600"}],"headline-lg-mobile":["24px",{"lineHeight":"32px","letterSpacing":"0em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","letterSpacing":"0.01em","fontWeight":"400"}],"display-lg":["40px",{"lineHeight":"48px","letterSpacing":"-0.01em","fontWeight":"700"}],"formula-sm":["11px",{"lineHeight":"14px","letterSpacing":"0.02em","fontWeight":"500"}],"body-sm":["12px",{"lineHeight":"16px","letterSpacing":"0.02em","fontWeight":"400"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"0em","fontWeight":"600"}],"headline-md":["22px",{"lineHeight":"28px","letterSpacing":"0.01em","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"24px","letterSpacing":"0em","fontWeight":"400"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.4)]"><div class="flex flex-col"><div class="h-16 px-space-md flex items-center justify-between bg-surface-container-lowest/60"><div class="flex items-center gap-space-sm"><div class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.25)]"><span class="material-symbols-outlined text-on-primary-container text-[20px]">auto_stories</span></div><div><span class="font-headline-sm text-headline-sm text-primary tracking-wide block leading-none">ARCANA 5E</span><span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase tracking-widest block">2024 Codex</span></div></div><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span></div></div><div class="p-space-sm"><div class="bg-surface-container rounded-lg p-space-sm flex items-center justify-between"><div class="flex items-center gap-space-sm overflow-hidden"><div class="w-8 h-8 rounded-full bg-surface-container-high flex-shrink-0 flex items-center justify-center"><span class="material-symbols-outlined text-primary text-[18px]">swords</span></div><div class="min-w-0"><span class="font-body-sm text-body-sm font-semibold text-on-surface truncate block">Aeloria Silvervein</span><span class="font-formula-sm text-formula-sm text-on-surface-variant truncate block">Lv.7 Bladesinger</span></div></div><button class="p-space-xs text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">unfold_more</span></button></div></div><nav class="flex flex-col gap-space-xs px-space-sm py-space-xs" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg"><a aria-current="page" class="flex items-center gap-space-sm px-space-md py-space-sm transition-all bg-primary-container text-on-primary-container font-semibold rounded-lg" data-path="character-sheet" href="#"><span class="material-symbols-outlined text-[18px]">shield_person</span><span class="font-body-md text-body-md">Character Sheet</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="grimoire-spells" href="#"><span class="material-symbols-outlined text-[18px]">magic_button</span><span class="font-body-md text-body-md">Spell Grimoire</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="tactical-combat" href="#"><span class="material-symbols-outlined text-[18px]">sports_martial_arts</span><span class="font-body-md text-body-md">Combat Tracker</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="inventory-attunement" href="#"><span class="material-symbols-outlined text-[18px]">backpack</span><span class="font-body-md text-body-md">Inventory &amp; Attunement</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="compendium-rules" href="#"><span class="material-symbols-outlined text-[18px]">menu_book</span><span class="font-body-md text-body-md">2024 Compendium</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="campaign-notes" href="#"><span class="material-symbols-outlined text-[18px]">history_edu</span><span class="font-body-md text-body-md">Campaign Chronicle</span></a></nav></div><div class="p-space-sm"><div class="bg-surface-container-lowest rounded-lg p-space-sm mb-space-sm flex items-center justify-between"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-secondary text-[16px]">casino</span><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Arcane Focus</span></div><span class="font-stat-modifier text-stat-modifier text-primary">+4 INT</span></div><div class="flex items-center justify-between text-on-surface-variant px-space-xs"><span class="font-formula-sm text-formula-sm">System SRD 5.24</span><span class="font-formula-sm text-formula-sm text-outline">Sync: Active</span></div></div></aside><div class="pl-64 flex flex-col min-h-screen"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl z-30 shadow-[0_1px_8px_rgba(0,0,0,0.3)] flex items-center justify-between px-gutter"><div class="flex items-center gap-space-md flex-1 max-w-xl"><div class="relative w-full"><span class="material-symbols-outlined text-outline absolute left-3 top-1/2 -translate-y-1/2 text-[18px]">search</span><input class="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-10 pr-16 py-2 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-all" placeholder="Search spells, feats, weapons, rules..." type="text"/><div class="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1"><kbd class="bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.5 rounded shadow-sm">Ctrl</kbd><kbd class="bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.5 rounded shadow-sm">K</kbd></div></div></div><div class="flex items-center gap-space-md"><button class="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-xl hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-primary text-[18px]">casino</span><span class="font-label-caps text-label-caps text-on-surface uppercase">Dice Tray</span><span class="font-formula-sm text-formula-sm bg-surface-container-high px-1.5 py-0.5 rounded text-primary-fixed-dim">d20</span></button><button class="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[20px]">bookmarks</span><span class="w-2 h-2 rounded-full bg-primary-container absolute top-1 right-1"></span></button><button class="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[20px]">notifications</span><span class="w-1.5 h-1.5 rounded-full bg-error absolute top-1 right-1"></span></button><div class="h-6 w-px bg-outline-variant/30"></div><div class="flex items-center gap-space-sm"><div class="text-right hidden xl:block"><span class="font-body-sm text-body-sm font-semibold text-on-surface block leading-none">Dungeon Sage</span><span class="font-formula-sm text-formula-sm text-on-surface-variant block">Player ID: #7821</span></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="relative w-full pt-16 pb-14 bg-surface px-gutter flex-1"><div class="flex flex-col w-full gap-space-lg pb-12">
<!-- Character Identity & Strategic Header -->
<section class="relative bg-surface-container-low rounded-xl p-space-lg shadow-xl overflow-hidden">
<!-- Ambient Arcane Energy Background Glow -->
<div class="absolute -right-24 -top-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<div class="absolute left-1/3 -bottom-20 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<div class="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-md border-b border-surface-container-highest/60 pb-space-md">
<!-- Identification & Title -->
<div class="flex items-center gap-space-md">
<div class="relative group">
<div class="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center shadow-md border border-primary/20 overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Intricate digital fantasy painting of Aeloria Silvervein, a moonlit High Elf Bladesinger Wizard. Silver braided hair, piercing sapphire eyes, wearing dark slate and filigree gold elven battle robes while holding a glowing rapier enveloped in azure arcane mist." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6ZjFHfL8RHAjEUfJu-8s5USQpyKhMp8oAjn9u0bjmmSUkDxnmmYh1NRrDjz3bcr5Da4OJO72pyBDhhZcOodC1KzHYivgaX3MOZ8mJmllBQE8w1ysKcq86AZtb3gI2zIG1E05eti_Ake3G9tO-dzwl3drGvXIZRQoo02hqOtKefT8I2nTuepBUHNwS4MKjVXAgg6qlhROHsxlfSUv2J8zZP0ZUPnzm5vKwI7_f4gN"/>
</div>
<span class="absolute -bottom-1 -right-1 flex h-4 w-4">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span class="relative inline-flex rounded-full h-4 w-4 bg-primary text-on-primary font-formula-sm text-[9px] items-center justify-center font-bold">7</span>
</span>
</div>
<div class="space-y-0.5">
<div class="flex flex-wrap items-center gap-space-xs">
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">Aeloria Silvervein</h1>
<span class="bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm px-2 py-0.5 rounded uppercase">High Elf</span>
<span class="bg-surface-container-high text-primary font-formula-sm text-formula-sm px-2 py-0.5 rounded font-semibold">Wizard (Bladesinger 2024)</span>
<span class="bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm px-2 py-0.5 rounded">Sage • Neutral Good</span>
</div>
<div class="flex items-center gap-space-md text-on-surface-variant font-body-sm text-body-sm">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-primary">military_tech</span> Prof Bonus: <strong class="text-on-surface font-stat-modifier text-stat-modifier">+3</strong></span>
<span class="text-outline-variant">•</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-secondary">visibility</span> Darkvision: <strong>60 ft</strong></span>
<span class="text-outline-variant">•</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-primary">auto_fix_high</span> Spell Save DC: <strong class="text-primary font-stat-modifier text-stat-modifier">15</strong></span>
<span class="text-outline-variant">•</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-secondary">bolt</span> Spell Atk: <strong class="text-secondary font-stat-modifier text-stat-modifier">+7</strong></span>
</div>
</div>
</div>
<!-- Inspiration & Concentration Indicators -->
<div class="flex flex-wrap items-center gap-space-sm self-stretch xl:self-auto justify-between xl:justify-end">
<button class="flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-container-highest px-3 py-1.5 rounded-xl transition-all shadow-sm group" id="inspiration-badge" onclick="toggleInspiration(this)">
<span class="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">star</span>
<div class="text-left leading-tight">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block">Inspiration</span>
<span class="font-formula-sm text-formula-sm text-primary font-semibold block" id="inspiration-state">Ready (+ Advantage)</span>
</div>
</button>
<div class="flex items-center gap-space-xs bg-surface-container-lowest px-3 py-1.5 rounded-xl border border-primary/20 shadow-inner">
<span class="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
<div class="leading-tight">
<span class="font-label-caps text-label-caps text-secondary uppercase block">Active Concentration</span>
<span class="font-body-sm text-body-sm text-on-surface font-medium block">Haste (+2 AC, Extra Dash/Atk)</span>
</div>
<button class="text-on-surface-variant hover:text-error transition-colors ml-1" title="Break Concentration">
<span class="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
</div>
</div>
<!-- Rapid Combat Vitals Bar -->
<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-space-sm pt-space-md items-center">
<!-- Hit Points Meter Block -->
<div class="col-span-2 bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-error text-[18px]">favorite</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Hit Points</span>
</div>
<div class="flex items-center gap-1 font-stat-numeric text-stat-numeric">
<span class="text-on-surface" id="hp-current">48</span>
<span class="text-outline font-body-sm text-body-sm">/ 48</span>
<span class="font-formula-sm text-formula-sm text-primary-fixed ml-1">(+0 Temp)</span>
</div>
</div>
<!-- Health Bar Visualization -->
<div class="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden my-2">
<div class="bg-gradient-to-r from-primary-container to-secondary-container h-full transition-all duration-300" id="hp-progress-bar" style="width: 100%;"></div>
</div>
<div class="flex items-center justify-between gap-1 pt-0.5">
<div class="flex items-center gap-1">
<button class="font-formula-sm text-formula-sm bg-surface-container-high hover:bg-error/30 hover:text-error text-on-surface px-2 py-0.5 rounded transition" onclick="adjustHP(-5)">-5</button>
<button class="font-formula-sm text-formula-sm bg-surface-container-high hover:bg-error/30 hover:text-error text-on-surface px-2 py-0.5 rounded transition" onclick="adjustHP(-1)">-1</button>
<button class="font-formula-sm text-formula-sm bg-surface-container-high hover:bg-secondary/30 hover:text-secondary text-on-surface px-2 py-0.5 rounded transition" onclick="adjustHP(1)">+1</button>
<button class="font-formula-sm text-formula-sm bg-surface-container-high hover:bg-secondary/30 hover:text-secondary text-on-surface px-2 py-0.5 rounded transition" onclick="adjustHP(5)">+5</button>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Max: 48</span>
</div>
</div>
<!-- Armor Class with Bladesong Switch -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Armor Class</span>
<span class="material-symbols-outlined text-secondary text-[18px]">shield</span>
</div>
<div class="flex items-baseline gap-1 my-0.5">
<span class="font-stat-numeric text-stat-numeric text-secondary font-bold" id="ac-display">22</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(16 base + 4 song + 2 haste)</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant pt-1 border-t border-surface-container-highest/40">
<span class="font-formula-sm text-formula-sm">Bladesong</span>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" id="bladesong-toggle" onchange="toggleBladesongMechanics(this)" type="checkbox"/>
<div class="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
</div>
<!-- Initiative & Speed -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Initiative</span>
<span class="material-symbols-outlined text-primary text-[18px]">bolt</span>
</div>
<div class="flex items-center justify-between my-0.5">
<span class="font-stat-numeric text-stat-numeric text-primary font-bold">+3</span>
<div class="text-right">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block">Speed</span>
<span class="font-formula-sm text-formula-sm text-on-surface font-semibold" id="speed-display">40 ft <span class="text-primary">(+10)</span></span>
</div>
</div>
<div class="flex items-center gap-1 text-on-surface-variant pt-1 border-t border-surface-container-highest/40 font-formula-sm text-formula-sm">
<span class="material-symbols-outlined text-[14px] text-primary">offline_bolt</span>
<span class="">Advantage on Init</span>
</div>
</div>
<!-- Hit Dice & Rest -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Hit Dice</span>
<span class="font-formula-sm text-formula-sm text-outline">d6 Wizard</span>
</div>
<div class="my-0.5 flex items-baseline gap-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface">5</span>
<span class="text-outline font-body-sm text-body-sm">/ 7 d6</span>
</div>
<div class="flex items-center gap-1 pt-1 border-t border-surface-container-highest/40 font-formula-sm text-formula-sm">
<button class="hover:text-primary transition-colors" onclick="logRoll('Short Rest Triggered: Spend d6 HD')">Short Rest</button>
<span class="text-outline-variant">•</span>
<button class="hover:text-primary transition-colors" onclick="logRoll('Long Rest: All resources reset')">Long Rest</button>
</div>
</div>
<!-- Passive Senses -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Passives</span>
<span class="material-symbols-outlined text-outline text-[18px]">psychology</span>
</div>
<div class="space-y-0.5 my-0.5 font-formula-sm text-formula-sm">
<div class="flex justify-between"><span class="text-on-surface-variant">Perception:</span> <strong class="text-on-surface">15</strong></div>
<div class="flex justify-between"><span class="text-on-surface-variant">Investigation:</span> <strong class="text-primary">18</strong></div>
</div>
<div class="text-on-surface-variant pt-1 border-t border-surface-container-highest/40 font-formula-sm text-formula-sm truncate">
          Insight: 11 • Adv vs Charm
        </div>
</div>
<!-- Defense Profile -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Defenses</span>
<span class="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
</div>
<div class="space-y-0.5 my-0.5 font-formula-sm text-formula-sm">
<div class="text-secondary font-medium">Immune: Sleep Magic</div>
<div class="text-on-surface-variant truncate">Adv: Charmed Saves</div>
</div>
<div class="text-on-surface-variant pt-1 border-t border-surface-container-highest/40 font-formula-sm text-formula-sm">
          Shield Spell: +5 AC (Reac)
        </div>
</div>
</div>
</section>
<!-- Dual-Column Master Workspace -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- LEFT COLUMN (38% on Desktop): Attributes, Saves, Proficiencies, Arcane Resources -->
<div class="lg:col-span-5 flex flex-col gap-space-lg">
<!-- Six Core Ability Scores Grid -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[18px]">grid_view</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Ability Scores &amp; Saves</h2>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">2024 Core</span>
</div>
<div class="grid grid-cols-3 gap-space-xs">
<!-- INT (Primary) -->
<div class="bg-surface-container-high/80 rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container-high transition-colors">
<div class="absolute top-0 left-0 right-0 h-0.5 bg-primary"></div>
<span class="font-label-caps text-label-caps text-primary uppercase">INT</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-primary font-bold">+4</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">18</span>
</div>
<button class="bg-surface-container-lowest/80 hover:bg-primary-container hover:text-on-primary-container text-primary font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(7, 'Intelligence Save')">
<span class="material-symbols-outlined text-[12px]">star</span> Save +7
            </button>
</div>
<!-- DEX -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">DEX</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold">+3</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">16</span>
</div>
<button class="bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(3, 'Dexterity Save')">
              Save +3
            </button>
</div>
<!-- CON -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors relative">
<div class="absolute top-0 right-0 w-2 h-2 rounded-full bg-secondary-container" title="Bladesong adds +4 INT to concentration"></div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">CON</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold">+2</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">14</span>
</div>
<button class="bg-surface-container-lowest hover:bg-secondary-container hover:text-on-secondary-fixed text-secondary font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(6, 'Constitution (Concentration) Save [Advantage: War Caster]')" title="Concentration: +6 with Bladesong">
              Save +2 <span class="text-[10px] text-primary">(+6*)</span>
</button>
</div>
<!-- WIS -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">WIS</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold">+1</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">12</span>
</div>
<button class="bg-surface-container-lowest/80 hover:bg-primary-container hover:text-on-primary-container text-primary font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(4, 'Wisdom Save')">
<span class="material-symbols-outlined text-[12px]">star</span> Save +4
            </button>
</div>
<!-- CHA -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">CHA</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold">+0</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">10</span>
</div>
<button class="bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(0, 'Charisma Save')">
              Save +0
            </button>
</div>
<!-- STR -->
<div class="bg-surface-container rounded-lg p-space-xs text-center flex flex-col justify-between shadow-sm group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">STR</span>
<div class="my-1">
<span class="font-stat-numeric text-stat-numeric text-on-surface-variant font-bold">-1</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant">8</span>
</div>
<button class="bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm py-0.5 px-1 rounded flex items-center justify-center gap-0.5 transition" onclick="rollD20(-1, 'Strength Save')">
              Save -1
            </button>
</div>
</div>
</section>
<!-- Arcane Resource Trackers (Bladesong & Spell Slots Matrix) -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md space-y-space-md"><div class="flex items-center justify-between pb-space-xs border-b border-surface-container-highest/60"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-secondary text-[20px]">diamond</span><div><h2 class="font-headline-sm text-headline-sm text-on-surface leading-tight">Limited-Use Traits &amp; Resources</h2><span class="font-formula-sm text-formula-sm text-on-surface-variant">Tactical Resource Hub • Interactive Counters</span></div></div><span class="bg-surface-container-high text-primary font-formula-sm text-formula-sm px-2 py-0.5 rounded font-semibold">Rest Synchronized</span></div><div class="grid grid-cols-1 gap-space-xs"><div class="bg-surface-container rounded-xl p-space-sm border border-surface-container-highest/40 flex flex-col gap-2"><div class="flex items-start justify-between gap-2"><div><div class="flex items-center gap-2"><span class="font-body-md text-body-md font-semibold text-secondary">Fey Ancestry Heritage (Elven Ward)</span><span class="bg-secondary-container/20 text-secondary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Action</span></div><p class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">Channel ancestry to manifest protective mist or ward against charm &amp; illusions.</p></div><span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-2 py-0.5 rounded whitespace-nowrap">Recharge: Long Rest</span></div><div class="flex items-center justify-between pt-1 border-t border-surface-container-highest/30"><div class="flex items-center gap-1.5" id="fey-pips"><button class="w-5 h-5 rotate-45 bg-secondary text-on-secondary flex items-center justify-center rounded-xs transition-transform hover:scale-110 shadow-sm" onclick="toggleResource(this)" title="Fey Charge 1"></button><button class="w-5 h-5 rotate-45 bg-secondary text-on-secondary flex items-center justify-center rounded-xs transition-transform hover:scale-110 shadow-sm" onclick="toggleResource(this)" title="Fey Charge 2"></button><button class="w-5 h-5 rotate-45 bg-secondary text-on-secondary flex items-center justify-center rounded-xs transition-transform hover:scale-110 shadow-sm" onclick="toggleResource(this)" title="Fey Charge 3"></button><span class="font-formula-sm text-formula-sm text-secondary font-semibold ml-2">3 / 3</span></div><div class="flex items-center gap-1"><button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm px-2 py-0.5 rounded" onclick="logRoll('Fey Ancestry Heritage: 1 charge expended')">Spend (Action)</button></div></div></div><div class="bg-surface-container rounded-xl p-space-sm border border-surface-container-highest/40 flex flex-col gap-2"><div class="flex items-start justify-between gap-2"><div><div class="flex items-center gap-2"><span class="font-body-md text-body-md font-semibold text-primary">Bladesong Invocations</span><span class="bg-secondary-container/30 text-secondary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Bonus Action</span></div><p class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">10 Rounds • +4 AC • +10ft speed • Adv Acrobatics • +4 Concentration</p></div><span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-2 py-0.5 rounded whitespace-nowrap">Short / Long Rest</span></div><div class="flex items-center justify-between pt-1 border-t border-surface-container-highest/30"><div class="flex items-center gap-1.5" id="bladesong-pips"><button class="w-5 h-5 rotate-45 bg-primary-container text-on-primary-container flex items-center justify-center rounded-xs transition-transform hover:scale-110 shadow-sm" onclick="toggleResource(this)" title="Bladesong 1"></button><button class="w-5 h-5 rotate-45 bg-primary-container text-on-primary-container flex items-center justify-center rounded-xs transition-transform hover:scale-110 shadow-sm" onclick="toggleResource(this)" title="Bladesong 2"></button><button class="w-5 h-5 rotate-45 bg-primary-container text-on-primary-container flex items-center justify-center rounded-xs transition-transform hover:scale-110 shadow-sm" onclick="toggleResource(this)" title="Bladesong 3"></button><span class="font-formula-sm text-formula-sm text-primary font-semibold ml-2">3 / 3</span></div><div class="flex items-center gap-1"><button class="bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-primary font-formula-sm text-formula-sm px-2 py-0.5 rounded transition" onclick="document.getElementById('bladesong-toggle').click()">Activate</button></div></div></div><div class="bg-surface-container rounded-xl p-space-sm border border-surface-container-highest/40 flex flex-col gap-2"><div class="flex items-start justify-between gap-2"><div><div class="flex items-center gap-2"><span class="font-body-md text-body-md font-semibold text-on-surface">Arcane Recovery</span><span class="bg-surface-container-highest text-outline font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Short Rest</span></div><p class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">Recover up to 4 combined spell levels during a short rest (1/Day).</p></div><span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-2 py-0.5 rounded whitespace-nowrap">Recharge: Dawn</span></div><div class="flex items-center justify-between pt-1 border-t border-surface-container-highest/30"><div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-primary"></span><span class="font-formula-sm text-formula-sm text-on-surface font-semibold">1 / 1 Available (4 Lvls Max)</span></div><button class="bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-formula-sm text-formula-sm px-2.5 py-1 rounded transition" id="recovery-btn" onclick="toggleRecovery(this)">Expend Recovery</button></div></div><div class="bg-surface-container rounded-xl p-space-sm border border-surface-container-highest/40 flex flex-col gap-2"><div class="flex items-start justify-between gap-2"><div><div class="flex items-center gap-2"><span class="font-body-md text-body-md font-semibold text-primary-fixed-dim">Heroic Inspiration Die</span><span class="bg-primary-container/20 text-primary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Free / Reroll</span></div><p class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">Reroll any d20 d20 test or gain advantage. Refresh on Nat 20 or DM grant.</p></div><span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-2 py-0.5 rounded whitespace-nowrap">Special / Rest</span></div><div class="flex items-center justify-between pt-1 border-t border-surface-container-highest/30"><div class="flex items-center gap-2"><button class="w-5 h-5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(212,175,55,0.6)] flex items-center justify-center text-[10px] text-on-primary-container font-bold" onclick="toggleInspiration(document.getElementById('inspiration-badge'))" title="Toggle Inspiration Pip">★</button><span class="font-formula-sm text-formula-sm text-primary font-bold">1d20 Reroll Ready</span></div><button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm px-2 py-0.5 rounded" onclick="rollD20(0, 'Inspiration Die Reroll')">Reroll d20</button></div></div></div><div class="space-y-space-xs pt-1"><div class="flex items-center justify-between text-on-surface-variant px-1 font-label-caps text-label-caps uppercase"><span>Spell Rank Matrix</span><span>Slots Available (Diamond Click to Expend)</span></div><div class="bg-surface-container rounded-lg p-space-xs flex items-center justify-between"><div class="flex items-center gap-2"><span class="w-5 h-5 rounded bg-surface-container-high text-on-surface font-formula-sm text-formula-sm flex items-center justify-center font-bold">1</span><span class="font-body-sm text-body-sm text-on-surface">1st Level</span></div><div class="flex items-center gap-2"><button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 1"></button><button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 2"></button><button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 3"></button><button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 4"></button><span class="font-formula-sm text-formula-sm text-on-surface-variant ml-1 slot-count">4/4</span></div></div><div class="bg-surface-container rounded-lg p-space-xs flex items-center justify-between"><div class="flex items-center gap-2"><span class="w-5 h-5 rounded bg-surface-container-high text-on-surface font-formula-sm text-formula-sm flex items-center justify-center font-bold">2</span><span class="font-body-sm text-body-sm text-on-surface">2nd Level</span></div><div class="flex items-center gap-2"><button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button><button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button><button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button><span class="font-formula-sm text-formula-sm text-on-surface-variant ml-1 slot-count">3/3</span></div></div><div class="bg-surface-container rounded-lg p-space-xs flex items-center justify-between"><div class="flex items-center gap-2"><span class="w-5 h-5 rounded bg-surface-container-high text-primary font-formula-sm text-formula-sm flex items-center justify-center font-bold">3</span><span class="font-body-sm text-body-sm text-on-surface">3rd Level</span></div><div class="flex items-center gap-2"><button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button><button class="w-4 h-4 rotate-45 bg-secondary hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)"></button><button class="w-4 h-4 rotate-45 bg-surface-container-highest opacity-40 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Expended Slot"></button><span class="font-formula-sm text-formula-sm text-on-surface-variant ml-1 slot-count">2/3</span></div></div><div class="bg-surface-container rounded-lg p-space-xs flex items-center justify-between"><div class="flex items-center gap-2"><span class="w-5 h-5 rounded bg-surface-container-high text-primary-fixed font-formula-sm text-formula-sm flex items-center justify-center font-bold">4</span><span class="font-body-sm text-body-sm text-on-surface font-semibold">4th Level</span></div><div class="flex items-center gap-2"><button class="w-4 h-4 rotate-45 bg-primary-container hover:brightness-125 rounded-xs transition shadow-sm" onclick="toggleSlot(this)" title="Slot 1"></button><span class="font-formula-sm text-formula-sm text-on-surface-variant ml-1 slot-count">1/1</span></div></div></div></section>
<!-- Skills & Proficiencies Breakdown -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-outline text-[18px]">checklist</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Skills &amp; Expertises</h2>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Sorted by Modifier</span>
</div>
<div class="space-y-1">
<!-- Arcana -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Proficient"></span>
<span class="font-body-sm text-body-sm font-semibold text-on-surface">Arcana</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(INT)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-primary hover:underline" onclick="rollD20(7, 'Arcana Check')">+7</button>
</div>
<!-- History -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Proficient"></span>
<span class="font-body-sm text-body-sm text-on-surface">History</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(INT)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-primary hover:underline" onclick="rollD20(7, 'History Check')">+7</button>
</div>
<!-- Investigation -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Proficient"></span>
<span class="font-body-sm text-body-sm text-on-surface">Investigation</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(INT)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-primary hover:underline" onclick="rollD20(7, 'Investigation Check')">+7</button>
</div>
<!-- Acrobatics -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Proficient"></span>
<span class="font-body-sm text-body-sm font-semibold text-secondary">Acrobatics</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(DEX • Adv in Song)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-secondary hover:underline" onclick="rollD20(6, 'Acrobatics Check (Advantage Bladesong)')">+6</button>
</div>
<!-- Perception -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary" title="Keen Senses"></span>
<span class="font-body-sm text-body-sm text-on-surface">Perception</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(WIS)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-on-surface hover:underline" onclick="rollD20(4, 'Perception Check')">+4</button>
</div>
<!-- Religion -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-surface-container-highest"></span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Religion</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(INT)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-on-surface hover:underline" onclick="rollD20(4, 'Religion Check')">+4</button>
</div>
<!-- Stealth -->
<div class="flex items-center justify-between p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-surface-container-highest"></span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Stealth</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(DEX)</span>
</div>
<button class="font-stat-modifier text-stat-modifier text-on-surface hover:underline" onclick="rollD20(3, 'Stealth Check')">+3</button>
</div>
</div>
</section>
<!-- High Elf & Bladesinger Passives -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md space-y-space-sm"><div class="flex items-center justify-between border-b border-surface-container-highest/60 pb-space-xs"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-primary text-[18px]">spa</span><div><h2 class="font-headline-sm text-headline-sm text-on-surface leading-tight">Passive Features &amp; Lineage</h2><span class="font-formula-sm text-formula-sm text-on-surface-variant">Permanent Augments • Deep Inspection</span></div></div><span class="font-formula-sm text-formula-sm text-outline">Always Active</span></div><div class="grid grid-cols-2 gap-space-xs p-space-xs bg-surface-container rounded-lg"><div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-secondary text-[16px]">visibility</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Darkvision: <strong class="text-on-surface">60 ft</strong></span></div><div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-primary text-[16px]">psychology</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Perception: <strong class="text-on-surface">15</strong></span></div><div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-primary text-[16px]">search</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Investigation: <strong class="text-primary">18</strong></span></div><div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-secondary text-[16px]">verified</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Insight: <strong class="text-on-surface">11</strong></span></div></div><div class="space-y-1.5"><details class="group bg-surface-container rounded-lg overflow-hidden border border-surface-container-highest/40" open=""><summary class="flex items-center justify-between p-2.5 cursor-pointer hover:bg-surface-container-high transition-colors select-none"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">shield_with_heart</span><span class="font-body-sm text-body-sm font-semibold text-on-surface">Fey Ancestry &amp; Lineage</span></div><span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[18px]">expand_more</span></summary><div class="p-2.5 pt-0 text-on-surface-variant font-body-sm text-body-sm space-y-1 border-t border-surface-container-highest/30"><p class="mt-1"><strong class="text-on-surface">Advantage vs Charmed:</strong> You have Advantage on saving throws made to avoid or end the Charmed condition on yourself.</p><p><strong class="text-on-surface">Sleep Immunity:</strong> Arcane or magical effects cannot put you to sleep.</p></div></details><details class="group bg-surface-container rounded-lg overflow-hidden border border-surface-container-highest/40"><summary class="flex items-center justify-between p-2.5 cursor-pointer hover:bg-surface-container-high transition-colors select-none"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-[18px]">bedtime</span><span class="font-body-sm text-body-sm font-semibold text-on-surface">Elven Trance (4-Hour Rest)</span></div><span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[18px]">expand_more</span></summary><div class="p-2.5 pt-0 text-on-surface-variant font-body-sm text-body-sm border-t border-surface-container-highest/30"><p class="mt-1">You do not sleep. Instead, you meditate deeply for 4 hours a day in a conscious state, gaining the full benefits of a Long Rest equivalent to an 8-hour slumber.</p></div></details><details class="group bg-surface-container rounded-lg overflow-hidden border border-surface-container-highest/40"><summary class="flex items-center justify-between p-2.5 cursor-pointer hover:bg-surface-container-high transition-colors select-none"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">swords</span><span class="font-body-sm text-body-sm font-semibold text-on-surface">Training in War and Song</span></div><span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[18px]">expand_more</span></summary><div class="p-2.5 pt-0 text-on-surface-variant font-body-sm text-body-sm border-t border-surface-container-highest/30"><p class="mt-1">Grants proficiency with Light Armor and one one-handed martial melee weapon (Rapier). Also adds proficiency bonus to Charisma (Performance) checks.</p></div></details></div></section>
</div>
<!-- RIGHT COLUMN (62% on Desktop): Combat Arsenal, Action Economy & Grimoire -->
<div class="lg:col-span-7 flex flex-col gap-space-lg">
<!-- Action Filter Navigation Header -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md"><div class="flex flex-wrap items-center justify-between gap-space-xs mb-space-md pb-space-sm border-b border-surface-container-highest/60"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-primary text-[20px]">sports_martial_arts</span><div><h2 class="font-headline-sm text-headline-sm text-on-surface leading-tight">Tactical Action Economy</h2><span class="font-formula-sm text-formula-sm text-on-surface-variant">2024 D&amp;D Ruleset • Structured Activation Triggers</span></div></div><div class="flex flex-wrap items-center gap-1.5" id="filter-container"><button class="bg-primary-container text-on-primary-container font-label-caps text-label-caps px-2.5 py-1 rounded font-bold uppercase transition" onclick="filterCombat('all', this)">All Phases</button><button class="bg-surface-container-high hover:bg-primary-container/20 text-primary font-label-caps text-label-caps px-2.5 py-1 rounded uppercase transition" onclick="filterCombat('action', this)">Actions</button><button class="bg-surface-container-high hover:bg-secondary-container/20 text-secondary font-label-caps text-label-caps px-2.5 py-1 rounded uppercase transition" onclick="filterCombat('bonus', this)">Bonus Actions</button><button class="bg-surface-container-high hover:bg-error-container/20 text-error font-label-caps text-label-caps px-2.5 py-1 rounded uppercase transition" onclick="filterCombat('reaction', this)">Reactions</button></div></div><div class="bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high p-space-sm rounded-xl mb-space-md shadow-inner flex items-start gap-space-sm border-l-2 border-primary"><span class="material-symbols-outlined text-primary text-[22px] flex-shrink-0 mt-0.5">auto_mode</span><div class="min-w-0 flex-1"><div class="flex items-center justify-between flex-wrap gap-1"><div class="flex items-center gap-2"><span class="font-body-md text-body-md font-bold text-primary">Bladesinger Extra Attack (2024 Rule)</span><span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.2 rounded">Level 6 Feature</span></div><span class="font-label-caps text-label-caps text-secondary uppercase">Cantrip Weave</span></div><p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">When taking the Attack action, attack twice. You can replace one attack with any wizard cantrip having a casting time of 1 action (e.g. <em>Booming Blade</em> or <em>Ray of Frost</em>).</p></div></div><div class="space-y-space-md" id="combat-items-container"><div class="space-y-2 combat-group-actions"><div class="flex items-center justify-between px-1"><span class="font-label-caps text-label-caps uppercase text-primary font-bold flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-primary"></span>Actions (Amber / Gold)</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">1 Action / Turn</span></div><div class="combat-item action bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-primary"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-primary"><span class="material-symbols-outlined text-[22px]">swords</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">Moonblade (+1 Rapier)</h3><span class="bg-primary/20 text-primary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Action</span><span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-1 rounded">Finesse • Silvered</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>Reach: 5 ft</span><span>•</span><span>Target: 1 Creature</span><span>•</span><span class="text-secondary font-semibold">To Hit: +7</span><span>•</span><span>1d8+4 Piercing</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-primary-container text-on-primary-container px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 hover:brightness-110 transition shadow-sm" onclick="rollAttack('Moonblade Rapier', 7, '1d8+4', 'Piercing')"><span class="material-symbols-outlined text-[14px]">casino</span> Atk +7</button><button class="bg-surface-container-highest hover:bg-surface-bright text-on-surface px-2.5 py-1.5 rounded-lg font-formula-sm text-formula-sm transition" onclick="rollDamage('Moonblade Dmg', '1d8+4', 'Piercing')">1d8+4</button></div></div></div><div class="combat-item action bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-primary"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-primary"><span class="material-symbols-outlined text-[22px]">volume_up</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">Booming Blade</h3><span class="bg-primary/20 text-primary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Action / Weave</span><span class="bg-secondary-container/20 text-secondary font-formula-sm text-formula-sm px-1.5 py-0.5 rounded">Evocation Cantrip</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>Range: 5 ft (Weapon)</span><span>•</span><span>Hit: +1d8 Thunder</span><span>•</span><span>Move Trigger: 2d8 Thunder</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-primary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="rollAttack('Booming Blade Attack', 7, '1d8+4+1d8', 'Piercing + Thunder')">Weave Strike</button><button class="bg-secondary-container/20 hover:bg-secondary-container hover:text-on-secondary-fixed text-secondary px-2.5 py-1.5 rounded-lg font-formula-sm text-formula-sm transition" onclick="triggerBoomingBladeRider()">+1d8 Thunder</button></div></div></div><div class="combat-item action bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-primary"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-secondary"><span class="material-symbols-outlined text-[22px]">ac_unit</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">Ray of Frost</h3><span class="bg-primary/20 text-primary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Action / Cantrip</span><span class="bg-surface-container-highest text-outline font-formula-sm text-formula-sm px-1.5 py-0.5 rounded">Evocation</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>Range: 60 ft</span><span>•</span><span>Spell Atk: +7</span><span>•</span><span class="text-secondary font-semibold">2d8 Cold &amp; -10ft Speed</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="rollAttack('Ray of Frost', 7, '2d8', 'Cold')">Cast +7</button><button class="bg-surface-container-highest hover:bg-surface-bright text-on-surface px-2.5 py-1.5 rounded-lg font-formula-sm text-formula-sm transition" onclick="rollDamage('Ray of Frost Dmg', '2d8', 'Cold')">2d8 Dmg</button></div></div></div><div class="combat-item action bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-primary"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-primary"><span class="material-symbols-outlined text-[22px]">local_fire_department</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">Fireball</h3><span class="bg-primary/20 text-primary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Action</span><span class="bg-primary-container/20 text-primary font-formula-sm text-formula-sm px-1.5 py-0.5 rounded">3rd-Level Evocation</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>Range: 150 ft (20ft Sphere)</span><span>•</span><span class="text-primary font-semibold">DEX Save DC 15</span><span>•</span><span>8d6 Fire (Half on save)</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-primary-container hover:brightness-110 text-on-primary-container px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="rollDamage('Fireball Burst', '8d6', 'Fire (DC 15 DEX Half)')"><span class="material-symbols-outlined text-[14px]">local_fire_department</span> Cast 8d6 (-1 Lv.3)</button></div></div></div></div><div class="space-y-2 combat-group-bonus"><div class="flex items-center justify-between px-1"><span class="font-label-caps text-label-caps uppercase text-secondary font-bold flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-secondary"></span>Bonus Actions (Cyan / Teal)</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">1 Bonus Action / Turn</span></div><div class="combat-item bonus bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-secondary"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center flex-shrink-0 text-secondary"><span class="material-symbols-outlined text-[22px]">qr_code_2</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">Misty Step</h3><span class="bg-secondary-container/30 text-secondary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Bonus Action</span><span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.5 rounded">2nd-Level Conjuration</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>Range: Self</span><span>•</span><span>Target: Self</span><span>•</span><span class="text-secondary font-semibold">Teleport 30 ft</span><span>•</span><span>Verbal Only</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-secondary hover:bg-secondary-fixed text-on-secondary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="logRoll('Misty Step Cast: Teleport 30ft to visible space (-1 Lv.2 Slot)')"><span class="material-symbols-outlined text-[14px]">north_east</span> Teleport (-1 Slot)</button></div></div></div><div class="combat-item bonus bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-secondary"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center flex-shrink-0 text-secondary"><span class="material-symbols-outlined text-[22px]">music_note</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">Bladesong Activation</h3><span class="bg-secondary-container/30 text-secondary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Bonus Action</span><span class="bg-surface-container-highest text-primary font-formula-sm text-formula-sm px-1.5 py-0.5 rounded">10 Rounds / 1 Min</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>+4 AC (INT)</span><span>•</span><span>+10 ft Walking Speed</span><span>•</span><span>Adv Acrobatics</span><span>•</span><span class="text-primary font-semibold">+4 Conc Save</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="document.getElementById('bladesong-toggle').click()"><span class="material-symbols-outlined text-[14px]">cached</span> Toggle Song</button></div></div></div><div class="combat-item bonus bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-secondary"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center flex-shrink-0 text-secondary"><span class="material-symbols-outlined text-[22px]">bolt</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">Expedited Cantrip Weave</h3><span class="bg-secondary-container/30 text-secondary font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Bonus Action</span><span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.5 rounded">Martial Flurry</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>Fast-cast verbal trigger</span><span>•</span><span>Syncs with Haste action or tactical reposition</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-surface-container-highest hover:bg-surface-bright text-on-surface px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm transition" onclick="logRoll('Expedited Cantrip Triggered: bonus action arcane focus weave')">Trigger Weave</button></div></div></div></div><div class="space-y-2 combat-group-reactions"><div class="flex items-center justify-between px-1"><span class="font-label-caps text-label-caps uppercase text-error font-bold flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-error"></span>Reactions (Crimson / Coral)</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">1 Reaction / Round</span></div><div class="combat-item reaction bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-error"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-error-container/20 flex items-center justify-center flex-shrink-0 text-error"><span class="material-symbols-outlined text-[22px]">security</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">Shield</h3><span class="bg-error-container/30 text-error font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Reaction</span><span class="bg-surface-container-highest text-error font-formula-sm text-formula-sm px-1.5 py-0.5 rounded">1st-Level Abjuration</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>Trigger: Hit by attack or Magic Missile</span><span>•</span><span class="text-error font-semibold">+5 AC until next turn</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-error hover:bg-error-container text-on-error px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="castShield()"><span class="material-symbols-outlined text-[14px]">shield</span> Trigger Shield (-1 Slot)</button></div></div></div><div class="combat-item reaction bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-error"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-error-container/20 flex items-center justify-center flex-shrink-0 text-error"><span class="material-symbols-outlined text-[22px]">spellcheck</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">Counterspell (2024 Rule)</h3><span class="bg-error-container/30 text-error font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Reaction</span><span class="bg-surface-container-highest text-primary font-formula-sm text-formula-sm px-1.5 py-0.5 rounded">3rd-Level Abjuration</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>Range: 60 ft</span><span>•</span><span>Trigger: Creature casting spell</span><span>•</span><span class="text-primary font-semibold">Target CON Save vs DC 15</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-surface-container-high hover:bg-error hover:text-on-error text-error px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition shadow-sm" onclick="logRoll('Counterspell Cast: Target DC 15 CON Save (-1 Lv.3 Slot)')">Intervene (-1 Slot)</button></div></div></div><div class="combat-item reaction bg-surface-container rounded-xl p-space-sm hover:bg-surface-container-high transition-all shadow-sm border-l-2 border-error"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-lg bg-error-container/20 flex items-center justify-center flex-shrink-0 text-error"><span class="material-symbols-outlined text-[22px]">swords</span></div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-body-lg text-body-lg font-bold text-on-surface">War Caster Opportunity Cast</h3><span class="bg-error-container/30 text-error font-label-caps text-label-caps px-1.5 py-0.5 rounded uppercase font-bold">Reaction</span><span class="bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.5 rounded">Feat Trigger</span></div><div class="flex items-center gap-space-sm font-formula-sm text-formula-sm text-on-surface-variant mt-0.5"><span>Trigger: Hostile leaves 5 ft reach</span><span>•</span><span>Cast 1-action spell targeting only that creature</span></div></div></div><div class="flex items-center gap-1.5 self-end sm:self-auto"><button class="bg-surface-container-highest hover:bg-surface-bright text-on-surface px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm transition" onclick="logRoll('War Caster Reaction: Opportunity spell cast triggered against provoking target')">React Cast</button></div></div></div></div></div></section>
<!-- Combat Feats & Class Masteries Card -->
<section class="bg-surface-container-low rounded-xl p-space-md shadow-md space-y-space-sm"><div class="flex items-center justify-between border-b border-surface-container-highest/60 pb-space-xs"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-primary text-[18px]">workspace_premium</span><div><h2 class="font-headline-sm text-headline-sm text-on-surface leading-tight">Feats &amp; Arcane Masteries</h2><span class="font-formula-sm text-formula-sm text-on-surface-variant">Active Class Feats &amp; Subclass Augments</span></div></div><span class="font-formula-sm text-formula-sm text-secondary font-semibold">Concentration Matrix Synced</span></div><div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm font-body-sm text-body-sm"><details class="group bg-surface-container rounded-xl overflow-hidden border border-surface-container-highest/40" open=""><summary class="flex items-center justify-between p-space-sm cursor-pointer hover:bg-surface-container-high transition-colors select-none"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">verified</span><span class="font-body-md text-body-md font-bold text-primary">War Caster (Feat)</span></div><span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[18px]">expand_more</span></summary><div class="p-space-sm pt-0 space-y-1.5 border-t border-surface-container-highest/30 text-on-surface-variant"><ul class="space-y-1 list-disc list-inside mt-1"><li><strong>Advantage on CON Saves</strong> to maintain concentration when taking damage.</li><li>Perform somatic spell components even when holding weapon and focus.</li><li>Cast single-target spells as an <strong>Opportunity Attack Reaction</strong>.</li></ul></div></details><details class="group bg-surface-container rounded-xl overflow-hidden border border-surface-container-highest/40" open=""><summary class="flex items-center justify-between p-space-sm cursor-pointer hover:bg-surface-container-high transition-colors select-none"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-[18px]">auto_stories</span><span class="font-body-md text-body-md font-bold text-secondary">Bladesong Mastery</span></div><span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[18px]">expand_more</span></summary><div class="p-space-sm pt-0 space-y-1.5 border-t border-surface-container-highest/30 text-on-surface-variant"><ul class="space-y-1 list-disc list-inside mt-1"><li><strong>+4 AC bonus</strong> equal to Intelligence modifier while song is active.</li><li>Walking speed increased by <strong>10 feet</strong>.</li><li><strong>Advantage on Acrobatics (DEX)</strong> ability checks.</li><li><strong>+4 bonus to Concentration checks</strong> equal to INT mod.</li></ul></div></details></div></section>
<!-- Live Runic Dice Roller Console Drawer -->
<section class="bg-surface-container-lowest rounded-xl p-space-md shadow-xl border border-surface-container-highest">
<div class="flex items-center justify-between border-b border-surface-container-highest/60 pb-space-xs mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[18px]">casino</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Runic Dice Roller Feed</h3>
</div>
<div class="flex items-center gap-1">
<button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm px-2 py-0.5 rounded" onclick="rollD20(0, 'Raw d20 Roll')">d20</button>
<button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm px-2 py-0.5 rounded" onclick="rollCustom(8, 'Raw d8 Roll')">d8</button>
<button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm px-2 py-0.5 rounded" onclick="rollCustom(6, 'Raw d6 Roll')">d6</button>
<button class="text-on-surface-variant hover:text-error font-formula-sm text-formula-sm ml-2" onclick="clearRollLog()">Clear</button>
</div>
</div>
<!-- Dynamic Roll History Console Log -->
<div class="space-y-1.5 max-h-36 overflow-y-auto pr-1 font-formula-sm text-formula-sm" id="roll-history">
<div class="flex items-center justify-between text-on-surface-variant bg-surface-container/50 px-2 py-1 rounded">
<span class="">[Log Ready] Character sheet initialized. All dice triggers active.</span>
<span class="text-outline">Ready</span>
</div>
</div>
</section>
</div>
</div>
</div>
<script>
  let currentHP = 48;
  const maxHP = 48;
  let isBladesong = true;
  let inspirationActive = true;

  function adjustHP(amount) {
    currentHP = Math.max(0, Math.min(maxHP, currentHP + amount));
    const hpDisplay = document.getElementById('hp-current');
    const hpProgressBar = document.getElementById('hp-progress-bar');
    
    if (hpDisplay) hpDisplay.innerText = currentHP;
    if (hpProgressBar) {
      const percentage = (currentHP / maxHP) * 100;
      hpProgressBar.style.width = percentage + '%';
      if (percentage <= 25) {
        hpProgressBar.className = 'bg-error h-full transition-all duration-300';
      } else if (percentage <= 50) {
        hpProgressBar.className = 'bg-primary h-full transition-all duration-300';
      } else {
        hpProgressBar.className = 'bg-gradient-to-r from-primary-container to-secondary-container h-full transition-all duration-300';
      }
    }
    logRoll(`HP Adjusted by ${amount > 0 ? '+' + amount : amount} (Current: ${currentHP}/${maxHP})`);
  }

  function toggleBladesongMechanics(checkbox) {
    isBladesong = checkbox.checked;
    const acDisplay = document.getElementById('ac-display');
    const speedDisplay = document.getElementById('speed-display');

    if (isBladesong) {
      if (acDisplay) acDisplay.innerText = '22';
      if (speedDisplay) speedDisplay.innerHTML = '40 ft <span class="text-primary">(+10)</span>';
      logRoll('Bladesong Activated: AC +4, Speed +10ft, Conc +4');
    } else {
      if (acDisplay) acDisplay.innerText = '18';
      if (speedDisplay) speedDisplay.innerHTML = '30 ft <span class="text-outline">(Base)</span>';
      logRoll('Bladesong Expired / Dismissed');
    }
  }

  function toggleInspiration(btn) {
    inspirationActive = !inspirationActive;
    const textSpan = document.getElementById('inspiration-state');
    if (inspirationActive) {
      if (textSpan) textSpan.innerText = 'Ready (+ Advantage)';
      btn.className = 'flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-container-highest px-3 py-1.5 rounded-xl transition-all shadow-sm group';
      logRoll('Inspiration Restored');
    } else {
      if (textSpan) textSpan.innerText = 'Expended';
      btn.className = 'flex items-center gap-space-xs bg-surface-container/40 hover:bg-surface-container px-3 py-1.5 rounded-xl transition-all shadow-sm opacity-60';
      logRoll('Inspiration Expended for Advantage roll');
    }
  }

  function toggleResource(gem) {
    if (gem.classList.contains('bg-primary-container')) {
      gem.classList.remove('bg-primary-container', 'shadow-sm');
      gem.classList.add('bg-surface-container-highest', 'opacity-30');
      logRoll('Expended 1 Bladesong charge');
    } else {
      gem.classList.remove('bg-surface-container-highest', 'opacity-30');
      gem.classList.add('bg-primary-container', 'shadow-sm');
      logRoll('Restored 1 Bladesong charge');
    }
  }

  function toggleRecovery(btn) {
    if (btn.classList.contains('bg-surface-container-high')) {
      btn.classList.remove('bg-surface-container-high', 'text-primary');
      btn.classList.add('bg-surface-container-highest', 'text-outline', 'opacity-50');
      btn.innerText = 'Used (Long Rest)';
      logRoll('Arcane Recovery triggered: Regained spell slots');
    } else {
      btn.classList.add('bg-surface-container-high', 'text-primary');
      btn.classList.remove('bg-surface-container-highest', 'text-outline', 'opacity-50');
      btn.innerText = 'Available (4 Lvls)';
      logRoll('Arcane Recovery ready');
    }
  }

  function toggleSlot(slot) {
    if (slot.classList.contains('opacity-40')) {
      slot.classList.remove('opacity-40', 'bg-surface-container-highest');
      slot.classList.add('bg-secondary');
      logRoll('Spell slot regained');
    } else {
      slot.classList.remove('bg-secondary');
      slot.classList.add('opacity-40', 'bg-surface-container-highest');
      logRoll('Spell slot expended');
    }
  }

  function castShield() {
    logRoll('Shield Cast! AC temporarily becomes 27 (+5 AC until next turn) [-1 Slot]');
  }

  function triggerBoomingBladeRider() {
    const d8 = Math.floor(Math.random() * 8) + 1;
    logRoll(`Booming Blade Rider: rolled ${d8} Thunder damage on strike`);
  }

  function rollD20(modifier, label) {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + modifier;
    const critTag = d20 === 20 ? ' [NAT 20 CRITICAL!]' : d20 === 1 ? ' [NAT 1 CRITICAL FAIL]' : '';
    logRoll(`${label}: [${d20}] + ${modifier} = ${total}${critTag}`);
  }

  function rollAttack(name, mod, dmgNotation, dmgType) {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    const critTag = d20 === 20 ? ' (CRIT!)' : '';
    logRoll(`${name} To Hit: [${d20}] + ${mod} = ${total}${critTag} (Base Dmg: ${dmgNotation} ${dmgType})`);
  }

  function rollDamage(label, formula, type) {
    // Basic parser for d notation
    let total = 0;
    if (formula === '1d8+4') {
      const roll = Math.floor(Math.random() * 8) + 1;
      total = roll + 4;
      logRoll(`${label}: [${roll}] + 4 = ${total} ${type}`);
    } else if (formula === '2d8') {
      const r1 = Math.floor(Math.random() * 8) + 1;
      const r2 = Math.floor(Math.random() * 8) + 1;
      total = r1 + r2;
      logRoll(`${label}: [${r1} + ${r2}] = ${total} ${type}`);
    } else if (formula === '8d6') {
      let sum = 0;
      let rolls = [];
      for (let i = 0; i < 8; i++) {
        let r = Math.floor(Math.random() * 6) + 1;
        rolls.push(r);
        sum += r;
      }
      logRoll(`${label}: [${rolls.join('+')}] = ${sum} ${type}`);
    } else {
      logRoll(`${label}: ${formula} rolled`);
    }
  }

  function rollCustom(dieSides, label) {
    const roll = Math.floor(Math.random() * dieSides) + 1;
    logRoll(`${label}: rolled [${roll}] on d${dieSides}`);
  }

  function logRoll(text) {
    const history = document.getElementById('roll-history');
    if (!history) return;
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between text-on-surface bg-surface-container px-2 py-1 rounded border-l-2 border-primary animate-fadeIn';
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    row.innerHTML = `<span>${text}</span><span class="text-outline font-formula-sm text-[10px] ml-2">${timeStr}</span>`;
    history.prepend(row);
  }

  function clearRollLog() {
    const history = document.getElementById('roll-history');
    if (history) {
      history.innerHTML = '<div class="text-outline-variant italic px-2 py-1">Log cleared. Ready for next action.</div>';
    }
  }

  function filterCombat(type, btn) {
    // Update button states
    const container = document.getElementById('filter-container');
    if (container) {
      Array.from(container.children).forEach(b => {
        b.className = 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps px-2.5 py-1 rounded uppercase transition';
      });
      btn.className = 'bg-primary-container text-on-primary-container font-label-caps text-label-caps px-2.5 py-1 rounded font-bold uppercase transition';
    }

    const items = document.querySelectorAll('.combat-item');
    items.forEach(item => {
      if (type === 'all') {
        item.style.display = 'block';
      } else {
        if (item.classList.contains(type)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      }
    });
  }
</script></main><footer class="fixed bottom-0 left-64 right-0 h-14 bg-surface-container-lowest/95 backdrop-blur-md z-20 flex items-center justify-between px-gutter shadow-[0_-1px_6px_rgba(0,0,0,0.3)]"><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-error text-[18px]">favorite</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">HP:</span><span class="font-stat-modifier text-stat-modifier text-on-surface">52</span><span class="font-formula-sm text-formula-sm text-outline">/ 52</span></div><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-secondary text-[18px]">shield</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">AC:</span><span class="font-stat-modifier text-stat-modifier text-secondary">17</span><span class="font-formula-sm text-formula-sm text-primary">[22 Bladesong]</span></div><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-primary text-[18px]">bolt</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Init:</span><span class="font-stat-modifier text-stat-modifier text-primary">+4</span></div><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-tertiary text-[18px]">speed</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Speed:</span><span class="font-stat-modifier text-stat-modifier text-on-surface">30 ft.</span></div><div class="hidden md:flex items-center gap-space-xs"><span class="material-symbols-outlined text-primary-container text-[18px]">hourglass_bottom</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Slots Lv.4:</span><span class="font-stat-modifier text-stat-modifier text-primary-fixed">1/1</span></div></div><div class="flex items-center gap-space-md"><div class="flex items-center gap-space-xs"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Bladesong:</span><span class="bg-surface-container-high text-primary font-formula-sm text-formula-sm px-2 py-0.5 rounded">Ready (3/3)</span></div><div class="flex items-center gap-space-xs"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Inspiration:</span><span class="w-3 h-3 rounded-full bg-primary-container shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span></div></div></footer></div>
<div class="fixed inset-0 z-50 hidden items-center justify-center bg-surface-container-lowest/80 backdrop-blur-md p-4 transition-all" id="spell-inspector-modal"><div class="relative w-full max-w-2xl bg-surface-container-low border border-primary/30 rounded-2xl shadow-[0_0_32px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col max-h-[90vh]"><div class="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div><div class="absolute -left-20 -bottom-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div><div class="relative z-10 px-6 py-4 border-b border-surface-container-highest/60 flex items-center justify-between bg-surface-container-lowest/60"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-surface-container-high border border-primary/20 flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[24px]" id="modal-spell-icon">magic_button</span></div><div><div class="flex items-center gap-2"><h3 class="font-headline-sm text-headline-sm text-primary" id="modal-spell-name">Spell Name</h3><span class="bg-surface-container-highest text-secondary font-label-caps text-label-caps px-2 py-0.5 rounded uppercase" id="modal-spell-school-pill">School</span></div><p class="font-formula-sm text-formula-sm text-on-surface-variant" id="modal-spell-subheading">Level • Casting Details</p></div></div><button class="text-on-surface-variant hover:text-error hover:bg-surface-container-high p-2 rounded-xl transition-colors" onclick="closeSpellModal()"><span class="material-symbols-outlined text-[20px]">close</span></button></div><div class="relative z-10 p-6 overflow-y-auto space-y-5 font-body-sm text-body-sm"><div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-container rounded-xl p-3 border border-surface-container-highest/40"><div class="text-center"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Casting Time</span><span class="font-formula-sm text-formula-sm font-semibold text-on-surface" id="modal-casting-time">1 Action</span></div><div class="text-center border-l border-surface-container-highest/40"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Range / Area</span><span class="font-formula-sm text-formula-sm font-semibold text-on-surface" id="modal-range">60 ft</span></div><div class="text-center border-l border-surface-container-highest/40"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Components</span><span class="font-formula-sm text-formula-sm font-semibold text-on-surface" id="modal-components">V, S</span></div><div class="text-center border-l border-surface-container-highest/40"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Duration</span><span class="font-formula-sm text-formula-sm font-semibold text-on-surface" id="modal-duration">Instantaneous</span></div></div><div class="space-y-2"><div class="flex items-center gap-2 text-primary font-semibold"><span class="material-symbols-outlined text-[18px]">menu_book</span><span class="">Grimoire Inscription</span></div><p class="text-on-surface bg-surface-container-lowest/80 p-4 rounded-xl border border-surface-container-highest/40 leading-relaxed font-body-sm" id="modal-description"></p></div><div class="space-y-1.5 hidden" id="modal-higher-levels-container"><div class="flex items-center gap-2 text-secondary font-semibold"><span class="material-symbols-outlined text-[18px]">upgrade</span><span class="">At Higher Levels (2024 Upcast)</span></div><p class="text-on-surface-variant bg-surface-container p-3 rounded-lg font-formula-sm text-formula-sm" id="modal-higher-levels-desc"></p></div><div class="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-surface-container-highest/60"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">tune</span><span class="font-label-caps text-label-caps text-on-surface uppercase">Cast Rank</span></div><div class="flex items-center gap-2"><select class="bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-lg px-3 py-1 font-formula-sm text-formula-sm focus:outline-none focus:border-primary" id="modal-upcast-select"><option value="base">Base Level</option></select></div></div></div><div class="relative z-10 px-6 py-4 border-t border-surface-container-highest/60 bg-surface-container-lowest flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-2"><span class="font-formula-sm text-formula-sm text-on-surface-variant">Spellbook ID: <strong class="text-primary">#GRM-2024-5E</strong></span></div><div class="flex items-center gap-2"><button class="bg-primary-container hover:brightness-110 text-on-primary-container px-4 py-2 rounded-xl font-formula-sm text-formula-sm font-bold flex items-center gap-2 shadow-sm transition" id="modal-roll-btn" onclick="modalCastCurrentSpell()"><span class="material-symbols-outlined text-[18px]">casino</span><span class="">Cast &amp; Roll Effect</span></button><button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-xl font-formula-sm text-formula-sm transition" onclick="closeSpellModal()">Dismiss</button></div></div></div></div></body></html>

<!-- Arcana 5e - Monster Bestiary & Compendium (Desktop) -->
<!DOCTYPE html>

<html class="dark" lang="en" style=""><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"surface-dim":"#0f131d","on-tertiary-fixed":"#000767","error-container":"#93000a","inverse-surface":"#dfe2f0","surface-container-highest":"#313540","surface-container":"#1b1f2a","surface-tint":"#e9c349","on-secondary-fixed-variant":"#004c69","on-tertiary-container":"#2d38a1","on-surface":"#dfe2f0","inverse-primary":"#735c00","secondary-fixed":"#c4e7ff","surface":"#0f131d","surface-container-low":"#171b26","on-primary-fixed":"#241a00","primary-fixed-dim":"#e9c349","secondary-container":"#00a6e0","inverse-on-surface":"#2c303b","on-tertiary":"#131e8c","tertiary-fixed-dim":"#bdc2ff","primary-container":"#d4af37","tertiary":"#c7cbff","outline-variant":"#4d4635","on-secondary-fixed":"#001e2c","on-tertiary-fixed-variant":"#2f3aa3","on-background":"#dfe2f0","on-surface-variant":"#d0c5af","outline":"#99907c","secondary":"#7bd0ff","secondary-fixed-dim":"#7bd0ff","background":"#0f131d","tertiary-fixed":"#e0e0ff","on-primary":"#3c2f00","on-error":"#690005","on-secondary":"#00354a","on-secondary-container":"#00374d","surface-container-lowest":"#0a0e18","primary-fixed":"#ffe088","error":"#ffb4ab","tertiary-container":"#a5adff","on-primary-container":"#554300","surface-bright":"#353944","primary":"#f2ca50","surface-container-high":"#262a34","surface-variant":"#313540","on-error-container":"#ffdad6","on-primary-fixed-variant":"#574500"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"margin":"2rem","margin-mobile":"1rem","gutter":"1.5rem","space-sm":"0.5rem","space-xl":"2.5rem","space-lg":"1.5rem","space-md":"1rem","space-xs":"0.25rem","gutter-mobile":"0.75rem"},"fontFamily":{"label-caps":["Plus Jakarta Sans"],"stat-numeric":["JetBrains Mono"],"headline-sm":["Playfair Display"],"display-lg-mobile":["Playfair Display"],"stat-modifier":["JetBrains Mono"],"headline-lg-mobile":["Playfair Display"],"body-md":["Plus Jakarta Sans"],"display-lg":["Playfair Display"],"formula-sm":["JetBrains Mono"],"body-sm":["Plus Jakarta Sans"],"headline-lg":["Playfair Display"],"headline-md":["Playfair Display"],"body-lg":["Plus Jakarta Sans"]},"fontSize":{"label-caps":["11px",{"lineHeight":"14px","letterSpacing":"0.08em","fontWeight":"700"}],"stat-numeric":["24px",{"lineHeight":"28px","letterSpacing":"-0.02em","fontWeight":"700"}],"headline-sm":["18px",{"lineHeight":"24px","letterSpacing":"0.02em","fontWeight":"600"}],"display-lg-mobile":["30px",{"lineHeight":"36px","letterSpacing":"-0.01em","fontWeight":"700"}],"stat-modifier":["16px",{"lineHeight":"20px","letterSpacing":"0em","fontWeight":"600"}],"headline-lg-mobile":["24px",{"lineHeight":"32px","letterSpacing":"0em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","letterSpacing":"0.01em","fontWeight":"400"}],"display-lg":["40px",{"lineHeight":"48px","letterSpacing":"-0.01em","fontWeight":"700"}],"formula-sm":["11px",{"lineHeight":"14px","letterSpacing":"0.02em","fontWeight":"500"}],"body-sm":["12px",{"lineHeight":"16px","letterSpacing":"0.02em","fontWeight":"400"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"0em","fontWeight":"600"}],"headline-md":["22px",{"lineHeight":"28px","letterSpacing":"0.01em","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"24px","letterSpacing":"0em","fontWeight":"400"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.4)]"><div class="flex flex-col"><div class="h-16 px-space-md flex items-center justify-between bg-surface-container-lowest/60"><div class="flex items-center gap-space-sm"><div class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.25)]"><span class="material-symbols-outlined text-on-primary-container text-[20px]">auto_stories</span></div><div><span class="font-headline-sm text-headline-sm text-primary tracking-wide block leading-none">ARCANA 5E</span><span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase tracking-widest block">2024 Codex</span></div></div><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span></div></div><div class="p-space-sm"><div class="bg-surface-container rounded-lg p-space-sm flex items-center justify-between"><div class="flex items-center gap-space-sm overflow-hidden"><div class="w-8 h-8 rounded-full bg-surface-container-high flex-shrink-0 flex items-center justify-center"><span class="material-symbols-outlined text-primary text-[18px]">swords</span></div><div class="min-w-0"><span class="font-body-sm text-body-sm font-semibold text-on-surface truncate block">Aeloria Silvervein</span><span class="font-formula-sm text-formula-sm text-on-surface-variant truncate block">Lv.7 Bladesinger</span></div></div><button class="p-space-xs text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">unfold_more</span></button></div></div><nav class="flex flex-col gap-space-xs px-space-sm py-space-xs" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg"><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="character-sheet" href="#"><span class="material-symbols-outlined text-[18px]">shield_person</span><span class="font-body-md text-body-md">Character Sheet</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="grimoire-spells" href="#"><span class="material-symbols-outlined text-[18px]">magic_button</span><span class="font-body-md text-body-md">Spell Grimoire</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="tactical-combat" href="#"><span class="material-symbols-outlined text-[18px]">sports_martial_arts</span><span class="font-body-md text-body-md">Combat Tracker</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="inventory-attunement" href="#"><span class="material-symbols-outlined text-[18px]">backpack</span><span class="font-body-md text-body-md">Inventory &amp; Attunement</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="compendium-rules" href="#"><span class="material-symbols-outlined text-[18px]">menu_book</span><span class="font-body-md text-body-md">2024 Compendium</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="campaign-notes" href="#"><span class="material-symbols-outlined text-[18px]">history_edu</span><span class="font-body-md text-body-md">Campaign Chronicle</span></a></nav></div><div class="p-space-sm"><div class="bg-surface-container-lowest rounded-lg p-space-sm mb-space-sm flex items-center justify-between"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-secondary text-[16px]">casino</span><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Arcane Focus</span></div><span class="font-stat-modifier text-stat-modifier text-primary">+4 INT</span></div><div class="flex items-center justify-between text-on-surface-variant px-space-xs"><span class="font-formula-sm text-formula-sm">System SRD 5.24</span><span class="font-formula-sm text-formula-sm text-outline">Sync: Active</span></div></div></aside><div class="pl-64 flex flex-col min-h-screen"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl z-30 shadow-[0_1px_8px_rgba(0,0,0,0.3)] flex items-center justify-between px-gutter"><div class="flex items-center gap-space-md flex-1 max-w-xl"><div class="relative w-full"><span class="material-symbols-outlined text-outline absolute left-3 top-1/2 -translate-y-1/2 text-[18px]">search</span><input class="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-10 pr-16 py-2 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-all" placeholder="Search spells, feats, weapons, rules..." type="text"/><div class="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1"><kbd class="bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.5 rounded shadow-sm">Ctrl</kbd><kbd class="bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm px-1.5 py-0.5 rounded shadow-sm">K</kbd></div></div></div><div class="flex items-center gap-space-md"><button class="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-xl hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-primary text-[18px]">casino</span><span class="font-label-caps text-label-caps text-on-surface uppercase">Dice Tray</span><span class="font-formula-sm text-formula-sm bg-surface-container-high px-1.5 py-0.5 rounded text-primary-fixed-dim">d20</span></button><button class="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[20px]">bookmarks</span><span class="w-2 h-2 rounded-full bg-primary-container absolute top-1 right-1"></span></button><button class="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[20px]">notifications</span><span class="w-1.5 h-1.5 rounded-full bg-error absolute top-1 right-1"></span></button><div class="h-6 w-px bg-outline-variant/30"></div><div class="flex items-center gap-space-sm"><div class="text-right hidden xl:block"><span class="font-body-sm text-body-sm font-semibold text-on-surface block leading-none">Dungeon Sage</span><span class="font-formula-sm text-formula-sm text-on-surface-variant block">Player ID: #7821</span></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="relative w-full pt-16 pb-14 bg-surface px-gutter flex-1"><div class="flex flex-col w-full">
<div class="relative w-full pb-8 flex flex-col gap-space-lg">
<!-- Top Decorative Ambient Glow -->
<div class="absolute -top-12 left-1/4 w-96 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
<div class="absolute top-24 right-10 w-80 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
<!-- 1. Bestiary Command Header -->
<header class="w-full bg-surface-container-low rounded-2xl p-space-md shadow-xl flex flex-col gap-space-md">
<!-- Top Line: Title & DM Fast Controls -->
<div class="flex flex-wrap items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<div class="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-primary text-[28px]">skull</span>
</div>
<div>
<div class="flex items-center gap-space-sm">
<span class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Bestiary &amp; Codex Monstrorum</span>
<span class="font-formula-sm text-formula-sm bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">2024 Revision</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">5th Edition Monster Manual SRD 5.24 • Tactical Threat &amp; Stat Compendium</p>
</div>
</div>
<!-- DM Encounter Builder Fast Bar -->
<div class="flex items-center gap-space-sm flex-wrap">
<div class="flex items-center gap-space-xs bg-surface-container-lowest px-3 py-1.5 rounded-xl shadow-inner">
<span class="material-symbols-outlined text-secondary text-[18px]">group</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">XP Budget:</span>
<span class="font-stat-modifier text-stat-modifier text-secondary ml-1">18,000</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">/ 24,000 XP</span>
</div>
<button class="flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high px-3 py-2 rounded-xl transition-all shadow-sm" id="btn-rand-encounter">
<span class="material-symbols-outlined text-primary text-[18px]">casino</span>
<span class="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">Random Threat</span>
</button>
<button class="flex items-center gap-space-xs bg-primary hover:bg-primary-fixed-dim text-on-primary font-formula-sm text-formula-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md">
<span class="material-symbols-outlined text-[18px]">swords</span>
<span>Encounter Quick-Add</span>
</button>
</div>
</div>
<!-- Search & Filters Container -->
<div class="flex flex-col gap-space-sm pt-space-xs">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-sm">
<!-- Search input -->
<div class="lg:col-span-6 relative">
<span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
<input class="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md pl-11 pr-20 py-2.5 rounded-xl focus:outline-none shadow-inner" id="monster-search" placeholder="Search 5e monsters, fiends, dragons, aberrations, stats (Ctrl+K)..." type="text"/>
<span class="absolute right-3 top-1/2 -translate-y-1/2 font-formula-sm text-formula-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded shadow-sm">184 Foes</span>
</div>
<!-- Quick Filters: Type, Size, Align -->
<div class="lg:col-span-6 flex items-center gap-space-xs flex-wrap">
<div class="flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-xl shadow-sm">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Type:</span>
<select class="bg-transparent text-primary font-formula-sm text-formula-sm focus:outline-none cursor-pointer">
<option class="bg-surface-container-high text-on-surface" value="all">All Types</option>
<option class="bg-surface-container-high text-on-surface" selected="" value="dragon">Dragon (24)</option>
<option class="bg-surface-container-high text-on-surface" value="fiend">Fiend (38)</option>
<option class="bg-surface-container-high text-on-surface" value="undead">Undead (41)</option>
<option class="bg-surface-container-high text-on-surface" value="aberration">Aberration (19)</option>
<option class="bg-surface-container-high text-on-surface" value="monstrosity">Monstrosity (32)</option>
<option class="bg-surface-container-high text-on-surface" value="humanoid">Humanoid (50)</option>
</select>
</div>
<div class="flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-xl shadow-sm">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Size:</span>
<select class="bg-transparent text-primary font-formula-sm text-formula-sm focus:outline-none cursor-pointer">
<option class="bg-surface-container-high text-on-surface" value="all">Any Size</option>
<option class="bg-surface-container-high text-on-surface" selected="" value="huge">Huge</option>
<option class="bg-surface-container-high text-on-surface" value="gargantuan">Gargantuan</option>
<option class="bg-surface-container-high text-on-surface" value="large">Large</option>
<option class="bg-surface-container-high text-on-surface" value="medium">Medium</option>
<option class="bg-surface-container-high text-on-surface" value="small">Small</option>
</select>
</div>
<div class="flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-xl shadow-sm ml-auto">
<span class="material-symbols-outlined text-outline text-[16px]">swap_vert</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Sort:</span>
<span class="font-formula-sm text-formula-sm text-secondary font-semibold">CR (High to Low)</span>
</div>
</div>
</div>
<!-- Challenge Rating Pills Rail -->
<div class="flex items-center gap-space-xs overflow-x-auto pt-1 no-scrollbar">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase pr-1 shrink-0">CR Tier:</span>
<button class="bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm px-3 py-1 rounded-lg shrink-0 transition-colors">All CR</button>
<button class="bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm px-3 py-1 rounded-lg shrink-0 transition-colors">CR 0–1</button>
<button class="bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm px-3 py-1 rounded-lg shrink-0 transition-colors">CR 2–4</button>
<button class="bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm px-3 py-1 rounded-lg shrink-0 transition-colors">CR 5–9</button>
<button class="bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm px-3 py-1 rounded-lg shrink-0 transition-colors">CR 10–15</button>
<button class="bg-primary text-on-primary font-formula-sm text-formula-sm px-3 py-1 rounded-lg shrink-0 font-bold shadow-sm">CR 16+ (Apex)</button>
<div class="h-4 w-px bg-surface-container-highest mx-2 shrink-0"></div>
<button class="bg-surface-container-lowest text-on-surface-variant hover:text-primary font-formula-sm text-formula-sm px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">volcano</span> Mountain / Lair
          </button>
<button class="bg-surface-container-lowest text-on-surface-variant hover:text-primary font-formula-sm text-formula-sm px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">water_drop</span> Underdark
          </button>
<button class="bg-surface-container-lowest text-on-surface-variant hover:text-primary font-formula-sm text-formula-sm px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">forest</span> Forest
          </button>
</div>
</div>
</header>
<!-- Main Content Workspace: 12-Column Split Layout -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
<!-- LEFT: Monster Roster Master List (5 cols) -->
<section class="xl:col-span-5 flex flex-col gap-space-sm">
<div class="flex items-center justify-between px-space-xs">
<div class="flex items-center gap-2">
<span class="font-label-caps text-label-caps text-primary uppercase tracking-wider">Filtered Codex Roster</span>
<span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
</div>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">Displaying 6 of 184 Monsters</span>
</div>
<!-- Scrollable Monster Cards Deck -->
<div class="flex flex-col gap-space-sm max-h-[1050px] overflow-y-auto pr-1">
<!-- Card 1: SELECTED ACTIVE (Adult Red Dragon) -->
<article class="relative bg-surface-container rounded-2xl p-space-md shadow-xl transition-all cursor-pointer group">
<div class="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full"></div>
<div class="flex items-start gap-space-md">
<div class="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow-lg bg-surface-container-lowest">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Intimidating high-fantasy illustration portrait of an Adult Red Dragon with glowing molten gold eyes, smoke rising from horned snout, crimson scales under dramatic atmospheric moonlit rim lighting on deep obsidian background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPdduUJoy5iVOp7Ziuj9KF1yh4MkemPv1wAuizVB2rTHcHhJ6h6oBRnE5-nV2kFom6bkpeWH1Rct4UgX4XsWnHb1Zq9dcyppZxam6h14KyPlWvOvZlBjcTNegJtBIFOhrgmQ33Uef8X440ldyqTFdh1Tw5TDC3iduAscL2JtD4Sunnr0qcrVeecTcK3TwmY4-oI9M1EBAhc4zQN7VQ5hDXuPcqSo9Q6qOTkxXz2aal"/>
<span class="absolute bottom-0 right-0 bg-error text-on-error font-formula-sm text-formula-sm px-1 rounded-tl font-bold text-[10px]">CR 17</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-start justify-between gap-2">
<div>
<h3 class="font-headline-sm text-headline-sm text-primary tracking-wide leading-tight group-hover:text-primary-fixed transition-colors">Adult Red Dragon</h3>
<p class="font-formula-sm text-formula-sm text-on-surface-variant truncate">Huge Dragon • Chaotic Evil • Mountain/Lair</p>
</div>
<button class="p-1 rounded-lg bg-primary/20 text-primary hover:bg-primary hover:text-on-primary transition-colors" title="Added to Encounter">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
</button>
</div>
<!-- Stats summary strip -->
<div class="grid grid-cols-3 gap-2 mt-3 pt-2 bg-surface-container-lowest/60 rounded-xl p-2">
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Armor Class</span>
<span class="font-stat-modifier text-stat-modifier text-secondary">19</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Natural</span>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Hit Points</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">256</span>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-1 overflow-hidden">
<div class="bg-primary h-full w-full"></div>
</div>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Speed</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">80 ft</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Fly / Walk 40</span>
</div>
</div>
</div>
</div>
<div class="mt-2.5 flex items-center justify-between font-formula-sm text-formula-sm">
<span class="text-primary flex items-center gap-1 font-semibold">
<span class="material-symbols-outlined text-[14px]">visibility</span> Inspected Active
              </span>
<span class="text-on-surface-variant">18,000 XP • Prof +6</span>
</div>
</article>
<!-- Card 2: Mind Flayer Arcanist -->
<article class="bg-surface-container-low hover:bg-surface-container rounded-2xl p-space-md shadow-md transition-all cursor-pointer group">
<div class="flex items-start gap-space-md">
<div class="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow bg-surface-container-lowest">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Dark fantasy portrait of an Illithid Mind Flayer Arcanist clad in runic obsidian robes, glowing purple psionic energy tendrils surrounding tactile face tentacles, cold blue subterranean rim lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo_JBQNkPkkqvATb3yQhBpbl6uvhnkdFBKPvCuU6nGrNV65q5L3W75k2xPQkvpMhpe5Hn-6vhdb_iXMttUmCsvN8Ok3KTFnCsHrhc-y3Ht-SSd768PaLiyJiU0VuhfTtat6ppcAYVGxR9tPx3Cc9QO8I1-3qew6bh9ed_1XavHgJ3LZqTMZoRHbTcwtjT51rMEOd_rceYfZoJpoaP_ddhGr5oM9_vMzDcQQgjkhlmC"/>
<span class="absolute bottom-0 right-0 bg-surface-container-highest text-tertiary font-formula-sm text-formula-sm px-1 rounded-tl font-bold text-[10px]">CR 8</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-start justify-between gap-2">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface tracking-wide leading-tight group-hover:text-primary transition-colors">Mind Flayer Arcanist</h3>
<p class="font-formula-sm text-formula-sm text-on-surface-variant truncate">Medium Aberration • Lawful Evil • Underdark</p>
</div>
<button class="p-1 rounded-lg text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors" title="Add to Encounter">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
</button>
</div>
<div class="grid grid-cols-3 gap-2 mt-3 pt-2 bg-surface-container-lowest/40 rounded-xl p-2">
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Armor Class</span>
<span class="font-stat-modifier text-stat-modifier text-secondary">15</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Breastplate</span>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Hit Points</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">71</span>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-1 overflow-hidden">
<div class="bg-secondary h-full w-[75%]"></div>
</div>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Speed</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">30 ft</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Walk</span>
</div>
</div>
</div>
</div>
<div class="mt-2.5 flex items-center justify-between font-formula-sm text-formula-sm">
<span class="text-on-surface-variant">Psionic Innate Spells (Lv.5)</span>
<span class="text-on-surface-variant">3,900 XP • Prof +3</span>
</div>
</article>
<!-- Card 3: Beholder -->
<article class="bg-surface-container-low hover:bg-surface-container rounded-2xl p-space-md shadow-md transition-all cursor-pointer group">
<div class="flex items-start gap-space-md">
<div class="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow bg-surface-container-lowest">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Eerie close-up fantasy painting of a Beholder eye tyrant with a massive central ocular orb reflecting an antimagic cone, ten writhing eyestalks crackling with colorful arcane energy beams." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkLUjM-aJi6lqECbJdpfqe-Mm7EuLNSor3huW3RuQph_3KyGdgIv5Q05jcIVF1qKbWaFkx3TRS03yzOgX_oN_EdkvWfuK_nGpHd5JbYxS3UKWCvbZhT1_5EfX9X0xGa-3ABIZRKGGWp-qK-3vFtV0X41f5SWFITeVXzqj79rzVdYfaTl1IfvTZCPTARqTNIOjzL5lN0Ygxz3lX70USrrwPc0cEsW2PSBSKIKDUZNrg"/>
<span class="absolute bottom-0 right-0 bg-primary-container text-on-primary-container font-formula-sm text-formula-sm px-1 rounded-tl font-bold text-[10px]">CR 13</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-start justify-between gap-2">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface tracking-wide leading-tight group-hover:text-primary transition-colors">Beholder</h3>
<p class="font-formula-sm text-formula-sm text-on-surface-variant truncate">Large Aberration • Lawful Evil • Underdark Lair</p>
</div>
<button class="p-1 rounded-lg text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors" title="Add to Encounter">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
</button>
</div>
<div class="grid grid-cols-3 gap-2 mt-3 pt-2 bg-surface-container-lowest/40 rounded-xl p-2">
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Armor Class</span>
<span class="font-stat-modifier text-stat-modifier text-secondary">18</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Natural</span>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Hit Points</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">180</span>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-1 overflow-hidden">
<div class="bg-primary-container h-full w-[85%]"></div>
</div>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Speed</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">20 ft</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Fly (hover)</span>
</div>
</div>
</div>
</div>
<div class="mt-2.5 flex items-center justify-between font-formula-sm text-formula-sm">
<span class="text-secondary">Antimagic Cone (150 ft)</span>
<span class="text-on-surface-variant">10,000 XP • Prof +5</span>
</div>
</article>
<!-- Card 4: Death Knight -->
<article class="bg-surface-container-low hover:bg-surface-container rounded-2xl p-space-md shadow-md transition-all cursor-pointer group">
<div class="flex items-start gap-space-md">
<div class="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow bg-surface-container-lowest">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Ominous dark fantasy portrait of a skeletal Death Knight in gothic black plate armor etched with necromantic runes, two burning orange embers inside his dark visor, gripping a runed greatsword." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr61-xEGk9SD9EIlY3QYymzOhfP_0G5I5qF1XOZn2C9aKuXEpVhkeT7zClUajFl_AlQMLeq8BzIKukZJSUBWsWAoubMAaMUd5qT2sxOniiAq5DPMhl0Z-kgtOlb0u2T2y08R_WFsqlHhzWOVCy1I258rCQaGOzcFTo1v-j5v9uAQpzImtxbgraZk4-z6Vq0dUZJk-4RjpvrotNF8UyI4jyOKGCcbjwrJHXuwpJu4C4"/>
<span class="absolute bottom-0 right-0 bg-error text-on-error font-formula-sm text-formula-sm px-1 rounded-tl font-bold text-[10px]">CR 17</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-start justify-between gap-2">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface tracking-wide leading-tight group-hover:text-primary transition-colors">Death Knight</h3>
<p class="font-formula-sm text-formula-sm text-on-surface-variant truncate">Medium Undead • Chaotic Evil • Crypt/Ruin</p>
</div>
<button class="p-1 rounded-lg text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors" title="Add to Encounter">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
</button>
</div>
<div class="grid grid-cols-3 gap-2 mt-3 pt-2 bg-surface-container-lowest/40 rounded-xl p-2">
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Armor Class</span>
<span class="font-stat-modifier text-stat-modifier text-secondary">20</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Plate Armor</span>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Hit Points</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">180</span>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-1 overflow-hidden">
<div class="bg-error h-full w-[80%]"></div>
</div>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Speed</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">30 ft</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Walk</span>
</div>
</div>
</div>
</div>
<div class="mt-2.5 flex items-center justify-between font-formula-sm text-formula-sm">
<span class="text-error">Hellfire Orb (20d6)</span>
<span class="text-on-surface-variant">18,000 XP • Prof +6</span>
</div>
</article>
<!-- Card 5: Displacer Beast -->
<article class="bg-surface-container-low hover:bg-surface-container rounded-2xl p-space-md shadow-md transition-all cursor-pointer group">
<div class="flex items-start gap-space-md">
<div class="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow bg-surface-container-lowest">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Feline monstrosity displacer beast with six legs and two spiked tentacles rising from shoulders, shadowy illusory duplicates blurring its silhouette in a dark mystical twilight forest." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvndz4FNQW9ZkC2kcjeRNjYWHVkS2P_0J8yR-6iux83GXQ3KH5aj5optNFg9xz37v-3SxJy6XmHiTSuzYreerqR_7ufKI4RIf6b-TKIHVnzuVgIIaFfsg1pf-xG0SHKeYLf4vFA7wu6i90ffAmRH0c6XGUuwyMQCsvnjpfH0liIwq3mav4_K4kuyfNZs6vJil53EUR_4r4_nmSh6JAHWfh6lNTBnuEgfDZ2FC508jj"/>
<span class="absolute bottom-0 right-0 bg-surface-container-highest text-secondary font-formula-sm text-formula-sm px-1 rounded-tl font-bold text-[10px]">CR 3</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-start justify-between gap-2">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface tracking-wide leading-tight group-hover:text-primary transition-colors">Displacer Beast</h3>
<p class="font-formula-sm text-formula-sm text-on-surface-variant truncate">Large Monstrosity • Lawful Evil • Forest</p>
</div>
<button class="p-1 rounded-lg text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors" title="Add to Encounter">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
</button>
</div>
<div class="grid grid-cols-3 gap-2 mt-3 pt-2 bg-surface-container-lowest/40 rounded-xl p-2">
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Armor Class</span>
<span class="font-stat-modifier text-stat-modifier text-secondary">13</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Natural</span>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Hit Points</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">85</span>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-1 overflow-hidden">
<div class="bg-secondary h-full w-[65%]"></div>
</div>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Speed</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">40 ft</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Walk</span>
</div>
</div>
</div>
</div>
<div class="mt-2.5 flex items-center justify-between font-formula-sm text-formula-sm">
<span class="text-secondary">Displacement Trait</span>
<span class="text-on-surface-variant">700 XP • Prof +2</span>
</div>
</article>
<!-- Card 6: Young White Dragon -->
<article class="bg-surface-container-low hover:bg-surface-container rounded-2xl p-space-md shadow-md transition-all cursor-pointer group">
<div class="flex items-start gap-space-md">
<div class="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow bg-surface-container-lowest">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Feral Young White Dragon with frosted crystalline scales clinging to a frozen glacial cliff, blue cold vapor spilling from jagged jaws, icy blizzard wind atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWuV4CRxbh8MqAe_VphEGWYxDGXAK2Y0utdc-gMBCY-2xWYqktxN6UbQ6kTTDRWaRMulK11DtmSQ7Fk_lWNpzbvxFRhyAnJ9x8RIBWC8KqWKyJm_N4igZacvnqLXokyNLcDqstOs19QOUQEYqMSV5TIfptstukwac00HM8bjiXTiiI0fKnZ-FKC1F5E_FnMjcE3WbcHHqd4pUiYy3m2qOzHuJy33PyPFXPD0TKRYsf"/>
<span class="absolute bottom-0 right-0 bg-surface-container-highest text-secondary font-formula-sm text-formula-sm px-1 rounded-tl font-bold text-[10px]">CR 6</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-start justify-between gap-2">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface tracking-wide leading-tight group-hover:text-primary transition-colors">Young White Dragon</h3>
<p class="font-formula-sm text-formula-sm text-on-surface-variant truncate">Large Dragon • Chaotic Evil • Arctic</p>
</div>
<button class="p-1 rounded-lg text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors" title="Add to Encounter">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
</button>
</div>
<div class="grid grid-cols-3 gap-2 mt-3 pt-2 bg-surface-container-lowest/40 rounded-xl p-2">
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Armor Class</span>
<span class="font-stat-modifier text-stat-modifier text-secondary">17</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Natural</span>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Hit Points</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">133</span>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-1 overflow-hidden">
<div class="bg-secondary-container h-full w-[80%]"></div>
</div>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Speed</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface">80 ft</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px]">Fly / Walk 40</span>
</div>
</div>
</div>
</div>
<div class="mt-2.5 flex items-center justify-between font-formula-sm text-formula-sm">
<span class="text-secondary">Cold Breath (10d8 Cold)</span>
<span class="text-on-surface-variant">2,300 XP • Prof +3</span>
</div>
</article>
</div>
</section>
<!-- RIGHT: Interactive 2024 D&D Stat Block Sidepanel (7 cols) -->
<section class="xl:col-span-7 bg-surface-container-low rounded-2xl shadow-2xl p-space-md md:p-space-lg flex flex-col gap-space-md relative overflow-hidden">
<!-- Arcane Background Seal Accent -->
<div class="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
<!-- 2.1 Stat Block Header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container rounded-xl p-space-md shadow-md">
<div>
<div class="flex items-center gap-space-sm flex-wrap">
<h2 class="font-headline-lg text-headline-lg text-primary tracking-wide">Adult Red Dragon</h2>
<span class="font-formula-sm text-formula-sm bg-error/20 text-error px-2.5 py-0.5 rounded-full uppercase font-bold">Legendary Threat</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant italic mt-0.5">Huge Dragon, Chaotic Evil (SRD 5.24)</p>
</div>
<!-- CR & Prof Big Callout -->
<div class="flex items-center gap-space-md self-start sm:self-auto bg-surface-container-lowest px-4 py-2 rounded-xl shadow-inner">
<div class="text-center pr-3 border-r border-surface-container-highest">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Challenge</span>
<span class="font-stat-numeric text-stat-numeric text-primary leading-none">17</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant text-[10px]">18,000 XP</span>
</div>
<div class="text-center">
<span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Prof. Bonus</span>
<span class="font-stat-numeric text-stat-numeric text-secondary leading-none">+6</span>
<span class="block font-formula-sm text-formula-sm text-on-surface-variant text-[10px]">Tier 4</span>
</div>
</div>
</div>
<!-- 2.2 Vitals Row (AC, HP Dice Formula, Speeds) -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
<div class="bg-surface-container rounded-xl p-space-sm flex items-center gap-space-sm shadow-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-secondary text-[22px]">shield</span>
</div>
<div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block">Armor Class</span>
<div class="flex items-baseline gap-1.5">
<span class="font-stat-numeric text-stat-numeric text-secondary">19</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(Natural Armor)</span>
</div>
</div>
</div>
<div class="bg-surface-container rounded-xl p-space-sm flex items-center gap-space-sm shadow-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-error text-[22px]">favorite</span>
</div>
<div class="flex-1">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block">Hit Points</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">256 / 256</span>
</div>
<div class="flex items-baseline gap-1.5">
<span class="font-stat-numeric text-stat-numeric text-on-surface">256</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant">(19d12 + 133)</span>
</div>
</div>
</div>
<div class="bg-surface-container rounded-xl p-space-sm flex items-center gap-space-sm shadow-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-tertiary text-[22px]">speed</span>
</div>
<div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block">Speed</span>
<span class="font-formula-sm text-formula-sm text-on-surface block font-semibold">40 ft., climb 40 ft., fly 80 ft.</span>
</div>
</div>
</div>
<!-- 2.3 Six Ability Scores Grid (STR, DEX, CON, INT, WIS, CHA) -->
<div class="bg-surface-container rounded-xl p-space-md shadow-sm">
<div class="flex items-center justify-between pb-space-xs mb-space-xs">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Ability Scores &amp; Saving Throws</span>
<span class="font-formula-sm text-formula-sm text-primary flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">star</span> Saving Throw Proficient
            </span>
</div>
<div class="grid grid-cols-3 sm:grid-cols-6 gap-space-xs text-center">
<!-- STR -->
<div class="bg-surface-container-lowest rounded-lg p-2 relative group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block">STR</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface block">27</span>
<span class="font-stat-modifier text-stat-modifier text-primary block">+8</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px] mt-0.5">Save: +8</span>
</div>
<!-- DEX -->
<div class="bg-surface-container-lowest rounded-lg p-2 relative group hover:bg-surface-container-high transition-colors ring-1 ring-primary/40">
<span class="font-label-caps text-label-caps text-primary uppercase block font-bold">DEX ★</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface block">10</span>
<span class="font-stat-modifier text-stat-modifier text-on-surface-variant block">+0</span>
<span class="font-formula-sm text-formula-sm text-primary font-bold block text-[10px] mt-0.5">Save: +6</span>
</div>
<!-- CON -->
<div class="bg-surface-container-lowest rounded-lg p-2 relative group hover:bg-surface-container-high transition-colors ring-1 ring-primary/40">
<span class="font-label-caps text-label-caps text-primary uppercase block font-bold">CON ★</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface block">25</span>
<span class="font-stat-modifier text-stat-modifier text-primary block">+7</span>
<span class="font-formula-sm text-formula-sm text-primary font-bold block text-[10px] mt-0.5">Save: +13</span>
</div>
<!-- INT -->
<div class="bg-surface-container-lowest rounded-lg p-2 relative group hover:bg-surface-container-high transition-colors">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block">INT</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface block">16</span>
<span class="font-stat-modifier text-stat-modifier text-secondary block">+3</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant block text-[10px] mt-0.5">Save: +3</span>
</div>
<!-- WIS -->
<div class="bg-surface-container-lowest rounded-lg p-2 relative group hover:bg-surface-container-high transition-colors ring-1 ring-primary/40">
<span class="font-label-caps text-label-caps text-primary uppercase block font-bold">WIS ★</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface block">15</span>
<span class="font-stat-modifier text-stat-modifier text-secondary block">+2</span>
<span class="font-formula-sm text-formula-sm text-primary font-bold block text-[10px] mt-0.5">Save: +8</span>
</div>
<!-- CHA -->
<div class="bg-surface-container-lowest rounded-lg p-2 relative group hover:bg-surface-container-high transition-colors ring-1 ring-primary/40">
<span class="font-label-caps text-label-caps text-primary uppercase block font-bold">CHA ★</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface block">21</span>
<span class="font-stat-modifier text-stat-modifier text-primary block">+5</span>
<span class="font-formula-sm text-formula-sm text-primary font-bold block text-[10px] mt-0.5">Save: +11</span>
</div>
</div>
</div>
<!-- 2.4 Senses, Immunities & Skills List -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm font-body-sm text-body-sm">
<div class="bg-surface-container rounded-xl p-space-sm space-y-1.5 shadow-sm">
<div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block text-[10px]">Skills</span>
<span class="text-on-surface font-formula-sm text-formula-sm">Perception +14, Stealth +6</span>
</div>
<div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block text-[10px]">Damage Immunities</span>
<span class="text-error font-semibold font-formula-sm text-formula-sm">Fire</span>
</div>
<div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block text-[10px]">Condition Immunities</span>
<span class="text-on-surface font-formula-sm text-formula-sm">Frightened</span>
</div>
</div>
<div class="bg-surface-container rounded-xl p-space-sm space-y-1.5 shadow-sm">
<div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block text-[10px]">Senses</span>
<span class="text-on-surface font-formula-sm text-formula-sm">Blindsight 60 ft., Darkvision 120 ft., Passive Perception 24</span>
</div>
<div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block text-[10px]">Languages</span>
<span class="text-on-surface font-formula-sm text-formula-sm">Common, Draconic</span>
</div>
<div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase block text-[10px]">Environment</span>
<span class="text-secondary font-formula-sm text-formula-sm">Mountains, Volcanic Caverns</span>
</div>
</div>
</div>
<!-- 2.5 Traits & Legendary Resistance -->
<div class="bg-surface-container rounded-xl p-space-md shadow-sm space-y-space-sm">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-primary">Innate Traits &amp; Resistances</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Passive Features</span>
</div>
<!-- Legendary Resistance with Spendable Pips -->
<div class="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div>
<span class="font-body-md text-body-md font-bold text-on-surface block">Legendary Resistance (3/Day)</span>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                If the dragon fails a saving throw, it can choose to succeed instead.
              </p>
</div>
<div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center" id="leg-resistance-pips">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase mr-1">Uses:</span>
<button class="w-6 h-6 rounded-md bg-primary text-on-primary flex items-center justify-center font-formula-sm text-formula-sm font-bold shadow-sm transition hover:scale-105" onclick="this.classList.toggle('opacity-30')">1</button>
<button class="w-6 h-6 rounded-md bg-primary text-on-primary flex items-center justify-center font-formula-sm text-formula-sm font-bold shadow-sm transition hover:scale-105" onclick="this.classList.toggle('opacity-30')">2</button>
<button class="w-6 h-6 rounded-md bg-primary text-on-primary flex items-center justify-center font-formula-sm text-formula-sm font-bold shadow-sm transition hover:scale-105" onclick="this.classList.toggle('opacity-30')">3</button>
</div>
</div>
<!-- Dragon Traits narrative -->
<div class="space-y-1.5 text-body-sm font-body-sm text-on-surface">
<p><strong class="text-primary font-formula-sm">Magic Resistance.</strong> The dragon has advantage on saving throws against spells and other magical effects.</p>
</div>
</div>
<!-- 2.6 Tactical Action Economy Tabs / Modules -->
<div class="flex flex-col gap-space-sm">
<div class="flex items-center justify-between border-b border-surface-container-highest pb-2">
<div class="flex items-center gap-space-xs">
<span class="font-headline-sm text-headline-sm text-on-surface">Action Economy</span>
<span class="bg-surface-container px-2 py-0.5 rounded font-formula-sm text-formula-sm text-secondary">Turn Phase</span>
</div>
<!-- Dice Roll Output Toast placeholder -->
<div class="hidden items-center gap-2 bg-primary text-on-primary px-3 py-1 rounded-lg font-formula-sm text-formula-sm font-bold animate-pulse" id="dice-roll-toast">
<span class="material-symbols-outlined text-[16px]">casino</span>
<span id="dice-toast-message">Rolled 2d10+8: [24]</span>
</div>
</div>
<!-- ACTIONS LIST -->
<div class="space-y-space-sm">
<!-- Multiattack -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col gap-1">
<div class="flex items-center justify-between">
<span class="font-body-md text-body-md font-bold text-primary">Multiattack</span>
<span class="bg-surface-container-high text-on-surface font-label-caps text-label-caps px-2 py-0.5 rounded uppercase">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
                The dragon makes three attacks: one with its <strong class="text-on-surface">Bite</strong> and two with its <strong class="text-on-surface">Claws</strong>.
              </p>
</div>
<!-- Bite Weapon Attack -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<div class="flex items-center gap-2">
<span class="font-body-md text-body-md font-bold text-on-surface">Bite (Melee Weapon Attack)</span>
<span class="bg-surface-container-high text-on-surface font-label-caps text-label-caps px-2 py-0.5 rounded uppercase">Reach 10 ft</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Hit: 19 (2d10 + 8) piercing damage plus 7 (2d6) fire damage.
                </p>
</div>
<!-- Quick Roll Buttons -->
<div class="flex items-center gap-1.5 shrink-0">
<button class="bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 shadow transition" onclick="triggerRoll('Bite Attack', 'd20 + 14', 28)">
<span class="material-symbols-outlined text-[14px]">casino</span>
<span>Atk +14</span>
</button>
<button class="bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary text-secondary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 shadow transition" onclick="triggerRoll('Bite Piercing Dmg', '2d10 + 8', 21)">
<span class="material-symbols-outlined text-[14px]">token</span>
<span>2d10+8 Piercing</span>
</button>
</div>
</div>
<!-- Claw Weapon Attack -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<div class="flex items-center gap-2">
<span class="font-body-md text-body-md font-bold text-on-surface">Claw (Melee Weapon Attack)</span>
<span class="bg-surface-container-high text-on-surface font-label-caps text-label-caps px-2 py-0.5 rounded uppercase">Reach 5 ft</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Hit: 15 (2d6 + 8) slashing damage.
                </p>
</div>
<div class="flex items-center gap-1.5 shrink-0">
<button class="bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 shadow transition" onclick="triggerRoll('Claw Attack', 'd20 + 14', 26)">
<span class="material-symbols-outlined text-[14px]">casino</span>
<span>Atk +14</span>
</button>
<button class="bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary text-secondary px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 shadow transition" onclick="triggerRoll('Claw Slashing Dmg', '2d6 + 8', 16)">
<span class="material-symbols-outlined text-[14px]">token</span>
<span>2d6+8 Slash</span>
</button>
</div>
</div>
<!-- Fire Breath Weapon with Recharge Bar -->
<div class="bg-surface-container rounded-xl p-space-sm shadow-sm flex flex-col gap-space-xs">
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2">
<span class="font-body-md text-body-md font-bold text-error">Fire Breath (Recharge 5–6)</span>
<span class="bg-error/20 text-error font-label-caps text-label-caps px-2 py-0.5 rounded uppercase">DC 21 Dex</span>
</div>
<div class="flex items-center gap-2">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Recharge State:</span>
<button class="bg-primary/20 text-primary hover:bg-primary hover:text-on-primary px-2.5 py-0.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition" id="recharge-badge" onclick="rollRecharge()">
<span class="material-symbols-outlined text-[14px]">bolt</span>
<span id="recharge-status-txt">Charged (Ready)</span>
</button>
</div>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
                The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 63 (18d6) fire damage on a failed save, or half as much on a successful one.
              </p>
<div class="flex items-center justify-end gap-2 pt-1">
<button class="bg-error text-on-error hover:bg-error-container px-3 py-1.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 shadow transition" onclick="triggerRoll('Fire Breath Damage', '18d6 Fire', 68)">
<span class="material-symbols-outlined text-[16px]">local_fire_department</span>
<span>Roll Breath (18d6 Fire)</span>
</button>
</div>
</div>
</div>
<!-- 2.7 Legendary Actions Section -->
<div class="bg-surface-container rounded-xl p-space-md shadow-sm space-y-space-sm mt-space-xs">
<div class="flex flex-wrap items-center justify-between gap-2">
<div>
<span class="font-headline-sm text-headline-sm text-primary">Legendary Actions</span>
<p class="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                  Can take 3 legendary actions, choosing from the options below. Only one action option can be used at a time and only at the end of another creature’s turn.
                </p>
</div>
<!-- 3 Interactive Action Points -->
<div class="flex items-center gap-1 bg-surface-container-lowest px-3 py-1.5 rounded-xl shadow-inner">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase mr-1">Points:</span>
<span class="w-4 h-4 rounded-full bg-primary shadow-[0_0_8px_rgba(242,202,80,0.6)] cursor-pointer" onclick="this.classList.toggle('opacity-20')" title="Toggle Action Pip 1"></span>
<span class="w-4 h-4 rounded-full bg-primary shadow-[0_0_8px_rgba(242,202,80,0.6)] cursor-pointer" onclick="this.classList.toggle('opacity-20')" title="Toggle Action Pip 2"></span>
<span class="w-4 h-4 rounded-full bg-primary shadow-[0_0_8px_rgba(242,202,80,0.6)] cursor-pointer" onclick="this.classList.toggle('opacity-20')" title="Toggle Action Pip 3"></span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-xs">
<!-- Detect -->
<div class="bg-surface-container-lowest rounded-lg p-space-xs flex flex-col justify-between">
<div>
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm font-bold text-on-surface">Detect</span>
<span class="font-label-caps text-label-caps text-on-surface-variant">1 Cost</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-1">The dragon makes a Wisdom (Perception) check.</p>
</div>
<button class="mt-2 text-left text-primary font-formula-sm text-formula-sm hover:underline flex items-center gap-1" onclick="triggerRoll('Detect Check', 'd20 + 14', 27)">
<span class="material-symbols-outlined text-[14px]">search</span> Roll Perception +14
                </button>
</div>
<!-- Tail Attack -->
<div class="bg-surface-container-lowest rounded-lg p-space-xs flex flex-col justify-between">
<div>
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm font-bold text-on-surface">Tail Attack</span>
<span class="font-label-caps text-label-caps text-on-surface-variant">1 Cost</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-1">Melee attack (reach 15 ft.), hit: 17 (2d8 + 8) bludgeoning.</p>
</div>
<button class="mt-2 text-left text-primary font-formula-sm text-formula-sm hover:underline flex items-center gap-1" onclick="triggerRoll('Tail Attack', 'd20 + 14', 24)">
<span class="material-symbols-outlined text-[14px]">casino</span> Roll Tail Atk +14
                </button>
</div>
<!-- Wing Attack (Costs 2 Actions) -->
<div class="bg-surface-container-lowest rounded-lg p-space-xs flex flex-col justify-between">
<div>
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm font-bold text-secondary">Wing Attack</span>
<span class="font-label-caps text-label-caps text-secondary font-bold">2 Cost</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-1">Beats wings; 15-ft radius DC 22 Dex save or prone &amp; take 15 (2d6+8) damage.</p>
</div>
<button class="mt-2 text-left text-secondary font-formula-sm text-formula-sm hover:underline flex items-center gap-1" onclick="triggerRoll('Wing Attack Dmg', '2d6 + 8', 15)">
<span class="material-symbols-outlined text-[14px]">air</span> Roll Wing Dmg (2d6+8)
                </button>
</div>
</div>
</div>
<!-- 2.8 Lair Actions Accordion -->
<details class="bg-surface-container rounded-xl p-space-sm shadow-sm group">
<summary class="flex items-center justify-between cursor-pointer list-none">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[18px]">volcano</span>
<span class="font-headline-sm text-headline-sm text-on-surface text-[15px]">Lair Actions &amp; Regional Effects</span>
</div>
<span class="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180 text-[18px]">expand_more</span>
</summary>
<div class="pt-space-sm space-y-2 font-body-sm text-body-sm text-on-surface-variant border-t border-surface-container-highest mt-space-sm">
<p>On initiative count 20 (losing initiative ties), the dragon can take one lair action causing magma eruptions within 120 ft (DC 15 Dex save or 21 fire dmg), tremors creating difficult terrain, or sulfurous cloud clouds obscuring sight.</p>
<div class="flex items-center gap-2 pt-1">
<button class="bg-surface-container-lowest hover:bg-surface-container-high text-on-surface px-3 py-1 rounded font-formula-sm text-formula-sm flex items-center gap-1" onclick="triggerRoll('Magma Eruption DC 15', '6d6 Fire', 23)">
<span class="material-symbols-outlined text-error text-[14px]">local_fire_department</span> Roll Magma Lair (6d6 Fire)
                </button>
</div>
</div>
</details>
</div>
</section>
</div>
</div>
</div>
<script>
  function triggerRoll(title, notation, mockTotal) {
    const toast = document.getElementById('dice-roll-toast');
    const msg = document.getElementById('dice-toast-message');
    if (!toast || !msg) return;
    
    // Add random variance to mock total
    const randomShift = Math.floor(Math.random() * 7) - 3;
    const finalTotal = Math.max(1, mockTotal + randomShift);
    
    msg.textContent = `${title} (${notation}): [ ${finalTotal} ]`;
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    
    clearTimeout(window.__rollToastTimeout);
    window.__rollToastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('flex');
    }, 3500);
  }

  function rollRecharge() {
    const roll = Math.floor(Math.random() * 6) + 1;
    const txt = document.getElementById('recharge-status-txt');
    const badge = document.getElementById('recharge-badge');
    
    if (roll >= 5) {
      txt.textContent = `Charged! (Rolled d6: ${roll})`;
      badge.className = "bg-primary text-on-primary px-2.5 py-0.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition";
    } else {
      txt.textContent = `Expended (Rolled d6: ${roll})`;
      badge.className = "bg-surface-container-highest text-on-surface-variant px-2.5 py-0.5 rounded-lg font-formula-sm text-formula-sm font-bold flex items-center gap-1 transition";
    }
  }

  document.getElementById('btn-rand-encounter')?.addEventListener('click', () => {
    triggerRoll('Encounter Threat Seed', 'd100', 74);
  });
</script></main><footer class="fixed bottom-0 left-64 right-0 h-14 bg-surface-container-lowest/95 backdrop-blur-md z-20 flex items-center justify-between px-gutter shadow-[0_-1px_6px_rgba(0,0,0,0.3)]"><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-error text-[18px]">favorite</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">HP:</span><span class="font-stat-modifier text-stat-modifier text-on-surface">52</span><span class="font-formula-sm text-formula-sm text-outline">/ 52</span></div><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-secondary text-[18px]">shield</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">AC:</span><span class="font-stat-modifier text-stat-modifier text-secondary">17</span><span class="font-formula-sm text-formula-sm text-primary">[22 Bladesong]</span></div><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-primary text-[18px]">bolt</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Init:</span><span class="font-stat-modifier text-stat-modifier text-primary">+4</span></div><div class="flex items-center gap-space-xs"><span class="material-symbols-outlined text-tertiary text-[18px]">speed</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Speed:</span><span class="font-stat-modifier text-stat-modifier text-on-surface">30 ft.</span></div><div class="hidden md:flex items-center gap-space-xs"><span class="material-symbols-outlined text-primary-container text-[18px]">hourglass_bottom</span><span class="font-formula-sm text-formula-sm text-on-surface-variant">Slots Lv.4:</span><span class="font-stat-modifier text-stat-modifier text-primary-fixed">1/1</span></div></div><div class="flex items-center gap-space-md"><div class="flex items-center gap-space-xs"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Bladesong:</span><span class="bg-surface-container-high text-primary font-formula-sm text-formula-sm px-2 py-0.5 rounded">Ready (3/3)</span></div><div class="flex items-center gap-space-xs"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Inspiration:</span><span class="w-3 h-3 rounded-full bg-primary-container shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span></div></div></footer></div>
<div class="fixed inset-0 z-50 hidden items-center justify-center bg-surface-container-lowest/80 backdrop-blur-md p-4 transition-all" id="spell-inspector-modal"><div class="relative w-full max-w-2xl bg-surface-container-low border border-primary/30 rounded-2xl shadow-[0_0_32px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col max-h-[921px]"><div class="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div><div class="absolute -left-20 -bottom-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div><div class="relative z-10 px-6 py-4 border-b border-surface-container-highest/60 flex items-center justify-between bg-surface-container-lowest/60"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-surface-container-high border border-primary/20 flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[24px]" id="modal-spell-icon">magic_button</span></div><div><div class="flex items-center gap-2"><h3 class="font-headline-sm text-headline-sm text-primary" id="modal-spell-name">Spell Name</h3><span class="bg-surface-container-highest text-secondary font-label-caps text-label-caps px-2 py-0.5 rounded uppercase" id="modal-spell-school-pill">School</span></div><p class="font-formula-sm text-formula-sm text-on-surface-variant" id="modal-spell-subheading">Level • Casting Details</p></div></div><button class="text-on-surface-variant hover:text-error hover:bg-surface-container-high p-2 rounded-xl transition-colors" onclick="closeSpellModal()"><span class="material-symbols-outlined text-[20px]">close</span></button></div><div class="relative z-10 p-6 overflow-y-auto space-y-5 font-body-sm text-body-sm"><div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-container rounded-xl p-3 border border-surface-container-highest/40"><div class="text-center"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Casting Time</span><span class="font-formula-sm text-formula-sm font-semibold text-on-surface" id="modal-casting-time">1 Action</span></div><div class="text-center border-l border-surface-container-highest/40"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Range / Area</span><span class="font-formula-sm text-formula-sm font-semibold text-on-surface" id="modal-range">60 ft</span></div><div class="text-center border-l border-surface-container-highest/40"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Components</span><span class="font-formula-sm text-formula-sm font-semibold text-on-surface" id="modal-components">V, S</span></div><div class="text-center border-l border-surface-container-highest/40"><span class="block font-label-caps text-label-caps text-on-surface-variant uppercase">Duration</span><span class="font-formula-sm text-formula-sm font-semibold text-on-surface" id="modal-duration">Instantaneous</span></div></div><div class="space-y-2"><div class="flex items-center gap-2 text-primary font-semibold"><span class="material-symbols-outlined text-[18px]">menu_book</span><span class="">Grimoire Inscription</span></div><p class="text-on-surface bg-surface-container-lowest/80 p-4 rounded-xl border border-surface-container-highest/40 leading-relaxed font-body-sm" id="modal-description"></p></div><div class="space-y-1.5 hidden" id="modal-higher-levels-container"><div class="flex items-center gap-2 text-secondary font-semibold"><span class="material-symbols-outlined text-[18px]">upgrade</span><span class="">At Higher Levels (2024 Upcast)</span></div><p class="text-on-surface-variant bg-surface-container p-3 rounded-lg font-formula-sm text-formula-sm" id="modal-higher-levels-desc"></p></div><div class="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-surface-container-highest/60"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">tune</span><span class="font-label-caps text-label-caps text-on-surface uppercase">Cast Rank</span></div><div class="flex items-center gap-2"><select class="bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-lg px-3 py-1 font-formula-sm text-formula-sm focus:outline-none focus:border-primary" id="modal-upcast-select"><option value="base">Base Level</option></select></div></div></div><div class="relative z-10 px-6 py-4 border-t border-surface-container-highest/60 bg-surface-container-lowest flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-2"><span class="font-formula-sm text-formula-sm text-on-surface-variant">Spellbook ID: <strong class="text-primary">#GRM-2024-5E</strong></span></div><div class="flex items-center gap-2"><button class="bg-primary-container hover:brightness-110 text-on-primary-container px-4 py-2 rounded-xl font-formula-sm text-formula-sm font-bold flex items-center gap-2 shadow-sm transition" id="modal-roll-btn" onclick="modalCastCurrentSpell()"><span class="material-symbols-outlined text-[18px]">casino</span><span class="">Cast &amp; Roll Effect</span></button><button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-xl font-formula-sm text-formula-sm transition" onclick="closeSpellModal()">Dismiss</button></div></div></div></div></body></html>

<!-- Codex & Character Creation Guide (2024 D&D Edition) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"primary":"#f2ca50","primary-fixed":"#ffe088","outline-variant":"#4d4635","on-error":"#690005","error-container":"#93000a","primary-fixed-dim":"#e9c349","tertiary-container":"#a5adff","secondary-fixed":"#c4e7ff","surface-variant":"#313540","surface-container":"#1b1f2a","surface-container-lowest":"#0a0e18","tertiary-fixed-dim":"#bdc2ff","on-secondary":"#00354a","on-secondary-fixed":"#001e2c","surface-dim":"#0f131d","on-tertiary-fixed":"#000767","secondary-container":"#00a6e0","outline":"#99907c","on-primary-fixed":"#241a00","tertiary":"#c7cbff","on-primary-fixed-variant":"#574500","surface-container-highest":"#313540","inverse-surface":"#dfe2f0","on-surface-variant":"#d0c5af","on-tertiary":"#131e8c","inverse-on-surface":"#2c303b","secondary":"#7bd0ff","tertiary-fixed":"#e0e0ff","surface-container-high":"#262a34","on-tertiary-container":"#2d38a1","on-secondary-fixed-variant":"#004c69","secondary-fixed-dim":"#7bd0ff","on-secondary-container":"#00374d","surface-container-low":"#171b26","on-tertiary-fixed-variant":"#2f3aa3","inverse-primary":"#735c00","on-surface":"#dfe2f0","surface":"#0f131d","background":"#0f131d","on-primary-container":"#554300","surface-bright":"#353944","primary-container":"#d4af37","error":"#ffb4ab","on-background":"#dfe2f0","on-primary":"#3c2f00","on-error-container":"#ffdad6","surface-tint":"#e9c349"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"space-xl":"2.5rem","margin":"2rem","space-xs":"0.25rem","gutter-mobile":"0.75rem","space-lg":"1.5rem","space-sm":"0.5rem","margin-mobile":"1rem","space-md":"1rem","gutter":"1.5rem"},"fontFamily":{"stat-numeric":["JetBrains Mono"],"label-caps":["Plus Jakarta Sans"],"stat-modifier":["JetBrains Mono"],"body-md":["Plus Jakarta Sans"],"headline-sm":["Playfair Display"],"headline-lg-mobile":["Playfair Display"],"body-lg":["Plus Jakarta Sans"],"headline-lg":["Playfair Display"],"display-lg-mobile":["Playfair Display"],"display-lg":["Playfair Display"],"headline-md":["Playfair Display"],"body-sm":["Plus Jakarta Sans"],"formula-sm":["JetBrains Mono"]},"fontSize":{"stat-numeric":["24px",{"lineHeight":"28px","letterSpacing":"-0.02em","fontWeight":"700"}],"label-caps":["11px",{"lineHeight":"14px","letterSpacing":"0.08em","fontWeight":"700"}],"stat-modifier":["16px",{"lineHeight":"20px","letterSpacing":"0em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","letterSpacing":"0.01em","fontWeight":"400"}],"headline-sm":["18px",{"lineHeight":"24px","letterSpacing":"0.02em","fontWeight":"600"}],"headline-lg-mobile":["24px",{"lineHeight":"32px","letterSpacing":"0em","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"24px","letterSpacing":"0em","fontWeight":"400"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"0em","fontWeight":"600"}],"display-lg-mobile":["30px",{"lineHeight":"36px","letterSpacing":"-0.01em","fontWeight":"700"}],"display-lg":["40px",{"lineHeight":"48px","letterSpacing":"-0.01em","fontWeight":"700"}],"headline-md":["22px",{"lineHeight":"28px","letterSpacing":"0.01em","fontWeight":"600"}],"body-sm":["12px",{"lineHeight":"16px","letterSpacing":"0.02em","fontWeight":"400"}],"formula-sm":["11px",{"lineHeight":"14px","letterSpacing":"0.02em","fontWeight":"500"}]}}}}</script></head><body class="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container"><aside class="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between py-6 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.5)]"><div class="flex flex-col gap-6"><div class="flex items-center gap-3 px-2"><div class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shadow-[0_0_12px_rgba(212,175,55,0.25)]"><span class="material-symbols-outlined text-[24px]">auto_stories</span></div><div><div class="font-headline-sm text-headline-sm text-primary tracking-tight">Arcana 5e</div><div class="font-formula-sm text-formula-sm text-on-surface-variant uppercase tracking-widest">2024 Revision</div></div></div><div class="px-2"><div class="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-2">Codex &amp; Campaign</div><nav class="flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(212,175,55,0.3)]"><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="2024-compendium" href="#"><span class="material-symbols-outlined text-[20px]">menu_book</span><span class="font-body-md text-body-md">2024 Compendium</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="character-sheet" href="#"><span class="material-symbols-outlined text-[20px]">badge</span><span class="font-body-md text-body-md">Character Sheet</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="spell-grimoire" href="#"><span class="material-symbols-outlined text-[20px]">flare</span><span class="font-body-md text-body-md">Spell Grimoire</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="combat-tracker" href="#"><span class="material-symbols-outlined text-[20px]">swords</span><span class="font-body-md text-body-md">Combat Tracker</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="inventory-attunement" href="#"><span class="material-symbols-outlined text-[20px]">shield</span><span class="font-body-md text-body-md">Inventory &amp; Attunement</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="bestiary" href="#"><span class="material-symbols-outlined text-[20px]">high_res</span><span class="font-body-md text-body-md">Bestiary</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="codex-glossary" href="#"><span class="material-symbols-outlined text-[20px]">school</span><span class="font-body-md text-body-md">Codex &amp; Glossary</span></a></nav></div></div><div class="flex flex-col gap-2 px-2 pt-4 bg-surface-container-low rounded-xl p-3"><div class="flex items-center justify-between text-on-surface-variant"><span class="font-label-caps text-label-caps uppercase">Arcane Attunement</span><span class="font-formula-sm text-formula-sm text-primary">3 / 3</span></div><div class="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden"><div class="bg-primary h-full w-full rounded-full"></div></div><div class="flex items-center justify-between pt-1"><span class="font-body-sm text-body-sm text-on-surface-variant">Inspiration</span><span class="material-symbols-outlined text-primary text-[18px]">stars</span></div></div></aside><div class="pl-72"><header class="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-40 px-8 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.3)]"><div class="flex items-center gap-4 flex-1 max-w-lg"><div class="relative w-full flex items-center"><span class="material-symbols-outlined absolute left-3 text-outline text-[20px]">search</span><input class="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-10 pr-16 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search spells, rules, conditions, feats..." type="text"/><div class="absolute right-3 flex items-center gap-1 font-formula-sm text-formula-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded"><span class="text-[10px]">Ctrl</span><span>K</span></div></div></div><div class="flex items-center gap-5"><button class="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-xl text-primary hover:bg-surface-container-high transition-colors" type="button"><span class="material-symbols-outlined text-[20px]">casino</span><span class="font-label-caps text-label-caps uppercase tracking-wider">Dice Tray</span></button><button class="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button"><span class="material-symbols-outlined text-[22px]">notifications</span><span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span></button><div class="h-6 w-px bg-surface-container-highest"></div><div class="flex items-center gap-3"><div class="text-right hidden sm:block"><div class="font-body-md text-body-md font-semibold text-on-surface leading-tight">Dungeon Sage</div><div class="font-formula-sm text-formula-sm text-primary leading-tight">Level 20 Chronurgist</div></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="w-full pt-16 px-8 min-h-screen bg-background"><div class="flex flex-col w-full">
<!-- Top Ambient Glow -->
<div class="relative w-full overflow-hidden pb-12">
<div class="absolute -top-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
<div class="absolute -top-16 right-1/4 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<!-- Header / Codex Hero Banner -->
<div class="relative z-10 flex flex-col gap-6 pt-4">
<div class="flex flex-wrap items-center justify-between gap-4">
<div class="flex items-center gap-3">
<div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-formula-sm text-formula-sm shadow-sm">
<span class="material-symbols-outlined text-[14px]">verified</span>
<span>2024 SRD Rules Revision</span>
</div>
<div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-secondary font-formula-sm text-formula-sm shadow-sm">
<span class="material-symbols-outlined text-[14px]">school</span>
<span>Beginner-Friendly Codex</span>
</div>
<div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm shadow-sm">
<span class="material-symbols-outlined text-[14px]">update</span>
<span>D&amp;D 5.5e Compatible</span>
</div>
</div>
<div class="flex items-center gap-2">
<button class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-caps text-label-caps transition-all shadow-sm" id="open-all-glossary-btn" type="button">
<span class="material-symbols-outlined text-[16px]">menu_book</span>
<span>Quick Lexicon Drawer</span>
</button>
</div>
</div>
<div class="flex flex-col gap-2 max-w-4xl">
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">
          Adventurer's Codex &amp; Character Creation Guide
        </h1>
<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          A master primer on D&amp;D terminology, core game mechanics, and an interactive 6-step character creation walkthrough crafted for initiate wanderers and veteran tacticians alike. Click any highlighted term to inspect its official rules breakdown.
        </p>
</div>
<!-- Mode Switcher Tabs -->
<div class="flex flex-wrap items-center justify-between gap-4 pt-2">
<div class="flex p-1 gap-1 rounded-xl bg-surface-container-lowest shadow-inner">
<button class="tab-btn flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all bg-primary-container text-on-primary-container shadow-md" data-target="panel-builder" type="button">
<span class="material-symbols-outlined text-[18px]">format_list_numbered</span>
<span>Step-by-Step Character Builder</span>
</button>
<button class="tab-btn flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" data-target="panel-glossary" type="button">
<span class="material-symbols-outlined text-[18px]">spellcheck</span>
<span>Complete 2024 Glossary &amp; Lexicon</span>
</button>
<button class="tab-btn flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" data-target="panel-matrix" type="button">
<span class="material-symbols-outlined text-[18px]">grid_view</span>
<span>Class &amp; Species Matrix</span>
</button>
</div>
<!-- Global Search Bar -->
<div class="relative min-w-[320px] flex-1 max-w-md">
<span class="material-symbols-outlined absolute left-3.5 top-2.5 text-outline text-[18px]">search</span>
<input class="w-full bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-10 pr-20 py-2 rounded-xl focus:outline-none shadow-inner" id="lexicon-search" placeholder="Search any term (e.g., Armor Class, Concentration)..." type="text"/>
<div class="absolute right-3 top-2 flex items-center gap-1 font-formula-sm text-formula-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded">
<span class="text-[10px]">Ctrl</span><span>/</span>
</div>
</div>
</div>
<!-- Quick Filter Chips -->
<div class="flex items-center gap-2 overflow-x-auto pb-1">
<span class="font-label-caps text-label-caps text-outline uppercase tracking-wider mr-2">Filter Codex:</span>
<button class="filter-chip active px-3 py-1 rounded-full bg-surface-container-high text-primary font-formula-sm text-formula-sm transition-all" data-category="all" type="button">All Terms (28)</button>
<button class="filter-chip px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm transition-all" data-category="combat" type="button">Combat &amp; Action Economy</button>
<button class="filter-chip px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm transition-all" data-category="magic" type="button">Magic &amp; Spellcasting</button>
<button class="filter-chip px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm transition-all" data-category="creation" type="button">Character Building</button>
<button class="filter-chip px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm transition-all" data-category="conditions" type="button">Conditions &amp; Tests</button>
</div>
</div>
</div>
<!-- TAB 1: STEP-BY-STEP CHARACTER BUILDER (Default Active) -->
<section class="tab-panel w-full flex flex-col gap-10" id="panel-builder">
<!-- Overview Banner with Interactive Tracker -->
<div class="p-6 rounded-2xl bg-surface-container-low shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
<div class="flex flex-col gap-1 max-w-2xl">
<div class="font-label-caps text-label-caps uppercase text-primary">Interactive 2024 Walkthrough</div>
<h2 class="font-headline-md text-headline-md text-on-surface">The 6 Pillars of Adventurer Forge</h2>
<p class="font-body-md text-body-md text-on-surface-variant">
          In D&amp;D 2024, character creation flows seamlessly from heroic archetype to lineage and origin story. Follow each step sequentially, or test ability score math directly on the fly.
        </p>
</div>
<div class="flex items-center gap-4 bg-surface-container px-5 py-3 rounded-xl shadow-inner">
<div class="flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">Current Tier</span>
<span class="font-stat-numeric text-stat-numeric text-primary">Level 1</span>
</div>
<div class="h-8 w-px bg-surface-container-highest"></div>
<div class="flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">Proficiency</span>
<span class="font-stat-numeric text-stat-numeric text-secondary">+2</span>
</div>
<div class="h-8 w-px bg-surface-container-highest"></div>
<div class="flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">Standard Array</span>
<span class="font-formula-sm text-formula-sm text-on-surface font-bold">15,14,13,12,10,8</span>
</div>
</div>
</div>
<!-- Stepper Navigation Dots (Visual Rail) -->
<div class="grid grid-cols-2 md:grid-cols-6 gap-3">
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-1">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">01</span>
<span class="material-symbols-outlined text-[18px] text-primary">shield_person</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Class &amp; Role</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Heroic Core Archetype</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-2">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">02</span>
<span class="material-symbols-outlined text-[18px] text-primary">query_stats</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Ability Scores</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Array &amp; Modifiers</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-3">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">03</span>
<span class="material-symbols-outlined text-[18px] text-primary">diversity_3</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Species / Lineage</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Innate Traits &amp; Speed</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-4">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">04</span>
<span class="material-symbols-outlined text-[18px] text-primary">history_edu</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Background</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">+2/+1 &amp; Origin Feats</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-5">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">05</span>
<span class="material-symbols-outlined text-[18px] text-primary">vital_signs</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Combat Vitals</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">AC, HP, Initiative, Saves</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-6">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">06</span>
<span class="material-symbols-outlined text-[18px] text-primary">auto_fix_high</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Spells &amp; Details</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Cantrips, Slots, DC</span>
</a>
</div>
<!-- STEP 1 CONTAINER -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-1">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">1</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Primary Identity</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Choose Your Class</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 1 of 6
        </div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div class="lg:col-span-2 flex flex-col gap-4 text-on-surface-variant font-body-md text-body-md leading-relaxed">
<p>
            Your class represents your hero's vocation, training, and tactical contribution to the party. In the 2024 revisions, your class dictates your <button class="glossary-term cursor-pointer text-primary underline underline-offset-4 decoration-dotted" data-term="Hit Die" type="button">Hit Die</button>, your starting weapon and armor masteries, your primary saving throw proficiencies, and your core combat mechanics like spellcasting or martial prowess.
          </p>
<div class="p-4 rounded-xl bg-surface-container flex items-start gap-3 text-on-surface">
<span class="material-symbols-outlined text-primary text-[20px] mt-0.5">lightbulb</span>
<div class="flex flex-col gap-1">
<span class="font-label-caps text-label-caps text-primary uppercase">Why This Matters First in 2024</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                Unlike previous editions where species gave stat boosts, in 2024 your class dictates your primary ability score priority. You choose your class first so you know exactly which attributes to maximize (e.g. Strength for Barbarians, Intelligence for Wizards).
              </span>
</div>
</div>
</div>
<!-- Class Quick Match Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex flex-col gap-2">
<div class="font-label-caps text-label-caps text-secondary uppercase">Quick Class Archetypes</div>
<div class="flex flex-wrap gap-1.5">
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">Frontline Tank</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">Burst Striker</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">Arcane Utility</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">Divine Support</span>
</div>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Explore 12 archetypes below with built-in role ratings, primary attributes, and beginner complexity scores.
          </p>
<button class="tab-jump-btn flex items-center justify-center gap-2 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-label-caps text-label-caps transition-all" data-target="panel-matrix" type="button">
<span>Open Class Archetype Matrix</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
<!-- Class Mini-Cards Showcase -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
<div class="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3 group">
<div class="flex items-start justify-between">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface">Fighter</div>
<div class="font-formula-sm text-formula-sm text-primary">Hit Die: d10 • STR or DEX</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps">Tier 1 Friendly</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Master of martial arms, weapon mastery tactical stances, and <button class="glossary-term text-primary underline underline-offset-4 decoration-dotted" data-term="Action Economy" type="button">Action Surge</button>.
          </p>
<div class="flex items-center justify-between text-on-surface-variant font-formula-sm text-formula-sm pt-2">
<span>Role: Martial Striker</span>
<span class="text-primary font-bold">Easy</span>
</div>
</div>
<div class="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3 group">
<div class="flex items-start justify-between">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface">Wizard</div>
<div class="font-formula-sm text-formula-sm text-secondary">Hit Die: d6 • Primary: INT</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps">Arcane Master</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Scholastic spellcaster with the vastest <button class="glossary-term text-primary underline underline-offset-4 decoration-dotted" data-term="Ritual" type="button">Ritual</button> grimoire and area battlefield control.
          </p>
<div class="flex items-center justify-between text-on-surface-variant font-formula-sm text-formula-sm pt-2">
<span>Role: Control / Area Damage</span>
<span class="text-secondary font-bold">Advanced</span>
</div>
</div>
<div class="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3 group">
<div class="flex items-start justify-between">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface">Rogue</div>
<div class="font-formula-sm text-formula-sm text-primary">Hit Die: d8 • Primary: DEX</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps">Infiltrator</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Cunning combatant triggering deadly Sneak Attacks, expert trap disarming, and bonus action agility.
          </p>
<div class="flex items-center justify-between text-on-surface-variant font-formula-sm text-formula-sm pt-2">
<span>Role: Skirmisher / Skills</span>
<span class="text-primary font-bold">Moderate</span>
</div>
</div>
<div class="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3 group">
<div class="flex items-start justify-between">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface">Cleric</div>
<div class="font-formula-sm text-formula-sm text-secondary">Hit Die: d8 • Primary: WIS</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps">Divine Conduit</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Devout healer and armored warrior channeling celestial power for emergency restoration and smites.
          </p>
<div class="flex items-center justify-between text-on-surface-variant font-formula-sm text-formula-sm pt-2">
<span>Role: Support / Off-Tank</span>
<span class="text-primary font-bold">Moderate</span>
</div>
</div>
</div>
</div>
<!-- STEP 2 CONTAINER: Ability Scores & Calculator -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-2">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">2</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Core Mechanics</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Determine Ability Scores</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 2 of 6
        </div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
<!-- Explanatory Text & Standard Array Breakdown -->
<div class="lg:col-span-7 flex flex-col gap-4">
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Every creature in D&amp;D possesses six core abilities ranging generally from 3 to 20 for mortals. Each score directly generates an <button class="glossary-term text-primary underline underline-offset-4 decoration-dotted" data-term="Ability Modifier" type="button">Ability Modifier</button> that applies to attacks, skill checks, and <button class="glossary-term text-primary underline underline-offset-4 decoration-dotted" data-term="Saving Throw" type="button">Saving Throws</button>.
          </p>
<!-- Standard Array Cards -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-outline">2024 Recommended Method: The Standard Array</span>
<div class="grid grid-cols-6 gap-2">
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-primary">15</span>
<span class="font-formula-sm text-formula-sm text-secondary font-bold">+2</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Prime</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-primary">14</span>
<span class="font-formula-sm text-formula-sm text-secondary font-bold">+2</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Secondary</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-on-surface">13</span>
<span class="font-formula-sm text-formula-sm text-secondary font-bold">+1</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Con / Def</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-on-surface">12</span>
<span class="font-formula-sm text-formula-sm text-secondary font-bold">+1</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Tertiary</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-on-surface-variant">10</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant font-bold">+0</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Average</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-error">8</span>
<span class="font-formula-sm text-formula-sm text-error font-bold">-1</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Flaw</span>
</div>
</div>
</div>
<!-- Formula Pill -->
<div class="p-4 rounded-xl bg-surface-container flex items-center justify-between gap-4">
<div>
<span class="font-label-caps text-label-caps uppercase text-primary">The Golden Universal Formula</span>
<p class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">
                Ability Modifier = <code class="text-primary font-bold">Floor( (Score - 10) / 2 )</code>
</p>
</div>
<div class="px-3 py-1 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">
              Even numbers trigger score upgrades!
            </div>
</div>
<!-- Practical in-game check comparisons -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Strength (STR):</span> Breaking chains, swinging heavy greataxes, shoving monsters, jumping chasms.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Dexterity (DEX):</span> Dodging dragonfire, picking locks, stealth, bows, finesse weapons.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Constitution (CON):</span> Resisting poison, maintaining <button class="glossary-term text-primary underline decoration-dotted" data-term="Concentration" type="button">Concentration</button>, raw Hit Points.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Intelligence (INT):</span> Recalling lore, Arcana, Investigation, Nature history, Wizard spellcasting.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Wisdom (WIS):</span> Spotting hidden ambushers (<button class="glossary-term text-primary underline decoration-dotted" data-term="Passive Perception" type="button">Perception</button>), Insight, Medicine, Cleric/Druid spells.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Charisma (CHA):</span> Persuasion, Deception, Intimidation, Bard / Paladin / Sorcerer spells.
            </div>
</div>
</div>
<!-- Interactive Score Sandbox Widget -->
<div class="lg:col-span-5 p-5 rounded-2xl bg-surface-container flex flex-col gap-4 shadow-sm">
<div class="flex items-center justify-between">
<div class="font-headline-sm text-headline-sm text-primary">Interactive Score Sandbox</div>
<span class="material-symbols-outlined text-primary text-[20px]">calculate</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Adjust the slider to simulate any ability score and watch how its modifier and Level 1 proficiency bonus adapt in real time.
          </p>
<div class="flex flex-col gap-2 p-4 rounded-xl bg-surface-container-lowest">
<div class="flex items-center justify-between">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant" for="ability-score-slider">Ability Score</label>
<span class="font-stat-numeric text-stat-numeric text-primary" id="slider-score-value">16</span>
</div>
<input class="w-full accent-primary cursor-pointer" id="ability-score-slider" max="20" min="3" type="range" value="16"/>
<div class="flex justify-between text-[10px] text-outline font-formula-sm">
<span>3 (Min)</span>
<span>10 (Avg)</span>
<span>20 (Max Mortal)</span>
</div>
</div>
<div class="grid grid-cols-2 gap-3">
<div class="p-3 rounded-xl bg-surface-container-high flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">Modifier</span>
<span class="font-stat-numeric text-stat-numeric text-secondary font-bold" id="computed-modifier">+3</span>
<span class="text-[11px] text-outline">Base D20 addition</span>
</div>
<div class="p-3 rounded-xl bg-surface-container-high flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">If Proficient (Lv 1)</span>
<span class="font-stat-numeric text-stat-numeric text-primary font-bold" id="computed-proficient-save">+5</span>
<span class="text-[11px] text-outline">Modifier + Prof (+2)</span>
</div>
</div>
<div class="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
<span class="font-label-caps text-label-caps text-outline uppercase">Associated Skills (If Selected Ability = DEX)</span>
<div class="flex flex-wrap gap-1.5" id="skill-tags-preview">
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-body-sm text-body-sm">Acrobatics: <b class="text-secondary" id="preview-acrobatics">+3</b></span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-body-sm text-body-sm">Stealth: <b class="text-secondary" id="preview-stealth">+3</b></span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-body-sm text-body-sm">Sleight of Hand: <b class="text-secondary" id="preview-sleight">+3</b></span>
</div>
</div>
</div>
</div>
</div>
<!-- STEP 3 CONTAINER: Species / Lineage -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-3">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">3</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Ancestry &amp; Lineage</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Choose Your Species</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 3 of 6
        </div>
</div>
<div class="flex flex-col gap-4 text-on-surface-variant font-body-md text-body-md leading-relaxed">
<p>
          In the 2024 revision, Species provides innate physical adaptations—such as movement speeds, Darkvision ranges, elemental resistances, and unique ancestral powers—without dictating rigid ability score locks. Ability boosts are now driven by your upbringing (<button class="glossary-term text-primary underline decoration-dotted" data-term="Background" type="button">Background</button>), freeing you to play any species-class synergy without tactical penalty!
        </p>
</div>
<!-- Species Gallery Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<!-- Human -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Human</span>
<span class="material-symbols-outlined text-primary text-[20px]">person</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Size: Medium or Small</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Resourceful and adaptable. Humans gain an extra Origin Feat of choice at 1st level, plus Heroic Inspiration after every <button class="glossary-term text-primary underline decoration-dotted" data-term="Long Rest" type="button">Long Rest</button>.
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Bonus Origin Feat + Inspiration
          </div>
</div>
<!-- Elf -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Elf</span>
<span class="material-symbols-outlined text-primary text-[20px]">nature_people</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Darkvision: 60 ft</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Keen Senses, Fey Ancestry (<button class="glossary-term text-primary underline decoration-dotted" data-term="Advantage" type="button">Advantage</button> vs Charmed), Trance (rest in 4 hours), and lineage spells (High, Wood, or Drow).
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Trance &amp; Fey Ancestry
          </div>
</div>
<!-- Dwarf -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Dwarf</span>
<span class="material-symbols-outlined text-primary text-[20px]">handyman</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Darkvision: 120 ft</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Dwarven Toughness (+1 max HP per level permanently), Stonecunning (tremorsense on stone surfaces), and Poison Resilience.
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Tremorsense + Extra Max HP
          </div>
</div>
<!-- Halfling -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Halfling</span>
<span class="material-symbols-outlined text-primary text-[20px]">mood</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Size: Small</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Legendary Luck (reroll any d20 natural 1 on attacks, checks, or saves!), Halfling Nimbleness (move through larger creatures' spaces), and Brave.
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Lucky (Reroll Nat 1s)
          </div>
</div>
<!-- Dragonborn -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Dragonborn</span>
<span class="material-symbols-outlined text-primary text-[20px]">local_fire_department</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Darkvision: 60 ft</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Draconic Breath Weapon (replaces one attack, scales with level), Damage Resistance matched to color ancestry, and temporary flight wings at Lv 5!
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Scaling Breath + Flight
          </div>
</div>
<!-- Tiefling -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Tiefling</span>
<span class="material-symbols-outlined text-primary text-[20px]">psychology</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Darkvision: 60 ft</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Otherworldly Legacy (Abyssal, Chthonic, or Infernal) granting Thaumaturgy, elemental resistance, and progressive leveled spells at levels 3 &amp; 5.
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Fiendish Magic Progression
          </div>
</div>
</div>
</div>
<!-- STEP 4 CONTAINER: Background & Origin Feats -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-4">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">4</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Origin Story &amp; Talents</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Select Your Background</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 4 of 6
        </div>
</div>
<div class="p-4 rounded-xl bg-surface-container flex items-start gap-4">
<span class="material-symbols-outlined text-secondary text-[24px] mt-0.5">change_circle</span>
<div class="flex flex-col gap-1">
<span class="font-headline-sm text-headline-sm text-on-surface">The 2024 Rule Shift: Backgrounds Are Paramount</span>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            In D&amp;D 2024, your background is the definitive mechanical engine for starting ability points. Every background grants:
            <span class="text-primary font-bold">1) +2/+1 or +1/+1/+1 to three assigned ability scores</span>,
            <span class="text-secondary font-bold">2) A free Origin Feat</span> (e.g. Tough, Alert, Magic Initiate),
            <span class="text-on-surface font-bold">3) Two Skill Proficiencies</span>,
            <span class="text-on-surface font-bold">4) A Tool Proficiency</span>, and 50 GP of starting equipment!
          </p>
</div>
</div>
<!-- Background Examples Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<div class="p-4 rounded-xl bg-surface-container flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Acolyte</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">WIS / INT / CHA</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Temple cloister devotee. Grants Insight, Religion, Calligrapher's Supplies, and the <button class="glossary-term text-primary underline decoration-dotted" data-term="Origin Feat" type="button">Magic Initiate (Cleric)</button> feat.
          </p>
<div class="font-formula-sm text-formula-sm text-secondary font-bold">Feat: Magic Initiate</div>
</div>
<div class="p-4 rounded-xl bg-surface-container flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Soldier</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">STR / DEX / CON</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Disciplined battlefield veteran. Grants Athletics, Intimidation, Gaming Set proficiency, and the legendary <button class="glossary-term text-primary underline decoration-dotted" data-term="Origin Feat" type="button">Savage Attacker</button> feat.
          </p>
<div class="font-formula-sm text-formula-sm text-secondary font-bold">Feat: Savage Attacker</div>
</div>
<div class="p-4 rounded-xl bg-surface-container flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Criminal</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">DEX / CON / INT</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Underworld contact and stealth operative. Grants Deception, Stealth, Thieves' Tools proficiency, and the high-value <button class="glossary-term text-primary underline decoration-dotted" data-term="Origin Feat" type="button">Alert</button> feat (swap initiative!).
          </p>
<div class="font-formula-sm text-formula-sm text-secondary font-bold">Feat: Alert (+Initiative swap)</div>
</div>
<div class="p-4 rounded-xl bg-surface-container flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Guide</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">DEX / CON / WIS</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Wilderness trailblazer and pathfinder. Grants Stealth, Survival, Cartographer's Tools, and the <button class="glossary-term text-primary underline decoration-dotted" data-term="Origin Feat" type="button">Magic Initiate (Druid)</button> feat.
          </p>
<div class="font-formula-sm text-formula-sm text-secondary font-bold">Feat: Magic Initiate (Druid)</div>
</div>
</div>
</div>
<!-- STEP 5 CONTAINER: Combat Vitals & AC Math -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-5">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">5</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Combat Statistics</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Equip Gear &amp; Calculate Combat Vitals</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 5 of 6
        </div>
</div>
<!-- Vitals Bento Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<!-- Armor Class Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex items-center justify-between">
<div class="font-label-caps text-label-caps uppercase text-primary">Defense Rating</div>
<span class="material-symbols-outlined text-primary text-[20px]">shield</span>
</div>
<div class="flex flex-col">
<span class="font-stat-numeric text-stat-numeric text-on-surface">16 AC</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Chain Shirt (13) + DEX (+1) + Shield (+2)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
<button class="glossary-term text-primary underline decoration-dotted" data-term="Armor Class" type="button">Armor Class (AC)</button> is the target number enemies must meet or beat on a d20 attack roll to inflict damage.
          </p>
</div>
<!-- Hit Points Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex items-center justify-between">
<div class="font-label-caps text-label-caps uppercase text-secondary">Vitality (HP)</div>
<span class="material-symbols-outlined text-secondary text-[20px]">favorite</span>
</div>
<div class="flex flex-col">
<span class="font-stat-numeric text-stat-numeric text-on-surface">12 HP</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Max Hit Die (10) + CON Mod (+2)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            At Level 1, your <button class="glossary-term text-primary underline decoration-dotted" data-term="Hit Points (HP)" type="button">Hit Points</button> equal the maximum possible face value of your class Hit Die plus Constitution modifier!
          </p>
</div>
<!-- Initiative Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex items-center justify-between">
<div class="font-label-caps text-label-caps uppercase text-on-surface-variant">Turn Order</div>
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">speed</span>
</div>
<div class="flex flex-col">
<span class="font-stat-numeric text-stat-numeric text-on-surface">+2 Init</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">DEX Modifier (+2) + Feat Bonuses</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Rolled with d20 at the beginning of encounter to establish chronological turn sequence in the <button class="glossary-term text-primary underline decoration-dotted" data-term="Action Economy" type="button">Combat Round</button>.
          </p>
</div>
<!-- Passive Perception Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex items-center justify-between">
<div class="font-label-caps text-label-caps uppercase text-outline">Awareness Floor</div>
<span class="material-symbols-outlined text-outline text-[20px]">visibility</span>
</div>
<div class="flex flex-col">
<span class="font-stat-numeric text-stat-numeric text-on-surface">13 PP</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">10 + WIS Mod (+1) + Prof (+2)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
<button class="glossary-term text-primary underline decoration-dotted" data-term="Passive Perception" type="button">Passive Perception</button> prevents surprise attacks without requiring continuous active checks from players.
          </p>
</div>
</div>
<!-- Armor Class Rules Breakdown Table -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col gap-3">
<div class="font-label-caps text-label-caps uppercase text-primary">Armor Categories Quick Reference (2024 SRD)</div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
<div class="p-3 rounded-lg bg-surface-container-high flex flex-col gap-1">
<div class="font-formula-sm text-formula-sm text-on-surface font-bold">Light Armor (e.g. Leather, Studded)</div>
<div class="font-formula-sm text-formula-sm text-secondary">Base AC + Full DEX Modifier</div>
<p class="text-[12px] text-on-surface-variant">Favors agile rogues and rangers with high dexterity scores (+3 to +5).</p>
</div>
<div class="p-3 rounded-lg bg-surface-container-high flex flex-col gap-1">
<div class="font-formula-sm text-formula-sm text-on-surface font-bold">Medium Armor (e.g. Scale, Breastplate)</div>
<div class="font-formula-sm text-formula-sm text-secondary">Base AC + DEX Modifier (Max +2)</div>
<p class="text-[12px] text-on-surface-variant">Ideal for clerics and druids with moderate +2 dexterity investment.</p>
</div>
<div class="p-3 rounded-lg bg-surface-container-high flex flex-col gap-1">
<div class="font-formula-sm text-formula-sm text-on-surface font-bold">Heavy Armor (e.g. Chain Mail, Plate)</div>
<div class="font-formula-sm text-formula-sm text-secondary">Flat Base AC (Ignores DEX completely)</div>
<p class="text-[12px] text-on-surface-variant">Requires STR 13-15 to wear without speed penalty. Maximum protection.</p>
</div>
</div>
</div>
</div>
<!-- STEP 6 CONTAINER: Spells & Final Roleplay Details -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-6">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">6</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Spellcasting &amp; Persona</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Select Spells &amp; Final Details</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 6 of 6
        </div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
<!-- Magic Primer -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col gap-4">
<div class="font-headline-sm text-headline-sm text-secondary">Magic Basics: Cantrips vs Spell Slots</div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            If your chosen class casts spells, your power is split into infinite at-will spells and finite daily magical reserves:
          </p>
<div class="flex flex-col gap-3">
<div class="p-3 rounded-lg bg-surface-container-high flex items-start gap-3">
<span class="material-symbols-outlined text-secondary text-[20px] mt-0.5">flare</span>
<div class="flex flex-col">
<span class="font-formula-sm text-formula-sm text-on-surface font-bold">Cantrips (Level 0 Magic)</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                  Cast infinitely throughout the day without consuming any <button class="glossary-term text-primary underline decoration-dotted" data-term="Spell Slot" type="button">Spell Slots</button> (e.g. Fire Bolt, Mage Hand, Guidance).
                </span>
</div>
</div>
<div class="p-3 rounded-lg bg-surface-container-high flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] mt-0.5">auto_mode</span>
<div class="flex flex-col">
<span class="font-formula-sm text-formula-sm text-on-surface font-bold">Leveled Spells &amp; Spell Slots</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                  Expend an arcane slot currency per casting. Slots recover upon finishing a <button class="glossary-term text-primary underline decoration-dotted" data-term="Long Rest" type="button">Long Rest</button>.
                </span>
</div>
</div>
</div>
<!-- Formula Bar -->
<div class="p-3 rounded-lg bg-surface-container-lowest flex flex-col gap-1">
<span class="font-label-caps text-label-caps text-primary uppercase">Spell Save DC Universal Formula</span>
<div class="font-formula-sm text-formula-sm text-on-surface">
              Spell Save DC = <code class="text-secondary font-bold">8 + Proficiency Bonus (+2) + Spellcasting Ability Mod</code>
</div>
</div>
</div>
<!-- Roleplay & Story Anchors -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex flex-col gap-2">
<div class="font-headline-sm text-headline-sm text-primary">Character Persona &amp; Alignment</div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Every heroic legend needs motivation beyond numeric modifiers. Use these 3 pillars to anchor your character in the Dungeon Master's world:
            </p>
</div>
<div class="flex flex-col gap-2">
<div class="p-2.5 rounded-lg bg-surface-container-high">
<span class="font-formula-sm text-formula-sm text-primary font-bold">Personal Hook:</span>
<span class="font-body-sm text-body-sm text-on-surface-variant"> What unresolved debt, mystery, or sworn oath pulled you away from everyday life into dangerous ruins?</span>
</div>
<div class="p-2.5 rounded-lg bg-surface-container-high">
<span class="font-formula-sm text-formula-sm text-secondary font-bold">Core Flaw:</span>
<span class="font-body-sm text-body-sm text-on-surface-variant"> What impulse or blind spot challenges your party during negotiations or perilous dilemmas?</span>
</div>
<div class="p-2.5 rounded-lg bg-surface-container-high">
<span class="font-formula-sm text-formula-sm text-on-surface font-bold">Moral Alignment:</span>
<span class="font-body-sm text-body-sm text-on-surface-variant"> The classic 3x3 compass (e.g. Chaotic Good, Lawful Neutral) guiding ethics and group camaraderie.</span>
</div>
</div>
<div class="flex items-center justify-between pt-2">
<span class="font-formula-sm text-formula-sm text-outline">You are now ready to roll!</span>
<button class="tab-jump-btn px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold hover:shadow-lg transition-all" data-target="panel-glossary" type="button">
              Browse Full Lexicon
            </button>
</div>
</div>
</div>
</div>
</section>
<!-- TAB 2: COMPLETE 2024 GLOSSARY & LEXICON -->
<section class="tab-panel hidden w-full flex flex-col gap-6" id="panel-glossary">
<div class="flex items-center justify-between">
<div>
<h2 class="font-headline-md text-headline-md text-primary">D&amp;D 2024 Rules Glossary &amp; Lexicon</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Instant, plain-English reference cards for core tabletop terms, actions, and combat phases.</p>
</div>
<div class="font-formula-sm text-formula-sm text-secondary bg-surface-container px-3 py-1.5 rounded-xl shadow-inner" id="lexicon-count">
        Showing 16 Terms
      </div>
</div>
<!-- Glossary Term Cards Container -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="lexicon-grid">
<!-- Terms populated both in HTML & interactive search -->
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="armor class ac">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Armor Class" type="button">Armor Class (AC)</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Combat Defense</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          The numerical defense target score an attack roll must equal or surpass to hit and deal damage to a target.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Formula: Armor + DEX (+ Shield)</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Armor Class" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="saving throw">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Saving Throw" type="button">Saving Throw</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Resistance Roll</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          An involuntary d20 roll called by the DM to resist or mitigate an incoming threat like an explosion, trap, or poison spell.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Formula: d20 + Ability Mod (+ Prof)</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Saving Throw" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="advantage disadvantage">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Advantage" type="button">Advantage &amp; Disadvantage</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">D20 Modifiers</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Roll two d20s instead of one. Keep the higher roll for Advantage; keep the lower roll for Disadvantage. They cancel each other out.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Rule: They never stack multiple times</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Advantage" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="magic" data-title="concentration">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Concentration" type="button">Concentration</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">Spell Duration</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Mental focus required to maintain ongoing spells. Taking damage forces a Constitution save (DC 10 or half damage taken) to avoid losing the spell.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Limit: 1 concentration spell active</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Concentration" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="creation" data-title="proficiency bonus">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Proficiency Bonus" type="button">Proficiency Bonus</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Progression</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          A universal scaling modifier (+2 at levels 1-4, up to +6 at level 17+) added to tasks, weapons, tools, and saves you are trained in.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Scales with total Character Level</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Proficiency Bonus" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="action economy round">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Action Economy" type="button">Action Economy</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Turn Phasing</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Each turn you have: 1 Action, 1 Bonus Action (if granted by a feature/spell), Movement up to your speed, 1 Free Object Interaction, and 1 Reaction per round.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>6-second tactical window</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Action Economy" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="difficulty class dc">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="DC (Difficulty Class)" type="button">Difficulty Class (DC)</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Target Number</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          The numerical challenge target set by the DM or spell formula. Typical baseline: Easy (10), Moderate (15), Hard (20), Nearly Impossible (30).
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Rule: You must meet or beat the DC</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="DC (Difficulty Class)" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="opportunity attack reaction">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Opportunity Attack" type="button">Opportunity Attack</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Reaction Trigger</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          When a hostile creature moves out of your reach without taking the Disengage action, you can spend your Reaction to make one melee strike.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Uses your Reaction</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Opportunity Attack" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="creation" data-title="hit die short rest">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Hit Die" type="button">Hit Die / Dice</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Healing Resource</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Your class-determined dice pool (e.g. d6, d8, d10, d12) spent during a Short Rest to restore lost Hit Points without magic.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Regain half total dice on Long Rest</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Hit Die" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="magic" data-title="spell slot ritual cantrip">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Spell Slot" type="button">Spell Slots</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">Arcane Energy</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Expendable units of magical energy graded from 1st to 9th level. A spell can be cast with its base level slot or upcast for stronger effects.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Refills on Long Rest (Warlock: Short)</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Spell Slot" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="magic" data-title="cantrip">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Cantrip" type="button">Cantrip</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">At-Will Magic</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Level 0 spell that never exhausts a spell slot. In 2024, damage cantrips automatically scale at levels 5, 11, and 17.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Unlimited daily uses</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Cantrip" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="magic" data-title="ritual casting">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Ritual" type="button">Ritual Casting</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">Slot-Free Magic</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          In 2024, ANY spellcaster with a ritual spell prepared can cast it without expending a spell slot by adding 10 minutes to the casting time!
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Cost: +10 minutes casting time</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Ritual" type="button">Details →</button>
</div>
</div>
</div>
</section>
<!-- TAB 3: CLASS & SPECIES ARCHETYPE MATRIX -->
<section class="tab-panel hidden w-full flex flex-col gap-8" id="panel-matrix">
<div class="flex items-center justify-between">
<div>
<h2 class="font-headline-md text-headline-md text-primary">Class &amp; Species Archetype Matrix</h2>
<p class="font-body-md text-body-md text-on-surface-variant">A direct tactical comparison of all 12 core classes under 2024 revision guidelines.</p>
</div>
<div class="flex items-center gap-2">
<span class="px-3 py-1 rounded-full bg-surface-container text-on-surface font-formula-sm text-formula-sm">12 Classes • 10 Species</span>
</div>
</div>
<!-- Comparative Table -->
<div class="overflow-x-auto rounded-2xl bg-surface-container-low shadow-md">
<table class="w-full text-left font-body-sm text-body-sm border-collapse">
<thead>
<tr class="bg-surface-container text-primary font-label-caps text-label-caps uppercase tracking-wider">
<th class="py-4 px-4">Class</th>
<th class="py-4 px-3">Primary Stat</th>
<th class="py-4 px-3">Hit Die</th>
<th class="py-4 px-3">Armor &amp; Weapons</th>
<th class="py-4 px-4">Core Tactical Role</th>
<th class="py-4 px-4">2024 Signature Perk</th>
<th class="py-4 px-3 text-right">Complexity</th>
</tr>
</thead>
<tbody class="divide-y divide-transparent">
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Barbarian</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">STR &amp; CON</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d12</td>
<td class="py-3 px-3 text-on-surface-variant">Light, Medium, Shields, Martial</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface">Damage Soak / Melee Tank</span></td>
<td class="py-3 px-4 text-on-surface-variant">Rage sustains on bonus action attack or check</td>
<td class="py-3 px-3 text-right text-primary font-bold">Low</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Bard</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">CHA &amp; DEX</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light Armor, Simple Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary">Buff / Social / Controller</span></td>
<td class="py-3 px-4 text-on-surface-variant">Bardic Inspiration can heal as a Reaction</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Cleric</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">WIS</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light, Medium, Shields (or Heavy via Order)</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary">Divine Heal / Radiant Blast</span></td>
<td class="py-3 px-4 text-on-surface-variant">Subclasses choose Holy Order at Level 1</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Druid</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">WIS</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light, Medium, Shields</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface">Wild Shape / Nature Control</span></td>
<td class="py-3 px-4 text-on-surface-variant">Wild Shape uses temporary HP buffer pool</td>
<td class="py-3 px-3 text-right text-error font-bold">High</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Fighter</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">STR or DEX</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d10</td>
<td class="py-3 px-3 text-on-surface-variant">All Armor, Shields, Martial Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary">Sustained Martial DPS</span></td>
<td class="py-3 px-4 text-on-surface-variant">Weapon Mastery mastery properties (Topple, Vex)</td>
<td class="py-3 px-3 text-right text-primary font-bold">Low</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Monk</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">DEX &amp; WIS</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Unarmored Defense</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface">Agile Skirmisher / Stun</span></td>
<td class="py-3 px-4 text-on-surface-variant">Focus Points recover rapidly; d6 base martial dice</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Paladin</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">STR &amp; CHA</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d10</td>
<td class="py-3 px-3 text-on-surface-variant">All Armor, Shields, Martial Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary">Burst Smite / Aura Defense</span></td>
<td class="py-3 px-4 text-on-surface-variant">Divine Smite functions as a bonus action spell</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Ranger</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">DEX &amp; WIS</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d10</td>
<td class="py-3 px-3 text-on-surface-variant">Light, Medium, Shields, Martial</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface">Tracker / Ranged Marksman</span></td>
<td class="py-3 px-4 text-on-surface-variant">Hunter's Mark is now an innate class engine</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Rogue</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">DEX</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light Armor, Simple, Finesse Martial</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary">Infiltration / Sneak Burst</span></td>
<td class="py-3 px-4 text-on-surface-variant">Cunning Strike lets you trade sneak dice for effects</td>
<td class="py-3 px-3 text-right text-primary font-bold">Low</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Sorcerer</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">CHA &amp; CON</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d6</td>
<td class="py-3 px-3 text-on-surface-variant">No Armor, Simple Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary">Metamagic Specialist</span></td>
<td class="py-3 px-4 text-on-surface-variant">Innate Sorcery grants advantage to attack rolls</td>
<td class="py-3 px-3 text-right text-error font-bold">High</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Warlock</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">CHA</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light Armor, Simple Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary">Pact Magic / Eldritch Invocations</span></td>
<td class="py-3 px-4 text-on-surface-variant">Eldritch Invocations unlocked starting at Level 1</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Wizard</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">INT</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d6</td>
<td class="py-3 px-3 text-on-surface-variant">No Armor, Simple Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary">Broad Master of Arcana</span></td>
<td class="py-3 px-4 text-on-surface-variant">Modify and memorize grimoire spells on short rests</td>
<td class="py-3 px-3 text-right text-error font-bold">High</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- INTERACTIVE GLOSSARY SIDE DRAWER (Sliding Flyout) -->
<aside class="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-surface-container-low z-50 transform translate-x-full transition-transform duration-300 ease-out shadow-2xl flex flex-col justify-between border-l border-surface-container-high" id="glossary-drawer">
<!-- Drawer Header -->
<div class="p-6 bg-surface-container flex items-start justify-between gap-4">
<div class="flex flex-col gap-1">
<div class="font-label-caps text-label-caps uppercase text-primary" id="drawer-category">Core Mechanic / Combat Defense</div>
<h3 class="font-headline-md text-headline-md text-on-surface" id="drawer-title">Armor Class (AC)</h3>
</div>
<button class="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" id="close-drawer-btn" type="button">
<span class="material-symbols-outlined text-[24px]">close</span>
</button>
</div>
<!-- Drawer Body -->
<div class="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
<!-- Plain English Definition -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-outline">What It Is in Simple Terms</span>
<div class="p-4 rounded-xl bg-surface-container font-body-md text-body-md text-on-surface leading-relaxed" id="drawer-def">
          Armor Class (AC) is the defensive threshold a monster or attacker must hit or exceed with a d20 attack roll to deal damage to you. If their roll total is lower than your AC, the attack is deflected or misses entirely.
        </div>
</div>
<!-- Concrete Game Example -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-secondary">How It Works in Play</span>
<div class="p-4 rounded-xl bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant leading-relaxed" id="drawer-example">
          A goblin shoots a shortbow at your cleric. The goblin rolls a d20 (getting 11) and adds its +4 attack bonus for a total of 15. Your AC wearing Scale Mail and a shield is 16. Because 15 is lower than 16, the arrow glances harmlessly off your divine shield!
        </div>
</div>
<!-- Common Beginner Traps & Tips -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-primary">Common Rule Trap / Beginner Tip</span>
<div class="p-4 rounded-xl bg-surface-container flex items-start gap-3" id="drawer-tip">
<span class="material-symbols-outlined text-primary text-[20px] mt-0.5">warning</span>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            AC is not “damage reduction” (you do not subtract AC from incoming damage). It determines whether the blow connects effectively in the first place.
          </p>
</div>
</div>
<!-- Related Terms -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-outline">Related Lexicon Rules</span>
<div class="flex flex-wrap gap-2" id="drawer-related">
<button class="glossary-term px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-formula-sm text-formula-sm" data-term="Saving Throw" type="button">Saving Throw</button>
<button class="glossary-term px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-formula-sm text-formula-sm" data-term="Advantage" type="button">Advantage</button>
<button class="glossary-term px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-formula-sm text-formula-sm" data-term="Action Economy" type="button">Action Economy</button>
</div>
</div>
</div>
<!-- Drawer Footer -->
<div class="p-4 bg-surface-container flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-outline">Press ESC or click backdrop to close</span>
<button class="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-caps text-label-caps transition-all" id="drawer-done-btn" type="button">
        Close Inspector
      </button>
</div>
</aside>
<!-- Drawer Backdrop Scrim -->
<div class="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 hidden transition-opacity" id="drawer-scrim"></div>
</div>
<script>
  // Lexicon Database
  const LEXICON_DB = {
    "Armor Class": {
      category: "Core Mechanic / Combat Defense",
      title: "Armor Class (AC)",
      def: "Armor Class represents how difficult it is for opponents to land a damaging strike against you in combat. It combines armor thickness, agile evasion, and defensive gear like shields.",
      example: "If a goblin fires an arrow with a total attack roll of 14, and your AC is 16, the shot glances off your plate or misses completely. If they rolled a 16 or higher, it hits.",
      tip: "Remember: 'Meets it, beats it!' If the attacker matches your exact AC, the strike connects.",
      related: ["Saving Throw", "Hit Points (HP)", "Action Economy"]
    },
    "Saving Throw": {
      category: "Defense Mechanic / Hazard Reaction",
      title: "Saving Throw (Save)",
      def: "A reactive d20 roll you make to resist, avoid, or withstand a harmful effect like a fireball explosion, basilisk petrification, or poison trap.",
      example: "A red dragon breathes fire. You must make a Dexterity saving throw: roll 1d20 + your Dexterity modifier (+ your proficiency bonus if proficient in Dex saves). Beating the DC halves the damage taken.",
      tip: "Saving throws are reactive—you cannot choose to 'attack' with a saving throw; you roll them in response to enemy spells or hazards.",
      related: ["DC (Difficulty Class)", "Advantage", "Concentration"]
    },
    "Advantage": {
      category: "D20 Core Rolling Rule",
      title: "Advantage & Disadvantage",
      def: "Whenever circumstances heavily favor or hinder an action, the DM awards Advantage or imposes Disadvantage. Roll two d20s instead of one.",
      example: "If you attack a target who is Blinded, you have Advantage: you roll two twenty-sided dice (e.g. an 8 and a 17) and pick the higher result (17!).",
      tip: "No matter how many different sources grant you Advantage, you only ever roll two d20s. Furthermore, if you have one source of Advantage and one source of Disadvantage, they completely cancel out.",
      related: ["Saving Throw", "Action Economy", "DC (Difficulty Class)"]
    },
    "Concentration": {
      category: "Magic Rules / Spell Sustenance",
      title: "Concentration",
      def: "A continuous state of mental focus needed to maintain certain active spells. You can only concentrate on ONE spell at any given moment.",
      example: "You cast Bless on your allies. While it lasts, taking damage requires you to roll a Constitution saving throw (DC 10 or half damage, whichever is higher). Failing the check ends Bless immediately.",
      tip: "Casting a second spell that requires Concentration immediately terminates your first concentration spell—no saving throw allowed.",
      related: ["Spell Slot", "Cantrip", "Saving Throw"]
    },
    "Hit Die": {
      category: "Vitality & Recovery Mechanics",
      title: "Hit Die (Hit Dice)",
      def: "A class-determined die pool (d6 for Wizards, d8 for Rogues/Clerics, d10 for Fighters, d12 for Barbarians) used to calculate maximum HP and heal wounds during Short Rests.",
      example: "During a 1-hour Short Rest, a Level 3 Fighter can roll up to three d10s, adding their Constitution modifier to each die, restoring that much lost HP without spending spell slots.",
      tip: "You don't get all Hit Dice back instantly. A Long Rest restores all lost HP, but only recovers half of your total Hit Dice pool.",
      related: ["Hit Points (HP)", "Short Rest", "Long Rest"]
    },
    "Proficiency Bonus": {
      category: "Character Progression / Universal Scale",
      title: "Proficiency Bonus (+PB)",
      def: "A universal bonus reflecting your character's growing experience. It starts at +2 at Level 1 and scales progressively to +6 at Level 17.",
      example: "If your Level 1 Rogue has a Dexterity modifier of +3 and is proficient in Stealth, your total Stealth roll modifier is +3 (Dex) + 2 (PB) = +5.",
      tip: "You never add your proficiency bonus more than once to a single roll unless a specific feature explicitly tells you to double it (like Rogue Expertise).",
      related: ["Ability Modifier", "DC (Difficulty Class)", "Saving Throw"]
    },
    "Action Economy": {
      category: "Turn Structure / Combat Sequence",
      title: "Action Economy (The Combat Turn)",
      def: "The tactical budget of options you are granted during each 6-second round of combat: 1 Movement, 1 Action, 1 Bonus Action (if applicable), 1 Object Interaction, and 1 Reaction.",
      example: "On your turn: Move 30 ft (Movement), swing your broadsword (Action), command your spiritual weapon (Bonus Action), and later parry an enemy attack (Reaction).",
      tip: "You do not have a Bonus Action by default—you must have an ability, feat, or spell that explicitly specifies 'As a Bonus Action'.",
      related: ["Opportunity Attack", "Armor Class", "Advantage"]
    },
    "DC (Difficulty Class)": {
      category: "Target Threshold / Universal Target",
      title: "DC (Difficulty Class)",
      def: "The target number established by the DM or game rules that an ability check or saving throw must equal or beat to succeed.",
      example: "To pick an iron lock with DC 15, your d20 roll plus Thieves' Tools modifier must equal 15 or higher.",
      tip: "Ties go to the roller! Rolling exactly the DC is a success.",
      related: ["Saving Throw", "Proficiency Bonus", "Ability Modifier"]
    },
    "Opportunity Attack": {
      category: "Combat Reaction Rule",
      title: "Opportunity Attack",
      def: "A special melee strike made using your Reaction when a hostile creature moves out of your reach without first taking the Disengage action.",
      example: "A goblin attempts to run past your Fighter to attack the Wizard behind you. The moment it leaves your 5-foot melee reach, you can use your Reaction to take a free melee swing.",
      tip: "Teleporting (like Misty Step) or forced movement (like being pushed by Thunderwave) does NOT provoke opportunity attacks.",
      related: ["Action Economy", "Armor Class"]
    },
    "Spell Slot": {
      category: "Arcane Currency / Magic Meter",
      title: "Spell Slots",
      def: "The daily expendable fuel needed to cast leveled spells (1st to 9th level). Think of them like batteries of different voltage.",
      example: "A Level 1 Wizard has two 1st-level spell slots. Casting Shield uses one slot; casting Magic Missile uses the second. Both slots return after a Long Rest.",
      tip: "You can cast a lower-level spell using a higher-level slot (called 'Upcasting') to amplify its damage or number of targets.",
      related: ["Cantrip", "Ritual", "Concentration"]
    },
    "Cantrip": {
      category: "Infinite Magic / Level 0 Spells",
      title: "Cantrip (Level 0 Magic)",
      def: "Minor spells that can be cast at will, all day long, without expending any spell slots.",
      example: "Fire Bolt, Eldritch Blast, and Light are cantrips. You can cast them every turn in combat without running out of magical reserves.",
      tip: "In the 2024 revision, damaging cantrips automatically scale up in dice count at levels 5, 11, and 17 based on your total character level.",
      related: ["Spell Slot", "Ritual", "Action Economy"]
    },
    "Ritual": {
      category: "Utility Magic / Slow Casting",
      title: "Ritual Casting",
      def: "A method of casting a spell with the [Ritual] tag without expending a spell slot, simply by taking an additional 10 minutes to perform the casting.",
      example: "Casting Detect Magic as a ritual takes 10 minutes and 6 seconds, preserving all of your spell slots for upcoming combat encounters.",
      tip: "Under 2024 rules, any spellcaster who has a ritual spell prepared can cast it as a ritual—no special feat required!",
      related: ["Spell Slot", "Cantrip", "Concentration"]
    },
    "Origin Feat": {
      category: "Character Creation / 2024 Backgrounds",
      title: "Origin Feats",
      def: "Level 1 character talents granted automatically by your background in the 2024 rules (such as Alert, Tough, or Magic Initiate).",
      example: "Choosing the Criminal background gives you the Alert feat, allowing you to add your proficiency bonus to Initiative rolls and swap turn order with willing allies!",
      tip: "Origin Feats do not require level 4 prerequisite gates, giving all 1st level characters a distinct tactical flavor.",
      related: ["Proficiency Bonus", "Ability Modifier"]
    },
    "Passive Perception": {
      category: "Sensory Floor / Anti-Ambush",
      title: "Passive Perception",
      def: "A character's baseline passive awareness when not actively searching: 10 + Wisdom modifier (+ Proficiency Bonus if proficient in Perception).",
      example: "If a goblin tries to sneak up on you with a Stealth roll of 13, and your Passive Perception is 14, the DM will narrate that you hear twigs snapping before the goblin attacks!",
      tip: "DMs use passive scores to check stealth without tipping off players by asking for rolls.",
      related: ["DC (Difficulty Class)", "Advantage"]
    },
    "Hit Points (HP)": {
      category: "Vitality Metric / Life Meter",
      title: "Hit Points (HP)",
      def: "A combination of physical resilience, mental fortitude, combat instincts, and sheer luck that keeps a hero standing in battle.",
      example: "At Level 1, a Fighter with CON +2 has 12 HP (10 base hit die + 2). Dropping to 0 HP knocks you unconscious, requiring Death Saving Throws.",
      tip: "Temporary HP does not stack; if you receive new temporary HP, you choose to keep the old amount or replace it with the new.",
      related: ["Hit Die", "Armor Class"]
    },
    "Ability Modifier": {
      category: "Universal Number / Attribute Power",
      title: "Ability Modifier",
      def: "The numerical modifier calculated from an ability score: Floor((Score - 10) / 2). This modifier is added to every attack, damage, skill check, and saving throw linked to that ability.",
      example: "A Strength score of 16 produces a +3 modifier. A score of 8 produces a -1 modifier.",
      tip: "Always remember that the modifier is what you actually roll on the table—the raw score (like 16 or 14) is mostly just the container holding that modifier.",
      related: ["Proficiency Bonus", "Saving Throw"]
    }
  };

  // Drawer Elements
  const drawer = document.getElementById('glossary-drawer');
  const scrim = document.getElementById('drawer-scrim');
  const drawerCategory = document.getElementById('drawer-category');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerDef = document.getElementById('drawer-def');
  const drawerExample = document.getElementById('drawer-example');
  const drawerTip = document.getElementById('drawer-tip');
  const drawerRelated = document.getElementById('drawer-related');

  function openGlossaryTerm(termKey) {
    const data = LEXICON_DB[termKey] || {
      category: "Rules Reference",
      title: termKey,
      def: "A fundamental concept defined in the Fifth Edition 2024 revision player rules.",
      example: "When triggered in gameplay, consult your Dungeon Master or check the class chapter in the SRD.",
      tip: "Reference the Arcana 5e compendium for exact situational rulings.",
      related: ["Armor Class", "Saving Throw", "Action Economy"]
    };

    drawerCategory.textContent = data.category;
    drawerTitle.textContent = data.title;
    drawerDef.textContent = data.def;
    drawerExample.textContent = data.example;
    drawerTip.querySelector('p').textContent = data.tip;

    // Build related term buttons
    drawerRelated.innerHTML = '';
    (data.related || []).forEach(rel => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'glossary-term px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-formula-sm text-formula-sm transition-colors';
      btn.textContent = rel;
      btn.setAttribute('data-term', rel);
      drawerRelated.appendChild(btn);
    });

    drawer.classList.remove('translate-x-full');
    scrim.classList.remove('hidden');
  }

  function closeGlossaryDrawer() {
    drawer.classList.add('translate-x-full');
    scrim.classList.add('hidden');
  }

  // Event Delegation for Glossary Clicks
  document.addEventListener('click', (e) => {
    const termBtn = e.target.closest('.glossary-term');
    if (termBtn) {
      e.preventDefault();
      const termName = termBtn.getAttribute('data-term');
      if (termName) openGlossaryTerm(termName);
    }
  });

  document.getElementById('close-drawer-btn').addEventListener('click', closeGlossaryDrawer);
  document.getElementById('drawer-done-btn').addEventListener('click', closeGlossaryDrawer);
  scrim.addEventListener('click', closeGlossaryDrawer);
  document.getElementById('open-all-glossary-btn').addEventListener('click', () => openGlossaryTerm('Armor Class'));

  // Keyboard escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGlossaryDrawer();
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      const search = document.getElementById('lexicon-search');
      search.focus();
      search.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Mode Switcher Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function switchTab(targetId) {
    tabPanels.forEach(panel => {
      if (panel.id === targetId) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-target') === targetId) {
        btn.classList.add('bg-primary-container', 'text-on-primary-container', 'shadow-md');
        btn.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-high');
      } else {
        btn.classList.remove('bg-primary-container', 'text-on-primary-container', 'shadow-md');
        btn.classList.add('text-on-surface-variant', 'hover:bg-surface-container-high');
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchTab(target);
    });
  });

  // Jump buttons
  document.querySelectorAll('.tab-jump-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchTab(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Interactive Ability Score Sandbox Slider
  const scoreSlider = document.getElementById('ability-score-slider');
  const sliderScoreVal = document.getElementById('slider-score-value');
  const computedMod = document.getElementById('computed-modifier');
  const computedSave = document.getElementById('computed-proficient-save');
  const prevAcro = document.getElementById('preview-acrobatics');
  const prevStealth = document.getElementById('preview-stealth');
  const prevSleight = document.getElementById('preview-sleight');

  if (scoreSlider) {
    scoreSlider.addEventListener('input', (e) => {
      const score = parseInt(e.target.value, 10);
      const mod = Math.floor((score - 10) / 2);
      const formattedMod = mod >= 0 ? `+${mod}` : `${mod}`;
      const saveProf = mod + 2;
      const formattedSave = saveProf >= 0 ? `+${saveProf}` : `${saveProf}`;

      sliderScoreVal.textContent = score;
      computedMod.textContent = formattedMod;
      computedSave.textContent = formattedSave;
      prevAcro.textContent = formattedMod;
      prevStealth.textContent = formattedMod;
      prevSleight.textContent = formattedMod;
    });
  }

  // Lexicon Search & Filter Chips
  const searchInput = document.getElementById('lexicon-search');
  const filterChips = document.querySelectorAll('.filter-chip');
  const lexCards = document.querySelectorAll('.lex-card');
  const lexCount = document.getElementById('lexicon-count');

  let currentCategory = 'all';

  function filterLexicon() {
    const query = (searchInput.value || '').toLowerCase().trim();
    let visibleCount = 0;

    lexCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const title = card.getAttribute('data-title') || '';
      const text = card.textContent.toLowerCase();

      const matchCat = (currentCategory === 'all' || cat === currentCategory);
      const matchQuery = !query || title.includes(query) || text.includes(query);

      if (matchCat && matchQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (lexCount) {
      lexCount.textContent = `Showing ${visibleCount} Terms`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      // If user starts typing, automatically swap to Glossary tab if not there
      const glossaryPanel = document.getElementById('panel-glossary');
      if (glossaryPanel && glossaryPanel.classList.contains('hidden') && searchInput.value.length > 1) {
        switchTab('panel-glossary');
      }
      filterLexicon();
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('bg-surface-container-high', 'text-primary');
        c.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      chip.classList.add('bg-surface-container-high', 'text-primary');
      chip.classList.remove('bg-surface-container', 'text-on-surface-variant');

      currentCategory = chip.getAttribute('data-category');
      filterLexicon();
    });
  });
</script></main></div></body></html>

<!-- Codex - 2024 Origin Feats Quick-Reference Modal -->
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"primary":"#f2ca50","primary-fixed":"#ffe088","outline-variant":"#4d4635","on-error":"#690005","error-container":"#93000a","primary-fixed-dim":"#e9c349","tertiary-container":"#a5adff","secondary-fixed":"#c4e7ff","surface-variant":"#313540","surface-container":"#1b1f2a","surface-container-lowest":"#0a0e18","tertiary-fixed-dim":"#bdc2ff","on-secondary":"#00354a","on-secondary-fixed":"#001e2c","surface-dim":"#0f131d","on-tertiary-fixed":"#000767","secondary-container":"#00a6e0","outline":"#99907c","on-primary-fixed":"#241a00","tertiary":"#c7cbff","on-primary-fixed-variant":"#574500","surface-container-highest":"#313540","inverse-surface":"#dfe2f0","on-surface-variant":"#d0c5af","on-tertiary":"#131e8c","inverse-on-surface":"#2c303b","secondary":"#7bd0ff","tertiary-fixed":"#e0e0ff","surface-container-high":"#262a34","on-tertiary-container":"#2d38a1","on-secondary-fixed-variant":"#004c69","secondary-fixed-dim":"#7bd0ff","on-secondary-container":"#00374d","surface-container-low":"#171b26","on-tertiary-fixed-variant":"#2f3aa3","inverse-primary":"#735c00","on-surface":"#dfe2f0","surface":"#0f131d","background":"#0f131d","on-primary-container":"#554300","surface-bright":"#353944","primary-container":"#d4af37","error":"#ffb4ab","on-background":"#dfe2f0","on-primary":"#3c2f00","on-error-container":"#ffdad6","surface-tint":"#e9c349"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"space-xl":"2.5rem","margin":"2rem","space-xs":"0.25rem","gutter-mobile":"0.75rem","space-lg":"1.5rem","space-sm":"0.5rem","margin-mobile":"1rem","space-md":"1rem","gutter":"1.5rem"},"fontFamily":{"stat-numeric":["JetBrains Mono"],"label-caps":["Plus Jakarta Sans"],"stat-modifier":["JetBrains Mono"],"body-md":["Plus Jakarta Sans"],"headline-sm":["Playfair Display"],"headline-lg-mobile":["Playfair Display"],"body-lg":["Plus Jakarta Sans"],"headline-lg":["Playfair Display"],"display-lg-mobile":["Playfair Display"],"display-lg":["Playfair Display"],"headline-md":["Playfair Display"],"body-sm":["Plus Jakarta Sans"],"formula-sm":["JetBrains Mono"]},"fontSize":{"stat-numeric":["24px",{"lineHeight":"28px","letterSpacing":"-0.02em","fontWeight":"700"}],"label-caps":["11px",{"lineHeight":"14px","letterSpacing":"0.08em","fontWeight":"700"}],"stat-modifier":["16px",{"lineHeight":"20px","letterSpacing":"0em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","letterSpacing":"0.01em","fontWeight":"400"}],"headline-sm":["18px",{"lineHeight":"24px","letterSpacing":"0.02em","fontWeight":"600"}],"headline-lg-mobile":["24px",{"lineHeight":"32px","letterSpacing":"0em","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"24px","letterSpacing":"0em","fontWeight":"400"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"0em","fontWeight":"600"}],"display-lg-mobile":["30px",{"lineHeight":"36px","letterSpacing":"-0.01em","fontWeight":"700"}],"display-lg":["40px",{"lineHeight":"48px","letterSpacing":"-0.01em","fontWeight":"700"}],"headline-md":["22px",{"lineHeight":"28px","letterSpacing":"0.01em","fontWeight":"600"}],"body-sm":["12px",{"lineHeight":"16px","letterSpacing":"0.02em","fontWeight":"400"}],"formula-sm":["11px",{"lineHeight":"14px","letterSpacing":"0.02em","fontWeight":"500"}]}}}}</script></head><body class="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container"><aside class="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between py-6 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.5)]"><div class="flex flex-col gap-6"><div class="flex items-center gap-3 px-2"><div class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shadow-[0_0_12px_rgba(212,175,55,0.25)]"><span class="material-symbols-outlined text-[24px]">auto_stories</span></div><div><div class="font-headline-sm text-headline-sm text-primary tracking-tight">Arcana 5e</div><div class="font-formula-sm text-formula-sm text-on-surface-variant uppercase tracking-widest">2024 Revision</div></div></div><div class="px-2"><div class="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-2">Codex &amp; Campaign</div><nav class="flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(212,175,55,0.3)]"><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="2024-compendium" href="#"><span class="material-symbols-outlined text-[20px]">menu_book</span><span class="font-body-md text-body-md">2024 Compendium</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="character-sheet" href="#"><span class="material-symbols-outlined text-[20px]">badge</span><span class="font-body-md text-body-md">Character Sheet</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="spell-grimoire" href="#"><span class="material-symbols-outlined text-[20px]">flare</span><span class="font-body-md text-body-md">Spell Grimoire</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="combat-tracker" href="#"><span class="material-symbols-outlined text-[20px]">swords</span><span class="font-body-md text-body-md">Combat Tracker</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="inventory-attunement" href="#"><span class="material-symbols-outlined text-[20px]">shield</span><span class="font-body-md text-body-md">Inventory &amp; Attunement</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="bestiary" href="#"><span class="material-symbols-outlined text-[20px]">high_res</span><span class="font-body-md text-body-md">Bestiary</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all" data-path="codex-glossary" href="#"><span class="material-symbols-outlined text-[20px]">school</span><span class="font-body-md text-body-md">Codex &amp; Glossary</span></a></nav></div></div><div class="flex flex-col gap-2 px-2 pt-4 bg-surface-container-low rounded-xl p-3"><div class="flex items-center justify-between text-on-surface-variant"><span class="font-label-caps text-label-caps uppercase">Arcane Attunement</span><span class="font-formula-sm text-formula-sm text-primary">3 / 3</span></div><div class="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden"><div class="bg-primary h-full w-full rounded-full"></div></div><div class="flex items-center justify-between pt-1"><span class="font-body-sm text-body-sm text-on-surface-variant">Inspiration</span><span class="material-symbols-outlined text-primary text-[18px]">stars</span></div></div></aside><div class="pl-72"><header class="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-40 px-8 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.3)]"><div class="flex items-center gap-4 flex-1 max-w-lg"><div class="relative w-full flex items-center"><span class="material-symbols-outlined absolute left-3 text-outline text-[20px]">search</span><input class="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-10 pr-16 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search spells, rules, conditions, feats..." type="text"/><div class="absolute right-3 flex items-center gap-1 font-formula-sm text-formula-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded"><span class="text-[10px]">Ctrl</span><span>K</span></div></div></div><div class="flex items-center gap-5"><button class="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-xl text-primary hover:bg-surface-container-high transition-colors" type="button"><span class="material-symbols-outlined text-[20px]">casino</span><span class="font-label-caps text-label-caps uppercase tracking-wider">Dice Tray</span></button><button class="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button"><span class="material-symbols-outlined text-[22px]">notifications</span><span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span></button><div class="h-6 w-px bg-surface-container-highest"></div><div class="flex items-center gap-3"><div class="text-right hidden sm:block"><div class="font-body-md text-body-md font-semibold text-on-surface leading-tight">Dungeon Sage</div><div class="font-formula-sm text-formula-sm text-primary leading-tight">Level 20 Chronurgist</div></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="w-full pt-16 px-8 min-h-screen bg-background"><div class="flex flex-col w-full">
<!-- Top Ambient Glow -->
<div class="relative w-full overflow-hidden pb-12">
<div class="absolute -top-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
<div class="absolute -top-16 right-1/4 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<!-- Header / Codex Hero Banner -->
<div class="relative z-10 flex flex-col gap-6 pt-4">
<div class="flex flex-wrap items-center justify-between gap-4">
<div class="flex items-center gap-3">
<div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-formula-sm text-formula-sm shadow-sm">
<span class="material-symbols-outlined text-[14px]">verified</span>
<span>2024 SRD Rules Revision</span>
</div>
<div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-secondary font-formula-sm text-formula-sm shadow-sm">
<span class="material-symbols-outlined text-[14px]">school</span>
<span>Beginner-Friendly Codex</span>
</div>
<div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm shadow-sm">
<span class="material-symbols-outlined text-[14px]">update</span>
<span>D&amp;D 5.5e Compatible</span>
</div>
</div>
<div class="flex items-center gap-2">
<button class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-caps text-label-caps transition-all shadow-sm" id="open-all-glossary-btn" type="button">
<span class="material-symbols-outlined text-[16px]">menu_book</span>
<span>Quick Lexicon Drawer</span>
</button>
</div>
</div>
<div class="flex flex-col gap-2 max-w-4xl">
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">
          Adventurer's Codex &amp; Character Creation Guide
        </h1>
<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          A master primer on D&amp;D terminology, core game mechanics, and an interactive 6-step character creation walkthrough crafted for initiate wanderers and veteran tacticians alike. Click any highlighted term to inspect its official rules breakdown.
        </p>
</div>
<!-- Mode Switcher Tabs -->
<div class="flex flex-wrap items-center justify-between gap-4 pt-2">
<div class="flex p-1 gap-1 rounded-xl bg-surface-container-lowest shadow-inner">
<button class="tab-btn flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all bg-primary-container text-on-primary-container shadow-md" data-target="panel-builder" type="button">
<span class="material-symbols-outlined text-[18px]">format_list_numbered</span>
<span>Step-by-Step Character Builder</span>
</button>
<button class="tab-btn flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" data-target="panel-glossary" type="button">
<span class="material-symbols-outlined text-[18px]">spellcheck</span>
<span>Complete 2024 Glossary &amp; Lexicon</span>
</button>
<button class="tab-btn flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" data-target="panel-matrix" type="button">
<span class="material-symbols-outlined text-[18px]">grid_view</span>
<span>Class &amp; Species Matrix</span>
</button>
</div>
<!-- Global Search Bar -->
<div class="relative min-w-[320px] flex-1 max-w-md">
<span class="material-symbols-outlined absolute left-3.5 top-2.5 text-outline text-[18px]">search</span>
<input class="w-full bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-10 pr-20 py-2 rounded-xl focus:outline-none shadow-inner" id="lexicon-search" placeholder="Search any term (e.g., Armor Class, Concentration)..." type="text"/>
<div class="absolute right-3 top-2 flex items-center gap-1 font-formula-sm text-formula-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded">
<span class="text-[10px]">Ctrl</span><span>/</span>
</div>
</div>
</div>
<!-- Quick Filter Chips -->
<div class="flex items-center gap-2 overflow-x-auto pb-1">
<span class="font-label-caps text-label-caps text-outline uppercase tracking-wider mr-2">Filter Codex:</span>
<button class="filter-chip active px-3 py-1 rounded-full bg-surface-container-high text-primary font-formula-sm text-formula-sm transition-all" data-category="all" type="button">All Terms (28)</button>
<button class="filter-chip px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm transition-all" data-category="combat" type="button">Combat &amp; Action Economy</button>
<button class="filter-chip px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm transition-all" data-category="magic" type="button">Magic &amp; Spellcasting</button>
<button class="filter-chip px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm transition-all" data-category="creation" type="button">Character Building</button>
<button class="filter-chip px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-formula-sm text-formula-sm transition-all" data-category="conditions" type="button">Conditions &amp; Tests</button>
</div>
</div>
</div>
<!-- TAB 1: STEP-BY-STEP CHARACTER BUILDER (Default Active) -->
<section class="tab-panel w-full flex flex-col gap-10" id="panel-builder">
<!-- Overview Banner with Interactive Tracker -->
<div class="p-6 rounded-2xl bg-surface-container-low shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
<div class="flex flex-col gap-1 max-w-2xl">
<div class="font-label-caps text-label-caps uppercase text-primary">Interactive 2024 Walkthrough</div>
<h2 class="font-headline-md text-headline-md text-on-surface">The 6 Pillars of Adventurer Forge</h2>
<p class="font-body-md text-body-md text-on-surface-variant">
          In D&amp;D 2024, character creation flows seamlessly from heroic archetype to lineage and origin story. Follow each step sequentially, or test ability score math directly on the fly.
        </p>
</div>
<div class="flex items-center gap-4 bg-surface-container px-5 py-3 rounded-xl shadow-inner">
<div class="flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">Current Tier</span>
<span class="font-stat-numeric text-stat-numeric text-primary">Level 1</span>
</div>
<div class="h-8 w-px bg-surface-container-highest"></div>
<div class="flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">Proficiency</span>
<span class="font-stat-numeric text-stat-numeric text-secondary">+2</span>
</div>
<div class="h-8 w-px bg-surface-container-highest"></div>
<div class="flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">Standard Array</span>
<span class="font-formula-sm text-formula-sm text-on-surface font-bold">15,14,13,12,10,8</span>
</div>
</div>
</div>
<!-- Stepper Navigation Dots (Visual Rail) -->
<div class="grid grid-cols-2 md:grid-cols-6 gap-3">
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-1">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">01</span>
<span class="material-symbols-outlined text-[18px] text-primary">shield_person</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Class &amp; Role</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Heroic Core Archetype</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-2">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">02</span>
<span class="material-symbols-outlined text-[18px] text-primary">query_stats</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Ability Scores</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Array &amp; Modifiers</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-3">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">03</span>
<span class="material-symbols-outlined text-[18px] text-primary">diversity_3</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Species / Lineage</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Innate Traits &amp; Speed</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-4">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">04</span>
<span class="material-symbols-outlined text-[18px] text-primary">history_edu</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Background</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">+2/+1 &amp; Origin Feats</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-5">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">05</span>
<span class="material-symbols-outlined text-[18px] text-primary">vital_signs</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Combat Vitals</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">AC, HP, Initiative, Saves</span>
</a>
<a class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all group" href="#step-6">
<div class="flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-primary font-bold">06</span>
<span class="material-symbols-outlined text-[18px] text-primary">auto_fix_high</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface font-bold">Spells &amp; Details</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Cantrips, Slots, DC</span>
</a>
</div>
<!-- STEP 1 CONTAINER -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-1">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">1</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Primary Identity</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Choose Your Class</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 1 of 6
        </div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div class="lg:col-span-2 flex flex-col gap-4 text-on-surface-variant font-body-md text-body-md leading-relaxed">
<p>
            Your class represents your hero's vocation, training, and tactical contribution to the party. In the 2024 revisions, your class dictates your <button class="glossary-term cursor-pointer text-primary underline underline-offset-4 decoration-dotted" data-term="Hit Die" type="button">Hit Die</button>, your starting weapon and armor masteries, your primary saving throw proficiencies, and your core combat mechanics like spellcasting or martial prowess.
          </p>
<div class="p-4 rounded-xl bg-surface-container flex items-start gap-3 text-on-surface">
<span class="material-symbols-outlined text-primary text-[20px] mt-0.5">lightbulb</span>
<div class="flex flex-col gap-1">
<span class="font-label-caps text-label-caps text-primary uppercase">Why This Matters First in 2024</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                Unlike previous editions where species gave stat boosts, in 2024 your class dictates your primary ability score priority. You choose your class first so you know exactly which attributes to maximize (e.g. Strength for Barbarians, Intelligence for Wizards).
              </span>
</div>
</div>
</div>
<!-- Class Quick Match Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex flex-col gap-2">
<div class="font-label-caps text-label-caps text-secondary uppercase">Quick Class Archetypes</div>
<div class="flex flex-wrap gap-1.5">
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">Frontline Tank</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">Burst Striker</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">Arcane Utility</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">Divine Support</span>
</div>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Explore 12 archetypes below with built-in role ratings, primary attributes, and beginner complexity scores.
          </p>
<button class="tab-jump-btn flex items-center justify-center gap-2 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-label-caps text-label-caps transition-all" data-target="panel-matrix" type="button">
<span>Open Class Archetype Matrix</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
<!-- Class Mini-Cards Showcase -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
<div class="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3 group">
<div class="flex items-start justify-between">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface">Fighter</div>
<div class="font-formula-sm text-formula-sm text-primary">Hit Die: d10 • STR or DEX</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps">Tier 1 Friendly</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Master of martial arms, weapon mastery tactical stances, and <button class="glossary-term text-primary underline underline-offset-4 decoration-dotted" data-term="Action Economy" type="button">Action Surge</button>.
          </p>
<div class="flex items-center justify-between text-on-surface-variant font-formula-sm text-formula-sm pt-2">
<span>Role: Martial Striker</span>
<span class="text-primary font-bold">Easy</span>
</div>
</div>
<div class="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3 group">
<div class="flex items-start justify-between">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface">Wizard</div>
<div class="font-formula-sm text-formula-sm text-secondary">Hit Die: d6 • Primary: INT</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps">Arcane Master</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Scholastic spellcaster with the vastest <button class="glossary-term text-primary underline underline-offset-4 decoration-dotted" data-term="Ritual" type="button">Ritual</button> grimoire and area battlefield control.
          </p>
<div class="flex items-center justify-between text-on-surface-variant font-formula-sm text-formula-sm pt-2">
<span>Role: Control / Area Damage</span>
<span class="text-secondary font-bold">Advanced</span>
</div>
</div>
<div class="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3 group">
<div class="flex items-start justify-between">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface">Rogue</div>
<div class="font-formula-sm text-formula-sm text-primary">Hit Die: d8 • Primary: DEX</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps">Infiltrator</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Cunning combatant triggering deadly Sneak Attacks, expert trap disarming, and bonus action agility.
          </p>
<div class="flex items-center justify-between text-on-surface-variant font-formula-sm text-formula-sm pt-2">
<span>Role: Skirmisher / Skills</span>
<span class="text-primary font-bold">Moderate</span>
</div>
</div>
<div class="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3 group">
<div class="flex items-start justify-between">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface">Cleric</div>
<div class="font-formula-sm text-formula-sm text-secondary">Hit Die: d8 • Primary: WIS</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps">Divine Conduit</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Devout healer and armored warrior channeling celestial power for emergency restoration and smites.
          </p>
<div class="flex items-center justify-between text-on-surface-variant font-formula-sm text-formula-sm pt-2">
<span>Role: Support / Off-Tank</span>
<span class="text-primary font-bold">Moderate</span>
</div>
</div>
</div>
</div>
<!-- STEP 2 CONTAINER: Ability Scores & Calculator -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-2">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">2</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Core Mechanics</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Determine Ability Scores</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 2 of 6
        </div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
<!-- Explanatory Text & Standard Array Breakdown -->
<div class="lg:col-span-7 flex flex-col gap-4">
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Every creature in D&amp;D possesses six core abilities ranging generally from 3 to 20 for mortals. Each score directly generates an <button class="glossary-term text-primary underline underline-offset-4 decoration-dotted" data-term="Ability Modifier" type="button">Ability Modifier</button> that applies to attacks, skill checks, and <button class="glossary-term text-primary underline underline-offset-4 decoration-dotted" data-term="Saving Throw" type="button">Saving Throws</button>.
          </p>
<!-- Standard Array Cards -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-outline">2024 Recommended Method: The Standard Array</span>
<div class="grid grid-cols-6 gap-2">
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-primary">15</span>
<span class="font-formula-sm text-formula-sm text-secondary font-bold">+2</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Prime</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-primary">14</span>
<span class="font-formula-sm text-formula-sm text-secondary font-bold">+2</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Secondary</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-on-surface">13</span>
<span class="font-formula-sm text-formula-sm text-secondary font-bold">+1</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Con / Def</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-on-surface">12</span>
<span class="font-formula-sm text-formula-sm text-secondary font-bold">+1</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Tertiary</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-on-surface-variant">10</span>
<span class="font-formula-sm text-formula-sm text-on-surface-variant font-bold">+0</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Average</span>
</div>
<div class="p-2.5 rounded-xl bg-surface-container text-center flex flex-col items-center">
<span class="font-stat-numeric text-stat-numeric text-error">8</span>
<span class="font-formula-sm text-formula-sm text-error font-bold">-1</span>
<span class="font-label-caps text-label-caps text-outline text-[10px] mt-1">Flaw</span>
</div>
</div>
</div>
<!-- Formula Pill -->
<div class="p-4 rounded-xl bg-surface-container flex items-center justify-between gap-4">
<div>
<span class="font-label-caps text-label-caps uppercase text-primary">The Golden Universal Formula</span>
<p class="font-formula-sm text-formula-sm text-on-surface-variant mt-0.5">
                Ability Modifier = <code class="text-primary font-bold">Floor( (Score - 10) / 2 )</code>
</p>
</div>
<div class="px-3 py-1 rounded bg-surface-container-highest text-on-surface font-formula-sm text-formula-sm">
              Even numbers trigger score upgrades!
            </div>
</div>
<!-- Practical in-game check comparisons -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Strength (STR):</span> Breaking chains, swinging heavy greataxes, shoving monsters, jumping chasms.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Dexterity (DEX):</span> Dodging dragonfire, picking locks, stealth, bows, finesse weapons.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Constitution (CON):</span> Resisting poison, maintaining <button class="glossary-term text-primary underline decoration-dotted" data-term="Concentration" type="button">Concentration</button>, raw Hit Points.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Intelligence (INT):</span> Recalling lore, Arcana, Investigation, Nature history, Wizard spellcasting.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Wisdom (WIS):</span> Spotting hidden ambushers (<button class="glossary-term text-primary underline decoration-dotted" data-term="Passive Perception" type="button">Perception</button>), Insight, Medicine, Cleric/Druid spells.
            </div>
<div class="p-3 rounded-xl bg-surface-container text-body-sm text-body-sm text-on-surface-variant">
<span class="text-on-surface font-bold">Charisma (CHA):</span> Persuasion, Deception, Intimidation, Bard / Paladin / Sorcerer spells.
            </div>
</div>
</div>
<!-- Interactive Score Sandbox Widget -->
<div class="lg:col-span-5 p-5 rounded-2xl bg-surface-container flex flex-col gap-4 shadow-sm">
<div class="flex items-center justify-between">
<div class="font-headline-sm text-headline-sm text-primary">Interactive Score Sandbox</div>
<span class="material-symbols-outlined text-primary text-[20px]">calculate</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Adjust the slider to simulate any ability score and watch how its modifier and Level 1 proficiency bonus adapt in real time.
          </p>
<div class="flex flex-col gap-2 p-4 rounded-xl bg-surface-container-lowest">
<div class="flex items-center justify-between">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant" for="ability-score-slider">Ability Score</label>
<span class="font-stat-numeric text-stat-numeric text-primary" id="slider-score-value">16</span>
</div>
<input class="w-full accent-primary cursor-pointer" id="ability-score-slider" max="20" min="3" type="range" value="16"/>
<div class="flex justify-between text-[10px] text-outline font-formula-sm">
<span>3 (Min)</span>
<span>10 (Avg)</span>
<span>20 (Max Mortal)</span>
</div>
</div>
<div class="grid grid-cols-2 gap-3">
<div class="p-3 rounded-xl bg-surface-container-high flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">Modifier</span>
<span class="font-stat-numeric text-stat-numeric text-secondary font-bold" id="computed-modifier">+3</span>
<span class="text-[11px] text-outline">Base D20 addition</span>
</div>
<div class="p-3 rounded-xl bg-surface-container-high flex flex-col items-center">
<span class="font-formula-sm text-formula-sm text-on-surface-variant uppercase">If Proficient (Lv 1)</span>
<span class="font-stat-numeric text-stat-numeric text-primary font-bold" id="computed-proficient-save">+5</span>
<span class="text-[11px] text-outline">Modifier + Prof (+2)</span>
</div>
</div>
<div class="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
<span class="font-label-caps text-label-caps text-outline uppercase">Associated Skills (If Selected Ability = DEX)</span>
<div class="flex flex-wrap gap-1.5" id="skill-tags-preview">
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-body-sm text-body-sm">Acrobatics: <b class="text-secondary" id="preview-acrobatics">+3</b></span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-body-sm text-body-sm">Stealth: <b class="text-secondary" id="preview-stealth">+3</b></span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-body-sm text-body-sm">Sleight of Hand: <b class="text-secondary" id="preview-sleight">+3</b></span>
</div>
</div>
</div>
</div>
</div>
<!-- STEP 3 CONTAINER: Species / Lineage -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-3">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">3</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Ancestry &amp; Lineage</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Choose Your Species</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 3 of 6
        </div>
</div>
<div class="flex flex-col gap-4 text-on-surface-variant font-body-md text-body-md leading-relaxed">
<p>
          In the 2024 revision, Species provides innate physical adaptations—such as movement speeds, Darkvision ranges, elemental resistances, and unique ancestral powers—without dictating rigid ability score locks. Ability boosts are now driven by your upbringing (<button class="glossary-term text-primary underline decoration-dotted" data-term="Background" type="button">Background</button>), freeing you to play any species-class synergy without tactical penalty!
        </p>
</div>
<!-- Species Gallery Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<!-- Human -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Human</span>
<span class="material-symbols-outlined text-primary text-[20px]">person</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Size: Medium or Small</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Resourceful and adaptable. Humans gain an extra Origin Feat of choice at 1st level, plus Heroic Inspiration after every <button class="glossary-term text-primary underline decoration-dotted" data-term="Long Rest" type="button">Long Rest</button>.
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Bonus Origin Feat + Inspiration
          </div>
</div>
<!-- Elf -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Elf</span>
<span class="material-symbols-outlined text-primary text-[20px]">nature_people</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Darkvision: 60 ft</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Keen Senses, Fey Ancestry (<button class="glossary-term text-primary underline decoration-dotted" data-term="Advantage" type="button">Advantage</button> vs Charmed), Trance (rest in 4 hours), and lineage spells (High, Wood, or Drow).
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Trance &amp; Fey Ancestry
          </div>
</div>
<!-- Dwarf -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Dwarf</span>
<span class="material-symbols-outlined text-primary text-[20px]">handyman</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Darkvision: 120 ft</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Dwarven Toughness (+1 max HP per level permanently), Stonecunning (tremorsense on stone surfaces), and Poison Resilience.
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Tremorsense + Extra Max HP
          </div>
</div>
<!-- Halfling -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Halfling</span>
<span class="material-symbols-outlined text-primary text-[20px]">mood</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Size: Small</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Legendary Luck (reroll any d20 natural 1 on attacks, checks, or saves!), Halfling Nimbleness (move through larger creatures' spaces), and Brave.
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Lucky (Reroll Nat 1s)
          </div>
</div>
<!-- Dragonborn -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Dragonborn</span>
<span class="material-symbols-outlined text-primary text-[20px]">local_fire_department</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Darkvision: 60 ft</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Draconic Breath Weapon (replaces one attack, scales with level), Damage Resistance matched to color ancestry, and temporary flight wings at Lv 5!
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Scaling Breath + Flight
          </div>
</div>
<!-- Tiefling -->
<div class="p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Tiefling</span>
<span class="material-symbols-outlined text-primary text-[20px]">psychology</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary">Speed: 30 ft • Darkvision: 60 ft</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Otherworldly Legacy (Abyssal, Chthonic, or Infernal) granting Thaumaturgy, elemental resistance, and progressive leveled spells at levels 3 &amp; 5.
          </p>
<div class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase">
            Signature: Fiendish Magic Progression
          </div>
</div>
</div>
</div>
<!-- STEP 4 CONTAINER: Background & Origin Feats -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-4">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">4</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Origin Story &amp; Talents</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Select Your Background</h3>
</div>
</div>
<button class="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary border border-primary/30 font-label-caps text-label-caps transition-all shadow-sm" onclick="document.getElementById('origin-feats-modal').classList.remove('hidden')" title="Open Origin Feats Modal" type="button">
<span class="material-symbols-outlined text-[16px]">auto_awesome</span>
<span>Browse All 10 Origin Feats</span>
</button><div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 4 of 6
        </div>
</div>
<div class="p-4 rounded-xl bg-surface-container flex items-start gap-4">
<span class="material-symbols-outlined text-secondary text-[24px] mt-0.5">change_circle</span>
<div class="flex flex-col gap-1">
<span class="font-headline-sm text-headline-sm text-on-surface">The 2024 Rule Shift: Backgrounds Are Paramount</span>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            In D&amp;D 2024, your background is the definitive mechanical engine for starting ability points. Every background grants:
            <span class="text-primary font-bold">1) +2/+1 or +1/+1/+1 to three assigned ability scores</span>,
            <span class="text-secondary font-bold">2) A free Origin Feat</span> (e.g. Tough, Alert, Magic Initiate),
            <span class="text-on-surface font-bold">3) Two Skill Proficiencies</span>,
            <span class="text-on-surface font-bold">4) A Tool Proficiency</span>, and 50 GP of starting equipment!
          </p>
</div>
</div>
<!-- Background Examples Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<div class="p-4 rounded-xl bg-surface-container flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Acolyte</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">WIS / INT / CHA</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Temple cloister devotee. Grants Insight, Religion, Calligrapher's Supplies, and the <button class="glossary-term text-primary underline decoration-dotted" data-term="Origin Feat" type="button">Magic Initiate (Cleric)</button> feat.
          </p>
<div class="font-formula-sm text-formula-sm text-secondary font-bold">Feat: Magic Initiate</div>
</div>
<div class="p-4 rounded-xl bg-surface-container flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Soldier</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">STR / DEX / CON</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Disciplined battlefield veteran. Grants Athletics, Intimidation, Gaming Set proficiency, and the legendary <button class="glossary-term text-primary underline decoration-dotted" data-term="Origin Feat" type="button">Savage Attacker</button> feat.
          </p>
<div class="font-formula-sm text-formula-sm text-secondary font-bold">Feat: Savage Attacker</div>
</div>
<div class="p-4 rounded-xl bg-surface-container flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Criminal</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">DEX / CON / INT</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Underworld contact and stealth operative. Grants Deception, Stealth, Thieves' Tools proficiency, and the high-value <button class="glossary-term text-primary underline decoration-dotted" data-term="Origin Feat" type="button">Alert</button> feat (swap initiative!).
          </p>
<div class="font-formula-sm text-formula-sm text-secondary font-bold">Feat: Alert (+Initiative swap)</div>
</div>
<div class="p-4 rounded-xl bg-surface-container flex flex-col justify-between gap-3">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface">Guide</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">DEX / CON / WIS</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Wilderness trailblazer and pathfinder. Grants Stealth, Survival, Cartographer's Tools, and the <button class="glossary-term text-primary underline decoration-dotted" data-term="Origin Feat" type="button">Magic Initiate (Druid)</button> feat.
          </p>
<div class="font-formula-sm text-formula-sm text-secondary font-bold">Feat: Magic Initiate (Druid)</div>
</div>
</div>
</div>
<!-- STEP 5 CONTAINER: Combat Vitals & AC Math -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-5">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">5</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Combat Statistics</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Equip Gear &amp; Calculate Combat Vitals</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 5 of 6
        </div>
</div>
<!-- Vitals Bento Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<!-- Armor Class Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex items-center justify-between">
<div class="font-label-caps text-label-caps uppercase text-primary">Defense Rating</div>
<span class="material-symbols-outlined text-primary text-[20px]">shield</span>
</div>
<div class="flex flex-col">
<span class="font-stat-numeric text-stat-numeric text-on-surface">16 AC</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Chain Shirt (13) + DEX (+1) + Shield (+2)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
<button class="glossary-term text-primary underline decoration-dotted" data-term="Armor Class" type="button">Armor Class (AC)</button> is the target number enemies must meet or beat on a d20 attack roll to inflict damage.
          </p>
</div>
<!-- Hit Points Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex items-center justify-between">
<div class="font-label-caps text-label-caps uppercase text-secondary">Vitality (HP)</div>
<span class="material-symbols-outlined text-secondary text-[20px]">favorite</span>
</div>
<div class="flex flex-col">
<span class="font-stat-numeric text-stat-numeric text-on-surface">12 HP</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Max Hit Die (10) + CON Mod (+2)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            At Level 1, your <button class="glossary-term text-primary underline decoration-dotted" data-term="Hit Points (HP)" type="button">Hit Points</button> equal the maximum possible face value of your class Hit Die plus Constitution modifier!
          </p>
</div>
<!-- Initiative Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex items-center justify-between">
<div class="font-label-caps text-label-caps uppercase text-on-surface-variant">Turn Order</div>
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">speed</span>
</div>
<div class="flex flex-col">
<span class="font-stat-numeric text-stat-numeric text-on-surface">+2 Init</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">DEX Modifier (+2) + Feat Bonuses</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Rolled with d20 at the beginning of encounter to establish chronological turn sequence in the <button class="glossary-term text-primary underline decoration-dotted" data-term="Action Economy" type="button">Combat Round</button>.
          </p>
</div>
<!-- Passive Perception Card -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex items-center justify-between">
<div class="font-label-caps text-label-caps uppercase text-outline">Awareness Floor</div>
<span class="material-symbols-outlined text-outline text-[20px]">visibility</span>
</div>
<div class="flex flex-col">
<span class="font-stat-numeric text-stat-numeric text-on-surface">13 PP</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">10 + WIS Mod (+1) + Prof (+2)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
<button class="glossary-term text-primary underline decoration-dotted" data-term="Passive Perception" type="button">Passive Perception</button> prevents surprise attacks without requiring continuous active checks from players.
          </p>
</div>
</div>
<!-- Armor Class Rules Breakdown Table -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col gap-3">
<div class="font-label-caps text-label-caps uppercase text-primary">Armor Categories Quick Reference (2024 SRD)</div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
<div class="p-3 rounded-lg bg-surface-container-high flex flex-col gap-1">
<div class="font-formula-sm text-formula-sm text-on-surface font-bold">Light Armor (e.g. Leather, Studded)</div>
<div class="font-formula-sm text-formula-sm text-secondary">Base AC + Full DEX Modifier</div>
<p class="text-[12px] text-on-surface-variant">Favors agile rogues and rangers with high dexterity scores (+3 to +5).</p>
</div>
<div class="p-3 rounded-lg bg-surface-container-high flex flex-col gap-1">
<div class="font-formula-sm text-formula-sm text-on-surface font-bold">Medium Armor (e.g. Scale, Breastplate)</div>
<div class="font-formula-sm text-formula-sm text-secondary">Base AC + DEX Modifier (Max +2)</div>
<p class="text-[12px] text-on-surface-variant">Ideal for clerics and druids with moderate +2 dexterity investment.</p>
</div>
<div class="p-3 rounded-lg bg-surface-container-high flex flex-col gap-1">
<div class="font-formula-sm text-formula-sm text-on-surface font-bold">Heavy Armor (e.g. Chain Mail, Plate)</div>
<div class="font-formula-sm text-formula-sm text-secondary">Flat Base AC (Ignores DEX completely)</div>
<p class="text-[12px] text-on-surface-variant">Requires STR 13-15 to wear without speed penalty. Maximum protection.</p>
</div>
</div>
</div>
</div>
<!-- STEP 6 CONTAINER: Spells & Final Roleplay Details -->
<div class="p-8 rounded-2xl bg-surface-container-low shadow-md flex flex-col gap-6" id="step-6">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<span class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-stat-numeric text-stat-numeric shadow-sm">6</span>
<div>
<div class="font-label-caps text-label-caps uppercase text-primary">Spellcasting &amp; Persona</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Select Spells &amp; Final Details</h3>
</div>
</div>
<div class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">
          Phase 6 of 6
        </div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
<!-- Magic Primer -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col gap-4">
<div class="font-headline-sm text-headline-sm text-secondary">Magic Basics: Cantrips vs Spell Slots</div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            If your chosen class casts spells, your power is split into infinite at-will spells and finite daily magical reserves:
          </p>
<div class="flex flex-col gap-3">
<div class="p-3 rounded-lg bg-surface-container-high flex items-start gap-3">
<span class="material-symbols-outlined text-secondary text-[20px] mt-0.5">flare</span>
<div class="flex flex-col">
<span class="font-formula-sm text-formula-sm text-on-surface font-bold">Cantrips (Level 0 Magic)</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                  Cast infinitely throughout the day without consuming any <button class="glossary-term text-primary underline decoration-dotted" data-term="Spell Slot" type="button">Spell Slots</button> (e.g. Fire Bolt, Mage Hand, Guidance).
                </span>
</div>
</div>
<div class="p-3 rounded-lg bg-surface-container-high flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] mt-0.5">auto_mode</span>
<div class="flex flex-col">
<span class="font-formula-sm text-formula-sm text-on-surface font-bold">Leveled Spells &amp; Spell Slots</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                  Expend an arcane slot currency per casting. Slots recover upon finishing a <button class="glossary-term text-primary underline decoration-dotted" data-term="Long Rest" type="button">Long Rest</button>.
                </span>
</div>
</div>
</div>
<!-- Formula Bar -->
<div class="p-3 rounded-lg bg-surface-container-lowest flex flex-col gap-1">
<span class="font-label-caps text-label-caps text-primary uppercase">Spell Save DC Universal Formula</span>
<div class="font-formula-sm text-formula-sm text-on-surface">
              Spell Save DC = <code class="text-secondary font-bold">8 + Proficiency Bonus (+2) + Spellcasting Ability Mod</code>
</div>
</div>
</div>
<!-- Roleplay & Story Anchors -->
<div class="p-5 rounded-xl bg-surface-container flex flex-col justify-between gap-4">
<div class="flex flex-col gap-2">
<div class="font-headline-sm text-headline-sm text-primary">Character Persona &amp; Alignment</div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Every heroic legend needs motivation beyond numeric modifiers. Use these 3 pillars to anchor your character in the Dungeon Master's world:
            </p>
</div>
<div class="flex flex-col gap-2">
<div class="p-2.5 rounded-lg bg-surface-container-high">
<span class="font-formula-sm text-formula-sm text-primary font-bold">Personal Hook:</span>
<span class="font-body-sm text-body-sm text-on-surface-variant"> What unresolved debt, mystery, or sworn oath pulled you away from everyday life into dangerous ruins?</span>
</div>
<div class="p-2.5 rounded-lg bg-surface-container-high">
<span class="font-formula-sm text-formula-sm text-secondary font-bold">Core Flaw:</span>
<span class="font-body-sm text-body-sm text-on-surface-variant"> What impulse or blind spot challenges your party during negotiations or perilous dilemmas?</span>
</div>
<div class="p-2.5 rounded-lg bg-surface-container-high">
<span class="font-formula-sm text-formula-sm text-on-surface font-bold">Moral Alignment:</span>
<span class="font-body-sm text-body-sm text-on-surface-variant"> The classic 3x3 compass (e.g. Chaotic Good, Lawful Neutral) guiding ethics and group camaraderie.</span>
</div>
</div>
<div class="flex items-center justify-between pt-2">
<span class="font-formula-sm text-formula-sm text-outline">You are now ready to roll!</span>
<button class="tab-jump-btn px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold hover:shadow-lg transition-all" data-target="panel-glossary" type="button">
              Browse Full Lexicon
            </button>
</div>
</div>
</div>
</div>
</section>
<!-- TAB 2: COMPLETE 2024 GLOSSARY & LEXICON -->
<section class="tab-panel hidden w-full flex flex-col gap-6" id="panel-glossary">
<div class="flex items-center justify-between">
<div>
<h2 class="font-headline-md text-headline-md text-primary">D&amp;D 2024 Rules Glossary &amp; Lexicon</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Instant, plain-English reference cards for core tabletop terms, actions, and combat phases.</p>
</div>
<div class="font-formula-sm text-formula-sm text-secondary bg-surface-container px-3 py-1.5 rounded-xl shadow-inner" id="lexicon-count">
        Showing 16 Terms
      </div>
</div>
<!-- Glossary Term Cards Container -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="lexicon-grid">
<!-- Terms populated both in HTML & interactive search -->
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="armor class ac">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Armor Class" type="button">Armor Class (AC)</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Combat Defense</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          The numerical defense target score an attack roll must equal or surpass to hit and deal damage to a target.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Formula: Armor + DEX (+ Shield)</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Armor Class" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="saving throw">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Saving Throw" type="button">Saving Throw</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Resistance Roll</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          An involuntary d20 roll called by the DM to resist or mitigate an incoming threat like an explosion, trap, or poison spell.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Formula: d20 + Ability Mod (+ Prof)</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Saving Throw" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="advantage disadvantage">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Advantage" type="button">Advantage &amp; Disadvantage</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">D20 Modifiers</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Roll two d20s instead of one. Keep the higher roll for Advantage; keep the lower roll for Disadvantage. They cancel each other out.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Rule: They never stack multiple times</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Advantage" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="magic" data-title="concentration">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Concentration" type="button">Concentration</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">Spell Duration</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Mental focus required to maintain ongoing spells. Taking damage forces a Constitution save (DC 10 or half damage taken) to avoid losing the spell.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Limit: 1 concentration spell active</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Concentration" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="creation" data-title="proficiency bonus">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Proficiency Bonus" type="button">Proficiency Bonus</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Progression</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          A universal scaling modifier (+2 at levels 1-4, up to +6 at level 17+) added to tasks, weapons, tools, and saves you are trained in.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Scales with total Character Level</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Proficiency Bonus" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="action economy round">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Action Economy" type="button">Action Economy</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Turn Phasing</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Each turn you have: 1 Action, 1 Bonus Action (if granted by a feature/spell), Movement up to your speed, 1 Free Object Interaction, and 1 Reaction per round.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>6-second tactical window</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Action Economy" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="difficulty class dc">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="DC (Difficulty Class)" type="button">Difficulty Class (DC)</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Target Number</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          The numerical challenge target set by the DM or spell formula. Typical baseline: Easy (10), Moderate (15), Hard (20), Nearly Impossible (30).
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Rule: You must meet or beat the DC</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="DC (Difficulty Class)" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="combat" data-title="opportunity attack reaction">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Opportunity Attack" type="button">Opportunity Attack</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Reaction Trigger</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          When a hostile creature moves out of your reach without taking the Disengage action, you can spend your Reaction to make one melee strike.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Uses your Reaction</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Opportunity Attack" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="creation" data-title="hit die short rest">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Hit Die" type="button">Hit Die / Dice</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm">Healing Resource</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Your class-determined dice pool (e.g. d6, d8, d10, d12) spent during a Short Rest to restore lost Hit Points without magic.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Regain half total dice on Long Rest</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Hit Die" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="magic" data-title="spell slot ritual cantrip">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Spell Slot" type="button">Spell Slots</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">Arcane Energy</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Expendable units of magical energy graded from 1st to 9th level. A spell can be cast with its base level slot or upcast for stronger effects.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Refills on Long Rest (Warlock: Short)</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Spell Slot" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="magic" data-title="cantrip">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Cantrip" type="button">Cantrip</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">At-Will Magic</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Level 0 spell that never exhausts a spell slot. In 2024, damage cantrips automatically scale at levels 5, 11, and 17.
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Unlimited daily uses</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Cantrip" type="button">Details →</button>
</div>
</div>
<div class="lex-card p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-3 shadow-sm" data-category="magic" data-title="ritual casting">
<div class="flex items-start justify-between">
<button class="glossary-term text-left font-headline-sm text-headline-sm text-primary hover:underline" data-term="Ritual" type="button">Ritual Casting</button>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">Slot-Free Magic</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          In 2024, ANY spellcaster with a ritual spell prepared can cast it without expending a spell slot by adding 10 minutes to the casting time!
        </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-2">
<span>Cost: +10 minutes casting time</span>
<button class="glossary-term text-secondary font-bold hover:underline" data-term="Ritual" type="button">Details →</button>
</div>
</div>
</div>
</section>
<!-- TAB 3: CLASS & SPECIES ARCHETYPE MATRIX -->
<section class="tab-panel hidden w-full flex flex-col gap-8" id="panel-matrix">
<div class="flex items-center justify-between">
<div>
<h2 class="font-headline-md text-headline-md text-primary">Class &amp; Species Archetype Matrix</h2>
<p class="font-body-md text-body-md text-on-surface-variant">A direct tactical comparison of all 12 core classes under 2024 revision guidelines.</p>
</div>
<div class="flex items-center gap-2">
<span class="px-3 py-1 rounded-full bg-surface-container text-on-surface font-formula-sm text-formula-sm">12 Classes • 10 Species</span>
</div>
</div>
<!-- Comparative Table -->
<div class="overflow-x-auto rounded-2xl bg-surface-container-low shadow-md">
<table class="w-full text-left font-body-sm text-body-sm border-collapse">
<thead>
<tr class="bg-surface-container text-primary font-label-caps text-label-caps uppercase tracking-wider">
<th class="py-4 px-4">Class</th>
<th class="py-4 px-3">Primary Stat</th>
<th class="py-4 px-3">Hit Die</th>
<th class="py-4 px-3">Armor &amp; Weapons</th>
<th class="py-4 px-4">Core Tactical Role</th>
<th class="py-4 px-4">2024 Signature Perk</th>
<th class="py-4 px-3 text-right">Complexity</th>
</tr>
</thead>
<tbody class="divide-y divide-transparent">
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Barbarian</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">STR &amp; CON</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d12</td>
<td class="py-3 px-3 text-on-surface-variant">Light, Medium, Shields, Martial</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface">Damage Soak / Melee Tank</span></td>
<td class="py-3 px-4 text-on-surface-variant">Rage sustains on bonus action attack or check</td>
<td class="py-3 px-3 text-right text-primary font-bold">Low</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Bard</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">CHA &amp; DEX</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light Armor, Simple Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary">Buff / Social / Controller</span></td>
<td class="py-3 px-4 text-on-surface-variant">Bardic Inspiration can heal as a Reaction</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Cleric</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">WIS</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light, Medium, Shields (or Heavy via Order)</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary">Divine Heal / Radiant Blast</span></td>
<td class="py-3 px-4 text-on-surface-variant">Subclasses choose Holy Order at Level 1</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Druid</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">WIS</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light, Medium, Shields</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface">Wild Shape / Nature Control</span></td>
<td class="py-3 px-4 text-on-surface-variant">Wild Shape uses temporary HP buffer pool</td>
<td class="py-3 px-3 text-right text-error font-bold">High</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Fighter</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">STR or DEX</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d10</td>
<td class="py-3 px-3 text-on-surface-variant">All Armor, Shields, Martial Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary">Sustained Martial DPS</span></td>
<td class="py-3 px-4 text-on-surface-variant">Weapon Mastery mastery properties (Topple, Vex)</td>
<td class="py-3 px-3 text-right text-primary font-bold">Low</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Monk</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">DEX &amp; WIS</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Unarmored Defense</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface">Agile Skirmisher / Stun</span></td>
<td class="py-3 px-4 text-on-surface-variant">Focus Points recover rapidly; d6 base martial dice</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Paladin</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">STR &amp; CHA</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d10</td>
<td class="py-3 px-3 text-on-surface-variant">All Armor, Shields, Martial Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary">Burst Smite / Aura Defense</span></td>
<td class="py-3 px-4 text-on-surface-variant">Divine Smite functions as a bonus action spell</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Ranger</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">DEX &amp; WIS</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d10</td>
<td class="py-3 px-3 text-on-surface-variant">Light, Medium, Shields, Martial</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface">Tracker / Ranged Marksman</span></td>
<td class="py-3 px-4 text-on-surface-variant">Hunter's Mark is now an innate class engine</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Rogue</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">DEX</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light Armor, Simple, Finesse Martial</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary">Infiltration / Sneak Burst</span></td>
<td class="py-3 px-4 text-on-surface-variant">Cunning Strike lets you trade sneak dice for effects</td>
<td class="py-3 px-3 text-right text-primary font-bold">Low</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Sorcerer</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">CHA &amp; CON</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d6</td>
<td class="py-3 px-3 text-on-surface-variant">No Armor, Simple Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary">Metamagic Specialist</span></td>
<td class="py-3 px-4 text-on-surface-variant">Innate Sorcery grants advantage to attack rolls</td>
<td class="py-3 px-3 text-right text-error font-bold">High</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Warlock</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">CHA</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d8</td>
<td class="py-3 px-3 text-on-surface-variant">Light Armor, Simple Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary">Pact Magic / Eldritch Invocations</span></td>
<td class="py-3 px-4 text-on-surface-variant">Eldritch Invocations unlocked starting at Level 1</td>
<td class="py-3 px-3 text-right text-secondary font-bold">Medium</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-3 px-4 font-headline-sm text-headline-sm text-on-surface">Wizard</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-primary font-bold">INT</td>
<td class="py-3 px-3 font-formula-sm text-formula-sm text-secondary font-bold">d6</td>
<td class="py-3 px-3 text-on-surface-variant">No Armor, Simple Weapons</td>
<td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary">Broad Master of Arcana</span></td>
<td class="py-3 px-4 text-on-surface-variant">Modify and memorize grimoire spells on short rests</td>
<td class="py-3 px-3 text-right text-error font-bold">High</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- INTERACTIVE GLOSSARY SIDE DRAWER (Sliding Flyout) -->
<aside class="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-surface-container-low z-50 transform translate-x-full transition-transform duration-300 ease-out shadow-2xl flex flex-col justify-between border-l border-surface-container-high" id="glossary-drawer">
<!-- Drawer Header -->
<div class="p-6 bg-surface-container flex items-start justify-between gap-4">
<div class="flex flex-col gap-1">
<div class="font-label-caps text-label-caps uppercase text-primary" id="drawer-category">Core Mechanic / Combat Defense</div>
<h3 class="font-headline-md text-headline-md text-on-surface" id="drawer-title">Armor Class (AC)</h3>
</div>
<button class="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" id="close-drawer-btn" type="button">
<span class="material-symbols-outlined text-[24px]">close</span>
</button>
</div>
<!-- Drawer Body -->
<div class="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
<!-- Plain English Definition -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-outline">What It Is in Simple Terms</span>
<div class="p-4 rounded-xl bg-surface-container font-body-md text-body-md text-on-surface leading-relaxed" id="drawer-def">
          Armor Class (AC) is the defensive threshold a monster or attacker must hit or exceed with a d20 attack roll to deal damage to you. If their roll total is lower than your AC, the attack is deflected or misses entirely.
        </div>
</div>
<!-- Concrete Game Example -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-secondary">How It Works in Play</span>
<div class="p-4 rounded-xl bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant leading-relaxed" id="drawer-example">
          A goblin shoots a shortbow at your cleric. The goblin rolls a d20 (getting 11) and adds its +4 attack bonus for a total of 15. Your AC wearing Scale Mail and a shield is 16. Because 15 is lower than 16, the arrow glances harmlessly off your divine shield!
        </div>
</div>
<!-- Common Beginner Traps & Tips -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-primary">Common Rule Trap / Beginner Tip</span>
<div class="p-4 rounded-xl bg-surface-container flex items-start gap-3" id="drawer-tip">
<span class="material-symbols-outlined text-primary text-[20px] mt-0.5">warning</span>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            AC is not “damage reduction” (you do not subtract AC from incoming damage). It determines whether the blow connects effectively in the first place.
          </p>
</div>
</div>
<!-- Related Terms -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps uppercase text-outline">Related Lexicon Rules</span>
<div class="flex flex-wrap gap-2" id="drawer-related">
<button class="glossary-term px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-formula-sm text-formula-sm" data-term="Saving Throw" type="button">Saving Throw</button>
<button class="glossary-term px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-formula-sm text-formula-sm" data-term="Advantage" type="button">Advantage</button>
<button class="glossary-term px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-formula-sm text-formula-sm" data-term="Action Economy" type="button">Action Economy</button>
</div>
</div>
</div>
<!-- Drawer Footer -->
<div class="p-4 bg-surface-container flex items-center justify-between">
<span class="font-formula-sm text-formula-sm text-outline">Press ESC or click backdrop to close</span>
<button class="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-caps text-label-caps transition-all" id="drawer-done-btn" type="button">
        Close Inspector
      </button>
</div>
</aside>
<!-- Drawer Backdrop Scrim -->
<div class="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 hidden transition-opacity" id="drawer-scrim"></div><!-- 2024 ORIGIN FEATS MODAL DIALOG POPUP -->
<div aria-modal="true" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background/80 backdrop-blur-md" id="origin-feats-modal" role="dialog">
<div class="relative w-full max-w-6xl max-h-[90vh] bg-surface-container-lowest border border-outline-variant/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-on-surface animate-in fade-in zoom-in-95 duration-200">
<!-- MODAL HEADER -->
<div class="p-6 bg-surface-container-low border-b border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-4">
<div class="flex items-start gap-3.5">
<div class="w-11 h-11 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.35)] shrink-0">
<span class="material-symbols-outlined text-[24px]">auto_awesome</span>
</div>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-2">
<h2 class="font-headline-md text-headline-md text-primary tracking-tight">2024 Origin Feats Quick Reference</h2>
<span class="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-formula-sm text-formula-sm font-semibold">D&amp;D 2024 SRD</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Universal 1st-level talents granted automatically by Character Backgrounds. In the 2024 rules revision, Origin Feats carry no prerequisite stat requirements.
          </p>
</div>
</div>
<!-- Quick Search & Close -->
<div class="flex items-center gap-3">
<div class="relative min-w-[220px] max-w-xs">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">search</span>
<input class="w-full bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" id="modal-feat-search" placeholder="Search Origin Feats..." type="text"/>
</div>
<button class="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" onclick="document.getElementById('origin-feats-modal').classList.add('hidden')" title="Close Modal" type="button">
<span class="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
</div>
<!-- FILTER & CATEGORY BAR -->
<div class="px-6 py-3 bg-surface-container flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm">
<div class="flex items-center gap-1.5 overflow-x-auto">
<span class="font-label-caps text-label-caps text-outline uppercase tracking-wider mr-1">Category:</span>
<button class="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-semibold transition-all shadow-sm" type="button">All (10)</button>
<button class="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface transition-all" type="button">Combat &amp; Initiative</button>
<button class="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface transition-all" type="button">Magic &amp; Spellcasting</button>
<button class="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface transition-all" type="button">Survivability &amp; Defense</button>
<button class="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface transition-all" type="button">Skill &amp; Utility</button>
</div>
<div class="flex items-center gap-2 text-outline font-formula-sm text-formula-sm">
<span class="material-symbols-outlined text-[16px] text-primary">info</span>
<span>Level 1 Prerequisite: None</span>
</div>
</div>
<!-- MAIN MODAL BODY: FEATS GRID & DETAIL INSPECTOR -->
<div class="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-surface-container-high">
<!-- FEAT CARDS DIRECTORY (7 cols) -->
<div class="lg:col-span-7 p-6 flex flex-col gap-4 overflow-y-auto max-h-[58vh]">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-outline uppercase tracking-wider">Select an Origin Feat to Inspect</span>
<span class="font-formula-sm text-formula-sm text-secondary">10 Official Origin Feats</span>
</div>
<!-- Feats Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5" id="modal-feat-cards-container">
<!-- Card 1: Alert (Active/Selected) -->
<div class="p-4 rounded-xl bg-surface-container border-2 border-primary shadow-[0_0_12px_rgba(212,175,55,0.25)] flex flex-col justify-between gap-3 cursor-pointer group transition-all">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-1.5">
<span>Alert</span>
<span class="material-symbols-outlined text-primary text-[18px]">check_circle</span>
</div>
<div class="font-formula-sm text-formula-sm text-secondary font-semibold">Combat &amp; Initiative</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-formula-sm text-[10px]">Criminal, Guard</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Gain +Proficiency to Initiative, swap Initiative roll counts with willing allies at combat start, and negate enemy surprise.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span class="text-primary font-semibold">Key: Initiative Swap</span>
<span class="text-primary flex items-center gap-1">Selected <span class="material-symbols-outlined text-[14px]">arrow_forward</span></span>
</div>
</div>
<!-- Card 2: Magic Initiate -->
<div class="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high hover:border-secondary transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary font-bold">Magic Initiate</div>
<div class="font-formula-sm text-formula-sm text-secondary font-semibold">Magic &amp; Spellcasting</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-[10px]">Acolyte, Guide</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Choose Cleric, Druid, or Wizard. Learn 2 cantrips + one 1st-level spell castable using spell slots or once per Long Rest for free.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Key: 2 Cantrips + Spell</span>
<span class="group-hover:text-secondary">Inspect →</span>
</div>
</div>
<!-- Card 3: Tough -->
<div class="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high hover:border-primary transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary font-bold">Tough</div>
<div class="font-formula-sm text-formula-sm text-primary font-semibold">Survivability &amp; Defense</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-[10px]">Farmer, Sailor</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Hit point maximum increases by 2 per level immediately (+2 at Lv 1) and by another +2 every time you gain a level thereafter.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Key: +2 HP per Level</span>
<span class="group-hover:text-primary">Inspect →</span>
</div>
</div>
<!-- Card 4: Savage Attacker -->
<div class="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high hover:border-primary transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary font-bold">Savage Attacker</div>
<div class="font-formula-sm text-formula-sm text-primary font-semibold">Combat &amp; Striking</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-[10px]">Soldier</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Once per turn when you hit a target with a weapon, roll weapon damage dice twice and choose either damage total.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Key: Advantage on Damage</span>
<span class="group-hover:text-primary">Inspect →</span>
</div>
</div>
<!-- Card 5: Lucky -->
<div class="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high hover:border-secondary transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary font-bold">Lucky</div>
<div class="font-formula-sm text-formula-sm text-secondary font-semibold">Reroll &amp; Utility</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-[10px]">Merchant, Wayfarer</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Pool of Luck Points equal to Proficiency Bonus. Spend 1 point to grant Advantage on your d20 Test or Disadvantage on enemy strike.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Key: PB Luck Points</span>
<span class="group-hover:text-secondary">Inspect →</span>
</div>
</div>
<!-- Card 6: Musician -->
<div class="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high hover:border-primary transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary font-bold">Musician</div>
<div class="font-formula-sm text-formula-sm text-primary font-semibold">Party Inspiration</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-[10px]">Entertainer</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Finish a Short or Long Rest and play a musical instrument to grant Heroic Inspiration to allies equal to your Proficiency Bonus.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Key: Rest Inspiration</span>
<span class="group-hover:text-primary">Inspect →</span>
</div>
</div>
<!-- Card 7: Tavern Brawler -->
<div class="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high hover:border-primary transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary font-bold">Tavern Brawler</div>
<div class="font-formula-sm text-formula-sm text-primary font-semibold">Unarmed &amp; Shoving</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-[10px]">Brawler, Artisan</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Unarmed strikes deal 1d4 + STR damage, reroll 1s on damage dice, and once per turn push targets 5 feet away on hit.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Key: 1d4 Unarmed + Push</span>
<span class="group-hover:text-primary">Inspect →</span>
</div>
</div>
<!-- Card 8: Healer -->
<div class="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high hover:border-secondary transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary font-bold">Healer</div>
<div class="font-formula-sm text-formula-sm text-secondary font-semibold">Medical Support</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-[10px]">Hermit</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Battle Medic action heals 1d4 + PB + target's Hit Dice pool expenditure, and reroll any 1 rolled on healing spells/dice.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Key: Kit Healing &amp; Reroll</span>
<span class="group-hover:text-secondary">Inspect →</span>
</div>
</div>
<!-- Card 9: Crafter -->
<div class="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high hover:border-primary transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary font-bold">Crafter</div>
<div class="font-formula-sm text-formula-sm text-primary font-semibold">Economy &amp; Trade</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-[10px]">Artisan</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Craft mundane gear in fast intervals during Long Rests, gain 20% cost reduction on nonmagical item purchases, and 3 tool proficiencies.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Key: 20% Discount + Speed</span>
<span class="group-hover:text-primary">Inspect →</span>
</div>
</div>
<!-- Card 10: Skilled -->
<div class="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high hover:border-primary transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm">
<div class="flex items-start justify-between gap-2">
<div>
<div class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary font-bold">Skilled</div>
<div class="font-formula-sm text-formula-sm text-primary font-semibold">Skill Mastery</div>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-[10px]">Noble, Sage</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Gain proficiency in any combination of three skills or tools of your choice. Repeatable if taken again at later levels.
            </p>
<div class="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Key: +3 Skills / Tools</span>
<span class="group-hover:text-primary">Inspect →</span>
</div>
</div>
</div>
</div>
<!-- DETAILED FEAT INSPECTOR PANEL (5 cols) -->
<div class="lg:col-span-5 p-6 bg-surface-container-low flex flex-col justify-between gap-5 overflow-y-auto max-h-[58vh]">
<div class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-primary">Selected Feat Rules Inspector</span>
<span class="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-formula-sm text-formula-sm border border-primary/20">2024 SRD Rules</span>
</div>
<div class="flex flex-col gap-1">
<h3 class="font-headline-md text-headline-md text-on-surface">Alert</h3>
<div class="flex flex-wrap items-center gap-2 pt-1">
<span class="px-2 py-0.5 rounded bg-surface-container text-primary font-formula-sm text-formula-sm">Prerequisite: None</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-secondary font-formula-sm text-formula-sm">Category: Origin Feat</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-formula-sm text-formula-sm">Repeatable: No</span>
</div>
</div>
<!-- Background Compatibility Badge -->
<div class="p-3.5 rounded-xl bg-surface-container flex items-start gap-3 border border-surface-container-high">
<span class="material-symbols-outlined text-secondary text-[20px] mt-0.5">badge</span>
<div class="flex flex-col">
<span class="font-formula-sm text-formula-sm text-on-surface font-bold">Default Background Pairing</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                Criminal, Guard (or custom background with DM approval)
              </span>
</div>
</div>
<!-- Official Rules Text Block -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps text-outline uppercase">Official Mechanical Benefits</span>
<div class="p-4 rounded-xl bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant flex flex-col gap-3 leading-relaxed border border-surface-container-high">
<div class="flex items-start gap-2.5">
<span class="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">bolt</span>
<div>
<strong class="text-on-surface">Initiative Proficiency:</strong> When you roll Initiative, you add your Proficiency Bonus (+2 at Level 1) to the roll result.
                </div>
</div>
<div class="flex items-start gap-2.5">
<span class="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">sync_alt</span>
<div>
<strong class="text-on-surface">Initiative Swap:</strong> Immediately after you roll Initiative, you can swap your Initiative result with the Initiative result of one willing ally in the same combat encounter.
                </div>
</div>
<div class="flex items-start gap-2.5">
<span class="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">visibility</span>
<div>
<strong class="text-on-surface">Never Caught Off Guard:</strong> You cannot be surprised while you are conscious.
                </div>
</div>
</div>
</div>
<!-- Tactical Guide Pill -->
<div class="p-3.5 rounded-xl bg-surface-container flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] mt-0.5">psychology</span>
<div class="flex flex-col gap-0.5">
<span class="font-label-caps text-label-caps text-primary uppercase">Tactician Note</span>
<p class="text-[12px] text-on-surface-variant leading-relaxed">
                The Initiative Swap gives the entire party unprecedented flexibility: high-rolling rogues or clerics can trade places with the wizard to drop an early battlefield control spell before foes act.
              </p>
</div>
</div>
</div>
<!-- Inspector Footer Action Buttons -->
<div class="pt-4 border-t border-surface-container-high flex flex-wrap items-center justify-between gap-3">
<button class="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps flex items-center gap-1.5 transition-all" onclick="navigator.clipboard ? navigator.clipboard.writeText('Alert: +PB to Initiative, Initiative Swap with willing ally, immune to surprise while conscious.') : null" type="button">
<span class="material-symbols-outlined text-[16px]">content_copy</span>
<span>Copy Rules Text</span>
</button>
<button class="px-5 py-2 rounded-xl bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2" onclick="document.getElementById('origin-feats-modal').classList.add('hidden')" type="button">
<span class="material-symbols-outlined text-[18px]">assignment_turned_in</span>
<span>Select Origin Feat</span>
</button>
</div>
</div>
</div>
<!-- MODAL FOOTER BAR -->
<div class="px-6 py-3.5 bg-surface-container flex flex-wrap items-center justify-between gap-4 border-t border-surface-container-high">
<div class="flex items-center gap-4 text-outline font-formula-sm text-formula-sm">
<span>Need another rule? Click any highlighted term in the Codex.</span>
</div>
<div class="flex items-center gap-3">
<span class="font-formula-sm text-formula-sm text-outline hidden sm:inline">Press ESC to return to Builder</span>
<button class="px-4 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-caps text-label-caps transition-all" onclick="document.getElementById('origin-feats-modal').classList.add('hidden')" type="button">
          Done
        </button>
</div>
</div>
</div>
</div>
</div>
<script>
  // Lexicon Database
  const LEXICON_DB = {
    "Armor Class": {
      category: "Core Mechanic / Combat Defense",
      title: "Armor Class (AC)",
      def: "Armor Class represents how difficult it is for opponents to land a damaging strike against you in combat. It combines armor thickness, agile evasion, and defensive gear like shields.",
      example: "If a goblin fires an arrow with a total attack roll of 14, and your AC is 16, the shot glances off your plate or misses completely. If they rolled a 16 or higher, it hits.",
      tip: "Remember: 'Meets it, beats it!' If the attacker matches your exact AC, the strike connects.",
      related: ["Saving Throw", "Hit Points (HP)", "Action Economy"]
    },
    "Saving Throw": {
      category: "Defense Mechanic / Hazard Reaction",
      title: "Saving Throw (Save)",
      def: "A reactive d20 roll you make to resist, avoid, or withstand a harmful effect like a fireball explosion, basilisk petrification, or poison trap.",
      example: "A red dragon breathes fire. You must make a Dexterity saving throw: roll 1d20 + your Dexterity modifier (+ your proficiency bonus if proficient in Dex saves). Beating the DC halves the damage taken.",
      tip: "Saving throws are reactive—you cannot choose to 'attack' with a saving throw; you roll them in response to enemy spells or hazards.",
      related: ["DC (Difficulty Class)", "Advantage", "Concentration"]
    },
    "Advantage": {
      category: "D20 Core Rolling Rule",
      title: "Advantage & Disadvantage",
      def: "Whenever circumstances heavily favor or hinder an action, the DM awards Advantage or imposes Disadvantage. Roll two d20s instead of one.",
      example: "If you attack a target who is Blinded, you have Advantage: you roll two twenty-sided dice (e.g. an 8 and a 17) and pick the higher result (17!).",
      tip: "No matter how many different sources grant you Advantage, you only ever roll two d20s. Furthermore, if you have one source of Advantage and one source of Disadvantage, they completely cancel out.",
      related: ["Saving Throw", "Action Economy", "DC (Difficulty Class)"]
    },
    "Concentration": {
      category: "Magic Rules / Spell Sustenance",
      title: "Concentration",
      def: "A continuous state of mental focus needed to maintain certain active spells. You can only concentrate on ONE spell at any given moment.",
      example: "You cast Bless on your allies. While it lasts, taking damage requires you to roll a Constitution saving throw (DC 10 or half damage, whichever is higher). Failing the check ends Bless immediately.",
      tip: "Casting a second spell that requires Concentration immediately terminates your first concentration spell—no saving throw allowed.",
      related: ["Spell Slot", "Cantrip", "Saving Throw"]
    },
    "Hit Die": {
      category: "Vitality & Recovery Mechanics",
      title: "Hit Die (Hit Dice)",
      def: "A class-determined die pool (d6 for Wizards, d8 for Rogues/Clerics, d10 for Fighters, d12 for Barbarians) used to calculate maximum HP and heal wounds during Short Rests.",
      example: "During a 1-hour Short Rest, a Level 3 Fighter can roll up to three d10s, adding their Constitution modifier to each die, restoring that much lost HP without spending spell slots.",
      tip: "You don't get all Hit Dice back instantly. A Long Rest restores all lost HP, but only recovers half of your total Hit Dice pool.",
      related: ["Hit Points (HP)", "Short Rest", "Long Rest"]
    },
    "Proficiency Bonus": {
      category: "Character Progression / Universal Scale",
      title: "Proficiency Bonus (+PB)",
      def: "A universal bonus reflecting your character's growing experience. It starts at +2 at Level 1 and scales progressively to +6 at Level 17.",
      example: "If your Level 1 Rogue has a Dexterity modifier of +3 and is proficient in Stealth, your total Stealth roll modifier is +3 (Dex) + 2 (PB) = +5.",
      tip: "You never add your proficiency bonus more than once to a single roll unless a specific feature explicitly tells you to double it (like Rogue Expertise).",
      related: ["Ability Modifier", "DC (Difficulty Class)", "Saving Throw"]
    },
    "Action Economy": {
      category: "Turn Structure / Combat Sequence",
      title: "Action Economy (The Combat Turn)",
      def: "The tactical budget of options you are granted during each 6-second round of combat: 1 Movement, 1 Action, 1 Bonus Action (if applicable), 1 Object Interaction, and 1 Reaction.",
      example: "On your turn: Move 30 ft (Movement), swing your broadsword (Action), command your spiritual weapon (Bonus Action), and later parry an enemy attack (Reaction).",
      tip: "You do not have a Bonus Action by default—you must have an ability, feat, or spell that explicitly specifies 'As a Bonus Action'.",
      related: ["Opportunity Attack", "Armor Class", "Advantage"]
    },
    "DC (Difficulty Class)": {
      category: "Target Threshold / Universal Target",
      title: "DC (Difficulty Class)",
      def: "The target number established by the DM or game rules that an ability check or saving throw must equal or beat to succeed.",
      example: "To pick an iron lock with DC 15, your d20 roll plus Thieves' Tools modifier must equal 15 or higher.",
      tip: "Ties go to the roller! Rolling exactly the DC is a success.",
      related: ["Saving Throw", "Proficiency Bonus", "Ability Modifier"]
    },
    "Opportunity Attack": {
      category: "Combat Reaction Rule",
      title: "Opportunity Attack",
      def: "A special melee strike made using your Reaction when a hostile creature moves out of your reach without first taking the Disengage action.",
      example: "A goblin attempts to run past your Fighter to attack the Wizard behind you. The moment it leaves your 5-foot melee reach, you can use your Reaction to take a free melee swing.",
      tip: "Teleporting (like Misty Step) or forced movement (like being pushed by Thunderwave) does NOT provoke opportunity attacks.",
      related: ["Action Economy", "Armor Class"]
    },
    "Spell Slot": {
      category: "Arcane Currency / Magic Meter",
      title: "Spell Slots",
      def: "The daily expendable fuel needed to cast leveled spells (1st to 9th level). Think of them like batteries of different voltage.",
      example: "A Level 1 Wizard has two 1st-level spell slots. Casting Shield uses one slot; casting Magic Missile uses the second. Both slots return after a Long Rest.",
      tip: "You can cast a lower-level spell using a higher-level slot (called 'Upcasting') to amplify its damage or number of targets.",
      related: ["Cantrip", "Ritual", "Concentration"]
    },
    "Cantrip": {
      category: "Infinite Magic / Level 0 Spells",
      title: "Cantrip (Level 0 Magic)",
      def: "Minor spells that can be cast at will, all day long, without expending any spell slots.",
      example: "Fire Bolt, Eldritch Blast, and Light are cantrips. You can cast them every turn in combat without running out of magical reserves.",
      tip: "In the 2024 revision, damaging cantrips automatically scale up in dice count at levels 5, 11, and 17 based on your total character level.",
      related: ["Spell Slot", "Ritual", "Action Economy"]
    },
    "Ritual": {
      category: "Utility Magic / Slow Casting",
      title: "Ritual Casting",
      def: "A method of casting a spell with the [Ritual] tag without expending a spell slot, simply by taking an additional 10 minutes to perform the casting.",
      example: "Casting Detect Magic as a ritual takes 10 minutes and 6 seconds, preserving all of your spell slots for upcoming combat encounters.",
      tip: "Under 2024 rules, any spellcaster who has a ritual spell prepared can cast it as a ritual—no special feat required!",
      related: ["Spell Slot", "Cantrip", "Concentration"]
    },
    "Origin Feat": {
      category: "Character Creation / 2024 Backgrounds",
      title: "Origin Feats",
      def: "Level 1 character talents granted automatically by your background in the 2024 rules (such as Alert, Tough, or Magic Initiate).",
      example: "Choosing the Criminal background gives you the Alert feat, allowing you to add your proficiency bonus to Initiative rolls and swap turn order with willing allies!",
      tip: "Origin Feats do not require level 4 prerequisite gates, giving all 1st level characters a distinct tactical flavor.",
      related: ["Proficiency Bonus", "Ability Modifier"]
    },
    "Passive Perception": {
      category: "Sensory Floor / Anti-Ambush",
      title: "Passive Perception",
      def: "A character's baseline passive awareness when not actively searching: 10 + Wisdom modifier (+ Proficiency Bonus if proficient in Perception).",
      example: "If a goblin tries to sneak up on you with a Stealth roll of 13, and your Passive Perception is 14, the DM will narrate that you hear twigs snapping before the goblin attacks!",
      tip: "DMs use passive scores to check stealth without tipping off players by asking for rolls.",
      related: ["DC (Difficulty Class)", "Advantage"]
    },
    "Hit Points (HP)": {
      category: "Vitality Metric / Life Meter",
      title: "Hit Points (HP)",
      def: "A combination of physical resilience, mental fortitude, combat instincts, and sheer luck that keeps a hero standing in battle.",
      example: "At Level 1, a Fighter with CON +2 has 12 HP (10 base hit die + 2). Dropping to 0 HP knocks you unconscious, requiring Death Saving Throws.",
      tip: "Temporary HP does not stack; if you receive new temporary HP, you choose to keep the old amount or replace it with the new.",
      related: ["Hit Die", "Armor Class"]
    },
    "Ability Modifier": {
      category: "Universal Number / Attribute Power",
      title: "Ability Modifier",
      def: "The numerical modifier calculated from an ability score: Floor((Score - 10) / 2). This modifier is added to every attack, damage, skill check, and saving throw linked to that ability.",
      example: "A Strength score of 16 produces a +3 modifier. A score of 8 produces a -1 modifier.",
      tip: "Always remember that the modifier is what you actually roll on the table—the raw score (like 16 or 14) is mostly just the container holding that modifier.",
      related: ["Proficiency Bonus", "Saving Throw"]
    }
  };

  // Drawer Elements
  const drawer = document.getElementById('glossary-drawer');
  const scrim = document.getElementById('drawer-scrim');
  const drawerCategory = document.getElementById('drawer-category');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerDef = document.getElementById('drawer-def');
  const drawerExample = document.getElementById('drawer-example');
  const drawerTip = document.getElementById('drawer-tip');
  const drawerRelated = document.getElementById('drawer-related');

  function openGlossaryTerm(termKey) {
    const data = LEXICON_DB[termKey] || {
      category: "Rules Reference",
      title: termKey,
      def: "A fundamental concept defined in the Fifth Edition 2024 revision player rules.",
      example: "When triggered in gameplay, consult your Dungeon Master or check the class chapter in the SRD.",
      tip: "Reference the Arcana 5e compendium for exact situational rulings.",
      related: ["Armor Class", "Saving Throw", "Action Economy"]
    };

    drawerCategory.textContent = data.category;
    drawerTitle.textContent = data.title;
    drawerDef.textContent = data.def;
    drawerExample.textContent = data.example;
    drawerTip.querySelector('p').textContent = data.tip;

    // Build related term buttons
    drawerRelated.innerHTML = '';
    (data.related || []).forEach(rel => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'glossary-term px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-formula-sm text-formula-sm transition-colors';
      btn.textContent = rel;
      btn.setAttribute('data-term', rel);
      drawerRelated.appendChild(btn);
    });

    drawer.classList.remove('translate-x-full');
    scrim.classList.remove('hidden');
  }

  function closeGlossaryDrawer() {
    drawer.classList.add('translate-x-full');
    scrim.classList.add('hidden');
  }

  // Event Delegation for Glossary Clicks
  document.addEventListener('click', (e) => {
    const termBtn = e.target.closest('.glossary-term');
    if (termBtn) {
      e.preventDefault();
      const termName = termBtn.getAttribute('data-term');
      if (termName) openGlossaryTerm(termName);
    }
  });

  document.getElementById('close-drawer-btn').addEventListener('click', closeGlossaryDrawer);
  document.getElementById('drawer-done-btn').addEventListener('click', closeGlossaryDrawer);
  scrim.addEventListener('click', closeGlossaryDrawer);
  document.getElementById('open-all-glossary-btn').addEventListener('click', () => openGlossaryTerm('Armor Class'));

  // Keyboard escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGlossaryDrawer();
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      const search = document.getElementById('lexicon-search');
      search.focus();
      search.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Mode Switcher Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function switchTab(targetId) {
    tabPanels.forEach(panel => {
      if (panel.id === targetId) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-target') === targetId) {
        btn.classList.add('bg-primary-container', 'text-on-primary-container', 'shadow-md');
        btn.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-high');
      } else {
        btn.classList.remove('bg-primary-container', 'text-on-primary-container', 'shadow-md');
        btn.classList.add('text-on-surface-variant', 'hover:bg-surface-container-high');
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchTab(target);
    });
  });

  // Jump buttons
  document.querySelectorAll('.tab-jump-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchTab(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Interactive Ability Score Sandbox Slider
  const scoreSlider = document.getElementById('ability-score-slider');
  const sliderScoreVal = document.getElementById('slider-score-value');
  const computedMod = document.getElementById('computed-modifier');
  const computedSave = document.getElementById('computed-proficient-save');
  const prevAcro = document.getElementById('preview-acrobatics');
  const prevStealth = document.getElementById('preview-stealth');
  const prevSleight = document.getElementById('preview-sleight');

  if (scoreSlider) {
    scoreSlider.addEventListener('input', (e) => {
      const score = parseInt(e.target.value, 10);
      const mod = Math.floor((score - 10) / 2);
      const formattedMod = mod >= 0 ? `+${mod}` : `${mod}`;
      const saveProf = mod + 2;
      const formattedSave = saveProf >= 0 ? `+${saveProf}` : `${saveProf}`;

      sliderScoreVal.textContent = score;
      computedMod.textContent = formattedMod;
      computedSave.textContent = formattedSave;
      prevAcro.textContent = formattedMod;
      prevStealth.textContent = formattedMod;
      prevSleight.textContent = formattedMod;
    });
  }

  // Lexicon Search & Filter Chips
  const searchInput = document.getElementById('lexicon-search');
  const filterChips = document.querySelectorAll('.filter-chip');
  const lexCards = document.querySelectorAll('.lex-card');
  const lexCount = document.getElementById('lexicon-count');

  let currentCategory = 'all';

  function filterLexicon() {
    const query = (searchInput.value || '').toLowerCase().trim();
    let visibleCount = 0;

    lexCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const title = card.getAttribute('data-title') || '';
      const text = card.textContent.toLowerCase();

      const matchCat = (currentCategory === 'all' || cat === currentCategory);
      const matchQuery = !query || title.includes(query) || text.includes(query);

      if (matchCat && matchQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (lexCount) {
      lexCount.textContent = `Showing ${visibleCount} Terms`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      // If user starts typing, automatically swap to Glossary tab if not there
      const glossaryPanel = document.getElementById('panel-glossary');
      if (glossaryPanel && glossaryPanel.classList.contains('hidden') && searchInput.value.length > 1) {
        switchTab('panel-glossary');
      }
      filterLexicon();
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('bg-surface-container-high', 'text-primary');
        c.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      chip.classList.add('bg-surface-container-high', 'text-primary');
      chip.classList.remove('bg-surface-container', 'text-on-surface-variant');

      currentCategory = chip.getAttribute('data-category');
      filterLexicon();
    });
  });
</script></main></div></body></html>

<!-- Mobile Character Sheet - Origin Feats Modal -->
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/><meta content="mobile_tab" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{width:100vw;margin:0;padding:0;background-color:#0f131d;}body{overscroll-behavior:none;}.pb-safe{padding-bottom:env(safe-area-inset-bottom,0px);}.pt-safe{padding-top:env(safe-area-inset-top,0px);}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-tertiary-fixed-variant": "#2f3aa3", "primary-container": "#d4af37", "on-primary": "#3c2f00", "on-secondary-container": "#00374d", "surface-bright": "#353944", "surface": "#0f131d", "surface-container-high": "#262a34", "tertiary-container": "#a5adff", "background": "#0f131d", "surface-container": "#1b1f2a", "on-surface-variant": "#d0c5af", "outline": "#99907c", "outline-variant": "#4d4635", "secondary-container": "#00a6e0", "on-background": "#dfe2f0", "primary-fixed-dim": "#e9c349", "tertiary-fixed": "#e0e0ff", "on-primary-fixed": "#241a00", "primary": "#f2ca50", "on-primary-fixed-variant": "#574500", "tertiary": "#c7cbff", "surface-variant": "#313540", "on-tertiary-fixed": "#000767", "surface-container-lowest": "#0a0e18", "error-container": "#93000a", "on-primary-container": "#554300", "surface-dim": "#0f131d", "secondary-fixed-dim": "#7bd0ff", "surface-container-highest": "#313540", "primary-fixed": "#ffe088", "on-secondary-fixed": "#001e2c", "on-tertiary": "#131e8c", "on-error": "#690005", "tertiary-fixed-dim": "#bdc2ff", "on-tertiary-container": "#2d38a1", "inverse-surface": "#dfe2f0", "secondary-fixed": "#c4e7ff", "on-surface": "#dfe2f0", "on-error-container": "#ffdad6", "surface-container-low": "#171b26", "inverse-primary": "#735c00", "secondary": "#7bd0ff", "error": "#ffb4ab", "on-secondary": "#00354a", "surface-tint": "#e9c349", "on-secondary-fixed-variant": "#004c69", "inverse-on-surface": "#2c303b" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "space-sm": "0.5rem", "space-lg": "1.5rem", "gutter": "1.5rem", "space-xs": "0.25rem", "gutter-mobile": "0.75rem", "margin-mobile": "1rem", "space-md": "1rem", "space-xl": "2.5rem", "margin": "2rem" }, "fontFamily": { "body-md": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Playfair Display"], "body-lg": ["Plus Jakarta Sans"], "stat-numeric": ["JetBrains Mono"], "body-sm": ["Plus Jakarta Sans"], "display-lg": ["Playfair Display"], "label-caps": ["Plus Jakarta Sans"], "headline-md": ["Playfair Display"], "display-lg-mobile": ["Playfair Display"], "formula-sm": ["JetBrains Mono"], "headline-sm": ["Playfair Display"], "stat-modifier": ["JetBrains Mono"], "headline-lg": ["Playfair Display"] }, "fontSize": { "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "400" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "0em", "fontWeight": "600" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "stat-numeric": ["24px", { "lineHeight": "28px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "400" }], "display-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-caps": ["11px", { "lineHeight": "14px", "letterSpacing": "0.08em", "fontWeight": "700" }], "headline-md": ["22px", { "lineHeight": "28px", "letterSpacing": "0.01em", "fontWeight": "600" }], "display-lg-mobile": ["30px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "formula-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "headline-sm": ["18px", { "lineHeight": "24px", "letterSpacing": "0.02em", "fontWeight": "600" }], "stat-modifier": ["16px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "0em", "fontWeight": "600" }] } } } }</script></head><body class="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary selection:text-on-primary"><header class="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(0,0,0,0.5)]"><div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm min-w-0"><img alt="Arcana 5e Emblem" class="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1XmU8-_97BRk3fBob1fCTSwJ0v9Y7WI6c_7Tz5zpY_Z7Ha1I5yu9hNSJP6ynPten5XLbO44ZCateTNf-tbKZDQsorGHclyB-k_PXer5mGZxG7fZLmtsBqyFUSOZAQzk0_9BVVUxkM8ZaZ2sdiT_D9c6w9unC_NMiNZ1EyyiwUxRy7E2Rsg4QcO8e3R5cdW-CzzZfA7apEViepCJSkCCfPfSHfu0GGiooFw2WmHwwvzEPg"/><div class="flex flex-col min-w-0"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary tracking-wide font-bold uppercase truncate">ARCANA 5E</span><span class="text-xs text-outline font-stat-numeric hidden sm:inline">•</span><span class="text-xs text-outline truncate hidden sm:inline uppercase tracking-widest font-label-caps">Sheet</span></div><span class="font-label-caps text-label-caps text-on-surface-variant/80 tracking-widest uppercase truncate">2024 RULES COMPENDIUM</span></div></div><div class="flex items-center gap-space-xs flex-shrink-0"><button aria-label="Quick Dice Roll d20" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-primary transition-all" type="button"><span class="material-symbols-outlined text-[20px]">casino</span></button><button aria-label="Search compendium" class="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 text-on-surface transition-all" type="button"><span class="material-symbols-outlined text-[20px]">search</span></button><button aria-label="Character profile Aeloria Level 7" class="h-11 pl-space-xs pr-space-sm flex items-center gap-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all" type="button"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/><div class="flex flex-col items-start leading-none pr-0.5"><span class="font-label-caps text-[10px] text-on-surface font-semibold truncate max-w-[64px]">Aeloria</span><span class="font-formula-sm text-[9px] text-primary">Lv.7</span></div></button></div></div></header><main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full px-margin-mobile pb-space-xl gap-space-md">
<!-- Floating Live Dice Roll Toast Overlay (Managed via JS) -->
<div class="hidden fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-surface-container-highest/95 backdrop-blur-md px-space-md py-space-sm rounded-xl shadow-xl flex items-center gap-space-sm transition-all duration-300" id="dice-banner">
<div class="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-stat-numeric text-stat-modifier">
<span class="material-symbols-outlined text-[18px]">casino</span>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" id="dice-label">d20 Roll</span>
<span class="font-stat-numeric text-stat-numeric text-primary leading-tight" id="dice-result">18 <span class="text-body-sm font-formula-sm text-on-surface">(Nat 15 + 3)</span></span>
</div>
</div>
<!-- 1. Character Identity & Vitality Card -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md shadow-md gap-space-md relative overflow-hidden">
<!-- Ambient Arcane Backlight -->
<div class="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
<!-- Identity Header Row -->
<div class="flex items-center gap-space-md relative">
<div class="relative flex-shrink-0">
<img alt="Aeloria Silvervein" class="w-16 h-16 rounded-xl object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4X1j7PffPpGEF8J-v-wfn-j9NNizEb38FYnaurmTIY3RfoEDaQdJxtAT16dKFh-jRZQEEVdHKQSw03C0SL9nv7t25tOGB7qfdJQonIW0DkrGt3qOKoq4nRSAvlLhKQOoyaKKKsk6NAffzEg576v2o86UEn6GT3tPC4ZyAVOxHOixX-pd_iwbqDlSBRXJTRnqr6haaIQmSMkSFKKOUpJL3Jg8PZ_gWgDLIN2E_z4wd"/>
<span class="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-primary text-on-primary font-formula-sm text-formula-sm font-bold shadow-sm">Lv.7</span>
</div>
<div class="flex flex-col min-w-0 flex-1">
<div class="flex items-center justify-between gap-space-xs">
<h2 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight truncate">Aeloria Silvervein</h2>
<!-- Inspiration Gem -->
<button class="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-high text-primary hover:bg-surface-bright transition-all active:scale-95" id="inspiration-btn" onclick="toggleInspiration()" title="Heroic Inspiration">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="font-label-caps text-[10px] uppercase font-bold tracking-wide">Inspired</span>
</button>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant truncate">High Elf Wizard (Bladesinger)</p>
<div class="flex items-center gap-2 mt-1">
<span class="font-formula-sm text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant">Sage</span>
<span class="font-formula-sm text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-container-low text-secondary">Neutral Good</span>
<span class="font-formula-sm text-[10px] px-1.5 py-0.5 rounded bg-primary-container/20 text-primary">Prof +3</span>
</div>
</div>
</div>
<!-- Active Bladesong & Stance Banner -->
<div class="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-2 min-w-0">
<span class="flex h-2.5 w-2.5 rounded-full bg-secondary animate-pulse flex-shrink-0"></span>
<div class="flex flex-col min-w-0">
<span class="font-label-caps text-label-caps text-secondary font-bold uppercase truncate">Bladesong Active</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">8 rounds left · Conc: Haste (+2 AC)</span>
</div>
</div>
<button class="px-space-sm py-1 rounded-md bg-secondary text-on-secondary font-label-caps text-label-caps uppercase font-bold active:scale-95 transition-transform flex-shrink-0 shadow-sm" id="bladesong-toggle-btn" onclick="toggleBladesong()">
        Deactivate
      </button>
</div>
<!-- Tactical Vitality HUD -->
<div class="grid grid-cols-4 gap-space-xs">
<!-- Armor Class -->
<div class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold">Armor Class</span>
<div class="flex items-baseline gap-1 my-0.5">
<span class="font-stat-numeric text-stat-numeric text-primary font-bold" id="ac-value">20</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant line-through" id="ac-base">16</span>
</div>
<span class="font-formula-sm text-[9px] text-secondary uppercase font-semibold">Bladesong</span>
</div>
<!-- Initiative -->
<button class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center hover:bg-surface-container-high transition-all active:scale-95 group" onclick="triggerRoll('Initiative', 3)">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold group-hover:text-primary">Initiative</span>
<div class="flex items-center gap-0.5 my-0.5 text-primary">
<span class="font-stat-numeric text-stat-numeric font-bold">+3</span>
<span class="material-symbols-outlined text-[14px]">casino</span>
</div>
<span class="font-formula-sm text-[9px] text-on-surface-variant uppercase font-semibold">Advantage</span>
</button>
<!-- Speed -->
<div class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold">Speed</span>
<div class="flex items-baseline gap-0.5 my-0.5">
<span class="font-stat-numeric text-stat-numeric text-on-surface font-bold" id="speed-value">40</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">ft</span>
</div>
<span class="font-formula-sm text-[9px] text-secondary uppercase font-semibold">+10ft Song</span>
</div>
<!-- Passive Senses -->
<div class="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low text-center">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-semibold">Passives</span>
<div class="flex items-center gap-1.5 my-0.5">
<span class="font-stat-modifier text-stat-modifier text-on-surface font-bold" title="Passive Perception">15<span class="font-formula-sm text-[9px] text-on-surface-variant">P</span></span>
<span class="text-on-surface-variant">/</span>
<span class="font-stat-modifier text-stat-modifier text-primary font-bold" title="Passive Investigation">18<span class="font-formula-sm text-[9px] text-on-surface-variant">I</span></span>
</div>
<span class="font-formula-sm text-[9px] text-on-surface-variant uppercase font-semibold">Darkvision 60</span>
</div>
</div>
<!-- Hit Point Management Module -->
<div class="flex flex-col bg-surface-container-low rounded-lg p-space-sm gap-space-xs">
<div class="flex items-center justify-between">
<div class="flex items-baseline gap-1.5">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Hit Points</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface"><span id="current-hp">48</span> <span class="text-body-sm font-formula-sm text-on-surface-variant">/ 48</span></span>
</div>
<div class="flex items-center gap-1.5">
<span class="font-formula-sm text-[11px] text-on-surface-variant">Temp:</span>
<button class="px-2 py-0.5 rounded bg-surface-container text-primary font-formula-sm text-formula-sm font-bold active:scale-95" id="temp-hp-display" onclick="adjustTempHp(1)">+0</button>
</div>
</div>
<!-- Health Gauge Bar -->
<div class="w-full h-2.5 rounded-full bg-surface-container-lowest overflow-hidden flex">
<div class="h-full bg-secondary-container transition-all duration-300 rounded-full" id="hp-bar-fill" style="width: 100%;"></div>
</div>
<!-- Tactile HP Incrementors -->
<div class="grid grid-cols-4 gap-space-xs pt-1">
<button class="py-1.5 rounded-md bg-error-container text-on-error-container font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(-5)">-5</button>
<button class="py-1.5 rounded-md bg-surface-container text-error font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(-1)">-1</button>
<button class="py-1.5 rounded-md bg-surface-container text-primary font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(1)">+1</button>
<button class="py-1.5 rounded-md bg-primary-container text-on-primary-container font-stat-modifier text-stat-modifier font-bold active:scale-95 transition-all text-center" onclick="changeHp(5)">+5</button>
</div>
<!-- Hit Dice & Death Saves Bar -->
<div class="flex items-center justify-between pt-1 gap-2 border-none">
<div class="flex items-center gap-2">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">Hit Dice:</span>
<span class="font-formula-sm text-formula-sm text-on-surface" id="hit-dice-display">5/7d6</span>
<button class="px-1.5 py-0.5 rounded bg-surface-container text-primary hover:bg-surface-bright font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="spendHitDice()">Short Rest</button>
</div>
<!-- Death Saves Toggles -->
<div class="flex items-center gap-1.5">
<div class="flex items-center gap-0.5" title="Successes">
<span class="material-symbols-outlined text-[13px] text-primary">check</span>
<input class="w-3 h-3 accent-primary rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-primary rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-primary rounded cursor-pointer" type="checkbox"/>
</div>
<div class="flex items-center gap-0.5" title="Failures">
<span class="material-symbols-outlined text-[13px] text-error">close</span>
<input class="w-3 h-3 accent-error rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-error rounded cursor-pointer" type="checkbox"/>
<input class="w-3 h-3 accent-error rounded cursor-pointer" type="checkbox"/>
</div>
</div>
</div>
</div>
</section>
<!-- 2. Ability Scores & Saving Throws Array -->
<section class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between px-1">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Attributes &amp; Saves</span>
<span class="font-formula-sm text-[10px] text-primary">★ Proficient Save</span>
</div>
<div class="grid grid-cols-3 gap-space-xs">
<!-- STR -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">STR</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('STR Check', -1)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">-1</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">8</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-formula-sm text-[10px] hover:text-on-surface" onclick="triggerRoll('STR Save', -1)">
          Save -1
        </button>
</div>
<!-- DEX -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">DEX</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('DEX Check', 3)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+3</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">16</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-formula-sm text-[10px] hover:text-on-surface" onclick="triggerRoll('DEX Save', 3)">
          Save +3
        </button>
</div>
<!-- CON -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">CON</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('CON Check', 2)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+2</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">14</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-secondary font-formula-sm text-[10px] font-semibold" onclick="triggerRoll('CON Save (+4 Song)', 6)" title="Song gives +INT to Concentration Saves">
          Save +6*
        </button>
</div>
<!-- INT (Key) -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-bl-sm"></div>
<span class="font-label-caps text-[10px] uppercase text-primary font-bold">INT ★</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('INT Check', 4)">
<span class="font-stat-numeric text-headline-sm text-primary font-bold">+4</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">18</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-formula-sm text-[10px] font-bold shadow-sm" onclick="triggerRoll('INT Save', 7)">
          Save +7 ★
        </button>
</div>
<!-- WIS -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-bl-sm"></div>
<span class="font-label-caps text-[10px] uppercase text-primary font-bold">WIS ★</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('WIS Check', 1)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+1</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">12</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-formula-sm text-[10px] font-bold shadow-sm" onclick="triggerRoll('WIS Save', 4)">
          Save +4 ★
        </button>
</div>
<!-- CHA -->
<div class="flex flex-col bg-surface-container rounded-lg p-2 items-center text-center shadow-sm">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant font-bold">CHA</span>
<button class="my-0.5 active:scale-95 transition-transform" onclick="triggerRoll('CHA Check', 0)">
<span class="font-stat-numeric text-headline-sm text-on-surface font-bold">+0</span>
</button>
<span class="font-formula-sm text-[10px] text-on-surface-variant">10</span>
<button class="w-full mt-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-formula-sm text-[10px] hover:text-on-surface" onclick="triggerRoll('CHA Save', 0)">
          Save +0
        </button>
</div>
</div>
</section>
<!-- 3. Resource Tracker Bar (Bladesong & Arcane Recovery) -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-sm shadow-md">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Arcane Resources</span>
<button class="font-formula-sm text-[10px] text-primary uppercase font-bold hover:underline" onclick="resetResources()">Short/Long Rest</button>
</div>
<!-- Bladesong Uses -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Bladesong Ward</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Prof / Day (+INT to AC, Con saves)</span>
</div>
<div class="flex items-center gap-2" id="bladesong-pips">
<button class="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-on-secondary shadow-sm active:scale-90 transition-transform" onclick="togglePip(this)">
<span class="material-symbols-outlined text-[16px]">shield</span>
</button>
<button class="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-on-secondary shadow-sm active:scale-90 transition-transform" onclick="togglePip(this)">
<span class="material-symbols-outlined text-[16px]">shield</span>
</button>
<button class="w-6 h-6 rounded-md bg-surface-container-highest flex items-center justify-center text-on-surface-variant active:scale-90 transition-transform" onclick="togglePip(this)">
<span class="material-symbols-outlined text-[16px]">shield</span>
</button>
</div>
</div>
<!-- Arcane Recovery -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Arcane Recovery</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Recover up to 4 spell levels</span>
</div>
<button class="px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-formula-sm text-formula-sm font-bold active:scale-95 transition-all shadow-sm" id="arcane-recovery-btn" onclick="toggleRecovery(this)">
        1/1 Ready
      </button>
</div>
</section>
<!-- 4. Spell Slots Matrix (Interactive slot nodules) -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-sm shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-primary text-[18px]">auto_fix_high</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Spell Slots Matrix</span>
</div>
<span class="font-formula-sm text-[10px] text-on-surface-variant">Tap gem to spend / restore</span>
</div>
<div class="grid grid-cols-2 gap-space-xs">
<!-- Level 1 Slots (4) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">1st Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl1-count">4/4</span>
</div>
<div class="flex items-center gap-1.5" data-tier="1">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 1"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 2"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 3"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl1-count')" title="Slot 4"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
</div>
</div>
<!-- Level 2 Slots (3) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">2nd Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl2-count">3/3</span>
</div>
<div class="flex items-center gap-1.5" data-tier="2">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl2-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl2-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl2-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
</div>
</div>
<!-- Level 3 Slots (3: 2 available, 1 spent) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">3rd Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl3-count">2/3</span>
</div>
<div class="flex items-center gap-1.5" data-tier="3">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl3-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl3-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
<button class="w-6 h-6 rotate-45 rounded-sm bg-surface-container-highest text-outline flex items-center justify-center transition-all active:scale-90 opacity-60" onclick="toggleSpellSlot(this, 'lvl3-count')"><span class="-rotate-45 text-[9px] font-bold">◇</span></button>
</div>
</div>
<!-- Level 4 Slots (1) -->
<div class="flex flex-col p-2.5 rounded-lg bg-surface-container-low gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-caps text-[11px] font-bold text-on-surface">4th Level</span>
<span class="font-formula-sm text-[10px] text-primary" id="lvl4-count">1/1</span>
</div>
<div class="flex items-center gap-1.5" data-tier="4">
<button class="w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm" onclick="toggleSpellSlot(this, 'lvl4-count')"><span class="-rotate-45 text-[9px] font-bold">◆</span></button>
</div>
</div>
</div>
</section>
<!-- 5. Quick Combat & Action Economy Bar with Attack Cards -->
<section class="flex flex-col gap-space-sm">
<!-- Visual Segmented Toggle -->
<div class="flex p-1 rounded-xl bg-surface-container overflow-x-auto no-scrollbar gap-1">
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg bg-surface-container-high text-primary font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center" onclick="selectCombatTab(this, 'actions-tab')">
        Actions (Amber)
      </button>
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface" onclick="selectCombatTab(this, 'bonus-tab')">
        Bonus (Cyan)
      </button>
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface" onclick="selectCombatTab(this, 'reactions-tab')">
        Reactions (Violet)
      </button>
<button class="combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface" onclick="selectCombatTab(this, 'spells-tab')">
        Spells
      </button>
</div>
<!-- TAB 1: Primary Actions (Bladesinger Weapon & Cantrips) -->
<div class="combat-view flex flex-col gap-space-xs" id="actions-tab">
<!-- Moonblade (Rapier +1) -->
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></span>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Moonblade</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">+1 Rapier</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Melee Weapon · Finesse, Light · Silvered Arcane focus</p>
<!-- Attack Trigger & Damage Roll Grid -->
<div class="grid grid-cols-2 gap-space-xs mt-1">
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerRoll('Moonblade Atk', 7, '1d20+7')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-primary">To Hit</span>
<span class="font-stat-numeric text-stat-modifier text-primary font-bold">+7</span>
</div>
<span class="material-symbols-outlined text-primary text-[20px]">casino</span>
</button>
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerDamage('Moonblade Dmg', '1d8+4', 'Piercing')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-on-surface">Damage</span>
<span class="font-stat-numeric text-stat-modifier text-on-surface font-bold">1d8+4 <span class="font-formula-sm text-[10px] text-on-surface-variant">Prc</span></span>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">swords</span>
</button>
</div>
<!-- Cantrip Rider Option: Booming Blade Toggle -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest mt-1">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[16px]">thunderstorm</span>
<span class="font-formula-sm text-[11px] text-on-surface">Booming Blade rider: <strong class="text-secondary">+1d8 Thunder</strong></span>
</div>
<button class="px-2 py-0.5 rounded bg-surface-container-high text-secondary hover:bg-surface-bright font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerDamage('Booming Blade', '1d8', 'Thunder')">
            +Roll rider
          </button>
</div>
</div>
<!-- Ray of Frost -->
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-secondary flex-shrink-0"></span>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Ray of Frost</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-secondary font-formula-sm text-[10px] font-semibold">Cantrip</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Ranged Spell Attack · 60 ft · Target speed reduced by 10 ft</p>
<div class="grid grid-cols-2 gap-space-xs mt-1">
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerRoll('Ray of Frost Atk', 7, '1d20+7')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-primary">Spell Atk</span>
<span class="font-stat-numeric text-stat-modifier text-primary font-bold">+7</span>
</div>
<span class="material-symbols-outlined text-primary text-[20px]">casino</span>
</button>
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerDamage('Ray of Frost Dmg', '2d8', 'Cold')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-secondary">Damage</span>
<span class="font-stat-numeric text-stat-modifier text-secondary font-bold">2d8 <span class="font-formula-sm text-[10px] text-on-surface-variant">Cold</span></span>
</div>
<span class="material-symbols-outlined text-secondary text-[20px]">ac_unit</span>
</button>
</div>
</div>
<!-- Fire Bolt -->
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-error flex-shrink-0"></span>
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Fire Bolt</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-error font-formula-sm text-[10px] font-semibold">Cantrip</span>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Ranged Spell Attack · 120 ft · Ignites flammable objects</p>
<div class="grid grid-cols-2 gap-space-xs mt-1">
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerRoll('Fire Bolt Atk', 7, '1d20+7')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-primary">Spell Atk</span>
<span class="font-stat-numeric text-stat-modifier text-primary font-bold">+7</span>
</div>
<span class="material-symbols-outlined text-primary text-[20px]">casino</span>
</button>
<button class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high active:scale-98 transition-all group" onclick="triggerDamage('Fire Bolt Dmg', '2d10', 'Fire')">
<div class="flex flex-col text-left">
<span class="font-label-caps text-[10px] uppercase text-on-surface-variant group-hover:text-error">Damage</span>
<span class="font-stat-numeric text-stat-modifier text-error font-bold">2d10 <span class="font-formula-sm text-[10px] text-on-surface-variant">Fire</span></span>
</div>
<span class="material-symbols-outlined text-error text-[20px]">local_fire_department</span>
</button>
</div>
</div>
</div>
<!-- TAB 2: Bonus Actions (Hidden by default) -->
<div class="combat-view hidden flex-col gap-space-xs" id="bonus-tab">
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Bladesong Activation</span>
</div>
<span class="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Bonus Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Duration: 1 minute (10 rounds). Grants +4 AC, +10ft speed, advantage on Acrobatics checks, +4 bonus to Constitution saves to maintain concentration.</p>
<button class="mt-2 py-2 rounded-lg bg-secondary text-on-secondary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center shadow-sm" onclick="toggleBladesong()">
          Activate Bladesong
        </button>
</div>
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Misty Step</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">2nd Level</span>
</div>
<span class="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Bonus Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Range: Self (30 ft). Briefly surrounded by silver mist, teleport up to 30 feet to an unoccupied space you can see.</p>
<button class="mt-2 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-secondary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center" onclick="triggerQuickCast('Misty Step', 2)">
          Cast (Expends Level 2 Slot)
        </button>
</div>
</div>
<!-- TAB 3: Reactions (Hidden by default) -->
<div class="combat-view hidden flex-col gap-space-xs" id="reactions-tab">
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Shield</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">1st Level</span>
</div>
<span class="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Reaction</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Trigger: When hit by an attack or targeted by magic missile. Grants +5 AC until start of your next turn and negates Magic Missile damage.</p>
<button class="mt-2 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-tertiary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center" onclick="triggerQuickCast('Shield', 1)">
          Trigger +5 AC (AC 25)
        </button>
</div>
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-xs shadow-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Absorb Elements</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-formula-sm text-[10px] font-semibold">1st Level</span>
</div>
<span class="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">Reaction</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Trigger: Taking acid, cold, fire, lightning, or thunder damage. Gain resistance against triggering type, and next melee attack deals +1d6 extra damage.</p>
<button class="mt-2 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-tertiary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-transform text-center" onclick="triggerQuickCast('Absorb Elements', 1)">
          Gain Resistance (Lvl 1)
        </button>
</div>
</div>
<!-- TAB 4: Prepared Spells Quick List (Hidden by default) -->
<div class="combat-view hidden flex-col gap-space-xs" id="spells-tab">
<div class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-sm shadow-md">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">Prepared Grimoire</span>
<span class="font-formula-sm text-formula-sm text-primary">12 Prepared / Save DC 15</span>
</div>
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Haste <span class="text-secondary text-[11px]">(Concentrating)</span></span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">3rd Level · Action · Double speed, +2 AC, extra Action</span>
</div>
<button class="px-2 py-1 rounded bg-error-container text-on-error-container font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="breakConcentration()">Drop Conc</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Fireball</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">3rd Level · 150 ft · 20 ft radius · 8d6 Fire (DEX save DC 15)</span>
</div>
<button class="px-2 py-1 rounded bg-primary-container text-on-primary-container font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerDamage('Fireball', '8d6', 'Fire')">Cast 8d6</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Counterspell</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">3rd Level · Reaction · 60 ft · Interrupt spell of 3rd or lower</span>
</div>
<button class="px-2 py-1 rounded bg-surface-container text-primary font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerRoll('Counterspell Check (INT)', 4)">Check +4</button>
</div>
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-bold text-on-surface">Dimension Door</span>
<span class="font-formula-sm text-[10px] text-on-surface-variant">4th Level · 500 ft · Teleport self + 1 willing passenger</span>
</div>
<button class="px-2 py-1 rounded bg-surface-container text-primary font-label-caps text-[9px] uppercase font-bold active:scale-95" onclick="triggerQuickCast('Dimension Door', 4)">Slot 4</button>
</div>
</div>
</div>
</div>
</section>
</div>
<script>
  // Character Vitality State
  let currentHp = 48;
  const maxHp = 48;
  let tempHp = 0;
  let isBladesongActive = true;
  let hasInspiration = true;
  let remainingHitDice = 5;

  function changeHp(delta) {
    currentHp = Math.max(0, Math.min(maxHp, currentHp + delta));
    const hpElem = document.getElementById('current-hp');
    const barElem = document.getElementById('hp-bar-fill');
    if (hpElem) hpElem.innerText = currentHp;
    if (barElem) {
      const pct = (currentHp / maxHp) * 100;
      barElem.style.width = pct + '%';
      if (pct <= 25) {
        barElem.className = 'h-full bg-error transition-all duration-300 rounded-full';
      } else if (pct <= 50) {
        barElem.className = 'h-full bg-primary transition-all duration-300 rounded-full';
      } else {
        barElem.className = 'h-full bg-secondary-container transition-all duration-300 rounded-full';
      }
    }
  }

  function adjustTempHp(amount) {
    tempHp = (tempHp === 0) ? 8 : 0;
    const btn = document.getElementById('temp-hp-display');
    if (btn) btn.innerText = '+' + tempHp;
  }

  function spendHitDice() {
    if (remainingHitDice > 0) {
      remainingHitDice--;
      document.getElementById('hit-dice-display').innerText = remainingHitDice + '/7d6';
      showToast('Spent Hit Die', 'Regained 1d6+2 HP');
      changeHp(6);
    } else {
      showToast('No Hit Dice Left', 'Requires a Long Rest');
    }
  }

  function toggleBladesong() {
    isBladesongActive = !isBladesongActive;
    const acEl = document.getElementById('ac-value');
    const spdEl = document.getElementById('speed-value');
    const btn = document.getElementById('bladesong-toggle-btn');
    if (isBladesongActive) {
      if (acEl) acEl.innerText = '20';
      if (spdEl) spdEl.innerText = '40';
      if (btn) {
        btn.innerText = 'Deactivate';
        btn.className = 'px-space-sm py-1 rounded-md bg-secondary text-on-secondary font-label-caps text-label-caps uppercase font-bold active:scale-95 transition-transform flex-shrink-0 shadow-sm';
      }
      showToast('Bladesong Activated', '+4 AC, +10ft Speed, +4 Conc');
    } else {
      if (acEl) acEl.innerText = '16';
      if (spdEl) spdEl.innerText = '30';
      if (btn) {
        btn.innerText = 'Activate';
        btn.className = 'px-space-sm py-1 rounded-md bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps uppercase font-bold active:scale-95 transition-transform flex-shrink-0';
      }
      showToast('Bladesong Ended', 'Returned to base defenses');
    }
  }

  function toggleInspiration() {
    hasInspiration = !hasInspiration;
    const btn = document.getElementById('inspiration-btn');
    if (btn) {
      if (hasInspiration) {
        btn.className = 'flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-high text-primary hover:bg-surface-bright transition-all active:scale-95';
        showToast('Inspiration Ready', 'Reroll any d20 check');
      } else {
        btn.className = 'flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all active:scale-95 opacity-50';
        showToast('Inspiration Expended', 'Heroic reroll used');
      }
    }
  }

  function togglePip(button) {
    if (button.classList.contains('bg-secondary')) {
      button.className = 'w-6 h-6 rounded-md bg-surface-container-highest flex items-center justify-center text-on-surface-variant active:scale-90 transition-transform';
    } else {
      button.className = 'w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-on-secondary shadow-sm active:scale-90 transition-transform';
    }
  }

  function toggleRecovery(button) {
    if (button.innerText.includes('Ready')) {
      button.innerText = '0/1 Used';
      button.className = 'px-2.5 py-1 rounded bg-surface-container-highest text-on-surface-variant font-formula-sm text-formula-sm font-bold opacity-60';
      showToast('Arcane Recovery Used', 'Recovered up to 4 spell slot levels');
    } else {
      button.innerText = '1/1 Ready';
      button.className = 'px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-formula-sm text-formula-sm font-bold active:scale-95 transition-all shadow-sm';
    }
  }

  function resetResources() {
    remainingHitDice = 7;
    document.getElementById('hit-dice-display').innerText = '7/7d6';
    currentHp = maxHp;
    changeHp(0);
    showToast('Long Rest Completed', 'All HP, Hit Dice, and spell slots replenished');
  }

  function toggleSpellSlot(btn, counterId) {
    const isAvailable = btn.classList.contains('bg-primary');
    if (isAvailable) {
      btn.className = 'w-6 h-6 rotate-45 rounded-sm bg-surface-container-highest text-outline flex items-center justify-center transition-all active:scale-90 opacity-60';
      btn.firstElementChild.innerText = '◇';
    } else {
      btn.className = 'w-6 h-6 rotate-45 rounded-sm bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 shadow-sm';
      btn.firstElementChild.innerText = '◆';
    }

    // Update parent count
    const parentContainer = btn.parentElement;
    const activeCount = parentContainer.querySelectorAll('.bg-primary').length;
    const totalCount = parentContainer.children.length;
    const countDisplay = document.getElementById(counterId);
    if (countDisplay) {
      countDisplay.innerText = activeCount + '/' + totalCount;
    }
  }

  function selectCombatTab(btn, targetId) {
    document.querySelectorAll('.combat-tab').forEach(b => {
      b.className = 'combat-tab flex-1 py-1.5 px-3 rounded-lg text-on-surface-variant font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center hover:text-on-surface';
    });
    btn.className = 'combat-tab flex-1 py-1.5 px-3 rounded-lg bg-surface-container-high text-primary font-label-caps text-label-caps font-bold uppercase transition-all whitespace-nowrap text-center';

    document.querySelectorAll('.combat-view').forEach(v => {
      v.classList.add('hidden');
      v.classList.remove('flex');
    });

    const activeView = document.getElementById(targetId);
    if (activeView) {
      activeView.classList.remove('hidden');
      activeView.classList.add('flex');
    }
  }

  function triggerRoll(title, mod, formula = '1d20') {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    const isCrit = d20 === 20;
    const isFumble = d20 === 1;

    let descriptor = `(Nat ${d20} + ${mod})`;
    if (isCrit) descriptor = `(NATURAL 20!)`;
    if (isFumble) descriptor = `(CRITICAL MISS)`;

    showToast(title, `${total} <span class="text-body-sm font-formula-sm text-on-surface">${descriptor}</span>`);
  }

  function triggerDamage(title, diceString, type) {
    // Basic dice simulator (e.g. 1d8+4, 2d8, 8d6)
    let total = 0;
    if (diceString === '1d8+4') total = Math.floor(Math.random() * 8) + 1 + 4;
    else if (diceString === '1d8') total = Math.floor(Math.random() * 8) + 1;
    else if (diceString === '2d8') total = Math.floor(Math.random() * 8) + Math.floor(Math.random() * 8) + 2;
    else if (diceString === '2d10') total = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 2;
    else if (diceString === '8d6') total = 28; // Average representation for instant test

    showToast(title, `${total} ${type} <span class="text-body-sm font-formula-sm text-on-surface">(${diceString})</span>`);
  }

  function triggerQuickCast(spellName, level) {
    showToast(`Cast ${spellName}`, `Expended Level ${level} Spell Slot`);
  }

  function breakConcentration() {
    showToast('Concentration Broken', 'Haste dropped: Lethargy for 1 turn');
  }

  let toastTimer = null;
  function showToast(label, resultHtml) {
    const toast = document.getElementById('dice-banner');
    const labelEl = document.getElementById('dice-label');
    const resultEl = document.getElementById('dice-result');

    if (!toast || !labelEl || !resultEl) return;

    labelEl.innerText = label;
    resultEl.innerHTML = resultHtml;

    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }
</script><div class="fixed inset-0 z-50 flex flex-col justify-end bg-surface-container-lowest/80 backdrop-blur-md transition-all duration-300" id="origin-feats-modal"><div class="absolute inset-0" onclick="document.getElementById('origin-feats-modal').remove()"></div><div class="relative z-10 w-full max-h-[88vh] bg-surface-container rounded-t-xl border-t border-outline-variant shadow-[0_-4px_24px_rgba(0,0,0,0.65)] flex flex-col overflow-hidden pb-safe"><div class="w-full flex items-center justify-center pt-2 pb-1 flex-shrink-0"><div class="w-10 h-1 rounded-full bg-outline/40"></div></div><div class="px-gutter-mobile pt-1 pb-3 flex flex-col gap-2 border-b border-outline-variant/40 flex-shrink-0"><div class="flex items-start justify-between gap-2"><div class="flex flex-col min-w-0"><div class="flex items-center gap-1.5 mb-1"><span class="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-formula-sm text-[10px] uppercase font-bold tracking-wider">2024 SRD Rules</span><span class="px-1.5 py-0.5 rounded bg-surface-container-high text-secondary font-formula-sm text-[10px] font-semibold uppercase">Origin Feats</span></div><h2 class="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight truncate">2024 Origin Feats Reference</h2><p class="font-body-sm text-body-sm text-on-surface-variant truncate">Level 1 Background Feats (No prerequisite)</p></div><button aria-label="Close modal" class="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all flex-shrink-0" onclick="document.getElementById('origin-feats-modal').remove()"><span class="material-symbols-outlined text-[18px]">close</span></button></div><div class="relative w-full mt-1"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span><input class="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/60 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary" placeholder="Search Origin Feats..." type="text"/></div><div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1"><button class="px-3 py-1 rounded-full bg-primary text-on-primary font-label-caps text-[10px] uppercase font-bold whitespace-nowrap shadow-sm">All (10)</button><button class="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-label-caps text-[10px] uppercase font-semibold whitespace-nowrap">Combat</button><button class="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-label-caps text-[10px] uppercase font-semibold whitespace-nowrap">Spellcasting</button><button class="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-label-caps text-[10px] uppercase font-semibold whitespace-nowrap">Defense</button><button class="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-label-caps text-[10px] uppercase font-semibold whitespace-nowrap">Utility</button></div></div><div class="overflow-y-auto px-gutter-mobile py-space-sm flex flex-col gap-space-sm flex-1"><div class="flex flex-col gap-1.5 flex-shrink-0"><span class="font-label-caps text-[10px] uppercase font-bold text-on-surface-variant tracking-wider px-1">Available Origin Feats</span><div class="flex gap-2 overflow-x-auto no-scrollbar pb-1"><div class="flex-shrink-0 w-44 p-2.5 rounded-lg bg-surface-container-high border-2 border-primary shadow-sm flex flex-col gap-1 cursor-pointer"><div class="flex items-center justify-between"><span class="font-body-md font-bold text-primary">Alert</span><span class="px-1.5 py-0.2 rounded bg-primary text-on-primary font-formula-sm text-[9px] font-bold uppercase">Inspecting</span></div><span class="font-formula-sm text-[10px] text-on-surface-variant">Criminal, Guard, Sailor</span></div><div class="flex-shrink-0 w-44 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 hover:bg-surface-container-high flex flex-col gap-1 cursor-pointer"><div class="flex items-center justify-between"><span class="font-body-md font-bold text-on-surface">Magic Initiate</span><span class="font-formula-sm text-[10px] text-secondary">Spell</span></div><span class="font-formula-sm text-[10px] text-on-surface-variant">Acolyte, Guide, Sage</span></div><div class="flex-shrink-0 w-44 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 hover:bg-surface-container-high flex flex-col gap-1 cursor-pointer"><div class="flex items-center justify-between"><span class="font-body-md font-bold text-on-surface">Tough</span><span class="font-formula-sm text-[10px] text-secondary">Defense</span></div><span class="font-formula-sm text-[10px] text-on-surface-variant">Farmer, Soldier</span></div><div class="flex-shrink-0 w-44 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 hover:bg-surface-container-high flex flex-col gap-1 cursor-pointer"><div class="flex items-center justify-between"><span class="font-body-md font-bold text-on-surface">Savage Attacker</span><span class="font-formula-sm text-[10px] text-secondary">Combat</span></div><span class="font-formula-sm text-[10px] text-on-surface-variant">Soldier</span></div><div class="flex-shrink-0 w-44 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 hover:bg-surface-container-high flex flex-col gap-1 cursor-pointer"><div class="flex items-center justify-between"><span class="font-body-md font-bold text-on-surface">Lucky</span><span class="font-formula-sm text-[10px] text-secondary">Utility</span></div><span class="font-formula-sm text-[10px] text-on-surface-variant">Merchant, Wayfarer</span></div><div class="flex-shrink-0 w-44 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 hover:bg-surface-container-high flex flex-col gap-1 cursor-pointer"><div class="flex items-center justify-between"><span class="font-body-md font-bold text-on-surface">Musician</span><span class="font-formula-sm text-[10px] text-secondary">Utility</span></div><span class="font-formula-sm text-[10px] text-on-surface-variant">Entertainer</span></div></div></div><div class="flex flex-col bg-surface-container-low rounded-xl p-space-md border border-outline-variant/60 gap-space-sm shadow-sm"><div class="flex items-start justify-between gap-2 border-b border-outline-variant/40 pb-2"><div class="flex items-center gap-2.5"><div class="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center flex-shrink-0 border border-primary/30"><span class="material-symbols-outlined text-[22px]">visibility</span></div><div class="flex flex-col"><h3 class="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">Alert</h3><div class="flex items-center gap-2 text-on-surface-variant font-formula-sm text-[10px]"><span>Category: Origin Feat</span><span>•</span><span>Repeatable: No</span></div></div></div><span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-[10px] uppercase font-bold tracking-wide">Combat</span></div><div class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface-container border border-outline-variant/40"><span class="material-symbols-outlined text-primary text-[16px]">badge</span><div class="flex items-baseline gap-1 text-on-surface-variant font-body-sm"><span class="font-bold text-on-surface text-xs">Default Background Pairing:</span><span class="text-xs text-primary font-formula-sm">Criminal, Guard, Sailor</span></div></div><div class="flex flex-col gap-2 pt-0.5"><span class="font-label-caps text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Official Mechanical Benefits</span><div class="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1 border border-outline-variant/30"><div class="flex items-center gap-1.5 text-primary font-body-sm font-bold"><span class="material-symbols-outlined text-[16px]">speed</span><span>Initiative Proficiency</span></div><p class="font-body-sm text-body-sm text-on-surface-variant pl-5">You can add your Proficiency Bonus (+2 at Lv. 1, +3 at Lv. 7) to your Initiative rolls.</p></div><div class="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1 border border-outline-variant/30"><div class="flex items-center gap-1.5 text-secondary font-body-sm font-bold"><span class="material-symbols-outlined text-[16px]">sync_alt</span><span>Initiative Swap</span></div><p class="font-body-sm text-body-sm text-on-surface-variant pl-5">Immediately after you roll initiative, you can swap your initiative result with the initiative result of one willing ally in the same combat encounter.</p></div><div class="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1 border border-outline-variant/30"><div class="flex items-center gap-1.5 text-on-surface font-body-sm font-bold"><span class="material-symbols-outlined text-[16px]">remove_red_eye</span><span>Never Caught Off Guard</span></div><p class="font-body-sm text-body-sm text-on-surface-variant pl-5">You cannot be surprised while you are conscious, giving your party tactical safety in ambush scenarios.</p></div></div><div class="p-2.5 rounded-lg bg-primary-container/10 border border-primary/40 flex items-start gap-2"><span class="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">lightbulb</span><p class="font-body-sm text-[12px] text-on-surface-variant leading-snug"><strong class="text-primary">Tactician Note:</strong> Swapping initiative enables high-speed crowd control or buff setups before enemies act, pairing exceptionally with Bladesinger spell rotation.</p></div></div></div><div class="p-gutter-mobile border-t border-outline-variant/40 bg-surface-container flex items-center gap-2 flex-shrink-0"><button class="flex-1 py-2.5 rounded-lg bg-primary text-on-primary font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-md" onclick="showToast('Feat Equipped', 'Alert active on character sheet'); document.getElementById('origin-feats-modal').remove();"><span class="material-symbols-outlined text-[18px]">check_circle</span><span>Equip / Select Feat</span></button><button class="px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface-variant font-label-caps text-label-caps uppercase font-bold active:scale-98 transition-all" onclick="document.getElementById('origin-feats-modal').remove()">Close</button></div></div></div></main><nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.65)]" data-active-classes="text-primary font-semibold"><div class="flex justify-around items-center h-16 px-space-xs"><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[22px]">explore</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Dashboard</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="compendium" href="#"><span class="material-symbols-outlined text-[22px]">local_library</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Library</span></a><a aria-current="page" class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors text-primary font-semibold" data-path="sheet" href="#"><span class="material-symbols-outlined text-[22px]">shield_person</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Sheet</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="spell" href="#"><span class="material-symbols-outlined text-[22px]">auto_fix_high</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Spells</span></a><a class="flex flex-col items-center justify-center gap-0.5 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="abilities" href="#"><span class="material-symbols-outlined text-[22px]">swords</span><span class="font-label-caps text-[10px] tracking-wider uppercase">Features</span></a></div></nav></body></html>

<!-- Fiche Toto, Tata - Modale Dons d'Origine (FR) -->
<!DOCTYPE html>

<html class="dark" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
<title>Feuille de Personnage D&amp;D 5e - Toto, Tata</title>
<!-- Tailwind CSS CDN with forms and container queries -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- FontAwesome for RPG Icons -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>
<!-- Google Fonts: Cinzel Decorative for Fantasy Headers & Rajdhani / Inter for Tactical Readability -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&amp;family=Cinzel+Decorative:wght@700&amp;family=Rajdhani:wght@600;700&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            arcana: {
              obsidian: '#090d16',
              surface: '#111827',
              panel: '#151d30',
              border: '#2a354d',
              gold: '#d4af37',
              goldLight: '#f6e082',
              goldDark: '#8a6e1d',
              crimson: '#e11d48',
              mana: '#38bdf8'
            }
          },
          fontFamily: {
            cinzel: ['"Cinzel"', 'serif'],
            decorative: ['"Cinzel Decorative"', 'serif'],
            tactical: ['"Rajdhani"', 'sans-serif'],
            sans: ['"Inter"', 'sans-serif']
          }
        }
      }
    }
  </script>
<!-- BEGIN: Custom Aesthetic Styles -->
<style data-purpose="rpg-layout-effects">
    /* Subtle starry parchment atmospheric background */
    body {
      background-color: #060911;
      background-image: 
        radial-gradient(circle at 50% 10%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 10% 80%, rgba(56, 189, 248, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 90% 70%, rgba(225, 29, 72, 0.05) 0%, transparent 40%);
      min-height: 100vh;
      -webkit-tap-highlight-color: transparent;
    }

    /* Gold Metallic Gradients & Borders */
    .border-gold-emboss {
      border: 1px solid #d4af37;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.2), inset 0 0 8px rgba(212, 175, 55, 0.15);
    }
    .text-gold-glow {
      text-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
    }
    
    /* 5-Way Isometric / Bevelled Pokémon RPG Hub Layout */
    .menu-hub-grid {
      display: grid;
      grid-template-columns: 80px 1fr 80px;
      grid-template-rows: 58px 90px 58px;
      gap: 5px;
      position: relative;
    }

    /* Polygons replicating the hand-drawn perspective trapezoids */
    .facet-top {
      grid-column: 1 / 4;
      grid-row: 1;
      clip-path: polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%);
    }

    .facet-bottom {
      grid-column: 1 / 4;
      grid-row: 3;
      clip-path: polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%);
    }

    .facet-left {
      grid-column: 1;
      grid-row: 1 / 4;
      clip-path: polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%);
      z-index: 10;
    }

    .facet-right {
      grid-column: 3;
      grid-row: 1 / 4;
      clip-path: polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%);
      z-index: 10;
    }

    .facet-center {
      grid-column: 2;
      grid-row: 2;
      z-index: 20;
    }

    /* Tactile button active states */
    .btn-tactile:active {
      transform: scale(0.96);
    }

    /* Custom Scrollbar for action drawer */
    .custom-scroll::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #2a354d;
      border-radius: 4px;
    }
  </style>
<!-- END: Custom Aesthetic Styles -->
</head>
<body class="text-slate-200 font-sans flex justify-center selection:bg-arcana-gold selection:text-black">
<!-- BEGIN: Mobile Device Frame Container -->
<main class="w-full max-w-[420px] min-h-screen bg-arcana-obsidian/95 border-x border-arcana-border/40 flex flex-col justify-between shadow-2xl relative pb-6 overflow-hidden">
<!-- Top Arcane Ambient Edge -->
<div class="h-1 w-full bg-gradient-to-r from-transparent via-arcana-gold to-transparent opacity-80"></div>
<!-- BEGIN: HeaderAndIdentity -->
<header class="px-4 pt-3 pb-1" data-purpose="character-identity-header">
<!-- Title row directly reflecting sketch: Humain / Barde lvl 2 | Toto, Tata | Artiste -->
<div class="flex items-center justify-between border-b border-arcana-gold/30 pb-2">
<!-- Class & Race -->
<div class="text-left w-1/3">
<p class="text-[11px] uppercase tracking-wider text-arcana-gold font-tactical font-semibold">Humain</p>
<p class="text-xs font-bold text-slate-100 font-cinzel leading-none">Barde <span class="text-arcana-gold">Niv.2</span></p>
</div>
<!-- Character Name (Direct from sketch: "Toto, Tata") -->
<div class="text-center w-1/3">
<h1 class="font-decorative text-lg text-arcana-goldLight tracking-wide font-black truncate drop-shadow text-gold-glow">Toto, Tata</h1>
<span class="inline-block text-[9px] uppercase tracking-widest text-slate-400 font-tactical -mt-1">Inspirateur</span>
</div>
<!-- Background / Profession (Direct from sketch: "Artiste") -->
<div class="text-right w-1/3">
<span class="text-[10px] text-slate-400 block font-tactical uppercase">Historique</span>
<span class="inline-block text-xs font-cinzel font-bold text-amber-200/90 border border-arcana-gold/40 px-2 py-0.5 rounded bg-arcana-surface/80">Artiste</span>
</div>
</div>
</header>
<!-- END: HeaderAndIdentity -->
<!-- BEGIN: HeroPortraitAndStatsHUD -->
<section class="px-4 pt-2 relative" data-purpose="hero-stats-overview">
<div class="relative flex items-center justify-between min-h-[165px]">
<!-- LEFT COLUMN: BM Star & Shield Armor Class (As sketched) -->
<div class="flex flex-col items-center space-y-4 w-16 z-20">
<!-- BM Star (+2 Bonus de Maîtrise) -->
<div class="flex flex-col items-center group cursor-pointer" data-purpose="stat-proficiency-bonus" title="Bonus de Maîtrise">
<div class="relative w-12 h-12 flex items-center justify-center transition-transform transform active:scale-95">
<svg class="w-full h-full fill-arcana-panel stroke-arcana-gold stroke-[4] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" viewbox="0 0 100 100">
<polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36"></polygon>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center pt-0.5">
<span class="text-sm font-black font-tactical text-amber-200 leading-none">+2</span>
</div>
</div>
<span class="text-[11px] font-bold tracking-wider text-arcana-gold font-tactical -mt-0.5">BM</span>
</div>
<!-- Medieval Armor Class Shield: "11" (As sketched) -->
<div class="flex flex-col items-center" data-purpose="stat-armor-class" title="Classe d'Armure (CA)">
<div class="relative w-11 h-13 flex items-center justify-center">
<svg class="w-11 h-13 fill-arcana-panel stroke-arcana-gold/80 stroke-[4] drop-shadow-md" viewbox="0 0 100 120">
<path d="M50 5 L92 20 L92 65 C92 95 50 115 50 115 C50 115 8 95 8 65 L8 20 Z"></path>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center pt-1">
<span class="text-base font-black font-tactical text-white">11</span>
<span class="text-[8px] font-bold text-slate-400 -mt-1 font-tactical uppercase">CA</span>
</div>
</div>
</div>
</div>
<!-- CENTER: Circular Portrait Ring with Top Camera Icon + Overlay Hero (Faithful to Sketch) -->
<div class="relative flex flex-col items-center justify-center z-10 -mt-2">
<!-- Outer Celestial Decorative Rings -->
<div class="relative w-36 h-36 rounded-full p-1 bg-gradient-to-b from-arcana-gold via-arcana-goldDark to-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center">
<!-- Camera Glyph At Apex (from sketch) -->
<button class="absolute -top-2.5 z-30 w-7 h-6 rounded-md bg-arcana-surface border border-arcana-gold flex items-center justify-center text-arcana-gold hover:text-white shadow-lg btn-tactile" title="Changer l'avatar">
<i class="fa-solid fa-camera text-[10px]"></i>
</button>
<!-- Inner Circle Frame with Bard Avatar Vector Art -->
<div class="w-full h-full rounded-full bg-arcana-surface overflow-hidden relative border-2 border-arcana-obsidian flex items-center justify-center">
<!-- Stylized Bard Performer Avatar -->
<svg class="w-full h-full object-cover" viewbox="0 0 140 140">
<defs>
<lineargradient id="bgGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#1e293b"></stop>
<stop offset="100%" stop-color="#0f172a"></stop>
</lineargradient>
<lineargradient id="cloakGrad" x1="0" x2="1" y1="0" y2="1">
<stop offset="0%" stop-color="#7c2d12"></stop>
<stop offset="100%" stop-color="#451a03"></stop>
</lineargradient>
</defs>
<!-- Background aura -->
<circle cx="70" cy="70" fill="url(#bgGrad)" r="70"></circle>
<circle cx="70" cy="50" fill="#d4af37" opacity="0.15" r="28"></circle>
<!-- Hero Cloak/Torso -->
<path d="M25 140 C25 100 45 85 70 85 C95 85 115 100 115 140 Z" fill="url(#cloakGrad)" stroke="#d4af37" stroke-width="1.5"></path>
<!-- Hero Head -->
<circle cx="70" cy="55" fill="#fed7aa" r="22" stroke="#d4af37" stroke-width="1"></circle>
<!-- Feathered Bard Hat -->
<path d="M40 50 Q70 30 100 50 Q70 42 40 50 Z" fill="#991b1b"></path>
<path d="M80 32 C95 18 105 15 100 35" fill="none" stroke="#fef08a" stroke-linecap="round" stroke-width="3"></path>
<!-- Lute Neck/Strings silhouette over shoulder -->
<path d="M45 105 L28 65" stroke="#f59e0b" stroke-linecap="round" stroke-width="3.5"></path>
<circle cx="28" cy="65" fill="#d97706" r="4"></circle>
</svg>
<!-- Arcane vignette -->
<div class="absolute inset-0 bg-radial-vignette pointer-events-none rounded-full ring-1 ring-inset ring-white/10"></div>
</div>
</div>
<!-- THE 3-BUBBLE HP CLUSTER ANCHORED AT CIRCLE BOTTOM EDGE (Exactly matching sketch) -->
<div class="relative -mt-6 z-30 flex items-center space-x-1.5 filter drop-shadow-lg" data-purpose="hp-cluster-controller">
<!-- Left Bubble: -1 HP Quick Decrease -->
<button class="w-9 h-9 rounded-full bg-arcana-surface border-2 border-arcana-crimson/90 text-rose-300 hover:bg-rose-950 font-tactical font-black text-sm flex items-center justify-center btn-tactile shadow-md" id="hp-minus-btn" title="Retirer 1 PV">
              -1
            </button>
<!-- Center Pill: Current HP / Max HP (9/9) -->
<div class="h-9 px-3.5 rounded-full bg-gradient-to-r from-arcana-panel via-slate-900 to-arcana-panel border-2 border-arcana-gold flex items-center justify-center space-x-1 shadow-inner">
<span class="text-[10px] text-slate-400 font-tactical uppercase">PV</span>
<span class="text-base font-black font-tactical text-emerald-400 leading-none" id="current-hp">9</span>
<span class="text-slate-500 font-bold text-xs">/</span>
<span class="text-xs font-bold font-tactical text-slate-300 leading-none">9</span>
</div>
<!-- Right Bubble: +1 HP Quick Increase -->
<button class="w-9 h-9 rounded-full bg-arcana-surface border-2 border-emerald-500/90 text-emerald-300 hover:bg-emerald-950 font-tactical font-black text-sm flex items-center justify-center btn-tactile shadow-md" id="hp-plus-btn" title="Ajouter 1 PV">
              +1
            </button>
<!-- Temporary HP Badge: "🛡️ +1" (Immediately next to HP in sketch) -->
<div class="h-8 px-2 rounded-lg bg-blue-950/80 border border-arcana-mana/80 flex items-center space-x-1 ml-0.5 shadow" title="Points de Vie Temporaires">
<i class="fa-solid fa-shield-halved text-arcana-mana text-[10px]"></i>
<span class="text-xs font-black font-tactical text-cyan-200">+1</span>
</div>
</div>
</div>
<!-- RIGHT COLUMN: Speed Metric & Initiative (As sketched) -->
<div class="flex flex-col items-center space-y-4 w-16 z-20">
<!-- Running Foot & 9m Speed (Sketch: 3 dashes + foot + "9m") -->
<div class="flex flex-col items-center cursor-pointer group" data-purpose="stat-speed" title="Vitesse de déplacement">
<div class="w-11 h-11 rounded-xl bg-arcana-panel border border-arcana-border flex flex-col items-center justify-center group-hover:border-arcana-gold transition-colors">
<div class="flex items-center space-x-0.5 text-arcana-gold text-xs">
<i class="fa-solid fa-angles-right text-[9px] opacity-75"></i>
<i class="fa-solid fa-shoe-prints -rotate-90 text-[11px]"></i>
</div>
<span class="text-sm font-black font-tactical text-slate-100 leading-tight">9m</span>
</div>
<span class="text-[10px] font-bold text-slate-400 font-tactical uppercase">Vitesse</span>
</div>
<!-- Initiative Lightning Bolt: "+2 Init" (As sketched) -->
<div class="flex flex-col items-center cursor-pointer group" data-purpose="stat-initiative" title="Modificateur d'Initiative">
<div class="w-11 h-11 rounded-xl bg-arcana-panel border border-arcana-border flex flex-col items-center justify-center group-hover:border-arcana-gold transition-colors">
<i class="fa-solid fa-bolt text-amber-400 text-xs leading-none"></i>
<span class="text-sm font-black font-tactical text-amber-200 leading-tight">+2</span>
</div>
<span class="text-[10px] font-bold text-slate-400 font-tactical uppercase">Init</span>
</div>
</div>
</div>
</section>
<!-- END: HeroPortraitAndStatsHUD -->
<!-- BEGIN: PokemonIsometricCommandHub -->
<!-- Faithful rendering of the 5-facet perspective central menu box from image.png -->
<section class="px-3 pt-4 pb-2" data-purpose="5-way-isometric-rpg-menu">
<div class="text-center mb-1">
<span class="text-[10px] uppercase font-tactical tracking-widest text-arcana-gold/70">Menu Tactique Arcana</span>
</div>
<!-- The 5-Perspective Bevelled Grid -->
<div class="relative bg-black/60 p-1.5 rounded-2xl border border-arcana-gold/40 shadow-[0_4px_25px_rgba(0,0,0,0.8)] overflow-hidden">
<div class="menu-hub-grid">
<!-- 1. TOP FACET: TRAITS -->
<button class="facet-top bg-gradient-to-b from-arcana-panel to-slate-900 hover:from-arcana-gold/20 hover:to-slate-800 border-t-2 border-arcana-gold text-center flex items-center justify-center group transition-all btn-tactile" id="tab-traits" onclick="switchCategory('traits')">
<div class="flex items-center space-x-1.5 pb-2">
<i class="fa-solid fa-scroll text-arcana-gold group-hover:scale-110 text-xs"></i>
<span class="font-cinzel text-xs font-black tracking-widest text-slate-200 group-hover:text-arcana-goldLight">TRAITS</span>
</div>
</button>
<!-- 2. LEFT FACET: SAC / INVENTAIRE (Backpack from sketch) -->
<button class="facet-left bg-gradient-to-r from-arcana-panel to-slate-900 hover:from-arcana-gold/20 border-l-2 border-arcana-gold flex flex-col items-center justify-center text-center group transition-all btn-tactile pr-2" id="tab-inventory" onclick="switchCategory('inventory')">
<i class="fa-solid fa-sack-dollar text-slate-300 group-hover:text-arcana-gold text-lg mb-0.5"></i>
<span class="font-tactical text-[11px] font-bold tracking-wider text-slate-300 uppercase">SAC</span>
</button>
<!-- 3. CENTER CORE: ACTIONS (Prominent rectangular core screen from sketch) -->
<button class="facet-center bg-gradient-to-b from-amber-900/60 via-arcana-panel to-black border-2 border-arcana-gold rounded-lg flex flex-col items-center justify-center p-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] group btn-tactile ring-2 ring-arcana-gold/30" id="tab-actions" onclick="switchCategory('actions')">
<span class="inline-block text-[9px] uppercase font-tactical font-bold text-amber-300 tracking-wider">Actif</span>
<span class="font-cinzel text-base font-black text-arcana-goldLight tracking-wider group-hover:scale-105 transition-transform">ACTIONS</span>
<span class="text-[9px] text-slate-400 font-tactical">Attaques &amp; Tours</span>
</button>
<!-- 4. RIGHT FACET: SORTS (Star wand with sparks from sketch) -->
<button class="facet-right bg-gradient-to-l from-arcana-panel to-slate-900 hover:from-arcana-gold/20 border-r-2 border-arcana-gold flex flex-col items-center justify-center text-center group transition-all btn-tactile pl-2" id="tab-spells" onclick="switchCategory('spells')">
<i class="fa-solid fa-wand-magic-sparkles text-arcana-mana group-hover:text-cyan-300 text-lg mb-0.5"></i>
<span class="font-tactical text-[11px] font-bold tracking-wider text-slate-300 uppercase">SORTS</span>
</button>
<!-- 5. BOTTOM FACET: CARACT / COMPÉTENCES (From sketch) -->
<button class="facet-bottom bg-gradient-to-t from-arcana-panel to-slate-900 hover:from-arcana-gold/20 hover:to-slate-800 border-b-2 border-arcana-gold text-center flex items-center justify-center group transition-all btn-tactile" id="tab-skills" onclick="switchCategory('skills')">
<div class="flex items-center space-x-1.5 pt-2">
<i class="fa-solid fa-dice-d20 text-arcana-gold group-hover:rotate-45 transition-transform text-xs"></i>
<span class="font-cinzel text-[11px] font-black tracking-widest text-slate-200 group-hover:text-arcana-goldLight">CARACT / COMPÉTENCES</span>
</div>
</button>
</div>
</div>
</section>
<!-- END: PokemonIsometricCommandHub -->
<!-- BEGIN: DynamicDetailDeck -->
<!-- Content drawer adapting seamlessly according to the selected facet -->
<section class="px-4 flex-1 flex flex-col" data-purpose="active-view-container">
<!-- View Title & Quick Rest Buttons -->
<div class="flex items-center justify-between py-2 border-b border-arcana-border/50">
<div class="flex items-center space-x-2">
<span class="w-2 h-2 rounded-full bg-arcana-gold animate-pulse"></span>
<h2 class="font-cinzel text-sm font-black text-arcana-goldLight uppercase tracking-wide" id="view-title">Actions de Combat</h2>
</div>
<!-- Rest Actions -->
<div class="flex items-center space-x-1.5 text-[10px] font-tactical">
<button class="px-2 py-1 rounded bg-arcana-surface border border-arcana-border hover:border-arcana-gold text-slate-300 transition-colors btn-tactile">
<i class="fa-solid fa-campground text-[9px] mr-1 text-amber-400"></i>Court
          </button>
<button class="px-2 py-1 rounded bg-arcana-surface border border-arcana-border hover:border-arcana-gold text-slate-300 transition-colors btn-tactile">
<i class="fa-solid fa-bed text-[9px] mr-1 text-arcana-mana"></i>Long
          </button>
</div>
</div>
<!-- Action Cards View (Default Active State matching Sketch) -->
<div class="space-y-2 mt-2 max-h-[220px] overflow-y-auto pr-1 custom-scroll" id="content-deck">
<!-- Card 1: Rapière d'artiste (Weapon Attack) -->
<div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
<div class="flex items-center space-x-2.5">
<div class="w-9 h-9 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-arcana-gold">
<i class="fa-solid fa-khanda text-sm"></i>
</div>
<div>
<h3 class="text-xs font-bold text-slate-100 font-cinzel">Rapière d'artiste</h3>
<p class="text-[11px] text-slate-400 font-tactical">Attaque CàC • Finesse</p>
</div>
</div>
<div class="flex items-center space-x-2">
<button class="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-arcana-panel to-slate-800 border border-arcana-gold/50 text-arcana-goldLight font-tactical font-black text-xs btn-tactile hover:bg-arcana-gold hover:text-black" onclick="simulateRoll('Rapière (Attaque)', '1d20+4')">
              +4 <span class="text-[10px] font-normal text-slate-300">Toucher</span>
</button>
<button class="px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-tactical font-bold text-xs btn-tactile" onclick="simulateRoll('Rapière (Dégâts)', '1d8+2 Perforant')">
              1d8+2
            </button>
</div>
</div>
<!-- Card 2: Moquerie Cruelle (Vicious Mockery - Bard Cantrip) -->
<div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
<div class="flex items-center space-x-2.5">
<div class="w-9 h-9 rounded-lg bg-purple-950/40 border border-purple-500/40 flex items-center justify-center text-purple-300">
<i class="fa-solid fa-masks-theater text-sm"></i>
</div>
<div>
<h3 class="text-xs font-bold text-slate-100 font-cinzel">Moquerie cruelle</h3>
<p class="text-[11px] text-slate-400 font-tactical">Tour de magie • Portée 18m</p>
</div>
</div>
<div class="flex items-center space-x-2">
<span class="text-[10px] font-tactical text-amber-300 bg-amber-950/40 px-2 py-1 rounded border border-amber-600/30">
              JS SAG 13
            </span>
<button class="px-2 py-1.5 rounded-lg bg-purple-900/60 border border-purple-500/50 text-purple-200 font-tactical font-bold text-xs btn-tactile" onclick="simulateRoll('Moquerie Cruelle', '1d4 Psychique')">
              1d4 Psy
            </button>
</div>
</div>
<!-- Card 3: Inspiration Bardique (Class Trait Resource) -->
<div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
<div class="flex items-center space-x-2.5">
<div class="w-9 h-9 rounded-lg bg-cyan-950/40 border border-arcana-mana/40 flex items-center justify-center text-arcana-mana">
<i class="fa-solid fa-music text-sm"></i>
</div>
<div>
<h3 class="text-xs font-bold text-slate-100 font-cinzel">Inspiration bardique</h3>
<p class="text-[11px] text-slate-400 font-tactical">Action bonus • Dé d6</p>
</div>
</div>
<div class="flex items-center space-x-1.5">
<!-- 3 Resource slots -->
<div class="flex space-x-1">
<span class="w-3 h-3 rounded-full bg-arcana-mana shadow-[0_0_6px_rgba(56,189,248,0.8)]"></span>
<span class="w-3 h-3 rounded-full bg-arcana-mana shadow-[0_0_6px_rgba(56,189,248,0.8)]"></span>
<span class="w-3 h-3 rounded-full bg-arcana-mana shadow-[0_0_6px_rgba(56,189,248,0.8)]"></span>
</div>
<button class="ml-2 px-2.5 py-1 rounded bg-slate-800 border border-arcana-mana text-arcana-mana font-tactical font-bold text-xs btn-tactile" onclick="simulateRoll('Inspiration Bardique Donnée', '1d6')">
              Donner d6
            </button>
</div>
</div>
</div>
<!-- Quick Dice Roll Outcome Notification Bar -->
<div class="mt-2 py-1.5 px-3 rounded-lg bg-arcana-panel border border-arcana-gold/40 flex items-center justify-between text-xs" id="dice-banner">
<span class="text-slate-400 font-tactical"><i class="fa-solid fa-dice text-arcana-gold mr-1.5"></i>Journal de dés:</span>
<span class="font-tactical font-bold text-arcana-goldLight" id="dice-result">Prêt pour le lancer</span>
</div>
</section>
<!-- END: DynamicDetailDeck -->
<!-- BEGIN: QuickAttributeBar (Bottom Stats Strip) -->
<footer class="mt-3 px-4 pt-2 border-t border-arcana-border/40" data-purpose="quick-attribute-footer">
<div class="grid grid-cols-6 gap-1 text-center font-tactical">
<!-- STR -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">FOR</span>
<span class="font-bold text-xs text-slate-200">10</span>
<span class="text-[9px] text-slate-400">+0</span>
</div>
<!-- DEX -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">DEX</span>
<span class="font-bold text-xs text-amber-300">15</span>
<span class="text-[9px] text-amber-400 font-semibold">+2</span>
</div>
<!-- CON -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">CON</span>
<span class="font-bold text-xs text-slate-200">12</span>
<span class="text-[9px] text-slate-400">+1</span>
</div>
<!-- INT -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">INT</span>
<span class="font-bold text-xs text-slate-200">13</span>
<span class="text-[9px] text-slate-400">+1</span>
</div>
<!-- WIS -->
<div class="p-1 rounded bg-arcana-surface border border-arcana-border/60">
<span class="block text-[9px] text-slate-400">SAG</span>
<span class="font-bold text-xs text-slate-200">10</span>
<span class="text-[9px] text-slate-400">+0</span>
</div>
<!-- CHA -->
<div class="p-1 rounded bg-amber-950/30 border border-arcana-gold/50 shadow-sm">
<span class="block text-[9px] text-arcana-gold font-bold">CHA</span>
<span class="font-bold text-xs text-arcana-goldLight">16</span>
<span class="text-[9px] text-amber-300 font-black">+3</span>
</div>
</div>
</footer>
<!-- END: QuickAttributeBar -->
<div class="absolute inset-0 z-30 flex flex-col justify-end bg-black/80 backdrop-blur-sm transition-all duration-300" data-purpose="origin-feats-modal-overlay" id="origin-feats-modal"><div class="w-full bg-[#0d121f] border-t-2 border-arcana-gold/80 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.9)] max-h-[88%] flex flex-col overflow-hidden relative"><div class="flex justify-center pt-2.5 pb-1"><div class="w-10 h-1 bg-slate-600/80 rounded-full"></div></div><div class="px-4 pt-1 pb-2 border-b border-arcana-border/60 flex items-start justify-between"><div class="flex-1 pr-2"><div class="flex items-center space-x-1.5 mb-1"><span class="text-[9px] uppercase font-tactical font-black px-1.5 py-0.5 rounded bg-amber-950/70 text-arcana-gold border border-arcana-gold/50 tracking-wider">RÈGLES SRD 2024</span><span class="text-[9px] uppercase font-tactical font-black px-1.5 py-0.5 rounded bg-blue-950/70 text-secondary border border-arcana-mana/40 tracking-wider">DONS D'ORIGINE</span></div><h2 class="font-cinzel text-sm font-black text-arcana-goldLight tracking-wide leading-tight">Référence des Dons d'Origine (2024)</h2><p class="text-[10px] text-slate-400 font-tactical">Dons d'Historique de Niveau 1 (Aucun prérequis)</p></div><button class="w-7 h-7 rounded-lg bg-arcana-surface border border-arcana-border/80 flex items-center justify-center text-slate-400 hover:text-white hover:border-arcana-gold btn-tactile" onclick="document.getElementById('origin-feats-modal').remove()" title="Fermer"><i class="fa-solid fa-xmark text-xs"></i></button></div><div class="px-4 py-2 bg-arcana-obsidian/60 border-b border-arcana-border/40"><div class="relative flex items-center"><i class="fa-solid fa-magnifying-glass absolute left-2.5 text-slate-500 text-xs pointer-events-none"></i><input class="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-arcana-surface border border-arcana-border/60 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-arcana-gold font-sans" placeholder="Rechercher un don d'origine..." type="text"/></div><div class="flex items-center space-x-1.5 mt-2 overflow-x-auto pb-1 text-[10px] font-tactical custom-scroll"><span class="px-2.5 py-0.5 rounded-full bg-arcana-gold text-black font-black whitespace-nowrap cursor-pointer">Tous (10)</span><span class="px-2.5 py-0.5 rounded-full bg-arcana-surface border border-arcana-border text-slate-300 hover:border-arcana-gold whitespace-nowrap cursor-pointer">Combat</span><span class="px-2.5 py-0.5 rounded-full bg-arcana-surface border border-arcana-border text-slate-300 hover:border-arcana-gold whitespace-nowrap cursor-pointer">Magie &amp; Sorts</span><span class="px-2.5 py-0.5 rounded-full bg-arcana-surface border border-arcana-border text-slate-300 hover:border-arcana-gold whitespace-nowrap cursor-pointer">Défense &amp; Survie</span><span class="px-2.5 py-0.5 rounded-full bg-arcana-surface border border-arcana-border text-slate-300 hover:border-arcana-gold whitespace-nowrap cursor-pointer">Utilité</span></div></div><div class="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll"><div class="space-y-1.5"><div class="flex items-center justify-between text-[11px] font-tactical text-slate-400"><span class="uppercase tracking-wider font-bold">Catalogue des dons disponibles</span><span class="text-arcana-gold font-bold">Compatible: Historique Artiste</span></div><div class="grid grid-cols-2 gap-2 text-left"><div class="p-2 rounded-lg bg-amber-950/40 border-2 border-arcana-gold shadow-sm flex flex-col justify-between cursor-pointer"><div class="flex items-start justify-between"><span class="font-cinzel text-xs font-bold text-arcana-goldLight">Vigilant (Alert)</span><i class="fa-solid fa-circle-check text-arcana-gold text-xs"></i></div><span class="text-[9px] text-amber-300/90 font-tactical mt-0.5">Criminel, Garde, Marin</span></div><div class="p-2 rounded-lg bg-arcana-surface/90 border border-emerald-500/50 flex flex-col justify-between cursor-pointer hover:border-arcana-gold"><div class="flex items-start justify-between"><span class="font-cinzel text-xs font-bold text-slate-200">Musicien</span><span class="text-[8px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 px-1 rounded font-tactical">Artiste ✨</span></div><span class="text-[9px] text-slate-400 font-tactical mt-0.5">Inspiration héroïque</span></div><div class="p-2 rounded-lg bg-arcana-surface/90 border border-arcana-border flex flex-col justify-between cursor-pointer hover:border-arcana-gold"><div class="flex items-start justify-between"><span class="font-cinzel text-xs font-bold text-slate-200">Initié à la Magie</span><i class="fa-solid fa-wand-magic-sparkles text-arcana-mana text-[10px]"></i></div><span class="text-[9px] text-slate-400 font-tactical mt-0.5">Acolyte, Guide, Érudit</span></div><div class="p-2 rounded-lg bg-arcana-surface/90 border border-arcana-border flex flex-col justify-between cursor-pointer hover:border-arcana-gold"><div class="flex items-start justify-between"><span class="font-cinzel text-xs font-bold text-slate-200">Robuste (Tough)</span><i class="fa-solid fa-heart text-rose-400 text-[10px]"></i></div><span class="text-[9px] text-slate-400 font-tactical mt-0.5">Fermier, Soldat</span></div></div></div><div class="p-3 rounded-xl bg-gradient-to-b from-arcana-panel via-[#131b2c] to-arcana-obsidian border-2 border-arcana-gold/70 shadow-lg space-y-2"><div class="flex items-start justify-between border-b border-arcana-gold/30 pb-2"><div><div class="flex items-center space-x-1.5 mb-0.5"><h3 class="font-cinzel text-sm font-black text-arcana-goldLight">Vigilant</h3><span class="text-xs text-slate-400 italic font-sans">(Alert - 2024)</span></div><div class="flex items-center space-x-1 text-[9px] font-tactical"><span class="px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/40 uppercase font-bold">Combat</span><span class="px-1.5 py-0.5 rounded bg-arcana-surface text-slate-300 border border-arcana-border">Don d'Origine</span><span class="px-1.5 py-0.5 rounded bg-arcana-surface text-slate-400 border border-arcana-border">Répétable : Non</span></div></div><div class="text-right"><span class="text-[9px] text-slate-400 block font-tactical uppercase">Historiques Liés</span><span class="text-[10px] text-amber-200 font-semibold">Criminel, Garde, Marin</span></div></div><div class="space-y-2 text-xs"><div class="space-y-1.5"><div class="p-2 rounded-lg bg-black/40 border border-arcana-border/60 flex items-start space-x-2"><i class="fa-solid fa-bolt text-arcana-gold text-xs mt-0.5"></i><div><h4 class="font-tactical font-black text-amber-200 text-xs uppercase">Maîtrise de l'Initiative</h4><p class="text-[11px] text-slate-300 leading-snug">Ajoutez votre bonus de maîtrise (<span class="text-arcana-gold font-bold">+2</span> au niveau 2) aux jets d'initiative. Votre initiative totale passe à <span class="text-emerald-400 font-bold">+4</span> (Dex +2 + BM +2).</p></div></div><div class="p-2 rounded-lg bg-black/40 border border-arcana-border/60 flex items-start space-x-2"><i class="fa-solid fa-arrows-rotate text-arcana-mana text-xs mt-0.5"></i><div><h4 class="font-tactical font-black text-cyan-200 text-xs uppercase">Échange d'Initiative</h4><p class="text-[11px] text-slate-300 leading-snug">Dès que vous lancez l'initiative, vous pouvez échanger votre score avec un allié volontaire dans le même combat.</p></div></div><div class="p-2 rounded-lg bg-black/40 border border-arcana-border/60 flex items-start space-x-2"><i class="fa-solid fa-eye text-emerald-400 text-xs mt-0.5"></i><div><h4 class="font-tactical font-black text-emerald-300 text-xs uppercase">Jamais Pris au Dépourvu</h4><p class="text-[11px] text-slate-300 leading-snug">Vous ne pouvez pas être surpris tant que vous êtes conscient.</p></div></div></div><div class="p-2 rounded-lg bg-amber-950/30 border border-arcana-gold/40 text-[10px] flex items-start space-x-2"><i class="fa-solid fa-lightbulb text-arcana-gold text-xs mt-0.5"></i><p class="text-amber-200/90 leading-tight"><strong class="font-bold text-arcana-goldLight">Conseil tactique Toto, Tata :</strong> Idéal pour un Barde Niv. 2 afin de placer vos inspirations bardiques et vos sorts de contrôle avant les créatures ennemies.</p></div></div></div></div><div class="p-3 bg-arcana-surface border-t border-arcana-gold/40 flex items-center space-x-2"><button class="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-arcana-gold via-amber-400 to-arcana-goldDark text-black font-tactical font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md btn-tactile hover:brightness-110"><i class="fa-solid fa-dice-d20 text-sm"></i><span>Attribuer à Toto, Tata</span></button><button class="py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-tactical font-bold text-xs uppercase tracking-wider btn-tactile hover:text-white hover:border-slate-500" onclick="document.getElementById('origin-feats-modal').remove()">Fermer</button></div></div></div></main>
<!-- END: Mobile Device Frame Container -->
<!-- BEGIN: Logic & Interactivity Scripts -->
<script data-purpose="hp-counter-logic">
    // Interactive HP Bubble handlers faithfully matching sketch functionality
    let currentHP = 9;
    const maxHP = 9;
    const hpDisplay = document.getElementById('current-hp');
    const minusBtn = document.getElementById('hp-minus-btn');
    const plusBtn = document.getElementById('hp-plus-btn');

    minusBtn.addEventListener('click', () => {
      if (currentHP > 0) {
        currentHP--;
        updateHPDisplay();
      }
    });

    plusBtn.addEventListener('click', () => {
      currentHP++;
      updateHPDisplay();
    });

    function updateHPDisplay() {
      hpDisplay.textContent = currentHP;
      if (currentHP <= 3) {
        hpDisplay.className = 'text-base font-black font-tactical text-rose-500 animate-pulse leading-none';
      } else if (currentHP > maxHP) {
        hpDisplay.className = 'text-base font-black font-tactical text-cyan-300 leading-none';
      } else {
        hpDisplay.className = 'text-base font-black font-tactical text-emerald-400 leading-none';
      }
    }
  </script>
<script data-purpose="category-switching-and-dice-roller">
    // 5-way tactical deck content store
    const categoryContent = {
      actions: {
        title: "Actions de Combat",
        html: `
          <!-- Rapière -->
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-arcana-gold">
                <i class="fa-solid fa-khanda text-sm"></i>
              </div>
              <div>
                <h3 class="text-xs font-bold text-slate-100 font-cinzel">Rapière d'artiste</h3>
                <p class="text-[11px] text-slate-400 font-tactical">Attaque CàC • Finesse</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="simulateRoll('Rapière (Attaque)', '1d20+4')" class="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-arcana-panel to-slate-800 border border-arcana-gold/50 text-arcana-goldLight font-tactical font-black text-xs btn-tactile">
                +4 <span class="text-[10px] font-normal text-slate-300">Toucher</span>
              </button>
              <button onclick="simulateRoll('Rapière (Dégâts)', '1d8+2 Perforant')" class="px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-tactical font-bold text-xs btn-tactile">
                1d8+2
              </button>
            </div>
          </div>
          <!-- Moquerie Cruelle -->
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-lg bg-purple-950/40 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <i class="fa-solid fa-masks-theater text-sm"></i>
              </div>
              <div>
                <h3 class="text-xs font-bold text-slate-100 font-cinzel">Moquerie cruelle</h3>
                <p class="text-[11px] text-slate-400 font-tactical">Tour de magie • Portée 18m</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-[10px] font-tactical text-amber-300 bg-amber-950/40 px-2 py-1 rounded border border-amber-600/30">JS SAG 13</span>
              <button onclick="simulateRoll('Moquerie Cruelle', '1d4 Psychique')" class="px-2 py-1.5 rounded-lg bg-purple-900/60 border border-purple-500/50 text-purple-200 font-tactical font-bold text-xs btn-tactile">
                1d4 Psy
              </button>
            </div>
          </div>
          <!-- Inspiration -->
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border hover:border-arcana-gold/60 transition-all flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-lg bg-cyan-950/40 border border-arcana-mana/40 flex items-center justify-center text-arcana-mana">
                <i class="fa-solid fa-music text-sm"></i>
              </div>
              <div>
                <h3 class="text-xs font-bold text-slate-100 font-cinzel">Inspiration bardique</h3>
                <p class="text-[11px] text-slate-400 font-tactical">Action bonus • Dé d6</p>
              </div>
            </div>
            <div class="flex items-center space-x-1.5">
              <div class="flex space-x-1">
                <span class="w-2.5 h-2.5 rounded-full bg-arcana-mana"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-arcana-mana"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-arcana-mana"></span>
              </div>
              <button onclick="simulateRoll('Inspiration Bardique', '1d6')" class="ml-2 px-2 py-1 rounded bg-slate-800 border border-arcana-mana text-arcana-mana font-tactical font-bold text-xs btn-tactile">
                d6
              </button>
            </div>
          </div>
        `
      },
      traits: {
        title: "Traits & Dons de Barde",
        html: `
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border space-y-1">
            <div class="flex justify-between items-center">
              <span class="font-cinzel text-xs font-bold text-arcana-gold">Touche-à-tout (Jack of All Trades)</span>
              <span class="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-tactical">Niv.2 Passif</span>
            </div>
            <p class="text-xs text-slate-400 leading-tight">Vous ajoutez la moitié de votre bonus de maîtrise (+1) à tout test de caractéristique qui n'en bénéficie pas déjà.</p>
          </div>
          <div class="p-2.5 rounded-xl bg-arcana-surface/90 border border-arcana-border space-y-1">
            <div class="flex justify-between items-center">
              <span class="font-cinzel text-xs font-bold text-arcana-gold">Chant de repos (Song of Rest)</span>
              <span class="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-tactical">1d6 Suppl.</span>
            </div>
            <p class="text-xs text-slate-400 leading-tight">Aide les alliés à récupérer leurs forces durant un repos court (+1d6 PV soignés).</p>
          </div>
        `
      },
      inventory: {
        title: "Sacoche & Équipement",
        html: `
          <div class="grid grid-cols-2 gap-2">
            <div class="p-2 rounded-lg bg-arcana-surface border border-arcana-border flex items-center space-x-2">
              <i class="fa-solid fa-guitar text-arcana-gold text-sm"></i>
              <div>
                <p class="text-xs font-bold text-slate-200">Luth ouvragé</p>
                <p class="text-[10px] text-slate-400 font-tactical">Instrument fétiche</p>
              </div>
            </div>
            <div class="p-2 rounded-lg bg-arcana-surface border border-arcana-border flex items-center space-x-2">
              <i class="fa-solid fa-shield text-slate-400 text-sm"></i>
              <div>
                <p class="text-xs font-bold text-slate-200">Armure de cuir</p>
                <p class="text-[10px] text-slate-400 font-tactical">CA 11 (+2 Dex)</p>
              </div>
            </div>
            <div class="p-2 rounded-lg bg-arcana-surface border border-arcana-border flex items-center space-x-2 col-span-2 justify-between">
              <span class="text-xs text-slate-300"><i class="fa-solid fa-coins text-amber-400 mr-1.5"></i>Bourse d'aventurier:</span>
              <span class="font-tactical font-black text-amber-300 text-sm">24 PO • 15 PA</span>
            </div>
          </div>
        `
      },
      spells: {
        title: "Grimoire de Sorts (Emplacements 2/2)",
        html: `
          <div class="p-2 rounded-xl bg-arcana-surface/90 border border-arcana-border flex justify-between items-center">
            <div>
              <h4 class="text-xs font-cinzel font-bold text-cyan-200">Murmures dissonants</h4>
              <p class="text-[10px] text-slate-400 font-tactical">Niv.1 • 3d6 Psychique + Fuite</p>
            </div>
            <button onclick="simulateRoll('Sort: Murmures Dissonants', '3d6 Psychique')" class="px-2 py-1 rounded bg-cyan-950 border border-arcana-mana text-cyan-300 font-tactical text-xs font-bold btn-tactile">Lancer (Niv 1)</button>
          </div>
          <div class="p-2 rounded-xl bg-arcana-surface/90 border border-arcana-border flex justify-between items-center">
            <div>
              <h4 class="text-xs font-cinzel font-bold text-cyan-200">Mot de guérison</h4>
              <p class="text-[10px] text-slate-400 font-tactical">Niv.1 • Action bonus • Soin 1d4+3</p>
            </div>
            <button onclick="simulateRoll('Sort: Mot de Guérison', '1d4+3 PV')" class="px-2 py-1 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-tactical text-xs font-bold btn-tactile">Soigner</button>
          </div>
        `
      },
      skills: {
        title: "Compétences Maîtrisées",
        html: `
          <div class="grid grid-cols-2 gap-1.5 text-xs font-tactical">
            <div class="p-1.5 rounded bg-arcana-surface border border-arcana-gold/40 flex justify-between">
              <span class="text-amber-200 font-semibold"><i class="fa-solid fa-star text-[9px] text-arcana-gold mr-1"></i>Représentation</span>
              <span class="font-black text-white">+5</span>
            </div>
            <div class="p-1.5 rounded bg-arcana-surface border border-arcana-gold/40 flex justify-between">
              <span class="text-amber-200 font-semibold"><i class="fa-solid fa-star text-[9px] text-arcana-gold mr-1"></i>Persuasion</span>
              <span class="font-black text-white">+5</span>
            </div>
            <div class="p-1.5 rounded bg-arcana-surface border border-arcana-border flex justify-between">
              <span class="text-slate-300">Acrobaties</span>
              <span class="font-bold text-slate-200">+4</span>
            </div>
            <div class="p-1.5 rounded bg-arcana-surface border border-arcana-border flex justify-between">
              <span class="text-slate-300">Tromperie</span>
              <span class="font-bold text-slate-200">+5</span>
            </div>
          </div>
        `
      }
    };

    function switchCategory(key) {
      const selected = categoryContent[key];
      if (!selected) return;

      document.getElementById('view-title').textContent = selected.title;
      document.getElementById('content-deck').innerHTML = selected.html;

      // Highlight active central hub styling
      const buttons = ['traits', 'inventory', 'actions', 'spells', 'skills'];
      buttons.forEach(b => {
        const el = document.getElementById(`tab-${b}`);
        if (!el) return;
        if (b === key) {
          el.classList.add('ring-2', 'ring-arcana-gold');
        } else {
          el.classList.remove('ring-2', 'ring-arcana-gold');
        }
      });
    }

    function simulateRoll(name, diceNotation) {
      const banner = document.getElementById('dice-result');
      // Simple RNG simulation
      let randomVal = Math.floor(Math.random() * 20) + 1;
      banner.innerHTML = `<span class="text-white font-bold">${name}:</span> <span class="text-emerald-400 font-black">${randomVal}</span> <span class="text-[10px] text-slate-400">(${diceNotation})</span>`;
    }
  </script>
<!-- END: Logic & Interactivity Scripts -->
</body></html>

<!-- Arcana 5e - A-Z Lexicon & Rules Glossary Directory -->
<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        "colors": {
          "error": "#ffb4ab",
          "secondary": "#7bd0ff",
          "surface-bright": "#353944",
          "primary-fixed-dim": "#e9c349",
          "surface-dim": "#0f131d",
          "on-error": "#690005",
          "surface-container-highest": "#313540",
          "outline-variant": "#4d4635",
          "primary": "#f2ca50",
          "tertiary-container": "#a5adff",
          "outline": "#99907c",
          "on-error-container": "#ffdad6",
          "inverse-surface": "#dfe2f0",
          "surface-container-low": "#171b26",
          "primary-fixed": "#ffe088",
          "surface-tint": "#e9c349",
          "secondary-fixed-dim": "#7bd0ff",
          "on-tertiary-fixed-variant": "#2f3aa3",
          "primary-container": "#d4af37",
          "background": "#0f131d",
          "on-secondary-fixed-variant": "#004c69",
          "on-tertiary": "#131e8c",
          "on-primary-fixed-variant": "#574500",
          "inverse-primary": "#735c00",
          "on-surface-variant": "#d0c5af",
          "inverse-on-surface": "#2c303b",
          "on-primary-container": "#554300",
          "error-container": "#93000a",
          "surface-container-high": "#262a34",
          "surface": "#0f131d",
          "on-surface": "#dfe2f0",
          "secondary-fixed": "#c4e7ff",
          "surface-variant": "#313540",
          "tertiary-fixed": "#e0e0ff",
          "on-tertiary-container": "#2d38a1",
          "tertiary-fixed-dim": "#bdc2ff",
          "on-secondary-fixed": "#001e2c",
          "surface-container": "#1b1f2a",
          "secondary-container": "#00a6e0",
          "on-secondary": "#00354a",
          "on-primary": "#3c2f00",
          "on-background": "#dfe2f0",
          "on-tertiary-fixed": "#000767",
          "on-secondary-container": "#00374d",
          "on-primary-fixed": "#241a00",
          "tertiary": "#c7cbff",
          "surface-container-lowest": "#0a0e18"
        },
        "borderRadius": {
          "DEFAULT": "0.125rem",
          "lg": "0.25rem",
          "xl": "0.5rem",
          "full": "0.75rem"
        },
        "spacing": {
          "margin": "2rem",
          "gutter": "1.5rem",
          "space-sm": "0.5rem",
          "space-xs": "0.25rem",
          "space-lg": "1.5rem",
          "gutter-mobile": "0.75rem",
          "space-xl": "2.5rem",
          "space-md": "1rem",
          "margin-mobile": "1rem"
        },
        "fontFamily": {
          "body-sm": [
            "Plus Jakarta Sans"
          ],
          "headline-lg": [
            "Playfair Display"
          ],
          "label-caps": [
            "Plus Jakarta Sans"
          ],
          "body-lg": [
            "Plus Jakarta Sans"
          ],
          "display-lg": [
            "Playfair Display"
          ],
          "stat-modifier": [
            "JetBrains Mono"
          ],
          "headline-md": [
            "Playfair Display"
          ],
          "formula-sm": [
            "JetBrains Mono"
          ],
          "stat-numeric": [
            "JetBrains Mono"
          ],
          "headline-lg-mobile": [
            "Playfair Display"
          ],
          "display-lg-mobile": [
            "Playfair Display"
          ],
          "body-md": [
            "Plus Jakarta Sans"
          ],
          "headline-sm": [
            "Playfair Display"
          ]
        },
        "fontSize": {
          "body-sm": [
            "12px",
            {
              "lineHeight": "16px",
              "letterSpacing": "0.02em",
              "fontWeight": "400"
            }
          ],
          "headline-lg": [
            "32px",
            {
              "lineHeight": "40px",
              "letterSpacing": "0em",
              "fontWeight": "600"
            }
          ],
          "label-caps": [
            "11px",
            {
              "lineHeight": "14px",
              "letterSpacing": "0.08em",
              "fontWeight": "700"
            }
          ],
          "body-lg": [
            "16px",
            {
              "lineHeight": "24px",
              "letterSpacing": "0em",
              "fontWeight": "400"
            }
          ],
          "display-lg": [
            "40px",
            {
              "lineHeight": "48px",
              "letterSpacing": "-0.01em",
              "fontWeight": "700"
            }
          ],
          "stat-modifier": [
            "16px",
            {
              "lineHeight": "20px",
              "letterSpacing": "0em",
              "fontWeight": "600"
            }
          ],
          "headline-md": [
            "22px",
            {
              "lineHeight": "28px",
              "letterSpacing": "0.01em",
              "fontWeight": "600"
            }
          ],
          "formula-sm": [
            "11px",
            {
              "lineHeight": "14px",
              "letterSpacing": "0.02em",
              "fontWeight": "500"
            }
          ],
          "stat-numeric": [
            "24px",
            {
              "lineHeight": "28px",
              "letterSpacing": "-0.02em",
              "fontWeight": "700"
            }
          ],
          "headline-lg-mobile": [
            "24px",
            {
              "lineHeight": "32px",
              "letterSpacing": "0em",
              "fontWeight": "600"
            }
          ],
          "display-lg-mobile": [
            "30px",
            {
              "lineHeight": "36px",
              "letterSpacing": "-0.01em",
              "fontWeight": "700"
            }
          ],
          "body-md": [
            "14px",
            {
              "lineHeight": "20px",
              "letterSpacing": "0.01em",
              "fontWeight": "400"
            }
          ],
          "headline-sm": [
            "18px",
            {
              "lineHeight": "24px",
              "letterSpacing": "0.02em",
              "fontWeight": "600"
            }
          ]
        }
      },
    },
  }</script></head><body class="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container"><aside class="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="flex flex-col"><div class="h-16 px-space-lg flex items-center gap-space-sm bg-surface-container-lowest"><span class="material-symbols-outlined text-primary text-[26px]">auto_stories</span><div class="flex flex-col"><span class="font-headline-sm text-headline-sm text-primary tracking-wide leading-none">ARCANA 5E</span><span class="font-label-caps text-label-caps text-outline uppercase tracking-widest mt-1">Grimoire &amp; Codex</span></div></div><div class="px-space-md py-space-sm"><div class="font-label-caps text-label-caps uppercase text-outline px-space-sm mb-space-xs tracking-wider">Compendium Codex</div><nav class="flex flex-col gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg shadow-sm"><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="character-sheet" href="#"><span class="material-symbols-outlined text-[20px]">badge</span><span class="font-body-md text-body-md">Character Sheet</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="spell-grimoire" href="#"><span class="material-symbols-outlined text-[20px]">menu_book</span><span class="font-body-md text-body-md">Spell Grimoire</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="combat-tracker" href="#"><span class="material-symbols-outlined text-[20px]">swords</span><span class="font-body-md text-body-md">Combat Tracker</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="bestiary-codex-monstrorum" href="#"><span class="material-symbols-outlined text-[20px]">pets</span><span class="font-body-md text-body-md">Bestiary &amp; Codex</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="2024-compendium" href="#"><span class="material-symbols-outlined text-[20px]">local_library</span><span class="font-body-md text-body-md">2024 Compendium</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="rules-a-z-lexicon" href="#"><span class="material-symbols-outlined text-[20px]">spellcheck</span><span class="font-body-md text-body-md">Rules &amp; A-Z Lexicon</span></a><a class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="campaign-chronicle" href="#"><span class="material-symbols-outlined text-[20px]">history_edu</span><span class="font-body-md text-body-md">Campaign Chronicle</span></a></nav></div></div><div class="p-space-md bg-surface-container-low"><div class="flex items-center justify-between p-space-sm rounded-lg bg-surface-container"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-secondary text-[20px]">bolt</span><div><div class="font-label-caps text-label-caps uppercase text-outline">System Rulebook</div><div class="font-formula-sm text-formula-sm text-secondary">5e Revision 2024</div></div></div><span class="material-symbols-outlined text-outline text-[18px]">verified</span></div></div></aside><div class="pl-72"><header class="fixed top-0 left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg"><div class="flex items-center gap-space-md w-96"><div class="flex items-center w-full px-space-md py-space-xs bg-surface-container-low rounded-lg text-on-surface-variant shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"><span class="material-symbols-outlined text-outline mr-space-xs text-[18px]">search</span><span class="font-body-sm text-body-sm text-outline flex-1">Search spells, traits, rules...</span><kbd class="font-formula-sm text-formula-sm px-space-xs py-0.5 rounded bg-surface-container text-outline">Ctrl K</kbd></div></div><div class="flex items-center gap-space-md"><button class="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-high text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm" type="button"><span class="material-symbols-outlined text-[18px]">casino</span><span class="font-stat-modifier text-stat-modifier uppercase">d20 Tray</span></button><button class="p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button"><span class="material-symbols-outlined text-[20px]">notifications</span></button><div class="flex items-center gap-space-sm pl-space-sm"><div class="flex flex-col text-right"><span class="font-label-caps text-label-caps text-primary">Dungeon Master</span><span class="font-formula-sm text-formula-sm text-outline">Tier IV Archmage</span></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="relative pt-16 w-full px-space-lg bg-surface"><div class="flex flex-col w-full">
<!-- Arcane Ambient Aura Backdrop -->
<div class="relative w-full pb-space-xl">
<!-- TOP HEADER & COMPENDIUM CONTROLS -->
<div class="flex flex-col gap-space-md mb-space-lg">
<!-- Title & Revision Badges -->
<div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div class="flex flex-col">
<div class="flex items-center gap-space-sm mb-1">
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase">System Lexicon • 5th Edition</span>
<span class="w-1 h-1 rounded-full bg-outline"></span>
<span class="inline-flex items-center gap-1 px-space-xs py-0.5 rounded bg-primary-container/20 text-primary font-formula-sm text-formula-sm">
<span class="material-symbols-outlined text-[14px]">verified</span>
              SRD 5.24 Verified
            </span>
<span class="inline-flex items-center px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-formula-sm text-formula-sm">
              2024 Revision &amp; Core Engine
            </span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Master Rules Lexicon &amp; A–Z Glossary
          </h1>
</div>
<!-- Quick Toggles -->
<div class="flex items-center gap-space-xs self-start md:self-auto bg-surface-container-lowest p-1 rounded-xl shadow-sm">
<button class="flex items-center gap-1.5 px-space-sm py-1 rounded-lg text-primary bg-surface-container font-label-caps text-label-caps transition-colors" id="toggle-tips" type="button">
<span class="material-symbols-outlined text-[15px]">school</span>
            Beginner Tips
          </button>
<button class="flex items-center gap-1.5 px-space-sm py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors" id="toggle-compact" type="button">
<span class="material-symbols-outlined text-[15px]">view_agenda</span>
            Compact
          </button>
<button class="flex items-center gap-1.5 px-space-sm py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors" id="toggle-bookmarks" type="button">
<span class="material-symbols-outlined text-[15px]">bookmark</span>
            Bookmarked (4)
          </button>
</div>
</div>
<!-- Search & Filters Container -->
<div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
<!-- Search Matrix -->
<div class="flex flex-col lg:flex-row items-center gap-space-md justify-between">
<div class="relative w-full lg:max-w-2xl flex items-center bg-surface-container rounded-lg px-space-md py-2 shadow-inner">
<span class="material-symbols-outlined text-outline mr-space-sm text-[20px]">search</span>
<input class="w-full bg-transparent border-0 outline-none text-on-surface placeholder:text-outline font-body-md text-body-md focus:ring-0" placeholder="Search over 240+ official terms, rules, conditions, actions, or mechanics..." type="text"/>
<div class="flex items-center gap-1 pl-space-sm">
<kbd class="font-formula-sm text-formula-sm px-1.5 py-0.5 rounded bg-surface-container-high text-outline">Ctrl+K</kbd>
<kbd class="font-formula-sm text-formula-sm px-1.5 py-0.5 rounded bg-surface-container-high text-outline">/</kbd>
</div>
</div>
<div class="flex items-center justify-between w-full lg:w-auto gap-space-lg text-on-surface-variant font-formula-sm text-formula-sm">
<div class="flex items-center gap-2">
<span class="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span>Showing <strong class="text-primary font-stat-modifier text-stat-modifier">148</strong> terms</span>
</div>
<span class="text-outline">Catalog Index: A to Z</span>
</div>
</div>
<!-- Category Quick-Filters -->
<div class="flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none text-nowrap">
<button class="px-space-md py-1 rounded-lg bg-primary text-on-primary font-label-caps text-label-caps shadow-sm">
            All (248)
          </button>
<button class="px-space-md py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-caps text-label-caps transition-colors">
            Combat &amp; Action Economy
          </button>
<button class="px-space-md py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-caps text-label-caps transition-colors">
            Spellcasting &amp; Magic
          </button>
<button class="px-space-md py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-caps text-label-caps transition-colors">
            Conditions &amp; Afflictions
          </button>
<button class="px-space-md py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-caps text-label-caps transition-colors">
            Core Mechanics &amp; Ability Checks
          </button>
<button class="px-space-md py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-caps text-label-caps transition-colors">
            Equipment &amp; Items
          </button>
<button class="px-space-md py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-caps text-label-caps transition-colors">
            Character Origins &amp; Feats
          </button>
</div>
</div>
<!-- Sticky Alphanumeric Ribbon Bar -->
<div class="sticky top-16 z-30 bg-surface-container-low/95 backdrop-blur-md rounded-xl p-space-xs shadow-md">
<div class="flex items-center justify-between overflow-x-auto text-center font-formula-sm text-formula-sm scrollbar-none">
<a class="px-2 py-1 rounded text-outline hover:text-on-surface transition-colors" href="#letter-hash">#</a>
<a class="px-2.5 py-1 rounded bg-primary text-on-primary font-bold shadow-sm" href="#letter-A">A <span class="text-[10px] opacity-75">18</span></a>
<a class="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-B">B <span class="text-[10px] text-outline">12</span></a>
<a class="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-C">C <span class="text-[10px] text-outline">24</span></a>
<a class="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-D">D <span class="text-[10px] text-outline">15</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-E">E <span class="text-[10px] text-outline">9</span></a>
<a class="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-F">F <span class="text-[10px] text-outline">8</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-G">G <span class="text-[10px] text-outline">7</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-H">H <span class="text-[10px] text-outline">11</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-I">I <span class="text-[10px] text-outline">10</span></a>
<a class="px-2 py-1 rounded text-outline/40 cursor-default" href="#letter-J">J</a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-K">K <span class="text-[10px] text-outline">3</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-L">L <span class="text-[10px] text-outline">6</span></a>
<a class="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-M">M <span class="text-[10px] text-outline">14</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-N">N <span class="text-[10px] text-outline">4</span></a>
<a class="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-O">O <span class="text-[10px] text-outline">8</span></a>
<a class="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-P">P <span class="text-[10px] text-outline">17</span></a>
<a class="px-2 py-1 rounded text-outline/40 cursor-default" href="#letter-Q">Q</a>
<a class="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-R">R <span class="text-[10px] text-outline">13</span></a>
<a class="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-S">S <span class="text-[10px] text-outline">21</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-T">T <span class="text-[10px] text-outline">9</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-U">U <span class="text-[10px] text-outline">5</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-V">V <span class="text-[10px] text-outline">4</span></a>
<a class="px-2.5 py-1 rounded text-outline hover:bg-surface-container hover:text-on-surface transition-colors" href="#letter-W">W <span class="text-[10px] text-outline">6</span></a>
<a class="px-2 py-1 rounded text-outline/40 cursor-default" href="#letter-X">X</a>
<a class="px-2 py-1 rounded text-outline/40 cursor-default" href="#letter-Y">Y</a>
<a class="px-2 py-1 rounded text-outline/40 cursor-default" href="#letter-Z">Z</a>
</div>
</div>
</div>
<!-- DUAL-PANEL DIRECTORY LAYOUT -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
<!-- MAIN / LEFT PANEL (A-Z CATALOG) -->
<div class="xl:col-span-7 flex flex-col gap-space-xl">
<!-- SECTION 'A' -->
<section class="flex flex-col gap-space-md scroll-mt-28" id="letter-A">
<div class="flex items-center gap-space-sm">
<span class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center font-headline-md text-headline-md text-primary font-bold shadow-sm">
              A
            </span>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm text-on-surface">Alpha Section</span>
<span class="font-formula-sm text-formula-sm text-outline">18 indexed rules &amp; mechanics</span>
</div>
<div class="flex-1 h-px bg-surface-container-highest ml-space-sm"></div>
</div>
<div class="flex flex-col gap-space-sm">
<!-- Term: Action Economy -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Action Economy
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">Action, Bonus Action, Reaction</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Combat &amp; Turn Budget</span>
<span class="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-caps text-label-caps">SRD 2024 Core</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    On your turn in initiative order, you are granted one Action, movement up to your Speed, and potentially one Bonus Action. In addition, you have one Reaction per round triggerable outside your turn.
                  </p>
</div>
<button class="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
</div>
<!-- Term: Advantage & Disadvantage -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Advantage &amp; Disadvantage
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">d20 Rule Engine</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Core Mechanics</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    Roll two d20s instead of one. Take the higher roll for Advantage, or the lower roll for Disadvantage. Regardless of how many sources grant either, they do not stack, and a single instance of each cancels both out completely.
                  </p>
</div>
<button class="p-1 rounded text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">bookmark</span>
</button>
</div>
</div>
<!-- Term: Armor Class (AC) [ACTIVE / SELECTED] -->
<div class="p-space-md rounded-xl bg-surface-container shadow-md relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
<div class="flex items-start justify-between gap-space-sm pl-2">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<div class="w-2 h-2 rounded-full bg-primary animate-ping"></div>
<h3 class="font-headline-sm text-headline-sm text-primary">
                      Armor Class (AC)
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-formula-sm text-formula-sm">Inspecting</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps">Combat &amp; Defense</span>
<span class="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-caps text-label-caps">Core Target Number</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface">
                    A target numerical threshold representing defensive capability. Calculated via armor wear, Dexterity modifier, shield equipment, or unarmored traits. An attack hits if its total meets or exceeds AC.
                  </p>
</div>
<button class="p-1 rounded text-primary bg-surface-container-high">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">bookmark</span>
</button>
</div>
</div>
<!-- Term: Attunement -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Attunement
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-outline font-formula-sm text-formula-sm">Limit: 3 Items</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Magic Items</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Short Rest</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    Some magic items require a creature to form an intuitive bond before their properties can be utilized. Bonding requires a Short Rest. A creature can be attuned to no more than three items simultaneously.
                  </p>
</div>
<button class="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
</div>
</div>
</section>
<!-- SECTION 'B' -->
<section class="flex flex-col gap-space-md scroll-mt-28" id="letter-B">
<div class="flex items-center gap-space-sm">
<span class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center font-headline-md text-headline-md text-primary font-bold shadow-sm">
              B
            </span>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm text-on-surface">Beta Section</span>
<span class="font-formula-sm text-formula-sm text-outline">12 indexed rules</span>
</div>
<div class="flex-1 h-px bg-surface-container-highest ml-space-sm"></div>
</div>
<div class="flex flex-col gap-space-sm">
<!-- Term: Bonus Action -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Bonus Action
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">Phase Timing</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Action Economy</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    An additional action that takes a fraction of a second. You can take only one Bonus Action on your turn. You can take a Bonus Action only when a feature or spell specifically specifies it.
                  </p>
</div>
<button class="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
</div>
<!-- Term: Blindsight -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Blindsight
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-outline font-formula-sm text-formula-sm">Special Sense</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Vision &amp; Awareness</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    A creature with Blindsight can perceive its surroundings within a specific radius without relying on sight, piercing total darkness, invisibility, or obscurement automatically.
                  </p>
</div>
<button class="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
</div>
</div>
</section>
<!-- SECTION 'C' -->
<section class="flex flex-col gap-space-md scroll-mt-28" id="letter-C">
<div class="flex items-center gap-space-sm">
<span class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center font-headline-md text-headline-md text-primary font-bold shadow-sm">
              C
            </span>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm text-on-surface">Gamma Section</span>
<span class="font-formula-sm text-formula-sm text-outline">24 indexed rules &amp; conditions</span>
</div>
<div class="flex-1 h-px bg-surface-container-highest ml-space-sm"></div>
</div>
<div class="flex flex-col gap-space-sm">
<!-- Term: Concentration -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Concentration
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary font-formula-sm text-formula-sm">CON Save: DC 10 / Half Dmg</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Spellcasting</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">State Tracker</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    Certain spells require concentration to maintain their effects. Casting another concentration spell immediately ends the previous one. Taking damage triggers a Constitution saving throw (DC 10 or half the damage taken, whichever is higher).
                  </p>
</div>
<button class="p-1 rounded text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">bookmark</span>
</button>
</div>
</div>
<!-- Term: Cover -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Cover (Half, Three-Quarters, Total)
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">+2 / +5 AC &amp; DEX Saves</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Tactical Combat</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    Obstacles provide protective defense: Half cover grants a +2 bonus to AC and Dexterity saves; Three-quarters cover grants a +5 bonus; Total cover prevents targeting by direct attacks and spells.
                  </p>
</div>
<button class="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
</div>
<!-- Nested Conditions Deck Preview -->
<div class="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm shadow-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">warning</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Conditions Directory (2024 Revised)</h3>
</div>
<span class="font-formula-sm text-formula-sm text-outline">13 Standard Conditions</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
                Conditions alter capabilities in specific ways. They apply until counteracted or their duration expires:
              </p>
<div class="flex flex-wrap gap-1.5 pt-1">
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-caps text-label-caps cursor-pointer">Blinded</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-caps text-label-caps cursor-pointer">Charmed</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-caps text-label-caps cursor-pointer">Frightened</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-caps text-label-caps cursor-pointer">Grappled</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-error font-label-caps text-label-caps cursor-pointer">Incapacitated</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-caps text-label-caps cursor-pointer">Invisible</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-error font-label-caps text-label-caps cursor-pointer">Paralyzed</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-caps text-label-caps cursor-pointer">Petrified</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-caps text-label-caps cursor-pointer">Poisoned</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-caps text-label-caps cursor-pointer">Prone</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-caps text-label-caps cursor-pointer">Restrained</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-error font-label-caps text-label-caps cursor-pointer">Stunned</span>
<span class="px-2 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-error font-label-caps text-label-caps cursor-pointer">Unconscious</span>
</div>
</div>
</div>
</section>
<!-- SECTION 'D' -->
<section class="flex flex-col gap-space-md scroll-mt-28" id="letter-D">
<div class="flex items-center gap-space-sm">
<span class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center font-headline-md text-headline-md text-primary font-bold shadow-sm">
              D
            </span>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm text-on-surface">Delta Section</span>
<span class="font-formula-sm text-formula-sm text-outline">15 indexed mechanics</span>
</div>
<div class="flex-1 h-px bg-surface-container-highest ml-space-sm"></div>
</div>
<div class="flex flex-col gap-space-sm">
<!-- Term: Difficulty Class -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Difficulty Class (DC)
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-formula-sm text-formula-sm">Target Difficulty Benchmark</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Core Mechanics</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Check / Save Target</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-2">
                    The target score required to succeed on an ability check or saving throw. Standard 5e DC scale ranges from 5 to 30:
                  </p>
<div class="grid grid-cols-3 sm:grid-cols-6 gap-1 text-center font-formula-sm text-formula-sm">
<div class="bg-surface-container p-1 rounded"><span class="text-outline block text-[10px]">V. Easy</span><strong class="text-on-surface">DC 5</strong></div>
<div class="bg-surface-container p-1 rounded"><span class="text-outline block text-[10px]">Easy</span><strong class="text-on-surface">DC 10</strong></div>
<div class="bg-surface-container p-1 rounded"><span class="text-outline block text-[10px]">Medium</span><strong class="text-primary">DC 15</strong></div>
<div class="bg-surface-container p-1 rounded"><span class="text-outline block text-[10px]">Hard</span><strong class="text-on-surface">DC 20</strong></div>
<div class="bg-surface-container p-1 rounded"><span class="text-outline block text-[10px]">V. Hard</span><strong class="text-on-surface">DC 25</strong></div>
<div class="bg-surface-container p-1 rounded"><span class="text-outline block text-[10px]">Epic</span><strong class="text-secondary">DC 30</strong></div>
</div>
</div>
</div>
</div>
<!-- Term: Death Saving Throws -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Death Saving Throws
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-error font-formula-sm text-formula-sm">0 HP Incapacitated</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Combat &amp; Survival</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
                    Unmodified d20 roll when starting turn at 0 HP. Roll 10+ is success; 9 or lower is failure. 3 successes stabilize; 3 failures result in character death. A Natural 20 instantly restores 1 HP and consciousness; a Natural 1 counts as two failures.
                  </p>
</div>
<button class="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
</div>
</div>
</section>
<!-- SECTION 'S' -->
<section class="flex flex-col gap-space-md scroll-mt-28" id="letter-S">
<div class="flex items-center gap-space-sm">
<span class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center font-headline-md text-headline-md text-primary font-bold shadow-sm">
              S
            </span>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm text-on-surface">Sigma Section</span>
<span class="font-formula-sm text-formula-sm text-outline">21 indexed rules</span>
</div>
<div class="flex-1 h-px bg-surface-container-highest ml-space-sm"></div>
</div>
<div class="flex flex-col gap-space-sm">
<!-- Term: Surprised Condition (2024 Revision highlight) -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Surprised Condition (2024 Revision)
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-formula-sm text-formula-sm">Major Revision</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Initiative Rules</span>
<span class="px-2 py-0.5 rounded bg-secondary-container/20 text-secondary font-label-caps text-label-caps">SRD 5.24 Updated</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
                    In the 2024 Revision, surprised creatures no longer skip their entire first turn. Instead, if you are surprised when combat begins, you make your initiative roll with Disadvantage. You still act on your initiative count normally.
                  </p>
</div>
<button class="p-1 rounded text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">bookmark</span>
</button>
</div>
</div>
<!-- Term: Saving Throw -->
<div class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm group">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Saving Throw
                    </h3>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-outline font-formula-sm text-formula-sm">d20 + Ability + Prof</span>
</div>
<div class="flex flex-wrap gap-1.5 mb-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">Defensive Mechanics</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
                    An instant response to avoid an imminent threat or spell effect. Roll a d20 and add the relevant Ability Modifier plus Proficiency Bonus if proficient in that specific save.
                  </p>
</div>
<button class="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
</div>
</div>
</section>
</div>
<!-- RIGHT PANEL (DEEP TERM INSPECTOR DRAWER / DETAIL DOCK) -->
<div class="xl:col-span-5 sticky top-28 flex flex-col gap-space-md">
<!-- Inspector Card Outer -->
<div class="bg-surface-container-low rounded-xl p-space-lg shadow-xl flex flex-col gap-space-lg">
<!-- Term Header -->
<div class="flex flex-col gap-space-sm">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary shadow-inner">
<span class="material-symbols-outlined text-[28px]">shield</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-1.5">
<span class="font-label-caps text-label-caps uppercase text-outline">Active Inspection</span>
<span class="w-1 h-1 rounded-full bg-outline"></span>
<span class="font-formula-sm text-formula-sm text-primary">SRD 5.24</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Armor Class (AC)</h2>
</div>
</div>
<!-- Top Actions -->
<div class="flex items-center gap-1">
<button class="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary transition-colors" title="Bookmark Term" type="button">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">bookmark</span>
</button>
<button class="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Share Rule Link" type="button">
<span class="material-symbols-outlined text-[18px]">share</span>
</button>
</div>
</div>
<!-- Badges -->
<div class="flex flex-wrap gap-1.5">
<span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps">Combat Defense</span>
<span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps">Foundational Rule</span>
<span class="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-caps text-label-caps">Core d20 Target</span>
</div>
</div>
<!-- Section: In Simple Terms -->
<div class="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-xs shadow-sm">
<div class="flex items-center gap-1.5 text-primary">
<span class="material-symbols-outlined text-[16px]">school</span>
<span class="font-label-caps text-label-caps uppercase tracking-wider">In Simple Terms</span>
</div>
<p class="font-body-md text-body-md text-on-surface leading-relaxed">
              Armor Class represents how difficult it is for an opponent to land a harmful physical blow in combat. It combines armor thickness, shield deflection, natural scales, and agile dodging into a single benchmark target.
            </p>
</div>
<!-- Section: The Core Formula & Resolution -->
<div class="flex flex-col gap-space-sm">
<span class="font-label-caps text-label-caps uppercase text-outline tracking-wider">The Core Resolution Formula</span>
<div class="bg-surface-container-lowest p-space-md rounded-xl flex flex-col gap-space-sm shadow-inner">
<div class="flex items-center justify-between font-formula-sm text-formula-sm pb-space-xs">
<span class="text-on-surface-variant">Attack Roll Engine</span>
<span class="text-secondary font-stat-modifier text-stat-modifier">d20 + Attack Bonus ≥ Target AC</span>
</div>
<!-- Visual Sandbox -->
<div class="flex items-center justify-around p-space-sm bg-surface-container rounded-lg text-center">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-outline uppercase">Incoming Roll</span>
<span class="font-stat-numeric text-stat-numeric text-on-surface">17</span>
<span class="font-formula-sm text-formula-sm text-outline">(d20: 11 + 6)</span>
</div>
<div class="text-primary font-headline-md text-headline-md">≥</div>
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-outline uppercase">Target AC</span>
<span class="font-stat-numeric text-stat-numeric text-primary">16</span>
<span class="font-formula-sm text-formula-sm text-outline">(Breastplate + DEX)</span>
</div>
<div class="text-outline font-headline-md text-headline-md">=</div>
<div class="flex flex-col items-center">
<span class="font-label-caps text-label-caps text-outline uppercase">Outcome</span>
<span class="px-2 py-0.5 rounded bg-primary text-on-primary font-label-caps text-label-caps mt-1">HIT</span>
</div>
</div>
<!-- Rule Note -->
<div class="flex items-center gap-2 pt-1 text-on-surface-variant font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[16px] text-primary">check_circle</span>
<span><strong>“Meets it, beats it”</strong> — If the total attack roll equals or surpasses AC, the attack lands.</span>
</div>
</div>
</div>
<!-- Section: Armor Categories Breakdown (2024) -->
<div class="flex flex-col gap-space-sm">
<span class="font-label-caps text-label-caps uppercase text-outline tracking-wider">2024 Armor Categories Breakdown</span>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
<div class="p-space-sm bg-surface-container rounded-lg flex flex-col">
<div class="flex justify-between items-center mb-1">
<strong class="text-on-surface font-body-md text-body-md">Light Armor</strong>
<span class="font-formula-sm text-formula-sm text-secondary">Base + Full DEX</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Studded Leather (12 + DEX). Max mobility, no stealth handicap.</span>
</div>
<div class="p-space-sm bg-surface-container rounded-lg flex flex-col">
<div class="flex justify-between items-center mb-1">
<strong class="text-on-surface font-body-md text-body-md">Medium Armor</strong>
<span class="font-formula-sm text-formula-sm text-secondary">Base + DEX (max 2)</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Breastplate (14 + max 2 DEX). Balanced resilience.</span>
</div>
<div class="p-space-sm bg-surface-container rounded-lg flex flex-col">
<div class="flex justify-between items-center mb-1">
<strong class="text-on-surface font-body-md text-body-md">Heavy Armor</strong>
<span class="font-formula-sm text-formula-sm text-secondary">Flat Base AC</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Plate (18 AC flat). Ignores DEX completely; requires STR 15.</span>
</div>
<div class="p-space-sm bg-surface-container rounded-lg flex flex-col">
<div class="flex justify-between items-center mb-1">
<strong class="text-on-surface font-body-md text-body-md">Shields &amp; Perks</strong>
<span class="font-formula-sm text-formula-sm text-primary">+2 AC Flat</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Wielding a shield adds +2 AC to any existing armor setup.</span>
</div>
</div>
<!-- Class Unarmored Callout -->
<div class="p-space-sm bg-surface-container-highest/60 rounded-lg flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span class="text-on-surface font-medium">Unarmored Defense:</span>
<span class="font-formula-sm text-formula-sm">Barbarian: 10 + DEX + CON | Monk: 10 + DEX + WIS</span>
</div>
</div>
<!-- Section: Common Beginner Pitfalls & Traps -->
<div class="p-space-md rounded-xl bg-surface-container-highest/40 flex items-start gap-space-sm shadow-sm">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">report_problem</span>
<div class="flex flex-col gap-1">
<strong class="text-primary font-headline-sm text-headline-sm leading-tight">Common Beginner Pitfall</strong>
<p class="font-body-sm text-body-sm text-on-surface leading-relaxed">
<strong>AC is NOT Damage Reduction!</strong> Having a high Armor Class does not decrease the damage of a blow when struck. If a blow hits your AC 18 with an 18, all rolled damage is dealt unless you possess Damage Resistance.
              </p>
</div>
</div>
<!-- Section: Cross-Referenced Lexicon Terms -->
<div class="flex flex-col gap-space-sm pt-space-xs">
<span class="font-label-caps text-label-caps uppercase text-outline tracking-wider">Cross-Referenced Rules &amp; Terms</span>
<div class="flex flex-wrap gap-1.5">
<button class="px-2.5 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-secondary font-label-caps text-label-caps transition-colors flex items-center gap-1">
<span>Advantage</span>
<span class="material-symbols-outlined text-[12px]">open_in_new</span>
</button>
<button class="px-2.5 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-secondary font-label-caps text-label-caps transition-colors flex items-center gap-1">
<span>Attack Roll</span>
<span class="material-symbols-outlined text-[12px]">open_in_new</span>
</button>
<button class="px-2.5 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-secondary font-label-caps text-label-caps transition-colors flex items-center gap-1">
<span>Critical Hit</span>
<span class="material-symbols-outlined text-[12px]">open_in_new</span>
</button>
<button class="px-2.5 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-secondary font-label-caps text-label-caps transition-colors flex items-center gap-1">
<span>Damage Resistance</span>
<span class="material-symbols-outlined text-[12px]">open_in_new</span>
</button>
<button class="px-2.5 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-secondary font-label-caps text-label-caps transition-colors flex items-center gap-1">
<span>Shield Spell</span>
<span class="material-symbols-outlined text-[12px]">open_in_new</span>
</button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<script>
  // Simple interactive UI micro-handlers
  document.addEventListener('DOMContentLoaded', () => {
    // Quick search keyboard trigger
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
    });

    // Toggle button active states
    const toggleTips = document.getElementById('toggle-tips');
    if (toggleTips) {
      toggleTips.addEventListener('click', () => {
        toggleTips.classList.toggle('bg-primary');
        toggleTips.classList.toggle('text-on-primary');
        toggleTips.classList.toggle('bg-surface-container');
        toggleTips.classList.toggle('text-primary');
      });
    }
  });
</script></main></div></body></html>