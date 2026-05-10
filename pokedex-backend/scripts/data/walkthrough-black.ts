export const BLACK_CHAPTERS = [
  {
    gameVersion: "black",
    chapterTitle: "Phần 1: Khởi đầu mới tại Nuvema Town & Lựa chọn Starter Gen 5",
    order: 1,
    language: "vi",
    content: `
      <h1>Phần 1: Khởi đầu mới tại Nuvema Town & Lựa chọn Starter Gen 5</h1>
      <p>Chào mừng bạn bước vào thế giới Unova kỳ vĩ trong phiên bản đột phá thế hệ 5 - Pokémon Black! Cuộc phiêu lưu bắt đầu tại căn phòng nhỏ của bạn ở Nuvema Town cùng hai người bạn thuở nhỏ Cheren và Bianca.</p>

      <h2>1. Lựa chọn Pokémon Khởi đầu Gen 5</h2>
      <p>Món quà từ Giáo sư Juniper cho phép bạn chọn một trong ba chiến binh vô cùng đặc trưng với những phân tích chiến thuật dưới đây:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Đánh giá chiến thuật hành trình Unova</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/495.png" alt="Snivy" style="max-width: 50px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Snivy</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ (Grass)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Nổi tiếng với Tốc độ cực cao và khả năng chống chịu rất tốt, tiến hóa thành Serperior kiêu hãnh. Tuy nhiên, các phòng Gym ở Unova không mấy ưu ái hệ Cỏ, khiến hành trình đi cảnh khó khăn hơn chút.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/498.png" alt="Tepig" style="max-width: 50px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Tepig</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa (Fire)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Lựa chọn đi cốt truyện tối ưu nhất! Sau khi tiến hóa thành Emboar mang song hệ **Lửa / Giác đấu**, nó dễ dàng đè bẹp phòng Gym thường của Lenora, bọ của Burgh và băng của Brycen. Lượng HP siêu khủng và sức tấn công cực mạnh gánh đội cực khỏe.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/501.png" alt="Oshawott" style="max-width: 50px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #3b82f6;">Oshawott</td>
            <td style="padding: 12px 16px;">Nước (Water)</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Người bạn đồng hành vô cùng cân bằng về mọi chỉ số, tiến hóa thành Samurott oai vệ mang bộ chiêu thức cực kỳ đa dạng. Vô cùng hữu dụng trước Clay hệ Đất và có thể học nhiều đòn vật lý lẫn đặc biệt bộc phá.</td>
          </tr>
        </tbody>
      </table>

      <blockquote style="border-left: 4px solid #f59e0b; padding: 12px 16px; margin: 24px 0; background-color: rgba(245, 158, 11, 0.05); border-radius: 0 12px 12px 0;">
        <strong>Đặc trưng Gen 5:</strong> Trong Pokémon Black & White, cho đến khi đánh bại xong cốt truyện chính, bạn sẽ CHỈ chạm trán toàn bộ các Pokémon hoang dã mới toanh thuộc vùng Unova. Một trải nghiệm hoàn toàn tươi mới chưa từng có!
      </blockquote>

      <h2>2. Khởi hành & Diện kiến Team Plasma đầy bí hiểm</h2>
      <p>Sau trận so tài tơi bời làm nát căn phòng ngủ cùng Cheren và Bianca, hãy xuống nhà nhận bản đồ từ mẹ và tiến về phòng thí nghiệm nhận Pokédex từ Giáo sư Juniper. Lên đường qua Route 1 để đến Accumula Town, nơi bạn sẽ chứng kiến một cuộc diễu hành đầy ma mị của nhóm **Team Plasma** dẫn đầu bởi Ghetsis kêu gọi người dân phóng thích Pokémon tự do.</p>
      <p>Tại đây, một cậu bé bí ẩn tên **N** (người có khả năng thấu hiểu tiếng lòng Pokémon) sẽ chặn bạn thách đấu!</p>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 2: Huy hiệu Trio Badge tại Striaton City & Quà tặng quý giá",
    order: 2,
    language: "vi",
    content: `
      <h1>Phần 2: Huy hiệu Trio Badge tại Striaton City & Quà tặng quý giá</h1>
      <p>Băng qua Route 2, đối đầu với Bianca dũng mãnh để tiến về Striaton City - thành phố thanh bình nổi tiếng với quán trà kết hợp nhà thi đấu đầy phong cách.</p>

      <h2>1. Nhận khỉ nguyên tố tại xưởng hoang Dreamyard</h2>
      <p>Trước khi thách đấu Gym, hãy lập tức rẽ sang khu phế tích hoang tàn **Dreamyard** ở mạn đông thành phố. Nói chuyện với cô gái đứng đầu lối đi để được tặng một chú khỉ nguyên tố khắc chế hoàn toàn chú khỉ của thủ lĩnh:</p>
      <ul>
        <li>Nếu bạn chọn **Snivy**: Nhận **Panpour** (Nước) để trị chú khỉ Lửa Pansear của Chili.</li>
        <li>Nếu bạn chọn **Tepig**: Nhận **Pansage** (Cỏ) để trị chú khỉ Nước Panpour của Cress.</li>
        <li>Nếu bạn chọn **Oshawott**: Nhận **Pansear** (Lửa) để trị chú khỉ Cỏ Pansage của Cilan.</li>
      </ul>

      <h2>2. Hạ gục 1 trong 3 thủ lĩnh sinh ba (Trio Badge)</h2>
      <p>Trong phòng thi đấu Striaton, tùy thuộc vào Starter bạn đã chọn, bạn sẽ phải đối mặt với 1 trong 3 anh em sinh ba tương ứng sở hữu chú khỉ nguyên tố cấp độ 14 tinh ranh:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(244, 63, 94, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Thủ lĩnh</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Pokémon Át Chủ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Kế sách đè bẹp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/513.png" alt="Pansear" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ef4444;">Chili (Lửa)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Pansear</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 14</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Dùng đòn Water Gun của chú khỉ Panpour được tặng để dội nước tắt lửa lẹ làng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/511.png" alt="Pansage" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Cilan (Cỏ)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Pansage</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 14</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sử dụng đòn Incinerate phun lửa của Pansear để nướng giòn rụm chú khỉ cỏ Pansage.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/515.png" alt="Panpour" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #3b82f6;">Cress (Nước)</td>
            <td style="padding: 12px 16px; font-weight: bold; color: #cbd5e1;">Panpour</td>
            <td style="padding: 12px 16px;">Lvl 14</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Dùng đòn Vine Whip quật roi cỏ bạo liệt của Pansage để dẹp tan con khỉ nước này dứt điểm!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 3: Huy hiệu Basic Badge tại Nacrene City & Đòn báo thù bạo lực",
    order: 3,
    language: "vi",
    content: `
      <h1>Phần 3: Huy hiệu Basic Badge tại Nacrene City & Đòn báo thù bạo lực</h1>
      <p>Sau chiến thắng đầu tiên, bám theo Plasma cứu chú Munna quý hiếm lấy C-Gear. Tiến dọc theo con đường sắt Route 3 để đến Nacrene City - thành phố cổ có những ngôi nhà lát gạch đỏ và Viện bảo tàng khổng lồ.</p>

      <h2>1. Thu phục đấu sĩ hệ Giác Đấu khắc chế</h2>
      <p>Trước khi đâm đầu vào thách đấu thủ lĩnh Lenora chuyên hệ Thường khét tiếng, hãy chạy ngay vào rừng **Pinwheel Forest** (khu vực bên ngoài phòng Gym) thu phục một chú **Sawk** hoặc **Timburr** hệ Giác Đấu cực kỳ mạnh khỏe tại bãi cỏ hoang. Đây là quân át chủ bài bắt buộc phải có để đè bẹp hệ Thường!</p>

      <h2>2. Vượt hiểm ải Thủ lĩnh Lenora (Basic Badge)</h2>
      <p>Lenora sở hữu chiêu thức kết hợp bạo lực cực kì hiểm độc: Ru ngủ bằng **Hypnosis** rồi giã nát toàn đội bằng đòn đánh báo thù **Retaliate** (gây gấp đôi sát thương bạo phát nếu có Pokémon đồng đội của cô ta ngã xuống trước đó!):</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(148, 163, 184, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left;">Mẹo sinh tồn cốt lõi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/506.png" alt="Herdier" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Herdier</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 18</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mang chiêu Take Down cực mạnh húc nát đối phương. Hãy dùng Timburr hoặc Sawk đấm chiêu Giác đấu dập nát lẹ làng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/505.png" alt="Watchog" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Watchog (Cơn ác mộng)</td>
            <td style="padding: 12px 16px;">Lvl 20</td>
            <td style="padding: 12px 16px;">Thường</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Sở hữu **Hypnosis** gây ngủ sâu cực kỳ ức chế và **Retaliate** sát thương khủng khiếp. Tuyệt đối không để nó húc đòn Retaliate bạo phát! Hãy lập tức dùng Sawk/Timburr tung chiêu **Low Kick** hoặc **Rock Smash** liên hoàn đấm vỡ nát chú chồn Watchog này trước khi nó kịp hành động!</td>
          </tr>
        </tbody>
      </table>
      <p>Giữa lễ nhận huy hiệu vinh quang, Team Plasma bất ngờ đột kích tháp bảo tàng cướp đi chiếc sọ rồng cổ đại Dragon Skull vô cùng đắt giá! Sát cánh cùng Burgh truy tìm bọn cướp.</p>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 4: Siêu đô thị Castelia City & Huy hiệu Insect Badge rực bọ",
    order: 4,
    language: "vi",
    content: `
      <h1>Phần 4: Siêu đô thị Castelia City & Huy hiệu Insect Badge rực bọ</h1>
      <p>Rượt đuổi băng cướp qua rừng rậm sâu thẳm Pinwheel Forest nhặt được quả đá quý tiến hóa, vượt qua cây cầu dây vĩ đại nhất lịch sử Skyarrow Bridge lộng gió để ngắm nhìn siêu đô thị tráng lệ bậc nhất Castelia City.</p>

      <h2>1. Khám phá các góc phố Castelia đầy sôi động</h2>
      <ul>
        <li>Ghé quầy kem Castelia Cone nổi tiếng mua kem giải độc hồi HP.</li>
        <li>Bám đuôi Plasma vào các con hẻm tối, giải cứu chú Munna của Bianca bị bắt cóc trong văn phòng bí ẩn mạn tây.</li>
      </ul>

      <h2>2. Thách đấu Burgh hệ Trùng dũng mãnh (Insect Badge)</h2>
      <p>Burgh sở hữu binh đoàn bọ tinh xảo có tốc độ cực nhanh, bọc giáp gai góc bạo phát:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(132, 204, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(132, 204, 22, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left;">Cách đối phó bộc phá</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/557.png" alt="Dwebble" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dwebble</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Trùng / Đá</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mang đòn ném đá dữ dội Smack Down. Hãy dùng đòn Nước (Oshawott/Dewott) hoặc Giác đấu đập vỡ khiên đá.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/543.png" alt="Whirlipede" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Whirlipede</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Trùng / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Chơi độc tố Poison Tail cực khó chịu. Phun lửa thiêu rụi nhanh bằng Pignite lẹ làng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/542.png" alt="Leavanny" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Leavanny (Át chủ bọ lá)</td>
            <td style="padding: 12px 16px;">Lvl 23</td>
            <td style="padding: 12px 16px;">Trùng / Cỏ</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Chú bọ lá khổng lồ mang đòn cắt xé bạo kích **Razor Leaf** và **Struggle Bug** bòn rút năng lượng. Sấy nóng giòn rụm bằng đòn phun lửa Flame Charge của Pignite hoặc đòn hệ Bay ($\times 4$ sát thương cực đại) của Tranquill để tiễn nó về trời tức thì!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 5: Sa mạc cát lún rực lửa & Thủ lĩnh Elesa lôi cuốn tại Nimbasa",
    order: 5,
    language: "vi",
    content: `
      <h1>Phần 5: Sa mạc cát lún rực lửa & Thủ lĩnh Elesa lôi cuốn tại Nimbasa</h1>
      <p>Lên đường tiến về hướng bắc qua sa mạc khắc nghiệt Route 4 rực lửa (nơi bão cát gầm rú liên hồi hoang dã) để đặt chân tới trung tâm giải trí hoành tráng Nimbasa City.</p>

      <h2>1. Chinh phục khu sa mạc hoang dã cát lún Desert Resort</h2>
      <p>Hãy rẽ trái tiến sâu vào hoang mạc **Desert Resort** và **Relic Castle** cổ đại. Thu phục chú cá sấu đất cát cực kì hữu dụng **Sandile** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/551.png" style="max-width:24px; vertical-align:middle;" /> hệ Đất/Tối hoặc **Darumaka** hệ Lửa cực bạo lực để chuẩn bị sẵn lực lượng quét sập phòng Gym hệ Điện sắp tới.</p>

      <h2>2. Thách đấu Mỹ nhân Elesa - Bẫy điện lôi lốc xoay (Bolt Badge)</h2>
      <p>Elesa trong thế hệ 5 sở hữu chiến thuật đảo quân **Volt Switch** lượn lách cực kì gây ức chế cho mọi kỳ tài huấn luyện:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(234, 179, 8, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(234, 179, 8, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left;">Mẹo bẻ bẫy sét lôi cuốn</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/587.png" alt="Emolga" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Emolga x2</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 25</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mang song hệ Bay khiến nó miễn nhiễm hoàn toàn đòn hệ Đất! Thích dùng **Volt Switch** đấm đau rồi đổi đồng đội. Hãy khống chế giật lùi bằng đòn Đá (Rock Tomb/Smack Down) để triệt hạ bộ cánh điện này lẹ làng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/523.png" alt="Zebstrika" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Zebstrika (Ngựa lôi dã bạo)</td>
            <td style="padding: 12px 16px;">Lvl 27</td>
            <td style="padding: 12px 16px;">Điện</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Tốc độ kinh hoàng mang đòn **Spark** bộc sét rát và **Flame Charge** lướt lửa dạt. Hãy tung ngay chú cá sấu Sandile hoặc một chú Pokémon hệ Đất sử dụng đòn đào hầm **Dig** hoặc **Mud-Slap** lấp cát chôn vùi chiến mã này tức thì!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 6: Khai phá Driftveil City & Đào hầm kho báu Clay",
    order: 6,
    language: "vi",
    content: `
      <h1>Phần 6: Khai phá Driftveil City & Đào hầm kho báu Clay</h1>
      <p>Sau trận chiến nảy lửa rực rỡ, băng qua cây cầu xoay khổng lồ lộng gió Driftveil Drawbridge để đặt chân tới thành phố cảng tấp nập Driftveil City.</p>

      <h2>1. Truy lùng tàn dư Plasma trong kho đông lạnh</h2>
      <p>Trước khi gõ cửa phòng Gym, thủ lĩnh Clay yêu cầu bạn phải dọn dẹp sạch sẽ hang ổ tàn dư Plasma lẩn trốn sâu trong khu kho lạnh hoang dã **Cold Storage** phía nam cảng. Sử dụng đòn hệ Lửa để quét tan băng tuyết giải cứu dã dã ngoại.</p>

      <h2>2. Vượt tháp hầm khai mỏ Clay (Quake Badge)</h2>
      <p>Clay là ông trùm khai mỏ hệ Đất đá vô cùng rắn rỏi với những đòn đánh chấn động mặt đất dã bạo bạo bạo:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(249, 115, 22, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left;">Mẹo bẻ sập hầm lò khai mỏ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/536.png" alt="Palpitoad" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Palpitoad</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Song hệ khiến nó miễn nhiễm hoàn toàn hệ Điện! Nhưng bù lại dính $\times 4$ từ hệ Cỏ. Hãy quật tơi bời bằng đòn cỏ Razor Leaf để tiễn nó ra đi lẹ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/552.png" alt="Krokorok" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Krokorok</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đất / Bóng Tối</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mang chiêu đào đất giam cầm. Tận dụng hệ Nước dội sóng lướt trôi.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/530.png" alt="Excadrill" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Excadrill (Quái thú máy xúc)</td>
            <td style="padding: 12px 16px;">Lvl 31</td>
            <td style="padding: 12px 16px;">Thép / Đất</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Cực kỳ bạo ngược dữ tợn mang đòn **Rock Slide** bạo phát và **Slash** cào rách da thịt dã bạo. Nhờ song hệ Thép/Đất nó có cực nhiều kháng hệ, nhưng sợ Nước, Lửa và Giác đấu. Hãy dùng đòn lướt sóng nước của Dewott hoặc cú phun lửa mãnh liệt của Emboar để sấy sập hầm lò tức thì!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 7: Chinh phục bầu trời Mistralton & Phi cơ lướt gió Skyla",
    order: 7,
    language: "vi",
    content: `
      <h1>Phần 7: Chinh phục bầu trời Mistralton & Phi cơ lướt gió Skyla</h1>
      <p>Vượt qua hẻm núi sương mù trập trùng Route 6 đầy quặng sét hoang dã dã ngoại để tiến thẳng tới thành phố hàng không Mistralton City lộng gió trời cao.</p>

      <h2>1. Thăng hoa leo Tháp Celestial Tower cầu hồn</h2>
      <p>Lên mạn bắc vượt qua các trảng cỏ cao để tiến vào tháp chuông cổ kính **Celestial Tower** linh thiêng. Trèo lên tầng mái rung lên tiếng chuông thanh tịnh tiễn biệt linh hồn Pokémon, gặp gỡ mỹ nhân bay lượn Skyla chỉ lối quay lại thách đấu phòng Gym bão tố.</p>

      <h2>2. Đoạt lấy huy hiệu cánh phi cơ Skyla (Jet Badge)</h2>
      <p>Phòng Gym Mistralton là những khẩu đại pháo bắn bốc người lộn nhào độc đáo, lướt qua bão lốc thách đấu Skyla:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(14, 165, 233, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(14, 165, 233, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: left;">Mẹo bắn rụng cánh phi cơ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/528.png" alt="Swoobat" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Swoobat</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 33</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Có tốc độ bay lượn rất nhanh. Hãy bắn rụng bằng đòn Đá hoặc đòn Bóng Tối dứt điểm.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/558.png" alt="Crustle" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Unfezant</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 33</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tung chiêu Air Slash cực đau. Giật sét tê liệt bằng lôi điện triệt hạ lẹ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/581.png" alt="Swanna" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Swanna (Thiên nga lướt bão)</td>
            <td style="padding: 12px 16px;">Lvl 35</td>
            <td style="padding: 12px 16px;">Thủy / Bay</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Mang song hệ Thủy / Bay bộc phá cực mạnh với đòn **Bubble Beam** dội lốc và **Feather Dance** giảm công bạo kích. Tuy nhiên, song hệ này dính $\times 4$ sát thương chí tử từ hệ Điện! Hãy dùng đòn điện giật sấm sét lôi đình của Zebstrika hoặc Galvantula để nướng giòn thiên nga trắng chỉ trong 1 nốt nhạc!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 8: Vượt núi lửa đóng băng Icirrus & Băng giá vĩnh hằng Brycen",
    order: 8,
    language: "vi",
    content: `
      <h1>Phần 8: Vượt núi lửa đóng băng Icirrus & Băng giá vĩnh hằng Brycen</h1>
      <p>Sau khi nhận tuyệt kỹ bay lượn vĩ đại, băng qua hang núi đá trập trùng Twist Mountain đầy hiểm trở để tiến thẳng về thành phố đầm lầy đóng băng tuyết trắng dã dã ngoại Icirrus City.</p>

      <h2>1. Khám phá các đầm lầy tuyết rơi theo mùa Unova</h2>
      <p>Unova sở hữu cơ chế thay đổi mùa cực kì đặc sắc của thế hệ 5! Vào mùa đông, các đầm lầy xung quanh Icirrus City sẽ đóng băng hoàn toàn, mở ra các lối đi bí mật nhặt vô số đồ ngon và đá tiến hóa siêu hiếm dã bạo.</p>

      <h2>2. Đè bẹp thành trì đóng băng Brycen (Freeze Badge)</h2>
      <p>Brycen là cao thủ băng tuyết dũng mãnh, sở hữu những tảng băng di động bọc thép cực dày sừng sững:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(6, 182, 212, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left;">Kế sách làm tan tuyết cực nhanh</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/582.png" alt="Vanillish" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Vanillish</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 37</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Băng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Kem tuyết bọc giáp gai góc. Hãy dùng đòn Lửa của Emboar sấy nóng tan tành.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/615.png" alt="Cryogonal" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Cryogonal</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 37</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Băng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sở hữu chỉ số phòng thủ đặc biệt cực khủng né tránh phép. Hãy giã nát tảng băng này bằng đòn vật lý cận chiến lẹ làng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/614.png" alt="Beartic" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Beartic (Gấu tuyết bạo cuồng)</td>
            <td style="padding: 12px 16px;">Lvl 39</td>
            <td style="padding: 12px 16px;">Băng</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Gấu tuyết khổng lồ mang đòn vật lý hủy diệt **Icicle Crash** bạo liệt và **Slash** tàn nhẫn dã bạo. Hãy lập tức đốt cháy lông tuyết của nó bằng đòn phun lửa mạnh nhất của Emboar hoặc dùng Sawk đấm vỡ vụn hàm tuyết bằng đòn Giác Đấu bạo phát dứt điểm!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 9: Thành phố hiện đại Opelucid & Bão Rồng tối thượng Drayden",
    order: 9,
    language: "vi",
    content: `
      <h1>Phần 9: Thành phố hiện đại Opelucid & Bão Rồng tối thượng Drayden</h1>
      <p>Băng qua cây cầu tuyệt mỹ lộng lẫy Tubeline Bridge tiến về thành phố mang màu sắc tương lai lộng lẫy Opelucid City (trong phiên bản Pokémon Black, Opelucid rực sáng với phong cách khoa học hiện đại cực kì đẳng cấp!).</p>

      <h2>1. Sự khác biệt đỉnh cao của Opelucid bản Black</h2>
      <p>Khác biệt hoàn toàn với bản White mang hơi hướng cổ kính, thành phố Opelucid trong bản Black là đỉnh cao kiến trúc công nghệ tương lai tương ứng với rồng Reshiram của sự tiến bộ. Tại đây, thủ lĩnh cai trị tối cao phòng Gym là cụ già oai nghiêm **Drayden**.</p>

      <h2>2. Chém sập trận bão rồng Drayden (Legend Badge)</h2>
      <p>Drayden là long vương hệ Rồng bạo ngược với những loài rồng cổ mang sát thương tấn công thể chất khổng lồ gớm ghiếc:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(99, 102, 241, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left;">Mẹo chặt sập long tộc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/611.png" alt="Fraxure" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Fraxure</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rồng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sở hữu đòn Dragon Claw xé gió. Hãy dùng đòn Băng giá đập gục nhanh tránh nó tích Dragon Dance.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/621.png" alt="Druddigon" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Druddigon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rồng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mang đòn tàn sát giáp Rough Skin cực kì gai góc và Revenge nã bạo bạo. Hãy dùng phép tầm xa đóng băng tuyết rã.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/612.png" alt="Haxorus" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Haxorus (Rồng lưỡi rìu bạo chúa)</td>
            <td style="padding: 12px 16px;">Lvl 43</td>
            <td style="padding: 12px 16px;">Rồng</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Quái thú sở hữu sức tấn công vật lý đỉnh cao hàng đầu thế giới với hàm răng như hai lưỡi rìu cực kì đáng sợ. Nó có đòn **Slash** và **Dragon Tail** cực mạnh gạt bay mọi rào cản. Hãy dùng một chú rồng dũng mãnh dùng đòn rồng siêu bạo kích trước hoặc dội bão tuyết đóng băng cứng lưỡi rìu này dứt điểm tức thì!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 10: Thách thức Elite Four & Sự trỗi dậy kinh hoàng của Lâu đài N's Castle",
    order: 10,
    language: "vi",
    content: `
      <h1>Phần 10: Thách thức Elite Four & Sự trỗi dậy kinh hoàng của Lâu đài N's Castle</h1>
      <p>Sau khi đoạt đủ 8 chiếc huy hiệu danh giá, vượt qua con đường rực lửa Route 10, đặt chân lên đấu trường tột cùng của vinh quang: Pokémon League.</p>

      <h2>1. Thách đấu Bộ Tứ Siêu Đẳng Elite Four đỉnh cao</h2>
      <p>Unova Elite Four cho phép bạn tự do lựa chọn thứ tự thách thách đấu 4 cao thủ chuyên nghiệp bậc nhất:</p>
      <ul>
        <li><strong>Shauntal (Ma quái):</strong> Dùng đòn Bóng Tối hoặc Ma bạo kích cực nhanh lên Coagrigus và Chandelure.</li>
        <li><strong>Grimsley (Bóng tối):</strong> Dùng đòn Giác Đấu (Sawk/Emboar) hoặc côn trùng đạp bẻ vỡ giáp Bisharp và Krookodile lẹ.</li>
        <li><strong>Caitlin (Tâm Linh):</strong> Pierce thủ vật lý yếu ớt bằng các đòn Bóng Tối dứt điểm tàn khốc.</li>
        <li><strong>Marshal (Giác đấu):</strong> Dùng đòn Tâm Linh hoặc đòn hệ Bay tầm xa dội ngập đấu sĩ.</li>
      </ul>

      <h2>2. Sự trỗi dậy kinh hoàng của N's Castle bao vây League</h2>
      <p>Khi bạn sắp sửa bước vào thách đấu Nhà Vô Địch Alder, N bất ngờ đánh bại Alder trước! Ngay lập tức, một tòa lâu đài khổng lồ đầy ma mị **N's Castle** trỗi dậy từ lòng đất, những chiếc vuốt sắt gớm ghiếc cắm thẳng bám chặt xung quanh Pokémon League, tạo nên cảnh tượng hào hùng bậc nhất lịch sử dòng game!</p>
      <p>Hãy bước chân tiến vào lâu đài rực rỡ bạo liệt để diện kiến trận chiến cuối cùng định mệnh thế giới.</p>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 11: Trận chiến định mệnh - Triệu hồi Bạch Long Reshiram & Hạ gục Ghetsis",
    order: 11,
    language: "vi",
    content: `
      <h1>Phần 11: Trận chiến định mệnh - Triệu hồi Bạch Long Reshiram & Hạ gục Ghetsis</h1>
      <p>Đây là trận quyết chiến hào hùng lưu danh vạn cổ của Pokémon Black, bắt buộc người chơi phải thức tỉnh rồng thiêng tiến hóa!</p>

      <h2>1. Triệu hồi và thu phục Rồng Lửa Thiên Reshiram (Level 50)</h2>
      <p>Bước lên tầng đỉnh của lâu đài N's Castle, viên đá ánh sáng **Light Stone** của bạn bất ngờ bừng sáng rực rỡ, bộc phát lôi lửa ngập trời triệu gọi thần thú tối cao rồng lửa trắng **Reshiram (Level 50)** xuất thế cực kì hào hùng gầm rú vang dội!</p>
      <div style="text-align: center; margin: 24px 0;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/643.png" alt="Reshiram" style="max-width: 120px;" />
        <p style="font-style: italic; color: #ef4444; margin-top: 8px;">Thần Rồng Trắng Reshiram thức tỉnh rực rỡ lửa thiêng đỉnh lâu đài N's Castle!</p>
      </div>
      <blockquote style="border-left: 4px solid #ef4444; padding: 12px 16px; margin: 24px 0; background-color: rgba(239, 68, 68, 0.05); border-radius: 0 12px 12px 0;">
        <strong>Kế hoạch thu phục:</strong> Reshiram đứng chặn bạn ở Level 50 mang tuyệt kỹ độc quyền **Blue Flare** tàn phá cực bạo. Hãy dùng đòn Đất/Rồng rút máu lẹ, quăng ngay Quick Ball hoặc Ultra Ball để thu phục nó đồng hành chiến đấu lập tức!
      </blockquote>

      <h2>2. Đập tan N & Tiêu diệt Trùm Bóng Đêm Ghetsis cứu rỗi thế giới</h2>
      <p>Sau khi thu phục Reshiram, lập tức đối đầu thách thách **N** sở hữu Hắc Long cực dữ **Zekrom (Level 52)** lôi điện bão bùng. Sử dụng rồng trắng Reshiram để tạo nên cuộc long tranh hổ đấu vĩ đại bậc nhất!</p>
      <p>Ngay sau khi N thức tỉnh và hối lỗi, tên trùm đứng sau bóng tối **Ghetsis** lộ mặt bạo kích thách đấu toàn lực nhằm diệt khẩu bạn bằng đội hình tàn ác tột tột bạo:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(220, 38, 38, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(220, 38, 38, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: left;">Đòn đánh bạo phát</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: left;">Chiến lược dập sập nát tàn ác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/635.png" alt="Hydreigon" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ef4444;">Hydreigon (Rồng Ba Đầu tàn tàn bạo)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ef4444;">Lvl 54</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon Pulse, Surf, Focus Blast</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Là một trong những con Boss khó trị nhất mọi thế hệ vì nó cầm đầy đủ chiêu khắc chế cứng mọi hệ! Hãy dốc toàn lực dùng các đòn Giác Đấu thể chất cực mạnh hoặc đòn rồng siêu mạnh bạo phát bộc phá ghim gãy nát rồng ba đầu này dứt điểm tức thì giải cứu Unova!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 12: Bản đồ Hậu Game - Khám phá phía đông Unova & Đại chiến Cynthia",
    order: 12,
    language: "vi",
    content: `
      <h1>Phần 12: Bản đồ Hậu Game - Khám phá phía đông Unova & Đại chiến Cynthia</h1>
      <p>Chiến thắng Ghetsis mở ra thế giới hậu game cực kì rộng lớn phía đông Unova, nơi những Pokémon hoang dã cấp độ cao ngất ngưởng từ các thế hệ trước xuất hiện!</p>

      <h2>1. Du ngoạn các địa danh phía đông trù phú</h2>
      <ul>
        <li>Băng qua thành phố cảng xinh đẹp Undella Town và vùng vịnh Abyssal Ruins ẩn chứa kho báu vàng bạc vạn năm.</li>
        <li>Đi dọc Village Bridge cây cầu đá cổ kính ngàn năm và thành phố Lacunosa Town biệt lập bình yên dã dã ngoại.</li>
      </ul>

      <h2>2. Thách chiến Đại Ca Cynthia tại biệt thự Undella Town</h2>
      <p>Vào mùa xuân hoặc mùa hè, bước vào biệt thự sang trọng Undella Villa, bạn sẽ diện kiến sự hiện diện lẫy lừng của **Nhà Vô Địch Sinnoh Cynthia** oai phong chặn đường thách đấu với đội hình Level 75 cực bạo:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(168, 85, 247, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left;">Mẹo bẻ răng ác long Garchomp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png" alt="Garchomp" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Garchomp (Át chủ thần sầu)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Lvl 77</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rồng / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mang đòn quét đuôi rồng gớm ghiếc và động đất lấp cát tàn phá diện rộng. Dính $\times 4$ sát thương từ hệ Băng! Hãy dùng đòn Ice Beam đóng băng gạt phăng đầu rồng này tức thì để giành lấy chiến thắng danh vọng tối cao!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 13: Toàn tập HMs, tiến hóa đặc thù Unova bản Pokémon Black",
    order: 13,
    language: "vi",
    content: `
      <h1>Phần 13: Toàn tập HMs, tiến hóa đặc thù Unova bản Pokémon Black</h1>
      <p>Bản tra cứu các đĩa thần kỹ HMs và phương pháp tiến hóa bộc phá vô cùng đắt giá của thế hệ 5:</p>

      <h2>1. Vị trí thu nhặt toàn bộ 6 kỹ năng ngoài dã ngoại (HMs)</h2>
      <ul>
        <li><strong>HM01 Cut (Chặt cây):</strong> Nhận từ Fennel tại Striaton City sau khi dọn sạch Dreamyard.</li>
        <li><strong>HM02 Fly (Bay lượn):</strong> Nhận từ Bianca tại Driftveil City ngay sau khi đánh bại Clay.</li>
        <li><strong>HM03 Surf (Lướt sóng):</strong> Nhận từ Alder tại Route 5 dạt dào sóng nước.</li>
        <li><strong>HM04 Strength (Đẩy đá khổng lồ):</strong> Nhận từ một NPC trong ngôi nhà phía bắc Nimbasa City.</li>
        <li><strong>HM05 Waterfall (Trượt thác vĩ đại):</strong> Nhặt tại khu phế tích hoang dã Route 18.</li>
        <li><strong>HM06 Dive (Lặn xuống lòng vịnh sâu thẳm):</strong> Nhận ngoài biệt thự của Undella Town cực quý hiếm để truy tìm kho báu Abyssal Ruins!</li>
      </ul>

      <h2>2. Các viên đá tiến hóa đặc khu Unova</h2>
      <ul>
        <li><strong>Sun Stone / Moon Stone:</strong> Dùng cho các loài bọ, hoa cỏ Sa mạc.</li>
        <li><strong>Shiny Stone / Dusk Stone / Dawn Stone:</strong> Nhặt sâu trong hang đá điện hoặc phế tích cổ đại để bộc phá sức mạnh tối thượng.</li>
      </ul>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 14: Săn lùng Thần thú Cổ đại & Hắc Long Zekrom lãng du",
    order: 14,
    language: "vi",
    content: `
      <h1>Phần 14: Săn lùng Thần thú Cổ đại & Hắc Long Zekrom lãng du</h1>
      <p>Vùng Unova cất giấu những vị thần tối cao ngủ ngàn năm bão bùng trong hoang dã dã ngoại:</p>

      <h2>1. Thần trùng mặt trời cổ đại Volcarona (Relic Castle - Level 70)</h2>
      <p>Sau khi chiến thắng League, tiến sâu vào mê cung cát lún của tháp cổ Relic Castle sâu dưới sa mạc. Ở tầng đáy sâu nhất, bạn diện kiến bọ mặt trời rực cháy tối thượng **Volcarona (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/637.png" style="max-width:32px; vertical-align:middle;" />.</p>

      <h2>2. Đoạt rồng xám vũ trụ Kyurem (Giant Chasm - Level 75)</h2>
      <p>Bơi qua mạn đông bắc Lacunosa Town tiến thẳng vào hố sụt khổng lồ hoang dã **Giant Chasm**. Tiến sâu vào tâm thung lũng tuyết phủ để chạm trán rồng tuyết băng vạn cổ siêu bạo phát **Kyurem (Level 75)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/646.png" style="max-width:32px; vertical-align:middle;" />.</p>

      <h2>3. Thu phục Hắc Long Zekrom bão lôi (Dragonspiral Tower - Level 70)</h2>
      <p>Sau cốt truyện chính, nhận đá hắc thạch **Dark Stone** từ Nacrene Museum, tiến thẳng vào tháp cổ ngàn năm mạn bắc Icirrus City - **Dragonspiral Tower**. Tại đỉnh tháp mây mù giông lốc bão bùng triệu gọi Hắc Long tối thượng **Zekrom (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/644.png" style="max-width:32px; vertical-align:middle;" /> gầm lôi!</p>

      <h2>4. Theo dấu thần bão lốc Tornadus hoang dã lãng du (Level 40)</h2>
      <p>Cơn bão di chuyển liên tục trên sa lộ! Hãy nói chuyện với bà lão ở Route 7 để kích hoạt thần bão lãng du **Tornadus (Level 40)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/641.png" style="max-width:32px; vertical-align:middle;" /> xuất hiện hoang dã dã ngoại lướt sấm chớp cuồng phong khắp Unova.</p>
    `
  },
  {
    gameVersion: "black",
    chapterTitle: "Phần 15: Tàu điện ngầm Battle Subway & Essential Competitive Items",
    order: 15,
    language: "vi",
    content: `
      <h1>Phần 15: Tàu điện ngầm Battle Subway & Essential Competitive Items</h1>
      <p>Bại trận Ghetsis mở ra đỉnh cao thách thức chuyên nghiệp tại cụm ga tàu điện ngầm thi đấu **Battle Subway** tọa lạc giữa trung tâm thành phố Nimbasa City.</p>

      <h2>1. Thống trị các toa tàu Battle Subway bộc phá</h2>
      <p>Lên toa tàu thách đấu chuỗi leo tháp nhận điểm BP đổi đồ trấn phái với các thủ lĩnh Subway Boss Emmet & Ingo:</p>
      <ul>
        <li><strong>Single Line / Double Line:</strong> Thi đấu đơn/đôi tiêu chuẩn bạo kích dã ngoại hoang dã.</li>
        <li><strong>Multi Line:</strong> Lập tổ đội thi đấu cùng Bianca hoặc Cheren leo hạng cực kỳ kịch tính.</li>
      </ul>

      <h2>2. Bản tra cứu các held items cực hạn thi đấu chuyên nghiệp Gen 5</h2>
      <p>Trang bị ngay các món held items trấn phái sau để vượt ải chuỗi leo tháp rực lửa:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(16, 185, 129, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(16, 185, 129, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px; color: #10b981;">Bảo vật Trấn phái</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Lợi thế cốt lõi thi đấu</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Cách sở hữu đặc chủng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Eviolite (Đá tiến hóa dở dang)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 50% chỉ số Phòng thủ và Phòng thủ Đặc biệt cho Pokémon chưa tiến hóa hết cỡ. Biến các quái thú như Chansey hay Doublade thành bức tường thành bất tử dã dã ngoại!</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận tại tòa nhà mạn bắc Castelia City hoặc đổi BP.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Leftovers (Đồ ăn thừa)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Hồi phục nhẹ 1/16 lượng HP tối đa sau mỗi lượt chiến đấu dã dã ngoại dã ngoại.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhặt tại hầm Village Bridge, hoặc tìm thấy hoang dã.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Choice Specs (Kính lựa chọn)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 50% chỉ số tấn công đặc biệt siêu phàm, khóa duy nhất 1 chiêu kỹ năng.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đổi bằng điểm BP chiến thắng quầy sảnh Battle Subway.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Choice Scarf (Khăn quàng lựa chọn)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 50% chỉ số Tốc độ thần sầu lướt gió dã bạo, khóa cứng 1 chiêu tấn công.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhận qua điểm thắng BP đổi sảnh đấu.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Life Orb (Bảo ngọc sinh mệnh)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 30% sức tàn sát của toàn bộ đòn đánh bất luận đặc thù, mất 10% lượng máu tối đa sau mỗi đòn trúng địch.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đổi điểm BP sảnh ga tàu điện ngầm.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Focus Sash (Đai tập trung giữ mạng)</td>
            <td style="padding: 12px 16px;">Giúp Pokémon sống dai còn đúng 1 HP trước đòn đánh knock-out chí tử từ vẹn nguyên cây máu.</td>
            <td style="padding: 12px 16px;">Đổi bằng điểm thắng BP quầy.</td>
          </tr>
        </tbody>
      </table>
    `
  }
];

export const ENGLISH_BLACK_CHAPTERS = BLACK_CHAPTERS.map(viChapter => {
  let title = "";
  let content = "";

  switch (viChapter.order) {
    case 1:
      title = "Chapter 1: A New Beginning in Nuvema Town & Gen 5 Starter Choices";
      content = `
        <h1>Chapter 1: A New Beginning in Nuvema Town & Gen 5 Starter Choices</h1>
        <p>Welcome to the majestic region of Unova in the groundbreaking Generation V - Pokémon Black! Your grand adventure begins in your cozy bedroom in Nuvema Town alongside childhood friends Cheren and Bianca.</p>

        <h2>1. Selecting Your Gen 5 Companion</h2>
        <p>A gift box from Professor Juniper allows you to choose one of three unique starter Pokémon, with a professional tactical breakdown below:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(255, 255, 255, 0.04);">
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Tactical Evaluation for Unova Campaign</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/495.png" alt="Snivy" style="max-width: 50px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Snivy</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Grass</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boasts incredible Speed and defensive attributes. Evolves into the proud Serperior. However, several Unova Gyms stand as direct typing counters, which slightly elevates the game difficulty.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/498.png" alt="Tepig" style="max-width: 50px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Tepig</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">The ideal choice for campaign optimization! Upon evolving into Emboar, it gains the dual **Fire / Fighting** typing, easily obliterating Lenora's Normal gym, Burgh's Bug gym, and Brycen's Ice gym. Bulky HP and high physical offense ensure a solid team carry.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/501.png" alt="Oshawott" style="max-width: 50px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #3b82f6;">Oshawott</td>
              <td style="padding: 12px 16px;">Water</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">The most balanced starter companion across all key statistics, evolving into the majestic Samurott with a highly versatile move pool. Exceptionally valuable against Clay's Ground gym and capable of learning both powerful physical and special moves.</td>
            </tr>
          </tbody>
        </table>

        <blockquote style="border-left: 4px solid #f59e0b; padding: 12px 16px; margin: 24px 0; background-color: rgba(245, 158, 11, 0.05); border-radius: 0 12px 12px 0;">
          <strong>Gen 5 Distinction:</strong> In Pokémon Black & White, you will face ONLY brand new Unova native wild Pokémon until the main storyline is fully completed. A completely fresh and unprecedented adventure!
        </blockquote>

        <h2>2. Departure & Encountering Team Plasma</h2>
        <p>After a chaotic starter match that wrecks your bedroom, head downstairs to receive the Town Map from your mother. Arrive at Accumula Town to witness a mysterious rally led by Ghetsis of **Team Plasma**, preaching the liberation of Pokémon.</p>
        <p>Shortly after, a strange boy named **N**, who claims to understand the hearts of Pokémon, blocks your path and challenges you to a duel!</p>
      `;
      break;

    case 2:
      title = "Chapter 2: Trio Badge at Striaton City & Precious Elemental Gifts";
      content = `
        <h1>Chapter 2: Trio Badge at Striaton City & Precious Elemental Gifts</h1>
        <p>Traverse through Route 2, battling Bianca to enter Striaton City, a peaceful town hosting a highly stylish restaurant-themed gym.</p>

        <h2>1. Obtaining the Elemental Monkeys at the Dreamyard</h2>
        <p>Prior to entering the gym, immediately make a detour to the **Dreamyard** ruins in the east. An NPC there will gift you an elemental monkey that directly counters the signature of your gym opponent:</p>
        <ul>
          <li>If you chose **Snivy**: Receive **Panpour** (Water) to counter Chili's fire monkey Pansear.</li>
          <li>If you chose **Tepig**: Receive **Pansage** (Grass) to counter Cress's water monkey Panpour.</li>
          <li>If you chose **Oshawott**: Receive **Pansear** (Fire) to counter Cilan's grass monkey Pansage.</li>
        </ul>

        <h2>2. Defeating One of the Striaton Triplets (Trio Badge)</h2>
        <p>Inside the Striaton Gym, depending on your starter selection, you will face one of the triplet brothers wielding an elemental monkey at Level 14:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(244, 63, 94, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Leader</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Signature Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left;">Winning Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/513.png" alt="Pansear" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ef4444;">Chili (Fire)</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Pansear</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 14</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Spam Water Gun using the gifted Panpour monkey to easily douse its flame.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/511.png" alt="Pansage" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Cilan (Grass)</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Pansage</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 14</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Utilize the Incinerate fire attack of the gifted Pansear to roast the grass monkey.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/515.png" alt="Panpour" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #3b82f6;">Cress (Water)</td>
              <td style="padding: 12px 16px; font-weight: bold; color: #cbd5e1;">Panpour</td>
              <td style="padding: 12px 16px;">Lvl 14</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Spam the Vine Whip grass attack of your gifted Pansage to secure a swift victory!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 3:
      title = "Chapter 3: Basic Badge at Nacrene City & Retaliation Showdown";
      content = `
        <h1>Chapter 3: Basic Badge at Nacrene City & Retaliation Showdown</h1>
        <p>After your first victory, pursue Team Plasma to retrieve Fennel's Dream Mist and receive the C-Gear. Walk along Route 3's old railroad tracks to reach Nacrene City, a historic town featuring clay structures and a massive museum.</p>

        <h2>1. Catching Fighting-type Counters</h2>
        <p>Prior to challenging Lenora's notoriously brutal Normal-type squad, head into the outer grassy path of **Pinwheel Forest**. Hunt down and capture a wild **Sawk** or **Timburr**. Their Fighting-type STAB moves are absolutely vital to shatter Lenora's heavy Normal-type defense.</p>

        <h2>2. Surviving Gym Leader Lenora (Basic Badge)</h2>
        <p>Lenora utilizes a highly devastating strategy: Putting targets to sleep with **Hypnosis** and unleashing a boosted physical blow with **Retaliate** (which deals double damage if her teammate fainted on the preceding turn):</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(148, 163, 184, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left;">Essential Battle Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/506.png" alt="Herdier" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Herdier</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 18</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Normal</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses heavy physical hurls like Take Down. Demolish swiftly with Sawk's or Timburr's Fighting moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/505.png" alt="Watchog" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Watchog (The Threat)</td>
              <td style="padding: 12px 16px;">Lvl 20</td>
              <td style="padding: 12px 16px;">Normal</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Wields sleeping **Hypnosis** and a highly hazardous **Retaliate** attack. Prevent it from setting up a fainted-boosted Retaliate blow! Swap in Sawk or Timburr and execute **Low Kick** or **Rock Smash** to instantly knock it out!</td>
            </tr>
          </tbody>
        </table>
        <p>In the middle of the badge presentation, Team Plasma steals the museum's prized Dragon Skull! Form an alliance with Burgh to pursue the thieves.</p>
      `;
      break;

    case 4:
      title = "Chapter 4: Castelia City & Gym 3 - Burgh's Insect Hive";
      content = `
        <h1>Chapter 4: Castelia City & Gym 3 - Burgh's Insect Hive</h1>
        <p>Chase the thieves deep into the forested trails of Pinwheel Forest (acquiring an evolutionary stone along the way) and cross the magnificent Skyarrow Bridge to explore the metropolis of Castelia City.</p>

        <h2>1. Exploring Castelia City's Bustling Lanes</h2>
        <ul>
          <li>Purchase a legendary Castelia Cone at the local stall to heal status conditions.</li>
          <li>Infiltrate the western alleys with Bianca to shut down a secret Team Plasma hideout, rescuing her stolen Munna.</li>
        </ul>

        <h2>2. Defeating Gym Leader Burgh (Insect Badge)</h2>
        <p>Burgh's bug squad boasts exceptional physical attributes and swift speeds:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(132, 204, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(132, 204, 22, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left;">Winning Tactics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/557.png" alt="Dwebble" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dwebble</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bug / Rock</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses Smack Down to trap flying targets. Drench it with Water-type moves (Oshawott/Dewott) or break with Sawk's physical attacks.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/543.png" alt="Whirlipede" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Whirlipede</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bug / Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Wields toxic Poison Tail. Incinerate easily with Pignite's Fire moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/542.png" alt="Leavanny" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Leavanny (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 23</td>
              <td style="padding: 12px 16px;">Bug / Grass</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">A massive mantis wielding high-power physical **Razor Leaf** and Special-reducing **Struggle Bug**. It is double-weak to Fire (4x damage)! Roast it instantly with Pignite's Flame Charge or strike with Tranquill's Flying-type maneuvers to end the battle easily!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 5:
      title = "Chapter 5: Sandstorm Desert Trails & Elesa's Shocking Thrills at Nimbasa";
      content = `
        <h1>Chapter 5: Sandstorm Desert Trails & Elesa's Shocking Thrills at Nimbasa</h1>
        <p>Trek north across the harsh, blinding bails of Route 4's desert dunes to reach the spectacular amusement center of Nimbasa City.</p>

        <h2>1. Infiltrating the Desert Resort & Relic Castle</h2>
        <p>Make sure to explore the sandy dunes of **Desert Resort** and **Relic Castle** first. Catching a wild **Sandile** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/551.png" style="max-width:24px; vertical-align:middle;" /> (Ground/Dark) or **Darumaka** (Fire) is highly recommended. Their high damage pools are perfect to secure the sweep against Nimbasa's Electric gym.</p>

        <h2>2. Defeating Gym Leader Elesa (Bolt Badge)</h2>
        <p>Elesa utilizes a highly annoying **Volt Switch** chain strategy to deal heavy damage while pivoting her team out:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(234, 179, 8, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(234, 179, 8, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(234, 179, 8, 0.3); text-align: left;">Counter Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/587.png" alt="Emolga" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Emolga x2</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 25</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Wields Flying type, making it completely immune to Ground moves! Spams **Volt Switch** to cycle. Shoot it down with Rock moves (Rock Tomb or Smack Down) from Range.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/523.png" alt="Zebstrika" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Zebstrika (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 27</td>
              <td style="padding: 12px 16px;">Electric</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Highly fast horse wielding **Spark** and **Flame Charge**. Swap in Sandile or any Ground type and execute **Dig** or **Mud-Slap** to instantly bury this zebra in the dust!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 6:
      title = "Chapter 6: Navigating Driftveil City & Clay's Excavated Vault";
      content = `
        <h1>Chapter 6: Navigating Driftveil City & Clay's Excavated Vault</h1>
        <p>Cross the massive, windy Driftveil Drawbridge to enter the busy harbor of Driftveil City.</p>

        <h2>1. Clearing the Team Plasma Hideout</h2>
        <p>Before Clay accepts your challenge, you must locate and clear out the Team Plasma hideout situated deep inside the freezing **Cold Storage** hangar in the south. Use Fire-type moves to easily melt through their defenses.</p>

        <h2>2. Defeating Gym Leader Clay (Quake Badge)</h2>
        <p>Clay is a hardened Ground-type leader wielding extremely heavy STAB physical attacks:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(249, 115, 22, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left;">Winning Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/536.png" alt="Palpitoad" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Palpitoad</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Ground</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Completely immune to Electric! However, it takes 4x damage from Grass. Slap it down instantly with a Grass move like Razor Leaf.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/552.png" alt="Krokorok" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Krokorok</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ground / Dark</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses heavy trapping moves. Wash it out with Water-type moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/530.png" alt="Excadrill" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Excadrill (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 31</td>
              <td style="padding: 12px 16px;">Ground / Steel</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Highly aggressive physical hitter utilizing **Rock Slide** and **Slash**. Although it holds numerous resistances, it is weak to Water, Fire, and Fighting. Wash it out with Samurott's Surf or melt it down using Emboar's STAB fire attacks!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 7:
      title = "Chapter 7: Conquering the Skies at Mistralton & Skyla's Flying Fleet";
      content = `
        <h1>Chapter 7: Conquering the Skies at Mistralton & Skyla's Flying Fleet</h1>
        <p>Traverse through Route 6's foggy, high-grass trails (catching electric jolt bugs along the way) to reach the airport-themed Mistralton City.</p>

        <h2>1. Climbing the Celestial Tower</h2>
        <p>Travel north to the sacred **Celestial Tower**. Ascend to the top floor to ring the bell of spirits, where you will meet Flying-type leader Skyla who clears your path to challenge her local airport gym.</p>

        <h2>2. Defeating Gym Leader Skyla (Jet Badge)</h2>
        <p>The Mistralton Gym features high-velocity cannons that launch your character across the arena. Align them properly to challenge Skyla:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(14, 165, 233, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(14, 165, 233, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(14, 165, 233, 0.3); text-align: left;">Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/528.png" alt="Swoobat" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Swoobat</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 33</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Extremely fast bat. Shoot it down using Rock-type or Dark-type moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/558.png" alt="Crustle" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Unfezant</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 33</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Normal / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Spams physical Air Slash. Zap with Electric attacks to knock it out.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/581.png" alt="Swanna" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Swanna (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 35</td>
              <td style="padding: 12px 16px;">Water / Flying</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Wields powerful STAB **Bubble Beam** and **Feather Dance** to decrease your Attack. However, this swan takes 4x fatal damage from Electric moves! Use a single Thunderbolt or Spark from Zebstrika or Galvantula to roast this bird instantly!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 8:
      title = "Chapter 8: Traversing Twist Mountain & Brycen's Glacier Wall at Icirrus";
      content = `
        <h1>Chapter 8: Traversing Twist Mountain & Brycen's Glacier Wall at Icirrus</h1>
        <p>After acquiring Fly, cross the rocky pathways of Twist Mountain to reach the frozen swamps of Icirrus City.</p>

        <h2>1. Dynamic Seasonal Environments</h2>
        <p>Unova introduced an innovative seasonal cycle changing every month! During Winter, the swamps surrounding Icirrus City freeze solid, opening previously inaccessible paths leading to rare items and evolutionary stones.</p>

        <h2>2. Shattering Brycen's Wall of Ice (Freeze Badge)</h2>
        <p>Brycen is an expert Ice-type leader, utilizing highly defensive, solid ice walls:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(6, 182, 212, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left;">Melting Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/582.png" alt="Vanillish" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Vanillish</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 37</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ice</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Highly armored ice cone. Melt it down using Emboar's Fire moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/615.png" alt="Cryogonal" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Cryogonal</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 37</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ice</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boasts extreme Special Defense but has fragile physical defense. Shatter it using heavy physical hits.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/614.png" alt="Beartic" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Beartic (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 39</td>
              <td style="padding: 12px 16px;">Ice</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">A massive ice bear wielding physical **Icicle Crash** and **Slash**. Melt its icy fur down using Emboar's fire attacks or execute Sawk's heavy Fighting moves to shatter its stance completely!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 9:
      title = "Chapter 9: The Futuristic Opelucid City & Drayden's Dragon Domain";
      content = `
        <h1>Chapter 9: The Futuristic Opelucid City & Drayden's Dragon Domain</h1>
        <p>Cross the high-speed Tubeline Bridge to enter the magnificent, futuristic metropolis of Opelucid City (in Pokémon Black, Opelucid features a highly advanced, cybernetic design reflecting scientific progress!).</p>

        <h2>1. The Cybernetic Unova Aesthetic</h2>
        <p>Unlike White's ancient design, Black's Opelucid is the peak of cybernetic future, matching Reshiram's theme of progression. Here, the ruling Dragon-type gym leader is the patriarch **Drayden**.</p>

        <h2>2. Conquering Gym Leader Drayden (Legend Badge)</h2>
        <p>Drayden wields an ancient Dragon squad specializing in massive physical attack stats:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(99, 102, 241, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left;">Counter Tactics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/611.png" alt="Fraxure" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Fraxure</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Wields fast Dragon Claw. Knock it out with Ice moves before it stacks up Dragon Dance.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/621.png" alt="Druddigon" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Druddigon</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Holds Rough Skin, penalizing physical contacts. Wields heavy Revenge. Defeat from range using Ice attacks.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/612.png" alt="Haxorus" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Haxorus (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 43</td>
              <td style="padding: 12px 16px;">Dragon</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Possesses world-class physical Attack with dual blade-like tusks. Wields **Slash** and **Dragon Tail**. Counter by landing a fast STAB Dragon-type move or freeze it solid with massive Ice Beam blows!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 10:
      title = "Chapter 10: The Elite Four & The Raising of N's Castle";
      content = `
        <h1>Chapter 10: The Elite Four & The Raising of N's Castle</h1>
        <p>With all 8 badges secured, cross the steep Route 10 trails to challenge the highest battlefield: the Unova Pokémon League.</p>

        <h2>1. Battling the Unova Elite Four</h2>
        <p>Unova lets you challenge the Elite Four in any order you choose:</p>
        <ul>
          <li><strong>Shauntal (Ghost):</strong> Strike down Coagrigus and Chandelure with fast Ghost or Dark moves.</li>
          <li><strong>Grimsley (Dark):</strong> Use physical Fighting attacks (Sawk/Emboar) to shatter Bisharp and Krookodile.</li>
          <li><strong>Caitlin (Psychic):</strong> Pierce her low physical defenses using STAB Dark-type attacks.</li>
          <li><strong>Marshal (Fighting):</strong> Strike from range using Psychic or Flying types.</li>
        </ul>

        <h2>2. The Summoning of N's Castle</h2>
        <p>Right as you prepare to battle Champion Alder, N overrides the arena! Suddenly, the massive cyber-classic **N's Castle** rises from the ground, wrapping around the League in one of the most cinematic sequences in series history!</p>
        <p>Step inside N's Castle to confront the ultimate fate of Unova.</p>
      `;
      break;

    case 11:
      title = "Chapter 11: The Ultimate Showdown - Awakening Reshiram & Defeating Ghetsis";
      content = `
        <h1>Chapter 11: The Ultimate Showdown - Awakening Reshiram & Defeating Ghetsis</h1>
        <p>The legendary climax of Pokémon Black, mandating the awakening of the dragon of truth!</p>

        <h2>1. Awakening & Catching White Dragon Reshiram (Level 50)</h2>
        <p>Ascend to N's Castle summit, where your **Light Stone** begins to glow, summoning the majestic white flame guardian **Reshiram (Level 50)** in a legendary dragon scene!</p>
        <div style="text-align: center; margin: 24px 0;">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/643.png" alt="Reshiram" style="max-width: 120px;" />
          <p style="font-style: italic; color: #ef4444; margin-top: 8px;">The white dragon Reshiram appearing in a blazing flame vortex!</p>
        </div>
        <blockquote style="border-left: 4px solid #ef4444; padding: 12px 16px; margin: 24px 0; background-color: rgba(239, 68, 68, 0.05); border-radius: 0 12px 12px 0;">
          <strong>Capture Guide:</strong> Reshiram challenges you at Level 50, wielding its unique **Blue Flare** attack. Churn its health down using Ground/Dragon moves and secure the capture with a Quick Ball or Ultra Ball to immediately enlist it!
        </blockquote>

        <h2>2. Defeating N & Silencing Ghetsis to Save Unova</h2>
        <p>With Reshiram captured, immediately battle **N** who wields Zekrom (Level 52) in an epic clash of legendary dragons. Right after N's defeat, the true villain **Ghetsis** steps out to silence you with his highly brutal team:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(220, 38, 38, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(220, 38, 38, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: left;">Moves</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(220, 38, 38, 0.3); text-align: left;">Defeat Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/635.png" alt="Hydreigon" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ef4444;">Hydreigon (The Destroyer)</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ef4444;">Lvl 54</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon Pulse, Surf, Focus Blast</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">One of the most notoriously powerful bosses in franchise history! It wields counters for almost all types. Use heavy STAB physical Fighting attacks or massive Dragon attacks from Reshiram to finally shatter this hydra and save Unova!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 12:
      title = "Chapter 12: Post-Game Unova - Eastern Trails & Defeating Cynthia";
      content = `
        <h1>Chapter 12: Post-Game Unova - Eastern Trails & Defeating Cynthia</h1>
        <p>Defeating Ghetsis unlocks access to the eastern half of Unova, featuring high-level wild Pokémon from previous generations!</p>

        <h2>1. Exploring Eastern Unova</h2>
        <ul>
          <li>Travel to Undella Town, diving into the Abyssal Ruins to find ancient crowns and gold blocks.</li>
          <li>Cross the beautiful stone archways of Village Bridge and the quiet town of Lacunosa.</li>
        </ul>

        <h2>2. Defeating Sinnoh Champion Cynthia at Undella Villa</h2>
        <p>During Spring or Summer, Cynthia visits the Undella Villa, welcoming a match with her Level 75 squad:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(168, 85, 247, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left;">Winning Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png" alt="Garchomp" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Garchomp (Signature)</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Lvl 77</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon / Ground</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Spams rapid Outrage and Earthquake. Slap it with 4x effective Ice Beam attacks to secure your legendary victory!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 13:
      title = "Chapter 13: Complete HMs & Special Evolutionary Methods in Black";
      content = `
        <h1>Chapter 13: Complete HMs & Special Evolutionary Methods in Black</h1>
        <p>A reference guide for HMs and evolutionary keys inside Unova:</p>

        <h2>1. Locations for all 6 Hidden Machines (HMs)</h2>
        <ul>
          <li><strong>HM01 Cut:</strong> Received from Fennel at Striaton City after clearing the Dreamyard.</li>
          <li><strong>HM02 Fly:</strong> Gifted by Bianca at Driftveil City after defeating Clay.</li>
          <li><strong>HM03 Surf:</strong> Received from Alder on Route 5.</li>
          <li><strong>HM04 Strength:</strong> Received from an NPC inside the northern Nimbasa City apartments.</li>
          <li><strong>HM05 Whirlpool:</strong> Located in Route 18.</li>
          <li><strong>HM06 Dive:</strong> Gifted outside the Undella Town Villa, vital to explore the Abyssal Ruins.</li>
        </ul>

        <h2>2. Unova Evolutionary Stones</h2>
        <ul>
          <li><strong>Sun / Moon Stone:</strong> Primarily used for Desert/Forest plants.</li>
          <li><strong>Dusk / Dawn / Shiny Stone:</strong> Located in Chargestone Cave and ruins to unlock final evolutions.</li>
        </ul>
      `;
      break;

    case 14:
      title = "Chapter 14: Capturing Ancient Guardians & Dark Dragon Zekrom";
      content = `
        <h1>Chapter 14: Capturing Ancient Guardians & Dark Dragon Zekrom</h1>
        <p>Unova hides several sleeping mythical gods across its diverse terrain:</p>

        <h2>1. Ancient Sun Deity Volcarona (Relic Castle - Level 70)</h2>
        <p>In the post-game, dive into the deep ruins of Relic Castle. At the bottom floor, challenge the blazing sun moth **Volcarona (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/637.png" style="max-width:32px; vertical-align:middle;" />.</p>

        <h2>2. Demonic Ice Dragon Kyurem (Giant Chasm - Level 75)</h2>
        <p>Surf past Lacunosa trails to reach the snowy craters of **Giant Chasm**. Meet the legendary cold dragon **Kyurem (Level 75)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/646.png" style="max-width:32px; vertical-align:middle;" />.</p>

        <h2>3. Storm Dragon Zekrom (Dragonspiral Tower - Level 70)</h2>
        <p>With the **Dark Stone** received from Nacrene Museum, enter the ancient **Dragonspiral Tower** in the north of Icirrus City to summon **Zekrom (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/644.png" style="max-width:32px; vertical-align:middle;" />.</p>

        <h2>4. Roaming Tornadus (Route 7 - Level 40)</h2>
        <p>Talk to the Route 7 grandmother to trigger the stormy cloud beast **Tornadus (Level 40)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/641.png" style="max-width:32px; vertical-align:middle;" /> to roam across Unova.</p>
      `;
      break;

    case 15:
      title = "Chapter 15: Battle Subway & Elite Competitive Held Items";
      content = `
        <h1>Chapter 15: Battle Subway & Elite Competitive Held Items</h1>
        <p>Defeating Ghetsis unlocks the ultimate train-based battle colosseum: the **Battle Subway** at Nimbasa City.</p>

        <h2>1. Dominating the Battle Subway Trains</h2>
        <p>Conquer consecutive tracks to earn Battle Points (BP) from Subway Bosses Ingo & Emmet:</p>
        <ul>
          <li><strong>Single / Double Line:</strong> Standard competitive lines.</li>
          <li><strong>Multi Line:</strong> Partner with Bianca or Cheren to conquer the rails.</li>
        </ul>

        <h2>2. Pro Gen 5 Held Items Reference</h2>
        <p>Equip your team with these ultimate competitive items:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(16, 185, 129, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(16, 185, 129, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; width: 180px; color: #10b981;">Held Item</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Combat Advantage</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); text-align: left; color: #10b981;">Acquisition Method</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Eviolite</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boosts Defense and Special Defense stats by 50% for any Pokémon that is still capable of evolving. Excellent on Chansey!</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Found in Castelia City high-rise apartments, or purchased with BP.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Leftovers</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Restores 1/16th maximum HP at the end of each turn.</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Located on Village Bridge or held by wild Snorlax.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Choice Specs</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boosts Special Attack stat by 50% but restricts usage to a single move.</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Purchase with BP at the Battle Subway exchange.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Choice Scarf</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boosts Speed stat by 50% but restricts usage to a single selected move.</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Purchase with BP at the exchange.</td>
            </tr>
          </tbody>
        </table>
      `;
      break;
  }

  return {
    gameVersion: "black",
    chapterTitle: title,
    order: viChapter.order,
    language: "en",
    content: content
  };
});
