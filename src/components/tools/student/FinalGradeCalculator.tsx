"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function FinalGradeCalculator() {
    const [currentGrade, setCurrentGrade] = useState("");
    const [targetGrade, setTargetGrade] = useState("");
    const [finalWeight, setFinalWeight] = useState("");
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const current = parseFloat(currentGrade);
        const target = parseFloat(targetGrade);
        const weight = parseFloat(finalWeight);

        if (!isNaN(current) && !isNaN(target) && !isNaN(weight)) {
            // Formula: Final = (Target - Current * (1 - Weight/100)) / (Weight/100)
            const currentWeight = 1 - (weight / 100);
            const required = (target - (current * currentWeight)) / (weight / 100);
            setResult(required.toFixed(2));
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Current Grade (%)</Label>
                    <Input type="number" value={currentGrade} onChange={(e) => setCurrentGrade(e.target.value)} placeholder="85" />
                </div>
                <div className="space-y-2">
                    <Label>Target Grade (%)</Label>
                    <Input type="number" value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)} placeholder="90" />
                </div>
                <div className="space-y-2">
                    <Label>Final Exam Weight (%)</Label>
                    <Input type="number" value={finalWeight} onChange={(e) => setFinalWeight(e.target.value)} placeholder="20" />
                </div>
                <Button onClick={calculate} size="lg" className="w-full">Calculate Required Score</Button>
            </div>

            {result && (
                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">You need to score</h3>
                        <div className="text-5xl font-bold text-primary mb-2">{result}%</div>
                        <p className="text-sm text-muted-foreground">on your final exam to get a {targetGrade}% overall.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
