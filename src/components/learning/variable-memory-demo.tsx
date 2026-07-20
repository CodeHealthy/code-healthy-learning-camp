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
        setCurrentStep((previousStep) => Math.max(previousStep - 1, 0));
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
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
        >
            <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-blue-600">
                            Interactive visualization
                        </p>

                        <h2
                            id="variable-demo-title"
                            className="mt-1 text-2xl font-bold"
                        >
                            How a variable changes
                        </h2>
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Step {currentStep + 1} of {steps.length}
                    </p>
                </div>
            </div>

            <div className="grid min-h-[420px] lg:grid-cols-2">
                <div className="border-b border-slate-200 bg-slate-950 p-6 text-white lg:border-r lg:border-b-0">
                    <p className="text-sm font-medium text-slate-400">Program code</p>

                    <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-5">
                        <p className="mb-4 font-mono text-sm text-slate-500">
                            example.js
                        </p>

                        <AnimatePresence mode="wait">
                            <motion.code
                                key={step.code}
                                initial={{
                                    opacity: 0,
                                    y: shouldReduceMotion ? 0 : 12,
                                }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{
                                    opacity: 0,
                                    y: shouldReduceMotion ? 0 : -12,
                                }}
                                transition={{ duration: animationDuration }}
                                className="block font-mono text-lg text-blue-300"
                            >
                                {step.code}
                            </motion.code>
                        </AnimatePresence>
                    </div>

                    <div
                        aria-live="polite"
                        className="mt-6 rounded-2xl bg-slate-900 p-5"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: animationDuration }}
                            >
                                <h3 className="text-lg font-bold text-white">{step.title}</h3>

                                <p className="mt-3 leading-7 text-slate-300">
                                    {step.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden bg-slate-50 p-8">
                    <p className="absolute top-6 left-6 text-sm font-semibold text-slate-500">
                        Simplified program memory
                    </p>

                    {step.transferValue && (
                        <motion.div
                            key={`${currentStep}-${step.transferValue}`}
                            initial={{
                                opacity: 0,
                                x: shouldReduceMotion ? 0 : -100,
                            }}
                            animate={{
                                opacity: shouldReduceMotion ? 1 : [0, 1, 1, 0],
                                x: shouldReduceMotion ? 0 : 100,
                            }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 1.1,
                                ease: "easeInOut",
                            }}
                            className="mb-6 rounded-lg bg-blue-600 px-4 py-2 font-mono font-bold text-white shadow-lg"
                        >
                            {step.transferValue}
                        </motion.div>
                    )}

                    <motion.div
                        layout
                        className="w-full max-w-sm overflow-hidden rounded-2xl border-2 border-blue-200 bg-white shadow-lg"
                    >
                        <div className="border-b border-blue-100 bg-blue-50 px-5 py-3">
                            <p className="text-sm font-semibold text-blue-700">
                                Variable name
                            </p>

                            <p className="mt-1 font-mono text-xl font-bold text-blue-950">
                                score
                            </p>
                        </div>

                        <div className="px-5 py-8 text-center">
                            <p className="text-sm font-semibold text-slate-500">
                                Current value
                            </p>

                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={step.memoryValue}
                                    initial={{
                                        opacity: 0,
                                        scale: shouldReduceMotion ? 1 : 0.7,
                                    }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{
                                        opacity: 0,
                                        scale: shouldReduceMotion ? 1 : 1.2,
                                    }}
                                    transition={{ duration: animationDuration }}
                                    className="mt-3 font-mono text-4xl font-bold text-slate-950"
                                >
                                    {step.memoryValue}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goToPreviousStep}
                        disabled={isFirstStep}
                        className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Previous step"
                    >
                        <ChevronLeft aria-hidden="true" className="size-5" />
                    </button>

                    <button
                        type="button"
                        onClick={togglePlayback}
                        className="inline-flex min-w-28 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                    >
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
                    </button>

                    <button
                        type="button"
                        onClick={goToNextStep}
                        disabled={isLastStep}
                        className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Next step"
                    >
                        <ChevronRight aria-hidden="true" className="size-5" />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={restartDemo}
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                    <RotateCcw aria-hidden="true" className="size-4" />
                    Restart
                </button>
            </div>
        </section>
    );
}