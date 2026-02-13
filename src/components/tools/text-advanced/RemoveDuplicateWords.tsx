"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Trash2 } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function RemoveDuplicateWords() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [ignoreCase, setIgnoreCase] = useState(true);

    const process = () => {
        if (!input) return;

        // Split by whitespace but keep the structure somewhat? 
        // For a simple tool, splitting by spaces is standard.
        const words = input.split(/\s+/);
        const uniqueWords = new Set<string>();
        const result: string[] = [];

        words.forEach(word => {
            const key = ignoreCase ? word.toLowerCase() : word;
            // Clean punctuation for comparison? Usually simpler is better for this tool
            // Let's just dedup exact matches
            if (!uniqueWords.has(key) && word.trim() !== "") {
                uniqueWords.add(key);
                result.push(word);
            }
        });

        setOutput(result.join(" "));
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input Text (Duplicates removed in order of appearance)</Label>
                <Textarea
                    placeholder="Enter text with duplicate words..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px]"
                />

                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            checked={ignoreCase}
                            onChange={(e) => setIgnoreCase(e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        Ignore Case (Apple = apple)
                    </label>
                </div>

                <Button onClick={process} className="w-full">Remove Duplicates</Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Result (Unique Words)</Label>
                    <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => setOutput("")}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(output)}>
                            <Copy className="h-4 w-4 mr-2" /> Copy
                        </Button>
                    </div>
                </div>
                <Textarea
                    value={output}
                    readOnly
                    className="min-h-[300px] bg-muted/50"
                />
            </div>
        </div>
    );
}
