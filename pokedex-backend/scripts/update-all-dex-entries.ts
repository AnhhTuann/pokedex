import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting quick-update for isDefault and DexEntry of all 1025 Pokemon...");
  const pokemons = await prisma.pokemon.findMany({
    select: { id: true, pokedexNumber: true, name: true },
    orderBy: { pokedexNumber: "asc" }
  });
  console.log(`Found ${pokemons.length} Pokemon records in local database.`);

  const chunkSize = 40;
  for (let i = 0; i < pokemons.length; i += chunkSize) {
    const chunk = pokemons.slice(i, i + chunkSize);
    console.log(`Processing chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(pokemons.length / chunkSize)} (IDs: ${chunk[0].pokedexNumber} - ${chunk[chunk.length - 1].pokedexNumber})...`);
    
    await Promise.all(chunk.map(async (p) => {
      try {
        const [pokemonRes, speciesRes] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${p.pokedexNumber}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${p.pokedexNumber}`)
        ]);

        if (!pokemonRes.ok || !speciesRes.ok) {
          console.error(`Failed to fetch PokeAPI for #${p.pokedexNumber} (${p.name})`);
          return;
        }

        const pokemonData = await pokemonRes.json();
        const speciesData = await speciesRes.json();

        const isDefault = pokemonData.is_default ?? true;
        const pokedexNumbers = speciesData.pokedex_numbers || [];
        const dexEntriesData = pokedexNumbers
          .filter((pn: any) => pn.pokedex?.name !== 'national')
          .map((pn: any) => ({
            regionName: pn.pokedex.name,
            entryNumber: pn.entry_number
          }));

        await prisma.$transaction([
          prisma.dexEntry.deleteMany({
            where: { pokemonId: p.id }
          }),
          prisma.pokemon.update({
            where: { id: p.id },
            data: {
              isDefault,
              dexEntries: {
                create: dexEntriesData
              }
            }
          })
        ]);
      } catch (err) {
        console.error(`Error updating #${p.pokedexNumber} (${p.name}):`, err);
      }
    }));
  }

  console.log("All DexEntry and isDefault fields updated successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
