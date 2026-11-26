# Kiểm kê giao diện Elite Pokédex

Đối chiếu nguồn lịch sử `c6a55b5` với nền Phase 9C `b0cc98d`, gồm App, MainLayout, SearchBar, PokeCard, colorExtractor, CompareModal, Pokémon detail và các SCSS Module đi kèm.

| Phạm vi | Hành vi và trạng thái cần giữ |
| --- | --- |
| Khung ứng dụng | Sidebar thu gọn trên desktop, drawer trên thiết bị nhỏ, logo Poké Ball, icon và mục đang chọn, màu nhấn theo route, chuyển sáng/tối, Shiny, mini-game đoán Pokémon, Login hoặc Dashboard, thông báo cập nhật. |
| Bộ chọn game | Tất cả phiên bản, 38 game theo thế hệ, màu riêng, cặp màu chia đôi, game hiện hành, đóng qua nút hoặc nền. |
| Pokédex | Tìm theo tên/số National, lọc hệ và thế hệ, xoá bộ lọc nhanh, All, Favorites kèm số lượng, Compare chọn tối đa hai, bỏ chọn, Regional/National, Lumiose/Hyperspace, số kết quả, tải thêm, skeleton, rỗng và lỗi. Phase 9C thêm broad region, exact Dex, form category và evidence theo game. |
| Thẻ Pokémon | Artwork thường/Shiny, National ID, số vùng kể cả 000, category, badge hệ và Mega, yêu thích, viền đang so sánh và làm mờ thẻ khác. Hover nâng thẻ, artwork phóng nhẹ và nổi, vệt sáng. |
| Màu thẻ | Canvas 30×30, loại pixel trong suốt/trắng/tối, nhóm RGB, chấm điểm theo tần suất/chroma và hue hệ chính, cache theo ảnh+hệ, fallback pastel theo hệ và bảng sáng/tối. |
| Chi tiết | Hero theo hệ chính, ID/tên/category/badge, Shiny cục bộ theo trạng thái toàn cục, vòng Mega xoay, thêm/xoá đội, chiều cao/cân nặng, abilities và Hidden, sáu thanh màu và BST, type matchups, form chính/các form khác, loading và lỗi. |
| Tiến hoá | Lịch sử có nút Pokémon và mũi tên kết nối. Phase 9C thay bằng điều kiện có phiên bản, trigger và chi tiết mở rộng. Cần hiển thị hai thành phần dựa trên cạnh được chứng thực. |
| Voice và learnset | Read Entry, Pause/Resume, Stop, cry và sóng âm dùng màu hệ. Learnset có Level/Machine/Tutor/Other, tên, cấp, hệ, damage class, Power/Accuracy khi có. Phase 9C trả về các slot cô lập theo version group, thiếu metadata thì hiển thị rõ. |
| So sánh | Hai artwork và badge hệ, thống kê từng bên, dấu thắng, radar với tooltip/legend, đóng qua nút hoặc nền. |
| Move Dex và Type Dex | Move Dex giữ tìm kiếm, thế hệ, hệ, damage class, phân trang, detail Power/Accuracy/PP. Type Dex giữ hai hệ, chế độ phòng thủ/tấn công, weakness/resistance/immunity và chip hệ. |
| Catch Tracker và Team Builder | Tracker giữ scope, tìm kiếm, tiến độ, toggle caught, Mark Current + xác nhận, lưu tiến độ, phân trang toàn bộ form. Team Builder giữ sáu slot, chọn và quản lý Pokémon, sắp xếp, ability, move, item, nature, đề xuất và quản lý đội. |
| Các module khác | Ability, Item, Location, Nature Dex giữ tìm kiếm/lọc và thông tin chi tiết hiện có. Calculator giữ cấu hình hai bên và kết quả. Walkthroughs giữ chọn game, mục lục, nội dung và tải về. Login/Register, Dashboard và Admin giữ xác thực, điều hướng, quản lý nội dung và các trạng thái phát sinh. |
| Artwork | Phase 9C có trạng thái thiếu ảnh tường minh. Tuyến reference cần giữ chính xác form và variant, kể cả khi một ảnh bị thiếu. |
