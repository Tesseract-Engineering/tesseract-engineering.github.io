import { hero } from "@/lib/site";
import { RequestDemoButton } from "./request-demo";

/**
 * Centred hero: a small mono label, a two-line serif headline, the supporting line and one call to
 * action. Glean's composition with Harvey's type; the product sits directly underneath.
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="mx-auto max-w-[1240px] px-5">
      <div className="mx-auto grid max-w-[920px] justify-items-center gap-6 pt-[clamp(128px,14vw,184px)] pb-[clamp(40px,5vw,64px)] text-center">
        <p className="inline-flex items-center gap-2.5 font-mono text-[0.75rem] leading-none font-medium tracking-[0.16em] text-stone uppercase before:size-[5px] before:bg-forest">
          {hero.kicker}
        </p>
        <h1 className="max-w-[14ch] text-[clamp(3rem,1.4rem+4.6vw,5.6rem)] leading-[1.0]">{hero.title}</h1>
        <p className="max-w-[50ch] text-[clamp(1.0625rem,0.98rem+0.3vw,1.1875rem)] leading-[1.5] text-stone">{hero.lede}</p>
        <div className="pt-2">
          <RequestDemoButton />
        </div>
      </div>
    </section>
  );
}
