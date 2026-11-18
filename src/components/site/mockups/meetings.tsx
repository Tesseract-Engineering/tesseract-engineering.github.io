import { LayoutGrid, MessageSquare, Mic, MonitorUp, PhoneOff, Users, Video } from "lucide-react";

import type { ToolId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Cite, Shell, reveal } from "./window-frame";

/* The same live call and the same cited answer, shown in Google Meet or in Zoom. */

const PEOPLE = [
  { name: "Hamilton Park", tone: "bg-[#7C6A58]", speaking: true },
  { name: "Karthik Valluri", tone: "bg-[#5B6B5A]" },
  { name: "Lena Park", tone: "bg-[#5E6475]" },
  { name: "Dhruv Pendharkar", tone: "bg-[#6E5A66]" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

function Tiles({ tile, ring }: { tile: string; ring: string }) {
  return (
    <div className="relative grid min-h-0 flex-1 grid-cols-2 gap-1.5">
      {PEOPLE.map((p) => (
        <div key={p.name} className={cn("relative grid place-items-center rounded-lg", tile, p.speaking && ring)}>
          <span className={cn("grid size-11 place-items-center rounded-full text-[13px] font-semibold text-white", p.tone)}>{initials(p.name)}</span>
          <span className="absolute bottom-1.5 left-2 text-[10.5px] text-white/90">{p.name.split(" ")[0]}</span>
        </div>
      ))}
      <p
        {...reveal(0)}
        className="absolute inset-x-6 bottom-8 rounded-md bg-black/70 px-3 py-1.5 text-center text-[11.5px] text-white"
      >
        <b>Hamilton:</b> Can we just raise the export limit for Initech this week?
      </p>
    </div>
  );
}

function Panel({ className }: { className?: string }) {
  return (
    <aside className={cn("hidden w-[220px] flex-none flex-col gap-2.5 overflow-hidden p-3 sm:flex", className)}>
      <p className="flex items-center justify-between text-[13px] font-semibold">
        Tesseract
        <span className="label-mono inline-flex items-center gap-1.5 text-[0.55rem] text-forest">
          <i className="size-1.5 animate-pulse rounded-full bg-current" />
          Listening
        </span>
      </p>
      <p {...reveal(1)} className="justify-self-end rounded-[10px_10px_3px_10px] bg-paper-2 px-3 py-2 text-[12px] font-medium">
        What happened last time we raised export limits?
      </p>
      <div {...reveal(2)} className="grid gap-1.5 rounded-md border border-line border-l-2 border-l-forest bg-white p-3 text-[12px]">
        <p className="font-semibold">Raised for ACME in August, rolled back two days later: legacy-exporter ran out of memory on large tenants.</p>
        <Cite>INC-12 &middot; postmortem</Cite>
      </div>
      <p className="text-[10.5px] text-stone">Shown to everyone on the call</p>
    </aside>
  );
}

function GoogleMeet() {
  return (
    <Shell
      className="bg-[#202124] text-white"
      label="Mock-up: a Google Meet call with four people, a live caption, and the Tesseract side panel answering a question with a cited postmortem."
    >
      <div className="flex min-h-0 flex-1 gap-2 p-2">
        <Tiles tile="bg-[#3C4043]" ring="outline outline-2 outline-[#8AB4F8]" />
        <Panel className="rounded-lg bg-white text-ink" />
      </div>
      <div className="flex items-center gap-2 px-4 pb-2.5 text-[12px] text-white/80">
        <span className="hidden sm:inline">10:24 &nbsp;|&nbsp; Platform sync</span>
        <span className="mx-auto flex gap-2 sm:mx-0 sm:ml-auto">
          {[Mic, Video, MonitorUp, MessageSquare].map((Icon, i) => (
            <span key={i} className="grid size-8 place-items-center rounded-full bg-[#3C4043]">
              <Icon className="size-4" strokeWidth={1.8} />
            </span>
          ))}
          <span className="grid h-8 w-12 place-items-center rounded-full bg-[#EA4335]">
            <PhoneOff className="size-4" strokeWidth={1.8} />
          </span>
        </span>
      </div>
    </Shell>
  );
}

function Zoom() {
  const bar = [
    { icon: Mic, label: "Mute" },
    { icon: Video, label: "Stop Video" },
    { icon: Users, label: "Participants" },
    { icon: MessageSquare, label: "Chat" },
    { icon: MonitorUp, label: "Share", green: true },
    { icon: LayoutGrid, label: "Apps" },
  ];
  return (
    <Shell
      className="bg-[#1A1A1A] text-white"
      label="Mock-up: a Zoom meeting with four people, a live caption, and the Tesseract app panel answering a question with a cited postmortem."
    >
      <p className="px-3 pt-2 text-center text-[11px] text-white/70">Platform sync</p>
      <div className="flex min-h-0 flex-1 gap-2 p-2">
        <Tiles tile="bg-[#2D2D2D]" ring="outline outline-2 outline-[#5AE85A]" />
        <Panel className="rounded-md bg-white text-ink" />
      </div>
      <div className="flex items-end gap-4 bg-[#111] px-4 py-2 text-[9.5px] text-white/80">
        {bar.map(({ icon: Icon, label, green }) => (
          <span key={label} className={cn("hidden justify-items-center gap-0.5 sm:grid", (label === "Mute" || label === "Share") && "grid")}>
            <Icon className={cn("size-4", green && "text-[#5AE85A]")} strokeWidth={1.8} />
            {label}
          </span>
        ))}
        <span className="ml-auto rounded-[5px] bg-[#E02828] px-3 py-1.5 text-[11px] font-semibold">End</span>
      </div>
    </Shell>
  );
}

export function MeetingsMockup({ tool }: { tool: ToolId }) {
  return tool === "zoom" ? <Zoom /> : <GoogleMeet />;
}
