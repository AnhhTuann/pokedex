# GraphQL Tools

Apollo 5.5.2 chọn schema 10.1.1, merge 9.2.4 và utils 12.0.1 qua dải tương thích được khai báo. Apollo phụ thuộc trực tiếp cả ba gói, schema phụ thuộc merge và utils, merge phụ thuộc utils. npm dùng chung một utils 12.0.1. Bản này vá prototype pollution trong `mergeDeep` ở các bản ≤12.0.0. Các mục dây chuyền schema và merge biến mất khỏi audit. Schema executable gồm SDL và resolver thật đã qua `assertValidSchema`, startup Apollo và GraphQL HTTP. [Advisory mergeDeep](https://github.com/advisories/GHSA-7mx3-vvmw-hjmv)

## Advisory runtime còn mở

| Thuộc tính | Kết quả |
| --- | --- |
| Gói và mức độ | `@graphql-tools/utils` 12.0.1, High, CVE-2026-114604 |
| Dải ảnh hưởng và bản vá | 10.10.1 đến 12.0.1; vá từ 12.0.2 |
| Đường dẫn | Apollo → utils; Apollo → merge → utils; Apollo → schema → utils; Apollo → schema → merge → utils. Adapter Express 4 dùng cùng Apollo qua peer. |
| Khả năng khai thác theo cấu hình này | Cần consumer đưa incremental response từ upstream hoặc transport không tin cậy vào `mergeIncrementalResult`. Backend dùng schema/resolver cục bộ và GraphQL 16.13.2, không cấu hình gateway/subgraph. Rà soát mã backend và Apollo/schema/merge đã cài không thấy call site của helper. Không xác định được đường khai thác qua API hiện tại trong phạm vi rà soát. |
| Lý do giữ mở | Apollo 5.5.2 là stable latest theo metadata registry. Dải Apollo chặn utils ≥12.0.2, schema ≥10.1.2 và merge ≥9.2.5. Hai phiên bản schema/merge đang dùng yêu cầu utils ^12.0.1. Biến thể 10.10.0 tránh advisory mới nhưng còn advisory mergeDeep cũ. Ép 12.0.2 vượt giới hạn trực tiếp của Apollo. |
| Điều kiện mở chặn | Cập nhật Apollo đến bản chính thức cho phép utils đã vá, chạy lại audit runtime và regression HTTP. Giữ gate phát hành công khai ở trạng thái HOLD trong lúc advisory runtime còn mở. |

[Advisory incremental merge](https://github.com/advisories/GHSA-c4qx-w738-7hr3) · [Dependency tree](results/dependency-tree.txt) · [Audit JSON](results/npm-audit-runtime.json)
