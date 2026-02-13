"use client";

import { useState } from "react";
import { Textarea, Progress, Label } from "@/components/ui";

const LIMITS = [
    { name: "Twitter Post", limit: 280, color: "bg-blue-500" },
    { name: "Instagram Bio", limit: 150, color: "bg-pink-500" },
    { name: "LinkedIn Post", limit: 3000, color: "bg-blue-700" },
    { name: "Facebook Post", limit: 63206, color: "bg-blue-600" },
    { name: "TikTok Bio", limit: 80, color: "bg-black" },
];

export function CharacterLimitChecker() {
    const [text, setText] = useState("");
    const length = text.length;

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4">
                <Label>Type or paste your text</Label>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing..."
                    className="min-h-[200px] p-4 text-lg"
                />
                <div className="text-right text-muted-foreground">
                    Character Count: <span className="font-bold text-foreground">{length}</span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {LIMITS.map((platform) => {
                    const percentage = Math.min((length / platform.limit) * 100, 100);
                    const isOver = length > platform.limit;

                    return (
                        <div key={platform.name} className="space-y-2 border p-4 rounded-xl bg-card">
                            <div className="flex justify-between text-sm font-medium">
                                <span>{platform.name}</span>
                                <span className={isOver ? "text-red-500" : "text-muted-foreground"}>
                                    {length} / {platform.limit}
                                </span>
                            </div>
                            <Progress value={percentage} className={isOver ? "bg-red-100 [&>div]:bg-red-500" : ""} />
                            {isOver && (
                                <p className="text-xs text-red-500 font-medium pt-1">
                                    Over limit by {length - platform.limit} characters
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
