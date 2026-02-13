"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { Copy, Trash2, ArrowRightLeft } from "lucide-react";

export function UrlEncoder() {
    const [text, setText] = useState("");
    const [isEncoding, setIsEncoding] = useState(true);
    const [result, setResult] = useState("");

    const handleChange = (val: string) => {
        setText(val);
        try {
            if (isEncoding) {
                setResult(encodeURIComponent(val));
            } else {
                setResult(decodeURIComponent(val));
            }
        } catch (e) {
            setResult("Error: Invalid URI sequence.");
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
        setIsEncoding(!isEncoding);
        // Recalculate based on current text
        const newMode = !isEncoding;
        try {
            if (newMode) {
                setResult(encodeURIComponent(text));
            } else {
                setResult(decodeURIComponent(text));
            }
        } catch (e) { setResult("") }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <Button onClick={toggleMode} className="gap-2 min-w-[200px]">
                    <ArrowRightLeft className="h-4 w-4" />
                    Switch to {isEncoding ? "Decode" : "Encode"}
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">{isEncoding ? "URL to Encode" : "URL to Decode"}</label>
                    <div className="relative">
                        <Textarea
                            value={text}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder={isEncoding ? "Paste URL here..." : "Paste encoded URL here..."}
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
