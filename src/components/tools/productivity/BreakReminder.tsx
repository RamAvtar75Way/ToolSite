"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Bell, BellOff, Timer } from "lucide-react";

export function BreakReminder() {
    const [duration, setDuration] = useState(20); // minutes
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20 * 60);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Request notification permission
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            notify();
            setIsActive(false);
            setTimeLeft(duration * 60);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, duration]);

    const notify = () => {
        // Browser notification
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Time for a break!", {
                body: "You've been focusing for " + duration + " minutes. Stretch and look away!",
                icon: "/favicon.ico" // standard path
            });
        }

        // Audio sound
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        audio.play().catch(e => console.log("Audio play failed"));
    };

    const toggleTimer = () => {
        if (isActive) {
            setIsActive(false);
        } else {
            setTimeLeft(duration * 60);
            setIsActive(true);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-md mx-auto text-center space-y-12">
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                {/* Circular indicator */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-secondary"
                    />
                    <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * timeLeft) / (duration * 60)}
                        className={`text-primary transition-all duration-1000 ease-linear ${isActive ? "opacity-100" : "opacity-0"}`}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="text-5xl font-bold font-mono">
                        {isActive ? formatTime(timeLeft) : duration + ":00"}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                        {isActive ? "Until break" : "Set duration"}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {!isActive && (
                    <div className="flex justify-center gap-4 items-center">
                        <Label>Every</Label>
                        <Input
                            type="number" min="1" max="120"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-20 text-center"
                        />
                        <Label>minutes</Label>
                    </div>
                )}

                <Button
                    size="lg"
                    onClick={toggleTimer}
                    className="w-48 rounded-full"
                    variant={isActive ? "secondary" : "default"}
                >
                    {isActive ? (
                        <><BellOff className="w-4 h-4 mr-2" /> Stop Reminder</>
                    ) : (
                        <><Bell className="w-4 h-4 mr-2" /> Start Reminder</>
                    )}
                </Button>
            </div>

            <p className="text-xs text-muted-foreground">
                Note: Please allow notifications for this tool to work in the background.
            </p>
        </div>
    );
}
