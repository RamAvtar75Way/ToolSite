"use client";

import { useState } from "react";
import { Button, Label } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const PREFIXES = ["Poly", "Micro", "Inter", "Tech", "Data", "Smart", "Blue", "Red", "Green", "Open", "Cloud", "Net", "Sys"];
const SUFFIXES = ["soft", "systems", "solutions", "works", "labs", "hub", "box", "sync", "flow", "wave", "bary", "grid"];

export function ProjectNameGenerator() {
    const [names, setNames] = useState<string[]>([]);

    const generate = () => {
        const newNames = [];
        for (let i = 0; i < 12; i++) {
            const pre = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
            const suf = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
            newNames.push(`${pre}${suf}`);
        }
        setNames(newNames);
    };

    return (
        <div className="space-y-6">
            <Button onClick={generate} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" /> Generate Project Names
            </Button>

            {names.length > 0 && (
                <div className="space-y-2">
                    <Label>Results</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {names.map((name, i) => (
                            <div key={i} className="p-4 bg-card border rounded-lg text-center font-bold hover:border-primary cursor-pointer transition-colors" onClick={() => {
                                navigator.clipboard.writeText(name);
                                toast.success("Copied!");
                            }}>
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
