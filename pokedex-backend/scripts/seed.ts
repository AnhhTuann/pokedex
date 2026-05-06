import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const POKEMON_COUNT = 151; // Gen 1

async function main() {
  console.log(`Starting seeding ${POKEMON_COUNT} Pokemon...`);

  for (let i = 1; i <= POKEMON_COUNT; i++) {
    try {
      console.log(`Fetching Pokemon #${i}...`);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      if (!res.ok) {
        console.error(`Failed to fetch Pokemon #${i}`);
        continue;
      }
      const data = await res.json();

      // Extract types
      const types = data.types.map((t: any) => ({
        where: { name: t.type.name },
        create: { name: t.type.name },
      }));

      // Extract abilities
      const abilities = data.abilities.map((a: any) => ({
        where: { name: a.ability.name },
        create: { name: a.ability.name },
      }));

      // Extract stats
      const stats = data.stats.reduce((acc: any, s: any) => {
        const statName = s.stat.name;
        if (statName === 'hp') acc.hp = s.base_stat;
        if (statName === 'attack') acc.attack = s.base_stat;
        if (statName === 'defense') acc.defense = s.base_stat;
        if (statName === 'special-attack') acc.specialAttack = s.base_stat;
        if (statName === 'special-defense') acc.specialDefense = s.base_stat;
        if (statName === 'speed') acc.speed = s.base_stat;
        return acc;
      }, {});

      // Upsert Pokemon
      const pokemon = await prisma.pokemon.upsert({
        where: { pokedexNumber: data.id },
        update: {},
        create: {
          pokedexNumber: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          baseExperience: data.base_experience,
          imageUrl: data.sprites?.other?.['official-artwork']?.front_default || null,
          shinyImageUrl: data.sprites?.other?.['official-artwork']?.front_shiny || null,
          hp: stats.hp,
          attack: stats.attack,
          defense: stats.defense,
          specialAttack: stats.specialAttack,
          specialDefense: stats.specialDefense,
          speed: stats.speed,
          types: {
            connectOrCreate: types,
          },
          abilities: {
            connectOrCreate: abilities,
          },
        },
      });

      console.log(`✅ Seeded: ${pokemon.name}`);
    } catch (error) {
      console.error(`Error seeding Pokemon #${i}:`, error);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
