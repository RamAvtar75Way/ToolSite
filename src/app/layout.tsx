import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Tool4You",
    template: "%s | Tool4You",
  },
  description: "Tool4You - A collection of 40+ free online tools for developers, students, and more. No ads, no tracking, just tools.",
  keywords: ["online tools", "developer tools", "text tools", "image tools", "calculators", "free tools"],
  authors: [{ name: "Tool4You Team" }],
  creator: "Tool4You Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tool4you.com",
    title: "Tool4You",
    description: "Tool4You - A collection of 40+ free online tools for developers, students, and more.",
    siteName: "Tool4You",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tool4You",
    description: "Tool4You - A collection of 40+ free online tools for developers, students, and more.",
    creator: "@tool4you",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
