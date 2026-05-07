# ⚙️ PokéDex Backend

API Server mạnh mẽ quản lý dữ liệu Pokémon thông qua GraphQL và Prisma ORM.

## 🏗️ Cấu trúc thư mục
- `prisma/schema.prisma`: Định nghĩa mô hình dữ liệu (Pokemon, Move, Ability, Encounter, Item...).
- `src/typeDefs.ts`: Định nghĩa Schema GraphQL (Types, Queries).
- `src/resolvers.ts`: Xử lý logic truy vấn dữ liệu từ PostgreSQL qua Prisma.
- `scripts/`: Chứa các script Seeding data phức tạp từ PokéAPI.

## 🗄️ Database Schema Highlights
- **Quan hệ n-n (Many-to-Many):** Pokemon và Moves, Pokemon và Abilities.
- **Complex Filtering:** Sử dụng logic `AND/OR` trong Prisma để xử lý lọc Pokemon theo vùng (Region) kết hợp với tính sẵn có của form phụ trong từng bản game.

## 🔄 Quy trình Seeding Dữ liệu
Dự án sử dụng script seeding thông minh để bóc tách dữ liệu từ PokéAPI:
1. **Pokemon Seed:** Lấy thông tin cơ bản, chỉ số, và mapping species ID.
2. **Variety Seed:** Xử lý Mega, Alolan, Galar forms như những record riêng biệt để dễ dàng lọc trên trang chủ.
3. **Move/Ability Detail Seed:** Cào thêm PP, Description, Effect bằng tiếng Anh (lọc từ mảng đa ngôn ngữ của PokéAPI).
4. **Encounter Seed:** Bóc tách dữ liệu lồng ghép sâu để lấy phương thức bắt, Level và tỉ lệ % xuất hiện.

## 📦 Package quan trọng
- `@prisma/client`: Query database cực nhanh với type-safety.
- `graphql-yoga`: Server GraphQL nhẹ và hiệu quả.
- `tsx`: Thực thi các script TypeScript trực tiếp.
