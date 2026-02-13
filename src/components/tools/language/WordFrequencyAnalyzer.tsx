"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function WordFrequencyAnalyzer() {
    const [text, setText] = useState("");
    const [stats, setStats] = useState<{ word: string; count: number }[]>([]);

    const analyze = () => {
        if (!text.trim()) return;

        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const frequency: Record<string, number> = {};

        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });

        const sorted = Object.entries(frequency)
            .map(([word, count]) => ({ word, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 20); // Top 20

        setStats(sorted);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                    placeholder="Paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-48"
                />
            </div>

            <Button onClick={analyze} className="w-full">Analyze Frequency</Button>

            {stats.length > 0 && (
                <div className="space-y-4">
                    <Label>Top 20 Words</Label>
                    <div className="h-[400px] w-full bg-white dark:bg-card p-4 rounded-xl border">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats} layout="vertical" margin={{ left: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="word" type="category" width={80} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                                    itemStyle={{ color: 'var(--foreground)' }}
                                />
                                <Bar dataKey="count" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.slice(0, 8).map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="font-medium">{item.word}</span>
                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm font-bold">
                                    {item.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
