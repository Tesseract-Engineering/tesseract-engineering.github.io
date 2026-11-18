"use client";

/* eslint-disable @next/next/no-img-element -- small static SVG logos */
import { ArrowRight, Check, Cloud, Cpu, Lock, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { security } from "@/lib/site";
import { Logo } from "./logo";
import { ScaleToFit } from "./scale-to-fit";

/*
  Secure by design, as one picture: inside a "Your cloud" boundary, sources flow into Tesseract,
  pass a permission check, and become a cited answer; restricted documents stop at the check. The
  flow plays once when the diagram scrolls into view (SVG animateMotion for the dots, paused CSS
  keyframes for the cards; see [data-sec] in globals.css). With reduced motion nothing animates and
  the finished diagram shows. Wide screens get a horizontal layout, smaller ones a vertical one,
  each drawn in its own fixed coordinate space.
*/

const SOURCES = [
  { name: "Slack", logo: "/logos/apps/slack.svg" },
  { name: "Jira", logo: "/logos/apps/jira-icon.svg" },
  { name: "GitHub", logo: "/logos/apps/github.svg" },
  { name: "Google Drive", logo: "/logos/apps/google-g.svg" },
];
const MODELS = ["Anthropic", "OpenAI", "OpenRouter"];

const ALT =
  "Diagram: inside a boundary labelled Your cloud, Slack, Jira, GitHub and Google Drive connect to Tesseract, which uses a model of your choice (Anthropic, OpenAI or OpenRouter). Its output passes a permission check, labelled Only what you can open, and becomes a cited answer with two sources and a Review and approve button. Two restricted documents stop at the permission check and never reach the answer. Below the boundary: Nothing leaves your environment.";

/* ---------- pieces shared by both layouts (HTML, positioned over the SVG) ---------- */

type Box = { left: number; top: number; width: number; height?: number };
const at = ({ left, top, width, height }: Box, extra?: CSSProperties): CSSProperties => ({
  position: "absolute",
  left,
  top,
  width,
  height,
  ...extra,
});

function SourceChip({ name, logo, style }: { name: string; logo: string; style: CSSProperties }) {
  return (
    <span style={style} className="flex items-center gap-2.5 rounded-[10px] border border-line-2 bg-white px-3 text-[14px] font-medium shadow-[0_1px_2px_rgb(0_0_0/0.05)]">
      <img src={logo} alt="" draggable={false} className="size-[18px]" />
      {name}
    </span>
  );
}

function Core({ style }: { style: CSSProperties }) {
  return (
    <div data-sec="core" style={{ ...style, animationDelay: "1.3s" }} className="grid place-items-center content-center gap-2 rounded-[16px] bg-ink text-on-dark">
      <Logo className="size-7" />
      <span className="text-[15px] font-semibold tracking-[-0.01em]">Tesseract</span>
    </div>
  );
}

function ModelChip({ style }: { style: CSSProperties }) {
  return (
    <span style={style} className="flex items-center justify-center gap-2 rounded-full border border-line-2 bg-white px-3 text-[12.5px]">
      <Cpu className="size-3.5 text-stone" strokeWidth={1.8} />
      <span className="text-stone">Model</span>
      <span className="inline-grid font-medium">
        {MODELS.map((m, i) => (
          <span key={m} data-model={i} className="[grid-area:1/1]">
            {m}
          </span>
        ))}
      </span>
    </span>
  );
}

function LockCheck({ style }: { style: CSSProperties }) {
  return (
    <span style={style} className="grid place-items-center rounded-full border-2 border-forest bg-white text-forest shadow-[0_0_0_6px_var(--color-paper)]">
      <Lock className="size-4" strokeWidth={2.2} />
    </span>
  );
}

function Restricted({ style, delay, from }: { style: CSSProperties; delay: string; from: [string, string] }) {
  return (
    <span
      data-sec="restricted"
      style={{ ...style, animationDelay: delay, ["--from-x" as string]: from[0], ["--from-y" as string]: from[1] }}
      className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-stone/60 bg-paper text-[12px] text-stone"
    >
      <Lock className="size-3" strokeWidth={2} /> Restricted
    </span>
  );
}

function AnswerCard({ style }: { style: CSSProperties }) {
  return (
    <div data-sec="answer" style={{ ...style, animationDelay: "3.7s" }} className="grid content-start gap-3 rounded-[12px] border border-line-2 bg-white p-4 shadow-[0_16px_40px_-24px_rgb(0_0_0/0.35)]">
      <p className="text-[11px] font-medium tracking-[0.12em] text-stone uppercase">Answer</p>
      <p className="text-[14px] leading-snug">
        Payments already runs an export service. Hamilton Park owns it.
        <span className="ml-1 inline-grid size-4 place-items-center rounded-[4px] bg-forest-soft align-[1px] text-[9.5px] font-semibold text-forest">1</span>
        <span className="ml-0.5 inline-grid size-4 place-items-center rounded-[4px] bg-forest-soft align-[1px] text-[9.5px] font-semibold text-forest">2</span>
      </p>
      <div className="flex flex-wrap gap-1.5">
        {[
          { t: "Export service design v3", l: "/logos/apps/confluence.svg" },
          { t: "PAY-212", l: "/logos/apps/jira-icon.svg" },
        ].map((c) => (
          <span key={c.t} className="flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-1 text-[11.5px]">
            <img src={c.l} alt="" draggable={false} className="size-3" />
            {c.t}
          </span>
        ))}
      </div>
      <span data-sec="fade" style={{ animationDelay: "4.4s" }} className="w-fit rounded-btn bg-ink px-3 py-1.5 text-[12px] font-semibold text-on-dark">
        Review and approve
      </span>
    </div>
  );
}

function CloudLabel({ style }: { style: CSSProperties }) {
  return (
    <span style={style} className="flex w-fit items-center gap-1.5 bg-paper px-2 text-[12px] font-semibold tracking-[0.12em] text-forest uppercase">
      <Cloud className="size-3.5" strokeWidth={2} /> Your cloud
    </span>
  );
}

function BoundaryNote({ style }: { style: CSSProperties }) {
  return (
    <p style={style} className="flex items-center justify-center gap-2 text-[13px] text-stone">
      {/* an arrow leaving the cloud, crossed out */}
      <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M12 3v14M6 11l6 6 6-6" />
        <path d="M4 4l16 16" />
      </svg>
      {security.boundary}
    </p>
  );
}

/** A dot that travels a path once, after the diagram's start trigger (`go`), then fades out. */
function Dot({ path, go, begin, dur = 1.3 }: { path: string; go: string; begin: number; dur?: number }) {
  return (
    <circle r={4.5} fill="var(--color-forest)" opacity={0}>
      <animateMotion path={path} dur={`${dur}s`} begin={`${go}.begin+${begin}s`} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" dur={`${dur}s`} begin={`${go}.begin+${begin}s`} fill="freeze" />
    </circle>
  );
}

/** The SVG layer: the boundary, the lines and the travelling dots. */
function Wires({
  w,
  h,
  go,
  boundary,
  inPaths,
  outPath,
}: {
  w: number;
  h: number;
  go: string;
  boundary: { left: number; top: number; width: number; height: number };
  inPaths: string[];
  outPath: string;
}) {
  return (
    <svg aria-hidden width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="absolute inset-0">
      <rect
        x={boundary.left}
        y={boundary.top}
        width={boundary.width}
        height={boundary.height}
        rx={30}
        fill="rgb(31 90 61 / 0.035)"
        stroke="rgb(31 90 61 / 0.45)"
        strokeWidth={1.5}
        strokeDasharray="6 6"
      >
        {/* the start trigger every animation below hangs off */}
        <animate id={go} attributeName="stroke-opacity" from="1" to="1" dur="0.01s" begin="indefinite" />
      </rect>
      {inPaths.map((d) => (
        <path key={d} d={d} fill="none" stroke="var(--color-line-2)" strokeWidth={1.5} />
      ))}
      <path d={outPath} fill="none" stroke="var(--color-forest)" strokeOpacity={0.55} strokeWidth={1.5} />
      {inPaths.map((d, i) => (
        <Dot key={d} path={d} go={go} begin={0.2 + i * 0.25} />
      ))}
      {[0, 1, 2].map((i) => (
        <Dot key={i} path={outPath} go={go} begin={2.1 + i * 0.4} dur={1.5} />
      ))}
    </svg>
  );
}

/* ---------- wide screens: left to right ---------- */

function Horizontal({ go }: { go: string }) {
  const W = 1160;
  const H = 460;
  const boundary = { left: 8, top: 30, width: 1144, height: 372 };
  const srcTops = [104, 162, 220, 278];
  const inPaths = srcTops.map((t) => `M232 ${t + 23} C 306 ${t + 23}, 306 214, 380 214`);
  return (
    <div className="relative" style={{ width: W, height: H }}>
      <Wires w={W} h={H} go={go} boundary={boundary} inPaths={inPaths} outPath="M550 214 L830 214" />
      <CloudLabel style={{ position: "absolute", left: 34, top: 21 }} />
      {SOURCES.map((s, i) => (
        <SourceChip key={s.name} {...s} style={at({ left: 56, top: srcTops[i], width: 176, height: 46 })} />
      ))}
      <Core style={at({ left: 380, top: 160, width: 170, height: 108 })} />
      <ModelChip style={at({ left: 365, top: 284, width: 200, height: 34 })} />
      <p style={at({ left: 600, top: 168, width: 200 })} className="text-center text-[12.5px] font-medium text-forest">
        Only what you can open
      </p>
      <LockCheck style={at({ left: 680, top: 194, width: 40, height: 40 })} />
      <Restricted style={at({ left: 562, top: 236, width: 108, height: 28 })} delay="2.0s" from={["-36px", "-24px"]} />
      <Restricted style={at({ left: 562, top: 270, width: 108, height: 28 })} delay="2.5s" from={["-36px", "-58px"]} />
      <AnswerCard style={at({ left: 830, top: 116, width: 300 })} />
      <BoundaryNote style={at({ left: 0, top: 418, width: W })} />
    </div>
  );
}

/* ---------- smaller screens: top to bottom ---------- */

function Vertical({ go }: { go: string }) {
  const W = 340;
  const H = 790;
  const boundary = { left: 4, top: 26, width: 332, height: 712 };
  const chips: [number, number][] = [
    [24, 64],
    [174, 64],
    [24, 116],
    [174, 116],
  ];
  const inPaths = chips.map(([l, t]) => `M${l + 71} ${t + 21} C ${l + 71} ${t + 80}, 170 150, 170 200`);
  return (
    <div className="relative" style={{ width: W, height: H }}>
      <Wires w={W} h={H} go={go} boundary={boundary} inPaths={inPaths} outPath="M170 292 L170 532" />
      <CloudLabel style={{ position: "absolute", left: 26, top: 17 }} />
      {SOURCES.map((s, i) => (
        <SourceChip key={s.name} {...s} style={at({ left: chips[i][0], top: chips[i][1], width: 142, height: 42 })} />
      ))}
      <Core style={at({ left: 95, top: 200, width: 150, height: 92 })} />
      <ModelChip style={at({ left: 75, top: 304, width: 190, height: 32 })} />
      <LockCheck style={at({ left: 150, top: 418, width: 40, height: 40 })} />
      <p style={at({ left: 198, top: 428, width: 132 })} className="text-[12.5px] leading-tight font-medium text-forest">
        Only what you can open
      </p>
      <Restricted style={at({ left: 30, top: 358, width: 108, height: 28 })} delay="2.0s" from={["44px", "-40px"]} />
      <Restricted style={at({ left: 30, top: 392, width: 108, height: 28 })} delay="2.5s" from={["44px", "-74px"]} />
      <AnswerCard style={at({ left: 22, top: 532, width: 296 })} />
      <BoundaryNote style={at({ left: 0, top: 752, width: W })} />
    </div>
  );
}

/* ---------- the quieter audit trail below ---------- */

const USED = [
  { title: "Export service design v3", logo: "/logos/apps/confluence.svg" },
  { title: "payments/export-service", logo: "/logos/apps/github.svg" },
  { title: "#security-review", logo: "/logos/apps/slack.svg" },
  { title: "PAY-212", logo: "/logos/apps/jira-icon.svg" },
];

function Step({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children?: ReactNode }) {
  return (
    <div className="grid grid-cols-[24px_minmax(0,1fr)] gap-3 border-t border-line py-3">
      <span className="grid size-6 place-items-center rounded-md bg-forest-soft text-forest">
        <Icon className="size-3" strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold">{title}</p>
        {children}
      </div>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-0.5 text-[12.5px] text-stone">{children}</p>;
}

function Trace() {
  return (
    <div
      role="img"
      aria-label="The audit trail behind an answer: Karthik Valluri asked whether anyone had built a customer data export. It ran in Northwind's cloud across 12 connected sources; used 4 sources Karthik can open; withheld 2 documents restricted to Security; used Anthropic, the model Northwind's admins chose; and left 3 drafted actions waiting for approval."
      className="rounded-box border border-line bg-white p-5 select-none [&_img]:pointer-events-none"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="label-mono text-[0.625rem] text-stone">Behind this answer</span>
        <span className="label-mono inline-flex items-center gap-1.5 text-[0.625rem] text-forest">
          <i className="size-1.5 rounded-full bg-current" /> Audit log
        </span>
      </div>
      <div className="mb-3 rounded-[8px] bg-paper-2 px-3 py-2.5 text-[13px]">
        <p className="mb-0.5 text-[11.5px] text-stone">Karthik Valluri &middot; Engineering Manager &middot; 2:14 PM</p>
        Has anyone here already built a customer data export?
      </div>
      <Step icon={Cloud} title="Ran in Northwind’s cloud">
        <Note>Searched 12 connected sources. No data left the environment.</Note>
      </Step>
      <Step icon={Check} title="Used 4 sources Karthik can open">
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {USED.map((u) => (
            <span key={u.title} className="flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-0.5 text-[11.5px]">
              <img src={u.logo} alt="" draggable={false} className="size-3" />
              {u.title}
            </span>
          ))}
        </div>
      </Step>
      <Step icon={Lock} title="Withheld 2 documents">
        <Note>Restricted to Security. Counted, never shown.</Note>
      </Step>
      <Step icon={Cpu} title="Model: Anthropic">
        <Note>Chosen by Northwind&rsquo;s admins. Swappable for OpenAI or OpenRouter.</Note>
      </Step>
      <Step icon={ArrowRight} title="3 actions waiting for approval">
        <Note>Slack message, access request, coding-agent brief. Nothing sent yet.</Note>
      </Step>
    </div>
  );
}

/* ---------- the section ---------- */

export function Security() {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);

  // Play the flow once, the first time the diagram is well on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = () => {
      setPlay(true);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      for (const id of ["secGoWide", "secGoNarrow"]) {
        (document.getElementById(id) as SVGAnimationElement | null)?.beginElement?.();
      }
    };
    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-[1336px] px-5">
      <div className="mx-auto mb-[clamp(32px,4vw,48px)] grid max-w-[760px] justify-items-center gap-4 text-center">
        <h2 className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{security.title}</h2>
        <p className="text-[clamp(1.0625rem,0.98rem+0.3vw,1.1875rem)] leading-[1.5] text-stone">{security.lede}</p>
      </div>

      <figure ref={ref} data-play={play ? "" : undefined} aria-label={ALT} role="img" className="m-0 select-none [&_img]:pointer-events-none">
        <ScaleToFit width={1160} className="hidden lg:block">
          <Horizontal go="secGoWide" />
        </ScaleToFit>
        <ScaleToFit width={340} className="lg:hidden">
          <Vertical go="secGoNarrow" />
        </ScaleToFit>
      </figure>

      <div className="mx-auto mt-[clamp(48px,6vw,80px)] grid max-w-[1000px] items-start gap-6 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        <div>
          <h3 className="text-[1.25rem]">{security.traceTitle}</h3>
          <p className="mt-2 text-[14.5px] text-stone">Every answer keeps a record of where it ran, what it used, what it held back and what it&rsquo;s waiting on.</p>
        </div>
        <Trace />
      </div>
    </div>
  );
}
