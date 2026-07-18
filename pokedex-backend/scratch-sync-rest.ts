import { updaterService } from './src/services/updater.service.js';
import { prisma } from './src/db/prisma.js';

async function main() {
  console.log("Checking updates for rest of the data...");
  const statuses = await updaterService.checkUpdates();
  for (const status of statuses) {
    if (status.type === 'item' && status.hasUpdate) {
      console.log(`Syncing items... (${status.localCount} -> ${status.apiCount})`);
      for (let id = status.localCount + 1; id <= status.apiCount; id++) {
        await updaterService.syncItem(id);
      }
    } else if (status.type === 'ability' && status.hasUpdate) {
      console.log(`Syncing abilities... (${status.localCount} -> ${status.apiCount})`);
      for (let id = status.localCount + 1; id <= status.apiCount; id++) {
        await updaterService.syncAbility(id);
      }
    }
  }
  console.log("Rest sync complete.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
