# Kiểm toàn bộ cây tiến hóa

Đã duyệt 540 cây, 485 cạnh, 19 nút phân nhánh và 702 record điều kiện.
Kiểm liên kết species, chu trình theo đường dẫn và named reference ở các
trường condition. Giữ độ sâu, thứ tự nhánh, toàn bộ lựa chọn, version group
và form yêu cầu/kết quả. Trường null, chuỗi rỗng, false và trường không có
được giữ theo payload. Level, item, held item, time, weather, location,
friendship, gender, known move, party và trade không gộp thành một điều
kiện chung. [Các cạnh và payload đầy đủ](../../../pokedex-backend/audit/reports/phase9b3/evolution-conditions.json)

**PARTIALLY VERIFIED.** Chain 250 có cạnh tới Manaphy (490) không có
condition trong snapshot. Báo `SOURCE_NOT_PROVIDED` và giữ cạnh cùng
provenance. Không thấy named reference sai hoặc min_level ngoài dải trong
các record có điều kiện. Mô hình DB chỉ lưu cạnh và service evolution detail
đọc điều kiện đầu tiên, nên chưa biểu diễn hết lựa chọn và giới hạn theo
game. [Danh sách trường hợp cần xác minh](../../../pokedex-backend/audit/reports/phase9b3/evolution-discrepancies.csv)
