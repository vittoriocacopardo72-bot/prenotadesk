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

## 3) Standard Activation Workflow

1. Inspect `AGENTS.md`.
2. Inspect current section files.
3. Inspect related stores/hooks/types.
4. Inspect `localStorage` usage.
5. Run browser QA with Playwright MCP.
6. Identify fake controls.
7. Implement the smallest safe behavior.
8. Preserve mobile compact cockpit.
9. Preserve desktop workspace.
10. Run lint/build.
11. Run git diff review.
12. Commit only if green.

## 4) Allowed Operations

- Add local feature files.
- Add a scoped `localStorage` hook/store.
- Add simple dialogs/forms.
- Wire existing buttons to real behavior.
- Add filters/search/sort.
- Disable unavailable controls.

## 5) Forbidden Operations

- No global redesign.
- No broad refactor.
- No Supabase.
- No auth changes.
- No shell/navigation rewrite.
- No unrelated files.
- No new libraries unless explicitly approved.
- No fake KPI replacement with different fake KPI.

## 6) QA Checklist

- Create item.
- Edit item (if available).
- Delete item.
- Refresh and verify persistence.
- Test empty state.
- Test filters/search.
- Test mobile viewport.
- Test desktop viewport.
- Check console errors.
- Check hydration warnings.
- Check infinite render loops.

## 7) Commit Rules

Commit only when all checks pass:

- `npm run lint` passes.
- `npm run build` passes.
- Playwright QA passes.
- `git diff` is scoped.
- Feature classification is reported.

## 8) Reusable Command Format

Use this template for each activation request:

Read AGENTS.md and ops/activation-protocol.md.  
Activate section: [SECTION_NAME].  
Persistence: localStorage only.  
Scope: [EXACT_SCOPE].  
Do not use Supabase.  
Do not redesign.  
Use Playwright MCP for browser QA.  
Run lint/build.  
Report classification.  
Commit only if green.

## 9) Output Format After Each Activation

- Section
- Files changed
- Working
- Partial
- Fake disabled
- Broken
- QA performed
- Build/lint result
- Commit hash
