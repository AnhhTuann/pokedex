import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Đổi số này thành 1025 nếu muốn cào TOÀN BỘ các Gen
const POKEMON_COUNT = 386;

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

const moveCache = new Map<string, any>();

async function getMoveDetails(name: string, url: string) {
  if (moveCache.has(name)) return moveCache.get(name);
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const details = {
      name: data.name,
      power: data.power,
      accuracy: data.accuracy,
      type: data.type.name,
      damageClass: data.damage_class?.name || "status"
    };
    moveCache.set(name, details);
    return details;
  } catch (err) {
    return null;
  }
}

function getValidVersionsForForm(pokemonName: string, baseSpeciesVersions: string[]): string[] {
  const nameLower = pokemonName.toLowerCase();
  
  if (nameLower.includes("-mega") || nameLower.includes("-primal")) {
    const validMegas = ['x', 'y', 'omega-ruby', 'alpha-sapphire', 'sun', 'moon', 'ultra-sun', 'ultra-moon'];
    return baseSpeciesVersions.filter(v => validMegas.includes(v.toLowerCase()));
  }
  
  if (nameLower.includes("-alola")) {
    const gen7Plus = [
      'sun', 'moon', 'ultra-sun', 'ultra-moon', 
      'lets-go-pikachu', 'lets-go-eevee', 
      'sword', 'shield', 
      'brilliant-diamond', 'shining-pearl', 
      'legends-arceus', 
      'scarlet', 'violet'
    ];
    return baseSpeciesVersions.filter(v => gen7Plus.includes(v.toLowerCase()));
  }
  
  if (nameLower.includes("-galar")) {
    const gen8Plus = [
      'sword', 'shield', 
      'brilliant-diamond', 'shining-pearl', 
      'legends-arceus', 
      'scarlet', 'violet'
    ];
    return baseSpeciesVersions.filter(v => gen8Plus.includes(v.toLowerCase()));
  }
  
  if (nameLower.includes("-gmax")) {
    return ['sword', 'shield'];
  }
  
  if (
    nameLower.includes("-cosplay") || 
    nameLower.includes("-rock-star") || 
    nameLower.includes("-belle") || 
    nameLower.includes("-pop-star") || 
    nameLower.includes("-phd") || 
    nameLower.includes("-libre")
  ) {
    return ['omega-ruby', 'alpha-sapphire'];
  }
  
  return baseSpeciesVersions;
}

async function main() {
  console.log(`Starting seeding ${POKEMON_COUNT} Pokemon...`);

  const idsToSeed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 252, 253, 254];
  for (const i of idsToSeed) {
    try {
      console.log(`Fetching Pokemon #${i}...`);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      if (!res.ok) continue;
      const data = await res.json();

      const isDefault = data.is_default ?? true;

      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
      let category: string | null = null;
      let description: string | null = null;
      let speciesData: any = null;
      let dexEntriesData: { regionName: string; entryNumber: number }[] = [];
      if (speciesRes.ok) {
        speciesData = await speciesRes.json();
        const genusObj = speciesData.genera?.find((g: any) => g.language?.name === "en");
        if (genusObj) {
          category = genusObj.genus;
        }

        const englishEntries = speciesData.flavor_text_entries?.filter((entry: any) => entry.language?.name === "en") || [];
        if (englishEntries.length > 0) {
          const rawText = englishEntries[englishEntries.length - 1].flavor_text;
          description = rawText
            .replace(/[\n\f\r\t]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        }

        const pokedexNumbers = speciesData.pokedex_numbers || [];
        dexEntriesData = pokedexNumbers
          .filter((pn: any) => pn.pokedex?.name !== 'national')
          .map((pn: any) => ({
            regionName: pn.pokedex.name,
            entryNumber: pn.entry_number
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
        'kanto': ['red', 'blue', 'yellow', 'firered', 'leafgreen', 'lets-go-pikachu', 'lets-go-eevee'],
        'original-johto': ['gold', 'silver', 'crystal'],
        'hoenn': ['ruby', 'sapphire', 'emerald', 'omega-ruby', 'alpha-sapphire'],
        'original-sinnoh': ['diamond', 'pearl'],
        'extended-sinnoh': ['platinum'],
        'updated-johto': ['heartgold', 'soulsilver'],
        'original-unova': ['black', 'white'],
        'updated-unova': ['black-2', 'white-2'],
        'kalos-central': ['x', 'y'],
        'kalos-coastal': ['x', 'y'],
        'kalos-mountain': ['x', 'y'],
        'original-alola': ['sun', 'moon'],
        'updated-alola': ['ultra-sun', 'ultra-moon'],
        'galar': ['sword', 'shield'],
        'paldea': ['scarlet', 'violet']
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
      data.game_indices.forEach((gi: any) => baseSpeciesVersionsSet.add(gi.version.name));
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
        const latestDetail = m.version_group_details[m.version_group_details.length - 1];
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
                  type: moveDetails.type,
                  damageClass: moveDetails.damageClass
                }
              }
            }
          });
        }
      }

      const gen = getGeneration(data.id);

      // Clean up old moves & encounters to allow clean re-seeding
      const existingP = await prisma.pokemon.findUnique({ where: { pokedexNumber: data.id } });
      if (existingP) {
        await prisma.pokemonMove.deleteMany({ where: { pokemonId: data.id } });
        await prisma.encounter.deleteMany({ where: { pokemonId: data.id } });
      }

      // Fetch Encounters (Locations)
      console.log(`Fetching Encounters for Pokemon #${data.id}...`);
      const encountersRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`);
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
                versionName: verName
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

      const availableInGames = getValidVersionsForForm(data.name, gameVersions);

      await prisma.pokemon.upsert({
        where: { pokedexNumber: data.id },
        update: {
          generation: gen,
          gameVersions: gameVersions,
          isDefault: isDefault,
          dexEntries: {
            deleteMany: {},
            create: dexEntriesData
          },
          moves: { create: movesData },
          encounters: { create: encountersData },
          category: category,
          description: description,
          speciesId: speciesId,
          availableInGames: availableInGames
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
            create: dexEntriesData
          },
          moves: { create: movesData },
          encounters: { create: encountersData },
          category: category,
          description: description,
          speciesId: speciesId,
          availableInGames: availableInGames
        },
      });

      // Seed Varieties (Mega & Alternative Forms)
      if (speciesData && speciesData.varieties) {
        // Clean up old varieties for this pokemon to allow clean re-seeding
        await prisma.pokemonVariety.deleteMany({ where: { pokemonId: data.id } });

        const nonDefault = speciesData.varieties.filter((v: any) => !v.is_default);
        for (const v of nonDefault) {
          try {
            const detailRes = await fetch(v.pokemon.url);
            if (!detailRes.ok) continue;
            const d = await detailRes.json();

            const isMega = v.pokemon.name.includes("-mega");
            const isAlternative = !isMega;

            let parts = d.name.split('-');
            let base = parts[0];
            let form = parts.slice(1).join(' ');
            base = base.charAt(0).toUpperCase() + base.slice(1);

            let formattedName = d.name;
            if (form === 'alola') formattedName = `Alolan ${base}`;
            else if (form === 'galar') formattedName = `Galarian ${base}`;
            else if (form === 'hisui') formattedName = `Hisuian ${base}`;
            else if (form === 'paldea') formattedName = `Paldean ${base}`;
            else if (form === 'gmax') formattedName = `Gigantamax ${base}`;
            else if (form === 'mega') formattedName = `Mega ${base}`;
            else if (form === 'mega-x') formattedName = `Mega ${base} X`;
            else if (form === 'mega-y') formattedName = `Mega ${base} Y`;
            else {
              formattedName = parts.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
            }

            const typesList = d.types.map((t: any) => t.type.name);

            const varietyAvailableGames = getValidVersionsForForm(d.name, gameVersions);

            let varietyCategory = "Species Form";
            const genusObj = speciesData.genera?.find((g: any) => g.language?.name === "en");
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
                availableInGames: varietyAvailableGames,
                imageUrl: d.sprites?.other?.["official-artwork"]?.front_default || d.sprites?.front_default || null,
                shinyImageUrl: d.sprites?.other?.["official-artwork"]?.front_shiny || d.sprites?.front_shiny || null,
                hp: d.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 50,
                attack: d.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 50,
                defense: d.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 50,
                specialAttack: d.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 50,
                specialDefense: d.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 50,
                speed: d.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 50,
              },
              create: {
                pokedexNumber: d.id,
                speciesId: data.id,
                generation: gen,
                name: d.name,
                height: d.height,
                weight: d.weight,
                baseExperience: d.base_experience,
                imageUrl: d.sprites?.other?.["official-artwork"]?.front_default || d.sprites?.front_default || null,
                shinyImageUrl: d.sprites?.other?.["official-artwork"]?.front_shiny || d.sprites?.front_shiny || null,
                hp: d.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 50,
                attack: d.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 50,
                defense: d.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 50,
                specialAttack: d.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 50,
                specialDefense: d.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 50,
                speed: d.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 50,
                types: {
                  connectOrCreate: d.types.map((t: any) => ({
                    where: { name: t.type.name },
                    create: { name: t.type.name }
                  }))
                },
                isDefault: false,
                category: varietyCategory,
                description: `An alternative form of ${data.name}.`,
                availableInGames: varietyAvailableGames
              }
            });

            // 2. Also keep PokemonVariety seeded for existing detail-page references
            await prisma.pokemonVariety.upsert({
              where: { id: d.id },
              update: {
                name: d.name,
                imageUrl: d.sprites?.other?.["official-artwork"]?.front_default || d.sprites?.front_default || null,
                shinyImageUrl: d.sprites?.other?.["official-artwork"]?.front_shiny || d.sprites?.front_shiny || null,
                isMega,
                isAlternative,
                types: typesList
              },
              create: {
                id: d.id,
                pokemonId: data.id,
                name: d.name,
                imageUrl: d.sprites?.other?.["official-artwork"]?.front_default || d.sprites?.front_default || null,
                shinyImageUrl: d.sprites?.other?.["official-artwork"]?.front_shiny || d.sprites?.front_shiny || null,
                isMega,
                isAlternative,
                types: typesList
              }
            });
          } catch (varError) {
            console.error(`Error seeding variety ${v.pokemon.name} for Pokemon #${data.id}:`, varError);
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
