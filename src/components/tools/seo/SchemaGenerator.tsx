"use client";

import { useState } from "react";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

type SchemaType = "Article" | "Product" | "FAQPage" | "LocalBusiness";

export function SchemaGenerator() {
    const [type, setType] = useState<SchemaType>("Article");
    const [output, setOutput] = useState("");

    // Generic form state - in real app, separate standard states
    const [formData, setFormData] = useState<any>({});

    const handleTypeChange = (t: SchemaType) => {
        setType(t);
        setFormData({});
        setOutput("");
    };

    const handleChange = (name: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const generate = () => {
        let schema: any = {
            "@context": "https://schema.org",
            "@type": type
        };

        if (type === "Article") {
            schema.headline = formData.headline;
            schema.image = formData.image ? [formData.image] : [];
            schema.author = {
                "@type": "Person",
                "name": formData.author
            };
            schema.publisher = {
                "@type": "Organization",
                "name": formData.publisher,
                "logo": {
                    "@type": "ImageObject",
                    "url": formData.logo
                }
            };
            schema.datePublished = formData.datePublished;
        } else if (type === "Product") {
            schema.name = formData.name;
            schema.image = formData.image ? [formData.image] : [];
            schema.description = formData.description;
            schema.brand = {
                "@type": "Brand",
                "name": formData.brand
            };
            if (formData.price) {
                schema.offers = {
                    "@type": "Offer",
                    "url": formData.url,
                    "priceCurrency": "USD",
                    "price": formData.price,
                    "availability": "https://schema.org/InStock"
                };
            }
        } else if (type === "FAQPage") {
            // Simplified for MVP: just one Q&A pair text parsing? 
            // Let's do a simple Q&A for MVP or TextArea line by line?
            // Let's assume user inputs Q and A in separate fields?
            // For simplicity, let's just do one Q&A pair.
            schema.mainEntity = [{
                "@type": "Question",
                "name": formData.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": formData.answer
                }
            }];
        } else if (type === "LocalBusiness") {
            schema.name = formData.name;
            schema.image = formData.image;
            schema.telephone = formData.telephone;
            schema.address = {
                "@type": "PostalAddress",
                "streetAddress": formData.streetAddress,
                "addressLocality": formData.addressLocality,
                "addressRegion": formData.addressRegion
            };
        }

        setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Schema Type</Label>
                    <select
                        value={type}
                        onChange={(e) => handleTypeChange(e.target.value as SchemaType)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="Article">Article</option>
                        <option value="Product">Product</option>
                        <option value="FAQPage">FAQ Page</option>
                        <option value="LocalBusiness">Local Business</option>
                    </select>
                </div>

                <div className="space-y-4 border p-4 rounded-lg">
                    {type === "Article" && (
                        <>
                            <Input placeholder="Headline" onChange={(e) => handleChange("headline", e.target.value)} />
                            <Input placeholder="Image URL" onChange={(e) => handleChange("image", e.target.value)} />
                            <Input placeholder="Author Name" onChange={(e) => handleChange("author", e.target.value)} />
                            <Input placeholder="Publisher Name" onChange={(e) => handleChange("publisher", e.target.value)} />
                            <Input placeholder="Publisher Logo URL" onChange={(e) => handleChange("logo", e.target.value)} />
                            <Input type="date" onChange={(e) => handleChange("datePublished", e.target.value)} />
                        </>
                    )}
                    {type === "Product" && (
                        <>
                            <Input placeholder="Product Name" onChange={(e) => handleChange("name", e.target.value)} />
                            <Input placeholder="Image URL" onChange={(e) => handleChange("image", e.target.value)} />
                            <Textarea placeholder="Description" onChange={(e) => handleChange("description", e.target.value)} />
                            <Input placeholder="Brand" onChange={(e) => handleChange("brand", e.target.value)} />
                            <Input placeholder="Price" type="number" onChange={(e) => handleChange("price", e.target.value)} />
                            <Input placeholder="Product URL" onChange={(e) => handleChange("url", e.target.value)} />
                        </>
                    )}
                    {type === "FAQPage" && (
                        <>
                            <p className="text-sm text-muted-foreground">Add a Question and Answer pair.</p>
                            <Input placeholder="Question" onChange={(e) => handleChange("question", e.target.value)} />
                            <Textarea placeholder="Answer" onChange={(e) => handleChange("answer", e.target.value)} />
                        </>
                    )}
                    {type === "LocalBusiness" && (
                        <>
                            <Input placeholder="Business Name" onChange={(e) => handleChange("name", e.target.value)} />
                            <Input placeholder="Image URL" onChange={(e) => handleChange("image", e.target.value)} />
                            <Input placeholder="Telephone" onChange={(e) => handleChange("telephone", e.target.value)} />
                            <Input placeholder="Street Address" onChange={(e) => handleChange("streetAddress", e.target.value)} />
                            <Input placeholder="City" onChange={(e) => handleChange("addressLocality", e.target.value)} />
                            <Input placeholder="State/Region" onChange={(e) => handleChange("addressRegion", e.target.value)} />
                        </>
                    )}
                </div>

                <Button onClick={generate} size="lg" className="w-full">Generate JSON-LD</Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Result</h3>
                    <Button size="sm" onClick={() => copyToClipboard(output)} disabled={!output}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Script
                    </Button>
                </div>
                <Textarea
                    value={output}
                    readOnly
                    className="font-mono min-h-[400px] bg-muted text-sm"
                    placeholder="JSON-LD will appear here..."
                />
            </div>
        </div>
    );
}
