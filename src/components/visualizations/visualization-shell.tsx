import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface VisualizationShellProps {
    category: string;
    title: string;
    description: string;
    children: ReactNode;
    timeline?: ReactNode;
    controls?: ReactNode;
    isFullscreen?: boolean;
    className?: string;
}

export function VisualizationShell({
    category,
    title,
    description,
    children,
    timeline,
    controls,
    isFullscreen = false,
    className,
}: VisualizationShellProps) {
    return (
        <section
            className={cn(
                "max-w-full min-w-0 overflow-hidden rounded-3xl border border-border bg-surface shadow-xl",
                isFullscreen && "flex h-full flex-col rounded-2xl",
                className,
            )}
        >
            <header
                className={cn(
                    "border-b border-border px-5 py-5 sm:px-7",
                    isFullscreen &&
                        "flex min-w-0 shrink-0 items-baseline gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5 [@media(max-height:500px)]:hidden",
                )}
            >
                <p
                    className={cn(
                        "text-sm font-bold text-brand",
                        isFullscreen && "hidden shrink-0 text-xs sm:block",
                    )}
                >
                    {category}
                </p>

                <h2
                    className={cn(
                        "mt-2 font-display text-2xl font-extrabold sm:text-3xl",
                        isFullscreen &&
                            "mt-0 truncate text-base sm:text-xl",
                    )}
                >
                    {title}
                </h2>

                <p
                    className={cn(
                        "mt-3 max-w-3xl leading-7 text-muted-foreground",
                        isFullscreen && "sr-only",
                    )}
                >
                    {description}
                </p>
            </header>

            {timeline && (
                <div
                    className={cn(
                        "border-b border-border bg-surface-muted px-5 py-4 sm:px-7",
                        isFullscreen &&
                            "shrink-0 px-2 py-1.5 sm:px-4 sm:py-2 [@media(max-height:500px)]:py-1",
                    )}
                >
                    {timeline}
                </div>
            )}

            <div
                className={cn(
                    isFullscreen && "min-h-0 flex-1 overflow-hidden",
                )}
            >
                {children}
            </div>

            {controls && (
                <footer
                    className={cn(
                        "border-t border-border bg-surface px-5 py-4 sm:px-7",
                        isFullscreen &&
                            "shrink-0 px-2 py-1.5 sm:px-4 sm:py-2 [@media(max-height:500px)]:py-1",
                    )}
                >
                    {controls}
                </footer>
            )}
        </section>
    );
}
