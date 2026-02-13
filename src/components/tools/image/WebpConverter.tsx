"use client";

import { ImageConverter } from "@/components/tools/image/ImageConverter";

export function WebpConverter() {
    return <ImageConverter targetFormat="webp" label="WebP" />;
}
