"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Plus, Trash2 } from "lucide-react";

export function LineChartGenerator() {
    const [data, setData] = useState([
        { name: "Mon", value: 10 },
        { name: "Tue", value: 15 },
        { name: "Wed", value: 8 },
        { name: "Thu", value: 20 },
        { name: "Fri", value: 25 },
    ]);

    const addEntry = () => {
        setData([...data, { name: "Day", value: 0 }]);
    };

    const removeEntry = (index: number) => {
        setData(data.filter((_, i) => i !== index));
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
                    <Label>Chart DataPoints</Label>
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
                        <Plus className="w-4 h-4 mr-2" /> Add Point
                    </Button>
                </div>

                <div className="h-[400px] w-full bg-card border rounded-xl p-4">
                    <h3 className="text-center font-bold mb-4">Preview</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
