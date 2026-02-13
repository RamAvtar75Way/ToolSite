"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy } from "lucide-react";

export function HashGenerator() {
    const [text, setText] = useState("");
    const [hashes, setHashes] = useState({ sha1: "", sha256: "", md5: "N/A in browser crypto" });

    const generateHash = async (val: string) => {
        setText(val);
        if (!val) {
            setHashes({ sha1: "", sha256: "", md5: "" });
            return;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(val);

        const hashBufferSHA1 = await crypto.subtle.digest("SHA-1", data);
        const hashArraySHA1 = Array.from(new Uint8Array(hashBufferSHA1));
        const hashHexSHA1 = hashArraySHA1.map(b => b.toString(16).padStart(2, '0')).join('');

        const hashBufferSHA256 = await crypto.subtle.digest("SHA-256", data);
        const hashArraySHA256 = Array.from(new Uint8Array(hashBufferSHA256));
        const hashHexSHA256 = hashArraySHA256.map(b => b.toString(16).padStart(2, '0')).join('');

        setHashes({
            sha1: hashHexSHA1,
            sha256: hashHexSHA256,
            md5: "MD5 requires external lib", // MD5 not supported in Web Crypto API natively
        });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Label>Text to Hash</Label>
                <Textarea
                    placeholder="Enter text..."
                    value={text}
                    onChange={(e) => generateHash(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>SHA-1</Label>
                    <div className="flex gap-2">
                        <Input value={hashes.sha1} readOnly className="font-mono bg-muted" />
                        <Button size="icon" onClick={() => navigator.clipboard.writeText(hashes.sha1)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>SHA-256</Label>
                    <div className="flex gap-2">
                        <Input value={hashes.sha256} readOnly className="font-mono bg-muted" />
                        <Button size="icon" onClick={() => navigator.clipboard.writeText(hashes.sha256)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>MD5</Label>
                    <div className="flex gap-2">
                        <Input value={hashes.md5} readOnly className="font-mono bg-muted text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Note: MD5 is not natively supported in browser APIs securely.</p>
                </div>
            </div>
        </div>
    );
}
