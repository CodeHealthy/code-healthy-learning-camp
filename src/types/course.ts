import type { LucideIcon } from "lucide-react";

export type CourseStatus = "available" | "coming-soon";

export interface Course {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  status: CourseStatus;
}