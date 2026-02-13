import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Multi-Domain Tool Site",
    description: "Read our privacy policy to understand how we handle your data.",
};

export default function PrivacyPage() {
    return (
        <div className="container py-12 md:py-24 mx-auto">
            <div className="mx-auto max-w-3xl space-y-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose dark:prose-invert mx-auto max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to Multi-Domain Tool Site. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h2>2. Data We Collect</h2>
                    <p>
                        Most of the tools on our website operate entirely on the client-side (in your browser). This means that for tools like calculators, converters, and generators, the data you input is processed locally on your device and is not sent to our servers.
                    </p>
                    <p>
                        However, we may collect standard internet log information and details of visitor behavior patterns. This information is collected in a way that does not identify anyone.
                    </p>

                    <h2>3. Cookies</h2>
                    <p>
                        We use cookies to improve your experience on our site. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
                    </p>

                    <h2>4. Third-Party Links</h2>
                    <p>
                        This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                    </p>

                    <h2>5. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at support@toolsite.com.
                    </p>
                </div>
            </div>
        </div>
    );
}
