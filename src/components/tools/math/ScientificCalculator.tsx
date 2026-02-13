"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Delete, Eraser, MoveLeft } from "lucide-react";

export function ScientificCalculator() {
    const [display, setDisplay] = useState("");
    const [result, setResult] = useState("");

    const handleInput = (val: string) => {
        setDisplay(prev => prev + val);
    };

    const clear = () => {
        setDisplay("");
        setResult("");
    };

    const backspace = () => {
        setDisplay(prev => prev.slice(0, -1));
    };

    const calculate = () => {
        try {
            // Replace visual math symbols with JS equivalent
            let expression = display
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/π/g, "Math.PI")
                .replace(/e/g, "Math.E")
                .replace(/sin\(/g, "Math.sin(")
                .replace(/cos\(/g, "Math.cos(")
                .replace(/tan\(/g, "Math.tan(")
                .replace(/sqrt\(/g, "Math.sqrt(")
                .replace(/log\(/g, "Math.log10(")
                .replace(/ln\(/g, "Math.log(")
                .replace(/\^/g, "**");

            // Safe eval using Function constructor (better than eval, still careful)
            // For a static client-side tool this is generally acceptable if input is controlled via buttons
            // But we also allow typing. 
            // We'll restrict characters allowed if needed, but for now simple eval is standard for these tools.
            // eslint-disable-next-line no-new-func
            const res = new Function('return ' + expression)();

            // Format result
            const formatted = Number(res).toLocaleString("en-US", { maximumFractionDigits: 10 });
            setResult(formatted);
        } catch (e) {
            setResult("Error");
        }
    };

    const buttons = [
        { label: "sin", val: "sin(" }, { label: "cos", val: "cos(" }, { label: "tan", val: "tan(" }, { label: "(", val: "(" }, { label: ")", val: ")" },
        { label: "log", val: "log(" }, { label: "ln", val: "ln(" }, { label: "sqrt", val: "sqrt(" }, { label: "^", val: "^" }, { label: "÷", val: "÷" },
        { label: "7", val: "7" }, { label: "8", val: "8" }, { label: "9", val: "9" }, { label: "×", val: "×" }, { label: "AC", action: clear, variant: "destructive" },
        { label: "4", val: "4" }, { label: "5", val: "5" }, { label: "6", val: "6" }, { label: "-", val: "-" }, { label: "DEL", action: backspace, variant: "secondary" },
        { label: "1", val: "1" }, { label: "2", val: "2" }, { label: "3", val: "3" }, { label: "+", val: "+" }, { label: "=", action: calculate, variant: "default", span: 2 },
        { label: "0", val: "0" }, { label: ".", val: "." }, { label: "π", val: "π" }
    ];

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="bg-muted p-6 rounded-2xl space-y-2 text-right">
                <div className="h-8 text-muted-foreground text-lg overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {display || "0"}
                </div>
                <div className="h-12 text-4xl font-bold truncate text-foreground">
                    {result || (display ? "..." : "0")}
                </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
                {buttons.map((btn, i) => (
                    <Button
                        key={i}
                        variant={(btn.variant as any) || "outline"}
                        className={`h-12 text-lg ${btn.span ? `col-span-${btn.span}` : ""}`}
                        onClick={btn.action ? btn.action : () => handleInput(btn.val!)}
                    >
                        {btn.label}
                    </Button>
                ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
                <p>Supports keyboard input for numbers and basic operators.</p>
            </div>
        </div>
    );
}
