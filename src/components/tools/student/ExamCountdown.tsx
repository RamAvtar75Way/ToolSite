"use client";

import { useState, useEffect } from "react";
import { Button, Input, Label } from "@/components/ui";

export function ExamCountdown() {
    const [examName, setExamName] = useState("");
    const [examDate, setExamDate] = useState("");
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        if (!examDate) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(examDate).getTime();
            const distance = target - now;

            if (distance < 0) {
                setTimeLeft(null);
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [examDate]);

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Exam Name</Label>
                    <Input value={examName} onChange={(e) => setExamName(e.target.value)} placeholder="Calculus Final" />
                </div>
                <div className="space-y-2">
                    <Label>Date & Time</Label>
                    <Input type="datetime-local" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
                </div>
            </div>

            {timeLeft ? (
                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                    <h3 className="text-lg font-semibold">{examName || "Exam"} Starts In:</h3>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="p-4 border rounded-lg bg-card">
                            <div className="text-3xl font-bold">{timeLeft.days}</div>
                            <div className="text-xs uppercase tracking-wider">Days</div>
                        </div>
                        <div className="p-4 border rounded-lg bg-card">
                            <div className="text-3xl font-bold">{timeLeft.hours}</div>
                            <div className="text-xs uppercase tracking-wider">Hrs</div>
                        </div>
                        <div className="p-4 border rounded-lg bg-card">
                            <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                            <div className="text-xs uppercase tracking-wider">Mins</div>
                        </div>
                        <div className="p-4 border rounded-lg bg-card">
                            <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                            <div className="text-xs uppercase tracking-wider">Secs</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg text-muted-foreground">
                    {examDate ? "Exam has passed!" : "Set a date to start countdown."}
                </div>
            )}
        </div>
    );
}
