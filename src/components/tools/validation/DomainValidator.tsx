"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import validator from "validator";
import { CheckCircle, XCircle } from "lucide-react";

export function DomainValidator() {
    const [domain, setDomain] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const validate = () => {
        setIsValid(validator.isFQDN(domain));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Domain Name</Label>
                <div className="flex gap-2">
                    <Input
                        value={domain}
                        onChange={(e) => {
                            setDomain(e.target.value);
                            setIsValid(null);
                        }}
                        placeholder="example.com"
                    />
                    <Button onClick={validate}>Validate</Button>
                </div>
            </div>

            {isValid !== null && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${isValid ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                    {isValid ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <div>
                        <p className="font-bold">{isValid ? "Valid Domain" : "Invalid Domain"}</p>
                        <p className="text-sm opacity-80">{isValid ? "The domain syntax is correct." : "This is not a valid fully qualified domain name."}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
