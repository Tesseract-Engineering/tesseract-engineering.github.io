import type { Metadata } from "next";

import { DemoForm } from "@/components/site/demo-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a demo · Tesseract",
  description: contact.page.lede,
};

/** Book a demo: a short, centred form, after brex.com/book-a-demo. */
export default function BookADemo() {
  return (
    <>
      <SiteNav cta={false} />
      <main className="mx-auto max-w-[560px] px-5 pt-[clamp(120px,14vw,168px)] pb-[clamp(64px,8vw,112px)]">
        <h1 className="text-[clamp(1.875rem,1.4rem+1.6vw,2.5rem)]">{contact.page.title}</h1>
        <p className="mt-3 mb-8 text-stone">{contact.page.lede}</p>
        <DemoForm />
      </main>
      <SiteFooter call={false} />
    </>
  );
}
