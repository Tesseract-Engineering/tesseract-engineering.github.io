"use client";

/* eslint-disable @next/next/no-img-element -- small static SVG logos */
import { Lock, X } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";

import { security } from "@/lib/site";
import { Logo } from "./logo";
import { ScaleToFit } from "./scale-to-fit";

/*
  "Secure by design", as one picture: source logos send data read-only into a box
  labelled Your cloud, where Tesseract builds the knowledge graph; one arrow tries to leave and stops
  at a closed gate. The flow plays once when the diagram scrolls into view (SVG animateMotion, all
  hung off one start trigger). With reduced motion it never starts and the finished diagram shows.
  Horizontal from 1024px up, vertical below; each layout is drawn in its own fixed coordinates.
*/

const SOURCES = [
  { name: "Slack", logo: "/logos/apps/slack.svg" },
  { name: "Jira", logo: "/logos/apps/jira-icon.svg" },
  { name: "GitHub", logo: "/logos/apps/github.svg" },
  { name: "Google Drive", logo: "/logos/apps/google-g.svg" },
];

const ALT =
  "Data from Slack, Jira, GitHub and Google Drive flows read-only into your own cloud, where Tesseract builds the knowledge graph. Nothing leaves it.";

const GREEN = "var(--color-forest)";
const GREY = "#8A877F"; // muted, still 3:1 against the paper background for the gate and arrow

const at = (left: number, top: number, width?: number, height?: number): CSSProperties => ({
  position: "absolute",
  left,
  top,
  width,
  height,
});

/* ---------- HTML pieces laid over the SVG ---------- */

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
    <div style={style} className="grid place-items-center content-center gap-1.5 rounded-[14px] bg-ink text-on-dark">
      <Logo className="size-6" />
      <span className="text-[14px] font-semibold">Tesseract</span>
    </div>
  );
}

function BoxLabel({ style }: { style: CSSProperties }) {
  return (
    <span style={style} className="text-[13px] font-semibold tracking-[0.12em] text-forest uppercase">
      Your cloud
    </span>
  );
}

function BoxLock({ style }: { style: CSSProperties }) {
  return (
    <span style={style} className="grid place-items-center rounded-full border-[1.5px] border-forest bg-paper text-forest">
      <Lock className="size-3.5" strokeWidth={2.2} />
    </span>
  );
}

function Gate({ style, vertical }: { style: CSSProperties; vertical?: boolean }) {
  return (
    <span style={style} className={vertical ? "flex flex-col items-center gap-1.5" : "flex flex-col items-center gap-1.5"}>
      <span className="grid size-8 place-items-center rounded-full border-[1.5px] border-[#8A877F] bg-paper text-[#5E5B55]">
        <X className="size-4" strokeWidth={2.4} />
      </span>
      <span className="text-[13px] font-semibold whitespace-nowrap text-stone">Nothing leaves.</span>
    </span>
  );
}

function Tag({ style, children }: { style: CSSProperties; children: string }) {
  return (
    <span style={style} className="rounded-full bg-paper px-2 text-center text-[11.5px] font-medium tracking-[0.04em] text-forest">
      {children}
    </span>
  );
}

/* ---------- SVG pieces ---------- */

/** A dot that travels a path once after the start trigger `go`. `settle` keeps it at the end. */
function Dot({ path, go, begin, dur, color = GREEN, settle }: { path: string; go: string; begin: number; dur: number; color?: string; settle?: boolean }) {
  const b = `${go}.begin+${begin}s`;
  return (
    <circle r={4.5} fill={color} opacity={0}>
      <animateMotion path={path} dur={`${dur}s`} begin={b} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      <animate attributeName="opacity" values={settle ? "0;1;1" : "0;1;1;0"} keyTimes={settle ? "0;0.15;1" : "0;0.15;0.85;1"} dur={`${dur}s`} begin={b} fill="freeze" />
    </circle>
  );
}

/** The knowledge graph inside the box: a few nodes and links, drawn around a centre point. */
function Graph({ cx, cy, nodes }: { cx: number; cy: number; nodes: [number, number][] }) {
  const pts = nodes.map(([x, y]) => [cx + x, cy + y] as const);
  const links = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 2],
    [3, 4],
    [4, 5],
    [2, 5],
  ];
  return (
    <g>
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={GREEN} strokeOpacity={0.35} strokeWidth={1.2} />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 ? 7 : 5} fill={i === 3 ? "var(--color-ink)" : GREEN} />
      ))}
    </g>
  );
}

function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={`${id}-in`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={GREEN} />
      </marker>
    </defs>
  );
}

/* ---------- wide screens: left to right ---------- */

function Horizontal({ go }: { go: string }) {
  const W = 1100;
  const H = 324;
  const box = { x: 360, y: 40, w: 440, h: 270 };
  const tops = [62, 120, 178, 236];
  const rows = tops.map((t) => t + 22);
  const graph = { cx: 690, cy: 168 };
  const nodes: [number, number][] = [
    [-50, -42],
    [10, -56],
    [56, -14],
    [-6, 4],
    [-54, 38],
    [36, 42],
  ];
  const core = { x: 400, y: 128, w: 140, h: 92 };
  const inPaths = rows.map((y) => `M206 ${y} L${box.x - 4} ${y}`);
  const intoCore = rows.map((y) => `M206 ${y} L${box.x} ${y} C ${box.x + 20} ${y}, ${core.x - 20} 174, ${core.x} 174`);
  const toGraph = nodes.map(([x, y]) => `M${core.x + core.w} 174 L${graph.cx + x} ${graph.cy + y}`);
  const outPath = `M${box.x + box.w} 174 L${box.x + box.w + 128} 174`;
  return (
    <div className="relative" style={{ width: W, height: H }}>
      <svg aria-hidden width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0">
        <ArrowDefs id={go} />
        <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={28} fill="rgb(31 90 61 / 0.04)" stroke={GREEN} strokeOpacity={0.5} strokeWidth={1.5}>
          <animate id={go} attributeName="stroke-opacity" from="0.5" to="0.5" dur="0.01s" begin="indefinite" />
        </rect>
        {inPaths.map((d) => (
          <path key={d} d={d} stroke={GREEN} strokeOpacity={0.75} strokeWidth={1.5} fill="none" markerEnd={`url(#${go}-in)`} />
        ))}
        <path d={`M${core.x + core.w} 174 L${graph.cx - 66} 174`} stroke={GREEN} strokeOpacity={0.6} strokeWidth={1.5} fill="none" markerEnd={`url(#${go}-in)`} />
        <Graph cx={graph.cx} cy={graph.cy} nodes={nodes} />
        <path d={outPath} stroke={GREY} strokeWidth={1.5} strokeDasharray="4 5" fill="none" />
        {intoCore.map((d, i) => (
          <Dot key={d} path={d} go={go} begin={i * 0.18} dur={1.1} />
        ))}
        {toGraph.map((d, i) => (
          <Dot key={d} path={d} go={go} begin={1.15 + i * 0.1} dur={0.7} settle />
        ))}
        <Dot path={outPath} go={go} begin={2.2} dur={0.8} color={GREY} settle />
      </svg>
      {SOURCES.map((s, i) => (
        <SourceChip key={s.name} {...s} style={at(40, tops[i], 166, 44)} />
      ))}
      <Tag style={at(240, 30, 92)}>read-only</Tag>
      <BoxLabel style={at(box.x + 24, box.y + 18)} />
      <BoxLock style={at(box.x + box.w - 46, box.y - 14, 28, 28)} />
      <Core style={at(core.x, core.y, core.w, core.h)} />
      <span style={at(graph.cx - 80, graph.cy + 72, 160)} className="text-center text-[13px] font-medium">
        Your knowledge graph
      </span>
      <Gate style={at(box.x + box.w + 112, 158)} />
    </div>
  );
}

/* ---------- smaller screens: top to bottom ---------- */

function Vertical({ go }: { go: string }) {
  const W = 340;
  const H = 690;
  const chips: [number, number][] = [
    [20, 20],
    [176, 20],
    [20, 72],
    [176, 72],
  ];
  const box = { x: 14, y: 164, w: 312, h: 380 };
  const core = { x: 100, y: 214, w: 140, h: 84 };
  const graph = { cx: 170, cy: 424 };
  const nodes: [number, number][] = [
    [-60, -40],
    [6, -54],
    [62, -18],
    [-4, 2],
    [-58, 36],
    [44, 40],
  ];
  const cols = [92, 248];
  const inPaths = cols.map((x) => `M${x} 116 L${x} ${box.y - 4}`);
  const intoCore = chips.map(([l, t]) => {
    const x = l + 72;
    return `M${x} ${t + 21} L${x} ${box.y} C ${x} ${box.y + 18}, 170 ${core.y - 18}, 170 ${core.y}`;
  });
  const toGraph = nodes.map(([x, y]) => `M170 ${core.y + core.h} L${graph.cx + x} ${graph.cy + y}`);
  const outPath = `M170 ${box.y + box.h} L170 ${box.y + box.h + 54}`;
  return (
    <div className="relative" style={{ width: W, height: H }}>
      <svg aria-hidden width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0">
        <ArrowDefs id={go} />
        <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={26} fill="rgb(31 90 61 / 0.04)" stroke={GREEN} strokeOpacity={0.5} strokeWidth={1.5}>
          <animate id={go} attributeName="stroke-opacity" from="0.5" to="0.5" dur="0.01s" begin="indefinite" />
        </rect>
        {inPaths.map((d) => (
          <path key={d} d={d} stroke={GREEN} strokeOpacity={0.75} strokeWidth={1.5} fill="none" markerEnd={`url(#${go}-in)`} />
        ))}
        <path d={`M170 ${core.y + core.h} L170 ${graph.cy - 66}`} stroke={GREEN} strokeOpacity={0.6} strokeWidth={1.5} fill="none" markerEnd={`url(#${go}-in)`} />
        <Graph cx={graph.cx} cy={graph.cy} nodes={nodes} />
        <path d={outPath} stroke={GREY} strokeWidth={1.5} strokeDasharray="4 5" fill="none" />
        {intoCore.map((d, i) => (
          <Dot key={d} path={d} go={go} begin={i * 0.18} dur={1.1} />
        ))}
        {toGraph.map((d, i) => (
          <Dot key={d} path={d} go={go} begin={1.15 + i * 0.1} dur={0.7} settle />
        ))}
        <Dot path={outPath} go={go} begin={2.2} dur={0.8} color={GREY} settle />
      </svg>
      {SOURCES.map((s, i) => (
        <SourceChip key={s.name} {...s} style={at(chips[i][0], chips[i][1], 144, 42)} />
      ))}
      <Tag style={at(124, 130, 92)}>read-only</Tag>
      <BoxLabel style={at(box.x + 20, box.y + 16)} />
      <BoxLock style={at(box.x + box.w - 44, box.y - 14, 28, 28)} />
      <Core style={at(core.x, core.y, core.w, core.h)} />
      <span style={at(graph.cx - 80, graph.cy + 66, 160)} className="text-center text-[13px] font-medium">
        Your knowledge graph
      </span>
      <Gate vertical style={at(170 - 60, box.y + box.h + 64, 120)} />
    </div>
  );
}

/* ---------- the section ---------- */

export function Security() {
  const ref = useRef<HTMLElement>(null);

  // Play the flow once, the first time the diagram is well on screen (never with reduced motion).
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => {
      for (const id of ["vpcGoWide", "vpcGoNarrow"]) {
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
      { threshold: 0.4 },
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

      <figure ref={ref} role="img" aria-label={ALT} className="m-0 select-none [&_img]:pointer-events-none">
        <ScaleToFit width={1100} className="hidden lg:block">
          <Horizontal go="vpcGoWide" />
        </ScaleToFit>
        <ScaleToFit width={340} className="lg:hidden">
          <Vertical go="vpcGoNarrow" />
        </ScaleToFit>
      </figure>

      <p className="mt-6 text-center text-[13px] text-stone">{security.footnote}</p>
    </div>
  );
}
