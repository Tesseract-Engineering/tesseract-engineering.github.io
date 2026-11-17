import { sources } from "@/lib/site";

/** A slow, endless strip of the tools Tesseract reads. The list is doubled so the loop is seamless. */
export function SourcesMarquee() {
  return (
    <div aria-label="Sources">
      <p className="mb-4 text-center font-mono text-[0.625rem] leading-none font-medium tracking-[0.2em] text-stone uppercase">
        {sources.label}
      </p>
      <div className="relative overflow-hidden border-y border-line py-[18px] before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-[120px] before:bg-linear-to-r before:from-paper before:to-transparent after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-[120px] after:bg-linear-to-l after:from-paper after:to-transparent">
        <div aria-hidden className="flex w-max animate-marquee gap-14">
          {[...sources.items, ...sources.items].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-14 font-mono text-[0.8125rem] leading-none font-medium tracking-[0.12em] text-stone uppercase after:size-[5px] after:bg-forest"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="sr-only">{sources.items.join(", ")}.</p>
      </div>
    </div>
  );
}
