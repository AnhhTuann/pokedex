import { SUN_CHAPTERS } from './walkthrough-sun.js';

export const MOON_CHAPTERS = SUN_CHAPTERS.map(chapter => {
  let content = chapter.content;

  // General replacements
  content = content
    .replace(/sun/g, 'moon')
    .replace(/Sun/g, 'Moon')
    .replace(/Pokémon Sun/g, 'Pokémon Moon')
    .replace(/bản Pokémon Sun/g, 'bản Pokémon Moon')
    .replace(/phiên bản Pokémon Sun/g, 'phiên bản Pokémon Moon')
    .replace(/Sáo Mặt Trời/g, 'Sáo Mặt Trăng')
    .replace(/Sun Flute/g, 'Moon Flute')
    .replace(/Altar of the Sunne/g, 'Altar of the Moone');

  // Legendary replacements
  content = content
    .replace(/Solgaleo/g, 'Lunala')
    .replace(/Thần Mặt Trời/g, 'Thần Mặt Trăng')
    .replace(/sư tử thái dương/g, 'dơi mặt trăng huyền ảo')
    .replace(/Thái Dương Sư Solgaleo/g, 'Nguyệt Dạ Thần Lunala')
    .replace(/Solar Beast/g, 'Lunar Beast')
    .replace(/other\/official-artwork\/791\.png/g, 'other/official-artwork/792.png')
    .replace(/sprites\/pokemon\/791\.png/g, 'sprites/pokemon/792.png');

  // Totem Gumshoos to Totem Alolan Raticate (Moon exclusive)
  content = content
    .replace(/Totem Gumshoos/g, 'Totem Alolan Raticate')
    .replace(/Thường \(Normal\)/g, 'Thường \/ Bóng tối \(Normal\/Dark\)')
    .replace(/sprites\/pokemon\/735\.png/g, 'sprites/pokemon/10092.png')
    .replace(/Gumshoos sở hữu sức tấn công vật lý rất mạnh/g, 'Alolan Raticate sở hữu song hệ Thường/Bóng tối và đòn răng nanh cắn nát sắt thép')
    .replace(/Packs heavy physical punch\./g, 'Alolan Raticate packs Normal/Dark typing with bone-crushing bites.');

  // UB-02 Buzzwole to UB-02 Pheromosa (Moon exclusive)
  content = content
    .replace(/UB-02 Absorption \(Buzzwole - Lvl 65\):<\/strong> Muỗi cơ bắp khổng lồ \(Chỉ có trong bản Pokémon Moon!\)/g, 'UB-02 Beauty (Pheromosa - Lvl 65):</strong> Gián kiêu sa lộng lẫy (Chỉ có trong bản Pokémon Moon!)')
    .replace(/UB-02 Absorption \(Buzzwole - Level 65\):<\/strong> Muscular mosquito \(Moon exclusive!\)/g, 'UB-02 Beauty (Pheromosa - Level 65):</strong> Elegant beauty roach (Moon exclusive!)')
    .replace(/sprites\/pokemon\/794\.png/g, 'sprites/pokemon/795.png');

  // UB-04 Kartana to UB-04 Celesteela (Moon exclusive)
  content = content
    .replace(/UB-04 Blade \(Kartana - Lvl 60\):<\/strong> Bọ lá kiếm sắc bén \(Chỉ có trong bản Pokémon Moon!\)/g, 'UB-04 Blaster (Celesteela - Lvl 60):</strong> Tên lửa tre khổng lồ cực trâu (Chỉ có trong bản Pokémon Moon!)')
    .replace(/UB-04 Blade \(Kartana - Level 60\):<\/strong> Sword leaf insect \(Moon exclusive!\)/g, 'UB-04 Blaster (Celesteela - Level 60):</strong> Giant steel bamboo rocket (Moon exclusive!)')
    .replace(/sprites\/pokemon\/798\.png/g, 'sprites/pokemon/797.png');

  let chapterTitle = chapter.chapterTitle
    .replace(/Sun/g, 'Moon')
    .replace(/Mặt Trời/g, 'Mặt Trăng');

  return {
    ...chapter,
    gameVersion: 'moon',
    chapterTitle,
    content
  };
});
