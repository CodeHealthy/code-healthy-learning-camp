"use client";

import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Pause,
    Play,
    RotateCcw,
} from "lucide-react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react";

interface VariableStep {
    title: string;
    description: string;
    code: string;
    memoryValue: string;
    transferValue?: string;
}

const steps: VariableStep[] = [
    {
        title: "Declare the variable",
        description:
            "The program creates a variable named score. It does not have a useful value yet, so its current value is undefined.",
        code: "let score;",
        memoryValue: "undefined",
    },
    {
        title: "Assign a value",
        description:
            "The number 10 is assigned to score. The variable now refers to that value.",
        code: "score = 10;",
        memoryValue: "10",
        transferValue: "10",
    },
    {
        title: "Read the value",
        description:
            "When the program uses score, it reads the value currently associated with the variable.",
        code: "console.log(score);",
        memoryValue: "10",
    },
    {
        title: "Update the value",
        description:
            "The current value is read, increased by 5 and then assigned back to the same variable.",
        code: "score = score + 5;",
        memoryValue: "15",
        transferValue: "15",
    },
];

export function VariableMemoryDemo() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const shouldReduceMotion = useReducedMotion();

    const step = steps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;
    const animationDuration = shouldReduceMotion ? 0 : 0.45;

    useEffect(() => {
        if (!isPlaying || isLastStep) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            const nextStep = currentStep + 1;

            setCurrentStep(nextStep);

            if (nextStep === steps.length - 1) {
                setIsPlaying(false);
            }
        }, 2200);

        return () => window.clearTimeout(timeoutId);
    }, [currentStep, isLastStep, isPlaying]);

    function goToPreviousStep() {
        setIsPlaying(false);

        setCurrentStep((previousStep) =>
            Math.max(previousStep - 1, 0),
        );
    }

    function goToNextStep() {
        setIsPlaying(false);

        setCurrentStep((previousStep) =>
            Math.min(previousStep + 1, steps.length - 1),
        );
    }

    function restartDemo() {
        setIsPlaying(false);
        setCurrentStep(0);
    }

    function togglePlayback() {
        if (isPlaying) {
            setIsPlaying(false);
            return;
        }

        if (isLastStep) {
            setCurrentStep(0);
        }

        setIsPlaying(true);
    }

    return (
        <section
            aria-labelledby="variable-demo-title"
            className="select-none overflow-hidden rounded-3xl border border-border bg-surface shadow-lg dark:shadow-2xl"
        >
            <header className="border-b border-border px-6 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-bold text-brand">
                            Interactive visualization
                        </p>

                        <h2
                            id="variable-demo-title"
                            className="mt-1 font-display text-2xl font-extrabold text-foreground"
                        >
                            How a variable changes
                        </h2>
                    </div>

                    <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand">
                        Step {currentStep + 1} of {steps.length}
                    </span>
                </div>
            </header>

            <div className="grid min-h-[440px] lg:grid-cols-2">
                <div className="border-b border-code-border bg-code-background p-6 text-code-foreground lg:border-r lg:border-b-0">
                    <p className="text-sm font-semibold text-code-muted">
                        Program code
                    </p>

                    <div className="mt-6 rounded-2xl border border-code-border bg-code-surface p-5">
                        <p className="mb-4 font-mono text-sm text-code-muted">
                            example.js
                        </p>

                        <AnimatePresence mode="wait">
                            <motion.code
                                key={step.code}
                                initial={{
                                    opacity: 0,
                                    y: shouldReduceMotion ? 0 : 12,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: shouldReduceMotion ? 0 : -12,
                                }}
                                transition={{
                                    duration: animationDuration,
                                }}
                                className="select-text block font-mono text-lg text-sky-300"
                            >
                                {step.code}
                            </motion.code>
                        </AnimatePresence>
                    </div>

                    <div
                        aria-live="polite"
                        className="mt-6 rounded-2xl border border-code-border bg-code-surface p-5"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step.title}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: animationDuration,
                                }}
                            >
                                <h3 className="font-display text-lg font-bold text-code-foreground">
                                    {step.title}
                                </h3>

                                <p className="select-text mt-3 leading-7 text-code-muted">
                                    {step.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden bg-surface-raised p-8">
                    <p className="absolute top-6 left-6 text-sm font-bold text-muted-foreground">
                        Simplified program memory
                    </p>

                    <AnimatePresence mode="wait">
                        {step.transferValue && (
                            <motion.div
                                key={`${currentStep}-${step.transferValue}`}
                                initial={{
                                    opacity: 0,
                                    x: shouldReduceMotion ? 0 : -100,
                                }}
                                animate={{
                                    opacity: shouldReduceMotion
                                        ? 1
                                        : [0, 1, 1, 0],
                                    x: shouldReduceMotion ? 0 : 100,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: shouldReduceMotion ? 0 : 1.1,
                                    ease: "easeInOut",
                                }}
                                className="mb-6 rounded-xl bg-brand px-4 py-2 font-mono font-bold text-white shadow-lg"
                            >
                                {step.transferValue}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        layout
                        className="w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-surface shadow-lg"
                    >
                        <div className="border-b border-border bg-brand-soft px-5 py-4">
                            <p className="text-sm font-bold text-brand">
                                Variable name
                            </p>

                            <p className="select-all mt-1 font-mono text-xl font-bold text-foreground">
                                score
                            </p>
                        </div>

                        <div className="px-5 py-10 text-center">
                            <p className="text-sm font-bold text-muted-foreground">
                                Current value
                            </p>

                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={step.memoryValue}
                                    initial={{
                                        opacity: 0,
                                        scale: shouldReduceMotion ? 1 : 0.7,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: shouldReduceMotion ? 1 : 1.2,
                                    }}
                                    transition={{
                                        duration: animationDuration,
                                    }}
                                    className="select-all mt-3 break-words font-mono text-4xl font-extrabold text-foreground"
                                >
                                    {step.memoryValue}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>

            <footer className="flex flex-col gap-4 border-t border-border bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goToPreviousStep}
                        disabled={isFirstStep}
                        aria-label="Previous step"
                        title="Previous step"
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition hover:border-brand hover:bg-brand-soft hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft
                            aria-hidden="true"
                            className="size-5"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={togglePlayback}
                        className="inline-flex min-w-28 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 font-bold text-white shadow-sm transition hover:bg-brand-strong hover:shadow-md"
                    >
                        {isPlaying ? (
                            <>
                                <Pause
                                    aria-hidden="true"
                                    className="size-4"
                                />
                                Pause
                            </>
                        ) : (
                            <>
                                <Play
                                    aria-hidden="true"
                                    className="size-4"
                                />
                                {isLastStep ? "Play again" : "Play"}
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={goToNextStep}
                        disabled={isLastStep}
                        aria-label="Next step"
                        title="Next step"
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition hover:border-brand hover:bg-brand-soft hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight
                            aria-hidden="true"
                            className="size-5"
                        />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={restartDemo}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-bold text-muted-foreground transition hover:bg-surface-muted hover:text-foreground"
                >
                    <RotateCcw
                        aria-hidden="true"
                        className="size-4"
                    />
                    Restart
                </button>
            </footer>
        </section>
    );
}