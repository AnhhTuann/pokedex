# Phase 9C — Data và API readiness

Base `2cdfabc00894a05f0ce99071464e620898b986d3`. Branch `feat/phase9c-data-api-completion`. Commit cuối là commit chứa báo cáo này. Nguồn PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`, tree `cf32c6147e9c1da51bc91d13616259b19e8d50b9`. **Database reconciliation UNVERIFIED. Kiểm thử database thực BLOCKED.** Zero kết nối DB trong phase.

| Khu vực | Bằng chứng reference | Hành vi ứng dụng và giới hạn |
|---|---|---|
| Catalog | 1.025 species, 1.351 form, 9 generation, 35 Dex, 38 game, 8.010 entries | Versioned catalog local được kiểm checksum và cấu trúc khi tải. |
| Generation | Generation chuẩn theo species | API và UI kết hợp với các filter khác. |
| Broad Region | Tập Dex theo broad region của nguồn | API và UI lọc hợp membership của các Dex. sort National khi không chọn exact. |
| Exact Regional Dex | `hoenn` 202, `updated-hoenn` 211, `lumiose-city` 232, `hyperspace` 132 | Thứ tự theo số entry rồi ID form. Victini #0 đi qua GraphQL. UI reference dùng updated Hoenn. API cũ giữ mapping DexEntry. DLC và các sub-dex chọn theo slug riêng. |
| Individual Game | 38 game/version-group mappings | `referencePokemonList` mặc định dùng game-presence evidence khi game đứng riêng. API cũ có `game`-only dùng cùng evidence với page cap cũ. cặp region/game vẫn đọc legacy. |
| Forms | 1.025 default, 112 other, 97 Mega, 60 regional, 34 Gigantamax, 23 battle | Có filter category, alternate và exact ID. Cosmetic/unknown có enum nhưng chưa có record phân loại phù hợp trong projection đã pin. |
| Availability | 52 partially verified và 193 unverified dispositions cũ được giữ theo form ID | Sáu facet độc lập trả CONFIRMED hoặc UNKNOWN. Dex membership của species có số riêng và không suy ra wild hay form presence. Transfer/event chưa có evidence xác minh. |
| Learnsets | 665.810 slot, 27 group có slot trên 32 group reference | Schema trả slot theo đúng form/group, source và method/level. 2.010 cặp đã đối chiếu tiếp tục UNKNOWN với lý do review per pair (1.974 scope/mapping, 23 inheritance, 13 source-gap candidates). |
| Evolution | 540 cây, 485 cạnh, 702 conditions | Projection giữ từng lựa chọn theo group. Chain 250 giữ raw evidence, bỏ Phione → Manaphy khỏi projection vì thiếu bằng chứng tiến hóa. |
| Assets | 47 Normal thiếu, 49 Shiny thiếu, 39 nhóm trùng trên 92 path | Manifest gắn form/species ID, path, mode, lý do và hash nhóm trùng. Runtime ẩn ảnh trùng chưa duyệt. ảnh local hợp ID vẫn ghi trạng thái LOCAL_UNREVIEWED. UI hiển thị artwork unavailable riêng theo mode. |
| Pagination | Một ID form duy nhất cho mỗi dòng | Count sau filter, offset/limit theo form, cap 250 mỗi page. Cache Apollo theo toàn bộ scope và list hình thành từ snapshot bất biến khi tiến trình chạy. |
| CatchTracker | Cùng form ID như trước | Đọc đủ 1.351 dòng theo page. tiến độ tiếp tục dùng key local hiện có. Mark Current dùng đúng tập filter đã tải. |
| Database | **UNVERIFIED** | Test DB thực **BLOCKED**. App reference đọc file, legacy reader tiếp tục phục vụ API có DB. |

## Tệp và vận hành

- Backend `src/catalog/{reference,graphql}.ts`, `src/graphql/{typeDefs,resolvers}.ts`, `src/index.ts` và `scripts/build-reference-catalog.py`. Data runtime nằm tại `data/reference/{catalog,detail,manifest,asset-remediation}.json` và `learnsets-*.json.gz`. Catalog dùng lại projections đã kiểm. Shards chỉ chứa slot theo nhóm từ payload pin, không lưu bản sao raw JSON.
- Backend `tests/reference.integration.test.ts`, `tests/fixtures/reference-server.ts`, `package.json` và `package-lock.json`. Fixture HTTP dùng SDL và resolvers reference thật, không import Prisma.
- Frontend `src/services/graphql/reference.queries.ts`, `src/hooks/{useReferencePokemon,useCompletePokemonList}.ts`, `src/main.tsx`, `src/pages/{PokemonDex,CatchTracker}.tsx`, `src/components/{PokeCard,PokemonArtwork}.tsx`, `src/styles/pages/CatchTracker.module.scss`, `src/features/pokemon-detail/{PokemonDetailDialog,MoveList}.tsx`, `tests/browser/reference.e2e.mjs`, `package.json` và `package-lock.json`.
- Tạo lại dữ liệu bằng `python3 pokedex-backend/scripts/build-reference-catalog.py /path/to/pinned-api-data-checkout`. Script đọc blob ở commit pin, kiểm tree và count slot theo từng form/group. Một lần chạy tham chiếu dùng các payload trích xuất trực tiếp từ endpoint raw commit pin. Runtime đọc catalog và detail một lần, xác minh checksum từng shard ở startup và giữ tối đa một group đã giải nén. API không gọi PokéAPI cho list/detail reference. Đóng gói `data/reference` cùng backend khi triển khai sau này.
- DB schema diff rỗng vì kiến trúc file đáp ứng browse. Nếu owner cấp quyền kiểm trên bản sao, xuất SELECT-only theo `pokedexNumber`/species ID và nối `DexEntry.pokemonId → Pokemon.id`. So từng cặp Dex slug/species và number, tách `hoenn` với `updated-hoenn`, `legends-za` với hai Dex mới, kiểm Victini 0. Dry-run báo thêm/thiếu/sai mapping và tham chiếu user. Bất kỳ backfill nào cần đề xuất và approval riêng, backup phục hồi được, rollback reader cũ và quy trình đảm bảo favorites, teams, CMS, CatchTracker giữ nguyên khóa.

## Security và hiệu năng

Input được GraphQL kiểm kiểu. Service kiểm slug, generation, scope của regional number/facet và giới hạn page/IDs/search. Sắp xếp pre-index theo từng Dex. mỗi request duyệt danh sách trong RAM và chỉ serialize page. Ref API là public read-only. Các lệnh user/admin giữ auth gate hiện có. Chưa benchmark tải đồng thời ở host thật.

`npm audit --json` ban đầu exit 1 với 7 mục theo package (4 high, 2 moderate, 1 low). Sau khóa `qs` 6.16.2, audit exit 1 với 6 mục (4 high, 1 moderate, 1 low). Không dùng force fix.

| Mục | Mức npm | Đánh giá phạm vi |
|---|---|---|
| @apollo/server | High qua dependency. advisory trực tiếp Moderate | Apollo 4 còn advisory cross-site search. Auth ứng dụng dùng bearer header, không có bằng chứng exploitability trên host này. Nâng Apollo major là một thay đổi riêng. [Advisory](https://github.com/advisories/GHSA-9q82-xgwf-vj6h) |
| @graphql-tools/utils | High | Prototype pollution trong merge. Luồng hiện tại merge schema/resolver tĩnh. catalog filters không được đưa vào merger. [Advisory](https://github.com/advisories/GHSA-7mx3-vvmw-hjmv) |
| @graphql-tools/merge | High | Mục bắc cầu từ utils. đánh giá cùng đường merge schema. |
| @graphql-tools/schema | High | Mục bắc cầu từ merge/utils. đánh giá cùng đường merge schema. |
| uuid | Moderate | API ứng dụng không truyền buffer vào các biến thể UUID bị ảnh hưởng. package vẫn có mặt trong cây Apollo. [Advisory](https://github.com/advisories/GHSA-w5hq-g745-h8pq) |
| esbuild | Low | Phạm vi dev server Windows. không thuộc runtime backend Linux đang kiểm. [Advisory](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr) |
| qs | Moderate trước khi vá | Express có xử lý query đầu vào. Đã pin 6.16.2, mục này biến mất ở audit cuối. [Advisory DoS](https://github.com/advisories/GHSA-4mjr-xmp4-gh2g) · [Advisory array-limit](https://github.com/advisories/GHSA-x5fp-wj9c-mxmx) |

## Kiểm thử và điều kiện phát hành

| Gói | Lệnh | Exit |
|---|---|---:|
| Backend | `npm ci --offline --no-audit` | 0 |
| Backend | `prisma validate` với URL giả dành cho schema parser | 0 |
| Backend | `prisma generate` | 0 |
| Backend | `node --import tsx --test tests/reference.integration.test.ts` | 0, 6 pass |
| Backend | `npm test` | 0, 31 pass, gồm 6 integration và regression auth/admin |
| Backend | `npm run test:audit` | 0, 31 pass |
| Backend | `npm run audit:typecheck`, `tsc --noEmit`, `npm run build` | 0 mỗi lệnh |
| Backend | `npm audit --json` trước và sau cập nhật qs | 1 mỗi lượt, xem advisory ở trên |
| Frontend | `npm ci --offline --no-audit`, sau đó thêm Playwright dev dependency từ cache | 0 mỗi lệnh |
| Frontend | `npm test` | 0, 27 pass |
| Frontend | `npm run lint`, `npm run build` | 0 mỗi lệnh |
| Catalog | Tạo lại và so SHA-256 của manifest | 0, hash `a564933b0aea1fe8d4a249493c45cb8f3b5e1a0642d02a0dc496c7d1ec100bcc` |
| Frontend | `npm run test:browser` với fixture HTTP | 0, desktop 1440×900, tablet 768×1024, mobile 390×844 |
| Git | `git diff --check` | 0 |
| DB | Runtime integration với DB | BLOCKED do chưa có database được ủy quyền |

Browser chạy với backend fixture `node --import tsx tests/fixtures/reference-server.ts` trong backend. Frontend chạy `VITE_GRAPHQL_API_URL=/graphql VITE_BACKEND_URL=http://127.0.0.1:3199 npm run dev -- --host 127.0.0.1 --port 5199`. `npm run test:browser` dùng Chrome headless và nhận đường dẫn binary qua `PHASE9C_CHROME`. Lượt đầu phát hiện selector label chưa ổn định, kỳ vọng casing sai trong test và lớp filter che nút xác nhận CatchTracker. Nút xác nhận được đưa vào portal, kèm fallback stacking order cho stylesheet có sẵn. Integration fixture ban đầu cũng áp nhầm điều kiện evolution của Red/Blue cho Yellow. Test hiện kiểm điều kiện theo dữ liệu từng group. Browser đã kiểm phân trang, combined filters, Victini #0, hai Dex Z-A, thiếu artwork và Mark Current giữ tiến độ sau reload.

Danh sách tệp đầy đủ, gồm từng shard, có trong `git show --name-only --format= HEAD`. Bảng learnset reference hiển thị tên, method và level. Thông số combat của move vẫn thuộc MoveDex và chưa được nối vào bảng detail reference.

**Điều kiện phát hành** Database reconciliation và các luồng ghi thật cần môi trường được owner cấp quyền. Asset replacement cần duyệt đúng form/mode và nội dung hình. Apollo/GraphQL Tools còn advisory cần xử lý trước khi phát hành. App reference có thể dùng làm dữ liệu đầu vào cho Premium PokéDex UX/UI Redesign. Màu đỏ, bố cục responsive và visual identity thuộc phase thiết kế tiếp theo.
