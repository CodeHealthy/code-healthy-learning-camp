import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Braces,
  CheckCircle2,
  Clock3,
  LockKeyhole,
} from "lucide-react";

import { Header } from "@/components/layout/header";

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
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
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

                <li className="font-medium text-slate-700">
                  Programming Fundamentals
                </li>
              </ol>
            </nav>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Braces aria-hidden="true" className="size-8" />
                </span>

                <p className="mt-6 font-semibold text-blue-600">
                  Beginner learning path
                </p>

                <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
                  Programming Fundamentals
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  Develop the mental models needed to understand how programs
                  store information, make decisions, repeat work and organize
                  reusable instructions.
                </p>

                <div className="mt-8 flex flex-wrap gap-5 text-sm font-medium text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <BookOpen aria-hidden="true" className="size-4" />
                    {lessons.length} lessons
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Clock3 aria-hidden="true" className="size-4" />
                    Approximately 1 hour
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-4 text-emerald-600"
                    />
                    No previous experience required
                  </span>
                </div>
              </div>

              <Link
                href="/learn/programming-fundamentals/variables"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Start first lesson
                <ArrowRight aria-hidden="true" className="size-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <div>
            <p className="font-semibold text-blue-600">Course lessons</p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Start with the building blocks
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {lessons.map((lesson) => (
              <article
                key={lesson.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700">
                    {lesson.number}
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold">{lesson.title}</h3>

                      {!lesson.available && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          <LockKeyhole
                            aria-hidden="true"
                            className="size-3"
                          />
                          Coming soon
                        </span>
                      )}
                    </div>

                    <p className="mt-2 leading-7 text-slate-600">
                      {lesson.description}
                    </p>

                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 aria-hidden="true" className="size-4" />
                      {lesson.duration}
                    </p>
                  </div>

                  {lesson.available ? (
                    <Link
                      href={lesson.href}
                      className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Start lesson
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-slate-400">
                      Not yet available
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}