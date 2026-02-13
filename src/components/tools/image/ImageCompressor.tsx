"use client";

import { useState } from "react";
import { Button, Label, Input } from "@/components/ui"; // Ensure Slider is in UI or use Input range
import { ImageUploader } from "./ImageUploader";
import { Download } from "lucide-react";

export function ImageCompressor() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [quality, setQuality] = useState<number>(0.8);
    const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [compressedSize, setCompressedSize] = useState<number>(0);

    const handleImageSelect = (file: File, url: string) => {
        setImageUrl(url);
        setOriginalSize(file.size);
        setCompressedUrl(null);
    };

    const handleCompress = () => {
        if (!imageUrl) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                // Compress using JPEG format and quality parameter
                const dataUrl = canvas.toDataURL("image/jpeg", quality);
                setCompressedUrl(dataUrl);

                // Calculate approx size
                const head = "data:image/jpeg;base64,";
                const size = Math.round((dataUrl.length - head.length) * 3 / 4);
                setCompressedSize(size);
            }
        };
        img.src = imageUrl;
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="space-y-8">
            <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={imageUrl}
                onClear={() => { setImageUrl(null); setCompressedUrl(null); }}
            />

            {imageUrl && (
                <div className="max-w-xl mx-auto space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Compression Quality: {Math.round(quality * 100)}%</Label>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.05"
                            value={quality}
                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low Quality (Small Size)</span>
                            <span>High Quality (Large Size)</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button onClick={handleCompress} size="lg">Compress Image</Button>
                    </div>
                </div>
            )}

            {compressedUrl && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-muted rounded-lg">
                            <div className="text-sm text-muted-foreground">Original Size</div>
                            <div className="font-bold text-lg">{formatSize(originalSize)}</div>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 border rounded-lg">
                            <div className="text-sm text-muted-foreground">Compressed Size</div>
                            <div className="font-bold text-lg text-green-600">{formatSize(compressedSize)}</div>
                            <div className="text-xs text-green-600">
                                {Math.round((1 - compressedSize / originalSize) * 100)}% Saved
                            </div>
                        </div>
                    </div>

                    <div className="text-center font-semibold text-lg mt-4">Preview</div>
                    <div className="border rounded-lg overflow-hidden bg-muted/30 inline-block w-full">
                        <img src={compressedUrl} alt="Compressed" className="max-h-[500px] w-auto mx-auto object-contain" />
                    </div>
                    <div className="flex justify-center">
                        <a href={compressedUrl} download="compressed-image.jpg">
                            <Button size="lg" variant="default" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download Compressed Image
                            </Button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
