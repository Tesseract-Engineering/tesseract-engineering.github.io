/* eslint-disable @next/next/no-img-element -- small static SVG logos; next/image adds nothing in a static export */
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type App = { name: string; logo: string; wordmark?: boolean };

/**
 * An app's logo on a small white chip. Icon logos get the app's name beside them; wordmark logos
 * (Zoom, ServiceNow, Jira) already spell it, so they stand alone with the name as alt text.
 */
export function AppBadge({ app, className, style }: { app: App; className?: string; style?: CSSProperties }) {
  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center gap-2 rounded-btn border border-line-2 bg-white px-3 py-2 text-[13px] font-medium whitespace-nowrap text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)]",
        className,
      )}
    >
      {app.wordmark ? (
        <img src={app.logo} alt={app.name} className="h-[17px] w-auto" />
      ) : (
        <>
          <img src={app.logo} alt="" className="size-5" />
          {app.name}
        </>
      )}
    </span>
  );
}
