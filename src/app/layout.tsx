import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "CodeHealthyLearningCamp",
    template: "%s | CodeHealthyLearningCamp",
  },
  description:
    "Learn programming fundamentals, React, Spring Boot, Redis, Apache Kafka, SQL, NoSQL, and object-oriented programming through interactive visual explanations.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}