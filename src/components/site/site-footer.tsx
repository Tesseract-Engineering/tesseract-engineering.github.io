import { closing, site } from "@/lib/site";
import { Logo } from "./logo";
import { RequestDemoButton } from "./request-demo";

/**
 * A black block: the closing line on the left and Request a demo on the right, then the footer line.
 * `call={false}` leaves out the closing line (for the book-a-demo page itself).
 */
export function SiteFooter({ call = true }: { call?: boolean }) {
  return (
    <footer
      className={`bg-ink pb-[26px] text-[0.8125rem] text-stone-dark ${call ? "" : "pt-[26px]"}`}
    >
      {call && (
        <div
          id="access"
          className="mx-auto flex max-w-[1336px] flex-col items-start gap-8 px-5 pt-[clamp(56px,6vw,96px)] pb-[clamp(44px,5vw,72px)] md:flex-row md:items-center md:justify-between"
        >
          <h2 className="text-[clamp(1.5rem,0.75rem+1.9vw,2.5rem)] text-on-dark md:whitespace-nowrap">
            {closing.title}
          </h2>
          <RequestDemoButton variant="inverted" className="flex-none" />
        </div>
      )}
      <div className="mx-auto max-w-[1336px] px-5">
        <div
          className={`flex flex-wrap items-center justify-between gap-3 ${call ? "border-t border-line-dark pt-[26px]" : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full load, so pages always open at the top */}
          <a
            href="/"
            aria-label={`${site.name} home`}
            className="text-on-dark"
          >
            <Logo className="size-[22px]" />
          </a>
          <span>
            &copy; {new Date().getFullYear()} {site.legalName}
          </span>
        </div>
      </div>
    </footer>
  );
}
