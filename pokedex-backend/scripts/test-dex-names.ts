import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pokemons = await prisma.pokemon.findMany({
    select: { regionalDexes: true }
  });

  const uniqueDexes = new Set<string>();
  for (const p of pokemons) {
    if (p.regionalDexes) {
      for (const d of p.regionalDexes) {
        uniqueDexes.add(d);
      }
    }
  }

  console.log("--- UNIQUE REGIONAL DEXES IN DATABASE ---");
  console.log(Array.from(uniqueDexes).sort());
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
