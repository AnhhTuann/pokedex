# Đánh giá khả năng tổ chức Pokédex

| Năng lực | Hiện trạng đã đọc từ source | Thiết kế cần xem xét |
|---|---|---|
| Filter Generation | `Pokemon.generation` hỗ trợ `gen` và `maxGen`. National Mode hiện dùng giới hạn generation, nên có thể rộng hơn danh sách game thực tế. | Giữ generation là thuộc tính species. Chọn rõ filter generation chính xác hay giới hạn tới generation. |
| Filter Region | `regionalDexes` và `DexEntry.regionName` dùng slug dex. | Tách broad region khỏi slug dex. Một region có nhiều dex, kể cả dex cập nhật, dex con và DLC. |
| Filter Regional Dex | Có membership và numbering qua `DexEntry`. Query hiện kết hợp mảng `regionalDexes` với bản ghi số thứ tự. | Chọn `DexEntry` làm nguồn membership chính và kiểm tính nhất quán với mảng hiện có. Chấp nhận số 0. Giữ phân biệt original/updated. |
| Filter game | Có `Pokemon.gameVersions`, nhưng đường query regional mặc định lọc theo dex và form; default species không bắt buộc `gameVersions has game`. | Tách game membership khỏi membership của dex. Giữ `hoenn` cho ORAS đến khi đối chiếu DB. Dùng Lumiose/Hyperspace theo tab Z-A. |
| Sort National | Kết quả non-regional được sắp theo species gốc rồi ID của row. | Dùng National Dex number của species, với khóa form ổn định nếu mở rộng variety. |
| Sort Regional | Sắp theo `entryNumber` rồi public ID. Số 0 bị lọc do fallback truthy. | Sắp theo numbering từ snapshot và giữ số 0. Có khóa phân trang ổn định khi nhiều form cùng entry. |
| Include/exclude form | `Pokemon.isDefault` và `PokemonVariety` biểu diễn hai kiểu truy cập. Query regional hiện tự thêm alternate hợp lệ theo game. | Quy định rõ một kết quả mỗi species hay một kết quả mỗi variety. Dùng định danh ổn định cho cả hai. |
| Filter form theo game | `altFormAvailableIn` có thể lưu slug nhưng chưa có baseline đầy đủ. `PokemonMove` thiếu version group. | Lưu evidence cho từng quan hệ form/version và phân biệt unknown với không có mặt. Đề xuất lưu learnset version group riêng khi được duyệt. |

`DexEntry.pokemonId` trỏ tới `Pokemon.id`, còn `PokemonVariety.pokemonId`
trỏ tới `Pokemon.pokedexNumber`. Ràng buộc `(pokemonId, regionName)` chặn lặp
species trong một dex. Nó không chặn hai species dùng cùng entry number.
Query tải danh sách, lọc/sắp xếp rồi cắt trang trong bộ nhớ; Apollo cache dùng
filter làm key và offset để ghép trang. Khi rà soát phân trang, cần fixture
nhiều form chung base, entry số 0, hai dex chung region, cùng version group
khác game, và chuyển filter giữa các trang. Giữ DB thực tế ở trạng thái
UNVERIFIED cho tới khi chạy kiểm tra chỉ đọc được duyệt.

Các lựa chọn trên là đề xuất để rà soát sau khi xác minh DB. Không có thay
đổi schema, API hoặc UX trong Phase 9B.
