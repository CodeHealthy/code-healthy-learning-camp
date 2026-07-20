import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-background text-foreground"
            aria-busy="true"
            aria-label="Loading page"
        >
            <span className="sr-only" role="status">
                Loading the next learning experience.
            </span>

            <section
                aria-hidden="true"
                className="overflow-hidden border-b border-border bg-surface"
            >
                <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
                    <Skeleton className="h-7 w-36 rounded-full" />
                    <Skeleton className="mt-7 h-12 max-w-3xl sm:h-16" />
                    <Skeleton className="mt-4 h-12 max-w-2xl" />

                    <div className="mt-7 max-w-3xl space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-5/6" />
                    </div>

                    <div className="mt-9 flex gap-3">
                        <Skeleton className="h-12 w-44" />
                        <Skeleton className="h-12 w-36" />
                    </div>
                </div>
            </section>

            <section
                aria-hidden="true"
                className="mx-auto max-w-7xl px-6 py-16 lg:py-20"
            >
                <Skeleton className="h-5 w-32" />
                <Skeleton className="mt-4 h-10 max-w-xl" />
                <Skeleton className="mt-4 h-5 max-w-2xl" />

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }, (_, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border border-border bg-surface p-7"
                        >
                            <Skeleton className="size-12 rounded-2xl" />
                            <Skeleton className="mt-6 h-7 w-2/3" />
                            <div className="mt-4 space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
