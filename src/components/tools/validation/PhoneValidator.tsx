"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import validator from "validator";
import { CheckCircle, XCircle } from "lucide-react";

export function PhoneValidator() {
    const [phone, setPhone] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const validate = () => {
        setIsValid(validator.isMobilePhone(phone, 'any'));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="flex gap-2">
                    <Input
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setIsValid(null);
                        }}
                        placeholder="+1 555-0123"
                    />
                    <Button onClick={validate}>Validate</Button>
                </div>
                <p className="text-xs text-muted-foreground">Supports international formats (e.g. +1...)</p>
            </div>

            {isValid !== null && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${isValid ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                    {isValid ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <div>
                        <p className="font-bold">{isValid ? "Valid Phone Number" : "Invalid Phone Number"}</p>
                        <p className="text-sm opacity-80">{isValid ? "This appears to be a valid mobile phone number." : "This number format is not recognized."}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
