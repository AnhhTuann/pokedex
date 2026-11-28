# Visual QA Report

## Status: Partial / Incomplete

## Executed
- Started redesign frontend from worktree on Vite dev server (`VITE_GRAPHQL_API_URL=http://localhost:4000/graphql`), backend already running on 4000.
- Captured headless Chromium screenshots (virtual-time-budget) into `artifacts/redesign/` (local, not committed):
  - Dark desktop (1440x900): home, moves, abilities, items, locations, types, natures, teambuilder, tracker, calculator, walkthrough, login, register.
  - Dark mobile (390x844): home, moves, types, teambuilder, calculator, login.
  - Light desktop (1440x900): home, moves, types, teambuilder, login.
- `npm run lint` and `npm run build` were previously PASS on c302fb0; must be re-run after further changes.

## Not executed / incomplete
- Manual visual inspection of every screenshot for defects.
- Baseline comparison against main/original.
- Full required viewport matrix (1920x1080, 1366x768, 1024x768, 768x1024, 360x800).
- Light mode coverage for all routes.
- Critical component states (detail dialog, compare modal, version selector, mobile nav drawer, filter drawer, validation, loading/empty/error, admin/editor).
- Playwright automated visual/accessibility flow.
- Keyboard/reduced-motion manual checks.

## Required before merge
1. Capture and inspect full matrix screenshots with stable selectors/waits.
2. Fix all visual defects found (contrast, spacing, overflow, clipping, theme leaks).
3. Verify dialogs/drawers/forms/tables on mobile and desktop in both themes.
4. Record PASS/FAIL/PARTIAL/BLOCKED evidence in route matrix.
