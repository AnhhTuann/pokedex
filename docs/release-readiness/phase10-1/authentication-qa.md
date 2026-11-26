# Xác thực và Dashboard

- Server từ chối token hết hạn/chữ ký sai trong test bảo mật. Truy vấn riêng dùng danh tính theo context server.
- Chromium với mock kiểm thông báo đăng nhập sai, đăng nhập giả lập rồi mở Dashboard, logout xóa token/user, session hết hạn bị chuyển về Login, lỗi đăng ký và cờ admin phía client bị bỏ qua.
- Admin cần `me` xác minh quyền từ server. Dashboard cần `me` xác minh phiên trước khi gửi truy vấn riêng. Dashboard mở detail bằng form ID từ đội thay vì điều hướng đến route chưa khai báo.
- Không đưa giá trị token hoặc mật khẩu vào báo cáo. Token trong test là giá trị giả lập. Không dùng tài khoản thật, không tạo tài khoản và phiên DB thật **UNVERIFIED**.
