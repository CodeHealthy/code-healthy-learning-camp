import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CirclePlay,
  Code2,
} from "lucide-react";

import { CourseCard } from "@/components/home/course-card";
import { Header } from "@/components/layout/header";
import { courses } from "@/data/courses";

const learningFeatures = [
  {
    title: "Simple explanations",
    description:
      "Every concept starts with a plain-language explanation before introducing technical detail.",
    icon: BookOpenCheck,
  },
  {
    title: "Visual learning",
    description:
      "Animations and diagrams reveal what is happening internally, one step at a time.",
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
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_40%)]"
          />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
            <div>
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Learn by seeing how technology works
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Build strong development knowledge through interactive learning.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                CodeHealthyLearningCamp makes complex programming concepts easier
                through simple explanations, animated visualizations, practical
                examples and guided exercises.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/learn/programming-fundamentals"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Begin your first lesson
                  <ArrowRight aria-hidden="true" className="size-5" />
                </Link>

                <Link
                  href="#courses"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                >
                  <CirclePlay aria-hidden="true" className="size-5" />
                  Explore topics
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
              </div>

              <div className="space-y-6 py-8">
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">1. Student action</p>
                  <p className="mt-2 font-mono text-blue-300">
                    button.click()
                  </p>
                </div>

                <div className="mx-auto h-8 w-px bg-blue-400" />

                <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 p-4">
                  <p className="text-sm text-blue-200">2. React updates state</p>
                  <p className="mt-2 font-mono text-blue-300">
                    setCount(count + 1)
                  </p>
                </div>

                <div className="mx-auto h-8 w-px bg-blue-400" />

                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                  <p className="text-sm text-emerald-200">
                    3. Interface renders again
                  </p>
                  <p className="mt-2 font-mono text-emerald-300">
                    Screen displays the new count
                  </p>
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
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-8 text-blue-600"
                  />

                  <h2 className="mt-5 text-xl font-bold">{feature.title}</h2>

                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="courses" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-3xl">
              <p className="font-semibold text-blue-600">Learning paths</p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Choose what you want to understand
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                Begin with programming fundamentals, then move toward frontend,
                backend, databases, caching and event-driven systems.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">
            CodeHealthyLearningCamp
          </p>

          <p className="text-sm">
            Learn simply. Visualize clearly. Practise confidently.
          </p>
        </div>
      </footer>
    </div>
  );
}