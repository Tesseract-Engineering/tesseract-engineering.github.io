import type { Metadata } from "next";

import { DemoForm } from "@/components/site/demo-form";
import { SiteNav } from "@/components/site/site-nav";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a demo · Tesseract",
  description: "Book a demo of Tesseract.",
};

/** Book a demo: a short, centred form with no footer, after brex.com/book-a-demo. */
export default function BookADemo() {
  return (
    <>
      <SiteNav cta={false} />
      <main className="mx-auto w-full max-w-[560px] px-5 pt-[clamp(120px,14vw,168px)] pb-[clamp(64px,8vw,112px)]">
        <h1 className="mb-8 text-[clamp(1.875rem,1.4rem+1.6vw,2.5rem)]">{contact.page.title}</h1>
        <DemoForm />
      </main>
    </>
  );
}
