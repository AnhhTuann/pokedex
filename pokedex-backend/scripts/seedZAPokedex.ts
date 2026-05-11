import { PrismaClient } from '@prisma/client';
import { lumioseDex, hyperspaceDex } from './zaPokedex.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Legends: Z-A Pokedex into PostgreSQL database...');
  
  // Clean existing Z-A data first to avoid overlapping or unique constraint errors
  console.log('Cleaning up existing PokemonZA records...');
  await prisma.pokemonZA.deleteMany({});
  
  let count = 0;
  
  // 1. Seed Lumiose Dex
  console.log('Seeding Lumiose Dex...');
  for (const pokemon of lumioseDex) {
    await prisma.pokemonZA.create({
      data: {
        id: pokemon.id,
        regionalId: pokemon.regionalId,
        name: pokemon.name,
        types: pokemon.types,
        isMega: pokemon.isMega,
        sprite: pokemon.sprite,
        shinySprite: pokemon.shinySprite,
        category: pokemon.category,
        description: pokemon.description,
        stats: pokemon.stats as any,
        abilities: pokemon.abilities,
        spriteUrl: pokemon.spriteUrl || null,
        dexType: 'lumiose'
      },
    });
    count++;
  }

  // 2. Seed Hyperspace Dex
  console.log('Seeding Hyperspace Dex...');
  for (const pokemon of hyperspaceDex) {
    await prisma.pokemonZA.create({
      data: {
        id: pokemon.id,
        regionalId: pokemon.regionalId,
        name: pokemon.name,
        types: pokemon.types,
        isMega: pokemon.isMega,
        sprite: pokemon.sprite,
        shinySprite: pokemon.shinySprite,
        category: pokemon.category,
        description: pokemon.description,
        stats: pokemon.stats as any,
        abilities: pokemon.abilities,
        spriteUrl: pokemon.spriteUrl || null,
        dexType: 'hyperspace'
      },
    });
    count++;
  }
  
  console.log(`Successfully seeded ${count} Legends: Z-A Pokémon into the database!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
