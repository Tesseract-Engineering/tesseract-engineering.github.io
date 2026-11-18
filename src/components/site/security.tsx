/* eslint-disable @next/next/no-img-element -- small static SVG logos */
import { ArrowRight, Check, Cloud, Cpu, Lock, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { security } from "@/lib/site";

const USED = [
  { title: "Export service design v3", logo: "/logos/apps/confluence.svg" },
  { title: "payments/export-service", logo: "/logos/apps/github.svg" },
  { title: "#security-review", logo: "/logos/apps/slack.svg" },
  { title: "PAY-212", logo: "/logos/apps/jira-icon.svg" },
];

function Step({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children?: ReactNode }) {
  return (
    <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-t border-line-dark py-3.5">
      <span className="grid size-7 place-items-center rounded-lg bg-white/[0.08] text-forest-light">
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold">{title}</p>
        {children}
      </div>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-0.5 text-[13px] text-stone-dark">{children}</p>;
}

/**
 * Secure by design: the four principles as a ruled list, beside the audit trail of the
 * export-service answer from the hero, which shows each principle at work.
 */
export function Security() {
  return (
    <div className="mx-auto grid max-w-[1336px] items-start gap-[clamp(36px,5vw,64px)] px-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div>
        <h2 className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{security.title}</h2>
        <ul className="mt-[clamp(24px,3vw,36px)]">
          {security.items.map((item) => (
            <li key={item.title} className="border-t-2 border-ink pt-4 pb-5">
              <h3 className="text-[1.375rem]">{item.title}</h3>
              <p className="mt-1 text-stone">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* the trail behind one answer */}
      <div
        role="img"
        aria-label="The audit trail behind an answer: Karthik Valluri asked whether anyone had built a customer data export. It ran in Northwind's cloud across 12 connected sources; used 4 sources Karthik can open; withheld 2 documents restricted to Security; used Anthropic, the model Northwind's admins chose; and left 3 drafted actions waiting for approval."
        className="rounded-box bg-ink p-[clamp(20px,2.5vw,28px)] text-on-dark select-none [&_img]:pointer-events-none"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="label-mono text-stone-dark">Behind this answer</span>
          <span className="label-mono inline-flex items-center gap-1.5 text-forest-light">
            <i className="size-1.5 rounded-full bg-current" /> Audit log
          </span>
        </div>
        <div className="mb-4 rounded-[10px] bg-white/[0.07] px-3.5 py-3 text-[14px]">
          <p className="mb-1 text-[12px] text-stone-dark">Karthik Valluri &middot; Engineering Manager &middot; 2:14 PM</p>
          Has anyone here already built a customer data export?
        </div>

        <Step icon={Cloud} title="Ran in Northwind’s cloud">
          <Note>Searched 12 connected sources. No data left the environment.</Note>
        </Step>
        <Step icon={Check} title="Used 4 sources Karthik can open">
          <div className="mt-2 flex flex-wrap gap-1.5">
            {USED.map((u) => (
              <span key={u.title} className="flex items-center gap-1.5 rounded-md border border-line-dark bg-white/[0.06] px-2 py-1 text-[12px]">
                <img src={u.logo} alt="" draggable={false} className="size-3.5" />
                {u.title}
              </span>
            ))}
          </div>
        </Step>
        <Step icon={Lock} title="Withheld 2 documents">
          <Note>Restricted to Security. Counted, never shown.</Note>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[1, 2].map((n) => (
              <span key={n} className="flex items-center gap-1.5 rounded-md border border-dashed border-line-dark px-2 py-1 text-[12px] text-stone-dark">
                <Lock className="size-3" /> Restricted document
              </span>
            ))}
          </div>
        </Step>
        <Step icon={Cpu} title="Model: Anthropic">
          <Note>Chosen by Northwind&rsquo;s admins. Swappable for OpenAI or OpenRouter.</Note>
        </Step>
        <Step icon={ArrowRight} title="3 actions waiting for approval">
          <Note>Slack message, access request, coding-agent brief. Nothing sent yet.</Note>
          <span className="mt-2.5 inline-flex rounded-btn bg-on-dark px-3 py-1.5 text-[12px] font-semibold text-ink">Review and approve</span>
        </Step>
      </div>
    </div>
  );
}
