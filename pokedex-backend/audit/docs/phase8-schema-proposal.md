# Phase 8 — Đề xuất thiết kế schema (chưa áp dụng)

Đây là **đề xuất**, không phải migration. Không có lệnh `prisma migrate`, `db push`, seed hay ghi dữ liệu nào được thực hiện trong Phase 8.

## Nguyên tắc

- Ưu tiên bổ sung (`additive`) trước, giữ tên bảng/cột cũ tương thích GraphQL hiện tại.
- Dùng stable ID từ PokéAPI (`speciesId`, `pokemon form id`) làm khóa đối chiếu; `Pokemon.id` trong DB hiện tại vẫn là surrogate key nội bộ.
- Không tự động đổi FK `pokedexNumber` sang `id` khi chưa chứng minh được orphan/mapping sai trên DB thật.
- Mọi bước cut-over phải có snapshot DB, dry-run diff, validation và rollback vào DB mới.

## 1. Species và forms

Hiện tại `Pokemon` vừa đóng vai species vừa đóng vai form, còn `PokemonVariety` lưu form dạng tên/free-text.

Đề xuất bổ sung:

- `Species` (`pokedexNumber` unique, `name`, `generation`, `isDefault`, `evolvesFromSpeciesId?`) là danh tính loài.
- `PokemonForm` (`apiFormId` unique, `speciesId -> Species.pokedexNumber`, `name`, `isDefault`, `height`, `weight`, `stats`, `types`, `abilities`).
- `FormImage` (`formId`, `kind` = NORMAL|SHINY, `path`, `source`, `validatedAt`) để tách asset khỏi URL tự do.

Giữ `Pokemon` làm compatibility view/alias trong giai đoạn đầu; backend có thể đọc `Pokemon` trong khi sync mới ghi `Species`/`PokemonForm`.

## 2. Version và VersionGroup

- `VersionGroup` (`slug` unique, `generation`, `apiId`).
- `Version` (`slug` unique, `versionGroupId -> VersionGroup.id`, `apiId`, `displayName`).
- Bảng ánh xạ `LegacyVersionSlug` nếu cần tương thích tên slug hiện tại của frontend/CMS.

Điều này thay thế việc dùng chuỗi tự do ở `Encounter.versionName`, `Walkthrough.gameVersion`, `Pokemon.gameVersions` bằng FK có validation, nhưng vẫn cho phép slug cũ tồn tại trong một bảng compatibility.

## 3. Regional Dex

- `RegionalDex` (`slug` unique, `generation`, `versionGroupId?`, `displayName`).
- `RegionalDexEntry` (`dexId`, `speciesId`, `entryNumber`, `formId?`, unique `[dexId, speciesId]`).

Thay cho `Pokemon.regionalDexes String[]` và `DexEntry` hiện tại (đang trỏ tới `Pokemon.id`). Dữ liệu cũ được backfill từ seed/config đã kiểm chứng, không tự động ghi đè.

## 4. Learnset theo version group

Thay `PokemonMove` hiện tại (không có version dimension) bằng:

- `Move` giữ nguyên nhưng bổ sung `apiId`.
- `PokemonFormMove` (`formId`, `moveId`, `versionGroupId`, `learnMethod`, `level`, `order`, `apiDetailKey`).
- Unique khóa tự nhiên gồm form + move + versionGroup + learnMethod + level/order.

Điều này cho phép trả lời “move X học được ở game nào, cấp mấy” mà không xóa lịch sử learnset của game khác.

## 5. Evolution requirement

- `Evolution` (`fromSpeciesId`, `toSpeciesId`, `trigger`, `minLevel?`, `heldItemId?`, `timeOfDay?`, `friendship?`, `knownMoveId?`, `locationId?`, `gender?`, `formCondition?`).
- Unique `[fromSpeciesId, toSpeciesId, trigger]` để tránh duplicate khi re-sync.

PokeAPI evolution chain có thể có nhiều nhánh/condition; không nên ép vào cột `fromPokemonId/toPokemonId` đơn thuần nếu muốn hỗ trợ Gen VIII–IX.

## 6. Encounter và availability

- `Encounter` (`formId`, `versionId`, `locationId`, `method`, `minLevel`, `maxLevel`, `chance`, `apiId`).
- `GameAvailability` (`formId`, `versionId`, `source` = POKEAPI|CURATED|DERIVED, `verifiedAt`) để phân biệt dữ liệu có bằng chứng và dữ liệu suy luận.

Không suy availability chỉ từ generation của species.

## 7. Game mechanics

- `TypeEffectivenessRule` (`generation`, `attackingType`, `defendingType`, `multiplier`) thay cho chart hardcode ở backend/frontend.
- `BattleRuleSet` (`generation`, `physicalSpecialByType`, `gen1SpecialRule`, `criticalRuleVersion`, `sourceReference`) cho damage calculator.
- `Nature` (`name`, `increasedStat`, `decreasedStat`) nếu muốn đưa NatureDex vào DB; việc giữ hardcoded 25 nature là **acceptable design** nếu không có yêu cầu curation.

## 8. Migration trình tự đề xuất (khi được phê duyệt)

1. Snapshot đầy đủ staging/backup; xác nhận rollback target là DB mới.
2. Tạo bảng danh mục (`VersionGroup`, `Version`, `RegionalDex`, `Species`, `PokemonForm`, `Move.apiId`) — additive.
3. Backfill từ PokeAPI snapshot đã audit + source config; chạy dry-run diff, không overwrite curated rows.
4. Tạo bảng chi tiết (`PokemonFormMove`, `FormImage`, `GameAvailability`, `TypeEffectivenessRule`, `EvolutionRequirement`).
5. Cập nhật resolver/service để đọc bảng mới với fallback compatibility.
6. Chạy audit `--db` lại, so sánh aggregate trước/sau.
7. Chỉ sau khi operator phê duyệt mới考虑 đổi FK/cột cũ; mỗi bước có migration可逆 và backup riêng.

## 9. Không làm trong Phase 8

- Không đổi `DATABASE_URL`, không tạo migration file phải chạy ngay.
- Không xóa `Pokemon`, `UserPokemon`, `TeamSlot`, `DexEntry`, `Walkthrough`.
- Không gán user ID cố định, không đụng auth/admin policy.
- Không coi PokéAPI là nguồn ghi đè nội dung tiếng Việt/CMS.
