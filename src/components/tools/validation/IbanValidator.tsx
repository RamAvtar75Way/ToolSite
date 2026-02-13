"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import validator from "validator";
import { CheckCircle, XCircle } from "lucide-react";

export function IbanValidator() {
    const [iban, setIban] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const validate = () => {
        setIsValid(validator.isIBAN(iban));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>IBAN Number</Label>
                <Input
                    value={iban}
                    onChange={(e) => {
                        setIban(e.target.value.toUpperCase());
                        setIsValid(null);
                    }}
                    placeholder="AL98 2029..."
                    className="font-mono uppercase"
                />
            </div>
            <Button onClick={validate} className="w-full">Validate IBAN</Button>

            {isValid !== null && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${isValid ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                    {isValid ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <div>
                        <p className="font-bold">{isValid ? "Valid IBAN" : "Invalid IBAN"}</p>
                        <p className="text-sm opacity-80">{isValid ? "The format fits a standard IBAN." : "The IBAN format is incorrect."}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
