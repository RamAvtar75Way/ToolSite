"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Upload } from "lucide-react";
import Papa from "papaparse";

export function CsvViewer({ separator = "," }: { separator?: string }) {
    const [input, setInput] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [error, setError] = useState("");

    const parse = (text: string) => {
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            delimiter: separator,
            complete: (results) => {
                if (results.data && results.data.length > 0) {
                    setHeaders(Object.keys(results.data[0] as object));
                    setData(results.data);
                    setError("");
                } else {
                    setError("No data found or invalid format.");
                    setData([]);
                    setHeaders([]);
                }
            },
            error: (err: any) => {
                setError(err.message);
            }
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setInput(text);
            parse(text);
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <Label>Input Data ({separator === "\t" ? "TSV" : "CSV"})</Label>
                <Textarea
                    placeholder={`Paste ${separator === "\t" ? "TSV" : "CSV"} data here...`}
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        parse(e.target.value);
                    }}
                    className="min-h-[150px] font-mono text-sm"
                />
                <div className="flex justify-end">
                    <label className="flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-muted text-sm font-medium transition-colors bg-background">
                        <Upload className="h-4 w-4 mr-2" /> Upload File
                        <input type="file" accept={separator === "\t" ? ".tsv,.txt" : ".csv"} onChange={handleFileUpload} className="hidden" />
                    </label>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {data.length > 0 && (
                <div className="space-y-2">
                    <Label>Table View ({data.length} rows)</Label>
                    <div className="rounded-md border overflow-x-auto max-h-[600px]">
                        <table className="w-full text-sm text-left">
                            <thead className="text-muted-foreground bg-muted sticky top-0">
                                <tr>
                                    {headers.map((h, i) => (
                                        <th key={i} className="px-4 py-3 font-medium border-b whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                        {headers.map((h, j) => (
                                            <td key={j} className="px-4 py-2 border-r last:border-r-0 whitespace-nowrap max-w-[300px] overflow-hidden text-ellipsis">
                                                {row[h]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
