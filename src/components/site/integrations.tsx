"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { integrations, type IntegrationId } from "@/lib/site";
import { DocumentsMockup } from "./mockups/documents";
import { MeetingsMockup } from "./mockups/meetings";
import { MessagesMockup } from "./mockups/messages";
import { SupportMockup } from "./mockups/support";

const MOCKUPS: Record<IntegrationId, ComponentType> = {
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

/** A black block with tabs over white mock-ups of each integration. */
export function Integrations() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [keyboard, setKeyboard] = useState(false);

  return (
    <div className="mx-auto max-w-[1336px] px-5">
      <div className="mb-[clamp(36px,5vw,56px)] grid max-w-[860px] gap-[18px]">
        <h2 className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{integrations.title}</h2>
        <p className="max-w-[58ch] text-[1.1875rem] leading-[1.55] text-stone">{integrations.lede}</p>
      </div>

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
                  <h3 className="text-[clamp(1.6rem,1.1rem+1.4vw,2.3rem)]">{tab.title}</h3>
                  <p className="leading-[1.6] text-stone-dark">{tab.text}</p>
                </div>
                <Mockup />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
