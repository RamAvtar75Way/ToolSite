"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const TEENS = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const SCALES = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion"];

const convertGroup = (n: number): string => {
    let str = "";
    const h = Math.floor(n / 100);
    const t = Math.floor((n % 100) / 10);
    const o = n % 10;

    if (h > 0) str += ONES[h] + " Hundred ";

    if (t > 1) {
        str += TENS[t] + " ";
        if (o > 0) str += ONES[o] + " ";
    } else if (t === 1) {
        str += TEENS[o] + " ";
    } else if (o > 0) {
        str += ONES[o] + " ";
    }

    return str.trim();
};

const numberToWords = (n: number): string => {
    if (n === 0) return "Zero";

    let str = "";
    let scaleIdx = 0;

    // Handle decimals? For basic version let's stick to integers or handle cents separately
    // Let's just do integers for simplicity
    const integerPart = Math.floor(Math.abs(n));
    let temp = integerPart;

    while (temp > 0) {
        const group = temp % 1000;
        if (group > 0) {
            const groupStr = convertGroup(group);
            str = groupStr + (SCALES[scaleIdx] ? " " + SCALES[scaleIdx] : "") + " " + str;
        }
        temp = Math.floor(temp / 1000);
        scaleIdx++;
    }

    return (n < 0 ? "Negative " : "") + str.trim();
};

export function NumberToWordsConverter() {
    const [num, setNum] = useState("");
    const [words, setWords] = useState("");

    const convert = () => {
        const n = parseFloat(num);
        if (isNaN(n)) {
            setWords("Invalid Number");
            return;
        }

        // Simple logic for decimal points if needed:
        // "Point" + decimal digits? 
        // For now let's just do the standard integer text.
        setWords(numberToWords(n));
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-4">
                <Label>Enter Number</Label>
                <div className="flex gap-4">
                    <Input
                        type="number"
                        value={num}
                        onChange={(e) => setNum(e.target.value)}
                        placeholder="e.g. 12345"
                    />
                    <Button onClick={convert}>Convert</Button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label>Result in Words</Label>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(words)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl min-h-[100px] flex items-center justify-center text-center text-lg font-medium">
                    {words || "Result will appear here"}
                </div>
            </div>
        </div>
    );
}
