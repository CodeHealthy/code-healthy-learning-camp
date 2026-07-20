import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";


import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const themeInitializationScript = `
(function () {
  try {
    var storageKey = "codehealthy-theme";
    var storedTheme = window.localStorage.getItem(storageKey);

    var theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : "system";

    var isDark =
      theme === "dark" ||
      (
        theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );

    var root = document.documentElement;

    root.dataset.theme = theme;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  } catch (error) {
    document.documentElement.dataset.theme = "system";
  }
})();
`;

export const metadata: Metadata = {
  applicationName: "CodeHealthyLearningCamp",
  title: {
    default: "CodeHealthyLearningCamp",
    template: "%s | CodeHealthyLearningCamp",
  },
  description:
    "Learn programming fundamentals, React, Spring Boot, Redis, Apache Kafka, SQL, NoSQL and object-oriented programming through interactive visual explanations.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}

        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
        >
          {themeInitializationScript}
        </Script>
      </body>
    </html>
  );
}