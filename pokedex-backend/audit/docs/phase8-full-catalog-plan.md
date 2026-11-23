# Phase 8 — Kế hoạch kiểm toán toàn danh mục

Tài liệu này mô tả pipeline có thể chạy lại để kiểm toán **toàn bộ** danh mục PokéAPI, không chỉ 38 loài mẫu. Đây là kế hoạch triển khai và hướng dẫn vận hành; nó **không** tự động sửa dữ liệu, không ghi DB và không chạy seed/sync.

## 1. Phân biệt ba loại đếm

| Khái niệm | Nguồn | Ý nghĩa |
|---|---|---|
| Species count | `/pokemon-species?limit=...` | Số loài theo National Dex (hiện 1.025). |
| Pokemon/form count | `/pokemon?limit=...` | Số bản Pokémon/form mà PokéAPI trả về; lớn hơn species count. |
| DB row count | `COUNT(*)` trên bảng `Pokemon` | Số bản ghi thực tế trong DB; chỉ có giá trị khi chạy `--db` trên staging/backup. |

Ba con số này **không được thay thế cho nhau**. Báo cáo toàn danh mục luôn ghi cả ba (DB row count để trống nếu chưa có `AUDIT_DATABASE_URL`).

## 2. Các bước pipeline

1. **Catalog snapshot** — lấy danh sách ổn định từ `pokemon-species`, `pokemon`, `version`, `version-group`, `pokedex`, `generation`, `move`, `ability`, `item`, `type`, `nature`, `location`.
2. **Species pass** — với mỗi species ID theo thứ tự tăng dần:
   - `/pokemon-species/{id}`: tên, hệ, generation, varieties, evolution chain URL, flavor-text languages.
   - `/pokemon/{id}` (hoặc tên variety): stats, height/weight, type slots, abilities + hidden flag, move version-group details.
   - `/evolution-chain/{id}`: trigger, level, item, trade/friendship/time/known-move conditions.
   - `/pokemon/{id}/encounters`: version, location, method, level range.
   - Asset check: `public/images/pokemon/{normal,shiny}/{species-or-form-name}.webp`.
3. **Game pass** — đối chiếu 38 version slug, version group, generation và regional dex mapping.
4. **Cross-reference** — so sánh source/schema/frontend với reference; mọi phát hiện đều có `evidence` + `sources`.
5. **Report** — ghi `full-catalog.json` (deterministic) và `full-catalog.md`.

## 3. Tin cậy và an toàn

- **Cache**: mọi phản hồi HTTP được ghi tại `audit/.cache/pokeapi/` theo hash của path/URL. Xóa cache để lấy dữ liệu mới.
- **Bounded concurrency**: `PokeApiClient` dùng semaphore, mặc định 6 request đồng thời; có thể đổi bằng `--concurrency`.
- **Retry/backoff**: 3 lần thử, backoff `250ms * 2^n`, không retry 4xx (trừ 429), timeout mỗi request 12s.
- **Checkpoint/resume**: `audit/.cache/pokeapi/checkpoints/<catalog-key>.json` lưu danh sách species ID đã hoàn thành và lỗi theo ID. Chạy lại với `--resume` chỉ xử lý ID chưa xong. Mỗi species chỉ đánh dấu hoàn thành sau khi tất cả request con của nó thành công.
- **Atomic write**: checkpoint và báo cáo được ghi qua file tạm rồi rename, tránh file bị cắt khi chạy giữa chừng.
- **Deterministic**: species/version/dex được sort theo ID/tên; JSON báo cáo không chứa timestamp ngẫu nhiên; `generatedAt` chỉ nằm trong báo cáo tổng hợp có nhãn thời gian.
- **No blind overwrite**: không có thao tác ghi DB, không ghi đè file image, không thay curated walkthrough. Mọi đề xuất sửa đều nằm trong fix-plan/drift report.

## 4. Lệnh

```bash
cd pokedex-backend
npm run audit:typecheck
npm run test:audit

# Toàn danh mục, có thể mất nhiều phút; dùng cache/resume nếu bị ngắt
npm run audit -- --full --api --out audit/reports/full-catalog

# Chạy tiếp sau khi ngắt
npm run audit -- --full --api --resume --out audit/reports/full-catalog

# Chỉ dùng cache, không mạng (kiểm tra lại báo cáo đã thu thập)
npm run audit -- --full --offline --resume --out audit/reports/full-catalog

# Smoke test nhanh (không thay thế full run)
npm run audit -- --full --api --limit 3 --out audit/reports/full-smoke
```

`--full` với `--offline` chỉ đọc cache; nếu cache thiếu, mục tương ứng được báo `UNVERIFIED` thay vì đoán.

## 5. Output

- `full-catalog.json`: `{ schemaVersion, catalogKey, counts, species[], forms[], evolution[], games[], dexes[], findings[], checkpoint, apiErrors[] }`.
- `full-catalog.md`: tóm tắt số loài/form/version/dex đã kiểm tra, drift theo nhóm và danh sách finding có bằng chứng.
- `checkpoints/<catalog-key>.json`: trạng thái resume; không chứa secret.

## 6. Tiêu chí hoàn tất

Pipeline chỉ được coi là hoàn tất khi:

- `species.length === counts.species` và không có `failed` ID;
- mọi variety có bản ghi stats/types/abilities hoặc được liệt kê là `UNVERIFIED`;
- mọi version group có learnset/availability được đối chiếu hoặc ghi rõ là không có reference;
- asset normal/shiny được kiểm tra choทั้ง species và variety name;
- báo cáo deterministic khi chạy lại với cùng cache/fingerprint (so sánh hash JSON, bỏ qua thời gian).

## 7. Giới hạn

- PokéAPI là reference, không phải nguồn ghi đè; curated description tiếng Việt và nội dung CMS không tự động bị thay.
- Encounter/availability trong PokéAPI có thể thiếu ở một số game; báo `UNVERIFIED`, không suy đoán.
- Kiểm tra DB vẫn BLOCKED cho đến khi có `AUDIT_DATABASE_URL` read-only.

## 8. Kết quả smoke test Phase 8

Đã chạy trong worktree này (không chạy full 1.025 loài):

| Lệnh | Kết quả |
|---|---|
| `npm run audit -- --offline --out audit/reports/phase8-offline` | `findings=26`, `checked=9`, `unverified=11`; không mạng, không DB. |
| `npm run audit -- --api --sample 38 --out audit/reports/phase8-sample` | `findings=34`, `checked=385`, `unchecked=2262`, `unverified=12`. |
| `npm run audit -- --full --api --limit 3 --out audit/reports/phase8-full-smoke` | `findings=34`, `checked=154`, có `full-catalog.json` với checkpoint/catalogKey. |

Baseline `audit/reports/{audit.json,findings.csv,fix-plan.json,report.md}` của Phase 7 **không bị ghi đè**. Cache PokéAPI nằm ngoài Git. Chưa có full run 1.025 loài; tiêu chí hoàn tất ở mục 6 vẫn là điều kiện để chạy production audit sau này.
