"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function DummyJsonGenerator() {
    const [count, setCount] = useState(5);
    const [json, setJson] = useState("");

    const generate = () => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                name: `User ${i}`,
                email: `user${i}@example.com`,
                role: i % 3 === 0 ? "admin" : "user",
                isActive: Math.random() > 0.5
            });
        }
        setJson(JSON.stringify(data, null, 2));
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                    <Label>Number of Records</Label>
                    <Input
                        type="number"
                        min={1}
                        max={100}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                    />
                </div>
                <Button onClick={generate}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Generate JSON
                </Button>
            </div>

            {json && (
                <div className="relative">
                    <Textarea
                        value={json}
                        readOnly
                        className="min-h-[400px] font-mono text-sm"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => {
                            navigator.clipboard.writeText(json);
                            toast.success("JSON Copied!");
                        }}
                    >
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
