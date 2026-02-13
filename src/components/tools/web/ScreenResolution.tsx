"use client";

import { useState, useEffect } from "react";
import { Monitor, Smartphone } from "lucide-react";

export function ScreenResolution() {
    const [res, setRes] = useState<{ width: number; height: number; dpr: number } | null>(null);

    useEffect(() => {
        const update = () => {
            setRes({
                width: window.screen.width,
                height: window.screen.height,
                dpr: window.devicePixelRatio || 1,
            });
        };

        update();
        window.addEventListener("resize", update); // Screen size doesn't change usually but window might on desktop
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <div className="max-w-xl mx-auto space-y-8 text-center text-left">
            {res ? (
                <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-8 border rounded-xl bg-card shadow-sm flex flex-col items-center gap-4">
                        <Monitor className="w-16 h-16 text-primary" />
                        <div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Screen Resolution</div>
                            <div className="text-5xl font-bold text-primary">
                                {res.width} x {res.height}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg bg-card">
                            <div className="text-sm text-muted-foreground">Pixel Ratio (DPR)</div>
                            <div className="text-2xl font-bold">{res.dpr}x</div>
                        </div>
                        <div className="p-4 border rounded-lg bg-card">
                            <div className="text-sm text-muted-foreground">Color Depth</div>
                            <div className="text-2xl font-bold">{typeof window !== 'undefined' ? window.screen.colorDepth : 24}-bit</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-8 text-center text-muted-foreground">Checking resolution...</div>
            )}
        </div>
    );
}
