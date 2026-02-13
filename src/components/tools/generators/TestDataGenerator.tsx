"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function TestDataGenerator() {
    const [count, setCount] = useState(5);
    const [template, setTemplate] = useState('{"id": {{index}}, "name": "Item {{index}}", "value": {{random100}}}');
    const [result, setResult] = useState("");

    const generate = () => {
        const items = [];
        for (let i = 1; i <= count; i++) {
            let itemStr = template
                .replace(/{{index}}/g, i.toString())
                .replace(/{{random100}}/g, Math.floor(Math.random() * 100).toString())
                .replace(/{{timestamp}}/g, Date.now().toString());
            try {
                // Try to parse if it looks like JSON to validate, but allow any string
                JSON.parse(itemStr);
            } catch (e) {
                // Ignore parse errors, just output string
            }
            items.push(itemStr);
        }
        setResult(items.join("\n"));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Row Template</Label>
                    <Input
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        placeholder='{"id": {{index}}, "name": "Item {{index}}"}'
                    />
                    <p className="text-xs text-muted-foreground">Available vars: {'{{index}}'}, {'{{random100}}'}, {'{{timestamp}}'}</p>
                </div>

                <div className="flex gap-4 items-end">
                    <div className="space-y-2 flex-1">
                        <Label>Count</Label>
                        <Input
                            type="number"
                            min={1}
                            max={100}
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                        />
                    </div>
                    <Button onClick={generate}>
                        <RefreshCw className="w-4 h-4 mr-2" /> Generate
                    </Button>
                </div>
            </div>

            {result && (
                <div className="relative">
                    <Textarea
                        value={result}
                        readOnly
                        className="min-h-[300px] font-mono text-sm whitespace-pre"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => {
                            navigator.clipboard.writeText(result);
                            toast.success("Copied!");
                        }}
                    >
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
