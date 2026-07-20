import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";

import { SkipLink } from "@/components/accessibility/skip-link";
import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/site-footer";
import { themeInitializationScript } from "@/lib/theme-initializer";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  applicationName: "CodeHealthyLearningCamp",
  title: {
    default: "CodeHealthyLearningCamp",
    template: "%s | CodeHealthyLearningCamp",
  },
  description:
    "Learn programming fundamentals, React, Spring Boot, Redis, Apache Kafka, SQL, NoSQL and object-oriented programming through interactive visual explanations.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          id="theme-favicon"
          rel="icon"
          type="image/svg+xml"
          sizes="any"
          href="/favicon-light.svg?v=2"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Script id="theme-initializer" strategy="beforeInteractive">
          {themeInitializationScript}
        </Script>

        <SkipLink />

        <div className="flex min-h-screen flex-col">
          <Header />

          <div className="flex-1">{children}</div>

          <SiteFooter />
        </div>
      </body>
    </html>
  );
}