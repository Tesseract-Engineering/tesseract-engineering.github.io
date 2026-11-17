import { team } from "@/lib/site";

/** Heading on the left; the companies' logos stacked on the right, each under a thick black rule. */
export function Team() {
  return (
    <div id="team" className="mx-auto grid max-w-[1240px] items-start gap-[clamp(28px,5vw,80px)] px-5 md:grid-cols-[5fr_7fr]">
      <h2 className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{team.title}</h2>
      <ul>
        {team.companies.map((c) => (
          <li key={c.name} className="flex h-[96px] items-center border-t-2 border-ink">
            {/* the logo file is a stencil: its transparent shape is filled with ink */}
            <span
              role="img"
              aria-label={c.name}
              className="block bg-ink"
              style={{
                height: c.height,
                width: c.height * c.ratio,
                maskImage: `url(${c.logo})`,
                WebkitMaskImage: `url(${c.logo})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "left center",
                WebkitMaskPosition: "left center",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
