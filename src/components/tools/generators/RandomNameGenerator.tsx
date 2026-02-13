"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const FIRST_NAMES = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

export function RandomNameGenerator() {
    const [count, setCount] = useState(10);
    const [names, setNames] = useState<string[]>([]);

    const generate = () => {
        const newNames = [];
        for (let i = 0; i < count; i++) {
            const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
            const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
            newNames.push(`${first} ${last}`);
        }
        setNames(newNames);
    };

    const copyToClipboard = () => {
        if (names.length === 0) return;
        navigator.clipboard.writeText(names.join("\n"));
        toast.success("Names copied to clipboard");
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                    <Label>Number of Names</Label>
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

            {names.length > 0 && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Results</Label>
                        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                            <Copy className="w-4 h-4 mr-2" /> Copy All
                        </Button>
                    </div>
                    <Textarea
                        value={names.join("\n")}
                        readOnly
                        className="min-h-[300px] font-mono"
                    />
                </div>
            )}
        </div>
    );
}
