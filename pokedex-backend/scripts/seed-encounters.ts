import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting Location Dex / Encounters Seeding Script...");

  try {
    // Get all Pokemon in the database
    const pokemons = await prisma.pokemon.findMany({
      select: { pokedexNumber: true, name: true },
      orderBy: { pokedexNumber: "asc" }
    });

    console.log(`🔍 Found ${pokemons.length} Pokémon in the database to fetch encounters for.`);

    // Clear existing encounters to prevent duplicates
    console.log("🧹 Clearing old encounters...");
    await prisma.encounter.deleteMany();
    console.log("✅ Encounters cleared.");

    const chunkSize = 25; // Concurrent requests
    let totalEncountersCreated = 0;
    let processedCount = 0;

    for (let i = 0; i < pokemons.length; i += chunkSize) {
      const chunk = pokemons.slice(i, i + chunkSize);
      console.log(`\n⏳ Fetching encounters for Pokémon chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(pokemons.length / chunkSize)}...`);

      const encountersToCreate: any[] = [];

      await Promise.all(
        chunk.map(async (pokemon) => {
          try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokedexNumber}/encounters`);
            if (!res.ok) {
              if (res.status === 404) {
                // Some forms might not have encounter URLs, skip silently
                return;
              }
              console.error(`❌ Failed to fetch encounters for #${pokemon.pokedexNumber} ${pokemon.name}`);
              return;
            }

            const data = await res.json();
            if (!Array.isArray(data)) return;

            for (const locArea of data) {
              const locationName = locArea.location_area.name;
              for (const vd of locArea.version_details) {
                const versionName = vd.version.name;
                for (const ed of vd.encounter_details) {
                  encountersToCreate.push({
                    pokemonId: pokemon.pokedexNumber,
                    locationName,
                    versionName,
                    method: ed.method.name,
                    minLevel: ed.min_level,
                    maxLevel: ed.max_level,
                    chance: ed.chance
                  });
                }
              }
            }
          } catch (err) {
            console.error(`⚠️ Error fetching for #${pokemon.pokedexNumber} ${pokemon.name}:`, err);
          }
        })
      );

      if (encountersToCreate.length > 0) {
        await prisma.encounter.createMany({
          data: encountersToCreate
        });
        totalEncountersCreated += encountersToCreate.length;
        processedCount += chunk.length;
        console.log(`📝 Created ${encountersToCreate.length} encounters in this chunk. Total so far: ${totalEncountersCreated}`);
      }
    }

    console.log(`\n🎉 Encounters seeding completed successfully! Total encounters seeded: ${totalEncountersCreated}`);
  } catch (error) {
    console.error("❌ Fatal error during encounters seeding:", error);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
