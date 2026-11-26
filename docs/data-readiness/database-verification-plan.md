# Kế hoạch xác minh DB chỉ đọc

**UNVERIFIED.** Snapshot so sánh là `508fd7c`; hợp đồng hàng là
`pokedex-backend/prisma/schema.prisma` ở Phase 9B. Chỉ chạy sau khi owner
cấp kết nối staging hoặc restored backup và tài khoản có quyền SELECT.
Đưa `AUDIT_DATABASE_URL` qua cơ chế secret được duyệt, giữ URL và dữ liệu
người dùng ngoài báo cáo, kiểm host bằng kênh riêng trước khi kết nối.
Không dùng DB ứng dụng hoặc dữ liệu production.

## Các câu truy vấn để xuất và đối chiếu

Chưa thực thi. Chạy từng nhóm trong giao dịch chỉ đọc, giới hạn thời gian và
xuất theo thứ tự để so với JSON/CSV offline. Nếu vượt timeout, chia theo dải
National ID bằng tham số của client chỉ đọc.

```sql
BEGIN TRANSACTION READ ONLY;
SET LOCAL statement_timeout = '30s';
SELECT current_setting('transaction_read_only') AS read_only;

SELECT generation, "isDefault", count(*) AS records
FROM "Pokemon" GROUP BY generation, "isDefault" ORDER BY generation, "isDefault";

SELECT id, "pokedexNumber", "speciesId", name, generation, "isDefault",
       hp, attack, defense, "specialAttack", "specialDefense", speed,
       "regionalDexes", "gameVersions", "altFormAvailableIn", "imageUrl", "shinyImageUrl"
FROM "Pokemon" ORDER BY "pokedexNumber";

SELECT d."regionName", d."entryNumber", p."pokedexNumber", p.name
FROM "DexEntry" d LEFT JOIN "Pokemon" p ON p.id = d."pokemonId"
ORDER BY d."regionName", d."entryNumber", p."pokedexNumber";

SELECT "regionName", "entryNumber", count(*) AS rows
FROM "DexEntry" GROUP BY "regionName", "entryNumber" HAVING count(*) > 1;

SELECT d."regionName", d."entryNumber", p."pokedexNumber"
FROM "DexEntry" d JOIN "Pokemon" p ON p.id = d."pokemonId"
WHERE d."regionName" IN ('hoenn', 'updated-hoenn', 'lumiose-city', 'hyperspace')
   OR (p."pokedexNumber" = 494 AND d."regionName" IN ('original-unova', 'updated-unova'))
ORDER BY d."regionName", d."entryNumber", p."pokedexNumber";

SELECT v.id, v.name, v."pokemonId", p."pokedexNumber" AS base,
       v."isMega", v."isAlternative", v.types, v."imageUrl", v."shinyImageUrl"
FROM "PokemonVariety" v LEFT JOIN "Pokemon" p ON p."pokedexNumber" = v."pokemonId"
ORDER BY v.id;

SELECT p."pokedexNumber", version.slug
FROM "Pokemon" p CROSS JOIN LATERAL unnest(p."gameVersions") AS version(slug)
ORDER BY p."pokedexNumber", version.slug;

SELECT "pokemonId", "versionName", method, count(*) AS records
FROM "Encounter" GROUP BY "pokemonId", "versionName", method
ORDER BY "pokemonId", "versionName", method;

SELECT "pokemonId", "moveId", "learnMethod", "levelLearnedAt"
FROM "PokemonMove" ORDER BY "pokemonId", "moveId", "learnMethod";

SELECT e."fromPokemonId", e."toPokemonId", f.name AS from_name, t.name AS to_name
FROM "Evolution" e
LEFT JOIN "Pokemon" f ON f."pokedexNumber" = e."fromPokemonId"
LEFT JOIN "Pokemon" t ON t."pokedexNumber" = e."toPokemonId"
ORDER BY e."fromPokemonId", e."toPokemonId";
ROLLBACK;
```

## Kiểm tra sau khi được phê duyệt

- Phân biệt hàng species mặc định, Pokémon alternate và PokemonVariety. Kiểm
  đủ ID National, generation, tên, type và stats. Đối chiếu liên kết abilities
  qua quan hệ Prisma hiện tại. Nếu cờ hidden không biểu diễn được trong
  schema, ghi design gap thay vì so cờ với giá trị mặc định.
- Dùng surrogate ID cho join `DexEntry` và National ID cho variety, learnset
  và evolution. Kiểm null, số 0, orphan, entry number lặp và slug cũ/mới.
- So sánh `gameVersions` và `altFormAvailableIn` với bằng chứng per-version.
  Giữ riêng các trường hợp chỉ có learnset version-group hoặc dex membership.
- Xác minh đường dẫn Normal và Shiny với static root và inventory. Nếu cần
  HTTP validation, chỉ thử URL/host trong phạm vi đã duyệt. Không ghi URL mới.
- Compare learnset và evolution ở mức mà schema cho phép. Điều kiện tiến
  hóa và version group chưa biểu diễn được. Bổ sung dữ liệu phải qua đề xuất
  riêng. Kết thúc giao dịch và chỉ xuất số liệu có bằng chứng.
