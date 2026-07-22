"use client";

import { useEffect, useState } from "react";
import {
    Check,
    ChevronLeft,
    ChevronRight,
    CircleStop,
    Code2,
    Pause,
    Play,
    RotateCcw,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/buttons";
import { cn } from "@/lib/utils";

interface DemoStep {
    id: string;
    title: string;
    description: string;
    counter: number;
    outputCount: number;
    condition: boolean | null;
}

const loopValues = [1, 2, 3];

const steps: DemoStep[] = [
    {
        id: "initialize",
        title: "Initialize the counter",
        description:
            "JavaScript creates count with the starting value 1 before checking the loop condition.",
        counter: 1,
        outputCount: 0,
        condition: null,
    },
    ...loopValues.map((value, index) => ({
        id: `iteration-${value}`,
        title: `Run iteration ${index + 1}`,
        description: `${value} <= 3 is true, so the body displays ${value}. The update then increases count to ${value + 1}.`,
        counter: value,
        outputCount: index + 1,
        condition: true,
    })),
    {
        id: "stop",
        title: "Stop after the failed check",
        description:
            "After the last update, count is 4. The condition 4 <= 3 is false, so the body is skipped and the loop ends.",
        counter: 4,
        outputCount: 3,
        condition: false,
    },
];

export function LoopExecutionDemo() {
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
        }, 1900);

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
                    Guided loop walkthrough
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                    Watch the counter control repetition
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                    Follow each successful condition check and the final failed
                    check that stops the loop.
                </p>
            </header>

            <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)]">
                <div className="min-w-0 border-b border-border p-5 sm:p-7 lg:border-r lg:border-b-0">
                    <div className="overflow-hidden rounded-2xl border border-code-border bg-code-background text-code-foreground">
                        <div className="border-b border-code-border px-4 py-3 font-mono text-xs text-code-muted">
                            count-to-three.js
                        </div>
                        <pre className="overflow-x-auto p-5 font-mono text-sm leading-7">
                            <code>{`for (let count = 1; count <= 3; count++) {
  console.log(count);
}`}</code>
                        </pre>
                    </div>

                    <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
                        <div className="rounded-2xl border border-brand/40 bg-brand-soft p-4 text-center">
                            <p className="text-xs font-bold text-muted-foreground">
                                Current count
                            </p>
                            <motion.p
                                key={step.counter}
                                initial={{ scale: shouldReduceMotion ? 1 : 0.75 }}
                                animate={{ scale: 1 }}
                                className="mt-2 font-mono text-3xl font-extrabold text-brand"
                            >
                                {step.counter}
                            </motion.p>
                        </div>

                        <div className="text-center">
                            <p className="font-mono text-xs font-bold text-muted-foreground">
                                {step.counter} &lt;= 3
                            </p>
                            <span
                                className={cn(
                                    "mt-2 inline-flex rounded-full px-3 py-1 text-xs font-extrabold",
                                    step.condition === null
                                        ? "bg-brand-soft text-brand"
                                        : step.condition
                                          ? "bg-success-soft text-success"
                                          : "bg-danger-soft text-danger",
                                )}
                            >
                                {step.condition === null
                                    ? "Not checked"
                                    : String(step.condition)}
                            </span>
                        </div>

                        <div className="rounded-2xl border border-border bg-surface-muted p-4 text-center">
                            <p className="text-xs font-bold text-muted-foreground">
                                Output
                            </p>
                            <div className="mt-2 flex min-h-9 flex-wrap justify-center gap-1.5">
                                {loopValues.slice(0, step.outputCount).map((value) => (
                                    <motion.span
                                        key={value}
                                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex size-8 items-center justify-center rounded-lg bg-brand font-mono text-sm font-bold text-white"
                                    >
                                        {value}
                                    </motion.span>
                                ))}
                                {step.outputCount === 0 && (
                                    <span className="text-sm text-muted-foreground">
                                        Waiting
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2" aria-label="Loop progress">
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
                    <span
                        className={cn(
                            "flex size-11 items-center justify-center rounded-xl",
                            step.condition === null
                                ? "bg-brand-soft text-brand"
                                : step.condition
                                  ? "bg-success-soft text-success"
                                  : "bg-danger-soft text-danger",
                        )}
                    >
                        {step.condition === null ? (
                            <Code2 aria-hidden="true" className="size-5" />
                        ) : step.condition ? (
                            <Check aria-hidden="true" className="size-5" />
                        ) : (
                            <CircleStop aria-hidden="true" className="size-5" />
                        )}
                    </span>
                    <p className="mt-5 text-sm font-bold text-brand">
                        Step {currentStep + 1} of {steps.length}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-extrabold">
                        {step.title}
                    </h3>
                    <p aria-live="polite" className="mt-4 leading-7 text-muted-foreground">
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
                        aria-label="Previous loop step"
                        title="Previous step"
                    >
                        <ChevronLeft aria-hidden="true" className="size-5" />
                    </Button>
                    <Button onClick={togglePlayback} className="min-w-28">
                        {isPlaying ? (
                            <><Pause aria-hidden="true" className="size-4" />Pause</>
                        ) : (
                            <><Play aria-hidden="true" className="size-4" />{isLastStep ? "Play again" : "Play"}</>
                        )}
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        disabled={isLastStep}
                        onClick={() => selectStep(currentStep + 1)}
                        aria-label="Next loop step"
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
