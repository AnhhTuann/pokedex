export const HEARTGOLD_CHAPTERS = [
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 1: Hành trình bắt đầu tại New Bark Town",
    order: 1,
    language: "vi",
    content: `
      <h1>Phần 1: Hành trình bắt đầu tại New Bark Town</h1>
      <p>Chào mừng bạn đến với vùng đất Johto trù phú trong phiên bản làm lại đỉnh cao thế hệ 4 - Pokémon HeartGold! Cuộc phiêu lưu huyền thoại của bạn sẽ bắt đầu tại Thị trấn New Bark yên bình.</p>

      <h2>1. Chọn lựa Pokémon Khởi đầu (Starter)</h2>
      <p>Giáo sư Elm sẽ cho bạn lựa chọn một trong ba người bạn đồng hành với những đánh giá chiến thuật cực kỳ quan trọng cho thế hệ 4:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(255, 255, 255, 0.04);">
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Đánh giá chiến thuật Gen 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png" alt="Chikorita" style="max-width: 50px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Chikorita</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ (Grass)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Thiên về phòng thủ và hồi phục. Cực kỳ thử thách vì hầu hết các phòng Gym ở Johto đều khắc chế cứng hệ Cỏ (Falkner Bay, Bugsy Trùng, Whitney Thường, Morty Ma, Jasmine Thép, Pryce Băng, Clair Rồng).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png" alt="Cyndaquil" style="max-width: 50px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Cyndaquil</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa (Fire)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Lựa chọn tốt nhất để đi cốt truyện nhanh! Sở hữu chỉ số Tấn công Đặc biệt và Tốc độ rất tốt, dễ dàng thiêu rụi các phòng Gym hệ Trùng, Thép và Băng của vùng Johto.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png" alt="Totodile" style="max-width: 50px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #3b82f6;">Totodile</td>
            <td style="padding: 12px 16px;">Nước (Water)</td>
            <td style="padding: 12px 16px; color: #cbd5e1;"><strong>Hưởng lợi lớn từ phân tách Vật Lý/Đặc Biệt thế hệ 4!</strong> Giờ đây các đòn hệ Thủy và bóng tối (như Waterfall, Aqua Tail, Crunch) đều là đòn Vật Lý, kết hợp hoàn hảo với chỉ số Tấn công Vật lý khủng khiếp của nó để biến thành quái vật gánh đội cực mạnh.</td>
          </tr>
        </tbody>
      </table>

      <blockquote style="border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 24px 0; background-color: rgba(59, 130, 246, 0.05); border-radius: 0 12px 12px 0;">
        <strong>Mẹo eSports:</strong> Trong HeartGold, Pokémon đi đầu sẽ luôn đi theo sau bạn trên bản đồ dã ngoại! Hãy thường xuyên tương tác với chúng để tăng độ thân mật và nhận những phụ kiện dễ thương nhé.
      </blockquote>

      <h2>2. Nhiệm vụ đầu tiên & Chạm trán Đối thủ tóc đỏ</h2>
      <p>Lên đường đi về hướng bắc qua Route 30 tới nhà Mr. Pokémon để nhận lấy quả trứng kì bí <strong>Mystery Egg</strong> và chiếc Pokédex thế hệ mới từ Giáo sư Oak. Trên đường quay về, bạn sẽ bị chặn đánh tại Oldale Town bởi một tên trộm tóc đỏ bí ẩn (Silver) vừa đánh cắp Starter khắc hệ của bạn!</p>
      <p>Sau khi hạ gục hắn, hãy trở về báo cáo cảnh sát và đặt tên cho đối thủ của mình.</p>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 2: Huy hiệu Zephyr Badge tại Violet City",
    order: 2,
    language: "vi",
    content: `
      <h1>Phần 2: Huy hiệu Zephyr Badge tại Violet City</h1>
      <p>Băng qua Route 30 và 31, thu phục chú cừu điện <strong>Mareep</strong> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/179.png" style="max-width:24px; vertical-align:middle;" /> (vô cùng hữu ích) để tiến về thành phố cổ kính Violet City.</p>

      <h2>1. Chinh phục Tháp Sprout Tower</h2>
      <p>Đột nhập tháp cổ Sprout Tower, đánh bại các nhà sư hệ Cỏ dũng mãnh. Hạ gục Sư trưởng Elder Li trên tầng đỉnh để nhận đĩa kỹ năng phát sáng <strong>TM70 Flash</strong> (trong thế hệ 4, Flash đã được chuyển thành TM thay vì HM!).</p>

      <h2>2. Đánh bại Thủ lĩnh Falkner (Zephyr Badge)</h2>
      <p>Falkner sở hữu đội hình hệ Bay cực kỳ khó chịu nhờ chiêu thức hồi máu thế hệ mới <strong>Roost</strong>:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(56, 189, 248, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: center; width: 100px; color: #38bdf8;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left; color: #38bdf8;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left; color: #38bdf8;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left; color: #38bdf8;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left; color: #38bdf8;">Chiêu thức & Cách khắc chế</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png" alt="Pidgey" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Pidgey</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 9</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sử dụng Tackle và Sand Attack. Hãy dùng đòn sấm giật điện của Mareep hoặc ném đá của Geodude để hạ gục lẹ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png" alt="Pidgeotto" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Pidgeotto (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 13</td>
            <td style="padding: 12px 16px;">Thường / Bay</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Mang chiêu **Roost** hồi 50% máu và tạm thời mất hệ Bay trong lượt đó, kết hợp **Gust** cực rát. Hãy dùng Geodude (bắt tại Union Cave) dùng chiêu Rock Throw để khóa chặt con chim bão này dứt điểm!</td>
          </tr>
        </tbody>
      </table>

      <blockquote style="border-left: 4px solid #ef4444; padding: 12px 16px; margin: 24px 0; background-color: rgba(239, 68, 68, 0.05); border-radius: 0 12px 12px 0;">
        <strong>Mẹo eSports:</strong> Bạn có thể đổi một chú Bellsprout lấy chú **Onix** vô cùng cứng cáp từ một NPC trong ngôi nhà tại Violet City. Onix miễn nhiễm hoàn toàn với các đòn hệ Bay và đè bẹp Falkner cực dễ dàng.
      </blockquote>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 3: Giếng Slowpoke & Huy hiệu Hive Badge tại Azalea Town",
    order: 3,
    language: "vi",
    content: `
      <h1>Phần 3: Giếng Slowpoke & Huy hiệu Hive Badge tại Azalea Town</h1>
      <p>Sau khi nhận quả trứng bí ẩn nở ra Togepi, vượt qua hang Union Cave tiến thẳng về Thị trấn Azalea nổi tiếng với Kurt - nghệ nhân chế bóng Apricorn cổ truyền.</p>

      <h2>1. Đột kích Slowpoke Well tiêu diệt Team Rocket</h2>
      <p>Tàn dư Team Rocket đã trỗi dậy bắt cóc Slowpoke để cắt đuôi bán kiếm lời! Sát cánh cùng Kurt đột nhập **Slowpoke Well**, dọn sạch lính Rocket và đánh bại chỉ huy Proton để cứu giải các chú Slowpoke tội nghiệp.</p>

      <h2>2. Đánh bại Thủ lĩnh Bugsy (Hive Badge)</h2>
      <p>Bugsy đã được nâng cấp đáng kể trong thế hệ 4 với chú bọ ngựa Scyther sở hữu đòn đánh rút lui đầy chiến thuật **U-turn**:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(132, 204, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(132, 204, 22, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: center; width: 100px; color: #a3e635;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left; color: #a3e635;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left; color: #a3e635;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left; color: #a3e635;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left; color: #a3e635;">Chiêu thức & Khắc chế</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png" alt="Metapod" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Metapod</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 15</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Trùng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Chỉ dùng chiêu Harden tăng giáp. Tiêu diệt dễ dàng để rèn thể lực.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png" alt="Kakuna" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Kakuna</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 15</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Trùng / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Chỉ biết Harden và Poison Sting khá yếu. Sấy khô bằng đòn hệ Lửa rực cháy.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png" alt="Scyther" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #facc15;">Scyther (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 17</td>
            <td style="padding: 12px 16px;">Trùng / Bay</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Sở hữu đòn đánh **U-turn** đấm đau rồi lướt lui đổi đồng đội, kết hợp **Quick Attack** cực nhanh. Hãy dùng đòn phun lửa của Quilava hoặc chiêu Rock Throw của Geodude (gây gấp 4 sát thương) để đập bẹp bọ ngựa tức thì!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 4: Goldenrod City & Trận chiến bò sữa 'Cực hạn Rollout'",
    order: 4,
    language: "vi",
    content: `
      <h1>Phần 4: Goldenrod City & Trận chiến bò sữa 'Cực hạn Rollout'</h1>
      <p>Băng qua Rừng Ilex Forest (giải câu đố bắt vịt Farfetch'd để nhận chiêu phát quang <strong>HM01 Cut</strong>) để đặt chân tới đại đô thị sầm uất nhất Johto: Goldenrod City.</p>

      <h2>1. Các dịch vụ cao cấp tại siêu đô thị</h2>
      <ul>
        <li>Ghé thăm cửa hàng xe đạp nhận miễn phí chiếc <strong>Bicycle</strong> tăng tốc dã ngoại cực đỉnh.</li>
        <li>Tiến về Goldenrod Radio Tower nhận thẻ Radio Card trả lời câu đố nhận quà.</li>
      </ul>

      <h2>2. Thách đấu Whitney - Cơn ác mộng Miltank thế hệ 4</h2>
      <p>Whitney trong thế hệ 4 thậm chí còn tàn bạo hơn bản gốc nhờ nội tại ẩn **Scrappy** giúp bò sữa Miltank đấm trúng cả hệ Ma (Gastly) bằng các đòn hệ Thường!</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(244, 63, 94, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: center; width: 100px; color: #fb7185;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left; color: #fb7185;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left; color: #fb7185;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left; color: #fb7185;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left; color: #fb7185;">Chiến thuật triệt hạ tối ưu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png" alt="Clefairy" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Clefairy</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 17</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thường</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Biết lắc ngón tay **Metronome** ra chiêu quái dị và **Double Slap**. Hãy hạ gục nhanh bằng đòn tấn công vật lý mạnh mẽ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/241.png" alt="Miltank" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Miltank (Quái vật Rollout)</td>
            <td style="padding: 12px 16px;">Lvl 19</td>
            <td style="padding: 12px 16px;">Thường</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Sở hữu **Stomp** gây choáng rát, **Attract** mê hoặc, và **Rollout** tăng tiến sát thương. Nhờ nội tại **Scrappy**, nó có thể giẫm nát Gastly! Hãy bắt một chú Drowzee tại Route 34, mang lên tầng 5 siêu thị đổi lấy chú **Machop** (cái) để dùng Low Kick đạp vỡ nát con bò sữa này trong nháy mắt!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 5: Ecruteak City & Bóng ma bóng đêm Gengar trỗi dậy",
    order: 5,
    language: "vi",
    content: `
      <h1>Phần 5: Ecruteak City & Bóng ma bóng đêm Gengar trỗi dậy</h1>
      <p>Hành trình tiến về thành phố cổ kính Ecruteak City - cái nôi văn hóa lưu giữ truyền thuyết về thần điểu Ho-Oh cứu thế.</p>

      <h2>1. Tháp sụp đổ Burned Tower & Giải phóng Bộ Ba Chó Thần</h2>
      <p>Xâm nhập tháp cổ nát Burned Tower thách đấu Rival và gặp gỡ học giả Eusine. Tiến sâu xuống hầm tháp, bạn sẽ đánh thức và giải phóng bộ ba chó huyền thoại: Raikou, Entei, và Suicune lướt bay dã ngoại hoang dã.</p>
      <p>Sau đó, ghé rạp kịch múa lượn, đánh bại liên tục 5 cô gái Kimono để nhận tuyệt kỹ lướt nước vô địch <strong>HM03 Surf</strong>.</p>

      <h2>2. Hạ gục Thủ lĩnh Morty (Fog Badge)</h2>
      <p>Morty hệ Ma quái trong Gen 4 cực kỳ đáng sợ vì đòn tủ **Shadow Ball** giờ đây đã được chuyển sang dạng kỹ năng Đặc Biệt, kết hợp với chỉ số Tấn công Đặc biệt siêu phàm của Gengar để thổi bay toàn đội bạn:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(139, 92, 246, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: center; width: 100px; color: #a78bfa;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: left; color: #a78bfa;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: left; color: #a78bfa;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: left; color: #a78bfa;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: left; color: #a78bfa;">Mẹo triệt tiêu đề xuất</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" alt="Gastly" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Gastly</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ma / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Chơi đòn phá giáp Spite và Mean Look. Kadabra dùng đòn hệ Tâm Linh (Psybeam) bắn nát lẹ làng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" alt="Haunter" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Haunter</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ma / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Thích dùng Hypnosis ru ngủ rồi Shadow Ball. Đè bẹp nhanh bằng đòn siêu năng lực.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" alt="Haunter" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Haunter</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 23</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ma / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Biết Curse tàn sát HP. Hãy thanh trừng bằng đòn hệ Tâm Linh hoặc đòn hệ Bóng Tối dứt điểm.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Gengar (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 25</td>
            <td style="padding: 12px 16px;">Ma / Độc</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Sở hữu **Shadow Ball** bạo phát, **Mean Look** giam cầm và **Hypnosis** + **Dream Eater** hút cạn HP! Sử dụng các Pokémon hệ Thường (miễn nhiễm đòn Ma) mang chiêu hệ Bóng Tối (như Raticate dùng Crunch/Bite) để cắn nát bóng đêm Morty!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 6: Ngọn hải đăng Olivine & Sóng gió biển cả Cianwood City",
    order: 6,
    language: "vi",
    content: `
      <h1>Phần 6: Ngọn hải đăng Olivine & Sóng gió biển cả Cianwood City</h1>
      <p>Tiến về thành phố cảng Olivine City xinh đẹp, kéo Jasmine ra khỏi ngọn hải đăng cứu chữa chú Pokémon ngọc sáng Amphy đang đổ bệnh nặng.</p>

      <h2>1. Vượt biển tìm thuốc cứu chữa thần dược</h2>
      <p>Sử dụng chiêu Surf vượt tuyến đại dương cuồn cuộn Route 40 và 41 để tới hòn đảo biệt lập Cianwood City. Ghé tiệm thuốc lấy lọ thuốc <strong>SecretPotion</strong> đặc trị.</p>

      <h2>2. Đoạt lấy Huy hiệu Storm Badge của Chuck</h2>
      <p>Chuck là đấu sĩ lực lưỡng hệ Giác đấu với những đòn đánh lực tay siêu nặng cân:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(249, 115, 22, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: center; width: 100px; color: #f97316;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #f97316;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #f97316;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #f97316;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #f97316;">Cách đối phó tối ưu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png" alt="Primeape" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Primeape</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giác đấu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Thích chơi đòn Rock Slide và Double Team phân thân né tránh. Tận dụng Kadabra dùng Psybeam bắn gục lẹ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png" alt="Poliwrath" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Poliwrath (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 31</td>
            <td style="padding: 12px 16px;">Thủy / Giác đấu</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Sở hữu **Focus Punch** lực tay siêu khủng, kết hợp **Hypnosis** gây ngủ và **Body Slam** gây tê liệt. Sử dụng Ampharos giật điện lôi đình hoặc Pidgeot gạt sập từ trên không trung!</td>
          </tr>
        </tbody>
      </table>
      <p>Đoạt huy hiệu vinh dự, bước ra khỏi cửa gặp vợ Chuck để được trao ban chiếc máy bay lượn thần tốc <strong>HM02 Fly</strong> giúp bạn di chuyển cực kỳ nhanh chóng trên toàn cõi Johto!</p>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 7: Huy hiệu Mineral Badge bọc thép & Hồ Phẫn Nộ",
    order: 7,
    language: "vi",
    content: `
      <h1>Phần 7: Huy hiệu Mineral Badge bọc thép & Hồ Phẫn Nộ</h1>
      <p>Quay trở về Olivine City bằng Fly, giao thần dược SecretPotion cứu Amphy để triệu Jasmine trở về phòng Gym Thép dũng dũng mãnh.</p>

      <h2>1. Đập vỡ bọc thép khổng lồ Jasmine (Mineral Badge)</h2>
      <p>Jasmine sở hữu bức tường thành thép bất hoại Steelix cực cứng với chỉ số phòng thủ vật lý khổng lồ:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(148, 163, 184, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: center; width: 100px; color: #cbd5e1;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left; color: #cbd5e1;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left; color: #cbd5e1;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left; color: #cbd5e1;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left; color: #cbd5e1;">Đề xuất khắc tinh hiệu quả</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png" alt="Magnemite" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Magnemite</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện / Thép</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Dùng đòn hệ Đất ($\times 4$ sát thương) hoặc dùng lửa của Quilava nướng giòn rụm lẹ làng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png" alt="Magnemite" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Magnemite</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Điện / Thép</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tương tự, dập nát bằng đòn Đất/Lửa trước khi nó phóng điện.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/208.png" alt="Steelix" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Steelix (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 35</td>
            <td style="padding: 12px 16px;">Đất / Thép</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Khổng lồ bọc thép mang đòn Sandstorm bão cát và Iron Tail hủy diệt vật lý. Tuyệt đối không dùng đòn vật lý cận chiến! Hãy dùng Surf hệ Thủy dội nước dìm ngập hoặc Flamethrower hệ Lửa thiêu cháy từ xa để đè bẹp nó!</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Giải phóng Hồ Phẫn Nộ & Thu phục Red Gyarados vinh quang</h2>
      <p>Hành trình lên phía bắc Mahogany Town tiến vào **Lake of Rage**. Vượt mặt sóng nước, đối đầu thách thức và thu phục quái rồng đỏ cực hiếm huyền thoại **Red Gyarados (Shiny, Level 30)**!</p>
      <div style="text-align: center; margin: 24px 0;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/130.png" alt="Red Gyarados" style="max-width: 100px;" />
        <p style="font-style: italic; color: #ef4444; margin-top: 8px;">Ác Long Red Gyarados - Pokémon Shiny huyền thoại vùng Johto!</p>
      </div>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 8: Sát cánh cùng Lance phá đài Rocket & Cụ già Pryce",
    order: 8,
    language: "vi",
    content: `
      <h1>Phần 8: Sát cánh cùng Lance phá đài Rocket & Cụ già Pryce</h1>
      <p>Sau khi bắt quái rồng Gyarados, gặp gỡ Nhà Vô Địch Lance tài hoa để lên kế hoạch đột kích sào huyệt hắc ám của Team Rocket tại Mahogany Town.</p>

      <h2>1. Đột kích Sào huyệt và phá hủy đài phát sóng Electrode</h2>
      <p>Khám phá hang ổ công nghệ cao, đánh bại các chỉ huy Rocket và dập tắt 3 chú Electrode cung cấp năng lượng phát sóng vô tuyến cưỡng bức. Lance cảm kích trao ban cho bạn tuyệt kỹ đi biển nước xoáy <strong>HM05 Whirlpool</strong>.</p>

      <h2>2. Hạ gục Cụ già điềm tĩnh Pryce (Glacier Badge)</h2>
      <p>Pryce trong HeartGold có cấp độ cao hơn hẳn bản gốc (Lvl 30-34), sở hữu những đòn băng tuyết siêu rát dũng mãnh:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(6, 182, 212, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: center; width: 100px; color: #22d3ee;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left; color: #22d3ee;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left; color: #22d3ee;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left; color: #22d3ee;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left; color: #22d3ee;">Chiến thuật triệt tiêu khuyên dùng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png" alt="Seel" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Seel</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Dùng đòn giật điện sấm sét của Ampharos để dẹp chú hải cẩu bé này siêu nhanh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png" alt="Dewgong" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dewgong</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 32</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nước / Băng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Giật sấm sét lôi đình hệ Điện của Ampharos gặt đứt đuôi cực kì nhanh chóng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/221.png" alt="Piloswine" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Piloswine (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 34</td>
            <td style="padding: 12px 16px;">Băng / Đất</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Miễn nhiễm hoàn toàn hệ Điện nhờ dòng máu hệ Đất lai! Sở hữu đòn **Mud Bomb** bạo liệt và **Blizzard** khốc liệt. Hãy lướt sóng **Surf** dội nước ngập bờ hoặc phun lửa rực rỡ để thiêu rụi lông tuyết của heo lòi này tức thì!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 9: Giải phóng Goldenrod Radio Tower & Tuyệt kỹ Long Tộc của Clair",
    order: 9,
    language: "vi",
    content: `
      <h1>Phần 9: Giải phóng Goldenrod Radio Tower & Tuyệt kỹ Long Tộc của Clair</h1>
      <p>Sự hỗn loạn lên đỉnh điểm khi Team Rocket nổ súng tổng lực chiếm đóng Đài phát thanh Goldenrod hòng gọi tên trùm tối cao Giovanni quay về lãnh đạo!</p>

      <h2>1. Trận chiến quyết tử giải phóng Goldenrod Radio Tower</h2>
      <p>Càn quét toàn bộ tháp, giả dạng cải trang lính Rocket rồi dập tắt âm mưu của các Executive cấp cao (Proton, Petrel, Ariana, Archer). Giải cứu Giám đốc đài phát thanh để được ban tặng thần vật linh thiêng: <strong>Rainbow Wing</strong> (vật phẩm triệu gọi chim thần Ho-Oh).</p>

      <h2>2. Thách đấu Clair hệ Long Tộc siêu bạo liệt</h2>
      <p>Vượt qua con đường Băng tuyết Ice Path trơn tuột nguy hiểm (nhặt tuyệt kỹ trượt thác nước vĩ đại <strong>HM07 Waterfall</strong>) để tiến về Blackthorn City thách đấu Clair hệ Rồng cực mạnh:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(99, 102, 241, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: center; width: 100px; color: #818cf8;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left; color: #818cf8;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left; color: #818cf8;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left; color: #818cf8;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left; color: #818cf8;">Chiến thuật dập tắt tối ưu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" alt="Gyarados" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Gyarados</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 38</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thủy / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sở hữu Dragon Rage cực đau. Hãy nạp sấm sét của Ampharos giật $\times 4$ sát thương rụng cánh tức thì.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png" alt="Dragonair" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dragonair</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 38</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rồng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Biết chơi Thunder Wave làm choáng và Fire Blast rực lửa. Đập gục bằng đòn hệ Băng (Ice Beam của Lapras/Jynx) siêu nhanh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png" alt="Dragonair" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dragonair</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 38</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rồng</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sở hữu Aqua Tail bạo liệt. Đè bẹp nhanh bằng đòn tuyết băng giá.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/230.png" alt="Kingdra" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Kingdra (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 41</td>
            <td style="padding: 12px 16px;">Thủy / Rồng</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Không hề sợ hệ Băng do hệ Thủy triệt tiêu! Sở hữu đòn **Dragon Pulse** và **Hydro Pump** cực đau kết hợp SmokeScreen phá độ chính xác. Hãy dùng rồng Dratini hoặc dốc đòn vật lý tối thượng bạo kích dập sập nát nó!</td>
          </tr>
        </tbody>
      </table>
      <p>Sau khi chiến thắng, bơi vào hang **Dragon's Den** phía sau ngôi đền, trả lời chính xác 5 câu hỏi thể hiện tinh thần yêu thương đồng hành cùng Pokémon của Hội Lão Làng cổ để đoạt lấy huy hiệu vinh quang cùng một chú <strong>Dratini có kỹ năng độc quyền ExtremeSpeed</strong>!</p>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 10: Điệu múa Kimono Girls & Diện kiến thần điểu Ho-Oh xuất thế",
    order: 10,
    language: "vi",
    content: `
      <h1>Phần 10: Điệu múa Kimono Girls & Diện kiến thần điểu Ho-Oh xuất thế</h1>
      <p>Đây là điểm nâng cấp rực rỡ nhất về mặt cốt truyện của Pokémon HeartGold, bắt buộc người chơi phải đối mặt chuỗi đấu đỉnh cao trước khi gõ trống thỉnh thần!</p>

      <h2>1. Thách thức Chuỗi đấu 5 nàng tiên Kimono Girls liên tục</h2>
      <p>Hãy chuẩn bị sẵn sàng đội hình siêu khoẻ và bình hồi phục, tiến về Nhà hát kịch Ecruteak Theater. Tại đây bạn phải đánh bại liên tiếp cả 5 nàng tiên múa lụa cổ mà KHÔNG được hồi máu giữa trận đấu:</p>
      <ul>
        <li><strong>Zuki:</strong> Umbreon (Lvl 38) - Dùng đòn Giác Đấu hoặc Trùng để đập vỡ khiên bọc.</li>
        <li><strong>Naoko:</strong> Espeon (Lvl 38) - Dùng đòn hệ Bóng tối hoặc Ma dũng mãnh dập nát.</li>
        <li><strong>Miki:</strong> Flareon (Lvl 38) - Đè bẹp nhanh bằng đòn nước Surf cuồn cuộn.</li>
        <li><strong>Sayo:</strong> Jolteon (Lvl 38) - Trấn áp nhanh bằng các đòn hệ Đất (Earthquake).</li>
        <li><strong>Kuni:</strong> Vaporeon (Lvl 38) - Giật sét sấm dội nước điện cuồng bạo bằng Ampharos.</li>
      </ul>

      <h2>2. Leo Bell Tower diện kiến Chim lửa huyền thoại Ho-Oh (Level 45)</h2>
      <p>Sau khi vượt qua thử thách, các Kimono Girls sẽ tiến thẳng lên ngọn tháp rực đỏ **Bell Tower**. Hãy trèo qua ngọn tháp cao vợi, chứng kiến điệu múa lụa cầu thần kỳ diệu triệu gọi thần thú lửa thiêng **Ho-Oh (Level 45)** xuất đầu diện diện!</p>
      <div style="text-align: center; margin: 24px 0;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png" alt="Ho-Oh" style="max-width: 110px;" />
        <p style="font-style: italic; color: #ef4444; margin-top: 8px;">Thần điểu lửa thiêng Ho-Oh rực sáng kiêu hãnh trên đỉnh Bell Tower!</p>
      </div>
      <blockquote>
        <strong>Mẹo eSports:</strong> Ho-Oh ngự trị ở Level 45 sở hữu tuyệt kỹ độc quyền **Sacred Fire** có sát thương khủng khiếp và 50% tỉ lệ thiêu đốt đối thủ. Hãy dùng đòn hệ Đá (đè x4 sát thương) để khống chế nó hoặc ru ngủ rồi thu phục bằng Ultra Ball!
      </blockquote>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 11: Indigo Plateau - Vượt ải Victory Road & Xưng Vương Johto",
    order: 11,
    language: "vi",
    content: `
      <h1>Phần 11: Indigo Plateau - Vượt ải Victory Road & Xưng Vương Johto</h1>
      <p>Sử dụng Surf bơi qua mạn đông New Bark Town vượt thác nước vĩ đại **Tohjo Falls** để chính thức đạp chân lên vùng đất Kanto. Tiến thẳng qua **Victory Road** trập trùng hốc hiểm, hạ gục Rival Silver lần cuối ở lối ra thung lũng.</p>

      <h2>Thách đấu Liên Minh Indigo Plateau hùng vĩ</h2>
      <p>Bắt đầu chuỗi đấu 5 trận nghẹt thở đối đầu cùng những nhà huấn luyện xuất chúng nhất của toàn cõi Johto-Kanto:</p>

      <h2>1. Siêu hùng Tâm Linh Will</h2>
      <p>Will sử dụng năng lượng siêu thức Tâm linh đầy huyền bí:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(168, 85, 247, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: center; width: 100px; color: #c084fc;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left; color: #c084fc;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left; color: #c084fc;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left; color: #c084fc;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left; color: #c084fc;">Tuyệt kỹ & Cách chế ngự</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/178.png" alt="Xatu" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Xatu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 40</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Tâm Linh / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Dùng **U-turn**, **Confuse Ray**. Sấy khô bằng điện sấm lôi của Mareep/Ampharos hoặc thiêu rụi từ xa.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png" alt="Jynx" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Jynx</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Băng / Tâm Linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mang đòn ru ngủ nguy hiểm **Lovely Kiss** và **Ice Punch**. Cực sợ Lửa, thiêu đốt một phát bốc khói lẹ bằng Typhlosion.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png" alt="Exeggutor" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Exeggutor</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ / Tâm Linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sở hữu **Hypnosis** và **Wood Hammer** tự tổn thương. Dính $\times 4$ từ hệ Trùng (U-turn) hoặc sấy giòn bằng đòn Lửa Typhlosion.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png" alt="Slowbro" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Slowbro</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thủy / Tâm Linh</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Khá trâu vật lý mang **Surf** và **Curse** cường hóa giáp. Giật sét tê liệt bằng Ampharos hoặc cắn nát bằng Crunch của Feraligatr.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/178.png" alt="Xatu" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Xatu (Át chủ bài)</td>
            <td style="padding: 12px 16px;">Lvl 42</td>
            <td style="padding: 12px 16px;">Tâm Linh / Bay</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Đòn công đặc biệt rát mang **Psychic** và **Ominous Wind**. Đập sập nhanh bằng Ampharos giật sét sấm dội dứt điểm lẹ làng trước khi nó dựng rối Confuse Ray!</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Độc thủ Ninja Koga</h2>
      <p>Koga mang các chiêu độc chất gây choáng độc quái dị:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(217, 70, 239, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(217, 70, 239, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: center; width: 100px; color: #f472b6;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: left; color: #f472b6;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: left; color: #f472b6;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: left; color: #f472b6;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: left; color: #f472b6;">Độc thuật & Kế sách phá vỡ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/168.png" alt="Ariados" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Ariados</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 40</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Trùng / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Dùng **Spider Web**, **Poison Jab**. Sấy chín bằng đòn lửa Typhlosion hoặc dùng đòn Bay của Lugia.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png" alt="Venomoth" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Venomoth</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Trùng / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Hù dọa bối rối bằng **Supersonic**. Phun lửa đốt cháy dọn sạch lẹ làng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/205.png" alt="Forretress" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Forretress</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 43</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Trùng / Thép</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Dựng gai độc **Toxic Spikes** và rình rập tự nổ sát thương cực lớn bằng **Explosion**. Đè bẹp x4 bằng Lửa! Phun lửa Typhlosion nướng chín tức thì trước khi nó nổ!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png" alt="Muk" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Muk</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Thích né bằng **Minimize** và rải độc cực kì ức chế. Dùng đòn hệ Đất (Earthquake) hoặc đòn Tâm Linh dọn dẹp bộc phá cực lẹ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/169.png" alt="Crobat" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Crobat (Át chủ dơi bay)</td>
            <td style="padding: 12px 16px;">Lvl 44</td>
            <td style="padding: 12px 16px;">Độc / Bay</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Tốc độ kinh ngạc mang **Poison Fang** cắn độc và **Air Slash** bão tố. Sấy khô bằng sấm lôi điện Ampharos giật phát rụng cánh tức thì!</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Quyền Vương Bruno</h2>
      <p>Bruno là thế lực võ thuật cơ bắp tối thượng sừng sững:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(249, 115, 22, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: center; width: 100px; color: #fb923c;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #fb923c;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #fb923c;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #fb923c;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #fb923c;">Tuyệt kỹ võ học & Kế sách đè bẹp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/237.png" alt="Hitmontop" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Hitmontop</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giác Đấu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Thích xài **Counter** phản sát thương thể chất! Tuyệt đối không dùng đòn vật lý trực tiếp lên nó. Thổi bay cực nhạy bằng đòn Tâm Linh (Kadabra) hoặc đòn phép tầm xa.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png" alt="Hitmonlee" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Hitmonlee</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giác Đấu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tung chiêu đá bạo kích **Hi Jump Kick** và đá lửa **Blaze Kick**. Rải đòn Bay lượn hệ Chim hoặc đòn hệ Tâm Linh dẹp gọn lẹ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png" alt="Hitmonchan" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Hitmonchan</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Giác Đấu</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sở hữu bộ ba cú đấm nguyên tố đa dạng (Fire, Ice, Thunder Punch) cùng cú đấm đi trước **Bullet Punch**. Dùng đòn Tâm Linh giã từ xa triệt hạ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" alt="Onix" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Onix</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 43</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Đất</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Cực kì trâu phòng thủ vật lý nhưng phòng thủ đặc biệt cực yếu dã bạo! Bơm nước lướt sóng **Surf** dạt trôi rỉ sét sụp đổ tức thì (dính $\times 4$ sát thương).</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png" alt="Machamp" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Machamp (Át chủ lực điền)</td>
            <td style="padding: 12px 16px;">Lvl 46</td>
            <td style="padding: 12px 16px;">Giác Đấu</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Sức công vật lý đỉnh cao mang đòn hiểm **Cross Chop** và **Stone Edge** dập bạo. Dốc đòn phép đặc biệt mạnh nhất của hệ Tâm Linh (Psychic) để bóp sập dứt điểm đấu sĩ lực lưỡng này.</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Nữ hoàng Bóng Đêm Karen</h2>
      <p>Karen sở hữu những mưu mẹo bóng tối tăm ám cực quái chiêu:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(100, 116, 139, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(100, 116, 139, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: center; width: 100px; color: #94a3b8;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: left; color: #94a3b8;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: left; color: #94a3b8;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: left; color: #94a3b8;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: left; color: #94a3b8;">Quái chiêu bẫy rập & Khắc chế bóng đêm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png" alt="Umbreon" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Umbreon</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bóng Tối</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mâm xôi phòng thủ siêu trâu mang **Confuse Ray** gây rối và **Payback** cực kỳ bạo khi đi sau. Hãy dùng đòn Giác Đấu (Machamp/Heracross) đấm nát khiên bọc giáp của nó lẹ làng.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png" alt="Vileplume" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Vileplume</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Cỏ / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Dùng **Petal Dance** múa hoa lửa đau và rải phấn làm tê liệt **Stun Spore**. Thiêu rụi hoa lá héo tàn nhanh chóng bằng đòn Lửa của Typhlosion.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Gengar</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 45</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ma / Độc</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sở hữu **Shadow Ball** đặc biệt bạo kích đau điếng. Dùng đòn cắn bóng tối Crunch của Feraligatr cắn rách nát nó lẹ làng hoặc đòn Tâm Linh Kadabra.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/198.png" alt="Murkrow" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Murkrow</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 44</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bóng Tối / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Có tốc độ bay lượn và rỉa lông **Pluck** lấy cắp berry. Giật sét tê liệt giòn tan bằng sấm sét Ampharos rụng cánh cực nhanh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/229.png" alt="Houndoom" style="max-width:40px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Houndoom (Át chủ khuyển ma)</td>
            <td style="padding: 12px 16px;">Lvl 47</td>
            <td style="padding: 12px 16px;">Bóng Tối / Lửa</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Sức tấn công đặc biệt cực bạo mang **Flamethrower** khạc lửa tối và **Dark Pulse** tàn phá ý chí, có thể dựng **Nasty Plot** nhân đôi phép. Hãy dội sóng cuồn cuộn thủy Surf dập sập lò lửa quỷ này dứt điểm tức thì!</td>
          </tr>
        </tbody>
      </table>

      <h2>5. Nhà Vô Địch Lance - Vua Rồng Thần Long</h2>
      <p>Trận quyết tử giành vinh quang cực hạn với ba chú rồng khổng lồ Dragonite tàn bạo dã ngoại:</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(245, 158, 11, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: center; width: 100px; color: #fcd34d;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: left; color: #fcd34d;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: left; color: #fcd34d;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: left; color: #fcd34d;">Hệ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: left; color: #fcd34d;">Kế sách khắc chế sinh tử</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" alt="Gyarados" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Gyarados</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 46</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Thủy / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sở hữu đòn dội lốc rát. Hãy dùng đòn sấm giật của Ampharos giật phát bay màu tức thì.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6 Charizard.png" alt="Charizard" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Charizard</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 48</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lửa / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Đòn Air Slash cực bạo. Ném đá nát cánh bằng các đòn hệ Đá hoặc lướt Surf dội ngập bờ.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png" alt="Aerodactyl" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Aerodactyl</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 48</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đá / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tốc độ siêu phàm mang đòn Rock Slide bạo kích gớm ghiếc. Giật sấm sét lôi đình cực nhạy.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png" alt="Dragonite" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dragonite x2</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 49</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rồng / Bay</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sở hữu Outrage và Hyper Beam đập vỡ khiên. Đập gục bằng đòn hệ Băng (Ice Beam của Lapras/Dewgong) nhân 4 sát thương!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png" alt="Dragonite" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Dragonite (Át chủ tối thượng)</td>
            <td style="padding: 12px 16px;">Lvl 50</td>
            <td style="padding: 12px 16px;">Rồng / Bay</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Sức tàn sát cực kỳ dã man dũng mãnh. Đóng băng cánh rồng bằng đòn tuyết mạnh nhất ghim thẳng vào gáy kết thúc trận đấu, chính thức đăng cơ Tân Vô Địch Johto!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 12: Đại náo 8 Gym Kanto & Đại chiến Red đỉnh núi tuyết Mt. Silver",
    order: 12,
    language: "vi",
    content: `
      <h1>Phần 12: Đại náo 8 Gym Kanto & Đại chiến Red đỉnh núi tuyết Mt. Silver</h1>
      <p>Sau khi đăng cơ xưng vương Johto, nhận tấm vé tàu S.S. Aqua cập bến thành phố cảng Vermilion City để khám phá thế giới Kanto huyền thoại.</p>

      <h2>1. Đoạt trọn bộ 8 Huy hiệu Kanto</h2>
      <p>Càn quét và hạ gục toàn bộ 8 thủ lĩnh Kanto danh tiếng lẫy lừng thế giới cũ:</p>
      <ul>
        <li><strong>Lt. Surge (Lvl 51-53):</strong> Hệ Điện thần sấm dã dượi. Dùng Earthquake hốt sạch.</li>
        <li><strong>Sabrina (Lvl 53-55):</strong> Hệ Tâm Linh đầy ảo diệu. Dùng đòn hệ Bóng Tối/Thể Chất đè bẹp.</li>
        <li><strong>Misty (Lvl 54-56):</strong> Hệ Thủy dập sóng đại dương. Dùng hệ Điện/Cỏ sấy khô nước dạt.</li>
        <li><strong>Erika (Lvl 51-56):</strong> Hệ Cỏ say hoa độc rực. Lửa Quilava thiêu cháy rực rỡ hoa lá.</li>
        <li><strong>Janine (Lvl 47-50):</strong> Ninja độc chất. Dùng Tâm Linh hoặc Đất quét gọn.</li>
        <li><strong>Brock (Lvl 51-54):</strong> Thành đá sừng sững. Dùng Surf dạt bờ dìm nát nước.</li>
        <li><strong>Blaine (Lvl 54-59):</strong> Lửa bạo hỏa hoạn. Đè bẹp bằng Surf đại dương.</li>
        <li><strong>Blue (Lvl 55-60):</strong> Cựu vô địch Kanto mang đội hình siêu đa dạng bạo liệt. Hãy chuẩn bị đội hình toàn diện nhất để so tay cao thấp!</li>
      </ul>

      <h2>2. Trận huyết chiến định mệnh với Đại Ca Red đỉnh núi tuyết Mt. Silver</h2>
      <p>Vượt qua thung lũng tuyết rơi trắng xóa hoang dã Mt. Silver. Tại tầng đỉnh tuyết rơi dồn dập dã bạo, bạn diện kiến **Huyền thoại Red** cùng đội hình mạnh nhất lịch sử Pokémon ở Level 88, sương mù lạnh buốt bạo kích liên hồi!</p>

      <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
        <thead>
          <tr style="background-color: rgba(239, 68, 68, 0.15);">
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: center; width: 100px; color: #f87171;">Sprite</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Pokémon</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Cấp độ</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Tuyệt kỹ sát thương</th>
            <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Kế sách khắc chế tối thượng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Pikachu (Át chủ bài)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Lvl 88</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Volt Tackle, Iron Tail</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Mang ngọc độc quyền Light Ball nhân đôi sức công phá Sp.Atk! Hãy dập sập tức thì bằng đòn Đất động đất Earthquake từ Garchomp hoặc Steelix trước khi nó giật sấm nát đội!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" alt="Snorlax" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Snorlax</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 82</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Blizzard, Giga Impact</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Trâu bò vô địch, Blizzard chính xác 100% nhờ bão tuyết. Hãy dùng các đòn Giác Đấu thể chất cực mạnh (Machamp) để giã vỡ tảng mỡ này lẹ làng!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png" alt="Lapras" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Lapras</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 80</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Blizzard, Surf, Brine</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Hoàn toàn miễn nhiễm băng tuyết. Sấy khô bàng đòn hệ Điện của Ampharos sấm sét giật tê bắp đùi!</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" alt="Venusaur" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Venusaur</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 84</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Frenzy Plant, Sleep Powder</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Ru ngủ vô đối rồi dập đòn thảo mộc cực bạo. Hãy dùng lửa thiêu của Ho-Oh hoặc sấy khô từ xa bơi lội.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" alt="Blastoise" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Blastoise</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 84</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hydro Cannon, Blizzard</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Cự pháo rùa thủy bạo lực bắn tan nát. Giật sét bộc phá bằng Ampharos kết liễu cực nhanh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; text-align: center;">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="Charizard" style="max-width:45px;" />
            </td>
            <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Charizard</td>
            <td style="padding: 12px 16px;">Lvl 84</td>
            <td style="padding: 12px 16px;">Blast Burn, Flare Blitz</td>
            <td style="padding: 12px 16px; color: #cbd5e1;">Khạc lửa thấu xương tàn phá toàn diện dã ngoại hoang. Hãy dội nước bão lốc Surf ngập đầu dập sập mồi rồng thiêng kết thúc chuỗi đấu vinh dự huyền thoại bất hủ!</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 13: Toàn tập HMs, Vật phẩm đặc trưng vùng Johto-Kanto bản HeartGold",
    order: 13,
    language: "vi",
    content: `
      <h1>Phần 13: Toàn tập HMs, Vật phẩm đặc trưng vùng Johto-Kanto bản HeartGold</h1>
      <p>Bản tra cứu các tuyệt kỹ dã ngoại HMs và trang bị cổ không thể thiếu trong suốt chuyến phiêu lưu:</p>

      <h2>1. Toàn bộ 8 Tuyệt kỹ ngoài dã ngoại (HMs)</h2>
      <ul>
        <li><strong>HM01 Cut (Chặt cây):</strong> Rừng Ilex Forest (giải cứu chim Farfetch'd ban tặng).</li>
        <li><strong>HM02 Fly (Bay lượn):</strong> Cianwood City (đánh bại Chuck, vợ Chuck trao tặng ngoài cửa).</li>
        <li><strong>HM03 Surf (Lướt sóng):</strong> Ecruteak Theater (đánh bại 5 nàng tiên Kimono Girls).</li>
        <li><strong>HM04 Strength (Sức mạnh thể chất):</strong> Route 42 (gặp cụ già đấm tảng đá ban tặng).</li>
        <li><strong>HM05 Whirlpool (Vượt xoáy nước dạt):</strong> Mahogany Rocket Hideout (Lance trao tặng sau khi phá máy).</li>
        <li><strong>HM06 Rock Smash (Đập vỡ đá):</strong> Route 36 (sau khi tưới nước dẹp Sudowoodo, NPC tặng).</li>
        <li><strong>HM07 Waterfall (Trượt thác vĩ đại):</strong> Nằm sâu trong Con đường băng tuyết Ice Path.</li>
        <li><strong>HM08 Rock Climb (Leo vách đá sừng sững):</strong> Sắp sửa về đích đăng quang, Giáo sư Oak trao tặng sau khi đoạt trọn vẹn 16 chiếc huy hiệu vinh quang!</li>
      </ul>

      <h2>2. Các Vật phẩm đặc chủng vô cùng đắt giá</h2>
      <ul>
        <li><strong>GB Sounds:</strong> Sau khi thắng Red, leo lên tầng 3 Celadon Condominiums gặp nhà phát triển nhạc để nhận chiếc máy biến âm, chuyển toàn bộ nhạc nền thế giới sang dạng chiptune hoài niệm thế hệ 2 cực kì xúc cảm!</li>
        <li><strong>Bicycle (Xe đạp):</strong> Nhận tại tiệm xe đạp Goldenrod City.</li>
        <li><strong>SecretPotion (Thần dược chữa bệnh):</strong> Nhận tại quầy dược phẩm Cianwood City cứu Amphy.</li>
      </ul>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 14: Bí mật các thần thú Siêu Hiếm & Huyền Thoại bạo liệt",
    order: 14,
    language: "vi",
    content: `
      <h1>Phần 14: Bí mật các thần thú Siêu Hiếm & Huyền Thoại bạo liệt</h1>
      <p>HeartGold mở ra thánh địa săn lùng thần thú vĩ đại nhất của toàn dòng game thế hệ 4:</p>

      <h2>1. Thần hộ mệnh đại dương Lugia (Whirl Islands - Level 70)</h2>
      <p>Sau khi đoạt được quả chuông bạc **Silver Wing** từ cụ già tại Pewter City mạn Kanto, hãy dùng Whirlpool bơi sâu vào hốc đảo xoáy nước Whirl Islands để diện kiến **Lugia (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png" style="max-width:32px; vertical-align:middle;" /> vĩ đại!</p>

      <h2>2. Theo dấu thần nước ngọc thanh tú Suicune (Cerulean Cape - Level 40)</h2>
      <p>Khác bản gốc, Suicune trong HGSS sẽ không chạy hoang dã dã ngoại! Bạn phải liên tục diện kiến nó ở 5 địa điểm bí ẩn (Violet City, Route 36, Cianwood City, Route 42, Vermilion City) rồi tiến thẳng lên Cerulean Cape mạn đông bắc Kanto để so tài thu phục **Suicune (Level 40)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png" style="max-width:32px; vertical-align:middle;" />!</p>

      <h2>3. Thần bóng đêm Mewtwo ngủ vạn năm (Cerulean Cave - Level 70)</h2>
      <p>Vượt qua dòng nước chảy siết mạn tây Cerulean City để đột nhập hang động cổ Cerulean Cave. Ở sâu thẳm đáy mê cung đá bay, thu phục **Mewtwo (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" style="max-width:32px; vertical-align:middle;" /> siêu bạo phát!</p>

      <h2>4. Khởi nguồn Sáng Thế: Kyogre & Rayquaza huyền thoại (Embedded Tower)</h2>
      <p>Post-game đỉnh cao, nhận ngọc lam **Blue Orb** từ tiên ông Mr. Pokémon để bước vào tháp cổ **Embedded Tower** mạn tây Route 47, thách thức thủy thần khổng lồ đại dương **Kyogre (Level 50)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png" style="max-width:32px; vertical-align:middle;" />. Đặc biệt nếu bạn trade được chú Groudon từ bản SoulSilver sang, mang cả cặp Kyogre & Groudon tới diện kiến Oak để nhận ngọc xanh lục triệu gọi thần long vũ trụ **Rayquaza (Level 50)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png" style="max-width:32px; vertical-align:middle;" /> xuất thế thách đấu!</p>
    `
  },
  {
    gameVersion: "heartgold",
    chapterTitle: "Phần 15: Toàn tập Hậu game, Đấu trường Battle Frontier Johto & Đồ Trấn Phái",
    order: 15,
    language: "vi",
    content: `
      <h1>Phần 15: Toàn tập Hậu game, Đấu trường Battle Frontier Johto & Đồ Trấn Phái</h1>
      <p>Bại trận Red mở ra đỉnh cao thách thức chuyên nghiệp tại cụm đấu trường **Battle Frontier** tọa lạc sát vách đại lộ Route 40.</p>

      <h2>1. Thống trị 5 cơ sở Battle Frontier cực hạn</h2>
      <p>Quy luật thi đấu được bốc xếp bạo kích, so tài chiến thuật cùng các Tycoons đỉnh cao:</p>
      <ul>
        <li><strong>Battle Tower:</strong> Đấu sỹ 3v3 đỉnh cao. Chuỗi thắng nghẹt thở gặp Palmer cha Silver dã dã ngoại.</li>
        <li><strong>Battle Factory:</strong> Thuê mướn đội hình ngẫu nhiên của nhà máy thách thức Thornton.</li>
        <li><strong>Battle Castle:</strong> Sử dụng tích lũy CP mua sắm thuốc hồi sức, nâng cấp khiên thách thách Darach.</li>
        <li><strong>Battle Arcade:</strong> Vòng xoay số phận kích hỏa hiệu ứng ngẫu nhiên (độc, tê, cháy...) so tài Dahlia.</li>
        <li><strong>Battle Hall:</strong> Sân solo 1v1 dứt điểm cực bạo thách Matron Argenta.</li>
      </ul>

      <h2>2. Bản tra cứu các held items cực hạn thi đấu chuyên nghiệp</h2>
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
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Leftovers (Đồ ăn thừa)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Hồi phục nhẹ 1/16 lượng HP tối đa sau mỗi lượt chiến đấu dã dã ngoại dã ngoại.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhặt tại hầm Victory Road, hoặc tìm thấy hoang dã Snorlax.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Choice Band (Băng lựa chọn)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 50% chỉ số tấn công vật lý bạo lực, nhưng khóa cứng duy nhất 1 chiêu thức.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Đổi bằng điểm BP chiến thắng quầy sảnh Battle Frontier.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Choice Specs (Kính lựa chọn)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 50% chỉ số tấn công đặc biệt siêu phàm, khóa duy nhất 1 chiêu kỹ năng.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhặt tại Route 36 hoặc đổi bằng điểm thắng BP quầy.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Choice Scarf (Khăn quàng lựa chọn)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 50% chỉ số Tốc độ thần sầu lướt gió dã bạo, khóa cứng 1 chiêu tấn công.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Vật phẩm trấn phái thế hệ 4! Nhận qua điểm thắng BP đổi sảnh đấu.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Life Orb (Bảo ngọc sinh mệnh)</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Tăng 30% sức tàn sát của toàn bộ đòn đánh bất luận đặc thù, mất 10% lượng máu tối đa sau mỗi đòn trúng địch.</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Nhặt sâu trong hang núi lửa Stark Mountain hoặc đổi điểm BP sảnh.</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Focus Sash (Đai tập trung giữ mạng)</td>
            <td style="padding: 12px 16px;">Giúp Pokémon sống dai còn đúng 1 HP trước đòn đánh knock-out chí tử từ vẹn nguyên cây máu.</td>
            <td style="padding: 12px 16px;">Nhận từ bà cụ dã dã ngoại Route 221 hoặc điểm thắng BP đổi sảnh.</td>
          </tr>
        </tbody>
      </table>
    `
  }
];

export const ENGLISH_HEARTGOLD_CHAPTERS = HEARTGOLD_CHAPTERS.map(viChapter => {
  let title = "";
  let content = "";

  switch (viChapter.order) {
    case 1:
      title = "Chapter 1: The Journey Begins in New Bark Town";
      content = `
        <h1>Chapter 1: The Journey Begins in New Bark Town</h1>
        <p>Welcome to the beautiful land of Johto in the ultimate Gen 4 remake - Pokémon HeartGold! Your legendary adventure begins in the quiet and peaceful New Bark Town.</p>

        <h2>1. Selecting Your Companion (Starter Pokémon)</h2>
        <p>Professor Elm offers three companions with upgraded Gen 4 combat mechanics:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(255, 255, 255, 0.04);">
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center; width: 100px;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">Gen 4 Tactical Evaluation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png" alt="Chikorita" style="max-width: 50px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Chikorita</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Grass</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Defensive playstyle. High-difficulty challenge since almost all Johto Gyms hard-counter Grass types.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png" alt="Cyndaquil" style="max-width: 50px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #f97316;">Cyndaquil</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">The ideal choice for fast progression. Great Speed and Special Attack stats easily melt Bug, Steel, and Ice gyms.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png" alt="Totodile" style="max-width: 50px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #3b82f6;">Totodile</td>
              <td style="padding: 12px 16px;">Water</td>
              <td style="padding: 12px 16px; color: #cbd5e1;"><strong>Gains massive benefits from the Gen 4 Physical/Special split!</strong> Water and Dark moves (like Waterfall and Crunch) are now physical, aligning perfectly with its massive Physical Attack stat.</td>
            </tr>
          </tbody>
        </table>

        <blockquote style="border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 24px 0; background-color: rgba(59, 130, 246, 0.05); border-radius: 0 12px 12px 0;">
          <strong>eSports Tip:</strong> In HeartGold, the leading Pokémon of your party will physically walk behind you in the overworld! Interact with them to inspect their mood and collect items.
        </blockquote>

        <h2>2. First Quest & Encountering the Red-Haired Thief</h2>
        <p>Walk north across Route 30 to reach Mr. Pokémon's house to receive the **Mystery Egg** and the brand new Pokédex from Professor Oak. On your way back, you will be ambushed by a red-haired boy (Silver) who has stolen the starter that counters yours!</p>
        <p>Defeat him and report back to Elm's lab to log his name with the police.</p>
      `;
      break;

    case 2:
      title = "Chapter 2: Gym 1 - Falkner's Flying Crest at Violet City";
      content = `
        <h1>Chapter 2: Gym 1 - Falkner's Flying Crest at Violet City</h1>
        <p>Navigate across Route 30 and 31. Catching **Mareep** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/179.png" style="max-width:24px; vertical-align:middle;" /> is highly recommended to easily sweep Falkner's gym.</p>

        <h2>1. Climbing the Sprout Tower</h2>
        <p>Climb the historic Sprout Tower to battle the monks' Grass types. Defeat Elder Li at the top floor to receive the luminous **TM70 Flash**.</p>

        <h2>2. Defeating Gym Leader Falkner (Zephyr Badge)</h2>
        <p>Falkner wields Flying types utilizing the upgraded recovery move **Roost**:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(56, 189, 248, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: center; width: 100px; color: #38bdf8;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left; color: #38bdf8;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left; color: #38bdf8;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left; color: #38bdf8;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(56, 189, 248, 0.3); text-align: left; color: #38bdf8;">Moves & Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png" alt="Pidgey" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Pidgey</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 9</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Normal / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Spams Tackle and Sand Attack. Zap it down with Mareep's Thundershock or Geodude's Rock Throw.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png" alt="Pidgeotto" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Pidgeotto (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 13</td>
              <td style="padding: 12px 16px;">Normal / Flying</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Wields **Roost** (restores 50% HP and removes Flying weakness for the turn) and **Gust**. Geodude caught inside Union Cave will wall its damage and deal massive rock-type blows to defeat it easily.</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 3:
      title = "Chapter 3: Slowpoke Well & Gym 2 - Bugsy's Forest Hive";
      content = `
        <h1>Chapter 3: Slowpoke Well & Gym 2 - Bugsy's Forest Hive</h1>
        <p>Acquire the hatchable Togepi egg. Traverse the Union Cave and arrive at Azalea Town, home of the historic Apricorn Pokéball blacksmith Kurt.</p>

        <h2>1. Infiltrating the Slowpoke Well</h2>
        <p>Team Rocket has occupied the well to sever Slowpoke tails! Join forces with Kurt to storm the base, defeat Proton, and liberate the kidnapped Slowpoke.</p>

        <h2>2. Defeating Gym Leader Bugsy (Hive Badge)</h2>
        <p>Bugsy's signature Scyther has been buffed with the high-utility tactical move **U-turn**:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(132, 204, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(132, 204, 22, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: center; width: 100px; color: #a3e635;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left; color: #a3e635;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left; color: #a3e635;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left; color: #a3e635;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(132, 204, 22, 0.3); text-align: left; color: #a3e635;">Moves & Counter strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png" alt="Metapod" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Metapod</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 15</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bug</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Only spams Harden. Use any physical or elemental move to burn through its defense.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png" alt="Kakuna" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Kakuna</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 15</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bug / Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Spams Harden and Poison Sting. Roast it with Fire type moves from Quilava.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png" alt="Scyther" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Scyther (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 17</td>
              <td style="padding: 12px 16px;">Bug / Flying</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Uses **U-turn** to deal damage and swap out, combined with **Quick Attack**. Counter with Quilava's Flame Wheel or Geodude's Rock Throw (dealing 4x damage) to squash it instantly!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 4:
      title = "Chapter 4: Goldenrod City & The Overwhelming Miltank Showdown";
      content = `
        <h1>Chapter 4: Goldenrod City & The Overwhelming Miltank Showdown</h1>
        <p>Traverse through the Ilex Forest (helping the charcoal maker capture Farfetch'd to obtain **HM01 Cut**) to reach the massive Goldenrod City.</p>

        <h2>1. City Services & Utilities</h2>
        <ul>
          <li>Acquire the **Bicycle** for high-speed overworld travel from the bicycle shop.</li>
          <li>Register for the Radio Card at the Goldenrod Radio Tower.</li>
        </ul>

        <h2>2. Battling Gym Leader Whitney (Plain Badge)</h2>
        <p>Whitney's Miltank gains the **Scrappy** ability in Gen 4, enabling it to hit Ghost types (like Gastly) with its signature Stomp!</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(244, 63, 94, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: center; width: 100px; color: #fb7185;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left; color: #fb7185;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left; color: #fb7185;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left; color: #fb7185;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(244, 63, 94, 0.3); text-align: left; color: #fb7185;">Winning Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png" alt="Clefairy" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Clefairy</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 17</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Normal</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses **Metronome** for unpredictable moves and **Double Slap**. Knock it out quickly.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/241.png" alt="Miltank" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Miltank (Rollout Boss)</td>
              <td style="padding: 12px 16px;">Lvl 19</td>
              <td style="padding: 12px 16px;">Normal</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Spams flinching **Stomp**, **Attract**, and ramping **Rollout**. Due to its **Scrappy** ability, it targets Ghost types easily. Trade a Drowzee caught on Route 34 for a female **Machop** on the 5th floor of Goldenrod Dept Store. Its Low Kick will easily crush Miltank in seconds!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 5:
      title = "Chapter 5: Ecruteak City & The Special Shadow Ball of Gengar";
      content = `
        <h1>Chapter 5: Ecruteak City & The Special Shadow Ball of Gengar</h1>
        <p>Arrive at Ecruteak City, the cultural capital of Johto where the legends of Ho-Oh and Lugia reside.</p>

        <h2>1. Freeing the Legendary Beasts at Burned Tower</h2>
        <p>Infiltrate Burned Tower to battle your Rival and encounter Eusine. Descending to the lower floor awakens Raikou, Entei, and Suicune. After freeing them, defeat the 5 Kimono Girls at the local Dance Theater to obtain **HM03 Surf**.</p>

        <h2>2. Defeating Gym Leader Morty (Fog Badge)</h2>
        <p>In Gen 4, **Shadow Ball** is a Special move. Gengar's massive Special Attack stat makes Shadow Ball extremely deadly:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(139, 92, 246, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: center; width: 100px; color: #a78bfa;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: left; color: #a78bfa;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: left; color: #a78bfa;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: left; color: #a78bfa;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); text-align: left; color: #a78bfa;">Strategy & Weakness</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" alt="Gastly" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Gastly</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ghost / Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses Spite and Mean Look. Obliterate it with Psychic attacks from Kadabra.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" alt="Haunter" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Haunter</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 21</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ghost / Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Spams Hypnosis and Dream Eater. Dispatch quickly with Psychic or Ground attacks.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" alt="Haunter" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Haunter</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 23</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ghost / Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Wields HP-draining Curse. Counter with Dark or Psychic type moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Gengar (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 25</td>
              <td style="padding: 12px 16px;">Ghost / Poison</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Boasts Special **Shadow Ball**, Mean Look, and Hypnosis. Use a Normal-type Pokémon (which is immune to Ghost moves) with a Dark-type move (like Raticate's Crunch) to easily bite through Morty's defense!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 6:
      title = "Chapter 6: Olivine Lighthouse & Stormy Sea to Cianwood Gym";
      content = `
        <h1>Chapter 6: Olivine Lighthouse & Stormy Sea to Cianwood Gym</h1>
        <p>Arrive in Olivine City. Check on Jasmine's sick Ampharos (Amphy) in the lighthouse and volunteer to get medicine.</p>

        <h2>1. Surf to Cianwood City</h2>
        <p>Surf across Route 40 and 41 to reach the coastal Cianwood City. Enter the local pharmacy to retrieve the **SecretPotion**.</p>

        <h2>2. Defeating Gym Leader Chuck (Storm Badge)</h2>
        <p>Chuck's Fighting types hit with physical brute force:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(249, 115, 22, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: center; width: 100px; color: #f97316;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #f97316;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #f97316;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #f97316;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #f97316;">Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png" alt="Primeape" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Primeape</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 29</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fighting</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses Rock Slide and Double Team. Shut it down with Kadabra's Psychic moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png" alt="Poliwrath" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Poliwrath (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 31</td>
              <td style="padding: 12px 16px;">Water / Fighting</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Features **Focus Punch** for devastating power, combined with sleeping **Hypnosis**. Exploit its weaknesses with Ampharos' Electric moves or Flying-type aerial maneuvers.</td>
            </tr>
          </tbody>
        </table>
        <p>Acquire your badge, and meet Chuck's wife outside to obtain **HM02 Fly** for instantaneous travel across the region.</p>
      `;
      break;

    case 7:
      title = "Chapter 7: Mineral Badge bọc thép & Lake of Rage Shiny Gyarados";
      content = `
        <h1>Chapter 7: Mineral Badge bọc thép & Lake of Rage Shiny Gyarados</h1>
        <p>Fly back to Olivine City and hand the SecretPotion to Jasmine to heal Amphy, calling her back to her Steel-type gym.</p>

        <h2>1. Overcoming Jasmine's Wall of Steel (Mineral Badge)</h2>
        <p>Jasmine's Steelix boasts incredible Physical Defense:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(148, 163, 184, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: center; width: 100px; color: #cbd5e1;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left; color: #cbd5e1;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left; color: #cbd5e1;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left; color: #cbd5e1;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(148, 163, 184, 0.3); text-align: left; color: #cbd5e1;">Winning Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png" alt="Magnemite" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Magnemite</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric / Steel</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Extremely weak to Ground moves (4x damage) or Fire moves from Quilava.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png" alt="Magnemite" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Magnemite</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Electric / Steel</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Blast through with Ground or Fire moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/208.png" alt="Steelix" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Steelix (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 35</td>
              <td style="padding: 12px 16px;">Ground / Steel</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Massive physical wall. Do not use close-range physical hits! Wash it out with special **Surf** or incinerate it with **Flamethrower** from range!</td>
            </tr>
          </tbody>
        </table>

        <h2>2. Battle at the Lake of Rage & Catching the Red Gyarados</h2>
        <p>Head north to Mahogany Town and reach the Lake of Rage. Surf out to confront and catch the guaranteed Shiny **Red Gyarados (Level 30)**!</p>
        <div style="text-align: center; margin: 24px 0;">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/130.png" alt="Red Gyarados" style="max-width: 100px;" />
          <p style="font-style: italic; color: #ef4444; margin-top: 8px;">The legendary Red Gyarados at Lake of Rage!</p>
        </div>
      `;
      break;

    case 8:
      title = "Chapter 8: Storming the Rocket Hideout with Lance & Gym 7 - Pryce";
      content = `
        <h1>Chapter 8: Storming the Rocket Hideout with Lance & Gym 7 - Pryce</h1>
        <p>After managing the Red Gyarados, team up with Champion Lance to raid Team Rocket's high-tech hideout inside Mahogany Town.</p>

        <h2>1. Shutting Down the Radio Signals</h2>
        <p>Clear out the underground base, defeat the Rocket Executives, and defeat or capture the 3 power-supplying Electrode. Lance rewards you with **HM05 Whirlpool**.</p>

        <h2>2. Defeating Leader Pryce (Glacier Badge)</h2>
        <p>In HeartGold, Pryce's team is significantly higher leveled (Lvl 30-34):</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(6, 182, 212, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: center; width: 100px; color: #22d3ee;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left; color: #22d3ee;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left; color: #22d3ee;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left; color: #22d3ee;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(6, 182, 212, 0.3); text-align: left; color: #22d3ee;">Counter Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png" alt="Seel" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Seel</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 30</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Use Ampharos' Electric moves to take down this seal quickly.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png" alt="Dewgong" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dewgong</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 32</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Ice</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Electric shocks from Ampharos will fry it easily.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/221.png" alt="Piloswine" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Piloswine (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 34</td>
              <td style="padding: 12px 16px;">Ice / Ground</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Completely immune to Electric type moves! Wields **Mud Bomb** and **Blizzard**. Flood it with **Surf** or incinerate it with Fire-type moves!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 9:
      title = "Chapter 9: Liberating Saffron & Gym 8 - Clair's Draconic Wrath";
      content = `
        <h1>Chapter 9: Liberating Saffron & Gym 8 - Clair's Draconic Wrath</h1>
        <p>Settle the chaos as Team Rocket triggers a full assault on the Goldenrod Radio Tower to broadcast summons to Giovanni.</p>

        <h2>1. Goldenrod Radio Tower Liberation</h2>
        <p>Sweep through the tower, dismantle the operations, and defeat the highest executives (Proton, Petrel, Ariana, Archer). The Director hands you the ultimate **Rainbow Wing** to meet Ho-Oh.</p>

        <h2>2. Navigating the Ice Path to Defeat Clair</h2>
        <p>Traverse the freezing, slippery Ice Path (where you pick up **HM07 Waterfall**) to reach Blackthorn City and challenge Clair's devastating Dragon squad:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(99, 102, 241, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: center; width: 100px; color: #818cf8;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left; color: #818cf8;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left; color: #818cf8;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left; color: #818cf8;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(99, 102, 241, 0.3); text-align: left; color: #818cf8;">Battle Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" alt="Gyarados" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Gyarados</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 38</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Wields high-damage Dragon Rage. Strike it down instantly with 4x effective Electric moves from Ampharos.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png" alt="Dragonair" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dragonair</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 38</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Features Thunder Wave and Fire Blast. Knock it down with Ice-type moves (Ice Beam from Lapras or Jynx).</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png" alt="Dragonair" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dragonair</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 38</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Wields physical Aqua Tail. Take it down with Ice-type blows.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/230.png" alt="Kingdra" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Kingdra (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 41</td>
              <td style="padding: 12px 16px;">Water / Dragon</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Completely neutral to Ice due to its Water subtype! Spams **Dragon Pulse** and high-power **Hydro Pump**. Use a Dragon-type or execute high physical moves to chip down its health!</td>
            </tr>
          </tbody>
        </table>
        <p>After winning, swim to **Dragon's Den** behind the gym. Correctly answer the Elder's five philosophical test questions to officially receive your badge and a rare **Dratini with ExtremeSpeed**!</p>
      `;
      break;

    case 10:
      title = "Chapter 10: The Dance of Kimono Girls & Summoning Fire-God Ho-Oh";
      content = `
        <h1>Chapter 10: The Dance of Kimono Girls & Summoning Fire-God Ho-Oh</h1>
        <p>This is the highlight of Pokémon HeartGold's story, mandating a gauntlet of five tough matches before climbing the sacred tower!</p>

        <h2>1. Battling the 5 Kimono Girls Consecutively</h2>
        <p>Prepare your team thoroughly. You must defeat all 5 Eeveelutions in a row WITHOUT healing in between:</p>
        <ul>
          <li><strong>Zuki:</strong> Umbreon (Lvl 38) - Defeat with Fighting or Bug-type moves.</li>
          <li><strong>Naoko:</strong> Espeon (Lvl 38) - Pierce its low physical defense with Ghost/Dark moves.</li>
          <li><strong>Miki:</strong> Flareon (Lvl 38) - Wash it away with Water-type Surf.</li>
          <li><strong>Sayo:</strong> Jolteon (Lvl 38) - Smash it down with Ground-type Earthquake.</li>
          <li><strong>Kuni:</strong> Vaporeon (Lvl 38) - Zap it with Ampharos' Thunderbolt.</li>
        </ul>

        <h2>2. Climbing the Bell Tower to Capture Ho-Oh (Level 45)</h2>
        <p>Once cleared, the Kimono Girls assemble on top of **Bell Tower**. Ascend the high-rise structure to witness the traditional summoning dance, calling forth the fire guardian **Ho-Oh (Level 45)**!</p>
        <div style="text-align: center; margin: 24px 0;">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png" alt="Ho-Oh" style="max-width: 110px;" />
          <p style="font-style: italic; color: #ef4444; margin-top: 8px;">Sacred bird Ho-Oh appearing above the Bell Tower summit!</p>
        </div>
        <blockquote>
          <strong>eSports Tip:</strong> Ho-Oh is challenged at Level 45, wielding its unique physical move **Sacred Fire** (which has 100 power and a 50% chance to burn). Use Rock moves (dealing 4x damage) carefully to chip down its health, or induce sleep and capture it with Ultra Balls!
        </blockquote>
      `;
      break;

    case 11:
      title = "Chapter 11: Indigo Plateau - Conquering the Elite Four & Champion Lance";
      content = `
        <h1>Chapter 11: Indigo Plateau - Conquering the Elite Four & Champion Lance</h1>
        <p>Surf east of New Bark Town, scale the **Tohjo Falls**, and step onto Kanto territory. Cross the steep **Victory Road**, and defeat your Rival Silver one last time at the exit.</p>

        <h2>Challenging the Indigo League</h2>
        <p>Initiate a gauntlet of five intense matches against the most elite trainers of the region:</p>

        <h2>1. Psychic Will</h2>
        <p>Will uses mysterious Psychic power to control the battlefield:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(168, 85, 247, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: center; width: 100px; color: #c084fc;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left; color: #c084fc;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left; color: #c084fc;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left; color: #c084fc;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.3); text-align: left; color: #c084fc;">Moves & Counter Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/178.png" alt="Xatu" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Xatu</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 40</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Psychic / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses **U-turn** and **Confuse Ray**. Zap it down with Electric-type moves from Ampharos, or burn it from afar.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png" alt="Jynx" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Jynx</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ice / Psychic</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Wields sleeping **Lovely Kiss** and **Ice Punch**. Highly vulnerable to Fire; burn instantly with Typhlosion.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png" alt="Exeggutor" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Exeggutor</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Grass / Psychic</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Features **Hypnosis** and self-damaging **Wood Hammer**. Takes 4x damage from Bug moves (U-turn) or burn with Fire.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png" alt="Slowbro" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Slowbro</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Psychic</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Defensively bulky, using **Surf** and defense-boosting **Curse**. Electrocute with Ampharos or bite down with Feraligatr's Crunch.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/178.png" alt="Xatu" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Xatu (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 42</td>
              <td style="padding: 12px 16px;">Psychic / Flying</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">High Special Attack wielding **Psychic** and **Ominous Wind**. Zap down with Ampharos before it sets up Confuse Ray!</td>
            </tr>
          </tbody>
        </table>

        <h2>2. Poison Koga</h2>
        <p>Koga deploys toxic tactics to wear down your team:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(217, 70, 239, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(217, 70, 239, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: center; width: 100px; color: #f472b6;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: left; color: #f472b6;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: left; color: #f472b6;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: left; color: #f472b6;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(217, 70, 239, 0.3); text-align: left; color: #f472b6;">Tactics & Winning Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/168.png" alt="Ariados" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Ariados</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 40</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bug / Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses **Spider Web** and **Poison Jab**. Burn down quickly with Typhlosion or fly past with Lugia.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png" alt="Venomoth" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Venomoth</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 41</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bug / Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Confuses with **Supersonic**. Melt down easily with Fire moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/205.png" alt="Forretress" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Forretress</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 43</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Bug / Steel</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Sets **Toxic Spikes** and triggers **Explosion** for massive physical damage. Melts instantly to 4x Fire weakness! Burn it with Typhlosion immediately.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png" alt="Muk" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Muk</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Spams **Minimize** to boost evasion and poisons with **Toxic**. Sweep with Ground (Earthquake) or Psychic-type attacks.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/169.png" alt="Crobat" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Crobat (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 44</td>
              <td style="padding: 12px 16px;">Poison / Flying</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Extremely fast. Wields **Poison Fang** and **Air Slash**. Strike it down quickly with Ampharos' Thunderbolt.</td>
            </tr>
          </tbody>
        </table>

        <h2>3. Fighting Bruno</h2>
        <p>Bruno relies on raw muscle and pure martial prowess:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(249, 115, 22, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: center; width: 100px; color: #fb923c;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #fb923c;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #fb923c;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #fb923c;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(249, 115, 22, 0.3); text-align: left; color: #fb923c;">Moves & Counter Tactics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/237.png" alt="Hitmontop" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Hitmontop</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fighting</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses **Counter** to reflect physical damage! Avoid physical contact; blast with Psychic or special ranged moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png" alt="Hitmonlee" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Hitmonlee</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fighting</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Kicks hard with **Hi Jump Kick** and **Blaze Kick**. Sweep with Flying or Psychic types.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png" alt="Hitmonchan" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Hitmonchan</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fighting</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses elemental punches (Fire, Ice, Thunder Punch) and priority **Bullet Punch**. Sweep with Psychic moves.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" alt="Onix" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Onix</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 43</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock / Ground</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Immense physical defense but terrible Special Defense. Wash away instantly with a single Water-type Surf (4x super-effective).</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png" alt="Machamp" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Machamp (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 46</td>
              <td style="padding: 12px 16px;">Fighting</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Massive physical attack with **Cross Chop** and **Stone Edge**. Wipe out using high Special Attack Psychic moves.</td>
            </tr>
          </tbody>
        </table>

        <h2>4. Dark Karen</h2>
        <p>Karen relies on trickery and dark tactical maneuvers:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(100, 116, 139, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(100, 116, 139, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: center; width: 100px; color: #94a3b8;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: left; color: #94a3b8;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: left; color: #94a3b8;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: left; color: #94a3b8;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); text-align: left; color: #94a3b8;">Moves & Trick Countering</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png" alt="Umbreon" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Umbreon</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dark</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Incredibly tanky, using **Confuse Ray** and high-power **Payback** (if going second). Break its defenses with Fighting moves (Heracross/Machamp).</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png" alt="Vileplume" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Vileplume</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 42</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Grass / Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Uses **Petal Dance** and paralyzing **Stun Spore**. Incinerate with Fire-type attacks from Typhlosion.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Gengar</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 45</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Ghost / Poison</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Heavy special attacker with **Shadow Ball** and **Focus Blast**. Bite through with Feraligatr's Crunch or use Psychic attacks.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/198.png" alt="Murkrow" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Murkrow</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 44</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dark / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Fast, steals held berry items with **Pluck**. Electrocut instantly with Ampharos' Thunderbolt.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/229.png" alt="Houndoom" style="max-width:40px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #fbbf24;">Houndoom (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 47</td>
              <td style="padding: 12px 16px;">Dark / Fire</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Extreme Special Attack wielding **Flamethrower** and **Dark Pulse** (can use **Nasty Plot** to double power). Drown with Water-type Surf to secure victory!</td>
            </tr>
          </tbody>
        </table>

        <h2>5. Champion Lance - The Dragon Master</h2>
        <p>The ultimate clash against Lance's trio of high-power physical Dragonites:</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(245, 158, 11, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: center; width: 100px; color: #fcd34d;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: left; color: #fcd34d;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: left; color: #fcd34d;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: left; color: #fcd34d;">Type</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(245, 158, 11, 0.3); text-align: left; color: #fcd34d;">Winning Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png" alt="Gyarados" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Gyarados</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 46</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Water / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Features painful Dragon Rage. Exploit its 4x weakness using Electric shocks from Ampharos.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="Charizard" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Charizard</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 48</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Fire / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Fierce Air Slash. Strike it down with Rock moves or drown it with Surf.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png" alt="Aerodactyl" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Aerodactyl</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 48</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Rock / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Extremely fast. Spams Rock Slide. Zap with Thunderbolt instantly.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png" alt="Dragonite" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #cbd5e1;">Dragonite x2</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 49</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Dragon / Flying</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Wields Outrage and Hyper Beam. Fire Ice Beam (4x damage) to freeze them out quickly.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png" alt="Dragonite" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Dragonite (Signature)</td>
              <td style="padding: 12px 16px;">Lvl 50</td>
              <td style="padding: 12px 16px;">Dragon / Flying</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Absolutely devastating physical power. Target its 4x Ice weakness to secure the victory and become the new Johto Champion!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 12:
      title = "Chapter 12: Conquering Kanto & The Ultimate Battle against Red at Mt. Silver";
      content = `
        <h1>Chapter 12: Conquering Kanto & The Ultimate Battle against Red at Mt. Silver</h1>
        <p>After your victory at the league, board the S.S. Aqua to Vermilion City and begin exploring the iconic Kanto region.</p>

        <h2>1. Conquering the 8 Kanto Gyms</h2>
        <p>Defeat the legendary gym leaders of Kanto:</p>
        <ul>
          <li><strong>Lt. Surge (Lvl 51-53):</strong> Electric master. Sweep with Earthquake.</li>
          <li><strong>Sabrina (Lvl 53-55):</strong> Psychic wizard. Target its low physical defense with Ghost/Dark moves.</li>
          <li><strong>Misty (Lvl 54-56):</strong> Water leader. Electrocut with Ampharos' Thunderbolt.</li>
          <li><strong>Erika (Lvl 51-56):</strong> Grass master. Burn with Quilava's fire.</li>
          <li><strong>Janine (Lvl 47-50):</strong> Poison expert. Sweep with Psychic or Ground moves.</li>
          <li><strong>Brock (Lvl 51-54):</strong> Rock solid. Wipe out with Surf.</li>
          <li><strong>Blaine (Lvl 54-59):</strong> Fire expert. Drown with Surf.</li>
          <li><strong>Blue (Lvl 55-60):</strong> Upgraded all-rounder squad. Prepare a highly balanced team for this ultimate rivalry showdown!</li>
        </ul>

        <h2>2. Battle against Legend Red at Mt. Silver</h2>
        <p>Climb the freezing Mt. Silver. At the peak, face **Trainer Red**, wielding the most powerful team in franchise history at Level 88, enveloped in continuous hailing snow!</p>

        <table style="width:100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; overflow: hidden; background-color: rgba(15, 15, 25, 0.5);">
          <thead>
            <tr style="background-color: rgba(239, 68, 68, 0.15);">
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: center; width: 100px; color: #f87171;">Sprite</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Pokémon</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Level</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Signature Moves</th>
              <th style="padding: 12px 16px; border-bottom: 2px solid rgba(239, 68, 68, 0.3); text-align: left; color: #f87171;">Winning Tactic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Pikachu (Signature)</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Lvl 88</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Volt Tackle, Iron Tail</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Holds a Light Ball, doubling its Attack and Special Attack! Strike it down instantly with a Ground move (Earthquake) before it tears your team apart!</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" alt="Snorlax" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold;">Snorlax</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 82</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Blizzard, Giga Impact</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Extremely bulky. Uses 100% accurate Blizzard in the hail. Break its defense with heavy physical Fighting moves from Machamp!</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png" alt="Lapras" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #60a5fa;">Lapras</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 80</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Blizzard, Surf, Brine</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Unaffected by the hail. Electrocut it down with Electric moves from Ampharos.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" alt="Venusaur" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Venusaur</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 84</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Frenzy Plant, Sleep Powder</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Spams Sleep Powder and heavy Grass moves. Burn it down with Ho-Oh's Sacred Fire.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" alt="Blastoise" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #3b82f6;">Blastoise</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Lvl 84</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Hydro Cannon, Blizzard</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Strikes hard with Special attacks. Electrocute with Ampharos to shut it down.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="Charizard" style="max-width:45px;" />
              </td>
              <td style="padding: 12px 16px; font-weight: bold; color: #ef4444;">Charizard</td>
              <td style="padding: 12px 16px;">Lvl 84</td>
              <td style="padding: 12px 16px;">Blast Burn, Flare Blitz</td>
              <td style="padding: 12px 16px; color: #cbd5e1;">Unleashes massive fire-type blows. Drown it with Water-type Surf to wrap up this legendary duel!</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 13:
      title = "Chapter 13: Complete HMs, Key Items & Trades in HeartGold";
      content = `
        <h1>Chapter 13: Complete HMs, Key Items & Trades in HeartGold</h1>
        <p>A complete reference guide for HMs, key quest tools, and in-game trades across Johto and Kanto:</p>

        <h2>1. All 8 Hidden Machines (HMs)</h2>
        <ul>
          <li><strong>HM01 Cut:</strong> Obtained in Ilex Forest after capturing the stray Farfetch'd.</li>
          <li><strong>HM02 Fly:</strong> Gifted by Chuck's wife outside Cianwood Gym after defeating him.</li>
          <li><strong>HM03 Surf:</strong> Received from Ecruteak Dance Theater after defeating the 5 Kimono Girls.</li>
          <li><strong>HM04 Strength:</strong> Given by an NPC on Route 42.</li>
          <li><strong>HM05 Whirlpool:</strong> Gifted by Lance inside the Mahogany Rocket Hideout.</li>
          <li><strong>HM06 Rock Smash:</strong> Received from an NPC on Route 36 after bypassing Sudowoodo.</li>
          <li><strong>HM07 Waterfall:</strong> Located on the bottom floor of the Ice Path.</li>
          <li><strong>HM08 Rock Climb:</strong> Gifted by Professor Oak in Pallet Town after earning all 16 badges.</li>
        </ul>

        <h2>2. Key Specialty Items</h2>
        <ul>
          <li><strong>GB Sounds:</strong> Received post-game from Game Freak inside Celadon Condominiums. Reverts all in-game music to retro Gen 2 chiptunes!</li>
          <li><strong>Bicycle:</strong> Gifted in Goldenrod City's bike shop.</li>
          <li><strong>SecretPotion:</strong> Retrieved from Cianwood pharmacy to cure Amphy.</li>
        </ul>
      `;
      break;

    case 14:
      title = "Chapter 14: Rare & Legendary Pokémon Secrets in HeartGold";
      content = `
        <h1>Chapter 14: Rare & Legendary Pokémon Secrets in HeartGold</h1>
        <p>HeartGold offers the grandest sanctuary for hunting legendary titans in Gen 4:</p>

        <h2>1. Oceanic Guardian Lugia (Whirl Islands - Level 70)</h2>
        <p>With the **Silver Wing** acquired from Pewter City, Surf into the depths of the Whirl Islands to confront **Lugia (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png" style="max-width:32px; vertical-align:middle;" />.</p>

        <h2>2. Tracking the Luminous Suicune (Cerulean Cape - Level 40)</h2>
        <p>Suicune does not roam randomly! Spot it at Violet City, Route 36, Cianwood, Route 42, Vermilion City, and finally capture it at Cerulean Cape in Kanto (**Suicune, Level 40**) <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png" style="max-width:32px; vertical-align:middle;" />.</p>

        <h2>3. Ancient Shadow Mewtwo (Cerulean Cave - Level 70)</h2>
        <p>Surf past Saffron/Cerulean channels to enter Cerulean Cave. Battle the legendary **Mewtwo (Level 70)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" style="max-width:32px; vertical-align:middle;" /> at the bottom floor.</p>

        <h2>4. Primordial Gods: Kyogre & Rayquaza (Embedded Tower)</h2>
        <p>In the post-game, receive the **Blue Orb** from Mr. Pokémon. Climb the Embedded Tower on Route 47 to capture **Kyogre (Level 50)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png" style="max-width:32px; vertical-align:middle;" />. Trade a SoulSilver Groudon and show both to Oak to unlock **Rayquaza (Level 50)** <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png" style="max-width:32px; vertical-align:middle;" />!</p>
      `;
      break;

    case 15:
      title = "Chapter 15: Post-Game Johto Battle Frontier & Essential Competitive Items";
      content = `
        <h1>Chapter 15: Post-Game Johto Battle Frontier & Essential Competitive Items</h1>
        <p>Defeating Red unlocks the ultimate competitive arena at the **Battle Frontier** situated off Route 40.</p>

        <h2>1. Conquering the 5 Frontier Facilities</h2>
        <p>Pit your competitive strategy against the Frontier Brains:</p>
        <ul>
          <li><strong>Battle Tower:</strong> Standard 3v3 battles. Maintain high streaks to face Tower Tycoon Palmer.</li>
          <li><strong>Battle Factory:</strong> Rent random rental squads and out-strategize Thornton.</li>
          <li><strong>Battle Castle:</strong> Earn CP to purchase items, heals, or spy on Darach.</li>
          <li><strong>Battle Arcade:</strong> Spin the roulette to apply status effects and battle Dahlia.</li>
          <li><strong>Battle Hall:</strong> Extreme 1v1 type-based survival against Argenta.</li>
        </ul>

        <h2>2. Competitive Held Items Index</h2>
        <p>Enhance your builds with these elite held items:</p>

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
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #10b981;">Leftovers</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Restores 1/16th maximum HP at the end of each turn.</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Found on Victory Road bottom floor, or held by wild Snorlax.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #fbbf24;">Choice Band</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boosts Physical Attack stat by 50% but locks the holder into their first selected move.</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Redeem with Battle Points (BP) inside the Frontier Lobby.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #38bdf8;">Choice Specs</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boosts Special Attack stat by 50% but restricts usage to a single move.</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Found on Route 36 or purchased with BP.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #a855f7;">Choice Scarf</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Boosts Speed stat by 50% but restricts usage to a single move.</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Elite Gen 4 competitive addition! Purchase with BP at the exchange.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-weight: bold; color: #ec4899;">Life Orb</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1;">Enhances all attack damages by 30% but consumes 10% maximum HP on every hit.</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">Located inside Stark Mountain volcano, or purchased with BP.</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight: bold; color: #f43f5e;">Focus Sash</td>
              <td style="padding: 12px 16px;">Ensures holding onto 1 HP if hit by a single fatal blow from maximum health.</td>
              <td style="padding: 12px 16px;">Gifted by the Route 221 elder daily, or bought with BP.</td>
            </tr>
          </tbody>
        </table>
      `;
      break;
  }

  return {
    gameVersion: "heartgold",
    chapterTitle: title,
    order: viChapter.order,
    language: "en",
    content: content
  };
});
