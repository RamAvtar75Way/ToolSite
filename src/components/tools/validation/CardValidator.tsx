"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import validator from "validator";
import { CheckCircle, XCircle, CreditCard } from "lucide-react";

export function CardValidator() {
    const [cardNumber, setCardNumber] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const validate = () => {
        setIsValid(validator.isCreditCard(cardNumber));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Credit/Debit Card Number</Label>
                <div className="relative">
                    <Input
                        value={cardNumber}
                        onChange={(e) => {
                            // Allow spaces/dashes but strip them
                            const val = e.target.value;
                            setCardNumber(val);
                            setIsValid(null);
                        }}
                        placeholder="0000 0000 0000 0000"
                        className="pl-10 font-mono"
                    />
                    <CreditCard className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
            </div>
            <Button onClick={validate} className="w-full">Validate Card</Button>

            {isValid !== null && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${isValid ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                    {isValid ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <div>
                        <p className="font-bold">{isValid ? "Valid Card Number" : "Invalid Card Number"}</p>
                        <p className="text-sm opacity-80">{isValid ? "This card number passes the Luhn check." : "The card number is invalid."}</p>
                    </div>
                </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
                We perform a Luhn algorithm check locally. No data is sent to any server.
            </p>
        </div>
    );
}
