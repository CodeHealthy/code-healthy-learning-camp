"use client";

import { useEffect, useRef, useState } from "react";
import {
    Check,
    CircleAlert,
    Copy,
} from "lucide-react";

import { cn } from "@/lib/utils";

type CopyStatus = "idle" | "copied" | "error";

interface CopyButtonProps {
    value: string;
    className?: string;
}

export function CopyButton({
    value,
    className,
}: CopyButtonProps) {
    const [status, setStatus] = useState<CopyStatus>("idle");
    const resetTimeout = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (resetTimeout.current !== null) {
                window.clearTimeout(resetTimeout.current);
            }
        };
    }, []);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(value);
            setStatus("copied");
        } catch {
            setStatus("error");
        }

        if (resetTimeout.current !== null) {
            window.clearTimeout(resetTimeout.current);
        }

        resetTimeout.current = window.setTimeout(() => {
            setStatus("idle");
        }, 2000);
    }

    const label =
        status === "copied"
            ? "Copied"
            : status === "error"
                ? "Copy failed"
                : "Copy code";

    const Icon =
        status === "copied"
            ? Check
            : status === "error"
                ? CircleAlert
                : Copy;

    return (
        <button
            type="button"
            onClick={copyToClipboard}
            aria-label={label}
            title={label}
            className={cn(
                "inline-flex min-h-9 items-center gap-2 rounded-lg px-3",
                "text-xs font-bold text-slate-300 transition",
                "hover:bg-white/10 hover:text-white",
                className,
            )}
        >
            <Icon aria-hidden="true" className="size-4" />
            <span>{label}</span>
        </button>
    );
}