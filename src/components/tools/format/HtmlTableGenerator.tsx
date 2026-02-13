"use client";

import { useState } from "react";
import { Button, Textarea, Label, Input } from "@/components/ui";
import { Copy, Table } from "lucide-react";
import Papa from "papaparse";

export function HtmlTableGenerator() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [hasHeader, setHasHeader] = useState(true);

    const generateTable = () => {
        if (!input.trim()) return;

        const result = Papa.parse(input, {
            skipEmptyLines: true,
        });

        const data = result.data as string[][];
        if (!data || data.length === 0) return;

        let html = '<table class="min-w-full divide-y divide-gray-200">\n';

        // Header
        if (hasHeader) {
            html += '  <thead>\n    <tr>\n';
            data[0].forEach(cell => {
                html += `      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${cell}</th>\n`;
            });
            html += '    </tr>\n  </thead>\n';
        }

        // Body
        html += '  <tbody class="bg-white divide-y divide-gray-200">\n';
        const startRow = hasHeader ? 1 : 0;

        for (let i = startRow; i < data.length; i++) {
            html += '    <tr>\n';
            data[i].forEach(cell => {
                html += `      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cell}</td>\n`;
            });
            html += '    </tr>\n';
        }

        html += '  </tbody>\n</table>';
        setOutput(html);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label>Paste CSV or Tab-Separated Data</Label>
                <Textarea
                    placeholder={"Name,Age,Role\nJohn,25,Developer\nSarah,30,Designer"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="h-32 font-mono"
                />
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="hasHeader"
                    checked={hasHeader}
                    onChange={(e) => setHasHeader(e.target.checked)}
                    className="checkbox"
                />
                <Label htmlFor="hasHeader" className="cursor-pointer">First row is header</Label>
            </div>

            <Button onClick={generateTable} className="w-full">
                <Table className="w-4 h-4 mr-2" /> Generate HTML Table
            </Button>

            {output && (
                <div className="space-y-2">
                    <Label>HTML Output</Label>
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
                            onClick={copyToClipboard}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
