import { hero } from "@/lib/site";
import { RequestDemoButton } from "./request-demo";

/**
 * Centred hero: a small mono label, a two-line headline, the supporting line and one call to
 * action, in IBM Plex Sans. The product sits directly underneath.
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="mx-auto max-w-[1240px] px-5">
      <div className="mx-auto grid max-w-[920px] justify-items-center gap-6 pt-[clamp(128px,14vw,184px)] pb-[clamp(40px,5vw,64px)] text-center">
        <p className="inline-flex items-center gap-2.5 font-mono text-[0.75rem] leading-none font-medium tracking-[0.16em] text-stone uppercase before:size-[5px] before:bg-forest">
          {hero.kicker}
        </p>
        <h1 className="max-w-[16ch] text-[clamp(2.4rem,1.3rem+3vw,4.1rem)] leading-[1.04] tracking-[-0.035em]">{hero.title}</h1>
        <p className="max-w-[50ch] text-[clamp(1.0625rem,0.98rem+0.3vw,1.1875rem)] leading-[1.5] text-stone">{hero.lede}</p>
        <div className="pt-2">
          <RequestDemoButton />
        </div>
      </div>
    </section>
  );
}
