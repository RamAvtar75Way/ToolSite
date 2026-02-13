"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Copy } from "lucide-react";

export function HashtagGenerator() {
    const [keyword, setKeyword] = useState("");
    const [hashtags, setHashtags] = useState<string[]>([]);

    // Simple hardcoded map for demo purposes. 
    // In a real app, this would call an API or use a larger dictionary.
    const DATABASE: Record<string, string[]> = {
        "photography": ["#photography", "#photooftheday", "#picoftheday", "#photographer", "#nature", "#love", "#instagood", "#art", "#travel", "#instagram"],
        "travel": ["#travel", "#nature", "#photography", "#travelphotography", "#love", "#photooftheday", "#instagood", "#travelgram", "#picoftheday", "#wanderlust"],
        "food": ["#food", "#foodporn", "#foodie", "#instafood", "#foodphotography", "#yummy", "#delicious", "#love", "#instagood", "#foodblogger"],
        "fitness": ["#fitness", "#gym", "#workout", "#fit", "#fitnessmotivation", "#motivation", "#bodybuilding", "#training", "#health", "#love"],
        "tech": ["#tech", "#technology", "#innovation", "#engineering", "#programming", "#coding", "#developer", "#software", "#gadgets", "#future"],
        "marketing": ["#marketing", "#business", "#socialmedia", "#entrepreneur", "#branding", "#digitalmarketing", "#success", "#startup", "#motivation", "#sales"],
    };

    const generate = () => {
        if (!keyword) return;

        const key = keyword.toLowerCase();
        let results: string[] = [];

        // Exact match
        if (DATABASE[key]) {
            results = DATABASE[key];
        } else {
            // Simple fuzzy or fallback
            results = [
                `#${key}`,
                `#${key}life`,
                `#${key}style`,
                `#${key}lover`,
                `#${key}gram`,
                `#${key}daily`,
                `#ilove${key}`,
                `#best${key}`,
                `#${key}world`,
                `#${key}tips`
            ];
        }
        setHashtags(results);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                    <Label>Enter Keyword</Label>
                    <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="e.g. photography"
                        onKeyDown={(e) => e.key === "Enter" && generate()}
                    />
                </div>
                <Button onClick={generate} size="lg">Generate</Button>
            </div>

            {hashtags.length > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <div className="flex flex-wrap gap-2">
                            {hashtags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="outline" className="w-full" onClick={() => navigator.clipboard.writeText(hashtags.join(" "))}>
                            <Copy className="mr-2 h-4 w-4" /> Copy All
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
