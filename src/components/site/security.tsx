import { CheckCircle2, Cloud, Cpu, Lock, type LucideIcon } from "lucide-react";

import { security } from "@/lib/site";

const ICONS: Record<(typeof security.questions)[number]["icon"], LucideIcon> = {
  cloud: Cloud,
  lock: Lock,
  cpu: Cpu,
  check: CheckCircle2,
};

/**
 * Security as the questions a buyer's security reviewer asks, in the original flat grey boxes:
 * icon, then the question and its one-line answer, top-aligned so the questions line up.
 */
export function Security() {
  return (
    <div className="mx-auto max-w-[1336px] px-5">
      <h2 className="mb-[clamp(28px,4vw,44px)] text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{security.title}</h2>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {security.questions.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div key={item.q} className="flex min-w-0 flex-col gap-2 rounded-box bg-paper-2 p-[22px] sm:min-h-[240px] sm:p-7">
              <Icon aria-hidden strokeWidth={1.6} className="mb-4 size-7 text-forest sm:mb-10" />
              <dt className="text-[1.25rem] leading-snug font-semibold tracking-[-0.01em]">{item.q}</dt>
              <dd className="text-[0.9688rem] leading-normal text-stone">{item.a}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
