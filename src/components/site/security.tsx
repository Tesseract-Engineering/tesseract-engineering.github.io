import { Cloud, Cpu, FileText, Lock, type LucideIcon } from "lucide-react";

import { security } from "@/lib/site";

const ICONS: Record<(typeof security.items)[number]["icon"], LucideIcon> = {
  cloud: Cloud,
  cpu: Cpu,
  lock: Lock,
  file: FileText,
};

/** Four flat grey boxes: icon at the top, title and line at the bottom. */
export function Security() {
  return (
    <div className="mx-auto max-w-[1240px] px-5">
      <h2 className="mb-[clamp(36px,5vw,56px)] text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{security.title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {security.items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <article key={item.title} className="flex min-w-0 flex-col gap-2.5 rounded-box bg-paper-2 p-[22px] sm:min-h-[260px] sm:p-7">
              <Icon aria-hidden strokeWidth={1.6} className="mb-4.5 size-7 text-forest sm:mb-auto" />
              <h3 className="text-[1.625rem] leading-[1.1]">{item.title}</h3>
              <p className="min-h-[3em] text-[0.9688rem] leading-normal text-stone">{item.text}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
