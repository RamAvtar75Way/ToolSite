import { tools } from "@/data/tools";
import { ToolCard } from "@/components/tools/ToolCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Tools - Tool4You",
    description: "Browse our collection of free online tools.",
};

export default async function ToolsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    const query = q?.toLowerCase() || "";

    const filteredTools = tools.filter((tool) => {
        return (
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query) ||
            tool.category.toLowerCase().includes(query)
        );
    });

    return (
        <div className="container py-10 mx-auto">
            <div className="flex flex-col items-center gap-4 text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">
                    {query ? `Search Results for "${q}"` : "All Tools"}
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    {query
                        ? `Found ${filteredTools.length} tool${filteredTools.length === 1 ? "" : "s"} matching your search.`
                        : `Browse our complete collection of ${tools.length} tools.`
                    }
                </p>
            </div>

            {filteredTools.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredTools.map((tool) => (
                        <ToolCard key={tool.slug} tool={tool} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">No tools found matching "{q}".</p>
                    <p className="mt-2 text-muted-foreground">Try adjusting your search terms.</p>
                </div>
            )}
        </div>
    );
}
