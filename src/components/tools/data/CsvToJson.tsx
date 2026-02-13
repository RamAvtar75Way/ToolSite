"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Upload } from "lucide-react";
import Papa from "papaparse";
import { copyToClipboard } from "@/lib/utils";

export function CsvToJson() {
    const [csv, setCsv] = useState("");
    const [json, setJson] = useState("");
    const [header, setHeader] = useState(true);

    const convert = () => {
        if (!csv) return;

        Papa.parse(csv, {
            header: header,
            skipEmptyLines: true,
            complete: (results) => {
                setJson(JSON.stringify(results.data, null, 2));
            },
            error: (error: any) => {
                setJson("Error parsing CSV: " + error.message);
            }
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setCsv(text);
        };
        reader.readAsText(file);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input CSV</Label>
                <Textarea
                    placeholder="Paste CSV data here..."
                    value={csv}
                    onChange={(e) => setCsv(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                />
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={header}
                                onChange={(e) => setHeader(e.target.checked)}
                                className="rounded border-gray-300"
                            />
                            First row is header
                        </label>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <label className="flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-muted w-full sm:w-auto text-sm font-medium transition-colors bg-background">
                            <Upload className="h-4 w-4 mr-2" /> Upload CSV
                            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                        </label>
                        <Button onClick={convert} className="w-full sm:w-auto">Convert to JSON</Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>JSON Output</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(json)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy JSON
                    </Button>
                </div>
                <Textarea
                    value={json}
                    readOnly
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="JSON output will appear here..."
                />
            </div>
        </div>
    );
}
