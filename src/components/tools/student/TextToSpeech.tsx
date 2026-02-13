"use client";

import { useState, useEffect } from "react";
import { Button, Textarea, Label } from "@/components/ui";
import { Play, Square, Pause, RotateCcw } from "lucide-react";

export function TextToSpeech() {
    const [text, setText] = useState("");
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState("");
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const loadVoices = () => {
                const available = window.speechSynthesis.getVoices();
                setVoices(available);
                if (available.length > 0) setSelectedVoice(available[0].name);
            };

            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const speak = () => {
        if (!text) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsSpeaking(true);
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) utterance.voice = voice;
        utterance.rate = rate;
        utterance.pitch = pitch;

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const pause = () => {
        window.speechSynthesis.pause();
        setIsPaused(true);
        setIsSpeaking(false);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] max-w-4xl mx-auto">
            <div className="space-y-4">
                <Label>Enter Text to Read</Label>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste text here..."
                    className="min-h-[300px] text-lg leading-relaxed resize-none p-6"
                />
            </div>

            <div className="space-y-6">
                <div className="space-y-4 border p-4 rounded-lg bg-card">
                    <div className="space-y-2">
                        <Label>Voice</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 truncate"
                            value={selectedVoice}
                            onChange={(e) => setSelectedVoice(e.target.value)}
                        >
                            {voices.map(v => (
                                <option key={v.name} value={v.name}>
                                    {v.name} ({v.lang})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Speed (Rate)</Label>
                            <span className="text-sm text-muted-foreground">{rate}x</span>
                        </div>
                        <input
                            type="range" min="0.5" max="2" step="0.1"
                            value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Pitch</Label>
                            <span className="text-sm text-muted-foreground">{pitch}</span>
                        </div>
                        <input
                            type="range" min="0.5" max="2" step="0.1"
                            value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <Button onClick={speak} disabled={!text || (isSpeaking && !isPaused)} className="w-full">
                        <Play className="w-4 h-4 mr-2" /> {isPaused ? "Resume" : "Play"}
                    </Button>
                    <Button onClick={pause} variant="secondary" disabled={!isSpeaking} className="w-full">
                        <Pause className="w-4 h-4 mr-2" /> Pause
                    </Button>
                    <Button onClick={stop} variant="destructive" disabled={!isSpeaking && !isPaused} className="w-full">
                        <Square className="w-4 h-4 mr-2" /> Stop
                    </Button>
                </div>
            </div>
        </div>
    );
}
