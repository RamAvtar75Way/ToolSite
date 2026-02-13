"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Check, X } from "lucide-react";

export function AnagramSolver() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [result, setResult] = useState<boolean | null>(null);

    const check = () => {
        const clean1 = text1.toLowerCase().replace(/[^a-z]/g, "").split("").sort().join("");
        const clean2 = text2.toLowerCase().replace(/[^a-z]/g, "").split("").sort().join("");

        setResult(clean1 === clean2 && clean1.length > 0);
    };

    return (
        <div className="space-y-8 max-w-lg mx-auto">
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <Label>First Word/Phrase</Label>
                    <Input
                        placeholder="Listen"
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Second Word/Phrase</Label>
                    <Input
                        placeholder="Silent"
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                    />
                </div>
            </div>

            <Button onClick={check} className="w-full" size="lg">Check Pairs</Button>

            {result !== null && (
                <div className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 ${result ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-destructive bg-destructive/10"}`}>
                    {result ? (
                        <>
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                                <Check className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold">They are Anagrams!</h3>
                            <p className="text-muted-foreground mt-2 text-center">Both phrases contain the exact same letters.</p>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mb-4 text-destructive">
                                <X className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold">Not Anagrams</h3>
                            <p className="text-muted-foreground mt-2 text-center">The letters do not match up.</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
