"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui"
// We need a DropdownMenu here but I might not have it installed or set up.
// To keep it simple for now and avoid dependency hell if Dropdown isn't ready,
// I'll implementation a simple toggle button that cycles: Light -> Dark -> System or just Light <-> Dark.
// Actually receiving "all UI became dark" suggests they might just want to toggle it back.
// Let's implement a simple cycle button first. 

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
