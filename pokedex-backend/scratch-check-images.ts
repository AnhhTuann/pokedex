import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const pCount = await prisma.pokemon.count();
  console.log("Total Pokemon:", pCount);

  const iCount = await prisma.item.count();
  console.log("Total Items:", iCount);

  const aCount = await prisma.ability.count();
  console.log("Total Abilities:", aCount);
}

main().finally(() => prisma.$disconnect());
