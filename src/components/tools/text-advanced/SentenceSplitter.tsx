"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Trash2, List } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function SentenceSplitter() {
    const [input, setInput] = useState("");
    const [sentences, setSentences] = useState<string[]>([]);

    const split = () => {
        if (!input) return;

        // Basic sentence splitting regex
        // Handles dots, question marks, exclamations followed by space or newline
        // but tries to avoid abbreviations like Mr. or Dr. (very basic check)

        const splitRegex = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|!)\s+/g;
        const result = input.split(splitRegex).filter(s => s.trim().length > 0);
        setSentences(result);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input Paragraph</Label>
                <Textarea
                    placeholder="Enter text with multiple sentences..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px]"
                />
                <Button onClick={split} className="w-full">Split into Sentences</Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Result ({sentences.length} sentences)</Label>
                    <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => setSentences([])}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(sentences.join("\n"))}>
                            <Copy className="h-4 w-4 mr-2" /> Copy List
                        </Button>
                    </div>
                </div>
                <div className="border rounded-xl bg-muted/50 p-4 min-h-[300px] max-h-[500px] overflow-y-auto space-y-2">
                    {sentences.length === 0 ? (
                        <p className="text-muted-foreground text-center py-10">
                            Sentences will appear here on separate lines.
                        </p>
                    ) : (
                        sentences.map((sentence, i) => (
                            <div key={i} className="flex gap-3 p-3 bg-card rounded-lg border text-sm">
                                <span className="text-muted-foreground font-mono select-none">{i + 1}.</span>
                                <div>{sentence}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
