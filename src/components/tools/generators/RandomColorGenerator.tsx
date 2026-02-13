"use client";

import { useState } from "react";
import { Button, Label } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function RandomColorGenerator() {
    const [colors, setColors] = useState<string[]>([]);

    const generate = () => {
        const newColors = [];
        for (let i = 0; i < 6; i++) {
            newColors.push("#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
        }
        setColors(newColors);
    };

    return (
        <div className="space-y-6">
            <Button onClick={generate} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" /> Generate Colors
            </Button>

            {colors.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {colors.map((color, i) => (
                        <div key={i} className="rounded-xl overflow-hidden border shadow-sm cursor-pointer group" onClick={() => {
                            navigator.clipboard.writeText(color);
                            toast.success(`Copied ${color}`);
                        }}>
                            <div className="h-24 w-full" style={{ backgroundColor: color }} />
                            <div className="p-3 text-center font-mono font-medium flex justify-center items-center gap-2 bg-card">
                                {color.toUpperCase()}
                                <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
