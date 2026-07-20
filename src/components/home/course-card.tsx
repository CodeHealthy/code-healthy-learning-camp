import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const Icon = course.icon;
  const isAvailable = course.status === "available";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-xl">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-brand opacity-0 transition group-hover:opacity-100"
      />

      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="flex size-13 items-center justify-center rounded-2xl bg-brand-soft text-brand transition group-hover:scale-105">
          <Icon aria-hidden="true" className="size-6" />
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            isAvailable
              ? "bg-accent-soft text-accent-strong"
              : "bg-surface-muted text-muted-foreground"
          }`}
        >
          {isAvailable ? "Available" : "Coming soon"}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold text-foreground">
        {course.title}
      </h3>

      <p className="mt-3 flex-1 leading-7 text-muted-foreground">
        {course.description}
      </p>

      {isAvailable ? (
        <Link
          href={course.href}
          className="mt-7 inline-flex items-center gap-2 font-bold text-brand transition hover:text-brand-strong"
        >
          Explore course

          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      ) : (
        <span className="mt-7 text-sm font-semibold text-muted-foreground">
          Content is being prepared
        </span>
      )}
    </article>
  );
}