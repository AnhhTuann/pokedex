# Bố cục homepage

Hero dùng artwork Pikachu WebP local qua helper `assetUrl` và motif Pokéball tạo bằng CSS. Cụm tìm kiếm đặt trước Type và Generation. Region, Exact Dex, Form và Game evidence vẫn hiện theo ngữ cảnh cũ. Dropdown Type và Generation giữ thao tác qua bàn phím và nút xóa. Các select còn lại dùng giao diện hệ điều hành.

Thanh bộ sưu tập gom All Pokémon, Favorites, Compare, các tab Dex theo phiên bản và tổng kết quả. Thứ tự gốc của Reference API được giữ xuyên suốt phân trang. Baseline có thứ tự mặc định và lưới, vì vậy không thêm state hay điều khiển sorting/grid-list.

Header giữ các nút game, Shiny, minigame, hồ sơ và theme. Sidebar thu gọn thành rail icon trên desktop. Drawer mobile đưa focus vào mục đang chọn, giới hạn Tab trong menu và trả focus về nút Menu khi Escape. Người dùng mở chi tiết và Compare qua cùng thao tác thẻ và cùng modal trước đây.

[Ảnh bộ lọc](screenshots/filters-applied.png) · [Ảnh rail](screenshots/sidebar-collapsed.png)
