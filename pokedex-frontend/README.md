# 🎨 Elite PokéDex Frontend - Modern React & Tailwind SPA

Chào mừng bạn đến với **PokéDex Frontend**! Đây là giao diện người dùng (UI/UX) của ứng dụng **Elite PokéDex Wiki**, một Single Page Application (SPA) cao cấp được xây dựng bằng **React**, **Vite**, **TypeScript**, **Apollo Client (GraphQL)**, **Material-UI (MUI)** và **Tailwind CSS v4**.

Với phong cách thiết kế **Dark Mode Neon**, các hiệu ứng chuyển động mượt mà (sử dụng **Framer Motion/Motion**), ứng dụng mang lại trải nghiệm tương tác trực quan sống động hàng đầu dành cho các tín đồ Pokémon.

---

## ✨ Tính năng cao cấp nổi bật

*   **⚡ Advanced PokéDex Wiki:**
    *   Tìm kiếm và lọc Pokémon theo thời gian thực (Debounced Search) kết hợp lọc theo **Hệ (Type)**, **Thế hệ (Generation)**, **Khu vực (Region)** và **Bản game (Version)**.
    *   Tự động thay đổi tông màu thẻ Pokémon (PokeCard) theo hệ chính của Pokémon đó.
*   **🎙️ PokeDetail Modal & Text-to-Speech:**
    *   Xem thông tin chi tiết: Chỉ số cơ bản (HP, Attack, Defense...) vẽ dưới dạng Radar/Bar Chart trực quan.
    *   Bảng phân tích tương khắc hệ (Type Matchups) tự động tính toán hệ số sát thương nhận vào.
    *   Tính năng **Voice Entry** tích hợp bộ đọc **Text-to-Speech (Giọng nói)** để đọc to mô tả Pokémon như một chiếc thiết bị Pokedex thực thụ trong anime!
    *   Sơ đồ tiến hóa (Evolution Chain) dạng cây dễ hiểu.
    *   Xem danh sách các dạng phụ (Alternative Forms) và dạng tiến hóa Mega.
*   **🧠 Smart Team Builder (Xây dựng Đội hình Thông minh):**
    *   Xây dựng đội hình lên tới 6 Pokémon.
    *   Tính năng **Auto-Build (Đề xuất Tự động)** sử dụng thuật toán thông minh để phân tích Pokémon và đề xuất ngay lập tức: **Bộ chiêu thức tối ưu (Moveset)**, **Đặc tính (Ability)**, **Vật phẩm trang bị (Held Item)**, và **Bản tính (Nature)** phù hợp nhất cho đấu giải.
    *   Hỗ trợ **Import/Export Team** dưới dạng tệp JSON tiện lợi.
*   **📊 Damage Calculator (Bộ tính sát thương PvP):**
    *   Công cụ giả lập chiến đấu nâng cao cho phép tính toán lượng sát thương cụ thể mà một chiêu thức của Pokémon tấn công gây ra cho Pokémon phòng thủ.
    *   Tùy chỉnh: Cấp độ, Chỉ số IVs/EVs, Bản tính (Nature), Vật phẩm, Trạng thái thời tiết và Địa hình chiến đấu.
*   **🎮 Hệ thống Wiki chuyên sâu:**
    *   **MoveDex:** Danh sách chiêu thức đầy đủ thông số (Damage Class, Uy lực, PP, Accuracy, Mô tả).
    *   **AbilityDex:** Danh mục đặc tính và lọc nhanh các Pokémon sở hữu đặc tính đó.
    *   **ItemDex:** Kho vật phẩm, Pokeball, đá tiến hóa, quả mọng (Berries) cùng giá tiền và hiệu ứng chi tiết.
    *   **LocationDex:** Tra cứu điểm bắt Pokémon hoang dã theo từng phiên bản game, cấp độ xuất hiện, phương thức bắt (câu cá, đi bụi cỏ, lướt sóng) và tỉ lệ gặp dạng phần trăm (`%`).
    *   **TypeDex & NatureDex:** Bảng tra cứu thuộc tính tương khắc và thuộc tính thay đổi chỉ số của 25 bản tính Pokémon.
*   **📝 CMS Walkthrough (Admin):**
    *   Giao diện viết bài hướng dẫn (Walkthrough) chuyên nghiệp tích hợp trình soạn thảo WYSIWYG hiện đại (**Tiptap Editor**).
    *   Hỗ trợ kéo thả sắp xếp thứ tự chương (`@hello-pangea/dnd`), lưu bài viết đa ngôn ngữ.

---

## 📁 Cấu trúc thư mục mã nguồn

```bash
pokedex-frontend/
├── src/
│   ├── components/            # Components chính
│   │   ├── PokeCard.tsx       # Thẻ Pokémon (Auto-coloring)
│   │   ├── PokeDetail.tsx     # Chi tiết (Stats, TTS Voice)
│   │   ├── TeamBuilder.tsx    # Smart Team Builder
│   │   ├── DamageCalculator.tsx # Tính sát thương PvP
│   │   ├── CatchTracker.tsx   # Danh sách Pokémon đã bắt
│   │   ├── AbilityDex.tsx     # Bảng Đặc tính
│   │   ├── MoveDex.tsx        # Bảng Chiêu thức
│   │   ├── ItemDex.tsx        # Bảng Vật phẩm
│   │   ├── LocationDex.tsx    # Điểm xuất hiện
│   │   ├── TypeDex.tsx        # Bảng song hệ
│   │   ├── NatureDex.tsx      # Tăng/giảm chỉ số
│   │   ├── Walkthrough.tsx    # Cẩm nang chơi game
│   │   └── AdminWalkthrough.tsx # Trình soạn thảo CMS (Tiptap)
│   ├── hooks/                 # Custom Hooks
│   │   └── usePokemon.ts      # Fetch dữ liệu GraphQL
│   ├── lib/                   # Context và Store
│   │   ├── ThemeContext.tsx   # Quản lý giao diện (MUI)
│   │   ├── MyPokedexContext.tsx # Quản lý yêu thích
│   │   ├── catchStore.ts      # Store Pokémon đã bắt
│   │   ├── teamStore.ts       # Store đội hình thi đấu
│   │   └── pokeApi.ts         # Cấu hình Apollo Client
│   ├── pages/                 # Trang phụ trợ
│   │   └── UIShowcase.tsx     # Showcase UI Component
│   ├── types.ts               # TypeScript interfaces
│   ├── index.css              # File CSS & Tailwind
│   ├── App.tsx                # Định tuyến Layout
│   └── main.tsx               # Entry kết nối React DOM
├── index.html                 # Tệp HTML gốc
├── package.json               # Dependencies
├── tsconfig.json              # Cấu hình TS
└── vite.config.ts             # Cấu hình Vite
```

---

## 🛠️ Cài đặt & Chạy dưới Local

### 1. Cài đặt các thư viện phụ thuộc
Đứng tại thư mục `/pokedex-frontend`, chạy lệnh sau để tải các packages:
```bash
npm install
```

### 2. Cấu hình biến môi trường kết nối API Backend
Dự án sử dụng Vite, do đó các biến môi trường cấu hình bắt buộc phải có tiền tố `VITE_`.
Tạo file `.env` tại thư mục `/pokedex-frontend`:

**Chạy Local:**
```env
VITE_GRAPHQL_API_URL=http://localhost:3000/graphql
```

**Chạy Production (Kết nối tới Backend đã deploy trên Render):**
```env
VITE_GRAPHQL_API_URL=https://<ten_app_cua_ban>.onrender.com/graphql
```
*(Ví dụ: `VITE_GRAPHQL_API_URL=https://pokedex-t9xl.onrender.com/graphql`)*

### 3. Hướng dẫn Deploy lên Vercel (Production)
Frontend này đã sẵn sàng để triển khai trực tiếp lên **Vercel**:
1. Đẩy mã nguồn lên GitHub.
2. Tại Vercel, chọn Import Project và trỏ vào thư mục `pokedex-frontend` làm Root Directory.
3. Trong phần **Environment Variables** của Vercel, hãy thêm biến:
   * Key: `VITE_GRAPHQL_API_URL`
   * Value: `https://<ten_app_cua_ban>.onrender.com/graphql` (URL của backend đang chạy trên Render)
4. Nhấn Deploy và trải nghiệm.

### 4. Khởi động ứng dụng trong môi trường phát triển (Dev Server)
```bash
npm run dev
```
Giao diện PokéDex sẽ sẵn sàng tại địa chỉ: **`http://localhost:5173`**  
Mở trình duyệt và truy cập địa chỉ trên để trải nghiệm ứng dụng!

### 4. Biên dịch đóng gói sản phẩm (Build Production)
Để tạo ra các tệp tĩnh tối ưu hóa để triển khai thực tế (deploy):
```bash
npm run build
```
Thư mục `/dist` chứa toàn bộ mã nguồn HTML/JS/CSS đã nén tối đa sẽ được sinh ra.

---

## 📦 Các thư viện công nghệ cốt lõi

*   **Vite & React 19:** Nền tảng xây dựng SPA siêu tốc với cơ chế Hot Module Replacement (HMR).
*   **Apollo Client:** Quản lý truy xuất dữ liệu GraphQL từ server và tự động lưu bộ nhớ đệm (caching) ở client để tăng tốc độ tải trang tiếp theo.
*   **Material-UI (MUI v9) & Emotion:** Cung cấp hệ thống giao diện cao cấp (Grid, Table, Modal, Select, Slider) đáp ứng tốt mọi kích thước màn hình.
*   **Tailwind CSS v4:** Viết các class tùy chỉnh giao diện nhanh chóng, linh hoạt.
*   **Zustand:** Thư viện quản lý state cực kỳ nhẹ để lưu trữ danh sách đội hình và theo dõi bắt Pokémon.
*   **Tiptap Editor:** Bộ soạn thảo WYSIWYG chuyên nghiệp hỗ trợ gõ nội dung cẩm nang dạng Rich Text, bảng biểu và chèn hình ảnh.
*   **Framer Motion:** Tạo ra các hiệu ứng mở Modal, Hover thẻ Pokémon và các chuyển động mượt mà như một ứng dụng native.

---

Chúc bạn xây dựng được những đội hình mạnh mẽ và khám phá thế giới Pokémon đầy thú vị cùng **Elite PokéDex Wiki Frontend**! 🚀
