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
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary">
                        Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
