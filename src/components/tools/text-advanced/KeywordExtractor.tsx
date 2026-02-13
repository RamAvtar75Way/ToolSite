"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, BarChart } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

// Common stop words to exclude
const STOP_WORDS = new Set([
    "a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "be", "been",
    "in", "on", "at", "to", "for", "with", "by", "about", "as", "of", "from",
    "i", "you", "he", "she", "it", "we", "they", "this", "that", "these", "those"
]);

interface Keyword {
    word: string;
    count: number;
    density: string;
}

export function KeywordExtractor() {
    const [input, setInput] = useState("");
    const [keywords, setKeywords] = useState<Keyword[]>([]);

    const extract = () => {
        if (!input) return;

        // Normalize text
        const cleanText = input.toLowerCase().replace(/[^\w\s]/g, "");
        const words = cleanText.split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));

        const frequency: Record<string, number> = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });

        const totalValidWords = words.length;

        const sorted = Object.entries(frequency)
            .map(([word, count]) => ({
                word,
                count,
                density: ((count / totalValidWords) * 100).toFixed(2) + "%"
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 50); // Top 50

        setKeywords(sorted);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input Text (Stop words removed)</Label>
                <Textarea
                    placeholder="Paste article or content here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[400px]"
                />
                <Button onClick={extract} className="w-full">Extract Keywords</Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Top Keywords (by Frequency)</Label>
                </div>

                <div className="border rounded-xl bg-card overflow-hidden flex flex-col h-[400px]">
                    <div className="grid grid-cols-3 bg-muted p-3 text-sm font-semibold text-muted-foreground text-center">
                        <div className="text-left pl-2">Word</div>
                        <div>Count</div>
                        <div>Density</div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-0">
                        {keywords.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                                <BarChart className="h-8 w-8 mb-2 opacity-50" />
                                <p>Enter text to see keyword analysis</p>
                            </div>
                        ) : (
                            keywords.map((k, i) => (
                                <div key={i} className="grid grid-cols-3 p-3 text-sm border-b hover:bg-muted/50 items-center text-center">
                                    <div className="text-left pl-2 font-medium">{k.word}</div>
                                    <div>{k.count}</div>
                                    <div className="text-muted-foreground">{k.density}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
