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
    RotateCcw,
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
import { VisualizationViewSwitcher } from "@/components/visualizations/visualization-view-switcher";
import { NumberStepper } from "@/components/widget/number-stepper";
import { cn } from "@/lib/utils";

type ActiveNode = "code" | "processor" | "memory" | "console";
type FullscreenView = "code" | "flow" | "scenario";

const fullscreenViews = [
    { id: "code", label: "Code" },
    { id: "flow", label: "Memory flow" },
    { id: "scenario", label: "Scenario" },
];

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
    compact?: boolean;
}

function DiagramNode({
    title,
    description,
    icon: Icon,
    active,
    compact = false,
}: DiagramNodeProps) {
    return (
        <motion.div
            layout
            animate={{
                scale: active ? 1.03 : 1,
            }}
            className={cn(
                "rounded-2xl border p-4 transition",
                compact && "p-2 sm:p-3",
                active
                    ? "border-brand bg-brand-soft"
                    : "border-border bg-surface",
            )}
        >
            <div
                className={cn(
                    "flex items-center gap-3",
                    compact && "flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2",
                )}
            >
                <span
                    className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl",
                        compact && "size-8",
                        active
                            ? "bg-brand text-white"
                            : "bg-surface-muted text-muted-foreground",
                    )}
                >
                    <Icon aria-hidden="true" className="size-5" />
                </span>

                <div>
                    <h3
                        className={cn(
                            "font-display font-bold text-foreground",
                            compact && "text-xs sm:text-sm",
                        )}
                    >
                        {title}
                    </h3>

                    <p
                        className={cn(
                            "mt-1 text-sm text-muted-foreground",
                            compact && "line-clamp-2 text-[10px] leading-3 sm:text-xs sm:leading-4",
                        )}
                    >
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
    const [fullscreenView, setFullscreenView] =
        useState<FullscreenView>("flow");

    const steps = useMemo(
        () => createSteps(initialValue, increment),
        [initialValue, increment],
    );

    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    const isDefaultScenario = initialValue === 10 && increment === 5;
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
            const isLabFullscreen =
                document.fullscreenElement === labRef.current;

            setIsFullscreen(isLabFullscreen);

            if (isLabFullscreen) {
                setFullscreenView("flow");
            }
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
            data-visualization-root="variable-memory"
            className={cn(
                "max-w-full min-w-0 bg-background",
                isFullscreen
                    ? "h-dvh overflow-hidden p-2"
                    : "overflow-auto p-0",
            )}
        >
            <VisualizationShell
                category="Programming Fundamentals Lab"
                title="Variable Memory Flow"
                description="Control the values and watch information move between program code, the processor, memory and console output."
                isFullscreen={isFullscreen}
                timeline={
                    <VisualizationTimeline
                        steps={steps}
                        currentStep={currentStep}
                        onStepSelect={selectStep}
                        compact={isFullscreen}
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
                <div
                    className={cn(
                        isFullscreen && "flex h-full min-h-0 flex-col",
                    )}
                >
                    {isFullscreen && (
                        <VisualizationViewSwitcher
                            views={fullscreenViews}
                            activeView={fullscreenView}
                            onViewChange={(viewId) =>
                                setFullscreenView(viewId as FullscreenView)
                            }
                            className="lg:hidden"
                        />
                    )}

                <div
                    className={cn(
                        "grid lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)]",
                        isFullscreen && "min-h-0 flex-1",
                    )}
                >
                    <div
                        className={cn(
                            "border-b border-border p-5 sm:p-7 lg:border-r lg:border-b-0",
                            isFullscreen &&
                                "min-h-0 overflow-hidden border-b-0 p-3 sm:p-3",
                            isFullscreen &&
                                fullscreenView === "scenario" &&
                                "hidden lg:block",
                        )}
                    >
                        <div
                            className={cn(
                                "overflow-hidden rounded-2xl border border-border bg-code-background",
                                isFullscreen &&
                                    fullscreenView !== "code" &&
                                    "hidden lg:block",
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-between border-b border-white/10 px-4 py-3",
                                    isFullscreen && "px-3 py-2",
                                )}
                            >
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
                                    className={cn(
                                        "overflow-x-auto p-6 font-mono text-lg text-blue-300",
                                        isFullscreen && "p-3 text-base",
                                    )}
                                >
                                    <code>{step.code}</code>
                                </motion.pre>
                            </AnimatePresence>
                        </div>

                        <div
                            className={cn(
                                "mt-6 rounded-2xl border border-border bg-surface-muted p-5",
                                isFullscreen && "mt-3 p-3",
                                isFullscreen &&
                                    fullscreenView !== "flow" &&
                                    "hidden lg:block",
                            )}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className="font-bold text-foreground">
                                    {step.flowFrom}
                                </span>

                                <span className="font-bold text-foreground">
                                    {step.flowTo}
                                </span>
                            </div>

                            <div
                                className={cn(
                                    "relative mt-5 h-16 overflow-hidden rounded-2xl border border-border bg-surface",
                                    isFullscreen && "mt-3 h-12",
                                )}
                            >
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

                        <div
                            className={cn(
                                "mt-6 grid gap-4 md:grid-cols-3",
                                isFullscreen && "mt-3 grid-cols-3 gap-2",
                                isFullscreen &&
                                    fullscreenView !== "flow" &&
                                    "hidden lg:grid",
                            )}
                        >
                            <DiagramNode
                                title="Processor"
                                description={step.processorValue}
                                icon={Calculator}
                                active={step.activeNode === "processor"}
                                compact={isFullscreen}
                            />

                            <DiagramNode
                                title="Memory"
                                description={`score = ${step.memoryValue}`}
                                icon={Database}
                                active={step.activeNode === "memory"}
                                compact={isFullscreen}
                            />

                            <DiagramNode
                                title="Console"
                                description={step.consoleValue}
                                icon={Monitor}
                                active={step.activeNode === "console"}
                                compact={isFullscreen}
                            />
                        </div>
                    </div>

                    <aside
                        className={cn(
                            "bg-surface-muted p-5 sm:p-7",
                            isFullscreen &&
                                "min-h-0 overflow-hidden p-3 sm:p-3",
                            isFullscreen &&
                                fullscreenView !== "scenario" &&
                                "hidden lg:block",
                            isFullscreen &&
                                fullscreenView === "scenario" &&
                                "[@media(max-height:500px)]:grid [@media(max-height:500px)]:grid-cols-[0.8fr_1.6fr_0.8fr] [@media(max-height:500px)]:items-start [@media(max-height:500px)]:gap-2 [@media(max-height:500px)]:p-2",
                        )}
                    >
                        <div
                            className={cn(
                                "rounded-2xl border border-border bg-surface p-5",
                                isFullscreen && "p-2.5",
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center gap-3",
                                    isFullscreen && "gap-1.5",
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand",
                                        isFullscreen && "size-7",
                                    )}
                                >
                                    <Code2 aria-hidden="true" className="size-5" />
                                </span>

                                <div>
                                    <p
                                        className={cn(
                                            "text-sm font-bold text-brand",
                                            isFullscreen && "sr-only",
                                        )}
                                    >
                                        Current step
                                    </p>

                                    <h3
                                        className={cn(
                                            "font-display text-xl font-extrabold",
                                            isFullscreen && "text-sm",
                                        )}
                                    >
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
                                    className={cn(
                                        "mt-5 leading-7 text-muted-foreground",
                                        isFullscreen &&
                                            "mt-1 line-clamp-2 text-[11px] leading-4",
                                    )}
                                >
                                    {step.description}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <div
                            className={cn(
                                "mt-5 rounded-2xl border border-border bg-surface p-5",
                                isFullscreen &&
                                    "mt-3 p-3 [@media(max-height:500px)]:mt-0",
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <Settings2
                                    aria-hidden="true"
                                    className="size-5 text-brand"
                                />

                                <h3 className="font-display font-bold">
                                    Scenario settings
                                </h3>
                            </div>

                            <div
                                className={cn(
                                    "mt-5 space-y-4",
                                    isFullscreen &&
                                        "mt-3 grid grid-cols-2 gap-2 space-y-0",
                                )}
                            >
                                <NumberStepper
                                    label="Initial value"
                                    value={initialValue}
                                    min={-999}
                                    max={999}
                                    onChange={updateInitialValue}
                                />

                                <NumberStepper
                                    label="Amount to add"
                                    value={increment}
                                    min={-999}
                                    max={999}
                                    onChange={updateIncrement}
                                />

                                <Button
                                    variant="secondary"
                                    onClick={resetScenario}
                                    disabled={isDefaultScenario}
                                    className={cn(
                                        "w-full",
                                        isFullscreen && "col-span-2",
                                    )}
                                >
                                    <RotateCcw
                                        aria-hidden="true"
                                        className="size-4"
                                    />
                                    {isFullscreen ? "Reset" : "Reset values"}
                                </Button>
                            </div>
                        </div>

                        <div
                            className={cn(
                                "mt-5 rounded-2xl border border-brand/40 bg-brand-soft p-5",
                                isFullscreen &&
                                    "mt-3 p-3 [@media(max-height:500px)]:mt-0",
                            )}
                        >
                            <p className="text-sm font-bold text-brand">
                                Live result
                            </p>

                            <p
                                className={cn(
                                    "mt-2 font-mono text-2xl font-extrabold text-foreground",
                                    isFullscreen && "mt-1 text-lg",
                                )}
                            >
                                {initialValue} + {increment} ={" "}
                                {initialValue + increment}
                            </p>
                        </div>

                        {fullscreenError && (
                            <p
                                aria-live="polite"
                                className={cn(
                                    "mt-4 text-sm text-danger",
                                    isFullscreen &&
                                        "[@media(max-height:500px)]:col-span-3",
                                )}
                            >
                                {fullscreenError}
                            </p>
                        )}
                    </aside>
                </div>
                </div>
            </VisualizationShell>
        </div>
    );
}
