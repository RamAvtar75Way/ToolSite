"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Wand2 } from "lucide-react";

export function CodeBeautifier() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [type, setType] = useState("json");

    const beautify = () => {
        try {
            if (type === "json") {
                const parsed = JSON.parse(input);
                setOutput(JSON.stringify(parsed, null, 2));
            } else if (type === "xml" || type === "html") {
                // Basic simplistic indenter for XML/HTML tags
                let formatted = '';
                let indent = 0;
                input.split(/>\s*</).forEach(node => {
                    if (node.match(/^\/\w/)) indent = Math.max(0, indent - 1); // closing tag

                    formatted += new Array(indent * 2).join(' ') + '<' + node + '>\n';

                    if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith("input") && !node.startsWith("img")) {
                        indent += 1; // opening tag
                    }
                });
                // Remove extra <> added by split glue
                setOutput(formatted.substring(1, formatted.length - 2));
            } else {
                setOutput(input); // Fallback
            }
        } catch (e) {
            setOutput("Error: Invalid content for selected type.");
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
                <div className="flex justify-between items-end">
                    <Label>Input Code</Label>
                    <div className="w-40">
                        {/* Using native select for simplicity given shadcn setup nuances or just reusing pattern */}
                        <select
                            value={type} onChange={(e) => setType(e.target.value)}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="json">JSON</option>
                            <option value="html">HTML / XML</option>
                        </select>
                    </div>
                </div>

                <Textarea
                    placeholder="Paste code here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="h-64 font-mono"
                />

                <div className="flex justify-center">
                    <Button onClick={beautify} size="lg">
                        <Wand2 className="w-4 h-4 mr-2" /> Beautify
                    </Button>
                </div>

                <div className="space-y-2">
                    <Label>Beautified Output</Label>
                    <div className="relative">
                        <Textarea
                            readOnly
                            value={output}
                            className="h-96 font-mono bg-muted"
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
