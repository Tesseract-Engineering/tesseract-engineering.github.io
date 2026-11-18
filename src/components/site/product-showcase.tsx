import { WorkspaceMockup } from "./mockups/workspace";
import { ScaleToFit } from "./scale-to-fit";

/** A faint knowledge-graph pattern for the backdrop. Node positions are in percent of a 1400×900 field, cropped to fit. */
function GraphLines() {
  const nodes: [number, number][] = [
    [6, 18], [17, 8], [24, 30], [12, 46], [30, 58], [8, 78], [22, 88], [40, 12],
    [62, 6], [78, 16], [92, 10], [86, 34], [96, 52], [74, 62], [90, 80], [68, 92], [52, 84],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [2, 3], [3, 4], [4, 5], [5, 6], [2, 7], [1, 7], [7, 8],
    [8, 9], [9, 10], [9, 11], [10, 11], [11, 12], [12, 13], [11, 13], [13, 14], [14, 15], [15, 16], [6, 16], [13, 16],
  ];
  return (
    <svg aria-hidden viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0] * 14}
          y1={nodes[a][1] * 9}
          x2={nodes[b][0] * 14}
          y2={nodes[b][1] * 9}
          stroke="currentColor"
          strokeOpacity={0.09}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x * 14} cy={y * 9} r={3} fill="currentColor" fillOpacity={0.22} />
      ))}
    </svg>
  );
}

// Film grain, as an inline SVG noise texture.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The product, right under the hero: a black stage with grain, a soft green light and a faint
 * graph, holding a mock-up of the Tesseract workspace open on Ask.
 */
export function ProductShowcase() {
  return (
    <section aria-label="Product" className="mx-auto max-w-[1440px] px-3 sm:px-5">
      <div className="relative isolate overflow-hidden rounded-box bg-ink text-on-dark">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70% 60% at 18% 0%, rgb(31 90 61 / 0.55), transparent 70%), radial-gradient(50% 50% at 100% 100%, rgb(31 90 61 / 0.28), transparent 70%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.13] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        <div className="absolute inset-0 -z-10">
          <GraphLines />
        </div>
        <ScaleToFit width={1120} className="select-none px-[6%] pt-[clamp(24px,5vw,72px)] pb-[clamp(24px,5vw,72px)]">
          <WorkspaceMockup />
        </ScaleToFit>
      </div>
    </section>
  );
}
