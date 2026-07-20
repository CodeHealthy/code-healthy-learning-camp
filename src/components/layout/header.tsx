import Link from "next/link";

import { BrandMark } from "@/components/brand/brand-mark";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="CodeHealthyLearningCamp homepage"
          className="flex min-w-0 items-center gap-3 rounded-lg"
        >
          <BrandMark className="size-10 shrink-0" />

          <span className="hidden truncate font-display text-base font-extrabold tracking-tight text-foreground sm:inline">
            CodeHealthy
            <span className="text-brand">LearningCamp</span>
          </span>
        </Link>

        <DesktopNavigation />

        <div className="flex items-center gap-2">
          <ThemeSwitcher />

          <Link
            href="/learn"
            className="hidden rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-md md:inline-flex"
          >
            Start learning
          </Link>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}