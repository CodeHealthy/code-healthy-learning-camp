import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";

const learningLinks = [
  {
    label: "Programming Fundamentals",
    href: "/learn/programming-fundamentals",
  },
  {
    label: "React",
    href: "/learn/react",
  },
  {
    label: "Spring Boot",
    href: "/learn/spring-boot",
  },
  {
    label: "Apache Kafka",
    href: "/learn/apache-kafka",
  },
];

const platformLinks = [
  {
    label: "Learning Paths",
    href: "/learn",
  },
  {
    label: "Visualizations",
    href: "/visualizations",
  },
  {
    label: "About",
    href: "/about",
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg"
            >
              <BrandMark className="size-11" />

              <span className="font-display text-lg font-extrabold">
                CodeHealthy
                <span className="text-brand">LearningCamp</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              Complex development concepts explained through clear lessons,
              practical examples and interactive visualizations.
            </p>

            <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              Built for developers who enjoy learning
              <Heart
                aria-hidden="true"
                className="size-4 fill-current text-danger"
              />
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-foreground">
              Learning
            </h2>

            <ul className="mt-5 space-y-3">
              {learningLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-brand"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-foreground">
              Platform
            </h2>

            <ul className="mt-5 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CodeHealthyLearningCamp.
          </p>

          <p>Learn simply. Visualize clearly. Practise confidently.</p>
        </div>
      </div>
    </footer>
  );
}