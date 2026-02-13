import Link from "next/link";
import { ToolConfig } from "@/data/tools";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
    tool: ToolConfig;
}

export function ToolCard({ tool }: ToolCardProps) {
    return (
        <Link href={`/tools/${tool.slug}`} className="block h-full transition-all hover:shadow-md">
            <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary mt-auto">
                        Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
