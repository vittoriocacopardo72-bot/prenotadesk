# PrenotaDesk — Product Master Plan

> **Sourcing:** The verbatim export from ChatGPT was not present in the repository or attached to this task. This document captures the **long-term product vision**, **operational modules**, **development phases**, **technical rules**, **UX rules**, and **agent pipeline** in line with `AGENTS.md` and current product direction. When you have the official ChatGPT master plan text, paste it **below** the `---` separator at the end of this file (or replace this body after review).

---

## 1. Vision and north star

PrenotaDesk is a **real operational** booking and marine/port management workspace: not a demo, not a slide deck. Success means staff can run the day on **desktop** (full management) and **mobile** (compact cockpit) with **stable runtime**, **honest empty states**, and **actions that do real work**—first on **local persistence**, then on **Supabase** without rewriting product logic.

**Operational realism** means the product assumes messy days: overlapping requests, late guests, weather holds, last-minute berth changes, and cash movements that do not wait for perfect connectivity. The UI must degrade to **clear partial states** and **labeled unavailable actions** rather than silent failure or decorative numbers.

**Product owner:** Vittorio (final say on scope and structural changes).

**Alignment with activation:** Any surface that looks “live” must either be **activated** per `ops/activation-protocol.md` (real actions, real persistence, KPIs from state, QA, classification) or explicitly marked **not ready**. No substitute fake KPIs.

---

## 2. Operational modules (product surface)

Modules are **loosely coupled** but share a common spine: **bookings** reference **clients** and **boats**; **payments** attach to booking or operational line items; **alerts** aggregate exceptions from bookings, fleet, weather, and pontile; **report** reads aggregated facts, never raw UI state.

| Module                        | Role                                                                                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Bookings / Prenotazioni**   | Core: requests, confirmations, departures, day operations. Source of truth for “who goes when on what.”                             |
| **Clients**                   | Guest profiles, history, preferences, commercial signals. Linked to bookings and payment notes, not duplicated identity.            |
| **Boats / Fleet**             | Availability, status, maintenance, blocking. Consumed by bookings and departure views; maintenance blocks propagate as alerts.      |
| **Services**                  | Catalog and add-ons tied to trips. Priced lines roll into payments and reporting when activated.                                    |
| **Payments / Finanze**        | Cash register, movements, KPIs from real state (local then synced). Separate from “booking quote” until explicitly reconciled.      |
| **Marina / Pontile & berths** | Berth assignment, occupancy windows, transit, and pier-side operations. See §9.                                                     |
| **Crew**                      | Assignments and operational notes. Tied to departure slots and boat, not a parallel calendar silo.                                  |
| **Alerts**                    | Operational signals and follow-ups. Fed by rules and thresholds across modules; see §16.                                            |
| **Weather**                   | Marine context for go/no-go decisions. Inputs to alerts and optional hard gates on departure; see §22.                              |
| **Settings**                  | Base and advanced configuration, integrations, berth catalog parameters, fiscal placeholders.                                       |
| **Report**                    | Operational and commercial rollups **only when upstream modules supply real data**; see §14–§15, §25, and finance philosophy below. |

**Finance / reporting philosophy (cross-cutting):** Reporting is **downstream of ledger truth**. Movement-level cash data (entrate/uscite, categories) must reconcile to booking commercial state over time, not replace it overnight. Until adapters sync to Supabase, exports are **device-local truth** plus explicit “not synced” labeling when relevant.

Each module should converge on the **feature module layout** (`actions/`, `components/`, `hooks/`, `selectors.ts`, `types.ts`, `index.ts`) under `features/<name>/` as in `AGENTS.md`. **KPI and lifecycle rules live in selectors/stores/actions**, not in UI literals (`ops/activation-protocol.md`).

**Future scalability:** New harbours or agencies are modeled as **separate data tenants** in the backend phase; locally, scope stays single-tenant until Supabase multi-tenant RLS is designed. Avoid baking harbour-specific assumptions into generic types.

---

## 3. Development phases (high level)

Phases are **sequential by priority**; parallel polish only after the earlier gate is green. **Marina/pontile, berth analytics, and AI copilots** land in **Phase 7** unless they unblock booking safety (then they are scoped as the smallest booking-adjacent slice only).

1. **Runtime stability** — No crashes, no hydration traps, predictable client/server boundaries.
2. **Bookings fully operational** — Create/read/update flows, list integrity, departures aligned with product rules. **Lifecycle states** (§15) must be consistent in UI and store.
3. **Local persistence reliability** — `localStorage` / safe stores with keys, `schemaVersion`, migration fallback, and adapter boundary per `ops/activation-protocol.md`.
4. **Supabase connection** — Auth and data behind adapters; RLS-ready; no logic trapped in UI. See §21.
5. **CRUD base** — Repeatable patterns per module (list, detail, mutations, optimistic rules where needed).
6. **Mobile / desktop polish** — Compact mobile cockpit; full desktop workspace; no shell breakage. See §§19–20.
7. **Additional modules** — Crew, advanced reporting, **pontile/berth/transit**, **Meteoblue** (§22), fiscal/compliance, **AI assist** (§23), when approved. Each module enters through the activation protocol.

**Activation workflow:** Use `ops/activation-protocol.md` to turn sections from mock/partial to **activated** (real actions, real persistence, honest KPIs, Playwright QA at `390×844` and `1440×900`, lint → build → `tsc --noEmit` when available, scoped diff, classification, commit only if green).

---

## 4. Technical rules (non-negotiable)

- **One feature at a time**; small, reversible chunks (max touched files and path allowlist per activation protocol).
- **No monolithic files**; business logic **not** in UI components—selectors, stores, actions.
- **Desktop ≠ mobile UI** where product requires it; shared logic, different presentation when needed.
- **Supabase migration stays easy:** persistence and API access behind **adapters**; UI never calls `localStorage` for domain state; key naming and `schemaVersion` documented for cutover.
- **localStorage is temporary** only until backend parity; treat it as **operational cache + offline-first**, not authoritative multi-device ledger until sync exists.
- **Every visible action** should eventually map to a real effect (or be disabled / labeled not ready).
- **No global rewrites**, no unrelated file edits, no new libraries without approval.
- **Quality gates:** `npm run lint`, `npm run build`, and `tsc --noEmit` when available; browser QA for activations; **rollback before merge** if runtime or hydration regressions appear (`ops/activation-protocol.md`).

---

## 5. UX rules

- **shadcn/ui** primitives for Button, Card, Sheet, Dialog, Tabs, Input, forms—no random one-off UI unless necessary.
- **Figma** informs layout, spacing, hierarchy, and mobile/desktop flow; **Figma does not override** product logic.
- **Mobile:** compact, thumb-friendly, operational first (few taps to the job). **Cockpit philosophy** in §19.
- **Desktop:** dense, scannable tables, filters, and multi-panel workflows where appropriate. **Workspace philosophy** in §20.
- **Honest UX:** empty states and “not ready” labels beat fake data and silent no-ops.
- **Operational UX philosophy:** Prefer **one obvious next action** (e.g. “confirm”, “assign berth”, “collect balance”) over dashboards that only inform. Secondary information collapses by default on mobile.

---

## 6. Agent pipeline (roles and handoffs)

| Agent                | Responsibility                                                                                            |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Cursor**           | Product implementation: features, UI/UX within rules, wiring flows, shadcn/Figma alignment.               |
| **Codex**            | Repair: runtime, build/lint/types, hydration, imports—**no** redesign or feature expansion during bugfix. |
| **Figma**            | Reference only for structure and consistency.                                                             |
| **Human (Vittorio)** | Approves structural or large-scope changes; sets phase priorities.                                        |

**Handoff discipline:** Implementation stops for **Bugfix mode** when the app is broken—smallest fix, lint/build, no scope creep. **Documentation-only** changes (e.g. this file) do not bypass activation rules when later implementing features.

---

## 7. Metrics that matter (product, not vanity)

- Time to complete a **booking** task on mobile vs desktop.
- **Error rate** and console cleanliness on core paths.
- **Activation coverage:** share of sections classified `working` vs `partial` / `fake` / `broken`.
- **Data honesty:** KPIs backed by store vs hardcoded placeholders.
- **Pontile:** berth turnaround time, double-booking incidents, % departures with confirmed slip vs TBD (when module exists).
- **Payments:** days-to-close for “in sospeso” vs target (when defined in product).
- **Alerts:** time from signal to acknowledgment (when acknowledgment exists).

---

## 8. Risks and mitigations

| Risk                           | Mitigation                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| Mock UI lingering              | Activation protocol + classification + disable/label fake controls.                    |
| Big-bang Supabase              | Adapters, phased cutover, keep local fallback until verified.                          |
| Shell regression               | Explicit “no shell/navigation rewrite” in activations; smoke tests across sections.    |
| Berth double-booking           | Time-window constraints, pessimistic overlap checks, visible conflict state (§9).      |
| Weather mis-read as hard block | Policy: weather informs alerts; **hard stop** only when configured and explicit in UI. |
| AI suggestions taken as facts  | Boundaries in §23; suggestions never write ledger without human confirm.               |
| Meteoblue dependency           | Cache + stale indicators + offline last-known (§22).                                   |
| Multi-language scope creep     | §26: ship Italian first; i18n as structural phase, not string sweep in hot paths.      |

---

## 9. Pontile / berth occupancy logic

**Goal:** Represent **who occupies which berth (or transit/waiting zone)** for a defined time window, without pretending full port management on day one.

- **Entities (conceptual):** berth (slip), optional zone (transit, fuel dock), **assignment** linking boat or booking to berth for `[start, end)`, **status** on assignment (planned / confirmed / on-berth / departed / cancelled).
- **Occupancy rule:** Two assignments on the same berth **overlap** if their half-open intervals intersect; product must surface **conflict** in UI and block silent commit when the module is activated.
- **Partial berth:** Until Supabase, **local adapter** holds assignments; bookings reference berth id optionally. Missing berth = explicit “TBD pontile” state, not a fake slip.
- **Transit:** Boats without a slip use **transit** or **waiting** pseudo-berths to appear on the day board without corrupting slip occupancy KPIs.

---

## 10. Boat arrival / departure lifecycle

**Lifecycle (conceptual, booking-centric):** **Requested → Confirmed → Checked-in / On dock → Briefed → Departed → Returned (closed)** with cancellation and no-show branches as needed.

- **Arrival:** Ties **client + boat + services** to a concrete slot; may trigger berth assignment suggestion.
- **Departure:** Requires **seaworthy + crew + weather advisory** flags as configurable checks; violations become **alerts**, not hidden blockers, until policy is on.
- **Return / close:** Releases berth window, triggers payment reconciliation prompts when commercial rules exist.

This lifecycle must stay **consistent** between mobile cockpit summaries and desktop detail panels (same states, different density).

---

## 11. Daily marina operations flow

A realistic day loop (desktop-first detail, mobile-first execution):

1. **Open:** review alerts, weather, and **today’s departures/arrivals**.
2. **Prepare:** confirm crews, unblock boats from maintenance, assign or adjust berths.
3. **Execute:** check-ins, cash/card movements, last-minute booking edits.
4. **Close:** reconcile movements, note incidents, hand off to night report.

The product should support **interruptibility** (switch module mid-flow without losing draft state where safe).

---

## 12. Staff operational workflow

Roles are **product concepts** until auth/RBAC exists on Supabase; until then, **single user** with optional “acting as” labels in settings only if approved.

- **Front desk:** bookings, clients, payments, berth assignment.
- **Dock master:** arrivals/departures, berth changes, alerts.
- **Maintenance:** blocks and work orders feeding fleet status (see §13).

Workflows share the same **booking and boat identifiers** to avoid duplicate entry.

---

## 13. Maintenance workflow

- **Trigger:** time-based, hours-based, incident, or pre-departure checklist.
- **States:** scheduled → in progress → completed / deferred; **boat blocked** when safety requires it.
- **Linkages:** maintenance affects **bookings** (cannot assign blocked boat) and **alerts** (visible on mobile summary).

Selectors compute “next maintenance due” from structured fields, not from prose in UI.

---

## 14. Payment lifecycle

Distinct from **booking commercial state**:

- **Quote / expected** (from booking) vs **captured movement** (from payments module).
- **States:** unpaid → partial (deposit) → paid → refunded/adjusted (when supported).
- **Operational rule:** Every movement has **type, amount, description, date, category**; KPIs aggregate movements, not narrative labels.

Reconciliation between booking totals and movements is a **Phase 5+** capability, not assumed on first cash register activation.

---

## 15. Reservation lifecycle states

Canonical states should remain **small and enumerable**; substates (e.g. “awaiting deposit”) are either **flags** or **payment** states, not duplicated booking enums.

Suggested core set (product-tunable): **In attesa / Confermata / Check-in / In uscita / Completata / Cancellata** (exact Italian labels follow existing app vocabulary).

**Transitions** are logged in the future **audit** stream (§24); until then, store history locally only if schema supports it without migration pain.

---

## 16. Operational alert philosophy

Alerts are **actionable or informational**, never decorative.

- **Actionable:** requires dismissal or task link (e.g. berth conflict, blocked boat, overdue balance).
- **Informational:** time-bound (e.g. wind increase) with snooze or hide-until rules when implemented.
- **Noise control:** rate-limit duplicate alerts from the same root cause; aggregate “3 bookings missing deposit” instead of three identical rows when possible.

Severity maps to **color and sort order**, not to alarmist copy.

---

## 17. Notification philosophy

**In-app first** (alerts feed, badge counts). **Push/SMS/email** only after Supabase + provider integration and explicit consent/logging.

- **Delivery guarantees:** none claimed pre-integration; show “last attempted” timestamps when channel exists.
- **Quiet hours** and role-based routing are future **Settings** concerns.

---

## 18. Data relationships between modules

**Spine:** `Booking` ↔ `Client` (many-to-one or many-to-many later), `Booking` ↔ `Boat`, `Booking` ↔ `Service` lines, `Booking` ↔ `Payment` / movements (optional links), `Booking` ↔ `BerthAssignment` (optional), `Boat` ↔ `Maintenance`, `Alert` ↔ multiple sources (polymorphic ref or normalized event table in backend phase).

**Rule:** No circular ownership—**bookings do not own client master data**; they reference stable client ids. **Finanze** does not silently mutate booking totals; it records movements and optional links.

---

## 19. Mobile cockpit philosophy

**One screen, shallow depth:** today's money snapshot, next departures, top alerts, **four taps max** to the highest-frequency task (per product tuning).

- **Read-heavy, write-careful:** destructive actions behind confirmation sheets.
- **Offline:** show last synced timestamp when network features exist; until then, local-only honesty still applies.

---

## 20. Desktop workspace philosophy

**Multi-panel, high throughput:** dense tables, inline filters, side-by-side detail, keyboard-friendly navigation where Next/shadcn allows.

- **Compare and batch:** staff often need multiple bookings open; desktop favors **tabs or split context** without duplicating business rules.

---

## 21. Future Supabase migration strategy

**Principles:** adapter-first, **RLS by tenant/harbour** when multi-site arrives, **no UI rewrite** at cutover.

1. **Model parity:** Postgres tables mirror feature types; migrations versioned.
2. **Sync strategy:** upload local movements/bookings with id mapping; conflict policy explicit (last-write-wins vs operator merge) per entity.
3. **Auth:** move session to Supabase Auth when approved; until then no fake “logged in” states.
4. **Cutover checklist:** dual-write or freeze window, rollback plan (`ops/activation-protocol.md`), Playwright full regression.

---

## 22. Future Meteoblue integration strategy

**Role:** structured marine forecast and warnings as **inputs** to alerts and optional departure checks.

- **Contract:** API keys in **Settings**; server-side fetch preferred post-Supabase to protect keys; until then, **no key in client**—use mock or manual entry only if explicitly activated as such.
- **Caching:** TTL + stale badge; never block booking save solely on forecast fetch failure unless product policy demands it and is visible.

---

## 23. Future AI assistant boundaries

**Purpose:** reduce lookup time and drafting workload; **not** to author financial or legal truth.

- **Allowed:** summarize today’s board, suggest berth window from rules, draft client message from structured fields, surface anomalies (“movement without booking ref”).
- **Forbidden without human confirm:** create/delete payments, confirm bookings, assign berths, change boat blocked state, send external notifications.
- **Implementation shape:** `features/ai/` with **actions** (orchestration), **selectors** (derived suggestions from real state), **types**; output is always **provenance-labeled** (suggestion vs fact).

---

## 24. Future audit / logging philosophy

**Goal:** explain “who did what, when, to which entity” for money and safety-critical changes.

- **Minimum viable:** append-only event log per entity in Supabase; client local log optional pre-sync.
- **Privacy:** PII minimization in log payloads; retention policy in Settings later.

---

## 25. Export / backup philosophy

**Until cloud sync:** exports are **CSV/PDF snapshots** from real aggregates, with generated timestamp and scope (e.g. “Finanze movements 2026-05”).

- **Restore:** not promised for arbitrary CSV; **backup = reproducible migration** from local adapter export format when defined.
- **No silent cloud backup** without user consent and visible status.

---

## 26. Multi-language future support

**Default:** Italian UI copy is source of truth. **i18n** is a **cross-cutting phase**: key-based strings, no runtime string concatenation for sentences, date/number locale rules centralized.

Adding English (or other languages) is **documentation + string extraction + QA**, not a side effect of feature work unless scoped.

---

## 27. Scalability philosophy

**Technical:** module boundaries, adapter contracts, pagination on all large lists, selector memoization, avoid N+1 patterns when Supabase joins arrive.

**Operational:** multiple harbours imply **tenant isolation** and duplicated **berth catalogs** per site; shared code, **separate data partitions**.

**Team:** role-based UI surfacing scales with RBAC; do not hardcode role names into business rules.

---

## 28. Safety / rollback philosophy

Matches `ops/activation-protocol.md`: **revert or patch before merge** if runtime or hydration regressions appear; re-run lint, build, typecheck, and Playwright.

**Feature flags:** prefer small chunks and **disabled-by-default** experimental surfaces until activation QA passes.

**Data safety:** destructive deletes require confirmation; bulk operations behind explicit “review” step on desktop.

---

## Paste zone — official ChatGPT master plan

When available, paste the **verbatim** PrenotaDesk master product plan from ChatGPT below this line.

```
(Paste here.)
```
