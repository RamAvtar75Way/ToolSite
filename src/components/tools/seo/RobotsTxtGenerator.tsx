"use client";

import { useState } from "react";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { Copy, Plus, X } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function RobotsTxtGenerator() {
    const [userAgent, setUserAgent] = useState("*");
    const [rules, setRules] = useState<{ type: "Allow" | "Disallow", path: string }[]>([]);
    const [sitemap, setSitemap] = useState("");
    const [output, setOutput] = useState("");

    const addRule = (type: "Allow" | "Disallow") => {
        setRules([...rules, { type, path: "/" }]);
    };

    const removeRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    const updateRule = (index: number, path: string) => {
        const newRules = [...rules];
        newRules[index].path = path;
        setRules(newRules);
    };

    const generate = () => {
        let txt = `User-agent: ${userAgent}\n`;
        rules.forEach(rule => {
            txt += `${rule.type}: ${rule.path}\n`;
        });
        if (sitemap) {
            txt += `\nSitemap: ${sitemap}`;
        }
        setOutput(txt);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
                <div className="space-y-4 border p-4 rounded-lg">
                    <div className="space-y-2">
                        <Label>User Agent</Label>
                        <Input value={userAgent} onChange={(e) => setUserAgent(e.target.value)} placeholder="*" />
                        <p className="text-xs text-muted-foreground">Use * for all bots, or specify (e.g., Googlebot)</p>
                    </div>
                </div>

                <div className="space-y-4 border p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <Label>Directives</Label>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => addRule("Allow")}>+ Allow</Button>
                            <Button size="sm" variant="outline" onClick={() => addRule("Disallow")}>+ Disallow</Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {rules.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No rules added.</p>}
                        {rules.map((rule, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <div className="w-24 text-sm font-semibold">{rule.type}:</div>
                                <Input value={rule.path} onChange={(e) => updateRule(i, e.target.value)} placeholder="/" />
                                <Button size="icon" variant="ghost" onClick={() => removeRule(i)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 border p-4 rounded-lg">
                    <div className="space-y-2">
                        <Label>Sitemap URL (Optional)</Label>
                        <Input value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" />
                    </div>
                </div>

                <Button onClick={generate} size="lg" className="w-full">Generate robots.txt</Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Result</h3>
                    <Button size="sm" onClick={() => copyToClipboard(output)} disabled={!output}>
                        <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                </div>
                <Textarea
                    value={output}
                    readOnly
                    className="font-mono min-h-[400px] bg-muted text-sm"
                    placeholder="Result will appear here..."
                />
            </div>
        </div>
    );
}
