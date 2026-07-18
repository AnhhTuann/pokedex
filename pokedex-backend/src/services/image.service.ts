import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_IMAGES_DIR = path.resolve(process.cwd(), 'public', 'images');

export const downloadAndOptimizeImage = async (url: string, relativePath: string): Promise<string | null> => {
  try {
    if (!url) return null;

    // Fetch the image from URL
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch image from ${url}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure directory exists
    const fullPath = path.join(PUBLIC_IMAGES_DIR, relativePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Convert to WebP and save
    await sharp(buffer)
      .webp({ quality: 80 })
      .toFile(fullPath);

    // Return the relative URL for the frontend to consume
    return `/images/${relativePath.replace(/\\/g, '/')}`;
  } catch (error) {
    console.error(`Error downloading or optimizing image from ${url}:`, error);
    return null;
  }
};
