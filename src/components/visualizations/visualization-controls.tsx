"use client";

import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Minimize2,
    Pause,
    Play,
    RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/buttons";

export type PlaybackSpeed = 0.5 | 1 | 1.5 | 2;

interface VisualizationControlsProps {
    currentStep: number;
    totalSteps: number;
    isPlaying: boolean;
    isFullscreen: boolean;
    speed: PlaybackSpeed;
    onPrevious: () => void;
    onNext: () => void;
    onTogglePlayback: () => void;
    onRestart: () => void;
    onToggleFullscreen: () => void;
    onSpeedChange: (speed: PlaybackSpeed) => void;
}

export function VisualizationControls({
    currentStep,
    totalSteps,
    isPlaying,
    isFullscreen,
    speed,
    onPrevious,
    onNext,
    onTogglePlayback,
    onRestart,
    onToggleFullscreen,
    onSpeedChange,
}: VisualizationControlsProps) {
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={onPrevious}
                    disabled={isFirstStep}
                    aria-label="Previous visualization step"
                    title="Previous step"
                >
                    <ChevronLeft aria-hidden="true" className="size-5" />
                </Button>

                <Button
                    onClick={onTogglePlayback}
                    className="min-w-32"
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
                </Button>

                <Button
                    variant="secondary"
                    size="icon"
                    onClick={onNext}
                    disabled={isLastStep}
                    aria-label="Next visualization step"
                    title="Next step"
                >
                    <ChevronRight aria-hidden="true" className="size-5" />
                </Button>

                <Button
                    variant="ghost"
                    onClick={onRestart}
                >
                    <RotateCcw aria-hidden="true" className="size-4" />
                    Restart
                </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <label
                    htmlFor="visualization-speed"
                    className="text-sm font-bold text-muted-foreground"
                >
                    Animation speed
                </label>

                <select
                    id="visualization-speed"
                    value={speed}
                    onChange={(event) =>
                        onSpeedChange(
                            Number(event.target.value) as PlaybackSpeed,
                        )
                    }
                    className="min-h-10 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-bold text-foreground"
                >
                    <option value={0.5}>0.5×</option>
                    <option value={1}>1×</option>
                    <option value={1.5}>1.5×</option>
                    <option value={2}>2×</option>
                </select>

                <Button
                    variant="secondary"
                    size="icon"
                    onClick={onToggleFullscreen}
                    aria-label={
                        isFullscreen
                            ? "Exit fullscreen visualization"
                            : "Open fullscreen visualization"
                    }
                    title={isFullscreen ? "Exit fullscreen" : "Open fullscreen"}
                >
                    {isFullscreen ? (
                        <Minimize2 aria-hidden="true" className="size-5" />
                    ) : (
                        <Maximize2 aria-hidden="true" className="size-5" />
                    )}
                </Button>

                <span className="text-sm font-bold text-muted-foreground">
                    Step {currentStep + 1} of {totalSteps}
                </span>
            </div>
        </div>
    );
}