"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

export function PangramChecker() {
    const [text, setText] = useState("");
    const [result, setResult] = useState<{ isPangram: boolean; missing: string[] } | null>(null);

    const check = () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        const inputLower = text.toLowerCase();
        const missing = alphabet.filter(char => !inputLower.includes(char));

        setResult({
            isPangram: missing.length === 0,
            missing
        });
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                    placeholder="The quick brown fox jumps over the lazy dog"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-32"
                />
            </div>

            <Button onClick={check} className="w-full">Check Pangram</Button>

            {result && (
                <div className={`p-6 rounded-xl border-2 text-center ${result.isPangram ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-destructive bg-destructive/10"}`}>
                    {result.isPangram ? (
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">It's a Pangram!</h3>
                            <p>Contains every letter of the alphabet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-destructive">Not a Pangram</h3>
                            <div className="space-y-1">
                                <Label>Missing Letters:</Label>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {result.missing.map(char => (
                                        <span key={char} className="px-3 py-1 bg-background rounded-md border font-mono font-bold uppercase">
                                            {char}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
