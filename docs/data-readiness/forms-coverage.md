# Độ phủ species và Pokemon varieties

Revision PokéAPI: `508fd7c3a7d54ac175e00afe420b11a5af983bd6`. DB row-level: **UNVERIFIED**.

Mỗi variety đã được kiểm tra ID, slug và liên kết ngược tới species. Các nhãn phân loại ngoài default dựa trên slug. Một dòng Pokémon có thể chứa các biến thể mỹ thuật ngoài phạm vi catalog Pokémon varieties. Cột Chưa xác minh của các dòng form đếm form không có game index, kể cả khi có learnset theo version group.

| Nhóm | Kỳ vọng | Tham chiếu | Thiếu | Trùng | Không hợp lệ | Chưa xác minh |
|---|---|---|---|---|---|---|
| Species | 1025 | 1025 | 0 | 0 | 0 | 0 |
| Pokémon varieties | 1351 | 1351 | 0 | 0 | 0 | 326 |
| Default | — | 1025 | — | 0 | 0 | 0 |
| Gigantamax | — | 34 | — | 0 | 0 | 34 |
| Mega | — | 97 | — | 0 | 0 | 97 |
| Other alternate | — | 135 | — | 0 | 0 | 135 |
| Regional | — | 60 | — | 0 | 0 | 60 |
