"use client";

import { useState } from "react";
import { Textarea, Label } from "@/components/ui";

export function JwtDecoder() {
    const [token, setToken] = useState("");
    const [header, setHeader] = useState("");
    const [payload, setPayload] = useState("");

    const handleTokenChange = (val: string) => {
        setToken(val);
        try {
            const parts = val.split('.');
            if (parts.length === 3) {
                const decodedHeader = atob(parts[0]);
                const decodedPayload = atob(parts[1]);
                setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 2));
                setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 2));
            } else {
                setHeader("");
                setPayload("");
            }
        } catch (e) {
            setHeader("Invalid Token");
            setPayload("");
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>JWT Token</Label>
                <Textarea
                    placeholder="Paste your JWT here..."
                    value={token}
                    onChange={(e) => handleTokenChange(e.target.value)}
                    className="font-mono min-h-[100px]"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>Header</Label>
                    <Textarea
                        value={header}
                        readOnly
                        className="font-mono min-h-[200px] bg-muted"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Payload</Label>
                    <Textarea
                        value={payload}
                        readOnly
                        className="font-mono min-h-[200px] bg-muted"
                    />
                </div>
            </div>
        </div>
    );
}
