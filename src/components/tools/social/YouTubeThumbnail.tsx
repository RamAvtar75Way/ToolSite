"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Download, Image as ImageIcon } from "lucide-react";

export function YouTubeThumbnail() {
    const [url, setUrl] = useState("");
    const [videoId, setVideoId] = useState("");
    const [error, setError] = useState("");

    const extractId = (input: string) => {
        let id = "";
        try {
            // Handle full URL
            if (input.includes("youtube.com") || input.includes("youtu.be")) {
                const urlObj = new URL(input);
                if (input.includes("youtube.com")) {
                    id = urlObj.searchParams.get("v") || "";
                } else if (input.includes("youtu.be")) {
                    id = urlObj.pathname.slice(1);
                }
            } else {
                // Assume ID if short
                if (input.length === 11) id = input;
            }
        } catch (e) {
            // invalid url
        }
        return id;
    };

    const generate = () => {
        const id = extractId(url);
        if (id) {
            setVideoId(id);
            setError("");
        } else {
            setError("Invalid YouTube URL or ID");
            setVideoId("");
        }
    };

    const download = (quality: string) => {
        // Direct download of cross-origin images is often blocked by browser.
        // We open in new tab as fallback.
        const imgUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
        window.open(imgUrl, "_blank");
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                    <Label>YouTube Video URL</Label>
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                    />
                </div>
                <Button onClick={generate}>Get Thumbnails</Button>
            </div>

            {error && <p className="text-destructive">{error}</p>}

            {videoId && (
                <div className="grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4">
                    <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                alt="Max Resolution"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="secondary" onClick={() => download("maxresdefault")}>
                                    <Download className="mr-2 h-4 w-4" /> Open Max Res
                                </Button>
                            </div>
                        </div>
                        <div className="text-center font-medium">Max Resolution (1280x720)</div>
                    </div>

                    <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`}
                                alt="Standard Quality"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="secondary" onClick={() => download("sddefault")}>
                                    <Download className="mr-2 h-4 w-4" /> Open Standard
                                </Button>
                            </div>
                        </div>
                        <div className="text-center font-medium">Standard Quality (640x480)</div>
                    </div>

                    <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                alt="High Quality"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="secondary" onClick={() => download("hqdefault")}>
                                    <Download className="mr-2 h-4 w-4" /> Open High Quality
                                </Button>
                            </div>
                        </div>
                        <div className="text-center font-medium">High Quality (480x360)</div>
                    </div>

                    <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                alt="Medium Quality"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="secondary" onClick={() => download("mqdefault")}>
                                    <Download className="mr-2 h-4 w-4" /> Open Medium
                                </Button>
                            </div>
                        </div>
                        <div className="text-center font-medium">Medium Quality (320x180)</div>
                    </div>
                </div>
            )}
        </div>
    );
}
