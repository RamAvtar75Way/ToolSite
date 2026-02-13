"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function UuidGenerator() {
    const [uuid, setUuid] = useState("");
    const [count, setCount] = useState(1);
    const [uuids, setUuids] = useState<string[]>([]);

    const generate = () => {
        const newUuids = [];
        for (let i = 0; i < count; i++) {
            if (typeof crypto.randomUUID === 'function') {
                newUuids.push(crypto.randomUUID());
            } else {
                // Fallback
                newUuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                }));
            }
        }
        setUuids(newUuids);
        setUuid(newUuids[0]);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 w-24">
                    <Label>Count</Label>
                    <Input type="number" min="1" max="50" value={count} onChange={(e) => setCount(parseInt(e.target.value))} />
                </div>
                <Button onClick={generate} size="lg" className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" /> Generate UUID(s)
                </Button>
            </div>

            {uuids.length > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    {uuids.length === 1 ? (
                        <div className="p-6 border rounded-xl bg-card shadow-sm text-center">
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Your UUID</div>
                            <div className="text-3xl font-mono font-bold text-primary break-all">{uuid}</div>
                            <Button variant="ghost" className="mt-4" onClick={() => copyToClipboard(uuid)}>
                                <Copy className="mr-2 h-4 w-4" /> Copy
                            </Button>
                        </div>
                    ) : (
                        <div className="p-4 border rounded-xl bg-card shadow-sm space-y-2 max-h-[400px] overflow-y-auto">
                            {uuids.map((id, i) => (
                                <div key={i} className="flex gap-2 items-center font-mono text-sm p-2 hover:bg-muted rounded text-xs md:text-sm">
                                    <span className="text-muted-foreground w-6 text-right">{i + 1}.</span>
                                    <span className="flex-1 break-all">{id}</span>
                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => copyToClipboard(id)}>
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                    {uuids.length > 1 && (
                        <Button variant="outline" className="w-full" onClick={() => copyToClipboard(uuids.join("\n"))}>
                            <Copy className="mr-2 h-4 w-4" /> Copy All
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
