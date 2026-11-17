import { hero } from "@/lib/site";
import { RequestDemoButton } from "./request-demo";

/**
 * Hero as one paragraph at headline size, after anthropic.com: the headline sentence in semibold
 * ink, the explanation running on in regular weight and grey, left-aligned across the page, then
 * one call to action. The product sits directly underneath.
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="mx-auto max-w-[1240px] px-5">
      <div className="grid justify-items-start gap-8 pt-[clamp(108px,10vw,140px)] pb-[clamp(36px,4vw,56px)]">
        <h1 className="text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] leading-[1.24] font-normal tracking-[-0.022em] text-pretty">
          <span className="font-semibold text-ink">{hero.lead}</span> <span className="text-stone">{hero.rest}</span>
        </h1>
        <RequestDemoButton />
      </div>
    </section>
  );
}
