"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const STREETS = ["Maple", "Oak", "Cedar", "Pine", "Elm", "Washington", "Main", "High", "Park", "Lake"];
const TYPES = ["St", "Ave", "Blvd", "Rd", "Ln", "Dr", "Ct"];
const CITIES = ["Springfield", "Rivertown", "Lakeside", "Fairview", "Madison", "Georgetown", "Franklin", "Clinton", "Arlington"];
const STATES = ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI"];

export function FakeAddressGenerator() {
    const [count, setCount] = useState(5);
    const [addresses, setAddresses] = useState<string[]>([]);

    const generate = () => {
        const newAddresses = [];
        for (let i = 0; i < count; i++) {
            const num = Math.floor(Math.random() * 9999) + 1;
            const street = STREETS[Math.floor(Math.random() * STREETS.length)];
            const type = TYPES[Math.floor(Math.random() * TYPES.length)];
            const city = CITIES[Math.floor(Math.random() * CITIES.length)];
            const state = STATES[Math.floor(Math.random() * STATES.length)];
            const zip = Math.floor(Math.random() * 89999) + 10000;
            newAddresses.push(`${num} ${street} ${type}, ${city}, ${state} ${zip}`);
        }
        setAddresses(newAddresses);
    };

    const copyToClipboard = () => {
        if (addresses.length === 0) return;
        navigator.clipboard.writeText(addresses.join("\n"));
        toast.success("Addresses copied to clipboard");
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                    <Label>Number of Addresses</Label>
                    <Input
                        type="number"
                        min={1}
                        max={50}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                    />
                </div>
                <Button onClick={generate}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Generate
                </Button>
            </div>

            {addresses.length > 0 && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Results</Label>
                        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                            <Copy className="w-4 h-4 mr-2" /> Copy All
                        </Button>
                    </div>
                    <Textarea
                        value={addresses.join("\n")}
                        readOnly
                        className="min-h-[200px] font-mono"
                    />
                </div>
            )}
        </div>
    );
}
