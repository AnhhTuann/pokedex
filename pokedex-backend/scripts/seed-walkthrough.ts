import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

interface WalkthroughSeed {
  gameVersion: string;
  chapterTitle: string;
  description: string | null;
  coverImage: string | null;
  content: string;
  order: number;
  language: string;
}

async function main() {
  console.log('🚀 Bắt đầu nạp dữ liệu Walkthrough từ file JSON...');

  const jsonPath = path.join(__dirname, '../prisma/seeds/walkthroughs.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Không tìm thấy file walkthroughs.json tại ${jsonPath}`);
  }

  const walkthroughs = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as WalkthroughSeed[];
  console.log(`✅ Đã đọc được ${walkthroughs.length} bài hướng dẫn từ JSON.`);

  let created = 0;
  let skipped = 0;

  // Idempotent by natural key. Existing rows (including user-edited CMS
  // content) are never deleted or overwritten.
  for (const seed of walkthroughs) {
    const existing = await prisma.walkthrough.findFirst({
      where: {
        gameVersion: seed.gameVersion,
        language: seed.language,
        order: seed.order,
        chapterTitle: seed.chapterTitle,
      },
      select: { id: true },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.walkthrough.create({ data: seed });
    created++;
  }

  console.log(
    `🎉 Hoàn tất: thêm ${created} chương mới, giữ nguyên ${skipped} chương đã tồn tại.`
  );
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi nạp dữ liệu walkthrough:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
