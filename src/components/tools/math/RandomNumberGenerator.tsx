"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function RandomNumberGenerator() {
    const [min, setMin] = useState("1");
    const [max, setMax] = useState("100");
    const [count, setCount] = useState("1");
    const [result, setResult] = useState<number[]>([]);

    const generate = () => {
        const mn = parseInt(min);
        const mx = parseInt(max);
        const cnt = parseInt(count);

        if (isNaN(mn) || isNaN(mx) || isNaN(cnt)) return;

        const res = [];
        for (let i = 0; i < cnt; i++) {
            res.push(Math.floor(Math.random() * (mx - mn + 1)) + mn);
        }
        setResult(res);
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Min</Label>
                    <Input type="number" value={min} onChange={(e) => setMin(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Max</Label>
                    <Input type="number" value={max} onChange={(e) => setMax(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Count</Label>
                    <Input type="number" value={count} onChange={(e) => setCount(e.target.value)} />
                </div>
            </div>

            <Button onClick={generate} className="w-full h-12 text-lg">
                <RefreshCw className="h-5 w-5 mr-2" /> Generate
            </Button>

            {result.length > 0 && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Result</Label>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(result.join(", "))}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="p-6 bg-muted/50 rounded-xl min-h-[100px] flex flex-wrap items-center justify-center gap-2 text-2xl font-bold font-mono">
                        {result.map((n, i) => (
                            <span key={i} className="bg-background border px-3 py-1 rounded-md shadow-sm">
                                {n}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
