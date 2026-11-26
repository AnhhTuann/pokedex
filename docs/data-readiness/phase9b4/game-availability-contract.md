# Hợp đồng game availability

Nguồn PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`; bảng game coverage và inventory form. Evidence chính thức cấp bản ghi được tách theo source type; kết luận toàn bộ **PARTIALLY VERIFIED (reference only)**, DB **UNVERIFIED**.

| Facet | Điều kiện đánh dấu có bằng chứng |
|---|---|
| REGIONAL_DEX_MEMBER | Species có entry trong một Dex được gắn với game; kèm Dex ID và entry number |
| GAME_PRESENCE_EVIDENCE | Pokémon/form index trực tiếp hoặc version-specific record có provenance; nêu nguồn, scope và giới hạn |
| OBTAINABLE | Acquisition được xác nhận cho đúng game/form qua một phương thức cụ thể |
| WILD_CATCHABLE | Encounter đúng version và form, có phương thức wild được phân loại; gift, trade, transfer hay event có hồ sơ riêng |
| TRANSFER_AVAILABLE | Nguồn xác nhận hướng transfer, game đích, form và hạn chế |
| EVENT_AVAILABLE | Sự kiện có game/form cụ thể, kèm phạm vi thời gian và khu vực nếu có |
| UNVERIFIED | Evidence thiếu, mơ hồ hoặc chưa được đối chiếu; trả trạng thái unknown ở facet tương ứng |

Mỗi assertion mang game slug, version group, định danh subject và loại subject, facet, nguồn và trạng thái. Record cùng nhóm như learnset hoặc điều kiện biến hình chỉ dùng để điều tra cho tới khi xác minh áp dụng đúng phiên bản. Dex membership không chứng minh wild catchability; species presence không chứng minh form presence.

38 game, display name, generation và Dex mappings có trong catalog. Các tập offline membership/presence/wild/gift-or-trade có khóa riêng. GraphQL hiện chọn legacy Dex scope cho UI và chưa công bố các facet xác minh. Seed cũ xây mảng availability form từ helper dựa trên game của base và luật tên, nên marker cũ chỉ có giá trị tương thích. API facet đề xuất ở Phase 9C.

[Catalog](catalog-contract.json) · [Bảng bằng chứng theo game](../../../pokedex-backend/audit/reports/phase9b-coverage/game-coverage.csv) · [Các tập ID theo facet](../../../pokedex-backend/audit/reports/phase9b-coverage/game-membership.json)
