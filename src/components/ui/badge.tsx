import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type BadgeVariant =
    | "brand"
    | "success"
    | "warning"
    | "danger"
    | "neutral";

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    icon?: LucideIcon;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    brand: "bg-brand-soft text-brand",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
    neutral: "bg-surface-muted text-muted-foreground",
};

export function Badge({
    children,
    variant = "neutral",
    icon: Icon,
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1",
                "text-xs font-bold",
                variantClasses[variant],
                className,
            )}
        >
            {Icon && <Icon aria-hidden="true" className="size-3.5" />}

            {children}
        </span>
    );
}
