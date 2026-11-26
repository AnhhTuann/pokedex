# Hợp đồng Generation, Region và Game

Nguồn PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`, bảng Dex/game version-group từ Phase 9B-2/3. Bằng chứng là mapping reference, membership theo species và metadata GraphQL. Mapping kiểm được offline; DB **UNVERIFIED**.

| Trục | Hành vi |
|---|---|
| `gen` | Số nguyên I–IX. Chọn generation của default species; form tra qua `speciesId`. Form thiếu liên kết default được loại khỏi kết quả có lọc generation. |
| `maxGen` | Ceiling I–IX, được dùng khi không có `gen`. Cả hai input ngoài dải trả `BAD_USER_INPUT`. National mode của PokéDex có thể dùng ceiling cho phiên bản, biểu thị phạm vi thế hệ. |
| `broadRegion` | Union membership của các Dex có cùng region nguồn, theo danh sách trong catalog. Region lạ trả `BAD_USER_INPUT`. Sort National ID rồi form ID; số regional rỗng nếu không có exact Dex. |
| `region` | Tên tham số lịch sử chỉ exact Dex slug. Dùng membership của base species và sort entry number rồi form ID. `national` chiếu National ID làm entry number. Slug khác chưa có hàng trả rỗng. `ALL` bỏ điều kiện exact Dex. |
| Kết hợp | Broad region và exact Dex giao nhau. Generation, IDs, loại Pokémon, search và form tiếp tục thu hẹp tập kết quả. |
| `game` | Phạm vi UI tương thích cũ. Cùng exact Dex, default form dùng membership và alternate form cần marker game cũ. Một mình `game` chưa lọc. Xem hợp đồng evidence để chọn facet cho API tương lai. |

35 Dex references gồm National và hai Dex danh mục không có broad region nguồn. Con số 35 biểu thị các reference được kiểm toán, có cả các Dex ngoài 38 game app. Catalog lưu reference Dexes riêng với legacy query Dexes cho từng game. Victini `0` là số hợp lệ. Giữ ORAS legacy `hoenn` trong UI tới khi owner đối chiếu `updated-hoenn` và dữ liệu hiện hữu. Legends Z-A dùng `lumiose-city` mặc định, PokéDex chọn thêm `hyperspace`; không ghép các entry tùy biến slug `legends-za` với hai Dex chính thức.

[Catalog JSON](catalog-contract.json) · [Bảng evidence theo game](../../../pokedex-backend/audit/reports/phase9b-coverage/game-membership.json) · [Đối chiếu Victini, ORAS và Z-A](../phase9b3/victini-oras-z-a-verification.md)
