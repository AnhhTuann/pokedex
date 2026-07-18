import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const prisma = new PrismaClient();
const publicDir = path.join(process.cwd(), 'public');

async function downloadImage(url: string, outputPath: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await sharp(buffer).webp({ quality: 80 }).toFile(outputPath);
    return true;
  } catch (err) {
    console.error(`Error downloading to ${outputPath}:`, err);
    return false;
  }
}

async function fixMissingImages() {
  console.log("Checking for missing images and fixing DB URLs...");
  const allPokemon = await prisma.pokemon.findMany({
    select: { id: true, name: true, imageUrl: true, shinyImageUrl: true, pokedexNumber: true }
  });

  let count = 0;
  for (const p of allPokemon) {
    const isUrlBroken = p.imageUrl?.startsWith('http') || p.shinyImageUrl?.startsWith('http');
    const expectedNormalLocal = `/images/pokemon/normal/${p.name.toLowerCase()}.webp`;
    const expectedShinyLocal = `/images/pokemon/shiny/${p.name.toLowerCase()}.webp`;
    
    const normalDiskPath = path.join(publicDir, expectedNormalLocal);
    const shinyDiskPath = path.join(publicDir, expectedShinyLocal);

    const missingNormal = !fs.existsSync(normalDiskPath);
    const missingShiny = !fs.existsSync(shinyDiskPath);

    if (isUrlBroken || missingNormal || missingShiny) {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name.toLowerCase()}`);
        let nUrl = null, sUrl = null;

        if (res.ok) {
          const data = await res.json();
          nUrl = data.sprites?.other?.["official-artwork"]?.front_default || data.sprites?.front_default;
          sUrl = data.sprites?.other?.["official-artwork"]?.front_shiny || data.sprites?.front_shiny;
        } else if (p.imageUrl?.startsWith('http')) {
          nUrl = p.imageUrl;
          sUrl = p.shinyImageUrl;
        }

        if (missingNormal && nUrl) {
          fs.mkdirSync(path.dirname(normalDiskPath), { recursive: true });
          await downloadImage(nUrl, normalDiskPath);
        }
        if (missingShiny && sUrl) {
          fs.mkdirSync(path.dirname(shinyDiskPath), { recursive: true });
          await downloadImage(sUrl, shinyDiskPath);
        }

        await prisma.pokemon.update({
          where: { id: p.id },
          data: {
            imageUrl: expectedNormalLocal,
            shinyImageUrl: expectedShinyLocal
          }
        });
        count++;
        if (count % 20 === 0) console.log(`Fixed ${count} pokemon...`);
      } catch (e) {
        console.error(`Error processing ${p.name}:`, e);
      }
    }
  }

  console.log(`Finished processing ${count} pokemon records.`);
}

fixMissingImages().finally(() => prisma.$disconnect());
