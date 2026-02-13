"use client";

import { useState } from "react";
import { Copy, Plus, Trash2, RefreshCw } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";

interface ColorStop {
    id: string;
    color: string;
    position: number;
}

export function GradientGenerator() {
    const [type, setType] = useState<"linear" | "radial">("linear");
    const [angle, setAngle] = useState(90);
    const [stops, setStops] = useState<ColorStop[]>([
        { id: "1", color: "#4f46e5", position: 0 },
        { id: "2", color: "#ec4899", position: 100 }
    ]);

    const addStop = () => {
        setStops([...stops, { id: Date.now().toString(), color: "#ffffff", position: 50 }]);
    };

    const removeStop = (id: string) => {
        if (stops.length > 2) {
            setStops(stops.filter(s => s.id !== id));
        }
    };

    const updateStop = (id: string, field: keyof ColorStop, value: any) => {
        setStops(stops.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const gradientString = sortedStops.map(s => `${s.color} ${s.position}%`).join(", ");

    const cssValue = type === "linear"
        ? `linear-gradient(${angle}deg, ${gradientString})`
        : `radial-gradient(circle, ${gradientString})`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`background: ${cssValue};`);
    };

    const randomize = () => {
        const rColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setStops(stops.map(s => ({ ...s, color: rColor() })));
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Preview */}
            <div
                className="w-full h-64 rounded-xl shadow-lg border border-border"
                style={{ background: cssValue }}
            />

            <div className="grid gap-8 md:grid-cols-2">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label>Type</Label>
                        <div className="flex gap-4">
                            <Button
                                variant={type === "linear" ? "default" : "outline"}
                                onClick={() => setType("linear")}
                                className="w-full"
                            >
                                Linear
                            </Button>
                            <Button
                                variant={type === "radial" ? "default" : "outline"}
                                onClick={() => setType("radial")}
                                className="w-full"
                            >
                                Radial
                            </Button>
                        </div>
                    </div>

                    {type === "linear" && (
                        <div className="space-y-2">
                            <Label>Angle ({angle}°)</Label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={angle}
                                onChange={(e) => setAngle(Number(e.target.value))}
                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <Label>Color Stops</Label>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={randomize}>
                                <RefreshCw className="w-4 h-4 mr-2" /> Random
                            </Button>
                            <Button size="sm" onClick={addStop}>
                                <Plus className="w-4 h-4 mr-2" /> Add Stop
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {stops.map((stop) => (
                            <div key={stop.id} className="flex gap-3 items-center bg-card p-3 rounded-md border">
                                <input
                                    type="color"
                                    value={stop.color}
                                    onChange={(e) => updateStop(stop.id, "color", e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
                                />
                                <div className="flex-1 space-y-1">
                                    <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={stop.position}
                                        onChange={(e) => updateStop(stop.id, "position", Number(e.target.value))}
                                        className="h-8"
                                    />
                                </div>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => removeStop(stop.id)}
                                    disabled={stops.length <= 2}
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CSS Output */}
                <div className="space-y-2">
                    <Label>CSS Code</Label>
                    <div className="relative">
                        <textarea
                            className="w-full h-full min-h-[200px] p-4 font-mono text-sm bg-muted rounded-md resize-none focus:outline-none ring-1 ring-border"
                            readOnly
                            value={`background: ${cssValue};`}
                        />
                        <Button
                            size="sm"
                            className="absolute top-4 right-4"
                            onClick={copyToClipboard}
                        >
                            <Copy className="w-4 h-4 mr-2" /> Copy
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
