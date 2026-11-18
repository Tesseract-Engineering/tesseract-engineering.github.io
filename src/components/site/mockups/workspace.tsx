/* eslint-disable @next/next/no-img-element -- small static SVG logos */
import {
  ArrowUp,
  ChevronDown,
  Hammer,
  History,
  Lock,
  MessageSquare,
  MoreHorizontal,
  Network,
  Paperclip,
  Plug,
  Search,
  Share2,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "../logo";
import { TesseractMark } from "./window-frame";

/*
  The Tesseract workspace, open on Ask: a real conversation where someone taking over a customer
  renewal asks what they need to know, and every answer cites where it came from (contracts, code,
  docs, Slack). Laid out at 1120px and scaled to fit by <ScaleToFit>.
*/

type Source = { n: number; title: string; where: string; logo: string };

const SOURCES: Record<number, Source> = {
  1: { n: 1, title: "Globex order form 2025", where: "SharePoint", logo: "/logos/apps/microsoft-365.svg" },
  2: { n: 2, title: "Fix SSO login loop for Globex", where: "GitHub · PR #482", logo: "/logos/apps/github.svg" },
  3: { n: 3, title: "Globex account plan", where: "Confluence", logo: "/logos/apps/confluence.svg" },
  4: { n: 4, title: "Globex renewal thread, March 2025", where: "Slack · #deals", logo: "/logos/apps/slack.svg" },
};

const RECENT = [
  "What do I need to know before the Globex renewal?",
  "Who owns the billing service?",
  "Why did we change the refund policy in June?",
  "How do I get production access for on-call?",
  "Summarize last week's customer escalations",
];

function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <li
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] text-stone-dark",
        active && "bg-white/[0.08] font-medium text-on-dark",
      )}
    >
      <Icon className="size-[15px]" strokeWidth={1.7} />
      {label}
    </li>
  );
}

/** An inline citation, linked to a source chip below the answer. */
function Ref({ n }: { n: number }) {
  return (
    <span className="mx-0.5 inline-grid size-[17px] place-items-center rounded-[4px] bg-forest-soft align-[1px] text-[10px] font-semibold text-forest">
      {n}
    </span>
  );
}

function SourceChip({ s }: { s: Source }) {
  return (
    <span className="flex items-center gap-2 rounded-md border border-line bg-white py-1.5 pr-2.5 pl-1.5 text-[11.5px]">
      <span className="grid size-[17px] place-items-center rounded-[4px] bg-forest-soft text-[10px] font-semibold text-forest">{s.n}</span>
      <img src={s.logo} alt="" className="size-3.5" />
      <span className="font-medium">{s.title}</span>
      <span className="text-stone">{s.where}</span>
    </span>
  );
}

function Question({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[78%] rounded-[14px_14px_4px_14px] bg-paper-2 px-4 py-2.5 text-[14px]">{children}</p>
    </div>
  );
}

function Answer({ children, sources }: { children: ReactNode; sources: number[] }) {
  return (
    <div className="flex gap-3">
      <TesseractMark size={28} className="rounded-md" />
      <div className="grid min-w-0 flex-1 gap-2.5 text-[14px] leading-[1.6]">
        {children}
        <div className="flex flex-wrap gap-1.5">
          {sources.map((n) => (
            <SourceChip key={n} s={SOURCES[n]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function WorkspaceMockup() {
  return (
    <div
      role="img"
      aria-label="Mock-up of the Tesseract workspace, open on Ask. Someone taking over the Globex renewal asks what they need to know; Tesseract answers that the renewal is due December 15 and Globex asked for 1.2 million dollars while the contract caps increases at 7 percent, that their open SSO issue is fixed in a pull request shipping December 2, and that Hamilton Park owns the account, citing SharePoint, GitHub, Confluence and Slack. A follow-up asks what Globex got last time; Tesseract answers 15 percent off for a two-year term, citing a Slack thread."
      className="flex h-[690px] overflow-hidden rounded-[12px] bg-paper text-left text-ink shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10"
    >
      {/* sidebar */}
      <aside className="flex w-[236px] flex-none flex-col bg-[#161513] px-3 py-4 text-on-dark">
        <div className="mb-4 flex items-center justify-between px-2">
          <span className="flex items-center gap-2 font-display text-[17px] font-semibold tracking-[-0.02em]">
            <Logo className="size-4" />
            Tesseract
          </span>
          <Search className="size-3.5 text-stone-dark" strokeWidth={1.7} />
        </div>
        <p className="mb-3 flex items-center justify-between rounded-md border border-white/10 px-2.5 py-1.5 text-[12px] text-stone-dark">
          <span className="flex items-center gap-2">
            <span className="grid size-4 place-items-center rounded-[3px] bg-[#2E5E4A] text-[9px] font-bold text-white">N</span>
            Northwind
          </span>
          <ChevronDown className="size-3" />
        </p>
        <ul className="grid gap-0.5">
          <NavItem icon={Workflow} label="Swarm" />
          <NavItem icon={Network} label="Knowledge graph" />
          <NavItem icon={Plug} label="Sources" />
          <NavItem icon={MessageSquare} label="Ask" active />
          <NavItem icon={Hammer} label="Forge" />
        </ul>
        <p className="mt-6 mb-1.5 flex items-center gap-1.5 px-2.5 text-[11px] text-stone-dark">
          <History className="size-3" /> Recent
        </p>
        <ul className="grid gap-0.5 text-[12.5px] text-stone-dark">
          {RECENT.map((r, i) => (
            <li key={r} className={cn("line-clamp-2 rounded-md px-2.5 py-[6px] leading-snug", i === 0 && "bg-white/[0.06] text-on-dark")}>
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-2.5 border-t border-white/10 px-2 pt-3 text-[12.5px]">
          <span className="grid size-7 place-items-center rounded-full bg-[#E8D9C9] text-[10px] font-semibold text-ink">KV</span>
          <span className="leading-tight">
            Karthik Valluri
            <span className="block text-[11px] text-stone-dark">Account Executive</span>
          </span>
        </div>
      </aside>

      {/* Ask */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-line bg-white px-6 py-3">
          <MessageSquare className="size-4 text-stone" strokeWidth={1.7} />
          <p className="text-[14px] font-semibold">Globex renewal prep</p>
          <span className="rounded-[4px] bg-paper-2 px-1.5 py-0.5 text-[11px] text-stone">Ask</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-md border border-line-2 px-2.5 py-1 text-[12px]">
            <Share2 className="size-3" /> Share
          </span>
          <MoreHorizontal className="size-4 text-stone" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center overflow-hidden px-6 pt-5">
          <div className="grid w-full max-w-[740px] gap-5">
            <Question>I&rsquo;m taking over the Globex renewal next week. What do I need to know?</Question>
            <Answer sources={[1, 2, 3]}>
              <p>Three things to know before you talk to them:</p>
              <ol className="grid list-decimal gap-1.5 pl-5">
                <li>
                  The renewal is due <b>December 15</b>. They&rsquo;ve asked for <b>$1.2M</b>, but the contract caps increases at 7%, about
                  $1.01M.
                  <Ref n={1} />
                </li>
                <li>
                  Their open issue is an SSO login loop. The fix is merged and ships <b>December 2</b>.
                  <Ref n={2} />
                </li>
                <li>
                  <b>Hamilton Park</b> owns the relationship. His notes from the last call are in the account plan.
                  <Ref n={3} />
                </li>
              </ol>
            </Answer>
            <Question>What did they get last time?</Question>
            <Answer sources={[4]}>
              <p>
                <b>15% off for a two-year term.</b> Hamilton agreed to it in March 2025 in exchange for keeping the 7% cap.
                <Ref n={4} />
              </p>
            </Answer>
          </div>
        </div>

        {/* composer */}
        <div className="flex justify-center border-t border-line bg-paper px-6 pt-3 pb-4">
          <div className="w-full max-w-[740px]">
            <div className="rounded-[12px] border border-line-2 bg-white px-3.5 pt-3 pb-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
              <p className="text-[14px] text-stone">Ask a follow-up about Globex&hellip;</p>
              <div className="mt-2.5 flex items-center gap-2 text-[12px] text-stone">
                <Paperclip className="size-3.5" />
                <span className="flex items-center gap-1 rounded-md border border-line px-2 py-0.5">
                  <Sparkles className="size-3" /> All sources <ChevronDown className="size-3" />
                </span>
                <span className="ml-auto grid size-7 place-items-center rounded-full bg-ink text-white">
                  <ArrowUp className="size-3.5" strokeWidth={2} />
                </span>
              </div>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-stone">
              <Lock className="size-3" /> Permission-aware: answers only use sources you can access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
