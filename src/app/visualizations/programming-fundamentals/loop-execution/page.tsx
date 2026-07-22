import type { Metadata } from "next";
import { BookOpen, Repeat2 } from "lucide-react";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { VisualizationSequenceNavigation } from "@/components/navigation/visualization-sequence-navigation";
import { ButtonLink } from "@/components/ui/buttons";
import { LoopExecutionLab } from "@/components/visualizations/loop-execution/loop-execution-lab";

export const metadata: Metadata = {
    title: "Loop Execution Timeline Visualization",
    description:
        "Trace JavaScript loop initialization, condition checks, body execution, counter updates and the final stopping condition.",
};

export default function LoopExecutionVisualizationPage() {
    return (
        <main id="main-content" className="min-h-screen bg-background text-foreground">
            <header className="relative overflow-hidden border-b border-border bg-surface">
                <div aria-hidden="true" className="absolute -top-44 right-0 size-[500px] rounded-full bg-brand-soft blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-16">
                    <Breadcrumbs
                        items={[
                            { label: "Visualizations", href: "/visualizations" },
                            {
                                label: "Programming Fundamentals",
                                href: "/visualizations/programming-fundamentals",
                            },
                            { label: "Loop Execution" },
                        ]}
                    />

                    <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                                <Repeat2 aria-hidden="true" className="size-7" />
                            </span>
                            <p className="mt-6 font-bold text-brand">Interactive animation laboratory</p>
                            <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Loop Execution <span className="text-brand">Timeline</span>
                            </h1>
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                                Follow every action in a counted loop, including the final condition check that prevents one extra iteration.
                            </p>
                        </div>

                        <ButtonLink href="/learn/programming-fundamentals/loops" variant="secondary">
                            <BookOpen aria-hidden="true" className="size-5" />
                            Read the complete lesson
                        </ButtonLink>
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
                <LoopExecutionLab />
                <VisualizationSequenceNavigation currentVisualizationId="loop-execution" />
            </section>
        </main>
    );
}
