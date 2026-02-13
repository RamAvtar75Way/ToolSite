"use client";

import { useState, useEffect } from "react";
import { Button, Input, Label } from "@/components/ui";
import { generatePalette } from "@/lib/color-utils";
import { Copy } from "lucide-react";

export function ColorPaletteGenerator() {
    const [baseColor, setBaseColor] = useState("#3b82f6");
    const [harmony, setHarmony] = useState("monochromatic");
    const [palette, setPalette] = useState<string[]>([]);

    useEffect(() => {
        setPalette(generatePalette(baseColor, harmony));
    }, [baseColor, harmony]);

    const copyToClipboard = (color: string) => {
        navigator.clipboard.writeText(color);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-end">
                <div className="space-y-2">
                    <Label>Base Color</Label>
                    <div className="flex gap-4">
                        <input
                            type="color"
                            value={baseColor}
                            onChange={(e) => setBaseColor(e.target.value)}
                            className="w-12 h-10 rounded cursor-pointer"
                        />
                        <Input
                            value={baseColor}
                            onChange={(e) => setBaseColor(e.target.value)}
                            className="uppercase"
                            maxLength={7}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Harmony Rule</Label>
                    <select
                        value={harmony}
                        onChange={(e) => setHarmony(e.target.value)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="monochromatic">Monochromatic</option>
                        <option value="analogous">Analogous</option>
                        <option value="triadic">Triadic</option>
                        <option value="complementary">Complementary</option>
                        <option value="split-complementary">Split Complementary</option>
                    </select>
                </div>
            </div>

            {/* Palette Visual */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {palette.map((color, index) => (
                    <div key={index} className="group relative">
                        <div
                            className="h-32 rounded-lg shadow-sm border border-border transition-transform group-hover:scale-105"
                            style={{ backgroundColor: color }}
                        />
                        <div className="mt-2 text-center">
                            <p className="font-mono text-sm uppercase">{color}</p>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => copyToClipboard(color)}
                            >
                                <Copy className="w-3 h-3 mr-2" /> Copy
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
