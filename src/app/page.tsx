import { Hero } from "@/components/site/hero";
import { Integrations } from "@/components/site/integrations";
import { ProductShowcase } from "@/components/site/product-showcase";
import { RequestDemoProvider } from "@/components/site/request-demo";
import { Security } from "@/components/site/security";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { Team } from "@/components/site/team";

export default function Home() {
  return (
    <RequestDemoProvider>
      <SiteNav />
      <main id="top">
        <Hero />
        <ProductShowcase />
        <section id="integrations" className="pt-[clamp(72px,9vw,136px)] pb-[clamp(32px,4vw,56px)]">
          <Integrations />
        </section>
        <section id="why" className="grid gap-[clamp(64px,8vw,112px)] pt-[clamp(32px,4vw,56px)] pb-[clamp(56px,7vw,104px)]">
          <Security />
          <Team />
        </section>
      </main>
      <SiteFooter />
    </RequestDemoProvider>
  );
}
