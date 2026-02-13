"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { diffChars, diffWords, diffLines, Change } from "diff";
import { Copy, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function TextDiffChecker() {
    const [original, setOriginal] = useState("");
    const [modified, setModified] = useState("");
    const [diffResult, setDiffResult] = useState<Change[]>([]);
    const [mode, setMode] = useState<"chars" | "words" | "lines">("words");

    const compareIndex = () => {
        let result;
        if (mode === "chars") result = diffChars(original, modified);
        else if (mode === "lines") result = diffLines(original, modified);
        else result = diffWords(original, modified);

        setDiffResult(result);
    };

    const clear = () => {
        setOriginal("");
        setModified("");
        setDiffResult([]);
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Original Text</Label>
                    <Textarea
                        placeholder="Paste original text here..."
                        className="min-h-[200px]"
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Modified Text</Label>
                    <Textarea
                        placeholder="Paste modified text here..."
                        className="min-h-[200px]"
                        value={modified}
                        onChange={(e) => setModified(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between bg-muted p-4 rounded-lg">
                <div className="flex gap-2">
                    <Button
                        variant={mode === "chars" ? "default" : "outline"}
                        onClick={() => setMode("chars")}
                        size="sm"
                    >
                        Characters
                    </Button>
                    <Button
                        variant={mode === "words" ? "default" : "outline"}
                        onClick={() => setMode("words")}
                        size="sm"
                    >
                        Words
                    </Button>
                    <Button
                        variant={mode === "lines" ? "default" : "outline"}
                        onClick={() => setMode("lines")}
                        size="sm"
                    >
                        Lines
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={clear}>Clear</Button>
                    <Button onClick={compareIndex}>Compare Text</Button>
                </div>
            </div>

            {diffResult.length > 0 && (
                <div className="space-y-2">
                    <Label>Difference Result</Label>
                    <div className="p-4 border rounded-lg bg-card min-h-[100px] whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {diffResult.map((part, index) => {
                            let color = "text-foreground";
                            let bg = "bg-transparent";

                            if (part.added) {
                                color = "text-green-800 dark:text-green-300";
                                bg = "bg-green-100 dark:bg-green-900/30";
                            } else if (part.removed) {
                                color = "text-red-800 dark:text-red-300 line-through decoration-red-500/50";
                                bg = "bg-red-100 dark:bg-red-900/30";
                            }

                            return (
                                <span key={index} className={`${color} ${bg} px-0.5 rounded-sm`}>
                                    {part.value}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
