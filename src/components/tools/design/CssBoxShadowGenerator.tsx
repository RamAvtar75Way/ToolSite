"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";

export function CssBoxShadowGenerator() {
    const [horizontal, setHorizontal] = useState(0);
    const [vertical, setVertical] = useState(4);
    const [blur, setBlur] = useState(10);
    const [spread, setSpread] = useState(0);
    const [opacity, setOpacity] = useState(0.2);
    const [color, setColor] = useState("#000000");
    const [inset, setInset] = useState(false);

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0, 0, 0";
    };

    const shadowValue = `${inset ? "inset " : ""}${horizontal}px ${vertical}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity})`;
    const code = `box-shadow: ${shadowValue};`;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Preview */}
            <div className="flex justify-center items-center py-20 bg-muted/30 rounded-xl border border-border">
                <div
                    className="w-40 h-40 bg-white dark:bg-card rounded-lg"
                    style={{ boxShadow: shadowValue }}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label>Horizontal Shift ({horizontal}px)</Label>
                        <input
                            type="range" min="-50" max="50" value={horizontal}
                            onChange={(e) => setHorizontal(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Vertical Shift ({vertical}px)</Label>
                        <input
                            type="range" min="-50" max="50" value={vertical}
                            onChange={(e) => setVertical(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Blur Radius ({blur}px)</Label>
                        <input
                            type="range" min="0" max="100" value={blur}
                            onChange={(e) => setBlur(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Spread Radius ({spread}px)</Label>
                        <input
                            type="range" min="-50" max="50" value={spread}
                            onChange={(e) => setSpread(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label>Shadow Color</Label>
                        <div className="flex gap-4">
                            <input
                                type="color" value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-12 h-10 rounded cursor-pointer"
                            />
                            <Input
                                type="text" value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="uppercase"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>Opacity ({opacity})</Label>
                        <input
                            type="range" min="0" max="1" step="0.01" value={opacity}
                            onChange={(e) => setOpacity(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="inset"
                            checked={inset}
                            onChange={(e) => setInset(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 transform scale-125"
                        />
                        <Label htmlFor="inset" className="text-base cursor-pointer">Inset Shadow</Label>
                    </div>

                    <div className="space-y-2 pt-4">
                        <Label>CSS Code</Label>
                        <div className="relative">
                            <code className="block p-4 bg-muted rounded-md text-sm font-mono break-all">
                                {code}
                            </code>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-2 right-2"
                                onClick={() => navigator.clipboard.writeText(code)}
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
