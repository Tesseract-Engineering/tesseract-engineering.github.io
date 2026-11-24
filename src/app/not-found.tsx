import type { Metadata } from "next";

import { SiteNav } from "@/components/site/site-nav";

export const metadata: Metadata = {
  title: "Page not found · Tesseract",
  robots: { index: false },
};

/** 404, written to out/404.html, which GitHub Pages serves for any missing path. */
export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto w-full max-w-[560px] px-5 pt-[clamp(120px,14vw,168px)] pb-[clamp(64px,8vw,112px)]">
        <h1 className="mb-4 text-[clamp(1.875rem,1.4rem+1.6vw,2.5rem)]">Page not found</h1>
        <p className="text-stone">
          There&rsquo;s no page at this address. Go to the{" "}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full load, as the nav's home link */}
          <a href="/" className="text-ink underline underline-offset-4">home page</a>, see every page in the{" "}
          <a href="/sitemap.xml" className="text-ink underline underline-offset-4">sitemap</a>, or read{" "}
          <a href="/llms.txt" className="text-ink underline underline-offset-4">llms.txt</a> for a plain-text summary of
          Tesseract.
        </p>
      </main>
    </>
  );
}
