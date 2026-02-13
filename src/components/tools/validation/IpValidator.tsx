"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import validator from "validator";
import { CheckCircle, XCircle } from "lucide-react";

export function IpValidator() {
    const [ip, setIp] = useState("");
    const [result, setResult] = useState<{ version: number | null, isValid: boolean } | null>(null);

    const validate = () => {
        if (validator.isIP(ip, 4)) {
            setResult({ version: 4, isValid: true });
        } else if (validator.isIP(ip, 6)) {
            setResult({ version: 6, isValid: true });
        } else {
            setResult({ version: null, isValid: false });
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>IP Address</Label>
                <div className="flex gap-2">
                    <Input
                        value={ip}
                        onChange={(e) => {
                            setIp(e.target.value);
                            setResult(null);
                        }}
                        placeholder="192.168.1.1 or ::1"
                        className="font-mono"
                    />
                    <Button onClick={validate}>Validate</Button>
                </div>
            </div>

            {result !== null && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${result.isValid ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                    {result.isValid ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <div>
                        <p className="font-bold">{result.isValid ? `Valid IPv${result.version}` : "Invalid IP Address"}</p>
                        <p className="text-sm opacity-80">{result.isValid ? `This is a correct IPv${result.version} address.` : "This is not a valid IPv4 or IPv6 address."}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
