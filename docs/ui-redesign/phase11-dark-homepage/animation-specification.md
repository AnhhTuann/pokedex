# Chuyển động

| Tương tác | Hành vi |
| --- | --- |
| Mở route | Giữ transition route Motion của ứng dụng |
| Card mới | 220 ms ease-out với translate 5 px và opacity, stagger 24 ms trong tối đa 7 bước |
| Hover | Nâng 4 px, scale artwork 1.045, sáng viền và bóng nền trong khoảng 180–190 ms |
| Favorite | Tim tăng kích thước nhẹ, 220 ms, giữ màu coral khi chọn |
| Dropdown Type/Generation | 140 ms, opacity và translate 4 px, menu absolute |
| Load More | Dùng trạng thái loading của nút hiện có, nối các thẻ mới vào lưới |
| Reduced motion | Bỏ animation card, dropdown và skeleton, bỏ lift/scale. Trạng thái chọn, outline focus và màu sắc vẫn hiện. |

Các transition mới dùng CSS và media query của hệ điều hành. Không thêm thư viện.
