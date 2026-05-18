import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu nạp dữ liệu Walkthrough từ file JSON...');

  const seedsDir = path.join(__dirname, '../prisma/seeds');
  const jsonPath = path.join(seedsDir, 'walkthroughs.json');

  if (!fs.existsSync(jsonPath)) {
    console.error('❌ Không tìm thấy file walkthroughs.json tại', jsonPath);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(jsonPath, 'utf-8');
  const walkthroughs = JSON.parse(fileContent);

  console.log(`✅ Đã đọc được ${walkthroughs.length} bài hướng dẫn từ JSON.`);

  // Xóa dữ liệu cũ nếu có
  await prisma.walkthrough.deleteMany({});
  console.log('🧹 Đã dọn dẹp các bản ghi Walkthrough cũ trong database.');

  console.log('⏳ Đang chèn dữ liệu mới, vui lòng chờ...');
  
  // Dùng createMany để chèn cực nhanh
  const result = await prisma.walkthrough.createMany({
    data: walkthroughs,
    skipDuplicates: true
  });

  console.log(`🎉 Hoàn thành nạp dữ liệu rực rỡ! Đã chèn thành công ${result.count} bản ghi Walkthrough.`);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi nạp dữ liệu walkthrough:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
