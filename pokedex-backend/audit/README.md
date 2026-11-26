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
| `--offline` | Skip PokéAPI network access. With `--full`, uses the local PokéAPI cache only. |
| `--schema-only` | Only parse `prisma/schema.prisma`. |
| `--api` | Enable PokéAPI cross-reference (default unless `--offline`). |
| `--db` | Allow read-only DB checks. Requires explicit `AUDIT_DATABASE_URL`; incompatible with `--offline` and `--schema-only`. |
| `--sample N` | Number of species to inspect in detail (default 38). |
| `--out DIR` | Output directory relative to `pokedex-backend/` (default `audit/reports/current`). |

## Outputs

- `audit/reports/current/report.md` — Vietnamese-ready Markdown report with coverage.
- `audit/reports/current/audit.json` — full findings, schema map, source snapshot, reference snapshot.
- `audit/reports/current/findings.csv` — spreadsheet-friendly findings.
- `audit/reports/current/fix-plan.json` — ordered remediation steps with dry-run/backup/rollback templates.
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

| Classification | Meaning |
|---|---|
| `CORRECT` | Verified correct |
| `INCORRECT` | Proven functional or reference mismatch |
| `MISSING` | Required data or content is absent |
| `DUPLICATE` | Verified duplicate records |
| `DESIGN_GAP` | A required capability exceeds the current representation |
| `ACCEPTABLE_DESIGN` | Intentional design choice |
| `UNVERIFIED` | Evidence is insufficient |
| `UNSUPPORTED` | Explicitly outside current support |

The fix plan and dry-run list confirmed defects, missing data and duplicates when
the finding has sufficient evidence for an actionable proposal. Design gaps
appear in the design review section.

See the [Phase 9A implementation report](reports/phase9-audit-integrity/README.md)
for the offline verification results and full-audit prerequisites.
Every finding carries `evidence` and `sources`.
