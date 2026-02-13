import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - Multi-Domain Tool Site",
    description: "Read our terms of service regarding the use of our tools.",
};

export default function TermsPage() {
    return (
        <div className="container py-12 md:py-24 mx-auto">
            <div className="mx-auto max-w-3xl space-y-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Terms of Service</h1>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose dark:prose-invert mx-auto max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.
                    </p>

                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Multi-Domain Tool Site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                    </p>

                    <h2>3. Disclaimer</h2>
                    <p>
                        The tools and materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                    <p>
                        Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                    </p>

                    <h2>4. Limitations</h2>
                    <p>
                        In no event shall Multi-Domain Tool Site or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
                    </p>

                    <h2>5. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </div>
            </div>
        </div>
    );
}
