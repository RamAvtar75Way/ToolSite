"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [results, setResults] = useState<{ finalPrice: string; savings: string } | null>(null);

    const calculate = () => {
        const price = parseFloat(originalPrice);
        const disc = parseFloat(discount);

        if (price && !isNaN(disc)) {
            const savings = (price * disc) / 100;
            const finalPrice = price - savings;

            setResults({
                finalPrice: finalPrice.toFixed(2),
                savings: savings.toFixed(2),
            });
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Original Price ($)</Label>
                    <Input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="100.00" />
                </div>
                <div className="space-y-2">
                    <Label>Discount (% off)</Label>
                    <Input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="20" />
                </div>
                <Button onClick={calculate} size="lg" className="w-full">Calculate</Button>
            </div>

            {results && (
                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 border rounded-xl bg-card shadow-sm border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Final Price</h3>
                        <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">${results.finalPrice}</div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">You Save</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">${results.savings}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
