import { updaterService } from './src/services/updater.service.js';
import { prisma } from './src/db/prisma.js';

async function main() {
  const localCount = await prisma.pokemon.count();
  const apiCount = 1025;
  console.log(`Resuming Pokemon sync from ${localCount} to ${apiCount}`);
  for (let id = localCount + 1; id <= apiCount; id++) {
    await updaterService.syncPokemon(id);
    console.log(`Synced Pokemon ${id}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
