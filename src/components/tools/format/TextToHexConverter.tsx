"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy } from "lucide-react";

export function TextToHexConverter() {
    const [input, setInput] = useState("");
    const [hex, setHex] = useState("");

    const convertToHex = (text: string) => {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            result += text.charCodeAt(i).toString(16).padStart(2, "0");
        }
        return result;
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setInput(val);
        setHex(convertToHex(val));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hex);
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
                    <Label>Hexadecimal Output</Label>
                    <div className="relative">
                        <Textarea
                            readOnly
                            value={hex}
                            className="h-48 font-mono bg-muted"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={copyToClipboard}
                            disabled={!hex}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
