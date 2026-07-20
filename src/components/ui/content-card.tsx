import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ContentCardProps {
    title?: string;
    description?: string;
    eyebrow?: string;
    icon?: LucideIcon;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
}

export function ContentCard({
    title,
    description,
    eyebrow,
    icon: Icon,
    children,
    footer,
    className,
}: ContentCardProps) {
    return (
        <article
            className={cn(
                "overflow-hidden rounded-3xl border border-border",
                "bg-surface shadow-sm",
                className,
            )}
        >
            <div className="p-6 sm:p-7">
                {(Icon || eyebrow) && (
                    <div className="mb-5 flex items-center gap-3">
                        {Icon && (
                            <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                                <Icon aria-hidden="true" className="size-5" />
                            </span>
                        )}

                        {eyebrow && (
                            <p className="text-sm font-bold text-brand">
                                {eyebrow}
                            </p>
                        )}
                    </div>
                )}

                {title && (
                    <h3 className="font-display text-xl font-bold text-foreground">
                        {title}
                    </h3>
                )}

                {description && (
                    <p className="mt-3 leading-7 text-muted-foreground">
                        {description}
                    </p>
                )}

                {children && (
                    <div className={cn((title || description) && "mt-6")}>
                        {children}
                    </div>
                )}
            </div>

            {footer && (
                <div className="border-t border-border bg-surface-muted px-6 py-4 sm:px-7">
                    {footer}
                </div>
            )}
        </article>
    );
}