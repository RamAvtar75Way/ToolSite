"use client";

import { ImageConverter } from "@/components/tools/image/ImageConverter";

export function PngToJpg() {
    return <ImageConverter targetFormat="jpeg" label="JPG" />;
}
