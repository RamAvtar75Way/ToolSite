"use client";

import { useState } from "react";
import { Button, Label, Input } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function PasswordGenerator() {
    const [length, setLength] = useState(16);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useLowercase, setUseLowercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [password, setPassword] = useState("");

    const generate = () => {
        let charset = "";
        if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useNumbers) charset += "0123456789";
        if (useSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (!charset) return;

        let result = "";
        const values = new Uint32Array(length);
        crypto.getRandomValues(values);
        for (let i = 0; i < length; i++) {
            result += charset[values[i] % charset.length];
        }
        setPassword(result);
    };

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="relative">
                <div className="p-6 pr-12 bg-muted rounded-xl text-center break-all font-mono text-xl min-h-[80px] flex items-center justify-center">
                    {password || "Click Generate"}
                </div>
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(password)}
                    disabled={!password}
                >
                    <Copy className="h-4 w-4" />
                </Button>
            </div>

            <Button onClick={generate} size="lg" className="w-full text-lg h-12">
                <RefreshCw className="mr-2 h-5 w-5" /> Generate Password
            </Button>

            <div className="space-y-6 p-6 border rounded-xl bg-card">
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label>Password Length ({length})</Label>
                    </div>
                    <input
                        type="range" min="4" max="64"
                        value={length} onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full accent-primary"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} className="accent-primary w-5 h-5" />
                        <span>Uppercase (A-Z)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={useLowercase} onChange={(e) => setUseLowercase(e.target.checked)} className="accent-primary w-5 h-5" />
                        <span>Lowercase (a-z)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="accent-primary w-5 h-5" />
                        <span>Numbers (0-9)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="accent-primary w-5 h-5" />
                        <span>Symbols (!@#$)</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
