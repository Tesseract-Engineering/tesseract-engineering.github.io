/* eslint-disable @next/next/no-img-element -- small static SVG logos */
import {
  ArrowUp,
  ChevronDown,
  Code2,
  Hammer,
  History,
  Layers,
  Lock,
  MessageSquare,
  MoreHorizontal,
  Network,
  Paperclip,
  Plug,
  Plus,
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
  The Tesseract workspace, open on Ask: an engineer planning a customer data export asks whether
  anyone has built one. Tesseract finds the existing service, the security decision behind it and
  the known gap, cites each source, hides what the asker can't see, and drafts the next steps for
  approval. Laid out at 1120px and scaled to fit by <ScaleToFit>.
*/

type Source = { n: number; title: string; where: string; logo: string };

const SOURCES: Record<number, Source> = {
  1: { n: 1, title: "Customer export service design v3", where: "Confluence", logo: "/logos/apps/confluence.svg" },
  2: { n: 2, title: "payments/export-service", where: "GitHub", logo: "/logos/apps/github.svg" },
  3: { n: 3, title: "#security-review, April 9", where: "Slack", logo: "/logos/apps/slack.svg" },
  4: { n: 4, title: "PAY-212: Per-tenant encryption keys", where: "Jira", logo: "/logos/apps/jira-icon.svg" },
};

const RECENT = [
  "Has anyone already built a customer data export?",
  "Who owns the billing service?",
  "Why did we change the refund policy in June?",
];

/** Sub-organisations: each team's own space, with its own sources and permissions. */
const SPACES = [
  { name: "Payments", tone: "bg-[#2E5E4A]" },
  { name: "Platform", tone: "bg-[#3B4A6B]" },
  { name: "Security", tone: "bg-[#6B3B3B]" },
  { name: "Legal", tone: "bg-[#5A4A2E]" },
  { name: "Finance", tone: "bg-[#4A3B6B]" },
];

const SYNCED = ["slack", "github", "confluence", "jira-icon", "microsoft-365"];

function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <li className={cn("flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] text-stone-dark", active && "bg-white/[0.08] font-medium text-on-dark")}>
      <Icon className="size-[15px]" strokeWidth={1.7} />
      {label}
    </li>
  );
}

/** An inline citation, linked to a numbered source below the answer. */
function Ref({ n }: { n: number }) {
  return (
    <span className="mx-0.5 inline-grid size-[16px] place-items-center rounded-[4px] bg-forest-soft align-[1px] text-[9.5px] font-semibold text-forest">
      {n}
    </span>
  );
}

function SourceChip({ s }: { s: Source }) {
  return (
    <span className="flex items-center gap-2 rounded-md border border-line bg-white py-1 pr-2.5 pl-1 text-[11.5px]">
      <span className="grid size-[16px] place-items-center rounded-[4px] bg-forest-soft text-[9.5px] font-semibold text-forest">{s.n}</span>
      <img src={s.logo} alt="" className="size-3.5" />
      <span className="font-medium">{s.title}</span>
      <span className="text-stone">{s.where}</span>
    </span>
  );
}

function Question({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[80%] rounded-[14px_14px_4px_14px] bg-paper-2 px-4 py-2.5">{children}</p>
    </div>
  );
}

function Answer({ children, sources }: { children: ReactNode; sources: number[] }) {
  return (
    <div className="flex gap-3">
      <TesseractMark size={26} className="rounded-md" />
      <div className="grid min-w-0 flex-1 gap-2.5">
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

function Draft({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 border-t border-line py-2 first:border-t-0 first:pt-0">
      <span className="grid size-6 flex-none place-items-center rounded-md border border-line bg-white">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

export function WorkspaceMockup() {
  return (
    <div
      role="img"
      aria-label="Mock-up of the Tesseract workspace, open on Ask. An engineer planning a customer data export for enterprise accounts asks whether anyone has built one. Tesseract answers that Payments shipped an export service in March, owned by Priya Nair; that Security rejected direct database access in April; and that per-tenant encryption keys are a known gap. It cites Confluence, GitHub, Slack and Jira, notes two restricted Security documents, and drafts a Slack message, an access request and a coding-agent brief for approval."
      className="flex h-[820px] overflow-hidden rounded-[12px] bg-paper text-left text-[13.5px] leading-[1.6] text-ink shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10"
    >
      {/* sidebar */}
      <aside className="flex w-[236px] flex-none flex-col bg-[#161513] px-3 py-4 leading-normal text-on-dark">
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
        <p className="mt-5 mb-1.5 flex items-center justify-between px-2.5 text-[11px] text-stone-dark">
          <span className="flex items-center gap-1.5">
            <Layers className="size-3" /> Spaces
          </span>
          <Plus className="size-3" />
        </p>
        <ul className="grid gap-0.5 text-[12.5px] text-stone-dark">
          {SPACES.map((sp) => (
            <li key={sp.name} className="flex items-center gap-2.5 rounded-md px-2.5 py-[5px]">
              <span className={cn("grid size-4 place-items-center rounded-[4px] text-[9px] font-bold text-white", sp.tone)}>{sp.name[0]}</span>
              {sp.name}
            </li>
          ))}
        </ul>
        <p className="mt-5 mb-1.5 flex items-center gap-1.5 px-2.5 text-[11px] text-stone-dark">
          <History className="size-3" /> Recent
        </p>
        <ul className="grid gap-0.5 text-[12.5px] text-stone-dark">
          {RECENT.map((r, i) => (
            <li key={r} className={cn("line-clamp-2 rounded-md px-2.5 py-[6px] leading-snug", i === 0 && "bg-white/[0.06] text-on-dark")}>
              {r}
            </li>
          ))}
        </ul>
        {/* the knowledge graph, live */}
        <div className="mt-auto mb-3 grid gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-[11.5px]">
          <p className="flex items-center justify-between">
            <span className="font-medium text-on-dark">Knowledge graph</span>
            <span className="flex items-center gap-1.5 text-[10.5px] text-forest-light">
              <i className="size-1.5 animate-pulse rounded-full bg-forest-light" /> Live
            </span>
          </p>
          <p className="text-stone-dark">48,210 entities &middot; 12 sources</p>
          <p className="flex items-center gap-1.5">
            {SYNCED.map((a) => (
              <span key={a} className="grid size-5 place-items-center rounded-[4px] bg-white">
                <img src={`/logos/apps/${a}.svg`} alt="" className="size-3" />
              </span>
            ))}
            <span className="text-[10.5px] text-stone-dark">+7</span>
          </p>
          <p className="text-[10.5px] text-stone-dark">Synced 2 min ago</p>
        </div>
        <div className="flex items-center gap-2.5 border-t border-white/10 px-2 pt-3 text-[12.5px]">
          <span className="grid size-7 place-items-center rounded-full bg-[#E8D9C9] text-[10px] font-semibold text-ink">KV</span>
          <span className="leading-tight">
            Karthik Valluri
            <span className="block text-[11px] text-stone-dark">Engineering Manager</span>
          </span>
        </div>
      </aside>

      {/* Ask */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-line bg-white px-6 py-3 leading-normal">
          <MessageSquare className="size-4 text-stone" strokeWidth={1.7} />
          <p className="text-[14px] font-semibold">Export service: does it exist?</p>
          <span className="rounded-[4px] bg-paper-2 px-1.5 py-0.5 text-[11px] text-stone">Ask</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-md border border-line-2 px-2.5 py-1 text-[12px]">
            <Share2 className="size-3" /> Share
          </span>
          <MoreHorizontal className="size-4 text-stone" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center overflow-hidden px-6 pt-5">
          <div className="grid w-full max-w-[740px] gap-[18px]">
            <Question>We&rsquo;re planning a customer data export for enterprise accounts. Has anyone here already built something like this?</Question>
            <Answer sources={[1, 2, 3, 4]}>
              <p>
                <b>Yes. Payments shipped one in March, and it&rsquo;s running in production.</b> Three things to know before you start:
              </p>
              <ol className="grid list-decimal gap-2 pl-5">
                <li>
                  <b>Most of what you need exists.</b> It runs scheduled CSV and Parquet exports to a customer&rsquo;s own S3 bucket, and about 40
                  enterprise accounts use it today. Priya Nair on Payments owns it.
                  <Ref n={1} />
                  <Ref n={2} />
                </li>
                <li>
                  <b>Don&rsquo;t repeat the direct-database approach.</b> Security rejected it in April, and the team moved to a service that reads
                  from a replica with enforced row-level filters.
                  <Ref n={3} />
                </li>
                <li>
                  <b>There&rsquo;s a known gap you&rsquo;ll likely hit.</b> It doesn&rsquo;t support per-tenant encryption keys. The ticket has been
                  open since August, and it&rsquo;s the first thing enterprise customers ask for.
                  <Ref n={4} />
                </li>
              </ol>
              <p className="flex items-center gap-1.5 text-[12px] text-stone">
                <Lock className="size-3" /> 2 more matching documents are restricted to Security and aren&rsquo;t shown.
              </p>
            </Answer>

            {/* drafts for approval */}
            <div className="ml-[38px] rounded-[10px] border border-line-2 bg-white p-3.5">
              <p className="mb-2 text-[12.5px] font-semibold">
                Drafts ready for your approval <span className="font-normal text-stone">&middot; nothing is sent until you approve</span>
              </p>
              <ul className="text-[12.5px]">
                <Draft icon={<img src="/logos/apps/slack.svg" alt="" className="size-3.5" />}>
                  Slack message to <b>Priya Nair</b>: a request for a 30-minute walkthrough
                </Draft>
                <Draft icon={<Lock className="size-3.5 text-stone" />}>
                  Access request to <b>Marcus Webb</b> for the 2 restricted Security documents
                </Draft>
                <Draft icon={<Code2 className="size-3.5 text-stone" />}>
                  A brief for your coding agent to build on <span className="font-mono text-[11.5px]">payments/export-service</span>
                </Draft>
              </ul>
              <span className="mt-2.5 inline-flex rounded-md bg-ink px-3 py-1.5 text-[12px] font-semibold text-white">Review and approve</span>
            </div>

          </div>
        </div>

        {/* composer */}
        <div className="flex justify-center border-t border-line bg-paper px-6 pt-3 pb-4 leading-normal">
          <div className="w-full max-w-[740px]">
            <div className="rounded-[12px] border border-line-2 bg-white px-3.5 pt-3 pb-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
              <p className="text-[14px] text-stone">Ask a follow-up&hellip;</p>
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
