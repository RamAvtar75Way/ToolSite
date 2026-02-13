"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { Copy } from "lucide-react";

export function TimestampConverter() {
    const [timestamp, setTimestamp] = useState<string>("");
    const [dateString, setDateString] = useState<string>("");
    const [currentUnix, setCurrentUnix] = useState<number>(Math.floor(Date.now() / 1000));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentUnix(Math.floor(Date.now() / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleTimestampChange = (val: string) => {
        setTimestamp(val);
        const ts = parseInt(val);
        if (!isNaN(ts)) {
            // Detect seconds vs milliseconds
            // If > 10000000000 (10 digits is seconds ~1973, 13 digits is ms)
            const date = val.length > 10 ? new Date(ts) : new Date(ts * 1000);
            setDateString(date.toUTCString() + " | " + date.toLocaleString());
        } else {
            setDateString("Invalid Timestamp");
        }
    };

    const handleDateChange = (val: string) => {
        setDateString(val);
        // Try to parse date string
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
            setTimestamp(Math.floor(date.getTime() / 1000).toString());
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Current Unix Timestamp</div>
                <div className="text-3xl font-mono font-bold text-primary">{currentUnix}</div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4 p-6 border rounded-lg">
                    <h3 className="font-semibold">Unix Timestamp to Date</h3>
                    <div className="space-y-2">
                        <Input
                            placeholder="Enter timestamp (e.g. 1678900000)"
                            value={timestamp}
                            onChange={(e) => handleTimestampChange(e.target.value)}
                        />
                        <div className="p-3 bg-muted rounded min-h-[40px] text-sm break-all">
                            {dateString || "Result date..."}
                        </div>
                    </div>
                </div>

                <div className="space-y-4 p-6 border rounded-lg">
                    <h3 className="font-semibold">Date String to Timestamp</h3>
                    <div className="space-y-2">
                        <Input
                            type="datetime-local"
                            step="1"
                            onChange={(e) => handleDateChange(e.target.value)}
                        />
                        <div className="p-3 bg-muted rounded min-h-[40px] text-sm font-mono">
                            {dateString && !isNaN(new Date(dateString).getTime()) ? Math.floor(new Date(dateString).getTime() / 1000) : "Result timestamp..."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
