"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy } from "lucide-react";

export function UnicodeConverter() {
    const [input, setInput] = useState("");
    const [unicode, setUnicode] = useState("");

    const convertToUnicode = (text: string) => {
        return text.split("").map(char => {
            const code = char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
            return `\\u${code}`;
        }).join("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setInput(val);
        setUnicode(convertToUnicode(val));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(unicode);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Input Text</Label>
                    <Textarea
                        placeholder="Type something..."
                        value={input}
                        onChange={handleChange}
                        className="h-48"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Unicode Escape Sequences</Label>
                    <div className="relative">
                        <Textarea
                            readOnly
                            value={unicode}
                            className="h-48 font-mono bg-muted"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={copyToClipboard}
                            disabled={!unicode}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
