interface BrandMarkProps {
    className?: string;
}

export function BrandMark({
    className = "size-10",
}: BrandMarkProps) {
    return (
        <span
            aria-hidden="true"
            className={`relative inline-flex shrink-0 overflow-visible transition-transform duration-300 hover:scale-105 ${className}`}
        >
            {/* Light-theme icon */}
            <svg
                viewBox="0 0 64 64"
                className="absolute inset-0 size-full rotate-0 scale-100 opacity-100 drop-shadow-sm transition-all duration-500 ease-out motion-reduce:transition-none dark:rotate-12 dark:scale-75 dark:opacity-0"
            >
                <rect
                    x="1"
                    y="1"
                    width="62"
                    height="62"
                    rx="16"
                    fill="#2563eb"
                    stroke="#60a5fa"
                    strokeWidth="2"
                />

                <path
                    d="M24 19 13 32l11 13"
                    fill="none"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="m40 19 11 13-11 13"
                    fill="none"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="m37 15-10 34"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="5"
                    strokeLinecap="round"
                />

                <circle cx="49" cy="15" r="3" fill="#a7f3d0" />
            </svg>

            {/* Dark-theme icon */}
            <svg
                viewBox="0 0 64 64"
                className="absolute inset-0 size-full -rotate-12 scale-75 opacity-0 drop-shadow-[0_0_12px_rgba(56,189,248,0.35)] transition-all duration-500 ease-out motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100"
            >
                <rect
                    x="1"
                    y="1"
                    width="62"
                    height="62"
                    rx="16"
                    fill="#07111f"
                    stroke="#38bdf8"
                    strokeWidth="2"
                />

                <circle cx="32" cy="32" r="21" fill="#0c2238" />

                <path
                    d="M22 20 12 32l10 12"
                    fill="none"
                    stroke="#7dd3fc"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="m42 20 10 12-10 12"
                    fill="none"
                    stroke="#7dd3fc"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M22 33h6l3-9 5 17 4-8h5"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle cx="49" cy="14" r="3" fill="#67e8f9" />
                <circle cx="15" cy="49" r="2" fill="#34d399" />
            </svg>
        </span>
    );
}