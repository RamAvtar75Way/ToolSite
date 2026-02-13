export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };

// HEX to RGB
export function hexToRgb(hex: string): RGB | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

// RGB to HEX
export function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0,
        s,
        l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

// HSL to RGB
export function hslToRgb(h: number, s: number, l: number): RGB {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

// Calculate Luminance
export function getLuminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate Contrast Ratio
export function getContrastRatio(hex1: string, hex2: string): number {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return 0;

    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
}

// Generate Palette
export function generatePalette(hex: string, type: string): string[] {
    const rgb = hexToRgb(hex);
    if (!rgb) return [hex];
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const palette: string[] = [];

    switch (type) {
        case "analogous":
            for (let i = -2; i <= 2; i++) {
                const newH = (hsl.h + i * 30 + 360) % 360;
                const newRgb = hslToRgb(newH, hsl.s, hsl.l);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
            break;
        case "monochromatic":
            for (let i = -2; i <= 2; i++) {
                const newL = Math.max(0, Math.min(100, hsl.l + i * 15));
                const newRgb = hslToRgb(hsl.h, hsl.s, newL);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
            break;
        case "triadic":
            for (let i = 0; i < 3; i++) {
                const newH = (hsl.h + i * 120) % 360;
                const newRgb = hslToRgb(newH, hsl.s, hsl.l);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
            break;
        case "complementary":
            palette.push(hex);
            const compH = (hsl.h + 180) % 360;
            const compRgb = hslToRgb(compH, hsl.s, hsl.l);
            palette.push(rgbToHex(compRgb.r, compRgb.g, compRgb.b));
            break;
        case "split-complementary":
            palette.push(hex);
            const split1H = (hsl.h + 150) % 360;
            const split2H = (hsl.h + 210) % 360;
            const s1 = hslToRgb(split1H, hsl.s, hsl.l);
            const s2 = hslToRgb(split2H, hsl.s, hsl.l);
            palette.push(rgbToHex(s1.r, s1.g, s1.b));
            palette.push(rgbToHex(s2.r, s2.g, s2.b));
            break;
        default:
            palette.push(hex);
    }
    return palette;
}

// Generate Shades
export function generateShades(hex: string, count: number = 10): string[] {
    const rgb = hexToRgb(hex);
    if (!rgb) return [];

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const shades: string[] = [];

    for (let i = 0; i < count; i++) {
        const l = 100 - (i * (100 / (count - 1)));
        const newRgb = hslToRgb(hsl.h, hsl.s, l);
        shades.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    return shades;
}
