# Phase 8 — Các thay đổi source đã thực hiện

Không có finding Phase 7 nào được nâng lên `CONFIRMED_BUG` sau đối chiếu (xem `phase8-finding-validation.md`). Các thay đổi dưới đây là fix/hardening cho `DESIGN_GAP` và rủi ro đã được chứng minh bằng mã nguồn/reference; tất cả đều **không ghi DB, không seed, không migrate**.

| # | Vấn đề | Thay đổi | Phạm vi an toàn |
|---|---|---|---|
| 1 | CMS walkthrough thiếu 6 option | Thêm `GAME_VERSION_OPTIONS` (38 game) trong `gameVersions.ts`; `Walkthrough.tsx` và `AdminWalkthrough.tsx` dùng chung. CMS giữ giá trị legacy nếu slug không nằm trong danh sách. | Chỉ UI; không đụng dữ liệu walkthrough. |
| 2 | Slug game lạ âm thầm thành Gen IX | Thêm `GAME_TO_GENERATION` + `getGameGenerationStrict()`. `PokemonDex` dùng strict: khi `null`, không bật filter national/max-gen. `getGameGeneration()` vẫn giữ hành vi cũ để tương thích. | Backward compatible; `all` vẫn trả 9 có chủ đích. |
| 3 | Backend chart chỉ modern-only | Backend có `GEN1_TYPE_CHART`, `GEN2_TO_5_TYPE_CHART`, `getTypeChart(generation)`, `defensiveMatchups(types, generation)`. SDL thêm `matchups(generation: Int)`; field resolver tính lại theo types của Pokemon. | Additive; client không truyền generation vẫn nhận chart hiện đại. |
| 4 | FE/BE chart có thể drift | Test backend so sánh trực tiếp 18×18 multiplier và 3 generation giữa hai package. Hiện 0 khác biệt. | Chỉ test. |
| 5 | Damage calc dùng `damageClass` hiện đại cho Gen I–III | Khi có `generation <= 3`, physical/special được quyết theo move type (`LEGACY_SPECIAL_TYPES`). Không có generation → modern rules như cũ. UI hiện chưa truyền generation nên action mặc định không đổi. | Phần fix này **không** tuyên bố mô phỏng đúng toàn bộ Gen I (item/nature/crit vẫn hiện đại). |
| 6 | ORAS/Z-A seed dex mapping | Seed thêm `updated-hoenn` cho ORAS nhưng giữ alias `hoenn`; thêm `lumiose-city`, `hyperspace`, `legends-za` vào `DEX_TO_GAMES`. Custom Z-A DexEntry và mega Z-A chuyển sang region `legends-za`, không upsert đè `kalos-central` của X/Y. | Chỉ source seed. DB hiện hữu chưa backfill; operator phải audit `DexEntry.kalos-central` trước khi seed lại. |
| 7 | Update detection bị audit mô tả sai | Giữ cơ chế ID/name-based hiện tại; thêm regression test khẳng định `hasUpdate` không so sánh local/API count. Không quay lại count-only. | Chỉ test; không đổi sync. |
| 8 | Audit tooling thiếu an toàn | CLI chỉ DB với `--db` + `AUDIT_DATABASE_URL`, từ chối `--offline --db`, redact secret, không import-side-effect; DB audit dùng transaction READ ONLY + statement timeout + SELECT guard + `take`/`LIMIT`; fix-plan bỏ hướng dẫn restore data-only SQL. | Xem phần verification bên dưới. |

## Generation chart parity

So sánh read-only normalized 18 defender × 18 attacker cho modern, Gen2–5 và Gen1: **0 khác biệt số học**. Khác biệt trước đây chỉ là thứ tự key trong một số row; test dùng `deepEqual` trên cấu trúc đã chuẩn hóa.

## Còn lại / không sửa trong Phase 8

- `SRC-WALKTHROUGH-COVERAGE`, `API-DESCRIPTION-LANGUAGE-COVERAGE`: `DATA_MISSING`, cần nội dung biên tập, không tự sinh.
- `SCHEMA-LEARNSET-NO-VERSION`, `API-LEARNSET-VERSION-DETAIL`, `SRC-SAVE-TEAM-UNUSED`: cần quyết định sản phẩm/schema trước khi đổi contract.
- `SRC-SEED-REMOTE-IMAGE-URLS` và mọi `DB-*`: BLOCKED tới khi có `AUDIT_DATABASE_URL` read-only.
- Không wire generation từ UI DamageCalculator vào `calculateDamage`; UI vẫn dùng modern rules mặc định.
