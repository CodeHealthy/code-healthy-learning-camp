import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CirclePlay,
  Code2,
  Sparkles,
} from "lucide-react";

import { CourseCard } from "@/components/home/course-card";
import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/site-footer";
import { courses } from "@/data/courses";

const learningFeatures = [
  {
    title: "Simple explanations",
    description:
      "Every concept begins with plain language before introducing technical detail.",
    icon: BookOpenCheck,
  },
  {
    title: "Visual learning",
    description:
      "Animations and diagrams reveal what happens internally, one step at a time.",
    icon: BrainCircuit,
  },
  {
    title: "Practical examples",
    description:
      "Focused examples connect programming concepts with realistic development situations.",
    icon: Code2,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-border bg-surface">
          <div
            aria-hidden="true"
            className="absolute -top-32 right-0 size-[520px] rounded-full bg-brand-soft blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-48 -left-32 size-[480px] rounded-full bg-accent-soft blur-3xl"
          />

          <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2 text-sm font-bold text-brand shadow-sm">
                <Sparkles aria-hidden="true" className="size-4" />
                Learn by seeing how technology works
              </span>

              <h1 className="mt-7 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Build stronger development knowledge through{" "}
                <span className="text-brand">
                  interactive learning.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                CodeHealthyLearningCamp makes complex programming concepts
                easier through simple explanations, animated visualizations,
                practical examples and guided exercises.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/learn/programming-fundamentals"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-xl"
                >
                  Begin your first lesson
                  <ArrowRight aria-hidden="true" className="size-5" />
                </Link>

                <Link
                  href="#courses"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3.5 font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-md"
                >
                  <CirclePlay aria-hidden="true" className="size-5" />
                  Explore topics
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-muted-foreground">
                <span>No signup required</span>
                <span>Beginner friendly</span>
                <span>Interactive examples</span>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-[36px] bg-brand-soft blur-2xl"
              />

              <div className="relative overflow-hidden rounded-3xl border border-border bg-code-background text-code-foreground shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-red-400" />
                    <span className="size-3 rounded-full bg-amber-400" />
                    <span className="size-3 rounded-full bg-emerald-400" />
                  </div>

                  <span className="font-mono text-xs text-slate-400">
                    react-state-flow.tsx
                  </span>
                </div>

                <div className="space-y-5 p-6 sm:p-8">
                  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                    <p className="text-sm font-semibold text-slate-400">
                      1. Student action
                    </p>

                    <p className="mt-3 font-mono text-blue-300">
                      button.click()
                    </p>
                  </div>

                  <div className="mx-auto h-8 w-px bg-blue-400" />

                  <div className="rounded-2xl border border-blue-500 bg-blue-950 p-5">
                    <p className="text-sm font-semibold text-blue-200">
                      2. React updates state
                    </p>

                    <p className="mt-3 font-mono text-blue-300">
                      setCount(count + 1)
                    </p>
                  </div>

                  <div className="mx-auto h-8 w-px bg-emerald-400" />

                  <div className="rounded-2xl border border-emerald-500 bg-emerald-950 p-5">
                    <p className="text-sm font-semibold text-emerald-200">
                      3. Interface renders again
                    </p>

                    <p className="mt-3 font-mono text-emerald-300">
                      Screen displays the new count
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {learningFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-border bg-surface p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand hover:shadow-lg"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>

                  <h2 className="mt-6 font-display text-xl font-bold">
                    {feature.title}
                  </h2>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="courses"
          className="border-y border-border bg-surface-muted"
        >
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-3xl">
              <p className="font-bold text-brand">Learning paths</p>

              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Choose what you want to understand
              </h2>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Begin with programming fundamentals, then progress toward
                frontend, backend, databases, caching and event-driven systems.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}