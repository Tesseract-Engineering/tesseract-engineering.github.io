import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "../logo";

/** Props for an item that rises in, in order, when its panel comes on screen (see `[data-reveal]` in globals.css). */
export function reveal(i: number) {
  return { "data-reveal": "", style: { "--i": i } as CSSProperties };
}

/** A small citation line: "SBX-10 · Jira · Dhruv Pendharkar". */
export function Cite({ children }: { children: ReactNode }) {
  return <cite className="mt-1 block font-mono text-[0.6875rem] leading-normal text-forest not-italic">{children}</cite>;
}

/** A tiny pill-shaped control inside a mock-up (not a real button). */
export function Mini({ primary, children }: { primary?: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-btn border border-line-2 px-[11px] py-[7px] text-xs leading-none font-semibold text-ink",
        primary && "border-ink bg-ink text-on-dark",
      )}
    >
      {children}
    </span>
  );
}

/**
 * The outer frame of an app-styled mock-up: a rounded window that clips the app's own chrome.
 * Each app draws its own bars and sidebars inside; this only sets the size and the accessible name.
 */
export function Shell({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("flex h-[460px] flex-col overflow-hidden rounded-md bg-white select-none [&_img]:pointer-events-none text-left text-[0.8125rem] leading-normal text-ink", className)}
    >
      {children}
    </div>
  );
}

/** A small round avatar with initials. */
export function Initials({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return <span className={cn("grid size-8 flex-none place-items-center text-[11px] font-semibold", className)}>{initials}</span>;
}

/** Tesseract's avatar inside the mock-ups: the white logo on a black square. */
export function TesseractMark({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn("grid flex-none place-items-center rounded-[4px] bg-ink text-white", className)}
      style={{ width: size, height: size }}
    >
      <Logo className="size-[68%]" />
    </span>
  );
}
