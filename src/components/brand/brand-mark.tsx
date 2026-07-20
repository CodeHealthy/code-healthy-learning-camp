interface BrandMarkProps {
  className?: string;
}

export function BrandMark({
  className = "size-10",
}: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={className}
    >
      <rect width="64" height="64" rx="16" fill="#2563eb" />

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
    </svg>
  );
}