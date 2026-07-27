export default function WavyUnderline({ color = 'var(--color-terracotta)' }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 160 10"
      className="mt-1 h-2 w-24"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M2 6 Q 15 1, 28 6 T 54 6 T 80 6 T 106 6 T 132 6 T 158 6"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
