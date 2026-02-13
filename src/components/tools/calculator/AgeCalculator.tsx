"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function AgeCalculator() {
    const [dob, setDob] = useState("");
    const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
    const [nextBirthday, setNextBirthday] = useState<{ months: number; days: number } | null>(null);

    const calculate = () => {
        if (!dob) return;
        const birthDate = new Date(dob);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setAge({ years, months, days });

        // Next Birthday
        const nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (today > nextBday) {
            nextBday.setFullYear(today.getFullYear() + 1);
        }

        let nbMonths = nextBday.getMonth() - today.getMonth();
        let nbDays = nextBday.getDate() - today.getDate();

        if (nbDays < 0) {
            nbMonths--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            nbDays += lastMonth.getDate();
        }
        if (nbMonths < 0) {
            nbMonths += 12;
        }
        setNextBirthday({ months: nbMonths, days: nbDays });
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <Button onClick={calculate} size="lg" className="w-full">Calculate Age</Button>
            </div>

            {age && (
                <div className="space-y-6 text-center">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Current Age</h3>
                        <div className="flex justify-center gap-4 text-primary">
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold">{age.years}</span>
                                <span className="text-xs">Years</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold">{age.months}</span>
                                <span className="text-xs">Months</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold">{age.days}</span>
                                <span className="text-xs">Days</span>
                            </div>
                        </div>
                    </div>

                    {nextBirthday && (
                        <div className="p-4 border rounded-lg bg-muted/30">
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Next Birthday In</h3>
                            <div className="text-lg font-semibold">
                                {nextBirthday.months} months, {nextBirthday.days} days
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
