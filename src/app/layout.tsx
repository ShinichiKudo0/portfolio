import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Noise } from "@/components/Noise";
import { CustomCursor } from "@/components/CustomCursor";
import { PerformanceProvider } from "@/performance/context";
import dynamic from "next/dynamic";

const CosmicBackground = dynamic(() => import("@/components/CosmicBackground").then(mod => mod.CosmicBackground));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mayank-mehra.vercel.app"),
  title: "Mayank Mehra | AI Systems Architect",
  description: "A showcase of my work and experience as an AI Systems Architect.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mayank Mehra | AI Systems Architect",
    description: "A showcase of my work and experience as an AI Systems Architect.",
    url: "https://mayank-mehra.vercel.app",
    siteName: "Mayank Mehra Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Mehra | AI Systems Architect",
    description: "A showcase of my work and experience as an AI Systems Architect.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://mayank-mehra.vercel.app/#webpage",
      "url": "https://mayank-mehra.vercel.app",
      "name": "Mayank Mehra | AI Systems Architect Portfolio",
      "about": {
        "@id": "https://mayank-mehra.vercel.app/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://mayank-mehra.vercel.app/#person",
      "name": "Mayank Mehra",
      "jobTitle": "AI Systems Architect",
      "url": "https://mayank-mehra.vercel.app",
      "worksFor": {
        "@type": "Organization",
        "name": "Rising Tides",
        "url": "https://risingtides.io/"
      }
    }
  ]
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-primary selection:text-primary-foreground bg-zinc-950 text-foreground relative">
        <PerformanceProvider>
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
        </PerformanceProvider>
      </body>
    </html>
  );
}
