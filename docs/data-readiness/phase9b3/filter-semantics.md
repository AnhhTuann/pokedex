# Ngữ nghĩa filter

**PARTIALLY READY.** Kiểm theo Prisma, service, GraphQL và frontend.
Fixture kiểm predicate generation/region/game, còn row-level DB
**UNVERIFIED**.

| Bộ lọc hoặc sort | Hợp đồng hiện tại |
|---|---|
| Generation | `gen` bằng chính xác, có ưu tiên hơn `maxGen`. `maxGen` chỉ là ceiling. |
| Broad Region | Chưa có hợp đồng; một broad region có nhiều dex. |
| Exact Regional Dex | `DexEntry.regionName` cung cấp membership và number. Khi có game, Prisma còn lọc `regionalDexes`. |
| Individual Game | Với region, default được giữ và alternate cần `altFormAvailableIn`. `game` đơn lẻ chưa lọc list; default chưa bắt buộc `gameVersions`. |
| Sort National | Base National ID rồi Pokémon ID. |
| Sort Regional | Entry number kể cả 0, rồi Pokémon ID. |
| Include/exclude và exact form | Chưa có cờ include/exclude. `ids` chọn chính xác Pokémon ID khi caller biết ID. |
| Game evidence của form | Đã có inventory theo các loại bằng chứng, chưa có hợp đồng persisted hoặc query chuyên biệt. |
| Wild catchability | Không có filter riêng. Encounter cần method và version trước khi có thể dùng làm bằng chứng. |

Một row trong dex, một game index, một encounter và một learnset không
đồng nghĩa với nhau. Chưa đưa obtainability, wild catchability hoặc
transfer/event vào các bộ lọc hiện có.
