"use client";

import { useState } from "react";
import { Button, Label } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const WORDS = ["Vortex", "Nebula", "Pulse", "Echo", "Zenith", "Apex", "Nova", "Flux", "Orbital", "Vertex", "Prism", "Aura", "Spark"];
const SUFFIXES = ["ify", "ly", "io", "hq", "ai", "app", "lab"];

export function StartupNameGenerator() {
    const [names, setNames] = useState<string[]>([]);

    const generate = () => {
        const newNames = [];
        for (let i = 0; i < 12; i++) {
            const word = WORDS[Math.floor(Math.random() * WORDS.length)];
            const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
            // Mix: Word+Suffix, or Creative Misspelling
            if (Math.random() > 0.5) {
                newNames.push(`${word}${suffix}`);
            } else {
                // Drop last vowel for 'modern' feel?
                newNames.push(word.replace(/[aeiou]$/, '') + suffix);
            }
        }
        setNames(newNames);
    };

    return (
        <div className="space-y-6">
            <Button onClick={generate} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" /> Generate Startup Names
            </Button>

            {names.length > 0 && (
                <div className="space-y-2">
                    <Label>Results</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {names.map((name, i) => (
                            <div key={i} className="p-4 bg-card border rounded-lg text-center font-bold text-lg hover:border-primary cursor-pointer transition-colors" onClick={() => {
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
