/* eslint-disable @next/next/no-img-element -- a small static SVG logo */
import { Bell, ChevronDown, CircleHelp, Grip, Link2, Paperclip, Plus, Search } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Shell, TesseractMark, reveal } from "./window-frame";

/*
  Jira Service Management: a software engineer starting on-call can't get into production Grafana.
  Tesseract recognises that a colleague hit the same error before and offers the fix that worked,
  one click for the IT agent to apply.
*/

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center gap-2 text-[11px]">
      <span className="text-[#44546F]">{label}</span>
      <span className="flex min-w-0 items-center gap-1.5 truncate">{children}</span>
    </div>
  );
}

function Avatar({ name, tone }: { name: string; tone: string }) {
  return (
    <span className={cn("grid size-4 flex-none place-items-center rounded-full text-[7.5px] font-semibold", tone)}>
      {name
        .split(" ")
        .map((w) => w[0])
        .join("")}
    </span>
  );
}

export function SupportMockup() {
  return (
    <Shell label="Mock-up: Jira Service Management. Request IT-2291, raised by engineering manager Karthik Valluri: he starts on-call Monday and can't log in to production Grafana. Tesseract points out that Ishan Sinha hit the same error in October (IT-1876) and offers the fix that worked, adding Karthik to the oncall-readonly group, with an Apply fix button for the IT agent.">
      {/* Atlassian top bar */}
      <div className="flex items-center gap-3 border-b border-[#DCDFE4] px-2.5 py-1.5 text-[11.5px] text-[#44546F]">
        <Grip className="size-3.5" />
        <img draggable={false} src="/logos/apps/jira.svg" alt="" className="h-3.5 w-auto" />
        <span className="hidden items-center gap-3 md:flex">
          {["Your work", "Projects", "Filters", "Dashboards"].map((m) => (
            <span key={m} className="flex items-center gap-0.5 font-medium">
              {m} <ChevronDown className="size-3" />
            </span>
          ))}
        </span>
        <span className="flex items-center gap-1 rounded-[3px] bg-[#0C66E4] px-2 py-0.5 font-semibold text-white">
          <Plus className="size-3" /> Create
        </span>
        <span className="ml-auto hidden w-[24%] items-center gap-1.5 rounded-[3px] border border-[#DCDFE4] px-2 py-0.5 text-[#626F86] sm:flex">
          <Search className="size-3" /> Search
        </span>
        <Bell className="size-3.5" />
        <CircleHelp className="size-3.5" />
      </div>
      <div className="flex min-h-0 flex-1">
        {/* project sidebar */}
        <aside className="hidden w-[150px] flex-none flex-col gap-0.5 border-r border-[#DCDFE4] bg-[#F7F8F9] px-2 py-2.5 text-[11.5px] text-[#44546F] sm:flex">
          <p className="mb-2 flex items-center gap-2 px-1">
            <span className="grid size-6 place-items-center rounded-[4px] bg-[#1F845A] text-[10px] font-bold text-white">IT</span>
            <span className="leading-tight">
              <b className="block text-[11.5px] text-[#172B4D]">IT Service Desk</b>
              <span className="text-[10px]">Service space</span>
            </span>
          </p>
          <p className="px-2 pt-1 pb-0.5 text-[10px] font-semibold tracking-wide uppercase">Queues</p>
          {[
            ["All open", 12],
            ["Assigned to me", 3],
            ["Network", 4],
            ["Access requests", 5],
          ].map(([q, n]) => (
            <p key={q} className={cn("flex justify-between rounded-[3px] px-2 py-1", q === "Access requests" && "bg-[#E9F2FF] font-semibold text-[#0C66E4]")}>
              {q} <span>{n}</span>
            </p>
          ))}
          <p className="px-2 pt-2 pb-0.5 text-[10px] font-semibold tracking-wide uppercase">More</p>
          <p className="px-2 py-1">Customer channels</p>
          <p className="px-2 py-1">Knowledge base</p>
        </aside>
        {/* request */}
        <div className="flex min-w-0 flex-1 overflow-hidden">
          <div className="min-w-0 flex-1 overflow-hidden px-3.5 py-2.5 text-[#172B4D]">
            <p className="text-[11px] text-[#44546F]">Projects / IT Service Desk / IT-2291</p>
            <p className="mt-1 text-[16px] font-semibold">Can&rsquo;t log in to production Grafana</p>
            <p className="mt-1.5 flex gap-1.5 text-[11px] text-[#44546F]">
              <span className="flex items-center gap-1 rounded-[3px] bg-[#F1F2F4] px-1.5 py-0.5">
                <Paperclip className="size-3" /> Attach
              </span>
              <span className="flex items-center gap-1 rounded-[3px] bg-[#F1F2F4] px-1.5 py-0.5">
                <Link2 className="size-3" /> Link issue
              </span>
            </p>
            <p className="mt-2.5 text-[11.5px] text-[#44546F]">Karthik Valluri (Engineering Manager) raised this via Slack</p>
            <p className="text-[12px]">I start on-call Monday but get &ldquo;403 Forbidden&rdquo; on production Grafana. What access do I need?</p>
            {/* Tesseract's suggestion: someone hit this before, here's the fix that worked */}
            <div className="mt-2.5 grid gap-2 rounded-[6px] border border-[#DCDFE4] border-l-[3px] border-l-forest bg-white p-2.5 text-[11.5px]">
              <p {...reveal(0)} className="flex items-center gap-1.5">
                <TesseractMark size={16} />
                <b>Tesseract</b>
                <span className="rounded-[3px] bg-forest-soft px-1.5 py-px text-[10.5px] font-medium text-forest">Seen before</span>
              </p>
              <p {...reveal(1)}>
                <b>Ishan Sinha hit the same 403 in October</b> when he joined the on-call rotation.
              </p>
              <div {...reveal(2)} className="grid gap-1 rounded-[4px] bg-paper-2 px-2.5 py-2">
                <p className="label-mono text-[0.58rem] text-stone">Fix that worked</p>
                <p>Add Karthik to the oncall-readonly group in Okta. Grafana works about five minutes later.</p>
                <p className="font-mono text-[10px] text-forest">IT-1876 &middot; Runbook: On-call access</p>
              </div>
              <p {...reveal(3)} className="flex gap-1.5">
                <span className="rounded-[3px] bg-[#0C66E4] px-2.5 py-1 text-[11px] font-semibold text-white">Apply fix</span>
                <span className="rounded-[3px] bg-[#F1F2F4] px-2.5 py-1 text-[11px] font-semibold text-[#44546F]">Reply to Karthik</span>
              </p>
            </div>
          </div>
          {/* details panel */}
          <aside className="hidden w-[212px] flex-none flex-col gap-2 border-l border-[#DCDFE4] px-2.5 py-2.5 text-[#172B4D] lg:flex">
            <span className="flex w-fit items-center gap-1 rounded-[3px] bg-[#0C66E4] px-2 py-1 text-[11px] font-semibold text-white">
              In Progress <ChevronDown className="size-3" />
            </span>
            <p className="mt-1 text-[11px] font-semibold">Details</p>
            <Detail label="Assignee">
              <Avatar name="Hamilton Park" tone="bg-[#E8D9C9]" /> Hamilton Park
            </Detail>
            <Detail label="Reporter">
              <Avatar name="Karthik Valluri" tone="bg-[#C9D8E8]" /> Karthik Valluri
            </Detail>
            <Detail label="Request type">Access request</Detail>
            <Detail label="Priority">
              <span className="font-bold text-[#E2483D]">=</span> Medium
            </Detail>
            <p className="mt-1 text-[11px] font-semibold">SLAs</p>
            <span className="w-fit rounded-[3px] bg-[#DCFFF1] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#216E4E]">1h 40m to resolution</span>
          </aside>
        </div>
      </div>
    </Shell>
  );
}
