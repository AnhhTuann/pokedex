# Kết quả audit phụ thuộc

| Phạm vi | Base 726a43f | Phase 10.2 |
| --- | --- | --- |
| Backend đầy đủ | 6 mục gồm 4 High, 1 Moderate, 1 Low | 1 High |
| Backend runtime | 5 mục gồm 4 High, 1 Moderate | 1 High |
| Backend chỉ hiện trong dev | 1 Low | 0 |
| Frontend đầy đủ | 0 | 0 |

Số mục npm audit bao gồm mục dây chuyền. Cả sáu mục baseline được xử lý qua bốn advisory gốc gồm Apollo XS-Search, GraphQL Tools mergeDeep, uuid và esbuild. Mục High hiện tại là advisory khác của utils 12.0.1. Audit backend trả exit 1 vì mục này vẫn hiện diện. [Disposition và điều kiện mở chặn](graphql-tools-security.md)

| Gói | Trước | Sau |
| --- | --- | --- |
| @apollo/server | 4.13.0 | 5.5.2 |
| @as-integrations/express4 | — | 1.1.2 |
| @graphql-tools/schema | 9.0.19 | 10.1.1 |
| @graphql-tools/merge | 8.4.2 | 9.2.4 |
| @graphql-tools/utils | 9.2.1 | 12.0.1 |
| uuid | 9.0.1 | Loại khỏi cây |
| tsx | 4.21.0 | 4.23.15 |
| esbuild | 0.27.7 | 0.28.2 |
| express / graphql | 4.22.1 / 16.13.2 | 4.22.1 / 16.13.2 |

Cập nhật manifest và lock hiện có bằng `npm install --save-exact @apollo/server@5.5.2 @as-integrations/express4@1.1.2` và `npm install --save-dev --save-exact tsx@4.23.15`. Override `qs` có từ base. Cây mới cài lại thành công bằng `npm ci`.

[Lockfile theo đường dẫn và phiên bản](results/lockfile-changes.tsv) · [Dependency tree](results/dependency-tree.txt) · [Exit codes audit](results/security-exit-codes.tsv)

[Base đầy đủ](results/npm-audit-base-full.json) · [Base runtime](results/npm-audit-base-runtime.json) · [Backend đầy đủ](results/npm-audit-backend.json) · [Backend runtime JSON](results/npm-audit-runtime.json) · [Backend npm audit --omit=dev](results/npm-audit-runtime.txt) · [Frontend](results/npm-audit-frontend.json)
