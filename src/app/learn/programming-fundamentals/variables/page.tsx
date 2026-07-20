import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock3,
    Lightbulb,
} from "lucide-react";

import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MultipleChoiceQuiz } from "@/components/learning/multiple-choice-quiz";
import { VariableMemoryDemo } from "@/components/learning/variable-memory-demo";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export const metadata: Metadata = {
    title: "Variables and Values",
    description:
        "Learn how programming variables store, read and update values through an interactive animated visualization.",
};

const takeaways = [
    "A variable gives a meaningful name to a value.",
    "The value associated with a variable can be read by the program.",
    "A variable declared with let can receive a different value later.",
    "The variable name and its current value are related but not the same thing.",
];

export default function VariablesLessonPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main>
                <article>
                    <header className="relative overflow-hidden border-b border-border bg-surface">
                        <div
                            aria-hidden="true"
                            className="absolute -top-48 right-0 size-[480px] rounded-full bg-brand-soft blur-3xl"
                        />

                        <div className="relative mx-auto max-w-5xl px-6 py-12 lg:py-16">
                            <Breadcrumbs
                                items={[
                                    {
                                        label: "Learning Paths",
                                        href: "/learn",
                                    },
                                    {
                                        label: "Programming Fundamentals",
                                        href: "/learn/programming-fundamentals",
                                    },
                                    {
                                        label: "Variables",
                                    },
                                ]}
                            />

                            <div className="mt-12">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand">
                                        Lesson 1
                                    </span>

                                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                        <Clock3 aria-hidden="true" className="size-4" />
                                        10 minutes
                                    </span>

                                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                        <CheckCircle2
                                            aria-hidden="true"
                                            className="size-4 text-success"
                                        />
                                        Beginner
                                    </span>
                                </div>

                                <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                    Variables and{" "}
                                    <span className="text-brand">values</span>
                                </h1>

                                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                                    Learn how programs use meaningful names to store, access and
                                    update information while they are running.
                                </p>
                            </div>
                        </div>
                    </header>

                    <div className="mx-auto max-w-5xl space-y-16 px-6 py-14 lg:py-20">
                        <section aria-labelledby="what-is-variable">
                            <p className="font-bold text-brand">Core concept</p>

                            <h2
                                id="what-is-variable"
                                className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                            >
                                What is a variable?
                            </h2>

                            <div className="mt-6 max-w-4xl space-y-5 text-lg leading-8 text-muted-foreground">
                                <p>
                                    A variable is a name that a program uses to refer to a value.
                                    Instead of repeatedly working with an unexplained value such
                                    as{" "}
                                    <code className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-base font-semibold text-foreground">
                                        10
                                    </code>
                                    , we can give it a meaningful name such as{" "}
                                    <code className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-base font-semibold text-foreground">
                                        score
                                    </code>
                                    .
                                </p>

                                <p>
                                    The variable name helps developers understand what the value
                                    represents. The program can then read or update that value
                                    through the variable name.
                                </p>
                            </div>

                            <aside className="mt-8 rounded-2xl border border-warning/40 bg-warning-soft p-6">
                                <div className="flex gap-4">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface">
                                        <Lightbulb
                                            aria-hidden="true"
                                            className="size-5 text-warning"
                                        />
                                    </span>

                                    <div>
                                        <h3 className="font-display text-lg font-bold">
                                            A useful mental model
                                        </h3>

                                        <p className="mt-2 leading-7 text-muted-foreground">
                                            Think of a variable as a labelled place where your
                                            program can find a value. This is a simplified learning
                                            model because programming languages manage memory
                                            differently internally.
                                        </p>
                                    </div>
                                </div>
                            </aside>
                        </section>

                        <VariableMemoryDemo />

                        <section aria-labelledby="code-example">
                            <p className="font-bold text-brand">Put it together</p>

                            <h2
                                id="code-example"
                                className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                            >
                                A complete example
                            </h2>

                            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                                This example declares a variable, assigns a value, reads it and
                                then updates it.
                            </p>

                            <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-code-background shadow-xl">
                                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                                    <div className="flex gap-2">
                                        <span className="size-2.5 rounded-full bg-red-400" />
                                        <span className="size-2.5 rounded-full bg-amber-400" />
                                        <span className="size-2.5 rounded-full bg-emerald-400" />
                                    </div>

                                    <span className="font-mono text-xs text-slate-400">
                                        variables.js
                                    </span>
                                </div>

                                <pre className="overflow-x-auto p-6 text-sm leading-7 text-code-foreground">
                                    <code>{`let score;

score = 10;
console.log(score);

score = score + 5;
console.log(score);`}</code>
                                </pre>
                            </div>

                            <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
                                <h3 className="font-display text-xl font-bold">
                                    Expected output
                                </h3>

                                <pre className="mt-4 overflow-x-auto rounded-xl bg-surface-muted p-4 font-mono text-foreground">
                                    <code>{`10
15`}</code>
                                </pre>
                            </div>
                        </section>

                        <section aria-labelledby="key-takeaways">
                            <p className="font-bold text-brand">Lesson summary</p>

                            <h2
                                id="key-takeaways"
                                className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                            >
                                Key takeaways
                            </h2>

                            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                                {takeaways.map((takeaway) => (
                                    <li
                                        key={takeaway}
                                        className="flex gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm"
                                    >
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-success-soft">
                                            <CheckCircle2
                                                aria-hidden="true"
                                                className="size-5 text-success"
                                            />
                                        </span>

                                        <span className="leading-7 text-muted-foreground">
                                            {takeaway}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <MultipleChoiceQuiz
                            question="What value will be displayed?"
                            code={`let total = 5;
total = total + 3;
console.log(total);`}
                            options={[
                                {
                                    id: "answer-3",
                                    label: "3",
                                },
                                {
                                    id: "answer-5",
                                    label: "5",
                                },
                                {
                                    id: "answer-8",
                                    label: "8",
                                },
                                {
                                    id: "answer-53",
                                    label: "53",
                                },
                            ]}
                            correctOptionId="answer-8"
                            explanation="The current value of total is 5. The program adds 3 and assigns the result back to total, so console.log displays 8."
                        />

                        <nav
                            aria-label="Lesson navigation"
                            className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <Link
                                href="/learn/programming-fundamentals"
                                className="inline-flex items-center gap-2 rounded-lg font-bold text-muted-foreground transition hover:text-brand"
                            >
                                <ArrowLeft aria-hidden="true" className="size-4" />
                                Course overview
                            </Link>

                            <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-surface-muted px-5 py-3 font-bold text-muted-foreground">
                                Conditions coming soon
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </span>
                        </nav>
                    </div>
                </article>
            </main>

            <SiteFooter />
        </div>
    );
}