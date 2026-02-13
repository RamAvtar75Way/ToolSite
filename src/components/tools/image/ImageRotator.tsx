"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { ImageUploader } from "./ImageUploader";
import { Download, RotateCw, RotateCcw } from "lucide-react";

export function ImageRotator() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [rotation, setRotation] = useState(0);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    const handleImageSelect = (file: File, url: string) => {
        setImageUrl(url);
        setRotation(0);
        setProcessedUrl(null);
    };

    const rotate = (angle: number) => {
        setRotation((prev) => (prev + angle) % 360);
    };

    const handleApply = () => {
        if (!imageUrl) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            // For 90/270 degrees, swap width/height if needed, but for simple rotation center...
            // Let's do true rotation.
            const rads = (rotation * Math.PI) / 180;
            const sin = Math.abs(Math.sin(rads));
            const cos = Math.abs(Math.cos(rads));
            const newWidth = img.width * cos + img.height * sin;
            const newHeight = img.width * sin + img.height * cos;

            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.translate(newWidth / 2, newHeight / 2);
                ctx.rotate(rads);
                ctx.drawImage(img, -img.width / 2, -img.height / 2);
                setProcessedUrl(canvas.toDataURL("image/png"));
            }
        };
        img.src = imageUrl;
    };

    return (
        <div className="space-y-8">
            <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={imageUrl}
                onClear={() => { setImageUrl(null); setProcessedUrl(null); setRotation(0); }}
            />

            {imageUrl && (
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                        <Button onClick={() => rotate(-90)} variant="outline">
                            <RotateCcw className="mr-2 h-4 w-4" /> -90°
                        </Button>
                        <div className="flex items-center font-mono text-lg font-bold w-16 justify-center">
                            {rotation}°
                        </div>
                        <Button onClick={() => rotate(90)} variant="outline">
                            <RotateCw className="mr-2 h-4 w-4" /> +90°
                        </Button>
                    </div>
                    <Button onClick={handleApply} size="lg">Apply Rotation</Button>
                </div>
            )}

            {processedUrl && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 text-center">
                    <div className="font-semibold text-lg">Rotated Preview</div>
                    <div className="border rounded-lg overflow-hidden bg-muted/30 inline-block">
                        <img src={processedUrl} alt="Rotated" className="max-h-[500px] w-auto mx-auto object-contain" />
                    </div>
                    <div className="flex justify-center">
                        <a href={processedUrl} download="rotated-image.png">
                            <Button size="lg" variant="default" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download Rotated Image
                            </Button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
