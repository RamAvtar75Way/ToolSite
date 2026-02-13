"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { X, Plus } from "lucide-react";

const availableTimezones = [
    "UTC",
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Australia/Sydney",
    "Pacific/Auckland"
];

export function WorldClock() {
    const [clocks, setClocks] = useState<string[]>(["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"]);
    const [time, setTime] = useState(new Date());
    const [selectedZone, setSelectedZone] = useState(availableTimezones[0]);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const addClock = () => {
        if (!clocks.includes(selectedZone)) {
            setClocks([...clocks, selectedZone]);
        }
    };

    const removeClock = (zone: string) => {
        setClocks(clocks.filter(c => c !== zone));
    };

    const formatTime = (date: Date, zone: string) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: zone,
            hour12: true
        }).format(date);
    };

    const formatDate = (date: Date, zone: string) => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone: zone
        }).format(date);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex gap-4 max-w-sm mx-auto">
                <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {availableTimezones.map(zone => (
                        <option key={zone} value={zone}>{zone.replace("_", " ")}</option>
                    ))}
                </select>
                <Button onClick={addClock}>
                    <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {clocks.map(zone => (
                    <div key={zone} className="bg-card border rounded-xl p-6 relative group shadow-sm hover:shadow-md transition-shadow">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                            onClick={() => removeClock(zone)}
                        >
                            <X className="w-3 h-3" />
                        </Button>
                        <div className="text-muted-foreground text-sm font-medium mb-1 truncate" title={zone}>
                            {zone.split("/").pop()?.replace("_", " ")}
                        </div>
                        <div className="text-3xl font-bold font-mono tracking-tight mb-1">
                            {formatTime(time, zone)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {formatDate(time, zone)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
