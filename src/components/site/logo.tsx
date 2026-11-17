/** The tesseract mark: a cube inside a cube. Inherits its colour from the text. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className={className}>
      <rect x="3" y="3" width="26" height="26" rx="2" />
      <rect x="10" y="10" width="12" height="12" rx="1" />
      <path d="M3 3l7 7M29 3l-7 7M3 29l7-7M29 29l-7-7" />
    </svg>
  );
}
