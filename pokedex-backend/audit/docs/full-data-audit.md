# Full Data Audit — phương pháp và cách đọc báo cáo

Tài liệu này mô tả lần chạy Full Data Audit trên nhánh `audit/full-data-verification`. Kết quả sinh ra nằm trong `audit/reports/full-data/`; baseline Phase 7 và các artifact Phase 8 không bị ghi đè.

## 1. Phạm vi và nguyên tắc

- **Reference/source coverage**: đối chiếu mã nguồn, schema, tài sản local và PokéAPI. Đây là bằng chứng về *thiết kế và dữ liệu tham chiếu*, không phải bằng chứng về record trong database.
- **DB coverage**: chỉ có thể khẳng định khi chạy với `--db` và `AUDIT_DATABASE_URL` trỏ tới staging hoặc restored backup. Không fallback sang `DATABASE_URL`.
- Lần chạy hiện tại **không có `AUDIT_DATABASE_URL`** → mọi mục row-level đều `BLOCKED` / `RUNTIME_UNVERIFIED`. Không có kết luận nào về số record, duplicate, orphan hay giá trị thật trong DB.
- Không chạy `prisma db push`, migrate, seed, sync, truncate, delete, deploy, merge PR; không ghi vào database.

## 2. Lệnh chạy audit

```bash
cd pokedex-backend
npm run audit -- --full --api --resume --concurrency 8 --out audit/reports/full-data
```

- `--full`: duyệt toàn bộ species ID từ PokéAPI, không dừng ở mẫu 38.
- `--resume`: đọc checkpoint theo `catalogKey`; record thiếu field full-catalog sẽ bị loại và chạy lại.
- `--concurrency 8`: giới hạn song song; client có cache đĩa, retry/backoff và xử lý `429`.
- Output: `audit.json`, `coverage.json`, `findings.csv`, `species-coverage.csv`, `game-coverage.csv`, `evidence.csv`, `manual-review.csv`, `unverified.csv`, `fix-plan.json`, `full-catalog.json`, `report.md`.
- Lần chạy đầu dừng ở timeout 120s của harness sau khi checkpoint được 743 species; đây không phải lỗi dữ liệu. Chạy lại đúng lệnh trên với timeout lớn hơn để resume các ID còn lại. Checkpoint chỉ lưu record đã có đủ field full-catalog; record cũ thiếu field bị loại và chạy lại.

## 2b. Kết quả lần chạy full

Số liệu lấy trực tiếp từ `audit/reports/full-data/audit.json` và `coverage.json`:

- 1.025/1.025 species; 1.351/1.351 Pokemon form/variety; 0 species lỗi; 0 lỗi PokéAPI.
- 38/38 game frontend đối chiếu được PokéAPI; 35 regional dex; 9 generation.
- 374 ability và 2.223 item được resolve; item có flavor text ở 14 version group.
- 599.264 move-slot learnset theo version group được kiểm tra.
- Species reference: 983 `ACCURATE`, 42 `MISSING` (thiếu WebP Normal/Shiny cho species/variety), 0 `UNVERIFIED`. 0/1.025 có mô tả tiếng Việt từ PokéAPI → đây là nhu cầu biên tập, không phải lỗi reference.
- Game reference: 29 `ACCURATE`, 6 `MISSING`, 3 `INCORRECT`.
  - `MISSING`: `ultra-sun`, `ultra-moon`, `sword`, `shield`, `scarlet`, `violet` — thiếu walkthrough.
  - `INCORRECT`: `omega-ruby`/`alpha-sapphire` map tới `hoenn` nhưng version group cần `updated-hoenn`; `legends-za` map tới `kalos-central` nhưng ứng viên là `hyperspace|lumiose-city`.
- Tổng finding: 38 = 7 `CORRECT`, 5 `INCORRECT`, 12 `MISSING`, 12 `UNVERIFIED`, 2 `UNSUPPORTED`.
- DB: 7/7 area row-level `BLOCKED` do thiếu `AUDIT_DATABASE_URL`.

Các finding `INCORRECT` về dex mapping có bằng chứng và ứng viên thay thế trong `evidence.csv`; không tự đổi mapping trong đợt audit này.

## 3. Những gì được kiểm tra

### Theo Pokémon (mọi species + varieties)

- Danh tính, generation, types, stats, abilities (kể cả hidden), chiều cao/cân nặng.
- Mọi variety/form: stats/types riêng, game indices riêng, learnset version groups riêng.
- Evolution chain và điều kiện tiến hóa (level, item, trade, friendship, time, location, gender, weather…).
- Learnset theo từng version group, với số move-slot tách theo `level-up`, `machine`, `tutor`, `egg`.
- Encounter theo version name từ `/pokemon/{id}/encounters`.
- Availability theo regional dex và theo `game_indices` của mọi form.
- Ảnh WebP Normal/Shiny có tồn tại local cho species lẫn variety.
- Ngôn ngữ flavor text; `vi` không có trong PokéAPI nên mô tả tiếng Việt là nội dung biên tập, không tự suy ra. Cột `hasVietnameseDescription` được tách riêng để trạng thái `referenceStatus` chỉ phản ánh dữ liệu PokéAPI: `MISSING` khi thiếu ảnh/form/type/stats, `UNVERIFIED` khi không có evolution chain, `ACCURATE` khi các trường reference đầy đủ.

### Theo 38 game

Ma trận `game-coverage.csv` gồm: version group, generation, regional dex, số entry dex, số species đã kiểm tra có mặt trong dex, số species có form game-index, số species có encounter, số species/move-slot có learnset theo version group, số ability theo generation, số item theo generation và theo version group, walkthrough có/không, trạng thái `ACCURATE | MISSING | INCORRECT | UNVERIFIED` cùng evidence.

Ghi chú về giải thích:

- `ACCURATE` ở đây là **reference coverage**, không phải khẳng định DB đã đúng.
- `Encounter species = 0` có thể hợp lệ (ví dụ starter không có wild encounter trong reference). Không tự động coi là lỗi.
- Item theo version group được suy từ `flavor_text_entries`; một số item không có localized text có thể bị thiếu trong thống kê này.
- Walkthrough thiếu nội dung là `MISSING` vì cần biên tập viên cung cấp; audit không tự bịa.

## 4. Nguồn và độ tin cậy

Bảng đầy đủ nằm ở `report.md` mục `0b` và `audit.json → sourceReliability`. Tóm tắt:

| Nguồn | Vai trò | Giới hạn |
|---|---|---|
| PokéAPI species/pokemon/evolution/encounter | Tham chiếu chính thức cho master data | Không nói gì về DB local hay mô tả tiếng Việt |
| PokéAPI version/version-group/dex/generation/ability/item | Tham chiếu chính thức cho game mapping | Item per-version chỉ là proxy qua flavor text |
| `public/images/**` | Bằng chứng tồn tại file local | Không chứng minh `imageUrl` trong DB trỏ tới file đó |
| `gameVersions.ts` | Ý định sản phẩm (38 game) | Phải đối chiếu PokéAPI, không tự coi là authoritative |
| `schema.prisma` | Hợp đồng cấu trúc | Không phải bằng chứng record |
| `walkthroughs.json` | Nội dung biên tập | Thiếu nội dung không tự sinh được |
| `AUDIT_DATABASE_URL` | Runtime truth, read-only | Vắng trong lần chạy này → BLOCKED |

## 5. Kế hoạch sửa an toàn

`fix-plan.json` được sắp theo đúng thứ tự yêu cầu, không apply tự động:

1. Pokemon master data
2. Forms và evolutions
3. Availability
4. Learnsets và quy tắc generation
5. Encounters
6. Moves / abilities / items
7. Images
8. Walkthrough

Mỗi finding có dry-run command, backup command, rollback command và cờ `runtimeRequired`. Với dữ liệu DB, rollback **không** replay data-only SQL; yêu cầu phục hồi full backup sang DB mới và operator đổi connection sau khi verify.

## 6. Verification đã chạy

| Lệnh | Kết quả |
|---|---|
| `pokedex-backend: npm ci` | pass (Prisma Client generated) |
| `pokedex-backend: npm test` | 24/24 pass |
| `pokedex-backend: npm run build` | pass |
| `pokedex-backend: npm run audit:typecheck` | pass |
| `pokedex-backend: npm run test:audit` | 15/15 pass |
| `npm run audit -- --full --api --limit 3 --out audit/reports/full-data-smoke` | pass, sinh đủ 11 artifact dạng full report |
| `pokedex-frontend: npm ci` | pass, 0 vulnerabilities |
| `pokedex-frontend: npm test` | 22/22 pass |
| `pokedex-frontend: npm run lint` | pass |
| `pokedex-frontend: npm run build` | pass (chỉ cảnh báo Sass `@import` deprecated) |

Không có test script nào khác được khai báo trong hai `package.json`.

## 7. Operator actions còn lại

1. Cấp `AUDIT_DATABASE_URL` read-only tới staging hoặc restored backup, rồi chạy lại `npm run audit -- --db --api --full --resume --out audit/reports/full-data-db` để thay các mục `BLOCKED` bằng kết quả row-level.
2. Cung cấp nội dung walkthrough cho các game còn thiếu và mô tả tiếng Việt nếu muốn bổ sung; không tự sinh.
3. Quyết định product/design cho learnset per-version, hidden ability flag và image URL migration trước khi sửa schema/sync.
4. Giữ nguyên PR #1, #3, #4; không merge trong đợt audit này.
