import { TYPE_COLORS } from './utils';

// Local memory cache for extracted colors to prevent duplicate image processing
const colorCache: Record<string, { r: number; g: number; b: number }> = {};

/**
 * Converts RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Extracts dominant color from image URL using canvas downscaling
 */
export function extractDominantColor(imageUrl: string): Promise<{ r: number; g: number; b: number } | null> {
  if (!imageUrl) return Promise.resolve(null);
  if (colorCache[imageUrl]) {
    return Promise.resolve(colorCache[imageUrl]);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        // Downscale to 30x30 for extremely fast performance
        canvas.width = 30;
        canvas.height = 30;
        ctx.drawImage(img, 0, 0, 30, 30);
        const imgData = ctx.getImageData(0, 0, 30, 30).data;

        const colorCounts: Record<string, { count: number; r: number; g: number; b: number }> = {};
        let maxCount = 0;
        let dominant = { r: 120, g: 120, b: 120 }; // Default neutral gray
        let found = false;

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          // Ignore transparent and semi-transparent pixels
          if (a < 180) continue;
          
          // Ignore white background and black/dark gray outlines
          if (r > 235 && g > 235 && b > 235) continue;
          if (r < 25 && g < 25 && b < 25) continue;

          // Bucket colors (rounding) to group similar pixels
          const rBucket = Math.round(r / 12) * 12;
          const gBucket = Math.round(g / 12) * 12;
          const bBucket = Math.round(b / 12) * 12;
          const key = `${rBucket},${gBucket},${bBucket}`;

          if (!colorCounts[key]) {
            colorCounts[key] = { count: 0, r, g, b };
          }
          colorCounts[key].count++;

          if (colorCounts[key].count > maxCount) {
            maxCount = colorCounts[key].count;
            dominant = { r, g, b };
            found = true;
          }
        }

        const result = found ? dominant : null;
        if (result) {
          colorCache[imageUrl] = result;
        }
        resolve(result);
      } catch (e) {
        resolve(null);
      }
    };
    img.onerror = () => {
      resolve(null);
    };
  });
}

/**
 * Converts HEX to HSL
 */
export function hexToHsl(hex: string) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return rgbToHsl(r, g, b);
}

/**
 * Returns dynamic UI colors based on extracted dominant color
 */
export function getExtractedColors(
  rgb: { r: number; g: number; b: number } | null,
  primaryType: string,
  isDark: boolean
) {
  const defaultColor = TYPE_COLORS[primaryType.toLowerCase()] || '#9ca3af';

  if (!rgb) {
    // Fallback to type based colors
    const typeLower = primaryType.toLowerCase();
    let pastel = '#f5f5f7';
    switch (typeLower) {
      case "grass": pastel = "#c3deb0"; break;
      case "fire": pastel = "#f2ad7c"; break;
      case "water": pastel = "#6cbce5"; break;
      case "bug": pastel = "#d2e59b"; break;
      case "normal": pastel = "#e2e2df"; break;
      case "poison": pastel = "#dbb5e7"; break;
      case "electric": pastel = "#fdf0a6"; break;
      case "ground": pastel = "#ecd0a1"; break;
      case "fairy": pastel = "#f6c4d7"; break;
      case "fighting": pastel = "#dfa1a1"; break;
      case "psychic": pastel = "#f8b8cc"; break;
      case "rock": pastel = "#dcd3bd"; break;
      case "steel": pastel = "#cfd8dc"; break;
      case "ice": pastel = "#b2ebf2"; break;
      case "ghost": pastel = "#c2b7e0"; break;
      case "dragon": pastel = "#9fa8da"; break;
      case "dark": pastel = "#bcaaa4"; break;
      case "flying": pastel = "#c5cae9"; break;
    }

    if (isDark) {
      const { h, s } = hexToHsl(pastel);
      const darkPastel = `hsl(${h}, ${Math.min(s, 25)}%, 14%)`;
      return {
        primaryColor: defaultColor,
        primaryColorGlow: `${defaultColor}40`,
        pastelBgColor: darkPastel
      };
    }

    return {
      primaryColor: defaultColor,
      primaryColorGlow: `${defaultColor}40`,
      pastelBgColor: pastel
    };
  }

  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  if (isDark) {
    // Bright neon-cyber color for Dark Mode
    const activeS = Math.max(s, 75); // make it highly saturated for glow
    const activeL = Math.max(35, Math.min(l, 55)); // maintain brightness but keep details visible
    const primary = `hsl(${h}, ${activeS}%, ${activeL}%)`;
    // Softer dark pastel color for background tint:
    // Saturation around 25%, Lightness around 14% to make it dark and premium.
    const darkPastel = `hsl(${h}, ${Math.min(s, 25)}%, 14%)`;
    return {
      primaryColor: primary,
      primaryColorGlow: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`,
      pastelBgColor: darkPastel
    };
  } else {
    // Elegant, highly readable color for Light Mode
    const activeS = Math.max(s, 60);
    const activeL = Math.min(l, 35); // make it dark enough to be readable
    const primary = `hsl(${h}, ${activeS}%, ${activeL}%)`;
    
    // Smooth pastel color for background
    const pastel = `hsl(${h}, ${Math.min(s, 40)}%, 90%)`;
    return {
      primaryColor: primary,
      primaryColorGlow: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
      pastelBgColor: pastel
    };
  }
}

/**
 * Safely adds opacity to a HEX or HSL color string
 */
export function addOpacityToColor(color: string, opacity: number): string {
  if (!color) return 'transparent';
  
  // If it's a HEX color
  if (color.startsWith('#')) {
    const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return `${color}${alphaHex}`;
  }
  
  // If it's an HSL color like hsl(120, 30%, 90%)
  if (color.startsWith('hsl')) {
    if (color.startsWith('hsla')) {
      return color.replace(/,\s*[\d.]+\s*\)$/, `, ${opacity})`);
    }
    return color.replace('hsl', 'hsla').replace(')', `, ${opacity})`);
  }
  
  return color;
}

