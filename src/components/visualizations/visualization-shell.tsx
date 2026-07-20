import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface VisualizationShellProps {
    category: string;
    title: string;
    description: string;
    children: ReactNode;
    timeline?: ReactNode;
    controls?: ReactNode;
    className?: string;
}

export function VisualizationShell({
    category,
    title,
    description,
    children,
    timeline,
    controls,
    className,
}: VisualizationShellProps) {
    return (
        <section
            className={cn(
                "overflow-hidden rounded-3xl border border-border bg-surface shadow-xl",
                className,
            )}
        >
            <header className="border-b border-border px-5 py-5 sm:px-7">
                <p className="text-sm font-bold text-brand">{category}</p>

                <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                    {title}
                </h2>

                <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                    {description}
                </p>
            </header>

            {timeline && (
                <div className="border-b border-border bg-surface-muted px-5 py-4 sm:px-7">
                    {timeline}
                </div>
            )}

            <div>{children}</div>

            {controls && (
                <footer className="border-t border-border bg-surface px-5 py-4 sm:px-7">
                    {controls}
                </footer>
            )}
        </section>
    );
}