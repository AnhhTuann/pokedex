# Đề xuất schema cho Phase 9C

Baseline Prisma `8e57448` và PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`. Bằng chứng là gap trong schema và các audit offline. Trạng thái **PROPOSED**, DB **UNVERIFIED**. Ứng dụng Phase 9B-4 chạy với schema hiện có.

1. Tách bảng Species, Form và mapping external ID có namespace; liên kết dữ liệu user hiện hữu qua legacy form key. Giữ foreign keys và deep link cho favorites, teams, walkthrough, catch store.
2. Chuẩn hóa Dex, Region, Game và VersionGroup; unique Dex/species, giữ số 0; liên kết game/Dex có provenance. Giữ legacy ORAS và Z-A cho tới khi đối chiếu riêng từng slug.
3. Thêm GameEvidence theo subject, game, facet, method, provenance và trạng thái xác minh. API nhận facet rõ ràng và biểu diễn unknown.
4. Thêm bảng VersionedLearnset với khóa form/group/move/method/slot, requirement tuỳ chọn và rule inheritance có source. Dữ liệu legacy unscoped được giữ để đối chiếu.
5. Thêm EvolutionEdge và EvolutionCondition với nhiều condition rows, group/form restrictions, raw JSON và provenance. Tách cạnh thiếu/không chắc chắn khỏi projection được xác minh qua trạng thái.
6. Thêm AssetManifest keyed form/mode, hash, stable URL, provenance và review outcome. Thêm alias được kiểm để bảo toàn đường dẫn trước khi chuyển traffic.

Sau approval của owner, lập tệp migration riêng, backup/restore plan và read-only reconciliation trên môi trường do owner chọn. Backfill theo khóa ổn định, diff từng row và giữ projection tương thích trước khi chuyển. Thử rollback về reader cũ trên bản sao với kiểm chéo tài khoản, favorites, teams, walkthrough và URL. Đối chiếu đầy đủ rồi mới đề xuất cutover.
