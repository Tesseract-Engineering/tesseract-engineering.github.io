import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Bell,
  Bold,
  ChevronDown,
  Clock,
  Home,
  Italic,
  Link2,
  List,
  Lock,
  MessagesSquare,
  Mic,
  MoreHorizontal,
  Plus,
  Search,
  SendHorizontal,
  Smile,
  Strikethrough,
  Type,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Cite, Initials, Mini, Shell, reveal } from "./window-frame";

/* Slack: a mechanical engineer asks about a torque spec in #drivetrain; Tesseract answers from the change order. */

function RailItem({ icon: Icon, label, on }: { icon: typeof Home; label: string; on?: boolean }) {
  return (
    <span className="grid justify-items-center gap-0.5 text-[9.5px] text-white/80">
      <span className={cn("grid size-8 place-items-center rounded-lg", on && "bg-white/20")}>
        <Icon className="size-[17px]" strokeWidth={1.8} />
      </span>
      {label}
    </span>
  );
}

function Reaction({ emoji, n, mine }: { emoji: string; n: number; mine?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[11px]",
        mine ? "border-[#1D9BD1] bg-[#E8F5FA] text-[#1264A3]" : "border-line-2 bg-paper-2 text-stone",
      )}
    >
      {emoji} <b className="font-semibold">{n}</b>
    </span>
  );
}

function Message({ avatar, name, app, time, children, i }: { avatar: ReactNode; name: string; app?: boolean; time: string; children: ReactNode; i: number }) {
  return (
    <div {...reveal(i)} className="flex gap-2.5">
      {avatar}
      <div className="grid min-w-0 gap-1.5">
        <p className="leading-none">
          <b className="text-[13.5px]">{name}</b>
          {app && <span className="ml-1 rounded-[3px] bg-paper-2 px-1 py-px align-[1px] text-[9.5px] font-semibold text-stone">APP</span>}
          <span className="ml-1.5 text-[11.5px] text-stone">{time}</span>
        </p>
        {children}
      </div>
    </div>
  );
}

export function MessagesMockup() {
  return (
    <Shell label="Mock-up: Slack. In the #drivetrain channel, a mechanical engineer asks @Tesseract for the torque spec on the gearbox housing bolts and why it changed; Tesseract answers 40 newton-metres, citing the engineering change order, and offers to request access to a restricted supplier report.">
      {/* top bar */}
      <div className="flex items-center gap-2 bg-[#350D36] px-2.5 py-1.5 text-white/80">
        <ArrowLeft className="size-3.5" />
        <ArrowRight className="size-3.5 opacity-50" />
        <Clock className="size-3.5" />
        <span className="mx-auto flex w-[52%] items-center gap-2 rounded-md bg-white/15 px-2.5 py-1 text-[11.5px] text-white/75">
          <Search className="size-3" /> Search Northwind
        </span>
      </div>
      <div className="flex min-h-0 flex-1 bg-[#350D36]">
        {/* workspace rail */}
        <nav className="hidden w-[58px] flex-none flex-col items-center gap-3 pt-2.5 sm:flex">
          <span className="grid size-8 place-items-center rounded-lg bg-white text-[13px] font-bold text-[#350D36]">N</span>
          <RailItem icon={Home} label="Home" on />
          <RailItem icon={MessagesSquare} label="DMs" />
          <RailItem icon={Bell} label="Activity" />
          <RailItem icon={MoreHorizontal} label="More" />
        </nav>
        {/* channel sidebar */}
        <aside className="hidden w-[168px] flex-none flex-col gap-px rounded-tl-lg bg-[#4A154B] px-2 py-2.5 text-[12.5px] text-white/75 sm:flex">
          <p className="flex items-center gap-1 px-2 pb-2 text-[14.5px] font-bold text-white">
            Northwind <ChevronDown className="size-3.5" />
          </p>
          <p className="flex items-center gap-1 px-2 pb-0.5 text-[12px]">
            <ChevronDown className="size-3" /> Channels
          </p>
          {["general", "drivetrain", "test-lab", "suppliers", "releases"].map((c) => (
            <p key={c} className={cn("rounded-md px-2 py-[3px]", c === "drivetrain" && "bg-white/90 font-semibold text-[#4A154B]")}>
              # {c}
            </p>
          ))}
          <p className="flex items-center gap-1 px-2 pt-2 pb-0.5 text-[12px]">
            <ChevronDown className="size-3" /> Apps
          </p>
          <p className="flex items-center gap-1.5 px-2 py-[3px]">
            <span className="grid size-4 place-items-center rounded-[3px] bg-ink text-[9px] font-semibold text-white">T</span>Tesseract
          </p>
        </aside>
        {/* channel */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white sm:rounded-tl-none">
          <div className="border-b border-line px-4 pt-2">
            <p className="flex items-center gap-1 text-[15px] font-bold">
              # drivetrain <ChevronDown className="size-3.5" />
              <span className="ml-auto flex items-center gap-1 rounded-md border border-line-2 px-1.5 py-0.5 text-[11px] font-normal text-stone">
                <span className="flex -space-x-1">
                  <i className="size-3.5 rounded-[3px] bg-[#E8D9C9] ring-1 ring-white" />
                  <i className="size-3.5 rounded-[3px] bg-[#C9D8E8] ring-1 ring-white" />
                </span>
                24
              </span>
            </p>
            <p className="mt-1.5 flex gap-4 text-[12px]">
              <span className="border-b-2 border-[#1264A3] pb-1.5 font-semibold">Messages</span>
              <span className="pb-1.5 text-stone">Canvas</span>
              <span className="pb-1.5 text-stone">Files</span>
            </p>
          </div>
          <div className="grid flex-1 content-start gap-3 overflow-hidden px-4 py-2.5">
            <Message i={0} avatar={<Initials name="Ishan Sinha" className="rounded-lg bg-[#E8D9C9]" />} name="Ishan Sinha" time="2:14 PM">
              <p>
                <span className="rounded-[3px] bg-[#E8F5FA] px-0.5 text-[#1264A3]">@Tesseract</span> what&rsquo;s the torque spec for the M8 bolts
                on the gearbox housing, and why did it change?
              </p>
            </Message>
            <Message
              i={1}
              avatar={<span className="grid size-8 flex-none place-items-center rounded-lg bg-ink text-[13px] font-semibold text-white">T</span>}
              name="Tesseract"
              app
              time="2:14 PM"
            >
              <p className="font-semibold">
                40 N&middot;m, down from 45 N&middot;m since Rev C. The higher torque cracked the cast aluminium bosses on two Rev B prototypes.
              </p>
              <blockquote className="border-l-[3px] border-[#DDDDDD] pl-2.5">
                &ldquo;Reduce M8 housing bolt torque to 40 N&middot;m to prevent boss cracking.&rdquo;
                <Cite>ECN-0412 &middot; PLM &middot; Diego Torres</Cite>
              </blockquote>
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-stone">
                <Lock aria-hidden className="size-3" strokeWidth={1.8} /> Supplier failure report: Procurement only. <Mini>Request access</Mini>
              </span>
              <span className="flex flex-wrap items-center gap-1.5">
                <Reaction emoji="👀" n={3} mine />
                <Reaction emoji="✅" n={2} />
                <span className="ml-1 text-[12px] font-semibold text-[#1264A3]">2 replies</span>
              </span>
            </Message>
          </div>
          {/* composer */}
          <div className="mx-3 mb-3 rounded-lg border border-line-2">
            <p className="flex items-center gap-2.5 border-b border-line bg-paper-2/60 px-2.5 py-1.5 text-stone">
              <Bold className="size-3.5" />
              <Italic className="size-3.5" />
              <Strikethrough className="size-3.5" />
              <Link2 className="size-3.5" />
              <List className="size-3.5" />
            </p>
            <p className="px-2.5 py-2 text-stone">Message #drivetrain</p>
            <p className="flex items-center gap-2.5 px-2.5 pb-1.5 text-stone">
              <span className="grid size-5 place-items-center rounded-full bg-paper-2">
                <Plus className="size-3.5" />
              </span>
              <Type className="size-3.5" />
              <Smile className="size-3.5" />
              <AtSign className="size-3.5" />
              <Mic className="size-3.5" />
              <span className="ml-auto grid size-6 place-items-center rounded-[4px] bg-[#007A5A] text-white">
                <SendHorizontal className="size-3.5" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
