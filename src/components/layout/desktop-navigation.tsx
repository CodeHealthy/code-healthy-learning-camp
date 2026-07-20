"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/data/navigation";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden lg:block">
      <ul className="flex items-center gap-2">
        {navigationItems.map((item) => {
          const isActive = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand-soft text-brand-strong"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}