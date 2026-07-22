import type { Metadata } from "next";
import { BookOpen, Braces } from "lucide-react";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { VisualizationSequenceNavigation } from "@/components/navigation/visualization-sequence-navigation";
import { ButtonLink } from "@/components/ui/buttons";
import { FunctionCallLab } from "@/components/visualizations/function-call/function-call-lab";

export const metadata: Metadata = {
    title: "Function Call Flow Visualization",
    description:
        "Trace JavaScript function definition, arguments, parameter binding, local scope, return values and resumed caller execution.",
};

export default function FunctionCallVisualizationPage() {
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
                <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-16">
                    <Breadcrumbs
                        items={[
                            {
                                label: "Visualizations",
                                href: "/visualizations",
                            },
                            {
                                label: "Programming Fundamentals",
                                href: "/visualizations/programming-fundamentals",
                            },
                            { label: "Function Call Flow" },
                        ]}
                    />

                    <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                                <Braces aria-hidden="true" className="size-7" />
                            </span>
                            <p className="mt-6 font-bold text-brand">
                                Interactive animation laboratory
                            </p>
                            <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Function Call <span className="text-brand">Flow</span>
                            </h1>
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                                Follow a call into temporary local scope and back again,
                                seeing exactly how arguments, parameters, local variables
                                and return values connect.
                            </p>
                        </div>

                        <ButtonLink
                            href="/learn/programming-fundamentals/functions"
                            variant="secondary"
                        >
                            <BookOpen aria-hidden="true" className="size-5" />
                            Read the complete lesson
                        </ButtonLink>
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
                <FunctionCallLab />
                <VisualizationSequenceNavigation currentVisualizationId="function-call" />
            </section>
        </main>
    );
}
