"use client";

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Plus, Trash2 } from "lucide-react";

interface Course {
    id: number;
    name: string;
    grade: string;
    credits: string;
}

const GRADE_POINTS: Record<string, number> = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0
};

export function GpaCalculator() {
    const [courses, setCourses] = useState<Course[]>([{ id: 1, name: "", grade: "A", credits: "3" }]);
    const [gpa, setGpa] = useState<string | null>(null);

    const addCourse = () => {
        setCourses([...courses, { id: Date.now(), name: "", grade: "A", credits: "3" }]);
    };

    const removeCourse = (id: number) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id: number, field: keyof Course, value: string) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const calculate = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(c => {
            const credits = parseFloat(c.credits);
            const points = GRADE_POINTS[c.grade];
            if (!isNaN(credits) && points !== undefined) {
                totalPoints += points * credits;
                totalCredits += credits;
            }
        });

        if (totalCredits > 0) {
            setGpa((totalPoints / totalCredits).toFixed(2));
        }
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="space-y-4">
                {courses.map((course, index) => (
                    <div key={course.id} className="flex gap-2 items-end">
                        <div className="flex-1 space-y-1">
                            <Label className={index === 0 ? "" : "sr-only"}>Course Name</Label>
                            <Input
                                value={course.name}
                                onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                                placeholder={`Course #${index + 1}`}
                            />
                        </div>
                        <div className="w-24 space-y-1">
                            <Label className={index === 0 ? "" : "sr-only"}>Grade</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={course.grade}
                                onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                            >
                                {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        <div className="w-24 space-y-1">
                            <Label className={index === 0 ? "" : "sr-only"}>Credits</Label>
                            <Input
                                type="number"
                                value={course.credits}
                                onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                            />
                        </div>
                        <Button size="icon" variant="ghost" className="mb-1" onClick={() => removeCourse(course.id)} disabled={courses.length === 1}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <Button onClick={addCourse} variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Course
                </Button>
                <Button onClick={calculate} className="w-full">Calculate GPA</Button>
            </div>

            {gpa && (
                <div className="p-6 border rounded-xl bg-card shadow-sm text-center animate-in fade-in slide-in-from-bottom-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Your GPA</h3>
                    <div className="text-5xl font-bold text-primary mb-2">{gpa}</div>
                    <p className="text-sm text-muted-foreground">Based on 4.0 scale</p>
                </div>
            )}
        </div>
    );
}
