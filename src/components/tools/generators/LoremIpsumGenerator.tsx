"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export function LoremIpsumGenerator() {
    const [count, setCount] = useState(3);
    const [type, setType] = useState<"paragraphs" | "sentences">("paragraphs");
    const [text, setText] = useState(LOREM);

    const generate = () => {
        let result = "";
        if (type === "paragraphs") {
            for (let i = 0; i < count; i++) {
                result += LOREM + "\n\n";
            }
        } else {
            const sentences = LOREM.split(". ");
            for (let i = 0; i < count; i++) {
                result += sentences[i % sentences.length] + ". ";
            }
        }
        setText(result.trim());
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 w-24">
                    <Label>Count</Label>
                    <Input
                        type="number"
                        min={1}
                        max={50}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                    />
                </div>
                <div className="space-y-2 flex-1">
                    <Label>Type</Label>
                    <div className="flex gap-2">
                        <Button
                            variant={type === "paragraphs" ? "default" : "outline"}
                            onClick={() => setType("paragraphs")}
                            className="flex-1"
                        >
                            Paragraphs
                        </Button>
                        <Button
                            variant={type === "sentences" ? "default" : "outline"}
                            onClick={() => setType("sentences")}
                            className="flex-1"
                        >
                            Sentences
                        </Button>
                    </div>
                </div>
                <Button onClick={generate}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Generate
                </Button>
            </div>

            <div className="relative">
                <Textarea
                    value={text}
                    readOnly
                    className="min-h-[300px] leading-relaxed"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => {
                        navigator.clipboard.writeText(text);
                        toast.success("Copied!");
                    }}
                >
                    <Copy className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
