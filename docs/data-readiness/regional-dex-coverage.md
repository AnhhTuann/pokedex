# Độ phủ 35 Pokédex

Snapshot `508fd7c3a7d54ac175e00afe420b11a5af983bd6`. Dữ liệu DB **UNVERIFIED**.

Đã đối chiếu 8.010 entry với National Dex, giữ nguyên numbering của snapshot. Ma trận chi tiết ghi ID, slug, tên hiển thị, broad region, nhóm game và số thứ tự từng species. Null broad region biểu thị upstream không gán region. Các khoảng trống numbering ở Champions không phải thiếu membership. Victini số 0 hợp lệ ở cả hai dex Unova.

ORAS tham chiếu Updated Hoenn (211), trong khi Ruby, Sapphire và Emerald dùng Hoenn (202). Mapping runtime ORAS vẫn giữ Hoenn. DB chưa xác minh. Legends Z-A dùng hàm query chung cho Lumiose City (232) và Hyperspace (132). Hợp hai tập có 364 species.

| ID | Dex | Tên | Region | Kỳ vọng | Thực tế | Thiếu | Trùng | Sai | Chưa xác minh | Khoảng trống |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | national | National | — | 1025 | 1025 | 0 | 0 | 0 | 0 | 0 |
| 2 | kanto | Kanto | kanto | 151 | 151 | 0 | 0 | 0 | 0 | 0 |
| 3 | original-johto | Original Johto | johto | 251 | 251 | 0 | 0 | 0 | 0 | 0 |
| 4 | hoenn | Original Hoenn | hoenn | 202 | 202 | 0 | 0 | 0 | 0 | 0 |
| 5 | original-sinnoh | Original Sinnoh | sinnoh | 151 | 151 | 0 | 0 | 0 | 0 | 0 |
| 6 | extended-sinnoh | Extended Sinnoh | sinnoh | 210 | 210 | 0 | 0 | 0 | 0 | 0 |
| 7 | updated-johto | Updated Johto | johto | 256 | 256 | 0 | 0 | 0 | 0 | 0 |
| 8 | original-unova | Original Unova | unova | 156 | 156 | 0 | 0 | 0 | 0 | 0 |
| 9 | updated-unova | Updated Unova | unova | 301 | 301 | 0 | 0 | 0 | 0 | 0 |
| 11 | conquest-gallery | Gallery | — | 200 | 200 | 0 | 0 | 0 | 0 | 0 |
| 12 | kalos-central | Central Kalos | kalos | 153 | 153 | 0 | 0 | 0 | 0 | 0 |
| 13 | kalos-coastal | Coastal Kalos | kalos | 153 | 153 | 0 | 0 | 0 | 0 | 0 |
| 14 | kalos-mountain | Mountain Kalos | kalos | 151 | 151 | 0 | 0 | 0 | 0 | 0 |
| 15 | updated-hoenn | New Hoenn | hoenn | 211 | 211 | 0 | 0 | 0 | 0 | 0 |
| 16 | original-alola | Original Alola | alola | 302 | 302 | 0 | 0 | 0 | 0 | 0 |
| 17 | original-melemele | Original Melemele | alola | 120 | 120 | 0 | 0 | 0 | 0 | 0 |
| 18 | original-akala | Original Akala | alola | 130 | 130 | 0 | 0 | 0 | 0 | 0 |
| 19 | original-ulaula | Original Ula’ula | alola | 130 | 130 | 0 | 0 | 0 | 0 | 0 |
| 20 | original-poni | Original Poni | alola | 100 | 100 | 0 | 0 | 0 | 0 | 0 |
| 21 | updated-alola | Updated Alola | alola | 403 | 403 | 0 | 0 | 0 | 0 | 0 |
| 22 | updated-melemele | Updated Melemele | alola | 150 | 150 | 0 | 0 | 0 | 0 | 0 |
| 23 | updated-akala | Updated Akala | alola | 160 | 160 | 0 | 0 | 0 | 0 | 0 |
| 24 | updated-ulaula | Updated Ula’ula | alola | 160 | 160 | 0 | 0 | 0 | 0 | 0 |
| 25 | updated-poni | Updated Poni | alola | 130 | 130 | 0 | 0 | 0 | 0 | 0 |
| 26 | letsgo-kanto | Let’s Go Kanto | kanto | 153 | 153 | 0 | 0 | 0 | 0 | 0 |
| 27 | galar | Galar | galar | 400 | 400 | 0 | 0 | 0 | 0 | 0 |
| 28 | isle-of-armor | Isle of Armor | galar | 211 | 211 | 0 | 0 | 0 | 0 | 0 |
| 29 | crown-tundra | Crown Tundra | galar | 210 | 210 | 0 | 0 | 0 | 0 | 0 |
| 30 | hisui | Hisui | hisui | 242 | 242 | 0 | 0 | 0 | 0 | 0 |
| 31 | paldea | Paldea | paldea | 400 | 400 | 0 | 0 | 0 | 0 | 0 |
| 32 | kitakami | Kitakami | paldea | 200 | 200 | 0 | 0 | 0 | 0 | 0 |
| 33 | blueberry | Blueberry | paldea | 243 | 243 | 0 | 0 | 0 | 0 | 0 |
| 34 | lumiose-city | Lumiose | kalos | 232 | 232 | 0 | 0 | 0 | 0 | 0 |
| 35 | hyperspace | Hyperspace | kalos | 132 | 132 | 0 | 0 | 0 | 0 | 0 |
| 36 | champions | Champions | — | 231 | 231 | 0 | 0 | 0 | 0 | 788 |

[Ma trận CSV đầy đủ](../../pokedex-backend/audit/reports/phase9b-coverage/regional-dexes.csv) chứa file nguồn, revision và trạng thái bằng chứng.
