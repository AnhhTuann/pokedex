# 🛡️ Elite PokéDex Wiki - Fullstack GraphQL Project

Một ứng dụng Wiki Pokémon toàn diện, được xây dựng với kiến trúc Fullstack hiện đại. Dự án cung cấp kho dữ liệu khổng lồ từ Pokémon, Chiêu thức (Moves), Đặc tính (Abilities) đến thông tin khu vực (Locations) và tương khắc hệ (Type Matchups).

## 🚀 Tính năng nổi bật
- **⚡ Advanced Pokedex:** Tìm kiếm và lọc Pokémon theo Thế hệ (Generation) và Băng game (Version).
- **🎮 Game-Specific Logic:** Tự động hiển thị các Alternative Forms (Mega, Alolan, G-Max...) dựa trên bản game đang chọn (Ví dụ: Emerald không có Mega, nhưng Omega Ruby thì có).
- **📊 Bách khoa toàn thư:** Module riêng biệt cho Move Dex, Ability Dex, Item Dex, Location Dex (với tỉ lệ % xuất hiện), Type Dex (tính toán song hệ) và Nature Dex.
- **📱 Responsive UI:** Giao diện Dark Mode hiện đại, tối ưu hoàn toàn cho thiết bị di động với các hiệu ứng Drawer và Modal mượt mà.
- **🔍 Smart Search:** Tìm kiếm nhanh với cơ chế Debounce, tối ưu hóa hiệu suất gọi API.

## 🛠️ Tech Stack
- **Frontend:** React.js, Material-UI (MUI), Apollo Client (GraphQL).
- **Backend:** Node.js, Prisma ORM, GraphQL Yoga/Apollo Server.
- **Database:** PostgreSQL.
- **Language:** TypeScript (Strict Mode).
- **Data Source:** PokéAPI (Custom Seeding Logic).

## 📁 Cấu trúc dự án
- `/pokedex-frontend`: Ứng dụng React quản lý giao diện và state.
- `/pokedex-backend`: API Server quản lý Database và logic nghiệp vụ.

## ⚙️ Cách chạy dự án

### 1. Yêu cầu hệ thống
- Node.js (v18+)
- PostgreSQL (Đã cài đặt và đang chạy)

### 2. Cài đặt Backend
```bash
cd pokedex-backend
npm install
# Tạo file .env và cấu hình DATABASE_URL
npx prisma migrate dev
npx tsx scripts/seed.ts # Cào data từ PokéAPI (mất khoảng 3-5 phút)
npm run dev
```

### 3. Cài đặt Frontend
```bash
cd pokedex-frontend
npm install
npm run dev
```
Trang web sẽ chạy tại: http://localhost:5173
