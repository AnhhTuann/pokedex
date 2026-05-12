import { OMEGA_RUBY_CHAPTERS } from './walkthrough-omega-ruby.js';

export const ALPHA_SAPPHIRE_CHAPTERS = OMEGA_RUBY_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // General replacements
  content = content
    .replace(/omega-ruby/g, 'alpha-sapphire')
    .replace(/Omega Ruby/g, 'Alpha Sapphire')
    .replace(/omega ruby/g, 'alpha sapphire')
    .replace(/bản Omega Ruby/g, 'bản Alpha Sapphire')
    .replace(/phiên bản Omega Ruby/g, 'phiên bản Alpha Sapphire')
    .replace(/Ruby/g, 'Sapphire')
    .replace(/ruby/g, 'sapphire')
    .replace(/bản Ruby/g, 'bản Sapphire');

  // Villain and Team replacements
  content = content
    .replace(/Team Magma/g, 'Team Aqua')
    .replace(/băng Magma/g, 'băng Aqua')
    .replace(/Magma Grunts/g, 'Aqua Grunts')
    .replace(/Magma Grunt/g, 'Aqua Grunt')
    .replace(/Magma Hideout/g, 'Aqua Hideout')
    .replace(/Maxie/g, 'Archie')
    .replace(/Courtney/g, 'Matt');

  // Legendaries, Sprites, and weather abilities
  content = content
    // Groudon to Kyogre
    .replace(/Primal Groudon/g, 'Primal Kyogre')
    .replace(/Groudon/g, 'Kyogre')
    .replace(/official-artwork\/10077\.png/g, 'official-artwork/10078.png')
    .replace(/sprites\/pokemon\/10077\.png/g, 'sprites/pokemon/10078.png')
    .replace(/Red Orb/g, 'Blue Orb')
    .replace(/Hỏa Ngọc/g, 'Lam Ngọc')
    .replace(/Cổ Đại Thần Thú Primal Groudon mang hỏa hỏa rực cháy khổng lồ!/g, 'Cổ Đại Thần Thú Primal Kyogre khơi dậy đại dương sâu thẳm khổng lồ!')
    // Desolate Land to Primordial Sea
    .replace(/đặc tính <strong>Desolate Land<\/strong> của nó tạo thời tiết cực đoan khiến \*\*toàn bộ đòn tấn công hệ Nước bốc hơi vô dụng ngay lập tức!\*\*/g, 'đặc tính <strong>Primordial Sea</strong> của nó tạo mưa dông bão bùng cực đoan khiến **toàn bộ đòn tấn công hệ Lửa bốc hơi vô dụng ngay lập tức!**')
    .replace(/\*\*Desolate Land\*\* weather ability \*\*completely evaporates all Water-type attacks!\*\*/g, '**Primordial Sea** weather ability **completely evaporates all Fire-type attacks!**')
    .replace(/Đừng dùng chiêu hệ Nước\. Hãy hạ gục nó bằng đòn \*\*Đất \(Ground\)\*\* mạnh mẽ/g, 'Đừng dùng chiêu hệ Lửa. Hãy hạ gục nó bằng đòn **Điện (Electric)** hoặc **Cỏ (Grass)** mạnh mẽ')
    .replace(/Avoid Water moves\./g, 'Avoid Fire moves.')
    // Latios to Latias
    .replace(/Latios/g, 'Latias')
    .replace(/sprites\/pokemon\/381\.png/g, 'sprites/pokemon/380.png')
    .replace(/Ho-Oh/g, 'Lugia')
    .replace(/phượng hoàng lửa \*\*Ho-Oh\*\*/g, 'rồng biển sâu vĩ đại \*\*Lugia\*\*')
    .replace(/Dialga/g, 'Palkia')
    .replace(/rồng thời gian \*\*Dialga\*\*/g, 'rồng không gian \*\*Palkia\*\*')
    .replace(/Palkia/g, 'Dialga'); // Swap counter-part if needed

  let chapterTitle = chapter.chapterTitle
    .replace(/Omega Ruby/g, 'Alpha Sapphire')
    .replace(/Ruby/g, 'Sapphire');

  return {
    ...chapter,
    gameVersion: 'alpha-sapphire',
    chapterTitle,
    content
  };
});
