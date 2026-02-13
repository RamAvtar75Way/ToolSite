"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { getContrastRatio } from "@/lib/color-utils";
import { Check, X } from "lucide-react";

export function ContrastChecker() {
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");

    const ratio = getContrastRatio(fgColor, bgColor);
    const score = ratio.toFixed(2);

    const getRating = (r: number, size: "aa-normal" | "aa-large" | "aaa-normal" | "aaa-large") => {
        let pass = false;
        if (size === "aa-normal" && r >= 4.5) pass = true;
        if (size === "aa-large" && r >= 3) pass = true;
        if (size === "aaa-normal" && r >= 7) pass = true;
        if (size === "aaa-large" && r >= 4.5) pass = true;

        return pass ? (
            <span className="inline-flex items-center text-green-600 font-bold">
                <Check className="w-5 h-5 mr-1" /> PASS
            </span>
        ) : (
            <span className="inline-flex items-center text-red-600 font-bold">
                <X className="w-5 h-5 mr-1" /> FAIL
            </span>
        );
    };

    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <Label className="text-lg">Foreground Color (Text)</Label>
                    <div className="flex gap-4 items-center">
                        <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="w-16 h-16 rounded-lg cursor-pointer border-none p-0"
                        />
                        <Input
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="uppercase text-lg"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="text-lg">Background Color</Label>
                    <div className="flex gap-4 items-center">
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-16 h-16 rounded-lg cursor-pointer border-none p-0"
                        />
                        <Input
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="uppercase text-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Preview & Score */}
            <div className="grid md:grid-cols-2 gap-8">
                <div
                    className="p-8 rounded-xl shadow-lg flex flex-col justify-center items-center min-h-[300px]"
                    style={{ backgroundColor: bgColor, color: fgColor }}
                >
                    <h2 className="text-3xl font-bold mb-4">Contrast Preview</h2>
                    <p className="text-lg text-center max-w-xs">
                        This is how your text looks on the background. Ensure it is readable!
                    </p>
                </div>

                <div className="bg-card p-8 rounded-xl border border-border space-y-6">
                    <div className="text-center pb-6 border-b border-border">
                        <Label className="text-muted-foreground">Contrast Ratio</Label>
                        <div className="text-5xl font-black mt-2">{score} : 1</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span>Normal Text (WCAG AA)</span>
                            {getRating(ratio, "aa-normal")}
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Large Text (WCAG AA)</span>
                            {getRating(ratio, "aa-large")}
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Normal Text (WCAG AAA)</span>
                            {getRating(ratio, "aaa-normal")}
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Large Text (WCAG AAA)</span>
                            {getRating(ratio, "aaa-large")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
