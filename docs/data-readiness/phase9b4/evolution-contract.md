# Hợp đồng evolution

Nguồn PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`, 540 cây được trích xuất ở Phase 9B-2 và audit 485 cạnh, 19 nút phân nhánh, 702 condition rows của Phase 9B-3. Evidence là cây nguồn và payload version-group; **PARTIALLY VERIFIED (reference only)**, DB **UNVERIFIED**.

Giữ thứ tự nhánh, chiều cạnh, species/form nguồn và đích. Các condition record cho một cạnh là các lựa chọn riêng theo game/version group. Trong cùng record, giữ trigger, level, item, held item, thời gian, địa điểm, friendship, gender, party, trade, region, weather, move và các yêu cầu đặc thù. Giữ khác biệt giữa null, false, zero và trường vắng. Chỉ hiển thị điều kiện đã biết cho game được chọn trên API tương lai. Runtime detail còn ghép edge và điều kiện đầu tiên; danh sách không thay đổi behavior detail trong Phase 9B-4.

Chain 250 lưu Phione (489) → Manaphy (490) với mảng điều kiện rỗng. Điều đó xác nhận cạnh tồn tại trong export và không có trigger áp dụng được từ snapshot. Phân loại đề xuất là `RELATIONSHIP_UNVERIFIED`; giữ raw edge và loại khỏi projection hướng dẫn tiến hóa sau khi owner duyệt. Bước sửa nguồn là xác định quan hệ breeding hay mislabeled edge theo game bằng bằng chứng sơ cấp, gửi correction upstream nếu phù hợp, rồi kiểm lại trên snapshot mới. Snapshot và dữ liệu legacy được giữ để đối chiếu trước khi thay đổi projection.

[Cây gốc đã trích xuất](../../../pokedex-backend/audit/reports/phase9b-coverage/evolution-chains.json) · [Từng cạnh và điều kiện](../../../pokedex-backend/audit/reports/phase9b3/evolution-conditions.json) · [Chain 250 discrepancy](../../../pokedex-backend/audit/reports/phase9b3/evolution-discrepancies.csv)
