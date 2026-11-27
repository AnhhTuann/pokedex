# Đối chiếu hình ảnh

Ảnh before/after được chụp bằng cùng Chrome ở 1440×900, cùng fixture, font đã tải và giảm chuyển động. So từng pixel RGB.

| Màn hình | Pixel đổi |
| --- | ---: |
| [Dark homepage trước](screenshots/before-homepage-dark.png) và [sau](screenshots/after-homepage-dark.png) | 99,801389% |
| [Light homepage](screenshots/after-homepage-light.png) | 0 |
| [Type Dex](screenshots/after-type-dex-dark.png) | 0 |
| [Team Builder](screenshots/after-team-builder-dark.png) | 0 |
| [Catch Tracker](screenshots/after-catch-tracker-dark.png) | 0 |
| [Damage Calculator](screenshots/after-damage-calc-dark.png) | 0 |

Kiểm trực tiếp ảnh tại bốn viewport, ảnh bộ lọc, hover, favorite, rail và drawer. Bài test không ghi nhận ảnh mẫu bị hỏng, lỗi JavaScript hoặc failed request rõ ràng trong các luồng homepage. Trình duyệt ghi notice Reduced Motion và 404 favicon mặc định vốn xuất hiện trên baseline. Compare phát cảnh báo kích thước khởi tạo Recharts trên cả baseline và Phase 11, sau đó SVG radar hiển thị với chiều rộng dương.

[Pixel diff JSON](results/visual-diff.json) · [Ảnh và thiết bị](responsive-qa.md) · [Console và network](browser-results.json)
