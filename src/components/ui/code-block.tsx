import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    filename?: string;
    language?: string;
    className?: string;
}

export function CodeBlock({
    code,
    filename,
    language,
    className,
}: CodeBlockProps) {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-2xl border border-border",
                "bg-code-background shadow-xl",
                className,
            )}
        >
            <div className="flex min-h-12 items-center justify-between gap-4 border-b border-white/10 px-4">
                <div className="flex min-w-0 items-center gap-4">
                    <div
                        aria-hidden="true"
                        className="hidden gap-2 sm:flex"
                    >
                        <span className="size-2.5 rounded-full bg-red-400" />
                        <span className="size-2.5 rounded-full bg-amber-400" />
                        <span className="size-2.5 rounded-full bg-emerald-400" />
                    </div>

                    <span className="truncate font-mono text-xs text-slate-400">
                        {filename ?? language ?? "Code example"}
                    </span>
                </div>

                <CopyButton value={code} />
            </div>

            <pre
                tabIndex={0}
                className="overflow-x-auto p-6 text-sm leading-7 text-code-foreground"
            >
                <code>{code}</code>
            </pre>
        </div>
    );
}