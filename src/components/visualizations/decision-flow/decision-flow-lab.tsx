"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    CheckCircle2,
    CircleAlert,
    Code2,
    GitBranch,
    RotateCcw,
    Settings2,
    XCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/buttons";
import { VisualizationControls } from "@/components/visualizations/visualization-controls";
import type { PlaybackSpeed } from "@/components/visualizations/visualization-controls";
import { VisualizationShell } from "@/components/visualizations/visualization-shell";
import { VisualizationTimeline } from "@/components/visualizations/visualization-timeline";
import { BinaryChoice } from "@/components/widget/binary-choice";
import { NumberStepper } from "@/components/widget/number-stepper";

type DecisionOutcome =
    | "approved"
    | "ticket-required"
    | "age-required";

type ActiveArea =
    | "inputs"
    | "age-check"
    | "ticket-check"
    | "combined-result"
    | "branch"
    | "output";

interface DecisionFlowStep {
    id: string;
    title: string;
    description: string;
    code: string;
    activeArea: ActiveArea;
    activeLines: number[];
}

interface CodeLine {
    number: number;
    content: string;
}

const outcomeContent: Record<
    DecisionOutcome,
    {
        title: string;
        message: string;
    }
> = {
    approved: {
        title: "Entry approved",
        message: "The age requirement and ticket check both passed.",
    },
    "ticket-required": {
        title: "Ticket required",
        message:
            "The else-if branch detects the missing ticket first. Other requirements may still need attention.",
    },
    "age-required": {
        title: "Age requirement not met",
        message: "The ticket is valid, but the age comparison is false.",
    },
};

function getOutcome(
    ageMeetsRequirement: boolean,
    hasTicket: boolean,
): DecisionOutcome {
    if (ageMeetsRequirement && hasTicket) {
        return "approved";
    }

    if (!hasTicket) {
        return "ticket-required";
    }

    return "age-required";
}

function createSteps(
    age: number,
    minimumAge: number,
    hasTicket: boolean,
): DecisionFlowStep[] {
    const ageMeetsRequirement = age >= minimumAge;
    const isApproved = ageMeetsRequirement && hasTicket;
    const outcome = getOutcome(ageMeetsRequirement, hasTicket);
    const outcomeTitle = outcomeContent[outcome].title;

    return [
        {
            id: "inputs",
            title: "Load inputs",
            description:
                `The program starts with age ${age}, minimum age ${minimumAge}, and hasTicket set to ${hasTicket}.`,
            code: `age = ${age}, minimumAge = ${minimumAge}, hasTicket = ${hasTicket}`,
            activeArea: "inputs",
            activeLines: [1, 2, 3],
        },
        {
            id: "age-check",
            title: "Check age",
            description:
                `JavaScript evaluates ${age} >= ${minimumAge}, which produces ${ageMeetsRequirement}.`,
            code: `${age} >= ${minimumAge} // ${ageMeetsRequirement}`,
            activeArea: "age-check",
            activeLines: [6],
        },
        ageMeetsRequirement
            ? {
                  id: "ticket-check",
                  title: "Check ticket",
                  description:
                      `The left side of && is true, so JavaScript must evaluate hasTicket. Its value is ${hasTicket}.`,
                  code: `true && ${hasTicket}`,
                  activeArea: "ticket-check",
                  activeLines: [6],
              }
            : {
                  id: "ticket-check",
                  title: "Short-circuit",
                  description:
                      "The left side of && is false. The complete expression cannot become true, so JavaScript skips reading hasTicket for this condition.",
                  code: "false && (ticket check skipped)",
                  activeArea: "ticket-check",
                  activeLines: [6],
              },
        {
            id: "combined-result",
            title: "Combine result",
            description:
                `The complete if condition produces ${isApproved}. JavaScript now knows whether to enter the first branch.`,
            code: `age >= minimumAge && hasTicket // ${isApproved}`,
            activeArea: "combined-result",
            activeLines: [6],
        },
        {
            id: "branch",
            title: "Select branch",
            description:
                outcome === "approved"
                    ? "The if condition is true, so the first branch is selected and the remaining branches are skipped."
                    : outcome === "ticket-required"
                      ? "The if condition is false. The else-if check !hasTicket is true, so the ticket-required branch is selected."
                      : "The if condition and else-if condition are both false, so the final else branch is selected.",
            code:
                outcome === "approved"
                    ? "if (...) // selected"
                    : outcome === "ticket-required"
                      ? "else if (!hasTicket) // selected"
                      : "else // selected",
            activeArea: "branch",
            activeLines:
                outcome === "approved"
                    ? [6]
                    : outcome === "ticket-required"
                      ? [8]
                      : [8, 10],
        },
        {
            id: "output",
            title: "Produce output",
            description:
                `Only the selected branch assigns the message. The program displays: ${outcomeTitle}.`,
            code: `console.log(message); // ${outcomeTitle}`,
            activeArea: "output",
            activeLines:
                outcome === "approved"
                    ? [7, 13]
                    : outcome === "ticket-required"
                      ? [9, 13]
                      : [11, 13],
        },
    ];
}

function createCodeLines(
    age: number,
    minimumAge: number,
    hasTicket: boolean,
): CodeLine[] {
    return [
        { number: 1, content: `const age = ${age};` },
        { number: 2, content: `const minimumAge = ${minimumAge};` },
        { number: 3, content: `const hasTicket = ${hasTicket};` },
        { number: 4, content: "let message;" },
        { number: 5, content: "" },
        {
            number: 6,
            content: "if (age >= minimumAge && hasTicket) {",
        },
        { number: 7, content: '  message = "Entry approved";' },
        { number: 8, content: "} else if (!hasTicket) {" },
        { number: 9, content: '  message = "Ticket required";' },
        { number: 10, content: "} else {" },
        {
            number: 11,
            content: '  message = "Age requirement not met";',
        },
        { number: 12, content: "}" },
        { number: 13, content: "console.log(message);" },
    ];
}

export function DecisionFlowLab() {
    const labRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const [age, setAge] = useState(20);
    const [minimumAge, setMinimumAge] = useState(18);
    const [hasTicket, setHasTicket] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState<PlaybackSpeed>(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenError, setFullscreenError] = useState("");

    const ageMeetsRequirement = age >= minimumAge;
    const isApproved = ageMeetsRequirement && hasTicket;
    const outcome = getOutcome(ageMeetsRequirement, hasTicket);
    const outcomeDetails = outcomeContent[outcome];
    const steps = useMemo(
        () => createSteps(age, minimumAge, hasTicket),
        [age, hasTicket, minimumAge],
    );
    const codeLines = useMemo(
        () => createCodeLines(age, minimumAge, hasTicket),
        [age, hasTicket, minimumAge],
    );

    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    const animationDuration = shouldReduceMotion ? 0 : 0.35;
    const hasEvaluatedAge = currentStep >= 1;
    const hasEvaluatedTicket = currentStep >= 2;
    const hasCombinedResult = currentStep >= 3;
    const hasSelectedBranch = currentStep >= 4;
    const isDefaultScenario =
        age === 20 && minimumAge === 18 && hasTicket;

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
        }, 2400 / speed);

        return () => window.clearTimeout(timeoutId);
    }, [currentStep, isLastStep, isPlaying, speed, steps.length]);

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

    function resetPlayback() {
        setIsPlaying(false);
        setCurrentStep(0);
    }

    function updateAge(value: number) {
        setAge(value);
        resetPlayback();
    }

    function updateMinimumAge(value: number) {
        setMinimumAge(value);
        resetPlayback();
    }

    function updateTicket(value: boolean) {
        setHasTicket(value);
        resetPlayback();
    }

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

    function resetScenario() {
        setAge(20);
        setMinimumAge(18);
        setHasTicket(true);
        resetPlayback();
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

    function expressionCardClasses(
        isActive: boolean,
        isComplete: boolean,
    ) {
        if (isActive) {
            return "border-brand bg-brand-soft shadow-md";
        }

        if (isComplete) {
            return "border-brand/30 bg-surface-raised";
        }

        return "border-border bg-surface";
    }

    function outcomeCardClasses(cardOutcome: DecisionOutcome) {
        if (!hasSelectedBranch || cardOutcome !== outcome) {
            return "border-border bg-surface text-muted-foreground";
        }

        return cardOutcome === "approved"
            ? "border-success bg-success-soft text-foreground shadow-md"
            : "border-warning bg-warning-soft text-foreground shadow-md";
    }

    return (
        <div
            ref={labRef}
            className="max-w-full min-w-0 overflow-auto bg-background p-0 fullscreen:p-4"
        >
            <VisualizationShell
                category="Programming Fundamentals Lab"
                title="Decision Flow"
                description="Change the scenario, follow each Boolean evaluation and see exactly why JavaScript selects one branch while skipping the others."
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
                        onRestart={resetPlayback}
                        onToggleFullscreen={toggleFullscreen}
                        onSpeedChange={setSpeed}
                    />
                }
            >
                <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.65fr)]">
                    <div className="order-last min-w-0 border-b border-border p-5 sm:p-7 lg:order-first lg:border-r lg:border-b-0">
                        <div className="max-w-full min-w-0 overflow-hidden rounded-2xl border border-code-border bg-code-background text-code-foreground">
                            <div className="flex items-center justify-between gap-4 border-b border-code-border px-4 py-3">
                                <span className="font-mono text-xs text-code-muted">
                                    decision-flow.js
                                </span>

                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-code-muted">
                                    Active lines highlighted
                                </span>
                            </div>

                            <div className="overflow-x-auto py-3 font-mono text-sm leading-7">
                                {codeLines.map((codeLine) => {
                                    const isActive =
                                        step.activeLines.includes(
                                            codeLine.number,
                                        );

                                    return (
                                        <div
                                            key={codeLine.number}
                                            className={`grid min-w-max grid-cols-[2.5rem_1fr] border-l-2 px-4 transition ${
                                                isActive
                                                    ? "border-brand bg-brand/15 text-code-foreground"
                                                    : "border-transparent text-code-muted"
                                            }`}
                                        >
                                            <span className="select-none pr-4 text-right text-xs opacity-60">
                                                {codeLine.number}
                                            </span>
                                            <code className="select-text pr-6 whitespace-pre">
                                                {codeLine.content || " "}
                                            </code>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <section
                            aria-labelledby="expression-title"
                            className="mt-6 rounded-2xl border border-border bg-surface-muted p-5"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-bold text-brand">
                                        Expression evaluation
                                    </p>
                                    <h3
                                        id="expression-title"
                                        className="mt-1 font-display text-xl font-extrabold"
                                    >
                                        JavaScript evaluates && left to right
                                    </h3>
                                </div>

                                {hasCombinedResult && (
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                                            isApproved
                                                ? "bg-success-soft text-success"
                                                : "bg-danger-soft text-danger"
                                        }`}
                                    >
                                        Overall: {String(isApproved)}
                                    </span>
                                )}
                            </div>

                            <div className="mt-5 grid items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
                                <motion.div
                                    animate={{
                                        scale:
                                            step.activeArea === "age-check"
                                                ? 1.03
                                                : 1,
                                    }}
                                    transition={{
                                        duration: animationDuration,
                                    }}
                                    className={`rounded-xl border p-4 text-center transition ${expressionCardClasses(
                                        step.activeArea === "age-check",
                                        hasEvaluatedAge,
                                    )}`}
                                >
                                    <p className="text-xs font-bold text-muted-foreground">
                                        Left operand
                                    </p>
                                    <p className="mt-2 font-mono font-bold">
                                        {age} &gt;= {minimumAge}
                                    </p>
                                    <p className="mt-2 text-sm font-extrabold">
                                        {hasEvaluatedAge
                                            ? String(ageMeetsRequirement)
                                            : "Waiting"}
                                    </p>
                                </motion.div>

                                <span className="flex items-center justify-center font-mono text-lg font-extrabold text-brand">
                                    &&
                                </span>

                                <motion.div
                                    animate={{
                                        scale:
                                            step.activeArea === "ticket-check"
                                                ? 1.03
                                                : 1,
                                    }}
                                    transition={{
                                        duration: animationDuration,
                                    }}
                                    className={`rounded-xl border p-4 text-center transition ${
                                        hasEvaluatedTicket &&
                                        !ageMeetsRequirement &&
                                        step.activeArea !== "ticket-check"
                                            ? "border-warning/40 bg-warning-soft"
                                            : expressionCardClasses(
                                                  step.activeArea ===
                                                      "ticket-check",
                                                  hasEvaluatedTicket,
                                              )
                                    }`}
                                >
                                    <p className="text-xs font-bold text-muted-foreground">
                                        Right operand
                                    </p>
                                    <p className="mt-2 font-mono font-bold">
                                        hasTicket
                                    </p>
                                    <p className="mt-2 text-sm font-extrabold">
                                        {!hasEvaluatedTicket
                                            ? "Waiting"
                                            : ageMeetsRequirement
                                              ? String(hasTicket)
                                              : "Skipped"}
                                    </p>
                                </motion.div>

                                <span className="flex items-center justify-center font-mono text-lg font-extrabold text-brand">
                                    =
                                </span>

                                <motion.div
                                    animate={{
                                        scale:
                                            step.activeArea ===
                                            "combined-result"
                                                ? 1.03
                                                : 1,
                                    }}
                                    className={`rounded-xl border p-4 text-center transition ${expressionCardClasses(
                                        step.activeArea ===
                                            "combined-result",
                                        hasCombinedResult,
                                    )}`}
                                >
                                    <p className="text-xs font-bold text-muted-foreground">
                                        If condition
                                    </p>
                                    <p className="mt-2 font-mono font-bold">
                                        result
                                    </p>
                                    <p className="mt-2 text-sm font-extrabold">
                                        {hasCombinedResult
                                            ? String(isApproved)
                                            : "Waiting"}
                                    </p>
                                </motion.div>
                            </div>

                            {hasEvaluatedTicket &&
                                !ageMeetsRequirement && (
                                    <div className="mt-4 flex gap-3 rounded-xl border border-warning/40 bg-warning-soft p-4">
                                        <CircleAlert
                                            aria-hidden="true"
                                            className="mt-0.5 size-5 shrink-0 text-warning"
                                        />
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            <strong className="text-foreground">
                                                Short-circuit:
                                            </strong>{" "}
                                            once the left operand is false,
                                            this <code>&amp;&amp;</code> condition
                                            cannot become true, so its right
                                            operand is skipped.
                                        </p>
                                    </div>
                                )}
                        </section>

                        <section
                            aria-labelledby="branch-title"
                            className="mt-6 rounded-2xl border border-border bg-surface-muted p-5"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                    <GitBranch
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-brand">
                                        Branch selection
                                    </p>
                                    <h3
                                        id="branch-title"
                                        className="font-display text-xl font-extrabold"
                                    >
                                        Exactly one path runs
                                    </h3>
                                </div>
                            </div>

                            <motion.div
                                animate={{
                                    scale:
                                        step.activeArea === "branch"
                                            ? 1.025
                                            : 1,
                                }}
                                transition={{
                                    duration: animationDuration,
                                }}
                                className={`mx-auto mt-5 max-w-md rounded-2xl border p-4 text-center transition ${
                                    step.activeArea === "branch"
                                        ? "border-brand bg-brand-soft shadow-md"
                                        : "border-border bg-surface"
                                }`}
                            >
                                <p className="text-xs font-bold text-muted-foreground">
                                    First decision
                                </p>
                                <code className="mt-2 block font-mono text-sm font-bold text-foreground">
                                    age &gt;= minimumAge &amp;&amp; hasTicket
                                </code>
                                <p className="mt-2 text-sm font-extrabold text-brand">
                                    {hasCombinedResult
                                        ? String(isApproved)
                                        : "Waiting"}
                                </p>
                            </motion.div>

                            <div
                                aria-hidden="true"
                                className="mx-auto h-6 w-px bg-border"
                            />

                            <div className="grid gap-3 md:grid-cols-3">
                                {(
                                    [
                                        {
                                            id: "approved",
                                            path: "if is true",
                                            title: "Entry approved",
                                        },
                                        {
                                            id: "ticket-required",
                                            path: "else if is true",
                                            title: "Ticket required",
                                        },
                                        {
                                            id: "age-required",
                                            path: "otherwise",
                                            title: "Age not met",
                                        },
                                    ] as const
                                ).map((branch) => {
                                    const isSelected =
                                        hasSelectedBranch &&
                                        outcome === branch.id;

                                    return (
                                        <motion.div
                                            key={branch.id}
                                            animate={{
                                                scale: isSelected
                                                    ? 1.025
                                                    : 1,
                                            }}
                                            transition={{
                                                duration: animationDuration,
                                            }}
                                            className={`rounded-2xl border p-4 transition ${outcomeCardClasses(
                                                branch.id,
                                            )}`}
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-xs font-bold">
                                                    {branch.path}
                                                </span>
                                                {isSelected ? (
                                                    <CheckCircle2
                                                        aria-label="Selected branch"
                                                        className="size-5 text-success"
                                                    />
                                                ) : (
                                                    <XCircle
                                                        aria-hidden="true"
                                                        className="size-4 opacity-40"
                                                    />
                                                )}
                                            </div>
                                            <p className="mt-3 font-bold text-foreground">
                                                {branch.title}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    <aside className="order-first min-w-0 border-b border-border bg-surface-muted p-5 sm:p-7 lg:order-last lg:border-b-0">
                        <div className="rounded-2xl border border-border bg-surface p-5">
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                    <Code2
                                        aria-hidden="true"
                                        className="size-5"
                                    />
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

                            <motion.p
                                key={step.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: animationDuration,
                                }}
                                aria-live="polite"
                                className="mt-5 leading-7 text-muted-foreground"
                            >
                                {step.description}
                            </motion.p>

                            <code className="mt-4 block overflow-x-auto rounded-xl bg-code-background p-3 font-mono text-sm text-code-foreground">
                                {step.code}
                            </code>
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
                                <NumberStepper
                                    label="Visitor age"
                                    value={age}
                                    min={0}
                                    max={120}
                                    onChange={updateAge}
                                />

                                <NumberStepper
                                    label="Minimum age"
                                    value={minimumAge}
                                    min={0}
                                    max={120}
                                    onChange={updateMinimumAge}
                                />

                                <BinaryChoice
                                    label="Valid ticket"
                                    value={hasTicket}
                                    onChange={updateTicket}
                                    trueLabel="Available"
                                    falseLabel="Missing"
                                />

                                <Button
                                    variant="secondary"
                                    onClick={resetScenario}
                                    disabled={isDefaultScenario}
                                    className="w-full"
                                >
                                    <RotateCcw
                                        aria-hidden="true"
                                        className="size-4"
                                    />
                                    Reset values
                                </Button>
                            </div>
                        </div>

                        <div
                            aria-live="polite"
                            className={`mt-5 rounded-2xl border p-5 ${
                                outcome === "approved"
                                    ? "border-success/40 bg-success-soft"
                                    : "border-warning/40 bg-warning-soft"
                            }`}
                        >
                            <p className="text-sm font-bold text-muted-foreground">
                                Live outcome
                            </p>
                            <p className="mt-2 font-display text-xl font-extrabold text-foreground">
                                {outcomeDetails.title}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {outcomeDetails.message}
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
