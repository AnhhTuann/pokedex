# Độ phủ 38 game hỗ trợ

Revision PokéAPI: `508fd7c3a7d54ac175e00afe420b11a5af983bd6`. DB row-level: **UNVERIFIED**.

Kỳ vọng là một version reference cho mỗi slug cấu hình. Chưa xác minh ghi các game audit còn trạng thái UNVERIFIED. Dex tham chiếu liên kết theo version group, còn Dex app là mapping truy vấn. Hợp membership dex không đồng nghĩa khả năng bắt. Form game index theo version riêng, learnset theo version group. Số slot là thống kê species mặc định từ pipeline.

| Game | Kỳ vọng | Tham chiếu | Thiếu | Trùng | Không hợp lệ | Chưa xác minh | Gen | Version group | Dex tham chiếu | Species Dex | Dex app | Species Dex app | Forms game index | Forms learnset VG | Move slot | Species encounter |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| red | 1 | 1 | 0 | 0 | 0 | 0 | 1 | red-blue | kanto | 151 | kanto | 151 | 151 | 151 | 4128 | 0 |
| blue | 1 | 1 | 0 | 0 | 0 | 0 | 1 | red-blue | kanto | 151 | kanto | 151 | 151 | 151 | 4128 | 0 |
| yellow | 1 | 1 | 0 | 0 | 0 | 0 | 1 | yellow | kanto | 151 | kanto | 151 | 151 | 151 | 4152 | 0 |
| gold | 1 | 1 | 0 | 0 | 0 | 0 | 2 | gold-silver | original-johto | 251 | original-johto | 251 | 251 | 251 | 9056 | 0 |
| silver | 1 | 1 | 0 | 0 | 0 | 0 | 2 | gold-silver | original-johto | 251 | original-johto | 251 | 251 | 251 | 9056 | 0 |
| crystal | 1 | 1 | 0 | 0 | 0 | 0 | 2 | crystal | original-johto | 251 | original-johto | 251 | 251 | 251 | 9286 | 0 |
| ruby | 1 | 1 | 0 | 0 | 0 | 0 | 3 | ruby-sapphire | hoenn | 202 | hoenn | 202 | 386 | 389 | 13847 | 0 |
| sapphire | 1 | 1 | 0 | 0 | 0 | 0 | 3 | ruby-sapphire | hoenn | 202 | hoenn | 202 | 386 | 389 | 13847 | 0 |
| emerald | 1 | 1 | 0 | 0 | 0 | 0 | 3 | emerald | hoenn | 202 | hoenn | 202 | 386 | 389 | 19086 | 0 |
| firered | 1 | 1 | 0 | 0 | 0 | 0 | 3 | firered-leafgreen | kanto | 151 | kanto | 151 | 386 | 390 | 16243 | 0 |
| leafgreen | 1 | 1 | 0 | 0 | 0 | 0 | 3 | firered-leafgreen | kanto | 151 | kanto | 151 | 386 | 390 | 16243 | 0 |
| diamond | 1 | 1 | 0 | 0 | 0 | 0 | 4 | diamond-pearl | original-sinnoh | 151 | original-sinnoh | 151 | 493 | 501 | 25846 | 0 |
| pearl | 1 | 1 | 0 | 0 | 0 | 0 | 4 | diamond-pearl | original-sinnoh | 151 | original-sinnoh | 151 | 493 | 501 | 25846 | 0 |
| platinum | 1 | 1 | 0 | 0 | 0 | 0 | 4 | platinum | extended-sinnoh | 210 | extended-sinnoh | 210 | 493 | 508 | 30000 | 0 |
| heartgold | 1 | 1 | 0 | 0 | 0 | 0 | 4 | heartgold-soulsilver | updated-johto | 256 | updated-johto | 256 | 493 | 508 | 31285 | 0 |
| soulsilver | 1 | 1 | 0 | 0 | 0 | 0 | 4 | heartgold-soulsilver | updated-johto | 256 | updated-johto | 256 | 493 | 508 | 31285 | 0 |
| black | 1 | 1 | 0 | 0 | 0 | 0 | 5 | black-white | original-unova | 156 | original-unova | 156 | 649 | 667 | 32847 | 0 |
| white | 1 | 1 | 0 | 0 | 0 | 0 | 5 | black-white | original-unova | 156 | original-unova | 156 | 649 | 667 | 32847 | 0 |
| black-2 | 1 | 1 | 0 | 0 | 0 | 0 | 5 | black-2-white-2 | updated-unova | 301 | updated-unova | 301 | 649 | 673 | 40028 | 0 |
| white-2 | 1 | 1 | 0 | 0 | 0 | 0 | 5 | black-2-white-2 | updated-unova | 301 | updated-unova | 301 | 649 | 673 | 40028 | 0 |
| x | 1 | 1 | 0 | 0 | 0 | 0 | 6 | x-y | kalos-central, kalos-coastal, kalos-mountain | 457 | kalos-central | 153 | 721 | 784 | 39060 | 0 |
| y | 1 | 1 | 0 | 0 | 0 | 0 | 6 | x-y | kalos-central, kalos-coastal, kalos-mountain | 457 | kalos-central | 153 | 721 | 784 | 39060 | 0 |
| omega-ruby | 1 | 1 | 0 | 0 | 0 | 1 | 6 | omega-ruby-alpha-sapphire | updated-hoenn | 211 | hoenn | 202 | 721 | 811 | 47731 | 0 |
| alpha-sapphire | 1 | 1 | 0 | 0 | 0 | 1 | 6 | omega-ruby-alpha-sapphire | updated-hoenn | 211 | hoenn | 202 | 721 | 811 | 47731 | 0 |
| sun | 1 | 1 | 0 | 0 | 0 | 0 | 7 | sun-moon | original-akala, original-alola, original-melemele, original-poni, original-ulaula | 302 | original-alola | 302 | 802 | 944 | 41587 | 0 |
| moon | 1 | 1 | 0 | 0 | 0 | 0 | 7 | sun-moon | original-akala, original-alola, original-melemele, original-poni, original-ulaula | 302 | original-alola | 302 | 802 | 944 | 41587 | 0 |
| ultra-sun | 1 | 1 | 0 | 0 | 0 | 0 | 7 | ultra-sun-ultra-moon | updated-akala, updated-alola, updated-melemele, updated-poni, updated-ulaula | 403 | updated-alola | 403 | 802 | 959 | 51436 | 0 |
| ultra-moon | 1 | 1 | 0 | 0 | 0 | 0 | 7 | ultra-sun-ultra-moon | updated-akala, updated-alola, updated-melemele, updated-poni, updated-ulaula | 403 | updated-alola | 403 | 802 | 959 | 51436 | 0 |
| lets-go-pikachu | 1 | 1 | 0 | 0 | 0 | 0 | 7 | lets-go-pikachu-lets-go-eevee | letsgo-kanto | 153 | letsgo-kanto | 153 | 802 | 188 | 4569 | 0 |
| lets-go-eevee | 1 | 1 | 0 | 0 | 0 | 0 | 7 | lets-go-pikachu-lets-go-eevee | letsgo-kanto | 153 | letsgo-kanto | 153 | 802 | 188 | 4569 | 0 |
| sword | 1 | 1 | 0 | 0 | 0 | 0 | 8 | sword-shield | crown-tundra, galar, isle-of-armor | 584 | galar | 400 | 664 | 750 | 38684 | 0 |
| shield | 1 | 1 | 0 | 0 | 0 | 0 | 8 | sword-shield | crown-tundra, galar, isle-of-armor | 584 | galar | 400 | 664 | 750 | 38684 | 0 |
| brilliant-diamond | 1 | 1 | 0 | 0 | 0 | 0 | 8 | brilliant-diamond-shining-pearl | original-sinnoh | 151 | original-sinnoh | 151 | 664 | 508 | 24927 | 0 |
| shining-pearl | 1 | 1 | 0 | 0 | 0 | 0 | 8 | brilliant-diamond-shining-pearl | original-sinnoh | 151 | original-sinnoh | 151 | 664 | 508 | 24927 | 0 |
| legends-arceus | 1 | 1 | 0 | 0 | 0 | 0 | 8 | legends-arceus | hisui | 242 | hisui | 242 | 664 | 261 | 4687 | 0 |
| scarlet | 1 | 1 | 0 | 0 | 0 | 0 | 9 | scarlet-violet | blueberry, kitakami, paldea | 664 | paldea | 400 | 733 | 870 | 45262 | 0 |
| violet | 1 | 1 | 0 | 0 | 0 | 0 | 9 | scarlet-violet | blueberry, kitakami, paldea | 664 | paldea | 400 | 733 | 870 | 45262 | 0 |
| legends-za | 1 | 1 | 0 | 0 | 0 | 0 | 9 | legends-za | hyperspace, lumiose-city | 364 | lumiose-city / hyperspace | 364 | 733 | 512 | 16096 | 0 |
