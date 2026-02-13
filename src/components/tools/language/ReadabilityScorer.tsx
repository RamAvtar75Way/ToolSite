"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

export function ReadabilityScorer() {
    const [text, setText] = useState("");
    const [score, setScore] = useState<number | null>(null);
    const [grade, setGrade] = useState("");

    const countSyllables = (word: string) => {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        return word.match(/[aeiouy]{1,2}/g)?.length || 1;
    };

    const analyze = () => {
        if (!text.trim()) return;

        const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 1;
        const words = text.match(/\b\w+\b/g) || [];
        const wordCount = words.length;
        const syllableCount = words.reduce((acc, word) => acc + countSyllables(word), 0);

        // Flesch-Kincaid Grade Level Formula
        // 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
        const fkGrade = 0.39 * (wordCount / sentences) + 11.8 * (syllableCount / wordCount) - 15.59;

        setScore(Math.max(0, fkGrade));

        if (fkGrade < 5) setGrade("Easy (Elementary)");
        else if (fkGrade < 8) setGrade("Standard (Middle School)");
        else if (fkGrade < 12) setGrade("Fairly Difficult (High School)");
        else setGrade("Difficult (College)");
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                    placeholder="Paste text to analyze readability..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-48"
                />
            </div>

            <Button onClick={analyze} className="w-full">Calculate Readability</Button>

            {score !== null && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="bg-card border rounded-xl p-8 text-center space-y-2">
                        <div className="text-4xl font-bold text-primary">{score.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wider">Grade Level</div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold">{grade}</h3>
                        <p className="text-muted-foreground text-sm">
                            Based on Flesch-Kincaid Formula. Lower score means easier to read.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
