"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

export function RhymeFinder() {
    const [text, setText] = useState("");
    const [scheme, setScheme] = useState<string[]>([]);

    // Simple heuristic for checking rhyme based on suffix matching
    // Does not use dictionary, so it's imperfect "sight rhyme" mostly.
    const getRhymeSuffix = (word: string) => {
        // Get last 2-3 chars? Or vowel+rest?
        // Simple approach: Last 2 chars, or last 3 if length > 4
        // Improve: Regex for last vowel group to end
        const match = word.toLowerCase().match(/[aeiouy]+[^aeiouy]*$/);
        return match ? match[0] : word.slice(-2);
    };

    const analyze = () => {
        const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
        const endWords = lines.map(l => {
            const words = l.replace(/[^a-zA-Z\s]/g, "").split(/\s+/);
            return words[words.length - 1];
        });

        const seenSuffixes: string[] = [];
        const pattern: string[] = [];
        let labelChar = 65; // A

        endWords.forEach(word => {
            if (!word) {
                pattern.push("-");
                return;
            }
            const suffix = getRhymeSuffix(word);
            const idx = seenSuffixes.indexOf(suffix);

            if (idx === -1) {
                seenSuffixes.push(suffix);
                pattern.push(String.fromCharCode(labelChar));
                labelChar++;
            } else {
                // Find what char was assigned to this suffix
                // We restart logic? No, global pattern.
                // Reconstruct from seenSuffixes?
                // Actually simply:
                const existingLabel = String.fromCharCode(65 + idx);
                pattern.push(existingLabel);
            }
        });

        setScheme(pattern);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Input Poem / Lyrics (Line by line)</Label>
                <Textarea
                    placeholder={"Roses are red,\nViolets are blue,\nSugar is sweet,\nAnd so are you."}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-48 font-serif"
                />
            </div>

            <Button onClick={analyze} className="w-full">Analyze Rhyme Scheme</Button>

            {scheme.length > 0 && (
                <div className="flex gap-4">
                    <div className="w-12 bg-muted/50 flex flex-col items-center pt-2 rounded-l-lg border-y border-l">
                        {scheme.map((char, i) => (
                            <div key={i} className="h-8 flex items-center font-bold text-primary">{char}</div>
                        ))}
                    </div>
                    <div className="flex-1 bg-card rounded-r-lg border p-2 pl-4 leading-8 font-serif">
                        {text.split("\n").map((line, i) => (
                            line.trim() ? (
                                <div key={i} className="h-8 flex items-center border-b border-transparent hover:border-muted whitespace-nowrap overflow-hidden text-ellipsis">
                                    {line}
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
            )}
            <p className="text-xs text-muted-foreground text-center">
                *Uses algorithmic suffix matching. May not detect slant rhymes perfecty.
            </p>
        </div>
    );
}
