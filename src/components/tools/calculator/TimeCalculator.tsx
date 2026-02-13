"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function TimeCalculator() {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [diff, setDiff] = useState<{ hours: number; minutes: number } | null>(null);

    const calculate = () => {
        if (!startTime || !endTime) return;

        const [h1, m1] = startTime.split(':').map(Number);
        const [h2, m2] = endTime.split(':').map(Number);

        let minutes = (h2 * 60 + m2) - (h1 * 60 + m1);
        if (minutes < 0) minutes += 24 * 60; // Handle overnight

        const h = Math.floor(minutes / 60);
        const m = minutes % 60;

        setDiff({ hours: h, minutes: m });
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
                <Button onClick={calculate} size="lg" className="w-full">Calculate Duration</Button>
            </div>

            {diff && (
                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Duration</h3>
                        <div className="text-4xl font-bold text-primary">
                            {diff.hours} hrs {diff.minutes} mins
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
