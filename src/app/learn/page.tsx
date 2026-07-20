import type { Metadata } from "next";

import { CourseCard } from "@/components/home/course-card";
import { Header } from "@/components/layout/header";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Learning Paths",
  description:
    "Explore interactive programming, frontend, backend, database, caching and event-driven system learning paths.",
};

export default function LearningPathsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <p className="font-semibold text-blue-600">Learning paths</p>

            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              Build your development knowledge step by step
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Start with programming fundamentals and progress toward frontend,
              backend, databases, caching and event-driven architecture.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}