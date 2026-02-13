"use client";

import { useState, useEffect } from "react";
import { Input, Label } from "@/components/ui";

export function ColorConverter() {
    const [hex, setHex] = useState("#000000");
    const [rgb, setRgb] = useState("rgb(0, 0, 0)");
    const [hsl, setHsl] = useState("hsl(0, 0%, 0%)");

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    const handleHexChange = (val: string) => {
        setHex(val);
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            const rgbVal = hexToRgb(val);
            if (rgbVal) {
                setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
                setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-center mb-8">
                <div
                    className="w-32 h-32 rounded-full shadow-lg border-4 border-white dark:border-gray-800"
                    style={{ backgroundColor: hex }}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                    <Label>HEX</Label>
                    <Input value={hex} onChange={(e) => handleHexChange(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>RGB</Label>
                    <Input value={rgb} readOnly />
                </div>
                <div className="space-y-2">
                    <Label>HSL</Label>
                    <Input value={hsl} readOnly />
                </div>
            </div>
        </div>
    );
}
