"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export function DailyPlanner() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("daily-planner-tasks");
        if (saved) {
            try {
                setTasks(JSON.parse(saved));
            } catch (e) { console.error("Failed to load tasks"); }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("daily-planner-tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
        setNewTask("");
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="flex gap-2">
                <Input
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                />
                <Button onClick={addTask}>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <div className="space-y-2">
                {tasks.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
                        No tasks for today. Time to plan!
                    </div>
                )}

                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`
                            group flex items-center gap-3 p-3 bg-card border rounded-lg transition-all
                            ${task.completed ? "opacity-60 bg-muted" : "shadow-sm hover:shadow-md"}
                        `}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-5 h-5 rounded border-primary text-primary focus:ring-primary cursor-pointer"
                        />

                        <span className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {task.text}
                        </span>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {tasks.length > 0 && (
                <div className="flex justify-between text-sm text-muted-foreground px-1">
                    <span>{tasks.filter(t => t.completed).length} completed</span>
                    <button onClick={() => setTasks(tasks.filter(t => !t.completed))} className="hover:text-destructive">
                        Clear Completed
                    </button>
                </div>
            )}
        </div>
    );
}
