import { WorkspaceMockup } from "./mockups/workspace";
import { ScaleToFit } from "./scale-to-fit";

/**
 * The product, right under the hero: a dark stage of marbled forest green on paper, holding a mock-up of
 * the Tesseract workspace open on Ask. The backdrop is generated art (marbled forest green fading to near-black, paper
 * fibres and faint contour lines), kept as an image in public/backdrops.
 */
export function ProductShowcase() {
  return (
    <section aria-label="Product" className="mx-auto max-w-[1440px] px-3 sm:px-5">
      <div className="relative isolate overflow-hidden rounded-box bg-ink text-on-dark">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url(/backdrops/marble-forest.webp)" }}
        />
        <ScaleToFit width={1120} className="select-none px-[6%] pt-[clamp(24px,5vw,72px)] pb-[clamp(24px,5vw,72px)]">
          <WorkspaceMockup />
        </ScaleToFit>
      </div>
    </section>
  );
}
