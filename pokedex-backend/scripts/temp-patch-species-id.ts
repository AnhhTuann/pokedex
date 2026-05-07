import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting fast patch of speciesId for existing Pokemon...");
  const pokemons = await prisma.pokemon.findMany({
    select: { id: true, pokedexNumber: true, name: true }
  });
  console.log(`Found ${pokemons.length} Pokemon records to patch.`);

  let count = 0;
  for (const p of pokemons) {
    await prisma.pokemon.update({
      where: { id: p.id },
      data: {
        speciesId: p.pokedexNumber
      }
    });
    count++;
  }

  console.log(`Successfully patched speciesId for ${count} Pokemon!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
