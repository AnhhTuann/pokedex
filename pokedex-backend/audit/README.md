# Reusable data audit toolset

Read-only, repeatable checks for Elite PokéDex data. The toolset never writes to a
database, never runs seed/sync/migrate, and never overwrites curated content.

## Run

From `pokedex-backend/`:

```bash
npm ci                       # once, provides tsx + Prisma client
npm run audit:typecheck
npm run test:audit

# Schema + source only (no network, no DB)
npm run audit -- --offline

# Schema + source + PokéAPI cross-reference (cached, bounded concurrency)
npm run audit -- --api --sample 38

# Add read-only database checks (staging or restored backup only)
AUDIT_DATABASE_URL='postgresql://…' npm run audit -- --api --db
```

Arguments:

| Flag | Meaning |
|---|---|
| `--offline` | Skip PokéAPI. |
| `--schema-only` | Only parse `prisma/schema.prisma`. |
| `--api` | Enable PokéAPI cross-reference (default unless `--offline`). |
| `--db` | Allow read-only DB checks using `AUDIT_DATABASE_URL` (falls back to `DATABASE_URL` only with this flag). |
| `--sample N` | Number of species to inspect in detail (default 38). |
| `--out DIR` | Output directory relative to `pokedex-backend/` (default `audit/reports`). |

## Outputs

- `audit/reports/report.md` — Vietnamese-ready Markdown report with coverage.
- `audit/reports/audit.json` — full findings, schema map, source snapshot, reference snapshot.
- `audit/reports/findings.csv` — spreadsheet-friendly findings.
- `audit/reports/fix-plan.json` — ordered remediation steps with dry-run/backup/rollback templates.
- `audit/.cache/pokeapi/` — HTTP cache (gitignored); delete to force a fresh reference read.

## Safety rules

1. Code and schema are **not** evidence of real database contents. Without `--db`,
   all row-level claims are reported as `UNVERIFIED` / `runtimeRequired`.
2. PokéAPI is a reference source, not an overwrite source. No correction is applied.
3. `npm run audit:dry-run -- --finding <ID>` only prints proposed steps; `--apply`
   is deliberately rejected.
4. Backup, validation and rollback commands in `fix-plan.json` are operator
   templates. Do not run them against production without explicit approval.

## Classification

`CORRECT`, `MISSING`, `INCORRECT`, `DUPLICATE`, `UNSUPPORTED`, `UNVERIFIED`.
Every finding carries `evidence` and `sources`.
