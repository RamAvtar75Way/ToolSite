"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { ImageUploader } from "./ImageUploader";
import { Download, Layers } from "lucide-react";

export function FaviconGenerator() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [favicons, setFavicons] = useState<{ size: number, url: string }[]>([]);

    const handleImageSelect = (file: File, url: string) => {
        setImageUrl(url);
        generateFavicons(url);
    };

    const generateFavicons = (url: string) => {
        const sizes = [16, 32, 180, 512]; // Standard, Apple Touch, PWA
        const newFavicons: { size: number, url: string }[] = [];

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            sizes.forEach(size => {
                const canvas = document.createElement("canvas");
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, size, size);
                    newFavicons.push({
                        size,
                        url: canvas.toDataURL("image/png")
                    });
                }
            });
            setFavicons(newFavicons);
        };
        img.src = url;
    };

    return (
        <div className="space-y-8">
            <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={imageUrl}
                onClear={() => { setImageUrl(null); setFavicons([]); }}
            />

            {favicons.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-center">Generated Favicons</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {favicons.map((favicon) => (
                            <div key={favicon.size} className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-card shadow-sm">
                                <div className="w-16 h-16 flex items-center justify-center bg-transparent border-2 border-dashed rounded">
                                    <img src={favicon.url} alt={`${favicon.size}x${favicon.size}`} className="max-w-full max-h-full" />
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold">{favicon.size}x{favicon.size}</div>
                                    <div className="text-xs text-muted-foreground">PNG</div>
                                </div>
                                <a href={favicon.url} download={`favicon-${favicon.size}.png`} className="w-full">
                                    <Button size="sm" className="w-full gap-2">
                                        <Download className="h-3 w-3" /> Download
                                    </Button>
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-muted rounded-lg text-sm">
                        <p className="font-semibold mb-2">How to use:</p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Download the 32x32 PNG and rename to <code>favicon.ico</code> (most browsers support PNG favicons now).</li>
                            <li>Use 180x180 for Apple Touch Icon.</li>
                            <li>Use 512x512 for PWA Manifest.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
