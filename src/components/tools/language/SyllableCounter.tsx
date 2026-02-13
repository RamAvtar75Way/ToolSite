"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

export function SyllableCounter() {
    const [text, setText] = useState("");
    const [counts, setCounts] = useState<{ word: string, count: number }[]>([]);
    const [total, setTotal] = useState(0);

    const countSyllables = (word: string) => {
        word = word.toLowerCase().replace(/[^a-z]/g, "");
        if (word.length === 0) return 0;
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        return word.match(/[aeiouy]{1,2}/g)?.length || 1;
    };

    const analyze = () => {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        let tot = 0;
        const breakdown = words.map(w => {
            const c = countSyllables(w);
            tot += c;
            return { word: w, count: c };
        });

        setCounts(breakdown);
        setTotal(tot);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Input Text (Words separated by space)</Label>
                <Textarea
                    placeholder="Enter words to count syllables..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-32"
                />
            </div>

            <Button onClick={analyze} className="w-full">Count Syllables</Button>

            {counts.length > 0 && (
                <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 text-center">
                        <span className="text-muted-foreground mr-2">Total Syllables:</span>
                        <span className="text-2xl font-bold font-mono">{total}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {counts.slice(0, 50).map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-muted rounded border text-sm">
                                <span className="truncate mr-2" title={item.word}>{item.word}</span>
                                <span className="font-bold bg-background px-1.5 rounded">{item.count}</span>
                            </div>
                        ))}
                        {counts.length > 50 && (
                            <div className="col-span-full text-center text-xs text-muted-foreground pt-2">
                                + {counts.length - 50} more words...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
