import {
  Bell,
  CheckSquare,
  Hammer,
  MessageSquare,
  Network,
  Plug,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "../logo";

/*
  A mock-up of the Tesseract workspace for a sample company ("Northwind"). It's a picture of the
  product, laid out at a fixed 1120px width and scaled to fit by <ScaleToFit>. The charts are single
  series in ink on paper: no legends, faint axes, text in text colours.
*/

// Entities in the graph, weekly over six months: the graph fills in as more sources connect.
const WEEKS = Array.from({ length: 26 }, (_, i) => {
  const t = i / 25;
  const wiggle = Math.sin(i * 1.7) * 380;
  return Math.round(18400 + (48210 - 18400) * Math.pow(t, 1.55) + (i === 25 ? 0 : wiggle));
});
const MONTHS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

const COVERAGE = [
  { source: "GitHub", pct: 96 },
  { source: "Jira", pct: 92 },
  { source: "Slack", pct: 88 },
  { source: "ServiceNow", pct: 81 },
  { source: "SharePoint", pct: 74 },
  { source: "Outlook", pct: 69 },
];

const ASKED = [
  { q: "Who owns billing-service?", a: "Platform team. Ishan Sinha is the on-call owner.", cite: "CODEOWNERS · PagerDuty" },
  { q: "What happened last time we raised export limits?", a: "Rolled back in two days: legacy-exporter ran out of memory.", cite: "INC-12 · postmortem" },
  { q: "Can we delete the auth shim yet?", a: "Not yet. The exports webhook still reads the old claim.", cite: "SBX-14 · Jira" },
];

const APPROVALS = [
  { what: "Reply to Lena Park on IT-2291", detail: "VPN fix from IT-1876", where: "Jira Service Management" },
  { what: "Comment on the OIDC design doc", detail: "Flags the conflict with SBX-14", where: "Google Docs" },
  { what: "Link INC-12 to PLAT-218", detail: "Same root cause", where: "Jira" },
];

function NavItem({ icon: Icon, label, active, count }: { icon: LucideIcon; label: string; active?: boolean; count?: number }) {
  return (
    <li
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] text-stone-dark",
        active && "bg-white/[0.07] text-on-dark",
      )}
    >
      <Icon className="size-[15px]" strokeWidth={1.6} />
      {label}
      {count ? <span className="ml-auto rounded-[3px] bg-forest px-1.5 py-px font-mono text-[10px] text-on-dark">{count}</span> : null}
    </li>
  );
}

function Card({ title, sub, action, children, className }: { title: string; sub?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col rounded-[10px] border border-line bg-white p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[14px] font-semibold">{title}</p>
          {sub && <p className="mt-0.5 text-[12px] text-stone">{sub}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-[5px] border border-line-2 px-2 py-1 text-[11px] leading-none text-stone">{children}</span>;
}

/** Weekly column chart: thin ink columns, 2px gaps, rounded tops on a faint baseline. The latest week is labelled. */
function EntitiesChart() {
  const W = 470, H = 150, gap = 4;
  const max = 52000;
  const bw = (W - gap * (WEEKS.length - 1)) / WEEKS.length;
  return (
    <svg viewBox={`0 0 ${W} ${H + 22}`} className="mt-auto w-full" aria-hidden>
      {[0.5, 1].map((f) => (
        <line key={f} x1={0} x2={W} y1={H - H * f * (50000 / max)} y2={H - H * f * (50000 / max)} stroke="var(--color-line)" strokeDasharray="2 4" />
      ))}
      {WEEKS.map((v, i) => {
        const h = (v / max) * H;
        const x = i * (bw + gap);
        const last = i === WEEKS.length - 1;
        return <rect key={i} x={x} y={H - h} width={bw} height={h} rx={2} fill={last ? "var(--color-forest)" : "var(--color-ink)"} fillOpacity={last ? 1 : 0.82} />;
      })}
      <line x1={0} x2={W} y1={H + 0.5} y2={H + 0.5} stroke="var(--color-line-2)" />
      {MONTHS.map((m, i) => (
        <text key={m} x={(i / MONTHS.length) * W + 2} y={H + 16} fontSize={10} fill="var(--color-stone)" fontFamily="var(--font-mono)">
          {m}
        </text>
      ))}
    </svg>
  );
}

export function DashboardMockup() {
  return (
    <div
      role="img"
      aria-label="Mock-up of the Tesseract workspace for a sample company: 48,210 entities mapped across GitHub, Jira, Slack, ServiceNow, SharePoint and Outlook; questions answered this week with citations; and three actions waiting for approval."
      className="flex h-[640px] overflow-hidden rounded-[12px] bg-paper text-left text-ink shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10"
    >
      {/* sidebar */}
      <aside className="flex w-[216px] flex-none flex-col bg-[#161513] px-3 py-4 text-on-dark">
        <div className="mb-5 flex items-center justify-between px-2">
          <span className="flex items-center gap-2 font-display text-[19px] tracking-[-0.02em]">
            <Logo className="size-4" />
            Tesseract
          </span>
          <span className="flex gap-2 text-stone-dark">
            <Bell className="size-3.5" strokeWidth={1.6} />
            <Search className="size-3.5" strokeWidth={1.6} />
          </span>
        </div>
        <ul className="grid gap-0.5">
          <NavItem icon={MessageSquare} label="Ask" />
          <NavItem icon={Network} label="Knowledge graph" active />
          <NavItem icon={Plug} label="Sources" />
          <NavItem icon={CheckSquare} label="Approvals" count={3} />
          <NavItem icon={Hammer} label="Forge" />
        </ul>
        <p className="mt-6 mb-1.5 px-2.5 text-[11px] text-stone-dark">Spaces</p>
        <ul className="grid gap-0.5 text-[13px] text-stone-dark">
          {["Platform", "Payments", "Legal", "Support"].map((s) => (
            <li key={s} className="flex items-center gap-2.5 px-2.5 py-[6px]">
              <span className="grid size-4 place-items-center rounded-[3px] bg-white/10 font-mono text-[9px] text-on-dark">{s[0]}</span>
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-6 mb-1.5 px-2.5 text-[11px] text-stone-dark">Recent</p>
        <ul className="grid gap-0.5 text-[12.5px] text-stone-dark">
          {["Why does billing use the auth shim?", "Who owns legacy-exporter?", "Export limit history"].map((r) => (
            <li key={r} className="truncate px-2.5 py-[6px]">
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-2.5 px-2 text-[13px]">
          <span className="grid size-6 place-items-center rounded-full bg-white/10 text-[10px] font-semibold">KV</span>
          Karthik Valluri
        </div>
      </aside>

      {/* main */}
      <div className="min-w-0 flex-1 px-7 pt-14 pb-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-[26px] leading-none">Northwind&rsquo;s knowledge graph</p>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-stone">
              <i className="size-1.5 rounded-full bg-forest" />
              Synced 2 min ago
            </span>
            <span className="flex items-center gap-1.5 rounded-[5px] bg-ink px-3 py-1.5 text-[12px] font-medium text-on-dark">
              <Sparkles className="size-3" strokeWidth={1.8} />
              Ask Tesseract
            </span>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2.5 rounded-[8px] border border-line bg-white px-3.5 py-2.5 text-[12.5px]">
          <span className="grid size-5 place-items-center rounded-[4px] bg-ink text-on-dark">
            <CheckSquare className="size-3" strokeWidth={1.8} />
          </span>
          3 actions drafted by Tesseract are waiting for your approval.
          <span className="ml-auto text-stone">Review</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card title="Entities mapped" sub="People, services, tickets, docs and customers" action={<Chip>6 months</Chip>}>
            <p className="mb-3 flex items-baseline gap-2">
              <span className="font-display text-[40px] leading-none tracking-[-0.02em]">48,210</span>
              <span className="text-[12px] font-medium text-forest">&uarr; 12% this month</span>
            </p>
            <EntitiesChart />
          </Card>

          <Card title="Coverage by source" sub="Share of each source linked into the graph" action={<Chip>All spaces</Chip>}>
            <ul className="grid gap-3.5">
              {COVERAGE.map((c) => (
                <li key={c.source} className="grid grid-cols-[80px_minmax(0,1fr)_34px] items-center gap-3 text-[12.5px]">
                  <span className="text-stone">{c.source}</span>
                  <span className="h-2.5 rounded-full bg-paper-2">
                    <span className="block h-full rounded-full bg-ink/85" style={{ width: `${c.pct}%` }} />
                  </span>
                  <span className="text-right font-mono text-[11.5px]">{c.pct}%</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Asked this week" sub="1,284 questions · every answer cited" action={<Chip>This week</Chip>}>
            <ul className="grid">
              {ASKED.map((x) => (
                <li key={x.q} className="grid gap-1 border-t border-line py-3 first:border-t-0 first:pt-0">
                  <p className="text-[13px] font-semibold">{x.q}</p>
                  <p className="text-[12.5px] text-stone">{x.a}</p>
                  <p className="font-mono text-[10.5px] text-forest">{x.cite}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Waiting for approval" sub="Nothing is sent until someone approves it" action={<Chip>3 open</Chip>}>
            <ul className="grid">
              {APPROVALS.map((x) => (
                <li key={x.what} className="flex items-center gap-3 border-t border-line py-3 first:border-t-0 first:pt-0">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold">{x.what}</p>
                    <p className="text-[12px] text-stone">
                      {x.detail} · {x.where}
                    </p>
                  </div>
                  <span className="ml-auto flex-none rounded-[5px] bg-ink px-2.5 py-1.5 text-[11.5px] font-medium text-on-dark">Approve</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
