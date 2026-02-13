"use client";

import { useState } from "react";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { Copy, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function MetaTagGenerator() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        keywords: "",
        author: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        ogUrl: "",
        twitterCard: "summary_large_image",
    });

    const [generatedCode, setGeneratedCode] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const generate = () => {
        let code = `<!-- Standard Meta Tags -->\n`;
        if (formData.title) code += `<title>${formData.title}</title>\n`;
        if (formData.description) code += `<meta name="description" content="${formData.description}">\n`;
        if (formData.keywords) code += `<meta name="keywords" content="${formData.keywords}">\n`;
        if (formData.author) code += `<meta name="author" content="${formData.author}">\n`;
        code += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;

        code += `\n<!-- Open Graph / Facebook -->\n`;
        code += `<meta property="og:type" content="website">\n`;
        if (formData.ogUrl || formData.title) code += `<meta property="og:url" content="${formData.ogUrl}">\n`;
        if (formData.ogTitle || formData.title) code += `<meta property="og:title" content="${formData.ogTitle || formData.title}">\n`;
        if (formData.ogDescription || formData.description) code += `<meta property="og:description" content="${formData.ogDescription || formData.description}">\n`;
        if (formData.ogImage) code += `<meta property="og:image" content="${formData.ogImage}">\n`;

        code += `\n<!-- Twitter -->\n`;
        code += `<meta property="twitter:card" content="${formData.twitterCard}">\n`;
        if (formData.ogUrl) code += `<meta property="twitter:url" content="${formData.ogUrl}">\n`;
        if (formData.ogTitle || formData.title) code += `<meta property="twitter:title" content="${formData.ogTitle || formData.title}">\n`;
        if (formData.ogDescription || formData.description) code += `<meta property="twitter:description" content="${formData.ogDescription || formData.description}">\n`;
        if (formData.ogImage) code += `<meta property="twitter:image" content="${formData.ogImage}">\n`;

        setGeneratedCode(code);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
                <div className="space-y-4 border p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">Basic Info</h3>
                    <div className="space-y-2">
                        <Label>Page Title</Label>
                        <Input name="title" value={formData.title} onChange={handleChange} placeholder="My Awesome Website" />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="A short description of your page" />
                    </div>
                    <div className="space-y-2">
                        <Label>Keywords</Label>
                        <Input name="keywords" value={formData.keywords} onChange={handleChange} placeholder="seo, tools, generator" />
                    </div>
                    <div className="space-y-2">
                        <Label>Author</Label>
                        <Input name="author" value={formData.author} onChange={handleChange} placeholder="Your Name" />
                    </div>
                </div>

                <div className="space-y-4 border p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">Open Graph / Social</h3>
                    <div className="space-y-2">
                        <Label>OG Title (Leave empty to use Page Title)</Label>
                        <Input name="ogTitle" value={formData.ogTitle} onChange={handleChange} placeholder="Social Media Title" />
                    </div>
                    <div className="space-y-2">
                        <Label>OG Description (Leave empty to use standard)</Label>
                        <Textarea name="ogDescription" value={formData.ogDescription} onChange={handleChange} placeholder="Description for social cards" />
                    </div>
                    <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input name="ogImage" value={formData.ogImage} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="space-y-2">
                        <Label>Canonical URL</Label>
                        <Input name="ogUrl" value={formData.ogUrl} onChange={handleChange} placeholder="https://example.com/page" />
                    </div>
                </div>

                <Button onClick={generate} size="lg" className="w-full gap-2">
                    <RefreshCw className="h-4 w-4" /> Generate Meta Tags
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Generated HTML</h3>
                    <Button size="sm" onClick={() => copyToClipboard(generatedCode)} disabled={!generatedCode}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Code
                    </Button>
                </div>
                <Textarea
                    value={generatedCode}
                    readOnly
                    className="font-mono min-h-[500px] bg-muted text-sm"
                    placeholder="Click Generate to see the code..."
                />
            </div>
        </div>
    );
}
