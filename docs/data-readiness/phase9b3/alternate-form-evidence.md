# Bằng chứng của 245 alternate varieties

[245 disposition theo form ID](../../../pokedex-backend/audit/reports/phase9b3/alternate-form-evidence.csv)
lấy đúng tập Phase 9B-2 có game index rỗng và không có encounter method.
Đã xác minh các blob Pokémon, encounter và Pokémon form trong tree
`508fd7c`. Dữ liệu base species và evolution chain được giữ làm bối cảnh.

| Bằng chứng | Form | Cách diễn giải |
|---|---:|---|
| VERSION_SPECIFIC_RECORD | 52 | Pokémon detail có held-item rarity dương ở version cụ thể. Đây là bản ghi riêng cho form, chưa chứng minh native availability hoặc wild catchability. |
| VERSION_GROUP_LEARNSET | 236 | Có learnset theo group; không rải bằng chứng cho mọi slug trong group. |
| GAME_SPECIFIC_MECHANIC | 155 | Metadata có Mega, battle-only hoặc trigger conditions; giữ version group và condition gốc. |
| INHERITED_BASE_SPECIES_REFERENCE | 245 | Context về base species, không truyền bằng chứng sang variety. |
| EXPLICIT_GAME_INDEX / WILD_ENCOUNTER | 0 | Không có loại bằng chứng này trong cohort. |
| TRANSFER_OR_EVENT_EVIDENCE | 0 xác nhận | Snapshot được kiểm chưa đủ để xác nhận. |

Các nhóm bằng chứng chồng lấp. 52 form được đánh dấu **PARTIALLY_VERIFIED**
ở phạm vi record theo version. 193 vẫn **UNVERIFIED** ở phạm vi game cụ thể.
Native/transfer/event/catchability của cả cohort vẫn cần bằng chứng trực tiếp
phù hợp. Kiểm từng form theo metadata và learnset, không tự suy từ tên hoặc
lịch sử của species gốc.
