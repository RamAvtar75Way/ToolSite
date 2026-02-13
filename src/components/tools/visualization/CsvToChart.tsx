"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Papa from "papaparse";

export function CsvToChart() {
    const [input, setInput] = useState("");
    const [chartData, setChartData] = useState<any[]>([]);
    const [dataKeys, setDataKeys] = useState<string[]>([]);
    const [xAxisKey, setXAxisKey] = useState<string>("");

    const generate = () => {
        if (!input.trim()) return;

        const result = Papa.parse(input, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true, // auto convert numbers
        });

        if (result.data && result.data.length > 0) {
            setChartData(result.data);
            const keys = Object.keys(result.data[0] as object);
            if (keys.length > 0) {
                // Heuristic: First key usually Name/Label, others Values
                setXAxisKey(keys[0]);
                setDataKeys(keys.slice(1));
            }
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
                <Label>Paste CSV Data (First row header)</Label>
                <Textarea
                    placeholder={"Month,Revenue,Expenses\nJan,4000,2400\nFeb,3000,1398\nMar,2000,9800"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="h-32 font-mono"
                />
                <Button onClick={generate} className="w-full">Generate Chart</Button>
            </div>

            {chartData.length > 0 && (
                <div className="h-[500px] w-full bg-card border rounded-xl p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey={xAxisKey} />
                            <YAxis />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                            />
                            <Legend />
                            {dataKeys.map((key, index) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    fill={`hsl(${index * 60 + 200}, 70%, 50%)`}
                                    radius={[4, 4, 0, 0]}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
                Supports numeric values for bars. First column is used as X-Axis.
            </p>
        </div>
    );
}
