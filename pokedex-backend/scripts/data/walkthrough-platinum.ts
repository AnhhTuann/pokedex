import { DIAMOND_CHAPTERS, ENGLISH_DIAMOND_CHAPTERS } from './walkthrough-diamond.js';

// ========================================================
// PLATINUM-SPECIFIC UPGRADES (CHAPTER 12, 14, 15 CONTENT)
// ========================================================

const getPlatinumVI_Ch12 = () => `
      <h1>Phần 12: Đỉnh thiêng Spear Pillar & Thế giới Hỗn Mang Distortion World diện kiến Giratina</h1>
      <p>Sự hỗn loạn đạt đến đỉnh điểm khi Cyrus sử dụng sức mạnh xích đỏ chế ngự thời gian và không gian, mở ra cánh cổng dẫn đến chiều không gian đảo lộn quy luật vật lý.</p>

      <h2>1. Đột kích Galactic HQ tại Veilstone City</h2>
      <p>Quay trở lại Veilstone City, sử dụng Galactic Key để đột nhập tổng bộ Team Galactic. Đối đầu và đánh bại <strong>Cyrus</strong>, anh ta sẽ trao cho bạn chiếc bóng tối thượng <strong>Master Ball</strong> làm phần thưởng kiêu hãnh. Sau đó, tiến vào căn phòng thí nghiệm hạ gục Saturn để giải cứu ba vị thần hồ linh thiêng: Uxie, Mesprit và Azelf.</p>

      <h2>2. Thượng đỉnh Spear Pillar & Sự phẫn nộ của Giratina</h2>
      <p>Leo qua ngọn núi tuyết phủ hùng vĩ Mt. Coronet tiến thẳng lên đỉnh thiêng <strong>Spear Pillar</strong>. Tại đây, Cyrus sử dụng hai sợi xích đỏ Red Chain nhân tạo để giam cầm đồng thời cả hai vị thần sáng thế: **Dialga** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png" style="max-width:28px; vertical-align:middle;" /> và **Palkia** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/484.png" style="max-width:28px; vertical-align:middle;" />.</p>
      <p>Trước khi vũ trụ bị hủy diệt, từ chiếc bóng đen khổng lồ dưới mặt đất, vị thần sa ngã **Giratina** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10024.png" style="max-width:32px; vertical-align:middle;" /> (Origin Form) trỗi dậy phẫn nộ, xé rách không gian gầm rú dũng mãnh và kéo tuột Cyrus vào hư vô! Champion Cynthia lập tức xuất hiện, cùng bạn bước qua khe nứt không gian để tiến vào <strong>Distortion World (Thế giới Hỗn Mang)</strong>.</p>

      <h2>3. Thám hiểm Distortion World (Thế giới Hỗn Mang)</h2>
      <p>Chào mừng đến với chiều không gian vô định, nơi các đảo đá bay lơ lửng, trọng lực bị bẻ cong và bạn có thể chạy thẳng đứng trên các vách đá:</p>
      <ul>
        <li><strong>Giải đố bẻ cong trọng lực:</strong> Di chuyển trên các thang máy đá di động, kích hoạt các công tắc trọng lực để xoay chuyển góc nhìn.</li>
        <li><strong>Đẩy đá hỗ trợ Hồ thần:</strong> Sử dụng chiêu Strength để đẩy các khối đá tròn rơi xuống các hố sâu tương ứng với vị trí Uxie, Mesprit và Azelf đứng để mở khóa mê cung đá.</li>
      </ul>

      <h2>4. Trận quyết chiến Cyrus & Thu phục Giratina (Origin Form)</h2>
      <p>Tại đáy sâu vô tận của Distortion World, bạn phải chấm dứt dã tâm của Cyrus trong trận chiến sinh tử dũng mãnh nhất cốt truyện chính:</p>
      <ul>
        <li><strong>Đội hình cực khủng của Cyrus:</strong> Houndoom (Lvl 45), Honchkrow (Lvl 47), Crobat (Lvl 46), Gyarados (Lvl 46) và át chủ bài Weavile (Lvl 48). Hãy dùng đòn Giác Đấu dũng mãnh để đấm vỡ Weavile/Houndoom và hệ Điện để giật sét Gyarados/Honchkrow.</li>
      </ul>
      <p>Sau khi Cyrus tháo chạy, hãy bước tới thách thức thần thú bóng tối **Giratina (Origin Form - Cấp độ 47)**. Ở dạng Origin Form, nó có đòn đánh độc quyền <strong>Shadow Force</strong> tàng hình biến mất rồi tấn công chí tử ở lượt tiếp theo. Hãy dùng bóng Master Ball hoặc ru ngủ thật kỹ rồi bắt bằng Ultra/Dusk Ball!</p>

      <h2>5. Huy hiệu thứ 8: Beacon Badge tại Sunyshore City</h2>
      <p>Trở về thế giới thực qua Turnback Cave, hướng thẳng tới thành phố cảng năng lượng mặt trời **Sunyshore City**. Kéo Volkner khỏi hải đăng trở về Gym và thách đấu phòng Gym hệ Điện dũng mãnh nhất Sinnoh:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(59, 130, 246, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: center; width: 100px;">Hình ảnh</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Chiêu thức đáng sợ & Khắc chế</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png" alt="Jolteon" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Jolteon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 46</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tốc độ sấm sét, mang chiêu Discharge và Iron Tail. Hãy dùng đòn hệ Đất của Garchomp dẹp gọn!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png" alt="Raichu" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Raichu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 46</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Sở hữu Signal Beam và Thunderbolt cực đau. Tuyệt chiêu Earthquake hệ Đất là khắc tinh tuyệt hảo.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/466.png" alt="Electivire" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Electivire</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 48</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Chiến binh sấm sét mang đòn ThunderPunch, Fire Punch cực kỳ đa dạng. Không được dùng đòn hệ Điện lên nó vì nó có nội tại Motor Drive tăng tốc!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/405.png" alt="Luxray" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Luxray (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Level 50</td>
            <td style="padding: 12px 16px;">Điện</td>
            <td style="padding: 12px 16px;">Phóng điện Thunder Fang khốc liệt kết hợp Crunch hủy diệt vật lý. Khắc chế triệt để bằng đòn hệ Đất mạnh mẽ.</td>
          </tr>
        </tbody>
      </table>
`;

const getPlatinumEN_Ch12 = () => `
      <h1>Chapter 12: Spear Pillar & The Gravity-Defying Distortion World of Giratina</h1>
      <p>Chaos reaches its zenith as Cyrus harnesses the synthetic Red Chains to bind both time and space, tearing open a dark corridor to a dimension beyond physical laws.</p>

      <h2>1. Raiding the Galactic HQ in Veilstone City</h2>
      <p>Return to Veilstone City and use the Galactic Key to infiltrate their headquarters. Confront and defeat **Cyrus** to receive the ultimate **Master Ball**. Defeat Saturn in the laboratory to liberate the Lake Guardians (Uxie, Mesprit, Azelf).</p>

      <h2>2. Summit at Spear Pillar & Giratina's Rage</h2>
      <p>Climb the frozen Mt. Coronet to reach the sacred summit <strong>Spear Pillar</strong>. Cyrus summons **Dialga** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png" style="max-width:28px; vertical-align:middle;" /> and **Palkia** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/484.png" style="max-width:28px; vertical-align:middle;" />.</p>
      <p>Suddenly, a massive shadowy portal splits the ground. Vengeful titan **Giratina** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10024.png" style="max-width:32px; vertical-align:middle;" /> (Origin Form) roars into the sky, shatters the chains, and drags Cyrus into the void! Cynthia guides you into the tear to enter the <strong>Distortion World</strong>.</p>

      <h2>3. Navigating the Distortion World</h2>
      <p>Explore a mind-bending labyrinth where gravity shifts, blocks float, and you run vertically down stone walls:</p>
      <ul>
        <li><strong>Gravity-Bending Puzzles:</strong> Activate moving stone platforms and hop across floating islands.</li>
        <li><strong>Lake Guardians' Boulders:</strong> Use HM04 Strength to push boulders down corresponding pits guided by Uxie, Mesprit, and Azelf to unlock the lower levels.</li>
      </ul>

      <h2>4. Defeating Cyrus & Catching Giratina (Origin Form)</h2>
      <p>At the bottom floor, defeat Cyrus at his absolute peak strength:</p>
      <ul>
        <li><strong>Cyrus' Team:</strong> Houndoom (Lvl 45), Honchkrow (Lvl 47), Crobat (Lvl 46), Gyarados (Lvl 46), and Weavile (Lvl 48). Use Fighting attacks on Weavile/Houndoom and Electric attacks on Gyarados/Honchkrow.</li>
      </ul>
      <p>Face the shadow deity **Giratina (Origin Form, Level 47)**. He has his signature move <strong>Shadow Force</strong>. Put him to sleep and catch him using Dusk/Ultra Balls, or instantly capture him with your Master Ball!</p>

      <h2>5. Gym 8: Volkner's Sunyshore Gym</h2>
      <p>Confront Leader Volkner at Sunyshore Gym. His upgraded Platinum team is:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(59, 130, 246, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Level</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Type</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(59, 130, 246, 0.3); text-align: left;">Dangerous Moves & Strategy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png" alt="Jolteon" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Jolteon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 46</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Extremely fast. Spam Discharge and Iron Tail. Ground attacks like Earthquake from Garchomp will clear it instantly.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png" alt="Raichu" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Raichu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 46</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Wields Signal Beam and Thunderbolt. Exploit its low physical defense with Ground attacks.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/466.png" alt="Electivire" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Electivire</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Level 48</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Features ThunderPunch, Fire Punch, Ice Punch. Do not trigger his Motor Drive ability with Electric moves!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/405.png" alt="Luxray" style="max-width: 45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Luxray (Signature)</td>
            <td style="padding: 12px 16px;">Level 50</td>
            <td style="padding: 12px 16px;">Electric</td>
            <td style="padding: 12px 16px;">Launches physical Thunder Fangs and Crunch. Ground-type moves are the absolute answer here.</td>
          </tr>
        </tbody>
      </table>
`;

const getPlatinumVI_Ch14 = () => `
      <h1>Phần 14: Bí mật Pokémon Siêu Hiếm & Huyền Thoại Sinnoh</h1>
      <p>Thế giới Sinnoh mở rộng tối đa ở phiên bản Platinum, cho phép bạn thu phục trọn vẹn cả ba vị thần sáng thế của thế hệ 4 cùng những truyền thuyết cổ xưa nhất.</p>

      <h2>1. Thu phục thần thú thời gian Dialga & thần thú không gian Palkia</h2>
      <p>Khác với Diamond & Pearl chỉ cho phép bắt một trong hai thần thú, trong Platinum bạn có thể thu phục cả hai ở cấp độ 70:</p>
      <ul>
        <li><strong>Cách mở khóa:</strong> Sau khi đánh bại Elite Four, ghé thăm ngôi làng cổ Celistic Town, đọc bức bích họa cổ trong hang động. Giáo sư Rowan sẽ bật mí về hai bảo vật ngự trị trên Mt. Coronet.</li>
        <li><strong>Thu thập ngọc trấn phái:</strong> Lục tìm tại căn phòng sâu nhất trong hang động Mt. Coronet để lấy quả ngọc xanh lam <strong>Adamant Orb</strong> và quả ngọc đỏ <strong>Lustrous Orb</strong>.</li>
        <li><strong>Triệu hồi tại Spear Pillar:</strong> Đem theo hai viên ngọc này bước lên đỉnh thiêng <strong>Spear Pillar</strong>. Hai vết nứt không gian màu xanh lá và màu lam sẽ mở ra, cho phép bạn diện kiến lần lượt **Dialga (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png" style="max-width:24px; vertical-align:middle;" /> và **Palkia (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/484.png" style="max-width:24px; vertical-align:middle;" />!</li>
      </ul>

      <h2>2. Săn lùng Bộ Ba Chim Huyền Thoại (Kanto Birds) chạy hoang</h2>
      <p>Trong phiên bản Platinum, giáo sư Oak sẽ đến cư trú tại Eterna City sau khi bạn hoàn thành Pokédex Sinnoh:</p>
      <ul>
        <li>Hãy trò chuyện với giáo sư Oak tại ngôi nhà mạn đông nam Eterna City. Ông ta sẽ bật mí rằng bộ ba chim huyền thoại Kanto: <strong>Articuno</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png" style="max-width:24px; vertical-align:middle;" />, <strong>Zapdos</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png" style="max-width:24px; vertical-align:middle;" />, và <strong>Moltres</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png" style="max-width:24px; vertical-align:middle;" /> đã bay sang vùng trời Sinnoh ở <strong>Level 60</strong>.</li>
        <li>Sử dụng tính năng bản đồ <strong>Marking Map</strong> của Pokétch để theo dõi và chặn bắt chúng dã ngoại dã ngoại!</li>
      </ul>

      <h2>3. Khám phá Stark Mountain: Giải cứu Thần Lửa Heatran</h2>
      <p>Sau cốt truyện chính, vượt biển tới vùng đất Đông Bắc Sinnoh (Battle Zone) và tiến sâu vào đỉnh núi lửa Stark Mountain:</p>
      <ul>
        <li>Đồng hành cùng huấn luyện viên Buck vượt qua mê cung núi lửa phun trào. Đánh bại tàn dư Team Rocket do tên chỉ huy xảo quyệt Charon dẫn đầu để tịch thu bảo vật cổ đại Magma Stone.</li>
        <li>Quay lại gặp Buck tại Survival Area, sau đó trở lại hang động Stark Mountain, bạn sẽ thách đấu phượng hoàng lửa đất **Heatran (Level 50)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/485.png" style="max-width:24px; vertical-align:middle;" />.</li>
      </ul>

      <h2>4. Khổng lồ cổ đại Regigigas tại Snowpoint Temple</h2>
      <p>Tại sâu thẳm ngôi đền băng tuyết cổ kính Snowpoint Temple (bìa bắc Snowpoint City), một người khổng lồ đá ngủ say hàng vạn năm:</p>
      <ul>
        <li><strong>Yêu cầu triệu hồi:</strong> Bạn bắt buộc phải có đủ bộ ba Regirock, Regice, Registeel trong đội hình (thông qua trade hoặc sự kiện phân phối đặc biệt).</li>
        <li><strong>Khiêu chiến:</strong> Thần khổng lồ ngủ say **Regigigas (Level 1)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/486.png" style="max-width:24px; vertical-align:middle;" /> sẽ thức tỉnh thách thức bạn. Dù ở Level 1, sức mạnh của nó cực kỳ kinh hồn nhờ chỉ số cơ bản vô địch!</li>
      </ul>

      <h2>5. Thần Ác Mộng Darkrai & Thần Cỏ Shaymin (Sự kiện)</h2>
      <p>Mở khóa các sự kiện huyền thoại đặc biệt bằng vé sự kiện hoài cổ:</p>
      <ul>
        <li><strong>Darkrai (Newmoon Island) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/491.png" style="max-width:24px; vertical-align:middle;" />:</strong> Sử dụng thẻ khóa Member Card để ngủ sâu tại nhà nghỉ Harbor Inn (Canalave City), bước vào cơn ác mộng cực hạn dẫn đến Newmoon Island và thu phục **Darkrai (Level 50)**.</li>
        <li><strong>Shaymin (Flower Paradise) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/492.png" style="max-width:24px; vertical-align:middle;" />:</strong> Sử dụng lá thư Oak's Letter để mở khóa con đường rải đầy hoa dài nhất thế giới Sinnoh dã ngoại, tiến vào xứ sở thần tiên thu phục chú nhím cỏ **Shaymin (Level 30)**.</li>
      </ul>
`;

const getPlatinumEN_Ch14 = () => `
      <h1>Chapter 14: Rare & Legendary Sinnoh Pokémon Secrets</h1>
      <p>The Sinnoh mythos expands to its maximum scope in Platinum, granting trainers legal access to both legendary creation rulers alongside ancient slumbering deities.</p>

      <h2>1. Capturing Time Master Dialga & Space Ruler Palkia</h2>
      <p>Unlike Diamond & Pearl where you can only capture one, Platinum allows you to capture both titans at Level 70 in the post-game:</p>
      <ul>
        <li><strong>Unlocking the Quest:</strong> Defeat the Elite Four, read the ancient mural inside Celestic Town's central cave, and speak to Professor Rowan in his Sandgem lab.</li>
        <li><strong>Locating the Divine Orbs:</strong> Explore Mt. Coronet's deep interior caverns to find both the deep-blue **Adamant Orb** and the glowing pink **Lustrous Orb**.</li>
        <li><strong>Spear Pillar Summons:</strong> Walk to the summit of <strong>Spear Pillar</strong> with both items in hand. Two shimmering temporal portals open, allowing you to challenge **Dialga (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png" style="max-width:24px; vertical-align:middle;" /> and **Palkia (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/484.png" style="max-width:24px; vertical-align:middle;" />!</li>
      </ul>

      <h2>2. Tracking the Roaming Kanto Legendary Bird Trio</h2>
      <p>In Platinum, Professor Oak relocates to his second research home in Eterna City after you achieve the National Pokédex:</p>
      <ul>
        <li>Visit Professor Oak's house in southern Eterna City. He will inform you that the iconic Kanto birds: <strong>Articuno</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png" style="max-width:24px; vertical-align:middle;" />, <strong>Zapdos</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png" style="max-width:24px; vertical-align:middle;" />, and <strong>Moltres</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png" style="max-width:24px; vertical-align:middle;" /> are roaming Sinnoh's overworld grasses at <strong>Level 60</strong>.</li>
        <li>Activate your Pokétch's <strong>Marking Map</strong> application to track and corner them across Route sectors.</li>
      </ul>

      <h2>3. Infiltrating Stark Mountain: Summoning Lava Guardian Heatran</h2>
      <p>Sail to the northeastern volcanic island (Battle Zone) and charge deep into Stark Mountain:</p>
      <ul>
        <li>Partner with trainer Buck to solve the boulder puzzles in the magma caverns. Defeat Commander Charon to halt Team Galactic's remaining plans.</li>
        <li>Speak with Buck at the Survival Area, then return to the mountain's core chamber to face the fire/steel volcano titan **Heatran (Level 50)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/485.png" style="max-width:24px; vertical-align:middle;" />.</li>
      </ul>

      <h2>4. Regigigas at Snowpoint Temple</h2>
      <p>Navigate the slippery ice sheets of the multi-floor Snowpoint Temple in northern Snowpoint City:</p>
      <ul>
        <li><strong>Prerequisite:</strong> Carry Regirock, Regice, and Registeel in your active party (migrated or traded).</li>
        <li><strong>Confrontation:</strong> Interact with the giant ice-sealed titan to summon **Regigigas (Level 1)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/486.png" style="max-width:24px; vertical-align:middle;" />. Though Level 1, his base stats make him incredibly dangerous!</li>
      </ul>

      <h2>5. Mythical Events: Darkrai & Shaymin</h2>
      <p>Experience limited event stories via retro key items:</p>
      <ul>
        <li><strong>Darkrai (Newmoon Island) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/491.png" style="max-width:24px; vertical-align:middle;" />:</strong> Sleep inside Canalave City's Member-exclusive Harbor Inn. Navigate a terrifying nightmare leading to Newmoon Island to face **Darkrai (Level 50)**.</li>
        <li><strong>Shaymin (Flower Paradise) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/492.png" style="max-width:24px; vertical-align:middle;" />:</strong> Present Oak's Letter at Route 224 to grow the Seabreak Path. Walk down the blossom-strewn walkway to catch **Shaymin (Level 30)**.</li>
      </ul>
`;

const getPlatinumVI_Ch15 = () => `
      <h1>Phần 15: Toàn tập Hậu game, Đấu trường Battle Frontier & Vật phẩm Trấn phái</h1>
      <p>Thành danh vô địch Sinnoh mở ra tấm vé thông hành đến cụm đảo đông bắc <strong>Battle Zone</strong>, thánh địa tối cao thách thức mọi giới hạn của huấn luyện viên chuyên nghiệp.</p>

      <h2>1. Thách thức Đại Đấu Trường Battle Frontier Sinnoh</h2>
      <p>Tọa lạc tại trung tâm Battle Zone, **Battle Frontier** của Sinnoh quy tụ 5 cơ sở thi đấu thi tài đỉnh cao, mỗi nơi có một quy luật dũng mãnh khác nhau:</p>
      <ul>
        <li><strong>Battle Tower (Tháp Quyết Chiến):</strong> Đấu trường đấu sỹ 3v3 cổ điển. Đạt chuỗi thắng tuyệt đối để chạm trán Tower Tycoon <strong>Palmer</strong> (cha của đối thủ bạn) dã ngoại.</li>
        <li><strong>Battle Factory (Nhà Máy Thử Nghiệm):</strong> Thử tài phân tích chiến thuật tuyệt đỉnh. Bạn không được dùng Pokémon của mình mà phải thuê Pokémon ngẫu nhiên của nhà máy, liên tục trao đổi sau mỗi trận thắng để hạ gục Factory Head <strong>Thornton</strong>.</li>
        <li><strong>Battle Castle (Lâu Đài Thượng Lưu):</strong> Bạn phải quản lý điểm tài sản Castle Points (CP) tích lũy sau mỗi trận đấu để mua thuốc hồi máu, xem trước thông tin Pokémon của địch hoặc nâng cấp trang bị đối mặt Castle Valet <strong>Darach</strong>.</li>
        <li><strong>Battle Arcade (Vòng Quay Ma Thuật):</strong> Trước mỗi trận đấu dã ngoại, một vòng quay số phận sẽ xoay chuyển ngẫu nhiên để gây hiệu ứng (độc, cháy, giảm máu, tăng tốc...) lên trận đấu. Thách đấu Arcade Star <strong>Dahlia</strong> dũng mãnh.</li>
        <li><strong>Battle Hall (Sảnh Danh Vọng Cực Hạn):</strong> Đấu trường solo 1v1 dũng mãnh nhất. Bạn chọn duy nhất 1 Pokémon chiến đấu với chuỗi đối thủ tăng dần cấp hệ để đối mặt Hall Matron <strong>Argenta</strong>.</li>
      </ul>

      <h2>2. Bản Tra Cứu Các Bảo Vật & Trang Bị Trấn Phái Hệ Sinnoh</h2>
      <p>Để tối ưu hóa đội hình leo tháp Battle Frontier, hãy trang bị ngay những bảo vật cực hạn sau:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px;">Trang bị Trấn phái</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Sức mạnh cốt lõi</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Cách tìm kiếm đặc thù</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Leftovers (Đồ ăn thừa)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Hồi phục 1/16 lượng máu tối đa sau mỗi lượt chiến đấu dã ngoại.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lượm tại tầng hầm Victory Road hoặc tìm thấy trên người Snorlax hoang dã dã ngoại.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Choice Band (Băng Lựa Chọn)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 50% chỉ số tấn công vật lý cực hạn, nhưng khóa cứng Pokémon chỉ được dùng duy nhất 1 chiêu thức.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đổi bằng điểm BP chiến thắng tại quầy giải thưởng Battle Frontier.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Choice Specs (Kính Lựa Chọn)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 50% chỉ số tấn công đặc biệt, khóa duy nhất một kỹ năng chiến đấu.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tìm thấy ở mạn đông bắc Celestic Town vào khung giờ sáng sớm hoặc đổi điểm BP.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Life Orb (Bảo Ngọc Sinh Mệnh)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 30% sức công phá của toàn bộ đòn đánh, đổi lại mất 10% lượng máu tối đa sau mỗi đòn trúng địch.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nằm sâu bên trong hang động Stark Mountain hoặc đổi điểm BP tại đấu trường dã ngoại.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Focus Sash (Đai Tập Trung)</td>
            <td style="padding: 12px 16px;">Giúp Pokémon sống sót với đúng 1 giọt máu (1 HP) trước các đòn đánh nốc ao chí tử từ đầy cây máu.</td>
            <td style="padding: 12px 16px;">Gặp cụ già hàng ngày tại Route 221 hoặc đổi điểm thưởng BP.</td>
          </tr>
        </tbody>
      </table>
`;

const getPlatinumEN_Ch15 = () => `
      <h1>Chapter 15: Sinnoh Battle Frontier & Essential Items Guide</h1>
      <p>Entering the Hall of Fame grants access to the northeastern **Battle Zone**, the ultimate destination testing your extreme battle strategies.</p>

      <h2>1. Conquering the Sinnoh Battle Frontier</h2>
      <p>The Sinnoh Battle Frontier houses 5 spectacular arenas, each presenting high-level rule shifts:</p>
      <ul>
        <li><strong>Battle Tower:</strong> Pure 3v3 battles. Achieve a high winning streak to clash with Tower Tycoon <strong>Palmer</strong>.</li>
        <li><strong>Battle Factory:</strong> Tests tactical foresight. Rent a random squad of rental Pokémon. Exchange members after victories to face Factory Head <strong>Thornton</strong>.</li>
        <li><strong>Battle Castle:</strong> Accumulate and invest Castle Points (CP) to buy combat recovery, inspect opponent rosters, or purchase tools. Confront Castle Valet <strong>Darach</strong>.</li>
        <li><strong>Battle Arcade:</strong> Spin the game-altering roulette before combat rounds to trigger statuses or terrain effects. Challenge Arcade Star <strong>Dahlia</strong>.</li>
        <li><strong>Battle Hall:</strong> Extreme 1v1 survival. Select your best individual Pokémon to sweep through type categories and battle Hall Matron <strong>Argenta</strong>.</li>
      </ul>

      <h2>2. Sinnoh Competitive Held Items Directory</h2>
      <p>To craft elite squads capable of maintaining long streaks, collect these supreme held items:</p>
      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px;">Item Name</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Tactical Advantage</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left;">Sinnoh Source Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Leftovers</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Gradually heals 1/16 maximum HP each combat turn.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Located on the bottom floor of Victory Road, or held by wild Snorlax.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Choice Band</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boosts Physical Attack stat by 50% but locks the holder into their first selected move.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Exchange for BP inside the Battle Frontier lobby.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Choice Specs</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boosts Special Attack stat by 50% but restricts usage to a single move.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Found in northeastern Celestic Town during morning hours, or purchased with BP.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Life Orb</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Enhances attack damage by 30% but consumes 10% maximum HP on every hit.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Found deep inside Stark Mountain chambers, or bought with BP.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Focus Sash</td>
            <td style="padding: 12px 16px;">Guarantees holding onto 1 HP if hit by a fatal knockout blow from maximum health.</td>
            <td style="padding: 12px 16px;">Gifted by the Route 221 elder daily, or traded with BP.</td>
          </tr>
        </tbody>
      </table>
`;

// ========================================================
// COMBINING & EXPORTING PLATINUM WALKTHROUGH DYNAMICALLY
// ========================================================

export const PLATINUM_CHAPTERS = DIAMOND_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // Global replacements for Platinum
  content = content
    .replace(/diamond/g, 'platinum')
    .replace(/Diamond/g, 'Platinum')
    .replace(/Kim Cương/g, 'Bạch Kim')
    .replace(/Kim cương/g, 'Bạch kim');

  // Replace Chapter 12 with Platinum-specific Distortion World & Volkner
  if (chapter.order === 12 && chapter.language === 'vi') {
    content = getPlatinumVI_Ch12();
  }

  // Replace Chapter 14 with Platinum-specific Legendaries
  if (chapter.order === 14 && chapter.language === 'vi') {
    content = getPlatinumVI_Ch14();
  }

  // Replace Chapter 15 with Platinum-specific Battle Frontier & items
  if (chapter.order === 15 && chapter.language === 'vi') {
    content = getPlatinumVI_Ch15();
  }

  // Swap Gym ordering references for Fantina and Maylene in Platinum
  if (chapter.order === 3 && chapter.language === 'vi') {
    content = content.replace(
      'Giải cứu Valley Windworks khỏi Team Galactic',
      'Giải cứu Valley Windworks khỏi Team Galactic & Tìm kiếm Thám tử Looker'
    );
  }

  return {
    ...chapter,
    gameVersion: 'platinum',
    chapterTitle: chapter.chapterTitle
      .replace(/diamond/g, 'platinum')
      .replace(/Diamond/g, 'Platinum')
      .replace(/Kim Cương/g, 'Bạch Kim')
      .replace(/Kim cương/g, 'Bạch kim')
      .replace(/Dialga/g, 'Giratina')
      .replace(/Huy hiệu thứ năm/g, 'Huy hiệu thứ ba') // Fantina is Gym 3 in Platinum
      .replace(/Huy hiệu thứ ba/g, 'Huy hiệu thứ tư')  // Maylene is Gym 4 in Platinum
      .replace(/Huy hiệu thứ tư/g, 'Huy hiệu thứ năm') // Crasher Wake is Gym 5 in Platinum
      .replace(/đỉnh thiêng Spear Pillar triệu hồi Dialga/g, 'Thế giới Hỗn Mang Distortion World'),
    content
  };
});

export const ENGLISH_PLATINUM_CHAPTERS = ENGLISH_DIAMOND_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // Global replacements for Platinum
  content = content
    .replace(/diamond/g, 'platinum')
    .replace(/Diamond/g, 'Platinum');

  // Replace Chapter 12 with Platinum-specific Distortion World & Volkner
  if (chapter.order === 12 && chapter.language === 'en') {
    content = getPlatinumEN_Ch12();
  }

  // Replace Chapter 14 with Platinum-specific Legendaries
  if (chapter.order === 14 && chapter.language === 'en') {
    content = getPlatinumEN_Ch14();
  }

  // Replace Chapter 15 with Platinum-specific Battle Frontier & items
  if (chapter.order === 15 && chapter.language === 'en') {
    content = getPlatinumEN_Ch15();
  }

  return {
    ...chapter,
    gameVersion: 'platinum',
    chapterTitle: chapter.chapterTitle
      .replace(/diamond/g, 'platinum')
      .replace(/Diamond/g, 'Platinum')
      .replace(/Dialga/g, 'Giratina')
      .replace(/Fifth Badge/g, 'Third Badge') // Fantina is Gym 3 in Platinum
      .replace(/Third Badge/g, 'Fourth Badge')  // Maylene is Gym 4 in Platinum
      .replace(/Fourth Badge/g, 'Fifth Badge') // Crasher Wake is Gym 5 in Platinum
      .replace(/Dialga Awakening at Spear Pillar/g, 'Distortion World Exploration'),
    content
  };
});
