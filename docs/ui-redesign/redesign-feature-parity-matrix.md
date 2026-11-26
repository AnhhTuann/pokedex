# Ma trận đối chiếu Phase 10

| Route hoặc thành phần | Hợp đồng cần giữ | Đối chiếu |
| --- | --- | --- |
| `/` | Reference list, search, type/gen, broad region, exact Dex, game, form/evidence, tabs, Favorites, Compare, count và pagination | Kiểm thao tác ở ba viewport, bao gồm số vùng 000 và Z-A. |
| Pokémon card | Cache và màu từ artwork/hệ, hai theme, thay đổi artwork Shiny, thứ tự ID vùng/National, Mega, yêu thích và so sánh | Kiểm màu nền, nút và fallback ảnh. |
| Pokémon detail | Reference detail, type hero, stats/BST, matchups, form ID, game evidence, moves đúng group, voice và đội | Kiểm từng section, mở điều kiện, đổi form và Shiny, giữ trạng thái unknown. |
| Compare | Hai bộ stats, người thắng, artwork/hệ và radar | Chọn hai form, kiểm radar và đóng modal. |
| Header/sidebar | 11 module, trạng thái route, dashboard/login, picker nhóm 38 game và màu đôi, Shiny, theme, mini-game | Kiểm cả drawer và toggle desktop, mở picker ở ba viewport. |
| `/tracker` | Form pagination, scope, tìm kiếm/tiến độ, xác nhận Mark Current và persistence | Dùng storage hồ sơ Playwright độc lập. |
| `/moves` | Tìm kiếm, thế hệ, hệ, damage class và chi tiết | Kiểm filter và dữ liệu khi API cung cấp. |
| `/types` | Hai selector, hệ số phòng thủ/tấn công, màu badge | Kiểm chọn hai hệ và bảng kết quả. |
| `/teambuilder` | Sáu slot, ability/move/item/nature và quản lý đội | Kiểm layout và đội cục bộ. |
| `/abilities`, `/items`, `/locations`, `/natures` | Giữ route và tương tác từng module | Kiểm render và trạng thái API. |
| `/calculator`, `/walkthrough` | Giữ tính toán và trình đọc hướng dẫn | Kiểm render và hành vi có thể chạy cục bộ. |
| `/login`, `/register`, `/dashboard`, `/admin/walkthrough` | Giữ form, chuyển hướng, bảo vệ xác thực và CMS | Kiểm route và quyền với phiên ẩn danh. |


Hai bộ Playwright kiểm trên ba viewport. Bộ Phase 9C kiểm phân trang, lọc vùng và exact Dex, hai Dex Z-A, ảnh thiếu và tiến độ Tracker sau reload. Bộ Phase 10 kiểm màu thẻ, bộ lọc hệ/thế hệ/form/evidence, Favorites ẩn danh, Shiny, modal chi tiết/Compare, game picker 38 lựa chọn, mini-game, Type Dex và chọn thành viên Team Builder. Kết quả xác minh, ảnh và giới hạn API nằm trong [báo cáo QA](visual-qa.md).
