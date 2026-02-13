"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Input } from "@/components/ui";
import { Play, Pause, RotateCcw } from "lucide-react";

export function CountdownTimer() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Use a ref for the interval ID to properly clear it
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            // Optional: Play a sound here
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft]);

    const startTimer = () => {
        if (timeLeft === 0) {
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            if (totalSeconds > 0) {
                setTimeLeft(totalSeconds);
                setIsActive(true);
            }
        } else {
            setIsActive(true);
        }
    };

    const pauseTimer = () => {
        setIsActive(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const resetTimer = () => {
        setIsActive(false);
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(0);
    };

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-8 max-w-md mx-auto text-center">
            <div className="text-6xl font-mono font-bold tracking-wider">
                {formatTime(timeLeft > 0 || isActive ? timeLeft : hours * 3600 + minutes * 60 + seconds)}
            </div>

            {/* Inputs - only show when not running/paused with time left */}
            {!isActive && timeLeft === 0 && (
                <div className="flex justify-center gap-4">
                    <div className="space-y-1">
                        <Input
                            type="number" min="0"
                            value={hours} onChange={(e) => setHours(Number(e.target.value))}
                            className="w-20 text-center"
                        />
                        <div className="text-xs text-muted-foreground">Hrs</div>
                    </div>
                    <div className="space-y-1">
                        <Input
                            type="number" min="0" max="59"
                            value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}
                            className="w-20 text-center"
                        />
                        <div className="text-xs text-muted-foreground">Min</div>
                    </div>
                    <div className="space-y-1">
                        <Input
                            type="number" min="0" max="59"
                            value={seconds} onChange={(e) => setSeconds(Number(e.target.value))}
                            className="w-20 text-center"
                        />
                        <div className="text-xs text-muted-foreground">Sec</div>
                    </div>
                </div>
            )}

            <div className="flex justify-center gap-4">
                {!isActive ? (
                    <Button onClick={startTimer} size="lg" className="w-32">
                        <Play className="w-4 h-4 mr-2" /> Start
                    </Button>
                ) : (
                    <Button onClick={pauseTimer} size="lg" variant="secondary" className="w-32">
                        <Pause className="w-4 h-4 mr-2" /> Pause
                    </Button>
                )}
                <Button onClick={resetTimer} size="lg" variant="outline" className="w-32">
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
            </div>
        </div>
    );
}
