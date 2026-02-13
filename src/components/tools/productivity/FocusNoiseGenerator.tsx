"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui";
import { Play, Pause, Volume2 } from "lucide-react";

export function FocusNoiseGenerator() {
    const [isPlaying, setIsPlaying] = useState<string | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const noiseNodeRef = useRef<AudioScheduledSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    const stopNoise = () => {
        if (noiseNodeRef.current) {
            noiseNodeRef.current.stop();
            noiseNodeRef.current.disconnect();
            noiseNodeRef.current = null;
        }
        if (gainNodeRef.current) {
            gainNodeRef.current.disconnect();
            gainNodeRef.current = null;
        }
        setIsPlaying(null);
    };

    const playNoise = (type: "white" | "pink" | "brown") => {
        if (isPlaying) stopNoise();
        if (isPlaying === type) return;

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const ctx = audioContextRef.current!;
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            let white = Math.random() * 2 - 1;

            if (type === "white") {
                output[i] = white;
            } else if (type === "pink") {
                // Approximate Pink Noise (1/f) using Paul Kellet's refined method
                // Not standard Web Audio API but simple JS generation to fill buffer
                // For simplicity, we stick to white noise in this basic buffer.
                // Or better: Use Brown/White distinction.
                // Complex generation omitted for brevity, simplified to white noise filtering concepts.
                output[i] = (Math.random() * 2 - 1);
            } else {
                output[i] = (Math.random() * 2 - 1);
            }
        }
        // NOTE: True Pink/Brown noise requires filtering. 
        // For this demo agent implementation, we will mock the sound distinction 
        // or actually implement the filtering nodes if we want high quality.
        // Let's implement a ScriptProcessor or createBuffer with actual math for Pink/Brown.

        // Brown Noise
        if (type === "brown") {
            let lastOut = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                output[i] *= 3.5; // Compenstate for gain loss
            }
        } else if (type === "pink") {
            // Pink Noise Approximation
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                let white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + white * 0.5362;
                output[i] *= 0.11; // Normalize roughly
            }
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const gain = ctx.createGain();
        gain.gain.value = 0.5; // Default volume

        noise.connect(gain);
        gain.connect(ctx.destination);
        noise.start();

        noiseNodeRef.current = noise;
        gainNodeRef.current = gain;
        setIsPlaying(type);
    };

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { id: "white", label: "White Noise", color: "bg-gray-100 dark:bg-gray-800" },
                    { id: "pink", label: "Pink Noise", color: "bg-pink-100 dark:bg-pink-900/30" },
                    { id: "brown", label: "Brown Noise", color: "bg-amber-900/40" }
                ].map((noise) => (
                    <button
                        key={noise.id}
                        onClick={() => isPlaying === noise.id ? stopNoise() : playNoise(noise.id as any)}
                        className={`
                            h-32 rounded-xl flex flex-col items-center justify-center gap-4 transition-all
                            ${noise.color} 
                            ${isPlaying === noise.id ? "ring-2 ring-primary scale-105 shadow-md" : "hover:scale-105"}
                        `}
                    >
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center
                            ${isPlaying === noise.id ? "bg-primary text-primary-foreground" : "bg-white/50 dark:bg-black/20"}
                        `}>
                            {isPlaying === noise.id ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                        </div>
                        <span className="font-medium">{noise.label}</span>
                    </button>
                ))}
            </div>

            {isPlaying && (
                <div className="animate-pulse text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Now playing {isPlaying} noise...
                </div>
            )}
        </div>
    );
}
