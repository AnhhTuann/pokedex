# Phase 10 · Giao diện và kiểm tra

Phase 10 dựa trên `b0cc98d8bb61760237e953ce64e8608d5c6a2077`. Tham chiếu UI lịch sử là `c6a55b5ca0f5af3af042de6e12af42caa18205e4`.

[Kiểm kê UI lịch sử](legacy-ui-feature-inventory.md) · [Ma trận đối chiếu](redesign-feature-parity-matrix.md)

## Hệ thống giao diện

- Crimson dùng cho thương hiệu, thanh đầu trang và thao tác chính. Theme sáng dùng nền xám ấm và bề mặt trắng. Theme tối dùng nền graphite và bề mặt charcoal. Các token chung bao gồm typography, màu chữ và nền, khoảng cách, border, bán kính, đổ bóng, trạng thái focus và tương tác.
- Sidebar dùng màu nhấn riêng của module. Bộ chọn game giữ nguyên 38 lựa chọn, nhóm theo thế hệ và chia hai màu ở các cặp. Tiêu đề game đã chọn được đánh dấu trong cặp và trong danh sách.
- Thẻ tiếp tục dùng mẫu canvas 30×30, phân nhóm RGB, chấm điểm chroma và thiên lệch hue hệ chính, cache theo URL và hệ, cùng fallback pastel theo hệ. Gradient thay đổi theo artwork và theme. Khi chuyển Shiny, màu từ ảnh trước không áp cho ảnh mới. Motion giảm khi người dùng bật reduced motion.
- Chi tiết lấy cạnh tiến hóa từ Reference API và nối thành từng nhánh. Mỗi điều kiện mở rộng hiển thị nhóm phiên bản và nguồn. Form giữ ID chính xác. Compare dùng đúng ID form từ Reference API và giữ radar, các giá trị riêng và dấu thắng.
- Thẻ, chi tiết, tiến hóa, form, Compare và Team Builder dùng chung trạng thái thiếu Normal/Shiny. Learnset tiếp tục dùng các slot cô lập theo version group. Type, damage class, Power và Accuracy hiển thị thiếu khi projection không cung cấp, vì schema reference không gửi các trường đó.
- Các thay đổi React và SCSS nằm trong `pokedex-frontend`. Không có thay đổi backend, Prisma, catalog, asset nhị phân hoặc quyền truy cập dữ liệu.

## Ảnh Playwright

| Giao diện | Desktop 1440×900 | Tablet 768×1024 | Mobile 390×844 |
| --- | --- | --- | --- |
| Pokédex sáng | [Ảnh](screenshots/pokedex-desktop-light.png) | [Ảnh](screenshots/pokedex-tablet-light.png) | [Ảnh](screenshots/pokedex-mobile-light.png) |
| Pokédex tối | [Ảnh](screenshots/pokedex-desktop-dark.png) | [Ảnh](screenshots/pokedex-tablet-dark.png) | [Ảnh](screenshots/pokedex-mobile-dark.png) |
| Chi tiết Pokémon | [Ảnh](screenshots/pokemon-detail-desktop.png) | [Ảnh](screenshots/pokemon-detail-tablet.png) | [Ảnh](screenshots/pokemon-detail-mobile.png) |
| Compare | [Ảnh](screenshots/compare-desktop.png) | [Ảnh](screenshots/compare-tablet.png) | [Ảnh](screenshots/compare-mobile.png) |
| Bộ chọn game | [Ảnh](screenshots/game-selector-desktop.png) | [Ảnh](screenshots/game-selector-tablet.png) | [Ảnh](screenshots/game-selector-mobile.png) |
| Type Dex | [Ảnh](screenshots/types-desktop.png) | [Ảnh](screenshots/types-tablet.png) | [Ảnh](screenshots/types-mobile.png) |
| Move Dex | [Ảnh](screenshots/moves-desktop.png) | [Ảnh](screenshots/moves-tablet.png) | [Ảnh](screenshots/moves-mobile.png) |
| Catch Tracker | [Ảnh](screenshots/tracker-desktop.png) | [Ảnh](screenshots/tracker-tablet.png) | [Ảnh](screenshots/tracker-mobile.png) |
| Team Builder | [Ảnh](screenshots/teambuilder-desktop.png) | [Ảnh](screenshots/teambuilder-tablet.png) | [Ảnh](screenshots/teambuilder-mobile.png) |

## Tái chạy

Chạy `node --import tsx tests/fixtures/reference-server.ts` trong backend. Fixture dùng catalog thật và static assets của repo. Chạy `VITE_GRAPHQL_API_URL=/graphql VITE_BACKEND_URL=http://127.0.0.1:3199 npm run dev -- --host 127.0.0.1 --port 5199` trong frontend. Sau đó chạy các lệnh dưới đây trong frontend.

```sh
npm run test:browser
node tests/browser/premium-red.e2e.mjs
```

Đặt `PHASE9C_CHROME` nếu binary Chromium nằm ở vị trí khác `/usr/bin/google-chrome-stable`. Có thể đặt `PHASE9C_ORIGIN` để đổi địa chỉ Vite.

## Kết quả kiểm tra

| Lệnh | Kết quả |
| --- | --- |
| Frontend `npm ci --offline --cache /home/tuan/.npm` | Thành công |
| Frontend `npm run lint` | Thành công |
| Frontend `npm test` | 27/27 |
| Frontend `npm run build` | Thành công |
| Backend `npm ci --offline --cache /home/tuan/.npm` và `npx prisma generate` | Thành công |
| Backend `npm test` | 31/31 |
| Backend `npm run build` | Thành công |
| Playwright `node tests/browser/premium-red.e2e.mjs` | Desktop, tablet và mobile đạt |
| Playwright `npm run test:browser` | Desktop, tablet và mobile đạt |

## Phạm vi chưa xác minh

- Fixture không có resolver Prisma cho Move Dex hoặc dữ liệu chỉnh sửa đội phụ thuộc truy vấn cũ. Các ảnh Move Dex ghi đúng trạng thái lỗi dữ liệu. Truy vấn chính, bộ lọc và drawer hiện có vẫn nằm trong route.
- Fixture chỉ hỗ trợ người dùng ẩn danh. Các thao tác Favorites và Tracker kiểm tra bằng lưu trữ trong hồ sơ trình duyệt tách biệt. Login/Register có thể kiểm giao diện, còn xác thực thực tế, Dashboard đã đăng nhập, CMS và các truy vấn Prisma chưa chạy.
- Chromium headless xác nhận khu vực Voice Entry cùng hai điều khiển đọc và cry có mặt. Chất lượng phát âm, Pause/Resume/Stop và tiếng cry cần kiểm trên trình duyệt có voice hệ thống và truy cập tệp âm thanh.
- Build hiện còn cảnh báo Sass `@import` đã có trong dự án.
