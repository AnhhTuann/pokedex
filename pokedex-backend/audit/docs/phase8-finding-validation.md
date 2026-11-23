# Phase 8 — Đối chiếu lại 36 finding Phase 7

Phạm vi: chỉ đọc mã nguồn tại `audit/phase8-validation@1e106ec`, schema, seed, asset local và reference PokéAPI đã cache. **Không có `AUDIT_DATABASE_URL`**, nên không finding nào được nâng lên `CONFIRMED_BUG` chỉ dựa trên code/schema.

## Kết luận tổng hợp

| Phân loại | Số finding |
|---|---:|
| `CONFIRMED_BUG` | 0 |
| `DESIGN_GAP` | 8 |
| `DATA_MISSING` | 2 |
| `RUNTIME_UNVERIFIED` | 8 |
| `ACCEPTABLE_DESIGN` | 18 |

Ba finding từng bị nghi là bug runtime đã được xác nhận là **false positive**: `SCHEMA-FK-INCONSISTENT`, `SRC-GENERATION-FALLBACK-9`, `SRC-UPDATER-COUNT-CURSOR`. Không đổi FK, không migrate, không seed lại DB.

## Bảng đối chiếu

| ID | Phân loại cuối | Lý do ngắn / hướng xử lý |
|---|---|---|
| `SCHEMA-FK-INCONSISTENT` | `ACCEPTABLE_DESIGN` | Hybrid identity có chủ đích: catalog FK tới `pokedexNumber`, user row/DexEntry tới `id`. Mọi write/read trong seed/resolver/service đều nhất quán; chưa có orphan được chứng minh. Chỉ document contract. |
| `SCHEMA-MODEL-MISSING-NATURE` | `ACCEPTABLE_DESIGN` | 25 nature là dữ liệu cố định trong FE/damage calc; không có contract DB/CMS nào hứa curation. |
| `SCHEMA-MODEL-MISSING-GAMEVERSION` | `ACCEPTABLE_DESIGN` | Slug game do `gameVersions.ts` và seed dùng chung; resolver lower-case bình thường. Gap theo game nằm ở mappingdex/learnset, không phải lỗi model. |
| `SCHEMA-MODEL-MISSING-REGION` | `ACCEPTABLE_DESIGN` | `regionalDexes String[]` + `DexEntry.regionName` được ghi/đọc cùng vocabulary. |
| `SCHEMA-MODEL-MISSING-TYPEEFFECTIVENESS` | `ACCEPTABLE_DESIGN` | Type chart do code quản lý theo generation; DB model là lựa chọn, không phải bug. Backend giờ đã hỗ trợ đối số `generation` (xem `phase8-source-fixes.md`). |
| `SCHEMA-LEARNSET-NO-VERSION` | `DESIGN_GAP` | `PokemonMove` không có `versionGroup`; seed chỉ lấy version-group detail cuối cùng. Cần nếu yêu cầu learnset per-game. Chưa có migration. |
| `SCHEMA-EVOLUTION-NO-CONDITION` | `ACCEPTABLE_DESIGN` | Cạnh evolution được lưu; điều kiện lấy live từ PokeAPI service. Cache là enhancement. |
| `SCHEMA-VARIETY-NO-GIGANTAMAX` | `ACCEPTABLE_DESIGN` | Gmax được lưu dạng form thay thế có flag; FE tách theo `isMega/isAlternative`. |
| `SCHEMA-ENCOUNTER-STRING-FK` | `ACCEPTABLE_DESIGN` | Query/write đều dùng slug chuỗi nhất quán; chuẩn hóa là tùy chọn. |
| `SCHEMA-WALKTHROUGH-UNVALIDATED-VERSION` | `ACCEPTABLE_DESIGN` | Slug sai cho kết quả rỗng, không ghi sai dữ liệu; validate là enhancement. |
| `SCHEMA-ITEM-ISOLATED` | `ACCEPTABLE_DESIGN` | ItemDex chỉ đọc field của Item, không cần relation. |
| `SRC-GENERATION-FALLBACK-9` | `ACCEPTABLE_DESIGN` | `all` chủ đích trả 9 và option UI chỉ đến từ `GENERATION_VERSIONS`; slug lạ không reachable. Đã thêm API strict để caller mới không âm thầm nhận Gen IX. |
| `SRC-SEED-HARDCODED-COUNT` | `DESIGN_GAP` | Seed legacy dùng 1025; updater chính đã dùng ID ổn định. Giữ seed cho full-reseed có kiểm soát; không dùng làm update cursor. |
| `SRC-UPDATER-COUNT-CURSOR` | `ACCEPTABLE_DESIGN` | Finding cũ đã lỗi thời: `hasUpdate` lấy từ `missing.*`, count chỉ để hiển thị. Đã thêm regression test. |
| `SRC-BACKEND-CHART-MODERN-ONLY` | `DESIGN_GAP` | Backend trước đây chỉ trả chart hiện đại. Đã thêm `matchups(generation: Int)` additive + field resolver; default vẫn modern. |
| `SRC-DAMAGE-GEN-RULES` | `DESIGN_GAP` | Công thức vẫn là Gen IV+ cho item/nature/crit. Đã sửa riêng phần physical/special Gen I–III theo type; chưa tuyên bố accurate competitive Gen I. |
| `SRC-WALKTHROUGH-COVERAGE` | `DATA_MISSING` | 795 record / 32 game; thiếu 6 slug có trong UI. Không tự bịa nội dung CMS; cần biên tập viên cung cấp hoặc ẩn option. |
| `SRC-ADMIN-WALKTHROUGH-VERSIONS` | `DESIGN_GAP` | CMS hardcode thiếu 6 option. Đã dùng danh sách chung `GAME_VERSION_OPTIONS` (38 game). |
| `SRC-NATUREDEX-STATIC` | `ACCEPTABLE_DESIGN` | Dữ liệu tĩnh trùng damage calc, không có contract curation. |
| `SRC-SAVE-TEAM-UNUSED` | `DESIGN_GAP` | Mutation tồn tại nhưng TeamBuilder dùng zustand local; cần quyết định sản phẩm trước khi wire. |
| `SRC-SEED-REMOTE-IMAGE-URLS` | `RUNTIME_UNVERIFIED` | Seed ghi remote URL, image service mới ghi local WebP. Chỉ biết chắc sau read-only DB audit. |
| `API-SPECIES-IDS-CORRECT` | `ACCEPTABLE_DESIGN` | Reference 1..1025 liên tục, khớp seed legacy. |
| `API-VERSIONS-CORRECT` | `ACCEPTABLE_DESIGN` | 38/38 slug frontend tồn tại trong PokéAPI. |
| `API-DEX-VERSION-MISMATCH` | `DESIGN_GAP` | ORAS cần `updated-hoenn`; Z-A có `lumiose-city`/`hyperspace`, không phải `kalos-central`. Đã sửa seed theo hướng additive; DB/backfill và UI fallback vẫn cần operator verify. |
| `API-DEX-SLUGS-CORRECT` | `ACCEPTABLE_DESIGN` | Mọi slug regional dex map đều tồn tại trong reference. |
| `API-GENERATION-COVERAGE-CORRECT` | `ACCEPTABLE_DESIGN` | Range seed khớp 151/100/135/107/156/72/88/96/120. |
| `API-IMAGE-SAMPLE-CORRECT` | `ACCEPTABLE_DESIGN` | 38 sample species có normal+shiny WebP; asset tổng 3.765 file. |
| `API-DESCRIPTION-LANGUAGE-COVERAGE` | `DATA_MISSING` | Seed chỉ lấy flavor text `en`; mô tả `vi` là nội dung biên tập, không tự convert. |
| `API-LEARNSET-VERSION-DETAIL` | `DESIGN_GAP` | Reference có 25–27 version group/loài nhưng schema/seed không lưu dimension. Làm chung với `SCHEMA-LEARNSET-NO-VERSION`. |
| `DB-UNVERIFIED-RECORD-COUNTS` | `RUNTIME_UNVERIFIED` | Không có DB connection; schema không phải bằng chứng row count. |
| `DB-UNVERIFIED-DUPLICATES` | `RUNTIME_UNVERIFIED` | Như trên. |
| `DB-UNVERIFIED-MISSING-FIELDS` | `RUNTIME_UNVERIFIED` | Như trên. |
| `DB-UNVERIFIED-ORPHAN-RELATIONS` | `RUNTIME_UNVERIFIED` | Hybrid FK nhất quán trong code, nhưng orphan thực tế chỉ check được bằng DB. |
| `DB-UNVERIFIED-ID-CONSISTENCY` | `RUNTIME_UNVERIFIED` | Cần đối chiếu `pokedexNumber` vs `id` trên row thật. |
| `DB-UNVERIFIED-GAME-VERSION-COVERAGE` | `RUNTIME_UNVERIFIED` | Độ phủ slug trong `Encounter`/`Walkthrough` chưa biết. |
| `DB-UNVERIFIED-WALKTHROUGH-COVERAGE` | `RUNTIME_UNVERIFIED` | JSON có 32 game nhưng DB có thể đã được CMS bổ sung. |

## Rủi ro liên quan ngoài 36 finding

`pokemon.service.ts` lọc regional theo `regionalDexes` + `isDefault` nhưng không kiểm tra `gameVersions has game`; availability có thể bị hiển thị rộng hơn thực tế. Đây là giả thuyết, cần fixture/reference + DB read-only trước khi sửa.
