"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

export function AlliterationFinder() {
    const [text, setText] = useState("");
    const [matches, setMatches] = useState<number[]>([]); // Indicies of words that part of a group

    const analyze = () => {
        const words = text.split(/\s+/);
        const indices: number[] = [];

        for (let i = 0; i < words.length - 1; i++) {
            const w1 = words[i].toLowerCase().replace(/[^a-z]/g, "");
            const w2 = words[i + 1].toLowerCase().replace(/[^a-z]/g, "");

            if (w1 && w2 && w1[0] === w2[0]) {
                if (!indices.includes(i)) indices.push(i);
                if (!indices.includes(i + 1)) indices.push(i + 1);
            }
        }
        setMatches(indices);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                    placeholder="Peter Piper picked a peck of pickled peppers."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-32"
                />
            </div>

            <Button onClick={analyze} className="w-full">Find Alliterations</Button>

            {text && (
                <div className="p-6 bg-card border rounded-xl leading-8 text-lg">
                    {text.split(/\s+/).map((word, i) => (
                        <span
                            key={i}
                            className={`
                                inline-block mr-1 px-1 rounded transition-colors
                                ${matches.includes(i) ? "bg-primary/20 font-medium text-primary" : ""}
                            `}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
