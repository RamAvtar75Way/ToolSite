"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { Copy, Trash2, CheckCircle2 } from "lucide-react";

export function DuplicateLineRemover() {
    const [text, setText] = useState("");
    const [removedCount, setRemovedCount] = useState<number | null>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleClear = () => {
        setText("");
        setRemovedCount(null);
    };

    const handleRemoveDuplicates = () => {
        const lines = text.split("\n");
        const uniqueLines = Array.from(new Set(lines));
        const count = lines.length - uniqueLines.length;

        setText(uniqueLines.join("\n"));
        setRemovedCount(count);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
                <Button onClick={handleRemoveDuplicates} size="lg" className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Remove Duplicate Lines
                </Button>
                {removedCount !== null && (
                    <div className="text-green-600 font-medium">
                        Removed {removedCount} duplicate lines!
                    </div>
                )}
            </div>

            <div className="relative">
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                    <Button variant="ghost" size="sm" onClick={handleCopy} title="Copy to clipboard">
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleClear} title="Clear text">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <Textarea
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        setRemovedCount(null);
                    }}
                    placeholder="Paste your list here..."
                    className="min-h-[300px] p-4 text-base resize-y font-mono whitespace-pre"
                />
                <div className="text-right text-sm text-muted-foreground mt-2">
                    Total Lines: {text ? text.split("\n").length : 0}
                </div>
            </div>
        </div>
    );
}
