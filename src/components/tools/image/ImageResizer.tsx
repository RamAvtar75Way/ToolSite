"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { ImageUploader } from "./ImageUploader";
import { Download, ArrowRight, RefreshCw } from "lucide-react";

export function ImageResizer() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [lockAspectRatio, setLockAspectRatio] = useState(true);
    const [resizedUrl, setResizedUrl] = useState<string | null>(null);

    const handleImageSelect = (file: File, url: string) => {
        setImageUrl(url);
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setOriginalDimensions({ width: img.width, height: img.height });
            setWidth(img.width);
            setHeight(img.height);
        };
        setResizedUrl(null);
    };

    const handleWidthChange = (val: number) => {
        setWidth(val);
        if (lockAspectRatio && originalDimensions) {
            setHeight(Math.round(val * (originalDimensions.height / originalDimensions.width)));
        }
    };

    const handleHeightChange = (val: number) => {
        setHeight(val);
        if (lockAspectRatio && originalDimensions) {
            setWidth(Math.round(val * (originalDimensions.width / originalDimensions.height)));
        }
    };

    const handleResize = () => {
        if (!imageUrl) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                setResizedUrl(canvas.toDataURL("image/png"));
            }
        };
        img.src = imageUrl;
    };

    return (
        <div className="space-y-8">
            <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={imageUrl}
                onClear={() => { setImageUrl(null); setResizedUrl(null); }}
            />

            {imageUrl && (
                <div className="grid gap-6 md:grid-cols-2 max-w-xl mx-auto">
                    <div className="space-y-2">
                        <Label>Width (px)</Label>
                        <Input
                            type="number"
                            value={width}
                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Height (px)</Label>
                        <Input
                            type="number"
                            value={height}
                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="md:col-span-2 flex items-center justify-center gap-2">
                        <label className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                checked={lockAspectRatio}
                                onChange={(e) => setLockAspectRatio(e.target.checked)}
                                className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                            <span>Lock Aspect Ratio</span>
                        </label>
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <Button onClick={handleResize} size="lg">Resize Image</Button>
                    </div>
                </div>
            )}

            {resizedUrl && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 text-center">
                    <div className="font-semibold text-lg">Resized Image Preview</div>
                    <div className="border rounded-lg overflow-hidden bg-muted/30 inline-block">
                        <img src={resizedUrl} alt="Resized" className="max-h-[500px] w-auto mx-auto object-contain" />
                    </div>
                    <div className="flex justify-center">
                        <a href={resizedUrl} download="resized-image.png">
                            <Button size="lg" variant="default" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download Resized Image
                            </Button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
