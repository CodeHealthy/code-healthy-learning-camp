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
import { VariableMemoryDemo } from "@/components/learning/variable-memory-demo";
import { MultipleChoiceQuiz } from "@/components/learning/multiple-choice-quiz";

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
        <div className="min-h-screen bg-slate-50 text-slate-950">
            <Header />

            <main>
                <article>
                    <header className="border-b border-slate-200 bg-white">
                        <div className="mx-auto max-w-5xl px-6 py-12">
                            <nav aria-label="Breadcrumb">
                                <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                                    <li>
                                        <Link href="/" className="hover:text-blue-600">
                                            Home
                                        </Link>
                                    </li>

                                    <li aria-hidden="true">/</li>

                                    <li>
                                        <Link href="/learn" className="hover:text-blue-600">
                                            Learning Paths
                                        </Link>
                                    </li>

                                    <li aria-hidden="true">/</li>

                                    <li>
                                        <Link
                                            href="/learn/programming-fundamentals"
                                            className="hover:text-blue-600"
                                        >
                                            Programming Fundamentals
                                        </Link>
                                    </li>

                                    <li aria-hidden="true">/</li>

                                    <li className="font-medium text-slate-700">Variables</li>
                                </ol>
                            </nav>

                            <div className="mt-10">
                                <p className="font-semibold text-blue-600">Lesson 1</p>

                                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                                    Variables and values
                                </h1>

                                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                                    Learn how programs use meaningful names to store, access and
                                    update information while they are running.
                                </p>

                                <div className="mt-7 flex flex-wrap gap-5 text-sm font-medium text-slate-600">
                                    <span className="inline-flex items-center gap-2">
                                        <Clock3 aria-hidden="true" className="size-4" />
                                        10 minutes
                                    </span>

                                    <span className="inline-flex items-center gap-2">
                                        <CheckCircle2
                                            aria-hidden="true"
                                            className="size-4 text-emerald-600"
                                        />
                                        Beginner
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="mx-auto max-w-5xl space-y-14 px-6 py-14">
                        <section aria-labelledby="what-is-variable">
                            <h2
                                id="what-is-variable"
                                className="text-3xl font-bold tracking-tight"
                            >
                                What is a variable?
                            </h2>

                            <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
                                <p>
                                    A variable is a name that a program uses to refer to a value.
                                    Instead of repeatedly working with an unexplained value such
                                    as <code className="rounded bg-slate-200 px-2 py-1">10</code>,
                                    we can give it a meaningful name such as{" "}
                                    <code className="rounded bg-slate-200 px-2 py-1">
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

                            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
                                <div className="flex gap-4">
                                    <Lightbulb
                                        aria-hidden="true"
                                        className="mt-1 size-6 shrink-0 text-amber-700"
                                    />

                                    <div>
                                        <h3 className="font-bold text-amber-950">
                                            A useful mental model
                                        </h3>

                                        <p className="mt-2 leading-7 text-amber-900">
                                            Think of a variable as a labelled place where your
                                            program can find a value. This is a simplified learning
                                            model; programming languages manage memory differently
                                            internally.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <VariableMemoryDemo />

                        <section aria-labelledby="code-example">
                            <h2
                                id="code-example"
                                className="text-3xl font-bold tracking-tight"
                            >
                                A complete example
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-700">
                                This example declares a variable, assigns a value, reads it and
                                then updates it.
                            </p>

                            <pre className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-6 text-sm leading-7 text-slate-100 shadow-lg">
                                <code>{`let score;

score = 10;
console.log(score);

score = score + 5;
console.log(score);`}</code>
                            </pre>

                            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
                                <h3 className="text-xl font-bold">Expected output</h3>

                                <pre className="mt-4 rounded-xl bg-slate-100 p-4 font-mono text-slate-800">
                                    <code>{`10
15`}</code>
                                </pre>
                            </div>
                        </section>

                        <section aria-labelledby="key-takeaways">
                            <h2
                                id="key-takeaways"
                                className="text-3xl font-bold tracking-tight"
                            >
                                Key takeaways
                            </h2>

                            <ul className="mt-6 space-y-4">
                                {takeaways.map((takeaway) => (
                                    <li
                                        key={takeaway}
                                        className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
                                    >
                                        <CheckCircle2
                                            aria-hidden="true"
                                            className="mt-1 size-5 shrink-0 text-emerald-600"
                                        />

                                        <span className="leading-7 text-slate-700">
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
                            className="flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <Link
                                href="/learn/programming-fundamentals"
                                className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-blue-600"
                            >
                                <ArrowLeft aria-hidden="true" className="size-4" />
                                Course overview
                            </Link>

                            <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-500">
                                Conditions coming soon
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </span>
                        </nav>
                    </div>
                </article>
            </main>
        </div>
    );
}