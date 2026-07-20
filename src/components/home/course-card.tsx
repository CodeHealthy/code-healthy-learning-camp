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
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon aria-hidden="true" className="size-6" />
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isAvailable
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {isAvailable ? "Start learning" : "Coming soon"}
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-950">{course.title}</h3>

      <p className="mt-3 flex-1 leading-7 text-slate-600">
        {course.description}
      </p>

      {isAvailable ? (
        <Link
          href={course.href}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
        >
          Explore course
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      ) : (
        <span className="mt-6 text-sm font-medium text-slate-400">
          Content is being prepared
        </span>
      )}
    </article>
  );
}