"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { ArrowLeftRight } from "lucide-react";

type UnitCategory = "Length" | "Weight" | "Temperature" | "Area";

const CONVERSIONS: Record<string, number> = {
    // Length (base: meter)
    "m": 1,
    "km": 0.001,
    "cm": 100,
    "mm": 1000,
    "mi": 0.000621371,
    "yd": 1.09361,
    "ft": 3.28084,
    "in": 39.3701,

    // Weight (base: kg)
    "kg": 1,
    "g": 1000,
    "mg": 1000000,
    "lb": 2.20462,
    "oz": 35.274,

    // Area (base: sq meter)
    "sq m": 1,
    "sq km": 0.000001,
    "sq ft": 10.7639,
    "acre": 0.000247105,
    "hectare": 0.0001,
};

// Temp is special
const convertTemp = (val: number, from: string, to: string) => {
    if (from === to) return val;
    let c = val;
    if (from === "F") c = (val - 32) * 5 / 9;
    if (from === "K") c = val - 273.15;

    if (to === "C") return c;
    if (to === "F") return c * 9 / 5 + 32;
    if (to === "K") return c + 273.15;
    return val;
};

export function UnitConverter() {
    const [category, setCategory] = useState<UnitCategory>("Length");
    const [fromUnit, setFromUnit] = useState("m");
    const [toUnit, setToUnit] = useState("ft");
    const [value, setValue] = useState("1");
    const [result, setResult] = useState("");

    const categories = {
        Length: ["m", "km", "cm", "mm", "mi", "yd", "ft", "in"],
        Weight: ["kg", "g", "mg", "lb", "oz"],
        Temperature: ["C", "F", "K"],
        Area: ["sq m", "sq km", "sq ft", "acre", "hectare"],
    };

    const calculate = () => {
        const val = parseFloat(value);
        if (isNaN(val)) return;

        if (category === "Temperature") {
            setResult(convertTemp(val, fromUnit, toUnit).toFixed(2));
        } else {
            const base = val / CONVERSIONS[fromUnit];
            const res = base * CONVERSIONS[toUnit];
            setResult(res.toFixed(4).replace(/\.?0+$/, ''));
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2">
                {Object.keys(categories).map(c => (
                    <Button
                        key={c}
                        variant={category === c ? "default" : "outline"}
                        onClick={() => {
                            setCategory(c as UnitCategory);
                            setFromUnit(categories[c as UnitCategory][0]);
                            setToUnit(categories[c as UnitCategory][1] || categories[c as UnitCategory][0]);
                            setResult("");
                        }}
                    >
                        {c}
                    </Button>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] items-end">
                <div className="space-y-2">
                    <Label>From</Label>
                    <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                    >
                        {categories[category].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>

                <div className="hidden md:flex pb-4">
                    <ArrowLeftRight className="text-muted-foreground" />
                </div>

                <div className="space-y-2">
                    <Label>To</Label>
                    <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm items-center">
                        {result || "..."}
                    </div>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                    >
                        {categories[category].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>

            <Button onClick={calculate} size="lg" className="w-full">Convert</Button>
        </div>
    );
}
