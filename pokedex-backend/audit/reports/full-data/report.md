# Elite PokéDex — Báo cáo kiểm toán dữ liệu

- Sinh lúc: 2026-11-23T20:19:08.146Z
- Base ref: `audit/full-data-verification@d6ba4a4`
- Chế độ: schema, source, pokeapi:cache-only, full:resume, db:offline
- Phạm vi: **đã kiểm tra 6395**, **chưa kiểm tra 15**, **chưa xác minh 12**.

> Dữ liệu trong code/schema **không** phải bằng chứng về nội dung database thật. Mọi mục `UNVERIFIED` cần chạy lại với DB staging/backup an toàn.

## 0. Phân biệt species / form / DB rows

- Species PokéAPI: **1025**
- Pokemon/form PokéAPI: **1351**
- Variety records đã kiểm tra: **1351**
- Species đã kiểm tra: **1025** (resume: 1025, lỗi: 0)
- DB rows: **BLOCKED — chưa có AUDIT_DATABASE_URL**

## 0b. Nguồn tham chiếu và độ tin cậy

| Nguồn | Độ tin cậy | Dùng để | Giới hạn |
|---|---|---|---|
| PokéAPI /pokemon-species, /pokemon, /evolution-chain, /pokemon/{id}/encounters | Tham chiếu chính thức (cao) | Master data, forms, stats, abilities, evolution conditions, encounters, game indices, learnset version groups. | Không phải bằng chứng về nội dung DB local; phiên bản tiếng Việt và nội dung biên tập không có ở PokéAPI. |
| PokéAPI /version, /version-group, /pokedex, /generation, /ability, /item | Tham chiếu chính thức (cao) | Game/version-group mapping, regional dex, generation membership, ability/item generation and version-group counts. | Item version-group counts derive from flavor_text_entries; key items without localized text may be absent. |
| pokedex-backend/public/images/** | Tài sản local (cao cho sự tồn tại file) | Kiểm tra sự hiện diện của WebP Normal/Shiny theo species và variety. | Không chứng minh DB imageUrl trỏ tới file local; cần runtime verification. |
| pokedex-frontend/src/lib/gameVersions.ts | Cấu hình ứng dụng (trung bình) | Danh sách 38 game được hỗ trợ, generation mapping, regional dex mapping. | Là ý định của sản phẩm, không phải dữ liệu game authoritative; được đối chiếu với PokéAPI. |
| pokedex-backend/prisma/schema.prisma | Hợp đồng/schema (cao cho cấu trúc) | Đối chiếu model/quan hệ; xác định các trường không thể lưu dữ liệu per-version. | Không phải bằng chứng về record hoặc giá trị trong DB. |
| pokedex-backend/prisma/seeds/walkthroughs.json | Nội dung biên tập (trung bình) | Đếm số game có walkthrough, ngôn ngữ và bản trùng. | Thiếu nội dung không tự suy ra được; cần biên tập viên cung cấp. |
| AUDIT_DATABASE_URL (read-only) | Runtime truth (chỉ khi kết nối) | Đếm record, duplicates, orphan relations và so sánh mẫu master value. | Không có trong lần chạy này → mọi khẳng định row-level bị BLOCKED. |

### Phạm vi tách biệt

- **Source/reference coverage**: {"speciesCatalog":1025,"speciesAudited":1025,"pokemonFormCatalog":1351,"formsChecked":1351,"gamesSupported":38,"gamesAudited":38,"regionalDexes":35,"learnsetMoveSlots":599264,"abilitiesResolved":374,"itemsResolved":2223,"dbRows":"NOT_IN_SCOPE"}
- **DB coverage**: {"connection":"BLOCKED","tablesWithCounts":0,"checksExecuted":0,"rowLevelCoverage":"BLOCKED","note":"No AUDIT_DATABASE_URL: no row-level claim is made anywhere in this report."}

## 1. Tổng quan database

| Model | Số record (nếu có DB) |
|---|---:|
| _không có kết nối DB_ | — |

## 2. Coverage theo Generation

| Gen | Loài (PokéAPI) | Move | Version groups |
|---:|---:|---:|---:|
| 1 | 151 | 165 | 4 |
| 2 | 100 | 86 | 2 |
| 3 | 135 | 121 | 5 |
| 4 | 107 | 113 | 3 |
| 5 | 156 | 92 | 2 |
| 6 | 72 | 62 | 2 |
| 7 | 88 | 121 | 3 |
| 8 | 96 | 108 | 5 |
| 9 | 120 | 70 | 6 |

## 3. Coverage theo Game (38 game)

- Game frontend hỗ trợ: **38**
- Game đối chiếu được với PokéAPI: **38**
- Regional dex đã kiểm tra: **35**
- Game có walkthrough: **32** / 38
- Trạng thái reference: ACCURATE=29, MISSING=6, INCORRECT=3, UNVERIFIED=0.

| Game | Gen | Version group | Regional dex | Dex entries | Species in dex | Form game-index | Encounter species | Learnset species | Move slots | Abilities | Items gen/vg | Walkthrough | Status |
|---:|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
red | 1 | red-blue | kanto | 151 | 151 | 151 | 0 | 151 | 4128 | 0 | 130/0 | có | ACCURATE
blue | 1 | red-blue | kanto | 151 | 151 | 151 | 0 | 151 | 4128 | 0 | 130/0 | có | ACCURATE
yellow | 1 | yellow | kanto | 151 | 151 | 151 | 0 | 151 | 4152 | 0 | 130/0 | có | ACCURATE
gold | 2 | gold-silver | original-johto | 251 | 251 | 251 | 0 | 251 | 9056 | 0 | 205/0 | có | ACCURATE
silver | 2 | gold-silver | original-johto | 251 | 251 | 251 | 0 | 251 | 9056 | 0 | 205/0 | có | ACCURATE
crystal | 2 | crystal | original-johto | 251 | 251 | 251 | 0 | 251 | 9286 | 0 | 205/0 | có | ACCURATE
ruby | 3 | ruby-sapphire | hoenn | 202 | 202 | 386 | 0 | 386 | 13847 | 76 | 309/281 | có | ACCURATE
sapphire | 3 | ruby-sapphire | hoenn | 202 | 202 | 386 | 0 | 386 | 13847 | 76 | 309/281 | có | ACCURATE
emerald | 3 | emerald | hoenn | 202 | 202 | 386 | 0 | 385 | 19086 | 76 | 309/309 | có | ACCURATE
firered | 3 | firered-leafgreen | kanto | 151 | 151 | 386 | 0 | 385 | 16243 | 76 | 309/307 | có | ACCURATE
leafgreen | 3 | firered-leafgreen | kanto | 151 | 151 | 386 | 0 | 385 | 16243 | 76 | 309/307 | có | ACCURATE
diamond | 4 | diamond-pearl | original-sinnoh | 151 | 151 | 493 | 0 | 493 | 25846 | 47 | 514/441 | có | ACCURATE
pearl | 4 | diamond-pearl | original-sinnoh | 151 | 151 | 493 | 0 | 493 | 25846 | 47 | 514/441 | có | ACCURATE
platinum | 4 | platinum | extended-sinnoh | 210 | 210 | 493 | 0 | 493 | 30000 | 47 | 514/445 | có | ACCURATE
heartgold | 4 | heartgold-soulsilver | updated-johto | 256 | 256 | 493 | 0 | 493 | 31285 | 47 | 514/513 | có | ACCURATE
soulsilver | 4 | heartgold-soulsilver | updated-johto | 256 | 256 | 493 | 0 | 493 | 31285 | 47 | 514/513 | có | ACCURATE
black | 5 | black-white | original-unova | 156 | 156 | 649 | 0 | 649 | 32847 | 101 | 623/606 | có | ACCURATE
white | 5 | black-white | original-unova | 156 | 156 | 649 | 0 | 649 | 32847 | 101 | 623/606 | có | ACCURATE
black-2 | 5 | black-2-white-2 | updated-unova | 301 | 301 | 649 | 0 | 649 | 40028 | 101 | 623/616 | có | ACCURATE
white-2 | 5 | black-2-white-2 | updated-unova | 301 | 301 | 649 | 0 | 649 | 40028 | 101 | 623/616 | có | ACCURATE
x | 6 | x-y | kalos-central | 153 | 153 | 721 | 0 | 721 | 39060 | 27 | 762/685 | có | ACCURATE
y | 6 | x-y | kalos-central | 153 | 153 | 721 | 0 | 721 | 39060 | 27 | 762/685 | có | ACCURATE
omega-ruby | 6 | omega-ruby-alpha-sapphire | hoenn | 202 | 202 | 721 | 0 | 721 | 47731 | 27 | 762/0 | có | INCORRECT
alpha-sapphire | 6 | omega-ruby-alpha-sapphire | hoenn | 202 | 202 | 721 | 0 | 721 | 47731 | 27 | 762/0 | có | INCORRECT
sun | 7 | sun-moon | original-alola | 302 | 302 | 802 | 0 | 802 | 41587 | 42 | 1041/809 | có | ACCURATE
moon | 7 | sun-moon | original-alola | 302 | 302 | 802 | 0 | 802 | 41587 | 42 | 1041/809 | có | ACCURATE
ultra-sun | 7 | ultra-sun-ultra-moon | updated-alola | 403 | 403 | 802 | 0 | 807 | 51436 | 42 | 1041/896 | **thiếu** | MISSING
ultra-moon | 7 | ultra-sun-ultra-moon | updated-alola | 403 | 403 | 802 | 0 | 807 | 51436 | 42 | 1041/896 | **thiếu** | MISSING
lets-go-pikachu | 7 | lets-go-pikachu-lets-go-eevee | letsgo-kanto | 153 | 153 | 802 | 0 | 153 | 4569 | 42 | 1041/1033 | có | ACCURATE
lets-go-eevee | 7 | lets-go-pikachu-lets-go-eevee | letsgo-kanto | 153 | 153 | 802 | 0 | 153 | 4569 | 42 | 1041/1033 | có | ACCURATE
sword | 8 | sword-shield | galar | 400 | 400 | 664 | 0 | 664 | 38684 | 34 | 1582/1554 | **thiếu** | MISSING
shield | 8 | sword-shield | galar | 400 | 400 | 664 | 0 | 664 | 38684 | 34 | 1582/1554 | **thiếu** | MISSING
brilliant-diamond | 8 | brilliant-diamond-shining-pearl | original-sinnoh | 151 | 151 | 664 | 0 | 493 | 24927 | 34 | 1582/0 | có | ACCURATE
shining-pearl | 8 | brilliant-diamond-shining-pearl | original-sinnoh | 151 | 151 | 664 | 0 | 493 | 24927 | 34 | 1582/0 | có | ACCURATE
legends-arceus | 8 | legends-arceus | hisui | 242 | 242 | 664 | 0 | 226 | 4687 | 34 | 1582/6 | có | ACCURATE
scarlet | 9 | scarlet-violet | paldea | 400 | 400 | 733 | 0 | 733 | 45262 | 47 | 2125/0 | **thiếu** | MISSING
violet | 9 | scarlet-violet | paldea | 400 | 400 | 733 | 0 | 733 | 45262 | 47 | 2125/0 | **thiếu** | MISSING
legends-za | 9 | legends-za | kalos-central | 153 | 153 | 733 | 0 | 364 | 16096 | 47 | 2125/0 | có | INCORRECT

> `Form game-index` = số species có ít nhất một variety xuất hiện trong game đó theo PokéAPI `game_indices`. `Encounter species` = số species có dữ liệu bắt ngoài tự nhiên; giá trị 0 có thể hợp lệ (game không có dữ liệu encounter trong reference).

## 3b. Thống kê theo Pokémon

- Hàng coverage: **1025**
- Reference ACCURATE=983, MISSING=42, UNVERIFIED=0
- Tổng move-slot theo version-group: **599264**

| ID | Name | Gen | Forms | Types | Abilities (hidden) | Evolution conditions | Learnset VG / slots | Encounter versions | Game indices | Dexes | WebP N/S | VI text | Ref status |
|---:|---|---:|---:|---|---:|---:|---:|---:|---:|---:|---|---|---|
1 | bulbasaur | 1 | 1/1 | grass/poison | 2 (1) | 2 | 25/1132 | 0 | 46 | 9 | ✓/✓ | — | ACCURATE
2 | ivysaur | 1 | 1/1 | grass/poison | 2 (1) | 2 | 25/990 | 0 | 46 | 9 | ✓/✓ | — | ACCURATE
3 | venusaur | 1 | 3/3 | grass/poison | 2 (1) | 2 | 26/1218 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
4 | charmander | 1 | 1/1 | fire | 2 (1) | 2 | 25/1268 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
5 | charmeleon | 1 | 1/1 | fire | 2 (1) | 2 | 25/1104 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
6 | charizard | 1 | 4/4 | fire/flying | 2 (1) | 2 | 26/1534 | 0 | 46 | 11 | ✓/✓ | — | ACCURATE
7 | squirtle | 1 | 1/1 | water | 2 (1) | 2 | 25/1281 | 0 | 46 | 9 | ✓/✓ | — | ACCURATE
8 | wartortle | 1 | 1/1 | water | 2 (1) | 2 | 25/1124 | 0 | 46 | 9 | ✓/✓ | — | ACCURATE
9 | blastoise | 1 | 3/3 | water | 2 (1) | 2 | 26/1442 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
10 | caterpie | 1 | 1/1 | bug | 2 (1) | 2 | 23/70 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
11 | metapod | 1 | 1/1 | bug | 1 (0) | 2 | 23/58 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
12 | butterfree | 1 | 2/2 | bug/flying | 2 (1) | 2 | 23/972 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
13 | weedle | 1 | 1/1 | bug/poison | 2 (1) | 2 | 23/65 | 0 | 33 | 7 | ✓/✓ | — | ACCURATE
14 | kakuna | 1 | 1/1 | bug/poison | 1 (0) | 2 | 23/59 | 0 | 33 | 7 | ✓/✓ | — | ACCURATE
15 | beedrill | 1 | 2/2 | bug/poison | 2 (1) | 2 | 24/958 | 0 | 33 | 9 | ✓/✓ | — | ACCURATE
16 | pidgey | 1 | 1/1 | normal/flying | 3 (1) | 2 | 23/838 | 0 | 33 | 7 | ✓/✓ | — | ACCURATE
17 | pidgeotto | 1 | 1/1 | normal/flying | 3 (1) | 2 | 23/782 | 0 | 33 | 7 | ✓/✓ | — | ACCURATE
18 | pidgeot | 1 | 2/2 | normal/flying | 3 (1) | 2 | 24/874 | 0 | 33 | 8 | ✓/✓ | — | ACCURATE
19 | rattata | 1 | 2/2 | normal | 3 (1) | 2 | 22/1016 | 0 | 33 | 16 | ✓/✓ | — | ACCURATE
20 | raticate | 1 | 3/3 | normal | 3 (1) | 2 | 22/1022 | 0 | 33 | 16 | ✓/✓ | — | ACCURATE
21 | spearow | 1 | 1/1 | normal/flying | 2 (1) | 1 | 22/829 | 0 | 33 | 14 | ✓/✓ | — | ACCURATE
22 | fearow | 1 | 1/1 | normal/flying | 2 (1) | 1 | 22/787 | 0 | 33 | 14 | ✓/✓ | — | ACCURATE
23 | ekans | 1 | 1/1 | poison | 3 (1) | 1 | 24/1096 | 0 | 39 | 11 | ✓/✓ | — | ACCURATE
24 | arbok | 1 | 1/1 | poison | 3 (1) | 1 | 25/1181 | 0 | 39 | 12 | ✓/✓ | — | ACCURATE
25 | pikachu | 1 | 17/17 | electric | 2 (1) | 2 | 27/1189 | 0 | 46 | 22 | ✗/✗ | — | MISSING
26 | raichu | 1 | 4/4 | electric | 2 (1) | 2 | 27/1099 | 0 | 46 | 22 | ✓/✓ | — | ACCURATE
27 | sandshrew | 1 | 2/2 | ground | 2 (1) | 2 | 24/1213 | 0 | 46 | 16 | ✓/✓ | — | ACCURATE
28 | sandslash | 1 | 2/2 | ground | 2 (1) | 2 | 24/1185 | 0 | 46 | 16 | ✓/✓ | — | ACCURATE
29 | nidoran-f | 1 | 1/1 | poison | 3 (1) | 2 | 23/1049 | 0 | 40 | 7 | ✓/✓ | — | ACCURATE
30 | nidorina | 1 | 1/1 | poison | 3 (1) | 2 | 23/920 | 0 | 40 | 7 | ✓/✓ | — | ACCURATE
31 | nidoqueen | 1 | 1/1 | poison/ground | 3 (1) | 2 | 23/1345 | 0 | 40 | 7 | ✓/✓ | — | ACCURATE
32 | nidoran-m | 1 | 1/1 | poison | 3 (1) | 2 | 23/1054 | 0 | 40 | 7 | ✓/✓ | — | ACCURATE
33 | nidorino | 1 | 1/1 | poison | 3 (1) | 2 | 23/914 | 0 | 40 | 7 | ✓/✓ | — | ACCURATE
34 | nidoking | 1 | 1/1 | poison/ground | 3 (1) | 2 | 23/1337 | 0 | 40 | 7 | ✓/✓ | — | ACCURATE
35 | clefairy | 1 | 1/1 | fairy | 3 (1) | 2 | 26/1645 | 0 | 46 | 17 | ✓/✓ | — | ACCURATE
36 | clefable | 1 | 2/2 | fairy | 3 (1) | 2 | 27/1570 | 0 | 46 | 18 | ✓/✓ | — | ACCURATE
37 | vulpix | 1 | 2/2 | fire | 2 (1) | 2 | 25/1124 | 0 | 46 | 16 | ✓/✓ | — | ACCURATE
38 | ninetales | 1 | 2/2 | fire | 2 (1) | 2 | 26/948 | 0 | 46 | 17 | ✓/✓ | — | ACCURATE
39 | jigglypuff | 1 | 1/1 | normal/fairy | 3 (1) | 2 | 25/1494 | 0 | 46 | 17 | ✓/✓ | — | ACCURATE
40 | wigglytuff | 1 | 1/1 | normal/fairy | 3 (1) | 2 | 25/1393 | 0 | 46 | 18 | ✓/✓ | — | ACCURATE
41 | zubat | 1 | 1/1 | poison/flying | 2 (1) | 2 | 25/1045 | 0 | 40 | 25 | ✓/✓ | — | ACCURATE
42 | golbat | 1 | 1/1 | poison/flying | 2 (1) | 2 | 25/999 | 0 | 40 | 25 | ✓/✓ | — | ACCURATE
43 | oddish | 1 | 1/1 | grass/poison | 2 (1) | 3 | 24/926 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
44 | gloom | 1 | 1/1 | grass/poison | 2 (1) | 3 | 24/851 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
45 | vileplume | 1 | 1/1 | grass/poison | 2 (1) | 3 | 25/838 | 0 | 46 | 11 | ✓/✓ | — | ACCURATE
46 | paras | 1 | 1/1 | bug/grass | 3 (1) | 1 | 23/1016 | 0 | 33 | 12 | ✓/✓ | — | ACCURATE
47 | parasect | 1 | 1/1 | bug/grass | 3 (1) | 1 | 23/938 | 0 | 33 | 12 | ✓/✓ | — | ACCURATE
48 | venonat | 1 | 1/1 | bug/poison | 3 (1) | 1 | 23/897 | 0 | 39 | 7 | ✓/✓ | — | ACCURATE
49 | venomoth | 1 | 1/1 | bug/poison | 3 (1) | 1 | 23/1004 | 0 | 39 | 7 | ✓/✓ | — | ACCURATE
50 | diglett | 1 | 2/2 | ground | 3 (1) | 1 | 24/1006 | 0 | 46 | 19 | ✓/✓ | — | ACCURATE
51 | dugtrio | 1 | 2/2 | ground | 3 (1) | 1 | 24/999 | 0 | 46 | 19 | ✓/✓ | — | ACCURATE
52 | meowth | 1 | 4/4 | normal | 3 (1) | 2 | 25/1291 | 0 | 46 | 15 | ✓/✓ | — | ACCURATE
53 | persian | 1 | 2/2 | normal | 3 (1) | 2 | 25/1270 | 0 | 46 | 16 | ✓/✓ | — | ACCURATE
54 | psyduck | 1 | 1/1 | water | 3 (1) | 1 | 25/1329 | 0 | 46 | 24 | ✓/✓ | — | ACCURATE
55 | golduck | 1 | 1/1 | water | 3 (1) | 1 | 25/1292 | 0 | 46 | 24 | ✓/✓ | — | ACCURATE
56 | mankey | 1 | 1/1 | fighting | 3 (1) | 2 | 24/1389 | 0 | 39 | 14 | ✓/✓ | — | ACCURATE
57 | primeape | 1 | 1/1 | fighting | 3 (1) | 2 | 24/1353 | 0 | 39 | 14 | ✓/✓ | — | ACCURATE
58 | growlithe | 1 | 2/2 | fire | 3 (1) | 1 | 24/1105 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
59 | arcanine | 1 | 2/2 | fire | 3 (1) | 1 | 25/947 | 0 | 46 | 15 | ✓/✓ | — | ACCURATE
60 | poliwag | 1 | 1/1 | water | 3 (1) | 3 | 24/994 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
61 | poliwhirl | 1 | 1/1 | water | 3 (1) | 3 | 24/1049 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
62 | poliwrath | 1 | 1/1 | water/fighting | 3 (1) | 3 | 24/1122 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
63 | abra | 1 | 1/1 | psychic | 3 (1) | 3 | 25/1068 | 0 | 40 | 18 | ✓/✓ | — | ACCURATE
64 | kadabra | 1 | 1/1 | psychic | 3 (1) | 3 | 25/1244 | 0 | 40 | 18 | ✓/✓ | — | ACCURATE
65 | alakazam | 1 | 2/2 | psychic | 3 (1) | 3 | 26/1359 | 0 | 40 | 19 | ✓/✓ | — | ACCURATE
66 | machop | 1 | 1/1 | fighting | 3 (1) | 3 | 25/1281 | 0 | 40 | 20 | ✓/✓ | — | ACCURATE
67 | machoke | 1 | 1/1 | fighting | 3 (1) | 3 | 25/1143 | 0 | 40 | 20 | ✓/✓ | — | ACCURATE
68 | machamp | 1 | 2/2 | fighting | 3 (1) | 3 | 26/1288 | 0 | 40 | 21 | ✓/✓ | — | ACCURATE
69 | bellsprout | 1 | 1/1 | grass/poison | 2 (1) | 2 | 24/1001 | 0 | 39 | 8 | ✓/✓ | — | ACCURATE
70 | weepinbell | 1 | 1/1 | grass/poison | 2 (1) | 2 | 24/885 | 0 | 39 | 8 | ✓/✓ | — | ACCURATE
71 | victreebel | 1 | 2/2 | grass/poison | 2 (1) | 2 | 25/871 | 0 | 39 | 9 | ✓/✓ | — | ACCURATE
72 | tentacool | 1 | 1/1 | water/poison | 3 (1) | 1 | 25/1127 | 0 | 46 | 23 | ✓/✓ | — | ACCURATE
73 | tentacruel | 1 | 1/1 | water/poison | 3 (1) | 1 | 25/1082 | 0 | 46 | 23 | ✓/✓ | — | ACCURATE
74 | geodude | 1 | 2/2 | rock/ground | 3 (1) | 3 | 24/1114 | 0 | 39 | 17 | ✓/✓ | — | ACCURATE
75 | graveler | 1 | 2/2 | rock/ground | 3 (1) | 3 | 24/1058 | 0 | 39 | 17 | ✓/✓ | — | ACCURATE
76 | golem | 1 | 2/2 | rock/ground | 3 (1) | 3 | 24/1155 | 0 | 39 | 17 | ✓/✓ | — | ACCURATE
77 | ponyta | 1 | 2/2 | fire | 3 (1) | 1 | 24/903 | 0 | 40 | 10 | ✓/✓ | — | ACCURATE
78 | rapidash | 1 | 2/2 | fire | 3 (1) | 1 | 24/945 | 0 | 40 | 10 | ✓/✓ | — | ACCURATE
79 | slowpoke | 1 | 2/2 | water/psychic | 3 (1) | 4 | 25/1455 | 0 | 46 | 16 | ✓/✓ | — | ACCURATE
80 | slowbro | 1 | 3/3 | water/psychic | 3 (1) | 4 | 26/1669 | 0 | 46 | 17 | ✓/✓ | — | ACCURATE
81 | magnemite | 1 | 1/1 | electric/steel | 3 (1) | 8 | 25/909 | 0 | 46 | 20 | ✓/✓ | — | ACCURATE
82 | magneton | 1 | 1/1 | electric/steel | 3 (1) | 8 | 25/1028 | 0 | 46 | 20 | ✓/✓ | — | ACCURATE
83 | farfetchd | 1 | 2/2 | normal/flying | 3 (1) | 1 | 24/1156 | 0 | 40 | 9 | ✓/✓ | — | ACCURATE
84 | doduo | 1 | 1/1 | normal/flying | 3 (1) | 1 | 23/850 | 0 | 39 | 9 | ✓/✓ | — | ACCURATE
85 | dodrio | 1 | 1/1 | normal/flying | 3 (1) | 1 | 23/879 | 0 | 39 | 9 | ✓/✓ | — | ACCURATE
86 | seel | 1 | 1/1 | water | 3 (1) | 1 | 23/1034 | 0 | 39 | 9 | ✓/✓ | — | ACCURATE
87 | dewgong | 1 | 1/1 | water/ice | 3 (1) | 1 | 23/975 | 0 | 39 | 9 | ✓/✓ | — | ACCURATE
88 | grimer | 1 | 2/2 | poison | 3 (1) | 1 | 23/1147 | 0 | 39 | 16 | ✓/✓ | — | ACCURATE
89 | muk | 1 | 2/2 | poison | 3 (1) | 1 | 23/1143 | 0 | 39 | 16 | ✓/✓ | — | ACCURATE
90 | shellder | 1 | 1/1 | water | 3 (1) | 1 | 24/961 | 0 | 46 | 13 | ✓/✓ | — | ACCURATE
91 | cloyster | 1 | 1/1 | water/ice | 3 (1) | 1 | 24/838 | 0 | 46 | 13 | ✓/✓ | — | ACCURATE
92 | gastly | 1 | 1/1 | ghost/poison | 1 (0) | 3 | 26/1258 | 0 | 46 | 22 | ✓/✓ | — | ACCURATE
93 | haunter | 1 | 1/1 | ghost/poison | 1 (0) | 3 | 26/1184 | 0 | 46 | 22 | ✓/✓ | — | ACCURATE
94 | gengar | 1 | 3/3 | ghost/poison | 1 (0) | 3 | 27/1505 | 0 | 46 | 23 | ✓/✓ | — | ACCURATE
95 | onix | 1 | 1/1 | rock/ground | 3 (1) | 2 | 25/1187 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
96 | drowzee | 1 | 1/1 | psychic | 3 (1) | 1 | 23/1274 | 0 | 39 | 12 | ✓/✓ | — | ACCURATE
97 | hypno | 1 | 1/1 | psychic | 3 (1) | 1 | 23/1263 | 0 | 39 | 12 | ✓/✓ | — | ACCURATE
98 | krabby | 1 | 1/1 | water | 3 (1) | 1 | 23/1081 | 0 | 40 | 7 | ✓/✓ | — | ACCURATE
99 | kingler | 1 | 2/2 | water | 3 (1) | 1 | 23/1030 | 0 | 40 | 7 | ✓/✓ | — | ACCURATE
100 | voltorb | 1 | 2/2 | electric | 3 (1) | 2 | 23/843 | 0 | 39 | 10 | ✓/✓ | — | ACCURATE
101 | electrode | 1 | 2/2 | electric | 3 (1) | 2 | 23/932 | 0 | 39 | 10 | ✓/✓ | — | ACCURATE
102 | exeggcute | 1 | 1/1 | grass/psychic | 2 (1) | 1 | 24/1140 | 0 | 46 | 12 | ✓/✓ | — | ACCURATE
103 | exeggutor | 1 | 2/2 | grass/psychic | 2 (1) | 1 | 24/974 | 0 | 46 | 12 | ✓/✓ | — | ACCURATE
104 | cubone | 1 | 1/1 | ground | 3 (1) | 2 | 24/1288 | 0 | 40 | 12 | ✓/✓ | — | ACCURATE
105 | marowak | 1 | 3/3 | ground | 3 (1) | 2 | 24/1286 | 0 | 40 | 12 | ✓/✓ | — | ACCURATE
106 | hitmonlee | 1 | 1/1 | fighting | 3 (1) | 1 | 24/1069 | 0 | 46 | 7 | ✓/✓ | — | ACCURATE
107 | hitmonchan | 1 | 1/1 | fighting | 3 (1) | 1 | 24/1087 | 0 | 46 | 7 | ✓/✓ | — | ACCURATE
108 | lickitung | 1 | 1/1 | normal | 3 (1) | 1 | 24/1449 | 0 | 40 | 12 | ✓/✓ | — | ACCURATE
109 | koffing | 1 | 1/1 | poison | 3 (1) | 1 | 24/1080 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
110 | weezing | 1 | 2/2 | poison | 3 (1) | 1 | 24/1018 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
111 | rhyhorn | 1 | 1/1 | ground/rock | 3 (1) | 3 | 25/1370 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
112 | rhydon | 1 | 1/1 | ground/rock | 3 (1) | 3 | 25/1537 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
113 | chansey | 1 | 1/1 | normal | 3 (1) | 3 | 25/1721 | 0 | 46 | 21 | ✓/✓ | — | ACCURATE
114 | tangela | 1 | 1/1 | grass | 3 (1) | 1 | 24/1093 | 0 | 40 | 9 | ✓/✓ | — | ACCURATE
115 | kangaskhan | 1 | 2/2 | normal | 3 (1) | 0 | 25/1620 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
116 | horsea | 1 | 1/1 | water | 3 (1) | 2 | 24/953 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
117 | seadra | 1 | 1/1 | water | 3 (1) | 2 | 24/894 | 0 | 46 | 10 | ✓/✓ | — | ACCURATE
118 | goldeen | 1 | 1/1 | water | 3 (1) | 1 | 23/912 | 0 | 40 | 18 | ✓/✓ | — | ACCURATE
119 | seaking | 1 | 1/1 | water | 3 (1) | 1 | 23/858 | 0 | 40 | 18 | ✓/✓ | — | ACCURATE
120 | staryu | 1 | 1/1 | water | 3 (1) | 1 | 24/1041 | 0 | 40 | 15 | ✓/✓ | — | ACCURATE
121 | starmie | 1 | 2/2 | water/psychic | 3 (1) | 1 | 25/1074 | 0 | 40 | 16 | ✓/✓ | — | ACCURATE
122 | mr-mime | 1 | 2/2 | psychic/fairy | 3 (1) | 2 | 25/1641 | 0 | 40 | 15 | ✓/✓ | — | ACCURATE
123 | scyther | 1 | 1/1 | bug/flying | 3 (1) | 3 | 26/1161 | 0 | 46 | 17 | ✓/✓ | — | ACCURATE
124 | jynx | 1 | 1/1 | ice/psychic | 3 (1) | 1 | 23/1248 | 0 | 40 | 9 | ✓/✓ | — | ACCURATE
125 | electabuzz | 1 | 1/1 | electric | 2 (1) | 3 | 25/1127 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
126 | magmar | 1 | 1/1 | fire | 2 (1) | 3 | 25/1053 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
127 | pinsir | 1 | 2/2 | bug | 3 (1) | 0 | 25/1171 | 0 | 40 | 18 | ✓/✓ | — | ACCURATE
128 | tauros | 1 | 4/4 | normal | 3 (1) | 0 | 25/1188 | 0 | 46 | 16 | ✓/✓ | — | ACCURATE
129 | magikarp | 1 | 1/1 | water | 2 (1) | 1 | 26/79 | 0 | 46 | 28 | ✓/✓ | — | ACCURATE
130 | gyarados | 1 | 2/2 | water/flying | 2 (1) | 1 | 27/1348 | 0 | 46 | 29 | ✓/✓ | — | ACCURATE
131 | lapras | 1 | 2/2 | water/ice | 3 (1) | 0 | 24/1330 | 0 | 46 | 15 | ✓/✓ | — | ACCURATE
132 | ditto | 1 | 1/1 | normal | 2 (1) | 0 | 25/25 | 0 | 46 | 15 | ✓/✓ | — | ACCURATE
133 | eevee | 1 | 3/3 | normal | 3 (1) | 19 | 26/957 | 0 | 46 | 18 | ✓/✗ | — | MISSING
134 | vaporeon | 1 | 1/1 | water | 2 (1) | 19 | 27/1220 | 0 | 46 | 19 | ✓/✓ | — | ACCURATE
135 | jolteon | 1 | 1/1 | electric | 2 (1) | 19 | 27/1192 | 0 | 46 | 19 | ✓/✓ | — | ACCURATE
136 | flareon | 1 | 1/1 | fire | 2 (1) | 19 | 27/1136 | 0 | 46 | 19 | ✓/✓ | — | ACCURATE
137 | porygon | 1 | 1/1 | normal | 3 (1) | 4 | 26/1144 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
138 | omanyte | 1 | 1/1 | rock/water | 3 (1) | 1 | 23/1047 | 0 | 40 | 8 | ✓/✓ | — | ACCURATE
139 | omastar | 1 | 1/1 | rock/water | 3 (1) | 1 | 23/1006 | 0 | 40 | 8 | ✓/✓ | — | ACCURATE
140 | kabuto | 1 | 1/1 | rock/water | 3 (1) | 1 | 23/1030 | 0 | 40 | 8 | ✓/✓ | — | ACCURATE
141 | kabutops | 1 | 1/1 | rock/water | 3 (1) | 1 | 23/1157 | 0 | 40 | 8 | ✓/✓ | — | ACCURATE
142 | aerodactyl | 1 | 2/2 | rock/flying | 3 (1) | 0 | 25/1324 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
143 | snorlax | 1 | 2/2 | normal | 3 (1) | 1 | 26/1679 | 0 | 46 | 18 | ✓/✓ | — | ACCURATE
144 | articuno | 1 | 2/2 | ice/flying | 2 (1) | 0 | 24/988 | 0 | 46 | 8 | ✓/✓ | — | ACCURATE
145 | zapdos | 1 | 2/2 | electric/flying | 2 (1) | 0 | 24/1010 | 0 | 46 | 7 | ✓/✓ | — | ACCURATE
146 | moltres | 1 | 2/2 | fire/flying | 2 (1) | 0 | 24/978 | 0 | 46 | 7 | ✓/✓ | — | ACCURATE
147 | dratini | 1 | 1/1 | dragon | 2 (1) | 2 | 25/1214 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
148 | dragonair | 1 | 1/1 | dragon | 2 (1) | 2 | 25/1123 | 0 | 46 | 14 | ✓/✓ | — | ACCURATE
149 | dragonite | 1 | 2/2 | dragon/flying | 2 (1) | 2 | 26/1746 | 0 | 46 | 15 | ✓/✓ | — | ACCURATE
150 | mewtwo | 1 | 3/3 | psychic | 2 (1) | 0 | 25/1827 | 0 | 46 | 8 | ✓/✓ | — | ACCURATE
151 | mew | 1 | 1/1 | psychic | 1 (0) | 0 | 24/2712 | 0 | 46 | 5 | ✓/✓ | — | ACCURATE
152 | chikorita | 2 | 1/1 | grass | 2 (1) | 2 | 19/941 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
153 | bayleef | 2 | 1/1 | grass | 2 (1) | 2 | 19/839 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
154 | meganium | 2 | 2/2 | grass | 2 (1) | 2 | 20/1021 | 0 | 33 | 6 | ✓/✓ | — | ACCURATE
155 | cyndaquil | 2 | 1/1 | fire | 2 (1) | 3 | 19/855 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
156 | quilava | 2 | 1/1 | fire | 2 (1) | 3 | 19/782 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
157 | typhlosion | 2 | 2/2 | fire | 2 (1) | 3 | 19/1064 | 0 | 33 | 6 | ✓/✓ | — | ACCURATE
158 | totodile | 2 | 1/1 | water | 2 (1) | 2 | 19/1086 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
159 | croconaw | 2 | 1/1 | water | 2 (1) | 2 | 19/990 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
160 | feraligatr | 2 | 2/2 | water | 2 (1) | 2 | 20/1236 | 0 | 33 | 6 | ✓/✓ | — | ACCURATE
161 | sentret | 2 | 1/1 | normal | 3 (1) | 1 | 18/1062 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
162 | furret | 2 | 1/1 | normal | 3 (1) | 1 | 18/1047 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
163 | hoothoot | 2 | 1/1 | normal/flying | 3 (1) | 1 | 19/969 | 0 | 40 | 10 | ✓/✓ | — | ACCURATE
164 | noctowl | 2 | 1/1 | normal/flying | 3 (1) | 1 | 19/908 | 0 | 40 | 10 | ✓/✓ | — | ACCURATE
165 | ledyba | 2 | 1/1 | bug/flying | 3 (1) | 1 | 17/867 | 0 | 27 | 10 | ✓/✓ | — | ACCURATE
166 | ledian | 2 | 1/1 | bug/flying | 3 (1) | 1 | 17/826 | 0 | 27 | 10 | ✓/✓ | — | ACCURATE
167 | spinarak | 2 | 1/1 | bug/poison | 3 (1) | 1 | 19/879 | 0 | 33 | 12 | ✓/✓ | — | ACCURATE
168 | ariados | 2 | 1/1 | bug/poison | 3 (1) | 1 | 20/913 | 0 | 33 | 13 | ✓/✓ | — | ACCURATE
169 | crobat | 2 | 1/1 | poison/flying | 2 (1) | 2 | 20/946 | 0 | 34 | 23 | ✓/✓ | — | ACCURATE
170 | chinchou | 2 | 1/1 | water/electric | 3 (1) | 1 | 19/922 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
171 | lanturn | 2 | 1/1 | water/electric | 3 (1) | 1 | 19/917 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
172 | pichu | 2 | 1/1 | electric | 2 (1) | 2 | 21/893 | 0 | 40 | 19 | ✓/✓ | — | ACCURATE
173 | cleffa | 2 | 1/1 | fairy | 3 (1) | 2 | 21/1116 | 0 | 40 | 15 | ✓/✓ | — | ACCURATE
174 | igglybuff | 2 | 1/1 | normal/fairy | 3 (1) | 2 | 20/1015 | 0 | 40 | 15 | ✓/✓ | — | ACCURATE
175 | togepi | 2 | 1/1 | fairy | 3 (1) | 2 | 19/1072 | 0 | 34 | 6 | ✓/✓ | — | ACCURATE
176 | togetic | 2 | 1/1 | fairy/flying | 3 (1) | 2 | 19/1119 | 0 | 34 | 6 | ✓/✓ | — | ACCURATE
177 | natu | 2 | 1/1 | psychic/flying | 3 (1) | 1 | 18/1032 | 0 | 34 | 8 | ✓/✓ | — | ACCURATE
178 | xatu | 2 | 1/1 | psychic/flying | 3 (1) | 1 | 18/956 | 0 | 34 | 8 | ✓/✓ | — | ACCURATE
179 | mareep | 2 | 1/1 | electric | 2 (1) | 2 | 19/829 | 0 | 33 | 10 | ✓/✓ | — | ACCURATE
180 | flaaffy | 2 | 1/1 | electric | 2 (1) | 2 | 19/824 | 0 | 33 | 10 | ✓/✓ | — | ACCURATE
181 | ampharos | 2 | 2/2 | electric | 2 (1) | 2 | 20/1048 | 0 | 33 | 11 | ✓/✓ | — | ACCURATE
182 | bellossom | 2 | 1/1 | grass | 2 (1) | 3 | 19/719 | 0 | 40 | 8 | ✓/✓ | — | ACCURATE
183 | marill | 2 | 1/1 | water/fairy | 3 (1) | 2 | 19/1066 | 0 | 40 | 11 | ✓/✓ | — | ACCURATE
184 | azumarill | 2 | 1/1 | water/fairy | 3 (1) | 2 | 20/1059 | 0 | 40 | 12 | ✓/✓ | — | ACCURATE
185 | sudowoodo | 2 | 1/1 | rock | 3 (1) | 1 | 20/1101 | 0 | 40 | 16 | ✓/✓ | — | ACCURATE
186 | politoed | 2 | 1/1 | water | 3 (1) | 3 | 20/920 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
187 | hoppip | 2 | 1/1 | grass/flying | 3 (1) | 2 | 18/879 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
188 | skiploom | 2 | 1/1 | grass/flying | 3 (1) | 2 | 18/782 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
189 | jumpluff | 2 | 1/1 | grass/flying | 3 (1) | 2 | 18/811 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
190 | aipom | 2 | 1/1 | normal | 3 (1) | 1 | 19/1202 | 0 | 33 | 9 | ✓/✓ | — | ACCURATE
191 | sunkern | 2 | 1/1 | grass | 3 (1) | 1 | 18/814 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
192 | sunflora | 2 | 1/1 | grass | 3 (1) | 1 | 18/750 | 0 | 33 | 5 | ✓/✓ | — | ACCURATE
193 | yanma | 2 | 1/1 | bug/flying | 3 (1) | 1 | 19/851 | 0 | 33 | 8 | ✓/✓ | — | ACCURATE
194 | wooper | 2 | 2/2 | water/ground | 3 (1) | 1 | 19/1046 | 0 | 40 | 11 | ✓/✓ | — | ACCURATE
195 | quagsire | 2 | 1/1 | water/ground | 3 (1) | 1 | 19/1029 | 0 | 40 | 10 | ✓/✓ | — | ACCURATE
196 | espeon | 2 | 1/1 | psychic | 2 (1) | 19 | 22/1099 | 0 | 40 | 17 | ✓/✓ | — | ACCURATE
197 | umbreon | 2 | 1/1 | dark | 2 (1) | 19 | 22/1066 | 0 | 40 | 17 | ✓/✓ | — | ACCURATE
198 | murkrow | 2 | 1/1 | dark/flying | 3 (1) | 1 | 19/1019 | 0 | 33 | 12 | ✓/✓ | — | ACCURATE
199 | slowking | 2 | 2/2 | water/psychic | 3 (1) | 4 | 21/1454 | 0 | 40 | 15 | ✓/✓ | — | ACCURATE
200 | misdreavus | 2 | 1/1 | ghost | 1 (0) | 1 | 19/1071 | 0 | 33 | 12 | ✓/✓ | — | ACCURATE
201 | unown | 2 | 1/1 | psychic | 1 (0) | 0 | 18/22 | 0 | 27 | 6 | ✓/✓ | — | ACCURATE
202 | wobbuffet | 2 | 1/1 | psychic | 2 (1) | 1 | 18/97 | 0 | 34 | 7 | ✓/✓ | — | ACCURATE
203 | girafarig | 2 | 1/1 | normal/psychic | 3 (1) | 1 | 18/1148 | 0 | 33 | 9 | ✓/✓ | — | ACCURATE
204 | pineco | 2 | 1/1 | bug | 2 (1) | 1 | 18/903 | 0 | 33 | 7 | ✓/✓ | — | ACCURATE
205 | forretress | 2 | 1/1 | bug/steel | 2 (1) | 1 | 19/1021 | 0 | 33 | 8 | ✓/✓ | — | ACCURATE
206 | dunsparce | 2 | 1/1 | normal | 3 (1) | 1 | 19/1266 | 0 | 40 | 10 | ✓/✓ | — | ACCURATE
207 | gligar | 2 | 1/1 | ground/flying | 3 (1) | 2 | 19/1136 | 0 | 33 | 8 | ✓/✓ | — | ACCURATE
208 | steelix | 2 | 2/2 | steel/ground | 3 (1) | 2 | 21/1164 | 0 | 34 | 12 | ✓/✓ | — | ACCURATE
209 | snubbull | 2 | 1/1 | fairy | 3 (1) | 1 | 18/1223 | 0 | 33 | 9 | ✓/✓ | — | ACCURATE
210 | granbull | 2 | 1/1 | fairy | 3 (1) | 1 | 18/1157 | 0 | 33 | 9 | ✓/✓ | — | ACCURATE
211 | qwilfish | 2 | 2/2 | water/poison | 3 (1) | 3 | 21/1178 | 0 | 40 | 10 | ✓/✓ | — | ACCURATE
212 | scizor | 2 | 2/2 | bug/steel | 3 (1) | 3 | 22/1099 | 0 | 40 | 16 | ✓/✓ | — | ACCURATE
213 | shuckle | 2 | 1/1 | bug/rock | 3 (1) | 0 | 18/880 | 0 | 34 | 7 | ✓/✓ | — | ACCURATE
214 | heracross | 2 | 2/2 | bug/fighting | 3 (1) | 0 | 22/1217 | 0 | 40 | 17 | ✓/✓ | — | ACCURATE
215 | sneasel | 2 | 2/2 | dark/ice | 3 (1) | 4 | 20/1319 | 0 | 40 | 17 | ✓/✓ | — | ACCURATE
216 | teddiursa | 2 | 1/1 | normal | 3 (1) | 2 | 19/1132 | 0 | 33 | 6 | ✓/✓ | — | ACCURATE
217 | ursaring | 2 | 1/1 | normal | 3 (1) | 2 | 19/1052 | 0 | 33 | 6 | ✓/✓ | — | ACCURATE
218 | slugma | 2 | 1/1 | fire | 3 (1) | 1 | 18/817 | 0 | 33 | 7 | ✓/✓ | — | ACCURATE
219 | magcargo | 2 | 1/1 | fire/rock | 3 (1) | 1 | 18/906 | 0 | 33 | 7 | ✓/✓ | — | ACCURATE
220 | swinub | 2 | 1/1 | ice/ground | 3 (1) | 2 | 20/986 | 0 | 40 | 10 | ✓/✓ | — | ACCURATE
221 | piloswine | 2 | 1/1 | ice/ground | 3 (1) | 2 | 20/941 | 0 | 40 | 10 | ✓/✓ | — | ACCURATE
222 | corsola | 2 | 2/2 | water/rock | 3 (1) | 1 | 18/1100 | 0 | 34 | 14 | ✓/✓ | — | ACCURATE
223 | remoraid | 2 | 1/1 | water | 3 (1) | 1 | 19/926 | 0 | 34 | 13 | ✓/✓ | — | ACCURATE
224 | octillery | 2 | 1/1 | water | 3 (1) | 1 | 19/925 | 0 | 34 | 13 | ✓/✓ | — | ACCURATE
225 | delibird | 2 | 1/1 | ice/flying | 3 (1) | 0 | 20/809 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
226 | mantine | 2 | 1/1 | water/flying | 3 (1) | 1 | 19/995 | 0 | 34 | 13 | ✓/✓ | — | ACCURATE
227 | skarmory | 2 | 2/2 | steel/flying | 3 (1) | 0 | 21/1111 | 0 | 40 | 17 | ✓/✓ | — | ACCURATE
228 | houndour | 2 | 1/1 | dark/fire | 3 (1) | 1 | 19/1085 | 0 | 33 | 10 | ✓/✓ | — | ACCURATE
229 | houndoom | 2 | 2/2 | dark/fire | 3 (1) | 1 | 20/1074 | 0 | 33 | 11 | ✓/✓ | — | ACCURATE
230 | kingdra | 2 | 1/1 | water/dragon | 3 (1) | 2 | 19/822 | 0 | 40 | 8 | ✓/✓ | — | ACCURATE
231 | phanpy | 2 | 1/1 | ground | 2 (1) | 1 | 18/838 | 0 | 33 | 6 | ✓/✓ | — | ACCURATE
232 | donphan | 2 | 1/1 | ground | 2 (1) | 1 | 18/836 | 0 | 33 | 6 | ✓/✓ | — | ACCURATE
233 | porygon2 | 2 | 1/1 | normal | 3 (1) | 4 | 21/1020 | 0 | 40 | 12 | ✓/✓ | — | ACCURATE
234 | stantler | 2 | 1/1 | normal | 3 (1) | 1 | 19/1103 | 0 | 33 | 6 | ✓/✓ | — | ACCURATE
235 | smeargle | 2 | 1/1 | normal | 3 (1) | 0 | 18/171 | 0 | 33 | 9 | ✓/✓ | — | ACCURATE
236 | tyrogue | 2 | 1/1 | fighting | 3 (1) | 1 | 19/685 | 0 | 40 | 5 | ✓/✓ | — | ACCURATE
237 | hitmontop | 2 | 1/1 | fighting | 3 (1) | 1 | 19/878 | 0 | 40 | 5 | ✓/✓ | — | ACCURATE
238 | smoochum | 2 | 1/1 | ice/psychic | 3 (1) | 1 | 18/990 | 0 | 34 | 7 | ✓/✓ | — | ACCURATE
239 | elekid | 2 | 1/1 | electric | 2 (1) | 3 | 20/981 | 0 | 40 | 12 | ✓/✓ | — | ACCURATE
240 | magby | 2 | 1/1 | fire | 2 (1) | 3 | 20/941 | 0 | 40 | 12 | ✓/✓ | — | ACCURATE
241 | miltank | 2 | 1/1 | normal | 3 (1) | 0 | 18/1171 | 0 | 34 | 11 | ✓/✓ | — | ACCURATE
242 | blissey | 2 | 1/1 | normal | 3 (1) | 3 | 20/1393 | 0 | 40 | 19 | ✓/✓ | — | ACCURATE
243 | raikou | 2 | 1/1 | electric | 2 (1) | 0 | 19/944 | 0 | 40 | 3 | ✓/✓ | — | ACCURATE
244 | entei | 2 | 1/1 | fire | 2 (1) | 0 | 19/945 | 0 | 40 | 3 | ✓/✓ | — | ACCURATE
245 | suicune | 2 | 1/1 | water | 2 (1) | 0 | 19/955 | 0 | 40 | 3 | ✓/✓ | — | ACCURATE
246 | larvitar | 2 | 1/1 | rock/ground | 2 (1) | 2 | 20/1055 | 0 | 40 | 12 | ✓/✓ | — | ACCURATE
247 | pupitar | 2 | 1/1 | rock/ground | 1 (0) | 2 | 20/945 | 0 | 40 | 12 | ✓/✓ | — | ACCURATE
248 | tyranitar | 2 | 2/2 | rock/dark | 2 (1) | 2 | 21/1558 | 0 | 40 | 13 | ✓/✓ | — | ACCURATE
249 | lugia | 2 | 1/1 | psychic/flying | 2 (1) | 0 | 19/1278 | 0 | 40 | 3 | ✓/✓ | — | ACCURATE
250 | ho-oh | 2 | 1/1 | fire/flying | 2 (1) | 0 | 19/1168 | 0 | 40 | 3 | ✓/✓ | — | ACCURATE
251 | celebi | 2 | 1/1 | psychic/grass | 1 (0) | 0 | 18/994 | 0 | 34 | 3 | ✓/✓ | — | ACCURATE
252 | treecko | 3 | 1/1 | grass | 2 (1) | 2 | 18/1057 | 0 | 37 | 6 | ✓/✓ | — | ACCURATE
253 | grovyle | 3 | 1/1 | grass | 2 (1) | 2 | 18/984 | 0 | 37 | 6 | ✓/✓ | — | ACCURATE
254 | sceptile | 3 | 2/2 | grass | 2 (1) | 2 | 19/1250 | 0 | 37 | 7 | ✓/✓ | — | ACCURATE
255 | torchic | 3 | 1/1 | fire | 2 (1) | 2 | 18/941 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
256 | combusken | 3 | 1/1 | fire/fighting | 2 (1) | 2 | 18/986 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
257 | blaziken | 3 | 2/2 | fire/fighting | 2 (1) | 2 | 19/1270 | 0 | 37 | 6 | ✓/✓ | — | ACCURATE
258 | mudkip | 3 | 1/1 | water | 2 (1) | 2 | 18/997 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
259 | marshtomp | 3 | 1/1 | water/ground | 2 (1) | 2 | 18/957 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
260 | swampert | 3 | 2/2 | water/ground | 2 (1) | 2 | 19/1190 | 0 | 37 | 6 | ✓/✓ | — | ACCURATE
261 | poochyena | 3 | 1/1 | dark | 3 (1) | 1 | 16/837 | 0 | 30 | 5 | ✓/✓ | — | ACCURATE
262 | mightyena | 3 | 1/1 | dark | 3 (1) | 1 | 16/819 | 0 | 30 | 5 | ✓/✓ | — | ACCURATE
263 | zigzagoon | 3 | 2/2 | normal | 3 (1) | 2 | 16/895 | 0 | 31 | 6 | ✓/✓ | — | ACCURATE
264 | linoone | 3 | 2/2 | normal | 3 (1) | 2 | 16/916 | 0 | 31 | 6 | ✓/✓ | — | ACCURATE
265 | wurmple | 3 | 1/1 | bug | 2 (1) | 2 | 16/69 | 0 | 24 | 6 | ✓/✓ | — | ACCURATE
266 | silcoon | 3 | 1/1 | bug | 1 (0) | 2 | 16/46 | 0 | 24 | 6 | ✓/✓ | — | ACCURATE
267 | beautifly | 3 | 1/1 | bug/flying | 2 (1) | 2 | 16/646 | 0 | 24 | 6 | ✓/✓ | — | ACCURATE
268 | cascoon | 3 | 1/1 | bug | 1 (0) | 2 | 16/46 | 0 | 24 | 6 | ✓/✓ | — | ACCURATE
269 | dustox | 3 | 1/1 | bug/poison | 2 (1) | 2 | 16/662 | 0 | 24 | 6 | ✓/✓ | — | ACCURATE
270 | lotad | 3 | 1/1 | water/grass | 3 (1) | 2 | 17/820 | 0 | 37 | 6 | ✓/✓ | — | ACCURATE
271 | lombre | 3 | 1/1 | water/grass | 3 (1) | 2 | 17/871 | 0 | 37 | 6 | ✓/✓ | — | ACCURATE
272 | ludicolo | 3 | 1/1 | water/grass | 3 (1) | 2 | 17/848 | 0 | 37 | 6 | ✓/✓ | — | ACCURATE
273 | seedot | 3 | 1/1 | grass | 3 (1) | 2 | 17/751 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
274 | nuzleaf | 3 | 1/1 | grass/dark | 3 (1) | 2 | 17/910 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
275 | shiftry | 3 | 1/1 | grass/dark | 3 (1) | 2 | 17/954 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
276 | taillow | 3 | 1/1 | normal/flying | 2 (1) | 1 | 15/643 | 0 | 24 | 4 | ✓/✓ | — | ACCURATE
277 | swellow | 3 | 1/1 | normal/flying | 2 (1) | 1 | 15/604 | 0 | 24 | 4 | ✓/✓ | — | ACCURATE
278 | wingull | 3 | 1/1 | water/flying | 3 (1) | 1 | 17/810 | 0 | 37 | 20 | ✓/✓ | — | ACCURATE
279 | pelipper | 3 | 1/1 | water/flying | 3 (1) | 1 | 18/950 | 0 | 37 | 21 | ✓/✓ | — | ACCURATE
280 | ralts | 3 | 1/1 | psychic/fairy | 3 (1) | 3 | 19/1160 | 0 | 37 | 12 | ✓/✓ | — | ACCURATE
281 | kirlia | 3 | 1/1 | psychic/fairy | 3 (1) | 3 | 19/1070 | 0 | 37 | 12 | ✓/✓ | — | ACCURATE
282 | gardevoir | 3 | 2/2 | psychic/fairy | 3 (1) | 3 | 20/1279 | 0 | 37 | 13 | ✓/✓ | — | ACCURATE
283 | surskit | 3 | 1/1 | bug/water | 2 (1) | 1 | 16/703 | 0 | 30 | 12 | ✓/✓ | — | ACCURATE
284 | masquerain | 3 | 1/1 | bug/flying | 2 (1) | 1 | 16/793 | 0 | 30 | 12 | ✓/✓ | — | ACCURATE
285 | shroomish | 3 | 1/1 | grass | 3 (1) | 1 | 16/716 | 0 | 30 | 4 | ✓/✓ | — | ACCURATE
286 | breloom | 3 | 1/1 | grass/fighting | 3 (1) | 1 | 16/915 | 0 | 30 | 4 | ✓/✓ | — | ACCURATE
287 | slakoth | 3 | 1/1 | normal | 1 (0) | 2 | 16/932 | 0 | 30 | 6 | ✓/✓ | — | ACCURATE
288 | vigoroth | 3 | 1/1 | normal | 1 (0) | 2 | 16/953 | 0 | 30 | 6 | ✓/✓ | — | ACCURATE
289 | slaking | 3 | 1/1 | normal | 1 (0) | 2 | 16/1048 | 0 | 30 | 6 | ✓/✓ | — | ACCURATE
290 | nincada | 3 | 1/1 | bug/ground | 2 (1) | 2 | 16/636 | 0 | 31 | 5 | ✓/✓ | — | ACCURATE
291 | ninjask | 3 | 1/1 | bug/flying | 2 (1) | 2 | 16/783 | 0 | 31 | 5 | ✓/✓ | — | ACCURATE
292 | shedinja | 3 | 1/1 | bug/ghost | 1 (0) | 2 | 16/678 | 0 | 31 | 5 | ✓/✓ | — | ACCURATE
293 | whismur | 3 | 1/1 | normal | 2 (1) | 2 | 16/790 | 0 | 31 | 5 | ✓/✓ | — | ACCURATE
294 | loudred | 3 | 1/1 | normal | 2 (1) | 2 | 16/885 | 0 | 31 | 5 | ✓/✓ | — | ACCURATE
295 | exploud | 3 | 1/1 | normal | 2 (1) | 2 | 16/1027 | 0 | 31 | 5 | ✓/✓ | — | ACCURATE
296 | makuhita | 3 | 1/1 | fighting | 3 (1) | 1 | 16/961 | 0 | 30 | 11 | ✓/✓ | — | ACCURATE
297 | hariyama | 3 | 1/1 | fighting | 3 (1) | 1 | 16/907 | 0 | 30 | 11 | ✓/✓ | — | ACCURATE
298 | azurill | 3 | 1/1 | normal/fairy | 3 (1) | 2 | 17/706 | 0 | 37 | 9 | ✓/✓ | — | ACCURATE
299 | nosepass | 3 | 1/1 | rock | 3 (1) | 7 | 17/877 | 0 | 30 | 12 | ✓/✓ | — | ACCURATE
300 | skitty | 3 | 1/1 | normal | 3 (1) | 1 | 15/949 | 0 | 24 | 5 | ✓/✓ | — | ACCURATE
301 | delcatty | 3 | 1/1 | normal | 3 (1) | 1 | 15/688 | 0 | 24 | 5 | ✓/✓ | — | ACCURATE
302 | sableye | 3 | 2/2 | dark/ghost | 3 (1) | 0 | 19/1384 | 0 | 37 | 15 | ✓/✓ | — | ACCURATE
303 | mawile | 3 | 2/2 | steel/fairy | 3 (1) | 0 | 18/1252 | 0 | 31 | 10 | ✓/✓ | — | ACCURATE
304 | aron | 3 | 1/1 | steel/rock | 3 (1) | 2 | 17/937 | 0 | 31 | 8 | ✓/✓ | — | ACCURATE
305 | lairon | 3 | 1/1 | steel/rock | 3 (1) | 2 | 17/866 | 0 | 31 | 8 | ✓/✓ | — | ACCURATE
306 | aggron | 3 | 2/2 | steel/rock | 3 (1) | 2 | 18/1369 | 0 | 31 | 9 | ✓/✓ | — | ACCURATE
307 | meditite | 3 | 1/1 | fighting/psychic | 2 (1) | 1 | 17/1090 | 0 | 30 | 8 | ✓/✓ | — | ACCURATE
308 | medicham | 3 | 2/2 | fighting/psychic | 2 (1) | 1 | 18/1160 | 0 | 30 | 9 | ✓/✓ | — | ACCURATE
309 | electrike | 3 | 1/1 | electric | 3 (1) | 1 | 17/834 | 0 | 31 | 8 | ✓/✓ | — | ACCURATE
310 | manectric | 3 | 2/2 | electric | 3 (1) | 1 | 18/856 | 0 | 31 | 9 | ✓/✓ | — | ACCURATE
311 | plusle | 3 | 1/1 | electric | 2 (1) | 0 | 16/799 | 0 | 30 | 5 | ✓/✓ | — | ACCURATE
312 | minun | 3 | 1/1 | electric | 2 (1) | 0 | 16/797 | 0 | 30 | 5 | ✓/✓ | — | ACCURATE
313 | volbeat | 3 | 1/1 | bug | 3 (1) | 0 | 16/901 | 0 | 30 | 5 | ✓/✓ | — | ACCURATE
314 | illumise | 3 | 1/1 | bug | 3 (1) | 0 | 16/900 | 0 | 30 | 5 | ✓/✓ | — | ACCURATE
315 | roselia | 3 | 1/1 | grass/poison | 3 (1) | 2 | 18/905 | 0 | 31 | 10 | ✓/✓ | — | ACCURATE
316 | gulpin | 3 | 1/1 | poison | 3 (1) | 1 | 17/875 | 0 | 30 | 6 | ✓/✓ | — | ACCURATE
317 | swalot | 3 | 1/1 | poison | 3 (1) | 1 | 17/919 | 0 | 30 | 7 | ✓/✓ | — | ACCURATE
318 | carvanha | 3 | 1/1 | water/dark | 2 (1) | 1 | 17/802 | 0 | 31 | 10 | ✓/✓ | — | ACCURATE
319 | sharpedo | 3 | 2/2 | water/dark | 2 (1) | 1 | 18/1003 | 0 | 31 | 11 | ✓/✓ | — | ACCURATE
320 | wailmer | 3 | 1/1 | water | 3 (1) | 1 | 16/867 | 0 | 31 | 11 | ✓/✓ | — | ACCURATE
321 | wailord | 3 | 1/1 | water | 3 (1) | 1 | 16/806 | 0 | 31 | 11 | ✓/✓ | — | ACCURATE
322 | numel | 3 | 1/1 | fire/ground | 3 (1) | 1 | 17/913 | 0 | 30 | 7 | ✓/✓ | — | ACCURATE
323 | camerupt | 3 | 2/2 | fire/ground | 3 (1) | 1 | 18/967 | 0 | 30 | 8 | ✓/✓ | — | ACCURATE
324 | torkoal | 3 | 1/1 | fire | 3 (1) | 0 | 18/996 | 0 | 37 | 13 | ✓/✓ | — | ACCURATE
325 | spoink | 3 | 1/1 | psychic | 3 (1) | 1 | 17/976 | 0 | 30 | 8 | ✓/✓ | — | ACCURATE
326 | grumpig | 3 | 1/1 | psychic | 3 (1) | 1 | 17/1087 | 0 | 30 | 8 | ✓/✓ | — | ACCURATE
327 | spinda | 3 | 1/1 | normal | 3 (1) | 0 | 15/978 | 0 | 24 | 8 | ✓/✓ | — | ACCURATE
328 | trapinch | 3 | 1/1 | ground | 3 (1) | 2 | 17/776 | 0 | 37 | 11 | ✓/✓ | — | ACCURATE
329 | vibrava | 3 | 1/1 | ground/dragon | 1 (0) | 2 | 17/847 | 0 | 37 | 11 | ✓/✓ | — | ACCURATE
330 | flygon | 3 | 1/1 | ground/dragon | 1 (0) | 2 | 17/1019 | 0 | 37 | 11 | ✓/✓ | — | ACCURATE
331 | cacnea | 3 | 1/1 | grass | 2 (1) | 1 | 16/926 | 0 | 30 | 4 | ✓/✓ | — | ACCURATE
332 | cacturne | 3 | 1/1 | grass/dark | 2 (1) | 1 | 16/900 | 0 | 30 | 4 | ✓/✓ | — | ACCURATE
333 | swablu | 3 | 1/1 | normal/flying | 2 (1) | 1 | 18/890 | 0 | 37 | 10 | ✓/✓ | — | ACCURATE
334 | altaria | 3 | 2/2 | dragon/flying | 2 (1) | 1 | 19/1129 | 0 | 37 | 11 | ✓/✓ | — | ACCURATE
335 | zangoose | 3 | 1/1 | normal | 2 (1) | 0 | 17/1252 | 0 | 30 | 8 | ✓/✓ | — | ACCURATE
336 | seviper | 3 | 1/1 | poison | 2 (1) | 0 | 17/962 | 0 | 30 | 8 | ✓/✓ | — | ACCURATE
337 | lunatone | 3 | 1/1 | rock/psychic | 1 (0) | 0 | 16/920 | 0 | 31 | 6 | ✓/✓ | — | ACCURATE
338 | solrock | 3 | 1/1 | rock/psychic | 1 (0) | 0 | 16/972 | 0 | 31 | 6 | ✓/✓ | — | ACCURATE
339 | barboach | 3 | 1/1 | water/ground | 3 (1) | 1 | 18/815 | 0 | 37 | 20 | ✓/✓ | — | ACCURATE
340 | whiscash | 3 | 1/1 | water/ground | 3 (1) | 1 | 18/886 | 0 | 37 | 20 | ✓/✓ | — | ACCURATE
341 | corphish | 3 | 1/1 | water | 3 (1) | 1 | 17/988 | 0 | 37 | 10 | ✓/✓ | — | ACCURATE
342 | crawdaunt | 3 | 1/1 | water/dark | 3 (1) | 1 | 17/1017 | 0 | 37 | 10 | ✓/✓ | — | ACCURATE
343 | baltoy | 3 | 1/1 | ground/psychic | 1 (0) | 1 | 16/884 | 0 | 31 | 8 | ✓/✓ | — | ACCURATE
344 | claydol | 3 | 1/1 | ground/psychic | 1 (0) | 1 | 16/1009 | 0 | 31 | 8 | ✓/✓ | — | ACCURATE
345 | lileep | 3 | 1/1 | rock/grass | 2 (1) | 1 | 16/746 | 0 | 31 | 6 | ✓/✓ | — | ACCURATE
346 | cradily | 3 | 1/1 | rock/grass | 2 (1) | 1 | 16/801 | 0 | 31 | 6 | ✓/✓ | — | ACCURATE
347 | anorith | 3 | 1/1 | rock/bug | 2 (1) | 1 | 16/761 | 0 | 31 | 7 | ✓/✓ | — | ACCURATE
348 | armaldo | 3 | 1/1 | rock/bug | 2 (1) | 1 | 16/826 | 0 | 31 | 7 | ✓/✓ | — | ACCURATE
349 | feebas | 3 | 1/1 | water | 3 (1) | 3 | 18/617 | 0 | 37 | 13 | ✓/✓ | — | ACCURATE
350 | milotic | 3 | 1/1 | water | 3 (1) | 3 | 19/919 | 0 | 37 | 14 | ✓/✓ | — | ACCURATE
351 | castform | 3 | 4/4 | normal | 1 (0) | 0 | 16/797 | 0 | 24 | 13 | ✓/✓ | — | ACCURATE
352 | kecleon | 3 | 1/1 | normal | 2 (1) | 0 | 16/1181 | 0 | 24 | 7 | ✓/✓ | — | ACCURATE
353 | shuppet | 3 | 1/1 | ghost | 3 (1) | 1 | 17/973 | 0 | 30 | 9 | ✓/✓ | — | ACCURATE
354 | banette | 3 | 2/2 | ghost | 3 (1) | 1 | 18/1049 | 0 | 30 | 10 | ✓/✓ | — | ACCURATE
355 | duskull | 3 | 1/1 | ghost | 2 (1) | 3 | 18/958 | 0 | 37 | 8 | ✓/✓ | — | ACCURATE
356 | dusclops | 3 | 1/1 | ghost | 2 (1) | 3 | 18/1140 | 0 | 37 | 8 | ✓/✓ | — | ACCURATE
357 | tropius | 3 | 1/1 | grass/flying | 3 (1) | 0 | 16/939 | 0 | 30 | 8 | ✓/✓ | — | ACCURATE
358 | chimecho | 3 | 2/2 | psychic | 1 (0) | 1 | 19/1083 | 0 | 30 | 11 | ✓/✓ | — | ACCURATE
359 | absol | 3 | 3/3 | dark | 3 (1) | 0 | 18/1417 | 0 | 31 | 13 | ✓/✓ | — | ACCURATE
360 | wynaut | 3 | 1/1 | psychic | 2 (1) | 1 | 16/123 | 0 | 31 | 5 | ✓/✓ | — | ACCURATE
361 | snorunt | 3 | 1/1 | ice | 3 (1) | 2 | 19/782 | 0 | 37 | 15 | ✓/✓ | — | ACCURATE
362 | glalie | 3 | 2/2 | ice | 3 (1) | 2 | 20/969 | 0 | 37 | 16 | ✓/✓ | — | ACCURATE
363 | spheal | 3 | 1/1 | ice/water | 3 (1) | 2 | 17/864 | 0 | 31 | 7 | ✓/✓ | — | ACCURATE
364 | sealeo | 3 | 1/1 | ice/water | 3 (1) | 2 | 17/749 | 0 | 31 | 7 | ✓/✓ | — | ACCURATE
365 | walrein | 3 | 1/1 | ice/water | 3 (1) | 2 | 17/827 | 0 | 31 | 7 | ✓/✓ | — | ACCURATE
366 | clamperl | 3 | 1/1 | water | 2 (1) | 2 | 15/523 | 0 | 24 | 7 | ✓/✓ | — | ACCURATE
367 | huntail | 3 | 1/1 | water | 2 (1) | 2 | 15/596 | 0 | 24 | 7 | ✓/✓ | — | ACCURATE
368 | gorebyss | 3 | 1/1 | water | 2 (1) | 2 | 15/624 | 0 | 24 | 7 | ✓/✓ | — | ACCURATE
369 | relicanth | 3 | 1/1 | water/rock | 3 (1) | 0 | 16/929 | 0 | 31 | 9 | ✓/✓ | — | ACCURATE
370 | luvdisc | 3 | 1/1 | water | 2 (1) | 0 | 16/706 | 0 | 30 | 12 | ✓/✓ | — | ACCURATE
371 | bagon | 3 | 1/1 | dragon | 2 (1) | 2 | 18/881 | 0 | 37 | 11 | ✓/✓ | — | ACCURATE
372 | shelgon | 3 | 1/1 | dragon | 2 (1) | 2 | 18/841 | 0 | 37 | 11 | ✓/✓ | — | ACCURATE
373 | salamence | 3 | 2/2 | dragon/flying | 2 (1) | 2 | 18/1072 | 0 | 37 | 12 | ✓/✓ | — | ACCURATE
374 | beldum | 3 | 1/1 | steel/psychic | 2 (1) | 2 | 18/51 | 0 | 37 | 12 | ✓/✓ | — | ACCURATE
375 | metang | 3 | 1/1 | steel/psychic | 2 (1) | 2 | 18/995 | 0 | 37 | 12 | ✓/✓ | — | ACCURATE
376 | metagross | 3 | 2/2 | steel/psychic | 2 (1) | 2 | 19/1125 | 0 | 37 | 13 | ✓/✓ | — | ACCURATE
377 | regirock | 3 | 1/1 | rock | 2 (1) | 0 | 17/911 | 0 | 37 | 4 | ✓/✓ | — | ACCURATE
378 | regice | 3 | 1/1 | ice | 2 (1) | 0 | 17/899 | 0 | 37 | 4 | ✓/✓ | — | ACCURATE
379 | registeel | 3 | 1/1 | steel | 2 (1) | 0 | 17/952 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
380 | latias | 3 | 2/2 | dragon/psychic | 1 (0) | 0 | 18/1270 | 0 | 37 | 4 | ✓/✓ | — | ACCURATE
381 | latios | 3 | 2/2 | dragon/psychic | 1 (0) | 0 | 18/1260 | 0 | 37 | 4 | ✓/✓ | — | ACCURATE
382 | kyogre | 3 | 2/2 | water | 1 (0) | 0 | 18/935 | 0 | 37 | 4 | ✓/✓ | — | ACCURATE
383 | groudon | 3 | 2/2 | ground | 1 (0) | 0 | 18/1135 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
384 | rayquaza | 3 | 2/2 | dragon/flying | 1 (0) | 0 | 18/1236 | 0 | 37 | 5 | ✓/✓ | — | ACCURATE
385 | jirachi | 3 | 1/1 | steel/psychic | 1 (0) | 0 | 17/1059 | 0 | 37 | 3 | ✓/✓ | — | ACCURATE
386 | deoxys | 3 | 4/4 | psychic | 1 (0) | 0 | 14/1003 | 0 | 30 | 3 | ✗/✗ | — | MISSING
387 | turtwig | 4 | 1/1 | grass | 2 (1) | 2 | 12/668 | 0 | 25 | 5 | ✓/✓ | — | ACCURATE
388 | grotle | 4 | 1/1 | grass | 2 (1) | 2 | 12/525 | 0 | 25 | 5 | ✓/✓ | — | ACCURATE
389 | torterra | 4 | 1/1 | grass/ground | 2 (1) | 2 | 13/788 | 0 | 25 | 6 | ✓/✓ | — | ACCURATE
390 | chimchar | 4 | 1/1 | fire | 2 (1) | 2 | 12/799 | 0 | 25 | 6 | ✓/✓ | — | ACCURATE
391 | monferno | 4 | 1/1 | fire/fighting | 2 (1) | 2 | 12/741 | 0 | 25 | 6 | ✓/✓ | — | ACCURATE
392 | infernape | 4 | 1/1 | fire/fighting | 2 (1) | 2 | 13/961 | 0 | 25 | 7 | ✓/✓ | — | ACCURATE
393 | piplup | 4 | 1/1 | water | 2 (1) | 2 | 12/670 | 0 | 25 | 6 | ✓/✓ | — | ACCURATE
394 | prinplup | 4 | 1/1 | water | 2 (1) | 2 | 12/603 | 0 | 25 | 6 | ✓/✓ | — | ACCURATE
395 | empoleon | 4 | 1/1 | water/steel | 2 (1) | 2 | 13/851 | 0 | 25 | 7 | ✓/✓ | — | ACCURATE
396 | starly | 4 | 1/1 | normal/flying | 2 (1) | 2 | 13/580 | 0 | 25 | 9 | ✓/✓ | — | ACCURATE
397 | staravia | 4 | 1/1 | normal/flying | 2 (1) | 2 | 13/487 | 0 | 25 | 9 | ✓/✓ | — | ACCURATE
398 | staraptor | 4 | 2/2 | normal/flying | 2 (1) | 2 | 14/600 | 0 | 25 | 10 | ✓/✓ | — | ACCURATE
399 | bidoof | 4 | 1/1 | normal | 3 (1) | 1 | 11/615 | 0 | 19 | 6 | ✓/✓ | — | ACCURATE
400 | bibarel | 4 | 1/1 | normal/water | 3 (1) | 1 | 11/640 | 0 | 19 | 6 | ✓/✓ | — | ACCURATE
401 | kricketot | 4 | 1/1 | bug | 2 (1) | 1 | 12/72 | 0 | 25 | 6 | ✓/✓ | — | ACCURATE
402 | kricketune | 4 | 1/1 | bug | 2 (1) | 1 | 12/540 | 0 | 25 | 6 | ✓/✓ | — | ACCURATE
403 | shinx | 4 | 1/1 | electric | 3 (1) | 2 | 13/659 | 0 | 32 | 8 | ✓/✓ | — | ACCURATE
404 | luxio | 4 | 1/1 | electric | 3 (1) | 2 | 13/538 | 0 | 32 | 8 | ✓/✓ | — | ACCURATE
405 | luxray | 4 | 1/1 | electric | 3 (1) | 2 | 14/652 | 0 | 32 | 9 | ✓/✓ | — | ACCURATE
406 | budew | 4 | 1/1 | grass/poison | 3 (1) | 2 | 13/551 | 0 | 26 | 9 | ✓/✓ | — | ACCURATE
407 | roserade | 4 | 1/1 | grass/poison | 3 (1) | 2 | 14/571 | 0 | 26 | 10 | ✓/✓ | — | ACCURATE
408 | cranidos | 4 | 1/1 | rock | 2 (1) | 1 | 12/763 | 0 | 25 | 9 | ✓/✓ | — | ACCURATE
409 | rampardos | 4 | 1/1 | rock | 2 (1) | 1 | 13/855 | 0 | 25 | 10 | ✓/✓ | — | ACCURATE
410 | shieldon | 4 | 1/1 | rock/steel | 2 (1) | 1 | 12/730 | 0 | 25 | 10 | ✓/✓ | — | ACCURATE
411 | bastiodon | 4 | 1/1 | rock/steel | 2 (1) | 1 | 13/762 | 0 | 25 | 11 | ✓/✓ | — | ACCURATE
412 | burmy | 4 | 1/1 | bug | 2 (1) | 2 | 11/62 | 0 | 19 | 5 | ✓/✓ | — | ACCURATE
413 | wormadam | 4 | 3/3 | bug/grass | 2 (1) | 2 | 11/518 | 0 | 19 | 5 | ✗/✗ | — | MISSING
414 | mothim | 4 | 1/1 | bug/flying | 2 (1) | 2 | 11/534 | 0 | 19 | 5 | ✓/✓ | — | ACCURATE
415 | combee | 4 | 1/1 | bug/flying | 2 (1) | 1 | 13/86 | 0 | 32 | 9 | ✓/✓ | — | ACCURATE
416 | vespiquen | 4 | 1/1 | bug/flying | 2 (1) | 1 | 13/658 | 0 | 32 | 9 | ✓/✓ | — | ACCURATE
417 | pachirisu | 4 | 1/1 | electric | 3 (1) | 0 | 12/671 | 0 | 25 | 7 | ✓/✓ | — | ACCURATE
418 | buizel | 4 | 1/1 | water | 2 (1) | 1 | 12/648 | 0 | 25 | 7 | ✓/✓ | — | ACCURATE
419 | floatzel | 4 | 1/1 | water | 2 (1) | 1 | 12/654 | 0 | 25 | 7 | ✓/✓ | — | ACCURATE
420 | cherubi | 4 | 1/1 | grass | 1 (0) | 1 | 12/538 | 0 | 26 | 5 | ✓/✓ | — | ACCURATE
421 | cherrim | 4 | 1/1 | grass | 1 (0) | 1 | 12/471 | 0 | 26 | 5 | ✓/✓ | — | ACCURATE
422 | shellos | 4 | 1/1 | water | 3 (1) | 1 | 13/601 | 0 | 32 | 10 | ✓/✓ | — | ACCURATE
423 | gastrodon | 4 | 1/1 | water/ground | 3 (1) | 1 | 13/639 | 0 | 32 | 10 | ✓/✓ | — | ACCURATE
424 | ambipom | 4 | 1/1 | normal | 3 (1) | 1 | 12/751 | 0 | 25 | 8 | ✓/✓ | — | ACCURATE
425 | drifloon | 4 | 1/1 | ghost/flying | 3 (1) | 1 | 13/783 | 0 | 32 | 14 | ✓/✓ | — | ACCURATE
426 | drifblim | 4 | 1/1 | ghost/flying | 3 (1) | 1 | 13/762 | 0 | 32 | 14 | ✓/✓ | — | ACCURATE
427 | buneary | 4 | 1/1 | normal | 3 (1) | 1 | 13/816 | 0 | 26 | 10 | ✓/✓ | — | ACCURATE
428 | lopunny | 4 | 2/2 | normal | 3 (1) | 1 | 14/870 | 0 | 26 | 11 | ✓/✓ | — | ACCURATE
429 | mismagius | 4 | 1/1 | ghost | 1 (0) | 1 | 12/638 | 0 | 25 | 10 | ✓/✓ | — | ACCURATE
430 | honchkrow | 4 | 1/1 | dark/flying | 3 (1) | 1 | 12/614 | 0 | 25 | 10 | ✓/✓ | — | ACCURATE
431 | glameow | 4 | 1/1 | normal | 3 (1) | 1 | 11/619 | 0 | 19 | 4 | ✓/✓ | — | ACCURATE
432 | purugly | 4 | 1/1 | normal | 3 (1) | 1 | 11/606 | 0 | 19 | 4 | ✓/✓ | — | ACCURATE
433 | chingling | 4 | 1/1 | psychic | 1 (0) | 1 | 13/682 | 0 | 25 | 9 | ✓/✓ | — | ACCURATE
434 | stunky | 4 | 1/1 | poison/dark | 3 (1) | 1 | 13/760 | 0 | 32 | 7 | ✓/✓ | — | ACCURATE
435 | skuntank | 4 | 1/1 | poison/dark | 3 (1) | 1 | 13/715 | 0 | 32 | 7 | ✓/✓ | — | ACCURATE
436 | bronzor | 4 | 1/1 | steel/psychic | 3 (1) | 1 | 13/706 | 0 | 32 | 9 | ✓/✓ | — | ACCURATE
437 | bronzong | 4 | 1/1 | steel/psychic | 3 (1) | 1 | 13/847 | 0 | 32 | 9 | ✓/✓ | — | ACCURATE
438 | bonsly | 4 | 1/1 | rock | 3 (1) | 1 | 13/639 | 0 | 32 | 14 | ✓/✓ | — | ACCURATE
439 | mime-jr | 4 | 1/1 | psychic/fairy | 3 (1) | 2 | 13/917 | 0 | 26 | 10 | ✓/✓ | — | ACCURATE
440 | happiny | 4 | 1/1 | normal | 3 (1) | 3 | 13/647 | 0 | 32 | 17 | ✓/✓ | — | ACCURATE
441 | chatot | 4 | 1/1 | normal/flying | 3 (1) | 0 | 11/553 | 0 | 19 | 5 | ✓/✓ | — | ACCURATE
442 | spiritomb | 4 | 1/1 | ghost/dark | 2 (1) | 0 | 14/793 | 0 | 32 | 8 | ✓/✓ | — | ACCURATE
443 | gible | 4 | 1/1 | dragon/ground | 2 (1) | 2 | 14/770 | 0 | 32 | 14 | ✓/✓ | — | ACCURATE
444 | gabite | 4 | 1/1 | dragon/ground | 2 (1) | 2 | 14/680 | 0 | 32 | 14 | ✓/✓ | — | ACCURATE
445 | garchomp | 4 | 3/3 | dragon/ground | 2 (1) | 2 | 15/912 | 0 | 32 | 15 | ✓/✓ | — | ACCURATE
446 | munchlax | 4 | 1/1 | normal | 3 (1) | 1 | 13/913 | 0 | 32 | 13 | ✓/✓ | — | ACCURATE
447 | riolu | 4 | 1/1 | fighting | 3 (1) | 1 | 14/861 | 0 | 32 | 16 | ✓/✓ | — | ACCURATE
448 | lucario | 4 | 3/3 | fighting/steel | 3 (1) | 1 | 15/1065 | 0 | 32 | 17 | ✓/✓ | — | ACCURATE
449 | hippopotas | 4 | 1/1 | ground | 2 (1) | 1 | 14/627 | 0 | 32 | 8 | ✓/✓ | — | ACCURATE
450 | hippowdon | 4 | 1/1 | ground | 2 (1) | 1 | 15/692 | 0 | 32 | 9 | ✓/✓ | — | ACCURATE
451 | skorupi | 4 | 1/1 | poison/bug | 3 (1) | 1 | 12/734 | 0 | 26 | 9 | ✓/✓ | — | ACCURATE
452 | drapion | 4 | 1/1 | poison/dark | 3 (1) | 1 | 12/769 | 0 | 26 | 9 | ✓/✓ | — | ACCURATE
453 | croagunk | 4 | 1/1 | poison/fighting | 3 (1) | 1 | 13/942 | 0 | 32 | 10 | ✓/✓ | — | ACCURATE
454 | toxicroak | 4 | 1/1 | poison/fighting | 3 (1) | 1 | 14/957 | 0 | 32 | 11 | ✓/✓ | — | ACCURATE
455 | carnivine | 4 | 1/1 | grass | 1 (0) | 0 | 11/578 | 0 | 19 | 7 | ✓/✓ | — | ACCURATE
456 | finneon | 4 | 1/1 | water | 3 (1) | 1 | 12/623 | 0 | 25 | 16 | ✓/✓ | — | ACCURATE
457 | lumineon | 4 | 1/1 | water | 3 (1) | 1 | 12/567 | 0 | 25 | 16 | ✓/✓ | — | ACCURATE
458 | mantyke | 4 | 1/1 | water/flying | 3 (1) | 1 | 12/607 | 0 | 26 | 11 | ✓/✓ | — | ACCURATE
459 | snover | 4 | 1/1 | grass/ice | 2 (1) | 1 | 14/692 | 0 | 32 | 10 | ✓/✓ | — | ACCURATE
460 | abomasnow | 4 | 2/2 | grass/ice | 2 (1) | 1 | 15/862 | 0 | 32 | 11 | ✓/✓ | — | ACCURATE
461 | weavile | 4 | 1/1 | dark/ice | 2 (1) | 4 | 14/978 | 0 | 32 | 16 | ✓/✓ | — | ACCURATE
462 | magnezone | 4 | 1/1 | electric/steel | 3 (1) | 8 | 13/694 | 0 | 32 | 15 | ✓/✓ | — | ACCURATE
463 | lickilicky | 4 | 1/1 | normal | 3 (1) | 1 | 12/801 | 0 | 26 | 9 | ✓/✓ | — | ACCURATE
464 | rhyperior | 4 | 1/1 | ground/rock | 3 (1) | 3 | 14/1095 | 0 | 32 | 10 | ✓/✓ | — | ACCURATE
465 | tangrowth | 4 | 1/1 | grass | 3 (1) | 1 | 12/716 | 0 | 26 | 6 | ✓/✓ | — | ACCURATE
466 | electivire | 4 | 1/1 | electric | 2 (1) | 3 | 13/808 | 0 | 32 | 10 | ✓/✓ | — | ACCURATE
467 | magmortar | 4 | 1/1 | fire | 2 (1) | 3 | 13/753 | 0 | 32 | 10 | ✓/✓ | — | ACCURATE
468 | togekiss | 4 | 1/1 | fairy/flying | 3 (1) | 2 | 12/693 | 0 | 26 | 4 | ✓/✓ | — | ACCURATE
469 | yanmega | 4 | 1/1 | bug/flying | 3 (1) | 1 | 12/614 | 0 | 25 | 7 | ✓/✓ | — | ACCURATE
470 | leafeon | 4 | 1/1 | grass | 2 (1) | 19 | 15/799 | 0 | 32 | 15 | ✓/✓ | — | ACCURATE
471 | glaceon | 4 | 1/1 | ice | 2 (1) | 19 | 15/747 | 0 | 32 | 15 | ✓/✓ | — | ACCURATE
472 | gliscor | 4 | 1/1 | ground/flying | 3 (1) | 2 | 13/910 | 0 | 25 | 7 | ✓/✓ | — | ACCURATE
473 | mamoswine | 4 | 1/1 | ice/ground | 3 (1) | 2 | 14/775 | 0 | 32 | 10 | ✓/✓ | — | ACCURATE
474 | porygon-z | 4 | 1/1 | normal | 3 (1) | 4 | 14/791 | 0 | 32 | 10 | ✓/✓ | — | ACCURATE
475 | gallade | 4 | 2/2 | psychic/fighting | 3 (1) | 3 | 15/1359 | 0 | 32 | 12 | ✓/✓ | — | ACCURATE
476 | probopass | 4 | 1/1 | rock/steel | 3 (1) | 7 | 12/732 | 0 | 25 | 11 | ✓/✓ | — | ACCURATE
477 | dusknoir | 4 | 1/1 | ghost | 2 (1) | 3 | 13/900 | 0 | 32 | 7 | ✓/✓ | — | ACCURATE
478 | froslass | 4 | 2/2 | ice/ghost | 2 (1) | 2 | 15/891 | 0 | 32 | 15 | ✓/✓ | — | ACCURATE
479 | rotom | 4 | 6/6 | electric/ghost | 1 (0) | 0 | 15/691 | 0 | 32 | 9 | ✓/✓ | — | ACCURATE
480 | uxie | 4 | 1/1 | psychic | 1 (0) | 0 | 13/830 | 0 | 32 | 4 | ✓/✓ | — | ACCURATE
481 | mesprit | 4 | 1/1 | psychic | 1 (0) | 0 | 13/824 | 0 | 32 | 4 | ✓/✓ | — | ACCURATE
482 | azelf | 4 | 1/1 | psychic | 1 (0) | 0 | 13/882 | 0 | 32 | 4 | ✓/✓ | — | ACCURATE
483 | dialga | 4 | 2/2 | steel/dragon | 2 (1) | 0 | 13/836 | 0 | 32 | 5 | ✓/✓ | — | ACCURATE
484 | palkia | 4 | 2/2 | water/dragon | 2 (1) | 0 | 13/856 | 0 | 32 | 4 | ✓/✓ | — | ACCURATE
485 | heatran | 4 | 2/2 | fire/steel | 2 (1) | 0 | 14/788 | 0 | 32 | 3 | ✓/✓ | — | ACCURATE
486 | regigigas | 4 | 1/1 | normal | 1 (0) | 0 | 13/711 | 0 | 32 | 2 | ✓/✓ | — | ACCURATE
487 | giratina | 4 | 2/2 | ghost/dragon | 2 (1) | 0 | 13/824 | 0 | 32 | 3 | ✗/✗ | — | MISSING
488 | cresselia | 4 | 1/1 | psychic | 1 (0) | 0 | 13/687 | 0 | 32 | 2 | ✓/✓ | — | ACCURATE
489 | phione | 4 | 1/1 | water | 1 (0) | 0 | 12/489 | 0 | 25 | 2 | ✓/✓ | — | ACCURATE
490 | manaphy | 4 | 1/1 | water | 1 (0) | 0 | 12/624 | 0 | 25 | 4 | ✓/✓ | — | ACCURATE
491 | darkrai | 4 | 2/2 | dark | 1 (0) | 0 | 13/853 | 0 | 25 | 3 | ✓/✓ | — | ACCURATE
492 | shaymin | 4 | 2/2 | grass | 1 (0) | 0 | 12/494 | 0 | 25 | 2 | ✗/✗ | — | MISSING
493 | arceus | 4 | 1/1 | normal | 1 (0) | 0 | 12/1173 | 0 | 25 | 3 | ✓/✓ | — | ACCURATE
494 | victini | 5 | 1/1 | psychic/fire | 1 (0) | 0 | 7/502 | 0 | 21 | 3 | ✓/✓ | — | ACCURATE
495 | snivy | 5 | 1/1 | grass | 2 (1) | 2 | 7/415 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
496 | servine | 5 | 1/1 | grass | 2 (1) | 2 | 7/362 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
497 | serperior | 5 | 1/1 | grass | 2 (1) | 2 | 8/465 | 0 | 20 | 6 | ✓/✓ | — | ACCURATE
498 | tepig | 5 | 1/1 | fire | 2 (1) | 2 | 8/455 | 0 | 20 | 6 | ✓/✓ | — | ACCURATE
499 | pignite | 5 | 1/1 | fire/fighting | 2 (1) | 2 | 8/512 | 0 | 20 | 6 | ✓/✓ | — | ACCURATE
500 | emboar | 5 | 2/2 | fire/fighting | 2 (1) | 2 | 9/670 | 0 | 20 | 7 | ✓/✓ | — | ACCURATE
501 | oshawott | 5 | 1/1 | water | 2 (1) | 2 | 8/430 | 0 | 20 | 6 | ✓/✓ | — | ACCURATE
502 | dewott | 5 | 1/1 | water | 2 (1) | 2 | 8/393 | 0 | 20 | 6 | ✓/✓ | — | ACCURATE
503 | samurott | 5 | 2/2 | water | 2 (1) | 2 | 8/501 | 0 | 20 | 7 | ✓/✓ | — | ACCURATE
504 | patrat | 5 | 1/1 | normal | 3 (1) | 1 | 7/348 | 0 | 14 | 5 | ✓/✓ | — | ACCURATE
505 | watchog | 5 | 1/1 | normal | 3 (1) | 1 | 8/490 | 0 | 14 | 6 | ✓/✓ | — | ACCURATE
506 | lillipup | 5 | 1/1 | normal | 3 (1) | 2 | 7/397 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
507 | herdier | 5 | 1/1 | normal | 3 (1) | 2 | 7/344 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
508 | stoutland | 5 | 1/1 | normal | 3 (1) | 2 | 7/389 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
509 | purrloin | 5 | 1/1 | dark | 3 (1) | 1 | 8/483 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
510 | liepard | 5 | 1/1 | dark | 3 (1) | 1 | 9/536 | 0 | 21 | 7 | ✓/✓ | — | ACCURATE
511 | pansage | 5 | 1/1 | grass | 2 (1) | 1 | 7/440 | 0 | 14 | 6 | ✓/✓ | — | ACCURATE
512 | simisage | 5 | 1/1 | grass | 2 (1) | 1 | 8/396 | 0 | 14 | 7 | ✓/✓ | — | ACCURATE
513 | pansear | 5 | 1/1 | fire | 2 (1) | 1 | 7/456 | 0 | 14 | 6 | ✓/✓ | — | ACCURATE
514 | simisear | 5 | 1/1 | fire | 2 (1) | 1 | 8/417 | 0 | 14 | 7 | ✓/✓ | — | ACCURATE
515 | panpour | 5 | 1/1 | water | 2 (1) | 1 | 7/459 | 0 | 14 | 6 | ✓/✓ | — | ACCURATE
516 | simipour | 5 | 1/1 | water | 2 (1) | 1 | 8/417 | 0 | 14 | 7 | ✓/✓ | — | ACCURATE
517 | munna | 5 | 1/1 | psychic | 3 (1) | 1 | 8/495 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
518 | musharna | 5 | 1/1 | psychic | 3 (1) | 1 | 9/429 | 0 | 21 | 7 | ✓/✓ | — | ACCURATE
519 | pidove | 5 | 1/1 | normal/flying | 3 (1) | 2 | 7/332 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
520 | tranquill | 5 | 1/1 | normal/flying | 3 (1) | 2 | 7/299 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
521 | unfezant | 5 | 1/1 | normal/flying | 3 (1) | 2 | 7/321 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
522 | blitzle | 5 | 1/1 | electric | 3 (1) | 1 | 7/345 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
523 | zebstrika | 5 | 1/1 | electric | 3 (1) | 1 | 7/339 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
524 | roggenrola | 5 | 1/1 | rock | 3 (1) | 2 | 7/344 | 0 | 21 | 13 | ✓/✓ | — | ACCURATE
525 | boldore | 5 | 1/1 | rock | 3 (1) | 2 | 7/318 | 0 | 21 | 13 | ✓/✓ | — | ACCURATE
526 | gigalith | 5 | 1/1 | rock | 3 (1) | 2 | 7/349 | 0 | 21 | 13 | ✓/✓ | — | ACCURATE
527 | woobat | 5 | 1/1 | psychic/flying | 3 (1) | 1 | 7/506 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
528 | swoobat | 5 | 1/1 | psychic/flying | 3 (1) | 1 | 7/472 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
529 | drilbur | 5 | 1/1 | ground | 3 (1) | 1 | 9/466 | 0 | 27 | 7 | ✓/✓ | — | ACCURATE
530 | excadrill | 5 | 2/2 | ground/steel | 3 (1) | 1 | 10/553 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
531 | audino | 5 | 2/2 | normal | 3 (1) | 0 | 9/718 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
532 | timburr | 5 | 1/1 | fighting | 3 (1) | 2 | 8/509 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
533 | gurdurr | 5 | 1/1 | fighting | 3 (1) | 2 | 8/446 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
534 | conkeldurr | 5 | 1/1 | fighting | 3 (1) | 2 | 9/547 | 0 | 27 | 9 | ✓/✓ | — | ACCURATE
535 | tympole | 5 | 1/1 | water | 3 (1) | 2 | 7/334 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
536 | palpitoad | 5 | 1/1 | water/ground | 3 (1) | 2 | 7/310 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
537 | seismitoad | 5 | 1/1 | water/ground | 3 (1) | 2 | 7/443 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
538 | throh | 5 | 1/1 | fighting | 3 (1) | 0 | 8/443 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
539 | sawk | 5 | 1/1 | fighting | 3 (1) | 0 | 8/441 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
540 | sewaddle | 5 | 1/1 | bug/grass | 3 (1) | 2 | 7/332 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
541 | swadloon | 5 | 1/1 | bug/grass | 3 (1) | 2 | 7/260 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
542 | leavanny | 5 | 1/1 | bug/grass | 3 (1) | 2 | 7/418 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
543 | venipede | 5 | 1/1 | bug/poison | 3 (1) | 2 | 8/341 | 0 | 21 | 7 | ✓/✓ | — | ACCURATE
544 | whirlipede | 5 | 1/1 | bug/poison | 3 (1) | 2 | 8/326 | 0 | 21 | 7 | ✓/✓ | — | ACCURATE
545 | scolipede | 5 | 2/2 | bug/poison | 3 (1) | 2 | 9/505 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
546 | cottonee | 5 | 1/1 | grass/fairy | 3 (1) | 1 | 8/418 | 0 | 27 | 15 | ✓/✓ | — | ACCURATE
547 | whimsicott | 5 | 1/1 | grass/fairy | 3 (1) | 1 | 9/432 | 0 | 27 | 16 | ✓/✓ | — | ACCURATE
548 | petilil | 5 | 1/1 | grass | 3 (1) | 1 | 9/406 | 0 | 27 | 16 | ✓/✓ | — | ACCURATE
549 | lilligant | 5 | 2/2 | grass | 3 (1) | 1 | 8/334 | 0 | 27 | 16 | ✓/✓ | — | ACCURATE
550 | basculin | 5 | 3/3 | water | 3 (1) | 2 | 8/429 | 0 | 27 | 13 | ✗/✗ | — | MISSING
551 | sandile | 5 | 1/1 | ground/dark | 3 (1) | 2 | 9/546 | 0 | 27 | 13 | ✓/✓ | — | ACCURATE
552 | krokorok | 5 | 1/1 | ground/dark | 3 (1) | 2 | 9/559 | 0 | 27 | 13 | ✓/✓ | — | ACCURATE
553 | krookodile | 5 | 1/1 | ground/dark | 3 (1) | 2 | 10/746 | 0 | 27 | 14 | ✓/✓ | — | ACCURATE
554 | darumaka | 5 | 2/2 | fire | 2 (1) | 2 | 7/444 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
555 | darmanitan | 5 | 4/4 | fire | 2 (1) | 2 | 7/496 | 0 | 21 | 6 | ✗/✗ | — | MISSING
556 | maractus | 5 | 1/1 | grass | 3 (1) | 0 | 7/398 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
557 | dwebble | 5 | 1/1 | bug/rock | 3 (1) | 1 | 7/405 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
558 | crustle | 5 | 1/1 | bug/rock | 3 (1) | 1 | 7/381 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
559 | scraggy | 5 | 1/1 | dark/fighting | 3 (1) | 1 | 9/665 | 0 | 27 | 11 | ✓/✓ | — | ACCURATE
560 | scrafty | 5 | 2/2 | dark/fighting | 3 (1) | 1 | 10/723 | 0 | 27 | 12 | ✓/✓ | — | ACCURATE
561 | sigilyph | 5 | 1/1 | psychic/flying | 3 (1) | 0 | 7/487 | 0 | 21 | 5 | ✓/✓ | — | ACCURATE
562 | yamask | 5 | 2/2 | ghost | 1 (0) | 3 | 8/456 | 0 | 21 | 5 | ✓/✓ | — | ACCURATE
563 | cofagrigus | 5 | 1/1 | ghost | 1 (0) | 3 | 9/508 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
564 | tirtouga | 5 | 1/1 | water/rock | 3 (1) | 1 | 7/443 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
565 | carracosta | 5 | 1/1 | water/rock | 3 (1) | 1 | 7/417 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
566 | archen | 5 | 1/1 | rock/flying | 1 (0) | 1 | 7/469 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
567 | archeops | 5 | 1/1 | rock/flying | 1 (0) | 1 | 7/461 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
568 | trubbish | 5 | 1/1 | poison | 3 (1) | 1 | 8/395 | 0 | 21 | 10 | ✓/✓ | — | ACCURATE
569 | garbodor | 5 | 2/2 | poison | 3 (1) | 1 | 9/486 | 0 | 21 | 11 | ✓/✓ | — | ACCURATE
570 | zorua | 5 | 2/2 | dark | 1 (0) | 1 | 8/514 | 0 | 27 | 11 | ✓/✓ | — | ACCURATE
571 | zoroark | 5 | 2/2 | dark | 1 (0) | 1 | 9/627 | 0 | 27 | 12 | ✓/✓ | — | ACCURATE
572 | minccino | 5 | 1/1 | normal | 3 (1) | 1 | 8/470 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
573 | cinccino | 5 | 1/1 | normal | 3 (1) | 1 | 8/390 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
574 | gothita | 5 | 1/1 | psychic | 3 (1) | 2 | 8/552 | 0 | 27 | 9 | ✓/✓ | — | ACCURATE
575 | gothorita | 5 | 1/1 | psychic | 3 (1) | 2 | 8/516 | 0 | 27 | 9 | ✓/✓ | — | ACCURATE
576 | gothitelle | 5 | 1/1 | psychic | 3 (1) | 2 | 8/556 | 0 | 27 | 9 | ✓/✓ | — | ACCURATE
577 | solosis | 5 | 1/1 | psychic | 3 (1) | 2 | 8/522 | 0 | 27 | 7 | ✓/✓ | — | ACCURATE
578 | duosion | 5 | 1/1 | psychic | 3 (1) | 2 | 8/488 | 0 | 27 | 7 | ✓/✓ | — | ACCURATE
579 | reuniclus | 5 | 1/1 | psychic | 3 (1) | 2 | 9/651 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
580 | ducklett | 5 | 1/1 | water/flying | 3 (1) | 1 | 7/343 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
581 | swanna | 5 | 1/1 | water/flying | 3 (1) | 1 | 7/331 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
582 | vanillite | 5 | 1/1 | ice | 3 (1) | 2 | 8/370 | 0 | 21 | 11 | ✓/✓ | — | ACCURATE
583 | vanillish | 5 | 1/1 | ice | 3 (1) | 2 | 8/334 | 0 | 21 | 11 | ✓/✓ | — | ACCURATE
584 | vanilluxe | 5 | 1/1 | ice | 3 (1) | 2 | 9/412 | 0 | 21 | 12 | ✓/✓ | — | ACCURATE
585 | deerling | 5 | 1/1 | normal/grass | 3 (1) | 1 | 7/386 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
586 | sawsbuck | 5 | 1/1 | normal/grass | 3 (1) | 1 | 7/388 | 0 | 20 | 5 | ✓/✓ | — | ACCURATE
587 | emolga | 5 | 1/1 | electric/flying | 2 (1) | 0 | 9/494 | 0 | 21 | 12 | ✓/✓ | — | ACCURATE
588 | karrablast | 5 | 1/1 | bug | 3 (1) | 1 | 7/339 | 0 | 21 | 7 | ✓/✓ | — | ACCURATE
589 | escavalier | 5 | 1/1 | bug/steel | 3 (1) | 1 | 7/362 | 0 | 21 | 7 | ✓/✓ | — | ACCURATE
590 | foongus | 5 | 1/1 | grass/poison | 2 (1) | 1 | 9/413 | 0 | 27 | 7 | ✓/✓ | — | ACCURATE
591 | amoonguss | 5 | 1/1 | grass/poison | 2 (1) | 1 | 9/402 | 0 | 27 | 7 | ✓/✓ | — | ACCURATE
592 | frillish | 5 | 1/1 | water/ghost | 3 (1) | 1 | 7/411 | 0 | 21 | 7 | ✗/✗ | — | MISSING
593 | jellicent | 5 | 1/1 | water/ghost | 3 (1) | 1 | 7/405 | 0 | 21 | 7 | ✗/✗ | — | MISSING
594 | alomomola | 5 | 1/1 | water | 3 (1) | 0 | 7/403 | 0 | 20 | 10 | ✓/✓ | — | ACCURATE
595 | joltik | 5 | 1/1 | bug/electric | 3 (1) | 1 | 8/438 | 0 | 27 | 7 | ✓/✓ | — | ACCURATE
596 | galvantula | 5 | 1/1 | bug/electric | 3 (1) | 1 | 8/425 | 0 | 27 | 7 | ✓/✓ | — | ACCURATE
597 | ferroseed | 5 | 1/1 | grass/steel | 1 (0) | 1 | 7/380 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
598 | ferrothorn | 5 | 1/1 | grass/steel | 2 (1) | 1 | 7/428 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
599 | klink | 5 | 1/1 | steel | 3 (1) | 2 | 7/290 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
600 | klang | 5 | 1/1 | steel | 3 (1) | 2 | 7/310 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
601 | klinklang | 5 | 1/1 | steel | 3 (1) | 2 | 7/347 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
602 | tynamo | 5 | 1/1 | electric | 1 (0) | 2 | 8/51 | 0 | 20 | 7 | ✓/✓ | — | ACCURATE
603 | eelektrik | 5 | 1/1 | electric | 1 (0) | 2 | 8/362 | 0 | 20 | 7 | ✓/✓ | — | ACCURATE
604 | eelektross | 5 | 2/2 | electric | 1 (0) | 2 | 9/537 | 0 | 20 | 8 | ✓/✓ | — | ACCURATE
605 | elgyem | 5 | 1/1 | psychic | 3 (1) | 1 | 7/488 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
606 | beheeyem | 5 | 1/1 | psychic | 3 (1) | 1 | 7/475 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
607 | litwick | 5 | 1/1 | ghost/fire | 3 (1) | 2 | 9/527 | 0 | 27 | 9 | ✓/✓ | — | ACCURATE
608 | lampent | 5 | 1/1 | ghost/fire | 3 (1) | 2 | 9/487 | 0 | 27 | 9 | ✓/✓ | — | ACCURATE
609 | chandelure | 5 | 2/2 | ghost/fire | 3 (1) | 2 | 10/478 | 0 | 27 | 10 | ✓/✓ | — | ACCURATE
610 | axew | 5 | 1/1 | dragon | 3 (1) | 2 | 8/505 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
611 | fraxure | 5 | 1/1 | dragon | 3 (1) | 2 | 8/472 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
612 | haxorus | 5 | 1/1 | dragon | 3 (1) | 2 | 8/547 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
613 | cubchoo | 5 | 1/1 | ice | 3 (1) | 1 | 8/461 | 0 | 27 | 9 | ✓/✓ | — | ACCURATE
614 | beartic | 5 | 1/1 | ice | 3 (1) | 1 | 9/631 | 0 | 27 | 10 | ✓/✓ | — | ACCURATE
615 | cryogonal | 5 | 1/1 | ice | 1 (0) | 0 | 9/455 | 0 | 27 | 7 | ✓/✓ | — | ACCURATE
616 | shelmet | 5 | 1/1 | bug | 3 (1) | 1 | 7/324 | 0 | 21 | 7 | ✓/✓ | — | ACCURATE
617 | accelgor | 5 | 1/1 | bug | 3 (1) | 1 | 7/341 | 0 | 21 | 7 | ✓/✓ | — | ACCURATE
618 | stunfisk | 5 | 2/2 | ground/electric | 3 (1) | 0 | 9/542 | 0 | 21 | 7 | ✓/✓ | — | ACCURATE
619 | mienfoo | 5 | 1/1 | fighting | 3 (1) | 1 | 8/528 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
620 | mienshao | 5 | 1/1 | fighting | 3 (1) | 1 | 8/521 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
621 | druddigon | 5 | 1/1 | dragon | 3 (1) | 0 | 7/547 | 0 | 21 | 8 | ✓/✓ | — | ACCURATE
622 | golett | 5 | 1/1 | ground/ghost | 3 (1) | 1 | 9/518 | 0 | 27 | 10 | ✓/✓ | — | ACCURATE
623 | golurk | 5 | 2/2 | ground/ghost | 3 (1) | 1 | 10/718 | 0 | 27 | 11 | ✓/✓ | — | ACCURATE
624 | pawniard | 5 | 1/1 | dark/steel | 3 (1) | 2 | 8/534 | 0 | 27 | 11 | ✓/✓ | — | ACCURATE
625 | bisharp | 5 | 1/1 | dark/steel | 3 (1) | 2 | 8/551 | 0 | 27 | 11 | ✓/✓ | — | ACCURATE
626 | bouffalant | 5 | 1/1 | normal | 3 (1) | 0 | 7/418 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
627 | rufflet | 5 | 1/1 | normal/flying | 3 (1) | 1 | 9/399 | 0 | 27 | 15 | ✓/✓ | — | ACCURATE
628 | braviary | 5 | 2/2 | normal/flying | 3 (1) | 1 | 8/444 | 0 | 27 | 15 | ✓/✓ | — | ACCURATE
629 | vullaby | 5 | 1/1 | dark/flying | 3 (1) | 1 | 8/464 | 0 | 27 | 13 | ✓/✓ | — | ACCURATE
630 | mandibuzz | 5 | 1/1 | dark/flying | 3 (1) | 1 | 8/483 | 0 | 27 | 13 | ✓/✓ | — | ACCURATE
631 | heatmor | 5 | 1/1 | fire | 3 (1) | 0 | 7/468 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
632 | durant | 5 | 1/1 | bug/steel | 3 (1) | 0 | 7/391 | 0 | 21 | 6 | ✓/✓ | — | ACCURATE
633 | deino | 5 | 1/1 | dark/dragon | 1 (0) | 2 | 8/461 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
634 | zweilous | 5 | 1/1 | dark/dragon | 1 (0) | 2 | 8/411 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
635 | hydreigon | 5 | 1/1 | dark/dragon | 1 (0) | 2 | 9/696 | 0 | 27 | 9 | ✓/✓ | — | ACCURATE
636 | larvesta | 5 | 1/1 | bug/fire | 2 (1) | 1 | 8/405 | 0 | 27 | 8 | ✓/✓ | — | ACCURATE
637 | volcarona | 5 | 1/1 | bug/fire | 2 (1) | 1 | 9/548 | 0 | 27 | 9 | ✓/✓ | — | ACCURATE
638 | cobalion | 5 | 1/1 | steel/fighting | 1 (0) | 0 | 9/520 | 0 | 27 | 5 | ✓/✓ | — | ACCURATE
639 | terrakion | 5 | 1/1 | rock/fighting | 1 (0) | 0 | 9/517 | 0 | 27 | 6 | ✓/✓ | — | ACCURATE
640 | virizion | 5 | 1/1 | grass/fighting | 1 (0) | 0 | 9/523 | 0 | 27 | 5 | ✓/✓ | — | ACCURATE
641 | tornadus | 5 | 2/2 | flying | 2 (1) | 0 | 9/526 | 0 | 27 | 4 | ✗/✗ | — | MISSING
642 | thundurus | 5 | 2/2 | electric/flying | 2 (1) | 0 | 9/573 | 0 | 27 | 4 | ✗/✗ | — | MISSING
643 | reshiram | 5 | 1/1 | dragon/fire | 1 (0) | 0 | 8/529 | 0 | 27 | 4 | ✓/✓ | — | ACCURATE
644 | zekrom | 5 | 1/1 | dragon/electric | 1 (0) | 0 | 8/546 | 0 | 27 | 4 | ✓/✓ | — | ACCURATE
645 | landorus | 5 | 2/2 | ground/flying | 2 (1) | 0 | 9/535 | 0 | 27 | 4 | ✗/✗ | — | MISSING
646 | kyurem | 5 | 3/3 | dragon/ice | 1 (0) | 0 | 8/510 | 0 | 27 | 3 | ✓/✓ | — | ACCURATE
647 | keldeo | 5 | 2/2 | water/fighting | 1 (0) | 0 | 9/519 | 0 | 27 | 4 | ✗/✗ | — | MISSING
648 | meloetta | 5 | 2/2 | normal/psychic | 1 (0) | 0 | 8/606 | 0 | 20 | 4 | ✗/✗ | — | MISSING
649 | genesect | 5 | 1/1 | bug/steel | 1 (0) | 0 | 8/511 | 0 | 21 | 4 | ✓/✓ | — | ACCURATE
650 | chespin | 6 | 1/1 | grass | 2 (1) | 2 | 6/407 | 0 | 16 | 4 | ✓/✓ | — | ACCURATE
651 | quilladin | 6 | 1/1 | grass | 2 (1) | 2 | 6/389 | 0 | 16 | 4 | ✓/✓ | — | ACCURATE
652 | chesnaught | 6 | 2/2 | grass/fighting | 2 (1) | 2 | 7/574 | 0 | 16 | 5 | ✓/✓ | — | ACCURATE
653 | fennekin | 6 | 1/1 | fire | 2 (1) | 2 | 6/327 | 0 | 16 | 4 | ✓/✓ | — | ACCURATE
654 | braixen | 6 | 1/1 | fire | 2 (1) | 2 | 6/339 | 0 | 16 | 4 | ✓/✓ | — | ACCURATE
655 | delphox | 6 | 2/2 | fire/psychic | 2 (1) | 2 | 7/518 | 0 | 16 | 5 | ✓/✓ | — | ACCURATE
656 | froakie | 6 | 1/1 | water | 2 (1) | 2 | 6/333 | 0 | 16 | 4 | ✓/✓ | — | ACCURATE
657 | frogadier | 6 | 1/1 | water | 2 (1) | 2 | 6/329 | 0 | 16 | 4 | ✓/✓ | — | ACCURATE
658 | greninja | 6 | 4/4 | water/dark | 2 (1) | 2 | 7/461 | 0 | 16 | 5 | ✓/✓ | — | ACCURATE
659 | bunnelby | 6 | 1/1 | normal | 3 (1) | 1 | 6/322 | 0 | 17 | 4 | ✓/✓ | — | ACCURATE
660 | diggersby | 6 | 1/1 | normal/ground | 3 (1) | 1 | 7/459 | 0 | 17 | 5 | ✓/✓ | — | ACCURATE
661 | fletchling | 6 | 1/1 | normal/flying | 2 (1) | 2 | 7/299 | 0 | 23 | 10 | ✓/✓ | — | ACCURATE
662 | fletchinder | 6 | 1/1 | fire/flying | 2 (1) | 2 | 7/322 | 0 | 23 | 10 | ✓/✓ | — | ACCURATE
663 | talonflame | 6 | 1/1 | fire/flying | 2 (1) | 2 | 8/424 | 0 | 23 | 11 | ✓/✓ | — | ACCURATE
664 | scatterbug | 6 | 1/1 | bug | 3 (1) | 2 | 6/46 | 0 | 16 | 4 | ✓/✓ | — | ACCURATE
665 | spewpa | 6 | 1/1 | bug | 2 (1) | 2 | 6/39 | 0 | 16 | 4 | ✓/✓ | — | ACCURATE
666 | vivillon | 6 | 1/1 | bug/flying | 3 (1) | 2 | 7/347 | 0 | 16 | 5 | ✓/✓ | — | ACCURATE
667 | litleo | 6 | 1/1 | fire/normal | 3 (1) | 1 | 6/329 | 0 | 16 | 7 | ✓/✓ | — | ACCURATE
668 | pyroar | 6 | 2/2 | fire/normal | 3 (1) | 1 | 7/385 | 0 | 16 | 8 | ✗/✗ | — | MISSING
669 | flabebe | 6 | 1/1 | fairy | 2 (1) | 2 | 6/276 | 0 | 16 | 8 | ✓/✓ | — | ACCURATE
670 | floette | 6 | 3/3 | fairy | 2 (1) | 2 | 6/270 | 0 | 16 | 9 | ✓/✓ | — | ACCURATE
671 | florges | 6 | 1/1 | fairy | 2 (1) | 2 | 7/323 | 0 | 16 | 9 | ✓/✓ | — | ACCURATE
672 | skiddo | 6 | 1/1 | grass | 2 (1) | 1 | 6/309 | 0 | 16 | 4 | ✓/✓ | — | ACCURATE
673 | gogoat | 6 | 1/1 | grass | 2 (1) | 1 | 6/346 | 0 | 16 | 5 | ✓/✓ | — | ACCURATE
674 | pancham | 6 | 1/1 | fighting | 3 (1) | 1 | 6/388 | 0 | 17 | 8 | ✓/✓ | — | ACCURATE
675 | pangoro | 6 | 1/1 | fighting/dark | 3 (1) | 1 | 7/577 | 0 | 17 | 9 | ✓/✓ | — | ACCURATE
676 | furfrou | 6 | 1/1 | normal | 1 (0) | 0 | 6/293 | 0 | 10 | 7 | ✓/✓ | — | ACCURATE
677 | espurr | 6 | 1/1 | psychic | 3 (1) | 2 | 7/357 | 0 | 23 | 5 | ✓/✓ | — | ACCURATE
678 | meowstic | 6 | 4/4 | psychic | 3 (1) | 2 | 8/519 | 0 | 23 | 6 | ✗/✗ | — | MISSING
679 | honedge | 6 | 1/1 | steel/ghost | 1 (0) | 2 | 6/267 | 0 | 17 | 4 | ✓/✓ | — | ACCURATE
680 | doublade | 6 | 1/1 | steel/ghost | 1 (0) | 2 | 6/255 | 0 | 17 | 4 | ✓/✓ | — | ACCURATE
681 | aegislash | 6 | 2/2 | steel/ghost | 1 (0) | 2 | 7/330 | 0 | 17 | 5 | ✗/✗ | — | MISSING
682 | spritzee | 6 | 1/1 | fairy | 2 (1) | 1 | 6/302 | 0 | 17 | 4 | ✓/✓ | — | ACCURATE
683 | aromatisse | 6 | 1/1 | fairy | 2 (1) | 1 | 7/386 | 0 | 17 | 5 | ✓/✓ | — | ACCURATE
684 | swirlix | 6 | 1/1 | fairy | 2 (1) | 1 | 6/287 | 0 | 17 | 4 | ✓/✓ | — | ACCURATE
685 | slurpuff | 6 | 1/1 | fairy | 2 (1) | 1 | 7/335 | 0 | 17 | 5 | ✓/✓ | — | ACCURATE
686 | inkay | 6 | 1/1 | dark/psychic | 3 (1) | 1 | 7/402 | 0 | 23 | 9 | ✓/✓ | — | ACCURATE
687 | malamar | 6 | 2/2 | dark/psychic | 3 (1) | 1 | 8/499 | 0 | 23 | 10 | ✓/✓ | — | ACCURATE
688 | binacle | 6 | 1/1 | rock/water | 3 (1) | 1 | 6/400 | 0 | 17 | 4 | ✓/✓ | — | ACCURATE
689 | barbaracle | 6 | 2/2 | rock/water | 3 (1) | 1 | 7/528 | 0 | 17 | 5 | ✓/✓ | — | ACCURATE
690 | skrelp | 6 | 1/1 | poison/water | 3 (1) | 1 | 7/350 | 0 | 23 | 7 | ✓/✓ | — | ACCURATE
691 | dragalge | 6 | 2/2 | poison/dragon | 3 (1) | 1 | 8/431 | 0 | 23 | 8 | ✓/✓ | — | ACCURATE
692 | clauncher | 6 | 1/1 | water | 1 (0) | 1 | 7/332 | 0 | 23 | 7 | ✓/✓ | — | ACCURATE
693 | clawitzer | 6 | 1/1 | water | 1 (0) | 1 | 8/433 | 0 | 23 | 8 | ✓/✓ | — | ACCURATE
694 | helioptile | 6 | 1/1 | electric/normal | 3 (1) | 1 | 6/308 | 0 | 17 | 4 | ✓/✓ | — | ACCURATE
695 | heliolisk | 6 | 1/1 | electric/normal | 3 (1) | 1 | 7/382 | 0 | 17 | 5 | ✓/✓ | — | ACCURATE
696 | tyrunt | 6 | 1/1 | rock/dragon | 2 (1) | 1 | 6/350 | 0 | 17 | 6 | ✓/✓ | — | ACCURATE
697 | tyrantrum | 6 | 1/1 | rock/dragon | 2 (1) | 1 | 7/427 | 0 | 17 | 7 | ✓/✓ | — | ACCURATE
698 | amaura | 6 | 1/1 | rock/ice | 2 (1) | 1 | 6/395 | 0 | 17 | 6 | ✓/✓ | — | ACCURATE
699 | aurorus | 6 | 1/1 | rock/ice | 2 (1) | 1 | 7/468 | 0 | 17 | 7 | ✓/✓ | — | ACCURATE
700 | sylveon | 6 | 1/1 | fairy | 2 (1) | 19 | 9/455 | 0 | 23 | 12 | ✓/✓ | — | ACCURATE
701 | hawlucha | 6 | 2/2 | fighting/flying | 3 (1) | 0 | 8/595 | 0 | 23 | 8 | ✓/✓ | — | ACCURATE
702 | dedenne | 6 | 1/1 | electric/fairy | 3 (1) | 0 | 8/428 | 0 | 23 | 8 | ✓/✓ | — | ACCURATE
703 | carbink | 6 | 1/1 | rock/fairy | 2 (1) | 0 | 7/371 | 0 | 23 | 11 | ✓/✓ | — | ACCURATE
704 | goomy | 6 | 1/1 | dragon | 3 (1) | 2 | 8/291 | 0 | 23 | 16 | ✓/✓ | — | ACCURATE
705 | sliggoo | 6 | 2/2 | dragon | 3 (1) | 2 | 7/274 | 0 | 23 | 16 | ✓/✓ | — | ACCURATE
706 | goodra | 6 | 2/2 | dragon | 3 (1) | 2 | 8/492 | 0 | 23 | 17 | ✓/✓ | — | ACCURATE
707 | klefki | 6 | 1/1 | steel/fairy | 2 (1) | 0 | 8/400 | 0 | 23 | 10 | ✓/✓ | — | ACCURATE
708 | phantump | 6 | 1/1 | ghost/grass | 3 (1) | 1 | 7/386 | 0 | 23 | 10 | ✓/✓ | — | ACCURATE
709 | trevenant | 6 | 1/1 | ghost/grass | 3 (1) | 1 | 8/522 | 0 | 23 | 11 | ✓/✓ | — | ACCURATE
710 | pumpkaboo | 6 | 4/4 | ghost/grass | 3 (1) | 1 | 6/341 | 0 | 17 | 4 | ✗/✗ | — | MISSING
711 | gourgeist | 6 | 4/4 | ghost/grass | 3 (1) | 1 | 7/441 | 0 | 17 | 5 | ✗/✗ | — | MISSING
712 | bergmite | 6 | 1/1 | ice | 3 (1) | 1 | 8/343 | 0 | 23 | 7 | ✓/✓ | — | ACCURATE
713 | avalugg | 6 | 2/2 | ice | 3 (1) | 1 | 8/448 | 0 | 23 | 8 | ✓/✓ | — | ACCURATE
714 | noibat | 6 | 1/1 | flying/dragon | 3 (1) | 1 | 7/402 | 0 | 23 | 10 | ✓/✓ | — | ACCURATE
715 | noivern | 6 | 1/1 | flying/dragon | 3 (1) | 1 | 8/534 | 0 | 23 | 11 | ✓/✓ | — | ACCURATE
716 | xerneas | 6 | 1/1 | fairy | 1 (0) | 0 | 6/336 | 0 | 17 | 3 | ✓/✓ | — | ACCURATE
717 | yveltal | 6 | 1/1 | dark/flying | 1 (0) | 0 | 6/345 | 0 | 17 | 3 | ✓/✓ | — | ACCURATE
718 | zygarde | 6 | 6/6 | dragon/ground | 1 (0) | 0 | 6/334 | 0 | 17 | 5 | ✗/✗ | — | MISSING
719 | diancie | 6 | 2/2 | rock/fairy | 1 (0) | 0 | 7/419 | 0 | 23 | 3 | ✓/✓ | — | ACCURATE
720 | hoopa | 6 | 2/2 | psychic/ghost | 1 (0) | 0 | 6/423 | 0 | 16 | 3 | ✓/✓ | — | ACCURATE
721 | volcanion | 6 | 1/1 | fire/water | 1 (0) | 0 | 7/435 | 0 | 23 | 3 | ✓/✓ | — | ACCURATE
722 | rowlet | 7 | 1/1 | grass/flying | 2 (1) | 3 | 5/230 | 0 | 19 | 7 | ✓/✓ | — | ACCURATE
723 | dartrix | 7 | 1/1 | grass/flying | 2 (1) | 3 | 5/216 | 0 | 19 | 7 | ✓/✓ | — | ACCURATE
724 | decidueye | 7 | 2/2 | grass/ghost | 2 (1) | 3 | 5/338 | 0 | 19 | 8 | ✓/✓ | — | ACCURATE
725 | litten | 7 | 1/1 | fire | 2 (1) | 2 | 4/216 | 0 | 19 | 6 | ✓/✓ | — | ACCURATE
726 | torracat | 7 | 1/1 | fire | 2 (1) | 2 | 4/202 | 0 | 19 | 6 | ✓/✓ | — | ACCURATE
727 | incineroar | 7 | 1/1 | fire/dark | 2 (1) | 2 | 5/398 | 0 | 19 | 7 | ✓/✓ | — | ACCURATE
728 | popplio | 7 | 1/1 | water | 2 (1) | 2 | 4/207 | 0 | 19 | 6 | ✓/✓ | — | ACCURATE
729 | brionne | 7 | 1/1 | water | 2 (1) | 2 | 4/194 | 0 | 19 | 6 | ✓/✓ | — | ACCURATE
730 | primarina | 7 | 1/1 | water/fairy | 2 (1) | 2 | 5/317 | 0 | 19 | 7 | ✓/✓ | — | ACCURATE
731 | pikipek | 7 | 1/1 | normal/flying | 3 (1) | 2 | 3/145 | 0 | 12 | 12 | ✓/✓ | — | ACCURATE
732 | trumbeak | 7 | 1/1 | normal/flying | 3 (1) | 2 | 3/143 | 0 | 12 | 12 | ✓/✓ | — | ACCURATE
733 | toucannon | 7 | 1/1 | normal/flying | 3 (1) | 2 | 4/217 | 0 | 12 | 13 | ✓/✓ | — | ACCURATE
734 | yungoos | 7 | 1/1 | normal | 3 (1) | 1 | 3/150 | 0 | 12 | 12 | ✓/✓ | — | ACCURATE
735 | gumshoos | 7 | 2/2 | normal | 3 (1) | 1 | 3/171 | 0 | 12 | 12 | ✓/✓ | — | ACCURATE
736 | grubbin | 7 | 1/1 | bug | 1 (0) | 4 | 4/160 | 0 | 19 | 11 | ✓/✓ | — | ACCURATE
737 | charjabug | 7 | 1/1 | bug/electric | 1 (0) | 4 | 4/177 | 0 | 19 | 11 | ✓/✓ | — | ACCURATE
738 | vikavolt | 7 | 2/2 | bug/electric | 1 (0) | 4 | 4/235 | 0 | 19 | 11 | ✓/✓ | — | ACCURATE
739 | crabrawler | 7 | 1/1 | fighting | 3 (1) | 2 | 4/211 | 0 | 12 | 14 | ✓/✓ | — | ACCURATE
740 | crabominable | 7 | 2/2 | fighting/ice | 3 (1) | 2 | 5/302 | 0 | 12 | 15 | ✓/✓ | — | ACCURATE
741 | oricorio | 7 | 4/4 | fire/flying | 1 (0) | 0 | 3/158 | 0 | 12 | 14 | ✗/✗ | — | MISSING
742 | cutiefly | 7 | 1/1 | bug/fairy | 3 (1) | 1 | 4/215 | 0 | 19 | 11 | ✓/✓ | — | ACCURATE
743 | ribombee | 7 | 2/2 | bug/fairy | 3 (1) | 1 | 4/230 | 0 | 19 | 11 | ✓/✓ | — | ACCURATE
744 | rockruff | 7 | 2/2 | rock | 3 (1) | 3 | 4/197 | 0 | 19 | 10 | ✓/✓ | — | ACCURATE
745 | lycanroc | 7 | 3/3 | rock | 3 (1) | 3 | 5/287 | 0 | 19 | 11 | ✗/✗ | — | MISSING
746 | wishiwashi | 7 | 2/2 | water | 1 (0) | 0 | 3/140 | 0 | 13 | 11 | ✗/✗ | — | MISSING
747 | mareanie | 7 | 1/1 | poison/water | 3 (1) | 1 | 4/202 | 0 | 19 | 10 | ✓/✓ | — | ACCURATE
748 | toxapex | 7 | 1/1 | poison/water | 3 (1) | 1 | 5/262 | 0 | 19 | 11 | ✓/✓ | — | ACCURATE
749 | mudbray | 7 | 1/1 | ground | 3 (1) | 1 | 4/188 | 0 | 19 | 12 | ✓/✓ | — | ACCURATE
750 | mudsdale | 7 | 1/1 | ground | 3 (1) | 1 | 5/239 | 0 | 19 | 13 | ✓/✓ | — | ACCURATE
751 | dewpider | 7 | 1/1 | water/bug | 2 (1) | 1 | 4/191 | 0 | 19 | 10 | ✓/✓ | — | ACCURATE
752 | araquanid | 7 | 2/2 | water/bug | 2 (1) | 1 | 5/249 | 0 | 19 | 11 | ✓/✓ | — | ACCURATE
753 | fomantis | 7 | 1/1 | grass | 2 (1) | 1 | 4/183 | 0 | 19 | 8 | ✓/✓ | — | ACCURATE
754 | lurantis | 7 | 2/2 | grass | 2 (1) | 1 | 4/220 | 0 | 19 | 8 | ✓/✓ | — | ACCURATE
755 | morelull | 7 | 1/1 | grass/fairy | 3 (1) | 1 | 3/139 | 0 | 13 | 8 | ✓/✓ | — | ACCURATE
756 | shiinotic | 7 | 1/1 | grass/fairy | 3 (1) | 1 | 3/139 | 0 | 13 | 8 | ✓/✓ | — | ACCURATE
757 | salandit | 7 | 1/1 | poison/fire | 2 (1) | 1 | 4/230 | 0 | 19 | 9 | ✓/✓ | — | ACCURATE
758 | salazzle | 7 | 2/2 | poison/fire | 2 (1) | 1 | 5/337 | 0 | 19 | 10 | ✓/✓ | — | ACCURATE
759 | stufful | 7 | 1/1 | normal/fighting | 3 (1) | 1 | 3/163 | 0 | 13 | 8 | ✓/✓ | — | ACCURATE
760 | bewear | 7 | 1/1 | normal/fighting | 3 (1) | 1 | 3/173 | 0 | 13 | 8 | ✓/✓ | — | ACCURATE
761 | bounsweet | 7 | 1/1 | grass | 3 (1) | 2 | 4/168 | 0 | 19 | 7 | ✓/✓ | — | ACCURATE
762 | steenee | 7 | 1/1 | grass | 3 (1) | 2 | 4/186 | 0 | 19 | 7 | ✓/✓ | — | ACCURATE
763 | tsareena | 7 | 1/1 | grass | 3 (1) | 2 | 5/280 | 0 | 19 | 8 | ✓/✓ | — | ACCURATE
764 | comfey | 7 | 1/1 | fairy | 3 (1) | 0 | 4/254 | 0 | 19 | 7 | ✓/✓ | — | ACCURATE
765 | oranguru | 7 | 1/1 | normal/psychic | 3 (1) | 0 | 5/343 | 0 | 19 | 9 | ✓/✓ | — | ACCURATE
766 | passimian | 7 | 1/1 | fighting | 2 (1) | 0 | 5/349 | 0 | 19 | 9 | ✓/✓ | — | ACCURATE
767 | wimpod | 7 | 1/1 | bug/water | 1 (0) | 1 | 4/101 | 0 | 13 | 10 | ✓/✓ | — | ACCURATE
768 | golisopod | 7 | 2/2 | bug/water | 1 (0) | 1 | 4/266 | 0 | 13 | 11 | ✓/✓ | — | ACCURATE
769 | sandygast | 7 | 1/1 | ghost/ground | 2 (1) | 1 | 5/258 | 0 | 19 | 8 | ✓/✓ | — | ACCURATE
770 | palossand | 7 | 1/1 | ghost/ground | 2 (1) | 1 | 5/259 | 0 | 19 | 8 | ✓/✓ | — | ACCURATE
771 | pyukumuku | 7 | 1/1 | water | 2 (1) | 0 | 3/117 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
772 | type-null | 7 | 1/1 | normal | 1 (0) | 1 | 3/148 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
773 | silvally | 7 | 1/1 | normal | 1 (0) | 1 | 3/232 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
774 | minior | 7 | 14/14 | rock/flying | 1 (0) | 0 | 3/165 | 0 | 12 | 6 | ✗/✗ | — | MISSING
775 | komala | 7 | 1/1 | normal | 1 (0) | 0 | 3/162 | 0 | 12 | 6 | ✓/✓ | — | ACCURATE
776 | turtonator | 7 | 1/1 | fire/dragon | 1 (0) | 0 | 3/209 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
777 | togedemaru | 7 | 2/2 | electric/steel | 3 (1) | 0 | 3/187 | 0 | 13 | 6 | ✗/✗ | — | MISSING
778 | mimikyu | 7 | 4/4 | ghost/fairy | 1 (0) | 0 | 6/361 | 0 | 19 | 11 | ✗/✗ | — | MISSING
779 | bruxish | 7 | 1/1 | water/psychic | 3 (1) | 0 | 3/181 | 0 | 12 | 7 | ✓/✓ | — | ACCURATE
780 | drampa | 7 | 2/2 | normal/dragon | 3 (1) | 0 | 5/356 | 0 | 13 | 8 | ✓/✓ | — | ACCURATE
781 | dhelmise | 7 | 1/1 | ghost/grass | 1 (0) | 0 | 3/190 | 0 | 13 | 7 | ✓/✓ | — | ACCURATE
782 | jangmo-o | 7 | 1/1 | dragon | 3 (1) | 2 | 4/226 | 0 | 19 | 8 | ✓/✓ | — | ACCURATE
783 | hakamo-o | 7 | 1/1 | dragon/fighting | 3 (1) | 2 | 4/252 | 0 | 19 | 8 | ✓/✓ | — | ACCURATE
784 | kommo-o | 7 | 2/2 | dragon/fighting | 3 (1) | 2 | 5/400 | 0 | 19 | 9 | ✓/✓ | — | ACCURATE
785 | tapu-koko | 7 | 1/1 | electric/fairy | 2 (1) | 0 | 3/192 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
786 | tapu-lele | 7 | 1/1 | psychic/fairy | 2 (1) | 0 | 3/176 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
787 | tapu-bulu | 7 | 1/1 | grass/fairy | 2 (1) | 0 | 3/199 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
788 | tapu-fini | 7 | 1/1 | water/fairy | 2 (1) | 0 | 3/177 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
789 | cosmog | 7 | 1/1 | psychic | 1 (0) | 2 | 4/8 | 0 | 19 | 3 | ✓/✓ | — | ACCURATE
790 | cosmoem | 7 | 1/1 | psychic | 1 (0) | 2 | 4/12 | 0 | 19 | 3 | ✓/✓ | — | ACCURATE
791 | solgaleo | 7 | 1/1 | psychic/steel | 1 (0) | 2 | 4/290 | 0 | 19 | 3 | ✓/✓ | — | ACCURATE
792 | lunala | 7 | 1/1 | psychic/ghost | 1 (0) | 2 | 4/274 | 0 | 19 | 3 | ✓/✓ | — | ACCURATE
793 | nihilego | 7 | 1/1 | rock/poison | 1 (0) | 0 | 3/176 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
794 | buzzwole | 7 | 1/1 | bug/fighting | 1 (0) | 0 | 3/176 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
795 | pheromosa | 7 | 1/1 | bug/fighting | 1 (0) | 0 | 3/162 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
796 | xurkitree | 7 | 1/1 | electric | 1 (0) | 0 | 3/160 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
797 | celesteela | 7 | 1/1 | steel/flying | 1 (0) | 0 | 3/172 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
798 | kartana | 7 | 1/1 | grass/steel | 1 (0) | 0 | 3/125 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
799 | guzzlord | 7 | 1/1 | dark/dragon | 1 (0) | 0 | 3/193 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
800 | necrozma | 7 | 4/4 | psychic | 1 (0) | 0 | 4/287 | 0 | 19 | 3 | ✓/✓ | — | ACCURATE
801 | magearna | 7 | 4/4 | steel/fairy | 1 (0) | 0 | 5/323 | 0 | 19 | 4 | ✓/✓ | — | ACCURATE
802 | marshadow | 7 | 1/1 | fighting/ghost | 1 (0) | 0 | 4/260 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
803 | poipole | 7 | 1/1 | poison | 1 (0) | 1 | 2/75 | 0 | 7 | 2 | ✓/✓ | — | ACCURATE
804 | naganadel | 7 | 1/1 | poison/dragon | 1 (0) | 1 | 2/141 | 0 | 7 | 2 | ✓/✓ | — | ACCURATE
805 | stakataka | 7 | 1/1 | rock/steel | 1 (0) | 0 | 2/117 | 0 | 7 | 2 | ✓/✓ | — | ACCURATE
806 | blacephalon | 7 | 1/1 | fire/ghost | 1 (0) | 0 | 2/113 | 0 | 7 | 2 | ✓/✓ | — | ACCURATE
807 | zeraora | 7 | 2/2 | electric | 1 (0) | 0 | 3/195 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
808 | meltan | 7 | 1/1 | steel | 1 (0) | 1 | 3/59 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
809 | melmetal | 7 | 2/2 | steel | 1 (0) | 1 | 3/131 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
810 | grookey | 8 | 1/1 | grass | 2 (1) | 2 | 2/105 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
811 | thwackey | 8 | 1/1 | grass | 2 (1) | 2 | 2/97 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
812 | rillaboom | 8 | 2/2 | grass | 2 (1) | 2 | 2/145 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
813 | scorbunny | 8 | 1/1 | fire | 2 (1) | 2 | 2/100 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
814 | raboot | 8 | 1/1 | fire | 2 (1) | 2 | 2/98 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
815 | cinderace | 8 | 2/2 | fire | 2 (1) | 2 | 2/134 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
816 | sobble | 8 | 1/1 | water | 2 (1) | 2 | 2/87 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
817 | drizzile | 8 | 1/1 | water | 2 (1) | 2 | 2/76 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
818 | inteleon | 8 | 2/2 | water | 2 (1) | 2 | 2/127 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
819 | skwovet | 8 | 1/1 | normal | 2 (1) | 1 | 2/85 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
820 | greedent | 8 | 1/1 | normal | 2 (1) | 1 | 2/108 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
821 | rookidee | 8 | 1/1 | flying | 3 (1) | 2 | 3/117 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
822 | corvisquire | 8 | 1/1 | flying | 3 (1) | 2 | 3/107 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
823 | corviknight | 8 | 2/2 | flying/steel | 3 (1) | 2 | 4/222 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
824 | blipbug | 8 | 1/1 | bug | 3 (1) | 2 | 1/5 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
825 | dottler | 8 | 1/1 | bug/psychic | 3 (1) | 2 | 1/45 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
826 | orbeetle | 8 | 2/2 | bug/psychic | 3 (1) | 2 | 1/61 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
827 | nickit | 8 | 1/1 | dark | 3 (1) | 1 | 2/78 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
828 | thievul | 8 | 1/1 | dark | 3 (1) | 1 | 2/101 | 0 | 7 | 4 | ✓/✓ | — | ACCURATE
829 | gossifleur | 8 | 1/1 | grass | 3 (1) | 1 | 1/41 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
830 | eldegoss | 8 | 1/1 | grass | 3 (1) | 1 | 1/42 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
831 | wooloo | 8 | 1/1 | normal | 3 (1) | 1 | 1/32 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
832 | dubwool | 8 | 1/1 | normal | 3 (1) | 1 | 1/40 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
833 | chewtle | 8 | 1/1 | water | 3 (1) | 1 | 2/73 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
834 | drednaw | 8 | 2/2 | water/rock | 3 (1) | 1 | 2/138 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
835 | yamper | 8 | 1/1 | electric | 2 (1) | 1 | 1/42 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
836 | boltund | 8 | 1/1 | electric | 2 (1) | 1 | 1/48 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
837 | rolycoly | 8 | 1/1 | rock | 3 (1) | 2 | 2/83 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
838 | carkol | 8 | 1/1 | rock/fire | 3 (1) | 2 | 2/105 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
839 | coalossal | 8 | 2/2 | rock/fire | 3 (1) | 2 | 2/124 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
840 | applin | 8 | 1/1 | grass/dragon | 3 (1) | 4 | 2/17 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
841 | flapple | 8 | 2/2 | grass/dragon | 3 (1) | 4 | 3/149 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
842 | appletun | 8 | 2/2 | grass/dragon | 3 (1) | 4 | 3/166 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
843 | silicobra | 8 | 1/1 | ground | 3 (1) | 1 | 2/84 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
844 | sandaconda | 8 | 2/2 | ground | 3 (1) | 1 | 3/150 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
845 | cramorant | 8 | 3/3 | flying/water | 1 (0) | 0 | 2/112 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
846 | arrokuda | 8 | 1/1 | water | 2 (1) | 1 | 2/85 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
847 | barraskewda | 8 | 1/1 | water | 2 (1) | 1 | 2/91 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
848 | toxel | 8 | 1/1 | electric/poison | 3 (1) | 1 | 3/44 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
849 | toxtricity | 8 | 4/4 | electric/poison | 3 (1) | 1 | 3/199 | 0 | 13 | 5 | ✗/✗ | — | MISSING
850 | sizzlipede | 8 | 1/1 | fire/bug | 3 (1) | 1 | 1/39 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
851 | centiskorch | 8 | 2/2 | fire/bug | 3 (1) | 1 | 1/48 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
852 | clobbopus | 8 | 1/1 | fighting | 2 (1) | 1 | 2/88 | 0 | 7 | 4 | ✓/✓ | — | ACCURATE
853 | grapploct | 8 | 1/1 | fighting | 2 (1) | 1 | 2/104 | 0 | 7 | 5 | ✓/✓ | — | ACCURATE
854 | sinistea | 8 | 1/1 | ghost | 2 (1) | 2 | 2/83 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
855 | polteageist | 8 | 1/1 | ghost | 2 (1) | 2 | 3/146 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
856 | hatenna | 8 | 1/1 | psychic | 3 (1) | 2 | 2/95 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
857 | hattrem | 8 | 1/1 | psychic | 3 (1) | 2 | 2/91 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
858 | hatterene | 8 | 2/2 | psychic/fairy | 3 (1) | 2 | 3/178 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
859 | impidimp | 8 | 1/1 | dark/fairy | 3 (1) | 2 | 2/92 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
860 | morgrem | 8 | 1/1 | dark/fairy | 3 (1) | 2 | 2/100 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
861 | grimmsnarl | 8 | 2/2 | dark/fairy | 3 (1) | 2 | 3/205 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
862 | obstagoon | 8 | 1/1 | dark/normal | 3 (1) | 2 | 1/87 | 0 | 7 | 3 | ✓/✓ | — | ACCURATE
863 | perrserker | 8 | 1/1 | steel | 3 (1) | 2 | 3/216 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
864 | cursola | 8 | 1/1 | ghost | 2 (1) | 1 | 1/71 | 0 | 7 | 2 | ✓/✓ | — | ACCURATE
865 | sirfetchd | 8 | 1/1 | fighting | 2 (1) | 1 | 2/101 | 0 | 7 | 4 | ✓/✓ | — | ACCURATE
866 | mr-rime | 8 | 1/1 | ice/psychic | 3 (1) | 2 | 3/267 | 0 | 7 | 5 | ✓/✓ | — | ACCURATE
867 | runerigus | 8 | 1/1 | ground/ghost | 1 (0) | 3 | 3/201 | 0 | 7 | 4 | ✓/✓ | — | ACCURATE
868 | milcery | 8 | 1/1 | fairy | 2 (1) | 21 | 2/57 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
869 | alcremie | 8 | 2/2 | fairy | 2 (1) | 21 | 3/150 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
870 | falinks | 8 | 2/2 | fighting | 2 (1) | 0 | 4/200 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
871 | pincurchin | 8 | 1/1 | electric | 2 (1) | 0 | 2/103 | 0 | 13 | 6 | ✓/✓ | — | ACCURATE
872 | snom | 8 | 1/1 | ice/bug | 2 (1) | 1 | 2/37 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
873 | frosmoth | 8 | 1/1 | ice/bug | 2 (1) | 1 | 2/114 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
874 | stonjourner | 8 | 1/1 | rock | 1 (0) | 0 | 2/105 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
875 | eiscue | 8 | 2/2 | ice | 1 (0) | 0 | 2/105 | 0 | 13 | 4 | ✗/✗ | — | MISSING
876 | indeedee | 8 | 2/2 | psychic/normal | 3 (1) | 0 | 3/148 | 0 | 13 | 7 | ✗/✗ | — | MISSING
877 | morpeko | 8 | 2/2 | electric/dark | 1 (0) | 0 | 4/251 | 0 | 13 | 7 | ✗/✗ | — | MISSING
878 | cufant | 8 | 1/1 | steel | 2 (1) | 1 | 2/112 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
879 | copperajah | 8 | 2/2 | steel | 2 (1) | 1 | 2/122 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
880 | dracozolt | 8 | 1/1 | electric/dragon | 3 (1) | 0 | 1/59 | 0 | 7 | 2 | ✓/✓ | — | ACCURATE
881 | arctozolt | 8 | 1/1 | electric/ice | 3 (1) | 0 | 1/56 | 0 | 7 | 2 | ✓/✓ | — | ACCURATE
882 | dracovish | 8 | 1/1 | water/dragon | 3 (1) | 0 | 1/54 | 0 | 7 | 2 | ✓/✓ | — | ACCURATE
883 | arctovish | 8 | 1/1 | water/ice | 3 (1) | 0 | 1/49 | 0 | 7 | 2 | ✓/✓ | — | ACCURATE
884 | duraludon | 8 | 2/2 | steel/dragon | 3 (1) | 1 | 2/120 | 0 | 13 | 3 | ✓/✓ | — | ACCURATE
885 | dreepy | 8 | 1/1 | dragon/ghost | 3 (1) | 2 | 2/50 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
886 | drakloak | 8 | 1/1 | dragon/ghost | 3 (1) | 2 | 2/117 | 0 | 13 | 4 | ✓/✓ | — | ACCURATE
887 | dragapult | 8 | 1/1 | dragon/ghost | 3 (1) | 2 | 3/198 | 0 | 13 | 5 | ✓/✓ | — | ACCURATE
888 | zacian | 8 | 2/2 | fairy | 1 (0) | 0 | 2/115 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
889 | zamazenta | 8 | 2/2 | fighting | 1 (0) | 0 | 2/122 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
890 | eternatus | 8 | 2/2 | poison/dragon | 1 (0) | 0 | 2/106 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
891 | kubfu | 8 | 1/1 | fighting | 1 (0) | 4 | 2/95 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
892 | urshifu | 8 | 4/4 | fighting/dark | 1 (0) | 4 | 2/146 | 0 | 13 | 2 | ✗/✗ | — | MISSING
893 | zarude | 8 | 2/2 | dark/grass | 1 (0) | 0 | 2/149 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
894 | regieleki | 8 | 1/1 | electric | 1 (0) | 0 | 2/90 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
895 | regidrago | 8 | 1/1 | dragon | 1 (0) | 0 | 2/84 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
896 | glastrier | 8 | 1/1 | ice | 1 (0) | 0 | 2/105 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
897 | spectrier | 8 | 1/1 | ghost | 1 (0) | 0 | 2/99 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
898 | calyrex | 8 | 3/3 | psychic/grass | 1 (0) | 0 | 2/133 | 0 | 13 | 2 | ✓/✓ | — | ACCURATE
899 | wyrdeer | 8 | 1/1 | normal/psychic | 3 (1) | 1 | 3/157 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
900 | kleavor | 8 | 1/1 | bug/rock | 3 (1) | 3 | 4/191 | 0 | 6 | 5 | ✓/✓ | — | ACCURATE
901 | ursaluna | 8 | 2/2 | ground/normal | 3 (1) | 2 | 2/106 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
902 | basculegion | 8 | 2/2 | water/ghost | 3 (1) | 2 | 3/134 | 0 | 6 | 4 | ✗/✗ | — | MISSING
903 | sneasler | 8 | 1/1 | fighting/poison | 3 (1) | 4 | 3/159 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
904 | overqwil | 8 | 1/1 | dark/poison | 3 (1) | 3 | 4/204 | 0 | 6 | 5 | ✓/✓ | — | ACCURATE
905 | enamorus | 8 | 2/2 | fairy/flying | 2 (1) | 0 | 2/79 | 0 | 6 | 2 | ✗/✗ | — | MISSING
906 | sprigatito | 9 | 1/1 | grass | 2 (1) | 2 | 1/52 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
907 | floragato | 9 | 1/1 | grass | 2 (1) | 2 | 1/53 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
908 | meowscarada | 9 | 1/1 | grass/dark | 2 (1) | 2 | 2/146 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
909 | fuecoco | 9 | 1/1 | fire | 2 (1) | 2 | 1/52 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
910 | crocalor | 9 | 1/1 | fire | 2 (1) | 2 | 1/50 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
911 | skeledirge | 9 | 1/1 | fire/ghost | 2 (1) | 2 | 2/128 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
912 | quaxly | 9 | 1/1 | water | 2 (1) | 2 | 1/44 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
913 | quaxwell | 9 | 1/1 | water | 2 (1) | 2 | 1/48 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
914 | quaquaval | 9 | 1/1 | water/fighting | 2 (1) | 2 | 2/131 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
915 | lechonk | 9 | 1/1 | normal | 3 (1) | 2 | 1/49 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
916 | oinkologne | 9 | 2/2 | normal | 3 (1) | 2 | 1/54 | 0 | 6 | 2 | ✗/✗ | — | MISSING
917 | tarountula | 9 | 1/1 | bug | 2 (1) | 1 | 1/49 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
918 | spidops | 9 | 1/1 | bug | 2 (1) | 1 | 1/59 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
919 | nymble | 9 | 1/1 | bug | 2 (1) | 1 | 1/36 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
920 | lokix | 9 | 1/1 | bug/dark | 2 (1) | 1 | 1/57 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
921 | pawmi | 9 | 1/1 | electric | 3 (1) | 2 | 1/54 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
922 | pawmo | 9 | 1/1 | electric/fighting | 3 (1) | 2 | 1/58 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
923 | pawmot | 9 | 1/1 | electric/fighting | 3 (1) | 2 | 1/77 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
924 | tandemaus | 9 | 1/1 | normal | 3 (1) | 1 | 1/57 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
925 | maushold | 9 | 2/2 | normal | 3 (1) | 1 | 2/107 | 0 | 6 | 4 | ✗/✗ | — | MISSING
926 | fidough | 9 | 1/1 | fairy | 2 (1) | 1 | 2/89 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
927 | dachsbun | 9 | 1/1 | fairy | 2 (1) | 1 | 2/92 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
928 | smoliv | 9 | 1/1 | grass/normal | 2 (1) | 2 | 1/41 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
929 | dolliv | 9 | 1/1 | grass/normal | 2 (1) | 2 | 1/37 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
930 | arboliva | 9 | 1/1 | grass/normal | 2 (1) | 2 | 1/54 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
931 | squawkabilly | 9 | 4/4 | normal/flying | 3 (1) | 0 | 2/96 | 0 | 6 | 4 | ✗/✗ | — | MISSING
932 | nacli | 9 | 1/1 | rock | 3 (1) | 2 | 2/88 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
933 | naclstack | 9 | 1/1 | rock | 3 (1) | 2 | 2/93 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
934 | garganacl | 9 | 1/1 | rock | 3 (1) | 2 | 3/169 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
935 | charcadet | 9 | 1/1 | fire | 2 (1) | 2 | 2/55 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
936 | armarouge | 9 | 1/1 | fire/psychic | 2 (1) | 2 | 3/168 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
937 | ceruledge | 9 | 1/1 | fire/ghost | 2 (1) | 2 | 3/172 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
938 | tadbulb | 9 | 1/1 | electric | 3 (1) | 1 | 1/46 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
939 | bellibolt | 9 | 1/1 | electric | 3 (1) | 1 | 2/87 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
940 | wattrel | 9 | 1/1 | electric/flying | 3 (1) | 1 | 1/53 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
941 | kilowattrel | 9 | 1/1 | electric/flying | 3 (1) | 1 | 1/53 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
942 | maschiff | 9 | 1/1 | dark | 3 (1) | 1 | 2/88 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
943 | mabosstiff | 9 | 1/1 | dark | 3 (1) | 1 | 2/102 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
944 | shroodle | 9 | 1/1 | poison/normal | 3 (1) | 1 | 2/102 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
945 | grafaiai | 9 | 1/1 | poison/normal | 3 (1) | 1 | 2/111 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
946 | bramblin | 9 | 1/1 | grass/ghost | 2 (1) | 1 | 1/50 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
947 | brambleghast | 9 | 1/1 | grass/ghost | 2 (1) | 1 | 1/48 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
948 | toedscool | 9 | 1/1 | ground/grass | 1 (0) | 1 | 1/66 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
949 | toedscruel | 9 | 1/1 | ground/grass | 1 (0) | 1 | 1/62 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
950 | klawf | 9 | 1/1 | rock | 3 (1) | 0 | 1/65 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
951 | capsakid | 9 | 1/1 | grass | 3 (1) | 1 | 2/73 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
952 | scovillain | 9 | 2/2 | grass/fire | 3 (1) | 1 | 3/149 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
953 | rellor | 9 | 1/1 | bug | 2 (1) | 1 | 1/40 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
954 | rabsca | 9 | 1/1 | bug/psychic | 2 (1) | 1 | 1/76 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
955 | flittle | 9 | 1/1 | psychic | 3 (1) | 1 | 1/49 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
956 | espathra | 9 | 1/1 | psychic | 3 (1) | 1 | 2/126 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
957 | tinkatink | 9 | 1/1 | fairy/steel | 3 (1) | 2 | 2/87 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
958 | tinkatuff | 9 | 1/1 | fairy/steel | 3 (1) | 2 | 2/86 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
959 | tinkaton | 9 | 1/1 | fairy/steel | 3 (1) | 2 | 3/143 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
960 | wiglett | 9 | 1/1 | water | 3 (1) | 1 | 1/44 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
961 | wugtrio | 9 | 1/1 | water | 3 (1) | 1 | 1/46 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
962 | bombirdier | 9 | 1/1 | flying/dark | 3 (1) | 0 | 1/67 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
963 | finizen | 9 | 1/1 | water | 1 (0) | 1 | 1/49 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
964 | palafin | 9 | 2/2 | water | 1 (0) | 1 | 2/126 | 0 | 6 | 3 | ✗/✗ | — | MISSING
965 | varoom | 9 | 1/1 | steel/poison | 2 (1) | 1 | 1/55 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
966 | revavroom | 9 | 1/1 | steel/poison | 2 (1) | 1 | 1/61 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
967 | cyclizar | 9 | 1/1 | dragon/normal | 2 (1) | 0 | 2/110 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
968 | orthworm | 9 | 1/1 | steel | 2 (1) | 0 | 2/94 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
969 | glimmet | 9 | 1/1 | rock/poison | 2 (1) | 1 | 2/87 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
970 | glimmora | 9 | 2/2 | rock/poison | 2 (1) | 1 | 3/149 | 0 | 6 | 5 | ✓/✓ | — | ACCURATE
971 | greavard | 9 | 1/1 | ghost | 2 (1) | 1 | 2/99 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
972 | houndstone | 9 | 1/1 | ghost | 2 (1) | 1 | 3/154 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
973 | flamigo | 9 | 1/1 | flying/fighting | 3 (1) | 0 | 2/100 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
974 | cetoddle | 9 | 1/1 | ice | 3 (1) | 1 | 1/56 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
975 | cetitan | 9 | 1/1 | ice | 3 (1) | 1 | 1/54 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
976 | veluza | 9 | 1/1 | water/psychic | 2 (1) | 0 | 1/51 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
977 | dondozo | 9 | 1/1 | water | 3 (1) | 0 | 2/93 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
978 | tatsugiri | 9 | 6/6 | dragon/water | 2 (1) | 0 | 2/85 | 0 | 6 | 3 | ✗/✗ | — | MISSING
979 | annihilape | 9 | 1/1 | fighting/ghost | 3 (1) | 2 | 3/230 | 0 | 6 | 5 | ✓/✓ | — | ACCURATE
980 | clodsire | 9 | 1/1 | poison/ground | 3 (1) | 1 | 1/66 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
981 | farigiraf | 9 | 1/1 | normal/psychic | 3 (1) | 1 | 2/150 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
982 | dudunsparce | 9 | 2/2 | normal | 3 (1) | 1 | 1/91 | 0 | 6 | 3 | ✗/✗ | — | MISSING
983 | kingambit | 9 | 1/1 | dark/steel | 3 (1) | 2 | 2/116 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
984 | great-tusk | 9 | 1/1 | ground/fighting | 1 (0) | 0 | 1/68 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
985 | scream-tail | 9 | 1/1 | fairy/psychic | 1 (0) | 0 | 1/88 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
986 | brute-bonnet | 9 | 1/1 | grass/dark | 1 (0) | 0 | 1/54 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
987 | flutter-mane | 9 | 1/1 | ghost/fairy | 1 (0) | 0 | 1/59 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
988 | slither-wing | 9 | 1/1 | bug/fighting | 1 (0) | 0 | 1/65 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
989 | sandy-shocks | 9 | 1/1 | electric/ground | 1 (0) | 0 | 1/63 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
990 | iron-treads | 9 | 1/1 | ground/steel | 1 (0) | 0 | 1/62 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
991 | iron-bundle | 9 | 1/1 | ice/water | 1 (0) | 0 | 1/51 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
992 | iron-hands | 9 | 1/1 | fighting/electric | 1 (0) | 0 | 1/63 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
993 | iron-jugulis | 9 | 1/1 | dark/flying | 1 (0) | 0 | 1/68 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
994 | iron-moth | 9 | 1/1 | fire/poison | 1 (0) | 0 | 1/63 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
995 | iron-thorns | 9 | 1/1 | rock/electric | 1 (0) | 0 | 1/90 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
996 | frigibax | 9 | 1/1 | dragon/ice | 2 (1) | 2 | 2/74 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
997 | arctibax | 9 | 1/1 | dragon/ice | 2 (1) | 2 | 2/77 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
998 | baxcalibur | 9 | 2/2 | dragon/ice | 2 (1) | 2 | 2/112 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
999 | gimmighoul | 9 | 2/2 | ghost | 1 (0) | 1 | 2/29 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
1000 | gholdengo | 9 | 1/1 | steel/ghost | 1 (0) | 1 | 3/136 | 0 | 6 | 4 | ✓/✓ | — | ACCURATE
1001 | wo-chien | 9 | 1/1 | dark/grass | 1 (0) | 0 | 1/59 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1002 | chien-pao | 9 | 1/1 | dark/ice | 1 (0) | 0 | 1/52 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1003 | ting-lu | 9 | 1/1 | dark/ground | 1 (0) | 0 | 1/56 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1004 | chi-yu | 9 | 1/1 | dark/fire | 1 (0) | 0 | 1/53 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1005 | roaring-moon | 9 | 1/1 | dragon/dark | 1 (0) | 0 | 1/79 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1006 | iron-valiant | 9 | 1/1 | fairy/fighting | 1 (0) | 0 | 1/85 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1007 | koraidon | 9 | 5/5 | fighting/dragon | 1 (0) | 0 | 1/83 | 0 | 6 | 2 | ✗/✗ | — | MISSING
1008 | miraidon | 9 | 5/5 | electric/dragon | 1 (0) | 0 | 1/65 | 0 | 6 | 2 | ✗/✗ | — | MISSING
1009 | walking-wake | 9 | 1/1 | water/dragon | 1 (0) | 0 | 1/61 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1010 | iron-leaves | 9 | 1/1 | grass/psychic | 1 (0) | 0 | 1/64 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1011 | dipplin | 9 | 1/1 | grass/dragon | 3 (1) | 4 | 1/47 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1012 | poltchageist | 9 | 1/1 | grass/ghost | 2 (1) | 2 | 1/43 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1013 | sinistcha | 9 | 1/1 | grass/ghost | 2 (1) | 2 | 2/80 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
1014 | okidogi | 9 | 1/1 | poison/fighting | 2 (1) | 0 | 1/70 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1015 | munkidori | 9 | 1/1 | poison/psychic | 2 (1) | 0 | 1/63 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1016 | fezandipiti | 9 | 1/1 | poison/fairy | 2 (1) | 0 | 1/64 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1017 | ogerpon | 9 | 4/4 | grass | 1 (0) | 0 | 1/64 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1018 | archaludon | 9 | 1/1 | steel/dragon | 3 (1) | 1 | 2/115 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
1019 | hydrapple | 9 | 1/1 | grass/dragon | 3 (1) | 4 | 2/113 | 0 | 6 | 3 | ✓/✓ | — | ACCURATE
1020 | gouging-fire | 9 | 1/1 | fire/dragon | 1 (0) | 0 | 1/67 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1021 | raging-bolt | 9 | 1/1 | electric/dragon | 1 (0) | 0 | 1/63 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1022 | iron-boulder | 9 | 1/1 | rock/psychic | 1 (0) | 0 | 1/55 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1023 | iron-crown | 9 | 1/1 | steel/psychic | 1 (0) | 0 | 1/58 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1024 | terapagos | 9 | 3/3 | normal | 1 (0) | 0 | 1/64 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE
1025 | pecharunt | 9 | 1/1 | poison/ghost | 1 (0) | 0 | 1/39 | 0 | 6 | 2 | ✓/✓ | — | ACCURATE

> Bảng đầy đủ kèm bằng chứng nằm ở `species-coverage.csv`; ma trận game nằm ở `game-coverage.csv`.

## 4. Data quality theo model

| Area | CORRECT | MISSING | INCORRECT | DUPLICATE | UNSUPPORTED | UNVERIFIED |
|---|---:|---:|---:|---:|---:|---:|
| ID consistency | 0 | 0 | 0 | 0 | 0 | 1 |
| duplicates | 0 | 0 | 0 | 0 | 0 | 1 |
| encounters | 0 | 0 | 1 | 0 | 0 | 0 |
| evolution | 0 | 1 | 0 | 0 | 0 | 0 |
| forms | 1 | 1 | 0 | 0 | 0 | 0 |
| game version coverage | 0 | 0 | 0 | 0 | 0 | 1 |
| game-specific | 2 | 3 | 1 | 0 | 1 | 0 |
| images | 0 | 1 | 0 | 0 | 0 | 1 |
| items | 0 | 0 | 0 | 0 | 0 | 1 |
| master-data | 3 | 0 | 0 | 0 | 0 | 2 |
| missing fields | 0 | 0 | 0 | 0 | 0 | 1 |
| models | 0 | 4 | 0 | 0 | 0 | 0 |
| moves | 1 | 0 | 0 | 0 | 0 | 0 |
| natures | 0 | 0 | 0 | 0 | 1 | 0 |
| orphan relations | 0 | 0 | 0 | 0 | 0 | 1 |
| record counts | 0 | 0 | 0 | 0 | 0 | 1 |
| relations | 0 | 0 | 1 | 0 | 0 | 0 |
| sync | 0 | 0 | 1 | 0 | 0 | 0 |
| user data | 0 | 0 | 0 | 0 | 0 | 1 |
| walkthrough | 0 | 2 | 1 | 0 | 0 | 0 |
| walkthrough coverage | 0 | 0 | 0 | 0 | 0 | 1 |

## 5. Danh sách phát hiện có bằng chứng

### SCHEMA-FK-INCONSISTENT — INCORRECT (high)

- Khu vực: relations / Pokemon foreign keys
- Relations to Pokemon reference different target fields. Mixing Pokemon.id and Pokemon.pokedexNumber is an ID-contract hazard for writes and joins.
  - `references pokedexNumber: Evolution.fromPokemon, Evolution.toPokemon, TeamSlot.pokemon, PokemonMove.pokemon, PokemonVariety.pokemon, Encounter.pokemon`
  - `references id: UserPokemon.pokemon, DexEntry.pokemon`
- Nguồn: pokedex-backend/prisma/schema.prisma
- ⚠ Cần runtime verification trên DB/staging.

### SCHEMA-MODEL-MISSING-NATURE — MISSING (medium)

- Khu vực: models / Nature
- No Nature model. NatureDex is requested but no model exists.
  - `models present: Pokemon, Type, Ability, Evolution, User, UserPokemon, Team, TeamSlot, Move, PokemonMove, PokemonVariety, Encounter, DexEntry, Item, Walkthrough`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SCHEMA-MODEL-MISSING-GAMEVERSION — MISSING (medium)

- Khu vực: models / GameVersion
- No GameVersion model. Game-specific rules and walkthroughs use free-text version slugs.
  - `models present: Pokemon, Type, Ability, Evolution, User, UserPokemon, Team, TeamSlot, Move, PokemonMove, PokemonVariety, Encounter, DexEntry, Item, Walkthrough`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SCHEMA-MODEL-MISSING-REGION — MISSING (low)

- Khu vực: models / Region
- No Region model. Regional dex membership is stored as string arrays.
  - `models present: Pokemon, Type, Ability, Evolution, User, UserPokemon, Team, TeamSlot, Move, PokemonMove, PokemonVariety, Encounter, DexEntry, Item, Walkthrough`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SCHEMA-MODEL-MISSING-TYPEEFFECTIVENESS — MISSING (low)

- Khu vực: models / TypeEffectiveness
- No TypeEffectiveness model. Type chart is code-only; no per-generation rules can be stored or audited in DB.
  - `models present: Pokemon, Type, Ability, Evolution, User, UserPokemon, Team, TeamSlot, Move, PokemonMove, PokemonVariety, Encounter, DexEntry, Item, Walkthrough`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SCHEMA-LEARNSET-NO-VERSION — MISSING (high)

- Khu vực: game-specific / PokemonMove
- Learnsets have no version/version-group dimension; the same move cannot be distinguished between games where it is or is not learnable.
  - `PokemonMove fields: pokemonId, moveId, learnMethod, levelLearnedAt, pokemon, move`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SCHEMA-EVOLUTION-NO-CONDITION — MISSING (medium)

- Khu vực: evolution / Evolution
- Evolution stores only from/to IDs; triggers, levels, held items, friendship, time and version-specific conditions cannot be represented.
  - `Evolution fields: id, fromPokemonId, toPokemonId, fromPokemon, toPokemon`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SCHEMA-VARIETY-NO-GIGANTAMAX — MISSING (medium)

- Khu vực: forms / PokemonVariety
- Forms model has isMega/isAlternative but no Gigantamax flag or form-specific stats; form identity is incomplete.
  - `PokemonVariety fields: id, pokemonId, name, imageUrl, shinyImageUrl, isMega, isAlternative, types, pokemon`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SCHEMA-ENCOUNTER-STRING-FK — INCORRECT (medium)

- Khu vực: encounters / Encounter
- Encounters reference locations and versions by free text instead of stable FKs.
  - `string fields: locationName, versionName`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SCHEMA-WALKTHROUGH-UNVALIDATED-VERSION — INCORRECT (low)

- Khu vực: walkthrough / Walkthrough.gameVersion
- Walkthrough gameVersion is free text; unsupported or misspelled slugs cannot be rejected by DB constraints.
  - `gameVersion String (no FK / enum)`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SCHEMA-ITEM-ISOLATED — UNVERIFIED (low)

- Khu vực: items / Item
- Item has no relations to Pokemon, moves, encounters or game versions; item usage/availability cannot be modeled.
  - `no @relation referencing Item`
- Nguồn: pokedex-backend/prisma/schema.prisma

### SRC-SEED-HARDCODED-COUNT — UNVERIFIED (medium)

- Khu vực: master-data / seed.ts POKEMON_COUNT
- Seed uses a hardcoded species count as its sync range. Counts are not stable identifiers and become stale when new species are added.
  - `POKEMON_COUNT = 1025`
- Nguồn: pokedex-backend/scripts/seed.ts
- ⚠ Cần runtime verification trên DB/staging.

### SRC-UPDATER-COUNT-CURSOR — INCORRECT (medium)

- Khu vực: sync / updaterService.checkUpdates
- Update detection compares local row counts to API counts; gaps in IDs and renames cannot be detected and equal counts hide drift.
  - `Promise.all([prisma.pokemon.count(), prisma.item.count(), prisma.ability.count()])`
- Nguồn: pokedex-backend/src/services/updater.service.ts

### SRC-DAMAGE-GEN-RULES — UNSUPPORTED (high)

- Khu vực: game-specific / damage calculator
- Damage calculation uses move.damageClass unconditionally and has no Gen I special-stat or pre-Gen IV physical/special-by-type rules.
  - `const isPhysical = move.damageClass === "physical"`
  - `no special-case branch for generation <= 3 in damageCalc.ts`
- Nguồn: pokedex-frontend/src/utils/damageCalc.ts

### SRC-WALKTHROUGH-COVERAGE — MISSING (medium)

- Khu vực: walkthrough / walkthroughs.json
- Curated walkthrough content does not cover every supported game version.
  - `missing versions: ultra-sun, ultra-moon, sword, shield, scarlet, violet`
- Nguồn: pokedex-backend/prisma/seeds/walkthroughs.json, pokedex-frontend/src/lib/gameVersions.ts

### SRC-ADMIN-WALKTHROUGH-VERSIONS — MISSING (medium)

- Khu vực: walkthrough / AdminWalkthrough GAME_OPTIONS
- CMS cannot create or edit walkthroughs for several supported games.
  - `missing from admin options: red, blue, yellow, gold, silver, crystal, ruby, sapphire, emerald, firered, leafgreen, diamond, pearl, platinum, heartgold, soulsilver, black, white, black-2, white-2, x, y, omega-ruby, alpha-sapphire, sun, moon, ultra-sun, ultra-moon, lets-go-pikachu, lets-go-eevee, sword, shield, brilliant-diamond, shining-pearl, legends-arceus, scarlet, violet, legends-za`
- Nguồn: pokedex-frontend/src/pages/AdminWalkthrough.tsx, pokedex-frontend/src/lib/gameVersions.ts

### SRC-NATUREDEX-STATIC — UNSUPPORTED (medium)

- Khu vực: natures / NatureDex
- Nature data is hardcoded in the frontend and absent from Prisma/GraphQL; it cannot be audited, curated or versioned as data.
  - `hardcoded natures: 25`
- Nguồn: pokedex-frontend/src/pages/NatureDex.tsx, pokedex-backend/prisma/schema.prisma, pokedex-backend/src/graphql/typeDefs.ts

### SRC-SAVE-TEAM-UNUSED — UNVERIFIED (low)

- Khu vực: user data / saveTeam mutation
- The server-side saveTeam mutation has no frontend caller; team builder state appears local-only, so DB team rows cannot be assumed complete.
  - `no saveTeam reference in TeamBuilder/teamStore/MyPokedexContext`
- Nguồn: pokedex-backend/src/graphql/typeDefs.ts, pokedex-frontend/src/lib/teamStore.ts
- ⚠ Cần runtime verification trên DB/staging.

### SRC-SEED-REMOTE-IMAGE-URLS — UNVERIFIED (medium)

- Khu vực: images / seed.ts imageUrl
- Seed writes remote PokéAPI artwork URLs into DB image fields while local WebP assets are produced by the updater. Actual DB image URLs require runtime verification.
  - `imageUrl: data.sprites?.other?.["official-artwork"]?.front_default || null`
- Nguồn: pokedex-backend/scripts/seed.ts, pokedex-backend/src/services/image.service.ts
- ⚠ Cần runtime verification trên DB/staging.

### API-SPECIES-IDS-CORRECT — CORRECT (info)

- Khu vực: master-data / National Dex IDs
- PokéAPI species IDs form a continuous range; the catalog contains no gaps.
  - `ids 1..1025 (1025 species)`
- Nguồn: https://pokeapi.co/api/v2/pokemon-species

### API-VERSIONS-CORRECT — CORRECT (info)

- Khu vực: game-specific / supported game versions
- Every frontend-supported game slug exists in PokéAPI and its generation agrees with the frontend mapping.
  - `versions checked: 38`
- Nguồn: https://pokeapi.co/api/v2/version, pokedex-frontend/src/lib/gameVersions.ts

### API-DEX-VERSION-MISMATCH — INCORRECT (medium)

- Khu vực: game-specific / regional dex / version group
- A game maps to a regional dex whose version groups exclude that game.
  - `omega-ruby (vg=omega-ruby-alpha-sapphire) mapped=hoenn; apiCandidates=updated-hoenn`
  - `alpha-sapphire (vg=omega-ruby-alpha-sapphire) mapped=hoenn; apiCandidates=updated-hoenn`
  - `legends-za (vg=legends-za) mapped=kalos-central; apiCandidates=hyperspace|lumiose-city`
- Nguồn: https://pokeapi.co/api/v2/pokedex, pokedex-frontend/src/lib/gameVersions.ts

### API-DEX-SLUGS-CORRECT — CORRECT (info)

- Khu vực: game-specific / GAME_TO_REGIONAL_DEX
- All mapped regional dex slugs exist in the PokéAPI pokedex catalog.
  - `mapped dexes checked: 15`
- Nguồn: https://pokeapi.co/api/v2/pokedex, pokedex-frontend/src/lib/gameVersions.ts

### API-GENERATION-COVERAGE-CORRECT — CORRECT (info)

- Khu vực: master-data / seed getGeneration(id)
- ID ranges used by the seed match PokéAPI species membership for all nine generations.
  - `gen 1=151`
  - `gen 2=100`
  - `gen 3=135`
  - `gen 4=107`
  - `gen 5=156`
  - `gen 6=72`
  - `gen 7=88`
  - `gen 8=96`
  - `gen 9=120`
- Nguồn: https://pokeapi.co/api/v2/generation, pokedex-backend/scripts/seed.ts

### API-IMAGE-SAMPLE-MISSING — MISSING (medium)

- Khu vực: images / local WebP assets
- Audited species or variety names lack local normal/shiny WebP assets. DB imageUrl may still point to remote PokeAPI URLs; runtime verification is required.
  - `25 pikachu-world-cap: normal missing`
  - `25 pikachu-starter: shiny missing`
  - `25 pikachu-world-cap: shiny missing`
  - `133 eevee-starter: shiny missing`
  - `386 deoxys: normal missing`
  - `386 deoxys: shiny missing`
  - `413 wormadam: normal missing`
  - `413 wormadam: shiny missing`
  - `487 giratina: normal missing`
  - `487 giratina: shiny missing`
  - `492 shaymin: normal missing`
  - `492 shaymin: shiny missing`
- Nguồn: https://pokeapi.co/api/v2/pokemon-species, pokedex-backend/public/images
- ⚠ Cần runtime verification trên DB/staging.

### API-DESCRIPTION-LANGUAGE-COVERAGE — UNVERIFIED (low)

- Khu vực: master-data / descriptions
- Audited species do not expose both en and vi flavor text from PokéAPI; curated descriptions cannot be sourced from this reference alone.
  - `1 bulbasaur: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `2 ivysaur: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `3 venusaur: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `4 charmander: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `5 charmeleon: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `6 charizard: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `7 squirtle: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `8 wartortle: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `9 blastoise: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `10 caterpie: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `11 metapod: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `12 butterfree: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
- Nguồn: https://pokeapi.co/api/v2/pokemon-species
- ⚠ Cần runtime verification trên DB/staging.

### FULL-SPECIES-COVERAGE — CORRECT (info)

- Khu vực: master-data / full species catalog
- Every PokéAPI species ID was audited with types, stats, abilities, evolution, learnsets, encounters and local image checks.
  - `audited=1025/1025`
  - `failed=0`
- Nguồn: https://pokeapi.co/api/v2/pokemon-species, audit/.cache/pokeapi/checkpoints

### FULL-FORM-COVERAGE — CORRECT (info)

- Khu vực: forms / full form/variety catalog
- Every PokéAPI Pokemon form/variety was checked, including per-form game indices and learnset version groups.
  - `formsChecked=1351`
  - `pokemonCatalog=1351`
  - `varieties=1351`
- Nguồn: https://pokeapi.co/api/v2/pokemon, https://pokeapi.co/api/v2/pokemon-species

### FULL-GAME-COVERAGE — MISSING (high)

- Khu vực: game-specific / 38 supported games
- Some supported games lack reference coverage or have version-group/dex inconsistencies; see game-coverage.csv.
  - `omega-ruby: INCORRECT — version-group=omega-ruby-alpha-sapphire`
  - `alpha-sapphire: INCORRECT — version-group=omega-ruby-alpha-sapphire`
  - `ultra-sun: MISSING — version-group=ultra-sun-ultra-moon`
  - `ultra-moon: MISSING — version-group=ultra-sun-ultra-moon`
  - `sword: MISSING — version-group=sword-shield`
  - `shield: MISSING — version-group=sword-shield`
  - `scarlet: MISSING — version-group=scarlet-violet`
  - `violet: MISSING — version-group=scarlet-violet`
  - `legends-za: INCORRECT — version-group=legends-za`
- Nguồn: https://pokeapi.co/api/v2/version, https://pokeapi.co/api/v2/pokedex, pokedex-frontend/src/lib/gameVersions.ts
- ⚠ Cần runtime verification trên DB/staging.

### FULL-CATALOG-DETAILS — CORRECT (info)

- Khu vực: moves / ability/item catalog details
- Ability and item catalogs were resolved per generation, and items were resolved per version group via cached detail calls.
  - `abilitiesDetailed=374/374`
  - `itemsDetailed=2223/2223`
  - `itemVersionGroups=14`
- Nguồn: https://pokeapi.co/api/v2/ability, https://pokeapi.co/api/v2/item

### API-LEARNSET-VERSION-DETAIL — MISSING (high)

- Khu vực: game-specific / learnsets
- Reference learnsets carry per-version-group detail, but the local PokemonMove model has no version dimension; imported learnsets cannot be validated per game.
  - `species 1: 25 version groups`
  - `species 2: 25 version groups`
  - `species 3: 26 version groups`
  - `species 4: 25 version groups`
  - `species 5: 25 version groups`
  - `species 6: 26 version groups`
  - `species 7: 25 version groups`
  - `species 8: 25 version groups`
  - `species 9: 26 version groups`
  - `species 10: 23 version groups`
  - `species 11: 23 version groups`
  - `species 12: 23 version groups`
- Nguồn: https://pokeapi.co/api/v2/pokemon/{id}, pokedex-backend/prisma/schema.prisma

### DB-UNVERIFIED-RECORD-COUNTS — UNVERIFIED (medium)

- Khu vực: record counts / database rows
- No read-only database connection was provided; record counts cannot be confirmed from real rows. Code and schema are not evidence of database contents.
  - `AUDIT_DATABASE_URL not available in this run`
- Nguồn: pokedex-backend/prisma/schema.prisma
- ⚠ Cần runtime verification trên DB/staging.

### DB-UNVERIFIED-DUPLICATES — UNVERIFIED (medium)

- Khu vực: duplicates / database rows
- No read-only database connection was provided; duplicates cannot be confirmed from real rows. Code and schema are not evidence of database contents.
  - `AUDIT_DATABASE_URL not available in this run`
- Nguồn: pokedex-backend/prisma/schema.prisma
- ⚠ Cần runtime verification trên DB/staging.

### DB-UNVERIFIED-MISSING-FIELDS — UNVERIFIED (medium)

- Khu vực: missing fields / database rows
- No read-only database connection was provided; missing fields cannot be confirmed from real rows. Code and schema are not evidence of database contents.
  - `AUDIT_DATABASE_URL not available in this run`
- Nguồn: pokedex-backend/prisma/schema.prisma
- ⚠ Cần runtime verification trên DB/staging.

### DB-UNVERIFIED-ORPHAN-RELATIONS — UNVERIFIED (medium)

- Khu vực: orphan relations / database rows
- No read-only database connection was provided; orphan relations cannot be confirmed from real rows. Code and schema are not evidence of database contents.
  - `AUDIT_DATABASE_URL not available in this run`
- Nguồn: pokedex-backend/prisma/schema.prisma
- ⚠ Cần runtime verification trên DB/staging.

### DB-UNVERIFIED-ID-CONSISTENCY — UNVERIFIED (medium)

- Khu vực: ID consistency / database rows
- No read-only database connection was provided; ID consistency cannot be confirmed from real rows. Code and schema are not evidence of database contents.
  - `AUDIT_DATABASE_URL not available in this run`
- Nguồn: pokedex-backend/prisma/schema.prisma
- ⚠ Cần runtime verification trên DB/staging.

### DB-UNVERIFIED-GAME-VERSION-COVERAGE — UNVERIFIED (medium)

- Khu vực: game version coverage / database rows
- No read-only database connection was provided; game version coverage cannot be confirmed from real rows. Code and schema are not evidence of database contents.
  - `AUDIT_DATABASE_URL not available in this run`
- Nguồn: pokedex-backend/prisma/schema.prisma
- ⚠ Cần runtime verification trên DB/staging.

### DB-UNVERIFIED-WALKTHROUGH-COVERAGE — UNVERIFIED (medium)

- Khu vực: walkthrough coverage / database rows
- No read-only database connection was provided; walkthrough coverage cannot be confirmed from real rows. Code and schema are not evidence of database contents.
  - `AUDIT_DATABASE_URL not available in this run`
- Nguồn: pokedex-backend/prisma/schema.prisma
- ⚠ Cần runtime verification trên DB/staging.

## 6. Quan hệ/schema cần thay đổi

- **SCHEMA-FK-INCONSISTENT**: Relations to Pokemon reference different target fields. Mixing Pokemon.id and Pokemon.pokedexNumber is an ID-contract hazard for writes and joins.
- **SCHEMA-MODEL-MISSING-NATURE**: No Nature model. NatureDex is requested but no model exists.
- **SCHEMA-MODEL-MISSING-GAMEVERSION**: No GameVersion model. Game-specific rules and walkthroughs use free-text version slugs.
- **SCHEMA-MODEL-MISSING-REGION**: No Region model. Regional dex membership is stored as string arrays.
- **SCHEMA-MODEL-MISSING-TYPEEFFECTIVENESS**: No TypeEffectiveness model. Type chart is code-only; no per-generation rules can be stored or audited in DB.
- **SCHEMA-LEARNSET-NO-VERSION**: Learnsets have no version/version-group dimension; the same move cannot be distinguished between games where it is or is not learnable.
- **SCHEMA-EVOLUTION-NO-CONDITION**: Evolution stores only from/to IDs; triggers, levels, held items, friendship, time and version-specific conditions cannot be represented.
- **SCHEMA-VARIETY-NO-GIGANTAMAX**: Forms model has isMega/isAlternative but no Gigantamax flag or form-specific stats; form identity is incomplete.
- **SCHEMA-ENCOUNTER-STRING-FK**: Encounters reference locations and versions by free text instead of stable FKs.
- **SCHEMA-WALKTHROUGH-UNVALIDATED-VERSION**: Walkthrough gameVersion is free text; unsupported or misspelled slugs cannot be rejected by DB constraints.
- **SCHEMA-ITEM-ISOLATED**: Item has no relations to Pokemon, moves, encounters or game versions; item usage/availability cannot be modeled.

## 7. Kế hoạch sửa dữ liệu an toàn

Không apply trực tiếp. Mỗi bước có dry-run, backup và rollback; xem `fix-plan.json`.

| Thứ tự | Nhóm | Finding | Runtime? |
|---:|---|---|---|
| 1 | Pokemon master data | SRC-UPDATER-COUNT-CURSOR | không |
| 2 | Forms and evolutions | SCHEMA-EVOLUTION-NO-CONDITION | có |
| 2 | Forms and evolutions | SCHEMA-FK-INCONSISTENT | có |
| 2 | Forms and evolutions | SCHEMA-VARIETY-NO-GIGANTAMAX | có |
| 3 | Availability | API-DEX-VERSION-MISMATCH | không |
| 3 | Availability | FULL-GAME-COVERAGE | có |
| 3 | Availability | SCHEMA-MODEL-MISSING-GAMEVERSION | có |
| 3 | Availability | SCHEMA-WALKTHROUGH-UNVALIDATED-VERSION | có |
| 3 | Availability | SRC-ADMIN-WALKTHROUGH-VERSIONS | không |
| 3 | Availability | SRC-NATUREDEX-STATIC | không |
| 4 | Learnsets and generation rules | API-LEARNSET-VERSION-DETAIL | không |
| 4 | Learnsets and generation rules | SCHEMA-LEARNSET-NO-VERSION | có |
| 4 | Learnsets and generation rules | SRC-DAMAGE-GEN-RULES | không |
| 5 | Encounters and locations | SCHEMA-ENCOUNTER-STRING-FK | có |
| 6 | Moves, abilities and items | SCHEMA-MODEL-MISSING-NATURE | có |
| 6 | Moves, abilities and items | SCHEMA-MODEL-MISSING-TYPEEFFECTIVENESS | có |
| 7 | Images | API-IMAGE-SAMPLE-MISSING | có |
| 8 | Walkthrough | SRC-WALKTHROUGH-COVERAGE | có |
| 9 | Other data quality work | SCHEMA-MODEL-MISSING-REGION | có |

## 8. Dữ liệu cần biên tập tay / chưa xác minh

Không tự bịa nội dung. Các mục dưới đây cần người duyệt hoặc DB staging/backup; chi tiết nằm ở `manual-review.csv` và `unverified.csv`.

| Finding | Phân loại | Entity | Việc cần làm | Bằng chứng mẫu |
|---|---|---|---|---|
SCHEMA-FK-INCONSISTENT | INCORRECT | Pokemon foreign keys | Choose one stable target (prefer Pokemon.id surrogate key) and migrate all references with a verified mapping; keep pokedexNumber unique for public API identity. | references pokedexNumber: Evolution.fromPokemon, Evolution.toPokemon, TeamSlot.pokemon, PokemonMove.pokemon, PokemonVariety.pokemon, Encounter.pokemon
SCHEMA-MODEL-MISSING-NATURE | MISSING | Nature | No Nature model. NatureDex is requested but no model exists. | models present: Pokemon, Type, Ability, Evolution, User, UserPokemon, Team, TeamSlot, Move, PokemonMove, PokemonVariety, Encounter, DexEntry, Item, Walkthrough
SCHEMA-MODEL-MISSING-GAMEVERSION | MISSING | GameVersion | No GameVersion model. Game-specific rules and walkthroughs use free-text version slugs. | models present: Pokemon, Type, Ability, Evolution, User, UserPokemon, Team, TeamSlot, Move, PokemonMove, PokemonVariety, Encounter, DexEntry, Item, Walkthrough
SCHEMA-MODEL-MISSING-REGION | MISSING | Region | No Region model. Regional dex membership is stored as string arrays. | models present: Pokemon, Type, Ability, Evolution, User, UserPokemon, Team, TeamSlot, Move, PokemonMove, PokemonVariety, Encounter, DexEntry, Item, Walkthrough
SCHEMA-MODEL-MISSING-TYPEEFFECTIVENESS | MISSING | TypeEffectiveness | No TypeEffectiveness model. Type chart is code-only; no per-generation rules can be stored or audited in DB. | models present: Pokemon, Type, Ability, Evolution, User, UserPokemon, Team, TeamSlot, Move, PokemonMove, PokemonVariety, Encounter, DexEntry, Item, Walkthrough
SCHEMA-LEARNSET-NO-VERSION | MISSING | PokemonMove | Add versionGroup (and ideally learnMethod detail) with a stable FK. | PokemonMove fields: pokemonId, moveId, learnMethod, levelLearnedAt, pokemon, move
SCHEMA-EVOLUTION-NO-CONDITION | MISSING | Evolution | Evolution stores only from/to IDs; triggers, levels, held items, friendship, time and version-specific conditions cannot be represented. | Evolution fields: id, fromPokemonId, toPokemonId, fromPokemon, toPokemon
SCHEMA-VARIETY-NO-GIGANTAMAX | MISSING | PokemonVariety | Forms model has isMega/isAlternative but no Gigantamax flag or form-specific stats; form identity is incomplete. | PokemonVariety fields: id, pokemonId, name, imageUrl, shinyImageUrl, isMega, isAlternative, types, pokemon
SCHEMA-ITEM-ISOLATED | UNVERIFIED | Item | Item has no relations to Pokemon, moves, encounters or game versions; item usage/availability cannot be modeled. | no @relation referencing Item
SRC-SEED-HARDCODED-COUNT | UNVERIFIED | seed.ts POKEMON_COUNT | Derive IDs from PokéAPI pagination/next URLs or a maintained explicit ID list. | POKEMON_COUNT = 1025
SRC-WALKTHROUGH-COVERAGE | MISSING | walkthroughs.json | Curated walkthrough content does not cover every supported game version. | missing versions: ultra-sun, ultra-moon, sword, shield, scarlet, violet
SRC-ADMIN-WALKTHROUGH-VERSIONS | MISSING | AdminWalkthrough GAME_OPTIONS | CMS cannot create or edit walkthroughs for several supported games. | missing from admin options: red, blue, yellow, gold, silver, crystal, ruby, sapphire, emerald, firered, leafgreen, diamond, pearl, platinum, heartgold, soulsilver, black, white, black-2, white-2, x, y, omega-ruby, alpha-sapphire, sun, moon, ultra-sun, ultra-moon, lets-go-pikachu, lets-go-eevee, sword, shield, brilliant-diamond, shining-pearl, legends-arceus, scarlet, violet, legends-za
SRC-SAVE-TEAM-UNUSED | UNVERIFIED | saveTeam mutation | The server-side saveTeam mutation has no frontend caller; team builder state appears local-only, so DB team rows cannot be assumed complete. | no saveTeam reference in TeamBuilder/teamStore/MyPokedexContext
SRC-SEED-REMOTE-IMAGE-URLS | UNVERIFIED | seed.ts imageUrl | Seed writes remote PokéAPI artwork URLs into DB image fields while local WebP assets are produced by the updater. Actual DB image URLs require runtime verification. | imageUrl: data.sprites?.other?.["official-artwork"]?.front_default \|\| null
API-IMAGE-SAMPLE-MISSING | MISSING | local WebP assets | Audited species or variety names lack local normal/shiny WebP assets. DB imageUrl may still point to remote PokeAPI URLs; runtime verification is required. | 25 pikachu-world-cap: normal missing
API-DESCRIPTION-LANGUAGE-COVERAGE | UNVERIFIED | descriptions | Audited species do not expose both en and vi flavor text from PokéAPI; curated descriptions cannot be sourced from this reference alone. | 1 bulbasaur: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant
FULL-GAME-COVERAGE | MISSING | 38 supported games | Resolve reference gaps first; then verify the same games against a read-only staging/backup DB. | omega-ruby: INCORRECT — version-group=omega-ruby-alpha-sapphire
API-LEARNSET-VERSION-DETAIL | MISSING | learnsets | Reference learnsets carry per-version-group detail, but the local PokemonMove model has no version dimension; imported learnsets cannot be validated per game. | species 1: 25 version groups
DB-UNVERIFIED-RECORD-COUNTS | UNVERIFIED | database rows | Re-run with --db and a read-only staging or restored backup connection string. | AUDIT_DATABASE_URL not available in this run
DB-UNVERIFIED-DUPLICATES | UNVERIFIED | database rows | Re-run with --db and a read-only staging or restored backup connection string. | AUDIT_DATABASE_URL not available in this run
DB-UNVERIFIED-MISSING-FIELDS | UNVERIFIED | database rows | Re-run with --db and a read-only staging or restored backup connection string. | AUDIT_DATABASE_URL not available in this run
DB-UNVERIFIED-ORPHAN-RELATIONS | UNVERIFIED | database rows | Re-run with --db and a read-only staging or restored backup connection string. | AUDIT_DATABASE_URL not available in this run
DB-UNVERIFIED-ID-CONSISTENCY | UNVERIFIED | database rows | Re-run with --db and a read-only staging or restored backup connection string. | AUDIT_DATABASE_URL not available in this run
DB-UNVERIFIED-GAME-VERSION-COVERAGE | UNVERIFIED | database rows | Re-run with --db and a read-only staging or restored backup connection string. | AUDIT_DATABASE_URL not available in this run
DB-UNVERIFIED-WALKTHROUGH-COVERAGE | UNVERIFIED | database rows | Re-run with --db and a read-only staging or restored backup connection string. | AUDIT_DATABASE_URL not available in this run

## 9. Giới hạn

- Schema models: 15; source files: 8.
- Chưa browser smoke test, chưa chạy migration/sync/seed, chưa ghi vào bất kỳ database nào.