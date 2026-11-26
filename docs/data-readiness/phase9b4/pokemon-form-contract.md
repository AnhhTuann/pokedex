# Hợp đồng Pokémon form

Nguồn PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`, inventory varieties và dispositions Phase 9B-3. Bằng chứng là quan hệ Pokémon/species/form và group mechanics. Phân loại offline **REFERENCE_ONLY**; khả dụng game và DB còn **UNVERIFIED** ở các mục chưa có chứng cứ.

- `form: ALL` hoặc bỏ qua giữ mọi dòng đáp ứng các predicate khác; `DEFAULT` chọn `isDefault`; `ALTERNATE` chọn phần còn lại. `ids` chọn form ID chính xác, input rỗng trả rỗng.
- Regional, Mega, Gigantamax, battle-only và other documented forms cần metadata có nguồn. Runtime chưa có các category filter này. Không suy từ display name, ID range, asset hay generation.
- Base species quyết định generation và exact Dex membership. Ability, stats, type, artwork và evidence vẫn theo form. Membership truyền qua species để lấy số Dex; game evidence của form cần hồ sơ riêng.
- Giữ toàn bộ 245 dispositions gốc. Backlog nối theo Pokémon ID và ưu tiên 52 form có record version-specific, 131 có mechanics và chưa có version-specific, 62 chỉ có tín hiệu learnset/context. Kiểm release của mechanics, điều kiện kích hoạt, và record đối chiếu từng game trước khi nâng trạng thái. Trường hợp thiếu provenance tiếp tục để unverified.

[Backlog theo form ID](form-backlog.csv) · [Dispositions và raw signals](../../../pokedex-backend/audit/reports/phase9b3/alternate-form-evidence.csv)
