import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    Braces,
    CheckCircle2,
    Play,
} from "lucide-react";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/buttons";
import {
    getAvailableVisualizationsByCategory,
    getVisualizationCategory,
} from "@/data/visualizations";

export const metadata: Metadata = {
    title: "Programming Fundamentals Visualizations",
    description:
        "Explore variables, decisions and loops through an ordered series of interactive programming visualizations.",
};

const categoryId = "programming-fundamentals";

export default function ProgrammingFundamentalsVisualizationsPage() {
    const category = getVisualizationCategory(categoryId);
    const categoryVisualizations =
        getAvailableVisualizationsByCategory(categoryId);

    if (!category || categoryVisualizations.length === 0) {
        return null;
    }

    const firstVisualization = categoryVisualizations[0];

    return (
        <main
            id="main-content"
            className="min-h-screen bg-background text-foreground"
        >
            <header className="relative overflow-hidden border-b border-border bg-surface">
                <div
                    aria-hidden="true"
                    className="absolute -top-44 right-0 size-[500px] rounded-full bg-brand-soft blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="absolute -bottom-52 -left-36 size-[440px] rounded-full bg-accent-soft blur-3xl"
                />

                <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-20">
                    <Breadcrumbs
                        items={[
                            {
                                label: "Visualizations",
                                href: "/visualizations",
                            },
                            {
                                label: category.title,
                            },
                        ]}
                    />

                    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div className="min-w-0">
                            <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand shadow-sm">
                                <Braces aria-hidden="true" className="size-7" />
                            </span>

                            <p className="mt-7 font-bold text-brand">
                                Visualization category
                            </p>

                            <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Programming Fundamentals{" "}
                                <span className="block text-brand sm:inline">
                                    Visualized
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                                Build a reliable mental model of how programs store
                                values, choose branches, repeat instructions and run
                                reusable functions. Follow the labs in order or open the
                                concept you need.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <CheckCircle2
                                        aria-hidden="true"
                                        className="size-4 text-success"
                                    />
                                    {categoryVisualizations.length} interactive labs
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Play
                                        aria-hidden="true"
                                        className="size-4 text-brand"
                                    />
                                    Guided step-by-step playback
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                            {firstVisualization.href && (
                                <ButtonLink
                                    href={firstVisualization.href}
                                    size="lg"
                                    className="w-full sm:w-auto"
                                >
                                    Start first visualization
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                </ButtonLink>
                            )}
                            {category.learningPathHref && (
                                <ButtonLink
                                    href={category.learningPathHref}
                                    variant="secondary"
                                    className="w-full sm:w-auto"
                                >
                                    <BookOpen
                                        aria-hidden="true"
                                        className="size-4"
                                    />
                                    Open complete lessons
                                </ButtonLink>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
                <div className="max-w-3xl">
                    <p className="font-bold text-brand">Category sequence</p>
                    <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Build understanding in the right order
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Each visualization introduces a mental model used by the next.
                        The sequence keeps the learning path clear while still letting
                        you revisit any lab directly.
                    </p>
                </div>

                <ol className="mt-10 space-y-5">
                    {categoryVisualizations.map((visualization, index) => {
                        const VisualizationIcon = visualization.icon;

                        return (
                            <li key={visualization.id} className="relative">
                                {index < categoryVisualizations.length - 1 && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute left-7 top-full hidden h-5 w-px bg-border sm:block"
                                    />
                                )}

                                <article className="group overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
                                    <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-7">
                                        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft font-display text-lg font-extrabold text-brand">
                                            {index + 1}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="flex size-9 items-center justify-center rounded-xl bg-surface-muted text-brand">
                                                    <VisualizationIcon
                                                        aria-hidden="true"
                                                        className="size-4"
                                                    />
                                                </span>
                                                <Badge variant="success">
                                                    Available
                                                </Badge>
                                            </div>

                                            <h3 className="mt-4 font-display text-xl font-bold sm:text-2xl">
                                                {visualization.title}
                                            </h3>
                                            <p className="mt-3 leading-7 text-muted-foreground">
                                                {visualization.description}
                                            </p>
                                        </div>

                                        {visualization.href && (
                                            <Link
                                                href={visualization.href}
                                                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 font-bold text-brand transition hover:bg-brand-soft hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                            >
                                                Open lab
                                                <ArrowRight
                                                    aria-hidden="true"
                                                    className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                                                />
                                            </Link>
                                        )}
                                    </div>
                                </article>
                            </li>
                        );
                    })}
                </ol>
            </section>
        </main>
    );
}
