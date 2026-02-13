import Link from "next/link";
import { categories } from "@/data/tools";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="container py-8 md:py-12 lg:py-24 mx-auto">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center px-20">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          All the tools you need <br className="hidden sm:inline" />
          in one place.
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          More than 40 free tools for text, images, development, SEO, and more.
          Use them instantly, no signup required.
        </p>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Link
            href="/tools"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Browse Tools
          </Link>
          <Link
            href="/categories"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            View Categories
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md"
          >
            <div className="flex flex-col justify-between rounded-md p-6 h-full space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <div className="flex items-center text-sm text-primary font-medium">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
