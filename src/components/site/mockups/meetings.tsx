/* eslint-disable @next/next/no-img-element -- a small static SVG logo */
import {
  ChevronUp,
  Circle,
  LayoutGrid,
  MessageSquare,
  Mic,
  MicOff,
  MonitorUp,
  ShieldCheck,
  Smile,
  Users,
  Video,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Cite, Shell, reveal } from "./window-frame";

/* Zoom: an investment committee call on an acquisition; Tesseract pulls past deal multiples into the Zoom Apps panel for everyone to see. */

const PEOPLE = [
  { name: "Hamilton Park", tone: "bg-[#7C6A58]", speaking: true },
  { name: "Karthik Valluri", tone: "bg-[#5B6B5A]", muted: true },
  { name: "Ishan Sinha", tone: "bg-[#5E6475]", muted: true },
  { name: "Dhruv Pendharkar", tone: "bg-[#6E5A66]" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

function Tool({ icon: Icon, label, caret, badge, className }: { icon: typeof Mic; label: string; caret?: boolean; badge?: string; className?: string }) {
  return (
    <span className={cn("relative grid justify-items-center gap-0.5 text-[9.5px] text-white/85", className)}>
      <span className="flex items-center gap-0.5">
        <Icon className="size-[17px]" strokeWidth={1.8} />
        {caret && <ChevronUp className="size-2.5 text-white/60" />}
      </span>
      {label}
      {badge && <span className="absolute -top-1 left-1/2 ml-1 rounded-full bg-white/20 px-1 text-[8.5px]">{badge}</span>}
    </span>
  );
}

export function MeetingsMockup() {
  return (
    <Shell
      className="bg-[#1A1A1A] text-white"
      label="Mock-up: a Zoom meeting, the Project Falcon investment committee, with four people and a live caption asking what was paid for comparable acquisitions; the Tesseract app panel answers 11.4 times EBITDA for Northwind in 2024 and 12.8 times for Globex Labs in 2025, so the seller's 14 times ask is above both, citing the deal memos, shown to everyone on the call."
    >
      {/* top bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-white/80">
        <ShieldCheck className="size-3.5 text-[#23D959]" strokeWidth={2} />
        <img draggable={false} src="/logos/apps/zoom.svg" alt="" className="h-2.5 w-auto brightness-0 invert" />
        <span className="mx-auto">Project Falcon &middot; Investment committee</span>
        <span className="flex items-center gap-1 rounded-[4px] bg-white/10 px-2 py-0.5">
          <LayoutGrid className="size-3" /> View
        </span>
      </div>
      <div className="flex min-h-0 flex-1 gap-2 px-2">
        {/* gallery */}
        <div className="relative grid min-h-0 flex-1 grid-cols-2 gap-1">
          {PEOPLE.map((p) => (
            <div key={p.name} className={cn("relative grid place-items-center bg-[#242424]", p.speaking && "outline outline-[2.5px] outline-offset-[-2.5px] outline-[#23D959]")}>
              <span className={cn("grid size-12 place-items-center rounded-full text-[14px] font-semibold", p.tone)}>{initials(p.name)}</span>
              <span className="absolute bottom-1 left-1 flex items-center gap-1 rounded-[3px] bg-black/60 px-1.5 py-0.5 text-[10px]">
                {p.muted && <MicOff className="size-2.5 text-[#E02828]" strokeWidth={2.2} />}
                {p.name}
              </span>
            </div>
          ))}
          <p {...reveal(0)} className="absolute inset-x-8 bottom-9 rounded-[4px] bg-black/75 px-3 py-1.5 text-center text-[11.5px]">
            <b>Hamilton Park:</b> They&rsquo;re asking 14&times; EBITDA. What did we pay on our last deals?
          </p>
        </div>
        {/* Zoom Apps panel */}
        <aside className="hidden w-[214px] flex-none flex-col gap-2.5 overflow-hidden rounded-[6px] bg-white p-2.5 text-ink sm:flex">
          <p className="flex items-center justify-between border-b border-line pb-2 text-[12px] font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="grid size-4 place-items-center rounded-[3px] bg-ink text-[9px] text-white">T</span>
              Tesseract
            </span>
            <span className="text-[10.5px] font-normal text-stone">Apps</span>
          </p>
          <p {...reveal(1)} className="justify-self-end rounded-[10px_10px_3px_10px] bg-paper-2 px-2.5 py-1.5 text-[11.5px] font-medium">
            What multiples did we pay on comparable acquisitions?
          </p>
          <div {...reveal(2)} className="grid gap-1 rounded-[4px] border border-line border-l-[3px] border-l-forest bg-white p-2.5 text-[11.5px]">
            <p className="font-semibold">Northwind at 11.4&times; EBITDA (2024) and Globex Labs at 12.8&times; (2025). Falcon&rsquo;s 14&times; ask is above both.</p>
            <Cite>Deal memos &middot; Corp Dev &middot; SharePoint</Cite>
          </div>
          <p className="mt-auto text-[10px] text-stone">Shared with everyone in the meeting</p>
        </aside>
      </div>
      {/* toolbar */}
      <div className="mt-2 flex items-end gap-4 bg-[#111] px-4 py-2">
        <Tool icon={Mic} label="Mute" caret />
        <Tool icon={Video} label="Stop Video" caret />
        <span className="mx-auto flex items-end gap-4">
          <Tool icon={Users} label="Participants" badge="4" className="hidden sm:grid" />
          <Tool icon={MessageSquare} label="Chat" className="hidden sm:grid" />
          <Tool icon={MonitorUp} label="Share" className="[&_svg]:text-[#23D959]" />
          <Tool icon={Circle} label="Record" className="hidden md:grid" />
          <Tool icon={Smile} label="Reactions" className="hidden md:grid" />
          <Tool icon={LayoutGrid} label="Apps" />
        </span>
        <span className="rounded-[6px] bg-[#E02828] px-3 py-1.5 text-[11px] font-semibold">End</span>
      </div>
    </Shell>
  );
}
