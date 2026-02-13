"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import validator from "validator";
import { CheckCircle, XCircle } from "lucide-react";

export function EmailValidator() {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const validate = () => {
        setIsValid(validator.isEmail(email));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex gap-2">
                    <Input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsValid(null);
                        }}
                        placeholder="example@domain.com"
                    />
                    <Button onClick={validate}>Validate</Button>
                </div>
            </div>

            {isValid !== null && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${isValid ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                    {isValid ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <div>
                        <p className="font-bold">{isValid ? "Valid Email" : "Invalid Email"}</p>
                        <p className="text-sm opacity-80">{isValid ? "The syntax of this email address is correct." : "This does not look like a valid email address."}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
