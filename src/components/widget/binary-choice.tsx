"use client";

import { Check, X } from "lucide-react";

interface BinaryChoiceProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
    trueLabel?: string;
    falseLabel?: string;
}

export function BinaryChoice({
    label,
    value,
    onChange,
    trueLabel = "Yes",
    falseLabel = "No",
}: BinaryChoiceProps) {
    return (
        <fieldset>
            <legend className="text-sm font-bold text-foreground">
                {label}
            </legend>

            <div className="mt-2 grid min-h-12 grid-cols-2 overflow-hidden rounded-xl border border-border bg-background p-1">
                <button
                    type="button"
                    aria-pressed={!value}
                    onClick={() => onChange(false)}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 text-sm font-bold transition ${
                        !value
                            ? "bg-surface-raised text-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                    }`}
                >
                    <X aria-hidden="true" className="size-4" />
                    {falseLabel}
                </button>

                <button
                    type="button"
                    aria-pressed={value}
                    onClick={() => onChange(true)}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 text-sm font-bold transition ${
                        value
                            ? "bg-brand text-white shadow-sm"
                            : "text-muted-foreground hover:bg-brand-soft hover:text-brand"
                    }`}
                >
                    <Check aria-hidden="true" className="size-4" />
                    {trueLabel}
                </button>
            </div>
        </fieldset>
    );
}
