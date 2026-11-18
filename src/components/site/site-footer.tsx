import { closing, site } from "@/lib/site";
import { Logo } from "./logo";
import { RequestDemoButton } from "./request-demo";

/**
 * A dark block on the marbled forest backdrop (as the product stage and the integrations block): the
 * closing line on the left and Request a demo on the right, then the footer line.
 */
export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink pb-[26px] text-[0.8125rem] text-on-dark/75">
      {/* flipped top to bottom, so it reads differently from the two blocks above */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 -scale-y-100 bg-cover bg-center"
        style={{ backgroundImage: "url(/backdrops/marble-forest.webp)" }}
      />
      {/* darkened a quarter, so the small footer text stays readable (4.5:1 or better) */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/25" />
      <div
        id="access"
        className="mx-auto flex max-w-[1336px] flex-col items-start gap-8 px-5 pt-[clamp(56px,6vw,96px)] pb-[clamp(44px,5vw,72px)] md:flex-row md:items-center md:justify-between"
      >
        <h2 className="text-[clamp(1.5rem,0.75rem+1.9vw,2.5rem)] text-on-dark md:whitespace-nowrap">{closing.title}</h2>
        <RequestDemoButton variant="inverted" className="flex-none" />
      </div>
      <div className="mx-auto max-w-[1336px] px-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-on-dark/15 pt-[26px]">
          <a href="#top" aria-label={`${site.name} home`} className="text-on-dark">
            <Logo className="size-[22px]" />
          </a>
          <span>&copy; {new Date().getFullYear()} {site.legalName}</span>
        </div>
      </div>
    </footer>
  );
}
