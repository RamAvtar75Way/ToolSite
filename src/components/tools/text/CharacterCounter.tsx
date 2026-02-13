"use client";

import { useState } from "react";
import { Button, Textarea, Card, CardContent } from "@/components/ui";
import { Copy, Trash2 } from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";

const SOCIAL_LIMITS = [
    { name: "Twitter (X)", limit: 280 },
    { name: "Facebook Post", limit: 63206 },
    { name: "Instagram Caption", limit: 2200 },
    { name: "LinkedIn Post", limit: 3000 },
    { name: "SMS", limit: 160 },
];

export function CharacterCounter() {
    const [text, setText] = useState("");

    const handleCopy = () => {
        copyToClipboard(text);
    };

    const handleClear = () => {
        setText("");
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {SOCIAL_LIMITS.map((social) => {
                    const isOverLimit = text.length > social.limit;
                    const remaining = social.limit - text.length;
                    return (
                        <Card key={social.name} className={cn(isOverLimit ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "")}>
                            <CardContent className="p-4 text-center">
                                <div className="text-sm font-medium mb-1">{social.name}</div>
                                <div className={cn("text-xl font-bold", isOverLimit ? "text-red-500" : "text-green-600")}>
                                    {remaining}
                                </div>
                                <div className="text-xs text-muted-foreground">remaining</div>
                            </CardContent>
                        </Card>
                    )
                })}
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
                <div className="text-right text-sm text-muted-foreground mt-2">
                    Total Characters: {text.length} | Total Words: {text.trim() ? text.trim().split(/\s+/).length : 0}
                </div>
            </div>
        </div>
    );
}
