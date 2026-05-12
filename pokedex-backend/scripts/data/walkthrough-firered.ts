export const FIRERED_CHAPTERS = [
  {
    gameVersion: "firered",
    chapterTitle: "Phần 1: Khởi đầu tại Thị trấn Pallet",
    order: 1,
    language: "vi",
    content: `
      <h1>Phần 1: Khởi đầu tại Thị trấn Pallet</h1>
      <p>Chào mừng đến với vùng đất Kanto huyền thoại! Hành trình vĩ đại của bạn khởi đầu tại thị trấn nhỏ <strong>Pallet Town</strong> yên bình.</p>

      <h2>1. Lựa chọn Starter Pokémon</h2>
      <p>Hãy chạy thẳng ra bãi cỏ ở mạn bắc thị trấn, Giáo sư Oak sẽ gọi bạn quay lại và dẫn bạn về phòng thí nghiệm. Tại đây, bạn sẽ chọn 1 trong 3 Pokémon khởi đầu:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ chính</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Đánh giá chiến thuật</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Bulbasaur" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">BULBASAUR</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;"><strong>Dễ chơi nhất!</strong> Khắc chế cứng 2 Gym đầu tiên (Đá & Nước), giúp bạn có khởi đầu cực kỳ nhàn nhã.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Squirtle" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">SQUIRTLE</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;"><strong>Cân bằng!</strong> Rất khỏe và trâu bò, khắc chế tốt Gym 1 và có thể học nhiều chiêu thức đa dạng sau này.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f97316;">CHARMANDER</td>
            <td style="padding: 12px 16px;">Lửa</td>
            <td style="padding: 12px 16px; color: #cbd5e1;"><strong>Độ khó cao!</strong> Khó chơi ở giai đoạn đầu do khắc hệ với Gym 1 & 2, nhưng chú rồng lửa Charizard tiến hóa sau này cực kỳ bá đạo và ngầu lòi.</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Quyết đấu Rival (Lần 1): Trận chiến đầu tiên</h2>
      <p>Ngay sau khi nhận Starter, Rival sẽ thách đấu bạn trước khi rời phòng thí nghiệm. Đây là cơ hội hoàn hảo để thử sức mạnh của người bạn mới:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 80px;">Sprite</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Chiến thuật triệt tiêu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #10b981;">Bulbasaur</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 5</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ / Độc</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#cbd5e1;">(Nếu bạn chọn Squirtle) Hãy dùng Tackle liên tục. Nhớ dùng Potion trong máy tính phòng của bạn nếu máu xuống quá thấp.</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #f97316;">Charmander</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 5</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#cbd5e1;">(Nếu bạn chọn Bulbasaur) Hãy dùng Tackle/Growl hợp lý. Rival sẽ dùng chiêu cào Scratch gây sát thương cao hơn bình thường.</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #3b82f6;">Squirtle</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 5</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#cbd5e1;">(Nếu bạn chọn Charmander) Hãy cào Scratch liên tục để kết liễu Squirtle trước khi nó hạ gục bạn.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Nhận Pokédex & Town Map</h2>
      <p>Sau trận đấu, đi qua Route 1 lên <strong>Viridian City</strong>. Vào Poké Mart nhận bưu kiện <strong>Oak's Parcel</strong> rồi quay lại Pallet Town giao cho giáo sư để chính thức nhận <strong>Pokédex</strong> cùng Poké Balls. Đừng quên ghé nhà Rival bên cạnh để nhận <strong>Town Map</strong> từ chị gái Daisy của cậu ta nhé!</p>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 2: Huy hiệu 1 - Boulder Badge",
    order: 2,
    language: "vi",
    content: `
      <h1>Phần 2: Huy hiệu 1 - Boulder Badge</h1>
      <p>Lên lại Viridian City, vượt qua Route 2 và rừng rậm <strong>Viridian Forest</strong> để tới thành phố Pewter.</p>

      <h2>1. Quyết đấu Rival (Lần 2): Route 22 (Không bắt buộc)</h2>
      <p>Nếu rẽ sang phía Tây từ Viridian City trước khi vào Rừng Viridian, bạn có thể thách đấu Rival tại Route 22. Đây là trận đấu tuyệt vời để kiếm thêm một lượng lớn điểm EXP:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 80px;">Sprite</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Khắc chế tốt nhất</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #cbd5e1;">Pidgey</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 9</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Bất kỳ Pokémon nào có tốc độ tốt. Hãy chú ý chiêu giảm độ chính xác Sand Attack cực kỳ khó chịu.</td>
          </tr>
          <tr>
            <td style="padding: 10px; text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" /></td>
            <td style="padding: 10px; font-weight:bold; color: #10b981;">Bulbasaur / Charmander / Squirtle (Starter)</td>
            <td style="padding: 10px;">Lvl 9</td>
            <td style="padding: 10px;">Khắc hệ Starter của bạn</td>
            <td style="padding: 10px; color:#10b981;">Dùng đòn tấn công vật lý trung tính mạnh hoặc tận dụng các Pokémon hoang dã bạn bắt được ở Route 1/22 để áp dẹp.</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Thách đấu Gym Leader Brock</h2>
      <p>Nhà thi đấu Pewter chuyên trị Pokémon hệ Đá/Đất (Rock/Ground) với thủ lĩnh là Brock. Sức phòng thủ vật lý cực tốt của hệ Đá sẽ là trở ngại lớn đầu tiên.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Chiêu thức đáng gờm</th>
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
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tackle, Defense Curl</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" alt="Onix" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #94a3b8;">Onix</td>
            <td style="padding: 12px 16px;">Lvl 14</td>
            <td style="padding: 12px 16px;">Đá / Đất</td>
            <td style="padding: 12px 16px;">Rock Tomb, Bind, Screech</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Bí kíp vượt ải:</strong> 
        <ul>
          <li>Nếu chọn <strong>Bulbasaur</strong> (Vine Whip) hoặc <strong>Squirtle</strong> (Bubble): Chiến thắng cực kỳ dễ dàng vì hệ Đá nhận sát thương x2 chí mạng.</li>
          <li>Nếu chọn <strong>Charmander</strong>: Hãy bắt một chú khỉ <strong>Mankey</strong> tại Route 22 (mạn trái Viridian City) và luyện lên level 9 học chiêu Giác đấu <em>Low Kick</em>, hoặc cày Charmander lên level 13 học chiêu Thép <em>Metal Claw</em> để khắc chế Brock.</li>
        </ul>
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 3: Huy hiệu 2 - Cascade Badge",
    order: 3,
    language: "vi",
    content: `
      <h1>Phần 3: Huy hiệu 2 - Cascade Badge</h1>
      <p>Từ Pewter, đi về phía Đông qua Route 3, mua Magikarp (nếu muốn cày Gyarados) tại Pokémon Center trước hang <strong>Mt. Moon</strong>.</p>

      <h2>1. Thám hiểm Mt. Moon</h2>
      <p>Băng qua Mt. Moon, đánh bại Team Rocket và chọn 1 trong 2 hóa thạch ở cuối hang: <strong>Helix Fossil</strong> (Omanyte) hoặc <strong>Dome Fossil</strong> (Kabuto). Đi tiếp về hướng Đông để đến thành phố cảng xinh đẹp <strong>Cerulean City</strong>.</p>

      <h2>2. Thách đấu Gym Leader Misty</h2>
      <p>Gym Cerulean chuyên trị các Pokémon hệ Nước (Water) cực kỳ cơ động dưới sự dẫn dắt của Misty.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Chiêu thức đáng gờm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png" alt="Staryu" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Staryu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 18</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Swift, Harden</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png" alt="Starmie" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Starmie</td>
            <td style="padding: 12px 16px;">Lvl 21</td>
            <td style="padding: 12px 16px;">Nước / Tâm Linh</td>
            <td style="padding: 12px 16px;">Water Pulse, Swift, Recover, Rapid Spin</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Cách đối phó Starmie:</strong> Starmie có chiêu hồi máu Recover và sát thương diện rộng cực đau. Hãy đi lên phía bắc qua cầu <strong>Nugget Bridge</strong>, bắt một chú <strong>Oddish</strong> hoặc <strong>Bellsprout</strong> tại Route 24/25, luyện lên level học các chiêu hệ Cỏ (Grass) để khắc chế Misty dễ dàng.
      </blockquote>

      <h2>3. Quyết đấu Rival (Lần 3): Nugget Bridge</h2>
      <p>Trước khi bắt đầu thám hiểm Route 24/25, Rival sẽ chặn đánh bạn ở ngay đầu cầu Nugget Bridge. Đây là một trận đấu thử thách thực sự với đội hình 4 Pokémon:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 80px;">Sprite</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Khắc chế tốt nhất</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #cbd5e1;">Pidgeotto</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 17</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Đòn hệ Đá (Rock) hoặc Điện (Electric). Né đòn Sand Attack của nó.</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #a855f7;">Abra</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 16</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Nó chỉ biết chiêu Teleport! Hãy dùng bất kỳ đòn tấn công vật lý nào có sát thương cao nhất để dứt điểm nhanh gọn.</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #cbd5e1;">Rattata</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 15</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Khắc chế cứng bằng đòn Giác đấu (Fighting) như Low Kick của Mankey.</td>
          </tr>
          <tr>
            <td style="padding: 10px; text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" /></td>
            <td style="padding: 10px; font-weight:bold; color: #10b981;">Bulbasaur / Charmander / Squirtle (Starter)</td>
            <td style="padding: 10px;">Lvl 18</td>
            <td style="padding: 10px;">Khắc hệ Starter</td>
            <td style="padding: 10px; color:#10b981;">Hãy dùng đòn khắc hệ tương ứng hoặc tận dụng Pokémon kháng hệ để triệt tiêu đòn tấn công nguyên tố của nó.</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 4: Huy hiệu 3 - Thunder Badge",
    order: 4,
    language: "vi",
    content: `
      <h1>Phần 4: Huy hiệu 3 - Thunder Badge</h1>
      <p>Sau khi giúp đỡ Bill ở Route 25 để nhận vé tàu <strong>S.S. Ticket</strong>, hãy đi xuống phía nam qua Underground Path để đến thành phố cảng <strong>Vermilion City</strong>.</p>

      <h2>1. Thám hiểm du thuyền S.S. Anne</h2>
      <p>Lên tàu S.S. Anne, đánh bại các đối thủ trên tàu, tìm kiếm các vật phẩm giá trị trong các phòng cabin.</p>

      <h2>2. Quyết đấu Rival (Lần 4): S.S. Anne</h2>
      <p>Ngay trước lối vào cabin của thuyền trưởng S.S. Anne, Rival sẽ thách đấu bạn một trận cực kỳ kịch tính với đội hình đã tiến hóa hoàn thiện hơn:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 80px;">Sprite</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Khắc chế tốt nhất</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #cbd5e1;">Pidgeotto</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 19</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Đòn hệ Điện (Geodude học Rock Tomb hay Pikachu học Thunderbolt).</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #cbd5e1;">Raticate</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 16</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Đòn hệ Giác đấu (Fighting). Chú ý đòn tấn công Hyper Fang có sát thương vô cùng lớn!</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #a855f7;">Kadabra</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 18</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Kadabra có chỉ số tấn công đặc biệt cao nhưng phòng thủ vật lý cực kỳ giấy. Hãy dùng đòn vật lý mạnh nhất để tiễn nó đi trong một nốt nhạc.</td>
          </tr>
          <tr>
            <td style="padding: 10px; text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" /></td>
            <td style="padding: 10px; font-weight:bold; color: #10b981;">Bulbasaur / Charmander / Squirtle (Starter)</td>
            <td style="padding: 10px;">Lvl 20</td>
            <td style="padding: 10px;">Khắc hệ Starter</td>
            <td style="padding: 10px; color:#10b981;">Dùng đòn khắc chế hoặc Pokémon phụ trợ có lợi thế nguyên tố để đè bẹp nó.</td>
          </tr>
        </tbody>
      </table>
      <p>Sau khi chiến thắng, hãy tiến vào gặp thuyền trưởng ở phòng cabin cao nhất để nhận <strong>HM01 Cut</strong> (Cắt cây cản đường).</p>

      <h2>3. Thách đấu Gym Leader Lt. Surge</h2>
      <p>Surge khét tiếng với phòng thủ cơ quan thùng rác và biệt đội hệ Điện (Electric) siêu nhanh.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Chiêu thức đáng gờm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png" alt="Voltorb" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Voltorb</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Shock Wave, Sonic Boom</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Pikachu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 18</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thunder Bolt, Quick Attack</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png" alt="Raichu" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ea580c;">Raichu</td>
            <td style="padding: 12px 16px;">Lvl 24</td>
            <td style="padding: 12px 16px;">Điện</td>
            <td style="padding: 12px 16px;">Thunderbolt, Shock Wave, Double Team</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Bí mật chiến thắng:</strong> Ghé ngay hang chuột <strong>Diglett's Cave</strong> bên phải thành phố Vermilion, bắt một chú <strong>Diglett</strong> hoặc <strong>Dugtrio</strong> hoang dã. Hệ Đất (Ground) hoàn toàn miễn nhiễm với hệ Điện và có thể quét sạch đội của Surge bằng chiêu <em>Magnitude</em> hoặc <em>Dig</em>!
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 5: Huy hiệu 4 - Rainbow Badge",
    order: 5,
    language: "vi",
    content: `
      <h1>Phần 5: Huy hiệu 4 - Rainbow Badge</h1>
      <p>Sử dụng Cut để đi vào Route 9, vượt qua hang động tối tăm <strong>Rock Tunnel</strong> (hãy nói chuyện với trợ lý của giáo sư Oak ở Route 2 để lấy <strong>HM05 Flash</strong> giúp phát sáng hang động).</p>

      <h2>1. Đến Celadon City & Rocket Game Corner</h2>
      <p>Sau khi ra khỏi hang, đi qua Lavender Town về phía Tây để tới đại đô thị sầm uất <strong>Celadon City</strong>. Tại đây, hãy đột nhập vào căn cứ bí mật của Team Rocket nằm dưới tầng hầm sòng bạc Game Corner để lấy kính thần <strong>Silph Scope</strong>.</p>

      <h2>2. Thách đấu Gym Leader Erika</h2>
      <p>Erika sở hữu một vườn hoa Pokémon hệ Cỏ (Grass) quý phái nhưng chứa đầy độc tố nguy hiểm.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Chiêu thức đáng gờm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png" alt="Victreebel" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Victreebel</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giga Drain, Acid, Poison Powder</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png" alt="Tangela" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Tangela</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 24</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Constrict, Giga Drain, Ingrain</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png" alt="Vileplume" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #10b981;">Vileplume</td>
            <td style="padding: 12px 16px;">Lvl 29</td>
            <td style="padding: 12px 16px;">Cỏ / Độc</td>
            <td style="padding: 12px 16px;">Giga Drain, Acid, Sleep Powder</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Khắc chế hệ Cỏ:</strong> Charizard hệ Lửa cực kỳ dễ dàng thiêu rụi toàn bộ vườn hoa của Erika. Ngoài ra bạn có thể dùng các chiêu hệ Bay (Flying) hoặc Băng (Ice) của các Pokémon như Pidgeot, Butterfree để quét sạch dễ dàng.
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 6: Tháp Pokémon & Kính thần Silph",
    order: 6,
    language: "vi",
    content: `
      <h1>Phần 6: Tháp Pokémon & Kính thần Silph</h1>
      <p>Sau khi có kính thần Silph Scope từ sòng bạc Celadon, hãy quay trở lại thị trấn ma mị <strong>Lavender Town</strong>.</p>

      <h2>1. Quyết đấu Rival (Lần 5): Tháp Pokémon Lavender</h2>
      <p>Ngay khi vừa bước lên tầng 2 của tháp Pokémon, Rival sẽ chặn bạn lại để so tài kịch tính nhằm kiểm tra đội hình hiện tại của bạn:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 80px;">Sprite</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Khắc chế tốt nhất</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #cbd5e1;">Pidgeotto</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 25</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Hệ Điện (Electric) hoặc Đá (Rock).</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #f97316;">Growlithe</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 23</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Đòn hệ Nước (Water) hoặc Đất (Ground) / Đá (Rock).</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #3b82f6;">Gyarados / Exeggcute</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 22 - 23</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước/Bay hoặc Cỏ</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Gyarados nhận x4 sát thương hệ Điện. Exeggcute nhận x4 sát thương hệ Côn trùng hoặc x2 hệ Lửa/Băng.</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #a855f7;">Kadabra</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 20</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Đòn vật lý cực mạnh để xuyên phá phòng ngự yếu của nó.</td>
          </tr>
          <tr>
            <td style="padding: 10px; text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" /></td>
            <td style="padding: 10px; font-weight:bold; color: #cbd5e1;">Starter (Giai đoạn 2)</td>
            <td style="padding: 10px;">Lvl 25</td>
            <td style="padding: 10px;">Khắc hệ Starter</td>
            <td style="padding: 10px; color:#10b981;">Dùng đòn khắc hệ của starter của bạn để hạ gục nó thật nhanh.</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Giải cứu ông già Fuji tại Pokémon Tower</h2>
      <p>Tiến vào tháp linh hồn Pokémon Tower, kính thần sẽ giúp bạn nhận dạng và đánh bại bóng ma u sầu của <strong>Marowak</strong>. Lên tầng cao nhất, hạ gục đội quân Team Rocket để giải cứu cụ già Fuji.</p>

      <h2>3. Nhận sáo Poké Flute</h2>
      <p>Để tỏ lòng biết ơn, cụ Fuji sẽ trao cho bạn chiếc sáo thần kì <strong>Poké Flute</strong>. Chiếc sáo này dùng để đánh thức hai chú Snorlax ham ngủ đang cản đường huyết mạch của vùng Kanto tại Route 12 và Route 16!</p>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 7: Huy hiệu 5 - Soul Badge",
    order: 7,
    language: "vi",
    content: `
      <h1>Phần 7: Huy hiệu 5 - Soul Badge</h1>
      <p>Dùng sáo Poké Flute đánh thức Snorlax ở Route 16, đi qua con đường dốc xe đạp Cycling Road đầy lộng gió xuống phía nam để tới thành phố <strong>Fuchsia City</strong>.</p>

      <h2>1. Khám phá khu bảo tồn Safari Zone</h2>
      <p>Vào Safari Zone, tìm đường đến ngôi nhà sâu nhất để nhận <strong>HM03 Surf</strong> (Lướt sóng) và nhặt hàm răng vàng <strong>Gold Teeth</strong>. Đem trả hàm răng cho ngài Warden ở thị trấn để nhận <strong>HM04 Strength</strong> (Đẩy đá).</p>

      <h2>2. Thách đấu Gym Leader Koga</h2>
      <p>Gym Fuchsia chứa các bức tường tàng hình thử thách trí óc và do thủ lĩnh Koga hệ Độc (Poison) trấn giữ.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Chiêu thức đáng gờm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png" alt="Koffing" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Koffing</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 37</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Selfdestruct, Sludge, Toxic</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png" alt="Muk" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Muk</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 39</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Acid Armor, Sludge, Minimize</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png" alt="Weezing" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Weezing</td>
            <td style="padding: 12px 16px;">Lvl 43</td>
            <td style="padding: 12px 16px;">Độc</td>
            <td style="padding: 12px 16px;">Sludge, Toxic, SmokeScreen, Selfdestruct</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Giải trừ độc tính:</strong> Koga rất thích spam chiêu né tránh Minimize kết hợp độc cực kì khó chịu. Hãy sử dụng các Pokémon hệ Tâm Linh (Psychic) như Kadabra/Alakazam hoặc hệ Đất (Ground) của Dugtrio để kết liễu đội hình của Koga trước khi chúng kịp xả độc hại bạn.
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 8: Huy hiệu 6 - Marsh Badge",
    order: 8,
    language: "vi",
    content: `
      <h1>Phần 8: Huy hiệu 6 - Marsh Badge</h1>
      <p>Quay lại thành phố trung tâm Saffron City. Lúc này, lính gác đã khát nước và sẽ cho bạn đi qua nếu bạn đem cho họ nước uống (Tea mua ở chung cư Celadon Mansion).</p>

      <h2>1. Giải phóng tập đoàn Silph Co.</h2>
      <p>Đột nhập tòa nhà 11 tầng của tập đoàn Silph Co. đang bị Team Rocket phong tỏa.</p>

      <h2>2. Quyết đấu Rival (Lần 6): Silph Co. (Tầng 7)</h2>
      <p>Ở tầng 7 của tòa nhà Silph Co., ngay trước cổng dịch chuyển đến phòng Tổng thống, Rival sẽ lại chặn bạn lại và thách đấu với đội hình đã phát triển lên mức cực kỳ bá đạo, với Starter đã tiến hóa lên dạng tối thượng:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 80px;">Sprite</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Khắc chế tốt nhất</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #cbd5e1;">Pidgeot</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 37</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Bất kỳ đòn hệ Điện (Electric) hoặc Đá (Rock) / Băng (Ice).</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #f97316;">Growlithe</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 38</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Hệ Nước (Surf) hoặc Đất (Earthquake/Dig).</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #a855f7;">Alakazam</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 35</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Dùng đòn vật lý mạnh mẽ từ Snorlax (Shadow Ball hoặc Body Slam) để tận dụng Defense cực mỏng của nó.</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #3b82f6;">Gyarados / Exeggcute</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 35</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước/Bay hoặc Cỏ</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Đòn hệ Điện cho Gyarados, đòn hệ Lửa/Băng/Côn trùng cho Exeggcute.</td>
          </tr>
          <tr>
            <td style="padding: 10px; text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" /></td>
            <td style="padding: 10px; font-weight:bold; color: #cbd5e1;">Charizard / Venusaur / Blastoise (Starter dạng cuối)</td>
            <td style="padding: 10px;">Lvl 40</td>
            <td style="padding: 10px;">Lửa hoặc Cỏ hoặc Nước</td>
            <td style="padding: 10px; color:#10b981;">Pokémon đã đạt hình thái tối thượng! Dùng đòn khắc hệ mạnh nhất để khuất phục nó ngay lập tức.</td>
          </tr>
        </tbody>
      </table>
      <p>Sau khi chiến thắng, hãy trò chuyện với nhân vật đứng kế bên để nhận Pokémon quý giá <strong>Lapras (Lvl 25)</strong>, sau đó dùng ô dịch chuyển tiếp theo tiến thẳng tới phòng Tổng thống để đánh bại trùm <strong>Giovanni</strong> giải cứu tập đoàn Silph Co. và nhận lấy <strong>Master Ball</strong>!</p>

      <h2>3. Thách đấu Gym Leader Sabrina</h2>
      <p>Vượt qua mê cung thảm dịch chuyển dịch thời không để đối đầu thủ lĩnh hệ Tâm Linh (Psychic) Sabrina đầy quyền lực.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Chiêu thức đáng gờm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png" alt="Kadabra" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Kadabra</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 38</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic, Future Sight, Recover</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png" alt="Mr. Mime" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Mr. Mime</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 37</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic, Barrier, Reflect, Light Screen</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png" alt="Alakazam" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Alakazam</td>
            <td style="padding: 12px 16px;">Lvl 43</td>
            <td style="padding: 12px 16px;">Tâm Linh</td>
            <td style="padding: 12px 16px;">Psychic, Future Sight, Recover, Calm Mind</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Phá vỡ lá chắn:</strong> Alakazam có Sát thương đặc biệt rất lớn nhưng Phòng thủ Vật Lý (Defense) siêu yếu. Hãy sử dụng những đòn tấn công vật lý mạnh từ Snorlax (Body Slam/Shadow Ball) hoặc chiêu hệ Bóng Ma (Ghost) để kết liễu Alakazam nhanh nhất có thể.
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 9: Huy hiệu 7 - Volcano Badge",
    order: 9,
    language: "vi",
    content: `
      <h1>Phần 9: Huy hiệu 7 - Volcano Badge</h1>
      <p>Từ Pallet Town, dùng Surf lướt xuống vùng biển phía nam để đặt chân lên đảo núi lửa hoang vu <strong>Cinnabar Island</strong>.</p>

      <h2>1. Thám hiểm tàn tích Pokémon Mansion</h2>
      <p>Đột nhập vào dinh thự hoang tàn Pokémon Mansion đầy rẫy công tắc bí mật để tìm chiếc chìa khóa cổ <strong>Secret Key</strong> mở cửa nhà thi đấu.</p>

      <h2>2. Thách đấu Gym Leader Blaine</h2>
      <p>Blaine là một lão già thông thái, chuyên gia điều khiển lửa đỏ rực rỡ với sức tàn phá cực đại.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Chiêu thức đáng gờm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png" alt="Growlithe" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Growlithe</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire Blast, Take Down</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png" alt="Rapidash" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ea580c;">Rapidash</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire Blast, Fire Spin, Bounce</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png" alt="Arcanine" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Arcanine</td>
            <td style="padding: 12px 16px;">Lvl 47</td>
            <td style="padding: 12px 16px;">Lửa</td>
            <td style="padding: 12px 16px;">Fire Blast, Extreme Speed, Flame Wheel</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Dập tắt ngọn lửa:</strong> Dùng ngay chiêu lướt sóng <strong>Surf</strong> từ Blastoise, Lapras hoặc Gyarados để cuốn phăng toàn bộ đội quân rực lửa của Blaine chỉ trong một nốt nhạc!
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 10: Huy hiệu 8 & Đỉnh cao Kanto League",
    order: 10,
    language: "vi",
    content: `
      <h1>Phần 10: Huy hiệu 8 & Đỉnh cao Kanto League</h1>
      <p>Sau khi chiến thắng tại Cinnabar Island, hãy quay trở lại <strong>Viridian City</strong>. Nhà thi đấu cuối cùng đóng cửa bấy lâu nay nay đã chính thức mở cửa đón chờ nhà vô địch!</p>

      <h2>1. Đối đầu Trùm Giovanni tại Viridian Gym</h2>
      <p>Thủ lĩnh tối cao bí ẩn của Viridian Gym hóa ra chính là ông trùm của băng đảng phản diện Team Rocket - <strong>Giovanni</strong>. Hắn chuyên sử dụng các quái thú hệ Đất/Đá cực kỳ trâu bò.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Chiêu đáng gờm & Khắc chế</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png" alt="Rhyhorn" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a1a1aa;">Rhyhorn</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 45</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đất / Đá</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Scary Face, Earthquake. Sử dụng chiêu hệ Nước (Surf) hoặc hệ Cỏ (Giga Drain) để hạ gục nhanh (nhận sát thương x4).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png" alt="Dugtrio" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Dugtrio</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Slash, Mud-Slap, Earthquake. Cực kỳ nhanh nhưng thủ giấy, dễ dàng kết liễu bằng Surf hoặc chiêu hệ Băng (Ice Beam).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png" alt="Nidoqueen" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Nidoqueen</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 44</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Độc / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Body Slam, Poison Sting, Earthquake. Khắc chế mạnh bằng chiêu hệ Tâm Linh (Psychic) hoặc Surf hệ Nước.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png" alt="Nidoking" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Nidoking</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 45</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Độc / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Thrash, Double Kick, Earthquake. Tấn công vật lý rất mạnh. Dùng chiêu Psychic hoặc Surf dứt điểm nhanh trước khi bị đột phá.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png" alt="Rhydon" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Rhydon (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 50</td>
            <td style="padding: 12px 16px;">Đất / Đá</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Earthquake, Rock Blast, Scary Face. Sức phòng thủ vật lý khổng lồ, hãy xả chiêu đặc biệt hệ Nước (Surf) hoặc Cỏ (Mega Drain) để hạ gục ngay tức khắc (sát thương x4).</td>
          </tr>
        </tbody>
      </table>
      <blockquote>
        <strong>Chiến thắng oanh liệt:</strong> Đánh bại Giovanni để nhận chiếc huy hiệu thứ 8: <strong>Earth Badge</strong> (giúp các Pokémon mọi cấp độ nghe lời tuyệt đối) và đĩa TM26 kì cựu <strong>Earthquake</strong> - đòn hệ Đất mạnh nhất lịch sử game!
      </blockquote>

      <h2>2. Quyết đấu Rival (Lần 7): Route 22 (Trước thềm giải đấu)</h2>
      <p>Sau khi có đủ 8 Huy hiệu và tiến thẳng về phía tây Viridian City vào Route 22, bạn sẽ bất ngờ đụng độ Rival lần thứ 7. Cậu ta muốn kiểm tra xem bạn đã thực sự sẵn sàng thách đấu Elite Four hay chưa:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 80px;">Sprite</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Cấp độ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Khắc chế tốt nhất</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #cbd5e1;">Pidgeot</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 47</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Khắc chế bằng hệ Điện (Electric) như Thunderbolt của Raichu/Jolteon hoặc hệ Đá.</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #cbd5e1;">Rhyhorn</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 45</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đất / Đá</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Nhận x4 sát thương từ hệ Nước (Surf) hoặc hệ Cỏ (Mega Drain).</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #f97316;">Growlithe</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 45</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Đòn hệ Nước (Surf) dễ dàng dập tắt lửa.</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #a855f7;">Alakazam</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 47</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Alakazam đã hoàn thành chuỗi tiến hóa, tốc độ và đặc công cực kỳ đáng gờm. Hãy tận dụng đòn vật lý mạnh để tiễn nó trước.</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" /></td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight:bold; color: #3b82f6;">Gyarados / Exeggcute</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 45</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước/Bay hoặc Cỏ</td>
            <td style="padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color:#10b981;">Hạ gục Gyarados bằng hệ Điện, Exeggcute bằng đòn hệ Côn trùng/Lửa/Băng.</td>
          </tr>
          <tr>
            <td style="padding: 10px; text-align: center;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" /></td>
            <td style="padding: 10px; font-weight:bold; color: #cbd5e1;">Starter (Cấp 53)</td>
            <td style="padding: 10px;">Lvl 53</td>
            <td style="padding: 10px;">Khắc hệ Starter</td>
            <td style="padding: 10px; color:#10b981;">Hạ gục nhanh bằng đòn khắc chế cứng trước khi nó quét sạch đội của bạn.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Thách thức Indigo Plateau - Bộ Tứ Siêu Đẳng (Elite Four)</h2>
      <p>Sau khi sở hữu đủ 8 Huy hiệu, hãy tiến thẳng về phía tây Viridian City vào Route 22, vượt qua các cổng gác nghiêm ngặt để tới Victory Road. Băng qua hang động thử thách đầy đá tảng và hố sụt này để đến được <strong>Indigo Plateau</strong> - đỉnh cao vinh quang của vùng Kanto!</p>
      <p>Tại đây, bạn sẽ phải đối đầu liên tục với 4 huấn luyện viên siêu đẳng mà không được phép thất bại:</p>

      <h3>Trận 1: Đối đầu Lorelei (Hệ Băng / Nước)</h3>
      <p>Lorelei sở hữu khả năng phòng thủ vô cùng kiên cố nhờ lớp giáp băng tuyết và phục hồi phục nhanh chóng.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(56, 189, 248, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left;">Chiêu đáng sợ & Cách đối phó</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png" alt="Dewgong" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Dewgong</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 52</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Băng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Surf, Ice Beam. Dùng chiêu hệ Điện (Thunderbolt) để hạ gục nhanh chóng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png" alt="Cloyster" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Cloyster</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 51</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Băng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Spike Cannon, Protect. Có chỉ số Defense cực cao, hãy tấn công bằng chiêu đặc biệt hệ Điện hoặc Cỏ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png" alt="Slowbro" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Slowbro</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 52</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Tâm Linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Surf, Amnesia. Chiêu Amnesia tăng mạnh Sp. Def. Hãy dùng đòn Vật lý mạnh mẽ hoặc chiêu hệ Bóng Ma để hạ gục.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png" alt="Jynx" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Jynx</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Băng / Tâm Linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lovely Kiss, Ice Punch. Lovely Kiss có thể gây ngủ rất phiền hà. Dùng đòn hệ Lửa hoặc Đá tốc độ cao để dứt điểm trước.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png" alt="Lapras" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #38bdf8;">Lapras (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 54</td>
            <td style="padding: 12px 16px;">Nước / Băng</td>
            <td style="padding: 12px 16px;">Surf, Ice Beam, Body Slam. HP cực kỳ trâu bò. Hãy dồn sát thương lớn bằng chiêu hệ Điện hoặc Giác Đấu mạnh nhất của bạn!</td>
          </tr>
        </tbody>
      </table>

      <h3>Trận 2: Đối đầu Bruno (Hệ Giác Đấu / Đá)</h3>
      <p>Bruno là một bậc thầy võ thuật sở hữu sức tấn công vật lý vô cùng khủng khiếp cùng lượng HP dồi dào.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(248, 113, 113, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: left;">Chiêu đáng sợ & Cách đối phó</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" alt="Onix" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Onix</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 51</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Earthquake, Rock Tomb. Rất yếu trước chiêu hệ Nước và Cỏ (4x thương tổn).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png" alt="Hitmonlee" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f87171;">Hitmonlee</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 53</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giác Đấu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Mega Kick, Brick Break. Tấn công vật lý rất rát. Khắc chế bằng chiêu bay hoặc tâm linh tốc độ cao.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png" alt="Hitmonchan" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f87171;">Hitmonchan</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 53</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giác Đấu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Elemental Punches, Sky Uppercut. Đa dạng chiêu thức đấm. Tấn công bằng chiêu hệ Tâm Linh từ xa (Alakazam) để quét sạch dễ dàng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" alt="Onix" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Onix</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Double-Edge, Iron Tail. Tương tự con đầu tiên, hãy dùng chiêu hệ Nước để thổi bay lập tức.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png" alt="Machamp" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f87171;">Machamp (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 56</td>
            <td style="padding: 12px 16px;">Giác Đấu</td>
            <td style="padding: 12px 16px;">Cross Chop, Rock Tomb, Scary Face. Cross Chop có tỷ lệ bạo kích cực cao và sát thương vô cùng lỗi. Hãy hạ gục nó thật nhanh bằng đòn hệ Tâm Linh!</td>
          </tr>
        </tbody>
      </table>

      <h3>Trận 3: Đối đầu Agatha (Hệ Ma / Độc)</h3>
      <p>Agatha là một cụ bà xảo quyệt chuyên sử dụng các chiêu thức gây trạng thái xấu (ngủ, nguyền rủa, bối rối) vô cùng khó chịu.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(192, 132, 252, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: left;">Chiêu đáng sợ & Cách đối phó</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #c084fc;">Gengar</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ma / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hypnosis, Dream Eater, Confuse Ray. Hãy mang theo vật phẩm trị ngủ Full Heal. Tấn công bằng chiêu hệ Tâm Linh hoặc hệ Đất.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png" alt="Golbat" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Golbat</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Độc / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Air Cutter, Bite, Confuse Ray. Khắc chế cực mạnh bằng chiêu hệ Điện, Băng hoặc Tâm Linh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" alt="Haunter" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #c084fc;">Haunter</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 53</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ma / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Shadow Punch, Curse. Đòn Curse sẽ trừ máu của nó nhưng nguyền rủa bạn mất 1/4 máu mỗi lượt. Hãy đổi Pokémon khác ra trận để hóa giải.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png" alt="Arbok" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Arbok</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sludge Bomb, Bite, Screech. Chỉ số tương đối thấp, dùng chiêu hệ Đất (Earthquake) hoặc Tâm Linh để quét nhanh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #c084fc;">Gengar (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 58</td>
            <td style="padding: 12px 16px;">Ma / Độc</td>
            <td style="padding: 12px 16px;">Sludge Bomb, Shadow Ball, Giga Drain. Tốc độ rất cao và đòn tấn công cực mạnh. Sử dụng Alakazam hệ Tâm Linh tung chiêu kết liễu trước khi nó kịp ra đòn!</td>
          </tr>
        </tbody>
      </table>

      <h3>Trận 4: Đối đầu Lance (Thủ lĩnh hệ Rồng)</h3>
      <p>Lance sở hữu những quái vật hệ Rồng vô cùng dũng mãnh với sức mạnh hủy diệt và sát thương diện rộng.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(244, 63, 94, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Chiêu đáng sợ & Cách đối phó</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" alt="Gyarados" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Gyarados</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hyper Beam, Dragon Rage, Bite. Rất đáng sợ nhưng dính điểm yếu 4x trước hệ Điện. Chỉ một chiêu Thunderbolt tốt là có thể hạ gục nó lập tức.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png" alt="Dragonair" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Dragonair</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rồng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Outrage, Safeguard. Chiêu Outrage cực mạnh. Sử dụng các chiêu hệ Băng (Ice Beam / Blizzard) để gieo rắc nổi khiếp sợ lên chúng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png" alt="Dragonair" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Dragonair</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rồng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Outrage, Hyper Beam, Thunder Wave. Giải quyết nhanh gọn tương tự con đầu tiên bằng chiêu hệ Băng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png" alt="Aerodactyl" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Aerodactyl</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 58</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ancient Power, Wing Attack. Tốc độ kinh hoàng. Khắc chế bằng đòn tấn công hệ Điện, Băng hoặc Nước cực mạnh để kết liễu nhanh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png" alt="Dragonite" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Dragonite (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 60</td>
            <td style="padding: 12px 16px;">Rồng / Bay</td>
            <td style="padding: 12px 16px;">Outrage, Wing Attack, Hyper Beam, Safeguard. Quái vật vô địch của Lance. Chịu sát thương gấp 4 lần từ hệ Băng (Ice). Đóng băng nó bằng chiêu <strong>Ice Beam</strong> để dứt điểm trận đấu!</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Trận chiến Định mệnh: Đánh bại Tân Vô Địch - Rival của bạn!</h2>
      <p>Sau khi đánh bại Lance, bạn ngỡ ngàng nhận ra Rival của mình đã đánh bại Elite Four trước bạn và đang chễm chệ trên ngôi vị Nhà Vô Địch! Bạn phải lập tức thách đấu hắn để giành lấy hào quang tối thượng.</p>
      <p>Đội hình của Rival vô cùng cân bằng và thay đổi linh hoạt tùy thuộc vào Pokémon Starter bạn chọn từ đầu game:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Điểm yếu & Khắc chế</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png" alt="Pidgeot" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Pidgeot</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 59</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dùng chiêu hệ Điện (Thunderbolt) hoặc Băng (Ice Beam) để thổi bay nhanh gọn.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png" alt="Alakazam" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Alakazam</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 57</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sp. Atk cực cao nhưng Def cực thấp. Hãy dùng đòn Vật Lý mạnh như Body Slam hoặc Shadow Ball từ Snorlax để hạ đo ván.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png" alt="Rhydon" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #b45309;">Rhydon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 59</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đất / Đá</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thương tổn gấp 4 lần trước hệ Nước và Cỏ. Một chiêu Surf nhẹ nhàng là đủ tiễn nó bay màu.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png" alt="Exeggutor" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Exeggutor / Gyarados / Arcanine</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 61</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ / Nước / Lửa</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thay đổi tùy theo Starter của bạn. Tận dụng khắc chế hệ tương ứng để xử lý gọn gàng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="Charizard" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Charizard / Blastoise / Venusaur (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 63</td>
            <td style="padding: 12px 16px;">Hệ Khắc bạn</td>
            <td style="padding: 12px 16px;">Pokémon Starter tối thượng tiến hóa cấp 3 cực kỳ bá đạo. Hãy dùng Pokémon khắc hệ của bạn dự phòng từ trước để phản công xuất sắc!</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Lời khuyên vàng:</strong> Đội hình của Rival vô cùng cân bằng, hãy chuẩn bị đầy đủ bình hồi máu Hyper Potion và Revive từ trước. Chúc mừng bạn sau khi chiến thắng, bạn sẽ được giáo sư Oak vinh danh tại <strong>Hall of Fame</strong>, kết thúc xuất sắc cốt truyện chính của game!
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 11: Toàn tập Quần đảo Sevii Islands",
    order: 11,
    language: "vi",
    content: `
      <h1>Phần 11: Toàn tập Quần đảo Sevii Islands</h1>
      <p>Sau khi chiến thắng giải đấu Kanto League, thế giới Pokémon mở ra một chương hoàn toàn mới cực kỳ đồ sộ với Quần đảo <strong>Sevii Islands</strong> kỳ bí bao gồm 7 hòn đảo lớn.</p>

      <h2>Điều kiện mở khóa:</h2>
      <p>Bạn cần bắt tối thiểu <strong>60 hệ loài Pokémon khác nhau</strong> trong Pokédex, sau đó ghé thăm Giáo sư Oak để nâng cấp lên chiếc <strong>National Pokédex</strong> huyền thoại. Lên tàu Tri-Pass tại bến cảng Vermilion City để bắt đầu hành trình!</p>

      <h2>Nhiệm vụ cốt lõi: Săn tìm Ngọc Ruby và Sapphire</h2>
      <p>Để giúp đỡ kĩ sư máy tính Celio tại Đảo Một kết nối cỗ máy giao lưu giữa vùng Kanto và Hoenn, bạn phải tiến hành giải đố chuỗi nhiệm vụ khổng lồ trên quần đảo:</p>

      <h3>1. Đảo Một (One Island) - Mt. Ember & Suối nước nóng</h3>
      <ul>
        <li>Đi lên phía bắc qua vùng biển Treasure Beach để tới ngọn núi lửa khổng lồ <strong>Mt. Ember</strong>.</li>
        <li>Tại chân núi, bạn sẽ nghe thấy hai tên Rocket Grunts đang bàn tán xì xào mật khẩu mở cửa Rocket Warehouse. Đánh bại chúng để lấy mật khẩu.</li>
        <li><strong>Bắt Moltres:</strong> Tiến sâu vào lòng núi lửa Mt. Ember, giải đố đẩy đá để leo lên đỉnh núi tóm gọn chim lửa huyền thoại <strong>Moltres</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png" style="max-width:24px; vertical-align:middle;" /> ở cấp độ 50.</li>
        <li><strong>Nhận HM06 Rock Smash:</strong> Ghé qua suối nước nóng Ember Spa rực rỡ, nói chuyện với ông lão để nhận đĩa HM06 giúp phá vỡ các tảng đá nứt cản lối trên đường đi.</li>
      </ul>

      <h3>2. Đảo Hai (Two Island) - Thầy dạy chiêu tối thượng & Giải cứu bé Lostelle</h3>
      <ul>
        <li>Ghé thăm căn nhà gỗ nhỏ tại Cape Brink phía bắc hòn đảo. Thầy dạy chiêu huyền thoại sẽ dạy miễn phí các chiêu tối thượng: <strong>Frenzy Plant</strong> (hệ Cỏ), <strong>Blast Burn</strong> (hệ Lửa), hoặc <strong>Hydro Cannon</strong> (hệ Nước) dành riêng cho chú Starter tiến hóa cấp 3 của bạn.</li>
        <li>Ghé trung tâm Game Corner để nói chuyện với bố cô bé Lostelle, ông đang khóc lóc vì con gái mình mất tích bí ẩn tại Đảo Ba.</li>
      </ul>

      <h3>3. Đảo Ba (Three Island) - Quét sạch băng đảng đua xe & Thám hiểm Rừng sâu Berry Forest</h3>
      <ul>
        <li>Đặt chân lên đảo, bạn sẽ đụng độ băng đảng mô tô quậy phá (Bikers). Hãy hạ gục toàn bộ bọn chúng để đem lại yên bình cho hòn đảo.</li>
        <li>Đi về phía tây qua Bond Bridge, tiến thẳng vào khu rừng âm u dày đặc sương mù <strong>Berry Forest</strong>.</li>
        <li>Giải cứu cô bé Lostelle đang bị giam cầm trong nỗi sợ hãi bởi một chú <strong>Hypno</strong> hoang dã cấp 30 giận dữ. Đánh bại hoặc bắt chú Hypno này để giải thoát cho cô bé và đưa cô về nhà an toàn.</li>
      </ul>

      <h3>4. Đảo Bốn (Four Island) - Khám phá Hang băng giá Icefall Cave & HM07 Waterfall</h3>
      <ul>
        <li>Đầy là quê hương của thành viên Elite Four Lorelei. Gặp cô ấy và Rival tại trung tâm thị trấn.</li>
        <li>Thám hiểm hang băng buốt giá <strong>Icefall Cave</strong> nằm phía đông bắc hòn đảo. Lướt qua các thềm băng nứt sụt lún ngắm cảnh để lấy được đĩa <strong>HM07 Waterfall</strong> (Vượt Thác Nước).</li>
        <li>Học chiêu Waterfall và bơi ngược thác nước ngầm bên trong hang để giúp đỡ Lorelei đánh đuổi tàn dư Team Rocket đang hành hạ các Pokémon hoang dã vô tội.</li>
      </ul>

      <h3>5. Đảo Năm (Five Island) - Đột nhập sào huyệt Rocket Warehouse</h3>
      <ul>
        <li>Thám hiểm khu vực đồng cỏ Five Island Meadow đầy rẫy nhà huấn luyện mạnh mẽ.</li>
        <li>Phát hiện căn biệt thự xa hoa Resort Gorgeous phía bắc hòn đảo. Đi qua mê cung hang động <strong>Lost Cave</strong> để giải cứu cô nàng Selphy đỏng đảnh lạc đường. Đưa cô về biệt thự, thỉnh thoảng cô sẽ nhờ bạn đem cho xem các Pokémon ngẫu nhiên để tặng những viên đá tiến hóa (Evolution Stones) quý giá.</li>
        <li>Ghé thăm vùng Memorial Pillar linh thiêng phía nam, đặt một hộp nước quả Lemonade lên tấm bia mộ chú Onix quá cố để nhận đĩa TM quý từ người huấn luyện thương tiếc.</li>
      </ul>

      <h3>6. Đảo Sáu (Six Island) - Giải đố mật thư Dotted Hole hóc búa</h3>
      <ul>
        <li>Đi xuống phía nam qua thung lũng cổ kính Ruin Valley để tìm thấy một hang đá bí ẩn hình mái vòm có tên là <strong>Dotted Hole</strong>.</li>
        <li><strong>Giải mã cửa đá:</strong> Sử dụng chiêu <strong>Cut</strong> lên cánh cửa đá để phá vỡ phong ấn thần bí tiến vào bên trong.</li>
        <li><strong>Giải đố chữ nổi Braille:</strong> Đi xuống lỗ sụt lún, đọc các chữ nổi và di chuyển theo hướng dẫn chính xác: <strong>Lên -> Trái -> Phải -> Xuống</strong> (Up -> Left -> Right -> Down) để tới phòng chứa viên ngọc xanh **Sapphire** quý giá.</li>
        <li>Ngay khi bạn định nhặt ngọc Sapphire, gã nhà khoa học phản diện Team Rocket tên là Gideon sẽ lao ra giật mất viên ngọc và chạy trốn về Rocket Warehouse ở Đảo Năm.</li>
        <li><strong>Quyết chiến tại Rocket Warehouse:</strong> Quay lại Đảo Năm, đột nhập sào huyệt của chúng (bây giờ đã có mật khẩu đầy đủ). Vượt qua các ô di chuyển tự động, đánh bại toàn bộ tay sai, hạ gục Gideon để lấy lại ngọc Sapphire!</li>
        <li><strong>Kích hoạt kết nối liên vùng:</strong> Đem ngọc Sapphire và ngọc Ruby thu hoạch được giao trả cho Celio tại Đảo Một. Máy liên lạc vũ trụ sẽ chính thức sáng đèn hoạt động, mở cổng trao đổi Pokémon tự do giữa Kanto và vùng Hoenn (Gen 3)!</li>
      </ul>

      <h3>7. Đảo Bảy (Seven Island) - Trainer Tower & Chinh phục hang đá Unown</h3>
      <ul>
        <li>Trải nghiệm thử thách cực hạn tại tháp đấu <strong>Trainer Tower</strong> với các chế độ đấu đơn, đấu đôi cực kỳ khắc nghiệt.</li>
        <li>Vượt qua hẻm núi Sevii Canyon hiểm trở, giải đố những tảng đá đẩy khổng lồ tại <strong>Tanoby Key</strong> bằng cách dùng chiêu Strength căn chỉnh đẩy tất cả viên đá rơi trúng vào lòng các lỗ khoét sâu dưới sàn. Việc này sẽ mở khóa các căn buồng cổ xưa <strong>Tanoby Ruins</strong> dưới biển sâu, cho phép bạn bắt loài Pokémon ký tự cổ đại <strong>Unown</strong> huyền bí với đầy đủ 28 dạng chữ cái độc đáo!</li>
      </ul>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 12: Chim Huyền Thoại, Mewtwo & Bí mật Move Tutors",
    order: 12,
    language: "vi",
    content: `
      <h1>Phần 12: Chim Huyền Thoại, Mewtwo & Bí mật Move Tutors</h1>
      <p>Sau khi thiết lập kết nối liên vùng thành công, hành trình Pokémon của bạn sẽ hoàn thiện tuyệt đối bằng việc săn lùng những quái thú cổ đại tối thượng và nâng tầm sức mạnh đội hình lên mức vô địch.</p>

      <h2>1. Săn tìm Bộ Ba Chim Huyền Thoại (Legendary Birds)</h2>
      <p>Cả ba chú chim thần thoại đều trú ngụ tại các địa danh hiểm trở và có cấp độ 50 cực kỳ mạnh mẽ. Hãy mang theo thật nhiều Ultra Balls và đưa chúng về trạng thái xấu (như ngủ, tê liệt) trước khi quăng bóng!</p>
      <ul>
        <li><strong>Articuno (Chim Băng - Lvl 50):</strong> Trú ngụ tại tầng sâu nhất hang đá Seafoam Islands (Route 20). Bạn cần dùng chiêu Strength đẩy các khối đá xuống dòng nước chảy xiết để ngăn dòng chảy mạnh giúp bạn bơi lội tới chỗ nó.</li>
        <li><strong>Zapdos (Chim Điện - Lvl 50):</strong> Trú ngụ tại nhà máy điện bỏ hoang Power Plant mạn đông Kanto. Hãy lướt sóng Surf từ Route 10 rẽ nhánh đi men theo dòng sông nhỏ xuống phía nam để đặt chân vào nhà máy điện bỏ hoang.</li>
        <li><strong>Moltres (Chim Lửa - Lvl 50):</strong> Trú ngụ tại đỉnh ngọn núi Mt. Ember đầy khói bụi rực cháy của Đảo Một (One Island).</li>
      </ul>

      <h2>2. Thách thức Quái thú tối thượng Mewtwo (Lvl 70)</h2>
      <p>Sau khi cỗ máy liên lạc của Celio hoạt động hoàn hảo, cửa hang cấm <strong>Cerulean Cave</strong> (nằm phía mạn trái bờ sông thành phố Cerulean) sẽ chính thức mở cửa phong ấn chào đón bạn.</p>
      <p>Đây là khu vực nguy hiểm nhất game với các Pokémon hoang dã cấp độ cực cao (50-60+). Tiến sâu vào lòng hang động tăm tối, bạn sẽ giáp mặt quái thú nhân tạo mạnh nhất trò chơi: <strong>Mewtwo</strong> ở cấp độ 70 rực rỡ!</p>
      <blockquote>
        <strong>Bí quyết bắt Mewtwo:</strong> Mewtwo sở hữu chiêu hồi máu cực nhanh Recover và chiêu phòng thủ trạng thái cực gắt Safeguard. Nó có thể dễ dàng quét sạch đội hình của bạn chỉ với đòn tấn công Psychic huyền thoại. Hãy ném ngay quả bóng <strong>Master Ball</strong> bạn nhận được từ chủ tịch Silph Co. để bắt sống nó ngay lập tức mà không tốn một giọt mồ hôi!
      </blockquote>

      <h2>3. Cơ chế độc lạ: Săn lùng Thần thú chạy rông vùng Johto (Roaming Beasts)</h2>
      <p>Một điểm cực kỳ thú vị và kích thích trong Pokémon FireRed là sự xuất hiện của một trong ba thần thú vùng Johto chạy rông trên khắp các ngọn cỏ vùng Kanto sau khi bạn kết nối thành công cỗ máy của Celio. Thần thú xuất hiện sẽ phụ thuộc hoàn toàn vào Pokémon Starter bạn chọn lựa:</p>
      <ul>
        <li><strong>Nếu chọn Bulbasaur:</strong> Chú sư tử lửa <strong>Entei</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png" style="max-width:32px; vertical-align:middle;" /> sẽ chạy rông hoang dã trên toàn Kanto.</li>
        <li><strong>Nếu chọn Squirtle:</strong> Thần thú sấm chớp <strong>Raikou</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png" style="max-width:32px; vertical-align:middle;" /> sẽ chạy rông hoang dã trên toàn Kanto.</li>
        <li><strong>Nếu chọn Charmander:</strong> Thần thú gió nước <strong>Suicune</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png" style="max-width:32px; vertical-align:middle;" /> sẽ chạy rông hoang dã trên toàn Kanto.</li>
      </ul>
      <blockquote>
        <strong>Mẹo săn thần thú chạy rông:</strong> Chúng sẽ liên tục thay đổi Route ngẫu nhiên mỗi khi bạn di chuyển sang bản đồ khác. Hãy mang theo một Pokémon có chiêu <em>Mean Look</em> (Crobat, Gengar) hoặc đặc tính <em>Shadow Tag</em> (Wobbuffet) xếp ở vị trí đầu tiên để ngăn chúng chạy trốn ngay lượt đầu chạm trán, rồi từ từ quăng bóng thu phục.
      </blockquote>

      <h2>4. Bảng tra cứu Thầy dạy chiêu (Move Tutors) ẩn quý hiếm</h2>
      <p>Dọc hành trình Kanto, bạn sẽ gặp các võ sư ẩn sĩ sẵn lòng dạy cho Pokémon của bạn các chiêu thức siêu cấp vô giá hoàn toàn miễn phí (mỗi chiêu chỉ dạy 1 lần):</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Tên chiêu thức</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ / Sức mạnh</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Vị trí thầy dạy chiêu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Mega Punch / Mega Kick</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường (80 / 120 Power)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hai võ sĩ đứng tập luyện ngoài lối ra hang Mt. Moon phía đông.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f87171;">Counter</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giác Đấu (Phản đòn gấp đôi)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tầng 2 của siêu thị Celadon Department Store, nói chuyện với NPC.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Rock Slide</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá (75 Power - Có tỉ lệ gây nao núng)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nói chuyện với gã võ sĩ đứng gần lối ra trong Victory Road.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #c084fc;">Dream Eater</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh (100 Power - Hồi máu khi đối thủ ngủ)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nói chuyện với người đàn ông ngái ngủ ở phía tây nam Viridian City.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Substitute</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường (Tạo thế thân thế mạng)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nói chuyện với cậu bé đứng ngoài vườn cỏ thành phố Celadon City.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Explosion</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường (250 Power - Tự sát gây sát thương lỗi)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nói chuyện với NPC ở thung lũng đá Mt. Ember núi lửa Đảo Một.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #cbd5e1;">Swords Dance</td>
            <td style="padding: 12px 16px;">Thường (Tăng mạnh chỉ số Attack thêm 2 cấp)</td>
            <td style="padding: 12px 16px;">Nhận từ thầy dạy chiêu đứng ở cây cầu gỗ nhỏ Cinnabar Island.</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Phần 13: Toàn tập HMs, Vật phẩm Nhiệm vụ & Trao đổi Pokémon",
    order: 13,
    language: "vi",
    content: `
      <h1>Phần 13: Toàn tập HMs, Vật phẩm Nhiệm vụ & Trao đổi Pokémon</h1>
      <p>Bản tra cứu nhanh toàn bộ các máy di chuyển đặc biệt (HMs), vật phẩm nhiệm vụ cốt lõi và các giao dịch Pokémon cực hời với các NPC trong bản game Pokémon FireRed!</p>

      <h2>1. Danh sách vị trí sở hữu tất cả các HM (Hidden Machines)</h2>
      <p>Các chiêu thức HM là bắt buộc để dọn dẹp chướng ngại vật trên đường và du hành khắp bản đồ Kanto:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(59, 130, 246, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">HM / Chiêu thức</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Tác dụng ngoài trận</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Vị trí lấy cụ thể</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Huy hiệu yêu cầu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">HM01: Cut (Chặt cây)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Chặt các cây bụi cản đường để mở lối đi ẩn.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận từ thuyền trưởng bị say sóng trên tàu <strong>S.S. Anne</strong> tại thành phố cảng Vermilion City.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Cascade Badge (Gym 2)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">HM02: Fly (Bay nhanh)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bay tức thời tới bất kỳ thành phố nào bạn từng ghé thăm.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận từ cô gái trong căn nhà ẩn phía bắc <strong>Route 16</strong> (dùng chiêu Cut ở mạn trái thành phố Celadon City).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Thunder Badge (Gym 3)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">HM03: Surf (Lướt sóng)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bơi trên nước để vượt biển, sông ngòi.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tìm thấy trong ngôi nhà bí mật <strong>Secret House</strong> ở góc sâu nhất của khu bảo tồn <strong>Safari Zone</strong> (Fuchsia City).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Soul Badge (Gym 5)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">HM04: Strength (Sức mạnh)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đẩy các tảng đá tròn lớn trong hang động.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giao chiếc răng vàng <strong>Gold Teeth</strong> (nhặt được ở góc sâu nhất Safari Zone) cho ông chủ khu bảo tồn <strong>Warden</strong> tại ngôi nhà phía đông Fuchsia City.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #22c55e;">Rainbow Badge (Gym 4)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">HM05: Flash (Thắp sáng)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thắp sáng toàn bộ các hang động tối om như Rock Tunnel.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Gặp người trợ lý của Giáo sư Oak trong trạm gác lớn ở phía nam <strong>Route 2</strong> (đi qua hang Diglett's Cave). Yêu cầu bạn đã đăng ký ít nhất <strong>10 loài Pokémon</strong> vào Pokédex.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Boulder Badge (Gym 1)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">HM06: Rock Smash (Đập đá)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đập vụn các tảng đá nứt chặn đường mòn.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nói chuyện với ông lão trong hang tắm khoáng nóng <strong>Ember Spa</strong> tại hòn đảo <strong>One Island</strong> (Sevii Islands).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Marsh Badge (Gym 6)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">HM07: Waterfall (Leo thác)</td>
            <td style="padding: 12px 16px;">Leo ngược dòng các dòng thác nước dốc đứng hùng vĩ.</td>
            <td style="padding: 12px 16px;">Tìm thấy sâu trong hang động băng tuyết <strong>Icefall Cave</strong> tại hòn đảo <strong>Four Island</strong> (Sevii Islands).</td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Volcano Badge (Gym 7)</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Bản tra cứu các Vật phẩm làm Nhiệm vụ Cốt truyện</h2>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left; width: 150px;">Vật phẩm</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Cách thức sở hữu</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Mục đích / Nhiệm vụ cốt truyện</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Oak's Parcel</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận từ người bán hàng Poké Mart tại thành phố Viridian City ở đầu game.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đem giao trả về Pallet Town cho Giáo sư Oak để nhận Pokédex và Poké Balls khởi hành.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">S.S. Ticket</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ghé thăm căn lều Sea Cottage (Route 25) phía bắc Cerulean, giúp đỡ giải cứu nhà khoa học <strong>Bill</strong> khỏi lốt Pokémon.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Mở khóa cho phép đi qua trạm gác xuống bến cảng Vermilion City để bước lên du thuyền S.S. Anne.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Silph Scope</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đánh bại ông trùm Giovanni tại sào huyệt sâu dưới tầng hầm tòa nhà Game Corner (Celadon City).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dùng để soi kính thần nhìn rõ thực thể các vong hồn ma hệ Ghost tại tháp cổ Lavender Town.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Poké Flute</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giải cứu ông lão tội nghiệp Mr. Fuji khỏi nanh vuốt Team Rocket trên đỉnh tháp Pokémon Tower (Lavender Town).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dùng để thổi sáo đánh thức hai chú Pokémon khổng lồ **Snorlax** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" style="max-width:24px; vertical-align:middle;" /> đang nằm ngủ say như chết chặn cứng lối đi Route 12 và Route 16.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #22c55e;">Card Key</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tìm thấy phát sáng dưới sàn nhà ở tầng 5 tòa tháp tổng bộ <strong>Silph Co.</strong> (Saffron City).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Mở khóa tất cả các cánh cửa sắt công nghệ ngăn cách trên mọi tầng lầu của Silph Co.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Tri-Pass & Rainbow Pass</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lần lượt nhận từ Bill sau khi thắng Blaine ở Cinnabar Gym, và từ Celio trên One Island sau khi đưa đá Ruby cho anh ta.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sử dụng tại bến cảng tàu tốc hành Vermilion để di chuyển tự do qua lại các đảo Sevii Islands huyền bí.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #ec4899;">Ruby & Sapphire</td>
            <td style="padding: 12px 16px;">Ruby tìm thấy ở Mt. Ember (One Island). Sapphire tìm thấy ở hố sụt Dotted Hole (Six Island), sau đó đoạt lại từ tên trộm Gideon ở tổng bộ kho hàng Rocket Warehouse (Five Island).</td>
            <td style="padding: 12px 16px;">Giao cho Celio lắp đặt vào cỗ máy truyền dẫn khổng lồ ở One Island, kích hoạt kết nối liên vùng giao thương Pokémon với các bản game Hoenn (Ruby/Sapphire/Emerald).</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Các giao dịch trao đổi Pokémon cực giá trị với NPC (In-Game Trades)</h2>
      <p>Trải khắp Kanto, có các nhà nghiên cứu hoặc huấn luyện viên sẵn lòng trao cho bạn những Pokémon độc lạ với chỉ số vượt bậc và lượng điểm kinh nghiệm tăng tốc nhanh chóng:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Địa điểm NPC đứng</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: center;">Bạn trao (Give)</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: center;">Bạn nhận (Get)</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Đánh giá độ hữu dụng & Biệt danh Pokémon nhận</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Căn nhà nhỏ ở Route 2 (Phía nam Pewter City)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png" style="max-width:32px;" /><br/>Abra
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png" style="max-width:32px;" /><br/><span style="color:#a855f7; font-weight:bold;">Mr. Mime</span>
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Biệt danh: <strong>MIMIEN</strong>. Đây là cách <strong>duy nhất</strong> để sở hữu chú hề hệ Siêu Linh cực mạnh này trong game. Chỉ số tốc độ và tấn công đặc biệt cao vượt bậc rất hữu dụng để quét sạch Gym Giác Đấu sau này!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Căn nhà nhỏ mạn đông Vermilion City</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png" style="max-width:32px;" /><br/>Spearow
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png" style="max-width:32px;" /><br/><span style="color:#cbd5e1; font-weight:bold;">Farfetch'd</span>
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Biệt danh: <strong>CH'DING</strong>. Đi kèm sẵn vật phẩm trấn phái **Leek** (Tăng mạnh tỷ lệ bạo kích). Cực kỳ hữu dụng ở đầu game nhờ có sẵn đòn chém dứt điểm mạnh và có thể học ngay HM01 Cut.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Ngôi nhà sát vách Poké Mart (Cerulean City)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png" style="max-width:32px;" /><br/>Poliwhirl
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png" style="max-width:32px;" /><br/><span style="color:#f87171; font-weight:bold;">Jynx</span>
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Biệt danh: <strong>ZYNX</strong>. Quái thú hệ Băng / Siêu Linh tuyệt vời chuyên để trị rồng Lance trong Tứ Đại Thiên Vương. Nó học sẵn đòn hát ru ngủ cực mạnh và thăng cấp nhanh vù vù!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Tòa nhà thí nghiệm Cinnabar Lab (Cinnabar Island)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png" style="max-width:32px;" /><br/>Raichu
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png" style="max-width:32px;" /><br/><span style="color:#fbbf24; font-weight:bold;">Electrode</span>
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Biệt danh: <strong>DUX</strong>. Đi kèm sẵn vật phẩm Magnet (Tăng 10% uy lực hệ Điện). Pokémon nhanh nhất toàn game đấu, cực hữu ích để thi triển đòn giật điện phủ đầu sấm sét.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold;">Tòa nhà thí nghiệm Cinnabar Lab (Cinnabar Island)</td>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png" style="max-width:32px;" /><br/>Ponyta
            </td>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png" style="max-width:32px;" /><br/><span style="color:#60a5fa; font-weight:bold;">Seel</span>
            </td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Biệt danh: <strong>SEELOR</strong>. Sở hữu sẵn viên đá tiến hóa Water Stone cực hiếm. Khi bạn tiến hóa chú hải cẩu này thành Dewgong (hệ Nước/Băng), nó sẽ là một lá bài tẩy đáng tin cậy.</td>
          </tr>
        </tbody>
      </table>
    `
  }
,
  {
    gameVersion: "firered",
    chapterTitle: "Phần 14: Bí mật các Thần thú Siêu Hiếm, Huyền Thoại & Huyền Ảo",
    order: 14,
    language: "vi",
    content: `
      <h1>Phần 14: Bí mật các Thần thú Siêu Hiếm, Huyền Thoại & Huyền Ảo</h1>
      <p>Khi liên kết đa vùng được thiết lập hoàn chỉnh giữa vùng Kanto cổ xưa và quần đảo Sevii bí ẩn, những bí mật về các thực thể mang sức mạnh bạo liệt vạn năm mới chính thức thức tỉnh. Dưới đây là hành trình để săn lùng và quy phục những sinh vật tối thượng này!</p>

      <!-- SECTION 1: JOHTO ROAMING BEASTS -->
      <h2 style="color: #fb7185; border-left: 4px solid #f43f5e; padding-left: 12px; margin-top: 32px; font-size: 22px;">1. Linh Thú Hoang Dã Chạy Rông: Bộ Ba Thần Thú Johto</h2>
      <p style="color: #94a3b8; line-height: 1.6; margin-bottom: 24px;">Sau khi đánh bại Elite Four và khôi phục hoàn chỉnh cỗ máy kết nối liên vùng của Celio, một linh thú huyền thoại vùng Johto sẽ lập tức giáng trần và chạy rông ngẫu nhiên khắp các thảm cỏ vùng Kanto ở <strong>Cấp độ 50</strong>. Thần thú xuất hiện sẽ được quyết định bởi Pokémon khởi đầu (Starter) bạn chọn ban đầu:</p>

      <div style="display: flex; flex-direction: column; gap: 20px; margin: 24px 0;">
        <!-- RAIKOU CARD (SQUIRTLE) -->
        <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 16px; padding: 20px; display: flex; flex-direction: row; gap: 20px; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);">
          <div style="flex: 1; text-align: center; min-width: 150px;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/243.png" alt="Raikou" style="max-width: 120px; filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.4)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="flex: 3; min-width: 250px;">
            <span style="background-color: rgba(234, 179, 8, 0.2); color: #f59e0b; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">Yêu cầu: Chọn Squirtle</span>
            <h3 style="color: #f59e0b; margin: 8px 0 0 0; font-size: 20px;">Lôi Điện Linh Thú: Raikou (#243)</h3>
            <p style="color: #cbd5e1; line-height: 1.6; margin: 4px 0 8px 0;"><strong>Hệ:</strong> Điện (Electric) | <strong>Cấp độ:</strong> 50</p>
            <p style="color: #94a3b8; line-height: 1.6; margin: 0;"><strong>Bí quyết săn bắt:</strong> Kẻ chạy trốn nhanh nhất thế giới. Hãy dùng đặc tính <strong>Shadow Tag</strong> của Wobbuffet để khóa chặt chân nó, hoặc dùng chiêu <strong>Mean Look</strong> ngay lượt đầu tiên. Nếu không muốn đau đầu, hãy ném thẳng quả <strong>Master Ball</strong>!</p>
          </div>
        </div>

        <!-- ENTEI CARD (BULBASAUR) -->
        <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(249, 115, 22, 0.3); border-radius: 16px; padding: 20px; display: flex; flex-direction: row; gap: 20px; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);">
          <div style="flex: 1; text-align: center; min-width: 150px;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/244.png" alt="Entei" style="max-width: 120px; filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.4)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="flex: 3; min-width: 250px;">
            <span style="background-color: rgba(249, 115, 22, 0.2); color: #f97316; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">Yêu cầu: Chọn Bulbasaur</span>
            <h3 style="color: #f97316; margin: 8px 0 0 0; font-size: 20px;">Hỏa Diệm Linh Thú: Entei (#244)</h3>
            <p style="color: #cbd5e1; line-height: 1.6; margin: 4px 0 8px 0;"><strong>Hệ:</strong> Lửa (Fire) | <strong>Cấp độ:</strong> 50</p>
            <p style="color: #94a3b8; line-height: 1.6; margin: 0;"><strong>CẢNH BÁO LỖI GEN 3:</strong> Entei sở hữu chiêu <strong>Roar (Gầm thét)</strong>. Do lỗi lập trình gốc của thế hệ 3, nếu nó dùng Roar để ép trận chiến kết thúc, Entei sẽ <strong>biến đổi biến mất vĩnh viễn</strong> khỏi game! Hãy hạ gục tinh thần nó bằng trạng thái Ngủ (Sleep) ngay lập tức hoặc ném <strong>Master Ball</strong> không chần chừ!</p>
          </div>
        </div>

        <!-- SUICUNE CARD (CHARMANDER) -->
        <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 20px; display: flex; flex-direction: row; gap: 20px; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);">
          <div style="flex: 1; text-align: center; min-width: 150px;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/245.png" alt="Suicune" style="max-width: 120px; filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.4)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="flex: 3; min-width: 250px;">
            <span style="background-color: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">Yêu cầu: Chọn Charmander</span>
            <h3 style="color: #3b82f6; margin: 8px 0 0 0; font-size: 20px;">Thủy triều Linh Thú: Suicune (#245)</h3>
            <p style="color: #cbd5e1; line-height: 1.6; margin: 4px 0 8px 0;"><strong>Hệ:</strong> Nước (Water) | <strong>Cấp độ:</strong> 50</p>
            <p style="color: #94a3b8; line-height: 1.6; margin: 0;"><strong>Bí quyết săn bắt:</strong> Suicune thiên hướng phòng thủ cực kỳ cao và trâu bò. Hãy đưa nó vào trạng thái tê liệt hoặc ru ngủ (Hypnosis/Sleep Powder) rồi kiên trì ném Ultra Ball để thu phục.</p>
          </div>
        </div>
      </div>

      <!-- SECTION 2: MEWTWO -->
      <h2 style="color: #a855f7; border-left: 4px solid #a855f7; padding-left: 12px; margin-top: 32px; font-size: 22px;">2. Tuyệt Tác Di Truyền Tối Thượng: Mewtwo</h2>
      <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(168, 85, 247, 0.5); border-radius: 16px; padding: 24px; display: flex; flex-direction: row; gap: 24px; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 25px -5px rgba(168, 85, 247, 0.3); margin-bottom: 24px;">
        <div style="flex: 1; text-align: center; min-width: 150px;">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" alt="Mewtwo" style="max-width: 130px; filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        <div style="flex: 3; min-width: 250px;">
          <span style="background-color: rgba(168, 85, 247, 0.2); color: #c084fc; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">Siêu Quái Thú - Thần Ma Di Truyền</span>
          <h3 style="color: #c084fc; margin: 8px 0; font-size: 22px;">Chiến Thần Nhân Tạo: Mewtwo (#150)</h3>
          <p style="color: #cbd5e1; line-height: 1.6; margin: 0 0 8px 0;"><strong>Hệ:</strong> Tâm Linh (Psychic) | <strong>Cấp độ:</strong> 70</p>
          <p style="color: #94a3b8; line-height: 1.6; margin: 0;"><strong>Vị trí & Cách chuẩn bị:</strong> Hoàn thành mạng lưới liên lạc liên vùng của Celio để mở khóa mê cung hang động huyền thoại <strong>Cerulean Cave</strong> phía bắc thành phố Cerulean. Mewtwo ngự trị tại tầng đáy sâu nhất của hang.
            <br/>• <strong>Chuẩn bị:</strong> Mang theo các Pokémon hệ Bóng Tối trâu bò hoặc kháng Tâm Linh cực tốt. Đưa các chiêu ru ngủ mạnh vào trận đấu.
            <br/>• <strong>Mẹo bắt nhanh:</strong> Mewtwo liên tục dùng chiêu <em>Recover</em> để hồi phục máu đầy trở lại. Cách tối ưu nhất là ném quả <strong>Master Ball</strong> của bạn ngay từ lượt đầu tiên để sở hữu quái thú tối thượng này trong tích tắc!
          </p>
        </div>
      </div>

      <!-- SECTION 3: MYTHICAL ISLAND EVENTS -->
      <h2 style="color: #10b981; border-left: 4px solid #10b981; padding-left: 12px; margin-top: 32px; font-size: 22px;">3. Sự Kiện Đảo Ẩn: Hải Vương Lugia, Phượng Hoàng Ho-Oh & Thần Vũ Trụ Deoxys</h2>
      <p style="color: #94a3b8; line-height: 1.6; margin-bottom: 20px;">Sử dụng các tấm vé tàu sự kiện huyền thoại để khởi hành tới những hòn đảo hoang vắng chưa từng được ghi trên Town Map:</p>

      <div style="display: flex; flex-direction: column; gap: 20px; margin: 24px 0;">
        <!-- DEOXYS CARD -->
        <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 16px; padding: 20px; display: flex; flex-direction: row; gap: 20px; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.2);">
          <div style="flex: 1; text-align: center; min-width: 140px;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/386.png" alt="Deoxys" style="max-width: 110px; filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.5)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="flex: 3; min-width: 250px;">
            <span style="background-color: rgba(239, 68, 68, 0.2); color: #f87171; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">Dạng Tấn Công Đặc Quyền FireRed</span>
            <h3 style="color: #f87171; margin: 8px 0; font-size: 20px;">Thực Thể Ngoài Hành Tinh: Deoxys (#386)</h3>
            <p style="color: #cbd5e1; line-height: 1.6; margin: 0 0 8px 0;"><strong>Hệ:</strong> Tâm Linh (Psychic) | <strong>Cấp độ:</strong> 30</p>
            <p style="color: #94a3b8; line-height: 1.6; margin: 0;"><strong>Cách thu phục:</strong> Cầm tấm vé <strong>Aurora Ticket</strong> lên tàu từ bến cảng Vermilion tới đảo <strong>Birth Island</strong>. Chạm vào khối đá tam giác đỏ ở tâm đảo và giải câu đố tam giác dịch chuyển bằng số bước di chuyển ít nhất. Khi khối đá chuyển màu đỏ rực tỏa nhiệt lượng cực độ, <strong>Deoxys (Dạng Tấn Công - Attack Form)</strong> sẽ lập tức xuất kích tấn công bạn!</p>
          </div>
        </div>

        <!-- NAVEL ROCK CARDS (LUGIA & HO-OH) -->
        <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 16px; padding: 24px; display: flex; flex-direction: row; gap: 24px; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.2); margin-bottom: 24px;">
          <div style="flex: 1; text-align: center; min-width: 150px; display: flex; justify-content: center; gap: 15px;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png" alt="Lugia" style="max-width: 80px; filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.5)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.1) rotate(5deg)'" onmouseout="this.style.transform='scale(1) rotate(0deg)'" />
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/250.png" alt="Ho-Oh" style="max-width: 80px; filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.5)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.1) rotate(-5deg)'" onmouseout="this.style.transform='scale(1) rotate(0deg)'" />
          </div>
          <div style="flex: 3; min-width: 250px;">
            <span style="background-color: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">Cựu Thần Song Chim Johto</span>
            <h3 style="color: #60a5fa; margin: 8px 0; font-size: 22px;">Hải Vương Lugia (#249) & Hỏa Phượng Ho-Oh (#250)</h3>
            <p style="color: #cbd5e1; line-height: 1.6; margin: 0 0 8px 0;"><strong>Hệ:</strong> Siêu Linh / Bay & Lửa / Bay | <strong>Cấp độ:</strong> 70</p>
            <p style="color: #94a3b8; line-height: 1.6; margin: 0;"><strong>Bí mật đồi tháp Navel Rock:</strong> Sử dụng tấm vé thần kỳ <strong>Mystic Ticket</strong> cập bến tháp đá khổng lồ <strong>Navel Rock</strong>. 
              <br/>• <strong>Đường đi xuống thâm hải:</strong> Rẽ theo lối đi xuống cầu thang sâu thẳm trong bóng tối ngập tràn tiếng sóng để chạm trán <strong>Lugia (Level 70)</strong> huyền bí tại đáy đại dương ngầm.
              <br/>• <strong>Đường đi lên đỉnh thiên tháp:</strong> Rẽ theo lối leo thang lên đỉnh tháp lộng gió để đối mặt với vị vua bầu trời phương Nam <strong>Ho-Oh (Level 70)</strong> rực lửa thần thánh.
            </p>
          </div>
        </div>
      </div>
    `
  }
];


export const ENGLISH_FIRERED_CHAPTERS = [
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 1: The Journey Begins at Pallet Town",
    order: 1,
    language: "en",
    content: `
      <h1>Chapter 1: The Journey Begins at Pallet Town</h1>
      <p>Welcome to the legendary land of Kanto! Your epic adventure commences in the quiet, peaceful neighborhood of <strong>Pallet Town</strong>.</p>

      <h2>1. Choosing Your Starter Pokémon</h2>
      <p>Try to venture into the tall grass to the north, and Professor Oak will stop you, leading you to his laboratory. Here, you will choose one of three starter Pokémon:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Primary Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Tactical Evaluation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Bulbasaur" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">BULBASAUR</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Grass / Poison</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;"><strong>Easiest Route!</strong> Immune to poison effects and sweeps the first two gyms (Rock & Water) effortlessly.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Squirtle" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">SQUIRTLE</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;"><strong>Balanced Route!</strong> Has great physical bulk and learns diverse moves like Surf and Ice Beam later in the game.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f97316;">CHARMANDER</td>
            <td style="padding: 12px 16px;">Fire</td>
            <td style="padding: 12px 16px; color: #cbd5e1;"><strong>Hardest Route!</strong> Struggles early due to type disadvantages in Gyms 1 & 2, but evolves into Charizard, a devastating offensive powerhouse.</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Acquiring the Pokédex & Town Map</h2>
      <p>Fight your Rival, then proceed north up Route 1 to <strong>Viridian City</strong>. Grab <strong>Oak's Parcel</strong> at the Poke Mart, deliver it back to Oak, and earn your official <strong>Pokédex</strong> and Poké Balls. Visit Daisy next door to grab the useful <strong>Town Map</strong>!</p>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 2: Gym 1 - Boulder Badge",
    order: 2,
    language: "en",
    content: `
      <h1>Chapter 2: Gym 1 - Boulder Badge</h1>
      <p>Travel north from Viridian City through Route 2 and navigate the dense and winding pathways of <strong>Viridian Forest</strong> to reach Pewter City.</p>

      <h2>1. Challenging Gym Leader Brock</h2>
      <p>Brock specializes in Rock/Ground-type Pokémon, boasting immense physical defense statistics.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Dangerous Moves</th>
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
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tackle, Defense Curl, Rock Tomb</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" alt="Onix" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #94a3b8;">Onix</td>
            <td style="padding: 12px 16px;">Lvl 14</td>
            <td style="padding: 12px 16px;">Rock / Ground</td>
            <td style="padding: 12px 16px;">Rock Tomb, Bind, Screech, Tackle</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Tactical Cheat Code:</strong>
        <ul>
          <li>If you selected <strong>Bulbasaur</strong> or <strong>Squirtle</strong>, simply use Vine Whip or Bubble to sweep Brock with 4x effective elemental weaknesses.</li>
          <li>If you selected <strong>Charmander</strong>, catch a wild <strong>Mankey</strong> on Route 22 and level it up to Level 9 to learn the Fighting-type move <em>Low Kick</em>, or level Charmander to Level 13 to learn <em>Metal Claw</em>.</li>
        </ul>
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 3: Gym 2 - Cascade Badge",
    order: 3,
    language: "en",
    content: `
      <h1>Chapter 3: Gym 2 - Cascade Badge</h1>
      <p>Go east down Route 3, buy a Magikarp (for a quick Gyarados evolution) at the Poke Center, and enter <strong>Mt. Moon</strong>.</p>

      <h2>1. Infiltrating Mt. Moon</h2>
      <p>Defeat the Team Rocket grunts inside the cave. At the exit, choose one of two prehistoric fossil assets: <strong>Helix Fossil</strong> (Omanyte) or <strong>Dome Fossil</strong> (Kabuto). Head east to enter <strong>Cerulean City</strong>.</p>

      <h2>2. Challenging Misty at Cerulean Gym</h2>
      <p>Misty commands Water-type Pokémon with fast recovery capabilities and strong offensive power.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Dangerous Moves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png" alt="Staryu" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Staryu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 18</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water Pulse, Swift, Tackle</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png" alt="Starmie" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Starmie</td>
            <td style="padding: 12px 16px;">Lvl 21</td>
            <td style="padding: 12px 16px;">Water / Psychic</td>
            <td style="padding: 12px 16px;">Water Pulse, Swift, Recover, Rapid Spin</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>How to Defeat Starmie:</strong> Starmie recovers rapidly using Recover. Head north up <strong>Nugget Bridge</strong>, capture a wild Grass-type <strong>Oddish</strong> or <strong>Bellsprout</strong> on Route 24/25, and use their elemental advantages to absorb Starmie's health and win easily.
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 4: Gym 3 - Thunder Badge",
    order: 4,
    language: "en",
    content: `
      <h1>Chapter 4: Gym 3 - Thunder Badge</h1>
      <p>Help Bill out at Route 25 to receive your <strong>S.S. Ticket</strong>, then march south through the underground connector to reach <strong>Vermilion City</strong>.</p>

      <h2>1. S.S. Anne Cruise Ship</h2>
      <p>Board the massive S.S. Anne, battle your Rival, and find the Captain in his luxury suite at the top. Massage his back to obtain <strong>HM01 Cut</strong>.</p>

      <h2>2. Challenging Lt. Surge</h2>
      <p>Surge locks his Gym behind an annoying double-switch puzzle in garbage cans, wielding highly agile Electric-type monsters.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Dangerous Moves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png" alt="Voltorb" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Voltorb</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Shock Wave, Sonic Boom, Screech</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Pikachu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 18</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thunder Bolt, Quick Attack, Thunder Wave</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png" alt="Raichu" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ea580c;">Raichu</td>
            <td style="padding: 12px 16px;">Lvl 24</td>
            <td style="padding: 12px 16px;">Electric</td>
            <td style="padding: 12px 16px;">Thunderbolt, Quick Attack, Double Team</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Ground Immunity Sweep:</strong> Go immediately into <strong>Diglett's Cave</strong> on the east side of Vermilion City and catch a wild <strong>Diglett</strong> or a rare <strong>Dugtrio</strong>. Their Ground typing completely nullifies Surge's electric signals, easily clearing this Gym with <em>Magnitude</em>!
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 5: Gym 4 - Rainbow Badge",
    order: 5,
    language: "en",
    content: `
      <h1>Chapter 5: Gym 4 - Rainbow Badge</h1>
      <p>Use Cut to access Route 9, and cross the pitch-black <strong>Rock Tunnel</strong> (talk to Oak's assistant on Route 2 to obtain <strong>HM05 Flash</strong> to illuminate the cave).</p>

      <h2>1. Reaching Celadon City & Rocket Game Corner Hideout</h2>
      <p>Emerge from the tunnel and walk west past Lavender Town to reach the shopping haven <strong>Celadon City</strong>. Infiltrate the basement of the Rocket Game Corner casino, defeat Giovanni, and claim the <strong>Silph Scope</strong>.</p>

      <h2>2. Challenging Erika at Celadon Gym</h2>
      <p>Erika manages a botanical garden of beautiful but toxic Grass-type Pokémon.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Dangerous Moves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png" alt="Victreebel" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Victreebel</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Grass / Poison</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giga Drain, Acid, Poison Powder</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png" alt="Tangela" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Tangela</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 24</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Grass</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giga Drain, Constrict, Ingrain</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png" alt="Vileplume" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #10b981;">Vileplume</td>
            <td style="padding: 12px 16px;">Lvl 29</td>
            <td style="padding: 12px 16px;">Grass / Poison</td>
            <td style="padding: 12px 16px;">Giga Drain, Acid, Sleep Powder</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Combusting Vines:</strong> Fire-type attacks from Charizard completely vaporize Erika's layout. Alternatively, use Flying-type moves from Pidgeot or psychic moves from Butterfree.
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 6: Pokémon Tower & Silph Scope",
    order: 6,
    language: "en",
    content: `
      <h1>Chapter 6: Pokémon Tower & Silph Scope</h1>
      <p>Equip the Silph Scope from Celadon City and return to the gloomy village of <strong>Lavender Town</strong>.</p>

      <h2>1. Defeating the Marowak Ghost</h2>
      <p>Scale the 7 levels of the spiritual Pokémon Tower. Your Silph Scope will reveal and pacify the angry spirit of <strong>Marowak</strong>. Rescue the elderly caretaker, Mr. Fuji, from Team Rocket at the top.</p>

      <h2>2. Receiving the Poké Flute</h2>
      <p>As a reward, Mr. Fuji grants you the magical <strong>Poké Flute</strong>. Play this flute to awaken the two massive Snorlax blocks blocking critical routes across Kanto at Route 12 and Route 16!</p>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 7: Gym 5 - Soul Badge",
    order: 7,
    language: "en",
    content: `
      <h1>Chapter 7: Gym 5 - Soul Badge</h1>
      <p>Awaken Snorlax at Route 16, and pedal down the windy Cycling Road to arrive in the southern paradise of <strong>Fuchsia City</strong>.</p>

      <h2>1. Exploring Safari Zone & Gold Teeth Puzzle</h2>
      <p>Infiltrate the Safari Zone to discover the Secret Cabin and claim <strong>HM03 Surf</strong>. Pick up the lost <strong>Gold Teeth</strong> and return them to the Warden in town to receive <strong>HM04 Strength</strong>.</p>

      <h2>2. Challenging Koga at Fuchsia Gym</h2>
      <p>Koga specialty is Poison-type tactics, locking his Gym layout with clever invisible maze walls.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Dangerous Moves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png" alt="Koffing" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Koffing</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 37</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Poison</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Selfdestruct, Sludge, Toxic</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png" alt="Muk" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Muk</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 39</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Poison</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sludge, Acid Armor, Minimize</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png" alt="Weezing" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Weezing</td>
            <td style="padding: 12px 16px;">Lvl 43</td>
            <td style="padding: 12px 16px;">Poison</td>
            <td style="padding: 12px 16px;">Sludge, Toxic, Selfdestruct, Smokescreen</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Psychic Solution:</strong> Minimize spamming and poisonous stalling is Koga's favorite trick. Psychic-type moves from Kadabra/Alakazam or Ground-type attacks from Dugtrio sweep Koga's team easily before they explode or stall you.
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 8: Silph Co. & Gym 6 - Marsh Badge",
    order: 8,
    language: "en",
    content: `
      <h1>Chapter 8: Silph Co. & Gym 6 - Marsh Badge</h1>
      <p>Give Tea to Saffron's thirsty gatekeepers to gain entry into the centralized <strong>Saffron City</strong>.</p>

      <h2>1. Liberating Silph Co. HQ</h2>
      <p>Infiltrate the massive 11-story high-rise of Silph Co. which is being held hostage. Defeat Giovanni to liberate the president and claim your prize: the legendary 100% catch rate <strong>Master Ball</strong>.</p>

      <h2>2. Challenging Sabrina at Saffron Gym</h2>
      <p>Navigate a series of teleport pads to reach Sabrina, the high-priestess of Psychic-type Pokémon.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Dangerous Moves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png" alt="Kadabra" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Kadabra</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 38</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic, Recover, Future Sight</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png" alt="Mr. Mime" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Mr. Mime</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 37</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic, Reflect, Light Screen, Barrier</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png" alt="Alakazam" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">Alakazam</td>
            <td style="padding: 12px 16px;">Lvl 43</td>
            <td style="padding: 12px 16px;">Psychic</td>
            <td style="padding: 12px 16px;">Psychic, Future Sight, Recover, Calm Mind</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Crush the Barriers:</strong> Alakazam boasts massive Special Attack but has fragile physical defense stats. Launch heavy physical assaults using Snorlax's <em>Body Slam</em> or <em>Shadow Ball</em> to crush Sabrina's team instantly.
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 9: Gym 7 - Volcano Badge",
    order: 9,
    language: "en",
    content: `
      <h1>Chapter 9: Gym 7 - Volcano Badge</h1>
      <p>Surf south from Pallet Town down the blue waters to land upon the volcano island of <strong>Cinnabar Island</strong>.</p>

      <h2>1. Investigating Pokémon Mansion</h2>
      <p>Explore the mysterious, burned-out ruins of the Pokémon Mansion to retrieve the <strong>Secret Key</strong> required to unlock the Gym.</p>

      <h2>2. Challenging Blaine at Cinnabar Gym</h2>
      <p>Blaine commands highly destructive Fire-type Pokémon, utilizing extreme heat to incinerate opponents.</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Dangerous Moves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png" alt="Growlithe" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Growlithe</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire Blast, Take Down, Bite</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png" alt="Rapidash" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ea580c;">Rapidash</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire Blast, Bounce, Fire Spin</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png" alt="Arcanine" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Arcanine</td>
            <td style="padding: 12px 16px;">Lvl 47</td>
            <td style="padding: 12px 16px;">Fire</td>
            <td style="padding: 12px 16px;">Fire Blast, Extreme Speed, Flame Wheel</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Wash Blaine Away:</strong> Utilize high-impact Water moves like <strong>Surf</strong> from Blastoise, Lapras, or Gyarados to wash Blaine's flames away effortlessly.
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 10: Gym 8 & The Kanto League Championship",
    order: 10,
    language: "en",
    content: `
      <h1>Chapter 10: Gym 8 & The Kanto League Championship</h1>
      <p>Return victoriously to <strong>Viridian City</strong>. The final locked Gym of Kanto is now open for your arrival!</p>

      <h2>1. Defeating Giovanni at Viridian Gym</h2>
      <p>The secret Gym Leader is none other than the boss of Team Rocket, <strong>Giovanni</strong>. He specializes in Ground and Rock-type monsters with huge physical defense.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Threats & Counter Tactics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png" alt="Rhyhorn" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a1a1aa;">Rhyhorn</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 45</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ground / Rock</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Scary Face, Earthquake. Easily swept with a strong Water (Surf) or Grass (Giga Drain) move for 4x damage.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png" alt="Dugtrio" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Dugtrio</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ground</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Slash, Mud-Slap, Earthquake. Incredibly fast but paper-thin physical defense. Instantly KO'd with Surf or Ice Beam.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png" alt="Nidoqueen" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Nidoqueen</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 44</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Poison / Ground</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Body Slam, Poison Sting, Earthquake. Counter effectively using Psychic, Ground, Ice, or Water moves.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png" alt="Nidoking" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Nidoking</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 45</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Poison / Ground</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Thrash, Double Kick, Earthquake. High attack stats. Neutralize quickly with Psychic or Water moves.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png" alt="Rhydon" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Rhydon (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 50</td>
            <td style="padding: 12px 16px;">Ground / Rock</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Earthquake, Rock Blast, Scary Face. Massive physical defense but has a devastating 4x weakness to Water and Grass. Use Surf or Giga Drain to KO instantly.</td>
          </tr>
        </tbody>
      </table>
      <blockquote>
        <strong>Triumphant Victory:</strong> Defeat Giovanni to claim the final <strong>Earth Badge</strong> (which guarantees absolute obedience from Pokémon of any level) and <strong>TM26 Earthquake</strong>, the absolute strongest Ground-type move in the game!
      </blockquote>

      <h2>2. Challenging the Indigo Plateau Elite Four</h2>
      <p>Navigate the puzzles of <strong>Victory Road</strong> to reach the grand palace of the Indigo Plateau. Prepare plenty of healing items before entering!</p>

      <h3>Battle 1: Lorelei (Ice / Water)</h3>
      <p>Lorelei relies on high physical defense and freezing moves to wear your team down.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(56, 189, 248, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left;">Key Moves & Counters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png" alt="Dewgong" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Dewgong</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 52</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Ice</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Surf, Ice Beam. Use Electric-type attacks (Thunderbolt) to defeat it.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png" alt="Cloyster" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Cloyster</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 51</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Ice</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Spike Cannon, Protect. High Defense. Attack using Special attacks like Electric or Grass.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png" alt="Slowbro" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Slowbro</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 52</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Psychic</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Surf, Amnesia. Amnesia raises Sp. Def. Strike down with physical Ghost or Bug moves.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png" alt="Jynx" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Jynx</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ice / Psychic</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lovely Kiss, Ice Punch. Lovely Kiss causes sleep. Sweep with fast Fire or Rock moves.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png" alt="Lapras" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #38bdf8;">Lapras (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 54</td>
            <td style="padding: 12px 16px;">Water / Ice</td>
            <td style="padding: 12px 16px;">Surf, Ice Beam, Body Slam. Enormous HP. Blast it down with your strongest Electric or Fighting-type assaults!</td>
          </tr>
        </tbody>
      </table>

      <h3>Battle 2: Bruno (Fighting / Rock)</h3>
      <p>Bruno utilizes raw physical force and bulky Rock monsters to pressure your team.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(248, 113, 113, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(248, 113, 113, 0.3); text-align: left;">Key Moves & Counters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" alt="Onix" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Onix</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 51</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock / Ground</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Earthquake, Rock Tomb. 4x weak to Water and Grass. Easy single-turn sweep.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png" alt="Hitmonlee" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f87171;">Hitmonlee</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 53</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fighting</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Mega Kick, Brick Break. High physical power. Use Psychic or Flying attacks to crush.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png" alt="Hitmonchan" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f87171;">Hitmonchan</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 53</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fighting</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Elemental Punches, Sky Uppercut. Fast and versatile. Melt with Alakazam's Psychic.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" alt="Onix" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Onix</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock / Ground</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Double-Edge, Iron Tail. Simply spray Surf once to take it out.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png" alt="Machamp" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f87171;">Machamp (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 56</td>
            <td style="padding: 12px 16px;">Fighting</td>
            <td style="padding: 12px 16px;">Cross Chop, Rock Tomb, Scary Face. Cross Chop has an incredibly high critical rate. Strike with Psychic-type attacks immediately!</td>
          </tr>
        </tbody>
      </table>

      <h3>Battle 3: Agatha (Ghost / Poison)</h3>
      <p>Agatha specializes in devious status-altering moves (sleep, poison, confusion) to disable your team.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(192, 132, 252, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(192, 132, 252, 0.3); text-align: left;">Key Moves & Counters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #c084fc;">Gengar</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ghost / Poison</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hypnosis, Dream Eater, Confuse Ray. Equip Full Heal to cure sleep. Attack using Psychic or Ground.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png" alt="Golbat" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Golbat</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Poison / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Air Cutter, Bite, Confuse Ray. Destroy with strong Electric, Ice, or Psychic moves.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" alt="Haunter" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #c084fc;">Haunter</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 53</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ghost / Poison</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Shadow Punch, Curse. Curse cuts Haunter's HP to drain 1/4 of your HP each turn. Switch out to clear.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png" alt="Arbok" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Arbok</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Poison</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sludge Bomb, Bite, Screech. Relatively low stats. Defeat using Earthquake or Psychic.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #c084fc;">Gengar (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 58</td>
            <td style="padding: 12px 16px;">Ghost / Poison</td>
            <td style="padding: 12px 16px;">Sludge Bomb, Shadow Ball, Giga Drain. High speed and Special Attack. Utilize Psychic (Alakazam) to strike before it can react!</td>
          </tr>
        </tbody>
      </table>

      <h3>Battle 4: Lance (Dragon Master)</h3>
      <p>Lance commands ancient Dragon-type beasts possessing devastating offensive capabilities and wide elemental coverages.</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(244, 63, 94, 0.1);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Key Moves & Counters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" alt="Gyarados" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Gyarados</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 56</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Flying</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hyper Beam, Dragon Rage, Bite. Extreme threat, but 4x weak to Electric-type. One Thunderbolt knocks it down instantly.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png" alt="Dragonair" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Dragonair</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Outrage, Safeguard. Outrage deals massive damage. Utilize Ice-type moves (Ice Beam or Blizzard) to freeze them out.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png" alt="Dragonair" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Dragonair</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Outrage, Hyper Beam, Thunder Wave. Deal with it similarly to the first Dragonair using quick Ice moves.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png" alt="Aerodactyl" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Aerodactyl</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 58</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock / Flying</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ancient Power, Wing Attack. Extreme speed. Exploit weakness using Electric, Ice, or Water moves.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png" alt="Dragonite" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Dragonite (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 60</td>
            <td style="padding: 12px 16px;">Dragon / Flying</td>
            <td style="padding: 12px 16px;">Outrage, Wing Attack, Hyper Beam, Safeguard. Lance's champion powerhouse. Takes 4x damage from Ice. Freeze it with <strong>Ice Beam</strong> to seal the victory!</td>
          </tr>
        </tbody>
      </table>

      <h2>3. The Final Duel: Defeating the Champion Rival</h2>
      <p>After scaling the ranks, you learn that your Rival has already defeated Lance and claimed the Champion title! You must defeat him in one final, monumental duel to enter the Hall of Fame.</p>
      <p>His balanced team adapts directly depending on your chosen Starter Pokémon:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Key Vulnerability & Counter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png" alt="Pidgeot" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #94a3b8;">Pidgeot</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 59</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Normal / Flying</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Melt down using Thunderbolt or Ice Beam quickly.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png" alt="Alakazam" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Alakazam</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 57</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">High Sp. Atk, extremely fragile physical defense. Obliterate with physical Body Slam or Shadow Ball from Snorlax.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png" alt="Rhydon" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #b45309;">Rhydon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 59</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ground / Rock</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">4x weak to Water and Grass. A single Surf sweep is all it takes.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png" alt="Exeggutor" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Exeggutor / Gyarados / Arcanine</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 61</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Grass / Water / Fire</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Swaps depending on your chosen Starter. Counter with their respective weaknesses.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="Charizard" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Charizard / Blastoise / Venusaur (Ace)</td>
            <td style="padding: 12px 16px;">Lvl 63</td>
            <td style="padding: 12px 16px;">Counter Starter Type</td>
            <td style="padding: 12px 16px;">Fully-evolved level 63 Starter with immense stats. Maintain your type advantages to secure a legendary win!</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <strong>Victory Preparation:</strong> Your Rival's lineup is extremely well-balanced. Make sure your team has wide movepools and high-impact coverage. Win this fight to lock your place in the **Hall of Fame**!
      </blockquote>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 11: Comprehensive Sevii Islands Guide",
    order: 11,
    language: "en",
    content: `
      <h1>Chapter 11: Comprehensive Sevii Islands Guide</h1>
      <p>Congratulations, Champion! Your adventure continues in the extensive **Sevii Islands** post-game questline, consisting of 7 unique islands loaded with secrets, legendary encounters, and Rocket hideouts.</p>

      <h2>Unlock Requirements:</h2>
      <p>You must capture at least <strong>60 unique Pokémon species</strong>, then speak to Professor Oak in Pallet Town to obtain the upgraded <strong>National Pokédex</strong>. Board the ferry using your Tri-Pass at Vermilion City harbor!</p>

      <h2>Primary Quest: Helping Celio Restore the Network</h2>
      <p>To help Celio link his computer network to the distant Hoenn region, you must track down the mythical **Ruby** and **Sapphire** gemstones across the islands:</p>

      <h3>1. One Island: Mt. Ember & The Hot Springs</h3>
      <ul>
        <li>Travel north across the beach to find the active volcano, <strong>Mt. Ember</strong>.</li>
        <li>Defeat the Team Rocket Grunts conversing at the foot of the mountain to learn passwords for their hideout.</li>
        <li><strong>Capture Moltres:</strong> Scale the volcano's peak, complete the boulder puzzles, and capture the mythical Fire bird <strong>Moltres</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png" style="max-width:24px; vertical-align:middle;" /> at level 50.</li>
        <li><strong>Get HM06 Rock Smash:</strong> Visit the Ember Spa and talk to the hot springs enthusiast to get HM06 to smash cracked boulders.</li>
      </ul>

      <h3>2. Two Island: Cape Brink tutor & The Game Corner</h3>
      <ul>
        <li>Ghé thăm Cape Brink to find the Ultimate Move Tutor's house. He will teach your fully-evolved Starters their final signature moves: <strong>Frenzy Plant</strong> (Grass), <strong>Blast Burn</strong> (Fire), or <strong>Hydro Cannon</strong> (Water) for free!</li>
        <li>Go to the local Game Corner and talk to Lostelle's father, who is panic-stricken because his daughter went missing on Three Island.</li>
      </ul>

      <h3>3. Three Island: Biker gang raid & Berry Forest rescue</h3>
      <ul>
        <li>Land on the island to find a rowdy biker gang harassing locals. Sweep them in battle to restore order to the town.</li>
        <li>Head west across Bond Bridge into the dense, foggy <strong>Berry Forest</strong>.</li>
        <li>Rescue Lostelle at the deep end of the forest by defeating the wild level 30 <strong>Hypno</strong> that has her hypnotized. Return her to her father on Two Island.</li>
      </ul>

      <h3>4. Four Island: Icefall Cave & HM07 Waterfall</h3>
      <ul>
        <li>This is Lorelei's hometown. Meet her and your Rival near the town square.</li>
        <li>Explore the frozen maze inside <strong>Icefall Cave</strong>. Navigate the cracking ice panels to find and retrieve <strong>HM07 Waterfall</strong>.</li>
        <li>Teach Waterfall to your team, scale the underground waterfall, and help Lorelei drive off Team Rocket grunts poaching wild Pokémon.</li>
      </ul>

      <h3>5. Five Island: Meadow & The Rocket Warehouse</h3>
      <ul>
        <li>Explore the gorgeous Five Island Meadow full of powerful trainers.</li>
        <li>Navigate the maze inside the mysterious <strong>Lost Cave</strong> to the north to rescue Selphy. Escort her back to her luxurious resort mansion to receive rare evolutionary stones.</li>
        <li>Travel south to the Memorial Pillar. Place a fresh Lemonade onto the grave of the deceased Onix to receive a rare TM from its mourning trainer.</li>
      </ul>

      <h3>6. Six Island: Solving the Braille Riddle at Dotted Hole</h3>
      <ul>
        <li>Travel south into the Ruin Valley to discover the ancient dome-like entrance to the <strong>Dotted Hole</strong>.</li>
        <li><strong>Open the Chamber:</strong> Interact with the stone door and use the move <strong>Cut</strong> to break the seal and gain entry.</li>
        <li><strong>Decode the Braille Path:</strong> Fall through the center hole, decode the ancient Braille writing, and walk through the holes in this specific order: <strong>Up -> Left -> Right -> Down</strong> to reach the pedestal.</li>
        <li>Just as you reach for the **Sapphire**, Team Rocket scientist Gideon ambushes you, steals the gem, and retreats to Five Island.</li>
        <li><strong>Raid the Rocket Warehouse:</strong> Return to Five Island, infiltrate their warehouse (now that you have the passcode), navigate the spinning floor tiles, defeat Gideon, and reclaim the Sapphire!</li>
        <li><strong>Activate Interregional Trade:</strong> Deliver the Sapphire to Celio on One Island. His network machine will go fully operational, allowing you to trade Pokémon freely between FireRed/LeafGreen and Ruby/Sapphire/Emerald!</li>
      </ul>

      <h3>7. Seven Island: Trainer Tower & The Tanoby Ruins</h3>
      <ul>
        <li>Challenge your limits inside the intense <strong>Trainer Tower</strong> under single, double, or knockout modes.</li>
        <li>Traverse the southern Sevii Canyon and complete the Strength puzzle inside <strong>Tanoby Key</strong> by pushing large boulders into their respective floor sockets. This unlocks the offshore <strong>Tanoby Ruins</strong> chambers, allowing you to catch all 28 alphabet iterations of the mysterious ancient Pokémon <strong>Unown</strong>!</li>
      </ul>
    `
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 12: Legendary Pokémon & Secrets",
    order: 12,
    language: "en",
    content: `
      <h1>Chapter 12: Legendary Pokémon & Secrets</h1>
      <p>Now that Celio's network is fully operational, you are ready to complete your Master Index by tracking down the most powerful ancient beasts across Kanto.</p>

      <h2>1. The Genetic Masterpiece: Mewtwo</h2>
      <div style="background: linear-gradient(135deg, rgba(88, 28, 135, 0.6), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(168, 85, 247, 0.5); border-radius: 16px; padding: 24px; display: flex; flex-direction: row; gap: 24px; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 25px -5px rgba(168, 85, 247, 0.3); margin-bottom: 24px;">
        <div style="flex: 1; text-align: center; min-width: 150px; display: flex; justify-content: center;">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" alt="Mewtwo" style="max-width: 120px; filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        <div style="flex: 3; min-width: 250px;">
          <span style="background-color: rgba(168, 85, 247, 0.2); color: #c084fc; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">Genetic Apex Weapon - Ultimate Psychic</span>
          <h3 style="color: #c084fc; margin: 8px 0; font-size: 22px;">Mewtwo (#150)</h3>
          <p style="color: #cbd5e1; line-height: 1.6; margin: 0 0 8px 0;"><strong>Type:</strong> Psychic | <strong>Level:</strong> 70</p>
          <p style="color: #94a3b8; line-height: 1.6; margin: 0;"><strong>Location:</strong> Cerulean Cave (northwest of Cerulean City). The entrance is opened once Celio's network link is established. Mewtwo stands at the deepest level of this cavernous maze.</p>
        </div>
      </div>
      <blockquote>
        <strong>Mewtwo Capture Tip:</strong> Mewtwo uses <em>Recover</em> to instantly restore half its HP and <em>Safeguard</em> to block all status moves. It is highly recommended to immediately throw your <strong>Master Ball</strong> (obtained from the Silph Co. president) on turn one for an effortless capture!
      </blockquote>

      <h2>2. Legendary Bird Trio (Kanto Birds)</h2>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
        <!-- Articuno -->
        <div style="background: linear-gradient(135deg, rgba(30, 58, 138, 0.6), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 12px; padding: 16px; display: flex; flex-direction: row; gap: 16px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; text-align: center; min-width: 100px; display: flex; justify-content: center;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png" alt="Articuno" style="max-width: 80px; filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="flex: 4; min-width: 200px;">
            <h4 style="color: #60a5fa; margin: 0 0 4px 0; font-size: 18px;">Ice Guardian: Articuno (#144) - Level 50</h4>
            <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 4px 0;"><strong>Type:</strong> Ice / Flying | <strong>Location:</strong> Deep within Seafoam Islands (Route 20).</p>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;"><strong>How to capture:</strong> Use <em>Strength</em> to push large boulders down through the holes in the floor to block the swift, sweeping ocean currents, letting you Surf out to its frozen cavern.</p>
          </div>
        </div>

        <!-- Zapdos -->
        <div style="background: linear-gradient(135deg, rgba(146, 64, 14, 0.6), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(234, 179, 8, 0.4); border-radius: 12px; padding: 16px; display: flex; flex-direction: row; gap: 16px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; text-align: center; min-width: 100px; display: flex; justify-content: center;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png" alt="Zapdos" style="max-width: 80px; filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.5)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="flex: 4; min-width: 200px;">
            <h4 style="color: #fbbf24; margin: 0 0 4px 0; font-size: 18px;">Lightning Guardian: Zapdos (#145) - Level 50</h4>
            <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 4px 0;"><strong>Type:</strong> Electric / Flying | <strong>Location:</strong> Abandoned Power Plant (Route 10).</p>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;"><strong>How to capture:</strong> Surf south down the waterway from Route 10 to access the eastern entrance of the generator plant, then weave through the rubble to the final generator room.</p>
          </div>
        </div>

        <!-- Moltres -->
        <div style="background: linear-gradient(135deg, rgba(153, 27, 27, 0.6), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 12px; padding: 16px; display: flex; flex-direction: row; gap: 16px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; text-align: center; min-width: 100px; display: flex; justify-content: center;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png" alt="Moltres" style="max-width: 80px; filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.5)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="flex: 4; min-width: 200px;">
            <h4 style="color: #f87171; margin: 0 0 4px 0; font-size: 18px;">Flame Guardian: Moltres (#146) - Level 50</h4>
            <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 4px 0;"><strong>Type:</strong> Fire / Flying | <strong>Location:</strong> Summit of Mt. Ember (One Island).</p>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;"><strong>How to capture:</strong> Traverse the volcanic path at the north of One Island, scaling the craggy magma-infused slopes of Mt. Ember to reach the nest at the very peak.</p>
          </div>
        </div>
      </div>

      <h2>3. Roaming Johto Beasts</h2>
      <p>Once you defeat the Elite Four and Celio's Sevii network is complete, one of the three Legendary Beasts of Johto will automatically begin roaming Kanto's grassy routes at Level 50. The beast that appears is completely determined by your initial Starter choice:</p>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
        <!-- Raikou -->
        <div style="background: linear-gradient(135deg, rgba(146, 64, 14, 0.4), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 12px; padding: 16px; display: flex; flex-direction: row; gap: 16px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; text-align: center; min-width: 100px; display: flex; justify-content: center;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/243.png" alt="Raikou" style="max-width: 75px; filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.4));" />
          </div>
          <div style="flex: 4; min-width: 200px;">
            <h4 style="color: #fbbf24; margin: 0 0 4px 0; font-size: 18px;">The Thunder Tiger: Raikou (#243) (If you chose Squirtle)</h4>
            <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 4px 0;"><strong>Type:</strong> Electric | <strong>Level:</strong> 50</p>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;"><strong>Capturing Raikou:</strong> Exceedingly swift and dangerous. Raikou flees instantly on turn one. Lead with a Wobbuffet (using its <em>Shadow Tag</em> ability) or a Crobat/Gengar using <em>Mean Look</em> to lock it down before attempting to chip its health.</p>
          </div>
        </div>

        <!-- Entei -->
        <div style="background: linear-gradient(135deg, rgba(153, 27, 27, 0.4), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 16px; display: flex; flex-direction: row; gap: 16px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; text-align: center; min-width: 100px; display: flex; justify-content: center;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/244.png" alt="Entei" style="max-width: 75px; filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.4));" />
          </div>
          <div style="flex: 4; min-width: 200px;">
            <h4 style="color: #f87171; margin: 0 0 4px 0; font-size: 18px;">The Volcano Lion: Entei (#244) (If you chose Bulbasaur)</h4>
            <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 4px 0;"><strong>Type:</strong> Fire | <strong>Level:</strong> 50</p>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;"><strong>CRITICAL BUG WARNING:</strong> Entei knows the move <em>Roar</em>. Due to an infamous coding bug in FireRed/LeafGreen, if Entei uses Roar to escape battle, it will <strong>permanently disappear from the game</strong>! Sleep it on turn one or throw your <strong>Master Ball</strong> immediately to avoid losing it forever!</p>
          </div>
        </div>

        <!-- Suicune -->
        <div style="background: linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 16px; display: flex; flex-direction: row; gap: 16px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; text-align: center; min-width: 100px; display: flex; justify-content: center;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/245.png" alt="Suicune" style="max-width: 75px; filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.4));" />
          </div>
          <div style="flex: 4; min-width: 200px;">
            <h4 style="color: #60a5fa; margin: 0 0 4px 0; font-size: 18px;">The Aurora Beast: Suicune (#245) (If you chose Charmander)</h4>
            <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 4px 0;"><strong>Type:</strong> Water | <strong>Level:</strong> 50</p>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;"><strong>Capturing Suicune:</strong> The bulkiest of the trio. It does not carry Roar, making it safer to capture than Entei. Use status-inflicting moves like sleep or freeze to secure this magnificent beast.</p>
          </div>
        </div>
      </div>

      <h2>4. Event Island Secrets: Birth Island Deoxys & Navel Rock Lugia/Ho-Oh</h2>
      <p>Use special event tickets to unlock hidden mystical islands far off the Sevii coast:</p>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
        <!-- Deoxys -->
        <div style="background: linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(244, 63, 94, 0.4); border-radius: 12px; padding: 16px; display: flex; flex-direction: row; gap: 16px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; text-align: center; min-width: 100px; display: flex; justify-content: center;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/386.png" alt="Deoxys" style="max-width: 80px; filter: drop-shadow(0 0 10px rgba(244, 63, 94, 0.5)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="flex: 4; min-width: 200px;">
            <h4 style="color: #fb7185; margin: 0 0 4px 0; font-size: 18px;">Birth Island Puzzle: Alien Mythical Deoxys (#386)</h4>
            <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 4px 0;"><strong>Type:</strong> Psychic | <strong>Level:</strong> 30</p>
            <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0;"><strong>How to summon:</strong> Take the ferry to the triangular Birth Island using the <em>Aurora Ticket</em>. You must solve the puzzle by interacting with the black triangular stone, pushing it in the fewest steps possible. When done correctly, the stone turns brilliant red and explodes, summoning Deoxys!</p>
            <p style="color: #e2e8f0; font-size: 13px; margin: 0;"><strong>Version Form Split:</strong> Upon capture, Deoxys will permanently adopt its <strong>Attack Form</strong> in FireRed and its <strong>Defense Form</strong> in LeafGreen!</p>
          </div>
        </div>

        <!-- Lugia & Ho-Oh -->
        <div style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.8)); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
          <h4 style="color: #ffffff; margin: 0; font-size: 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 8px;">Navel Rock Spire: Lugia & Ho-Oh</h4>
          <p style="color: #cbd5e1; font-size: 14px; margin: 0;">Sail to the gargantuan stone monolith of <strong>Navel Rock</strong> using the <em>Mystic Ticket</em>. This incredible landmark holds the two supreme titans of Johto at Level 70:</p>
          <div style="display: flex; flex-direction: row; gap: 16px; flex-wrap: wrap;">
            <!-- Lugia -->
            <div style="flex: 1; min-width: 200px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 12px;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png" alt="Lugia" style="max-width: 50px; filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4));" />
              <div>
                <h5 style="color: #60a5fa; margin: 0 0 4px 0; font-size: 15px;">Diving Guardian: Lugia (#249)</h5>
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">Roosting deep within the flooded chamber at the bottom of the cavern.</p>
              </div>
            </div>
            <!-- Ho-Oh -->
            <div style="flex: 1; min-width: 200px; background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 12px;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/250.png" alt="Ho-Oh" style="max-width: 50px; filter: drop-shadow(0 0 8px rgba(234, 179, 8, 0.4));" />
              <div>
                <h5 style="color: #fbbf24; margin: 0 0 4px 0; font-size: 15px;">Rainbow Guardian: Ho-Oh (#250)</h5>
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">Guarding its sacred golden nest at the very apex of the windy summit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <blockquote>
        <strong>Capture Preparation:</strong> Make sure to bring plenty of Ultra Balls and high-level support status inflicters before attempting to challenge these ultimate ancient and space-borne entities!
      </blockquote>
`
  },
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 13: Complete HMs, Quest Items & In-Game Trades Guide",
    order: 13,
    language: "en",
    content: `
      <h1>Chapter 13: Complete HMs, Quest Items & In-Game Trades Guide</h1>
      <p>Your ultimate reference guide containing all Hidden Machines (HMs), essential story quest items, and highly lucrative NPC in-game trades across Kanto in Pokémon FireRed!</p>

      <h2>1. All Hidden Machines (HMs) Locations</h2>
      <p>HMs are vital for traversing the Kanto map and clearing pathway obstacles:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(59, 130, 246, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">HM / Move Name</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Overworld Effect</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Precise Obtain Location</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Badge Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">HM01: Cut</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cuts down small shrubs to unlock hidden pathways.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Given by the seasick captain on the <strong>S.S. Anne</strong> in Vermilion City after defeating your Rival and massaging him.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Cascade Badge (Gym 2)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">HM02: Fly</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Instantly fly back to any previously visited town or city.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Given by the girl inside the hidden house north of <strong>Route 16</strong> (use Cut on the western side of Celadon City).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Thunder Badge (Gym 3)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">HM03: Surf</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Travel across water bodies like oceans and rivers.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Found in the <strong>Secret House</strong> deep in the recesses of the <strong>Safari Zone</strong> (Fuchsia City).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Soul Badge (Gym 5)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">HM04: Strength</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Push heavy round boulders inside caves and ruins.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Deliver the lost <strong>Gold Teeth</strong> (found in Safari Zone Area 3) to the Safari Zone <strong>Warden</strong> in eastern Fuchsia City.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #22c55e;">Rainbow Badge (Gym 4)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">HM05: Flash</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Light up pitch-black caves like Rock Tunnel.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Talk to Professor Oak's Aide in the large gate house along southern <strong>Route 2</strong> (accessible via Diglett's Cave). Requires at least <strong>10 unique Pokémon</strong> caught.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Boulder Badge (Gym 1)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">HM06: Rock Smash</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Shatter cracked overworld rocks blocking your path.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Talk to the man inside the <strong>Ember Spa</strong> cave on <strong>One Island</strong> (Sevii Islands).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Marsh Badge (Gym 6)</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #a855f7;">HM07: Waterfall</td>
            <td style="padding: 12px 16px;">Scale up vertical, fast-flowing waterfalls.</td>
            <td style="padding: 12px 16px;">Found inside the deep icy chambers of <strong>Icefall Cave</strong> on <strong>Four Island</strong> (Sevii Islands).</td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Volcano Badge (Gym 7)</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Key Quest & Story Items Directory</h2>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 88, 12, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left; width: 150px;">Key Item</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">How to Obtain</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 88, 12, 0.3); text-align: left;">Quest Use / Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Oak's Parcel</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Acquired from the Viridian City Poké Mart merchant at the very beginning of the game.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Deliver to Professor Oak in Pallet Town to unlock the Pokédex and receive starting Poké Balls.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">S.S. Ticket</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Help Bill transform back into human form inside his Sea Cottage on Route 25.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Presented at the harbor gate in Vermilion City to board the cruise ship S.S. Anne.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Silph Scope</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Defeat boss Giovanni in the hidden Team Rocket Hideout below the Celadon City Game Corner.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Used to reveal the true ghost spirits wandering inside the Lavender Town Pokémon Tower.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Poké Flute</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rescue Mr. Fuji from Team Rocket on the top floor of the Pokémon Tower (Lavender Town).</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Used to wake up the two giant sleeping **Snorlax** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" style="max-width:24px; vertical-align:middle;" /> blocking Route 12 and Route 16.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #22c55e;">Card Key</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Found on the floor of the 5th floor (5F) of the Saffron City <strong>Silph Co.</strong> building.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Unlocks all keycard-secured doors across all floors of Silph Co.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f43f5e;">Tri-Pass & Rainbow Pass</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Acquired from Bill after defeating Blaine in Cinnabar, and Celio on One Island after finding the Ruby.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Used at the Vermilion harbor to travel freely to the Sevii Islands.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #ec4899;">Ruby & Sapphire</td>
            <td style="padding: 12px 16px;">Ruby is found at Mt. Ember (One Island). Sapphire is at Six Island's Dotted Hole, then retrieved from Gideon at Five Island's Rocket Warehouse.</td>
            <td style="padding: 12px 16px;">Delivered to Celio to activate inter-regional trading between FireRed/LeafGreen and the Hoenn games.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Highly Valuable NPC In-Game Trades</h2>
      <p>Trade with various researchers or trainers across Kanto to acquire rare Pokémon with superior growth rates and stats:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Trade Location</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: center;">You Give</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: center;">You Receive</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Utility Description & Nickname</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Route 2 Small House (South of Pewter City)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png" style="max-width:32px;" /><br/>Abra
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png" style="max-width:32px;" /><br/><span style="color:#a855f7; font-weight:bold;">Mr. Mime</span>
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nickname: <strong>MIMIEN</strong>. The <strong>only way</strong> to acquire this Psychic-type powerhouse in FireRed. Its high Special Attack and Speed are incredible for sweeping mid-game gyms!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Route 11 Gate House 2F (East of Vermilion)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png" style="max-width:32px;" /><br/>Spearow
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png" style="max-width:32px;" /><br/><span style="color:#cbd5e1; font-weight:bold;">Farfetch'd</span>
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nickname: <strong>CH'DING</strong>. Comes carrying a **Leek** (Sharply boosts critical-hit ratio). Highly useful early on, has high critical ratios and can learn HM01 Cut.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Cerulean City House next to Poké Mart</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png" style="max-width:32px;" /><br/>Poliwhirl
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png" style="max-width:32px;" /><br/><span style="color:#f87171; font-weight:bold;">Jynx</span>
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nickname: <strong>ZYNX</strong>. Excellent Ice / Psychic hybrid perfect for sweeping Lance's dragons in the Elite Four. It has high speed, learns sleeping moves, and grows very fast!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Cinnabar Lab Research Room (Cinnabar Island)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png" style="max-width:32px;" /><br/>Raichu
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png" style="max-width:32px;" /><br/><span style="color:#fbbf24; font-weight:bold;">Electrode</span>
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nickname: <strong>DUX</strong>. Comes holding a Magnet (Boosts Electric damage by 10%). The fastest Pokémon in the entire game, highly effective for shocking water/flying types.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold;">Cinnabar Lab Research Room (Cinnabar Island)</td>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png" style="max-width:32px;" /><br/>Ponyta
            </td>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png" style="max-width:32px;" /><br/><span style="color:#60a5fa; font-weight:bold;">Seel</span>
            </td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Nickname: <strong>SEELOR</strong>. Comes holding a highly valuable Water Stone. Evolve it into Dewgong (Water/Ice) to gain a reliable member for the Elite Four trials.</td>
          </tr>
        </tbody>
      </table>
    `
  }
,
  {
    gameVersion: "firered",
    chapterTitle: "Chapter 15: Post-game, Battle Tower & Essential Items Guide",
    order: 15,
    language: "en",
    content: `
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
    `
  }];
