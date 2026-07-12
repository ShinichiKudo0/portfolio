import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Noise } from "@/components/Noise";
import { CustomCursor } from "@/components/CustomCursor";
import { CosmicBackground } from "@/components/CosmicBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mayank Mehra | Systems Builder & AI Architect",
  description: "A showcase of my work and experience as an AI Systems Architect.",
  openGraph: {
    title: "Mayank Mehra | Systems Builder & AI Architect",
    description: "A showcase of my work and experience as an AI Systems Architect.",
    url: "https://mayankmehra.com", // Replace with the actual domain later
    siteName: "Mayank Mehra Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Mehra | Systems Builder & AI Architect",
    description: "A showcase of my work and experience as an AI Systems Architect.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-primary selection:text-primary-foreground bg-zinc-950 text-foreground relative">
        <SmoothScroll>
          <CustomCursor />
          <Noise />
          <CosmicBackground />
          <Navbar />
          <main className="flex-1 pt-[72px]">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
