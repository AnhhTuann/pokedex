import 'dotenv/config';
import { prisma } from '../src/db/prisma.js';

/**
 * Explicit operator-driven bootstrap: promotes ONE EXISTING account.
 * Usage: CONFIRM_ADMIN_GRANT=yes npm run admin:grant -- <username>
 * Never creates accounts and never grants privilege implicitly.
 */
async function main() {
  const username = process.argv[2]?.trim();
  if (!username) {
    throw new Error('Usage: CONFIRM_ADMIN_GRANT=yes npm run admin:grant -- <username>');
  }
  if (process.env.CONFIRM_ADMIN_GRANT !== 'yes') {
    throw new Error('Refusing to grant admin without CONFIRM_ADMIN_GRANT=yes');
  }

  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, username: true, role: true },
  });
  if (!user) {
    throw new Error(`User "${username}" does not exist. Create/sign up the account first.`);
  }
  if (user.role === 'ADMIN') {
    console.log(`User "${username}" is already an admin.`);
    return;
  }

  await prisma.user.update({ where: { id: user.id }, data: { role: 'ADMIN' } });
  console.log(`Granted ADMIN to existing user "${username}".`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
