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
    
    // Convert to webp
    await sharp(buffer)
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    return true;
  } catch (err) {
    console.error(`Error downloading to ${outputPath}:`, err);
    return false;
  }
}

async function fixMissingImages() {
  console.log("Checking for missing images in DB...");
  const allPokemon = await prisma.pokemon.findMany({
    select: { name: true, imageUrl: true, shinyImageUrl: true }
  });

  const missingNormal = [];
  const missingShiny = [];

  for (const p of allPokemon) {
    if (p.imageUrl) {
      const normalPath = path.join(publicDir, p.imageUrl);
      if (!fs.existsSync(normalPath)) missingNormal.push({ name: p.name, path: normalPath });
    }
    if (p.shinyImageUrl) {
      const shinyPath = path.join(publicDir, p.shinyImageUrl);
      if (!fs.existsSync(shinyPath)) missingShiny.push({ name: p.name, path: shinyPath });
    }
  }

  console.log(`Found ${missingNormal.length} missing normal images and ${missingShiny.length} missing shiny images.`);

  // Combine unique names
  const missingNames = Array.from(new Set([...missingNormal.map(m => m.name), ...missingShiny.map(m => m.name)]));

  console.log(`Fetching from PokeAPI to download...`);
  
  let count = 0;
  for (const name of missingNames) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) {
        console.log(`Pokemon ${name} not found in PokeAPI.`);
        continue;
      }
      const data = await res.json();
      
      const normalUrl = data.sprites?.other?.["official-artwork"]?.front_default || data.sprites?.front_default;
      const shinyUrl = data.sprites?.other?.["official-artwork"]?.front_shiny || data.sprites?.front_shiny;

      const nTarget = missingNormal.find(m => m.name === name);
      if (nTarget && normalUrl) {
        fs.mkdirSync(path.dirname(nTarget.path), { recursive: true });
        await downloadImage(normalUrl, nTarget.path);
      }

      const sTarget = missingShiny.find(m => m.name === name);
      if (sTarget && shinyUrl) {
        fs.mkdirSync(path.dirname(sTarget.path), { recursive: true });
        await downloadImage(shinyUrl, sTarget.path);
      }
      count++;
      console.log(`Downloaded missing images for ${name} (${count}/${missingNames.length})`);
    } catch (e) {
      console.error(`Error processing ${name}:`, e);
    }
  }

  console.log("Finished downloading missing images.");
}

fixMissingImages().finally(() => prisma.$disconnect());
