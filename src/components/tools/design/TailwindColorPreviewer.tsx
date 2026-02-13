"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Copy } from "lucide-react";

const colors = {
    slate: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    gray: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    zinc: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    neutral: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    stone: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    red: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    orange: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    amber: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    yellow: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    lime: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    green: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    emerald: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    teal: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    cyan: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    sky: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    blue: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    indigo: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    violet: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    purple: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    fuchsia: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    pink: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    rose: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
};

export function TailwindColorPreviewer() {
    const copyClass = (name: string, shade: number) => {
        navigator.clipboard.writeText(`bg-${name}-${shade}`);
    };

    return (
        <div className="space-y-8">
            <p className="text-muted-foreground">Click on any color to copy its Tailwind class name.</p>
            <div className="space-y-8">
                {Object.entries(colors).map(([name, shades]) => (
                    <div key={name} className="space-y-2">
                        <h3 className="capitalize font-semibold text-sm">{name}</h3>
                        <div className="grid grid-cols-11 gap-2">
                            {shades.map((shade) => (
                                <button
                                    key={shade}
                                    className={`
                                        h-12 rounded-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
                                        bg-${name}-${shade}
                                        group relative
                                    `}
                                    title={`bg-${name}-${shade}`}
                                    onClick={() => copyClass(name, shade)}
                                >
                                    <span className="absolute inset-x-0 bottom-[-20px] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                                        {shade}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
