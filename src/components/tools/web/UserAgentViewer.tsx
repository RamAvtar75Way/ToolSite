"use client";

import { useState, useEffect } from "react";
import { Button, Textarea } from "@/components/ui";
import { Copy } from "lucide-react";

export function UserAgentViewer() {
    const [ua, setUa] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUa(navigator.userAgent);
        }
    }, []);

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 border rounded-xl bg-card shadow-sm space-y-4">
                <h3 className="font-semibold text-lg">Your User Agent String</h3>
                <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all">
                    {ua || "Loading..."}
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(ua)}
                    disabled={!ua}
                    className="w-full"
                >
                    <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                </Button>
            </div>

            <div className="text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg">
                <p><strong>What is a User Agent?</strong></p>
                <p className="mt-1">
                    A user agent is a string of text that your web browser sends to every website you visit.
                    It identifies the browser, version, and operating system you are using.
                </p>
            </div>
        </div>
    );
}
