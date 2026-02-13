"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { diffJson, Change } from "diff";

export function JsonDiffChecker() {
    const [original, setOriginal] = useState("");
    const [modified, setModified] = useState("");
    const [diffResult, setDiffResult] = useState<Change[]>([]);
    const [error, setError] = useState("");

    const compare = () => {
        setError("");
        try {
            const obj1 = JSON.parse(original);
            const obj2 = JSON.parse(modified);

            const result = diffJson(obj1, obj2);
            setDiffResult(result);
        } catch (e) {
            setError("Invalid JSON in one or both inputs.");
            setDiffResult([]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Original JSON</Label>
                    <Textarea
                        placeholder="{}"
                        className="min-h-[200px] font-mono text-sm"
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Modified JSON</Label>
                    <Textarea
                        placeholder="{}"
                        className="min-h-[200px] font-mono text-sm"
                        value={modified}
                        onChange={(e) => setModified(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <Button onClick={compare} className="w-full md:w-auto px-8">Compare JSON</Button>
            </div>

            {error && <p className="text-center text-red-500">{error}</p>}

            {diffResult.length > 0 && (
                <div className="space-y-2">
                    <Label>Difference Result</Label>
                    <div className="p-4 border rounded-lg bg-card min-h-[200px] whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-auto max-h-[600px]">
                        {diffResult.map((part, index) => {
                            let color = "text-foreground";
                            let bg = "bg-transparent";

                            if (part.added) {
                                color = "text-green-800 dark:text-green-300";
                                bg = "bg-green-100 dark:bg-green-900/30";
                            } else if (part.removed) {
                                color = "text-red-800 dark:text-red-300";
                                bg = "bg-red-100 dark:bg-red-900/30";
                            }

                            return (
                                <span key={index} className={`${color} ${bg}`}>
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
