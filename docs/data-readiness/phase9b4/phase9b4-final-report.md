# Phase 9B-4 — Kết quả và bước tiếp theo

- Branch `audit/phase9b4-data-architecture`, worktree `/tmp/pokedex-phase9b4-data-architecture`.
- Base `8e5744837beb24460e23c461362e09214b5d434e`, xác minh trên remote branch `audit/phase9b3-db-reconciliation`. Commit phase là commit chứa báo cáo này.
- Snapshot PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`. Evidence từ báo cáo trích xuất đã được commit và fixture offline. **Database reconciliation: UNVERIFIED**. Giữ nguyên Prisma schema, artwork, báo cáo lịch sử và dữ liệu người dùng.

| Khu vực | Trạng thái | Kết quả và giới hạn |
|---|---|---|
| Generation | Kiểm offline | 1–9, kế thừa từ base species, xác thực input |
| Broad Region | Kiểm offline tại API | Union các Dex cùng region và giao với exact Dex nếu có |
| Exact Regional Dex | Kiểm offline | `DexEntry` theo species; Victini #0, National ID riêng; ORAS legacy và hai mapping Legends Z-A được kiểm bằng fixture. Coverage hàng thực tế chưa xác minh |
| Individual Game | Một phần | 38 mapping khớp giữa frontend và catalog; UI vẫn dùng exact Dex + legacy form marker; `game` một mình chưa lọc |
| Form filtering | Một phần | All/default/alternate và exact form IDs hoạt động; regional/mega/gmax/other cần metadata có provenance |
| Game availability | Một phần, offline | 245 form giữ nguyên disposition, gồm 52 partially verified và 193 unverified; từng mục có hàng đợi review. Chưa có API availability facets đã xác minh |
| Learnsets | Một phần, offline | 2.010 cặp chưa có row group trong nguồn; 1.974 scope/mapping, 23 inheritance review, 13 source-gap candidates; chưa kết luận legitimate absence hay thiếu row theo từng cặp |
| Evolution | Một phần, offline | Đối chiếu 540 cây, 485 cạnh và 702 điều kiện. Cạnh Phione → Manaphy thiếu trigger; có đề xuất giữ provenance và xác minh loại quan hệ |
| Assets | Một phần, offline | Giữ backlog 47 Normal, 49 Shiny và 39 nhóm trùng trên 92 paths; chưa kiểm artwork trực quan và fallback UI legacy |
| Pagination | Kiểm offline | Count theo form sau filter, fixture 1.351 form qua first/middle/last/empty, không trùng hoặc mất dòng trong fixture |
| CatchTracker | Kiểm offline | Offset/totalCount thay cap 1.025; progress và bulk dùng tập đầy đủ; browser và endpoint thật chưa xác minh |
| Database reconciliation | **UNVERIFIED** | 0 kết nối, 0 truy vấn DB |

## Thay đổi theo nhóm

- **GraphQL + list service** — `src/graphql/typeDefs.ts`, `src/services/pokemon.service.ts`, `src/lib/regionalDexes.ts` của backend. Bổ sung broad-region và form scope, kế thừa generation, lấy join key qua relation của DexEntry và giữ count/sort theo form.
- **Frontend** — `src/pages/{PokemonDex,CatchTracker}.tsx`, `src/lib/{gameVersions,collectPokemonPages}.ts`, `src/hooks/{usePokemon,useCompletePokemonList}.ts`, `src/main.tsx` và operation chung `src/services/graphql/pokemon.queries.ts`. Có thêm cache keys tương ứng GraphQL inputs. CatchTracker dùng collector hoàn chỉnh và hai scope progress.
- **Kiểm chứng** — backend `tests/pokemonList.test.ts`, `audit/tests/phase9b4Contract.test.ts`; frontend `tests/{gameVersions,collectPokemonPages}.test.ts`. Replay các evidence offline và mock Prisma list.
- **Contracts** — 11 tài liệu trong thư mục này, `catalog-contract.json`, và hai CSV backlog. [Kiến trúc và các cấu phần](canonical-data-architecture.md)

## Kiểm tra đã chạy

| Package | Lệnh | Exit |
|---|---|---:|
| Cả hai | `npm ci --offline --no-audit` trong sandbox | 1 (esbuild EPERM) |
| Cả hai | `npm ci --offline --no-audit` với quyền chạy binary | 0 |
| Backend | `npx --no-install prisma generate` | 0 |
| Backend | `npm test` | 0 (25 pass) |
| Backend | `npm run test:audit` | 0 (31 pass) |
| Backend | `npm run audit:typecheck` | 0 |
| Backend | `npx --no-install tsc --noEmit` | 0 |
| Backend | `npm run build` | 0 |
| Frontend | `npm test` | 0 (27 pass) |
| Frontend | `npm run lint` | 0 sau khi sửa tham chiếu nhãn Dex TypeScript; lượt đầu exit 2 |
| Frontend | `npm run build` | 0 |
| Git | `git diff --check` | 0 |

Backend không khai báo lệnh lint riêng. Kiểm tra browser/backend thật và hiệu năng trên dữ liệu đã lưu nằm ngoài bằng chứng của các lượt chạy này. Offset không cố định snapshot giữa các request và server còn đọc tập ứng viên trước mỗi page.

## Phase 9C

1. Owner duyệt hợp đồng facet, form class và quy tắc projection. Duyệt riêng quyền đọc snapshot dữ liệu hoặc bản sao phục hồi. So theo khóa legacy/canonical và lập báo cáo reconciliation trước mọi backfill.
2. Đối chiếu ORAS `hoenn` / `updated-hoenn`, Legends Z-A `legends-za` / `lumiose-city` / `hyperspace`, và Victini #0 trên dữ liệu được duyệt. Xác nhận mapping tương thích trước khi triển khai API và frontend cùng phiên bản.
3. Duyệt từng nhóm form evidence, từng cặp learnset và chain 250 theo source. Chỉ nâng trạng thái khi có evidence đúng form, game hoặc group. Tạo proposal migration và rollback riêng để owner phê duyệt.
4. Kiểm trực quan asset backlog và phê duyệt manifest, đường dẫn, checksum và alias. Thử nghiệm mode thiếu ảnh, shared artwork và browser CatchTracker trên fixture hoặc môi trường được phép trước UI redesign.
