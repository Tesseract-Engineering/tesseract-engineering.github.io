"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { RequestDemoButton } from "./request-demo";

/**
 * Fixed top bar, 60px tall like brex.com and vercel.com: the logo and one call to action.
 * Transparent over the hero with a larger logo; once you scroll, frosted paper with a hairline and
 * the logo eases down to its usual size.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent pt-[env(safe-area-inset-top)] transition-colors duration-300",
        scrolled && "border-line bg-paper/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[60px] max-w-[1336px] items-center justify-between px-5">
        {/* larger at the top of the page, easing down to its usual size once you scroll */}
        <a
          href="#top"
          aria-label="Tesseract home"
          className={cn(
            "inline-flex items-center font-display font-semibold tracking-[-0.03em] transition-all duration-300 ease-out",
            scrolled ? "gap-2 text-[1.1875rem]" : "gap-2.5 text-[1.625rem]",
          )}
        >
          <Logo className={cn("transition-all duration-300 ease-out", scrolled ? "size-[18px]" : "size-[26px]")} />
          Tesseract
        </a>
        <RequestDemoButton size="sm" className="h-9 px-3.5 text-[0.8125rem]" />
      </div>
    </header>
  );
}
