import type { Metadata } from "next";
import {
    ArrowRight,
    BookOpenCheck,
    BrainCircuit,
    Briefcase,
    Code2,
    ExternalLink,
    GraduationCap,
    Mail,
    UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/buttons";
import { ContentCard } from "@/components/ui/content-card";
import { DeveloperAvatar } from "@/components/about/developer-avatar";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Muhammad Yeshar, the developer behind CodeHealthyLearningCamp, and the purpose of the interactive learning platform.",
};

const learningPrinciples = [
    {
        title: "Simple explanations",
        description:
            "Complex topics begin with clear language before moving into technical details.",
        icon: BookOpenCheck,
    },
    {
        title: "Visual understanding",
        description:
            "Animations demonstrate how programming concepts and technologies work internally.",
        icon: BrainCircuit,
    },
    {
        title: "Practical learning",
        description:
            "Lessons connect concepts with focused code examples, exercises and real development scenarios.",
        icon: Code2,
    },
];

export default function AboutPage() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-background text-foreground"
        >
            <section className="relative overflow-hidden border-b border-border bg-surface">
                <div
                    aria-hidden="true"
                    className="absolute -top-48 right-0 size-[520px] rounded-full bg-brand-soft blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="absolute -bottom-52 -left-40 size-[460px] rounded-full bg-accent-soft blur-3xl"
                />

                <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
                    <Badge variant="brand" icon={UserRound}>
                        About the author
                    </Badge>

                    <h1 className="mt-6 max-w-5xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Built to make software development{" "}
                        <span className="text-brand">
                            easier to understand.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                        CodeHealthyLearningCamp is created by Muhammad Yeshar to help
                        students and fellow developers understand programming concepts through
                        clear lessons, practical examples and interactive visualizations.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <ButtonLink href="/learn" size="lg">
                            Explore learning paths
                            <ArrowRight aria-hidden="true" className="size-5" />
                        </ButtonLink>

                        <ButtonLink
                            href="/visualizations"
                            variant="secondary"
                            size="lg"
                        >
                            Explore visualizations
                            <BrainCircuit aria-hidden="true" className="size-5" />
                        </ButtonLink>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-stretch">
                    <aside className="h-full overflow-hidden rounded-3xl border border-border bg-surface shadow-lg">
                        <div className="border-b border-border bg-brand-soft p-7">
                            <div className="flex items-center gap-5">
                                <DeveloperAvatar className="size-24 shrink-0" />

                                <div>
                                    <p className="text-sm font-bold text-brand">
                                        Author and developer
                                    </p>

                                    <h2 className="mt-1 font-display text-2xl font-extrabold">
                                        Muhammad Yeshar
                                    </h2>

                                    <p className="mt-1 font-semibold text-muted-foreground">
                                        Full Stack Developer
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-7">
                            <p className="leading-7 text-muted-foreground">
                                I build frontend applications, backend services and distributed
                                systems using technologies such as React, Spring Boot, Redis,
                                Apache Kafka and relational and NoSQL databases.
                            </p>

                            <div className="mt-6 grid gap-3">
                                <div className="flex gap-3 rounded-2xl bg-surface-muted p-4">
                                    <Briefcase
                                        aria-hidden="true"
                                        className="mt-1 size-5 shrink-0 text-brand"
                                    />

                                    <div>
                                        <p className="text-sm font-bold text-foreground">
                                            Professional role
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                            Software Developer at Workstream Automation Ltd.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 rounded-2xl bg-surface-muted p-4">
                                    <GraduationCap
                                        aria-hidden="true"
                                        className="mt-1 size-5 shrink-0 text-brand"
                                    />

                                    <div>
                                        <p className="text-sm font-bold text-foreground">
                                            Continuing education
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                            Pursuing an MS in Data Science at NED University.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {[
                                    "React",
                                    "Spring Boot",
                                    "Redis",
                                    "Kafka",
                                    "SQL",
                                    "NoSQL",
                                ].map((technology) => (
                                    <span
                                        key={technology}
                                        className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand"
                                    >
                                        {technology}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-7 grid gap-2 sm:grid-cols-3">
                                <a
                                    href="https://github.com/CodeHealthy"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm font-bold text-foreground transition hover:border-brand hover:bg-brand-soft hover:text-brand"
                                >
                                    GitHub
                                    <ExternalLink aria-hidden="true" className="size-3.5" />
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/iamyeshar"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm font-bold text-foreground transition hover:border-brand hover:bg-brand-soft hover:text-brand"
                                >
                                    LinkedIn
                                    <ExternalLink aria-hidden="true" className="size-3.5" />
                                </a>

                                <a
                                    href="mailto:iamyeshar@gmail.com"
                                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm font-bold text-foreground transition hover:border-brand hover:bg-brand-soft hover:text-brand"
                                >
                                    <Mail aria-hidden="true" className="size-4" />
                                    Email
                                </a>
                            </div>

                            <a
                                href="https://muhammad-yeshar.netlify.app"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-5 inline-flex items-center gap-2 font-bold text-brand transition hover:text-brand-strong"
                            >
                                View developer portfolio
                                <ExternalLink aria-hidden="true" className="size-4" />
                            </a>
                        </div>
                    </aside>

                    <div className="flex h-full min-w-0 flex-col">
                        <Badge variant="success" icon={BrainCircuit}>
                            Why I created this platform
                        </Badge>

                        <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Sharing development knowledge through clear and visual learning
                        </h2>

                        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-muted-foreground">
                            <p>
                                Many tutorials begin with syntax without properly explaining the
                                problem being solved or what happens behind the scenes.
                            </p>

                            <p>
                                CodeHealthyLearningCamp combines structured lessons with interactive
                                visualization laboratories so learners can first understand a
                                concept and then watch it work.
                            </p>
                        </div>

                        <div className="mt-9 grid flex-1 gap-5 sm:grid-cols-2 sm:grid-rows-2">
                            <ContentCard
                                icon={BookOpenCheck}
                                title="Simple explanations"
                                description="Each topic begins with clear language and a useful mental model before introducing technical details."
                                className="h-full"
                            />

                            <ContentCard
                                icon={BrainCircuit}
                                title="Visual understanding"
                                description="Animations reveal how information, requests and events move through an application or technology."
                                className="h-full"
                            />

                            <ContentCard
                                icon={Code2}
                                title="Practical learning"
                                description="Lessons connect concepts with focused code examples, exercises and realistic development scenarios."
                                className="h-full sm:col-span-2"
                            >
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">
                                        Learn the concept
                                    </span>

                                    <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                                        Watch the process
                                    </span>

                                    <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                                        Practise with code
                                    </span>
                                </div>
                            </ContentCard>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-border bg-surface-muted">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge variant="brand" icon={Code2}>
                            Start learning
                        </Badge>

                        <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Learn the concept, then watch it work
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            Follow structured learning paths for complete explanations and
                            use visualization laboratories to explore important processes
                            interactively.
                        </p>

                        <div className="mt-8">
                            <ButtonLink href="/learn" size="lg">
                                Browse learning paths
                                <ArrowRight aria-hidden="true" className="size-5" />
                            </ButtonLink>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}