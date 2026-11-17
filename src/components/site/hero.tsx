import { hero } from "@/lib/site";
import { RequestDemoButton } from "./request-demo";

/**
 * A compact split hero: the one-liner on the left, the supporting line and the call to action
 * on the right, sitting on the headline's last line. It leaves room for the product to show
 * above the fold.
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="mx-auto max-w-[1240px] px-5">
      <div className="grid items-end gap-x-16 gap-y-8 pt-[clamp(120px,13vw,168px)] pb-[clamp(36px,4.5vw,56px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <h1 className="text-[clamp(2.6rem,1.1rem+3.9vw,4.6rem)] leading-[1.02]">{hero.title}</h1>
        <div className="grid max-w-[46ch] justify-items-start gap-6 lg:pb-2">
          <p className="text-[clamp(1.0625rem,0.98rem+0.3vw,1.1875rem)] leading-[1.5] text-stone">{hero.lede}</p>
          <RequestDemoButton />
        </div>
      </div>
    </section>
  );
}
