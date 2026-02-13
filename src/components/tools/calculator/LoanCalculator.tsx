"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function LoanCalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTerm, setLoanTerm] = useState("");
    const [results, setResults] = useState<{ emi: string; totalInterest: string; totalPayment: string } | null>(null);

    const calculate = () => {
        const P = parseFloat(loanAmount);
        const R = parseFloat(interestRate) / 12 / 100; // Monthly interest
        const N = parseFloat(loanTerm) * 12; // Months

        if (P && R && N) {
            const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
            const totalPayment = emi * N;
            const totalInterest = totalPayment - P;

            setResults({
                emi: emi.toFixed(2),
                totalInterest: totalInterest.toFixed(2),
                totalPayment: totalPayment.toFixed(2),
            });
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Loan Amount ($)</Label>
                    <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="10000" />
                </div>
                <div className="space-y-2">
                    <Label>Interest Rate (% per annum)</Label>
                    <Input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="5.5" />
                </div>
                <div className="space-y-2">
                    <Label>Loan Term (Years)</Label>
                    <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="5" />
                </div>
                <Button onClick={calculate} size="lg" className="w-full">Calculate EMI</Button>
            </div>

            {results && (
                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Monthly EMI</h3>
                        <div className="text-5xl font-bold text-primary mb-2">${results.emi}</div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="text-sm text-muted-foreground">Total Interest</div>
                            <div className="text-xl font-bold">${results.totalInterest}</div>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="text-sm text-muted-foreground">Total Payment</div>
                            <div className="text-xl font-bold">${results.totalPayment}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
