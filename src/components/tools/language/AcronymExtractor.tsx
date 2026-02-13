"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

export function AcronymExtractor() {
    const [text, setText] = useState("");
    const [acronyms, setAcronyms] = useState<string[]>([]);

    const extract = () => {
        // Regex for words with 2+ consecutive uppercase letters OR Uppercase followed by Uppercase (e.g. N.A.S.A)
        // Simple: 2 or more uppercase letters.
        const matches = text.match(/\b[A-Z]{2,}\b/g) || [];
        // Filter out common words like "I", though {2,} handles that
        const unique = Array.from(new Set(matches));
        setAcronyms(unique.sort());
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                    placeholder="The NASA space program works with ESA..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-48"
                />
            </div>

            <Button onClick={extract} className="w-full">Extract Acronyms</Button>

            {acronyms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {acronyms.map((acronym, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                            {acronym}
                        </span>
                    ))}
                </div>
            ) : (
                <div className="text-center text-muted-foreground text-sm italic">
                    No acronyms found (words with 2+ uppercase letters).
                </div>
            )}
        </div>
    );
}
