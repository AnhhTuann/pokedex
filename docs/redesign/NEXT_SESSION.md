# NEXT_SESSION - Phase 2 Continuation Checkpoint

## Current state
- Branch: `feat/elite-pokedex-v2-redesign`
- PR: https://github.com/AnhhTuann/pokedex/pull/6 (OPEN, Draft, base main)
- Latest commit before this checkpoint: `c302fb03cfafcfddfee9cd042d8a948bc4699127`
- Worktree: `/tmp/opencode/elite-pokedex-v2-redesign`
- Protected dirty main workspace untouched: `/home/tuan/Documents/pokedex`

## Completed in this session (Phase 2 start)
- Verified redesign worktree/branch state.
- Identified running services: backend already running on `http://localhost:4000/graphql` (200), postgres `pokedex-db` on 5432.
- Started redesign frontend dev server from worktree with `VITE_GRAPHQL_API_URL=http://localhost:4000/graphql` (nohup, log `/tmp/opencode/vite-redesign.log`, port may shift; confirm log).
- Confirmed Playwright Chromium available at `/home/tuan/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome`.
- Captured quick headless screenshots (not fully QA-reviewed) to `artifacts/redesign/`:
  - Dark desktop: `/, /moves, /abilities, /items, /locations, /types, /natures, /teambuilder, /tracker, /calculator, /walkthrough, /login, /register`
  - Dark mobile (390x844): `/ , /moves, /types, /teambuilder, /calculator, /login`
  - Light desktop: `/ , /moves, /types, /teambuilder, /login`
- Reverted temporary light-mode default hack in `main.tsx`.

## Not completed (must continue)
1. **Browser QA environment hardening**: keep stable dev server process; establish Playwright test harness (axe integration if compatible); avoid shell-timeout-killed servers.
2. **Phase 2B audit**: complete contrast audit for all white/primary/text-on-accent/type/version/chart foregrounds in both themes; audit `useIsAdmin.ts` behavior; review bulk SCSS replacements.
3. **Phase 2C baselines**: capture original main baseline (isolated checkout), Phase 1 WIP baseline, and Phase 2 final at required viewports/themes; record blocked routes.
4. **Phase 2D-2G page redesign**: complete Pokemon Dex/detail/compare/version selector; all secondary dex pages; trainer tools; walkthrough/auth/dashboard/admin. Preserve all functionality and data correctness.
5. **Phase 2H shared components**: normalize all interactive states across buttons/inputs/selects/tabs/dialogs/drawers/tables/badges/skeletons/empty/error/notifications.
6. **Responsive/a11y/motion**: test required viewports, keyboard flows, focus trap/restore, reduced-motion (CSS+JS), route transitions without unnecessary shell remount.
7. **Regression/perf**: run existing tests, browser functional regression, deterministic damage-calc comparisons, bundle/perf review.
8. **Docs/PR**: update route matrix with PASS/FAIL/PARTIAL/BLOCKED/NOT EXECUTED evidence; update FINAL_REPORT; commit and push verified changes.

## Known risks/issues
- Screenshots were captured by headless Chromium with virtual-time-budget; not manually inspected for correctness/completeness.
- Many pages still only token-migrated, not fully redesigned.
- Sass @import deprecation warnings remain (pre-existing/project-wide).
- Vite chunk size warning remains.
- Dev servers started from shell can be killed by tool timeout; use nohup/setsid and record PID/log.

## Exact next action
1. Start/confirm redesign frontend on stable nohup process and backend on 4000.
2. Run Playwright-based screenshot script (desktop/tablet/mobile, dark/light) with proper wait-for-network/data selectors; inspect screenshots.
3. Fix critical contrast/foreground issues found in screenshots/code audit, starting with MainLayout version selector, type badges, primary buttons, and page-specific hardcoded colors.
4. Continue page-by-page redesign per Phase 2D onward, committing in coherent groups.
