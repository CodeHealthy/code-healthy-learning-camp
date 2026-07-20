"use client";

import {
    BookOpen,
    CircleAlert,
    Home,
    RefreshCw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/buttons";

interface ErrorPageProps {
    error: Error & {
        digest?: string;
    };
    unstable_retry: () => void;
}

export default function ErrorPage({
    unstable_retry,
}: ErrorPageProps) {
    return (
        <main
            id="main-content"
            className="relative flex min-h-[70vh] items-center overflow-hidden bg-background px-6 py-16 text-foreground"
        >
            <div
                aria-hidden="true"
                className="absolute -top-44 right-0 size-[480px] rounded-full bg-danger-soft blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -bottom-52 -left-36 size-[440px] rounded-full bg-brand-soft blur-3xl"
            />

            <section className="relative mx-auto w-full max-w-3xl rounded-3xl border border-border bg-surface p-8 shadow-xl sm:p-10">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-danger-soft text-danger">
                    <CircleAlert aria-hidden="true" className="size-7" />
                </span>

                <Badge variant="danger" className="mt-6">
                    Unexpected interruption
                </Badge>

                <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                    This page could not finish loading.
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                    The interruption may be temporary. Try loading the page
                    again, or continue from another part of the platform.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                        onClick={() => unstable_retry()}
                        size="lg"
                    >
                        <RefreshCw aria-hidden="true" className="size-5" />
                        Try again
                    </Button>

                    <ButtonLink
                        href="/learn"
                        variant="secondary"
                        size="lg"
                    >
                        <BookOpen aria-hidden="true" className="size-5" />
                        Browse learning paths
                    </ButtonLink>

                    <ButtonLink
                        href="/"
                        variant="ghost"
                        size="lg"
                    >
                        <Home aria-hidden="true" className="size-5" />
                        Return home
                    </ButtonLink>
                </div>
            </section>
        </main>
    );
}
