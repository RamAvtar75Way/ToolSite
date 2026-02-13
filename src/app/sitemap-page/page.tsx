import Link from "next/link";
import { categories, tools } from "@/data/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sitemap - All Tools and Categories",
    description: "Complete list of all tools and categories available on the site.",
};

export default function SitemapPage() {
    return (
        <div className="container py-10 mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl mb-6 text-center">Sitemap</h1>
            <p className="text-muted-foreground text-center mb-10">
                A complete overview of all our available tools and resources.
            </p>

            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Pages</h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <li><Link href="/" className="hover:underline text-primary">Home</Link></li>
                        <li><Link href="/about" className="hover:underline text-primary">About Us</Link></li>
                        <li><Link href="/contact" className="hover:underline text-primary">Contact</Link></li>
                        <li><Link href="/privacy" className="hover:underline text-primary">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:underline text-primary">Terms of Service</Link></li>
                        <li><Link href="/categories" className="hover:underline text-primary">Categories</Link></li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Tools by Category</h2>
                    <div className="space-y-8">
                        {categories.map((category) => {
                            const categoryTools = tools.filter(t => t.category === category.id);
                            if (categoryTools.length === 0) return null;

                            return (
                                <div key={category.id} className="space-y-4">
                                    <h3 className="text-xl font-semibold flex items-center gap-2">
                                        <Link href={`/categories/${category.id}`} className="hover:underline">
                                            {category.name}
                                        </Link>
                                        <span className="text-sm font-normal text-muted-foreground">({categoryTools.length})</span>
                                    </h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                                        {categoryTools.map((tool) => (
                                            <li key={tool.slug}>
                                                <Link
                                                    href={`/tools/${tool.slug}`}
                                                    className="text-muted-foreground hover:text-primary transition-colors hover:underline block truncate"
                                                    title={tool.name}
                                                >
                                                    {tool.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}
