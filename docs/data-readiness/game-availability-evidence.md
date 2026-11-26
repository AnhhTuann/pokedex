# Bằng chứng availability theo game

Phạm vi nguồn là snapshot `508fd7c3a7d54ac175e00afe420b11a5af983bd6` và
hàm mapping ứng dụng tại base `f2d151c`. DB **UNVERIFIED**.

| Bằng chứng | Điều xác minh được | Giới hạn |
|---|---|---|
| `pokedex.pokemon_entries` | Membership và numbering của dex. | Không dùng để suy ra khả năng bắt hoặc có mặt ở ngoài dex. |
| `pokemon.game_indices` | Có dữ liệu index cho đúng Pokémon ID và version slug. | Có thể phản ánh dữ liệu game đánh index rộng hơn tập có thể thu được; không chứng minh obtainability. |
| `pokemon/{id}/encounters` | Location area, version, method và điều kiện được ghi cho đúng ID. | Payload rỗng chỉ cho biết snapshot không có encounter. Static, raid, gift và NPC trade giữ bằng chứng riêng. |
| `moves[].version_group_details` | Learnset có dữ liệu ở version group và method đã lưu. | Không phân biệt từng phiên bản trong cặp và không chứng minh cách có được Pokémon. |
| `pokemon-form.version_group` | Nhóm game xuất hiện trong metadata form. | Không mở rộng sang mọi game đời sau hoặc mọi game mà base species xuất hiện. |

Bộ audit lịch sử đọc encounter version ở cấp ngoài thay vì
`version_details[].version của mỗi bản ghi location`. Lần audit mới đọc nested field từ
cả 1.351 payload và ghi các method theo game. Wild là tập con bảo thủ gồm các
method được liệt kê trong script, như walk, surf và câu cá. Pikachu trong
Yellow có gift và membership Kanto. Ma trận có bằng chứng xuất hiện nhưng
không đếm Pikachu là wild trong Yellow. Alolan Raichu có NPC trade trong
Let's Go dù không có game index trực tiếp. Các ID vắng bằng chứng vẫn
**UNVERIFIED**. Toàn bộ transfer/event/trade và khả năng thu được theo điều
kiện vẫn cần đối chiếu qua nguồn cơ chế riêng, kể cả khi snapshot ghi một
số gift hoặc NPC trade.

Chi tiết theo ID nằm trong
[game-membership.json](../../pokedex-backend/audit/reports/phase9b-coverage/game-membership.json)
và [varieties.json](../../pokedex-backend/audit/reports/phase9b-coverage/varieties.json).
