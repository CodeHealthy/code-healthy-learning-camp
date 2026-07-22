import Link from "next/link";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

import { getVisualizationSequence } from "@/data/visualizations";
import { cn } from "@/lib/utils";

interface VisualizationSequenceNavigationProps {
    currentVisualizationId: string;
}

export function VisualizationSequenceNavigation({
    currentVisualizationId,
}: VisualizationSequenceNavigationProps) {
    const sequence = getVisualizationSequence(currentVisualizationId);

    if (!sequence) {
        return null;
    }

    const { category, currentIndex, total, previous, next } = sequence;

    return (
        <nav
            aria-label={`${category.title} visualization navigation`}
            className="mt-10 border-t border-border pt-8"
        >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-muted-foreground">
                    Visualization {currentIndex + 1} of {total}
                </p>

                {category.href && (
                    <Link
                        href={category.href}
                        className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-brand transition hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        <LayoutGrid aria-hidden="true" className="size-4" />
                        View category
                    </Link>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <SequenceLink
                    direction="previous"
                    href={previous?.href}
                    title={previous?.title}
                />
                <SequenceLink
                    direction="next"
                    href={next?.href}
                    title={next?.title}
                />
            </div>
        </nav>
    );
}

interface SequenceLinkProps {
    direction: "previous" | "next";
    href?: string;
    title?: string;
}

function SequenceLink({ direction, href, title }: SequenceLinkProps) {
    const isNext = direction === "next";
    const label = isNext ? "Next visualization" : "Previous visualization";

    if (!href || !title) {
        return (
            <div
                aria-disabled="true"
                className={cn(
                    "flex min-h-28 items-center gap-4 rounded-2xl border border-dashed border-border bg-surface-muted px-5 py-4 opacity-70",
                    isNext && "sm:justify-end sm:text-right",
                )}
            >
                {!isNext && <ArrowLeft aria-hidden="true" className="size-5 shrink-0" />}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {label}
                    </p>
                    <p className="mt-1 font-display font-bold text-muted-foreground">
                        {isNext ? "End of this category" : "Start of this category"}
                    </p>
                </div>
                {isNext && <ArrowRight aria-hidden="true" className="size-5 shrink-0" />}
            </div>
        );
    }

    return (
        <Link
            href={href}
            className={cn(
                "group flex min-h-28 items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm transition",
                "hover:-translate-y-0.5 hover:border-brand hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "motion-reduce:transform-none motion-reduce:transition-none",
                isNext && "sm:justify-end sm:text-right",
            )}
        >
            {!isNext && (
                <ArrowLeft
                    aria-hidden="true"
                    className="size-5 shrink-0 text-brand transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
                />
            )}
            <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand">
                    {label}
                </p>
                <p className="mt-1 font-display font-bold text-foreground">
                    {title}
                </p>
            </div>
            {isNext && (
                <ArrowRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                />
            )}
        </Link>
    );
}
