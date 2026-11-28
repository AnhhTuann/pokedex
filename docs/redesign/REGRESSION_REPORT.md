# Regression report

| Check | Outcome |
|---|---|
| Frontend `npm ci`, `npm run lint`, `npm run build` | Passed. The lint script runs TypeScript with `--noEmit`. Sass retains existing `@import` deprecation warnings, and the largest Vite chunk still exceeds 500 kB. |
| Backend `npm ci`, `npx prisma generate`, `npm run build` | Passed. npm reported 11 existing dependency findings while installing the backend lockfile. |
| Unit and integration scripts | Neither package on the V2 branch declares test or integration scripts. The local main worktree has separate changes outside this pass. |
| Calculator equivalence | In 36 cases across move classes, immunities, dual typing and weather, the output matched `d37b8ff` including rolls, percentages and KO text. |
| Frontend browser matrix | 270 production-preview observations recorded. No page exceptions or document-width overflow in the completed matrix. |
| Backend runtime | Local `/api/ping` returned pong. Public screens rendered through existing GraphQL and asset proxy routes. |
| Availability of authorized accounts | Authenticated profile, CMS publishing, sync and account write tests require a disposable test environment with account and administrator fixtures. |
| Static source scope | Git diff contains frontend code and documentation. Database schema, backend auth and JWT, GraphQL contract, team and catch storage, encounter logic and battle formula source are outside the diff. |
| Repository hygiene | `git diff --check` passed. Screenshot collections live under the ignored local artifact directory. |

The first dev-server rerun encountered stale optimized dependencies during an edit and dependency installation. The build-preview matrix used a freshly built bundle and is the reported release observation. Bundle numbers track transferred asset size by build output, without making a runtime latency claim.

Playwright passed 44 scenarios across 390 px and 1440 px in both themes, including 4 axe scan executions. Coverage included history navigation, mobile drawer focus restoration, theme persistence, version selection, Pokédex search and filters, detail focus containment, comparison, trainer picker, tracker reset dismissal, walkthrough locale and guest account guards. Axe ran across 8 public routes in each of the four contexts. Scan execution succeeded and some checks still produced findings. The axe reports and per-scenario Playwright outcomes are stored alongside the screenshots.
