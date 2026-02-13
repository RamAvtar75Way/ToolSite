"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { ImageUploader } from "./ImageUploader";
import { Copy } from "lucide-react";

export function ColorPicker() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [color, setColor] = useState<string>("#ffffff");
    const [rgb, setRgb] = useState<string>("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isReady, setIsReady] = useState(false);

    // Load image onto canvas for picking
    useEffect(() => {
        if (imageUrl && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                setIsReady(true);
            };
            img.src = imageUrl;
        }
    }, [imageUrl]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isReady || !canvasRef.current) return;
        // This is hover preview, could implement if needed
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isReady || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const ctx = canvas.getContext("2d");
        const pixel = ctx?.getImageData(x, y, 1, 1).data;

        if (pixel) {
            const hex = "#" + [pixel[0], pixel[1], pixel[2]].map(x => x.toString(16).padStart(2, '0')).join('');
            setColor(hex);
            setRgb(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
        }
    };

    return (
        <div className="space-y-8">
            {!imageUrl && (
                <ImageUploader
                    onImageSelect={(file, url) => setImageUrl(url)}
                    selectedImage={null}
                    onClear={() => setImageUrl(null)}
                />
            )}

            {imageUrl && (
                <div className="grid md:grid-cols-[1fr_300px] gap-8">
                    <div className="relative border rounded-lg overflow-hidden bg-muted/30 cursor-crosshair">
                        <canvas
                            ref={canvasRef}
                            onClick={handleClick}
                            onMouseMove={handleMouseMove}
                            className="max-w-full h-auto"
                        />
                        <Button
                            className="absolute top-2 right-2"
                            variant="destructive"
                            size="sm"
                            onClick={() => { setImageUrl(null); setIsReady(false); }}
                        >
                            Change Image
                        </Button>
                    </div>

                    <div className="space-y-6">
                        <div className="text-center p-4 rounded-lg shadow-sm border" style={{ backgroundColor: color }}>
                            <span className="text-white mix-blend-difference font-bold text-xl">Selected Color</span>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">HEX</label>
                                <div className="flex gap-2">
                                    <Input value={color} readOnly />
                                    <Button size="icon" onClick={() => navigator.clipboard.writeText(color)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">RGB</label>
                                <div className="flex gap-2">
                                    <Input value={rgb} readOnly />
                                    <Button size="icon" onClick={() => navigator.clipboard.writeText(rgb)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Click anywhere on the image to pick a color.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
