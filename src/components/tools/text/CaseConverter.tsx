"use client";

import { useState } from "react";
import { Button, Textarea, Card, CardContent } from "@/components/ui";
import { Copy, Trash2, ArrowRight } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function CaseConverter() {
    const [text, setText] = useState("");

    const handleCopy = () => {
        copyToClipboard(text);
    };

    const handleClear = () => {
        setText("");
    };

    const convertTo = (type: "upper" | "lower" | "title" | "sentence" | "alternating") => {
        switch (type) {
            case "upper":
                setText(text.toUpperCase());
                break;
            case "lower":
                setText(text.toLowerCase());
                break;
            case "title":
                setText(
                    text.toLowerCase().split(' ').map(function (word) {
                        return (word.charAt(0).toUpperCase() + word.slice(1));
                    }).join(' ')
                );
                break;
            case "sentence":
                setText(
                    text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
                        return c.toUpperCase();
                    })
                );
                break;
            case "alternating":
                setText(
                    text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
                )
                break;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={() => convertTo("upper")}>UPPER CASE</Button>
                <Button onClick={() => convertTo("lower")}>lower case</Button>
                <Button onClick={() => convertTo("title")}>Title Case</Button>
                <Button onClick={() => convertTo("sentence")}>Sentence case</Button>
                <Button onClick={() => convertTo("alternating")}>aLtErNaTiNg cAsE</Button>
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
                    placeholder="Type or paste your text here to convert..."
                    className="min-h-[300px] p-4 pr-24 text-base resize-y font-mono"
                />
            </div>
        </div>
    );
}
