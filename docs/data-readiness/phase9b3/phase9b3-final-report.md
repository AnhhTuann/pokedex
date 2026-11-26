# Phase 9B-3 — Đối chiếu dữ liệu và hợp đồng danh sách

Base `f5afc5af9f3b5414620425506a45e365b1a2d4a2`. Snapshot
`508fd7c3a7d54ac175e00afe420b11a5af983bd6`, tree
`cf32c6147e9c1da51bc91d13616259b19e8d50b9`. Đã kiểm remote Phase 9B-2,
tạo worktree riêng, kiểm blob nguồn và chạy audit offline. Kết quả được
sinh lại và kiểm byte-for-byte. Manifest trước đó giữ nguyên.

| Phạm vi | Trạng thái | Kết quả |
|---|---|---|
| Database reconciliation | UNVERIFIED | Không có đích được phép. 0 hàng được query; discrepancy counts chưa đo. 10.424 khóa kỳ vọng có disposition UNVERIFIED. |
| Victini | UNVERIFIED trong DB | Hai entry Unova #0 trong snapshot; fixture service/GraphQL giữ 0. |
| ORAS | UNVERIFIED trong DB | Hoenn 202, Updated Hoenn 211; giữ runtime compatibility. |
| Legends Z-A | UNVERIFIED trong DB | Lumiose City 232, Hyperspace 132; mapping theo tab. |
| Alternate forms | PARTIALLY VERIFIED | 245 disposition; 52 có form-specific held-item version record, 193 chưa xác minh ở cấp game cụ thể. |
| Learnsets | PARTIALLY VERIFIED | 665.810 dòng, 609.074 ở 22 group hỗ trợ; 2.010 cặp game evidence thiếu learnset group. |
| Evolutions | PARTIALLY VERIFIED | 540 cây, 485 cạnh và 702 condition record. Một cạnh thiếu điều kiện. |
| Assets | PARTIALLY VERIFIED | 47 Normal và 49 Shiny thiếu; 39 nhóm byte trùng, 92 đường dẫn. Nội dung artwork và HTTP status chưa xác minh. |
| Pagination | READY | Form-level; count, offset và limit cùng đơn vị cho tập kết quả cố định. CatchTracker vẫn có cap 1.025 ở caller. |
| Filtering | PARTIALLY READY | Các predicate hiện có được giữ. Broad region, game/form contract và wild-catchability còn mở. |

Máy đọc: [phase9b3 JSON/CSV](../../../pokedex-backend/audit/reports/phase9b3).
Các file giữ revision, nguồn, expected, actual quan sát offline, DB evidence
rỗng và action. Bản sửa ứng dụng duy nhất đồng nhất `totalCount` với các
hàng Pokémon thực tế trả về. SQL DB dự kiến nằm trong
[kế hoạch chỉ đọc](database-reconciliation.md).

## Kiểm thử

| Lệnh | Exit | Ghi nhận |
|---|---:|---|
| Backend `npm ci` | 0 | Sinh Prisma Client, npm báo 7 advisory |
| Backend `npm test` | 0 | 25/25 |
| Backend `npm run test:audit` | 0 | 28/28 |
| Backend `npm run audit:typecheck`, `npm run build` | 0 | Cả hai lệnh |
| Backend `npx prisma validate`, `npx prisma generate` | 0 | Validate với URL giả, không kết nối DB |
| Frontend `npm ci`, `npm run lint`, `npm run build` | 0 | Từng lệnh; cảnh báo Sass deprecation khi build |
| Frontend `npm test` | 0 | 22/22 |
| Audit offline và so sánh replay `diff -qr` | 0 | File evidence/summary khớp |
| SQL đối chiếu staging/restored backup | — | Chưa chạy vì chưa có đích được phê duyệt |

Tái lập từ root với checkout snapshot nguồn và đầu ra mới:

```bash
python3 pokedex-backend/audit/scripts/reconcile-508fd.py . /tmp/phase9b-pokeapi-upstream /tmp/phase9b3-replay
diff -qr -x test-results.json /tmp/phase9b3-replay pokedex-backend/audit/reports/phase9b3
```

[Xem các bước Phase 9B-4](remaining-data-gaps.md). Main, nhánh Phase 9B-2,
báo cáo lịch sử và asset được giữ nguyên. Không kết nối DB hoặc thay đổi
schema, seed, sync, migrate, UX hay deploy.
