"use client";

import { useState } from "react";
import { Button, Textarea, Input, Label } from "@/components/ui";
import { Copy, RefreshCw, ArrowRight } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function FindReplaceTool() {
    const [text, setText] = useState("");
    const [findStr, setFindStr] = useState("");
    const [replaceStr, setReplaceStr] = useState("");
    const [result, setResult] = useState("");
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [useRegex, setUseRegex] = useState(false);
    const [matchCount, setMatchCount] = useState<number | null>(null);

    const handleReplace = () => {
        if (!text) return;

        try {
            let flags = "g";
            if (!caseSensitive) flags += "i";

            let searchPattern: string | RegExp = findStr;

            if (useRegex) {
                searchPattern = new RegExp(findStr, flags);
            } else {
                // Escape special regex chars if not using regex mode
                const escaped = findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchPattern = new RegExp(escaped, flags);
            }

            const matches = text.match(searchPattern);
            setMatchCount(matches ? matches.length : 0);

            const newText = text.replace(searchPattern, replaceStr);
            setResult(newText);
        } catch (error) {
            setResult("Error: Invalid Regular Expression");
            setMatchCount(0);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                    <Label>Input Text</Label>
                    <Textarea
                        placeholder="Paste your text here..."
                        className="min-h-[300px]"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-xl space-y-4">
                        <Label>Find & Replace Settings</Label>
                        <div className="grid gap-2">
                            <Input
                                placeholder="Find..."
                                value={findStr}
                                onChange={(e) => setFindStr(e.target.value)}
                            />
                            <div className="flex justify-center">
                                <ArrowRight className="text-muted-foreground h-4 w-4 rotate-90" />
                            </div>
                            <Input
                                placeholder="Replace with..."
                                value={replaceStr}
                                onChange={(e) => setReplaceStr(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={caseSensitive}
                                    onChange={(e) => setCaseSensitive(e.target.checked)}
                                    className="rounded border-gray-300"
                                />
                                Case Sensitive
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={useRegex}
                                    onChange={(e) => setUseRegex(e.target.checked)}
                                    className="rounded border-gray-300"
                                />
                                Use Regex
                            </label>
                        </div>

                        <Button onClick={handleReplace} className="w-full">
                            Replace All
                        </Button>

                        {matchCount !== null && (
                            <p className="text-sm text-center text-muted-foreground">
                                {matchCount} occurrence{matchCount !== 1 ? 's' : ''} replaced
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {result && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Result</Label>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(result)}>
                            <Copy className="h-4 w-4 mr-2" /> Copy Result
                        </Button>
                    </div>
                    <Textarea
                        value={result}
                        readOnly
                        className="min-h-[200px] bg-muted/30"
                    />
                </div>
            )}
        </div>
    );
}
