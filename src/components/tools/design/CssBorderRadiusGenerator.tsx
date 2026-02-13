"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Copy, Lock, Unlock } from "lucide-react";

export function CssBorderRadiusGenerator() {
    const [topLeft, setTopLeft] = useState(10);
    const [topRight, setTopRight] = useState(10);
    const [bottomRight, setBottomRight] = useState(10);
    const [bottomLeft, setBottomLeft] = useState(10);
    const [locked, setLocked] = useState(false);

    const updateAll = (val: number) => {
        setTopLeft(val);
        setTopRight(val);
        setBottomRight(val);
        setBottomLeft(val);
    };

    const handleChange = (corner: string, val: number) => {
        if (locked) {
            updateAll(val);
        } else {
            if (corner === "tl") setTopLeft(val);
            if (corner === "tr") setTopRight(val);
            if (corner === "br") setBottomRight(val);
            if (corner === "bl") setBottomLeft(val);
        }
    };

    const code = `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;

    return (
        <div className="space-y-12 max-w-3xl mx-auto">
            <div className="flex justify-center">
                <div
                    className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl border-4 border-white dark:border-gray-800 transition-all duration-300"
                    style={{
                        borderTopLeftRadius: `${topLeft}px`,
                        borderTopRightRadius: `${topRight}px`,
                        borderBottomRightRadius: `${bottomRight}px`,
                        borderBottomLeftRadius: `${bottomLeft}px`
                    }}
                />
            </div>

            <div className="relative grid grid-cols-2 gap-x-12 gap-y-8 max-w-lg mx-auto">
                {/* Lock Toggle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <Button
                        size="icon"
                        variant={locked ? "default" : "outline"}
                        onClick={() => setLocked(!locked)}
                        className="rounded-full w-12 h-12"
                    >
                        {locked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                    </Button>
                </div>

                <div className="space-y-2">
                    <Label>Top Left</Label>
                    <input
                        type="range" min="0" max="200" value={topLeft}
                        onChange={(e) => handleChange("tl", Number(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                    />
                    <Input type="number" value={topLeft} onChange={(e) => handleChange("tl", Number(e.target.value))} />
                </div>

                <div className="space-y-2 text-right">
                    <Label>Top Right</Label>
                    <input
                        type="range" min="0" max="200" value={topRight}
                        onChange={(e) => handleChange("tr", Number(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                    />
                    <Input type="number" value={topRight} onChange={(e) => handleChange("tr", Number(e.target.value))} />
                </div>

                <div className="space-y-2">
                    <Label>Bottom Left</Label>
                    <input
                        type="range" min="0" max="200" value={bottomLeft}
                        onChange={(e) => handleChange("bl", Number(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                    />
                    <Input type="number" value={bottomLeft} onChange={(e) => handleChange("bl", Number(e.target.value))} />
                </div>

                <div className="space-y-2 text-right">
                    <Label>Bottom Right</Label>
                    <input
                        type="range" min="0" max="200" value={bottomRight}
                        onChange={(e) => handleChange("br", Number(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                    />
                    <Input type="number" value={bottomRight} onChange={(e) => handleChange("br", Number(e.target.value))} />
                </div>
            </div>

            <div className="bg-muted p-4 rounded-lg flex justify-between items-center font-mono text-sm">
                <code>{code}</code>
                <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(code)}>
                    <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
            </div>
        </div>
    );
}
