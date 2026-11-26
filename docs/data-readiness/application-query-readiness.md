# Mức sẵn sàng của truy vấn ứng dụng

**PARTIALLY READY.** Đối chiếu code Phase 9B với snapshot `508fd7c`. Các kết
quả dưới đây là bằng chứng source/fixture. Dữ liệu DB **UNVERIFIED**.

| Khả năng | Hiện trạng |
|---|---|
| Generation I–IX | Service lấy `gen` chính xác, ưu tiên `gen` hơn `maxGen`. National Mode dựng từ generation ceiling. Không có kiểm chứng row-level. |
| Broad region | Schema lưu slug dex trong `regionalDexes` và `DexEntry.regionName`. Chưa có filter hợp nhiều dex của một broad region. |
| Exact dex | Query có region, lấy `DexEntry` và regional number. Với region kèm game, bộ lọc dùng cả mảng `regionalDexes`, rồi giữ default hoặc alternate có `altFormAvailableIn` cho game. |
| Individual game | Default Pokémon không bắt buộc `gameVersions has game`; khi chỉ có `game`, service không áp dụng cùng điều kiện. Một dex có thể chứa nhiều phiên bản. |
| National vs Regional sort | Nhánh National theo species gốc rồi ID. Nhánh regional theo entry number rồi ID. Số 0 sắp trước 1 sau bản sửa. |
| Include/exclude forms | Có `isDefault` và dữ liệu variety. List không cung cấp tham số lựa chọn kết quả một hàng mỗi species hay một hàng mỗi form. |
| Form theo game | `altFormAvailableIn` chỉ là mảng slug. Chất lượng dữ liệu chưa xác minh, không có trạng thái unknown hoặc provenance per-form. |
| Catchability | List không dùng `Encounter` để tách wild, gift, trade hoặc dữ liệu index. CSV audit giữ các bằng chứng riêng. |
| Pagination và dedup | Service sort rồi slice theo số hàng Pokémon, nhưng `totalCount` đếm khóa regional number/species duy nhất. Apollo ghép page theo offset; UI dùng độ dài mảng so với totalCount. Khi có nhiều form, UI có thể dừng tải trước khi hết hàng. Cần chốt đơn vị phân trang trước khi thay đổi contract. |

## Bản sửa Victini

Snapshot có Victini National 494 ở Unova #0 trong cả `original-unova` và
`updated-unova`. Prisma lưu `DexEntry.entryNumber` là Int bắt buộc, nên 0 là
giá trị có thể biểu diễn. Service dùng `entryMap.get(baseDbId) || null`, khiến
0 thành null và bị loại. Đã đổi sang `?? null`. Không có row trong map vẫn
cho null ở bước trung gian và bị loại khỏi danh sách regional. Nhánh National
giữ giá trị null như trước. GraphQL truyền nguyên Int nullable; resolver
ủy quyền cho service. PokeCard và CatchTracker đã xét riêng undefined và
null, nên số 0 hiển thị `000`. Không đổi UI hoặc schema.

Fixture service kiểm #0, hai dex Unova, thứ tự National và regional, row
không có entry, nhiều form cùng số và phân trang. Test xác nhận hành vi
`totalCount` hiện tại; sửa contract phân trang thuộc bước tiếp theo.

Nguồn: `pokemon.service.ts`, `typeDefs.ts`, `resolvers.ts`,
`PokemonDex.tsx`, `PokeCard.tsx`, `CatchTracker.tsx`, `main.tsx`.
