"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { Copy, Trash2, ArrowRightLeft } from "lucide-react";

export function HtmlEscaper() {
    const [text, setText] = useState("");
    const [isEscaping, setIsEscaping] = useState(true);
    const [result, setResult] = useState("");

    const escapeHtml = (unsafe: string) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    const unescapeHtml = (safe: string) => {
        return safe
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#039;/g, "'");
    }

    const handleChange = (val: string) => {
        setText(val);
        try {
            if (isEscaping) {
                setResult(escapeHtml(val));
            } else {
                setResult(unescapeHtml(val));
            }
        } catch (e) {
            setResult("Error processing text.");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
    };

    const handleClear = () => {
        setText("");
        setResult("");
    };

    const toggleMode = () => {
        setIsEscaping(!isEscaping);
        // Recalculate
        const newMode = !isEscaping;
        try {
            if (newMode) {
                setResult(escapeHtml(text));
            } else {
                setResult(unescapeHtml(text));
            }
        } catch (e) { setResult("") }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <Button onClick={toggleMode} className="gap-2 min-w-[200px]">
                    <ArrowRightLeft className="h-4 w-4" />
                    Switch to {isEscaping ? "Unescape" : "Escape"}
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">{isEscaping ? "Text to Escape" : "HTML to Unescape"}</label>
                    <div className="relative">
                        <Textarea
                            value={text}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder={isEscaping ? "<div>Hello</div>" : "&lt;div&gt;Hello&lt;/div&gt;"}
                            className="min-h-[300px] font-mono p-4"
                        />
                        <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="sm" onClick={handleClear}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Result</label>
                    <div className="relative">
                        <Textarea
                            value={result}
                            readOnly
                            placeholder="Result..."
                            className="min-h-[300px] font-mono p-4 bg-muted"
                        />
                        <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="sm" onClick={handleCopy}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
