"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { Copy, Trash2, ArrowDownAZ, ArrowUpAZ, Shuffle } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function TextSorter() {
    const [text, setText] = useState("");

    const handleCopy = () => {
        copyToClipboard(text);
    };

    const handleClear = () => {
        setText("");
    };

    const handleSort = (type: "az" | "za" | "length" | "reverse" | "random") => {
        const lines = text.split("\n");
        let sortedLines = [...lines];

        switch (type) {
            case "az":
                sortedLines.sort();
                break;
            case "za":
                sortedLines.sort().reverse();
                break;
            case "length":
                sortedLines.sort((a, b) => a.length - b.length);
                break;
            case "reverse":
                sortedLines.reverse();
                break;
            case "random":
                sortedLines.sort(() => Math.random() - 0.5);
                break;
        }
        setText(sortedLines.join("\n"));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={() => handleSort("az")}>
                    <ArrowDownAZ className="mr-2 h-4 w-4" /> A-Z
                </Button>
                <Button onClick={() => handleSort("za")}>
                    <ArrowUpAZ className="mr-2 h-4 w-4" /> Z-A
                </Button>
                <Button onClick={() => handleSort("length")}>Shortest First</Button>
                <Button onClick={() => handleSort("reverse")}>Reverse Order</Button>
                <Button onClick={() => handleSort("random")}>
                    <Shuffle className="mr-2 h-4 w-4" /> Randomize
                </Button>
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
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your list here to sort..."
                    className="min-h-[300px] p-4 pr-24 text-base resize-y font-mono whitespace-pre"
                />
                <div className="text-right text-sm text-muted-foreground mt-2">
                    Lines: {text ? text.split("\n").length : 0}
                </div>
            </div>
        </div>
    );
}
