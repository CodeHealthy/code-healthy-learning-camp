import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
    ArrowRight,
    Braces,
    Database,
    GitBranch,
    MemoryStick,
    MessageSquareMore,
    Network,
    Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/buttons";
import { ContentCard } from "@/components/ui/content-card";

export const metadata: Metadata = {
    title: "Interactive Visualizations",
    description:
        "Explore visual demonstrations of programming, React, Redis, Kafka, SQL, backend architecture and other development concepts.",
};

interface Visualization {
    id: string;
    title: string;
    description: string;
    category: string;
    icon: LucideIcon;
    available: boolean;
    href?: string;
}

const visualizations: Visualization[] = [
    {
        id: "variable-memory",
        title: "Variable Memory Flow",
        description:
            "Watch a variable being declared, assigned, read and updated inside a simplified program memory model.",
        category: "Programming Fundamentals",
        icon: MemoryStick,
        available: true,
        href: "/visualizations/programming-fundamentals/variable-memory",
    },
    {
        id: "decision-flow",
        title: "Decision Flow",
        description:
            "Follow comparisons, logical operators, short-circuit evaluation and conditional branch selection step by step.",
        category: "Programming Fundamentals",
        icon: GitBranch,
        available: true,
        href: "/visualizations/programming-fundamentals/decision-flow",
    },
    {
        id: "react-state",
        title: "React State Update",
        description:
            "Follow a user event through an event handler, state update and component re-render.",
        category: "React",
        icon: Braces,
        available: false,
    },
    {
        id: "spring-request",
        title: "Spring Boot Request Flow",
        description:
            "Track an HTTP request through the controller, service, repository and database layers.",
        category: "Spring Boot",
        icon: Workflow,
        available: false,
    },
    {
        id: "redis-cache",
        title: "Redis Cache Hit and Miss",
        description:
            "Compare how an application responds when data is found in Redis versus retrieved from a database.",
        category: "Redis",
        icon: Database,
        available: false,
    },
    {
        id: "kafka-message",
        title: "Kafka Message Journey",
        description:
            "See a producer publish records across brokers, partitions and consumer groups.",
        category: "Apache Kafka",
        icon: MessageSquareMore,
        available: false,
    },
    {
        id: "sql-join",
        title: "SQL Join Visualizer",
        description:
            "Explore how inner, left, right and full joins combine rows from related tables.",
        category: "SQL",
        icon: GitBranch,
        available: false,
    },
    {
        id: "nosql-document",
        title: "NoSQL Document Model",
        description:
            "Compare normalized relational records with nested document-oriented data.",
        category: "NoSQL",
        icon: Network,
        available: false,
    },
];

export default function VisualizationsPage() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-background text-foreground"
        >
            <section className="relative overflow-hidden border-b border-border bg-surface">
                <div
                    aria-hidden="true"
                    className="absolute -top-44 right-0 size-[520px] rounded-full bg-brand-soft blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="absolute -bottom-56 -left-40 size-[460px] rounded-full bg-accent-soft blur-3xl"
                />

                <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
                    <Badge variant="brand" icon={Workflow}>
                        Interactive learning
                    </Badge>

                    <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Understand technology by{" "}
                        <span className="text-brand">watching it work.</span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                        Explore step-by-step visual demonstrations that reveal how
                        programming concepts, frameworks, databases and distributed
                        systems behave internally.
                    </p>

                    <div className="mt-9">
                        <ButtonLink
                            href="/visualizations/programming-fundamentals/variable-memory"
                            size="lg"
                        >
                            Launch Variable Memory Lab
                            <ArrowRight aria-hidden="true" className="size-5" />
                        </ButtonLink>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
                <div className="max-w-3xl">
                    <p className="font-bold text-brand">Visualization library</p>

                    <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Explore concepts visually
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-muted-foreground">
                        Each visualization will include playback controls, guided steps,
                        plain-language explanations and reduced-motion support.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {visualizations.map((visualization) => {
                        const Icon = visualization.icon;

                        return (
                            <ContentCard
                                key={visualization.id}
                                icon={Icon}
                                eyebrow={visualization.category}
                                title={visualization.title}
                                description={visualization.description}
                                className="flex h-full flex-col"
                                footer={
                                    visualization.available && visualization.href ? (
                                        <div className="flex items-center justify-between gap-4">
                                            <Badge variant="success">Available</Badge>

                                            <ButtonLink
                                                href={visualization.href}
                                                variant="ghost"
                                                size="sm"
                                            >
                                                Open
                                                <ArrowRight
                                                    aria-hidden="true"
                                                    className="size-4"
                                                />
                                            </ButtonLink>
                                        </div>
                                    ) : (
                                        <Badge variant="neutral">Coming soon</Badge>
                                    )
                                }
                            />
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
