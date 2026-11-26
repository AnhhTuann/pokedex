# Phụ thuộc

Chạy `npm audit --json` độc lập theo hai lockfile. Frontend **0 advisories**. Backend **6 mục** gồm 4 high, 1 moderate và 1 low, có mục là hiệu ứng dây chuyền của dependency con.

| Bản trong lockfile | Đường và phạm vi advisory |
| --- | --- |
| `@apollo/server` 4.13.0 | Advisory XS-Search mức moderate ảnh hưởng trước 5.5.0. npm đề xuất 5.5.2, là nâng major và nằm ngoài lượt sửa này. |
| `@graphql-tools/schema` 9.0.19, `merge` 8.4.2, `utils` 9.2.1 | Nhánh dưới Apollo. High bắt nguồn từ `utils` đến 12.0.0. Bản vá 12.0.1 thuộc major khác với bản đang dùng. Chưa xác minh tương thích khi ép override. |
| `uuid` 9.0.1 | Transitive qua Apollo, mức moderate, ảnh hưởng trước 11.1.1 trong các hàm dùng buffer. |
| `esbuild` 0.27.7 | Dev dependency qua `tsx`. Advisory Windows dev-server low áp dụng 0.27.3 tới dưới 0.28.1. Bản sửa nằm ngoài nhánh 0.27.x. |

Không chạy auto-fix, không đổi manifest hoặc lockfile. Chưa xác định bản vá ở cùng minor xử lý các mục trên. Đánh giá và thử dependency remediation trước khi phát hành backend công khai.

[Frontend audit](results/npm-audit-frontend.json) · [Backend audit](results/npm-audit-backend.json)
