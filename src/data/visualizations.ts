import type { LucideIcon } from "lucide-react";
import {
    Braces,
    Database,
    GitBranch,
    MemoryStick,
    MessageSquareMore,
    Network,
    Repeat2,
    Workflow,
} from "lucide-react";

export interface VisualizationCategory {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    href?: string;
    learningPathHref?: string;
}

export interface Visualization {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    icon: LucideIcon;
    available: boolean;
    href?: string;
    lessonHref?: string;
}

export const visualizationCategories: VisualizationCategory[] = [
    {
        id: "programming-fundamentals",
        title: "Programming Fundamentals",
        description:
            "Build accurate mental models for memory, decisions and repetition before moving into larger systems.",
        icon: Braces,
        href: "/visualizations/programming-fundamentals",
        learningPathHref: "/learn/programming-fundamentals",
    },
    {
        id: "react",
        title: "React",
        description:
            "See how events, state and rendering work together inside a modern interface.",
        icon: Braces,
    },
    {
        id: "spring-boot",
        title: "Spring Boot",
        description:
            "Follow requests through the layers of a production-style backend application.",
        icon: Workflow,
    },
    {
        id: "redis",
        title: "Redis",
        description:
            "Understand caching behavior and the data paths behind fast application responses.",
        icon: Database,
    },
    {
        id: "apache-kafka",
        title: "Apache Kafka",
        description:
            "Trace records across producers, brokers, partitions and consumer groups.",
        icon: MessageSquareMore,
    },
    {
        id: "sql",
        title: "SQL",
        description:
            "Explore how relational operations transform and connect structured data.",
        icon: GitBranch,
    },
    {
        id: "nosql",
        title: "NoSQL",
        description:
            "Compare document-oriented data models with familiar relational structures.",
        icon: Network,
    },
];

export const visualizations: Visualization[] = [
    {
        id: "variable-memory",
        title: "Variable Memory Flow",
        description:
            "Watch a variable being declared, assigned, read and updated inside a simplified program memory model.",
        categoryId: "programming-fundamentals",
        icon: MemoryStick,
        available: true,
        href: "/visualizations/programming-fundamentals/variable-memory",
        lessonHref: "/learn/programming-fundamentals/variables",
    },
    {
        id: "decision-flow",
        title: "Decision Flow",
        description:
            "Follow comparisons, logical operators, short-circuit evaluation and conditional branch selection step by step.",
        categoryId: "programming-fundamentals",
        icon: GitBranch,
        available: true,
        href: "/visualizations/programming-fundamentals/decision-flow",
        lessonHref: "/learn/programming-fundamentals/conditions",
    },
    {
        id: "loop-execution",
        title: "Loop Execution Timeline",
        description:
            "Trace initialization, repeated checks, body execution, counter updates and the final stopping condition.",
        categoryId: "programming-fundamentals",
        icon: Repeat2,
        available: true,
        href: "/visualizations/programming-fundamentals/loop-execution",
        lessonHref: "/learn/programming-fundamentals/loops",
    },
    {
        id: "react-state",
        title: "React State Update",
        description:
            "Follow a user event through an event handler, state update and component re-render.",
        categoryId: "react",
        icon: Braces,
        available: false,
    },
    {
        id: "spring-request",
        title: "Spring Boot Request Flow",
        description:
            "Track an HTTP request through the controller, service, repository and database layers.",
        categoryId: "spring-boot",
        icon: Workflow,
        available: false,
    },
    {
        id: "redis-cache",
        title: "Redis Cache Hit and Miss",
        description:
            "Compare how an application responds when data is found in Redis versus retrieved from a database.",
        categoryId: "redis",
        icon: Database,
        available: false,
    },
    {
        id: "kafka-message",
        title: "Kafka Message Journey",
        description:
            "See a producer publish records across brokers, partitions and consumer groups.",
        categoryId: "apache-kafka",
        icon: MessageSquareMore,
        available: false,
    },
    {
        id: "sql-join",
        title: "SQL Join Visualizer",
        description:
            "Explore how inner, left, right and full joins combine rows from related tables.",
        categoryId: "sql",
        icon: GitBranch,
        available: false,
    },
    {
        id: "nosql-document",
        title: "NoSQL Document Model",
        description:
            "Compare normalized relational records with nested document-oriented data.",
        categoryId: "nosql",
        icon: Network,
        available: false,
    },
];

export function getVisualizationCategory(categoryId: string) {
    return visualizationCategories.find((category) => category.id === categoryId);
}

export function getVisualizationsByCategory(categoryId: string) {
    return visualizations.filter(
        (visualization) => visualization.categoryId === categoryId,
    );
}

export function getAvailableVisualizationsByCategory(categoryId: string) {
    return getVisualizationsByCategory(categoryId).filter(
        (visualization) => visualization.available && visualization.href,
    );
}

export function getVisualizationSequence(currentVisualizationId: string) {
    const current = visualizations.find(
        (visualization) => visualization.id === currentVisualizationId,
    );

    if (!current) {
        return undefined;
    }

    const category = getVisualizationCategory(current.categoryId);
    const categoryVisualizations = getAvailableVisualizationsByCategory(
        current.categoryId,
    );
    const currentIndex = categoryVisualizations.findIndex(
        (visualization) => visualization.id === currentVisualizationId,
    );

    if (!category || currentIndex === -1) {
        return undefined;
    }

    return {
        category,
        current,
        currentIndex,
        total: categoryVisualizations.length,
        previous: categoryVisualizations[currentIndex - 1],
        next: categoryVisualizations[currentIndex + 1],
    };
}
