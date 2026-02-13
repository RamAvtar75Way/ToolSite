"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Plus, Trash2 } from "lucide-react";

export function SurveyVisualizer() {
    const [title, setTitle] = useState("Customer Satisfaction");
    const [data, setData] = useState([
        { name: "Very Satisfied", value: 45 },
        { name: "Satisfied", value: 30 },
        { name: "Neutral", value: 15 },
        { name: "Dissatisfied", value: 5 },
        { name: "Very Dissatisfied", value: 5 },
    ]);

    const updateEntry = (index: number, field: "name" | "value", value: string) => {
        const newData = [...data];
        if (field === "name") newData[index].name = value;
        else newData[index].value = Number(value) || 0;
        setData(newData);
    };

    const addEntry = () => {
        setData([...data, { name: "Option", value: 0 }]);
    };

    const removeEntry = (index: number) => {
        setData(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Label>Survey Question / Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />

                    <Label>Responses</Label>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                        {data.map((entry, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Input
                                    value={entry.name}
                                    onChange={(e) => updateEntry(index, "name", e.target.value)}
                                    placeholder="Option Label"
                                />
                                <Input
                                    type="number"
                                    value={entry.value}
                                    onChange={(e) => updateEntry(index, "value", e.target.value)}
                                    placeholder="Count"
                                    className="w-24"
                                />
                                <Button size="icon" variant="ghost" onClick={() => removeEntry(index)} disabled={data.length <= 1}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button onClick={addEntry} className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> Add Option
                    </Button>
                </div>

                <div className="h-[400px] w-full bg-card border rounded-xl p-4 flex flex-col">
                    <h3 className="text-center font-bold mb-4 text-xl">{title}</h3>
                    <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`hsl(${140 - (index * 30)}, 70%, 45%)`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
