import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
                <li>
                    <Link
                        href="/"
                        aria-label="Home"
                        className="inline-flex items-center rounded-md text-muted-foreground transition hover:text-brand"
                    >
                        <Home aria-hidden="true" className="size-4" />
                    </Link>
                </li>

                {items.map((item, index) => {
                    const isCurrentPage = index === items.length - 1;

                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                            <ChevronRight
                                aria-hidden="true"
                                className="size-4 text-muted-foreground"
                            />

                            {item.href && !isCurrentPage ? (
                                <Link
                                    href={item.href}
                                    className="rounded-md font-medium text-muted-foreground transition hover:text-brand"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current={isCurrentPage ? "page" : undefined}
                                    className="font-semibold text-foreground"
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}