# Độ phủ asset Normal và Shiny

Snapshot `508fd7c3a7d54ac175e00afe420b11a5af983bd6` cung cấp tên canonical
và variety. File được kiểm tra tại `pokedex-backend/public/images/pokemon`.
Tên kỳ vọng gồm cả alias species và tên variety mặc định khi chúng khác nhau.

| Loại | Kỳ vọng | Hiện diện và decode được | Thiếu | WebP lỗi |
|---|---:|---:|---:|---:|
| Normal | 1.388 | 1.341 | 47 | 0 |
| Shiny | 1.388 | 1.339 | 49 | 0 |

CSV ghi từng filename, Pokémon ID liên quan, kích thước byte, chiều rộng,
chiều cao, SHA-256, trạng thái decode và đường dẫn có cùng checksum. Có
**39 nhóm byte trùng nhau**, liên quan **92 đường dẫn**. Byte trùng có thể do
alias hoặc artwork dùng chung; cần xem từng nhóm trước khi kết luận sai ảnh.
Tên file khớp là bằng chứng mapping local. Độ đúng của nội dung hình ảnh
chưa được kiểm duyệt trực quan. Snapshot có 4 variety thiếu URL Normal và
4 thiếu URL Shiny sau khi xét artwork chính thức và sprite mặc định. Chưa
kiểm HTTP status của URL remote hay URL lưu trong DB.

Backend phục vụ `/images` từ `public/images`. Seed có thể dùng URL remote
và updater có thể tạo URL local. PokeCard chọn Shiny nếu có URL, dùng Normal
khi thiếu URL Shiny, và dùng placeholder khi tải ảnh thất bại. Những fallback
này không được tính là asset Shiny hiện diện trong inventory.

[Kiểm tra từng file](../../pokedex-backend/audit/reports/phase9b-coverage/assets.csv)
