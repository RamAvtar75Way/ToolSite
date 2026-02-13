"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";

export function PercentageCalculator() {
    const [inputs, setInputs] = useState({
        whatIsXOfY: { x: "", y: "", result: "" },
        xIsWhatPercentOfY: { x: "", y: "", result: "" },
        percentChange: { from: "", to: "", result: "" }
    });

    const calcWhatIsXOfY = () => {
        const { x, y } = inputs.whatIsXOfY;
        if (x && y) {
            const res = (parseFloat(x) / 100) * parseFloat(y);
            setInputs(prev => ({ ...prev, whatIsXOfY: { ...prev.whatIsXOfY, result: res.toFixed(2) } }));
        }
    };

    const calcXIsWhatPercentOfY = () => {
        const { x, y } = inputs.xIsWhatPercentOfY;
        if (x && y) {
            const res = (parseFloat(x) / parseFloat(y)) * 100;
            setInputs(prev => ({ ...prev, xIsWhatPercentOfY: { ...prev.xIsWhatPercentOfY, result: res.toFixed(2) + "%" } }));
        }
    };

    const calcPercentChange = () => {
        const { from, to } = inputs.percentChange;
        if (from && to) {
            const f = parseFloat(from);
            const t = parseFloat(to);
            const res = ((t - f) / f) * 100;
            setInputs(prev => ({ ...prev, percentChange: { ...prev.percentChange, result: (res > 0 ? "+" : "") + res.toFixed(2) + "%" } }));
        }
    };

    return (
        <div className="grid gap-8 max-w-3xl mx-auto">
            {/* What is X% of Y? */}
            <div className="p-6 border rounded-lg space-y-4">
                <Label className="text-lg font-semibold">What is ...</Label>
                <div className="flex flex-wrap items-end gap-2 text-lg">
                    <span className="pb-2">What is</span>
                    <div className="w-24"><Input placeholder="X" value={inputs.whatIsXOfY.x} onChange={(e) => setInputs(prev => ({ ...prev, whatIsXOfY: { ...prev.whatIsXOfY, x: e.target.value } }))} /></div>
                    <span className="pb-2">% of</span>
                    <div className="w-24"><Input placeholder="Y" value={inputs.whatIsXOfY.y} onChange={(e) => setInputs(prev => ({ ...prev, whatIsXOfY: { ...prev.whatIsXOfY, y: e.target.value } }))} /></div>
                    <span className="pb-2">?</span>
                    <Button onClick={calcWhatIsXOfY}>Calculate</Button>
                </div>
                {inputs.whatIsXOfY.result && <div className="text-2xl font-bold text-primary">= {inputs.whatIsXOfY.result}</div>}
            </div>

            {/* X is what % of Y? */}
            <div className="p-6 border rounded-lg space-y-4">
                <Label className="text-lg font-semibold">X is what % of Y?</Label>
                <div className="flex flex-wrap items-end gap-2 text-lg">
                    <div className="w-24"><Input placeholder="X" value={inputs.xIsWhatPercentOfY.x} onChange={(e) => setInputs(prev => ({ ...prev, xIsWhatPercentOfY: { ...prev.xIsWhatPercentOfY, x: e.target.value } }))} /></div>
                    <span className="pb-2">is what % of</span>
                    <div className="w-24"><Input placeholder="Y" value={inputs.xIsWhatPercentOfY.y} onChange={(e) => setInputs(prev => ({ ...prev, xIsWhatPercentOfY: { ...prev.xIsWhatPercentOfY, y: e.target.value } }))} /></div>
                    <span className="pb-2">?</span>
                    <Button onClick={calcXIsWhatPercentOfY}>Calculate</Button>
                </div>
                {inputs.xIsWhatPercentOfY.result && <div className="text-2xl font-bold text-primary">= {inputs.xIsWhatPercentOfY.result}</div>}
            </div>

            {/* Percentage Change */}
            <div className="p-6 border rounded-lg space-y-4">
                <Label className="text-lg font-semibold">Percentage Change</Label>
                <div className="flex flex-wrap items-end gap-2 text-lg">
                    <span className="pb-2">From</span>
                    <div className="w-24"><Input placeholder="Start" value={inputs.percentChange.from} onChange={(e) => setInputs(prev => ({ ...prev, percentChange: { ...prev.percentChange, from: e.target.value } }))} /></div>
                    <span className="pb-2">to</span>
                    <div className="w-24"><Input placeholder="End" value={inputs.percentChange.to} onChange={(e) => setInputs(prev => ({ ...prev, percentChange: { ...prev.percentChange, to: e.target.value } }))} /></div>
                    <span className="pb-2">?</span>
                    <Button onClick={calcPercentChange}>Calculate</Button>
                </div>
                {inputs.percentChange.result && <div className="text-2xl font-bold text-primary">{inputs.percentChange.result}</div>}
            </div>
        </div>
    );
}
