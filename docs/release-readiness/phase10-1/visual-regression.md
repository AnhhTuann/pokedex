# Hồi quy giao diện

Chạy test Phase 10 gốc với đường xuất ảnh trỏ sang thư mục Phase 10.1 và chạy lại test browser Phase 9C trên fixture chỉ đọc. Kích thước 1440×900, 768×1024 và 390×844.

So từng pixel RGB của 27 ảnh runtime mới với ảnh cùng tên Phase 10. **23/27 ảnh trùng pixel**. Detail tablet khác **0,2136%**, giới hạn ở vùng Voice Entry. Compare desktop và tablet khác lần lượt **0,0809%** và **0,0004%** trong vùng radar. Type Dex tablet khác sáu pixel ở selector. Kiểm ảnh cho thấy các vùng khác biệt không đổi bố cục. Pokédex Light/Dark, artwork/type badge và game picker trùng pixel. Thay đổi CSS chức năng duy nhất là vị trí xếp lớp của menu Export Team khi đang mở.

[Thống kê diff](results/visual-diff.json) · [Ảnh hồi quy](screenshots/) · [Baseline Phase 10](../../ui-redesign/screenshots/)
