"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const ADJECTIVES = ["Cool", "Super", "Fast", "Happy", "Lucky", "Digital", "Cyber", "Mega", "Ultra", "Hyper"];
const NOUNS = ["Coder", "Ninja", "Guru", "Master", "Wizard", "Dev", "Geek", "Nerd", "Hacker", "Bot"];

export function UsernameGenerator() {
    const [keyword, setKeyword] = useState("");
    const [usernames, setUsernames] = useState<string[]>([]);

    const generate = () => {
        const newNames = [];
        for (let i = 0; i < 10; i++) {
            const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
            const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
            const num = Math.floor(Math.random() * 1000);

            if (keyword) {
                // Mix keyword with random elements
                const format = Math.floor(Math.random() * 3);
                if (format === 0) newNames.push(`${keyword}${num}`);
                else if (format === 1) newNames.push(`${adj}${keyword}`);
                else newNames.push(`${keyword}_${noun}`);
            } else {
                newNames.push(`${adj}${noun}${num}`);
            }
        }
        setUsernames(newNames);
    };

    const copyToClipboard = () => {
        if (usernames.length === 0) return;
        navigator.clipboard.writeText(usernames.join("\n"));
        toast.success("Usernames copied to clipboard");
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                    <Label>Seed Keyword (Optional)</Label>
                    <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="e.g. john"
                    />
                </div>
                <Button onClick={generate}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Generate
                </Button>
            </div>

            {usernames.length > 0 && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Results</Label>
                        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                            <Copy className="w-4 h-4 mr-2" /> Copy All
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {usernames.map((name, i) => (
                            <div key={i} className="p-3 bg-muted rounded-md flex justify-between items-center">
                                <span className="font-mono">{name}</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => {
                                    navigator.clipboard.writeText(name);
                                    toast.success("Copied!");
                                }}>
                                    <Copy className="w-3 h-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
