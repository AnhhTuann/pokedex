# Implementation Plan

## Phase 0 - Discovery
- Inspected repo, branch, PR #6, routes, components, styles, tokens.
- Identified dirty main worktree (untouched) and worked in isolated worktree.
- Baseline audit documented in `UI_UX_AUDIT.md`.

## Phase 1 - Design Foundation
- Rebuilt `styles/_variables.scss` with Premium Charcoal / Warm Porcelain / Crimson / Pastel / semantic/chart tokens and compat aliases.
- Rebuilt `styles/_mixins.scss` to neutralize neon/glass/holographic mixins while keeping API.
- Rebuilt `index.scss` for clean base, focus-visible, reduced-motion, token scrollbars.

## Phase 2 - Shell
- Redesigned `MainLayout.tsx` + SCSS: grouped nav, brand identity, compact header, responsive sidebar/drawer, version modal restyle, accessible controls.

## Phase 3 - Shared Components
- Updated `common/Button|Card|InputField`, `SearchBar`, `PokeCard`, `CompareModal` chart colors.

## Phase 4 - Pokemon Encyclopedia
- Updated `PokemonDex` page/SCSS, `PokeCard`, search/filter controls. Detail/compare/moves received token compatibility; deeper pass still recommended.

## Phase 5-7 - Remaining Pages
- Applied token foundation and broad SCSS normalization pass across page modules. Several pages still need dedicated visual refinement pass (tables, forms, charts, admin/editor, walkthrough content).

## Phase 8-10 - QA/Docs
- `npm run lint` and `npm run build` pass in `pokedex-frontend`.
- Browser visual QA/screenshots not captured in this environment; must be completed before merge.

## Scope of this pass

Preserve the existing V2 commit sequence. Land independent changes for the persistent shell, reusable controls, route layouts and verification. Gate publication on observed build and browser results. Authorized account and CMS write testing and remaining design debt are recorded in the route and regression reports.
