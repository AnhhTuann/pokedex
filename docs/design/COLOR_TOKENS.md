# Color Tokens

Source: `pokedex-frontend/src/styles/_variables.scss`, `pokedex-frontend/src/lib/utils.ts`.

## Semantic
- Backgrounds: `--bg-default`, `--bg-sidebar`, `--bg-paper`, `--bg-elevated`, `--bg-hover`, `--bg-active`, `--bg-pressed`
- Borders: `--border-subtle`, `--border-main`, `--border-hover`, `--border-strong`
- Text: `--text-primary`, `--text-secondary`, `--text-muted`, `--text-disabled`, `--text-inverse`
- Brand: `--brand`, `--brand-strong`, `--brand-accent`, `--brand-pressed`, `--brand-soft`, `--brand-on`, `--focus-color`
- Status: `--status-{success,warning,error,info,selected,pending,disabled,active}` + `*-bg/*-border`
- Chart: `--chart-*` for axis/grid/series/stat/compare.

## Pokemon Types
Defined in `TYPE_TOKENS` (`src/lib/utils.ts`): accent, ink, softDark/Light, borderDark/Light for all 18 types. Use helper functions; do not hardcode in components.

## Game Versions
`VERSION_COLORS` and helpers in `src/App.tsx` preserve recognizable game identities. Header/modal use contrast-aware rendering; avoid using version colors as global app brand.

## Legacy aliases
`--primary`, `--secondary`, `--accent-*`, `--glow-*` kept for compatibility; `--glow-*` neutralized to none.
