"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { navigationItems } from "@/data/navigation";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavigation() {
  const menuId = useId();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition hover:bg-surface-muted"
      >
        {isOpen ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.18,
              }}
              className="fixed inset-0 top-[65px] z-40 bg-black/40 backdrop-blur-sm"
            />

            <motion.nav
              id={menuId}
              aria-label="Mobile navigation"
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : -12,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
              }}
              className="fixed inset-x-4 top-20 z-50 overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-2xl"
            >
              <ul className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = isActivePath(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        className={`block rounded-xl px-4 py-3 font-semibold transition ${
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

              <Link
                href="/learn"
                onClick={closeMenu}
                className="mt-3 flex items-center justify-center rounded-xl bg-brand px-4 py-3 font-bold text-white transition hover:bg-brand-strong"
              >
                Start learning
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}