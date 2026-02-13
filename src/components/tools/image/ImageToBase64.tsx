"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { ImageUploader } from "./ImageUploader";
import { Copy } from "lucide-react";

export function ImageToBase64() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [base64, setBase64] = useState<string>("");

    const handleImageSelect = (file: File, url: string) => {
        setImageUrl(url);
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-8">
            <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={imageUrl}
                onClear={() => { setImageUrl(null); setBase64(""); }}
            />

            {base64 && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Base64 Output</label>
                        <Button size="sm" onClick={() => navigator.clipboard.writeText(base64)}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Base64
                        </Button>
                    </div>
                    <Textarea
                        value={base64}
                        readOnly
                        className="font-mono min-h-[300px] bg-muted text-xs break-all"
                    />
                </div>
            )}
        </div>
    );
}
