import Link from "next/link";
import { GraduationCap } from "lucide-react";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Learning Paths", href: "/learn" },
  { label: "Visualizations", href: "/visualizations" },
  { label: "About", href: "/about" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-slate-950"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <GraduationCap aria-hidden="true" className="size-6" />
          </span>

          <span>CodeHealthyLearningCamp</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/learn"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Start learning
        </Link>
      </div>
    </header>
  );
}