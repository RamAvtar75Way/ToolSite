"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Minimize2 } from "lucide-react";

export function SqlMinifier() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleMinify = () => {
        // Simple Minification: remove newlines, tabs, and excess whitespace
        const minified = input
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/\s*([,()])\s*/g, '$1') // Remove space around parenthesis and commas
            .trim();
        setOutput(minified);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <Label>Formatted SQL</Label>
                    <Textarea
                        placeholder="SELECT * &#10;FROM users &#10;WHERE id = 1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="h-48 font-mono"
                    />
                </div>

                <div className="flex justify-center">
                    <Button onClick={handleMinify} size="lg">
                        <Minimize2 className="w-4 h-4 mr-2" /> Minify SQL
                    </Button>
                </div>

                <div className="space-y-2">
                    <Label>Minified SQL</Label>
                    <div className="relative">
                        <Textarea
                            readOnly
                            value={output}
                            className="h-32 font-mono bg-muted"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={() => navigator.clipboard.writeText(output)}
                            disabled={!output}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
