"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Wand2 } from "lucide-react";
import { format } from "sql-formatter";

export function SqlFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleFormat = () => {
        try {
            const formatted = format(input, { language: "sql" });
            setOutput(formatted);
        } catch (e) {
            setOutput("Error formatting SQL input.");
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <Label>Raw SQL</Label>
                    <Textarea
                        placeholder="SELECT * FROM users WHERE id = 1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="h-48 font-mono"
                    />
                </div>

                <div className="flex justify-center">
                    <Button onClick={handleFormat} size="lg">
                        <Wand2 className="w-4 h-4 mr-2" /> Format SQL
                    </Button>
                </div>

                <div className="space-y-2">
                    <Label>Formatted SQL</Label>
                    <div className="relative">
                        <Textarea
                            readOnly
                            value={output}
                            className="h-64 font-mono bg-muted"
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
