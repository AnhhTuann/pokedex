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

## Form and dialog patterns

Use the shared `InputField` label with password-manager autocomplete values for authentication. Field errors are linked to input descriptions. Error messages that apply to an entire form use an alert. Use a native select for ordinary single-choice filters and a persistent label or accessible name.

The shell uses native modal dialogs for the navigation drawer and game-version picker. Legacy overlay components that use Motion share `useDialogFocus` for Escape, Tab, scroll lock and focus restoration. Forward the dialog ref and give the dialog a name and a programmatically focusable container.
