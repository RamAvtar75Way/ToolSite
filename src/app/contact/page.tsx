import { Metadata } from "next";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us - Multi-Domain Tool Site",
    description: "Get in touch with us for feedback, support, or suggestions.",
};

export default function ContactPage() {
    return (
        <div className="container py-12 md:py-24 mx-auto">
            <div className="mx-auto max-w-5xl">
                <div className="mb-12 text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Have a question, suggestion, or found a bug? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Get in Touch</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Email</div>
                                        <div className="text-muted-foreground">support@toolsite.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Location</div>
                                        <div className="text-muted-foreground">San Francisco, CA</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h3 className="font-semibold mb-2">FAQ</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Check our Frequently Asked Questions for quick answers to common queries.
                            </p>
                            <Button variant="outline" className="w-full">Visit FAQ</Button>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-8 shadow-sm">
                        <form className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="john@example.com" type="email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="Feedback about..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
                            </div>
                            <Button type="submit" className="w-full" size="lg">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
