import type { Metadata } from "next";
import {
    ArrowRight,
    BookOpenCheck,
    BrainCircuit,
    CheckCircle2,
    Code2,
    Eye,
    GraduationCap,
    HeartPulse,
    Keyboard,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/buttons";
import { ContentCard } from "@/components/ui/content-card";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about the purpose, teaching approach and development philosophy behind CodeHealthyLearningCamp.",
};

const learningPrinciples = [
    {
        title: "Explain simply",
        description:
            "Begin with plain language and introduce technical terminology only when it adds value.",
        icon: BookOpenCheck,
    },
    {
        title: "Demonstrate visually",
        description:
            "Show processes moving step by step so learners can build accurate mental models.",
        icon: Eye,
    },
    {
        title: "Practise actively",
        description:
            "Reinforce concepts through focused code examples, exercises and interactive quizzes.",
        icon: Keyboard,
    },
    {
        title: "Connect concepts",
        description:
            "Relate individual technologies to the broader systems developers build in professional projects.",
        icon: BrainCircuit,
    },
];

const platformValues = [
    "Beginner-friendly without oversimplifying important details",
    "Useful for students, self-taught developers and experienced engineers",
    "Accessible with keyboard navigation and reduced-motion support",
    "Structured around practical development knowledge",
    "Designed for comfortable reading in light and dark themes",
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
                    <Badge variant="brand" icon={GraduationCap}>
                        About the learning camp
                    </Badge>

                    <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Making complex development knowledge{" "}
                        <span className="text-brand">easier to understand.</span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                        CodeHealthyLearningCamp is an interactive educational platform for
                        students and developers who want to understand not only how to use
                        technology, but also how it works.
                    </p>

                    <div className="mt-9">
                        <ButtonLink href="/learn" size="lg">
                            Explore learning paths
                            <ArrowRight aria-hidden="true" className="size-5" />
                        </ButtonLink>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div>
                        <Badge variant="success" icon={HeartPulse}>
                            Our purpose
                        </Badge>

                        <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Healthy learning means building knowledge that lasts
                        </h2>

                        <div className="mt-6 space-y-5 text-lg leading-8 text-muted-foreground">
                            <p>
                                Learning becomes difficult when tutorials introduce too many
                                abstractions before explaining the underlying problem.
                            </p>

                            <p>
                                Our goal is to break each subject into understandable steps,
                                visualize the internal process and then connect it with
                                practical code.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        {learningPrinciples.map((principle) => (
                            <ContentCard
                                key={principle.title}
                                icon={principle.icon}
                                title={principle.title}
                                description={principle.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-border bg-surface-muted">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-20">
                    <div>
                        <p className="font-bold text-brand">What you will learn</p>

                        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            From fundamentals to distributed systems
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            The platform will gradually cover programming fundamentals,
                            object-oriented programming, React, Spring Boot, Redis, Apache
                            Kafka, SQL, NoSQL and system-design concepts.
                        </p>

                        <div className="mt-8">
                            <ButtonLink href="/learn" variant="secondary">
                                Browse all topics
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </ButtonLink>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-border bg-surface p-7 shadow-lg sm:p-8">
                        <div className="flex items-center gap-3">
                            <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                                <Code2 aria-hidden="true" className="size-6" />
                            </span>

                            <h3 className="font-display text-2xl font-extrabold">
                                Platform principles
                            </h3>
                        </div>

                        <ul className="mt-7 space-y-4">
                            {platformValues.map((value) => (
                                <li key={value} className="flex gap-3">
                                    <CheckCircle2
                                        aria-hidden="true"
                                        className="mt-1 size-5 shrink-0 text-success"
                                    />

                                    <span className="leading-7 text-muted-foreground">
                                        {value}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}