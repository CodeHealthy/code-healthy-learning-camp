import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Braces,
    CheckCircle2,
    Clock3,
    ExternalLink,
    FlaskConical,
    Target,
} from "lucide-react";

import { FunctionCallDemo } from "@/components/learning/function-call-demo";
import { MultipleChoiceQuiz } from "@/components/learning/multiple-choice-quiz";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ButtonLink } from "@/components/ui/buttons";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata: Metadata = {
    title: "Functions and Reusable Logic",
    description:
        "Learn how JavaScript functions receive arguments, create local scope, return values and organize reusable instructions.",
};

const repeatedCode = `const firstSubtotal = 12 * 3;
const secondSubtotal = 8 * 5;
const thirdSubtotal = 15 * 2;`;

const reusableCode = `function calculateTotal(price, quantity) {
  return price * quantity;
}

const firstSubtotal = calculateTotal(12, 3);
const secondSubtotal = calculateTotal(8, 5);
const thirdSubtotal = calculateTotal(15, 2);`;

const anatomyCode = `function calculateTotal(price, quantity) {
  const subtotal = price * quantity;
  return subtotal;
}

const orderTotal = calculateTotal(12, 3);`;

const returnCode = `function isPassing(score) {
  return score >= 60;
}

const result = isPassing(72);
console.log(result); // true`;

const scopeCode = `const taxRate = 0.1;

function addTax(price) {
  const tax = price * taxRate;
  return price + tax;
}

console.log(addTax(50)); // 55
// console.log(tax);     // ReferenceError`;

const defaultCode = `function greet(name = "learner") {
  return "Welcome, " + name + "!";
}

greet("Amina"); // "Welcome, Amina!"
greet();        // "Welcome, learner!"`;

const exerciseCode = `// Create a function named convertMinutesToSeconds.
// It should receive minutes and return the equivalent seconds.

function __________________(________) {
  return __________________;
}

const seconds = convertMinutesToSeconds(4);`;

const exerciseSolution = `function convertMinutesToSeconds(minutes) {
  return minutes * 60;
}

const seconds = convertMinutesToSeconds(4);
console.log(seconds); // 240`;

const quizCode = `function double(number) {
  const result = number * 2;
  return result;
}

const answer = double(6);`;

const anatomy = [
    {
        label: "Name",
        code: "calculateTotal",
        description: "Identifies the reusable operation at each call site.",
    },
    {
        label: "Parameters",
        code: "price, quantity",
        description: "Local names that receive values for one particular call.",
    },
    {
        label: "Body",
        code: "{ ... }",
        description: "Instructions that run each time the function is called.",
    },
    {
        label: "Return",
        code: "return subtotal",
        description: "Sends one result back to the waiting call expression.",
    },
];

const takeaways = [
    "Defining a function prepares instructions; calling it runs those instructions.",
    "Arguments are values supplied by a call, while parameters are local names that receive them.",
    "Each call gets its own temporary local scope and call frame.",
    "A return statement sends a value back and immediately ends that function call.",
    "Small, focused functions make behavior easier to reuse, test and understand.",
];

export default function FunctionsLessonPage() {
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
                                { label: "Learning Paths", href: "/learn" },
                                {
                                    label: "Programming Fundamentals",
                                    href: "/learn/programming-fundamentals",
                                },
                                { label: "Functions" },
                            ]}
                        />

                        <div className="mt-12">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand">
                                    Lesson 4
                                </span>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Clock3 aria-hidden="true" className="size-4" />
                                    20 minutes
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
                                Functions and{" "}
                                <span className="text-brand">reusable logic</span>
                            </h1>
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                                Learn how functions package instructions, receive values,
                                create private working space and return useful results to
                                the code that called them.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-5xl space-y-16 px-6 py-14 lg:py-20">
                    <section aria-label="Learning objective">
                        <Callout title="Learning objective" variant="info">
                            <p>
                                By the end of this lesson, you will be able to define and
                                call functions, distinguish parameters from arguments,
                                trace local scope and use returned values in larger
                                expressions.
                            </p>
                        </Callout>
                    </section>

                    <section aria-labelledby="why-functions">
                        <p className="font-bold text-brand">The problem</p>
                        <h2
                            id="why-functions"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Repeated behavior needs one reliable home
                        </h2>
                        <div className="mt-6 max-w-4xl space-y-5 text-lg leading-8 text-muted-foreground">
                            <p>
                                A <strong className="text-foreground">function</strong> is a
                                named block of instructions designed to perform one job.
                                Define that job once, then call it whenever the program
                                needs the same behavior.
                            </p>
                            <p>
                                Functions reduce duplication, but their deeper value is
                                organization: a meaningful name lets other code describe
                                what should happen without repeating every implementation
                                detail.
                            </p>
                        </div>

                        <div className="mt-7 grid gap-5 lg:grid-cols-2">
                            <div>
                                <p className="mb-3 text-sm font-bold text-danger">
                                    Formula repeated
                                </p>
                                <CodeBlock
                                    code={repeatedCode}
                                    filename="repeated-calculations.js"
                                    language="JavaScript"
                                />
                            </div>
                            <div>
                                <p className="mb-3 text-sm font-bold text-success">
                                    Behavior named and reused
                                </p>
                                <CodeBlock
                                    code={reusableCode}
                                    filename="calculate-total.js"
                                    language="JavaScript"
                                />
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="function-anatomy">
                        <p className="font-bold text-brand">Function anatomy</p>
                        <h2
                            id="function-anatomy"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Read the definition as a contract
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            The function name describes the job, parameters describe the
                            required inputs, the body performs the work, and return
                            describes the result given back to the caller.
                        </p>
                        <CodeBlock
                            code={anatomyCode}
                            filename="function-anatomy.js"
                            language="JavaScript"
                            className="mt-7"
                        />

                        <dl className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {anatomy.map((part, index) => (
                                <div
                                    key={part.label}
                                    className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                                >
                                    <span className="flex size-8 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white">
                                        {index + 1}
                                    </span>
                                    <dt className="mt-4 font-display font-bold">
                                        {part.label}
                                    </dt>
                                    <dd>
                                        <code className="mt-2 block overflow-x-auto font-mono text-xs font-bold text-brand">
                                            {part.code}
                                        </code>
                                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                            {part.description}
                                        </p>
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <Callout
                            title="A definition is not a call"
                            variant="tip"
                            className="mt-7"
                        >
                            <p>
                                Reading the function declaration prepares the behavior.
                                The body runs only when execution reaches an expression
                                such as <code>calculateTotal(12, 3)</code>.
                            </p>
                        </Callout>
                    </section>

                    <section
                        aria-label="Function call visualization"
                        className="space-y-6"
                    >
                        <FunctionCallDemo />
                        <div className="flex justify-center">
                            <ButtonLink
                                href="/visualizations/programming-fundamentals/function-call"
                                variant="secondary"
                                size="lg"
                                className="border-brand/40 bg-brand-soft text-brand hover:bg-brand hover:text-white"
                            >
                                <FlaskConical
                                    aria-hidden="true"
                                    className="size-5"
                                />
                                Open the full Function Call Flow Lab
                                <ExternalLink
                                    aria-hidden="true"
                                    className="size-4"
                                />
                            </ButtonLink>
                        </div>
                    </section>

                    <section aria-labelledby="parameters-arguments">
                        <p className="font-bold text-brand">Inputs</p>
                        <h2
                            id="parameters-arguments"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Parameters are names; arguments are values
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            Parameters belong to the definition. Arguments belong to a
                            particular call. When the call begins, JavaScript assigns
                            arguments to parameters by position.
                        </p>

                        <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface">
                            <div className="grid grid-cols-2 border-b border-border bg-surface-muted text-sm font-bold">
                                <div className="border-r border-border p-4">
                                    Definition: parameters
                                </div>
                                <div className="p-4">Call: arguments</div>
                            </div>
                            <div className="grid grid-cols-2 font-mono text-sm">
                                <div className="border-r border-border p-4">
                                    price
                                </div>
                                <div className="p-4">12</div>
                                <div className="border-t border-r border-border p-4">
                                    quantity
                                </div>
                                <div className="border-t border-border p-4">3</div>
                            </div>
                        </div>

                        <Callout
                            title="Default parameters handle missing arguments"
                            variant="info"
                            className="mt-7"
                        >
                            <p>
                                A default value is used only when the corresponding
                                argument is missing or explicitly <code>undefined</code>.
                            </p>
                        </Callout>
                        <CodeBlock
                            code={defaultCode}
                            filename="default-parameter.js"
                            language="JavaScript"
                            className="mt-5"
                        />
                    </section>

                    <section aria-labelledby="return-values">
                        <p className="font-bold text-brand">Outputs</p>
                        <h2
                            id="return-values"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Return replaces the call with a value
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            A function call is an expression. When the function returns,
                            its call expression becomes the returned value, so that value
                            can be stored, compared, displayed or passed into another
                            function.
                        </p>
                        <CodeBlock
                            code={returnCode}
                            filename="return-value.js"
                            language="JavaScript"
                            className="mt-7"
                        />
                        <Callout
                            title="Return and console.log are different"
                            variant="warning"
                            className="mt-7"
                        >
                            <p>
                                <code>console.log</code> displays a value for a human.
                                <code>return</code> gives a value back to program code. A
                                function without an explicit return produces
                                <code>undefined</code>.
                            </p>
                        </Callout>
                    </section>

                    <section aria-labelledby="local-scope">
                        <p className="font-bold text-brand">Private working space</p>
                        <h2
                            id="local-scope"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Each call receives its own local scope
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            Parameters and variables declared inside a function are local
                            to that call. The function can read outer variables, but outer
                            code cannot reach into the function and read its local values.
                        </p>
                        <CodeBlock
                            code={scopeCode}
                            filename="function-scope.js"
                            language="JavaScript"
                            className="mt-7"
                        />
                        <div className="mt-7 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-brand/40 bg-brand-soft p-5">
                                <h3 className="font-display font-bold">Call frame created</h3>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    Parameters and local variables live in temporary
                                    storage for this call.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-success/40 bg-success-soft p-5">
                                <h3 className="font-display font-bold">Result returned</h3>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    The caller receives the returned value before
                                    continuing its next operation.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border bg-surface p-5">
                                <h3 className="font-display font-bold">Frame removed</h3>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    Local names stop being available when the call has
                                    finished.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="function-quality">
                        <p className="font-bold text-brand">Designing useful functions</p>
                        <h2
                            id="function-quality"
                            className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                        >
                            Prefer one clear responsibility
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            A good beginner rule is that a function should do one
                            describable job. Names such as <code>calculateTotal</code> or
                            <code>isPassing</code> communicate intent more clearly than
                            vague names such as <code>process</code> or <code>doStuff</code>.
                        </p>
                        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                            <li className="rounded-2xl border border-border bg-surface p-5">
                                <h3 className="font-display font-bold">
                                    Make inputs explicit
                                </h3>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    Prefer parameters over secretly depending on many
                                    changing outer variables.
                                </p>
                            </li>
                            <li className="rounded-2xl border border-border bg-surface p-5">
                                <h3 className="font-display font-bold">
                                    Return useful results
                                </h3>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    Let the caller decide whether to store, display or
                                    combine the result.
                                </p>
                            </li>
                        </ul>
                    </section>

                    <section aria-labelledby="practice-exercise">
                        <div className="flex items-center gap-3">
                            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                <Target aria-hidden="true" className="size-5" />
                            </span>
                            <div>
                                <p className="font-bold text-brand">
                                    Practical exercise
                                </p>
                                <h2
                                    id="practice-exercise"
                                    className="font-display text-3xl font-extrabold tracking-tight"
                                >
                                    Convert minutes into seconds
                                </h2>
                            </div>
                        </div>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            Complete the function name, parameter and returned expression.
                            A call with 4 should return 240.
                        </p>
                        <CodeBlock
                            code={exerciseCode}
                            filename="minutes-to-seconds.js"
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
                        question="What value is stored in answer after this call?"
                        code={quizCode}
                        options={[
                            { id: "six", label: "6" },
                            { id: "twelve", label: "12" },
                            { id: "undefined", label: "undefined" },
                            { id: "result-name", label: 'The text "result"' },
                        ]}
                        correctOptionId="twelve"
                        explanation="The argument 6 is assigned to number. The local result becomes 12, and return sends 12 back to the call site, where it is stored in answer."
                    />

                    <section className="rounded-3xl border border-brand/40 bg-brand-soft p-7 sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-bold text-brand">
                                    Explore the complete call lifecycle
                                </p>
                                <h2 className="mt-2 font-display text-2xl font-extrabold">
                                    Experiment in the Function Call Flow Lab
                                </h2>
                                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                                    Change the arguments, then trace parameter binding,
                                    local scope, the returned result and the resumed caller.
                                </p>
                            </div>
                            <ButtonLink
                                href="/visualizations/programming-fundamentals/function-call"
                                size="lg"
                                className="shrink-0"
                            >
                                <Braces aria-hidden="true" className="size-5" />
                                Open lab
                            </ButtonLink>
                        </div>
                    </section>

                    <nav
                        aria-label="Lesson navigation"
                        className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <Link
                            href="/learn/programming-fundamentals/loops"
                            className="inline-flex items-center gap-2 rounded-lg font-bold text-muted-foreground transition hover:text-brand"
                        >
                            <ArrowLeft aria-hidden="true" className="size-4" />
                            Loops and repetition
                        </Link>
                        <Link
                            href="/learn/programming-fundamentals"
                            className="inline-flex items-center gap-2 rounded-lg font-bold text-brand transition hover:text-brand-strong"
                        >
                            Programming Fundamentals
                            <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                    </nav>
                </div>
            </article>
        </main>
    );
}
