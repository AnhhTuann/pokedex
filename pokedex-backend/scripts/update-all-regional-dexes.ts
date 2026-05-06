import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting quick-update for regionalDexes of all 1025 Pokemon...");
  const pokemons = await prisma.pokemon.findMany({
    select: { pokedexNumber: true, name: true },
    orderBy: { pokedexNumber: "asc" }
  });
  console.log(`Found ${pokemons.length} Pokemon records in local database.`);

  const chunkSize = 50;
  for (let i = 0; i < pokemons.length; i += chunkSize) {
    const chunk = pokemons.slice(i, i + chunkSize);
    console.log(`Processing chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(pokemons.length / chunkSize)} (IDs: ${chunk[0].pokedexNumber} - ${chunk[chunk.length - 1].pokedexNumber})...`);
    
    await Promise.all(chunk.map(async (p) => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${p.pokedexNumber}`);
        if (!res.ok) {
          console.error(`Failed to fetch PokeAPI species for #${p.pokedexNumber} (${p.name})`);
          return;
        }
        const data = await res.json();
        const pokedexNumbers = data.pokedex_numbers || [];
        const regionalDexes = pokedexNumbers
          .map((pn: any) => pn.pokedex.name)
          .filter((name: string) => name !== 'national');
        
        await prisma.pokemon.update({
          where: { pokedexNumber: p.pokedexNumber },
          data: { regionalDexes }
        });
      } catch (err) {
        console.error(`Error updating #${p.pokedexNumber} (${p.name}):`, err);
      }
    }));
  }

  console.log("All regional dexes updated successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
