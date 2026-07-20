import {
    ArrowRight,
    BookOpen,
    Compass,
    FlaskConical,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/buttons";

export default function NotFound() {
    return (
        <main
            id="main-content"
            className="relative flex min-h-[70vh] items-center overflow-hidden bg-background px-6 py-16 text-foreground"
        >
            <div
                aria-hidden="true"
                className="absolute -top-44 right-0 size-[500px] rounded-full bg-brand-soft blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -bottom-56 -left-40 size-[460px] rounded-full bg-accent-soft blur-3xl"
            />

            <section className="relative mx-auto w-full max-w-4xl text-center">
                <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand-soft text-brand shadow-sm">
                    <Compass aria-hidden="true" className="size-8" />
                </span>

                <Badge variant="brand" className="mt-6">
                    Error 404
                </Badge>

                <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    This page is off the learning map.
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                    The page may have moved, or the lesson might still be under
                    development. Continue with an available learning experience.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    <ButtonLink href="/learn" size="lg">
                        <BookOpen aria-hidden="true" className="size-5" />
                        Explore learning paths
                        <ArrowRight aria-hidden="true" className="size-4" />
                    </ButtonLink>

                    <ButtonLink
                        href="/visualizations"
                        variant="secondary"
                        size="lg"
                    >
                        <FlaskConical aria-hidden="true" className="size-5" />
                        Open visualizations
                    </ButtonLink>
                </div>
            </section>
        </main>
    );
}
