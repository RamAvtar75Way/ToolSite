import { tools } from "@/data/tools";
import { ToolCard } from "@/components/tools/ToolCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Tools - Multi-Domain Tool Site",
    description: "Browse our collection of free online tools.",
};

export default function ToolsPage() {
    return (
        <div className="container py-10">
            <div className="flex flex-col items-center gap-4 text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">All Tools</h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    Browse our complete collection of {tools.length} tools.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                ))}
            </div>
        </div>
    );
}
