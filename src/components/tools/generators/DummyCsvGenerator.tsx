"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function DummyCsvGenerator() {
    const [count, setCount] = useState(5);
    const [csv, setCsv] = useState("");

    const generate = () => {
        let result = "id,name,email,role,isActive\n";
        for (let i = 1; i <= count; i++) {
            result += `${i},User ${i},user${i}@example.com,${i % 3 === 0 ? "admin" : "user"},${Math.random() > 0.5}\n`;
        }
        setCsv(result);
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                    <Label>Number of Rows</Label>
                    <Input
                        type="number"
                        min={1}
                        max={100}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                    />
                </div>
                <Button onClick={generate}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Generate CSV
                </Button>
            </div>

            {csv && (
                <div className="relative">
                    <Textarea
                        value={csv}
                        readOnly
                        className="min-h-[400px] font-mono text-sm whitespace-pre"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => {
                            navigator.clipboard.writeText(csv);
                            toast.success("CSV Copied!");
                        }}
                    >
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
