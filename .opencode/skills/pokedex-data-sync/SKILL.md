---
name: PokeDex Data Synchronization
description: Use for PokeAPI ingest/update scripts, Pokemon species and alternative forms, encounter/version data, game rules, local WebP image pipeline, Prisma upserts, and safe incremental synchronization.
---

# PokeDex Data Synchronization

## Inspect first
- Schema: pokedex-backend/prisma/schema.prisma.
- Seeds: pokedex-backend/scripts/seed*.ts.
- Updater: pokedex-backend/src/services/updater.service.ts.
- Asset downloader: pokedex-backend/src/services/image.service.ts.
- Frontend version mapping: pokedex-frontend/src/App.tsx.

## Invariants
- PokeAPI species ID, Pokemon form ID, and local Prisma primary key are not interchangeable. Read model relations and preserve foreign keys.
- API count is not a safe last-ID or sync cursor. Detect missing or changed IDs through stable identifiers, pagination/next URLs, explicit cursors, or snapshot comparisons.
- A form being available in a game cannot be inferred only from a species generation. Preserve per-version and regional form validity.
- Repeated sync runs must be idempotent. Never overwrite curated user/CMS data or replace good existing image URLs with null due to a temporary download failure.
- Image files under public/images need stable paths, validation and persistent hosting storage. Never delete existing assets during routine sync.
- Use bounded concurrency, timeouts, retries/backoff, input validation and checkpoint/resume for external fetches. Handle partial failures without corrupting relational data.
- Keep normal and shiny assets separate; do not silently substitute one for the other.
- Generated/update changes must be measured via dry-run diffs before any apply. Report added/changed/skipped/failed records.

## Procedure
1. Inspect one representative species, alternate form and game/version case in the existing schema and code.
2. Design deterministic incremental sync with stable PokeAPI IDs, a dry-run option, and no destructive defaults.
3. Add unit tests for gaps/deletions in remote ID ranges, reruns, missing images, network failures and version/form boundaries.
4. Verify Prisma writes in a disposable database only when an isolated test DB is available; never use production DB.
5. Preserve URLs and media file layout or provide a verified migration plan.
6. Run backend build, describe observed test output, and document remaining limitations.

## Extra care
Damage-calculation correctness and generation-specific mechanics are separate game-logic concerns; establish the exact game rules and reference test cases before claiming competitive accuracy.
