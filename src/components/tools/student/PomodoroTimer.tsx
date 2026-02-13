"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui";
import { Play, Pause, RotateCcw, Coffee, BookOpen } from "lucide-react";

export function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<"focus" | "short" | "long">("focus");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        // Play sound?
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setIsRunning(false);
        setModeTime(mode);
    };

    const setModeTime = (m: "focus" | "short" | "long") => {
        setMode(m);
        if (m === "focus") setTimeLeft(25 * 60);
        else if (m === "short") setTimeLeft(5 * 60);
        else if (m === "long") setTimeLeft(15 * 60);
        setIsRunning(false);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const getProgress = () => {
        const total = mode === "focus" ? 25 * 60 : mode === "short" ? 5 * 60 : 15 * 60;
        return ((total - timeLeft) / total) * 100;
    };

    return (
        <div className="max-w-md mx-auto text-center space-y-8">
            <div className="flex justify-center gap-4">
                <Button
                    variant={mode === "focus" ? "default" : "outline"}
                    onClick={() => setModeTime("focus")}
                    className="w-24"
                >
                    Focus
                </Button>
                <Button
                    variant={mode === "short" ? "default" : "outline"}
                    onClick={() => setModeTime("short")}
                    className="w-24"
                >
                    Short Break
                </Button>
                <Button
                    variant={mode === "long" ? "default" : "outline"}
                    onClick={() => setModeTime("long")}
                    className="w-24"
                >
                    Long Break
                </Button>
            </div>

            <div className="relative w-64 h-64 mx-auto flex items-center justify-center rounded-full border-8 border-muted">
                <div
                    className="absolute inset-0 rounded-full border-8 border-primary transition-all duration-1000"
                    style={{
                        clipPath: `inset(0 0 ${100 - getProgress()}% 0)` // Simple generic progress visual
                        // A true circular progress requires SVG, skipping for simplicity of "no extra deps" if possible, 
                        // but let's just use text for now to be safe and clean.
                        // Actually, let's remove this confusing visual and just allow the ring to be static or use a simple SVG.
                    }}
                />
                {/* Better SVG Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                    <circle
                        cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"
                        className="text-primary transition-all duration-500"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * getProgress()) / 100}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="z-10 flex flex-col items-center">
                    <div className="text-6xl font-bold font-mono tracking-tighter">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="text-muted-foreground font-medium mt-2 flex items-center gap-2">
                        {mode === "focus" ? <BookOpen className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
                        {mode === "focus" ? "Time to Focus" : "Take a Break"}
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Button size="lg" onClick={toggleTimer} className="w-32 gap-2 text-lg">
                    {isRunning ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
                </Button>
                <Button size="icon" variant="outline" className="h-12 w-12 rounded-full" onClick={resetTimer}>
                    <RotateCcw className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
