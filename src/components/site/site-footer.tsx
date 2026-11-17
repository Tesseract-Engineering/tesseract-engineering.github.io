import { closing, site } from "@/lib/site";
import { RequestDemoButton } from "./request-demo";

/** A black block: the closing call, then the footer line. */
export function SiteFooter() {
  return (
    <footer className="bg-ink pb-[26px] text-[0.8125rem] text-stone-dark">
      <div id="access" className="mx-auto max-w-[1240px] px-5 pt-[clamp(80px,10vw,144px)] pb-[clamp(64px,8vw,112px)] text-center">
        <h2 className="mx-auto max-w-[16ch] text-[clamp(2.2rem,1.2rem+3.6vw,4.2rem)] text-on-dark">{closing.title}</h2>
        <div className="mt-9 flex justify-center">
          <RequestDemoButton variant="inverted" />
        </div>
      </div>
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line-dark pt-[26px]">
          <span className="font-display text-xl tracking-[-0.02em] text-on-dark">{site.name}</span>
          <span>{site.footer}</span>
        </div>
      </div>
    </footer>
  );
}
