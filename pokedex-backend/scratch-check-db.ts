import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const duplicateName = "ekans";
  const pokemon = await prisma.pokemon.findMany({
    where: {
      name: {
        equals: duplicateName,
        mode: "insensitive"
      }
    }
  });
  console.log("Found conflicting pokemons for name:", duplicateName, pokemon);

  const allCount = await prisma.pokemon.count();
  console.log("Total pokemons in DB:", allCount);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
