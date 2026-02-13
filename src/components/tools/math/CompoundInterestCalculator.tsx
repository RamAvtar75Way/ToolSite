"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { DollarSign } from "lucide-react";

export function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState("1000");
    const [rate, setRate] = useState("5");
    const [time, setTime] = useState("10");
    const [frequency, setFrequency] = useState("12"); // Monthly default
    const [result, setResult] = useState<{ amount: number, interest: number } | null>(null);

    const calculate = () => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(time);
        const n = parseFloat(frequency);

        if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) return;

        const A = P * Math.pow((1 + r / n), n * t);
        const Interest = A - P;

        setResult({ amount: A, interest: Interest });
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Principal Amount ($)</Label>
                    <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Annual Interest Rate (%)</Label>
                    <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Time Period (Years)</Label>
                    <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Compounding Frequency</Label>
                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="1">Annually (1/yr)</option>
                        <option value="2">Semi-Annually (2/yr)</option>
                        <option value="4">Quarterly (4/yr)</option>
                        <option value="12">Monthly (12/yr)</option>
                        <option value="52">Weekly (52/yr)</option>
                        <option value="365">Daily (365/yr)</option>
                    </select>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </div>

            <div className="flex flex-col justify-center space-y-6">
                <div className="p-6 bg-muted rounded-xl border space-y-4">
                    <div className="space-y-1">
                        <Label className="text-muted-foreground">Future Value</Label>
                        <div className="text-4xl font-bold text-primary">
                            ${result ? result.amount.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0.00"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-muted-foreground">Total Interest Earned</Label>
                        <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                            +${result ? result.interest.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0.00"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
