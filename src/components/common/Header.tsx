"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useTheme } from "next-themes"; // Used for dynamic logo switching based on theme
import { ModeToggle } from "@/components/mode-toggle";

function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");

    useEffect(() => {
        setQuery(searchParams.get("q") || "");
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push("/tools");
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
                type="search"
                placeholder="Search tools..."
                className="h-9 w-full rounded-md border border-input bg-background px-9 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-[200px] lg:w-[300px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
}

export function Header() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = mounted && resolvedTheme === "dark" ? "/logowhite.png" : "/logo.png";

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className="container flex h-14 items-center mx-auto">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Image
                            key={logoSrc}
                            src={logoSrc}
                            alt="Tool4You Logo"
                            width={180}
                            height={180}
                            className="rounded-sm"
                            priority
                        />
                        {/* <span className="hidden font-bold sm:inline-block">Tool4You</span> */}
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/tools"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            All Tools
                        </Link>
                        <Link
                            href="/categories"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Categories
                        </Link>
                        <Link
                            href="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            About
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none flex items-center gap-2">
                        <Suspense fallback={<div className="w-[200px] lg:w-[300px] h-9 bg-muted rounded-md" />}>
                            <SearchBar />
                        </Suspense>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
