import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
p.pokemon.findFirst({ where: { name: 'bulbasaur' }, include: { types: true } })
  .then(d => console.log(d))
  .finally(() => p.$disconnect());
