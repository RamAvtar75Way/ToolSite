"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Copy } from "lucide-react";

export function CssGridGenerator() {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [gap, setGap] = useState(1); // rem

    const code = `display: grid;
grid-template-columns: repeat(${cols}, 1fr);
grid-template-rows: repeat(${rows}, 1fr);
gap: ${gap}rem;`;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Controls */}
                <div className="space-y-6 p-6 border rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Rows</Label>
                            <Input
                                type="number" min="1" max="12"
                                value={rows} onChange={(e) => setRows(Number(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Columns</Label>
                            <Input
                                type="number" min="1" max="12"
                                value={cols} onChange={(e) => setCols(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Gap ({gap}rem)</Label>
                        <input
                            type="range" min="0" max="4" step="0.25"
                            value={gap} onChange={(e) => setGap(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                        />
                    </div>
                    <div className="space-y-2 pt-4">
                        <Label>CSS Code</Label>
                        <div className="relative">
                            <code className="block p-4 pr-16 bg-muted rounded-md text-sm font-mono whitespace-pre">
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

                {/* Preview */}
                <div className="w-full aspect-square bg-muted/30 border rounded-lg p-4 flex items-center justify-center">
                    <div
                        className="w-full h-full"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gridTemplateRows: `repeat(${rows}, 1fr)`,
                            gap: `${gap}rem`
                        }}
                    >
                        {Array.from({ length: rows * cols }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-primary/20 border border-primary/50 rounded flex items-center justify-center text-xs font-mono"
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
