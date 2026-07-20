import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Braces,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";


export const metadata: Metadata = {
  title: "Programming Fundamentals",
  description:
    "Learn variables, conditions, loops, functions, memory, data structures and problem-solving through visual lessons.",
};

const lessons = [
  {
    number: 1,
    title: "Variables and values",
    description:
      "Understand how programs name, store, read and update information.",
    href: "/learn/programming-fundamentals/variables",
    duration: "10 minutes",
    available: true,
  },
  {
    number: 2,
    title: "Conditions and decisions",
    description:
      "Learn how programs make decisions using Boolean expressions and conditions.",
    href: "/learn/programming-fundamentals/conditions",
    duration: "12 minutes",
    available: false,
  },
  {
    number: 3,
    title: "Loops and repetition",
    description:
      "Visualize how loops repeatedly execute instructions until a condition changes.",
    href: "/learn/programming-fundamentals/loops",
    duration: "15 minutes",
    available: false,
  },
  {
    number: 4,
    title: "Functions",
    description:
      "Learn how functions organize reusable behaviour, inputs and outputs.",
    href: "/learn/programming-fundamentals/functions",
    duration: "15 minutes",
    available: false,
  },
];

export default function ProgrammingFundamentalsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-border bg-surface">
          <div
            aria-hidden="true"
            className="absolute -top-48 right-0 size-[520px] rounded-full bg-brand-soft blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-52 -left-36 size-[460px] rounded-full bg-accent-soft blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-20">
            <Breadcrumbs
              items={[
                {
                  label: "Learning Paths",
                  href: "/learn",
                },
                {
                  label: "Programming Fundamentals",
                },
              ]}
            />

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand shadow-sm">
                  <Braces aria-hidden="true" className="size-7" />
                </span>

                <p className="mt-7 inline-flex items-center gap-2 font-bold text-brand">
                  <Sparkles aria-hidden="true" className="size-4" />
                  Beginner learning path
                </p>

                <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  Programming{" "}
                  <span className="text-brand">Fundamentals</span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Develop the mental models needed to understand how programs
                  store information, make decisions, repeat work and organize
                  reusable instructions.
                </p>

                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <BookOpen aria-hidden="true" className="size-4 text-brand" />
                    {lessons.length} lessons
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Clock3 aria-hidden="true" className="size-4 text-brand" />
                    Approximately 1 hour
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-4 text-success"
                    />
                    No previous experience required
                  </span>
                </div>
              </div>

              <Link
                href="/learn/programming-fundamentals/variables"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-xl"
              >
                Start first lesson
                <ArrowRight aria-hidden="true" className="size-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
            <div className="max-w-3xl">
              <p className="font-bold text-brand">Course lessons</p>

              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Start with the building blocks
              </h2>

              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Complete each lesson in order to build a clear understanding of
                the concepts used throughout software development.
              </p>
            </div>

            <div className="mt-10 space-y-5">
              {lessons.map((lesson) => (
                <article
                  key={lesson.number}
                  className={`group relative overflow-hidden rounded-3xl border bg-surface p-6 shadow-sm transition sm:p-7 ${
                    lesson.available
                      ? "border-border hover:-translate-y-1 hover:border-brand hover:shadow-lg"
                      : "border-border"
                  }`}
                >
                  {lesson.available && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 bg-brand"
                    />
                  )}

                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <span
                      className={`flex size-13 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold ${
                        lesson.available
                          ? "bg-brand-soft text-brand"
                          : "bg-surface-muted text-muted-foreground"
                      }`}
                    >
                      {lesson.number}
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-xl font-bold">
                          {lesson.title}
                        </h3>

                        {lesson.available ? (
                          <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                            <LockKeyhole
                              aria-hidden="true"
                              className="size-3"
                            />
                            Coming soon
                          </span>
                        )}
                      </div>

                      <p className="mt-3 leading-7 text-muted-foreground">
                        {lesson.description}
                      </p>

                      <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <Clock3 aria-hidden="true" className="size-4" />
                        {lesson.duration}
                      </p>
                    </div>

                    {lesson.available ? (
                      <Link
                        href={lesson.href}
                        className="inline-flex items-center gap-2 font-bold text-brand transition hover:text-brand-strong"
                      >
                        Start lesson
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold text-muted-foreground">
                        Not yet available
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}