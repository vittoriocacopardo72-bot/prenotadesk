# PrenotaDesk — activation log

Mission: **finance-3a-controlled-activation**  
Reference: `finance_phase_3a_safety_plan_*.md` **not found** in repo at run time.  
Frozen: `localStorage` key `prenotadesk_finance_movements_v1` (unchanged).

---

## 2026-05-11 — Chunks **A + B** (selectors + `useFinanceSummary`)

| Field | Value |
|--------|--------|
| **Files changed** | `features/finance/selectors.ts`, `features/finance/hooks/use-finance-summary.ts`, `features/finance/index.ts` |
| **QA performed** | Playwright MCP: viewport **1440×900** — open **Dashboard**, **Finanze** (KPI “Totale entrate” visible), **Prenotazioni**; viewport **390×844** — mobile home boot, **Preno** tab; no freeze / render loop observed |
| **Console** | `browser_console_messages` level `error`: **0** (session slice) |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS** |
| **Classification** | **working** (selectors + hook); product Finanze still **partial** until C+E merged |
| **Commit** | `6e7b3c0` |

---

## 2026-05-11 — Chunks **C + E** (Finanze wire + honest copy)

| Field | Value |
|--------|--------|
| **Files changed** | `components/finanze/finanze-section.tsx` |
| **QA performed** | Same Playwright smoke as A+B after wiring (desktop + mobile); Finanze KPIs driven from `useFinanceSummary` / selectors |
| **Console** | No critical runtime/hydration errors in sampled checks |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS** |
| **Classification** | **partial** (Finanze list/filters still local to section; dashboard panel Chunk D **not** in scope) |
| **Commit** | `feat(finance): wire Finanze to summary hook and log 3A (C+E)` — verify with `git log -1 --oneline` (avoid embedding short hash; it changes on amend) |

---

## 2026-05-11 — Mission **M2 Phase 3 Settings** (branch `phase3/settings`)

| Field | Value |
|--------|--------|
| **Scope** | Settings UI activation lane: Base/Avanzate + `preferenze` toggles via `updateSettingsPreferences` only; no `AppSettings` / domain extension; no `app-store` edits |
| **Files changed** | `components/settings/settings-section.tsx`, `lib/mock/settings.ts`, `features/settings/selectors.ts`, `features/settings/hooks/use-settings-section-display.ts`, `features/settings/index.ts` |
| **QA performed** | Playwright MCP: **1440×900** — sidebar **Impostazioni**; toggle **Base** / **Avanzate**; **Preferenze app** toggles; `localStorage` key `prenotadesk_app_store_v1` — `settingsArea` and `preferenze["suggerimenti-rapidi"]` persisted after full page reload; **390×844** — **Altro** → **Impostazioni**; **Base** / **Avanzate** visible; expanded **Piani e abbonamento** — copy **Dati dimostrativi** present |
| **Console** | `browser_console_messages` level `error`: **0** (session slice) |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS** |
| **Classification** | **partial** — most rows remain static/mock; **Preferenze app** has two real toggles (`suggerimenti-rapidi`, `conferme-azioni-sensibili`); subscription/plan KPIs explicitly labeled demonstrative; plan selection still disabled |
| **Commit** | Single commit on `phase3/settings`; verify with `git log -1 --oneline` (hash changes if amended) |

---

## 2026-05-11 — Mission **M3 Phase 3 Reports** (branch `phase3/reports`)

| Field | Value |
|--------|--------|
| **Scope** | Reports lane: read-only local summaries (app store bookings/payments + `useFinanceSummary`); demo KPI cards labeled **Dimostrativo**; honest empty / partial-empty copy; no shell, no `app-store` edits, no finance store internals |
| **Files changed** | `features/reports/selectors.ts`, `features/reports/hooks/use-reports-local-snapshot.ts`, `features/reports/index.ts`, `components/report/report-section.tsx`, `lib/mock/report.ts`, `ops/activation-log.md` |
| **QA performed** | Playwright MCP: **1440×900** — **Dashboard** → **Report** (see “Riepilogo da dati locali”, `prenotadesk_finance_movements_v1`, badges **Dimostrativo**) → **Finanze** → **Report** again; **390×844** — **Altro** → **Report**, layout readable; no freeze observed |
| **Console** | `browser_console_messages` level `error`: **0** |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS** |
| **Classification** | **partial** — real wired: booking counts, payment row count, finance totals/movement count from public finance summary; **fake**: three trend/performance cards explicitly **Dimostrativo** + mock copy |
| **Commit** | `feat(reports): make reports data-honest and activation-ready` — verify with `git log -1 --oneline` |
