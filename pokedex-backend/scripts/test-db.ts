import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("--- DB DIAGNOSTICS ---");
  const count = await prisma.pokemon.count();
  console.log(`Total Pokémon in DB: ${count}`);

  const p1 = await prisma.pokemon.findUnique({
    where: { pokedexNumber: 1 }
  });
  console.log(`Bulbasaur (#1) gameVersions:`, p1?.gameVersions);

  const emeraldCount = await prisma.pokemon.count({
    where: {
      gameVersions: {
        has: "emerald"
      }
    }
  });
  console.log(`Pokémon with 'emerald' version: ${emeraldCount}`);

  const anyGameVersionsCount = await prisma.pokemon.count({
    where: {
      gameVersions: {
        isEmpty: false
      }
    }
  });
  console.log(`Pokémon with non-empty gameVersions: ${anyGameVersionsCount}`);

  // Query sample Gen 3 Pokemon to check (Treecko #252)
  const treecko = await prisma.pokemon.findUnique({
    where: { pokedexNumber: 252 }
  });
  console.log(`Treecko (#252) detail:`, treecko ? { id: treecko.pokedexNumber, name: treecko.name, gameVersions: treecko.gameVersions } : "Not found");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
