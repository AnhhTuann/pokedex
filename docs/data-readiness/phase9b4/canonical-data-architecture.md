# Kiến trúc dữ liệu chuẩn

Nguồn PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`, các kết quả trích xuất Phase 9B-2/3 và mã tại baseline `8e57448`. Bằng chứng được phân loại theo record nguồn; trạng thái DB **UNVERIFIED**.

| Khái niệm | Khóa và dữ liệu chuẩn | Biểu diễn hiện tại và giới hạn |
|---|---|---|
| Species | National ID, tên chuẩn, generation, type/stat/ability của default form, evolution chain | `Pokemon` kiêm bản ghi loài và form; dữ liệu default chiếu lên species |
| Form | ID của Pokémon/variety dùng cho dòng ứng dụng, National ID của loài, tên/phân loại, stat/type/ability riêng, artwork, evidence; giữ riêng ID endpoint pokemon-form | `Pokemon.pokedexNumber` định danh dòng; `speciesId` chứa National ID; `PokemonVariety` có lớp dữ liệu chồng lắp |
| Dex và membership | Dex ID/slug, region, version-group associations; cặp Dex/species có entry number | `DexEntry.pokemonId` tham chiếu khóa nội bộ `Pokemon.id`; GraphQL dùng nguồn này cho exact Dex |
| Game evidence | Game/version-group, species/form, facet, phương thức, record nguồn và trạng thái kiểm duyệt | Mảng `gameVersions`, `altFormAvailableIn` và `Encounter` thiếu provenance và không thống nhất nguồn |
| Learnset | Form, move, version group, method, level, thứ tự và requirement nếu có | `PokemonMove` khóa theo form/move/method; thiếu group và điều kiện |
| Evolution | Cạnh có hướng giữa species/form; nhiều lựa chọn điều kiện theo version group | `Evolution` và luồng detail có thể làm mất lựa chọn, thiếu dữ liệu có cấu trúc |
| Assets | Form + mode, đường dẫn ổn định, nguồn, hash, trạng thái xác minh | URL nằm ở Pokémon/variety; ảnh thực tế và chất lượng artwork phải được kiểm riêng |

Resolver `Query.pokemonList` gọi service trực tiếp. Service đọc Prisma và chiếu bản ghi sang GraphQL, không có repository riêng cho list. Frontend dùng operation chung, Apollo và `usePokemonList` cho PokéDex; CatchTracker dùng collector riêng để hoàn tất mọi trang. Game selector dùng `gameVersions.ts`. Evolution và form detail còn có nhánh ghép dữ liệu PokeAPI lúc chạy; các nguồn đó không được xem là bằng chứng đã xác minh cho list.

Khóa species, form, khóa nội bộ và ID endpoint pokemon-form phải được giữ riêng trong mọi phép join và import. API list dùng đúng một dòng cho mỗi khóa form duy nhất. Các nhánh còn thiếu trường persisted nằm trong [đề xuất schema](schema-change-proposals.md).
