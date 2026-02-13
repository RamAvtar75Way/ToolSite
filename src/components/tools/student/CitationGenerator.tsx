"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Copy } from "lucide-react";

type Style = "APA" | "MLA" | "Chicago";

export function CitationGenerator() {
    const [style, setStyle] = useState<Style>("APA");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [publisher, setPublisher] = useState("");
    const [url, setUrl] = useState("");
    const [result, setResult] = useState("");

    const generate = () => {
        let citation = "";
        const dateAccess = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

        if (style === "APA") {
            // Author, A. A. (Year). Title of work. Publisher. URL
            citation = `${author ? author + "." : ""} (${year ? year : "n.d."}). *${title}*. ${publisher ? publisher + "." : ""} ${url}`;
        } else if (style === "MLA") {
            // Author. Title of Source. Publisher, Year. URL.
            citation = `${author ? author + "." : ""} "${title}." ${publisher ? publisher + ", " : ""}${year ? year + "." : ""} ${url}`;
        } else if (style === "Chicago") {
            // Author. Title of Book. Place of publication: Publisher, Year.
            citation = `${author ? author + "." : ""} *${title}*. ${publisher ? publisher + ", " : ""}${year ? year + "." : ""}`;
        }

        // Simple markdown to HTML conversion for display
        citation = citation.replace(/\*(.*?)\*/g, "<i>$1</i>");
        setResult(citation);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="flex gap-2 justify-center">
                    {(["APA", "MLA", "Chicago"] as Style[]).map(s => (
                        <Button key={s} variant={style === s ? "default" : "outline"} onClick={() => setStyle(s)}>{s}</Button>
                    ))}
                </div>

                <div className="space-y-4 border p-4 rounded-lg">
                    <div className="space-y-2">
                        <Label>Author (Last, First M.)</Label>
                        <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Smith, John D." />
                    </div>
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="The Great Book" />
                    </div>
                    <div className="space-y-2">
                        <Label>Year of Publication</Label>
                        <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2023" />
                    </div>
                    <div className="space-y-2">
                        <Label>Publisher / Source</Label>
                        <Input value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Penguin Books" />
                    </div>
                    <div className="space-y-2">
                        <Label>URL (Optional)</Label>
                        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
                    </div>
                </div>

                <Button onClick={generate} size="lg" className="w-full">Generate Citation</Button>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Result ({style})</h3>
                {result ? (
                    <div className="p-4 bg-muted rounded-lg relative group">
                        <div className="pr-10 leading-relaxed" dangerouslySetInnerHTML={{ __html: result }} />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                                const temp = document.createElement("div");
                                temp.innerHTML = result;
                                navigator.clipboard.writeText(temp.textContent || temp.innerText || "");
                            }}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                        Fill in the details to generate a citation.
                    </div>
                )}
            </div>
        </div>
    );
}
