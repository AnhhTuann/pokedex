# Đối chiếu lịch sử và phát hiện dữ liệu

## Phần khớp

Cả 12 catalog totals khớp. Đối chiếu sâu theo từng trường cho thấy
`pokemonDetails`, `speciesCoverage`, `speciesSample`, `formAudit`,
`evolutionSample`, `encounterSample`, `learnsetSample`, `pokedexes`,
`versions`, `generations` và `catalogDetails` đều khớp JSON lịch sử.
So sánh bao gồm hidden abilities, stats, membership, move slots và thống kê
item theo cả generation và 14 version group.

Replay offline bằng mã của commit `8990cc6` nơi lưu báo cáo Full Data cũ cho
kết quả deep-equal của toàn bộ đối tượng `reference`, gồm game matrix và
metadata resume. Báo cáo cũ ghi baseRef `d6ba4a4`; mã ở chính commit đó thiếu
một số trường full-catalog. Vì vậy replay dùng commit thực sự lưu bộ mã và
báo cáo đầy đủ. Dữ liệu thô hay các trường không được xuất trong JSON lịch
sử không thể kiểm bằng phép so sánh này.

## Khác biệt do implementation hoặc trạng thái chạy

- Phase 9A dùng hai dex hiệu lực của Legends Z-A, Lumiose City có 232 entry
  và Hyperspace có 132, thay cho `kalos-central` trong ma trận cũ. Tất cả
  35 membership set đã khớp đối chiếu độc lập. Danh sách nguồn máy sinh của
  hàng Z-A ghép hai slug bằng dấu `|`; dùng từng slug riêng khi truy nguyên.
- Hai bản ORAS vẫn truy vấn `hoenn` với 202 entry. Snapshot liên kết
  `updated-hoenn` với version group ORAS và 211 entry. Lựa chọn slug tương
  thích và xác minh hàng DB là hai việc riêng.
- Offline run đầu tiên tạo checkpoint nên `resumedIds` trong output mới là
  rỗng. Replay dùng checkpoint được pipeline tạo và resume đủ 1.025 ID.
- Các cột evidence và classification thay đổi theo Phase 9A. Không phát hiện
  khác biệt dữ liệu nguồn chưa giải thích trong phần tham chiếu đối chiếu được.

## Phát hiện độc lập trong snapshot và ứng dụng

- Victini có số **0** trong cả `original-unova` và `updated-unova`.
  `pokemonService.pokemonList` dùng `entryMap.get(baseDbId) || null`, rồi
  lọc giá trị null, nên sẽ loại entry số 0 khi có hàng hợp lệ. Đây là lỗi logic
  xác nhận từ source và snapshot. Chưa biết DB hiện tại có hàng đó.
- `champions` có 231 entry và 788 khoảng trống số trong dải 1–max.
  Giữ numbering snapshot. Khoảng trống số không được tính là mất membership.
- Item catalog có hai ID cùng slug `roseli-berry`. ID vẫn là duy nhất.
  Phép đối chiếu lịch sử không xác nhận slug item duy nhất, vì vậy cần giữ ID
  khi so sánh hoặc nhập dữ liệu.
- Cả 326 alternate varieties thiếu `game_indices` trực tiếp. Learnset
  theo version group, encounter và Regional Dex cung cấp bằng chứng khác
  nhau; chúng không đủ để khẳng định mọi form có thể sử dụng trong mọi game
  liên quan.
- Asset local thiếu 47 file Normal và 49 file Shiny trên 42 species, gồm các
  tên variety. Tất cả file hiện diện trong tập kỳ vọng giải mã được.
  Trạng thái HTTP cho URL remote và giá trị URL trong DB vẫn chưa xác minh.
- Seed walkthrough còn thiếu sáu game từ audit trước. Mô tả tiếng Việt cần
  nội dung biên tập. Item flavor text và hidden ability cần rà soát riêng khi
  áp dụng vào dữ liệu ứng dụng.
