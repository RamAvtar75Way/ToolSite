"use client";

import { useState } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Copy, ArrowRight } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

// Basic XML to JSON converter
const xmlToJson = (xml: any): any => {
    let obj: any = {};

    if (xml.nodeType === 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                const attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            const nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    const old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

export function XmlToJson() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const convert = () => {
        if (!input) return;
        setError("");

        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(input, "text/xml");

            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                setError("Invalid XML");
                return;
            }

            const json = xmlToJson(xmlDoc);
            // Clean up structure significantly for simple cases? 
            // The recursive function is robust but output can be nested. 
            // Let's use it as is for now.

            setOutput(JSON.stringify(json, null, 2));

        } catch (e) {
            setError("Error parsing XML");
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <Label>Input XML</Label>
                <Textarea
                    placeholder="<root><name>John</name></root>"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                />
                <Button onClick={convert} className="w-full">Convert to JSON</Button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>JSON Output</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(output)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy JSON
                    </Button>
                </div>
                <Textarea
                    value={output}
                    readOnly
                    className="min-h-[300px] font-mono text-sm"
                />
            </div>
        </div>
    );
}
