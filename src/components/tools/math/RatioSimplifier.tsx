"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function RatioSimplifier() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [result, setResult] = useState("");

    const gcd = (x: number, y: number): number => {
        return y === 0 ? x : gcd(y, x % y);
    };

    const simplify = () => {
        const x = parseInt(a);
        const y = parseInt(b);
        if (isNaN(x) || isNaN(y)) return;

        const common = gcd(x, y);
        setResult(`${x / common} : ${y / common}`);
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-center gap-4 text-2xl font-bold">
                <Input
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    className="w-24 text-center h-16 text-2xl"
                    placeholder="A"
                />
                <span>:</span>
                <Input
                    type="number"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    className="w-24 text-center h-16 text-2xl"
                    placeholder="B"
                />
            </div>

            <Button onClick={simplify} className="w-full">Simplify Ratio</Button>

            {result && (
                <div className="text-center space-y-2">
                    <Label>Simplified Ratio</Label>
                    <div className="text-4xl font-bold text-primary">{result}</div>
                </div>
            )}
        </div>
    );
}
