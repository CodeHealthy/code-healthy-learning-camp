"use client";

import { useEffect, useState } from "react";
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    CircleHelp,
    Pause,
    Play,
    RotateCcw,
    XCircle,
} from "lucide-react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react";

import { Button } from "@/components/ui/buttons";

type DemoNode = "input" | "condition" | "passed" | "retry";

interface DecisionStep {
    id: string;
    title: string;
    description: string;
    code: string;
    activeNode: DemoNode;
}

const score = 72;
const passingScore = 60;

const steps: DecisionStep[] = [
    {
        id: "read",
        title: "Read the values",
        description:
            "The program reads the learner's score and the minimum score required to pass.",
        code: "const score = 72;\nconst passingScore = 60;",
        activeNode: "input",
    },
    {
        id: "evaluate",
        title: "Evaluate the condition",
        description:
            "The comparison 72 >= 60 produces the Boolean value true.",
        code: "score >= passingScore // true",
        activeNode: "condition",
    },
    {
        id: "branch",
        title: "Choose one path",
        description:
            "Because the condition is true, execution enters the if branch. The else branch is skipped.",
        code: "if (score >= passingScore) {",
        activeNode: "passed",
    },
    {
        id: "output",
        title: "Run the selected instructions",
        description:
            "Only the selected branch runs, so the program displays Passed.",
        code: 'console.log("Passed");',
        activeNode: "passed",
    },
];

export function ConditionDecisionDemo() {
    const shouldReduceMotion = useReducedMotion();
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const step = steps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;
    const hasEvaluatedCondition = currentStep >= 1;
    const animationDuration = shouldReduceMotion ? 0 : 0.35;

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

    function selectStep(index: number) {
        setIsPlaying(false);
        setCurrentStep(index);
    }

    function goToPreviousStep() {
        selectStep(Math.max(currentStep - 1, 0));
    }

    function goToNextStep() {
        selectStep(Math.min(currentStep + 1, steps.length - 1));
    }

    function restart() {
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

    function nodeClasses(node: DemoNode) {
        return step.activeNode === node
            ? "border-brand bg-brand-soft shadow-md"
            : "border-border bg-surface";
    }

    return (
        <section
            aria-labelledby="condition-demo-title"
            className="max-w-full min-w-0 select-none overflow-hidden rounded-3xl border border-border bg-surface shadow-xl"
        >
            <header className="border-b border-border px-5 py-5 sm:px-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-bold text-brand">
                            Guided decision
                        </p>

                        <h2
                            id="condition-demo-title"
                            className="mt-1 font-display text-2xl font-extrabold"
                        >
                            How a condition selects a path
                        </h2>
                    </div>

                    <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand">
                        Step {currentStep + 1} of {steps.length}
                    </span>
                </div>
            </header>

            <ol className="grid grid-cols-2 gap-2 border-b border-border bg-surface-muted p-4 sm:grid-cols-4 sm:px-7">
                {steps.map((timelineStep, index) => (
                    <li key={timelineStep.id}>
                        <button
                            type="button"
                            onClick={() => selectStep(index)}
                            aria-current={
                                index === currentStep ? "step" : undefined
                            }
                            className={`w-full rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${
                                index === currentStep
                                    ? "border-brand bg-brand-soft text-foreground"
                                    : index < currentStep
                                      ? "border-success/40 bg-success-soft text-foreground"
                                      : "border-border bg-surface text-muted-foreground hover:border-brand"
                            }`}
                        >
                            {index + 1}. {timelineStep.title}
                        </button>
                    </li>
                ))}
            </ol>

            <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="min-w-0 border-b border-code-border bg-code-background p-5 text-code-foreground sm:p-7 lg:border-r lg:border-b-0">
                    <p className="text-sm font-bold text-code-muted">
                        Current instruction
                    </p>

                    <AnimatePresence mode="wait">
                        <motion.pre
                            key={step.id}
                            initial={{
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : 10,
                            }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : -10,
                            }}
                            transition={{ duration: animationDuration }}
                            className="select-text mt-5 overflow-x-auto rounded-2xl border border-code-border bg-code-surface p-5 font-mono text-sm leading-7 text-sky-300"
                        >
                            <code>{step.code}</code>
                        </motion.pre>
                    </AnimatePresence>

                    <div
                        aria-live="polite"
                        className="mt-5 rounded-2xl border border-code-border bg-code-surface p-5"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: animationDuration }}
                            >
                                <h3 className="font-display text-lg font-bold text-code-foreground">
                                    {step.title}
                                </h3>

                                <p className="select-text mt-2 leading-7 text-code-muted">
                                    {step.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="min-w-0 bg-surface-raised p-5 sm:p-7">
                    <div className="mx-auto max-w-xl">
                        <motion.div
                            animate={{
                                scale:
                                    step.activeNode === "input" ? 1.03 : 1,
                            }}
                            transition={{ duration: animationDuration }}
                            className={`rounded-2xl border p-4 text-center transition ${nodeClasses("input")}`}
                        >
                            <p className="text-xs font-bold text-muted-foreground">
                                Input values
                            </p>
                            <p className="mt-2 font-mono font-bold">
                                score = {score}, passingScore = {passingScore}
                            </p>
                        </motion.div>

                        <div
                            aria-hidden="true"
                            className="mx-auto h-8 w-px bg-border"
                        />

                        <motion.div
                            animate={{
                                scale:
                                    step.activeNode === "condition" ? 1.04 : 1,
                            }}
                            transition={{ duration: animationDuration }}
                            className={`rounded-2xl border p-5 text-center transition ${nodeClasses("condition")}`}
                        >
                            <CircleHelp
                                aria-hidden="true"
                                className="mx-auto size-6 text-brand"
                            />
                            <p className="mt-2 text-xs font-bold text-muted-foreground">
                                Boolean question
                            </p>
                            <p className="mt-2 font-mono text-lg font-extrabold">
                                {score} &gt;= {passingScore} ?
                            </p>
                            <p
                                className={`mt-2 text-sm font-bold ${
                                    hasEvaluatedCondition
                                        ? "text-success"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {hasEvaluatedCondition ? "true" : "Waiting"}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center">
                                <div
                                    aria-hidden="true"
                                    className="h-8 w-px bg-success"
                                />
                                <span className="mb-2 text-xs font-bold text-success">
                                    true
                                </span>
                                <motion.div
                                    animate={{
                                        scale:
                                            step.activeNode === "passed"
                                                ? 1.04
                                                : 1,
                                    }}
                                    className={`w-full rounded-2xl border p-4 text-center transition ${nodeClasses("passed")}`}
                                >
                                    <CheckCircle2
                                        aria-hidden="true"
                                        className="mx-auto size-6 text-success"
                                    />
                                    <p className="mt-2 font-bold">Passed</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        if branch
                                    </p>
                                </motion.div>
                            </div>

                            <div className="flex flex-col items-center opacity-60">
                                <div
                                    aria-hidden="true"
                                    className="h-8 w-px bg-danger"
                                />
                                <span className="mb-2 text-xs font-bold text-danger">
                                    false
                                </span>
                                <div
                                    className={`w-full rounded-2xl border p-4 text-center ${nodeClasses("retry")}`}
                                >
                                    <XCircle
                                        aria-hidden="true"
                                        className="mx-auto size-6 text-danger"
                                    />
                                    <p className="mt-2 font-bold">Try again</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        else branch
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="flex flex-col gap-3 border-t border-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={goToPreviousStep}
                        disabled={isFirstStep}
                        aria-label="Previous decision step"
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
                        onClick={goToNextStep}
                        disabled={isLastStep}
                        aria-label="Next decision step"
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
