# Phase 9A — Độ tin cậy của audit

**Full Data Audit regeneration: BLOCKED.** Worktree Phase 9A tại commit cơ sở
`8990cc66ce9099af945f4d36f9ba8963e7baacbf` thiếu cache và checkpoint gốc trong
`audit/.cache/pokeapi/`. Báo cáo này ghi nhận implementation, audit nguồn/schema
offline và kiểm thử. [Full Data Audit đã lưu](../full-data/report.md) và
[đối chiếu Phase 8](../../docs/phase8-finding-validation.md) là bằng chứng lịch sử.

## Bốn cảnh báo sai đã xử lý

| Finding | Kết quả đối chiếu |
|---|---|
| `SCHEMA-FK-INCONSISTENT` | Tám FK tường minh tới Pokémon có đích hợp lệ. `UserPokemon` và `DexEntry` trỏ tới `id`. Hai cạnh `Evolution`, `TeamSlot`, `PokemonMove`, `PokemonVariety` và `Encounter` trỏ tới `pokedexNumber`. Cả hai trường đều duy nhất. Audit phát hiện FK tới trường không tồn tại, không duy nhất hoặc sai kiểu. |
| `SRC-UPDATER-COUNT-CURSOR` | `findMissing` và `selectMissing` so sánh ID Pokémon và tên item/ability. `hasUpdate` dựa trên các danh sách thiếu. Các lệnh `count()` cung cấp số liệu hiển thị. |
| `SRC-DAMAGE-GEN-RULES` | Audit nhận diện nhánh `generation <= 3` dùng `LEGACY_SPECIAL_TYPES`. Unit test chạy phép tính damage cho Gen I, II, III và IV, với cả type physical và special có category hiện đại ngược lại. Phạm vi xác minh là chọn stat theo type. Công thức Special của Gen I, crit, nature, item và làm tròn theo từng thế hệ cần kiểm chứng riêng. |
| `SRC-ADMIN-WALKTHROUGH-VERSIONS` | Select CMS hiển thị `gameOptions` từ `GAME_VERSION_OPTIONS`, lấy 38 slug duy nhất từ `GENERATION_VERSIONS`. Regression test kiểm tra danh sách shared, literal `GAME_OPTIONS` và trường hợp scanner không phân giải được. |

Phase 8 đã ghi nhận cách dùng ID hỗn hợp, count metric và thay đổi CMS/damage
trong ứng dụng. Phase 9A cập nhật scanner để phản ánh mã nguồn hiện tại.
Hai cảnh báo cũ về mặc định Gen IX và type chart backend cũng vắng mặt trong
lần chạy nguồn/schema Phase 9A. Chúng đã được xử lý ở mã nguồn Phase 8.

## Regional Dex

- Legends Z-A có hai truy vấn thực tế, `lumiose-city` và `hyperspace`.
  Audit dùng cùng hàm phân giải với trang Pokédex. Fixture offline kiểm tra cả
  hai dex khớp version group và scanner vẫn báo một mismatch thực sự trong fixture.
- ORAS giữ `hoenn` để tương thích. Tham chiếu trong báo cáo Full Data cũ liên
  kết ORAS với `updated-hoenn`. Audit lưu chênh lệch tham chiếu trong finding
  `ACCEPTABLE_DESIGN` và đánh dấu các hàng lưu trữ `UNVERIFIED`. Kiểm tra
  `regionalDexes`, `DexEntry` và `gameVersions` trên staging hoặc bản sao
  backup chỉ đọc trước khi quyết định đổi slug.
- Ma trận game dùng hợp các species của những dex thực tế khi có nhiều tab.
  Kết quả này mô tả tham chiếu. Dữ liệu phục vụ bởi DB vẫn cần xác minh.

## Phát hiện còn lại

- **Thiếu nội dung đã xác nhận trong source.** Seed walkthrough thiếu Ultra Sun,
  Ultra Moon, Sword, Shield, Scarlet và Violet. Cần biên tập viên cung cấp nội dung.
  CMS trên DB có thể có dữ liệu bổ sung.
- **Thiếu WebP theo Full Data Audit đã lưu.** 42 dòng species có ít nhất một mục
  thiếu, gồm 47 mục Normal và 49 mục Shiny trong danh sách species/form. Các số
  này lấy từ `speciesCoverage` trong [audit.json lịch sử](../full-data/audit.json).
  Finding về file thiếu được giữ lại. Audit mới phân loại việc kiểm tra URL lưu
  trong DB dưới finding riêng. Số lượng asset thiếu chưa được chạy lại ở Phase 9A.
- **Mô tả tiếng Việt.** Cần nội dung biên tập và kiểm tra dữ liệu đang phục vụ.
- **Design gap.** `PokemonMove` thiếu version group, `Evolution` thiếu dữ liệu
  điều kiện lưu tại chỗ, và seed legacy dùng phạm vi ID cố định. Điều kiện tiến
  hoá từ PokéAPI có đường đọc riêng như Phase 8 đã ghi nhận. Phạm vi lưu trữ
  evolution và learnset cần quyết định sản phẩm trước khi đề xuất schema.
- **Thiết kế chấp nhận được.** Nature và type chart dùng code. Game, region,
  encounter và walkthrough dùng slug. Alternates bao gồm Gigantamax qua mô
  hình form hiện tại, ItemDex dùng catalog độc lập. Kiểm tra chất lượng slug
  thực tế thuộc bước DB chỉ đọc.
- **Hidden ability và item.** Cần rà soát khả năng lưu/đọc cờ hidden theo từng
  Pokémon. Item version group dựa vào `flavor_text_entries` trong báo cáo cũ
  nên cần đối chiếu riêng trước khi dùng làm thông tin availability.
- **Team-save.** `MovesModal.handleSave` gọi `setMoves` trên Zustand.
  Tìm kiếm thao tác GraphQL trực tiếp trong frontend chưa thấy caller cho
  `saveTeam`. Cần xác nhận yêu cầu lưu qua phiên hoặc thiết bị trước khi
  thay đổi luồng này.
- **Image URL.** Cần kiểm tra URL Normal/Shiny trên hàng thực tế và khả năng phục
  vụ WebP từ môi trường đích trước khi đề xuất migration URL.

## Thống kê có bằng chứng

Đã chạy `npm run audit -- --offline --out /tmp/pokedex-phase9-source-results`
với hai biến môi trường DB bị gỡ. Exit 0. Bảng dưới so sánh cùng phạm vi
`SCHEMA-*`, `SRC-*` và `DB-*`. Cột lịch sử lấy từ JSON đã lưu. Cột
Phase 9A lấy từ lần chạy offline mới.

| Phân loại | Full Data cũ, cùng nhóm finding | Phase 9A, nguồn/schema và trạng thái DB |
|---|---:|---:|
| CORRECT | 0 | 0 |
| INCORRECT | 4 | 0 |
| MISSING | 9 | 1 |
| DUPLICATE | 0 | 0 |
| UNSUPPORTED | 2 | 0 |
| UNVERIFIED | 11 | 9 |
| DESIGN_GAP | 0 | 3 |
| ACCEPTABLE_DESIGN | 0 | 9 |
| **Tổng** | **26** | **22** |

Bảy trong chín finding `UNVERIFIED` thuộc DB. Chuỗi tham chiếu PokéAPI
và coverage row-level đều chưa được chạy. Fix Plan offline chỉ có finding
walkthrough thiếu nội dung. Các đề xuất thiết kế được ghi riêng trong Markdown
và nằm ngoài Fix Plan và dry-run.

## Xác minh

| Gói | Lệnh | Exit | Kết quả |
|---|---|---:|---|
| Backend | `npm ci` | 0 | Cài được dependency và sinh Prisma Client. npm báo 7 advisory. |
| Backend | `npx prisma generate` | 0 | Sinh Prisma Client từ schema. |
| Backend | `npm test` | 0 | 24/24, với các biến DB bị gỡ khi gọi lệnh. |
| Backend | `npm run build` | 0 | TypeScript build. |
| Backend | `npm run audit:typecheck` | 0 | Typecheck tooling và tests. |
| Backend | `npm run test:audit` | 0 | 20/20, gồm fixtures reference offline và kiểm tra chặn truy cập DB. |
| Frontend | `npm ci` | 0 | Cài được dependency. |
| Frontend | `npm test` | 0 | 22/22. |
| Frontend | `npm run lint` | 0 | TypeScript noEmit. |
| Frontend | `npm run build` | 0 | Vite build, có cảnh báo Sass deprecation. |

**DB row-level verification: BLOCKED.** Đã xác minh đường dẫn offline, điều
kiện đồng thời `--db` và `AUDIT_DATABASE_URL`, và guard SQL read-only bằng
kiểm thử. Chưa có phiên giao dịch staging thật. Bước tiếp theo cần cache/checkpoint
xác minh được cho full audit và một kết nối staging hoặc restored backup
chỉ đọc được phê duyệt riêng cho kiểm tra row-level.
