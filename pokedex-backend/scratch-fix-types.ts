import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixTypes() {
  console.log("Fetching types for all pokemon to fix DB...");
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
  const data = await res.json();
  const results = data.results;

  console.log(`Found ${results.length} pokemon. Fetching details...`);
  
  const batchSize = 50;
  for (let i = 0; i < results.length; i += batchSize) {
    const batch = results.slice(i, i + batchSize);
    await Promise.all(batch.map(async (p: any, index: number) => {
      try {
        const id = i + index + 1;
        const detailRes = await fetch(p.url);
        const detailData = await detailRes.json();
        
        const types = detailData.types.map((t: any) => ({
          where: { name: t.type.name },
          create: { name: t.type.name },
        }));

        await prisma.pokemon.update({
          where: { pokedexNumber: id },
          data: {
            types: {
              connectOrCreate: types
            }
          }
        });
      } catch (e) {
        // ignore errors for missing ones
      }
    }));
    console.log(`Processed ${i + batch.length} / ${results.length}`);
  }
  console.log("Finished fixing types!");
}

fixTypes().finally(() => prisma.$disconnect());
