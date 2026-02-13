"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

export function Stopwatch() {
    const [time, setTime] = useState(0); // in milliseconds
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const timerRef = useRef<number | null>(null); // Use number for requestAnimationFrame timestamp

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prev => prev + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const toggleStart = () => {
        setIsRunning(!isRunning);
    };

    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const lap = () => {
        setLaps(prev => [time, ...prev]);
    };

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-md mx-auto space-y-8 text-center">
            <div className="text-6xl font-mono font-bold tracking-wider tabular-nums">
                {formatTime(time)}
            </div>

            <div className="flex justify-center gap-4">
                <Button
                    onClick={toggleStart}
                    size="lg"
                    variant={isRunning ? "secondary" : "default"}
                    className="w-32"
                >
                    {isRunning ? <><Pause className="mr-2 h-4 w-4" /> Pause</> : <><Play className="mr-2 h-4 w-4" /> Start</>}
                </Button>

                <Button onClick={lap} size="lg" variant="outline" disabled={!isRunning && time === 0}>
                    <Flag className="mr-2 h-4 w-4" /> Lap
                </Button>

                <Button onClick={reset} size="lg" variant="destructive" disabled={time === 0}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
            </div>

            {laps.length > 0 && (
                <div className="bg-muted rounded-lg p-4 max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-muted-foreground border-b border-border">
                                <th className="pb-2 text-left">Lap</th>
                                <th className="pb-2 text-right">Time</th>
                                <th className="pb-2 text-right">Split</th>
                            </tr>
                        </thead>
                        <tbody>
                            {laps.map((lapTime, i) => {
                                const split = i === laps.length - 1 ? lapTime : lapTime - laps[i + 1];
                                return (
                                    <tr key={i} className="border-b border-border/50 last:border-0">
                                        <td className="py-2 text-left text-muted-foreground">#{laps.length - i}</td>
                                        <td className="py-2 text-right font-mono">{formatTime(lapTime)}</td>
                                        <td className="py-2 text-right font-mono text-muted-foreground">+{formatTime(split)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
