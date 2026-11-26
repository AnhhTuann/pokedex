# Phase 10.1 · Sẵn sàng phát hành

Base `5f857040138faf77f615b1a41219895ab806173c`. Branch `feat/phase10-1-runtime-qa`. Xác minh trong worktree `/tmp/pokedex-phase10-1`. Không migrate, seed, ghi DB, chỉnh schema, thay catalog/asset hoặc deploy.

## Kết quả

| Phạm vi | Trạng thái |
| --- | --- |
| Frontend unit, lint/typecheck, build | PASSED, 29 unit tests |
| Backend unit và integration | PASSED, 34 tests với fixture/mocks |
| Backend audit tests, audit typecheck, typecheck, build | PASSED, 31 audit tests |
| Prisma validate/generate | PASSED với URL placeholder |
| Browser Phase 9C và Phase 10 | PASSED trên ba viewport |
| Move Dex | PASSED bằng mock, resolver DB thật UNVERIFIED |
| Voice/Cry | Voice thật BLOCKED vì thiếu system voice. Cry thực tế PASSED ở browser API. Vòng đời bằng mock PASSED. |
| Team Builder | PASSED scope fixture/mock và JSON round-trip. Lưu DB thật UNVERIFIED. |
| Auth/CMS | Quyền và lỗi kiểm bằng fixture/mock. Auth và CRUD DB thật UNVERIFIED. |
| Kiểm dependency | Frontend 0 mục. Backend 6 mục, gồm high. |
| Catalog và visual baseline | Kiểm checksum và 27 ảnh hồi quy. |

Các tệp thay đổi thuộc các component Voice, Move Dex, Team Builder, xác minh session/Dashboard và CMS. Test gồm backend repository mocks, JSON import và Playwright. Báo cáo chi tiết ở [Move Dex](move-dex-investigation.md), [Voice/Cry](voice-cry-verification.md), [Team](team-builder-qa.md), [Auth](authentication-qa.md), [CMS](admin-cms-qa.md), [Catalog](reference-catalog-integrity.md), [Dependency](dependency-security.md) và [Ảnh](visual-regression.md).

Máy chạy Chromium headless với fixture ở 3299 và Vite ở 5299. Browser diagnostics được lưu trong JSON. Browser mock có 0 lỗi JavaScript không xử lý. Các cảnh báo Reduced Motion và hủy tải font khi chuyển trang được ghi riêng. Trạng thái Move Dex fixture phản ánh thiếu resolver.

`results/` chứa mã thoát, log lệnh và telemetry. **Chưa sẵn sàng phát hành cuối.** Cần xử lý advisory backend, xác minh Voice trên máy có giọng, và kiểm các luồng DB trong môi trường được phê duyệt riêng.


### Chạy lại browser

Khởi động fixture bằng `PHASE9C_PORT=3299 node --import tsx tests/fixtures/reference-server.ts` trong backend. Trong frontend, dùng `VITE_GRAPHQL_API_URL=/graphql VITE_BACKEND_URL=http://127.0.0.1:3299 npm run dev -- --host 127.0.0.1 --port 5299 --strictPort`. Đặt `PHASE9C_ORIGIN=http://127.0.0.1:5299` cho test Phase 9C và Phase 10. Dùng bản sao của test Phase 10 với đích ảnh tách biệt để giữ baseline. Hai test mới chạy trực tiếp từ frontend bằng `node tests/browser/runtime-qa.e2e.mjs` và `node tests/browser/voice-cry.e2e.mjs`. Đặt `PHASE10_RESULTS` thành đường dẫn JSON nếu cần lưu telemetry.
