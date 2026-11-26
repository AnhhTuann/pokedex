# Phase 9B — Kết quả tái dựng và độ phủ dữ liệu

**Snapshot VERIFIED_FOR_RECONSTRUCTION.** Bộ tham chiếu dựng từ
`508fd7c3a7d54ac175e00afe420b11a5af983bd6` khớp toàn bộ đối tượng `reference`
lịch sử khi replay bằng mã audit tại `8990cc6`. Audit hiện tại chạy offline,
tạo checkpoint `96eefac660020c90`, hoàn thành 1.025 species, kiểm 1.351
varieties, 35 Pokédex và 38 version hỗ trợ, với 0 lỗi nguồn và 0 species thất
bại. [Provenance và hướng dẫn tái lập](source-provenance.md) ·
[Đối chiếu chi tiết](data-integrity-findings.md)

## Trạng thái theo hạng mục

Các nhãn dưới đây đánh giá bộ tham chiếu và khả năng biểu diễn của ứng dụng.
Mức READY cho Generation áp dụng cho việc chuẩn bị triển khai filter từ source
và reference. Dữ liệu thực tế của mọi hạng mục vẫn **UNVERIFIED**.

| Hạng mục | Trạng thái | Bằng chứng và phần còn mở |
|---|---|---|
| Generation | READY | Đủ 1.025 species, các danh sách của 9 generation khớp các hàng species. [Ma trận](generation-coverage.md) |
| Region | PARTIALLY READY | Đủ 35 dex và numbering. Cần xử lý số 0 trong query, xác minh ORAS và phân biệt region với dex. [Ma trận](regional-dex-coverage.md) |
| Individual Game | PARTIALLY READY | Đủ 38 slug và version group. Membership của dex chưa chứng minh game availability; query cần kiểm riêng dữ liệu theo game. [Ma trận](game-version-coverage.md) |
| Forms | PARTIALLY READY | Đủ 1.351 varieties và quan hệ species; 326 alternate varieties thiếu game index trực tiếp. [Ma trận](forms-coverage.md) |
| Assets | PARTIALLY READY | 1.341 Normal và 1.339 Shiny giải mã được. Thiếu 47 Normal và 49 Shiny. URL phục vụ thực tế chưa xác minh. [Ma trận](asset-coverage.md) |

Các ma trận nêu revision, expected, actual, missing, duplicate, invalid và
unverified theo phạm vi từng phép kiểm. [Đề xuất kiến trúc](proposed-data-architecture.md)
ghi rõ năng lực model hiện có và các điểm cần xác nhận trước khi thay đổi.

## Output và kiểm thử

- Output audit đầy đủ trong worktree tại
  `pokedex-backend/audit/reports/phase9b-reconstructed-508fd/`. Có
  `audit.json`, `full-catalog.json`, `coverage.json`, CSV và `report.md`.
  Các CSV dựng thêm chứa entry numbers từng dex, form/version evidence
  và trạng thái giải mã từng ảnh.
- Audit hiện tại ghi tổng 35 finding, gồm 7 CORRECT, 3 MISSING, 11 UNVERIFIED,
  4 DESIGN_GAP và 10 ACCEPTABLE_DESIGN. Bảy mục UNVERIFIED thuộc phạm vi
  DB. Phát hiện riêng về Victini số 0 và thiếu bằng chứng game index nằm
  trong [đối chiếu dữ liệu](data-integrity-findings.md).
- Manifest đủ 7.704 dòng request và cache nằm ngoài Git. Tài liệu cùng
  hai script tái lập được lưu trong nhánh Phase 9B. Báo cáo đầy đủ và CSV
  chi tiết được để trong worktree, có thể tái sinh bằng hướng dẫn provenance.

| Kiểm tra | Kết quả |
|---|---|
| Dựng và kiểm checksum cache, audit offline, deep comparison và ma trận | Exit 0 |
| Backend `npm ci`, `npm run audit:typecheck`, `npm run build` | Exit 0 từng lệnh |
| Backend `npm test` và `npm run test:audit` | Exit 0, 24/24 và 20/20 |
| Frontend `npm ci`, `npm run lint`, `npm run build` | Exit 0 từng lệnh |
| Frontend `npm test` | Exit 0, 22/22 |

Backend `npm ci` sinh Prisma Client và báo 7 advisory. Vite build phát
cảnh báo Sass deprecation.

Worktree Phase 9B được tạo từ `c203e7ecb8f8079f516bf71adad12f694d84ef64`.
`main` giữ nguyên tại `c6a55b5ca0f5af3af042de6e12af42caa18205e4`
cùng thư mục audit chưa được Git theo dõi. Không dùng PokéAPI live để bù cache,
không truy cập DB, seed, sync, migrate, deploy hoặc sửa UX. Bước xác minh
row-level cần phê duyệt riêng cho staging hoặc restored backup chỉ đọc.
