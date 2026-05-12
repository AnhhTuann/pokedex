import { X_CHAPTERS, ENGLISH_X_CHAPTERS } from './walkthrough-x.js';

// Custom replacements for Vietnamese Y Walkthrough
export const Y_CHAPTERS = X_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // General Replacements
  content = content
    .replace(/Pokémon X/g, 'Pokémon Y')
    .replace(/bản X/g, 'bản Y')
    .replace(/phiên bản X/g, 'phiên bản Y')
    .replace(/gameVersion: 'x'/g, "gameVersion: 'y'");

  // Chapter 3: Charizardite X -> Y
  if (chapter.order === 3) {
    content = content
      .replace(/Charizardite X/g, 'Charizardite Y')
      .replace(/Mega Charizard X cực ngầu mang song hệ Lửa \/ Rồng tuyệt mỹ!/g, 'Mega Charizard Y cực kỳ uy nghi với đặc tính Drought gọi nắng tăng sát thương hệ Lửa lên tầm vũ trụ!')
      .replace(/<strong>Bản sắc độc quyền Pokémon X:<\/strong>[\s\S]+?\(hệ Lửa\/Bay chuyên tấn công đặc biệt\)\./,
        `<strong>Bản sắc độc quyền Pokémon Y:</strong> Nếu bạn chơi phiên bản Y, Charmander khi tiến hóa thành Charizard và giữ viên đá <strong>Charizardite Y</strong> sẽ tiến hóa Mega thành <strong>Mega Charizard Y</strong> mang song hệ Lửa/Bay truyền thống nhưng sở hữu đặc tính triệu hồi nắng gắt <strong>Drought</strong> cực kỳ mạnh mẽ, nâng tầm sát thương hệ Lửa lên mức hủy diệt.`);
  }

  // Chapter 10: Xerneas -> Yveltal
  if (chapter.order === 10) {
    content = content
      .replace(/Xerneas/g, 'Yveltal')
      .replace(/Thần Nai Rừng Xanh/g, 'Tử thần Bóng tối')
      .replace(/hệ Tiên \(Fairy\)/g, 'song hệ Bóng tối / Bay (Dark/Flying)')
      .replace(/716\.png/g, '717.png')
      .replace(/Moonblast của Yveltal/g, 'Oblivion Wing của Yveltal')
      .replace(/tiên thuật/g, 'chiêu thức hệ Bay');
  }

  // Chapter 12: Moonblast of Xerneas -> Oblivion Wing of Yveltal
  if (chapter.order === 12) {
    content = content
      .replace(/Moonblast của Xerneas/g, 'Oblivion Wing của Yveltal (Hút máu cực khủng!)')
      .replace(/Xerneas/g, 'Yveltal');
  }

  // Chapter 15: Mewtwonite X -> Mewtwonite Y for Pokémon Y
  if (chapter.order === 15) {
    content = content
      .replace(/<strong>Mewtwonite X<\/strong> \(Biến Mewtwo thành Mega Mewtwo X mang song hệ Siêu Linh\/Giác Đấu với chỉ số Tấn công Vật lý 190 hủy diệt\) hoặc <strong>Mewtwonite Y<\/strong> \(Biến thành Mega Mewtwo Y cực mạnh phép thuật\)/g,
        '<strong>Mewtwonite Y</strong> (Biến Mewtwo thành Mega Mewtwo Y mang hệ Siêu Linh thuần túy với sức mạnh Tấn công đặc biệt tối thượng chạm đỉnh vũ trụ) hoặc <strong>Mewtwonite X</strong> (Biến thành Mega Mewtwo X cực mạnh vật lý)')
      .replace(/Thần Nai Sinh Mệnh: Xerneas/g, 'Thần Chim Hủy Diệt: Yveltal')
      .replace(/716\.png/g, '717.png')
      .replace(/Fairy-type/g, 'Dark/Flying-type')
      .replace(/hệ Tiên \(Fairy\) thuần túy/g, 'song hệ Bóng Tối / Bay (Dark/Flying)')
      .replace(/Fairy Aura/g, 'Dark Aura');
  }

  let chapterTitle = chapter.chapterTitle
    .replace(/Pokémon X/g, 'Pokémon Y');

  return {
    ...chapter,
    gameVersion: 'y',
    chapterTitle,
    content
  };
});

// Custom replacements for English Y Walkthrough
export const ENGLISH_Y_CHAPTERS = ENGLISH_X_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // General Replacements
  content = content
    .replace(/Pokémon X/g, 'Pokémon Y')
    .replace(/in X/g, 'in Y')
    .replace(/Exclusive Mega Stone in X/g, 'Exclusive Mega Stone in Y')
    .replace(/gameVersion: 'x'/g, "gameVersion: 'y'");

  // Chapter 3: Charizardite X -> Y
  if (chapter.order === 3) {
    content = content
      .replace(/Charizardite X/g, 'Charizardite Y')
      .replace(/Charizardite X \(Evolves into Mega Charizard X, a blue-flamed Fire\/Dragon type!\)/g, 'Charizardite Y (Evolves into Mega Charizard Y, a traditional Fire/Flying type with the Drought ability!)')
      .replace(/<strong>Mega Charizard X Exclusive:<\/strong>[\s\S]+?In Y, it becomes Fire\/Flying\./,
        `<strong>Mega Charizard Y Exclusive:</strong> In Pokémon Y, Charizard evolves into <strong>Mega Charizard Y</strong> using the <strong>Charizardite Y</strong> stone, keeping its Fire/Flying typing but gaining the magnificent <strong>Drought</strong> ability to boost fire-type damage to extreme heights!`);
  }

  // Chapter 10: Xerneas -> Yveltal
  if (chapter.order === 10) {
    content = content
      .replace(/Xerneas/g, 'Yveltal')
      .replace(/legendary life stag/g, 'legendary destruction bird')
      .replace(/Fairy-type Legend/g, 'Dark/Flying-type Legend')
      .replace(/716\.png/g, '717.png')
      .replace(/Moonblast of Yveltal/g, 'Oblivion Wing of Yveltal');
  }

  // Chapter 12: Moonblast of Xerneas -> Oblivion Wing of Yveltal
  if (chapter.order === 12) {
    content = content
      .replace(/Moonblast of Xerneas/g, 'Oblivion Wing of Yveltal')
      .replace(/Xerneas/g, 'Yveltal');
  }

  // Chapter 15: Mewtwonite X -> Mewtwonite Y for Pokémon Y
  if (chapter.order === 15) {
    content = content
      .replace(/<strong>Mewtwonite X<\/strong> \(in Pokémon X, transforms Mewtwo into a physical powerhouse, Psychic\/Fighting type\) or Mewtwonite Y \(in Pokémon Y\)/g,
        '<strong>Mewtwonite Y</strong> (in Pokémon Y, transforms Mewtwo into a special attack deity, pure Psychic type) or Mewtwonite X (in Pokémon X)')
      .replace(/The Life Deity: Xerneas/g, 'The Destruction Deity: Yveltal')
      .replace(/716\.png/g, '717.png')
      .replace(/pure Fairy-type/g, 'Dark / Flying-type')
      .replace(/Fairy Aura/g, 'Dark Aura');
  }

  let chapterTitle = chapter.chapterTitle
    .replace(/Pokémon X/g, 'Pokémon Y');

  return {
    ...chapter,
    gameVersion: 'y',
    chapterTitle,
    content
  };
});
