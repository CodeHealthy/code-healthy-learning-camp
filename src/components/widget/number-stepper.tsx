"use client";

import {
    type ChangeEvent,
    type FocusEvent,
    type KeyboardEvent,
    useId,
    useState,
} from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface NumberStepperProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function NumberStepper({
    label,
    value,
    onChange,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    className,
}: NumberStepperProps) {
    const inputId = useId();
    const descriptionId = `${inputId}-description`;
    const [draftValue, setDraftValue] = useState<string | null>(null);

    const displayedValue = draftValue ?? String(value);
    const parsedDraftValue =
        draftValue === null || draftValue.trim() === ""
            ? null
            : Number(draftValue);
    const isDraftInvalid =
        draftValue !== null &&
        (parsedDraftValue === null ||
            !Number.isFinite(parsedDraftValue) ||
            parsedDraftValue < min ||
            parsedDraftValue > max);

    function updateValue(nextValue: number) {
        onChange(clamp(nextValue, min, max));
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const nextDraftValue = event.currentTarget.value;

        setDraftValue(nextDraftValue);

        if (nextDraftValue.trim() === "") {
            return;
        }

        const nextValue = Number(nextDraftValue);

        if (
            Number.isFinite(nextValue) &&
            nextValue >= min &&
            nextValue <= max
        ) {
            onChange(nextValue);
        }
    }

    function handleBlur(event: FocusEvent<HTMLInputElement>) {
        const nextDraftValue = event.currentTarget.value.trim();

        setDraftValue(null);

        if (nextDraftValue === "") {
            return;
        }

        const nextValue = Number(nextDraftValue);

        if (!Number.isFinite(nextValue)) {
            return;
        }

        updateValue(nextValue);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }

        if (event.key === "Escape") {
            setDraftValue(null);
            event.currentTarget.blur();
        }
    }

    return (
        <div className={className}>
            <label
                htmlFor={inputId}
                className="text-sm font-bold text-foreground"
            >
                {label}
            </label>

            <div
                className={cn(
                    "mt-2 grid min-h-12 grid-cols-[3rem_minmax(0,1fr)_3rem]",
                    "overflow-hidden rounded-xl border bg-background transition",
                    "focus-within:border-brand focus-within:ring-2 focus-within:ring-focus/20",
                    isDraftInvalid ? "border-danger" : "border-border",
                )}
            >
                <button
                    type="button"
                    aria-label={`Decrease ${label.toLowerCase()}`}
                    title={`Decrease ${label.toLowerCase()}`}
                    disabled={value <= min}
                    onClick={() => updateValue(value - step)}
                    className="inline-flex items-center justify-center border-r border-border text-muted-foreground transition hover:bg-brand-soft hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Minus aria-hidden="true" className="size-4" />
                </button>

                <input
                    id={inputId}
                    type="number"
                    inputMode="numeric"
                    value={displayedValue}
                    min={min}
                    max={max}
                    step={step}
                    aria-describedby={descriptionId}
                    aria-invalid={isDraftInvalid || undefined}
                    onFocus={(event) =>
                        setDraftValue(event.currentTarget.value)
                    }
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="number-stepper-input min-w-0 bg-transparent px-2 text-center font-mono text-lg font-bold text-foreground outline-none"
                />

                <button
                    type="button"
                    aria-label={`Increase ${label.toLowerCase()}`}
                    title={`Increase ${label.toLowerCase()}`}
                    disabled={value >= max}
                    onClick={() => updateValue(value + step)}
                    className="inline-flex items-center justify-center border-l border-border text-muted-foreground transition hover:bg-brand-soft hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Plus aria-hidden="true" className="size-4" />
                </button>
            </div>

            <span id={descriptionId} className="sr-only">
                Enter a value from {min} to {max}. Use the minus and plus
                buttons or the keyboard arrow keys to adjust it.
            </span>
        </div>
    );
}
