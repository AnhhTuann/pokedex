# Hồi quy backend

Môi trường Node 20.20.2, npm 10.8.2. Prisma validate dùng địa chỉ giữ chỗ dưới miền `.invalid`. Kiểm thử HTTP dùng cổng loopback động và mock delegate Prisma cho tài khoản và walkthrough. Catalog reference đọc file của repo. Không kết nối DB thật, chạy migration/seed hay ghi dữ liệu vào DB.

| Kiểm tra | Kết quả |
| --- | --- |
| `npm ci` | PASS |
| `npm test` | 35/35 |
| `node --import tsx --test tests/graphqlHttp.integration.test.ts tests/reference.integration.test.ts tests/runtimeIntegration.test.ts` | 10/10, tập con của `npm test` |
| `npm run test:audit` | 31/31 |
| `npm run audit:typecheck` và `npm exec -- tsc --noEmit` | PASS |
| `npm run build` | PASS |
| `npm exec -- prisma validate` và `npm exec -- prisma generate` | PASS |
| `makeExecutableSchema({typeDefs, resolvers})` rồi `assertValidSchema` | PASS |
| Startup compiled và tsx, ping, SIGTERM | PASS |

Fixture HTTP gọi middleware, Apollo và resolver thật. Public ping và me ẩn danh hoạt động. Token sai hoặc hết hạn trả me rỗng, tài khoản đã ký có đúng ID. JWT chứa claim ADMIN vẫn bị từ chối nếu role giả lập của DB là USER. Người ẩn danh bị chặn mutation, role ADMIN mới gọi đúng delegate giả lập. Kiểm tra invalid field, introspection bị tắt, lỗi ép kiểu biến, stack trace production, CORS allowlist và preflight, JSON parser, header bảo mật, ping Express và shutdown. Các kết quả mock chỉ xác minh hợp đồng ứng dụng. Team persistence, thao tác tài khoản phụ thuộc DB và CMS CRUD trên DB vẫn **UNVERIFIED**.

[Exit codes và lệnh](results/backend-exit-codes.tsv) · [Test suite](results/backend-tests.txt) · [Integration](results/backend-integration.txt) · [Audit tests](results/backend-audit-tests.txt) · [Schema](results/graphql-schema.txt) · [Startup](results/backend-startup.txt)
