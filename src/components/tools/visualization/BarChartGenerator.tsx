"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Plus, Trash2 } from "lucide-react";

export function BarChartGenerator() {
    const [data, setData] = useState([
        { name: "Jan", value: 400 },
        { name: "Feb", value: 300 },
        { name: "Mar", value: 600 },
    ]);

    const addEntry = () => {
        setData([...data, { name: "New", value: 100 }]);
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
                        <Plus className="w-4 h-4 mr-2" /> Add Bar
                    </Button>
                </div>

                <div className="h-[400px] w-full bg-card border rounded-xl p-4">
                    <h3 className="text-center font-bold mb-4">Preview</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Bar dataKey="value" fill="var(--primary)" name="Value" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
