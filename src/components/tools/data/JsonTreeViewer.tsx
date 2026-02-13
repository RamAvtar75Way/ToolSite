"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Upload } from "lucide-react";

// Simple recursive JSON Node viewer
const JsonNode = ({ name, value, depth = 0 }: { name?: string; value: any; depth?: number }) => {
    const [isExpanded, setIsExpanded] = useState(depth < 2);

    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);

    if (!isObject) {
        let displayValue = JSON.stringify(value);
        let color = "text-green-600 dark:text-green-400";
        if (typeof value === 'number') color = "text-blue-600 dark:text-blue-400";
        if (typeof value === 'boolean') color = "text-purple-600 dark:text-purple-400";
        if (value === null) color = "text-gray-500";

        return (
            <div className="ml-4 font-mono text-sm leading-relaxed">
                {name && <span className="text-purple-700 dark:text-purple-300 mr-2">"{name}":</span>}
                <span className={color}>{displayValue}</span>
            </div>
        );
    }

    return (
        <div className="ml-4 font-mono text-sm">
            <div
                className="flex items-center cursor-pointer hover:bg-muted/50 rounded px-1 -ml-1"
                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            >
                <span className="text-muted-foreground mr-1 w-4 inline-block text-center">{isExpanded ? '▼' : '▶'}</span>
                {name && <span className="text-purple-700 dark:text-purple-300 mr-2">"{name}":</span>}
                <span className="text-muted-foreground">
                    {isArray ? `Array(${value.length})` : `Object{${Object.keys(value).length}}`}
                    {!isExpanded && " ..."}
                </span>
            </div>

            {isExpanded && (
                <div className="border-l border-muted-foreground/20 ml-2 pl-2">
                    {Object.entries(value).map(([key, val]) => (
                        <JsonNode key={key} name={isArray ? undefined : key} value={val} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export function JsonTreeViewer() {
    const [input, setInput] = useState("");
    const [parsed, setParsed] = useState<any>(null);
    const [error, setError] = useState("");

    const handleInput = (text: string) => {
        setInput(text);
        if (!text.trim()) {
            setParsed(null);
            setError("");
            return;
        }
        try {
            const data = JSON.parse(text);
            setParsed(data);
            setError("");
        } catch (e) {
            setError("Invalid JSON");
            setParsed(null);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            handleInput(ev.target?.result as string);
        };
        reader.readAsText(file);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input JSON</Label>
                <Textarea
                    placeholder='{"key": "value", "nested": { ... }}'
                    value={input}
                    onChange={(e) => handleInput(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                />
                <div className="flex justify-end">
                    <label className="flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-muted text-sm font-medium transition-colors bg-background">
                        <Upload className="h-4 w-4 mr-2" /> Upload JSON
                        <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                    </label>
                </div>
                {error && <p className="text-red-500 font-medium">{error}</p>}
            </div>

            <div className="space-y-4">
                <Label>Tree View</Label>
                <div className="p-4 border rounded-xl bg-card min-h-[400px] max-h-[600px] overflow-auto">
                    {parsed ? (
                        <JsonNode value={parsed} />
                    ) : (
                        <p className="text-muted-foreground text-center py-10">
                            Valid JSON will appear here as a tree.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
