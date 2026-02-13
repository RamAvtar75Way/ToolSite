"use client";

import { useState } from "react";
import { Input, Textarea, Label } from "@/components/ui";

export function SerpPreview() {
    const [title, setTitle] = useState("Your Page Title Goes Here");
    const [description, setDescription] = useState("This is how your page description will appear in search results. Keep it between 150-160 characters for best results.");
    const [url, setUrl] = useState("example.com");

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
                <div className="space-y-4 border p-4 rounded-lg">
                    <div className="space-y-2">
                        <Label>Page Title</Label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={70} />
                        <div className="text-xs text-muted-foreground flex justify-between">
                            <span>{title.length} characters</span>
                            <span>Max ~60 recommended</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={300} />
                        <div className="text-xs text-muted-foreground flex justify-between">
                            <span>{description.length} characters</span>
                            <span>Max ~160 recommended</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>URL / Domain</Label>
                        <Input value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Google Search Preview</h3>

                {/* Desktop Preview */}
                <div className="p-4 bg-white border rounded-lg shadow-sm font-arial max-w-[600px]">
                    <div className="flex items-center gap-2 text-sm text-[#202124] mb-1">
                        <div className="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center text-[10px] overflow-hidden">
                            <img src={`https://www.google.com/s2/favicons?domain=${url}`} alt="icon" className="w-4 h-4" onError={(e) => e.currentTarget.style.display = 'none'} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#202124] text-sm leading-tight">{typeof window !== 'undefined' ? window.location.hostname : 'example.com'}</span>
                            <span className="text-[#5f6368] text-xs leading-tight">https://{url}</span>
                        </div>
                    </div>
                    <h3 className="text-[#1a0dab] text-xl hover:underline cursor-pointer truncate leading-snug mb-1">
                        {title}
                    </h3>
                    <p className="text-[#4d5156] text-sm leading-snug break-words">
                        {description}
                    </p>
                </div>

                {/* Mobile Preview */}
                <h3 className="font-semibold text-lg mt-8">Mobile Preview</h3>
                <div className="p-4 bg-white border rounded-lg shadow-sm font-arial max-w-[375px]">
                    <div className="flex items-center gap-3 text-sm text-[#202124] mb-2">
                        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-[10px] overflow-hidden">
                            <img src={`https://www.google.com/s2/favicons?domain=${url}`} alt="icon" className="w-5 h-5" onError={(e) => e.currentTarget.style.display = 'none'} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#202124] text-sm font-normal">{typeof window !== 'undefined' ? window.location.hostname : 'example.com'}</span>
                            <span className="text-[#5f6368] text-xs">https://{url}</span>
                        </div>
                    </div>
                    <h3 className="text-[#1967d2] text-lg leading-snug mb-1">
                        {title}
                    </h3>
                    <p className="text-[#4d5156] text-sm leading-snug break-words">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
