# 🎨 PokéDex Frontend

Module này xử lý toàn bộ phần hiển thị và trải nghiệm người dùng của Elite PokéDex.

## 🏗️ Cấu trúc thư mục
- `src/components`: Các thành phần UI dùng chung (PokeCard, Sidebar, TopBar, TypeBadge...).
- `src/pages`: Các trang chính (Pokedex, MoveDex, AbilityDex, ItemDex, LocationDex...).
- `src/graphql`: Định nghĩa các Query và Mutation bằng `gql`.
- `src/hooks`: Custom hooks (useDebounce, useVersionFilter...).
- `src/utils`: Logic tính toán (Type Matchups, Color mapping).
- `src/theme`: Cấu hình Theme Dark Mode của Material-UI.

## 📦 Package quan trọng
- `@mui/material`: Hệ thống UI component chính.
- `@apollo/client`: Quản lý gọi API GraphQL và caching dữ liệu.
- `react-router-dom`: Quản lý điều hướng đa trang.
- `use-debounce`: Tối ưu hóa hiệu suất ô tìm kiếm.

## 💡 Giải pháp kỹ thuật nổi bật
- **Global Version State:** Sử dụng Context/State để quản lý bản game đang chọn, từ đó đồng bộ dữ liệu lọc trên toàn bộ các module khác nhau.
- **Conditional Rendering:** Tối ưu hóa TopBar để ẩn/hiện nút Shiny và Version tùy theo trang người dùng đang đứng.
- **Dynamic Styling:** Thẻ Pokemon tự động thay đổi màu nền theo hệ chính, tạo hiệu ứng thị giác chuyên nghiệp.
