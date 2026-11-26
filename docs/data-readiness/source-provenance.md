# Provenance nguồn dữ liệu Phase 9B

**VERIFIED_FOR_RECONSTRUCTION** · **RECONSTRUCTED_FROM_IMMUTABLE_SNAPSHOT**

| Thuộc tính | Giá trị đã xác minh |
|---|---|
| Kho upstream | [PokeAPI/api-data](https://github.com/PokeAPI/api-data) |
| Commit | `508fd7c3a7d54ac175e00afe420b11a5af983bd6` |
| Git tree | `cf32c6147e9c1da51bc91d13616259b19e8d50b9` |
| Commit UTC | `2026-11-20T20:56:12Z` |
| Thời điểm audit lịch sử | `2026-11-23T20:19:08.146Z` |
| Request cache đã tạo và kiểm checksum | 7.704 khóa từ 6.679 file nguồn |
| Manifest đầy đủ | `/tmp/phase9b-cache-508fd/manifest.json` |
| SHA-256 của manifest | `97cf37ed932927d199224e831a69dd9a9a16a8424a4937d87a4911bfa2a0b7d4` |
| Catalog key | `96eefac660020c90` |

Git xác nhận commit con trực tiếp `c0b639fa76e4a17054cacbac47f2e6b3ca0e9505`
lúc `2026-11-24T03:55:50Z`. Delta thực tế có 3.060 file, gồm 2.169 item,
890 Pokémon species và 1 metadata. Commit này không được dùng để tạo cache.
Kết quả đối chiếu mọi trường item generation/version group của `508fd7c` khớp
JSON lịch sử. [Diff upstream](https://github.com/PokeAPI/api-data/compare/508fd7c3a7d54ac175e00afe420b11a5af983bd6...c0b639fa76e4a17054cacbac47f2e6b3ca0e9505)

Cache này được dựng từ JSON tĩnh. HTTP cache gốc vẫn chưa tìm thấy. Mỗi dòng
manifest chứa request chính xác, SHA-1 cache key, path nguồn, Git blob SHA,
SHA-256 của cache entry, endpoint và ID. Trình dựng kiểm lại từng blob nguồn
và từng cache entry. Catalog lấy từ `index.json`; slug của version và Pokédex
được phân giải sang ID từ catalog. Các path tuyệt đối tại host và tương đối
trong snapshot được ánh xạ về file numeric, còn khóa cache giữ nguyên chuỗi
request mà audit truyền vào. Hai URL item cùng tên `roseli-berry` được giữ
nguyên tại hai ID 723 và 2279.

`--resume` dùng checkpoint v1 theo 16 ký tự đầu của SHA-256 của danh sách
species ID đã sắp xếp và nối bằng dấu phẩy. Không có checkpoint trước lần
chạy. Pipeline tạo checkpoint với đủ 1.025 ID hoàn thành và 0 lỗi. Lần replay
sau đọc lại toàn bộ. Audit Phase 9B ghi `pokeapi:cache-only` và `db:offline`.

## Tái lập

Checkout đúng commit ở một thư mục riêng, rồi từ root dự án chạy trình dựng
với thư mục đầu ra mới. Trình dựng từ chối thư mục đầu ra đã tồn tại.

```bash
python3 pokedex-backend/audit/scripts/reconstruct-508fd.py /tmp/phase9b-pokeapi-upstream /tmp/phase9b-cache-508fd
```

Trong worktree này, `pokedex-backend/audit/.cache` trỏ tới cache riêng trên.
Chỉ tạo liên kết nếu đường dẫn đích chưa tồn tại. Từ `pokedex-backend/` chạy:

```bash
env -u DATABASE_URL -u AUDIT_DATABASE_URL npm run audit -- --offline --full --resume --out audit/reports/phase9b-reconstructed-508fd
```

Từ root dự án, sinh lại ma trận và CSV chi tiết bằng Python 3 với Pillow:

```bash
python3 pokedex-backend/audit/scripts/coverage-508fd.py /tmp/phase9b-cache-508fd pokedex-backend/audit/reports/phase9b-reconstructed-508fd docs/data-readiness pokedex-backend/public/images/pokemon
```

Manifest và checkpoint nằm cùng cache local. Các số Regional Dex chi tiết
được dựng từ `pokemon_entries[].entry_number`. Báo cáo lịch sử chỉ giữ
membership và số lượng entry. Dữ liệu chạy được lưu riêng khỏi artifact
lịch sử.
