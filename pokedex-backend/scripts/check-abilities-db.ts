import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Checking seeded abilities in database...");
  const abilities = await prisma.ability.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
      generation: true,
      flavorText: true,
      shortEffect: true,
      effect: true,
    }
  });

  console.log(JSON.stringify(abilities, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
