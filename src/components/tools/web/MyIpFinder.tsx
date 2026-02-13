"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { RefreshCw, Globe, MapPin, Network } from "lucide-react";

interface IpData {
    ip: string;
    city?: string;
    region?: string;
    country?: string;
    loc?: string;
    org?: string;
    timezone?: string;
}

export function MyIpFinder() {
    const [data, setData] = useState<IpData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchIp = async () => {
        setLoading(true);
        setError("");
        try {
            // Using ipapi.co for more details (free tier reasonable for demo)
            // Fallback to ipify if rate limited or just use ipify for simple IP
            const res = await fetch("https://ipapi.co/json/");
            if (!res.ok) throw new Error("Failed to fetch IP data");
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            // Fallback to simple IP
            try {
                const res2 = await fetch("https://api.ipify.org?format=json");
                const json2 = await res2.json();
                setData({ ip: json2.ip });
            } catch (e) {
                setError("Could not retrieve IP address.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIp();
    }, []);

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <Button onClick={fetchIp} disabled={loading} size="lg" className="w-full max-w-xs">
                    <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                    {loading ? "Fetching..." : "Refresh IP Data"}
                </Button>
                {error && <p className="text-destructive">{error}</p>}
            </div>

            {data && (
                <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 border rounded-xl bg-card shadow-sm text-center">
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Your IP Address</div>
                        <div className="text-4xl font-bold text-primary break-all">{data.ip}</div>
                    </div>

                    {data.city && (
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="p-4 border rounded-lg bg-card flex items-start gap-3">
                                <MapPin className="text-primary mt-1" />
                                <div>
                                    <div className="text-sm text-muted-foreground">Location</div>
                                    <div className="font-semibold">{data.city}, {data.region}, {data.country}</div>
                                </div>
                            </div>
                            <div className="p-4 border rounded-lg bg-card flex items-start gap-3">
                                <Network className="text-primary mt-1" />
                                <div>
                                    <div className="text-sm text-muted-foreground">ISP / Org</div>
                                    <div className="font-semibold">{data.org}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
