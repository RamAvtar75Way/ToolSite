"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { CheckCircle2, XCircle } from "lucide-react";

export function PrimeNumberChecker() {
    const [num, setNum] = useState("");
    const [result, setResult] = useState<{ isPrime: boolean; explanation: string } | null>(null);

    const checkPrime = () => {
        const n = parseInt(num);
        if (isNaN(n)) return;

        if (n <= 1) {
            setResult({ isPrime: false, explanation: "Numbers less than or equal to 1 are not prime." });
            return;
        }

        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                setResult({
                    isPrime: false,
                    explanation: `${n} is divisible by ${i}.`
                });
                return;
            }
        }

        setResult({ isPrime: true, explanation: `${n} is only divisible by 1 and itself.` });
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-4">
                <Label>Enter a Number</Label>
                <div className="flex gap-4">
                    <Input
                        type="number"
                        value={num}
                        onChange={(e) => setNum(e.target.value)}
                        placeholder="e.g. 17"
                    />
                    <Button onClick={checkPrime}>Check</Button>
                </div>
            </div>

            {result && (
                <div className={`p-6 rounded-xl border flex flex-col items-center text-center gap-3 ${result.isPrime ? "bg-green-50 dark:bg-green-900/20 border-green-200" : "bg-red-50 dark:bg-red-900/20 border-red-200"}`}>
                    {result.isPrime ? (
                        <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                    ) : (
                        <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                    )}

                    <h3 className="text-xl font-bold">
                        {result.isPrime ? "It is a Prime Number!" : "It is NOT a Prime Number"}
                    </h3>
                    <p className="text-muted-foreground">{result.explanation}</p>
                </div>
            )}
        </div>
    );
}
