# QA hình ảnh trong Chrome

Ảnh before/after dùng chung Chromium, fixture chỉ đọc, font đã tải và chế độ giảm chuyển động. Kiểm trực tiếp desktop, viewport tham chiếu, tablet, mobile, thẻ hover và favorite. Thân thẻ graphite, sắc độ tập trung trong artwork và badge. Lưới tận dụng chiều ngang và giữ được vùng ảnh riêng.

| Cảnh | Trước | Sau |
| --- | --- | --- |
| Dark 1214×1280 | [Phase 11](screenshots/before-homepage-reference.png) | [Phase 11.1](screenshots/after-homepage-reference.png) |
| Dark 1440×900 | [Phase 11](screenshots/before-homepage-dark.png) | [Phase 11.1](screenshots/after-homepage-dark.png) |
| Light 1440×900 | [Phase 11](screenshots/before-homepage-light.png) | [Phase 11.1](screenshots/after-homepage-light.png) |

So RGB từng pixel xác nhận Light homepage, Type Dex, Team Builder, Catch Tracker và Damage Calculator trùng baseline ở viewport 1440×900. Move Dex, Detail, Compare, tracker, team và các điểm vào khác cũng được chạy qua suite hiện có. Console có notice Reduced Motion, 404 favicon mặc định và cảnh báo kích thước ban đầu của Recharts đã xuất hiện trên baseline. Radar vẫn render với chiều rộng dương. Suite homepage không ghi nhận page error, failed request được Playwright theo dõi hoặc ảnh tải xong bị hỏng trong mẫu.

[Ảnh lọc](screenshots/filters-applied.png) · [Hover](screenshots/card-hover.png) · [Favorite](screenshots/favorite.png) · [Sau phân trang](screenshots/pagination-after.png) · [Pixel diff](results/visual-diff.json)
