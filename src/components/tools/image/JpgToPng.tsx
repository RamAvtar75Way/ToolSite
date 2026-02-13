"use client";

import { ImageConverter } from "@/components/tools/image/ImageConverter";

export function JpgToPng() {
    return <ImageConverter targetFormat="png" label="PNG" />;
}
