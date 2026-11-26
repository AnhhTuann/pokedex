# Hợp đồng phân trang danh sách Pokémon

**READY cho cùng một tập kết quả đã lọc**, dựa trên fixture service/GraphQL.
Chọn **form-level**. GraphQL trả danh sách phẳng Pokémon ID; PokemonDex
render mỗi ID bằng một card và tăng offset theo số card; CatchTracker cũng
đếm các ID độc lập. Gộp row thành species sẽ đổi cấu trúc, lựa chọn form và
ý nghĩa của các tham số hiện có.

Bản sửa chỉ đổi `totalCount` thành số hàng đã lọc, trước khi slice.
Prisma trả một record duy nhất mỗi `Pokemon.pokedexNumber` theo ràng buộc
unique; mapper thêm tối đa một hàng cho mỗi record, còn DexEntry chỉ cấp
number qua map. Vì vậy một form và default có thể chung regional number
nhưng khác ID và đều phải được đếm. Sort theo regional number rồi ID, hoặc
National base ID rồi ID, cung cấp thứ tự ổn định nếu tập dữ liệu cố định.
Bộ lọc chạy trước khi đếm và cắt trang. Hai danh sách cùng bộ lọc có cùng
đơn vị count/offset/limit. Không có redesign hoặc thay đổi SDL.

Fixture kiểm first/middle/last, offset vượt cuối, rỗng, không lặp ID, thiếu
DexEntry, Victini #0 và GraphQL. CatchTracker vẫn có request cap 1.025;
nếu kết quả vượt cap, consumer đó cần cơ chế tải tiếp ở bước riêng. Offset
pagination không cung cấp snapshot cố định giữa các request khi dữ liệu
thay đổi đồng thời.
