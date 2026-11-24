import { team } from "@/lib/site";

/**
 * A logo bar: a small mono label over one even row of the companies' logos in muted grey, the way
 * Vercel, Glean and Brex show them. One row on wider screens; two across on phones, with an odd one
 * out centred on its own line.
 */
export function Team() {
  return (
    <div id="team" className="mx-auto w-full max-w-[1040px] px-5 text-center">
      <h2 className="font-mono text-[0.9375rem] leading-none font-medium tracking-[0.16em] text-stone uppercase">
        {team.title}
      </h2>
      <ul className="mt-9 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 text-stone md:flex md:justify-between md:px-6">
        {team.companies.map((c) => (
          <li key={c.name} className="last:odd:col-span-2">
            {/* the logo file is a stencil: its transparent shape is filled with the text colour */}
            <span
              role="img"
              aria-label={c.name}
              className="block bg-current transition-colors duration-200 hover:text-ink"
              style={{
                height: c.height,
                width: c.height * c.ratio,
                maskImage: `url(${c.logo})`,
                WebkitMaskImage: `url(${c.logo})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
