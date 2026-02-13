"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Trash2, List, CaseSensitive, AlignLeft } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function NotesFormatter() {
    const [text, setText] = useState("");

    const formatBullets = () => {
        const lines = text.split("\n");
        const formatted = lines.map(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
                return `• ${trimmed.substring(1).trim()}`;
            }
            return line;
        });
        setText(formatted.join("\n"));
    };

    const formatSentenceCase = () => {
        const sentences = text.split(/([.!?]+[\s\n]+)/);
        const formatted = sentences.map(part => {
            if (part.match(/[.!?]+[\s\n]+/)) return part;
            return part.charAt(0).toUpperCase() + part.slice(1);
        });
        setText(formatted.join(""));
    };

    const fixSpacing = () => {
        let newText = text;
        // Remove multiple spaces
        newText = newText.replace(/[ \t]+/g, ' ');
        // Ensure space after punctuation
        newText = newText.replace(/([.,!?])(?=[a-zA-Z])/g, "$1 ");
        setText(newText);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={formatBullets} variant="outline" className="gap-2">
                    <List className="h-4 w-4" /> Bullet Points
                </Button>
                <Button onClick={formatSentenceCase} variant="outline" className="gap-2">
                    <CaseSensitive className="h-4 w-4" /> Sentence Case
                </Button>
                <Button onClick={fixSpacing} variant="outline" className="gap-2">
                    <AlignLeft className="h-4 w-4" /> Fix Spacing
                </Button>
            </div>

            <div className="relative">
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(text)} title="Copy to clipboard">
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setText("")} title="Clear text">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your messy notes here..."
                    className="min-h-[400px] p-4 pr-24 text-base resize-y"
                />
            </div>

            <div className="text-sm text-muted-foreground text-center">
                Use the buttons above to instantly format your text.
            </div>
        </div>
    );
}
