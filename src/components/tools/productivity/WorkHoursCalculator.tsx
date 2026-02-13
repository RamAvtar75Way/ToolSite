"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function WorkHoursCalculator() {
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("17:00");
    const [breakDuration, setBreakDuration] = useState(30); // minutes
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const [startH, startM] = start.split(":").map(Number);
        const [endH, endM] = end.split(":").map(Number);

        const startDate = new Date();
        startDate.setHours(startH, startM, 0);

        const endDate = new Date();
        endDate.setHours(endH, endM, 0);

        // Handle overnight shift by adding a day to end date
        if (endDate < startDate) {
            endDate.setDate(endDate.getDate() + 1);
        }

        const diffMs = endDate.getTime() - startDate.getTime();
        const diffMinutes = Math.floor(diffMs / 60000);

        const workMinutes = diffMinutes - breakDuration;

        const hours = Math.floor(workMinutes / 60);
        const minutes = workMinutes % 60;

        setResult(`${hours}h ${minutes}m`);
    };

    return (
        <div className="max-w-md mx-auto space-y-8">
            <div className="bg-card border rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Break Duration (minutes)</Label>
                    <Input
                        type="number" min="0"
                        value={breakDuration}
                        onChange={(e) => setBreakDuration(Number(e.target.value))}
                    />
                </div>

                <Button size="lg" className="w-full" onClick={calculate}>Calculate Hours</Button>
            </div>

            {result && (
                <div className="text-center p-6 bg-muted rounded-xl">
                    <div className="text-sm text-muted-foreground uppercase tracking-wide font-semibold mb-2">Total Working Time</div>
                    <div className="text-4xl font-bold text-primary">{result}</div>
                </div>
            )}
        </div>
    );
}
