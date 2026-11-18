"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { integrations, type IntegrationId, type ToolId } from "@/lib/site";
import { DocumentsMockup } from "./mockups/documents";
import { MeetingsMockup } from "./mockups/meetings";
import { MessagesMockup } from "./mockups/messages";
import { SupportMockup } from "./mockups/support";

const MOCKUPS: Record<IntegrationId, ComponentType<{ tool: ToolId }>> = {
  messages: MessagesMockup,
  documents: DocumentsMockup,
  meetings: MeetingsMockup,
  support: SupportMockup,
};

/** Starts the mock-up reveal the first time the block scrolls into view. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/**
 * Two-way switch between the apps a tab works in (Slack | Teams, …). The mock-up redraws in the
 * chosen app around the same Tesseract answer, to show it works wherever people already are.
 */
function ToolSwitch({
  tools,
  value,
  onChange,
}: {
  tools: readonly { id: ToolId; name: string }[];
  value: ToolId;
  onChange: (id: ToolId) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-[0.6875rem] leading-none font-medium tracking-[0.14em] text-stone-dark uppercase">Works in</span>
      <div role="group" aria-label="Show it in" className="inline-flex rounded-btn border border-line-dark p-[3px]">
        {tools.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={value === t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "cursor-pointer rounded-[3px] px-3 py-1.5 text-[0.8125rem] font-medium transition-colors focus-visible:outline-on-dark",
              value === t.id ? "bg-on-dark text-ink" : "text-stone-dark hover:text-on-dark",
            )}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A black block with tabs over app-styled mock-ups of each integration. */
export function Integrations({ switchable = true, aboveBlock }: { switchable?: boolean; aboveBlock?: ReactNode }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [keyboard, setKeyboard] = useState(false);
  // the app shown in each tab; starts on the first of each pair
  const [tools, setTools] = useState(
    () => Object.fromEntries(integrations.tabs.map((t) => [t.id, t.tools[0].id])) as Record<IntegrationId, ToolId>,
  );

  return (
    <div className="mx-auto max-w-[1336px] px-5">
      <div className="mb-[clamp(36px,5vw,56px)] grid max-w-[860px] gap-[18px]">
        <h2 className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{integrations.title}</h2>
        <p className="max-w-[58ch] text-[1.1875rem] leading-[1.55] text-stone">{integrations.lede}</p>
      </div>

      {aboveBlock}
      <div ref={ref} data-play={seen ? "" : undefined} className="rounded-box bg-ink p-[clamp(20px,4vw,56px)] text-on-dark">
        <Tabs defaultValue={integrations.tabs[0].id} className="gap-0">
          {/*
            Radix focuses a tab when it's clicked, and Chrome treats that as keyboard focus, so a
            focus ring would flash on every click. `keyboard` tracks how the tabs were last used and the
            ring only shows for keyboard users: a crisp light outline that reads on the black block.
          */}
          <TabsList
            aria-label="Integrations"
            data-keyboard={keyboard || undefined}
            onPointerDown={() => setKeyboard(false)}
            onKeyDown={() => setKeyboard(true)}
            className="mb-[clamp(28px,4vw,48px)] h-auto flex-wrap justify-start gap-2 bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto"
          >
            {integrations.tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "h-auto flex-none rounded-btn border-line-dark px-4 py-[11px] text-sm text-stone-dark transition-colors",
                  "data-[state=inactive]:hover:border-stone-dark data-[state=inactive]:hover:text-on-dark",
                  "data-[state=active]:border-on-dark data-[state=active]:bg-on-dark data-[state=active]:text-ink data-[state=active]:shadow-none",
                  // no ring, border change or outline on click…
                  "focus-visible:border-line-dark focus-visible:ring-0 focus-visible:outline-none data-[state=active]:focus-visible:border-on-dark",
                  // …and a clear one for keyboard users
                  "group-data-[keyboard]/tabs-list:focus-visible:outline-2 group-data-[keyboard]/tabs-list:focus-visible:outline-offset-2 group-data-[keyboard]/tabs-list:focus-visible:outline-solid group-data-[keyboard]/tabs-list:focus-visible:outline-on-dark",
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {integrations.tabs.map((tab) => {
            const Mockup = MOCKUPS[tab.id];
            return (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="grid items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]"
              >
                <div className="grid content-start gap-4">
                  {switchable ? (
                    <ToolSwitch tools={tab.tools} value={tools[tab.id]} onChange={(id) => setTools((cur) => ({ ...cur, [tab.id]: id }))} />
                  ) : (
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] leading-none font-medium tracking-[0.14em] text-stone-dark uppercase">
                      {tab.tools.map((t) => (
                        <span key={t.id} className="inline-flex items-center gap-2 before:size-[5px] before:bg-forest-light">
                          {t.name}
                        </span>
                      ))}
                    </p>
                  )}
                  <h3 className="text-[clamp(1.6rem,1.1rem+1.4vw,2.3rem)]">{tab.title}</h3>
                  <p className="leading-[1.6] text-stone-dark">{tab.text}</p>
                </div>
                {/* keyed by app, so switching replays the reveal */}
                <Mockup key={tools[tab.id]} tool={tools[tab.id]} />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
