import { security } from "@/lib/site";

/**
 * Secure by design: the headline and line on the left; the four points on the right, numbered,
 * each under a thick black rule.
 */
export function Security() {
  return (
    <div className="mx-auto grid max-w-[1336px] items-start gap-[clamp(32px,5vw,64px)] px-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div>
        <h2 className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{security.title}</h2>
        <p className="mt-4 max-w-[46ch] text-[clamp(1.0625rem,0.98rem+0.3vw,1.1875rem)] leading-[1.5] text-stone">{security.lede}</p>
      </div>
      <ol>
        {security.points.map((point, i) => (
          <li key={point.title} className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 gap-y-1 border-t-2 border-ink pt-[18px] pb-[22px]">
            <span className="pt-[5px] font-mono text-[0.75rem] font-medium tracking-[0.14em] text-forest">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-[1.25rem]">{point.title}</h3>
            <p className="col-start-2 text-stone">{point.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
