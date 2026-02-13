"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { ImageUploader } from "./ImageUploader";
import { Download, ArrowRight } from "lucide-react";

interface ImageConverterProps {
    targetFormat: "png" | "jpeg" | "webp";
    label: string;
}

export function ImageConverter({ targetFormat, label }: ImageConverterProps) {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleImageSelect = (selectedFile: File, url: string) => {
        setFile(selectedFile);
        setImageUrl(url);
        setConvertedUrl(null);
    };

    const handleClear = () => {
        setFile(null);
        setImageUrl(null);
        setConvertedUrl(null);
    };

    const handleConvert = () => {
        if (!imageUrl) return;
        setIsProcessing(true);

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                // Draw white background for transparent images (if converting to JPEG)
                if (targetFormat === "jpeg") {
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                ctx.drawImage(img, 0, 0);

                const mimeType = `image/${targetFormat}`;
                const dataUrl = canvas.toDataURL(mimeType, 0.92);
                setConvertedUrl(dataUrl);
                setIsProcessing(false);
            }
        };
        img.src = imageUrl;
    };

    return (
        <div className="space-y-8">
            <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={imageUrl}
                onClear={handleClear}
            />

            {imageUrl && !convertedUrl && (
                <div className="flex justify-center">
                    <Button size="lg" onClick={handleConvert} disabled={isProcessing}>
                        {isProcessing ? "Converting..." : `Convert to ${label}`}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}

            {convertedUrl && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="text-center font-semibold text-lg">Converted Image</div>
                    <div className="border rounded-lg overflow-hidden bg-muted/30">
                        <img src={convertedUrl} alt="Converted" className="max-h-[500px] w-auto mx-auto object-contain" />
                    </div>
                    <div className="flex justify-center">
                        <a href={convertedUrl} download={`converted-image.${targetFormat}`}>
                            <Button size="lg" variant="default" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download {label}
                            </Button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
