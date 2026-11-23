import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_IMAGES_DIR = path.resolve(process.cwd(), 'public', 'images');
const FETCH_TIMEOUT_MS = 15_000;
const MAX_SOURCE_BYTES = 15 * 1024 * 1024;

/**
 * Downloads an image and stores it as a local WebP asset.
 * Existing files are never overwritten; the stable URL is returned as-is.
 */
export const downloadAndOptimizeImage = async (
  url: string,
  relativePath: string
): Promise<string | null> => {
  try {
    if (!url) return null;

    const normalizedRelativePath = path
      .normalize(relativePath)
      .replace(/^([/\\]|\.\.([/\\]))+/, '')
      .replace(/\\/g, '/');

    const fullPath = path.resolve(PUBLIC_IMAGES_DIR, normalizedRelativePath);
    if (
      fullPath !== PUBLIC_IMAGES_DIR &&
      !fullPath.startsWith(PUBLIC_IMAGES_DIR + path.sep)
    ) {
      throw new Error(`Invalid image path: ${relativePath}`);
    }

    const publicUrl = `/images/${normalizedRelativePath}`;
    if (fs.existsSync(fullPath)) return publicUrl;

    const response = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.warn(`Failed to fetch image from ${url}`);
      return null;
    }

    const contentLength = Number(response.headers.get('content-length') ?? 0);
    if (contentLength > MAX_SOURCE_BYTES) {
      console.warn(`Image too large: ${url}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_SOURCE_BYTES) {
      console.warn(`Image too large: ${url}`);
      return null;
    }

    const buffer = Buffer.from(arrayBuffer);
    const dir = path.dirname(fullPath);
    await fs.promises.mkdir(dir, { recursive: true });

    await sharp(buffer).webp({ quality: 80 }).toFile(fullPath);
    return publicUrl;
  } catch (error) {
    console.error(`Error downloading or optimizing image from ${url}:`, error);
    return null;
  }
};
