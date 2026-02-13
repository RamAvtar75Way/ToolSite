"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, ArrowRightLeft } from "lucide-react";

export function Rot13Encoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const rot13 = (str: string) => {
        return str.replace(/[a-zA-Z]/g, (char) => {
            const base = char <= "Z" ? 65 : 97;
            return String.fromCharCode(base + (char.charCodeAt(0) - base + 13) % 26);
        });
    };

    const handleConvert = () => {
        setOutput(rot13(input));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Input Text</Label>
                    <Textarea
                        placeholder="Enter text to encode/decode..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="h-48 font-mono"
                    />
                </div>
                <div className="space-y-2">
                    <Label>ROT13 Output</Label>
                    <div className="relative">
                        <Textarea
                            readOnly
                            value={output}
                            className="h-48 font-mono bg-muted"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={copyToClipboard}
                            disabled={!output}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <Button onClick={handleConvert} size="lg">
                    <ArrowRightLeft className="w-4 h-4 mr-2" /> Convert (ROT13 is symmetric)
                </Button>
            </div>
        </div>
    );
}
