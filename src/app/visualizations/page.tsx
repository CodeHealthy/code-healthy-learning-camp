import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers3, Workflow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/buttons";
import { ContentCard } from "@/components/ui/content-card";
import {
    getVisualizationsByCategory,
    visualizationCategories,
} from "@/data/visualizations";

export const metadata: Metadata = {
    title: "Interactive Visualizations",
    description:
        "Explore visual demonstrations of programming, React, Redis, Kafka, SQL, backend architecture and other development concepts.",
};

export default function VisualizationsPage() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-background text-foreground"
        >
            <section className="relative overflow-hidden border-b border-border bg-surface">
                <div
                    aria-hidden="true"
                    className="absolute -top-44 right-0 size-[520px] rounded-full bg-brand-soft blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="absolute -bottom-56 -left-40 size-[460px] rounded-full bg-accent-soft blur-3xl"
                />

                <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
                    <Badge variant="brand" icon={Workflow}>
                        Interactive learning
                    </Badge>

                    <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Understand technology by{" "}
                        <span className="text-brand">watching it work.</span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                        Choose a subject, then work through its visualizations in a
                        clear learning order. Every lab reveals how a concept behaves
                        internally, one meaningful step at a time.
                    </p>

                    <div className="mt-9">
                        <ButtonLink
                            href="/visualizations/programming-fundamentals"
                            size="lg"
                        >
                            Explore Programming Fundamentals
                            <ArrowRight aria-hidden="true" className="size-5" />
                        </ButtonLink>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
                <div className="max-w-3xl">
                    <p className="font-bold text-brand">Visualization library</p>

                    <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Explore by category
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-muted-foreground">
                        Start with an available category or preview the subjects being
                        prepared next. Labs inside each category follow a deliberate
                        sequence, so the next concept is always easy to find.
                    </p>
                </div>

                <nav
                    aria-label="Visualization categories"
                    className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {visualizationCategories.map((category) => {
                        const CategoryIcon = category.icon;
                        const categoryVisualizations =
                            getVisualizationsByCategory(category.id);
                        const availableCount = categoryVisualizations.filter(
                            (visualization) => visualization.available,
                        ).length;

                        return (
                            <Link
                                key={category.id}
                                href={category.href ?? `#${category.id}`}
                                className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-none"
                            >
                                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                    <CategoryIcon
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                </span>
                                <span className="mt-4 block font-display font-bold text-foreground">
                                    {category.title}
                                </span>
                                <span className="mt-1 block text-sm text-muted-foreground">
                                    {availableCount > 0
                                        ? `${availableCount} available`
                                        : "Coming soon"}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </section>

            <div className="border-t border-border bg-surface-muted/40">
                {visualizationCategories.map((category, categoryIndex) => {
                    const CategoryIcon = category.icon;
                    const categoryVisualizations = getVisualizationsByCategory(
                        category.id,
                    );
                    const availableCount = categoryVisualizations.filter(
                        (visualization) => visualization.available,
                    ).length;

                    return (
                        <section
                            id={category.id}
                            key={category.id}
                            className={`scroll-mt-24 ${
                                categoryIndex > 0 ? "border-t border-border" : ""
                            }`}
                        >
                            <div className="mx-auto max-w-7xl px-6 py-14 lg:py-18">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                                    <div className="max-w-3xl">
                                        <div className="flex items-center gap-3">
                                            <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                                                <CategoryIcon
                                                    aria-hidden="true"
                                                    className="size-5"
                                                />
                                            </span>
                                            <Badge
                                                variant={
                                                    availableCount > 0
                                                        ? "success"
                                                        : "neutral"
                                                }
                                            >
                                                {availableCount > 0
                                                    ? `${availableCount} visualizations available`
                                                    : "Category in development"}
                                            </Badge>
                                        </div>

                                        <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                                            {category.title}
                                        </h2>
                                        <p className="mt-3 leading-7 text-muted-foreground">
                                            {category.description}
                                        </p>
                                    </div>

                                    {category.href && (
                                        <ButtonLink
                                            href={category.href}
                                            variant="secondary"
                                        >
                                            View category
                                            <ArrowRight
                                                aria-hidden="true"
                                                className="size-4"
                                            />
                                        </ButtonLink>
                                    )}
                                </div>

                                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {categoryVisualizations.map(
                                        (visualization, visualizationIndex) => {
                                            const VisualizationIcon = visualization.icon;

                                            return (
                                                <ContentCard
                                                    key={visualization.id}
                                                    icon={VisualizationIcon}
                                                    eyebrow={
                                                        visualization.available
                                                            ? `Visualization ${visualizationIndex + 1} of ${categoryVisualizations.length}`
                                                            : "Planned visualization"
                                                    }
                                                    title={visualization.title}
                                                    description={visualization.description}
                                                    className="flex h-full flex-col"
                                                    footer={
                                                        visualization.available &&
                                                        visualization.href ? (
                                                            <div className="flex items-center justify-between gap-4">
                                                                <Badge variant="success">
                                                                    Available
                                                                </Badge>
                                                                <ButtonLink
                                                                    href={visualization.href}
                                                                    variant="ghost"
                                                                    size="sm"
                                                                >
                                                                    Open lab
                                                                    <ArrowRight
                                                                        aria-hidden="true"
                                                                        className="size-4"
                                                                    />
                                                                </ButtonLink>
                                                            </div>
                                                        ) : (
                                                            <Badge variant="neutral">
                                                                Coming soon
                                                            </Badge>
                                                        )
                                                    }
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            <section className="border-t border-border bg-surface">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="font-display text-lg font-bold">
                            Prefer complete guided lessons?
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Visual labs connect directly to their matching learning path.
                        </p>
                    </div>
                    <ButtonLink href="/learn" variant="secondary">
                        <Layers3 aria-hidden="true" className="size-4" />
                        Browse learning paths
                    </ButtonLink>
                </div>
            </section>
        </main>
    );
}
