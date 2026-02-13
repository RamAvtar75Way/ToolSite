"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

interface KeywordData {
    word: string;
    count: number;
    density: string;
}

export function KeywordDensityChecker() {
    const [text, setText] = useState("");
    const [results, setResults] = useState<{
        oneWord: KeywordData[],
        twoWord: KeywordData[],
        threeWord: KeywordData[]
    } | null>(null);

    const analyze = () => {
        const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
        const words = cleanText.split(' ').filter(w => w.length > 2); // Filter short words
        const totalWords = words.length;

        if (totalWords === 0) {
            setResults(null);
            return;
        }

        const countFreq = (arr: string[]) => {
            const counts: Record<string, number> = {};
            arr.forEach(w => counts[w] = (counts[w] || 0) + 1);
            return Object.entries(counts)
                .map(([word, count]) => ({ word, count, density: ((count / totalWords) * 100).toFixed(2) + '%' }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);
        };

        // 1 Word
        const oneWord = countFreq(words);

        // 2 Words
        const twoWordsList = [];
        for (let i = 0; i < words.length - 1; i++) {
            twoWordsList.push(`${words[i]} ${words[i + 1]}`);
        }
        const twoWord = countFreq(twoWordsList);

        // 3 Words
        const threeWordsList = [];
        for (let i = 0; i < words.length - 2; i++) {
            threeWordsList.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
        }
        const threeWord = countFreq(threeWordsList);

        setResults({ oneWord, twoWord, threeWord });
    };

    const clear = () => {
        setText("");
        setResults(null);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between">
                    <Label>Paste Text or HTML Content</Label>
                    <Button variant="ghost" size="sm" onClick={clear}>Clear</Button>
                </div>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your content here to analyze keyword density..."
                    className="min-h-[200px]"
                />
                <Button onClick={analyze} size="lg" className="w-full">Check Density</Button>
            </div>

            {results && (
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-center">Top Single Words</h3>
                        <Table data={results.oneWord} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-center">Top 2-Word Phrases</h3>
                        <Table data={results.twoWord} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-center">Top 3-Word Phrases</h3>
                        <Table data={results.threeWord} />
                    </div>
                </div>
            )}
        </div>
    );
}

function Table({ data }: { data: KeywordData[] }) {
    if (data.length === 0) return <p className="text-center text-muted-foreground text-sm">No data found</p>;
    return (
        <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-muted">
                    <tr>
                        <th className="p-2 text-left">Keyword</th>
                        <th className="p-2 text-right">Count</th>
                        <th className="p-2 text-right">Density</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-2 font-medium">{item.word}</td>
                            <td className="p-2 text-right">{item.count}</td>
                            <td className="p-2 text-right text-muted-foreground">{item.density}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
