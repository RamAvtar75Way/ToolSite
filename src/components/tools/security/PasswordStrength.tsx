"use client";

import { useState } from "react";
import { Button, Input, Label, Progress } from "@/components/ui";
import { Eye, EyeOff } from "lucide-react";

export function PasswordStrength() {
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const calculateStrength = (pwd: string) => {
        let score = 0;
        if (!pwd) return 0;
        if (pwd.length > 8) score += 20;
        if (pwd.length > 12) score += 20;
        if (/[A-Z]/.test(pwd)) score += 20;
        if (/[a-z]/.test(pwd)) score += 10; // Lowercase is common
        if (/[0-9]/.test(pwd)) score += 15;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 15;
        return Math.min(100, score);
    };

    const strength = calculateStrength(password);

    const getColor = (s: number) => {
        if (s < 30) return "bg-destructive";
        if (s < 60) return "bg-yellow-500";
        if (s < 80) return "bg-blue-500";
        return "bg-green-500";
    };

    const getLabel = (s: number) => {
        if (s < 30) return "Weak";
        if (s < 60) return "Fair";
        if (s < 80) return "Good";
        return "Strong";
    };

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="relative">
                <Input
                    type={visible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type a password..."
                    className="pr-10 text-lg py-6"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1"
                    onClick={() => setVisible(!visible)}
                >
                    {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>

            {password && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center">
                        <Label className="text-lg font-medium">{getLabel(strength)}</Label>
                        <span className="text-sm text-muted-foreground">{strength}%</span>
                    </div>
                    <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${getColor(strength)}`}
                            style={{ width: `${strength}%` }}
                        />
                    </div>

                    <ul className="grid gap-2 text-sm text-muted-foreground mt-4">
                        <li className={password.length > 8 ? "text-green-500" : ""}>• At least 8 characters</li>
                        <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>• Uppercase letters</li>
                        <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>• Numbers</li>
                        <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""}>• Special characters</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
