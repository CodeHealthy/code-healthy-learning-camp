import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock3,
    ExternalLink,
    FlaskConical,
    GitBranch,
    Target,
} from "lucide-react";

import { ConditionDecisionDemo } from "@/components/learning/condition-decision-demo";
import { MultipleChoiceQuiz } from "@/components/learning/multiple-choice-quiz";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ButtonLink } from "@/components/ui/buttons";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata: Metadata = {
    title: "Conditions and Decisions",
    description:
        "Learn how Boolean expressions, comparisons and conditional branches help programs make decisions.",
};

const comparisonOperators = [
    {
        operator: "===",
        meaning: "Strictly equal to",
        example: "score === 10",
    },
    {
        operator: "!==",
        meaning: "Not strictly equal to",
        example: 'status !== "offline"',
    },
    {
        operator: ">",
        meaning: "Greater than",
        example: "temperature > 30",
    },
    {
        operator: ">=",
        meaning: "Greater than or equal to",
        example: "age >= 18",
    },
    {
        operator: "<",
        meaning: "Less than",
        example: "stock < 5",
    },
    {
        operator: "<=",
        meaning: "Less than or equal to",
        example: "attempts <= 3",
    },
];

const logicalOperators = [
    {
        operator: "&&",
        name: "AND",
        description: "true only when both operands are true",
        example: "isAdult && hasTicket",
    },
    {
        operator: "||",
        name: "OR",
        description: "true when at least one operand is true",
        example: "isOwner || isAdmin",
    },
    {
        operator: "!",
        name: "NOT",
        description: "reverses a Boolean value",
        example: "!isBlocked",
    },
];

const decisionCode = `const temperature = 31;

if (temperature >= 30) {
  console.log("Stay hydrated");
} else {
  console.log("Normal conditions");
}`;

const branchCode = `const score = 76;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 60) {
  console.log("Passed");
} else {
  console.log("Keep practising");
}`;

const exerciseCode = `const batteryLevel = 15;

// Write a condition that displays:
// "Charge now" when batteryLevel is 20 or lower.
// Otherwise display "Battery level is healthy".`;

const exerciseSolution = `if (batteryLevel <= 20) {
  console.log("Charge now");
} else {
  console.log("Battery level is healthy");
}`;

const quizCode = `const age = 16;
const hasPermission = true;

if (age >= 18 || hasPermission) {
  console.log("Access allowed");
} else {
  console.log("Access denied");
}`;

const takeaways = [
    "A condition is an expression that produces a Boolean result.",
    "An if statement runs its branch only when its condition is true.",
    "In an if / else-if / else chain, only the first matching branch runs.",
    "Logical operators combine or reverse Boolean expressions.",
    "JavaScript can short-circuit logical expressions when the result is already known.",
];

export default function ConditionsLessonPage() {
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
                                    label: "Conditions",
                                },
                            ]}
                        />

                        <div className="mt-12">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand">
                                    Lesson 2
                                </span>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Clock3
                                        aria-hidden="true"
                                        className="size-4"
                                    />
                                    15 minutes
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
                                Conditions and{" "}
                                <span className="text-brand">decisions</span>
                            </h1>

                            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                                Learn how a program asks true-or-false questions,
                                selects one path and skips instructions that do
                                not belong to that path.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-5xl space-y-16 px-6 py-14 lg:py-20">
                    <section aria-label="Learning objective">
                        <Callout
                            title="Learning objective"
                            variant="info"
                        >
                            <p>
                                By the end of this lesson, you will be able to
                                create Boolean expressions, use conditional
                                branches and explain why one branch runs while
                                the others are skipped.
                            </p>
                        </Callout>
                    </section>

                    <section aria-labelledby="what-is-condition">
                        <p className="font-bold text-brand">Core concept</p>
                        <h2
                            id="what-is-condition"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            What is a condition?
                        </h2>

                        <div className="mt-6 max-w-4xl space-y-5 text-lg leading-8 text-muted-foreground">
                            <p>
                                A condition is an expression that a program
                                evaluates to decide what should happen next. In
                                this lesson, we will create conditions that
                                produce a Boolean value: either{" "}
                                <code className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-base font-semibold text-foreground">
                                    true
                                </code>{" "}
                                or{" "}
                                <code className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-base font-semibold text-foreground">
                                    false
                                </code>
                                .
                            </p>
                            <p>
                                Programs need conditions because the correct
                                action often depends on current information. An
                                application may check whether a password is
                                correct, whether stock is available or whether a
                                user has permission to open a page.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-success/40 bg-success-soft p-5">
                                <p className="font-mono text-lg font-extrabold text-success">
                                    true
                                </p>
                                <p className="mt-2 leading-7 text-muted-foreground">
                                    The condition is satisfied, so its associated
                                    branch can run.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-danger/40 bg-danger-soft p-5">
                                <p className="font-mono text-lg font-extrabold text-danger">
                                    false
                                </p>
                                <p className="mt-2 leading-7 text-muted-foreground">
                                    The condition is not satisfied, so that branch
                                    is skipped.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="comparison-operators">
                        <p className="font-bold text-brand">
                            Creating Boolean results
                        </p>
                        <h2
                            id="comparison-operators"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Comparisons ask precise questions
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            Comparison operators compare two values and produce
                            either true or false. The operator describes the
                            relationship being tested.
                        </p>

                        <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[640px] text-left">
                                    <caption className="sr-only">
                                        JavaScript comparison operators, their
                                        meanings and example expressions
                                    </caption>
                                    <thead className="bg-surface-muted text-sm">
                                        <tr>
                                            <th className="px-5 py-4 font-bold">
                                                Operator
                                            </th>
                                            <th className="px-5 py-4 font-bold">
                                                Meaning
                                            </th>
                                            <th className="px-5 py-4 font-bold">
                                                Example
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {comparisonOperators.map((item) => (
                                            <tr key={item.operator}>
                                                <td className="px-5 py-4">
                                                    <code className="rounded-lg bg-brand-soft px-2.5 py-1 font-mono font-bold text-brand">
                                                        {item.operator}
                                                    </code>
                                                </td>
                                                <td className="px-5 py-4 text-muted-foreground">
                                                    {item.meaning}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <code className="font-mono text-sm text-foreground">
                                                        {item.example}
                                                    </code>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <Callout
                            title="Prefer strict equality in JavaScript"
                            variant="tip"
                            className="mt-7"
                        >
                            <p>
                                The strict operators <code>===</code> and{" "}
                                <code>!==</code> compare values without converting
                                them to another type first. This makes the result
                                more predictable than loose equality.
                            </p>
                        </Callout>

                        <Callout
                            title="A focused beginner model"
                            variant="info"
                            className="mt-4"
                        >
                            <p>
                                JavaScript can also interpret non-Boolean values
                                as truthy or falsy inside a condition. We are
                                starting with explicit Boolean expressions so the
                                decision process remains clear and predictable.
                            </p>
                        </Callout>
                    </section>

                    <section
                        aria-label="Condition decision visualization"
                        className="space-y-6"
                    >
                        <ConditionDecisionDemo />

                        <div className="flex justify-center">
                            <ButtonLink
                                href="/visualizations/programming-fundamentals/decision-flow"
                                variant="secondary"
                                size="lg"
                                className="border-brand/40 bg-brand-soft text-brand hover:bg-brand hover:text-white"
                            >
                                <FlaskConical
                                    aria-hidden="true"
                                    className="size-5"
                                />
                                Open the full Decision Flow Lab
                                <ExternalLink
                                    aria-hidden="true"
                                    className="size-4"
                                />
                            </ButtonLink>
                        </div>
                    </section>

                    <section aria-labelledby="if-else">
                        <p className="font-bold text-brand">Selecting a path</p>
                        <h2
                            id="if-else"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Use if and else for two outcomes
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            The <code>if</code> branch runs when its condition is
                            true. The optional <code>else</code> branch runs when
                            that same condition is false. They are alternatives,
                            so both branches cannot run during the same decision.
                        </p>

                        <CodeBlock
                            code={decisionCode}
                            filename="temperature-decision.js"
                            language="JavaScript"
                            className="mt-7"
                        />

                        <Callout
                            title="Think of control flow as a route"
                            variant="tip"
                            className="mt-7"
                        >
                            <p>
                                The condition is a checkpoint. Execution follows
                                one route through the checkpoint, runs that
                                route&apos;s instructions and then continues after
                                the entire conditional statement.
                            </p>
                        </Callout>
                    </section>

                    <section aria-labelledby="multiple-branches">
                        <p className="font-bold text-brand">
                            More than two outcomes
                        </p>
                        <h2
                            id="multiple-branches"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Add else if for another question
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            An else-if chain checks conditions from top to bottom.
                            As soon as one condition is true, its branch runs and
                            the rest of the chain is skipped. Order therefore
                            matters.
                        </p>

                        <CodeBlock
                            code={branchCode}
                            filename="score-message.js"
                            language="JavaScript"
                            className="mt-7"
                        />

                        <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
                            With a score of 76, the first comparison is false and
                            the second is true. The program displays{" "}
                            <code className="font-mono font-bold text-foreground">
                                Passed
                            </code>{" "}
                            and never evaluates the final else branch.
                        </p>
                    </section>

                    <section aria-labelledby="logical-operators">
                        <p className="font-bold text-brand">
                            Combining questions
                        </p>
                        <h2
                            id="logical-operators"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Logical operators work with Boolean values
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            Logical operators let a decision depend on multiple
                            Boolean facts or reverse an existing Boolean value.
                            With Boolean operands, the results follow the rules
                            shown below.
                        </p>

                        <div className="mt-7 grid gap-4 md:grid-cols-3">
                            {logicalOperators.map((item) => (
                                <div
                                    key={item.operator}
                                    className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <code className="rounded-lg bg-brand-soft px-3 py-1 font-mono text-lg font-extrabold text-brand">
                                            {item.operator}
                                        </code>
                                        <span className="text-xs font-bold text-muted-foreground">
                                            {item.name}
                                        </span>
                                    </div>
                                    <p className="mt-4 leading-7 text-muted-foreground">
                                        {item.description}
                                    </p>
                                    <code className="mt-4 block overflow-x-auto rounded-lg bg-code-background p-3 font-mono text-xs text-code-foreground">
                                        {item.example}
                                    </code>
                                </div>
                            ))}
                        </div>

                        <Callout
                            title="Short-circuit evaluation"
                            variant="warning"
                            className="mt-7"
                        >
                            <p>
                                JavaScript evaluates <code>&amp;&amp;</code> and{" "}
                                <code>||</code> from left to right. It can stop
                                early when the left operand already determines
                                the result. The Decision Flow Lab makes this
                                behavior visible step by step.
                            </p>
                        </Callout>
                    </section>

                    <section aria-labelledby="common-mistakes">
                        <p className="font-bold text-brand">Avoid confusion</p>
                        <h2
                            id="common-mistakes"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Common conditional mistakes
                        </h2>

                        <div className="mt-7 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-danger/40 bg-danger-soft p-5">
                                <h3 className="font-display font-bold">
                                    Assignment instead of comparison
                                </h3>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    A single <code>=</code> assigns a value. Use a
                                    comparison operator when you intend to ask a
                                    question.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-warning/40 bg-warning-soft p-5">
                                <h3 className="font-display font-bold">
                                    Conditions in the wrong order
                                </h3>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    Put more specific or higher-priority checks
                                    first because only the first matching branch
                                    runs.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border bg-surface p-5">
                                <h3 className="font-display font-bold">
                                    Unnecessary Boolean comparison
                                </h3>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    If <code>isReady</code> already contains a
                                    Boolean, write <code>if (isReady)</code>
                                    instead of <code>isReady === true</code>.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="practice-exercise">
                        <div className="flex items-center gap-3">
                            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                <Target
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </span>
                            <div>
                                <p className="font-bold text-brand">
                                    Practical exercise
                                </p>
                                <h2
                                    id="practice-exercise"
                                    className="font-display text-3xl font-extrabold tracking-tight"
                                >
                                    Build a battery warning
                                </h2>
                            </div>
                        </div>

                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            Complete the condition, predict the output and then
                            compare your work with the solution.
                        </p>

                        <CodeBlock
                            code={exerciseCode}
                            filename="battery-warning.js"
                            language="JavaScript"
                            className="mt-7"
                        />

                        <details className="mt-5 rounded-2xl border border-border bg-surface p-5">
                            <summary className="cursor-pointer font-bold text-brand">
                                Show one solution
                            </summary>
                            <CodeBlock
                                code={exerciseSolution}
                                filename="solution.js"
                                language="JavaScript"
                                className="mt-5"
                            />
                        </details>
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
                        question="What will this program display?"
                        code={quizCode}
                        options={[
                            {
                                id: "allowed",
                                label: "Access allowed",
                            },
                            {
                                id: "denied",
                                label: "Access denied",
                            },
                            {
                                id: "true",
                                label: "true",
                            },
                            {
                                id: "nothing",
                                label: "Nothing",
                            },
                        ]}
                        correctOptionId="allowed"
                        explanation="The age comparison is false, but hasPermission is true. The || operator needs at least one true operand, so the if condition is true and the program displays Access allowed."
                    />

                    <section className="rounded-3xl border border-brand/40 bg-brand-soft p-7 sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-bold text-brand">
                                    Explore the complete process
                                </p>
                                <h2 className="mt-2 font-display text-2xl font-extrabold">
                                    Experiment in the Decision Flow Lab
                                </h2>
                                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                                    Change the age requirement and ticket status,
                                    then watch comparison, short-circuiting and
                                    branch selection happen one step at a time.
                                </p>
                            </div>
                            <ButtonLink
                                href="/visualizations/programming-fundamentals/decision-flow"
                                size="lg"
                                className="shrink-0"
                            >
                                <GitBranch
                                    aria-hidden="true"
                                    className="size-5"
                                />
                                Open lab
                            </ButtonLink>
                        </div>
                    </section>

                    <nav
                        aria-label="Lesson navigation"
                        className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <Link
                            href="/learn/programming-fundamentals/variables"
                            className="inline-flex items-center gap-2 rounded-lg font-bold text-muted-foreground transition hover:text-brand"
                        >
                            <ArrowLeft
                                aria-hidden="true"
                                className="size-4"
                            />
                            Variables and values
                        </Link>

                        <Link
                            href="/learn/programming-fundamentals/loops"
                            className="inline-flex items-center gap-2 rounded-lg font-bold text-brand transition hover:text-brand-strong"
                        >
                            Loops and repetition
                            <ArrowRight
                                aria-hidden="true"
                                className="size-4"
                            />
                        </Link>
                    </nav>
                </div>
            </article>
        </main>
    );
}
