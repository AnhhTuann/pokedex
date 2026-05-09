import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const EMERALD_CHAPTERS = [
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 1: Khởi đầu cuộc hành trình',
    order: 1,
    content: `
      <h1>Phần 1: Khởi đầu cuộc hành trình</h1>
      <p>Chào mừng đến với vùng đất Hoenn rộng lớn! Hành trình của một nhà vô địch Pokémon tương lai bắt đầu tại ngôi làng nhỏ thanh bình mang tên <strong>Littleroot Town</strong>.</p>

      <h2>1. Littleroot Town & Thử thách đầu tiên</h2>
      <p>Sau khi chỉnh lại đồng hồ trong phòng ngủ của mình, hãy sang nhà bên cạnh để chào hỏi May/Brendan (Rival của bạn). Sau đó, hãy tiến lên phía bắc hướng về Route 101. Tại đây, bạn sẽ cứu Giáo sư Birch khỏi con Zigzagoon hoang dã bằng cách chọn một trong ba Pokémon khởi đầu cực kỳ mạnh mẽ:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ chính</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Đánh giá chiến thuật</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/252.png" alt="Treecko" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">TREECKO</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ (Grass)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Thiên về tốc độ cao, cực tốt để vượt qua Gym 1 (Đá) và Gym 8 (Nước). Nhưng sẽ hơi vất vả ở giữa game.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png" alt="Torchic" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">TORCHIC</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa (Fire)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tiến hóa thành Combusken mang song hệ Lửa/Giác đấu với sát thương khổng lồ, là ngòi nổ gánh team cực mạnh về sau.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png" alt="Mudkip" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #3b82f6;">MUDKIP</td>
            <td style="padding: 12px 16px;">Nước (Water)</td>
            <td style="padding: 12px 16px; color: #cbd5e1;"><strong>Lựa chọn tối ưu nhất!</strong> Sau khi tiến hóa thành Marshtomp, song hệ Nước/Đất giúp nó miễn nhiễm hoàn toàn chiêu hệ Điện, dễ thở nhất game.</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Mẹo nhỏ:</strong> Nên chọn Mudkip nếu bạn muốn có một trải nghiệm cốt truyện mượt mà và dễ dàng chiến đấu với hầu hết các nhà thi đấu.
      </blockquote>

      <h2>2. Route 101, Oldale Town & Rival Fight</h2>
      <p>Từ Route 101, hãy đi thẳng lên phía bắc tới <strong>Oldale Town</strong>, hồi máu tại Pokémon Center. Tiếp tục tiến lên Route 103 để đối mặt với Rival trong trận so tài đầu tiên. Sau khi giành chiến thắng, hãy cùng Rival quay trở về phòng thí nghiệm tại Littleroot Town để nhận <strong>Pokédex</strong> và những quả <strong>Poké Balls</strong> đầu tiên.</p>

      <h2>3. Petalburg City & Gặp gỡ Wally</h2>
      <p>Băng qua Route 102 (bạn có thể bắt Ralts <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/280.png" style="max-width:32px; vertical-align:middle;" /> tại đây với tỉ lệ 4%) để tới <strong>Petalburg City</strong>. Hãy ghé qua Gym gặp bố Norman. Norman sẽ nhờ bạn giúp đỡ cậu bé rụt rè <strong>Wally</strong> bắt con Pokémon đầu tiên là Ralts. Bạn chưa thể thách đấu Norman lúc này, hãy tiếp tục tiến qua Route 104 và vượt qua rừng rậm <strong>Petalburg Woods</strong>.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 2: Huy hiệu đầu tiên - Stone Badge',
    order: 2,
    content: `
      <h1>Phần 2: Huy hiệu đầu tiên - Stone Badge</h1>
      <p>Vượt qua cánh rừng Petalburg Woods đầy rẫy côn trùng, bạn sẽ đặt chân đến thành phố công nghiệp phát triển bậc nhất <strong>Rustboro City</strong>.</p>

      <h2>1. Rustboro City & Sự chuẩn bị</h2>
      <p>Trước khi bước vào nhà thi đấu, hãy ghé thăm Trường học Pokémon (Pokémon School) ở thành phố để nhận trang bị hữu ích <strong>Quick Claw</strong> (giúp tăng tỉ lệ đánh trước trong trận đấu).</p>

      <h2>2. Thách đấu Gym Leader Roxanne</h2>
      <p>Nhà thi đấu Rustboro chuyên trị Pokémon hệ Đá (Rock) với thủ lĩnh là cô nàng Roxanne thông thái. Pokémon hệ Nước (Mudkip), Cỏ (Treecko) hoặc hệ Giác đấu sẽ dễ dàng nghiền nát Gym này.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Chiêu thức nguy hiểm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png" alt="Geodude" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Geodude</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 12</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock Throw, Defense Curl</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png" alt="Geodude" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Geodude</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 12</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock Throw, Defense Curl</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/299.png" alt="Nosepass" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a1a1aa;">Nosepass</td>
            <td style="padding: 12px 16px;">Lvl 15</td>
            <td style="padding: 12px 16px;">Đá</td>
            <td style="padding: 12px 16px;">Rock Tomb, Harden, Block</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Phần thưởng chiến thắng:</strong> Huy hiệu <strong>Stone Badge</strong> (cho phép bạn sử dụng HM01 Cut ngoài bản đồ) và đĩa dạy chiêu <strong>TM39 Rock Tomb</strong>.
      </blockquote>

      <h2>3. Sự kiện Devon Corp & Giải cứu chú chim Peeko</h2>
      <p>Sau khi bước ra khỏi nhà thi đấu, bạn sẽ chứng kiến một tên trộm thuộc băng đảng <strong>Team Aqua</strong> cướp đồ từ nhân viên tập đoàn Devon. Hãy đuổi theo hắn qua Route 116 và đi sâu vào hang động <strong>Rusturf Tunnel</strong>. Đánh bại hắn để giải cứu chú chim Wingull tên Peeko của cụ Briney, đồng thời thu hồi vali tài liệu <strong>Devon Parts</strong>.</p>
      <p>Nhằm đền đáp ơn nghĩa, ngài Mr. Stone - giám đốc tập đoàn Devon - sẽ trao tặng bạn thiết bị <strong>PokéNav</strong> đa năng và gửi gắm nhiệm vụ chuyển giao thư mật (Letter) cho Steven tại Dewford Town.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 3: Huy hiệu thứ hai - Knuckle Badge',
    order: 3,
    content: `
      <h1>Phần 3: Huy hiệu thứ hai - Knuckle Badge</h1>
      <p>Hãy quay trở lại bến tàu ở Route 104. Lúc này, cụ Briney vì biết ơn bạn cứu Peeko nên sẽ vui lòng lái du thuyền đưa bạn vượt biển đến hòn đảo cô lập <strong>Dewford Town</strong>.</p>

      <h2>1. Thử thách nhà thi đấu Dewford Gym</h2>
      <p>Nhà thi đấu này được bao phủ trong bóng tối bí ẩn, chỉ số tầm nhìn sẽ tăng dần sau mỗi lần bạn chiến đấu hạ gục môn đồ của Gym. Gym Leader tại đây là <strong>Brawly</strong> - cao thủ sử dụng Pokémon hệ Giác đấu (Fighting).</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Đòn đánh nguy hiểm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png" alt="Machop" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Machop</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 16</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giác đấu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Karate Chop, Low Kick, Bulk Up</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/307.png" alt="Meditite" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #818cf8;">Meditite</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 16</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giác đấu / Siêu linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Focus Punch, Confusion, Light Screen</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/296.png" alt="Makuhita" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Makuhita</td>
            <td style="padding: 12px 16px;">Lvl 19</td>
            <td style="padding: 12px 16px;">Giác đấu</td>
            <td style="padding: 12px 16px;">Arm Thrust, Vital Throw, Bulk Up, Reversal</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Chiến thuật dứt điểm:</strong> Hãy sử dụng Pokémon hệ Bay (như Taillow bắt ở Petalburg Woods) hoặc hệ Siêu Linh (Ralts) để khắc chế. Đặc biệt, nếu bạn bắt được một chú <strong>Sableye</strong> tại Granite Cave, do có hệ Ma, nó sẽ miễn nhiễm hoàn toàn trước mọi đòn tấn công hệ Giác Đấu của Brawly!
      </blockquote>
      <p>Sau khi chiến thắng, bạn nhận được <strong>Knuckle Badge</strong> (cho phép dùng HM08 Flash ngoài trận chiến) và <strong>TM08 Bulk Up</strong>.</p>

      <h2>2. Khám phá Granite Cave & Chuyển giao thư mật</h2>
      <p>Đi lên phía bắc của đảo bước vào hang động <strong>Granite Cave</strong>. Ở tầng sâu nhất, bạn sẽ gặp gỡ nhà vô địch kiêm nhà khảo cổ nổi tiếng <strong>Steven Stone</strong>. Trao bức thư từ Mr. Stone cho Steven và anh ta sẽ tặng bạn <strong>TM47 Steel Wing</strong> để cảm ơn.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 4: Huy hiệu thứ ba - Dynamo Badge',
    order: 4,
    content: `
      <h1>Phần 4: Huy hiệu thứ ba - Dynamo Badge</h1>
      <p>Tiếp tục lên tàu cùng Mr. Briney rời Dewford và tiến thẳng đến thành phố cảng sầm uất <strong>Slateport City</strong>.</p>

      <h2>1. Slateport City & Trạm trán Team Aqua</h2>
      <p>Trước tiên, hãy ghé thăm xưởng đóng tàu (Shipyard), sau đó di chuyển tới Viện bảo tàng Đại dương (Oceanic Museum) để chuyển giao chiếc vali <strong>Devon Parts</strong> cho thuyền trưởng Capt. Stern. Tại đây, bạn sẽ phải chạm trán và quét sạch hai tên thuộc hạ của băng đảng Team Aqua để bảo vệ tài liệu.</p>

      <h2>2. Hành trình Route 110 & Đối mặt Rival</h2>
      <p>Tiến theo lối Route 110 để đi lên phía bắc. Trên con đường này bạn sẽ phải đối đầu với Rival trong một trận đấu căng thẳng. Sau khi chiến thắng, bạn sẽ nhận được vật phẩm <strong>Itemfinder</strong> (máy tìm kiếm vật phẩm ẩn).</p>

      <h2>3. Mauville City & Thách thức dòng điện cao thế</h2>
      <p>Đặt chân đến thành phố trung tâm <strong>Mauville City</strong>:</p>
      <ul>
        <li>Ghé qua cửa hàng xe đạp Rydel's Cycles để lấy miễn phí một chiếc <strong>Bike</strong> (nên chọn Mach Bike để leo các con dốc dốc hoặc hốc sụt).</li>
        <li>Ghé thăm ngôi nhà nhỏ gần Gym để nhận <strong>HM06 Rock Smash</strong> hữu ích.</li>
      </ul>

      <p>Thách đấu Gym Leader của Mauville - lão Wattson vui tính chuyên trị Pokémon hệ Điện (Electric). Lượng sát thương từ chiêu phóng điện cực mạnh sẽ là nỗi ám ảnh trừ khi bạn có một Pokémon hệ Đất.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Chiêu thức nguy hiểm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png" alt="Voltorb" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Voltorb</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 20</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Self-Destruct (Tự phát nổ cực mạnh!), Spark</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/309.png" alt="Electrike" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Electrike</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 20</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Spark, Quick Attack, Howl</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png" alt="Magneton" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Magneton</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 22</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện / Thép</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thunderbolt, Sonic Boom, Supersonic</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/310.png" alt="Manectric" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Manectric</td>
            <td style="padding: 12px 16px;">Lvl 24</td>
            <td style="padding: 12px 16px;">Điện</td>
            <td style="padding: 12px 16px;">Spark, Quick Attack, Bite, Howl</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Đấu pháp eSports:</strong> Nếu starter của bạn là Mudkip (bấy giờ đã tiến hóa thành Marshtomp mang hệ Nước/Đất), trận đấu này hoàn toàn vô nghĩa đối với Wattson bởi Marshtomp miễn nhiễm 100% với thuộc tính Điện! Hãy spam chiêu <em>Mud Shot</em> để tiễn cả đội hình của lão lên bảng.
      </blockquote>
      <p>Phần thưởng chiến thắng: Huy hiệu <strong>Dynamo Badge</strong> (cho phép dùng HM06 Rock Smash để dọn đường) và đĩa dạy chiêu <strong>TM34 Shock Wave</strong>.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 5: Huy hiệu thứ tư - Heat Badge',
    order: 5,
    content: `
      <h1>Phần 5: Huy hiệu thứ tư - Heat Badge</h1>
      <p>Sau khi chiến thắng tại Mauville, hãy đi lên phía bắc qua các Route 111, 112, vượt qua con đường rực lửa <strong>Fiery Path</strong> để đến thị trấn đầy tro bụi núi lửa <strong>Fallarbor Town</strong>.</p>

      <h2>1. Sự kiện tại Meteor Falls & Mt. Chimney</h2>
      <p>Từ Fallarbor, hãy tiến qua Route 114 để thâm nhập vào hang động <strong>Meteor Falls</strong>. Tại đây, bạn sẽ tận mắt chứng kiến cuộc đọ sức nảy lửa ban đầu giữa hai băng đảng tà ác <strong>Team Magma</strong> và <strong>Team Aqua</strong>.</p>
      <p>Quay trở lại Route 112, lúc này trạm cáp treo (Cable Car) đã được mở khóa. Hãy lên đỉnh núi lửa <strong>Mt. Chimney</strong>, vượt qua các toán quân Magma và đánh bại thủ lĩnh tối cao của chúng - <strong>Maxie</strong> để bảo vệ quả thiên thạch.</p>

      <h2>2. Đặt chân tới Lavaridge Town & Vượt qua ải lửa Flannery</h2>
      <p>Đi xuống núi qua con đường dốc Jagged Pass đầy dung nham để tới thị trấn suối nước nóng <strong>Lavaridge Town</strong>. Hãy bước vào Lavaridge Gym thách đấu cô nàng thủ lĩnh tóc đỏ bốc lửa <strong>Flannery</strong> - chuyên gia hệ Lửa (Fire).</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Đòn đánh đáng gờm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/322.png" alt="Numel" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Numel</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 24</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Overheat, Sunny Day, Magnitude</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/218.png" alt="Slugma" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Slugma</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 24</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Overheat, Sunny Day, Smog</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/323.png" alt="Camerupt" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ea580c;">Camerupt</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 26</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Overheat, Magnitude, Focus Energy</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/324.png" alt="Torkoal" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fb7185;">Torkoal</td>
            <td style="padding: 12px 16px;">Lvl 29</td>
            <td style="padding: 12px 16px;">Lửa</td>
            <td style="padding: 12px 16px;">Overheat, Body Slam, Iron Defense, Attract</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Khắc chế cứng:</strong> Hãy sử dụng các đòn tấn công hệ Nước mạnh mẽ (như Water Pulse) hoặc Đất (Magnitude/Dig). Khi ra khỏi Gym, Rival sẽ trao cho bạn chiếc kính <strong>Go-Goggles</strong> cho phép bạn thoải mái băng qua sa mạc cát bụi ở Route 111.
      </blockquote>
      <p>Phần thưởng: Huy hiệu <strong>Heat Badge</strong> (cho phép dùng HM04 Strength dọn đá tảng) và <strong>TM50 Overheat</strong>.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 6: Huy hiệu thứ năm - Balance Badge',
    order: 6,
    content: `
      <h1>Phần 6: Huy hiệu thứ năm - Balance Badge</h1>
      <p>Đã đến lúc thực hiện lời hứa của một người đàn ông thực thụ! Hãy quay trở lại thành phố ban đầu <strong>Petalburg City</strong> để đối đầu thách thức trực tiếp bố của bạn - Norman.</p>

      <h2>1. Cuộc chiến gia đình tại Petalburg Gym</h2>
      <p>Nhà thi đấu của Norman chuyên về Pokémon hệ Thường (Normal) với sức mạnh thuần vật lý cực lớn. Hãy đặc biệt cẩn trọng trước hai quái thú Slaking sở hữu chỉ số cơ bản tương đương Pokémon huyền thoại!</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Chiêu thức đáng sợ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/327.png" alt="Spinda" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Spinda</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 27</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Teeter Dance (Gây rối loạn diện rộng), Facade</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/288.png" alt="Vigoroth" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a1a1aa;">Vigoroth</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 27</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Slash, Feint Attack, Encore</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/264.png" alt="Linoone" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #71717a;">Linoone</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Slash, Belly Drum, Covet</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/289.png" alt="Slaking" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Slaking</td>
            <td style="padding: 12px 16px;">Lvl 31</td>
            <td style="padding: 12px 16px;">Thường</td>
            <td style="padding: 12px 16px;">Counter, Yawn, Faint Attack, Facade</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Mẹo eSports hạ gục Slaking:</strong> Tuy Slaking có chỉ số tấn công và máu khổng lồ nhưng nó mang đặc tính <strong>Truant</strong> (lười biếng) - tức là cứ sau 1 lượt đánh nó bắt buộc phải nghỉ 1 lượt. Hãy sử dụng chiêu thức <strong>Protect</strong> (Bảo vệ) luân phiên để vô hiệu hóa hoàn toàn lượt tấn công của nó, hoặc sử dụng các đòn Giác Đấu (Fighting) để hạ gục nhanh chóng!
      </blockquote>

      <p>Sau khi chiến thắng Norman, hãy ghé thăm ngôi nhà nhỏ của bố mẹ Wally ngay bên cạnh Gym để nhận phần thưởng danh giá: <strong>HM03 Surf</strong> (cho phép lướt sóng di chuyển trên mặt nước rộng lớn).</p>
      <p>Phần thưởng: Huy hiệu <strong>Balance Badge</strong> và <strong>TM42 Facade</strong>.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 7: Huy hiệu thứ sáu - Feather Badge',
    order: 7,
    content: `
      <h1>Phần 7: Huy hiệu thứ sáu - Feather Badge</h1>
      <p>Dùng chiêu Surf lướt qua bãi nước phía đông thành phố Mauville để đặt chân sang Route 118, sau đó đi dọc lên khu rừng nhiệt đới Route 119 rậm rạp cỏ cao.</p>

      <h2>1. Giải cứu Weather Institute & Pokémon Castform</h2>
      <p>Tại con đường Route 119, bạn hãy đột nhập giải cứu Viện nghiên cứu Thời tiết (Weather Institute) khỏi toán chiếm đóng của băng đảng tà ác Team Aqua. Để báo ơn cứu giúp, các nhà khoa học sẽ trao tặng bạn chú Pokémon thời tiết đặc biệt độc quyền <strong>Castform</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/351.png" style="max-width:32px; vertical-align:middle;" />.</p>

      <h2>2. Fortree City & Vật phẩm Devon Scope</h2>
      <p>Băng qua cây cầu để tiến tới thành phố trên cây độc đáo <strong>Fortree City</strong>. Khi bạn muốn tiếp cận nhà thi đấu, bạn sẽ thấy lối vào bị chặn bởi một vật thể vô hình tàng hình. Hãy tiếp tục đi sang Route 120, bạn gặp Steven Stone trên cầu. Anh ta sẽ trao cho bạn chiếc kính <strong>Devon Scope</strong> giúp phát hiện các Pokémon tàng hình (Kecleon).</p>

      <h2>3. Thách đấu Fortree Gym - Winona</h2>
      <p>Dùng kính Devon Scope để dọn dẹp chướng ngại vật tàng hình và thách đấu Gym Leader <strong>Winona</strong> - chuyên gia sử dụng Pokémon hệ Bay (Flying) cực kỳ thanh thoát.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Chiêu thức đáng sợ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/333.png" alt="Swablu" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Swablu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Mirror Move, Perish Song, Safeguard</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/357.png" alt="Tropius" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Tropius</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sunny Day, Solar Beam, Synthesis</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/279.png" alt="Pelipper" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Pelipper</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Supersonic, Protect</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/227.png" alt="Skarmory" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Skarmory</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 31</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thép / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Steel Wing, Air Cutter, Sand Attack</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/334.png" alt="Altaria" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Altaria</td>
            <td style="padding: 12px 16px;">Lvl 33</td>
            <td style="padding: 12px 16px;">Rồng / Bay</td>
            <td style="padding: 12px 16px;">Dragon Breath, Dragon Dance, Earthquake, Aerial Ace</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Mẹo eSports:</strong> Át chủ bài Altaria của Winona vô cùng khó chịu nhờ buff Dragon Dance tăng tốc và sát thương. Hãy sử dụng các đòn đánh thuộc tính <strong>Băng (Ice)</strong> dứt khoát vì Altaria mang song hệ Rồng/Bay sẽ nhận tới <strong>x4 sát thương hệ Băng</strong>!
      </blockquote>
      <p>Phần thưởng chiến thắng: Huy hiệu <strong>Feather Badge</strong> (cho phép dùng HM02 Fly để bay lượn tự do ngoài bản đồ) và <strong>TM40 Aerial Ace</strong>.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 8: Huy hiệu thứ bảy - Mind Badge',
    order: 8,
    content: `
      <h1>Phần 8: Huy hiệu thứ bảy - Mind Badge</h1>
      <p>Hành trình tiếp tục đi dọc qua Route 120, 121 để đặt chân đến thành phố cảng lớn nhất vùng Hoenn - <strong>Lilycove City</strong>. Hãy sẵn sàng đánh bại Rival lần cuối cùng ngay trước cổng đại siêu thị Lilycove Department Store.</p>

      <h2>1. Ngăn chặn băng Magma & Aqua tàn ác</h2>
      <ul>
        <li><strong>Sự kiện Mt. Pyre:</strong> Đi qua Route 122 lướt sóng ra ngọn núi nghĩa trang <strong>Mt. Pyre</strong>. Tiến lên đỉnh núi, bạn sẽ chứng kiến Team Aqua cướp đi Red Orb huyền thoại, đồng thời bạn nhận được cổ vật <strong>Magma Emblem</strong> từ các trưởng lão.</li>
        <li><strong>Đột nhập Magma Hideout:</strong> Quay trở lại dốc núi Jagged Pass (Mt. Chimney). Huy hiệu Magma Emblem sẽ tự phát sáng và mở ra cánh cổng dẫn tới sào huyệt sâu thẳm của Team Magma. Đi sâu vào trong, đánh bại thủ lĩnh <strong>Maxie</strong> ngay khi hắn kịp đánh thức thần thú lục địa <strong>Groudon</strong> trốn thoát.</li>
        <li><strong>Đột kích Aqua Hideout:</strong> Bay trở lại Lilycove City, tiến ra bờ biển phía đông lẻn vào sào huyệt sâu dưới nước của Team Aqua. Đừng quên thu thập vật phẩm <strong>Master Ball</strong> cực kỳ giá trị và duy nhất trong hầm kho báu của chúng trước khi tên Admin chặn đường bạn để thủ lĩnh Archie tẩu thoát bằng tàu ngầm!</li>
      </ul>

      <h2>2. Khám phá Mossdeep City & Trận đấu đôi thế kỷ</h2>
      <p>Lướt sóng qua Route 124 tiến tới thành phố đảo vũ trụ <strong>Mossdeep City</strong>. Hãy bước vào Mossdeep Gym thách đấu cặp song sinh huyền thoại <strong>Tate & Liza</strong> trong trận chiến phối hợp đôi (Double Battle) vô cùng cân não!</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Đòn đánh nguy hiểm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/344.png" alt="Claydol" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Claydol</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đất / Siêu linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Earthquake, Psychic, Ancient Power, Light Screen</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/178.png" alt="Xatu" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Xatu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Siêu linh / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic, Confuse Ray, Calm Mind, Sunny Day</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/337.png" alt="Lunatone" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a1a1aa;">Lunatone</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Siêu linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic, Hypnosis, Cosmic Power, Light Screen</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/338.png" alt="Solrock" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f97316;">Solrock</td>
            <td style="padding: 12px 16px;">Lvl 42</td>
            <td style="padding: 12px 16px;">Đá / Siêu linh</td>
            <td style="padding: 12px 16px;">Psychic, Flamethrower, Sunny Day, Solar Beam</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Chiến thuật hạ gục đỉnh cao:</strong> Trận đấu đôi này vô cùng khó nhằn. Hãy dùng các Pokémon có chiêu thức sát thương đa mục tiêu như <strong>Surf (Lướt sóng)</strong> hoặc các đòn tấn công hệ Ma/Bóng Tối khắc chế cứng. Sau trận đấu, hãy qua nhà của Steven Stone tại thành phố để nhận <strong>HM08 Dive</strong> (lặn sâu dưới đại dương).
      </blockquote>
      <p>Phần thưởng: Huy hiệu <strong>Mind Badge</strong> và <strong>TM04 Calm Mind</strong>.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 9: Đỉnh điểm cốt truyện & Huy hiệu thứ tám',
    order: 9,
    content: `
      <h1>Phần 9: Đỉnh điểm cốt truyện & Huy hiệu thứ tám</h1>
      <p>Cuộc xung đột địa cầu bước vào giai đoạn đỉnh điểm nguy cấp nhất!</p>

      <h2>1. Seafloor Cavern & Đánh thức Kyogre</h2>
      <p>Sử dụng chiêu Dive lặn xuống đáy nước biển sâu ở Route 128 để tìm lối vào hang động tàu ngầm <strong>Seafloor Cavern</strong>. Nổi lên mặt nước giải các câu đố đá đẩy, tiến sâu vào sâu thẳm đánh bại thủ lĩnh Team Aqua - <strong>Archie</strong> ngay khi hắn đánh thức ác thú đại dương <strong>Kyogre</strong> thoát đi. Thời tiết toàn cầu rơi vào hỗn loạn tột cùng với mưa bão sấm sét xen kẽ nắng gắt rực lửa cực kỳ thảm khốc.</p>

      <h2>2. Truy lùng Rayquaza cứu thế tại Sky Pillar</h2>
      <p>Lặn xuống lòng biển Sootopolis City tại Route 126 nổi lên để vào trung tâm miệng núi lửa. Gặp gỡ Steven và Wallace tại lối vào hang động <strong>Cave of Origin</strong>. Bạn sẽ được chỉ dẫn đi tìm kiếm thần thú cứu cánh thứ ba để ngăn chặn thảm họa.</p>
      <p>Tiến dọc lướt sóng qua Route 129, 130, 131 bước chân vào tòa tháp cổ kính cao chọc trời <strong>Sky Pillar</strong>. Vượt qua các vết nứt sụt lún nguy hiểm bằng chiếc Mach Bike tốc độ cao, leo lên đỉnh tháp để diện kiến và đánh thức Pokémon rồng huyền thoại <strong>Rayquaza</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png" style="max-width:32px; vertical-align:middle;" />.</p>
      <p>Chứng kiến đoạn phim hoạt cảnh (cutscene) kinh điển khi rồng thần Rayquaza giáng thế dẹp tan hoàn toàn cuộc chiến khốc liệt giữa Groudon và Kyogre, cứu rỗi nhân loại Hoenn thành công!</p>

      <h2>3. Thách đấu Sootopolis Gym - Juan</h2>
      <p>Nhận phần thưởng <strong>HM07 Waterfall</strong> từ Wallace để trèo thác nước. Sau đó thách đấu Gym Leader cuối cùng của Sootopolis - <strong>Juan</strong> chuyên sử dụng Pokémon hệ Nước (Water).</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Chiêu thức cốt lõi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/370.png" alt="Luvdisc" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Luvdisc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Sweet Kiss, Attract</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/340.png" alt="Whiscash" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Whiscash</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rain Dance, Earthquake, Water Pulse, Amnesia</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/364.png" alt="Sealeo" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Sealeo</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 43</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Băng / Nước</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Aurora Beam, Body Slam, Water Pulse, Hail</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/342.png" alt="Crawdaunt" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ef4444;">Crawdaunt</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 43</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Bóng tối</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Crabhammer, Taunt, Leer</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/230.png" alt="Kingdra" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Kingdra</td>
            <td style="padding: 12px 16px;">Lvl 46</td>
            <td style="padding: 12px 16px;">Nước / Rồng</td>
            <td style="padding: 12px 16px;">Water Pulse, Ice Beam, Double Team, Rest</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Cảnh báo Kingdra:</strong> Con Kingdra của Juan vô cùng khó chịu với combo <em>Double Team</em> (tăng né tránh) và <em>Rest</em> (hồi đầy máu kết hợp Chesto Berry thức tỉnh lập tức). Hãy hạ gục nó thật nhanh bằng các chiêu thức mạnh mẽ không thể trượt hoặc trạng thái xấu (độc độc, tê liệt).
      </blockquote>
      <p>Phần thưởng: Huy hiệu cuối cùng <strong>Rain Badge</strong> và <strong>TM03 Water Pulse</strong>.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 10: Elite Four và Champion Wallace',
    order: 10,
    content: `
      <h1>Phần 10: Elite Four và Champion Wallace</h1>
      <p>Thử thách vĩ đại cuối cùng trên con đường chạm tay vào ngôi vị Huyền thoại Võ địch vùng Hoenn!</p>

      <h2>1. Ever Grande City & Thử thách Victory Road</h2>
      <p>Sử dụng chiêu Waterfall trèo lên thác nước hùng vĩ tại Route 128 đặt chân tới <strong>Ever Grande City</strong>. Hãy tiến vào hang động gian nan nhất game <strong>Victory Road</strong> (bạn sẽ cần mang theo đầy đủ các chiêu thức dọn đường: Surf, Strength, Rock Smash, Waterfall và Flash). Ở cuối lối ra của hang, hãy đánh bại người bạn <strong>Wally</strong> một lần nữa để khẳng định bản lĩnh tuyệt đối.</p>

      <h2>2. Sẵn sàng cho Pokémon League</h2>
      <p>Hãy bay về Lilycove Department Store mua thật nhiều vật phẩm hồi máu tối tân như <strong>Full Restore</strong> và <strong>Revive</strong>. Cấp độ khuyến nghị của đội hình chính nên đạt từ <strong>Lvl 50-55 trở lên</strong>!</p>

      <h2>3. Đối diện Tứ Đại Thiên Vương (Elite Four)</h2>

      <h3>Thành viên 1: Sidney (Chuyên trị hệ Bóng tối - Dark)</h3>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 80px;">Sprite</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Khắc chế tốt nhất</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/262.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold;">Mightyena (Lvl 46)</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hệ Bóng tối</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Hệ Giác đấu (Fighting) / Côn trùng (Bug)</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/332.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold;">Cacturne (Lvl 46)</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hệ Cỏ / Bóng tối</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Đòn hệ Côn trùng (nhận x4 sát thương cực khủng!)</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/275.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold;">Shiftry (Lvl 48)</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hệ Cỏ / Bóng tối</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Đòn hệ Côn trùng (nhận x4 sát thương)</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/342.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold;">Crawdaunt (Lvl 48)</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hệ Nước / Bóng tối</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Hệ Giác đấu / Cỏ / Điện</td>
          </tr>
          <tr>
            <td style="padding: 10px; text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/359.png" /></td>
            <td style="padding: 10px; font-weight:bold;">Absol (Lvl 49)</td>
            <td style="padding: 10px;">Hệ Bóng tối</td>
            <td style="padding: 10px; color:#10b981;">Hệ Giác đấu (Fighting)</td>
          </tr>
        </tbody>
      </table>

      <h3>Thành viên 2: Phoebe (Chuyên trị hệ Ma - Ghost)</h3>
      <p>Phoebe sở hữu các Pokémon hệ Ma có năng lực phòng ngự cao và có thể gây trạng thái xấu cực kỳ ức chế (nhầm lẫn, nguyền rủa). Đội hình gồm:</p>
      <ul>
        <li><strong>Dusclops (Lvl 48)</strong> - Hệ Ma</li>
        <li><strong>Banette (Lvl 49)</strong> - Hệ Ma</li>
        <li><strong>Sableye (Lvl 50)</strong> - Hệ Ma / Bóng tối (Không có điểm yếu thuộc tính nào ở Gen 3)</li>
        <li><strong>Banette (Lvl 49)</strong> - Hệ Ma</li>
        <li><strong>Dusclops (Lvl 51)</strong> - Hệ Ma</li>
      </ul>
      <p><em>Mẹo đấu:</em> Hãy dùng Pokémon hệ Bóng Tối (Dark) có đòn tấn công vật lý mạnh vì hệ Ma có phòng ngự vật lý tương đối yếu (trừ Dusclops).</p>

      <h3>Thành viên 3: Glacia (Chuyên trị hệ Băng - Ice)</h3>
      <p>Glacia sử dụng các đòn Blizzard tầm đánh cực mạnh dưới trời mưa tuyết. Đội hình gồm:</p>
      <ul>
        <li><strong>Glalie (Lvl 50)</strong> - Hệ Băng</li>
        <li><strong>Sealeo (Lvl 50)</strong> - Hệ Băng / Nước</li>
        <li><strong>Sealeo (Lvl 52)</strong> - Hệ Băng / Nước</li>
        <li><strong>Glalie (Lvl 52)</strong> - Hệ Băng</li>
        <li><strong>Walrein (Lvl 53)</strong> - Hệ Băng / Nước (Máu cực kỳ trâu bò!)</li>
      </ul>
      <p><em>Mẹo đấu:</em> Sử dụng các đòn tấn công hệ <strong>Võ Thuật (Fighting)</strong> hoặc hệ <strong>Điện (Electric)</strong> để khắc chế tốt các mục tiêu lai hệ Nước.</p>

      <h3>Thành viên 4: Drake (Chuyên trị hệ Rồng - Dragon)</h3>
      <p>Drake sở hữu những long thú khổng lồ có sức tấn công hủy diệt bậc nhất. Đội hình gồm:</p>
      <ul>
        <li><strong>Shelgon (Lvl 52)</strong> - Hệ Rồng</li>
        <li><strong>Altaria (Lvl 54)</strong> - Hệ Rồng / Bay</li>
        <li><strong>Kingdra (Lvl 53)</strong> - Hệ Rồng / Nước</li>
        <li><strong>Flygon (Lvl 53)</strong> - Hệ Đất / Rồng</li>
        <li><strong>Salamence (Lvl 55)</strong> - Hệ Rồng / Bay (Quái thú hủy diệt!)</li>
      </ul>
      <p><em>Mẹo đấu:</em> Ngoại trừ Kingdra, tất cả Pokémon hệ Rồng/Bay hoặc Đất/Rồng của Drake đều nhận <strong>gấp 4 lần sát thương hệ Băng (Ice)</strong>! Chỉ cần một chiêu thức <strong>Ice Beam</strong> hay <strong>Blizzard</strong> chuẩn xác là bạn có thể dễ dàng dọn dẹp sạch sẽ sàn đấu.</p>

      <h2>4. Trận chiến Vương quyền: Nhà vô địch Wallace (Hệ Nước - Water)</h2>
      <p>Vượt qua Tứ đại thiên vương, bạn bước vào căn phòng ngai vàng đối diện Nhà Vô Địch tối cao - <strong>Wallace</strong>!</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Song Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Chiến thuật triệt tiêu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/321.png" alt="Wailord" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Wailord</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 57</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Máu cực kỳ khổng lồ. Hãy dùng đòn hệ Điện (Thunderbolt) dứt điểm nhanh tránh nó dùng Double-Edge.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png" alt="Tentacruel" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Tentacruel</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 55</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Có chỉ số kháng phép (Special Defense) cực kỳ trâu. Khắc chế bằng đòn vật lý hệ Đất (Earthquake) hoặc Siêu Linh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/272.png" alt="Ludicolo" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Ludicolo</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Cỏ</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Kháng cả chiêu hệ Điện và Nước. Khắc chế tốt nhất bằng các đòn tấn công hệ Bay (Flying) hoặc hệ Bọ (Bug).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/340.png" alt="Whiscash" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Whiscash</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Kháng hoàn toàn thuộc tính Điện. Tuy nhiên nhận x4 sát thương chí tử từ các chiêu thức hệ Cỏ (Grass). Hãy dùng Giga Drain!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" alt="Gyarados" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #1e3a8a;">Gyarados</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Sát thương vật lý siêu mạnh mẽ. Do có song hệ Nước/Bay, nó nhận gấp 4 lần sát thương từ đòn hệ Điện (Electric). Hãy dùng Thunderbolt tiễn bay nó!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/350.png" alt="Milotic" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Milotic</td>
            <td style="padding: 12px 16px;">Lvl 58</td>
            <td style="padding: 12px 16px;">Nước</td>
            <td style="padding: 12px 16px; color: #10b981;">Át chủ bài tối thượng cực kỳ trâu bò, có chiêu Ice Beam và hồi máu Rest. Hãy kiên trì dùng các đòn hệ Điện/Cỏ mạnh mẽ nhất của bạn để hạ gục nó!</td>
          </tr>
        </tbody>
      </table>

      <p>Sau khi đánh bại Wallace, chúc mừng bạn! Bạn đã chính thức bước lên ngai vàng danh giá nhất thế giới Pokémon, ghi danh vào bảng vàng Hall of Fame và kết thúc trọn vẹn chương truyện chính của <strong>Pokémon Emerald</strong> huyền thoại!</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 11: Bí mật Pokémon Siêu Hiếm & Huyền Thoại (Late-game / Post-game)',
    order: 11,
    language: 'vi',
    content: `
      <h1>Phần 11: Bí mật Pokémon Siêu Hiếm & Huyền Thoại (Late-game / Post-game)</h1>
      <p>Bên cạnh cốt truyện chính, Pokémon Emerald còn chứa đựng một thế giới bí ẩn khổng lồ với những loài Pokémon huyền thoại và siêu hiếm mà bất kỳ nhà huấn luyện nào cũng khao khát sở hữu.</p>

      <h2>1. Latias hoặc Latios (Roaming Pokémon)</h2>
      <p>Sau khi đánh bại Elite Four, bạn sẽ thức dậy ở nhà mình tại Littleroot Town. Hãy xuống nhà xem TV, mẹ của bạn sẽ hỏi chú Pokémon bí ẩn xuất hiện trên bản tin có màu gì:</p>
      <ul>
        <li><strong>Chọn Red (Đỏ):</strong> Latias <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/380.png" style="max-width:32px; vertical-align:middle;" /> sẽ xuất hiện hoang dã trên toàn bản đồ.</li>
        <li><strong>Chọn Blue (Xanh):</strong> Latios <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/381.png" style="max-width:32px; vertical-align:middle;" /> sẽ xuất hiện hoang dã trên toàn bản đồ.</li>
      </ul>
      <blockquote>
        <strong>Mẹo bắt Lati@s:</strong> Do chúng liên tục đổi Route ngẫu nhiên mỗi khi bạn di chuyển, hãy mang theo Pokémon có chiêu <em>Mean Look</em> (như Crobat, Golbat) hoặc Pokémon có đặc tính <em>Shadow Tag</em> (như Wobbuffet) để ngăn chúng bỏ chạy. Ném Master Ball ngay lập tức hoặc làm suy yếu và quăng Ultra Ball!
      </blockquote>

      <h2>2. Thần thú Địa cầu: Groudon & Kyogre</h2>
      <p>Emerald cho phép bạn bắt cả Groudon <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/383.png" style="max-width:32px; vertical-align:middle;" /> và Kyogre <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png" style="max-width:32px; vertical-align:middle;" /> ở cấp độ 70 tại giai đoạn hậu game:</p>
      <ol>
        <li>Đến Viện Thời tiết (Weather Institute) trên Route 119, nói chuyện với giáo sư ở tầng 2.</li>
        <li>Nếu ông báo <strong>"Hạn hán" (Drought)</strong> tại một Route: Hãy đến ngay đó tìm hang đá <strong>Terra Cave</strong> để bắt Groudon.</li>
        <li>Nếu ông báo <strong>"Mưa lớn" (Heavy Rain)</strong> tại một vùng biển: Hãy dùng Surf/Dive đến đó tìm hang nước ngầm <strong>Marine Cave</strong> để bắt Kyogre.</li>
      </ol>
      <blockquote>
        <strong>Lưu ý:</strong> Hãy đến bắt ngay lập tức! Nếu bạn đổi bản đồ hoặc chần chừ quá lâu, thời tiết sẽ thay đổi và hang động sẽ di chuyển sang Route khác.
      </blockquote>

      <h2>3. Bộ ba tượng đá Golem cổ đại (Regis)</h2>
      <p>Để mở khóa ba hang đá của Regirock, Regice, và Registeel, bạn cần giải mã Sealed Chamber hóc búa nhất game:</p>
      <ul>
        <li><strong>Chuẩn bị:</strong> Pokémon có chiêu <em>Dig, Surf, Dive</em>. Bắt một con <strong>Relicanth</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/369.png" style="max-width:24px; vertical-align:middle;" /> (dưới đáy biển Sootopolis) và một con <strong>Wailord</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/321.png" style="max-width:24px; vertical-align:middle;" /> (tiến hóa từ Wailmer ở level 40).</li>
        <li><strong>Mở cửa hang cổ đại:</strong> Xếp Relicanth ở vị trí <strong>ĐẦU TIÊN</strong> và Wailord ở vị trí <strong>CUỐI CÙNG</strong> trong đội hình của bạn. Lướt sóng ra vùng nước xiết Route 134, lặn xuống hang ngầm Sealed Chamber. Lên bờ, đọc bảng chữ nổi Braille và dùng chiêu <strong>Dig</strong> để mở thông phòng trong. Đọc tấm bia cuối cùng để kích hoạt tiếng động mở hang Regis trên toàn bản đồ.</li>
      </ul>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Golem</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Địa điểm</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Câu đố mở khóa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/377.png" alt="Regirock" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #b45309;">Regirock (Lvl 40)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sa mạc Route 111 (Desert Ruins)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đọc bảng chữ nổi, đi sang trái 2 bước, lùi xuống 2 bước, sau đó dùng chiêu <strong>Rock Smash</strong>.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/378.png" alt="Regice" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Regice (Lvl 40)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Biển phía tây Route 105 (Island Cave)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đọc bảng chữ nổi, chạy dọc theo sát mép tường căn phòng đúng một vòng tròn không dừng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/379.png" alt="Registeel" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #94a3b8;">Registeel (Lvl 40)</td>
            <td style="padding: 12px 16px;">Vùng đồi Route 120 (Ancient Tomb)</td>
            <td style="padding: 12px 16px;">Đọc bảng chữ nổi, di chuyển ra đúng tâm căn phòng và sử dụng chiêu <strong>Flash</strong>.</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Săn Pokémon siêu hiếm và trao đổi</h2>
      <ul>
        <li><strong>Bagon (Metagross tương lai):</strong> Quay lại hang Meteor Falls, dùng Surf và Waterfall leo thác lên tầng sâu nhất. Bagon <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/371.png" style="max-width:24px; vertical-align:middle;" /> chỉ xuất hiện tại dải đất nhỏ hẹp chứa đĩa TM02 Dragon Claw với tỉ lệ 25%.</li>
        <li><strong>Feebas & Milotic:</strong> Chỉ xuất hiện tại 6 ô nước ngẫu nhiên trên toàn bộ dòng sông Route 119. Hãy dùng cần câu Old Rod câu thử từng ô nước một vài lần. Cho Feebas <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/349.png" style="max-width:24px; vertical-align:middle;" /> ăn Pokéblock màu Xanh (Blended từ Pamtre hoặc Kelpsy Berry) để max chỉ số Beauty trước khi cho lên cấp để tiến hóa thành Milotic.</li>
        <li><strong>Beldum (Steven's Gift):</strong> Hậu game, ghé thăm nhà Steven ở Mossdeep City để nhận Beldum <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/374.png" style="max-width:24px; vertical-align:middle;" /> level 5 đặt sẵn trong quả Pokéball trên bàn.</li>
        <li><strong>NPC Trades (Trao đổi trong game):</strong>
          <ul>
            <li><strong>Seedot:</strong> Đổi Ralts với NPC ở Rustboro City (nhận Seedot tên DOTS).</li>
            <li><strong>Plusle:</strong> Đổi Volbeat với NPC ở Fortree City (nhận Plusle tên PLUSES).</li>
            <li><strong>Horsea:</strong> Đổi Bagon với NPC ở Pacifidlog Town (nhận Horsea tên SEASOR).</li>
            <li><strong>Meowth:</strong> Đổi Skitty với NPC ở Battle Frontier (nhận Meowth tên MEOWOW).</li>
          </ul>
        </li>
      </ul>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Phần 12: Toàn tập Hậu game, Battle Frontier & Vật phẩm Trấn phái',
    order: 12,
    language: 'vi',
    content: `
      <h1>Phần 12: Toàn tập Hậu game, Battle Frontier & Vật phẩm Trấn phái</h1>
      <p>Sau khi bước lên ngôi vị vô địch Pokémon League, vùng đất Hoenn vẫn còn vô vàn thử thách khắc nghiệt đang chờ đón bạn.</p>

      <h2>1. Đấu trường đỉnh cao: Battle Frontier</h2>
      <p>Mua vé tàu tại Slateport hoặc Lilycove City để đi đến hòn đảo biệt lập <strong>Battle Frontier</strong> - thử thách "end-game" thực sự của Pokémon Emerald với độ khó cực đại, bao gồm 7 cơ sở thử thách độc đáo:</p>
      <ul>
        <li><strong>Battle Tower:</strong> Đấu tháp truyền thống, chiến đấu liên tục 7 trận đơn/đôi.</li>
        <li><strong>Battle Factory:</strong> Sử dụng Pokémon "thuê" (Rental), thử thách khả năng ứng biến chiến thuật.</li>
        <li><strong>Battle Dome:</strong> Đấu giải đấu loại trực tiếp (Tournament) vô cùng hồi hộp.</li>
        <li><strong>Battle Pike & Battle Pyramid:</strong> Thử thách sinh tồn, di chuyển qua mê cung chứa đầy bẫy, trạng thái xấu và Pokémon hoang dã.</li>
        <li><strong>Battle Arena & Battle Palace:</strong> Đấu hiệp giới hạn lượt và đấu tự động phụ thuộc vào Bản tính (Nature) của Pokémon.</li>
      </ul>
      <p><em>Mục tiêu tối thượng:</em> Đánh bại các Frontier Brains để nhận Huy hiệu Bạc (Silver Symbol) và Huy hiệu Vàng (Gold Symbol) danh giá.</p>

      <h2>2. Safari Zone mở rộng (Bắt Pokémon vùng Johto)</h2>
      <p>Quay lại Safari Zone ở Route 121 sau khi phá đảo. Phía đông của khu bảo tồn sẽ được mở rộng thêm hai phân khu mới. Tại đây, bạn có thể bắt được những Pokémon hiếm vùng Johto (Gen 2) như: Mareep <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/179.png" style="max-width:24px; vertical-align:middle;" />, Houndour <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/228.png" style="max-width:24px; vertical-align:middle;" />, Gligar <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/207.png" style="max-width:24px; vertical-align:middle;" />, Teddiursa, Pineco...</p>

      <h2>3. Các tính năng hậu game lý thú</h2>
      <ul>
        <li><strong>Tái đấu Gym Leaders (Match Call):</strong> PokéNav của bạn thỉnh thoảng sẽ reo chuông báo Gym Leader cũ muốn tái đấu. Đội hình tái đấu của họ sẽ là Đấu Đôi (Double Battle) với level cực cao (50-60+) và chiêu thức tối ưu.</li>
        <li><strong>Xây Căn cứ bí mật (Secret Bases):</strong> Mua đĩa TM43 Secret Power ở chợ Slateport và dùng lên các gốc cây to rủ lá, hốc đá trên tường hoặc bụi rậm để tạo lập không gian riêng, tự do trang trí bàn ghế và poster mua tại siêu thị Lilycove.</li>
        <li><strong>Pokémon Contests:</strong> Ghé Lilycove City tham gia các cuộc thi sắc đẹp Pokémon với 5 hạng mục: Cool, Beauty, Cute, Smart và Tough.</li>
        <li><strong>Pokémon Sự Kiện (Event Pokémon):</strong> Sử dụng cheat/RetroArch để mở khóa vé tàu:
          <ul>
            <li><strong>Aurora Ticket:</strong> Đến Birth Island giải đố tam giác để bắt Deoxys <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/386.png" style="max-width:24px; vertical-align:middle;" /> (Lvl 30).</li>
            <li><strong>Old Sea Map:</strong> Đến Faraway Island bắt Mew <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png" style="max-width:24px; vertical-align:middle;" /> (Lvl 30) ẩn trong bụi cỏ.</li>
            <li><strong>Mystic Ticket:</strong> Đến Navel Rock bắt Lugia <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png" style="max-width:24px; vertical-align:middle;" /> hoặc Ho-Oh <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png" style="max-width:24px; vertical-align:middle;" /> (Lvl 70).</li>
          </ul>
        </li>
      </ul>

      <h2>4. Các vật phẩm và kỹ năng (TM) trấn phái</h2>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Tên vật phẩm / TM</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Tác dụng</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cách sở hữu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Exp. Share</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Chia sẻ kinh nghiệm cho Pokémon không cần ra trận</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nói chuyện với Mr. Stone tại Devon Corp sau khi chuyển thư cho Steven ở Dewford.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Amulet Coin</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nhân đôi tiền thưởng nhận được sau mỗi trận đấu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nói chuyện với mẹ tại nhà ở Littleroot sau khi thắng Norman (Gym 5).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Macho Brace</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nhân đôi chỉ số nỗ lực (EV) nhận được khi luyện cấp</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đánh bại cả 4 thành viên gia đình Winstrate tại căn nhà nhỏ trên Route 111.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Soothe Bell</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng nhanh điểm thân thiết (Happiness)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận tại Pokémon Fan Club trong thành phố Slateport City.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">TM13 Ice Beam</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Chiêu hệ Băng cực mạnh trị rồng và bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tìm thấy trong phòng ngầm tàu bỏ hoang Abandoned Ship ở Route 108 (cần Surf & Dive).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">TM24 Thunderbolt</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sát thương hệ Điện ổn định nhất game</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận từ Wattson sau khi tắt máy phát điện ngầm New Mauville.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">TM26 Earthquake</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Đòn hệ Đất mạnh nhất game</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nằm sâu dưới lòng hang đáy biển Seafloor Cavern.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Đá Tiến Hóa</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Dùng để tiến hóa Pokémon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lượm các mảnh Shard (Red, Blue, Yellow, Green) dưới lòng biển sâu rồi đem đổi với Treasure Hunter tại Route 124.</td>
          </tr>
        </tbody>
      </table>
    `
  }
];

const ENGLISH_CHAPTERS = [
  {
    gameVersion: 'emerald',
    chapterTitle: 'Chapter 1: The Beginning of the Journey',
    order: 1,
    language: 'en',
    content: `
      <h1>Chapter 1: The Beginning of the Journey</h1>
      <p>Welcome to the vast region of Hoenn! Your journey to become a Pokémon Champion starts in a peaceful little village called <strong>Littleroot Town</strong>.</p>

      <h2>1. Littleroot Town & The First Challenge</h2>
      <p>After adjusting the clock in your bedroom, go next door to greet May/Brendan (your Rival). Then, head north towards Route 101. Here, you will save Professor Birch from a wild Zigzagoon by choosing one of three incredibly powerful starter Pokémon:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Primary Type</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Tactical Review</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/252.png" alt="Treecko" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">TREECKO</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Grass</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Focuses on high speed, excellent for breezing through Gym 1 (Rock) and Gym 8 (Water). But struggles a bit mid-game.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png" alt="Torchic" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">TORCHIC</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Evolves into Combusken with Fire/Fighting dual-typing and massive damage output, making it a powerful carry later on.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png" alt="Mudkip" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #3b82f6;">MUDKIP</td>
            <td style="padding: 12px 16px;">Water</td>
            <td style="padding: 12px 16px; color: #cbd5e1;"><strong>The absolute best choice!</strong> Once it evolves into Marshtomp, its Water/Ground typing grants complete immunity to Electric moves, offering the smoothest run.</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Quick Tip:</strong> Select Mudkip if you want a seamless story experience and easy battles against almost all Gyms.
      </blockquote>

      <h2>2. Route 101, Oldale Town & Rival Fight</h2>
      <p>From Route 101, head straight north to <strong>Oldale Town</strong> and heal up at the Pokémon Center. Continue to Route 103 to face your Rival in your very first battle. After winning, return with your Rival to the lab in Littleroot Town to receive your <strong>Pokédex</strong> and your first <strong>Poké Balls</strong>.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Chapter 2: First Badge - Stone Badge',
    order: 2,
    language: 'en',
    content: `
      <h1>Chapter 2: First Badge - Stone Badge</h1>
      <p>Passing through the bug-infested Petalburg Woods, you will set foot in the highly industrial <strong>Rustboro City</strong>.</p>

      <h2>1. Rustboro City & Preparation</h2>
      <p>Before stepping into the Gym, visit the Pokémon School in the city to receive the useful held item <strong>Quick Claw</strong> (which increases the chance of striking first in battle).</p>

      <h2>2. Challenging Gym Leader Roxanne</h2>
      <p>The Rustboro Gym specializes in Rock-type Pokémon, led by the intelligent Roxanne. Water (Mudkip), Grass (Treecko), or Fighting-type moves will easily crush this Gym.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Dangerous Moves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png" alt="Geodude" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Geodude</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 12</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock / Ground</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock Throw, Defense Curl</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/299.png" alt="Nosepass" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a1a1aa;">Nosepass</td>
            <td style="padding: 12px 16px;">Lvl 15</td>
            <td style="padding: 12px 16px;">Rock</td>
            <td style="padding: 12px 16px;">Rock Tomb, Harden, Block</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Victory Reward:</strong> The <strong>Stone Badge</strong> (which allows you to use HM01 Cut outside of battle) and the TM move <strong>TM39 Rock Tomb</strong>.
      </blockquote>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Chapter 11: Rare & Legendary Pokémon Secrets (Late-game / Post-game)',
    order: 11,
    language: 'en',
    content: `
      <h1>Chapter 11: Rare & Legendary Pokémon Secrets (Late-game / Post-game)</h1>
      <p>Discover the rare and legendary Pokémon that await you in Hoenn's post-game world.</p>

      <h2>1. Latias or Latios (Roaming Pokémon)</h2>
      <p>After beating the Elite Four, watch the TV downstairs. Your mother will ask you what color the broadcasted Pokémon was:</p>
      <ul>
        <li><strong>Red:</strong> Latias will spawn wild across the map.</li>
        <li><strong>Blue:</strong> Latios will spawn wild across the map.</li>
      </ul>

      <h2>2. Kyogre & Groudon</h2>
      <p>Talk to the researcher at the Weather Institute (Route 119) to track Groudon's <strong>Terra Cave</strong> or Kyogre's <strong>Marine Cave</strong> across Hoenn.</p>

      <h2>3. Regirock, Regice, and Registeel</h2>
      <p>Solve the Sealed Chamber mystery by placing Relicanth first and Wailord last in your party, then using Dig/Flash/Rock Smash in their respective caves.</p>
    `
  },
  {
    gameVersion: 'emerald',
    chapterTitle: 'Chapter 12: Post-game Battle Frontier & Essential Items Guide',
    order: 12,
    language: 'en',
    content: `
      <h1>Chapter 12: Post-game Battle Frontier & Essential Items Guide</h1>
      <p>Master the ultimate challenges of Hoenn's Battle Frontier and collect game-changing items.</p>

      <h2>1. The Battle Frontier</h2>
      <p>Sail to the Battle Frontier to challenge the 7 facilities (Tower, Dome, Palace, Arena, Factory, Pike, and Pyramid) and defeat Frontier Brains for Symbols.</p>

      <h2>2. Extended Safari Zone</h2>
      <p>Catch rare Gen 2 Johto Pokémon such as Mareep, Houndour, and Gligar in the newly unlocked eastern zones of the Safari Zone.</p>

      <h2>3. Essential Items and TMs</h2>
      <ul>
        <li><strong>Exp. Share:</strong> Share experience without fighting (Devon Corp).</li>
        <li><strong>Amulet Coin:</strong> Double prize money (Littleroot Town).</li>
        <li><strong>TM13 Ice Beam:</strong> Essential Ice-type attack (Abandoned Ship).</li>
      </ul>
    `
  }
];

async function main() {
  console.log('🚀 Bắt đầu cập nhật toàn bộ 12 chương dữ liệu Walkthrough Pokémon Emerald chuẩn chỉ...');

  // Xóa dữ liệu cũ nếu có
  await prisma.walkthrough.deleteMany({
    where: { gameVersion: 'emerald' }
  });

  console.log('🧹 Đã dọn dẹp các bản ghi cũ.');

  // Thêm dữ liệu 10 chương đầy đủ bằng tiếng Việt
  for (const chapter of EMERALD_CHAPTERS) {
    const record = await prisma.walkthrough.create({
      data: {
        ...chapter,
        language: 'vi'
      }
    });
    console.log(`✅ Nạp thành công tiếng Việt: ${record.chapterTitle} (Thứ tự: ${record.order})`);
  }

  // Thêm dữ liệu chương bằng tiếng Anh
  for (const chapter of ENGLISH_CHAPTERS) {
    const record = await prisma.walkthrough.create({
      data: chapter
    });
    console.log(`✅ Nạp thành công tiếng Anh: ${record.chapterTitle} (Thứ tự: ${record.order})`);
  }

  console.log('🎉 Hoàn thành nạp dữ liệu đầy đủ các chương Walkthrough Emerald xuất sắc!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi nạp dữ liệu walkthrough:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
