# Victini, ORAS và Legends Z-A

| Trường hợp | Snapshot và hành vi ứng dụng | Database |
|---|---|---|
| Victini | National 494, entry 0 ở original-unova và updated-unova. Backend giữ 0 bằng nullish fallback. Fixture kiểm GraphQL serialize 0, sắp xếp trước 1, thiếu entry bị loại và trang National có null. PokeCard/CatchTracker xét riêng null và undefined nên hiển thị 000. | **UNVERIFIED** |
| ORAS | Hoenn 202 cho Ruby/Sapphire/Emerald. Updated Hoenn 211 cho Omega Ruby/Alpha Sapphire trong snapshot. Query ORAS vẫn dùng Hoenn để tương thích. | **UNVERIFIED** |
| Legends Z-A | Lumiose City 232 và Hyperspace 132; helper query thực tế chọn theo tab. Snapshot giữ exact membership và numbering. | **UNVERIFIED** |

Các báo cáo theo hàng tại [phase9b3](../../../pokedex-backend/audit/reports/phase9b3)
gồm `victini.csv` (2), `oras.csv` (413) và `legends-za.csv` (364).
Chúng giữ source record và giá trị kỳ vọng của từng khóa. Hàng thực tế chỉ
được điền từ export đã phê duyệt. Việc đối chiếu phải kiểm riêng slug legacy,
membership và số thứ tự, kể cả giá trị 0.
