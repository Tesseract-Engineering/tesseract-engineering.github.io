import { Search } from "lucide-react";
import type { ReactNode } from "react";

import type { ToolId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Shell, reveal } from "./window-frame";

/*
  The same IT request handled in ServiceNow or in Jira Service Management: Tesseract recognises a
  repeat issue from an earlier ticket, cites the runbook and drafts the fix for IT to approve.
*/

function Suggestion({ ticket, earlier, approve }: { ticket: string; earlier: string; approve: string }) {
  return (
    <div className="grid gap-2.5 rounded-md border border-line bg-white p-3">
      <p {...reveal(0)} className="flex items-center gap-2 text-[12px]">
        <span className="grid size-5 place-items-center rounded-[4px] bg-ink text-[10px] font-semibold text-white">T</span>
        <b>Tesseract</b>
        <span className="inline-flex items-center gap-1.5 rounded-[3px] bg-forest-soft px-1.5 py-0.5 text-[11px] font-medium text-forest">
          Seen before: {earlier}
        </span>
      </p>
      <p {...reveal(1)}>Same VPN timeout as {earlier}, fixed by updating the VPN client to 6.2.</p>
      <div {...reveal(2)} className="grid gap-1 rounded-md bg-paper-2 px-3 py-2.5">
        <p className="label-mono text-[0.6rem] text-stone">Draft reply to Lena</p>
        <p>This is a known issue with the older VPN client. Update it from Self Service under VPN; it takes two minutes.</p>
        <p className="font-mono text-[0.65rem] text-forest">
          {earlier} &middot; Runbook: VPN client &middot; {ticket}
        </p>
      </div>
      <div {...reveal(3)} className="flex gap-2">
        <span className={cn("rounded-[4px] px-3 py-1.5 text-[12px] font-semibold text-white", approve)}>Approve and send</span>
        <span className="rounded-[4px] border border-line-2 px-3 py-1.5 text-[12px] font-semibold">Edit</span>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-0.5">
      <span className="text-[10.5px] text-stone">{label}</span>
      <span className="truncate rounded-[3px] border border-line-2 bg-white px-2 py-1 text-[12px]">{children}</span>
    </div>
  );
}

function ServiceNow() {
  return (
    <Shell label="Mock-up: a ServiceNow incident where Tesseract recognises a repeat VPN issue, cites the earlier incident and runbook, and drafts a reply for IT to approve.">
      <div className="flex items-center gap-3 bg-[#032D42] px-3 py-2 text-[12.5px] text-white">
        <span className="font-semibold">Service Operations Workspace</span>
        <span className="ml-auto hidden w-[34%] items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11.5px] text-white/70 sm:flex">
          <Search className="size-3" /> Search
        </span>
      </div>
      <div className="flex min-h-0 flex-1 bg-[#F4F5F7]">
        <div className="min-w-0 flex-1 overflow-hidden p-3">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-mono text-[12px] text-stone">INC0012291</span>
            <b className="text-[14px]">VPN drops on Wi-Fi</b>
            <span className="ml-auto rounded-full bg-[#FFF4CE] px-2 py-0.5 text-[11px] font-semibold text-[#6B5200]">In Progress</span>
          </div>
          <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Field label="Caller">Lena Park</Field>
            <Field label="Category">Network</Field>
            <Field label="Priority">3 - Moderate</Field>
            <Field label="Assignment group">IT Service Desk</Field>
          </div>
          <p className="mb-1.5 text-[11.5px] font-semibold text-stone">Activity</p>
          <Suggestion ticket="INC0012291" earlier="INC0011876" approve="bg-[#032D42]" />
        </div>
      </div>
    </Shell>
  );
}

function Jira() {
  return (
    <Shell label="Mock-up: a Jira Service Management request where Tesseract recognises a repeat VPN issue, cites the earlier request and runbook, and drafts a reply for IT to approve.">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2">
        <span className="grid size-5 place-items-center rounded-[4px] bg-[#0C66E4] text-[10px] font-bold text-white">J</span>
        <span className="text-[12.5px] font-semibold">IT Service Desk</span>
        <span className="ml-auto hidden w-[34%] items-center gap-2 rounded-[4px] border border-line-2 px-2.5 py-1 text-[11.5px] text-stone sm:flex">
          <Search className="size-3" /> Search
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[150px] flex-none bg-[#F7F8F9] px-2 py-3 text-[12px] sm:block">
          <p className="px-2 pb-1.5 text-[11px] font-semibold text-stone">Queues</p>
          {[
            ["All open", 12],
            ["Assigned to me", 3],
            ["Network", 4],
            ["Access requests", 5],
          ].map(([q, n]) => (
            <p key={q} className={cn("flex justify-between rounded-[4px] px-2 py-1", q === "Network" && "bg-[#E9F2FF] font-semibold text-[#0C66E4]")}>
              {q} <span className="text-stone">{n}</span>
            </p>
          ))}
        </aside>
        <div className="min-w-0 flex-1 overflow-hidden p-3">
          <p className="text-[11.5px] text-stone">IT Service Desk / IT-2291</p>
          <div className="mt-0.5 mb-2.5 flex items-center gap-2">
            <b className="text-[15px]">VPN drops on Wi-Fi</b>
            <span className="ml-auto rounded-[3px] bg-[#CCE0FF] px-1.5 py-0.5 text-[10.5px] font-bold text-[#0055CC] uppercase">In progress</span>
          </div>
          <p className="mb-2.5 text-[12px] text-stone">Raised by Lena Park &middot; Request type: Network problem</p>
          <Suggestion ticket="IT-2291" earlier="IT-1876" approve="bg-[#0C66E4]" />
        </div>
      </div>
    </Shell>
  );
}

export function SupportMockup({ tool }: { tool: ToolId }) {
  return tool === "jsm" ? <Jira /> : <ServiceNow />;
}
