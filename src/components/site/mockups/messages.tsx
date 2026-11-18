import { AtSign, Bell, CalendarDays, Lock, MessageSquare, Search, Users } from "lucide-react";

import type { ToolId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Cite, Initials, Mini, Shell, reveal } from "./window-frame";

/* The same question and cited answer, shown in Slack or in Microsoft Teams. */

const QUESTION = "@Tesseract why does billing-service still go through the auth shim?";
const ANSWER =
  "billing-service still reads tenant_id from the old claim, so auth-service rewrites it for billing webhooks until billing verifies tokens itself.";
const QUOTE = "Keep the compat shim until billing-service reads namespaced claims.";
const SOURCE = "SBX-10 · Jira · Dhruv Pendharkar";

function Answer() {
  return (
    <>
      <p className="font-semibold">{ANSWER}</p>
      <blockquote className="border-l-2 border-forest py-0.5 pl-3">
        &ldquo;{QUOTE}&rdquo;
        <Cite>{SOURCE}</Cite>
      </blockquote>
    </>
  );
}

function Locked() {
  return (
    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.8125rem] text-stone">
      <Lock aria-hidden className="size-3.5" strokeWidth={1.6} /> 2 related docs are owned by Legal. <Mini>Request access</Mini>
    </span>
  );
}

function Slack() {
  return (
    <Shell label="Mock-up: Tesseract answering a question in a Slack channel, with a quoted source and a request-access button for locked documents.">
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[150px] flex-none flex-col gap-0.5 bg-[#3F0E40] px-2 py-3 text-[12.5px] text-white/70 sm:flex">
          <p className="px-2 pb-3 text-[15px] font-bold text-white">Northwind</p>
          <p className="px-2 pb-1 text-[11.5px]">Channels</p>
          {["general", "platform", "incidents", "payments"].map((c) => (
            <p key={c} className={cn("rounded-[5px] px-2 py-[3px]", c === "platform" && "bg-[#1164A3] text-white")}>
              # {c}
            </p>
          ))}
          <p className="px-2 pt-3 pb-1 text-[11.5px]">Apps</p>
          <p className="flex items-center gap-1.5 px-2 py-[3px]">
            <span className="grid size-4 place-items-center rounded-[3px] bg-ink text-[9px] font-semibold text-white">T</span>Tesseract
          </p>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="text-[15px] font-bold"># platform</span>
            <span className="text-xs text-stone">24 members</span>
          </div>
          <div className="grid flex-1 content-start gap-4 overflow-hidden px-4 py-4">
            <div {...reveal(0)} className="flex gap-2.5">
              <Initials name="Karthik Valluri" className="rounded-[6px] bg-[#E8D9C9]" />
              <div className="min-w-0">
                <p>
                  <b>Karthik Valluri</b> <span className="text-xs text-stone">2:14 PM</span>
                </p>
                <p>{QUESTION}</p>
              </div>
            </div>
            <div {...reveal(1)} className="flex gap-2.5">
              <span className="grid size-8 flex-none place-items-center rounded-[6px] bg-ink text-[13px] font-semibold text-white">T</span>
              <div className="grid min-w-0 gap-2">
                <p>
                  <b>Tesseract</b>{" "}
                  <span className="rounded-[3px] bg-paper-2 px-1 py-px text-[10px] font-semibold text-stone">APP</span>{" "}
                  <span className="text-xs text-stone">2:14 PM</span>
                </p>
                <Answer />
                <Locked />
              </div>
            </div>
          </div>
          <div className="mx-3 mb-3 rounded-lg border border-line-2 px-3 py-2.5 text-stone">Message #platform</div>
        </div>
      </div>
    </Shell>
  );
}

function Teams() {
  const rail = [
    { icon: Bell, label: "Activity" },
    { icon: MessageSquare, label: "Chat" },
    { icon: Users, label: "Teams", on: true },
    { icon: CalendarDays, label: "Calendar" },
  ];
  return (
    <Shell label="Mock-up: Tesseract answering a question in a Microsoft Teams channel, with a quoted source and a request-access button for locked documents.">
      <div className="flex items-center gap-3 bg-[#EBEBF2] px-3 py-1.5">
        <span className="grid size-5 place-items-center rounded-[4px] bg-[#5B5FC7] text-[10px] font-bold text-white">T</span>
        <span className="mx-auto flex w-[46%] items-center gap-2 rounded-[5px] bg-white px-2.5 py-1 text-[12px] text-stone">
          <Search className="size-3" /> Search
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <nav className="hidden w-[58px] flex-none flex-col items-center gap-3 bg-[#EBEBF2] pt-3 text-[9.5px] text-stone sm:flex">
          {rail.map(({ icon: Icon, label, on }) => (
            <span key={label} className={cn("grid justify-items-center gap-0.5", on && "text-[#5B5FC7]")}>
              <Icon className="size-[18px]" strokeWidth={1.7} />
              {label}
            </span>
          ))}
        </nav>
        <aside className="hidden w-[132px] flex-none border-r border-line bg-[#F5F5F5] px-2 py-3 text-[12.5px] md:block">
          <p className="px-2 pb-2 font-semibold">Teams</p>
          <p className="px-2 py-1 font-semibold">Platform</p>
          <p className="rounded-[4px] bg-white px-3 py-1 font-semibold">General</p>
          <p className="px-3 py-1 text-stone">Incidents</p>
          <p className="px-3 py-1 text-stone">Releases</p>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col bg-[#F5F5F5]">
          <div className="flex items-end gap-4 border-b border-line bg-white px-4 pt-2.5">
            <span className="pb-2 text-[15px] font-bold">General</span>
            <span className="border-b-2 border-[#5B5FC7] pb-2 font-semibold">Posts</span>
            <span className="pb-2 text-stone">Files</span>
          </div>
          <div className="grid flex-1 content-start gap-3 overflow-hidden p-3">
            <div {...reveal(0)} className="flex gap-2.5 rounded-md bg-white p-3 shadow-[0_1px_2px_rgb(0_0_0/0.08)]">
              <Initials name="Karthik Valluri" className="size-7 rounded-full bg-[#E8D9C9]" />
              <div className="min-w-0">
                <p>
                  <b>Karthik Valluri</b> <span className="text-xs text-stone">2:14 PM</span>
                </p>
                <p>
                  <span className="font-semibold text-[#5B5FC7]">
                    <AtSign className="inline size-3 align-[-1px]" />
                    Tesseract
                  </span>{" "}
                  why does billing-service still go through the auth shim?
                </p>
              </div>
            </div>
            <div {...reveal(1)} className="ml-9 flex gap-2.5 rounded-md bg-white p-3 shadow-[0_1px_2px_rgb(0_0_0/0.08)]">
              <span className="grid size-7 flex-none place-items-center rounded-[5px] bg-ink text-[12px] font-semibold text-white">T</span>
              <div className="grid min-w-0 gap-2">
                <p>
                  <b>Tesseract</b> <span className="text-xs text-stone">App · 2:14 PM</span>
                </p>
                <Answer />
                <Locked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function MessagesMockup({ tool }: { tool: ToolId }) {
  return tool === "teams" ? <Teams /> : <Slack />;
}
