"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Plus, Trash2 } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export function PieChartGenerator() {
    const [data, setData] = useState([{ name: "Category A", value: 400 }]);

    const addEntry = () => {
        setData([...data, { name: `Category ${String.fromCharCode(65 + data.length)}`, value: 100 }]);
    };

    const removeEntry = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const updateEntry = (index: number, field: "name" | "value", value: string) => {
        const newData = [...data];
        if (field === "name") newData[index].name = value;
        else newData[index].value = Number(value) || 0;
        setData(newData);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Label>Chart Data</Label>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                        {data.map((entry, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Input
                                    value={entry.name}
                                    onChange={(e) => updateEntry(index, "name", e.target.value)}
                                    placeholder="Label"
                                />
                                <Input
                                    type="number"
                                    value={entry.value}
                                    onChange={(e) => updateEntry(index, "value", e.target.value)}
                                    placeholder="Value"
                                    className="w-24"
                                />
                                <Button size="icon" variant="ghost" onClick={() => removeEntry(index)} disabled={data.length <= 1}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button onClick={addEntry} className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> Add Slice
                    </Button>
                </div>

                <div className="h-[400px] w-full bg-card border rounded-xl p-4 flex flex-col">
                    <h3 className="text-center font-bold mb-4">Preview</h3>
                    <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${(percent ? percent * 100 : 0).toFixed(0)}%`}
                                    outerRadius={100} // Slightly reduced to fit labels potentially
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--foreground)' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
