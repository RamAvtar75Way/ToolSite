"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";

export function StatisticsCalculator() {
    const [input, setInput] = useState("");
    const [stats, setStats] = useState<{ mean: number; median: number; mode: number[]; range: number; stdDev: number; min: number; max: number; count: number } | null>(null);

    const calculate = () => {
        // Split by comma, space, newline
        const nums = input.split(/[\s,]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));

        if (nums.length === 0) return;

        nums.sort((a, b) => a - b);
        const sum = nums.reduce((a, b) => a + b, 0);
        const mean = sum / nums.length;

        // Median
        const mid = Math.floor(nums.length / 2);
        const median = nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;

        // Mode
        const modeMap: Record<number, number> = {};
        let maxFreq = 0;
        nums.forEach(n => {
            modeMap[n] = (modeMap[n] || 0) + 1;
            if (modeMap[n] > maxFreq) maxFreq = modeMap[n];
        });
        const mode = Object.keys(modeMap).map(n => parseFloat(n)).filter(n => modeMap[n] === maxFreq);

        // Std Dev
        const squareDiffs = nums.map(n => Math.pow(n - mean, 2));
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / nums.length;
        const stdDev = Math.sqrt(avgSquareDiff);

        setStats({
            mean,
            median,
            mode: mode.length === nums.length ? [] : mode, // If all unique, no mode usually
            range: nums[nums.length - 1] - nums[0],
            stdDev,
            min: nums[0],
            max: nums[nums.length - 1],
            count: nums.length
        });
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Data Set (comma or space separated)</Label>
                <Textarea
                    placeholder="10, 20, 30, 40, 50..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px]"
                />
                <Button onClick={calculate} className="w-full">Calculate Statistics</Button>
            </div>

            <div className="space-y-4">
                <Label>Results</Label>
                <div className="grid grid-cols-2 gap-4">
                    <StatBox label="Count" value={stats?.count} />
                    <StatBox label="Sum" value={stats ? (stats.mean * stats.count).toFixed(2) : ""} />
                    <StatBox label="Mean (Average)" value={stats?.mean.toFixed(4)} />
                    <StatBox label="Median" value={stats?.median} />
                    <StatBox label="Mode" value={stats?.mode.join(", ") || "None"} />
                    <StatBox label="Range" value={stats?.range} />
                    <StatBox label="Standard Deviation" value={stats?.stdDev.toFixed(4)} />
                    <StatBox label="Min / Max" value={stats ? `${stats.min} / ${stats.max}` : ""} />
                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value }: { label: string; value: any }) {
    return (
        <div className="p-4 bg-muted/50 rounded-xl border space-y-1">
            <div className="text-xs text-muted-foreground uppercase font-semibold">{label}</div>
            <div className="text-xl font-bold truncate">{value !== undefined && value !== null ? value : "-"}</div>
        </div>
    );
}
