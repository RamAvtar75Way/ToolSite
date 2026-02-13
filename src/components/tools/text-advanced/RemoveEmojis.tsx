"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, Smile } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function RemoveEmojis() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [removedCount, setRemovedCount] = useState(0);

    const process = () => {
        if (!input) return;

        // Regex for emojis
        const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

        const matches = input.match(emojiRegex);
        setRemovedCount(matches ? matches.length : 0);

        const clean = input.replace(emojiRegex, "");
        setOutput(clean);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input Text (With Emojis)</Label>
                <Textarea
                    placeholder="Hello! 👋 How are you? 🚀..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px]"
                />
                <Button onClick={process} className="w-full">
                    <Smile className="h-4 w-4 mr-2" /> Remove All Emojis
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Result</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(output)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy Result
                    </Button>
                </div>
                <Textarea
                    value={output}
                    readOnly
                    className="min-h-[300px] bg-muted/50"
                />
                {removedCount > 0 && (
                    <p className="text-center text-sm text-muted-foreground">
                        Removed {removedCount} emoji{removedCount !== 1 ? "s" : ""}
                    </p>
                )}
            </div>
        </div>
    );
}
