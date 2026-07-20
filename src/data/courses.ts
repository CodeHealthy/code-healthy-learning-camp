import {
  Braces,
  Boxes,
  Coffee,
  Database,
  GitBranch,
  Layers3,
  MessageSquareMore,
  Network,
} from "lucide-react";

import type { Course } from "@/types/course";

export const courses: Course[] = [
  {
    id: "programming-fundamentals",
    title: "Programming Fundamentals",
    description:
      "Understand variables, conditions, loops, functions, memory, algorithms and problem-solving.",
    href: "/learn/programming-fundamentals",
    icon: Braces,
    status: "available",
  },
  {
    id: "oop",
    title: "Object-Oriented Programming",
    description:
      "Learn classes, objects, encapsulation, inheritance, polymorphism, abstraction and composition.",
    href: "/learn/oop",
    icon: Boxes,
    status: "coming-soon",
  },
  {
    id: "react",
    title: "React",
    description:
      "Learn components, props, state, hooks, rendering, routing and modern React architecture.",
    href: "/learn/react",
    icon: Layers3,
    status: "coming-soon",
  },
  {
    id: "spring-boot",
    title: "Spring Boot",
    description:
      "Follow requests through controllers, services, repositories, security and databases.",
    href: "/learn/spring-boot",
    icon: Coffee,
    status: "coming-soon",
  },
  {
    id: "redis",
    title: "Redis",
    description:
      "Visualize caching, cache hits, cache misses, expiration, Pub/Sub and common Redis patterns.",
    href: "/learn/redis",
    icon: Database,
    status: "coming-soon",
  },
  {
    id: "apache-kafka",
    title: "Apache Kafka",
    description:
      "Explore producers, brokers, topics, partitions, consumer groups, offsets and replication.",
    href: "/learn/apache-kafka",
    icon: MessageSquareMore,
    status: "coming-soon",
  },
  {
    id: "sql",
    title: "SQL",
    description:
      "Practise tables, relationships, queries, joins, indexes, normalization and transactions.",
    href: "/learn/sql",
    icon: GitBranch,
    status: "coming-soon",
  },
  {
    id: "nosql",
    title: "NoSQL",
    description:
      "Understand documents, key-value data, data modelling, partitioning and replication.",
    href: "/learn/nosql",
    icon: Network,
    status: "coming-soon",
  },
];