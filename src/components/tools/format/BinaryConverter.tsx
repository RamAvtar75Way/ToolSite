"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, ArrowRightLeft } from "lucide-react";

export function BinaryConverter() {
    const [text, setText] = useState("");
    const [binary, setBinary] = useState("");

    const textToBinary = (input: string) => {
        return input.split("").map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, "0");
        }).join(" ");
    };

    const binaryToText = (input: string) => {
        return input.split(" ").map(bin => {
            return String.fromCharCode(parseInt(bin, 2));
        }).join("");
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setText(val);
        setBinary(textToBinary(val));
    };

    const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setBinary(val);
        try {
            setText(binaryToText(val.trim()));
        } catch (e) {
            // Ignore parse errors while typing
        }
    };

    const copyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Text Input</Label>
                    <div className="relative">
                        <Textarea
                            placeholder="Enter text..."
                            value={text}
                            onChange={handleTextChange}
                            className="h-64 font-mono"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(text)}
                            disabled={!text}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Binary Output (Space separated)</Label>
                    <div className="relative">
                        <Textarea
                            placeholder="01001000 01100101 01101100 01101100 01101111..."
                            value={binary}
                            onChange={handleBinaryChange}
                            className="h-64 font-mono bg-muted/50"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(binary)}
                            disabled={!binary}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <p className="text-sm text-center text-muted-foreground">
                Type in either box to convert instantly. Binary must be space-separated 8-bit blocks for accurate conversion.
            </p>
        </div>
    );
}
