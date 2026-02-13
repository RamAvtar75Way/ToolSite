"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

export function SentenceAnalyzer() {
    const [text, setText] = useState("");
    const [stats, setStats] = useState<any>(null);

    const analyze = () => {
        if (!text.trim()) return;

        // Simple sentence splitting (matches ., !, ?)
        // Note: nuanced usage like "Dr. Smith" might trigger loose split, but sufficient for basic tool.
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

        const sentenceCount = sentences.length;
        const wordCount = text.trim().split(/\s+/).length;
        const avgSentenceLength = wordCount / sentenceCount;

        const longest = sentences.reduce((a, b) => a.length > b.length ? a : b, "").trim();
        const shortest = sentences.reduce((a, b) => a.length < b.length ? a : b, sentences[0]).trim();

        setStats({
            count: sentenceCount,
            avgLength: avgSentenceLength.toFixed(1),
            longest,
            shortest
        });
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Input Text (Paragraphs)</Label>
                <Textarea
                    placeholder="Paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-48"
                />
            </div>

            <Button onClick={analyze} className="w-full">Analyze Sentences</Button>

            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card border p-6 rounded-xl space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Sentences</span>
                            <span className="text-2xl font-bold">{stats.count}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Avg Words/Sentence</span>
                            <span className="text-2xl font-bold">{stats.avgLength}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-muted/30 p-4 rounded-lg border">
                            <Label className="text-xs text-muted-foreground uppercase">Longest Sentence</Label>
                            <p className="italic mt-1 text-sm bg-background p-2 rounded shadow-sm">
                                "{stats.longest}"
                            </p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg border">
                            <Label className="text-xs text-muted-foreground uppercase">Shortest Sentence</Label>
                            <p className="italic mt-1 text-sm bg-background p-2 rounded shadow-sm">
                                "{stats.shortest}"
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
