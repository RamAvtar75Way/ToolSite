"use client";

import { useState } from "react";
import { Button, Label } from "@/components/ui";
import { Copy } from "lucide-react";

export function CssGlassmorphismGenerator() {
    const [blur, setBlur] = useState(10);
    const [transparency, setTransparency] = useState(0.5);
    const [saturation, setSaturation] = useState(180);
    const [color, setColor] = useState("white"); // 'white' | 'black'

    const bgColor = color === "white" ? `rgba(255, 255, 255, ${transparency})` : `rgba(0, 0, 0, ${transparency})`;

    const code = `background: ${bgColor};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, 0.3);
border-radius: 12px;`;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Visual Preview */}
            <div
                className="relative h-80 w-full rounded-xl overflow-hidden flex items-center justify-center p-8"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div
                    className="w-full max-w-md p-8 shadow-xl"
                    style={{
                        background: bgColor,
                        backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                        WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px'
                    }}
                >
                    <h3 className={`text-2xl font-bold mb-2 ${color === "white" ? "text-gray-800" : "text-white"}`}>Glass Effect</h3>
                    <p className={`${color === "white" ? "text-gray-600" : "text-gray-300"}`}>
                        Adjust the sliders to modify the backdrop blur, transparency, and saturation.
                    </p>
                    <Button className="mt-4 w-full" variant={color === "white" ? "default" : "secondary"}>Action</Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label>Blur Amount ({blur}px)</Label>
                        <input
                            type="range" min="0" max="40" value={blur}
                            onChange={(e) => setBlur(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Transparency ({transparency})</Label>
                        <input
                            type="range" min="0" max="1" step="0.01" value={transparency}
                            onChange={(e) => setTransparency(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Saturation ({saturation}%)</Label>
                        <input
                            type="range" min="0" max="200" value={saturation}
                            onChange={(e) => setSaturation(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Base Color</Label>
                        <div className="flex gap-4">
                            <Button
                                variant={color === "white" ? "default" : "outline"}
                                onClick={() => setColor("white")}
                                className="w-full"
                            >
                                White
                            </Button>
                            <Button
                                variant={color === "black" ? "default" : "outline"}
                                onClick={() => setColor("black")}
                                className="w-full"
                            >
                                Black
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2 pt-4">
                        <Label>CSS Code</Label>
                        <div className="relative">
                            <textarea
                                className="w-full h-32 p-4 font-mono text-sm bg-muted rounded-md resize-none focus:outline-none ring-1 ring-border"
                                readOnly
                                value={code}
                            />
                            <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-2 right-2"
                                onClick={() => navigator.clipboard.writeText(code)}
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
