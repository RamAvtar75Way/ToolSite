"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { Plus, Trash2, Check, X } from "lucide-react";

interface Habit {
    id: string;
    name: string;
    completedDates: string[]; // ISO date strings YYYY-MM-DD
}

export function HabitTracker() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [newHabit, setNewHabit] = useState("");

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem("habit-tracker-data");
        if (saved) {
            try {
                setHabits(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse habit data");
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem("habit-tracker-data", JSON.stringify(habits));
    }, [habits]);

    const addHabit = () => {
        if (!newHabit.trim()) return;
        const habit: Habit = {
            id: Date.now().toString(),
            name: newHabit,
            completedDates: []
        };
        setHabits([...habits, habit]);
        setNewHabit("");
    };

    const deleteHabit = (id: string) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    const toggleDate = (habitId: string, date: string) => {
        setHabits(habits.map(h => {
            if (h.id === habitId) {
                const isActive = h.completedDates.includes(date);
                return {
                    ...h,
                    completedDates: isActive
                        ? h.completedDates.filter(d => d !== date)
                        : [...h.completedDates, date]
                };
            }
            return h;
        }));
    };

    // Generate last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
            label: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
            iso: d.toISOString().split('T')[0]
        };
    });

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="flex gap-2">
                <Input
                    placeholder="New Habit (e.g. Read 10 pages)"
                    value={newHabit}
                    onChange={(e) => setNewHabit(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addHabit()}
                />
                <Button onClick={addHabit}>
                    <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
            </div>

            <div className="bg-card border rounded-xl overflow-hidden">
                <div className="grid grid-cols-[1fr_repeat(7,40px)_40px] gap-2 p-4 border-b bg-muted/40 items-center">
                    <div className="font-medium text-sm">Habit</div>
                    {days.map(d => (
                        <div key={d.iso} className="text-center text-xs text-muted-foreground font-medium" title={d.iso}>
                            {d.label}
                        </div>
                    ))}
                    <div></div>
                </div>

                <div className="divide-y">
                    {habits.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground text-sm">
                            No habits tracked yet. Add one above!
                        </div>
                    )}
                    {habits.map(habit => (
                        <div key={habit.id} className="grid grid-cols-[1fr_repeat(7,40px)_40px] gap-2 p-4 items-center hover:bg-muted/20 transition-colors">
                            <div className="font-medium truncate pr-4">{habit.name}</div>
                            {days.map(d => {
                                const isCompleted = habit.completedDates.includes(d.iso);
                                return (
                                    <button
                                        key={d.iso}
                                        onClick={() => toggleDate(habit.id, d.iso)}
                                        className={`
                                            w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-all
                                            ${isCompleted
                                                ? "bg-green-500 text-white"
                                                : "bg-secondary hover:bg-secondary/80 text-transparent hover:text-muted-foreground"}
                                        `}
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                )
                            })}
                            <div className="flex justify-end">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive opacity-50 hover:opacity-100" onClick={() => deleteHabit(habit.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
