# Motion Guidelines

- Purposeful motion only: feedback, state change, hierarchy, open/close.
- Durations: 120-160ms hover, 160-220ms state/tabs, 200-280ms modals/drawers.
- Prefer `transform` and `opacity`; avoid layout-thrashing and expensive filter/shadow animation.
- `prefers-reduced-motion`: CSS global reduction in `index.scss`; Motion components should use restrained durations and not block functionality.
- No infinite decorative glow/particles/parallax.
