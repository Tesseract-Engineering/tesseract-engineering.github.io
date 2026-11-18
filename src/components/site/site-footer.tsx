import { closing, site } from "@/lib/site";
import { Logo } from "./logo";
import { RequestDemoButton } from "./request-demo";

/** A black block: the closing line on the left and Request a demo on the right, then the footer line. */
export function SiteFooter() {
  return (
    <footer className="bg-ink pb-[26px] text-[0.8125rem] text-stone-dark">
      <div
        id="access"
        className="mx-auto flex max-w-[1336px] flex-col items-start gap-8 px-5 pt-[clamp(80px,10vw,144px)] pb-[clamp(64px,8vw,112px)] md:flex-row md:items-center md:justify-between"
      >
        <h2 className="text-[clamp(2rem,0.9rem+3vw,3.6rem)] text-on-dark md:whitespace-nowrap">{closing.title}</h2>
        <RequestDemoButton variant="inverted" className="flex-none" />
      </div>
      <div className="mx-auto max-w-[1336px] px-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-dark pt-[26px]">
          <a href="#top" aria-label={`${site.name} home`} className="text-on-dark">
            <Logo className="size-[22px]" />
          </a>
          <span>&copy; {new Date().getFullYear()} {site.legalName}</span>
        </div>
      </div>
    </footer>
  );
}
