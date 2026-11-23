---
name: PokeDex UI and UX
description: Use when developing or reviewing the PokeDex React/Vite UI, Pokemon cards/details, game filters, team builder, CMS editor, mobile accessibility, images, animations, routing, or performance.
---

# PokeDex UI and UX

## Actual stack and entry points
- Frontend package: pokedex-frontend/package.json.
- Routing and game/version mapping: src/App.tsx.
- Apollo Client, auth header, pagination merge policy: src/main.tsx.
- Screens: src/pages; reusable components: src/components and src/features.
- Theme/styles: src/index.scss and src/styles with SCSS Modules.
- Shared client state: src/lib/teamStore.ts, catchStore.ts, authStore.ts.
- API queries: src/services/graphql/pokemon.queries.ts; older direct fetch helper: src/lib/pokeApi.ts.

## Procedure
1. Inspect the relevant screen, its styles, GraphQL data shape and route before editing.
2. Keep type-safe React components, match established SCSS tokens, and avoid introducing uninstalled UI frameworks. README mentions MUI and Tailwind but package.json does not include them.
3. Preserve version/gen filtering semantics and regional/alternate form behavior; do not assume species Pokedex IDs are equivalent to variety IDs.
4. Verify responsive layouts at narrow/mobile and desktop widths; check keyboard, visible focus, labels, contrast, empty/error/loading states, and reduced-motion handling.
5. Favor image lazy loading, stable dimensions and efficient WebP asset URLs; distinguish a missing image from a failed API request.
6. Avoid unnecessary rerenders and cascading network calls; investigate Apollo cache keyArgs/merge and Zustand selectors when data appears stale.
7. Avoid introducing runtime localhost URLs. Support configured VITE_GRAPHQL_API_URL and backend/static-asset URL strategy consistently.
8. When adjusting transitions, avoid layout shifts; respect prefers-reduced-motion. Do not sacrifice navigation or keyboard support for effects.
9. Confirm edits with npm run lint and npm run build inside pokedex-frontend. If the project has no UI tests, propose or add a small focused regression check where warranted.

## Done when
An edited screen maintains existing navigation and filters, works on keyboard/mobile, handles loading and empty states, has no new TypeScript errors, and its API calls succeed against the intended backend.
