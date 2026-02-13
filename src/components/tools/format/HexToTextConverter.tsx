"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy } from "lucide-react";

export function HexToTextConverter() {
    const [hex, setHex] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const convertToText = (hexInput: string) => {
        const cleanHex = hexInput.replace(/\s/g, "");
        if (!/^[0-9a-fA-F]*$/.test(cleanHex)) {
            return "Invalid hex characters";
        }

        let str = "";
        for (let i = 0; i < cleanHex.length; i += 2) {
            str += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
        }
        return str;
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setHex(val);
        try {
            setText(convertToText(val));
            setError("");
        } catch (e) {
            setError("Invalid hex input");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Hexadecimal Input</Label>
                    <Textarea
                        placeholder="e.g. 48656c6c6f"
                        value={hex}
                        onChange={handleChange}
                        className="h-48 font-mono"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Text Output</Label>
                    <div className="relative">
                        <Textarea
                            readOnly
                            value={text}
                            className="h-48 bg-muted"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={copyToClipboard}
                            disabled={!text}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                </div>
            </div>
        </div>
    );
}
