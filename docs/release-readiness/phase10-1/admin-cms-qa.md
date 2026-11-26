# Admin CMS

Backend mock xác minh chặn anonymous và vai trò USER trước mọi thao tác ghi, kiểm payload rỗng và kiểm admin chuyển đúng ID/nội dung đến mock repository. Chromium với mock xác minh route guard, listing, mở nội dung cũ trong editor, validation tiêu đề, gửi cập nhật và hiển thị lỗi khi API từ chối. Sau lỗi, bản nháp còn trong editor và chương cũ vẫn trong danh sách.

UI phân biệt lỗi tải danh sách với danh sách rỗng và có Retry. Preview biên tập được quan sát trong editor. Không ghi DB. Thành công lưu qua trình duyệt, trang preview công khai end-to-end và CRUD DB thật **BLOCKED** hoặc chưa chạy.
