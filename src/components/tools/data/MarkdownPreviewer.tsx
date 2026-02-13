"use client";

import { useState, useEffect } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Eye } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { copyToClipboard } from "@/lib/utils";

export function MarkdownPreviewer() {
    const [input, setInput] = useState("# Hello World\n\n- List item 1\n- List item 2\n\n**Bold text**");
    const [html, setHtml] = useState("");

    useEffect(() => {
        try {
            const rawHtml = marked.parse(input);
            // Ensure rawHtml is treated as string since marked.parse can return Promise
            if (typeof rawHtml === 'string') {
                setHtml(DOMPurify.sanitize(rawHtml));
            } else {
                // handle promise if async marked is used (rare in simple setup but good to be safe)
                Promise.resolve(rawHtml).then(res => setHtml(DOMPurify.sanitize(res)));
            }
        } catch (e) {
            setHtml("<p>Error parsing markdown</p>");
        }
    }, [input]);

    return (
        <div className="grid gap-6 md:grid-cols-2 h-[600px]">
            <div className="space-y-4 flex flex-col h-full">
                <Label>Markdown Input</Label>
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 font-mono text-sm resize-none"
                    placeholder="Type markdown here..."
                />
            </div>

            <div className="space-y-4 flex flex-col h-full">
                <div className="flex justify-between items-center">
                    <Label>Preview</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(html)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy HTML
                    </Button>
                </div>
                <div
                    className="flex-1 border rounded-md p-6 overflow-auto prose dark:prose-invert max-w-none bg-card"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
}
