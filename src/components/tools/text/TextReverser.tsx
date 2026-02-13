"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { Copy, Trash2, ArrowLeftRight } from "lucide-react";

export function TextReverser() {
    const [text, setText] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleClear = () => {
        setText("");
    };

    const reverseText = () => {
        setText(text.split("").reverse().join(""));
    };

    const reverseWords = () => {
        setText(text.split(" ").reverse().join(" "));
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 justify-center">
                <Button onClick={reverseText} className="gap-2">
                    <ArrowLeftRight className="h-4 w-4" />
                    Reverse Text
                </Button>
                <Button onClick={reverseWords} variant="secondary" className="gap-2">
                    Reverse Words
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
                    placeholder="Type here to reverse..."
                    className="min-h-[300px] p-4 text-base resize-y"
                />
            </div>
        </div>
    );
}
