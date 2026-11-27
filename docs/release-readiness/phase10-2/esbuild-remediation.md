# esbuild

Advisory Low về đọc file qua development server trên Windows áp dụng cho esbuild ≥0.27.3 và <0.28.1. Baseline `tsx@4.21.0 → esbuild@0.27.7` chỉ thuộc cây dev. Nâng tsx trong major 4 lên 4.23.15. Gói này yêu cầu esbuild ~0.28.0 và npm khóa bản 0.28.2. `npm ci`, test dùng `node --import tsx`, entry point qua tsx và build tsc đều đạt trên Node 20.20.2. TypeScript giữ nguyên. Kết quả audit đầy đủ đã bỏ mục esbuild. [Advisory esbuild](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr) · [Bằng chứng backend](results/backend-exit-codes.tsv)
