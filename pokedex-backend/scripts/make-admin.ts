import 'dotenv/config';
import { prisma } from '../src/db/prisma.js';

async function main() {
  const username = process.argv[2];
  if (!username) {
    console.error('Usage: npm run make-admin -- <username>');
    process.exit(1);
  }
  const user = await prisma.user.update({ where: { username }, data: { role: 'admin' } });
  console.log(`✅ ${user.username} is now an admin.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
