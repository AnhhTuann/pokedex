# Hợp đồng pagination theo form

Nguồn baseline `8e57448`, PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6` và fixture form. Bằng chứng là ràng buộc Prisma, resolver/service và test offline. DB **UNVERIFIED**.

- Một dòng cho mỗi `Pokemon.pokedexNumber`, khóa duy nhất ở Prisma. Join membership dùng map/set nên nhiều Dex hoặc trùng member không tạo form row mới.
- Tính membership, generation, form, IDs, search và type trước count. Sort exact Dex theo số entry kể cả 0 rồi form ID; các trang khác theo National ID rồi form ID.
- `totalCount` là số form của toàn bộ filter. Offset mặc định 0 và limit mặc định 20; server clamp size một trang tối đa 2.000. Offset qua cuối trả mảng rỗng với cùng count.
- Consumer tiếp tục bằng số dòng đã đọc tới total. CatchTracker kiểm duplicate, count đổi, chạm total sai và empty page sớm. Nếu catalog đổi giữa hai request và vẫn cùng count, offset không bảo đảm snapshot consistency. Khi cần tính nhất quán xuyên các request, dùng revision token/consistent read trong phase sau.
- Runtime vẫn đọc tập ứng viên và sort phía server trước mỗi trang. Tối ưu DB-side sorting/count cần query design và profiling được owner cho phép sau.

[Kiểm pagination bằng fixture](../../../pokedex-backend/tests/pokemonList.test.ts) · [Collector](../../../pokedex-frontend/src/lib/collectPokemonPages.ts)
