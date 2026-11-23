---
name: PokeDex Quality and Release
description: Use for repo audits, refactoring safety, regression tests, deployment readiness, environment configuration, performance checks, CI planning, or verifying changes across the PokeDex frontend/backend.
---

# PokeDex Quality and Release

## Workflow
1. Establish baseline: branch, modified files, package scripts, TypeScript builds, app start commands and external service dependencies.
2. Separate observed failures from suspected risks. Prioritize auth/data corruption, then broken API functionality, then game data correctness, then UX/performance.
3. Keep changes reviewable and scoped. Favor one concern per commit. No dependency major-version upgrades without a compatibility plan.
4. Test affected contracts and security failure cases. There is currently no npm test script; do not report passing unit/e2e tests that do not exist.
5. Verify the two independent packages:
   - pokedex-frontend: npm ci; npm run lint (TypeScript noEmit); npm run build.
   - pokedex-backend: npm ci; npx prisma generate; npm run build.
6. Where possible, add focused tests for pure functions (damage calculator, type effectiveness, game filter), GraphQL authentication and idempotent sync. State exactly which were executed.
7. For runtime checks, validate frontend routes refresh correctly, GraphQL /graphql, /api/ping, images, auth and expired-token states. Use safe seeded/disposable data.
8. Audit frontend production configuration: endpoint URL, HTTPS/CORS, asset origin, no localhost or embedded secret. Do not bundle GEMINI_API_KEY or any backend secret into the client.
9. Audit backend availability: JWT_SECRET and DATABASE_URL configured, migrations reviewed, backup/restore documented, persistent media storage, platform filesystem constraints and request limits.
10. If deploy target uses free tiers, document sleep/cold start, storage persistence, bandwidth, Postgres capacity and service quotas from current provider documentation; do not promise permanent uptime.
11. Finish with concise report: changes, exact commands and outputs, skipped tests, blocking risks, rollback strategy, and next safest step.

## Absolute prohibitions
No production DB reset, prisma db push on live data, seed overwrites, deletion of media, secret disclosure, unsolicited deployment or silent git force-push.
