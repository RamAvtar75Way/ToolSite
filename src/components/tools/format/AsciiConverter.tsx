"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy } from "lucide-react";

export function AsciiConverter() {
    const [input, setInput] = useState("");
    const [ascii, setAscii] = useState("");

    const convertToAscii = (text: string) => {
        return text.split("").map(char => char.charCodeAt(0)).join(" ");
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setInput(val);
        setAscii(convertToAscii(val));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(ascii);
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
                    <Label>ASCII Decimal Values</Label>
                    <div className="relative">
                        <Textarea
                            readOnly
                            value={ascii}
                            className="h-48 font-mono bg-muted"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={copyToClipboard}
                            disabled={!ascii}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
