"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { generateShades } from "@/lib/color-utils";
import { Copy } from "lucide-react";

export function HexShadesGenerator() {
    const [color, setColor] = useState("#3b82f6");
    const [count, setCount] = useState(10);

    const shades = generateShades(color, count);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex gap-8 items-end">
                <div className="space-y-2 flex-1">
                    <Label>Base Color</Label>
                    <div className="flex gap-4">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-12 h-10 rounded cursor-pointer"
                        />
                        <Input
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="uppercase"
                        />
                    </div>
                </div>
                <div className="space-y-2 w-32">
                    <Label>Steps ({count})</Label>
                    <input
                        type="range"
                        min="3"
                        max="20"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div className="grid gap-2">
                {shades.map((shade, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border border-transparent hover:border-border transition-colors group"
                        style={{ backgroundColor: shade, color: index > count / 2 ? 'white' : 'black' }}
                    >
                        <span className="font-mono">{shade}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:text-inherit"
                            onClick={() => copyToClipboard(shade)}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
