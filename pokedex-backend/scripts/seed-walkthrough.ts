import { PrismaClient } from '@prisma/client';
import { EMERALD_CHAPTERS, ENGLISH_EMERALD_CHAPTERS } from './data/walkthrough-emerald.js';
import { FIRERED_CHAPTERS, ENGLISH_FIRERED_CHAPTERS } from './data/walkthrough-firered.js';
import { LEAFGREEN_CHAPTERS, ENGLISH_LEAFGREEN_CHAPTERS } from './data/walkthrough-leafgreen.js';
import { RED_CHAPTERS, ENGLISH_RED_CHAPTERS } from './data/walkthrough-red.js';
import { BLUE_CHAPTERS, ENGLISH_BLUE_CHAPTERS } from './data/walkthrough-blue.js';
import { YELLOW_CHAPTERS, ENGLISH_YELLOW_CHAPTERS } from './data/walkthrough-yellow.js';
import { GOLD_CHAPTERS, ENGLISH_GOLD_CHAPTERS } from './data/walkthrough-gold.js';
import { SILVER_CHAPTERS, ENGLISH_SILVER_CHAPTERS } from './data/walkthrough-silver.js';
import { CRYSTAL_CHAPTERS, ENGLISH_CRYSTAL_CHAPTERS } from './data/walkthrough-crystal.js';
import { RUBY_CHAPTERS, ENGLISH_RUBY_CHAPTERS } from './data/walkthrough-ruby.js';
import { SAPPHIRE_CHAPTERS, ENGLISH_SAPPHIRE_CHAPTERS } from './data/walkthrough-sapphire.js';
import { DIAMOND_CHAPTERS, ENGLISH_DIAMOND_CHAPTERS } from './data/walkthrough-diamond.js';
import { PEARL_CHAPTERS, ENGLISH_PEARL_CHAPTERS } from './data/walkthrough-pearl.js';
import { PLATINUM_CHAPTERS, ENGLISH_PLATINUM_CHAPTERS } from './data/walkthrough-platinum.js';
import { HEARTGOLD_CHAPTERS, ENGLISH_HEARTGOLD_CHAPTERS } from './data/walkthrough-heartgold.js';
import { SOULSILVER_CHAPTERS, ENGLISH_SOULSILVER_CHAPTERS } from './data/walkthrough-soulsilver.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu nạp dữ liệu Walkthrough từ các file dữ liệu riêng biệt...');

  // Xóa dữ liệu cũ nếu có
  await prisma.walkthrough.deleteMany({
    where: { gameVersion: { in: ['emerald', 'firered', 'leafgreen', 'red', 'blue', 'yellow', 'gold', 'silver', 'crystal', 'ruby', 'sapphire', 'diamond', 'pearl', 'platinum', 'heartgold', 'soulsilver'] } }
  });

  console.log('🧹 Đã dọn dẹp các bản ghi cũ của Emerald, FireRed, LeafGreen, Red, Blue, Yellow, Gold, Silver, Crystal, Ruby, Sapphire, Diamond, Pearl, Platinum, HeartGold và SoulSilver.');

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

  // Nạp Blue Tiếng Việt
  for (const chapter of BLUE_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Blue VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Blue Tiếng Anh
  for (const chapter of ENGLISH_BLUE_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Blue EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Yellow Tiếng Việt
  for (const chapter of YELLOW_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Yellow VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Yellow Tiếng Anh
  for (const chapter of ENGLISH_YELLOW_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Yellow EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Gold Tiếng Việt
  for (const chapter of GOLD_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Gold VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Gold Tiếng Anh
  for (const chapter of ENGLISH_GOLD_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Gold EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Silver Tiếng Việt
  for (const chapter of SILVER_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Silver VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Silver Tiếng Anh
  for (const chapter of ENGLISH_SILVER_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Silver EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Crystal Tiếng Việt
  for (const chapter of CRYSTAL_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Crystal VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Crystal Tiếng Anh
  for (const chapter of ENGLISH_CRYSTAL_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Crystal EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Ruby Tiếng Việt
  for (const chapter of RUBY_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Ruby VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Ruby Tiếng Anh
  for (const chapter of ENGLISH_RUBY_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Ruby EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Sapphire Tiếng Việt
  for (const chapter of SAPPHIRE_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Sapphire VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Sapphire Tiếng Anh
  for (const chapter of ENGLISH_SAPPHIRE_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Sapphire EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Diamond Tiếng Việt
  for (const chapter of DIAMOND_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Diamond VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Diamond Tiếng Anh
  for (const chapter of ENGLISH_DIAMOND_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Diamond EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Pearl Tiếng Việt
  for (const chapter of PEARL_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Pearl VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Pearl Tiếng Anh
  for (const chapter of ENGLISH_PEARL_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Pearl EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Platinum Tiếng Việt
  for (const chapter of PLATINUM_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Platinum VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Platinum Tiếng Anh
  for (const chapter of ENGLISH_PLATINUM_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Platinum EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp HeartGold Tiếng Việt
  for (const chapter of HEARTGOLD_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [HeartGold VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp HeartGold Tiếng Anh
  for (const chapter of ENGLISH_HEARTGOLD_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [HeartGold EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp SoulSilver Tiếng Việt
  for (const chapter of SOULSILVER_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [SoulSilver VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp SoulSilver Tiếng Anh
  for (const chapter of ENGLISH_SOULSILVER_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [SoulSilver EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
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
