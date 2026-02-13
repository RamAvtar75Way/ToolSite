"use client";

import { useState, useMemo } from "react";
import { Button, Textarea, Card, CardContent } from "@/components/ui";
import { Copy, Trash2 } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function WordCounter() {
    const [text, setText] = useState("");

    const stats = useMemo(() => {
        const trimmed = text.trim();
        if (!trimmed) return { words: 0, characters: 0, sentences: 0, paragraphs: 0 };

        return {
            words: trimmed.split(/\s+/).length,
            characters: text.length,
            sentences: trimmed.split(/[.!?]+/).length - 1 || 1, // Basic approximation
            paragraphs: trimmed.split(/\n+/).length,
        };
    }, [text]);

    const handleCopy = () => {
        copyToClipboard(text);
    };

    const handleClear = () => {
        setText("");
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Words" value={stats.words} />
                <StatCard label="Characters" value={stats.characters} />
                <StatCard label="Sentences" value={stats.sentences} />
                <StatCard label="Paragraphs" value={stats.paragraphs} />
            </div>

            <div className="relative">
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                    <Button variant="ghost" size="sm" onClick={handleCopy} title="Copy to clipboard">
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleClear} title="Clear text">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="min-h-[300px] p-4 pr-24 text-base resize-y"
                />
            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <Card>
            <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </CardContent>
        </Card>
    );
}

// Helper for variant prop to match shadcn pattern if I were using full library
// For now simpler Button is used in UI index, but I'll update it there if needed.
// Actually my Button component in ui/index.tsx doesn't have variants yet, so I should update it or just use className.
// I'll stick to className in the component above if needed or update UI component but wait, I used `variant="ghost"` which isn't in my simple UI component.
// I need to update UI component or remove variant prop usage. I will update `ui/index.tsx` to handle basic variants or just ignore it for now and let it fall through to ...props (HTML attribute) which won't do anything for style.
// Be better to update UI component.
