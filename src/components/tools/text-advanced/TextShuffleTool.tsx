"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Shuffle } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function TextShuffleTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"lines" | "words">("lines");

    const shuffleArray = (array: any[]) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const shuffle = () => {
        if (!input) return;

        let result = "";
        if (mode === "lines") {
            const lines = input.split("\n");
            const shuffled = shuffleArray(lines);
            result = shuffled.join("\n");
        } else {
            const words = input.split(/\s+/);
            const shuffled = shuffleArray(words);
            result = shuffled.join(" ");
        }
        setOutput(result);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input Text</Label>
                <Textarea
                    placeholder="Enter items to shuffle..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px]"
                />

                <div className="flex gap-4">
                    <div className="flex items-center gap-4 border p-2 rounded-lg bg-card bg-muted/50">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="radio"
                                name="mode"
                                checked={mode === "lines"}
                                onChange={() => setMode("lines")}
                            />
                            Shuffle Lines
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="radio"
                                name="mode"
                                checked={mode === "words"}
                                onChange={() => setMode("words")}
                            />
                            Shuffle Words
                        </label>
                    </div>
                </div>

                <Button onClick={shuffle} className="w-full">
                    <Shuffle className="h-4 w-4 mr-2" /> Randomize Order
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Randomized Output</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(output)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy Result
                    </Button>
                </div>
                <Textarea
                    value={output}
                    readOnly
                    className="min-h-[300px] bg-muted/50"
                />
            </div>
        </div>
    );
}
