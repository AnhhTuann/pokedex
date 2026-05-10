import * as fs from 'fs';
import * as path from 'path';

// Helper to construct absolute path
const getDataPath = (filename: string) => path.join(process.cwd(), 'scripts', 'data', filename);

// ==========================================
// DATA DEFINITIONS FOR GEN 3 KANTO (FireRed & LeafGreen)
// ==========================================

const getGen3KantoVI_Ch14 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Phần 14: Bí mật Pokémon Siêu Hiếm & Huyền Thoại",
    order: 14,
    language: "vi",
    content: \`
      <h1>Phần 14: Bí mật Pokémon Siêu Hiếm & Huyền Thoại</h1>
      <p>Sau khi khôi phục hệ thống mạng liên kết vùng Hoenn tại Sevii Islands, thế giới Pokémon rộng mở ra những bí ẩn cổ xưa nhất vùng Kanto.</p>

      <h2>1. Săn lùng Bộ Ba Chó Huyền Thoại Chạy Hoang</h2>
      <p>Sau khi chiến thắng Tứ Đại Thiên Vương và hoàn thành nhiệm vụ Ruby/Sapphire của Celio, một trong ba Thần Thú vùng Johto sẽ xuất hiện ngẫu nhiên hoang dã khắp Kanto ở Level 50. Con thú nào xuất hiện phụ thuộc hoàn toàn vào Pokémon khởi đầu của bạn:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(59, 130, 246, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: center; width: 100px;">Hình ảnh</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Yêu cầu Starter</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Chiến thuật săn bắt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png" alt="Raikou" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Raikou</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Squirtle</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cực kỳ nhanh. Hãy dùng kỹ năng chặn chạy trốn như <strong>Mean Look</strong> hoặc ném ngay quả <strong>Master Ball</strong> để thu phục lập tức!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png" alt="Entei" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Entei</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Bulbasaur</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sở hữu đòn gầm rú Roar có thể ép trận đấu kết thúc tức thì (Lỗi game khiến biến mất vĩnh viễn). Nên dùng <strong>Master Ball</strong> trước khi quăng bóng dã ngoại.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png" alt="Suicune" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #60a5fa;">Suicune</td>
            <td style="padding: 12px 16px;">Nước</td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Charmander</td>
            <td style="padding: 12px 16px;">Chống chịu tốt, di chuyển vừa phải. Sử dụng trạng thái ngủ hoặc đóng băng để tối ưu tỷ lệ bắt giữ.</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Mewtwo - Siêu Thú Tối Thượng tại Cerulean Cave <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" style="max-width:32px; vertical-align:middle;" /></h2>
      <p>Sau khi kết nối hoàn tất máy thời không của Celio, lối vào hang động <strong>Cerulean Cave</strong> (mạn bắc Cerulean City) sẽ chính thức mở cửa. Tại đáy sâu nhất của mê cung, bạn sẽ diện kiến <strong>Mewtwo (Level 70)</strong>.</p>
      <ul>
        <li><strong>Đội hình mang theo:</strong> Mang theo Pokémon hệ Bóng Tối (Dark) để miễn nhiễm đòn siêu linh nguy hiểm hoặc Pokémon có đòn ru ngủ ổn định.</li>
        <li><strong>Cách bắt tốt nhất:</strong> Mewtwo có khả năng tự phục hồi bằng đòn Recover cực kỳ khó chịu. Quả <strong>Master Ball</strong> là cứu cánh hoàn hảo nhất tại đây.</li>
      </ul>

      <h2>3. Khám Phá Bí Mật Khải Sinh Đảo: Deoxys & Sứ Mệnh Navel Rock</h2>
      <p>Sử dụng vé sự kiện đặc biệt để mở khóa các hải đảo bí ẩn nhất thế giới Sevii:</p>
      <ul>
        <li><strong>Birth Island (Đảo Khai Sinh - Deoxys) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/386.png" style="max-width:28px; vertical-align:middle;" />:</strong> Sử dụng Aurora Ticket để cập bến hòn đảo hình tam giác. Bạn phải giải câu đố đẩy khối tam giác màu đỏ theo số bước tối ưu nhất. Khi khối đá nổ tung, <strong>Deoxys (Level 30)</strong> sẽ xuất hiện! (Trong FireRed, nó sẽ mang Dạng Tấn công; trong LeafGreen mang Dạng Phòng thủ).</li>
        <li><strong>Navel Rock (Đá Rốn - Lugia & Ho-Oh):</strong> Sử dụng Mystic Ticket để đi đến ngọn tháp đá kỳ vĩ này. Ở đáy sâu thẳm ngập nước là nơi trú ngụ của <strong>Lugia (Level 70)</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png" style="max-width:28px; vertical-align:middle;" />, còn ở đỉnh tháp nhọn cao chọc trời là tổ phượng hoàng lửa <strong>Ho-Oh (Level 70)</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png" style="max-width:28px; vertical-align:middle;" />.</li>
      </ul>
    \`
  }`;

const getGen3KantoVI_Ch15 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Phần 15: Toàn tập Hậu game, Đấu trường & Vật phẩm Trấn phái",
    order: 15,
    language: "vi",
    content: \`
      <h1>Phần 15: Toàn tập Hậu game, Đấu trường & Vật phẩm Trấn phái</h1>
      <p>Hoàn thành cốt truyện chính chỉ là khởi đầu! Vùng Sevii Islands mở ra chuỗi nhiệm vụ hậu game đỉnh cao và những đấu trường thử thách thực lực tối thượng.</p>

      <h2>1. Chuỗi Nhiệm Vụ Sevii Islands (Đảo 4-7)</h2>
      <p>Sau khi chiến thắng Liên Minh, hãy nhận <strong>Rainbow Pass</strong> từ Celio để tiến sang các hòn đảo phía nam:</p>
      <ul>
        <li><strong>Four Island (Đảo Bốn):</strong> Ghé thăm hang động <strong>Icefall Cave</strong>, hợp tác cùng Lorelei đánh bại băng đảng Team Rocket đang bắt bớ Pokémon hoang dã dã man dã ngoại, nhận HM07 Waterfall.</li>
        <li><strong>Five Island (Đảo Năm):</strong> Khám phá đồng cỏ hoang Meadow, giải mã ổ khóa căn cứ ngầm <strong>Rocket Warehouse</strong> bằng mật mã kép thu thập được dọc đường để quét sạch tàn dư Rocket cứu thế giới. Đoạt lấy viên đá <strong>Sapphire</strong> mang về kích hoạt máy truyền tin đa vùng.</li>
        <li><strong>Seven Island (Đảo Bảy):</strong> Khám phá di tích cổ đại <strong>Tanoby Ruins</strong>, giải đố đẩy đá trong hang để mở khóa sự xuất hiện của 28 hình dạng chữ cổ thần bí <strong>Unown</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201.png" style="max-width:24px; vertical-align:middle;" /> dã ngoại.</li>
      </ul>

      <h2>2. Đấu Trường Đỉnh Cao Trainer Tower</h2>
      <p>Nằm ở phía bắc Đảo Bảy (Seven Island), đấu trường <strong>Trainer Tower</strong> thử thách khả năng thi đấu tính giờ (Time Attack) khốc liệt nhất game:</p>
      <ul>
        <li><strong>Cơ chế đặc biệt:</strong> Pokémon của kẻ địch sẽ tự động tăng tiến cấp độ tương thích bằng với cấp độ của Pokémon mạnh nhất trong đội hình của bạn!</li>
        <li><strong>Phần thưởng:</strong> Khi hoàn thành trong thời gian quy định, bạn sẽ nhận được vô số vật phẩm quý hiếm như Dragon Scale, Metal Coat, Up-Grade hay các loại dược thảo quý giá.</li>
      </ul>

      <h2>3. Các Vật Phẩm Trấn Phái Hậu Game</h2>
      <p>Để xây dựng đội hình thi đấu tháp đỉnh cao, hãy trang bị ngay các bảo vật sau:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px;">Bảo vật</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Tác dụng thực chiến</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Cách thu thập</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Leftovers (Đồ ăn thừa)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Hồi phục 1/16 lượng máu tối đa sau mỗi lượt đấu.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đến đúng 2 ô đất trống Snorlax từng ngủ say ngủ gật chặn đường (Route 12 & Route 16) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" style="max-width:24px; vertical-align:middle;" /> và dùng công cụ <strong>Itemfinder</strong> để dò tìm dã ngoại.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Macho Brace (Băng Đô Đô)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nhân đôi điểm nỗ lực (EV) nhận được khi hạ địch để tăng chỉ số cực hạn.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dùng <strong>Itemfinder</strong> ngay trên ô gạch trống thủ lĩnh Giovanni từng đứng trong phòng Gym Viridian City sau khi hạ gục ông ta.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Exp. Share</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Chia sẻ kinh nghiệm cho Pokémon đeo giữ mà không cần trực tiếp ra trận đấu.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Gặp trợ lý Giáo sư Oak tại cổng gác Route 15 nếu bạn đã thu thập tối thiểu <strong>50 loài Pokémon</strong> khác nhau.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Amulet Coin</td>
            <td style="padding: 12px 16px;">Nhân đôi lượng tiền thưởng thắng trận đấu dã ngoại.</td>
            <td style="padding: 12px 16px;">Gặp trợ lý Oak tại cổng gác Route 16 nếu đăng ký đủ 40 loài Pokémon.</td>
          </tr>
        </tbody>
      </table>
    \`
  }`;

const getGen3KantoEN_Ch14 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Chapter 14: Rare & Legendary Pokémon Secrets",
    order: 14,
    language: "en",
    content: \`
      <h1>Chapter 14: Rare & Legendary Pokémon Secrets</h1>
      <p>With the multi-region link established in the Sevii Islands, legendary secrets across Kanto are officially unlocked.</p>

      <h2>1. Tracking the Roaming Johto Legendary Beast</h2>
      <p>Defeating the Elite Four and fully restoring Celio's link machine triggers a roaming Johto legendary beast across Kanto at Level 50. The specific beast is decided by your chosen starter:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(59, 130, 246, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Starter Requirement</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Capturing Strategy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png" alt="Raikou" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Raikou</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Squirtle</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fastest runner. Trap it using Wobbuffet's <strong>Shadow Tag</strong> or use a <strong>Mean Look</strong> strategy. Otherwise, throw your <strong>Master Ball</strong>!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png" alt="Entei" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Entei</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Bulbasaur</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Possesses <strong>Roar</strong> which forcefully ends battles and deletes it forever due to a gen 3 glitch. Ruin its day with instant sleep or use the <strong>Master Ball</strong>!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png" alt="Suicune" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #60a5fa;">Suicune</td>
            <td style="padding: 12px 16px;">Water</td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Charmander</td>
            <td style="padding: 12px 16px;">Highly defensive. Best locked down with Hypnosis/Sleep Powder and caught with Ultra Balls.</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Mewtwo - The Genetic Masterpiece at Cerulean Cave <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" style="max-width:32px; vertical-align:middle;" /></h2>
      <p>Completing Celio's network device unlocks access to the high-level labyrinth <strong>Cerulean Cave</strong> north of Cerulean City. Deep on the bottom floor, you will find <strong>Mewtwo (Level 70)</strong>.</p>
      <ul>
        <li><strong>Preparation:</strong> Bring bulky Dark-type or high-defense Psychic counters. Wobbuffet or heavy sleep status users are great.</li>
        <li><strong>Catch Tip:</strong> Mewtwo uses Recover. Throwing the <strong>Master Ball</strong> immediately secures this beast without any effort.</li>
      </ul>

      <h2>3. Special Mythical Island Events: Deoxys, Lugia & Ho-Oh</h2>
      <p>Use special retro event tickets to sail to rare uncharted islands:</p>
      <ul>
        <li><strong>Birth Island (Deoxys) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/386.png" style="max-width:28px; vertical-align:middle;" />:</strong> Travel with the Aurora Ticket to this triangular island. Solve the sliding puzzle by tapping the red stone in the minimum number of moves. Once it turns hot red, <strong>Deoxys (Level 30)</strong> spawns! (Attack Form in FireRed, Defense Form in LeafGreen).</li>
        <li><strong>Navel Rock (Lugia & Ho-Oh):</strong> Sail with the Mystic Ticket to this towering monument. Dive to the deep flooded chambers to capture <strong>Lugia (Level 70)</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png" style="max-width:28px; vertical-align:middle;" /> or ascend the peak to challenge the legendary phoenix <strong>Ho-Oh (Level 70)</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png" style="max-width:28px; vertical-align:middle;" />.</li>
      </ul>
    \`
  }`;

const getGen3KantoEN_Ch15 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Chapter 15: Post-game, Battle Tower & Essential Items Guide",
    order: 15,
    language: "en",
    content: \`
      <h1>Chapter 15: Post-game, Battle Tower & Essential Items Guide</h1>
      <p>Becoming the Champion is just the beginning! The southern Sevii Islands hold top-tier post-game battles and legendary treasure directories.</p>

      <h2>1. Navigating Sevii Islands (Islands 4-7)</h2>
      <p>Receive the <strong>Rainbow Pass</strong> from Celio after entering the Hall of Fame to open deep exploration paths:</p>
      <ul>
        <li><strong>Four Island (Four Island):</strong> Explore the frozen <strong>Icefall Cave</strong>, teaming up with Lorelei to drive away Team Rocket thugs. Retrieve HM07 Waterfall.</li>
        <li><strong>Five Island (Five Island):</strong> Charge into the <strong>Rocket Warehouse</strong> at Five Island Meadow. Input the double-mypass code found during your journey to clean out the Rocket headquarters. Retrieve the glowing <strong>Sapphire</strong> gem.</li>
        <li><strong>Seven Island (Seven Island):</strong> Reach the ancient <strong>Tanoby Ruins</strong>. Solve the block-moving puzzle inside Tanoby Key chamber to release all 28 forms of wild <strong>Unown</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201.png" style="max-width:24px; vertical-align:middle;" /> across the island!</li>
      </ul>

      <h2>2. Trainer Tower Time Attack Arena</h2>
      <p>Constructed on northern Seven Island, the <strong>Trainer Tower</strong> is Kanto's ultimate post-game speedrun battle challenge:</p>
      <ul>
        <li><strong>Cメカニズム (Mechanism):</strong> Competitors dynamically scale matching the exact level of your highest-level Pokémon, creating a perfectly fair and challenging battleground!</li>
        <li><strong>Prizes:</strong> Beat the timer in Single, Double, Knockout, or Mixed mode to earn incredible rare items including Metal Coat, Dragon Scale, Up-Grade, or Mental Herb.</li>
      </ul>

      <h2>3. Post-Game God-Tier Items Directory</h2>
      <p>To optimize your team for the final challenges, collect these essential resources:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px;">Item Name</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Tactical Advantage</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Acquisition Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Leftovers</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Gradually heals 1/16 of maximum HP each turn.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Stand precisely on the two spots where Snorlax was sleeping (Route 12 and Route 16) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" style="max-width:24px; vertical-align:middle;" /> and activate your <strong>Itemfinder</strong>.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Macho Brace</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Doubles effort values (EVs) gained in combat, speeding up stat growth.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Stand on the exact empty floor space where Leader Giovanni stood in the Viridian Gym, and use your <strong>Itemfinder</strong>.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Exp. Share</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Passes 50% combat experience to a non-active party member.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Given by Professor Oak's aide in the Route 15 gate house once you register at least <strong>50 distinct species</strong> in your Dex.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Amulet Coin</td>
            <td style="padding: 12px 16px;">Doubles prize money earned from battling overworld trainers.</td>
            <td style="padding: 12px 16px;">Speak with Oak's aide at the Route 16 gate house if you have caught 40+ species.</td>
          </tr>
        </tbody>
      </table>
    \`
  }`;


// ==========================================
// DATA DEFINITIONS FOR GEN 1 (Red, Yellow)
// ==========================================

const getGen1VI_Ch14 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Phần 14: Bí mật Pokémon Siêu Hiếm & Huyền Thoại",
    order: 14,
    language: "vi",
    content: \`
      <h1>Phần 14: Bí mật Pokémon Siêu Hiếm & Huyền Thoại</h1>
      <p>Vùng đất Kanto nguyên bản ẩn chứa những bí ẩn huyền thoại đầu tiên của toàn bộ thế giới Pokémon. Hãy cùng khám phá và bắt trọn bộ!</p>

      <h2>1. Mewtwo - Quái Thú Tiến Hóa Tối Thượng <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" style="max-width:32px; vertical-align:middle;" /></h2>
      <p>Sau khi chiến thắng Liên Minh Pokémon và bước vào sảnh danh vọng Hall of Fame, hang động bí ẩn <strong>Cerulean Cave</strong> (nằm phía tây bắc Cerulean City) sẽ mở cửa:</p>
      <ul>
        <li><strong>Vị trí:</strong> Tầng sâu nhất (B1F) ẩn sau mê cung đá và dòng nước xiết.</li>
        <li><strong>Cấp độ:</strong> 70.</li>
        <li><strong>Chiến thuật:</strong> Mewtwo sở hữu chỉ số Special vô địch thế hệ 1, có thể quét sạch đội hình bạn bằng Psychic và tự hồi máu bằng Recover. Quả bóng <strong>Master Ball</strong> nhận được từ chủ tịch Silph Co. là lựa chọn hoàn hảo nhất tại đây.</li>
      </ul>

      <h2>2. Bộ Ba Chim Huyền Thoại (Legendary Birds)</h2>
      <p>Ba hộ vệ nguyên tố phân bố tại ba địa danh hiểm trở nhất vùng Kanto, xuất hiện tĩnh ở Level 50:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(59, 130, 246, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Vị trí ẩn ngụ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Mẹo giải đố & Chinh phục</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png" alt="Articuno" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Articuno</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Băng / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Seafoam Islands (Đảo Bọt Biển)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sử dụng chiêu <strong>Strength</strong> để đẩy các tảng đá tròn rơi xuống các hố sâu, chặn dòng nước chảy xiết bên dưới để có thể bơi lướt sóng tiếp cận chú chim băng giá.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png" alt="Zapdos" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Zapdos</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Power Plant (Nhà máy Điện Bỏ Hoang)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bơi xuôi dòng nước từ Route 10 xuống mạn đông bắc. Zapdos nằm ở căn phòng sâu nhất của nhà máy bỏ hoang, xung quanh là vô số Electrode tàng hình chặn đường.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png" alt="Moltres" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f97316;">Moltres</td>
            <td style="padding: 12px 16px;">Lửa / Bay</td>
            <td style="padding: 12px 16px;">Victory Road (Đường Chiến Thắng)</td>
            <td style="padding: 12px 16px;">Nằm ở tầng 2F của mê cung hang động dẫn đến đỉnh Liên Minh. Hãy giải đố đẩy đá lên công tắc để mở lối rẽ tiếp cận Moltres ẩn mình sâu trong hang lửa.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Các Pokémon Siêu Hiếm Tại Khu Bảo Tồn Safari Zone</h2>
      <p>Khu bảo tồn hoang dã Fuchsia Safari Zone chứa đựng những Pokémon có tỷ lệ xuất hiện cực kỳ thấp và vô cùng khó bắt giữ (do dễ hoảng sợ bỏ chạy):</p>
      <ul>
        <li><strong>Chansey (Lvl 26) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png" style="max-width:24px; vertical-align:middle;" />:</strong> Tỉ lệ xuất hiện chỉ 1% đến 4% tại Khu vực Trung Tâm và Khu Vực 2. Sở hữu lượng máu khổng lồ vô địch game.</li>
        <li><strong>Scyther <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png" style="max-width:24px; vertical-align:middle;" /> / Pinsir <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png" style="max-width:24px; vertical-align:middle;" />:</strong> Độc quyền phiên bản với tỉ lệ chỉ 1% đến 4%. Sát thủ côn trùng lý tưởng cho bộ sưu tập.</li>
        <li><strong>Tauros <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png" style="max-width:24px; vertical-align:middle;" /> & Kangaskhan <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png" style="max-width:24px; vertical-align:middle;" />:</strong> Những mãnh thú vật lý hệ Thường cực kỳ hung dữ, tỉ lệ gặp cực thấp tại Khu Vực 1 và Khu Vực 3.</li>
        <li><strong>Mẹo bắt Safari:</strong> Đừng quăng đá khiến chúng dễ hoảng sợ bỏ chạy dã ngoại. Hãy quăng mồi dụ để chúng bình tĩnh hơn, hoặc ném ngay Safari Ball khi chúng đứng yên sơ hở.</li>
      </ul>
    \`
  }`;

const getGen1VI_Ch15 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Phần 15: Toàn tập Hậu game & Vật phẩm Trấn phái",
    order: 15,
    language: "vi",
    content: \`
      <h1>Phần 15: Toàn tập Hậu game & Vật phẩm Trấn phái</h1>
      <p>Dù không có hệ thống đảo Sevii Islands hay Đấu Trường Battle Frontier đồ sộ như các thế hệ sau, thế giới Generation 1 vẫn giữ nguyên giá trị thử thách bất hủ hậu game.</p>

      <h2>1. Các Mục Tiêu Hậu Game Tối Thượng</h2>
      <ul>
        <li><strong>Chinh Phục Cerulean Cave:</strong> Thử thách vượt qua hang động khắc nghiệt chứa đầy Pokémon hoang dã cấp cao nhất game (đạt tới Level 50-60+ dã ngoại dã ngoại).</li>
        <li><strong>Hoàn thành Pokédex 150 Loài:</strong> Thu thập đủ 150 loài Pokémon dã ngoại để nhận bằng chứng nhận danh giá từ nhà phát triển Game Freak tại Celadon Mansion!</li>
        <li><strong>Truyền thuyết Mew Glitch (Bí mật) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png" style="max-width:24px; vertical-align:middle;" />:</strong> Trick lỗi đặc biệt bằng cách dùng Fly/Teleport thoát khỏi góc nhìn của HLV trên Route 8, đối đầu HLV trên Route 24 rồi quay lại Lavender Town để ép Pokémon Thần Thoại <strong>Mew (Level 7)</strong> xuất hiện dã ngoại!</li>
      </ul>

      <h2>2. Bản Tra Cứu Các Vật Phẩm & TMs Trấn Phái Hệ Kanto</h2>
      <p>Kanto sở hữu những chiếc máy kỹ năng (TMs) và vật phẩm phụ trợ có sức mạnh thay đổi hoàn toàn cục diện trận đấu:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px;">Bảo vật / TMs</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Sức mạnh cốt lõi</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Vị trí thu thập</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Master Ball (Bóng Tối Thượng)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Bóng bắt giữ 100% thành công không trượt phát nào dã ngoại.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận từ chủ tịch tập đoàn <strong>Silph Co.</strong> tại Saffron City sau khi quét sạch trùm Rocket Giovanni.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">TM26 Earthquake (Động Đất)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tuyệt kỹ hệ Đất mạnh nhất với 100 Sức mạnh và độ chính xác tuyệt đối.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lượm tại tầng 10F của Silph Co., hoặc tặng bởi Giovanni sau khi hạ gục lão tại Viridian Gym (Gym 8).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">TM11 Bubblebeam (Tia Bong Bóng)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Đòn hệ Nước tuyệt vời giúp gánh team cực mạnh giai đoạn đầu và giữa game.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Được Misty trao tặng ngay sau khi bạn vượt qua Cerulean Gym (Gym 2).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #cbd5e1;">EXP. ALL (Máy chia kinh nghiệm)</td>
            <td style="padding: 12px 16px;">Chia đều lượng kinh nghiệm nhận được cho toàn bộ 6 thành viên trong đội hình dã ngoại.</td>
            <td style="padding: 12px 16px;">Nhận từ trợ lý Oak ở trạm gác lớn nối Route 11 and Route 12 nếu bạn đã đăng ký ít nhất <strong>50 loài Pokémon</strong>.</td>
          </tr>
        </tbody>
      </table>
    \`
  }`;

const getGen1EN_Ch14 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Chapter 14: Rare & Legendary Pokémon Secrets",
    order: 14,
    language: "en",
    content: \`
      <h1>Chapter 14: Rare & Legendary Pokémon Secrets</h1>
      <p>Discover the origin stories of Pokémon's first mythological gods hidden deep inside the classic Kanto wilderness.</p>

      <h2>1. Mewtwo - The Gene-Spliced Overlord <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" style="max-width:32px; vertical-align:middle;" /></h2>
      <p>After conquering the Elite Four and claiming your Championship, the barrier blocking the northwestern cavern of <strong>Cerulean Cave</strong> collapses:</p>
      <ul>
        <li><strong>Location:</strong> Bottom floor (B1F) past twisting labyrinths and strong water currents.</li>
        <li><strong>Level:</strong> 70.</li>
        <li><strong>Battle Strategy:</strong> Mewtwo possesses the highest Special stat in Generation 1 history, sweep-capable Psychic attacks, and instant healing with Recover. It is the absolute prime target for your <strong>Master Ball</strong>.</li>
      </ul>

      <h2>2. The Legendary Elemental Bird Trio</h2>
      <p>The three original elemental guardians rest in static encounters across Kanto's most hazardous environments at Level 50:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(59, 130, 246, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Nesting Location</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Puzzles & Tactics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png" alt="Articuno" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Articuno</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ice / Flying</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Seafoam Islands</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Use HM04 <strong>Strength</strong> to push stone boulders into open cavern holes, blocking the fierce water currents below so you can safely swim to its island platform.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png" alt="Zapdos" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Zapdos</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric / Flying</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Abandoned Power Plant</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Surf downstream from the Route 10 river inlet. Zapdos blocks the exit of the deepest machine room, surrounded by fake Item Balls that turn out to be wild Electrode.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png" alt="Moltres" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f97316;">Moltres</td>
            <td style="padding: 12px 16px;">Fire / Flying</td>
            <td style="padding: 12px 16px;">Victory Road Caverns</td>
            <td style="padding: 12px 16px;">Perched on floor 2F of the League-qualifying cave system. Complete the boulder-pushing puzzle to unlock the side wall leading to this fiery phoenix.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Snaring Elusive Safari Zone Species</h2>
      <p>The Fuchsia Safari Zone contains extremely rare species with extremely high escape rates. Patience is your greatest tool:</p>
      <ul>
        <li><strong>Chansey (Lvl 26) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png" style="max-width:24px; vertical-align:middle;" />:</strong> Boasts a tiny 1% to 4% encounter rate in the Center Area and Area 2. Possesses god-tier HP reserves.</li>
        <li><strong>Scyther <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png" style="max-width:24px; vertical-align:middle;" /> / Pinsir <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png" style="max-width:24px; vertical-align:middle;" />:</strong> Version exclusives at tiny 1%-4% encounter rates. Phenomenal Bug-type physical sweepers.</li>
        <li><strong>Tauros <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png" style="max-width:24px; vertical-align:middle;" /> & Kangaskhan <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png" style="max-width:24px; vertical-align:middle;" />:</strong> Devastating Normal-type sweepers with tiny spawn rates in Area 1 and Area 3.</li>
        <li><strong>Safari Capture Formula:</strong> Avoid throwing rocks (boosts catch rate but triggers instant escape). Throwing Bait makes them stay but cuts catch rates. Learn to throw Safari Balls immediately when they stand surprised!</li>
      </ul>
    \`
  }`;

const getGen1EN_Ch15 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Chapter 15: Post-game & Essential Items Guide",
    order: 15,
    language: "en",
    content: \`
      <h1>Chapter 15: Post-game & Essential Items Guide</h1>
      <p>While Generation 1 lacks the extensive post-game regions of newer games, mastering the game's item mechanics and final dungeons offers ultimate satisfaction.</p>

      <h2>1. Ultimate End-Game Milestones</h2>
      <ul>
        <li><strong>Conquering Cerulean Cave:</strong> Test your team's synergy against Kanto's highest-level wild threats (scaling up to Level 50-60+ in the wild).</li>
        <li><strong>Completing the 150 Pokédex Challenge:</strong> Catch all 150 legal species to receive the official Diploma from Game Freak inside Celadon Mansion!</li>
        <li><strong>The Mythical Mew Glitch (Secret) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png" style="max-width:24px; vertical-align:middle;" />:</strong> Trigger an ancient developer glitch by flying/teleporting away from a trainer on Route 8, battling a trainer on Route 24, and walking back to Lavender Town to summon a wild <strong>Mew (Level 7)</strong>!</li>
      </ul>

      <h2>2. Essential Kanto Weapons & TMs Directory</h2>
      <p>Equip these powerful game-defining elements to construct your final dream team:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px;">Item / TM Name</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Tactical Value</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Acquisition Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Master Ball</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">A legendary prototype ball that catches any wild target with a 100% success rate.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Gifted by the President of <strong>Silph Co.</strong> in Saffron City after driving away Giovanni.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">TM26 Earthquake</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">The strongest Ground-type move in Gen 1, dealing 100 Power with absolute accuracy.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Found on floor 10F of Silph Co., or awarded by Giovanni after beating the Viridian Gym.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">TM11 Bubblebeam</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">A spectacular early-to-mid-game Water attack that carries your starter through early gauntlets.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Awarded by Misty upon conquering the Cerulean Gym (Gym 2).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #cbd5e1;">EXP. ALL</td>
            <td style="padding: 12px 16px;">Distributes gained combat experience evenly across all 6 active party members.</td>
            <td style="padding: 12px 16px;">Acquired from Oak's aide in the gate house between Route 11 and Route 12 once you have logged 50+ species.</td>
          </tr>
        </tbody>
      </table>
    \`
  }`;


// ==========================================
// DATA DEFINITIONS FOR GEN 2 (Gold, Silver, Crystal)
// ==========================================

const getGen2VI_Ch12 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Phần 12: Hành trình khám phá Kanto & Trận quyết chiến đỉnh cao với Red tại Mt. Silver",
    order: 12,
    language: "vi",
    content: \`
      <h1>Phần 12: Hành trình khám phá Kanto & Trận quyết chiến đỉnh cao với Red tại Mt. Silver</h1>
      <p>Sau khi chiến thắng Johto Pokémon League, hãy gặp Giáo sư Elm để nhận vé tàu <strong>S.S. Ticket</strong> bước lên du thuyền sang trọng S.S. Aqua vượt biển tiến thẳng sang vùng đất Kanto huyền thoại!</p>

      <h2>1. Săn Lùng 8 Huy Hiệu Gym Vùng Kanto</h2>
      <p>Tại Kanto, bạn sẽ lần lượt khiêu chiến 8 thủ lĩnh phòng Gym kinh điển của Generation 1 ở cấp độ hoàn toàn mới, kịch tính hơn nhiều:</p>
      <ul>
        <li><strong>Brock (Pewter Gym):</strong> Thủ lĩnh đá tảng với bộ đôi Ryhorn & Onix cứng cáp <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" style="max-width:24px; vertical-align:middle;" />.</li>
        <li><strong>Misty (Cerulean Gym):</strong> Trận chiến dưới nước tuyệt vời cùng Starmie siêu tốc độ <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png" style="max-width:24px; vertical-align:middle;" />.</li>
        <li><strong>Lt. Surge (Vermilion Gym):</strong> Vượt qua mê cung thùng rác rực điện để thách thức Raichu <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png" style="max-width:24px; vertical-align:middle;" />.</li>
        <li><strong>Erika (Celadon Gym):</strong> Khu vườn hoa rực rỡ hệ Cỏ sẵn sàng chào đón bạn.</li>
        <li><strong>Janine (Fuchsia Gym):</strong> Con gái của Koga kế thừa phòng Gym Độc thuật tàng hình bí ẩn.</li>
        <li><strong>Sabrina (Saffron Gym):</strong> Đấu trường siêu linh ma thuật khốc liệt Alakazam <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png" style="max-width:24px; vertical-align:middle;" />.</li>
        <li><strong>Blaine (Cinnabar Gym):</strong> Vị trí Gym dời sang hang động đá núi lửa Seafoam Islands hoang dã.</li>
        <li><strong>Blue (Viridian Gym):</strong> Cựu vô địch Kanto thách thức bạn với đội hình đa hệ vô cùng cân bằng, không có một điểm yếu rõ rệt nào!</li>
      </ul>

      <h2>2. Trận Quyết Chiến Thần Thoại atop Mt. Silver</h2>
      <p>Sau khi thu thập trọn bộ 16 Huy hiệu Gym của cả hai vùng đất, Giáo sư Oak sẽ cấp giấy phép cho bạn tiến vào vùng cấm địa linh thiêng: <strong>Mt. Silver (Núi Bạc)</strong>.</p>
      <p>Tại đỉnh núi tuyết phủ trắng xóa quanh năm, một bóng hình lặng lẽ đang chờ đón bạn. Đó chính là huyền thoại vô địch: <strong>Red (Level 75-81+)</strong>!</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(239, 68, 68, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: center; width: 100px; color: #f87171;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Thần Thú của Red</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Chiến thuật khắc chế tối ưu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Pikachu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 81</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Chú chuột điện siêu cấp Level 81 có tốc độ cực nhanh. Sử dụng các đòn hệ Đất của Donphan hoặc Steelix để chặn đứng hoàn toàn!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png" alt="Espeon" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Espeon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 73</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Siêu Linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Kháng đòn siêu linh cực tốt bằng Pokémon hệ Bóng Tối như Umbreon hoặc Tyranitar, sau đó hạ gục bằng đòn vật lý mạnh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" alt="Snorlax" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Snorlax</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 75</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Một bức tường máu khổng lồ vô cùng khó nhằn. Hãy đấm vỡ giáp của nó bằng đòn hệ Giác Đấu dũng mãnh (Machamp / Heracross).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" alt="Venusaur" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Venusaur</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 77</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Thiêu rụi lớp phòng ngự sinh học bằng đòn hệ Lửa rực cháy từ Typhlosion hoặc Charizard.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" alt="Blastoise" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Blastoise</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 77</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Giật điện sấm sét xé tan giáp nước bằng chiêu phóng điện của Ampharos hoặc Raikou.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="Charizard" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #cbd5e1;">Charizard</td>
            <td style="padding: 12px 16px;">Level 77</td>
            <td style="padding: 12px 16px;">Lửa / Bay</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Đánh mạnh bằng đòn hệ Nước (Surf) hoặc hệ Đá để gây sát thương nhân đôi cực đỉnh!</td>
          </tr>
        </tbody>
      </table>
    \`
  }`;

const getGen2VI_Ch13 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Phần 13: Toàn tập HMs, Vật phẩm Nhiệm vụ & Trao đổi Pokémon Johto",
    order: 13,
    language: "vi",
    content: \`
      <h1>Phần 13: Toàn tập HMs, Vật phẩm Nhiệm vụ & Trao đổi Pokémon Johto</h1>
      <p>Cơ sở tra cứu nhanh chóng tất cả các công cụ vượt địa hình, vật phẩm nhiệm vụ cốt truyện chính và các giao dịch Pokémon NPC cực hời vùng Johto!</p>

      <h2>1. Danh sách vị trí sở hữu 7 HM (Hidden Machines) Vùng Johto</h2>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(234, 179, 8, 0.15); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 179, 8, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left; width: 120px; color: #facc15;">HM</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left; width: 120px; color: #facc15;">Chiêu thức</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: color: #facc15;">Vị trí sở hữu cụ thể</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left; width: 150px; color: #facc15;">Yêu cầu Huy hiệu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">HM01</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Cut (Chặt)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận sâu trong rừng Ilex Forest sau khi lùa bắt thành công chú vịt Farfetch'd đi lạc.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Hive Badge</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">HM02</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Fly (Bay)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Trò chuyện với vợ của võ sư Chuck bên ngoài cửa Gym Cianwood City ngay sau khi hạ gục ông ta.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Storm Badge</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">HM03</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Surf (Lướt)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hạ gục cả 5 cô gái Kimono Girls xinh đẹp tại nhà hát kịch Ecruteak City để nhận đĩa máy này.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Zephyr Badge</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">HM04</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Strength (Đẩy)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nói chuyện với chàng thủy thủ tại quán ăn Olivine Café (Olivine City).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Plain Badge</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">HM05</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Flash (Sáng)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thắng trưởng lão Elder Li tại đỉnh tháp Sprout Tower (Violet City).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Không cần huy hiệu</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">HM06</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Whirlpool (Xoáy)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Được Lance trao tặng bên trong căn cứ ngầm Team Rocket ở Mahogany Town sau khi dẹp loạn máy phát sóng.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Glacier Badge</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #cbd5e1;">HM07</td>
            <td style="padding: 12px 16px; font-weight: bold; color: #38bdf8;">Waterfall (Thác)</td>
            <td style="padding: 12px 16px;">Lượm trên sàn băng lạnh giá tại tầng 1F của hang động Ice Path.</td>
            <td style="padding: 12px 16px; font-weight: bold; color: #cbd5e1;">Rising Badge</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Bản Tra Cứu Các Vật Phẩm Nhiệm Vụ Quan Trọng Johto</h2>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(234, 179, 8, 0.15); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 179, 8, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left; width: 150px; color: #facc15;">Key Item</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left; color: #facc15;">Cách lấy vật phẩm</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left; color: #facc15;">Công dụng cốt truyện</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Mystery Egg (Trứng Bí Ẩn)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận từ nhà ông Mr. Pokémon tại bìa rừng Route 30 đầu hành trình.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giao cho Giáo sư Elm nghiên cứu, sau đó trứng sẽ nở thành Pokémon hiếm **Togepi**!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Squirt Bottle (Bình nước)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận từ cửa hàng hoa Goldenrod Flower Shop sau khi chiến thắng Gym Leader Whitney.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tưới nước kích động cái cây chắn đường dã ngoại ở ngã ba Route 36 để bắt hoặc đánh bại **Sudowoodo (Level 20)**.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">SecretPotion (Thần dược)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Mua tại nhà thuốc cổ truyền Cianwood City.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đem về ngọn hải đăng Olivine Lighthouse để chữa bệnh cho Ampharos của thủ lĩnh Jasmine.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Rainbow Wing (Cánh Cầu Vồng)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giám đốc Đài phát thanh Radio Tower tặng sau khi phá tan hang ổ Rocket tại Goldenrod.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Mở đường leo lên đỉnh tháp Tin Tower để diện kiến phượng hoàng huyền thoại **Ho-Oh**.</td>
          </tr>
        </tbody>
      </table>
    \`
  }`;

const getGen2VI_Ch14 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Phần 14: Bí mật Pokémon Siêu Hiếm & Huyền Thoại",
    order: 14,
    language: "vi",
    content: \`
      <h1>Phần 14: Bí mật Pokémon Siêu Hiếm & Huyền Thoại</h1>
      <p>Thế hệ Generation 2 giới thiệu cơ chế Pokémon chạy hoang dã cực kỳ kịch tính và những vị thần bảo hộ đại dương, bầu trời và rừng rậm.</p>

      <h2>1. Bộ Ba Chó Huyền Thoại Chạy Hoang dã</h2>
      <p>Sau khi kích hoạt sự kiện sụp đổ tháp tại <strong>Burned Tower (Tháp Cháy)</strong> ở Ecruteak City, ba thần thú vùng Johto sẽ hồi sinh và bay lượn ngẫu nhiên khắp các đồng cỏ hoang vùng Johto ở cấp độ 40:</p>
      <ul>
        <li><strong>Raikou (Hệ Điện - Lvl 40) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png" style="max-width:24px; vertical-align:middle;" />:</strong> Tốc độ sấm sét, chuyên sử dụng Roar dã ngoại để chạy trốn khỏi trận đấu.</li>
        <li><strong>Entei (Hệ Lửa - Lvl 40) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png" style="max-width:24px; vertical-align:middle;" />:</strong> Chạy nhanh vượt trội, có đòn phun lửa uy lực dũng mãnh dã ngoại.</li>
        <li><strong>Suicune (Hệ Nước - Lvl 40) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png" style="max-width:24px; vertical-align:middle;" />:</strong> Thần thú gió mùa bảo hộ dòng sông. (Trong bản <strong>Crystal</strong>, Suicune sẽ có cốt truyện tĩnh gặp ở Tin Tower mà không chạy trốn, gánh đội cực kỳ xuất sắc).</li>
        <li><strong>Chiến thuật săn lùng:</strong> Sử dụng Pokémon có chiêu chặn chạy trốn như <strong>Mean Look</strong> (Umbreon / Crobat) hoặc ru ngủ lập tức, tốt nhất là quăng quả <strong>Master Ball</strong> thần thánh.</li>
      </ul>

      <h2>2. Thần Bảo Hộ Đại Dương Lugia & Phượng Hoàng Lửa Ho-Oh</h2>
      <p>Hai hộ vệ thần thánh tối thượng của thế giới Gen 2 có mốc xuất hiện phụ thuộc vào phiên bản bạn chơi:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: center; width: 100px; color: #10b981;">Hình ảnh</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Thần Thú</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Cốt truyện chính (Cấp 40)</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Hậu game (Cấp 70)</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Nơi ẩn ngụ cụ thể</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png" alt="Ho-Oh" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Ho-Oh (Phượng Hoàng Lửa)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mặc định trong bản <strong>Gold</strong> bằng Rainbow Wing lấy ở Radio Tower.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Trong bản <strong>Silver</strong> bằng cách nhận cánh lông từ ông lão ở Pewter City.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đỉnh tháp <strong>Tin Tower</strong> (Ecruteak City).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png" alt="Lugia" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #60a5fa;">Lugia (Rồng Biển Cổ Đại)</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Mặc định trong bản <strong>Silver</strong> bằng Silver Wing lấy ở Radio Tower.</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Trong bản <strong>Gold</strong> bằng cánh lông bạc nhận từ ông lão ở Pewter City.</td>
            <td style="padding: 12px 16px;">Hang động mê cung nước <strong>Whirl Islands</strong> (Route 41).</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Thần Rừng Celebi & Pokémon Đặc Biệt Union Cave</h2>
      <ul>
        <li><strong>Celebi - Thần Rừng Thời Không (Lvl 30) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/251.png" style="max-width:24px; vertical-align:middle;" />:</strong> Độc quyền sự kiện dã ngoại. Mang quả bóng cổ <strong>GS Ball</strong> đến cho thợ làm bóng Kurt ở Azalea Town để giải mã, sau đó đặt nó vào ngôi đền cổ kính ở <strong>Ilex Forest</strong> để gọi Celebi xuất hiện dã ngoại!</li>
        <li><strong>Lapras Huyền Thoại Union Cave (Lvl 20) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png" style="max-width:24px; vertical-align:middle;" />:</strong> Chú rồng nước Lapras có tỉ lệ xuất hiện tĩnh cực hiếm sâu dưới lòng hồ nước Union Cave B2F <strong>chỉ vào duy nhất ngày thứ Sáu hàng tuần</strong>. Đội hình gánh rồng tuyệt hảo cho hành trình Johto!</li>
      </ul>
    \`
  }`;

const getGen2VI_Ch15 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Phần 15: Toàn tập Hậu game, Battle Tower & Vật phẩm Trấn phái Johto",
    order: 15,
    language: "vi",
    content: \`
      <h1>Phần 15: Toàn tập Hậu game, Battle Tower & Vật phẩm Trấn phái Johto</h1>
      <p>Johto hậu game mang đến những tính năng đột phá sáng tạo vượt bậc của thế hệ Generation 2, thiết lập nền móng thi đấu chuyên nghiệp đầu tiên.</p>

      <h2>1. Đấu Trường Đỉnh Cao Battle Tower (Bản Crystal)</h2>
      <p>Nằm ngoài khơi biển phía tây thành phố cảng Olivine City, **Battle Tower** là thử thách đỉnh phong nhất thế giới Gen 2:</p>
      <ul>
        <li><strong>Luật thi đấu:</strong> Bạn sẽ chọn đội hình gồm 3 Pokémon tham chiến chuỗi 7 trận đấu liên tiếp với các đối thủ máy tính thông minh vượt bậc.</li>
        <li><strong>Cơ chế phân nhóm cấp độ:</strong> Chia làm các phòng thi đấu từ Level 10, 20... cho đến Level 100 cực hạn. Kẻ địch có chiến thuật dùng đòn trạng thái vô cùng sắc sảo.</li>
        <li><strong>Phần thưởng quý giá:</strong> Đạt chuỗi thắng tuyệt đối để nhận được các loại Vitamin tăng chỉ số nỗ lực (Carbos, Protein, Calcium...) nâng cấp sức mạnh cực hạn.</li>
      </ul>

      <h2>2. Bản Tra Cứu Các Vật Phẩm Trấn Phái Toàn Diện Johto</h2>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px;">Bảo vật vô giá</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Sức mạnh thực chiến đặc quyền</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Cách tìm kiếm đặc thù</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">EXP. Share (Chia sẻ EXP)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nhận 50% điểm kinh nghiệm trận đấu mà không cần ra sân chiến đấu.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đem chiếc vảy đỏ <strong>Red Scale</strong> (nhận được sau khi hạ gục chú Gyarados Đỏ đột biến tại Lake of Rage) về đổi với Mr. Pokémon trên Route 30.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Leftovers (Đồ ăn thừa)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Hồi phục 1/16 lượng máu tối đa sau mỗi lượt đấu vô cùng bền bỉ.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sở hữu sẵn trên người chú Pokémon ngủ ham ăn <strong>Snorlax hoang dã</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" style="max-width:24px; vertical-align:middle;" /> chặn đường Vermilion City sau khi bắt giữ được nó, hoặc lục thùng rác ở hầm ngầm Celadon.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Amulet Coin (Xu Bùa Hộ Mệnh)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nhân đôi toàn bộ tiền thưởng kiếm được sau mỗi chiến thắng dã ngoại.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tìm thấy ở tầng hầm tối tăm sâu khu trung tâm thương mại <strong>Goldenrod Dept. Store</strong>.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #60a5fa;">TM26 Earthquake (Động Đất)</td>
            <td style="padding: 12px 16px;">Chiêu thức Đất tối cường với sức mạnh công phá hủy diệt hàng đầu game.</td>
            <td style="padding: 12px 16px;">Nằm sâu tại tầng hầm hang động dẫn đến đỉnh Liên Minh <strong>Victory Road (B1F)</strong>.</td>
          </tr>
        </tbody>
      </table>
    \`
  }`;

const getGen2EN_Ch14 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Chapter 14: Johto Rare & Legendary Secrets",
    order: 14,
    language: "en",
    content: \`
      <h1>Chapter 14: Johto Rare & Legendary Secrets</h1>
      <p>Generation 2 introduced high-stakes roaming wild encounters and iconic guardians ruling over storms, oceans, and timelines.</p>

      <h2>1. The Roaming Legendary Beasts</h2>
      <p>Awakened at the collapsed ruins of the <strong>Burned Tower</strong> in Ecruteak City, Johto's legendary elementals scatter and roam the grass across Johto at Level 40:</p>
      <ul>
        <li><strong>Raikou (Electric - Lvl 40) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png" style="max-width:24px; vertical-align:middle;" />:</strong> Blistering Speed. Uses Roar to instantly escape combat.</li>
        <li><strong>Entei (Fire - Lvl 40) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png" style="max-width:24px; vertical-align:middle;" />:</strong> High physical power, deals devastating flame attacks.</li>
        <li><strong>Suicune (Water - Lvl 40) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png" style="max-width:24px; vertical-align:middle;" />:</strong> The North Wind. (In <strong>Crystal</strong>, Suicune has a static story encounter at Tin Tower, offering an elite Water-type carry).</li>
        <li><strong>Catch Tactics:</strong> Use speed trap passives like <strong>Shadow Tag</strong> (Wobbuffet) or move-trapping like <strong>Mean Look</strong> (Umbreon/Crobat). Throwing the <strong>Master Ball</strong> immediately bypasses the chase.</li>
      </ul>

      <h2>2. Lugia, Guardian of the Oceans & Ho-Oh, Phoenix of the Heavens</h2>
      <p>These two legendary mythological titans rest at opposite ends of Johto, with level milestones shifting by version:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: center; width: 100px; color: #10b981;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Legendary Titan</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Story Mode (Lvl 40)</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Post-Game (Lvl 70)</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Nesting Chamber</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png" alt="Ho-Oh" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Ho-Oh (Fire / Flying)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Default target in **Gold** via Rainbow Wing.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Post-Game goal in **Silver** via Pewter City's old man.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Peak of **Tin Tower** (Ecruteak City).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png" alt="Lugia" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #60a5fa;">Lugia (Psychic / Water)</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Default target in **Silver** via Silver Wing.</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Post-Game goal in **Gold** via Pewter City's old man.</td>
            <td style="padding: 12px 16px;">Subterranean waterfalls of **Whirl Islands** (Route 41).</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Celebi (Time Guardian) & Lapras</h2>
      <ul>
        <li><strong>Celebi (Time Guardian - Lvl 30) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/251.png" style="max-width:24px; vertical-align:middle;" />:</strong> Event exclusive. Deliver the mysterious <strong>GS Ball</strong> to Kurt in Azalea Town to decode, then place it inside the shrine in the heart of <strong>Ilex Forest</strong> to summon Celebi!</li>
        <li><strong>Lapras (Union Cave Friday Event - Lvl 20) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png" style="max-width:24px; vertical-align:middle;" />:</strong> Generates as a static overworld encounter in Union Cave B2F <strong>only on Fridays</strong>. Excellent bulky Water/Ice carry for your Johto journey.</li>
      </ul>
    \`
  }`;

const getGen2EN_Ch15 = (version: string) => `,
  {
    gameVersion: "${version}",
    chapterTitle: "Chapter 15: Post-Game Battle Tower & Essential Items Guide",
    order: 15,
    language: "en",
    content: \`
      <h1>Chapter 15: Post-Game Battle Tower & Essential Items Guide</h1>
      <p>Generation 2 post-game introduced core features that established the competitive and technical foundation of modern Pokémon battling.</p>

      <h2>1. The Crystal Battle Tower Arena</h2>
      <p>Located on the coast west of Olivine City, the **Battle Tower** stands as the ultimate strategic gauntlet of Generation 2:</p>
      <ul>
        <li><strong>The Challenge:</strong> Select a tight squad of 3 Pokémon to challenge an AI-driven sequence of 7 consecutive matches.</li>
        <li><strong>Level brackets:</strong> Ranging from Level 10, 20... up to Level 100 maximum. AI utilizing complex toxic/stalling setups!</li>
        <li><strong>Prizes:</strong> Score high winning streaks to receive stat-boosting vitamins (Protein, Calcium, Carbos) to maximize your Pokémon's potential.</li>
      </ul>

      <h2>2. Essential Gen 2 Items Reference</h2>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px;">Held Item</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Tactical Advantage</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Method of Acquisition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">EXP. Share</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Passes 50% experience to the holder without entering the active battlefield.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Trade the rare <strong>Red Scale</strong> (obtained from the Lake of Rage Red Gyarados) with Mr. Pokémon on Route 30.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Leftovers</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Slowly restores 1/16 of holder's maximum HP each turn.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Carried held by the wild overworld **Snorlax** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" style="max-width:24px; vertical-align:middle;" /> blocking Vermilion City, or searched out from the trash bin inside Celadon.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Amulet Coin</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Doubles overworld prize money earned from victorious trainer combat.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Found tucked inside the dark basement of the **Goldenrod Dept. Store**.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #60a5fa;">TM26 Earthquake</td>
            <td style="padding: 12px 16px;">The absolute strongest Ground-type move with 100 power and zero accuracy penalties.</td>
            <td style="padding: 12px 16px;">Located deep inside Kanto-Johto boundary path <strong>Victory Road (B1F)</strong>.</td>
          </tr>
        </tbody>
      </table>
    \`
  }`;


// ==========================================
// FILE MANIPULATION LOGIC
// ==========================================

function processFile(
  filename: string,
  enExportName: string,
  appendVI: string,
  appendEN: string
) {
  const filePath = getDataPath(filename);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File không tồn tại: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Find the split point where English chapters export begins
  const englishExportKeyword = `export const ${enExportName}`;
  const splitIndex = content.indexOf(englishExportKeyword);
  if (splitIndex === -1) {
    console.error(`❌ Không tìm thấy từ khóa xuất English [${englishExportKeyword}] trong file ${filename}`);
    return;
  }

  // Find the last closing bracket "];" before the English export starts
  const insertIndexVI = content.lastIndexOf('];', splitIndex);
  if (insertIndexVI === -1) {
    console.error(`❌ Không tìm thấy dấu đóng mảng "];" cho Tiếng Việt trong file ${filename}`);
    return;
  }

  // Inject Vietnamese chapters
  content = content.slice(0, insertIndexVI) + appendVI + content.slice(insertIndexVI);

  // Find the last closing bracket "];" of the entire file (for English chapters)
  const insertIndexEN = content.lastIndexOf('];');
  if (insertIndexEN === -1) {
    console.error(`❌ Không tìm thấy dấu đóng mảng "];" cho Tiếng Anh trong file ${filename}`);
    return;
  }

  // Inject English chapters
  content = content.slice(0, insertIndexEN) + appendEN + content.slice(insertIndexEN);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`🎉 Đã bổ sung thành công các chương mới cho file: ${filename}`);
}

function main() {
  console.log('🤖 Bắt đầu xử lý nạp/bổ sung các chương Hậu Game cho các Walkthrough...');

  // 1. FireRed & LeafGreen (Gen 3 Kanto)
  processFile(
    'walkthrough-firered.ts',
    'ENGLISH_FIRERED_CHAPTERS',
    getGen3KantoVI_Ch14('firered') + getGen3KantoVI_Ch15('firered'),
    getGen3KantoEN_Ch14('firered') + getGen3KantoEN_Ch15('firered')
  );

  processFile(
    'walkthrough-leafgreen.ts',
    'ENGLISH_LEAFGREEN_CHAPTERS',
    getGen3KantoVI_Ch14('leafgreen') + getGen3KantoVI_Ch15('leafgreen'),
    getGen3KantoEN_Ch14('leafgreen') + getGen3KantoEN_Ch15('leafgreen')
  );

  // 2. Red & Yellow (Gen 1) - Blue maps dynamically from Red
  processFile(
    'walkthrough-red.ts',
    'ENGLISH_RED_CHAPTERS',
    getGen1VI_Ch14('red') + getGen1VI_Ch15('red'),
    getGen1EN_Ch14('red') + getGen1EN_Ch15('red')
  );

  processFile(
    'walkthrough-yellow.ts',
    'ENGLISH_YELLOW_CHAPTERS',
    getGen1VI_Ch14('yellow') + getGen1VI_Ch15('yellow'),
    getGen1EN_Ch14('yellow') + getGen1EN_Ch15('yellow')
  );

  // 3. Gold, Silver, Crystal (Gen 2)
  processFile(
    'walkthrough-gold.ts',
    'ENGLISH_GOLD_CHAPTERS',
    getGen2VI_Ch12('gold') + getGen2VI_Ch13('gold') + getGen2VI_Ch14('gold') + getGen2VI_Ch15('gold'),
    getGen2EN_Ch14('gold') + getGen2EN_Ch15('gold')
  );

  processFile(
    'walkthrough-silver.ts',
    'ENGLISH_SILVER_CHAPTERS',
    getGen2VI_Ch12('silver') + getGen2VI_Ch13('silver') + getGen2VI_Ch14('silver') + getGen2VI_Ch15('silver'),
    getGen2EN_Ch14('silver') + getGen2EN_Ch15('silver')
  );

  processFile(
    'walkthrough-crystal.ts',
    'ENGLISH_CRYSTAL_CHAPTERS',
    getGen2VI_Ch12('crystal') + getGen2VI_Ch13('crystal') + getGen2VI_Ch14('crystal') + getGen2VI_Ch15('crystal'),
    getGen2EN_Ch14('crystal') + getGen2EN_Ch15('crystal')
  );

  console.log('🏁 Hoàn tất cập nhật các file walkthrough!');
}

main();
