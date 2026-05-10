import { RED_CHAPTERS, ENGLISH_RED_CHAPTERS } from './walkthrough-red.js';

export const BLUE_CHAPTERS = RED_CHAPTERS.map(chapter => ({
  ...chapter,
  gameVersion: 'blue',
  chapterTitle: chapter.chapterTitle
    .replace(/Pokémon Red/g, 'Pokémon Blue')
    .replace(/phần Red/g, 'phần Blue')
    .replace(/Red/g, 'Blue'),
  content: chapter.content
    .replace(/Pokémon Red/g, 'Pokémon Blue')
    .replace(/Pokémon Đỏ/g, 'Pokémon Xanh Dương')
    .replace(/phiên bản Red/g, 'phiên bản Blue')
    .replace(/Red/g, 'Blue')
}));

export const ENGLISH_BLUE_CHAPTERS = ENGLISH_RED_CHAPTERS.map(chapter => ({
  ...chapter,
  gameVersion: 'blue',
  chapterTitle: chapter.chapterTitle
    .replace(/Pokémon Red/g, 'Pokémon Blue')
    .replace(/Red/g, 'Blue'),
  content: chapter.content
    .replace(/Pokémon Red/g, 'Pokémon Blue')
    .replace(/Red/g, 'Blue')
}));
