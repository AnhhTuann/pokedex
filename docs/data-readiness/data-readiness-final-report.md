# Phase 9B-2 — Pokémon data coverage và integrity

Snapshot `508fd7c3a7d54ac175e00afe420b11a5af983bd6`, tree
`cf32c6147e9c1da51bc91d13616259b19e8d50b9`. Base ứng dụng
`f2d151cc12c866e2daee0ed7113e22b025a1c049`. Toàn bộ 7.704 cache entry được
kiểm lại theo SHA-1 request, Git blob ID và SHA-256 đã ghi. Các file snapshot
đọc thêm được kiểm trực tiếp theo blob của tree. Kết quả chỉ đọc từ nguồn
đã ghim. [Provenance Phase 9B-1](source-provenance.md)

| Hạng mục | Trạng thái | Kết quả |
|---|---|---|
| Generation | PARTIALLY READY | Reference đủ 1.025 species, 9 generation và 540 cây tiến hóa. Bộ lọc source có hỗ trợ; hàng DB chưa xác minh. [Độ phủ](generation-coverage.md) |
| Region | PARTIALLY READY | Đủ 35 dex và 8.010 entry, không thấy entry lặp hoặc association sai. Đã sửa loại nhầm số 0. ORAS và broad-region filter còn mở. [Độ phủ](regional-dex-coverage.md) |
| Individual Game | PARTIALLY READY | Đủ 38 game và version group. Đã tách member, game index, encounter, wild và learnset version group. Obtainability đầy đủ vẫn chưa xác minh. [Độ phủ](game-version-coverage.md) |
| Forms | PARTIALLY READY | Đủ 1.351 varieties; 326 alternate thiếu game index, trong đó 81 có encounter method và 245 thiếu cả hai loại bằng chứng. [Inventory](forms-coverage.md) |
| Assets | PARTIALLY READY | Thiếu 47 Normal, 49 Shiny và 0 WebP lỗi decode. Có 39 nhóm hash trùng; đúng artwork và remote URL chưa xác minh. [Độ phủ](asset-coverage.md) |
| Database | UNVERIFIED | Chưa có tài khoản staging/restored backup được cấp phép. [Kế hoạch SELECT](database-verification-plan.md) |
| Application Filtering | PARTIALLY READY | Đã kiểm Victini fixture. Cần hợp đồng filter theo game, broad region, đơn vị phân trang và form. [Đánh giá query](application-query-readiness.md) |

Điểm mới là đọc version từ các phần tử `version_details` trong encounter.
Báo cáo lịch sử dùng cách đọc khác, do đó số encounter trong báo cáo này
được tính lại với cùng snapshot. Không thay đổi output lịch sử. Số liệu
tất cả 35 dex và 38 game nằm trong ma trận. Ma trận không dùng presence
hoặc membership thay cho catchability. [Bằng chứng theo game](game-availability-evidence.md)

## Tái lập và kiểm tra

Từ package backend, tạo JSON đầu vào bằng chính hàm mapping trong ứng dụng:

```bash
node --import tsx --input-type=module -e "import {GAME_VERSION_OPTIONS,getRegionalDexForQuery,getGameGenerationStrict} from '../pokedex-frontend/src/lib/gameVersions.ts'; console.log(JSON.stringify(GAME_VERSION_OPTIONS.map(({value,label})=>({slug:value,label,generation:getGameGenerationStrict(value),effectiveDexes:value==='legends-za'?[getRegionalDexForQuery(value),getRegionalDexForQuery(value,'hyperspace')]:[getRegionalDexForQuery(value)]}))))" > /tmp/phase9b-game-map.json
```

Từ root, chạy Python 3 với Pillow và một thư mục output mới:

```bash
python3 pokedex-backend/audit/scripts/complete-coverage-508fd.py . /tmp/phase9b-pokeapi-upstream /tmp/phase9b-cache-508fd /tmp/phase9b-game-map.json /tmp/phase9b-coverage-replay
```

Kết quả được lưu tại `pokedex-backend/audit/reports/phase9b-coverage/`.
Có JSON từng species, variety, chain và ID membership từng game, cùng CSV
generation, dex, entry, game và asset. Báo cáo sử dụng revision source ở
thời điểm audit. Diff tái lập kiểm được toàn bộ file cùng nội dung.

| Lệnh Phase 9B-2 | Exit | Kết quả |
|---|---:|---|
| Backend `npm test` | 0 | 25/25 |
| Backend `npm run test:audit` | 0 | 24/24 |
| Backend `npm run audit:typecheck` | 0 | TypeScript noEmit |
| Backend `npm run build` | 0 | TypeScript build |
| `npx prisma validate`, `npx prisma generate` | 0 | Schema hợp lệ và client được sinh. Validate dùng URL giả, không kết nối DB. |
| Frontend `npm test` | 0 | 22/22 |
| Frontend `npm run lint`, `npm run build` | 0 | Có cảnh báo Sass deprecation. |

## Các bước Phase 9B-3

1. Xin quyền SELECT trên staging hoặc restored backup được phê duyệt. Chạy
   truy vấn chỉ đọc trong kế hoạch, đối chiếu xuất ra với các matrix theo
   khóa surrogate/National tương ứng. Đo thiếu, trùng, orphan và slug sai.
2. So sánh song song `hoenn` và `updated-hoenn`, hai dex Z-A và Victini #0.
   Xác minh URL được phục vụ và mapping asset trước khi đề xuất đổi dữ liệu.
3. Chốt đơn vị trả về và phân trang, chọn một hàng/species hoặc một hàng/form.
   Viết fixture cho broad region, exact dex, game membership, null, số 0,
   page biên, nhiều form cùng entry và fallback cho evidence chưa có.
4. Rà soát 245 alternate chưa có game-specific index/encounter và các case
   transfer/event/trade bằng nguồn cơ chế phù hợp. Đưa learnset version group,
   điều kiện tiến hóa và provenance availability vào đề xuất thiết kế riêng.
5. Lập danh sách duyệt 96 file asset thiếu và 39 nhóm byte trùng. Thực hiện
   kiểm trực quan và URL sau khi được duyệt, rồi quyết định asset cần bổ sung.

Bản sửa ứng dụng duy nhất giữ số regional `0` ở backend. Main, production,
schema, UX, asset và lịch sử audit được giữ nguyên.
