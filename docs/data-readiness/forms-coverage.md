# Độ phủ 1.351 Pokémon varieties

Snapshot `508fd7c3a7d54ac175e00afe420b11a5af983bd6`. DB **UNVERIFIED**.

Đã kiểm 1.351/1.351 Pokémon ID, một default cho mỗi species, liên kết ngược
từ Pokémon tới species và liên kết `pokemon-form.pokemon` tới đúng variety.
Không thấy ID lặp hoặc sai quan hệ. Bảng chỉ phân loại Pokémon varieties của
catalog, còn nhiều biến thể hình thức có thể nằm cùng một Pokémon ID.

| Phân loại | Số variety | Căn cứ |
|---|---:|---|
| DEFAULT_FORM | 1.025 | `pokemon-species.varieties.is_default` và Pokémon detail |
| REGIONAL_FORM | 60 | Slug có định danh Alola, Galar, Hisui hoặc Paldea |
| MEGA_FORM | 97 | `pokemon-form.is_mega` |
| GIGANTAMAX_FORM | 34 | Slug `-gmax` |
| BATTLE_FORM | 23 | Các bản ghi metadata của variety đều `is_battle_only` |
| COSMETIC_FORM | 0 xác nhận | Equal stats hoặc tên màu chưa đủ để xác minh phân loại |
| OTHER_ALTERNATE_FORM | 112 | Variety hợp lệ ngoài nhóm có căn cứ chuyên biệt |
| UNKNOWN_CLASSIFICATION | 0 | Đủ metadata để gán nhóm tổng quát |

Cả **326 alternate varieties** thiếu game index trực tiếp. Trong nhóm này,
**81** có ít nhất một encounter method ở một version cụ thể, gồm **41** có
bằng chứng wild theo tập method bảo thủ. **292** có learnset ở ít nhất một
version group. Cả **326** có version group trong metadata. Các nhóm có
giao nhau. **245** vẫn thiếu cả game index lẫn encounter method. Mọi cặp
form/game không có tín hiệu dương vẫn chưa xác minh. Không sao chép
availability của base species.

Inventory chứa type, stats, abilities, hidden flag, artwork URL của snapshot,
game evidence và nguồn theo từng variety.
[Inventory](../../pokedex-backend/audit/reports/phase9b-coverage/varieties.json)
