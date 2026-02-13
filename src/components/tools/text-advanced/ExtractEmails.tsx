"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Mail } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function ExtractEmails() {
    const [input, setInput] = useState("");
    const [emails, setEmails] = useState<string[]>([]);

    const extract = () => {
        if (!input) return;

        // Simple but effective email regex
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

        const matches = input.match(emailRegex);
        // Dedup and sort
        const unique = Array.from(new Set(matches || [])).sort();

        setEmails(unique);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input Text (Paste content containing emails)</Label>
                <Textarea
                    placeholder="Contact us at support@example.com or sales@test.co.uk..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px]"
                />
                <Button onClick={extract} className="w-full">
                    <Mail className="h-4 w-4 mr-2" /> Extract Email Addresses
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Result ({emails.length} found)</Label>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(emails.join(", "))}>
                            Copy Comma Separated
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(emails.join("\n"))}>
                            Copy List
                        </Button>
                    </div>
                </div>
                <Textarea
                    value={emails.join("\n")}
                    readOnly
                    className="min-h-[300px] bg-muted/50 font-mono"
                    placeholder="Emails will appear here..."
                />
            </div>
        </div>
    );
}
