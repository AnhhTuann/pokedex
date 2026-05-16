import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Đổi số này thành 1025 nếu muốn cào TOÀN BỘ các Gen
const POKEMON_COUNT = 1025;

// Tự động phân loại Thế hệ dựa vào Pokédex ID
const getGeneration = (id: number): number => {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 905) return 8;
  return 9;
};

const convertGenNameToNum = (genName: string): number => {
  const match = genName.match(/generation-([a-z]+)/);
  if (!match) return 1;
  const roman = match[1];
  const map: Record<string, number> = {
    i: 1,
    ii: 2,
    iii: 3,
    iv: 4,
    v: 5,
    vi: 6,
    vii: 7,
    viii: 8,
    ix: 9,
    x: 10,
  };
  return map[roman] || 1;
};

const moveCache = new Map<string, any>();

async function getMoveDetails(name: string, url: string) {
  if (moveCache.has(name)) return moveCache.get(name);
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();

    let description = "";
    if (data.flavor_text_entries) {
      const englishEntry = data.flavor_text_entries.find(
        (entry: any) => entry.language?.name === "en",
      );
      if (englishEntry) {
        description = englishEntry.flavor_text
          .replace(/[\n\f\r\t]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }
    }

    let effect = "";
    if (data.effect_entries) {
      const englishEffect = data.effect_entries.find(
        (entry: any) => entry.language?.name === "en",
      );
      if (englishEffect) {
        effect = (englishEffect.short_effect || englishEffect.effect)
          .replace(/[\n\f\r\t]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }
    }

    const details = {
      name: data.name,
      power: data.power,
      accuracy: data.accuracy,
      pp: data.pp,
      generation: data.generation?.name
        ? convertGenNameToNum(data.generation.name)
        : null,
      description: description || null,
      effect: effect || null,
      type: data.type.name,
      damageClass: data.damage_class?.name || "status",
    };
    moveCache.set(name, details);
    return details;
  } catch (err) {
    return null;
  }
}

function getValidVersionsForForm(
  pokemonName: string,
  baseSpeciesVersions: string[],
): string[] {
  const nameLower = pokemonName.toLowerCase();

  if (nameLower.includes("-mega") || nameLower.includes("-primal")) {
    const validMegas = [
      "x",
      "y",
      "omega-ruby",
      "alpha-sapphire",
      "sun",
      "moon",
      "ultra-sun",
      "ultra-moon",
      "legends-za",
    ];
    return baseSpeciesVersions.filter((v) =>
      validMegas.includes(v.toLowerCase()),
    );
  }

  if (nameLower.includes("-alola")) {
    const gen7Plus = [
      "sun",
      "moon",
      "ultra-sun",
      "ultra-moon",
      "lets-go-pikachu",
      "lets-go-eevee",
      "sword",
      "shield",
      "brilliant-diamond",
      "shining-pearl",
      "legends-arceus",
      "scarlet",
      "violet",
      "legends-za",
    ];
    return baseSpeciesVersions.filter((v) =>
      gen7Plus.includes(v.toLowerCase()),
    );
  }

  if (nameLower.includes("-galar") || nameLower.includes("-hisui")) {
    const gen8Plus = [
      "sword",
      "shield",
      "brilliant-diamond",
      "shining-pearl",
      "legends-arceus",
      "scarlet",
      "violet",
      "legends-za",
    ];
    return baseSpeciesVersions.filter((v) =>
      gen8Plus.includes(v.toLowerCase()),
    );
  }

  if (nameLower.includes("-gmax")) {
    return ["sword", "shield"];
  }

  if (
    nameLower.includes("-cosplay") ||
    nameLower.includes("-rock-star") ||
    nameLower.includes("-belle") ||
    nameLower.includes("-pop-star") ||
    nameLower.includes("-phd") ||
    nameLower.includes("-libre")
  ) {
    return ["omega-ruby", "alpha-sapphire"];
  }

  return baseSpeciesVersions;
}

async function main() {
  console.log(`Starting seeding ${POKEMON_COUNT} Pokemon...`);

  console.log("Cleaning up existing moves...");
  await prisma.pokemonMove.deleteMany({});
  await prisma.move.deleteMany({});

  // Tạo mảng tự động từ 1 đến POKEMON_COUNT và thêm các Pokemon vùng Z-A thuộc thế hệ khác
  const rawIds = [
    ...Array.from({ length: POKEMON_COUNT }, (_, index) => index + 1),
    152,
    153,
    154,
    158,
    159,
    160,
    167,
    168,
    172,
    173,
    179,
    180,
    181,
    196,
    197,
    199,
    208,
    212,
    214,
    225,
    228,
    229,
    246,
    247,
    248,
    280,
    281,
    282,
    302,
    303,
    304,
    305,
    306,
    307,
    308,
    309,
    310,
    315,
    318,
    319,
    322,
    323,
    333,
    334,
    353,
    354,
    359,
    361,
    362,
    371,
    372,
    373,
    374,
    375,
    376,
    406,
    407,
    427,
    428,
    443,
    444,
    445,
    447,
    448,
    449,
    450,
    459,
    460,
    470,
    471,
    475,
    478,
    498,
    499,
    500,
    504,
    505,
    511,
    512,
    513,
    514,
    515,
    516,
    529,
    530,
    531,
    543,
    544,
    545,
    551,
    552,
    553,
    559,
    560,
    568,
    569,
    582,
    583,
    584,
    587,
    602,
    603,
    604,
    607,
    608,
    609,
    618,
    650,
    651,
    652,
    653,
    654,
    655,
    656,
    657,
    658,
    659,
    660,
    661,
    662,
    663,
    664,
    665,
    666,
    667,
    668,
    669,
    670,
    671,
    672,
    673,
    674,
    675,
    676,
    677,
    678,
    679,
    680,
    681,
    682,
    683,
    684,
    685,
    686,
    687,
    688,
    689,
    690,
    691,
    692,
    693,
    694,
    695,
    696,
    697,
    698,
    699,
    700,
    701,
    702,
    703,
    704,
    705,
    706,
    707,
    708,
    709,
    710,
    711,
    712,
    713,
    714,
    715,
    716,
    717,
    718,
    719,
    780,
    870,
  ];
  const idsToSeed = Array.from(new Set(rawIds)).sort((a, b) => a - b);
  for (const i of idsToSeed) {
    try {
      console.log(`Fetching Pokemon #${i}...`);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      if (!res.ok) continue;
      const data = await res.json();

      const isDefault = data.is_default ?? true;

      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${i}`,
      );
      let category: string | null = null;
      let description: string | null = null;
      let speciesData: any = null;
      let dexEntriesData: { regionName: string; entryNumber: number }[] = [];
      if (speciesRes.ok) {
        speciesData = await speciesRes.json();
        const genusObj = speciesData.genera?.find(
          (g: any) => g.language?.name === "en",
        );
        if (genusObj) {
          category = genusObj.genus;
        }

        const englishEntries =
          speciesData.flavor_text_entries?.filter(
            (entry: any) => entry.language?.name === "en",
          ) || [];
        if (englishEntries.length > 0) {
          const rawText = englishEntries[englishEntries.length - 1].flavor_text;
          description = rawText
            .replace(/[\n\f\r\t]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        }

        const pokedexNumbers = speciesData.pokedex_numbers || [];
        dexEntriesData = pokedexNumbers
          .filter((pn: any) => pn.pokedex?.name !== "national")
          .map((pn: any) => ({
            regionName: pn.pokedex.name,
            entryNumber: pn.entry_number,
          }));
      }

      const types = data.types.map((t: any) => ({
        where: { name: t.type.name },
        create: { name: t.type.name },
      }));

      const abilities = data.abilities.map((a: any) => ({
        where: { name: a.ability.name },
        create: { name: a.ability.name },
      }));

      const DEX_TO_GAMES: Record<string, string[]> = {
        kanto: [
          "red",
          "blue",
          "yellow",
          "firered",
          "leafgreen",
          "lets-go-pikachu",
          "lets-go-eevee",
        ],
        "original-johto": ["gold", "silver", "crystal"],
        hoenn: ["ruby", "sapphire", "emerald", "omega-ruby", "alpha-sapphire"],
        "original-sinnoh": ["diamond", "pearl"],
        "extended-sinnoh": ["platinum"],
        "updated-johto": ["heartgold", "soulsilver"],
        "original-unova": ["black", "white"],
        "updated-unova": ["black-2", "white-2"],
        "kalos-central": ["x", "y", "legends-za"],
        "kalos-coastal": ["x", "y", "legends-za"],
        "kalos-mountain": ["x", "y", "legends-za"],
        "original-alola": ["sun", "moon"],
        "updated-alola": ["ultra-sun", "ultra-moon"],
        galar: ["sword", "shield"],
        paldea: ["scarlet", "violet"],
      };

      const baseSpeciesVersionsSet = new Set<string>();
      const pokedexNumbers = speciesData?.pokedex_numbers || [];
      for (const pn of pokedexNumbers) {
        const dexName = pn.pokedex?.name;
        const games = DEX_TO_GAMES[dexName];
        if (games) {
          games.forEach((g: string) => baseSpeciesVersionsSet.add(g));
        }
      }
      data.game_indices.forEach((gi: any) =>
        baseSpeciesVersionsSet.add(gi.version.name),
      );
      const gameVersions = Array.from(baseSpeciesVersionsSet);

      const stats = data.stats.reduce((acc: any, s: any) => {
        const statName = s.stat.name;
        if (statName === "hp") acc.hp = s.base_stat;
        if (statName === "attack") acc.attack = s.base_stat;
        if (statName === "defense") acc.defense = s.base_stat;
        if (statName === "special-attack") acc.specialAttack = s.base_stat;
        if (statName === "special-defense") acc.specialDefense = s.base_stat;
        if (statName === "speed") acc.speed = s.base_stat;
        return acc;
      }, {});

      // Extract and fetch moves
      const movesData = [];
      for (const m of data.moves) {
        const latestDetail =
          m.version_group_details[m.version_group_details.length - 1];
        if (!latestDetail) continue;

        const moveDetails = await getMoveDetails(m.move.name, m.move.url);
        if (moveDetails) {
          movesData.push({
            learnMethod: latestDetail.move_learn_method.name,
            levelLearnedAt: latestDetail.level_learned_at,
            move: {
              connectOrCreate: {
                where: { name: moveDetails.name },
                create: {
                  name: moveDetails.name,
                  power: moveDetails.power,
                  accuracy: moveDetails.accuracy,
                  pp: moveDetails.pp,
                  generation: moveDetails.generation,
                  description: moveDetails.description,
                  effect: moveDetails.effect,
                  type: moveDetails.type,
                  damageClass: moveDetails.damageClass,
                },
              },
            },
          });
        }
      }

      const gen = getGeneration(data.id);

      // Clean up old moves & encounters to allow clean re-seeding
      const existingP = await prisma.pokemon.findUnique({
        where: { pokedexNumber: data.id },
      });
      if (existingP) {
        await prisma.pokemonMove.deleteMany({ where: { pokemonId: data.id } });
        await prisma.encounter.deleteMany({ where: { pokemonId: data.id } });
      }

      // Fetch Encounters (Locations)
      console.log(`Fetching Encounters for Pokemon #${data.id}...`);
      const encountersRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`,
      );
      const encountersData: any[] = [];
      if (encountersRes.ok) {
        try {
          const encs = await encountersRes.json();
          for (const item of encs) {
            const locName = item.location_area.name;
            for (const vd of item.version_details) {
              const verName = vd.version.name;
              encountersData.push({
                locationName: locName,
                versionName: verName,
              });
            }
          }
        } catch (err) {
          console.error("Error parsing encounters JSON:", err);
        }
      }

      // Extract speciesId from species.url (e.g. "https://pokeapi.co/api/v2/pokemon-species/6/" -> 6)
      let speciesId: number | null = null;
      if (data.species && data.species.url) {
        const parts = data.species.url.split("/").filter(Boolean);
        speciesId = parseInt(parts[parts.length - 1], 10);
      }

      const regionalDexesSet = new Set<string>();
      const pNumbers = speciesData?.pokedex_numbers || [];
      for (const pn of pNumbers) {
        const dexName = pn.pokedex?.name;
        if (dexName && dexName !== "national") {
          regionalDexesSet.add(dexName);
        }
      }
      const regionalDexes = Array.from(regionalDexesSet);

      await prisma.pokemon.upsert({
        where: { pokedexNumber: data.id },
        update: {
          generation: gen,
          gameVersions: gameVersions,
          isDefault: isDefault,
          dexEntries: {
            deleteMany: {},
            create: dexEntriesData,
          },
          moves: { create: movesData },
          encounters: { create: encountersData },
          category: category,
          description: description,
          speciesId: speciesId || data.id,
          regionalDexes: regionalDexes,
          altFormAvailableIn: [],
        },
        create: {
          pokedexNumber: data.id,
          generation: gen,
          name: data.name,
          height: data.height,
          weight: data.weight,
          baseExperience: data.base_experience,
          imageUrl:
            data.sprites?.other?.["official-artwork"]?.front_default || null,
          shinyImageUrl:
            data.sprites?.other?.["official-artwork"]?.front_shiny || null,
          hp: stats.hp,
          attack: stats.attack,
          defense: stats.defense,
          specialAttack: stats.specialAttack,
          specialDefense: stats.specialDefense,
          speed: stats.speed,
          types: { connectOrCreate: types },
          abilities: { connectOrCreate: abilities },
          gameVersions: gameVersions,
          isDefault: isDefault,
          dexEntries: {
            create: dexEntriesData,
          },
          moves: { create: movesData },
          encounters: { create: encountersData },
          category: category,
          description: description,
          speciesId: speciesId || data.id,
          regionalDexes: regionalDexes,
          altFormAvailableIn: [],
        },
      });

      // Seed Varieties (Mega & Alternative Forms)
      if (speciesData && speciesData.varieties) {
        // Clean up old varieties for this pokemon to allow clean re-seeding
        await prisma.pokemonVariety.deleteMany({
          where: { pokemonId: data.id },
        });

        const nonDefault = speciesData.varieties.filter(
          (v: any) => !v.is_default,
        );
        for (const v of nonDefault) {
          try {
            const detailRes = await fetch(v.pokemon.url);
            if (!detailRes.ok) continue;
            const d = await detailRes.json();

            const isMega = v.pokemon.name.includes("-mega");
            const isAlternative = !isMega;

            let parts = d.name.split("-");
            let base = parts[0];
            let form = parts.slice(1).join(" ");
            base = base.charAt(0).toUpperCase() + base.slice(1);

            let formattedName = d.name;
            if (form === "alola") formattedName = `Alolan ${base}`;
            else if (form === "galar") formattedName = `Galarian ${base}`;
            else if (form === "hisui") formattedName = `Hisuian ${base}`;
            else if (form === "paldea") formattedName = `Paldean ${base}`;
            else if (form === "gmax") formattedName = `Gigantamax ${base}`;
            else if (form === "mega") formattedName = `Mega ${base}`;
            else if (form === "mega-x") formattedName = `Mega ${base} X`;
            else if (form === "mega-y") formattedName = `Mega ${base} Y`;
            else {
              formattedName = parts
                .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1))
                .join(" ");
            }

            const typesList = d.types.map((t: any) => t.type.name);

            const varietyAvailableGames = getValidVersionsForForm(
              d.name,
              gameVersions,
            );

            let varietyCategory = "Species Form";
            const genusObj = speciesData.genera?.find(
              (g: any) => g.language?.name === "en",
            );
            if (genusObj) {
              varietyCategory = genusObj.genus;
            }

            // 1. Seed variety directly into Pokemon table for Homepage access
            await prisma.pokemon.upsert({
              where: { pokedexNumber: d.id },
              update: {
                generation: gen,
                isDefault: false,
                speciesId: data.id,
                category: varietyCategory,
                description: `An alternative form of ${data.name}.`,
                regionalDexes: regionalDexes,
                altFormAvailableIn: varietyAvailableGames,
                imageUrl:
                  d.sprites?.other?.["official-artwork"]?.front_default ||
                  d.sprites?.front_default ||
                  null,
                shinyImageUrl:
                  d.sprites?.other?.["official-artwork"]?.front_shiny ||
                  d.sprites?.front_shiny ||
                  null,
                hp:
                  d.stats.find((s: any) => s.stat.name === "hp")?.base_stat ||
                  50,
                attack:
                  d.stats.find((s: any) => s.stat.name === "attack")
                    ?.base_stat || 50,
                defense:
                  d.stats.find((s: any) => s.stat.name === "defense")
                    ?.base_stat || 50,
                specialAttack:
                  d.stats.find((s: any) => s.stat.name === "special-attack")
                    ?.base_stat || 50,
                specialDefense:
                  d.stats.find((s: any) => s.stat.name === "special-defense")
                    ?.base_stat || 50,
                speed:
                  d.stats.find((s: any) => s.stat.name === "speed")
                    ?.base_stat || 50,
              },
              create: {
                pokedexNumber: d.id,
                speciesId: data.id,
                generation: gen,
                name: d.name,
                height: d.height,
                weight: d.weight,
                baseExperience: d.base_experience,
                imageUrl:
                  d.sprites?.other?.["official-artwork"]?.front_default ||
                  d.sprites?.front_default ||
                  null,
                shinyImageUrl:
                  d.sprites?.other?.["official-artwork"]?.front_shiny ||
                  d.sprites?.front_shiny ||
                  null,
                hp:
                  d.stats.find((s: any) => s.stat.name === "hp")?.base_stat ||
                  50,
                attack:
                  d.stats.find((s: any) => s.stat.name === "attack")
                    ?.base_stat || 50,
                defense:
                  d.stats.find((s: any) => s.stat.name === "defense")
                    ?.base_stat || 50,
                specialAttack:
                  d.stats.find((s: any) => s.stat.name === "special-attack")
                    ?.base_stat || 50,
                specialDefense:
                  d.stats.find((s: any) => s.stat.name === "special-defense")
                    ?.base_stat || 50,
                speed:
                  d.stats.find((s: any) => s.stat.name === "speed")
                    ?.base_stat || 50,
                types: {
                  connectOrCreate: d.types.map((t: any) => ({
                    where: { name: t.type.name },
                    create: { name: t.type.name },
                  })),
                },
                isDefault: false,
                category: varietyCategory,
                description: `An alternative form of ${data.name}.`,
                regionalDexes: regionalDexes,
                altFormAvailableIn: varietyAvailableGames,
              },
            });

            // 2. Also keep PokemonVariety seeded for existing detail-page references
            await prisma.pokemonVariety.upsert({
              where: { id: d.id },
              update: {
                name: d.name,
                imageUrl:
                  d.sprites?.other?.["official-artwork"]?.front_default ||
                  d.sprites?.front_default ||
                  null,
                shinyImageUrl:
                  d.sprites?.other?.["official-artwork"]?.front_shiny ||
                  d.sprites?.front_shiny ||
                  null,
                isMega,
                isAlternative,
                types: typesList,
              },
              create: {
                id: d.id,
                pokemonId: data.id,
                name: d.name,
                imageUrl:
                  d.sprites?.other?.["official-artwork"]?.front_default ||
                  d.sprites?.front_default ||
                  null,
                shinyImageUrl:
                  d.sprites?.other?.["official-artwork"]?.front_shiny ||
                  d.sprites?.front_shiny ||
                  null,
                isMega,
                isAlternative,
                types: typesList,
              },
            });
          } catch (varError) {
            console.error(
              `Error seeding variety ${v.pokemon.name} for Pokemon #${data.id}:`,
              varError,
            );
          }
        }
      }
    } catch (error) {
      console.error(`Error seeding Pokemon #${i}:`, error);
    }
  }

  // Step 2: Seed Evolutions
  console.log("Seeding evolutions...");
  for (const i of idsToSeed) {
    try {
      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${i}`,
      );
      if (!speciesRes.ok) continue;
      const speciesData = await speciesRes.json();

      const chainUrl = speciesData.evolution_chain?.url;
      if (!chainUrl) continue;

      const chainRes = await fetch(chainUrl);
      if (!chainRes.ok) continue;
      const chainData = await chainRes.json();

      // Recursive function to parse chain
      const parseChain = async (node: any) => {
        const fromId = parseInt(
          node.species.url.split("/").filter(Boolean).pop()!,
        );

        for (const evolvesTo of node.evolves_to) {
          const toId = parseInt(
            evolvesTo.species.url.split("/").filter(Boolean).pop()!,
          );

          if (idsToSeed.includes(fromId) && idsToSeed.includes(toId)) {
            await prisma.evolution.upsert({
              where: {
                fromPokemonId_toPokemonId: {
                  fromPokemonId: fromId,
                  toPokemonId: toId,
                },
              },
              update: {},
              create: {
                fromPokemonId: fromId,
                toPokemonId: toId,
              },
            });
            console.log(`Evolves: ${fromId} -> ${toId}`);
          }

          await parseChain(evolvesTo);
        }
      };

      await parseChain(chainData.chain);
    } catch (error) {
      console.error(`Error seeding evolutions for #${i}:`, error);
    }
  }

  // Step 3: Mock User Team
  console.log("Seeding mock team...");
  const team = await prisma.team.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      userId: 1,
    },
  });

  // Add Pikachu, Bulbasaur, Charmander, Squirtle if not exists
  const mockTeamIds = [25, 1, 4, 7];
  for (let i = 0; i < mockTeamIds.length; i++) {
    await prisma.teamSlot.upsert({
      where: {
        teamId_slotOrder: { teamId: team.id, slotOrder: i + 1 },
      },
      update: { pokemonId: mockTeamIds[i] },
      create: { teamId: team.id, slotOrder: i + 1, pokemonId: mockTeamIds[i] },
    });
  }

  // Step 4: Seed custom Z-A Megas (Meganium, Emboar, Feraligatr)
  console.log("Seeding custom Z-A Mega varieties...");
  const customMegas = [
    {
      id: 10154,
      pokemonId: 154,
      name: "Meganium-Mega",
      types: ["grass", "fairy"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/154.png",
      shinySprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/154.png",
      category: "Mega Form",
      description:
        "Upon Mega Evolution, Meganium's flower petals release a powerful scent that calms fighting spirits and fills spectators with immense joy.",
      stats: {
        hp: 80,
        attack: 92,
        defense: 110,
        specialAttack: 118,
        specialDefense: 135,
        speed: 90,
      },
    },
    {
      id: 10500,
      pokemonId: 500,
      name: "Emboar-Mega",
      types: ["fire", "fighting"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500.png",
      shinySprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/500.png",
      category: "Mega Form",
      description:
        "Enwrapped in explosive columns of pure flame, Mega Emboar utilizes unmatched physical strength to deliver devastating blazes to any challenger.",
      stats: {
        hp: 110,
        attack: 158,
        defense: 75,
        specialAttack: 135,
        specialDefense: 75,
        speed: 75,
      },
    },
    {
      id: 10160,
      pokemonId: 160,
      name: "Feraligatr-Mega",
      types: ["water", "dark"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160.png",
      shinySprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/160.png",
      category: "Mega Form",
      description:
        "Harnessing the dark currents of underwater trenches, Mega Feraligatr tears through opponents with jaw power capable of crushing steel.",
      stats: {
        hp: 85,
        attack: 140,
        defense: 110,
        specialAttack: 89,
        specialDefense: 93,
        speed: 113,
      },
    },
  ];

  for (const m of customMegas) {
    // 1. Seed variety directly into Pokemon table
    await prisma.pokemon.upsert({
      where: { pokedexNumber: m.id },
      update: {
        isDefault: false,
        speciesId: m.pokemonId,
        generation: 6,
        name: m.name,
        category: m.category,
        description: m.description,
        regionalDexes: ["kalos-central"],
        altFormAvailableIn: ["legends-za"],
        imageUrl: m.sprite,
        shinyImageUrl: m.shinySprite,
        hp: m.stats.hp,
        attack: m.stats.attack,
        defense: m.stats.defense,
        specialAttack: m.stats.specialAttack,
        specialDefense: m.stats.specialDefense,
        speed: m.stats.speed,
        types: {
          set: [],
          connectOrCreate: m.types.map((t: string) => ({
            where: { name: t },
            create: { name: t },
          })),
        },
      },
      create: {
        pokedexNumber: m.id,
        speciesId: m.pokemonId,
        generation: 6,
        name: m.name,
        category: m.category,
        description: m.description,
        regionalDexes: ["kalos-central"],
        altFormAvailableIn: ["legends-za"],
        imageUrl: m.sprite,
        shinyImageUrl: m.shinySprite,
        hp: m.stats.hp,
        attack: m.stats.attack,
        defense: m.stats.defense,
        specialAttack: m.stats.specialAttack,
        specialDefense: m.stats.specialDefense,
        speed: m.stats.speed,
        types: {
          connectOrCreate: m.types.map((t: string) => ({
            where: { name: t },
            create: { name: t },
          })),
        },
      },
    });

    // 2. Seed into PokemonVariety relation table
    await prisma.pokemonVariety.upsert({
      where: { id: m.id },
      update: {
        name: m.name,
        imageUrl: m.sprite,
        shinyImageUrl: m.shinySprite,
        isMega: true,
        isAlternative: false,
        types: m.types,
      },
      create: {
        id: m.id,
        pokemonId: m.pokemonId,
        name: m.name,
        imageUrl: m.sprite,
        shinyImageUrl: m.shinySprite,
        isMega: true,
        isAlternative: false,
        types: m.types,
      },
    });
  }

  // Step 5: Seed custom DexEntry mappings for Legends: Z-A (kalos-central)
  console.log("Seeding custom Kalos Central Dex entries for Legends: Z-A...");
  const zaRegionalIndexes: Record<number, number> = {
    152: 1, // Chikorita
    153: 2, // Bayleef
    154: 3, // Meganium
    498: 4, // Tepig
    499: 5, // Pignite
    500: 6, // Emboar
    158: 7, // Totodile
    159: 8, // Croconaw
    160: 9, // Feraligatr
    1: 10, // Bulbasaur
    2: 11, // Ivysaur
    3: 12, // Venusaur
    4: 13, // Charmander
    5: 14, // Charmeleon
    6: 15, // Charizard
    7: 16, // Squirtle
    8: 17, // Wartortle
    9: 18, // Blastoise
    25: 19, // Pikachu
    26: 20, // Raichu
    658: 21, // Greninja
    718: 22, // Zygarde
  };

  for (const [pokedexNumStr, entryNumber] of Object.entries(
    zaRegionalIndexes,
  )) {
    const pokedexNumber = parseInt(pokedexNumStr, 10);
    const dbPoke = await prisma.pokemon.findUnique({
      where: { pokedexNumber },
    });

    if (dbPoke) {
      // Add 'legends-za' to gameVersions and 'kalos-central' to regionalDexes if not already present
      const updatedGameVersions = Array.from(
        new Set([...dbPoke.gameVersions, "legends-za"]),
      );
      const updatedRegionalDexes = Array.from(
        new Set([...dbPoke.regionalDexes, "kalos-central"]),
      );

      await prisma.pokemon.update({
        where: { id: dbPoke.id },
        data: {
          gameVersions: updatedGameVersions,
          regionalDexes: updatedRegionalDexes,
        },
      });

      // Upsert DexEntry
      await prisma.dexEntry.upsert({
        where: {
          pokemonId_regionName: {
            pokemonId: dbPoke.id,
            regionName: "kalos-central",
          },
        },
        update: {
          entryNumber: entryNumber,
        },
        create: {
          pokemonId: dbPoke.id,
          regionName: "kalos-central",
          entryNumber: entryNumber,
        },
      });
      console.log(
        `Mapped Z-A Dex Entry: #${entryNumber} for Pokemon #${pokedexNumber}`,
      );
    }
  }

  console.log("Seeding finished completely!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
