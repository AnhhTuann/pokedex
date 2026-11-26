# Team Builder

Chromium kiểm sáu slot, chọn form Venusaur Mega từ catalog, request đúng ID 10033, chọn ability, move, item và nature. Khi xóa rồi thay Pokémon khác, build của thành viên còn lại được giữ. Import hỏng bị từ chối trước khi đổi đội. Chromium ghi nhận tải tệp JSON trên cả ba viewport. Import lại payload sau reload khôi phục các lựa chọn. Lượt đầu tái hiện menu Export bị thẻ đội che khi bấm Save as JSON. Sửa lớp menu và giải phóng object URL sau khi phát lệnh tải.

Backend mock kiểm xác thực người gọi, đúng form ID và thứ tự đọc/ghi, từ chối ID không tồn tại và đội trên sáu thành viên. Không gọi Prisma thật. Team Builder dùng Zustand trong bộ nhớ và JSON cho việc lưu/khôi phục thủ công. Backend có hợp đồng lưu ID theo slot riêng, không lưu toàn bộ thông số build của frontend. Tích hợp lưu tự động và lưu/đọc qua DB thật **UNVERIFIED**. Thay thành viên hiện thực hiện qua Remove rồi Add.
