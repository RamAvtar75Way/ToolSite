"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { ArrowRightLeft } from "lucide-react";

export function RomanNumeralConverter() {
    const [num, setNum] = useState("");
    const [roman, setRoman] = useState("");

    const toRoman = (n: number) => {
        const lookup: Record<string, number> = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let roman = '';
        let i;
        for (i in lookup) {
            while (n >= lookup[i]) {
                roman += i;
                n -= lookup[i];
            }
        }
        return roman;
    };

    const fromRoman = (str: string) => {
        const lookup: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let num = 0;
        let p = 0;
        for (let i = str.length - 1; i >= 0; i--) {
            const char = str[i].toUpperCase();
            const curr = lookup[char] || 0;
            if (curr >= p) {
                num += curr;
            } else {
                num -= curr;
            }
            p = curr;
        }
        return num;
    };

    const handleNumChange = (val: string) => {
        setNum(val);
        if (val) {
            setRoman(toRoman(parseInt(val)));
        } else {
            setRoman("");
        }
    };

    const handleRomanChange = (val: string) => {
        setRoman(val.toUpperCase());
        if (val) {
            setNum(fromRoman(val).toString());
        } else {
            setNum("");
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <Label className="text-lg">Decimal Number</Label>
                    <Input
                        type="number"
                        value={num}
                        onChange={(e) => handleNumChange(e.target.value)}
                        placeholder="e.g. 2024"
                        className="text-2xl h-16 text-center font-bold"
                    />
                </div>

                <div className="hidden md:flex justify-center text-muted-foreground">
                    <ArrowRightLeft className="h-8 w-8" />
                </div>

                <div className="space-y-4">
                    <Label className="text-lg">Roman Numeral</Label>
                    <Input
                        value={roman}
                        onChange={(e) => handleRomanChange(e.target.value)}
                        placeholder="e.g. MMXXIV"
                        className="text-2xl h-16 text-center font-bold"
                    />
                </div>
            </div>

            <p className="text-center text-muted-foreground text-sm">
                Type in either box to convert instantly.
            </p>
        </div>
    );
}
