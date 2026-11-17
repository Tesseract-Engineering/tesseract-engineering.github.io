import { team } from "@/lib/site";

/** Heading on the left; the companies stacked on the right, each under a thick black rule. */
export function Team() {
  return (
    <div id="team" className="mx-auto grid max-w-[1240px] items-start gap-[clamp(28px,5vw,80px)] px-5 md:grid-cols-[5fr_7fr]">
      <h2 className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{team.title}</h2>
      <ul>
        {team.companies.map((name) => (
          <li
            key={name}
            className="border-t-2 border-ink pt-[18px] pb-[30px] font-display text-[clamp(1.5rem,1rem+1.6vw,2.4rem)] leading-[1.1] tracking-[-0.02em] last:pb-0"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
