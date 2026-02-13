"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function PercentageIncreaseCalculator() {
    const [initial, setInitial] = useState("");
    const [final, setFinal] = useState("");
    const [result, setResult] = useState<{ diff: number, percent: number } | null>(null);

    const calculate = () => {
        const i = parseFloat(initial);
        const f = parseFloat(final);
        if (isNaN(i) || isNaN(f)) return;

        const diff = f - i;
        const percent = (diff / i) * 100;

        setResult({ diff, percent });
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Initial Value</Label>
                    <Input type="number" value={initial} onChange={(e) => setInitial(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Final Value</Label>
                    <Input type="number" value={final} onChange={(e) => setFinal(e.target.value)} />
                </div>
            </div>

            <Button onClick={calculate} className="w-full">Calculate Difference</Button>

            {result && (
                <div className={`p-6 rounded-xl border text-center space-y-2 ${result.percent >= 0 ? "bg-green-50 dark:bg-green-900/20 border-green-200" : "bg-red-50 dark:bg-red-900/20 border-red-200"}`}>
                    <div className="text-sm text-muted-foreground uppercase font-semibold">
                        {result.percent >= 0 ? "Increase" : "Decrease"}
                    </div>
                    <div className={`text-4xl font-bold ${result.percent >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {result.percent.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Difference: {result.diff}
                    </div>
                </div>
            )}
        </div>
    );
}
