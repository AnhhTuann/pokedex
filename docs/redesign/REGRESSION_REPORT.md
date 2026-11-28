# Regression Report

## Executed
| Check | Result | Notes |
|---|---|---|
| `npm ci` (pokedex-frontend) | PASS | Dependencies installed in worktree |
| `npm run lint` (pokedex-frontend) | PASS | `tsc --noEmit` |
| `npm run build` (pokedex-frontend) | PASS | Vite build succeeded; chunk size warning pre-existing/known |
| Backend tests | Not run | No backend code changes intended; environment not validated here |
| Existing frontend tests | Not run as separate suite | `npm test` script exists (`node --import tsx --test tests/*.test.ts`) - not executed in this pass |
| Browser functional regression | Not run | Requires running app + browser automation |
| Accessibility audit | Not run | Requires browser tooling |

## Functional risk areas to manually verify
- Theme toggle persistence and initial load.
- Game version selector and version modal.
- Shiny toggle.
- Pokemon search/filter/compare/favorites/detail.
- Team builder save/edit/delete/import/export flows.
- Damage calculator results unchanged for same inputs.
- Catch tracker persistence.
- Login/register/dashboard/admin auth guards.
- Walkthrough/admin editor content rendering.
