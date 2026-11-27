# Phase 11 · Dark homepage

Nhánh `feat/phase11-dark-homepage` trong worktree `/tmp/pokedex-phase11`, xuất phát từ `61c3dc024005442891c985a347c8c7f471c5ad3e`. Commit giao nằm ở nhánh trên. Homepage dark sẵn sàng cho chủ dự án duyệt giao diện. **Production release gate vẫn HOLD** theo Phase 10.2.

## Tệp và phạm vi

- `src/pages/PokemonDex.tsx` và `src/styles/pages/PokemonDex.module.scss` trong frontend thêm hero Pikachu local, nhóm filter, toolbar và grid responsive.
- `src/components/PokeCard.tsx` và `src/styles/components/PokeCard.module.scss` thêm kiểu thẻ Dark homepage theo hue đã trích và hai hệ, nhãn Mega/Gigantamax, focus và motion. Artwork, fallback và logic ID giữ nguyên.
- `src/components/SearchBar.tsx` và `src/styles/components/SearchBar.module.scss` chỉnh giao diện tìm kiếm và dropdown khi dùng trên homepage Dark.
- `src/components/MainLayout.tsx` và `src/styles/components/MainLayout.module.scss` chỉnh shell theo route/theme, rail và focus drawer.
- `tests/browser/dark-homepage.e2e.mjs` kiểm tra viewport, tương tác và catalog. Thư mục báo cáo chứa screenshot, log, JSON và exit code.

## Kết quả

| Kiểm tra | Kết quả |
| --- | --- |
| Frontend unit `npm test` | 29/29 |
| `npm run lint`, `npm exec -- tsc --noEmit`, `npm run build` | PASS |
| Playwright reference, premium-red, runtime-qa, voice-cry | PASS |
| Playwright dark-homepage | PASS ở 1920×1080, 1440×900, 768×1024, 390×844 |
| Catalog | 1.351 ID form duy nhất, 57 trang, limit 24 |
| UI và API | Search, type, gen, region, exact dex #000, form, favorite, compare, detail, Shiny, game selector 38 lựa chọn, drawer, rail và Load More đạt |
| Ảnh baseline | Light homepage và bốn route phụ được lấy mẫu trùng từng pixel ở 1440×900 |

Danh sách đầu tiên tải 24 thẻ và Load More gửi offset 24, giữ thứ tự gốc khi ghép thành 48 ID duy nhất. Duyệt fixture qua GraphQL thu đủ 1.351 ID và đối chiếu 48 ID đầu với UI. Backend, GraphQL operations, Prisma, catalog, artwork, package manifests và lockfiles không đổi. Fixture đọc file cục bộ. Không kết nối hay ghi DB.

## Giới hạn

Sort/grid-list không có điều khiển trong baseline. Thứ tự hiện tại được kiểm qua phân trang. Các thao tác cần tài khoản hoặc dữ liệu DB thật vẫn UNVERIFIED. Voice thật vẫn BLOCKED do thiếu system voice. Còn advisory runtime High đã ghi ở Phase 10.2. Cảnh báo Recharts của Compare và console favicon đã có từ baseline. Build vẫn ghi cảnh báo Sass hiện có.

[Design system](design-system.md) · [Palette](palette.md) · [Bố cục](homepage-design-decisions.md) · [Card](card-design.md) · [Motion](animation-specification.md) · [Responsive](responsive-qa.md) · [Visual regression](visual-regression.md) · [Exit codes](results/exit-codes.tsv) · [Playwright JSON](browser-results.json)
