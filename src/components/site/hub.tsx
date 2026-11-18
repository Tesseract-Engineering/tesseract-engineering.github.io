import { apps } from "@/lib/site";
import { AppBadge } from "./app-badge";
import { Logo } from "./logo";

// Where each app sits around the hub, in percent of the diagram (same order as `apps`).
const SPOTS: [number, number][] = [
  [8, 20], [28, 7], [50, 3], [72, 7], [92, 20],
  [8, 80], [28, 93], [50, 97], [72, 93], [92, 80],
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
 * shows up wherever people already work. A diagram on wide screens, a simple grid on phones.
 */
export function Hub() {
  return (
    <figure className="mb-[clamp(36px,5vw,64px)]" aria-label={`Tesseract works in ${apps.map((a) => a.name).join(", ")}.`}>
      {/* wide screens: hub and spokes */}
      <div className="relative mx-auto hidden h-[380px] max-w-[1160px] md:block">
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

      {/* phones: the hub, then the apps in a grid */}
      <div className="grid justify-items-center gap-5 md:hidden">
        <Core />
        <div className="grid w-full grid-cols-2 gap-2">
          {apps.map((app) => (
            <AppBadge key={app.name} app={app} className="w-full" />
          ))}
        </div>
      </div>
    </figure>
  );
}
