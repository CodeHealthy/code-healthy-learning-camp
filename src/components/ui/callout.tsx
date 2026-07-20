import type { ReactNode } from "react";
import {
    CircleAlert,
    Info,
    Lightbulb,
    TriangleAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "tip" | "warning" | "danger";

interface CalloutProps {
    title: string;
    children: ReactNode;
    variant?: CalloutVariant;
    className?: string;
}

const variantConfig = {
    info: {
        icon: Info,
        container: "border-brand/40 bg-brand-soft",
        iconContainer: "bg-surface text-brand",
    },
    tip: {
        icon: Lightbulb,
        container: "border-success/40 bg-success-soft",
        iconContainer: "bg-surface text-success",
    },
    warning: {
        icon: TriangleAlert,
        container: "border-warning/40 bg-warning-soft",
        iconContainer: "bg-surface text-warning",
    },
    danger: {
        icon: CircleAlert,
        container: "border-danger/40 bg-danger-soft",
        iconContainer: "bg-surface text-danger",
    },
} satisfies Record<
    CalloutVariant,
    {
        icon: typeof Info;
        container: string;
        iconContainer: string;
    }
>;

export function Callout({
    title,
    children,
    variant = "info",
    className,
}: CalloutProps) {
    const configuration = variantConfig[variant];
    const Icon = configuration.icon;

    return (
        <aside
            role={variant === "danger" ? "alert" : undefined}
            className={cn(
                "rounded-2xl border p-6",
                configuration.container,
                className,
            )}
        >
            <div className="flex gap-4">
                <span
                    className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl shadow-sm",
                        configuration.iconContainer,
                    )}
                >
                    <Icon aria-hidden="true" className="size-5" />
                </span>

                <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                        {title}
                    </h3>

                    <div className="mt-2 leading-7 text-muted-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </aside>
    );
}