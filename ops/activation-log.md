# PrenotaDesk — activation log

Mission: **finance-3a-controlled-activation**  
Reference: `finance_phase_3a_safety_plan_*.md` **not found** in repo at run time.  
Frozen: `localStorage` key `prenotadesk_finance_movements_v1` (unchanged).

---

## 2026-05-11 — Chunks **A + B** (selectors + `useFinanceSummary`)

| Field                        | Value                                                                                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Files changed**            | `features/finance/selectors.ts`, `features/finance/hooks/use-finance-summary.ts`, `features/finance/index.ts`                                                                                                      |
| **QA performed**             | Playwright MCP: viewport **1440×900** — open **Dashboard**, **Finanze** (KPI “Totale entrate” visible), **Prenotazioni**; viewport **390×844** — mobile home boot, **Preno** tab; no freeze / render loop observed |
| **Console**                  | `browser_console_messages` level `error`: **0** (session slice)                                                                                                                                                    |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS**                                                                                                                                     |
| **Classification**           | **working** (selectors + hook); product Finanze still **partial** until C+E merged                                                                                                                                 |
| **Commit**                   | `6e7b3c0`                                                                                                                                                                                                          |

---

## 2026-05-11 — Chunks **C + E** (Finanze wire + honest copy)

| Field                        | Value                                                                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Files changed**            | `components/finanze/finanze-section.tsx`                                                                                                              |
| **QA performed**             | Same Playwright smoke as A+B after wiring (desktop + mobile); Finanze KPIs driven from `useFinanceSummary` / selectors                                |
| **Console**                  | No critical runtime/hydration errors in sampled checks                                                                                                |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS**                                                                        |
| **Classification**           | **partial** (Finanze list/filters still local to section; dashboard panel Chunk D **not** in scope)                                                   |
| **Commit**                   | `feat(finance): wire Finanze to summary hook and log 3A (C+E)` — verify with `git log -1 --oneline` (avoid embedding short hash; it changes on amend) |

---

## 2026-05-11 — Mission **M2 Phase 3 Settings** (branch `phase3/settings`)

| Field                        | Value                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scope**                    | Settings UI activation lane: Base/Avanzate + `preferenze` toggles via `updateSettingsPreferences` only; no `AppSettings` / domain extension; no `app-store` edits                                                                                                                                                                                                                                                |
| **Files changed**            | `components/settings/settings-section.tsx`, `lib/mock/settings.ts`, `features/settings/selectors.ts`, `features/settings/hooks/use-settings-section-display.ts`, `features/settings/index.ts`                                                                                                                                                                                                                    |
| **QA performed**             | Playwright MCP: **1440×900** — sidebar **Impostazioni**; toggle **Base** / **Avanzate**; **Preferenze app** toggles; `localStorage` key `prenotadesk_app_store_v1` — `settingsArea` and `preferenze["suggerimenti-rapidi"]` persisted after full page reload; **390×844** — **Altro** → **Impostazioni**; **Base** / **Avanzate** visible; expanded **Piani e abbonamento** — copy **Dati dimostrativi** present |
| **Console**                  | `browser_console_messages` level `error`: **0** (session slice)                                                                                                                                                                                                                                                                                                                                                  |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS**                                                                                                                                                                                                                                                                                                                                   |
| **Classification**           | **partial** — most rows remain static/mock; **Preferenze app** has two real toggles (`suggerimenti-rapidi`, `conferme-azioni-sensibili`); subscription/plan KPIs explicitly labeled demonstrative; plan selection still disabled                                                                                                                                                                                 |
| **Commit**                   | Single commit on `phase3/settings`; verify with `git log -1 --oneline` (hash changes if amended)                                                                                                                                                                                                                                                                                                                 |

---

## 2026-05-11 — Mission **M3 Phase 3 Reports** (branch `phase3/reports`)

| Field                        | Value                                                                                                                                                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scope**                    | Reports lane: read-only local summaries (app store bookings/payments + `useFinanceSummary`); demo KPI cards labeled **Dimostrativo**; honest empty / partial-empty copy; no shell, no `app-store` edits, no finance store internals                                 |
| **Files changed**            | `features/reports/selectors.ts`, `features/reports/hooks/use-reports-local-snapshot.ts`, `features/reports/index.ts`, `components/report/report-section.tsx`, `lib/mock/report.ts`, `ops/activation-log.md`                                                         |
| **QA performed**             | Playwright MCP: **1440×900** — **Dashboard** → **Report** (see “Riepilogo da dati locali”, `prenotadesk_finance_movements_v1`, badges **Dimostrativo**) → **Finanze** → **Report** again; **390×844** — **Altro** → **Report**, layout readable; no freeze observed |
| **Console**                  | `browser_console_messages` level `error`: **0**                                                                                                                                                                                                                     |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS**                                                                                                                                                                                      |
| **Classification**           | **partial** — real wired: booking counts, payment row count, finance totals/movement count from public finance summary; **fake**: three trend/performance cards explicitly **Dimostrativo** + mock copy                                                             |
| **Commit**                   | `feat(reports): make reports data-honest and activation-ready` — verify with `git log -1 --oneline`                                                                                                                                                                 |

---

## 2026-05-11 — Mission **M4 Phase 3 Integration** (branch `phase3/integration`)

| Field                             | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Git topology**                  | No remote branch `phase3/finance`; finance lane is already on `main` (`6e7b3c0`, `7c77504`). `phase3/reports` is **linear** after `phase3/settings` (`5839074` → `95687e2`). **Single merge** of `phase3/reports` into `phase3/integration` from `main` (settings-before-reports satisfied inside the reports branch stack).                                                                                                                                                                                                      |
| **Merge commits**                 | `f59e599` — `chore(integration): M4 merge phase3/reports (includes phase3/settings)` (merge commit onto `main` at `7c77504`).                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Conflict handling**             | None (`ops/activation-log.md` merged cleanly).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Protected paths**               | No edits to shell, navigation, mobile cockpit, section-registry, `app-store.ts`, `types/domain.ts`, `lib/actions/index.ts`.                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Persistence**                   | Frozen key `prenotadesk_finance_movements_v1` unchanged (verified in Report copy and Finanze KPI `title`).                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **QA performed (Playwright MCP)** | **1440×900** — Dashboard; **Report** (“Riepilogo da dati locali”, `prenotadesk_finance_movements_v1`, **Dimostrativo** cards); **Finanze** (“Totale entrate”, KPI from local movements); **Impostazioni** (Base / Avanzate); **Prenotazioni** (cross-section). **390×844** — fresh load; **Altro** → **Report** (same honest copy); **Altro** → **Impostazioni** (Base / Avanzate). Mid-session Next.js dev-indicator overlay briefly blocked bottom-nav clicks; closed via Dev Tools close + full reload; not an app regression. |
| **Console**                       | `browser_console_messages` level `error`: **0** (post-merge checks).                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **lint / build / typecheck**      | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS**                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Classification**                | **partial** (product): Finanze list/filters and dashboard finance mini-panel remain as prior lanes; Report trend cards **fake** but labeled **Dimostrativo**; Settings rows mostly static per M2 log. **Integration gate: working** (merge + compile + smoke QA green).                                                                                                                                                                                                                                                           |
| **main merge**                    | Fast-forward `main` to `phase3/integration` tip `47de607` (includes docs commit + integration merge `f59e599` + lane commits).                                                                                                                                                                                                                                                                                                                                                                                                    |

---

## 2026-05-11 — Phase 3 refinement **R1** (dashboard mini financial panel honesty)

| Field                        | Value                                                                                                                                                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scope**                    | Post-M4: wire `FinancialPanel` to `useFinanceSummary` (same source as Finanze KPIs); visible header badge for device-local / non-POS / non-sync honesty; no layout grid change; `prenotadesk_finance_movements_v1` unchanged                                        |
| **Files changed**            | `components/dashboard/dashboard-section.tsx`, `components/dashboard/financial-panel.tsx`                                                                                                                                                                            |
| **QA performed**             | Playwright MCP: **1440×900** — Dashboard (mini panel shows «Totale entrate», badge «Dati da cassa locale…»); **Finanze**, **Report**, **Impostazioni**, **Prenotazioni** nav smoke. **390×844** — **Report**; drawer **Impostazioni**; **Preno** → **Prenotazioni** |
| **Console**                  | `browser_console_messages` level `error`: **0**                                                                                                                                                                                                                     |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS**                                                                                                                                                                                      |
| **Classification**           | **partial** (product): dashboard panel KPIs now **working** (real movements); overall dashboard still mixes live and mock elsewhere per prior state                                                                                                                 |

---

## 2026-05-11 — Phase 3 refinement **R2** (Settings demo parity badges)

| Field                        | Value                                                                                                                                                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scope**                    | Visible `Badge` on every non–piani-abbonamento settings group: static/mock blocks labeled like subscription area; `preferenze-app` split copy for real toggles vs static rows; no new persisted fields                                                                    |
| **Files changed**            | `components/settings/settings-section.tsx`                                                                                                                                                                                                                                |
| **QA performed**             | Playwright MCP: **1440×900** — **Impostazioni** (Profilo azienda + Preferenze app show new badges); smoke **Finanze** → **Report** → **Prenotazioni** → **Dashboard**. **390×844** — drawer **Impostazioni**, badge «configurazione di esempio» visible in expanded group |
| **Console**                  | `browser_console_messages` level `error`: **0**                                                                                                                                                                                                                           |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS**                                                                                                                                                                                            |
| **Classification**           | **partial** — subscription block unchanged; other groups now explicitly labeled demonstrative or mixed                                                                                                                                                                    |
| **Commit**                   | `fix(settings): label static mock groups with visible demonstrative badges` — verify with `git log -1 --oneline`                                                                                                                                                          |

---

## 2026-05-11 — Phase 3 refinement **R3** (Report device-local disclaimer)

| Field                        | Value                                                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Scope**                    | One-line copy clarifying Report reads only device-local data and is not synced across browsers/users; no data logic change                                                                                   |
| **Files changed**            | `components/report/report-section.tsx`                                                                                                                                                                       |
| **QA performed**             | Playwright MCP: **1440×900** — **Report** (new paragraph visible); regression smoke **Dashboard**, **Finanze**, **Impostazioni**, **Prenotazioni**. **390×844** — **Altro** → **Report** (same line visible) |
| **Console**                  | `browser_console_messages` level `error`: **0**                                                                                                                                                              |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS**                                                                                                                               |
| **Classification**           | **partial** (unchanged product classification for Report; copy-only friction fix)                                                                                                                            |
| **Commit**                   | `fix(report): add device-local non-sync disclaimer` — verify with `git log -1 --oneline`                                                                                                                     |

---

## 2026-05-11 — Phase 4 Mobile **P4-1** (cockpit status line + badge honesty)

| Field                        | Value                                                                                                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Allowlist**                | `components/mobile/mobile-home-view.tsx`, `components/mobile/home/cockpit-status-bar.tsx`, `lib/mobile/cockpit-status-line.ts`                                                                                  |
| **Scope**                    | Replace mock `dashboardKpis` cockpit line with `useBookingRows` + `isBookingDateToday` + `useFinanceSummary`; badge **Live** → default **Locale** (optional `badgeLabel`); pure `buildCockpitStatusLine` helper |
| **Forbidden touched**        | None                                                                                                                                                                                                            |
| **QA**                       | Playwright MCP **390×844** — home shows store-derived status text + badge «Locale»; **1440×900** — desktop shell + Dashboard unchanged                                                                          |
| **Console**                  | `browser_console_messages`: **0** errors (sampled)                                                                                                                                                              |
| **lint / build / typecheck** | `npm run lint` **PASS**; `npm run build` **PASS**; `npx tsc --noEmit` **PASS**                                                                                                                                  |
| **Classification**           | **working** (cockpit strip); weather/quick actions unchanged                                                                                                                                                    |
| **Commit**                   | `no-commit` (batch with P4-2–P4-5 or user commit)                                                                                                                                                               |

---

## 2026-05-11 — Phase 4 Mobile **P4-2** (compact Operazioni hub)

| Field                        | Value                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Allowlist**                | `components/mobile/mobile-operazioni-view.tsx`, `components/mobile/mobile-app-root.tsx`                          |
| **Scope**                    | Remove `DashboardSection` embed; compact module cards + navigation to **Prenotazioni** tab or **Altro** sections |
| **Forbidden touched**        | None                                                                                                             |
| **QA**                       | Playwright **390×844** — **Ops** tab shows card grid (Prenotazioni, Finanze, …); no dashboard grid               |
| **Console**                  | No new errors in sampled session                                                                                 |
| **lint / build / typecheck** | **PASS**                                                                                                         |
| **Classification**           | **working** (navigation hub)                                                                                     |
| **Commit**                   | `no-commit`                                                                                                      |

---

## 2026-05-11 — Phase 4 Mobile **P4-3** (mobile Prenotazioni stack)

| Field                        | Value                                                                                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Allowlist**                | `components/mobile/mobile-bookings-stack.tsx`, `components/mobile/mobile-app-root.tsx`                                                          |
| **Scope**                    | Mobile **Preno** tab renders `MobileBookingsStack` (`useBookingRows`, filters, **Avanza stato**); desktop still uses registry `BookingsSection` |
| **QA**                       | **390×844** — **Preno** shows stacked cards + filters; **1440×900** — sidebar **Prenotazioni** still shows **Elenco prenotazioni** table        |
| **lint / build / typecheck** | **PASS**                                                                                                                                        |
| **Classification**           | **working** (mobile list); desktop bookings unchanged                                                                                           |
| **Commit**                   | `no-commit`                                                                                                                                     |

---

## 2026-05-11 — Phase 4 Mobile **P4-4** (Altro Finanze compact + scroll shell)

| Field                        | Value                                                                                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Allowlist**                | `components/mobile/finanze/mobile-finanze-compact.tsx`, `components/mobile/wrappers/mobile-altro-scroll-shell.tsx`, `components/mobile/mobile-app-root.tsx`                               |
| **Scope**                    | Mobile **Altro → Finanze** uses `MobileFinanzeCompact` (same movements store + dialog; card stack); other Altro modules in `MobileAltroScrollShell`; desktop **FinanzeSection** unchanged |
| **QA**                       | **390×844** — **Altro** → **Finanze** compact view; **1440×900** — sidebar **Finanze** full section (**Totale entrate**, table **Movimenti**)                                             |
| **lint / build / typecheck** | **PASS**                                                                                                                                                                                  |
| **Classification**           | **working** (mobile path); desktop finance/report/settings unchanged                                                                                                                      |
| **Commit**                   | `no-commit`                                                                                                                                                                               |

---

## 2026-05-11 — Phase 4 Mobile **P4-5** (header safe-area + touch targets)

| Field                        | Value                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Allowlist**                | `components/mobile/mobile-app-header.tsx`, `components/mobile/mobile-bottom-nav.tsx`                             |
| **Scope**                    | Header top padding adds `env(safe-area-inset-top)`; menu/back buttons **≥44px**; bottom nav items `min-h-[48px]` |
| **QA**                       | **390×844** — home boot; **1440×900** — **Report** + **Impostazioni** smoke after phase                          |
| **Console**                  | **0** errors (sampled)                                                                                           |
| **lint / build / typecheck** | **PASS**                                                                                                         |
| **Classification**           | **working** (touch / notch)                                                                                      |
| **Commit**                   | `no-commit`                                                                                                      |

---

## 2026-05-11 — Phase 4 Mobile **P4-6** (trace closure)

| Field                  | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cumulative paths**   | `lib/mobile/cockpit-status-line.ts`, `components/mobile/home/cockpit-status-bar.tsx`, `components/mobile/mobile-home-view.tsx`, `components/mobile/mobile-operazioni-view.tsx`, `components/mobile/mobile-bookings-stack.tsx`, `components/mobile/finanze/mobile-finanze-compact.tsx`, `components/mobile/wrappers/mobile-altro-scroll-shell.tsx`, `components/mobile/mobile-app-root.tsx`, `components/mobile/mobile-app-header.tsx`, `components/mobile/mobile-bottom-nav.tsx`, `ops/activation-log.md` |
| **Guardrails**         | No edits to forbidden shell/registry/store contract paths per mission brief                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Desktop regression** | Finanze / Report / Settings sections smoke-tested at **1440×900** — OK                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Commit**             | Recommend one commit after review, e.g. `feat(mobile): phase 4 cockpit, operazioni, preno stack, altro finanze, safe-area`                                                                                                                                                                                                                                                                                                                                                                                |
