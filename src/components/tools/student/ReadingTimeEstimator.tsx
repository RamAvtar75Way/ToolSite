"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

export function ReadingTimeEstimator() {
    const [text, setText] = useState("");
    const [wpm, setWpm] = useState(200);
    const [time, setTime] = useState<{ minutes: number; seconds: number } | null>(null);

    const calculate = () => {
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const totalSeconds = (words / wpm) * 60;

        setTime({
            minutes: Math.floor(totalSeconds / 60),
            seconds: Math.floor(totalSeconds % 60),
        });
    };

    return (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] max-w-4xl mx-auto">
            <div className="space-y-4">
                <Label>Paste Text to Estimate</Label>
                <Textarea
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        // Auto calc on change? maybe too jumpy. Let's stick to button or just effect.
                        // Let's rely on button for explicit action + setting WPM.
                    }}
                    placeholder="Paste article or essay here..."
                    className="min-h-[300px]"
                />
            </div>

            <div className="space-y-6">
                <div className="space-y-4 border p-4 rounded-lg bg-card">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Reading Speed (WPM)</Label>
                            <span className="text-sm text-muted-foreground">{wpm}</span>
                        </div>
                        <input
                            type="range" min="100" max="400" step="10"
                            value={wpm} onChange={(e) => setWpm(parseInt(e.target.value))}
                            className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Slow (100)</span>
                            <span>Avg (200)</span>
                            <span>Fast (400)</span>
                        </div>
                    </div>
                </div>

                <Button onClick={calculate} size="lg" className="w-full">Calculate Time</Button>

                {time && (
                    <div className="p-6 border rounded-xl bg-card shadow-sm text-center animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Estimated Time</h3>
                        <div className="text-4xl font-bold text-primary">
                            {time.minutes}m {time.seconds}s
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
