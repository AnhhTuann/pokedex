# Responsive Guidelines

Breakpoints (from `_variables.scss`): xs 480, sm 640, md 768, lg 1024, xl 1280.

- Desktop: sidebar + compact header, content max-width as needed, grids adapt to content width.
- Tablet: sidebar becomes drawer/mobile behavior at md, filters/controls wrap.
- Mobile: no unintended horizontal overflow, touch-friendly controls, readable cards/forms, modals/drawers fit viewport.
- Pokemon grid: `auto-fill, minmax(196px, 1fr)` with 2-col at small screens, 1-col below 360px.
- Tables: allow intentional local horizontal scroll when needed; avoid hiding core data.
