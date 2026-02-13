"use client";

import { useState } from "react";
import { Button, Label } from "@/components/ui";
import { Copy } from "lucide-react";

const shapes = {
    "Trapezoid": "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
    "Parallelogram": "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
    "Triangle": "polygon(50% 0%, 0% 100%, 100% 100%)",
    "Circle": "circle(50% at 50% 50%)",
    "Ellipse": "ellipse(25% 40% at 50% 50%)",
    "Rhombus": "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    "Pentagon": "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    "Hexagon": "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    "Heptagon": "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
    "Octagon": "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
    "Star": "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    "Cross": "polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)",
    "Message": "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)"
};

export function CssClipPathGenerator() {
    const [selected, setSelected] = useState("Trapezoid");
    const code = `clip-path: ${shapes[selected as keyof typeof shapes]};`;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center p-12 bg-muted/50 rounded-xl border">
                    <div
                        className="w-48 h-48 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg"
                        style={{ clipPath: shapes[selected as keyof typeof shapes] }}
                    />
                </div>

                <div className="space-y-6">
                    <Label>Select Shape</Label>
                    <div className="grid grid-cols-2 gap-3 h-80 overflow-y-auto p-2 border rounded-md">
                        {Object.keys(shapes).map((shape) => (
                            <Button
                                key={shape}
                                variant={selected === shape ? "default" : "outline"}
                                className="justify-start"
                                onClick={() => setSelected(shape)}
                            >
                                {shape}
                            </Button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <Label>CSS Code</Label>
                        <div className="relative">
                            <code className="block p-4 bg-muted rounded-md text-sm font-mono break-all">
                                {code}
                            </code>
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
