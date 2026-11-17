import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

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

/** A white app window with a title bar, used for every mock-up. */
export function WindowFrame({
  title,
  label,
  bodyClassName,
  children,
}: {
  title: string;
  label: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <div role="img" aria-label={label} className="flex min-h-[300px] flex-col overflow-hidden rounded-md bg-white text-ink">
      <div className="flex min-w-0 items-center gap-2.5 border-b border-line bg-paper-2 px-3.5 py-[11px] font-mono text-xs leading-[1.3] font-medium text-stone">
        <span className="mr-1.5 flex gap-1.5">
          <i className="size-2.5 rounded-full bg-line-2" />
          <i className="size-2.5 rounded-full bg-line-2" />
          <i className="size-2.5 rounded-full bg-line-2" />
        </span>
        <span className="truncate">{title}</span>
      </div>
      <div className={cn("grid min-w-0 flex-1 content-start gap-3.5 p-[clamp(16px,2.4vw,26px)] text-[0.9375rem] leading-normal", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
