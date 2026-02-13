import { categories } from "@/data/tools";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categories - Multi-Domain Tool Site",
    description: "Browse tools by category.",
};

export default function CategoriesPage() {
    return (
        <div className="container py-10 mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl mb-10 text-center">Tool Categories</h1>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <Link key={category.id} href={`/categories/${category.id}`} className="transition-all hover:shadow-lg">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>{category.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{category.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
