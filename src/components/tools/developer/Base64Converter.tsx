"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { Copy, Trash2, ArrowRightLeft } from "lucide-react";

export function Base64Converter() {
    const [text, setText] = useState("");
    const [isEncoding, setIsEncoding] = useState(true);

    const handleCopy = () => {
        // Logic would be to copy the result, but since I am using one input for "source" and transforming it...
        // wait, usually a converter has Input -> Output.
        // Let's do Input -> Result.
        navigator.clipboard.writeText(result);
    };

    const [result, setResult] = useState("");

    const handleClear = () => {
        setText("");
        setResult("");
    };

    const handleConvert = () => {
        try {
            if (isEncoding) {
                setResult(btoa(text));
            } else {
                setResult(atob(text));
            }
        } catch (e) {
            setResult("Error: Invalid input for decoding.");
        }
    };

    // Auto convert on type or toggle? let's do manual or auto. Auto is nice.
    // But btoa/atob might throw.
    // Let's do effect or just run on render if fast? Better explicit or debounce.
    // I'll stick to a Convert button or just simple "onChange" with try/catch.

    const handleChange = (val: string) => {
        setText(val);
        try {
            if (isEncoding) {
                // encoding usually safe
                setResult(btoa(val));
            } else {
                // decoding might fail if incomplete
                setResult(atob(val));
            }
        } catch (e) {
            // ignore error while typing
        }
    };

    const toggleMode = () => {
        setIsEncoding(!isEncoding);
        setText(result); // Swap input/output for convenience? Or just clear?
        setResult(text); // Swap logic
        // Actually swapping is tricky if invalid. Let's just clear or keep text.
        // Let's just strict toggle mode and recalculate.
        const newMode = !isEncoding;
        try {
            if (newMode) {
                setResult(btoa(text));
            } else {
                setResult(atob(text));
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
                    <label className="text-sm font-medium">{isEncoding ? "Text to Encode" : "Base64 to Decode"}</label>
                    <div className="relative">
                        <Textarea
                            value={text}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder={isEncoding ? "Type text here..." : "Paste Base64 here..."}
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
