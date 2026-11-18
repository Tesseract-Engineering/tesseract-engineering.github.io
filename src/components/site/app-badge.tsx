/* eslint-disable @next/next/no-img-element -- small static SVG logos; next/image adds nothing in a static export */
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type App = { name: string; logo: string; box: readonly [number, number] };

/**
 * A tool's logo alone in a white tile. Every tile is the same size; the logo is scaled to fit its
 * own box inside it (object-contain), so nothing overflows and wordmarks and icons line up.
 */
export function AppBadge({ app, className, style }: { app: App; className?: string; style?: CSSProperties }) {
  return (
    <span
      style={style}
      className={cn(
        "grid h-[60px] w-[150px] place-items-center rounded-box border border-line-2 bg-white shadow-[0_1px_2px_rgb(0_0_0/0.06)] select-none",
        className,
      )}
    >
      <img src={app.logo} alt={app.name} draggable={false} className="pointer-events-none object-contain" style={{ width: app.box[0], height: app.box[1] }} />
    </span>
  );
}
