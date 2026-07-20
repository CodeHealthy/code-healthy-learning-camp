"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Calculator,
    Code2,
    Database,
    Monitor,
    Settings2,
} from "lucide-react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react";

import { Button } from "@/components/ui/buttons";
import { VisualizationControls } from "@/components/visualizations/visualization-controls";
import type { PlaybackSpeed } from "@/components/visualizations/visualization-controls";
import { VisualizationShell } from "@/components/visualizations/visualization-shell";
import { VisualizationTimeline } from "@/components/visualizations/visualization-timeline";

type ActiveNode = "code" | "processor" | "memory" | "console";

interface VariableLabStep {
    id: string;
    title: string;
    description: string;
    code: string;
    flowFrom: string;
    flowTo: string;
    token: string;
    memoryValue: string;
    processorValue: string;
    consoleValue: string;
    activeNode: ActiveNode;
}

interface DiagramNodeProps {
    title: string;
    description: string;
    icon: typeof Code2;
    active: boolean;
}

function DiagramNode({
    title,
    description,
    icon: Icon,
    active,
}: DiagramNodeProps) {
    return (
        <motion.div
            layout
            animate={{
                scale: active ? 1.03 : 1,
            }}
            className={`rounded-2xl border p-4 transition ${active
                    ? "border-brand bg-brand-soft"
                    : "border-border bg-surface"
                }`}
        >
            <div className="flex items-center gap-3">
                <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${active
                            ? "bg-brand text-white"
                            : "bg-surface-muted text-muted-foreground"
                        }`}
                >
                    <Icon aria-hidden="true" className="size-5" />
                </span>

                <div>
                    <h3 className="font-display font-bold text-foreground">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function createSteps(
    initialValue: number,
    increment: number,
): VariableLabStep[] {
    const finalValue = initialValue + increment;

    return [
        {
            id: "declare",
            title: "Declare",
            description:
                "The program creates the variable name. No useful value has been assigned yet.",
            code: "let score;",
            flowFrom: "Program code",
            flowTo: "Memory",
            token: "score",
            memoryValue: "undefined",
            processorValue: "Waiting",
            consoleValue: "No output",
            activeNode: "code",
        },
        {
            id: "assign",
            title: "Assign",
            description:
                `The value ${initialValue} is assigned to score and stored in the simplified memory model.`,
            code: `score = ${initialValue};`,
            flowFrom: "Program code",
            flowTo: "Memory",
            token: String(initialValue),
            memoryValue: String(initialValue),
            processorValue: "Waiting",
            consoleValue: "No output",
            activeNode: "memory",
        },
        {
            id: "read",
            title: "Read",
            description:
                `The processor reads the current value ${initialValue} from score.`,
            code: "const currentValue = score;",
            flowFrom: "Memory",
            flowTo: "Processor",
            token: String(initialValue),
            memoryValue: String(initialValue),
            processorValue: String(initialValue),
            consoleValue: "No output",
            activeNode: "processor",
        },
        {
            id: "calculate",
            title: "Calculate",
            description:
                `The processor adds ${increment} to the current value ${initialValue}.`,
            code: `const nextValue = score + ${increment};`,
            flowFrom: "Processor",
            flowTo: "Calculation",
            token: `${initialValue} + ${increment}`,
            memoryValue: String(initialValue),
            processorValue: `${initialValue} + ${increment} = ${finalValue}`,
            consoleValue: "No output",
            activeNode: "processor",
        },
        {
            id: "update",
            title: "Update",
            description:
                `The calculated value ${finalValue} is assigned back to score.`,
            code: `score = ${finalValue};`,
            flowFrom: "Processor",
            flowTo: "Memory",
            token: String(finalValue),
            memoryValue: String(finalValue),
            processorValue: String(finalValue),
            consoleValue: "No output",
            activeNode: "memory",
        },
        {
            id: "output",
            title: "Output",
            description:
                `The program reads score and displays its current value: ${finalValue}.`,
            code: "console.log(score);",
            flowFrom: "Memory",
            flowTo: "Console",
            token: String(finalValue),
            memoryValue: String(finalValue),
            processorValue: "Complete",
            consoleValue: String(finalValue),
            activeNode: "console",
        },
    ];
}

export function VariableMemoryLab() {
    const labRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const [initialValue, setInitialValue] = useState(10);
    const [increment, setIncrement] = useState(5);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState<PlaybackSpeed>(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenError, setFullscreenError] = useState("");

    const steps = useMemo(
        () => createSteps(initialValue, increment),
        [initialValue, increment],
    );

    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    const animationDuration = shouldReduceMotion ? 0 : 0.55;

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
        }, 2200 / speed);

        return () => window.clearTimeout(timeoutId);
    }, [
        currentStep,
        isLastStep,
        isPlaying,
        speed,
        steps.length,
    ]);

    useEffect(() => {
        function handleFullscreenChange() {
            setIsFullscreen(
                document.fullscreenElement === labRef.current,
            );
        }

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange,
        );

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange,
            );
        };
    }, []);

    function selectStep(index: number) {
        setIsPlaying(false);
        setCurrentStep(index);
    }

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

    function updateInitialValue(value: number) {
        if (!Number.isFinite(value)) {
            return;
        }

        setInitialValue(value);
        setIsPlaying(false);
        setCurrentStep(0);
    }

    function updateIncrement(value: number) {
        if (!Number.isFinite(value)) {
            return;
        }

        setIncrement(value);
        setIsPlaying(false);
        setCurrentStep(0);
    }

    async function toggleFullscreen() {
        setFullscreenError("");

        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
                return;
            }

            await labRef.current?.requestFullscreen();
        } catch {
            setFullscreenError(
                "Fullscreen mode is not available in this browser.",
            );
        }
    }

    function resetScenario() {
        setInitialValue(10);
        setIncrement(5);
        setIsPlaying(false);
        setCurrentStep(0);
    }

    return (
        <div
            ref={labRef}
            className="overflow-auto bg-background p-0 fullscreen:p-4"
        >
            <VisualizationShell
                category="Programming Fundamentals Lab"
                title="Variable Memory Flow"
                description="Control the values and watch information move between program code, the processor, memory and console output."
                timeline={
                    <VisualizationTimeline
                        steps={steps}
                        currentStep={currentStep}
                        onStepSelect={selectStep}
                    />
                }
                controls={
                    <VisualizationControls
                        currentStep={currentStep}
                        totalSteps={steps.length}
                        isPlaying={isPlaying}
                        isFullscreen={isFullscreen}
                        speed={speed}
                        onPrevious={goToPreviousStep}
                        onNext={goToNextStep}
                        onTogglePlayback={togglePlayback}
                        onRestart={restart}
                        onToggleFullscreen={toggleFullscreen}
                        onSpeedChange={setSpeed}
                    />
                }
            >
                <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)]">
                    <div className="border-b border-border p-5 sm:p-7 lg:border-r lg:border-b-0">
                        <div className="overflow-hidden rounded-2xl border border-border bg-code-background">
                            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                                <span className="font-mono text-xs text-slate-400">
                                    variable-flow.js
                                </span>

                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">
                                    Current instruction
                                </span>
                            </div>

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
                                    className="overflow-x-auto p-6 font-mono text-lg text-blue-300"
                                >
                                    <code>{step.code}</code>
                                </motion.pre>
                            </AnimatePresence>
                        </div>

                        <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-5">
                            <div className="flex items-center justify-between gap-4">
                                <span className="font-bold text-foreground">
                                    {step.flowFrom}
                                </span>

                                <span className="font-bold text-foreground">
                                    {step.flowTo}
                                </span>
                            </div>

                            <div className="relative mt-5 h-16 overflow-hidden rounded-2xl border border-border bg-surface">
                                <div
                                    aria-hidden="true"
                                    className="absolute top-1/2 right-[8%] left-[8%] h-0.5 -translate-y-1/2 bg-border"
                                />

                                <div
                                    aria-hidden="true"
                                    className="absolute top-1/2 right-[8%] size-3 -translate-y-1/2 rotate-45 border-t-2 border-r-2 border-brand"
                                />

                                <motion.div
                                    key={`${step.id}-${initialValue}-${increment}`}
                                    initial={{
                                        left: shouldReduceMotion ? "82%" : "8%",
                                        opacity: 0,
                                    }}
                                    animate={{
                                        left: "82%",
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: shouldReduceMotion
                                            ? 0
                                            : 1.2 / speed,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-brand px-3 py-2 font-mono text-sm font-bold text-white shadow-lg"
                                >
                                    {step.token}
                                </motion.div>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <DiagramNode
                                title="Processor"
                                description={step.processorValue}
                                icon={Calculator}
                                active={step.activeNode === "processor"}
                            />

                            <DiagramNode
                                title="Memory"
                                description={`score = ${step.memoryValue}`}
                                icon={Database}
                                active={step.activeNode === "memory"}
                            />

                            <DiagramNode
                                title="Console"
                                description={step.consoleValue}
                                icon={Monitor}
                                active={step.activeNode === "console"}
                            />
                        </div>
                    </div>

                    <aside className="bg-surface-muted p-5 sm:p-7">
                        <div className="rounded-2xl border border-border bg-surface p-5">
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                    <Code2 aria-hidden="true" className="size-5" />
                                </span>

                                <div>
                                    <p className="text-sm font-bold text-brand">
                                        Current step
                                    </p>

                                    <h3 className="font-display text-xl font-extrabold">
                                        {step.title}
                                    </h3>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={step.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: animationDuration }}
                                    aria-live="polite"
                                    className="mt-5 leading-7 text-muted-foreground"
                                >
                                    {step.description}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
                            <div className="flex items-center gap-2">
                                <Settings2
                                    aria-hidden="true"
                                    className="size-5 text-brand"
                                />

                                <h3 className="font-display font-bold">
                                    Scenario settings
                                </h3>
                            </div>

                            <div className="mt-5 space-y-4">
                                <label className="block">
                                    <span className="text-sm font-bold text-foreground">
                                        Initial value
                                    </span>

                                    <input
                                        type="number"
                                        value={initialValue}
                                        min={-999}
                                        max={999}
                                        onChange={(event) =>
                                            updateInitialValue(
                                                event.currentTarget.valueAsNumber,
                                            )
                                        }
                                        className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-bold text-foreground">
                                        Amount to add
                                    </span>

                                    <input
                                        type="number"
                                        value={increment}
                                        min={-999}
                                        max={999}
                                        onChange={(event) =>
                                            updateIncrement(
                                                event.currentTarget.valueAsNumber,
                                            )
                                        }
                                        className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground"
                                    />
                                </label>

                                <Button
                                    variant="secondary"
                                    onClick={resetScenario}
                                    className="w-full"
                                >
                                    Reset scenario values
                                </Button>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-brand/40 bg-brand-soft p-5">
                            <p className="text-sm font-bold text-brand">
                                Live result
                            </p>

                            <p className="mt-2 font-mono text-2xl font-extrabold text-foreground">
                                {initialValue} + {increment} ={" "}
                                {initialValue + increment}
                            </p>
                        </div>

                        <p
                            aria-live="polite"
                            className="mt-4 text-sm text-danger"
                        >
                            {fullscreenError}
                        </p>
                    </aside>
                </div>
            </VisualizationShell>
        </div>
    );
}