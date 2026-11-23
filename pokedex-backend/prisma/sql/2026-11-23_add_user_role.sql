-- Non-destructive admin policy migration for an EXISTING database.
-- Take a backup first. Apply once with:
--   psql "$DATABASE_URL" -f prisma/sql/2026-11-23_add_user_role.sql
-- This repo has no migration history; do not use `prisma migrate deploy` here
-- without first baselining the existing schema.
--
-- After applying, explicitly promote one existing account:
--   npm run admin:grant -- <username>
-- No account is promoted by this SQL.

BEGIN;

CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER';

COMMIT;
