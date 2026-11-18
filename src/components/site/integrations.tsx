"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { integrations, type IntegrationId } from "@/lib/site";
import { Hub } from "./hub";
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

const IDS = integrations.tabs.map((t) => t.id);

/** Tracks whether the element is on screen now (`inView`) and whether it ever has been (`seen`). */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView, seen] as const;
}

/**
 * The hub of apps, then a black block with tabs over app mock-ups (Slack, Word, Zoom, Jira).
 * The tabs advance on their own every few seconds: a thin line in the selected tab shows the time
 * left, and when its animation ends the next tab opens. Clicking a tab jumps there and the rotation
 * carries on from it; it only waits while the block is off screen. Reduced motion turns animations
 * off, so the tabs then stay put.
 */
export function Integrations() {
  const [ref, inView, seen] = useInView<HTMLDivElement>();
  const [active, setActive] = useState<IntegrationId>(IDS[0]);
  const [keyboard, setKeyboard] = useState(false);
  // keeps going after a click; it only waits while the block is off screen
  const running = inView;

  const next = () => setActive((cur) => IDS[(IDS.indexOf(cur) + 1) % IDS.length]);

  return (
    <div className="mx-auto max-w-[1336px] px-5">
      <div className="mb-[clamp(36px,5vw,56px)] grid max-w-[860px] gap-[18px]">
        <h2 className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{integrations.title}</h2>
        <p className="max-w-[58ch] text-[1.1875rem] leading-[1.55] text-stone">{integrations.lede}</p>
      </div>

      <Hub />

      <div
        ref={ref}
        data-play={seen ? "" : undefined}
        className="relative isolate overflow-hidden rounded-box bg-ink p-[clamp(20px,4vw,56px)] text-on-dark"
      >
        {/* the same marbled forest backdrop as the product stage, mirrored so the two don't repeat */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 -scale-x-100 bg-cover bg-center"
          style={{ backgroundImage: "url(/backdrops/marble-forest.webp)" }}
        />
        {/* darkened a quarter, so text stays readable over the brightest green (4.5:1 or better) */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/25" />
        <Tabs value={active} onValueChange={(v) => setActive(v as IntegrationId)} className="gap-0">
          {/*
            Radix focuses a tab when it's clicked, and Chrome treats that as keyboard focus, so a
            focus ring would flash on every click. `keyboard` tracks how the tabs were last used and the
            ring only shows for keyboard users.
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
                  "relative h-auto flex-none cursor-pointer overflow-hidden rounded-btn border-line-dark bg-transparent px-4 py-[11px] text-sm text-on-dark/75 transition-colors",
                  "data-[state=inactive]:hover:border-stone-dark data-[state=inactive]:hover:text-on-dark",
                  // selected: brighter, never darker. No fill, just white text and a white border
                  "data-[state=active]:border-on-dark data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-on-dark data-[state=active]:shadow-none",
                  // clicking focuses the tab: no ring, border change or fill from that
                  "focus-visible:ring-0 focus-visible:outline-none data-[state=inactive]:focus-visible:border-line-dark data-[state=active]:focus-visible:border-on-dark",
                  "group-data-[keyboard]/tabs-list:focus-visible:outline-2 group-data-[keyboard]/tabs-list:focus-visible:outline-offset-2 group-data-[keyboard]/tabs-list:focus-visible:outline-solid group-data-[keyboard]/tabs-list:focus-visible:outline-on-dark",
                )}
              >
                {tab.label}
                {tab.id === active && (
                  // time left before the next tab; keyed so it restarts on every change
                  <span
                    key={active}
                    aria-hidden
                    onAnimationEnd={next}
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left animate-tab-progress bg-forest-light"
                    style={{ animationPlayState: running ? "running" : "paused" }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/*
            All four panels stay mounted, stacked in one grid cell, so the block is always as tall as
            the tallest one: switching tabs never changes its height, moves the backdrop or shifts the
            page. Hidden panels are invisible (and so out of reach of screen readers and the keyboard).
            The active panel's content is keyed so its reveal animation replays on every switch.
          */}
          <div className="grid">
            {integrations.tabs.map((tab) => {
              const Mockup = MOCKUPS[tab.id];
              const on = tab.id === active;
              return (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  forceMount
                  className="col-start-1 row-start-1 data-[state=inactive]:invisible"
                >
                  <div
                    key={on ? "on" : "off"}
                    className="grid h-full grid-rows-[1fr_auto] items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:grid-rows-none lg:items-center"
                  >
                    <div className="grid content-start gap-4">
                      <h3 className="text-[clamp(1.6rem,1.1rem+1.4vw,2.3rem)]">{tab.title}</h3>
                      <p className="leading-[1.6] text-on-dark/80">{tab.text}</p>
                    </div>
                    <Mockup />
                  </div>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
