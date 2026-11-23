# Phase 8 — Sẵn sàng kiểm toán database

## Trạng thái hiện tại

**BLOCKED.** Không có `AUDIT_DATABASE_URL` trong môi trường này. Mọi nhận định về record thật của 15 bảng vì thế ở mức `RUNTIME_UNVERIFIED`; không được suy từ schema/seed/code sang nội dung DB.

## Nguyên tắc bắt buộc

1. CLI **chỉ** mở kết nối DB khi có flag `--db` **và** env `AUDIT_DATABASE_URL`.
2. `DATABASE_URL` **không bao giờ** được dùng làm fallback cho audit. Điều này tránh việc lỡ chạy audit vào DB production.
3. `--offline` và `--db` là hai chế độ loại trừ nhau; nếu dùng cùng lúc, CLI báo lỗi và không kết nối.
4. `AUDIT_DATABASE_URL` phải trỏ tới **staging disposable hoặc restored backup**, dùng tài khoản chỉ có `SELECT` trên các bảng cần kiểm tra.
5. Mọi truy vấn nằm trong transaction `READ ONLY`, có `statement_timeout` và giới hạn số dòng trả về. Audit không thực hiện `INSERT/UPDATE/DELETE`, không gọi seed/sync/migrate.
6. Secret không được in ra log. Khi có lỗi, connection string được thay bằng `[REDACTED]`.

## Quy trình cho operator

```bash
# 1. Tạo DB disposable từ snapshot/backup được phê duyệt; cấp role read-only.
export AUDIT_DATABASE_URL='postgresql://[REDACTED]@staging-host:5432/pokedex_audit'

# 2. Chạy audit read-only; output tách biệt artifact baseline.
cd pokedex-backend
npm run audit -- --db --api --out audit/reports/db-readonly

# 3. Chỉ chạy full-catalog sau khi sample DB audit ổn.
npm run audit -- --db --full --api --resume --out audit/reports/full-catalog-db
```

Không dùng `psql`, `pg_dump` restore hay `prisma db push` trong phiên audit này. Không chạy lệnh trên production.

Đã thử nghiệm các hàng rào CLI mà **không mở kết nối**:

```bash
DATABASE_URL='postgresql://user:secret@db.example/prod' npm run audit -- --db --out audit/reports/should-not-exist
# audit failed: --db requires AUDIT_DATABASE_URL; refusing DATABASE_URL fallback

AUDIT_DATABASE_URL='postgresql://user:secret@db.example/stage' npm run audit -- --offline --db --out audit/reports/should-not-exist
# audit failed: --db cannot be combined with --offline or --schema-only
```

Cả hai lệnh đều **không tạo output dir**. Error message đã redact; regression test kiểm tra cùng điều kiện trong `audit/tests/audit.test.ts`.

## Nhóm kiểm tra khi có DB

| Nhóm | Câu hỏi cần trả lời |
|---|---|
| Record counts | 15 bảng có bao nhiêu dòng? Có bảng nào thiếu? |
| Incorrect IDs | `pokedexNumber`, `speciesId`, generation có khớp reference không? |
| Duplicate rows | `pokedexNumber`, `name`, walkthrough natural key có trùng không? |
| Missing master data | imageUrl, shinyImageUrl, description, height/weight, effect có null không? |
| Broken relations | FK giữa `Pokemon.id` và `pokedexNumber` có orphan thực tế không? |
| Game-version coverage | version slug trong `Encounter`/`Walkthrough` có nằm trong 38 slug hỗ trợ không? |
| Missing learnsets | `PokemonMove` có đủ version group cho từng game không? |
| Walkthrough | 32/38 game trong seed có phản ánh đúng vào DB không? |
| Image URLs | DB dùng local WebP hay remote URL; file local có tồn tại không? |

## Cách đọc kết quả

- `DB-QUALITY-CLEAN` chỉ có nghĩa là **các check đã chạy** không tìm thấy vấn đề; không phải chứng nhận toàn bộ dữ liệu đúng.
- `DB-UNVERIFIED-*` vẫn là BLOCKED nếu `--db` không được dùng.
- Mọi `INCORRECT` từ DB audit đều kèm evidence dạng aggregate; cần truy vấn chi tiết có phê duyệt trước khi sửa.
- Không bao giờ restore data-only dump vào DB đang có người dùng; xem `fix-plan.json` đã được sửa để dùng bản sao mới.

## Dữ liệu cần operator cung cấp

- `AUDIT_DATABASE_URL` read-only tới staging/backup.
- Xác nhận snapshot DB được lấy khi nào và có chứa dữ liệu người dùng thật hay không.
- Phê duyệt riêng nếu muốn chạy query chi tiết ngoàiaggregate.
