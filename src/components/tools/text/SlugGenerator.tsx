"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui"; // Note: Label might need to be added to ui/index.tsx
import { Copy, Trash2, ArrowRight } from "lucide-react";

export function SlugGenerator() {
    const [text, setText] = useState("");
    const [slug, setSlug] = useState("");

    const handleGenerate = (inputText: string) => {
        setText(inputText);
        const newSlug = inputText
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        setSlug(newSlug);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(slug);
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enter Text to Slugify
                </label>
                <Input
                    value={text}
                    onChange={(e) => handleGenerate(e.target.value)}
                    placeholder="e.g. Hello World! This is a Title"
                    className="text-lg p-6"
                />
            </div>

            <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90 md:rotate-0" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Generated Slug
                </label>
                <div className="flex gap-2">
                    <Input
                        value={slug}
                        readOnly
                        className="text-lg p-6 bg-muted text-muted-foreground font-mono"
                    />
                    <Button size="icon" className="h-auto w-14 shrink-0" onClick={handleCopy}>
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
