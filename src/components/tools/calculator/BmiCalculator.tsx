"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function BmiCalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState("");

    const calculate = () => {
        if (!height || !weight) return;

        let bmiValue = 0;
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (unit === "metric") {
            // cm to m
            const hMeter = h / 100;
            bmiValue = w / (hMeter * hMeter);
        } else {
            // height in inches, weight in lbs
            bmiValue = 703 * (w / (h * h));
        }

        setBmi(parseFloat(bmiValue.toFixed(1)));

        if (bmiValue < 18.5) setCategory("Underweight");
        else if (bmiValue < 25) setCategory("Normal weight");
        else if (bmiValue < 30) setCategory("Overweight");
        else setCategory("Obese");
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="flex gap-4 justify-center">
                    <Button variant={unit === "metric" ? "default" : "outline"} onClick={() => setUnit("metric")}>Metric (cm, kg)</Button>
                    <Button variant={unit === "imperial" ? "default" : "outline"} onClick={() => setUnit("imperial")}>Imperial (in, lbs)</Button>
                </div>

                <div className="space-y-2">
                    <Label>Height ({unit === "metric" ? "cm" : "inches"})</Label>
                    <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder={unit === "metric" ? "175" : "69"} />
                </div>
                <div className="space-y-2">
                    <Label>Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
                    <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} />
                </div>
                <Button onClick={calculate} size="lg" className="w-full">Calculate BMI</Button>
            </div>

            {bmi !== null && (
                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Your BMI</h3>
                        <div className="text-5xl font-bold text-primary mb-2">{bmi}</div>
                        <div className={`text-xl font-medium ${category === "Normal weight" ? "text-green-500" :
                                category === "Overweight" ? "text-orange-500" :
                                    category === "Obese" ? "text-red-500" : "text-blue-500"
                            }`}>
                            {category}
                        </div>
                    </div>

                    <div className="text-left text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg space-y-1">
                        <p><strong>BMI Categories:</strong></p>
                        <p>Underweight = &lt;18.5</p>
                        <p>Normal weight = 18.5 - 24.9</p>
                        <p>Overweight = 25 - 29.9</p>
                        <p>Obesity = 30 or greater</p>
                    </div>
                </div>
            )}
        </div>
    );
}
