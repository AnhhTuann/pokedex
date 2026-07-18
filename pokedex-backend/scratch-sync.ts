import { updaterService } from './src/services/updater.service.js';
import { prisma } from './src/db/prisma.js';

async function main() {
  console.log("Starting WebP sync from scratch...");
  await updaterService.syncNewData();
  console.log("Sync finished.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
