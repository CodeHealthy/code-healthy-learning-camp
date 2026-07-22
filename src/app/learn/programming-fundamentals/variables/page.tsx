import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock3,
    ExternalLink,
    FlaskConical,
} from "lucide-react";

import { MultipleChoiceQuiz } from "@/components/learning/multiple-choice-quiz";
import { VariableMemoryDemo } from "@/components/learning/variable-memory-demo";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { ButtonLink } from "@/components/ui/buttons";

export const metadata: Metadata = {
    title: "Variables and Values",
    description:
        "Learn how programming variables store, read and update values through an interactive animated visualization.",
};

const exampleCode = `let score;

score = 10;
console.log(score);

score = score + 5;
console.log(score);`;

const exampleOutput = `10
15`;

const quizCode = `let total = 5;
total = total + 3;
console.log(total);`;

const takeaways = [
    "A variable gives a meaningful name to a value.",
    "The value associated with a variable can be read by the program.",
    "A variable declared with let can receive a different value later.",
    "The variable name and its current value are related but not the same thing.",
];

export default function VariablesLessonPage() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-background text-foreground"
        >
            <article>
                <header className="relative overflow-hidden border-b border-border bg-surface">
                    <div
                        aria-hidden="true"
                        className="absolute -top-48 right-0 size-[480px] rounded-full bg-brand-soft blur-3xl"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute -bottom-56 -left-40 size-[420px] rounded-full bg-accent-soft blur-3xl"
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
                                Variables and <span className="text-brand">values</span>
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

                        <Callout
                            variant="tip"
                            title="A useful mental model"
                            className="mt-8"
                        >
                            <p>
                                Think of a variable as a labelled place where your program can
                                find a value. This is a simplified learning model because
                                programming languages manage memory differently internally.
                            </p>
                        </Callout>
                    </section>

                    <section
                        aria-label="Variable visualization"
                        className="space-y-6"
                    >
                        <VariableMemoryDemo />

                        <div className="flex justify-center">
                            <ButtonLink
                                href="/visualizations/programming-fundamentals/variable-memory"
                                variant="secondary"
                                size="lg"
                                className="border-brand/40 bg-brand-soft text-brand hover:bg-brand hover:text-white"
                            >
                                <FlaskConical aria-hidden="true" className="size-5" />
                                Open the full Variable Memory Lab
                                <ExternalLink aria-hidden="true" className="size-4" />
                            </ButtonLink>
                        </div>
                    </section>

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

                        <CodeBlock
                            className="mt-7"
                            filename="variables.js"
                            language="JavaScript"
                            code={exampleCode}
                        />

                        <div className="mt-6">
                            <h3 className="mb-4 font-display text-xl font-bold">
                                Expected output
                            </h3>

                            <CodeBlock
                                filename="Console output"
                                language="text"
                                code={exampleOutput}
                            />
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
                        code={quizCode}
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

                        <Link
                            href="/learn/programming-fundamentals/conditions"
                            className="inline-flex items-center justify-center gap-2 rounded-lg font-bold text-brand transition hover:text-brand-strong"
                        >
                            Conditions and decisions
                            <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                    </nav>
                </div>
            </article>
        </main>
    );
}
