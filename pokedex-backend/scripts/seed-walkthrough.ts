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
import { BLACK_CHAPTERS, ENGLISH_BLACK_CHAPTERS } from './data/walkthrough-black.js';
import { WHITE_CHAPTERS, ENGLISH_WHITE_CHAPTERS } from './data/walkthrough-white.js';
import { BLACK2_CHAPTERS, ENGLISH_BLACK2_CHAPTERS } from './data/walkthrough-black2.js';
import { WHITE2_CHAPTERS, ENGLISH_WHITE2_CHAPTERS } from './data/walkthrough-white2.js';
import { NEW_GAMES_VI_CHAPTERS, NEW_GAMES_EN_CHAPTERS } from './data/walkthrough-new-games.js';
import { X_CHAPTERS, ENGLISH_X_CHAPTERS } from './data/walkthrough-x.js';
import { Y_CHAPTERS, ENGLISH_Y_CHAPTERS } from './data/walkthrough-y.js';
import { OMEGA_RUBY_CHAPTERS } from './data/walkthrough-omega-ruby.js';
import { ALPHA_SAPPHIRE_CHAPTERS } from './data/walkthrough-alpha-sapphire.js';
import { SUN_CHAPTERS } from './data/walkthrough-sun.js';
import { MOON_CHAPTERS } from './data/walkthrough-moon.js';


const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu nạp dữ liệu Walkthrough từ các file dữ liệu riêng biệt...');

  // Xóa dữ liệu cũ nếu có
  await prisma.walkthrough.deleteMany({
    where: { gameVersion: { in: ['emerald', 'firered', 'leafgreen', 'red', 'blue', 'yellow', 'gold', 'silver', 'crystal', 'ruby', 'sapphire', 'diamond', 'pearl', 'platinum', 'heartgold', 'soulsilver', 'black', 'white', 'black2', 'black-2', 'white-2', 'lets-go-pikachu', 'lets-go-eevee', 'brilliant-diamond', 'shining-pearl', 'legends-arceus', 'legends-za', 'x', 'y', 'omega-ruby', 'alpha-sapphire', 'sun', 'moon'] } }
  });

  console.log('🧹 Đã dọn dẹp các bản ghi cũ của Emerald, FireRed, LeafGreen, Red, Blue, Yellow, Gold, Silver, Crystal, Ruby, Sapphire, Diamond, Pearl, Platinum, HeartGold, SoulSilver, Black, White, Black 2, White 2, Let\'s Go Pikachu/Eevee, BDSP, Legends: Arceus, Legends: Z-A và Pokémon X & Y.');

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

  // Nạp Black Tiếng Việt
  for (const chapter of BLACK_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Black VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Black Tiếng Anh
  for (const chapter of ENGLISH_BLACK_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Black EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp White Tiếng Việt
  for (const chapter of WHITE_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [White VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp White Tiếng Anh
  for (const chapter of ENGLISH_WHITE_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [White EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Black 2 Tiếng Việt
  for (const chapter of BLACK2_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Black 2 VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Black 2 Tiếng Anh
  for (const chapter of ENGLISH_BLACK2_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Black 2 EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp White 2 Tiếng Việt
  for (const chapter of WHITE2_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [White 2 VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp White 2 Tiếng Anh
  for (const chapter of ENGLISH_WHITE2_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [White 2 EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp các game mới Tiếng Việt
  for (const chapter of NEW_GAMES_VI_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [New Games VI] Đã nạp ${chapter.gameVersion}: ${chapter.chapterTitle}`);
  }

  // Nạp các game mới Tiếng Anh
  for (const chapter of NEW_GAMES_EN_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [New Games EN] Đã nạp ${chapter.gameVersion}: ${chapter.chapterTitle}`);
  }

  // Nạp Pokémon X Tiếng Việt
  for (const chapter of X_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Pokémon X VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Pokémon X Tiếng Anh
  for (const chapter of ENGLISH_X_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Pokémon X EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Pokémon Y Tiếng Việt
  for (const chapter of Y_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Pokémon Y VI] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Pokémon Y Tiếng Anh
  for (const chapter of ENGLISH_Y_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Pokémon Y EN] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Pokémon Omega Ruby
  for (const chapter of OMEGA_RUBY_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Omega Ruby] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Pokémon Alpha Sapphire
  for (const chapter of ALPHA_SAPPHIRE_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Alpha Sapphire] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Pokémon Sun
  for (const chapter of SUN_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Sun] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
  }

  // Nạp Pokémon Moon
  for (const chapter of MOON_CHAPTERS) {
    await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ [Moon] Đã nạp: ${chapter.chapterTitle} (Thứ tự: ${chapter.order})`);
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
