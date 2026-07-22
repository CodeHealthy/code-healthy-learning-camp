"use client";

import { cn } from "@/lib/utils";

export interface VisualizationView {
    id: string;
    label: string;
}

interface VisualizationViewSwitcherProps {
    views: VisualizationView[];
    activeView: string;
    onViewChange: (viewId: string) => void;
    className?: string;
}

/**
 * Keeps compact fullscreen lessons readable by showing one focused region at a
 * time. Large screens can continue to present every region on one canvas.
 */
export function VisualizationViewSwitcher({
    views,
    activeView,
    onViewChange,
    className,
}: VisualizationViewSwitcherProps) {
    return (
        <nav
            aria-label="Fullscreen visualization views"
            className={cn(
                "grid shrink-0 gap-1 border-b border-border bg-surface px-2 py-1.5",
                className,
            )}
            style={{
                gridTemplateColumns: `repeat(${views.length}, minmax(0, 1fr))`,
            }}
        >
            {views.map((view) => {
                const isActive = activeView === view.id;

                return (
                    <button
                        key={view.id}
                        type="button"
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => onViewChange(view.id)}
                        className={cn(
                            "min-h-9 rounded-lg px-1 text-xs font-bold transition [@media(max-height:500px)]:min-h-8",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                            isActive
                                ? "bg-brand text-white shadow-sm"
                                : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                        )}
                    >
                        {view.label}
                    </button>
                );
            })}
        </nav>
    );
}
