# OpenCode - First production-hardening pass for Elite PokeDex

Work in the checked-out repository https://github.com/AnhhTuann/pokedex.

Read AGENTS.md and load all four relevant project skills: @pokedex-ui-ux, @pokedex-api-security, @pokedex-data-sync, and @pokedex-quality-release. Inspect actual source files, package.json, git status and current build state. Do not assume README is up to date.

Act as a senior React/TypeScript and Node/GraphQL/Prisma engineer. The goal is to make the existing Elite PokeDex more reliable, secure, and production-ready while preserving all existing functionality and data.

Priorities, in strict order:

P0 - AUTHENTICATION AND DATA PROTECTION
- Audit all GraphQL Query/Mutation resolvers and Express routes. Remove anonymous fallback to userId 1 for private favorites and teams. Require server-side validated identity for every user-specific read/write.
- Remove predictable JWT secret fallback and require explicit secure environment configuration; do not reveal or commit secrets. Review auth token validation and unauthorized cases.
- Protect walkthrough mutations and syncNewData with a genuine server-side admin policy. Since Prisma User currently has no role, first propose a safe schema migration/bootstrap flow; never silently grant admin, break all existing admins or mutate production data.
- Review CORS, request limits and download-session token randomness/memory; apply focused safe fixes with negative tests.
- Do not run destructive production database operations.

P1 - DATA, API AND GAME CORRECTNESS
- Verify GraphQL SDL/resolver/service/frontend operation consistency. Validate error/loading behavior and paginated Apollo cache merges.
- Audit updater.service.ts: API counts are not IDs, partially failed downloads must not null out existing valid images, sync must be idempotent, resumable, non-destructive and support dry-run.
- Verify PokeAPI species/forms/encounter/game-version mapping using representative samples, and report unsupported cases rather than guessing.
- Add tests for type effectiveness, representative damage formulas, game filters, and auth/sync edge cases. Do not claim a competitive-accurate calculator without explicit cross-generation test coverage.

P2 - FRONTEND RELIABILITY AND QUALITY
- Remove hardcoded localhost API origins from src/lib/pokeApi.ts and any other production path. Use a consistent Vite env and backend asset URL strategy; ensure no secret is exposed through Vite define.
- Check navigation and mobile layouts for PokemonDex, detail, TeamBuilder, DamageCalculator, LocationDex, and Walkthrough. Preserve the visual identity; improve obvious loading/error/empty states, accessibility and reduced-motion support.
- Preserve existing local WebP paths and verify image fallback and layout stability. Avoid introducing Tailwind or MUI unless package.json and project requirements genuinely call for them.

P3 - VALIDATE AND DOCUMENT
- Run npm ci and npm run lint/build in frontend; npm ci, prisma generate and npm run build in backend. Use a disposable database for integration tests only when safe and available.
- Add focused tests/scripts needed for high-risk modifications, document env placeholders and local setup, and note deployment-specific constraints (persistent WebP files, CORS, Postgres, free-tier cold starts).
- Never run production sync, seed, migration, delete, force push, or deploy without explicit user permission.
- Summarize findings and changes in Vietnamese: files, verified commands and actual results, remaining issues, safe next steps.

Execution style: First provide a short risk-ranked audit; then implement the highest-impact safe changes in small coherent commits. Do not stop after giving advice: edit code and test what you can. If blocked by a credential, admin bootstrap decision or live DB access, complete independent safe changes and explicitly state the blocker. Never claim unexecuted tests or deploys succeeded.
