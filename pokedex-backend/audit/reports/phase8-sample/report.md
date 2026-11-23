# Elite PokéDex — Báo cáo kiểm toán dữ liệu

- Sinh lúc: 2026-11-23T14:19:14.519Z
- Base ref: `audit/phase8-validation@1e106ec`
- Chế độ: schema, source, pokeapi, db:offline
- Phạm vi: **đã kiểm tra 385**, **chưa kiểm tra 2262**, **chưa xác minh 12**.

> Dữ liệu trong code/schema **không** phải bằng chứng về nội dung database thật. Mọi mục `UNVERIFIED` cần chạy lại với DB staging/backup an toàn.

## 0. Phân biệt species / form / DB rows

- Species PokéAPI: **1025**
- Pokemon/form PokéAPI: **1351**
- Variety records đã kiểm tra: **91**
- Species đã kiểm tra: **38** (resume: 0, lỗi: 0)
- DB rows: **BLOCKED — chưa có AUDIT_DATABASE_URL**

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

## 3. Coverage theo Game

- Game frontend hỗ trợ: **38**
- Game đối chiếu được với PokéAPI: **38**
- Regional dex đã kiểm tra: **35**
- Game có walkthrough: **32** / 38

| Game | Gen (API) | Regional dex | Dex version-group | Walkthrough |
|---|---:|---|---|---|
| red | 1 | kanto | OK | có |
| blue | 1 | kanto | OK | có |
| yellow | 1 | kanto | OK | có |
| gold | 2 | original-johto | OK | có |
| silver | 2 | original-johto | OK | có |
| crystal | 2 | original-johto | OK | có |
| ruby | 3 | hoenn | OK | có |
| sapphire | 3 | hoenn | OK | có |
| emerald | 3 | hoenn | OK | có |
| firered | 3 | kanto | OK | có |
| leafgreen | 3 | kanto | OK | có |
| diamond | 4 | original-sinnoh | OK | có |
| pearl | 4 | original-sinnoh | OK | có |
| platinum | 4 | extended-sinnoh | OK | có |
| heartgold | 4 | updated-johto | OK | có |
| soulsilver | 4 | updated-johto | OK | có |
| black | 5 | original-unova | OK | có |
| white | 5 | original-unova | OK | có |
| black-2 | 5 | updated-unova | OK | có |
| white-2 | 5 | updated-unova | OK | có |
| x | 6 | kalos-central | OK | có |
| y | 6 | kalos-central | OK | có |
| omega-ruby | 6 | hoenn | ⚠ mismatch | có |
| alpha-sapphire | 6 | hoenn | ⚠ mismatch | có |
| sun | 7 | original-alola | OK | có |
| moon | 7 | original-alola | OK | có |
| ultra-sun | 7 | updated-alola | OK | **thiếu** |
| ultra-moon | 7 | updated-alola | OK | **thiếu** |
| lets-go-pikachu | 7 | letsgo-kanto | OK | có |
| lets-go-eevee | 7 | letsgo-kanto | OK | có |
| sword | 8 | galar | OK | **thiếu** |
| shield | 8 | galar | OK | **thiếu** |
| brilliant-diamond | 8 | original-sinnoh | OK | có |
| shining-pearl | 8 | original-sinnoh | OK | có |
| legends-arceus | 8 | hisui | OK | có |
| scarlet | 9 | paldea | OK | **thiếu** |
| violet | 9 | paldea | OK | **thiếu** |
| legends-za | 9 | kalos-central | ⚠ mismatch | có |

## 4. Data quality theo model

| Area | CORRECT | MISSING | INCORRECT | DUPLICATE | UNSUPPORTED | UNVERIFIED |
|---|---:|---:|---:|---:|---:|---:|
| ID consistency | 0 | 0 | 0 | 0 | 0 | 1 |
| duplicates | 0 | 0 | 0 | 0 | 0 | 1 |
| encounters | 0 | 0 | 1 | 0 | 0 | 0 |
| evolution | 0 | 1 | 0 | 0 | 0 | 0 |
| forms | 0 | 1 | 0 | 0 | 0 | 0 |
| game version coverage | 0 | 0 | 0 | 0 | 0 | 1 |
| game-specific | 2 | 2 | 1 | 0 | 1 | 0 |
| images | 0 | 1 | 0 | 0 | 0 | 1 |
| items | 0 | 0 | 0 | 0 | 0 | 1 |
| master-data | 2 | 0 | 0 | 0 | 0 | 2 |
| missing fields | 0 | 0 | 0 | 0 | 0 | 1 |
| models | 0 | 4 | 0 | 0 | 0 | 0 |
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
  - `386 deoxys: normal missing`
  - `386 deoxys: shiny missing`
  - `413 wormadam: normal missing`
  - `413 wormadam: shiny missing`
  - `550 basculin: normal missing`
  - `550 basculin: shiny missing`
  - `555 darmanitan: normal missing`
  - `555 darmanitan: shiny missing`
  - `641 tornadus: normal missing`
- Nguồn: https://pokeapi.co/api/v2/pokemon-species, pokedex-backend/public/images
- ⚠ Cần runtime verification trên DB/staging.

### API-DESCRIPTION-LANGUAGE-COVERAGE — UNVERIFIED (low)

- Khu vực: master-data / descriptions
- Audited species do not expose both en and vi flavor text from PokéAPI; curated descriptions cannot be sourced from this reference alone.
  - `1 bulbasaur: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `4 charmander: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `25 pikachu: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `150 mewtwo: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `151 mew: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `152 chikorita: de/en/es/es-419/fr/it/ja/ja-hrkt/ko`
  - `197 umbreon: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
  - `252 treecko: de/en/es/es-419/fr/it/ja/ja-hrkt/ko`
  - `386 deoxys: de/en/es/es-419/fr/it/ja/ja-hrkt/ko`
  - `393 piplup: de/en/es/es-419/fr/it/ja/ja-hrkt/ko`
  - `413 wormadam: de/en/es/es-419/fr/it/ja/ja-hrkt/ko`
  - `427 buneary: de/en/es/es-419/fr/it/ja/ja-hrkt/ko/zh-hans/zh-hant`
- Nguồn: https://pokeapi.co/api/v2/pokemon-species
- ⚠ Cần runtime verification trên DB/staging.

### API-LEARNSET-VERSION-DETAIL — MISSING (high)

- Khu vực: game-specific / learnsets
- Reference learnsets carry per-version-group detail, but the local PokemonMove model has no version dimension; imported learnsets cannot be validated per game.
  - `species 1: 25 version groups`
  - `species 4: 25 version groups`
  - `species 25: 27 version groups`
  - `species 150: 25 version groups`
  - `species 151: 24 version groups`
  - `species 152: 19 version groups`
  - `species 197: 22 version groups`
  - `species 252: 18 version groups`
  - `species 386: 14 version groups`
  - `species 393: 12 version groups`
  - `species 413: 11 version groups`
  - `species 427: 13 version groups`
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
| 1 | Broken relationships | SCHEMA-FK-INCONSISTENT | có |
| 3 | Incorrect master data | SRC-UPDATER-COUNT-CURSOR | không |
| 4 | Game-specific data | API-DEX-VERSION-MISMATCH | không |
| 4 | Game-specific data | API-LEARNSET-VERSION-DETAIL | không |
| 4 | Game-specific data | SCHEMA-LEARNSET-NO-VERSION | có |
| 4 | Game-specific data | SCHEMA-MODEL-MISSING-GAMEVERSION | có |
| 4 | Game-specific data | SCHEMA-WALKTHROUGH-UNVALIDATED-VERSION | có |
| 4 | Game-specific data | SRC-ADMIN-WALKTHROUGH-VERSIONS | không |
| 4 | Game-specific data | SRC-DAMAGE-GEN-RULES | không |
| 4 | Game-specific data | SRC-NATUREDEX-STATIC | không |
| 6 | Encounters and locations | SCHEMA-ENCOUNTER-STRING-FK | có |
| 7 | Missing or broken images | API-IMAGE-SAMPLE-MISSING | có |
| 8 | Walkthrough completeness | SRC-WALKTHROUGH-COVERAGE | có |
| 9 | Other data quality work | SCHEMA-EVOLUTION-NO-CONDITION | có |
| 9 | Other data quality work | SCHEMA-MODEL-MISSING-NATURE | có |
| 9 | Other data quality work | SCHEMA-MODEL-MISSING-REGION | có |
| 9 | Other data quality work | SCHEMA-MODEL-MISSING-TYPEEFFECTIVENESS | có |
| 9 | Other data quality work | SCHEMA-VARIETY-NO-GIGANTAMAX | có |

## 8. Giới hạn

- Schema models: 15; source files: 8.
- Chưa browser smoke test, chưa chạy migration/sync/seed, chưa ghi vào bất kỳ database nào.