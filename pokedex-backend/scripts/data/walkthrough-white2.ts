import { BLACK2_CHAPTERS, ENGLISH_BLACK2_CHAPTERS } from './walkthrough-black2.js';

// Custom replacements for Vietnamese White 2 Walkthrough
export const WHITE2_CHAPTERS = BLACK2_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // General Replacements
  content = content
    .replace(/Pokémon Black 2/g, 'Pokémon White 2')
    .replace(/Black 2/g, 'White 2')
    .replace(/bản Black 2/g, 'bản White 2')
    .replace(/phiên bản Black 2/g, 'phiên bản White 2')
    .replace(/gameVersion: 'black-2'/g, "gameVersion: 'white-2'")
    .replace(/gameVersion: "black-2"/g, "gameVersion: 'white-2'");

  // Chapter 8: Opelucid City traditional aesthetic
  if (chapter.order === 8) {
    content = content
      .replace(/thành phố công nghệ cơ khí tương lai \*\*Opelucid City\*\* \(trong Pokémon Black 2, thành phố Opelucid được bao trùm bởi phong cách viễn tưởng rực sáng neon xanh cực kỳ tương lai!\)/g,
        'thành phố cổ kính truyền thống **Opelucid City** (trong Pokémon White 2, thành phố Opelucid được bao trùm bởi phong cách mộc mạc, kiến trúc gỗ tự nhiên và giai điệu cổ xưa vô cùng ấm áp!)');
  }

  // Chapter 11: Zekrom -> Reshiram, Black Kyurem -> White Kyurem
  if (chapter.order === 11) {
    content = content
      .replace(/rồng đen Zekrom/g, 'rồng trắng Reshiram')
      .replace(/Black Kyurem/g, 'White Kyurem')
      .replace(/646-black\.png/g, '646-white.png')
      .replace(/Ác Long Sấm Sét/g, 'Ác Long Rực Lửa')
      .replace(/bạo chúa rồng điện tối cao/g, 'bạo chúa rồng lửa tối cao')
      .replace(/rống gầm gớm ghiếc tàn phá lôi giăng bão bùng!/g, 'rống gầm gớm ghiếc phun lửa thiêu rụi trời đất!')
      .replace(/Thần Thú Kết Hợp Black Kyurem/g, 'Thần Thú Kết Hợp White Kyurem')
      .replace(/rồng đen/g, 'rồng trắng')
      .replace(/Kyurem Điện/g, 'Kyurem Lửa');
  }

  // Chapter 14: Post-game dungeons
  if (chapter.order === 14) {
    content = content
      .replace(/Black Tower/g, 'White Treehollow')
      .replace(/Tháp Đen \(Black Tower\)/g, 'Loại Cây Trắng (White Treehollow)')
      .replace(/Thành Phố Đen \(Black City\)/g, 'Khu Rừng Trắng (White Forest)')
      .replace(/Black City/g, 'White Forest')
      .replace(/Shiny Gible/g, 'Shiny Dratini')
      .replace(/Gible sáng loáng/g, 'Dratini sáng loáng')
      .replace(/443\.png/g, '147.png') // Gible sprite to Dratini sprite
      .replace(/gible/g, 'dratini');
  }

  // Chapter 16: Version exclusives (Latios -> Latias, Registeel -> Regice)
  if (chapter.order === 16) {
    content = content
      .replace(/Latios/g, 'Latias')
      .replace(/381\.png/g, '380.png')
      .replace(/Registeel/g, 'Regice')
      .replace(/379\.png/g, '378.png')
      .replace(/Thần hộ vệ Latios/g, 'Thần hộ vệ Latias')
      .replace(/Latios \(Bản Black 2 độc quyền\)/g, 'Latias (Bản White 2 độc quyền)')
      .replace(/Registeel \(Bản Black 2 độc quyền\)/g, 'Regice (Bản White 2 độc quyền)');
  }

  let chapterTitle = chapter.chapterTitle
    .replace(/Pokémon Black 2/g, 'Pokémon White 2')
    .replace(/Black 2/g, 'White 2');

  return {
    ...chapter,
    gameVersion: 'white-2',
    chapterTitle,
    content
  };
});

// Custom replacements for English White 2 Walkthrough
export const ENGLISH_WHITE2_CHAPTERS = ENGLISH_BLACK2_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // General Replacements
  content = content
    .replace(/Pokémon Black 2/g, 'Pokémon White 2')
    .replace(/Black 2/g, 'White 2')
    .replace(/in Black 2/g, 'in White 2')
    .replace(/gameVersion: 'black-2'/g, "gameVersion: 'white-2'")
    .replace(/gameVersion: "black-2"/g, "gameVersion: 'white-2'");

  // Chapter 8: Opelucid City traditional aesthetic
  if (chapter.order === 8) {
    content = content
      .replace(/futuristic tech metropolis of \*\*Opelucid City\*\* \(which in Black 2 features a high-tech neon blue aesthetic!\)/g,
        'traditional rustic city of **Opelucid City** (which in White 2 features a historic, wooden architecture and warm ancient aesthetic!)');
  }

  // Chapter 11: Zekrom -> Reshiram, Black Kyurem -> White Kyurem
  if (chapter.order === 11) {
    content = content
      .replace(/Zekrom/g, 'Reshiram')
      .replace(/Black Kyurem/g, 'White Kyurem')
      .replace(/646\.png/g, '646-white.png') // Note: white-2 uses white Kyurem sprite
      .replace(/Electric Dragon/g, 'Fire Dragon')
      .replace(/lightning monster/g, 'fire monster')
      .replace(/electric dragon/g, 'fire dragon')
      .replace(/roaring with thunderous power!/g, 'roaring with magnificent blazing fire!')
      .replace(/The sấm-giật dragon/g, 'The rực-lửa dragon');
  }

  // Chapter 14: Post-game dungeons
  if (chapter.order === 14) {
    content = content
      .replace(/Black Tower/g, 'White Treehollow')
      .replace(/Black City/g, 'White Forest')
      .replace(/Shiny Gible/g, 'Shiny Dratini')
      .replace(/443\.png/g, '147.png') // Gible sprite to Dratini sprite
      .replace(/gible/g, 'dratini');
  }

  // Chapter 16: Version exclusives (Latios -> Latias, Registeel -> Regice)
  if (chapter.order === 16) {
    content = content
      .replace(/Latios/g, 'Latias')
      .replace(/381\.png/g, '380.png')
      .replace(/Registeel/g, 'Regice')
      .replace(/379\.png/g, '378.png')
      .replace(/Latios \(Black 2 Exclusive\)/g, 'Latias (White 2 Exclusive)')
      .replace(/Registeel \(Black 2 Exclusive\)/g, 'Regice (White 2 Exclusive)');
  }

  let chapterTitle = chapter.chapterTitle
    .replace(/Pokémon Black 2/g, 'Pokémon White 2')
    .replace(/Black 2/g, 'White 2');

  return {
    ...chapter,
    gameVersion: 'white-2',
    chapterTitle,
    content
  };
});
