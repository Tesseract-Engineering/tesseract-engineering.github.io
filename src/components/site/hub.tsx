import { apps } from "@/lib/site";
import { AppBadge } from "./app-badge";
import { Logo } from "./logo";
import { ScaleToFit } from "./scale-to-fit";

// Where each app sits around the hub, in percent of the diagram (same order as `apps`).
const SPOTS: [number, number][] = [
  [8, 20], [28, 7], [50, 3], [72, 7], [92, 20],
  [8, 80], [28, 93], [50, 97], [72, 93], [92, 80],
];

// Phones and tablets: five apps down each side of the hub, laid out at a fixed size and scaled to fit.
const COMPACT = { w: 470, h: 400, core: [235, 200] as const, left: 75, right: 395, edge: 75 };
const ROWS = [40, 120, 200, 280, 360];
const COMPACT_SPOTS: [number, number][] = [
  ...ROWS.map((y) => [COMPACT.left, y] as [number, number]),
  ...ROWS.map((y) => [COMPACT.right, y] as [number, number]),
];

function Core() {
  return (
    <div role="img" aria-label="Tesseract" className="grid size-[84px] place-items-center rounded-box bg-ink text-on-dark shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)]">
      <Logo className="size-10" />
    </div>
  );
}

/**
 * Tesseract in the middle, wired out to every app it works in, so it's clear at a glance that it
 * shows up wherever people already work. Ten spokes around the hub on wide screens; five down each
 * side on phones and tablets.
 */
export function Hub() {
  return (
    <figure className="mb-[clamp(36px,5vw,64px)]" aria-label={`Tesseract works in ${apps.map((a) => a.name).join(", ")}.`}>
      {/* wide screens: hub and spokes */}
      <div className="relative mx-auto hidden h-[380px] max-w-[1160px] lg:block">
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {SPOTS.map(([x, y], i) => (
            <path
              key={i}
              d={`M50 50 C ${(50 + x) / 2} 50, ${(50 + x) / 2} ${y}, ${x} ${y}`}
              fill="none"
              stroke="var(--color-ink)"
              strokeOpacity={0.28}
              strokeWidth={1}
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Core />
        </div>
        {apps.map((app, i) => (
          <AppBadge
            key={app.name}
            app={app}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%` }}
          />
        ))}
      </div>

      {/* phones and tablets: the same idea, five apps down each side */}
      <ScaleToFit width={COMPACT.w} className="lg:hidden">
        <div className="relative" style={{ height: COMPACT.h }}>
          <svg aria-hidden viewBox={`0 0 ${COMPACT.w} ${COMPACT.h}`} className="absolute inset-0 size-full">
            {COMPACT_SPOTS.map(([x, y], i) => {
              const [cx, cy] = COMPACT.core;
              const end = x < cx ? x + COMPACT.edge : x - COMPACT.edge; // the tile's inner edge
              const mid = (cx + end) / 2;
              return (
                <path
                  key={i}
                  d={`M${cx} ${cy} C ${mid} ${cy}, ${mid} ${y}, ${end} ${y}`}
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeOpacity={0.28}
                  strokeWidth={1}
                  strokeDasharray="3 4"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: COMPACT.core[0], top: COMPACT.core[1] }}>
            <Core />
          </div>
          {apps.map((app, i) => (
            <AppBadge
              key={app.name}
              app={app}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: COMPACT_SPOTS[i][0], top: COMPACT_SPOTS[i][1] }}
            />
          ))}
        </div>
      </ScaleToFit>
    </figure>
  );
}
