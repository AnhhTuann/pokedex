# Hợp đồng quản lý artwork

Nguồn PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`, snapshot URL và Phase 9B-3 local file/hash inventory. Trạng thái **PARTIALLY VERIFIED** cho sự hiện diện/hash offline; nội dung hình, hosting và DB **UNVERIFIED**.

Một asset manifest row được khóa bằng form ID + mode (`NORMAL`, `SHINY`). Lưu canonical path, nullable source URL, SHA-256, verification status và provenance. Dùng đường dẫn WebP ổn định theo mode, thêm alias đã kiểm nếu cần thay tên. Manifest phân biệt missing, verified, unverified và shared-approved. Với artwork thiếu, projection tương lai dùng placeholder cùng nhãn mode; chỉ dùng chính xác artwork của form và mode. Artwork dùng chung cần source và review theo từng form, kể cả khi file trùng byte. Runtime hiện có normal URL fallback theo form ID và một số UI thay shiny thiếu bằng normal; các hành vi đó chưa đạt hợp đồng mới.

Backlog gồm 47 Normal thiếu, 49 Shiny thiếu, 39 nhóm byte-identical trên 92 path. Dùng CSV để ưu tiên theo form/mode, đối chiếu candidate với artwork đúng form, kiểm hash và kiểm trực quan. Dùng danh sách nhóm trùng để duyệt shared artwork hoặc sửa mapping theo từng path. Owner duyệt manifest diff, nguồn ảnh, alias URL và rollback trước khi thêm file.

[96 path thiếu](../../../pokedex-backend/audit/reports/phase9b3/missing-assets.csv) · [39 nhóm cần duyệt](../../../pokedex-backend/audit/reports/phase9b3/suspected-wrong-artwork.json)
