"use client";

import { useState } from "react";
import { Button, Textarea, Label, Input } from "@/components/ui";
import { Copy, Trash2 } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function NgramGenerator() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [n, setN] = useState(2); // Bigrams default

    const generateNgrams = () => {
        if (!input) return;

        // Clean text: remove special chars, extra spaces? 
        // Let's keep it relatively raw but split by spaces
        const words = input.trim().split(/\s+/);

        if (words.length < n) {
            setOutput(`Error: Text too short for ${n}-grams.`);
            return;
        }

        const ngrams: string[] = [];
        for (let i = 0; i <= words.length - n; i++) {
            ngrams.push(words.slice(i, i + n).join(" "));
        }

        setOutput(ngrams.join("\n"));
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input Text</Label>
                <Textarea
                    placeholder="Enter text to analyze..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px]"
                />

                <div className="flex items-end gap-4">
                    <div className="space-y-2 flex-1">
                        <Label>N-gram Size (N)</Label>
                        <Input
                            type="number"
                            min={1}
                            max={10}
                            value={n}
                            onChange={(e) => setN(parseInt(e.target.value) || 2)}
                        />
                        <p className="text-xs text-muted-foreground">
                            1=Unigram, 2=Bigram, 3=Trigram
                        </p>
                    </div>
                    <Button onClick={generateNgrams} className="flex-1">Generate</Button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Result ({n}-grams)</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(output)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy List
                    </Button>
                </div>
                <Textarea
                    value={output}
                    readOnly
                    className="min-h-[300px] bg-muted/50 font-mono text-sm leading-relaxed"
                    placeholder="Output will appear here..."
                />
            </div>
        </div>
    );
}
