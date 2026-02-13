"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Upload } from "lucide-react";
import Papa from "papaparse";
import { copyToClipboard } from "@/lib/utils";

export function JsonToCsv() {
    const [json, setJson] = useState("");
    const [csv, setCsv] = useState("");

    const convert = () => {
        if (!json) return;

        try {
            const data = JSON.parse(json);
            const result = Papa.unparse(data);
            setCsv(result);
        } catch (error) {
            setCsv("Error: Invalid JSON format.");
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setJson(text);
        };
        reader.readAsText(file);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input JSON</Label>
                <Textarea
                    placeholder='Paste JSON data here (e.g. [{"name": "John", "age": 30}])...'
                    value={json}
                    onChange={(e) => setJson(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                />
                <div className="flex items-center gap-2 justify-end">
                    <label className="flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-muted text-sm font-medium transition-colors bg-background">
                        <Upload className="h-4 w-4 mr-2" /> Upload JSON
                        <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                    </label>
                    <Button onClick={convert}>Convert to CSV</Button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>CSV Output</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(csv)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy CSV
                    </Button>
                </div>
                <Textarea
                    value={csv}
                    readOnly
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="CSV output will appear here..."
                />
            </div>
        </div>
    );
}
