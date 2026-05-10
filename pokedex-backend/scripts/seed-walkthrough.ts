import { PrismaClient } from '@prisma/client';
import { EMERALD_CHAPTERS, ENGLISH_EMERALD_CHAPTERS } from './data/walkthrough-emerald.js';
import { FIRERED_CHAPTERS, ENGLISH_FIRERED_CHAPTERS } from './data/walkthrough-firered.js';
import { LEAFGREEN_CHAPTERS, ENGLISH_LEAFGREEN_CHAPTERS } from './data/walkthrough-leafgreen.js';
import { RED_CHAPTERS, ENGLISH_RED_CHAPTERS } from './data/walkthrough-red.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu nạp dữ liệu Walkthrough từ các file dữ liệu riêng biệt...');

  // Xóa dữ liệu cũ nếu có
  await prisma.walkthrough.deleteMany({
    where: { gameVersion: { in: ['emerald', 'firered', 'leafgreen', 'red'] } }
  });

  console.log('🧹 Đã dọn dẹp các bản ghi cũ của Emerald, FireRed, LeafGreen và Red.');

  // Nạp Emerald Tiếng Việt
  for (const chapter of EMERALD_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Emerald VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Emerald Tiếng Anh
  for (const chapter of ENGLISH_EMERALD_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Emerald EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp FireRed Tiếng Việt
  for (const chapter of FIRERED_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [FireRed VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp FireRed Tiếng Anh
  for (const chapter of ENGLISH_FIRERED_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [FireRed EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp LeafGreen Tiếng Việt
  for (const chapter of LEAFGREEN_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [LeafGreen VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp LeafGreen Tiếng Anh
  for (const chapter of ENGLISH_LEAFGREEN_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [LeafGreen EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Red Tiếng Việt
  for (const chapter of RED_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Red VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Red Tiếng Anh
  for (const chapter of ENGLISH_RED_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Red EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  console.log('🎉 Hoàn thành nạp dữ liệu Walkthrough tách biệt thành công rực rỡ!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi nạp dữ liệu walkthrough:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
