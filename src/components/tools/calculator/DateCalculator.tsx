"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function DateCalculator() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [diff, setDiff] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);

    const calculate = () => {
        if (!startDate || !endDate) return;
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Ensure start is before end
        const d1 = start < end ? start : end;
        const d2 = start < end ? end : start;

        const totalDays = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));

        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
            days += lastMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setDiff({ years, months, days, totalDays });
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <Button onClick={calculate} size="lg" className="w-full">Calculate Difference</Button>
            </div>

            {diff && (
                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Difference</h3>
                        <div className="text-3xl font-bold text-primary mb-2">
                            {diff.years > 0 && <span>{diff.years} years, </span>}
                            {diff.months > 0 && <span>{diff.months} months, </span>}
                            <span>{diff.days} days</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            or {diff.totalDays} days
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
