# Apollo Server 5

Apollo Server 4.13.0 chịu advisory XS-Search liên quan đến kiểm tra yêu cầu cross-site của trình duyệt. Bản 5.5.2 vượt mốc vá 5.5.0 và bỏ dependency uuid. Audit sau cập nhật đã bỏ mục Apollo. [Advisory Apollo](https://github.com/advisories/GHSA-9q82-xgwf-vj6h)

- Apollo 5 yêu cầu Node ≥20 và GraphQL ^16.11.0. Kiểm thử trên Node 20.20.2, npm 10.8.2, GraphQL 16.13.2 và Express 4.22.1. CI hiện dùng Node 20. Môi trường chạy backend cần đáp ứng engine của lockfile. [Hướng dẫn nâng cấp Apollo](https://www.apollographql.com/docs/apollo-server/migration)
- `src/index.ts` và fixture catalog chuyển sang `@as-integrations/express4` 1.1.2. Adapter khai báo peer Express ^4 và Apollo ^4 hoặc ^5, cung cấp kiểu TypeScript cho middleware. Thứ tự parser JSON 1 MiB, CORS và GraphQL được giữ. Context vẫn lấy JWT từ Authorization và IP từ Express.
- Resolver, SDL và kiểm tra chữ ký JWT vẫn dùng cùng logic. Production tắt introspection. Test HTTP xác nhận lỗi validation trả 400, lỗi resolver có GraphQL envelope và ẩn stack trace. Giữ HTTP 200 cho lỗi ép kiểu biến bằng cờ tương thích v4. Apollo 5 ghi cảnh báo deprecation khi khởi động. Cần kiểm tra lại hành vi client khi mất cờ này trong Apollo 6.
- Startup chờ bind, trả lỗi qua exit code khi thất bại và đăng ký plugin drain HTTP. Bản compiled và entry point qua tsx đều phục vụ ping rồi đóng listener khi nhận SIGTERM; test HTTP cũng gọi stop trực tiếp và xác nhận listener đóng.

[Bằng chứng startup](results/backend-startup.txt) · [Kiểm thử backend](backend-regression.md)
