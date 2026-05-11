# PrenotaDesk Activation Protocol

## Purpose

Define the standard reusable workflow for activating any app section from mock/partial UI into real local operational behavior.

## 1) Definition of Activation

A section is **activated** only when all of the following are true:

- Visible controls perform real actions.
- Data persists through `localStorage` or an existing safe local store.
- KPIs derive from real state, not hardcoded fake numbers.
- Empty states are honest and explicit.
- Fake controls are disabled or clearly labeled as not ready.
- Browser QA confirms the flow end-to-end.

## 2) Classification System

Use these labels for every activation report:

- `working`: behavior is real, stable, and verified.
- `partial`: some real behavior exists, but important parts are missing.
- `fake`: still mock/demonstrative and not operational.
- `broken`: errors, regressions, or unusable flow.

## 3) Persistence Contract (Required)

All activations using local persistence must follow this contract:

- **LocalStorage key naming**
  - Format: `prenotadesk:<section>:<entity>:v<schemaVersion>`
  - Example: `prenotadesk:finanze:movements:v1`
- **Schema version**
  - Store a numeric `schemaVersion`.
  - Increase version only for shape changes and keep migration notes in activation output.
- **SSR-safe access**
  - Never access `window`/`localStorage` during SSR render path.
  - Access storage only in client-safe code paths.
- **Migration fallback**
  - On parse/version mismatch: attempt migration once.
  - If migration fails, fall back to safe default state (no crash) and expose honest empty state.
- **Adapter boundary for future backend switch**
  - Persistence access must be wrapped behind a section-local adapter/store boundary.
  - UI components cannot call `localStorage` directly.
  - Keep storage keys/data shape easy to map to future Supabase/backend.

## 4) Scoped Diff Rules (Required)

- **Path allowlist**
  - Touch only files in the target section scope and directly related local store/types/selectors/actions.
  - Explicitly list the allowed paths before editing.
- **Max touched files per chunk**
  - Maximum 6 files per chunk.
  - If more files are needed, split into additional reversible chunks.
- **Unrelated paths prohibition**
  - Any file outside allowlist is forbidden unless explicitly approved.
  - No opportunistic cleanup.

## 5) Standard Activation Workflow

1. Inspect `AGENTS.md`.
2. Inspect current section files.
3. Inspect related stores/hooks/types.
4. Inspect existing `localStorage` usage and define persistence contract for the section.
5. Run **pre-change baseline QA** with Playwright MCP.
6. Identify fake controls.
7. Implement the smallest safe behavior.
8. Preserve mobile compact cockpit.
9. Preserve desktop workspace.
10. Run **post-change validation QA** with Playwright MCP.
11. Run **cross-section regression smoke QA** with Playwright MCP.
12. Run lint/build/typecheck gates.
13. Run scoped `git diff` review.
14. Report classification and commit only if green.

## 6) Allowed Operations

- Add local feature files.
- Add a scoped `localStorage` hook/store.
- Add simple dialogs/forms.
- Wire existing buttons to real behavior.
- Add filters/search/sort.
- Disable unavailable controls.

## 7) Forbidden Operations

- No global redesign.
- No broad refactor.
- No Supabase.
- No auth changes.
- No shell/navigation rewrite.
- No unrelated files.
- No new libraries unless explicitly approved.
- No fake KPI replacement with different fake KPI.

## 8) Architecture Guardrail (Required)

- KPI logic must live in selectors/stores/actions, never as hardcoded UI literals.
- Business logic must not live inside UI components.
- UI reads computed state; UI does not own KPI math source of truth.

## 9) Playwright QA Protocol (Required)

### Fixed Viewports

- Mobile: `390x844`
- Desktop: `1440x900`

### Phase A: Pre-change baseline

- Capture current behavior for target section in both viewports.
- Record known fake/disabled controls.
- Record current console/hydration state.

### Phase B: Post-change validation

- Create item.
- Edit item (if available).
- Delete item.
- Refresh and verify persistence.
- Test honest empty state.
- Test filters/search/sort (if present).
- Verify fake controls are disabled or labeled "not ready".
- Check console errors.
- Check hydration warnings.
- Check infinite render loops.

### Phase C: Cross-section regression smoke

- Open adjacent/related sections and verify no blocking runtime regression.
- Verify navigation to/from target section is stable in both viewports.

### Pass/Fail criteria

- **Pass**: all required checks pass, no blocking console/runtime/hydration issues.
- **Fail**: any blocking runtime error, hydration mismatch, infinite render loop, or broken core flow.

## 10) Typecheck and Build Gates (Required)

Run in order:

- `npm run lint`
- `npm run build`
- `tsc --noEmit` (if available in the project)

If one gate fails: stop, fix, and do not commit.

## 11) Classification to Commit Matrix (Required)

- **`working`**
  - Required for full activation completion.
  - Commit allowed only if all quality gates are green.
- **`partial`**
  - Allowed only for explicitly approved incremental chunk.
  - Must include clear residual scope and blocked items.
  - All remaining fake controls must be disabled or labeled as not ready.
- **`fake`**
  - Not commit-eligible as "activation complete".
  - Can only remain if explicitly reported and labeled in UI.
- **`broken`**
  - Never commit.
  - Enter rollback/patch flow immediately.

## 12) Rollback Rule (Required)

If runtime/hydration regressions appear during QA or after integration:

- Revert the offending chunk or patch immediately before merge.
- Re-run lint/build/typecheck and Playwright QA.
- Do not merge while regression is present.

## 13) Commit Rules

Commit only when all checks pass:

- `npm run lint` passes.
- `npm run build` passes.
- `tsc --noEmit` passes (if available).
- Playwright QA passes.
- `git diff` is scoped.
- Feature classification is reported.

## 14) Reusable Command Format

Use this template for each activation request:

Read AGENTS.md and ops/activation-protocol.md.  
Activate section: [SECTION_NAME].  
Persistence: localStorage only.  
Scope: [EXACT_SCOPE].  
Do not use Supabase.  
Do not redesign.  
Use Playwright MCP for browser QA.  
Run lint/build/typecheck.  
Report classification.  
Commit only if green.

## 15) Output Format After Each Activation

- Section
- Files changed
- Working
- Partial
- Fake disabled
- Broken
- QA performed
- Build/lint result
- Commit hash

## 16) Activation Log (Traceability Required)

After each activation run, append an entry to `ops/activation-log.md` with:

- Timestamp
- Section
- Scope
- Files changed
- Classification (`working`/`partial`/`fake`/`broken`)
- QA summary (baseline, post-change, cross-section smoke)
- Lint/build/typecheck result
- Commit hash or `no-commit` reason
