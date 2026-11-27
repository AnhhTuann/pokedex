# Phase 11.1 · Tinh chỉnh Dark homepage

Nhánh `feat/phase11-1-dark-homepage-refinement`, worktree `/tmp/pokedex-phase11-1`, từ Phase 11 sạch và khớp GitHub tại `0793989616e427bdc544b89943d32d1901ee307b`. Commit giao thuộc nhánh Phase 11.1. Giao diện đã qua QA local và chờ chủ dự án duyệt. **Production release gate HOLD.**

## Phạm vi thay đổi

- `pokedex-frontend/src/styles/components/MainLayout.module.scss` điều chỉnh palette shell Dark homepage và gutter.
- `pokedex-frontend/src/styles/pages/PokemonDex.module.scss` và `src/pages/PokemonDex.tsx` điều chỉnh hero, filter, toolbar, grid và chỉ báo phân trang.
- `pokedex-frontend/src/styles/components/PokeCard.module.scss` và `src/components/PokeCard.tsx` tinh chỉnh thân thẻ, màu artwork, text, Mega/Gigantamax và chuyển động.
- `pokedex-frontend/src/styles/components/SearchBar.module.scss` điều chỉnh control Dark homepage.
- `pokedex-frontend/tests/browser/dark-homepage.e2e.mjs` bổ sung viewport tham chiếu và bằng chứng HTTP. `premium-red.e2e.mjs` kiểm tra lớp màu mới phía sau artwork và cho phép lưu ảnh ngoài baseline. Các bài kiểm thử tương tác cũ được giữ.

## Kết quả

| Kiểm tra | Kết quả |
| --- | --- |
| Frontend `npm test` | 29/29 |
| Lint, typecheck, production build | PASS |
| Playwright reference, premium-red, runtime-qa, voice-cry | PASS |
| Playwright dark-homepage | PASS trên năm viewport |
| Phân trang | 24 form ở offset 0; 24 tiếp theo ở offset 24, bắt đầu bằng Pidgey #0016 |
| Catalog | 1.351 form ID duy nhất qua 57 trang, đúng thứ tự đối chiếu dữ liệu local |
| Hồi quy | Light và bốn route phụ được lấy mẫu trùng từng pixel |

Backend, GraphQL, Prisma, catalog, artwork và dependency lockfiles giữ nguyên. Fixture chỉ đọc file local, không dùng DB thật. Scope Light, Detail và Compare không có thay đổi thiết kế. Không merge, deploy hoặc cập nhật các nhánh trước.

## Giới hạn

Voice thật và các luồng phụ thuộc DB vẫn giữ kết quả BLOCKED/UNVERIFIED của giai đoạn trước. Advisory High runtime ở Phase 10.2 vẫn mở. Mức giảm 73%/71% mô tả trọng số CSS của hai lớp màu, còn ảnh trước/sau là bằng chứng visual. Cảnh báo Sass và Recharts hiện có được giữ trong log.

[Thiết kế](design-refinement.md) · [Palette](palette.md) · [Thẻ](card-design.md) · [Responsive và ảnh](layout-responsive.md) · [Phân trang](pagination-verification.md) · [So sánh](visual-qa.md) · [Exit codes](results/exit-codes.tsv)
