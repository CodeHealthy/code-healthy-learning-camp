import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock3,
    ExternalLink,
    FlaskConical,
    Repeat2,
    Target,
} from "lucide-react";

import { LoopExecutionDemo } from "@/components/learning/loop-execution-demo";
import { MultipleChoiceQuiz } from "@/components/learning/multiple-choice-quiz";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ButtonLink } from "@/components/ui/buttons";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata: Metadata = {
    title: "Loops and Repetition",
    description:
        "Learn how for and while loops repeat instructions, update counters and stop when a condition becomes false.",
};

const repeatedCode = `console.log("Complete task 1");
console.log("Complete task 2");
console.log("Complete task 3");
console.log("Complete task 4");`;

const forLoopCode = `for (let task = 1; task <= 4; task++) {
  console.log(\`Complete task \${task}\`);
}`;

const whileLoopCode = `let attemptsLeft = 3;

while (attemptsLeft > 0) {
  console.log(\`Attempts left: \${attemptsLeft}\`);
  attemptsLeft--;
}

console.log("No attempts remaining");`;

const controlCode = `for (let number = 1; number <= 6; number++) {
  if (number === 3) continue;
  if (number === 5) break;

  console.log(number);
}`;

const exerciseCode = `// Display the even numbers 2, 4, 6 and 8.
// Complete the three missing parts.

for (let number = ___; number <= ___; number += ___) {
  console.log(number);
}`;

const exerciseSolution = `for (let number = 2; number <= 8; number += 2) {
  console.log(number);
}`;

const quizCode = `for (let index = 0; index < 3; index++) {
  console.log(index);
}`;

const loopPhases = [
    {
        title: "Initialize",
        code: "let count = 1",
        description: "Create the counter once before repetition begins.",
    },
    {
        title: "Check",
        code: "count <= 3",
        description: "Continue only while the condition is true.",
    },
    {
        title: "Run",
        code: "console.log(count)",
        description: "Execute the instructions inside the loop body.",
    },
    {
        title: "Update",
        code: "count++",
        description: "Change the counter before returning to the check.",
    },
];

const takeaways = [
    "A loop repeats a body while its continuation condition is true.",
    "A for loop keeps initialization, condition and update in one header.",
    "A while loop is useful when the number of repetitions is not known in advance.",
    "Every loop needs a believable path toward a false condition.",
    "The final failed condition check is what stops normal loop execution.",
];

export default function LoopsLessonPage() {
    return (
        <main id="main-content" className="min-h-screen bg-background text-foreground">
            <article>
                <header className="relative overflow-hidden border-b border-border bg-surface">
                    <div aria-hidden="true" className="absolute -top-48 right-0 size-[480px] rounded-full bg-brand-soft blur-3xl" />
                    <div aria-hidden="true" className="absolute -bottom-56 -left-40 size-[420px] rounded-full bg-accent-soft blur-3xl" />

                    <div className="relative mx-auto max-w-5xl px-6 py-12 lg:py-16">
                        <Breadcrumbs
                            items={[
                                { label: "Learning Paths", href: "/learn" },
                                { label: "Programming Fundamentals", href: "/learn/programming-fundamentals" },
                                { label: "Loops" },
                            ]}
                        />

                        <div className="mt-12">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand">Lesson 3</span>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Clock3 aria-hidden="true" className="size-4" />18 minutes
                                </span>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <CheckCircle2 aria-hidden="true" className="size-4 text-success" />Beginner
                                </span>
                            </div>

                            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Loops and <span className="text-brand">repetition</span>
                            </h1>
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                                Learn how programs repeat useful work, track each iteration and stop at exactly the right moment.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-5xl space-y-16 px-6 py-14 lg:py-20">
                    <section aria-label="Learning objective">
                        <Callout title="Learning objective" variant="info">
                            <p>
                                By the end of this lesson, you will be able to write for and while loops, trace their execution and explain how initialization, condition and update control repetition.
                            </p>
                        </Callout>
                    </section>

                    <section aria-labelledby="why-loops">
                        <p className="font-bold text-brand">The problem</p>
                        <h2 id="why-loops" className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Repeating code by hand does not scale
                        </h2>
                        <div className="mt-6 max-w-4xl space-y-5 text-lg leading-8 text-muted-foreground">
                            <p>
                                A loop is a control-flow structure that repeats a block of instructions. Each complete pass through that block is called an <strong className="text-foreground">iteration</strong>.
                            </p>
                            <p>
                                Without a loop, the same action must be copied for every item. A loop expresses the changing part once and lets the program perform the repetition.
                            </p>
                        </div>

                        <div className="mt-7 grid gap-5 lg:grid-cols-2">
                            <div>
                                <p className="mb-3 text-sm font-bold text-danger">Repeated manually</p>
                                <CodeBlock code={repeatedCode} filename="manual-tasks.js" language="JavaScript" />
                            </div>
                            <div>
                                <p className="mb-3 text-sm font-bold text-success">Expressed as a loop</p>
                                <CodeBlock code={forLoopCode} filename="task-loop.js" language="JavaScript" />
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="loop-cycle">
                        <p className="font-bold text-brand">Mental model</p>
                        <h2 id="loop-cycle" className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Every controlled loop follows a cycle
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            Read a loop as a sequence of responsibilities, not as one dense line of punctuation.
                        </p>

                        <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {loopPhases.map((phase, index) => (
                                <li key={phase.title} className="relative rounded-2xl border border-border bg-surface p-5 shadow-sm">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white">{index + 1}</span>
                                    <h3 className="mt-4 font-display font-bold">{phase.title}</h3>
                                    <code className="mt-2 block overflow-x-auto font-mono text-xs font-bold text-brand">{phase.code}</code>
                                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{phase.description}</p>
                                </li>
                            ))}
                        </ol>

                        <Callout title="The check happens before every iteration" variant="tip" className="mt-7">
                            <p>
                                If the condition is false on the first check, the loop body runs zero times. After every update, execution returns to the condition instead of jumping directly into the body.
                            </p>
                        </Callout>
                    </section>

                    <section aria-label="Loop execution visualization" className="space-y-6">
                        <LoopExecutionDemo />
                        <div className="flex justify-center">
                            <ButtonLink
                                href="/visualizations/programming-fundamentals/loop-execution"
                                variant="secondary"
                                size="lg"
                                className="border-brand/40 bg-brand-soft text-brand hover:bg-brand hover:text-white"
                            >
                                <FlaskConical aria-hidden="true" className="size-5" />
                                Open the full Loop Execution Lab
                                <ExternalLink aria-hidden="true" className="size-4" />
                            </ButtonLink>
                        </div>
                    </section>

                    <section aria-labelledby="for-loop">
                        <p className="font-bold text-brand">Counted repetition</p>
                        <h2 id="for-loop" className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Use a for loop when the counter pattern is clear
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            A for-loop header places the starting action, continuation condition and update together. Semicolons separate these three responsibilities.
                        </p>
                        <CodeBlock code={forLoopCode} filename="task-loop.js" language="JavaScript" className="mt-7" />

                        <div className="mt-7 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-border bg-surface p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Runs once</p>
                                <code className="mt-3 block font-mono font-bold text-brand">let task = 1</code>
                                <p className="mt-3 leading-7 text-muted-foreground">Creates the counter before the first check.</p>
                            </div>
                            <div className="rounded-2xl border border-border bg-surface p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Runs before each pass</p>
                                <code className="mt-3 block font-mono font-bold text-brand">task &lt;= 4</code>
                                <p className="mt-3 leading-7 text-muted-foreground">Decides whether another iteration may begin.</p>
                            </div>
                            <div className="rounded-2xl border border-border bg-surface p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Runs after each pass</p>
                                <code className="mt-3 block font-mono font-bold text-brand">task++</code>
                                <p className="mt-3 leading-7 text-muted-foreground">Moves the counter toward the stopping point.</p>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="while-loop">
                        <p className="font-bold text-brand">Condition-led repetition</p>
                        <h2 id="while-loop" className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Use while when repetition depends on a changing situation
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            A while loop keeps only the condition in its header. Initialization usually appears before it, and the body must perform any update needed to eventually stop.
                        </p>
                        <CodeBlock code={whileLoopCode} filename="attempts.js" language="JavaScript" className="mt-7" />
                        <Callout title="Choose by clarity" variant="info" className="mt-7">
                            <p>
                                A for loop is usually clearer for an obvious counter. A while loop is often clearer when repeating until an event or state change. Both still rely on a condition.
                            </p>
                        </Callout>
                    </section>

                    <section aria-labelledby="loop-control">
                        <p className="font-bold text-brand">Changing the normal cycle</p>
                        <h2 id="loop-control" className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Continue skips one body; break ends the loop
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            Use these statements deliberately. <code>continue</code> skips the remaining work in the current iteration, while <code>break</code> exits the nearest loop immediately.
                        </p>
                        <CodeBlock code={controlCode} filename="loop-control.js" language="JavaScript" className="mt-7" />
                        <p className="mt-5 leading-7 text-muted-foreground">
                            This displays <code>1</code>, <code>2</code> and <code>4</code>. Three is skipped, and five stops the loop before it can be displayed.
                        </p>
                    </section>

                    <section aria-labelledby="common-mistakes">
                        <p className="font-bold text-brand">Avoid broken repetition</p>
                        <h2 id="common-mistakes" className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Common loop mistakes
                        </h2>
                        <div className="mt-7 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-danger/40 bg-danger-soft p-5">
                                <h3 className="font-display font-bold">Infinite loop</h3>
                                <p className="mt-3 leading-7 text-muted-foreground">The condition never becomes false because the relevant value is not updated correctly.</p>
                            </div>
                            <div className="rounded-2xl border border-warning/40 bg-warning-soft p-5">
                                <h3 className="font-display font-bold">Off-by-one error</h3>
                                <p className="mt-3 leading-7 text-muted-foreground">Using <code>&lt;</code> instead of <code>&lt;=</code>, or the reverse, produces one too few or one too many iterations.</p>
                            </div>
                            <div className="rounded-2xl border border-border bg-surface p-5">
                                <h3 className="font-display font-bold">Changing the wrong value</h3>
                                <p className="mt-3 leading-7 text-muted-foreground">The update must move the value used by the condition toward a stopping state.</p>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="practice-exercise">
                        <div className="flex items-center gap-3">
                            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                <Target aria-hidden="true" className="size-5" />
                            </span>
                            <div>
                                <p className="font-bold text-brand">Practical exercise</p>
                                <h2 id="practice-exercise" className="font-display text-3xl font-extrabold tracking-tight">Count through even numbers</h2>
                            </div>
                        </div>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            Fill the initialization, boundary and update so the loop displays 2, 4, 6 and 8.
                        </p>
                        <CodeBlock code={exerciseCode} filename="even-numbers.js" language="JavaScript" className="mt-7" />
                        <details className="mt-5 rounded-2xl border border-border bg-surface p-5">
                            <summary className="cursor-pointer font-bold text-brand">Show one solution</summary>
                            <CodeBlock code={exerciseSolution} filename="solution.js" language="JavaScript" className="mt-5" />
                        </details>
                    </section>

                    <section aria-labelledby="key-takeaways">
                        <p className="font-bold text-brand">Lesson summary</p>
                        <h2 id="key-takeaways" className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Key takeaways</h2>
                        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                            {takeaways.map((takeaway) => (
                                <li key={takeaway} className="flex gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-success-soft">
                                        <CheckCircle2 aria-hidden="true" className="size-5 text-success" />
                                    </span>
                                    <span className="leading-7 text-muted-foreground">{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <MultipleChoiceQuiz
                        question="What values will this loop display?"
                        code={quizCode}
                        options={[
                            { id: "zero-two", label: "0, 1, 2" },
                            { id: "one-three", label: "1, 2, 3" },
                            { id: "zero-three", label: "0, 1, 2, 3" },
                            { id: "forever", label: "It repeats forever" },
                        ]}
                        correctOptionId="zero-two"
                        explanation="The counter starts at 0. The body runs for 0, 1 and 2. After index becomes 3, the condition 3 < 3 is false, so the loop stops before displaying 3."
                    />

                    <section className="rounded-3xl border border-brand/40 bg-brand-soft p-7 sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-bold text-brand">Explore the complete cycle</p>
                                <h2 className="mt-2 font-display text-2xl font-extrabold">Experiment in the Loop Execution Lab</h2>
                                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                                    Change the starting counter and iteration count, then trace every check, body execution, update and final stopping condition.
                                </p>
                            </div>
                            <ButtonLink href="/visualizations/programming-fundamentals/loop-execution" size="lg" className="shrink-0">
                                <Repeat2 aria-hidden="true" className="size-5" />Open lab
                            </ButtonLink>
                        </div>
                    </section>

                    <nav aria-label="Lesson navigation" className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                        <Link href="/learn/programming-fundamentals/conditions" className="inline-flex items-center gap-2 rounded-lg font-bold text-muted-foreground transition hover:text-brand">
                            <ArrowLeft aria-hidden="true" className="size-4" />Conditions and decisions
                        </Link>
                        <Link href="/learn/programming-fundamentals/functions" className="inline-flex items-center gap-2 rounded-lg font-bold text-brand transition hover:text-brand-strong">
                            Functions and reusable logic<ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                    </nav>
                </div>
            </article>
        </main>
    );
}
