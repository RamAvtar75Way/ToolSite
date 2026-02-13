"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { Copy, Trash2, Eraser } from "lucide-react";

export function RemoveExtraSpaces() {
    const [text, setText] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleClear = () => {
        setText("");
    };

    const handleRemoveSpaces = () => {
        let newText = text;
        // Replace multiple spaces with single space
        newText = newText.replace(/[ \t]+/g, ' ');
        // Remove leading/trailing spaces from lines
        newText = newText.replace(/^\s+|\s+$/gm, '');
        // Remove multiple newlines (optional, but good for "extra spaces" context usually implies cleaning layout)
        // Let's keep single newlines but remove multiples
        newText = newText.replace(/\n\s*\n/g, '\n');

        setText(newText.trim());
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <Button onClick={handleRemoveSpaces} className="gap-2">
                    <Eraser className="h-4 w-4" />
                    Remove Extra Spaces
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
                    placeholder="Paste your text with extra spaces here..."
                    className="min-h-[300px] p-4 text-base resize-y"
                />
            </div>
        </div>
    );
}
