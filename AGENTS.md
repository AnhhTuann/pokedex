# Elite PokeDex - Agent Instructions

## Repository reality
- Two independent npm projects, not an npm-workspaces monorepo.
- Frontend: pokedex-frontend/ (React 19, Vite 6, TypeScript, React Router 7, Apollo Client 3, Zustand 5, SCSS Modules, motion/react, Tiptap).
- Backend: pokedex-backend/ (Node.js, Express 4, Apollo Server 4, GraphQL 16, Prisma 5, PostgreSQL).
- Database contract: pokedex-backend/prisma/schema.prisma. GraphQL contract: pokedex-backend/src/graphql/typeDefs.ts and resolvers.ts.
- Source of Pokemon data: PokeAPI. Binary Pokemon/item assets live under pokedex-backend/public/images; they are not interchangeable with database records.
- Follow actual package.json versions and imports. README contains historical claims (e.g. MUI/Tailwind/GraphQL Yoga); do not assume they are installed.

## Project skills
Load relevant OpenCode project skills from .opencode/skills:
- pokedex-ui-ux: React routing, layouts, SCSS, Apollo, accessibility and performance.
- pokedex-api-security: GraphQL, authentication/authorization, Express and Prisma.
- pokedex-data-sync: PokeAPI sync, model IDs, game-version correctness and WebP assets.
- pokedex-quality-release: verification, risk-controlled changes and deploy readiness.
Mention the skill ID explicitly if it is not auto-loaded.

## Working rules
1. Inspect current code and git status before edits. Make a short risk-ranked plan, then implement in small coherent changes. No blind rewrite.
2. Preserve existing user accounts, favorites, teams, walkthrough content, Pokemon records and image files. Never run destructive schema/seed/sync operations on a real or production database without explicit permission, backup and rollback.
3. Treat all frontend-provided identities as untrusted. All user-specific writes require server-side identity. CMS writes require proven authorization; never substitute a hardcoded user ID.
4. Never put database URLs, JWT secrets, API keys or tokens in Git, client bundles, logs or sample credentials. Use env examples with placeholders only.
5. Change GraphQL SDL, resolvers, services, frontend operations and types together when changing an API contract.
6. Prefer focused bug fixes and regression tests over unnecessary framework migrations. Match SCSS Modules conventions; do not add MUI/Tailwind based only on README prose.
7. Asset changes must retain old URLs or provide validated migration. Use stable local WebP paths; check filesystem persistence in hosting targets.
8. Do not claim tests or deployments passed unless commands were actually run and results observed. Report remaining gaps.

## Local verification (commands run within each package)
Frontend: cd pokedex-frontend && npm ci && npm run lint && npm run build
Backend: cd pokedex-backend && npm ci && npx prisma generate && npm run build
No test scripts are currently declared in either package; add targeted tests where justified and label untested behavior clearly.
Use DATABASE_URL only for operations that truly require a database. Do not issue prisma db push, prisma migrate, seed, sync, truncate or delete commands as a routine check.

## Known risk areas to investigate before release
- Backend auth currently has a fallback JWT signing secret.
- Certain GraphQL resolvers default anonymous users to userId 1 and CMS/sync mutations lack explicit authorization in resolvers.
- Backend download-session endpoint accepts large content in memory; inspect abuse limits and download token generation.
- Frontend pokeApi.ts hardcodes localhost rather than deployment-aware API configuration.
- Updater uses row counts to infer new IDs and updates images during sync; counts are not stable IDs.
- Confirm game/version-specific Pokemon availability, forms and damage formulas with tests rather than guesswork.
These are investigation leads, not permission for mass rewrites.

## Output format
For each coherent change: findings, files changed, verification commands and results, unresolved risks, and any operator actions required. Keep conversation summaries in Vietnamese.
