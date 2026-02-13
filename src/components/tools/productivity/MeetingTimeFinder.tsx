"use client";

import { useState } from "react";
import { Button, Label } from "@/components/ui";

const availableTimezones = [
    "UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Asia/Tokyo", "Asia/Dubai", "Asia/Kolkata", "Australia/Sydney"
];

export function MeetingTimeFinder() {
    const [selectedZones, setSelectedZones] = useState<string[]>(["America/New_York", "Europe/London"]);

    // Work hours defined as 9am - 5pm
    const startWork = 9;
    const endWork = 17;

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const toggleZone = (zone: string) => {
        if (selectedZones.includes(zone)) {
            setSelectedZones(selectedZones.filter(z => z !== zone));
        } else {
            setSelectedZones([...selectedZones, zone]);
        }
    };

    const getHourInZone = (hourUTC: number, zone: string) => {
        // Simple heuristic offset calculation for demo purposes since we lack a TZ library
        // In real app, use luxon or date-fns-tz
        const date = new Date();
        date.setUTCHours(hourUTC);

        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            hour12: false,
            timeZone: zone
        });

        return parseInt(formatter.format(date));
    };

    const isWorkingHour = (localHour: number) => {
        return localHour >= startWork && localHour < endWork;
    };

    return (
        <div className="space-y-8 overflow-x-auto">
            <div className="space-y-4">
                <Label>Select Participants' Zones</Label>
                <div className="flex flex-wrap gap-2">
                    {availableTimezones.map(zone => (
                        <Button
                            key={zone}
                            variant={selectedZones.includes(zone) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleZone(zone)}
                        >
                            {zone.split("/").pop()?.replace("_", " ")}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="min-w-[600px] border rounded-lg">
                <div className="grid grid-cols-[150px_repeat(24,1fr)] bg-muted/50 border-b">
                    <div className="p-2 text-sm font-medium sticky left-0 bg-background border-r">Zone / UTC</div>
                    {hours.map(h => (
                        <div key={h} className="p-2 text-xs text-center border-r last:border-0 font-mono">
                            {h}
                        </div>
                    ))}
                </div>

                {selectedZones.map(zone => (
                    <div key={zone} className="grid grid-cols-[150px_repeat(24,1fr)] border-b last:border-0">
                        <div className="p-2 text-sm font-medium truncate sticky left-0 bg-background border-r flex items-center">
                            {zone.split("/").pop()?.replace("_", " ")}
                        </div>
                        {hours.map(utcHour => {
                            const localHour = getHourInZone(utcHour, zone);
                            const working = isWorkingHour(localHour);
                            return (
                                <div
                                    key={utcHour}
                                    className={`
                                        h-12 border-r last:border-0 flex items-center justify-center text-xs
                                        ${working ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "bg-secondary/30 text-muted-foreground"}
                                    `}
                                    title={`${localHour}:00`}
                                >
                                    {localHour}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 border rounded"></div>
                    <span>Working Hours (9am - 5pm)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-secondary/30 border rounded"></div>
                    <span>Off Hours</span>
                </div>
            </div>
        </div>
    );
}
