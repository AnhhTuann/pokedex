# Responsive QA

Chụp bằng Chrome thật với catalog fixture chỉ đọc. Playwright kiểm tra chiều rộng document và main, ảnh mẫu tải được, ảnh hoàn tất bị lỗi, vùng số Dex và nút tim, số cột và reduced motion. Luồng desktop bật motion xác minh hover nâng 4 px và chiều cao thẻ giữ nguyên khi đổi Shiny. Mobile hiển thị trọn hàng đầu ở 390×844 sau khi rút ngắn hero và xếp ba select phụ trên cùng một hàng.

| Viewport | Grid | Navigation |
| --- | --- | --- |
| 1920×1080 | 5 cột | [Sidebar mở](screenshots/homepage-1920.png) |
| 1440×900 | 4 cột | [Sidebar mở](screenshots/homepage-1440.png) · [Rail](screenshots/sidebar-collapsed.png) |
| 768×1024 | 3 cột | [Drawer](screenshots/homepage-768.png) |
| 390×844 | 2 cột | [Homepage](screenshots/homepage-390.png) · [Drawer mở](screenshots/mobile-drawer.png) |

[Bằng chứng Playwright](browser-results.json)

## Tái chạy

Trong backend, chạy `env -u DATABASE_URL -u JWT_SECRET PHASE9C_PORT=3299 node --import tsx tests/fixtures/reference-server.ts`. Trong frontend, chạy `VITE_GRAPHQL_API_URL=/graphql VITE_BACKEND_URL=http://127.0.0.1:3299 npm run dev -- --host 127.0.0.1 --port 5299`.

Chạy `node tests/browser/dark-homepage.e2e.mjs` từ frontend. Đặt `PHASE11_BASELINE_ORIGIN` tới frontend Phase 10.2 dùng cùng fixture để tạo cặp ảnh before/after. Đặt `PHASE9C_CHROME` nếu Chrome nằm ở đường dẫn khác mặc định.
