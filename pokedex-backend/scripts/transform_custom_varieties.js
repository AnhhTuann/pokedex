import fs from 'fs';

const filePath = 'scripts/reseed_megas_exact.ts';
const code = fs.readFileSync(filePath, 'utf8');

const startIdx = code.indexOf('const customVarieties = [');
const endIdx = code.indexOf('];', startIdx) + 2;

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find customVarieties array');
  process.exit(1);
}

const arrayStr = code.substring(startIdx, endIdx);
const arrayLines = arrayStr.split('\n');

const newLines = arrayLines.map(line => {
  if (!line.includes('baseId:')) return line;
  
  // Extract baseId
  const baseIdMatch = line.match(/baseId:\s*(\d+)/);
  // Extract image
  const imageMatch = line.match(/image:\s*"([^"]+)"/);
  
  if (!baseIdMatch || !imageMatch) return line;
  
  const baseId = baseIdMatch[1];
  const oldImage = imageMatch[1];
  
  // Rule 1: Get filename and strip #
  let filename = oldImage.substring(oldImage.lastIndexOf('/') + 1);
  filename = filename.replace('#', '');
  const newImage = `/custom_sprites/${filename}`;
  
  // Rule 2: shinyImage: /custom_sprites/shiny/{baseId}-mega.png
  const newShiny = `/custom_sprites/shiny/${baseId}-mega.png`;
  
  let newLine = line.replace(/image:\s*"[^"]+"/, `image: "${newImage}"`);
  newLine = newLine.replace(/shinyImage:\s*"[^"]+"/, `shinyImage: "${newShiny}"`);
  
  return newLine;
});

const newArrayStr = newLines.join('\n');
const newCode = code.substring(0, startIdx) + newArrayStr + code.substring(endIdx);

fs.writeFileSync(filePath, newCode, 'utf8');
console.log('TRANSFORM_SUCCESS');
