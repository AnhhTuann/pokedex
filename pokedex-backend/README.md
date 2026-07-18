# ⚙️ Elite PokéDex Backend - GraphQL & Prisma API Server

Chào mừng bạn đến với **PokéDex Backend API Server**! Đây là trái tim của hệ thống **Elite PokéDex Wiki**, một GraphQL Server hiệu năng cao được phát triển bằng **Node.js**, **Express**, **TypeScript**, **GraphQL Yoga** (sau này tối ưu hóa với **Apollo Server**) cùng **Prisma ORM** và **PostgreSQL**.

API Server này cung cấp toàn bộ kho dữ liệu chi tiết về Pokémon (chỉ số, hệ, dạng Mega, Alolan, Galar), Chiêu thức (Moves), Đặc tính (Abilities), Vật phẩm (Items), Địa điểm bắt (Locations) với tỉ lệ xuất hiện, và hệ thống cẩm nang hướng dẫn chơi game (Walkthroughs).

---

## 🚀 Tính năng nổi bật

*   **⚡ GraphQL API & Static File Server mạnh mẽ:** Cung cấp duy nhất một endpoint linh hoạt giúp Client truy vấn chính xác lượng dữ liệu. Hỗ trợ phục vụ tĩnh trực tiếp hàng ngàn file hình ảnh WebP từ thư mục `public/images/`.
*   **🗄️ Prisma ORM & PostgreSQL:** Thiết kế cơ sở dữ liệu quan hệ chặt chẽ (Many-to-Many giữa Pokemon & Moves/Abilities), tối ưu hóa tốc độ truy vấn thông qua các chỉ mục (indexes).
*   **🛠️ Seeding thông minh nâng cao:**
    *   Cào dữ liệu và tải hình ảnh hoàn toàn tự động từ **PokéAPI** thành định dạng WebP siêu nhẹ, lưu trữ Local giúp tăng tốc tối đa.
    *   Tự động phân tách các biến thể Pokémon (Alternative Forms, Mega, Alolan, Galar) thành các record riêng biệt để tối ưu hóa khả năng tìm kiếm & lọc của người dùng.
    *   Lọc dữ liệu đa ngôn ngữ để lưu trữ phần mô tả tiếng Anh chuẩn.
*   **🌐 CMS Walkthrough tích hợp:** Hỗ trợ các Mutation GraphQL để Thêm/Sửa/Xóa (`upsertWalkthrough`, `deleteWalkthrough`) các bài viết hướng dẫn chơi game trực tiếp từ Admin Dashboard trên Frontend.
*   **🎯 Game-Specific Logic:** Bộ lọc nâng cao hỗ trợ lọc Pokemon theo vùng địa lý (Region) và tính sẵn có trong từng bản game (Version).

---

## 📁 Cấu trúc thư mục dự án

```bash
pokedex-backend/
├── prisma/
│   ├── schema.prisma          # Định nghĩa Database Schema (Models)
│   └── seeds/                 # Chứa dữ liệu tĩnh/mock
├── scripts/
│   ├── seed.ts                # Cào dữ liệu Pokemon, Moves từ PokéAPI
│   ├── seed-abilities.ts      # Cào chi tiết Ability
│   ├── seed-items.ts          # Cào chi tiết Items
│   ├── seed-encounters.ts     # Cào điểm xuất hiện (Encounters)
│   └── seed-walkthrough.ts    # Seed dữ liệu cẩm nang từ JSON
├── src/
│   ├── db/
│   │   └── prisma.ts          # Khởi tạo PrismaClient
│   ├── graphql/
│   │   ├── resolvers.ts       # GraphQL Resolvers
│   │   └── typeDefs.ts        # GraphQL Schema (SDL)
│   ├── services/              # Logic xử lý nghiệp vụ
│   │   ├── pokemon.service.ts # Logic truy vấn Pokemon
│   │   ├── move.service.ts    # Logic truy vấn Chiêu thức
│   │   ├── ability.service.ts # Logic truy vấn Đặc tính
│   │   ├── item.service.ts    # Logic quản lý Vật phẩm
│   │   └── location.service.ts# Logic điểm xuất hiện
│   └── index.ts               # File chạy Server (Express + Apollo)
├── .env.example               # Mẫu cấu hình môi trường
├── package.json               # Cấu hình dependencies
└── tsconfig.json              # Cấu hình TypeScript
```

---

## 🛠️ Cài đặt & Chạy dưới Local

### 1. Yêu cầu hệ thống
*   **Node.js:** Phiên bản 18 trở lên.
*   **PostgreSQL:** Đã cài đặt và đang chạy dịch vụ cơ sở dữ liệu trên máy tính của bạn.

### 2. Thiết lập biến môi trường kết nối Database
Tạo file `.env` tại thư mục gốc của `/pokedex-backend` (hoặc sao chép từ `.env.example`).
Bạn có thể kết nối với DB ở Local (máy cá nhân) hoặc sử dụng Cloud DB (như Neon.tech):

**Tùy chọn A: Dùng Local PostgreSQL**
```env
DATABASE_URL="postgresql://postgres:tuan2525@localhost:5432/pokedex?schema=public"
PORT=3000
```

**Tùy chọn B: Dùng Cloud PostgreSQL (Neon.tech)**
```env
DATABASE_URL="postgresql://<neon_user>:<neon_password>@ep-xxx-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
PORT=3000
```
*Thay thế `<neon_user>`, `<neon_password>` bằng thông tin kết nối Neon của bạn. Lưu ý phải có `?sslmode=require`.*

### 3. Hướng dẫn Deploy lên Render (Production)
Backend này đã được tối ưu để dễ dàng Deploy lên **Render.com** (Web Service):
1. Kết nối repo GitHub với Render.
2. Thiết lập **Build Command**: `yarn && yarn build` (hoặc `npm install && npm run build`)
3. Thiết lập **Start Command**: `yarn start` (hoặc `npm start`)
4. Thêm biến môi trường `DATABASE_URL` (URL của Neon.tech) vào phần Environment Variables trên Render.
```bash
npm install
```

### 4. Đồng bộ Schema Database (Prisma Migration/Push)
Đẩy cấu trúc bảng trong `schema.prisma` vào cơ sở dữ liệu PostgreSQL của bạn:
```bash
npm run db:push
```
*Lưu ý: Lệnh này sẽ tự động chạy `prisma generate` để tạo ra Prisma Client tương thích với Typescript.*

### 5. Thực hiện Seeding Dữ liệu (Rất quan trọng)
Dự án yêu cầu dữ liệu ban đầu cực kỳ phong phú. Bạn chạy tuần tự các lệnh seeding sau:

```bash
# 1. Cào dữ liệu Pokémon chính, chỉ số, hệ, forms (Mega/Alolan/Galar) và chiêu thức cơ bản
npm run seed

# 2. Cào thông tin chi tiết về các Đặc tính (Ability)
npx tsx scripts/seed-abilities.ts

# 3. Cào thông tin chi tiết về các Vật phẩm (Items)
npx tsx scripts/seed-items.ts

# 4. Cào thông tin điểm xuất hiện của Pokemon trong từng bản game (Encounters)
npx tsx scripts/seed-encounters.ts

# 5. Nạp dữ liệu cẩm nang hướng dẫn chơi (Walkthroughs) từ tệp JSON tích hợp
npm run seed:walkthrough
```
*Lưu ý: Quá trình cào dữ liệu từ PokéAPI sử dụng cơ chế lưu vết và fetch tối ưu, tuy nhiên có thể mất vài phút tùy vào tốc độ mạng của bạn.*

### 6. Khởi động Server ở chế độ Phát triển (Dev)
```bash
npm run dev
```
Server sẽ chạy thành công tại địa chỉ: **`http://localhost:3000`**  
GraphQL Playground sẽ khả dụng tại: **`http://localhost:3000/graphql`**

---

## 📊 Mô hình Dữ liệu (Prisma Schema Highlights)

Các Model chính trong cơ sở dữ liệu được thiết kế tối ưu hóa quan hệ:
*   **Pokemon:** Lưu trữ ID, Tên chính, Hệ (Types), Ảnh thường & Shiny, Chiều cao, Cân nặng, Chỉ số gốc (HP, Attack, Defense...), và mô tả tổng quan.
*   **PokemonVariety:** Lưu trữ các dạng biến thể (Mega Evolution, Alolan Form, Galarian Form, Gigantamax) có liên kết `speciesId` với Pokemon chính.
*   **Move:** Chiêu thức gồm Tên, Hệ, Uy lực (Power), Độ chính xác (Accuracy), Số lần sử dụng (PP), Loại sát thương (Physical/Special/Status). Liên kết Many-to-Many với `Pokemon`.
*   **Ability:** Đặc tính của Pokémon. Liên kết Many-to-Many với `Pokemon`.
*   **Encounter:** Điểm xuất hiện Pokémon trong game. Lưu chi tiết Bản game (`versionName`), Tên địa điểm (`locationName`), Phương thức bắt (`method`), Cấp độ tối thiểu/tối đa, và Tỉ lệ xuất hiện phần trăm (`chance`).
*   **Walkthrough:** Lưu trữ bài viết cẩm nang gồm Bản game, Tiêu đề chương, Ảnh bìa, Nội dung bài viết (Markdown/Rich Text), Thứ tự chương (`order`), và Ngôn ngữ.

---

## ⚡ Các câu truy vấn GraphQL mẫu

Bạn có thể chạy thử các câu truy vấn này trực tiếp trên Sandbox GraphQL `http://localhost:3000/graphql`:

### 1. Lấy danh sách Pokémon có tìm kiếm, lọc theo Hệ và Thế hệ
```graphql
query GetPokemonList {
  pokemonList(
    limit: 20,
    offset: 0,
    search: "Charizard",
    type: "Fire",
    gen: 1
  ) {
    totalCount
    results {
      id
      name
      types
      image
      speciesId
    }
  }
}
```

### 2. Lấy chi tiết thông tin Pokémon cụ thể (kèm dạng Mega/Alternative, tiến hóa, và chiêu thức)
```graphql
query GetPokemonDetail {
  pokemon(id: 6) {
    id
    name
    types
    height
    weight
    description
    stats {
      name
      value
    }
    abilities
    evolutions {
      id
      name
      image
    }
    megaEvolutions {
      id
      name
      image
      isMega
    }
    moves {
      name
      type
      power
      pp
      learnMethod
      levelLearnedAt
    }
  }
}
```

### 3. Lưu đội hình thi đấu yêu thích (Mutation)
```graphql
mutation SaveMyTeam {
  saveTeam(pokemonIds: [1, 4, 7, 25])
}
```

### 4. Tạo hoặc Cập nhật bài viết Cẩm nang Walkthrough (Mutation - Yêu cầu quyền Admin)
```graphql
mutation UpsertWalkthrough {
  upsertWalkthrough(
    gameVersion: "emerald"
    chapterTitle: "Hành trình khởi đầu tại Littleroot Town"
    description: "Nhận Pokemon khởi đầu và chiến đấu với May/Brendan."
    coverImage: "https://example.com/emerald.png"
    content: "### Bước 1: Thiết lập đồng hồ...\n### Bước 2: Cứu giáo sư Birch khỏi Zigzagoon hoang dã..."
    order: 1
    language: "vi"
  ) {
    id
    chapterTitle
    order
  }
}
```

---

## 📦 Công nghệ chính
*   **Apollo Server & Express:** Xử lý HTTP request và tích hợp GraphQL.
*   **Prisma Client:** Tương tác DB an toàn với Type-safety hoàn hảo.
*   **TypeScript & TSX:** Viết và thực thi code TS trực tiếp, tăng năng suất phát triển.

Chúc bạn có những trải nghiệm phát triển tuyệt vời với **Elite PokéDex Backend**! Nếu có thắc mắc, vui lòng kiểm tra file `schema.prisma` hoặc đặt câu hỏi trong nhóm phát triển.
