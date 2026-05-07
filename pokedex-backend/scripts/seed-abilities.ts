import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to convert roman numerals to integers
function parseGeneration(genName: string): number | null {
  const match = genName.match(/generation-([ivxldcm]+)/i);
  if (!match) return null;
  const roman = match[1].toLowerCase();
  const map: Record<string, number> = {
    i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9
  };
  return map[roman] || null;
}

async function main() {
  console.log("Starting Ability Seeding Script...");
  
  // Find all abilities in the DB
  const abilities = await prisma.ability.findMany({
    orderBy: { id: "asc" }
  });
  
  console.log(`Found ${abilities.length} abilities in database to update.`);

  const chunkSize = 20; // Chunk size to limit rate limiting or parallel load
  for (let i = 0; i < abilities.length; i += chunkSize) {
    const chunk = abilities.slice(i, i + chunkSize);
    console.log(`Processing chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(abilities.length / chunkSize)}...`);

    await Promise.all(chunk.map(async (ability) => {
      // Form URL slug by converting to lowercase kebab-case
      const nameSlug = ability.name.toLowerCase().replace(/\s+/g, "-");
      const url = `https://pokeapi.co/api/v2/ability/${nameSlug}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Failed to fetch PokeAPI for ability "${ability.name}" (Slug: ${nameSlug})`);
          return;
        }

        const data = await response.json();

        // 1. Parse Generation
        const genNum = data.generation?.name ? parseGeneration(data.generation.name) : null;

        // 2. Parse English Game Description
        const flavorText = data.flavor_text_entries
          ?.find((entry: any) => entry.language?.name === "en")
          ?.flavor_text || null;

        // 3. Parse English Short & In-Depth Effects
        const englishEffect = data.effect_entries?.find((entry: any) => entry.language?.name === "en");
        const shortEffect = englishEffect?.short_effect || null;
        const effect = englishEffect?.effect || null;

        // 4. Update Prisma Database record
        await prisma.ability.update({
          where: { id: ability.id },
          data: {
            generation: genNum,
            flavorText,
            shortEffect,
            effect
          }
        });

        console.log(`Updated ability: "${ability.name}" (Gen: ${genNum})`);
      } catch (err) {
        console.error(`Error updating ability "${ability.name}":`, err);
      }
    }));
  }

  console.log("Ability Details seeding completed successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
