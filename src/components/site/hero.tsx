import { hero } from "@/lib/site";
import { RequestDemoButton } from "./request-demo";

export function Hero() {
  return (
    <section aria-label="Introduction" className="mx-auto max-w-[1240px] px-5">
      <div className="grid max-w-[980px] gap-[30px] pt-[clamp(132px,18vw,230px)] pb-[clamp(56px,9vw,128px)]">
        <h1 className="text-[clamp(2.7rem,1rem+5vw,5.6rem)] leading-[1.02]">{hero.title}</h1>
        <p className="max-w-[52ch] text-[clamp(1.0625rem,0.95rem+0.5vw,1.25rem)] leading-[1.55] text-stone">{hero.lede}</p>
        <div>
          <RequestDemoButton />
        </div>
      </div>
    </section>
  );
}
