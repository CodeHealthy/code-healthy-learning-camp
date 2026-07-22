"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    Check,
    CircleStop,
    Code2,
    RefreshCw,
    RotateCcw,
    Settings2,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/buttons";
import { VisualizationControls } from "@/components/visualizations/visualization-controls";
import type { PlaybackSpeed } from "@/components/visualizations/visualization-controls";
import { VisualizationShell } from "@/components/visualizations/visualization-shell";
import { VisualizationTimeline } from "@/components/visualizations/visualization-timeline";
import { VisualizationViewSwitcher } from "@/components/visualizations/visualization-view-switcher";
import { NumberStepper } from "@/components/widget/number-stepper";
import { cn } from "@/lib/utils";

type LoopPhase = "initialize" | "check" | "body" | "update" | "complete";
type FullscreenView = "code" | "cycle" | "iterations" | "scenario";

interface LoopActionStep {
    id: string;
    title: string;
    description: string;
    phase: LoopPhase;
    counter: number;
    iteration: number | null;
    condition: boolean | null;
    outputs: number[];
    activeLines: number[];
}

const phaseTimeline = [
    { id: "initialize", title: "Initialize" },
    { id: "check", title: "Check" },
    { id: "body", title: "Run body" },
    { id: "update", title: "Update" },
    { id: "final-check", title: "Stop check" },
    { id: "complete", title: "Complete" },
];

const fullscreenViews = [
    { id: "code", label: "Code" },
    { id: "cycle", label: "Cycle" },
    { id: "iterations", label: "Iterations" },
    { id: "scenario", label: "Scenario" },
];

const phaseDetails: Record<LoopPhase, { label: string; description: string }> = {
    initialize: { label: "Initialize", description: "Create the counter once" },
    check: { label: "Check", description: "Ask whether another pass may run" },
    body: { label: "Run body", description: "Perform this iteration's work" },
    update: { label: "Update", description: "Move the counter forward" },
    complete: { label: "Complete", description: "Continue after the loop" },
};

function createSteps(start: number, iterationCount: number): LoopActionStep[] {
    const end = start + iterationCount;
    const steps: LoopActionStep[] = [
        {
            id: "initialize",
            title: "Initialize the counter",
            description: `The loop creates count with the starting value ${start}. Initialization runs only once.`,
            phase: "initialize",
            counter: start,
            iteration: null,
            condition: null,
            outputs: [],
            activeLines: [1],
        },
    ];

    for (let iteration = 0; iteration < iterationCount; iteration += 1) {
        const counter = start + iteration;
        const existingOutputs = Array.from(
            { length: iteration },
            (_, index) => start + index,
        );

        steps.push(
            {
                id: `check-${iteration}`,
                title: `Check before iteration ${iteration + 1}`,
                description: `${counter} < ${end} is true, so JavaScript enters the loop body.`,
                phase: "check",
                counter,
                iteration,
                condition: true,
                outputs: existingOutputs,
                activeLines: [1],
            },
            {
                id: `body-${iteration}`,
                title: `Run iteration ${iteration + 1}`,
                description: `The body uses the current counter value ${counter} and appends it to the output.`,
                phase: "body",
                counter,
                iteration,
                condition: true,
                outputs: [...existingOutputs, counter],
                activeLines: [2],
            },
            {
                id: `update-${iteration}`,
                title: `Update after iteration ${iteration + 1}`,
                description: `count++ changes the counter from ${counter} to ${counter + 1}, then execution returns to the condition.`,
                phase: "update",
                counter: counter + 1,
                iteration,
                condition: true,
                outputs: [...existingOutputs, counter],
                activeLines: [1],
            },
        );
    }

    const outputs = Array.from(
        { length: iterationCount },
        (_, index) => start + index,
    );

    steps.push(
        {
            id: "final-check",
            title: "Perform the final check",
            description: `${end} < ${end} is false. JavaScript skips the body, and no extra value is produced.`,
            phase: "check",
            counter: end,
            iteration: iterationCount,
            condition: false,
            outputs,
            activeLines: [1],
        },
        {
            id: "complete",
            title: "Continue after the loop",
            description: `The loop completed ${iterationCount} ${iterationCount === 1 ? "iteration" : "iterations"}. Execution now moves to the next statement.`,
            phase: "complete",
            counter: end,
            iteration: iterationCount,
            condition: false,
            outputs,
            activeLines: [4],
        },
    );

    return steps;
}

export function LoopExecutionLab() {
    const labRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [start, setStart] = useState(1);
    const [iterationCount, setIterationCount] = useState(3);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState<PlaybackSpeed>(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenView, setFullscreenView] = useState<FullscreenView>("cycle");
    const [fullscreenError, setFullscreenError] = useState("");

    const steps = useMemo(
        () => createSteps(start, iterationCount),
        [iterationCount, start],
    );
    const end = start + iterationCount;
    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    const phaseIndex = phaseTimeline.findIndex((item) =>
        step.id === "final-check"
            ? item.id === "final-check"
            : item.id === step.phase,
    );
    const isDefaultScenario = start === 1 && iterationCount === 3;

    useEffect(() => {
        if (!isPlaying || isLastStep) return;

        const timeoutId = window.setTimeout(() => {
            setCurrentStep((previousStep) => {
                const nextStep = previousStep + 1;
                if (nextStep === steps.length - 1) setIsPlaying(false);
                return nextStep;
            });
        }, 1700 / speed);

        return () => window.clearTimeout(timeoutId);
    }, [currentStep, isLastStep, isPlaying, speed, steps.length]);

    useEffect(() => {
        function handleFullscreenChange() {
            const isLabFullscreen = document.fullscreenElement === labRef.current;
            setIsFullscreen(isLabFullscreen);
            if (isLabFullscreen) setFullscreenView("cycle");
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    function selectStep(index: number) {
        setIsPlaying(false);
        setCurrentStep(index);
    }

    function selectPhase(index: number) {
        const selectedPhase = phaseTimeline[index].id;
        if (selectedPhase === "final-check") {
            selectStep(steps.findIndex((item) => item.id === "final-check"));
            return;
        }

        const phase = selectedPhase as LoopPhase;
        const matchingSteps = steps
            .map((item, stepIndex) => ({ item, stepIndex }))
            .filter(({ item }) => item.phase === phase);
        const closest = matchingSteps.reduce((best, candidate) =>
            Math.abs(candidate.stepIndex - currentStep) <
            Math.abs(best.stepIndex - currentStep)
                ? candidate
                : best,
        );
        selectStep(closest.stepIndex);
    }

    function resetPlayback() {
        setIsPlaying(false);
        setCurrentStep(0);
    }

    function updateStart(value: number) {
        setStart(value);
        resetPlayback();
    }

    function updateIterationCount(value: number) {
        setIterationCount(value);
        resetPlayback();
    }

    function resetScenario() {
        setStart(1);
        setIterationCount(3);
        resetPlayback();
    }

    function togglePlayback() {
        if (isPlaying) {
            setIsPlaying(false);
            return;
        }
        if (isLastStep) setCurrentStep(0);
        setIsPlaying(true);
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
            setFullscreenError("Fullscreen mode is not available in this browser.");
        }
    }

    const codeLines = [
        `for (let count = ${start}; count < ${end}; count++) {`,
        "  console.log(count);",
        "}",
        'console.log("Loop complete");',
    ];

    return (
        <div
            ref={labRef}
            data-visualization-root="loop-execution"
            className={cn(
                "max-w-full min-w-0 bg-background",
                isFullscreen ? "h-dvh overflow-hidden p-2" : "overflow-auto p-0",
            )}
        >
            <VisualizationShell
                category="Programming Fundamentals Lab"
                title="Loop Execution Timeline"
                description="Trace initialization, every condition check, each body execution, counter updates and the final failed check."
                isFullscreen={isFullscreen}
                timeline={
                    <VisualizationTimeline
                        steps={phaseTimeline}
                        currentStep={phaseIndex}
                        onStepSelect={selectPhase}
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
                        onPrevious={() => selectStep(Math.max(0, currentStep - 1))}
                        onNext={() => selectStep(Math.min(steps.length - 1, currentStep + 1))}
                        onTogglePlayback={togglePlayback}
                        onRestart={resetPlayback}
                        onToggleFullscreen={toggleFullscreen}
                        onSpeedChange={setSpeed}
                    />
                }
            >
                <div className={cn(isFullscreen && "flex h-full min-h-0 flex-col")}>
                    {isFullscreen && (
                        <VisualizationViewSwitcher
                            views={fullscreenViews}
                            activeView={fullscreenView}
                            onViewChange={(viewId) => setFullscreenView(viewId as FullscreenView)}
                            className="lg:hidden"
                        />
                    )}

                    <div className={cn(
                        "grid min-w-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)]",
                        isFullscreen && "min-h-0 flex-1",
                    )}>
                        <div className={cn(
                            "min-w-0 border-b border-border p-5 sm:p-7 lg:border-r lg:border-b-0",
                            isFullscreen && "h-full min-h-0 overflow-hidden border-b-0 p-2 sm:p-3 lg:grid lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:gap-3",
                            isFullscreen && fullscreenView === "scenario" && "hidden lg:grid",
                        )}>
                            <div className={cn(
                                "overflow-hidden rounded-2xl border border-code-border bg-code-background text-code-foreground",
                                isFullscreen && "h-full min-h-0",
                                isFullscreen && fullscreenView !== "code" && "hidden lg:block",
                            )}>
                                <div className="flex items-center justify-between border-b border-code-border px-4 py-3">
                                    <span className="font-mono text-xs text-code-muted">loop-execution.js</span>
                                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-code-muted">Active line highlighted</span>
                                </div>
                                <div className="py-3 font-mono text-sm leading-8">
                                    {codeLines.map((line, index) => (
                                        <div
                                            key={`${index}-${line}`}
                                            className={cn(
                                                "grid min-w-max grid-cols-[2.5rem_1fr] border-l-2 px-4 transition",
                                                step.activeLines.includes(index + 1)
                                                    ? "border-brand bg-brand/15 text-code-foreground"
                                                    : "border-transparent text-code-muted",
                                            )}
                                        >
                                            <span className="select-none pr-4 text-right text-xs opacity-60">{index + 1}</span>
                                            <code className="select-text pr-6 whitespace-pre">{line}</code>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={cn(
                                "mt-5 min-w-0 space-y-4 lg:mt-0",
                                isFullscreen && "h-full min-h-0 overflow-hidden",
                                isFullscreen && fullscreenView === "code" && "hidden lg:block",
                            )}>
                                <section className={cn(
                                    "rounded-2xl border border-border bg-surface-muted p-4",
                                    isFullscreen && fullscreenView !== "cycle" && "hidden lg:block",
                                )}>
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-bold text-brand">Execution cycle</p>
                                            <h3 className="mt-1 font-display font-bold">The update returns to the check</h3>
                                        </div>
                                        <RefreshCw aria-hidden="true" className={cn("size-5 text-brand", isPlaying && !shouldReduceMotion && "animate-spin")} />
                                    </div>

                                    <div className="mt-4 grid grid-cols-7 items-stretch gap-1 sm:gap-2">
                                        {(["initialize", "check", "body", "update"] as LoopPhase[]).map((phase, index) => {
                                            const details = phaseDetails[phase];
                                            const isActive = step.phase === phase;
                                            return (
                                                <div key={phase} className="contents">
                                                    <motion.div
                                                        animate={{ scale: isActive ? 1.035 : 1 }}
                                                        className={cn(
                                                            "rounded-xl border p-2 text-center transition sm:p-3",
                                                            isActive ? "border-brand bg-brand-soft shadow-md" : "border-border bg-surface",
                                                        )}
                                                    >
                                                        <span className={cn(
                                                            "mx-auto flex size-6 items-center justify-center rounded-full text-xs font-extrabold",
                                                            isActive ? "bg-brand text-white" : "bg-surface-muted text-muted-foreground",
                                                        )}>{index + 1}</span>
                                                        <p className="mt-2 text-[11px] font-bold sm:text-xs">{details.label}</p>
                                                    </motion.div>
                                                    {index < 3 && <span className="flex items-center justify-center text-brand">→</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <p className="mt-3 text-center text-xs text-muted-foreground">
                                        Update ↩ Check, until the condition becomes false
                                    </p>
                                </section>

                                <section className={cn(
                                    "rounded-2xl border border-border bg-surface-muted p-4",
                                    isFullscreen && fullscreenView !== "iterations" && "hidden lg:block",
                                )}>
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="font-display font-bold">Iteration timeline</h3>
                                        <code className="font-mono text-xs font-bold text-brand">count = {step.counter}</code>
                                    </div>
                                    <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${iterationCount + 1}, minmax(0, 1fr))` }}>
                                        {Array.from({ length: iterationCount }, (_, iteration) => {
                                            const value = start + iteration;
                                            const isCurrent = step.iteration === iteration;
                                            const isComplete = step.outputs.includes(value) && (step.iteration ?? iterationCount) > iteration;
                                            return (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() => selectStep(steps.findIndex((item) => item.id === `body-${iteration}`))}
                                                    className={cn(
                                                        "rounded-xl border p-2 text-center transition sm:p-3",
                                                        isCurrent ? "border-brand bg-brand-soft" : isComplete ? "border-success/40 bg-success-soft" : "border-border bg-surface",
                                                    )}
                                                >
                                                    <p className="text-[10px] font-bold text-muted-foreground sm:text-xs">Pass {iteration + 1}</p>
                                                    <p className="mt-1 font-mono font-extrabold">{value}</p>
                                                </button>
                                            );
                                        })}
                                        <div className={cn(
                                            "rounded-xl border p-2 text-center sm:p-3",
                                            step.condition === false ? "border-danger/40 bg-danger-soft" : "border-border bg-surface",
                                        )}>
                                            <CircleStop aria-hidden="true" className="mx-auto size-4 text-danger" />
                                            <p className="mt-1 text-[10px] font-bold sm:text-xs">Stop at {end}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <aside className={cn(
                            "bg-surface-muted p-5 sm:p-7",
                            isFullscreen && "min-h-0 overflow-hidden p-3 sm:p-3",
                            isFullscreen && fullscreenView !== "scenario" && "hidden lg:block",
                            isFullscreen && fullscreenView === "scenario" && "[@media(max-height:500px)]:grid [@media(max-height:500px)]:grid-cols-[0.8fr_1.6fr_0.8fr] [@media(max-height:500px)]:items-start [@media(max-height:500px)]:gap-2 [@media(max-height:500px)]:p-2",
                        )}>
                            <div className={cn("rounded-2xl border border-border bg-surface p-5", isFullscreen && "p-3")}>
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "flex size-8 items-center justify-center rounded-lg",
                                        step.condition === false ? "bg-danger-soft text-danger" : "bg-brand-soft text-brand",
                                    )}>
                                        {step.condition === false ? <CircleStop aria-hidden="true" className="size-4" /> : <Code2 aria-hidden="true" className="size-4" />}
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold text-brand">Current action</p>
                                        <h3 className="font-display text-sm font-extrabold">{step.title}</h3>
                                    </div>
                                </div>
                                <p aria-live="polite" className={cn("mt-4 leading-7 text-muted-foreground", isFullscreen && "mt-2 line-clamp-3 text-xs leading-5")}>{step.description}</p>
                            </div>

                            <div className={cn(
                                "mt-5 rounded-2xl border border-border bg-surface p-5",
                                isFullscreen && "mt-3 p-3 [@media(max-height:500px)]:mt-0",
                            )}>
                                <div className="flex items-center gap-2">
                                    <Settings2 aria-hidden="true" className="size-5 text-brand" />
                                    <h3 className="font-display font-bold">Scenario settings</h3>
                                </div>
                                <div className={cn("mt-5 space-y-4", isFullscreen && "mt-3 grid grid-cols-2 gap-2 space-y-0")}>
                                    <NumberStepper label="Starting count" value={start} min={0} max={20} onChange={updateStart} />
                                    <NumberStepper label="Iterations" value={iterationCount} min={1} max={4} onChange={updateIterationCount} />
                                    <Button variant="secondary" onClick={resetScenario} disabled={isDefaultScenario} className="col-span-2 w-full">
                                        <RotateCcw aria-hidden="true" className="size-4" />Reset
                                    </Button>
                                </div>
                            </div>

                            <div className={cn(
                                "mt-5 rounded-2xl border border-brand/40 bg-brand-soft p-5",
                                isFullscreen && "mt-3 p-3 [@media(max-height:500px)]:mt-0",
                            )}>
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-bold text-brand">Live output</p>
                                    {step.phase === "complete" && <Check aria-hidden="true" className="size-4 text-success" />}
                                </div>
                                <div className="mt-2 flex min-h-8 flex-wrap gap-1.5">
                                    {step.outputs.length ? step.outputs.map((value) => (
                                        <span key={value} className="flex size-8 items-center justify-center rounded-lg bg-brand font-mono text-xs font-bold text-white">{value}</span>
                                    )) : <span className="text-sm text-muted-foreground">No output yet</span>}
                                </div>
                            </div>

                            {fullscreenError && <p aria-live="polite" className="mt-3 text-xs text-danger">{fullscreenError}</p>}
                        </aside>
                    </div>
                </div>
            </VisualizationShell>
        </div>
    );
}
