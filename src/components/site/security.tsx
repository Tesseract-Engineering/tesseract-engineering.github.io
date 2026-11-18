import { security } from "@/lib/site";

/**
 * Security as the questions a buyer's security reviewer asks, each answered in a line, under one
 * headline. Two columns on wider screens, one on phones.
 */
export function Security() {
  return (
    <div className="mx-auto max-w-[1336px] px-5">
      <h2 className="mb-[clamp(28px,4vw,44px)] text-[clamp(2rem,1.2rem+3vw,3.6rem)]">{security.title}</h2>
      <dl className="grid gap-x-16 md:grid-cols-2">
        {security.questions.map((item) => (
          <div key={item.q} className="grid gap-1.5 border-t border-line-2 pt-[22px] pb-[26px]">
            <dt className="text-[1.25rem] font-semibold tracking-[-0.01em]">{item.q}</dt>
            <dd className="text-stone">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
