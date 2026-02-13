"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
    onImageSelect: (file: File, imageUrl: string) => void;
    selectedImage?: string | null;
    onClear: () => void;
    accept?: string;
}

export function ImageUploader({ onImageSelect, selectedImage, onClear, accept = "image/*" }: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        onImageSelect(file, url);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    if (selectedImage) {
        return (
            <div className="relative rounded-lg border overflow-hidden bg-muted/30">
                <div className="absolute top-2 right-2 z-10">
                    <Button variant="ghost" size="icon" onClick={onClear} className="bg-background/80 hover:bg-background rounded-full">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <img
                    src={selectedImage}
                    alt="Preview"
                    className="max-h-[500px] w-auto mx-auto object-contain"
                />
            </div>
        );
    }

    return (
        <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[300px]",
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            )}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
            />
            <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Click or drag image here</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
                Supports JPG, PNG, WEBP, and other common image formats.
            </p>
        </div>
    );
}
