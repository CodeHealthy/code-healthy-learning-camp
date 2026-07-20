interface DeveloperAvatarProps {
    className?: string;
}

export function DeveloperAvatar({
    className = "size-24",
}: DeveloperAvatarProps) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 120 120"
            className={className}
        >
            <rect
                x="2"
                y="2"
                width="116"
                height="116"
                rx="34"
                className="fill-brand-soft stroke-brand"
                strokeWidth="3"
            />

            <circle
                cx="60"
                cy="43"
                r="18"
                className="fill-brand"
            />

            <path
                d="M31 97c3-22 14-34 29-34s26 12 29 34"
                className="fill-brand"
            />

            <path
                d="M44 35c4-12 25-14 32 0-4-3-8-5-14-5-7 0-13 2-18 5Z"
                className="fill-brand-strong"
            />

            <rect
                x="22"
                y="71"
                width="76"
                height="31"
                rx="8"
                className="fill-code-background stroke-code-border"
                strokeWidth="2"
            />

            <path
                d="m43 80-8 7 8 7"
                fill="none"
                className="stroke-sky-300"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="m77 80 8 7-8 7"
                fill="none"
                className="stroke-sky-300"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="m65 77-10 20"
                fill="none"
                className="stroke-success"
                strokeWidth="4"
                strokeLinecap="round"
            />
        </svg>
    );
}