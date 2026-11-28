# UI/UX Audit (V2 Redesign Baseline)

## Scope audited
- Routes: `/`, `/moves`, `/abilities`, `/items`, `/locations`, `/types`, `/natures`, `/teambuilder`, `/tracker`, `/calculator`, `/walkthrough`, `/login`, `/register`, `/dashboard`, `/admin/walkthrough`
- Shell: `MainLayout`, sidebar, header, game/version/shiny/theme controls, mobile drawer, version modal.
- Shared: Button, Card, InputField, SearchBar, PokeCard, CompareModal, Pokemon detail flows.
- Styles: `_variables.scss`, `_mixins.scss`, `index.scss`, component/page SCSS modules.

## Key issues found (before changes)
| Area | Problem | Impact | Solution | Priority | Regression risk |
|---|---|---|---|---|---|
| Theme tokens | Mixed legacy palette, glow/glass tokens, hardcoded values scattered | Inconsistent identity, hard to maintain | Centralize semantic tokens in `_variables.scss`, neutralize glow/glass, add compat aliases | P0 | Medium - visual regressions |
| Global styles | Body radial neon glow, generic glass utilities, strong selection/focus inconsistency | Off-brand, noisy | Clean base styles, focus-visible, reduced-motion, token scrollbars | P0 | Low |
| App shell | Per-route neon nav colors, crowded header controls, inconsistent active states | Visual noise, weak brand identity | Crimson brand identity, grouped nav, compact header, token-based sidebar | P0 | Medium - nav behavior |
| PokeCard | Heavy glass/holographic/neon, hardcoded dark/light hacks, saturated badges | Competes with Pokemon art, inconsistent | Neutral card, soft type backdrop, shared type badge styles, restrained hover | P0 | Medium |
| Search/filters | Hardcoded dark/light styles, inconsistent control heights/focus | Inconsistent UX | Token-based SearchBar/InputField/Button | P1 | Low |
| Page SCSS | Many pages use old glass/glow/rgba patterns | Inconsistent across routes | Token migration pass; full page-by-page polish still needed | P1 | Medium |
| Version modal | Dense inline styling, contrast issues in some states | Usability/readability | Restyled modal with token surfaces, preserved version identity | P1 | Low |
| Accessibility | Some controls lacked labels/aria; focus not always visible | Keyboard/screen reader issues | Added aria labels, focus ring, preserved semantics | P1 | Low |
| Motion | Hover/animation could be heavy | Performance/motion sensitivity | Reduced motion, transform/opacity focus | P2 | Low |

## Environment notes
- Work performed in `/tmp/opencode/elite-pokedex-v2-redesign` (worktree from `origin/feat/elite-pokedex-v2-redesign`).
- Main worktree `/home/tuan/Documents/pokedex` had unrelated local modifications; untouched.
- Browser screenshot baseline/final capture was not executed in this environment (no Playwright setup run). Visual QA is code-level + build/lint verified; manual browser review still required.

## Full-pass audit at d37b8ff

The existing draft contains a charcoal and porcelain foundation, a new Pokédex and detail treatment, and dedicated Move, Ability and Item Dex implementations. Local main contained unrelated tracked and untracked work, so this pass used the existing clean redesign worktree.

Chromium ran against the Vite development server and the local backend on port 4000. The baseline includes 270 route, theme and viewport observations and 90 screenshots at 1440, 768 and 390 px. The report sampled the desktop dark and mobile light contact sheets and checked the high-risk surfaces individually in follow-up passes.

| Surface | Observed issue and impact | Change | Priority and regression risk |
|---|---|---|---|
| Application shell | Desktop state reset on path changes and sidebar controls remained reachable off-screen. Header context created a second top-level heading. | Keep the shell mounted, expose a skip link, and use a native mobile dialog. | High. Back navigation, focus and responsive breakpoint transitions. |
| Pokédex filters and cards | Filter options used clickable divs and nested interactive elements. Broken artwork left visually empty stages. Each card initiated a color-extraction pass and an entrance animation. | Use labeled native filters, a fixed type stage, a fallback and stable image dimensions. | High. Preserve search behavior, type/generation values and shiny image selection. |
| Dialogs | Comparison and moves dialogs handled Escape without complete focus routing. | Share initial focus, tab containment, Escape, scroll lock and focus restoration. | High. Nested overlays and dynamic dialog content. |
| Secondary Dex | Location, Types and Natures used inconsistent heading treatments. Type selectors lacked linked labels. Some game button foregrounds were hardcoded. | Align the heading scale and controls, use contextual color swatches, and reuse the contrast helper. | Medium. Type calculations and encounter selection must keep their existing behavior. |
| Trainer tools | Team slots occupied 420 px even when empty. The tracker used decorative motion and high-emphasis destructive controls. Calculator field labels were as small as 9 px. | Compact empty slots, standardize dialog semantics, remove tracker decoration and enlarge calculator controls. | High. Existing team selection, catch state and calculator logic. |
| Walkthrough | Mobile chapter navigation pushed the article down. Table-of-contents items depended on pointer clicks. | Collapse chapter navigation at narrow widths and use anchored links. | Medium. Preserve chapter content, locale and navigation. |
| Account | Inline form styles used missing button classes and the visible labels did not name their inputs. | Use shared input and button components and accessible error messaging. | High. Preserve form payloads, validation and redirects. |
| CMS and data update | Direct anonymous CMS access displayed editing controls. Unstyled update markup took horizontal space across public pages. | Use existing admin result for visibility and give the notifier a bounded SCSS surface. | High. Admin and sync require an isolated authorized end-to-end check. |
