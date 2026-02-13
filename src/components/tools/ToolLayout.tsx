import { ToolConfig } from "@/data/tools";
import { cn } from "@/lib/utils";

interface ToolLayoutProps {
    tool: ToolConfig;
    children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
    return (
        <div className="container py-10">
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {tool.name}
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        {tool.description}
                    </p>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
                    {children}
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">How to use</h2>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Enter your input in the field above.</li>
                            <li>The tool will automatically process your data.</li>
                            <li>Copy the result or download it if available.</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">About this tool</h2>
                        <p className="text-muted-foreground">
                            This {tool.name.toLowerCase()} is free to use and runs entirely in your browser.
                            We do not store any of your data.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
