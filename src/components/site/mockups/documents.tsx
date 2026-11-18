/* eslint-disable @next/next/no-img-element -- a small static SVG icon */
import {
  AlignLeft,
  Bold,
  ChevronDown,
  ClipboardPaste,
  Grip,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  MessageSquare,
  Search,
  Underline,
  Undo2,
  X,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Cite, Shell, TesseractMark, reveal } from "./window-frame";

/* Microsoft Word for the web: a lawyer reviews a customer contract; Tesseract checks it against the playbook. */

function Note({ warn, label, i, children }: { warn?: boolean; label: string; i: number; children: ReactNode }) {
  return (
    <div
      {...reveal(i)}
      className={cn("grid gap-1 rounded-[4px] border border-line bg-white px-2.5 py-2 text-[11.5px] leading-[1.45]", warn && "border-l-[3px] border-l-ink")}
    >
      <b className={cn("label-mono text-[0.58rem]", warn ? "text-ink" : "text-stone")}>{label}</b>
      {children}
    </div>
  );
}

function Box({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("flex items-center gap-1 rounded-[3px] border border-line-2 bg-white px-1.5 py-0.5", className)}>{children}</span>;
}

export function DocumentsMockup() {
  return (
    <Shell label="Mock-up: Microsoft Word. A lawyer reviews the limitation-of-liability clause in a customer services agreement; the Tesseract add-in flags that a one-times-fees cap breaks the contracting playbook and cites an earlier contract where two times fees was agreed.">
      {/* title bar */}
      <div className="flex items-center gap-2.5 bg-[#185ABD] px-2.5 py-1.5 text-[12px] text-white">
        <Grip className="size-3.5" />
        <img draggable={false} src="/logos/apps/word.svg" alt="" className="size-4" />
        <b className="font-semibold">Word</b>
        <span className="hidden truncate text-white/90 sm:inline">Initech MSA, redline v3 &middot; Saved</span>
        <span className="mx-auto hidden w-[28%] items-center gap-1.5 rounded-[4px] bg-white/90 px-2 py-0.5 text-[11px] text-stone lg:flex">
          <Search className="size-3" /> Search (Alt + Q)
        </span>
        <span className="ml-auto grid size-5 place-items-center rounded-full bg-[#E8D9C9] text-[9px] font-semibold text-ink">KV</span>
      </div>
      {/* ribbon tabs */}
      <div className="flex items-center gap-3.5 border-b border-line bg-white px-3 pt-1.5 text-[11.5px]">
        {["File", "Home", "Insert", "Draw", "Layout", "References", "Review", "View"].map((m) => (
          <span key={m} className={cn("pb-1.5", m === "Home" ? "border-b-2 border-[#185ABD] font-semibold text-[#185ABD]" : "text-[#424242]")}>
            {m}
          </span>
        ))}
        <span className="ml-auto mb-1.5 hidden items-center gap-1 rounded-[4px] border border-line-2 px-2 py-0.5 sm:flex">
          <MessageSquare className="size-3" /> Comments
        </span>
        <span className="mb-1.5 hidden rounded-[4px] bg-[#185ABD] px-2.5 py-0.5 font-semibold text-white sm:inline">Share</span>
      </div>
      {/* ribbon commands */}
      <div className="flex items-center gap-2 border-b border-line bg-[#FAF9F8] px-3 py-1.5 text-[11px] text-[#424242]">
        <Undo2 className="size-3.5" />
        <ClipboardPaste className="size-3.5" />
        <i className="h-4 w-px bg-line-2" />
        <Box className="w-[78px] justify-between">
          Aptos <ChevronDown className="size-3" />
        </Box>
        <Box>12</Box>
        <Bold className="size-3.5" />
        <Italic className="size-3.5" />
        <Underline className="size-3.5" />
        <Highlighter className="size-3.5" />
        <i className="h-4 w-px bg-line-2" />
        <List className="size-3.5" />
        <ListOrdered className="size-3.5" />
        <AlignLeft className="size-3.5" />
        <Box className="ml-1 hidden md:flex">Track Changes: On</Box>
      </div>
      {/* page and task pane */}
      <div className="flex min-h-0 flex-1 bg-[#F0F0F0]">
        <div className="min-w-0 flex-1 overflow-hidden px-5 pt-3">
          <div className="grid content-start gap-2 bg-white px-8 pt-6 pb-10 text-[12.5px] leading-[1.55] shadow-[0_1px_3px_rgb(0_0_0/0.15)]">
            <p className="text-[15px] font-medium text-[#0F4761]">9. Limitation of Liability</p>
            <p>
              9.1 Except for breaches of confidentiality,{" "}
              <mark className="bg-forest-soft px-0.5 text-ink shadow-[inset_0_-2px_0_var(--color-forest)]">
                Supplier&rsquo;s total liability shall not exceed the fees paid in the twelve (12) months preceding the claim.
              </mark>
            </p>
            <p>
              9.2 Neither party is liable for indirect or consequential damages.{" "}
              <span className="text-[#C4314B] underline decoration-[#C4314B]">including lost profits</span>
            </p>
            <p className="text-[15px] font-medium text-[#0F4761]">10. Term and Termination</p>
            <span className="block h-1.5 rounded bg-paper-2" />
            <span className="block h-1.5 w-4/5 rounded bg-paper-2" />
          </div>
        </div>
        <aside className="hidden w-[214px] flex-none flex-col gap-2 overflow-hidden border-l border-line-2 bg-white p-2.5 sm:flex">
          <p className="flex items-center gap-1.5 border-b border-line pb-2 text-[12.5px] font-semibold">
            <TesseractMark size={16} />
            Tesseract
            <X className="ml-auto size-3.5 text-stone" />
          </p>
          <span className="rounded-[4px] bg-[#185ABD] px-2 py-1 text-center text-[11.5px] font-semibold text-white">Check this document</span>
          <Note warn label="Breaks playbook" i={0}>
            <p>Enterprise deals cap liability at 2&times; annual fees. This clause says 1&times;.</p>
            <Cite>Contracting playbook v4 &middot; &sect;3.2</Cite>
          </Note>
          <Note label="Precedent" i={1}>
            <p>Globex pushed back the same way in 2025 and settled at 2&times;. Hamilton Park negotiated it.</p>
            <Cite>Globex MSA &sect;9.1 &middot; SharePoint</Cite>
          </Note>
        </aside>
      </div>
      {/* status bar */}
      <div className="flex items-center gap-3 border-t border-line bg-[#F3F2F1] px-3 py-1 text-[10.5px] text-[#605E5C]">
        <span>Page 2 of 6</span>
        <span>1,284 words</span>
        <span className="hidden sm:inline">English (U.S.)</span>
        <span className="ml-auto flex items-center gap-1.5">
          &minus; <i className="h-[3px] w-16 rounded bg-[#C8C6C4]" /> + <span className="ml-1">100%</span>
        </span>
      </div>
    </Shell>
  );
}
