"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Download } from "lucide-react";

export function RsaGenerator() {
    const [keys, setKeys] = useState<{ publicKey: string; privateKey: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [keySize, setKeySize] = useState(2048);

    const generate = async () => {
        setLoading(true);
        setKeys(null);
        try {
            const keyPair = await window.crypto.subtle.generateKey(
                {
                    name: "RSASSA-PKCS1-v1_5",
                    modulusLength: keySize,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: "SHA-256",
                },
                true,
                ["sign", "verify"]
            );

            const publicKeyBuffer = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
            const privateKeyBuffer = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

            setKeys({
                publicKey: toPem(publicKeyBuffer, "PUBLIC KEY"),
                privateKey: toPem(privateKeyBuffer, "PRIVATE KEY"),
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const toPem = (buffer: ArrayBuffer, type: string) => {
        const exportString = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        let formatted = `-----BEGIN ${type}-----\n`;
        for (let i = 0; i < exportString.length; i += 64) {
            formatted += exportString.substring(i, i + 64) + "\n";
        }
        formatted += `-----END ${type}-----`;
        return formatted;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                    <Label>Key Size</Label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={keySize}
                        onChange={(e) => setKeySize(parseInt(e.target.value))}
                    >
                        <option value={2048}>2048 bits</option>
                        <option value={4096}>4096 bits</option>
                    </select>
                </div>
                <Button onClick={generate} disabled={loading} size="lg" className="flex-1">
                    {loading ? "Generating Keys..." : "Generate Key Pair"}
                </Button>
            </div>

            {keys && (
                <div className="grid gap-8 lg:grid-cols-2 animate-in fade-in slide-in-from-bottom-4">
                    <div className="space-y-2">
                        <Label>Public Key</Label>
                        <Textarea value={keys.publicKey} readOnly className="font-mono text-xs h-[400px]" />
                        <Button variant="outline" onClick={() => navigator.clipboard.writeText(keys.publicKey)} className="w-full">
                            Copy Public Key
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Label>Private Key</Label>
                        <Textarea value={keys.privateKey} readOnly className="font-mono text-xs h-[400px]" />
                        <Button variant="outline" onClick={() => navigator.clipboard.writeText(keys.privateKey)} className="w-full">
                            Copy Private Key
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
