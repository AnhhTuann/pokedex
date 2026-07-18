import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const publicDir = path.join(process.cwd(), 'public');

async function checkImages() {
  const allPokemon = await prisma.pokemon.findMany({
    select: { name: true, imageUrl: true, shinyImageUrl: true }
  });

  let missingNormal = 0;
  let missingShiny = 0;
  let missingNormalNames: string[] = [];

  for (const p of allPokemon) {
    if (p.imageUrl) {
      const normalPath = path.join(publicDir, p.imageUrl);
      if (!fs.existsSync(normalPath)) {
        missingNormal++;
        missingNormalNames.push(p.name);
      }
    }
    if (p.shinyImageUrl) {
      const shinyPath = path.join(publicDir, p.shinyImageUrl);
      if (!fs.existsSync(shinyPath)) {
        missingShiny++;
      }
    }
  }

  console.log(`Missing Normal Images: ${missingNormal}`);
  console.log(`Missing Shiny Images: ${missingShiny}`);
  console.log(`Examples of missing normal: ${missingNormalNames.slice(0, 20).join(', ')}`);
}

checkImages().finally(() => prisma.$disconnect());
