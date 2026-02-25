/**
 * generatePalette.ts
 *
 * Takes a single hex color (the "600" — brand primary) and generates
 * a full 8-shade palette (100→800) using HSL lightness interpolation.
 *
 * The output keys match the ACKO primitive token scale:
 *   100 (lightest) → 800 (darkest)
 *
 * This is intentionally dependency-free — no chroma.js, no tinycolor.
 */

// ── Hex ↔ HSL conversions ──────────────────────────────────────────

function hexToHSL(hex: string): [number, number, number] {
  let r = 0, g = 0, b = 0;
  const clean = hex.replace('#', '');

  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16) / 255;
    g = parseInt(clean[1] + clean[1], 16) / 255;
    b = parseInt(clean[2] + clean[2], 16) / 255;
  } else {
    r = parseInt(clean.substring(0, 2), 16) / 255;
    g = parseInt(clean.substring(2, 4), 16) / 255;
    b = parseInt(clean.substring(4, 6), 16) / 255;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  const toHex = (v: number) => {
    const hex = Math.round((v + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// ── Lightness targets for each shade level ──────────────────────────
//
// These are tuned to produce palettes similar to Tailwind / UIColors:
//   100 = very light tint (bg wash)
//   200 = light tint (badge bg)
//   300 = medium tint (disabled border)
//   400 = muted accent
//   500 = lighter accent
//   600 = primary (the input color — identity preserved)
//   700 = hover / darker
//   800 = darkest (active / pressed)

const SHADE_LIGHTNESS: Record<number, number> = {
  100: 97,
  200: 92,
  300: 82,
  400: 68,
  500: 55,
  600: 0,   // will be replaced with actual input lightness
  700: 0,   // computed
  800: 0,   // computed
};

export interface PaletteShades {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
}

/**
 * Generate an 8-shade palette from a single hex color.
 * The input is treated as the "600" (primary) shade.
 */
export function generatePalette(hex: string): PaletteShades {
  const [h, s, l] = hexToHSL(hex);

  // Slight saturation boost for lighter shades to keep them lively
  const satForLight = (shade: number) => {
    if (shade <= 200) return Math.min(100, s + 8);
    if (shade <= 400) return Math.min(100, s + 4);
    return s;
  };

  // Compute dark end from the input lightness
  const l700 = Math.max(l - 12, 10);
  const l800 = Math.max(l - 24, 6);

  const shades: Record<number, string> = {};

  for (const shade of [100, 200, 300, 400, 500]) {
    const targetL = SHADE_LIGHTNESS[shade];
    shades[shade] = hslToHex(h, satForLight(shade), targetL);
  }

  shades[600] = hex.startsWith('#') ? hex.toUpperCase() : `#${hex}`.toUpperCase();
  shades[700] = hslToHex(h, s, l700);
  shades[800] = hslToHex(h, s, l800);

  return shades as unknown as PaletteShades;
}

/**
 * Apply a generated palette to the document root as CSS custom properties.
 * This overrides --purple-100 through --purple-800.
 */
export function applyPaletteToRoot(palette: PaletteShades): void {
  const root = document.documentElement;
  const shadeKeys = [100, 200, 300, 400, 500, 600, 700, 800] as const;

  for (const shade of shadeKeys) {
    root.style.setProperty(`--purple-${shade}`, palette[shade]);
  }
}

/**
 * Reset palette to defaults by removing inline overrides.
 */
export function resetPaletteOnRoot(): void {
  const root = document.documentElement;
  for (const shade of [100, 200, 300, 400, 500, 600, 700, 800]) {
    root.style.removeProperty(`--purple-${shade}`);
  }
}

/**
 * Validate a hex color string.
 */
export function isValidHex(hex: string): boolean {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}
