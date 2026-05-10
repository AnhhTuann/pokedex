import { EMERALD_CHAPTERS, ENGLISH_EMERALD_CHAPTERS } from './walkthrough-emerald.js';

// Custom replacements for Vietnamese Sapphire Walkthrough
export const SAPPHIRE_CHAPTERS = EMERALD_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // General Replacements
  content = content
    .replace(/emerald/g, 'sapphire')
    .replace(/Emerald/g, 'Sapphire')
    .replace(/Lục Bảo/g, 'Lam Ngọc')
    .replace(/Lục bảo/g, 'Lam ngọc');

  // Chapter 2: Early game (Team Aqua is already the villain, no changes needed for team name)

  // Chapter 4: Wattson Gym 3 (Sapphire team has Magnemite lvl 22, Voltorb lvl 20, Magneton lvl 23)
  if (chapter.order === 4) {
    content = content.replace(
      /<h2>4\. Thách đấu Mauville Gym - Wattson<\/h2>[\s\S]+?<\/blockquote>/,
      `<h2>4. Thách đấu Mauville Gym - Wattson</h2>
      <p>Thách đấu Gym Leader của Mauville - lão Wattson vui tính chuyên trị Pokémon hệ Điện (Electric). Đội hình của lão trong bản Sapphire rút gọn chỉ còn 3 Pokémon nhưng cấp độ lại nhỉnh hơn một chút:</p>

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
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png" alt="Magnemite" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Magnemite</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 22</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện / Thép</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thundershock, Sonicboom, Thunder Wave</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png" alt="Voltorb" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Voltorb</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 20</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Self-Destruct (Tự phát nổ cực mạnh!), Spark, Screech</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png" alt="Magneton" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Magneton (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 23</td>
            <td style="padding: 12px 16px;">Điện / Thép</td>
            <td style="padding: 12px 16px;">Thunderbolt, Sonic Boom, Supersonic, Thunder Wave</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Đấu pháp tối ưu:</strong> Nếu bạn chọn Mudkip (đã tiến hóa thành Marshtomp mang song hệ Nước/Đất), trận đấu này vô cùng dễ dàng vì bạn miễn nhiễm hoàn toàn với hệ Điện. Hãy spam chiêu <em>Mud Shot</em> để dứt điểm nhanh chóng cả 3 Pokémon của Wattson!
      </blockquote>`
    );
  }

  // Chapter 6: Norman Gym 5 (Sapphire team has Slaking Lvl 28, Vigoroth Lvl 30, Slaking Lvl 31)
  if (chapter.order === 6) {
    content = content.replace(
      /<h2>1\. Cuộc chiến gia đình tại Petalburg Gym<\/h2>[\s\S]+?<\/blockquote>/,
      `<h2>1. Cuộc chiến gia đình tại Petalburg Gym</h2>
      <p>Nhà thi đấu của Norman chuyên về Pokémon hệ Thường (Normal) với sức mạnh thuần vật lý cực lớn. Trong bản Sapphire, Norman sở hữu hai con Slaking cực kỳ đáng sợ ở đầu và cuối trận chiến:</p>

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
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/289.png" alt="Slaking" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Slaking</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 28</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Yawn, Facade, Slack Off, Faint Attack</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/288.png" alt="Vigoroth" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a1a1aa;">Vigoroth</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Slash, Facade, Encore, Faint Attack</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/289.png" alt="Slaking" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Slaking (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 31</td>
            <td style="padding: 12px 16px;">Thường</td>
            <td style="padding: 12px 16px;">Focus Punch, Facade, Yawn, Shadow Ball</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Khắc chế Slaking:</strong> Do sở hữu đặc tính <strong>Truant</strong> (lười biếng, nghỉ một lượt sau mỗi lượt đánh), bạn hãy dùng chiêu <strong>Protect</strong> (Bảo vệ) ở lượt nó tấn công, và thoải mái dồn sát thương hệ Giác đấu (Fighting) cực mạnh vào lượt nó nghỉ ngơi!
      </blockquote>`
    );
  }

  // Chapter 7: Winona Gym 6 (Sapphire team has Swellow lvl 31, Pelipper lvl 30, Skarmory lvl 32, Altaria lvl 33)
  if (chapter.order === 7) {
    content = content.replace(
      /<h2>3\. Thách đấu Gym Leader Winona<\/h2>[\s\S]+?<\/blockquote>/,
      `<h2>3. Thách đấu Gym Leader Winona</h2>
      <p>Sử dụng thiết bị kính quét Devon Scope để phát hiện chú cá tề Kecleon tàng hình chặn đường, tiến vào nhà thi đấu Fortree thách đấu <strong>Winona</strong> - chuyên gia điều khiển Pokémon hệ Bay (Flying) kiêu sa. Trong bản Sapphire, đội hình của cô giản lược không có Tropius:</p>

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
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/277.png" alt="Swellow" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Swellow</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 31</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Double Team, Aerial Ace, Quick Attack, Endeavor</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/279.png" alt="Pelipper" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Pelipper</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Protect, Supersonic</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/227.png" alt="Skarmory" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Skarmory</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 32</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thép / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Steel Wing, Aerial Ace, Sand-Attack, Swift</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/334.png" alt="Altaria" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Altaria (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 33</td>
            <td style="padding: 12px 16px;">Rồng / Bay</td>
            <td style="padding: 12px 16px;">Dragon Dance, Dragon Breath, Earthquake, Aerial Ace</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Đấu pháp dứt điểm:</strong> Altaria cực kỳ nguy hiểm nếu được buff Dragon Dance tăng tốc và công. Hãy hạ gục nhanh nó bằng các đòn tấn công **hệ Băng (Ice)** để gây **gấp 4 lần sát thương chí tử**! Đòn hệ Điện sẽ dễ dàng hạ gục Swellow và Pelipper.
      </blockquote>`
    );
  }

  // Chapter 8: Tate & Liza Gym 7 (Sapphire team has Lunatone Lvl 42, Solrock Lvl 42)
  if (chapter.order === 8) {
    content = content
      .replace(
        /<h2>2\. Ngăn chặn âm mưu hai băng đảng Aqua & Magma<\/h2>[\s\S]+?<\/ul>/,
        `<h2>2. Đột nhập Căn cứ Tàu ngầm ngầm của Team Aqua</h2>
        <p>Trong phiên bản Sapphire, Team Aqua là lực lượng phản diện chính độc chiếm vịnh Lilycove:</p>
        <ul>
          <li><strong>Sự kiện Mt. Pyre:</strong> Vượt qua đỉnh đồi sương mù Mt. Pyre, chứng kiến thủ lĩnh <strong>Archie</strong> cuỗm mất viên <strong>Ngọc Đỏ (Red Orb)</strong>. Sau đó cụ già giữ mộ sẽ trao cho bạn viên **Ngọc Xanh (Blue Orb)** để khắc chế.</li>
          <li><strong>Căn cứ ngầm Team Aqua:</strong> Quay về Lilycove City, đột nhập vào căn cứ tàu ngầm ngầm nằm sát bờ biển phía đông. Hãy lưu ý nhặt quả bóng tối thượng **Master Ball** đặt trong phòng kho báu trước khi Archie tẩu thoát bằng tàu ngầm cải tiến.</li>
        </ul>`
      )
      .replace(
        /<h2>2\. Khám phá Mossdeep City & Trận Đấu Đôi Thế Kỷ<\/h2>[\s\S]+?<\/blockquote>/,
        `<h2>2. Khám phá Mossdeep City & Trận Đấu Đôi Thế Kỷ</h2>
        <p>Cập bến Mossdeep City và tiến thẳng vào Gym thách đấu cặp song sinh Siêu Linh <strong>Tate & Liza</strong>. Trong bản Sapphire, trận chiến này dễ thở hơn nhiều so với Emerald vì họ chỉ sở hữu đúng 2 Pokémon:</p>

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
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/337.png" alt="Lunatone" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Lunatone</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Siêu linh</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic, Hypnosis, Light Screen, Calm Mind</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/338.png" alt="Solrock" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #f97316;">Solrock</td>
              <td style="padding: 12px 16px;">Lvl 42</td>
              <td style="padding: 12px 16px;">Đá / Siêu linh</td>
              <td style="padding: 12px 16px;">Psychic, Flamethrower, Rock Slide, Sunny Day</td>
            </tr>
          </tbody>
        </table>

        <blockquote>
          <strong>Đấu pháp song song:</strong> Hãy spam chiêu thức lan rộng cực mạnh như **Surf (Lướt sóng)** để dồn sát thương cực khủng lên cả hai mục tiêu song hệ Đá/Siêu Linh cùng lúc! Thắng trận, hãy ghé nhà Steven Stone ở góc tây bắc thành phố nhận **HM08 Dive**.
        </blockquote>`
      );
  }

  // Chapter 9: Kyogre Awakening (Heavy Rain) & Sootopolis Gym Wallace
  if (chapter.order === 9) {
    content = `
      <h1>Phần 9: Cơn Thảm Họa Đại Dương & Huy Hiệu Cuối Cùng</h1>
      <p>Cơn đại hồng thủy dâng cao chưa từng thấy đe dọa nhấn chìm toàn bộ vùng đất Hoenn dưới làn nước đại dương!</p>

      <h2>1. Seafloor Cavern & Đánh thức Thần thú Kyogre</h2>
      <p>Lặn xuống rãnh biển sâu Route 128 tìm lối vào **Seafloor Cavern**. Giải các câu đố dịch chuyển tảng đá bằng Strength và hạ gục Team Aqua Leader **Archie**. Archie bất chấp cảnh báo dùng viên Ngọc Đỏ đánh thức quái thú biển khơi **Kyogre** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png" style="max-width:32px; vertical-align:middle;" />. Kyogre thức tỉnh trốn thoát, gieo rắc những cơn mưa bão sấm sét cuồng phong bao trùm toàn thế giới.</p>

      <h2>2. Chạm trán và Thu phục Kyogre tại Cave of Origin</h2>
      <p>Bay ngay đến **Sootopolis City** (lặn ở Route 126 để vào lòng núi lửa). Gặp gỡ Steven và Wallace đứng gác trước lối vào thánh địa cấm **Cave of Origin**. Họ sẽ mở đường cho bạn tiến sâu vào lòng hang tối tăm chứa dòng năng lượng cổ xưa.</p>
      <p>Tiến vào tầng đáy, đối đầu và thu phục **Kyogre (Cấp độ 45)**. Hãy hạ gục máu nó xuống thấp, ru ngủ và liên tiếp quăng Ultra Ball (hoặc dùng Master Ball nếu muốn bắt ngay tức thì). Thu phục Kyogre sẽ lập tức trả lại bầu trời quang đãng, dẹp yên bão tố hải đảo!</p>
      <blockquote>
        <strong>Điểm khác biệt:</strong> Khác với bản Emerald, trong Sapphire bạn **không cần** phải đi tìm Rayquaza tại Sky Pillar để dẹp yên bão tố. Kyogre được giải quyết trực tiếp ngay tại hang Sootopolis!
      </blockquote>

      <h2>3. Thách đấu Gym Leader tối thượng - Wallace</h2>
      <p>Bầu trời quang đãng trở lại, bước vào Gym Sootopolis khiêu chiến thủ lĩnh **Wallace** sử dụng Pokémon hệ Nước cực trâu (trong Emerald Wallace là Champion, còn trong Sapphire anh ta vẫn giữ cương vị chủ Gym thứ 8):</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Song hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Đòn đánh nguy hiểm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/370.png" alt="Luvdisc" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Luvdisc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 40</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Attract, Sweet Kiss, Flail</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/340.png" alt="Whiscash" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Whiscash</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Earthquake, Water Pulse, Amnesia, Rain Dance</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/364.png" alt="Sealeo" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Sealeo</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 40</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Băng / Nước</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Hail, Ice Ball, Body Slam</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/342.png" alt="Crawdaunt" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ef4444;">Crawdaunt</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 43</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Bóng tối</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Crabhammer, Swords Dance, Strength, Water Pulse</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/350.png" alt="Milotic" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Milotic (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 43</td>
            <td style="padding: 12px 16px;">Nước</td>
            <td style="padding: 12px 16px;">Recover (Hồi máu vô cùng ức chế!), Water Pulse, Ice Beam, Toxic</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Đấu pháp diệt Milotic:</strong> Con bài Milotic của Wallace siêu trâu bò, có khả năng hồi máu bằng Recover cực lỳ lợm. Hãy dùng đòn hệ **Điện (Electric)** hoặc **Cỏ (Grass)** mạnh nhất kết hợp với các hiệu ứng trạng thái (tê liệt/độc độc) để dứt điểm nó nhanh gọn, đoạt lấy Huy hiệu cuối cùng của giải đấu Hoenn!
      </blockquote>
      <p>Hạ gục Wallace, ông ta sẽ ban tặng bạn huy hiệu danh giá **Rain Badge** kèm chiếc máy **HM07: Waterfall** cho phép leo thác nước tiến thẳng tới Hoenn League đỉnh cao!</p>
    `;
  }

  // Chapter 10: Steven Stone Champion (Steel / Rock Type)
  if (chapter.order === 10) {
    content = content
      .replace("Elite Four và Champion Wallace", "Elite Four và Champion Steven")
      .replace("<h1>Phần 10: Tứ Đại Thiên Vương & Champion Wallace</h1>", "<h1>Phần 10: Tứ Đại Thiên Vương & Nhà Vô Địch Steven Stone</h1>")
      .replace(
        /<h2>4\. Ngai vàng vô địch: Wallace[\s\S]+?<\/p>/,
        `<h2>4. Ngai vàng vô địch: Nhà Vô Địch Steven Stone (Chuyên hệ Thép / Đá)</h2>
        <p>Vượt qua Tứ đại thiên vương lừng lẫy, bạn bước vào ngai vàng đối diện nhà vô địch tối cao của Hoenn - **Steven Stone**. Steven sở hữu những quái thú Thép, Đá và Đất có chỉ số phòng ngự vật lý cực kỳ kinh hoàng cùng sức công phá kinh thiên động địa:</p>`
      )
      .replace(
        /<table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba\(255, 255, 255, 0.08\); border-radius: 12px; overflow: hidden; background-color: rgba\(15, 15, 25, 0.5\);">[\s\S]+?<\/table>[\s\S]+?Pokémon Emerald!<\/p>/,
        `<table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(255, 255, 255, 0.04);">
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Khắc chế & Chiến thuật dứt điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/227.png" alt="Skarmory" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Skarmory</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 57</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thép / Bay</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Nó thường dùng Spikes (Rải đinh) và gây độc Toxic. Hãy dùng chiêu hệ Lửa hoặc Điện dứt điểm nó ngay tức khắc để tránh setup đinh gai.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/344.png" alt="Claydol" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Claydol</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 55</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đất / Siêu linh</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Khả năng Levitate giúp nó miễn nhiễm hệ Đất dẫm. Hãy dứt điểm bằng đòn hệ Nước, Băng hoặc Bóng Tối cực mạnh.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/306.png" alt="Aggron" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Aggron</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thép / Đá</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Nó dính **gấp 4 lần sát thương** từ chiêu hệ Đất (Earthquake) hoặc hệ Giác Đấu (Fighting). Một đòn là bốc hơi!</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/346.png" alt="Cradily" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Cradily</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Cỏ</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Siêu trâu và dai dẳng. Đánh bằng đòn hệ Băng (Ice), Giác Đấu (Fighting) hoặc Thép để dứt điểm. Kháng Đất/Nước tốt.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/348.png" alt="Armaldo" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Armaldo</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Bọ</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Sát thương vật lý cực mạnh. Sử dụng đòn hệ Nước, Đá hoặc Thép đặc biệt để dứt điểm nhanh.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png" alt="Metagross" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Metagross (Át chủ bài)</td>
              <td style="padding: 12px 16px;">Lvl 58</td>
              <td style="padding: 12px 16px;">Thép / Siêu linh</td>
              <td style="padding: 12px 16px; color: #10b981;">Kẻ hủy diệt tối thượng với đòn Meteor Mash cực thảm khốc! Khắc chế bằng đòn hệ Đất (Earthquake) hoặc hệ Lửa cực mạnh (như Overheat/Flamethrower). Tránh đối đầu vật lý tay đôi!</td>
            </tr>
          </tbody>
        </table>

        <p>Sau khi hạ gục siêu phẩm Metagross của Steven, chúc mừng bạn! Bạn đã xuất sắc lật đổ Steven Stone, chính thức bước lên ngôi vị Tân vô địch Pokémon Hoenn League tối cao, ghi danh vào bảng vàng lịch sử Hall of Fame của <strong>Pokémon Sapphire</strong>!</p>`
      );
  }

  // Chapter 11: Legendary (Latias roaming, Kyogre caught in story, Groudon uncatchable, Rayquaza Sky Pillar post-game, Regis Wailord 1st and Relicanth last)
  if (chapter.order === 11) {
    content = content
      .replace(
        /<li><strong>Chọn Red[\s\S]+?<\/ul>/,
        `<li>Trong bản Sapphire, chú Pokémon rồng huyền thoại tinh nghịch <strong>Latias</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/380.png" style="max-width:32px; vertical-align:middle;" /> sẽ mặc định xuất hiện hoang dã bay lượn ngẫu nhiên trên toàn vùng biển Hoenn sau khi bạn phá đảo (không có lựa chọn màu sắc và không có Latios xuất hiện).</li>`
      )
      .replace(
        /<h2>2\. Thần thú Địa cầu: Groudon & Kyogre<\/h2>[\s\S]+?<\/blockquote>/,
        `<h2>2. Rồng thần Vũ trụ: Rayquaza</h2>
        <p>Trong phiên bản Sapphire, Kyogre đã được bạn thu phục hoặc hạ gục trực tiếp tại Cave of Origin trong cốt truyện chính. Hậu game, hòn đảo biển sâu sẽ mở cửa cho bạn thách thức Rồng thần:</p>
        <ul>
          <li><strong>Rayquaza (Lvl 70):</strong> Hãy mang theo xe đạp Mach Bike bay tới Route 131, tiến sâu vào tòa tháp cao chọc trời <strong>Sky Pillar</strong>. Vượt qua những vết nứt sụt lún đòi hỏi kỹ thuật di chuyển xe đạp khéo léo để leo lên đỉnh tháp, chạm trán và thu phục Rayquaza ở cấp độ 70 siêu bá đạo!</li>
          <li><em>Lưu ý:</em> Groudon và Kyogre hậu game (Terra Cave/Marine Cave) không tồn tại trong bản Sapphire. Groudon là độc quyền của bản Ruby.</li>
        </ul>`
      )
      .replace(
        /xếp Relicanth ở vị trí <strong>ĐẦU TIÊN<\/strong> và Wailord ở vị trí <strong>CUỐI CÙNG<\/strong>/,
        "xếp **Wailord** ở vị trí **ĐẦU TIÊN** và **Relicanth** ở vị trí **CUỐI CÙNG** trong đội hình"
      );
  }

  // Chapter 12: Battle Tower (not Battle Frontier), no Safari Johto, no Match Call Gym leaders
  if (chapter.order === 12) {
    content = content
      .replace("Battle Frontier & Vật phẩm Trấn phái", "Battle Tower & Vật phẩm Trấn phái")
      .replace("<h1>Phần 12: Toàn tập Hậu game, Battle Frontier & Vật phẩm Trấn phái</h1>", "<h1>Phần 12: Toàn tập Hậu game, Battle Tower & Vật phẩm Trấn phái</h1>")
      .replace(
        /<h2>1\. Đấu trường đỉnh cao: Battle Frontier<\/h2>[\s\S]+? Frontier Brains[\s\S]+?<\/p>/,
        `<h2>1. Tháp Quyết Đấu đỉnh cao: Battle Tower</h2>
        <p>Đón tàu tại Slateport hoặc Lilycove City tiến thẳng tới hòn đảo end-game độc lập chứa <strong>Battle Tower</strong>. Khác với đấu trường Battle Frontier khổng lồ của Emerald, ở phiên bản Sapphire bạn sẽ tập trung chinh phục thử thách Leo Tháp truyền thống cao độ:</p>
        <ul>
          <li><strong>Thử thách Leo Tháp:</strong> Chiến đấu liên tiếp các chuỗi 7 trận đơn hoặc đôi với các huấn luyện viên ngẫu nhiên có AI cực cao.</li>
          <li>Cấp độ chiến đấu được chia làm 2 phân khúc: Cấp độ 50 và Cấp độ tự do (Open Level).</li>
          <li>Chiến thắng liên tiếp để nhận ruy băng danh giá và các điểm BP đổi lấy trang bị xịn!</li>
        </ul>`
      )
      .replace(
        /<h2>2\. Safari Zone mở rộng[\s\S]+?<\/li>/,
        "<!-- No Safari Zone Johto Expansion in Sapphire -->"
      )
      .replace(
        /<li><strong>Tái đấu Gym Leaders \(Match Call\):<\/strong>[\s\S]+?<\/li>/,
        "<!-- No Gym Leader rematches in Sapphire -->"
      );
  }

  let chapterTitle = chapter.chapterTitle
    .replace(/emerald/g, 'sapphire')
    .replace(/Emerald/g, 'Sapphire')
    .replace(/Lục Bảo/g, 'Lam Ngọc')
    .replace(/Lục bảo/g, 'Lam ngọc');

  if (chapter.order === 9) {
    chapterTitle = "Phần 9: Đối diện Thần thú Kyogre & Huy hiệu cuối cùng";
  } else if (chapter.order === 10) {
    chapterTitle = "Phần 10: Elite Four và Champion Steven Stone";
  } else if (chapter.order === 12) {
    chapterTitle = "Phần 12: Toàn tập Hậu game, Battle Tower & Vật phẩm Trấn phái";
  }

  return {
    ...chapter,
    gameVersion: 'sapphire',
    chapterTitle,
    content
  };
});

// Custom replacements for English Sapphire Walkthrough
export const ENGLISH_SAPPHIRE_CHAPTERS = ENGLISH_EMERALD_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // General Replacements
  content = content
    .replace(/emerald/g, 'sapphire')
    .replace(/Emerald/g, 'Sapphire');

  // Chapter 2: Early game (Team Aqua is already the main villain, no changes needed)

  // Chapter 4: Wattson Gym 3
  if (chapter.order === 4) {
    content = content.replace(
      /<h2>4\. Challenging Mauville Gym Leader Wattson<\/h2>[\s\S]+?<\/blockquote>/,
      `<h2>4. Challenging Mauville Gym Leader Wattson</h2>
      <p>Challenge Wattson, the energetic Electric-type Gym Leader of Mauville City. In Sapphire, his roster is streamlined down to 3 Pokémon, but with slightly higher levels:</p>

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
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png" alt="Magnemite" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Magnemite</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 22</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric / Steel</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thustershock, Sonicboom, Thunder Wave</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png" alt="Voltorb" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Voltorb</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 20</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Self-Destruct, Spark, Screech</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png" alt="Magneton" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Magneton (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 23</td>
            <td style="padding: 12px 16px;">Electric / Steel</td>
            <td style="padding: 12px 16px;">Thunderbolt, Sonic Boom, Supersonic, Thunder Wave</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Pro-Tip:</strong> If you chose Mudkip (now evolved into Marshtomp, Water/Ground), Wattson's Electric attacks will do absolutely zero damage. Spam <em>Mud Shot</em> to clean-sweep his team!
      </blockquote>`
    );
  }

  // Chapter 6: Norman
  if (chapter.order === 6) {
    content = content.replace(
      /<h2>1\. Family Duel at Petalburg Gym<\/h2>[\s\S]+?<\/blockquote>/,
      `<h2>1. Family Duel at Petalburg Gym</h2>
      <p>Norman is a master of Normal-type Pokémon. In Sapphire, his team features two massive Slakings with terrifying stats, sitting at both ends of the battle:</p>

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
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/289.png" alt="Slaking" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Slaking</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 28</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Normal</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Yawn, Facade, Slack Off, Faint Attack</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/288.png" alt="Vigoroth" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a1a1aa;">Vigoroth</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Normal</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Slash, Facade, Encore, Faint Attack</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/289.png" alt="Slaking" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Slaking (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 31</td>
            <td style="padding: 12px 16px;">Normal</td>
            <td style="padding: 12px 16px;">Focus Punch, Facade, Yawn, Shadow Ball</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Slaking Hack:</strong> Because of the <strong>Truant</strong> ability, Slaking must loaf around every second turn. Use the move <strong>Protect</strong> on the active turn, then retaliate with Fighting-type moves on its lazy turn!
      </blockquote>`
    );
  }

  // Chapter 7: Winona
  if (chapter.order === 7) {
    content = content.replace(
      /<h2>3\. Challenging Fortree Gym Leader Winona<\/h2>[\s\S]+?<\/blockquote>/,
      `<h2>3. Challenging Fortree Gym Leader Winona</h2>
      <p>Use your Devon Scope to clear the invisible blockades and challenge Gym Leader <strong>Winona</strong> - the elegant Flying-type expert. In Sapphire, her team does not include Tropius:</p>

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
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/277.png" alt="Swellow" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Swellow</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 31</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Normal / Flying</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Double Team, Aerial Ace, Quick Attack, Endeavor</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/279.png" alt="Pelipper" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Pelipper</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Flying</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Protect, Supersonic</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/227.png" alt="Skarmory" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Skarmory</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 32</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Steel / Flying</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Steel Wing, Aerial Ace, Sand-Attack, Swift</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/334.png" alt="Altaria" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Altaria (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 33</td>
            <td style="padding: 12px 16px;">Dragon / Flying</td>
            <td style="padding: 12px 16px;">Dragon Dance, Dragon Breath, Earthquake, Aerial Ace</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Winona Counter-tactics:</strong> Altaria is extremely dangerous once it starts setting up Dragon Dance. Take it down immediately with an <strong>Ice-type</strong> move (which inflicts <strong>4x critical damage</strong>!). Electric moves will easily secure KOs on Swellow and Pelipper.
      </blockquote>`
    );
  }

  // Chapter 8: Tate & Liza
  if (chapter.order === 8) {
    content = content
      .replace(
        /<h2>2\. Stopping the Evil Team Aqua & Magma<\/h2>[\s\S]+?<\/ul>/,
        `<h2>2. Thwarting Team Aqua's Submarine Base</h2>
        <p>In Sapphire, Team Aqua is your sole opposition at Lilycove Cove:</p>
        <ul>
          <li><strong>Mt. Pyre Legend:</strong> Ascend the misty Mt. Pyre. Witness the leader <strong>Archie</strong> escaping with the <strong>Red Orb</strong>. The elders will give you the <strong>Blue Orb</strong> to counter it.</li>
          <li><strong>Team Aqua Hideout:</strong> Fly back to Lilycove City, enter their seaside cove hideout. Be sure to swipe the legendary <strong>Master Ball</strong> hidden inside their treasure room before taking on the guards as Archie flees in a modified submarine.</li>
        </ul>`
      )
      .replace(
        /<h2>2\. Discovering Mossdeep City & Double Battle of the Century<\/h2>[\s\S]+?<\/blockquote>/,
        `<h2>2. Discovering Mossdeep City & Double Battle of the Century</h2>
        <p>Sail to Mossdeep City and enter the Gym to challenge the psychic twins <strong>Tate & Liza</strong>. In Sapphire, this battle is much easier as they only field 2 Pokémon:</p>

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
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/337.png" alt="Lunatone" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Lunatone</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock / Psychic</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic, Hypnosis, Light Screen, Calm Mind</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/338.png" alt="Solrock" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #f97316;">Solrock</td>
              <td style="padding: 12px 16px;">Lvl 42</td>
              <td style="padding: 12px 16px;">Rock / Psychic</td>
              <td style="padding: 12px 16px;">Psychic, Flamethrower, Rock Slide, Sunny Day</td>
            </tr>
          </tbody>
        </table>

        <blockquote>
          <strong>Double Tactics:</strong> Use wide-reaching moves like <strong>Surf</strong> to devastate both Rock/Psychic dual types simultaneously. After winning, visit Steven Stone's house in the northwest corner of the city to obtain <strong>HM08 Dive</strong>.
        </blockquote>`
      );
  }

  // Chapter 9: Cave of Origin (Kyogre level 45, heavy rain)
  if (chapter.order === 9) {
    content = `
      <h1>Chapter 9: The Ocean Colossus & The Rain Badge</h1>
      <p>The global ocean levels rise to catastrophic heights as Kyogre threatens to flood the continent under a massive deluge!</p>

      <h2>1. Seafloor Cavern & The Awakening of Kyogre</h2>
      <p>Dive deep under Route 128 to locate the hidden <strong>Seafloor Cavern</strong>. Complete the strength boulder puzzles and defeat Team Aqua Leader <strong>Archie</strong>. Uncontrolled, Archie triggers the Red Orb to awaken the slumbering ocean titan <strong>Kyogre</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png" style="max-width:32px; vertical-align:middle;" />. Kyogre escapes, bathing the world in heavy rains and thunderous storms.</p>

      <h2>2. Capturing Kyogre inside Cave of Origin</h2>
      <p>Fly immediately to <strong>Sootopolis City</strong> (accessible by diving in Route 126). Talk to Steven and Gym Leader Wallace at the entrance of the sacred <strong>Cave of Origin</strong>. They will clear the path so you can enter the deep chamber.</p>
      <p>Proceed to the depths to face and capture <strong>Kyogre (Level 45)</strong>. Bring plenty of Ultra Balls or use your Master Ball for an instant capture. Capturing or defeating Kyogre will permanently clear the storm and bring peace back to Hoenn!</p>
      <blockquote>
        <strong>Note:</strong> Unlike Emerald, in Sapphire there is <strong>no need</strong> to seek out Rayquaza at Sky Pillar during the main story. Kyogre is handled directly here!
      </blockquote>

      <h2>3. Challenging Sootopolis Gym Leader Wallace</h2>
      <p>With the sky restored, enter the Gym to challenge Sootopolis Gym Leader **Wallace** (in Emerald Wallace is the Champion, but in Sapphire he is the 8th Gym Leader):</p>

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
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/370.png" alt="Luvdisc" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Luvdisc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 40</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Attract, Sweet Kiss, Flail</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/340.png" alt="Whiscash" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Whiscash</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Ground</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Earthquake, Water Pulse, Amnesia, Rain Dance</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/364.png" alt="Sealeo" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Sealeo</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 40</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ice / Water</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Hail, Ice Ball, Body Slam</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/342.png" alt="Crawdaunt" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ef4444;">Crawdaunt</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 43</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Dark</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Crabhammer, Swords Dance, Strength, Water Pulse</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/350.png" alt="Milotic" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Milotic (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 43</td>
            <td style="padding: 12px 16px;">Water</td>
            <td style="padding: 12px 16px;">Recover, Water Pulse, Ice Beam, Toxic</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Milotic Counter-tactics:</strong> His ace Milotic has massive Special Defense and high HP. Use <strong>Electric</strong> or <strong>Grass</strong> moves along with status effects (paralysis/toxic) to overcome Recover and secure victory.
      </blockquote>
      <p>Upon defeating Wallace, he will award you <strong>HM07 Waterfall</strong>, allowing you to scale waterfalls and advance towards the League!</p>
      <p>Rewards: <strong>Rain Badge</strong> and <strong>TM03 Water Pulse</strong>.</p>
    `;
  }

  // Chapter 10: Steven Stone Champion
  if (chapter.order === 10) {
    content = content
      .replace("Elite Four and Champion Wallace", "Elite Four and Champion Steven")
      .replace("<h1>Chapter 10: Elite Four and Champion Wallace</h1>", "<h1>Chapter 10: Elite Four and Champion Steven Stone</h1>")
      .replace(
        /<h2>4\. Coronation: Champion Wallace[\s\S]+?<\/p>/,
        `<h2>4. Coronation: Champion Steven Stone (Steel / Rock Type)</h2>
        <p>Beyond the Elite Four lies the throne room. Prepare to challenge the ultimate Champion of Hoenn - <strong>Steven Stone</strong>. Steven utilizes incredibly robust Steel, Rock, and Ground-type Pokémon featuring devastating physical capabilities:</p>`
      )
      .replace(
        /<table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba\(255, 255, 255, 0.08\); border-radius: 12px; overflow: hidden; background-color: rgba\(15, 15, 25, 0.5\);">[\s\S]+?<\/table>[\s\S]+?adventure!<\/p>/,
        `<table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(255, 255, 255, 0.04);">
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Destruction Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/227.png" alt="Skarmory" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Skarmory</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 57</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Steel / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Loves laying Spikes and inflicting Toxic. Use Fire or Electric moves immediately to prevent spikes setup.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/344.png" alt="Claydol" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Claydol</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 55</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ground / Psychic</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Levitate ability ignores Ground-type attacks entirely. Utilize Water, Ice, or Dark-type moves to crush it.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/306.png" alt="Aggron" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Aggron</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Steel / Rock</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Takes <strong>4x massive damage</strong> from Ground (Earthquake) and Fighting moves. Instant 1-hit KO!</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/346.png" alt="Cradily" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Cradily</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock / Grass</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Extremely tanky. Counter with Ice, Fighting, or Steel moves. Avoid Ground/Water types.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/348.png" alt="Armaldo" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Armaldo</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock / Bug</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #10b981;">Vicious physical attack. Use Water, Rock, or Steel moves to deal swift KOs.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png" alt="Metagross" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Metagross (Ace)</td>
              <td style="padding: 12px 16px;">Lvl 58</td>
              <td style="padding: 12px 16px;">Steel / Psychic</td>
              <td style="padding: 12px 16px; color: #10b981;">Ultimate physical threat with its terrifying Meteor Mash attack! Counter with strong Ground (Earthquake) or Fire moves (Overheat/Flamethrower). Avoid close combat!</td>
            </tr>
          </tbody>
        </table>

        <p>After defeating Steven's supreme Metagross, congratulations! You have officially conquered Steven Stone, claimed the ultimate Champion title of Hoenn, and written your name into the Hall of Fame of <strong>Pokémon Sapphire</strong>!</p>`
      );
  }

  // Chapter 11: English legendary
  if (chapter.order === 11) {
    content = content
      .replace(
        /<li><strong>Choose Red[\s\S]+?<\/ul>/,
        `<li>In Sapphire, the legendary dragon <strong>Latias</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/380.png" style="max-width:32px; vertical-align:middle;" /> will automatically roam wild across the oceans of Hoenn after the elite four victory (no color choice, and Latios does not roam by default).</li>`
      )
      .replace(
        /<h2>2\. Kyogre & Groudon<\/h2>[\s\S]+?<\/blockquote>/,
        `<h2>2. Sky Overlord: Rayquaza</h2>
        <p>In Sapphire, Kyogre is caught during the main storyline inside the Cave of Origin. Post-game, you can seek out the third legendary titan:</p>
        <ul>
          <li><strong>Rayquaza (Lvl 70):</strong> Bring your Mach Bike to Route 131, enter the tall chasm of the <strong>Sky Pillar</strong>. Master the cracked floors at top speed to scale the summit and capture Rayquaza at level 70!</li>
          <li><em>Note:</em> Groudon and post-game Kyogre locations (Terra Cave/Marine Cave) do not exist in Sapphire. Groudon is exclusive to Ruby.</li>
        </ul>`
      )
      .replace(
        /Place Relicanth in the <strong>FIRST<\/strong> slot and Wailord in the <strong>LAST<\/strong> slot/,
        "place **Wailord** in the **FIRST** slot and **Relicanth** in the **LAST** slot of your party"
      );
  }

  // Chapter 12: English postgame
  if (chapter.order === 12) {
    content = content
      .replace("<h1>Chapter 12: Post-game Battle Frontier & Essential Items Guide</h1>", "<h1>Chapter 12: Post-game Battle Tower & Essential Items Guide</h1>")
      .replace("<p>Master the ultimate challenges of Hoenn's Battle Frontier and collect game-changing items.</p>", "<p>Master the ultimate challenges of Hoenn's Battle Tower and collect game-changing items.</p>")
      .replace("<h2>1. The Battle Frontier</h2>", "<h2>1. The Battle Tower</h2>")
      .replace(
        "<p>Sail to the Battle Frontier to challenge the 7 facilities (Tower, Dome, Palace, Arena, Factory, Pike, and Pyramid) and defeat Frontier Brains for Symbols.</p>",
        `<p>Sail to the Battle Tower to challenge competitive streaks of 7 single or double battles with advanced AI trainers. Build consecutive win streaks to receive rare ribbons and battle items!</p>`
      )
      .replace(
        /<h2>2\. Extended Safari Zone<\/h2>[\s\S]+?<\/p>/,
        "<!-- No Safari Zone Johto expansion in Sapphire -->"
      );
  }

  let chapterTitle = chapter.chapterTitle
    .replace(/emerald/g, 'sapphire')
    .replace(/Emerald/g, 'Sapphire');

  if (chapter.order === 9) {
    chapterTitle = "Chapter 9: Kyogre Awakening & Sootopolis Gym Wallace";
  } else if (chapter.order === 10) {
    chapterTitle = "Chapter 10: Elite Four & Champion Steven Stone";
  } else if (chapter.order === 12) {
    chapterTitle = "Chapter 12: Post-game Battle Tower & Essential Items Guide";
  }

  return {
    ...chapter,
    gameVersion: 'sapphire',
    chapterTitle,
    content
  };
});
