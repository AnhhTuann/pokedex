# Hợp đồng learnset

Nguồn PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`, thống kê version-group và discrepancy Phase 9B-3, đối chiếu inventory game/form Phase 9B-2. Trạng thái **PARTIALLY VERIFIED (reference only)**; cả 2.010 cặp thiếu vẫn `SOURCE_NOT_PROVIDED`; DB **UNVERIFIED**.

Giữ danh tính form, move ID, version group, learn method, level và thứ tự nguồn. Các điều kiện machine, tutor, breeding hoặc biến hình là dữ liệu riêng khi có bằng chứng. Khóa tương lai phải giữ nhiều phương thức và nhiều slot hợp lệ của cùng move. Query theo version group trả các row của group đó; dữ liệu legacy không có group chỉ có thể gắn nhãn unscoped.

Đối chiếu cho từng cặp thiếu dùng membership của base species, wild/gift/trade của đúng form và việc default form có learnset trong cùng group. Kết quả phân luồng:

| Queue | Số cặp | Quyết định cần có |
|---|---:|---|
| Scope/group mapping | 1.974 | Kiểm index chỉ xác nhận presence hay game không hỗ trợ loài, đối chiếu version → group, kiểm nhóm có payload đủ |
| Inheritance review | 23 | Kiểm cơ chế chia sẻ learnset của đúng form và group; chỉ cho phép fallback có rule và provenance |
| Source gap with Dex context | 13 | So nguồn game/group và record Pokémon/move để xác định thiếu nguồn hay legitimately no learnset |
| Acquisition-evidence priority | 0 | Kiểm trước nếu phát hiện encounter wild/gift/trade hỗ trợ trực tiếp |

Phân bố 651 Let's Go, 514 Legends Arceus, 478 Legends Z-A, 342 BDSP, 23 Sword/Shield, một Emerald và một FRLG. Baseline đếm 665.810 slot trên 32 groups, 609.074 slot thuộc 22 groups hỗ trợ. Việc có cặp thiếu trong group đã có slot cho các Pokémon khác chưa đủ để xác nhận gap hay absence. Gắn `LEGITIMATE_ABSENCE`, `SOURCE_INCOMPLETE`, `VERIFIED_INHERITANCE`, `MAPPING_ERROR` hoặc `MISSING_RECORD` sau khi từng cặp có source cụ thể. Không bổ sung move/level bằng suy đoán.

[Backlog từng cặp](learnset-backlog.csv) · [Phương thức và thống kê theo group](../../../pokedex-backend/audit/reports/phase9b3/learnset-groups.csv) · [Record nguồn theo cặp](../../../pokedex-backend/audit/reports/phase9b3/learnset-discrepancies.csv)
