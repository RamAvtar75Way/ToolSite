"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { Copy, Trash2, Braces, Minimize2 } from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";

export function JsonFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleCopy = () => {
        copyToClipboard(output);
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError(null);
    };

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
            setError(null);
        } catch (e) {
            setError((e as Error).message);
            setOutput("");
        }
    };

    const handleMinify = () => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
        } catch (e) {
            setError((e as Error).message);
            setOutput("");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={handleFormat} className="gap-2">
                    <Braces className="h-4 w-4" />
                    Format / Beautify
                </Button>
                <Button onClick={handleMinify} variant="secondary" className="gap-2">
                    <Minimize2 className="h-4 w-4" />
                    Minify
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                    <label className="text-sm font-medium mb-2 block">Input JSON</label>
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste JSON here..."
                        className="min-h-[400px] font-mono text-sm pr-12"
                    />
                    <div className="absolute top-8 right-2">
                        <Button variant="ghost" size="sm" onClick={handleClear} title="Clear">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="relative">
                    <label className="text-sm font-medium mb-2 block">Output</label>
                    <Textarea
                        value={output}
                        readOnly
                        placeholder="Result will appear here..."
                        className={cn("min-h-[400px] font-mono text-sm pr-12 bg-muted", error ? "border-red-500" : "")}
                    />
                    {error && (
                        <div className="mt-2 text-sm text-red-500 font-medium p-2 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-900">
                            Error: {error}
                        </div>
                    )}
                    <div className="absolute top-8 right-2">
                        <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output} title="Copy">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
