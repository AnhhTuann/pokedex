---
name: PokeDex GraphQL and Security
description: Use when editing GraphQL schema/resolvers, Prisma models/services, login/JWT, authorization, authenticated favorites or teams, admin walkthrough mutations, API security, or database safety.
---

# PokeDex GraphQL and Security

## Source map
- Express/Apollo integration: pokedex-backend/src/index.ts.
- SDL and operations: pokedex-backend/src/graphql/typeDefs.ts and resolvers.ts.
- User identity: pokedex-backend/src/services/auth.service.ts and GraphQL context.
- Database: pokedex-backend/prisma/schema.prisma and src/db/prisma.ts.
- Frontend identity transport: pokedex-frontend/src/main.tsx and src/lib/authStore.ts.

## Safety-first workflow
1. Enumerate Query and Mutation entry points, classify public/authenticated/admin-only, and identify every user-specific read/write.
2. Verify JWT_SECRET is required at startup in all environments. Remove predictable default signing secrets safely; do not commit real values.
3. Reject unauthenticated access to private user data and writes. Never fall back to user ID 1. Validate token claims and server-derived user IDs.
4. Admin CMS and sync mutations need real server-side authorization. The current User model does not define a role. Design a safe role/permission migration and bootstrap strategy before implementing privileged access. Never infer privilege from the frontend or create a default admin account.
5. Limit request size, in-memory download sessions, token entropy, rate of unauthenticated calls and CORS origins as appropriate. Verify responses do not leak password hashes or secrets.
6. Make favorites/teams mutations atomic where needed, validate IDs and slot counts, and preserve existing records.
7. When GraphQL SDL changes, update resolvers, frontend operations and TypeScript types together; handle errors consistently.
8. For Prisma schema evolution, use reviewed migrations. Do not run db push, destructive seed or production migrations without explicit operator consent and backups.
9. Add negative tests: anonymous access, another user's data, forged/expired tokens, unauthorized CMS/sync writes, invalid inputs, and legitimate authorized flows.

## Verification
Run npm run build from pokedex-backend; run frontend npm run lint and npm run build for cross-contract edits. Report any DB-dependent validation not executed.
