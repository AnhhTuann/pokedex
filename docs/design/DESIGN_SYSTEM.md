# Elite Pokédex V2 Design System

## Direction
**Premium Dark + Pastel Fantasy + Crimson Identity**

- Premium, modern, calm, information-rich, game-inspired but professional.
- Charcoal dark surfaces, warm porcelain light surfaces.
- Crimson for brand/primary actions/selection/focus; pastel accents for Pokemon/context.
- No cyberpunk neon overload, no heavy glassmorphism, no blue-purple-everywhere gradients.

## Tokens (source of truth)
- `pokedex-frontend/src/styles/_variables.scss` - theme tokens, status, chart, radius, shadow, motion, legacy aliases.
- `pokedex-frontend/src/styles/_mixins.scss` - layout/responsive/scrollbar helpers.
- `pokedex-frontend/src/index.scss` - base reset, focus, reduced-motion, scrollbar, form defaults.
- `pokedex-frontend/src/lib/utils.ts` - Pokemon type tokens and badge helpers.

## Color
### Dark (Premium Charcoal)
- Canvas `#101114`, Sidebar `#15171C`, Surface `#181A20`, Elevated `#22252D`, Hover `#292D36`, Pressed `#30343E`
- Borders `#272A32 / #30343E / #535968`
- Text `#F4F5F8 / #A5ADBD / #9299A8`, Inverse `#101114`

### Light (Warm Porcelain)
- Canvas `#F7F6F3`, Sidebar `#FDFCFA`, Surface `#FFFFFF`, Elevated `#EEECE8`, Hover `#F0EFED`, Pressed `#E7E5E2`
- Borders `#E9E7E4 / #DDDDE3 / #B8BAC4`
- Text `#22232B / #626675 / #6B707D`, Inverse `#FFFFFF`

### Brand Crimson
- Brand `#C72B4B`, Strong `#B42343`, Accent `#E05270`, Pressed `#991B36`
- Dark accent/focus `#F08099`, Soft dark `#43232F`, Soft light `#FCE8ED`

### Pastel Accents
Rose `#F3B8D0`, Lavender `#C4B5FD`, Mint `#A8E5CF`, Baby Blue `#A9D5F5`, Butter Yellow `#F5E3A1`, Soft Peach `#F4BEA3`

### Status
Success/Warning/Error/Info use theme-aware semantic tokens with `*-bg` and `*-border` mixes. Never color-only.

### Pokemon Types
18 types defined in `TYPE_TOKENS` in `src/lib/utils.ts` with accent, ink, soft/border variants. Use `getTypeBadgeStyle/getTypeBadgeColor/getTypeForeground`.

## Typography
- Display: Plus Jakarta Sans (via existing project font stack/vars)
- UI/Body: Inter
- Vietnamese fallback: Be Vietnam Pro
- Numeric/technical: JetBrains Mono
- Scale: Page 28-32, Section 20-24, Card 15-18, Body 14-16, Secondary 13-14, Meta 11-12.

## Spacing / Radius / Elevation
- 4px base spacing.
- Radius: controls 6-8, buttons/inputs 8-10, cards 12, panels 16, dialogs 16-20, pills full where appropriate.
- Shadows restrained; borders/surface differences first.

## Motion
- 120-220ms for most UI transitions, 200-280ms for overlays/drawers.
- Transform/opacity preferred. `prefers-reduced-motion` respected in CSS and Motion components should keep functionality.

## Components
- Shared primitives: `components/common/Button|Card|InputField`.
- Shell: `components/MainLayout` with grouped sidebar, compact header, theme/version/shiny/game/user controls.
- Pokemon: `components/PokeCard`, detail/compare/moves modals, SearchBar.
- Use semantic tokens, visible focus, accessible labels, consistent states.

## Current implementation

The global shell owns page gutters. Most content pages use the shared display heading at 24–32 px and a 14 px description. Inter handles body copy with Be Vietnam Pro and system fallbacks. Plus Jakarta Sans handles display text and statistics use the monospace stack.

Warm porcelain uses a #F7F6F3 canvas and #FFFFFF surface. Premium charcoal uses #101114 and #181A20. Crimson actions use #B42343 with white text, hover #C72B4B and pressed #991B36. Selected states pair a soft crimson surface with the theme-aware interactive text token. Pokémon type accents remain contextual on badge and artwork surfaces. Game colors appear in swatches and selected game controls.

The 4 px spacing scale drives account panels, headings and toolbars. Small controls use 6–8 px radii, cards 12 px and dialogs 16 px. Shell layout uses a 240 px sidebar and 64 px header. The native navigation drawer replaces the desktop sidebar at 768 px and below.

The HTML bootstrap applies the persisted theme before loading React. Motion receives the OS reduced-motion preference, complemented by the stylesheet's reduced-motion rules. Card artwork uses CSS hover feedback and a fixed stage with the existing asset URL.

Shared controls and page-specific exceptions are listed in [Component guidelines](COMPONENT_GUIDELINES.md).
