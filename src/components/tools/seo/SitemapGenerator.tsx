"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy } from "lucide-react";

export function SitemapGenerator() {
    const [urls, setUrls] = useState("");
    const [output, setOutput] = useState("");
    const [lastMod, setLastMod] = useState(new Date().toISOString().split('T')[0]);
    const [priority, setPriority] = useState("0.8");
    const [frequency, setFrequency] = useState("monthly");

    const generate = () => {
        const urlList = urls.split('\n').filter(u => u.trim());
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        urlList.forEach(url => {
            xml += `  <url>\n`;
            xml += `    <loc>${url.trim()}</loc>\n`;
            xml += `    <lastmod>${lastMod}</lastmod>\n`;
            xml += `    <changefreq>${frequency}</changefreq>\n`;
            xml += `    <priority>${priority}</priority>\n`;
            xml += `  </url>\n`;
        });

        xml += `</urlset>`;
        setOutput(xml);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Enter URLs (One per line)</Label>
                    <Textarea
                        value={urls}
                        onChange={(e) => setUrls(e.target.value)}
                        placeholder="https://example.com/page1&#10;https://example.com/page2"
                        className="min-h-[200px]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Last Modified</Label>
                        <input
                            type="date"
                            value={lastMod}
                            onChange={(e) => setLastMod(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Priority</Label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="1.0">1.0 (High)</option>
                            <option value="0.8">0.8</option>
                            <option value="0.5">0.5 (Medium)</option>
                            <option value="0.3">0.3</option>
                            <option value="0.1">0.1 (Low)</option>
                        </select>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Change Frequency</Label>
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="always">Always</option>
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="never">Never</option>
                        </select>
                    </div>
                </div>

                <Button onClick={generate} size="lg" className="w-full">Generate Sitemap XML</Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Result</h3>
                    <Button size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
                        <Copy className="mr-2 h-4 w-4" /> Copy XML
                    </Button>
                </div>
                <Textarea
                    value={output}
                    readOnly
                    className="font-mono min-h-[400px] bg-muted text-sm"
                    placeholder="XML will appear here..."
                />
            </div>
        </div>
    );
}
