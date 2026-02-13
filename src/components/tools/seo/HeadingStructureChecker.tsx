"use client";

import { useState } from "react";
import { Textarea, Button, Label } from "@/components/ui";

export function HeadingStructureChecker() {
    const [input, setInput] = useState("");
    const [structure, setStructure] = useState<{ level: number, text: string, error?: string }[]>([]);

    const checkStructure = () => {
        // Simple regex to find headings in HTML source or Markdown-like
        // This is a basic implementation for the demo
        const lines = input.split("\n");
        const found: { level: number, text: string, error?: string }[] = [];
        let lastLevel = 0;

        lines.forEach(line => {
            const htmlMatch = line.match(/<h([1-6])[^>]*>(.*?)<\/h\1>/i);
            if (htmlMatch) {
                const level = parseInt(htmlMatch[1]);
                const text = htmlMatch[2].replace(/<[^>]+>/g, "").trim(); // Remove inner tags

                let error = undefined;
                if (level === 1 && found.some(h => h.level === 1)) {
                    error = "Multiple H1 tags found (usually bad for SEO)";
                }
                if (level > lastLevel + 1 && lastLevel !== 0) {
                    error = `Skipped heading level (H${lastLevel} -> H${level})`;
                }

                found.push({ level, text, error });
                lastLevel = level;
            }
        });

        if (found.length === 0) {
            // Try to detect plain text content by looking for common patterns if no HTML tags found?
            // For now, let's just say "No headings found"
        }

        setStructure(found);
    };

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Paste HTML Source Code</Label>
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="<h1 class='title'>My Page</h1>..."
                    className="min-h-[400px] font-mono text-xs"
                />
                <Button onClick={checkStructure} className="w-full">Analyze Headings</Button>
            </div>

            <div className="space-y-4">
                <Label>Structure Analysis</Label>
                <div className="border rounded-xl p-6 min-h-[400px] bg-card space-y-2 overflow-y-auto max-h-[600px]">
                    {structure.length === 0 ? (
                        <p className="text-muted-foreground text-center py-10">
                            Enter HTML code and click Analyze to see the heading hierarchy.
                        </p>
                    ) : (
                        structure.map((h, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div
                                    className={`flex items-center gap-2 p-2 rounded hover:bg-muted/50 ${h.error ? "text-red-600 bg-red-50 dark:bg-red-950/20" : ""
                                        }`}
                                    style={{ marginLeft: `${(h.level - 1) * 1.5}rem` }}
                                >
                                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-muted border">
                                        H{h.level}
                                    </span>
                                    <span className="truncate">{h.text || "(Empty Heading)"}</span>
                                </div>
                                {h.error && (
                                    <div className="text-xs text-red-500 pl-14">⚠️ {h.error}</div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
