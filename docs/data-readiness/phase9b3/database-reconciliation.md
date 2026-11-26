# Đối chiếu database

**UNVERIFIED.** Chưa có đích staging hoặc restored backup được owner phê
duyệt. Không đọc biến kết nối để suy đoán môi trường. Không mở kết nối.
Số hàng đã đọc là 0; số discrepancy là **chưa đo**, kể cả match, thiếu,
thừa, sai trường, sai liên kết và null.

[Danh sách 10.424 khóa kỳ vọng](../../../pokedex-backend/audit/reports/phase9b3/database-row-status.csv)
gồm 1.025 species, 8.010 dex entry, 1.351 variety và 38 game. Cột actual
và database evidence để trống. Khóa game mô tả tham chiếu ứng dụng vì
schema hiện không có bảng version group.

## SQL dự kiến

Chạy trên restored backup hoặc staging sau khi xác nhận môi trường và
danh tính qua inventory được owner cung cấp. Dùng tài khoản SELECT-only.
Chỉ trả fingerprint database/role vào kênh riêng, so trước khi đọc bảng.
Nếu không khớp, kết thúc giao dịch. Không xuất bảng tài khoản hoặc secret.

```sql
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY;
SET LOCAL statement_timeout = '30s';
SET LOCAL lock_timeout = '2s';
SELECT current_database(), current_user, current_setting('transaction_read_only');
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- Tiếp tục chỉ khi danh tính và chế độ đọc đã được xác nhận.
SELECT id, "pokedexNumber", "speciesId", name, generation, "isDefault",
       hp, attack, defense, "specialAttack", "specialDefense", speed,
       "regionalDexes", "gameVersions", "altFormAvailableIn", "imageUrl", "shinyImageUrl"
FROM "Pokemon" ORDER BY "pokedexNumber";
SELECT p."pokedexNumber", t.name
FROM "_PokemonToType" j LEFT JOIN "Pokemon" p ON p.id = j."A"
LEFT JOIN "Type" t ON t.id = j."B" ORDER BY p."pokedexNumber", t.name;
SELECT p."pokedexNumber", a.name
FROM "_AbilityToPokemon" j LEFT JOIN "Ability" a ON a.id = j."A"
LEFT JOIN "Pokemon" p ON p.id = j."B" ORDER BY p."pokedexNumber", a.name;
SELECT d."regionName", d."entryNumber", d."pokemonId", p."pokedexNumber", p.name
FROM "DexEntry" d LEFT JOIN "Pokemon" p ON p.id = d."pokemonId"
ORDER BY d."regionName", d."entryNumber", p."pokedexNumber";
SELECT "regionName", "entryNumber", count(*) FROM "DexEntry"
GROUP BY "regionName", "entryNumber" HAVING count(*) > 1;
SELECT v.id, v.name, v."pokemonId", p.name AS base_name, v.types, v."isMega",
       v."isAlternative", v."imageUrl", v."shinyImageUrl"
FROM "PokemonVariety" v LEFT JOIN "Pokemon" p ON p."pokedexNumber" = v."pokemonId"
ORDER BY v.id;
SELECT e."pokemonId", e."versionName", e."locationName", e.method,
       e."minLevel", e."maxLevel", e.chance, p.name
FROM "Encounter" e LEFT JOIN "Pokemon" p ON p."pokedexNumber" = e."pokemonId"
ORDER BY e."versionName", e."pokemonId", e."locationName", e.method;
SELECT l."pokemonId", l."moveId", l."learnMethod", l."levelLearnedAt", p.name, m.name AS move
FROM "PokemonMove" l LEFT JOIN "Pokemon" p ON p."pokedexNumber" = l."pokemonId"
LEFT JOIN "Move" m ON m.id = l."moveId" ORDER BY l."pokemonId", l."moveId", l."learnMethod";
SELECT e."fromPokemonId", e."toPokemonId", f.name AS from_name, t.name AS to_name
FROM "Evolution" e LEFT JOIN "Pokemon" f ON f."pokedexNumber" = e."fromPokemonId"
LEFT JOIN "Pokemon" t ON t."pokedexNumber" = e."toPokemonId"
ORDER BY e."fromPokemonId", e."toPokemonId";
ROLLBACK;
```

Xác minh tên bảng nối dựa trên inventory trước khi thực thi. Đối chiếu export
offline theo public ID, (dex slug, National ID), variety ID, (Pokémon ID,
version, location, method), move và cạnh evolution. Đánh dấu hàng đối chiếu
được là `MATCH`, `MISSING_IN_DATABASE`, `EXTRA_IN_DATABASE`,
`FIELD_MISMATCH`, `RELATIONSHIP_MISMATCH` hoặc `NULL_VALUE`. Dùng
`SOURCE_NOT_PROVIDED` khi nguồn/schema không có trường cần thiết, và
`UNVERIFIED` khi chưa có đủ bằng chứng. Ưu tiên phát hiện FK sai trước
khi so giá trị. Cờ hidden ability theo Pokémon, version group của learnset
và condition evolution không có chỗ lưu đủ trong mô hình hiện hành.
Asset URL cần đối chiếu local inventory và quyền truy cập host riêng.
Không tự động sửa hàng sau khi xuất discrepancy.
