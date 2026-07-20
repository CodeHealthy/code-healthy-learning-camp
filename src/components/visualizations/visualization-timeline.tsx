"use client";

interface TimelineStep {
    id: string;
    title: string;
}

interface VisualizationTimelineProps {
    steps: TimelineStep[];
    currentStep: number;
    onStepSelect: (step: number) => void;
}

export function VisualizationTimeline({
    steps,
    currentStep,
    onStepSelect,
}: VisualizationTimelineProps) {
    return (
        <div>
            <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">
                    Visualization timeline
                </p>

                <p className="text-xs font-semibold text-muted-foreground">
                    Select any step
                </p>
            </div>

            <ol className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isComplete = index < currentStep;

                    return (
                        <li key={step.id}>
                            <button
                                type="button"
                                onClick={() => onStepSelect(index)}
                                aria-current={isActive ? "step" : undefined}
                                className={`flex min-h-16 w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition ${isActive
                                        ? "border-brand bg-brand-soft text-foreground"
                                        : isComplete
                                            ? "border-success/40 bg-success-soft text-foreground"
                                            : "border-border bg-surface text-muted-foreground hover:border-brand hover:text-foreground"
                                    }`}
                            >
                                <span
                                    className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${isActive
                                            ? "bg-brand text-white"
                                            : isComplete
                                                ? "bg-success text-white"
                                                : "bg-surface-muted text-muted-foreground"
                                        }`}
                                >
                                    {index + 1}
                                </span>

                                <span className="text-xs font-bold leading-5">
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