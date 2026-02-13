"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Link } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function ExtractUrls() {
    const [input, setInput] = useState("");
    const [urls, setUrls] = useState<string[]>([]);

    const extract = () => {
        if (!input) return;

        // Regex for URLs (http/https/www)
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        const matches = input.match(urlRegex);
        // Dedup and sort
        const unique = Array.from(new Set(matches || [])).sort();

        setUrls(unique);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input Text (Paste content containing links)</Label>
                <Textarea
                    placeholder="Visit https://google.com for more info..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px]"
                />
                <Button onClick={extract} className="w-full">
                    <Link className="h-4 w-4 mr-2" /> Extract URLs
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Result ({urls.length} found)</Label>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(urls.join("\n"))}>
                            <Copy className="h-4 w-4 mr-2" /> Copy List
                        </Button>
                    </div>
                </div>
                <div className="border rounded-xl bg-muted/50 p-4 min-h-[300px] max-h-[500px] overflow-y-auto space-y-2">
                    {urls.length === 0 ? (
                        <p className="text-muted-foreground text-center py-10">
                            URLs will appear here.
                        </p>
                    ) : (
                        urls.map((url, i) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-card rounded border text-sm group hover:border-primary/50 transition-colors">
                                <a href={url} target="_blank" rel="noopener noreferrer" className="truncate text-blue-600 hover:underline flex-1 mr-4">
                                    {url}
                                </a>
                                <Button size="icon" variant="ghost" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(url)}>
                                    <Copy className="h-3 w-3" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
