"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Code } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

// Simple XML formatter using DOMParser and XMLSerializer
const formatXml = (xml: string) => {
    try {
        let formatted = '';
        let indent = '';
        const tab = '  ';
        xml.split(/>\s*</).forEach(function (node) {
            if (node.match(/^\/\w/)) indent = indent.substring(tab.length); // decrease indent
            formatted += indent + '<' + node + '>\r\n';
            if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab;              // increase indent
        });
        return formatted.substring(1, formatted.length - 3);
    } catch (e) {
        return xml; // Fallback
    }
};

export function XmlFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const process = () => {
        if (!input) return;
        // Naive but effective for client-side without heavy libs
        const formatted = formatXml(input);
        setOutput(formatted);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input XML</Label>
                <Textarea
                    placeholder="<root><child>value</child></root>"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                />
                <Button onClick={process} className="w-full">Format XML</Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Formatted XML</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(output)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                </div>
                <Textarea
                    value={output}
                    readOnly
                    className="min-h-[300px] font-mono text-sm"
                />
            </div>
        </div>
    );
}
