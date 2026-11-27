# Voice và Cry

- **Voice thật — BLOCKED.** Chrome 158.0.8127.36 trả danh sách voice rỗng. Read Entry gọi native synthesis và nhận `synthesis-failed`; chưa có bằng chứng speech phát thật.
- **Vòng đời mock — PASS.** Browser suite xác minh chọn voice theo ngôn ngữ, Read Entry, Play, Pause, Resume, Stop, completion, lỗi và dọn speech/cry khi đổi Pokémon hoặc đóng detail.
- **Cry thật — PASS ở tầng trình duyệt.** Cry Bulbasaur phát ở volume 0.5 và ghi `loadeddata`, `playing`, `ended`. Kết quả dựa trên sự kiện trình duyệt; đầu ra loa vật lý chưa được đo. [Bằng chứng Voice và Cry](results/browser-media.json)

## Kiểm tra thủ công

1. Dùng trình duyệt có ít nhất một giọng hệ thống xuất hiện trong `speechSynthesis.getVoices()`. Xác nhận loa xuất tiếng trước khi chạy.
2. Mở chi tiết Bulbasaur từ Pokédex. Bấm **Read Entry**, nghe giọng đọc, rồi xác nhận **Pause** ngắt tiếng và **Resume** đọc tiếp từ vị trí dừng.
3. Bấm **Stop**, xác nhận âm thanh dừng và có thể bấm **Play** để bắt đầu lại. Để một lượt đọc chạy hết, nghe đến câu cuối và xác nhận nút trở về trạng thái sẵn sàng.
4. Phát lại rồi đổi Pokémon, đóng chi tiết và điều hướng khỏi trang trong các lượt riêng. Kiểm tra tiếng đọc dừng và lần mở sau phát đúng Pokémon.
5. Trên hồ sơ thử nghiệm có thể tắt/loại voice hệ thống để kích hoạt lỗi synthesis. Xác nhận có thông báo, điều khiển trở về trạng thái sẵn sàng và thử lại được sau khi khôi phục voice.
6. Ghi hệ điều hành, phiên bản trình duyệt, voice, kết quả nghe, trạng thái từng điều khiển và sự kiện speech nếu có.
