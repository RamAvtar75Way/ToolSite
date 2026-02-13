import { tools, categories } from "@/data/tools";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/tools/ToolCard";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const category = categories.find((c) => c.id === id);

    if (!category) {
        return {
            title: "Category Not Found",
        };
    }

    return {
        title: `${category.name} - Free Online Tools`,
        description: category.description,
    };
}

export async function generateStaticParams() {
    return categories.map((category) => ({
        id: category.id,
    }));
}

export default async function CategoryPage({ params }: PageProps) {
    const { id } = await params;
    const category = categories.find((c) => c.id === id);

    if (!category) {
        notFound();
    }

    const categoryTools = tools.filter((t) => t.category === id);

    return (
        <div className="container py-10 mx-auto">
            <div className="flex flex-col items-center gap-4 text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">{category.name}</h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    {category.description}
                </p>
            </div>

            {categoryTools.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryTools.map((tool) => (
                        <ToolCard key={tool.slug} tool={tool} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground">No tools found in this category yet.</p>
            )}
        </div>
    );
}
