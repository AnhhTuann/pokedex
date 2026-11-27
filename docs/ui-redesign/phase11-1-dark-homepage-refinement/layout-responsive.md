# Layout responsive

Dark homepage tận dụng toàn bộ vùng sau sidebar đến tối đa 1720 px, với gutter 14–30 px. Desktop/tablet dùng `repeat(auto-fill, minmax(178px, 1fr))` và gap 14 px. Mobile dùng hai cột và gap 10 px. Hero, tìm kiếm, toolbar và grid dùng chung trục. Vùng artwork riêng, tên tối đa hai dòng và khu vực info có chiều cao tối thiểu.

| Viewport | Cột | Rộng grid | Kích thước thẻ mẫu | Ảnh |
| --- | ---: | ---: | ---: | --- |
| 1920×1080 | 8 | 1.644 px | 193×298 | [Desktop lớn](screenshots/homepage-1920.png) |
| 1440×900 | 6 | 1.175 px | 184×298 | [Desktop](screenshots/homepage-1440.png) |
| 1214×1280 | 5 | 957 px | 180×298 | [Viewport tham chiếu](screenshots/homepage-1214.png) |
| 768×1024 | 3 | 740 px | 237×298 | [Tablet](screenshots/homepage-768.png) |
| 390×844 | 2 | 362 px | 176×251 | [Mobile](screenshots/homepage-390.png) |

Số đo được làm tròn từ bounding box. Playwright kiểm tra không tràn ngang, khoảng cách giữa số Dex và tim, chiều cao nhất quán trong mẫu 12 thẻ mỗi viewport, ảnh tải xong và trạng thái reduced motion. Tablet/mobile kiểm tra đóng drawer qua Escape và trả focus về Menu. Desktop kiểm tra rail. Ở 1214 px, trang đầu có hàng cuối 4 thẻ, giữ nguyên 24 form như hợp đồng.

[Sidebar thu gọn](screenshots/sidebar-collapsed.png) · [Drawer mobile](screenshots/mobile-drawer.png) · [Số đo JSON](browser-results.json)
