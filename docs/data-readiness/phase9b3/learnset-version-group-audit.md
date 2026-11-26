# Learnset theo version group

Đã kiểm 665.810 dòng learnset từ Pokémon detail của 1.351 varieties.
Trong đó 609.074 dòng thuộc 22 version group của 38 game hỗ trợ. So theo
Pokémon ID, move ID, version group, method, level và enhancement level.
Kiểm move ID/tên, method được group liệt kê, level 0–100, generation ra
mắt move và bản ghi machine theo cặp move/group. Form có dữ liệu riêng;
không kế thừa tự động learnset. [Tổng hợp 32 group và số theo method](../../../pokedex-backend/audit/reports/phase9b3/learnset-groups.csv)

Không thấy key học trùng theo quy tắc trên, move reference sai, level ngoài
dải, method/group sai hoặc machine mapping thiếu ở các hàng machine đã
kiểm. Có **2.010 cặp Pokémon/version group** có game index hoặc encounter
theo slug hỗ trợ nhưng không có learnset trong group ở snapshot.
Đánh dấu `SOURCE_NOT_PROVIDED`. Game index có thể rộng hơn khả năng
thu được; một cặp thiếu group chưa đủ để kết luận move bắt buộc bị thiếu.
[Danh sách đối chiếu từng cặp](../../../pokedex-backend/audit/reports/phase9b3/learnset-discrepancies.csv)

**PARTIALLY VERIFIED.** Seed chọn phần tử cuối của `version_group_details`
và model `PokemonMove` thiếu version group. Giữ riêng level-up, machine,
egg, tutor và các method khác trong báo cáo; DB chưa cho phép so per-group.
