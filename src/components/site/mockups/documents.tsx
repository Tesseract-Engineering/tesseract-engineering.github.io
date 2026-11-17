import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Cite, Mini, WindowFrame, reveal } from "./window-frame";

function Note({ warn, label, i, children }: { warn?: boolean; label: string; i: number; children: ReactNode }) {
  return (
    <div
      {...reveal(i)}
      className={cn(
        "grid gap-1 rounded-md border border-line bg-white px-3 py-[11px] text-[0.8125rem] leading-[1.45]",
        warn && "border-l-2 border-l-ink",
      )}
    >
      <b className={cn("label-mono text-[0.625rem]", warn ? "text-ink" : "text-stone")}>{label}</b>
      {children}
    </div>
  );
}

export function DocumentsMockup() {
  return (
    <WindowFrame
      title="Design: billing-service verifies OIDC tokens directly"
      label="Mock-up: a Google Docs design document with a highlighted passage and the Tesseract sidebar listing a contradiction and who to talk to."
      bodyClassName="gap-0 p-0 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
    >
      <div className="grid content-start gap-3 p-[clamp(16px,2.4vw,26px)]">
        <p className="font-display text-lg leading-[1.3] font-medium">2. Proposal</p>
        <p>
          billing-service will verify OIDC ID tokens itself and read the namespaced claims.{" "}
          <mark className="bg-forest-soft px-0.5 text-ink shadow-[inset_0_-2px_0_var(--color-forest)]">
            Once it ships, we delete the compatibility shim in auth-service.
          </mark>{" "}
          Rollout is a single release.
        </p>
        <span className="block h-2 rounded bg-paper-2" />
        <span className="block h-2 w-3/5 rounded bg-paper-2" />
      </div>
      <div className="grid content-start gap-2.5 border-t border-line bg-paper p-4 sm:border-t-0 sm:border-l">
        <p className="flex items-center justify-between text-sm font-semibold">
          Tesseract <Mini primary>Check</Mini>
        </p>
        <Note warn label="Contradicts" i={0}>
          <p>The exports webhook still reads the old claim, so removing the shim breaks it.</p>
          <Cite>SBX-14 &middot; Jira</Cite>
        </Note>
        <Note label="Talk to" i={1}>
          <p>Dhruv Pendharkar owns the shim. Ishan Sinha wrote it.</p>
          <Cite>auth-service &middot; CODEOWNERS</Cite>
        </Note>
      </div>
    </WindowFrame>
  );
}
