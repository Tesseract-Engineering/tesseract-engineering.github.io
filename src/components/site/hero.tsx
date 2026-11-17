import { hero } from "@/lib/site";
import { RequestDemoButton } from "./request-demo";

/**
 * Centred hero: a two-line headline, the supporting line and one call to action, set in
 * Inter Display. The product sits directly underneath.
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="mx-auto max-w-[1240px] px-5">
      <div className="mx-auto grid max-w-[920px] justify-items-center gap-5 pt-[clamp(108px,10vw,140px)] pb-[clamp(32px,3.5vw,48px)] text-center">
        <h1 className="max-w-[22ch] text-[clamp(2.2rem,1.2rem+2.6vw,3.5rem)] leading-none tracking-[-0.02em]">{hero.title}</h1>
        <p className="max-w-[50ch] text-[clamp(1.0625rem,0.98rem+0.3vw,1.1875rem)] leading-[1.5] text-stone">{hero.lede}</p>
        <div className="pt-3">
          <RequestDemoButton />
        </div>
      </div>
    </section>
  );
}
