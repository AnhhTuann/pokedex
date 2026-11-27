# Phase 10.2 · Security hardening và release gate

**Kết luận: HOLD phát hành production.** Sáu mục audit trong baseline đã được xử lý. npm vẫn báo một advisory High runtime mới của GraphQL Tools. Voice thật còn BLOCKED và các luồng phụ thuộc DB thật còn UNVERIFIED.

- Nhánh `feat/phase10-2-security-hardening`, worktree riêng. Base chính xác `726a43f8658d83831c6eb089cb6465f6d13c0932`. SHA bản giao nằm ở commit của báo cáo này và trong kết quả Git khi bàn giao. Giữ main và các nhánh Phase 9A–10.1. Phạm vi xuất bản chỉ gồm nhánh Phase 10.2.
- Cập nhật Apollo 5.5.2, adapter Express 4 1.1.2, schema 10.1.1, merge 9.2.4, utils 12.0.1, tsx 4.23.15 và esbuild 0.28.2. Loại uuid 9.0.1 khỏi cây. Backend audit đầy đủ 6 → 1, runtime 5 → 1, dev-only 1 → 0, frontend 0 → 0. [Audit](dependency-audit-final.md)
- Backend tests 35/35, integration có HTTP 10/10 (tập con), audit tests 31/31. Build, typecheck, Prisma validate/generate, schema và startup/shutdown đạt. [Kiểm thử backend](backend-regression.md)
- Frontend tests 29/29, lint/build đạt. Các bộ Playwright premium-red, reference, runtime-qa và voice-cry trả exit 0. Voice native BLOCKED, Voice mock đạt và Cry ghi nhận playback ở tầng trình duyệt. [Exit codes](results/browser-exit-codes.tsv) · [Voice](voice-followup.md)
- Không chạy kết nối DB thật, migration, seed hay ghi dữ liệu. Diff source frontend, schema Prisma, ảnh và catalog so với base không có thay đổi. Team persistence, authenticated DB operations và CMS CRUD trên DB thật vẫn UNVERIFIED.

## Hồi quy hình ảnh

Chạy cùng test premium-red với một bản sao tạm chỉ đổi thư mục xuất ảnh sang Phase 10.2. So RGB theo tên ảnh và kích thước với cả hai baseline. Tất cả 27 ảnh cùng kích thước gốc, bao phủ 1440×900, 768×1024 và 390×844. Pokédex sáng/tối và bộ chọn game trùng pixel ở cả hai mốc. Bài test trình duyệt qua các bước kiểm tra thẻ, bố cục, chi tiết và tiến hóa đã đạt.

| Baseline | Trùng pixel | Khác biệt cục bộ |
| --- | --- | --- |
| Phase 10 | 24/27 | Voice Entry tablet 0,213623%; radar Compare tablet 0,001653%; selector Type Dex tablet 0,001399% |
| Phase 10.1 | 24/27 | Radar Compare desktop 0,080941% và tablet 0,001272%; selector Type Dex tablet 0,000636% |

[Ảnh chụp](screenshots/) · [Pixel diff và bounding box](results/visual-diff.json) · [Runtime browser](results/browser-runtime.json)

## Bước vận hành để mở gate

1. Dùng bản Apollo chính thức tương thích utils đã vá và lặp lại kiểm tra audit/runtime. [Advisory còn mở](graphql-tools-security.md)
2. Xác minh Voice trên trình duyệt có giọng hệ thống. [Quy trình thủ công](voice-followup.md)
3. Xác minh Team persistence, authenticated DB operations và CMS CRUD trong đợt QA riêng có môi trường được phê duyệt. Đợt này không thực hiện kiểm tra DB.
