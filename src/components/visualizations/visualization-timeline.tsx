"use client";

interface TimelineStep {
    id: string;
    title: string;
}

interface VisualizationTimelineProps {
    steps: TimelineStep[];
    currentStep: number;
    onStepSelect: (step: number) => void;
    compact?: boolean;
}

export function VisualizationTimeline({
    steps,
    currentStep,
    onStepSelect,
    compact = false,
}: VisualizationTimelineProps) {
    return (
        <div>
            <div
                className={`mb-3 items-center justify-between ${
                    compact ? "hidden" : "flex"
                }`}
            >
                <p className="text-sm font-bold text-foreground">
                    Visualization timeline
                </p>

                <p className="text-xs font-semibold text-muted-foreground">
                    Select any step
                </p>
            </div>

            <ol
                className={`grid gap-2 ${
                    compact
                        ? "grid-cols-6 gap-1 sm:gap-2"
                        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
                }`}
            >
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isComplete = index < currentStep;

                    return (
                        <li key={step.id}>
                            <button
                                type="button"
                                onClick={() => onStepSelect(index)}
                                aria-current={isActive ? "step" : undefined}
                                className={`flex w-full items-center rounded-xl border text-left transition ${
                                    compact
                                        ? "min-h-9 justify-center gap-1 px-1 py-1 sm:min-h-10 sm:justify-start sm:gap-2 sm:px-2 [@media(max-height:500px)]:min-h-8"
                                        : "min-h-16 gap-3 px-3 py-2"
                                } ${isActive
                                        ? "border-brand bg-brand-soft text-foreground"
                                        : isComplete
                                            ? "border-success/40 bg-success-soft text-foreground"
                                            : "border-border bg-surface text-muted-foreground hover:border-brand hover:text-foreground"
                                    }`}
                            >
                                <span
                                    className={`flex shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                                        compact ? "size-6" : "size-7"
                                    } ${isActive
                                            ? "bg-brand text-white"
                                            : isComplete
                                                ? "bg-success text-white"
                                                : "bg-surface-muted text-muted-foreground"
                                        }`}
                                >
                                    {index + 1}
                                </span>

                                <span
                                    className={`font-bold ${
                                        compact
                                            ? "hidden text-[11px] leading-4 sm:inline [@media(max-height:500px)]:hidden"
                                            : "text-xs leading-5"
                                    }`}
                                >
                                    {step.title}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
