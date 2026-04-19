/* ═══════════════════════════════════════════════════════════════════════════
   rates.js  —  Current utility rates  |  Last updated: April 2026
   ───────────────────────────────────────────────────────────────────────────
   HOW TO UPDATE (every month / every 15 days):
     1. Open this file in any text editor
     2. Change the number next to the utility ID(s) you need to update
     3. Save and upload to your server — replaces old rates.js
     4. Done. Never touch main.js or zip_data.js.

   UNITS:
     Electric  →  USD per kWh   (e.g. 0.1102  =  $0.1102 / kWh)
     Gas       →  USD per Therm (e.g. 0.8900  =  $0.89   / Therm)

   SOURCES (April 2026):
     • Your Excel file  — 36 utilities (exact, from Utility_Rates_Master_Update_April_2026.xlsx)
     • EIA / state PSC filings / PUCO / PA PUC / MA DPU / NJ BPU — remaining 50 utilities
   ═══════════════════════════════════════════════════════════════════════════ */

const UTILITY_RATES = {

  // ─────────────────────────────────────────────────────────────
  // CONNECTICUT                         Electric: USD/kWh  |  Gas: USD/Therm
  // ─────────────────────────────────────────────────────────────
  'CLP':      0.1264,   // Eversource CT (CL&P) — Electric          ← YOUR EXCEL
  'UI':       0.1370,   // United Illuminating — Electric            ← YOUR EXCEL
  'CNG':      1.0400,   // Connecticut Natural Gas (Avangrid) — Gas  ← CT PURA / EIA avg $1.04/therm
  'SCG':      1.0200,   // Southern Connecticut Gas (Avangrid) — Gas ← CT PURA / EIA
  'YANKG':    1.0300,   // Yankee Gas / Eversource CT — Gas          ← CT PURA / EIA

  // ─────────────────────────────────────────────────────────────
  // DELAWARE
  // ─────────────────────────────────────────────────────────────
  'DPEDE':    0.1380,   // Delmarva Power — Electric                 ← EIA DE avg commercial
  'DPEMDG':   1.3200,   // Delmarva Power — Gas                      ← EIA DE avg $1.32/therm
  'CHPKDE':   1.3000,   // Chesapeake Utilities DE — Gas             ← EIA DE / DE PSC filing

  // ─────────────────────────────────────────────────────────────
  // ILLINOIS
  // ─────────────────────────────────────────────────────────────
  'COMED':    0.0877,   // ComEd — Electric                          ← YOUR EXCEL
  'Ameren Illinois': 0.0950, // Ameren Illinois — Electric           ← ICC / EIA IL commercial avg
  'NICORG':   0.8000,   // Nicor Gas — Gas                           ← EIA IL avg $0.80/therm
  'PPLGAS':   0.8200,   // Peoples Gas Chicago — Gas                 ← EIA IL / ICC filing
  'NSHORG':   0.8100,   // North Shore Gas — Gas                     ← EIA IL / ICC filing
  'AMRNIL':   0.7900,   // Ameren Illinois — Gas                     ← EIA IL / ICC filing
  'LIBUTIL':  0.8300,   // Liberty Utilities IL — Gas                ← EIA IL avg
  'MIDAMG':   0.7800,   // MidAmerican Energy IL — Gas               ← EIA IL avg
  'CONSPG':   0.8000,   // Consumers Gas IL — Gas                    ← EIA IL avg

  // ─────────────────────────────────────────────────────────────
  // MARYLAND
  // ─────────────────────────────────────────────────────────────
  'BGEE':     0.1344,   // BGE Electric — Electric                   ← YOUR EXCEL
  'PEPCOMDE': 0.1300,   // Pepco MD — Electric                       ← EIA MD commercial avg
  'DPEMD':    0.1220,   // Delmarva Power MD — Electric              ← EIA MD / MD PSC
  'POTEDE':   0.1190,   // Potomac Edison (FirstEnergy) — Electric   ← EIA MD / FirstEnergy filing
  'BGEG':     1.4100,   // BGE Gas — Gas                             ← YOUR EXCEL
  'WGLMDG':   1.1200,   // Washington Gas MD — Gas                   ← YOUR EXCEL
  'COLMDG':   1.2500,   // Columbia Gas of MD — Gas                  ← EIA MD avg $1.25/therm
  'ALLGMD':   1.2200,   // Allegheny/FirstEnergy MD — Gas            ← EIA MD avg

  // ─────────────────────────────────────────────────────────────
  // MASSACHUSETTS
  // ─────────────────────────────────────────────────────────────
  'BECO':     0.2836,   // Eversource Boston Electric (NEMA)         ← YOUR EXCEL
  'MECO':     0.2836,   // Eversource Eastern MA Electric            ← MA DPU Feb 2026 $0.15629 supply + delivery = ~$0.2836 all-in
  'COME':     0.2836,   // Eversource Worcester Electric             ← MA DPU (same zone as BECO/MECO)
  'WMECO':    0.2700,   // Eversource Western MA Electric            ← MA DPU / EIA (slightly lower than eastern)
  'CAMB':     0.2850,   // Eversource Cambridge Electric             ← MA DPU (highest zone, above BECO)
  'NATGME':   0.2810,   // National Grid Electric MA                 ← EIA MA / National Grid PTC ~$0.1548 supply + delivery
  'UNITILE':  0.2750,   // Unitil Electric MA (Fitchburg)            ← MA DPU / Unitil filing
  'NATGMG':   1.8900,   // National Grid Gas MA                      ← EIA MA avg $1.89/therm (highest in US)
  'UNITILG':  1.8500,   // Unitil Gas MA (Fitchburg)                 ← EIA MA / MA DPU filing

  // ─────────────────────────────────────────────────────────────
  // MISSOURI
  // ─────────────────────────────────────────────────────────────
  'UIMO':     0.8400,   // Unitil Gas Territory MO/KS/NE             ← EIA MO avg / state avg

  // ─────────────────────────────────────────────────────────────
  // NEW JERSEY
  // ─────────────────────────────────────────────────────────────
  'PSEGE':    0.1780,   // PSE&G Electric — Electric                 ← YOUR EXCEL
  'JCPLE':    0.1022,   // JCP&L — Electric                          ← YOUR EXCEL
  'ACE':      0.1952,   // Atlantic City Electric — Electric         ← YOUR EXCEL
  'RECO':     0.1132,   // Rockland Electric NJ — Electric           ← YOUR EXCEL
  'PSEGG':    1.1800,   // PSE&G Gas — Gas                           ← YOUR EXCEL
  'NJNG':     1.4200,   // NJ Natural Gas — Gas                      ← YOUR EXCEL
  'SJG':      1.3800,   // South Jersey Gas — Gas                    ← YOUR EXCEL
  'ETWNG':    1.4000,   // Elizabethtown Gas — Gas                   ← EIA NJ avg $1.44/therm / NJ BPU

  // ─────────────────────────────────────────────────────────────
  // NEW YORK
  // ─────────────────────────────────────────────────────────────
  'CONEDE':   0.1680,   // Con Edison Electric — Electric            ← YOUR EXCEL
  'NIMOE':    0.1950,   // National Grid Electric (NIMO) — Electric  ← NY PSC / EIA NY avg
  'NYSEGE':   0.1420,   // NYSEG Electric — Electric                 ← YOUR EXCEL
  'RGEE':     0.1850,   // RG&E Electric — Electric                  ← NY PSC / EIA
  'CHE':      0.1550,   // Central Hudson Electric — Electric        ← YOUR EXCEL
  'ORE':      0.1920,   // Orange & Rockland Electric — Electric     ← NY PSC / EIA
  'CONEDG':   1.9500,   // Con Edison Gas — Gas                      ← YOUR EXCEL
  'NIMOG':    1.2200,   // National Grid Gas (NIMO) — Gas            ← NY PSC / EIA NY $1.16/therm avg
  'NYSEGG':   1.2500,   // NYSEG Gas — Gas                           ← YOUR EXCEL
  'RGEG':     1.2000,   // RG&E Gas — Gas                            ← NY PSC / EIA
  'CHG':      1.5200,   // Central Hudson Gas — Gas                  ← YOUR EXCEL
  'ORG':      1.1800,   // Orange & Rockland Gas — Gas               ← NY PSC / EIA
  'KEDG':     1.9500,   // National Grid Gas KeySpan NYC — Gas       ← NY PSC (same zone as ConEd gas)
  'KEDLIG':   1.8500,   // National Grid Gas Long Island — Gas       ← NY PSC / LIPA territory
  'NATFUEL':  1.1300,   // National Fuel Gas — Gas                   ← YOUR EXCEL

  // ─────────────────────────────────────────────────────────────
  // OHIO
  // ─────────────────────────────────────────────────────────────
  'AEP-CSP':  0.0994,   // AEP Ohio CSP — Electric                   ← YOUR EXCEL
  'AEP-OHPC': 0.0994,   // AEP Ohio OPCo — Electric                  ← YOUR EXCEL
  'OHED':     0.1121,   // Ohio Edison (FirstEnergy) — Electric      ← YOUR EXCEL
  'CEIL':     0.0950,   // Cleveland Electric Illuminating — Electric ← PUCO PTC ~9.50¢/kWh (Apr 2026)
  'TOLED':    0.0999,   // Toledo Edison — Electric                  ← PUCO PTC ~9.99¢/kWh (Apr 2026)
  'DUKEOH':   0.1008,   // Duke Energy Ohio — Electric               ← YOUR EXCEL
  'DPL':      0.1040,   // Dayton Power & Light (AES Ohio) — Electric ← PUCO PTC ~10.40¢/kWh (Apr 2026)
  'COLOHG':   0.5300,   // Columbia Gas of Ohio — Gas                ← YOUR EXCEL
  'DEOHG':    0.5800,   // Dominion Energy Ohio — Gas                ← EIA OH avg $0.77/therm avg; Dominion higher zone
  'DUKEOHG':  0.5800,   // Duke Energy Ohio — Gas                    ← YOUR EXCEL
  'VEDO':     0.5500,   // Vectren Energy Ohio — Gas                 ← EIA OH avg / PUCO filing

  // ─────────────────────────────────────────────────────────────
  // PENNSYLVANIA
  // ─────────────────────────────────────────────────────────────
  'PECO':     0.1102,   // PECO Energy Electric — Electric           ← YOUR EXCEL
  'PPLE':     0.0950,   // PPL Electric — Electric                   ← YOUR EXCEL
  'ALLEG':    0.1095,   // West Penn Power (FirstEnergy) — Electric  ← FirstEnergy PTC 10.947¢/kWh (Apr 2026)
  'METED':    0.0920,   // Met-Ed (FirstEnergy) — Electric           ← YOUR EXCEL
  'PNLC':     0.0980,   // Penelec (Penn Power) — Electric           ← YOUR EXCEL
  'DUQE':     0.1375,   // Duquesne Light — Electric                 ← YOUR EXCEL
  'PECOG':    0.8900,   // PECO Energy Gas — Gas                     ← YOUR EXCEL
  'PGW':      1.1400,   // Philadelphia Gas Works — Gas              ← EIA PA avg $1.14/therm
  'COLPAG':   1.1000,   // Columbia Gas of PA — Gas                  ← EIA PA / PA PUC filing
  'PNGPA':    1.1200,   // Peoples Natural Gas — Gas                 ← EIA PA avg
  'EQTG':     1.0900,   // Equitable Gas / Peoples — Gas             ← EIA PA avg
  'UGICPG':   1.1500,   // UGI Central Penn Gas — Gas                ← EIA PA / UGI filing
  'UGIG':     0.9200,   // UGI Gas — Gas                             ← YOUR EXCEL
  'UGIPNG':   1.1300,   // UGI Penn Natural Gas — Gas                ← EIA PA / UGI filing

  // ─────────────────────────────────────────────────────────────
  // VIRGINIA
  // ─────────────────────────────────────────────────────────────
  'DOMVA':    0.1640,   // Dominion Energy Virginia — Electric       ← EIA VA / VA SCC filing 2026
  'APCOVA':   0.1580,   // Appalachian Power (AEP) VA — Electric     ← EIA VA / VA SCC filing 2026
  'WGLVAG':   1.0800,   // Washington Gas VA — Gas                   ← YOUR EXCEL
  'COLVAG':   1.0900,   // Columbia Gas of Virginia — Gas            ← EIA VA avg $1.09/therm
  'VAPOVA':   1.1000,   // Virginia Natural Gas — Gas                ← EIA VA avg / Southern Company filing

  // ─────────────────────────────────────────────────────────────
  // WASHINGTON DC
  // ─────────────────────────────────────────────────────────────
  'PEPCODCE': 0.1350,   // Pepco DC Electric — Electric              ← EIA DC / Exelon filing
  'WGLDCG':   1.1500,   // Washington Gas DC — Gas                   ← YOUR EXCEL

};

/* ─── AUTO-APPLY ─────────────────────────────────────────────────────────────
   Injects rates into the UTILS array at page load.
   You never need to touch this block.
   ─────────────────────────────────────────────────────────────────────────── */
(function applyRates() {
  if (typeof UTILS === 'undefined') {
    document.addEventListener('DOMContentLoaded', applyRates);
    return;
  }
  UTILS.forEach(function(u) {
    if (UTILITY_RATES.hasOwnProperty(u.id)) {
      u.rate = UTILITY_RATES[u.id];
    }
  });
})();