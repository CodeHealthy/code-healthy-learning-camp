"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    ArrowDown,
    ArrowUp,
    Braces,
    Check,
    CircleDot,
    CornerDownLeft,
    Layers3,
    RotateCcw,
    Settings2,
    Terminal,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/buttons";
import { NumberStepper } from "@/components/widget/number-stepper";
import {
    type PlaybackSpeed,
    VisualizationControls,
} from "@/components/visualizations/visualization-controls";
import { VisualizationShell } from "@/components/visualizations/visualization-shell";
import { VisualizationTimeline } from "@/components/visualizations/visualization-timeline";
import {
    type VisualizationView,
    VisualizationViewSwitcher,
} from "@/components/visualizations/visualization-view-switcher";
import {
    createFunctionExecutionSteps,
    getFunctionCodeLines,
    getFunctionResult,
} from "@/lib/function-execution";
import { cn } from "@/lib/utils";

type FullscreenView = "code" | "flow" | "scenario";

const fullscreenViews: VisualizationView[] = [
    { id: "code", label: "Code" },
    { id: "flow", label: "Call flow" },
    { id: "scenario", label: "Scenario" },
];

export function FunctionCallLab() {
    const labRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [price, setPrice] = useState(12);
    const [quantity, setQuantity] = useState(3);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState<PlaybackSpeed>(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenView, setFullscreenView] =
        useState<FullscreenView>("flow");
    const [fullscreenError, setFullscreenError] = useState("");

    const scenario = useMemo(() => ({ price, quantity }), [price, quantity]);
    const steps = useMemo(
        () => createFunctionExecutionSteps(scenario),
        [scenario],
    );
    const codeLines = useMemo(
        () => getFunctionCodeLines(scenario),
        [scenario],
    );
    const result = getFunctionResult(scenario);
    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    const isDefaultScenario = price === 12 && quantity === 3;

    useEffect(() => {
        if (!isPlaying || isLastStep) return;

        const timeoutId = window.setTimeout(() => {
            setCurrentStep((previousStep) => {
                const nextStep = previousStep + 1;
                if (nextStep === steps.length - 1) setIsPlaying(false);
                return nextStep;
            });
        }, 1800 / speed);

        return () => window.clearTimeout(timeoutId);
    }, [currentStep, isLastStep, isPlaying, speed, steps.length]);

    useEffect(() => {
        function handleFullscreenChange() {
            const isLabFullscreen = document.fullscreenElement === labRef.current;
            setIsFullscreen(isLabFullscreen);
            if (isLabFullscreen) setFullscreenView("flow");
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () =>
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    function selectStep(index: number) {
        setIsPlaying(false);
        setCurrentStep(index);
    }

    function resetPlayback() {
        setIsPlaying(false);
        setCurrentStep(0);
    }

    function updatePrice(value: number) {
        setPrice(value);
        resetPlayback();
    }

    function updateQuantity(value: number) {
        setQuantity(value);
        resetPlayback();
    }

    function resetScenario() {
        setPrice(12);
        setQuantity(3);
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

    return (
        <div
            ref={labRef}
            data-visualization-root="function-call"
            className={cn(
                "max-w-full min-w-0 bg-background",
                isFullscreen ? "h-dvh overflow-hidden p-2" : "overflow-auto p-0",
            )}
        >
            <VisualizationShell
                category="Programming Fundamentals Lab"
                title="Function Call Flow"
                description="Trace a function definition, call, parameter binding, local execution, return and resumed caller step by step."
                isFullscreen={isFullscreen}
                timeline={
                    <VisualizationTimeline
                        steps={steps.map((item) => ({
                            id: item.id,
                            title: item.shortTitle,
                        }))}
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
                        onPrevious={() =>
                            selectStep(Math.max(0, currentStep - 1))
                        }
                        onNext={() =>
                            selectStep(
                                Math.min(steps.length - 1, currentStep + 1),
                            )
                        }
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
                            onViewChange={(viewId) =>
                                setFullscreenView(viewId as FullscreenView)
                            }
                            className="lg:hidden"
                        />
                    )}

                    <div
                        className={cn(
                            "grid min-w-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)]",
                            isFullscreen && "min-h-0 flex-1",
                        )}
                    >
                        <div
                            className={cn(
                                "min-w-0 border-b border-border p-5 sm:p-7 lg:border-r lg:border-b-0",
                                isFullscreen &&
                                    "h-full min-h-0 overflow-hidden border-b-0 p-2 sm:p-3 lg:grid lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:gap-3",
                                isFullscreen &&
                                    fullscreenView === "scenario" &&
                                    "hidden lg:grid",
                            )}
                        >
                            <CodePanel
                                codeLines={codeLines}
                                activeLines={step.activeLines}
                                isFullscreen={isFullscreen}
                                hidden={isFullscreen && fullscreenView !== "code"}
                            />

                            <div
                                className={cn(
                                    "mt-5 min-w-0 lg:mt-0",
                                    isFullscreen && "h-full min-h-0 overflow-hidden",
                                    isFullscreen &&
                                        fullscreenView === "code" &&
                                        "hidden lg:block",
                                )}
                            >
                                <CallFlow
                                    price={price}
                                    quantity={quantity}
                                    result={result}
                                    step={step}
                                    shouldReduceMotion={Boolean(shouldReduceMotion)}
                                    isFullscreen={isFullscreen}
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
                                    "[@media(max-height:500px)]:grid [@media(max-height:500px)]:grid-cols-[1.1fr_1.5fr_0.8fr] [@media(max-height:500px)]:items-start [@media(max-height:500px)]:gap-2 [@media(max-height:500px)]:p-2",
                            )}
                        >
                            <section
                                className={cn(
                                    "rounded-2xl border border-border bg-surface p-5",
                                    isFullscreen && "p-3",
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="flex size-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
                                        <CircleDot
                                            aria-hidden="true"
                                            className="size-4"
                                        />
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold text-brand">
                                            Current action
                                        </p>
                                        <h3 className="font-display text-sm font-extrabold">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                                <p
                                    aria-live="polite"
                                    className={cn(
                                        "mt-4 leading-7 text-muted-foreground",
                                        isFullscreen &&
                                            "mt-2 line-clamp-4 text-xs leading-5",
                                    )}
                                >
                                    {step.description}
                                </p>
                            </section>

                            <section
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
                                        Call arguments
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
                                        label="Price"
                                        value={price}
                                        min={1}
                                        max={50}
                                        onChange={updatePrice}
                                    />
                                    <NumberStepper
                                        label="Quantity"
                                        value={quantity}
                                        min={1}
                                        max={10}
                                        onChange={updateQuantity}
                                    />
                                    <Button
                                        variant="secondary"
                                        onClick={resetScenario}
                                        disabled={isDefaultScenario}
                                        className="col-span-2 w-full"
                                    >
                                        <RotateCcw
                                            aria-hidden="true"
                                            className="size-4"
                                        />
                                        Reset
                                    </Button>
                                </div>
                            </section>

                            <section
                                className={cn(
                                    "mt-5 rounded-2xl border border-brand/40 bg-brand-soft p-5",
                                    isFullscreen &&
                                        "mt-3 p-3 [@media(max-height:500px)]:mt-0",
                                )}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-bold text-brand">
                                        Returned result
                                    </p>
                                    {step.returnVisible && (
                                        <Check
                                            aria-hidden="true"
                                            className="size-4 text-success"
                                        />
                                    )}
                                </div>
                                <p className="mt-2 font-mono text-2xl font-extrabold">
                                    {step.returnVisible ? result : "Waiting"}
                                </p>
                            </section>

                            {fullscreenError && (
                                <p
                                    aria-live="polite"
                                    className="mt-3 text-xs text-danger"
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

interface CodePanelProps {
    codeLines: string[];
    activeLines: number[];
    isFullscreen: boolean;
    hidden: boolean;
}

function CodePanel({
    codeLines,
    activeLines,
    isFullscreen,
    hidden,
}: CodePanelProps) {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-2xl border border-code-border bg-code-background text-code-foreground",
                isFullscreen && "h-full min-h-0",
                hidden && "hidden lg:block",
            )}
        >
            <div className="flex items-center justify-between border-b border-code-border px-4 py-3">
                <span className="font-mono text-xs text-code-muted">
                    function-call.js
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-code-muted">
                    Active line highlighted
                </span>
            </div>
            <div className="overflow-auto py-3 font-mono text-sm leading-8">
                {codeLines.map((line, index) => (
                    <div
                        key={`${index}-${line}`}
                        className={cn(
                            "grid min-w-max grid-cols-[2.5rem_1fr] border-l-2 px-4 transition",
                            activeLines.includes(index + 1)
                                ? "border-brand bg-brand/15 text-code-foreground"
                                : "border-transparent text-code-muted",
                        )}
                    >
                        <span className="select-none pr-4 text-right text-xs opacity-60">
                            {index + 1}
                        </span>
                        <code className="select-text pr-6 whitespace-pre">
                            {line || " "}
                        </code>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface CallFlowProps {
    price: number;
    quantity: number;
    result: number;
    step: ReturnType<typeof createFunctionExecutionSteps>[number];
    shouldReduceMotion: boolean;
    isFullscreen: boolean;
}

function CallFlow({
    price,
    quantity,
    result,
    step,
    shouldReduceMotion,
    isFullscreen,
}: CallFlowProps) {
    return (
        <div
            className={cn(
                "space-y-3",
                isFullscreen && "h-full min-h-0 overflow-auto",
            )}
        >
            <FlowStage
                icon={Terminal}
                label="Caller"
                title="Global execution context"
                active={step.callSiteState !== "waiting"}
            >
                <p className="font-mono text-xs font-bold sm:text-sm">
                    orderTotal ={" "}
                    <span className="text-brand">
                        {step.callSiteState === "resumed"
                            ? result
                            : `calculateTotal(${price}, ${quantity})`}
                    </span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                    {step.callSiteState === "paused"
                        ? "Execution is paused here until a value returns."
                        : step.callSiteState === "resumed"
                          ? "Execution resumed with the returned value."
                          : "The function call has not started yet."}
                </p>
            </FlowStage>

            <FlowConnector
                direction="down"
                label={`arguments: ${price}, ${quantity}`}
                active={step.id === "call" || step.id === "bind"}
            />

            <FlowStage
                icon={Layers3}
                label="Call stack"
                title="calculateTotal call frame"
                active={step.frameVisible}
                dashed={!step.frameVisible}
            >
                {step.frameVisible ? (
                    <motion.div
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <MemoryValue label="price" value={price} />
                            <MemoryValue label="quantity" value={quantity} />
                        </div>
                        <div className="mt-2">
                            {step.localVisible ? (
                                <MemoryValue
                                    label="local subtotal"
                                    value={result}
                                    success
                                />
                            ) : (
                                <p className="rounded-xl border border-dashed border-border px-3 py-2 text-center text-xs text-muted-foreground">
                                    Local variable not created yet
                                </p>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        {step.id === "resume"
                            ? "Frame removed; local variables are gone."
                            : "A frame appears only while the function is running."}
                    </p>
                )}
            </FlowStage>

            <FlowConnector
                direction="up"
                label={`return ${result}`}
                active={step.returnVisible}
            />

            <div
                className={cn(
                    "rounded-2xl border p-4 transition",
                    step.outputVisible
                        ? "border-success/40 bg-success-soft"
                        : "border-border bg-surface-muted",
                )}
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Braces aria-hidden="true" className="size-4 text-brand" />
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Final output
                        </p>
                    </div>
                    <code className="font-mono text-lg font-extrabold text-success">
                        {step.outputVisible ? result : "—"}
                    </code>
                </div>
            </div>
        </div>
    );
}

interface FlowStageProps {
    icon: typeof Terminal;
    label: string;
    title: string;
    active: boolean;
    dashed?: boolean;
    children: React.ReactNode;
}

function FlowStage({
    icon: Icon,
    label,
    title,
    active,
    dashed = false,
    children,
}: FlowStageProps) {
    return (
        <section
            className={cn(
                "rounded-2xl border p-4 transition",
                active
                    ? "border-brand bg-brand-soft shadow-sm"
                    : "border-border bg-surface",
                dashed && "border-dashed",
            )}
        >
            <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-surface-muted text-brand">
                    <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                    <p className="text-xs font-bold text-brand">{label}</p>
                    <h3 className="font-display text-sm font-extrabold">{title}</h3>
                </div>
            </div>
            <div className="mt-3">{children}</div>
        </section>
    );
}

interface FlowConnectorProps {
    direction: "up" | "down";
    label: string;
    active: boolean;
}

function FlowConnector({ direction, label, active }: FlowConnectorProps) {
    const Icon = direction === "down" ? ArrowDown : ArrowUp;

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-2 text-xs font-bold transition",
                active ? "text-brand" : "text-muted-foreground opacity-45",
            )}
        >
            <Icon aria-hidden="true" className="size-4" />
            <span className="font-mono">{label}</span>
            {direction === "up" && (
                <CornerDownLeft aria-hidden="true" className="size-4" />
            )}
        </div>
    );
}

interface MemoryValueProps {
    label: string;
    value: number;
    success?: boolean;
}

function MemoryValue({ label, value, success = false }: MemoryValueProps) {
    return (
        <div
            className={cn(
                "rounded-xl border px-3 py-2",
                success
                    ? "border-success/40 bg-success-soft"
                    : "border-border bg-surface",
            )}
        >
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {label}
            </p>
            <p
                className={cn(
                    "mt-1 font-mono font-extrabold",
                    success ? "text-success" : "text-foreground",
                )}
            >
                {value}
            </p>
        </div>
    );
}
