# Component Guidelines

## Shell
- `MainLayout`: grouped sidebar (Encyclopedia/Trainer Tools/Adventure/Account), compact header, brand logo, crimson active nav, mobile drawer, version modal.
- Keep game/shiny/theme/user controls functional. Contextual controls stay in header/page as appropriate.

## Shared
- **Button**: primary=crimson strong, secondary/outline/ghost neutral, danger=status error. All states: hover/active/focus-visible/disabled/loading.
- **InputField**: 44px height, token borders, focus ring, error state with text.
- **Card**: neutral surface, subtle border/shadow, no heavy glass.
- **SearchBar**: token-based trigger/dropdown, clear actions, keyboard/focus support.

## Pokemon
- **PokeCard**: neutral outer card, soft type-colored artwork stage, number/name/category/types, favorite/compare states, restrained hover (<=1.04 image), no neon/glow.
- **Type badges**: use `getTypeBadgeStyle`; readable ink on accent fill, consistent across app.
- **Detail/Compare/Moves**: preserve existing data/behavior; restyle surfaces with tokens (further polish needed in some modals).

## States
- Loading: skeletons with same dimensions where possible.
- Empty: clear message, neutral dashed/surface container.
- Error: status-error bg/border/text, not color-only when actionable.
