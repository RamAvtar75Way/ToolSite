"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Trash2, Plus, Copy, Smartphone } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

interface LinkItem {
    id: string;
    title: string;
    url: string;
}

export function BioLinkBuilder() {
    const [name, setName] = useState("Your Name");
    const [bio, setBio] = useState("Digital Creator | Tech Enthusiast");
    const [links, setLinks] = useState<LinkItem[]>([
        { id: "1", title: "My Website", url: "https://example.com" },
        { id: "2", title: "Instagram", url: "https://instagram.com" }
    ]);

    const addLink = () => {
        setLinks([...links, { id: Date.now().toString(), title: "", url: "" }]);
    };

    const updateLink = (id: string, field: keyof LinkItem, value: string) => {
        setLinks(links.map(link => link.id === id ? { ...link, [field]: value } : link));
    };

    const removeLink = (id: string) => {
        setLinks(links.filter(link => link.id !== id));
    };

    const generateCode = () => {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Links</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #f4f4f5; color: #18181b; display: flex; flex-direction: column; align-items: center; padding: 2rem; min-height: 100vh; }
        .container { max-width: 480px; width: 100%; text-align: center; }
        .avatar { width: 96px; height: 96px; background: #ddd; border-radius: 50%; margin: 0 auto 1rem; }
        h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        p { color: #71717a; margin-bottom: 2rem; }
        .links { display: flex; flex-direction: column; gap: 1rem; }
        .link { display: block; background: white; padding: 1rem; border-radius: 0.5rem; text-decoration: none; color: inherit; font-weight: 500; transition: transform 0.2s, box-shadow 0.2s; border: 1px solid #e4e4e7; }
        .link:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    </style>
</head>
<body>
    <div class="container">
        <div class="avatar"></div>
        <h1>${name}</h1>
        <p>${bio}</p>
        <div class="links">
            ${links.map(link => `<a href="${link.url}" class="link" target="_blank">${link.title}</a>`).join('\n            ')}
        </div>
    </div>
</body>
</html>
        `.trim();
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="space-y-4 border p-6 rounded-xl bg-card">
                    <h3 className="font-semibold text-lg border-b pb-2">Profile Info</h3>
                    <div className="space-y-2">
                        <Label>Display Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Short Bio</Label>
                        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={2} />
                    </div>
                </div>

                <div className="space-y-4 border p-6 rounded-xl bg-card">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h3 className="font-semibold text-lg">Links</h3>
                        <Button size="sm" onClick={addLink}><Plus className="h-4 w-4 mr-2" /> Add Link</Button>
                    </div>

                    <div className="space-y-4">
                        {links.map((link, index) => (
                            <div key={link.id} className="grid gap-2 p-4 bg-muted rounded-lg relative group">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                    onClick={() => removeLink(link.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                <div className="grid gap-2 pr-8">
                                    <Input
                                        placeholder="Link Title (e.g. My Website)"
                                        value={link.title}
                                        onChange={(e) => updateLink(link.id, "title", e.target.value)}
                                    />
                                    <Input
                                        placeholder="URL (https://...)"
                                        value={link.url}
                                        onChange={(e) => updateLink(link.id, "url", e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="border p-4 rounded-xl bg-muted/50 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4 text-muted-foreground font-medium">
                        <Smartphone className="h-4 w-4" /> Live Preview
                    </div>
                    <div className="w-[320px] h-[600px] bg-white dark:bg-zinc-900 border-4 border-zinc-300 dark:border-zinc-700 rounded-[2.5rem] overflow-hidden shadow-xl relative">
                        <div className="h-full overflow-y-auto p-6 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4 shrink-0" />
                            <h2 className="font-bold text-xl mb-1 dark:text-white">{name || "Your Name"}</h2>
                            <p className="text-sm text-zinc-500 mb-6 px-4">{bio || "Your bio goes here..."}</p>

                            <div className="w-full space-y-3">
                                {links.map(link => (
                                    <div key={link.id} className="w-full p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700">
                                        {link.title || "Link Title"}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Button className="w-full" size="lg" onClick={() => copyToClipboard(generateCode())}>
                    <Copy className="h-4 w-4 mr-2" /> Copy HTML Source Code
                </Button>
            </div>
        </div>
    );
}
