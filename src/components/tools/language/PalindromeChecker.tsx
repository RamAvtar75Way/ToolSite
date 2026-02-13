"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { ArrowRightLeft } from "lucide-react";

export function PalindromeChecker() {
    const [text, setText] = useState("");
    const [result, setResult] = useState<boolean | null>(null);
    const [cleanText, setCleanText] = useState("");

    const check = () => {
        // Remove non-alphanumeric chars
        const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
        const reversed = clean.split("").reverse().join("");

        setCleanText(clean);
        setResult(clean === reversed && clean.length > 0);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Input Text or Number</Label>
                <Textarea
                    placeholder="e.g., Racecar, A man a plan a canal Panama..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-32"
                />
            </div>

            <Button onClick={check} className="w-full">Check Palindrome</Button>

            {result !== null && (
                <div className={`p-6 rounded-xl border-2 text-center ${result ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-destructive bg-destructive/10"}`}>
                    <div className="mb-4">
                        {result ? (
                            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">Yes, it's a Palindrome!</h3>
                        ) : (
                            <h3 className="text-2xl font-bold text-destructive">No, not a Palindrome.</h3>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground font-mono bg-background/50 p-4 rounded-lg">
                        <div className="break-all">{cleanText}</div>
                        <ArrowRightLeft className="w-4 h-4 shrink-0" />
                        <div className="break-all">{cleanText.split("").reverse().join("")}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
