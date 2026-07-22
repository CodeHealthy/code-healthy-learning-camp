"use client";

import { useEffect, useState } from "react";
import {
    ArrowDown,
    ArrowUp,
    Braces,
    Check,
    ChevronLeft,
    ChevronRight,
    CornerDownLeft,
    Pause,
    Play,
    RotateCcw,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/buttons";
import {
    createFunctionExecutionSteps,
    getFunctionResult,
} from "@/lib/function-execution";
import { cn } from "@/lib/utils";

const scenario = { price: 12, quantity: 3 };
const steps = createFunctionExecutionSteps(scenario);
const result = getFunctionResult(scenario);

export function FunctionCallDemo() {
    const shouldReduceMotion = useReducedMotion();
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const step = steps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    useEffect(() => {
        if (!isPlaying || isLastStep) return;

        const timeoutId = window.setTimeout(() => {
            setCurrentStep((previousStep) => {
                const nextStep = previousStep + 1;
                if (nextStep === steps.length - 1) setIsPlaying(false);
                return nextStep;
            });
        }, 2000);

        return () => window.clearTimeout(timeoutId);
    }, [currentStep, isLastStep, isPlaying]);

    function selectStep(nextStep: number) {
        setIsPlaying(false);
        setCurrentStep(nextStep);
    }

    function togglePlayback() {
        if (isPlaying) {
            setIsPlaying(false);
            return;
        }

        if (isLastStep) setCurrentStep(0);
        setIsPlaying(true);
    }

    function restart() {
        setIsPlaying(false);
        setCurrentStep(0);
    }

    return (
        <section className="overflow-hidden rounded-3xl border border-border bg-surface shadow-lg">
            <header className="border-b border-border px-5 py-5 sm:px-7">
                <p className="text-sm font-bold text-brand">
                    Guided function walkthrough
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                    Follow one function call from start to finish
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                    Watch arguments become parameters, local work produce a result,
                    and execution return to the waiting call site.
                </p>
            </header>

            <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
                <div className="min-w-0 border-b border-border p-5 sm:p-7 lg:border-r lg:border-b-0">
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                        <FlowCard
                            label="Caller"
                            title="Global code"
                            active={step.callSiteState !== "waiting"}
                        >
                            <code className="text-xs sm:text-sm">
                                calculateTotal(12, 3)
                            </code>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <ValueChip label="argument" value="12" />
                                <ValueChip label="argument" value="3" />
                            </div>
                        </FlowCard>

                        <div className="flex items-center justify-center text-brand sm:flex-col">
                            <ArrowDown
                                aria-hidden="true"
                                className={cn(
                                    "size-5 sm:hidden",
                                    step.id === "call" || step.id === "bind"
                                        ? "opacity-100"
                                        : "opacity-35",
                                )}
                            />
                            <ArrowDown
                                aria-hidden="true"
                                className={cn(
                                    "hidden size-5 sm:block",
                                    step.id === "call" || step.id === "bind"
                                        ? "opacity-100"
                                        : "opacity-35",
                                )}
                            />
                            <span className="px-2 text-[10px] font-bold uppercase tracking-wider sm:py-1">
                                call
                            </span>
                            <ArrowUp
                                aria-hidden="true"
                                className={cn(
                                    "size-5",
                                    step.returnVisible ? "opacity-100" : "opacity-35",
                                )}
                            />
                        </div>

                        <FlowCard
                            label="Callee"
                            title="calculateTotal frame"
                            active={step.frameVisible}
                            muted={!step.frameVisible}
                        >
                            {step.frameVisible ? (
                                <motion.div
                                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-2"
                                >
                                    <div className="flex flex-wrap gap-2">
                                        <ValueChip label="price" value="12" />
                                        <ValueChip label="quantity" value="3" />
                                    </div>
                                    {step.localVisible && (
                                        <ValueChip
                                            label="local subtotal"
                                            value={String(result)}
                                            success
                                        />
                                    )}
                                </motion.div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    {step.id === "resume"
                                        ? "Removed after return"
                                        : "Created only when called"}
                                </p>
                            )}
                        </FlowCard>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-surface-muted p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Call site
                            </p>
                            <p className="mt-2 font-mono text-sm font-bold">
                                orderTotal ={" "}
                                <span className="text-brand">
                                    {step.callSiteState === "resumed"
                                        ? result
                                        : "calculateTotal(12, 3)"}
                                </span>
                            </p>
                            <p className="mt-2 text-xs text-muted-foreground">
                                {step.callSiteState === "paused"
                                    ? "Paused while the function runs"
                                    : step.callSiteState === "resumed"
                                      ? "Resumed with the returned value"
                                      : "Waiting to reach the call"}
                            </p>
                        </div>

                        <div
                            className={cn(
                                "rounded-2xl border p-4 transition",
                                step.outputVisible
                                    ? "border-success/40 bg-success-soft"
                                    : "border-border bg-surface-muted",
                            )}
                        >
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Console output
                            </p>
                            <div className="mt-2 flex min-h-7 items-center gap-2">
                                {step.outputVisible ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-2 font-mono text-xl font-extrabold text-success"
                                    >
                                        <Check aria-hidden="true" className="size-5" />
                                        {result}
                                    </motion.div>
                                ) : (
                                    <span className="text-sm text-muted-foreground">
                                        Waiting for the return value
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className="mt-5 flex items-center gap-2"
                        aria-label="Function call progress"
                    >
                        {steps.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => selectStep(index)}
                                aria-label={`Go to ${item.title}`}
                                aria-current={index === currentStep ? "step" : undefined}
                                className={cn(
                                    "h-2 flex-1 rounded-full transition",
                                    index <= currentStep ? "bg-brand" : "bg-border",
                                )}
                            />
                        ))}
                    </div>
                </div>

                <aside className="bg-surface-muted p-5 sm:p-7">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                        {step.id === "return" || step.id === "resume" ? (
                            <CornerDownLeft aria-hidden="true" className="size-5" />
                        ) : (
                            <Braces aria-hidden="true" className="size-5" />
                        )}
                    </span>
                    <p className="mt-5 text-sm font-bold text-brand">
                        Step {currentStep + 1} of {steps.length}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-extrabold">
                        {step.title}
                    </h3>
                    <p
                        aria-live="polite"
                        className="mt-4 leading-7 text-muted-foreground"
                    >
                        {step.description}
                    </p>
                </aside>
            </div>

            <footer className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        disabled={isFirstStep}
                        onClick={() => selectStep(currentStep - 1)}
                        aria-label="Previous function step"
                        title="Previous step"
                    >
                        <ChevronLeft aria-hidden="true" className="size-5" />
                    </Button>
                    <Button onClick={togglePlayback} className="min-w-28">
                        {isPlaying ? (
                            <>
                                <Pause aria-hidden="true" className="size-4" />
                                Pause
                            </>
                        ) : (
                            <>
                                <Play aria-hidden="true" className="size-4" />
                                {isLastStep ? "Play again" : "Play"}
                            </>
                        )}
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        disabled={isLastStep}
                        onClick={() => selectStep(currentStep + 1)}
                        aria-label="Next function step"
                        title="Next step"
                    >
                        <ChevronRight aria-hidden="true" className="size-5" />
                    </Button>
                </div>
                <Button variant="ghost" onClick={restart}>
                    <RotateCcw aria-hidden="true" className="size-4" />
                    Restart
                </Button>
            </footer>
        </section>
    );
}

interface FlowCardProps {
    label: string;
    title: string;
    active: boolean;
    muted?: boolean;
    children: React.ReactNode;
}

function FlowCard({
    label,
    title,
    active,
    muted = false,
    children,
}: FlowCardProps) {
    return (
        <div
            className={cn(
                "min-h-40 rounded-2xl border p-4 transition sm:p-5",
                active
                    ? "border-brand bg-brand-soft shadow-sm"
                    : "border-border bg-surface-muted",
                muted && "border-dashed",
            )}
        >
            <p className="text-xs font-bold uppercase tracking-wider text-brand">
                {label}
            </p>
            <h3 className="mt-1 font-display font-bold">{title}</h3>
            <div className="mt-4">{children}</div>
        </div>
    );
}

interface ValueChipProps {
    label: string;
    value: string;
    success?: boolean;
}

function ValueChip({ label, value, success = false }: ValueChipProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 font-mono text-xs font-bold",
                success
                    ? "border-success/40 bg-success-soft text-success"
                    : "border-brand/30 bg-surface text-foreground",
            )}
        >
            <span className="text-muted-foreground">{label}</span>
            {value}
        </span>
    );
}
