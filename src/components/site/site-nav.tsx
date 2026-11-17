"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { nav } from "@/lib/site";
import { Logo } from "./logo";
import { RequestDemoButton } from "./request-demo";

/** Fixed top bar: transparent over the hero, frosted paper with a hairline once you scroll. */
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
        "fixed inset-x-0 top-0 z-50 border-b border-transparent pt-[calc(14px+env(safe-area-inset-top))] pb-3.5 transition-colors duration-300",
        scrolled && "border-line bg-paper/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-4.5 px-5">
        <a href="#top" aria-label="Tesseract home" className="inline-flex items-center gap-2.5 font-display text-2xl tracking-[-0.02em]">
          <Logo className="size-[22px]" />
          Tesseract
        </a>
        <nav aria-label="Sections" className="ml-auto hidden gap-1 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="rounded-btn px-3 py-2 text-[0.9375rem] text-stone transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <RequestDemoButton size="sm" className="ml-auto h-auto px-4 py-[11px] md:ml-0" />
      </div>
    </header>
  );
}
