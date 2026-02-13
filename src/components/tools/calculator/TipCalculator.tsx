"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function TipCalculator() {
    const [billAmount, setBillAmount] = useState("");
    const [tipPercent, setTipPercent] = useState("");
    const [people, setPeople] = useState("1");
    const [results, setResults] = useState<{ tipAmount: string; totalAmount: string; perPerson: string } | null>(null);

    const calculate = () => {
        const bill = parseFloat(billAmount);
        const tip = parseFloat(tipPercent);
        const split = parseInt(people);

        if (bill && !isNaN(tip)) {
            const tipVal = (bill * tip) / 100;
            const total = bill + tipVal;
            const perPerson = total / split;

            setResults({
                tipAmount: tipVal.toFixed(2),
                totalAmount: total.toFixed(2),
                perPerson: perPerson.toFixed(2),
            });
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Bill Amount ($)</Label>
                    <Input type="number" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} placeholder="50.00" />
                </div>
                <div className="space-y-4">
                    <Label>Tip Percentage (%)</Label>
                    <div className="grid grid-cols-4 gap-2">
                        {[10, 15, 18, 20].map(p => (
                            <Button key={p} variant={tipPercent === p.toString() ? "default" : "outline"} onClick={() => setTipPercent(p.toString())}>
                                {p}%
                            </Button>
                        ))}
                    </div>
                    <Input type="number" value={tipPercent} onChange={(e) => setTipPercent(e.target.value)} placeholder="Custom Tip %" />
                </div>
                <div className="space-y-2">
                    <Label>Number of People</Label>
                    <Input type="number" value={people} onChange={(e) => setPeople(e.target.value)} placeholder="1" />
                </div>
                <Button onClick={calculate} size="lg" className="w-full">Calculate</Button>
            </div>

            {results && (
                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total per Person</h3>
                        <div className="text-5xl font-bold text-primary mb-2">${results.perPerson}</div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="text-sm text-muted-foreground">Tip Amount</div>
                            <div className="text-xl font-bold">${results.tipAmount}</div>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="text-sm text-muted-foreground">Total Bill</div>
                            <div className="text-xl font-bold">${results.totalAmount}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
