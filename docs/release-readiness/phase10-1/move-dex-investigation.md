# Move Dex

Lỗi thấy trong Phase 10 là **A + E**. Query `GetAllMoves` đúng SDL. Fixture chỉ đăng ký Reference API và `me`, nên trường non-null `getAllMoves` trả lỗi GraphQL. Resolver của ứng dụng chuyển tiếp đến `moveService`, vốn gọi `prisma.move.count` và `findMany`. Catalog ghim mô tả các slot learnset, thiếu danh mục move đầy đủ và các trường cần cho Move Dex. Không dùng slot để chế tạo dữ liệu Move Dex.

Phát hiện thêm **F**. UI gọi phương thức chuỗi trực tiếp trên `damageClass` nullable trong hợp đồng GraphQL. UI nay hiển thị `Unknown` cho category, Power, Accuracy hoặc PP thiếu. Yêu cầu phân trang trùng cùng bộ lọc được chặn trong lúc đang tải. Lỗi tải trang sau giữ danh sách và cho thử lại.

Backend mock repository kiểm cả where cho count và fetch, sắp xếp tên và offset. Chromium dùng mock GraphQL được gắn nhãn tường minh để kiểm bộ lọc thế hệ, hệ, damage class, search, drawer, giá trị thiếu và lỗi phân trang trên cả ba viewport. Fixture nguyên bản giữ trạng thái lỗi đúng giới hạn. Đường Prisma thực tế **UNVERIFIED**.
