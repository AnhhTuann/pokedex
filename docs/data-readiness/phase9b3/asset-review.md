# Rà soát asset thiếu và trùng byte

**PARTIALLY VERIFIED.** Kiểm lại đường dẫn Phase 9B-2 cho 47 Normal và 49
Shiny thiếu. Không có file tại đường dẫn chuẩn. Manifest giữ kỳ vọng,
Pokémon ID, path và URL ứng viên từ pinned metadata nếu có. URL chỉ là
ứng viên, chưa có phép kiểm HTTP. PokeCard có thể hiển thị Normal nếu
không có Shiny URL, hoặc placeholder khi ảnh lỗi; các trạng thái đó không
tính là đã có Shiny artwork đúng. [Manifest file thiếu](../../../pokedex-backend/audit/reports/phase9b3/missing-assets.csv)

Đã tính lại SHA-256 và size của file có trong inventory. 39 nhóm byte
trùng thuộc 92 đường dẫn. Không nhóm nào trộn Normal/Shiny. Các nhóm có
nhiều Pokémon ID khác nhau, nên xếp diện rà soát thủ công. Byte trùng có
thể do artwork dùng chung hợp lệ và chưa chứng minh gán nhầm.
[Nhóm trùng](../../../pokedex-backend/audit/reports/phase9b3/duplicate-assets.json) ·
[Ứng viên sai artwork](../../../pokedex-backend/audit/reports/phase9b3/suspected-wrong-artwork.json)

Giữ nguyên asset. Owner cần phê duyệt host để kiểm URL chỉ đọc, xem hình
theo từng nhóm và xác nhận danh sách bổ sung hoặc thay thế trước khi ghi.
