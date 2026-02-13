import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Multi-Domain Tool Site",
    description: "Learn more about our mission to provide free, high-quality online tools.",
};

export default function AboutPage() {
    return (
        <div className="container py-12 md:py-24 mx-auto">
            <div className="mx-auto max-w-3xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center">About Us</h1>
                    <p className="text-xl text-foreground font-semibold">
                        Empowering developers, students, and creators with free, accessible tools.
                    </p>
                </div>

                <div className="prose dark:prose-invert mx-auto max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground pl-4">
                    <p>
                        Welcome to Multi-Domain Tool4You. We believe that simple, effective utilities should be accessible to everyone without paywalls or complicated sign-up processes.
                    </p>
                    <p>
                        Our mission is to build a comprehensive suite of tools that run directly in your browser. This means your data stays on your device, ensuring privacy and speed. Whether you need to format JSON, convert images, or check your IP address, we've got you covered.
                    </p>

                    <h3>Why Choose Us?</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Free Forever:</strong> No hidden costs or premium subscriptions.</li>
                        <li><strong>Privacy First:</strong> Most tools run client-side; we don't store your input data.</li>
                        <li><strong>Fast & Reliable:</strong> Built with modern web technologies for instant results.</li>
                        <li><strong>Open Source:</strong> We believe in transparency and community contribution.</li>
                    </ul>

                    <p>
                        We are constantly adding new tools and improving existing ones. If you have any suggestions or feedback, please feel free to reach out to us.
                    </p>
                </div>
            </div>
        </div>
    );
}
