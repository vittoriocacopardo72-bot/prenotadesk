# AGENTS.md — Operational Contract

## Product Owner

Vittorio is the decision maker. No agent may perform large structural changes without approval.

## Main Goal

Build a real operational booking/management app, not a demo.

## Agent Roles

### Cursor

Role: product implementation.
Allowed:

- build features
- improve UI/UX
- refactor approved modules
- connect flows
- use Figma/shadcn guidance

Forbidden:

- global rewrites without approval
- breaking desktop/mobile shells
- changing unrelated files

### Codex

Role: debugging and technical repair.
Allowed:

- runtime fixes
- build/lint/type errors
- store/hydration/client-server issues
- import/cycle fixes

Forbidden:

- redesign UI
- add features during bugfix
- refactor product structure unless approved

### Figma

Role: UX/UI reference.
Used for:

- layout hierarchy
- spacing
- mobile/desktop flow
- visual consistency

Figma does not override product logic.

### shadcn/ui

Role: UI primitive system.
Used for:

- Button
- Card
- Sheet
- Dialog
- Tabs
- Input
- Form primitives

Do not replace shadcn primitives with random custom UI unless necessary.

## Architecture Rules

1. One feature at a time.
2. No monolithic files.
3. Business logic must not live inside UI components.
4. Desktop and mobile may have different UI.
5. Shared logic/types/actions must be reused.
6. Mobile must remain compact and operational.
7. Desktop is the full management workspace.
8. Supabase migration must remain easy.
9. localStorage is temporary persistence only.
10. Every visible action should eventually do something real.

## Feature Module Target

Each feature should eventually follow:

features/
bookings/
actions/
components/
hooks/
selectors.ts
types.ts
index.ts

Repeat for:

- clients
- boats
- payments
- crew
- alerts
- weather
- settings

## Workflow Rules

Before editing:

1. inspect relevant files
2. explain exact plan
3. list files to change
4. wait for approval if structural

During editing:

1. keep changes small
2. preserve UI unless task is UI-specific
3. preserve mobile/desktop behavior
4. avoid unrelated cleanup

After editing:

1. run npm run build
2. run npm run lint
3. summarize exact changes
4. explain risks or remaining mock behavior

## Bugfix Mode

When app is broken:

- stop feature work
- fix only the crash/error
- do not redesign
- do not add features
- smallest safe fix only
- build/lint required

## Git Rules

Every stable chunk should be committed separately.

Recommended commit style:

- Fix runtime crash
- Add booking module structure
- Wire create booking action
- Improve mobile cockpit layout

Never push broken code intentionally.

## Priority Order

1. Runtime stability
2. Booking feature fully operational
3. Local persistence reliability
4. Supabase connection
5. CRUD base
6. Mobile/desktop polish
7. Additional modules
