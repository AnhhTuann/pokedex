import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
p.pokemon.findMany({ take: 5, select: { name: true, imageUrl: true } })
  .then(d => console.log(d))
  .finally(() => p.$disconnect());
