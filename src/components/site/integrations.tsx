"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { integrations, type IntegrationId } from "@/lib/site";
import { AppBadge } from "./app-badge";
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
 * left, and when its animation ends the next tab opens. It pauses while the block is hovered,
 * focused or off screen; clicking a tab jumps there and the rotation carries on from it. Reduced
 * motion turns animations off, so the tabs then stay put.
 */
export function Integrations() {
  const [ref, inView, seen] = useInView<HTMLDivElement>();
  const [active, setActive] = useState<IntegrationId>(IDS[0]);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const running = inView && !hovered && !focused;

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
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        }}
        className="rounded-box bg-ink p-[clamp(20px,4vw,56px)] text-on-dark"
      >
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
                  "relative h-auto flex-none overflow-hidden rounded-btn border-line-dark px-4 py-[11px] text-sm text-stone-dark transition-colors",
                  "data-[state=inactive]:hover:border-stone-dark data-[state=inactive]:hover:text-on-dark",
                  // selected: a soft highlight, still clearly a button
                  "data-[state=active]:border-on-dark/55 data-[state=active]:bg-white/12 data-[state=active]:text-on-dark data-[state=active]:shadow-none",
                  // no ring on click; a clear outline for keyboard users
                  "focus-visible:ring-0 focus-visible:outline-none",
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

          {integrations.tabs.map((tab) => {
            const Mockup = MOCKUPS[tab.id];
            return (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="grid items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
              >
                <div className="grid content-start justify-items-start gap-4">
                  <AppBadge app={tab.app} />
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
