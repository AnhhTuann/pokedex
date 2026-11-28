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
