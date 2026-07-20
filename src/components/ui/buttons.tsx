import type {
    ButtonHTMLAttributes,
    ComponentProps,
    ReactNode,
} from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "ghost"
    | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-brand text-white shadow-sm hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-md",
    secondary:
        "border border-border bg-surface text-foreground shadow-sm hover:border-brand hover:bg-brand-soft hover:text-brand",
    ghost:
        "bg-transparent text-muted-foreground hover:bg-surface-muted hover:text-foreground",
    danger:
        "bg-danger text-white shadow-sm hover:-translate-y-0.5 hover:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "min-h-9 rounded-lg px-3 py-2 text-sm",
    md: "min-h-11 rounded-xl px-5 py-2.5",
    lg: "min-h-12 rounded-xl px-6 py-3",
    icon: "size-10 rounded-xl",
};

interface ButtonStyleOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}

export function buttonStyles({
    variant = "primary",
    size = "md",
    className,
}: ButtonStyleOptions = {}) {
    return cn(
        "inline-flex items-center justify-center gap-2 font-bold transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        "motion-reduce:transform-none motion-reduce:transition-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
    );
}

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    className,
    isLoading = false,
    disabled,
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            aria-busy={isLoading || undefined}
            className={buttonStyles({
                variant,
                size,
                className,
            })}
            {...props}
        >
            {isLoading && (
                <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin"
                />
            )}

            {children}
        </button>
    );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
};

export function ButtonLink({
    children,
    variant = "primary",
    size = "md",
    className,
    ...props
}: ButtonLinkProps) {
    return (
        <Link
            className={buttonStyles({
                variant,
                size,
                className,
            })}
            {...props}
        >
            {children}
        </Link>
    );
}