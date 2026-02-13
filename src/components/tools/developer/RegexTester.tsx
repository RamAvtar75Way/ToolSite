"use client";

import { useState, useMemo } from "react";
import { Input, Textarea } from "@/components/ui";

export function RegexTester() {
    const [regex, setRegex] = useState("");
    const [flags, setFlags] = useState("gm");
    const [text, setText] = useState("");

    const matches = useMemo(() => {
        if (!regex) return [];
        try {
            const re = new RegExp(regex, flags);
            // Highlighting logic is complex in textarea. 
            // For MVP, just return match list.
            const found = text.match(re);
            return found || [];
        } catch (e) {
            return null;
        }
    }, [regex, flags, text]);

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                <div className="space-y-1">
                    <label className="text-sm font-medium">Regular Expression</label>
                    <Input
                        placeholder="/pattern/"
                        value={regex}
                        onChange={(e) => setRegex(e.target.value)}
                        className="font-mono text-lg"
                    />
                </div>
                <div className="space-y-1 w-[100px]">
                    <label className="text-sm font-medium">Flags</label>
                    <Input
                        placeholder="gm"
                        value={flags}
                        onChange={(e) => setFlags(e.target.value)}
                        className="font-mono text-lg"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium">Test String</label>
                <Textarea
                    placeholder="Text to test regex against..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="font-mono min-h-[200px]"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Matches</label>
                <div className="p-4 bg-muted rounded-lg min-h-[100px] font-mono text-sm max-h-[300px] overflow-auto">
                    {matches === null ? (
                        <span className="text-red-500">Invalid Regex</span>
                    ) : matches.length > 0 ? (
                        <ul className="list-decimal pl-5 space-y-1">
                            {Array.from(matches).map((m, i) => (
                                <li key={i} className="break-all">{m}</li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-muted-foreground">No matches found.</span>
                    )}
                </div>
            </div>
        </div>
    );
}
