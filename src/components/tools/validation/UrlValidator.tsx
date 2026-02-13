"use client";

import { useState } from "react";
import { Button, Input, Label, Switch } from "@/components/ui";
import validator from "validator";
import { CheckCircle, XCircle } from "lucide-react";

export function UrlValidator() {
    const [url, setUrl] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [requireProtocol, setRequireProtocol] = useState(true);

    const validate = () => {
        setIsValid(validator.isURL(url, {
            require_protocol: requireProtocol,
            require_valid_protocol: true,
            allow_underscores: true
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-2">
                <Switch id="protocol-mode" checked={requireProtocol} onCheckedChange={setRequireProtocol} />
                <Label htmlFor="protocol-mode">Require Protocol (http/https)</Label>
            </div>

            <div className="space-y-2">
                <Label>URL</Label>
                <div className="flex gap-2">
                    <Input
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            setIsValid(null);
                        }}
                        placeholder={requireProtocol ? "https://example.com" : "example.com"}
                    />
                    <Button onClick={validate}>Validate</Button>
                </div>
            </div>

            {isValid !== null && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${isValid ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                    {isValid ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <div>
                        <p className="font-bold">{isValid ? "Valid URL" : "Invalid URL"}</p>
                        <p className="text-sm opacity-80">{isValid ? "The URL format is correct." : "Please check the URL formatting."}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
