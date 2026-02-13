"use client";

import { useState } from "react";
import { Button, Input, Label, } from "@/components/ui";
import { Copy } from "lucide-react";

export function FractionCalculator() {
    const [num1, setNum1] = useState("");
    const [den1, setDen1] = useState("");
    const [num2, setNum2] = useState("");
    const [den2, setDen2] = useState("");
    const [op, setOp] = useState("+");
    const [result, setResult] = useState<{ num: number, den: number } | null>(null);

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const calculate = () => {
        const n1 = parseInt(num1) || 0;
        const d1 = parseInt(den1) || 1;
        const n2 = parseInt(num2) || 0;
        const d2 = parseInt(den2) || 1;

        if (d1 === 0 || d2 === 0) {
            alert("Denominator cannot be zero");
            return;
        }

        let resNum = 0;
        let resDen = 1;

        switch (op) {
            case "+":
                resNum = n1 * d2 + n2 * d1;
                resDen = d1 * d2;
                break;
            case "-":
                resNum = n1 * d2 - n2 * d1;
                resDen = d1 * d2;
                break;
            case "*":
                resNum = n1 * n2;
                resDen = d1 * d2;
                break;
            case "/":
                resNum = n1 * d2;
                resDen = d1 * n2;
                break;
        }

        // Simplify
        const common = gcd(Math.abs(resNum), Math.abs(resDen));
        setResult({
            num: resNum / common,
            den: resDen / common
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
                {/* Fraction 1 */}
                <div className="flex flex-col gap-2 w-24">
                    <Input
                        type="number"
                        placeholder="Num"
                        className="text-center"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                    />
                    <div className="h-0.5 bg-border w-full"></div>
                    <Input
                        type="number"
                        placeholder="Den"
                        className="text-center"
                        value={den1}
                        onChange={(e) => setDen1(e.target.value)}
                    />
                </div>

                {/* Operator */}
                <div className="w-20">
                    <select
                        value={op}
                        onChange={(e) => setOp(e.target.value)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-center appearance-none"
                    >
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">×</option>
                        <option value="/">÷</option>
                    </select>
                </div>

                {/* Fraction 2 */}
                <div className="flex flex-col gap-2 w-24">
                    <Input
                        type="number"
                        placeholder="Num"
                        className="text-center"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                    />
                    <div className="h-0.5 bg-border w-full"></div>
                    <Input
                        type="number"
                        placeholder="Den"
                        className="text-center"
                        value={den2}
                        onChange={(e) => setDen2(e.target.value)}
                    />
                </div>

                {/* Equals */}
                <div className="text-2xl font-bold text-muted-foreground">=</div>

                {/* Result */}
                <div className="flex flex-col gap-2 w-24 items-center justify-center min-h-[100px]">
                    {result ? (
                        <>
                            <div className="text-xl font-bold">{result.num}</div>
                            <div className="h-0.5 bg-foreground w-full"></div>
                            <div className="text-xl font-bold">{result.den}</div>
                        </>
                    ) : (
                        <span className="text-muted-foreground">?</span>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                <Button onClick={calculate} size="lg" className="w-full md:w-auto px-12">Calculate</Button>
            </div>

            {result && (
                <div className="text-center text-muted-foreground">
                    Decimal Value: <strong>{(result.num / result.den).toFixed(4)}</strong>
                </div>
            )}
        </div>
    );
}
