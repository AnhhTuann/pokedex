import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const walkthroughs = [
  // ===== EMERALD =====
  {
    gameVersion: 'emerald',
    language: 'vi',
    order: 1,
    chapterTitle: 'Chương 1: Khởi Hành — Littleroot Town',
    content: `<h2>Bắt Đầu Hành Trình tại Littleroot Town</h2>
<p>Bạn bắt đầu hành trình tại <strong>Littleroot Town</strong>, một thị trấn nhỏ bé ở vùng Hoenn. Sau khi ổn định chỗ ở, hãy ghé thăm <strong>Giáo sư Birch</strong> ở Route 101.</p>
<h3>Chọn Pokémon Đầu Tiên</h3>
<p>Khi Giáo sư Birch bị tấn công bởi một Pokémon hoang dã, bạn cần chọn 1 trong 3 Pokémon từ túi của ông:</p>
<table>
  <thead><tr><th>Pokémon</th><th>Hệ</th><th>Ưu điểm</th></tr></thead>
  <tbody>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/252.png"> Treecko</td><td>Grass</td><td>Tốc độ cao, thích hợp người chơi kinh nghiệm</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png"> Torchic</td><td>Fire</td><td>Sức tấn công cao, tiến hóa thành Fighting</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png"> Mudkip</td><td>Water</td><td>Máu nhiều, dễ chơi nhất cho người mới</td></tr>
  </tbody>
</table>
<blockquote><strong>Gợi ý:</strong> Mudkip là lựa chọn an toàn nhất do có khả năng phòng thủ tốt và type Water/Ground sau khi tiến hóa.</blockquote>
<h3>Nhiệm Vụ Tiếp Theo</h3>
<ul>
  <li>Giao Pokémon cho May/Brendan và nhận Pokédex từ Giáo sư Birch</li>
  <li>Nhận Running Shoes từ bố (Norman) tại nhà</li>
  <li>Tiến về Oldale Town và Route 103</li>
</ul>`
  },
  {
    gameVersion: 'emerald',
    language: 'vi',
    order: 2,
    chapterTitle: 'Chương 2: Gym Đầu Tiên — Rustboro City',
    content: `<h2>Gym Leader Roxanne — Rock Type</h2>
<p>Gym đầu tiên nằm tại <strong>Rustboro City</strong>. Gym Leader <strong>Roxanne</strong> sử dụng Pokémon hệ Rock.</p>
<h3>Đội hình của Roxanne</h3>
<table>
  <thead><tr><th>Pokémon</th><th>Level</th><th>Chiêu nguy hiểm</th></tr></thead>
  <tbody>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/074.png"> Geodude x2</td><td>14</td><td>Rock Tomb</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/076.png"> Nosepass</td><td>15</td><td>Rock Tomb, Harden</td></tr>
  </tbody>
</table>
<h3>Chiến Lược</h3>
<ul>
  <li>Nếu chọn Treecko: Dùng Mega Drain — hiệu quả gấp đôi với Rock/Ground</li>
  <li>Nếu chọn Torchic: Dùng Double Kick — Fighting type hiệu quả với Rock</li>
  <li>Nếu chọn Mudkip: Khó khăn hơn, cần bắt thêm Taillow hoặc Wingull</li>
</ul>
<blockquote>Phần thưởng: <strong>Stone Badge</strong> và TM39 Rock Tomb</blockquote>`
  },
  {
    gameVersion: 'emerald',
    language: 'vi',
    order: 3,
    chapterTitle: 'Chương 3: Gym Thứ Hai — Dewford Town',
    content: `<h2>Gym Leader Brawly — Fighting Type</h2>
<p>Để đến <strong>Dewford Town</strong>, bạn cần nhờ thuyền từ Mr. Briney tại Route 104 sau khi lấy Devon Parts từ Rusturf Tunnel.</p>
<h3>Đội hình của Brawly</h3>
<table>
  <thead><tr><th>Pokémon</th><th>Level</th><th>Đặc điểm</th></tr></thead>
  <tbody>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/296.png"> Machop</td><td>17</td><td>Karate Chop, Low Kick</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/302.png"> Meditite</td><td>18</td><td>Confusion, Detect — nguy hiểm vì có Psychic</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/306.png"> Makuhita</td><td>19</td><td>Arm Thrust, Vital Throw</td></tr>
  </tbody>
</table>
<h3>Chiến Lược</h3>
<ul>
  <li>Dùng Psychic, Flying hoặc Fairy type để counter Fighting</li>
  <li>Ralts ở Route 102 là lựa chọn tốt (Psychic type)</li>
  <li>Dustox hoặc Beautifly từ Petalburg Woods cũng hiệu quả</li>
</ul>
<blockquote>Phần thưởng: <strong>Knuckle Badge</strong> và TM08 Bulk Up</blockquote>`
  },

  // ===== FIRERED =====
  {
    gameVersion: 'firered',
    language: 'vi',
    order: 1,
    chapterTitle: 'Chương 1: Khởi Hành — Pallet Town',
    content: `<h2>Bắt Đầu tại Pallet Town</h2>
<p>Hành trình bắt đầu tại <strong>Pallet Town</strong>, Kanto. Giáo sư <strong>Oak</strong> sẽ giao cho bạn 1 trong 3 Pokémon starter.</p>
<h3>Starter Pokemon Kanto</h3>
<table>
  <thead><tr><th>Pokémon</th><th>Hệ</th><th>Khuyến nghị</th></tr></thead>
  <tbody>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/001.png"> Bulbasaur</td><td>Grass/Poison</td><td>Dễ nhất — mạnh với 2 gym đầu</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/004.png"> Charmander</td><td>Fire</td><td>Khó — 2 gym đầu yếu, nhưng Charizard rất mạnh</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/007.png"> Squirtle</td><td>Water</td><td>Cân bằng — tốt với gym 1 và gym 8</td></tr>
  </tbody>
</table>
<blockquote>Đây là bản remake của Pokemon Red/Blue trên GBA. Cốt truyện giống hệt bản gốc nhưng có thêm Sevii Islands sau game.</blockquote>
<h3>Bước Đầu</h3>
<ul>
  <li>Nhận Pokédex từ Giáo sư Oak</li>
  <li>Mua Poké Ball tại Viridian City Mart</li>
  <li>Tiến lên Route 1 để bắt Pokémon đầu tiên</li>
</ul>`
  },
  {
    gameVersion: 'firered',
    language: 'vi',
    order: 2,
    chapterTitle: 'Chương 2: Gym 1 — Pewter City (Brock)',
    content: `<h2>Gym Leader Brock — Rock Type</h2>
<p><strong>Brock</strong> là Gym Leader đầu tiên tại Pewter City, sử dụng Pokémon hệ Rock/Ground.</p>
<h3>Đội hình</h3>
<table>
  <thead><tr><th>Pokémon</th><th>Level</th><th>Move</th></tr></thead>
  <tbody>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/074.png"> Geodude</td><td>12</td><td>Defense Curl, Rock Tomb</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/095.png"> Onix</td><td>14</td><td>Rock Tomb, Bind</td></tr>
  </tbody>
</table>
<h3>Counter dễ nhất</h3>
<ul>
  <li><strong>Bulbasaur:</strong> Vine Whip — 4x damage với Ground</li>
  <li><strong>Mankey:</strong> Có thể bắt ở Route 22 — dùng Low Kick rất hiệu quả</li>
  <li><strong>Pikachu:</strong> Thundershock — không hiệu quả với Ground nhưng vẫn neutral với Onix</li>
</ul>
<blockquote>Phần thưởng: <strong>Boulder Badge</strong> + TM39 Rock Tomb. Sau khi có Boulder Badge, bạn có thể dùng HM05 Flash.</blockquote>`
  },

  // ===== PLATINUM =====
  {
    gameVersion: 'platinum',
    language: 'vi',
    order: 1,
    chapterTitle: 'Chương 1: Twinleaf Town — Chọn Starter',
    content: `<h2>Khởi Đầu tại Twinleaf Town, Sinnoh</h2>
    <p>Pokemon Platinum là bản nâng cấp của Diamond/Pearl, xây dựng cốt truyện xung quanh <strong>Giratina</strong> và Distortion World.</p>
<h3>Starter Sinnoh</h3>
<table>
  <thead><tr><th>Pokémon</th><th>Hệ</th><th>Tiến hóa cuối</th></tr></thead>
  <tbody>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/387.png"> Turtwig</td><td>Grass</td><td>Torterra (Grass/Ground) — Tank</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/390.png"> Chimchar</td><td>Fire</td><td>Infernape (Fire/Fighting) — Tốc độ & ATK cao</td></tr>
    <tr><td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/393.png"> Piplup</td><td>Water</td><td>Empoleon (Water/Steel) — Typing tuyệt vời</td></tr>
  </tbody>
</table>
<blockquote><strong>Gợi ý cho người mới:</strong> Piplup có typing Water/Steel khi tiến hóa thành Empoleon — cực kỳ mạnh về phòng thủ với chỉ 3 điểm yếu.</blockquote>
<h3>Sự Kiện Đặc Biệt</h3>
<ul>
  <li>Game bắt đầu với Barry vội vã chạy sang nhà bạn</li>
  <li>Trên Route 201, cả hai bị Starly tấn công — bắt đầu lấy starter từ túi của Giáo sư Rowan</li>
  <li>Sau khi về Sandgem Town, nhận Pokédex và lên đường</li>
</ul>`
  }
];

async function seedWalkthroughs() {
  console.log('🗺️  Seeding walkthrough data...');
  
  // Clear existing data
  await prisma.walkthrough.deleteMany({});
  console.log('   Cleared existing walkthroughs');

  let count = 0;
  for (const wt of walkthroughs) {
    await prisma.walkthrough.create({ data: wt });
    count++;
    console.log(`   ✅ Created: [${wt.gameVersion}] ${wt.chapterTitle}`);
  }

  console.log(`\n🎉 Done! Seeded ${count} walkthrough chapters.`);
  await prisma.$disconnect();
}

seedWalkthroughs().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
