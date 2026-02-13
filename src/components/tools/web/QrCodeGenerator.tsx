"use client";

import { useState, useEffect } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Download } from "lucide-react";
import QRCode from "qrcode";

export function QrCodeGenerator() {
    const [text, setText] = useState("https://example.com");
    const [qrDataUrl, setQrDataUrl] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        generateQr();
    }, [text]);

    const generateQr = async () => {
        try {
            if (!text) {
                setQrDataUrl("");
                return;
            }
            const url = await QRCode.toDataURL(text, { width: 300, margin: 2 });
            setQrDataUrl(url);
            setError("");
        } catch (err) {
            setError("Failed to generate QR Code");
            console.error(err);
        }
    };

    const download = () => {
        if (!qrDataUrl) return;
        const link = document.createElement("a");
        link.href = qrDataUrl;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Enter Text or URL</Label>
                    <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="https://..."
                        className="min-h-[150px]"
                    />
                </div>
                <Button onClick={generateQr} className="w-full lg:hidden">Generate</Button>
            </div>

            <div className="space-y-6 flex flex-col items-center justify-center">
                {error && <p className="text-destructive">{error}</p>}

                {qrDataUrl ? (
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                        <img src={qrDataUrl} alt="QR Code" className="w-[300px] h-[300px]" />
                    </div>
                ) : (
                    <div className="w-[300px] h-[300px] bg-muted flex items-center justify-center text-muted-foreground rounded-lg">
                        Preview
                    </div>
                )}

                <Button onClick={download} disabled={!qrDataUrl} className="w-full max-w-[300px]">
                    <Download className="mr-2 h-4 w-4" /> Download PNG
                </Button>
            </div>
        </div>
    );
}
