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
import { cn } from "@/lib/utils";

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
        <div
            className={cn(
                "flex gap-4",
                isFullscreen
                    ? "flex-row items-center justify-between gap-2"
                    : "flex-col lg:flex-row lg:items-center lg:justify-between",
            )}
        >
            <div
                className={cn(
                    "flex flex-wrap items-center gap-2",
                    isFullscreen && "flex-nowrap gap-1 sm:gap-2",
                )}
            >
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={onPrevious}
                    disabled={isFirstStep}
                    aria-label="Previous visualization step"
                    title="Previous step"
                    className={cn(
                        isFullscreen &&
                            "[@media(max-height:500px)]:size-9",
                    )}
                >
                    <ChevronLeft aria-hidden="true" className="size-5" />
                </Button>

                <Button
                    onClick={onTogglePlayback}
                    className={
                        isFullscreen
                            ? "min-w-18 px-3 sm:min-w-28 sm:px-5 [@media(max-height:500px)]:min-h-9"
                            : "min-w-32"
                    }
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
                    className={cn(
                        isFullscreen &&
                            "[@media(max-height:500px)]:size-9",
                    )}
                >
                    <ChevronRight aria-hidden="true" className="size-5" />
                </Button>

                <Button
                    variant="ghost"
                    onClick={onRestart}
                    aria-label="Restart visualization"
                    title="Restart visualization"
                    className={cn(
                        isFullscreen &&
                            "hidden sm:inline-flex [@media(max-height:500px)]:hidden",
                    )}
                >
                    <RotateCcw aria-hidden="true" className="size-4" />
                    Restart
                </Button>
            </div>

            <div
                className={cn(
                    "flex flex-wrap items-center gap-3",
                    isFullscreen && "flex-nowrap gap-1 sm:gap-3",
                )}
            >
                <label
                    htmlFor="visualization-speed"
                    className={`text-sm font-bold text-muted-foreground ${
                        isFullscreen ? "sr-only" : ""
                    }`}
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
                    className={cn(
                        "min-h-10 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-bold text-foreground",
                        isFullscreen &&
                            "w-14 px-1 sm:w-auto sm:px-3 [@media(max-height:500px)]:min-h-9",
                    )}
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
                    className={cn(
                        isFullscreen &&
                            "[@media(max-height:500px)]:size-9",
                    )}
                >
                    {isFullscreen ? (
                        <Minimize2 aria-hidden="true" className="size-5" />
                    ) : (
                        <Maximize2 aria-hidden="true" className="size-5" />
                    )}
                </Button>

                <span
                    className={cn(
                        "text-sm font-bold text-muted-foreground",
                        isFullscreen && "sr-only sm:not-sr-only",
                    )}
                >
                    Step {currentStep + 1} of {totalSteps}
                </span>
            </div>
        </div>
    );
}
