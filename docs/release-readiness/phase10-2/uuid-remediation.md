# UUID

Baseline có `@apollo/server@4.13.0 → uuid@9.0.1`. Các hàm UUID v3/v5/v6 có thể kiểm tra biên buffer không đầy đủ khi caller cung cấp buffer. Dải ảnh hưởng là <11.1.1. Apollo 5.5.2 loại bỏ dependency này. `npm ls … uuid … --all`, lockfile mới và báo cáo audit đều xác nhận đường dẫn biến mất. Mã UUID của ứng dụng giữ nguyên. GraphQL HTTP và build backend đạt sau khi loại dependency. [Advisory uuid](https://github.com/advisories/GHSA-w5hq-g745-h8pq) · [Lockfile](results/lockfile-changes.tsv)
