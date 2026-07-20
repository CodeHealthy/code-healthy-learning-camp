import type { Metadata } from "next";

import { CourseCard } from "@/components/home/course-card";
import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/site-footer";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Learning Paths",
  description:
    "Explore interactive programming, frontend, backend, database, caching and event-driven system learning paths.",
};

export default function LearningPathsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-border bg-surface">
          <div
            aria-hidden="true"
            className="absolute -top-40 right-0 size-[500px] rounded-full bg-brand-soft blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-52 -left-40 size-[480px] rounded-full bg-accent-soft blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
            <p className="font-bold text-brand">Learning paths</p>

            <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build your development knowledge{" "}
              <span className="text-brand">step by step.</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              Start with programming fundamentals and progress toward frontend,
              backend, databases, caching and event-driven architecture.
            </p>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mb-10 max-w-3xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
                Explore available learning paths
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                Each path combines simple explanations, visual demonstrations,
                practical examples and interactive exercises.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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