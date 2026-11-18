import { X } from "lucide-react";
import type { ReactNode } from "react";

import type { ToolId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Cite, Mini, Shell, reveal } from "./window-frame";

/* The same design doc and the same Tesseract check, shown in Google Docs or in Microsoft Word. */

const TITLE = "Design: billing-service verifies OIDC tokens directly";

function Note({ warn, label, i, children }: { warn?: boolean; label: string; i: number; children: ReactNode }) {
  return (
    <div
      {...reveal(i)}
      className={cn(
        "grid gap-1 rounded-md border border-line bg-white px-3 py-2.5 text-[0.78rem] leading-[1.45]",
        warn && "border-l-2 border-l-ink",
      )}
    >
      <b className={cn("label-mono text-[0.6rem]", warn ? "text-ink" : "text-stone")}>{label}</b>
      {children}
    </div>
  );
}

function Notes() {
  return (
    <>
      <Note warn label="Contradicts" i={0}>
        <p>The exports webhook still reads the old claim, so removing the shim breaks it.</p>
        <Cite>SBX-14 &middot; Jira</Cite>
      </Note>
      <Note label="Talk to" i={1}>
        <p>Dhruv Pendharkar owns the shim. Ishan Sinha wrote it.</p>
        <Cite>auth-service &middot; CODEOWNERS</Cite>
      </Note>
    </>
  );
}

function Page() {
  return (
    <div className="grid content-start gap-2.5 bg-white px-7 py-6 text-[0.8125rem] shadow-[0_1px_3px_rgb(0_0_0/0.12)]">
      <p className="text-[1rem] font-semibold">2. Proposal</p>
      <p>
        billing-service will verify OIDC ID tokens itself and read the namespaced claims.{" "}
        <mark className="bg-forest-soft px-0.5 text-ink shadow-[inset_0_-2px_0_var(--color-forest)]">
          Once it ships, we delete the compatibility shim in auth-service.
        </mark>{" "}
        Rollout is a single release.
      </p>
      <span className="block h-1.5 rounded bg-paper-2" />
      <span className="block h-1.5 rounded bg-paper-2" />
      <span className="block h-1.5 w-3/5 rounded bg-paper-2" />
    </div>
  );
}

/** Formatting buttons, drawn as soft placeholder blocks. */
function Toolbar({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {[18, 18, 1, 54, 1, 18, 18, 18, 1, 26, 26].map((w, i) =>
        w === 1 ? <i key={i} className="h-4 w-px bg-line-2" /> : <i key={i} className="h-2.5 rounded-sm bg-black/10" style={{ width: w }} />,
      )}
    </div>
  );
}

function GoogleDocs() {
  return (
    <Shell label="Mock-up: a Google Docs design document with a highlighted passage and the Tesseract side panel listing a contradiction and who to talk to.">
      <div className="flex items-center gap-2.5 px-3 pt-2.5">
        <span className="grid h-7 w-[22px] flex-none content-center gap-[3px] rounded-[3px] bg-[#4285F4] px-1">
          <i className="h-[2px] bg-white" />
          <i className="h-[2px] bg-white" />
          <i className="h-[2px] w-2/3 bg-white" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px]">{TITLE}</p>
          <p className="flex gap-3 text-[11.5px] text-stone">
            {["File", "Edit", "View", "Insert", "Format", "Tools", "Extensions"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
        </div>
        <span className="hidden rounded-full bg-[#C2E7FF] px-3.5 py-1.5 text-[12px] font-semibold text-[#001D35] sm:inline">Share</span>
      </div>
      <Toolbar className="mx-3 my-2 rounded-full bg-[#EDF2FA] px-4 py-2" />
      <div className="flex min-h-0 flex-1 bg-[#F9FBFD]">
        <div className="min-w-0 flex-1 overflow-hidden px-6 pt-4">
          <Page />
        </div>
        <aside className="hidden w-[230px] flex-none flex-col gap-2 overflow-hidden rounded-tl-xl border-l border-line bg-white p-3 sm:flex">
          <p className="flex items-center justify-between text-[13px] font-semibold">
            Tesseract <Mini primary>Check</Mini>
          </p>
          <Notes />
        </aside>
      </div>
    </Shell>
  );
}

function Word() {
  return (
    <Shell label="Mock-up: a Microsoft Word design document with a highlighted passage and the Tesseract task pane listing a contradiction and who to talk to.">
      <div className="flex items-center gap-2.5 bg-[#185ABD] px-3 py-2 text-[12.5px] text-white">
        <span className="grid size-5 place-items-center rounded-[3px] bg-white/20 text-[10px] font-bold">W</span>
        <span className="truncate">{TITLE}</span>
        <span className="ml-auto hidden text-white/75 sm:inline">Saved</span>
      </div>
      <div className="border-b border-line bg-white px-3 pt-1.5">
        <p className="flex gap-4 text-[12px]">
          {["File", "Home", "Insert", "Layout", "References", "Review", "View"].map((m) => (
            <span key={m} className={cn("pb-1.5", m === "Home" ? "border-b-2 border-[#185ABD] font-semibold text-[#185ABD]" : "text-stone")}>
              {m}
            </span>
          ))}
        </p>
      </div>
      <Toolbar className="border-b border-line bg-[#FAF9F8] px-4 py-2" />
      <div className="flex min-h-0 flex-1 bg-[#F3F2F1]">
        <div className="min-w-0 flex-1 overflow-hidden px-6 pt-4">
          <Page />
        </div>
        <aside className="hidden w-[230px] flex-none flex-col gap-2 overflow-hidden border-l border-line-2 bg-white p-3 sm:flex">
          <p className="flex items-center justify-between border-b border-line pb-2 text-[13px] font-semibold">
            Tesseract
            <X className="size-3.5 text-stone" />
          </p>
          <Mini primary>Check this document</Mini>
          <Notes />
        </aside>
      </div>
    </Shell>
  );
}

export function DocumentsMockup({ tool }: { tool: ToolId }) {
  return tool === "word" ? <Word /> : <GoogleDocs />;
}
