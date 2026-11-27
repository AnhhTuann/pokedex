# Xác minh phân trang theo form

Homepage gửi `BrowseReferencePokemon` với `limit: 24, offset: 0`. Phản hồi chứa 24 record và `totalCount: 1351`. Record thứ 24 là Beedrill Mega, ID form riêng và `speciesId: 15`, hiển thị `#0015`. Số National Dex dùng species ID, vì vậy các form của cùng species có thể cùng số.

Click Load More gửi `limit: 24, offset: 24`. Phản hồi đầu trang hai là Pidgey, ID form 16, species 16, hiển thị `#0016`. UI giữ đúng thứ tự và số National Dex của 48 record đã trả về, không có ID trùng. Hai request đều giữ `totalCount: 1351`.

Với scope toàn bộ catalog, backend sắp theo `speciesId` rồi form `id`. Test đọc 57 trang qua GraphQL fixture và đối chiếu toàn bộ cặp (species ID, form ID) với catalog local đã sắp theo thứ tự đó. 1.351 form trùng khớp; trang cuối offset 1344 trả 7. Cách sắp theo số regional trong scope Exact Dex vẫn dùng mã gốc.

Ở viewport 1214×1280, 24 form chia thành bốn hàng 5 và một hàng 4. Trang đầu kết thúc đúng ở Beedrill Mega. Chỉ báo cạnh Load More cho biết số form đã tải. Page size, offset, GraphQL schema, resolvers và catalog giữ nguyên.

[Trước Load More](screenshots/pagination-before.png) · [Pidgey sau Load More](screenshots/pagination-after.png) · [Progress 48 form](screenshots/pagination-progress.png) · [Request/response JSON](browser-results.json)
